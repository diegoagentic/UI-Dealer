// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Designer Verification Overlay
// Phase 14 + v7 · w1.2 side panel
//
// 5 verification modules, each with concrete data (not just a checkbox) and
// an AI suggestion the designer can accept with one click. Send Back to
// Expert stays gated until every module is approved.
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import type { LucideIcon } from 'lucide-react'
import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    ClipboardCheck,
    DollarSign,
    FileText,
    Package,
    Sparkles,
} from 'lucide-react'

// ─── Module data model ──────────────────────────────────────────────────────

interface DataRow {
    label: string
    value: string
    highlight?: 'primary' | 'amber' | 'green'
}

interface AiSuggestion {
    summary: string
    detail: string
    acceptLabel: string
}

interface VerificationModule {
    id: string
    icon: LucideIcon
    title: string
    subtitle: string
    data: DataRow[]
    ai: AiSuggestion
}

const MODULES: VerificationModule[] = [
    {
        id: 'cost-summary',
        icon: DollarSign,
        title: 'Cost Summary',
        subtitle: 'Base cost · margin · sales price',
        data: [
            { label: 'Base cost', value: '$14,336' },
            { label: 'Margin (35%)', value: '$7,719', highlight: 'primary' },
            { label: 'Sales price', value: '$22,055' },
            { label: 'Rate', value: '$57/hr · non-union' },
        ],
        ai: {
            summary: 'Margin aligned with JPS Master Services Agreement',
            detail: '35% is the default tier for healthcare · no override required.',
            acceptLabel: 'Accept margin',
        },
    },
    {
        id: 'project-scope',
        icon: Calendar,
        title: 'Project Scope',
        subtitle: 'Operational constraints check',
        data: [
            { label: 'Planned days', value: '4 days' },
            { label: 'Union force', value: 'Off' },
            { label: 'Stair carry', value: 'Off' },
            { label: 'Site protection', value: 'Off', highlight: 'amber' },
            { label: 'After hours', value: 'Off', highlight: 'amber' },
        ],
        ai: {
            summary: 'Recommend enabling Site Protection + After Hours',
            detail: 'JPS is an active hospital — nights reduce floor disruption and protection prevents damage to installed flooring.',
            acceptLabel: 'Apply recommendation',
        },
    },
    {
        id: 'escalated-item',
        icon: Package,
        title: 'Escalated item',
        subtitle: 'OFS Serpentine 12-seat curved lounge',
        data: [
            { label: 'Product code', value: 'OFS-SRP-12' },
            { label: 'Category', value: 'Ancillary / Lounge' },
            { label: 'Qty', value: '1' },
            { label: 'Configuration', value: '12 seats · ganged · custom fabric' },
            { label: 'Current estimate', value: '1.5 h (stock rate)', highlight: 'amber' },
        ],
        ai: {
            summary: 'Proposed install time: 14 h',
            detail: '12 seats × 1.0 h per module + 2.0 h alignment. Standard brackets compatible, modular assembly confirmed against vendor spec.',
            acceptLabel: 'Accept 14 h',
        },
    },
    {
        id: 'assembly-verification',
        icon: ClipboardCheck,
        title: 'Assembly verification',
        subtitle: 'Components & hardware check',
        data: [
            { label: 'Gang connectors', value: '11 included' },
            { label: 'Mounting brackets', value: 'Standard · compatible' },
            { label: 'Fasteners', value: 'Shipped with product' },
            { label: 'Missing parts', value: 'None detected', highlight: 'green' },
        ],
        ai: {
            summary: 'No missing parts detected',
            detail: 'Bill of materials cross-checked against vendor spec sheet · all hardware accounted for · no site-sourced components needed.',
            acceptLabel: 'Confirm no gaps',
        },
    },
    {
        id: 'applied-rate',
        icon: FileText,
        title: 'Applied rate',
        subtitle: 'Labor rate vs contract line',
        data: [
            { label: 'Contract rate', value: '$57 / hr' },
            { label: 'Contract line', value: 'JPS MSA · healthcare' },
            { label: 'Override needed?', value: 'No', highlight: 'green' },
        ],
        ai: {
            summary: 'Standard rate applies',
            detail: 'JPS Master Services Agreement locks $57/hr for healthcare projects under 300 h. This estimate is 185.04 h — well below threshold.',
            acceptLabel: 'Confirm standard rate',
        },
    },
]

// ─── Escalation context (unchanged) ─────────────────────────────────────────

interface EscalationContext {
    fromName: string
    fromRole: string
    fromPhoto: string
    reason: string
    receivedAt: number
    itemRef?: string
}

interface DesignerVerificationOverlayProps {
    isOpen: boolean
    onSendBack: () => void
    onPreviewPdf: () => void
    escalationContext?: EscalationContext
    onScrollToItem?: (rowId: string) => void
}

function formatElapsed(ts: number): string {
    const seconds = Math.max(0, Math.round((Date.now() - ts) / 1000))
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.round(seconds / 60)
    return `${minutes}m ago`
}

// ─── Highlight styles ───────────────────────────────────────────────────────

const HIGHLIGHT_STYLES: Record<NonNullable<DataRow['highlight']>, string> = {
    primary: 'text-foreground dark:text-primary font-bold',
    amber:   'text-amber-700 dark:text-amber-400 font-semibold',
    green:   'text-green-700 dark:text-green-400 font-semibold',
}

export default function DesignerVerificationOverlay({
    isOpen,
    onSendBack,
    onPreviewPdf,
    escalationContext,
    onScrollToItem,
}: DesignerVerificationOverlayProps) {
    const [approved, setApproved] = useState<Record<string, boolean>>({})
    const [leaving, setLeaving] = useState(false)

    // Reset everything when the overlay opens fresh (new step entry)
    useEffect(() => {
        if (!isOpen) return
        setLeaving(false)
        setApproved({})
    }, [isOpen])

    const handleSendBackClick = () => {
        setLeaving(true)
        setTimeout(onSendBack, 400)
    }

    if (!isOpen) return null

    const handleAccept = (id: string) => {
        setApproved((prev) => ({ ...prev, [id]: true }))
    }

    const allApproved = MODULES.every((m) => approved[m.id])
    const approvedCount = MODULES.filter((m) => approved[m.id]).length

    return (
        <div
            className={clsx(
                'fixed inset-y-0 right-0 w-[28rem] bg-card dark:bg-zinc-900 border-l border-border shadow-2xl flex flex-col z-40 transition-all duration-300 ease-out',
                leaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            )}
        >
            {/* Header */}
            <div className="p-5 border-b border-border bg-muted/20">
                <h2 className="text-base font-bold flex items-center gap-2">
                    <span className="bg-primary/10 text-foreground dark:text-primary p-1.5 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" />
                    </span>
                    Designer Verification
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                    Validate or override each AI suggestion before sending back.
                </p>

                {/* Progress */}
                <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${(approvedCount / MODULES.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider tabular-nums shrink-0">
                        {approvedCount} / {MODULES.length}
                    </span>
                </div>

                {/* Provenance */}
                {escalationContext && (
                    <div className="mt-4 p-3 rounded-xl bg-card dark:bg-zinc-800 border border-border">
                        <div className="flex items-center gap-2.5">
                            <img
                                src={escalationContext.fromPhoto}
                                alt={escalationContext.fromName}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/40 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                                    From
                                </p>
                                <p className="text-xs font-semibold text-foreground leading-tight truncate">
                                    {escalationContext.fromName}
                                </p>
                                <p className="text-[10px] text-muted-foreground leading-tight truncate">
                                    {escalationContext.fromRole}
                                </p>
                            </div>
                            <span className="text-[9px] text-muted-foreground font-mono shrink-0">
                                {formatElapsed(escalationContext.receivedAt)}
                            </span>
                        </div>

                        <p className="text-[11px] text-foreground mt-3 leading-snug">
                            <span className="font-semibold">Reason:</span>{' '}
                            {escalationContext.reason}
                        </p>

                        {onScrollToItem && escalationContext.itemRef && (
                            <button
                                type="button"
                                onClick={() => onScrollToItem(escalationContext.itemRef!)}
                                className="mt-2 text-[10px] font-semibold text-foreground dark:text-primary hover:underline uppercase tracking-wider"
                            >
                                See row in the BoM →
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Body — 5 data-rich modules */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-minimal">
                {MODULES.map((module) => {
                    const Icon = module.icon
                    const isApproved = !!approved[module.id]
                    return (
                        <div
                            key={module.id}
                            className={clsx(
                                'rounded-xl border overflow-hidden transition-all duration-300',
                                isApproved
                                    ? 'bg-green-500/5 dark:bg-green-500/10 border-green-500/30'
                                    : 'bg-card dark:bg-zinc-800 border-border'
                            )}
                        >
                            {/* Module header */}
                            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/60">
                                <span
                                    className={clsx(
                                        'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                                        isApproved
                                            ? 'bg-green-500/15 text-green-700 dark:text-green-400'
                                            : 'bg-primary/10 text-foreground dark:text-primary'
                                    )}
                                >
                                    {isApproved ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <Icon className="w-4 h-4" />
                                    )}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-foreground leading-tight truncate">
                                        {module.title}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground leading-tight truncate">
                                        {module.subtitle}
                                    </p>
                                </div>
                                <span
                                    className={clsx(
                                        'text-[9px] font-bold uppercase tracking-wider shrink-0',
                                        isApproved
                                            ? 'text-green-700 dark:text-green-400'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {isApproved ? 'Approved' : 'Pending'}
                                </span>
                            </div>

                            {/* Data grid */}
                            <dl className="px-4 py-3 space-y-1.5">
                                {module.data.map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex items-baseline justify-between gap-3 text-[11px]"
                                    >
                                        <dt className="text-muted-foreground shrink-0">
                                            {row.label}
                                        </dt>
                                        <dd
                                            className={clsx(
                                                'text-right tabular-nums truncate',
                                                row.highlight
                                                    ? HIGHLIGHT_STYLES[row.highlight]
                                                    : 'text-foreground font-semibold'
                                            )}
                                        >
                                            {row.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            {/* AI suggestion block */}
                            <div className="mx-4 mb-3 rounded-lg bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 px-3 py-2.5">
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 leading-none">
                                            AI suggestion
                                        </p>
                                        <p className="text-[11px] text-foreground font-semibold leading-tight mt-1">
                                            {module.ai.summary}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground leading-snug mt-1">
                                            {module.ai.detail}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action row */}
                            <div className="px-4 pb-3 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleAccept(module.id)}
                                    disabled={isApproved}
                                    className={clsx(
                                        'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-opacity',
                                        isApproved
                                            ? 'bg-green-500/20 text-green-700 dark:text-green-400 cursor-default'
                                            : 'bg-primary text-primary-foreground hover:opacity-90'
                                    )}
                                >
                                    {isApproved ? (
                                        <>
                                            <CheckCircle2 className="w-3 h-3" />
                                            Approved
                                        </>
                                    ) : (
                                        <>
                                            {module.ai.acceptLabel}
                                            <ArrowRight className="w-3 h-3" />
                                        </>
                                    )}
                                </button>
                                {!isApproved && (
                                    <button
                                        type="button"
                                        className="px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                        title="Open manual override (not wired in the demo)"
                                    >
                                        Modify
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border bg-muted/20 space-y-2.5">
                <button
                    onClick={onPreviewPdf}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2"
                >
                    <FileText className="w-3.5 h-3.5" />
                    Preview Verification PDF
                </button>
                <button
                    onClick={handleSendBackClick}
                    disabled={!allApproved || leaving}
                    className={clsx(
                        'w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-opacity',
                        allApproved
                            ? 'bg-primary text-primary-foreground hover:opacity-90'
                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                    )}
                >
                    Send Back to Expert
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}

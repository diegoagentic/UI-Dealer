// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Project Context Panel
// v8 Paso B · Persistent iconographic card showing the site + logistics
// factors that actually drive the labor estimate (Section F multipliers,
// Section G transport charges, crew composition, scope limits…).
//
// Shows up across w1.1, w1.2, w2.1, w2.2, w2.3 so every role sees the same
// context. Each row is editable (click the pencil) and flagged rows carry
// an AI suggestion that can be accepted inline.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import { clsx } from 'clsx'
import {
    AlertTriangle,
    Building2,
    Check,
    ChevronDown,
    ClipboardList,
    Clock,
    DoorOpen,
    HardHat,
    Hammer,
    MapPin,
    Move,
    Pencil,
    Ruler,
    Sparkles,
    Stethoscope,
    Truck,
    Wrench,
} from 'lucide-react'

type IconKey =
    | 'location'
    | 'venue'
    | 'floor'
    | 'access'
    | 'push'
    | 'hours'
    | 'transport'
    | 'area'
    | 'crew'
    | 'equipment'
    | 'tools'
    | 'flags'

const ICON_MAP: Record<IconKey, typeof MapPin> = {
    location:  MapPin,
    venue:     Stethoscope,
    floor:     Building2,
    access:    DoorOpen,
    push:      Move,
    hours:     Clock,
    transport: Truck,
    area:      Ruler,
    crew:      HardHat,
    equipment: Hammer,
    tools:     Wrench,
    flags:     AlertTriangle,
}

interface ContextFact {
    id: string
    icon: IconKey
    label: string
    value: string
    detail?: string
    aiFlagged?: boolean
    aiSuggestion?: string
}

const INITIAL_FACTS: ContextFact[] = [
    {
        id: 'location',
        icon: 'location',
        label: 'Location',
        value: 'Downtown Fort Worth, TX',
        detail: '+$57 downtown surcharge (Section G)',
        aiFlagged: true,
    },
    {
        id: 'venue',
        icon: 'venue',
        label: 'Venue type',
        value: 'Hospital campus',
        detail: '+$114 hospital surcharge (Section G)',
        aiFlagged: true,
    },
    {
        id: 'floor',
        icon: 'floor',
        label: 'Floor',
        value: '2nd floor',
        detail: '+5% multiplier (Section F · above 2nd floor)',
    },
    {
        id: 'access',
        icon: 'access',
        label: 'Loading access',
        value: 'No dock · elevator only',
        detail: '+15% multiplier (Section F · no dock)',
        aiFlagged: true,
    },
    {
        id: 'push',
        icon: 'push',
        label: 'Push distance',
        value: '~180 ft',
        detail: 'Truck → install zone',
        aiSuggestion: '~220 ft (re-measured on floor plan)',
    },
    {
        id: 'hours',
        icon: 'hours',
        label: 'Hours',
        value: 'Standard business hours',
        detail: 'No overtime flag from sales',
    },
    {
        id: 'transport',
        icon: 'transport',
        label: 'Transport',
        value: 'Dallas → Fort Worth · 32 mi',
        detail: 'Under 50 mi threshold, no long-haul charge',
    },
    {
        id: 'area',
        icon: 'area',
        label: 'Floor area',
        value: '12,400 sq ft · 48 rooms',
        detail: 'Per JPS architectural drawings',
    },
    {
        id: 'crew',
        icon: 'crew',
        label: 'Crew needed',
        value: '4 installers · 3 days',
        detail: '185 hrs ÷ 3 days ÷ 8 h ≈ 4-person team',
        aiFlagged: true,
    },
    {
        id: 'equipment',
        icon: 'equipment',
        label: 'Equipment',
        value: 'Dollies, 2-wheelers, lift gate',
        detail: 'PPE kit included',
    },
    {
        id: 'tools',
        icon: 'tools',
        label: 'Tools',
        value: 'Allen wrench set, cordless drills',
        detail: 'Plus alignment spacers for the OFS serpentine',
    },
    {
        id: 'flags',
        icon: 'flags',
        label: 'Scope flags',
        value: '119 KD chairs exceed Pricer limit (50)',
        detail: 'Delivery Pricer override required',
        aiFlagged: true,
    },
]

interface ProjectContextPanelProps {
    defaultCollapsed?: boolean
}

export default function ProjectContextPanel({
    defaultCollapsed = false,
}: ProjectContextPanelProps) {
    const [facts, setFacts] = useState<ContextFact[]>(INITIAL_FACTS)
    const [collapsed, setCollapsed] = useState(defaultCollapsed)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [draftValue, setDraftValue] = useState<string>('')

    const startEdit = (fact: ContextFact) => {
        setEditingId(fact.id)
        setDraftValue(fact.value)
    }

    const saveEdit = () => {
        if (editingId) {
            setFacts((prev) =>
                prev.map((f) =>
                    f.id === editingId ? { ...f, value: draftValue.trim() || f.value } : f
                )
            )
        }
        setEditingId(null)
    }

    const cancelEdit = () => setEditingId(null)

    const acceptSuggestion = (id: string) => {
        setFacts((prev) =>
            prev.map((f) =>
                f.id === id && f.aiSuggestion
                    ? { ...f, value: f.aiSuggestion, aiSuggestion: undefined }
                    : f
            )
        )
    }

    const flaggedCount = facts.filter((f) => f.aiFlagged).length

    return (
        <div className="rounded-2xl bg-card dark:bg-zinc-800 border border-border overflow-hidden">
            {/* Header */}
            <button
                type="button"
                onClick={() => setCollapsed((c) => !c)}
                className="w-full flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border text-left hover:bg-muted/50 transition-colors"
            >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-foreground dark:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                        Project context
                    </p>
                    <p className="text-sm font-bold text-foreground leading-tight mt-0.5">
                        JPS Health Network · Health Center for Women
                    </p>
                </div>
                {flaggedCount > 0 && (
                    <span className="hidden md:flex shrink-0 items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-foreground dark:text-primary px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
                        <Sparkles className="w-2.5 h-2.5" />
                        {flaggedCount} AI flagged
                    </span>
                )}
                <ChevronDown
                    className={clsx(
                        'shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-200',
                        collapsed && '-rotate-90'
                    )}
                />
            </button>

            {/* Body */}
            {!collapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                    {facts.map((fact) => {
                        const Icon = ICON_MAP[fact.icon]
                        const isEditing = editingId === fact.id
                        return (
                            <div
                                key={fact.id}
                                className={clsx(
                                    'group relative bg-card dark:bg-zinc-800 px-4 py-3 transition-colors',
                                    fact.aiFlagged && 'bg-primary/[0.04] dark:bg-primary/[0.08]'
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={clsx(
                                            'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                                            fact.aiFlagged
                                                ? 'bg-primary/15 ring-1 ring-primary/30'
                                                : 'bg-muted/50'
                                        )}
                                    >
                                        <Icon
                                            className={clsx(
                                                'w-4 h-4',
                                                fact.aiFlagged
                                                    ? 'text-foreground dark:text-primary'
                                                    : 'text-muted-foreground'
                                            )}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                                                {fact.label}
                                            </p>
                                            {fact.aiFlagged && (
                                                <span className="text-[8px] font-bold uppercase tracking-wider text-foreground dark:text-primary flex items-center gap-0.5">
                                                    <Sparkles className="w-2 h-2" />
                                                    AI
                                                </span>
                                            )}
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                autoFocus
                                                value={draftValue}
                                                onChange={(e) => setDraftValue(e.target.value)}
                                                onBlur={saveEdit}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') saveEdit()
                                                    if (e.key === 'Escape') cancelEdit()
                                                }}
                                                className="mt-1 w-full text-xs font-semibold text-foreground bg-card dark:bg-zinc-900 border border-primary/40 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        ) : (
                                            <p className="text-xs font-semibold text-foreground leading-tight mt-1 truncate">
                                                {fact.value}
                                            </p>
                                        )}
                                        {fact.detail && !isEditing && (
                                            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">
                                                {fact.detail}
                                            </p>
                                        )}
                                        {fact.aiSuggestion && !isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => acceptSuggestion(fact.id)}
                                                className="mt-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-foreground dark:text-primary px-2 py-1 rounded-md bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
                                            >
                                                <Sparkles className="w-2.5 h-2.5" />
                                                AI suggests: {fact.aiSuggestion}
                                                <Check className="w-2.5 h-2.5" />
                                            </button>
                                        )}
                                    </div>
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => startEdit(fact)}
                                            className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-all"
                                            aria-label={`Edit ${fact.label}`}
                                        >
                                            <Pencil className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

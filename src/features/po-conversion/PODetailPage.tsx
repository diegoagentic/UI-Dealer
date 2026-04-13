import { useState } from 'react'
import { clsx } from 'clsx'
import {
    ArrowLeft, FileText, Building2, Package, DollarSign, Clock,
    CheckCircle2, XCircle, Download, ChevronDown, ChevronUp,
    Send, AlertTriangle, History, File,
} from 'lucide-react'
import { MOCK_PO_DRAFTS, MOCK_TIMELINE, MOCK_REVISIONS, MOCK_SUBMISSIONS, MOCK_ARTIFACTS } from './mockData'
import type { PurchaseOrderCoreV2, SubmissionAdapter } from './types'
import ConversionStatusBadge from './ConversionStatusBadge'

interface PODetailPageProps {
    onBack?: () => void
}

type Tab = 'details' | 'revisions'

const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })

// ── Component ──────────────────────────────────────────────
export default function PODetailPage({ onBack }: PODetailPageProps) {
    const [po, setPo] = useState<PurchaseOrderCoreV2>(MOCK_PO_DRAFTS[0])
    const [activeTab, setActiveTab] = useState<Tab>('details')
    const [expandedRevisions, setExpandedRevisions] = useState<Set<number>>(new Set())

    // dialogs
    const [showFinalizeDialog, setShowFinalizeDialog] = useState(false)
    const [showSubmitDialog, setShowSubmitDialog] = useState(false)
    const [submitAdapter, setSubmitAdapter] = useState<SubmissionAdapter>('edi')
    const [submitNotes, setSubmitNotes] = useState('')

    const grandTotal = po.financial.poTotalAmount + po.financial.taxAmount - po.financial.discountAmount

    // ── Actions ──
    const handleFinalize = () => {
        setPo(prev => ({ ...prev, orderStatus: 'FINALIZED', updatedAt: new Date().toISOString() }))
        setShowFinalizeDialog(false)
    }

    const handleSubmit = () => {
        setPo(prev => ({ ...prev, orderStatus: 'SUBMITTED', updatedAt: new Date().toISOString() }))
        setShowSubmitDialog(false)
        setSubmitNotes('')
    }

    const toggleRevision = (rev: number) => {
        setExpandedRevisions(prev => {
            const next = new Set(prev)
            next.has(rev) ? next.delete(rev) : next.add(rev)
            return next
        })
    }

    // ── Render ──────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background p-6 text-foreground">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <button onClick={onBack} className="hover:text-foreground transition-colors">Dashboard</button>
                <span>/</span>
                <button onClick={onBack} className="hover:text-foreground transition-colors">Purchase Orders</button>
                <span>/</span>
                <span className="text-foreground font-medium">{po.poNumber}</span>
            </nav>

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="rounded-lg p-2 hover:bg-muted transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{po.poNumber}</h1>
                            <ConversionStatusBadge status={po.orderStatus} size="md" />
                        </div>
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Building2 className="h-3.5 w-3.5" />
                            {po.vendor.vendorName} ({po.vendor.vendorCode})
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {po.orderStatus === 'DRAFT' && (
                        <button
                            onClick={() => setShowFinalizeDialog(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-300 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:opacity-90"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Finalize
                        </button>
                    )}
                    {po.orderStatus === 'FINALIZED' && (
                        <button
                            onClick={() => setShowSubmitDialog(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-300 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:opacity-90"
                        >
                            <Send className="h-4 w-4" />
                            Submit to Vendor
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1">
                {([
                    { key: 'details' as Tab, label: 'Details', icon: FileText },
                    { key: 'revisions' as Tab, label: 'Revision History', icon: History },
                ]).map(t => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={clsx(
                            'inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                            activeTab === t.key
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <t.icon className="h-4 w-4" />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {activeTab === 'details' ? (
                <DetailsTab po={po} grandTotal={grandTotal} />
            ) : (
                <RevisionsTab expandedRevisions={expandedRevisions} toggleRevision={toggleRevision} />
            )}

            {/* ── Finalize Dialog ── */}
            {showFinalizeDialog && (
                <DialogOverlay onClose={() => setShowFinalizeDialog(false)}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h2 className="text-lg font-semibold">Finalize Purchase Order?</h2>
                    </div>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Finalizing <strong>{po.poNumber}</strong> will lock all line items and financial data.
                        This action cannot be undone. The PO will be ready for vendor submission.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowFinalizeDialog(false)}
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFinalize}
                            className="rounded-lg bg-brand-300 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:opacity-90"
                        >
                            Confirm Finalize
                        </button>
                    </div>
                </DialogOverlay>
            )}

            {/* ── Submit Dialog ── */}
            {showSubmitDialog && (
                <DialogOverlay onClose={() => setShowSubmitDialog(false)}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                            <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-lg font-semibold">Submit to Vendor</h2>
                    </div>
                    <label className="mb-1 block text-sm font-medium">Adapter</label>
                    <select
                        value={submitAdapter}
                        onChange={e => setSubmitAdapter(e.target.value as SubmissionAdapter)}
                        className="mb-4 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                    >
                        <option value="edi">EDI 850</option>
                        <option value="email">Email</option>
                        <option value="portal">Vendor Portal</option>
                    </select>
                    <label className="mb-1 block text-sm font-medium">Notes (optional)</label>
                    <textarea
                        value={submitNotes}
                        onChange={e => setSubmitNotes(e.target.value)}
                        rows={3}
                        placeholder="Any special instructions for the vendor..."
                        className="mb-6 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowSubmitDialog(false)}
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="rounded-lg bg-brand-300 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:opacity-90"
                        >
                            Submit
                        </button>
                    </div>
                </DialogOverlay>
            )}
        </div>
    )
}

// ── Subcomponents ──────────────────────────────────────────

function DialogOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-md rounded-2xl bg-card dark:bg-zinc-800 border border-border p-6 shadow-xl">
                {children}
            </div>
        </div>
    )
}

function DetailsTab({ po, grandTotal }: { po: PurchaseOrderCoreV2; grandTotal: number }) {
    return (
        <div className="space-y-6">
            {/* Line Items */}
            <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border px-6 py-4">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-base font-semibold">Line Items</h2>
                    <span className="ml-auto text-xs text-muted-foreground">{po.lineItems.length} items</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                <th className="px-6 py-3 w-12">#</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3 text-right">Qty</th>
                                <th className="px-6 py-3 text-right">Unit Cost</th>
                                <th className="px-6 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {po.lineItems.map(li => (
                                <tr key={li.lineItemIndex} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-3 text-muted-foreground">{li.lineItemIndex}</td>
                                    <td className="px-6 py-3 font-mono text-xs">{li.productNumber}</td>
                                    <td className="px-6 py-3">{li.productDescription}</td>
                                    <td className="px-6 py-3 text-right">{li.quantity}</td>
                                    <td className="px-6 py-3 text-right">{fmt(li.productCost)}</td>
                                    <td className="px-6 py-3 text-right font-medium">{fmt(li.totalProduct)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Summary + Timeline side-by-side on large screens */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Financial Summary */}
                <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-base font-semibold">Financial Summary</h2>
                    </div>
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">Subtotal</dt>
                            <dd className="font-medium">{fmt(po.financial.poTotalAmount)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">Tax</dt>
                            <dd>{fmt(po.financial.taxAmount)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">Discount</dt>
                            <dd className="text-green-600 dark:text-green-400">-{fmt(po.financial.discountAmount)}</dd>
                        </div>
                        <hr className="border-border" />
                        <div className="flex justify-between text-base font-bold">
                            <dt>Grand Total</dt>
                            <dd>{fmt(grandTotal)}</dd>
                        </div>
                    </dl>
                </div>

                {/* Timeline */}
                <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-base font-semibold">Timeline</h2>
                    </div>
                    {MOCK_TIMELINE.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No timeline events yet</p>}
                    <ol className="relative ml-3 border-l border-border">
                        {MOCK_TIMELINE.map((ev, i) => {
                            const isLatest = i === MOCK_TIMELINE.length - 1
                            return (
                                <li key={ev.id} className="mb-6 ml-6 last:mb-0">
                                    <span
                                        className={clsx(
                                            'absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-card dark:border-zinc-800',
                                            isLatest
                                                ? 'bg-brand-300 dark:bg-brand-500'
                                                : 'bg-green-500'
                                        )}
                                    />
                                    <h3 className="text-sm font-medium">{ev.action}</h3>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {ev.actor} &middot; {fmtDate(ev.timestamp)}
                                    </p>
                                    {ev.details && (
                                        <p className="mt-1 text-xs text-muted-foreground">{ev.details}</p>
                                    )}
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>

            {/* Submission History (FE-07) */}
            {MOCK_SUBMISSIONS.length > 0 && (
                <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Send className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-base font-semibold">Submission History</h2>
                    </div>
                    <div className="overflow-x-auto scrollbar-micro">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left">
                                    <th className="pb-2 text-xs font-medium text-muted-foreground">Timestamp</th>
                                    <th className="pb-2 text-xs font-medium text-muted-foreground">Status</th>
                                    <th className="pb-2 text-xs font-medium text-muted-foreground">Adapter</th>
                                    <th className="pb-2 text-xs font-medium text-muted-foreground">Response</th>
                                    <th className="pb-2 text-xs font-medium text-muted-foreground">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {MOCK_SUBMISSIONS.map(s => (
                                    <tr key={s.id}>
                                        <td className="py-3 text-xs text-muted-foreground whitespace-nowrap">{fmtDate(s.timestamp)}</td>
                                        <td className="py-3">
                                            <span className={clsx('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border',
                                                s.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                                                s.status === 'FAILED' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                                                'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                                            )}>
                                                {s.status === 'DELIVERED' ? <CheckCircle2 className="h-3 w-3" /> : s.status === 'FAILED' ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-xs uppercase font-medium text-muted-foreground">{s.adapter}</td>
                                        <td className="py-3 text-xs font-mono text-muted-foreground">{s.responseCode ?? '—'}</td>
                                        <td className="py-3 text-xs text-foreground">{s.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Artifacts */}
            {MOCK_ARTIFACTS.length > 0 && (
                <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <File className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-base font-semibold">Artifacts</h2>
                    </div>
                    <ul className="divide-y divide-border">
                        {MOCK_ARTIFACTS.map(a => (
                            <li key={a.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{a.fileName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {a.format.toUpperCase()} &middot; {(a.fileSize / 1024).toFixed(0)} KB &middot; {fmtDate(a.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <button className="rounded-lg p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                    <Download className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

function RevisionsTab({
    expandedRevisions,
    toggleRevision,
}: {
    expandedRevisions: Set<number>
    toggleRevision: (rev: number) => void
}) {
    const diffBadge: Record<string, string> = {
        added: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400',
        removed: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400',
        changed: 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
    }

    if (MOCK_REVISIONS.length === 0) {
        return <p className="text-sm text-muted-foreground py-8 text-center">No revisions recorded</p>
    }

    return (
        <div className="space-y-3">
            {MOCK_REVISIONS.map(rev => {
                const isOpen = expandedRevisions.has(rev.revisionNumber)
                return (
                    <div
                        key={rev.revisionNumber}
                        className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm overflow-hidden"
                    >
                        <button
                            onClick={() => toggleRevision(rev.revisionNumber)}
                            className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">
                                    R{rev.revisionNumber}
                                </span>
                                <div>
                                    <p className="text-sm font-medium">{rev.changeSummary}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {rev.actor} &middot; {fmtDate(rev.timestamp)}
                                    </p>
                                </div>
                            </div>
                            {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>

                        {isOpen && (
                            <div className="border-t border-border px-6 py-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                            <th className="pb-2 pr-4">Field</th>
                                            <th className="pb-2 pr-4">Old</th>
                                            <th className="pb-2 pr-4">New</th>
                                            <th className="pb-2">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rev.diffs.map((d, i) => (
                                            <tr key={i} className="border-t border-border/50">
                                                <td className="py-2 pr-4 font-mono text-xs">{d.field}</td>
                                                <td className="py-2 pr-4 text-muted-foreground">{d.oldValue || '—'}</td>
                                                <td className="py-2 pr-4 font-medium">{d.newValue}</td>
                                                <td className="py-2">
                                                    <span className={clsx(
                                                        'inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize',
                                                        diffBadge[d.type]
                                                    )}>
                                                        {d.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

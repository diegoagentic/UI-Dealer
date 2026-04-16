/**
 * SDB-1315 · FE-03 — PO Detail Page (refactored)
 *
 * Uses the Sprint 1+2 standalone components instead of inline
 * implementations: FinalizePOButton, SubmitPODialog, SubmissionHistory,
 * RevisionHistory, ArtifactDownloads.
 */

import { useState } from 'react'
import { clsx } from 'clsx'
import {
    ArrowLeft, Building2, Clock, DollarSign, FileText,
    History, Package, Send,
} from 'lucide-react'
import { MOCK_PO_DRAFTS, MOCK_TIMELINE, MOCK_REVISIONS, MOCK_SUBMISSIONS, MOCK_ARTIFACTS } from './mockData'
import type { PurchaseOrderCoreV2 } from './types'
import ConversionStatusBadge from './ConversionStatusBadge'
import FinalizePOButton from './FinalizePOButton'
import SubmitPODialog from './SubmitPODialog'
import SubmissionHistory from './SubmissionHistory'
import RevisionHistory from './RevisionHistory'
import ArtifactDownloads from './ArtifactDownloads'

interface PODetailPageProps {
    onBack?: () => void
}

type Tab = 'details' | 'revisions' | 'submissions' | 'artifacts'

const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })

export default function PODetailPage({ onBack }: PODetailPageProps) {
    const [po, setPo] = useState<PurchaseOrderCoreV2>(MOCK_PO_DRAFTS[0])
    const [activeTab, setActiveTab] = useState<Tab>('details')
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false)

    const grandTotal =
        po.financial.poTotalAmount + po.financial.taxAmount - po.financial.discountAmount

    const TABS: Array<{ key: Tab; label: string; icon: typeof FileText }> = [
        { key: 'details', label: 'Details', icon: FileText },
        { key: 'revisions', label: 'Revisions', icon: History },
        { key: 'submissions', label: 'Submissions', icon: Send },
        { key: 'artifacts', label: 'Artifacts', icon: Package },
    ]

    return (
        <div className="min-h-screen bg-background p-6 text-foreground">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <button onClick={onBack} className="hover:text-foreground transition-colors">
                    Dashboard
                </button>
                <span>/</span>
                <button onClick={onBack} className="hover:text-foreground transition-colors">
                    Purchase Orders
                </button>
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

                {/* Action buttons — use standalone components */}
                <div className="flex items-center gap-2">
                    <FinalizePOButton
                        poNumber={po.poNumber}
                        status={po.orderStatus}
                        onFinalized={() =>
                            setPo((prev) => ({
                                ...prev,
                                orderStatus: 'FINALIZED',
                                updatedAt: new Date().toISOString(),
                            }))
                        }
                    />
                    {po.orderStatus === 'FINALIZED' && (
                        <button
                            onClick={() => setSubmitDialogOpen(true)}
                            className="flex items-center gap-2 rounded-lg bg-brand-300 dark:bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:opacity-90"
                        >
                            <Send className="h-4 w-4" />
                            Submit to Vendor
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1 overflow-x-auto">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={clsx(
                            'inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
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
            {activeTab === 'details' && (
                <div className="space-y-6">
                    {/* Line Items */}
                    <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-border px-6 py-4">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <h2 className="text-base font-semibold">Line Items</h2>
                            <span className="ml-auto text-xs text-muted-foreground">
                                {po.lineItems.length} items
                            </span>
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
                                    {po.lineItems.map((li) => (
                                        <tr
                                            key={li.lineItemIndex}
                                            className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                                        >
                                            <td className="px-6 py-3 text-muted-foreground">
                                                {li.lineItemIndex}
                                            </td>
                                            <td className="px-6 py-3 font-mono text-xs">
                                                {li.productNumber}
                                            </td>
                                            <td className="px-6 py-3">{li.productDescription}</td>
                                            <td className="px-6 py-3 text-right">{li.quantity}</td>
                                            <td className="px-6 py-3 text-right">
                                                {fmt(li.productCost)}
                                            </td>
                                            <td className="px-6 py-3 text-right font-medium">
                                                {fmt(li.totalProduct)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Financial Summary + Timeline */}
                    <div className="grid gap-6 lg:grid-cols-2">
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
                                    <dd className="text-green-600 dark:text-green-400">
                                        -{fmt(po.financial.discountAmount)}
                                    </dd>
                                </div>
                                <hr className="border-border" />
                                <div className="flex justify-between text-base font-bold">
                                    <dt>Grand Total</dt>
                                    <dd>{fmt(grandTotal)}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <h2 className="text-base font-semibold">Timeline</h2>
                            </div>
                            <ol className="relative ml-3 border-l border-border">
                                {MOCK_TIMELINE.map((ev, i) => (
                                    <li key={ev.id} className="mb-6 ml-6 last:mb-0">
                                        <span
                                            className={clsx(
                                                'absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-card dark:border-zinc-800',
                                                i === MOCK_TIMELINE.length - 1
                                                    ? 'bg-brand-300 dark:bg-brand-500'
                                                    : 'bg-green-500'
                                            )}
                                        />
                                        <h3 className="text-sm font-medium">{ev.action}</h3>
                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            {ev.actor} · {fmtDate(ev.timestamp)}
                                        </p>
                                        {ev.details && (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {ev.details}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'revisions' && (
                <RevisionHistory revisions={MOCK_REVISIONS} />
            )}

            {activeTab === 'submissions' && (
                <SubmissionHistory attempts={MOCK_SUBMISSIONS} />
            )}

            {activeTab === 'artifacts' && (
                <ArtifactDownloads artifacts={MOCK_ARTIFACTS} />
            )}

            {/* Submit PO Dialog (standalone) */}
            <SubmitPODialog
                isOpen={submitDialogOpen}
                poNumber={po.poNumber}
                vendorName={po.vendor.vendorName}
                totalAmount={grandTotal}
                onClose={() => setSubmitDialogOpen(false)}
                onSubmitted={() =>
                    setPo((prev) => ({
                        ...prev,
                        orderStatus: 'SUBMITTED',
                        updatedAt: new Date().toISOString(),
                    }))
                }
            />
        </div>
    )
}

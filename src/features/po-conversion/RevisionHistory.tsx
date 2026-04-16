/**
 * SDB-1315 · FE-09 — RevisionHistory
 *
 * Collapsible list of PO revisions with inline DiffViewer per revision.
 * Each revision shows: revision number, actor, timestamp, summary.
 * Expanding reveals the field-level diffs via DiffViewer.
 */

import { useState } from 'react'
import { clsx } from 'clsx'
import { ChevronDown, History, User } from 'lucide-react'
import type { PORevision } from './types'
import DiffViewer from './DiffViewer'

interface RevisionHistoryProps {
    revisions: PORevision[]
    loading?: boolean
}

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

export default function RevisionHistory({
    revisions,
    loading = false,
}: RevisionHistoryProps) {
    const [expandedRevs, setExpandedRevs] = useState<Set<number>>(new Set())

    const toggle = (rev: number) =>
        setExpandedRevs((prev) => {
            const next = new Set(prev)
            next.has(rev) ? next.delete(rev) : next.add(rev)
            return next
        })

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="h-16 rounded-xl bg-muted/40 animate-pulse" />
                ))}
            </div>
        )
    }

    if (revisions.length === 0) {
        return (
            <div className="rounded-2xl bg-muted/20 border border-border p-6 text-center">
                <History className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">
                    No revisions yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Revisions are created when the PO is edited after finalization.
                </p>
            </div>
        )
    }

    // Sort by revision number descending
    const sorted = [...revisions].sort((a, b) => b.revisionNumber - a.revisionNumber)

    return (
        <div className="space-y-2">
            {sorted.map((rev) => {
                const expanded = expandedRevs.has(rev.revisionNumber)
                return (
                    <div
                        key={rev.revisionNumber}
                        className="rounded-xl bg-card dark:bg-zinc-800 border border-border overflow-hidden"
                    >
                        {/* Row header */}
                        <button
                            type="button"
                            onClick={() => toggle(rev.revisionNumber)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/20 transition-colors"
                        >
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 tabular-nums">
                                    R{rev.revisionNumber}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">
                                    {rev.changeSummary}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <User className="w-2.5 h-2.5 text-muted-foreground" />
                                    <span className="text-[10px] text-muted-foreground">
                                        {rev.actor}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                        · {fmtDate(rev.timestamp)}
                                    </span>
                                </div>
                            </div>
                            <span className="shrink-0 text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted/50 border border-border tabular-nums">
                                {rev.diffs.length} change{rev.diffs.length !== 1 ? 's' : ''}
                            </span>
                            <ChevronDown
                                className={clsx(
                                    'w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0',
                                    expanded && 'rotate-180'
                                )}
                            />
                        </button>

                        {/* Expanded diff */}
                        {expanded && (
                            <div className="px-4 pb-4 border-t border-border pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                <DiffViewer diffs={rev.diffs} />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

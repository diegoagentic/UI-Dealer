// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Audit Trail Panel
// Refinement Phase 6d (Pain #4 — no structured data layer)
//
// Floating card on the top-right of the Shell (below the navbar pill) that
// logs every meaningful action the AI or the connected user takes. Proves
// the 'Recovery Active' pill in the navbar isn't decorative: the entries
// here are what would be written back to CORE as the audit trail PDF.
//
// Hidden during w2.2 (Designer verification) because the slide-in overlay
// claims the right side of the Shell.
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import {
    Activity,
    ChevronDown,
    ShieldCheck,
    Sparkles,
    User,
    UserCheck,
    X,
} from 'lucide-react'

export type AuditCategory = 'system' | 'ai' | 'edit' | 'approval' | 'release'

export interface AuditEvent {
    id: string
    timestamp: number
    actor: string
    action: string
    category: AuditCategory
}

interface AuditTrailPanelProps {
    events: AuditEvent[]
    hidden?: boolean
}

const CATEGORY_META: Record<
    AuditCategory,
    { icon: typeof Sparkles; tone: string }
> = {
    system:   { icon: Activity,    tone: 'text-muted-foreground' },
    ai:       { icon: Sparkles,    tone: 'text-indigo-500 dark:text-indigo-400' },
    edit:     { icon: User,        tone: 'text-blue-500 dark:text-blue-400' },
    approval: { icon: UserCheck,   tone: 'text-green-500 dark:text-green-400' },
    release:  { icon: ShieldCheck, tone: 'text-foreground dark:text-primary' },
}

function formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

export default function AuditTrailPanel({ events, hidden = false }: AuditTrailPanelProps) {
    const [expanded, setExpanded] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)
    const prevCountRef = useRef(events.length)

    // Auto-scroll the list to the bottom when a new event is appended
    useEffect(() => {
        if (!expanded) return
        if (events.length <= prevCountRef.current) {
            prevCountRef.current = events.length
            return
        }
        prevCountRef.current = events.length
        const el = listRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [events, expanded])

    if (hidden) return null

    const count = events.length
    const latest = events[events.length - 1]

    return (
        <div
            className="fixed top-24 right-6 lg:right-10 z-30 flex flex-col items-end"
            role="region"
            aria-label="Audit trail"
        >
            {/* Collapsed trigger — always rendered so the count stays visible */}
            <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className={clsx(
                    'group flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-border shadow-lg transition-all hover:border-primary/40',
                    expanded && 'opacity-0 pointer-events-none'
                )}
                aria-expanded={expanded}
            >
                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                    <Activity className="w-3.5 h-3.5 text-foreground dark:text-primary" />
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center tabular-nums">
                            {count}
                        </span>
                    )}
                </span>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                        Audit Trail
                    </span>
                    <span className="text-[10px] text-foreground font-semibold truncate max-w-[160px]">
                        {latest ? latest.action : 'Session opened'}
                    </span>
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            {/* Expanded panel */}
            <div
                className={clsx(
                    'w-80 max-h-[60vh] rounded-2xl bg-card/95 dark:bg-zinc-800/95 backdrop-blur-xl border border-border shadow-2xl overflow-hidden transition-all duration-300 flex flex-col',
                    expanded
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none absolute top-0'
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2 min-w-0">
                        <Activity className="w-3.5 h-3.5 text-foreground dark:text-primary shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                                Audit Trail
                            </p>
                            <p className="text-xs text-foreground font-semibold leading-tight">
                                {count} event{count === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setExpanded(false)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                        aria-label="Collapse audit trail"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Event list */}
                <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-minimal"
                >
                    {events.length === 0 && (
                        <p className="px-3 py-4 text-center text-[11px] text-muted-foreground">
                            No events yet.
                        </p>
                    )}
                    {events.map((event) => {
                        const meta = CATEGORY_META[event.category]
                        const Icon = meta.icon
                        return (
                            <div
                                key={event.id}
                                className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/40 transition-colors"
                            >
                                <span
                                    className={clsx(
                                        'shrink-0 mt-0.5 w-5 h-5 rounded-md bg-muted/60 flex items-center justify-center',
                                        meta.tone
                                    )}
                                >
                                    <Icon className="w-3 h-3" />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] text-foreground leading-tight">
                                        {event.action}
                                    </p>
                                    <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 font-mono">
                                        {formatTime(event.timestamp)} · {event.actor}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-border bg-muted/20">
                    <p className="text-[9px] text-muted-foreground leading-tight">
                        Every event is written to CORE on release, with full signatures.
                    </p>
                </div>
            </div>
        </div>
    )
}

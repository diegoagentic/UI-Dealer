// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Designer Task Notification
// v7 · w1.2 preamble
//
// Centered click-to-open card that appears the moment the demo enters
// w1.2 (Designer verification). Lives on a dimmed backdrop so the user
// has to explicitly acknowledge the task before the right-side
// DesignerVerificationOverlay slides in. Feels like an inbox / task-list
// notification landing in Alex's queue.
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { ArrowRight, Bell, Clock } from 'lucide-react'
import type { HandoffPerson } from './RoleHandoffTransition'

interface DesignerTaskNotificationProps {
    isOpen: boolean
    fromUser: HandoffPerson
    taskTitle: string
    taskSummary: string
    onOpen: () => void
}

function formatElapsed(ts: number): string {
    const seconds = Math.max(0, Math.round((Date.now() - ts) / 1000))
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.round(seconds / 60)
    return `${minutes}m ago`
}

export default function DesignerTaskNotification({
    isOpen,
    fromUser,
    taskTitle,
    taskSummary,
    onOpen,
}: DesignerTaskNotificationProps) {
    const [receivedAt] = useState<number>(() => Date.now())
    const [entered, setEntered] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            setEntered(false)
            return
        }
        const t = requestAnimationFrame(() => setEntered(true))
        return () => cancelAnimationFrame(t)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className={clsx(
                'fixed inset-0 z-[240] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm transition-opacity duration-300',
                entered ? 'opacity-100' : 'opacity-0'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="designer-task-title"
        >
            <button
                type="button"
                onClick={onOpen}
                className={clsx(
                    'w-full max-w-md mx-4 text-left rounded-2xl bg-card dark:bg-zinc-800 border border-border shadow-2xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40',
                    entered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
                )}
            >
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-foreground dark:text-primary" />
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider leading-none text-muted-foreground">
                            Strata · Inbox
                        </p>
                        <p className="text-sm font-bold text-foreground leading-tight mt-0.5">
                            New verification request
                        </p>
                    </div>
                    <span className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatElapsed(receivedAt)}
                    </span>
                </div>

                {/* Body */}
                <div className="flex items-start gap-3 px-5 py-4">
                    <img
                        src={fromUser.photo}
                        alt={fromUser.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <p
                            id="designer-task-title"
                            className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none"
                        >
                            From {fromUser.name} · {fromUser.role}
                        </p>
                        <p className="text-sm font-semibold text-foreground leading-tight mt-1">
                            {taskTitle}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug mt-1">
                            {taskSummary}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-2 px-5 py-3 border-t border-border bg-muted/20">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                        Click to open
                    </span>
                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                        Open task
                        <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </button>
        </div>
    )
}

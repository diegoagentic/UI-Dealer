import { type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface QuickAction {
    icon: ReactNode
    label: string
    action?: () => void
}

interface QuickActionsProps {
    actions: QuickAction[]
    compact?: boolean
    title?: string
}

export function QuickActions({ actions, compact, title = 'Quick Actions' }: QuickActionsProps) {
    if (compact) {
        return (
            <div className="flex items-center gap-1">
                {actions.map((a, i) => (
                    <button
                        key={i}
                        onClick={a.action}
                        className="p-2 rounded-lg hover:bg-brand-300 dark:hover:bg-brand-600/50 text-muted-foreground hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title={a.label}
                    >
                        {a.icon}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
            <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-none">
                {actions.map((a, i) => (
                    <button
                        key={i}
                        onClick={a.action}
                        className="flex-1 min-w-[140px] flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                        <div className="h-9 w-9 rounded-full bg-brand-300 dark:bg-brand-500 text-zinc-900 flex items-center justify-center shrink-0">
                            {a.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground flex-1 text-left">{a.label}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </button>
                ))}
            </div>
        </div>
    )
}

import { type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface QuickAction {
    icon: ReactNode
    label: string
    action?: () => void
}

interface QuickActionsProps {
    actions: QuickAction[]
    title?: string
}

export function QuickActions({ actions, title = 'Quick Actions' }: QuickActionsProps) {
    return (
        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-4">
            <h4 className="text-xs font-semibold text-foreground mb-3">{title}</h4>
            <div className="flex items-stretch gap-2 overflow-x-auto scrollbar-none">
                {actions.map((a, i) => (
                    <button
                        key={i}
                        onClick={a.action}
                        className="flex-1 min-w-[120px] flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                        <div className="h-8 w-8 rounded-full bg-brand-300 dark:bg-brand-500 text-zinc-900 flex items-center justify-center shrink-0">
                            {a.icon}
                        </div>
                        <span className="text-xs font-medium text-foreground flex-1 text-left">{a.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </button>
                ))}
            </div>
        </div>
    )
}

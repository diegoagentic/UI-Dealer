import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
    value: string
    label: string
    icon: ReactNode
    trend?: { value: string; positive: boolean }
    sub?: string
    compact?: boolean
}

export function MetricCard({ value, label, icon, trend, compact }: MetricCardProps) {
    if (compact) {
        return (
            <div className="flex items-center gap-3 shrink-0">
                <div className="h-10 w-10 rounded-full bg-brand-300 dark:bg-brand-500 text-zinc-900 flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground leading-tight">{value}</span>
                    <span className="text-[10px] text-muted-foreground capitalize">{label}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm flex flex-col justify-between p-6 min-w-[200px] h-[128px]">
            <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold text-foreground tracking-tight">{value}</span>
                <div className="h-9 w-9 rounded-full bg-brand-300 dark:bg-brand-500 text-zinc-900 flex items-center justify-center shrink-0">
                    {icon}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground capitalize">{label}</span>
                {trend && (
                    <div className="flex items-center gap-1 text-sm">
                        {trend.positive
                            ? <TrendingUp className="h-4 w-4 text-brand-500" />
                            : <TrendingDown className="h-4 w-4 text-destructive" />
                        }
                        <span>
                            <span className={trend.positive ? 'text-brand-500 font-medium' : 'text-destructive font-medium'}>{trend.value}</span>
                            <span className="text-muted-foreground"> vs last week</span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

interface MetricGridProps {
    metrics: Array<{
        label: string
        value: string
        icon: ReactNode
        trend?: { value: string; positive: boolean }
        sub?: string
    }>
    compact?: boolean
}

export function MetricGrid({ metrics, compact }: MetricGridProps) {
    if (compact) {
        return (
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
                {metrics.map((m, i) => (
                    <div key={i} className="flex items-center gap-6 shrink-0">
                        <MetricCard {...m} compact />
                        {i < metrics.length - 1 && <div className="w-px h-10 bg-border shrink-0" />}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {metrics.map((m, i) => (
                <MetricCard key={i} {...m} />
            ))}
        </div>
    )
}

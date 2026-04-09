import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
    value: string
    label: string
    icon: ReactNode
    trend?: { value: string; positive: boolean }
}

export function MetricCard({ value, label, icon, trend }: MetricCardProps) {
    return (
        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm flex flex-col justify-between p-5 min-w-[200px] flex-1 shrink-0 h-[112px]">
            <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-foreground tracking-tight">{value}</span>
                <div className="h-8 w-8 rounded-full bg-brand-300 dark:bg-brand-500 text-zinc-900 flex items-center justify-center shrink-0">
                    {icon}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground capitalize">{label}</span>
                {trend && (
                    <div className="flex items-center gap-1 text-[11px]">
                        {trend.positive
                            ? <TrendingUp className="h-3.5 w-3.5 text-brand-500" />
                            : <TrendingDown className="h-3.5 w-3.5 text-destructive" />
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
    }>
}

export function MetricGrid({ metrics }: MetricGridProps) {
    return (
        <div className="flex gap-4 overflow-x-auto scrollbar-micro pb-1">
            {metrics.map((m, i) => (
                <MetricCard key={i} {...m} />
            ))}
        </div>
    )
}

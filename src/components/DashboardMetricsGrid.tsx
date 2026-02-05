import { SalesAreaChart } from './charts/SalesAreaChart';
import { CategoryDonutChart } from './charts/CategoryDonutChart';
import { FunnelBarChart } from './charts/FunnelBarChart';
import { InventoryHealthChart } from './charts/InventoryHealthChart';
import { QuotePipelineChart } from './charts/QuotePipelineChart';
import { LogisticsStatusChart } from './charts/LogisticsStatusChart';
import { MarginTrendChart } from './charts/MarginTrendChart';
import { TeamWorkloadChart } from './charts/TeamWorkloadChart';
import { ClientTreemapChart } from './charts/ClientTreemapChart';

interface DashboardMetricsGridProps {
    selectedClient: string;
}

export default function DashboardMetricsGrid({ selectedClient }: DashboardMetricsGridProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Performance Command Center</h3>
                    <p className="text-sm text-muted-foreground">
                        {selectedClient === 'All Clients' ? 'Overview across all clients' : `Showing analytics for ${selectedClient}`}
                    </p>
                </div>
            </div>

            {/* Bento Grid Layout - 4 Columns Base */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">

                {/* Row 1: Core Performance */}
                <div className="xl:col-span-2">
                    <SalesAreaChart />
                </div>
                <div className="xl:col-span-1">
                    <CategoryDonutChart />
                </div>
                <div className="xl:col-span-1">
                    <FunnelBarChart />
                </div>

                {/* Row 2: Operational Insights */}
                <div className="xl:col-span-1">
                    <LogisticsStatusChart />
                </div>
                <div className="xl:col-span-2">
                    <MarginTrendChart />
                </div>
                <div className="xl:col-span-1">
                    <TeamWorkloadChart />
                </div>

                {/* Row 3: Strategic & Pipeline */}
                <div className="xl:col-span-2">
                    <ClientTreemapChart />
                </div>
                <div className="xl:col-span-1">
                    <InventoryHealthChart />
                </div>
                <div className="xl:col-span-1">
                    <QuotePipelineChart />
                </div>

            </div>
        </div>
    );
}

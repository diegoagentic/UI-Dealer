import { AlertTriangle, Box, CheckCircle2, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { SlideOver, SlideOverHeader, SlideOverTitle, SlideOverDescription, SlideOverBody, Badge, Button } from 'strata-design-system';

interface SelectedItem {
    id: string;
    name: string;
    category: string;
    properties: string;
    stock: number;
    status: string;
    aiStatus?: string;
}

interface AIDiagnosisSlideOverProps {
    open: boolean;
    onClose: () => void;
    transactionType: 'quote' | 'order' | 'ack' | 'project';
    selectedItem: SelectedItem;
    onApply: () => void;
}

const ANALYSIS_BY_TYPE: Record<string, { focus: string; recommendations: { title: string; description: string; impact: string }[] }> = {
    quote: {
        focus: 'Price Competitiveness',
        recommendations: [
            { title: 'Volume Discount Opportunity', description: 'Bundling with 3 related items could reduce unit cost by 8%', impact: 'High' },
            { title: 'Alternative Configuration', description: 'Standard finish option available at 15% lower price point', impact: 'Medium' },
        ],
    },
    order: {
        focus: 'Fulfillment Risk',
        recommendations: [
            { title: 'Substitute Available', description: 'Compatible product in stock with faster lead time (2 weeks vs 6)', impact: 'High' },
            { title: 'Expedite Shipping', description: 'Priority shipping available — adds $45 but saves 5 business days', impact: 'Medium' },
        ],
    },
    ack: {
        focus: 'Discrepancy Detection',
        recommendations: [
            { title: 'Date Slip Detected', description: 'Manufacturer pushed delivery from Mar 15 to Apr 2 — notify dealer', impact: 'High' },
            { title: 'Quantity Adjustment', description: 'ACK confirms 95 units vs 100 ordered — review partial fulfillment', impact: 'Medium' },
        ],
    },
    project: {
        focus: 'Inventory Optimization',
        recommendations: [
            { title: 'Reorder Threshold', description: 'Stock at 12% of monthly demand — suggest reorder within 5 days', impact: 'High' },
            { title: 'Slow-Moving SKU', description: 'No movement in 45 days — consider markdown or relocation', impact: 'Low' },
        ],
    },
};

export default function AIDiagnosisSlideOver({ open, onClose, transactionType, selectedItem, onApply }: AIDiagnosisSlideOverProps) {
    const analysis = ANALYSIS_BY_TYPE[transactionType];
    const isWarning = selectedItem.aiStatus === 'warning';
    const stockPercent = Math.min(100, Math.round((selectedItem.stock / 500) * 100));

    return (
        <SlideOver open={open} onClose={() => onClose()}>
            <SlideOverHeader onClose={onClose}>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <SlideOverTitle>AI Item Diagnosis</SlideOverTitle>
                </div>
                <SlideOverDescription>Intelligent analysis for {selectedItem.name}</SlideOverDescription>
            </SlideOverHeader>
            <SlideOverBody>
                <div className="space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                        <Badge variant={isWarning ? 'warning' : 'default'}>
                            {isWarning ? 'Attention Required' : 'Optimization Available'}
                        </Badge>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Focus: {analysis.focus}</span>
                    </div>

                    {/* Stock Health */}
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Box className="h-4 w-4 text-zinc-500" />
                                <span className="text-sm font-medium text-zinc-900 dark:text-white">Stock Health</span>
                            </div>
                            <span className="text-sm text-zinc-500">{selectedItem.stock} units</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all ${stockPercent > 50 ? 'bg-green-500' : stockPercent > 20 ? 'bg-amber-500' : 'bg-red-500'}`}
                                style={{ width: `${stockPercent}%` }}
                            />
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {stockPercent > 50 ? 'Healthy stock level' : stockPercent > 20 ? 'Below average — monitor closely' : 'Critical — reorder recommended'}
                        </p>
                    </div>

                    {/* Price Optimization */}
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">Price Optimization</span>
                            <TrendingDown className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            AI detected potential savings of <span className="font-semibold text-green-600 dark:text-green-400">8-12%</span> through alternative configurations or volume adjustments.
                        </p>
                    </div>

                    {/* Demand Forecast */}
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">Demand Forecast</span>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Projected demand increase of <span className="font-semibold text-blue-600 dark:text-blue-400">+15%</span> over next quarter based on historical patterns and current pipeline.
                        </p>
                    </div>

                    {/* Recommendations */}
                    <div>
                        <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Recommendations</h4>
                        <div className="space-y-3">
                            {analysis.recommendations.map((rec, i) => (
                                <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                                    <div className="flex items-start gap-2">
                                        {rec.impact === 'High' ? (
                                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                        ) : (
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{rec.title}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{rec.description}</p>
                                        </div>
                                        <Badge variant={rec.impact === 'High' ? 'warning' : rec.impact === 'Medium' ? 'default' : 'outline'} className="ml-auto shrink-0 text-xs">
                                            {rec.impact}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="ghost" onClick={onClose}>Dismiss</Button>
                    <Button variant="primary" onClick={() => { onApply(); onClose(); }}>Apply Recommendation</Button>
                </div>
            </SlideOverBody>
        </SlideOver>
    );
}

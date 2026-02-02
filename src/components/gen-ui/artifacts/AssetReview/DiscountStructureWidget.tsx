import { useState } from 'react';
import { TagIcon, CalculatorIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface DiscountStructureWidgetProps {
    subtotal: number;
    onApply: (finalTotal: number) => void;
}

export default function DiscountStructureWidget({ subtotal, onApply }: DiscountStructureWidgetProps) {
    const [discounts, setDiscounts] = useState({
        volume: { enabled: true, rate: 5 },
        dealer: { enabled: true, rate: 45 }, // Standard dealer discount
        special: { enabled: false, rate: 0 }
    });

    const calculateTotal = () => {
        let currentTotal = subtotal;
        let totalDiscount = 0;

        if (discounts.volume.enabled) {
            const amount = subtotal * (discounts.volume.rate / 100);
            totalDiscount += amount;
        }
        if (discounts.dealer.enabled) {
            const amount = subtotal * (discounts.dealer.rate / 100);
            totalDiscount += amount;
        }
        if (discounts.special.enabled) {
            const amount = subtotal * (discounts.special.rate / 100);
            totalDiscount += amount;
        }

        return {
            discountAmount: totalDiscount,
            finalTotal: subtotal - totalDiscount
        };
    };

    const { discountAmount, finalTotal } = calculateTotal();
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const toggleDiscount = (key: keyof typeof discounts) => {
        setDiscounts(prev => ({
            ...prev,
            [key]: { ...prev[key], enabled: !prev[key].enabled }
        }));
    };

    const updateRate = (key: keyof typeof discounts, rate: number) => {
        setDiscounts(prev => ({
            ...prev,
            [key]: { ...prev[key], rate }
        }));
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                        <TagIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground">Discount Structure</h3>
                        <p className="text-sm text-muted-foreground">Configure pricing adjustments</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Original Subtotal</div>
                    <div className="font-mono font-medium text-foreground">{formatCurrency(subtotal)}</div>
                </div>
            </div>

            <div className="space-y-4">
                {/* Dealer Discount */}
                <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={discounts.dealer.enabled}
                            onChange={() => toggleDiscount('dealer')}
                            className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary"
                        />
                        <div>
                            <div className="font-medium text-sm">Standard Dealer Discount</div>
                            <div className="text-xs text-muted-foreground">Contractual agreement base rate</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                value={discounts.dealer.rate}
                                onChange={(e) => updateRate('dealer', parseFloat(e.target.value))}
                                disabled={!discounts.dealer.enabled}
                                className="w-16 px-2 py-1 text-right text-sm border border-zinc-200 rounded disabled:opacity-50"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                        </div>
                        <div className="w-24 text-right font-mono text-sm text-red-600">
                            -{formatCurrency(subtotal * (discounts.dealer.rate / 100))}
                        </div>
                    </div>
                </div>

                {/* Volume Discount */}
                <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={discounts.volume.enabled}
                            onChange={() => toggleDiscount('volume')}
                            className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary"
                        />
                        <div>
                            <div className="font-medium text-sm">Volume Incentive</div>
                            <div className="text-xs text-muted-foreground">Applied for orders over $100k</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                value={discounts.volume.rate}
                                onChange={(e) => updateRate('volume', parseFloat(e.target.value))}
                                disabled={!discounts.volume.enabled}
                                className="w-16 px-2 py-1 text-right text-sm border border-zinc-200 rounded disabled:opacity-50"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                        </div>
                        <div className="w-24 text-right font-mono text-sm text-red-600">
                            -{formatCurrency(subtotal * (discounts.volume.rate / 100))}
                        </div>
                    </div>
                </div>

                {/* Special Projects */}
                <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={discounts.special.enabled}
                            onChange={() => toggleDiscount('special')}
                            className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary"
                        />
                        <div>
                            <div className="font-medium text-sm">Special Project Pricing</div>
                            <div className="text-xs text-muted-foreground">Additional manual adjustment</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                value={discounts.special.rate}
                                onChange={(e) => updateRate('special', parseFloat(e.target.value))}
                                disabled={!discounts.special.enabled}
                                className="w-16 px-2 py-1 text-right text-sm border border-zinc-200 rounded disabled:opacity-50"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                        </div>
                        <div className="w-24 text-right font-mono text-sm text-red-600">
                            -{formatCurrency(subtotal * (discounts.special.rate / 100))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-end">
                <div className="text-sm text-muted-foreground">
                    <p>Total Savings: <span className="text-green-600 font-medium">{formatCurrency(discountAmount)}</span></p>
                </div>
                <div>
                    <div className="text-right mb-4">
                        <div className="text-sm text-muted-foreground">Net Total</div>
                        <div className="text-2xl font-bold text-foreground">{formatCurrency(finalTotal)}</div>
                    </div>
                    <button
                        onClick={() => onApply(finalTotal)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 px-6 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2"
                    >
                        <CalculatorIcon className="w-5 h-5" />
                        Confirm Pricing
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from 'strata-design-system';

interface FilterPopoverProps {
    onApply: (filters: { statuses: string[]; categories: string[] }) => void;
}

const STATUS_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock', 'Needs Review'];
const CATEGORY_OPTIONS = ['Premium Series', 'Standard Series', 'Meeting & Conference', 'Storage & Filing', 'Accessories'];

export default function FilterPopover({ onApply }: FilterPopoverProps) {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleStatus = (s: string) =>
        setSelectedStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

    const toggleCategory = (c: string) =>
        setSelectedCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

    const handleClear = () => {
        setSelectedStatuses([]);
        setSelectedCategories([]);
    };

    return (
        <Popover className="relative">
            <PopoverButton className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-input rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-foreground">
                <FunnelIcon className="h-4 w-4" />
                Filter
                {(selectedStatuses.length + selectedCategories.length) > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white font-semibold">
                        {selectedStatuses.length + selectedCategories.length}
                    </span>
                )}
            </PopoverButton>
            <PopoverPanel className="absolute left-0 z-10 mt-2 w-64 origin-top-left rounded-xl bg-card border border-border shadow-lg p-4">
                {({ close }) => (
                    <div className="space-y-4">
                        {/* Status */}
                        <div>
                            <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-2">Status</h4>
                            <div className="space-y-1.5">
                                {STATUS_OPTIONS.map(s => (
                                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedStatuses.includes(s)}
                                            onChange={() => toggleStatus(s)}
                                            className="h-3.5 w-3.5 rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{s}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-2">Category</h4>
                            <div className="space-y-1.5">
                                {CATEGORY_OPTIONS.map(c => (
                                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(c)}
                                            onChange={() => toggleCategory(c)}
                                            className="h-3.5 w-3.5 rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
                            <Button variant="ghost" onClick={handleClear} className="text-xs">Clear</Button>
                            <Button variant="primary" onClick={() => { onApply({ statuses: selectedStatuses, categories: selectedCategories }); close(); }} className="text-xs">Apply</Button>
                        </div>
                    </div>
                )}
            </PopoverPanel>
        </Popover>
    );
}

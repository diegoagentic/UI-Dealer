import { useState } from 'react';
import { SlideOver, SlideOverHeader, SlideOverTitle, SlideOverDescription, SlideOverBody, Button, Input } from 'strata-design-system';

interface AddItemSlideOverProps {
    open: boolean;
    onClose: () => void;
    transactionType: 'quote' | 'order' | 'ack' | 'project';
    onAdd: () => void;
}

const TYPE_LABELS: Record<string, string> = {
    quote: 'Quote',
    order: 'Order',
    ack: 'Acknowledgment',
    project: 'Inventory',
};

export default function AddItemSlideOver({ open, onClose, transactionType, onAdd }: AddItemSlideOverProps) {
    const [sku, setSku] = useState('');
    const label = TYPE_LABELS[transactionType];

    const handleAdd = () => {
        onAdd();
        setSku('');
        onClose();
    };

    return (
        <SlideOver open={open} onClose={() => onClose()}>
            <SlideOverHeader onClose={onClose}>
                <SlideOverTitle>Add Line Item</SlideOverTitle>
                <SlideOverDescription>Add a new item to this {label}</SlideOverDescription>
            </SlideOverHeader>
            <SlideOverBody>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">SKU / Product Code</label>
                        <Input placeholder="e.g. SKU-OFF-2025-009" value={sku} onChange={(e) => setSku(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Product Name</label>
                        <Input placeholder="e.g. Executive Chair Pro" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Category</label>
                            <select className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/25">
                                <option>Premium Series</option>
                                <option>Standard Series</option>
                                <option>Meeting & Conference</option>
                                <option>Storage & Filing</option>
                                <option>Accessories</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Properties</label>
                            <Input placeholder="e.g. Leather / Black" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Quantity</label>
                            <Input type="number" placeholder="1" defaultValue="1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Unit Price</label>
                            <Input type="number" placeholder="0.00" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAdd}>Add Item</Button>
                </div>
            </SlideOverBody>
        </SlideOver>
    );
}

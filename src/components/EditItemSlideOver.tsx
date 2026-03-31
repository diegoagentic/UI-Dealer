import { useState, useEffect } from 'react';
import { SlideOver, SlideOverHeader, SlideOverTitle, SlideOverDescription, SlideOverBody } from 'strata-design-system';
import { Button, Input } from 'strata-design-system';

interface SelectedItem {
    id: string;
    name: string;
    category: string;
    properties: string;
    stock: number;
    status: string;
}

interface EditItemSlideOverProps {
    open: boolean;
    onClose: () => void;
    transactionType: 'quote' | 'order' | 'ack' | 'project';
    transactionId: string;
    selectedItem: SelectedItem;
    onSave: () => void;
}

const TRANSACTION_LABELS: Record<string, { type: string; qtyLabel: string; priceLabel: string }> = {
    quote: { type: 'Quotation', qtyLabel: 'Quoted Quantity', priceLabel: 'Quoted Price' },
    order: { type: 'Purchase Order', qtyLabel: 'Order Quantity', priceLabel: 'Unit Price' },
    ack: { type: 'Acknowledgement', qtyLabel: 'Confirmed Quantity', priceLabel: 'Confirmed Price' },
    project: { type: 'Catalog', qtyLabel: 'Stock Quantity', priceLabel: 'List Price' },
};

const STATUS_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock', 'Needs Review', 'Backordered'];

export default function EditItemSlideOver({ open, onClose, transactionType, transactionId, selectedItem, onSave }: EditItemSlideOverProps) {
    const labels = TRANSACTION_LABELS[transactionType];

    const [productName, setProductName] = useState(selectedItem.name);
    const [sku, setSku] = useState(selectedItem.id);
    const [category, setCategory] = useState(selectedItem.category);
    const [properties, setProperties] = useState(selectedItem.properties);
    const [quantity, setQuantity] = useState('50');
    const [unitPrice, setUnitPrice] = useState('450.00');
    const [status, setStatus] = useState(selectedItem.status);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (open) {
            setProductName(selectedItem.name);
            setSku(selectedItem.id);
            setCategory(selectedItem.category);
            setProperties(selectedItem.properties);
            setStatus(selectedItem.status);
            setQuantity('50');
            setUnitPrice('450.00');
            setNotes('');
        }
    }, [open, selectedItem]);

    const handleSave = () => {
        onSave();
        onClose();
    };

    return (
        <SlideOver open={open} onClose={onClose}>
            <SlideOverHeader onClose={onClose}>
                <SlideOverTitle>Edit Line Item</SlideOverTitle>
                <SlideOverDescription>
                    Editing {selectedItem.name} in {labels.type} #{transactionId}
                </SlideOverDescription>
            </SlideOverHeader>
            <SlideOverBody>
                <div className="space-y-5">
                    {/* Item Identification */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide">Item Information</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">SKU ID</label>
                                <Input value={sku} onChange={(e) => setSku(e.target.value)} className="font-mono text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                                <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                                    <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Properties</label>
                                    <Input value={properties} onChange={(e) => setProperties(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quantity & Pricing */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide">Quantity & Pricing</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">{labels.qtyLabel}</label>
                                <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">{labels.priceLabel}</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                                    <Input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="pl-7" step="0.01" min="0" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Line Total</span>
                                <span className="font-semibold text-foreground">
                                    ${(parseFloat(quantity || '0') * parseFloat(unitPrice || '0')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide">Status</h4>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide">Notes</h4>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any notes or special instructions..."
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                    </div>
                </div>
            </SlideOverBody>
        </SlideOver>
    );
}

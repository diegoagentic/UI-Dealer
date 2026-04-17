import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { X, Plus, Percent, DollarSign, Trash2 } from 'lucide-react'

interface Discount {
    id: number
    type: 'percentage' | 'fixed'
    label: string
    value: number
}

interface ItemDiscountModalProps {
    isOpen: boolean
    onClose: () => void
    itemName: string
    itemId: string
    unitPrice: number
    quantity: number
    onApply: (discounts: Discount[]) => void
}

export default function ItemDiscountModal({
    isOpen, onClose, itemName, itemId, unitPrice, quantity, onApply
}: ItemDiscountModalProps) {
    const [discounts, setDiscounts] = useState<Discount[]>([
        { id: 1, type: 'percentage', label: 'Custom Discount', value: 12 }
    ])

    const subtotal = unitPrice * quantity

    const totalDiscount = discounts.reduce((acc, d) => {
        if (d.type === 'percentage') return acc + (subtotal * d.value / 100)
        return acc + d.value
    }, 0)

    const finalTotal = subtotal - totalDiscount

    const addDiscount = () => {
        setDiscounts(prev => [...prev, {
            id: Date.now(),
            type: 'percentage',
            label: '',
            value: 0,
        }])
    }

    const updateDiscount = (id: number, field: keyof Discount, value: any) => {
        setDiscounts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d))
    }

    const removeDiscount = (id: number) => {
        setDiscounts(prev => prev.filter(d => d.id !== id))
    }

    const handleApply = () => {
        onApply(discounts)
        onClose()
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                </TransitionChild>
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <DialogPanel className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl">
                            {/* Header */}
                            <div className="flex items-start justify-between p-6 pb-4">
                                <div>
                                    <DialogTitle className="text-base font-bold text-foreground">Edit Line Item</DialogTitle>
                                    <p className="text-xs text-muted-foreground mt-0.5">{itemName} · {itemId}</p>
                                </div>
                                <button onClick={onClose} className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="px-6 space-y-5">
                                {/* Item Summary */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-muted/30 rounded-xl p-3 text-center">
                                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Qty</p>
                                        <p className="text-lg font-bold text-foreground">{quantity}</p>
                                    </div>
                                    <div className="bg-muted/30 rounded-xl p-3 text-center">
                                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Unit Price</p>
                                        <p className="text-lg font-bold text-foreground">${unitPrice.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-muted/30 rounded-xl p-3 text-center">
                                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Subtotal</p>
                                        <p className="text-lg font-bold text-foreground">${subtotal.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Discounts Section */}
                                <div>
                                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Additional Discounts</h4>

                                    <div className="space-y-3">
                                        {discounts.map((discount) => (
                                            <div key={discount.id} className="flex items-center gap-2 p-3 bg-muted/20 rounded-xl border border-border">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                    {discount.type === 'percentage'
                                                        ? <Percent className="h-3.5 w-3.5 text-primary" />
                                                        : <DollarSign className="h-3.5 w-3.5 text-primary" />
                                                    }
                                                </div>

                                                <div className="flex-1 min-w-0 space-y-2">
                                                    {/* Label */}
                                                    <input
                                                        type="text"
                                                        value={discount.label}
                                                        onChange={(e) => updateDiscount(discount.id, 'label', e.target.value)}
                                                        placeholder="Discount label"
                                                        className="w-full bg-transparent text-xs font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                                                    />

                                                    <div className="flex items-center gap-2">
                                                        {/* Type select */}
                                                        <div className="relative">
                                                            <select
                                                                value={discount.type}
                                                                onChange={(e) => updateDiscount(discount.id, 'type', e.target.value)}
                                                                className="text-[10px] bg-background border border-border rounded-md px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none pr-6 cursor-pointer"
                                                            >
                                                                <option value="percentage">Percentage (%)</option>
                                                                <option value="fixed">Fixed amount</option>
                                                            </select>
                                                            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                            </div>
                                                        </div>

                                                        {/* Value input */}
                                                        <div className="relative flex-1">
                                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                                                                {discount.type === 'percentage' ? '%' : '$'}
                                                            </span>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={discount.value}
                                                                onChange={(e) => updateDiscount(discount.id, 'value', parseFloat(e.target.value) || 0)}
                                                                className="w-full text-[10px] bg-background border border-border rounded-md pl-6 pr-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                                                            />
                                                        </div>

                                                        {/* Computed amount */}
                                                        <span className="text-[10px] font-semibold text-red-500 whitespace-nowrap">
                                                            -${discount.type === 'percentage'
                                                                ? (subtotal * discount.value / 100).toFixed(2)
                                                                : discount.value.toFixed(2)
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => removeDiscount(discount.id)}
                                                    className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shrink-0"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={addDiscount}
                                            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            <Plus className="h-3.5 w-3.5" /> Add Discount
                                        </button>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="border-t border-border pt-4 space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Subtotal ({quantity} items)</span>
                                        <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    {totalDiscount > 0 && (
                                        <div className="flex justify-between text-xs text-red-500 font-medium">
                                            <span>Discounts</span>
                                            <span>-${totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm font-bold text-foreground pt-1">
                                        <span>Line Total</span>
                                        <span>${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex gap-3 justify-end p-6 pt-5">
                                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                                >
                                    Apply Changes
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

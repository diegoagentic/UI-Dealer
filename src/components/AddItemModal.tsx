import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { X } from 'lucide-react'

interface AddItemModalProps {
    isOpen: boolean
    onClose: () => void
    transactionType: 'quote' | 'order' | 'ack'
    transactionId: string
    onAdd: () => void
}

const MOCK_PRODUCTS = [
    { id: 'WC936-005', name: 'Webster', price: 60.45 },
    { id: 'AER-REM-BLK', name: 'Aeron Remastered', price: 1195.00 },
    { id: 'EMB-CHR-GRY', name: 'Embody Chair', price: 1895.00 },
    { id: 'NVI-DSK-WAL', name: 'Nevi Sit-Stand Desk', price: 1295.00 },
    { id: 'LEP-V2-BLK', name: 'Leap V2 Task Chair', price: 895.00 },
    { id: 'MIG-SE-48', name: 'Migration SE 48" Desk', price: 1120.00 },
    { id: 'TS-CTR-STL', name: 'Thread Counter Stool', price: 485.00 },
    { id: 'GEN-EX-CHR', name: 'Generation Executive Chair', price: 2304.00 },
]

export default function AddItemModal({ isOpen, onClose, transactionType, transactionId, onAdd }: AddItemModalProps) {
    const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0])
    const [quantity, setQuantity] = useState(1)

    const itemNumber = Math.floor(Math.random() * 90) + 10

    const handleConfirm = () => {
        onAdd()
        setQuantity(1)
        setSelectedProduct(MOCK_PRODUCTS[0])
        onClose()
    }

    const total = (selectedProduct.price * quantity).toFixed(2)

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                </TransitionChild>
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <DialogPanel className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl p-6">
                            <div className="flex items-start justify-between mb-1">
                                <div>
                                    <DialogTitle className="text-base font-bold text-foreground">Add New Item</DialogTitle>
                                    <p className="text-xs text-muted-foreground mt-0.5">Enter the item details below</p>
                                </div>
                                <button onClick={onClose} className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-4 mt-4">
                                <p className="text-xs font-bold text-muted-foreground">Item #{itemNumber}:</p>

                                {/* Product */}
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1.5">Product</label>
                                    <div className="relative">
                                        <select
                                            value={selectedProduct.id}
                                            onChange={(e) => setSelectedProduct(MOCK_PRODUCTS.find(p => p.id === e.target.value) || MOCK_PRODUCTS[0])}
                                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
                                        >
                                            {MOCK_PRODUCTS.map(p => (
                                                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Item # / SKU + Quantity */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1.5">Item # / SKU</label>
                                        <input
                                            type="text"
                                            value={selectedProduct.id}
                                            readOnly
                                            className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1.5">Quantity</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        />
                                    </div>
                                </div>

                                {/* Unit Price */}
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1.5">Unit Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                                        <input
                                            type="text"
                                            value={selectedProduct.price.toFixed(2)}
                                            readOnly
                                            className="w-full rounded-lg border border-border bg-muted/30 pl-7 pr-3 py-2.5 text-sm text-muted-foreground"
                                        />
                                    </div>
                                </div>

                                {/* Total */}
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1.5">Total</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-foreground">$</span>
                                        <input
                                            type="text"
                                            value={total}
                                            readOnly
                                            className="w-full rounded-lg border border-primary/30 bg-primary/5 pl-7 pr-3 py-2.5 text-sm font-semibold text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end mt-6">
                                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                    Skip for Now
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-1"
                                >
                                    Confirm & Save →
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

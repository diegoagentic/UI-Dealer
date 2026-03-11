import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import {
    XMarkIcon, ArrowDownTrayIcon, PrinterIcon, DocumentTextIcon,
    BuildingOfficeIcon, UserIcon, CalendarIcon, MapPinIcon,
    CurrencyDollarIcon, TruckIcon, CheckCircleIcon, ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

// --- Types ---

export type PEDDocumentType = 'order' | 'quote' | 'acknowledgment';

interface LineItem {
    sku: string;
    description: string;
    qty: number;
    unitPrice: string;
    total: string;
    leadTime?: string;
}

export interface PEDData {
    type: PEDDocumentType;
    id: string;
    status: string;
    date: string;
    // Parties
    customer: string;
    customerContact: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    // Dealer Info (us)
    dealerName: string;
    dealerContact: string;
    dealerEmail: string;
    dealerPhone: string;
    // Project
    project: string;
    projectLocation: string;
    // Financials
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    // Lines
    lineItems: LineItem[];
    // Type-specific
    validUntil?: string; // quotes
    paymentTerms?: string;
    shippingMethod?: string;
    expectedDelivery?: string;
    vendorName?: string; // acks
    poReference?: string; // acks
    discrepancyNotes?: string; // acks
    notes?: string;
}

// --- Mock data generators ---

const MOCK_LINE_ITEMS: LineItem[] = [
    { sku: 'STR-CHR-2040', description: 'Aeron Chair — Graphite, Size B', qty: 24, unitPrice: '$1,395.00', total: '$33,480.00', leadTime: '4-6 weeks' },
    { sku: 'STR-DSK-1080', description: 'Motia Sit-to-Stand Desk — 60"×30" Walnut', qty: 24, unitPrice: '$2,195.00', total: '$52,680.00', leadTime: '6-8 weeks' },
    { sku: 'STR-STR-0550', description: 'Tu Storage Cabinet — 3-High Open', qty: 12, unitPrice: '$890.00', total: '$10,680.00', leadTime: '3-4 weeks' },
    { sku: 'STR-ACC-0120', description: 'Flo Monitor Arm — Dual', qty: 24, unitPrice: '$450.00', total: '$10,800.00', leadTime: '2-3 weeks' },
    { sku: 'STR-PNL-3060', description: 'Resolve Panel System — 48"H×60"W', qty: 18, unitPrice: '$680.00', total: '$12,240.00', leadTime: '8-10 weeks' },
];

export function getMockPEDData(type: PEDDocumentType, id?: string): PEDData {
    const base = {
        dealerName: 'Strata Commercial Interiors',
        dealerContact: 'Sarah Mitchell',
        dealerEmail: 'sarah.mitchell@stratacommercial.com',
        dealerPhone: '+1 (832) 555-0142',
        customer: 'AutoManufacture Co.',
        customerContact: 'James Rodriguez',
        customerEmail: 'j.rodriguez@automanufacture.com',
        customerPhone: '+1 (512) 555-0198',
        customerAddress: '4200 Innovation Blvd, Suite 300\nAustin, TX 78759',
        project: 'HQ Renovation — Phase 2',
        projectLocation: 'Building A, Floors 3-5',
        lineItems: MOCK_LINE_ITEMS,
        subtotal: '$119,880.00',
        tax: '$9,890.10',
        shipping: '$3,450.00',
        total: '$133,220.10',
        paymentTerms: 'Net 30',
        shippingMethod: 'White Glove Delivery & Installation',
        expectedDelivery: 'Mar 28, 2026',
        notes: 'Installation to be scheduled in 3 phases per floor. Weekend installation preferred. Loading dock access confirmed with building management.',
    };

    if (type === 'order') {
        return {
            ...base,
            type: 'order',
            id: id || '#ORD-2055',
            status: 'In Production',
            date: 'Jan 15, 2026',
        };
    }

    if (type === 'quote') {
        return {
            ...base,
            type: 'quote',
            id: id || 'QT-1025',
            status: 'Sent',
            date: 'Jan 12, 2026',
            validUntil: 'Feb 12, 2026',
        };
    }

    // acknowledgment
    return {
        ...base,
        type: 'acknowledgment',
        id: id || 'ACK-8839',
        status: 'Confirmed',
        date: 'Jan 14, 2026',
        vendorName: 'Herman Miller, Inc.',
        poReference: 'PO-2026-001',
        discrepancyNotes: 'None — All line items confirmed as ordered.',
    };
}

// --- Component ---

interface PEDExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: PEDData | null;
}

const typeLabels: Record<PEDDocumentType, string> = {
    order: 'Purchase Order',
    quote: 'Quote Estimate',
    acknowledgment: 'Acknowledgement',
};

const statusColors: Record<string, string> = {
    'In Production': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    'Order Received': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    'Ready to Ship': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Delivered': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    'Sent': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Draft': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    'Negotiating': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    'Approved': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Confirmed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Discrepancy': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    'Partial': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

export default function PEDExportModal({ isOpen, onClose, data }: PEDExportModalProps) {
    const [isExporting, setIsExporting] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    if (!data) return null;

    const label = typeLabels[data.type];

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            onClose();
        }, 1500);
    };

    const handlePrint = () => {
        if (printRef.current) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html><head><title>${label} — ${data.id}</title>
                    <style>
                        body { font-family: 'Inter', system-ui, sans-serif; color: #18181b; padding: 40px; max-width: 900px; margin: 0 auto; }
                        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
                        th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #e4e4e7; font-size: 13px; }
                        th { background: #f4f4f5; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #71717a; }
                        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #18181b; }
                        .logo { font-size: 24px; font-weight: 700; }
                        .badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: #f0fdf4; color: #15803d; }
                        .section { margin-bottom: 24px; }
                        .section-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 8px; }
                        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                        .totals { text-align: right; margin-top: 16px; }
                        .totals .row { display: flex; justify-content: flex-end; gap: 40px; padding: 4px 0; font-size: 13px; }
                        .totals .total-row { font-weight: 700; font-size: 16px; border-top: 2px solid #18181b; padding-top: 8px; margin-top: 8px; }
                        .notes { background: #f4f4f5; padding: 16px; border-radius: 8px; font-size: 13px; margin-top: 24px; }
                        .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 11px; color: #a1a1aa; text-align: center; }
                    </style></head><body>
                    ${printRef.current.innerHTML}
                    </body></html>
                `);
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-background border border-border shadow-2xl transition-all flex flex-col max-h-[90vh]">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <DocumentTextIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground">PED Preview — {label}</h2>
                                            <p className="text-xs text-muted-foreground">{data.id} • Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border">
                                            <PrinterIcon className="w-4 h-4" /> Print
                                        </button>
                                        <button
                                            onClick={handleExport}
                                            disabled={isExporting}
                                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                                        >
                                            {isExporting ? (
                                                <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Exporting...</>
                                            ) : (
                                                <><ArrowDownTrayIcon className="w-4 h-4" /> Export PDF</>
                                            )}
                                        </button>
                                        <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Document Preview */}
                                <div className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-900/50">
                                    <div ref={printRef} className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 space-y-6">

                                        {/* Document Header */}
                                        <div className="flex items-start justify-between pb-4 border-b-2 border-zinc-900 dark:border-zinc-100">
                                            <div>
                                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">STRATA</h1>
                                                <p className="text-xs text-zinc-500 mt-1">Commercial Interiors</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{label.toUpperCase()}</p>
                                                <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{data.id}</p>
                                                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[data.status] || 'bg-zinc-100 text-zinc-700'}`}>
                                                    {data.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Parties Grid */}
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                                    {data.type === 'acknowledgment' ? 'Vendor' : 'Bill To / Customer'}
                                                </p>
                                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {data.type === 'acknowledgment' ? data.vendorName : data.customer}
                                                </p>
                                                <p className="text-xs text-zinc-600 dark:text-zinc-400">{data.customerContact}</p>
                                                <p className="text-xs text-zinc-500">{data.customerEmail}</p>
                                                <p className="text-xs text-zinc-500">{data.customerPhone}</p>
                                                <p className="text-xs text-zinc-500 mt-1 whitespace-pre-line">{data.customerAddress}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Dealer</p>
                                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{data.dealerName}</p>
                                                <p className="text-xs text-zinc-600 dark:text-zinc-400">{data.dealerContact}</p>
                                                <p className="text-xs text-zinc-500">{data.dealerEmail}</p>
                                                <p className="text-xs text-zinc-500">{data.dealerPhone}</p>
                                            </div>
                                        </div>

                                        {/* Document Details */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-zinc-200 dark:border-zinc-700">
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Date</p>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{data.date}</p>
                                            </div>
                                            {data.type === 'quote' && data.validUntil && (
                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Valid Until</p>
                                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{data.validUntil}</p>
                                                </div>
                                            )}
                                            {data.type === 'acknowledgment' && data.poReference && (
                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">PO Reference</p>
                                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{data.poReference}</p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Project</p>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{data.project}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Location</p>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{data.projectLocation}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Payment Terms</p>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{data.paymentTerms || 'Net 30'}</p>
                                            </div>
                                        </div>

                                        {/* Line Items Table */}
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">Line Items</p>
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">SKU</th>
                                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Description</th>
                                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 text-center">Qty</th>
                                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 text-right">Unit Price</th>
                                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 text-right">Total</th>
                                                        {data.type !== 'quote' && <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 text-right">Lead Time</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.lineItems.map((item, idx) => (
                                                        <tr key={idx} className="border-b border-zinc-100 dark:border-zinc-800">
                                                            <td className="py-2.5 px-3 text-xs font-mono text-zinc-500">{item.sku}</td>
                                                            <td className="py-2.5 px-3 text-xs text-zinc-900 dark:text-zinc-100">{item.description}</td>
                                                            <td className="py-2.5 px-3 text-xs text-zinc-700 dark:text-zinc-300 text-center">{item.qty}</td>
                                                            <td className="py-2.5 px-3 text-xs text-zinc-700 dark:text-zinc-300 text-right">{item.unitPrice}</td>
                                                            <td className="py-2.5 px-3 text-xs font-medium text-zinc-900 dark:text-zinc-100 text-right">{item.total}</td>
                                                            {data.type !== 'quote' && <td className="py-2.5 px-3 text-xs text-zinc-500 text-right">{item.leadTime || '—'}</td>}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Totals */}
                                        <div className="flex justify-end">
                                            <div className="w-64 space-y-1">
                                                <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                                                    <span>Subtotal</span><span>{data.subtotal}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                                                    <span>Tax</span><span>{data.tax}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                                                    <span>Shipping & Install</span><span>{data.shipping}</span>
                                                </div>
                                                <div className="flex justify-between text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2 mt-2 border-t-2 border-zinc-900 dark:border-zinc-100">
                                                    <span>Total</span><span>{data.total}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping & Delivery */}
                                        {(data.shippingMethod || data.expectedDelivery) && (
                                            <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700">
                                                {data.shippingMethod && (
                                                    <div className="flex items-center gap-2">
                                                        <TruckIcon className="w-4 h-4 text-zinc-400" />
                                                        <div>
                                                            <p className="text-[10px] text-zinc-400 uppercase">Shipping Method</p>
                                                            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{data.shippingMethod}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {data.expectedDelivery && (
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-zinc-400" />
                                                        <div>
                                                            <p className="text-[10px] text-zinc-400 uppercase">Expected Delivery</p>
                                                            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{data.expectedDelivery}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Discrepancy Notes (Acks only) */}
                                        {data.type === 'acknowledgment' && data.discrepancyNotes && (
                                            <div className="py-3 px-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">Discrepancy Check</p>
                                                </div>
                                                <p className="text-xs text-green-700 dark:text-green-300">{data.discrepancyNotes}</p>
                                            </div>
                                        )}

                                        {/* Notes */}
                                        {data.notes && (
                                            <div className="py-3 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700">
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">Notes & Special Instructions</p>
                                                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{data.notes}</p>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700 text-center">
                                            <p className="text-[10px] text-zinc-400">
                                                This document was generated by <span className="font-semibold">Strata Experience Platform</span> • {data.dealerName} • {data.dealerPhone}
                                            </p>
                                            <p className="text-[10px] text-zinc-400 mt-0.5">
                                                Document ID: {data.id} • Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

import { useState } from 'react';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon,
    ArrowPathIcon,
    FunnelIcon,
    ChevronDownIcon,
    PencilSquareIcon,
    TrashIcon,
    BoltIcon
} from '@heroicons/react/24/outline';
import { useGenUI } from '../../../context/GenUIContext';
import EditAssetModal from './AssetReview/EditAssetModal';
import AISuggestionPanel from './AssetReview/AISuggestionPanel';
import DiscountStructureWidget from './AssetReview/DiscountStructureWidget';
import SuccessModal from './AssetReview/SuccessModal';

// Types
export interface AssetType {
    id: string;
    description: string;
    sku: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    status: 'validated' | 'review' | 'suggestion';
    issues?: string[];
    suggestion?: {
        sku: string;
        price: number;
        reason: string;
    };
}

export default function AssetReviewArtifact({ data }: { data: any }) {
    const { sendMessage } = useGenUI();
    const [filter, setFilter] = useState<'all' | 'attention' | 'validated'>('all');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState<AssetType | null>(null);
    const [currentStep, setCurrentStep] = useState<'review' | 'map' | 'discount' | 'finalize'>('review');
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock Data (will come from `data` prop later)
    const [assets, setAssets] = useState<AssetType[]>(data?.assets || [
        {
            id: '1',
            description: 'Executive Task Chair',
            sku: 'CHAIR-EXEC-2024',
            qty: 150,
            unitPrice: 895.00,
            totalPrice: 134250.00,
            status: 'review',
            issues: ['Unusual quantity for this SKU', 'Price variance (>10%)']
        },
        {
            id: '2',
            description: 'Conference Table Round',
            sku: 'TABLE-CONF-ERROR',
            qty: 12,
            unitPrice: 750.00,
            totalPrice: 9000.00,
            status: 'review',
            issues: ['SKU not found in catalog']
        },
        {
            id: '3',
            description: 'Height Adjustable Workstation',
            sku: 'DESK-ELECTRIC-7230',
            qty: 95,
            unitPrice: 1250.00,
            totalPrice: 118750.00,
            status: 'suggestion',
            suggestion: {
                sku: 'DESK-ELECTRIC-7230-BUDGET',
                price: 1100.00,
                reason: 'Budget alternative available (Save $150/unit)'
            }
        },
        {
            id: '4',
            description: 'Ergonomic Office Chair',
            sku: 'CHAIR-ERG-001',
            qty: 85,
            unitPrice: 425.00,
            totalPrice: 36125.00,
            status: 'validated'
        }
    ]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const handleEdit = (asset: AssetType) => {
        setEditingAsset(asset);
        setIsEditModalOpen(true);
    };

    const handleSaveAsset = (updatedAsset: AssetType) => {
        setAssets(prev => prev.map(a => a.id === updatedAsset.id ? { ...updatedAsset, status: 'validated', issues: [] } : a));
    };

    const handleAcceptSuggestion = (assetId: string) => {
        setAssets(prev => prev.map(a => {
            if (a.id === assetId && a.suggestion) {
                return {
                    ...a,
                    sku: a.suggestion.sku,
                    unitPrice: a.suggestion.price,
                    totalPrice: a.qty * a.suggestion.price,
                    status: 'validated',
                    suggestion: undefined
                };
            }
            return a;
        }));
    };

    const handleRejectSuggestion = (assetId: string) => {
        setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: 'validated', suggestion: undefined } : a));
    };

    const filteredAssets = assets.filter(a => {
        if (filter === 'all') return true;
        if (filter === 'attention') return a.status === 'review' || a.status === 'suggestion';
        if (filter === 'validated') return a.status === 'validated';
        return true;
    });

    const stats = {
        total: assets.length,
        attention: assets.filter(a => a.status === 'review' || a.status === 'suggestion').length,
        validated: assets.filter(a => a.status === 'validated').length,
        totalValue: assets.reduce((acc, curr) => acc + curr.totalPrice, 0)
    };

    return (
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
            {/* Header / Toolbar - Stratified */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex justify-between items-center shadow-sm z-10 shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl font-bold font-brand text-foreground tracking-tight">Asset Processing</h2>
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Beta</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Review and validate assets from ERP integration</p>
                </div>

                {/* Stepper (Strata Minimalist) */}
                <div className="hidden md:flex items-center gap-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={() => setCurrentStep('review')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${currentStep === 'review' ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground ring-1 ring-zinc-200 dark:ring-zinc-700' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${currentStep === 'review' ? 'bg-primary/10 text-primary' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}>1</span>
                        Review
                    </button>

                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-muted-foreground opacity-50 cursor-not-allowed">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-500">2</span>
                        Map
                    </div>

                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

                    <button
                        onClick={() => setCurrentStep('discount')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${currentStep === 'discount' ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground ring-1 ring-zinc-200 dark:ring-zinc-700' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${currentStep === 'discount' ? 'bg-primary/10 text-primary' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}>3</span>
                        Discount
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-xs font-medium transition-colors text-foreground">
                        <DocumentTextIcon className="w-4 h-4" />
                        Save Draft
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Asset List */}
                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">

                    {/* Controls */}
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">Filter by Status:</span>
                            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${filter === 'all' ? 'bg-white dark:bg-zinc-700 shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    All ({stats.total})
                                </button>
                                <button
                                    onClick={() => setFilter('attention')}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filter === 'attention' ? 'bg-white dark:bg-zinc-700 shadow-sm text-amber-600 dark:text-amber-500' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                                    Needs Attention ({stats.attention})
                                </button>
                                <button
                                    onClick={() => setFilter('validated')}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filter === 'validated' ? 'bg-white dark:bg-zinc-700 shadow-sm text-green-600 dark:text-green-500' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <CheckCircleIcon className="w-3.5 h-3.5" />
                                    Validated ({stats.validated})
                                </button>
                            </div>
                        </div>
                        <span className="text-muted-foreground text-xs">Showing {filteredAssets.length} of {stats.total} items</span>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                        {filteredAssets.map(asset => (
                            <div key={asset.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex gap-4 items-start">
                                    {/* Status Icon */}
                                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${asset.status === 'review' ? 'bg-amber-100 text-amber-600' :
                                        asset.status === 'suggestion' ? 'bg-blue-100 text-blue-600' :
                                            'bg-green-100 text-green-600'
                                        }`}>
                                        {asset.status === 'review' && <ExclamationTriangleIcon className="w-5 h-5" />}
                                        {asset.status === 'suggestion' && <BoltIcon className="w-5 h-5" />}
                                        {asset.status === 'validated' && <CheckCircleIcon className="w-5 h-5" />}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-foreground text-sm truncate">{asset.description}</h4>
                                                <p className="text-xs text-muted-foreground mt-0.5">SKU: {asset.sku} • Qty: {asset.qty}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-foreground text-sm">{formatCurrency(asset.totalPrice)}</div>
                                                <div className="text-xs text-muted-foreground">{formatCurrency(asset.unitPrice)} each</div>
                                            </div>
                                        </div>

                                        {/* Issues / Suggestions */}
                                        {asset.status === 'review' && asset.issues && (
                                            <div className="mt-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg p-2 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                                                <ExclamationTriangleIcon className="w-4 h-4" />
                                                <span>{asset.issues.join(', ')}</span>
                                            </div>
                                        )}
                                        {asset.status === 'suggestion' && asset.suggestion && (
                                            <AISuggestionPanel
                                                originalAsset={asset}
                                                suggestion={asset.suggestion}
                                                onAccept={() => handleAcceptSuggestion(asset.id)}
                                                onReject={() => handleRejectSuggestion(asset.id)}
                                            />
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleEdit(asset)}
                                            className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap flex items-center justify-center gap-1"
                                        >
                                            <PencilSquareIcon className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                        <button className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors self-end">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Stats similar to screenshot */}
                    <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center text-xs">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1.5 text-green-600 font-medium">
                                <CheckCircleIcon className="w-4 h-4" /> {stats.validated} Validated
                            </span>
                            <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                                <ExclamationTriangleIcon className="w-4 h-4" /> {stats.attention} Need Review
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <span className="text-muted-foreground">Total Value:</span>
                                <span className="ml-2 font-bold text-foreground text-sm">{formatCurrency(stats.totalValue)}</span>
                            </div>
                            <button
                                onClick={() => setCurrentStep('map')}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-sm"
                            >
                                Next: Mapping <ChevronDownIcon className="w-3 h-3 -rotate-90" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Document Preview / PO */}
                <div className="w-1/3 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 hidden lg:flex flex-col">
                    <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center text-sm font-medium">
                        <span className="flex items-center gap-2">
                            <DocumentTextIcon className="w-4 h-4" />
                            Purchase Order Preview
                        </span>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-zinc-100 rounded"><ArrowPathIcon className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {/* Mock PDF Viewer */}
                    <div className="flex-1 p-8 overflow-y-auto flex justify-center">
                        <div className="bg-white w-full max-w-[300px] h-[500px] shadow-lg rounded-sm border border-zinc-200 p-8 text-[8px] leading-relaxed select-none opacity-80 overflow-hidden relative">
                            <div className="font-bold text-lg mb-4 text-center">PURCHASE ORDER</div>
                            <div className="flex justify-between mb-6">
                                <div>
                                    <div className="font-bold">BILL TO:</div>
                                    <div>ENTERPRISE CORP</div>
                                    <div>1234 BUSINESS WAY</div>
                                    <div>Atlanta, GA 30318</div>
                                </div>
                                <div>
                                    <div className="font-bold">VENDOR:</div>
                                    <div>Office Furniture Co.</div>
                                    <div>5678 SUPPLIER ST</div>
                                    <div>Atlanta, GA 30309</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="flex justify-between border-b border-zinc-100 pb-1">
                                        <div className="w-8">#{i}024</div>
                                        <div className="flex-1 ml-2">Office Chair ergonomic black mesh...</div>
                                        <div className="w-12 text-right">$450.00</div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-8 right-8 text-right font-bold text-sm">
                                TOTAL: $511,575.00
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlays */}
            {/* Overlays */}
            {currentStep === 'map' && (
                <div className="absolute inset-0 z-20 bg-white dark:bg-zinc-900 flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                        <button onClick={() => setCurrentStep('review')} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Back to Review
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50 dark:bg-black/50">
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <ArrowPathIcon className="w-8 h-8 animate-spin-slow" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">AI Field Mapping</h3>
                            <p className="text-muted-foreground text-sm mb-6">Analyzing data consistency and mapping to internal SKU catalog...</p>
                            <button
                                onClick={() => setCurrentStep('discount')}
                                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Confirm Mappings
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 'discount' && (
                <div className="absolute inset-0 z-20 bg-white dark:bg-zinc-900 flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                        <button onClick={() => setCurrentStep('map')} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Back to Mapping
                        </button>
                    </div>
                    <div className="flex-1 p-8 flex justify-center items-start overflow-y-auto bg-zinc-50 dark:bg-black/50">
                        <div className="w-full max-w-2xl">
                            <DiscountStructureWidget
                                subtotal={stats.totalValue}
                                onApply={(finalTotal) => setCurrentStep('finalize')}
                            />
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 'finalize' && (
                <div className="absolute inset-0 z-20 bg-white dark:bg-zinc-900 flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                        <button onClick={() => setCurrentStep('discount')} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <ChevronDownIcon className="w-4 h-4 rotate-90" /> Back to Pricing
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50 dark:bg-black/50">
                        <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-center mb-6">Ready to Finalize?</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                                    <span className="text-muted-foreground">Total Assets</span>
                                    <span className="font-semibold">{stats.total} Items</span>
                                </div>
                                <div className="flex justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                                    <span className="text-muted-foreground">Validation Status</span>
                                    <span className="text-green-600 font-semibold flex items-center gap-1">
                                        <CheckCircleIcon className="w-4 h-4" /> All Validated
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                    <span className="text-primary font-medium">Final Quote Value</span>
                                    <span className="text-2xl font-bold text-primary">{formatCurrency(stats.totalValue * 0.9)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowSuccess(true)}
                                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
                            >
                                Create Quote
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <EditAssetModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                asset={editingAsset}
                onSave={handleSaveAsset}
            />

            <SuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    setCurrentStep('review');
                    sendMessage("Order submission confirmed. Dashboard updated.");
                }}
            />
        </div>
    );
}

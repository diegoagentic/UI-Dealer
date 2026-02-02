import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { AssetType } from '../AssetReviewArtifact';

interface EditAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    asset: AssetType | null;
    onSave: (updatedAsset: AssetType) => void;
}

export default function EditAssetModal({ isOpen, onClose, asset, onSave }: EditAssetModalProps) {
    const [formData, setFormData] = useState<Partial<AssetType>>({});

    useEffect(() => {
        if (asset) {
            setFormData({ ...asset });
        }
    }, [asset]);

    if (!isOpen || !asset) return null;

    const handleChange = (field: keyof AssetType, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Validation logic can go here
        onSave({ ...asset, ...formData } as AssetType);
        onClose();
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-foreground">Edit Item Details</h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                        <input
                            type="text"
                            value={formData.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">SKU</label>
                            <input
                                type="text"
                                value={formData.sku || ''}
                                onChange={(e) => handleChange('sku', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Quantity</label>
                            <input
                                type="number"
                                value={formData.qty || 0}
                                onChange={(e) => handleChange('qty', parseInt(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Unit Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-muted-foreground text-sm">$</span>
                                <input
                                    type="number"
                                    value={formData.unitPrice || 0}
                                    onChange={(e) => handleChange('unitPrice', parseFloat(e.target.value))}
                                    className="w-full pl-7 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Total</label>
                            <div className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-sm text-muted-foreground font-mono">
                                ${((formData.qty || 0) * (formData.unitPrice || 0)).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium shadow-sm transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

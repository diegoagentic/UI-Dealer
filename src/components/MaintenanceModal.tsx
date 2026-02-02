import React, { useState, useEffect } from 'react';
import {
    XMarkIcon,
    WrenchScrewdriverIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface MaintenanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCount: number;
    onConfirm: (data: any) => void;
}

const SERVICE_PROVIDERS = [
    'Internal Maintenance Team',
    'BrightLights Services',
    'OfficeFix Pro',
    'CoolAir Systems',
    'TechSupport Squad'
];

export default function MaintenanceModal({ isOpen, onClose, selectedCount, onConfirm }: MaintenanceModalProps) {
    const [issueType, setIssueType] = useState('repair');
    const [provider, setProvider] = useState('');
    const [date, setDate] = useState('');

    // Reset
    useEffect(() => {
        if (isOpen) {
            setIssueType('repair');
            setProvider('');
            setDate('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ issueType, provider, date });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                            <WrenchScrewdriverIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Schedule Maintenance</h2>
                            <p className="text-sm text-muted-foreground">For {selectedCount} item{selectedCount !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Maintenance Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Repair', 'Inspection', 'Cleaning', 'Upgrade'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setIssueType(type)}
                                    className={cn(
                                        "py-2 px-3 text-sm font-medium rounded-lg border transition-all",
                                        issueType === type
                                            ? "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400"
                                            : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 hover:bg-zinc-50"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Service Provider</label>
                        <select
                            required
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                        >
                            <option value="" disabled>Select provider...</option>
                            {SERVICE_PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Scheduled Date</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm text-foreground"
                        />
                    </div>
                </form>

                <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm"
                    >
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
}

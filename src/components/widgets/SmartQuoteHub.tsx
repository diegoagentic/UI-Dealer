import { useState } from 'react';
import { CloudArrowUpIcon, DocumentPlusIcon, ShoppingBagIcon, SparklesIcon, TruckIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { useGenUI } from '../../context/GenUIContext';

export default function SmartQuoteHub() {
    const { sendMessage } = useGenUI();
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Simulate file capture
        sendMessage("System: Analyzing uploaded file 'Invoice_Jan2026.pdf'...");
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-500">
                        <DocumentPlusIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Create Purchase Order</h3>
                        <p className="text-xs text-muted-foreground">Upload files or start from scratch</p>
                    </div>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-4">
                {/* Drag and Drop Zone */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                        flex-1 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 p-6 cursor-pointer
                        ${isDragging
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50'
                        }
                    `}
                >
                    <div className={`p-4 rounded-full ${isDragging ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                        <CloudArrowUpIcon className="w-8 h-8" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-sm font-medium text-foreground">Drag and drop files here</p>
                        <p className="text-xs text-muted-foreground">or click to select</p>
                    </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={() => sendMessage("Connect to ERP system for order processing.")}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                    >
                        <CircleStackIcon className="w-4 h-4 text-purple-600" />
                        Connect ERP
                    </button>
                    <button
                        onClick={() => sendMessage("Open catalog browser for item selection.")}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                    >
                        <ShoppingBagIcon className="w-4 h-4 text-blue-600" />
                        Browse Catalog
                    </button>
                    <button
                        onClick={() => sendMessage("I need help creating a complex quote for a new office layout.")}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        <SparklesIcon className="w-4 h-4" />
                        AI Assistant
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600">
                        <TruckIcon className="w-4 h-4 text-orange-600" />
                        Track Order
                    </button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-[10px] text-muted-foreground">Powered by Strata AI</p>
                </div>
            </div>
        </div>
    );
}

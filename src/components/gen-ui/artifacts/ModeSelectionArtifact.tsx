import React from 'react';
import { CloudArrowUpIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { useGenUI } from '../../../../context/GenUIContext';

export default function ModeSelectionArtifact() {
    const { sendMessage } = useGenUI();

    return (
        <div className="flex flex-col gap-4 p-4 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">How would you like to start?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Process File */}
                <button
                    onClick={() => sendMessage("Mode Selected: File Upload")}
                    className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group text-left shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <CloudArrowUpIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground">Upload Request</h4>
                        <p className="text-sm text-muted-foreground mt-1">Process a PDF, Excel, or Email request using AI extraction.</p>
                    </div>
                </button>

                {/* Option 2: Connect ERP */}
                <button
                    onClick={() => sendMessage("Mode Selected: Connect ERP")}
                    className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group text-left shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <ServerStackIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground">Connect ERP</h4>
                        <p className="text-sm text-muted-foreground mt-1">Pull open Purchase Orders directly from NetSuite or SAP.</p>
                    </div>
                </button>
            </div>
        </div>
    );
}

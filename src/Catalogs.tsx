import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
    BookOpenIcon,
    WrenchScrewdriverIcon,
    CubeTransparentIcon
} from '@heroicons/react/24/outline';
import CatalogLibrary from './components/catalogs/CatalogLibrary';
import ClientPolicyManager from './components/catalogs/ClientPolicyManager';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface PageProps {
    onLogout: () => void;
    onNavigateToDetail: () => void;
    onNavigateToWorkspace: () => void;
    onNavigate: (page: string) => void;
}

export default function Catalogs({ onNavigate }: PageProps) {
    const [activeTab, setActiveTab] = useState<'library' | 'rules'>('library');

    const tabs = [
        { id: 'library', label: 'Catalog Library', icon: BookOpenIcon },
        { id: 'rules', label: 'Client Rules & Pricing', icon: WrenchScrewdriverIcon },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-foreground font-sans selection:bg-primary/20">
            {/* Header */}
            <div className="bg-zinc-50/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <CubeTransparentIcon className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-foreground">Catalog Management</h1>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-6 -mb-px">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "flex items-center gap-2 pb-3 pt-2 text-sm font-medium transition-all border-b-2",
                                        isActive
                                            ? "border-primary text-primary"
                                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-zinc-300 dark:hover:border-zinc-700"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-zinc-400")} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {activeTab === 'library' ? (
                        <CatalogLibrary />
                    ) : (
                        <ClientPolicyManager />
                    )}
                </div>
            </main>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { useTenant } from './TenantContext';
import { useDemo } from './context/DemoContext';
import InventoryMovements from './components/InventoryMovements';
import InventoryMaintenance from './components/InventoryMaintenance';
import MACRequests from './components/MACRequests';
import MACPunchList from './components/MACPunchList';
import {
    Squares2X2Icon,
    WrenchScrewdriverIcon,
    ArrowPathRoundedSquareIcon,
    ClipboardDocumentCheckIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Mock Utils if cn is not available globally
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface PageProps {
    onLogout: () => void;
    onNavigateToDetail: () => void;
    onNavigateToWorkspace: () => void;
    onNavigate: (page: string) => void;
}

export default function MAC({ onLogout, onNavigateToDetail, onNavigateToWorkspace, onNavigate }: PageProps) {
    const { currentTenant } = useTenant();
    const { currentStep, nextStep } = useDemo();
    const [activeTab, setActiveTab] = useState<'movements' | 'maintenance' | 'requests' | 'punchlist'>('requests');
    const [highlightedTab, setHighlightedTab] = useState<string | null>(null);
    const [macTimePeriod, setMacTimePeriod] = useState<'Day' | 'Week' | 'Month' | 'Quarter'>('Month');

    const tabCountsByPeriod: Record<string, Record<string, { count: number; trend: string; trendUp: boolean }>> = {
        Day:     { requests: { count: 3, trend: '+1', trendUp: true }, movements: { count: 1, trend: '0', trendUp: true }, maintenance: { count: 1, trend: '0', trendUp: true }, punchlist: { count: 1, trend: '+1', trendUp: true } },
        Week:    { requests: { count: 7, trend: '+2', trendUp: true }, movements: { count: 2, trend: '+1', trendUp: true }, maintenance: { count: 2, trend: '-1', trendUp: false }, punchlist: { count: 2, trend: '+1', trendUp: true } },
        Month:   { requests: { count: 12, trend: '+4', trendUp: true }, movements: { count: 4, trend: '+1', trendUp: true }, maintenance: { count: 3, trend: '0', trendUp: true }, punchlist: { count: 3, trend: '+2', trendUp: true } },
        Quarter: { requests: { count: 34, trend: '+8', trendUp: true }, movements: { count: 11, trend: '+3', trendUp: true }, maintenance: { count: 9, trend: '+4', trendUp: true }, punchlist: { count: 8, trend: '-1', trendUp: false } },
    };

    // Auto-select tab based on step
    useEffect(() => {
        if (['3.1', '3.2', '3.3', '3.4'].includes(currentStep?.id)) {
            setActiveTab('punchlist');
        }
    }, [currentStep?.id]);

    useEffect(() => {
        const handleHighlight = (e: CustomEvent) => {
            if (e.detail === 'mac-punch-list') {
                setActiveTab('punchlist');
                setHighlightedTab('punchlist');
                setTimeout(() => setHighlightedTab(null), 4000);
            }
        };
        window.addEventListener('demo-highlight', handleHighlight as EventListener);
        return () => window.removeEventListener('demo-highlight', handleHighlight as EventListener);
    }, []);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-10">
            <div className="pt-24 px-4 max-w-7xl mx-auto space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-brand font-bold tracking-tight text-foreground">
                            {currentTenant} Service Center
                        </h1>
                        <p className="text-muted-foreground mt-1">Moves, Adds, Changes, and service request management.</p>
                    </div>
                </div>

                {/* Tabs + Period Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex gap-1 bg-card/50 p-1 rounded-lg w-fit overflow-x-auto max-w-full border border-zinc-200 dark:border-zinc-800">
                        {[
                            { id: 'requests', label: 'Requests', icon: ClipboardDocumentCheckIcon },
                            { id: 'movements', label: 'Movements', icon: ArrowPathRoundedSquareIcon },
                            { id: 'maintenance', label: 'Maintenance', icon: WrenchScrewdriverIcon },
                            { id: 'punchlist', label: 'Punch List', icon: ExclamationTriangleIcon }
                        ].map((tab) => {
                            const periodData = tabCountsByPeriod[macTimePeriod]?.[tab.id];
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-card text-brand-600 dark:text-brand-400 shadow-sm border border-border"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent",
                                        highlightedTab === tab.id && "ring-4 ring-brand-500 shadow-[0_0_30px_rgba(var(--brand-500),0.6)] animate-pulse"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    {periodData && (
                                        <span className={cn(
                                            "text-xs px-1.5 py-0.5 rounded-full transition-colors",
                                            activeTab === tab.id
                                                ? "bg-primary-foreground/20 text-primary-foreground"
                                                : "bg-background text-muted-foreground group-hover:bg-muted font-medium"
                                        )}>
                                            {periodData.count}
                                        </span>
                                    )}
                                    {periodData && (
                                        <span className={`text-[10px] font-semibold ${periodData.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                            {periodData.trendUp ? '\u2191' : '\u2193'}{periodData.trend}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Period Selector — contextual to metrics */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-medium">Period:</span>
                    <div className="flex bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700/50">
                        {(['Day', 'Week', 'Month', 'Quarter'] as const).map((period) => (
                            <button key={period} onClick={() => setMacTimePeriod(period)} className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${period === macTimePeriod ? 'bg-white dark:bg-brand-400 text-foreground dark:text-zinc-900 shadow-sm border border-border dark:border-transparent' : 'text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-700'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'punchlist' && <MACPunchList />}
                    {activeTab === 'movements' && <InventoryMovements />}
                    {activeTab === 'maintenance' && <InventoryMaintenance />}
                    {activeTab === 'requests' && <MACRequests />}
                </div>

            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Shell (main container)
// Phase 3 of WRG Demo v6 implementation
// ═══════════════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import StrataEstimatorNavbar from './StrataEstimatorNavbar'
import EstimatorDossierCard from './EstimatorDossierCard'
import {
    INITIAL_CONFIG,
    INITIAL_VARIABLES,
    JPS_CUSTOMER,
    JPS_LINE_ITEMS,
} from './mockData'
import type {
    ConfigState,
    Customer,
    EstimatorTab,
    LineItem,
    OperationalVariables,
    SyncStatus,
} from './types'

interface StrataEstimatorShellProps {
    onExit?: () => void
}

export default function StrataEstimatorShell({ onExit: _onExit }: StrataEstimatorShellProps = {}) {
    // ── State ────────────────────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState<EstimatorTab>('ESTIMATOR')
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced')
    const [customer, setCustomer] = useState<Customer>(JPS_CUSTOMER)
    const [lineItems, _setLineItems] = useState<LineItem[]>(JPS_LINE_ITEMS)
    const [variables, _setVariables] = useState<OperationalVariables>(INITIAL_VARIABLES)
    const [config, _setConfig] = useState<ConfigState>(INITIAL_CONFIG)
    const [isSearchingRates, setIsSearchingRates] = useState(false)

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleSave = () => {
        setSyncStatus('saving')
        setTimeout(() => setSyncStatus('synced'), 1500)
    }

    const handleExportBackup = () => {
        // Phase 9: wire to actual export logic
        console.log('Export backup')
    }

    const handleImportBackup = () => {
        // Phase 9: wire to actual import logic
        console.log('Import backup')
    }

    const handleRateLookup = () => {
        setIsSearchingRates(true)
        // Simulate AI rate lookup (Phase 9 will wire to mock Gemini call)
        setTimeout(() => setIsSearchingRates(false), 1500)
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Top navbar */}
            <StrataEstimatorNavbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                syncStatus={syncStatus}
                onSave={handleSave}
                onExportBackup={handleExportBackup}
                onImportBackup={handleImportBackup}
            />

            {/* Tab content */}
            <main className="flex-1 overflow-auto">
                {activeTab === 'ESTIMATOR' && (
                    <div className="max-w-7xl mx-auto p-6 space-y-6">
                        {/* Phase 4: Project Dossier */}
                        <EstimatorDossierCard
                            customer={customer}
                            onCustomerChange={setCustomer}
                            onRateLookup={handleRateLookup}
                            isSearchingRates={isSearchingRates}
                        />

                        {/* Phase 5: Financial Summary Hero — coming next */}
                        {/* Phase 6: Bill of Materials — coming next */}
                        {/* Phase 7: Operational Constraints — coming next */}

                        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-8 text-center">
                            <p className="text-xs text-muted-foreground">
                                Phase 4 complete. Sections below will be added in Phases 5-7.
                                {' · '}
                                {lineItems.length} line items
                                {' · '}
                                {Object.keys(config.categories).length} categories
                                {' · '}
                                {variables.duration} day(s)
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'PROJECTS' && (
                    <div className="max-w-7xl mx-auto p-6">
                        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Projects archive — content will be added in Phase 10
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'CONFIG' && (
                    <div className="max-w-7xl mx-auto p-6">
                        <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm p-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Admin configuration — content will be added in Phase 11
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

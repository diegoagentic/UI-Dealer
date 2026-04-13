// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Project Dossier Card
// Phase 4 of WRG Demo v6 implementation
// Aries parity: only Client Name + Postal/Region + Site Location
// ═══════════════════════════════════════════════════════════════════════════════

import { User, Search } from 'lucide-react'
import type { Customer } from './types'

interface EstimatorDossierCardProps {
    customer: Customer
    onCustomerChange: (customer: Customer) => void
    onRateLookup: () => void
    isSearchingRates?: boolean
}

export default function EstimatorDossierCard({
    customer,
    onCustomerChange,
    onRateLookup,
    isSearchingRates = false,
}: EstimatorDossierCardProps) {
    return (
        <div className="relative overflow-hidden bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm">
            {/* Accent left bar — Aries parity */}
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

            <div className="p-6">
                {/* Title row */}
                <div className="flex items-center gap-2 mb-6">
                    <User className="w-4 h-4 text-primary" />
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Project Dossier
                    </h2>
                </div>

                {/* 3-column inputs grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Client Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Client Name
                        </label>
                        <input
                            type="text"
                            value={customer.name}
                            onChange={(e) => onCustomerChange({ ...customer, name: e.target.value })}
                            placeholder="Client Name..."
                            className="w-full px-3 py-2 text-sm bg-transparent border-b border-border focus:border-primary outline-none transition-colors font-semibold text-foreground placeholder:text-muted-foreground/40"
                        />
                    </div>

                    {/* Postal / Region with lookup */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Postal / Region
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                maxLength={5}
                                value={customer.zipCode}
                                onChange={(e) => onCustomerChange({ ...customer, zipCode: e.target.value })}
                                placeholder="00000"
                                className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-border focus:border-primary outline-none transition-colors font-semibold text-primary placeholder:text-muted-foreground/40"
                            />
                            <button
                                onClick={onRateLookup}
                                disabled={isSearchingRates}
                                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors disabled:opacity-50"
                                title="Lookup labor rates for this ZIP"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Site Location */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Site Location
                        </label>
                        <input
                            type="text"
                            value={customer.address}
                            onChange={(e) => onCustomerChange({ ...customer, address: e.target.value })}
                            placeholder="Address..."
                            className="w-full px-3 py-2 text-sm bg-transparent border-b border-border focus:border-primary outline-none transition-colors text-muted-foreground placeholder:text-muted-foreground/40"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Tenant = 'Acme Corp' | 'Globex' | 'Initech';

interface TenantContextType {
    currentTenant: Tenant;
    tenants: Tenant[];
    setTenant: (tenant: Tenant) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
    const [currentTenant, setCurrentTenant] = useState<Tenant>('Acme Corp');
    const tenants: Tenant[] = ['Acme Corp', 'Globex', 'Initech'];

    return (
        <TenantContext.Provider value={{ currentTenant, tenants, setTenant: setCurrentTenant }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
}

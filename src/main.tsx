import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TenantProvider } from './TenantContext'

import { ThemeProvider } from 'strata-design-system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TenantProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </TenantProvider>
  </StrictMode>,
)

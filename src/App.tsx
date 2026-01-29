import { useState } from 'react'
import Login from "./Login"
import Dashboard from "./Dashboard"
import Detail from "./Detail"
import Workspace from "./Workspace"
import Inventory from "./Inventory"
import Catalogs from "./Catalogs"
import MAC from "./MAC"
import Transactions from "./Transactions"
import CRM from "./CRM"
import Pricing from "./Pricing"

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'detail' | 'workspace' | 'inventory' | 'catalogs' | 'mac' | 'transactions' | 'crm' | 'pricing'>('login')

  const handleNavigate = (page: string) => {
    // Map generic page names to specific state keys if needed, or just use directly
    // 'overview' from Navbar maps to 'dashboard' here
    if (page === 'overview') {
      setCurrentPage('dashboard')
    } else {
      // @ts-ignore
      setCurrentPage(page)
    }
  }

  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'inventory') {
    return <Inventory onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'catalogs') {
    return <Catalogs onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'mac') {
    return <MAC onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'transactions') {
    return <Transactions onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'crm') {
    return <CRM onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'pricing') {
    return <Pricing onLogout={() => setCurrentPage('login')} onNavigateToDetail={() => setCurrentPage('detail')} onNavigateToWorkspace={() => setCurrentPage('workspace')} onNavigate={handleNavigate} />
  }

  if (currentPage === 'detail') {
    return <Detail onBack={() => setCurrentPage('dashboard')} onLogout={() => setCurrentPage('login')} onNavigateToWorkspace={() => setCurrentPage('workspace')} />
  }

  if (currentPage === 'workspace') {
    return <Workspace onBack={() => setCurrentPage('dashboard')} onLogout={() => setCurrentPage('login')} onNavigateToWorkspace={() => setCurrentPage('workspace')} />
  }

  return <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
}

export default App

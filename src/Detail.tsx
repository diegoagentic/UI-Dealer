import { AlertCircle, AlertTriangle, BarChart3, Box, Calendar, Check, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, ClipboardList, Clock, Download, FileBarChart, FileText, Filter, ImageIcon, LayoutGrid, LogOut, Mail, MessageSquare, MoreHorizontal, Paperclip, Pencil, Plus, RefreshCw, Search, Send, Sparkles, SquarePen, TrendingUp, User, X } from 'lucide-react';
import { Transition, TransitionChild, Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Fragment } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from 'strata-design-system'
import { useTenant } from './TenantContext'
import Navbar from './components/Navbar'
import Breadcrumbs from './components/Breadcrumbs'
import { useToast } from './hooks/useToast'
import ToastNotification from './components/ToastNotification'
import SendItemSlideOver from './components/SendItemSlideOver'
import AIDiagnosisSlideOver from './components/AIDiagnosisSlideOver'
import EditItemSlideOver from './components/EditItemSlideOver'
import ItemActionsPopover from './components/ItemActionsPopover'
import AddItemSlideOver from './components/AddItemSlideOver'
import FilterPopover from './components/FilterPopover'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700", aiStatus: "info" },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock", statusColor: "bg-amber-50 text-amber-700 ring-amber-600/20", aiStatus: "warning" },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock", statusColor: "bg-red-50 text-red-700 ring-red-600/20" },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock", statusColor: "bg-amber-50 text-amber-700 ring-amber-600/20" },
]

interface Message {
    id: number | string;
    sender: string;
    avatar: string;
    content: React.ReactNode;
    time: string;
    type: 'system' | 'ai' | 'user' | 'action_processing' | 'action_success';
}

const DiscrepancyResolutionFlow = () => {
    const [status, setStatus] = useState<'initial' | 'requesting' | 'pending' | 'approved'>('initial')
    const [requestText, setRequestText] = useState('')

    const handleRequest = () => {
        setStatus('pending')
        setTimeout(() => setStatus('approved'), 3000)
    }

    if (status === 'initial') {
        return (
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                    <AlertTriangle className="w-5 h-5" />
                    Found 3 discrepancies in recent shipments.
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1 text-zinc-600 dark:text-zinc-300">
                    <li>Order #ORD-2054: Weight mismatch (Logs: 50kg vs Gateway: 48kg)</li>
                    <li>Order #ORD-2051: Timestamp sync error</li>
                    <li>Order #ORD-2048: Missing carrier update</li>
                </ul>
                <div className="flex gap-2 mt-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-zinc-900 dark:text-primary hover:bg-primary/20 text-xs font-medium rounded-lg transition-colors">
                        <RefreshCw className="w-3.5 h-3.5" /> Sync & Report
                    </button>
                    <button
                        onClick={() => setStatus('requesting')}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium rounded-lg hover:bg-primary hover:text-zinc-900 dark:hover:bg-primary dark:hover:text-zinc-900 transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" /> Request Changes
                    </button>
                </div>
            </div>
        )
    }

    if (status === 'requesting') {
        return (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Describe required changes:</p>
                <textarea
                    className="w-full text-sm p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-card text-zinc-900 dark:text-white focus:ring-2 ring-primary outline-none transition-all placeholder:text-zinc-400"
                    rows={3}
                    placeholder="E.g., Update weight for ORD-2054 to 48kg..."
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-primary transition-colors">
                        <Paperclip className="w-4 h-4" /> Attach File
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatus('initial')}
                            className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRequest}
                            className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-sm transition-colors"
                        >
                            Submit Request
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (status === 'pending') {
        return (
            <div className="flex flex-col gap-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-primary">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Requesting approval from Logistics Manager...</span>
                </div>
            </div>
        )
    }

    if (status === 'approved') {
        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>Changes approved. PO updated.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-white/5 rounded-xl border border-zinc-200 dark:border-white/10 p-3 flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">PO_Revised_Final.pdf</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Updated just now</p>
                    </div>
                    <button className="p-2 hover:bg-primary hover:text-zinc-900 dark:hover:bg-primary dark:hover:text-zinc-900 rounded-lg transition-colors group">
                        <Download className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-900" />
                    </button>
                </div>
            </div>
        )
    }

    return null
}

const DiscrepancyActionCard = ({ msg }: { msg: Message }) => {
    const [isRequesting, setIsRequesting] = useState(false)
    const [requestText, setRequestText] = useState('')
    const [status, setStatus] = useState<'initial' | 'pending' | 'approved'>('initial')

    const handleSubmit = () => {
        setStatus('pending')
        setTimeout(() => {
            setStatus('approved')
            setIsRequesting(false)
        }, 2000)
    }

    if (status === 'pending') {
        return (
            <div className={cn(
                "rounded-2xl p-4 shadow-sm bg-green-50 dark:bg-green-900/20 text-zinc-900 dark:text-zinc-100 border border-green-100 dark:border-green-800"
            )}>
                <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-green-600 dark:text-green-400 animate-spin" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Requesting approval from Logistics Manager...</span>
                </div>
            </div>
        )
    }

    if (status === 'approved') {
        return (
            <div className={cn(
                "rounded-2xl p-4 shadow-sm bg-green-50 dark:bg-green-900/20 text-zinc-900 dark:text-zinc-100 border border-green-100 dark:border-green-800"
            )}>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">{msg.sender}</span>
                    <span className="text-xs text-zinc-400">{msg.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Action Updated</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium mb-3">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>Changes approved. PO updated.</p>
                </div>
                <div className="flex items-center gap-3 bg-card/50 p-3 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm">
                    <div className="h-10 w-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center border border-red-100 dark:border-red-800/30">
                        <FileText className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">PO_Revised_Final.pdf</p>
                        <p className="text-xs text-zinc-500">2.4 MB • Generated just now</p>
                    </div>
                    <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                        <Download className="h-5 w-5" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={cn(
            "rounded-2xl p-4 shadow-sm transition-all duration-300",
            isRequesting ? "ring-2 ring-indigo-500/20 bg-card" : "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800"
        )}>
            {!isRequesting ? (
                <>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">{msg.sender}</span>
                        <span className="text-xs text-zinc-400">{msg.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Action Completed</span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">{msg.content}</p>

                    <div className="mt-3 space-y-3">
                        {/* PDF File */}
                        <div className="flex items-center gap-3 bg-card/50 p-3 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm">
                            <div className="h-10 w-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center border border-red-100 dark:border-red-800/30">
                                <FileText className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-zinc-900 dark:text-white">PO_ORD-2055_Final.pdf</p>
                                <p className="text-xs text-zinc-500">2.4 MB • Generated just now</p>
                            </div>
                            <button className="p-2 hover:bg-primary hover:text-zinc-900 dark:hover:bg-primary dark:hover:text-zinc-900 rounded-lg text-zinc-400 transition-colors group">
                                <Download className="h-5 w-5 group-hover:text-zinc-900" />
                            </button>
                        </div>

                        {/* Attention Selection */}
                        <div className="pl-4 border-l-4 border-amber-500 py-2 my-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                        Attention Needed
                                    </p>
                                    <p className="text-sm text-zinc-900 dark:text-zinc-300 mt-1">
                                        Discrepancy detected for <span className="font-semibold text-zinc-900 dark:text-white">SKU-OFF-2025-003</span>:
                                    </p>
                                    <div className="mt-2 flex items-center gap-4 text-xs font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Warehouse</span>
                                            <span className="text-zinc-900 dark:text-white font-mono text-sm bg-zinc-100 dark:bg-card px-1.5 py-0.5 rounded">42</span>
                                        </div>
                                        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Local</span>
                                            <span className="text-zinc-900 dark:text-white font-mono text-sm bg-zinc-100 dark:bg-card px-1.5 py-0.5 rounded">35</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors">
                                Sync Database
                            </button>
                            <button className="px-4 py-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-primary hover:text-zinc-900 dark:hover:bg-primary dark:hover:text-zinc-900 text-xs font-medium rounded-lg transition-colors">
                                Resolve Manually
                            </button>
                            <button
                                onClick={() => setIsRequesting(true)}
                                className="px-3 py-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-900 hover:bg-primary dark:hover:bg-primary rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ml-auto group"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Request Changes
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Describe required changes:</h4>
                        <button onClick={() => setIsRequesting(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <textarea
                        className="w-full text-sm bg-zinc-50 dark:bg-card border-0 rounded-lg p-3 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="E.g., Update weight for ORD-2054 to 48kg..."
                        rows={3}
                        autoFocus
                        value={requestText}
                        onChange={(e) => setRequestText(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                        <button className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-accent transition-colors">
                            <Paperclip className="w-3.5 h-3.5" />
                            Attach File
                        </button>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsRequesting(false)}
                                className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium rounded-lg shadow-sm transition-colors"
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const collaborators = [
    { name: "Sarah Chen", role: "Logistics Mgr", status: "online", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Mike Ross", role: "Warehouse Lead", status: "offline", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "AI Agent", role: "System Bot", status: "online", avatar: "AI" },
]

const documents = [
    { name: "Packing_Slip_2055.pdf", size: "245 KB", uploaded: "Jan 12, 2025" },
    { name: "Invoice_INV-8992.pdf", size: "1.2 MB", uploaded: "Jan 12, 2025" },
]

interface DetailProps {
    onBack: () => void;
    onLogout: () => void;
    onNavigateToWorkspace: () => void;
    onNavigate?: (page: string) => void;
}

export default function Detail({ onBack, onLogout, onNavigateToWorkspace, onNavigate }: DetailProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "System",
            avatar: "",
            content: "Order #ORD-2055 has been flagged for manual review due to stock discrepancy.",
            time: "2 hours ago",
            type: "system",
        },
        {
            id: 2,
            sender: "AI Assistant",
            avatar: "AI",
            content: <DiscrepancyResolutionFlow />,
            time: "2 hours ago",
            type: "ai",
        },
        {
            id: 3,
            sender: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: "@InventoryManager I'm verifying the physical stock in Zone B. Will update shortly.",
            time: "1 hour ago",
            type: "user",
        },
        {
            id: 4,
            sender: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: "I've contacted the client. They want to proceed with the available items. I've updated the order line items accordingly.",
            time: "15 mins ago",
            type: "user",
        },
        {
            id: 5,
            sender: "System",
            avatar: "",
            content: "Sarah Chen triggered context action: Process Quote",
            time: "Just now",
            type: "system",
        },
        {
            id: 6,
            sender: "AI Assistant",
            avatar: "AI",
            content: "Quote processing initiated. Analyzing updated line items and generating revised PDF...",
            time: "Just now",
            type: "action_processing",
        },
        {
            id: 7,
            sender: "AI Assistant",
            avatar: "AI",
            content: "Analysis complete. I've generated the revised Purchase Order, but found stock discrepancies that require attention.",
            time: "Just now",
            type: "action_success",
        }
    ])
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true,
        aiSuggestions: true
    })
    const [isPOModalOpen, setIsPOModalOpen] = useState(false)
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [isAiDiagnosisOpen, setIsAiDiagnosisOpen] = useState(false)
    const [isSendOpen, setIsSendOpen] = useState(false)
    const [isAddItemOpen, setIsAddItemOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const { showToast, toastMessage, triggerToast, dismissToast } = useToast()
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
    const [isManualFixMode, setIsManualFixMode] = useState(false)
    const [resolutionMethod, setResolutionMethod] = useState<'local' | 'remote' | 'custom'>('remote')
    const [customValue, setCustomValue] = useState('')

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const { theme, toggleTheme } = useTheme()
    const { currentTenant } = useTenant()

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-foreground transition-colors duration-200">
            {/* Floating Info Navbar */}
            <Navbar onLogout={onLogout} activeTab="Inventory" onNavigateToWorkspace={onNavigateToWorkspace} onNavigate={onNavigate || (() => { })} />

            {/* Page Header (moved from original header, adjusted for floating nav) */}
            <div className="pt-24 px-6 pb-4 flex items-center justify-between border-b border-border bg-transparent transition-colors duration-200">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <button onClick={onBack} className="p-1 hover:bg-primary hover:text-zinc-900 dark:hover:text-zinc-900 rounded-md transition-colors">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                    </button>
                    <Breadcrumbs
                        items={[
                            { label: 'Dashboard', onClick: onBack },
                            { label: `${currentTenant} Inventory` },
                            { label: 'Seating Category', active: true }
                        ]}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <FilterPopover onApply={(filters) => triggerToast('Filters Applied', `${filters.statuses.length + filters.categories.length} filters active`, 'info')} />
                    <button onClick={() => { triggerToast('Preparing Export', 'Generating CSV file...', 'info'); setTimeout(() => triggerToast('Export Complete', 'Project_INV-CAT_items.csv downloaded', 'success'), 1500); }} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground bg-background border border-input rounded-md hover:bg-primary hover:text-zinc-900 group transition-colors">
                        <Download className="h-4 w-4 text-muted-foreground group-hover:text-zinc-900" /> Export
                    </button>
                    <button onClick={() => setIsAddItemOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90">
                        <Plus className="h-4 w-4" /> Add New Item
                    </button>
                </div>
            </div>

            <div className="flex flex-col p-6 gap-6">
                {/* Collapsible Summary */}
                {isSummaryExpanded ? (
                    <>
                        <div className="bg-card p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-white/10 ring-1 ring-black/5 dark:ring-0 transition-all duration-300">
                            <div className="flex justify-end mb-4">
                                <button onClick={() => setIsSummaryExpanded(false)} className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-900 transition-colors bg-zinc-100 dark:bg-card hover:bg-primary dark:hover:bg-primary px-2.5 py-1.5 rounded-lg">
                                    Hide Details <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-in fade-in zoom-in duration-300">
                                {[
                                    { label: 'TOTAL SKUs', value: '450' },
                                    { label: 'IN PRODUCTION', value: '50' },
                                    { label: 'AVAILABLE', value: '400' },
                                    { label: 'LOW STOCK', value: '15' },
                                    { label: 'OUT OF STOCK', value: '8', color: 'text-red-600 dark:text-red-400' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-zinc-50 dark:bg-card/50 p-4 rounded-xl border border-zinc-100 dark:border-white/5">
                                        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
                                        <p className={cn("text-2xl font-bold tracking-tight", stat.color || "text-zinc-900 dark:text-white")}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Integrated Stepper - Matched to Dashboard */}
                            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 ml-1">Workflow Progress</h4>
                                <div className="relative pb-2">
                                    <div className="absolute top-3 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-700" />
                                    <div className="relative z-10 flex justify-between w-full max-w-4xl mx-auto px-4">
                                        {[
                                            { name: 'Category Selected', status: 'completed' },
                                            { name: 'Item List Viewing', status: 'current' },
                                            { name: 'Details Pending', status: 'pending' },
                                            { name: 'Edit Pending', status: 'pending' },
                                            { name: 'Complete Pending', status: 'pending' }
                                        ].map((step, i) => {
                                            const isCompleted = step.status === 'completed';
                                            const isCurrent = step.status === 'current';
                                            // Matching Dashboard logic: Completed & Current (active) use primary/brand colors. 
                                            // Dashboard uses index logic (i <= 1), here we use status.
                                            // Dashboard classes: h-6 w-6 rounded-full flex items-center justify-center
                                            // Active/Completed: bg-primary text-primary-foreground
                                            // Pending: bg-zinc-200 dark:bg-zinc-700 text-zinc-400

                                            // However, for correct visual flow in this context:
                                            // Completed: Primary Background, Check Icon
                                            // Current: Primary Background, Dot
                                            // Pending: Gray Background

                                            return (
                                                <div key={i} className="flex flex-col items-center bg-card px-1 group cursor-default">
                                                    <div className={cn(
                                                        "h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300",
                                                        isCompleted || isCurrent
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
                                                    )}>
                                                        {isCompleted ? <Check className="w-4 h-4" /> :
                                                            isCurrent ? <div className="w-2 h-2 rounded-full bg-primary-foreground" /> :
                                                                <div className="w-2 h-2 rounded-full bg-white/50 dark:bg-zinc-600" />}
                                                    </div>
                                                    <span className={cn(
                                                        "mt-2 text-xs font-medium transition-colors duration-300",
                                                        isCompleted || isCurrent ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500'
                                                    )}>
                                                        {step.name.split(' ')[0]}
                                                    </span>
                                                    <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-0.5">{step.name.split(' ').slice(1).join(' ')}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-card p-4 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                            {[
                                { label: 'Total SKUs', value: '450' },
                                { label: 'Available', value: '400' },
                                { label: 'Low Stock', value: '15', color: 'text-amber-600 dark:text-amber-400' },
                                { label: 'Out of Stock', value: '8', color: 'text-red-600 dark:text-red-400' },
                            ].map((stat, i) => (
                                <Fragment key={i}>
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{stat.label}:</span>
                                        <span className={cn("text-lg font-bold leading-none mt-1", stat.color || "text-zinc-900 dark:text-white")}>{stat.value}</span>
                                    </div>
                                    {i < 3 && <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700 hidden sm:block"></div>}
                                </Fragment>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            {/* Current Phase Indicator */}
                            <div className="flex items-center gap-3 hidden md:flex">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Current Phase</span>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Item List Viewing</span>
                                </div>
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-zinc-900 dark:border-white bg-card">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white" />
                                </div>
                            </div>

                            <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700 hidden xl:block mx-2"></div>

                            <button
                                onClick={() => setIsSummaryExpanded(true)}
                                className="flex flex-col items-center justify-center gap-1 group p-2 hover:bg-primary dark:hover:bg-primary rounded-lg transition-colors"
                            >
                                <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-900 transition-colors">
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-900 transition-colors">Show Details</span>
                            </button>
                        </div>
                    </div>
                )}



                {/* Main Content Area */}
                <div className="flex flex-col">
                    <TabGroup className="flex flex-col">
                        <div className="px-4 border-b border-border flex items-center justify-between bg-background">
                            <TabList className="flex gap-6">
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "py-4 text-sm font-medium border-b-2 outline-none transition-colors",
                                            selected
                                                ? "border-zinc-500 text-zinc-900 dark:border-primary dark:text-foreground"
                                                : "border-transparent text-muted-foreground hover:text-foreground"
                                        )
                                    }
                                >
                                    Order Info
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "py-4 text-sm font-medium border-b-2 outline-none transition-colors",
                                            selected
                                                ? "border-zinc-500 text-zinc-900 dark:border-primary dark:text-foreground"
                                                : "border-transparent text-muted-foreground hover:text-foreground"
                                        )
                                    }
                                >
                                    Activity Stream
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanels className="">
                            <TabPanel className="flex flex-col focus:outline-none">
                                <div className="grid grid-cols-12 gap-6 p-6">
                                    {/* Left Panel: List */}
                                    <div className="col-span-8 flex flex-col bg-card border border-border rounded-lg shadow-sm">
                                        {/* Search and Filter Bar */}
                                        <div className="flex items-center justify-between p-4 border-b border-border">
                                            <div className="flex-1 max-w-lg relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Search className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Search SKU, Product Name..."
                                                    className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                                />
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <button className="inline-flex items-center px-3 py-2 border border-input shadow-sm text-sm leading-4 font-medium rounded-md text-foreground bg-background hover:bg-muted focus:outline-none">
                                                    All Materials
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </button>
                                                <button className="inline-flex items-center px-3 py-2 border border-input shadow-sm text-sm leading-4 font-medium rounded-md text-foreground bg-background hover:bg-muted focus:outline-none">
                                                    Stock Status
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Table */}
                                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                                            <table className="min-w-full divide-y divide-border">
                                                <thead className="bg-muted/50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-10">
                                                            <input type="checkbox" className="h-4 w-4 rounded border-input text-zinc-900 dark:text-primary focus:ring-primary bg-background" />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">SKU ID</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Image</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product Name</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Properties</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock Level</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-card divide-y divide-border">
                                                    {items.map((item) => (
                                                        <tr
                                                            key={item.id}
                                                            onClick={() => setSelectedItem(item)}
                                                            className={cn(
                                                                "cursor-pointer transition-colors hover:bg-muted/50",
                                                                selectedItem.id === item.id ? "bg-muted/80" : ""
                                                            )}
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <input type="checkbox" className="h-4 w-4 rounded border-input text-zinc-900 dark:text-primary focus:ring-primary bg-background" />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{item.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                                                                    <Box className="h-5 w-5 text-muted-foreground" />
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        <div className="text-sm font-medium text-foreground flex items-center gap-2">
                                                                            {item.name}
                                                                            {item.aiStatus && (
                                                                                <div className={cn(
                                                                                    "h-2 w-2 rounded-full",
                                                                                    item.aiStatus === 'warning' ? "bg-amber-500 shadow-[0_0_0_2px_rgba(245,158,11,0.2)]" : "bg-primary shadow-[0_0_0_2px_rgba(var(--primary),0.2)]"
                                                                                )} />
                                                                            )}
                                                                        </div>
                                                                        <div className="text-sm text-muted-foreground">{item.category}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{item.properties}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-1.5 bg-muted rounded-full relative overflow-hidden">
                                                                        <div
                                                                            className="absolute bottom-0 left-0 w-full bg-foreground rounded-full"
                                                                            style={{ height: `${(item.stock / 600) * 100}%` }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-xs text-muted-foreground">{Math.floor((item.stock / 600) * 100)}%</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={cn(
                                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                                    item.status === 'In Stock' ? "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-card dark:text-zinc-200 dark:border-zinc-700" :
                                                                        item.status === 'Low Stock' ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800" :
                                                                            "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800"
                                                                )}>
                                                                    {item.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Right Panel: Details */}
                                    <div className="col-span-4 flex flex-col bg-card border border-border rounded-lg shadow-sm">
                                        {/* Details Header */}
                                        <div className="flex items-center justify-between p-4 border-b border-border">
                                            <h3 className="text-lg font-semibold text-foreground">Item Details</h3>
                                            <div className="flex gap-1">
                                                <button onClick={() => setIsDocumentModalOpen(true)} className="p-1 text-muted-foreground hover:text-zinc-900 rounded hover:bg-primary transition-colors">
                                                    <DocumentBarChart3 className="h-4 w-4" title="Preview Document" />
                                                </button>
                                                <button onClick={() => setIsEditOpen(true)} className="p-1 text-muted-foreground hover:text-zinc-900 rounded hover:bg-primary transition-colors" title="Edit Item">
                                                    <SquarePen className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => { triggerToast('Preparing Download', 'Generating PDF document...', 'info'); setTimeout(() => triggerToast('Download Complete', `Project_INV-CAT_${selectedItem.id}.pdf downloaded`, 'success'), 1500); }} className="p-1 text-muted-foreground hover:text-zinc-900 rounded hover:bg-primary transition-colors">
                                                    <Download className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => setIsSendOpen(true)} className="p-1 text-muted-foreground hover:text-zinc-900 rounded hover:bg-primary transition-colors">
                                                    <Send className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => setIsAiDiagnosisOpen(true)} className="relative p-1 text-indigo-600 hover:text-zinc-900 rounded hover:bg-primary transition-colors">
                                                    <Sparkles className="h-4 w-4" />
                                                    <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-zinc-900" />
                                                </button>
                                                <div className="w-px h-4 bg-border mx-1 self-center" />
                                                <ItemActionsPopover transactionType="project" onAction={(action) => triggerToast(action, `${action} completed for ${selectedItem.name}`, 'success')} />
                                            </div>
                                        </div>

                                        <div className="p-4 space-y-6">
                                            {/* AI Side Panel Section */}
                                            {selectedItem.aiStatus && (
                                                <div>
                                                    <button
                                                        onClick={() => toggleSection('aiSuggestions')}
                                                        className="flex items-center justify-between w-full mb-2 group"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                            <span className="text-sm font-bold text-foreground">AI Suggestions</span>
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                                            </span>
                                                        </div>
                                                        <ChevronDown
                                                            className={cn(
                                                                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                                                sections.aiSuggestions ? "transform rotate-0" : "transform -rotate-90"
                                                            )}
                                                        />
                                                    </button>

                                                    {sections.aiSuggestions && (
                                                        selectedItem.aiStatus === 'info' ? (
                                                            <div className="bg-zinc-50 dark:bg-card/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                                                                <h4 className="text-sm font-bold text-foreground mb-2">Optimization Opportunity</h4>
                                                                <div className="space-y-2">
                                                                    <div className="p-2 bg-background border border-border rounded cursor-pointer hover:border-primary transition-colors">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border border-muted-foreground"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-foreground">Standard {selectedItem.name}</div>
                                                                                <div className="text-xs text-muted-foreground">Listed Price</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-2 bg-background border-2 border-green-500 rounded cursor-pointer">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border-4 border-green-500"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-green-700 dark:text-green-400">Eco-Friendly {selectedItem.name}</div>
                                                                                <div className="text-xs text-muted-foreground">-15% Carbon Footprint</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-2 bg-background border border-border rounded cursor-pointer hover:border-indigo-500 transition-colors">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border border-muted-foreground"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Premium {selectedItem.name}</div>
                                                                                <div className="text-xs text-muted-foreground">+ High Durability Finish</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <button className="w-full mt-1 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded shadow-sm transition-colors">
                                                                        Apply Selection
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-zinc-50 dark:bg-card/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
                                                                <div className="flex gap-3">
                                                                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                                                    <div className="w-full">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <h4 className="text-sm font-bold text-foreground">Database Discrepancy</h4>
                                                                                <p className="text-xs text-muted-foreground mt-1">Stock count mismatch detected.</p>
                                                                            </div>
                                                                            {!isManualFixMode && (
                                                                                <button
                                                                                    onClick={() => setIsManualFixMode(true)}
                                                                                    className="text-xs text-muted-foreground underline hover:text-foreground"
                                                                                >
                                                                                    Resolve Manually
                                                                                </button>
                                                                            )}
                                                                        </div>

                                                                        {!isManualFixMode ? (
                                                                            <>
                                                                                <div className="flex items-center justify-between mt-2 mb-3 px-2 py-2 bg-muted/50 rounded">
                                                                                    <div className="text-center">
                                                                                        <div className="text-[10px] text-muted-foreground uppercase font-medium">Local</div>
                                                                                        <div className="text-sm font-bold text-foreground">{selectedItem.stock}</div>
                                                                                    </div>
                                                                                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                                                                                    <div className="text-center">
                                                                                        <div className="text-[10px] text-muted-foreground uppercase font-medium">Remote</div>
                                                                                        <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{(selectedItem.stock || 0) + 5}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <button className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded shadow-sm transition-colors">
                                                                                    Auto-Sync to Warehouse
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            <div className="mt-3 space-y-2">
                                                                                {/* Manual Resolution Options */}
                                                                                <div
                                                                                    onClick={() => setResolutionMethod('local')}
                                                                                    className={cn(
                                                                                        "p-2 rounded cursor-pointer border",
                                                                                        resolutionMethod === 'local' ? "bg-card border-amber-500" : "border-transparent hover:bg-muted/50"
                                                                                    )}
                                                                                >
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className={cn("h-3 w-3 rounded-full border", resolutionMethod === 'local' ? "border-4 border-amber-500" : "border-zinc-400")}></div>
                                                                                        <div>
                                                                                            <div className="text-xs font-bold text-foreground">Keep Local Value</div>
                                                                                            <div className="text-[10px] text-muted-foreground">{selectedItem.stock} items</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    onClick={() => setResolutionMethod('remote')}
                                                                                    className={cn(
                                                                                        "p-2 rounded cursor-pointer border",
                                                                                        resolutionMethod === 'remote' ? "bg-card border-amber-500" : "border-transparent hover:bg-muted/50"
                                                                                    )}
                                                                                >
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className={cn("h-3 w-3 rounded-full border", resolutionMethod === 'remote' ? "border-4 border-amber-500" : "border-zinc-400")}></div>
                                                                                        <div>
                                                                                            <div className="text-xs font-bold text-foreground">Accept Warehouse Value</div>
                                                                                            <div className="text-[10px] text-muted-foreground">{(selectedItem.stock || 0) + 5} items</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex gap-2 mt-3">
                                                                                    <button
                                                                                        onClick={() => setIsManualFixMode(false)}
                                                                                        className="flex-1 py-1.5 bg-background border border-input text-foreground text-xs font-medium rounded hover:bg-muted"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            alert(`Fixed with: ${resolutionMethod}`)
                                                                                            setIsManualFixMode(false)
                                                                                        }}
                                                                                        className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shadow-sm"
                                                                                    >
                                                                                        Confirm Fix
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                            {/* Product Overview */}
                                            <div>
                                                <button
                                                    onClick={() => toggleSection('productOverview')}
                                                    className="flex items-center justify-between w-full mb-2 group"
                                                >
                                                    <span className="text-sm font-medium text-foreground">Product Overview</span>
                                                    <ChevronDown
                                                        className={cn(
                                                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                                            sections.productOverview ? "transform rotate-0" : "transform -rotate-90"
                                                        )}
                                                    />
                                                </button>
                                                {sections.productOverview && (
                                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200 bg-zinc-50 dark:bg-card border border-border rounded-lg p-4">
                                                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                                            <Box className="h-12 w-12 text-muted-foreground/50" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-semibold text-foreground">{selectedItem.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{selectedItem.id}</p>
                                                            <div className="flex gap-2 mt-2">
                                                                <span className={cn(
                                                                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                                                    selectedItem.statusColor
                                                                )}>
                                                                    {selectedItem.status}
                                                                </span>
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">
                                                                    Premium
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="h-px bg-border my-4" />

                                            {/* Lifecycle */}
                                            <div>
                                                <button
                                                    onClick={() => toggleSection('lifecycle')}
                                                    className="flex items-center justify-between w-full mb-2 group"
                                                >
                                                    <span className="text-sm font-medium text-foreground">Lifecycle Status</span>
                                                    <ChevronDown
                                                        className={cn(
                                                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                                            sections.lifecycle ? "transform rotate-0" : "transform -rotate-90"
                                                        )}
                                                    />
                                                </button>
                                                {sections.lifecycle && (
                                                    <div className="pl-4 border-l border-border ml-2 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200 bg-zinc-50 dark:bg-card border-r border-y border-border rounded-r-lg p-4">
                                                        {['Material Sourced', 'Manufacturing', 'Quality Control'].map((step, i) => (
                                                            <div key={i} className="relative pb-2 last:pb-0">
                                                                <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                                                                <p className="text-sm font-medium text-foreground leading-none">{step}</p>
                                                                <p className="text-xs text-muted-foreground mt-1">Completed Jan {5 + i * 5}, 2026</p>
                                                            </div>
                                                        ))}
                                                        <div className="relative">
                                                            <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-background border-2 border-zinc-400 dark:border-primary ring-4 ring-background" />
                                                            <p className="font-medium text-foreground leading-none">Warehouse Storage</p>
                                                            <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="h-px bg-border my-4" />

                                            {/* Action Required */}
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground mb-2">Action Required</h4>
                                                <div className="pl-4 border-l border-border ml-2 space-y-3">
                                                    <button
                                                        onClick={() => setIsPOModalOpen(true)}
                                                        className="w-full py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg shadow-sm transition-colors"
                                                    >
                                                        Create Purchase Order
                                                    </button>
                                                    <button className="w-full py-1.5 bg-background hover:bg-muted text-muted-foreground text-xs font-semibold rounded-lg border border-border transition-colors">
                                                        Send Acknowledgment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="flex focus:outline-none min-h-[800px]">
                                <div className="flex flex-col min-w-0 bg-muted/10 w-full">
                                    {/* Chat Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-foreground">Activity Stream</h3>
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">#ORD-2055</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">Real-time updates and collaboration</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                {collaborators.map((c, i) => (
                                                    <div key={i} className="relative inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                                        {c.avatar === 'AI' ? (
                                                            <div className="h-full w-full rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">AI</div>
                                                        ) : (
                                                            <img className="h-full w-full rounded-full object-cover" src={c.avatar} alt={c.name} />
                                                        )}
                                                        <span className={cn(
                                                            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background",
                                                            c.status === 'online' ? "bg-green-400" : "bg-zinc-300"
                                                        )} />
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Messages Area */}
                                    <div className="p-6 space-y-6">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={cn("flex gap-4 max-w-3xl", msg.type === 'user' ? "ml-auto flex-row-reverse" : "")}>
                                                <div className="flex-shrink-0">
                                                    {msg.type === 'action_processing' ? (
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
                                                            <FileText className="h-5 w-5 text-zinc-900 dark:text-primary" />
                                                        </div>
                                                    ) : msg.type === 'action_success' ? (
                                                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border border-green-200 dark:border-green-800">
                                                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    ) : msg.avatar === 'AI' ? (
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                                                            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                        </div>
                                                    ) : msg.avatar ? (
                                                        <img className="h-10 w-10 rounded-full object-cover" src={msg.avatar} alt={msg.sender} />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                                            <AlertTriangle className="h-5 w-5 text-zinc-900 dark:text-primary" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-baseline justify-between">
                                                        <span className="text-sm font-semibold text-foreground">{msg.sender}</span>
                                                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                                                    </div>

                                                    {msg.type === 'action_success' ? (
                                                        <DiscrepancyActionCard msg={msg} />
                                                    ) : (
                                                        <div className={cn(
                                                            "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                                            msg.type === 'user'
                                                                ? "bg-brand-300 dark:bg-brand-500 text-primary-foreground rounded-tr-sm"
                                                                : "bg-card border border-border rounded-tl-sm text-foreground"
                                                        )}>
                                                            {msg.content}
                                                            {msg.type === 'action_processing' && (
                                                                <div className="mt-3 flex items-center gap-2 text-zinc-900 dark:text-primary font-medium">
                                                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                                                    <span>Processing request...</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="sticky bottom-4 mx-4 p-4 bg-background border border-border rounded-2xl shadow-lg z-10 transition-all duration-200">
                                        <div className="flex gap-4">
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    placeholder="Type a message or use @ to mention..."
                                                    className="w-full pl-4 pr-12 py-3 bg-muted/50 border-0 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary transition-shadow"
                                                />
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                    <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                                                        <Paperclip className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="p-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                                                <Send className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Contextual Quick Actions Sidebar */}
                                <div className="w-80 border-l border-border bg-muted/30 flex flex-col h-full animate-in slide-in-from-right duration-500">
                                    <div className="p-5 border-b border-border bg-background/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Context</h3>
                                            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center border border-amber-200 dark:border-amber-500/30">
                                                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-foreground">Pending Review</p>
                                                <p className="text-xs text-muted-foreground">Waiting for Final Approval (2/3)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-5 space-y-6 overflow-y-auto">
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Suggested Actions</h4>
                                            <div className="space-y-3">
                                                <button onClick={() => setIsDocumentModalOpen(true)} className="w-full group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-left">
                                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-zinc-900 dark:text-primary">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground group-hover:text-zinc-900 dark:group-hover:text-primary transition-colors">Process Quote</p>
                                                        <p className="text-[10px] text-muted-foreground">Analyze PDF & Extract Data</p>
                                                    </div>
                                                </button>

                                                <button className="w-full group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-green-500/50 hover:shadow-md transition-all text-left">
                                                    <div className="h-8 w-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors text-green-600 dark:text-green-400">
                                                        <Check className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Approve Order</p>
                                                        <p className="text-[10px] text-muted-foreground">Move to Production</p>
                                                    </div>
                                                </button>

                                                <button className="w-full group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-amber-500/50 hover:shadow-md transition-all text-left">
                                                    <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors text-amber-600 dark:text-amber-400">
                                                        <Pencil className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Request Changes</p>
                                                        <p className="text-[10px] text-muted-foreground">Send feedback to vendor</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Live Updates</h4>
                                            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                                                <div className="flex gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75"></span>
                                                        <div className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-900 dark:text-primary">AI Assistant is processing the new quote...</p>
                                                        <p className="text-[10px] text-zinc-700 dark:text-primary/80 mt-1">Estimated completion: 30s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border-t border-border bg-muted/50">
                                        <button className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
                                            View Activity Log <LogOut className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </TabPanel >
                        </TabPanels >
                    </TabGroup >
                </div >
            </div >

            <Transition show={isDocumentModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setIsDocumentModalOpen}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-card p-6 text-left align-middle shadow-xl transition-all border border-border">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <DialogTitle as="h3" className="text-lg font-bold leading-6 text-foreground">
                                                Project Catalog Preview
                                            </DialogTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Previewing Inventory Catalog #INV-CAT
                                            </p>
                                        </div>
                                        <button onClick={() => setIsDocumentModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="bg-white text-black p-10 rounded-lg border border-zinc-200 h-[600px] overflow-auto shadow-sm">
                                        <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-black">
                                            <h2 className="text-2xl font-bold uppercase">Inventory Catalog</h2>
                                            <div className="text-right">
                                                <div className="font-bold text-lg">STRATA INC.</div>
                                                <div className="text-sm">123 Innovation Dr., Tech City, CA 94025</div>
                                                <div className="text-xs text-zinc-500">Tel: (555) 123-4567 | catalog@strata.io</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-8">
                                            <div>
                                                <div className="text-xs font-bold text-zinc-500 mb-1 uppercase">PROJECT INFO</div>
                                                <div className="font-bold">Office Furniture Collection 2026</div>
                                                <div className="text-sm text-zinc-600">Department: Product Management</div>
                                                <div className="text-sm text-zinc-600">Manager: David Park</div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <div className="flex justify-between w-48">
                                                    <span className="text-sm font-bold text-zinc-500">Catalog Ref:</span>
                                                    <span className="text-sm font-bold">INV-CAT</span>
                                                </div>
                                                <div className="flex justify-between w-48">
                                                    <span className="text-sm font-bold text-zinc-500">Updated:</span>
                                                    <span className="text-sm">Mar 28, 2026</span>
                                                </div>
                                                <div className="flex justify-between w-48">
                                                    <span className="text-sm font-bold text-zinc-500">Status:</span>
                                                    <span className="text-sm font-medium text-green-700">Active</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex bg-zinc-100 p-2 font-bold text-xs mb-2">
                                                <div className="w-8 text-center">#</div>
                                                <div className="flex-grow-[2]">ITEM</div>
                                                <div className="flex-1">CATEGORY</div>
                                                <div className="flex-1 text-right">STOCK LEVEL</div>
                                                <div className="flex-1 text-center">STATUS</div>
                                                <div className="flex-1 text-right">LIST PRICE</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-8 text-center text-sm text-zinc-500">1</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Executive Chair Pro</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-001 · Leather / Black</div>
                                                </div>
                                                <div className="flex-1 text-sm">Premium Series</div>
                                                <div className="flex-1 text-right text-sm">285 units</div>
                                                <div className="flex-1 text-center"><span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">In Stock</span></div>
                                                <div className="flex-1 text-right text-sm">$450.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-8 text-center text-sm text-zinc-500">2</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Ergonomic Task Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-002 · Mesh / Gray</div>
                                                </div>
                                                <div className="flex-1 text-sm">Standard Series</div>
                                                <div className="flex-1 text-right text-sm">520 units</div>
                                                <div className="flex-1 text-center"><span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">In Stock</span></div>
                                                <div className="flex-1 text-right text-sm">$125.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-8 text-center text-sm text-zinc-500">3</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Conference Room Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-003 · Fabric / Navy</div>
                                                </div>
                                                <div className="flex-1 text-sm">Meeting Series</div>
                                                <div className="flex-1 text-right text-sm">42 units</div>
                                                <div className="flex-1 text-center"><span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Low Stock</span></div>
                                                <div className="flex-1 text-right text-sm">$85.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-8 text-center text-sm text-zinc-500">4</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Visitor Stacking Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-004 · Plastic / White</div>
                                                </div>
                                                <div className="flex-1 text-sm">Guest Series</div>
                                                <div className="flex-1 text-right text-sm">180 units</div>
                                                <div className="flex-1 text-center"><span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">In Stock</span></div>
                                                <div className="flex-1 text-right text-sm">$55.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-8 text-center text-sm text-zinc-500">5</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Gaming Office Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-005 · Leather / Red</div>
                                                </div>
                                                <div className="flex-1 text-sm">Sport Series</div>
                                                <div className="flex-1 text-right text-sm">0 units</div>
                                                <div className="flex-1 text-center"><span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">Out of Stock</span></div>
                                                <div className="flex-1 text-right text-sm">$195.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-8 text-center text-sm text-zinc-500">6</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Drafting Stool High</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-007 · Mesh / Black</div>
                                                </div>
                                                <div className="flex-1 text-sm">Studio Series</div>
                                                <div className="flex-1 text-right text-sm">340 units</div>
                                                <div className="flex-1 text-center"><span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">In Stock</span></div>
                                                <div className="flex-1 text-right text-sm">$75.00</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="w-72">
                                                <div className="text-xs font-bold text-zinc-500 mb-2 uppercase">Catalog Summary</div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-600">Total SKUs:</span>
                                                    <span className="text-sm font-bold">6</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-600">Items In Stock:</span>
                                                    <span className="text-sm font-medium text-green-700">4</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-600">Low Stock Alerts:</span>
                                                    <span className="text-sm font-medium text-amber-700">1</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-600">Out of Stock:</span>
                                                    <span className="text-sm font-medium text-red-700">1</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-200">
                                                    <span className="text-sm font-bold">Total Inventory Value:</span>
                                                    <span className="text-lg font-bold">$187,925.00</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-zinc-200">
                                            <div className="text-xs text-zinc-500 italic">
                                                Catalog updated quarterly. Low stock threshold: 50 units. Reorder recommendations generated automatically via AI analysis. Next review: Q2 2026.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 focus:outline-none"
                                            onClick={() => setIsDocumentModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus:outline-none"
                                            onClick={() => { triggerToast('Preparing Download', 'Generating PDF document...', 'info'); setTimeout(() => triggerToast('Download Complete', 'Catalog_INV-CAT.pdf downloaded', 'success'), 1500); setIsDocumentModalOpen(false); }}
                                        >
                                            Download PDF
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* SlideOvers & Toast */}
            <SendItemSlideOver open={isSendOpen} onClose={() => setIsSendOpen(false)} transactionType="project" transactionId="INV-CAT" itemName={selectedItem.name} itemId={selectedItem.id} onSend={() => triggerToast('Item Sent', `Details for ${selectedItem.name} sent successfully`, 'success')} />
            <AIDiagnosisSlideOver open={isAiDiagnosisOpen} onClose={() => setIsAiDiagnosisOpen(false)} transactionType="project" selectedItem={selectedItem} onApply={() => triggerToast('AI Recommendation Applied', `Optimization applied to ${selectedItem.name}`, 'success')} />
            <EditItemSlideOver open={isEditOpen} onClose={() => setIsEditOpen(false)} transactionType="project" transactionId="INV-CAT" selectedItem={selectedItem} onSave={() => triggerToast('Changes Saved', `${selectedItem.name} updated successfully`, 'success')} />
            <AddItemSlideOver open={isAddItemOpen} onClose={() => setIsAddItemOpen(false)} transactionType="project" onAdd={() => triggerToast('Item Added', 'New line item added to Project INV-CAT', 'success')} />
            <ToastNotification show={showToast} message={toastMessage} onDismiss={dismissToast} />
        </div >
    )
}




function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={cn(
            "relative flex items-center justify-center h-9 px-3 rounded-full transition-all duration-300 group overflow-hidden",
            active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        )}>
            <span className="relative z-10">{icon}</span>
            <span className={cn(
                "ml-2 text-sm font-medium whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out",
                active ? "max-w-xs opacity-100" : ""
            )}>
                {label}
            </span>
        </button>
    )
}

import { AlertCircle, AlertTriangle, BarChart3, Box, Calendar, Check, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, ClipboardList, Clock, Copy, Download, FileBarChart, FileText, Filter, ImageIcon, LayoutGrid, LogOut, Mail, MessageSquare, MoreHorizontal, Paperclip, Pencil, Plus, Printer, RefreshCw, Search, Send, Sparkles, SquarePen, TrendingUp, User, X } from 'lucide-react';
import { Transition, TransitionChild, Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Fragment, useEffect, Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from 'strata-design-system'
import { useTenant } from './TenantContext'
import Navbar from './components/Navbar'
import Breadcrumbs from './components/Breadcrumbs'
import { QuickActions } from './components/QuickActions'
import { ConversionReviewPage, RevisionHistory, SubmissionHistory, ArtifactDownloads } from './features/po-conversion'
import { MOCK_REVISIONS, MOCK_SUBMISSIONS, MOCK_ARTIFACTS } from './features/po-conversion/mockData'
import { useToast } from './hooks/useToast'
import ToastNotification from './components/ToastNotification'
import SendItemSlideOver from './components/SendItemSlideOver'
import AIDiagnosisSlideOver from './components/AIDiagnosisSlideOver'
import EditItemSlideOver from './components/EditItemSlideOver'
import ItemActionsPopover from './components/ItemActionsPopover'
import AddItemModal from './components/AddItemModal'
import ItemDiscountModal from './components/ItemDiscountModal'
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

export default function QuoteDetail({ onBack, onLogout, onNavigateToWorkspace, onNavigate }: DetailProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "System",
            avatar: "",
            content: "Quote #QT-1025 created from Opportunity #OP-882.",
            time: "2 days ago",
            type: "system",
        },
        {
            id: 3,
            sender: "Sarah Chen",
            avatar: "SC",
            content: "Applying the suggested discount. Sending to client for review.",
            time: "1 day ago",
            type: "user",
        },
        {
            id: 4,
            sender: "System",
            avatar: "",
            content: "Quote status updated to 'Negotiating'. Client viewed the quote.",
            time: "4 hours ago",
            type: "system",
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
    const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false)
    const [isConvertDialogStep, setIsConvertDialogStep] = useState<'review' | 'scanning' | 'discrepancy' | 'approval' | 'processing'>('review')
    const [approvalSteps, setApprovalSteps] = useState<Array<'pending' | 'approved'>>(['pending', 'pending', 'pending'])
    const [discrepancyAcknowledged, setDiscrepancyAcknowledged] = useState<Record<string, boolean>>({})
    const [isConversionReviewOpen, setIsConversionReviewOpen] = useState(false)
    const [isAdvanceDialogOpen, setIsAdvanceDialogOpen] = useState(false)
    const [showPOTab, setShowPOTab] = useState(false)
    const [isAddItemOpen, setIsAddItemOpen] = useState(false)
    const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const { showToast, toastMessage, triggerToast, dismissToast } = useToast()
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
    const [isManualFixMode, setIsManualFixMode] = useState(false)
    const [resolutionMethod, setResolutionMethod] = useState<'local' | 'remote' | 'custom'>('remote')
    const [customValue, setCustomValue] = useState('')

    // Quote workflow stages — dynamic so "Advance Stage" updates the progress bar
    const QUOTE_STAGES = ['Draft Created', 'Internal Review', 'Sent to Client', 'Negotiating', 'Approved']
    const [stageIndex, setStageIndex] = useState(3) // starts at Negotiating
    const isApproved = stageIndex === QUOTE_STAGES.length - 1
    const canAdvance = stageIndex < QUOTE_STAGES.length - 1

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
            <div className="pt-24 px-4 pb-4 w-full max-w-7xl mx-auto flex items-center justify-start gap-6 border-b border-border bg-transparent transition-colors duration-200">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <button onClick={onBack} className="p-1 hover:bg-primary hover:text-zinc-900 dark:hover:text-zinc-900 rounded-md transition-colors">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                    </button>
                    <Breadcrumbs
                        items={[
                            { label: 'Dashboard', onClick: onBack },
                            { label: 'Transactions', onClick: onBack },
                            { label: 'Quote #QT-1025', active: true }
                        ]}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <FilterPopover onApply={(filters) => triggerToast('Filters Applied', `${filters.statuses.length + filters.categories.length} filter(s) active`, 'info')} />
                    <button onClick={() => { triggerToast('Exporting Items...', 'Generating CSV file', 'info'); setTimeout(() => triggerToast('Export Complete', 'Quote_QT-1025_Items.csv has been downloaded', 'success'), 1500); }} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground bg-background border border-input rounded-md hover:bg-primary hover:text-zinc-900 group transition-colors">
                        <Download className="h-4 w-4 text-muted-foreground group-hover:text-zinc-900" /> Export
                    </button>
                    <button onClick={() => setIsAddItemOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90">
                        <Plus className="h-4 w-4" /> Add New Item
                    </button>
                </div>
            </div>

            <div className="flex flex-col px-4 py-6 max-w-7xl mx-auto gap-6">
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
                                    { label: 'QUOTE VALUE', value: '$1,200,000' },
                                    { label: 'NET MARGIN', value: '29.2%', color: 'text-green-600 dark:text-green-400' },
                                    { label: 'PROBABILITY', value: 'High' },
                                    { label: 'VALID UNTIL', value: 'Feb 12' },
                                    { label: 'STATUS', value: 'Negotiating', color: 'text-ai' },
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
                                        {QUOTE_STAGES.map((name, i) => {
                                            const step = {
                                                name,
                                                status: i < stageIndex ? 'completed' : i === stageIndex ? 'current' : 'pending'
                                            }
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
                                { label: 'Quote Value', value: '$1.2M' },
                                { label: 'Margin', value: '29.2%', color: 'text-green-600 dark:text-green-400' },
                                { label: 'Probability', value: 'High', color: 'text-ai' },
                                { label: 'Status', value: 'Negotiating', color: 'text-zinc-600 dark:text-zinc-400' },
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
                                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Negotiating</span>
                                </div>
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-zinc-900 dark:border-white bg-card">
                                    <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
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

                {/* Quick Actions Bar — all actions including stage advance + Convert to PO */}
                <QuickActions actions={[
                    { icon: <Plus className="w-4 h-4" />, label: "Add Item", action: () => setIsAddItemOpen(true) },
                    { icon: <SquarePen className="w-4 h-4" />, label: "Edit Quote", action: () => setIsEditOpen(true) },
                    { icon: <Download className="w-4 h-4" />, label: "Download PDF", action: () => { triggerToast('Preparing Download', 'Generating PDF...', 'info'); setTimeout(() => triggerToast('Download Complete', 'Quote_QT-1025.pdf downloaded', 'success'), 1500); } },
                    { icon: <Send className="w-4 h-4" />, label: "Send to Customer", action: () => setIsSendOpen(true) },
                    ...(canAdvance ? [{ icon: <ChevronRight className="w-4 h-4" />, label: `Advance to ${QUOTE_STAGES[stageIndex + 1]}`, action: () => setIsAdvanceDialogOpen(true) }] : []),
                    { icon: <FileText className="w-4 h-4" />, label: "Convert to PO", action: () => setIsConvertDialogOpen(true) },
                ]} />

                {/* Convert to PO Confirmation Dialog */}
                <Transition show={isConvertDialogOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={() => {
                        if (isConvertDialogStep !== 'processing' && isConvertDialogStep !== 'scanning') {
                            setIsConvertDialogOpen(false)
                            setIsConvertDialogStep('review')
                            setApprovalSteps(['pending', 'pending', 'pending'])
                            setDiscrepancyAcknowledged({})
                        }
                    }}>
                        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        </TransitionChild>
                        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <DialogPanel className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl p-6">
                                    <DialogTitle className="text-lg font-bold text-foreground mb-2">Convert Quote to Purchase Order</DialogTitle>

                                    {isConvertDialogStep === 'review' && (
                                        <>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                This will create a frozen snapshot of Quote <span className="font-semibold text-foreground">QT-1025</span> and generate vendor-specific PO drafts. A pre-conversion scan will run first to catch any pricing or availability issues.
                                            </p>
                                            <div className="space-y-2 mb-5">
                                                {[
                                                    { label: '6 line items across 3 vendors', icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> },
                                                    { label: '$121,935 total PO value', icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> },
                                                    { label: 'Quote locked for 72h review window', icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        {item.icon}
                                                        <span>{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-3 justify-end">
                                                <button onClick={() => { setIsConvertDialogOpen(false); setIsConvertDialogStep('review'); setApprovalSteps(['pending', 'pending', 'pending']); setDiscrepancyAcknowledged({}) }} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsConvertDialogStep('scanning')
                                                        setTimeout(() => setIsConvertDialogStep('discrepancy'), 2000)
                                                    }}
                                                    className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg transition-colors flex items-center gap-1"
                                                >
                                                    Run Pre-flight Scan <ChevronRight className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {isConvertDialogStep === 'scanning' && (
                                        <div className="py-6 space-y-4">
                                            <p className="text-sm text-muted-foreground">Scanning quote against live catalog and vendor data…</p>
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Checking line item pricing vs. current catalog', delay: 0 },
                                                    { label: 'Validating vendor availability & lead times', delay: 400 },
                                                    { label: 'Cross-referencing approved vendor contracts', delay: 900 },
                                                ].map((check, i) => (
                                                    <div key={i} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${check.delay}ms`, animationFillMode: 'both' }}>
                                                        <RefreshCw className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
                                                        <span className="text-xs text-muted-foreground">{check.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {isConvertDialogStep === 'discrepancy' && (() => {
                                        const issues = [
                                            {
                                                id: 'price-hm',
                                                severity: 'error' as const,
                                                vendor: 'Herman Miller',
                                                sku: 'HM-AER-RB',
                                                description: 'Catalog price updated since quoting',
                                                detail: 'Quoted $1,195 · Current $1,275 · 20 units → +$1,600 impact',
                                            },
                                            {
                                                id: 'lead-kn',
                                                severity: 'warning' as const,
                                                vendor: 'Knoll',
                                                sku: 'KN-GEN-EX',
                                                description: 'Lead time extended by vendor',
                                                detail: 'Was 4 weeks · Now 6–8 weeks — may affect delivery commitment',
                                            },
                                        ]
                                        const allAcknowledged = issues.every(i => discrepancyAcknowledged[i.id])
                                        return (
                                            <>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Pre-flight scan found <span className="font-semibold text-foreground">2 issues</span> that require your review before proceeding.
                                                </p>
                                                <div className="space-y-3 mb-5">
                                                    {issues.map(issue => (
                                                        <div key={issue.id} className={`rounded-xl border p-3 transition-all ${discrepancyAcknowledged[issue.id]
                                                            ? 'border-green-200 dark:border-green-500/20 bg-green-50/50 dark:bg-green-500/5 opacity-70'
                                                            : issue.severity === 'error'
                                                                ? 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5'
                                                                : 'border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5'
                                                        }`}>
                                                            <div className="flex items-start gap-3">
                                                                <div className="mt-0.5 shrink-0">
                                                                    {discrepancyAcknowledged[issue.id]
                                                                        ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                        : issue.severity === 'error'
                                                                            ? <AlertCircle className="h-4 w-4 text-red-500" />
                                                                            : <AlertTriangle className="h-4 w-4 text-amber-500" />
                                                                    }
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <span className="text-xs font-bold text-foreground">{issue.vendor}</span>
                                                                        <span className="text-[10px] text-muted-foreground font-mono">{issue.sku}</span>
                                                                    </div>
                                                                    <p className="text-xs font-medium text-foreground mt-0.5">{issue.description}</p>
                                                                    <p className="text-[10px] text-muted-foreground mt-0.5">{issue.detail}</p>
                                                                </div>
                                                                {!discrepancyAcknowledged[issue.id] && (
                                                                    <button
                                                                        onClick={() => setDiscrepancyAcknowledged(prev => ({ ...prev, [issue.id]: true }))}
                                                                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity shrink-0"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-3 justify-end">
                                                    <button onClick={() => { setIsConvertDialogOpen(false); setIsConvertDialogStep('review'); setDiscrepancyAcknowledged({}) }} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                                        Cancel
                                                    </button>
                                                    <button
                                                        disabled={!allAcknowledged}
                                                        onClick={() => setIsConvertDialogStep('approval')}
                                                        className="px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                                                    >
                                                        Proceed to Approval <ChevronRight className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )
                                    })()}

                                    {isConvertDialogStep === 'approval' && (
                                        <ApprovalChainStep
                                            approvalSteps={approvalSteps}
                                            setApprovalSteps={setApprovalSteps}
                                            onAllApproved={() => {
                                                setIsConvertDialogStep('processing')
                                                setTimeout(() => {
                                                    setIsConvertDialogOpen(false)
                                                    setIsConvertDialogStep('review')
                                                    setApprovalSteps(['pending', 'pending', 'pending'])
                                                    triggerToast('Conversion Complete', 'Opening review...', 'success')
                                                    setIsConversionReviewOpen(true)
                                                }, 1500)
                                            }}
                                        />
                                    )}

                                    {isConvertDialogStep === 'processing' && (
                                        <div className="flex flex-col items-center justify-center py-8 gap-3">
                                            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                                            <p className="text-sm font-medium text-foreground">Creating PO drafts…</p>
                                            <p className="text-xs text-muted-foreground">This will only take a moment</p>
                                        </div>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                {/* Advance Stage Dialog */}
                <Transition show={isAdvanceDialogOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={() => setIsAdvanceDialogOpen(false)}>
                        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        </TransitionChild>
                        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <DialogPanel className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-2xl p-6">
                                    <DialogTitle className="text-base font-bold text-foreground mb-1">
                                        Advance to {QUOTE_STAGES[stageIndex + 1]}
                                    </DialogTitle>
                                    <p className="text-xs text-muted-foreground mb-4">Review the requirements before advancing this quote.</p>

                                    <div className="space-y-2 mb-4">
                                        {[
                                            'All required fields completed',
                                            'No pending approvals blocking advancement',
                                            `Stage: ${QUOTE_STAGES[stageIndex]} requirements met`,
                                        ].map((req, i) => (
                                            <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                                                <span className="text-xs font-medium text-foreground">{req}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-muted/50 border border-border rounded-xl p-3 mb-5 flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <p className="text-xs text-muted-foreground">This will move the quote to the next stage. Team members will be notified.</p>
                                    </div>

                                    <div className="flex gap-3 justify-end">
                                        <button onClick={() => setIsAdvanceDialogOpen(false)} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsAdvanceDialogOpen(false)
                                                setStageIndex(i => i + 1)
                                                triggerToast('Stage Advanced', `Quote moved to "${QUOTE_STAGES[stageIndex + 1]}"`, 'success')
                                            }}
                                            className="px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                                        >
                                            Confirm Advance
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

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
                                    Quote Items
                                </Tab>
                                <Tab className={({ selected }) => cn("py-4 text-sm font-medium border-b-2 outline-none transition-colors", selected ? "border-green-500 text-green-700 dark:border-green-400 dark:text-green-400" : "border-transparent text-muted-foreground hover:text-foreground")}>
                                    Submissions
                                </Tab>
                                <Tab className={({ selected }) => cn("py-4 text-sm font-medium border-b-2 outline-none transition-colors", selected ? "border-green-500 text-green-700 dark:border-green-400 dark:text-green-400" : "border-transparent text-muted-foreground hover:text-foreground")}>
                                    Revisions
                                </Tab>
                                <Tab className={({ selected }) => cn("py-4 text-sm font-medium border-b-2 outline-none transition-colors", selected ? "border-green-500 text-green-700 dark:border-green-400 dark:text-green-400" : "border-transparent text-muted-foreground hover:text-foreground")}>
                                    Artifacts
                                </Tab>
                                {showPOTab && (
                                    <Tab
                                        className={({ selected }) =>
                                            cn(
                                                "py-4 text-sm font-medium border-b-2 outline-none transition-colors",
                                                selected
                                                    ? "border-green-500 text-green-700 dark:border-green-400 dark:text-green-400"
                                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                            )
                                        }
                                    >
                                        Purchase Orders
                                    </Tab>
                                )}
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
                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">Edit</th>
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setIsDiscountModalOpen(true); }}
                                                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                                                    title="Edit item"
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </button>
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
                                        </div>

                                        <div className="p-4 space-y-6">
                                            {/* AI Side Panel Section — hidden for this version */}
                                            {false && selectedItem.aiStatus && (
                                                <div>
                                                    <button
                                                        onClick={() => toggleSection('aiSuggestions')}
                                                        className="flex items-center justify-between w-full mb-2 group"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="h-4 w-4 text-ai" />
                                                            <span className="text-sm font-bold text-foreground">AI Suggestions</span>
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-ai"></span>
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

                                                                    <div className="p-2 bg-background border border-border rounded cursor-pointer hover:border-ai/50 transition-colors">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border border-muted-foreground"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-ai dark:text-ai">Premium {selectedItem.name}</div>
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
                            {false && <TabPanel className="flex focus:outline-none min-h-[800px]">
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
                                                            <div className="h-full w-full rounded-full bg-ai flex items-center justify-center text-xs font-bold text-white">AI</div>
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
                                                        <div className="h-10 w-10 rounded-full bg-ai-light dark:bg-ai/10 flex items-center justify-center border border-ai/20 dark:border-ai/30">
                                                            <Sparkles className="h-5 w-5 text-ai" />
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
                                                        <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-sm bg-green-50 text-green-700 border border-green-200">
                                                            {msg.content}
                                                        </div>
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
                            </TabPanel>}
                            <TabPanel className="flex flex-col focus:outline-none p-6">
                                <SubmissionHistory attempts={MOCK_SUBMISSIONS} />
                            </TabPanel>
                            <TabPanel className="flex flex-col focus:outline-none p-6">
                                <RevisionHistory revisions={MOCK_REVISIONS} />
                            </TabPanel>
                            <TabPanel className="flex flex-col focus:outline-none p-6">
                                <ArtifactDownloads artifacts={MOCK_ARTIFACTS} />
                            </TabPanel>
                            {showPOTab && (
                                <TabPanel className="flex flex-col focus:outline-none p-6">
                                    <div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-border mt-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-2">Purchase Orders Created</h3>
                                        <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
                                            The vendor purchase orders for this quote have been generated and are now managed centrally.
                                        </p>
                                        <button 
                                            onClick={() => onNavigate('orders')} 
                                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-sm"
                                        >
                                            View in Orders Hub
                                        </button>
                                    </div>
                                </TabPanel>
                            )}
                        </TabPanels >
                    </TabGroup >
                </div >
            </div >

            {/* Conversion Review Modal */}
            <Transition show={isConversionReviewOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsConversionReviewOpen(false)}>
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                    </TransitionChild>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 pt-16">
                            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <DialogPanel className="w-full max-w-6xl bg-background rounded-2xl border border-border shadow-2xl overflow-hidden">
                                    <ConversionReviewPage
                                        onBack={() => setIsConversionReviewOpen(false)}
                                        onApprove={() => {
                                            setIsConversionReviewOpen(false);
                                            setShowPOTab(true);
                                            triggerToast('POs Created', '3 vendor Purchase Orders created successfully', 'success');
                                        }}
                                    />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                                                Quote Document Preview
                                            </DialogTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Previewing Quotation #QT-1025
                                            </p>
                                        </div>
                                        <button onClick={() => setIsDocumentModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="bg-white text-black p-10 rounded-lg border border-zinc-200 h-[600px] overflow-auto shadow-sm">
                                        <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-black">
                                            <h2 className="text-2xl font-bold uppercase">Quotation</h2>
                                            <div className="text-right">
                                                <div className="font-bold text-lg">STRATA INC.</div>
                                                <div className="text-sm">123 Innovation Dr., Tech City, CA 94025</div>
                                                <div className="text-xs text-zinc-500 mt-1">Tel: (555) 123-4567 | sales@strata.io</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-8">
                                            <div>
                                                <div className="text-xs font-bold text-zinc-500 mb-1 uppercase">PREPARED FOR</div>
                                                <div className="font-bold">Acme Corp.</div>
                                                <div className="text-sm">742 Evergreen Terrace</div>
                                                <div className="text-sm">Springfield, IL 62704</div>
                                                <div className="text-xs text-zinc-500 mt-1">Attn: Michael Chen | m.chen@acmecorp.com</div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <div className="flex justify-between w-52">
                                                    <span className="text-sm font-bold text-zinc-500">QUOTE #:</span>
                                                    <span className="text-sm font-bold">QT-1025</span>
                                                </div>
                                                <div className="flex justify-between w-52">
                                                    <span className="text-sm font-bold text-zinc-500">DATE:</span>
                                                    <span className="text-sm">Mar 15, 2026</span>
                                                </div>
                                                <div className="flex justify-between w-52">
                                                    <span className="text-sm font-bold text-zinc-500">VALID UNTIL:</span>
                                                    <span className="text-sm">Apr 14, 2026</span>
                                                </div>
                                                <div className="flex justify-between w-52">
                                                    <span className="text-sm font-bold text-zinc-500">PREPARED BY:</span>
                                                    <span className="text-sm">Jessica Torres</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex bg-zinc-100 p-2 font-bold text-sm mb-1">
                                                <div className="w-12 text-center">#</div>
                                                <div className="flex-grow-[2]">ITEM</div>
                                                <div className="flex-1 text-right">QTY</div>
                                                <div className="flex-1 text-right">UNIT PRICE</div>
                                                <div className="flex-1 text-right">TOTAL</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-12 text-center text-sm text-zinc-500">1</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Executive Chair Pro</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-001 · Leather / Black · Premium Series</div>
                                                </div>
                                                <div className="flex-1 text-right text-sm">25</div>
                                                <div className="flex-1 text-right text-sm">$450.00</div>
                                                <div className="flex-1 text-right text-sm font-medium">$11,250.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-12 text-center text-sm text-zinc-500">2</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Ergonomic Task Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-002 · Mesh / Gray · Standard Series</div>
                                                </div>
                                                <div className="flex-1 text-right text-sm">60</div>
                                                <div className="flex-1 text-right text-sm">$125.00</div>
                                                <div className="flex-1 text-right text-sm font-medium">$7,500.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-12 text-center text-sm text-zinc-500">3</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Conference Room Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-003 · Fabric / Navy · Meeting Series</div>
                                                </div>
                                                <div className="flex-1 text-right text-sm">40</div>
                                                <div className="flex-1 text-right text-sm">$85.00</div>
                                                <div className="flex-1 text-right text-sm font-medium">$3,400.00</div>
                                            </div>
                                            <div className="flex p-2 border-b border-zinc-100 items-center">
                                                <div className="w-12 text-center text-sm text-zinc-500">4</div>
                                                <div className="flex-grow-[2]">
                                                    <div className="font-bold text-sm">Reception Lounge Chair</div>
                                                    <div className="text-xs text-zinc-500">SKU-OFF-2025-006 · Velvet / Teal · Lobby Series</div>
                                                </div>
                                                <div className="flex-1 text-right text-sm">12</div>
                                                <div className="flex-1 text-right text-sm">$220.00</div>
                                                <div className="flex-1 text-right text-sm font-medium">$2,640.00</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="w-72">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-500">Subtotal:</span>
                                                    <span className="text-sm font-medium">$24,790.00</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-500">Volume Discount (5%):</span>
                                                    <span className="text-sm font-medium text-green-600">-$1,239.50</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-500">Shipping:</span>
                                                    <span className="text-sm font-medium">$850.00</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-zinc-500">Tax (8.25%):</span>
                                                    <span className="text-sm font-medium">$2,013.04</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 pt-2 border-t-2 border-black">
                                                    <span className="text-lg font-bold">TOTAL:</span>
                                                    <span className="text-xl font-bold">$26,413.54</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-zinc-200 text-xs text-zinc-500 space-y-2">
                                            <p><strong>Terms & Conditions:</strong> Quote valid for 30 days. Prices subject to availability. Lead time: 4-6 weeks from order confirmation.</p>
                                            <p><strong>Delivery:</strong> FOB Destination. Freight prepaid and added. Partial shipments allowed.</p>
                                            <p className="text-zinc-400 mt-4">This quotation is subject to the terms and conditions available at strata.io/terms. Prepared by Jessica Torres, Account Executive.</p>
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
                                            onClick={() => { triggerToast('Preparing Download', 'Generating PDF document...', 'info'); setTimeout(() => triggerToast('Download Complete', 'Quote_QT-1025.pdf downloaded', 'success'), 1500); setIsDocumentModalOpen(false); }}
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
            <SendItemSlideOver open={isSendOpen} onClose={() => setIsSendOpen(false)} transactionType="quote" transactionId="QT-1025" itemName={selectedItem.name} itemId={selectedItem.id} onSend={() => triggerToast('Item Sent', `Details for ${selectedItem.name} sent successfully`, 'success')} />
            <AIDiagnosisSlideOver open={isAiDiagnosisOpen} onClose={() => setIsAiDiagnosisOpen(false)} transactionType="quote" selectedItem={selectedItem} onApply={() => triggerToast('AI Recommendation Applied', `Optimization applied to ${selectedItem.name}`, 'success')} />
            <EditItemSlideOver open={isEditOpen} onClose={() => setIsEditOpen(false)} transactionType="quote" transactionId="QT-1025" selectedItem={selectedItem} onSave={() => triggerToast('Changes Saved', `${selectedItem.name} updated successfully`, 'success')} />
            <AddItemModal isOpen={isAddItemOpen} onClose={() => setIsAddItemOpen(false)} transactionType="quote" transactionId="QT-1025" onAdd={() => triggerToast('Item Added', 'New line item added to Quote QT-1025', 'success')} />
            <ItemDiscountModal
                isOpen={isDiscountModalOpen}
                onClose={() => setIsDiscountModalOpen(false)}
                itemName={selectedItem.name}
                itemId={selectedItem.id}
                unitPrice={selectedItem.stock > 200 ? 1195 : selectedItem.stock > 100 ? 895 : 485}
                quantity={selectedItem.stock > 200 ? 20 : selectedItem.stock > 100 ? 15 : 8}
                onApply={() => triggerToast('Discount Applied', `Discount updated for ${selectedItem.name}`, 'success')}
            />
            <ToastNotification show={showToast} message={toastMessage} onDismiss={dismissToast} />
        </div >
    )
}




function ApprovalChainStep({
    approvalSteps,
    setApprovalSteps,
    onAllApproved,
}: {
    approvalSteps: Array<'pending' | 'approved'>
    setApprovalSteps: Dispatch<SetStateAction<Array<'pending' | 'approved'>>>
    onAllApproved: () => void
}) {
    const [financeApproved, setFinanceApproved] = useState(false)
    const [dealerStarted, setDealerStarted] = useState(false)

    // Step 0: AI auto-approves after 1.5s on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setApprovalSteps(prev => { const s = [...prev]; s[0] = 'approved'; return s })
        }, 1500)
        return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Step 2: Dealer auto-approves after Finance approves
    const handleFinanceApprove = () => {
        setFinanceApproved(true)
        setApprovalSteps(prev => { const s = [...prev]; s[1] = 'approved'; return s })
        setDealerStarted(true)
        setTimeout(() => {
            setApprovalSteps(prev => { const s = [...prev]; s[2] = 'approved'; return s })
            setTimeout(onAllApproved, 400)
        }, 1000)
    }

    const aiApproved = approvalSteps[0] === 'approved'
    const financeApprovedState = approvalSteps[1] === 'approved'
    const dealerApproved = approvalSteps[2] === 'approved'

    return (
        <div className="space-y-3 mt-2 mb-5">
            <p className="text-xs text-muted-foreground mb-3">Approval required before conversion can proceed.</p>

            {/* Step 1: AI */}
            {aiApproved ? (
                <div className="p-3 rounded-xl border border-green-200 dark:border-green-500/20 bg-green-50/50 dark:bg-green-500/5 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">AI Compliance Agent</p><p className="text-[10px] text-muted-foreground">Policy &amp; limits verified</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 font-bold">Approved</span>
                </div>
            ) : (
                <div className="p-3 rounded-xl border border-border bg-muted/20 opacity-60 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><RefreshCw className="h-4 w-4 text-muted-foreground animate-spin" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">AI Compliance Agent</p><p className="text-[10px] text-muted-foreground">Checking policy &amp; limits…</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Processing</span>
                </div>
            )}

            {/* Step 2: Finance Manager */}
            {financeApprovedState ? (
                <div className="p-3 rounded-xl border border-green-200 dark:border-green-500/20 bg-green-50/50 dark:bg-green-500/5 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">Finance Manager</p><p className="text-[10px] text-muted-foreground">Budget authorized</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 font-bold">Approved</span>
                </div>
            ) : aiApproved ? (
                <div className="p-3 rounded-xl border border-primary/40 bg-primary/5 ring-2 ring-primary/20 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-xs font-bold">2</span></div>
                    <div className="flex-1"><p className="text-xs font-bold">Finance Manager</p><p className="text-[10px] text-muted-foreground">Budget authorization required</p></div>
                    <button onClick={handleFinanceApprove} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">Approve</button>
                </div>
            ) : (
                <div className="p-3 rounded-xl border border-border bg-muted/20 opacity-60 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><Clock className="h-4 w-4 text-muted-foreground" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">Finance Manager</p><p className="text-[10px] text-muted-foreground">Budget authorization required</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Waiting</span>
                </div>
            )}

            {/* Step 3: Dealer Principal */}
            {dealerApproved ? (
                <div className="p-3 rounded-xl border border-green-200 dark:border-green-500/20 bg-green-50/50 dark:bg-green-500/5 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">Dealer Principal</p><p className="text-[10px] text-muted-foreground">Final sign-off granted</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 font-bold">Approved</span>
                </div>
            ) : dealerStarted ? (
                <div className="p-3 rounded-xl border border-border bg-muted/20 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><RefreshCw className="h-4 w-4 text-muted-foreground animate-spin" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">Dealer Principal</p><p className="text-[10px] text-muted-foreground">Auto-approving…</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Processing</span>
                </div>
            ) : (
                <div className="p-3 rounded-xl border border-border bg-muted/20 opacity-60 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><Clock className="h-4 w-4 text-muted-foreground" /></div>
                    <div className="flex-1"><p className="text-xs font-bold">Dealer Principal</p><p className="text-[10px] text-muted-foreground">Final sign-off</p></div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Waiting</span>
                </div>
            )}
        </div>
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

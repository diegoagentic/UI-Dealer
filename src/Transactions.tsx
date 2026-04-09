import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, Transition, TransitionChild, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment } from 'react'
import { AlertCircle, AlertTriangle, ArrowRight, BadgeCheck, BarChart3, Bell, Box, Calendar, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ClipboardCheck, ClipboardList, Clock, CloudUpload, Copy, DollarSign, Eye, FilePlus, FileText, Filter, LayoutGrid, List, LogOut, Mail, MapPin, MoreHorizontal, Pencil, Plus, Search, ShoppingBag, ShoppingCart, Sparkles, SquarePen, Trash2, TrendingUp, Truck, User, Wrench } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

import { useTheme } from 'strata-design-system'
import { useTenant } from './TenantContext'
import Select from './components/Select'
import CreateOrderModal from './components/CreateOrderModal'
import SmartQuoteHub from './components/widgets/SmartQuoteHub'
import BatchAckModal from './components/BatchAckModal'
import Breadcrumbs from './components/Breadcrumbs'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

const inventoryData = [
    { name: 'Seating', value: 78, amt: 480 },
    { name: 'Tables', value: 62, amt: 300 },
    { name: 'Storage', value: 45, amt: 340 },
]

const salesData = [
    { name: 'Jan', sales: 4000, costs: 2400 },
    { name: 'Feb', sales: 3000, costs: 1398 },
    { name: 'Mar', sales: 2000, costs: 9800 },
    { name: 'Apr', sales: 2780, costs: 3908 },
    { name: 'May', sales: 1890, costs: 4800 },
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", client: "AutoManfacture Co.", project: "Office Renovation", amount: "$385,000", status: "Order Received", date: "Dec 20, 2025", initials: "AC", statusColor: "bg-zinc-100 text-zinc-700", location: "New York" },
    { id: "#ORD-2054", customer: "TechDealer Solutions", client: "TechDealer Solutions", project: "HQ Upgrade", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", initials: "TS", statusColor: "bg-brand-50 text-brand-700 ring-brand-600/20", location: "London" },
    { id: "#ORD-2053", customer: "Urban Living Inc.", client: "Urban Living Inc.", project: "Lobby Refresh", amount: "$112,000", status: "Ready to Ship", date: "Oct 30, 2025", initials: "UL", statusColor: "bg-green-50 text-green-700 ring-green-600/20", location: "Austin" },
    { id: "#ORD-2052", customer: "Global Logistics", client: "Global Logistics", project: "Warehouse Expansion", amount: "$45,000", status: "Delivered", date: "Oct 15, 2025", initials: "GL", statusColor: "bg-zinc-100 text-zinc-700", location: "Berlin" },
    { id: "#ORD-2051", customer: "City Builders", client: "City Builders", project: "City Center", amount: "$120,000", status: "Order Received", date: "Jan 05, 2026", initials: "CB", statusColor: "bg-zinc-100 text-zinc-700", location: "New York" },
    { id: "#ORD-2050", customer: "Modern Homes", client: "Modern Homes", project: "Residential A", amount: "$85,000", status: "Acknowledgement", date: "Jan 02, 2026", initials: "MH", statusColor: "bg-blue-50 text-blue-700", location: "Austin" },
    { id: "#ORD-2049", customer: "Coastal Props", client: "Coastal Props", project: "Beach House", amount: "$210,000", status: "In Production", date: "Dec 10, 2025", initials: "CP", statusColor: "bg-ai-light text-ai", location: "London" },
    { id: "#ORD-2048", customer: "Valley Homes", client: "Valley Homes", project: "Mountain Retreat", amount: "$95,000", status: "Ready to Ship", date: "Nov 20, 2025", initials: "VH", statusColor: "bg-ai-light text-ai", location: "Berlin" },
    { id: "#ORD-2047", customer: "Elite Builders", client: "Elite Builders", project: "Sky V", amount: "$450,000", status: "In Transit", date: "Nov 05, 2025", initials: "EB", statusColor: "bg-amber-50 text-amber-700", location: "New York" },
]

const recentQuotes = [
    // Ingesting
    { id: "#IMP-0042", customer: "Urban Living Inc.", project: "Lobby Refresh", amount: "—", status: "Ingesting", date: "09 Apr", initials: "UL", statusColor: "bg-amber-50 text-amber-700", location: "New York", tags: ["AI assisted"], actionLabel: "AI extracting…" },
    { id: "#IMP-0041", customer: "Coastal Props", project: "Office Fit-out", amount: "$210,000", status: "Ingesting", date: "09 Apr", initials: "CP", statusColor: "bg-amber-50 text-amber-700", location: "Miami", tags: ["AI assisted"], actionLabel: "3 fields — review pending" },
    // Draft
    { id: "#QUO-3021", customer: "TechDealer Solutions", project: "HQ Upgrade", amount: "$62,500", status: "Draft", date: "09 Apr", initials: "TS", statusColor: "bg-zinc-100 text-zinc-700", location: "San Jose", tags: ["In edit"] },
    { id: "#QUO-3023", customer: "AutoManfacture Co.", project: "Office Renovation", amount: "$385,000", status: "Draft", date: "09 Apr", initials: "AC", statusColor: "bg-zinc-100 text-zinc-700", location: "Detroit", tags: ["Action required"], actionLabel: "Duplicated" },
    { id: "#QUO-3018", customer: "City Builders", project: "City Center", amount: "$120,000", status: "Draft", date: "05 Apr", initials: "CB", statusColor: "bg-zinc-100 text-zinc-700", location: "Chicago", tags: ["Post-validation edit"], actionLabel: "STALE — re-validate" },
    // Validation
    { id: "#QUO-3015", customer: "Harbor Group", project: "Marina Office", amount: "$87,000", status: "Validation", date: "03 Apr", initials: "HG", statusColor: "bg-blue-50 text-blue-700", location: "Seattle", tags: ["Action required"], actionLabel: "2 warnings — ack pending" },
    { id: "#QUO-3016", customer: "Metro Supply", project: "Warehouse HQ", amount: "$44,500", status: "Validation", date: "06 Apr", initials: "MS", statusColor: "bg-blue-50 text-blue-700", location: "Dallas", tags: ["Ready to advance"], actionLabel: "READY_TO_SEND" },
    // Approval
    { id: "#QUO-3017", customer: "Elite Builders", project: "Sky Tower", amount: "$112,000", status: "Approval", date: "04 Apr", initials: "EB", statusColor: "bg-amber-50 text-amber-700", location: "New York", tags: ["Action required"], actionLabel: "-8% pending approval" },
    // Send
    { id: "#QUO-3014", customer: "Pacific Dealers", project: "West Coast", amount: "$73,000", status: "Send", date: "08 Apr", initials: "PD", statusColor: "bg-green-50 text-green-700", location: "Portland", tags: [], actionLabel: "Sending…" },
    { id: "#QUO-3010", customer: "Green Tech", project: "Eco Campus", amount: "$156,000", status: "Send", date: "02 Apr", initials: "GT", statusColor: "bg-green-50 text-green-700", location: "Denver", tags: ["Ready to advance"], actionLabel: "Delivered · opened" },
    { id: "#QUO-3011", customer: "North Star Grp.", project: "Regional Office", amount: "$31,200", status: "Send", date: "03 Apr", initials: "NS", statusColor: "bg-green-50 text-green-700", location: "Minneapolis", tags: [], actionLabel: "Delivered" },
]

const recentAcknowledgments = [
    { id: "ACK-8839", relatedPo: "PO-2026-001", vendor: "Herman Miller", status: "Confirmed", date: "Jan 14, 2026", expShipDate: "Feb 20, 2026", discrepancy: "None", initials: "HM", statusColor: "bg-green-50 text-green-700", location: "Zeeland" },
    { id: "ACK-8840", relatedPo: "PO-2026-002", vendor: "Steelcase", status: "Discrepancy", date: "Jan 13, 2026", expShipDate: "Pending", discrepancy: "Price Mismatch ($500)", initials: "SC", statusColor: "bg-red-50 text-red-700", location: "Grand Rapids" },
    { id: "ACK-8841", relatedPo: "PO-2026-003", vendor: "Knoll", status: "Partial", date: "Jan 12, 2026", expShipDate: "Mar 01, 2026", discrepancy: "Backordered Items", initials: "KN", statusColor: "bg-amber-50 text-amber-700", location: "East Greenville" },
]

// Pipeline stages
const pipelineStages = ['Order Received', 'In Production', 'Ready to Ship', 'In Transit', 'Delivered']
const quoteStages = ['Ingesting', 'Draft', 'Validation', 'Approval', 'Send']

const quoteStagesMeta: Record<string, { dot: string; subtitle: string }> = {
    'Ingesting': { dot: 'bg-amber-500', subtitle: 'Import async · AI extracts · Dealer confirms' },
    'Draft': { dot: 'bg-green-500', subtitle: 'New · Duplicate · Full authoring' },
    'Validation': { dot: 'bg-blue-500', subtitle: 'Rules engine · inputs_snapshot · Ack' },
    'Approval': { dot: 'bg-amber-500', subtitle: 'Discount exceeds policy · Manager reviews' },
    'Send': { dot: 'bg-green-500', subtitle: 'Immutable PDF · SendGrid · Delivery tracking' },
}
const ackStages = ['Pending', 'Discrepancy', 'Partial', 'Confirmed']


// Color Mapping for Status Icons
const colorStyles: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-400/30',
    purple: 'bg-ai-light text-ai dark:bg-ai/15 dark:text-ai ring-1 ring-inset ring-indigo-600/20 dark:ring-indigo-400/30',
    orange: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 ring-1 ring-inset ring-amber-600/20 dark:ring-amber-400/30',
    green: 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-400/30',
    pink: 'bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300 ring-1 ring-inset ring-pink-600/20 dark:ring-pink-400/30',
    indigo: 'bg-ai-light text-ai dark:bg-ai/15 dark:text-ai ring-1 ring-inset ring-indigo-600/20 dark:ring-indigo-400/30',
}

const solidColorStyles: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 border-blue-500',
    purple: 'bg-ai hover:bg-ai text-white shadow-sm shadow-purple-500/20 border-ai/50',
    orange: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-orange-500/20 border-amber-500',
    green: 'bg-green-600 hover:bg-green-700 text-white shadow-sm shadow-green-500/20 border-green-500',
    pink: 'bg-pink-600 hover:bg-pink-700 text-white shadow-sm shadow-pink-500/20 border-pink-500',
    indigo: 'bg-ai hover:bg-ai text-white shadow-sm shadow-ai/20 border-ai/50',
}

// Summary Data matching Wireframe
const ordersSummary = [
    { label: 'Active Orders', value: '89', icon: <Box className="w-5 h-5" />, trend: { value: '3.2%', positive: true } },
    { label: 'Pending Approval', value: '12', icon: <Clock className="w-5 h-5" /> },
    { label: 'In Production', value: '34', icon: <Wrench className="w-5 h-5" />, trend: { value: '5%', positive: true } },
    { label: 'Ready to Ship', value: '23', icon: <Truck className="w-5 h-5" /> },
    { label: 'Total Value', value: '$3.8M', icon: <DollarSign className="w-5 h-5" />, trend: { value: '8%', positive: true } },
]

const quotesSummary = [
    { label: 'Active Quotes', value: '47', icon: <FileText className="w-5 h-5" />, trend: { value: '12%', positive: true } },
    { label: 'Total Quote Value', value: '$2.4M', icon: <DollarSign className="w-5 h-5" />, trend: { value: '8%', positive: true } },
    { label: 'Expiring Soon', value: '12', icon: <Clock className="w-5 h-5" /> },
    { label: 'Win Rate', value: '68%', icon: <TrendingUp className="w-5 h-5" />, trend: { value: '5%', positive: false } },
]

const acksSummary = [
    { label: 'Pending Acks', value: '8', icon: <Clock className="w-5 h-5" />, trend: { value: '2%', positive: false } },
    { label: 'Discrepancies', value: '3', icon: <AlertTriangle className="w-5 h-5" /> },
    { label: 'Confirmed', value: '156', icon: <ClipboardCheck className="w-5 h-5" />, trend: { value: '4%', positive: true } },
    { label: 'Avg Lead Time', value: '4.2w', icon: <Calendar className="w-5 h-5" /> },
    { label: 'On Time Rate', value: '94%', icon: <TrendingUp className="w-5 h-5" />, trend: { value: '2%', positive: true } },
]

import AcknowledgementUploadModal from './components/AcknowledgementUploadModal'
import CreateQuoteModal from './components/CreateQuoteModal'
import { MetricGrid } from './components/MetricCard'
import { QuickActions } from './components/QuickActions'

interface TransactionsProps {
    onLogout: () => void;
    onNavigateToDetail: (type: string) => void;
    onNavigateToWorkspace: () => void;
    onNavigate: (page: string) => void;
}

export default function Transactions({ onLogout, onNavigateToDetail, onNavigateToWorkspace, onNavigate }: TransactionsProps) {
    const [viewMode, setViewMode] = useState<'list' | 'pipeline'>('pipeline');
    const [showMetrics, setShowMetrics] = useState(false);
    const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
    const [isAckModalOpen, setIsAckModalOpen] = useState(false);
    const [isBatchAckOpen, setIsBatchAckOpen] = useState(false);
    const [isQuoteWidgetOpen, setIsQuoteWidgetOpen] = useState(false);

    // Toast State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ title: '', description: '', type: 'success' }); // success | error | info
    const toastTimerRef = useRef<any>(null);

    const triggerToast = (title: string, description: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToastMessage({ title, description, type });
        setShowToast(true);

        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setShowToast(false), 3000);
    };

    const handleExportSIF = (type: string) => {
        triggerToast(`Exporting ${type} SIF...`, 'Generating SIF file. Please wait.', 'info');

        setTimeout(() => {
            triggerToast(`${type} SIF Exported`, 'The SIF file has been successfully generated and downloaded.', 'success');
            // Simulate download
            // const element = document.createElement("a");
            // const file = new Blob(["Simulated SIF Content"], {type: 'text/plain'});
            // element.href = URL.createObjectURL(file);
            // element.download = `${type}_Export_${new Date().toISOString().split('T')[0]}.sif`;
            // document.body.appendChild(element); // Required for this to work in FireFox
            // element.click(); 
        }, 1500);
    };
    const { theme, toggleTheme } = useTheme()
    const { currentTenant } = useTenant()

    // Refs for scrolling
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const expandedScrollRef = useRef<HTMLDivElement>(null)

    const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
        if (ref.current) {
            const scrollAmount = 320;
            ref.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('All Statuses')
    const [selectedLocation, setSelectedLocation] = useState('All Locations')

    const [activeTab, setActiveTab] = useState<'metrics' | 'active' | 'completed' | 'all'>('active')
    const [lifecycleTab, setLifecycleTab] = useState<'quotes' | 'orders' | 'acknowledgments'>('orders')
    const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

    useEffect(() => {
        const handleHighlight = (e: CustomEvent) => {
            if (e.detail === 'transactions-orders') {
                setLifecycleTab('orders');
                setActiveTab('active');
                setHighlightedSection('orders');
                setTimeout(() => setHighlightedSection(null), 4000);
            }
        };
        window.addEventListener('demo-highlight', handleHighlight as EventListener);
        return () => window.removeEventListener('demo-highlight', handleHighlight as EventListener);
    }, []);

    const currentDataSet = useMemo(() => {
        if (lifecycleTab === 'quotes') return recentQuotes;
        if (lifecycleTab === 'acknowledgments') return recentAcknowledgments;

        let orders = [...recentOrders];
        const isDemoComplete = localStorage.getItem('demo_flow_complete') === 'true';
        if (isDemoComplete) {
            orders.unshift({
                id: "#ORD-7829",
                customer: "Acme Corp",
                client: "Acme Corp",
                project: "HQ Refresh",
                amount: "$124,500",
                status: "Order Placed",
                date: "Just Now",
                initials: "AC",
                statusColor: "bg-green-50 text-green-700 ring-green-600/20",
                location: "New York"
            });
        }
        return orders;
    }, [lifecycleTab]);

    const statuses = useMemo(() => ['All Statuses', ...Array.from(new Set(currentDataSet.map(o => o.status)))], [currentDataSet]);
    const locations = useMemo(() => ['All Locations', ...Array.from(new Set(currentDataSet.map(o => o.location || ''))).filter(Boolean)], [currentDataSet]);
    const availableProjects = useMemo(() => ['All Projects', ...Array.from(new Set(currentDataSet.map(o => (o as any).project || ''))).filter(Boolean)], [currentDataSet]);

    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [trackingOrder, setTrackingOrder] = useState<any>(null)

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedIds(newExpanded)
    }

    // Dynamic URL Param Handling
    useEffect(() => {
        const handleUrlParams = () => {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get('tab');
            const id = params.get('id');

            if (tab === 'quotes') setLifecycleTab('quotes');
            if (tab === 'orders') setLifecycleTab('orders');
            if (tab === 'acknowledgments') setLifecycleTab('acknowledgments');

            if (id) {
                setSearchQuery(id);
                setExpandedIds(prev => {
                    const newSet = new Set(prev);
                    newSet.add(id);
                    return newSet;
                });
            }
        };

        handleUrlParams(); // Run on mount

        // Listen for internal navigation events
        window.addEventListener('popstate', handleUrlParams);
        return () => window.removeEventListener('popstate', handleUrlParams);
    }, []);

    // Dynamic Metrics Data based on current filters (Status/Location)
    const metricsData = useMemo(() => {
        const dataToAnalyze = currentDataSet.filter(order => {
            const matchesStatus = selectedStatus === 'All Statuses' || order.status === selectedStatus
            const matchesLocation = selectedLocation === 'All Locations' || (order.location || 'Unknown') === selectedLocation
            return matchesStatus && matchesLocation
        })

        const totalValue = dataToAnalyze.reduce((sum, order) => {
            const amount = (order as any).amount || '0'
            return sum + parseInt(amount.replace(/[^0-9]/g, ''))
        }, 0)

        const activeCount = dataToAnalyze.filter(o => {
            if (lifecycleTab === 'quotes') return !['Send'].includes((o as any).status);
            if (lifecycleTab === 'acknowledgments') return !['Confirmed'].includes((o as any).status);
            return !['Delivered', 'Completed'].includes(o.status);
        }).length

        const completedCount = dataToAnalyze.filter(o => {
            if (lifecycleTab === 'quotes') return ['Send'].includes((o as any).status);
            if (lifecycleTab === 'acknowledgments') return ['Confirmed'].includes((o as any).status);
            return ['Delivered', 'Completed'].includes(o.status);
        }).length

        return {
            revenue: totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
            activeOrders: activeCount,
            completedOrders: completedCount,
            efficiency: dataToAnalyze.length > 0 ? Math.round((completedCount / dataToAnalyze.length) * 100) : 0
        }
    }, [selectedStatus, selectedLocation, currentDataSet, lifecycleTab])

    const filteredData = useMemo(() => {
        let currentData = [];
        if (lifecycleTab === 'quotes') currentData = recentQuotes;
        else if (lifecycleTab === 'acknowledgments') currentData = recentAcknowledgments;
        else currentData = recentOrders;

        return currentData.filter(item => {
            const searchString = JSON.stringify(item).toLowerCase();
            const matchesSearch = searchString.includes(searchQuery.toLowerCase());

            // Specific field checks if needed, but JSON dump is easier for generic search
            // const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //     (item.customer || item.vendor || '').toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = selectedStatus === 'All Statuses' || item.status === selectedStatus
            const matchesLocation = selectedLocation === 'All Locations' || (item.location || 'Unknown') === selectedLocation

            let matchesTab = true;
            if (activeTab === 'active') {
                matchesTab = !['Delivered', 'Completed', 'Closed', 'Combined', 'Confirmed'].includes(item.status)
            } else if (activeTab === 'completed') {
                matchesTab = ['Delivered', 'Completed', 'Closed', 'Combined', 'Confirmed'].includes(item.status)
            } else if (activeTab === 'metrics') {
                matchesTab = true // Metrics view handles its own data
            }

            return matchesSearch && matchesStatus && matchesLocation && matchesTab
        })
    }, [searchQuery, selectedStatus, selectedLocation, activeTab, lifecycleTab])

    const counts = useMemo(() => {
        return {
            active: currentDataSet.filter(item => !['Delivered', 'Completed', 'Closed', 'Combined', 'Confirmed'].includes(item.status)).length,
            completed: currentDataSet.filter(item => ['Delivered', 'Completed', 'Closed', 'Combined', 'Confirmed'].includes(item.status)).length,
            all: currentDataSet.length
        }
    }, [currentDataSet])

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-10">

            {/* Main Content Content - Padded top to account for floating nav */}
            <div className="pt-24 px-4 max-w-7xl mx-auto space-y-6">

                {/* Breadcrumbs */}
                <div className="mb-4">
                    <Breadcrumbs
                        items={[
                            { label: 'Dashboard', onClick: () => onNavigate('dashboard') },
                            { label: 'Transactions' }
                        ]}
                    />
                </div>

                {/* Lifecycle Tabs Navigation */}
                <div className="flex items-center mb-6">
                    <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-card/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <button
                            onClick={() => setLifecycleTab('quotes')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                                lifecycleTab === 'quotes'
                                    ? "bg-brand-300 dark:bg-brand-500 text-zinc-900 shadow-sm"

                                    : "text-muted-foreground hover:bg-white/50 dark:hover:bg-zinc-700/50 hover:text-foreground"
                            )}
                        >
                            <FileText className="w-4 h-4" />
                            Quotes
                        </button>
                        <button
                            onClick={() => setLifecycleTab('orders')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                                lifecycleTab === 'orders'
                                    ? "bg-brand-300 dark:bg-brand-500 text-zinc-900 shadow-sm"

                                    : "text-muted-foreground hover:bg-brand-300 dark:hover:bg-brand-600/50 hover:text-zinc-900 dark:hover:text-white"
                            )}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Orders
                        </button>
                        <button
                            onClick={() => setLifecycleTab('acknowledgments')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                                lifecycleTab === 'acknowledgments'
                                    ? "bg-brand-300 dark:bg-brand-500 text-zinc-900 shadow-sm"

                                    : "text-muted-foreground hover:bg-brand-300 dark:hover:bg-brand-600/50 hover:text-zinc-900 dark:hover:text-white"
                            )}
                        >
                            <ClipboardCheck className="w-4 h-4" />
                            Acknowledgments
                        </button>
                    </div>
                </div>

                {/* Quotes Tab Content */}
                {lifecycleTab === 'quotes' && (
                    <>
                        {/* KPI Cards for Quotes */}
                        {showMetrics ? (
                            <>
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => setShowMetrics(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Hide Details <ChevronUp className="w-4 h-4" />
                                    </button>
                                </div>
                                <MetricGrid metrics={quotesSummary} />
                                <div className="mt-6">
                                    <QuickActions actions={[
                                        { icon: <Plus className="w-5 h-5" />, label: "New Quote", action: () => setIsQuoteWidgetOpen(true) },
                                        { icon: <Copy className="w-5 h-5" />, label: "Duplicate" },
                                        { icon: <FileText className="w-5 h-5" />, label: "Export PDF" },
                                        { icon: <Mail className="w-5 h-5" />, label: "Send Email" },
                                        { icon: <Sparkles className="w-5 h-5" />, label: "Templates" },
                                    ]} />
                                </div>
                            </>
                        ) : (
                            /* Collapsed Quotes Metrics */
                            <>
                                <div className="bg-card dark:bg-zinc-800 rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between gap-4">
                                    <MetricGrid metrics={quotesSummary} compact />
                                    <div className="w-px h-12 bg-border shrink-0" />
                                    <QuickActions compact actions={[
                                        { icon: <Plus className="w-5 h-5" />, label: "New Quote", action: () => setIsQuoteWidgetOpen(true) },
                                        { icon: <Copy className="w-5 h-5" />, label: "Duplicate" },
                                        { icon: <FileText className="w-5 h-5" />, label: "Export PDF" },
                                        { icon: <Mail className="w-5 h-5" />, label: "Send Email" },
                                    ]} />
                                </div>
                            </>
                        )}
                        <div className="mt-6"></div> {/* Spacer */}
                    </>
                )}

                {/* Acknowledgments Tab Content */}
                {lifecycleTab === 'acknowledgments' && (
                    <>
                        {/* KPI Cards for Acks */}
                        {showMetrics ? (
                            <>
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => setShowMetrics(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Hide Details <ChevronUp className="w-4 h-4" />
                                    </button>
                                </div>
                                <MetricGrid metrics={acksSummary} />
                                <div className="mt-6">
                                    <QuickActions actions={[
                                        { icon: <CloudUpload className="w-5 h-5" />, label: "Upload Ack", action: () => setIsAckModalOpen(true) },
                                        { icon: <FileText className="w-5 h-5" />, label: "Export PDF" },
                                        { icon: <Mail className="w-5 h-5" />, label: "Email Vendor" },
                                        { icon: <BadgeCheck className="w-5 h-5" />, label: "Approve Orders", action: () => setIsBatchAckOpen(true) },
                                    ]} />
                                </div>
                            </>
                        ) : (
                            /* Collapsed Acks Metrics */
                            <>
                                <div className="bg-card dark:bg-zinc-800 rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between gap-4">
                                    <MetricGrid metrics={acksSummary} compact />
                                    <div className="w-px h-12 bg-border shrink-0" />
                                    <QuickActions compact actions={[
                                        { icon: <CloudUpload className="w-5 h-5" />, label: "Upload Ack", action: () => setIsAckModalOpen(true) },
                                        { icon: <FileText className="w-5 h-5" />, label: "Export PDF" },
                                        { icon: <Mail className="w-5 h-5" />, label: "Email Vendor" },
                                        { icon: <BadgeCheck className="w-5 h-5" />, label: "Approve Orders", action: () => setIsBatchAckOpen(true) },
                                    ]} />
                                </div>
                            </>
                        )}
                        <div className="mt-6"></div> {/* Spacer */}
                    </>
                )}

                {/* Orders Content (Existing) */}
                {lifecycleTab === 'orders' && (
                    <>
                        {/* KPI Cards / Summary Panel */}
                        {showMetrics ? (
                            <>
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => setShowMetrics(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Hide Details <ChevronUp className="w-4 h-4" />
                                    </button>
                                </div>
                                <MetricGrid metrics={ordersSummary} />
                                <div className="mt-6">
                                    <QuickActions actions={[
                                        { icon: <Plus className="w-5 h-5" />, label: "New Order", action: () => setIsCreateOrderOpen(true) },
                                        { icon: <Copy className="w-5 h-5" />, label: "Duplicate" },
                                        { icon: <FileText className="w-5 h-5" />, label: "Export PDF" },
                                        { icon: <Mail className="w-5 h-5" />, label: "Send Email" },
                                    ]} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-card dark:bg-zinc-800 rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between gap-4">
                                <MetricGrid metrics={ordersSummary} compact />
                                <div className="w-px h-12 bg-border shrink-0" />
                                <QuickActions compact actions={[
                                    { icon: <Plus className="w-5 h-5" />, label: "New Order", action: () => setIsCreateOrderOpen(true) },
                                    { icon: <Copy className="w-5 h-5" />, label: "Duplicate" },
                                    { icon: <FileText className="w-5 h-5" />, label: "Export PDF" },
                                    { icon: <Mail className="w-5 h-5" />, label: "Send Email" },
                                ]} />
                            </div>
                        )}



                    </>
                )}

                {/* Recent Orders - The Grid/List view handled here */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3">
                        <div className={cn(
                            "bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-700",
                            highlightedSection === 'orders' && "ring-4 ring-brand-500 shadow-[0_0_30px_rgba(var(--brand-500),0.6)] animate-pulse"
                        )}>
                            {/* Header for Orders */}
                            <div className="p-6 border-b border-border">
                                <div className="flex flex-col gap-6">
                                    {/* Top Row: Title + Tabs */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <h3 className="text-lg font-brand font-semibold text-foreground flex items-center gap-2 whitespace-nowrap">
                                            {lifecycleTab === 'quotes' ? 'Recent Quotes' : lifecycleTab === 'acknowledgments' ? 'Recent Acknowledgments' : 'Recent Orders'}
                                        </h3>
                                        <div className="hidden sm:block w-px h-6 bg-border mx-2"></div>
                                        {/* Tabs */}
                                        <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit overflow-x-auto max-w-full">
                                            {[
                                                { id: 'active', label: 'Active', count: counts.active },
                                                { id: 'completed', label: 'Completed', count: counts.completed },
                                                { id: 'all', label: 'All', count: counts.all },
                                                { id: 'metrics', label: 'Metrics', count: null }
                                            ].map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id as any)}
                                                    className={cn(
                                                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 outline-none whitespace-nowrap",
                                                        activeTab === tab.id
                                                            ? "bg-primary text-primary-foreground shadow-sm"
                                                            : "text-muted-foreground hover:bg-brand-300 dark:hover:bg-brand-600/50 hover:text-zinc-900 dark:hover:text-white"
                                                    )}
                                                >
                                                    {tab.id === 'metrics' && <BarChart3 className="w-4 h-4" />}
                                                    {tab.label}
                                                    {tab.count !== null && (
                                                        <span className={cn(
                                                            "text-xs px-1.5 py-0.5 rounded-full transition-colors",
                                                            activeTab === tab.id
                                                                ? "bg-primary-foreground/10 text-primary-foreground"
                                                                : "bg-background text-muted-foreground group-hover:bg-muted"
                                                        )}>
                                                            {tab.count}
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Row: Filters + Actions */}
                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full">
                                        {/* Filters Container */}
                                        <div className="flex flex-col sm:flex-row items-center gap-2 w-full xl:w-auto">
                                            <div className="relative group w-full sm:w-auto">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    placeholder={lifecycleTab === 'quotes' ? "Search quotes..." : lifecycleTab === 'acknowledgments' ? "Search acknowledgments..." : "Search orders..."}
                                                    className="pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground w-full sm:w-48 lg:w-64 focus:ring-2 focus:ring-primary outline-none placeholder:text-muted-foreground transition-all"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>

                                            {/* Status Filter */}
                                            <div className="w-full sm:w-40">
                                                <Select
                                                    value={selectedStatus}
                                                    onChange={setSelectedStatus}
                                                    options={statuses}
                                                />
                                            </div>

                                            {/* Location Filter */}
                                            <div className="w-full sm:w-40">
                                                <Select
                                                    value={selectedLocation}
                                                    onChange={setSelectedLocation}
                                                    options={locations}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions Group: View Mode + Create Button */}
                                        <div className="flex items-center gap-4 self-start xl:self-auto">
                                            {/* View Mode Toggle */}
                                            <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                                                <button
                                                    onClick={() => setViewMode('list')}
                                                    className={cn(
                                                        "p-1.5 rounded-md transition-all",
                                                        viewMode === 'list' ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                    )}
                                                    title="List View"
                                                >
                                                    <List className="w-5 h-5" />
                                                </button>
                                                <div className="w-px h-4 bg-border mx-1"></div>
                                                <button
                                                    onClick={() => setViewMode('pipeline')}
                                                    className={cn(
                                                        "p-1.5 rounded-md transition-all",
                                                        viewMode === 'pipeline' ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                    )}
                                                    title="Pipeline View"
                                                >
                                                    <Filter className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="w-px h-8 bg-border hidden xl:block mx-1"></div>

                                            <button
                                                onClick={() => {
                                                    if (lifecycleTab === 'quotes') {
                                                        setIsQuoteWidgetOpen(true);
                                                    } else if (lifecycleTab === 'acknowledgments') {
                                                        setIsAckModalOpen(true);
                                                        /* @ts-ignore */
                                                        if (onNavigate) onNavigate('order-detail');
                                                    } else {
                                                        setIsCreateOrderOpen(true);
                                                    }
                                                }}
                                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>
                                                    {lifecycleTab === 'quotes' ? 'Create Quote' : lifecycleTab === 'acknowledgments' ? 'Upload Ack' : 'Create Order'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CreateOrderModal isOpen={isCreateOrderOpen} onClose={() => setIsCreateOrderOpen(false)} />

                            {/* Smart Quote Hub Modal */}
                            <Transition appear show={isQuoteWidgetOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-50" onClose={() => setIsQuoteWidgetOpen(false)}>
                                    <TransitionChild
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black/25 dark:bg-black/80 backdrop-blur-sm" />
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
                                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-card shadow-xl transition-all">
                                                    <div className="relative">
                                                        {/* Close X Button - Floating */}
                                                        <button
                                                            onClick={() => setIsQuoteWidgetOpen(false)}
                                                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-Card backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                        <SmartQuoteHub onNavigate={(page: string) => { setIsQuoteWidgetOpen(false); onNavigate(page); }} />
                                                    </div>
                                                </DialogPanel>
                                            </TransitionChild>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>

                            {/* Main Content Area */}
                            <div className="p-6 bg-zinc-50/50 dark:bg-black/20 min-h-[500px]">
                                {/* Metrics View special handling */}
                                {activeTab === 'metrics' ? (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
                                            {/* Revenue Card */}
                                            <div className="bg-gradient-to-br from-green-50 to-success-light dark:from-green-900/10 dark:to-success/10 rounded-2xl p-6 border border-green-200 dark:border-green-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                                        {lifecycleTab === 'quotes' ? 'Quote Value' : lifecycleTab === 'acknowledgments' ? 'Pending Value' : 'Total Revenue'}
                                                    </p>
                                                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{metricsData.revenue}</p>
                                                    <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">Based on visible {lifecycleTab === 'quotes' ? 'quotes' : 'orders'}</p>
                                                </div>
                                            </div>

                                            {/* Active Orders Card */}
                                            <div className="bg-gradient-to-br from-blue-50 to-ai-light dark:from-blue-900/10 dark:to-ai/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                                                        {lifecycleTab === 'quotes' ? 'Active Quotes' : lifecycleTab === 'acknowledgments' ? 'Pending Acks' : 'Active Orders'}
                                                    </p>
                                                    <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{metricsData.activeOrders}</p>
                                                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                                                        {lifecycleTab === 'quotes' ? 'Sent or Negotiating' : lifecycleTab === 'acknowledgments' ? 'Awaiting Confirmation' : 'In production or pending'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Completion Rate Card */}
                                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border border-ai/20 dark:border-ai/30/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-ai dark:text-ai">
                                                        {lifecycleTab === 'quotes' ? 'Win Rate' : lifecycleTab === 'acknowledgments' ? 'Conf. Rate' : 'Completion Rate'}
                                                    </p>
                                                    <BarChart3 className="h-5 w-5 text-ai" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-ai">{metricsData.efficiency}%</p>
                                                    <p className="text-xs text-ai/80 dark:text-ai/80 mt-1">
                                                        {lifecycleTab === 'quotes' ? 'Quotes approved' : lifecycleTab === 'acknowledgments' ? 'Acks confirmed' : 'Orders delivered successfully'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Project Count Card */}
                                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Project Count</p>
                                                    <ClipboardList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                                                        {availableProjects.length > 0 && availableProjects[0] === 'All Projects' ? availableProjects.length - 1 : availableProjects.length}
                                                    </p>
                                                    <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">Active projects</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-[300px] w-full bg-card rounded-2xl p-6 border border-border shadow-sm">
                                            <h4 className="text-md font-medium text-foreground mb-4">Monthly Trends</h4>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={salesData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Bar dataKey="sales" fill="var(--color-info)" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                ) : viewMode === 'list' ? (
                                    /* List View */
                                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-muted/50 border-b border-border">
                                                    <tr>
                                                        <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">{lifecycleTab === 'acknowledgments' ? 'Vendor' : 'Details'}</th>
                                                        <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">{lifecycleTab === 'acknowledgments' ? 'PO & Location' : 'Project & Location'}</th>
                                                        <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">{lifecycleTab === 'acknowledgments' ? 'Discrepancy' : 'Amount'}</th>
                                                        <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                                        <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">{lifecycleTab === 'quotes' ? 'Valid Until' : 'Date'}</th>
                                                        <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border">
                                                    {filteredData.map((order: any) => (
                                                        <Fragment key={order.id}>
                                                            <tr
                                                                className="group hover:bg-muted/50 transition-colors cursor-pointer"
                                                                onClick={() => toggleExpand(order.id)}
                                                            >
                                                                <td className="p-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-ai to-ai text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                                                            {order.initials}
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-medium text-foreground">{lifecycleTab === 'acknowledgments' ? order.vendor : order.customer}</div>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="text-xs text-muted-foreground">{order.id}</div>
                                                                                {order.id === '#ORD-7829' && (
                                                                                    <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                                                                                        New
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="p-4">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm text-foreground">{lifecycleTab === 'acknowledgments' ? order.relatedPo : order.project}</span>
                                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                            <MapPin className="w-3 h-3" /> {order.location}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="p-4">
                                                                    <span className={cn("font-semibold text-foreground", lifecycleTab === 'acknowledgments' && order.discrepancy !== 'None' ? 'text-red-500' : '')}>
                                                                        {lifecycleTab === 'acknowledgments' ? order.discrepancy : order.amount}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4">
                                                                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", order.statusColor)}>
                                                                        {order.status}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 text-sm text-muted-foreground">
                                                                    {lifecycleTab === 'quotes' ? (order.validUntil || order.date) : order.date}
                                                                </td>
                                                                <td className="p-4 text-right">
                                                                    <div className="flex items-center justify-end gap-1">
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); onNavigateToDetail(lifecycleTab === 'quotes' ? 'quote-detail' : lifecycleTab === 'acknowledgments' ? 'ack-detail' : 'order-detail'); }}
                                                                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                                                        >
                                                                            <FileText className="h-4 w-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }}
                                                                            className="p-1.5 rounded-lg text-muted-foreground hover:text-blue-500 hover:bg-blue-50/50 transition-colors"
                                                                            title="Track Order"
                                                                        >
                                                                            <MapPin className="h-4 w-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); toggleExpand(order.id); }}
                                                                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                                                                        >
                                                                            {expandedIds.has(order.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {expandedIds.has(order.id) && (
                                                                <tr className="bg-muted/30">
                                                                    <td colSpan={6} className="p-4">
                                                                        <div className="grid grid-cols-3 gap-6 text-sm">
                                                                            <div>
                                                                                <p className="font-medium text-muted-foreground mb-1">Contact Details</p>
                                                                                <p className="text-foreground">Sarah Johnson</p>
                                                                                <p className="text-muted-foreground text-xs">sarah.j@example.com</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="font-medium text-muted-foreground mb-1">Items</p>
                                                                                <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                                                                                    <li>Office Chair Ergonomic x12</li>
                                                                                    <li>Standing Desk Motorized x5</li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors">
                                                                                    View Full Order
                                                                                </button>
                                                                                <button className="px-3 py-1.5 border border-border text-foreground text-xs font-medium rounded-lg hover:bg-muted transition-colors">
                                                                                    Download Invoice
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </Fragment>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    /* Pipeline View */
                                    <>
                                    {lifecycleTab === 'quotes' && (
                                        <div className="flex items-center gap-3 px-2 py-2 text-[10px] text-muted-foreground flex-wrap">
                                            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> Expert intervention required</span>
                                            <span className="px-2 py-0.5 rounded-full bg-ai/10 text-ai border border-ai/20 font-semibold">AI assisted</span>
                                            <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 font-semibold">STALE</span>
                                            <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 font-semibold">Action required</span>
                                            <span className="text-muted-foreground/60">Click any card to see the full column definition</span>
                                        </div>
                                    )}
                                    <div className="flex gap-6 overflow-x-auto pb-4 scale-y-[-1] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted/50 hover:[&::-webkit-scrollbar-thumb]:bg-muted dark:[&::-webkit-scrollbar-thumb]:bg-muted/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-muted">
                                        {(lifecycleTab === 'quotes' ? quoteStages : lifecycleTab === 'acknowledgments' ? ackStages : pipelineStages).map((stage) => {
                                            const stageOrders = filteredData.filter((o: any) => o.status === stage);
                                            return (
                                                <div key={stage} className="min-w-[320px] max-w-[320px] flex-shrink-0 flex flex-col h-full scale-y-[-1] pt-4">
                                                    <div className="flex items-center justify-between mb-4 px-2">
                                                        <div>
                                                            <h4 className="font-medium text-foreground flex items-center gap-2">
                                                                {lifecycleTab === 'quotes' && quoteStagesMeta[stage] && (
                                                                    <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${quoteStagesMeta[stage].dot}`} />
                                                                )}
                                                                {stage}
                                                                <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">{stageOrders.length}</span>
                                                            </h4>
                                                            {lifecycleTab === 'quotes' && quoteStagesMeta[stage] && (
                                                                <p className="text-[10px] text-muted-foreground mt-0.5 pl-[18px]">{quoteStagesMeta[stage].subtitle}</p>
                                                            )}
                                                        </div>
                                                        <button className="text-muted-foreground hover:text-foreground">
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    <div className="bg-muted/30 rounded-2xl p-3 h-full min-h-[500px] border border-border/50 space-y-3">
                                                        {stageOrders.map(order => (
                                                            <div
                                                                key={order.id}
                                                                className={`group relative bg-card dark:bg-zinc-800 rounded-2xl border ${expandedIds.has(order.id) ? 'border-brand-400/50 ring-1 ring-brand-400/20 shadow-lg' : 'border-border shadow-sm hover:shadow-md'} transition-all duration-200 overflow-hidden flex flex-col`}
                                                            >
                                                                <div className="p-4">
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-ai to-ai text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-white dark:ring-zinc-900">
                                                                                {order.initials}
                                                                            </div>
                                                                            <div className="space-y-0.5">
                                                                                <h4 className="text-sm font-semibold text-foreground transition-colors">
                                                                                    {lifecycleTab === 'acknowledgments' ? (order as any).vendor : (order as any).customer}
                                                                                </h4>
                                                                                <div className="flex items-center gap-1">
                                                                                    <p className="text-[10px] text-muted-foreground font-mono">{order.id}</p>
                                                                                    {order.id === '#ORD-7829' && (
                                                                                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                                                                                            New
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <div className="flex justify-between items-center text-xs">
                                                                            <span className="text-muted-foreground">
                                                                                {lifecycleTab === 'acknowledgments' ? 'Discrepancy' : 'Amount'}
                                                                            </span>
                                                                            <span className={cn("font-semibold text-foreground", lifecycleTab === 'acknowledgments' && (order as any).discrepancy !== 'None' ? 'text-red-500' : '')}>
                                                                                {lifecycleTab === 'acknowledgments' ? (order as any).discrepancy : (order as any).amount}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center text-xs">
                                                                            <span className="text-muted-foreground">Date</span>
                                                                            <span className="text-foreground">{order.date}</span>
                                                                        </div>

                                                                        {/* Quote tags */}
                                                                        {lifecycleTab === 'quotes' && (order as any).tags?.length > 0 && (
                                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                                {(order as any).tags.map((tag: string) => (
                                                                                    <span key={tag} className={cn("text-[9px] font-semibold px-2 py-0.5 rounded-full border",
                                                                                        tag === 'AI assisted' ? 'bg-ai/10 text-ai border-ai/20' :
                                                                                        tag === 'Action required' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                                                                                        tag === 'Ready to advance' ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                                                                                        tag === 'Post-validation edit' ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20' :
                                                                                        'bg-muted text-muted-foreground border-border'
                                                                                    )}>{tag}</span>
                                                                                ))}
                                                                            </div>
                                                                        )}

                                                                        {/* Use a simple divider */}
                                                                        <div className="h-px bg-border w-full my-2" />

                                                                        {/* Quote action label */}
                                                                        {lifecycleTab === 'quotes' && (order as any).actionLabel && (
                                                                            <div className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-lg border text-center",
                                                                                (order as any).actionLabel.includes('STALE') || (order as any).actionLabel.includes('re-validate') ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' :
                                                                                (order as any).actionLabel.includes('READY') ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                                                                                (order as any).actionLabel.includes('Delivered') ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                                                                                (order as any).actionLabel.includes('Sending') || (order as any).actionLabel.includes('extracting') ? 'bg-ai/10 text-ai border-ai/20' :
                                                                                (order as any).actionLabel.includes('warning') || (order as any).actionLabel.includes('pending') ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                                                                                (order as any).actionLabel.includes('fields') ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                                                                                'bg-muted text-muted-foreground border-border'
                                                                            )}>
                                                                                {(order as any).actionLabel}
                                                                            </div>
                                                                        )}

                                                                        {/* Inline Actions Row */}
                                                                        <div className="flex items-center justify-between">
                                                                            {/* Status Badge */}
                                                                            <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border shadow-sm",
                                                                                colorStyles[order.statusColor?.split('-')[1]?.replace('text', '').trim()] || "bg-muted text-muted-foreground border-border"
                                                                            )}>
                                                                                {order.status}
                                                                            </span>

                                                                            <div className="flex items-center gap-1">
                                                                                <button
                                                                                    onClick={(e) => { e.stopPropagation(); toggleExpand(order.id); }}
                                                                                    className="text-xs font-bold text-zinc-800 bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-md transition-shadow shadow-sm"
                                                                                >
                                                                                    {expandedIds.has(order.id) ? 'Close' : 'Details'}
                                                                                </button>
                                                                                <button
                                                                                    onClick={(e) => { e.stopPropagation(); onNavigateToDetail(lifecycleTab === 'quotes' ? 'quote-detail' : lifecycleTab === 'acknowledgments' ? 'ack-detail' : 'order-detail'); }}
                                                                                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                                                                                    title="View Full Details"
                                                                                >
                                                                                    <ArrowRight className="h-4 w-4" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Internal Accordion Content */}
                                                                {expandedIds.has(order.id) && (
                                                                    <div className="bg-card border-t border-border animate-in slide-in-from-top-2 duration-200">
                                                                        <div className="p-5 space-y-5">
                                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                                                                <div className="space-y-1.5">
                                                                                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{lifecycleTab === 'acknowledgments' ? 'PO Number' : 'Project'}</p>
                                                                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 truncate">{lifecycleTab === 'acknowledgments' ? (order as any).relatedPo : (order as any).project}</p>
                                                                                </div>
                                                                                <div className="space-y-1.5">
                                                                                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Location</p>
                                                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                                                                                        <MapPin className="h-4 w-4 text-zinc-400" />
                                                                                        <span className="truncate">{order.location}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-1.5">
                                                                                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{lifecycleTab === 'quotes' ? 'Valid Until' : lifecycleTab === 'acknowledgments' ? 'Exp. Ship' : 'Date Placed'}</p>
                                                                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 font-mono">{lifecycleTab === 'quotes' ? (order as any).validUntil : lifecycleTab === 'acknowledgments' ? (order as any).expShipDate : order.date}</p>
                                                                                </div>
                                                                                <div className="space-y-1.5">
                                                                                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Items</p>
                                                                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">12 Units</p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="flex flex-col gap-3 pt-2">
                                                                                <button className="w-full py-2.5 text-xs font-bold text-foreground bg-card border border-border rounded-lg hover:bg-accent hover:text-foreground transition-colors shadow-sm">
                                                                                    {lifecycleTab === 'quotes' ? 'View Quote Details' : lifecycleTab === 'acknowledgments' ? 'View PO Details' : 'View Full Order Details'}
                                                                                </button>
                                                                                <button
                                                                                    onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }}
                                                                                    className="w-full py-3 text-sm font-bold text-zinc-950 bg-brand-400 hover:bg-brand-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                                                                                >
                                                                                    <MapPin className="h-4 w-4" />
                                                                                    {lifecycleTab === 'quotes' ? 'Analyze Quote' : lifecycleTab === 'acknowledgments' ? 'Resolve Discrepancy' : 'Track Shipment'}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                        {stageOrders.length === 0 && (
                                                            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground opacity-50 border-2 border-dashed border-border rounded-xl">
                                                                <span className="text-xs">No orders</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>



                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                        <h3 className="text-lg font-brand font-semibold text-foreground mb-4">Revenue Trend</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--popover)', borderRadius: '12px', borderColor: 'var(--border)', color: 'var(--popover-foreground)' }}
                                        itemStyle={{ color: 'var(--popover-foreground)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="var(--chart-trend-line)"
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2, fill: 'var(--chart-trend-dot-fill)', stroke: 'var(--chart-trend-dot-stroke)' }}
                                        activeDot={{ r: 6, stroke: 'var(--chart-trend-dot-stroke)', fill: 'var(--chart-trend-dot-fill)', strokeWidth: 2 }}
                                    />
                                    <Line type="monotone" dataKey="costs" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                        <h3 className="text-lg font-brand font-semibold text-foreground mb-4">Inventory Breakdown</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={inventoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ backgroundColor: 'var(--popover)', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--popover-foreground)' }} />
                                    <Bar dataKey="value" fill="var(--color-brand-500)" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                {/* Recent Orders - The Grid/List view handled here */}

            </div>

            <Transition appear show={!!trackingOrder} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setTrackingOrder(null)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 dark:bg-black/80 backdrop-blur-sm" />
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
                                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-card p-6 text-left align-middle shadow-xl transition-all border border-border">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-zinc-900 dark:text-white flex justify-between items-center mb-6"
                                    >
                                        <span>
                                            {lifecycleTab === 'quotes' ? 'Quote Analysis' :
                                                lifecycleTab === 'acknowledgments' ? 'Discrepancy Resolver' :
                                                    `Tracking Details - ${trackingOrder?.id}`}
                                        </span>
                                        <button
                                            onClick={() => setTrackingOrder(null)}
                                            className="rounded-full p-1 hover:bg-accent transition-colors"
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </Dialog.Title>

                                    {lifecycleTab === 'quotes' ? (
                                        /* Quote Details View */
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Margin Analysis</h4>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                                        <span className="text-sm text-muted-foreground">Total Cost</span>
                                                        <span className="font-mono text-foreground">$850,000</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                                        <span className="text-sm text-muted-foreground">List Price</span>
                                                        <span className="font-mono text-foreground">$1,200,000</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg">
                                                        <span className="text-sm font-medium text-green-700 dark:text-green-400">Net Margin</span>
                                                        <span className="font-bold text-green-700 dark:text-green-400">29.2%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col h-full bg-primary/5 p-5 rounded-xl border border-primary/10">
                                                <div className="flex items-center gap-2 mb-3 text-brand-700 dark:text-brand-300">
                                                    <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                                                    <span className="font-semibold text-sm">AI Pricing Insight</span>
                                                </div>
                                                <p className="text-sm text-brand-900/80 dark:text-zinc-300 leading-relaxed mb-4">
                                                    Based on recent wins with <strong className="text-brand-950 dark:text-white">Apex Tech</strong>, you could increase margin to <strong className="text-brand-950 dark:text-white">32%</strong> without impacting win probability.
                                                </p>
                                                <button className="mt-auto w-full py-2 bg-brand-600 hover:bg-brand-700 text-white dark:text-brand-950 dark:bg-brand-400 dark:hover:bg-brand-300 rounded-lg text-sm font-medium transition-colors">
                                                    Apply Suggested Pricing
                                                </button>
                                            </div>
                                        </div>
                                    ) : lifecycleTab === 'acknowledgments' ? (
                                        /* Ack Details View */
                                        <div className="space-y-6">
                                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex gap-3">
                                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Price Discrepancy Detected</h4>
                                                    <p className="text-sm text-red-600/90 dark:text-red-400/90 mt-1">Vendor acknowledgement is <span className="font-bold">$500 higher</span> than the Purchase Order.</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                                    <span className="block text-xs uppercase text-muted-foreground mb-1">Your PO</span>
                                                    <div className="font-semibold text-lg">$12,500.00</div>
                                                    <div className="text-xs text-muted-foreground mt-2">Unit Price: $250.00</div>
                                                </div>
                                                <div className="p-4 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/5 rounded-lg">
                                                    <span className="block text-xs uppercase text-red-600 dark:text-red-400 mb-1">Vendor Ack</span>
                                                    <div className="font-semibold text-lg text-red-700 dark:text-red-400">$13,000.00</div>
                                                    <div className="text-xs text-red-600/80 mt-2">Unit Price: $260.00</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 justify-end pt-4 border-t border-border">
                                                <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-accent">
                                                    Contact Rep
                                                </button>
                                                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
                                                    Update PO to Match
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left Col: Timeline */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Shipment Progress</h4>
                                                <div className="space-y-6 relative pl-2 border-l border-zinc-200 dark:border-zinc-800 ml-2">
                                                    {trackingSteps.map((step, idx) => (
                                                        <div key={idx} className="relative pl-6">
                                                            <div className={cn(
                                                                "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-zinc-900",
                                                                step.completed ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700",
                                                                step.alert && "bg-red-500 dark:bg-red-500"
                                                            )} />
                                                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{step.status}</p>
                                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{step.date} · {step.location}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right Col: Georefence & Actions */}
                                            <div className="flex flex-col h-full">
                                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Delivery Location</h4>

                                                {/* Map Placeholder */}
                                                <div className="bg-muted rounded-lg h-40 w-full mb-4 flex items-center justify-center border border-border">
                                                    <div className="text-center">
                                                        <MapPin className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Map Preview Unavailable</span>
                                                    </div>
                                                </div>

                                                <div className="bg-muted/30 p-3 rounded-lg border border-border mb-6">
                                                    <p className="text-xs font-medium text-zinc-900 dark:text-white">Distribution Center NY-05</p>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">45 Industrial Park Dr, Brooklyn, NY 11201</p>
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                                    <button
                                                        type="button"
                                                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-brand-300 dark:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                                                        onClick={() => console.log('Contacting support...')}
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                        Contact Support
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <CreateOrderModal isOpen={isCreateOrderOpen} onClose={() => setIsCreateOrderOpen(false)} />
            <AcknowledgementUploadModal isOpen={isAckModalOpen} onClose={() => setIsAckModalOpen(false)} />
            <BatchAckModal isOpen={isBatchAckOpen} onClose={() => setIsBatchAckOpen(false)} />
            <CreateQuoteModal isOpen={isQuoteWidgetOpen} onClose={() => setIsQuoteWidgetOpen(false)} onNavigate={onNavigate} />

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="bg-popover rounded-xl shadow-2xl shadow-black/10 border border-border p-4 flex items-start gap-4 max-w-sm">
                        <div className={`mt-0.5 p-1 rounded-full ${toastMessage.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : toastMessage.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                            {toastMessage.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : toastMessage.type === 'info' ? (
                                <FileText className="w-5 h-5" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{toastMessage.title}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{toastMessage.description}</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors">
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

        </div >
    )
}

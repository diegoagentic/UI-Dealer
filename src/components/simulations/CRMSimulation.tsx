import { useState, useEffect, useMemo } from 'react'
import {
    MagnifyingGlassIcon, FunnelIcon, PlusIcon, ChevronRightIcon,
    PhoneIcon, EnvelopeIcon, CalendarIcon, CheckCircleIcon,
    ExclamationTriangleIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon,
    UserGroupIcon, ChartBarIcon, ClockIcon, SparklesIcon,
    StarIcon, EllipsisHorizontalIcon, ArrowPathIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { useDemo } from '../../context/DemoContext'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Bot, BrainCircuit, Database, Globe, TrendingUp, Users, Target, Zap, Package, Mail, Phone, Video, Calendar, MessageSquare } from 'lucide-react'
import { AIAgentAvatar } from './DemoAvatars'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

// ═══════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════

interface Lead {
    id: string; name: string; company: string; title: string;
    score: number; source: string; status: 'Hot' | 'Warm' | 'Cold';
    email: string; phone: string; lastContact: string;
    enriched: boolean; avatar: string;
}

const MOCK_LEADS: Lead[] = [
    { id: 'L-001', name: 'Jennifer Martinez', company: 'Apex Healthcare Group', title: 'VP Facilities', score: 92, source: 'Web Form', status: 'Hot', email: 'j.martinez@apexhcg.com', phone: '(512) 555-0147', lastContact: '2h ago', enriched: true, avatar: 'JM' },
    { id: 'L-002', name: 'Michael Thompson', company: 'Zenith Financial Services', title: 'Director of Operations', score: 78, source: 'Referral', status: 'Warm', email: 'm.thompson@zenithfs.com', phone: '(214) 555-0293', lastContact: '1d ago', enriched: true, avatar: 'MT' },
    { id: 'L-003', name: 'David Chen', company: 'Nova Tech Solutions', title: 'Office Manager', score: 45, source: 'Trade Show', status: 'Cold', email: 'd.chen@novatech.io', phone: '(415) 555-0388', lastContact: '5d ago', enriched: false, avatar: 'DC' },
    { id: 'L-004', name: 'Sarah Williams', company: 'Meridian Education', title: 'Procurement Lead', score: 85, source: 'LinkedIn', status: 'Hot', email: 's.williams@meridian.edu', phone: '(303) 555-0512', lastContact: '4h ago', enriched: true, avatar: 'SW' },
    { id: 'L-005', name: 'Robert Kim', company: 'Pacific Ventures', title: 'CFO', score: 62, source: 'Cold Outreach', status: 'Warm', email: 'r.kim@pacificv.com', phone: '(206) 555-0671', lastContact: '3d ago', enriched: true, avatar: 'RK' },
    { id: 'L-006', name: 'Amanda Foster', company: 'Greenfield Properties', title: 'Design Director', score: 88, source: 'Web Form', status: 'Hot', email: 'a.foster@greenfield.com', phone: '(512) 555-0834', lastContact: '1h ago', enriched: true, avatar: 'AF' },
]

interface Deal {
    id: string; name: string; company: string; amount: number;
    stage: string; probability: number; daysInStage: number;
    owner: string; nextAction: string; closeDate: string;
}

const MOCK_DEALS: Deal[] = [
    { id: 'D-001', name: 'Apex HQ Furniture Package', company: 'Apex Healthcare Group', amount: 89500, stage: 'Negotiation', probability: 85, daysInStage: 4, owner: 'Maria R.', nextAction: 'Schedule product demo', closeDate: 'Mar 28' },
    { id: 'D-002', name: 'Zenith Open Office Redesign', company: 'Zenith Financial Services', amount: 43750, stage: 'Proposal', probability: 60, daysInStage: 7, owner: 'Maria R.', nextAction: 'Send revised pricing', closeDate: 'Apr 15' },
    { id: 'D-003', name: 'Nova Lab Furniture Setup', company: 'Nova Tech Solutions', amount: 28400, stage: 'Qualified', probability: 35, daysInStage: 12, owner: 'Carlos D.', nextAction: 'Needs assessment call', closeDate: 'May 01' },
    { id: 'D-004', name: 'Meridian Campus Refresh', company: 'Meridian Education', amount: 156000, stage: 'Proposal', probability: 70, daysInStage: 3, owner: 'Maria R.', nextAction: 'Present catalog options', closeDate: 'Apr 02' },
    { id: 'D-005', name: 'Pacific Exec Suite', company: 'Pacific Ventures', amount: 67200, stage: 'Qualified', probability: 40, daysInStage: 8, owner: 'James L.', nextAction: 'Budget confirmation', closeDate: 'May 10' },
    { id: 'D-006', name: 'Greenfield Showroom Design', company: 'Greenfield Properties', amount: 112000, stage: 'Negotiation', probability: 90, daysInStage: 2, owner: 'Maria R.', nextAction: 'Final contract review', closeDate: 'Mar 22' },
    { id: 'D-007', name: 'Regional Bank Branches x3', company: 'Zenith Financial Services', amount: 234000, stage: 'New Lead', probability: 15, daysInStage: 1, owner: 'Maria R.', nextAction: 'Initial qualification', closeDate: 'Jun 30' },
    { id: 'D-008', name: 'COI Office Renovation', company: 'COI Interiors', amount: 385000, stage: 'Closed-Won', probability: 100, daysInStage: 0, owner: 'Maria R.', nextAction: 'Handoff to fulfillment', closeDate: 'Mar 10' },
]

interface Activity {
    id: string; type: 'email' | 'call' | 'meeting' | 'quote' | 'note';
    contact: string; company: string; subject: string; time: string;
    status?: string; isAI?: boolean;
}

const MOCK_ACTIVITIES: Activity[] = [
    { id: 'A-1', type: 'email', contact: 'Jennifer Martinez', company: 'Apex Healthcare', subject: 'RE: Furniture Spec Sheet — Product Catalog Attached', time: '2h ago', status: 'Replied' },
    { id: 'A-2', type: 'call', contact: 'Michael Thompson', company: 'Zenith Financial', subject: 'Follow-up on quote #QT-1025 — pricing discussion', time: '4h ago', status: '12 min' },
    { id: 'A-3', type: 'meeting', contact: 'Amanda Foster', company: 'Greenfield Properties', subject: 'Showroom design review — in-person visit', time: '6h ago', status: '45 min' },
    { id: 'A-4', type: 'quote', contact: 'Sarah Williams', company: 'Meridian Education', subject: 'Quote #QT-1030 sent — Campus Refresh $156K', time: '1d ago', status: 'Opened' },
    { id: 'A-5', type: 'email', contact: 'Robert Kim', company: 'Pacific Ventures', subject: 'Budget approval timeline follow-up', time: '1d ago', status: 'No reply' },
    { id: 'A-6', type: 'note', contact: 'Jennifer Martinez', company: 'Apex Healthcare', subject: 'AI: Engagement declining — response time 4hr → 2 days', time: '2d ago', isAI: true },
    { id: 'A-7', type: 'call', contact: 'David Chen', company: 'Nova Tech', subject: 'Initial needs assessment — lab furniture requirements', time: '3d ago', status: '22 min' },
    { id: 'A-8', type: 'email', contact: 'Amanda Foster', company: 'Greenfield Properties', subject: 'Contract draft v2 — final pricing confirmation', time: '3d ago', status: 'Replied' },
]

interface ProductRec {
    id: string; name: string; category: string; confidence: number;
    reason: string; price: string; availability: string; trending: boolean;
}

const MOCK_RECOMMENDATIONS: ProductRec[] = [
    { id: 'P-1', name: 'Height-Adjustable Standing Desks', category: 'Desks', confidence: 94, reason: 'Trending in healthcare sector — 340% adoption increase', price: '$1,250–$2,400', availability: 'In Stock (48 units)', trending: true },
    { id: 'P-2', name: 'Acoustic Privacy Panels', category: 'Accessories', confidence: 87, reason: 'Open office layout detected — noise reduction critical', price: '$380–$750', availability: 'In Stock (120 units)', trending: false },
    { id: 'P-3', name: 'Ergonomic Task Chairs — Series 7', category: 'Seating', confidence: 82, reason: 'Wellness program noted — ergonomic certification required', price: '$890–$1,450', availability: 'Low Stock (12 units)', trending: true },
]

// Chart data
const revenueData = [
    { month: 'Oct', revenue: 320000, target: 350000 },
    { month: 'Nov', revenue: 380000, target: 350000 },
    { month: 'Dec', revenue: 295000, target: 350000 },
    { month: 'Jan', revenue: 410000, target: 400000 },
    { month: 'Feb', revenue: 445000, target: 400000 },
    { month: 'Mar', revenue: 485000, target: 400000 },
]

const pipelineData = [
    { stage: 'New Lead', value: 234000, count: 1 },
    { stage: 'Qualified', value: 95600, count: 2 },
    { stage: 'Proposal', value: 199750, count: 2 },
    { stage: 'Negotiation', value: 201500, count: 2 },
    { stage: 'Closed-Won', value: 385000, count: 1 },
]

const leadSourceData = [
    { name: 'Web Form', value: 35, color: '#E6F993' },
    { name: 'Referral', value: 25, color: '#86efac' },
    { name: 'LinkedIn', value: 20, color: '#93c5fd' },
    { name: 'Trade Show', value: 12, color: '#fcd34d' },
    { name: 'Cold Outreach', value: 8, color: '#d4d4d8' },
]

// ═══════════════════════════════════════════════════
// PIPELINE STAGES
// ═══════════════════════════════════════════════════

const PIPELINE_STAGES = [
    { id: 'new-lead', label: 'New Lead', color: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300' },
    { id: 'qualified', label: 'Qualified', color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    { id: 'proposal', label: 'Proposal', color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
    { id: 'closed-won', label: 'Closed-Won', color: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
]

// ═══════════════════════════════════════════════════
// AI ENRICHMENT AGENTS
// ═══════════════════════════════════════════════════

const ENRICHMENT_AGENTS = [
    { id: 'company-intel', name: 'CompanyIntelligenceAgent', icon: <Globe size={14} />, status: 'Complete', detail: 'Revenue: $45M | 230 employees | 3 locations', confidence: 96 },
    { id: 'social-profile', name: 'SocialProfileAgent', icon: <Users size={14} />, status: 'Complete', detail: 'LinkedIn verified | 2 industry associations | 5 mutual connections', confidence: 89 },
    { id: 'purchase-history', name: 'PurchaseHistoryAgent', icon: <Database size={14} />, status: 'Complete', detail: '3 past orders ($210K total) | Preferred: standing desks, task seating', confidence: 94 },
]

// ═══════════════════════════════════════════════════
// BANT SCORING
// ═══════════════════════════════════════════════════

const BANT_CRITERIA = [
    { id: 'budget', label: 'Budget', value: '$50K–$100K range', status: 'pass' as const, detail: 'Fiscal year budget confirmed via annual report' },
    { id: 'authority', label: 'Authority', value: 'VP Facilities (decision maker)', status: 'pass' as const, detail: 'Direct purchasing authority verified' },
    { id: 'need', label: 'Need', value: 'Office renovation — 3 floors', status: 'pass' as const, detail: 'Project brief received, timeline confirmed' },
    { id: 'timeline', label: 'Timeline', value: 'Q3 2026 — may shift to Q4', status: 'warn' as const, detail: 'Construction permits pending — could delay 4-6 weeks' },
]

// ═══════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════

const CRM_NOTIFICATIONS = [
    { id: 'N-1', type: 'success', message: '3 opportunities advancing to negotiation stage', time: 'Just now' },
    { id: 'N-2', type: 'warning', message: 'At-risk deal: Zenith Financial — no response in 5 days', time: '1h ago' },
    { id: 'N-3', type: 'info', message: '2 new leads qualified today (Apex Healthcare, Greenfield Properties)', time: '2h ago' },
    { id: 'N-4', type: 'success', message: 'Cross-platform sync complete: CRM → Dealer Experience → Expert Hub', time: '3h ago' },
    { id: 'N-5', type: 'info', message: 'Product catalog updated — 12 new SKUs available for recommendations', time: '5h ago' },
]

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

interface CRMSimulationProps {
    onNavigate: (page: string) => void;
}

type CRMTab = 'leads' | 'pipeline' | 'activities' | 'analytics'

// Step-to-tab mapping
const STEP_TAB_MAP: Record<string, CRMTab> = {
    '4.1': 'leads',
    '4.2': 'leads',
    '4.3': 'leads',
    '4.4': 'pipeline',
    '4.5': 'pipeline',
    '4.6': 'activities',
    '4.7': 'analytics',
    '4.8': 'leads',
    // CRM profile steps
    'crm-1.1': 'leads',
    'crm-1.2': 'leads',
    'crm-1.3': 'leads',
    'crm-2.1': 'pipeline',
    'crm-2.2': 'pipeline',
    'crm-2.3': 'pipeline',
    'crm-3.1': 'analytics',
    'crm-3.2': 'analytics',
}

export default function CRMSimulation({ onNavigate }: CRMSimulationProps) {
    const { currentStep } = useDemo()
    const stepId = currentStep?.id || '4.1'

    // Determine active tab from step
    const autoTab = STEP_TAB_MAP[stepId] || 'leads'
    const [activeTab, setActiveTab] = useState<CRMTab>(autoTab)

    // Sync tab with step changes
    useEffect(() => {
        const mapped = STEP_TAB_MAP[stepId]
        if (mapped) setActiveTab(mapped)
    }, [stepId])

    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

    // Show lead detail for enrichment/qualification steps
    useEffect(() => {
        if (['4.2', '4.3', 'crm-1.2'].includes(stepId)) {
            setSelectedLead(MOCK_LEADS[0]) // Jennifer Martinez
        } else {
            setSelectedLead(null)
        }
    }, [stepId])

    const tabs: { id: CRMTab; label: string; icon: React.ReactNode }[] = [
        { id: 'leads', label: 'Leads', icon: <UserGroupIcon className="h-4 w-4" /> },
        { id: 'pipeline', label: 'Pipeline', icon: <ChartBarIcon className="h-4 w-4" /> },
        { id: 'activities', label: 'Activities', icon: <ClockIcon className="h-4 w-4" /> },
        { id: 'analytics', label: 'Analytics', icon: <ArrowTrendingUpIcon className="h-4 w-4" /> },
    ]

    // Metrics
    const metrics = [
        { label: 'Active Leads', value: '24', change: '+6', positive: true, icon: <UserGroupIcon className="h-5 w-5" /> },
        { label: 'Pipeline Value', value: '$2.3M', change: '+12%', positive: true, icon: <ChartBarIcon className="h-5 w-5" /> },
        { label: 'Win Rate', value: '73%', change: '+5%', positive: true, icon: <Target size={20} /> },
        { label: 'Revenue MTD', value: '$485K', change: '+18%', positive: true, icon: <TrendingUp size={20} /> },
    ]

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <div className="pt-20 px-4 max-w-[1400px] mx-auto pb-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <SparklesIcon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-brand font-bold tracking-tight text-foreground">Sales Intelligence</h1>
                            <p className="text-xs text-muted-foreground">AI-powered CRM & Customer Engagement</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border text-xs">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-[10px] font-bold text-primary-foreground">MR</div>
                            <span className="text-muted-foreground">Maria Rodriguez</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-foreground font-medium">Sales Rep</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6 bg-card rounded-lg p-1 border border-border w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                                activeTab === tab.id
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {metrics.map((m, i) => (
                        <div key={i} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                {m.icon}
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{m.label}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-foreground">{m.value}</span>
                                    <span className={cn('text-[10px] font-medium', m.positive ? 'text-green-600' : 'text-red-500')}>
                                        {m.positive ? <ArrowTrendingUpIcon className="h-3 w-3 inline" /> : <ArrowTrendingDownIcon className="h-3 w-3 inline" />}
                                        {' '}{m.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                {activeTab === 'leads' && <LeadsView stepId={stepId} selectedLead={selectedLead} onSelectLead={setSelectedLead} />}
                {activeTab === 'pipeline' && <PipelineView stepId={stepId} />}
                {activeTab === 'activities' && <ActivitiesView stepId={stepId} />}
                {activeTab === 'analytics' && <AnalyticsView stepId={stepId} />}
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════
// LEADS VIEW
// ═══════════════════════════════════════════════════

function LeadsView({ stepId, selectedLead, onSelectLead }: { stepId: string; selectedLead: Lead | null; onSelectLead: (l: Lead | null) => void }) {
    const isNewLeadStep = stepId === '4.1' || stepId === 'crm-1.1'
    const isEnrichmentStep = stepId === '4.2' || stepId === 'crm-1.2'
    const isQualificationStep = stepId === '4.3' || stepId === 'crm-1.3'
    const isNotificationStep = stepId === '4.8'

    if (isNotificationStep) return <NotificationsView />

    // Show detail view for enrichment/qualification
    if (selectedLead && (isEnrichmentStep || isQualificationStep)) {
        return <LeadDetailView lead={selectedLead} stepId={stepId} onBack={() => onSelectLead(null)} />
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <MagnifyingGlassIcon className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground w-64 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search leads..." />
                    </div>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground">
                        <FunnelIcon className="h-3.5 w-3.5" /> Filter
                    </button>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
                    <PlusIcon className="h-3.5 w-3.5" /> Add Lead
                </button>
            </div>

            {/* Leads Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Lead</th>
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Company</th>
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Score</th>
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Source</th>
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Status</th>
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Last Contact</th>
                            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_LEADS.map((lead, idx) => {
                            const isNewEntry = isNewLeadStep && idx === 0
                            return (
                                <tr
                                    key={lead.id}
                                    className={cn(
                                        'border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer',
                                        isNewEntry && 'bg-primary/5 animate-pulse ring-1 ring-primary/20'
                                    )}
                                    onClick={() => onSelectLead(lead)}
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-[10px] font-bold text-zinc-700 dark:text-zinc-200">
                                                {lead.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{lead.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{lead.title}</p>
                                            </div>
                                            {isNewEntry && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider">New</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-foreground">{lead.company}</td>
                                    <td className="px-4 py-3">
                                        <ScoreBadge score={lead.score} />
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{lead.source}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={lead.status} />
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{lead.lastContact}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"><EnvelopeIcon className="h-3.5 w-3.5" /></button>
                                            <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"><PhoneIcon className="h-3.5 w-3.5" /></button>
                                            <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"><ChevronRightIcon className="h-3.5 w-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* AI Lead Scoring Summary */}
            {isNewLeadStep && (
                <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <AIAgentAvatar size="sm" />
                        <span className="text-xs font-medium text-foreground">LeadScoringAgent</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground">New lead classified: <strong className="text-foreground">Jennifer Martinez — Hot (92%)</strong>. Company profile matches ideal customer criteria. Recommended action: prioritize outreach within 24 hours.</p>
                </div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════════
// LEAD DETAIL VIEW (Enrichment + Qualification)
// ═══════════════════════════════════════════════════

function LeadDetailView({ lead, stepId, onBack }: { lead: Lead; stepId: string; onBack: () => void }) {
    const isEnrichment = stepId === '4.2' || stepId === 'crm-1.2'
    const isQualification = stepId === '4.3' || stepId === 'crm-1.3'

    return (
        <div className="space-y-4">
            {/* Back button */}
            <button onClick={onBack} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                ← Back to leads
            </button>

            <div className="grid grid-cols-3 gap-4">
                {/* Left — Contact Info */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-base font-bold text-zinc-700 dark:text-zinc-200">
                                {lead.avatar}
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-foreground">{lead.name}</h2>
                                <p className="text-xs text-muted-foreground">{lead.title}</p>
                                <p className="text-xs text-muted-foreground">{lead.company}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <EnvelopeIcon className="h-3.5 w-3.5" /> {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <PhoneIcon className="h-3.5 w-3.5" /> {lead.phone}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                            <ScoreBadge score={lead.score} />
                            <StatusBadge status={lead.status} />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-card border border-border rounded-xl p-3 space-y-2">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</p>
                        <div className="grid grid-cols-2 gap-1.5">
                            {[
                                { icon: <Mail size={12} />, label: 'Email' },
                                { icon: <Phone size={12} />, label: 'Call' },
                                { icon: <Video size={12} />, label: 'Meeting' },
                                { icon: <Calendar size={12} />, label: 'Schedule' },
                            ].map(a => (
                                <button key={a.label} className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted">
                                    {a.icon} {a.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — AI Panels */}
                <div className="col-span-2 space-y-4">
                    {/* AI Enrichment Panel */}
                    {isEnrichment && (
                        <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AIAgentAvatar size="sm" />
                                    <span className="text-xs font-medium text-foreground">AI Contact Enrichment</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">3 agents active</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground">92% data completeness</span>
                            </div>

                            <div className="space-y-3">
                                {ENRICHMENT_AGENTS.map(agent => (
                                    <div key={agent.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                                        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-foreground shrink-0 mt-0.5">
                                            {agent.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-foreground">{agent.name}</span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">{agent.status}</span>
                                                <span className="text-[10px] text-muted-foreground ml-auto">{agent.confidence}%</span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground mt-1">{agent.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BANT Qualification Panel */}
                    {isQualification && (
                        <div className="space-y-4">
                            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Target size={16} className="text-foreground" />
                                        <span className="text-xs font-medium text-foreground">BANT Lead Qualification</span>
                                    </div>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-foreground font-medium">AI Score: 85%</span>
                                </div>

                                <div className="space-y-2">
                                    {BANT_CRITERIA.map(c => (
                                        <div key={c.id} className={cn(
                                            'flex items-start gap-3 p-3 rounded-lg border',
                                            c.status === 'pass' ? 'border-green-200 bg-green-50/50 dark:border-green-800/30 dark:bg-green-900/10' : 'border-amber-200 bg-amber-50/50 dark:border-amber-800/30 dark:bg-amber-900/10'
                                        )}>
                                            <div className={cn(
                                                'h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                                                c.status === 'pass' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400'
                                            )}>
                                                {c.status === 'pass' ? <CheckCircleIcon className="h-3.5 w-3.5" /> : <ExclamationTriangleIcon className="h-3.5 w-3.5" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-foreground">{c.label}</span>
                                                    <span className="text-[10px] text-muted-foreground">— {c.value}</span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">{c.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Recommendation */}
                            <div className="bg-card border border-primary/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <AIAgentAvatar size="sm" />
                                    <span className="text-xs font-medium text-foreground">AI Recommendation</span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">
                                    3/4 BANT criteria met. Timeline risk is minor (Q3→Q4 shift within acceptable range). <strong className="text-foreground">Recommended: Convert to Opportunity — 85% probability.</strong>
                                </p>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
                                        Convert to Opportunity
                                    </button>
                                    <button className="px-3 py-1.5 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted">
                                        Schedule Follow-up
                                    </button>
                                    <button className="px-3 py-1.5 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════
// PIPELINE VIEW
// ═══════════════════════════════════════════════════

function PipelineView({ stepId }: { stepId: string }) {
    const isProductStep = stepId === '4.5' || stepId === 'crm-2.1'

    const dealsByStage = useMemo(() => {
        const stageMap: Record<string, Deal[]> = {
            'New Lead': [], 'Qualified': [], 'Proposal': [], 'Negotiation': [], 'Closed-Won': []
        }
        MOCK_DEALS.forEach(d => {
            if (stageMap[d.stage]) stageMap[d.stage].push(d)
        })
        return stageMap
    }, [])

    return (
        <div className="space-y-4">
            {/* Pipeline Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">8 deals</span>
                    <span>·</span>
                    <span>Total pipeline: $1.12M</span>
                    <span>·</span>
                    <span>Weighted: $2.3M</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground">
                        <FunnelIcon className="h-3.5 w-3.5" /> Filter
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
                        <PlusIcon className="h-3.5 w-3.5" /> New Deal
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-5 gap-3">
                {PIPELINE_STAGES.map(stage => {
                    const deals = dealsByStage[stage.label] || []
                    const total = deals.reduce((sum, d) => sum + d.amount, 0)
                    return (
                        <div key={stage.id} className="space-y-2">
                            {/* Column Header */}
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-1.5">
                                    <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', stage.color)}>{stage.label}</span>
                                    <span className="text-[10px] text-muted-foreground">({deals.length})</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground">${(total / 1000).toFixed(0)}K</span>
                            </div>

                            {/* Deal Cards */}
                            <div className="space-y-2 min-h-[200px]">
                                {deals.map(deal => (
                                    <DealCard key={deal.id} deal={deal} stepId={stepId} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* AI Next Best Actions (for pipeline step) */}
            {(stepId === '4.4' || stepId === 'crm-2.2') && (
                <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <AIAgentAvatar size="sm" />
                        <span className="text-xs font-medium text-foreground">OpportunityInsightAgent — Next Best Actions</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {MOCK_DEALS.filter(d => d.stage !== 'Closed-Won' && d.stage !== 'New Lead').slice(0, 3).map(deal => (
                            <div key={deal.id} className="p-3 rounded-lg bg-muted/50 border border-border text-xs space-y-1">
                                <p className="font-medium text-foreground truncate">{deal.company}</p>
                                <p className="text-muted-foreground">${(deal.amount / 1000).toFixed(0)}K — {deal.probability}% probability</p>
                                <div className="flex items-center gap-1 mt-1 text-primary-foreground">
                                    <Zap size={10} />
                                    <span className="text-[10px] font-medium">{deal.nextAction}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Product Recommendations (for product step) */}
            {isProductStep && <ProductRecommendations />}
        </div>
    )
}

function DealCard({ deal, stepId }: { deal: Deal; stepId: string }) {
    const isHighlighted = (stepId === '4.4' && deal.id === 'D-001') || (stepId === '4.5' && deal.id === 'D-001')

    return (
        <div className={cn(
            'bg-card border rounded-lg p-3 space-y-2 cursor-pointer hover:shadow-sm transition-all',
            isHighlighted ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'
        )}>
            <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-foreground truncate pr-2">{deal.name}</p>
                <EllipsisHorizontalIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </div>
            <p className="text-[10px] text-muted-foreground">{deal.company}</p>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">${(deal.amount / 1000).toFixed(0)}K</span>
                <span className="text-[10px] text-muted-foreground">{deal.probability}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <ClockIcon className="h-3 w-3" />
                <span>{deal.daysInStage}d in stage</span>
                <span className="ml-auto">{deal.owner}</span>
            </div>
            {isHighlighted && deal.nextAction && (
                <div className="flex items-center gap-1 text-[10px] text-primary-foreground bg-primary/5 rounded px-1.5 py-0.5">
                    <Zap size={10} />
                    <span className="font-medium">{deal.nextAction}</span>
                </div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════════
// PRODUCT RECOMMENDATIONS
// ═══════════════════════════════════════════════════

function ProductRecommendations() {
    return (
        <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2">
                <AIAgentAvatar size="sm" />
                <span className="text-xs font-medium text-foreground">ProductMatchAgent — Cross-Sell Recommendations</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-foreground font-medium ml-auto">For: Apex Healthcare Group</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {MOCK_RECOMMENDATIONS.map(rec => (
                    <div key={rec.id} className="p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{rec.category}</span>
                            {rec.trending && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-0.5">
                                    <TrendingUp size={10} /> Trending
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] font-medium text-foreground">{rec.name}</p>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] text-muted-foreground">Confidence:</span>
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${rec.confidence}%` }} />
                            </div>
                            <span className="text-[10px] font-medium text-foreground">{rec.confidence}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{rec.reason}</p>
                        <div className="flex items-center justify-between pt-1 border-t border-border text-[10px]">
                            <span className="text-foreground font-medium">{rec.price}</span>
                            <span className={cn(
                                rec.availability.includes('Low') ? 'text-amber-600' : 'text-green-600'
                            )}>{rec.availability}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════
// ACTIVITIES VIEW
// ═══════════════════════════════════════════════════

function ActivitiesView({ stepId }: { stepId: string }) {
    const activityIcons: Record<string, React.ReactNode> = {
        email: <Mail size={14} className="text-blue-500" />,
        call: <Phone size={14} className="text-green-500" />,
        meeting: <Video size={14} className="text-purple-500" />,
        quote: <Package size={14} className="text-amber-500" />,
        note: <MessageSquare size={14} className="text-red-500" />,
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-foreground">Activity Timeline</span>
                    <span className="text-muted-foreground">· Last 30 days</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                    {['All', 'Emails', 'Calls', 'Meetings'].map(f => (
                        <button key={f} className={cn(
                            'px-2 py-1 rounded-md',
                            f === 'All' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}>{f}</button>
                    ))}
                </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Emails Sent', value: '12', icon: <Mail size={14} /> },
                    { label: 'Calls Made', value: '4', icon: <Phone size={14} /> },
                    { label: 'Meetings', value: '2', icon: <Video size={14} /> },
                    { label: 'Quotes Updated', value: '3', icon: <Package size={14} /> },
                ].map((s, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-muted flex items-center justify-center text-muted-foreground">{s.icon}</div>
                        <div>
                            <p className="text-[10px] text-muted-foreground">{s.label}</p>
                            <p className="text-sm font-bold text-foreground">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                {MOCK_ACTIVITIES.map((activity, idx) => (
                    <div key={activity.id} className={cn(
                        'flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors',
                        activity.isAI && 'bg-primary/5'
                    )}>
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                            {activity.isAI ? <BrainCircuit size={14} className="text-primary-foreground" /> : activityIcons[activity.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="font-medium text-foreground">{activity.contact}</span>
                                <span className="text-muted-foreground">· {activity.company}</span>
                                {activity.isAI && <span className="text-[9px] px-1 py-0.5 rounded bg-primary/10 text-foreground font-medium">AI Insight</span>}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{activity.subject}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                            {activity.status && (
                                <span className={cn(
                                    'text-[10px]',
                                    activity.status === 'No reply' ? 'text-amber-500' : 'text-muted-foreground'
                                )}>{activity.status}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Engagement Insights */}
            {(stepId === '4.6' || stepId === 'crm-2.3') && (
                <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <AIAgentAvatar size="sm" />
                        <span className="text-xs font-medium text-foreground">EngagementScoringAgent</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 text-xs space-y-1">
                            <div className="flex items-center gap-1">
                                <ExclamationTriangleIcon className="h-3.5 w-3.5 text-amber-500" />
                                <span className="font-medium text-foreground">Declining Engagement</span>
                            </div>
                            <p className="text-muted-foreground">Jennifer Martinez — response time increased from 4hr to 2 days</p>
                            <p className="text-[10px] text-primary-foreground font-medium flex items-center gap-1"><Zap size={10} /> Suggested: Escalate to in-person visit</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 text-xs space-y-1">
                            <div className="flex items-center gap-1">
                                <ArrowTrendingUpIcon className="h-3.5 w-3.5 text-green-500" />
                                <span className="font-medium text-foreground">High Engagement</span>
                            </div>
                            <p className="text-muted-foreground">Amanda Foster — 3 emails, 1 meeting, 1 contract review in 5 days</p>
                            <p className="text-[10px] text-green-700 dark:text-green-400 font-medium">Ready to close — 90% probability</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════════
// ANALYTICS VIEW
// ═══════════════════════════════════════════════════

function AnalyticsView({ stepId }: { stepId: string }) {
    return (
        <div className="space-y-4">
            {/* AI Forecast Banner */}
            {(stepId === '4.7' || stepId === 'crm-3.1') && (
                <div className="bg-card border border-primary/20 rounded-xl p-4 flex items-center gap-4">
                    <AIAgentAvatar size="sm" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-foreground">ForecastAgent</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Updated just now</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Q2 revenue projected: <strong className="text-foreground">$1.8M</strong> (±15% confidence). Pipeline health strong: 73% win rate, 23 avg days to close. +12% MoM growth trend.
                        </p>
                    </div>
                </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Revenue Trend */}
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-foreground">Revenue Trend</h3>
                        <span className="text-[10px] text-green-600 font-medium">+12% MoM</span>
                    </div>
                    <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                                <Tooltip formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`, '']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                <Area type="monotone" dataKey="revenue" stroke="#E6F993" fill="#E6F993" fillOpacity={0.2} strokeWidth={2} />
                                <Area type="monotone" dataKey="target" stroke="#d4d4d8" fill="none" strokeWidth={1} strokeDasharray="4 4" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pipeline Funnel */}
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-foreground">Pipeline by Stage</h3>
                        <span className="text-[10px] text-muted-foreground">8 total deals</span>
                    </div>
                    <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pipelineData} layout="vertical">
                                <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                                <YAxis type="category" dataKey="stage" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={80} />
                                <Tooltip formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`, '']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                <Bar dataKey="value" fill="#E6F993" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lead Sources */}
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium text-foreground">Lead Sources</h3>
                        <span className="text-[10px] text-muted-foreground">24 total leads</span>
                    </div>
                    <div className="h-[180px] flex items-center">
                        <div className="w-1/2 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={leadSourceData} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                                        {leadSourceData.map((entry, idx) => (
                                            <Cell key={idx} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 space-y-1.5">
                            {leadSourceData.map(s => (
                                <div key={s.name} className="flex items-center gap-2 text-[10px]">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-muted-foreground">{s.name}</span>
                                    <span className="ml-auto font-medium text-foreground">{s.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-card border border-border rounded-xl p-4">
                    <h3 className="text-xs font-medium text-foreground mb-3">Key Performance Indicators</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Win Rate', value: '73%', trend: '+5% vs last quarter', positive: true },
                            { label: 'Avg Deal Size', value: '$139K', trend: '+22% vs last quarter', positive: true },
                            { label: 'Avg Days to Close', value: '23 days', trend: '-4 days vs last quarter', positive: true },
                            { label: 'Lead-to-Deal Conv.', value: '34%', trend: '+8% vs last quarter', positive: true },
                            { label: 'Pipeline Coverage', value: '3.2x', trend: 'Target: 3.0x', positive: true },
                        ].map(kpi => (
                            <div key={kpi.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                                <span className="text-[11px] text-muted-foreground">{kpi.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-foreground">{kpi.value}</span>
                                    <span className={cn('text-[10px]', kpi.positive ? 'text-green-600' : 'text-red-500')}>{kpi.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════
// NOTIFICATIONS VIEW (Step 4.8)
// ═══════════════════════════════════════════════════

function NotificationsView() {
    return (
        <div className="space-y-4">
            <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <AIAgentAvatar size="sm" />
                    <span className="text-xs font-medium text-foreground">CRM Smart Digest</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Just now</span>
                </div>

                <div className="space-y-2">
                    {CRM_NOTIFICATIONS.map(n => (
                        <div key={n.id} className={cn(
                            'flex items-start gap-3 p-3 rounded-lg border',
                            n.type === 'success' && 'border-green-200 bg-green-50/50 dark:border-green-800/30 dark:bg-green-900/10',
                            n.type === 'warning' && 'border-amber-200 bg-amber-50/50 dark:border-amber-800/30 dark:bg-amber-900/10',
                            n.type === 'info' && 'border-blue-200 bg-blue-50/50 dark:border-blue-800/30 dark:bg-blue-900/10',
                        )}>
                            <div className={cn(
                                'h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                                n.type === 'success' && 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
                                n.type === 'warning' && 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
                                n.type === 'info' && 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
                            )}>
                                {n.type === 'success' && <CheckCircleIcon className="h-3.5 w-3.5" />}
                                {n.type === 'warning' && <ExclamationTriangleIcon className="h-3.5 w-3.5" />}
                                {n.type === 'info' && <SparklesIcon className="h-3.5 w-3.5" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-foreground">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cross-Platform Sync */}
            <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="text-xs font-medium text-foreground mb-3">Cross-Platform Data Sync</h3>
                <div className="flex items-center gap-4">
                    {[
                        { app: 'Strata CRM', status: 'Source', color: 'bg-primary text-primary-foreground' },
                        { app: 'Dealer Experience', status: 'Synced', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
                        { app: 'Expert Hub', status: 'Synced', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
                    ].map((app, i) => (
                        <div key={app.app} className="flex items-center gap-2">
                            <div className="px-3 py-2 rounded-lg border border-border bg-muted/50 text-xs">
                                <p className="font-medium text-foreground">{app.app}</p>
                                <span className={cn('text-[10px] px-1 py-0.5 rounded', app.color)}>{app.status}</span>
                            </div>
                            {i < 2 && <ArrowPathIcon className="h-4 w-4 text-muted-foreground" />}
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Zero duplicate data entry — all platforms share the same data source.</p>
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════════════

function ScoreBadge({ score }: { score: number }) {
    const color = score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        : score >= 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
    return (
        <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium tabular-nums', color)}>{score}%</span>
    )
}

function StatusBadge({ status }: { status: 'Hot' | 'Warm' | 'Cold' }) {
    const color = status === 'Hot' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
        : status === 'Warm' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
    return (
        <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', color)}>{status}</span>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// WRG Texas — Flow 2: Labor Estimation (PDF to Approved Quote)
// Steps: w2.1-w2.5 (WrgLaborEstimation — automated pipeline)
//        w2.6-w2.7 (WrgEstimatorReview — HITL in Dashboard)
//
// Data: JPS Health Center for Women — 24 line items, 185.04 man-hours, $10,547.28
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AIAgentAvatar } from './DemoAvatars';
import {
    CheckCircleIcon,
    ArrowPathIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon,
    ServerIcon,
    CpuChipIcon,
    CalculatorIcon,
    DocumentArrowDownIcon,
    EnvelopeIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PencilSquareIcon,
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { WRG_STEP_TIMING, type WrgStepTiming } from '../../config/profiles/wrg-demo';

// ─── Estimator avatar ────────────────────────────────────────────────────────
const ESTIMATOR_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgentVis { name: string; detail: string; visible: boolean; done: boolean }

type PipelinePhase = 'idle' | 'notification' | 'processing' | 'breathing' | 'revealed';
type ReviewPhase = 'idle' | 'notification' | 'reviewing';
type WriteBackPhase = 'idle' | 'summary' | 'submitting' | 'done';

// ─── JPS Line Item Data (real project) ───────────────────────────────────────

interface JpsLineItem {
    id: number;
    qty: number;
    product: string;
    kd: boolean;
    deliveryCategory: string;
    deliveryMinPerItem: number;
    installCategory: string;
    installHrsPerItem: number;
    confidence: 'HIGH' | 'LOW';
    confidenceScore: number;
    flagged: boolean;
    flagReason?: string;
}

const JPS_LINE_ITEMS: JpsLineItem[] = [
    { id: 1, qty: 2, product: 'Pre-Install Site Visit', kd: false, deliveryCategory: '—', deliveryMinPerItem: 0, installCategory: 'Overhead', installHrsPerItem: 4.00, confidence: 'HIGH', confidenceScore: 99, flagged: false },
    { id: 2, qty: 1, product: 'Punch Walk', kd: false, deliveryCategory: '—', deliveryMinPerItem: 0, installCategory: 'Overhead', installHrsPerItem: 4.00, confidence: 'HIGH', confidenceScore: 99, flagged: false },
    { id: 3, qty: 2, product: 'Extra Trips', kd: false, deliveryCategory: '—', deliveryMinPerItem: 0, installCategory: 'Overhead — Logistics', installHrsPerItem: 8.00, confidence: 'HIGH', confidenceScore: 95, flagged: false },
    { id: 4, qty: 40, product: 'Healthcare Guest Chairs — Small Frame', kd: false, deliveryCategory: 'Patient/Guest Chair', deliveryMinPerItem: 30, installCategory: 'Seating — Guest', installHrsPerItem: 0.20, confidence: 'HIGH', confidenceScore: 96, flagged: false },
    { id: 5, qty: 119, product: 'KD SOI Amplify Task Chairs', kd: true, deliveryCategory: 'Task/Side Chair KD', deliveryMinPerItem: 30, installCategory: 'Seating — Task KD', installHrsPerItem: 0.30, confidence: 'HIGH', confidenceScore: 94, flagged: true, flagReason: 'Exceeds 50-chair scope limit (119 chairs)' },
    { id: 6, qty: 5, product: 'KD SOI Amplify Task Stools', kd: true, deliveryCategory: 'Task/Side Chair KD', deliveryMinPerItem: 30, installCategory: 'Seating — Task KD', installHrsPerItem: 0.33, confidence: 'HIGH', confidenceScore: 93, flagged: false },
    { id: 7, qty: 2, product: 'Folding Guest Chairs', kd: false, deliveryCategory: 'Stack or Folding Chair', deliveryMinPerItem: 10, installCategory: 'Seating — Folding', installHrsPerItem: 0.25, confidence: 'HIGH', confidenceScore: 95, flagged: false },
    { id: 8, qty: 2, product: 'Healthcare Guest Chairs — Full Frame', kd: false, deliveryCategory: 'Patient/Guest Chair', deliveryMinPerItem: 30, installCategory: 'Seating — Guest', installHrsPerItem: 0.25, confidence: 'HIGH', confidenceScore: 94, flagged: false },
    { id: 9, qty: 5, product: 'Healthcare Bariatric Chairs — Full Frame', kd: false, deliveryCategory: 'Patient/Guest Chair', deliveryMinPerItem: 30, installCategory: 'Seating — Bariatric', installHrsPerItem: 0.33, confidence: 'LOW', confidenceScore: 71, flagged: true, flagReason: 'Bariatric category — no standard rate match' },
    { id: 10, qty: 19, product: 'Plastic Stacking Chairs', kd: false, deliveryCategory: 'Stack or Folding Chair', deliveryMinPerItem: 10, installCategory: 'Seating — Stack', installHrsPerItem: 0.20, confidence: 'HIGH', confidenceScore: 96, flagged: false },
    { id: 11, qty: 28, product: 'Folding Seat Multipurpose Chairs', kd: false, deliveryCategory: 'Stack or Folding Chair', deliveryMinPerItem: 10, installCategory: 'Seating — Folding', installHrsPerItem: 0.25, confidence: 'HIGH', confidenceScore: 95, flagged: false },
    { id: 12, qty: 3, product: 'Pediatric Lounge Chairs', kd: false, deliveryCategory: 'Lounge Chair', deliveryMinPerItem: 30, installCategory: 'Seating — Lounge', installHrsPerItem: 0.33, confidence: 'LOW', confidenceScore: 68, flagged: true, flagReason: 'Pediatric variant — verify lounge classification' },
    { id: 13, qty: 17, product: 'Healthcare Lounge Chairs', kd: false, deliveryCategory: 'Lounge Chair', deliveryMinPerItem: 30, installCategory: 'Seating — Lounge', installHrsPerItem: 0.50, confidence: 'HIGH', confidenceScore: 92, flagged: false },
    { id: 14, qty: 1, product: 'Custom 8-Seat Back-to-Back Carolina Booth', kd: false, deliveryCategory: 'Sofa (3-4 person)', deliveryMinPerItem: 75, installCategory: 'Custom Assembly — Booth', installHrsPerItem: 3.00, confidence: 'LOW', confidenceScore: 62, flagged: true, flagReason: 'Custom product — no standard category match' },
    { id: 15, qty: 1, product: 'Custom OFS Coact Serpentine Lounge — 12 Seats', kd: false, deliveryCategory: 'Sleeper sofa/chair', deliveryMinPerItem: 150, installCategory: 'Custom Assembly — Lounge', installHrsPerItem: 12.00, confidence: 'LOW', confidenceScore: 58, flagged: true, flagReason: 'Custom 12-seat ganged — no standard rate' },
    { id: 16, qty: 2, product: 'Healthcare Recliners', kd: false, deliveryCategory: 'Lounge Chair', deliveryMinPerItem: 30, installCategory: 'Seating — Healthcare', installHrsPerItem: 1.00, confidence: 'HIGH', confidenceScore: 91, flagged: false },
    { id: 17, qty: 12, product: 'Glassboards 36×48', kd: false, deliveryCategory: 'Whiteboard wall-attached', deliveryMinPerItem: 90, installCategory: 'Wall Mount — Glassboard', installHrsPerItem: 2.50, confidence: 'HIGH', confidenceScore: 92, flagged: false },
    { id: 18, qty: 4, product: '24×72 Training Tables', kd: false, deliveryCategory: 'Training table w/wire mgmt', deliveryMinPerItem: 90, installCategory: 'Tables — Training', installHrsPerItem: 1.25, confidence: 'HIGH', confidenceScore: 90, flagged: false },
    { id: 19, qty: 7, product: '30×30 Cafe Tables', kd: false, deliveryCategory: 'Cafeteria Table Rd/Sq to 48"', deliveryMinPerItem: 45, installCategory: 'Tables — Cafe', installHrsPerItem: 1.25, confidence: 'HIGH', confidenceScore: 91, flagged: false },
    { id: 20, qty: 1, product: 'Waterfall Conference Table 84×24 — No Power', kd: false, deliveryCategory: 'Conference Table >72" <96"', deliveryMinPerItem: 180, installCategory: 'Tables — Conference Large', installHrsPerItem: 6.00, confidence: 'HIGH', confidenceScore: 89, flagged: false },
    { id: 21, qty: 2, product: 'D-Top Conference Tables 36×72 — No Power', kd: false, deliveryCategory: 'Conference Table >72" <96"', deliveryMinPerItem: 180, installCategory: 'Tables — Conference', installHrsPerItem: 4.00, confidence: 'HIGH', confidenceScore: 90, flagged: false },
    { id: 22, qty: 2, product: 'Solid Surface 24" Round Side Tables', kd: false, deliveryCategory: 'End/occasional (no assy)', deliveryMinPerItem: 30, installCategory: 'Tables — Side', installHrsPerItem: 1.00, confidence: 'HIGH', confidenceScore: 91, flagged: false },
    { id: 23, qty: 9, product: 'Solid Surface 20" Round Side Tables', kd: false, deliveryCategory: 'End/occasional (no assy)', deliveryMinPerItem: 30, installCategory: 'Tables — Side', installHrsPerItem: 1.00, confidence: 'HIGH', confidenceScore: 91, flagged: false },
    { id: 24, qty: 2, product: 'Solid Surface 36" Round Coffee Tables', kd: false, deliveryCategory: 'Coffee table', deliveryMinPerItem: 45, installCategory: 'Tables — Coffee', installHrsPerItem: 1.50, confidence: 'HIGH', confidenceScore: 90, flagged: false },
];

// ─── Computed totals ─────────────────────────────────────────────────────────
const INSTALL_RATE = 57;
const DELIVERY_RATE_PER_MIN = 0.95;
const INSTALL_TOTAL_HRS = JPS_LINE_ITEMS.reduce((s, i) => s + i.qty * i.installHrsPerItem, 0);
const INSTALL_TOTAL_COST = Math.round(INSTALL_TOTAL_HRS * INSTALL_RATE * 100) / 100;
const DELIVERY_BASE_MIN = JPS_LINE_ITEMS.reduce((s, i) => s + i.qty * i.deliveryMinPerItem, 0);
const SECTION_G_CHARGES = 171 + 114; // trip + hospital
const DELIVERY_TOTAL_COST = Math.round((DELIVERY_BASE_MIN * DELIVERY_RATE_PER_MIN + SECTION_G_CHARGES) * 100) / 100;
const COMBINED_TOTAL = Math.round((INSTALL_TOTAL_COST + DELIVERY_TOTAL_COST) * 100) / 100;
const FLAGGED_COUNT = JPS_LINE_ITEMS.filter(i => i.flagged).length;

// ─── Site constraints ────────────────────────────────────────────────────────
const SITE_CONSTRAINTS = [
    { label: 'Hospital Delivery', active: true },
    { label: 'Elevator Access', active: true },
    { label: 'Dock Available', active: true },
    { label: 'Stairs', active: false },
    { label: 'Above 2nd Floor', active: false },
    { label: 'Overtime', active: false },
];

// ─── Agent Pipelines ─────────────────────────────────────────────────────────

const TRIGGER_AGENTS: AgentVis[] = [
    { name: 'CoreMonitor', detail: 'New estimation request detected — JPS Health Center', visible: false, done: false },
    { name: 'RequestParser', detail: 'Parsing site constraints: hospital, elevator, dock', visible: false, done: false },
    { name: 'EstimatorRouter', detail: 'Assigning to Mark Williams — Dallas office', visible: false, done: false },
    { name: 'JobCreator', detail: 'Estimation job #JPS-116719 created in CORE', visible: false, done: false },
];

const EXTRACTION_AGENTS: AgentVis[] = [
    { name: 'AttachmentPuller', detail: 'Downloading 2 PDFs from CORE attachment store', visible: false, done: false },
    { name: 'PdfExtractor', detail: 'Claude Sonnet 4 reading JPS_116719.pdf — 24 items', visible: false, done: false },
    { name: 'StructuredParser', detail: 'Extracting Qty, Product, Code, KD per row', visible: false, done: false },
    { name: 'DataValidator', detail: '1 quantity mismatch flagged — Selection vs Spec', visible: false, done: false },
];

const MAPPING_AGENTS: AgentVis[] = [
    { name: 'CategoryMapper', detail: 'Cross-referencing 24 products against rate tables', visible: false, done: false },
    { name: 'LookupEngine', detail: '20 items auto-mapped at HIGH confidence (>=90%)', visible: false, done: false },
    { name: 'LlmFallback', detail: '4 unrecognized items processed via AI inference', visible: false, done: false },
    { name: 'ConfidenceScorer', detail: '20 HIGH + 4 LOW — flagging for estimator', visible: false, done: false },
];

const DRAFT_AGENTS: AgentVis[] = [
    { name: 'DraftBuilder', detail: 'Assembling combined estimate — install + delivery', visible: false, done: false },
    { name: 'ExceptionLogger', detail: `${FLAGGED_COUNT} items flagged — scope limit + LOW confidence`, visible: false, done: false },
    { name: 'AuditTrailGenerator', detail: 'Creating decision record for 24 items', visible: false, done: false },
    { name: 'EstimatorNotifier', detail: 'Sending draft review link to Mark Williams', visible: false, done: false },
];

const WRITEBACK_AGENTS: AgentVis[] = [
    { name: 'CoreWriter', detail: `Submitting approved estimate — $${COMBINED_TOTAL.toLocaleString()} lump sum`, visible: false, done: false },
    { name: 'AuditAttacher', detail: 'Uploading audit trail PDF with estimator overrides', visible: false, done: false },
    { name: 'SalespersonNotifier', detail: 'CORE emailing salesperson — service request complete', visible: false, done: false },
];

// ─── Pagination ──────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;

// ═════════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT: WrgLaborEstimation (steps w2.1-w2.5)
// ═════════════════════════════════════════════════════════════════════════════

export default function WrgLaborEstimation({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { currentStep, nextStep, isPaused } = useDemo();
    const stepId = currentStep.id;

    // pauseAware
    const isPausedRef = useRef(isPaused);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
    const pauseAware = useCallback((fn: () => void) => {
        return () => {
            if (!isPausedRef.current) { fn(); return; }
            const poll = setInterval(() => {
                if (!isPausedRef.current) { clearInterval(poll); fn(); }
            }, 200);
        };
    }, []);

    // Timing helper
    const tp = (id: string): WrgStepTiming => WRG_STEP_TIMING[id] || WRG_STEP_TIMING['w2.1'];

    // ── Phase state ──────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<PipelinePhase>('idle');
    const [agents, setAgents] = useState<AgentVis[]>([]);
    const [progress, setProgress] = useState(0);
    const [itemsRevealed, setItemsRevealed] = useState(0);
    const [tablePage, setTablePage] = useState(0);

    // w2.4 specific: dual engine
    const [deliveryProgress, setDeliveryProgress] = useState(0);
    const [installProgress, setInstallProgress] = useState(0);
    const [showScopeAlert, setShowScopeAlert] = useState(false);

    // w2.5 specific: email
    const [emailSent, setEmailSent] = useState(false);

    // ── Step init effect ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!stepId.startsWith('w2.') || stepId === 'w2.6' || stepId === 'w2.7') return;

        // Reset all state
        setPhase('idle');
        setProgress(0);
        setItemsRevealed(0);
        setTablePage(0);
        setDeliveryProgress(0);
        setInstallProgress(0);
        setShowScopeAlert(false);
        setEmailSent(false);

        // Set agents for this step
        const agentMap: Record<string, AgentVis[]> = {
            'w2.1': TRIGGER_AGENTS,
            'w2.2': EXTRACTION_AGENTS,
            'w2.3': MAPPING_AGENTS,
            'w2.5': DRAFT_AGENTS,
        };
        if (agentMap[stepId]) {
            setAgents(agentMap[stepId].map(a => ({ ...a, visible: false, done: false })));
        }

        // Start notification phase
        const t = tp(stepId);
        const timers: ReturnType<typeof setTimeout>[] = [];
        timers.push(setTimeout(pauseAware(() => setPhase('notification')), t.notifDelay));

        return () => timers.forEach(clearTimeout);
    }, [stepId, pauseAware]);

    // ── Notification → processing ────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'notification') return;
        const t = tp(stepId);
        const timer = setTimeout(pauseAware(() => setPhase('processing')), t.notifDuration);
        return () => clearTimeout(timer);
    }, [phase, stepId, pauseAware]);

    // ── Processing: stagger agents + progress bar ────────────────────────────
    useEffect(() => {
        if (phase !== 'processing') return;
        const t = tp(stepId);
        const timers: ReturnType<typeof setTimeout>[] = [];

        if (stepId === 'w2.4') {
            // Dual engine — parallel progress bars
            timers.push(setTimeout(pauseAware(() => setShowScopeAlert(true)), 500));

            // Delivery engine progress
            for (let i = 1; i <= 20; i++) {
                timers.push(setTimeout(pauseAware(() => setDeliveryProgress(i * 5)), 200 * i + 1500));
            }
            // Install engine progress (slightly offset)
            for (let i = 1; i <= 20; i++) {
                timers.push(setTimeout(pauseAware(() => setInstallProgress(i * 5)), 200 * i + 1800));
            }
            timers.push(setTimeout(pauseAware(() => setPhase('breathing')), 6000));
        } else {
            // Agent pipeline stagger
            setAgents(prev => prev.map(a => ({ ...a, visible: false, done: false })));
            setProgress(0);

            const totalAgents = agents.length || 4;
            for (let i = 0; i < totalAgents; i++) {
                timers.push(setTimeout(pauseAware(() => {
                    setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, visible: true } : a));
                }), t.agentStagger * i));
                timers.push(setTimeout(pauseAware(() => {
                    setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, done: true } : a));
                }), t.agentStagger * i + t.agentDone));
            }

            // Progress bar
            const totalTime = t.agentStagger * totalAgents + t.agentDone;
            for (let i = 1; i <= 20; i++) {
                timers.push(setTimeout(pauseAware(() => setProgress(i * 5)), (totalTime / 20) * i));
            }

            timers.push(setTimeout(pauseAware(() => setPhase('breathing')), totalTime + 200));
        }

        return () => timers.forEach(clearTimeout);
    }, [phase, stepId, pauseAware]);

    // ── Breathing → revealed ─────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'breathing') return;
        const t = tp(stepId);
        const timer = setTimeout(pauseAware(() => setPhase('revealed')), t.breathing);
        return () => clearTimeout(timer);
    }, [phase, stepId, pauseAware]);

    // ── Revealed: stagger table rows + auto-advance ──────────────────────────
    useEffect(() => {
        if (phase !== 'revealed') return;
        const t = tp(stepId);
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Stagger table rows for w2.2 and w2.3
        if (stepId === 'w2.2' || stepId === 'w2.3') {
            for (let i = 0; i < Math.min(ITEMS_PER_PAGE, JPS_LINE_ITEMS.length); i++) {
                timers.push(setTimeout(pauseAware(() => setItemsRevealed(i + 1)), 100 * i));
            }
        }

        // w2.5: email animation
        if (stepId === 'w2.5') {
            timers.push(setTimeout(pauseAware(() => setEmailSent(true)), 800));
        }

        // Auto-advance
        if (t.resultsDur > 0) {
            const delay = stepId === 'w2.2' || stepId === 'w2.3'
                ? Math.min(ITEMS_PER_PAGE, JPS_LINE_ITEMS.length) * 100 + t.resultsDur
                : t.resultsDur;
            timers.push(setTimeout(pauseAware(() => nextStep()), delay));
        }

        return () => timers.forEach(clearTimeout);
    }, [phase, stepId, pauseAware, nextStep]);

    // ── Render helpers ───────────────────────────────────────────────────────

    const renderAgentPipeline = (agts: AgentVis[], prog: number, label: string) => (
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
                <AIAgentAvatar />
                <span className="text-xs font-bold text-foreground">{label}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                <div className="h-full rounded-full bg-brand-400 transition-all duration-[3500ms] ease-linear" style={{ width: `${prog}%` }} />
            </div>
            <div className="space-y-1.5">
                {agts.map(agent => (
                    <div key={agent.name} className={`flex items-center gap-2 text-[10px] transition-all duration-300 ${agent.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                        {agent.done ?
                            <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" /> :
                            <ArrowPathIcon className="h-3.5 w-3.5 text-indigo-500 animate-spin shrink-0" />
                        }
                        <span className={agent.done ? 'text-foreground' : 'text-indigo-600 dark:text-indigo-400'}>{agent.name}</span>
                        <span className="text-muted-foreground">{agent.detail}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderNotification = (icon: React.ReactNode, title: string, detail: string) => (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border-2 border-brand-400 dark:border-brand-500/40 shadow-lg shadow-brand-500/10">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand-500 text-zinc-900">{icon}</div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground">{title}</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-500 text-zinc-900 font-bold">Just now</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1">{detail}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const confidenceBadge = (item: JpsLineItem) => (
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
            item.confidence === 'HIGH'
                ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30'
                : 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30'
        }`}>
            {item.confidence} {item.confidenceScore}%
        </span>
    );

    // Pagination
    const totalPages = Math.ceil(JPS_LINE_ITEMS.length / ITEMS_PER_PAGE);
    const pagedItems = JPS_LINE_ITEMS.slice(tablePage * ITEMS_PER_PAGE, (tablePage + 1) * ITEMS_PER_PAGE);

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER
    // ═════════════════════════════════════════════════════════════════════════

    if (!stepId.startsWith('w2.') || stepId === 'w2.6' || stepId === 'w2.7') return null;

    return (
        <div className="p-6 space-y-4 max-w-5xl mx-auto">

            {/* ── w2.1: CORE Trigger & Assignment ── */}
            {stepId === 'w2.1' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <ServerIcon className="h-5 w-5" />,
                        'New Estimation Request — JPS Health Center for Women',
                        'CORE detected an estimating-ready request. Parsing project scope, site constraints, and estimator assignment.'
                    )}

                    {phase === 'notification' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-300">
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Site Constraints</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {SITE_CONSTRAINTS.map(c => (
                                        <div key={c.label} className={`flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded-lg border ${
                                            c.active
                                                ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400'
                                                : 'bg-muted/30 border-border text-muted-foreground'
                                        }`}>
                                            {c.active
                                                ? <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                                : <XMarkIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                            }
                                            {c.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'CORE Trigger & Assignment')}

                    {phase === 'revealed' && (
                        <div className="animate-in fade-in duration-500">
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                    <span className="text-xs font-bold text-foreground">Job Created — JPS-116719</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">ASSIGNED</span>
                                </div>
                                <div className="text-[11px] text-muted-foreground mt-1">
                                    Assigned to Mark Williams (Dallas) — downloading PDFs from CORE...
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w2.2: PDF Ingestion & Data Extraction ── */}
            {stepId === 'w2.2' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <DocumentTextIcon className="h-5 w-5" />,
                        'Extracting Data from JPS_116719.pdf',
                        'Claude Sonnet 4 reading Product Selection Sheet — identifying line items, quantities, and KD flags.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'PDF Ingestion & Data Extraction')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                    <span className="text-xs font-bold text-foreground">24 Line Items Extracted</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">1 MISMATCH</span>
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => setTablePage(p => Math.max(0, p - 1))} disabled={tablePage === 0} className="p-0.5 rounded hover:bg-muted disabled:opacity-30"><ChevronUpIcon className="h-3 w-3" /></button>
                                        <span className="text-[9px] text-muted-foreground">{tablePage + 1}/{totalPages}</span>
                                        <button onClick={() => setTablePage(p => Math.min(totalPages - 1, p + 1))} disabled={tablePage >= totalPages - 1} className="p-0.5 rounded hover:bg-muted disabled:opacity-30"><ChevronDownIcon className="h-3 w-3" /></button>
                                    </div>
                                )}
                            </div>
                            <div className="rounded-lg border border-border overflow-hidden">
                                <table className="w-full text-[10px]">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border">
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-8">#</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-10">Qty</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground">Product</th>
                                            <th className="px-2 py-1.5 text-center font-bold text-muted-foreground w-10">KD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedItems.map((item, idx) => (
                                            <tr
                                                key={item.id}
                                                className={`border-b border-border/50 transition-all duration-200 ${
                                                    phase === 'revealed' && idx < itemsRevealed ? 'opacity-100' : phase === 'breathing' ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            >
                                                <td className="px-2 py-1.5 text-muted-foreground">{item.id}</td>
                                                <td className="px-2 py-1.5 font-medium">{item.qty}</td>
                                                <td className="px-2 py-1.5">{item.product}</td>
                                                <td className="px-2 py-1.5 text-center">
                                                    {item.kd && <span className="text-[8px] px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-bold">KD</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w2.3: Product-to-Category Mapping ── */}
            {stepId === 'w2.3' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <CpuChipIcon className="h-5 w-5" />,
                        'Mapping Products to Labor Categories',
                        'Cross-referencing 24 products against delivery and installation rate tables.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Product-to-Category Mapping')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                    <span className="text-xs font-bold text-foreground">Category Mapping Complete</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">20 HIGH</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">4 LOW</span>
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => setTablePage(p => Math.max(0, p - 1))} disabled={tablePage === 0} className="p-0.5 rounded hover:bg-muted disabled:opacity-30"><ChevronUpIcon className="h-3 w-3" /></button>
                                        <span className="text-[9px] text-muted-foreground">{tablePage + 1}/{totalPages}</span>
                                        <button onClick={() => setTablePage(p => Math.min(totalPages - 1, p + 1))} disabled={tablePage >= totalPages - 1} className="p-0.5 rounded hover:bg-muted disabled:opacity-30"><ChevronDownIcon className="h-3 w-3" /></button>
                                    </div>
                                )}
                            </div>
                            <div className="rounded-lg border border-border overflow-hidden">
                                <table className="w-full text-[10px]">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border">
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-8">#</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-10">Qty</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground">Product</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground">Delivery Cat.</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground">Install Cat.</th>
                                            <th className="px-2 py-1.5 text-center font-bold text-muted-foreground w-20">Confidence</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedItems.map((item, idx) => (
                                            <tr
                                                key={item.id}
                                                className={`border-b border-border/50 transition-all duration-200 ${
                                                    item.flagged ? 'bg-amber-50/50 dark:bg-amber-500/5' : ''
                                                } ${phase === 'revealed' && idx < itemsRevealed ? 'opacity-100' : phase === 'breathing' ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                <td className="px-2 py-1.5 text-muted-foreground">{item.id}</td>
                                                <td className="px-2 py-1.5 font-medium">{item.qty}</td>
                                                <td className="px-2 py-1.5">{item.product}</td>
                                                <td className="px-2 py-1.5 text-muted-foreground">{item.deliveryCategory}</td>
                                                <td className="px-2 py-1.5 text-muted-foreground">{item.installCategory}</td>
                                                <td className="px-2 py-1.5 text-center">{confidenceBadge(item)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w2.4: Dual-Engine Calculation ── */}
            {stepId === 'w2.4' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <CalculatorIcon className="h-5 w-5" />,
                        'Running Dual-Engine Calculation',
                        'Delivery pricing and installation costing engines running in parallel.'
                    )}

                    {/* Scope limit alert */}
                    {(phase === 'processing' || phase === 'breathing' || phase === 'revealed') && showScopeAlert && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-300 dark:border-amber-500/30 flex items-start gap-2">
                                <ExclamationTriangleIcon className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">Scope Limit Alert</span>
                                    <p className="text-[10px] text-amber-700 dark:text-amber-400/80 mt-0.5">
                                        119 KD Task Chairs exceed the 50-chair Delivery Pricer limit. Estimator override will be required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dual engine progress */}
                    {phase === 'processing' && (
                        <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
                            {/* Delivery Engine */}
                            <div className="p-4 rounded-xl bg-card border border-blue-200 dark:border-blue-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Delivery Engine</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 overflow-hidden mb-2">
                                    <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${deliveryProgress}%` }} />
                                </div>
                                <div className="text-[10px] text-muted-foreground space-y-0.5">
                                    <p>Base: {DELIVERY_BASE_MIN} min × $0.95/min</p>
                                    <p>Section G: +${SECTION_G_CHARGES} (trip + hospital)</p>
                                    {deliveryProgress >= 100 && <p className="font-bold text-blue-700 dark:text-blue-400">Total: ${DELIVERY_TOTAL_COST.toLocaleString()}</p>}
                                </div>
                            </div>
                            {/* Installation Engine */}
                            <div className="p-4 rounded-xl bg-card border border-green-200 dark:border-green-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Installation Engine</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-green-100 dark:bg-green-500/10 overflow-hidden mb-2">
                                    <div className="h-full rounded-full bg-green-500 transition-all duration-300" style={{ width: `${installProgress}%` }} />
                                </div>
                                <div className="text-[10px] text-muted-foreground space-y-0.5">
                                    <p>{INSTALL_TOTAL_HRS.toFixed(2)} man-hours × ${INSTALL_RATE}/hr</p>
                                    {installProgress >= 100 && <p className="font-bold text-green-700 dark:text-green-400">Total: ${INSTALL_TOTAL_COST.toLocaleString()}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20">
                                    <div className="text-[10px] text-muted-foreground mb-1">Delivery Total</div>
                                    <div className="text-lg font-bold text-blue-700 dark:text-blue-400">${DELIVERY_TOTAL_COST.toLocaleString()}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                    <div className="text-[10px] text-muted-foreground mb-1">Installation Total</div>
                                    <div className="text-lg font-bold text-green-700 dark:text-green-400">${INSTALL_TOTAL_COST.toLocaleString()}</div>
                                    <div className="text-[10px] text-muted-foreground">{INSTALL_TOTAL_HRS.toFixed(2)} hrs × $57/hr</div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w2.5: Draft Generation & Scope Check ── */}
            {stepId === 'w2.5' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <DocumentArrowDownIcon className="h-5 w-5" />,
                        'Assembling Draft Estimate',
                        'Building line-item breakdown with exception log and audit trail.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Draft Generation & Scope Check')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Summary cards */}
                            <div className="grid grid-cols-4 gap-2">
                                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground uppercase">Installation</div>
                                    <div className="text-sm font-bold text-green-700 dark:text-green-400">${INSTALL_TOTAL_COST.toLocaleString()}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground uppercase">Delivery</div>
                                    <div className="text-sm font-bold text-blue-700 dark:text-blue-400">${DELIVERY_TOTAL_COST.toLocaleString()}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-500/5 border border-brand-300 dark:border-brand-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground uppercase">Combined</div>
                                    <div className="text-sm font-bold text-foreground">${COMBINED_TOTAL.toLocaleString()}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground uppercase">Flagged</div>
                                    <div className="text-sm font-bold text-amber-700 dark:text-amber-400">{FLAGGED_COUNT} items</div>
                                </div>
                            </div>

                            {/* Email notification */}
                            <div className={`flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all duration-500 ${emailSent ? 'opacity-100' : 'opacity-50'}`}>
                                <EnvelopeIcon className={`h-5 w-5 transition-all duration-700 ${emailSent ? 'text-green-500 translate-x-0' : 'text-muted-foreground -translate-x-2'}`} />
                                <div className="flex-1">
                                    <span className="text-[11px] font-bold text-foreground">
                                        {emailSent ? 'Draft sent to Mark Williams' : 'Sending review notification...'}
                                    </span>
                                    <p className="text-[10px] text-muted-foreground">Token-based access link — no login required</p>
                                </div>
                                {emailSent && <CheckCircleIcon className="h-4 w-4 text-green-500 animate-in fade-in duration-300" />}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}


// ═════════════════════════════════════════════════════════════════════════════
// NAMED EXPORT: WrgEstimatorReview (steps w2.6-w2.7)
// Rendered inside Dashboard.tsx follow_up tab
// ═════════════════════════════════════════════════════════════════════════════

export function WrgEstimatorReview({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { currentStep, nextStep, isPaused } = useDemo();

    if (currentStep.id !== 'w2.6' && currentStep.id !== 'w2.7') return null;

    const isD26 = currentStep.id === 'w2.6';
    const isD27 = currentStep.id === 'w2.7';

    // pauseAware
    const isPausedRef = useRef(isPaused);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
    const pauseAware = useCallback((fn: () => void) => {
        return () => {
            if (!isPausedRef.current) { fn(); return; }
            const poll = setInterval(() => {
                if (!isPausedRef.current) { clearInterval(poll); fn(); }
            }, 200);
        };
    }, []);

    // ── w2.6 state ───────────────────────────────────────────────────────────
    const [reviewPhase, setReviewPhase] = useState<ReviewPhase>('idle');
    const [resolvedItems, setResolvedItems] = useState<Record<number, boolean>>({});
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [tablePage, setTablePage] = useState(0);

    // ── w2.7 state ───────────────────────────────────────────────────────────
    const [wbPhase, setWbPhase] = useState<WriteBackPhase>('idle');
    const [wbAgents, setWbAgents] = useState<AgentVis[]>(WRITEBACK_AGENTS.map(a => ({ ...a, visible: false, done: false })));
    const [wbProgress, setWbProgress] = useState(0);
    const [showToast, setShowToast] = useState(false);

    // ── Init effects ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (isD26) {
            setReviewPhase('idle');
            setResolvedItems({});
            setExpandedItem(null);
            setTablePage(0);
            const timer = setTimeout(pauseAware(() => setReviewPhase('notification')), 1500);
            return () => clearTimeout(timer);
        }
    }, [isD26, pauseAware]);

    useEffect(() => {
        if (isD27) {
            setWbPhase('summary');
            setWbAgents(WRITEBACK_AGENTS.map(a => ({ ...a, visible: false, done: false })));
            setWbProgress(0);
            setShowToast(false);
        }
    }, [isD27]);

    // ── Resolve helpers ──────────────────────────────────────────────────────
    const flaggedItems = JPS_LINE_ITEMS.filter(i => i.flagged);
    const resolvedCount = Object.values(resolvedItems).filter(Boolean).length;
    const allResolved = resolvedCount >= flaggedItems.length;
    const nonFlaggedCount = JPS_LINE_ITEMS.length - flaggedItems.length;

    const handleResolve = (id: number) => {
        setResolvedItems(prev => ({ ...prev, [id]: true }));
        setExpandedItem(null);
    };

    // ── w2.7: Submit to CORE ─────────────────────────────────────────────────
    const handleSubmit = () => {
        setWbPhase('submitting');
        setWbAgents(WRITEBACK_AGENTS.map(a => ({ ...a, visible: false, done: false })));
        setWbProgress(0);

        const timers: ReturnType<typeof setTimeout>[] = [];
        // Stagger agents
        for (let i = 0; i < WRITEBACK_AGENTS.length; i++) {
            timers.push(setTimeout(pauseAware(() => {
                setWbAgents(prev => prev.map((a, idx) => idx === i ? { ...a, visible: true } : a));
            }), 800 * i));
            timers.push(setTimeout(pauseAware(() => {
                setWbAgents(prev => prev.map((a, idx) => idx === i ? { ...a, done: true } : a));
            }), 800 * i + 500));
        }
        // Progress
        for (let i = 1; i <= 20; i++) {
            timers.push(setTimeout(pauseAware(() => setWbProgress(i * 5)), 150 * i));
        }
        // Done
        timers.push(setTimeout(pauseAware(() => {
            setWbPhase('done');
            setShowToast(true);
        }), 3000));
        timers.push(setTimeout(pauseAware(() => setShowToast(false)), 6000));
    };

    // ── Pagination ───────────────────────────────────────────────────────────
    const totalPages = Math.ceil(JPS_LINE_ITEMS.length / ITEMS_PER_PAGE);
    const pagedItems = JPS_LINE_ITEMS.slice(tablePage * ITEMS_PER_PAGE, (tablePage + 1) * ITEMS_PER_PAGE);

    // ── Agent pipeline helper ────────────────────────────────────────────────
    const renderAgentPipeline = (agts: AgentVis[], prog: number, label: string) => (
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
                <AIAgentAvatar />
                <span className="text-xs font-bold text-foreground">{label}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                <div className="h-full rounded-full bg-brand-400 transition-all duration-[3500ms] ease-linear" style={{ width: `${prog}%` }} />
            </div>
            <div className="space-y-1.5">
                {agts.map(agent => (
                    <div key={agent.name} className={`flex items-center gap-2 text-[10px] transition-all duration-300 ${agent.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                        {agent.done ?
                            <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" /> :
                            <ArrowPathIcon className="h-3.5 w-3.5 text-indigo-500 animate-spin shrink-0" />
                        }
                        <span className={agent.done ? 'text-foreground' : 'text-indigo-600 dark:text-indigo-400'}>{agent.name}</span>
                        <span className="text-muted-foreground">{agent.detail}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            {/* ── w2.6: Estimator Review ── */}
            {isD26 && (
                <>
                    {/* Notification */}
                    {reviewPhase === 'notification' && (
                        <button onClick={() => setReviewPhase('reviewing')} className="w-full text-left animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-5 bg-brand-50 dark:bg-brand-500/10 border-l-4 border-brand-400 rounded-r-xl">
                                <div className="flex items-start gap-3">
                                    <img src={ESTIMATOR_PHOTO} alt="" className="w-10 h-10 rounded-full ring-2 ring-brand-400" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-foreground">Draft Estimate Ready for Review</span>
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-500 text-zinc-900 font-bold">DRAFT</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mt-1">
                                            JPS Health Center for Women — 24 line items, {FLAGGED_COUNT} flagged for attention
                                        </p>
                                        <p className="text-[10px] text-brand-600 dark:text-brand-400 mt-2 flex items-center gap-1">Click to review <ArrowRightIcon className="h-3 w-3" /></p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    )}

                    {/* Full review table */}
                    {reviewPhase === 'reviewing' && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-foreground">JPS Health Center — Draft Estimate</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
                                        {FLAGGED_COUNT - resolvedCount} PENDING
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground">
                                        {nonFlaggedCount + resolvedCount}/{JPS_LINE_ITEMS.length} approved
                                    </span>
                                    <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                                        <div className="h-full rounded-full bg-green-500 transition-all duration-300" style={{ width: `${((nonFlaggedCount + resolvedCount) / JPS_LINE_ITEMS.length) * 100}%` }} />
                                    </div>
                                </div>
                            </div>

                            {/* Summary row */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground">Installation</div>
                                    <div className="text-xs font-bold text-green-700 dark:text-green-400">${INSTALL_TOTAL_COST.toLocaleString()}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground">Delivery</div>
                                    <div className="text-xs font-bold text-blue-700 dark:text-blue-400">${DELIVERY_TOTAL_COST.toLocaleString()}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-card border border-border text-center">
                                    <div className="text-[9px] text-muted-foreground">Combined</div>
                                    <div className="text-xs font-bold text-foreground">${COMBINED_TOTAL.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="rounded-lg border border-border overflow-hidden">
                                <table className="w-full text-[10px]">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border">
                                            <th className="w-6" />
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-8">#</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-10">Qty</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground">Product</th>
                                            <th className="px-2 py-1.5 text-right font-bold text-muted-foreground w-14">Hrs/u</th>
                                            <th className="px-2 py-1.5 text-right font-bold text-muted-foreground w-16">Total $</th>
                                            <th className="px-2 py-1.5 text-center font-bold text-muted-foreground w-20">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedItems.map(item => {
                                            const isExpanded = expandedItem === item.id;
                                            const isResolved = resolvedItems[item.id];
                                            return (
                                                <React.Fragment key={item.id}>
                                                    <tr
                                                        className={`border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors ${
                                                            item.flagged && !isResolved ? 'bg-amber-50/50 dark:bg-amber-500/5 border-l-2 border-l-amber-400' : ''
                                                        }`}
                                                        onClick={() => item.flagged ? setExpandedItem(isExpanded ? null : item.id) : undefined}
                                                    >
                                                        <td className="px-1 py-1.5 text-center">
                                                            {item.flagged && (
                                                                isExpanded
                                                                    ? <ChevronUpIcon className="h-3 w-3 text-muted-foreground" />
                                                                    : <ChevronDownIcon className="h-3 w-3 text-muted-foreground" />
                                                            )}
                                                        </td>
                                                        <td className="px-2 py-1.5 text-muted-foreground">{item.id}</td>
                                                        <td className="px-2 py-1.5 font-medium">{item.qty}</td>
                                                        <td className="px-2 py-1.5">{item.product}</td>
                                                        <td className="px-2 py-1.5 text-right font-mono">{item.installHrsPerItem.toFixed(2)}</td>
                                                        <td className="px-2 py-1.5 text-right font-mono">${(item.qty * item.installHrsPerItem * INSTALL_RATE).toFixed(0)}</td>
                                                        <td className="px-2 py-1.5 text-center">
                                                            {item.flagged && !isResolved ? (
                                                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold">REVIEW</span>
                                                            ) : (
                                                                <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 mx-auto" />
                                                            )}
                                                        </td>
                                                    </tr>
                                                    {/* Expanded override panel */}
                                                    {isExpanded && item.flagged && !isResolved && (
                                                        <tr className="border-b border-border/50">
                                                            <td colSpan={7} className="p-0">
                                                                <div className="px-4 py-3 bg-amber-50/30 dark:bg-amber-500/5 animate-in fade-in slide-in-from-top-1 duration-200">
                                                                    <div className="flex items-start justify-between gap-4">
                                                                        <div className="flex-1 space-y-1">
                                                                            <div className="text-[10px] font-bold text-amber-800 dark:text-amber-400">
                                                                                <ExclamationTriangleIcon className="h-3 w-3 inline mr-1" />
                                                                                {item.flagReason}
                                                                            </div>
                                                                            <div className="text-[10px] text-muted-foreground">
                                                                                AI mapped to: <span className="font-medium">{item.installCategory}</span> ({item.installHrsPerItem} hrs/unit)
                                                                            </div>
                                                                            <div className="text-[10px] text-muted-foreground">
                                                                                Confidence: <span className={`font-bold ${item.confidence === 'LOW' ? 'text-amber-600' : 'text-green-600'}`}>{item.confidenceScore}%</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => handleResolve(item.id)}
                                                                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-1"
                                                                            >
                                                                                <CheckIcon className="h-3 w-3" /> Approve
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleResolve(item.id)}
                                                                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center gap-1"
                                                                            >
                                                                                <PencilSquareIcon className="h-3 w-3" /> Override
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2">
                                    <button onClick={() => setTablePage(p => Math.max(0, p - 1))} disabled={tablePage === 0} className="p-1 rounded hover:bg-muted disabled:opacity-30"><ChevronUpIcon className="h-3.5 w-3.5" /></button>
                                    <span className="text-[10px] text-muted-foreground font-medium">Page {tablePage + 1} of {totalPages}</span>
                                    <button onClick={() => setTablePage(p => Math.min(totalPages - 1, p + 1))} disabled={tablePage >= totalPages - 1} className="p-1 rounded hover:bg-muted disabled:opacity-30"><ChevronDownIcon className="h-3.5 w-3.5" /></button>
                                </div>
                            )}

                            {/* CTA */}
                            <button
                                onClick={() => { if (allResolved) nextStep(); }}
                                disabled={!allResolved}
                                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                                    allResolved
                                        ? 'bg-brand-400 text-zinc-900 hover:bg-brand-300 shadow-lg shadow-brand-500/20'
                                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                                }`}
                            >
                                {allResolved ? 'Approve & Submit to CORE' : `Resolve ${FLAGGED_COUNT - resolvedCount} remaining items to continue`}
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* ── w2.7: Approval & CORE Write-Back ── */}
            {isD27 && (
                <>
                    {/* Summary comparison */}
                    {(wbPhase === 'summary' || wbPhase === 'done') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            <div className="text-xs font-bold text-foreground">AI Draft vs Estimator Review</div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-muted/30 border border-border text-center">
                                    <div className="text-[9px] text-muted-foreground uppercase mb-1">AI Draft</div>
                                    <div className="text-lg font-bold text-foreground">${COMBINED_TOTAL.toLocaleString()}</div>
                                    <div className="text-[10px] text-muted-foreground">24 items, {FLAGGED_COUNT} flagged</div>
                                </div>
                                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 text-center">
                                    <div className="text-[9px] text-muted-foreground uppercase mb-1">After Review</div>
                                    <div className="text-lg font-bold text-green-700 dark:text-green-400">${COMBINED_TOTAL.toLocaleString()}</div>
                                    <div className="text-[10px] text-muted-foreground">24 approved, {FLAGGED_COUNT} overrides</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit button */}
                    {wbPhase === 'summary' && (
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 rounded-xl text-xs font-bold bg-brand-400 text-zinc-900 hover:bg-brand-300 shadow-lg shadow-brand-500/20 transition-all"
                        >
                            Submit to CORE
                        </button>
                    )}

                    {/* Write-back animation */}
                    {wbPhase === 'submitting' && renderAgentPipeline(wbAgents, wbProgress, 'CORE Write-Back')}

                    {/* Done state */}
                    {wbPhase === 'done' && (
                        <div className="animate-in fade-in scale-in-95 duration-500 space-y-3">
                            {/* Time saved card */}
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-foreground">Estimate Submitted to CORE</div>
                                        <div className="text-[10px] text-muted-foreground mt-1">
                                            90s automated + 4 min review = <span className="font-bold text-foreground">4m 32s total</span>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">
                                            Manual estimate: <span className="font-bold text-foreground">4-8 hours</span>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-brand-400 text-zinc-900">
                                        <div className="text-2xl font-black">85%</div>
                                        <div className="text-[9px] font-bold uppercase tracking-wider">Time Saved</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
                                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                <span className="text-[11px] text-foreground">Salesperson notified — service request marked complete in CORE</span>
                            </div>
                        </div>
                    )}

                    {/* Toast */}
                    {showToast && (
                        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl flex items-center gap-2">
                                <CheckCircleIcon className="h-4 w-4 text-green-400 dark:text-green-600" />
                                <span className="text-xs font-bold">Estimate submitted — Salesperson notified</span>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

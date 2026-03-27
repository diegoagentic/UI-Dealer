// ═══════════════════════════════════════════════════════════════════════════════
// WRG Texas — Flow 4: Quote Assembly & Execution
// Steps: w4.1-w4.4 (WrgAssembly — automated pipeline)
//        w4.5 (WrgAssemblyReview — HITL in Dashboard)
// Data: JPS Health Center for Women — $202,138 combined proposal
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AIAgentAvatar } from './DemoAvatars';
import {
    CheckCircleIcon, ArrowPathIcon, ArrowRightIcon, ArrowDownIcon,
    DocumentTextIcon, CpuChipIcon, DocumentArrowDownIcon,
    ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon,
    UserGroupIcon, ClockIcon, TruckIcon,
} from '@heroicons/react/24/outline';
import { WRG_STEP_TIMING, type WrgStepTiming } from '../../config/profiles/wrg-demo';

// ─── Types ───────────────────────────────────────────────────────────────────
interface AgentVis { name: string; detail: string; visible: boolean; done: boolean }
type PipelinePhase = 'idle' | 'notification' | 'processing' | 'breathing' | 'revealed';
type AssemblyReviewPhase = 'idle' | 'notification' | 'reviewing' | 'submitting' | 'done';

// ─── Agent Pipelines ─────────────────────────────────────────────────────────
const STAGING_AGENTS: AgentVis[] = [
    { name: 'CoreMonitor', detail: 'Approved estimate $15,378 detected', visible: false, done: false },
    { name: 'SalesNotifier', detail: 'Salesperson emailed', visible: false, done: false },
    { name: 'ProductQuoteRetriever', detail: 'MillerKnoll $287,450 list', visible: false, done: false },
    { name: 'QuoteStager', detail: 'Both components staged', visible: false, done: false },
];
const MARKUP_AGENTS: AgentVis[] = [
    { name: 'DiscountResolver', detail: 'JPS contract 38% off list', visible: false, done: false },
    { name: 'LaborMarkupEngine', detail: '15% margin → $17,685', visible: false, done: false },
    { name: 'FreightCalculator', detail: '$6,234 freight', visible: false, done: false },
    { name: 'ProposalAssembler', detail: 'Total $202,138', visible: false, done: false },
];
const PROPOSAL_AGENTS: AgentVis[] = [
    { name: 'TemplateEngine', detail: 'WRG branded template', visible: false, done: false },
    { name: 'TimelineProjector', detail: '8-10 wk standard, 12 wk custom', visible: false, done: false },
    { name: 'TermsAttacher', detail: 'Net 30, 30-day validity', visible: false, done: false },
    { name: 'ProposalPublisher', detail: 'PDF attached to CORE', visible: false, done: false },
];
const EXECUTION_AGENTS: AgentVis[] = [
    { name: 'DeliveryScheduler', detail: '3-phase, 2 floors per phase', visible: false, done: false },
    { name: 'CrewDispatcher', detail: '4-person crew, 3 days', visible: false, done: false },
    { name: 'ProtocolChecker', detail: 'Hospital requirements verified', visible: false, done: false },
    { name: 'CompliancePackager', detail: '47 decisions tracked', visible: false, done: false },
];
const RELEASE_AGENTS: AgentVis[] = [
    { name: 'CoreWriter', detail: 'Proposal written to CORE', visible: false, done: false },
    { name: 'ProposalAttacher', detail: 'PDF + audit trail attached', visible: false, done: false },
    { name: 'ClientNotifier', detail: 'JPS Health Network notified', visible: false, done: false },
];

// ═════════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT: WrgAssembly (steps w4.1-w4.4)
// ═════════════════════════════════════════════════════════════════════════════

export default function WrgAssembly({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const { currentStep, nextStep, isPaused } = useDemo();
    const stepId = currentStep.id;

    // pauseAware
    const isPausedRef = useRef(isPaused);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
    const pauseAware = useCallback((fn: () => void) => {
        return () => {
            if (!isPausedRef.current) { fn(); return; }
            const poll = setInterval(() => { if (!isPausedRef.current) { clearInterval(poll); fn(); } }, 200);
        };
    }, []);

    const tp = (id: string): WrgStepTiming => WRG_STEP_TIMING[id] || WRG_STEP_TIMING['w4.1'];

    // ── Phase state ──────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<PipelinePhase>('idle');
    const [agents, setAgents] = useState<AgentVis[]>([]);
    const [progress, setProgress] = useState(0);

    // ── Step init ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!stepId.startsWith('w4.') || stepId === 'w4.5') return;
        setPhase('idle'); setProgress(0);
        const agentMap: Record<string, AgentVis[]> = { 'w4.1': STAGING_AGENTS, 'w4.2': MARKUP_AGENTS, 'w4.3': PROPOSAL_AGENTS, 'w4.4': EXECUTION_AGENTS };
        if (agentMap[stepId]) setAgents(agentMap[stepId].map(a => ({ ...a, visible: false, done: false })));
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

    // ── Processing: stagger agents + progress ────────────────────────────────
    useEffect(() => {
        if (phase !== 'processing') return;
        const t = tp(stepId);
        const timers: ReturnType<typeof setTimeout>[] = [];
        setAgents(prev => prev.map(a => ({ ...a, visible: false, done: false }))); setProgress(0);
        const totalAgents = agents.length || 4;
        for (let i = 0; i < totalAgents; i++) {
            timers.push(setTimeout(pauseAware(() => { setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, visible: true } : a)); }), t.agentStagger * i));
            timers.push(setTimeout(pauseAware(() => { setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, done: true } : a)); }), t.agentStagger * i + t.agentDone));
        }
        const totalTime = t.agentStagger * totalAgents + t.agentDone;
        for (let i = 1; i <= 20; i++) timers.push(setTimeout(pauseAware(() => setProgress(i * 5)), (totalTime / 20) * i));
        timers.push(setTimeout(pauseAware(() => setPhase('breathing')), totalTime + 200));
        return () => timers.forEach(clearTimeout);
    }, [phase, stepId, pauseAware]);

    // ── Breathing → revealed ─────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'breathing') return;
        const timer = setTimeout(pauseAware(() => setPhase('revealed')), tp(stepId).breathing);
        return () => clearTimeout(timer);
    }, [phase, stepId, pauseAware]);

    // ── Revealed: auto-advance ───────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'revealed') return;
        const t = tp(stepId);
        if (t.resultsDur > 0) { const timer = setTimeout(pauseAware(() => nextStep()), t.resultsDur); return () => clearTimeout(timer); }
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
                        {agent.done ? <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" /> : <ArrowPathIcon className="h-3.5 w-3.5 text-indigo-500 animate-spin shrink-0" />}
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

    // ═══════════════════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════════════════
    if (!stepId.startsWith('w4.') || stepId === 'w4.5') return null;

    return (
        <div className="p-6 space-y-4 max-w-5xl mx-auto">

            {/* ── w4.1: Estimate Approval & Staging ── */}
            {stepId === 'w4.1' && (<>
                {phase === 'notification' && renderNotification(
                    <CheckCircleIcon className="h-5 w-5" />,
                    'Estimate Approved — Staging for Assembly',
                    'Mark Williams submitted approved labor estimate ($15,378). Retrieving MillerKnoll product quote for combined proposal.'
                )}
                {phase === 'processing' && renderAgentPipeline(agents, progress, 'Estimate Approval & Staging')}
                {(phase === 'breathing' || phase === 'revealed') && (
                    <div className="animate-in fade-in duration-500 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Labor Estimate</div>
                                <div className="text-xl font-bold text-green-700 dark:text-green-400">$15,378</div>
                                <div className="text-[10px] text-muted-foreground mt-1">Install $10,547 + Delivery $4,831</div>
                                <div className="mt-2"><span className="text-[9px] px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">MARK WILLIAMS &#10003;</span></div>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20">
                                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Product Quote</div>
                                <div className="text-xl font-bold text-blue-700 dark:text-blue-400">$287,450</div>
                                <div className="mt-1"><span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 font-bold">MILLERKNOLL LIST</span></div>
                                <div className="text-[10px] text-muted-foreground mt-1">24 line items</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 py-1">
                            <ArrowRightIcon className="h-4 w-4 text-brand-500" />
                            <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Ready for Assembly</span>
                            <ArrowRightIcon className="h-4 w-4 text-brand-500" />
                        </div>
                    </div>
                )}
            </>)}

            {/* ── w4.2: Quote Combination & Markup Engine ── */}
            {stepId === 'w4.2' && (<>
                {phase === 'notification' && renderNotification(
                    <CpuChipIcon className="h-5 w-5" />, 'Running Markup Engine',
                    'Applying JPS Health Network contract discount, labor margin, and freight calculation.'
                )}
                {phase === 'processing' && renderAgentPipeline(agents, progress, 'Quote Combination & Markup Engine')}
                {(phase === 'breathing' || phase === 'revealed') && (
                    <div className="animate-in fade-in duration-500 space-y-2">
                        <div className="rounded-xl border border-border overflow-hidden">
                            <div className="p-3 bg-card border-b border-border flex items-center justify-between">
                                <span className="text-[11px] text-muted-foreground">Product List</span>
                                <span className="text-sm font-bold text-foreground">$287,450</span>
                            </div>
                            <div className="px-3 py-1.5 bg-muted/30 border-b border-border flex items-center gap-2">
                                <ArrowDownIcon className="h-3 w-3 text-green-500" />
                                <span className="text-[10px] font-bold text-green-700 dark:text-green-400">JPS Contract -38%</span>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-500/5 border-b border-border flex items-center justify-between">
                                <span className="text-[11px] text-green-700 dark:text-green-400 font-medium">Product Net</span>
                                <span className="text-sm font-bold text-green-700 dark:text-green-400">$178,219</span>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/5 border-b border-border flex items-center justify-between">
                                <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Labor (15% margin)</span>
                                <span className="text-sm font-bold text-blue-700 dark:text-blue-400">$17,685</span>
                            </div>
                            <div className="p-3 bg-card border-b border-border flex items-center justify-between">
                                <span className="text-[11px] text-muted-foreground">Freight</span>
                                <span className="text-sm font-bold text-muted-foreground">$6,234</span>
                            </div>
                            <div className="p-4 bg-brand-50 dark:bg-brand-500/5 border-2 border-brand-400 dark:border-brand-500/40 flex items-center justify-between">
                                <span className="text-xs font-bold text-foreground uppercase tracking-wider">Total</span>
                                <span className="text-xl font-black text-foreground">$202,138</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <span className="text-[9px] px-3 py-1 rounded-full bg-muted text-muted-foreground font-bold uppercase tracking-wider">TAX EXEMPT — Government Healthcare Entity</span>
                        </div>
                    </div>
                )}
            </>)}

            {/* ── w4.3: Client Proposal Generation ── */}
            {stepId === 'w4.3' && (<>
                {phase === 'notification' && renderNotification(
                    <DocumentTextIcon className="h-5 w-5" />, 'Generating Client Proposal',
                    'Building branded WRG proposal with line-item breakdown, timeline, and payment terms.'
                )}
                {phase === 'processing' && renderAgentPipeline(agents, progress, 'Client Proposal Generation')}
                {(phase === 'breathing' || phase === 'revealed') && (
                    <div className="animate-in fade-in duration-500 space-y-3">
                        <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                    <DocumentArrowDownIcon className="h-6 w-6 text-red-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-foreground">Proposal JPS-HCW-2026.pdf</div>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30 font-bold">BRANDED</span>
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-bold">LINE-ITEM</span>
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 font-bold">AUDITED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-border">
                            <div className="text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-wider">Delivery Timeline</div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-foreground font-medium">Standard Items</span>
                                        <span className="text-[10px] text-green-700 dark:text-green-400 font-bold">8-10 weeks</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-green-500" style={{ width: '70%' }} /></div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-foreground font-medium">Custom OFS Coact</span>
                                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold">8-12 weeks</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{ width: '85%' }} /></div>
                                </div>
                            </div>
                            <div className="mt-2"><span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold">OFS Coact: 12-week custom lead time</span></div>
                        </div>
                    </div>
                )}
            </>)}

            {/* ── w4.4: Execution Planning Preview ── */}
            {stepId === 'w4.4' && (<>
                {phase === 'notification' && renderNotification(
                    <TruckIcon className="h-5 w-5" />, 'Generating Execution Plan',
                    '3-phase delivery schedule, crew dispatch, and hospital protocol compliance for JPS Health Center.'
                )}
                {phase === 'processing' && renderAgentPipeline(agents, progress, 'Execution Planning')}
                {(phase === 'breathing' || phase === 'revealed') && (
                    <div className="animate-in fade-in duration-500 space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            {[{ p: 'Phase 1', f: 'Floors 1-2', w: 'Week 8' }, { p: 'Phase 2', f: 'Floors 3-4', w: 'Week 9' }, { p: 'Phase 3', f: 'Floors 5-6', w: 'Week 10' }].map(d => (
                                <div key={d.p} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 text-center">
                                    <div className="text-[9px] text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider">{d.p}</div>
                                    <div className="text-xs font-bold text-foreground mt-1">{d.f}</div>
                                    <div className="text-[10px] text-muted-foreground">{d.w}</div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-border">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                                            <UserGroupIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1">
                                    <span className="text-[11px] font-bold text-foreground">4-person crew &middot; 3 days &middot; 185 man-hours</span>
                                    <div className="mt-1"><span className="text-[8px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 font-bold">HEALTHCARE CERTIFIED</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-card border border-border">
                                <div className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Hospital Protocol</div>
                                <div className="space-y-1">
                                    {['Sterile corridor clearance', 'After-hours dock access', 'Elevator reservation'].map(item => (
                                        <div key={item} className="flex items-center gap-1.5 text-[10px] text-foreground">
                                            <CheckCircleIcon className="h-3 w-3 text-green-500 shrink-0" />{item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-card border border-border">
                                <div className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Audit Trail</div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheckIcon className="h-5 w-5 text-brand-500" />
                                    <div>
                                        <div className="text-sm font-bold text-foreground">47 decisions</div>
                                        <div className="text-[10px] text-muted-foreground">Tracked across all 4 flows</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>)}
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// NAMED EXPORT: WrgAssemblyReview (step w4.5)
// Rendered inside Dashboard.tsx
// ═════════════════════════════════════════════════════════════════════════════

export function WrgAssemblyReview({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const { currentStep, nextStep, isPaused } = useDemo();
    if (currentStep.id !== 'w4.5') return null;

    // pauseAware
    const isPausedRef = useRef(isPaused);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
    const pauseAware = useCallback((fn: () => void) => {
        return () => {
            if (!isPausedRef.current) { fn(); return; }
            const poll = setInterval(() => { if (!isPausedRef.current) { clearInterval(poll); fn(); } }, 200);
        };
    }, []);

    // ── State ────────────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<AssemblyReviewPhase>('idle');
    const [releaseAgents, setReleaseAgents] = useState<AgentVis[]>(RELEASE_AGENTS.map(a => ({ ...a, visible: false, done: false })));
    const [releaseProgress, setReleaseProgress] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [auditExpanded, setAuditExpanded] = useState(false);

    // ── Init ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        setPhase('idle'); setReleaseAgents(RELEASE_AGENTS.map(a => ({ ...a, visible: false, done: false })));
        setReleaseProgress(0); setShowToast(false); setAuditExpanded(false);
        const timer = setTimeout(pauseAware(() => setPhase('notification')), 1500);
        return () => clearTimeout(timer);
    }, [pauseAware]);

    // ── Release handler ──────────────────────────────────────────────────────
    const handleRelease = () => {
        setPhase('submitting');
        setReleaseAgents(RELEASE_AGENTS.map(a => ({ ...a, visible: false, done: false }))); setReleaseProgress(0);
        const timers: ReturnType<typeof setTimeout>[] = [];
        for (let i = 0; i < RELEASE_AGENTS.length; i++) {
            timers.push(setTimeout(pauseAware(() => { setReleaseAgents(prev => prev.map((a, idx) => idx === i ? { ...a, visible: true } : a)); }), 800 * i));
            timers.push(setTimeout(pauseAware(() => { setReleaseAgents(prev => prev.map((a, idx) => idx === i ? { ...a, done: true } : a)); }), 800 * i + 500));
        }
        for (let i = 1; i <= 20; i++) timers.push(setTimeout(pauseAware(() => setReleaseProgress(i * 5)), 150 * i));
        timers.push(setTimeout(pauseAware(() => { setPhase('done'); setShowToast(true); }), 3000));
        timers.push(setTimeout(pauseAware(() => setShowToast(false)), 9000));
    };

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
                        {agent.done ? <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" /> : <ArrowPathIcon className="h-3.5 w-3.5 text-indigo-500 animate-spin shrink-0" />}
                        <span className={agent.done ? 'text-foreground' : 'text-indigo-600 dark:text-indigo-400'}>{agent.name}</span>
                        <span className="text-muted-foreground">{agent.detail}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const AUDIT_FLOWS = [
        { flow: 'Flow 1: Intake & Triage', count: 8 }, { flow: 'Flow 2: Labor Estimation', count: 19 },
        { flow: 'Flow 3: Design Handoff', count: 12 }, { flow: 'Flow 4: Assembly & Execution', count: 8 },
    ];

    return (
        <div className="space-y-4">
            {/* ── Notification ── */}
            {phase === 'notification' && (
                <button onClick={() => setPhase('reviewing')} className="w-full text-left animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-5 bg-brand-50 dark:bg-brand-500/10 border-l-4 border-brand-400 rounded-r-xl">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-brand-500 text-zinc-900"><DocumentTextIcon className="h-5 w-5" /></div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-foreground">Client Proposal Ready for Release</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-500 text-zinc-900 font-bold">FINAL REVIEW</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1">JPS Health Center for Women — $202,138 proposal with execution plan</p>
                                <p className="text-[10px] text-brand-600 dark:text-brand-400 mt-2 flex items-center gap-1">Click to review <ArrowRightIcon className="h-3 w-3" /></p>
                            </div>
                        </div>
                    </div>
                </button>
            )}

            {/* ── Reviewing ── */}
            {(phase === 'reviewing' || phase === 'done') && (
                <div className="animate-in fade-in duration-500 space-y-3">
                    {/* Pricing summary */}
                    <div className="grid grid-cols-4 gap-2">
                        {[{ label: 'Product', val: '$178K' }, { label: 'Labor', val: '$17.7K' }, { label: 'Freight', val: '$6.2K' }].map(c => (
                            <div key={c.label} className="p-3 rounded-lg bg-card border border-border text-center">
                                <div className="text-[9px] text-muted-foreground uppercase">{c.label}</div>
                                <div className="text-sm font-bold text-foreground">{c.val}</div>
                            </div>
                        ))}
                        <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-500/5 border-2 border-brand-400 dark:border-brand-500/40 text-center">
                            <div className="text-[9px] text-muted-foreground uppercase">Total</div>
                            <div className="text-sm font-bold text-foreground">$202K</div>
                        </div>
                    </div>
                    {/* Timeline (read-only) */}
                    <div className="p-3 rounded-lg bg-card border border-border">
                        <div className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Delivery Timeline</div>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <ClockIcon className="h-3 w-3 text-green-500 shrink-0" />
                                <span className="text-[10px] text-foreground">Standard: 8-10 weeks</span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-green-500" style={{ width: '70%' }} /></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="h-3 w-3 text-amber-500 shrink-0" />
                                <span className="text-[10px] text-foreground">Custom OFS: 12 weeks</span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{ width: '85%' }} /></div>
                            </div>
                        </div>
                    </div>
                    {/* Audit accordion */}
                    <div className="rounded-lg border border-border overflow-hidden">
                        <button onClick={() => setAuditExpanded(!auditExpanded)} className="w-full flex items-center justify-between p-3 bg-card hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-2">
                                <ShieldCheckIcon className="h-4 w-4 text-brand-500" />
                                <span className="text-[11px] font-bold text-foreground">Audit Trail — 47 Decisions</span>
                            </div>
                            {auditExpanded ? <ChevronUpIcon className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground" />}
                        </button>
                        {auditExpanded && (
                            <div className="px-3 pb-3 bg-card animate-in fade-in duration-200 space-y-1.5">
                                {AUDIT_FLOWS.map(f => (
                                    <div key={f.flow} className="flex items-center justify-between text-[10px] px-2 py-1.5 rounded bg-muted/30">
                                        <span className="text-foreground">{f.flow}</span>
                                        <span className="font-bold text-muted-foreground">{f.count}</span>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between text-[10px] px-2 py-1.5 rounded bg-brand-50 dark:bg-brand-500/5 border border-brand-300 dark:border-brand-500/30">
                                    <span className="font-bold text-foreground">Total</span>
                                    <span className="font-bold text-foreground">47</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── CTA ── */}
            {phase === 'reviewing' && (
                <button onClick={handleRelease} className="w-full py-3 rounded-xl text-xs font-bold bg-brand-400 text-zinc-900 hover:bg-brand-300 shadow-lg shadow-brand-500/20 transition-all">
                    Release to Client — JPS Health Network
                </button>
            )}

            {/* ── Submitting pipeline ── */}
            {phase === 'submitting' && renderAgentPipeline(releaseAgents, releaseProgress, 'Client Release')}

            {/* ── Done state ── */}
            {phase === 'done' && (
                <div className="animate-in fade-in scale-in-95 duration-500 space-y-3">
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs font-bold text-foreground">Proposal Released to JPS Health Network</div>
                                <div className="text-[10px] text-muted-foreground mt-1">Total process: <span className="font-bold text-foreground">22 minutes</span></div>
                                <div className="text-[10px] text-muted-foreground">Manual process: <span className="font-bold text-foreground">3-5 days</span></div>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-brand-400 text-zinc-900">
                                <div className="text-2xl font-black">92%</div>
                                <div className="text-[9px] font-bold uppercase tracking-wider">Time Saved</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span className="text-[11px] text-foreground">Proposal + audit trail sent to JPS Health Network — execution planning record created</span>
                    </div>
                </div>
            )}

            {/* ── Toast ── */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-400 dark:text-green-600" />
                        <span className="text-xs font-bold">Proposal released — JPS Health Network notified</span>
                    </div>
                </div>
            )}
        </div>
    );
}

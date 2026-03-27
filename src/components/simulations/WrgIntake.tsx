// ═══════════════════════════════════════════════════════════════════════════════
// WRG Texas — Flow 1: Project Intake & Triage
// Steps: w1.1-w1.4 (WrgIntake — automated pipeline overlay on Transactions)
//        w1.5     (WrgIntakeReview — HITL in Dashboard)
//
// Data: JPS Health Center for Women — 14,200 sqft, 6 floors, healthcare vertical
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AIAgentAvatar } from './DemoAvatars';
import {
    CheckCircleIcon,
    ArrowPathIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
    EnvelopeIcon,
    InboxIcon,
    ChartBarIcon,
    UserGroupIcon,
    DocumentTextIcon,
    PaperClipIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { WRG_STEP_TIMING, type WrgStepTiming } from '../../config/profiles/wrg-demo';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgentVis { name: string; detail: string; visible: boolean; done: boolean }

type PipelinePhase = 'idle' | 'email' | 'notification' | 'processing' | 'breathing' | 'revealed';
type IntakeReviewPhase = 'idle' | 'notification' | 'reviewing';

// ─── Agent Pipelines ─────────────────────────────────────────────────────────

const INTAKE_AGENTS: AgentVis[] = [
    { name: 'EmailMonitor', detail: 'Scanning shared inbox for project requests', visible: false, done: false },
    { name: 'AttachmentParser', detail: 'Extracting parameters from 3 attachments', visible: false, done: false },
    { name: 'ProjectProfiler', detail: 'Healthcare, 14,200 sqft, 6 floors', visible: false, done: false },
    { name: 'IntakeCreator', detail: 'JPS-HCW-2026 reference assigned', visible: false, done: false },
];

const SCOPE_AGENTS: AgentVis[] = [
    { name: 'ScopeAnalyzer', detail: '24 product categories, healthcare constraints', visible: false, done: false },
    { name: 'HistoricalMatcher', detail: '12 healthcare precedents found', visible: false, done: false },
    { name: 'ComplexityEngine', detail: 'Score 8.2/10 — 3 risk factors', visible: false, done: false },
    { name: 'RatePredictor', detail: '$9,800–$12,200 predicted range', visible: false, done: false },
];

const ROUTING_AGENTS: AgentVis[] = [
    { name: 'WorkloadAnalyzer', detail: 'Mark: 3 active, Jaime: 5 active', visible: false, done: false },
    { name: 'LocationRouter', detail: 'Dallas 32 mi vs Houston 264 mi', visible: false, done: false },
    { name: 'SkillMatcher', detail: 'Mark 96.3% healthcare accuracy', visible: false, done: false },
    { name: 'AssignmentWriter', detail: 'Assigned to Mark Williams', visible: false, done: false },
];

const BRIEF_AGENTS: AgentVis[] = [
    { name: 'BriefAssembler', detail: 'Compiling scope and constraints', visible: false, done: false },
    { name: 'SmartsheetWriter', detail: 'Row #2026-JPS-HCW created', visible: false, done: false },
    { name: 'CoreRecordCreator', detail: 'CORE #QR-116719 created', visible: false, done: false },
    { name: 'DesignNotifier', detail: 'Sarah Chen notified, HIGH priority', visible: false, done: false },
];

// ─── Mock Data ───────────────────────────────────────────────────────────────

const PIPELINE_PROJECTS = [
    { name: 'JPS Health Center', status: 'Intake', statusDetail: 'Just captured', value: '$202K', color: 'green' },
    { name: 'Parkland Phase 2', status: 'Design', statusDetail: 'With design team', value: '$340K', color: 'blue' },
    { name: 'UTSW Lab Renovation', status: 'Estimating', statusDetail: 'Mark Williams', value: '$95K', color: 'purple' },
    { name: 'Dallas ISD Arts', status: 'Assembly', statusDetail: 'Quote in progress', value: '$180K', color: 'indigo' },
    { name: 'Tarrant County', status: 'Complete', statusDetail: 'Delivered', value: '$127K', color: 'zinc' },
];

const HISTORICAL_PRECEDENTS = [
    { name: 'JPS Psychiatric Wing', cost: '$8,900', similarity: 92 },
    { name: 'Baylor Heart Center', cost: '$11,200', similarity: 87 },
    { name: 'Methodist Midlothian', cost: '$9,400', similarity: 84 },
];

const RISK_FACTORS = [
    { label: 'Hospital Protocol', detail: 'Sterile corridor, after-hours dock' },
    { label: 'Scope Limits', detail: '119 task chairs exceed 50-chair limit' },
    { label: 'Custom Assembly', detail: 'OFS Coact Serpentine — 12-seat ganged' },
];

// ─── Email mock data ─────────────────────────────────────────────────────────

const INBOX_EMAILS = [
    { sender: 'Herman Miller Support', subject: 'Catalog Update Q2 — Ergonomic Series pricing', time: '8:15 AM' },
    { sender: 'Mark Williams', subject: 'RE: Parkland Phase 2 — Final estimate submitted', time: 'Yesterday' },
    { sender: 'Smartsheet Notification', subject: 'Row Updated: UTSW Lab Renovation #2026-UTX', time: 'Yesterday' },
];

const JPS_EMAIL = {
    sender: 'Jennifer Martinez',
    senderTitle: 'Facilities Director, JPS Health Network',
    senderEmail: 'jmartinez@jpshealthnet.org',
    subject: 'Furniture Procurement Request — Women\'s Health Center Wing',
    attachments: [
        { name: 'JPS_Floor_Plans.pdf', pages: '24 pages' },
        { name: 'JPS_Spec_Narrative.pdf', pages: '12 pages' },
        { name: 'JPS_Site_Requirements.pdf', pages: '8 pages' },
    ],
};

// ─── Render helper ───────────────────────────────────────────────────────────

function renderAgentPipeline(agents: AgentVis[], progress: number, label: string) {
    return (
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
                <AIAgentAvatar />
                <span className="text-xs font-bold text-foreground">{label}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                <div className="h-full rounded-full bg-brand-400 transition-all duration-[3500ms] ease-linear" style={{ width: `${progress}%` }} />
            </div>
            <div className="space-y-1.5">
                {agents.map(agent => (
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
}

function renderNotification(icon: React.ReactNode, title: string, detail: string) {
    return (
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
}

// ─── Color helper for pipeline cards ─────────────────────────────────────────

const statusColors: Record<string, string> = {
    green: 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
    blue: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    purple: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
    indigo: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
    zinc: 'bg-zinc-100 dark:bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-500/20',
};

// ═════════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT: WrgIntake (steps w1.1-w1.4)
// Rendered as overlay on Transactions
// ═════════════════════════════════════════════════════════════════════════════

export default function WrgIntake({ onNavigate }: { onNavigate?: (page: string) => void }) {
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
    const tp = (id: string): WrgStepTiming => WRG_STEP_TIMING[id] || WRG_STEP_TIMING['w1.1'];

    // ── Phase state ──────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<PipelinePhase>('idle');
    const [agents, setAgents] = useState<AgentVis[]>([]);
    const [progress, setProgress] = useState(0);

    // w1.1: email sub-phases (0=empty, 1=inbox, 2=new arrives, 3=open, 4=AI detected)
    const [emailSubPhase, setEmailSubPhase] = useState(0);
    // w1.4 specific: email animation
    const [emailSent, setEmailSent] = useState(false);

    // ── Step init effect ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!stepId.startsWith('w1.') || stepId === 'w1.5') return;

        // Reset all state
        setPhase('idle');
        setProgress(0);
        setEmailSent(false);
        setEmailSubPhase(0);

        // Set agents for this step
        const agentMap: Record<string, AgentVis[]> = {
            'w1.1': INTAKE_AGENTS,
            'w1.2': SCOPE_AGENTS,
            'w1.3': ROUTING_AGENTS,
            'w1.4': BRIEF_AGENTS,
        };
        if (agentMap[stepId]) {
            setAgents(agentMap[stepId].map(a => ({ ...a, visible: false, done: false })));
        }

        const timers: ReturnType<typeof setTimeout>[] = [];

        // w1.1: start with email phase instead of notification
        if (stepId === 'w1.1') {
            timers.push(setTimeout(pauseAware(() => setPhase('email')), 800));
        } else {
            // Other steps: start notification phase
            const t = tp(stepId);
            timers.push(setTimeout(pauseAware(() => setPhase('notification')), t.notifDelay));
        }

        return () => timers.forEach(clearTimeout);
    }, [stepId, pauseAware]);

    // ── Email phase: sub-phase progression (w1.1 only) ─────────────────────────
    useEffect(() => {
        if (phase !== 'email' || stepId !== 'w1.1') return;
        const timers: ReturnType<typeof setTimeout>[] = [];

        // 0→1: show existing inbox emails
        timers.push(setTimeout(pauseAware(() => setEmailSubPhase(1)), 600));
        // 1→2: new JPS email slides in at top
        timers.push(setTimeout(pauseAware(() => setEmailSubPhase(2)), 2200));
        // 2→3: email auto-opens to show body
        timers.push(setTimeout(pauseAware(() => setEmailSubPhase(3)), 4200));
        // 3→4: AI detection badge appears
        timers.push(setTimeout(pauseAware(() => setEmailSubPhase(4)), 7200));
        // 4→notification: transition to agent pipeline
        timers.push(setTimeout(pauseAware(() => setPhase('notification')), 9000));

        return () => timers.forEach(clearTimeout);
    }, [phase, stepId, pauseAware]);

    // ── Notification -> processing ────────────────────────────────────────────
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

        return () => timers.forEach(clearTimeout);
    }, [phase, stepId, pauseAware]);

    // ── Breathing -> revealed ─────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'breathing') return;
        const t = tp(stepId);
        const timer = setTimeout(pauseAware(() => setPhase('revealed')), t.breathing);
        return () => clearTimeout(timer);
    }, [phase, stepId, pauseAware]);

    // ── Revealed: auto-advance ────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'revealed') return;
        const t = tp(stepId);
        const timers: ReturnType<typeof setTimeout>[] = [];

        // w1.4: email animation
        if (stepId === 'w1.4') {
            timers.push(setTimeout(pauseAware(() => setEmailSent(true)), 800));
        }

        // Auto-advance
        if (t.resultsDur > 0) {
            timers.push(setTimeout(pauseAware(() => nextStep()), t.resultsDur));
        }

        return () => timers.forEach(clearTimeout);
    }, [phase, stepId, pauseAware, nextStep]);

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER
    // ═════════════════════════════════════════════════════════════════════════

    if (!stepId.startsWith('w1.') || stepId === 'w1.5') return null;

    return (
        <div className="p-6 space-y-4 max-w-5xl mx-auto">

            {/* ── w1.1: Client Request Capture ── */}
            {stepId === 'w1.1' && (
                <>
                    {/* EMAIL PHASE: Inbox → email arrives → opens → AI detects */}
                    {phase === 'email' && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Shared Inbox card */}
                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <EnvelopeIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">WRG Shared Inbox</span>
                                    {emailSubPhase >= 2 && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-bold animate-in fade-in duration-300">1 new</span>
                                    )}
                                </div>

                                {/* New JPS email — slides in when emailSubPhase >= 2 */}
                                {emailSubPhase >= 2 && (
                                    <div className="mb-1.5">
                                        {emailSubPhase < 3 ? (
                                            /* Compact unread row */
                                            <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 animate-in slide-in-from-top-4 fade-in duration-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[11px] font-bold text-foreground">Jennifer Martinez</span>
                                                        <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold">Just now</span>
                                                    </div>
                                                    <div className="text-[10px] font-semibold text-foreground truncate">{JPS_EMAIL.subject}</div>
                                                    <div className="text-[10px] text-muted-foreground truncate">Dear WRG Team, we are requesting furniture procurement services for our new...</div>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1.5 shrink-0">
                                                    <PaperClipIcon className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-[9px] text-muted-foreground">3</span>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Expanded email body */
                                            <div className="rounded-lg border border-blue-200 dark:border-blue-500/20 overflow-hidden animate-in fade-in duration-400">
                                                {/* Email header */}
                                                <div className="px-4 py-3 bg-blue-50 dark:bg-blue-500/5 border-b border-blue-100 dark:border-blue-500/10">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-700 dark:text-blue-400">JM</div>
                                                            <div>
                                                                <span className="text-[11px] font-bold text-foreground">{JPS_EMAIL.sender}</span>
                                                                <div className="text-[9px] text-muted-foreground">{JPS_EMAIL.senderTitle}</div>
                                                            </div>
                                                        </div>
                                                        <span className="text-[9px] text-muted-foreground">Just now</span>
                                                    </div>
                                                    <div className="text-[9px] text-muted-foreground ml-10">To: intake@wrgtexas.com</div>
                                                </div>

                                                {/* Email body */}
                                                <div className="px-4 py-3 bg-card">
                                                    <div className="text-[11px] font-semibold text-foreground mb-2">{JPS_EMAIL.subject}</div>
                                                    <div className="text-[10px] text-muted-foreground leading-relaxed space-y-2">
                                                        <p>Dear WRG Team,</p>
                                                        <p>We are requesting furniture procurement services for our new Women's Health Center wing at JPS Health Network.</p>
                                                        <div>
                                                            <p className="font-semibold text-foreground mb-1">Project Scope:</p>
                                                            <ul className="space-y-0.5 ml-3">
                                                                <li className="flex items-center gap-1.5">
                                                                    <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                                                                    Total area: <strong className="text-foreground">14,200 sqft</strong> across <strong className="text-foreground">6 floors</strong>
                                                                </li>
                                                                <li className="flex items-center gap-1.5">
                                                                    <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                                                                    Primary manufacturer: <strong className="text-foreground">MillerKnoll</strong>
                                                                </li>
                                                                <li className="flex items-center gap-1.5">
                                                                    <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                                                                    Vertical: <strong className="text-foreground">Healthcare</strong> (hospital delivery site)
                                                                </li>
                                                                <li className="flex items-center gap-1.5">
                                                                    <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                                                                    Special: sterile corridor access, after-hours dock scheduling
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <p>Please find the attached documents for your review. We look forward to your proposal.</p>
                                                        <p className="pt-1 text-[10px]">
                                                            Best regards,<br />
                                                            <strong className="text-foreground">Jennifer Martinez</strong><br />
                                                            Facilities Director, JPS Health Network
                                                        </p>
                                                    </div>

                                                    {/* Attachments */}
                                                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
                                                        {JPS_EMAIL.attachments.map((att, i) => (
                                                            <div
                                                                key={att.name}
                                                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/30 border border-border animate-in fade-in duration-300"
                                                                style={{ animationDelay: `${i * 150}ms` }}
                                                            >
                                                                <DocumentTextIcon className="h-4 w-4 text-red-500 shrink-0" />
                                                                <div>
                                                                    <div className="text-[9px] font-medium text-foreground">{att.name}</div>
                                                                    <div className="text-[8px] text-muted-foreground">{att.pages}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Existing read emails — visible when emailSubPhase >= 1 */}
                                {emailSubPhase >= 1 && (
                                    <div className={`space-y-1 ${emailSubPhase < 2 ? 'animate-in fade-in duration-300' : ''}`}>
                                        {INBOX_EMAILS.map((email, i) => (
                                            <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-muted/20 border border-border/50 opacity-60">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] text-muted-foreground">{email.sender}</span>
                                                        <span className="text-[9px] text-muted-foreground">{email.time}</span>
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground truncate">{email.subject}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* AI Detection badge — appears at emailSubPhase 4 */}
                            {emailSubPhase >= 4 && (
                                <div className="flex justify-center animate-in fade-in zoom-in-95 duration-500">
                                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border-2 border-brand-400 dark:border-brand-500/40 shadow-lg shadow-brand-500/20">
                                        <AIAgentAvatar />
                                        <span className="text-[11px] font-bold text-foreground">EmailMonitor — New project request detected</span>
                                        <SparklesIcon className="h-4 w-4 text-brand-500 animate-pulse" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {phase === 'notification' && renderNotification(
                        <InboxIcon className="h-5 w-5" />,
                        'Extracting Project Parameters',
                        'JPS Health Network — Women\'s Health Center wing. Parsing 3 attachments for scope, manufacturer specs, and site constraints.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Client Request Capture')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Parameter grid */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Extracted Parameters</div>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 font-bold">FROM EMAIL + 3 PDFs</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mb-3">AI parsed the email body and 3 attachments to build a structured project profile automatically</p>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                                        <div className="text-[9px] text-muted-foreground uppercase">Project</div>
                                        <div className="text-[11px] font-bold text-foreground mt-0.5">JPS Health Center for Women</div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                                        <div className="text-[9px] text-muted-foreground uppercase">Vertical</div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-[11px] font-bold text-foreground">Healthcare</span>
                                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 font-bold">HC</span>
                                        </div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                                        <div className="text-[9px] text-muted-foreground uppercase">Area</div>
                                        <div className="text-[11px] font-bold text-foreground mt-0.5">14,200 sqft</div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                                        <div className="text-[9px] text-muted-foreground uppercase">Floors</div>
                                        <div className="text-[11px] font-bold text-foreground mt-0.5">6</div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                                        <div className="text-[9px] text-muted-foreground uppercase">Primary Mfr</div>
                                        <div className="text-[11px] font-bold text-foreground mt-0.5">MillerKnoll</div>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                                        <div className="text-[9px] text-muted-foreground uppercase">Site</div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-[11px] font-bold text-foreground">Hospital delivery</span>
                                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold">HOSP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pipeline — project registered */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Project Registered in Pipeline</div>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30 font-bold">5 ACTIVE</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mb-3">JPS is now tracked in WRG's project pipeline alongside 4 projects already in progress</p>
                                <div className="space-y-1.5">
                                    {PIPELINE_PROJECTS.map((p, i) => (
                                        <div
                                            key={p.name}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-300 ${
                                                i === 0
                                                    ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-400 dark:border-brand-500/40 ring-1 ring-brand-400/30'
                                                    : 'bg-muted/20 border-border'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />}
                                                <div>
                                                    <span className={`text-[11px] font-medium ${i === 0 ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>{p.name}</span>
                                                    <div className={`text-[9px] ${i === 0 ? 'text-brand-600 dark:text-brand-400' : 'text-muted-foreground/70'}`}>{p.statusDetail}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${statusColors[p.color]}`}>{p.status}</span>
                                                <span className="text-[10px] font-mono text-muted-foreground">{p.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w1.2: Scope Analysis & Complexity Scoring ── */}
            {stepId === 'w1.2' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <ChartBarIcon className="h-5 w-5" />,
                        'Analyzing Scope & Complexity',
                        'Cross-referencing JPS against 340 historical projects. Evaluating risk factors and predicting labor range.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Scope Analysis & Complexity Scoring')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Complexity score card */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-wider">Complexity Score</div>
                                <div className="flex items-center gap-4">
                                    {/* Circular score */}
                                    <div className="relative w-20 h-20 shrink-0">
                                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                            <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                                            <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6"
                                                className="text-amber-500"
                                                strokeDasharray={`${2 * Math.PI * 34 * 0.82} ${2 * Math.PI * 34 * 0.18}`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-black text-foreground">8.2</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        {RISK_FACTORS.map(rf => (
                                            <div key={rf.label} className="flex items-center gap-2">
                                                <ExclamationTriangleIcon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                                <span className="text-[10px] font-bold text-foreground">{rf.label}</span>
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold">WARNING</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Historical precedents */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-wider">Historical Precedents</div>
                                <div className="space-y-1.5">
                                    {HISTORICAL_PRECEDENTS.map(hp => (
                                        <div key={hp.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/20 border border-border">
                                            <span className="text-[11px] text-foreground">{hp.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono font-bold text-foreground">{hp.cost}</span>
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                                                    hp.similarity >= 90
                                                        ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30'
                                                        : 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
                                                }`}>{hp.similarity}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Predicted range */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Predicted Labor Range</span>
                                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 font-bold">RATE INTELLIGENCE</span>
                                </div>
                                <div className="relative h-6 rounded-full bg-muted/30 overflow-hidden">
                                    <div className="absolute inset-y-0 left-[30%] right-[20%] rounded-full bg-gradient-to-r from-green-400/30 via-brand-400/40 to-amber-400/30 border border-brand-400/30" />
                                    <div className="absolute inset-y-0 left-[30%] flex items-center">
                                        <span className="text-[10px] font-bold text-foreground ml-2">$9,800</span>
                                    </div>
                                    <div className="absolute inset-y-0 right-[20%] flex items-center">
                                        <span className="text-[10px] font-bold text-foreground mr-2">$12,200</span>
                                    </div>
                                </div>
                                <div className="text-[10px] text-muted-foreground mt-1.5">Based on 12 healthcare precedents (avg similarity 88%)</div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w1.3: Estimator Assignment & Routing ── */}
            {stepId === 'w1.3' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <UserGroupIcon className="h-5 w-5" />,
                        'Routing to Optimal Estimator',
                        'Evaluating estimator workload, location proximity, and healthcare specialization.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Estimator Assignment & Routing')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500">
                            <div className="grid grid-cols-2 gap-3">
                                {/* Mark Williams — ASSIGNED */}
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-500/20 flex items-center justify-center text-sm font-black text-green-700 dark:text-green-400 ring-2 ring-green-400">MW</div>
                                        <div>
                                            <div className="text-[11px] font-bold text-foreground">Mark Williams</div>
                                            <div className="text-[10px] text-muted-foreground">Dallas — 32 mi</div>
                                        </div>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 ml-auto" />
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[9px] text-muted-foreground">Workload: 3 active</span>
                                                <span className="text-[9px] font-bold text-green-700 dark:text-green-400">60%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-green-100 dark:bg-green-500/10 overflow-hidden">
                                                <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: '60%' }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-muted-foreground">Healthcare Accuracy</span>
                                            <span className="text-[10px] font-bold text-green-700 dark:text-green-400">96.3%</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">ASSIGNED</span>
                                    </div>
                                </div>

                                {/* Jaime Gonzalez — not selected */}
                                <div className="p-4 rounded-xl bg-card border border-border opacity-50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-black text-zinc-600 dark:text-zinc-400">JG</div>
                                        <div>
                                            <div className="text-[11px] font-bold text-foreground">Jaime Gonzalez</div>
                                            <div className="text-[10px] text-muted-foreground">Houston — 264 mi</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[9px] text-muted-foreground">Workload: 5 active</span>
                                                <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400">100%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-amber-100 dark:bg-amber-500/10 overflow-hidden">
                                                <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-muted-foreground">Healthcare Accuracy</span>
                                            <span className="text-[10px] font-bold text-muted-foreground">91.1%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w1.4: Design Brief & CORE Record ── */}
            {stepId === 'w1.4' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <DocumentTextIcon className="h-5 w-5" />,
                        'Assembling Design Brief',
                        'Compiling scope, constraints, and manufacturer specs. Creating Smartsheet row and CORE quote request.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Design Brief & CORE Record')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Routing flow badges */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-wider">Record Routing</div>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-[9px] px-2.5 py-1.5 rounded-lg bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 font-bold">INTAKE CAPTURED</span>
                                    <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-[9px] px-2.5 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-bold">SMARTSHEET #2026-JPS-HCW</span>
                                    <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-[9px] px-2.5 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 font-bold">CORE #QR-116719</span>
                                </div>
                            </div>

                            {/* Assignment notification */}
                            <div className={`flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all duration-500 ${emailSent ? 'opacity-100' : 'opacity-50'}`}>
                                <EnvelopeIcon className={`h-5 w-5 transition-all duration-700 ${emailSent ? 'text-green-500 translate-x-0' : 'text-muted-foreground -translate-x-2'}`} />
                                <div className="flex-1">
                                    <span className="text-[11px] font-bold text-foreground">
                                        {emailSent ? 'Design Team notified — Sarah Chen' : 'Sending design notification...'}
                                    </span>
                                    <p className="text-[10px] text-muted-foreground">
                                        Priority: <span className="font-bold text-red-600 dark:text-red-400">HIGH</span>
                                    </p>
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
// NAMED EXPORT: WrgIntakeReview (step w1.5)
// Rendered inside Dashboard.tsx
// ═════════════════════════════════════════════════════════════════════════════

export function WrgIntakeReview({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const { currentStep, nextStep, isPaused } = useDemo();

    if (currentStep.id !== 'w1.5') return null;

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

    // ── Phase state ──────────────────────────────────────────────────────────
    const [reviewPhase, setReviewPhase] = useState<IntakeReviewPhase>('idle');

    // ── Init effect ──────────────────────────────────────────────────────────
    useEffect(() => {
        setReviewPhase('idle');
        const timer = setTimeout(pauseAware(() => setReviewPhase('notification')), 2000);
        return () => clearTimeout(timer);
    }, [pauseAware]);

    return (
        <div className="space-y-4">
            {/* Notification */}
            {reviewPhase === 'notification' && (
                <button onClick={() => setReviewPhase('reviewing')} className="w-full text-left animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-5 bg-brand-50 dark:bg-brand-500/10 border-l-4 border-brand-400 rounded-r-xl">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-brand-500 text-zinc-900">
                                <InboxIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-foreground">Intake Summary Ready — JPS Health Center</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">ACTION REQUIRED</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1">
                                    AI-generated intake — complexity 8.2/10, assigned to Mark Williams, 5 active pipeline projects
                                </p>
                                <p className="text-[10px] text-brand-600 dark:text-brand-400 mt-2 flex items-center gap-1">Click to review <ArrowRightIcon className="h-3 w-3" /></p>
                            </div>
                        </div>
                    </div>
                </button>
            )}

            {/* Full review */}
            {reviewPhase === 'reviewing' && (
                <div className="animate-in fade-in duration-500 space-y-4">
                    {/* Summary grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-card border border-border text-center">
                            <div className="text-[9px] text-muted-foreground uppercase">Project Value</div>
                            <div className="text-sm font-bold text-foreground">$202K</div>
                            <div className="text-[10px] text-muted-foreground">14,200 sqft, 6 floors</div>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 text-center">
                            <div className="text-[9px] text-muted-foreground uppercase">Complexity</div>
                            <div className="text-sm font-bold text-amber-700 dark:text-amber-400">8.2 / 10</div>
                            <div className="text-[10px] text-muted-foreground">3 risk factors</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 text-center">
                            <div className="text-[9px] text-muted-foreground uppercase">Estimator</div>
                            <div className="text-sm font-bold text-green-700 dark:text-green-400">Mark Williams</div>
                            <div className="text-[10px] text-muted-foreground">Dallas, 96.3% accuracy</div>
                        </div>
                    </div>

                    {/* Pipeline mini-kanban */}
                    <div className="p-4 rounded-xl bg-card border border-border">
                        <div className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Pipeline Position</div>
                        <div className="flex gap-2">
                            {PIPELINE_PROJECTS.map((p, i) => (
                                <div
                                    key={p.name}
                                    className={`flex-1 p-2 rounded-lg border text-center text-[9px] ${
                                        i === 0
                                            ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-400 dark:border-brand-500/40 font-bold text-foreground'
                                            : 'bg-muted/20 border-border text-muted-foreground'
                                    }`}
                                >
                                    <div className="truncate">{p.name}</div>
                                    <div className={`text-[8px] mt-0.5 px-1 py-0.5 rounded ${statusColors[p.color]} border font-bold inline-block`}>{p.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risk factors */}
                    <div className="p-4 rounded-xl bg-card border border-border">
                        <div className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Risk Factors</div>
                        <div className="space-y-1.5">
                            {RISK_FACTORS.map(rf => (
                                <div key={rf.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/20">
                                    <ExclamationTriangleIcon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                    <span className="text-[10px] font-bold text-foreground">{rf.label}</span>
                                    <span className="text-[10px] text-muted-foreground">— {rf.detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => nextStep()}
                        className="w-full py-3 rounded-xl text-xs font-bold bg-brand-400 text-zinc-900 hover:bg-brand-300 shadow-lg shadow-brand-500/20 transition-all"
                    >
                        Confirm & Proceed to Design
                    </button>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WRG Texas — Flow 3: Design-to-Estimate Handoff
// Steps: w3.1-w3.4 (WrgHandoff — automated pipeline)
//        w3.5     (WrgHandoffReview — HITL in Dashboard)
//
// Data: JPS Health Center for Women — design package validation & handoff
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
    EnvelopeIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CheckIcon,
    ShieldCheckIcon,
    ClipboardDocumentCheckIcon,
    TableCellsIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { WRG_STEP_TIMING, type WrgStepTiming } from '../../config/profiles/wrg-demo';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgentVis { name: string; detail: string; visible: boolean; done: boolean }

type PipelinePhase = 'idle' | 'notification' | 'processing' | 'breathing' | 'revealed';
type HandoffReviewPhase = 'idle' | 'notification' | 'reviewing';

// ─── Agent Pipelines ─────────────────────────────────────────────────────────

const UPLOAD_AGENTS: AgentVis[] = [
    { name: 'UploadMonitor', detail: '2 PDFs detected in CORE', visible: false, done: false },
    { name: 'FormatValidator', detail: 'PDF/A compliant, 24 pages', visible: false, done: false },
    { name: 'DesignerVerifier', detail: 'Sarah Chen confirmed', visible: false, done: false },
    { name: 'AuditLogger', detail: 'File hashes captured', visible: false, done: false },
];

const COMPLETENESS_AGENTS: AgentVis[] = [
    { name: 'CompletenessChecker', detail: '8-point checklist running', visible: false, done: false },
    { name: 'CrossDocVerifier', detail: '23/24 match, 1 discrepancy', visible: false, done: false },
    { name: 'FloorCoverageAnalyzer', detail: 'Floor 4 gap detected', visible: false, done: false },
    { name: 'ConstraintValidator', detail: 'Hospital protocol confirmed', visible: false, done: false },
];

const CATALOG_AGENTS: AgentVis[] = [
    { name: 'CatalogVerifier', detail: '24 products cross-referenced', visible: false, done: false },
    { name: 'PricingChecker', detail: '22/24 confirmed', visible: false, done: false },
    { name: 'LeadTimeAnalyzer', detail: 'OFS custom 12-week lead', visible: false, done: false },
    { name: 'SkuValidator', detail: 'NC-2240 → NC-2250 (+$85)', visible: false, done: false },
];

const HANDOFF_AGENTS: AgentVis[] = [
    { name: 'AssignmentConfirmer', detail: 'Mark Williams confirmed', visible: false, done: false },
    { name: 'HandoffAssembler', detail: 'Compiling validated documents', visible: false, done: false },
    { name: 'PredictionAttacher', detail: '$9.8K-$12.2K range attached', visible: false, done: false },
    { name: 'EstimatorNotifier', detail: 'Email sent to Mark Williams', visible: false, done: false },
];

// ─── Mock Data ───────────────────────────────────────────────────────────────

const CHECKLIST_ITEMS = [
    { label: 'Manufacturer codes present', passed: true },
    { label: 'Quantities specified', passed: true },
    { label: 'KD flags documented', passed: true },
    { label: 'Floor assignments (1-3, 5-6)', passed: true },
    { label: 'Floor 4: 2 items missing room assignment', passed: false },
    { label: 'Site constraints documented', passed: true },
    { label: 'Spec sheet format valid', passed: true },
    { label: 'Selection sheet format valid', passed: true },
];

const CATALOG_ITEMS = [
    { id: 1, product: 'Healthcare Guest Chair - Small Frame', manufacturer: 'Nemschoff', status: 'verified' as const },
    { id: 2, product: 'KD SOI Amplify Task Chair', manufacturer: 'Herman Miller', status: 'verified' as const },
    { id: 3, product: 'Plastic Stacking Chair', manufacturer: 'Herman Miller', status: 'verified' as const },
    { id: 4, product: 'Healthcare Lounge Chair', manufacturer: 'Nemschoff', status: 'verified' as const },
    { id: 5, product: 'OFS Coact Serpentine Lounge', manufacturer: 'OFS', status: 'flagged' as const, flag: 'CUSTOM CONFIG', flagDetail: '12-week lead time' },
    { id: 6, product: 'Nemschoff NC-2240 Recliner', manufacturer: 'Nemschoff', status: 'flagged' as const, flag: 'DISCONTINUED', flagDetail: '→ NC-2250 (+$85/unit)' },
    { id: 7, product: 'Glassboard 36x48', manufacturer: 'Clarus', status: 'verified' as const },
    { id: 8, product: '24x72 Training Table', manufacturer: 'Herman Miller', status: 'verified' as const },
];

const HANDOFF_PACKAGE_ITEMS = [
    'Validated Spec Sheet (12p)',
    'Validated Selection Sheet (12p)',
    'Completeness Checklist (7/8)',
    'Catalog Cross-Reference Report',
    'Complexity Score: 8.2/10',
    'Labor Prediction: $9.8K-$12.2K',
];

const FLAGGED_REVIEW_ITEMS = [
    { id: 1, title: 'Quantity Discrepancy', detail: 'Plastic Stacking Chairs: Spec=19, Selection=20 — cross-document mismatch', type: 'discrepancy' },
    { id: 2, title: 'Custom Configuration Lead Time', detail: 'OFS Coact Serpentine Lounge — 12-week lead time, custom config', type: 'catalog' },
    { id: 3, title: 'Discontinued SKU', detail: 'Nemschoff NC-2240 Recliner discontinued — successor NC-2250 (+$85/unit)', type: 'catalog' },
];

// ═════════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT: WrgHandoff (steps w3.1-w3.4)
// ═════════════════════════════════════════════════════════════════════════════

export default function WrgHandoff({ onNavigate }: { onNavigate?: (page: string) => void }) {
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
    const tp = (id: string): WrgStepTiming => WRG_STEP_TIMING[id] || WRG_STEP_TIMING['w3.1'];

    // ── Phase state ──────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<PipelinePhase>('idle');
    const [agents, setAgents] = useState<AgentVis[]>([]);
    const [progress, setProgress] = useState(0);
    const [checklistRevealed, setChecklistRevealed] = useState(0);

    // w3.4 specific: email
    const [emailSent, setEmailSent] = useState(false);

    // ── Step init effect ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!stepId.startsWith('w3.') || stepId === 'w3.5') return;

        // Reset all state
        setPhase('idle');
        setProgress(0);
        setChecklistRevealed(0);
        setEmailSent(false);

        // Set agents for this step
        const agentMap: Record<string, AgentVis[]> = {
            'w3.1': UPLOAD_AGENTS,
            'w3.2': COMPLETENESS_AGENTS,
            'w3.3': CATALOG_AGENTS,
            'w3.4': HANDOFF_AGENTS,
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

    // ── Breathing → revealed ─────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'breathing') return;
        const t = tp(stepId);
        const timer = setTimeout(pauseAware(() => setPhase('revealed')), t.breathing);
        return () => clearTimeout(timer);
    }, [phase, stepId, pauseAware]);

    // ── Revealed: stagger items + auto-advance ───────────────────────────────
    useEffect(() => {
        if (phase !== 'revealed') return;
        const t = tp(stepId);
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Stagger checklist items for w3.2
        if (stepId === 'w3.2') {
            for (let i = 0; i < CHECKLIST_ITEMS.length; i++) {
                timers.push(setTimeout(pauseAware(() => setChecklistRevealed(i + 1)), 120 * i));
            }
        }

        // w3.4: email animation
        if (stepId === 'w3.4') {
            timers.push(setTimeout(pauseAware(() => setEmailSent(true)), 800));
        }

        // Auto-advance
        if (t.resultsDur > 0) {
            const delay = stepId === 'w3.2'
                ? CHECKLIST_ITEMS.length * 120 + t.resultsDur
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

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER
    // ═════════════════════════════════════════════════════════════════════════

    if (!stepId.startsWith('w3.') || stepId === 'w3.5') return null;

    return (
        <div className="p-6 space-y-4 max-w-5xl mx-auto">

            {/* ── w3.1: Design Package Upload & Detection ── */}
            {stepId === 'w3.1' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <DocumentTextIcon className="h-5 w-5" />,
                        'Design Package Uploaded — JPS Health Center',
                        '2 PDFs detected in CORE. Validating file format, designer identity, and logging audit trail.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Design Package Upload & Detection')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* PDF file cards */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                    <div className="flex items-center gap-3">
                                        <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-400 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[11px] font-bold text-foreground truncate">JPS_116719_SPEC.pdf</div>
                                            <div className="text-[10px] text-muted-foreground">12 pages</div>
                                        </div>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 shrink-0" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                                    <div className="flex items-center gap-3">
                                        <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-400 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[11px] font-bold text-foreground truncate">JPS_116719_SEL.pdf</div>
                                            <div className="text-[10px] text-muted-foreground">12 pages</div>
                                        </div>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 shrink-0" />
                                    </div>
                                </div>
                            </div>

                            {/* Designer badge */}
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
                                <div className="w-6 h-6 rounded-full bg-brand-400 flex items-center justify-center text-[10px] font-bold text-zinc-900">SC</div>
                                <span className="text-[11px] font-bold text-foreground">Sarah Chen</span>
                                <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-[10px] text-muted-foreground">— Designer verified against Smartsheet #2026-JPS-HCW</span>
                            </div>

                            {/* Audit entry */}
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border">
                                <ShieldCheckIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-[10px] text-muted-foreground">File hashes logged — SHA-256 integrity verified</span>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w3.2: Package Completeness Validation ── */}
            {stepId === 'w3.2' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />,
                        'Validating Package Completeness',
                        'Running 8-point checklist — manufacturer codes, KD flags, floor assignments, site constraints.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Package Completeness Validation')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Checklist card */}
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Completeness Checklist</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
                                        7/8 PASSED
                                    </span>
                                </div>
                                <div className="space-y-1.5">
                                    {CHECKLIST_ITEMS.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-2 text-[11px] transition-all duration-200 ${
                                                phase === 'revealed' && idx < checklistRevealed ? 'opacity-100' : phase === 'breathing' ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        >
                                            {item.passed ? (
                                                <CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
                                            ) : (
                                                <ExclamationTriangleIcon className="h-4 w-4 text-amber-500 shrink-0" />
                                            )}
                                            <span className={item.passed ? 'text-foreground' : 'text-amber-700 dark:text-amber-400 font-medium'}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cross-doc discrepancy */}
                            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-300 dark:border-amber-500/30 flex items-start gap-2">
                                <ExclamationTriangleIcon className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">Cross-Document Discrepancy</span>
                                    <p className="text-[10px] text-amber-700 dark:text-amber-400/80 mt-0.5">
                                        Plastic Stacking Chairs: Spec=19, Selection=20
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w3.3: Product Catalog Cross-Reference ── */}
            {stepId === 'w3.3' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <TableCellsIcon className="h-5 w-5" />,
                        'Cross-Referencing Product Catalog',
                        'Verifying 24 products against 200+ manufacturer catalogs — checking pricing, availability, and SKU status.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Product Catalog Cross-Reference')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Catalog table */}
                            <div className="rounded-lg border border-border overflow-hidden">
                                <table className="w-full text-[10px]">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border">
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-8">#</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground">Product</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-28">Manufacturer</th>
                                            <th className="px-2 py-1.5 text-center font-bold text-muted-foreground w-20">Status</th>
                                            <th className="px-2 py-1.5 text-left font-bold text-muted-foreground w-36">Flag</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CATALOG_ITEMS.map(item => (
                                            <tr
                                                key={item.id}
                                                className={`border-b border-border/50 ${
                                                    item.status === 'flagged' ? 'bg-amber-50/50 dark:bg-amber-500/5 border-l-2 border-l-amber-400' : ''
                                                }`}
                                            >
                                                <td className="px-2 py-1.5 text-muted-foreground">{item.id}</td>
                                                <td className="px-2 py-1.5">{item.product}</td>
                                                <td className="px-2 py-1.5 text-muted-foreground">{item.manufacturer}</td>
                                                <td className="px-2 py-1.5 text-center">
                                                    {item.status === 'verified' ? (
                                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 font-bold">VERIFIED</span>
                                                    ) : (
                                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold">FLAGGED</span>
                                                    )}
                                                </td>
                                                <td className="px-2 py-1.5">
                                                    {item.status === 'flagged' && (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[8px] px-1 py-0.5 rounded bg-amber-200 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">{item.flag}</span>
                                                            <span className="text-[9px] text-muted-foreground">{item.flagDetail}</span>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Summary footer */}
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border text-[10px] text-muted-foreground">
                                <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                <span>22 verified</span>
                                <span className="text-border">|</span>
                                <span className="text-amber-600 dark:text-amber-400">1 custom lead</span>
                                <span className="text-border">|</span>
                                <span className="text-amber-600 dark:text-amber-400">1 SKU update</span>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── w3.4: Handoff Package Assembly ── */}
            {stepId === 'w3.4' && (
                <>
                    {phase === 'notification' && renderNotification(
                        <PaperAirplaneIcon className="h-5 w-5" />,
                        'Assembling Handoff Package',
                        'Compiling validated documents, checklist results, and catalog flags for estimator handoff.'
                    )}

                    {phase === 'processing' && renderAgentPipeline(agents, progress, 'Handoff Package Assembly')}

                    {(phase === 'breathing' || phase === 'revealed') && (
                        <div className="animate-in fade-in duration-500 space-y-3">
                            {/* Handoff package card */}
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border-2 border-green-300 dark:border-green-500/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                    <span className="text-xs font-bold text-foreground">Handoff Package Ready</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">COMPLETE</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {HANDOFF_PACKAGE_ITEMS.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-[10px]">
                                            <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                            <span className="text-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Email animation */}
                            <div className={`flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all duration-500 ${emailSent ? 'opacity-100' : 'opacity-50'}`}>
                                <EnvelopeIcon className={`h-5 w-5 transition-all duration-700 ${emailSent ? 'text-green-500 translate-x-0' : 'text-muted-foreground -translate-x-2'}`} />
                                <div className="flex-1">
                                    <span className="text-[11px] font-bold text-foreground">
                                        {emailSent ? 'Email sent to Mark Williams' : 'Sending estimation notification...'}
                                    </span>
                                    <p className="text-[10px] text-muted-foreground">Token-based link — no login required</p>
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
// NAMED EXPORT: WrgHandoffReview (step w3.5)
// Rendered inside Dashboard.tsx
// ═════════════════════════════════════════════════════════════════════════════

export function WrgHandoffReview({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const { currentStep, nextStep, isPaused } = useDemo();

    if (currentStep.id !== 'w3.5') return null;

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

    // ── State ─────────────────────────────────────────────────────────────────
    const [reviewPhase, setReviewPhase] = useState<HandoffReviewPhase>('idle');
    const [acknowledgedItems, setAcknowledgedItems] = useState<Record<number, boolean>>({});
    const [expandedItem, setExpandedItem] = useState<number | null>(null);

    // ── Init effect ───────────────────────────────────────────────────────────
    useEffect(() => {
        setReviewPhase('idle');
        setAcknowledgedItems({});
        setExpandedItem(null);
        const timer = setTimeout(pauseAware(() => setReviewPhase('notification')), 1500);
        return () => clearTimeout(timer);
    }, [pauseAware]);

    // ── Helpers ───────────────────────────────────────────────────────────────
    const acknowledgedCount = Object.values(acknowledgedItems).filter(Boolean).length;
    const allAcknowledged = acknowledgedCount >= FLAGGED_REVIEW_ITEMS.length;

    const handleAcknowledge = (id: number) => {
        setAcknowledgedItems(prev => ({ ...prev, [id]: true }));
        setExpandedItem(null);
    };

    return (
        <div className="space-y-4">
            {/* Notification */}
            {reviewPhase === 'notification' && (
                <button onClick={() => setReviewPhase('reviewing')} className="w-full text-left animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-5 bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-400 rounded-r-xl">
                        <div className="flex items-start gap-3">
                            <ClipboardDocumentCheckIcon className="h-8 w-8 text-amber-600 dark:text-amber-400 shrink-0" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-foreground">Design Package Validation</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">REVIEW REQUIRED</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1">
                                    JPS Health Center for Women — 7/8 checklist passed, 3 items flagged for acknowledgement
                                </p>
                                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">Click to review <ArrowRightIcon className="h-3 w-3" /></p>
                            </div>
                        </div>
                    </div>
                </button>
            )}

            {/* Full review */}
            {reviewPhase === 'reviewing' && (
                <div className="animate-in fade-in duration-500 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground">Design Package Validation</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
                                {FLAGGED_REVIEW_ITEMS.length - acknowledgedCount} PENDING
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">
                                {acknowledgedCount}/{FLAGGED_REVIEW_ITEMS.length} reviewed
                            </span>
                            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full bg-green-500 transition-all duration-300" style={{ width: `${(acknowledgedCount / FLAGGED_REVIEW_ITEMS.length) * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Checklist summary */}
                    <div className="p-3 rounded-lg bg-card border border-border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Completeness Summary</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">7/8 PASSED</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {CHECKLIST_ITEMS.filter(i => i.passed).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[10px]">
                                    <CheckCircleIcon className="h-3 w-3 text-green-500 shrink-0" />
                                    <span className="text-muted-foreground">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flagged items — expandable */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Flagged Items</span>
                        {FLAGGED_REVIEW_ITEMS.map(item => {
                            const isExpanded = expandedItem === item.id;
                            const isAcknowledged = acknowledgedItems[item.id];
                            return (
                                <div key={item.id} className={`rounded-lg border overflow-hidden transition-all ${
                                    isAcknowledged
                                        ? 'border-green-200 dark:border-green-500/20 bg-green-50/30 dark:bg-green-500/5'
                                        : 'border-amber-300 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5'
                                }`}>
                                    <button
                                        onClick={() => !isAcknowledged && setExpandedItem(isExpanded ? null : item.id)}
                                        className="w-full flex items-center gap-3 p-3 text-left"
                                    >
                                        {isAcknowledged ? (
                                            <CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
                                        ) : (
                                            <ExclamationTriangleIcon className="h-4 w-4 text-amber-500 shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[11px] font-bold text-foreground">{item.title}</div>
                                            <div className="text-[10px] text-muted-foreground truncate">{item.detail}</div>
                                        </div>
                                        {!isAcknowledged && (
                                            isExpanded
                                                ? <ChevronUpIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                                : <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                        )}
                                        {isAcknowledged && (
                                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-200 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold shrink-0">ACKNOWLEDGED</span>
                                        )}
                                    </button>
                                    {isExpanded && !isAcknowledged && (
                                        <div className="px-3 pb-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                            <div className="flex items-center justify-between pt-2 border-t border-amber-200 dark:border-amber-500/20">
                                                <div className="text-[10px] text-muted-foreground">
                                                    {item.type === 'discrepancy' ? 'Quantity mismatch between specification and selection documents' : 'Catalog validation flag requiring expert acknowledgement'}
                                                </div>
                                                <button
                                                    onClick={() => handleAcknowledge(item.id)}
                                                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors flex items-center gap-1 shrink-0 ml-3"
                                                >
                                                    <CheckIcon className="h-3 w-3" /> Acknowledge
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => { if (allAcknowledged) nextStep(); }}
                        disabled={!allAcknowledged}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                            allAcknowledged
                                ? 'bg-brand-400 text-zinc-900 hover:bg-brand-300 shadow-lg shadow-brand-500/20'
                                : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                    >
                        {allAcknowledged ? 'Acknowledge & Release to Estimation' : `Resolve ${FLAGGED_REVIEW_ITEMS.length - acknowledgedCount} remaining items to continue`}
                    </button>
                </div>
            )}
        </div>
    );
}

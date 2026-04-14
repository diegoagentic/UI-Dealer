// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — WRG Origin Splash
// Phase 4.6 of WRG Demo v6 implementation
//
// Fullscreen animation that replaces Flow 1 (w1.1-w1.5).
// Shows "the old way" — 4 disconnected tools + CORE export flow — and transitions
// to "the new way" with Strata Estimator.
//
// CORE constraint compliance: CORE is shown as a FILE SOURCE (export-only),
// not as a live integration. See docs/wrg-demo/requirements/CORE_INTEGRATION_CONSTRAINT.md
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import {
    Mail,
    Database,
    FileText,
    FileSpreadsheet,
    Sparkles,
    AlertTriangle,
} from 'lucide-react'

interface WrgOriginSplashProps {
    onComplete: () => void
}

type SplashPhase =
    | 'title'       // 0-1s
    | 'tools'       // 1-6s (5 tools appear sequentially)
    | 'pain'        // 6-7.2s (red statement, tightened from 1.5s → 1.2s)
    | 'transform'   // 7.2-9s (icons collapse into Strata)
    | 'continuity'  // 9-10.3s (NEW: bridge line to w2.1)
    | 'fade-out'    // 10.3-11s (extended from 500ms → 700ms)

interface ToolStep {
    icon: typeof Mail
    label: string
    context: string
}

const TOOLS: ToolStep[] = [
    {
        icon: Mail,
        label: 'Email with PDF specs arrives',
        context: 'Estimator manually reads and forwards',
    },
    {
        icon: Database,
        label: 'Estimator opens CORE manually',
        context: 'Downloads scope files (PDF + CSV)',
    },
    {
        icon: FileText,
        label: 'Spec PDFs opened',
        context: 'Read line by line, hours of work',
    },
    {
        icon: FileSpreadsheet,
        label: 'Product Selection Sheet',
        context: 'Map items to categories manually',
    },
    {
        icon: FileSpreadsheet,
        label: 'Delivery Pricer + Labor Worksheet',
        context: "Apply rates from Mark's 100-year experience",
    },
]

export default function WrgOriginSplash({ onComplete }: WrgOriginSplashProps) {
    const [phase, setPhase] = useState<SplashPhase>('title')
    const [visibleTools, setVisibleTools] = useState(0)

    useEffect(() => {
        // Timeline: title(0-1) → tools(1-6) → pain(6-7.2) → transform(7.2-9)
        //        → continuity(9-10.3) → fade(10.3-11)
        const timers: ReturnType<typeof setTimeout>[] = []

        // Phase: tools (start at 1s, reveal one every 1s)
        timers.push(setTimeout(() => setPhase('tools'), 1000))
        for (let i = 0; i < TOOLS.length; i++) {
            timers.push(setTimeout(() => setVisibleTools(i + 1), 1000 + i * 1000))
        }

        // Phase: pain statement (tightened 1.5s → 1.2s)
        timers.push(setTimeout(() => setPhase('pain'), 6000))

        // Phase: transformation (starts earlier, shrunk 2s → 1.8s)
        timers.push(setTimeout(() => setPhase('transform'), 7200))

        // Phase: continuity bridge line (1.3s of reading time)
        timers.push(setTimeout(() => setPhase('continuity'), 9000))

        // Phase: fade out (extended 500ms → 700ms for a calmer exit)
        timers.push(setTimeout(() => setPhase('fade-out'), 10300))

        // Complete → hands off to w2.1's own beat timeline
        timers.push(setTimeout(() => onComplete(), 11000))

        return () => {
            timers.forEach(clearTimeout)
        }
    }, [onComplete])

    return (
        <div
            className={clsx(
                'fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700',
                phase === 'fade-out' ? 'opacity-0' : 'opacity-100'
            )}
        >
            {/* Title */}
            <div
                className={clsx(
                    'absolute top-24 left-0 right-0 text-center transition-all duration-700',
                    phase === 'title' ? 'opacity-100 translate-y-0' : 'opacity-60 -translate-y-2'
                )}
            >
                <p className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.3em] mb-2">
                    WRG Quoting Process
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    The Old Way
                </h1>
                <p className="text-sm text-zinc-400 mt-2">
                    How a $202K quote got built yesterday
                </p>
            </div>

            {/* Tools grid (visible during tools + pain phases) */}
            {(phase === 'tools' || phase === 'pain') && (
                <div className="flex items-center justify-center gap-6 px-8">
                    {TOOLS.map((tool, i) => {
                        const Icon = tool.icon
                        const isVisible = i < visibleTools
                        return (
                            <div key={i} className="flex flex-col items-center max-w-[140px]">
                                <div
                                    className={clsx(
                                        'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500',
                                        'bg-zinc-900 border border-zinc-800',
                                        isVisible
                                            ? 'opacity-100 scale-100 translate-y-0'
                                            : 'opacity-0 scale-75 translate-y-4'
                                    )}
                                >
                                    <Icon className="w-8 h-8 text-zinc-400" />
                                </div>
                                <p
                                    className={clsx(
                                        'text-[11px] font-semibold text-zinc-300 text-center mt-3 leading-tight transition-opacity duration-500 delay-200',
                                        isVisible ? 'opacity-100' : 'opacity-0'
                                    )}
                                >
                                    {tool.label}
                                </p>
                                <p
                                    className={clsx(
                                        'text-[10px] text-zinc-500 text-center mt-1 leading-tight transition-opacity duration-500 delay-300',
                                        isVisible ? 'opacity-100' : 'opacity-0'
                                    )}
                                >
                                    {tool.context}
                                </p>
                                {/* Connector arrow (except last) */}
                                {i < TOOLS.length - 1 && isVisible && (
                                    <div className="absolute top-[calc(50%-32px)] w-6 h-0.5 bg-zinc-700" style={{ left: `calc(50% + ${(i - 2) * 164 + 80}px)` }} />
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Pain statement */}
            {phase === 'pain' && (
                <div className="absolute bottom-24 left-0 right-0 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/30">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <p className="text-base font-bold text-red-400">
                            4 disconnected tools · 8 hours of manual work · 85% without audit trail
                        </p>
                    </div>
                </div>
            )}

            {/* Transformation phase */}
            {phase === 'transform' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
                    <div className="w-24 h-24 rounded-3xl bg-brand-500 flex items-center justify-center shadow-2xl shadow-brand-500/30">
                        <Sparkles className="w-12 h-12 text-zinc-950" />
                    </div>
                    <p className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.3em] mt-6">
                        Strata Estimator
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-2 max-w-2xl text-center">
                        Replaces the 4 tools in the middle
                    </h2>
                    <p className="text-sm text-zinc-400 mt-3 max-w-2xl text-center leading-relaxed">
                        CORE still receives the final file — but now every calculation, every rate,
                        every decision is preserved with full audit trail.
                    </p>
                </div>
            )}

            {/* Continuity bridge → w2.1 */}
            {(phase === 'continuity' || phase === 'fade-out') && (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-600">
                    <div className="w-20 h-20 rounded-3xl bg-brand-500 flex items-center justify-center shadow-2xl shadow-brand-500/30">
                        <Sparkles className="w-10 h-10 text-zinc-950" />
                    </div>
                    <p className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.3em] mt-6">
                        Next
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-2 max-w-2xl text-center leading-snug">
                        The same{' '}
                        <span className="text-brand-400">$202 K</span>{' '}
                        quote, built inside Strata.
                    </h2>
                    <p className="text-xs text-zinc-500 mt-4 uppercase tracking-[0.2em]">
                        Loading JPS Health Network…
                    </p>
                </div>
            )}
        </div>
    )
}

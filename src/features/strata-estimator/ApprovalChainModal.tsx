// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Approval Chain Modal
// Refinement Phase 1 (w2.4 closure)
//
// Sequentially checks the 4-person approval chain for the JPS proposal:
// David Park → Alex Rivera → Sara Chen → Jordan Park. Each role's row
// auto-animates to a green check ~800 ms after the previous one. When the
// last signature lands, fires onComplete() so the Shell can open the
// ReleaseSuccessModal.
// ═══════════════════════════════════════════════════════════════════════════════

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import {
    ArrowRight,
    Check,
    CheckCircle2,
    FileText,
    MousePointer2,
    Search,
    Send,
    ShieldCheck,
    X,
} from 'lucide-react'
import { clsx } from 'clsx'

interface ApprovalRole {
    name: string
    role: string
    photo: string
}

const CHAIN: ApprovalRole[] = [
    {
        name: 'David Park',
        role: 'Regional Sales Manager',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
    {
        name: 'Alex Rivera',
        role: 'Designer',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face',
    },
    {
        name: 'Sara Chen',
        role: 'Account Manager',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    },
    {
        name: 'Jordan Park',
        role: 'VP Sales',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    },
]

const STEP_MS = 800

// David cutaway beat timeline (ms from modal open)
const CUTAWAY_START    = 500     // enter David's view
const CUTAWAY_NOTIF    = 1000    // notification toast slides in
const CUTAWAY_OPEN_DOC = 1900    // notification acknowledged → proposal card reveal
const CUTAWAY_POINTER  = 2800    // pointer hovers Approve
const CUTAWAY_CLICK    = 3500    // Approve click (scale + ring pulse)
const CUTAWAY_EXIT     = 4200    // return to chain modal
const CHAIN_RESUME     = 4600    // chain continues (David already = 1)

type Phase = 'intro' | 'cutaway' | 'chaining'

interface ApprovalChainModalProps {
    isOpen: boolean
    onClose: () => void
    onComplete: () => void
}

export default function ApprovalChainModal({
    isOpen,
    onClose,
    onComplete,
}: ApprovalChainModalProps) {
    const [approvedCount, setApprovedCount] = useState(0)
    const [phase, setPhase] = useState<Phase>('intro')
    const [cutawayNotifVisible, setCutawayNotifVisible] = useState(false)
    const [cutawayCardVisible, setCutawayCardVisible] = useState(false)
    const [cutawayPointerShown, setCutawayPointerShown] = useState(false)
    const [cutawayClicked, setCutawayClicked] = useState(false)

    // Reset + timeline: intro → David cutaway → chain continues
    useEffect(() => {
        if (!isOpen) {
            setApprovedCount(0)
            setPhase('intro')
            setCutawayNotifVisible(false)
            setCutawayCardVisible(false)
            setCutawayPointerShown(false)
            setCutawayClicked(false)
            return
        }

        const timers: ReturnType<typeof setTimeout>[] = []

        // ─── Cutaway beats ──────────────────────────────────────────────
        timers.push(setTimeout(() => setPhase('cutaway'), CUTAWAY_START))
        timers.push(setTimeout(() => setCutawayNotifVisible(true), CUTAWAY_NOTIF))
        timers.push(setTimeout(() => setCutawayCardVisible(true), CUTAWAY_OPEN_DOC))
        timers.push(setTimeout(() => setCutawayPointerShown(true), CUTAWAY_POINTER))
        timers.push(setTimeout(() => {
            setCutawayClicked(true)
            setApprovedCount(1) // David signs inside the cutaway
        }, CUTAWAY_CLICK))
        timers.push(setTimeout(() => setPhase('chaining'), CUTAWAY_EXIT))

        // ─── Chain continues for Alex / Sara / Jordan ─────────────────────
        for (let i = 1; i < CHAIN.length; i++) {
            timers.push(
                setTimeout(
                    () => setApprovedCount(i + 1),
                    CHAIN_RESUME + (i - 1) * STEP_MS
                )
            )
        }
        // After the last signature, give the user 600 ms to read, then advance.
        timers.push(
            setTimeout(
                onComplete,
                CHAIN_RESUME + (CHAIN.length - 1) * STEP_MS + 600
            )
        )
        return () => timers.forEach(clearTimeout)
    }, [isOpen, onComplete])

    const progressPct = (approvedCount / CHAIN.length) * 100
    const done = approvedCount >= CHAIN.length

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[200]"
                onClose={done ? onClose : () => {}}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {/* David Park cutaway — mimics David's actual Estimator workspace
                        (mini navbar + inline handoff banner + financial summary) */}
                    {phase === 'cutaway' && (
                        <div className="w-full max-w-4xl bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            {/* Mini Strata Estimator navbar */}
                            <div className="flex items-center gap-3 px-5 py-3 bg-card dark:bg-zinc-800 border-b border-border">
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 text-red-500 dark:text-red-300 text-[9px] font-bold uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    Live role view
                                </span>
                                <div className="flex items-center gap-2 pl-2 border-l border-border">
                                    <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-black text-[10px]">
                                        S
                                    </div>
                                    <span className="text-xs font-bold text-foreground tracking-tight">
                                        WRG · Estimator
                                    </span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-md bg-muted/40 border border-border text-[10px] text-muted-foreground">
                                    <Search className="w-3 h-3" />
                                    Search projects…
                                </div>
                                <div className="ml-auto flex items-center gap-2 pl-2 border-l border-border">
                                    <img
                                        src={CHAIN[0].photo}
                                        alt={CHAIN[0].name}
                                        className="w-7 h-7 rounded-full object-cover ring-2 ring-primary"
                                    />
                                    <div className="hidden sm:block">
                                        <p className="text-[11px] font-bold text-foreground leading-tight">
                                            {CHAIN[0].name}
                                        </p>
                                        <p className="text-[9px] text-muted-foreground leading-tight">
                                            {CHAIN[0].role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* David's workspace body */}
                            <div className="p-6 space-y-4 min-h-[460px]">

                                {/* Inline handoff banner — slides in from the top */}
                                <div
                                    className={clsx(
                                        'transition-all duration-500',
                                        cutawayNotifVisible
                                            ? 'opacity-100 translate-y-0 animate-in slide-in-from-top-4 fade-in'
                                            : 'opacity-0 -translate-y-2 pointer-events-none'
                                    )}
                                >
                                    <div className="bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm overflow-hidden">
                                        <div className="p-5 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary ring-1 ring-primary/20 rounded-r-2xl">
                                            <div className="flex items-start gap-4">
                                                <div className="relative shrink-0">
                                                    <img
                                                        src={CHAIN[2].photo}
                                                        alt={CHAIN[2].name}
                                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/40"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-2 ring-card dark:ring-zinc-800">
                                                        <Send className="h-2.5 w-2.5 text-primary-foreground" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-sm font-bold text-foreground">
                                                            Approval request
                                                        </span>
                                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-bold animate-pulse">
                                                            Just now
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        <span className="font-bold text-foreground">
                                                            {CHAIN[2].name}
                                                        </span>{' '}
                                                        ({CHAIN[2].role}) · JPS Health Network proposal · $202,138 awaiting your sign-off
                                                    </p>
                                                    <div className="flex items-center gap-2 flex-wrap mt-3">
                                                        <span className="text-[8px] font-bold px-2 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 ring-2 ring-amber-500/20 shadow-sm shadow-amber-500/10 uppercase tracking-wider">
                                                            <Send className="h-3 w-3" />
                                                            Account manager
                                                        </span>
                                                        <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" aria-hidden />
                                                        <span className="text-[8px] font-bold px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30 flex items-center gap-1 uppercase tracking-wider">
                                                            Regional sales manager
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project dossier strip */}
                                <div
                                    className={clsx(
                                        'transition-all duration-500',
                                        cutawayCardVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-2 pointer-events-none'
                                    )}
                                >
                                    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-card dark:bg-zinc-800 border border-border">
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-foreground dark:text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                                                Project dossier
                                            </p>
                                            <p className="text-sm font-bold text-foreground leading-tight mt-1">
                                                JPS Health Network · Health Center for Women
                                            </p>
                                            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                                                24 line items · 4-person approval chain · routed by Sara Chen
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                            Read-only
                                        </span>
                                    </div>
                                </div>

                                {/* Financial summary hero (David's view) */}
                                <div
                                    className={clsx(
                                        'transition-all duration-500 delay-100',
                                        cutawayCardVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-2 pointer-events-none'
                                    )}
                                >
                                    <div className="rounded-2xl bg-card dark:bg-zinc-800 border border-border overflow-hidden">
                                        <div className="grid grid-cols-3 divide-x divide-border">
                                            <div className="px-5 py-4">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                                                    Product net
                                                </p>
                                                <p className="text-lg font-black text-foreground tabular-nums mt-1">
                                                    $178,219
                                                </p>
                                            </div>
                                            <div className="px-5 py-4">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                                                    Labor + freight
                                                </p>
                                                <p className="text-lg font-black text-foreground tabular-nums mt-1">
                                                    $23,919
                                                </p>
                                            </div>
                                            <div className="px-5 py-4 bg-primary/5 dark:bg-primary/10">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                                                    Total proposal
                                                </p>
                                                <p className="text-lg font-black text-foreground tabular-nums mt-1">
                                                    $202,138
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-5 py-3 border-t border-border bg-muted/20">
                                            <button
                                                type="button"
                                                disabled
                                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors"
                                            >
                                                Request changes
                                            </button>
                                            <div className="relative ml-auto">
                                                <button
                                                    type="button"
                                                    disabled
                                                    className={clsx(
                                                        'flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-primary text-primary-foreground transition-all duration-200',
                                                        cutawayClicked &&
                                                            'scale-95 ring-4 ring-primary/50 shadow-lg shadow-primary/40'
                                                    )}
                                                >
                                                    {cutawayClicked ? (
                                                        <>
                                                            <Check className="w-4 h-4" strokeWidth={3} />
                                                            Approved
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldCheck className="w-4 h-4" />
                                                            Approve proposal
                                                        </>
                                                    )}
                                                </button>
                                                {cutawayPointerShown && (
                                                    <MousePointer2
                                                        className={clsx(
                                                            'absolute -right-2 -bottom-3 w-5 h-5 text-foreground drop-shadow-lg pointer-events-none transition-all duration-300',
                                                            cutawayClicked
                                                                ? 'translate-x-0 translate-y-0 scale-90'
                                                                : 'translate-x-1 translate-y-1 animate-bounce'
                                                        )}
                                                        aria-hidden
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic mt-3 text-center">
                                        Strata auto-stamps David's signature back into the approval chain.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className={clsx(
                            'w-full max-w-lg bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-2xl overflow-hidden',
                            phase === 'cutaway' && 'hidden'
                        )}>

                            {/* Header */}
                            <div className="flex items-start gap-4 px-6 py-5 border-b border-border">
                                <div className="p-3 rounded-xl bg-primary/10 text-foreground dark:text-primary shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <DialogTitle className="text-base font-bold text-foreground">
                                        Approval Chain
                                    </DialogTitle>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Four-person sign-off required for JPS Health Network
                                    </p>
                                </div>
                                {done && (
                                    <button
                                        onClick={onClose}
                                        className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Progress bar */}
                            <div className="px-6 pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Signatures
                                    </span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider tabular-nums">
                                        {approvedCount} / {CHAIN.length}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500 ease-out"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>

                            {/* Chain rows */}
                            <div className="p-6 space-y-3">
                                {CHAIN.map((person, i) => {
                                    const approved = i < approvedCount
                                    const pending = i === approvedCount && !done
                                    return (
                                        <div
                                            key={person.name}
                                            className={clsx(
                                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                                                approved && 'bg-green-500/5 dark:bg-green-500/10',
                                                !approved && 'bg-muted/40'
                                            )}
                                        >
                                            <img
                                                src={person.photo}
                                                alt={person.name}
                                                className={clsx(
                                                    'w-10 h-10 rounded-full object-cover shrink-0 transition-all',
                                                    approved && 'ring-2 ring-green-500',
                                                    pending && 'ring-2 ring-primary animate-pulse'
                                                )}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-foreground leading-tight truncate">
                                                    {person.name}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground leading-tight">
                                                    {person.role}
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    'shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                                                    approved
                                                        ? 'bg-green-500 text-white scale-100'
                                                        : 'bg-muted text-muted-foreground scale-95'
                                                )}
                                            >
                                                {approved ? (
                                                    <Check className="w-4 h-4" strokeWidth={3} />
                                                ) : pending ? (
                                                    <span className="text-[10px] font-bold">...</span>
                                                ) : (
                                                    <span className="text-[10px] font-bold">{i + 1}</span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Footer status */}
                            <div className="px-6 py-4 border-t border-border bg-muted/20">
                                {done ? (
                                    <div className="flex items-center gap-2 text-sm text-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span className="font-semibold">All signatures collected.</span>
                                        <span className="text-muted-foreground">
                                            Releasing proposal…
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground">
                                        Strata is routing the proposal through the approval chain.
                                        This normally takes a few seconds.
                                    </p>
                                )}
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

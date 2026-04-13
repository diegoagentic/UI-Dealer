// ═══════════════════════════════════════════════════════════════════════════════
// Strata Estimator — Step State Mapping
// Phase 4.5 of WRG Demo v6 implementation
// Maps WRG demo step IDs (w0.1, w2.1, w2.2, w2.3, w2.4) to Estimator visual state
// ═══════════════════════════════════════════════════════════════════════════════

import { getRoleProfile } from './roles'
import type { ConnectedUser } from './StrataEstimatorNavbar'
import type { EstimatorTab } from './types'

/**
 * Visual states the Estimator can be in, driven by currentStep.
 */
export type EstimatorStepState =
    | 'idle'                    // default — JPS pre-loaded, not yet interactive
    | 'origin-splash'           // w0.1 — the Shell is NOT shown, splash overlay instead
    | 'estimation-active'       // w2.1 — Hero live, checkboxes enabled, AI import triggers stagger animation
    | 'estimation-escalated'    // w2.2 — BoM row 19 focused, other rows opacity-40
    | 'estimation-assembly'     // w2.3 — Generate Proposal pulsing, pricing waterfall ready
    | 'proposal-review'         // w2.4 — read-only + approval chain modal available

interface StepMapping {
    state: EstimatorStepState
    tab: EstimatorTab
    role: string // 'Expert' | 'Designer' | 'Dealer' | 'System'
}

/**
 * Map each step ID to the corresponding Estimator state + active tab + role.
 */
const STEP_MAP: Record<string, StepMapping> = {
    'w0.1': { state: 'origin-splash',        tab: 'ESTIMATOR', role: 'System' },
    'w2.1': { state: 'estimation-active',    tab: 'ESTIMATOR', role: 'Expert' },
    'w2.2': { state: 'estimation-escalated', tab: 'ESTIMATOR', role: 'Designer' },
    'w2.3': { state: 'estimation-assembly',  tab: 'ESTIMATOR', role: 'Expert' },
    'w2.4': { state: 'proposal-review',      tab: 'ESTIMATOR', role: 'Dealer' },
}

/**
 * Returns the Estimator visual state for a given step ID.
 * Defaults to 'idle' if step is not mapped.
 */
export function getStepState(stepId: string | undefined): EstimatorStepState {
    if (!stepId) return 'idle'
    return STEP_MAP[stepId]?.state ?? 'idle'
}

/**
 * Returns the tab that should be active for a given step ID.
 * Defaults to 'ESTIMATOR' if step is not mapped.
 */
export function getStepTab(stepId: string | undefined): EstimatorTab {
    if (!stepId) return 'ESTIMATOR'
    return STEP_MAP[stepId]?.tab ?? 'ESTIMATOR'
}

/**
 * Returns the ConnectedUser for a given step ID, or null if none applies
 * (e.g. for 'System' role during w0.1 splash).
 */
export function getStepRole(stepId: string | undefined): ConnectedUser | null {
    if (!stepId) return null
    const role = STEP_MAP[stepId]?.role
    if (!role || role === 'System') return null
    return getRoleProfile(role)
}

/**
 * Returns true if a step is in the "origin splash" state (w0.1).
 * Used by the router to show WrgOriginSplash instead of the Shell.
 */
export function isOriginSplashStep(stepId: string | undefined): boolean {
    return getStepState(stepId) === 'origin-splash'
}

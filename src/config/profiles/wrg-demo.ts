// ═══════════════════════════════════════════════════════════════════════════════
// WRG — Demo Profile v8 (BPMN-aligned · see docs/wrg-demo/V8_BPMN_ALIGNMENT_PLAN.md)
//
// FLOW 1 — AI Labor Estimation (internal · BPMN stages 1-14)
//   w1.1: Labor estimation kickoff · David (Senior Estimator) pulls JPS from
//         CORE and runs the dual-engine calc (Delivery Pricer + Labor Worksheet)
//   w1.2: Designer verification · Alex validates the escalated custom item
//
// FLOW 2 — Internal handoff (BPMN stages 15-18)
//   w2.1: Salesperson review · Sara receives the Outlook notification from
//         CORE, reviews the labor estimate, and forwards to SAC
//   w2.2: SAC quote assembly & release · Riley combines labor + product +
//         markup, runs the internal release checklist, and publishes the
//         client quote through CORE
//   w2.3: PM execution handoff · James Ortiz picks up the approved quote
//         and builds the internal execution plan (crews, tools, logistics)
//
// All roles are WRG internal. Client delivery is Phase 2 / out of scope.
//
// CORE constraint: CORE is EXPORT-ONLY. Strata reads files exported from CORE,
// never syncs or integrates directly. See docs/wrg-demo/requirements/CORE_INTEGRATION_CONSTRAINT.md
//
// Data: JPS Health Center for Women — 24 items, 185.04 man-hours, $202,138 proposal
// ═══════════════════════════════════════════════════════════════════════════════

import type { DemoStep } from '../demoProfiles';
import type { StepBehavior } from '../../components/demo/DemoStepBanner';

// ─── STEPS ───────────────────────────────────────────────────────────────────

export const WRG_DEMO_STEPS: DemoStep[] = [

    // ═══════════════════════════════════════════
    // FLOW 1: AI Labor Estimation
    // Expert + Designer · 2 steps
    // ═══════════════════════════════════════════
    {
        id: 'w1.1',
        groupId: 0,
        groupTitle: 'Flow 1: AI Labor Estimation',
        title: 'Labor estimation kickoff',
        description: 'David Park (Senior Estimator) receives the Outlook notification from CORE, logs in and pulls the JPS Health Center for Women project. The agent reads the site constraints (hospital campus, 2nd floor, no loading dock, 32 mi transport), extracts 24 line items from the spec PDFs, maps them to labor categories (21 template, 3 fallback), and produces the dual-engine draft (Delivery Pricer + Labor Worksheet). The 119 KD task chairs exceed the Pricer scope limit and the custom OFS Serpentine lounge gets escalated to the designer.',
        app: 'wrg-estimator',
        role: 'Expert',
    },
    {
        id: 'w1.2',
        groupId: 0,
        groupTitle: 'Flow 1: AI Labor Estimation',
        title: 'Designer verification',
        description: 'Alex Rivera (Designer) receives the escalation inside the same Estimator. The overlay shows the provenance ("From David Park · 5s ago · custom product · designer verification recommended"). Row 19 is focused, the rest of the BoM dims. Alex checks connection hardware, confirms modular assembly, and validates the 14-hour install estimate across the 5 verification modules.',
        app: 'wrg-estimator',
        role: 'Designer',
    },

    // ═══════════════════════════════════════════
    // FLOW 2: Internal handoff (BPMN stages 15-18)
    // Salesperson → SAC → PM · all internal WRG roles
    // ═══════════════════════════════════════════
    {
        id: 'w2.1',
        groupId: 1,
        groupTitle: 'Flow 2: Internal Handoff',
        title: 'Salesperson review',
        description: 'CORE sends the Outlook notification. Sara Chen (Salesperson) opens the approved labor estimate read-only, confirms the scope matches the client request, and forwards it to Riley (SAC) for quote assembly. Represents BPMN stages 15-16.',
        app: 'wrg-estimator',
        role: 'Dealer',
    },
    {
        id: 'w2.2',
        groupId: 1,
        groupTitle: 'Flow 2: Internal Handoff',
        title: 'SAC quote assembly & release',
        description: 'Riley Morgan (Sales Account Coordinator) combines the labor estimate with the MillerKnoll product quote, applies the JPS contract discount and the internal markup, previews the client PDF, runs the 4-person internal release checklist (David, Alex, Sara, Jordan), and publishes the final quote through CORE. Represents BPMN stage 17.',
        app: 'wrg-estimator',
        role: 'Sales Coordinator',
    },
    {
        id: 'w2.3',
        groupId: 1,
        groupTitle: 'Flow 2: Internal Handoff',
        title: 'PM execution handoff',
        description: 'James Ortiz (Senior Project Manager) picks up the approved quote from Riley. CORE forwards the budgeted hours and the project context, and James builds the internal execution plan: crew assignments, delivery windows, tools, transport, and hospital-campus coordination notes. Accepting queues the project for execution. Represents BPMN stage 18.',
        app: 'wrg-estimator',
        role: 'Project Manager',
    },
];

// ─── STEP BEHAVIOR ───────────────────────────────────────────────────────────

export const WRG_DEMO_STEP_BEHAVIOR: Record<string, StepBehavior> = {
    'w1.1': { mode: 'interactive', userAction: 'Pull JPS from CORE, watch the AI draft land, and escalate the OFS Serpentine to the designer' },
    'w1.2': { mode: 'interactive', userAction: 'Validate the 5 verification modules and send the approved module back to the estimator' },
    'w2.1': { mode: 'interactive', userAction: 'Review the labor estimate from CORE and forward it to the SAC for quote assembly' },
    'w2.2': { mode: 'interactive', userAction: 'Run the pricing waterfall, pass the internal release checklist, and publish the final quote through CORE' },
    'w2.3': { mode: 'interactive', userAction: 'Review the execution plan, assign crews & tools, and queue the project for execution' },
};

// ─── STEP MESSAGES (AI Agent Progress) ───────────────────────────────────────

export const WRG_DEMO_STEP_MESSAGES: Record<string, string[]> = {
    'w1.1': [
        'Loading JPS dossier from CORE export...',
        'Importing Bill of Materials — 24 items staggered in',
        'Mapping products to labor categories · 21 template / 3 fallback',
        'Scope override applied · 119 KD chairs > 50 limit',
        'Dual-engine calculation · installation + delivery',
        'Draft produced · OFS Serpentine flagged for designer',
    ],
    'w1.2': [
        'Row 19 (OFS Serpentine) focused — rest of BoM dimmed',
        'Checking connection hardware for 12-seat serpentine lounge...',
        'Standard brackets compatible — modular assembly confirmed',
        'Assembly time: 12 seats × 1.0 hr + 2.0 hrs alignment = 14.0 hrs',
        'Verification ready — sending back to expert',
    ],
    'w2.1': [
        'CORE · Outlook notification delivered to Sara Chen (Salesperson)',
        'Opening read-only labor estimate · 185.04 hrs · $10,547',
        'Scope confirmed against original client request',
        'Forwarding labor estimate to Riley Morgan (SAC) for quote assembly',
    ],
    'w2.2': [
        'Labor estimate + MillerKnoll product quote merged',
        'JPS contract discount applied · internal markup added',
        'Release checklist — David, Alex, Sara, Jordan (4 sign-offs)',
        'Final quote published through CORE · $202,138',
    ],
    'w2.3': [
        'Approved quote routed to James Ortiz (Senior PM)',
        'Building execution plan · crews, tools, transport, hospital protocol',
        'Coordinating with JPS facilities for dock access + security briefing',
        'Execution queued · delivery window set · Flow 1 complete',
    ],
};

// ─── SELF-INDICATED STEPS ────────────────────────────────────────────────────

export const WRG_DEMO_SELF_INDICATED: string[] = [
    'w1.1', 'w1.2',
    'w2.1', 'w2.2', 'w2.3',
];

// ─── STEP TIMING ─────────────────────────────────────────────────────────────

export interface WrgStepTiming {
    notifDelay: number;     // ms before notification appears
    notifDuration: number;  // ms notification stays before processing
    agentStagger: number;   // ms between each agent appearing
    agentDone: number;      // ms after agent appears before checkmark
    breathing: number;      // ms pause between processing and revealed
    resultsDur: number;     // ms results shown before auto-advance (0 = manual)
}

export const WRG_STEP_TIMING: Record<string, WrgStepTiming> = {
    'w1.1': { notifDelay: 1000, notifDuration: 4000, agentStagger: 700, agentDone: 500, breathing: 1000, resultsDur: 0 },
    'w1.2': { notifDelay: 1000, notifDuration: 3000, agentStagger: 800, agentDone: 500, breathing: 800,  resultsDur: 0 },
    'w2.1': { notifDelay: 1000, notifDuration: 3000, agentStagger: 800, agentDone: 500, breathing: 1200, resultsDur: 0 },
    'w2.2': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,   agentDone: 0,   breathing: 0,    resultsDur: 0 },
    'w2.3': { notifDelay: 1000, notifDuration: 3000, agentStagger: 0,   agentDone: 0,   breathing: 800,  resultsDur: 0 },
};

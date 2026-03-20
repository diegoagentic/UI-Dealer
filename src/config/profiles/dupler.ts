// ═══════════════════════════════════════════════════════════════════════════════
// Dupler Demo Profile — PDF→SIFF, Warehouse & Transit, Unified Reporting
// ═══════════════════════════════════════════════════════════════════════════════

import type { DemoStep } from '../demoProfiles';
import type { StepBehavior } from '../../components/demo/DemoStepBanner';

// ─── Step Definitions ────────────────────────────────────────────────────────

export const DUPLER_STEPS: DemoStep[] = [
    // ── Flow 1: PDF to SIFF Intelligence ──────────────────────────────────────
    {
        id: 'd1.1',
        groupId: 1,
        groupTitle: 'Flow 1: PDF to SIFF Intelligence',
        title: 'Document Intake & OCR',
        description: 'PDF arrives from manufacturer. OCR engine extracts 45 line items with part numbers, quantities, and pricing — 99.2% accuracy across 12 pages.',
        app: 'dupler-pdf',
        role: 'System',
    },
    {
        id: 'd1.2',
        groupId: 1,
        groupTitle: 'Flow 1: PDF to SIFF Intelligence',
        title: 'Smart Normalization & SIFF Mapping',
        description: 'AI maps manufacturer codes to SIFF catalog. Expert reviews 5 exceptions: 3 obsolete SKUs with substitution suggestions, 2 description mismatches. 40 items auto-mapped at 95%+ confidence.',
        app: 'dupler-pdf',
        role: 'Expert',
    },
    {
        id: 'd1.3',
        groupId: 1,
        groupTitle: 'Flow 1: PDF to SIFF Intelligence',
        title: 'Price & Contract Validation',
        description: 'AI cross-checks prices vs active contracts and manufacturer price lists. 4 discrepancies flagged ($2,140 total): 2 outdated prices (+3%), 1 quantity mismatch, 1 unit-of-measure error.',
        app: 'dupler-pdf',
        role: 'Expert',
    },
    {
        id: 'd1.4',
        groupId: 1,
        groupTitle: 'Flow 1: PDF to SIFF Intelligence',
        title: 'Approval, SIFF Generation & Export',
        description: 'Two-level approval chain completes automatically. SIFF file generated: 45 items normalized, $187,450 total, 5 exceptions resolved. Dealer confirms export to Core.',
        app: 'dupler-pdf',
        role: 'Dealer',
    },

    // ── Flow 2: Warehouse & Transit Inventory ─────────────────────────────────
    {
        id: 'd2.1',
        groupId: 2,
        groupTitle: 'Flow 2: Warehouse & Transit Inventory',
        title: 'Receiving & PO Matching',
        description: 'Steelcase shipment scanned: 35/38 items auto-matched to PO. 2 missing (backorder confirmed, ETA 2 weeks). 1 wrong item (Fog vs Graphite) — manufacturer claim auto-drafted.',
        app: 'dupler-warehouse',
        role: 'Expert',
    },
    {
        id: 'd2.2',
        groupId: 2,
        groupTitle: 'Flow 2: Warehouse & Transit Inventory',
        title: 'Warehouse Assignment & Capacity',
        description: 'AI assigns 35 items to warehouse zones: Zone A (project-specific, 20 items), Zone B (general stock, 12 items), Zone C (QC pending, 3 items). Warehouse at 74% capacity.',
        app: 'dupler-warehouse',
        role: 'System',
    },
    {
        id: 'd2.3',
        groupId: 2,
        groupTitle: 'Flow 2: Warehouse & Transit Inventory',
        title: 'Transit Tracking & Delivery Schedule',
        description: '5 shipments in transit from 3 manufacturers. 1 delayed (+2 days, weather). Dock conflict detected: Steelcase + Herman Miller at Dock 2, 10AM. AI suggests resolution.',
        app: 'dupler-warehouse',
        role: 'Expert',
    },
    {
        id: 'd2.4',
        groupId: 2,
        groupTitle: 'Flow 2: Warehouse & Transit Inventory',
        title: 'Pre-Install Staging & Dispatch',
        description: 'Staging checklist for tomorrow\'s installation: 28/30 items verified, 2 pending (arriving today 2PM). Installer ProInstall LLC confirmed, Thursday 8AM.',
        app: 'dupler-warehouse',
        role: 'Dealer',
    },

    // ── Flow 3: Unified Reporting & Analytics ─────────────────────────────────
    {
        id: 'd3.1',
        groupId: 3,
        groupTitle: 'Flow 3: Unified Reporting & Analytics',
        title: 'Dual-System Data Sync',
        description: 'HubSpot sync: 47 deals, $2.8M weighted pipeline. Core sync: 12 active projects, $1.4M receivables. AI projects Q2 close rate at 34% based on 18-month historical patterns.',
        app: 'dupler-reporting',
        role: 'System',
    },
    {
        id: 'd3.2',
        groupId: 3,
        groupTitle: 'Flow 3: Unified Reporting & Analytics',
        title: 'Reconciliation & Expert Review',
        description: 'AI reconciles HubSpot vs Core: 44/47 deals matched (93.6%). Expert resolves 3 discrepancies: 1 duplicate, 1 amount mismatch ($4,200), 1 missing invoice link. KPIs: DSO 42d, Aging $280K.',
        app: 'dupler-reporting',
        role: 'Expert',
    },
    {
        id: 'd3.3',
        groupId: 3,
        groupTitle: 'Flow 3: Unified Reporting & Analytics',
        title: 'AI Report Assembly',
        description: 'AI assembles executive report from reconciled data: Pipeline Health, Operations Summary, Financial Reconciliation, AI Recommendations. PDF-ready layout generated.',
        app: 'dupler-reporting',
        role: 'System',
    },
    {
        id: 'd3.4',
        groupId: 3,
        groupTitle: 'Flow 3: Unified Reporting & Analytics',
        title: 'Executive Report & Distribution',
        description: 'Dealer reviews 4-section report with drill-down. 3 AI recommendations: consolidate shipments ($1,200 savings), follow-up inactive deal, margin alert on 3 items. Export PDF to stakeholders.',
        app: 'dupler-reporting',
        role: 'Dealer',
    },
];

// ─── Step Behavior ───────────────────────────────────────────────────────────

export const DUPLER_STEP_BEHAVIOR: Record<string, StepBehavior> = {
    // Flow 1: PDF to SIFF Intelligence
    'd1.1': { mode: 'auto', duration: 8, aiSummary: 'OCR engine extracting 45 line items from supplier PDF — 99.2% accuracy...' },
    'd1.2': { mode: 'interactive', userAction: 'Review SIFF mapping: 3 obsolete SKUs, 2 description mismatches. Approve when all 5 exceptions reviewed.' },
    'd1.3': { mode: 'interactive', userAction: 'Review price discrepancies: $2,140 across 4 lines. Resolve each flag, then click "Validate & Continue".' },
    'd1.4': { mode: 'interactive', userAction: 'Review approval chain and SIFF summary. Click "Export to Core" to confirm $187,450 SIFF file.' },

    // Flow 2: Warehouse & Transit
    'd2.1': { mode: 'interactive', userAction: 'Review receiving scan: 35/38 matched, 2 missing, 1 wrong item. Click "Confirm Receiving".' },
    'd2.2': { mode: 'auto', duration: 8, aiSummary: 'Auto-assigning 35 items to warehouse zones — optimizing by project schedule and pick frequency...' },
    'd2.3': { mode: 'interactive', userAction: 'Review transit: 5 shipments, dock conflict detected. Resolve conflict, then click "Update Schedule".' },
    'd2.4': { mode: 'interactive', userAction: 'Verify staging checklist: 28/30 items ready. Confirm installer dispatch for Thursday 8AM.' },

    // Flow 3: Unified Reporting
    'd3.1': { mode: 'auto', duration: 10, aiSummary: 'Syncing HubSpot pipeline (47 deals, $2.8M) + Core operations (12 projects, $1.4M receivables)...' },
    'd3.2': { mode: 'interactive', userAction: 'Review reconciliation: 44/47 matched, 3 exceptions. Resolve discrepancies, then click "Acknowledge & Continue".' },
    'd3.3': { mode: 'auto', duration: 8, aiSummary: 'Assembling executive report — Pipeline Health, Operations, Reconciliation, AI Recommendations...' },
    'd3.4': { mode: 'interactive', userAction: 'Review executive report sections. Click "Export PDF & Send to Team" to distribute.' },
};

// ─── Step Messages (AI Agent Progress) ───────────────────────────────────────

export const DUPLER_STEP_MESSAGES: Record<string, string[]> = {
    // Flow 1
    'd1.1': [
        'OCRAgent: ingesting supplier PDF — 12 pages detected...',
        'TextExtractAgent: parsing line items — 45 items identified',
        'LineParserAgent: extracting part numbers, quantities, pricing',
        'CatalogMapper: pre-mapping manufacturer codes to SIFF catalog',
    ],
    'd1.2': [
        'SIFFMappingAgent: cross-referencing 45 items against SIFF catalog...',
        '40 items auto-mapped with 95%+ confidence',
        '3 obsolete SKUs detected — substitution suggestions generated',
        '2 description mismatches flagged for expert review',
    ],
    'd1.3': [
        'PriceValidationAgent: cross-checking against active contracts...',
        'Contract DB: 41 items match current pricing',
        'Discrepancy found: 4 lines with $2,140 total variance',
        'Flags: 2 outdated prices, 1 qty mismatch, 1 UOM error',
    ],
    'd1.4': [
        'ComplianceAgent: validating data integrity and contract terms...',
        'Approval chain: AI Compliance ✓ → Expert ✓',
        'SIFFGeneratorAgent: building compliant file — 45 items, $187,450',
        'Export ready — Core system sync initiated',
    ],

    // Flow 2
    'd2.1': [
        'ReceivingAgent: scanning packing list — 38 items expected...',
        'QR scan matching: 35/38 auto-matched to PO lines',
        '2 items missing from shipment — backorder flag raised',
        '1 wrong item detected (Fog vs Graphite) — claim CLM-2026-047 drafted',
    ],
    'd2.2': [
        'ZoneAnalyzer: evaluating capacity across 3 warehouse zones...',
        'Zone A (Project): 60% → assigning 20 items for Thursday install',
        'Zone B (General): 45% → 12 items for stock replenishment',
        'PlacementOptimizer: 3 items routed to QC — warehouse at 74%',
    ],
    'd2.3': [
        'TransitAgent: tracking 5 active shipments from 3 manufacturers...',
        '2 arriving today: Steelcase (14 items) + Herman Miller (8 items)',
        'Delayed: Knoll shipment — weather hold, ETA +2 days',
        'Conflict detected: Dock 2 double-booked at 10AM — resolution needed',
    ],
    'd2.4': [
        'StagingAgent: preparing checklist for Project DUP-2026-04...',
        '28 of 30 items staged and verified — 2 pending delivery (2PM)',
        'Installer confirmed: ProInstall LLC, Thursday 8AM-4PM, 4 crew',
        'Dispatch preparation complete — verification photos pending',
    ],

    // Flow 3
    'd3.1': [
        'HubSpotSyncAgent: connecting pipeline API — authenticated...',
        '47 active deals loaded — $2.8M weighted pipeline value',
        'CoreSyncAgent: pulling operations data — 12 projects, $1.4M receivables',
        'AIProjector: Q2 close rate 34% — based on 18-month pattern analysis',
    ],
    'd3.2': [
        'ReconciliationAgent: matching HubSpot deals to Core invoices...',
        '44/47 deals auto-matched — 93.6% reconciliation rate',
        '3 discrepancies identified: duplicate, amount mismatch, missing link',
        'KPI calculation complete: DSO 42d, Aging 30+ $280K, On-time 91%',
    ],
    'd3.3': [
        'ReportAssembler: building Pipeline Health section...',
        'ChartGenerator: creating funnel, KPI cards, trend visualizations',
        'InsightEngine: analyzing patterns — 3 actionable recommendations found',
        'Executive report assembled — 4 sections, PDF-ready',
    ],
    'd3.4': [
        'Report ready for distribution — 4 interactive sections',
        'AI Recommendation 1: Consolidate shipments → $1,200 savings',
        'AI Recommendation 2: Deal DUP-HP-0039 inactive 14 days → follow-up',
        'AI Recommendation 3: 3 items below 25% margin threshold — review pricing',
    ],
};

// ─── Self-Indicated Steps (handle own AI indicator) ──────────────────────────

export const DUPLER_SELF_INDICATED: string[] = [
    'd1.1', 'd1.2', 'd1.3', 'd1.4',   // Flow 1: all steps (pipeline processing visible)
    'd2.1', 'd2.2',                     // Flow 2: receiving + warehouse assignment
    'd3.1', 'd3.2', 'd3.3',            // Flow 3: sync, recon, report assembly
];

// ─── Step Timing ─────────────────────────────────────────────────────────────

export interface DuplerStepTiming {
    notifDelay: number;     // ms before notification appears
    notifDuration: number;  // ms notification stays before processing
    agentStagger: number;   // ms between each agent appearing
    agentDone: number;      // ms after agent appears before checkmark
    breathing: number;      // ms pause between processing and revealed
    resultsDur: number;     // ms results shown before auto-advance (0 = manual)
}

export const DUPLER_STEP_TIMING: Record<string, DuplerStepTiming> = {
    // Flow 1: PDF to SIFF
    'd1.1': { notifDelay: 1500, notifDuration: 5000, agentStagger: 700, agentDone: 500, breathing: 1200, resultsDur: 8000 },
    'd1.2': { notifDelay: 2500, notifDuration: 6000, agentStagger: 900, agentDone: 600, breathing: 1500, resultsDur: 0 },
    'd1.3': { notifDelay: 2000, notifDuration: 5000, agentStagger: 800, agentDone: 500, breathing: 1200, resultsDur: 0 },
    'd1.4': { notifDelay: 2000, notifDuration: 4000, agentStagger: 0,   agentDone: 0,   breathing: 0,    resultsDur: 0 },

    // Flow 2: Warehouse & Transit
    'd2.1': { notifDelay: 2000, notifDuration: 6000, agentStagger: 800, agentDone: 500, breathing: 1500, resultsDur: 0 },
    'd2.2': { notifDelay: 1500, notifDuration: 5000, agentStagger: 700, agentDone: 500, breathing: 1000, resultsDur: 8000 },
    'd2.3': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,   agentDone: 0,   breathing: 0,    resultsDur: 0 },
    'd2.4': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,   agentDone: 0,   breathing: 0,    resultsDur: 0 },

    // Flow 3: Unified Reporting
    'd3.1': { notifDelay: 2000, notifDuration: 6000, agentStagger: 900, agentDone: 600, breathing: 1500, resultsDur: 10000 },
    'd3.2': { notifDelay: 2500, notifDuration: 6000, agentStagger: 800, agentDone: 500, breathing: 1200, resultsDur: 0 },
    'd3.3': { notifDelay: 1500, notifDuration: 5000, agentStagger: 700, agentDone: 500, breathing: 1000, resultsDur: 8000 },
    'd3.4': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,   agentDone: 0,   breathing: 0,    resultsDur: 0 },
};

// ═══════════════════════════════════════════════════════════════════════════════
// WRG Texas — Demo Profile
// 18-stage quoting process: AI automates intake → handoff → estimation → assembly
//
// Flow 1: Project Intake & Triage (5 steps, w1.1-w1.5)
//   w1.1-w1.4: AI automated pipeline (System role)
//   w1.5: Dealer HITL review & pipeline confirmation
//
// Flow 2: Labor Estimation — PDF to Approved Quote (7 steps, w2.1-w2.7)
//   w2.1-w2.5: AI automated pipeline (System role, ~75s total)
//   w2.6-w2.7: Estimator HITL review + CORE write-back
//
// Flow 3: Design-to-Estimate Handoff (5 steps, w3.1-w3.5)
//   w3.1-w3.4: AI automated pipeline (System role)
//   w3.5: Expert HITL validation & release
//
// Flow 4: Quote Assembly & Execution (5 steps, w4.1-w4.5)
//   w4.1-w4.4: AI automated pipeline (System role)
//   w4.5: Dealer HITL review & client release
//
// Data source: JPS Health Center for Women (real project)
//   24 line items, 185.04 man-hours, $10,547.28 at $57/hr
// ═══════════════════════════════════════════════════════════════════════════════

import type { DemoStep } from '../demoProfiles';
import type { StepBehavior } from '../../components/demo/DemoStepBanner';

// ─── STEPS ───────────────────────────────────────────────────────────────────

export const WRG_DEMO_STEPS: DemoStep[] = [

    // ═══════════════════════════════════════════
    // FLOW 1: Project Intake & Triage (Stages 1-5)
    // 4 automated + 1 HITL = 5 steps
    // Pain Points: #4 (no data layer), #1 (tribal knowledge), #6 (scope risk)
    // ═══════════════════════════════════════════
    {
        id: 'w1.1',
        groupId: 0,
        groupTitle: 'Flow 1: Project Intake & Triage',
        title: 'Client Request Capture',
        description: 'The AI agent monitors the shared inbox, detects a project request from JPS Health Network for a new Women\'s Health Center wing, and extracts key parameters — 14,200 sqft, 6 floors, healthcare vertical, MillerKnoll primary spec. The new request enters the active pipeline alongside 4 other projects.',
        app: 'wrg-intake',
        role: 'System',
    },
    {
        id: 'w1.2',
        groupId: 0,
        groupTitle: 'Flow 1: Project Intake & Triage',
        title: 'Scope Analysis & Complexity Scoring',
        description: 'AI analyzes the project scope against 340 historical WRG projects. Complexity score: 8.2/10 — hospital delivery protocol, 119 task chairs triggering scope limit warnings, and custom booth seating. Historical rate intelligence predicts labor range of $9,800–$12,200 based on 12 healthcare precedents.',
        app: 'wrg-intake',
        role: 'System',
    },
    {
        id: 'w1.3',
        groupId: 0,
        groupTitle: 'Flow 1: Project Intake & Triage',
        title: 'Estimator Assignment & Routing',
        description: 'The routing engine evaluates estimator workload, location, and specialization. Mark Williams (Dallas, 3 active projects, 96.3% healthcare accuracy) is selected over Jaime Gonzalez (Houston, 5 active, 264 mi away). Assignment set for next business day.',
        app: 'wrg-intake',
        role: 'System',
    },
    {
        id: 'w1.4',
        groupId: 0,
        groupTitle: 'Flow 1: Project Intake & Triage',
        title: 'Design Brief & CORE Record',
        description: 'AI assembles a structured design brief from intake data, creates a Smartsheet row (#2026-JPS-HCW) with attachments linked, and generates CORE quote request #QR-116719. The Design Team (Sarah Chen) is notified at HIGH priority.',
        app: 'wrg-intake',
        role: 'System',
    },
    {
        id: 'w1.5',
        groupId: 0,
        groupTitle: 'Flow 1: Project Intake & Triage',
        title: 'Sales Review & Pipeline Confirmation',
        description: 'The WRG business team reviews the AI-generated intake summary — project parameters, complexity score 8.2/10, estimator assignment (Mark Williams), and pipeline position among 5 active projects. Clicking "Confirm & Proceed to Design" authorizes the design phase.',
        app: 'wrg-intake-review',
        role: 'Dealer',
    },

    // ═══════════════════════════════════════════
    // FLOW 2: Labor Estimation — PDF to Approved Quote (Stages 10-14)
    // 5 automated + 2 HITL = 7 steps
    // Pain Points: #1 (tribal knowledge), #2 (disconnected tools), #3 (manual PDF)
    // ═══════════════════════════════════════════
    {
        id: 'w2.1',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'CORE Trigger & Assignment',
        description: 'The AI agent monitors CORE for new estimation requests. When a request is marked as ready, it parses the project scope, identifies site constraints (hospital delivery, elevator access, dock availability), and assigns the job to the correct estimator based on office location.',
        app: 'wrg-labor',
        role: 'System',
    },
    {
        id: 'w2.2',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'PDF Ingestion & Data Extraction',
        description: 'AI agents pull the Product Selection Sheet and Spec Sheet PDFs from CORE. Claude Sonnet 4 extracts structured data — product codes, descriptions, quantities, and KD (knocked-down) flags. Each line item is validated against the spec drawings to catch mismatches.',
        app: 'wrg-labor',
        role: 'System',
    },
    {
        id: 'w2.3',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'Product-to-Category Mapping',
        description: 'Each extracted product is mapped to a delivery category and an installation category using rate lookup tables. Items that match standard categories are auto-mapped at HIGH confidence. Unrecognized items go through LLM inference and are flagged at LOW confidence for estimator review.',
        app: 'wrg-labor',
        role: 'System',
    },
    {
        id: 'w2.4',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'Dual-Engine Calculation',
        description: 'Two calculation engines run in parallel. The Delivery Engine applies per-item minute rates at $0.95/min, then adds Section F multipliers (hospital, stairs, floors) and Section G transport charges. The Installation Engine multiplies quantities by man-hour rates at $57/hr. Scope limits are checked automatically.',
        app: 'wrg-labor',
        role: 'System',
    },
    {
        id: 'w2.5',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'Draft Generation & Scope Check',
        description: 'The AI assembles a combined estimate with line-item breakdown, exception log, and audit trail. Items exceeding scope limits or with low confidence mappings are flagged. The draft is sent to the estimator via email link for review — no login required.',
        app: 'wrg-labor',
        role: 'System',
    },
    {
        id: 'w2.6',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'Estimator Review (HITL)',
        description: 'The estimator opens the AI-generated draft and reviews all 24 line items. Flagged items are highlighted — scope limit overrides, low confidence mappings, and quantity mismatches. The estimator can approve, override rates, reclassify categories, or add notes. Every change is logged.',
        app: 'wrg-review',
        role: 'Estimator',
    },
    {
        id: 'w2.7',
        groupId: 1,
        groupTitle: 'Flow 2: Labor Estimation',
        title: 'Approval & CORE Write-Back',
        description: 'The estimator reviews the final comparison between the AI draft and their adjustments, then submits the approved estimate. The agent writes the lump sum and audit trail PDF back to CORE and notifies the salesperson. Total time: under 5 minutes vs 4-8 hours manual.',
        app: 'wrg-review',
        role: 'Estimator',
    },

    // ═══════════════════════════════════════════
    // FLOW 3: Design-to-Estimate Handoff (Stages 6-9)
    // 4 automated + 1 HITL = 5 steps
    // Pain Points: #3 (manual PDF), #4 (no data layer), #1 (tribal knowledge), #6 (scope risk)
    // ═══════════════════════════════════════════
    {
        id: 'w3.1',
        groupId: 2,
        groupTitle: 'Flow 3: Design-to-Estimate Handoff',
        title: 'Design Package Upload & Detection',
        description: 'The Design Team uploads the completed PDF package to CORE — Product Spec Sheet and Product Selection Sheet totaling 24 pages. The AI agent detects the upload, validates file formats (PDF/A compliant), confirms designer identity (Sarah Chen) against Smartsheet assignment, and logs file hashes for audit trail.',
        app: 'wrg-handoff',
        role: 'System',
    },
    {
        id: 'w3.2',
        groupId: 2,
        groupTitle: 'Flow 3: Design-to-Estimate Handoff',
        title: 'Package Completeness Validation',
        description: 'AI validates the design package against an 8-point completeness checklist — manufacturer codes, quantities, KD flags, floor assignments, and site constraints. Cross-document verification catches 1 quantity discrepancy (Spec=19 vs Selection=20 on stacking chairs). Floor 4 has 2 items without room assignments.',
        app: 'wrg-handoff',
        role: 'System',
    },
    {
        id: 'w3.3',
        groupId: 2,
        groupTitle: 'Flow 3: Design-to-Estimate Handoff',
        title: 'Product Catalog Cross-Reference',
        description: 'Each product code is cross-referenced against 200+ manufacturer catalogs. 22 of 24 products verified with current pricing. Two flags: the OFS Coact Serpentine is a custom configuration with 12-week lead time, and the Nemschoff NC-2240 recliner has been discontinued — successor NC-2250 available at +$85/unit.',
        app: 'wrg-handoff',
        role: 'System',
    },
    {
        id: 'w3.4',
        groupId: 2,
        groupTitle: 'Flow 3: Design-to-Estimate Handoff',
        title: 'Handoff Package Assembly',
        description: 'The system confirms Mark Williams as the assigned estimator, assembles the complete handoff package (validated PDFs, checklist results, catalog flags, complexity score 8.2/10, predicted labor range $9,800–$12,200), and sends the estimation-ready notification via email with token-based access — no CORE login required.',
        app: 'wrg-handoff',
        role: 'System',
    },
    {
        id: 'w3.5',
        groupId: 2,
        groupTitle: 'Flow 3: Design-to-Estimate Handoff',
        title: 'Design Package Validation',
        description: 'The validation review shows AI results: completeness checklist (7/8 passed), 1 quantity discrepancy between spec and selection sheets, 2 catalog flags (custom lead time + discontinued SKU), and Floor 4 coverage gap. Each flagged item must be acknowledged before releasing the package to estimation.',
        app: 'wrg-handoff-review',
        role: 'Expert',
    },

    // ═══════════════════════════════════════════
    // FLOW 4: Quote Assembly & Execution (Stages 15-18)
    // 4 automated + 1 HITL = 5 steps
    // Pain Points: #2 (disconnected tools), #4 (no data), #5 (inconsistent outputs), #6 (scope risk)
    // ═══════════════════════════════════════════
    {
        id: 'w4.1',
        groupId: 3,
        groupTitle: 'Flow 4: Quote Assembly & Execution',
        title: 'Estimate Approval & Staging',
        description: 'CORE detects that Mark Williams has submitted the approved labor estimate ($10,547 installation + $4,831 delivery = $15,378 combined). The system notifies the salesperson and retrieves the MillerKnoll product quote ($287,450 list). Both components are staged for the Sales Coordinator to assemble the final client proposal.',
        app: 'wrg-assembly',
        role: 'System',
    },
    {
        id: 'w4.2',
        groupId: 3,
        groupTitle: 'Flow 4: Quote Assembly & Execution',
        title: 'Quote Combination & Markup Engine',
        description: 'The markup engine applies WRG\'s pricing rules: JPS Health Network contracted discount (38% off list = $178,219 net product), standard 15% labor margin ($15,378 → $17,685), and freight calculated at $6,234 based on hospital dock delivery. Combined proposal total: $202,138. Sales tax exemption flagged (government healthcare entity).',
        app: 'wrg-assembly',
        role: 'System',
    },
    {
        id: 'w4.3',
        groupId: 3,
        groupTitle: 'Flow 4: Quote Assembly & Execution',
        title: 'Client Proposal Generation',
        description: 'AI generates a branded WRG client proposal with line-item product breakdown, labor summary, freight charges, payment terms (Net 30), and 30-day validity. Delivery timeline projected: 8–10 weeks for standard items, 12 weeks for the OFS Coact custom configuration. The proposal PDF is attached to CORE.',
        app: 'wrg-assembly',
        role: 'System',
    },
    {
        id: 'w4.4',
        groupId: 3,
        groupTitle: 'Flow 4: Quote Assembly & Execution',
        title: 'Execution Planning Preview',
        description: 'The system generates an execution plan: 3-phase delivery (Floors 1-2 week 8, Floors 3-4 week 9, Floors 5-6 week 10), 4-person crew for 3 days on-site (185 man-hours), hospital delivery protocol (sterile corridor, after-hours dock, elevator). Compliance package assembled — 47 decisions tracked across all 4 flows.',
        app: 'wrg-assembly',
        role: 'System',
    },
    {
        id: 'w4.5',
        groupId: 3,
        groupTitle: 'Flow 4: Quote Assembly & Execution',
        title: 'Proposal Review & Release',
        description: 'The WRG business team reviews the assembled proposal: complete pricing breakdown (product $178,219 + labor $17,685 + freight $6,234 = $202,138), delivery timeline, execution plan, and full audit trail (47 decisions). Clicking "Release to Client" sends the proposal to JPS Health Network and creates the execution planning record.',
        app: 'wrg-assembly-review',
        role: 'Dealer',
    },
];

// ─── STEP BEHAVIOR ───────────────────────────────────────────────────────────

export const WRG_DEMO_STEP_BEHAVIOR: Record<string, StepBehavior> = {
    // Flow 1: Project Intake & Triage
    'w1.1': { mode: 'auto', duration: 20, aiSummary: 'EmailMonitor detected JPS Health Network request — extracting project parameters from attachments' },
    'w1.2': { mode: 'auto', duration: 16, aiSummary: 'ScopeAnalyzer cross-referencing JPS against 340 historical projects — complexity score 8.2/10' },
    'w1.3': { mode: 'auto', duration: 12, aiSummary: 'EstimatorRouter evaluating workload — assigning Mark Williams (Dallas), 96.3% healthcare accuracy' },
    'w1.4': { mode: 'auto', duration: 11, aiSummary: 'BriefAssembler generating design brief — routing to Design Team via Smartsheet' },
    'w1.5': { mode: 'interactive', userAction: 'Review intake summary and pipeline position. Click "Confirm & Proceed to Design"' },
    // Flow 2: Labor Estimation
    'w2.1': { mode: 'auto', duration: 12, aiSummary: 'CORE detected estimation request — parsing site constraints for JPS Health Center' },
    'w2.2': { mode: 'auto', duration: 20, aiSummary: '4 AI agents extracting structured data from JPS_116719 PDF — 24 line items identified' },
    'w2.3': { mode: 'auto', duration: 15, aiSummary: 'CategoryMapper cross-referencing products — 20 HIGH + 4 LOW confidence mappings' },
    'w2.4': { mode: 'auto', duration: 14, aiSummary: 'Dual engines calculating: delivery pricing + installation costing in parallel' },
    'w2.5': { mode: 'auto', duration: 13, aiSummary: 'DraftBuilder assembling estimate — 5 items flagged, notifying estimator' },
    'w2.6': { mode: 'interactive', userAction: 'Review 24 line items. Resolve 5 flagged items (amber). Click "Approve & Submit to CORE"' },
    'w2.7': { mode: 'interactive', userAction: 'Review AI Draft vs After Review comparison. Click "Submit to CORE" to complete' },
    // Flow 3: Design-to-Estimate Handoff
    'w3.1': { mode: 'auto', duration: 13, aiSummary: 'UploadMonitor detected 2 PDFs in CORE — JPS_116719 spec + selection sheets uploaded by Sarah Chen' },
    'w3.2': { mode: 'auto', duration: 18, aiSummary: 'CompletenessChecker validating JPS package — 7/8 checklist items passed, 1 warning' },
    'w3.3': { mode: 'auto', duration: 15, aiSummary: 'CatalogVerifier cross-referencing 24 products against 200+ manufacturer catalogs — 2 flags' },
    'w3.4': { mode: 'auto', duration: 11, aiSummary: 'HandoffAssembler packaging validated documents — notifying Mark Williams for labor estimation' },
    'w3.5': { mode: 'interactive', userAction: 'Review checklist results, resolve 3 flagged items. Click "Acknowledge & Release to Estimation"' },
    // Flow 4: Quote Assembly & Execution
    'w4.1': { mode: 'auto', duration: 14, aiSummary: 'CoreMonitor: estimate approved — staging labor ($15,378) + product ($287,450) for quote assembly' },
    'w4.2': { mode: 'auto', duration: 16, aiSummary: 'MarkupEngine applying JPS contracted discount (38% off) + 15% labor margin — proposal $202,138' },
    'w4.3': { mode: 'auto', duration: 13, aiSummary: 'ProposalGenerator building client-facing document — 8-10 week delivery, 12-week custom lead' },
    'w4.4': { mode: 'auto', duration: 15, aiSummary: 'ExecutionPlanner generating 3-phase delivery + 4-person crew dispatch for JPS — 3 days on-site' },
    'w4.5': { mode: 'interactive', userAction: 'Review pricing breakdown and execution plan. Click "Release to Client" to send proposal to JPS Health Network' },
};

// ─── STEP MESSAGES (AI Agent Progress) ───────────────────────────────────────

export const WRG_DEMO_STEP_MESSAGES: Record<string, string[]> = {
    // Flow 1: Project Intake & Triage
    'w1.1': [
        'EmailMonitor: new project request detected — JPS Health Network, Women\'s Health Center...',
        'AttachmentParser: extracting floor plans + spec narrative — 3 attachments identified',
        'ProjectProfiler: healthcare vertical, 14,200 sqft, 6 floors — MillerKnoll primary spec',
        'IntakeCreator: draft intake record created — JPS-HCW-2026 reference assigned',
    ],
    'w1.2': [
        'ScopeAnalyzer: parsing spec narrative — 24 product categories, healthcare delivery constraints...',
        'HistoricalMatcher: cross-referencing 340 past projects — 12 healthcare precedents found',
        'ComplexityEngine: score 8.2/10 — hospital protocol, scope limit risk, custom assembly',
        'RatePredictor: estimated labor range $9,800–$12,200 based on healthcare precedents',
    ],
    'w1.3': [
        'WorkloadAnalyzer: Mark Williams 3 active, Jaime Gonzalez 5 active — evaluating capacity...',
        'LocationRouter: JPS Fort Worth → Dallas office optimal (32 mi vs 264 mi Houston)',
        'SkillMatcher: Mark Williams — 96.3% healthcare accuracy, 12 precedents',
        'AssignmentWriter: assigned to Mark Williams (Dallas) — start date projected',
    ],
    'w1.4': [
        'BriefAssembler: compiling scope, constraints, and manufacturer specs into structured brief...',
        'SmartsheetWriter: creating row #2026-JPS-HCW — floor plans + spec narrative attached',
        'CoreRecordCreator: CORE quote request #QR-116719 created — design brief linked',
        'DesignNotifier: Design Team notified — Sarah Chen assigned, priority HIGH',
    ],
    'w1.5': [
        'Project intake summary ready — JPS Health Center for Women',
        'Complexity 8.2/10 — estimated timeline: 12 business days',
        'Sales reviewing scope, assignment, and pipeline position',
    ],
    // Flow 2: Labor Estimation
    'w2.1': [
        'CoreMonitor: new estimation request detected — JPS Health Center for Women...',
        'RequestParser: site constraints identified — hospital delivery, elevator access',
        'EstimatorRouter: assigning to Mark Williams — Dallas office',
        'JobCreator: estimation job #JPS-116719 created in CORE',
    ],
    'w2.2': [
        'AttachmentPuller: downloading 2 PDFs from CORE — Product Selection + Spec Sheet...',
        'PdfExtractor: Claude Sonnet 4 reading specification — 24 line items detected',
        'StructuredParser: extracting product codes, quantities, KD flags per row',
        'DataValidator: 1 quantity mismatch flagged — Selection vs Spec drawing',
    ],
    'w2.3': [
        'CategoryMapper: cross-referencing 24 products against delivery + installation rate tables...',
        'LookupEngine: 20 items auto-mapped at HIGH confidence (>=90%)',
        'LlmFallback: 4 unrecognized items processed via AI inference',
        'ConfidenceScorer: 20 HIGH + 4 LOW — 4 items flagged for estimator review',
    ],
    'w2.4': [
        'ScopeLimitChecker: 119 task chairs exceed 50-chair limit — flagging for override...',
        'DeliveryEngine: calculating per-item minutes at $0.95/min + Section F/G multipliers',
        'InstallEngine: 185.04 man-hours x $57/hr = $10,547.28',
        'DualCombiner: merging delivery + installation totals — combined estimate ready',
    ],
    'w2.5': [
        'DraftBuilder: assembling line-item breakdown — 24 items with dual pricing...',
        'ExceptionLogger: 5 items flagged — 1 scope limit + 4 low confidence mappings',
        'AuditTrailGenerator: creating decision record with extraction source and mapping logic',
        'EstimatorNotifier: sending draft review link to Mark Williams — token-based access',
    ],
    'w2.6': [
        'Draft estimate ready — 24 items, 5 flagged for review',
        'Scope limit alert: 119 Task Chairs exceed 50-chair policy',
        'Estimator reviewing — override modal available per item',
    ],
    'w2.7': [
        'CoreWriter: submitting approved estimate to CORE...',
        'AuditAttacher: uploading audit trail PDF with estimator overrides',
        'SalespersonNotifier: CORE emailing salesperson — service request complete',
    ],
    // Flow 3: Design-to-Estimate Handoff
    'w3.1': [
        'UploadMonitor: 2 PDFs detected in CORE — JPS_116719_SPEC.pdf + JPS_116719_SEL.pdf...',
        'FormatValidator: PDF/A compliant — 24 pages combined, integrity check passed',
        'DesignerVerifier: Sarah Chen upload confirmed — matches Smartsheet #2026-JPS-HCW',
        'AuditLogger: upload event recorded — file hashes and designer ID captured',
    ],
    'w3.2': [
        'CompletenessChecker: running 8-point checklist — manufacturer codes, KD flags, floor assignments...',
        'CrossDocVerifier: comparing spec vs selection — 23/24 items match, 1 discrepancy flagged',
        'FloorCoverageAnalyzer: all 6 floors covered — Floor 4 missing 2 room assignments',
        'ConstraintValidator: hospital protocol + elevator access documentation confirmed',
    ],
    'w3.3': [
        'CatalogVerifier: cross-referencing 24 products — MillerKnoll, OFS, Nemschoff catalogs...',
        'PricingChecker: 22/24 items confirmed with current pricing — no pending increases',
        'LeadTimeAnalyzer: OFS Coact Serpentine custom config — 12-week lead time flagged',
        'SkuValidator: Nemschoff NC-2240 discontinued — successor NC-2250 identified (+$85/unit)',
    ],
    'w3.4': [
        'AssignmentConfirmer: Mark Williams (Dallas) confirmed from intake — current load: 3 active projects...',
        'HandoffAssembler: compiling validated PDFs, checklist, catalog flags, complexity 8.2/10',
        'PredictionAttacher: historical range $9,800–$12,200 added to handoff brief',
        'EstimatorNotifier: emailing Mark Williams — estimation-ready link with token access',
    ],
    'w3.5': [
        'Validation report ready — 7/8 checklist items passed',
        '1 quantity discrepancy + 2 catalog flags require acknowledgement',
        'Expert reviewing before release to estimation',
    ],
    // Flow 4: Quote Assembly & Execution
    'w4.1': [
        'CoreMonitor: approved estimate detected — JPS-116719, $15,378 combined labor...',
        'SalesNotifier: CORE emailing salesperson — estimate + audit trail attached',
        'ProductQuoteRetriever: pulling MillerKnoll product quote — $287,450 list price',
        'QuoteStager: labor + product staged for assembly — markup calculation ready',
    ],
    'w4.2': [
        'DiscountResolver: applying JPS Health Network contracted discount — 38% off list...',
        'LaborMarkupEngine: 15% margin applied — $15,378 → $17,685 client price',
        'FreightCalculator: $6,234 freight — 24 items, hospital dock delivery, elevator access',
        'ProposalAssembler: combined proposal $202,138 — sales tax exempt flagged',
    ],
    'w4.3': [
        'TemplateEngine: applying WRG branded template — product, labor, freight sections...',
        'TimelineProjector: standard 8-10 weeks, OFS custom 12 weeks — Q3 2026 completion',
        'TermsAttacher: Net 30 payment, 30-day validity, tax exempt notation',
        'ProposalPublisher: PDF generated — attached to CORE, preview link for review',
    ],
    'w4.4': [
        'DeliveryScheduler: 3-phase delivery plan — 2 floors per phase, hospital protocol applied...',
        'CrewDispatcher: 4-person crew recommended — 3 days on-site, 185 man-hours',
        'ProtocolChecker: sterile corridor clearance, after-hours dock, elevator reservation required',
        'CompliancePackager: audit trail assembled — 47 tracked decisions across all 4 flows',
    ],
    'w4.5': [
        'Client proposal ready — $202,138 for JPS Health Center for Women',
        'Pricing: product $178,219 + labor $17,685 + freight $6,234',
        'Business team reviewing before release to JPS Health Network',
    ],
};

// ─── SELF-INDICATED STEPS ────────────────────────────────────────────────────
// Steps that handle their own AI indicator in the simulation UI

export const WRG_DEMO_SELF_INDICATED: string[] = [
    'w1.1', 'w1.2', 'w1.3', 'w1.4', 'w1.5',
    'w2.1', 'w2.2', 'w2.3', 'w2.4', 'w2.5', 'w2.6', 'w2.7',
    'w3.1', 'w3.2', 'w3.3', 'w3.4', 'w3.5',
    'w4.1', 'w4.2', 'w4.3', 'w4.4', 'w4.5',
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
    // Flow 1: Project Intake & Triage
    'w1.1': { notifDelay: 1000, notifDuration: 2500, agentStagger: 800,  agentDone: 500, breathing: 1000, resultsDur: 2500 },
    'w1.2': { notifDelay: 1000, notifDuration: 4500, agentStagger: 900,  agentDone: 600, breathing: 1500, resultsDur: 3000 },
    'w1.3': { notifDelay: 1000, notifDuration: 3500, agentStagger: 700,  agentDone: 500, breathing: 1000, resultsDur: 2500 },
    'w1.4': { notifDelay: 1000, notifDuration: 3500, agentStagger: 700,  agentDone: 500, breathing: 1000, resultsDur: 2000 },
    'w1.5': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,    agentDone: 0,   breathing: 0,    resultsDur: 0 },
    // Flow 2: Labor Estimation
    'w2.1': { notifDelay: 1500, notifDuration: 4000, agentStagger: 800,  agentDone: 500, breathing: 1200, resultsDur: 2000 },
    'w2.2': { notifDelay: 1000, notifDuration: 5000, agentStagger: 900,  agentDone: 600, breathing: 1500, resultsDur: 3000 },
    'w2.3': { notifDelay: 1000, notifDuration: 4000, agentStagger: 800,  agentDone: 500, breathing: 1200, resultsDur: 2500 },
    'w2.4': { notifDelay: 1000, notifDuration: 4000, agentStagger: 700,  agentDone: 500, breathing: 1000, resultsDur: 2500 },
    'w2.5': { notifDelay: 1000, notifDuration: 3500, agentStagger: 700,  agentDone: 500, breathing: 1000, resultsDur: 2000 },
    'w2.6': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,    agentDone: 0,   breathing: 0,    resultsDur: 0 },
    'w2.7': { notifDelay: 1500, notifDuration: 4000, agentStagger: 0,    agentDone: 0,   breathing: 0,    resultsDur: 0 },
    // Flow 3: Design-to-Estimate Handoff
    'w3.1': { notifDelay: 1500, notifDuration: 4000, agentStagger: 800,  agentDone: 500, breathing: 1200, resultsDur: 2500 },
    'w3.2': { notifDelay: 1000, notifDuration: 5000, agentStagger: 900,  agentDone: 600, breathing: 1500, resultsDur: 3000 },
    'w3.3': { notifDelay: 1000, notifDuration: 4000, agentStagger: 800,  agentDone: 500, breathing: 1200, resultsDur: 2500 },
    'w3.4': { notifDelay: 1000, notifDuration: 3500, agentStagger: 700,  agentDone: 500, breathing: 1000, resultsDur: 2000 },
    'w3.5': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,    agentDone: 0,   breathing: 0,    resultsDur: 0 },
    // Flow 4: Quote Assembly & Execution
    'w4.1': { notifDelay: 1500, notifDuration: 4000, agentStagger: 800,  agentDone: 500, breathing: 1200, resultsDur: 2500 },
    'w4.2': { notifDelay: 1000, notifDuration: 4500, agentStagger: 900,  agentDone: 600, breathing: 1500, resultsDur: 3000 },
    'w4.3': { notifDelay: 1000, notifDuration: 3500, agentStagger: 700,  agentDone: 500, breathing: 1000, resultsDur: 2500 },
    'w4.4': { notifDelay: 1000, notifDuration: 4500, agentStagger: 900,  agentDone: 600, breathing: 1500, resultsDur: 3000 },
    'w4.5': { notifDelay: 2000, notifDuration: 5000, agentStagger: 0,    agentDone: 0,   breathing: 0,    resultsDur: 0 },
};

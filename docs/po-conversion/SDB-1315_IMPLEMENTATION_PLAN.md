# SDB-1315 — PO Conversion Dealer UI · Implementation Plan

> **17 stories · 12 files exist · 10 components to build**
> Branch: `main` · Path: `src/features/po-conversion/`
> Status tokens from Strata DS (localhost:5173)

---

## 1 · Product Owner — Business Value Prioritization

### Value tiers

| Tier | Story/Component | Why | Business Impact |
|---|---|---|---|
| **P0 Critical path** | `ConvertToPOButton` | Entry point — without this the user can't start a conversion from a quote | Blocks entire feature |
| **P0 Critical path** | `SnapshotComparisonView` | Core differentiator — shows the frozen snapshot vs current quote so the user trusts the split is correct | Conversion confidence |
| **P0 Critical path** | `FinalizePOButton` | Transitions DRAFT → FINALIZED — gate before a PO can be sent to a vendor | Order integrity |
| **P0 Critical path** | `SubmitPODialog` | Sends the PO to the vendor via the selected adapter (EDI/email/portal). This is the money action. | Revenue cycle |
| **P1 Trust & audit** | `SubmissionHistory` | Shows every attempt + status so the user can troubleshoot FAILED submissions without calling support | Support deflection |
| **P1 Trust & audit** | `RevisionHistory` | Shows every edit with diff so the user has a paper trail for compliance | Audit compliance |
| **P1 Trust & audit** | `DiffViewer` | Shared by SnapshotComparisonView + RevisionHistory — visual diff of field changes | Reuse multiplier |
| **P2 Polish** | `ArtifactDownloads` | Downloadable PDFs/CSVs/EDI files — nice to have at launch but can fall back to direct links | Self-service |
| **P2 Polish** | `routes.tsx` | Route wiring — technically P0 but low effort, handled alongside the first page | Infrastructure |
| **P2 Polish** | Tests | Vitest + RTL coverage for the 10 new components | Quality gate |

### Recommended sprint order

1. **Sprint 1 (critical path):** routes.tsx → ConvertToPOButton → DiffViewer → SnapshotComparisonView → FinalizePOButton → SubmitPODialog
2. **Sprint 2 (trust):** SubmissionHistory → RevisionHistory → ArtifactDownloads
3. **Sprint 3 (quality):** Tests + visual QA + accessibility audit

---

## 2 · Design System Manager — Strata DS Token Usage

### Token reference (Strata DS · localhost:5173)

| Token | Value (light) | Usage |
|---|---|---|
| `--color-success` | `#098400` | SUBMITTED badge bg, success toasts |
| `--color-warning` | `#b27d00` | FINALIZED badge bg, discrepancy MEDIUM/HIGH |
| `--color-info` | `#2164d1` | DRAFT badge bg, info callouts |
| `--color-error` | `#d20322` | FAILED badge bg, CRITICAL discrepancy, destructive actions |
| `--color-ai` | `#8b5cf6` | AI-detected discrepancies, smart suggestions |
| `bg-brand-300` / `dark:bg-brand-500` | `#E6F993` / `#C8E84F` | Primary CTAs (ConvertToPOButton, FinalizePOButton, SubmitPODialog confirm) |
| `bg-card` / `dark:bg-zinc-800` | `#fafafa` / `#27272a` | All card containers |
| `border-border` | `#D0D4D8` | Card borders, dividers |
| `text-foreground` / `text-muted-foreground` | `#02060C` / `#959DA7` | Body + secondary text |

### Status badge mapping (already in ConversionStatusBadge.tsx)

| Status | Bg | Text | Icon |
|---|---|---|---|
| DRAFT | `bg-blue-500/10 text-blue-700 dark:text-blue-400` | "Draft" | `FileEdit` |
| FINALIZED | `bg-amber-500/10 text-amber-700 dark:text-amber-400` | "Finalized" | `Lock` |
| SUBMITTED | `bg-green-500/10 text-green-700 dark:text-green-400` | "Submitted" | `Send` |
| FAILED | `bg-red-500/10 text-red-700 dark:text-red-400` | "Failed" | `AlertTriangle` |

### Component styling rules

- **Cards**: `bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm`
- **Modals/Dialogs**: Headless UI `Dialog` + `z-[100]` + sidebar offset (like the WRG estimator pattern)
- **Primary CTAs**: `bg-primary text-primary-foreground rounded-lg` (bg-brand-300 in light, brand-500 in dark, text always `#02060C`)
- **Destructive CTAs**: `bg-destructive text-white rounded-lg`
- **Icons**: Lucide React exclusively (no heroicons, no custom SVG)
- **Tables**: `divide-y divide-border` rows, `text-[11px]` for data density, `tabular-nums` for numbers
- **Dark mode**: every hardcoded color MUST have a `dark:` variant. Test both themes.

---

## 3 · UX — Heuristics per Component

### ConvertToPOButton

| Heuristic | Application |
|---|---|
| **Visibility of status** | Show current conversion status next to the button (badge: "Not started" / "In progress" / "Completed") |
| **Match real world** | Label: "Convert to Purchase Orders" (not "Create POs" — aligns with dealer vocabulary) |
| **Error prevention** | Disable + tooltip if quote is not in APPROVED status. Show "Quote must be approved first" |
| **Feedback** | Loading spinner + "Converting..." text while the mutation runs. On success redirect to ConversionReviewPage |

### SnapshotComparisonView

| Heuristic | Application |
|---|---|
| **Recognition** | Side-by-side layout: "Frozen Snapshot" (left) vs "Current Quote" (right) with diff highlighting |
| **Minimalist** | Only show fields that DIFFER. Matching fields collapsed with a count: "18 fields match" |
| **Severity coding** | Color-code diffs by `DiscrepancySeverity`: LOW=muted, MEDIUM=warning, HIGH=error bg, CRITICAL=destructive banner |
| **Actionable** | Each discrepancy row has "Accept snapshot" / "Use current" / "Flag for review" inline CTAs |

### FinalizePOButton

| Heuristic | Application |
|---|---|
| **Confirmation** | Two-step: click → confirm dialog "Finalize PO-2026-0047? This locks the line items and enables vendor submission." |
| **Reversibility** | Clear messaging: "Finalized POs cannot be edited. Create a revision instead." |
| **Status** | Button changes from "Finalize" (DRAFT) → "Finalized ✓" (FINALIZED) → hidden (SUBMITTED) |

### SubmitPODialog

| Heuristic | Application |
|---|---|
| **Flexibility** | Adapter picker: EDI (default) / Email / Portal — each with a description of what happens |
| **Control** | Optional notes field (max 500 chars). "Include cover letter" toggle for email adapter. |
| **Feedback** | 3-phase: compose → sending (spinner) → result (success or error with retry). No auto-close on success — user reads the confirmation. |
| **Error recovery** | On FAILED: show error detail + "Retry" button + "Try different adapter" link |

### SubmissionHistory

| Heuristic | Application |
|---|---|
| **Temporal** | Vertical timeline layout (newest first). Each entry: timestamp + adapter icon + status badge + response detail |
| **Scannability** | Expandable rows — collapsed shows status + time, expanded shows full response + error detail |
| **Empty state** | "No submissions yet. Finalize the PO to enable vendor submission." with FinalizePOButton inline |

### RevisionHistory

| Heuristic | Application |
|---|---|
| **Diff visibility** | Each revision: header (revision #, actor, timestamp, summary) → expandable DiffViewer |
| **Progressive disclosure** | Collapsed by default. Click to expand inline. "Show all diffs" button at the top. |
| **Provenance** | Each revision links back to the actor and shows "via UI" / "via API" / "via AI" tags |

### DiffViewer

| Heuristic | Application |
|---|---|
| **Clarity** | Unified diff format: red strikethrough for removed, green highlight for added, amber for changed |
| **Context** | Show the field name, old value, new value on each row. Group by entity (line item / financial / header) |
| **Reuse** | Generic component accepting `PODiff[]` — consumed by SnapshotComparisonView + RevisionHistory |

### ArtifactDownloads

| Heuristic | Application |
|---|---|
| **Discoverability** | Grid of file cards with icon per format (PDF, CSV, EDI, XML), file size, date |
| **Direct action** | Single click downloads. No intermediate modal. |
| **Empty state** | "Artifacts will appear here after the PO is submitted." |

---

## 4 · Tech Lead — Implementation Plan by Dependencies

### Dependency graph

```
DiffViewer (leaf)
    ├── SnapshotComparisonView (uses DiffViewer)
    └── RevisionHistory (uses DiffViewer)

SubmitPODialog (leaf)
    └── SubmissionHistory (reads submission attempts after submit)

ConvertToPOButton (leaf)
    └── triggers ConversionReviewPage (existing)

FinalizePOButton (leaf)
    └── enables SubmitPODialog (DRAFT → FINALIZED gate)

ArtifactDownloads (leaf, no deps)

routes.tsx (wires existing pages + new components)
```

### Implementation order (dependency-aware)

| Phase | Component | Depends on | Effort | Files touched |
|---|---|---|---|---|
| **1a** | `routes.tsx` | nothing | S | New file + App.tsx lazy import |
| **1b** | `DiffViewer` | `PODiff` type (exists) | M | New file |
| **1c** | `ConvertToPOButton` | `useInitiateConversion` hook (exists) | S | New file |
| **2a** | `SnapshotComparisonView` | DiffViewer + `SnapshotDiscrepancy` type (exists) | L | New file |
| **2b** | `FinalizePOButton` | `useFinalizePO` hook (exists) | S | New file |
| **2c** | `SubmitPODialog` | `useSubmitPO` hook (exists) | M | New file |
| **3a** | `SubmissionHistory` | `usePOSubmissions` hook (exists) | M | New file |
| **3b** | `RevisionHistory` | DiffViewer + `usePORevisions` hook (exists) | M | New file |
| **3c** | `ArtifactDownloads` | `usePOArtifacts` hook (exists) | S | New file |
| **4** | Tests | All components | L | New `__tests__/` directory |

**S** = < 2 hrs · **M** = 2-4 hrs · **L** = 4-8 hrs

### Architecture notes

- **State management**: hooks.ts already provides all the query/mutation stubs. Each new component just calls the appropriate hook. No new global state needed.
- **Routing**: Create `routes.tsx` with lazy imports. Register under `/po-conversion/*` in the main router. Guard every route with `FeatureFlagGuard`.
- **Modals**: Use Headless UI `Dialog` with the `useDemo()` sidebar offset pattern (z-[100] + lg:left-80) from the WRG estimator. All modals must be closeable via Esc and backdrop click.
- **GraphQL migration**: When `GW-01/02/03` deploy to QA, swap the `useMockQuery` internals with real Apollo `useQuery`. The hook signatures don't change — only the data source.
- **Error handling**: Wrap each route-level page in `ConversionErrorBoundary` (already exists). Individual components show inline error states, not full-page errors.

### File template (new components)

```tsx
// src/features/po-conversion/[ComponentName].tsx
import { clsx } from 'clsx'
import { SomeIcon } from 'lucide-react'
import type { SomeType } from './types'
// No default exports — named export only for tree shaking.
// Add to index.ts barrel after implementation.
```

---

## 5 · QA — Verification & Acceptance Criteria

### Per-component acceptance criteria

#### ConvertToPOButton
- [ ] Renders on the quote detail page when quote status = APPROVED
- [ ] Disabled with tooltip when quote status != APPROVED
- [ ] Click triggers `useInitiateConversion()` mutation
- [ ] Shows loading spinner during mutation
- [ ] On success: navigates to `/po-conversion/review/:quoteId`
- [ ] On error: shows inline error toast with retry
- [ ] Works in dark mode
- [ ] Feature flag OFF: button hidden

#### SnapshotComparisonView
- [ ] Renders frozen snapshot data on the left, current values on the right
- [ ] Highlights discrepancies by severity (LOW/MEDIUM/HIGH/CRITICAL)
- [ ] Shows discrepancy count badge in the header
- [ ] Each discrepancy row shows field, snapshot value, current value, severity
- [ ] "Accept snapshot" / "Use current" actions work per row
- [ ] Uses DiffViewer internally for field-level diffs
- [ ] Empty state when no discrepancies: "Snapshot matches current quote"

#### FinalizePOButton
- [ ] Only shows on POs with status = DRAFT
- [ ] Click opens confirmation dialog
- [ ] Confirm triggers `useFinalizePO()` mutation
- [ ] On success: status badge updates to FINALIZED, button becomes disabled "Finalized ✓"
- [ ] On error: dialog stays open with error message + retry
- [ ] Keyboard accessible (Enter to confirm, Esc to cancel)

#### SubmitPODialog
- [ ] Only enabled on POs with status = FINALIZED
- [ ] Adapter picker: EDI / Email / Portal with descriptions
- [ ] Optional notes textarea (max 500 chars, char counter)
- [ ] Submit triggers `useSubmitPO()` mutation
- [ ] 3-phase UI: compose → sending → result
- [ ] Success: status badge updates to SUBMITTED, show confirmation
- [ ] Failure: show error detail + "Retry" + "Try different adapter"
- [ ] Closes cleanly via Esc or Cancel at any non-loading phase

#### SubmissionHistory
- [ ] Renders newest-first timeline of `POSubmissionAttempt[]`
- [ ] Each entry: timestamp, adapter icon, status badge, message
- [ ] Expandable: collapsed = one line, expanded = full detail + error
- [ ] Loading state: skeleton shimmer
- [ ] Empty state: descriptive message + FinalizePOButton

#### RevisionHistory
- [ ] Renders revisions list with revision number, actor, timestamp, summary
- [ ] Each revision expands to show DiffViewer with `PODiff[]`
- [ ] Collapsed by default
- [ ] Loading state: skeleton shimmer

#### DiffViewer
- [ ] Accepts `PODiff[]` prop
- [ ] Renders field name + old value (red strikethrough) + new value (green highlight)
- [ ] Groups diffs by type: added / removed / changed
- [ ] Empty state: "No changes"
- [ ] Compact mode for inline use + expanded mode for full-page use

#### ArtifactDownloads
- [ ] Renders grid of `POArtifact[]` cards
- [ ] Each card: file icon (by format), filename, size, date, download CTA
- [ ] Click triggers download via `downloadUrl`
- [ ] Loading state: skeleton
- [ ] Empty state: "Artifacts appear after submission"

#### routes.tsx
- [ ] `/po-conversion` → PODraftsListPage
- [ ] `/po-conversion/review/:quoteId` → ConversionReviewPage
- [ ] `/po-conversion/:poId` → PODetailPage
- [ ] All routes wrapped in `FeatureFlagGuard` + `ConversionErrorBoundary`
- [ ] Lazy loaded via `React.lazy`
- [ ] 404 fallback for unknown sub-routes

### Cross-cutting QA checks

- [ ] **Dark mode**: every component renders correctly in both light + dark
- [ ] **Responsive**: all pages work on 1024px+ (tablet landscape + desktop)
- [ ] **Feature flag**: when `po_conversion_enabled` is OFF, all routes redirect to 404 and no PO UI renders
- [ ] **Loading states**: every data-fetching view shows the appropriate skeleton from `skeletons.tsx`
- [ ] **Error boundaries**: a thrown error in any PO component is caught by `ConversionErrorBoundary` and shows a recovery UI
- [ ] **Accessibility**: all interactive elements keyboard-navigable, focus trapping in dialogs, ARIA labels on status badges
- [ ] **Strata DS tokens**: spot-check that brand-300 CTA, status badge colors, card styling all match the DS reference (localhost:5173)

---

## Appendix · Existing inventory

| File | Type | Exports | Status |
|---|---|---|---|
| `types.ts` | Types | 15 interfaces + 5 enums | Complete |
| `hooks.ts` | Hooks | 8 queries + 5 mutations (mock stubs) | Stubs ready |
| `mockData.ts` | Data | 4 PO drafts + timeline + revisions + submissions + artifacts | Complete |
| `usePoConversionEnabled.ts` | Hook | Feature flag check | Complete |
| `FeatureFlagGuard.tsx` | Guard | Route-level guard | Complete |
| `ConversionErrorBoundary.tsx` | Boundary | Error recovery | Complete |
| `ConversionStatusBadge.tsx` | Badge | DRAFT/FINALIZED/SUBMITTED/FAILED | Complete |
| `ConversionReviewPage.tsx` | Page | Full review with vendor split + discrepancies | Complete |
| `PODraftsListPage.tsx` | Page | PO list with search + filters | Complete |
| `PODetailPage.tsx` | Page | PO detail with tabs + inline finalize/submit dialogs | Complete (has inline finalize/submit — extract to standalone components) |
| `skeletons.tsx` | UI | 3 loading skeletons | Complete |
| `index.ts` | Barrel | All exports | Complete |

### Components to build (10)

| # | Component | Priority | Effort | Dependencies |
|---|---|---|---|---|
| 1 | `routes.tsx` | P0 | S | App.tsx |
| 2 | `DiffViewer.tsx` | P1 | M | types.ts |
| 3 | `ConvertToPOButton.tsx` | P0 | S | hooks.ts |
| 4 | `SnapshotComparisonView.tsx` | P0 | L | DiffViewer + types.ts |
| 5 | `FinalizePOButton.tsx` | P0 | S | hooks.ts |
| 6 | `SubmitPODialog.tsx` | P0 | M | hooks.ts |
| 7 | `SubmissionHistory.tsx` | P1 | M | hooks.ts |
| 8 | `RevisionHistory.tsx` | P1 | M | DiffViewer + hooks.ts |
| 9 | `ArtifactDownloads.tsx` | P2 | S | hooks.ts |
| 10 | `__tests__/*.test.tsx` | P2 | L | All components |

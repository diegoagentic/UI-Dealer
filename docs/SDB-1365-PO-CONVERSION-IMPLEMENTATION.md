# SDB-1365 — PO Conversion Dealer UI — Implementation Report

**Ticket:** SDB-1365 (front-react-strata-ui — PO Conversion Dealer UI)
**Epic:** SDB-1314 — Convert Quote to PO Lifecycle
**PRD:** SDB-1315 — Convert Quote to PO - Strata Dealer Experience
**Date:** 2026-04-10
**Branch:** `main`
**Commits:** `44d1082` → `7a38c0f`

---

## Overview

Full dealer-facing UI for PO conversion implemented: convert button, conversion review with snapshot/discrepancy viewer, PO drafts list, PO detail with timeline, finalization, manufacturer submission, revision history with diff viewer, artifact downloads. All behind feature flag. Integrated into QuoteDetail for usability (not isolated pages).

---

## Story Implementation Status (17 stories)

| Story | Title | Status | Notes |
|-------|-------|--------|-------|
| **FE-13** | Feature Flag Hook | ✅ Done | `usePoConversionEnabled` + `FeatureFlagGuard` with 404 fallback |
| **FE-11** | GraphQL Hooks + Types | ✅ Done | 15+ TS types (V2 aligned) + 13 hook stubs (8 queries + 5 mutations) |
| **FE-14** | Error Handling + Loading | ✅ Done | `ConversionErrorBoundary` + 3 skeleton loaders + toasts + empty states |
| **FE-01** | "Convert to PO" Button | ✅ Done | On QuoteDetail quick actions bar with confirmation dialog |
| **FE-02** | Conversion Review Page | ✅ Done | Modal overlay with snapshot viewer, vendor split, countdown, approve/reject |
| **FE-17** | Snapshot Comparison View | ✅ Done | Side-by-side: changed=amber, added=green, removed=red. Collapsible. |
| **FE-03** | PO Drafts List Page | ✅ Done | Vendor-scoped cards, status badges, search/status/vendor filters |
| **FE-04** | PO Detail Page ⚡ | ✅ Done | Line items table, financial summary, timeline, tabs Details + Revision History |
| **FE-10** | Conversion Status Badge | ✅ Done | DRAFT=blue, FINALIZED=amber, SUBMITTED=green, FAILED=red + spinner |
| **FE-12** | Route Configuration | ✅ Done | 3 routes in App.tsx with FeatureFlagGuard + embedded in QuoteDetail |
| **FE-05** | Finalize PO Button | ✅ Done | Visible on DRAFT, confirmation dialog, status change simulation |
| **FE-06** | Submit PO Dialog | ✅ Done | Adapter selection (email/EDI/portal), notes textarea |
| **FE-07** | Submission History | ✅ Done | Table with status badges (DELIVERED ✓ / FAILED ✗), adapter, response code |
| **FE-08** | Revision History + Diff | ✅ Done | Expandable revisions with color-coded diffs (added/removed/changed) |
| **FE-09** | Artifact Downloads | ✅ Done | File list with format, size, timestamp, download buttons |
| **FE-15** | Responsive Design | ⚠️ Partial | Responsive grids/flex, touch targets not fully verified |
| **FE-16** | Component Tests | ❌ Pending | No vitest/jest setup in project — QA agent responsibility |

---

## Files Created

```
src/features/po-conversion/
├── index.ts                      — Barrel export
├── types.ts                      — 15+ TypeScript interfaces (V2 entities)
├── hooks.ts                      — 13 mock hooks (queries + mutations)
├── mockData.ts                   — 4 POs, 5 timeline, 3 revisions, 2 submissions, 3 artifacts
├── usePoConversionEnabled.ts     — Feature flag hook (localStorage)
├── FeatureFlagGuard.tsx          — Guard component (renders 404 when disabled)
├── ConversionStatusBadge.tsx     — 4 status badges + ConvertingBadge spinner
├── ConversionReviewPage.tsx      — Snapshot viewer + comparison + vendor split + countdown
├── PODraftsListPage.tsx          — Vendor-scoped PO cards with filters
├── PODetailPage.tsx              — Full detail: items, financials, timeline, revisions, submissions, artifacts
├── ConversionErrorBoundary.tsx   — React error boundary with retry
└── skeletons.tsx                 — 3 skeleton loaders (drafts, detail, review)
```

## Files Modified

| File | Change |
|------|--------|
| `src/App.tsx` | Added 3 routes (conversion-review, po-drafts, po-detail) with FeatureFlagGuard |
| `src/QuoteDetail.tsx` | Added "Convert to PO" button, conversion review modal, "Purchase Orders" tab |

---

## Navigation Flow

```
QuoteDetail
 ├── Quick Actions → [Convert to PO]
 │    └── Confirmation Dialog (72h warning)
 │         └── Toast "Conversion Started..."
 │              └── Modal: Conversion Review
 │                   ├── Snapshot viewer (frozen read-only)
 │                   ├── Compare with Live (side-by-side diff)
 │                   ├── Vendor Split Preview (3 vendors)
 │                   ├── [Approve] → closes modal, "Purchase Orders" tab appears
 │                   └── [Reject] → closes modal, returns to QuoteDetail
 │
 ├── Tab: Quote Items (default)
 ├── Tab: Activity Stream
 └── Tab: Purchase Orders (appears after approval)
      └── PODraftsListPage (embedded)
           ├── 4 PO cards with status badges
           ├── Filters: search, status, vendor
           └── [View Details] → navigates to PODetailPage
                ├── Line items table
                ├── Financial summary
                ├── Timeline (5 events)
                ├── Submission History (2 attempts)
                ├── Artifacts (3 files)
                ├── Tab: Revision History (3 revisions with diffs)
                ├── [Finalize] (when DRAFT) → confirmation → FINALIZED
                └── [Submit to Vendor] (when FINALIZED) → adapter dialog → SUBMITTED
```

---

## How to Test

### Setup
```bash
cd c:/Users/User/Documents/design-system/strata-projects/config-evolution/UI-Dealer
npx vite --port 8085
```
Open `localhost:8085` in browser.

### Test 1: Feature Flag (FE-13)
1. Open DevTools Console
2. Run: `localStorage.setItem('FEATURE_PO_CONVERSION_ENABLED', 'false')`
3. Navigate to a PO page → should show **404 "This feature is not available"**
4. Run: `localStorage.removeItem('FEATURE_PO_CONVERSION_ENABLED')` to restore

### Test 2: Convert to PO Button (FE-01)
1. Transactions → Quotes → click any card → Details → arrow →
2. In **QuoteDetail**, find quick actions bar
3. Click **"Convert to PO"** (green icon)
4. Verify: confirmation dialog with 72h warning appears
5. Click **"Start Conversion"**
6. Verify: toast "Conversion Started..." → toast "Conversion Complete"

### Test 3: Conversion Review Modal (FE-02 + FE-17)
1. After Test 2, the review modal opens automatically
2. Verify: **Header** with "Conversion Review", "Quote QT-1025" badge, countdown timer
3. Verify: **3 stat cards** (Total POs: 3, Total Value: $121,935, Discrepancies: 2)
4. **Snapshot section**: click to expand, verify read-only frozen data table
5. Toggle **"Compare with Live"**: verify side-by-side with amber/green/red highlights
6. Scroll: **Vendor Split Preview** (Steelcase, Herman Miller, Knoll)
7. Click **"Approve & Create POs"** → modal closes, toast, new tab appears

### Test 4: Purchase Orders Tab (FE-03)
1. After Test 3, a new **"Purchase Orders"** tab appears in QuoteDetail
2. Click it → verify **4 PO cards** in 2-column grid
3. Verify badges: **Draft** (blue), **Finalized** (amber), **Submitted** (green), **Failed** (red)
4. Test **search**: type "Steelcase" → 1 card
5. Test **status filter**: select "DRAFT" → only Draft cards
6. Test **vendor filter**: select "Herman Miller" → 1 card
7. Verify **summary bar**: total POs, total value, status breakdown

### Test 5: PO Detail Page (FE-04 + FE-05 + FE-06 + FE-07 + FE-08 + FE-09)
1. From Test 4, click **"View Details"** on any card
2. Verify: breadcrumb, PO number, vendor name, status badge
3. **Details tab**: line items table (3 rows), financial summary, timeline (5 events)
4. Verify: **Submission History** table (DELIVERED ✓, FAILED ✗)
5. Verify: **Artifacts** section (3 files with download buttons)
6. Switch to **Revision History** tab: 3 revisions, click to expand diffs
7. **Finalize** (FE-05): click "Finalize" → confirmation → status changes to FINALIZED
8. **Submit** (FE-06): click "Submit to Vendor" → select adapter → add note → submit → SUBMITTED

### Test 6: Status Badge Variants (FE-10)
1. In PO Drafts List, verify each card has correct colored badge
2. Verify ConvertingBadge spinner renders (used in conversion flow)

### Test 7: Dark Mode
1. Toggle dark mode in navbar
2. Repeat Tests 2-6, verify:
   - Cards use `bg-zinc-800` backgrounds
   - Text is legible on dark backgrounds
   - Brand CTA buttons use `bg-brand-500` with `text-zinc-900`
   - Status badges maintain contrast

### Test 8: Error Boundary (FE-14)
1. ConversionErrorBoundary wraps pages — would catch runtime errors
2. Skeleton loaders available but require real GraphQL integration to trigger

---

## QA Pass Results

Static code review found and fixed 5 critical issues:

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | ConversionStatusBadge crashes on undefined status | HIGH | Added null check, returns null |
| 2 | Countdown timer was static (never updated) | HIGH | Converted to reactive hook with setInterval |
| 3 | Timeline/Revisions had no empty state message | MEDIUM | Added "No events yet" / "No revisions" |
| 4 | Badge rendered as `<button>` even when not clickable | MEDIUM | Uses `<span>` when no onClick |
| 5 | Decorative icons missing aria-hidden | LOW | Added `aria-hidden="true"` |

---

## Design System Compliance

- **No hardcoded hex colors** — all use DS tokens
- **Brand CTA**: `bg-brand-300 dark:bg-brand-500 text-zinc-900`
- **Cards**: `bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm`
- **Status colors**: green (success), amber (warning), red (error), blue (info), zinc (neutral)
- **Icons**: Lucide React exclusively
- **Quick Actions**: shared `QuickActions` component from `src/components/QuickActions.tsx`
- **Metric Cards**: shared `MetricCard` component from `src/components/MetricCard.tsx`

---

## Pending Items

1. **FE-15 Responsive**: Mobile viewport testing needed (grids are responsive, touch targets unverified)
2. **FE-16 Tests**: No vitest/jest infrastructure in project — requires setup before writing tests
3. **GraphQL Integration**: All hooks return mock data — swap to Apollo Client when GW-01/02/03 deploy to qa
4. **Figma Validation**: "UI-DESIGN: No Figma yet" — validate against Figma when design team delivers

---

## Blocked Dependencies

| Blocker | What it unblocks |
|---------|-----------------|
| GW-01 deployed to qa | Real conversion API calls |
| GW-02 deployed to qa | Real PO CRUD operations |
| GW-03 deployed to qa | Real revision history + artifact URLs |
| Figma design delivery | Visual validation before merge to qa |

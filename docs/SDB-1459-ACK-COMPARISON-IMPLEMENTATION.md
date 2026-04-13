# SDB-1459 — Dealer Comparison View — Implementation Report

**Ticket:** SDB-1459 (Ticket E — Dealer Comparison View)
**Epic:** SDB-1408 — PO vs ACK Comparison Engine
**Date:** 2026-04-10
**Branch:** `main`
**Commits:** `124a4e1` → `70a6d38`

---

## Overview

Dealer-facing UI for ACK comparison: status badges, comparison summary panel on ACK detail, and discrepancy indicators integrated into the ACK pipeline funnel. Expert Hub is out of scope.

---

## Story Implementation Status (3 stories)

| Story | Title | Status | Notes |
|-------|-------|--------|-------|
| **UI-01** | ComparisonStatusBadge | ✅ Done | 6 variants, aria-labels, null safety, DS tokens only |
| **UI-02** | ComparisonSummaryPanel | ✅ Done | On AckDetail, collapsible, skeleton, resolution actions |
| **UI-03** | Dealer Discrepancy Queue | ✅ Done | Integrated into ACK pipeline cards (not separate section) |

---

## Files Created

```
src/components/ack-comparison/
├── ComparisonStatusBadge.tsx     — 6 status variants with accessibility
├── ComparisonSummaryPanel.tsx    — Collapsible panel with resolution actions
└── DealerDiscrepancyQueue.tsx    — Standalone queue (kept for reference, not used in UI)
```

## Files Modified

| File | Change |
|------|--------|
| `src/AckDetail.tsx` | Added ComparisonSummaryPanel with mock report data |
| `src/Transactions.tsx` | ACK cards show ComparisonStatusBadge + "Compare PO vs ACK" button, severity filter, interactive Discrepancy Resolver modal |

---

## ComparisonStatusBadge Variants

| Status | Color | Label | Icon |
|--------|-------|-------|------|
| MATCH | Green | Confirmed | CheckCircle2 |
| PARTIAL_MATCH | Amber | Partial Match | AlertTriangle |
| MISMATCH | Red | Discrepancies Found | XCircle |
| UNLINKED | Gray | No PO Linked | Unlink |
| PENDING_SEMANTIC | Blue | Analysis Pending | Clock |
| IN_PROGRESS | Blue (animated) | Comparing... | Loader2 (spin) |

All have `aria-label` per status and `role="status"`. Renders `null` on undefined.

---

## ComparisonSummaryPanel Features

- **Header**: PO vs ACK Comparison title + ComparisonStatusBadge + discrepancy count + resolved count
- **Stats row**: Matched / Partial / Mismatch counts with icons
- **Progress bar**: green/amber/red proportional bar
- **Critical discrepancies list**: filtered by `severity === 'high'`
- **Resolution actions**: "Accept ACK" / "Keep PO" per discrepancy
- **"View Full Report"**: toggles between critical-only and all discrepancies
- **"Confirm All"**: appears when all discrepancies resolved
- **Auto-expands** on MISMATCH/PARTIAL_MATCH
- **Skeleton loading state** with animate-pulse
- **"No comparison available"** when report is null

---

## ACK Pipeline Integration

Instead of a separate queue section, discrepancies are shown directly on pipeline cards:

- Cards with MISMATCH/PARTIAL_MATCH show `ComparisonStatusBadge` + issue count
- "Compare PO vs ACK" brand CTA button on cards with discrepancies
- Severity filter dropdown in ACK toolbar (All Severity / high / medium / low)
- Interactive Discrepancy Resolver modal with selectable PO/ACK values + AI recommendation

---

## How to Test

### Setup
```bash
cd c:/Users/User/Documents/design-system/strata-projects/config-evolution/UI-Dealer
npx vite --port 8085
```

### Test 1: ComparisonStatusBadge (UI-01)
1. Transactions → Acknowledgements tab → pipeline view
2. Verify: Steelcase card shows red "Discrepancies Found" badge
3. Verify: Knoll card shows amber "Partial Match" badge
4. Verify: Haworth card shows blue "Analysis Pending" badge
5. Verify: Confirmed cards show no comparison badge

### Test 2: ComparisonSummaryPanel (UI-02)
1. Click any ACK card → navigate to ACK Detail
2. Verify: "PO vs ACK Comparison" panel at top with "Partial Match" badge
3. Verify: Stats (6 Matched, 2 Partial, 3 Mismatch) + progress bar
4. Verify: "Critical Discrepancies" section with 3 HIGH items
5. Click "Accept ACK" on a discrepancy → turns green "ACK value accepted"
6. Click "Keep PO" on another → turns green "PO value kept"
7. Click "View Full Report (5) →" → shows all discrepancies including non-critical
8. Resolve all → "Confirm All" button appears

### Test 3: Pipeline Discrepancy Tags (UI-03)
1. Transactions → Acknowledgements → verify severity filter dropdown
2. Filter by "high" → only cards with high severity shown
3. Click "Compare PO vs ACK" on Steelcase card → Discrepancy Resolver modal
4. Select PO or ACK value (click to highlight)
5. Review AI recommendation (94% confidence)
6. Click "Update PO to Match" or "Keep PO Value"
7. Verify toast notification and modal closes

### Test 4: Dark Mode
1. Toggle dark mode
2. Verify all badges maintain contrast
3. Verify brand CTA buttons use `bg-brand-500 text-zinc-900`
4. Verify panel backgrounds use `bg-zinc-800`

---

## Design System Compliance

- All 6 badge variants use DS color tokens (no hardcoded hex)
- Brand CTA: `bg-brand-300 dark:bg-brand-500 text-zinc-900`
- Cards: `bg-card dark:bg-zinc-800 rounded-2xl border border-border shadow-sm`
- Icons: Lucide React only
- Accessibility: `aria-label`, `role="status"`, `aria-hidden` on decorative icons

---

## Pending

1. **Figma validation**: "UI-DESIGN: No Figma yet" — validate when available
2. **GraphQL integration**: Mock data only — swap when Ticket C GW-02 deploys
3. **Unit tests**: `.test.tsx` files not created (no test infra in project)

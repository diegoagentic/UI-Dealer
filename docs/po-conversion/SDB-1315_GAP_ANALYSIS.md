# SDB-1315 — Gap Analysis: Jira Ticket vs Implementation

> Audited against the full 17-story ticket description.
> ✅ = meets requirements · ⚠️ = partial · ❌ = missing

---

## Story-by-story audit

### FE-13 — Feature Flag Hook ✅
- `usePoConversionEnabled` hook ✅
- `FeatureFlagGuard` renders children when true, 404 when false ✅
- Defaults false ✅

### FE-11 — GraphQL Hooks + TypeScript Types ✅
- All queries implemented as mock stubs ✅
- All mutations implemented as mock stubs ✅
- Types aligned with V2 entities ✅
- Skip param for feature flag ✅ (hooks check `usePoConversionEnabled`)

### FE-14 — Error Handling + Loading States ⚠️
- ConversionErrorBoundary ✅
- Skeleton loaders ✅ (3 skeletons in skeletons.tsx)
- ❌ **Toast notifications**: no toast system implemented. Components use inline error text instead.
- ❌ **Empty states with action links**: some components have empty states but not all include action links.
- ❌ **404 for invalid PO ids redirects to drafts list**: not implemented (state-based routing doesn't have URL params to validate).

### FE-01 — "Convert to PO" Button ⚠️
- Visible on APPROVED quotes ✅
- Flag enabled check ✅ (via hook)
- Loading spinner ✅
- Error toast ⚠️ (inline error, not a toast)
- ❌ **Confirmation dialog**: ticket says "Confirmation dialog → initiateQuoteConversion". Current implementation fires mutation on direct click without a confirm step.
- ❌ **"No active conversion" check**: doesn't verify if a conversion is already in progress.
- ❌ **Redirect to /quotes/:quoteId/conversion-review**: uses callback instead of URL navigation.

### FE-02 — Conversion Review Page ✅
- Loads via conversionReview query ✅ (mock)
- Frozen line items as read-only ✅
- Vendor split shows PO groupings ✅
- Approve/reject mutations ✅
- 72h countdown timer ✅
- Discrepancy highlighting ✅

### FE-17 — Snapshot Comparison View ⚠️
- Side-by-side frozen vs current ✅ (via expandable rows + "Use snapshot"/"Use current" buttons)
- Changed=yellow, added=green, removed=red ✅ (via DiffViewer)
- Collapsible (expanded when discrepancies) ✅
- ❌ **Summary banner**: ticket says "Summary banner". No banner with overall summary at the top (e.g., "3 price changes, 1 item added, 2 quantities differ").
- ⚠️ **True side-by-side layout**: current implementation uses expandable rows, not a visual side-by-side column layout. The "Use snapshot"/"Use current" buttons exist but it's not a classic 2-column comparison.

### FE-03 — PO Drafts List Page ✅
- Vendor-scoped cards ✅
- poNumber, vendor name, total, line item count ✅
- Status badges (DRAFT=blue, FINALIZED=amber, SUBMITTED=green, FAILED=red) ✅
- Filters by status/vendor ✅

### FE-04 — PO Detail Page ✅
- Line items table with all V2 fields ✅
- Financial summary ✅
- Timeline ✅
- Tabs: Details + Revisions (now 4 tabs) ✅
- Header: poNumber, vendor, status badge ✅
- Breadcrumb ✅

### FE-10 — Conversion Status Badge ✅
- 'Converting' spinner ✅ (ConvertingBadge export)
- 'Converted → N POs' ✅
- Click navigation ✅
- Hidden when flag off ✅

### FE-12 — Route Configuration ⚠️
- ❌ **URL-based routes**: ticket specifies `/quotes/:quoteId/conversion-review`, `/quotes/:quoteId/purchase-orders`, `/purchase-orders/:id`. App uses state-based navigation in App.tsx, not React Router URL routes.
- ❌ **Lazy-loaded**: not React.lazy() since not using code-split routes.
- ❌ **Breadcrumbs from URL params**: breadcrumbs exist but are state-driven, not URL-param-driven.

### FE-05 — Finalize PO Button ⚠️
- Visible when DRAFT ✅
- Confirmation dialog ✅
- finalizePO mutation ✅
- FINALIZED + timeline refresh ⚠️ (status updates but no explicit timeline refresh)
- Error toast ⚠️ (inline error in dialog, not a toast)
- ❌ **dealer_admin role check**: ticket says "Visible when DRAFT + dealer_admin role". No role/permission check implemented.

### FE-06 — Submit PO Dialog ✅
- Visible when FINALIZED ✅
- Adapter selection (email/EDI/portal) ✅
- Optional notes ✅
- Loading state ✅
- Error handling with retry ✅
- Cancel closes without side effects ✅

### FE-07 — Submission History ⚠️
- ✅ Timestamp, status, adapter, response code, message data present
- ⚠️ **Table format**: ticket says "Table" but implementation uses timeline layout. The original PODetailPage had a table — the new SubmissionHistory uses a vertical timeline. May need to offer both or switch to table.
- ✅ Green check / red X
- ✅ Expandable error
- ✅ Sorted desc

### FE-08 — Revision History + Diff Viewer ⚠️
- Revision list with number, timestamp, actor, summary ✅
- DiffViewer with added/removed/changed ✅
- ❌ **Compare two revisions**: ticket says "Compare two revisions. Default: latest vs previous." No revision comparison selector implemented — each revision just shows its own diffs inline.

### FE-09 — Artifact Downloads ⚠️
- File name, format icon, size, timestamp ✅
- Download button ✅
- ❌ **PDF preview modal**: ticket says "PDF preview modal". No preview — only direct download.
- ❌ **Grouped by type**: ticket says "Grouped by type". Current implementation is a flat grid, not grouped by `type` (submission_payload / confirmation / revision_snapshot).

### FE-15 — Responsive Design ⚠️
- ❌ **Mobile (< 768px) specific behaviors**: no explicit mobile optimizations tested. Ticket specifies:
  - PODraftCards stack ⚠️ (grid does stack via responsive classes)
  - LineItemsTable horizontal scroll ✅ (overflow-x-auto)
  - SubmitPODialog full-screen on mobile ❌
  - 44px touch targets ❌ (not explicitly sized)
  - No overflow at 320px ❌ (not tested)

### FE-16 — Component + Hook Tests ❌
- Not implemented yet (Sprint 3).

---

## Gap summary

| Gap | Story | Effort | Priority |
|---|---|---|---|
| ConvertToPOButton needs confirmation dialog | FE-01 | S | P0 |
| ConvertToPOButton needs "no active conversion" check | FE-01 | S | P0 |
| FinalizePOButton needs dealer_admin role check | FE-05 | S | P1 |
| SnapshotComparisonView needs summary banner | FE-17 | S | P1 |
| RevisionHistory needs revision comparison (pick 2 to diff) | FE-08 | M | P1 |
| ArtifactDownloads needs PDF preview modal | FE-09 | M | P1 |
| ArtifactDownloads needs grouping by type | FE-09 | S | P1 |
| SubmitPODialog needs full-screen on mobile | FE-15 | S | P2 |
| Toast notification system (global) | FE-14 | M | P2 |
| URL-based routes with React Router | FE-12 | L | P2* |
| Tests (≥ 70% coverage) | FE-16 | L | P2 |

*FE-12 (URL routes) depends on whether the app architecture supports React Router. The current state-based approach works but doesn't match the ticket spec.

---

## What's already exceeding the ticket

- **DualEngineCalculation-like expandable rows** in PricingWaterfall (not in ticket but adds value)
- **4-tab PODetailPage** (ticket says 2 tabs: Details + Revisions — we added Submissions + Artifacts as separate tabs for better UX)
- **Inline resolution per discrepancy** in SnapshotComparisonView ("Use snapshot" / "Use current" buttons — ticket doesn't mention per-row resolution)
- **ArtifactDownloads** has format-aware color coding (PDF=red, CSV=green, EDI=blue, XML=amber) beyond what the ticket describes

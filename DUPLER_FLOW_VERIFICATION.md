# Dupler Demo — Verificación de Flujos y Sub-pasos

> Documento de referencia para verificar qué pasa en cada paso del demo Dupler.
> Cada sección describe: qué ve el usuario, qué interacciones hace, y cómo resuelve el pain point original.

---

## FLOW 1: Vendor Data Extraction & Specification Building

### Pain Point que resuelve
Designers pasan **15-30 minutos por vendor quote** copiando datos línea por línea desde PDFs/websites de manufacturers no-CET hacia SPEC/PMX. Este proceso manual es propenso a errores y es el dolor #1 de Dupler.

### Roles involucrados
- **Designer** (Alex Rivera) — Steps d1.1 a d1.4
- **Sales Coordinator / SC** (Randy Martinez) — Step d1.5

### Datos del proyecto demo
- Proyecto: Mercy Health Phase 2
- 32 line items totales: 24 HNI (CET) + 8 National (vendor PDF)
- PMX ID: PMX-MH-0412
- Total: $95,580

---

### d1.1 — Vendor Data Upload & AI Extraction
**App**: dupler-pdf | **Role**: Designer | **Modo**: Interactive

**Qué resuelve**: Elimina la copia manual de datos desde PDFs de vendors. El AI lee el documento y extrae todos los items automáticamente.

#### Fases:

**1. `idle`** — Esperando trigger
- El usuario está en la página de Transactions
- Nada visible en el área de simulación

**2. `upload-zone`** — Zona de carga
- **Qué ve**: Zona drag/drop con borde punteado amber. Badges "VENDOR PDF" (amber) y "MFR WEBSITE" (purple). Un mock file card aparece animado: "NF-2026-0412.pdf — National Furniture — Vendor Quote"
- **Trigger**: Click "Upload Vendor Data" en Quick Actions
- **Transición**: Auto-avanza a `extracting` después de 1.5s

**3. `extracting`** — AI leyendo documento
- **Qué ve**: Card con icono de documento + barra de progreso amber. Texto: "AI reading vendor document — OCR + semantic parsing..." Badge "SCANNING"
- **Interacción**: Observa (progresión automática ~2 segundos)
- **Transición**: Auto-avanza a `processing` al completar

**4. `processing`** — Pipeline de agentes AI
- **Qué ve**: Card con avatar AI + barra de progreso. 4 agentes aparecen uno por uno (cada 700ms):
  1. `PdfOcrAgent` — "OCR scanning vendor PDF — NF-2026-0412"
  2. `SemanticParser` — "Parsing tables, footnotes, and margin notes"
  3. `LineItemDetector` — "Identifying 8 line items with pricing data"
  4. `FieldClassifier` — "Classifying SKU, finish, options, quantities"
- Cada agente: spinner azul → checkmark verde
- **Transición**: Auto-avanza a `breathing`

**5. `breathing`** — Pausa dramática
- **Qué ve**: Dot pulsante + "Structuring extracted data..."
- **Duración**: 1200ms
- **Transición**: Auto-avanza a `revealed`

**6. `revealed`** — Resultados aparecen
- **Qué ve**:
  - Summary card verde: "PdfOcrAgent: 8 items extracted from vendor quote NF-2026-0412"
  - Chips: "8 Items Extracted" (verde) + "2 Low-Confidence Fields" (amber)
  - Tabla con 8 items que aparecen uno por uno (120ms stagger):

| # | SKU | Producto | Finish | Qty | List $ | Confidence |
|---|---|---|---|---|---|---|
| 1 | NAT-WW-3060 | Waveworks Desk 60" | White + Orange | 8 | $2,180 | **72%** (amber) |
| 2 | NAT-EC-4200 | Exhibit Collab Table 48" | White | 4 | $1,240 | 98% (verde) |
| 3 | NAT-SW-3100 | Solve Wall Shelf 36" | White | 6 | $385 | 99% (verde) |
| 4 | NAT-LT-6600 | Lobby Lounge Table | Walnut | 3 | $890 | 97% (verde) |
| 5 | NAT-TC-2025 | Triumph II Conf Table | White | 2 | $2,100 | 98% (verde) |
| 6 | NAT-DK-4200 | Realize Desk 60" | White + Gray | 4 | $1,580 | **81%** (amber) |
| 7 | NAT-FL-2200 | Filing Cabinet 4-Drawer | White | 6 | $425 | 97% (verde) |
| 8 | NAT-BK-1200 | Bookcase III 3-Shelf | White | 3 | $340 | 98% (verde) |

- Items con confidence <95% tienen fondo amber (filas 1 y 6)
- **Transición**: Auto a `results`

**7. `results`** — CTA disponible
- **Qué ve**: Todo lo anterior + botón pulsante "Continue to Mapping & Review →"
- **Interacción**: Click el botón
- **Resultado**: Avanza a d1.2

---

### d1.2 — AI Mapping & Confidence Review
**App**: dupler-pdf | **Role**: Designer | **Modo**: Interactive

**Qué resuelve**: Estructura los datos extraídos en formato SPEC/PMX y permite al designer revisar solo los items con baja confianza. Split-view para comparar PDF original vs datos del AI.

#### Fases:

**1. `idle` → `notification`** (auto, 1500ms delay)

**2. `notification`** — Notificación interactiva
- **Qué ve**: Card brand con borde glow: "Mapping Complete — 2 Items Need Review". Detalle: "6 auto-mapped at 97%+. 2 items flagged for designer review — quantity ambiguity and truncated option string."
- **Interacción**: Click la card
- **Transición**: Pasa a `processing`

**3. `processing`** — Pipeline de agentes
- **Qué ve**: 3 agentes secuenciales:
  1. `ExtractionMapper` — "Mapping extracted fields to SPEC/PMX model"
  2. `FormatAdapter` — "Adapting column structure for 8 National items"
  3. `ConfidenceScorer` — "Scoring field confidence — 6 high, 2 flagged"
- **Transición**: Auto a `revealed`

**4. `revealed`** — Revisión del designer

**Qué ve (3 secciones):**

**A. Summary Bar:**
- Dot verde: "6 Auto-Mapped (97%+)"
- Dot amber: "2 Flagged for Review"
- Counter: "0/2 Reviewed"

**B. Auto-mapped Items (colapsado):**
- Card verde con 6 items en grid, cada uno con checkmark + confidence badge
- No requiere interacción

**C. Flagged Items (expandido) — 2 cards con split-view:**

Para cada item flaggeado:

| Flag | Producto | Problema | Confidence |
|---|---|---|---|
| ef1 | Waveworks Desk 60" | PDF dice "8-10 units" — AI eligió 8 | 72% |
| ef2 | Realize Desk 60" | Option string truncado "Standing base, stor..." | 81% |

**Split-view (2 columnas por flag):**
- **Columna izquierda "SOURCE PDF"**: Extracto monospace del PDF original con el contexto relevante
- **Columna derecha "AI EXTRACTED"**: Campo y valor extraído por el AI

**Interacciones por flag:**
1. Estado inicial: 2 botones — "Accept AI Value" (brand) + "Edit" (outline)
2. Si click "Edit": Input inline + botón Save (✓) + Cancel (✗)
3. Si click "Accept" o Save: ✓ "AI Value Confirmed" / "Manually Corrected" (verde)

**CTA (condicional):**
- Deshabilitado: "Review flagged items (0/2)" — gris
- Habilitado (2/2 resueltos): "Approve Mapping — Continue to Validation" — brand pulsante
- **Click**: Avanza a d1.3

---

### d1.3 — Validation: Options, Upcharges & Pricing
**App**: dupler-pdf | **Role**: Designer | **Modo**: Interactive

**Qué resuelve**: Detecta upcharges por finish/opciones y verifica precios — Compass para HNI, Source PDF para non-CET. Corrige el error del demo anterior que usaba Compass para todos.

#### Fases:

**1. `idle` → `notification`** (auto)

**2. `notification`** — Click para iniciar
- **Qué ve**: "Validation Complete — Upcharges & Price Discrepancies". Detalle con conteos.
- **Click** → `processing`

**3. `processing`** — 3 agentes:
1. `OptionValidator` — "Checking option/finish combos against rules"
2. `UpchargeDetector` — "2 upcharges — $1,380 total impact"
3. `PriceVerifier` — "Compass: 24 HNI | Source PDF: 8 non-CET"

**4. `revealed`** — 3 secciones interactivas

**Sección A: Upcharge Review**
- Header: "UPCHARGE REVIEW — FINISH & OPTION IMPACT" + badge "CATALOG RULES" (purple)
- 2 cards de upcharge:

| Upcharge | Producto | Motivo | Impacto |
|---|---|---|---|
| uc1 | Involve Workstation 66" | Graphite finish | $85/unit × 12 = **$1,020** |
| uc2 | Acuity Task Chair | Grade 3 fabric upgrade | $45/unit × 8 = **$360** |

- Total: **$1,380** upcharge impact
- **Interacción por card**: Click "Acknowledge Upcharge" → ✓ "Upcharge Acknowledged"

**Sección B: Compass Verification (solo HNI)**
- Header: "22 of 24 HNI items verified via Compass"
- Nota importante: "Compass is HNI's pricing portal — used exclusively for Allsteel & Gunlock"
- 2 price update cards:

| Item | Spec Price | Compass Price | Delta | Motivo |
|---|---|---|---|---|
| Involve Workstation 66" | $2,450 | $2,525 | +$75 (+3.0%) | Q1 2026 price increase |
| Acuity Task Chair | $875 | $895 | +$20 (+2.3%) | Material cost adjustment |

- **Interacción por card**: "Accept Compass Price" (teal CTA) o "Keep SPEC Price" (outline)
- Al resolver: ✓ "Compass Price Applied" / "SPEC Price Kept"

**Sección C: Non-CET Source Verification (auto-verified)**
- "8/8 National items verified against source PDF" + badge "SOURCE PDF VERIFIED" (amber)
- No requiere interacción — informativo

**CTA (condicional):**
- Requiere: 2 upcharges acknowledged + 2 compass updates resolved = 4 total
- Habilitado: "Continue to Drawing Audit"
- **Click**: Avanza a d1.4

---

### d1.4 — Audit vs Drawings & PMX Generation
**App**: dupler-pdf | **Role**: Designer | **Modo**: Interactive

**Qué resuelve**: Verifica cantidades del spec contra planos (floor plans), archiva fuentes para trazabilidad, y genera el PMX que se envía al SC. Resuelve el error del demo que usaba "PO check" (no existe PO en esta etapa).

#### Fases:

**1. `notification`** — Click para iniciar
- "Audit Complete — 1 Quantity Discrepancy". Detalle: "31/32 match. 1 discrepancy: Waveworks Desk (spec: 8, drawing: 10)"

**2. `processing`** — 4 agentes:
1. `DrawingAuditor` — "Cross-referencing spec vs floor plan drawings"
2. `QuantityReconciler` — "31/32 match — 1 discrepancy flagged"
3. `SourceArchiver` — "Auto-saving vendor PDF to project record"
4. `PmxGenerator` — "Building PMX specification package"

**3. `revealed`** — 3 secciones

**Sección A: Drawing Audit**
- Summary verde: "31 of 32 items match drawing quantities"
- 1 discrepancy card (borde rojo):
  - Badge "DISCREPANCY"
  - Waveworks Desk 60" (NAT-WW-3060)
  - Grid visual: Spec Qty = **8** (rojo) vs Drawing Shows = **10** (verde)
  - **Interacción**: "Update to Drawing Qty (10)" (brand) o "Keep Spec Qty (8)" (outline)
  - Al resolver: ✓ "Discrepancy Resolved"

**Sección B: Source Traceability**
- 2 fuentes archivadas automáticamente:
  - NF-2026-0412.pdf → badge "VENDOR PDF" (amber)
  - MercyHealth_Phase2.sif → badge "CET EXPORT" (teal)

**Sección C: Generate PMX (CTA)**
- Deshabilitado hasta resolver discrepancy
- Habilitado: "Generate PMX — Validated Specification"

**4. `converting`** — Generación del PMX
- Barra de progreso + mensajes secuenciales:
  - 15%: "building specification package..."
  - 40%: "linking vendor sources to line items..."
  - 65%: "applying drawing audit corrections..."
  - 85%: "PMX-MH-0412 — file ready"
- Duración: ~2.5 segundos

**5. `preview`** — Vista previa del PMX

**Qué ve:**
- Documento PMX completo con header: "PMX Specification Package — PMX-MH-0412"
- Badges: "DRAWING VERIFIED" (verde) + "SOURCE ARCHIVED" (teal) + "VALIDATED"
- Metadata: PMX ID, Manufacturers, Line Items (32), Designer (Alex Rivera), Total ($95,580)
- Stats grid: 24 Compass Verified | 8 PDF Extracted | $1,380 Upcharges | 31/32 Drawing Match
- Tabla de items paginada (5 por página):

| Página 1 (CET) | | | | |
|---|---|---|---|---|
| 1 | Allsteel | Involve Workstation 66" | 12 | $2,525 | badge CET (teal) |
| 2 | Allsteel | Acuity Task Chair | 24 | $895 | badge CET (teal) |
| 3 | Allsteel | Stride Bench 60" | 6 | $1,890 | badge CET (teal) |
| 4 | Gunlock | Executive Credenza 72" | 4 | $3,200 | badge CET (teal) |
| 5 | Gunlock | Conference Table 96" | 2 | $4,500 | badge CET (teal) |

| Página 2 (Vendor PDF) | | | | |
|---|---|---|---|---|
| 10 | National | Waveworks Desk 60" | 10 | $2,180 | badge VENDOR PDF (amber) |
| 11 | National | Exhibit Collab Table 48" | 4 | $1,240 | badge VENDOR PDF (amber) |
| 12 | National | Realize Desk 60" | 4 | $1,580 | badge VENDOR PDF (amber) |

**Interacción: Send to SC (popover)**
- Click "Send to Sales Coordinator" → popover con 3 opciones:
  - Randy Martinez — Sales Coordinator ★ (este es el correcto)
  - James Mitchell — Account Executive
  - Mike Torres — Operations Lead
- Click Randy → popover cierra → "PMX-MH-0412 sent to Randy Martinez"
- 2 segundos delay → Avanza a d1.5

---

### d1.5 — SC Review & Pricing Application
**App**: dashboard (Follow Up tab) | **Role**: SC (Randy Martinez) | **Modo**: Interactive

**Qué resuelve**: El SC recibe el PMX validado, aplica descuentos con asistencia de AI (Strata sugiere discount tiers), y genera el SIF para exportar a CORE. Corrige el error del demo anterior donde el designer generaba SIF.

**Nota**: Este step se renderiza en el Dashboard, no en dupler-pdf. Cambia el contexto visual.

#### Fases:

**1. `notification`** — Click para iniciar
- "PMX-MH-0412 received from Designer Alex Rivera"
- Badge "DESIGNER VALIDATED" (verde)

**2. `sc-review`** — Revisión del SC

**Sección A: PMX Table con Source Badges**
- Header: PMX-MH-0412 — Designer: Alex Rivera — 32 items
- Tabla con columnas: #, Mfg, Product, Qty, List $, Source
- Cada fila tiene badge de fuente:
  - Items CET → badge teal "FROM CET"
  - Items Vendor PDF → badge amber "FROM VENDOR PDF"
- (Esto responde al requerimiento de la BA: "manually-entered lines visually distinguishable from CET-imported")

**Sección B: AI-Assisted Discount Application**
- Header: "AI-Assisted Discount Application" + badge "STRATA AI"
- 3 discount tier cards:

| Manufacturer | Tipo | Descuento | Items | List Total | Fuente |
|---|---|---|---|---|---|
| Allsteel | GPO Volume | 42% | 15 | $37,560 | GPO Agreement #2024-HNI-0087 |
| Gunlock | Standard Dealer | 38% | 9 | $24,480 | Dealer Agreement — Annual |
| National | Volume Discount | 35% | 8 | $33,540 | Quote #NF-2026-0412 — Volume Tier B |

- **Interacción por manufacturer**: "Apply Discount" (brand CTA)
- Al aplicar: card cambia a verde con checkmark + savings calculados
- Totales se actualizan dinámicamente

**Sección C: Totales Dinámicos**
- Grid que se actualiza en tiempo real:
  - List Total → Discounts → Net Total → Upcharges → Grand Total

**CTA:**
- Deshabilitado hasta aplicar los 3 discount tiers
- Habilitado: "Generate SIF & Export to CORE"

**3. `generating`** — Pipeline final
- 3 agentes:
  1. `DiscountAdvisor` — "Applying manufacturer discount tiers"
  2. `MarginCalculator` — "Calculating dealer margins and freight"
  3. `SifGenerator` — "Building SIF export package for CORE"

**4. `revealed`** — Éxito
- Card de éxito: "SIF generated from validated PMX — exported to CORE"
- Badge "SC PRICED" (blue)
- Botón "Complete Flow" → avanza a Flow 2

---

## FLOW 2: Warehouse & Inventory Intelligence

### Pain Point que resuelve
Gestión de warehouse manual, sin visibilidad de inventario en tiempo real, sin tracking de shipments, sin auditoría de freight, y sin alertas predictivas.

### Roles involucrados
- **Expert** — Steps d2.1 a d2.5
- **Dealer** (Sarah Chen) — Step d2.6

---

### d2.1 — Warehouse Health & Capacity Forecast
**App**: dupler-warehouse | **Role**: Expert | **Modo**: Interactive

**Qué resuelve**: Visibilidad de salud de warehouses, forecast de capacidad, y recomendaciones de reubicación para optimizar costos.

- **Notification**: "3 warehouses scanned — Columbus at 72% with Mercy Health Phase 2 arriving"
- **Agentes**: WarehouseScanner, CapacityForecaster, OverflowOptimizer, CostAnalyzer, ReportGenerator
- **Qué ve**:
  - 3 warehouses con utilization bars:
    - Columbus Main: 72% → 89% forecast (1,080 items) — ALERT
    - Cincinnati Overflow: 45% → 48% (480 items)
    - Dayton Storage: 38% → 38% (280 items)
  - 2 recomendaciones de reubicación:
    - Columbus → Cincinnati: 55 items → $2,200/mo savings
    - Columbus → Dayton: 30 items → $1,400/mo savings
- **Interacción**: Click "Apply Recommendations"
- **Resultado**: Avanza a d2.2

---

### d2.2 — Receiving & Condition Assessment
**App**: dupler-warehouse | **Role**: Expert | **Modo**: Interactive

**Qué resuelve**: Automatiza el receiving de items con QR scan, matching automático contra PO, y evaluación de condición.

- **Notification**: "30 items scanned from PO-2026-0389 — 28 matched, 2 exceptions"
- **Agentes**: QRScanner, POMatchEngine, ConditionScanner, ExceptionHandler, CatalogUpdater
- **Qué ve**:
  - 28/30 items matched ✓
  - 2 excepciones:
    - Park Table — missing (backorder, ETA 2 semanas)
    - Acuity Chair Fog — wrong finish (Claim CLM-2026-052)
  - Condition breakdown: 26 pristine, 3 inspect, 1 damaged
- **Interacción**: Click "Confirm Receiving"
- **Resultado**: Avanza a d2.3

---

### d2.3 — PO Price & Margin Verification
**App**: dupler-warehouse | **Role**: Expert | **Modo**: Interactive

**Qué resuelve**: Verifica precios de PO contra price lists actuales y alerta sobre márgenes bajos.

- **Notification**: "Price verification complete — 2 items flagged for margin review"
- **Agentes**: PriceListScanner, CostBasisChecker, RegionalTaxEngine, MarginCalculator, ComplianceReporter
- **Qué ve**:
  - 5 items con price changes:
    - 3 OK (margin >25%)
    - 2 flagged: Terrace Lounge (23.8%) y Park Table (21.4%) — margin below 25%
  - Tax compliance (informativo): 2 regions verified
- **Interacción**: Click "Approve Pricing"
- **Resultado**: Avanza a d2.4

---

### d2.4 — Multi-Warehouse Sync & Transit
**App**: dupler-warehouse | **Role**: System | **Modo**: Auto (10 segundos)

**Qué resuelve**: Sincronización automática entre warehouses, resolución de conflictos de dock, y optimización de rutas.

- **Agentes**: WarehouseSync, DockScheduler, RouteOptimizer, MapUpdater
- **Qué ve**:
  - 5 locations (3 warehouses + 2 job sites) con status
  - 5 shipments activos
  - Dock conflict auto-resuelto: SH-002 movido de Dock 1 → Dock 3
  - Route savings: $1,200
- **Interacción**: Ninguna (auto-advance después de 10s)
- **Resultado**: Auto-avanza a d2.5

---

### d2.5 — Vendor Claims & Returns
**App**: dupler-warehouse | **Role**: Expert | **Modo**: Interactive

**Qué resuelve**: Gestión de claims contra vendors, tracking de RMAs, y alertas de warranty.

- **Notification**: "3 active claims — $2,770 in credits processing"
- **Agentes**: ClaimTracker, ReturnAnalyzer, ReplacementFinder, CreditProcessor, WarrantyChecker
- **Qué ve**:
  - 3 claims activos:
    - CLM-2026-052: Acuity Chair wrong finish — RMA Approved — $1,370
    - CLM-2026-048: Terrace Lounge packaging damage — Under Review — $480
    - CLM-2026-045: Stride Bench warranty — Warranty Valid — $920
  - 4 warranty alerts (items próximos a vencer)
- **Interacción**: Click "Process Claims"
- **Resultado**: Avanza a d2.6

---

### d2.6 — Dealer Review & Dispatch Approval
**App**: dashboard | **Role**: Dealer (Sarah Chen) | **Modo**: Interactive

**Qué resuelve**: Dealer revisa el reporte consolidado de warehouse y aprueba dispatch.

- **Notification**: "Sarah Chen — consolidated warehouse report ready"
- **Qué ve**:
  - Reporte consolidado con todas las métricas de warehouse
  - Staging checklist: 24/26 items ready
  - Dispatch details: Interior Installations, Thursday 8AM
- **Interacción**: Click "Approve All & Dispatch"
- **Resultado**: Avanza a Flow 3

---

## FLOW 3: Inventory Intelligence & Reporting

### Pain Point que resuelve
Falta de visibilidad cross-system, reportes manuales, sin alertas proactivas, y sin portal para clientes.

### Roles involucrados
- **Expert/System** — Steps d3.1 a d3.3
- **Dealer** — Step d3.4

---

### d3.1 — Inventory Data Sync
**App**: dupler-reporting | **Role**: System | **Modo**: Interactive

**Qué resuelve**: Sincronización de datos de inventario desde múltiples fuentes.

- **Agentes**: WarehouseSync, POTracker, StockAnalyzer, HealthScorer
- **Qué ve**:
  - 4 KPIs: Total Stock Value ($1.2M), Fill Rate (89%), Backorder (42 items), Utilization (68%)
  - Inventory by category (5 categorías, 1,840 items total)
  - Health score: 78/100
- **Interacción**: Click "Continue to Reconciliation"
- **Resultado**: Avanza a d3.2

---

### d3.2 — Inventory Reconciliation
**App**: dupler-reporting | **Role**: Expert | **Modo**: Interactive

**Qué resuelve**: Reconcilia conteo físico vs sistema, identifica discrepancias, y sugiere correcciones.

- **Agentes**: CountVerifier, LocationChecker, StockAlertEngine
- **Qué ve**:
  - KPIs: Stock Accuracy 97.2%, Turnover 4.8×, Fill Rate 89%, Backorder Rate 3.2%
  - 3 discrepancies:
    1. Count mismatch: Acuity Chairs — system 48 vs physical 45 (3 unaccounted)
    2. Location error: Stride Bench — Bay A Rack 3 vs actual Bay C Rack 7
    3. Missing item: Park Table — relocated to Cincinnati per TRF-2026-018
  - AI suggestions para resolver cada discrepancy
- **Interacción**: Review each discrepancy → Click "Acknowledge & Continue — 1,840/1,840 Verified"
- **Resultado**: Avanza a d3.3

---

### d3.3 — Inventory Health Report Assembly
**App**: dupler-reporting | **Role**: System | **Modo**: Auto (8 segundos)

**Qué resuelve**: Genera reporte de salud de inventario con insights de AI.

- **Agentes**: HealthReporter, TrendAnalyzer, InsightEngine
- **Qué ve**:
  - 4 secciones del reporte ensamblándose:
    1. Stock Availability by Category (1,840 items)
    2. Warehouse Capacity & Forecast (Columbus 72%→89%)
    3. Backorder & Supply Chain Status (42 items, 3 critical)
    4. AI Recommendations (3 insights)
- **Interacción**: Ninguna (auto-advance después de 8s)
- **Resultado**: Auto-avanza a d3.4

---

### d3.4 — Report Review & Distribution
**App**: dupler-reporting | **Role**: Dealer | **Modo**: Interactive

**Qué resuelve**: Dealer revisa reporte completo con drill-down y 3 recomendaciones de AI, luego exporta.

- **Qué ve**:
  - Reporte completo con secciones colapsables
  - 3 AI Recommendations:
    1. "Reorder Allsteel Acuity Chairs" — prevent stockout (92% confidence)
    2. "Relocate 85 items Columbus → Cincinnati" — $3,600/mo savings (91% confidence)
    3. "5 SKUs Approaching End-of-Life" — recover $8,450 value (88% confidence)
- **Interacción**: Click "Export PDF & Send to Team" (Randy y Tara)
- **Resultado**: Fin del demo

---

## Resumen: Cómo cada Flow resuelve los errores del demo anterior

| Error Original (BA) | Corrección | Dónde |
|---|---|---|
| Mapping to "SIF catalog entries" | SPEC/PMX mapping con confidence scores | d1.2 |
| CatalogMatcher agent | Eliminado → ExtractionMapper + ConfidenceScorer | d1.2 |
| Compass para todos | Compass SOLO HNI. Non-CET = Source PDF Verified | d1.3 |
| Regional tax (designer) | Eliminado del designer. Implícito en SC | d1.5 |
| Quantity vs PO check | Drawing Audit (spec vs floor plan) | d1.4 |
| Designer genera SIF | Designer genera PMX. SC genera SIF | d1.4 / d1.5 |
| "Dealer" recibe de "Expert" | Designer → SC handoff interno | d1.4 → d1.5 |
| 2-level compliance chain | Eliminado — aprobación simple del SC | d1.5 |

---

## Sidebar Thread Summaries (lo que muestra el sidebar al completar cada step)

| Step | Thread Summary |
|---|---|
| d1.1 | "8 National items extracted from vendor PDF — 2 low-confidence fields" |
| d1.2 | "6 auto-mapped (97%+), 2 flagged — designer confirmed" |
| d1.3 | "$1,380 upcharges captured — Compass: 24 HNI, Source PDF: 8 non-CET verified" |
| d1.4 | "Drawing audit: 31/32 match — PMX generated, sent to SC" |
| d1.5 | "SC applied discounts — SIF exported to CORE" |
| d2.1 | "Columbus 72% → 89% forecast — 85 items relocated" |
| d2.2 | "28/30 matched — 26 pristine, 2 exceptions" |
| d2.3 | "5 items verified — 2 margin alerts, tax compliant" |
| d2.4 | "3 warehouses synced — dock resolved, $1,200 saved" |
| d2.5 | "3 claims processed — $2,770 credits" |
| d2.6 | "Sarah Chen approved — dispatch confirmed Thu 8AM" |
| d3.1 | "1,840 items synced — health score 78/100" |
| d3.2 | "97.2% stock accuracy — 3 discrepancies fixed" |
| d3.3 | "Inventory health report assembled" |
| d3.4 | "Report exported — sent to Randy and Tara" |

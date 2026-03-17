# OPS Demo 2 — Plan de Pruebas Manuales

## Pre-requisitos
1. Abrir la app en el browser (localhost o Vercel deploy)
2. Desde el Navbar, cambiar el perfil a **"OPS Demo (Demo 2)"** usando el selector de perfil
3. Verificar que el sidebar muestra **"Apex Furniture"** como compañía y **15 steps** distribuidos en 3 flows
4. Tener dark mode toggle accesible para verificar ambos modos

---

## Flow 1: Receiving & Invoice Automation (Steps 1.1–1.8)

### Step 1.1 — Delivery Notice Ingested (AUTO · 14s)

| | Detalle |
|---|---|
| **App** | Expert Hub (Kanban abre primero → lupa en DemoProcessPanel) |
| **Qué hace** | ReceivingAgent ingiere ASN del carrier. 50 items, 3 shipments, PO ORD-2055 |
| **Cómo probar** | Hacer clic en step 1.1 en el sidebar. Observar que aparece el panel de lupa con timeline de agentes animada. En ExpertHub, se muestra un panel "Receiving Verification — ORD-2055" con 3 shipment cards |
| **Resultado esperado** | - Panel lupa muestra agentes procesando durante ~14s<br>- 3 cards: SHP-001 (20 items, Verified), SHP-002 (15, Verified), SHP-003 (15, 3 Flags)<br>- Badges: "47 Matched" (verde), "3 Flagged" (amber)<br>- Source badges: "📦 Carrier ASN", "📋 PO ORD-2055"<br>- Auto-avanza al step 1.2 después de ~14s |
| **Pausa** | Al pausar el demo, el timer debe detenerse y reanudar al despausar |

---

### Step 1.2 — Receiving Doc Review (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Expert Hub |
| **Qué hace** | PO ↔ Delivery Receipt comparison. 47 auto-verified, 3 flagged |
| **Cómo probar** | Verificar que aparece la tabla de revisión con 3 items flagged. Revisar los datos. Hacer clic en "Approve Receiving Doc" |
| **Resultado esperado** | - Banner verde: "47 lines auto-verified — quantities, SKUs, and conditions match"<br>- Tabla con 3 rows:<br>&nbsp;&nbsp;1. ERG-5100 · Task Chairs: PO 20, Received 18, Status "Partial", Suggestion "Accept partial..."<br>&nbsp;&nbsp;2. SD-200 · Standing Desks: PO 15, Received 15, Status "Early +3d"<br>&nbsp;&nbsp;3. MA-50 · Monitor Arms: PO 8, Received 6, Status "Shortfall"<br>- KPI strip: 47 Matched \| 3 Flagged \| 94% Auto-Resolved \| Confidence 96%<br>- Botón "Approve Receiving Doc" → avanza al step 1.3<br>- Botón se deshabilita después de hacer clic |

---

### Step 1.3 — 3-Way Match Engine (AUTO · 28s)

| | Detalle |
|---|---|
| **App** | Dealer Kanban |
| **Qué hace** | PO ↔ ACK ↔ Delivery Receipt reconciliation. 50 líneas, genera draft de invoice |
| **Cómo probar** | Observar que el Kanban muestra el card con highlight y panel lupa aparece con timeline de agentes. ThreeWayMatchView debe renderizarse |
| **Resultado esperado** | - Card "PO #ORD-2055 vs Acknowledgement" con ring highlight<br>- ThreeWayMatchView tabla: 7 líneas con status match/partial/mismatch<br>- Panel lupa con agentes procesando ~28s<br>- Auto-avanza al step 1.4 |

---

### Step 1.4 — Invoice Preview & Cost/Sell (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Expert Hub |
| **Qué hace** | Invoice INV-2055 generada con cost/sell por línea y confidence scores |
| **Cómo probar** | Verificar tabla de invoice con 6 líneas de producto. Revisar callout de backorder. Hacer clic en "Approve Invoice Draft" |
| **Resultado esperado** | - Header: "Invoice INV-2055 — Product Lines", Total $41,150<br>- Tabla 6 rows con SKU, Product, Qty, Cost, Sell, Margin, Confidence badge:<br>&nbsp;&nbsp;- ERG-5100: 18 units, $89/$142, 37.2%, 98%<br>&nbsp;&nbsp;- SD-200: 15 units, $245/$395, 38.0%, 99%<br>&nbsp;&nbsp;- MA-50: 6 units, $65/$110, 40.9%, 97%<br>&nbsp;&nbsp;- STOR-30: 8 units, $120/$195, 38.5%, 96%<br>&nbsp;&nbsp;- DSK-FL: 3 units, $45/$78, 42.3%, 99%<br>&nbsp;&nbsp;- CBL-MGT: 50 units, $12/$22, 45.5%, 100%<br>- Callout amber: "18/20 Task Chairs received. $2,556 pending backorder"<br>- KPI: Total $41,150 \| Avg Margin 37.8% \| Lines 6 \| Backorder $2,556<br>- Botón "Approve Invoice Draft" → avanza al step 1.5 |

---

### Step 1.5 — Monthly Services Invoice (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Expert Hub |
| **Qué hace** | Invoice SVC-03-2026 generada desde Daily Log — servicios de marzo |
| **Cómo probar** | Verificar tabla de servicios. Hacer clic en "Approve Services Invoice" |
| **Resultado esperado** | - Header: "Services Invoice SVC-03-2026", Total $3,455<br>- Source badges: "📋 Daily Log (DL-004)", "⏱ Time Tracking System"<br>- Tabla 3 rows:<br>&nbsp;&nbsp;1. Installation Labor \| Daily Log \| 24 hrs × $95/hr \| $2,280<br>&nbsp;&nbsp;2. Project Management \| Monthly Fee \| March 2026 \| $850<br>&nbsp;&nbsp;3. Delivery Coordination \| Daily Log \| 3 trips \| $325<br>- Callout verde: "Generated from actual registered activity — zero re-entry required"<br>- Botón "Approve Services Invoice" → avanza al step 1.6 |

---

### Step 1.6 — QuickBooks Sync Batch (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Dashboard |
| **Qué hace** | Batch de 2 invoices listo para sync a QuickBooks. $44,605 total |
| **Cómo probar** | Verificar las 2 invoice cards, tabla de GL codes, customer match. Hacer clic en "Sync to QuickBooks" |
| **Resultado esperado** | - Header con icon CloudArrowUp: "QuickBooks Sync Batch", $44,605<br>- 2 invoice cards en grid:<br>&nbsp;&nbsp;- INV-2055 (Product) $41,150, 6 line items<br>&nbsp;&nbsp;- SVC-03-2026 (Services) $3,455, 3 line items<br>- GL Code Mapping tabla: Furniture/COGS-F01/$38,150, Freight/SHIP-EXP/$3,000, Services/SVC-REV/$3,455<br>- Footer: "Customer: Apex Furniture (matched in QB)" + "Tax Applied" badge<br>- Botón "Sync to QuickBooks" → avanza al step 1.7 |

---

### Step 1.7 — Sync Confirmation (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Dashboard |
| **Qué hace** | Confirmación de sync exitoso con QB Bill IDs |
| **Cómo probar** | Verificar banner verde, cards de confirmación, GL breakdown. Hacer clic en "Done" |
| **Resultado esperado** | - Banner verde: "QuickBooks Sync Complete ✓"<br>- 2 confirmation cards con checkmark verde:<br>&nbsp;&nbsp;- INV-2055 → QB-4421 (Product) $41,150<br>&nbsp;&nbsp;- SVC-03-2026 → QB-4424 (Services) $3,455<br>- GL Breakdown tabla con status "Posted" por cada row<br>- Timestamp: "Synced March 15, 2026 at 2:45 PM"<br>- "Zero re-entry into QuickBooks" callout<br>- Botón "Done" → avanza al step 1.8 |

---

### Step 1.8 — CRM: Receiving Milestone (AUTO · 10s)

| | Detalle |
|---|---|
| **App** | CRM |
| **Qué hace** | Actualiza timeline del proyecto en CRM automáticamente |
| **Cómo probar** | Observar que primero aparece spinner "Updating CRM project timeline...", luego (~2s) aparece la card de milestone |
| **Resultado esperado** | - Header: "CRM — Receiving Milestone"<br>- Spinner inicial por ~2s<br>- Card animada "Delivery Confirmed — March 2026" con border emerald:<br>&nbsp;&nbsp;- 4 stats: SKUs Received 47/50, Product Value $41,150, Services $3,455, QB Bills QB-4421 + QB-4424<br>&nbsp;&nbsp;- Daily Log DL-004 box azul: "Receiving complete — partial delivery noted..."<br>&nbsp;&nbsp;- Source badges: Receiving System, QuickBooks, Daily Log<br>- Auto-avanza al step 2.1 después de ~10s<br>- Respeta pausa |

---

## Flow 2: Change Order Management (Steps 2.1–2.4)

### Step 2.1 — CO Request Received (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Dashboard |
| **Qué hace** | Change Order CO-007 recibido del Customer Portal. 22 líneas, upgrade ergonómico |
| **Cómo probar** | Verificar la CO Request Card con border amber destacado. Hacer clic en "Begin CO Analysis" |
| **Resultado esperado** | - Agent context: "CostAnalysisAgent: Change Order CO-007 received via Customer Portal..."<br>- Card CO-007 con border amber doble:<br>&nbsp;&nbsp;- Título "Change Order CO-007", subtítulo "From: Apex Furniture Customer Portal"<br>&nbsp;&nbsp;- Status badge: "Under Review"<br>&nbsp;&nbsp;- 3 KPIs: 22 Line Items \| ERG Upgrade Type \| Portal Source<br>&nbsp;&nbsp;- Source badges: "🌐 Customer Portal", "📋 PO ORD-2055"<br>&nbsp;&nbsp;- Callout verde: "No emails, no phone calls to initiate..."<br>- Botón "Begin CO Analysis" → avanza al step 2.2 |

---

### Step 2.2 — CO Delta Analysis (AUTO · 22s)

| | Detalle |
|---|---|
| **App** | Dealer Kanban |
| **Qué hace** | CODeltaAgent analiza 22 líneas modificadas. Calcula impacto financiero |
| **Cómo probar** | Observar que aparece card #7 "Change Order CO-007" en columna "Active Processing" con ring highlight. Panel lupa muestra timeline de agentes |
| **Resultado esperado** | - Card "Change Order CO-007" visible en Kanban, priority critical, status "CO Delta Analysis"<br>- AI insight: "CO Delta Engine analyzing 22 ergonomic upgrade lines..."<br>- Panel lupa con agentes procesando ~22s<br>- Auto-avanza al step 2.3 |

---

### Step 2.3 — CO Approval — Financial Impact (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Expert Hub |
| **Qué hace** | Panel de aprobación con tabla Original vs New por línea |
| **Cómo probar** | Verificar tabla de 5 líneas con 6 columnas (Original Cost/Sell/Margin + New Cost/Sell/Margin). Hacer clic en "Approve Change Order" |
| **Resultado esperado** | - Header: "CO-007 Financial Impact" + badge "Customer Approved in Portal"<br>- Tabla 5 rows + summary row "17 additional lines (unchanged)":<br>&nbsp;&nbsp;- Task Chairs: $89/$142/37.2% → $140/$300/53.3%<br>&nbsp;&nbsp;- Standing Desks: $245/$395/38.0% → $260/$420/38.1%<br>&nbsp;&nbsp;- Monitor Arms: $65/$110/40.9% → $75/$125/40.0%<br>&nbsp;&nbsp;- Pedestal: $120/$195/38.5% → $135/$215/37.2%<br>&nbsp;&nbsp;- Cable Mgmt: $12/$22/45.5% → $12/$22/45.5% (sin cambio)<br>- KPIs: Revenue +$3,200 \| Cost +$2,010 \| Margin 35.4%→36.1% ↑ \| Delivery +7d<br>- Botón "Approve Change Order" → avanza al step 2.4 |

---

### Step 2.4 — Invoice + QB Amendment (AUTO · 18s)

| | Detalle |
|---|---|
| **App** | Dashboard (+ panel lupa en DemoProcessPanel) |
| **Qué hace** | 3 sistemas se actualizan en paralelo con animación staggered |
| **Cómo probar** | Observar las 3 cards que aparecen escalonadamente (~3s entre cada una). Panel lupa muestra timeline |
| **Resultado esperado** | - 3 cards con stagger animation:<br>&nbsp;&nbsp;1. (~3s) Invoice INV-2055 Amended — $46,950 (+$3,200) — InvoiceDeltaAgent<br>&nbsp;&nbsp;2. (~6s) QB Bill QB-4421 Amended — GL codes updated — QuickBooksAgent<br>&nbsp;&nbsp;3. (~9s) Daily Log DL-007 Recorded — CO-007 activity logged — DailyLogAgent<br>- Cada card pasa de opaca/desplazada a visible con checkmark + badge "Synced"<br>- Footer verde (al completar 3): "All systems updated in parallel — zero re-entry"<br>- Auto-avanza al step 3.1 después de ~18s |

---

## Flow 3: Financial Command Center (Steps 3.1–3.3)

### Step 3.1 — Multi-Project Financial Dashboard (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Dashboard |
| **Qué hace** | Vista ejecutiva multi-proyecto con pipeline total |
| **Cómo probar** | Verificar las 3 project cards, pipeline summary, y callout. Hacer clic en "Continue" |
| **Resultado esperado** | - Header: "Financial Command Center" + badge $157,650<br>- 3 project cards en grid:<br>&nbsp;&nbsp;1. Apex Furniture: $46,950 \| 82% delivered \| QB synced Yes \| 1 CO<br>&nbsp;&nbsp;2. Workspace Group: $12,300 \| 100% delivered \| QB synced Yes \| 0 COs<br>&nbsp;&nbsp;3. Meridian Group: $98,400 \| 0% delivered \| QB synced Pending \| 68% win prob<br>- Pipeline summary: Total $157,650 \| 2 QB-Synced \| 1 Open CO \| 0 Overdue<br>- Callout: "No Excel, no QB login, no calls — real-time financial visibility"<br>- Botón "Continue" → avanza al step 3.2 |

---

### Step 3.2 — QuickBooks Reconciliation (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | Dashboard |
| **Qué hace** | Reporte de reconciliación QB — 0 discrepancias |
| **Cómo probar** | Verificar tabla de reconciliación, GL breakdown, aging AP. Hacer clic en "Export to Controller" |
| **Resultado esperado** | - Header: "QB Reconciliation" + badge verde "0 Discrepancies"<br>- Tabla 3 rows con checkmark "Matched":<br>&nbsp;&nbsp;- INV-2055 \| $46,950 \| QB-4421 \| ✓ Matched<br>&nbsp;&nbsp;- SVC-03-2026 \| $3,455 \| QB-4424 \| ✓ Matched<br>&nbsp;&nbsp;- INV-2048 \| $12,300 \| QB-4422 \| ✓ Matched<br>- Total Posted: $60,250<br>- GL breakdown: Furniture $41,150 \| Services $3,455 \| Freight $2,345<br>- Aging AP: 0 overdue<br>- Botón "Export to Controller" → avanza al step 3.3 |

---

### Step 3.3 — Budget vs. Actual Analysis (INTERACTIVO)

| | Detalle |
|---|---|
| **App** | CRM |
| **Qué hace** | Análisis waterfall de presupuesto vs real con justificación por varianza |
| **Cómo probar** | Verificar el waterfall breakdown con 4 items. Hacer clic en "Download Report" |
| **Resultado esperado** | - Header CRM: "Budget vs. Actual Analysis" — Apex Furniture<br>- Waterfall 4 items con color coding:<br>&nbsp;&nbsp;1. Base Quote: $43,750 (100%) — azul — "Original approved quote QT-1025"<br>&nbsp;&nbsp;2. CO-007 Ergonomic Upgrade: +$3,200 (+7.3%) — amber — "Customer portal request, approved"<br>&nbsp;&nbsp;3. Services March 2026: +$3,455 (+7.9%) — amber — "Daily Log sourced"<br>&nbsp;&nbsp;4. Backorder Adjustment: -$200 (-0.5%) — verde — "Partial delivery credit"<br>- **Total Actual: $50,205** (bold, border doble)<br>- Variance KPIs: +$6,455 \| +14.7% vs Base \| 3/3 Documented \| 0 Unexplained<br>- Callout: "Zero surprises — every dollar documented with approval trail"<br>- Botón "Download Report" → fin del demo |

---

## Pruebas Transversales

### Dark Mode
| Test | Cómo | Resultado esperado |
|------|------|-------------------|
| Toggle dark mode en cada flow | Activar dark mode desde el Navbar toggle en steps 1.2, 1.6, 2.3, 3.1 | Todos los colores tienen variantes dark: correctas. Backgrounds oscuros, texto claro. Agent boxes pasan de indigo-50 a indigo-500/10. Badges mantienen legibilidad |

### Pausa / Reanudación
| Test | Cómo | Resultado esperado |
|------|------|-------------------|
| Pausar en step auto | Pausar durante step 1.1 (auto 14s). Esperar 20s. Despausar | El timer no avanzó durante la pausa. Al despausar, continúa desde donde quedó. Eventualmente auto-avanza |
| Pausar en step 1.8 | Pausar durante los 10s de milestone | Spinner/card no avanza. Al despausar continúa |

### Navegación Manual por Sidebar
| Test | Cómo | Resultado esperado |
|------|------|-------------------|
| Saltar steps | Hacer clic directo en step 2.1 desde step 1.2 | Dashboard muestra CO Request Card correctamente. Estados de steps anteriores se resetearon |
| Ir atrás | Desde step 1.7, hacer clic en step 1.4 | ExpertHub muestra Invoice Preview con botón habilitado (estado reseteado) |

### Regresión COI (Demo 1)
| Test | Cómo | Resultado esperado |
|------|------|-------------------|
| Cambiar a perfil COI | Desde Navbar, cambiar perfil a "COI Demo" | Sidebar muestra steps COI (11 steps + Flow 2 + Flow 3). Ningún contenido OPS visible |
| Step 1.5 COI | Navegar a step 1.5 en COI | Muestra el Expert Review de QT-1025 (ValidatorAgent, freight Austin TX), NO el Services Invoice OPS |
| Step 2.1 COI | Navegar a step 2.1 en COI | Muestra Acknowledgement Intake Pipeline (ERPConnectorAgent, AIS/HAT), NO la CO Request Card |
| Steps 1.8 / 3.5 COI | Navegar a step 1.8 y 3.5 en COI | Mobile device frame se muestra correctamente (Sales Approval / End User Report) con fondo oscuro |

---

## Resumen de Steps

| Step | Modo | Duración | App | Botón / Acción |
|------|------|----------|-----|----------------|
| 1.1 | Auto | 14s | Expert Hub + Lupa | — (auto-avanza) |
| 1.2 | Interactive | — | Expert Hub | "Approve Receiving Doc" |
| 1.3 | Auto | 28s | Kanban + Lupa | — (auto-avanza) |
| 1.4 | Interactive | — | Expert Hub | "Approve Invoice Draft" |
| 1.5 | Interactive | — | Expert Hub | "Approve Services Invoice" |
| 1.6 | Interactive | — | Dashboard | "Sync to QuickBooks" |
| 1.7 | Interactive | — | Dashboard | "Done" |
| 1.8 | Auto | 10s | CRM | — (auto-avanza) |
| 2.1 | Interactive | — | Dashboard | "Begin CO Analysis" |
| 2.2 | Auto | 22s | Kanban + Lupa | — (auto-avanza) |
| 2.3 | Interactive | — | Expert Hub | "Approve Change Order" |
| 2.4 | Auto | 18s | Dashboard + Lupa | — (auto-avanza) |
| 3.1 | Interactive | — | Dashboard | "Continue" |
| 3.2 | Interactive | — | Dashboard | "Export to Controller" |
| 3.3 | Interactive | — | CRM | "Download Report" |

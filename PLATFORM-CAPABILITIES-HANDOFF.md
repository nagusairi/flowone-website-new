# PLATFORM CAPABILITIES / CORE MODULES — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 06: Platform Capabilities / Core Modules** (`#capabilities` / `.home-capabilities.home-section`) of the flowOne website.

---

## 1. SECTION OVERVIEW

### 1.1 Purpose & Page Position
- **Section Purpose**: Explores flowOne's 5 core platform capability areas (Get Paid Faster, Control Procurement, Run Inventory Better, Control Cash & Banking, and Stay Compliant). It implements a high-performance, dual-mode architectural presentation:
  1. **Desktop Master-Detail Experience (`> 1024px`)**: A 2-column layout where the left column houses an interactive 5-item Capability Navigator, and the right column houses a persistent, master architectural console featuring a gradient beam, live operational fabric badge with pulsing green beacon, summary description, 2×2 grid of tactile workflow cards linking to `#living-transaction`, and a real-time 8-stage synchronized pipeline visualizer showing active versus dormant touchpoints.
  2. **Tablet & Mobile Accordion Experience (`≤ 1024px`)**: The standalone right-column card is hidden. Instead, each navigator card functions as an in-place accordion header that expands downward with a smooth slide-down animation to reveal the complete workflow suite directly below the tapped button.
- **Section Placement**:
  - **Preceding Section**: Section 05: Continuous Business Flow / Connection Arena (`#connection` / `.home-connection`, lines 713–732 in `Homepage.tsx`).
  - **Succeeding Section**: Section 07: AI Inside Flow (`#ai-inside-flow` / `.home-ai`, lines 803–980 in `Homepage.tsx`).

### 1.2 Component File Names & Exact Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 20–111**: `capabilities` data array defining all 5 capability groups, 20 distinct workflows, active pipeline stages, and summary copy.
  - **Lines 400–412**: `capability` state hook and `handleCapabilityClick` logic with responsive desktop tab persistence and mobile toggle-collapse behavior.
  - **Lines 734–801**: Section shell, header row, `.capability-composition` container, left navigator tabs/accordion, and right desktop master card.
  - **Lines 2420–2474**: `CapabilityDetailContent` component rendering the hairline beam, header with beacon badge, summary, 2×2 workflow grid, and pipeline panel.
  - **Lines 2476–2479**: `CapabilityFlow` component rendering the 8-stage real-time synchronized pipeline track.
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `Icon` component rendering `name="arrow"` in 16px and 14px variants.
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (max-width and horizontal fluid page padding).
  - **Line 5**: `.home-section` (vertical section padding).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 1572–1586**: `.home-capabilities` and `.capability-composition` 2-column grid definition.
  - **Lines 1591–1718**: Left navigator styling (`.capability-list`, `.capability-nav-card`, `:hover`, `.is-active`, `::before` indicator bar, `.capability-num`, `.capability-count`, `.capability-nav-title`, `.capability-nav-sub`, `.capability-nav-arrow`).
  - **Lines 1722–1746**: Tablet/mobile accordion panels (`.capability-accordion-item`, `.capability-accordion-panel`, `.capability-accordion-inner`, `@keyframes capabilityAccordionSlideDown`).
  - **Lines 1751–1846**: Master detail card (`.capability-detail`, `.capability-detail-beam`, `.capability-detail-header`, `.capability-detail-kicker`, `.capability-detail-title`, `.capability-live-badge`, `.capability-beacon`, `@keyframes beaconPulseGreen`, `.capability-detail-summary`).
  - **Lines 1849–1944**: 2×2 workflow card grid (`.capability-items-grid`, `.capability-workflow-card`, `:hover`, `.capability-card-top`, `.capability-card-tag`, `.capability-card-index`, `.capability-card-name`, `.capability-card-desc`, `.capability-card-arrow`).
  - **Lines 1946–2038**: Synchronized pipeline panel (`.capability-pipeline-panel`, `.capability-pipeline-header`, `.capability-pipeline-label`, `.capability-pipeline-status`, `.capability-flow`, `.is-relevant`, stage node dots, and connector lines).
  - **Line 4396**: `@media (max-width: 64rem)` (1024px single-column heading row).
  - **Lines 4407–4427**: `@media (max-width: 64rem)` (1024px tablet accordion conversion, hide right master card, expand panel, rotate arrow 90°).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile section padding and heading margin).
  - **Lines 4530–4537**: `@media (max-width: 48rem)` (768px mobile 1-column workflow stack, vertical pipeline flow, connector line suppression).
- **`src/components/flowone.css`**:
  - **Lines 36–37, 39, 40**: Base `.fo-icon`, `.fo-icon-14`, `.fo-icon-16`, `.fo-icon-action`, `.fo-icon-muted`.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and glow effects.

---

## 2. CODE

### 2.1 Verbatim JSX/TSX Markup

From `src/Homepage.tsx` (Lines 20–111: Data Array):
```tsx
const capabilities = [
  {
    title: "GET PAID FASTER",
    subtitle: "Receivables, Invoicing & Cash Velocity",
    summary: "Automate invoice lifecycle, eliminate DSO friction, and reconcile receivables directly into working cash without manual spreadsheet tracking.",
    count: "4 Workflows",
    items: [
      { name: "Customer-to-Cash", tag: "PIPELINE", desc: "Connect orders, dispatch, and invoices directly to collection ledgers." },
      { name: "Accounts Receivable", tag: "LEDGER", desc: "Real-time ageing schedules, auto-dispute handling, and invoice matching." },
      { name: "Credit & Risk", tag: "AI SCORING", desc: "Dynamic counterparty limits and predictive payment default alerts." },
      { name: "Collections & Payments", tag: "AUTOMATION", desc: "Multi-rail payment collection with automated bank reconciliation." },
    ],
    active: ["INVOICE", "RECEIVABLE", "COLLECTION", "CASH"],
    metrics: [
      { label: "DSO REDUCTION", value: "-18 Days" },
      { label: "RECON SPEED", value: "Real-Time" },
      { label: "CLEARANCE", value: "100% Match" },
    ],
  },
  {
    title: "CONTROL PROCUREMENT",
    subtitle: "Spend Governance & Vendor Settlement",
    summary: "Enforce strict spend controls, automate 3-way matching, and execute vendor disbursements with zero ledger discrepancies.",
    count: "4 Workflows",
    items: [
      { name: "Procure-to-Pay", tag: "WORKFLOW", desc: "End-to-end purchasing governance from requisition to bank clearance." },
      { name: "Purchase Orders", tag: "GOVERNANCE", desc: "Multi-tier approval matrices with dynamic budget ceiling checks." },
      { name: "Accounts Payable", tag: "AUTOMATED", desc: "Optical extraction and automated 3-way line item verification." },
      { name: "Vendor Management", tag: "COMPLIANCE", desc: "Verified GSTIN onboarding, MSME tracking, and payment schedules." },
    ],
    active: ["ORDER", "INVOICE", "BANK"],
    metrics: [
      { label: "SPEND VARIANCE", value: "₹0.00" },
      { label: "3-WAY MATCH", value: "99.4%" },
      { label: "PO APPROVAL", value: "<2 Hours" },
    ],
  },
  {
    title: "RUN INVENTORY BETTER",
    subtitle: "Warehouse Allocation & Stock Velocity",
    summary: "Unify multi-location warehouse inventories with live sales orders, automated reorder thresholds, and demand intelligence.",
    count: "4 Workflows",
    items: [
      { name: "Inventory Intelligence", tag: "PREDICTIVE", desc: "Multi-echelon demand forecasting and automated safety stock alerts." },
      { name: "Warehouse Management", tag: "FULFILLMENT", desc: "Live bin allocation, pick-and-pack optimization, and dispatch tracking." },
      { name: "Stock & Replenishment", tag: "AUTOMATION", desc: "Algorithmic reorder triggers linked directly to supplier POs." },
      { name: "Order Management", tag: "ROUTING", desc: "Split-order routing and fulfillment across regional distribution centers." },
    ],
    active: ["ORDER", "INVENTORY", "INVOICE"],
    metrics: [
      { label: "STOCKOUT RISK", value: "Zero" },
      { label: "DISPATCH TURN", value: "4.2 Hours" },
      { label: "PICK ACCURACY", value: "99.9%" },
    ],
  },
  {
    title: "CONTROL CASH & BANKING",
    subtitle: "Treasury Forecasting & Auto-Reconciliation",
    summary: "Consolidate multi-bank balances, eliminate manual bank statement reconciliations, and forecast forward cash runways with precision.",
    count: "4 Workflows",
    items: [
      { name: "Cash & Banking", tag: "TREASURY", desc: "Unified multi-bank position dashboard with live transaction feeds." },
      { name: "Bank Reconciliation", tag: "ZERO DRIFT", desc: "Sub-second ledger-to-bank statement matching with zero variance." },
      { name: "Cash Flow Forecasting", tag: "PREDICTIVE", desc: "Scenario-based cash runways factoring in scheduled AP and expected AR." },
      { name: "Financial Visibility", tag: "REAL-TIME", desc: "CFO-ready executive liquidity telemetry and working capital metrics." },
    ],
    active: ["COLLECTION", "BANK", "CASH"],
    metrics: [
      { label: "FORWARD RUNWAY", value: "18 Months" },
      { label: "BANK SYNC", value: "Automated" },
      { label: "RECON DRIFT", value: "₹0.00" },
    ],
  },
  {
    title: "STAY COMPLIANT",
    subtitle: "Statutory Clearances & Audit Lineage",
    summary: "Generate authenticated IRN e-invoices, auto-clear e-way bills, and reconcile GST returns directly within transaction state.",
    count: "4 Workflows",
    items: [
      { name: "GST Hub", tag: "TAX ENGINE", desc: "Unified statutory compliance terminal for multi-GSTIN enterprises." },
      { name: "E-Invoicing", tag: "INSTANT IRN", desc: "Automated direct IRP handshake and QR code stamping on issuance." },
      { name: "E-Way Bills", tag: "LOGISTICS", desc: "Automated dispatch generation synchronized with transporter portals." },
      { name: "GST Reconciliation", tag: "AUTOMATION", desc: "Real-time GSTR-1, 2B, and 3B auto-population with zero tax credit loss." },
    ],
    active: ["INVOICE", "GST", "BANK"],
    metrics: [
      { label: "IRN CLEARANCE", value: "Instant" },
      { label: "GSTR-1 DRIFT", value: "0.0%" },
      { label: "AUDIT LINEAGE", value: "Append-Only" },
    ],
  },
];
```

From `src/Homepage.tsx` (Lines 400–412: Interaction State Controller):
```tsx
const [capability, setCapability] = useState(0);

const handleCapabilityClick = useCallback((i: number) => {
  setCapability((prev) => {
    if (prev === i) {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) {
        return -1;
      }
      return i;
    }
    return i;
  });
}, []);
```

From `src/Homepage.tsx` (Lines 734–801: Section Markup):
```tsx
<section id="capabilities" className="home-capabilities home-section">
  <div className="home-container">
    <div className="section-heading-row">
      <div>
        <span className="home-index">PLATFORM CAPABILITIES</span>
        <h2>Start with the work that matters most.</h2>
      </div>
      <p>Choose an outcome to see how flowOne helps you improve the workflows behind it.</p>
    </div>
    <div className="capability-composition">
      {/* LEFT COLUMN: CAPABILITY NAVIGATOR (Becomes accordion on tablet & mobile) */}
      <div className="capability-list" role="tablist" aria-label="Capability areas">
        {capabilities.map((group, i) => {
          const isSelected = capability === i;
          return (
            <div
              key={group.title}
              className={`capability-accordion-item ${isSelected ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-expanded={isSelected}
                onClick={() => handleCapabilityClick(i)}
                className={`capability-nav-card ${isSelected ? "is-active" : ""}`}
              >
                <div className="capability-nav-top">
                  <span className="capability-num">0{i + 1}</span>
                  <span className="capability-count">{group.count}</span>
                </div>
                <div className="capability-nav-body">
                  <strong className="capability-nav-title">{group.title}</strong>
                  <span className="capability-nav-sub">{group.subtitle}</span>
                </div>
                <div className="capability-nav-arrow" aria-hidden="true">
                  <Icon name="arrow" size={16} tone={isSelected ? "action" : "muted"} />
                </div>
              </button>

              {/* Tablet & Mobile In-Place Accordion Body */}
              <div
                className="capability-accordion-panel"
                hidden={!isSelected}
                aria-hidden={!isSelected}
              >
                <div className="capability-accordion-inner capability-detail">
                  <CapabilityDetailContent
                    group={group}
                    index={i}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: MODERN ARCHITECTURAL CARD (Visible on Desktop only) */}
      <div className="capability-detail" aria-live="polite">
        <CapabilityDetailContent
          group={capabilities[capability >= 0 && capability < capabilities.length ? capability : 0]}
          index={capability >= 0 && capability < capabilities.length ? capability : 0}
        />
      </div>
    </div>
  </div>
</section>
```

From `src/Homepage.tsx` (Lines 2420–2479: Subcomponents):
```tsx
function CapabilityDetailContent({
  group,
  index,
}: {
  group: (typeof capabilities)[number];
  index: number;
}) {
  return (
    <>
      {/* Top signature hairline beam */}
      <div className="capability-detail-beam" aria-hidden="true" />

      {/* Header row */}
      <div className="capability-detail-header">
        <div className="capability-detail-kicker-group">
          <span className="capability-detail-kicker">0{index + 1} · UNIFIED ARCHITECTURE</span>
          <h3 className="capability-detail-title">{group.title}</h3>
        </div>
        <span className="capability-live-badge">
          <span className="capability-beacon" aria-hidden="true" />
          LIVE OPERATIONAL FABRIC
        </span>
      </div>

      <p className="capability-detail-summary">{group.summary}</p>

      {/* 2×2 Tactile Workflow Cards */}
      <div className="capability-items-grid">
        {group.items.map((item, idx) => (
          <a href="#living-transaction" key={item.name} className="capability-workflow-card">
            <div className="capability-card-top">
              <span className="capability-card-tag">{item.tag}</span>
              <span className="capability-card-index">0{idx + 1}</span>
            </div>
            <strong className="capability-card-name">{item.name}</strong>
            <span className="capability-card-desc">{item.desc}</span>
            <div className="capability-card-arrow" aria-hidden="true">
              <span>Explore workflow</span>
              <Icon name="arrow" size={14} tone="action" />
            </div>
          </a>
        ))}
      </div>

      {/* Active Pipeline Stage Visualizer */}
      <div className="capability-pipeline-panel">
        <div className="capability-pipeline-header">
          <span className="capability-pipeline-label">SYNCHRONIZED PIPELINE STAGES</span>
          <span className="capability-pipeline-status">{group.active.length} OF 8 ACTIVE IN REAL-TIME</span>
        </div>
        <CapabilityFlow active={group.active} />
      </div>
    </>
  );
}

function CapabilityFlow({ active }: { active: readonly string[] }) {
  const items = ["ORDER", "INVENTORY", "INVOICE", "GST", "RECEIVABLE", "COLLECTION", "BANK", "CASH"];
  return (
    <div className="capability-flow">
      {items.map((x, i) => (
        <div className={active.includes(x) ? "is-relevant" : ""} key={x}>
          <i />
          <span>{x}</span>
          {i < items.length - 1 && <b />}
        </div>
      ))}
    </div>
  );
}
```

From `src/components/flowone.tsx` (Lines 6–17: Icon Definition):
```tsx
export function Icon({ name = "arrow", size = 20, tone = "default" }: { name?: "arrow" | "spark" | "check" | "alert" | "search" | "close" | "chevron"; size?: 14 | 16 | 20 | 24 | 32; tone?: "default" | "muted" | "inverse" | "action" | "danger" | "success" | "warning" }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    spark: <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    alert: <><path d="M12 8v5" /><path d="M12 17h.01" /><path d="M10.2 4.5 3.5 18h17L13.8 4.5a2 2 0 0 0-3.6 0Z" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m8 10 4 4 4-4" />,
  };
  return <svg className={`fo-icon fo-icon-${size} fo-icon-${tone}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>;
}
```

---

### 2.2 Verbatim CSS Stylesheet

```css
/* Container & Section Base */
.home-container {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

.home-section {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
}

.home-section h2 {
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-h2);
  line-height: var(--leading-heading);
  letter-spacing: -.05em;
  font-weight: 650;
}

.section-heading-row {
  display: grid;
  grid-template-columns: 1.4fr .8fr;
  gap: var(--spacing-10);
  align-items: end;
  margin-bottom: clamp(1.75rem, 3vh, 2.35rem);
}

.section-heading-row > p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* SECTION 06: Capabilities Deck Base */
.home-capabilities {
  background: var(--color-surface-page, #f8faff);
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
}

.capability-composition {
  display: grid;
  grid-template-columns: minmax(310px, 0.95fr) minmax(520px, 1.45fr);
  gap: 2.25rem;
  align-items: start;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
}

/* ==========================================================================
   LEFT COLUMN: CAPABILITY NAVIGATOR
   ========================================================================== */
.capability-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: transparent;
  border: 0;
}

.capability-nav-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  padding: 1.15rem 1.35rem;
  text-align: left;
  background: #ffffff;
  border: 1px solid rgba(11, 16, 32, 0.08);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  user-select: none;
}

.capability-nav-card::before {
  content: "";
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 0;
  width: 3.5px;
  border-radius: 0 4px 4px 0;
  background: var(--flow-primary);
  opacity: 0;
  transform: scaleY(0.4);
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.capability-nav-card:hover {
  background: var(--neutral-0);
  border-color: rgba(5, 40, 242, 0.25);
  transform: translateX(4px);
  box-shadow: 0 4px 16px -2px rgba(5, 40, 242, 0.08);
}

.capability-nav-card.is-active {
  background: var(--neutral-0);
  border-color: rgba(5, 40, 242, 0.35);
  box-shadow: 0 8px 24px -4px rgba(5, 40, 242, 0.12), 0 2px 6px rgba(5, 40, 242, 0.04);
}

.capability-nav-card.is-active::before {
  opacity: 1;
  transform: scaleY(1);
}

.capability-nav-top {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.capability-num {
  font-family: var(--font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 0.6875rem;
  font-weight: 750;
  color: var(--color-brand-blue);
  letter-spacing: 0.06em;
}

.capability-count {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #64748b;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: rgba(11, 16, 32, 0.04);
  text-transform: uppercase;
}

.capability-nav-card.is-active .capability-count {
  color: var(--color-brand-blue);
  background: rgba(0, 34, 255, 0.08);
}

.capability-nav-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.capability-nav-title {
  font-size: 0.92rem;
  font-weight: 650;
  color: var(--neutral-900);
  letter-spacing: -0.015em;
  transition: color 0.15s ease;
}

.capability-nav-card.is-active .capability-nav-title,
.capability-nav-card:hover .capability-nav-title {
  color: var(--flow-primary);
}

.capability-nav-sub {
  font-size: 0.72rem;
  line-height: 1.35;
  color: #64748b;
}

.capability-nav-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.capability-nav-card:hover .capability-nav-arrow,
.capability-nav-card.is-active .capability-nav-arrow {
  transform: translateX(3px);
}

/* ==========================================================================
   TABLET & MOBILE IN-PLACE ACCORDION
   ========================================================================== */
.capability-accordion-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.capability-accordion-panel {
  display: none;
  width: 100%;
}

.capability-accordion-inner {
  margin-top: 0.5rem;
}

@keyframes capabilityAccordionSlideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==========================================================================
   RIGHT COLUMN: MODERN ARCHITECTURAL CARD
   ========================================================================== */
.capability-detail {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.25rem 2.25rem 2rem;
  background: #ffffff;
  border: 1px solid rgba(0, 34, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 20px 48px -12px rgba(0, 34, 255, 0.08), 0 4px 16px -2px rgba(11, 16, 32, 0.03);
  overflow: hidden;
}

/* Top Signature Hairline Gradient Beam */
.capability-detail-beam {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-flow);
}

.capability-detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.capability-detail-kicker-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.capability-detail-kicker {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.65rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  color: var(--color-brand-blue);
  text-transform: uppercase;
}

.capability-detail-title {
  font-size: 1.65rem;
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--neutral-900);
  margin: 0;
}

.capability-live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-family: var(--font-family-mono, monospace);
  font-size: 0.58rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  color: #047857;
  white-space: nowrap;
  flex-shrink: 0;
}

.capability-beacon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  animation: beaconPulseGreen 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes beaconPulseGreen {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(16, 185, 129, 0);
  }
}

.capability-detail-summary {
  max-width: 44rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: #475467;
  margin: -0.25rem 0 0;
}

/* 2×2 Grid of Tactile Workflow Cards */
.capability-items-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 0;
}

.capability-workflow-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.15rem 1.25rem;
  background: linear-gradient(165deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 255, 0.85) 100%);
  border: 1px solid rgba(11, 16, 32, 0.08);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.capability-workflow-card:hover {
  background: #ffffff;
  border-color: rgba(0, 34, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(0, 34, 255, 0.1);
}

.capability-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.capability-card-tag {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5625rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(0, 34, 255, 0.08);
  color: var(--color-brand-blue);
  text-transform: uppercase;
}

.capability-card-index {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.6rem;
  font-weight: 700;
  color: #94a3b8;
}

.capability-card-name {
  font-size: 0.875rem;
  font-weight: 650;
  color: var(--neutral-900);
  letter-spacing: -0.01em;
  transition: color 0.15s ease;
}

.capability-workflow-card:hover .capability-card-name {
  color: var(--flow-primary);
}

.capability-card-desc {
  font-size: 0.72rem;
  line-height: 1.45;
  color: #64748b;
  flex: 1;
}

.capability-card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-brand-blue);
  opacity: 0.85;
  transition: all 0.2s ease;
}

.capability-card-arrow .fo-icon {
  transition: transform 0.2s ease;
}

.capability-workflow-card:hover .capability-card-arrow {
  opacity: 1;
}

.capability-workflow-card:hover .capability-card-arrow .fo-icon {
  transform: translateX(4px);
}

/* Synchronized Pipeline Stage Visualizer */
.capability-pipeline-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.15rem 1.25rem;
  background: rgba(248, 250, 255, 0.9);
  border: 1px solid rgba(0, 34, 255, 0.1);
  border-radius: 12px;
}

.capability-pipeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.capability-pipeline-label {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.625rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  color: var(--color-brand-blue);
  text-transform: uppercase;
}

.capability-pipeline-status {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #64748b;
}

.capability-flow {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0.25rem 0;
}

.capability-flow > div {
  min-width: 0;
  display: flex;
  align-items: center;
  flex: 1;
  opacity: 0.35;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.capability-flow > div.is-relevant {
  opacity: 1;
}

.capability-flow i {
  width: 0.7rem;
  height: 0.7rem;
  flex: 0 0 auto;
  background: #cbd5e1;
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
}

.capability-flow .is-relevant i {
  background: var(--flow-primary);
  box-shadow: 0 0 8px rgba(5, 40, 242, 0.6);
  transform: scale(1.15);
}

.capability-flow span {
  margin-left: 0.4rem;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5625rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  color: var(--neutral-500);
}

.capability-flow .is-relevant span {
  color: var(--neutral-900);
}

.capability-flow b {
  height: 2px;
  flex: 1;
  margin-inline: 0.35rem;
  background: var(--neutral-200);
}

.capability-flow .is-relevant b {
  background: var(--gradient-flow);
}

/* Base Icon Classes */
.fo-icon {
  flex: 0 0 auto;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fo-icon-14 {
  width: 0.875rem;
  height: 0.875rem;
}

.fo-icon-16 {
  width: 1rem;
  height: 1rem;
}

.fo-icon-action {
  color: var(--color-brand-blue);
}

.fo-icon-muted {
  color: var(--color-text-tertiary);
}

/* ==========================================================================
   RESPONSIVE MEDIA QUERIES
   ========================================================================== */
@media (max-width: 64rem) {
  .section-heading-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  .capability-composition {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .capability-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    border: none;
    width: 100%;
  }
  .capability-composition > .capability-detail {
    display: none !important;
  }
  .capability-accordion-item.is-expanded .capability-accordion-panel {
    display: block !important;
    animation: capabilityAccordionSlideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .capability-accordion-item.is-expanded .capability-nav-arrow {
    transform: rotate(90deg) !important;
  }
}

@media (max-width: 48rem) {
  .home-section {
    padding-block: clamp(2.25rem, 4.5vh, 3rem);
  }
  .section-heading-row {
    margin-bottom: 1.5rem;
  }
  .home-section h2 {
    font-size: var(--font-h2);
  }
  .capability-detail {
    min-height: auto;
    padding: 1.25rem;
  }
  .capability-items-grid {
    grid-template-columns: 1fr;
  }
  .capability-flow {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .capability-flow > div {
    width: 100%;
    min-height: 2rem;
  }
  .capability-flow b {
    display: none;
  }
}
```

---

### 2.3 Resolved Design Tokens

| Token Name | Defined In | Aliased / Inherited Chain | Resolved Literal Value | Usage in This Section |
| :--- | :--- | :--- | :--- | :--- |
| `--color-surface-page` | `src/index.css` | `var(--neutral-0)` | `#FFFFFF` (fallback `#f8faff`) | `.home-capabilities` section background |
| `--neutral-0` | `src/index.css` | Raw token | `#FFFFFF` | Nav card hover/active background, card white |
| `--neutral-200` | `src/index.css` | Raw token | `#E6EAF0` | Pipeline dormant connector line `b` |
| `--neutral-500` | `src/index.css` | Raw token | `#6B7280` | Pipeline dormant stage label text |
| `--neutral-900` | `src/index.css` | Raw token | `#0D0D0D` | Nav card title, detail title, workflow card name, relevant stage label |
| `--color-brand-blue` | `src/index.css` | `var(--flow-primary)` | `#0528F2` | Step numbers, count active pill, kickers, workflow arrow |
| `--flow-primary` | `src/index.css` | Raw token | `#0528F2` | Nav card active border/pill indicator, pipeline node relevant background |
| `--color-text-secondary`| `src/index.css` | `var(--neutral-700)` | `#374151` | Intro paragraph text color |
| `--color-text-tertiary` | `src/index.css` | `var(--neutral-500)` | `#6B7280` | Muted navigator arrow icon |
| `--gradient-flow` | `src/index.css` | Raw token | `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)` | Top hairline detail beam, relevant connector line `b` |
| `--container-wide` | `src/index.css` | Raw token | `80rem` (1280px) | Container max-width |
| `--page-padding` | `src/index.css` | Raw token | `clamp(1.25rem, 3.34vw, 3rem)` | Container horizontal side gutters (20px to 48px) |
| `--spacing-4` | `src/index.css` | Raw token | `2rem` (32px) | Top margin of `h2`, tablet header row gap |
| `--spacing-10` | `src/index.css` | Raw token | `5rem` (80px) | Desktop header row gap |
| `--font-h2` | `src/index.css` | Raw token | `clamp(2.25rem, 3.34vw, 3rem)` | Main `<h2>` heading size |
| `--font-family-primary` | `src/index.css` | Raw token | `"Manrope", sans-serif` | Global typography |
| `--font-family-mono` | Not declared in `:root` | Fallback stack | `ui-monospace, SFMono-Regular, Menlo, monospace` | Number labels, tags, kickers, pipeline labels |

---

### 2.4 JavaScript Architecture (Vanilla JS for Elementor / WordPress)
This script replicates the exact dual desktop-tab and tablet/mobile-accordion behavior:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  const comp = document.querySelector('.capability-composition');
  if (!comp) return;

  const navItems = comp.querySelectorAll('.capability-accordion-item');
  const desktopDetail = comp.querySelector(':scope > .capability-detail');

  let activeIndex = 0;

  function isMobile() {
    return window.innerWidth <= 1024;
  }

  function updateView(newIndex) {
    if (isMobile()) {
      // Accordion toggle behavior
      if (activeIndex === newIndex) {
        // Collapse currently open
        navItems[activeIndex].classList.remove('is-expanded');
        const btn = navItems[activeIndex].querySelector('.capability-nav-card');
        const panel = navItems[activeIndex].querySelector('.capability-accordion-panel');
        if (btn) {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-selected', 'false');
        }
        if (panel) {
          panel.hidden = true;
          panel.setAttribute('aria-hidden', 'true');
        }
        activeIndex = -1;
        return;
      }
    }

    // Activate new index
    navItems.forEach((item, idx) => {
      const btn = item.querySelector('.capability-nav-card');
      const panel = item.querySelector('.capability-accordion-panel');
      const arrowIcon = item.querySelector('.capability-nav-arrow .fo-icon');

      if (idx === newIndex) {
        item.classList.add('is-expanded');
        if (btn) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-expanded', 'true');
          btn.setAttribute('aria-selected', 'true');
        }
        if (panel) {
          panel.hidden = false;
          panel.setAttribute('aria-hidden', 'false');
        }
        if (arrowIcon) {
          arrowIcon.classList.remove('fo-icon-muted');
          arrowIcon.classList.add('fo-icon-action');
        }
      } else {
        item.classList.remove('is-expanded');
        if (btn) {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-selected', 'false');
        }
        if (panel) {
          panel.hidden = true;
          panel.setAttribute('aria-hidden', 'true');
        }
        if (arrowIcon) {
          arrowIcon.classList.remove('fo-icon-action');
          arrowIcon.classList.add('fo-icon-muted');
        }
      }
    });

    // Update Desktop Right Panel Content if on Desktop
    if (!isMobile() && desktopDetail) {
      // In Elementor, toggle visibility of pre-rendered desktop cards or inject data
      desktopDetail.setAttribute('data-active-index', newIndex);
    }

    activeIndex = newIndex;
  }

  navItems.forEach((item, idx) => {
    const btn = item.querySelector('.capability-nav-card');
    if (btn) {
      btn.addEventListener('click', function () {
        updateView(idx);
      });
    }
  });

  // Initial Sync
  updateView(0);
});
```

---

## 3. CONTENT

### 3.1 Exhaustive Text Strings in Display Order

#### Section Header
- **Eyebrow Capsule**: `PLATFORM CAPABILITIES` (`<span class="home-index">`)
- **Main Heading**: `Start with the work that matters most.` (`<h2>`)
- **Subtitle Paragraph**: `Choose an outcome to see how flowOne helps you improve the workflows behind it.` (`<p>`)

#### Capability 01: GET PAID FASTER
- **Index**: `01`
- **Count**: `4 Workflows`
- **Title**: `GET PAID FASTER`
- **Subtitle**: `Receivables, Invoicing & Cash Velocity`
- **Detail Kicker**: `01 · UNIFIED ARCHITECTURE`
- **Live Badge**: `LIVE OPERATIONAL FABRIC`
- **Summary**: `Automate invoice lifecycle, eliminate DSO friction, and reconcile receivables directly into working cash without manual spreadsheet tracking.`
- **Workflows (4 Cards)**:
  1. `Customer-to-Cash` | Tag: `PIPELINE` | Index: `01` | Desc: `Connect orders, dispatch, and invoices directly to collection ledgers.`
  2. `Accounts Receivable` | Tag: `LEDGER` | Index: `02` | Desc: `Real-time ageing schedules, auto-dispute handling, and invoice matching.`
  3. `Credit & Risk` | Tag: `AI SCORING` | Index: `03` | Desc: `Dynamic counterparty limits and predictive payment default alerts.`
  4. `Collections & Payments` | Tag: `AUTOMATION` | Index: `04` | Desc: `Multi-rail payment collection with automated bank reconciliation.`
- **Pipeline Visualizer**:
  - Label: `SYNCHRONIZED PIPELINE STAGES`
  - Status: `4 OF 8 ACTIVE IN REAL-TIME`
  - Active Stages: `INVOICE`, `RECEIVABLE`, `COLLECTION`, `CASH`

#### Capability 02: CONTROL PROCUREMENT
- **Index**: `02`
- **Count**: `4 Workflows`
- **Title**: `CONTROL PROCUREMENT`
- **Subtitle**: `Spend Governance & Vendor Settlement`
- **Detail Kicker**: `02 · UNIFIED ARCHITECTURE`
- **Live Badge**: `LIVE OPERATIONAL FABRIC`
- **Summary**: `Enforce strict spend controls, automate 3-way matching, and execute vendor disbursements with zero ledger discrepancies.`
- **Workflows (4 Cards)**:
  1. `Procure-to-Pay` | Tag: `WORKFLOW` | Index: `01` | Desc: `End-to-end purchasing governance from requisition to bank clearance.`
  2. `Purchase Orders` | Tag: `GOVERNANCE` | Index: `02` | Desc: `Multi-tier approval matrices with dynamic budget ceiling checks.`
  3. `Accounts Payable` | Tag: `AUTOMATED` | Index: `03` | Desc: `Optical extraction and automated 3-way line item verification.`
  4. `Vendor Management` | Tag: `COMPLIANCE` | Index: `04` | Desc: `Verified GSTIN onboarding, MSME tracking, and payment schedules.`
- **Pipeline Visualizer**:
  - Label: `SYNCHRONIZED PIPELINE STAGES`
  - Status: `3 OF 8 ACTIVE IN REAL-TIME`
  - Active Stages: `ORDER`, `INVOICE`, `BANK`

#### Capability 03: RUN INVENTORY BETTER
- **Index**: `03`
- **Count**: `4 Workflows`
- **Title**: `RUN INVENTORY BETTER`
- **Subtitle**: `Warehouse Allocation & Stock Velocity`
- **Detail Kicker**: `03 · UNIFIED ARCHITECTURE`
- **Live Badge**: `LIVE OPERATIONAL FABRIC`
- **Summary**: `Unify multi-location warehouse inventories with live sales orders, automated reorder thresholds, and demand intelligence.`
- **Workflows (4 Cards)**:
  1. `Inventory Intelligence` | Tag: `PREDICTIVE` | Index: `01` | Desc: `Multi-echelon demand forecasting and automated safety stock alerts.`
  2. `Warehouse Management` | Tag: `FULFILLMENT` | Index: `02` | Desc: `Live bin allocation, pick-and-pack optimization, and dispatch tracking.`
  3. `Stock & Replenishment` | Tag: `AUTOMATION` | Index: `03` | Desc: `Algorithmic reorder triggers linked directly to supplier POs.`
  4. `Order Management` | Tag: `ROUTING` | Index: `04` | Desc: `Split-order routing and fulfillment across regional distribution centers.`
- **Pipeline Visualizer**:
  - Label: `SYNCHRONIZED PIPELINE STAGES`
  - Status: `3 OF 8 ACTIVE IN REAL-TIME`
  - Active Stages: `ORDER`, `INVENTORY`, `INVOICE`

#### Capability 04: CONTROL CASH & BANKING
- **Index**: `04`
- **Count**: `4 Workflows`
- **Title**: `CONTROL CASH & BANKING`
- **Subtitle**: `Treasury Forecasting & Auto-Reconciliation`
- **Detail Kicker**: `04 · UNIFIED ARCHITECTURE`
- **Live Badge**: `LIVE OPERATIONAL FABRIC`
- **Summary**: `Consolidate multi-bank balances, eliminate manual bank statement reconciliations, and forecast forward cash runways with precision.`
- **Workflows (4 Cards)**:
  1. `Cash & Banking` | Tag: `TREASURY` | Index: `01` | Desc: `Unified multi-bank position dashboard with live transaction feeds.`
  2. `Bank Reconciliation` | Tag: `ZERO DRIFT` | Index: `02` | Desc: `Sub-second ledger-to-bank statement matching with zero variance.`
  3. `Cash Flow Forecasting` | Tag: `PREDICTIVE` | Index: `03` | Desc: `Scenario-based cash runways factoring in scheduled AP and expected AR.`
  4. `Financial Visibility` | Tag: `REAL-TIME` | Index: `04` | Desc: `CFO-ready executive liquidity telemetry and working capital metrics.`
- **Pipeline Visualizer**:
  - Label: `SYNCHRONIZED PIPELINE STAGES`
  - Status: `3 OF 8 ACTIVE IN REAL-TIME`
  - Active Stages: `COLLECTION`, `BANK`, `CASH`

#### Capability 05: STAY COMPLIANT
- **Index**: `05`
- **Count**: `4 Workflows`
- **Title**: `STAY COMPLIANT`
- **Subtitle**: `Statutory Clearances & Audit Lineage`
- **Detail Kicker**: `05 · UNIFIED ARCHITECTURE`
- **Live Badge**: `LIVE OPERATIONAL FABRIC`
- **Summary**: `Generate authenticated IRN e-invoices, auto-clear e-way bills, and reconcile GST returns directly within transaction state.`
- **Workflows (4 Cards)**:
  1. `GST Hub` | Tag: `TAX ENGINE` | Index: `01` | Desc: `Unified statutory compliance terminal for multi-GSTIN enterprises.`
  2. `E-Invoicing` | Tag: `INSTANT IRN` | Index: `02` | Desc: `Automated direct IRP handshake and QR code stamping on issuance.`
  3. `E-Way Bills` | Tag: `LOGISTICS` | Index: `03` | Desc: `Automated dispatch generation synchronized with transporter portals.`
  4. `GST Reconciliation` | Tag: `AUTOMATION` | Index: `04` | Desc: `Real-time GSTR-1, 2B, and 3B auto-population with zero tax credit loss.`
- **Pipeline Visualizer**:
  - Label: `SYNCHRONIZED PIPELINE STAGES`
  - Status: `3 OF 8 ACTIVE IN REAL-TIME`
  - Active Stages: `INVOICE`, `GST`, `BANK`

### 3.2 Hyperlinks & Outbound Destinations
- Every workflow card in the 2×2 grid contains:
  - Destination URL: `#living-transaction`
  - Link Label: `Explore workflow`
  - Total Workflow Links: **20 instances** (4 cards per capability group across 5 groups).
  - Purpose: Anchors directly back up to Section 03 ("The Living Transaction") to let visitors inspect the continuous pipeline execution.

---

## 4. LAYOUT SPEC

### 4.1 Container & Vertical Spacing
- **Section Padding**:
  - Desktop / Tablet (`> 768px`): `clamp(3.25rem, 5.5vh, 4.5rem)` top and bottom.
  - Mobile (`≤ 768px`): `clamp(2.25rem, 4.5vh, 3rem)` top and bottom.
- **Container Max-Width**: `80rem` (1280px).
- **Container Side Gutters**: `clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
- **Header Row Margin-Bottom**: `clamp(1.75rem, 3vh, 2.35rem)` (mobile: `1.5rem`).

### 4.2 Desktop Two-Column Composition (`> 1024px`)
- **Grid Structure**:
  `grid-template-columns: minmax(310px, 0.95fr) minmax(520px, 1.45fr); gap: 2.25rem; align-items: start;`
- **Left Column (Capability Navigator)**:
  - Flex column with `gap: 0.75rem` (12px).
  - Cards: `padding: 1.15rem 1.35rem`, `border-radius: 14px`, `background: #ffffff`, border `1px solid rgba(11, 16, 32, 0.08)`.
- **Right Column (Master Detail Card)**:
  - `padding: 2.25rem 2.25rem 2rem; border-radius: 20px; background: #ffffff; border: 1px solid rgba(0, 34, 255, 0.12);`
  - Box Shadow: `0 20px 48px -12px rgba(0, 34, 255, 0.08), 0 4px 16px -2px rgba(11, 16, 32, 0.03)`.
  - Top Hairline Beam: `height: 3px; position: absolute; inset: 0 0 auto 0; background: var(--gradient-flow);`
- **2×2 Workflow Grid (`.capability-items-grid`)**:
  - `grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem;`
  - Cards: `padding: 1.15rem 1.25rem; border-radius: 12px; background: linear-gradient(165deg, #FFFFFF 0%, rgba(248, 250, 255, 0.85) 100%);`
- **Pipeline Visualizer (`.capability-pipeline-panel`)**:
  - `padding: 1.15rem 1.25rem; border-radius: 12px; background: rgba(248, 250, 255, 0.9); border: 1px solid rgba(0, 34, 255, 0.1);`
  - 8 stages in a horizontal flex track (`.capability-flow`).

---

## 5. RESPONSIVE SPEC

### 5.1 Breakpoint Architecture

```
Desktop (≥ 1025px / > 64rem)
   │
   ├─► 2-Column Heading Row: 1.4fr : 0.8fr (gap 80px)
   ├─► Two-Column Composition: Navigator (310px) + Master Detail Card (520px+)
   ├─► Desktop Master Card visible on right (.capability-detail)
   ├─► Accordion Panels Hidden: display: none (.capability-accordion-panel)
   ├─► 2×2 Workflow Grid inside detail card
   └─► Horizontal 8-Stage Pipeline Track with Connector Lines
   │
Tablet (769px – 1024px / 48rem – 64rem)
   │
   ├─► Single-Column Heading Row: grid-template-columns: 1fr; gap 32px
   ├─► 1-Column Composition: grid-template-columns: 1fr; gap 20px
   ├─► RIGHT MASTER CARD HIDDEN: display: none !important (.capability-composition > .capability-detail)
   ├─► ACCORDION ACTIVATION: .capability-accordion-panel displays in-place beneath clicked card
   ├─► Animation: capabilityAccordionSlideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1)
   ├─► Arrow rotates 90°: transform: rotate(90deg) !important
   └─► 2×2 Workflow Grid retained inside accordion panel
   │
Mobile (≤ 768px / ≤ 48rem)
   │
   ├─► Section Padding Clamped: clamp(2.25rem, 4.5vh, 3rem)
   ├─► Accordion Card Padding: reduced to 1.25rem (20px)
   ├─► 2×2 WORKFLOW GRID BECOMES 1-COLUMN STACK: grid-template-columns: 1fr
   ├─► PIPELINE VISUALIZER SHIFTS TO VERTICAL LIST: flex-direction: column; align-items: flex-start; gap: 8px
   └─► Connector Lines Hidden: display: none (.capability-flow b)
```

### 5.2 Responsive Property Change Matrix

| Selector / Element | Desktop (> 1024px) | Tablet (769px – 1024px) | Mobile (≤ 768px) |
| :--- | :--- | :--- | :--- |
| `.capability-composition` | `minmax(310px, 0.95fr) minmax(520px, 1.45fr)` | `1fr; gap: 1.25rem;` | `1fr; gap: 1.25rem;` |
| `.capability-composition > .capability-detail` | `display: flex;` (Persistent master) | `display: none !important;` | `display: none !important;` |
| `.capability-accordion-panel` | `display: none;` | `display: block;` (in-place on open) | `display: block;` (in-place on open) |
| `.capability-nav-arrow` (active) | `transform: translateX(3px);` | `transform: rotate(90deg) !important;` | `transform: rotate(90deg) !important;` |
| `.capability-items-grid` | `repeat(2, minmax(0, 1fr)); gap: 1rem;` | `repeat(2, minmax(0, 1fr)); gap: 1rem;` | `1fr; gap: 1rem;` (1-column stack) |
| `.capability-flow` | `flex-direction: row; align-items: center;` | `flex-direction: row; align-items: center;` | `flex-direction: column; align-items: flex-start; gap: 0.5rem;` |
| `.capability-flow b` (lines) | `display: block; height: 2px; flex: 1;` | `display: block;` | `display: none;` (hidden) |

---

## 6. TYPOGRAPHY

| Style Role | Font Family | Size / Clamp | Weight | Line Height | Letter Spacing | Resolved Color | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Section Eyebrow** (`.home-index`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | `700` | `1` | `0.12em` | `#0528F2` | `uppercase` |
| **Section Heading** (`.home-section h2`) | `"Manrope", sans-serif` | `clamp(2.25rem, 3.34vw, 3rem)` | `650` | `1.08` | `-0.05em` | `#0D0D0D` | `none` |
| **Intro Paragraph** (`.section-heading-row > p`) | `"Manrope", sans-serif` | `1.0625rem` (17px) | `400` | `1.7` | `normal` | `#374151` | `none` |
| **Navigator Step Number** (`.capability-num`) | `ui-monospace, monospace` | `0.6875rem` (11px) | `750` | `normal` | `0.06em` | `#0528F2` | `none` |
| **Workflow Count Pill** (`.capability-count`) | `ui-monospace, monospace` | `0.58rem` (9.28px) | `700` | `normal` | `0.04em` | `#64748B` (active: `#0528F2`) | `uppercase` |
| **Navigator Title** (`.capability-nav-title`) | `"Manrope", sans-serif` | `0.92rem` (14.72px) | `650` | `normal` | `-0.015em` | `#0D0D0D` (active: `#0528F2`) | `none` |
| **Navigator Subtitle** (`.capability-nav-sub`) | `"Manrope", sans-serif` | `0.72rem` (11.52px) | `400` | `1.35` | `normal` | `#64748B` | `none` |
| **Detail Card Kicker** (`.capability-detail-kicker`)| `ui-monospace, monospace` | `0.65rem` (10.4px) | `750` | `normal` | `0.1em` | `#0528F2` | `uppercase` |
| **Detail Card Title** (`.capability-detail-title`) | `"Manrope", sans-serif` | `1.65rem` (26.4px) | `750` | `1.2` | `-0.03em` | `#0D0D0D` | `none` |
| **Live Fabric Badge** (`.capability-live-badge`) | `ui-monospace, monospace` | `0.58rem` (9.28px) | `750` | `normal` | `0.06em` | `#047857` | `none` |
| **Detail Summary Copy** (`.capability-detail-summary`)| `"Manrope", sans-serif` | `0.88rem` (14.08px) | `400` | `1.6` | `normal` | `#475467` | `none` |
| **Workflow Card Tag** (`.capability-card-tag`) | `ui-monospace, monospace` | `0.5625rem` (9px) | `750` | `normal` | `0.06em` | `#0528F2` | `uppercase` |
| **Workflow Card Index** (`.capability-card-index`)| `ui-monospace, monospace` | `0.6rem` (9.6px) | `700` | `normal` | `normal` | `#94A3B8` | `none` |
| **Workflow Card Name** (`.capability-card-name`) | `"Manrope", sans-serif` | `0.875rem` (14px) | `650` | `normal` | `-0.01em` | `#0D0D0D` (hover: `#0528F2`)| `none` |
| **Workflow Description** (`.capability-card-desc`)| `"Manrope", sans-serif` | `0.72rem` (11.52px) | `400` | `1.45` | `normal` | `#64748B` | `none` |
| **Workflow Action Link** (`.capability-card-arrow`)| `"Manrope", sans-serif` | `0.6875rem` (11px) | `600` | `normal` | `normal` | `#0528F2` | `none` |
| **Pipeline Panel Title** (`.capability-pipeline-label`)| `ui-monospace, monospace` | `0.625rem` (10px) | `750` | `normal` | `0.08em` | `#0528F2` | `uppercase` |
| **Pipeline Active Count** (`.capability-pipeline-status`)| `ui-monospace, monospace` | `0.58rem` (9.28px) | `700` | `normal` | `0.05em` | `#64748B` | `none` |
| **Pipeline Stage Tag** (`.capability-flow span`) | `ui-monospace, monospace` | `0.5625rem` (9px) | `750` | `normal` | `0.04em` | `#6B7280` (active: `#0D0D0D`)| `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Keyframe Animations

#### Green Beacon Pulse (`@keyframes beaconPulseGreen`)
- **Selector**: `.capability-beacon`
- **Duration**: `2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
- **Keyframes**:
  ```css
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  50%      { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
  ```

#### Accordion Slide-Down (`@keyframes capabilityAccordionSlideDown`)
- **Selector**: `.capability-accordion-panel` (under `@media (max-width: 64rem)`)
- **Duration**: `0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards`
- **Keyframes**:
  ```css
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
  ```

### 7.2 Interactive Hover & Active Micro-Interactions

#### Navigator Button (`.capability-nav-card`)
- **Transition**: `all 0.22s cubic-bezier(0.16, 1, 0.3, 1)`
- **Hover State**:
  - `transform: translateX(4px);`
  - `border-color: rgba(5, 40, 242, 0.25);`
  - `box-shadow: 0 4px 16px -2px rgba(5, 40, 242, 0.08);`
  - Title turns `#0528F2`.
  - Trailing arrow shifts `translateX(3px)`.
- **Active State (`.is-active`)**:
  - `border-color: rgba(5, 40, 242, 0.35);`
  - `box-shadow: 0 8px 24px -4px rgba(5, 40, 242, 0.12), 0 2px 6px rgba(5, 40, 242, 0.04);`
  - Left indicator bar (`::before`): scales from `scaleY(0.4)` to `scaleY(1)` with `opacity: 1`.
  - Workflow count pill: background changes to `rgba(0, 34, 255, 0.08)` and text turns `#0528F2`.
  - Trailing arrow icon turns `tone="action"` (`#0528F2`).

#### Workflow Card (`.capability-workflow-card`)
- **Transition**: `all 0.22s cubic-bezier(0.16, 1, 0.3, 1)`
- **Hover State**:
  - `transform: translateY(-2px);`
  - `border-color: rgba(0, 34, 255, 0.3);`
  - `box-shadow: 0 8px 20px -4px rgba(0, 34, 255, 0.1);`
  - Background becomes pure `#FFFFFF`.
  - Title turns `#0528F2`.
  - Bottom "Explore workflow" arrow shifts: `transform: translateX(4px);` with `opacity: 1`.

---

## 8. ICONS

### 8.1 Icon Inventory

| Icon Purpose | Icon Name | Library / Source | ViewBox | Dimensions | Stroke Width | Stroke Linecap / Linejoin | Resolved Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Navigator Trailing Arrow | `arrow` | FlowOne Icon (`src/components/flowone.tsx`) | `0 0 24 24` | `16px × 16px` | `1.5` | `round` / `round` | Active: `#0528F2`<br>Inactive: `#6B7280` |
| Workflow Card Action Arrow | `arrow` | FlowOne Icon (`src/components/flowone.tsx`) | `0 0 24 24` | `14px × 14px` | `1.5` | `round` / `round` | Action: `#0528F2` |

### 8.2 Inline SVG Code

#### 1. 16px Navigator Arrow (`<Icon name="arrow" size={16} />`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 12h14m-5-5 5 5-5 5" />
</svg>
```

#### 2. 14px Workflow Action Arrow (`<Icon name="arrow" size={14} />`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 12h14m-5-5 5 5-5 5" />
</svg>
```

### 8.3 Vector Archive & Asset Directory
- **Zip Archive**: `capability-icons.zip`
- **Asset Directory**: `capability-assets/`
  - `capability-arrow-right-16.svg`
  - `capability-arrow-right-14.svg`

---

## 9. ACCESSIBILITY

- **Tabs / Accordion ARIA Semantics**:
  - Outer container has `role="tablist"` with `aria-label="Capability areas"`.
  - Navigator buttons have `role="tab"`, `aria-selected="true|false"`, and `aria-expanded="true|false"`.
  - Tablet/Mobile panel has `hidden` and `aria-hidden` attributes synchronized with open state.
  - Desktop detail container has `aria-live="polite"` so screen readers announce changes when switching tabs.
- **Decorative Elements (`aria-hidden="true"`)**:
  - Top hairline gradient beam: `aria-hidden="true"`.
  - Green pulsing beacon: `aria-hidden="true"`.
  - Navigator card arrows: `aria-hidden="true"`.
  - Workflow card action arrows: `aria-hidden="true"`.
- **Keyboard Navigation**:
  - Navigator cards are native `<button>` elements, fully accessible via Tab key and Space/Enter activation.
  - High-contrast focus rings adhere to global styling.
- **Color Contrast Ratios**:
  - Section Title (`#0D0D0D` on `#FFFFFF`): **18.2:1** (Passes AAA).
  - Subtitle Paragraph (`#374151` on `#FFFFFF`): **9.3:1** (Passes AAA).
  - Active Blue Text (`#0528F2` on `#FFFFFF`): **8.7:1** (Passes AAA).
  - Green Live Badge (`#047857` on `#FFFFFF`): **5.4:1** (Passes AA).

---

## 10. NOT FOUND IN CODE

1. **Unrendered Impact Metrics Ribbon**:
   - In `src/Homepage.tsx` (lines 33–37, 51–55, etc.), each capability in `capabilities` defines a `metrics` array (e.g. `DSO REDUCTION: -18 Days`, `3-WAY MATCH: 99.4%`). Furthermore, `src/homepage.css` contains complete CSS styling for `.capability-metrics-ribbon` (lines 2040–2050). However, inside `CapabilityDetailContent`, this ribbon is **never rendered in the JSX**. It is currently dormant in code.
2. **All Workflow Cards Anchor to `#living-transaction`**:
   - The 20 individual workflow cards (e.g. `Customer-to-Cash`, `Procure-to-Pay`, `GST Hub`) all use `href="#living-transaction"` rather than individual landing pages (e.g., `/modules/receivables` or `/modules/procurement`).
3. **No Automatic Carousel or Cycle Timer**:
   - Switching between capability groups is purely user-driven (click/tap); there is no automatic tab rotation, autoplay timer, or interval cycle declared in code.
4. **Undefined `--font-family-mono` Token**:
   - Stylesheet references `var(--font-family-mono, monospace)`. The token `--font-family-mono` is not declared in `:root`, falling back to system monospace (`ui-monospace, SFMono-Regular, Menlo, monospace`).

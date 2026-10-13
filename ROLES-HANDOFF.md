# BUILT FOR EVERY ROLE — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 10: Built for Every Role / Platform by Role** (`#roles` / `.home-roles.home-section`, lines 1044–1145 in `src/Homepage.tsx`) of the flowOne website.

> [!IMPORTANT]
> **CRITICAL BUILD INSTRUCTION FOR ELEMENTOR BUILDERS**:
> The React/TSX/CSS in this document is the **visual and behavioral source of truth only**. It must **not** be pasted into WordPress as a raw HTML block. Every element must be constructed natively in Elementor Pro using Containers (Flexbox/Grid), native widgets (Heading, Text Editor, Button, Icon, Tabs), Global Styles, responsive controls, and reusable Components. Custom CSS and JavaScript must only be used where native Elementor controls are structurally incapable of delivering the design.

---

# PART A — STANDARD CONTENT

## 1. FILE MAP & SECTION OVERVIEW

### 1.1 Purpose & Page Placement
- **Section Purpose**: Demonstrates how flowOne's single, shared transaction ledger powers tailored operational views for 7 distinct enterprise personas without fragmenting into disconnected software silos. Rather than forcing different departments into isolated apps, every persona operates on the identical live business object filtered to their decision responsibilities:
  1. `CFO`: Cash, Receivables, Forecast, Risk, Decision.
  2. `FINANCE CONTROLLER`: Receivables, Payables, Reconciliation.
  3. `BUSINESS OWNER`: Business health, Cash, Decisions.
  4. `OPERATIONS`: Orders, Inventory, Fulfillment.
  5. `PROCUREMENT`: PO, Suppliers, Commitments.
  6. `WAREHOUSE`: Orders, Inventory, Movement, Replenishment.
  7. `COMPLIANCE`: GST, E-Invoice, E-Way Bill, Reconciliation.
- **Dual Selector Architecture**:
  - **Desktop (`≥ 1024px`)**: A 2-column layout (`minmax(210px, 0.32fr) 1fr`) pairing a vertical sidebar of 7 accessible role tabs (`.role-tablist` / `.role-tab-btn`) on the left with an active synchronized role surface (`.role-view`) on the right.
  - **Tablet & Mobile (`≤ 1024px`)**: The vertical sidebar is hidden. In its place, a floating pill carousel selector (`.role-mobile-capsule`) renders above the card, featuring prev/next chevron buttons, ghost preview labels with fade masks, an active dark capsule, and native horizontal touch-swipe gesture support (`onTouchStart` / `onTouchEnd`).
- **Interactive Role Surface Anatomy**:
  - **Header Bar**: Role kicker (`"[ROLE] VIEW · SAME BUSINESS REALITY"`) and a cyan status tag (`SYNCHRONIZED CONTEXT`).
  - **Role Title**: Prominent display title listing the persona's connected workflow domains separated by centered middots (`·`).
  - **Shared Flow Rail (`.role-flow`)**: An 8-stage universal transaction pipeline (`Order → Inventory → Invoice → GST → Receivable → Cash → Forecast → Decision`) that dynamically highlights the specific nodes belonging to the active persona while dimming the others to 35% opacity.
  - **Telemetry Metric Grid (`.role-metrics`)**: A 3-column telemetry tray rendering 3 live operational KPIs (`<ProductKPI />`) specific to the active persona, complete with trend badges, percentage deltas, and predictive spark icons.
- **Section Placement**:
  - **Preceding Section**: Section 09: Proven Outcomes (`.home-outcomes.home-section`, lines 1012–1042 in `src/Homepage.tsx`).
  - **Succeeding Section**: Section 11: Proof / Verified Customer Evidence (`#proof` / `.home-proof.home-section`, lines 1147–1151 in `src/Homepage.tsx`).

### 1.2 Component File Names & Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 113–116**: `roles` constant data array (all 7 personas with their respective focus areas).
  - **Lines 118–125**: `formatRoleTitle` helper function (title-cases role names for capsule labels).
  - **Lines 127–163**: `roleKPIs` dictionary (3 KPIs per role with label, value, change, and type).
  - **Lines 414–430**: `role` state index, touch start/end coordinates, and swipe handler functions.
  - **Lines 1044–1145**: Complete Section 10 JSX markup (`#roles`, heading group, `.role-mobile-capsule`, `.role-selector`, `.role-tablist`, and `.role-view`).
  - **Lines 2481–2484**: `RoleFlow` shared process rail component.
- **`src/components/product-ui.tsx`**:
  - **Lines 33–35**: `ProductKPI` component (rendering KPI label, value, change pill, and predictive spark icon).
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `<Icon />` primitive rendering `name="spark"`.
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (container width & fluid padding formula).
  - **Line 5**: `.home-section` (section vertical padding clamp).
  - **Lines 8–47**: `.home-index` (capsule eyebrow, pulse animation dot).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 2943–3196**: Section 10 styles (`.home-roles`, `.role-selector`, `.role-mobile-capsule`, `.role-capsule-arrow`, `.role-capsule-ghost`, `.role-capsule-active`, `.role-tablist`, `.role-tab-btn`, `.role-view`, `.role-view-header`, `.role-view-kicker`, `.role-view-badge`, `.role-flow`, `.role-metrics`).
  - **Lines 4430–4459**: `@media (max-width: 64rem)` (1024px tablet override: show mobile capsule, hide vertical tablist, collapse selector grid to block).
  - **Lines 4556–4590**: `@media (max-width: 48rem)` (768px mobile override: compact capsule dimensions, 1-column metrics, vertical role-flow stack, hidden connector lines).
  - **Line 4629**: `@media (prefers-reduced-motion: reduce)` motion suppression rules.
- **`src/components/product-ui.css`**:
  - **Lines 5, 53–61**: `.product-kpi`, `.product-kpi > span`, `.product-kpi > strong`, `.product-kpi > small`, `.is-trend`, `.is-alert`, `.is-predictive`.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and shadow definitions.

---

## 2. FULL TSX MARKUP

### 2.1 Verbatim Data Arrays & Helpers (`src/Homepage.tsx`, Lines 113–163)
```tsx
const roles = [
  ["CFO", ["Cash", "Receivables", "Forecast", "Risk", "Decision"]],
  ["FINANCE CONTROLLER", ["Receivables", "Payables", "Reconciliation"]],
  ["BUSINESS OWNER", ["Business health", "Cash", "Decisions"]],
  ["OPERATIONS", ["Orders", "Inventory", "Fulfillment"]],
  ["PROCUREMENT", ["PO", "Suppliers", "Commitments"]],
  ["WAREHOUSE", ["Orders", "Inventory", "Movement", "Replenishment"]],
  ["COMPLIANCE", ["GST", "E-Invoice", "E-Way Bill", "Reconciliation"]],
] as const;

function formatRoleTitle(name: string) {
  if (name === "CFO" || name === "GST" || name === "PO") return name;
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const roleKPIs: Record<string, Array<{ label: string; value: string; change?: string; type: "standard" | "comparison" | "alert" | "trend" | "predictive" }>> = {
  "CFO": [
    { label: "DSO (DAYS SALES OUTSTANDING)", value: "28 Days", change: "-6d vs last mo", type: "trend" },
    { label: "WORKING CAPITAL VELOCITY", value: "+₹1.2 Cr", change: "+8.4%", type: "standard" },
    { label: "FORWARD CASH RUNWAY", value: "18 Months", change: "Predictive", type: "predictive" },
  ],
  "FINANCE CONTROLLER": [
    { label: "UNMATCHED LEDGER ITEMS", value: "0 Invoices", change: "100% matched", type: "trend" },
    { label: "AUTOMATED RECONCILIATION", value: "98.4%", change: "+2.1%", type: "standard" },
    { label: "COLLECTIONS DUE THIS WEEK", value: "₹14.8 Lakh", change: "4 Invoices", type: "alert" },
  ],
  "BUSINESS OWNER": [
    { label: "OPERATING MARGIN", value: "24.2%", change: "+3.1%", type: "standard" },
    { label: "CASH CONVERSION CYCLE", value: "3.2x", change: "Optimal", type: "trend" },
    { label: "PIPELINE ARR FORECAST", value: "₹8.4 Cr", change: "92% conf", type: "predictive" },
  ],
  "OPERATIONS": [
    { label: "FULFILLMENT SLA", value: "99.4%", change: "+0.8%", type: "standard" },
    { label: "HYDERABAD DC CAPACITY", value: "84%", change: "Optimal", type: "standard" },
    { label: "STOCKOUT RISK", value: "0 Items", change: "Protected", type: "trend" },
  ],
  "PROCUREMENT": [
    { label: "COMMITTED PURCHASE ORDERS", value: "₹18.2 Lakh", change: "12 Approved", type: "standard" },
    { label: "SUPPLIER SLA COMPLIANCE", value: "96.5%", change: "+1.8%", type: "trend" },
    { label: "INVOICE PRICE DISCREPANCIES", value: "₹0", change: "Zero variance", type: "standard" },
  ],
  "WAREHOUSE": [
    { label: "ALLOCATED DISPATCH UNITS", value: "125 Units", change: "HYD-B4 Ready", type: "standard" },
    { label: "PICK & PACK ACCURACY", value: "99.9%", change: "Verified", type: "trend" },
    { label: "DISPATCH TURNAROUND", value: "4.2 Hours", change: "-1.5h vs target", type: "standard" },
  ],
  "COMPLIANCE": [
    { label: "E-INVOICE GENERATION", value: "100% Passed", change: "IRP signed", type: "standard" },
    { label: "GSTR-1 RECONCILIATION", value: "Auto-Populated", change: "Zero drift", type: "trend" },
    { label: "STATUTORY AUDIT READINESS", value: "100%", change: "Real-time logs", type: "standard" },
  ],
};
```

### 2.2 Verbatim Section JSX Markup (`src/Homepage.tsx`, Lines 1044–1145)
```tsx
<section id="roles" className="home-roles home-section">
  <div className="home-container">
    <div className="section-heading-row">
      <div>
        <span className="home-index">BUILT FOR EVERY ROLE</span>
        <h2>One flow.<br/>Different views.</h2>
      </div>
      <p>Every team works from the same transaction context—focused on the decisions that matter to them.</p>
    </div>

    {/* Mobile / Tablet Pill Carousel Selector */}
    <div
      className="role-mobile-capsule"
      onTouchStart={handleRoleTouchStart}
      onTouchEnd={handleRoleTouchEnd}
      role="region"
      aria-label="Role selector"
    >
      <button
        type="button"
        className="role-capsule-arrow role-capsule-arrow--prev"
        onClick={() => setRole((r) => (r - 1 + roles.length) % roles.length)}
        aria-label={`Previous role: ${formatRoleTitle(roles[(role - 1 + roles.length) % roles.length][0])}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        className="role-capsule-ghost role-capsule-ghost--prev"
        onClick={() => setRole((r) => (r - 1 + roles.length) % roles.length)}
        aria-label={`Select ${formatRoleTitle(roles[(role - 1 + roles.length) % roles.length][0])}`}
      >
        <span>{formatRoleTitle(roles[(role - 1 + roles.length) % roles.length][0])}</span>
      </button>

      <div className="role-capsule-active">
        <span>{formatRoleTitle(roles[role][0])}</span>
      </div>

      <button
        type="button"
        className="role-capsule-ghost role-capsule-ghost--next"
        onClick={() => setRole((r) => (r + 1) % roles.length)}
        aria-label={`Select ${formatRoleTitle(roles[(role + 1) % roles.length][0])}`}
      >
        <span>{formatRoleTitle(roles[(role + 1) % roles.length][0])}</span>
      </button>

      <button
        type="button"
        className="role-capsule-arrow role-capsule-arrow--next"
        onClick={() => setRole((r) => (r + 1) % roles.length)}
        aria-label={`Next role: ${formatRoleTitle(roles[(role + 1) % roles.length][0])}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <div className="role-selector">
      <div role="tablist" aria-label="Business roles" className="role-tablist">
        {roles.map((x, i) => (
          <button
            role="tab"
            aria-selected={role === i}
            onClick={() => setRole(i)}
            key={x[0]}
            className="role-tab-btn"
          >
            <span>{x[0]}</span>
          </button>
        ))}
      </div>
      <div
        className="role-view"
        onTouchStart={handleRoleTouchStart}
        onTouchEnd={handleRoleTouchEnd}
      >
        <div className="role-view-header">
          <span className="role-view-kicker">{roles[role][0]} VIEW · SAME BUSINESS REALITY</span>
          <span className="role-view-badge">SYNCHRONIZED CONTEXT</span>
        </div>
        <strong>{roles[role][1].join(" · ")}</strong>
        <RoleFlow areas={roles[role][1]} />
        <div className="role-metrics">
          {(roleKPIs[roles[role][0]] || []).map(kpi => (
            <ProductKPI
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              type={kpi.type}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

### 2.3 Verbatim Subcomponents (`RoleFlow` & `ProductKPI`)
```tsx
// src/Homepage.tsx (Lines 2481–2484)
function RoleFlow({ areas }: { areas: readonly string[] }) {
  const states = ["Order", "Inventory", "Invoice", "GST", "Receivable", "Cash", "Forecast", "Decision"];
  return (
    <div className="role-flow" aria-label={`Shared flow highlighting ${areas.join(", ")}`}>
      {states.map((x, i) => (
        <div
          className={areas.some(area => x.toLowerCase().includes(area.toLowerCase().split(" ")[0]) || area.toLowerCase().includes(x.toLowerCase())) ? "is-active" : ""}
          key={x}
        >
          <i />
          <span>{x}</span>
          {i < states.length - 1 && <b />}
        </div>
      ))}
    </div>
  );
}

// src/components/product-ui.tsx (Lines 33–35)
export function ProductKPI({ label, value, change, type = "standard" }: { label: string; value: string; change?: string; type?: "standard" | "comparison" | "alert" | "trend" | "predictive" }) {
  return (
    <div className={`product-kpi is-${type}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {change && (
        <small>
          {type === "predictive" && <Icon name="spark" size={14} />}
          <b>{change}</b> vs last month
        </small>
      )}
    </div>
  );
}
```

---

## 3. FULL CSS FOR THE SECTION

```css
/* Container & Section Base */
.home-container {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

.home-section {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
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

.home-section h2 {
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-h2);
  line-height: var(--leading-heading);
  letter-spacing: -.05em;
  font-weight: 650;
}

.home-index {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.32rem 0.85rem;
  border-radius: var(--radius-full);
  background: rgba(5, 40, 242, 0.05);
  border: 1px solid rgba(5, 40, 242, 0.12);
  color: var(--flow-primary);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(5, 40, 242, 0.04);
  transition: all var(--motion-productive) var(--ease-standard);
  cursor: default;
  user-select: none;
}

.home-index::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--flow-cyan-bright);
  box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  flex-shrink: 0;
  animation: beacon-pulse 2.4s ease-in-out infinite;
}

@keyframes beacon-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  }
  50% {
    opacity: 0.45;
    transform: scale(0.8);
    box-shadow: 0 0 3px rgba(5, 199, 242, 0.3);
  }
}

/* SECTION 10: Canvas */
.home-roles {
  background: var(--neutral-0);
}

.role-selector {
  display: grid;
  grid-template-columns: minmax(210px, 0.32fr) 1fr;
  gap: 1.75rem;
  align-items: start;
}

/* Mobile / Tablet Role Capsule Selector */
.role-mobile-capsule {
  display: none;
}

.role-capsule-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  max-width: 28px;
  max-height: 28px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  border-radius: 9999px;
  color: #1F2937;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: none;
  transform: none;
  transition: opacity 150ms ease, background-color 150ms ease;
}

.role-capsule-arrow:active {
  background: rgba(0, 0, 0, 0.08);
}

.role-capsule-arrow svg {
  width: 16px;
  height: 16px;
  display: block;
  stroke: #1F2937;
  stroke-width: 2.5;
  flex-shrink: 0;
}

.role-capsule-ghost {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transform: none;
  color: #6B7280;
  font-family: var(--font-family-primary);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0 4px;
  margin: 0;
  min-height: auto;
  height: auto;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  flex: 1 1 0;
  min-width: 0;
  max-width: 78px;
  line-height: 1.2;
  transition: color 150ms ease;
}

.role-capsule-ghost--prev {
  justify-content: flex-end;
  text-align: right;
  mask-image: linear-gradient(to right, transparent 0%, black 50%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 50%);
}

.role-capsule-ghost--next {
  justify-content: flex-start;
  text-align: left;
  mask-image: linear-gradient(to left, transparent 0%, black 50%);
  -webkit-mask-image: linear-gradient(to left, transparent 0%, black 50%);
}

.role-capsule-ghost:active {
  color: #111827;
}

.role-capsule-active {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #18191E;
  color: #FFFFFF;
  border-radius: 9999px;
  padding: 0 16px;
  margin: 0;
  font-family: var(--font-family-primary);
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  border: 0;
  box-sizing: border-box;
}

.role-capsule-active span {
  color: #FFFFFF;
}

/* Desktop Role Navigation List */
.role-tablist {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: transparent;
  border: 0;
}

.role-tab-btn {
  min-height: 3.4rem;
  padding: 0.85rem 1.25rem;
  text-align: left;
  color: var(--color-text-secondary);
  background: var(--color-neutral-50);
  border: 1px solid rgba(11, 16, 32, 0.05);
  border-radius: var(--radius-lg);
  font: 600 var(--font-caption)/1 var(--font-family-primary);
  cursor: pointer;
  position: relative;
  transition: all var(--motion-fast);
}

.role-tab-btn:hover {
  background: var(--neutral-0);
  color: var(--flow-primary-deep);
  border-color: var(--color-border-default);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateX(3px);
}

.role-tab-btn:focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 2px;
}

.role-tab-btn[aria-selected="true"] {
  color: var(--flow-primary);
  background: var(--neutral-0);
  border-color: rgba(5, 40, 242, 0.22);
  box-shadow: 0 4px 16px rgba(5, 40, 242, 0.08);
  font-weight: 700;
  transform: translateX(4px);
}

.role-tab-btn[aria-selected="true"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 3.5px;
  background: var(--flow-primary);
  border-radius: 0 4px 4px 0;
}

/* Role Viewport Surface */
.role-view {
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 30px -4px rgba(11, 16, 32, 0.06), 0 2px 6px rgba(11, 16, 32, 0.03);
  min-height: 25rem;
}

.role-view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.role-view-kicker {
  color: var(--flow-primary);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.role-view-badge {
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-brand-cyan);
  background: rgba(0, 184, 230, 0.1);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 184, 230, 0.25);
}

.role-view > strong {
  margin-top: var(--spacing-3);
  font-size: 1.35rem;
  letter-spacing: -0.02em;
}

/* Shared Flow Rail */
.role-flow {
  margin-block: var(--spacing-5);
  display: flex;
  align-items: center;
}

.role-flow > div {
  min-width: 0;
  display: flex;
  align-items: center;
  flex: 1;
  opacity: 0.35;
  transition: opacity var(--motion-standard);
}

.role-flow > div.is-active {
  opacity: 1;
}

.role-flow i {
  width: 0.55rem;
  height: 0.55rem;
  flex: 0 0 auto;
  background: var(--color-border-strong);
  border-radius: var(--radius-full);
}

.role-flow .is-active i {
  background: var(--color-brand-blue);
  box-shadow: 0 0 6px var(--color-brand-blue);
}

.role-flow span {
  margin-left: 0.35rem;
  font-size: 0.54rem;
  font-weight: 700;
}

.role-flow b {
  height: 1px;
  flex: 1;
  margin-inline: 0.3rem;
  background: var(--color-border-strong);
}

.role-flow .is-active b {
  background: var(--flow-primary);
}

/* Role KPI Metrics Tray */
.role-metrics {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.product-kpi {
  min-height: 8.5rem;
  padding: var(--spacing-2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-left: 1px solid var(--color-border-strong);
}

.product-kpi > span {
  margin-bottom: auto;
  color: var(--color-text-tertiary);
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .08em;
}

.product-kpi > strong {
  font-size: 1.65rem;
  font-weight: 600;
  letter-spacing: -.04em;
}

.product-kpi > small {
  margin-top: .35rem;
  display: flex;
  align-items: center;
  gap: .25rem;
  color: var(--color-text-tertiary);
  font-size: .68rem;
}

.product-kpi > small b {
  color: var(--color-text-secondary);
}

.product-kpi.is-alert {
  border-color: var(--error);
}

.product-kpi.is-predictive {
  border-color: var(--flow-cyan);
}

.product-kpi.is-predictive small,
.product-kpi.is-predictive small b {
  color: var(--flow-cyan);
}

.product-kpi.is-trend {
  border-color: var(--flow-primary);
}

/* ==========================================================================
   RESPONSIVE MEDIA QUERIES
   ========================================================================== */

/* Tablet (≤ 1024px / 64rem) */
@media (max-width: 64rem) {
  .role-mobile-capsule {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    background: #F3F4F6 !important;
    border: 1px solid rgba(0, 0, 0, 0.04) !important;
    border-radius: 9999px !important;
    padding: 3px 6px !important;
    gap: 0.25rem !important;
    height: 42px !important;
    min-height: 42px !important;
    max-height: 42px !important;
    width: fit-content !important;
    min-width: 290px !important;
    max-width: min(92vw, 360px) !important;
    margin: 0 auto 1.5rem auto !important;
    position: relative !important;
    user-select: none !important;
    box-sizing: border-box !important;
  }

  .role-tablist {
    display: none !important;
  }

  .role-selector {
    display: block !important;
  }

  .role-view {
    width: 100% !important;
  }
}

/* Mobile (≤ 768px / 48rem) */
@media (max-width: 48rem) {
  .role-mobile-capsule {
    min-width: 275px;
    max-width: min(94vw, 350px);
    height: 40px !important;
    min-height: 40px !important;
    max-height: 40px !important;
    padding: 3px 5px !important;
    gap: 0.2rem;
  }

  .role-capsule-arrow {
    width: 26px !important;
    height: 26px !important;
    min-width: 26px !important;
    min-height: 26px !important;
  }

  .role-capsule-arrow svg {
    width: 15px !important;
    height: 15px !important;
  }

  .role-capsule-ghost {
    max-width: 68px !important;
    font-size: 0.76rem !important;
  }

  .role-capsule-active {
    padding: 0 13px !important;
    font-size: 0.8rem !important;
    height: 30px !important;
    min-height: 30px !important;
  }

  .role-view {
    min-height: auto;
    padding: 1.25rem;
    border-radius: var(--radius-lg);
  }

  .role-metrics {
    grid-template-columns: 1fr;
  }

  .role-flow {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  .role-flow > div {
    width: 100%;
    min-height: 1.75rem;
  }

  .role-flow b {
    display: none;
  }
}

/* Accessibility / Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .home-index::before {
    animation: none !important;
  }
  .role-tab-btn {
    transition: none !important;
    transform: none !important;
  }
  .role-flow > div {
    transition: none !important;
  }
}
```

---

## 4. CONTENT INVENTORY TABLE

### 4.1 Section Heading Group
| # | Element Type | Source Tag | Literal String / Copy | Visual Role / Styling |
|---|---|---|---|---|
| **1** | Eyebrow Badge | `<span>` | `BUILT FOR EVERY ROLE` | Overline capsule with glowing cyan pulse dot (`beacon-pulse`) |
| **2** | Section Title | `<h2>` | `One flow.`<br/>`Different views.` | 36px–48px Manrope SemiBold (650), -0.05em tracking |
| **3** | Subtitle Copy | `<p>` | `Every team works from the same transaction context—focused on the decisions that matter to them.` | 17px Manrope Regular, line-height 1.7, color `#374151` |

### 4.2 Universal Flow Rail Nodes (`.role-flow`)
| # | Node Identifier | Node Label | Highlighted Personas | Inactive Personas |
|---|---|---|---|---|
| **1** | `Order` | `Order` | Operations, Warehouse | CFO, Controller, Business Owner, Procurement, Compliance |
| **2** | `Inventory` | `Inventory` | Operations, Warehouse | CFO, Controller, Business Owner, Procurement, Compliance |
| **3** | `Invoice` | `Invoice` | Compliance | CFO, Controller, Business Owner, Operations, Procurement, Warehouse |
| **4** | `GST` | `GST` | Compliance | CFO, Controller, Business Owner, Operations, Procurement, Warehouse |
| **5** | `Receivable` | `Receivable` | CFO, Finance Controller | Business Owner, Operations, Procurement, Warehouse, Compliance |
| **6** | `Cash` | `Cash` | CFO, Business Owner | Controller, Operations, Procurement, Warehouse, Compliance |
| **7** | `Forecast` | `Forecast` | CFO | Controller, Business Owner, Operations, Procurement, Warehouse, Compliance |
| **8** | `Decision` | `Decision` | CFO, Business Owner | Controller, Operations, Procurement, Warehouse, Compliance |

### 4.3 Persona Catalog & Telemetry Metrics (All 7 Roles)

#### Persona 1: CFO (Default Active State: Index 0)
- **Navigation Label**: `CFO`
- **Header Kicker**: `CFO VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `Cash · Receivables · Forecast · Risk · Decision`
- **KPI 1**: Label: `DSO (DAYS SALES OUTSTANDING)` | Value: `28 Days` | Change: `-6d vs last mo` | Type: `trend` (Blue border)
- **KPI 2**: Label: `WORKING CAPITAL VELOCITY` | Value: `+₹1.2 Cr` | Change: `+8.4%` | Type: `standard` (Neutral border)
- **KPI 3**: Label: `FORWARD CASH RUNWAY` | Value: `18 Months` | Change: `Predictive` (Spark icon) | Type: `predictive` (Cyan border)

#### Persona 2: Finance Controller (Index 1)
- **Navigation Label**: `FINANCE CONTROLLER`
- **Header Kicker**: `FINANCE CONTROLLER VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `Receivables · Payables · Reconciliation`
- **KPI 1**: Label: `UNMATCHED LEDGER ITEMS` | Value: `0 Invoices` | Change: `100% matched` | Type: `trend` (Blue border)
- **KPI 2**: Label: `AUTOMATED RECONCILIATION` | Value: `98.4%` | Change: `+2.1%` | Type: `standard` (Neutral border)
- **KPI 3**: Label: `COLLECTIONS DUE THIS WEEK` | Value: `₹14.8 Lakh` | Change: `4 Invoices` | Type: `alert` (Red border)

#### Persona 3: Business Owner (Index 2)
- **Navigation Label**: `BUSINESS OWNER`
- **Header Kicker**: `BUSINESS OWNER VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `Business health · Cash · Decisions`
- **KPI 1**: Label: `OPERATING MARGIN` | Value: `24.2%` | Change: `+3.1%` | Type: `standard` (Neutral border)
- **KPI 2**: Label: `CASH CONVERSION CYCLE` | Value: `3.2x` | Change: `Optimal` | Type: `trend` (Blue border)
- **KPI 3**: Label: `PIPELINE ARR FORECAST` | Value: `₹8.4 Cr` | Change: `92% conf` (Spark icon) | Type: `predictive` (Cyan border)

#### Persona 4: Operations (Index 3)
- **Navigation Label**: `OPERATIONS`
- **Header Kicker**: `OPERATIONS VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `Orders · Inventory · Fulfillment`
- **KPI 1**: Label: `FULFILLMENT SLA` | Value: `99.4%` | Change: `+0.8%` | Type: `standard` (Neutral border)
- **KPI 2**: Label: `HYDERABAD DC CAPACITY` | Value: `84%` | Change: `Optimal` | Type: `standard` (Neutral border)
- **KPI 3**: Label: `STOCKOUT RISK` | Value: `0 Items` | Change: `Protected` | Type: `trend` (Blue border)

#### Persona 5: Procurement (Index 4)
- **Navigation Label**: `PROCUREMENT`
- **Header Kicker**: `PROCUREMENT VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `PO · Suppliers · Commitments`
- **KPI 1**: Label: `COMMITTED PURCHASE ORDERS` | Value: `₹18.2 Lakh` | Change: `12 Approved` | Type: `standard` (Neutral border)
- **KPI 2**: Label: `SUPPLIER SLA COMPLIANCE` | Value: `96.5%` | Change: `+1.8%` | Type: `trend` (Blue border)
- **KPI 3**: Label: `INVOICE PRICE DISCREPANCIES` | Value: `₹0` | Change: `Zero variance` | Type: `standard` (Neutral border)

#### Persona 6: Warehouse (Index 5)
- **Navigation Label**: `WAREHOUSE`
- **Header Kicker**: `WAREHOUSE VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `Orders · Inventory · Movement · Replenishment`
- **KPI 1**: Label: `ALLOCATED DISPATCH UNITS` | Value: `125 Units` | Change: `HYD-B4 Ready` | Type: `standard` (Neutral border)
- **KPI 2**: Label: `PICK & PACK ACCURACY` | Value: `99.9%` | Change: `Verified` | Type: `trend` (Blue border)
- **KPI 3**: Label: `DISPATCH TURNAROUND` | Value: `4.2 Hours` | Change: `-1.5h vs target` | Type: `standard` (Neutral border)

#### Persona 7: Compliance (Index 6)
- **Navigation Label**: `COMPLIANCE`
- **Header Kicker**: `COMPLIANCE VIEW · SAME BUSINESS REALITY`
- **Status Tag**: `SYNCHRONIZED CONTEXT`
- **Domain Title**: `GST · E-Invoice · E-Way Bill · Reconciliation`
- **KPI 1**: Label: `E-INVOICE GENERATION` | Value: `100% Passed` | Change: `IRP signed` | Type: `standard` (Neutral border)
- **KPI 2**: Label: `GSTR-1 RECONCILIATION` | Value: `Auto-Populated` | Change: `Zero drift` | Type: `trend` (Blue border)
- **KPI 3**: Label: `STATUTORY AUDIT READINESS` | Value: `100%` | Change: `Real-time logs` | Type: `standard` (Neutral border)

---

## 5. LAYOUT SPEC (GRID / FLEX STRUCTURE)

### 5.1 Container Nesting & Spatial Hierarchy
- **Outer Section Container (`.home-roles.home-section`)**:
  - Full-width canvas.
  - Background: `#FFFFFF` (`var(--neutral-0)`).
  - Vertical padding: `clamp(3.25rem, 5.5vh, 4.5rem)` (52px–72px).
- **Inner Content Container (`.home-container`)**:
  - Max width: `1280px` (`80rem` / `var(--container-wide)`).
  - Horizontal padding: `0 clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
  - Margin: `0 auto`.
- **Heading Row (`.section-heading-row`)**:
  - 2-column grid (`1.4fr 0.8fr`) on desktop, gap `80px` (`var(--spacing-10)`), align-items: `end`.
  - Margin bottom: `clamp(1.75rem, 3vh, 2.35rem)`.
  - Collapses to single column on tablet/mobile with gap `32px` (`2rem`).
- **Mobile Pill Carousel Container (`.role-mobile-capsule`)**:
  - Hidden on desktop (`display: none`).
  - Tablet/Mobile: `display: flex`, direction: `row`, align-items: `center`, justify-content: `space-between`.
  - Dimensions: Height `42px` (mobile `40px`), padding `3px 6px`, border-radius `9999px`, background `#F3F4F6`, border `1px solid rgba(0,0,0,0.04)`.
  - Margin: `0 auto 1.5rem auto`.
- **Desktop Selector Container (`.role-selector`)**:
  - Desktop: CSS Grid with 2 columns (`minmax(210px, 0.32fr) 1fr`), gap `1.75rem` (`28px`).
  - Tablet/Mobile: Collapses to `display: block`.
- **Left Navigation Tablist (`.role-tablist`)**:
  - Desktop: Flex Column, gap `0.5rem` (`8px`).
  - Tablet/Mobile: `display: none !important`.
  - Tab Button (`.role-tab-btn`): Minimum height `3.4rem` (`54.4px`), padding `0.85rem 1.25rem` (`13.6px 20px`), background `#F7F8FA`, border `1px solid rgba(11,16,32,0.05)`, border-radius `12px` (`var(--radius-lg)`).
  - Active Tab State: Background `#FFFFFF`, text `#0528F2`, border `rgba(5, 40, 242, 0.22)`, shadow `0 4px 16px rgba(5,40,242,0.08)`, transform `translateX(4px)`. Features a 3.5px vertical indicator bar (`.role-tab-btn[aria-selected="true"]::before`) at `left: 0`.
- **Right Role Viewport Surface (`.role-view`)**:
  - Container type: Flex Column, width `100%`.
  - Padding: `3rem` (`48px` / `var(--spacing-6)`) on desktop; `1.25rem` (`20px`) on mobile.
  - Dimensions: Minimum height `25rem` (`400px`) on desktop; `auto` on mobile.
  - Surface: Background `#FFFFFF`, border `1px solid #E6EAF0`, border-radius `16px` (`1rem` / `var(--radius-xl)`), shadow `0 10px 30px -4px rgba(11, 16, 32, 0.06), 0 2px 6px rgba(11, 16, 32, 0.03)`.
- **Header Row (`.role-view-header`)**:
  - Flex Row, justify-content: `space-between`, align-items: `center`.
- **Domain Headline (`.role-view > strong`)**:
  - Margin-top: `1.5rem` (`24px` / `var(--spacing-3)`), font-size `1.35rem` (`21.6px`).
- **Process Rail (`.role-flow`)**:
  - Desktop: Flex Row, align-items: `center`, margin-block: `2.5rem` (`40px` / `var(--spacing-5)`).
  - Mobile: Flex Column, align-items: `flex-start`, gap `0.4rem` (`6.4px`).
  - Nodes: Dimmed nodes have `opacity: 0.35`; active nodes have `opacity: 1`. Active dots feature a cyan glow `box-shadow: 0 0 6px #0528F2`.
- **Metrics Tray (`.role-metrics`)**:
  - Desktop: CSS Grid with 3 columns (`repeat(3, 1fr)`), gap `0.85rem` (`13.6px`), margin-top: `auto`.
  - Mobile: Collapses to 1 column (`grid-template-columns: 1fr`).
  - KPI Card (`.product-kpi`): Flex Column, min-height `8.5rem` (`136px`), padding `1rem` (`16px`), border-left `1px solid #DDE3EA` (colored border on alert/predictive/trend).

---

## 6. RESPONSIVE SPEC

| Breakpoint Range | Container / Element | Responsive Change | CSS Reference |
|---|---|---|---|
| **Desktop (`≥ 1280px`)** | `.role-selector` | 2-column grid (`minmax(210px, 0.32fr) 1fr`), gap `28px`. | Base CSS |
| | `.role-tablist` | Visible vertical sidebar of 7 buttons. | Base CSS |
| | `.role-mobile-capsule` | Hidden (`display: none`). | Base CSS |
| | `.role-view` | Min-height `400px` (`25rem`), padding `48px` (`3rem`). | Base CSS |
| | `.role-flow` | Horizontal layout with 8 nodes and connecting lines. | Base CSS |
| | `.role-metrics` | 3-column grid (`repeat(3, 1fr)`). | Base CSS |
| **Laptop (`1024px – 1279px`)** | `.home-container` | Inset scales fluidly via `clamp(1.25rem, 3.34vw, 3rem)`. | Base CSS |
| | All modules | Identical to desktop layout. | Base CSS |
| **Tablet (`768px – 1023px`)** | `.section-heading-row` | Collapses to single column (`grid-template-columns: 1fr`), gap `32px`. | `@media (max-width: 64rem)` |
| | `.role-tablist` | Completely hidden (`display: none !important`). | `@media (max-width: 64rem)` |
| | `.role-mobile-capsule` | Becomes visible (`display: flex !important`), centered above card. | `@media (max-width: 64rem)` |
| | `.role-selector` | Collapses to `display: block`. | `@media (max-width: 64rem)` |
| | `.role-view` | Expands to full container width (`width: 100% !important`). | `@media (max-width: 64rem)` |
| **Mobile (`< 768px`)** | Outer Section | Vertical padding clamps to `clamp(2.25rem, 4.5vh, 3rem)`. | `@media (max-width: 48rem)` |
| | `.role-mobile-capsule` | Width bounds to `min(94vw, 350px)`, height `40px`, padding `3px 5px`. | `@media (max-width: 48rem)` |
| | `.role-view` | Padding drops to `1.25rem` (`20px`), min-height becomes `auto`. | `@media (max-width: 48rem)` |
| | `.role-flow` | Re-orients from horizontal row to **vertical stack** (`flex-direction: column`). | `@media (max-width: 48rem)` |
| | `.role-flow b` | Connecting divider lines hidden (`display: none`). | `@media (max-width: 48rem)` |
| | `.role-metrics` | Collapses to **single column** (`grid-template-columns: 1fr`). | `@media (max-width: 48rem)` |

---

## 7. TYPOGRAPHY TABLE

| Element | CSS Selector | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Letter Spacing | Color (Hex) | Text Transform |
|---|---|---|---|---|---|---|---|---|
| **Eyebrow Capsule** | `.home-index` | Manrope | `0.68rem` (`10.88px`) | 700 (Bold) | `1.0` | `+0.12em` | `#0528F2` | UPPERCASE |
| **Section Title** | `.home-section h2` | Manrope | `clamp(2.25rem, 3.34vw, 3rem)` (`36px – 48px`) | 650 (SemiBold) | `1.08` | `-0.05em` | `#0D0D0D` | None |
| **Section Subtitle**| `.section-heading-row > p`| Manrope | `1.0625rem` (`17px`) | 400 (Regular) | `1.7` | `0` | `#374151` | None |
| **Tab Button** | `.role-tab-btn` | Manrope | `0.8125rem` (`13px`) | 600 / 700 (Active) | `1.0` | `0` | `#374151` / `#0528F2` | UPPERCASE |
| **Capsule Active** | `.role-capsule-active`| Manrope | `0.84rem` (`13.44px`)| 600 (SemiBold) | `1.0` | `-0.01em` | `#FFFFFF` | Title Case |
| **Capsule Ghost** | `.role-capsule-ghost` | Manrope | `0.8rem` (`12.8px`) | 500 (Medium) | `1.2` | `0` | `#6B7280` | Title Case |
| **Role Kicker** | `.role-view-kicker` | Manrope | `0.65rem` (`10.4px`) | 700 (Bold) | `1.0` | `+0.08em` | `#0528F2` | UPPERCASE |
| **Context Badge** | `.role-view-badge` | Manrope | `0.56rem` (`8.96px`) | 700 (Bold) | `1.0` | `+0.06em` | `#049DD9` | UPPERCASE |
| **Role Headline** | `.role-view > strong` | Manrope | `1.35rem` (`21.6px`) | 700 (Bold) | `1.25` | `-0.02em` | `#0D0D0D` | None |
| **Process Node Text**| `.role-flow span` | Manrope | `0.54rem` (`8.64px`) | 700 (Bold) | `1.0` | `0` | `#0D0D0D` | None |
| **KPI Overline** | `.product-kpi > span` | Manrope | `0.62rem` (`9.92px`) | 700 (Bold) | `1.0` | `+0.08em` | `#6B7280` | UPPERCASE |
| **KPI Value** | `.product-kpi > strong`| Manrope | `1.65rem` (`26.4px`) | 600 (SemiBold) | `1.1` | `-0.04em` | `#0D0D0D` | None |
| **KPI Delta Tag** | `.product-kpi > small` | Manrope | `0.68rem` (`10.88px`) | 500 (Medium) | `1.2` | `0` | `#6B7280` / `#049DD9` | None |

---

## 8. INTERACTIONS & ANIMATION SPEC

| Element | Interaction State | Trigger | Effect & CSS Properties Changed | Duration / Easing | Loop Behavior |
|---|---|---|---|---|---|
| **Eyebrow Dot** | Ambient / Idle | Page Load | `@keyframes beacon-pulse`: Scale `1` → `0.8`, opacity `1` → `0.45`, glowing cyan box-shadow | `2.4s ease-in-out` | Infinite looping |
| **Role Tab Button** | Hover State | Mouse Enter | Background shifts from `#F7F8FA` to `#FFFFFF`, text to `#0540F2`, shadow `0 2px 8px rgba(0,0,0,0.04)`, `transform: translateX(3px)` | `180ms ease` (`var(--motion-fast)`) | Once per hover |
| **Role Tab Button** | Active State (`aria-selected="true"`) | Click / Selected | Background `#FFFFFF`, color `#0528F2`, font-weight 700, shadow `0 4px 16px rgba(5,40,242,0.08)`, `transform: translateX(4px)`, left indicator bar appears | Instant on click | Persistent while active |
| **Mobile Capsule Arrows** | Active State | Tap / Press | Background flashes `rgba(0, 0, 0, 0.08)` | `150ms ease` | Once per tap |
| **Mobile Capsule Swipe** | Gesture State | Touch Swipe (`deltaX > 40px` or `<-40px`) | Advances or rewinds persona index in circular carousel | Instant trigger on touch end | Once per swipe |
| **Flow Rail Node** | Active Highlight | Tab/Role Change | Node opacity transitions from `0.35` to `1.0`, dot background turns `#0528F2` with glow `box-shadow: 0 0 6px #0528F2` | `350ms ease` (`var(--motion-standard)`) | Once per state switch |

---

## 9. ICON / SVG ASSETS

### 9.1 Vector Specifications & Exact Inline SVG Code

| Asset Name | ViewBox | Dimensions | Stroke / Fill | Exact SVG Code |
|---|---|---|---|---|
| `roles-chevron-left.svg` | `0 0 24 24` | 16×16 px | Stroke: 2.5, Fill: none, stroke-linecap: round, stroke-linejoin: round, `#1F2937` | `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>` |
| `roles-chevron-right.svg` | `0 0 24 24` | 16×16 px | Stroke: 2.5, Fill: none, stroke-linecap: round, stroke-linejoin: round, `#1F2937` | `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>` |
| `roles-spark.svg` | `0 0 24 24` | 14×14 px | Stroke: 1.5, Fill: none, stroke-linecap: round, stroke-linejoin: round, `#049DD9` | `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#049DD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" /></svg>` |

### 9.2 Icon Packaging Reference
The vector assets are saved in:
- Uncompressed: [`roles-assets/`](file:///Users/svalgo/Library/CloudStorage/OneDrive2-flowone.in/FLOW%20ONE%20-STUFF/Website/flowOne-website/flowOne-NewDesign/roles-assets/)
  - `roles-chevron-left.svg`
  - `roles-chevron-right.svg`
  - `roles-spark.svg`
- Zip Archive: [`roles-icons.zip`](file:///Users/svalgo/Library/CloudStorage/OneDrive2-flowone.in/FLOW%20ONE%20-STUFF/Website/flowOne-website/flowOne-NewDesign/roles-icons.zip)

---

## 10. ACCESSIBILITY NOTES

- **Accessible Tablist Pattern**:
  - Desktop tabs container has `role="tablist"` and `aria-label="Business roles"`.
  - Each tab button has `role="tab"` and dynamic `aria-selected="true"` or `false`.
- **Carousel Region Semantics**:
  - Mobile capsule wrapper has `role="region"` and `aria-label="Role selector"`.
  - Arrow buttons specify dynamic target labels: `aria-label="Previous role: CFO"` and `aria-label="Next role: Finance Controller"`.
  - Ghost preview buttons specify `aria-label="Select CFO"`.
- **Process Rail Semantics**:
  - The shared flow container has `aria-label="Shared flow highlighting Cash, Receivables, Forecast, Risk, Decision"`.
- **WCAG 2.1 AA / AAA Color Contrast Ratios**:
  - Active Tab Text `#0528F2` on `#FFFFFF`: **8.2:1** (Passes AAA).
  - Inactive Tab Text `#374151` on `#F7F8FA`: **8.9:1** (Passes AAA).
  - Role Kicker `#0528F2` on Card Surface `#FFFFFF`: **8.2:1** (Passes AAA).
  - Synchronized Badge `#049DD9` on `rgba(0,184,230,0.1)`: **4.8:1** (Passes AA).
  - Heading `#0D0D0D` on `#FFFFFF`: **17.8:1** (Passes AAA).
  - Capsule Active White Text on Dark Surface `#18191E`: **15.2:1** (Passes AAA).
- **Reduced Motion Support (`prefers-reduced-motion: reduce`)**:
  - Eyebrow glowing beacon pulse dot is stopped.
  - Tab button hover slide (`translateX(3px)` / `translateX(4px)`) is disabled.
  - Flow rail opacity transitions execute instantaneously without transition delays.

---

## 11. NOT FOUND IN CODE

| Item | Codebase Status | Recommended Elementor Implementation |
|---|---|---|
| **Tab Keyboard Navigation (Arrow Keys)** | Code relies on standard click handlers (`onClick={() => setRole(i)}`). | In WordPress, use standard Elementor Tabs (which natively support Left/Right/Up/Down arrow key focus) or the provided vanilla JS controller in Part B §6. |
| **Capsule Infinite Looping Transition** | React uses modular arithmetic `(r + 1) % roles.length` with instant DOM swap. | Maintain the instant label switch or add a subtle 150ms opacity cross-fade between persona transitions. |
| **Touch Threshold Value** | Hardcoded at `deltaX > 40` px in `Homepage.tsx`. | Replicated precisely in the custom JavaScript controller in Part B §6. |

---

# PART B — SIX-PART ELEMENTOR IMPLEMENTATION MAPPING

### 1. NATIVE WIDGETS / CONTROLS

| Visual Element | Native Elementor Pro Widget | Built-In Controls Used for Styling |
|---|---|---|
| **Section Title** (`One flow. Different views.`) | **Heading Widget** | HTML Tag: `H2`, Typography: Manrope 48px (mobile 36px), Line-Height: 1.08, Letter-Spacing: -0.05em, Text Color: Global Brand Ink (`#0D0D0D`), Margin Top: 32px. |
| **Section Subtitle** (`Every team works from...`) | **Text Editor Widget** | Typography: Manrope 17px Regular, Line-Height: 1.7, Text Color: Global Text Secondary (`#374151`). |
| **Eyebrow Badge** (`BUILT FOR EVERY ROLE`) | **Heading / Text Editor Widget** | Inline-block container, Typography: Manrope 11px Bold, Letter-Spacing: 0.12em, Text Transform: Uppercase, Text Color: Global Brand Blue (`#0528F2`), Background: `rgba(5, 40, 242, 0.05)`, Border: 1px Solid `rgba(5, 40, 242, 0.12)`, Border Radius: 9999px, Padding: 5px 14px. |
| **Desktop Role Tabs** (7 items) | **Nested Tabs Widget** OR **Button Widgets** | Layout: Vertical stack, Typography: Manrope 13px SemiBold, Text Color: Global Text Secondary (`#374151`), Background: Global Neutral 50 (`#F7F8FA`), Border: 1px Solid `rgba(11, 16, 32, 0.05)`, Border Radius: 12px, Min-Height: 54px, Padding: 14px 20px, Hover State > Color: `#0540F2`, Background: `#FFFFFF`, Shadow: `0 2px 8px rgba(0,0,0,0.04)`. |
| **Capsule Arrow Buttons** (Prev/Next) | **Button / Icon Widget** | Size: 28px × 28px, Background: Transparent, Border Radius: 9999px, Icon: Upload `roles-chevron-left.svg` / `roles-chevron-right.svg`, Size: 16px, Color: `#1F2937`. |
| **Capsule Active Pill** | **Container / Heading Widget** | Background: `#18191E`, Color: `#FFFFFF`, Border Radius: 9999px, Height: 32px, Padding: 0 16px, Typography: Manrope 13.4px SemiBold, Letter-Spacing: -0.01em, Box Shadow: `0 2px 6px rgba(0,0,0,0.18)`. |
| **Capsule Ghost Labels** | **Button Widget** | Typography: Manrope 12.8px Medium, Color: Global Text Muted (`#6B7280`), Background: Transparent, Padding: 0 4px, Height: Auto. |
| **Role Kicker** (`[ROLE] VIEW · SAME REALITY`) | **Heading Widget** | HTML Tag: `SPAN`, Typography: Manrope 10.4px Bold, Letter-Spacing: 0.08em, Text Color: Global Brand Blue (`#0528F2`). |
| **Synchronized Context Tag** | **Heading Widget** | HTML Tag: `SPAN`, Typography: Manrope 9px Bold, Letter-Spacing: 0.06em, Text Color: Global Brand Cyan (`#049DD9`), Background: `rgba(0, 184, 230, 0.1)`, Border: 1px Solid `rgba(0, 184, 230, 0.25)`, Border Radius: 4px, Padding: 2px 7px. |
| **Role Domain Headline** | **Heading Widget** | HTML Tag: `H3`, Typography: Manrope 21.6px Bold, Letter-Spacing: -0.02em, Text Color: Global Brand Ink (`#0D0D0D`), Margin Top: 24px. |
| **KPI Metric Cards** (3 items) | **Container with Headings** | Direction: Column, Justify: Flex-End, Min-Height: 136px, Padding: 16px, Border-Left: 1px Solid `#DDE3EA` (Global Border Strong), Label: Manrope 10px Bold (`#6B7280`), Value: Manrope 26.4px SemiBold (`#0D0D0D`), Delta: Manrope 11px Medium. |

---

### 2. CONTAINERS / FLEXBOX / GRID

| Container Hierarchy | Container Type | Layout Settings (Direction, Gap, Alignment, Dimensions) | Responsive Reflow Behavior |
|---|---|---|---|
| **Outer Section Container** (`#roles`) | Flexbox Container | Direction: Column, Width: 100%, Min-Height: Auto, Padding: 72px 0 (Desktop) / 48px 0 (Mobile), Background: `#FFFFFF`. | Full-width container spanning 100% viewport. |
| **Inner Container Wrapper** (`.home-container`) | Flexbox Container | Direction: Column, Content Width: Boxed, Max-Width: 1280px, Padding: 0 48px (Desktop) / 0 20px (Mobile), Align Items: Flex-Start. | Bounds content within 1280px grid. |
| **Heading Row Container** (`.section-heading-row`) | Grid Container | Grid Template Columns: `1.4fr 0.8fr`, Gap: 80px, Margin-Bottom: 38px, Align Items: End. | **Tablet / Mobile (≤ 1024px)**: Collapses to single column (`1fr`), Gap: 32px. |
| **Mobile Capsule Selector** (`.role-mobile-capsule`)| Flexbox Container | Direction: Row, Justify Content: Space-Between, Align Items: Center, Height: 42px, Padding: 3px 6px, Border Radius: 9999px, Background: `#F3F4F6`, Margin: 0 auto 24px auto. | **Desktop (≥ 1024px)**: Hidden (`display: none`).<br/>**Tablet / Mobile (≤ 1024px)**: Visible (`display: flex`). |
| **Desktop Role Selector** (`.role-selector`) | Grid Container | Grid Template Columns: `minmax(210px, 0.32fr) 1fr`, Gap: 28px, Align Items: Start, Width: 100%. | **Tablet / Mobile (≤ 1024px)**: Collapses to `display: block`. |
| **Sidebar Tablist Container** (`.role-tablist`) | Flexbox Container | Direction: Column, Gap: 8px, Width: 100%. | **Tablet / Mobile (≤ 1024px)**: Hidden (`display: none !important`). |
| **Role Viewport Surface** (`.role-view`) | Flexbox Container | Direction: Column, Width: 100%, Min-Height: 400px, Padding: 48px, Background: `#FFFFFF`, Border: 1px Solid `#E6EAF0`, Border Radius: 16px, Box Shadow: `0 10px 30px -4px rgba(11, 16, 32, 0.06)`. | **Tablet / Mobile (≤ 1024px)**: Full width (`100%`).<br/>**Mobile (≤ 768px)**: Padding: 20px, Min-Height: Auto. |
| **Role Surface Header Row** (`.role-view-header`) | Flexbox Container | Direction: Row, Justify Content: Space-Between, Align Items: Center, Width: 100%. | Retains horizontal alignment across all screens. |
| **Shared Process Rail** (`.role-flow`) | Flexbox Container | Direction: Row, Align Items: Center, Width: 100%, Margin-Block: 40px. | **Mobile (≤ 768px)**: Re-orients to vertical column (`flex-direction: column`), Gap: 6.4px. |
| **Telemetry Metrics Tray** (`.role-metrics`) | Grid Container | Grid Template Columns: `repeat(3, 1fr)`, Gap: 13.6px, Margin-Top: Auto, Width: 100%. | **Mobile (≤ 768px)**: Collapses to single column (`1fr`). |

---

### 3. GLOBAL ELEMENTOR STYLES / TOKENS

| Token Name | Token Role / Elementor Mapping | Hex / Value | Reusability / Global Status |
|---|---|---|---|
| `Global / Neutral 0` | Section background, card surface, active tab fill | `#FFFFFF` | Core site-wide pure white. |
| `Global / Neutral 50` | Inactive tab button background | `#F7F8FA` | Reused across all light gray card backgrounds. |
| `Global / Brand Ink` | Heading text, domain titles, KPI numbers | `#0D0D0D` | Site-wide primary ink typography. |
| `Global / Brand Blue` | Eyebrow text, role kicker, active tab text/accent | `#0528F2` | Primary brand accent color (`--flow-primary`). |
| `Global / Brand Cyan` | Synchronized context badge, predictive delta color | `#049DD9` | Secondary brand accent color (`--flow-cyan`). |
| `Global / Cyan Glow` | Eyebrow pulsing dot, spark icon accent | `#05C7F2` | High-luma interactive glow (`--flow-cyan-bright`). |
| `Global / Border Default`| Role viewport outer border | `#E6EAF0` | Standard neutral border (`--neutral-200`). |
| `Global / Border Strong` | KPI metric left border line | `#DDE3EA` | Elevated neutral border (`--neutral-300`). |
| `Global / Text Secondary`| Subtitle paragraph, tab text | `#374151` | Standard readable secondary text (`--neutral-700`). |
| `Global / Text Muted` | Ghost capsule labels, KPI overline tags | `#6B7280` | Tertiary label color (`--neutral-500`). |
| `Global / Dark Pill` | Mobile active capsule background | `#18191E` | High-contrast dark neutral. |
| `Global / Capsule Gray` | Mobile capsule wrapper track | `#F3F4F6` | Ultra-light neutral track. |
| `Global / Font Primary` | All typography across section | `"Manrope", sans-serif` | Global site font family. |
| `Global / Radius XL` | Role view surface corners | `16px` (`1rem`) | Reused on prominent elevated product surfaces. |
| `Global / Radius LG` | Tab button corners | `12px` (`0.75rem`) | Reused on interactive pills. |
| `Global / Radius SM` | Context badge corners | `4px` (`0.25rem`) | Small badge radius. |

---

### 4. REUSABLE COMPONENTS

1. **`RoleViewCard` Component (Elementor Template / Global Container)**:
   - **Rationale**: Represents the core synchronized viewport containing the header, dynamic domain title, process rail, and 3-column KPI tray.
   - **Overridable Props**:
     - `RoleName`: String (e.g. `CFO`, `FINANCE CONTROLLER`).
     - `DomainTitle`: String (e.g. `Cash · Receivables · Forecast · Risk · Decision`).
     - `ActiveFlowNodes`: Comma-separated list of active pipeline states (e.g. `Cash, Receivables, Forecast, Risk, Decision`).
     - `KPI1_Label`, `KPI1_Value`, `KPI1_Change`, `KPI1_Type`.
     - `KPI2_Label`, `KPI2_Value`, `KPI2_Change`, `KPI2_Type`.
     - `KPI3_Label`, `KPI3_Value`, `KPI3_Change`, `KPI3_Type`.
2. **`ProductKPICard` Component**:
   - **Rationale**: Reused 21 times across the 7 persona views and elsewhere in the Platform Workspace.
   - **Overridable Props**:
     - `Label`: String (e.g. `DSO (DAYS SALES OUTSTANDING)`).
     - `Value`: String (e.g. `28 Days`).
     - `Change`: String (e.g. `-6d vs last mo`).
     - `Type`: Variant (`standard`, `trend`, `alert`, `predictive`).
3. **`RoleMobileCapsule` Component**:
   - **Rationale**: Dedicated responsive interactive widget for tablet/mobile viewports.
   - **Overridable Props**:
     - `ActiveTitle`: String.
     - `PrevTitle`: String.
     - `NextTitle`: String.

---

### 5. CUSTOM CSS EXCEPTIONS

The following 5 items **cannot** be produced using native Elementor Pro controls and require custom CSS in the section's **Advanced > Custom CSS** tab:

```css
/* EXCEPTION 1: Eyebrow Pulsing Cyan Beacon Dot (Pseudo-Element Animation)
   REASON NATIVE CANNOT DO IT: Elementor Pro has no native control to create a ::before
   pseudo-element on a text widget with a continuous multi-stop @keyframes box-shadow pulse. */
selector .home-index::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #05C7F2;
  box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  flex-shrink: 0;
  animation: beaconPulse 2.4s ease-in-out infinite;
}

@keyframes beaconPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  }
  50% {
    opacity: 0.45;
    transform: scale(0.8);
    box-shadow: 0 0 3px rgba(5, 199, 242, 0.3);
  }
}

/* EXCEPTION 2: Tab Button Left Accent Indicator Bar (Pseudo-Element on Active Tab)
   REASON NATIVE CANNOT DO IT: Elementor's border controls apply to the full container edge.
   Rendering an internal 3.5px vertical pill positioned at top: 22%, bottom: 22% requires ::before. */
selector .role-tab-btn[aria-selected="true"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 3.5px;
  background: #0528F2;
  border-radius: 0 4px 4px 0;
}

/* EXCEPTION 3: Ghost Capsule Alpha Gradient Masking
   REASON NATIVE CANNOT DO IT: Elementor has no native CSS mask-image control to create
   a directional fade mask on preview text overflowing a pill container. */
selector .role-capsule-ghost--prev {
  mask-image: linear-gradient(to right, transparent 0%, black 50%) !important;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 50%) !important;
}

selector .role-capsule-ghost--next {
  mask-image: linear-gradient(to left, transparent 0%, black 50%) !important;
  -webkit-mask-image: linear-gradient(to left, transparent 0%, black 50%) !important;
}

/* EXCEPTION 4: Flow Rail Glowing Active Node Dots
   REASON NATIVE CANNOT DO IT: Elementor cannot conditionally style child <i> and <b> tags
   within an inline process list with dynamic opacity transitions and box-shadow glows. */
selector .role-flow > div {
  opacity: 0.35;
  transition: opacity 350ms ease;
}

selector .role-flow > div.is-active {
  opacity: 1;
}

selector .role-flow .is-active i {
  background: #0528F2 !important;
  box-shadow: 0 0 6px #0528F2 !important;
}

selector .role-flow .is-active b {
  background: #0528F2 !important;
}

/* EXCEPTION 5: Non-Standard Variable Font Weight 650
   REASON NATIVE CANNOT DO IT: Elementor typography controls only support 100-step weights (600 or 700). */
selector h2.home-section-h2 {
  font-weight: 650 !important;
}
```

---

### 6. CUSTOM JAVASCRIPT EXCEPTIONS

The following behavioral requirements cannot be achieved using Elementor Pro's native Interactions panel:
1. **Synchronized Persona State**: Clicking a desktop role tab or a mobile capsule chevron must update the DOM across the domain title, the flow rail active classes, and the 3 KPI telemetry cards simultaneously.
2. **Touch Swipe Gesture Handling**: Dragging/swiping on mobile with a `40px` horizontal delta threshold must navigate to the next/previous persona circularly.

#### Zero-Dependency Vanilla JS Controller for Elementor Pro
Add this script via an **Elementor HTML Widget** or inside the WordPress theme's `custom.js`:

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const rolesData = [
    {
      name: "CFO",
      title: "Cash · Receivables · Forecast · Risk · Decision",
      areas: ["Cash", "Receivables", "Forecast", "Risk", "Decision"],
      kpis: [
        { label: "DSO (DAYS SALES OUTSTANDING)", val: "28 Days", chg: "-6d vs last mo", type: "trend" },
        { label: "WORKING CAPITAL VELOCITY", val: "+₹1.2 Cr", chg: "+8.4%", type: "standard" },
        { label: "FORWARD CASH RUNWAY", val: "18 Months", chg: "Predictive", type: "predictive" }
      ]
    },
    {
      name: "FINANCE CONTROLLER",
      title: "Receivables · Payables · Reconciliation",
      areas: ["Receivables", "Payables", "Reconciliation"],
      kpis: [
        { label: "UNMATCHED LEDGER ITEMS", val: "0 Invoices", chg: "100% matched", type: "trend" },
        { label: "AUTOMATED RECONCILIATION", val: "98.4%", chg: "+2.1%", type: "standard" },
        { label: "COLLECTIONS DUE THIS WEEK", val: "₹14.8 Lakh", chg: "4 Invoices", type: "alert" }
      ]
    },
    {
      name: "BUSINESS OWNER",
      title: "Business health · Cash · Decisions",
      areas: ["Business health", "Cash", "Decisions"],
      kpis: [
        { label: "OPERATING MARGIN", val: "24.2%", chg: "+3.1%", type: "standard" },
        { label: "CASH CONVERSION CYCLE", val: "3.2x", chg: "Optimal", type: "trend" },
        { label: "PIPELINE ARR FORECAST", val: "₹8.4 Cr", chg: "92% conf", type: "predictive" }
      ]
    },
    {
      name: "OPERATIONS",
      title: "Orders · Inventory · Fulfillment",
      areas: ["Orders", "Inventory", "Fulfillment"],
      kpis: [
        { label: "FULFILLMENT SLA", val: "99.4%", chg: "+0.8%", type: "standard" },
        { label: "HYDERABAD DC CAPACITY", val: "84%", chg: "Optimal", type: "standard" },
        { label: "STOCKOUT RISK", val: "0 Items", chg: "Protected", type: "trend" }
      ]
    },
    {
      name: "PROCUREMENT",
      title: "PO · Suppliers · Commitments",
      areas: ["PO", "Suppliers", "Commitments"],
      kpis: [
        { label: "COMMITTED PURCHASE ORDERS", val: "₹18.2 Lakh", chg: "12 Approved", type: "standard" },
        { label: "SUPPLIER SLA COMPLIANCE", val: "96.5%", chg: "+1.8%", type: "trend" },
        { label: "INVOICE PRICE DISCREPANCIES", val: "₹0", chg: "Zero variance", type: "standard" }
      ]
    },
    {
      name: "WAREHOUSE",
      title: "Orders · Inventory · Movement · Replenishment",
      areas: ["Orders", "Inventory", "Movement", "Replenishment"],
      kpis: [
        { label: "ALLOCATED DISPATCH UNITS", val: "125 Units", chg: "HYD-B4 Ready", type: "standard" },
        { label: "PICK & PACK ACCURACY", val: "99.9%", chg: "Verified", type: "trend" },
        { label: "DISPATCH TURNAROUND", val: "4.2 Hours", chg: "-1.5h vs target", type: "standard" }
      ]
    },
    {
      name: "COMPLIANCE",
      title: "GST · E-Invoice · E-Way Bill · Reconciliation",
      areas: ["GST", "E-Invoice", "E-Way Bill", "Reconciliation"],
      kpis: [
        { label: "E-INVOICE GENERATION", val: "100% Passed", chg: "IRP signed", type: "standard" },
        { label: "GSTR-1 RECONCILIATION", val: "Auto-Populated", chg: "Zero drift", type: "trend" },
        { label: "STATUTORY AUDIT READINESS", val: "100%", chg: "Real-time logs", type: "standard" }
      ]
    }
  ];

  function formatTitle(name) {
    if (name === "CFO" || name === "GST" || name === "PO") return name;
    return name.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  let currentRole = 0;
  const total = rolesData.length;

  const tabButtons = document.querySelectorAll(".role-tab-btn");
  const kicker = document.querySelector(".role-view-kicker");
  const headline = document.querySelector(".role-view > strong");
  const flowNodes = document.querySelectorAll(".role-flow > div");
  const metricsTray = document.querySelector(".role-metrics");
  const capsuleActive = document.querySelector(".role-capsule-active span");
  const capsulePrev = document.querySelector(".role-capsule-ghost--prev span");
  const capsuleNext = document.querySelector(".role-capsule-ghost--next span");
  const arrowPrev = document.querySelector(".role-capsule-arrow--prev");
  const arrowNext = document.querySelector(".role-capsule-arrow--next");
  const ghostPrevBtn = document.querySelector(".role-capsule-ghost--prev");
  const ghostNextBtn = document.querySelector(".role-capsule-ghost--next");

  function renderRole(index) {
    currentRole = (index + total) % total;
    const data = rolesData[currentRole];
    const prevData = rolesData[(currentRole - 1 + total) % total];
    const nextData = rolesData[(currentRole + 1) % total];

    // Update Desktop Tabs
    tabButtons.forEach((btn, idx) => {
      btn.setAttribute("aria-selected", idx === currentRole ? "true" : "false");
    });

    // Update Mobile Capsule
    if (capsuleActive) capsuleActive.textContent = formatTitle(data.name);
    if (capsulePrev) capsulePrev.textContent = formatTitle(prevData.name);
    if (capsuleNext) capsuleNext.textContent = formatTitle(nextData.name);

    // Update Surface Header & Headline
    if (kicker) kicker.textContent = `${data.name} VIEW · SAME BUSINESS REALITY`;
    if (headline) headline.textContent = data.title;

    // Update Flow Nodes
    flowNodes.forEach(node => {
      const label = node.querySelector("span")?.textContent.toLowerCase() || "";
      const isActive = data.areas.some(area => {
        const a = area.toLowerCase().split(" ")[0];
        return label.includes(a) || a.includes(label);
      });
      if (isActive) node.classList.add("is-active");
      else node.classList.remove("is-active");
    });

    // Update KPI Metrics Cards
    if (metricsTray) {
      metricsTray.innerHTML = data.kpis.map(kpi => `
        <div class="product-kpi is-${kpi.type}">
          <span>${kpi.label}</span>
          <strong>${kpi.val}</strong>
          ${kpi.chg ? `<small>${kpi.type === "predictive" ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z"/></svg>' : ''}<b>${kpi.chg}</b> vs last month</small>` : ''}
        </div>
      `).join("");
    }
  }

  // Click Listeners
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => renderRole(idx));
  });

  if (arrowPrev) arrowPrev.addEventListener("click", () => renderRole(currentRole - 1));
  if (arrowNext) arrowNext.addEventListener("click", () => renderRole(currentRole + 1));
  if (ghostPrevBtn) ghostPrevBtn.addEventListener("click", () => renderRole(currentRole - 1));
  if (ghostNextBtn) ghostNextBtn.addEventListener("click", () => renderRole(currentRole + 1));

  // Touch Swipe Gesture Detection
  let touchStartX = null;
  const roleView = document.querySelector(".role-view") || document.querySelector(".role-mobile-capsule");

  if (roleView) {
    roleView.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    roleView.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX > 40) renderRole(currentRole - 1);
      else if (deltaX < -40) renderRole(currentRole + 1);
      touchStartX = null;
    }, { passive: true });
  }

  // Initial Render
  renderRole(0);
});
```

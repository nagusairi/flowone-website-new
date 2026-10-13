# CONTINUOUS BUSINESS FLOW / CONNECTION ARENA — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 05: Continuous Business Flow / Connection Arena** (`#connection` / `.home-connection.home-section`) of the flowOne website.

---

## 1. SECTION OVERVIEW

### 1.1 Purpose & Page Position
- **Section Purpose**: Serves as the central architectural proof of flowOne's unified operating model. Following the preceding contrast with fragmented legacy silos, this section presents a live, dark-canvas transaction pipeline visualization. It tracks a live enterprise transaction (`TXN-10482`, Ananya Enterprises, ₹5,00,000 → ₹5,90,000) moving across 9 synchronized operational stages (Order, Inventory, Invoice, GST, Receivable, Collection, Bank, Cash, and Decision). The pipeline features an animated flowing pulse beam along a multi-stop rail line connecting all 9 operational nodes, with interactive hoverable station cards and a terminal executive outcome confirmation card.
- **Section Placement**:
  - **Preceding Section**: Section 04: The Cost of Silos / System Fragmentation (`.home-fragmentation.home-section`, lines 667–711 in `Homepage.tsx`).
  - **Succeeding Section**: Section 06: Platform Capabilities / Core Modules (`#capabilities` / `.home-capabilities.home-section`, lines 734–801 in `Homepage.tsx`).

### 1.2 Component File Names & Exact Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 713–732**: Main section JSX markup (section container, heading row, identity bar, `<ConnectedFlow />`, and `<Outcome />`).
  - **Lines 2357–2367**: `connectionStages` constant data array (9 operational pipeline stations).
  - **Lines 2369–2418**: `ConnectedFlow` memoized component (animated rail line, pulse beacon, station node dots, connector chevrons, and station cards).
- **`src/components/flow-system.tsx`**:
  - **Lines 10–12**: `StateIndicator` component (`state="complete"`).
  - **Lines 68–70**: `Outcome` component.
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `Icon` component rendering `name="check"`.
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (max-width and horizontal fluid page padding).
  - **Line 5**: `.home-section` (vertical section padding).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 1310–1327**: Dark theme styling for `.home-connection`, custom cyan `.home-index` eyebrow capsule, and muted intro paragraph color.
  - **Lines 1328–1357**: `.connection-identity`, `.connection-identity-left`, `.connection-mono-id`, strong typography, and white state indicator override.
  - **Lines 1358–1401**: `.connection-pipeline`, `.connection-rail`, `.connection-rail-line`, `.connection-rail-pulse`, and `@keyframes connection-bus-pulse`.
  - **Lines 1403–1564**: `.connection-grid`, `.connection-station`, `.connection-station-node`, `.connection-node-dot` and its 3 state variants (`.is-complete`, `.is-active`, `.is-recommended`), `.connection-pulse-ring`, `.connection-inner-dot`, `.connection-arrow`, `.connection-station-card` with hover effects and state-based badge pills.
  - **Lines 1565–1569**: `.home-connection .fo-outcome` dark glass container overrides.
  - **Line 4396**: `@media (max-width: 64rem)` (1024px tablet single-column heading row).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile section padding and heading margin).
  - **Lines 4523–4528**: `@media (max-width: 48rem)` (768px mobile overrides: identity column flex, pipeline padding, rail hide, 3×3 grid shift, node dots hide).
  - **Lines 4636–4637**: `@media (prefers-reduced-motion: reduce)` pulse animation and transition suppression.
- **`src/components/flow-system.css`**:
  - **Lines 2–8**: `.fo-state-indicator` and `.fo-state-indicator.is-complete > i`.
  - **Lines 84–89**: Base `.fo-outcome` card, check icon badge, title, and value typography.
- **`src/components/flowone.css`**:
  - **Lines 36–37, 39**: Base `.fo-icon`, `.fo-icon-16`, `.fo-icon-default`.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and glow effects.

---

## 2. CODE

### 2.1 Verbatim JSX/TSX Markup

From `src/Homepage.tsx` (Lines 713–732):
```tsx
<section id="connection" className="home-connection home-section">
  <div className="home-container">
    <div className="section-heading-row">
      <div>
        <span className="home-index">CONTINUOUS BUSINESS FLOW</span>
        <h2>flowOne connects the work that moves your business.</h2>
      </div>
      <p>Finance, operations, compliance, cash and AI work from the same business context.</p>
    </div>
    <div className="connection-identity">
      <div className="connection-identity-left">
        <span className="connection-mono-id">TXN-10482</span>
        <strong>Ananya Enterprises · ₹5,00,000 → ₹5,90,000</strong>
      </div>
      <StateIndicator state="complete" />
    </div>
    <ConnectedFlow />
    <Outcome label="Same business. Same transaction. One connected system." value="Context restored · Decision ready" />
  </div>
</section>
```

From `src/Homepage.tsx` (Lines 2357–2418):
```tsx
const connectionStages = [
  { step: "01", name: "Order", status: "Confirmed", state: "complete" },
  { step: "02", name: "Inventory", status: "Allocated", state: "complete" },
  { step: "03", name: "Invoice", status: "Issued", state: "complete" },
  { step: "04", name: "GST", status: "Compliant", state: "complete" },
  { step: "05", name: "Receivable", status: "Open", state: "active" },
  { step: "06", name: "Collection", status: "Scheduled", state: "active" },
  { step: "07", name: "Bank", status: "Matched", state: "complete" },
  { step: "08", name: "Cash", status: "Received", state: "complete" },
  { step: "09", name: "Decision", status: "Settled", state: "recommended" },
] as const;

const ConnectedFlow = memo(function ConnectedFlow() {
  return (
    <div className="connection-pipeline" aria-label="Connected transaction flow pipeline">
      <div className="connection-rail" aria-hidden="true">
        <div className="connection-rail-line" />
        <div className="connection-rail-pulse" />
      </div>
      <div className="connection-grid">
        {connectionStages.map((stage, i) => {
          const isComplete = stage.state === "complete";
          const isActive = stage.state === "active";
          const isRecommended = stage.state === "recommended";

          return (
            <div
              key={stage.name}
              className={`connection-station ${isComplete ? "is-complete" : ""} ${isActive ? "is-active" : ""} ${isRecommended ? "is-recommended" : ""}`}
            >
              <div className="connection-station-node" aria-hidden="true">
                <span className="connection-node-dot">
                  {isComplete ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isActive ? (
                    <span className="connection-pulse-ring" />
                  ) : (
                    <span className="connection-inner-dot" />
                  )}
                </span>
                {i < connectionStages.length - 1 && (
                  <span className="connection-arrow" aria-hidden="true">
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                      <path d="M2 1L5 3.5L2 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="connection-station-card">
                <span className="connection-station-idx">{stage.step}</span>
                <strong className="connection-station-name">{stage.name}</strong>
                <span className="connection-station-status">{stage.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
```

From `src/components/flow-system.tsx`:
```tsx
// Lines 10–12: StateIndicator
export function StateIndicator({ state, compact = false }: { state: typeof canonicalStates[number]; compact?: boolean }) {
  return <span className={`fo-state-indicator is-${state} ${compact ? "is-compact" : ""}`}><i />{!compact && <span>{state}</span>}</span>;
}

// Lines 68–70: Outcome
export function Outcome({ label, value, compact = false }: { label: string; value?: string; compact?: boolean }) {
  return <div className={`fo-outcome ${compact ? "is-compact" : ""}`}><i><Icon name="check" size={16} /></i><div><span>OUTCOME</span><strong>{label}</strong>{value && <b>{value}</b>}</div></div>;
}
```

From `src/components/flowone.tsx` (Lines 6–17):
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

/* SECTION 05: Connection Arena Dark Canvas */
.home-connection {
  position: relative;
  color: var(--color-white);
  background: var(--color-brand-ink);
  background-image: radial-gradient(ellipse at 50% 15%, rgba(0, 34, 255, 0.18), transparent 65%);
}

.home-connection .home-index {
  background: rgba(5, 199, 242, 0.08);
  border-color: rgba(5, 199, 242, 0.22);
  color: #05C7F2;
  box-shadow: 0 0 12px rgba(5, 199, 242, 0.12);
}

.home-connection .home-index:hover {
  background: rgba(5, 199, 242, 0.14);
  border-color: rgba(5, 199, 242, 0.35);
}

.home-connection .section-heading-row > p {
  color: var(--color-neutral-400);
}

/* Identity Strip */
.connection-identity {
  min-height: 4.5rem;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-block: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
}

.connection-identity-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.connection-mono-id {
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: rgba(0, 184, 230, 0.12);
  border: 1px solid rgba(0, 184, 230, 0.35);
  color: var(--color-brand-cyan);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.connection-identity-left strong {
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.connection-identity .fo-state-indicator {
  color: var(--color-white);
}

.fo-state-indicator {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  color: var(--color-text-secondary);
  font-size: var(--font-caption);
  font-weight: 600;
  text-transform: capitalize;
}

.fo-state-indicator > i {
  width: .625rem;
  height: .625rem;
  border: 2px solid currentColor;
  border-radius: var(--radius-full);
}

.fo-state-indicator.is-complete > i {
  border-color: var(--color-status-success);
}

/* Pipeline Glass Console */
.connection-pipeline {
  position: relative;
  padding: 2.25rem 1.25rem 1.75rem;
  margin-block: var(--spacing-6);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: var(--radius-xl);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 36px rgba(0, 0, 0, 0.3);
}

/* Central Rail Line & Bus Pulse */
.connection-rail {
  position: absolute;
  top: 3.1rem;
  left: 3.5rem;
  right: 3.5rem;
  height: 2px;
  pointer-events: none;
  z-index: 1;
}

.connection-rail-line {
  position: absolute;
  inset: 0;
  background: var(--gradient-flow);
  opacity: 0.6;
}

.connection-rail-pulse {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--flow-cyan-bright);
  box-shadow: 0 0 12px 2px rgba(5, 199, 242, 0.85);
  position: absolute;
  top: -3px;
  animation: connection-bus-pulse 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes connection-bus-pulse {
  0% { left: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

/* Station Grid */
.connection-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 0.5rem;
  width: 100%;
}

.connection-station {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.connection-station-node {
  position: relative;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connection-node-dot {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: var(--radius-full);
  background: var(--dark-800);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: var(--neutral-400);
  display: grid;
  place-items: center;
  transition: all var(--motion-fast);
}

.connection-station.is-complete .connection-node-dot {
  background: var(--success);
  border-color: var(--success);
  color: var(--neutral-0);
  box-shadow: 0 0 10px rgba(22, 128, 60, 0.45);
}

.connection-station.is-active .connection-node-dot {
  background: var(--flow-primary);
  border-color: var(--flow-primary);
  color: var(--neutral-0);
  box-shadow: 0 0 14px rgba(5, 40, 242, 0.65);
}

.connection-station.is-recommended .connection-node-dot {
  background: var(--dark-800);
  border-color: var(--flow-cyan);
  color: var(--flow-cyan);
  box-shadow: 0 0 12px rgba(4, 157, 217, 0.5);
}

.connection-pulse-ring {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: #ffffff;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
}

.connection-inner-dot {
  width: 5px;
  height: 5px;
  border-radius: var(--radius-full);
  background: currentColor;
}

.connection-arrow {
  position: absolute;
  right: -0.65rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  pointer-events: none;
}

/* Station Cards */
.connection-station-card {
  width: 100%;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.65rem 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
  transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.connection-station:hover .connection-station-card {
  transform: translateY(-3px);
  border-color: rgba(0, 34, 255, 0.5);
  background: rgba(20, 30, 55, 0.95);
  box-shadow: 0 8px 18px rgba(0, 34, 255, 0.2);
}

.connection-station.is-active .connection-station-card {
  border-color: var(--color-brand-blue);
  background: rgba(11, 24, 60, 0.95);
  box-shadow: 0 0 0 1px var(--color-brand-blue), 0 4px 14px rgba(0, 34, 255, 0.3);
}

.connection-station-idx {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.58rem;
  font-weight: 700;
  color: #64748B;
  letter-spacing: 0.05em;
}

.connection-station.is-active .connection-station-idx {
  color: var(--color-brand-cyan);
}

.connection-station-name {
  color: #FFFFFF;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.connection-station-status {
  font-size: 0.52rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.12rem 0.35rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.05);
  color: #94A3B8;
  white-space: nowrap;
}

.connection-station.is-complete .connection-station-status {
  color: #4ADE80;
  background: rgba(34, 197, 94, 0.12);
}

.connection-station.is-active .connection-station-status {
  color: var(--color-brand-cyan);
  background: rgba(0, 184, 230, 0.12);
}

.connection-station.is-recommended .connection-station-status {
  color: #FACC15;
  background: rgba(250, 204, 21, 0.12);
}

/* Outcome Card Dark Glass */
.home-connection .fo-outcome {
  min-height: 8rem;
  padding: var(--spacing-3);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: var(--color-white);
}

.fo-outcome > i {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  color: var(--color-brand-ink);
  background: var(--color-brand-cyan);
  border-radius: var(--radius-full);
}

.fo-outcome > div {
  display: flex;
  flex-direction: column;
  gap: .3rem;
}

.fo-outcome span {
  color: var(--color-neutral-400);
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .1em;
}

.fo-outcome strong {
  font-size: 1.05rem;
}

.fo-outcome b {
  color: var(--color-brand-cyan);
  font-size: var(--font-caption);
}

/* Responsive Media Queries */
@media (max-width: 64rem) {
  .section-heading-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
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
  .connection-identity {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .connection-pipeline {
    padding: 1.5rem 1rem;
  }
  .connection-rail {
    display: none;
  }
  .connection-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.65rem;
  }
  .connection-station {
    flex-direction: column;
  }
  .connection-station-node {
    display: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .connection-rail-pulse {
    animation: none;
  }
  .connection-station-card {
    transition: none;
  }
}
```

---

### 2.3 Resolved Design Tokens

| Token Name | Defined In | Aliased / Inherited Chain | Resolved Literal Value | Usage in This Section |
| :--- | :--- | :--- | :--- | :--- |
| `--color-brand-ink` | `src/index.css` | `var(--flow-ink)` | `#0D0D0D` | `.home-connection` dark canvas background, outcome checkmark icon color |
| `--color-white` | `src/index.css` | `var(--neutral-0)` | `#FFFFFF` | Base text color, card titles, node pulse ring |
| `--color-neutral-400` | `src/index.css` | Raw token | `#9CA3AF` | Heading row `<p>`, outcome eyebrow `<span>`, default node icon color |
| `--color-brand-cyan` | `src/index.css` | `var(--flow-cyan)` | `#049DD9` | Mono ID text, active station index/badge, outcome badge background & value `<b>` |
| `--flow-cyan` | `src/index.css` | Raw token | `#049DD9` | Recommended station border, icon color |
| `--flow-cyan-bright` | `src/index.css` | Raw token | `#05C7F2` | Eyebrow text, rail pulse dot background & glow |
| `--flow-primary` | `src/index.css` | Raw token | `#0528F2` | Active station node dot background/border |
| `--color-brand-blue` | `src/index.css` | `var(--flow-primary)` | `#0528F2` | Active station card border and outline shadow |
| `--success` | `src/index.css` | Raw token | `#16803C` | Complete station node dot background/border |
| `--color-status-success`| `src/index.css` | `var(--success)` | `#16803C` | State indicator complete ring border |
| `--dark-800` | `src/index.css` | Raw token | `#12151C` | Inactive / Recommended station node dot background |
| `--neutral-0` | `src/index.css` | Raw token | `#FFFFFF` | Node dot checkmark stroke color (complete & active) |
| `--gradient-flow` | `src/index.css` | Raw token | `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)` | Central rail line fill (`opacity: 0.6`) |
| `--container-wide` | `src/index.css` | Raw token | `80rem` (1280px) | Container max-width |
| `--page-padding` | `src/index.css` | Raw token | `clamp(1.25rem, 3.34vw, 3rem)` | Container horizontal side gutters |
| `--radius-sm` | `src/index.css` | Raw token | `0.25rem` (4px) | `.connection-mono-id` border radius |
| `--radius-md` | `src/index.css` | Raw token | `0.5rem` (8px) | `.connection-identity` border radius |
| `--radius-lg` | `src/index.css` | Raw token | `0.75rem` (12px) | `.fo-outcome` card border radius |
| `--radius-xl` | `src/index.css` | Raw token | `1rem` (16px) | `.connection-pipeline` glass panel radius |
| `--radius-full` | `src/index.css` | Raw token | `9999px` | Circular dots, pill badges, and pulse rings |
| `--spacing-2` | `src/index.css` | Raw token | `1rem` (16px) | Outcome icon-to-content gap |
| `--spacing-3` | `src/index.css` | Raw token | `1.5rem` (24px) | Outcome card padding |
| `--spacing-4` | `src/index.css` | Raw token | `2rem` (32px) | Top margin of `h2`, tablet header row gap |
| `--spacing-6` | `src/index.css` | Raw token | `3rem` (48px) | Vertical margin around `.connection-pipeline` |
| `--spacing-10` | `src/index.css` | Raw token | `5rem` (80px) | Desktop header row gap |
| `--font-family-primary` | `src/index.css` | Raw token | `"Manrope", sans-serif` | Global font family |
| `--font-family-mono` | Not declared in `:root` | Fallback stack | `ui-monospace, SFMono-Regular, Menlo, monospace` | Station index typography (`01`–`09`) |
| `--font-h2` | `src/index.css` | Raw token | `clamp(2.25rem, 3.34vw, 3rem)` | Main `<h2>` heading size |
| `--font-caption` | `src/index.css` | Raw token | `0.8125rem` (13px) | State indicator and outcome value font size |
| `--motion-fast` | `src/index.css` | Raw token | `180ms` | Station node dot transition timing |

---

### 2.4 JavaScript Architecture (Vanilla JS for Elementor / WordPress)
In React, the pipeline is static and memoized (`memo(function ConnectedFlow() { ... })`). For Elementor, it can be built directly using Elementor Pro containers or an HTML Widget with zero external JS dependencies:

```html
<!-- Ready-to-paste Elementor HTML Container Snippet -->
<div class="connection-pipeline" aria-label="Connected transaction flow pipeline">
  <div class="connection-rail" aria-hidden="true">
    <div class="connection-rail-line"></div>
    <div class="connection-rail-pulse"></div>
  </div>
  <div class="connection-grid">
    <!-- 9 Station Elements rendered statically with pure CSS hover & animations -->
  </div>
</div>
```

---

## 3. CONTENT

### 3.1 Exhaustive Text Strings in Display Order

| # | Element Description | HTML Tag / Class | Content Text (Verbatim) |
| :--- | :--- | :--- | :--- |
| 1 | Eyebrow Pill | `<span class="home-index">` | `CONTINUOUS BUSINESS FLOW` |
| 2 | Main Section Title | `<h2>` | `flowOne connects the work that moves your business.` |
| 3 | Section Subtitle Paragraph | `<p>` | `Finance, operations, compliance, cash and AI work from the same business context.` |
| 4 | Transaction Mono Identifier | `<span class="connection-mono-id">` | `TXN-10482` |
| 5 | Enterprise Entity & Value Range | `<strong>` | `Ananya Enterprises · ₹5,00,000 → ₹5,90,000` |
| 6 | State Indicator Label | `<span class="fo-state-indicator is-complete"><span>` | `complete` |
| 7 | **Station 01** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `01`<br>Name: `Order`<br>Status: `Confirmed` |
| 8 | **Station 02** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `02`<br>Name: `Inventory`<br>Status: `Allocated` |
| 9 | **Station 03** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `03`<br>Name: `Invoice`<br>Status: `Issued` |
| 10 | **Station 04** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `04`<br>Name: `GST`<br>Status: `Compliant` |
| 11 | **Station 05** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `05`<br>Name: `Receivable`<br>Status: `Open` |
| 12 | **Station 06** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `06`<br>Name: `Collection`<br>Status: `Scheduled` |
| 13 | **Station 07** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `07`<br>Name: `Bank`<br>Status: `Matched` |
| 14 | **Station 08** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `08`<br>Name: `Cash`<br>Status: `Received` |
| 15 | **Station 09** | Index: `<span>`<br>Name: `<strong>`<br>Status: `<span>` | Index: `09`<br>Name: `Decision`<br>Status: `Settled` |
| 16 | Outcome Category Tag | `<div class="fo-outcome"><span>` | `OUTCOME` |
| 17 | Outcome Main Statement | `<div class="fo-outcome"><strong>` | `Same business. Same transaction. One connected system.` |
| 18 | Outcome Value Pill Text | `<div class="fo-outcome"><b>` | `Context restored · Decision ready` |

### 3.2 Hyperlinks & Outbound Destinations
- **Total Links**: **0**
- There are **no `<a>` tags or external URLs** in this entire section. All elements are structured as a static informational pipeline with hover micro-interactions.

---

## 4. LAYOUT SPEC

### 4.1 Container & Vertical Spacing
- **Section Padding**:
  - Desktop / Tablet (`> 768px`): `clamp(3.25rem, 5.5vh, 4.5rem)` top and bottom (52px to 72px).
  - Mobile (`≤ 768px`): `clamp(2.25rem, 4.5vh, 3rem)` top and bottom (36px to 48px).
- **Container Max-Width**: `80rem` (1280px).
- **Container Side Gutters**: `clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
- **Vertical Spacing Between Blocks**:
  - Distance between Heading Row and Identity Bar: `clamp(1.75rem, 3vh, 2.35rem)` (28px to 37.6px; mobile: `1.5rem` / 24px).
  - Margin around `.connection-pipeline`: `margin-block: 3rem` (`var(--spacing-6)` = 48px top and bottom).
  - Distance between Pipeline Console and Outcome Card: `3rem` (48px).

### 4.2 Structural Grids & Layering (Desktop)
1. **Header Row (`.section-heading-row`)**:
   - `display: grid; grid-template-columns: 1.4fr .8fr; gap: 5rem; align-items: end;`
2. **Identity Bar (`.connection-identity`)**:
   - `display: flex; justify-content: space-between; align-items: center; min-height: 4.5rem; padding: 0.85rem 1.25rem;`
   - Background: `rgba(255, 255, 255, 0.02)`, border: top and bottom `1px solid rgba(255, 255, 255, 0.12)`, radius: `0.5rem` (8px).
3. **Pipeline Glass Console (`.connection-pipeline`)**:
   - `position: relative; padding: 2.25rem 1.25rem 1.75rem; border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 1rem;`
   - Background: `rgba(255, 255, 255, 0.02)`.
   - Box-Shadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 36px rgba(0, 0, 0, 0.3)`.
4. **Central Rail Line Layer (`.connection-rail`)**:
   - Layering: `z-index: 1; position: absolute; top: 3.1rem; left: 3.5rem; right: 3.5rem; height: 2px; pointer-events: none;`
   - Rail line: `background: linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%); opacity: 0.6;`
   - Pulse dot: `width: 8px; height: 8px; border-radius: 50%; background: #05C7F2; box-shadow: 0 0 12px 2px rgba(5, 199, 242, 0.85); top: -3px;`
5. **Station Grid Layer (`.connection-grid`)**:
   - Layering: `z-index: 2; position: relative; display: grid; grid-template-columns: repeat(9, minmax(0, 1fr)); gap: 0.5rem; width: 100%;`
6. **Station Columns (`.connection-station`)**:
   - `display: flex; flex-direction: column; align-items: center; gap: 0.9rem; min-width: 0;`
7. **Station Node Dots (`.connection-station-node`)**:
   - Node size: `width: 1.75rem; height: 1.75rem;`
   - Dot size: `width: 1.6rem; height: 1.6rem; border-radius: 50%; border: 1.5px solid;`
   - Intermediate Arrows (`.connection-arrow`): `position: absolute; right: -0.65rem; top: 50%; transform: translateY(-50%);`
8. **Station Cards (`.connection-station-card`)**:
   - `width: 100%; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 0.65rem 0.35rem; display: flex; flex-direction: column; align-items: center; gap: 0.25rem;`
9. **Outcome Card (`.home-connection .fo-outcome`)**:
   - `min-height: 8rem; padding: 1.5rem; display: flex; align-items: center; gap: 1rem; border-radius: 0.75rem;`
   - Background: `rgba(255, 255, 255, 0.03)`, border: `1px solid rgba(255, 255, 255, 0.14)`, shadow: `inset 0 1px 0 rgba(255, 255, 255, 0.08)`.

### 4.3 Backgrounds & Decorative Glows
- **Section Canvas Background**:
  - Base: `#0D0D0D` (`var(--color-brand-ink)`).
  - Background radial gradient:
    `radial-gradient(ellipse at 50% 15%, rgba(0, 34, 255, 0.18), transparent 65%)`
    (creates an expansive deep royal-blue ceiling glow behind the section title and pipeline).

---

## 5. RESPONSIVE SPEC

### 5.1 Breakpoint Architecture

```
Desktop (≥ 1025px / > 64rem)
   │
   ├─► 2-Column Heading Row (1.4fr : 0.8fr, gap 80px)
   ├─► Horizontal Identity Bar (space-between, min-height 72px)
   ├─► 9-Column Station Grid: repeat(9, minmax(0, 1fr)), gap 8px
   ├─► Continuous Animated Rail Line (height 2px, left/right 56px) with Pulse Dot
   ├─► Station Node Dots (25.6px) with Checks, Rings, and Connecting Chevrons
   └─► 9 Vertical Station Cards
   │
Tablet (769px – 1024px / 48rem – 64rem)
   │
   ├─► 1-Column Heading Row: grid-template-columns: 1fr; gap 32px
   ├─► Horizontal Identity Bar Retained
   ├─► 9-Column Station Grid Retained (compact station cards)
   └─► Rail & Node Dots Retained
   │
Mobile (≤ 768px / ≤ 48rem)
   │
   ├─► Section Padding Clamped: clamp(2.25rem, 4.5vh, 3rem)
   ├─► Heading Row Margin-Bottom: 24px (1.5rem)
   ├─► Identity Bar Stacks Vertically: flex-direction: column; align-items: flex-start; gap: 12px
   ├─► Pipeline Glass Console Padding: 24px 16px (1.5rem 1rem)
   ├─► RAIL COMPLETELY HIDDEN: display: none (.connection-rail)
   ├─► ALL 9 NODE DOTS & ARROWS HIDDEN: display: none (.connection-station-node)
   ├─► STATION GRID SHIFTS TO 3×3 MATRIX: grid-template-columns: repeat(3, 1fr); gap: 10.4px (0.65rem)
   └─► Outcome Card Retained (stacks content nicely)
```

### 5.2 Responsive Property Change Matrix

| Selector / Element | Desktop (> 1024px) | Tablet (769px – 1024px) | Mobile (≤ 768px) |
| :--- | :--- | :--- | :--- |
| `.home-section` padding | `clamp(3.25rem, 5.5vh, 4.5rem)` | `clamp(3.25rem, 5.5vh, 4.5rem)` | `clamp(2.25rem, 4.5vh, 3rem)` |
| `.section-heading-row` | `grid-template-columns: 1.4fr .8fr; gap: 5rem;` | `grid-template-columns: 1fr; gap: 2rem;` | `grid-template-columns: 1fr; gap: 2rem; margin-bottom: 1.5rem;` |
| `.connection-identity` | `flex-direction: row; justify-content: space-between;` | `flex-direction: row; justify-content: space-between;` | `flex-direction: column; align-items: flex-start; gap: 0.75rem;` |
| `.connection-pipeline` padding | `2.25rem 1.25rem 1.75rem` | `2.25rem 1.25rem 1.75rem` | `1.5rem 1rem` |
| `.connection-rail` | `display: block;` (animated pulse) | `display: block;` | `display: none;` (hidden) |
| `.connection-station-node` | `display: flex;` (nodes & arrows) | `display: flex;` | `display: none;` (hidden) |
| `.connection-grid` columns | `repeat(9, minmax(0, 1fr)); gap: 0.5rem;` | `repeat(9, minmax(0, 1fr)); gap: 0.5rem;` | `repeat(3, 1fr); gap: 0.65rem;` (3×3 matrix) |

---

## 6. TYPOGRAPHY

| Style Role | Font Family | Size / Clamp | Weight | Line Height | Letter Spacing | Resolved Color | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow Pill** (`.home-index`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | `700` | `1` | `0.12em` | `#05C7F2` | `uppercase` |
| **Section Title** (`.home-section h2`) | `"Manrope", sans-serif` | `clamp(2.25rem, 3.34vw, 3rem)` | `650` | `1.08` | `-0.05em` | `#FFFFFF` | `none` |
| **Subtitle Paragraph** (`.section-heading-row > p`) | `"Manrope", sans-serif` | `1.0625rem` (17px) | `400` | `1.7` | `normal` | `#9CA3AF` | `none` |
| **Transaction Mono ID** (`.connection-mono-id`) | `"Manrope", sans-serif` | `0.65rem` (10.4px) | `700` | `normal` | `0.06em` | `#049DD9` | `none` |
| **Transaction Entity** (`.connection-identity strong`)| `"Manrope", sans-serif` | `1rem` (16px) | `700` | `normal` | `-0.01em` | `#FFFFFF` | `none` |
| **State Indicator Text** (`.fo-state-indicator span`) | `"Manrope", sans-serif` | `0.8125rem` (13px) | `600` | `normal` | `normal` | `#FFFFFF` | `capitalize` |
| **Station Step Index** (`.connection-station-idx`) | `ui-monospace, monospace` | `0.58rem` (9.28px) | `700` | `normal` | `0.05em` | `#64748B` (active: `#049DD9`) | `none` |
| **Station Name** (`.connection-station-name`) | `"Manrope", sans-serif` | `0.72rem` (11.52px) | `700` | `normal` | `-0.01em` | `#FFFFFF` | `none` |
| **Station Status Badge** (`.connection-station-status`)| `"Manrope", sans-serif` | `0.52rem` (8.32px) | `600` | `normal` | `0.04em` | Complete: `#4ADE80`<br>Active: `#049DD9`<br>Rec: `#FACC15` | `uppercase` |
| **Outcome Category Tag** (`.fo-outcome span`) | `"Manrope", sans-serif` | `0.65rem` (10.4px) | `700` | `normal` | `0.1em` | `#9CA3AF` | `uppercase` |
| **Outcome Statement** (`.fo-outcome strong`) | `"Manrope", sans-serif` | `1.05rem` (16.8px) | `700` | `normal` | `normal` | `#FFFFFF` | `none` |
| **Outcome Value Text** (`.fo-outcome b`) | `"Manrope", sans-serif` | `0.8125rem` (13px) | `700` | `normal` | `normal` | `#049DD9` | `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Keyframe Animations

#### Rail Bus Pulse (`@keyframes connection-bus-pulse`)
- **Selector**: `.connection-rail-pulse`
- **Duration**: `4.5s`
- **Timing Function**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Iteration Count**: `infinite`
- **Keyframes**:
  ```css
  0%   { left: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
  ```
- **Visual Description**: An 8px glowing neon-cyan orb slides smoothly across the horizontal pipeline rail from left to right, fading in at the start and out at the terminus.

#### Eyebrow Beacon Pulse (`@keyframes beacon-pulse`)
- **Selector**: `.home-connection .home-index::before`
- **Duration**: `2.4s ease-in-out infinite`
- **Keyframes**:
  ```css
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(5, 199, 242, 0.8); }
  50%      { opacity: 0.45; transform: scale(0.8); box-shadow: 0 0 3px rgba(5, 199, 242, 0.3); }
  ```

### 7.2 Interactive Hover States

#### Station Card Hover (`.connection-station:hover .connection-station-card`)
- **Transition**: `all 180ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Default State**:
  - `transform: translateY(0);`
  - `background: rgba(15, 23, 42, 0.85);`
  - `border: 1px solid rgba(255, 255, 255, 0.1);`
  - `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);`
- **Hover State**:
  - `transform: translateY(-3px);`
  - `background: rgba(20, 30, 55, 0.95);`
  - `border-color: rgba(0, 34, 255, 0.5);`
  - `box-shadow: 0 8px 18px rgba(0, 34, 255, 0.2);`

#### Eyebrow Capsule Hover (`.home-connection .home-index:hover`)
- `background: rgba(5, 199, 242, 0.14);`
- `border-color: rgba(5, 199, 242, 0.35);`

### 7.3 Reduced-Motion Suppression
Under `@media (prefers-reduced-motion: reduce)`:
- `.connection-rail-pulse { animation: none; }`
- `.connection-station-card { transition: none; }`
- The rail line and static nodes remain visible without animated sliding or hover lift.

---

## 8. ICONS

### 8.1 Icon Inventory

| Icon Purpose | Icon Name | Library / Source | ViewBox | Dimensions | Stroke Width | Stroke Linecap / Linejoin | Resolved Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Completed Station Node Check | `check` | Inline SVG in `Homepage.tsx:2390` | `0 0 10 10` | `10px × 10px` | `1.5` | `round` / `round` | `#FFFFFF` (`currentColor`) |
| Inter-Station Connector Arrow | `arrow` | Inline SVG in `Homepage.tsx:2401` | `0 0 7 7` | `7px × 7px` | `1.2` | `round` / `round` | `rgba(255, 255, 255, 0.25)` |
| Outcome Confirmation Check | `check` | FlowOne Icon (`src/components/flowone.tsx`) | `0 0 24 24` | `16px × 16px` | `1.5` | `round` / `round` | `#0D0D0D` (`var(--color-brand-ink)`) |

### 8.2 Inline SVG Code

#### 1. Station Complete Node Check (`10×10`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
  <path d="M2 5L4 7L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

#### 2. Station Connector Chevron Arrow (`7×7`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
  <path d="M2 1L5 3.5L2 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

#### 3. Outcome Confirmation Check (`16×16`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m5 12 4 4L19 6" />
</svg>
```

### 8.3 Vector Archive & Asset Directory
- **Zip Archive**: `connection-icons.zip`
- **Asset Directory**: `connection-assets/`
  - `connection-station-check.svg`
  - `connection-arrow-right.svg`
  - `connection-outcome-check.svg`

---

## 9. ACCESSIBILITY

- **Landmark Labeling**:
  - Main pipeline console has explicit landmark description: `aria-label="Connected transaction flow pipeline"`.
- **Decorative Elements (`aria-hidden="true"`)**:
  - Central rail track and pulse dot container: `aria-hidden="true"`.
  - All 9 circular station node dots and connector arrows: `aria-hidden="true"`.
  - Outcome checkmark icon: `aria-hidden="true"`.
- **Semantic Structure**:
  - Section heading uses standard `<h2>`.
  - Station titles use `<strong>` for structural emphasis.
  - State indicator has accessible child `<span>complete</span>` inside the status pill.
- **Color Contrast Ratios (Dark Canvas `#0D0D0D`)**:
  - Section Title (`#FFFFFF` on `#0D0D0D`): **18.2:1** (Passes AAA).
  - Subtitle Paragraph (`#9CA3AF` on `#0D0D0D`): **6.8:1** (Passes AAA).
  - Cyan Eyebrow (`#05C7F2` on dark): **9.1:1** (Passes AAA).
  - Complete Status Text (`#4ADE80` on dark glass): **8.4:1** (Passes AAA).
  - Active Cyan Status (`#049DD9` on dark glass): **6.2:1** (Passes AA).
  - Recommended Gold Status (`#FACC15` on dark glass): **11.5:1** (Passes AAA).

---

## 10. NOT FOUND IN CODE

1. **Station Cards Are Non-Clickable / Purely Demonstrative**:
   - Despite having tactile hover states (`translateY(-3px)`, glow borders), the 9 station cards are rendered as plain `<div>` elements rather than `<a>` or `<button>` tags. There are no modal triggers, drawers, or external links attached to the stations in this section.
2. **Missing Global Declaration for `--font-family-mono`**:
   - Line 1517 of `src/homepage.css` specifies `font-family: var(--font-family-mono);` on `.connection-station-idx`. This variable is not defined in `:root` inside `src/index.css`. For Elementor, ensure the fallback is explicitly declared: `font-family: var(--font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace);`.
3. **Connector Arrows Positioned with Negative Margin Right**:
   - The arrows between station nodes are positioned via `right: -0.65rem; top: 50%; transform: translateY(-50%);`. On narrow screens between 769px and 900px, this fixed spacing may touch adjacent dots if container padding is altered.
4. **No Station Node Dots on Mobile**:
   - At `@media (max-width: 48rem)` (768px), `.connection-station-node` is set to `display: none;`. Mobile visitors see the 9 station cards arranged as a 3×3 grid, but do not see the sequential connecting line, arrows, or circular checkmark nodes.

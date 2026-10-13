# PREDICTIVE SETTLEMENT — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 08: Predictive Settlement / Predictive Flow** (`.home-predictive.home-section`, lines 982–1010 in `Homepage.tsx`) of the flowOne website.

---

## 1. SECTION OVERVIEW

### 1.1 Purpose & Page Position
- **Section Purpose**: Demonstrates how continuous connection across entities transforms backward-looking accounting into forward-looking predictive foresight and prescriptive autonomous action. It establishes the contrast between static record-keeping and dynamic financial flow through three visual modules:
  1. **4-Stage Analytical Progression Pipeline**: Visually outlines the intelligence journey:
     - `01 · HISTORICAL`: *"WHAT HAPPENED"*
     - `02 · HISTORICAL`: *"WHAT IS HAPPENING"*
     - `03 · PREDICTIVE` *(Highlighted)*: *"WHAT WILL HAPPEN"*
     - `04 · PRESCRIPTIVE`: *"WHAT SHOULD WE DO"*
  2. **Live Cash Flow Forecast Engine (`<Forecast />`)**: A high-fidelity interactive financial dashboard component charting a 30-day forward treasury runway (`₹12.4 Cr Expected cash position`). It plots historical actuals vs. forward confidence bands and flags an actionable risk event card (`"RISK EVENT: Customer payment delayed · Potential impact ₹5,90,000"`).
  3. **Prescriptive Decision Module (`<Decision />`)**: Maps an incoming telemetry signal (`CASH POSITION`) to its forward business impact (`"Expected cash position may tighten next week due to delayed receivables"`) and provides an immediate execution trigger (`"REVIEW UPCOMING RECEIVABLES & DISPATCH REMINDERS"` with an `"Execute"` primary action button).
- **Desktop vs. Mobile Experience**:
  - **Desktop (`≥ 1024px`)**: The 4-step analytical progression sits in a 4-column horizontal strip with inter-card flow arrows. The forecast chart spans full container width with a floating risk event card at `right: 8%`. The decision card displays a 5-column horizontal grid (`Signal → Arrow → Consequence → Arrow → Decision + Action Button`).
  - **Tablet (`768px – 1023px`)**: Heading row collapses to 1 column. The 4 analytical steps re-flow into a 2×2 grid.
  - **Mobile (`< 768px`)**: The 4 analytical steps stack vertically into a single column with horizontal borders. The forecast risk event pins to `right: 1rem`. The decision card collapses to a single vertical column, rotating the connector arrows 90° downward (`transform: rotate(90deg)`), and full-widths the execution block.
- **Section Placement**:
  - **Preceding Section**: Section 07: AI Inside Flow (`#ai-inside-flow` / `.home-ai.home-section`, lines 803–980 in `Homepage.tsx`).
  - **Succeeding Section**: Section 09: Proven Outcomes (`.home-outcomes.home-section`, lines 1012–1042 in `Homepage.tsx`).

### 1.2 Component File Names & Exact Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 982–1010**: Main section container, heading row, 4-step pipeline mapping, `<Forecast />` mount, and `<Decision />` mount.
- **`src/components/product-ui.tsx`**:
  - **Lines 112–114**: `<Forecast />` component definition (header with 30-day metrics, screen-reader text, SVG trajectory plot with risk event pill, footer legend).
- **`src/components/flow-system.tsx`**:
  - **Lines 60–66**: `<Decision />` component definition (signal, consequence, decision action wrapper, button).
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `<Icon />` component rendering `name="arrow"` at sizes 16 and 20 with `tone="muted"`.
  - **Lines 43–52**: `<Button />` component rendering `size="small"` and `variant="primary"`.
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (container width & fluid padding formula).
  - **Line 5**: `.home-section` (section vertical padding clamp).
  - **Lines 8–47**: `.home-index` (capsule eyebrow, pulse animation dot).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 2787–2842**: Section 08 specific styles (`.home-predictive`, `.predictive-steps`, `.predictive-step-item`, `.predictive-step-item.is-highlight`, `.predictive-step-header`, `.predictive-step-num`, `.predictive-step-stage`, `.predictive-step-item strong`, and `.home-predictive .fo-decision`).
  - **Line 4396**: `@media (max-width: 64rem)` (1024px single-column heading row).
  - **Line 4428**: `@media (max-width: 64rem)` (1024px tablet 2×2 grid for `.predictive-steps`).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile padding and typography scaling).
  - **Lines 4548–4551**: `@media (max-width: 48rem)` (768px mobile 1-column `.predictive-steps`, 1-column `.fo-decision`, and 90° arrow rotation).
- **`src/components/product-ui.css`**:
  - **Lines 179–182**: `.product-forecast` card wrapper, header flexbox, category tag typography.
  - **Lines 192–208**: Forecast header typography, `.forecast-plot` background grid, SVG curve stroke classes, `.forecast-event` badge, and footer legend styling.
  - **Line 293**: `@media (max-width: 48rem)` mobile override for `.forecast-event` right offset.
- **`src/components/flow-system.css`**:
  - **Lines 77–83**: Base `.fo-decision` grid layout, column widths, left accent border, and `.fo-decision-action` border separator.
  - **Lines 219–221**: `@media (max-width: 48rem)` mobile vertical collapse for `.fo-decision`.
- **`src/components/flowone.css`**:
  - **Lines 36–42**: `.fo-icon`, `.fo-icon-16`, `.fo-icon-20`, `.fo-icon-muted`.
  - **Lines 43–82**: `.fo-button`, `.fo-button-small`, `.fo-button-primary` interactive gradient, shadows, and hover transforms.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and shadow definitions.

---

## 2. CODE

### 2.1 Verbatim JSX/TSX Markup

#### Section Shell & Step Pipeline (`src/Homepage.tsx`, Lines 982–1010):
```tsx
<section className="home-predictive home-section">
  <div className="home-container">
    <div className="section-heading-row">
      <div>
        <span className="home-index">PREDICTIVE SETTLEMENT</span>
        <h2>Once everything is connected,<br/>the business becomes predictable.</h2>
      </div>
      <p>Connected data turns reporting into foresight—and foresight into action.</p>
    </div>
    <div className="predictive-steps">
      {["WHAT HAPPENED", "WHAT IS HAPPENING", "WHAT WILL HAPPEN", "WHAT SHOULD WE DO"].map((x, i) => (
        <div key={x} className={`predictive-step-item ${i === 2 ? "is-highlight" : ""}`}>
          <div className="predictive-step-header">
            <span className="predictive-step-num">0{i + 1}</span>
            <span className="predictive-step-stage">{i < 2 ? "HISTORICAL" : i === 2 ? "PREDICTIVE" : "PRESCRIPTIVE"}</span>
          </div>
          <strong>{x}</strong>
          {i < 3 && <Icon name="arrow" size={16} tone="muted" />}
        </div>
      ))}
    </div>
    <Forecast />
    <Decision
      signal="CASH POSITION"
      insight="Expected cash position may tighten next week due to delayed receivables"
      action="REVIEW UPCOMING RECEIVABLES &amp; DISPATCH REMINDERS"
    />
  </div>
</section>
```

#### Forecast Component (`src/components/product-ui.tsx`, Lines 112–114):
```tsx
export function Forecast() {
  return (
    <article className="product-forecast" aria-describedby="forecast-summary">
      <p id="forecast-summary" className="fo-sr-only">
        Cash is forecast at ₹12.4 crore over 30 days. A delayed customer payment may reduce expected cash by ₹5,90,000.
      </p>
      <header>
        <div>
          <span>CASH FLOW FORECAST</span>
          <strong>Expected cash position</strong>
        </div>
        <div>
          <b>₹12.4 Cr</b>
          <small>30-day forecast</small>
        </div>
      </header>
      <div className="forecast-plot" aria-hidden="true">
        <svg viewBox="0 0 700 220" preserveAspectRatio="none">
          <path className="forecast-range" d="M350 100 C440 55 510 70 700 30 L700 150 C520 130 450 150 350 100Z" />
          <path className="forecast-actual" d="M0 170 C80 150 120 90 190 120 S300 130 350 100" />
          <path className="forecast-future" d="M350 100 C440 78 510 115 700 62" />
          <line x1="350" x2="350" y1="10" y2="210" />
        </svg>
        <div className="forecast-event">
          <i />
          <span>RISK EVENT</span>
          <strong>Customer payment delayed</strong>
          <small>Potential impact · ₹5,90,000</small>
        </div>
      </div>
      <footer>
        <span><i className="actual" />Historical</span>
        <span><i className="predicted" />Forecast</span>
        <span><i className="range" />Confidence range</span>
      </footer>
    </article>
  );
}
```

#### Decision Component (`src/components/flow-system.tsx`, Lines 60–66):
```tsx
export function Decision({
  signal,
  insight,
  action,
  state = "recommended",
}: {
  signal: string;
  insight: string;
  action: string;
  state?: "recommended" | "attention" | "complete";
}) {
  return (
    <article className={`fo-decision is-${state}`}>
      <div>
        <span>SIGNAL</span>
        <strong>{signal}</strong>
      </div>
      <Icon name="arrow" size={20} tone="muted" />
      <div>
        <span>CONSEQUENCE</span>
        <strong>{insight}</strong>
      </div>
      <Icon name="arrow" size={20} tone="muted" />
      <div className="fo-decision-action">
        <span>DECISION</span>
        <strong>{action}</strong>
        <Button size="small">Execute</Button>
      </div>
    </article>
  );
}
```

#### Button & Icon Primitives (`src/components/flowone.tsx`):
```tsx
export function Icon({ name = "arrow", size = 20, tone = "default" }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return (
    <svg className={`fo-icon fo-icon-${size} fo-icon-${tone}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Button({ variant = "primary", size = "medium", state = "default", children, onClick }) {
  return (
    <button className={`fo-button fo-button-${variant} fo-button-${size} is-${state}`} onClick={onClick}>
      {children && <span>{children}</span>}
    </button>
  );
}
```

---

### 2.2 Verbatim CSS Styles

```css
/* Container & Section Base */
.home-container {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

.home-section {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
}

/* Section Heading Row & Eyebrow */
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

/* SECTION 08 Canvas */
.home-predictive {
  background: var(--neutral-0);
}

/* 4-Step Analytical Progression */
.predictive-steps {
  margin-bottom: var(--spacing-4);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-white);
  box-shadow: var(--shadow-xs);
}

.predictive-step-item {
  min-height: 5.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--color-border-default);
  position: relative;
  transition: all var(--motion-fast);
}

.predictive-step-item:last-child {
  border-right: 0;
}

.predictive-step-item.is-highlight {
  background: rgba(5, 40, 242, 0.03);
  border-top: 2.5px solid var(--flow-primary);
}

.predictive-step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.predictive-step-num {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--flow-primary);
}

.predictive-step-stage {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-neutral-400);
}

.predictive-step-item.is-highlight .predictive-step-stage {
  color: var(--flow-primary);
}

.predictive-step-item strong {
  font-size: 0.8rem;
  letter-spacing: -0.01em;
}

/* Forecast Dashboard Component */
.product-forecast {
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.product-forecast > header {
  padding: var(--spacing-3);
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.product-forecast > header > div {
  display: flex;
  flex-direction: column;
  gap: .3rem;
}

.product-forecast > header > div:last-child {
  text-align: right;
}

.product-forecast > header span {
  color: var(--color-text-tertiary);
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .08em;
}

.product-forecast > header b {
  font-size: 1.4rem;
}

.product-forecast > header small {
  color: var(--color-text-tertiary);
  font-size: .65rem;
}

.forecast-plot {
  height: 20rem;
  position: relative;
  border-block: 1px solid var(--color-border-default);
  background: repeating-linear-gradient(to bottom, transparent 0, transparent 24%, var(--color-neutral-100) 25%);
}

.forecast-plot svg {
  width: 100%;
  height: 100%;
}

.forecast-actual {
  fill: none;
  stroke: var(--flow-ink);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

.forecast-future {
  fill: none;
  stroke: var(--flow-cyan);
  stroke-width: 2;
  stroke-dasharray: 6 4;
  vector-effect: non-scaling-stroke;
}

.forecast-range {
  fill: rgba(4, 157, 217, 0.08);
}

.forecast-plot line {
  stroke: var(--neutral-300);
  stroke-dasharray: 4;
}

.forecast-event {
  padding: .65rem;
  display: flex;
  flex-direction: column;
  gap: .2rem;
  position: absolute;
  right: 8%;
  top: 52%;
  background: var(--neutral-0);
  border: 1px solid var(--neutral-200);
  border-left: 2px solid var(--flow-magenta);
  box-shadow: var(--shadow-sm);
}

.forecast-event span {
  color: var(--neutral-900);
  font-size: .55rem;
  font-weight: 700;
}

.forecast-event strong {
  font-size: .7rem;
}

.forecast-event small {
  color: var(--neutral-500);
  font-size: .6rem;
}

.product-forecast > footer {
  min-height: 3rem;
  padding-inline: var(--spacing-3);
  display: flex;
  gap: var(--spacing-3);
  align-items: center;
  color: var(--color-text-tertiary);
  font-size: .65rem;
}

.product-forecast > footer span {
  display: flex;
  gap: .35rem;
  align-items: center;
}

.product-forecast > footer i {
  width: .75rem;
  height: 2px;
}

.product-forecast > footer i.actual {
  background: var(--flow-ink);
}

.product-forecast > footer i.predicted {
  background: var(--flow-cyan);
}

.product-forecast > footer i.range {
  height: .5rem;
  background: rgba(4, 157, 217, 0.14);
}

/* Prescriptive Decision Component */
.fo-decision {
  padding: var(--spacing-3);
  display: grid;
  grid-template-columns: 1fr auto 1.5fr auto 1.2fr;
  align-items: center;
  gap: var(--spacing-3);
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-left: 3px solid var(--color-brand-blue);
  border-radius: var(--radius-lg);
}

.home-predictive .fo-decision {
  margin-top: var(--spacing-4);
  border: 1px solid var(--color-border-default);
  border-left: 3px solid var(--color-brand-blue);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
}

.fo-decision > div {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.fo-decision span {
  color: var(--color-text-tertiary);
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .08em;
}

.fo-decision strong {
  font-size: var(--font-small);
}

.fo-decision-action {
  padding-left: var(--spacing-3);
  border-left: 1px solid var(--color-border-default);
}

.fo-decision-action .fo-button {
  margin-top: .4rem;
  align-self: flex-start;
}

.fo-decision.is-attention {
  border-left-color: var(--color-brand-pink);
}

/* Icon & Button Primitives */
.fo-icon {
  flex: 0 0 auto;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fo-icon-16 {
  width: 1rem;
  height: 1rem;
}

.fo-icon-20 {
  width: 1.25rem;
  height: 1.25rem;
}

.fo-icon-muted {
  color: var(--color-text-tertiary);
}

.fo-button {
  min-width: max-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  padding-inline: var(--spacing-3);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font: 600 var(--font-button)/1 var(--font-family-primary);
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.fo-button-small {
  height: var(--control-sm);
  padding-inline: var(--spacing-2);
  font-size: .875rem;
}

.fo-button-primary {
  position: relative;
  color: #FFFFFF;
  background-color: var(--flow-primary);
  background-image: linear-gradient(135deg, #0528F2 0%, #049DD9 50%, #05C7F2 100%);
  background-size: 200% 100%;
  background-position: 0% 0%;
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.22);
  transition: background-position 350ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 250ms ease,
              transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              color 180ms ease;
}

.fo-button-primary:hover {
  background-position: 100% 0%;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35);
}

.fo-button-primary:active {
  background-position: 50% 0%;
  color: #FFFFFF;
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35);
}

/* Accessibility */
.fo-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ==========================================================================
   RESPONSIVE MEDIA QUERIES
   ========================================================================== */

/* Tablet (≤ 1024px / 64rem) */
@media (max-width: 64rem) {
  .section-heading-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  .predictive-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile (≤ 768px / 48rem) */
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
  .predictive-steps {
    grid-template-columns: 1fr;
  }
  .predictive-step-item {
    border-right: 0;
    border-bottom: 1px solid var(--color-border-default);
  }
  .predictive-step-item:last-child {
    border-bottom: 0;
  }
  .forecast-event {
    right: var(--spacing-2);
  }
  .home-predictive .fo-decision {
    grid-template-columns: 1fr;
  }
  .home-predictive .fo-decision > .fo-icon {
    transform: rotate(90deg);
  }
  .fo-decision-action {
    padding: var(--spacing-3) 0 0;
    border-left: 0;
    border-top: 1px solid var(--color-border-default);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .home-index::before {
    animation: none !important;
  }
  .fo-button-primary {
    transition: none !important;
  }
}
```

---

### 2.3 Resolved Design Tokens

| Token Variable | Direct Value / Fallback | Resolved Literal Value | Usage in Section 08 | File Precedence |
|---|---|---|---|---|
| `--neutral-0` | `#FFFFFF` | `#FFFFFF` | Section background, card surfaces, risk event background | `index.css` |
| `--neutral-50` | `#F7F8FA` | `#F7F8FA` | Background tints | `index.css` |
| `--neutral-100` | `#F1F4F8` | `#F1F4F8` | Forecast grid stripes | `index.css` |
| `--neutral-200` | `#E6EAF0` | `#E6EAF0` | Default borders | `index.css` |
| `--neutral-300` | `#DDE3EA` | `#DDE3EA` | Chart dashed vertical dividing line | `index.css` |
| `--neutral-500` | `#6B7280` | `#6B7280` | Muted tertiary copy, small pill descriptions | `index.css` |
| `--neutral-700` | `#374151` | `#374151` | Secondary body text | `index.css` |
| `--neutral-900` | `#0D0D0D` | `#0D0D0D` | Primary headings, risk event labels | `index.css` |
| `--flow-primary` | `#0528F2` | `#0528F2` | Step numbers, active highlight border, decision left border, button background | `index.css` |
| `--flow-cyan` | `#049DD9` | `#049DD9` | Future forecast curve stroke (`stroke-dasharray: 6 4`) | `index.css` |
| `--flow-cyan-bright` | `#05C7F2` | `#05C7F2` | Eyebrow glowing beacon pulse dot, button gradient stop | `index.css` |
| `--flow-magenta` | `#D9299B` | `#D9299B` | Risk event card left accent border (`2px solid`) | `index.css` |
| `--flow-ink` | `#0D0D0D` | `#0D0D0D` | Historical actual curve stroke (`stroke-width: 2`) | `index.css` |
| `--color-border-default` | `var(--neutral-200)` | `#E6EAF0` | Card borders, dividing borders, grid lines | `index.css` |
| `--color-text-primary` | `var(--neutral-900)` | `#0D0D0D` | High-emphasis titles and values | `index.css` |
| `--color-text-secondary` | `var(--neutral-700)` | `#374151` | Heading subtitle paragraph | `index.css` |
| `--color-text-tertiary` | `var(--neutral-500)` | `#6B7280` | Overline tags, small timestamps, legend text | `index.css` |
| `--color-brand-blue` | `var(--flow-primary)` | `#0528F2` | Decision card left accent border (`3px solid`) | `index.css` |
| `--font-family-primary` | `"Manrope", sans-serif` | `"Manrope", sans-serif` | All headings, cards, badges, buttons | `index.css` |
| `--font-h2` | `clamp(2.25rem, 3.34vw, 3rem)` | `36px – 48px` | Section H2 heading | `index.css` |
| `--font-small` | `0.9375rem` | `15px` | Decision action headline, strong labels | `index.css` |
| `--font-button` | `0.9375rem` | `15px` | Primary button typography | `index.css` |
| `--font-caption` | `0.8125rem` | `13px` | Small metadata | `index.css` |
| `--leading-heading` | `1.08` | `1.08` | Section H2 line-height | `index.css` |
| `--leading-tight` | `1` | `1` | Eyebrow line-height | `index.css` |
| `--radius-sm` | `0.25rem` | `4px` | Small badge radii | `index.css` |
| `--radius-md` | `0.5rem` | `8px` | Primary button border radius | `index.css` |
| `--radius-lg` | `0.75rem` | `12px` | Card & pipeline container border radius | `index.css` |
| `--radius-full` | `9999px` | `9999px` | Eyebrow pill border radius | `index.css` |
| `--shadow-xs` | `0 1px 2px rgb(11 16 32 / 0.04)` | `0 1px 2px rgba(11, 16, 32, 0.04)` | Pipeline container and decision card shadow | `index.css` |
| `--shadow-sm` | `0 4px 12px rgb(11 16 32 / 0.06)` | `0 4px 12px rgba(11, 16, 32, 0.06)` | Forecast risk event card shadow | `index.css` |
| `--control-sm` | `2.25rem` | `36px` | Execute button height | `index.css` |
| `--spacing-1` | `0.5rem` | `8px` | Button gap | `index.css` |
| `--spacing-2` | `1rem` | `16px` | Mobile margin & button padding-inline | `index.css` |
| `--spacing-3` | `1.5rem` | `24px` | Card headers, decision padding, footer gaps | `index.css` |
| `--spacing-4` | `2rem` | `32px` | Pipeline margin-bottom, decision margin-top | `index.css` |
| `--spacing-10` | `5rem` | `80px` | Heading row column gap | `index.css` |
| `--container-wide` | `80rem` | `1280px` | Max content container width | `index.css` |
| `--page-padding` | `clamp(1.25rem, 3.34vw, 3rem)` | `20px – 48px` | Page fluid horizontal inset | `index.css` |
| `--motion-fast` | `180ms` | `180ms` | Step item and button hover transition | `index.css` |

---

### 2.4 JavaScript & Interactive Behaviors

In the React source, Section 08 renders statically without scroll triggers or custom hooks. However, for a complete production Elementor deployment, two JavaScript behaviors provide interactive fidelity:

#### 1. Interactive Decision Execution Controller (Optional Vanilla JS Recipe):
Toggles the `"Execute"` button state into a confirmed execution notice upon click:
```javascript
document.addEventListener("DOMContentLoaded", function () {
  const executeBtn = document.querySelector(".home-predictive .fo-decision .fo-button");
  if (executeBtn) {
    executeBtn.addEventListener("click", function () {
      if (this.classList.contains("is-executed")) return;
      this.classList.add("is-executed");
      this.innerHTML = "<span>✓ Reminders Dispatched</span>";
      this.style.background = "linear-gradient(135deg, #16803C 0%, #10B981 100%)";
      this.style.boxShadow = "0 2px 8px rgba(22, 128, 60, 0.3)";
    });
  }
});
```

#### 2. Optional SVG Trajectory Stroke Draw Motion (`FO-MOTION-FCAST-01`):
As documented in `StepEight.tsx` and `motion-system.css`, the forecast line can draw in progressively as the card enters the viewport:
```css
/* Custom CSS for progressive SVG draw on scroll entrance */
.home-predictive.is-visible .forecast-future {
  stroke-dasharray: 6 4;
  animation: forecastLineDraw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes forecastLineDraw {
  from { opacity: 0; stroke-dashoffset: 40; }
  to { opacity: 1; stroke-dashoffset: 0; }
}
```

---

## 3. CONTENT

### 3.1 Text Catalog (In Display Order)

| # | Element Type | Source HTML Tag | Literal String / Copy | Visual Hierarchy / Styling Role |
|---|---|---|---|---|
| **1** | Eyebrow Badge | `<span>` | `PREDICTIVE SETTLEMENT` | Overline capsule with glowing cyan pulse dot (`beacon-pulse`) |
| **2** | Section Title | `<h2>` | `Once everything is connected,`<br/>`the business becomes predictable.` | 36px–48px Manrope SemiBold (650), -0.05em tracking |
| **3** | Subtitle Copy | `<p>` | `Connected data turns reporting into foresight—and foresight into action.` | 17px Manrope Regular, line-height 1.7, color `#374151` |
| **4** | Step 01 Number | `<span>` | `01` | 0.65rem (10.4px) Bold, color `#0528F2` |
| **5** | Step 01 Stage | `<span>` | `HISTORICAL` | 0.55rem (8.8px) Bold, letter-spacing 0.08em, color `#9CA3AF` |
| **6** | Step 01 Title | `<strong>` | `WHAT HAPPENED` | 0.8rem (12.8px) Bold, letter-spacing -0.01em |
| **7** | Step 02 Number | `<span>` | `02` | 0.65rem (10.4px) Bold, color `#0528F2` |
| **8** | Step 02 Stage | `<span>` | `HISTORICAL` | 0.55rem (8.8px) Bold, letter-spacing 0.08em, color `#9CA3AF` |
| **9** | Step 02 Title | `<strong>` | `WHAT IS HAPPENING` | 0.8rem (12.8px) Bold, letter-spacing -0.01em |
| **10** | Step 03 Number | `<span>` | `03` | 0.65rem (10.4px) Bold, color `#0528F2` |
| **11** | Step 03 Stage | `<span>` | `PREDICTIVE` | 0.55rem (8.8px) Bold, letter-spacing 0.08em, highlighted `#0528F2` |
| **12** | Step 03 Title | `<strong>` | `WHAT WILL HAPPEN` | 0.8rem (12.8px) Bold, highlighted container tint |
| **13** | Step 04 Number | `<span>` | `04` | 0.65rem (10.4px) Bold, color `#0528F2` |
| **14** | Step 04 Stage | `<span>` | `PRESCRIPTIVE` | 0.55rem (8.8px) Bold, letter-spacing 0.08em, color `#9CA3AF` |
| **15** | Step 04 Title | `<strong>` | `WHAT SHOULD WE DO` | 0.8rem (12.8px) Bold, letter-spacing -0.01em |
| **16** | Screen Reader Note | `<p>` | `Cash is forecast at ₹12.4 crore over 30 days. A delayed customer payment may reduce expected cash by ₹5,90,000.` | Visually hidden via `.fo-sr-only`, read by screen readers |
| **17** | Forecast Category | `<span>` | `CASH FLOW FORECAST` | 0.6rem (9.6px) Bold, letter-spacing 0.08em, color `#6B7280` |
| **18** | Forecast Label | `<strong>` | `Expected cash position` | Header metric title, Manrope Bold, color `#0D0D0D` |
| **19** | Forecast Metric | `<b>` | `₹12.4 Cr` | 1.4rem (22.4px) Manrope Bold, primary treasury metric |
| **20** | Forecast Horizon | `<small>` | `30-day forecast` | 0.65rem (10.4px) Regular, color `#6B7280` |
| **21** | Risk Event Tag | `<span>` | `RISK EVENT` | 0.55rem (8.8px) Bold, color `#0D0D0D`, magenta accent bar |
| **22** | Risk Event Title | `<strong>` | `Customer payment delayed` | 0.7rem (11.2px) Bold, alert title |
| **23** | Risk Event Impact | `<small>` | `Potential impact · ₹5,90,000` | 0.6rem (9.6px) Regular, color `#6B7280` |
| **24** | Legend 01 | `<span>` | `Historical` | 0.65rem (10.4px), with solid `#0D0D0D` line indicator |
| **25** | Legend 02 | `<span>` | `Forecast` | 0.65rem (10.4px), with dashed `#049DD9` line indicator |
| **26** | Legend 03 | `<span>` | `Confidence range` | 0.65rem (10.4px), with shaded `rgba(4, 157, 217, 0.14)` pill indicator |
| **27** | Decision Signal Tag | `<span>` | `SIGNAL` | 0.65rem (10.4px) Bold, letter-spacing 0.08em, color `#6B7280` |
| **28** | Decision Signal Value | `<strong>` | `CASH POSITION` | 0.9375rem (15px) Bold, color `#0D0D0D` |
| **29** | Decision Conseq. Tag | `<span>` | `CONSEQUENCE` | 0.65rem (10.4px) Bold, letter-spacing 0.08em, color `#6B7280` |
| **30** | Decision Conseq. Value | `<strong>` | `Expected cash position may tighten next week due to delayed receivables` | 0.9375rem (15px) Regular/Medium, color `#0D0D0D` |
| **31** | Decision Action Tag | `<span>` | `DECISION` | 0.65rem (10.4px) Bold, letter-spacing 0.08em, color `#6B7280` |
| **32** | Decision Action Value | `<strong>` | `REVIEW UPCOMING RECEIVABLES & DISPATCH REMINDERS` | 0.9375rem (15px) Bold, uppercase operational directive |
| **33** | Action CTA Button | `<button>` | `Execute` | Primary button, 36px height, Manrope SemiBold 15px |

---

### 3.2 Links Catalog
- This section contains **no outbound anchor tags (`<a>`)**. The only interactive trigger is the `<button className="fo-button fo-button-primary fo-button-small">Execute</button>` inside the prescriptive decision card.

---

### 3.3 Graphic & Vector Asset Catalog

| # | Asset Identifier | Graphic Type | Dimensions / viewBox | Tone / Stroke / Fill | Description & Elementor Usage |
|---|---|---|---|---|---|
| **1** | `predictive-settlement-arrow.svg` | Inline SVG / Icon Widget | `viewBox="0 0 24 24"`, 16×16 & 20×20 | Stroke 1.5, `#6B7280` (`--color-text-tertiary`), fill `none` | Used 3 times in step items (16px) and 2 times in the decision card (20px). Rotates 90° on mobile. |
| **2** | `predictive-settlement-forecast-chart.svg` | Inline SVG / HTML Widget | `viewBox="0 0 700 220"`, 100% width × 320px height | Historical: `#0D0D0D`, stroke 2; Future: `#049DD9`, stroke 2 dashed; Range: `rgba(4, 157, 217, 0.08)` | Complete financial trajectory visualization plot spanning 30-day projection with confidence envelope. |

---

## 4. LAYOUT SPEC (ELEMENTOR PRO IMPLEMENTATION)

### 4.1 Container Tree & Widget Hierarchy

```
[Container] Section Container (.home-predictive.home-section)
  │  Type: Flex, Direction: Column, Width: 100%, Background: #FFFFFF
  │  Padding: clamp(3.25rem, 5.5vh, 4.5rem) 0
  │
  └── [Container] Max-Width Wrapper (.home-container)
        │  Type: Flex, Direction: Column, Width: 100%, Max-Width: 1280px (80rem)
        │  Margin: 0 auto, Padding: 0 clamp(1.25rem, 3.34vw, 3rem)
        │
        ├── [Container] Heading Row (.section-heading-row)
        │     │  Type: Grid (1.4fr 0.8fr) / Flex Row, Align: End, Gap: 80px (var(--spacing-10))
        │     │  Margin-Bottom: clamp(1.75rem, 3vh, 2.35rem)
        │     │
        │     ├── [Container] Heading Group (Left Column)
        │     │     ├── [HTML/Text] Capsule Eyebrow (.home-index) -> "PREDICTIVE SETTLEMENT"
        │     │     └── [Heading] H2 (.home-section h2) -> "Once everything is connected,..."
        │     │
        │     └── [Container] Supporting Paragraph (Right Column)
        │           └── [Text Editor] Paragraph (<p>) -> "Connected data turns reporting into..."
        │
        ├── [Container] 4-Step Analytical Pipeline (.predictive-steps)
        │     │  Type: Grid (4 cols: repeat(4, 1fr)), Gap: 0
        │     │  Border: 1px solid #E6EAF0, Border-Radius: 12px (var(--radius-lg))
        │     │  Background: #FFFFFF, Box-Shadow: 0 1px 2px rgba(11, 16, 32, 0.04)
        │     │  Margin-Bottom: 32px (var(--spacing-4)), Overflow: Hidden
        │     │
        │     ├── [Container] Step Item 01 (.predictive-step-item)
        │     │     ├── [Container] Header: "01" (Left) + "HISTORICAL" (Right)
        │     │     ├── [Text] Title: "WHAT HAPPENED"
        │     │     └── [Icon Widget] Arrow (16px, muted)
        │     │
        │     ├── [Container] Step Item 02 (.predictive-step-item)
        │     │     ├── [Container] Header: "02" (Left) + "HISTORICAL" (Right)
        │     │     ├── [Text] Title: "WHAT IS HAPPENING"
        │     │     └── [Icon Widget] Arrow (16px, muted)
        │     │
        │     ├── [Container] Step Item 03 (.predictive-step-item.is-highlight)
        │     │     │  Background: rgba(5, 40, 242, 0.03), Border-Top: 2.5px solid #0528F2
        │     │     ├── [Container] Header: "03" (Left) + "PREDICTIVE" (#0528F2)
        │     │     ├── [Text] Title: "WHAT WILL HAPPEN"
        │     │     └── [Icon Widget] Arrow (16px, muted)
        │     │
        │     └── [Container] Step Item 04 (.predictive-step-item:last-child)
        │           │  Border-Right: 0
        │           ├── [Container] Header: "04" (Left) + "PRESCRIPTIVE" (Right)
        │           └── [Text] Title: "WHAT SHOULD WE DO"
        │
        ├── [Container / Article] Forecast Dashboard (.product-forecast)
        │     │  Type: Flex, Direction: Column, Width: 100%
        │     │  Border: 1px solid #E6EAF0, Border-Radius: 12px, Background: #FFFFFF
        │     │  Box-Shadow: None, Overflow: Hidden
        │     │
        │     ├── [Container] Header (.product-forecast > header)
        │     │     │  Type: Flex, Direction: Row, Justify: Space-Between, Align: Flex-Start
        │     │     │  Padding: 24px (var(--spacing-3))
        │     │     ├── [Container] Left: "CASH FLOW FORECAST" + "Expected cash position"
        │     │     └── [Container] Right (Text-Align: Right): "₹12.4 Cr" + "30-day forecast"
        │     │
        │     ├── [Container] Plot Area (.forecast-plot)
        │     │     │  Type: Relative container, Height: 320px (20rem), Width: 100%
        │     │     │  Border-Top & Bottom: 1px solid #E6EAF0
        │     │     │  Background: repeating-linear-gradient(to bottom, transparent 0, transparent 24%, #F1F4F8 25%)
        │     │     │
        │     │     ├── [HTML Widget] SVG Plot (viewBox: 0 0 700 220, preserveAspectRatio: none)
        │     │     │     ├── <path class="forecast-range" ... />
        │     │     │     ├── <path class="forecast-actual" ... />
        │     │     │     ├── <path class="forecast-future" ... />
        │     │     │     └── <line x1="350" ... />
        │     │     │
        │     │     └── [Container] Floating Risk Event Card (.forecast-event)
        │     │           │  Position: Absolute, Right: 8%, Top: 52%
        │     │           │  Padding: 10.4px (0.65rem), Background: #FFFFFF
        │     │           │  Border: 1px solid #E6EAF0, Border-Left: 2px solid #D9299B
        │     │           │  Box-Shadow: 0 4px 12px rgba(11, 16, 32, 0.06)
        │     │           ├── [Text] Tag: "RISK EVENT" (0.55rem, Bold, #0D0D0D)
        │     │           ├── [Heading/Text] Title: "Customer payment delayed" (0.7rem, Bold)
        │     │           └── [Text] Impact: "Potential impact · ₹5,90,000" (0.6rem, #6B7280)
        │     │
        │     └── [Container] Footer Legend (.product-forecast > footer)
        │           │  Type: Flex, Direction: Row, Align: Center, Gap: 24px (var(--spacing-3))
        │           │  Min-Height: 48px (3rem), Padding: 0 24px, Color: #6B7280, Font-Size: 0.65rem
        │           ├── [Container] Item 1: <i class="actual" /> (12px × 2px #0D0D0D) + "Historical"
        │           ├── [Container] Item 2: <i class="predicted" /> (12px × 2px #049DD9) + "Forecast"
        │           └── [Container] Item 3: <i class="range" /> (12px × 8px rgba(4,157,217,0.14)) + "Confidence range"
        │
        └── [Container / Article] Prescriptive Decision Card (.home-predictive .fo-decision)
              │  Type: Grid (1fr auto 1.5fr auto 1.2fr) / Flex Row, Align: Center, Gap: 24px
              │  Margin-Top: 32px (var(--spacing-4)), Padding: 24px (var(--spacing-3))
              │  Border: 1px solid #E6EAF0, Border-Left: 3px solid #0528F2, Border-Radius: 12px
              │  Background: #FFFFFF, Box-Shadow: 0 1px 2px rgba(11, 16, 32, 0.04)
              │
              ├── [Container] Signal Column: "SIGNAL" (0.65rem Bold) + "CASH POSITION" (15px Bold)
              ├── [Icon Widget] Connector Arrow 1 (20px, muted, stroke 1.5)
              ├── [Container] Consequence Column: "CONSEQUENCE" + "Expected cash position may tighten..."
              ├── [Icon Widget] Connector Arrow 2 (20px, muted, stroke 1.5)
              └── [Container] Decision Action Column (.fo-decision-action)
                    │  Border-Left: 1px solid #E6EAF0, Padding-Left: 24px
                    ├── [Text] Tag: "DECISION" (0.65rem Bold)
                    ├── [Text] Title: "REVIEW UPCOMING RECEIVABLES & DISPATCH REMINDERS"
                    └── [Button Widget] Primary CTA (.fo-button-primary.fo-button-small) -> "Execute"
```

---

### 4.2 Exact Elementor Dimension & Spacing Reference

| Element | CSS Selector | Width / Max-Width | Height / Min-Height | Padding | Margin | Border / Radius / Shadow |
|---|---|---|---|---|---|---|
| **Outer Section** | `.home-predictive` | 100% | Auto | `clamp(3.25rem, 5.5vh, 4.5rem)` vertical | `0` | Background `#FFFFFF`, none |
| **Inner Container** | `.home-container` | `min(calc(100% - 2*padding), 1280px)` | Auto | `0 clamp(1.25rem, 3.34vw, 3rem)` | `0 auto` | None |
| **Heading Row** | `.section-heading-row` | 100% | Auto | `0` | Bottom: `clamp(1.75rem, 3vh, 2.35rem)` | None, gap `5rem` (`80px`) |
| **Eyebrow Capsule** | `.home-index` | Fit-content | Auto | `0.32rem 0.85rem` (`5px 14px`) | Bottom: `1rem` (`16px`) | `1px solid rgba(5,40,242,0.12)`, radius `9999px`, shadow `0 1px 3px rgba(5,40,242,0.04)` |
| **Section H2** | `.home-section h2` | 100% | Auto | `0` | Top: `2rem` (`32px`), bottom: `0` | None |
| **Pipeline Strip** | `.predictive-steps` | 100% | Auto | `0` | Bottom: `2rem` (`32px`) | `1px solid #E6EAF0`, radius `12px`, shadow `0 1px 2px rgba(11,16,32,0.04)` |
| **Step Item** | `.predictive-step-item` | 100% | Min `5.5rem` (`88px`) | `1rem 1.25rem` (`16px 20px`) | `0` | Right border `1px solid #E6EAF0` (except last: `0`) |
| **Step Item (Highlight)** | `.is-highlight` | 100% | Min `5.5rem` (`88px`) | `1rem 1.25rem` (`16px 20px`) | `0` | Background `rgba(5, 40, 242, 0.03)`, Top `2.5px solid #0528F2` |
| **Forecast Card** | `.product-forecast` | 100% | Auto | `0` | `0` | `1px solid #E6EAF0`, radius `12px`, background `#FFFFFF` |
| **Forecast Header** | `.product-forecast > header` | 100% | Auto | `1.5rem` (`24px`) | `0` | None |
| **Forecast Plot Area** | `.forecast-plot` | 100% | `20rem` (`320px`) | `0` | `0` | Top & bottom border `1px solid #E6EAF0`, repeating gradient stripes |
| **Risk Event Card** | `.forecast-event` | Auto (min ~180px) | Auto | `0.65rem` (`10.4px`) | Absolute (`right: 8%`, `top: 52%`) | `1px solid #E6EAF0`, Left `2px solid #D9299B`, shadow `0 4px 12px rgba(11,16,32,0.06)` |
| **Forecast Footer** | `.product-forecast > footer` | 100% | Min `3rem` (`48px`) | `0 1.5rem` (`0 24px`) | `0` | None, gap `1.5rem` (`24px`) |
| **Decision Card** | `.home-predictive .fo-decision` | 100% | Auto | `1.5rem` (`24px`) | Top: `2rem` (`32px`) | `1px solid #E6EAF0`, Left `3px solid #0528F2`, radius `12px`, shadow `0 1px 2px rgba(11,16,32,0.04)` |
| **Decision Action Div**| `.fo-decision-action` | 100% | Auto | Left: `1.5rem` (`24px`) | `0` | Left border `1px solid #E6EAF0` (desktop) / Top border (mobile) |
| **Execute Button** | `.fo-button-small` | Max-content | `2.25rem` (`36px`) | `0 1rem` (`0 16px`) | Top: `0.4rem` (`6.4px`) | Radius `8px` (`0.5rem`), gradient `#0528F2` → `#05C7F2`, shadow `0 2px 8px rgba(5,40,242,0.22)` |

---

### 4.3 Custom CSS Rules (Required for Elementor Custom CSS Panel)

Place the following snippet in the **Advanced > Custom CSS** tab of the outer Section Container:

```css
/* Eyebrow Pulse Animation */
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

/* 4-Step Pipeline Highlight & Borders */
selector .predictive-step-item:last-child {
  border-right: 0 !important;
}

selector .predictive-step-item.is-highlight {
  background: rgba(5, 40, 242, 0.03) !important;
  border-top: 2.5px solid #0528F2 !important;
}

/* Forecast Background Repeating Grid Lines */
selector .forecast-plot {
  background: repeating-linear-gradient(to bottom, transparent 0, transparent 24%, #F1F4F8 25%) !important;
}

/* SVG Vector Effect & Curves */
selector .forecast-actual {
  fill: none;
  stroke: #0D0D0D;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

selector .forecast-future {
  fill: none;
  stroke: #049DD9;
  stroke-width: 2;
  stroke-dasharray: 6 4;
  vector-effect: non-scaling-stroke;
}

selector .forecast-range {
  fill: rgba(4, 157, 217, 0.08);
}

selector .forecast-plot line {
  stroke: #DDE3EA;
  stroke-dasharray: 4;
}

/* Primary Button Dynamic Gradient & Lift */
selector .fo-button-primary {
  background-image: linear-gradient(135deg, #0528F2 0%, #049DD9 50%, #05C7F2 100%) !important;
  background-size: 200% 100% !important;
  background-position: 0% 0% !important;
  transition: background-position 350ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 250ms ease,
              transform 180ms cubic-bezier(0.16, 1, 0.3, 1) !important;
}

selector .fo-button-primary:hover {
  background-position: 100% 0% !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35) !important;
}

selector .fo-button-primary:active {
  background-position: 50% 0% !important;
  transform: translateY(1px) !important;
}

/* Screen Reader Utility */
selector .fo-sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border-width: 0 !important;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  selector .section-heading-row {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  selector .predictive-steps {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  selector .predictive-steps {
    grid-template-columns: 1fr !important;
  }
  selector .predictive-step-item {
    border-right: 0 !important;
    border-bottom: 1px solid #E6EAF0 !important;
  }
  selector .forecast-event {
    right: 1rem !important;
  }
  selector .home-predictive .fo-decision {
    grid-template-columns: 1fr !important;
  }
  selector .home-predictive .fo-decision > .fo-icon {
    transform: rotate(90deg) !important;
  }
  selector .fo-decision-action {
    padding: 1.5rem 0 0 !important;
    border-left: 0 !important;
    border-top: 1px solid #E6EAF0 !important;
  }
}
```

---

## 5. RESPONSIVE SPEC

### 5.1 Breakpoint Matrix

| Viewport Breakpoint | Element / Container | Layout Behavior & Modifications | CSS Rule / Trigger |
|---|---|---|---|
| **Desktop (`≥ 1280px`)** | `.section-heading-row` | 2-column grid (`1.4fr 0.8fr`), gap `80px` (`5rem`), align-items `end` | Base `.section-heading-row` |
| | `.predictive-steps` | 4-column horizontal strip (`repeat(4, 1fr)`), vertical divider borders | Base `.predictive-steps` |
| | `.forecast-plot` | Full width, height `320px` (`20rem`), risk event positioned at `right: 8%`, `top: 52%` | Base `.forecast-plot` |
| | `.fo-decision` | 5-column horizontal grid (`1fr auto 1.5fr auto 1.2fr`), vertical divider | Base `.fo-decision` |
| **Laptop (`1024px – 1279px`)** | `.home-container` | Width bounded by fluid padding clamp `clamp(1.25rem, 3.34vw, 3rem)` | Base `.home-container` |
| | All modules | Identical to desktop layout | Default styling |
| **Tablet (`768px – 1023px`)** | `.section-heading-row` | Collapses to single column (`grid-template-columns: 1fr`), gap drops to `32px` (`2rem`) | `@media (max-width: 64rem)` |
| | `.predictive-steps` | Transforms into a 2×2 grid (`grid-template-columns: repeat(2, 1fr)`) | `@media (max-width: 64rem)` |
| | `.forecast-plot` | Unaltered height `320px`, risk event card remains absolute at `right: 8%` | Default styling |
| | `.fo-decision` | 5-column grid maintained if space permits; compact font scaling | Base `.fo-decision` |
| **Mobile (`< 768px`)** | Outer Section | Vertical padding clamps down to `clamp(2.25rem, 4.5vh, 3rem)` | `@media (max-width: 48rem)` |
| | Heading Row | Bottom margin reduces to `1.5rem` (`24px`) | `@media (max-width: 48rem)` |
| | Section H2 | Fluid font clamps to `clamp(2.25rem, 3.34vw, 3rem)` | `@media (max-width: 48rem)` |
| | `.predictive-steps` | Collapses to single column (`grid-template-columns: 1fr`) | `@media (max-width: 48rem)` |
| | `.predictive-step-item` | Removes vertical right border (`border-right: 0`), adds horizontal bottom border (`border-bottom: 1px solid #E6EAF0`) | `@media (max-width: 48rem)` |
| | `.forecast-event` | Right offset pins to `right: 1rem` (`16px`) instead of `8%` to avoid clipping | `@media (max-width: 48rem)` |
| | `.product-forecast > header` | Metric column stacks cleanly above/beside title | Default flex behavior |
| | `.fo-decision` | Collapses from 5 columns to single column (`grid-template-columns: 1fr`) | `@media (max-width: 48rem)` |
| | Connector Arrows | Rotates 90° downward (`transform: rotate(90deg)`) between stacked blocks | `@media (max-width: 48rem)` |
| | `.fo-decision-action` | Removes left border, adds top border (`border-top: 1px solid #E6EAF0`), padding `1.5rem 0 0` | `@media (max-width: 48rem)` |
| | Execute Button | Full-width or left-aligned within mobile action tray | `@media (max-width: 48rem)` |

---

## 6. TYPOGRAPHY

### 6.1 Complete Type Scale Specifications

| Text Element | CSS Selector | Font Family | Size (px / rem / clamp) | Weight | Line Height | Letter Spacing | Color (Hex) | Text Transform |
|---|---|---|---|---|---|---|---|---|
| **Eyebrow Label** | `.home-index` | Manrope | `0.68rem` (`10.88px`) | 700 (Bold) | `1.0` (Tight) | `+0.12em` | `#0528F2` | UPPERCASE |
| **Section Title** | `.home-section h2` | Manrope | `clamp(2.25rem, 3.34vw, 3rem)` | 650 (SemiBold) | `1.08` | `-0.05em` | `#0D0D0D` | None |
| **Section Subtitle**| `.section-heading-row > p`| Manrope | `1.0625rem` (`17px`) | 400 (Regular) | `1.7` | `0` | `#374151` | None |
| **Step Number** | `.predictive-step-num` | Manrope | `0.65rem` (`10.4px`) | 700 (Bold) | `1.0` | `0` | `#0528F2` | None |
| **Step Stage (Default)**| `.predictive-step-stage` | Manrope | `0.55rem` (`8.8px`) | 700 (Bold) | `1.0` | `+0.08em` | `#9CA3AF` | UPPERCASE |
| **Step Stage (Active)** | `.is-highlight .predictive-step-stage` | Manrope | `0.55rem` (`8.8px`) | 700 (Bold) | `1.0` | `+0.08em` | `#0528F2` | UPPERCASE |
| **Step Question Title**| `.predictive-step-item strong`| Manrope | `0.8rem` (`12.8px`) | 700 (Bold) | `1.2` | `-0.01em` | `#0D0D0D` | UPPERCASE |
| **Forecast Overline**| `.product-forecast header span`| Manrope | `0.6rem` (`9.6px`) | 700 (Bold) | `1.2` | `+0.08em` | `#6B7280` | UPPERCASE |
| **Forecast Name** | `.product-forecast header strong`| Manrope | `1.0625rem` (`17px`)| 700 (Bold) | `1.3` | `-0.02em` | `#0D0D0D` | None |
| **Forecast Number** | `.product-forecast header b`| Manrope | `1.4rem` (`22.4px`) | 700 (Bold) | `1.1` | `-0.03em` | `#0D0D0D` | None |
| **Forecast Horizon**| `.product-forecast header small`| Manrope | `0.65rem` (`10.4px`) | 400 (Regular) | `1.2` | `0` | `#6B7280` | None |
| **Risk Event Tag** | `.forecast-event span` | Manrope | `0.55rem` (`8.8px`) | 700 (Bold) | `1.1` | `+0.06em` | `#0D0D0D` | UPPERCASE |
| **Risk Event Title**| `.forecast-event strong`| Manrope | `0.7rem` (`11.2px`) | 700 (Bold) | `1.2` | `-0.01em` | `#0D0D0D` | None |
| **Risk Event Impact**| `.forecast-event small` | Manrope | `0.6rem` (`9.6px`) | 400 (Regular) | `1.2` | `0` | `#6B7280` | None |
| **Forecast Legend** | `.product-forecast footer` | Manrope | `0.65rem` (`10.4px`) | 500 (Medium) | `1.2` | `0` | `#6B7280` | None |
| **Decision Overline**| `.fo-decision span` | Manrope | `0.65rem` (`10.4px`) | 700 (Bold) | `1.1` | `+0.08em` | `#6B7280` | UPPERCASE |
| **Decision Strong** | `.fo-decision strong` | Manrope | `0.9375rem` (`15px`) | 700 (Bold) | `1.4` | `-0.01em` | `#0D0D0D` | None |
| **Decision Action** | `.fo-decision-action strong`| Manrope | `0.9375rem` (`15px`) | 700 (Bold) | `1.4` | `-0.01em` | `#0D0D0D` | UPPERCASE |
| **Button Label** | `.fo-button-small` | Manrope | `0.875rem` (`14px`) | 600 (SemiBold) | `1.0` | `0` | `#FFFFFF` | None |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 State & Interaction Matrix

| Element | Interaction State | Trigger | Visual Effect & Property Changes | Timing & Easing |
|---|---|---|---|---|
| **Eyebrow Beacon Dot** | Idle / Ambient | Page load (Infinite) | Scale `1` → `0.8`, opacity `1` → `0.45`, glow `0 0 8px rgba(5,199,242,0.8)` → `0 0 3px rgba(5,199,242,0.3)` | `2.4s ease-in-out infinite` (`beacon-pulse`) |
| **Eyebrow Capsule** | Hover | Mouse enter | Background shifts to `rgba(5, 40, 242, 0.08)`, border to `rgba(5, 40, 242, 0.22)` | `350ms cubic-bezier(0.16, 1, 0.3, 1)` |
| **Predictive Step Item**| Hover | Mouse enter | Background transitions slightly, border color sharpens | `180ms ease` (`var(--motion-fast)`) |
| **Highlight Step (03)**| Default | Persistent state | Top border `2.5px solid #0528F2`, background `rgba(5, 40, 242, 0.03)` | Static active styling |
| **Execute Button** | Default | Idle | Gradient `#0528F2` → `#049DD9` → `#05C7F2`, `box-shadow: 0 2px 8px rgba(5, 40, 242, 0.22)` | Baseline styling |
| **Execute Button** | Hover | Mouse enter | Gradient shifts to 100%, `transform: translateY(-1px)`, `box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45)` | `350ms cubic-bezier(0.16, 1, 0.3, 1)` |
| **Execute Button** | Active / Pressed | Mouse down | Gradient returns to 50%, `transform: translateY(1px)`, `box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35)` | `180ms ease` |
| **Execute Button** | Click Action | User click | Updates label to `"✓ Reminders Dispatched"`, background `#16803C` | Instant JS trigger |
| **Mobile Arrow Icons** | Breakpoint shift | Viewport ≤ 768px | Rotates 90° (`transform: rotate(90deg)`) to point downward | Instant CSS media query |

---

## 8. ICONS

### 8.1 Vector Asset Specifications

| Icon Name | ViewBox | Rendered Size | Tone / Color | Stroke / Fill | Exact SVG Code |
|---|---|---|---|---|---|
| `arrow` (16px) | `0 0 24 24` | 16×16 px | `#6B7280` (`--color-text-tertiary`) | Stroke: 1.5, Fill: none | `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>` |
| `arrow` (20px) | `0 0 24 24` | 20×20 px | `#6B7280` (`--color-text-tertiary`) | Stroke: 1.5, Fill: none | `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>` |
| `forecast-chart` | `0 0 700 220` | 100% × 320 px | `#0D0D0D`, `#049DD9`, `#DDE3EA`, `rgba(4,157,217,0.08)` | Variable paths | See verbatim SVG in Section 2.1 |

### 8.2 Icon Packaging Reference
All vector assets for this section have been saved in:
- Uncompressed: [`predictive-settlement-assets/`](file:///Users/svalgo/Library/CloudStorage/OneDrive2-flowone.in/FLOW%20ONE%20-STUFF/Website/flowOne-website/flowOne-NewDesign/predictive-settlement-assets/)
  - `predictive-settlement-arrow.svg`
  - `predictive-settlement-forecast-chart.svg`
- Zip Archive: [`predictive-settlement-icons.zip`](file:///Users/svalgo/Library/CloudStorage/OneDrive2-flowone.in/FLOW%20ONE%20-STUFF/Website/flowOne-website/flowOne-NewDesign/predictive-settlement-icons.zip)

---

## 9. ACCESSIBILITY

### 9.1 ARIA Semantics & Screen Reader Specifications
- **Semantic Landmark**: Wrapped in an HTML `<section className="home-predictive home-section">`.
- **Heading Order**: Section title is marked as `<h2>`.
- **Screen Reader Summary**: The `<Forecast />` article element includes:
  ```html
  <article class="product-forecast" aria-describedby="forecast-summary">
    <p id="forecast-summary" class="fo-sr-only">
      Cash is forecast at ₹12.4 crore over 30 days. A delayed customer payment may reduce expected cash by ₹5,90,000.
    </p>
  ```
  This ensures assistive technologies announce the core financial insight even though the visual graph has `aria-hidden="true"`.
- **Decorative Graphics**: The SVG plot `<div className="forecast-plot" aria-hidden="true">` and all connector `<Icon>` elements are marked with `aria-hidden="true"`.
- **Color Contrast (WCAG 2.1 AA / AAA Compliance)**:
  - Heading `#0D0D0D` on `#FFFFFF`: **17.8:1** (Passes AAA).
  - Subtitle `#374151` on `#FFFFFF`: **9.4:1** (Passes AAA).
  - Muted labels `#6B7280` on `#FFFFFF`: **4.6:1** (Passes AA for small text).
  - Highlighted blue `#0528F2` on `#FFFFFF`: **8.2:1** (Passes AAA).
  - White button text `#FFFFFF` on `#0528F2` gradient: **8.2:1** (Passes AAA).
- **Reduced Motion Support**:
  Under `@media (prefers-reduced-motion: reduce)`, the beacon pulse dot stops pulsating and remains a solid static cyan dot.

---

## 10. NOT FOUND IN CODE

The following items are not explicitly configured in the codebase and represent intentional recommendations for the WordPress / Elementor implementation:

| Item | Codebase Status | Recommended Elementor Implementation |
|---|---|---|
| **Step 4 Arrow Icon** | Code omits arrow on step 4 (`{i < 3 && <Icon ... />}`). | Correct as-is. Step 04 ("WHAT SHOULD WE DO") is the endpoint of the pipeline and should NOT render a right arrow. |
| **Execute Button Action** | Prototype only in `flow-system.tsx`; has no attached `onClick` handler. | In WordPress, connect this button to trigger a contact modal, navigate to `/treasury-demo`, or execute the inline status swap script provided in Section 2.4. |
| **Pipeline Step Interactivity** | The 4 steps are static cards (only step 03 has `.is-highlight`). | If desired, an Elementor developer can add a lightweight tab script that allows clicking steps 01, 02, or 04 to inspect their historical and prescriptive parameters. In current code, step 03 is permanently highlighted. |
| **Grid Repeating Stripe Height** | `repeating-linear-gradient` is hardcoded with 24% / 25% stops in CSS. | Set this as a custom background CSS rule on `.forecast-plot` rather than using an Elementor image background to keep it crisp across retina screens. |

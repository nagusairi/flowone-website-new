# THE COST OF SILOS — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 04: The Cost of Silos / System Fragmentation** (`.home-fragmentation.home-section`) of the flowOne website.

---

## 1. SECTION OVERVIEW

### 1.1 Purpose & Page Position
- **Section Purpose**: Demonstrates the severe friction of conventional multi-tool enterprise architectures versus flowOne's unified model. A single business transaction (`TXN-10482`) is broken down across 8 operational touchpoints (Sales, Operations, Finance, GST Compliance, Collections, Banking, Spreadsheets, and Email). An interactive controller enables visitors to toggle between:
  1. **flowOne Connected Reality**: A unified, synchronized transaction pipeline where all 8 business touchpoints align continuously.
  2. **Siloed Fragmented Reality**: Disconnected silos where context is severed, cards tilt, skew, turn dashed pink/red/yellow, and manual copying and reconciliation friction occur.
- **Section Placement**:
  - **Preceding Section**: Section 03: The Living Transaction (`#living-transaction` / `.home-living`, lines 653–665 in `Homepage.tsx`).
  - **Succeeding Section**: Section 05: Continuous Business Flow / Connection Arena (`#connection` / `.home-connection`, lines 713–732 in `Homepage.tsx`).

### 1.2 Component File Names & Exact Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 292–301**: Definition of `fragmentItems` data array (8 operational touchpoints).
  - **Line 432**: State hook `const [fragmented, setFragmented] = useState(false);`.
  - **Lines 667–711**: Section root container, heading row, interactive console, 8 cards grid, and live caption bar.
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `Icon` component rendering the arrow SVG (`name="arrow"`, `size={16}`).
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (max-width and horizontal fluid padding).
  - **Line 5**: `.home-section` (vertical section padding).
  - **Lines 8–60**: `.home-index` eyebrow capsule, pseudo-element beacon dot, hover state, and `@keyframes beacon-pulse`.
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 1150–1308**: Full desktop styling for `.home-fragmentation`, `.home-fragment-visual`, `.fragment-control`, `.fragment-items`, `.fragment-pill`, `.fragment-caption-bar`, and the 8 unique transform states in `.home-fragment-visual.is-fragmented`.
  - **Line 4396**: `@media (max-width: 64rem)` (1024px tablet breakpoint for `.section-heading-row`).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile breakpoint for `.home-section`, `.section-heading-row`, and `h2`).
  - **Lines 4510–4521**: `@media (max-width: 48rem)` (768px mobile layout overrides for `.fragment-control`, `.fragment-items`, and reset of all card transforms).
  - **Lines 4628, 4630, 4632**: `@media (prefers-reduced-motion: reduce)` animation and transition suppression rules.
- **`src/components/flowone.css`**:
  - **Lines 36–37, 39**: Base `.fo-icon`, `.fo-icon-16`, and `.fo-icon-default` SVG sizing and stroke rules.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and shadow primitives.

---

## 2. CODE

### 2.1 Verbatim JSX/TSX Markup
From `src/Homepage.tsx`:

```tsx
// Lines 292–301: Data Array
const fragmentItems = [
  { area: "SALES", object: "ORDER", clean: "SO-10482", silo: "SILO 01 · CRM ONLY" },
  { area: "OPERATIONS", object: "STOCK", clean: "125 ALLOCATED", silo: "SILO 02 · OFFLINE SHEET" },
  { area: "FINANCE", object: "INVOICE", clean: "INV-10482", silo: "SILO 03 · DISCONNECTED" },
  { area: "GST", object: "TAX", clean: "IRN VERIFIED", silo: "SILO 04 · MANUAL PORTAL" },
  { area: "COLLECTIONS", object: "RECEIVABLE", clean: "DUE IN 4D", silo: "SILO 05 · UNTRACKED" },
  { area: "BANK", object: "PAYMENT", clean: "MATCHED 98%", silo: "SILO 06 · STATEMENT DRIFT" },
  { area: "SPREADSHEETS", object: "STATUS", clean: "AUTOMATED", silo: "WARNING · DUPLICATE KEY" },
  { area: "EMAIL", object: "APPROVAL", clean: "IN-FLOW", silo: "DELAY · 42 THREADS" },
];

// Line 432: State Hook
const [fragmented, setFragmented] = useState(false);

// Lines 667–711: Section Markup
<section className="home-fragmentation home-section">
  <div className="home-container">
    <div className="section-heading-row">
      <div>
        <span className="home-index">THE COST OF SILOS</span>
        <h2>The transaction is connected.<br/>The systems usually aren’t.</h2>
      </div>
      <p>Sales sees the order. Operations sees the stock. Finance sees the invoice. GST sees the tax. The bank sees the payment.<br/><strong>Everyone sees a piece. Nobody sees the whole flow.</strong></p>
    </div>
    <div className={`home-fragment-visual ${fragmented ? "is-fragmented" : ""}`}>
      <div className="fragment-control">
        <div className="fragment-control-left">
          <span className="fragment-kicker">TXN-10482 · ONE BUSINESS EVENT</span>
          <strong>{fragmented ? "Siloed Reality: Context Severed Across 8 Disconnected Systems" : "flowOne Reality: Continuous Shared Transaction Pipeline"}</strong>
        </div>
        <button onClick={() => setFragmented(v => !v)}>
          <span>{fragmented ? "Restore Connected Context" : "Simulate Siloed Fragmentation"}</span>
          <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="fragment-items">
        {fragmentItems.map((item, i) => (
          <div className={`fragment-${i}`} key={item.area}>
            <div className="fragment-card-top">
              <span>{item.area}</span>
              <span className={`fragment-pill ${fragmented ? "is-silo" : "is-connected"}`}>
                {fragmented ? item.silo : item.clean}
              </span>
            </div>
            <strong>{item.object}</strong>
            <small>{fragmented ? "Context copied manually" : "TXN-10482 · Continuous Flow"}</small>
          </div>
        ))}
      </div>
      <div className="fragment-caption-bar">
        <span className="fragment-pulse-dot" aria-hidden="true" />
        <p aria-live="polite">
          {fragmented
            ? "Fragmented state: Operational and financial context drifts between silos. Manual reconciliation required."
            : "Connected state: Sales, operations, finance, tax, and banking act from one synchronized transaction object."}
        </p>
      </div>
    </div>
  </div>
</section>
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
Extracted directly from `src/homepage.css`, `src/components/flowone.css`, and `src/index.css`:

```css
/* Container & Section Base */
.home-container {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

.home-section {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
}

.home-fragmentation {
  background: var(--color-surface-page);
}

/* Eyebrow Capsule & Beacon Dot */
.home-eyebrow,
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

.home-eyebrow::before,
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

.home-eyebrow:hover,
.home-index:hover {
  background: rgba(5, 40, 242, 0.08);
  border-color: rgba(5, 40, 242, 0.22);
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.08);
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

/* Heading Row */
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

/* Main Visual Console */
.home-fragment-visual {
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xs);
  transition: all var(--motion-standard);
}

/* Control Bar */
.fragment-control {
  min-height: 4.5rem;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border-default);
  background: var(--color-neutral-50);
}

.fragment-control-left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.fragment-kicker {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-brand-blue);
}

.fragment-control-left strong {
  font-size: 0.95rem;
  letter-spacing: -0.01em;
}

.fragment-control button {
  min-height: 2.25rem;
  padding: 0.4rem 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--flow-primary);
  background: var(--neutral-0);
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-md);
  font: 700 var(--font-caption)/1 var(--font-family-primary);
  box-shadow: var(--shadow-xs);
  cursor: pointer;
  transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease, transform 180ms ease;
}

.fragment-control button:hover {
  border-color: var(--flow-primary);
  color: var(--flow-primary-deep);
  background: var(--neutral-50);
  transform: translateY(-1px);
}

.fragment-control button:active {
  background: var(--state-selected-bg);
  color: var(--flow-primary-pressed);
  transform: translateY(1px);
}

.fragment-control button:focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 2px;
}

/* 8-Card Grid */
.fragment-items {
  min-height: 22rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: stretch;
}

.fragment-items > div {
  min-height: 8.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-white);
  border: 1px solid rgba(0, 34, 255, 0.18);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  transition: transform var(--motion-expressive), opacity var(--motion-standard), border-color var(--motion-standard), box-shadow var(--motion-standard);
  position: relative;
}

.fragment-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fragment-card-top > span {
  color: var(--color-text-tertiary);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.fragment-pill {
  font-size: 0.56rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-sm);
}

.fragment-pill.is-connected {
  background: rgba(19, 138, 91, 0.1);
  color: var(--color-status-success);
  border: 1px solid rgba(19, 138, 91, 0.25);
}

.fragment-pill.is-silo {
  background: rgba(226, 41, 145, 0.1);
  color: var(--color-brand-pink);
  border: 1px solid rgba(226, 41, 145, 0.3);
}

.fragment-items strong {
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.fragment-items small {
  color: var(--color-text-tertiary);
  font-size: 0.62rem;
  font-weight: 600;
}

/* Caption Footer Bar */
.fragment-caption-bar {
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-top: 1px solid var(--color-border-default);
  background: var(--color-neutral-50);
}

.fragment-pulse-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: var(--radius-full);
  background: var(--color-brand-blue);
  box-shadow: 0 0 6px var(--color-brand-blue);
}

.fragment-caption-bar p {
  color: var(--color-text-secondary);
  font-size: var(--font-small);
  margin: 0;
}

/* Fragmented Scrambled State */
.home-fragment-visual.is-fragmented .fragment-pulse-dot {
  background: var(--color-brand-pink);
  box-shadow: 0 0 6px var(--color-brand-pink);
}

.home-fragment-visual.is-fragmented .fragment-items > div {
  border-style: dashed;
  border-color: rgba(226, 41, 145, 0.4);
  background: #fff9fc;
}

.home-fragment-visual.is-fragmented .fragment-0 { transform: translate(-0.6rem, -0.6rem) rotate(-1.5deg); }
.home-fragment-visual.is-fragmented .fragment-1 { transform: translate(0.6rem, 0.8rem) rotate(1.2deg); }
.home-fragment-visual.is-fragmented .fragment-2 { transform: translateY(-0.85rem) rotate(-1deg); }
.home-fragment-visual.is-fragmented .fragment-3 { transform: translate(0.85rem, 0.6rem) rotate(1.8deg); }
.home-fragment-visual.is-fragmented .fragment-4 { transform: translate(-0.85rem, 0.6rem) rotate(1.4deg); }
.home-fragment-visual.is-fragmented .fragment-5 { transform: translateY(0.85rem) rotate(-1.6deg); }
.home-fragment-visual.is-fragmented .fragment-6 { transform: translate(-0.4rem, -0.4rem) rotate(2deg); border-color: var(--color-status-danger); }
.home-fragment-visual.is-fragmented .fragment-7 { transform: translate(0.5rem, -0.6rem) rotate(-2deg); border-color: var(--color-status-warning); }

/* SVG Icon Base */
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

.fo-icon-default {
  color: var(--color-text-primary);
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
  .fragment-control {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .fragment-items {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
  .home-fragment-visual.is-fragmented .fragment-0,
  .home-fragment-visual.is-fragmented .fragment-1,
  .home-fragment-visual.is-fragmented .fragment-2,
  .home-fragment-visual.is-fragmented .fragment-3,
  .home-fragment-visual.is-fragmented .fragment-4,
  .home-fragment-visual.is-fragmented .fragment-5,
  .home-fragment-visual.is-fragmented .fragment-6,
  .home-fragment-visual.is-fragmented .fragment-7 {
    transform: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .fragment-pulse-dot {
    animation: none;
  }
  .home-fragment-visual .fragment-items > div {
    transition: none;
  }
}
```

---

### 2.3 Resolved Design Tokens

| Token Name | Defined In | Aliased / Inherited Chain | Resolved Literal Value | Usage in This Section |
| :--- | :--- | :--- | :--- | :--- |
| `--color-surface-page` | `src/index.css` | `var(--neutral-0)` | `#FFFFFF` | `.home-fragmentation` background |
| `--color-white` | `src/index.css` | `var(--neutral-0)` | `#FFFFFF` | `.home-fragment-visual`, card backgrounds |
| `--color-border-default` | `src/index.css` | `var(--neutral-200)` | `#E6EAF0` | Outer box border, control/caption bar divider |
| `--radius-xl` | `src/index.css` | Raw token | `1rem` (16px) | `.home-fragment-visual` outer border radius |
| `--shadow-xs` | `src/index.css` | Raw token | `0 1px 2px rgb(11 16 32 / 0.04)` | Visual shell, button, and card shadows |
| `--motion-standard` | `src/index.css` | Raw token | `350ms` | Container transition, card opacity/border/shadow |
| `--motion-expressive` | `src/index.css` | Raw token | `700ms` | Card `transform` animation transition |
| `--color-neutral-50` | `src/index.css` | `var(--neutral-50)` | `#F7F8FA` | `.fragment-control` & `.fragment-caption-bar` bg |
| `--color-brand-blue` | `src/index.css` | `var(--flow-primary)` | `#0528F2` | `.fragment-kicker`, `.fragment-pulse-dot` (default) |
| `--flow-primary` | `src/index.css` | Raw token | `#0528F2` | Eyebrow text, button text, button hover border |
| `--flow-primary-deep` | `src/index.css` | Raw token | `#0540F2` | Button hover text color |
| `--flow-primary-pressed`| `src/index.css` | Raw token | `#0A2BC7` | Button active text color |
| `--neutral-0` | `src/index.css` | Raw token | `#FFFFFF` | Button background |
| `--neutral-50` | `src/index.css` | Raw token | `#F7F8FA` | Button hover background |
| `--neutral-300` | `src/index.css` | Raw token | `#DDE3EA` | Button border default |
| `--state-selected-bg` | `src/index.css` | Raw token | `#EEF2FF` | Button active background |
| `--state-focus` | `src/index.css` | Raw token | `#0528F2` | Button `:focus-visible` outline |
| `--radius-md` | `src/index.css` | Raw token | `0.5rem` (8px) | Button and card border radius |
| `--radius-sm` | `src/index.css` | Raw token | `0.25rem` (4px) | Status pill border radius |
| `--radius-full` | `src/index.css` | Raw token | `9999px` | Pulse dot & eyebrow border radius |
| `--font-family-primary` | `src/index.css` | Raw token | `"Manrope", sans-serif` | Global font family |
| `--font-caption` | `src/index.css` | Raw token | `0.8125rem` (13px) | Button font size |
| `--font-small` | `src/index.css` | Raw token | `0.9375rem` (15px) | Caption footer paragraph font size |
| `--font-h2` | `src/index.css` | Raw token | `clamp(2.25rem, 3.34vw, 3rem)` | Section `<h2>` heading font size (36px–48px) |
| `--leading-heading` | `src/index.css` | Raw token | `1.08` | Section `<h2>` line-height |
| `--color-text-primary` | `src/index.css` | `var(--neutral-900)` | `#0D0D0D` | Headings, card titles, control titles |
| `--color-text-secondary`| `src/index.css` | `var(--neutral-700)` | `#374151` | Intro paragraph, caption footer text |
| `--color-text-tertiary` | `src/index.css` | `var(--neutral-500)` | `#6B7280` | Card area label, card bottom footnote |
| `--color-status-success`| `src/index.css` | `var(--success)` | `#16803C` | Connected pill text color |
| `--color-brand-pink` | `src/index.css` | `var(--flow-magenta)` | `#D9299B` | Siloed pill text color, pulse dot (fragmented) |
| `--color-status-danger` | `src/index.css` | `var(--error)` | `#C62828` | Card 6 fragmented border override |
| `--color-status-warning`| `src/index.css` | `var(--warning)` | `#B7791F` | Card 7 fragmented border override |
| `--flow-cyan-bright` | `src/index.css` | Raw token | `#05C7F2` | Eyebrow `::before` beacon dot |
| `--container-wide` | `src/index.css` | Raw token | `80rem` (1280px) | Maximum container content width |
| `--page-padding` | `src/index.css` | Raw token | `clamp(1.25rem, 3.34vw, 3rem)` | Container horizontal side gutters (20px–48px) |
| `--spacing-4` | `src/index.css` | Raw token | `2rem` (32px) | Top margin of `h2`, tablet header row gap |
| `--spacing-10` | `src/index.css` | Raw token | `5rem` (80px) | Desktop header row gap |

> [!NOTE]
> **File Precedence Rule**: Variables declared in `:root` inside `src/index.css` provide the canonical fallback values. Component styles in `src/homepage.css` take direct precedence on the homepage layout.

---

### 2.4 JavaScript Controller (Vanilla JS for Elementor / WordPress)
In React, state is governed by `const [fragmented, setFragmented] = useState(false);`. For an Elementor HTML widget or custom JS snippet, replicate the toggle behavior verbatim with this zero-dependency vanilla JS script:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  const visualConsole = document.querySelector('.home-fragment-visual');
  const toggleBtn = visualConsole ? visualConsole.querySelector('.fragment-control button') : null;
  const statusHeadline = visualConsole ? visualConsole.querySelector('.fragment-control-left strong') : null;
  const buttonLabel = toggleBtn ? toggleBtn.querySelector('span') : null;
  const captionPara = visualConsole ? visualConsole.querySelector('.fragment-caption-bar p') : null;
  const cards = visualConsole ? visualConsole.querySelectorAll('.fragment-items > div') : [];

  if (!visualConsole || !toggleBtn) return;

  const fragmentData = [
    { clean: "SO-10482", silo: "SILO 01 · CRM ONLY" },
    { clean: "125 ALLOCATED", silo: "SILO 02 · OFFLINE SHEET" },
    { clean: "INV-10482", silo: "SILO 03 · DISCONNECTED" },
    { clean: "IRN VERIFIED", silo: "SILO 04 · MANUAL PORTAL" },
    { clean: "DUE IN 4D", silo: "SILO 05 · UNTRACKED" },
    { clean: "MATCHED 98%", silo: "SILO 06 · STATEMENT DRIFT" },
    { clean: "AUTOMATED", silo: "WARNING · DUPLICATE KEY" },
    { clean: "IN-FLOW", silo: "DELAY · 42 THREADS" }
  ];

  let isFragmented = false;

  toggleBtn.addEventListener('click', function () {
    isFragmented = !isFragmented;

    if (isFragmented) {
      visualConsole.classList.add('is-fragmented');
      if (statusHeadline) statusHeadline.textContent = "Siloed Reality: Context Severed Across 8 Disconnected Systems";
      if (buttonLabel) buttonLabel.textContent = "Restore Connected Context";
      if (captionPara) captionPara.textContent = "Fragmented state: Operational and financial context drifts between silos. Manual reconciliation required.";

      cards.forEach((card, idx) => {
        const pill = card.querySelector('.fragment-pill');
        const footer = card.querySelector('small');
        if (pill) {
          pill.className = 'fragment-pill is-silo';
          pill.textContent = fragmentData[idx].silo;
        }
        if (footer) footer.textContent = "Context copied manually";
      });
    } else {
      visualConsole.classList.remove('is-fragmented');
      if (statusHeadline) statusHeadline.textContent = "flowOne Reality: Continuous Shared Transaction Pipeline";
      if (buttonLabel) buttonLabel.textContent = "Simulate Siloed Fragmentation";
      if (captionPara) captionPara.textContent = "Connected state: Sales, operations, finance, tax, and banking act from one synchronized transaction object.";

      cards.forEach((card, idx) => {
        const pill = card.querySelector('.fragment-pill');
        const footer = card.querySelector('small');
        if (pill) {
          pill.className = 'fragment-pill is-connected';
          pill.textContent = fragmentData[idx].clean;
        }
        if (footer) footer.textContent = "TXN-10482 · Continuous Flow";
      });
    }
  });
});
```

---

## 3. CONTENT

### 3.1 Content Strings in Display Order

| # | Element Type | HTML Tag / Class | Content Text (Verbatim) | State Condition |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Eyebrow Capsule | `<span class="home-index">` | `THE COST OF SILOS` | Permanent |
| 2 | Heading H2 | `<h2>` | `The transaction is connected.`<br>`The systems usually aren’t.` | Permanent (line break `<br/>`) |
| 3 | Paragraph Text | `<p>` | `Sales sees the order. Operations sees the stock. Finance sees the invoice. GST sees the tax. The bank sees the payment.` | Permanent (precedes `<br/>`) |
| 4 | Paragraph Bold | `<strong>` | `Everyone sees a piece. Nobody sees the whole flow.` | Permanent |
| 5 | Console Kicker | `<span class="fragment-kicker">` | `TXN-10482 · ONE BUSINESS EVENT` | Permanent |
| 6a | Console Status Title | `<strong>` | `flowOne Reality: Continuous Shared Transaction Pipeline` | Connected (`fragmented === false`) |
| 6b | Console Status Title | `<strong>` | `Siloed Reality: Context Severed Across 8 Disconnected Systems` | Fragmented (`fragmented === true`) |
| 7a | Control Button Label | `<button><span>` | `Simulate Siloed Fragmentation` | Connected (`fragmented === false`) |
| 7b | Control Button Label | `<button><span>` | `Restore Connected Context` | Fragmented (`fragmented === true`) |
| 8 | **Card 0 (Sales)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `SALES`<br>Pill: `SO-10482` (clean) / `SILO 01 · CRM ONLY` (silo)<br>Title: `ORDER`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 9 | **Card 1 (Operations)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `OPERATIONS`<br>Pill: `125 ALLOCATED` (clean) / `SILO 02 · OFFLINE SHEET` (silo)<br>Title: `STOCK`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 10 | **Card 2 (Finance)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `FINANCE`<br>Pill: `INV-10482` (clean) / `SILO 03 · DISCONNECTED` (silo)<br>Title: `INVOICE`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 11 | **Card 3 (GST)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `GST`<br>Pill: `IRN VERIFIED` (clean) / `SILO 04 · MANUAL PORTAL` (silo)<br>Title: `TAX`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 12 | **Card 4 (Collections)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `COLLECTIONS`<br>Pill: `DUE IN 4D` (clean) / `SILO 05 · UNTRACKED` (silo)<br>Title: `RECEIVABLE`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 13 | **Card 5 (Bank)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `BANK`<br>Pill: `MATCHED 98%` (clean) / `SILO 06 · STATEMENT DRIFT` (silo)<br>Title: `PAYMENT`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 14 | **Card 6 (Spreadsheets)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `SPREADSHEETS`<br>Pill: `AUTOMATED` (clean) / `WARNING · DUPLICATE KEY` (silo)<br>Title: `STATUS`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 15 | **Card 7 (Email)** | Area: `<span>`<br>Pill: `<span class="fragment-pill">`<br>Title: `<strong>`<br>Footnote: `<small>` | Area: `EMAIL`<br>Pill: `IN-FLOW` (clean) / `DELAY · 42 THREADS` (silo)<br>Title: `APPROVAL`<br>Footnote: `TXN-10482 · Continuous Flow` (clean) / `Context copied manually` (silo) | Dynamic |
| 16a | Caption Bar Text | `<p aria-live="polite">` | `Connected state: Sales, operations, finance, tax, and banking act from one synchronized transaction object.` | Connected (`fragmented === false`) |
| 16b | Caption Bar Text | `<p aria-live="polite">` | `Fragmented state: Operational and financial context drifts between silos. Manual reconciliation required.` | Fragmented (`fragmented === true`) |

### 3.2 Hyperlinks & Outbound Destinations
- **Total Links**: **0**
- There are **no `<a>` tags or hyperlink destinations** in this entire section. All interactive events are client-side state transitions triggered by the `<button>`.

---

## 4. LAYOUT SPEC

### 4.1 Container & Vertical Spacing
- **Outer Section Padding**:
  - Desktop / Tablet (`> 768px`): `clamp(3.25rem, 5.5vh, 4.5rem)` top and bottom (52px to 72px).
  - Mobile (`≤ 768px`): `clamp(2.25rem, 4.5vh, 3rem)` top and bottom (36px to 48px).
- **Container Max Width**: `80rem` (1280px).
- **Container Side Padding**: `clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px), applied via `margin-inline: auto; width: min(calc(100% - (var(--page-padding) * 2)), 80rem);`.
- **Vertical Spacing Between Blocks**:
  - Distance between Eyebrow and `h2`: `var(--spacing-4)` = `2rem` (32px top margin on `h2`).
  - Distance between Heading Row and Visual Console: `clamp(1.75rem, 3vh, 2.35rem)` (28px to 37.6px). Mobile reduces this to `1.5rem` (24px).

### 4.2 Structural Grids & Flexbox Rules
- **Header Row (`.section-heading-row`)**:
  - Desktop (`> 1024px`): `display: grid; grid-template-columns: 1.4fr 0.8fr; gap: 5rem; align-items: end;`
  - Tablet & Mobile (`≤ 1024px`): `display: grid; grid-template-columns: 1fr; gap: 2rem;`
- **Visual Console Shell (`.home-fragment-visual`)**:
  - `overflow: hidden; background: #FFFFFF; border: 1px solid #E6EAF0; border-radius: 1rem; box-shadow: 0 1px 2px rgb(11 16 32 / 0.04);`
- **Top Control Bar (`.fragment-control`)**:
  - Desktop: `min-height: 4.5rem; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E6EAF0; background: #F7F8FA;`
  - Mobile (`≤ 768px`): `flex-direction: column; align-items: flex-start; gap: 0.75rem;`
- **8-Card Grid (`.fragment-items`)**:
  - Desktop (`> 768px`): `min-height: 22rem; padding: 1.5rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; align-items: stretch;`
  - Mobile (`≤ 768px`): `grid-template-columns: 1fr; gap: 0.65rem; min-height: auto;`
- **Individual Cards (`.fragment-items > div`)**:
  - `min-height: 8.5rem; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between; border-radius: 0.5rem; box-shadow: 0 1px 2px rgb(11 16 32 / 0.04);`
  - Connected State: `background: #FFFFFF; border: 1px solid rgba(0, 34, 255, 0.18);`
  - Fragmented State: `background: #fff9fc; border: 1px dashed rgba(226, 41, 145, 0.4);`
- **Bottom Caption Bar (`.fragment-caption-bar`)**:
  - `padding: 0.85rem 1.5rem; display: flex; align-items: center; gap: 0.6rem; border-top: 1px solid #E6EAF0; background: #F7F8FA;`

### 4.3 Fixed Dimensions
- **Eyebrow Beacon Dot (`.home-index::before`)**: `6px × 6px` fixed circle (`border-radius: 50%`).
- **Control Bar Toggle Button**: `min-height: 2.25rem` (36px), padding `0.4rem 0.85rem`.
- **Arrow Icon in Button**: `16px × 16px` (`1rem × 1rem`).
- **Cards Min-Height**: `8.5rem` (136px).
- **Caption Pulse Dot (`.fragment-pulse-dot`)**: `0.45rem × 0.45rem` (7.2px × 7.2px circle).

---

## 5. RESPONSIVE SPEC

### 5.1 Breakpoint Architecture

```
Desktop (≥ 1025px / > 64rem)
   │
   ├─► 2-Column Heading Row (1.4fr : 0.8fr, gap 80px)
   ├─► Horizontal Control Bar (justify-content: space-between)
   ├─► 4-Column Card Grid (repeat(4, 1fr), gap 16px)
   └─► 8 Unique Card Skew & Translate Transforms Active in Silo State
   │
Tablet (769px – 1024px / 48rem – 64rem)
   │
   ├─► 1-Column Heading Row (grid-template-columns: 1fr, gap 32px)
   ├─► Horizontal Control Bar Retained
   ├─► 4-Column Card Grid Retained
   └─► 8 Unique Card Transforms Retained
   │
Mobile (≤ 768px / ≤ 48rem)
   │
   ├─► Section Padding Clamped: clamp(2.25rem, 4.5vh, 3rem)
   ├─► Heading Row Margin-Bottom Reduced to 24px (1.5rem)
   ├─► Control Bar Stacks Vertically: flex-direction: column; align-items: flex-start; gap: 12px
   ├─► Card Grid Switches to Single Column: grid-template-columns: 1fr; gap: 10.4px
   └─► ALL 8 Card Transforms Disabled: transform: none !important (prevents horizontal overflow)
```

### 5.2 Responsive Property Change Matrix

| Selector / Element | Desktop (> 1024px) | Tablet (769px – 1024px) | Mobile (≤ 768px) |
| :--- | :--- | :--- | :--- |
| `.home-section` padding | `clamp(3.25rem, 5.5vh, 4.5rem)` | `clamp(3.25rem, 5.5vh, 4.5rem)` | `clamp(2.25rem, 4.5vh, 3rem)` |
| `.section-heading-row` | `grid-template-columns: 1.4fr .8fr; gap: 5rem;` | `grid-template-columns: 1fr; gap: 2rem;` | `grid-template-columns: 1fr; gap: 2rem; margin-bottom: 1.5rem;` |
| `.fragment-control` | `flex-direction: row; justify-content: space-between;` | `flex-direction: row; justify-content: space-between;` | `flex-direction: column; align-items: flex-start; gap: 0.75rem;` |
| `.fragment-items` columns | `repeat(4, 1fr); gap: 1rem;` | `repeat(4, 1fr); gap: 1rem;` | `1fr; gap: 0.65rem;` |
| `.fragment-0...7` transforms (Siloed) | Individual skews (-2deg to +2deg, ±0.4rem to ±0.85rem) | Individual skews active | `transform: none;` (all transforms suppressed) |

---

## 6. TYPOGRAPHY

| Style Role | Font Family | Size / Clamp | Weight | Line Height | Letter Spacing | Resolved Color | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow Capsule** (`.home-index`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | `700` | `1` | `0.12em` | `#0528F2` | `uppercase` |
| **Section Heading** (`.home-section h2`) | `"Manrope", sans-serif` | `clamp(2.25rem, 3.34vw, 3rem)` | `650` | `1.08` | `-0.05em` | `#0D0D0D` | `none` |
| **Intro Paragraph** (`.section-heading-row > p`) | `"Manrope", sans-serif` | `1.0625rem` (17px) | `400` | `1.7` | `normal` | `#374151` | `none` |
| **Intro Strong** (`.section-heading-row p strong`) | `"Manrope", sans-serif` | `1.0625rem` (17px) | `700` | `1.7` | `normal` | `#0D0D0D` | `none` |
| **Console Kicker** (`.fragment-kicker`) | `"Manrope", sans-serif` | `0.58rem` (9.28px) | `700` | `normal` | `0.08em` | `#0528F2` | `uppercase` |
| **Console Headline** (`.fragment-control-left strong`) | `"Manrope", sans-serif` | `0.95rem` (15.2px) | `700` | `normal` | `-0.01em` | `#0D0D0D` | `none` |
| **Control Button** (`.fragment-control button`) | `"Manrope", sans-serif` | `0.8125rem` (13px) | `700` | `1` | `normal` | `#0528F2` (hover `#0540F2`, active `#0A2BC7`) | `none` |
| **Card Area Label** (`.fragment-card-top > span`) | `"Manrope", sans-serif` | `0.6rem` (9.6px) | `700` | `normal` | `0.06em` | `#6B7280` | `uppercase` |
| **Connected Status Pill** (`.fragment-pill.is-connected`) | `"Manrope", sans-serif` | `0.56rem` (8.96px) | `700` | `normal` | `normal` | `#16803C` | `none` |
| **Silo Status Pill** (`.fragment-pill.is-silo`) | `"Manrope", sans-serif` | `0.56rem` (8.96px) | `700` | `normal` | `normal` | `#D9299B` | `none` |
| **Card Object Title** (`.fragment-items strong`) | `"Manrope", sans-serif` | `1.1rem` (17.6px) | `700` | `normal` | `-0.02em` | `#0D0D0D` | `none` |
| **Card Footnote** (`.fragment-items small`) | `"Manrope", sans-serif` | `0.62rem` (9.92px) | `600` | `normal` | `normal` | `#6B7280` | `none` |
| **Caption Paragraph** (`.fragment-caption-bar p`) | `"Manrope", sans-serif` | `0.9375rem` (15px) | `400` | `normal` | `normal` | `#374151` | `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Interactive Element States

#### Eyebrow Capsule (`.home-index`)
- **Default**: `background: rgba(5, 40, 242, 0.05); border: 1px solid rgba(5, 40, 242, 0.12); box-shadow: 0 1px 3px rgba(5, 40, 242, 0.04);`
- **Hover**: `background: rgba(5, 40, 242, 0.08); border-color: rgba(5, 40, 242, 0.22); box-shadow: 0 2px 8px rgba(5, 40, 242, 0.08);`
- **Transition**: `all 350ms ease`

#### Eyebrow Beacon Dot (`.home-index::before`)
- **Animation**: `beacon-pulse 2.4s ease-in-out infinite`
  - `0%, 100%`: `opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);`
  - `50%`: `opacity: 0.45; transform: scale(0.8); box-shadow: 0 0 3px rgba(5, 199, 242, 0.3);`

#### Toggle Button (`.fragment-control button`)
- **Default**: `background: #FFFFFF; border: 1px solid #DDE3EA; color: #0528F2; transform: translateY(0); box-shadow: 0 1px 2px rgb(11 16 32 / 0.04);`
- **Hover**: `border-color: #0528F2; color: #0540F2; background: #F7F8FA; transform: translateY(-1px);`
- **Active**: `background: #EEF2FF; color: #0A2BC7; transform: translateY(1px);`
- **Focus-Visible**: `outline: 2px solid #0528F2; outline-offset: 2px;`
- **Transition**: `color 180ms ease, border-color 180ms ease, background-color 180ms ease, transform 180ms ease;`

### 7.2 The 8 Fragmented Card Transformations
When `.home-fragment-visual.is-fragmented` is active on desktop/tablet, each card receives a distinct spatial drift:

| Card Index & Area | Transform Formula | X Shift (px) | Y Shift (px) | Rotation | Special Border Override |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Card 0 (Sales)** | `translate(-0.6rem, -0.6rem) rotate(-1.5deg)` | -9.6px | -9.6px | -1.5° | Default dashed pink |
| **Card 1 (Operations)** | `translate(0.6rem, 0.8rem) rotate(1.2deg)` | +9.6px | +12.8px | +1.2° | Default dashed pink |
| **Card 2 (Finance)** | `translateY(-0.85rem) rotate(-1deg)` | 0px | -13.6px | -1.0° | Default dashed pink |
| **Card 3 (GST)** | `translate(0.85rem, 0.6rem) rotate(1.8deg)` | +13.6px | +9.6px | +1.8° | Default dashed pink |
| **Card 4 (Collections)**| `translate(-0.85rem, 0.6rem) rotate(1.4deg)` | -13.6px | +9.6px | +1.4° | Default dashed pink |
| **Card 5 (Bank)** | `translateY(0.85rem) rotate(-1.6deg)` | 0px | +13.6px | -1.6° | Default dashed pink |
| **Card 6 (Spreadsheets)**| `translate(-0.4rem, -0.4rem) rotate(2deg)` | -6.4px | -6.4px | +2.0° | `border-color: #C62828` (`--color-status-danger`) |
| **Card 7 (Email)** | `translate(0.5rem, -0.6rem) rotate(-2deg)` | +8.0px | -9.6px | -2.0° | `border-color: #B7791F` (`--color-status-warning`) |

**Transition Timing**:
`transition: transform 700ms, opacity 350ms, border-color 350ms, box-shadow 350ms;` (using `--motion-expressive` and `--motion-standard`).

### 7.3 Reduced-Motion Compliance
Under `@media (prefers-reduced-motion: reduce)`:
- `.fragment-pulse-dot { animation: none; }`
- `.home-fragment-visual .fragment-items > div { transition: none; }`
- State transforms still apply instantly without animated motion drift.

---

## 8. ICONS

### 8.1 Icon Inventory

| Icon Purpose | Icon Name | Library / Source | ViewBox | Dimensions | Stroke Width | Stroke Linecap / Linejoin | Resolved Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Toggle Button Trailing Arrow | `arrow` | Custom FlowOne SVG (`src/components/flowone.tsx`) | `0 0 24 24` | `16px × 16px` (`1rem × 1rem`) | `1.5` | `round` / `round` | Inherits button color (`#0528F2`, hover `#0540F2`, active `#0A2BC7`) |

### 8.2 Inline SVG Markup
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 12h14m-5-5 5 5-5 5" />
</svg>
```

### 8.3 Vector Archive & File Assets
- **Zip Archive**: `cost-of-silos-icons.zip`
- **Asset Directory**: `cost-of-silos-assets/`
  - `cost-of-silos-arrow-right.svg`

---

## 9. ACCESSIBILITY

- **Screen Reader Announcements (`aria-live="polite"`)**:
  - The live status paragraph in `.fragment-caption-bar` is explicitly tagged with `aria-live="polite"`. When a user activates the toggle button, assistive technologies automatically announce:
    - In Fragmented State: *"Fragmented state: Operational and financial context drifts between silos. Manual reconciliation required."*
    - In Connected State: *"Connected state: Sales, operations, finance, tax, and banking act from one synchronized transaction object."*
- **Decorative Elements**:
  - The pulse indicator `<span class="fragment-pulse-dot" aria-hidden="true" />` has `aria-hidden="true"`.
  - The trailing arrow SVG inside the button has `aria-hidden="true"`.
- **Keyboard Navigation & Focus Rings**:
  - The toggle control uses a semantic HTML `<button>` element.
  - Receives standard Tab key focus with a high-contrast focus indicator:
    `outline: 2px solid #0528F2; outline-offset: 2px;` (`var(--state-focus)`).
- **Color Contrast**:
  - Eyebrow text (`#0528F2` on `rgba(5, 40, 242, 0.05)`): Passes WCAG AA.
  - Section heading (`#0D0D0D` on `#FFFFFF`): 18.2:1 (Passes AAA).
  - Intro paragraph (`#374151` on `#FFFFFF`): 9.3:1 (Passes AAA).
  - Siloed Pink Pill (`#D9299B` on `rgba(226, 41, 145, 0.1)`): Passes AA.
  - Connected Green Pill (`#16803C` on `rgba(19, 138, 91, 0.1)`): Passes AA.

---

## 10. NOT FOUND IN CODE

1. **Missing Keyframe Animation on `.fragment-pulse-dot`**:
   - In `src/homepage.css`, `.fragment-pulse-dot` is targeted inside `@media (prefers-reduced-motion: reduce)` with `animation: none;`. However, in the base stylesheet, no `@keyframes` animation (such as a pulse, glow expansion, or opacity oscillation) is declared on `.fragment-pulse-dot`. It displays as a static circular beacon (`box-shadow: 0 0 6px var(--color-brand-blue)`).
2. **Undefined CSS Variables on `.home-index`**:
   - Line 24 of `src/homepage.css` specifies `transition: all var(--motion-productive) var(--ease-standard);`. Neither `--motion-productive` nor `--ease-standard` is declared in `src/index.css` or `src/homepage.css`. Browsers fall back to default transition timing (`all 0s ease 0s` or immediate).
3. **Hex Code vs RGBA Token Discrepancy for Brand Magenta**:
   - In `src/index.css`, `--flow-magenta` and `--color-brand-pink` are defined as `#D9299B` (RGB: `217, 41, 155`).
   - In `src/homepage.css` (lines 1257, 1259, 1298), the dashed card border and silo pill background use hardcoded `rgba(226, 41, 145, 0.4)` and `rgba(226, 41, 145, 0.1)` (which corresponds to Hex `#E22991`). Both colors are nearly identical visually, but the code explicitly uses hardcoded `226, 41, 145` for alpha transparencies.
4. **Missing Anchor ID on Section Element**:
   - Unlike preceding sections (`id="home-hero"` and `id="living-transaction"`) and following sections (`id="connection"`, `id="capabilities"`), `<section className="home-fragmentation home-section">` lacks an HTML `id` attribute (e.g. `id="silos"` or `id="fragmentation"`). If Elementor header navigation links need to jump directly to this section, an ID must be manually assigned (e.g., `#cost-of-silos` or `#fragmentation`).
5. **No Mobile Staggering or Accordion Mode**:
   - On screens `<= 48rem` (768px), the 8 cards simply stack in a single vertical column with transforms suppressed. There is no swipe carousel, accordion collapse, or tab selector declared for mobile; all 8 cards remain simultaneously rendered.

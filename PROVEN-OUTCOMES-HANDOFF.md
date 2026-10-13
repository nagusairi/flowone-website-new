# PROVEN OUTCOMES — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 09: Proven Outcomes / Business Outcomes** (`.home-outcomes.home-section`, lines 1012–1042 in `src/Homepage.tsx`) of the flowOne website.

> [!IMPORTANT]
> **CRITICAL BUILD INSTRUCTION FOR ELEMENTOR BUILDERS**:
> The React/TSX/CSS in this document is the **visual and behavioral source of truth only**. It must **not** be pasted into WordPress as a raw HTML block. Every element must be constructed natively in Elementor Pro using Containers (Flexbox/Grid), native widgets (Heading, Text Editor, Button, Icon), Global Styles, responsive controls, and reusable Components. Custom CSS and JavaScript must only be used where native Elementor controls are structurally incapable of delivering the design.

---

# PART A — STANDARD CONTENT

## 1. FILE MAP & SECTION OVERVIEW

### 1.1 Purpose & Page Placement
- **Section Purpose**: Demonstrates the quantifiable enterprise return on investment (ROI) achieved by flowOne's continuous business flow architecture across 6 core operational and financial dimensions: DSO acceleration, cash flow predictability, manual data entry elimination, proactive risk forecasting, automated tax/statutory compliance, and synchronized cross-departmental operations.
- **Section Structure**:
  1. **Section Header**: Architectural beacon capsule eyebrow (`PROVEN OUTCOMES`) above a high-contrast 3-line display heading (`"Better flow. / Better decisions. / Better business."`).
  2. **Editorial Gallery Grid (`.outcome-editorial`)**: A responsive 3-column card grid containing 6 distinct outcome stories. Each card features:
     - Giant low-contrast watermark numeral (`01` through `06`) at `80px` (`5rem`) in the bottom-right corner.
     - Topline bar with categorical tag (`[ OUTCOME ]`) and high-contrast white metric pill (`.outcome-metric-pill`).
     - Body block with bold editorial title and concise 2-line explanation.
     - Dashed-top milestone flow path connecting 3 transaction steps with muted directional vector arrows (`Node 1 → Node 2 → Node 3`).
     - Tactile hover physics: lifts `-3px`, elevates box-shadow, and transforms top accent border from dark ink (`#0D0D0D`) to active brand blue (`#0528F2`).
  3. **Section Footer Action**: Text-link button with forward action arrow (`"See what one connected workflow could change"`) that launches the interactive demo booking modal.
- **Section Placement**:
  - **Preceding Section**: Section 08: Predictive Settlement (`.home-predictive.home-section`, lines 982–1010 in `src/Homepage.tsx`).
  - **Succeeding Section**: Section 10: Role-Based Views / Platform by Role (`#roles` / `.home-roles.home-section`, lines 1044–1145 in `src/Homepage.tsx`).

### 1.2 Component File Names & Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 283–290**: `outcomeStories` constant data array (all 6 stories: title, path array, metric string, and desc string).
  - **Line 440**: `openDemo` callback hook trigger (`const openDemo = useCallback(()=>setDemoOpen(true),[]);`).
  - **Lines 1012–1042**: Complete section JSX markup (`.home-outcomes`, heading group, `.outcome-editorial` grid, mapped articles, and `.outcome-demo-link` button).
  - **Line 1187 & Lines 2762–2783**: `DemoDialog` modal launched by `openDemo`.
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `<Icon />` primitive rendering `name="arrow"` at sizes 14 (`tone="muted"`) and 16 (`tone="action"`).
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (max-width and fluid horizontal page padding formula).
  - **Line 5**: `.home-section` (fluid section vertical padding clamp).
  - **Lines 8–47**: `.home-index` (capsule eyebrow, pulse animation dot, hover state).
  - **Line 61**: `.home-section h2` (heading scale, line-height, letter-spacing, weight 650).
  - **Lines 2844–2941**: Section 09 core rules (`.home-outcomes`, `.outcome-editorial`, `.outcome-story`, `.outcome-watermark`, `.outcome-story-topline`, `.outcome-index-tag`, `.outcome-metric-pill`, `.outcome-story-body`, `.outcome-story-desc`, `.outcome-story-path`, `.outcome-demo-link`).
  - **Line 4429**: `@media (max-width: 64rem)` (1024px tablet 2-column grid override).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile section padding and heading scale).
  - **Lines 4553–4554**: `@media (max-width: 48rem)` (768px mobile 1-column grid and reduced card min-height).
  - **Line 4629**: `@media (prefers-reduced-motion: reduce)` motion suppression rules.
- **`src/components/flowone.css`**:
  - **Lines 36–42**: `.fo-icon`, `.fo-icon-14`, `.fo-icon-16`, `.fo-icon-muted`, `.fo-icon-action`.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and shadow definitions.

---

## 2. FULL TSX MARKUP

### 2.1 Verbatim Data Array (`src/Homepage.tsx`, Lines 283–290)
```tsx
const outcomeStories = [
  { title: "GET PAID FASTER", path: ["Receivable", "Collection", "Cash"], metric: "-12 Days DSO", desc: "Automate reminders and reconcile payments the moment they hit the bank." },
  { title: "CONTROL CASH", path: ["Bank", "Reconciliation", "Forecast"], metric: "₹12.4 Cr Forecast", desc: "Know your exact forward treasury without manual spreadsheet reconciliation." },
  { title: "REDUCE MANUAL WORK", path: ["Document", "AI", "Workflow"], metric: "-80% Manual Entry", desc: "Documents become data, transactions match automatically, and audits run themselves." },
  { title: "CATCH RISK EARLIER", path: ["Data", "AI", "Prediction"], metric: "4-Day Lead Time", desc: "AI predicts payment anomalies before invoices become overdue." },
  { title: "STAY COMPLIANT", path: ["Transaction", "GST", "Validation"], metric: "100% E-Invoicing", desc: "IRN generation, e-way bills, and GSTR-1 filings happen directly inside the transaction." },
  { title: "RUN OPERATIONS WITH CLARITY", path: ["Order", "Inventory", "Fulfillment"], metric: "99.9% Accuracy", desc: "Every department acts on identical inventory, customer, and financial context." },
];
```

### 2.2 Verbatim Section JSX Markup (`src/Homepage.tsx`, Lines 1012–1042)
```tsx
<section className="home-outcomes home-section">
  <div className="home-container">
    <span className="home-index">PROVEN OUTCOMES</span>
    <h2>Better flow.<br/>Better decisions.<br/>Better business.</h2>
    <div className="outcome-editorial">
      {outcomeStories.map((story, i) => (
        <article className={`outcome-story story-${i}`} key={story.title}>
          <span className="outcome-watermark">0{i + 1}</span>
          <div className="outcome-story-topline">
            <span className="outcome-index-tag">[ OUTCOME ]</span>
            <span className="outcome-metric-pill">{story.metric}</span>
          </div>
          <div className="outcome-story-body">
            <strong>{story.title}</strong>
            <p className="outcome-story-desc">{story.desc}</p>
          </div>
          <div className="outcome-story-path">
            <b>{story.path[0]}</b>
            <Icon name="arrow" size={14} tone="muted" />
            <b>{story.path[1]}</b>
            <Icon name="arrow" size={14} tone="muted" />
            <b>{story.path[2]}</b>
          </div>
        </article>
      ))}
    </div>
    <button className="outcome-demo-link" onClick={openDemo}>
      See what one connected workflow could change <Icon name="arrow" size={16} tone="action" />
    </button>
  </div>
</section>
```

### 2.3 Verbatim Icon Component (`src/components/flowone.tsx`, Lines 6–17)
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

/* Eyebrow Capsule & Pulse Dot */
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

.home-section h2 {
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-h2);
  line-height: var(--leading-heading);
  letter-spacing: -.05em;
  font-weight: 650;
}

/* SECTION 09 Canvas */
.home-outcomes {
  background: var(--neutral-50);
}

/* 3-Column Editorial Grid */
.outcome-editorial {
  margin-top: var(--spacing-8);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

/* Outcome Story Card */
.outcome-story {
  min-height: 16rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border-default);
  border-top: 3px solid var(--color-brand-ink);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
  position: relative;
  overflow: hidden;
  transition: transform var(--motion-standard), box-shadow var(--motion-standard), border-color var(--motion-standard);
}

.outcome-story:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
  border-top-color: var(--color-brand-blue);
}

/* Giant Watermark Numeral */
.outcome-watermark {
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  font-size: 5rem;
  line-height: 1;
  font-weight: 800;
  color: rgba(11, 16, 32, 0.03);
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}

/* Topline Meta */
.outcome-story-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.outcome-index-tag {
  color: var(--color-brand-blue);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.outcome-metric-pill {
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--color-brand-ink);
  background: var(--color-white);
  border: 1px solid var(--color-border-strong);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-variant-numeric: tabular-nums;
}

/* Card Body Copy */
.outcome-story-body strong {
  display: block;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.outcome-story-desc {
  margin-top: 0.4rem;
  color: var(--color-text-secondary);
  font-size: var(--font-small);
  line-height: 1.55;
}

/* 3-Step Milestone Flow Path */
.outcome-story-path {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--color-border-default);
  color: var(--color-text-tertiary);
  font-size: 0.68rem;
  font-weight: 600;
}

/* Bottom Action Link / Button */
.outcome-demo-link {
  min-height: var(--control-md);
  margin-top: var(--spacing-6);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-brand-blue);
  background: transparent;
  border: 0;
  font: 700 var(--font-small)/1 var(--font-family-primary);
  cursor: pointer;
  transition: transform var(--motion-fast);
}

.outcome-demo-link:hover {
  transform: translateX(4px);
}

/* Vector Icon Primitives */
.fo-icon {
  flex: 0 0 auto;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fo-icon-14 {
  width: .875rem;
  height: .875rem;
}

.fo-icon-16 {
  width: 1rem;
  height: 1rem;
}

.fo-icon-muted {
  color: var(--color-text-tertiary);
}

.fo-icon-action {
  color: var(--color-brand-blue);
}

/* ==========================================================================
   RESPONSIVE MEDIA QUERIES
   ========================================================================== */

/* Tablet (≤ 1024px / 64rem) */
@media (max-width: 64rem) {
  .outcome-editorial {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile (≤ 768px / 48rem) */
@media (max-width: 48rem) {
  .home-section {
    padding-block: clamp(2.25rem, 4.5vh, 3rem);
  }
  .home-section h2 {
    font-size: var(--font-h2);
  }
  .outcome-editorial {
    grid-template-columns: 1fr;
    margin-top: var(--spacing-7);
  }
  .outcome-story {
    min-height: 12rem;
  }
}

/* Accessibility / Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .home-index::before {
    animation: none !important;
  }
  .outcome-story {
    transition: none !important;
    transform: none !important;
  }
  .outcome-demo-link {
    transition: none !important;
    transform: none !important;
  }
}
```

---

## 4. CONTENT INVENTORY TABLE

| # | Element Description | HTML Tag | Literal String / Content | Visual Role / Styling |
|---|---|---|---|---|
| **1** | Eyebrow Capsule | `<span>` | `PROVEN OUTCOMES` | Overline category badge with glowing cyan pulse dot |
| **2** | Section Title | `<h2>` | `Better flow.`<br/>`Better decisions.`<br/>`Better business.` | 3-line display heading, Manrope 650 weight |
| **3** | Card 01 Watermark | `<span>` | `01` | Massive 80px background numeral, 3% opacity ink |
| **4** | Card 01 Tag | `<span>` | `[ OUTCOME ]` | Primary blue uppercase category index tag |
| **5** | Card 01 Metric Pill | `<span>` | `-12 Days DSO` | High-contrast white badge, tabular numbers |
| **6** | Card 01 Title | `<strong>` | `GET PAID FASTER` | 18.4px bold editorial headline |
| **7** | Card 01 Description | `<p>` | `Automate reminders and reconcile payments the moment they hit the bank.` | 15px secondary body text |
| **8** | Card 01 Path Node 1 | `<b>` | `Receivable` | Starting milestone of DSO workflow |
| **9** | Card 01 Path Node 2 | `<b>` | `Collection` | Intermediate milestone of DSO workflow |
| **10** | Card 01 Path Node 3 | `<b>` | `Cash` | Final settlement milestone of DSO workflow |
| **11** | Card 02 Watermark | `<span>` | `02` | Massive 80px background numeral, 3% opacity ink |
| **12** | Card 02 Tag | `<span>` | `[ OUTCOME ]` | Primary blue uppercase category index tag |
| **13** | Card 02 Metric Pill | `<span>` | `₹12.4 Cr Forecast` | High-contrast white badge, tabular numbers |
| **14** | Card 02 Title | `<strong>` | `CONTROL CASH` | 18.4px bold editorial headline |
| **15** | Card 02 Description | `<p>` | `Know your exact forward treasury without manual spreadsheet reconciliation.` | 15px secondary body text |
| **16** | Card 02 Path Node 1 | `<b>` | `Bank` | Starting milestone of treasury workflow |
| **17** | Card 02 Path Node 2 | `<b>` | `Reconciliation` | Intermediate milestone of treasury workflow |
| **18** | Card 02 Path Node 3 | `<b>` | `Forecast` | Final settlement milestone of treasury workflow |
| **19** | Card 03 Watermark | `<span>` | `03` | Massive 80px background numeral, 3% opacity ink |
| **20** | Card 03 Tag | `<span>` | `[ OUTCOME ]` | Primary blue uppercase category index tag |
| **21** | Card 03 Metric Pill | `<span>` | `-80% Manual Entry` | High-contrast white badge, tabular numbers |
| **22** | Card 03 Title | `<strong>` | `REDUCE MANUAL WORK` | 18.4px bold editorial headline |
| **23** | Card 03 Description | `<p>` | `Documents become data, transactions match automatically, and audits run themselves.` | 15px secondary body text |
| **24** | Card 03 Path Node 1 | `<b>` | `Document` | Starting milestone of document intelligence workflow |
| **25** | Card 03 Path Node 2 | `<b>` | `AI` | Intermediate milestone of document intelligence workflow |
| **26** | Card 03 Path Node 3 | `<b>` | `Workflow` | Final settlement milestone of document intelligence workflow |
| **27** | Card 04 Watermark | `<span>` | `04` | Massive 80px background numeral, 3% opacity ink |
| **28** | Card 04 Tag | `<span>` | `[ OUTCOME ]` | Primary blue uppercase category index tag |
| **29** | Card 04 Metric Pill | `<span>` | `4-Day Lead Time` | High-contrast white badge, tabular numbers |
| **30** | Card 04 Title | `<strong>` | `CATCH RISK EARLIER` | 18.4px bold editorial headline |
| **31** | Card 04 Description | `<p>` | `AI predicts payment anomalies before invoices become overdue.` | 15px secondary body text |
| **32** | Card 04 Path Node 1 | `<b>` | `Data` | Starting milestone of risk prediction workflow |
| **33** | Card 04 Path Node 2 | `<b>` | `AI` | Intermediate milestone of risk prediction workflow |
| **34** | Card 04 Path Node 3 | `<b>` | `Prediction` | Final settlement milestone of risk prediction workflow |
| **35** | Card 05 Watermark | `<span>` | `05` | Massive 80px background numeral, 3% opacity ink |
| **36** | Card 05 Tag | `<span>` | `[ OUTCOME ]` | Primary blue uppercase category index tag |
| **37** | Card 05 Metric Pill | `<span>` | `100% E-Invoicing` | High-contrast white badge, tabular numbers |
| **38** | Card 05 Title | `<strong>` | `STAY COMPLIANT` | 18.4px bold editorial headline |
| **39** | Card 05 Description | `<p>` | `IRN generation, e-way bills, and GSTR-1 filings happen directly inside the transaction.` | 15px secondary body text |
| **40** | Card 05 Path Node 1 | `<b>` | `Transaction` | Starting milestone of compliance workflow |
| **41** | Card 05 Path Node 2 | `<b>` | `GST` | Intermediate milestone of compliance workflow |
| **42** | Card 05 Path Node 3 | `<b>` | `Validation` | Final settlement milestone of compliance workflow |
| **43** | Card 06 Watermark | `<span>` | `06` | Massive 80px background numeral, 3% opacity ink |
| **44** | Card 06 Tag | `<span>` | `[ OUTCOME ]` | Primary blue uppercase category index tag |
| **45** | Card 06 Metric Pill | `<span>` | `99.9% Accuracy` | High-contrast white badge, tabular numbers |
| **46** | Card 06 Title | `<strong>` | `RUN OPERATIONS WITH CLARITY` | 18.4px bold editorial headline |
| **47** | Card 06 Description | `<p>` | `Every department acts on identical inventory, customer, and financial context.` | 15px secondary body text |
| **48** | Card 06 Path Node 1 | `<b>` | `Order` | Starting milestone of operations workflow |
| **49** | Card 06 Path Node 2 | `<b>` | `Inventory` | Intermediate milestone of operations workflow |
| **50** | Card 06 Path Node 3 | `<b>` | `Fulfillment` | Final settlement milestone of operations workflow |
| **51** | Demo Action Link | `<button>` | `See what one connected workflow could change` | 15px bold action button triggering demo modal |

---

## 5. LAYOUT SPEC (GRID / FLEX STRUCTURE)

### 5.1 Container Nesting & Spatial Hierarchy
- **Outer Section Container (`.home-outcomes.home-section`)**:
  - Full-width block canvas.
  - Background: `#F7F8FA` (`var(--neutral-50)` / `var(--color-surface-subtle)`).
  - Vertical padding: `clamp(3.25rem, 5.5vh, 4.5rem)` (Desktop/Tablet: 52px–72px; Mobile: 36px–48px).
- **Inner Content Container (`.home-container`)**:
  - Max width: `1280px` (`80rem` / `var(--container-wide)`).
  - Inset padding: `0 clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
  - Flex direction: Column, align items: flex-start.
- **Section Heading Group**:
  - Direct children of `.home-container`.
  - Margin above H2: `32px` (`2rem` / `var(--spacing-4)`).
  - Margin below H2: Handled by `.outcome-editorial` top margin.
- **Editorial Card Grid (`.outcome-editorial`)**:
  - Desktop: CSS Grid with 3 columns (`grid-template-columns: repeat(3, 1fr)`).
  - Gap: `20px` (`1.25rem`).
  - Margin-top: `64px` (`4rem` / `var(--spacing-8)`).
- **Story Card (`.outcome-story`)**:
  - Container type: Flex Column, justify-content: `space-between`, align-items: stretch.
  - Dimensions: Minimum height `256px` (`16rem`) on desktop/tablet, `192px` (`12rem`) on mobile.
  - Padding: `24px` (`1.5rem`).
  - Surface: Background `#F7F8FA`, border `1px solid #E6EAF0`, border-top `3px solid #0D0D0D`, border-radius `12px` (`0.75rem`).
  - Shadow: Default `0 1px 2px rgba(11, 16, 32, 0.04)`.
  - Position: `relative`, `overflow: hidden`.
- **Topline (`.outcome-story-topline`)**:
  - Container type: Flex Row, justify-content: `space-between`, align-items: center.
- **Body (`.outcome-story-body`)**:
  - Container type: Flex Column, align-items: flex-start, gap: `6.4px` (`0.4rem`).
- **Milestone Flow Path (`.outcome-story-path`)**:
  - Container type: Flex Row, align-items: center, gap: `6.4px` (`0.4rem`).
  - Top border: `1px dashed #E6EAF0`, padding-top: `12px` (`0.75rem`).
- **Demo Action Link (`.outcome-demo-link`)**:
  - Container type: Inline-Flex, align-items: center, gap: `8px` (`0.5rem`).
  - Margin-top: `48px` (`3rem` / `var(--spacing-6)`).
  - Minimum height: `44px` (`2.75rem` / `var(--control-md)`).

---

## 6. RESPONSIVE SPEC

| Breakpoint Range | Container / Element | Responsive Change | CSS Reference |
|---|---|---|---|
| **Desktop (`≥ 1280px`)** | `.outcome-editorial` | 3 equal columns (`repeat(3, 1fr)`), 2 rows of 3 cards. Gap `20px`. | Base CSS |
| | `.outcome-story` | Full min-height `256px` (`16rem`), full hover physics (`translateY(-3px)`). | Base CSS |
| **Laptop (`1024px – 1279px`)** | `.home-container` | Inset scales fluidly via `clamp(1.25rem, 3.34vw, 3rem)`. | Base CSS |
| | `.outcome-editorial` | 3 equal columns maintained cleanly. | Base CSS |
| **Tablet (`768px – 1023px`)** | `.outcome-editorial` | Collapses from 3 columns to **2 columns** (`grid-template-columns: repeat(2, 1fr)`), 3 rows of 2 cards. | `@media (max-width: 64rem)` |
| | `.outcome-story` | Maintains `256px` min-height; text wrapping preserves breathing room. | Default styling |
| **Mobile (`< 768px`)** | Outer Section | Vertical padding clamps to `clamp(2.25rem, 4.5vh, 3rem)` (36px–48px). | `@media (max-width: 48rem)` |
| | Section H2 | Fluid font clamps to `clamp(2.25rem, 3.34vw, 3rem)` (36px–48px). | `@media (max-width: 48rem)` |
| | `.outcome-editorial` | Collapses from 2 columns to **1 single column** (`grid-template-columns: 1fr`). Top margin drops to `56px` (`3.5rem` / `var(--spacing-7)`). | `@media (max-width: 48rem)` |
| | `.outcome-story` | Minimum height decreases to `192px` (`12rem`) to eliminate mobile dead space. | `@media (max-width: 48rem)` |
| | `.outcome-demo-link` | Full touch target (`44px` min-height) with left-aligned placement. | Base CSS |

---

## 7. TYPOGRAPHY TABLE

| Element | CSS Selector | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Letter Spacing | Color (Hex) | Text Transform |
|---|---|---|---|---|---|---|---|---|
| **Eyebrow Capsule** | `.home-index` | Manrope | `0.68rem` (`10.88px`) | 700 (Bold) | `1.0` | `+0.12em` | `#0528F2` | UPPERCASE |
| **Section Title** | `.home-section h2` | Manrope | `clamp(2.25rem, 3.34vw, 3rem)` (`36px – 48px`) | 650 (SemiBold) | `1.08` | `-0.05em` | `#0D0D0D` | None |
| **Card Watermark** | `.outcome-watermark` | Manrope | `5rem` (`80px`) | 800 (ExtraBold) | `1.0` | `0` | `rgba(11, 16, 32, 0.03)` | None (tabular) |
| **Outcome Tag** | `.outcome-index-tag` | Manrope | `0.62rem` (`9.92px`) | 700 (Bold) | `1.0` | `+0.08em` | `#0528F2` | UPPERCASE |
| **Metric Pill** | `.outcome-metric-pill` | Manrope | `0.62rem` (`9.92px`) | 700 (Bold) | `1.0` | `0` | `#0D0D0D` | None (tabular) |
| **Story Title** | `.outcome-story-body strong`| Manrope | `1.15rem` (`18.4px`) | 700 (Bold) | `1.3` | `-0.02em` | `#0D0D0D` | UPPERCASE |
| **Story Description**| `.outcome-story-desc`| Manrope | `0.9375rem` (`15px`) | 400 (Regular) | `1.55` | `0` | `#374151` | None |
| **Milestone Text** | `.outcome-story-path b`| Manrope | `0.68rem` (`10.88px`) | 600 (SemiBold) | `1.0` | `0` | `#6B7280` | None |
| **Demo Action Link**| `.outcome-demo-link` | Manrope | `0.9375rem` (`15px`) | 700 (Bold) | `1.0` | `0` | `#0528F2` | None |

---

## 8. INTERACTIONS & ANIMATION SPEC

| Element | Interaction State | Trigger | Effect & CSS Properties Changed | Duration / Easing | Loop Behavior |
|---|---|---|---|---|---|
| **Eyebrow Dot** | Ambient / Idle | Page Load | `@keyframes beacon-pulse`: Scale `1` → `0.8`, opacity `1` → `0.45`, `box-shadow: 0 0 8px rgba(5, 199, 242, 0.8)` → `0 0 3px rgba(5, 199, 242, 0.3)` | `2.4s ease-in-out` | Infinite looping |
| **Eyebrow Capsule** | Hover State | Mouse Enter | Background shifts from `rgba(5, 40, 242, 0.05)` to `rgba(5, 40, 242, 0.08)`, border from `rgba(5, 40, 242, 0.12)` to `rgba(5, 40, 242, 0.22)` | `350ms cubic-bezier(0.16, 1, 0.3, 1)` | Once per hover |
| **Outcome Story Card**| Hover State | Mouse Enter | Card translates `-3px` upward (`transform: translateY(-3px)`), `box-shadow` elevates to `0 4px 12px rgba(11, 16, 32, 0.06)`, and top border transitions from `#0D0D0D` to `#0528F2` | `350ms ease` (`var(--motion-standard)`) | Once per hover |
| **Demo Action Button**| Hover State | Mouse Enter | Button translates `4px` to the right (`transform: translateX(4px)`) | `180ms ease` (`var(--motion-fast)`) | Once per hover |
| **Demo Action Button**| Click State | Mouse Click | Dispatches `openDemo()` callback, triggering the `DemoDialog` booking modal | Instant trigger | Once per click |

---

## 9. ICON / SVG ASSETS

### 9.1 Vector Specifications & Exact Inline SVG Code

| Asset Name | ViewBox | Rendered Size | Tone / Color | Stroke / Fill | Exact SVG Code |
|---|---|---|---|---|---|
| `arrow` (14px) | `0 0 24 24` | 14×14 px | `#6B7280` (`--color-text-tertiary`) | Stroke: 1.5, Fill: none | `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>` |
| `arrow` (16px) | `0 0 24 24` | 16×16 px | `#0528F2` (`--color-brand-blue`) | Stroke: 1.5, Fill: none | `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0528F2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>` |

### 9.2 Icon Packaging Reference
The vector assets are saved in:
- Uncompressed: [`proven-outcomes-assets/proven-outcomes-arrow.svg`](file:///Users/svalgo/Library/CloudStorage/OneDrive2-flowone.in/FLOW%20ONE%20-STUFF/Website/flowOne-website/flowOne-NewDesign/proven-outcomes-assets/proven-outcomes-arrow.svg)
- Zip Package: [`proven-outcomes-icons.zip`](file:///Users/svalgo/Library/CloudStorage/OneDrive2-flowone.in/FLOW%20ONE%20-STUFF/Website/flowOne-website/flowOne-NewDesign/proven-outcomes-icons.zip)

---

## 10. ACCESSIBILITY NOTES

- **Semantic HTML Landmarks**: Uses `<section className="home-outcomes home-section">` as the section landmark, containing an `<h2>` heading for the section title.
- **Card Semantic Tags**: Each of the 6 outcome stories is encapsulated in an `<article className="outcome-story">` tag, signifying independent, self-contained units of content.
- **Watermark Non-Interference**: The watermark numerals (`01` through `06`) feature `pointer-events: none` and `user-select: none`, ensuring that screen readers prioritize the actual semantic heading (`<strong>`) and description (`<p>`) without interference.
- **Decorative SVG Vectors**: All directional arrows in the flow path sequence and the button include `aria-hidden="true"`.
- **WCAG 2.1 AA / AAA Color Contrast Ratios**:
  - Display Title `#0D0D0D` on Canvas `#F7F8FA`: **16.9:1** (Passes AAA).
  - Story Title `#0D0D0D` on Card Surface `#F7F8FA`: **16.9:1** (Passes AAA).
  - Description Paragraph `#374151` on Card Surface `#F7F8FA`: **8.9:1** (Passes AAA).
  - Brand Blue Tags & Links `#0528F2` on `#F7F8FA`: **7.8:1** (Passes AAA).
  - Muted Path Milestones `#6B7280` on `#F7F8FA`: **4.4:1** (Passes AA for graphical/supporting text).
- **Reduced Motion Support (`prefers-reduced-motion: reduce`)**:
  - The pulsing glowing dot on `.home-index::before` ceases animation and displays as a steady cyan dot.
  - Card hover translateY (`-3px`) and button hover translateX (`4px`) transitions are suppressed.

---

## 11. NOT FOUND IN CODE

| Item | Codebase Status | Recommended Elementor Implementation |
|---|---|---|
| **Demo Modal Target URL** | Code attaches `onClick={openDemo}`, invoking a React state hook that mounts `<DemoDialog />`. | In Elementor Pro, link `.outcome-demo-link` to **Dynamic Tags > Actions > Popup > Open Popup** (selecting the global demo booking modal), or set `href="#final-cta"` / `href="#book-demo"`. |
| **Card Click Targets** | Cards are non-clickable `<article>` containers with hover elevation; they do not have surrounding `<a>` tags. | Maintain cards as informational containers, or optionally make each card linkable to related product capability sub-pages or anchors (e.g. `#capabilities`). |
| **Watermark Explicit Z-Index** | Code sets `color: rgba(11, 16, 32, 0.03)` without an explicit `z-index`. | In Elementor, set the watermark widget to `z-index: 0` and the card body container to `position: relative; z-index: 1;` to avoid text selection collisions. |

---

# PART B — SIX-PART ELEMENTOR IMPLEMENTATION MAPPING

### 1. NATIVE WIDGETS / CONTROLS

| Visual Element | Native Elementor Pro Widget | Built-In Controls Used for Styling |
|---|---|---|
| **Section Title** (`Better flow...`) | **Heading Widget** | HTML Tag: `H2`, Typography: Manrope 48px (tablet 36px), Line-Height: 1.08, Letter-Spacing: -0.05em, Text Color: Global Brand Ink (`#0D0D0D`), Margin Top: 32px. |
| **Eyebrow Badge** (`PROVEN OUTCOMES`) | **Heading / Text Editor Widget** | Inline-block container, Typography: Manrope 11px Bold, Letter-Spacing: 0.12em, Text Transform: Uppercase, Text Color: Global Brand Blue (`#0528F2`), Background: `rgba(5, 40, 242, 0.05)`, Border: 1px Solid `rgba(5, 40, 242, 0.12)`, Border Radius: 9999px, Padding: 5px 14px, Box Shadow: 0 1px 3px rgba(5,40,242,0.04). |
| **Card Watermark Numeral** (`01`–`06`) | **Heading Widget** | Text: `01`–`06`, Typography: Manrope 80px ExtraBold (800), Text Color: `rgba(11, 16, 32, 0.03)`, Position: Absolute, Horizontal Orientation: Right (16px), Vertical Orientation: Bottom (8px), Z-Index: 0. |
| **Topline Tag** (`[ OUTCOME ]`) | **Heading / Text Editor Widget** | Typography: Manrope 10px Bold, Letter-Spacing: 0.08em, Text Color: Global Brand Blue (`#0528F2`). |
| **Metric Pill** (`-12 Days DSO`, etc.) | **Heading / Text Editor Widget** | Typography: Manrope 10px Bold, Text Color: Global Brand Ink (`#0D0D0D`), Background: Global White (`#FFFFFF`), Border: 1px Solid Global Border Strong (`#DDE3EA`), Border Radius: 4px, Padding: 3px 8px. |
| **Story Title** (`GET PAID FASTER`, etc.) | **Heading Widget** | HTML Tag: `H3` or `DIV`, Typography: Manrope 18.4px Bold, Line-Height: 1.3, Letter-Spacing: -0.02em, Text Color: Global Brand Ink (`#0D0D0D`). |
| **Story Description** (`Automate reminders...`) | **Text Editor Widget** | Typography: Manrope 15px Regular, Line-Height: 1.55, Text Color: Global Text Secondary (`#374151`), Margin Top: 6.4px. |
| **Path Milestone Labels** (`Receivable`, etc.) | **Text Editor / Heading Widget** | Typography: Manrope 11px SemiBold (600), Text Color: Global Text Muted (`#6B7280`). |
| **Path Milestone Arrows** (14px) | **Icon Widget** | Icon: Upload `proven-outcomes-arrow.svg`, Size: 14px, Primary Color: Global Text Muted (`#6B7280`), Alignment: Center. |
| **Demo Action Button** (`See what one connected...`) | **Button Widget** | Type: Default, Size: Medium, Text: "See what one connected workflow could change", Typography: Manrope 15px Bold, Text Color: Global Brand Blue (`#0528F2`), Background Color: Transparent, Icon: Upload `proven-outcomes-arrow.svg` (16px), Icon Position: After, Icon Spacing: 8px, Margin Top: 48px, Hover State > Transform: TranslateX 4px. |

---

### 2. CONTAINERS / FLEXBOX / GRID

| Container Hierarchy | Container Type | Layout Settings (Direction, Gap, Alignment, Dimensions) | Responsive Reflow Behavior |
|---|---|---|---|
| **Outer Section Container** (`.home-outcomes`) | Flexbox Container | Direction: Column, Width: 100%, Min-Height: Auto, Padding: 72px 0 (Desktop) / 48px 0 (Mobile), Background: `#F7F8FA`. | Full-width container spanning 100% viewport. |
| **Inner Container Wrapper** (`.home-container`) | Flexbox Container | Direction: Column, Content Width: Boxed, Max-Width: 1280px, Padding: 0 48px (Desktop) / 0 20px (Mobile), Align Items: Flex-Start. | Bounds content within 1280px container grid. |
| **Editorial Card Grid** (`.outcome-editorial`) | Grid Container | Grid Template Columns: `repeat(3, 1fr)` (3 equal columns), Gap: 20px, Margin-Top: 64px, Width: 100%. | **Tablet (≤ 1024px)**: Reflows to 2 columns (`repeat(2, 1fr)`).<br/>**Mobile (≤ 768px)**: Reflows to 1 column (`1fr`), Margin-Top drops to 56px. |
| **Outcome Story Card** (`.outcome-story`) | Flexbox Container | Direction: Column, Justify Content: Space-Between, Align Items: Stretch, Min-Height: 256px, Padding: 24px, Position: Relative, Overflow: Hidden, Background: `#F7F8FA`, Border: 1px Solid `#E6EAF0`, Border Top: 3px Solid `#0D0D0D`, Border Radius: 12px, Box Shadow: 0 1px 2px rgba(11,16,32,0.04). Hover State: Border Top Color `#0528F2`, Box Shadow 0 4px 12px rgba(11,16,32,0.06), Transform TranslateY -3px. | **Mobile (≤ 768px)**: Min-Height drops to 192px (12rem) to eliminate vertical slack. |
| **Card Topline Row** (`.outcome-story-topline`) | Flexbox Container | Direction: Row, Justify Content: Space-Between, Align Items: Center, Width: 100%. | Retains horizontal alignment across all breakpoints. |
| **Card Body Block** (`.outcome-story-body`) | Flexbox Container | Direction: Column, Align Items: Flex-Start, Gap: 6.4px, Width: 100%, Position: Relative, Z-Index: 1. | Stacks headline and body copy cleanly. |
| **Card Path Sequence** (`.outcome-story-path`) | Flexbox Container | Direction: Row, Align Items: Center, Gap: 6.4px, Width: 100%, Padding-Top: 12px, Border Top: 1px Dashed `#E6EAF0`. | Wraps cleanly if space requires, preserving milestone order. |
| **Demo Action Link Row** | Flexbox Container | Direction: Row, Align Items: Center, Gap: 8px, Width: Fit-Content, Margin-Top: 48px. | Left-aligned button block. |

---

### 3. GLOBAL ELEMENTOR STYLES / TOKENS

| Token Name | Token Role / Elementor Mapping | Hex / Value | Reusability / Global Status |
|---|---|---|---|
| `Global / Neutral 50` | Section background, card background fill | `#F7F8FA` | Reused across entire site (e.g. Header dropdowns, Role views). |
| `Global / Brand Ink` | Heading text, card titles, default top card border | `#0D0D0D` | Core site-wide primary ink color. |
| `Global / Brand Blue` | Eyebrow text, outcome tag, card hover border, demo link | `#0528F2` | Primary brand accent color (`--flow-primary`). |
| `Global / Border Default` | Card outer border, dashed path separator | `#E6EAF0` | Standard neutral border (`--neutral-200`). |
| `Global / Border Strong` | Metric pill border | `#DDE3EA` | Elevated neutral border (`--neutral-300`). |
| `Global / Text Secondary`| Story description copy | `#374151` | Standard readable secondary text (`--neutral-700`). |
| `Global / Text Muted` | Path milestone labels, muted arrow icons | `#6B7280` | Tertiary label color (`--neutral-500`). |
| `Global / Pure White` | Metric pill background fill | `#FFFFFF` | Core neutral white (`--neutral-0`). |
| `Global / Cyan Glow` | Eyebrow pulsing beacon dot | `#05C7F2` | Interactive accent (`--flow-cyan-bright`). |
| `Global / Font Primary` | All typography across section | `"Manrope", sans-serif` | Global site font family. |
| `Global / Radius LG` | Outcome story card corners | `12px` (`0.75rem`) | Reused across all card surfaces on the site. |
| `Global / Radius SM` | Metric pill corners | `4px` (`0.25rem`) | Reused across all small status pills on the site. |
| `Global / Shadow XS` | Default card elevation | `0 1px 2px rgba(11, 16, 32, 0.04)` | Standard resting card shadow. |
| `Global / Shadow SM` | Hover elevated card shadow | `0 4px 12px rgba(11, 16, 32, 0.06)` | Standard elevated hover shadow. |

---

### 4. REUSABLE COMPONENTS

1. **`OutcomeCard` Component (Elementor Template / Global Widget)**:
   - **Rationale**: Reused 6 times within this section and suitable for use on customer proof/case study pages.
   - **Structure**: Outer card container (`.outcome-story`) with watermark numeral, topline flex row, body container, and dashed path sequence.
   - **Overridable Props (Elementor Content Controls)**:
     - `WatermarkNumber`: Text string (e.g. `01`, `02`, `03`...).
     - `IndexTag`: Text string (default: `[ OUTCOME ]`).
     - `MetricPill`: Text string (e.g. `-12 Days DSO`, `₹12.4 Cr Forecast`, `-80% Manual Entry`).
     - `Title`: Headline text string (e.g. `GET PAID FASTER`).
     - `Description`: Rich text description paragraph.
     - `PathNode1`: Starting milestone string (e.g. `Receivable`).
     - `PathNode2`: Intermediate milestone string (e.g. `Collection`).
     - `PathNode3`: Ending milestone string (e.g. `Cash`).
2. **`ArchitecturalBeaconEyebrow` Component**:
   - **Rationale**: Reused across all 14 sections of the flowOne homepage.
   - **Overridable Props**:
     - `BadgeText`: Text string (e.g. `PROVEN OUTCOMES`).

---

### 5. CUSTOM CSS EXCEPTIONS

The following 4 items **cannot** be produced using native Elementor Pro controls and require custom CSS:

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

/* EXCEPTION 2: OpenType Tabular Numerals
   REASON NATIVE CANNOT DO IT: Elementor Pro Typography settings do not expose
   OpenType feature tags (font-variant-numeric: tabular-nums), required so that
   the watermark numeral and metric pill numbers maintain proportional optical alignment. */
selector .outcome-watermark,
selector .outcome-metric-pill {
  font-variant-numeric: tabular-nums !important;
}

/* EXCEPTION 3: Non-Standard Variable Font Weight 650
   REASON NATIVE CANNOT DO IT: Elementor's Typography weight selector only offers 100-step
   increments (600 or 700). The Manrope variable font optical heading weight is exactly 650. */
selector h2.home-section-h2 {
  font-weight: 650 !important;
}

/* EXCEPTION 4: Card Hover Top Border Color Transition
   REASON NATIVE CANNOT DO IT: While Elementor supports border color changes on hover,
   it applies the transition to all 4 borders simultaneously. Applying a 3px border
   specifically to border-top while keeping 1px borders on the other 3 sides without
   flicker requires custom CSS. */
selector .outcome-story {
  transition: transform 350ms ease, box-shadow 350ms ease, border-top-color 350ms ease !important;
}

selector .outcome-story:hover {
  border-top-color: #0528F2 !important;
}
```

---

### 6. CUSTOM JAVASCRIPT EXCEPTIONS

| Behavior / Interaction | Implementation Strategy | Status / Requirement Rationale |
|---|---|---|
| **Demo Modal Popup Trigger** | **Native Elementor Pro Dynamic Tag Action** (Set Button Link to: **Dynamic Tags > Actions > Popup > Open Popup**, selecting the global "Book a Demo" modal). | **NO CUSTOM JS REQUIRED**. Native Elementor Pro handles opening popup templates on button click out of the box. |
| **Smooth Scroll Fallback (if not using Popups)** | If the user directs this button to an on-page form (e.g. `#final-cta`), native Elementor anchor linking (`href="#final-cta"`) with smooth scroll handles this without custom code. | **NO CUSTOM JS REQUIRED**. |
| **Analytics / Event Tracking on Demo Click** | If custom Google Tag Manager (GTM) or dataLayer events must be pushed on click, add a lightweight event listener. | **NEEDS VERIFICATION** (Only required if enterprise analytics tracking is specified). |

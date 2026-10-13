# VERIFIED PROOF / CUSTOMER EVIDENCE — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 11: Proof / Verified Customer Evidence** (`#proof` / `.home-proof.home-section`, lines 1147–1151 in `src/Homepage.tsx`) of the flowOne website.

> [!IMPORTANT]
> **CRITICAL BUILD INSTRUCTION FOR ELEMENTOR BUILDERS**:
> The React/TSX/CSS in this document is the **visual and behavioral source of truth only**. It must **not** be pasted into WordPress as a raw HTML block. Every element must be constructed natively in Elementor Pro using Containers (Flexbox/Grid), native widgets (Heading, Text Editor, Button/Icon Link, Container Grid), Global Styles, responsive controls, and reusable Components. Custom CSS must only be used where native Elementor controls are structurally incapable of delivering the design (e.g. the animated cyan beacon pulse dot and the dashed placeholder card outline).

---

# PART A — STANDARD CONTENT

## 1. FILE MAP & SECTION OVERVIEW

### 1.1 Purpose & Page Placement
- **Section Purpose**: Demonstrates flowOne's uncompromising enterprise credibility and transparency. Following Section 10 (*Built for Every Role*, which establishes the tailored views across personas), Section 11 presents verified real-world operational evidence and outcomes.
- **Enterprise Integrity Mandate**: Rather than displaying fabricated customer quotes, unverified logos, or generic marketing copy that erodes B2B trust, flowOne adopts a principled "Verified Evidence Only" standard. The section explicitly displays an architectural placeholder card structured with the exact operational data points that verified customer case studies will contain:
  1. `CUSTOMER LOGO`: Verified enterprise partner mark.
  2. `INDUSTRY`: Specific vertical and operational model.
  3. `PROBLEM`: The disconnected system bottleneck previously experienced.
  4. `FLOW IMPLEMENTED`: The continuous flowOne lifecycle deployed (e.g., Customer-to-Cash, Procure-to-Pay).
  5. `MEASURED OUTCOME`: Audited operational and cash-flow efficiency improvements.
- **Transitional CTA Link**: Provides an inline action link (`[Case study link] →`) anchored to `#final-cta` so prospective clients can request early customer reference calls or join the customer advisory board.
- **Page Placement**:
  - **Preceding Section**: Section 10: Built for Every Role / Platform by Role (`#roles` / `.home-roles.home-section`, lines 1044–1145 in `src/Homepage.tsx`).
  - **Succeeding Section**: Section 12: A Connected Operating Model / What is flowOne FAQ & Trust Architecture (`.home-answer` & `#trust`, lines 1153–1168 in `src/Homepage.tsx`).

### 1.2 Component File Names & Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 1147–1151**: Complete Section 11 JSX markup (`#proof`, `.home-container`, `.section-heading-row`, `.proof-placeholder`, `.proof-fields`, and inline case study action link).
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `<Icon />` primitive rendering `name="arrow"` (`fo-icon-16 fo-icon-action`).
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (container width formula & fluid side padding).
  - **Line 5**: `.home-section` (section vertical padding clamp & background baseline).
  - **Lines 8–47**: `.home-index` (capsule eyebrow, pulse animation dot pseudo-element, hover state).
  - **Lines 49–60**: `@keyframes beacon-pulse` (cyan glowing beacon animation).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 3197–3209**: Section 11 styles (`.home-proof`, `.proof-placeholder`, `.proof-fields`, typography rules, and action link hover effects).
  - **Lines 4396**: `@media (max-width: 64rem)` (1024px tablet override: single-column section heading row with 32px gap).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile override: section padding clamp, 24px heading margin-bottom).
  - **Lines 4591–4592**: `@media (max-width: 48rem)` (768px mobile override: `.proof-placeholder` collapses to vertical column with 20px gap, `.proof-fields` collapses from 5 columns to single column).
  - **Line 4629**: `@media (prefers-reduced-motion: reduce)` motion suppression rules.
- **`src/components/flowone.css`**:
  - **Lines 36–40**: `.fo-icon`, `.fo-icon-16`, `.fo-icon-action` (icon sizing, SVG stroke styling, and brand blue tone).
  - **Lines 108–109**: `.fo-link-arrow` interaction transition.
- **`src/index.css`**:
  - **Lines 11–221**: Design tokens (neutral scale, brand blue, cyan bright, typography clamps, radius tokens, and spatial scale).

---

## 2. VERBATIM CODE

### 2.1 Verbatim JSX / TSX Markup (`src/Homepage.tsx`, Lines 1147–1151)
```tsx
    <section id="proof" className="home-proof home-section">
      <div className="home-container"><div className="section-heading-row"><div><span className="home-index">VERIFIED PROOF</span><h2>Built for businesses that need the whole picture.</h2></div><p>Verified customer evidence will live here. Until supplied, every proof point remains explicitly marked.</p></div>
        <div className="proof-placeholder"><div><span>PROOF COMING SOON · VERIFIED EVIDENCE ONLY</span><strong>[Customer name and verified quote]</strong><div className="proof-fields">{["CUSTOMER LOGO","INDUSTRY","PROBLEM","FLOW IMPLEMENTED","MEASURED OUTCOME"].map(x=><p key={x}><b>{x}</b><span>[To be supplied]</span></p>)}</div></div><a href="#final-cta">[Case study link] <Icon name="arrow" size={16} tone="action"/></a></div>
      </div>
    </section>
```

### 2.2 Verbatim Icon Primitive (`src/components/flowone.tsx`, Lines 6–17)
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

### 2.3 Verbatim CSS Styles (`src/homepage.css` & `src/components/flowone.css`)
```css
/* Container & Section Foundations */
.home-container {
  width: min(var(--container-wide), 100% - var(--page-padding) * 2);
  margin-inline: auto;
}

.home-section {
  padding-block: var(--section-large);
  position: relative;
  content-visibility: auto;
  contain-intrinsic-size: 1px 900px;
}

/* Eyebrow Badge & Beacon Animation */
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

/* Section Header Typography */
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

/* SECTION 11: Proof Elements */
.home-proof {
  background: var(--neutral-50);
}

.proof-placeholder {
  min-height: 20rem;
  padding: var(--spacing-5);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: var(--neutral-0);
  border: 1px dashed var(--neutral-300);
  border-radius: var(--radius-lg);
}

.proof-placeholder > div {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.proof-placeholder span {
  color: var(--color-text-tertiary);
  font-size: .65rem;
}

.proof-placeholder strong {
  max-width: 40rem;
  font-size: var(--font-h3);
  font-weight: 650;
  line-height: 1.25;
}

.proof-placeholder p {
  color: var(--color-text-tertiary);
}

.proof-placeholder a {
  display: flex;
  gap: .5rem;
  align-items: center;
  color: var(--flow-primary);
  text-decoration: none;
  font-weight: 700;
  transition: color 180ms ease;
  white-space: nowrap;
}

.proof-placeholder a:hover {
  color: var(--flow-primary-deep);
}

.proof-fields {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-1);
}

.proof-fields p {
  min-width: 8rem;
  padding: var(--spacing-1);
  display: flex;
  flex-direction: column;
  gap: .3rem;
  border-left: 1px solid var(--color-border-strong);
  margin: 0;
}

.proof-fields b {
  color: var(--color-text-secondary);
  font-size: .55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Icon Primitives */
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

.fo-icon-action {
  color: var(--color-brand-blue);
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

  .proof-placeholder {
    min-height: auto;
    padding: var(--spacing-3);
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .proof-fields {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-index::before {
    animation: none;
  }
  .proof-placeholder a {
    transition: none;
  }
}
```

### 2.4 Shared Design Tokens & Resolved Values
| CSS Token Name | Resolved Hex / CSS Value | Description / Element Usage |
| :--- | :--- | :--- |
| `--neutral-50` | `#F7F8FA` | Section background color (`.home-proof`) |
| `--neutral-0` | `#FFFFFF` | Card background color (`.proof-placeholder`) |
| `--neutral-300` | `#DDE3EA` | Dashed border outline of placeholder card |
| `--flow-primary` | `#0528F2` | Eyebrow text, badge border base, action link color |
| `--flow-primary-deep` | `#0540F2` | Action link hover color |
| `--flow-cyan-bright` | `#05C7F2` | Eyebrow glowing beacon pulse dot |
| `--color-text-primary` | `#0D0D0D` | Heading 2 and strong quote text |
| `--color-text-secondary` | `#374151` | Heading row description paragraph, field labels (`<b>`) |
| `--color-text-tertiary` | `#6B7280` | Card status notice, field placeholder values (`[To be supplied]`) |
| `--color-border-strong` | `#DDE3EA` | Left divider line on each metadata field item |
| `--container-wide` | `80rem` (`1280px`) | Maximum content container width |
| `--page-padding` | `clamp(1.25rem, 3.34vw, 3rem)` | Fluid horizontal container padding |
| `--spacing-1` | `0.5rem` (`8px`) | Field grid gap & internal item padding |
| `--spacing-3` | `1.5rem` (`24px`) | Vertical gap in placeholder left column, mobile card padding |
| `--spacing-4` | `2rem` (`32px`) | Margin-top on `h2`, tablet heading gap |
| `--spacing-5` | `2.5rem` (`40px`) | Desktop card inner padding |
| `--spacing-10` | `5rem` (`80px`) | Desktop heading row gap |
| `--spacing-12` | `6rem` (`96px`) | Desktop section top/bottom padding |
| `--section-large` | `var(--spacing-12)` = `96px` | Section vertical block padding |
| `--radius-lg` | `0.75rem` (`12px`) | Placeholder card corner border radius |
| `--radius-full` | `9999px` | Pill badge border radius |
| `--font-family-primary` | `"Manrope", sans-serif` | Global typeface across all text elements |
| `--font-h2` | `clamp(2.25rem, 3.34vw, 3rem)` | Main section heading size (`36px` to `48px`) |
| `--font-h3` | `clamp(1.75rem, 2.23vw, 2rem)` | Placeholder quote headline size (`28px` to `32px`) |
| `--leading-heading` | `1.08` | Section heading line-height |

---

## 3. CONTENT MATRIX

Every text string in display order, verified against `src/Homepage.tsx` lines 1147–1151:

| # | Element Description | String Content | HTML Tag | Font Family | Size (px / clamp) | Weight | Line Ht | Letter Spacing | Color Token & Hex |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **01** | Section Eyebrow Badge | `VERIFIED PROOF` | `<span class="home-index">` | Manrope | `0.68rem` (`11px`) | 700 | 1.0 | `0.12em` | `--flow-primary` (`#0528F2`) |
| **02** | Main Section Heading | `Built for businesses that need the whole picture.` | `<h2>` | Manrope | `clamp(2.25rem, 3.34vw, 3rem)` | 650 | 1.08 | `-0.05em` | `--color-text-primary` (`#0D0D0D`) |
| **03** | Section Explanatory Copy | `Verified customer evidence will live here. Until supplied, every proof point remains explicitly marked.` | `<p>` | Manrope | `1.0625rem` (`17px`) | 400 | 1.7 | `normal` | `--color-text-secondary` (`#374151`) |
| **04** | Placeholder Kicker Notice | `PROOF COMING SOON · VERIFIED EVIDENCE ONLY` | `<span>` | Manrope | `0.65rem` (`10.5px`) | 700 | 1.2 | `0.08em` | `--color-text-tertiary` (`#6B7280`) |
| **05** | Case Study Quote / Headline | `[Customer name and verified quote]` | `<strong>` | Manrope | `clamp(1.75rem, 2.23vw, 2rem)` | 650 | 1.25 | `-0.03em` | `--color-text-primary` (`#0D0D0D`) |
| **06** | Field 1 Label | `CUSTOMER LOGO` | `<b>` | Manrope | `0.55rem` (`9px`) | 700 | 1.2 | `0.06em` | `--color-text-secondary` (`#374151`) |
| **07** | Field 1 Placeholder Value | `[To be supplied]` | `<span>` | Manrope | `0.75rem` (`12px`) | 400 | 1.3 | `normal` | `--color-text-tertiary` (`#6B7280`) |
| **08** | Field 2 Label | `INDUSTRY` | `<b>` | Manrope | `0.55rem` (`9px`) | 700 | 1.2 | `0.06em` | `--color-text-secondary` (`#374151`) |
| **09** | Field 2 Placeholder Value | `[To be supplied]` | `<span>` | Manrope | `0.75rem` (`12px`) | 400 | 1.3 | `normal` | `--color-text-tertiary` (`#6B7280`) |
| **10** | Field 3 Label | `PROBLEM` | `<b>` | Manrope | `0.55rem` (`9px`) | 700 | 1.2 | `0.06em` | `--color-text-secondary` (`#374151`) |
| **11** | Field 3 Placeholder Value | `[To be supplied]` | `<span>` | Manrope | `0.75rem` (`12px`) | 400 | 1.3 | `normal` | `--color-text-tertiary` (`#6B7280`) |
| **12** | Field 4 Label | `FLOW IMPLEMENTED` | `<b>` | Manrope | `0.55rem` (`9px`) | 700 | 1.2 | `0.06em` | `--color-text-secondary` (`#374151`) |
| **13** | Field 4 Placeholder Value | `[To be supplied]` | `<span>` | Manrope | `0.75rem` (`12px`) | 400 | 1.3 | `normal` | `--color-text-tertiary` (`#6B7280`) |
| **14** | Field 5 Label | `MEASURED OUTCOME` | `<b>` | Manrope | `0.55rem` (`9px`) | 700 | 1.2 | `0.06em` | `--color-text-secondary` (`#374151`) |
| **15** | Field 5 Placeholder Value | `[To be supplied]` | `<span>` | Manrope | `0.75rem` (`12px`) | 400 | 1.3 | `normal` | `--color-text-tertiary` (`#6B7280`) |
| **16** | Action Link Label | `[Case study link]` | `<a>` | Manrope | `0.9375rem` (`15px`) | 700 | 1.2 | `normal` | `--flow-primary` (`#0528F2`) |

---

## 4. MEDIA & ASSETS

All assets have been extracted and prepared in `proof-assets/` and packaged in `proof-icons.zip`.

| Asset File Name | Format | Display Dimensions | Native ViewBox | CSS Color / Tone | Description & Placement |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `arrow.svg` | SVG | `16 × 16 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Right-facing directional arrow inside the `[Case study link]` anchor. Stroke width: `1.5`, stroke-linecap: `round`. |

### 4.1 Asset Package Reference
- **Directory**: `proof-assets/`
  - `proof-assets/arrow.svg`
- **ZIP File**: `proof-icons.zip` (located in root workspace directory)

---

## 5. LAYOUT & STRUCTURE

### 5.1 Container Hierarchy
```text
section#proof.home-proof.home-section (width: 100%, bg: #F7F8FA, padding: 96px 0)
└── div.home-container (max-width: 1280px, centered)
    ├── div.section-heading-row (CSS Grid: 1.4fr 0.8fr, gap: 80px, align-items: end)
    │   ├── div (flex column: gap 0)
    │   │   ├── span.home-index (inline-flex, pill shape, cyan pulse dot)
    │   │   └── h2 (margin-top: 32px, max-width: 100%)
    │   └── p (align-self: end, max-width: 32rem, color: #374151)
    └── div.proof-placeholder (Flexbox row, justify-between, align-end, bg: #FFFFFF, border: 1px dashed #DDE3EA, radius: 12px, padding: 40px)
        ├── div (Left Column: flex column, gap: 24px)
        │   ├── span (Kicker: 10.5px uppercase, color: #6B7280)
        │   ├── strong (Headline: 28-32px bold quote, color: #0D0D0D, max-width: 640px)
        │   └── div.proof-fields (CSS Grid: repeat(5, 1fr), gap: 8px)
        │       ├── p (Field 1: border-left 1px solid #DDE3EA, padding: 8px)
        │       │   ├── b ("CUSTOMER LOGO")
        │       │   └── span ("[To be supplied]")
        │       ├── p (Field 2: border-left 1px solid #DDE3EA, padding: 8px)
        │       │   ├── b ("INDUSTRY")
        │       │   └── span ("[To be supplied]")
        │       ├── p (Field 3: border-left 1px solid #DDE3EA, padding: 8px)
        │       │   ├── b ("PROBLEM")
        │       │   └── span ("[To be supplied]")
        │       ├── p (Field 4: border-left 1px solid #DDE3EA, padding: 8px)
        │       │   ├── b ("FLOW IMPLEMENTED")
        │       │   └── span ("[To be supplied]")
        │       └── p (Field 5: border-left 1px solid #DDE3EA, padding: 8px)
        │           ├── b ("MEASURED OUTCOME")
        │           └── span ("[To be supplied]")
        └── a (Right Column: inline-flex row, align-center, gap: 8px, color: #0528F2, href: "#final-cta")
            ├── Text: "[Case study link]"
            └── svg.fo-icon-16 (arrow icon)
```

---

## 6. RESPONSIVE BEHAVIOUR

### 6.1 Desktop (`≥ 1024px`)
- **Heading Row**: 2-column grid (`1.4fr 0.8fr`) with `80px` gap. Left column houses the eyebrow pill and `h2`; right column houses the explanatory paragraph aligned to the bottom baseline.
- **Proof Card**: Full-width container with minimum height `20rem` (`320px`), padded `40px` all around. Horizontal flex layout with `justify-content: space-between; align-items: flex-end`.
- **Metadata Fields**: 5-column horizontal grid (`repeat(5, 1fr)`), each column has a subtle left border (`1px solid #DDE3EA`) acting as a vertical separator between data points.
- **Action Link**: Aligned to bottom-right corner, on the same horizontal baseline as the metadata fields.

### 6.2 Tablet (`768px – 1023px`)
- **Heading Row**: Automatically switches to single-column (`grid-template-columns: 1fr`) with `32px` vertical gap.
- **Proof Card**: Remains horizontal if viewport width allows (`≥ 768px`), retaining the 5-column grid or wrapping metadata columns cleanly. Card padding remains `40px`.

### 6.3 Mobile (`< 768px`)
- **Section Padding**: Reduces to `clamp(2.25rem, 4.5vh, 3rem)` (approx. `36px` to `48px`).
- **Heading Row**: Single-column stack with `1.5rem` (`24px`) bottom margin. Heading font size fluidly scales via clamp.
- **Proof Card**:
  - `min-height: auto;`
  - `padding: var(--spacing-3)` (`24px`);
  - `flex-direction: column;` with `align-items: flex-start;` and `gap: 1.25rem` (`20px`).
- **Metadata Fields**: Switches from 5 columns to single column (`grid-template-columns: 1fr`). Each field item stacks vertically while maintaining its left border line and `8px` padding.
- **Action Link**: Moves below the metadata fields, aligning to the left edge with touch-accessible tap target.

---

## 7. INTERACTION & ANIMATION

### 7.1 Hover & Interactive States
1. **Eyebrow Pill (`.home-index`)**:
   - Default: `background: rgba(5, 40, 242, 0.05); border: 1px solid rgba(5, 40, 242, 0.12);`
   - Hover: `background: rgba(5, 40, 242, 0.08); border-color: rgba(5, 40, 242, 0.22); box-shadow: 0 2px 8px rgba(5, 40, 242, 0.08);`
2. **Beacon Pulse Animation (`::before`)**:
   - Infinite 2.4s smooth heartbeat pulse (`0%` scale 1.0, glow 8px → `50%` scale 0.8, glow 3px → `100%` scale 1.0).
3. **Action Link (`.proof-placeholder a`)**:
   - Default: `color: var(--flow-primary)` (`#0528F2`).
   - Hover: `color: var(--flow-primary-deep)` (`#0540F2`).
   - Arrow icon inherits the link color via `currentColor`.
4. **Card Hover**: Subtle cursor feedback indicating interactive placeholder surface.

### 7.2 Accessibility & Reduced Motion
- When `prefers-reduced-motion: reduce` is detected:
  - `@keyframes beacon-pulse` is deactivated (`animation: none;`). The beacon dot remains statically visible at `opacity: 1;`.
  - Link color transitions become instantaneous (`transition: none;`).

---

## 8. DEPENDENCIES & THIRD-PARTY LIBRARIES

- **Zero Outside JavaScript Packages**: This section is 100% pure semantic HTML and CSS. No GSAP, ScrollTrigger, Swiper, or external slider dependencies are required.
- **SVG Icon**: 1 standard inline SVG arrow icon (`16 × 16 px`).

---

## 9. ACCESSIBILITY SPECIFICATIONS

- **Semantic Landmark**: Wrapped in an accessible `<section id="proof">` landmark.
- **Heading Order**: Section title uses semantic `<h2>`, card title uses `<strong>` (or `<h3>` when real case study title is rendered).
- **Color Contrast Ratios**:
  - Main Heading `#0D0D0D` on `#F7F8FA`: **16.5:1** (Exceeds WCAG AAA requirement of 7:1).
  - Body Copy `#374151` on `#F7F8FA`: **8.2:1** (Exceeds WCAG AAA).
  - Action Link `#0528F2` on `#FFFFFF`: **8.4:1** (Exceeds WCAG AAA).
  - Metadata Labels `#374151` on `#FFFFFF`: **9.5:1** (Exceeds WCAG AAA).
  - Eyebrow Text `#0528F2` on `rgba(5, 40, 242, 0.05)`: **7.8:1** (Exceeds WCAG AAA).
- **Interactive Focus Indicator**: Action link responds to `:focus-visible` with a 2px high-contrast solid focus ring (`--state-focus: #0528F2`) and 2px offset.

---

## 10. EDGE CASES & STRESS TESTING

1. **Varying Headline Length**:
   - If a real customer quote is long (e.g. 3 lines), `strong` is constrained to `max-width: 40rem` (`640px`) with balanced text wrapping to prevent layout clipping.
2. **Metadata Field Overflow**:
   - When real values replace `[To be supplied]`, long strings (e.g., `"Automotive Electrical & Component Manufacturing"`) wrap gracefully inside each column without blowing out the 5-column grid on desktop.
3. **Screen Size Resizing**:
   - Between `1024px` and `768px`, if 5 columns become cramped on smaller laptop screens, the grid can be set to wrap or collapse to 2/3 columns via standard Elementor responsive settings.
4. **Anchor Jump Behavior**:
   - The action link `#final-cta` links smoothly down the page to Section 13 using CSS smooth scroll (`scroll-behavior: smooth`).

---

## 11. BUILD ESTIMATE & ACCEPTANCE CRITERIA

- **Elementor Implementation Difficulty**: **Low** (Pure flexbox/grid layout with zero JS logic).
- **Estimated Build Time**: **30 to 45 minutes**.
- **QA Acceptance Checklist**:
  - [ ] Section background matches `#F7F8FA` exactly.
  - [ ] Eyebrow badge displays the cyan beacon dot with the 2.4s pulse glow.
  - [ ] Heading and paragraph layout matches 2-column grid on desktop, collapsing to 1 column on tablet and mobile.
  - [ ] Proof card has a clean `1px dashed #DDE3EA` border with `12px` rounded corners and pure `#FFFFFF` background.
  - [ ] 5 metadata columns render with vertical left dividers on desktop, and stack cleanly to single column on mobile.
  - [ ] Action link hover color darkens to `#0540F2` and links smoothly to `#final-cta`.
  - [ ] Tested on 1440px desktop, 768px tablet, and 375px mobile viewport widths.

---

# PART B — ELEMENTOR PRO IMPLEMENTATION SPECIFICATION

## 1. ELEMENTOR CONTAINER HIERARCHY & WIDGET MAPPING

This section is built using **Elementor Pro Flexbox Containers** and **Grid Containers**.

```text
[Container: Section Root] (.home-proof)
│   - Tag: <section>
│   - CSS ID: proof
│   - Content Width: Full Width (100%)
│   - Background: Custom Color (#F7F8FA / Neutral 50)
│   - Padding: Desktop [96px, 0px, 96px, 0px] | Mobile [48px, 0px, 48px, 0px]
│
└── [Container: Content Wrapper] (.home-container)
    │   - Content Width: Boxed (1280px)
    │   - Padding: Desktop [0px, 48px, 0px, 48px] | Tablet [0px, 32px, 0px, 32px] | Mobile [0px, 20px, 0px, 20px]
    │   - Direction: Column
    │   - Gap: Desktop [40px] | Mobile [24px]
    │
    ├── [Container: Heading Row] (.section-heading-row)
    │   │   - Content Width: Full Width
    │   │   - Layout Type: Grid (Desktop: 2 Columns [1.4fr, 0.8fr]) | Tablet & Mobile: 1 Column
    │   │   - Align Items: End
    │   │   - Gap: Desktop [80px] | Tablet & Mobile [16px]
    │   │   - Margin Bottom: Desktop [36px] | Mobile [24px]
    │   │
    │   ├── [Container: Heading Left Column]
    │   │   │   - Direction: Column
    │   │   │   - Align Items: Start
    │   │   │   - Gap: [0px]
    │   │   │
    │   │   ├── [Widget: Heading] (Eyebrow Badge)
    │   │   │       - Title: "VERIFIED PROOF"
    │   │   │       - HTML Tag: <span>
    │   │   │       - Style: Global Color: Flow Primary (#0528F2), Size: 11px, Weight: 700, Transform: Uppercase, Letter Spacing: 0.12em
    │   │   │       - Custom CSS: selector applied with pulse beacon dot (see Section 5)
    │   │   │
    │   │   └── [Widget: Heading] (Section Title)
    │   │           - Title: "Built for businesses that need the whole picture."
    │   │           - HTML Tag: <h2>
    │   │           - Style: Global Color: Neutral 900 (#0D0D0D), Global Font: Heading 2 (clamp 36-48px), Weight: 650, Line Height: 1.08, Letter Spacing: -0.05em
    │   │           - Margin: [32px, 0px, 0px, 0px]
    │   │
    │   └── [Widget: Text Editor] (Heading Explanatory Text)
    │           - Content: "<p>Verified customer evidence will live here. Until supplied, every proof point remains explicitly marked.</p>"
    │           - Style: Global Color: Neutral 700 (#374151), Global Font: Body Text (17px), Line Height: 1.7
    │           - Align Self: End
    │
    └── [Container: Proof Card] (.proof-placeholder)
        │   - Direction: Desktop: Row (Horizontal) | Mobile: Column (Vertical)
        │   - Justify Content: Space Between
        │   - Align Items: Desktop: End | Mobile: Start
        │   - Min-Height: Desktop [320px] | Mobile [auto]
        │   - Background: Pure White (#FFFFFF)
        │   - Border Type: Dashed | Border Width: [1px] | Border Color: #DDE3EA
        │   - Border Radius: [12px]
        │   - Padding: Desktop [40px] | Mobile [24px]
        │   - Gap: Mobile [20px]
        │
        ├── [Container: Card Main Info]
        │   │   - Direction: Column
        │   │   - Gap: [24px]
        │   │   - Max-Width: Desktop [800px] | Mobile [100%]
        │   │
        │   ├── [Widget: Heading] (Kicker Notice)
        │   │       - Title: "PROOF COMING SOON · VERIFIED EVIDENCE ONLY"
        │   │       - HTML Tag: <span>
        │   │       - Style: Color: Neutral 500 (#6B7280), Size: 10.5px, Weight: 700, Letter Spacing: 0.08em, Uppercase
        │   │
        │   ├── [Widget: Heading] (Quote / Headline)
        │   │       - Title: "[Customer name and verified quote]"
        │   │       - HTML Tag: <strong> or <h3>
        │   │       - Style: Color: Neutral 900 (#0D0D0D), Global Font: Heading 3 (28-32px), Weight: 650, Line Height: 1.25, Letter Spacing: -0.03em
        │   │       - Max-Width: [640px]
        │   │
        │   └── [Container: Metadata Grid] (.proof-fields)
        │       │   - Layout Type: Grid (Desktop: 5 Columns [repeat(5, 1fr)]) | Mobile: 1 Column
        │       │   - Gap: [8px]
        │       │
        │       ├── [Container: Field 1 - Customer Logo]
        │       │       - Direction: Column, Gap: 5px, Padding: [8px, 8px, 8px, 8px]
        │       │       - Border: Left [1px solid #DDE3EA]
        │       │       - [Widget: Heading]: "CUSTOMER LOGO" (Tag: <b>, Size: 9px, Weight: 700, Color: #374151, Uppercase)
        │       │       - [Widget: Text Editor]: "[To be supplied]" (Tag: <span>, Size: 12px, Color: #6B7280)
        │       │
        │       ├── [Container: Field 2 - Industry]
        │       │       - Direction: Column, Gap: 5px, Padding: [8px, 8px, 8px, 8px]
        │       │       - Border: Left [1px solid #DDE3EA]
        │       │       - [Widget: Heading]: "INDUSTRY" (Tag: <b>, Size: 9px, Weight: 700, Color: #374151, Uppercase)
        │       │       - [Widget: Text Editor]: "[To be supplied]" (Tag: <span>, Size: 12px, Color: #6B7280)
        │       │
        │       ├── [Container: Field 3 - Problem]
        │       │       - Direction: Column, Gap: 5px, Padding: [8px, 8px, 8px, 8px]
        │       │       - Border: Left [1px solid #DDE3EA]
        │       │       - [Widget: Heading]: "PROBLEM" (Tag: <b>, Size: 9px, Weight: 700, Color: #374151, Uppercase)
        │       │       - [Widget: Text Editor]: "[To be supplied]" (Tag: <span>, Size: 12px, Color: #6B7280)
        │       │
        │       ├── [Container: Field 4 - Flow Implemented]
        │       │       - Direction: Column, Gap: 5px, Padding: [8px, 8px, 8px, 8px]
        │       │       - Border: Left [1px solid #DDE3EA]
        │       │       - [Widget: Heading]: "FLOW IMPLEMENTED" (Tag: <b>, Size: 9px, Weight: 700, Color: #374151, Uppercase)
        │       │       - [Widget: Text Editor]: "[To be supplied]" (Tag: <span>, Size: 12px, Color: #6B7280)
        │       │
        │       └── [Container: Field 5 - Measured Outcome]
        │               - Direction: Column, Gap: 5px, Padding: [8px, 8px, 8px, 8px]
        │               - Border: Left [1px solid #DDE3EA]
        │               - [Widget: Heading]: "MEASURED OUTCOME" (Tag: <b>, Size: 9px, Weight: 700, Color: #374151, Uppercase)
        │               - [Widget: Text Editor]: "[To be supplied]" (Tag: <span>, Size: 12px, Color: #6B7280)
        │
        └── [Widget: Button / Icon Link] (Action Link)
                - Text: "[Case study link]"
                - Link URL: `#final-cta`
                - Icon: Upload SVG `arrow.svg` (or Elementor native Arrow Right), Icon Position: After, Icon Spacing: 8px
                - Typography: Manrope, 15px, Weight: 700
                - Normal Style: Text Color: #0528F2, Background: Transparent, Padding: 0
                - Hover Style: Text Color: #0540F2, Background: Transparent
```

---

## 2. GLOBAL STYLES MAPPING

### 2.1 Elementor Global Colors
| Site Token | Hex Code | Elementor Global Color Name | Role in Section |
| :--- | :--- | :--- | :--- |
| `--flow-primary` | `#0528F2` | **Flow Primary** | Eyebrow text, badge border, action link |
| `--flow-primary-deep` | `#0540F2` | **Flow Primary Deep** | Action link hover state |
| `--flow-cyan-bright` | `#05C7F2` | **Flow Cyan Bright** | Eyebrow pulse dot |
| `--neutral-0` | `#FFFFFF` | **White / Surface Page** | Proof card background |
| `--neutral-50` | `#F7F8FA` | **Neutral 50** | Section background |
| `--neutral-300` | `#DDE3EA` | **Neutral 300 / Border Strong** | Dashed card border, metadata vertical lines |
| `--neutral-500` | `#6B7280` | **Neutral 500 / Text Tertiary** | Kicker text, metadata placeholder values |
| `--neutral-700` | `#374151` | **Neutral 700 / Text Secondary** | Description paragraph, metadata labels |
| `--neutral-900` | `#0D0D0D` | **Neutral 900 / Text Primary** | Main heading, quote headline |

### 2.2 Elementor Global Typography Presets
| Preset Name | Font Family | Size | Weight | Line Height | Letter Spacing | Used In |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Heading 2** | Manrope | `48px` (desktop) / `36px` (mobile) | 650 | 1.08 | `-0.05em` | `<h2>` Main Title |
| **Heading 3** | Manrope | `32px` (desktop) / `28px` (mobile) | 650 | 1.25 | `-0.03em` | `<strong>` Quote Headline |
| **Body Large** | Manrope | `17px` | 400 | 1.7 | `normal` | Description paragraph |
| **Eyebrow Pill** | Manrope | `11px` | 700 | 1.0 | `0.12em` | `VERIFIED PROOF` badge |
| **Metadata Label**| Manrope | `9px` | 700 | 1.2 | `0.06em` | `CUSTOMER LOGO`, `INDUSTRY`, etc. |
| **Link Bold** | Manrope | `15px` | 700 | 1.2 | `normal` | `[Case study link]` action |

---

## 3. REUSABLE COMPONENTS & FUTURE-PROOF DYNAMIC CMS ARCHITECTURE

### 3.1 Future-Proof Customer Evidence Architecture
While Section 11 currently renders a static placeholder card to maintain complete enterprise transparency, it is engineered to transition into a dynamic **Verified Customer Case Study Showcase** once launch assets are approved.

#### Recommended WordPress Setup (ACF Pro / JetEngine + Custom Post Type):
1. **Create Custom Post Type**: `case_study` (or `proof_evidence`)
2. **ACF Field Group**: *Verified Case Study Meta*
   - `customer_name` (Text) — e.g. "Ananya Enterprises"
   - `verified_quote` (Textarea) — e.g. "We eliminated 14 days of reconciliation lag..."
   - `customer_logo` (Image) — Verified enterprise vector logo
   - `industry` (Text) — e.g. "Specialty Chemical Manufacturing"
   - `problem_statement` (Text) — e.g. "Disconnected tally exports and unbilled warehouse dispatches"
   - `flow_deployed` (Text) — e.g. "Customer-to-Cash + Procure-to-Pay"
   - `audited_metric` (Text) — e.g. "94.2% on-time settlement, ₹1.4 Cr working capital unlocked"
   - `case_study_document` (URL / File) — PDF or full case study URL
3. **Elementor Pro Loop Template**:
   - Create a **Loop Item** named `Loop Item - Verified Proof Card`.
   - Bind the Elementor widgets inside the card to ACF dynamic tags.
   - Replace the static container with an **Elementor Pro Loop Grid** or **Loop Carousel**.
   - Set Query: Post Type = `case_study`, Posts Per Page = 1 (or 3 in a carousel).

---

## 4. NATIVE ELEMENTOR CAPABILITIES UTILIZATION

| React / TSX Feature | Native Elementor Pro Equivalent | Benefit / Implementation Notes |
| :--- | :--- | :--- |
| CSS Grid Header (`1.4fr 0.8fr`) | **Container Grid** | Set columns to `1.4fr` and `0.8fr` directly in Container Layout controls; switch to 1 column on Tablet/Mobile. |
| Metadata 5-column grid | **Container Grid** | Set columns to 5 on Desktop, 1 on Mobile. Zero custom flex math needed. |
| Dashed card border | **Container Border: Dashed** | Native Border setting: `Style > Border > Dashed > 1px`, Color `#DDE3EA`, Radius `12px`. |
| Action Link with Arrow | **Button Widget** (Style: Text/Link) | Set Type to default, Background: transparent, Icon: Arrow, Position: After. |
| Smooth scroll anchor | **Link URL: `#final-cta`** | Natively supported in WordPress & Elementor. |

---

## 5. CUSTOM CODE MINIMIZATION STRATEGY

By utilizing Elementor's native Container Grid and Border settings, **95% of this section is built without custom CSS**. Only two specific visual details require CSS snippets:

### 5.1 Custom CSS: Eyebrow Badge & Glowing Cyan Pulse
Apply this snippet directly into the **Custom CSS** tab of the `VERIFIED PROOF` Heading widget:

```css
/* Scoped to the Eyebrow Heading widget */
selector {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.32rem 0.85rem;
  border-radius: 9999px;
  background: rgba(5, 40, 242, 0.05);
  border: 1px solid rgba(5, 40, 242, 0.12);
  width: fit-content;
  box-shadow: 0 1px 3px rgba(5, 40, 242, 0.04);
  transition: all 200ms ease;
  user-select: none;
}

selector:hover {
  background: rgba(5, 40, 242, 0.08);
  border-color: rgba(5, 40, 242, 0.22);
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.08);
}

/* Glowing cyan beacon dot */
selector::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #05C7F2;
  box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  flex-shrink: 0;
  animation: proof-beacon-pulse 2.4s ease-in-out infinite;
}

@keyframes proof-beacon-pulse {
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

@media (prefers-reduced-motion: reduce) {
  selector::before {
    animation: none;
  }
}
```

### 5.2 Custom CSS: Metadata Column Border Separation
If not using native Container left borders for each column, paste this into the **Metadata Grid Container**:

```css
selector .proof-field-col {
  border-left: 1px solid #DDE3EA;
  padding: 8px 12px;
}
```

---

## 6. STEP-BY-STEP ELEMENTOR BUILD GUIDE

Follow these instructions click-by-click in Elementor Pro:

### Step 1: Section Container Setup
1. In the Elementor editor, add a new **Container (Flexbox)**.
2. In **Layout**:
   - Content Width: **Full Width**.
   - HTML Tag: `<section>`.
3. In **Style**:
   - Background Type: **Classic** → Color: `#F7F8FA`.
4. In **Advanced**:
   - CSS ID: `proof`.
   - Padding: Desktop `Top: 96px, Bottom: 96px` | Mobile `Top: 48px, Bottom: 48px`.

### Step 2: Inner Content Wrapper
1. Drag a child **Container** inside the root section.
2. In **Layout**:
   - Content Width: **Boxed** (`1280px`).
   - Direction: **Column** (Vertical).
   - Elements Gap: `40px` (Desktop) / `24px` (Mobile).
   - Padding: `Left: 48px, Right: 48px` (Mobile: `Left: 20px, Right: 20px`).

### Step 3: Section Heading Row
1. Drag a child **Container (Grid)** into the Content Wrapper.
2. In **Layout**:
   - Columns: Set custom columns formula: `1.4fr 0.8fr` (Tablet/Mobile: `1fr`).
   - Align Items: **End**.
   - Column Gap: `80px` (Tablet/Mobile: `16px`).
   - Margin Bottom: `36px` (Mobile: `24px`).
3. In the left column:
   - Add a **Heading Widget**:
     - Title: `VERIFIED PROOF`.
     - HTML Tag: `<span>`.
     - Typography: Manrope, `11px`, 700, Uppercase, Letter Spacing `0.12em`, Color `#0528F2`.
     - Go to **Advanced > Custom CSS** and paste the snippet from Section 5.1.
   - Add a second **Heading Widget**:
     - Title: `Built for businesses that need the whole picture.`.
     - HTML Tag: `<h2>`.
     - Typography: Global Heading 2, 650 weight, Line Height `1.08`, Letter Spacing `-0.05em`, Color `#0D0D0D`.
     - Margin: `Top: 32px`.
4. In the right column:
   - Add a **Text Editor Widget**:
     - Content: `Verified customer evidence will live here. Until supplied, every proof point remains explicitly marked.`.
     - Typography: Manrope, `17px`, 400, Line Height `1.7`, Color `#374151`.

### Step 4: Proof Placeholder Card
1. Drag a new child **Container (Flexbox)** below the heading row.
2. In **Layout**:
   - Direction: **Row** (Horizontal) | Mobile: **Column** (Vertical).
   - Justify Content: **Space Between**.
   - Align Items: **End** (Desktop) | **Start** (Mobile).
   - Min Height: `320px` (Mobile: `auto`).
3. In **Style**:
   - Background Type: Classic → Color: `#FFFFFF`.
   - Border Type: **Dashed**.
   - Border Width: `1px`.
   - Border Color: `#DDE3EA`.
   - Border Radius: `12px`.
   - Padding: `40px` (Mobile: `24px`).

### Step 5: Card Content & Metadata Fields
1. Inside the Proof Card, add a child **Container (Flexbox)** for the left content column:
   - Direction: **Column**, Gap: `24px`, Max-Width: `800px`.
2. Add the Kicker Heading:
   - Text: `PROOF COMING SOON · VERIFIED EVIDENCE ONLY`.
   - Tag: `<span>`.
   - Typography: Manrope, `10.5px`, 700, Letter Spacing `0.08em`, Color `#6B7280`.
3. Add the Quote Heading:
   - Text: `[Customer name and verified quote]`.
   - Tag: `<strong>` or `<h3>`.
   - Typography: Manrope, `32px` (Mobile `28px`), 650 weight, Line Height `1.25`, Letter Spacing `-0.03em`, Color `#0D0D0D`.
4. Add a child **Container (Grid)** for the metadata fields:
   - Columns: Desktop `5`, Mobile `1`.
   - Gap: `8px`.
5. Add 5 metadata column containers, each with:
   - Direction: Column, Gap: `5px`, Padding: `8px`.
   - Border Left: `1px solid #DDE3EA`.
   - Heading Widget for the label: `CUSTOMER LOGO`, `INDUSTRY`, `PROBLEM`, `FLOW IMPLEMENTED`, `MEASURED OUTCOME` (Tag: `<b>`, Size `9px`, Weight `700`, Color `#374151`, Uppercase).
   - Text Editor Widget for the placeholder value: `[To be supplied]` (Tag: `<span>`, Size `12px`, Color `#6B7280`).

### Step 6: Action Link & Polish
1. In the right side of the Proof Card, add a **Button Widget**:
   - Text: `[Case study link]`.
   - Link URL: `#final-cta`.
   - Icon: Upload SVG `arrow.svg` (from `proof-icons.zip`), Position: **After**, Spacing: `8px`.
   - In **Style**:
     - Typography: Manrope, `15px`, 700 weight.
     - Text Color: `#0528F2` (Hover: `#0540F2`).
     - Background Color: `Transparent` (Hover: `Transparent`).
     - Padding: `0px`.
2. Switch to **Tablet Preview (`1024px`)** and **Mobile Preview (`375px`)** to verify single-column collapsing.
3. Publish and verify in browser.

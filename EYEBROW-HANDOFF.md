# flowOne Hero Eyebrow Widget — Elementor Handoff Specification

> **Target Platform:** WordPress with Elementor / Elementor Pro  
> **Widget Method:** Native Elementor Widgets & Flexbox Containers (**Zero Raw HTML Embeds**)  
> **Source Component:** `flowOne-NewDesign` (`src/FinalHomepage.tsx`, `src/final-homepage.css`)  
> **Component Name:** Hero Modern Eyebrow Capsule (`.hero-modern-eyebrow`)  
> **Version:** 1.0 — Production Handoff  

---

## 1. Component Anatomy & Visual Spec

The **flowOne Hero Eyebrow** is an interactive, micro-elevated pill that sits above the main `H1` headline. It anchors the platform proposition with three discrete visual zones:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────┐                                              ┌───┐  │
│  │  ✦  P L A T F O R M     │    C O N N E C T E D   B U S I N E S S       │ → │  │
│  └─────────────────────────┘    P L A T F O R M                           └───┘  │
└──────────────────────────────────────────────────────────────────────────────────┘
   ZONE 1: Gradient Chip          ZONE 2: Uppercase Monospace Title        ZONE 3: Circle Arrow
```

### Visual Token Matrix

| Zone | Property | Token / Value | Notes |
| :--- | :--- | :--- | :--- |
| **Capsule Shell** | Dimensions | `Height: ~34px`, `Width: fit-content` | Inline flexbox container |
| | Padding | `Top: 5px, Right: 12px, Bottom: 5px, Left: 6px` | Tight, intentional optical balance |
| | Background | `linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.92) 100%)` | Glassmorphic frost |
| | Backdrop Blur | `blur(16px)` | `-webkit-backdrop-filter: blur(16px)` |
| | Border | `1px solid rgba(5, 40, 242, 0.16)` | Electric Blue hairline border |
| | Border Radius | `9999px` | Fully rounded pill |
| | Shadow (Default) | `0 2px 10px -2px rgba(5, 40, 242, 0.08), 0 1px 3px rgba(11, 16, 32, 0.04), inset 0 1px 0 #FFFFFF` | Subtle lift |
| | Shadow (Hover) | `0 8px 24px -4px rgba(5, 40, 242, 0.16), 0 0 16px rgba(5, 199, 242, 0.22)` | Cyan/Electric neon bloom |
| **Zone 1: Leading Chip** | Background | `linear-gradient(135deg, #0528F2 0%, #049DD9 100%)` | Electric Blue to Azure Cyan |
| | Padding | `Top: 3px, Right: 9px, Bottom: 3px, Left: 7px` | Pill badge |
| | Radius | `9999px` | Fully pill-shaped |
| | Typography | `Lorin` / `Manrope`, `Size: 9px` (`0.58rem`), `Weight: 800`, `Tracking: 0.08em` | Crisp white `#FFFFFF` |
| | Spark Icon (`✦`) | Size: `10px`, Color: `#FFFFFF`, Filter: `drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))` | Rotates 360° continuously |
| **Zone 2: Title Text** | Typography | `Lorin` / `Manrope`, `Size: 11.5px` (`0.72rem`), `Weight: 750 / 800`, `Tracking: 0.09em` | All-caps |
| | Color | `#0D0D0D` (Flow Ink / Dark Neutral 900) | High-contrast readability |
| **Zone 3: End Arrow** | Container | `Width: 18px`, `Height: 18px`, `Radius: 50%` | Circle disk |
| | Background | Default: `rgba(5, 40, 242, 0.07)` → Hover: `#0528F2` | Color fills on capsule hover |
| | Icon | Size: `9px`, Default: `#0528F2` → Hover: `#FFFFFF` | Arrow shifts `+2.5px` right |

---

## 2. Elementor Widget Tree Architecture

To build this **100% natively in Elementor without any raw HTML code widgets**, configure the following hierarchy of native Elementor Flexbox Containers and Core Widgets:

```text
[ Container: Hero Left Column ]
   │
   └── [ Container ] — "Hero Eyebrow Capsule" (.fo-hero-eyebrow)
         ├── [ Container ] — "Leading Brand Chip" (.fo-eyebrow-badge)
         │     ├── [ Icon Widget ] — Sparkle/Star (.fo-eyebrow-spark)
         │     └── [ Heading Widget ] — "PLATFORM" (.fo-eyebrow-badge-text)
         │
         ├── [ Heading Widget ] — "CONNECTED BUSINESS PLATFORM" (.fo-eyebrow-title)
         │
         └── [ Icon Widget ] — Arrow Right (.fo-eyebrow-arrow)
```

---

## 3. Step-by-Step Native Elementor Build Instructions

### Step 3.1: Create the Main Capsule Container (`.fo-hero-eyebrow`)
1. Drag a **Container** into your hero section.
2. In **Layout**:
   - **Container Type:** `Flexbox`
   - **Direction:** `Row (Horizontal)`
   - **Justify Content:** `Flex Start`
   - **Align Items:** `Center`
   - **Gaps (Between elements):** `10px`
   - **Width:** `Custom` → `Fit to Content` (or `Inline (auto)`)
3. In **Style**:
   - **Background Type:** `Gradient`
     - Color 1: `#FFFFFF` (Location: `0%`)
     - Color 2: `#F8FAFC` (Location: `100%`)
     - Angle: `135°`
   - **Border Type:** `Solid`
     - Width: `1px` on all sides
     - Color: `rgba(5, 40, 242, 0.16)`
   - **Border Radius:** `9999px`
   - **Box Shadow:**
     - Color: `rgba(5, 40, 242, 0.08)`
     - Horizontal: `0`, Vertical: `2`, Blur: `10`, Spread: `-2`
4. In **Advanced**:
   - **Padding:** `Top: 5px, Right: 12px, Bottom: 5px, Left: 6px`
   - **Margin:** `Bottom: 20px` (gap above H1 headline)
   - **CSS Classes:** `fo-hero-eyebrow`

---

### Step 3.2: Create Child 1 — The Leading Brand Chip (`.fo-eyebrow-badge`)
1. Drag a nested **Container** inside the capsule container.
2. In **Layout**:
   - **Direction:** `Row (Horizontal)`
   - **Align Items:** `Center`
   - **Gaps:** `5px`
   - **Width:** `Inline / Fit to content`
3. In **Style**:
   - **Background Type:** `Gradient`
     - Color 1: `#0528F2` (Location: `0%`)
     - Color 2: `#049DD9` (Location: `100%`)
     - Angle: `135°`
   - **Border Radius:** `9999px`
   - **Box Shadow:**
     - Color: `rgba(5, 40, 242, 0.32)`
     - Horizontal: `0`, Vertical: `2`, Blur: `6`, Spread: `0`
4. In **Advanced**:
   - **Padding:** `Top: 3px, Right: 9px, Bottom: 3px, Left: 7px`
   - **CSS Classes:** `fo-eyebrow-badge`
5. Inside this chip container, add:
   - **Icon Widget** (`.fo-eyebrow-spark`):
     - Icon: `e-fas-sparkles` / Star (`✦`) or custom SVG spark.
     - View: `Default`
     - Size: `10px`
     - Primary Color: `#FFFFFF`
   - **Heading Widget** (`.fo-eyebrow-badge-text`):
     - Title: `PLATFORM`
     - HTML Tag: `span`
     - Typography: `Lorin` (or `Manrope`), Size: `9px`, Weight: `800`, Transform: `Uppercase`, Letter-Spacing: `0.08em`
     - Text Color: `#FFFFFF`

---

### Step 3.3: Create Child 2 — The Title Heading (`.fo-eyebrow-title`)
1. Drag a native **Heading Widget** inside the capsule container (placed after the chip).
2. In **Content**:
   - Title: `CONNECTED BUSINESS PLATFORM`
   - HTML Tag: `span`
3. In **Style**:
   - Typography:
     - Font Family: `Lorin` (or `Manrope`)
     - Size: `11.5px` (Mobile: `10.5px`)
     - Weight: `750` or `800` (Bold)
     - Transform: `Uppercase`
     - Letter Spacing: `0.09em`
     - Line Height: `1`
   - Text Color: `#0D0D0D`
4. In **Advanced**:
   - **CSS Classes:** `fo-eyebrow-title`
   - **Padding / Margin:** `0`

---

### Step 3.4: Create Child 3 — The Circle Arrow Icon (`.fo-eyebrow-arrow`)
1. Drag a native **Icon Widget** inside the capsule container (placed at the end).
2. In **Content**:
   - Icon: `Arrow Right` (e.g. `fas fa-arrow-right` or custom clean SVG arrow)
   - View: `Stacked`
   - Shape: `Circle`
3. In **Style**:
   - Primary Color (Background): `rgba(5, 40, 242, 0.07)`
   - Secondary Color (Icon): `#0528F2`
   - Size: `9px`
   - Padding: `4.5px` (makes the total circle `18px × 18px`)
4. In **Advanced**:
   - **CSS Classes:** `fo-eyebrow-arrow`

---

## 4. Elementor Custom CSS Module

Paste this CSS snippet into the parent **Hero Eyebrow Container > Advanced > Custom CSS** (or in **Elementor Page Settings > Custom CSS** / WordPress Customizer).

This CSS attaches exclusively to the classes applied above, adding the rotating spark, glowing multi-layer gradient border, smooth hover lift, and arrow nudge animation:

```css
/* ==========================================================================
   flowOne Hero Eyebrow Widget — Elementor Custom CSS
   ========================================================================== */

/* Main Capsule Container Hover & Blur Effects */
.fo-hero-eyebrow {
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.fo-hero-eyebrow:hover {
  transform: translateY(-1.5px) !important;
  border-color: rgba(5, 40, 242, 0.32) !important;
  box-shadow: 
    0 8px 24px -4px rgba(5, 40, 242, 0.16),
    0 0 16px rgba(5, 199, 242, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 1) !important;
}

/* Subtle Gradient Glow Ring Overlay */
.fo-hero-eyebrow::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 9999px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(5, 40, 242, 0.35) 0%, rgba(4, 157, 217, 0.25) 50%, transparent 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.6;
  transition: opacity 0.24s ease;
}

.fo-hero-eyebrow:hover::before {
  opacity: 1;
}

/* Continuously Rotating Spark Animation */
.fo-eyebrow-spark i,
.fo-eyebrow-spark svg {
  display: inline-block;
  animation: foSparkRotate 4s linear infinite;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.85));
}

@keyframes foSparkRotate {
  0%   { transform: scale(1) rotate(0deg); }
  50%  { transform: scale(1.18) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

/* Arrow Hover Motion & Color Shift */
.fo-hero-eyebrow .fo-eyebrow-arrow {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.fo-hero-eyebrow .fo-eyebrow-arrow .elementor-icon {
  transition: all 0.2s ease !important;
}

.fo-hero-eyebrow:hover .fo-eyebrow-arrow {
  transform: translateX(2.5px) !important;
}

.fo-hero-eyebrow:hover .fo-eyebrow-arrow .elementor-icon {
  background-color: #0528F2 !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 8px rgba(5, 40, 242, 0.45);
}

.fo-hero-eyebrow:hover .fo-eyebrow-arrow svg {
  fill: #FFFFFF !important;
}

/* Reduced Motion Guard */
@media (prefers-reduced-motion: reduce) {
  .fo-hero-eyebrow,
  .fo-eyebrow-spark i,
  .fo-eyebrow-spark svg,
  .fo-hero-eyebrow .fo-eyebrow-arrow {
    animation: none !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## 5. Alternative: Single Elementor Pro Button Widget Method

If you prefer building this using **just 1 single native Elementor widget** (instead of a container with 3 children), use the **Elementor Button Widget**:

### Settings in Button Widget:
- **Text:** `CONNECTED BUSINESS PLATFORM`
- **Icon:** `Arrow Right` (`After`)
- **Icon Spacing:** `6px`
- **Link:** `#living-transaction` (or your modal trigger)
- **Border Radius:** `9999px`
- **Padding:** `Top: 6px, Right: 12px, Bottom: 6px, Left: 14px`
- **Background:** Gradient `#FFFFFF` to `#F8FAFC`, Border `1px solid rgba(5, 40, 242, 0.16)`
- **Text Color:** `#0D0D0D`, Font Size: `11.5px`, Weight: `800`, Letter-Spacing: `0.09em`

Then in the button's **Custom CSS**:
```css
/* Inject the leading "✦ PLATFORM" chip via CSS ::before */
selector .elementor-button-text::before {
  content: "✦ PLATFORM";
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  padding: 3px 8px;
  background: linear-gradient(135deg, #0528F2, #049DD9);
  color: #FFFFFF;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  box-shadow: 0 2px 6px rgba(5, 40, 242, 0.3);
}

/* Circle surround for the end arrow */
selector .elementor-align-icon-right {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(5, 40, 242, 0.07);
  transition: all 0.2s ease;
}

selector:hover .elementor-align-icon-right {
  background: #0528F2;
  color: #FFFFFF;
  transform: translateX(2.5px);
}
```

---

## 6. Mobile & Tablet Responsiveness

| Screen Breakpoint | Container Width | Title Font Size | Chip Font Size | Spacing Adjustments |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (> 1024px)** | `fit-content` | `11.5px` (`0.72rem`) | `9px` | Padding: `5px 12px 5px 6px` |
| **Tablet (768px – 1024px)** | `fit-content` | `11px` | `8.5px` | Padding: `4px 10px 4px 5px` |
| **Mobile (< 768px)** | `fit-content` | `10px` | `8px` | Gap: `6px`, Arrow size: `16px` |

---

## 7. QA Verification Checklist

- [ ] **No HTML Code Widget:** Implemented strictly using Elementor Flexbox Container + Core Widgets.
- [ ] **Accurate Brand Colors:** Chip uses `#0528F2` to `#049DD9`; text uses `#0D0D0D`; hairline border uses `rgba(5, 40, 242, 0.16)`.
- [ ] **Spark Motion:** Sparkle rotates smoothly without causing layout shifts.
- [ ] **Interactive Hover:** Arrow nudges right (`+2.5px`) and capsule lifts (`-1.5px`) on hover with cyan glow.
- [ ] **Reduced Motion Support:** Respects OS preferences (`prefers-reduced-motion`).

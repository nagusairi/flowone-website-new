# flowOne CTA Button System — Design & Development Handoff Specification

> **Target Platform:** WordPress with Elementor Pro (Native Button Widget & Containers)  
> **Source Repository:** `flowOne-NewDesign` (`src/components/flowone.tsx`, `flowone.css`, `homepage.css`, `navigation-system.css`)  
> **Audience:** Frontend Developers, WordPress Builders & Claude AI MCP Agents  
> **Scope:** Primary Conversion Buttons ("Book a Demo"), Secondary In-Page Links ("See How It Flows →"), Header Actions, and Sizing Scales.

---

## 1. BUTTON TAXONOMY & DESIGN SYSTEM MATRIX

| Variant | Role & Placement | Dimensions | Background & Border | Typography & Color | Hover / Active Effects |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Brand Gradient** | Main Conversion CTA (Hero, Final CTA, Modal Submit) | Large: `52px` (Hero/CTA)<br/>Medium: `40px` (Cards)<br/>Small: `34px` (Header) | Gradient: `#0528F2` (0%) → `#049DD9` (50%) → `#05C7F2` (100%)<br/>`border: none`<br/>`border-radius: 8px` | Manrope / Poppins, `600` weight<br/>Color: `#FFFFFF`<br/>Letter-spacing: `-0.01em` | Gradient shifts (`background-position: 100% 0%`), `translateY(-1px)`, double neon bloom shadow, arrow translates `+3px` |
| **Secondary Text / Arrow CTA** | Exploration Link ("See How It Flows →", "Explore Platform →") | Auto width<br/>Min-height: `52px` / `3.25rem` | `background: transparent`<br/>`border: none` | Manrope / Poppins, `700` weight<br/>Light surface: `#0528F2`<br/>Dark surface: `#FFFFFF` | Color shifts to `#041EB8` (light) or `#05C7F2` (dark), arrow translates `+4px` |
| **Secondary Outlined** | Supporting card actions, filter resets | Height: `40px`<br/>Padding: `0 20px` | `background: #FFFFFF`<br/>`border: 1px solid #D1D5DB`<br/>`border-radius: 8px` | `14px`, `600` weight<br/>Color: `#111827` | `background: #F9FAFB`<br/>`border-color: #0528F2`<br/>Color: `#0528F2` |
| **Header Compact Primary** | Topbar Navigation Action ("Book a Demo") | Height: `34px`<br/>Padding: `0 16px` | Gradient: `#0528F2` → `#05C7F2`<br/>`border-radius: 8px` | `13.5px`, `600` weight<br/>Color: `#FFFFFF` | Same sliding gradient + arrow animation |

---

## 2. THE SIGNATURE FLOWONE GRADIENT PHYSICS

The signature flowOne button uses a **200% wide fluid gradient** that glides across the button on hover rather than doing an abrupt color switch.

### 2.1 Color Stops
- **Start (0%):** `#0528F2` (flowOne Cobalt Electric Blue)
- **Midpoint (50%):** `#049DD9` (flowOne Cerulean Cyan)
- **End (100%):** `#05C7F2` (flowOne Bright Neon Cyan)
- **Gradient Angle:** `135deg`

### 2.2 Micro-Interactions Breakdown
1. **Resting State:**
   - `background-size: 200% 100%`
   - `background-position: 0% 0%`
   - `box-shadow: 0 2px 8px rgba(5, 40, 242, 0.22)`
2. **Hover State (`:hover`):**
   - `background-position: 100% 0%` (glides from dark blue to neon cyan across 350ms)
   - `transform: translateY(-1px)` (1px physical elevation)
   - `box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35)` (dual-layer neon cyan glow)
   - Child Icon / Arrow: `transform: translateX(3px)` (nudge forward)
3. **Active Click State (`:active`):**
   - `background-position: 50% 0%`
   - `transform: translateY(1px)` (physical tactile depression)
   - `box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35)`
4. **Keyboard Accessibility (`:focus-visible`):**
   - `outline: 2px solid #05C7F2`
   - `outline-offset: 3px`

---

## 3. SIZING SCALE SPECIFICATIONS

| Sizing Token | CSS Height | Padding Inline | Font Size | Icon Size | Typical Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Small (`.fo-button-small`)** | `34px` (`2.125rem`) | `16px` (`1rem`) | `13.5px` (`0.84rem`) | `14px` SVG | Sticky Header Topbar, Founder Card Trigger |
| **Medium (`.fo-button-medium`)** | `40px` (`2.5rem`) | `20px` (`1.25rem`) | `14px` (`0.875rem`) | `16px` SVG | Interactive Dashboards, Form Submissions |
| **Large (`.fo-button-large`)** | `52px` (`3.25rem`) | `24px` (`1.5rem`) | `15px` (`0.9375rem`) | `16px` SVG | Hero Primary CTA, Final Section 13 CTA |

---

## 4. ELEMENTOR PRO NATIVE WIDGET BUILDER GUIDE

To build this 100% natively in Elementor Pro without custom HTML widgets:

### 4.1 Content Tab
- **Widget**: `Button`
- **Text**: `Book a Demo`
- **Link**: Dynamic Tag → **Actions: Popup** (select `Popup - Book a Demo`)
- **Alignment**: Left (or Center on Mobile)
- **Size**: Default (controlled via Custom CSS / Padding)
- **Icon**: Upload SVG (`arrow.svg` or FontAwesome `Arrow Right`)
- **Icon Position**: **After**
- **Icon Spacing**: `8px`

### 4.2 Style Tab
- **Typography**:
  - Font Family: `Manrope` or `Poppins`
  - Size: `15px` (Desktop) / `14px` (Mobile)
  - Weight: `600` (Semi-Bold)
  - Line Height: `1`
- **Text Color**: `#FFFFFF`
- **Background Type**: **Gradient**
  - Color 1: `#0528F2` (Location: `0%`)
  - Color 2: `#05C7F2` (Location: `100%`)
  - Angle: `135°`
- **Border Type**: `None`
- **Border Radius**: `8px` (`0.5rem`)
- **Padding**: 
  - Large Button: `Top: 16px, Right: 24px, Bottom: 16px, Left: 24px`
  - Header Button: `Top: 8px, Right: 16px, Bottom: 8px, Left: 16px`
- **Box Shadow**:
  - Color: `rgba(5, 40, 242, 0.22)`
  - Horizontal: `0`, Vertical: `2`, Blur: `8`, Spread: `0`

### 4.3 Advanced Tab > Custom CSS (For the 200% Gliding Physics)
Paste this into **Advanced > Custom CSS**:

```css
/* FlowOne Signature Button Physics */
selector a.elementor-button,
selector button.elementor-button {
  background-image: linear-gradient(135deg, #0528F2 0%, #049DD9 50%, #05C7F2 100%) !important;
  background-size: 200% 100% !important;
  background-position: 0% 0% !important;
  transition: 
    background-position 350ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 250ms ease !important;
}

/* Hover elevation & neon bloom */
selector a.elementor-button:hover,
selector button.elementor-button:hover {
  background-position: 100% 0% !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35) !important;
}

/* Arrow nudge on hover */
selector a.elementor-button:hover .elementor-button-icon,
selector button.elementor-button:hover .elementor-button-icon {
  transform: translateX(3px);
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Tactile Click */
selector a.elementor-button:active,
selector button.elementor-button:active {
  transform: translateY(1px) !important;
  box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35) !important;
}
```

---

## 5. SECONDARY IN-PAGE CTA ("See How It Flows →")

### 5.1 Native Elementor Settings
- **Widget**: `Button` (or Text / Heading with Link)
- **Link**: `#living-transaction`
- **Style Tab**:
  - Background: `Transparent` (Opacity: 0)
  - Text Color: `#0528F2` (Light canvas) or `#FFFFFF` (Dark canvas)
  - Typography: `Manrope`, `14px`, Weight: `700`
  - Padding: `0px`
- **Advanced > Custom CSS**:
```css
selector a {
  transition: color 180ms ease !important;
}
selector a:hover {
  color: #041EB8 !important; /* Or #05C7F2 on dark canvas */
}
selector a:hover .elementor-button-icon {
  transform: translateX(4px);
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 6. COMPLETE REUSABLE PRODUCTION CSS

```css
/* ==========================================================================
   flowOne Global CTA Button System
   ========================================================================== */

/* 1. Base Button Container */
.fo-button {
  position: relative;
  min-width: max-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: 'Poppins', 'Manrope', -apple-system, sans-serif;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
}

/* 2. Sizing Scale */
.fo-button--small {
  height: 34px;
  padding: 0 16px;
  font-size: 13.5px;
}

.fo-button--medium {
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
}

.fo-button--large {
  height: 52px;
  padding: 0 24px;
  font-size: 15px;
}

/* 3. Primary Gradient Variant */
.fo-button--primary {
  color: #FFFFFF;
  background-color: #0528F2;
  background-image: linear-gradient(135deg, #0528F2 0%, #049DD9 50%, #05C7F2 100%);
  background-size: 200% 100%;
  background-position: 0% 0%;
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.22);
  transition: 
    background-position 350ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 250ms ease,
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    color 180ms ease;
}

.fo-button--primary:hover {
  background-position: 100% 0%;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35);
}

.fo-button--primary:active {
  background-position: 50% 0%;
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35);
}

/* 4. Arrow Icon Micro-interaction */
.fo-button .fo-button__arrow {
  display: inline-flex;
  align-items: center;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.fo-button:hover .fo-button__arrow {
  transform: translateX(3px);
}

/* 5. Accessibility */
.fo-button:focus-visible {
  outline: 2px solid #05C7F2;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .fo-button,
  .fo-button .fo-button__arrow {
    transition: none !important;
    transform: none !important;
  }
}
```

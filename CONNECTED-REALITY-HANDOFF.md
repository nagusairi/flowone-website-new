# flowOne Section 04: The Connected Reality — Builder-Grade Elementor Pro Native Handoff Specification

> **Target Platform:** WordPress with Elementor Pro on `sandbox.flowone.in`  
> **Source Repository:** `flowOne-NewDesign` (`src/components/ConnectedRealityNestedTabs.tsx`, `src/components/connectedRealityData.ts`, `src/final-homepage.css`)  
> **Concept:** Suggestion 1: Department Nested Tabs (Stripe / Developer Documentation Vertical Reference Style)  
> **Audience:** Claude AI MCP Agent, Elementor Developers, and WordPress Site Builders  
> **Strict Builder Directive:** **NO CUSTOM HTML WIDGETS.** The entire layout is designed to be built using native Elementor Pro Flexbox/Grid Containers and the native Elementor Pro **Tabs** (`nested-tabs`) widget.

---

## EXECUTIVE BUILD SUMMARY FOR AI MCP & BUILDERS

| Requirement | Implementation Architecture |
| :--- | :--- |
| **Section Name** | Section 04 — The Connected Reality (`#connected-reality-tabs-section`) |
| **Primary Widget** | **Elementor Pro `nested-tabs`** (Tabs widget with nested flex containers) |
| **Tab Orientation** | **Vertical** (Desktop > 900px), **Horizontal Touch-Snap Rail** (Mobile ≤ 768px) |
| **Left Sidebar Navigation** | Flat 6-department list with continuous vertical spine guide (`#E2E8F0`) and active crisp blue indicator line (`2.5px solid #0528F2`) |
| **Department Count** | Exactly 6 operational departments: `SALES & COMMERCIAL`, `OPERATIONS & STOCK`, `FINANCE & BILLING`, `GST & COMPLIANCE`, `COLLECTIONS & AGING`, `BANKING & SETTLEMENT` |
| **Right Content Pane** | Native Flexbox Container with: (1) Kicker Metadata, (2) Display Headline, (3) Editorial Lead, (4) Dual Before/After Comparison Card Grid, (5) Micro Telemetry Bar |
| **Typography Integration** | Headings: **Bebas Neue** (uppercase) · Body: **Lorin** / sans-serif · Technical Metrics & Conduits: **JetBrains Mono** (installed as secondary font) |
| **Color Temperature** | Pure White (`#FFFFFF`) section canvas with subtle cool slate borders (`#E2E8F0`) and brand blue accents (`#0528F2`) |

---

## 1. PLUGIN EVALUATION & WIDGET SELECTION AUDIT

During the architectural review on `sandbox.flowone.in`, four candidate widgets from the installed plugins were evaluated:

| Widget Name | Plugin | Match Rating | Architectural Verdict |
| :--- | :--- | :--- | :--- |
| **`nested-tabs`** | **Elementor Pro** (Native) | ⭐⭐⭐⭐⭐ **(Selected Winner)** | **Native Flexbox Container support.** Setting `Direction: Vertical` creates a clean left sidebar with an open container canvas on the right. Directly allows dropping a 2-column container (`✕ Fragmented Reality` vs `✦ flowOne Connected`) with zero shortcodes and zero custom JS. Active left-border line (`2.5px solid #0528F2`) is supported natively in Elementor's Style tab. |
| **`wcf--tabs`** | **Animation Addons (AAE Pro)** | ⭐⭐⭐⭐ (Strong Alternative) | Supports vertical orientation and includes GSAP motion transitions. However, tab content panels rely on repeater rich-text fields or template shortcodes rather than true drag-and-drop nested flex containers. |
| **`wcf--table-of-contents`** | **Animation Addons (AAE Pro)** | ⭐⭐ (Not Suited) | This widget (from the user's reference link `https://animation-addons.com/v3/widgets/aae-table-of-content/`) is a **Scroll-Spy Table of Contents** intended for long documentation articles to anchor-jump down the page on scroll, not for switching tabbed comparison panes in place. |
| **`elementskit-simple-tab`** | **ElementsKit Lite** | ⭐⭐⭐ (Basic) | Supports vertical orientation, but requires creating 6 separate Elementor Saved Templates for the right pane and embedding them by template ID, increasing maintenance overhead. |

> **Handoff Conclusion:** Use **Elementor Pro's native `nested-tabs` widget**. It is the fastest, cleanest, and most maintainable solution in WordPress.

---

## 2. COMPLETE 6-DEPARTMENT CONTENT MATRIX

Every tab switch immediately displays the corresponding department's metadata, comparison cards, and conduit specs.

### TAB 1: SALES & COMMERCIAL
- **Tab Label:** `SALES & COMMERCIAL`
- **Kicker:** `COMMERCIAL & REVENUE · SO-10482 · ₹8,42,000`
- **Headline:** `ORDER CONFIRMED. STOCK ALLOCATED. ZERO RE-KEYING.`
- **Lead Description:** `"Sales captures customer intent, pricing tiers, and credit agreements directly at the source. Instead of sitting trapped in CRM notes, the transaction immediately locks inventory and initiates dispatch planning."`
- **Fragmented Card (Before):**
  - Tool Pill: `🏢 CRM System (Isolated)`
  - Blind Spot: `"Order sits in sales inbox for 48 hours; warehouse and finance have zero visibility until billing cycles close."`
  - Conduit Status: `SEVERED LINK: Manual CSV Re-Upload`
- **flowOne Connected Card (After):**
  - Tool Pill: `✦ Unified Ledger Lock`
  - Benefit: `"Immediate stock reservation and credit review triggered in < 14ms with zero sales-ops drift."`
  - Conduit Status: `ACTIVE CONDUIT: Bi-directional API Sync`

---

### TAB 2: OPERATIONS & STOCK
- **Tab Label:** `OPERATIONS & STOCK`
- **Kicker:** `SUPPLY CHAIN & DISPATCH · PO-88219 · 1,200 UNITS ALLOCATED`
- **Headline:** `INVENTORY RESERVED AT ORDER CONFIRMATION. ZERO STOCK DRIFT.`
- **Lead Description:** `"Warehouse managers see committed allocations in real time. Batch selections, pick lists, and multi-location balances synchronize automatically, eliminating ghost inventory and duplicate reservations."`
- **Fragmented Card (Before):**
  - Tool Pill: `📦 Standalone WMS`
  - Blind Spot: `"Warehouse dispatches against outdated stock counts, resulting in stock-outs and backorder delays."`
  - Conduit Status: `SEVERED LINK: Nightly Batch Sync`
- **flowOne Connected Card (After):**
  - Tool Pill: `✦ Real-Time Inventory Mesh`
  - Benefit: `"Automated pick-wave generation with instant stock-lock across all regional fulfillment centers."`
  - Conduit Status: `ACTIVE CONDUIT: Live Multi-Location Sync`

---

### TAB 3: FINANCE & BILLING
- **Tab Label:** `FINANCE & BILLING`
- **Kicker:** `ACCOUNTING & REVENUE · INV-10482 · ₹9,93,560`
- **Headline:** `ONE TRANSACTION. INSTANT INVOICE. UNIFIED LEDGER LOCK.`
- **Lead Description:** `"Billing is not a separate step—it is the operational footprint of dispatch. Accounts receivable entries, revenue recognition schedules, and customer ledger balances update with mathematical finality."`
- **Fragmented Card (Before):**
  - Tool Pill: `📒 Legacy Accounting`
  - Blind Spot: `"Accountant spends 4 hours manually re-typing invoice details from dispatch slips into desktop software."`
  - Conduit Status: `SEVERED LINK: Spreadsheet Export`
- **flowOne Connected Card (After):**
  - Tool Pill: `✦ Autonomous Core Ledger`
  - Benefit: `"Dispatch confirmation instantly generates audited journal entries with linked line-item lineage."`
  - Conduit Status: `ACTIVE CONDUIT: Instant Journal & Audit Lock`

---

### TAB 4: GST & COMPLIANCE
- **Tab Label:** `GST & COMPLIANCE`
- **Kicker:** `STATUTORY COMPLIANCE · IRN-88410 · 27AAACG0000A1Z5`
- **Headline:** `REAL-TIME E-INVOICE & E-WAY BILL. ZERO PORTAL MANUAL ENTRY.`
- **Lead Description:** `"Direct API links to the NIC e-Invoice portal generate signed QR codes and IRNs within milliseconds of invoice approval. E-way bills attach automatically for seamless logistics movement."`
- **Fragmented Card (Before):**
  - Tool Pill: `🏛️ Government Portal Upload`
  - Blind Spot: `"Staff manually re-enters 30 fields into the GST portal; transcription errors trigger compliance notices."`
  - Conduit Status: `SEVERED LINK: Browser Copy-Paste`
- **flowOne Connected Card (After):**
  - Tool Pill: `✦ Direct IRP Integration`
  - Benefit: `"Signed IRN and QR code returned in < 250ms with automated GSTR-1 preparation in background."`
  - Conduit Status: `ACTIVE CONDUIT: Real-Time IRP Clearance`

---

### TAB 5: COLLECTIONS & AGING
- **Tab Label:** `COLLECTIONS & AGING`
- **Kicker:** `TREASURY & AR · COL-9904 · ₹9,93,560 DUE (D+45)`
- **Headline:** `PREDICTIVE DSO REDUCTION. AUTOMATED LEDGER-TIED FOLLOW-UPS.`
- **Lead Description:** `"Payment terms govern the transaction lifecycle. Automated WhatsApp and email payment links dynamically match invoice status, while AI calculates customer default probabilities before credit terms expire."`
- **Fragmented Card (Before):**
  - Tool Pill: `📑 Manual Ageing Sheets`
  - Blind Spot: `"Collections calls rely on 15-day-old exported aging reports, contacting customers who already paid."`
  - Conduit Status: `SEVERED LINK: Weekly PDF Reports`
- **flowOne Connected Card (After):**
  - Tool Pill: `✦ Smart Collections Engine`
  - Benefit: `"Live aging triggers structured WhatsApp payment nudges with embedded UPI/NEFT dynamic payment links."`
  - Conduit Status: `ACTIVE CONDUIT: Automated Multi-Channel Dunning`

---

### TAB 6: BANKING & SETTLEMENT
- **Tab Label:** `BANKING & SETTLEMENT`
- **Kicker:** `CASH FLOW & TREASURY · CMS-4412 · ₹9,93,560 RECEIVED`
- **Headline:** `AUTO-RECONCILIATION AT 100% CONFIDENCE. INSTANT CASH ACCESS.`
- **Lead Description:** `"Direct API feeds from Indian banking rails (HDFC, ICICI, Axis, SBI) ingest statements in real time. Incoming RTGS, NEFT, and UPI transactions auto-match against open invoices with zero human intervention."`
- **Fragmented Card (Before):**
  - Tool Pill: `🏦 Monthly Bank Statement`
  - Blind Spot: `"Payments sit unallocated in suspense accounts for weeks because bank narratives lack customer codes."`
  - Conduit Status: `SEVERED LINK: Month-End Excel Recon`
- **flowOne Connected Card (After):**
  - Tool Pill: `✦ Connected Banking Rail`
  - Benefit: `"Virtual accounts & AI narrative matching instantly settle invoices and release customer credit limits."`
  - Conduit Status: `ACTIVE CONDUIT: Real-Time Bank Webhook Recon`

---

## 3. ELEMENTOR PRO CONTAINER HIERARCHY & SETTINGS

Build the section using the following container architecture:

```
[Outer Section Container: #connected-reality-tabs-section]
├── [Container: Intro Header (Max-width 900px, Align Left)]
│   ├── [Eyebrow Capsule: ✦ REALITY · THE CONNECTED REALITY →]
│   ├── [Heading: "The transaction is connected. The systems usually aren’t."]
│   └── [Text: "Sales sees the order. Operations sees the stock. Finance sees the invoice..."]
│
└── [Container: Tabs Outer Shell (.connected-tabs-frame)]
    └── [Widget: Elementor Pro Tabs (nested-tabs)]
        ├── Tab 1: SALES & COMMERCIAL
        │   └── [Tab Content Container]
        │       ├── [Container: Header (Kicker, Headline, Lead)]
        │       ├── [Container: Dual Comparison Grid (2 Columns)]
        │       │   ├── [Left Card: ✕ Fragmented Reality]
        │       │   └── [Right Card: ✦ flowOne Connected]
        │       └── [Container: Micro Telemetry Bar]
        ├── Tab 2: OPERATIONS & STOCK (Identical structure)
        ├── Tab 3: FINANCE & BILLING (Identical structure)
        ├── Tab 4: GST & COMPLIANCE (Identical structure)
        ├── Tab 5: COLLECTIONS & AGING (Identical structure)
        └── Tab 6: BANKING & SETTLEMENT (Identical structure)
```

### 3.1 Outer Section Container Settings
- **HTML Tag:** `<section>`
- **CSS ID:** `connected-reality-tabs-section`
- **Content Width:** Boxed (`1240px` or `var(--container-standard)`)
- **Background Color:** `#FFFFFF`
- **Padding:** Top `80px`, Bottom `80px` (Desktop); Top `56px`, Bottom `56px` (Mobile)
- **Border:** Top `1px solid #E2E8F0`, Bottom `1px solid #E2E8F0`

### 3.2 Tabs Widget Settings (`nested-tabs`)
- **Tabs Direction:** **Vertical** (Desktop & Tablet)
- **Tabs Position:** Start (Left)
- **Tabs Title Alignment:** Left
- **Sidebar Width:** Approx `280px` (or `30%`)
- **Content Area Width:** Approx `70%`

### 3.3 Left Sidebar Tab Styling
- **Tab Item Padding:** `8px 12px 8px 18px`
- **Tab Item Gap:** `14px`
- **Background:** `Transparent` (Both Normal and Active)
- **Continuous Guideline (Spine):** 
  - Sidebar Container Left Border: `1.5px solid #E2E8F0`
- **Normal Tab Style:**
  - Typography: `Lorin`, 13px, Weight `550`, Letter Spacing `0.04em`
  - Text Color: `#64748B` (Neutral Slate)
  - Left Border: `2.5px solid transparent`
  - Margin Left: `-1.5px` (aligns over spine)
- **Active Tab Style:**
  - Typography: `Lorin`, 13px, Weight `750`
  - Text Color: `#0528F2` (Brand Primary Blue)
  - Left Border: `2.5px solid #0528F2`
  - Background: `Transparent`

### 3.4 Right Content Container Styling
- **Padding:** `32px 36px`
- **Background:** `#FFFFFF`
- **Kicker Line:**
  - Font: **`JetBrains Mono`** (Select Global Font: `Secondary Mono (JetBrains Mono)`)
  - Size: `11px`, Weight `700`, Color `#64748B`, Text Transform: `UPPERCASE`
- **Headline:**
  - Font: **`Bebas Neue`** (Select Global Font: `Primary / Headings`)
  - Size: `32px`, Line Height `1.1`, Color `#0B1020`
- **Lead Paragraph:**
  - Font: **`Lorin`**, Size `15px`, Line Height `1.55`, Color `#475569`

---

## 4. DUAL COMPARISON CARD SPECIFICATION

Inside each tab content container, build a 2-column container for the before/after reality comparison:

### 4.1 Left Card: Fragmented Reality (Before)
- **Background:** `#FFFBFB` (Subtle Rose/Warning Tint)
- **Border:** `1px solid #FEE2E2`
- **Border Radius:** `12px`
- **Padding:** `18px 20px`
- **Top Badge:**
  - Icon: `✕` (Red `#DC2626`)
  - Label: `FRAGMENTED REALITY` (Font: `Lorin`, 11px, Weight `800`, Color `#991B1B`)
  - Tool Pill: `#FEE2E2` bg, `#7F1D1D` text
- **Body:**
  - Kicker: `⚠️ DEPARTMENTAL BLIND SPOT` (Font: `Lorin`, 10px, Weight `800`, Color `#B45309`)
  - Text: Silo impact description (Font: `Lorin`, 13px, Color `#475569`)
- **Footer (Conduit Status):**
  - Dot: `6 × 6 px`, Red `#E11D48` with glow `0 0 6px rgba(225, 29, 72, 0.5)`
  - Label: `SEVERED LINK:` (Font: `JetBrains Mono`, 10px, Weight `800`, Color `#9F1239`)
  - Value: Severed conduit text (Font: `JetBrains Mono`, 10px, Color `#475569`)

### 4.2 Right Card: flowOne Connected (After)
- **Background:** `#FFFFFF`
- **Border:** `1.5px solid #DBEAFE` (Subtle Blue Accent Border)
- **Box Shadow:** `0 4px 16px rgba(5, 40, 242, 0.06)`
- **Border Radius:** `12px`
- **Padding:** `18px 20px`
- **Top Badge:**
  - Icon: `✦` (Blue `#0528F2`)
  - Label: `FLOWONE CONNECTED` (Font: `Lorin`, 11px, Weight `800`, Color `#0528F2`)
  - Tool Pill: `#EFF6FF` bg, `#1E40AF` text, with sparkle icon `✦`
- **Body:**
  - Kicker: `✦ SHARED CONTEXT BENEFIT` (Font: `Lorin`, 10px, Weight `800`, Color `#0528F2`)
  - Text: Shared context benefit (Font: `Lorin`, 13px, Weight `550`, Color `#0F172A`)
- **Footer (Conduit Status):**
  - Dot: `6 × 6 px`, Blue `#0528F2` with glow `0 0 6px rgba(5, 40, 242, 0.6)`
  - Label: `ACTIVE CONDUIT:` (Font: `JetBrains Mono`, 10px, Weight `800`, Color `#0528F2`)
  - Value: Active conduit text (Font: `JetBrains Mono`, 10px, Weight `700`, Color `#0F172A`)

---

## 5. TABLET & MOBILE RESPONSIVE ARCHITECTURE

Section 04 is engineered with a dedicated **three-tier responsive strategy** ensuring flawless display and ergonomics across Desktop, Tablet, and Mobile screens:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ DESKTOP (> 1024px)                                                               │
│ [Vertical Left Spine Navigation (6 depts)]  │  [Right Content + 2-Column Cards]  │
└──────────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────────┐
│ TABLET (769px – 1024px)                                                          │
│ - Landscape (901px–1024px): Compact 210px vertical sidebar + fluid right canvas  │
│ - Portrait (769px–900px): Top HUD Stepper + Horizontal Touch Rail / Stacked Cards│
└──────────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────────┐
│ MOBILE (≤ 768px)                                                                 │
│ [Top Stepper HUD: Dept 01 of 06 · SALES & COMMERCIAL | ‹ ›]                      │
│ [Horizontal Touch-Snap Carousel Track: calc(100vw - 32px) max 440px wide slides] │
│ [Cards Stacked 1-Column: Fragmented Reality (Top) ➔ flowOne Connected (Bottom)]  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.1 Tablet View Specification (769px – 1024px)

Tablets (iPad Mini, iPad 10th Gen, iPad Air, iPad Pro, Android tablets) have ample screen width but require touch-first ergonomics:

1. **Landscape Tablet Mode (901px – 1024px)**:
   - **Outer Frame:** Margin reduced to `16px`, container padding set to `24px`.
   - **Sidebar Navigation:** Remains **Vertical**, but sidebar width shrinks to `minmax(200px, 0.28fr)`.
   - **Tab Button Height & Padding:** Increased to `8px 14px` for comfortable finger tapping (`min-height: 44px`).
   - **Dual Comparison Cards:** Remain **2 columns** side-by-side (`grid-template-columns: 1fr 1fr`, gap `16px`).
   - **Typography Scaling:** Headline adjusts smoothly to `clamp(1.5rem, 2.8vw, 2.2rem)`.

2. **Portrait Tablet Mode (769px – 900px)**:
   - **Layout Transition:** The 2-column sidebar layout switches to a single vertical flex column to prevent cramped cards.
   - **Tab Navigation Options in Elementor:**
     - **Option A (Native Elementor Tabs):** Tabs wrapper switches to **Horizontal** (`flex-direction: row`, `overflow-x: auto`), running as a touch-scrollable top bar across the frame with active indicator on `border-bottom`.
     - **Option B (React Parity Carousel):** Displays the **Option C HUD Stepper Bar** at the top with Prev/Next buttons, sliding through each department cleanly.
   - **Comparison Cards:** Stack into a single vertical column (`width: 100%`, gap `12px`) or use a responsive auto-fit grid (`minmax(300px, 1fr)`).
   - **Card Max Width:** Capped at `540px` centered, ensuring cards don't become excessively wide and hard to read.

---

### 5.2 Mobile View Specification (≤ 768px)

On mobile phones (iPhone, Samsung Galaxy, Pixel), the vertical tabs completely transform into **Pattern 1: Living Transaction Option C Touch-Snap Carousel + HUD Stepper**:

```
[Mobile Header: Dept 01 of 06 · SALES & COMMERCIAL | ‹ ›]
┌────────────────────────────────────────────────────────┐
│ [SALES]   [OPERATIONS]   [FINANCE]   [GST]   [BANKING] │ ← Horizontal Scroll Rail
│ ═══════ (Active Bottom Blue Line)                      │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ ACTIVE DEPARTMENT CONTENT CARD (Max width: 440px)      │
│ - Category kicker · Reference ID · Metric              │
│ - Department Headline (Bebas Neue, 1.25rem)            │
│ - Editorial Lead Paragraph (Lorin, 0.85rem)            │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ✕ FRAGMENTED REALITY (Top Card)                    │ │
│ │ - Incompatible Tool Pill                           │ │
│ │ - ⚠️ Departmental Blind Spot Text                  │ │
│ │ - Severed Link Conduit Status                      │ │
│ └────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ✦ FLOWONE CONNECTED (Bottom Card)                  │ │
│ │ - flowOne Connected Tool Pill                      │ │
│ │ - ✦ Shared Context Benefit Text                    │ │
│ │ - Active Conduit Status (Blue Dot + Text)          │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ [Micro Telemetry Bar: Single Source of Truth / <14ms]  │
└────────────────────────────────────────────────────────┘
```

#### Detailed Mobile Rules:
1. **Top Stepper HUD Capsule**:
   - Background: Pure White (`#FFFFFF`), border `1px solid #E2E8F0`, rounded pill (`border-radius: 9999px`).
   - Left side: Pulsating blue live beacon dot (`6px × 6px`) + live counter: `Dept 01 of 06 · SALES & COMMERCIAL`.
   - Right side: Accessible circle chevron buttons (`28px × 28px`, `border: 1px solid #E2E8F0`) for instant one-tap prev/next department navigation.
2. **Horizontal Tabs / Touch Rail**:
   - Elementor Tabs wrapper orientation: `Horizontal`.
   - `overflow-x: auto`, `white-space: nowrap`, `-webkit-overflow-scrolling: touch`, `scrollbar-width: none`.
   - Indicator line switches from left border to **bottom border**: `border-bottom: 2.5px solid #0528F2`.
   - Tap padding: `10px 16px` for touch targets meeting WCAG 44×44px standards.
3. **Card Stacking & Dimensions**:
   - Comparison grid switches from 2 columns to **1 column** (`flex-direction: column`).
   - Card width: `calc(100vw - 32px)` with `max-width: 440px`.
   - `Fragmented Reality` sits on top; `flowOne Connected` sits directly below.
4. **Zero Viewport Overflow**:
   - All horizontal overflow is contained inside the swipe track (`margin: 0 -0.5rem`, `padding: 0 0.5rem`).
   - The main HTML/body viewport experiences zero horizontal scroll wiggle.
5. **Thumb-Friendly Ergonomics**:
   - Users can swipe left/right with their thumb, tap the top tabs directly, or tap the prev/next chevrons in the HUD.

---

## 6. READY-TO-USE ELEMENTOR SITE SETTINGS CUSTOM CSS

To ensure 100% visual fidelity with the React prototype across Desktop, Tablet, and Mobile, copy this scoped CSS into **Elementor > Site Settings > Custom CSS** on `sandbox.flowone.in`:

```css
/* ==========================================================================
   flowOne Section 04: The Connected Reality (Elementor Pro Scoped Styles)
   Includes Full Desktop, Tablet (769px-1024px), and Mobile (<= 768px) Rules
   ========================================================================== */

/* Outer frame elevation & border */
.connected-tabs-frame {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03), 0 12px 28px -6px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

/* Sidebar continuous vertical guideline spine (Desktop > 1024px) */
.connected-tabs-sidebar .elementor-tabs-wrapper {
  position: relative;
  border-left: 1.5px solid #E2E8F0 !important;
  padding-left: 0 !important;
  margin-left: 4px;
}

/* Sidebar flat tab button */
.connected-tabs-sidebar .elementor-tab-title {
  background: transparent !important;
  border: none !important;
  border-left: 2.5px solid transparent !important;
  margin-left: -1.5px !important;
  padding: 8px 12px 8px 18px !important;
  font-family: var(--font-family-body, "Lorin", sans-serif) !important;
  font-size: 13px !important;
  font-weight: 550 !important;
  letter-spacing: 0.04em !important;
  color: #64748B !important;
  text-transform: uppercase !important;
  min-height: 44px;
  display: flex !important;
  align-items: center !important;
  transition: color 0.16s ease, border-color 0.16s ease !important;
}

.connected-tabs-sidebar .elementor-tab-title:hover {
  color: #0F172A !important;
}

/* Active tab crisp blue line */
.connected-tabs-sidebar .elementor-tab-title.elementor-active {
  color: #0528F2 !important;
  font-weight: 750 !important;
  border-left-color: #0528F2 !important;
  background: transparent !important;
}

/* JetBrains Mono utility for metadata & conduits */
.connected-content-kicker,
.connected-card-footer {
  font-family: var(--font-family-mono, "JetBrains Mono", monospace) !important;
}

/* ==========================================================================
   TABLET RESPONSIVE RULES (769px to 1024px)
   ========================================================================== */
@media (min-width: 769px) and (max-width: 1024px) {
  .connected-tabs-frame {
    border-radius: 14px;
  }
  
  /* Compact sidebar width */
  .connected-tabs-sidebar {
    width: 220px !important;
    min-width: 220px !important;
  }

  .connected-tabs-sidebar .elementor-tab-title {
    font-size: 12px !important;
    padding: 8px 10px 8px 14px !important;
  }

  /* Comparison cards grid on tablet */
  .connected-comparison-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 12px !important;
  }

  .connected-reality-card {
    padding: 14px 16px !important;
  }
}

/* ==========================================================================
   MOBILE RESPONSIVE RULES (<= 768px)
   Horizontal touch rail + vertically stacked cards
   ========================================================================== */
@media (max-width: 768px) {
  .connected-tabs-frame {
    border-radius: 12px;
  }

  /* Switch tabs wrapper to horizontal touch-scroll rail */
  .connected-tabs-sidebar .elementor-tabs-wrapper {
    display: flex !important;
    flex-direction: row !important;
    overflow-x: auto !important;
    border-left: none !important;
    border-bottom: 1.5px solid #E2E8F0 !important;
    padding-bottom: 0 !important;
    margin-left: 0 !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .connected-tabs-sidebar .elementor-tabs-wrapper::-webkit-scrollbar {
    display: none;
  }

  /* Flat tab items in horizontal rail */
  .connected-tabs-sidebar .elementor-tab-title {
    border-left: none !important;
    border-bottom: 2.5px solid transparent !important;
    margin-left: 0 !important;
    margin-bottom: -1.5px !important;
    white-space: nowrap !important;
    padding: 10px 16px !important;
    font-size: 12px !important;
  }

  /* Active indicator on bottom border */
  .connected-tabs-sidebar .elementor-tab-title.elementor-active {
    border-bottom-color: #0528F2 !important;
    border-left-color: transparent !important;
  }

  /* Stack comparison cards vertically */
  .connected-comparison-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
  }

  .connected-reality-card {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 14px 14px !important;
  }

  .connected-content-head h3 {
    font-size: 22px !important;
    line-height: 1.15 !important;
  }

  .connected-content-head p {
    font-size: 13px !important;
    line-height: 1.5 !important;
  }
}
```

---

## 7. QA ACCEPTANCE CHECKLIST

Before handing off the page to stakeholders on `sandbox.flowone.in`, verify every item:

- [ ] The Elementor Pro **Tabs** (`nested-tabs`) widget is used with vertical orientation on desktop.
- [ ] All 6 exact department titles match the specification.
- [ ] The left sidebar tabs are transparent with no boxed pill fills.
- [ ] The continuous left guideline spine (`#E2E8F0`) is visible, with the active tab having the `2.5px solid #0528F2` blue indicator.
- [ ] The right content pane renders the kicker, headline, editorial lead, and dual comparison cards.
- [ ] The kicker line and conduit footers render in **JetBrains Mono**.
- [ ] Headlines render in **Bebas Neue**, while descriptions render in **Lorin**.
- [ ] Left card displays the Fragmented Blind Spot with light rose tint.
- [ ] Right card displays the flowOne Connected Shared Context with crisp blue border.
- [ ] Mobile view (`≤ 768px`) switches smoothly to a horizontal touch-snap scroll rail with active bottom blue border.
- [ ] No layout shifts, no horizontal viewport overflow, and zero custom HTML embed widgets.

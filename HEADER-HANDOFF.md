# flowOne Site Header — Builder-Grade Elementor Pro Native Handoff Specification

> **Target Platform:** WordPress with Elementor Pro (Theme Builder Header) + ElementsKit / Premium Addons  
> **Source Repository:** `flowOne-NewDesign` (`src/components/navigation-system.tsx`, `navigation-system.css`, `flowone.tsx`, `flowone.css`, `index.css`)  
> **Audience:** Claude AI MCP Agent & Human WordPress Developers  
> **Strict Builder Directive:** **NO CUSTOM HTML WIDGETS.** Every single element, trigger, menu panel, category column, link item, badge, telemetry metric, avatar, button, and mobile drawer component must be constructed using **native Elementor Containers and Native Widgets** (or ElementsKit / Premium Addons native widgets). Every text string, icon, link, color, and spacing value must be directly editable in the Elementor visual sidebar.

---

## EXECUTIVE BUILD SUMMARY FOR AI MCP & BUILDERS

| Requirement | Implementation Architecture |
| :--- | :--- |
| **Header Type** | Elementor Pro Theme Builder Template (`Header`), Condition: `Entire Site` |
| **Layout Model** | Elementor Flexbox Containers (Nested Elements enabled) |
| **Sticky Behavior** | Elementor Pro Motion Effects → `Sticky: Top`, `Effects Offset: 48px`, `Stay in Column: No` |
| **Desktop Navigation** | Elementor Pro **Menu Widget with Nested Mega Menus** OR **ElementsKit Mega Menu** (native visual container canvas per dropdown) |
| **Mega Menu Panels** | 100% Native Containers (2 or 3 Category Columns + 1 Interactive HUD Telemetry Card Aside) |
| **Telemetric HUD Asides**| Built with native Containers, Headings, 3-Col Metric Grids, Chip Tags, and Icon Box Action Links |
| **Founder's Diary Pill** | Native Flexbox Container (Pill border `#05C7F2`, bg `#FFFFFF`) + Overlapping Image Avatars + Heading + Arrow Icon |
| **CTA Button** | Native Elementor `Button` Widget (Gradient fill `#0528F2` → `#05C7F2`, Dynamic Tag link to `Popup - Book a Demo`) |
| **Mobile Drawer** | Native ElementsKit Mobile Nav Menu OR Elementor Pro Off-Canvas / Popup Drawer with native Accordion |
| **Custom HTML Widgets** | **STRICTLY 0 (ZERO).** None permitted. |

---

# PART A — CONTENT & ARCHITECTURAL BLUEPRINT

## 1. FILE MAP & ASSET REFERENCES

### 1.1 Source Files Audited
- `src/components/navigation-system.tsx` — Desktop 3-column control surface, 5-panel mega menu schemas, hover-intent timers, HUD telemetry aside cards, Founder's Diary pill, and mobile slide-out drawer.
- `src/components/navigation-system.css` — Scrolled compression styles (76px → 68px), mega menu grid templates, glassmorphism filters (`backdrop-filter: blur(28px)`), indicator line transitions, `.fd-pill` wiggle keyframes, and mobile drawer transitions.
- `src/components/flowone.tsx` & `flowone.css` — Button primitives (`.fo-button-primary`), Icon primitives (`arrow`, `close`, `chevron`, `shield`, `sparkle`, `zap`).
- `src/index.css` & `flowOne_Color_Design_System.md` — Brand design tokens (`#0528F2`, `#049DD9`, `#05C7F2`, `#0D0D0D`, `#FFFFFF`, `#E6EAF0`, `#6B7280`).
- `public/assets/` — `flowone-logo.svg`, `founder-woman.jpg`, `founder-man.jpg`.

### 1.2 Asset Package Inventory
All required graphics and photography are stored in `public/assets/` and must be uploaded directly to the WordPress Media Library:

| Asset Name | Media Library Role | Original File Path | Format & Dimensions |
| :--- | :--- | :--- | :--- |
| **flowOne Primary Logo** | Desktop & Mobile Site Logo | `public/assets/flowone-logo.svg` | Vector SVG (`148 × 42` viewBox) |
| **Founder 1 Avatar (Woman)** | Founder's Diary Pill Left Avatar | `public/assets/founder-woman.jpg` | High-res JPG (Display: `22 × 22 px`, Circle) |
| **Founder 2 Avatar (Man)** | Founder's Diary Pill Right Avatar | `public/assets/founder-man.jpg` | High-res JPG (Display: `22 × 22 px`, Circle) |
| **Right Arrow Icon** | Button & Link Indicator | Upload SVG / Elementor Library | SVG (`16 × 16 px`) |
| **Dismiss Cross Icon** | Mobile Drawer & Popup Close | Upload SVG / Elementor Library | SVG (`20 × 20 px`) |
| **Chevron Down Icon** | Desktop Nav Trigger & Accordion | Upload SVG / Elementor Library | SVG (`14 × 14 px`) |

---

## 2. NAVIGATION TREE & MEGA MENU CONTENT SPECIFICATION

The header controls 5 top-level destinations. Every single destination expands into a full-width mega menu panel containing multi-column category workflows and a dedicated **HUD Telemetry Aside Card**.

```text
[Header Shell: Sticky 76px Desktop / 68px Mobile]
├── [Brand Logo] -> Anchor to #home-hero
├── [Primary Navigation Menu]
│   ├── Item 1: Solutions   (Opens Mega Menu 1: 5 Category Groups + Solutions Suite HUD Card)
│   ├── Item 2: Platform    (Opens Mega Menu 2: 4 Category Groups + Unified Event Fabric HUD Card)
│   ├── Item 3: AI          (Opens Mega Menu 3: 3 Category Groups + Autonomous Engine HUD Card)
│   ├── Item 4: Built for   (Opens Mega Menu 4: 2 Category Groups + Perspective Runtime HUD Card)
│   └── Item 5: Resources   (Opens Mega Menu 5: 4 Category Groups + Practitioner Library HUD Card)
└── [Actions Cluster]
    ├── Founder's Diary Pill  (Pill button + 2 Avatars -> /founders-diary/)
    └── Book a Demo Button    (Primary gradient CTA -> Opens Elementor Pro Popup)
```

---

### 2.1 Complete Content Matrix by Mega Menu Panel

#### PANEL 1: SOLUTIONS (`#capabilities`)
- **Layout Architecture:** 3-Column Category Grid (Left) + 340px HUD Telemetry Aside Card (Right).
- **Group 1 (Col 1 Top): REVENUE & RECEIVABLES**
  - Group Eyebrow: `REVENUE & RECEIVABLES`
  - Group Header: `Get Paid Faster`
  - **Item 1 (Primary):** Title: `Customer-to-Cash` | Description: `"Connect every step from order to available cash."` | Badge: `PRIMARY` | Target: `#capabilities`
  - Item 2: `Accounts Receivable` | Target: `#capabilities`
  - Item 3: `Credit & Risk` | Target: `#capabilities`
  - Item 4: `Collections & Payments` | Target: `#capabilities`
- **Group 2 (Col 2 Top): SPEND & PROCUREMENT**
  - Group Eyebrow: `SPEND & PROCUREMENT`
  - Group Header: `Control Procurement`
  - **Item 1 (Primary):** Title: `Procure-to-Pay` | Description: `"Control spend from request through settlement."` | Badge: `PRIMARY` | Target: `#capabilities`
  - Item 2: `Purchase Orders` | Target: `#capabilities`
  - Item 3: `Accounts Payable` | Target: `#capabilities`
  - Item 4: `Vendor Management` | Target: `#capabilities`
- **Group 3 (Col 3 Top): INVENTORY & WAREHOUSE**
  - Group Eyebrow: `INVENTORY & WAREHOUSE`
  - Group Header: `Run Inventory Better`
  - **Item 1 (Primary):** Title: `Inventory Intelligence` | Description: `"Real-time stock velocity & warehouse allocation."` | Badge: `PRIMARY` | Target: `#capabilities`
  - Item 2: `Warehouse Management` | Target: `#capabilities`
  - Item 3: `Stock & Replenishment` | Target: `#capabilities`
  - Item 4: `Order Management` | Target: `#capabilities`
- **Group 4 (Col 1 Bottom): CASH & BANKING**
  - Group Eyebrow: `CASH & BANKING`
  - Group Header: `Control Cash & Banking`
  - **Item 1 (Primary):** Title: `Cash & Banking` | Description: `"Automated multi-bank reconciliation & cash visibility."` | Badge: `PRIMARY` | Target: `#capabilities`
  - Item 2: `Bank Reconciliation` | Target: `#capabilities`
  - Item 3: `Cash Flow Forecasting` | Target: `#capabilities`
  - Item 4: `Financial Visibility` | Target: `#capabilities`
- **Group 5 (Col 2 Bottom): STATUTORY COMPLIANCE**
  - Group Eyebrow: `STATUTORY COMPLIANCE`
  - Group Header: `Stay Compliant`
  - **Item 1 (Primary):** Title: `GST Hub` | Description: `"Automated e-invoicing, IRN signing & return filing."` | Badge: `PRIMARY` | Target: `#capabilities`
  - Item 2: `E-Invoicing` | Target: `#capabilities`
  - Item 3: `E-Way Bills` | Target: `#capabilities`
  - Item 4: `GST Reconciliation` | Target: `#capabilities`
- **HUD Telemetry Aside Card (Right Column):**
  - Top Label: `SOLUTIONS SUITE`
  - Top Badge: `EXECUTIVE SYNOPSIS` (with pulsing cyan beacon)
  - Object Kicker: `OPERATIONAL DOMAIN OVERVIEW`
  - Hero Value: `The 5-Pillar Connected Suite`
  - Description: `"Unifies the entire operational and financial lifecycle of enterprise business—connecting customer sales orders, spend governance, multi-warehouse inventory, bank liquidity, and direct statutory GST compliance into one continuous transaction flow."`
  - 3-Column Metrics:
    - Col 1: Label: `LIFECYCLE` | Value: `Order to Cash`
    - Col 2: Label: `INTEGRATION` | Value: `Zero-Bridge Sync`
    - Col 3: Label: `COMPLIANCE` | Value: `Native GST & IRN`
  - Interactive Chips: `Order-to-Cash` • `Procure-to-Pay` • `Warehouse Allocation` • `Multi-Bank Recon` • `Statutory E-Way`
  - Action Link: `Explore All Solutions →` | Target: `#capabilities`

---

#### PANEL 2: PLATFORM (`#connection`)
- **Layout Architecture:** 2-Column Category Grid (Left) + 340px HUD Telemetry Aside Card (Right).
- **Group 1: CORE ARCHITECTURE**
  - Group Eyebrow: `CORE ARCHITECTURE`
  - Group Header: `Platform Architecture`
  - **Item 1 (Primary):** Title: `Platform Overview` | Description: `"One connected operating system for business."` | Badge: `PRIMARY` | Target: `#connection`
  - Items 2–4: `Finance Operations` • `Business Operations` • `Workflow Automation`
- **Group 2: TRANSACTION PIPELINES**
  - Group Eyebrow: `TRANSACTION PIPELINES`
  - Group Header: `Business Flows`
  - **Item 1 (Primary):** Title: `Customer → Cash` | Description: `"End-to-end deterministic transaction journey."` | Badge: `PRIMARY` | Target: `#connection`
  - Items 2–4: `Procure → Pay` • `Inventory → Cash` • `Record → Report`
- **Group 3: CAPABILITIES & RUNTIME**
  - Group Eyebrow: `CAPABILITIES & RUNTIME`
  - Group Header: `Platform Capabilities`
  - **Item 1 (Primary):** Title: `Document Intelligence` | Description: `"AI-powered transaction data extraction."` | Badge: `PRIMARY` | Target: `#connection`
  - Items 2–4: `Approvals & Workflows` • `Integrations` • `Reporting & Analytics`
- **Group 4: SECURITY & SOVEREIGN TRUST**
  - Group Eyebrow: `SECURITY & SOVEREIGN TRUST`
  - Group Header: `Security & Trust`
  - **Item 1 (Primary):** Title: `Security` | Description: `"Institutional data residency & governance."` | Badge: `PRIMARY` | Target: `#trust`
  - Items 2–3: `Compliance` • `Data & Privacy`
- **HUD Telemetry Aside Card (Right Column):**
  - Top Label: `PLATFORM FOUNDATION` | Top Badge: `SYSTEM ARCHITECTURE`
  - Object Kicker: `CORE OPERATING ENGINE` | Hero Value: `The Unified Event Fabric`
  - Description: `"The foundational technology behind flowOne. Replaces disconnected ERP modules and spreadsheet workarounds with an append-only transaction bus, deterministic double-entry posting, and native integrations with 48+ Indian banks and GSTN gateways."`
  - 3-Column Metrics:
    - Col 1: Label: `LEDGER MODEL` | Value: `Append-Only`
    - Col 2: Label: `POSTING` | Value: `Deterministic`
    - Col 3: Label: `GATEWAYS` | Value: `48+ Banks & GSTN`
  - Interactive Chips: `Event Stream` • `Continuous Audit Trail` • `Statutory Rails` • `REST & Webhooks` • `Maker-Checker`
  - Action Link: `Explore Platform Architecture →` | Target: `#connection`

---

#### PANEL 3: AI (`#ai-inside-flow`)
- **Layout Architecture:** 3-Column Category Grid (Left) + 340px HUD Telemetry Aside Card (Right) — Styled with Cyan & Magenta Accents.
- **Group 1: TRANSACTION INTELLIGENCE**
  - Group Eyebrow: `TRANSACTION INTELLIGENCE`
  - Group Header: `AI Inside The Flow`
  - **Item 1 (Primary):** Title: `AI Business Agent` | Description: `"Contextual intelligence that understands and acts."` | Badge: `PRIMARY` | Target: `#ai-inside-flow`
  - Items 2–5: `Document Intelligence` • `AI Invoice Processing` • `AI Bank Reconciliation` • `Cash Flow Forecasting`
- **Group 2: CONVERSATIONAL CHANNELS**
  - Group Eyebrow: `CONVERSATIONAL CHANNELS`
  - Group Header: `Channel Intelligence`
  - **Item 1 (Primary):** Title: `WhatsApp Intelligence` | Description: `"Conversational collections, payment links & live status over WhatsApp."` | Badge: `PRIMARY` | Target: `#ai-inside-flow`
  - Item 2: `Email Intelligence` | Description: `"Automated inbox parsing & invoice attachment extraction."`
  - Items 3–5: `Collections Intelligence` • `Credit Risk Intelligence` • `Anomaly Detection`
- **Group 3: POLICY AUTOMATION**
  - Group Eyebrow: `POLICY AUTOMATION`
  - Group Header: `Autonomous Workflows`
  - **Item 1 (Primary):** Title: `Smart Approvals` | Description: `"Policy-driven automated clearances."` | Badge: `PRIMARY` | Target: `#ai-inside-flow`
  - Items 2–4: `Automated Actions` • `Exception Management` • `Policy Clearance Matrix`
- **HUD Telemetry Aside Card (Right Column — AI Accent):**
  - Top Label: `AUTONOMOUS ENGINE` | Top Badge: `CAPABILITY OVERVIEW`
  - Object Kicker: `AI INSIDE THE FLOW` | Hero Value: `Context-Aware Decision Runtime`
  - Description: `"Artificial intelligence engineered directly into transaction state transitions—extracting unstructured documents, communicating over WhatsApp and email, predicting settlement timelines, and preparing bank matches under strict policy-governed human oversight."`
  - 3-Column Metrics:
    - Col 1: Label: `EXECUTION` | Value: `Embedded in Flow`
    - Col 2: Label: `CHANNELS` | Value: `WhatsApp & Email`
    - Col 3: Label: `GOVERNANCE` | Value: `Human-in-the-Loop`
  - Interactive Chips: `Document OCR` • `WhatsApp Comms` • `Email Ingestion` • `Auto Bank Recon` • `Policy Clearance`
  - Action Link: `Explore flowOne AI System →` | Target: `#ai-inside-flow`

---

#### PANEL 4: BUILT FOR (`#roles`)
- **Layout Architecture:** 2-Column Category Grid (Left) + 340px HUD Telemetry Aside Card (Right).
- **Group 1: BY ROLE & FUNCTION (6 Items)**
  - Group Eyebrow: `BY ROLE & FUNCTION`
  - Group Header: `Role-Based Operating Surfaces`
  - Item 1: `CFOs & Finance Leaders` | Description: `"Executive visibility, working capital velocity & instant close."` | Target: `#roles`
  - Item 2: `Finance & Accounting` | Description: `"Deterministic ledgers, automated reconciliation & GST returns."` | Target: `#roles`
  - Item 3: `AR & Collections` | Description: `"Payment links, conversational follow-ups & auto-matching."` | Target: `#roles`
  - Item 4: `AP & Procurement` | Description: `"3-way matching, PO controls & MSME 45-day tracking."` | Target: `#roles`
  - Item 5: `Treasury & Banking` | Description: `"Multi-bank cash visibility & real-time liquidity."` | Target: `#roles`
  - Item 6: `Operations & Warehouse` | Description: `"Stock allocation, multi-facility movement & fulfillment."` | Target: `#roles`
- **Group 2: BY BUSINESS SCALE (4 Items)**
  - Group Eyebrow: `BY BUSINESS SCALE`
  - Group Header: `Tailored to Scale & Operations`
  - Item 1: `Growing Businesses` | Description: `"Start lean with a connected core and scale without ERP bloat."` | Target: `#roles`
  - Item 2: `Multi-Location Businesses` | Description: `"Unify branches, warehouses & GSTINs on one single ledger."` | Target: `#roles`
  - Item 3: `Complex Operations` | Description: `"Compose around existing systems with zero rip-and-replace."` | Target: `#roles`
  - Item 4: `Distributors & Manufacturers` | Description: `"Supply chain velocity, batch tracking & working capital limits."` | Target: `#roles`
- **HUD Telemetry Aside Card (Right Column):**
  - Top Label: `CONNECTED PERSPECTIVES` | Top Badge: `SHARED REALITY`
  - Object Kicker: `PERSPECTIVE RUNTIME` | Hero Value: `One Connected Flow.`
  - Description: `"Every team sees what matters. The order is the dispatch, is the invoice, is the bank entry. Every role operates in their own optimized view without data duplication."`
  - 3-Column Metrics:
    - Col 1: Label: `ROLES` | Value: `Executive to Ops`
    - Col 2: Label: `VISIBILITY` | Value: `Role-Governed`
    - Col 3: Label: `DATA DRIFT` | Value: `Zero Variance`
  - Interactive Chips: `CFO Cockpit` • `Shared Context` • `Multi-Location` • `Zero Silos` • `Role-Based Access`
  - Action Link: `Explore Role Perspectives →` | Target: `#roles`

---

#### PANEL 5: RESOURCES (`#proof`)
- **Layout Architecture:** 2-Column Category Grid (Left) + 340px HUD Telemetry Aside Card (Right).
- **Group 1: GUIDES & PLAYBOOKS**
  - Group Eyebrow: `GUIDES & PLAYBOOKS` | Group Header: `Guides & Playbooks`
  - Item 1: `Blog` | Description: `"Finance, GST, AI and product education."` | Target: `#proof`
  - Items 2–4: `Finance Guides` • `GST Guides` • `Cash Flow Guides`
- **Group 2: PROOF & CASE STUDIES**
  - Group Eyebrow: `PROOF & CASE STUDIES` | Group Header: `Proof & Case Studies`
  - Item 1: `Case Studies` | Description: `"Verified operational outcomes."` | Target: `#proof`
  - Items 2–4: `Customer Stories` • `ROI Calculator` • `Success Stories`
- **Group 3: DEMOS & WEBINARS**
  - Group Eyebrow: `DEMOS & WEBINARS` | Group Header: `Videos & Walkthroughs`
  - Item 1: `Webinars` | Description: `"Deep-dive operational walkthroughs."` | Target: `#proof`
  - Items 2–4: `Product Videos` • `5-Minute Videos` • `Demo Videos`
- **Group 4: CFO PERSPECTIVES**
  - Group Eyebrow: `CFO PERSPECTIVES` | Group Header: `CFO Perspectives`
  - Item 1: `CFO Insights` | Description: `"Strategic treasury & risk perspectives."` | Target: `#proof`
  - Items 2–4: `Finance Trends` • `AI in Finance` • `Business Operations`
- **HUD Telemetry Aside Card (Right Column):**
  - Top Label: `KNOWLEDGE REPOSITORY` | Top Badge: `PRACTITIONER LIBRARY`
  - Object Kicker: `RESEARCH & FRAMEWORKS` | Hero Value: `Finance & Operations Playbooks`
  - Description: `"A curated practitioner library for controllers, CFOs, and operational leaders—featuring statutory compliance handbooks (GST/E-Way/MSME 45-day rules), working capital optimization frameworks, and technical architecture specs."`
  - 3-Column Metrics:
    - Col 1: Label: `FOCUS` | Value: `Regulatory & Ops`
    - Col 2: Label: `AUDIENCE` | Value: `CFOs & Controllers`
    - Col 3: Label: `FORMATS` | Value: `Guides & Specs`
  - Interactive Chips: `GST Compliance Guides` • `DSO Reduction Models` • `MSME Rule Tracking` • `Architecture Specs` • `Video Walkthroughs`
  - Action Link: `Browse Resource Library →` | Target: `#proof`

---

## 3. GLOBAL DESIGN TOKENS & TYPOGRAPHY PRESETS

### 3.1 Color System
| Site Token | Hex Code | Role in Header |
| :--- | :--- | :--- |
| `--color-white` | `#FFFFFF` | Header background (`98%` opacity), button text, card backgrounds |
| `--color-brand-ink` | `#0D0D0D` | Primary navigation item text, headings, hamburger bars |
| `--flow-primary` | `#0528F2` | "Book a Demo" primary gradient stop, active indicators, focus rings |
| `--flow-primary-deep`| `#0540F2` | Hover active state for buttons and borders |
| `--flow-cyan` | `#049DD9` | Mid-gradient stop, subtle borders |
| `--flow-cyan-bright` | `#05C7F2` | Founder's Diary border, HUD beacon dot, eyebrow text |
| `--color-border-default`| `#E6EAF0` | Header bottom border hairline, aside divider lines |
| `--color-text-secondary`| `#374151` | Sub-item links, category headers |
| `--color-text-tertiary` | `#6B7280` | Sub-item descriptions, metric labels, statutory footnotes |

### 3.2 Typography Tokens (Manrope)
| Level | Font Family | Size (px / rem) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Top Nav Item** | Manrope | `14px` (`0.875rem`) | 600 | 1.0 | `-0.01em` |
| **Mega Category Title** | Manrope | `15px` (`0.9375rem`) | 650 | 1.2 | `-0.01em` |
| **Mega Eyebrow** | Manrope | `10px` (`0.625rem`) | 700 | 1.0 | `0.08em` (Uppercase) |
| **Sub-Item Title** | Manrope | `13.5px` (`0.84rem`)| 600 | 1.3 | `-0.005em` |
| **Sub-Item Description**| Manrope | `12px` (`0.75rem`) | 400 | 1.4 | `0em` |
| **Badge Label** | Manrope | `9.5px` (`0.59rem`) | 700 | 1.0 | `0.06em` (Uppercase) |
| **Aside Hero Title** | Manrope | `18px` (`1.125rem`) | 650 | 1.25 | `-0.02em` |
| **Metric Label** | Manrope | `10px` (`0.625rem`) | 700 | 1.0 | `0.06em` (Uppercase) |
| **Metric Value** | Manrope | `13px` (`0.8125rem`) | 600 | 1.2 | `-0.01em` |
| **CTA Button** | Manrope | `13.5px` (`0.84rem`)| 600 | 1.0 | `0em` |

---

# PART B — NATIVE ELEMENTOR BUILDER IMPLEMENTATION SPECIFICATION

> [!IMPORTANT]
> **NO CUSTOM HTML WIDGETS.** The following specification details every container, widget, and control tab setting required to construct the complete header natively inside Elementor Pro.

---

## 1. TEMPLATE CREATION & THEME BUILDER SETUP

1. Navigate to **WordPress Admin > Templates > Theme Builder > Header > Add New**.
2. Name the template: `flowOne Site Header`.
3. Set **Display Conditions**: `Entire Site` (Include: Entire Site).
4. In Elementor Page Settings (Gear icon bottom left):
   - **Page Layout**: `Default`.
   - **Page Style > Background**: Transparent (the root container controls background).

---

## 2. DESKTOP ROOT CONTAINER HIERARCHY

```text
[Container: Header Root] (.fo-header-root) [Full Width, Sticky Top, Z-Index 500]
└── [Container: Content Wrapper] (.fo-header-bar) [Boxed 1280px, Horizontal Row, Justify Space-Between]
    ├── [Container: Brand Column] (Left)
    │   └── [Widget: Site Logo / Image] (.fo-logo-img) -> Link: #home-hero
    │
    ├── [Container: Nav Column] (Center) [Desktop Only]
    │   └── [Widget: Elementor Pro Menu / ElementsKit Mega Menu]
    │       ├── Panel 1: Solutions Container (3-Col Grid + 1 HUD Aside Container)
    │       ├── Panel 2: Platform Container (2-Col Grid + 1 HUD Aside Container)
    │       ├── Panel 3: AI Container (3-Col Grid + 1 HUD Aside Container)
    │       ├── Panel 4: Built for Container (2-Col Grid + 1 HUD Aside Container)
    │       └── Panel 5: Resources Container (2-Col Grid + 1 HUD Aside Container)
    │
    └── [Container: Actions Column] (Right)
        ├── [Container: Founder's Diary Pill] (.fd-pill-native) [Hidden <= 1024px]
        │   ├── [Container: Avatar Pair] (Negative margin overlap)
        │   │   ├── [Widget: Image] (founder-woman.jpg, 22x22px circle)
        │   │   └── [Widget: Image] (founder-man.jpg, 22x22px circle)
        │   ├── [Widget: Heading] ("Founder's Diary", 13px 600, link: /founders-diary/)
        │   └── [Widget: Container / Icon] (Circle 22x22px, bg cyan, white arrow)
        │
        ├── [Widget: Button] ("Book a Demo", gradient fill, link: Dynamic Tag -> Popup)
        │
        └── [Container / Widget: Mobile Menu Trigger] (.fo-mobile-trigger) [Visible <= 1024px]
            └── Hamburger Toggle (Triggers Elementor Pro Popup / Off-Canvas Drawer)
```

---

## 3. STEP-BY-STEP CONTAINER & WIDGET CONFIGURATION

### STEP 1: ROOT STICKY HEADER CONTAINER (`.fo-header-root`)
- **Add Container (Flexbox)**:
  - **Layout Tab**:
    - Content Width: **Full Width** (`100%`)
    - Min Height: `76px` (Desktop) / `68px` (Mobile)
    - Direction: **Row**
    - Justify Content: **Center**
    - Align Items: **Center**
    - HTML Tag: `<header>`
  - **Style Tab**:
    - Background Type: **Classic** → Color: `rgba(255, 255, 255, 0.98)`
    - Border Type: **Solid** → Width: `Bottom: 1px`, Color: `#E6EAF0`
    - Box Shadow: `0 1px 2px rgba(11, 16, 32, 0.04)`
  - **Advanced Tab**:
    - Margin: `0px`
    - Padding: `0px`
    - Z-Index: `500`
    - Motion Effects:
      - **Sticky**: `Top`
      - **Sticky On**: `Desktop, Tablet, Mobile`
      - **Effects Offset**: `48`
    - CSS Classes: `fo-header-root`

---

### STEP 2: INNER CONTENT WRAPPER CONTAINER (`.fo-header-bar`)
- **Drag Container inside Root Container**:
  - **Layout Tab**:
    - Content Width: **Boxed** → `1280px`
    - Direction: **Row (Horizontal)**
    - Justify Content: **Space Between**
    - Align Items: **Center**
    - Gap: `40px` (Desktop) / `16px` (Laptop) / `0px` (Mobile/Tablet)
  - **Advanced Tab**:
    - Padding: Desktop `[0px, 48px, 0px, 48px]` | Mobile `[0px, 20px, 0px, 20px]`
    - CSS Classes: `fo-header-bar`

---

### STEP 3: BRAND LOGO COLUMN (LEFT)
- **Drag Container (Brand Column)**:
  - Layout: Direction **Row**, Align Items **Center**, Width: `Auto`.
- **Drag Widget: Site Logo (or Image Widget)**:
  - **Content Tab**:
    - Image: Choose `flowone-logo.svg` from Media Library.
    - Image Size: `Full`.
    - Link: **Custom URL** → `#home-hero`.
  - **Style Tab**:
    - Width: Desktop `120px` (`7.5rem`) | Mobile `104px` (`6.5rem`).
    - Height: `Auto` (~34px native aspect ratio).
    - Alignment: `Left`.
  - **Advanced Tab**:
    - Margin: `0px`, Padding: `0px`.
    - Accessibility / Attributes: `aria-label|flowOne home`.

---

### STEP 4: PRIMARY DESKTOP NAVIGATION & MEGA MENUS (CENTER)
*Constructed using **Elementor Pro Menu Widget (with Nested Elements enabled)** OR **ElementsKit Mega Menu Widget**.*

- **Visibility Setting**: Advanced > Responsive → **Hide on Tablet, Hide on Mobile**.
- **Top Level Items**:
  1. `Solutions` (Dropdown Container)
  2. `Platform` (Dropdown Container)
  3. `AI` (Dropdown Container)
  4. `Built for` (Dropdown Container)
  5. `Resources` (Dropdown Container)
- **Top Item Style Settings**:
  - Typography: Manrope, `14px`, 600 weight, Letter Spacing `-0.01em`.
  - Normal Text Color: `#0D0D0D`.
  - Hover Text Color: `#0528F2`.
  - Padding: `10px 14px`.
  - Dropdown Indicator: Icon `chevron-down` (14px, muted `#6B7280`, rotates 180° on open).
  - Hover Intent: Standard Elementor Mega Menu dropdown container.

---

### STEP 5: MEGA MENU CONTAINER TEMPLATES (VISUAL BUILD)

Each mega menu panel container spans full boxed width (`1280px`), styled with:
- **Panel Container Layout**:
  - Direction: **Row** (Desktop)
  - Justify Content: **Space Between**
  - Align Items: **Stretch**
  - Gap: `44px` (`2.75rem`)
  - Padding: `28px 48px 36px 48px`
  - Background: `rgba(255, 255, 255, 0.98)`
  - Border Bottom: `1px solid rgba(11, 16, 32, 0.08)`
  - Box Shadow: `0 24px 48px -8px rgba(11, 16, 32, 0.12)`

Inside each panel, place:
1. **Left Container (Categories Grid)**: Width `calc(100% - 384px)`.
2. **Right Container (HUD Telemetry Aside Card)**: Fixed Width `340px`.

---

#### 5.1 CATEGORY GROUP ITEM BUILDER (REUSABLE NATIVE PATTERN)
Inside the Categories Grid Container, each group is built using native widgets:

```text
[Container: Category Group]
├── [Widget: Heading] (Eyebrow Badge)
│   - Content: "REVENUE & RECEIVABLES"
│   - HTML Tag: <span>
│   - Typography: Manrope, 10px, 700 weight, Uppercase, Color: #0528F2
│   - Background: rgba(5, 40, 242, 0.06), Border Radius: 4px, Padding: 2px 8px
│
├── [Widget: Heading] (Group Title)
│   - Content: "Get Paid Faster"
│   - HTML Tag: <h4>
│   - Typography: Manrope, 15px, 650 weight, Color: #0D0D0D
│   - Margin Bottom: 12px
│
└── [Container: Links List] (Direction: Column, Gap: 8px)
    ├── [Container: Primary Feature Item] (With Badge)
    │   ├── [Container: Title & Badge Row] (Flex Row, Gap: 6px, Align: Center)
    │   │   ├── [Widget: Heading / Text] -> "Customer-to-Cash" (13.5px 600 weight, Color: #0D0D0D)
    │   │   └── [Widget: Heading] -> "PRIMARY" (Badge: 9px 700 weight, bg #0528F2, text #FFFFFF, radius 3px)
    │   └── [Widget: Text Editor] -> "Connect every step from order to available cash." (12px 400, Color: #6B7280)
    │
    ├── [Widget: Icon Box / Link] -> Title: "Accounts Receivable" (13.5px 500, Link: #capabilities)
    ├── [Widget: Icon Box / Link] -> Title: "Credit & Risk" (13.5px 500, Link: #capabilities)
    └── [Widget: Icon Box / Link] -> Title: "Collections & Payments" (13.5px 500, Link: #capabilities)
```

---

#### 5.2 HUD TELEMETRY ASIDE CARD BUILDER (NATIVE WIDGET MAPPING)
Every panel includes the interactive operational HUD card on the right. **Build it 100% natively using Elementor containers and widgets**:

```text
[Container: HUD Telemetry Aside Card] (.fo-hud-card)
│   - Width: 340px
│   - Background: rgba(5, 40, 242, 0.02) (AI panel: rgba(4, 157, 217, 0.03))
│   - Border: 1px solid rgba(5, 40, 242, 0.10) (AI panel: 1px solid rgba(4, 157, 217, 0.25))
│   - Border Radius: 12px
│   - Padding: 20px
│   - Direction: Column, Gap: 12px
│
├── [Container: Header Top Row] (Flex Row, Justify Space Between, Align Center)
│   ├── [Widget: Heading] -> "SOLUTIONS SUITE" (10px 700 uppercase, Color: #0528F2)
│   └── [Container: Badge Pill] (Flex Row, Align Center, Gap: 4px, bg rgba(5, 199, 242, 0.12), radius 999px, padding 3px 8px)
│       ├── [Widget: Container / Dot] (6x6px circle, bg #05C7F2, pulse animation)
│       └── [Widget: Heading] -> "EXECUTIVE SYNOPSIS" (9.5px 700 uppercase, Color: #027491)
│
├── [Widget: Heading] -> "OPERATIONAL DOMAIN OVERVIEW" (10px 600 uppercase, Color: #6B7280)
│
├── [Widget: Heading] -> "The 5-Pillar Connected Suite" (18px 650 weight, Color: #0D0D0D, Line Height 1.25)
│
├── [Widget: Text Editor] (Description)
│   - Content: "Unifies the entire operational and financial lifecycle of enterprise business..."
│   - Typography: Manrope, 12.5px 400 weight, Line Height 1.5, Color: #4B5563
│
├── [Container: 3-Column Metrics Grid]
│   │   - Border Top: 1px solid rgba(13, 13, 13, 0.06)
│   │   - Border Bottom: 1px solid rgba(13, 13, 13, 0.06)
│   │   - Padding: 10px 0px
│   │   - Direction: Row, Justify Space Between
│   │
│   ├── [Container: Metric 1]
│   │   ├── [Widget: Heading] -> "LIFECYCLE" (9px 700 uppercase, Color: #9CA3AF)
│   │   └── [Widget: Heading] -> "Order to Cash" (12.5px 600 weight, Color: #0D0D0D)
│   │
│   ├── [Container: Metric 2]
│   │   ├── [Widget: Heading] -> "INTEGRATION" (9px 700 uppercase, Color: #9CA3AF)
│   │   └── [Widget: Heading] -> "Zero-Bridge Sync" (12.5px 600 weight, Color: #0D0D0D)
│   │
│   └── [Container: Metric 3]
│       ├── [Widget: Heading] -> "COMPLIANCE" (9px 700 uppercase, Color: #9CA3AF)
│       └── [Widget: Heading] -> "Native GST & IRN" (12.5px 600 weight, Color: #0D0D0D)
│
├── [Container: Chips Tag Row] (Flex Row, Wrap: Wrap, Gap: 6px)
│   ├── [Widget: Heading] -> "Order-to-Cash" (Pill style: bg #FFFFFF, border 1px solid #E6EAF0, radius 4px, padding 3px 6px, 10.5px 500)
│   ├── [Widget: Heading] -> "Procure-to-Pay" (Same pill style)
│   ├── [Widget: Heading] -> "Warehouse Allocation" (Same pill style)
│   ├── [Widget: Heading] -> "Multi-Bank Recon" (Same pill style)
│   └── [Widget: Heading] -> "Statutory E-Way" (Same pill style)
│
└── [Widget: Button / Link] (.fo-hud-action)
    - Content: "Explore All Solutions"
    - Link: #capabilities
    - Icon: arrow-right (Upload SVG arrow, Position: After, Spacing: 6px)
    - Style: Background Transparent, Text Color #0528F2, 13px 700 weight, Padding 6px 0px
```

---

### STEP 6: ACTIONS CLUSTER COLUMN (RIGHT)
Drag a Container into the Header Bar on the right.
- **Layout Tab**:
  - Direction: **Row**
  - Align Items: **Center**
  - Gap: `12px` (Desktop) / `8px` (Mobile)
  - Width: `Auto`

Inside this container, place:
1. **Founder's Diary Pill Container** (Desktop/Laptop only).
2. **Book a Demo Button Widget** (Desktop, Tablet, Mobile).
3. **Mobile Drawer Trigger Button** (Tablet & Mobile only).

---

#### 6.1 "FOUNDER'S DIARY" PILL BUILDER (NATIVE CONTAINER ARCHITECTURE)
*Constructed natively without custom HTML:*

```text
[Container: Founder's Diary Pill] (.fd-pill-native)
│   - Width: 180px
│   - Height: 34px
│   - Direction: Row, Align Items: Center, Justify: Space Between
│   - Background: #FFFFFF
│   - Border: 1.5px solid #05C7F2
│   - Border Radius: 9999px (Pill)
│   - Padding: 0px 6px 0px 38px (Padding-left reserves room for overlapping avatars)
│   - Box Shadow: 0 2px 8px rgba(5, 199, 242, 0.16)
│   - Link: URL -> /founders-diary/
│   - Responsive: Hide on Tablet, Hide on Mobile
│
├── [Container: Overlapping Avatars Layer] (Position: Absolute, Left: 6px, Top: 50%, Margin-Top: -11px)
│   │   - Width: 36px, Height: 22px
│   │   - Direction: Row
│   │
│   ├── [Widget: Image] (Woman Avatar)
│   │   - Image: founder-woman.jpg
│   │   - Width: 22px, Height: 22px, Border Radius: 50%
│   │   - Border: 1.5px solid #FFFFFF
│   │   - Z-Index: 2
│   │
│   └── [Widget: Image] (Man Avatar)
│       - Image: founder-man.jpg
│       - Width: 22px, Height: 22px, Border Radius: 50%
│       - Border: 1.5px solid #FFFFFF
│       - Margin-Left: -7px (Overlaps left avatar by 7px)
│       - Z-Index: 3
│
├── [Widget: Heading] (Pill Label)
│   - Content: "Founder's Diary"
│   - HTML Tag: <span>
│   - Typography: Poppins / Manrope, 13px, 600 weight, Color: #027491
│
└── [Container: Right Arrow Circle Badge]
    - Width: 22px, Height: 22px, Border Radius: 50%
    - Background: #05C7F2, Justify: Center, Align: Center
    - [Widget: Icon] -> Arrow Right (10px, Color: #FFFFFF)
```

---

#### 6.2 "BOOK A DEMO" CTA BUTTON BUILDER (NATIVE BUTTON WIDGET)
- **Drag Widget: Button**:
  - **Content Tab**:
    - Text: `Book a Demo`
    - Link: **Dynamic Tag** → Actions → **Popup** (Action: Open Popup, select template: `Popup - Book a Demo`).
    - Icon: Upload SVG `arrow.svg` (Position: **After**, Spacing: `8px`).
    - Alignment: `Center`.
  - **Style Tab**:
    - Typography: Manrope, `13.5px` (`0.84rem`), 600 weight, Line Height `1`.
    - Text Color: `#FFFFFF`.
    - Background Type: **Gradient**:
      - Color 1: `#0528F2` (Location: `0%`)
      - Color 2: `#049DD9` (Location: `50%`)
      - Color 3: `#05C7F2` (Location: `100%`)
      - Angle: `135°`
    - Border Type: `None`, Border Radius: `8px` (`0.5rem`).
    - Padding: Desktop `[9px, 16px, 9px, 16px]` | Mobile `[8px, 12px, 8px, 12px]`.
    - Box Shadow: `0 2px 8px rgba(5, 40, 242, 0.22)`.
    - **Hover State**:
      - Box Shadow: `0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35)`.
      - Hover Animation: `Grow` (or subtle transform translateY -1px).
  - **Advanced Tab**:
    - CSS Classes: `fo-header-cta-btn`.

---

#### 6.3 MOBILE MENU TRIGGER BUTTON (TABLET & MOBILE ONLY)
- **Drag Widget: Button / Icon / ElementsKit Nav Menu Toggle**:
  - **Responsive Tab**: **Hide on Desktop** (Show on Tablet and Mobile).
  - **Content Tab**:
    - Icon: 3-bar hamburger icon (or custom SVG hamburger).
    - Link: Dynamic Tag → **Popup** (Action: Open Popup, select `Popup - Mobile Drawer`) OR ElementsKit Nav Menu Drawer Toggle.
  - **Style Tab**:
    - Width / Height: `38px × 38px`.
    - Background: `#FFFFFF`.
    - Border: `1.5px solid rgba(13, 13, 13, 0.12)`, Border Radius: `8px`.
    - Icon Color: `#0D0D0D`, Size: `18px`.
    - Box Shadow: `0 1px 3px rgba(0, 0, 0, 0.05)`.

---

## 4. MOBILE DRAWER SYSTEM (NATIVE OFF-CANVAS / POPUP BUILDER)

*Constructed inside **Templates > Popups > Add New** (`Popup - Mobile Drawer`) OR ElementsKit Off-Canvas Header Menu.*

```text
[Popup: Mobile Drawer] (Settings: Width 100% Mobile / 32rem Tablet, Height 100vh, Position: Right)
└── [Container: Drawer Shell] (Background: #FFFFFF, Flex Column, Height: 100vh)
    │
    ├── [Container: Top Header Bar] (Height: 68px, Flex Row, Justify Space Between, Padding: 0 20px, Border Bottom 1px #E6EAF0)
    │   ├── [Widget: Image] (flowone-logo.svg, Width: 104px)
    │   └── [Widget: Button / Close] (38x38px circle, bg rgba(5,40,242,0.05), dismisses drawer)
    │
    ├── [Container: Scrollable Drawer Body] (Flex 1, Overflow-Y: Auto, Padding: 16px 20px 24px)
    │   │
    │   ├── [Widget: Accordion] (Native Elementor Accordion Widget - 5 Expandable Items)
    │   │   ├── Accordion Item 1: "Solutions"
    │   │   │   └── Container / Icon List: All 5 groups with links to #capabilities
    │   │   ├── Accordion Item 2: "Platform"
    │   │   │   └── Container / Icon List: All 4 groups with links to #connection
    │   │   ├── Accordion Item 3: "AI"
    │   │   │   └── Container / Icon List: All 3 groups with links to #ai-inside-flow
    │   │   ├── Accordion Item 4: "Built for"
    │   │   │   └── Container / Icon List: All roles & scale links to #roles
    │   │   └── Accordion Item 5: "Resources"
    │   │       └── Container / Icon List: All playbooks & articles to #proof
    │   │
    │   └── [Container: Founder's Diary Mobile Card] (.fo-mobile-founder-native)
    │       │   - Margin Top: 24px, Padding: 16px, Border: 1px solid rgba(5,199,242,0.25), Radius: 12px, bg rgba(5,199,242,0.04)
    │       ├── [Container: Avatars + Badge Row]
    │       │   ├── Images: Woman & Man avatars (24x24px)
    │       │   └── Badge: "FOUNDER PERSPECTIVES" (10px 700 uppercase, #027491)
    │       ├── [Widget: Heading] -> "Why We Built flowOne" (15px 650 weight)
    │       └── [Widget: Button] -> "Read Founder Notes →" (Link: /founders-diary/)
    │
    └── [Container: Fixed Conversion Footer Deck] (Padding: 16px 20px, Border Top 1px #E6EAF0, bg #FFFFFF)
        ├── [Widget: Button] ("Book a Demo", Width: 100%, Height: 46px, Radius: 9999px, Gradient bg)
        └── [Widget: Text Editor] ("REIMAGINE BUSINESS WITH AI · 100% SOVEREIGN INDIAN CLOUD", 9px 500, Center, Color: #6B7280)
```

---

## 5. REFINED CUSTOM CSS SNIPPETS (MICRO-INTERACTIONS ONLY)

> [!NOTE]
> These minimal CSS rules are **strictly supplementary** to handle micro-animations (the Founder's Diary 6-second wiggle, the eyebrow beacon pulse, and the scroll compressor). They do **NOT** replace any widgets. Paste each snippet only into the **Advanced > Custom CSS** tab of the designated widget/container.

### 5.1 Founder's Diary Wiggle Keyframe (Apply to `.fd-pill-native` Container)
```css
/* Scoped to Founder's Diary Pill Container */
selector {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fdNativeWiggle 6s ease-in-out infinite;
}

selector:hover {
  animation: none;
  border-color: #049DD9;
  background: linear-gradient(135deg, #05C7F2 0%, #049DD9 100%);
  box-shadow: 0 4px 14px rgba(5, 199, 242, 0.35);
}

selector:hover span {
  color: #FFFFFF !important;
}

@keyframes fdNativeWiggle {
  0%, 84%, 100% { transform: rotate(0); }
  87% { transform: rotate(-3deg) translateX(-1px); }
  90% { transform: rotate(3deg) translateX(1px); }
  93% { transform: rotate(-2deg); }
  96% { transform: rotate(1.5deg); }
}

@media (prefers-reduced-motion: reduce) {
  selector {
    animation: none !important;
  }
}
```

### 5.2 Telemetry HUD Pulsing Beacon Dot (Apply to HUD Beacon Dot Container)
```css
/* Scoped to Beacon Dot */
selector {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #05C7F2;
  box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  animation: hudBeaconPulse 2.4s ease-in-out infinite;
}

@keyframes hudBeaconPulse {
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
  selector {
    animation: none !important;
  }
}
```

---

## 6. CLAUDE MCP / AI BUILDER EXECUTION PROTOCOL

When executing this build via Claude MCP using the `elementor-*`, `elementskit-*`, and `premium-addons-*` tools:

1. **Verify Plugins & Kit**:
   - Confirm Elementor Pro, ElementsKit, and Premium Addons are active via `core-get-environment-info`.
   - Read active global kit fonts and colors via `angie-get-elementor-kit`.
2. **Create Header Template**:
   - Call `elementskit-create-header-footer` or `elementor-manage-site-parts` with `type: "header"`, `title: "flowOne Site Header"`.
   - Set conditions: `["include/general"]` (Entire Site).
3. **Build the Root Shell**:
   - Create Root Flexbox Container (`direction: row`, `min_height: 76px`, `sticky: top`).
   - Create Inner Boxed Container (`width: 1280px`, `justify: space-between`).
4. **Insert Brand Logo**:
   - Insert `Site Logo` or `Image` widget into Left Column container, URL linked to `#home-hero`.
5. **Assemble Desktop Menu**:
   - Insert `ElementsKit Mega Menu` or `Elementor Nested Mega Menu` widget into Center Column container.
   - For each of the 5 top items (`Solutions`, `Platform`, `AI`, `Built for`, `Resources`), populate the nested panel container with the Category Groups and HUD Telemetry Aside card using native `Heading`, `Text Editor`, `Icon Box`, and `Button` widgets.
6. **Assemble Actions Cluster**:
   - Insert Right Column container.
   - Insert Founder's Diary native pill container (`180px`, `border 1.5px solid #05C7F2`) with 2 avatar images and heading.
   - Insert "Book a Demo" button widget with gradient style and Dynamic Tag link to `Popup - Book a Demo`.
   - Insert Mobile Hamburger toggle button with visibility set to Tablet & Mobile only.
7. **Create Mobile Drawer Popup**:
   - Create Elementor Popup or Off-Canvas Drawer `Popup - Mobile Drawer`.
   - Populate top bar, native Accordion widget with 5 categories, Founder's Diary card, and conversion footer deck.
8. **Publish & Verify**:
   - Publish document via `elementor-publish-document`.
   - Verify layout responsiveness across 1440px, 1024px, 768px, and 390px viewports.

---

## 7. QA ACCEPTANCE & VERIFICATION CHECKLIST

- [ ] **Zero Custom HTML Widgets**: Verify in Elementor Navigator that no `HTML` or `Custom Code` widget exists in the header tree.
- [ ] **Visual Editability**: Click on any text, icon, button, badge, or metric inside the Elementor editor; confirm all fields populate in the left sidebar controls.
- [ ] **Sticky Compression**: Scroll the page past 48px; confirm header stays pinned to the top and retains crisp background opacity.
- [ ] **All 5 Mega Menus Functional**: Hover/click `Solutions`, `Platform`, `AI`, `Built for`, `Resources`; confirm all 5 panels reveal their respective multi-column links and HUD Telemetry cards.
- [ ] **AI Panel Styling**: Confirm the `AI` mega menu displays the signature cyan/magenta theme accents.
- [ ] **Founder's Diary Pill**: Verify 2 avatars render cleanly, link leads to `/founders-diary/`, and subtle wiggle animates on desktop.
- [ ] **Demo Modal Integration**: Click "Book a Demo" in the header; confirm the `Popup - Book a Demo` modal launches smoothly.
- [ ] **Mobile Drawer Responsiveness**: Switch to Tablet (1024px) or Mobile (390px); confirm desktop nav collapses into the hamburger button and opening the drawer reveals the 5-item accordion and sticky bottom CTA.

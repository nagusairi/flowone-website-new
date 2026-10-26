# flowOne — Project Architecture & Specification Manual
> **Repository:** `flowOne-NewDesign` (`figma-make-app`)  
> **Brand:** `flowOne`  
> **Positioning:** AI-Powered Connected Business Platform for Indian Mid-Market Enterprises & Growing SMEs  
> **Tagline:** *“Your business moves as one. Your software should too.”*  
> **Status:** Production-Ready High-Fidelity Prototype & Design System  
> **Date Generated:** October 2026  

---

## 1. Executive Summary & Core Mission

### 1.1 What is flowOne?
**flowOne** is a modern, composable, AI-native business platform designed to solve the chronic fragmentation inside Indian mid-market enterprises. Traditional enterprise operations force businesses into siloed software stacks: legacy ERPs (Tally, SAP B1, Marg), detached CRM spreadsheets, disparate inventory trackers, manual GST filing portals, and separate banking apps.

flowOne unifies commercial orders, inventory reservations, statutory tax invoicing, accounting ledger postings, bank reconciliation, and cash-flow intelligence into **one continuous, deterministic transaction flow**.

### 1.2 Core Philosophy
> *“Business doesn’t happen in modules. Neither should your software.”*

In flowOne, a single transaction event (e.g., commercial sales order `TXN-10482`) ripples instantly across every operational domain without manual re-entry, reconciliation drift, or spreadsheet workarounds.

### 1.3 Grounded Indian Enterprise Context
The platform is purpose-built for the regulatory, banking, and operational realities of India:
- **Statutory MSME Compliance (Section 43B(h)):** Enforces strict 45-day payment cycles to MSME registered suppliers to protect business expense tax deductibility.
- **Direct GSTN & E-Invoicing Rails:** Automated IRN generation, digital signature validation, and E-Way bill clearance directly on invoice generation.
- **Multi-Bank Connectivity:** Automated statement ingestion and real-time reconciliation across 48+ Indian commercial banks (HDFC, ICICI, SBI, Axis, Kotak) using UTR tracking.
- **TReDS Invoice Discounting:** One-click integration with Indian Trade Receivables Discounting Systems for instant liquidity against approved corporate receivables.
- **Domestic Sovereign Cloud:** 100% Indian data residency (AWS Mumbai `ap-south-1` / GCP Delhi `asia-south2`), AES-256-GCM encryption, and immutable audit logs.

---

## 2. Technical Stack & Toolchain

| Layer | Technology | Specification / Version |
| :--- | :--- | :--- |
| **Runtime & UI** | React | `^19.0.0` (React 19 & React DOM 19) |
| **Language** | TypeScript | `^5.7.0` (Strict typing, noEmit checks) |
| **Build Tooling** | Vite | `^8.0.5` with `@vitejs/plugin-react` |
| **Styling Framework** | Tailwind CSS | `v4.0.0` with `@tailwindcss/vite` plugin |
| **CSS Architecture** | Modular Scoped CSS | Dedicated component stylesheets imported in `src/index.css` |
| **Motion & Animation** | GSAP & ScrollTrigger | `^3.15.0` with reduced-motion accessibility guards |
| **Code Formatting** | oxfmt | `^0.2.0` (High-speed Rust-based formatter) |
| **Package Manager** | pnpm / npm | `pnpm` (lockfile `pnpm-lock.yaml`) |
| **Deployment Target** | Modern Web / Cloud | Static SPA bundle deployed to domestic CDN/S3/Firebase |

---

## 3. Directory Structure & File Inventory

```
flowOne-NewDesign/
├── assets/                         # Global brand assets, illustrations & icons
├── public/                         # Public static files (logos, fonts, robots.txt)
│   ├── assets/                     # SVG marks, flowOne logo variants, spark marks
│   ├── fonts/lorin/                # Self-hosted Lorin font families (Light, Regular, Bold, ExtraBold)
│   └── robots.txt                  # Search engine crawl rules
├── src/                            # Application Source Code
│   ├── components/                 # Reusable UI & Page Section Components
│   │   ├── AIAdvantageSection.tsx          # Section 05: AI Inflow & Risk Engine
│   │   ├── AIDataStreamConnectors.tsx       # Live conduit SVG data streams
│   │   ├── AIIntelligenceCard.tsx          # Contextual AI advice cards
│   │   ├── AIInvoiceContextCard.tsx        # Sticky invoice preview widget
│   │   ├── AIStageLottieIcon.tsx           # Vector animations for AI stages
│   │   ├── AIWaveDivider.tsx               # Smooth svg canvas transition waves
│   │   ├── BlueShiftCanvas.tsx             # Section 04: The Connected Reality Canvas
│   │   ├── BusinessOutcomesSection.tsx     # Section 07: Enterprise Outcomes & Metrics
│   │   ├── CausalityStadiumLoop.tsx        # Section 02: 6-Stage Stadium Loop
│   │   ├── ConnectedBusinessAtlas.tsx      # Section 08 Option B: Business Control Atlas
│   │   ├── ConnectedBusinessBlueprint.tsx  # Interactive system architecture blueprint
│   │   ├── DecisionObservatorySection.tsx  # Section 06: Predictive Business Decisions
│   │   ├── LivingTransactionInstrument.tsx # Interactive transaction inspection console
│   │   ├── LivingTransactionJourney.tsx    # Horizontal transaction timeline
│   │   ├── LivingTransactionStackA.tsx     # Transaction Deck (Option A)
│   │   ├── LivingTransactionStackB.tsx     # Section 03: Transaction Deck (Option B)
│   │   ├── MegaMenuHandoffViewer.tsx       # Standalone Mega Menu inspection view
│   │   ├── MegaMenuPanel.tsx               # Enterprise 5-pillar responsive mega menu
│   │   ├── OneFlowDifferentViews.tsx       # Section 08 Option A: Role perspectives
│   │   ├── PerspectiveShift.tsx            # Section 08 Option C: Interactive workspace
│   │   ├── PredictiveDecisionsSection.tsx  # Section 06 Option A: Future Signal
│   │   ├── flowone.tsx                     # Core atomic UI primitives (Button, Icon, Badge)
│   │   ├── navigation-system.tsx           # Global Website Header, Mobile Drawer & Nav
│   │   ├── product-ui.tsx                  # Interactive micro-components & tooltips
│   │   ├── transactionCardsData.ts         # Single Source of Truth for TXN-10482 data
│   │   ├── aiAdvantageData.ts              # Data models for AI intelligence layers
│   │   └── *.css                           # Dedicated scoped component stylesheets
│   ├── motion/                     # Animation utilities & GSAP controllers
│   │   ├── accessibility.ts        # Reduced-motion checks & focus traps
│   │   ├── flow.ts                 # Flow conduit line animations
│   │   ├── reveal.ts               # Scroll-triggered component reveals
│   │   └── scroll.ts               # GSAP ScrollTrigger timeline helpers
│   ├── utils/                      # Helper libraries
│   │   └── lottieLoader.ts         # Lottie JSON dynamic animation parser
│   ├── App.tsx                     # Top-level view router & review switcher toolbar
│   ├── FinalHomepage.tsx           # PRODUCTION HOMEPAGE COMPOSITION (Active)
│   ├── NewHomepage.tsx             # Variant Homepage prototype
│   ├── Homepage.tsx                # Classic baseline Homepage
│   ├── main.tsx                    # React DOM entry point
│   ├── index.css                   # Tailwind v4 import, font-face declarations, global tokens
│   └── vite-env.d.ts               # Vite TypeScript environment declarations
├── index.html                      # HTML5 shell, SEO meta, JSON-LD schema
├── package.json                    # Project dependencies & scripts
├── vite.config.ts                  # Vite + React + Tailwind v4 + Figma Make config
├── tsconfig.json                   # TypeScript compiler options
└── PROJECT_DETAILS.md              # THIS MASTER SPECIFICATION FILE
```

---

## 4. Application Architecture & View Routing

The application entrypoint (`src/main.tsx`) mounts `src/App.tsx`. Because this project serves as both a high-fidelity client presentation tool and an active development environment, `App.tsx` includes an interactive URL-state switcher:

```tsx
// URL Query Parameter Routing
?view=final      // Renders FinalHomepage.tsx (Production Editable Composition)
?view=new        // Renders NewHomepage.tsx (Alternative Prototype)
?view=megamenu   // Renders MegaMenuHandoffViewer.tsx (Navigation System Spec)
?view=classic    // Renders Homepage.tsx (Original Baseline)
```

A floating toolbar at the bottom of the screen (`flowone-page-switcher`) allows instant one-click switching between these compositions with persistent browser URL history state.

---

## 5. Complete Homepage Section Breakdown (`FinalHomepage.tsx`)

`FinalHomepage.tsx` represents the unified production narrative, structured into sequential editorial chapters:

### Chapter 01: Hero & Converging Pipeline (`HeroFlow`)
- **Headline:** *“Your business moves as one. Your software should too.”*
- **Subheadline:** Composable business platform connecting finance, operations, compliance, and AI into one continuous flow.
- **HeroFlow Console:** A dual-flank live operational telemetry canvas:
  - **Left Flank (3 Upstream Fragments):** Sales & CRM (`SO-10482`), Warehouse & Stock (`125 Units Reserved`), Finance & Ledger (`INV-10482 ₹5.90L`).
  - **Right Flank (3 Downstream Fragments):** GST Compliance (`IRN Cleared`), Banking & Cash (`Auto-Recon HDFC`), AI Intelligence (`92% Cash Probability`).
  - **Center Hub:** The **flowOne Core Engine**, featuring pulsing concentric beacon rings and animated SVG conduits conveying real-time energy pulses inwards into `TXN-10482`.
  - **Telemetry Footer:** Proves `< 14ms` pipeline latency, `100%` context integrity, and immutable audit logs.

### Chapter 02: The Global Navigation System (`WebsiteHeader`)
- **Persistent Header:** Responsive enterprise navbar with blurred glassmorphism backdrop (`backdrop-blur-md`).
- **5-Pillar Mega Menu (`MegaMenuPanel`):**
  1. **Solutions & Suites:** Customer-to-Cash (AR), Procure-to-Pay (AP), Inventory & Warehouse, Cash & Treasury, GST Compliance.
  2. **Core Platform:** Architecture, Unified Event Fabric, Bank & GSTN Gateways, Security Vault.
  3. **AI Inside Flow:** flowOne AI Business Agent, WhatsApp Business AI Rails, Autonomous Bank Recon, Maker-Checker Governance.
  4. **Built For (Personas):** CFOs, AR Collections, AP Procurement, Treasury, Warehouse Operations.
  5. **Resources:** GST & E-Invoicing Playbooks, MSME 45-Day Payment Rule Guide, Interactive ROI Calculator.
- **CTA Actions:** Direct phone line, login portal link, and high-emphasis primary button: `Book a Live Demo`.

### Chapter 03: The Business Loop (`CausalityStadiumLoop`)
- **Headline:** *“Business doesn’t happen in modules. One continuous path. Six business stages. A chain of consequences.”*
- **Stadium Circuit UI:** An interactive closed-circuit track showing how one event naturally triggers the next:
  1. `01 Order` → Commercial sales order locked
  2. `02 Inventory` → Stock reserved in warehouse DC-02
  3. `03 Invoice` → Statutory tax invoice generated with IRN
  4. `04 Receivable` → Open balance posts to accounting ledger
  5. `05 Cash` → Inbound payment matches UTR automatically
  6. `06 Decision` → Working capital metrics update instantly

### Chapter 04: The Living Transaction Fabric (`LivingTransactionStackB`)
- **Headline:** *“One transaction. Connected from start to cash.”*
- **Grounding Case:** Single real-world transaction: **`TXN-10482`** (Customer: **Ananya Enterprises**, Value: **₹5,90,000**, Hyderabad Warehouse **DC-02**).
- **10-Card Interactive Stacking Deck:** Users can scrub or click through 10 granular operational moments:
  - Card 1: Commercial Sales Order (`SO-10482`)
  - Card 2: Warehouse Allocation (`Rack HYD-B4`)
  - Card 3: Statutory Tax Invoice (`INV-10482`)
  - Card 4: E-Way Bill Clearance (`EWB-89210492`)
  - Card 5: Real-Time Ledger Posting (`Customer Debtors A/C`)
  - Card 6: AI-Predicted Collection Delay (`Day +30 → +45 Shift`)
  - Card 7: Automated WhatsApp Payment Reminder
  - Card 8: Inbound HDFC Bank Clearance (`UTR-902188219`)
  - Card 9: Autonomous Bank Reconciliation (Zero human ticking)
  - Card 10: Executive Working Capital Velocity Dashboard

### Chapter 05: The Connected Reality (`BlueShiftCanvas`)
- **Headline:** *“From Fragmented Systems to Unified Velocity.”*
- **Interactive Transformation Matrix:** Allows enterprise buyers to toggle between the **Fragmented Reality** (6 isolated silos with reconciliation friction) and the **flowOne Reality** (a single connected data fabric with automated state transitions).

### Chapter 06: AI Advantage · The Intelligence Moment (`AIAdvantageSection`)
- **Headline:** *“AI that works inside the flow, not in a side chat window.”*
- **Architecture:**
  - **Left Sticky Anchor:** The live transaction context invoice card (`INV-10482`).
  - **Right Intelligence Stream:** Layered interactive cards displaying active AI inference:
    - *OCR Document Parsing:* 99.4% field extraction accuracy on vendor invoices.
    - *Predictive Inflow Scoring:* Bayesian counterparty payment behavior prediction.
    - *Autonomous Anomaly Detection:* Fraud, double-billing, and Section 43B(h) compliance warnings.
  - **Visual Accents:** Vector Lottie stage animations and smooth SVG gradient wave dividers.

### Chapter 07: Predictive Business Decisions (`DecisionObservatorySection`)
- **Headline:** *“Understand the connection. Anticipate the consequence. Decide with context.”*
- **Direction B — The Decision Observatory:** (Detailed in Section 6 below).
- **Interactive Signal Explorer:** 5 interconnected business signals dynamically driving potential business impacts and safe, human-supervised strategic recommendations.

### Chapter 08: Business Outcomes & Quantitative ROI (`BusinessOutcomesSection`)
- **Headline:** *“Proven outcomes for Indian enterprise finance leaders.”*
- **Verified Metrics Grid:**
  - **-72%** Days Sales Outstanding (DSO) compression
  - **98.6%** Autonomous Bank Reconciliation rate
  - **0** Section 43B(h) MSME non-compliance penalties
  - **14 Days** Average working capital velocity unlocked

### Chapter 09: Role Architecture & Different Views (`OneFlowDifferentViews`)
- **Perspective Selector:** Demonstrates how different executives interact with the same underlying transaction:
  - **CFO & Finance Director:** Liquidity valleys, cash runway, credit risks, compliance health.
  - **AR & Collections Lead:** Aging buckets, dispute resolutions, WhatsApp reminder logs.
  - **AP & Procurement Controller:** Vendor aging, 45-day MSME timers, early settlement discounts.
  - **Warehouse & Logistics Manager:** Real-time stock reserve, dispatch clearance, E-Way bills.

### Chapter 10: Institutional Enterprise Footer (`FinalFooter`)
- **5-Layer Architecture:**
  1. *Conversion Launchpad:* Direct CTA banner with "Book a Live Demo" and "Explore Interactive Sandbox".
  2. *6-Pillar Architectural Sitemap:* 40+ direct enterprise navigational links.
  3. *Institutional Trust Deck:* Registered Office (Secunderabad), Tech HQ (Kukatpally, Hyderabad), Sovereign Data Cloud (AWS Mumbai).
  4. *Live Telemetry & Contact Rails:* 99.99% platform uptime beacon, direct phone (`+91 7670890889`), direct email (`sales@flowone.in`), and verified social links.
  5. *Brand & Legal Baseline:* Copyright 2026, Privacy Policy, Terms of Service, Cookie Policy, and smooth Back-to-Top scroll.

### Modal Layer: Accessible Demo Booking Dialog (`DemoDialog`)
- Accessible ARIA modal with focus-trap, ESC-key dismissal, body-scroll lock, and structured enterprise qualification fields (work email, company name, starting workflow).

---

## 6. Deep Dive: Section 06 — Predictive Business Decisions

Section 06 was completely refined in accordance with the UX Simplification & Cognitive Load Reduction Master Prompt:

### 6.1 The 5 Enterprise Business Signals

```typescript
export type SignalId =
  | "receivables"          // Inflow Signal: Ananya INV-10482 (+15D Lag)
  | "supplier-payments"    // Payment Commitment: Shanti Metals PO-9201 (₹4.50L due)
  | "inventory"            // Working Capital Commitment: Raw Materials Re-order (₹6.20L)
  | "expected-cash"        // Liquidity Position: 30-Day Cash Trajectory (₹24.8L compression)
  | "collection-risk";     // Counterparty Behavioral Risk: High Exposure Score
```

### 6.2 The Three Primary UX Questions
Every signal immediately answers three hierarchical questions without visual clutter:
1. **What is happening?** → Small uppercase label `POTENTIAL BUSINESS IMPACT`, prominent impact headline, clearly labeled financial amount, and concise 1-sentence summary.
2. **Why does it matter?** → `ACTIVE CAUSALITY LINK`, a single concise contextual relationship sentence connecting the selected signal to downstream dependencies.
3. **What could I consider doing?** → Small label `DECISION TO CONSIDER`, action-oriented recommendation headline, clear rationale, and strict human-confirmation guardrails.

### 6.3 Progressive Disclosure Drawers
Secondary analytical details are preserved but placed inside accessible, keyboard-operable expandable disclosure panels:
- `View related signals` → Exposes secondary causal relationship badges.
- `View impact details` → Discloses the 3 detailed ripple effects (cash compression, vendor clash, statutory deadline).
- `View reasoning` → Discloses AI strategic tags, feasibility assessments, simulated financial outcomes, and mandatory human-approval notice (*"AI models provide recommendations. All settlements require human maker-checker authorization"*).

### 6.4 Responsive Navigation Capsule Strip
- **Desktop:** Cockpit layout with top linear capsule bar displaying all 5 signals with active electric-blue border and clear value metrics.
- **Tablet & Mobile:** Bounded linear capsule rail with smooth horizontal drag/scroll, active pill centering, adjacent ghost pills, and preserved left/right chevron arrow buttons.

---

## 7. Design System & Visual Specification

### 7.1 Color Tokens (`src/index.css` & `flowOne_Color_Design_System.md`)

```css
:root {
  /* Brand Spectrum */
  --flow-primary: #0528F2;          /* Electric Blue: Primary actions, active borders, key metrics */
  --flow-primary-deep: #0540F2;     /* Deep Blue: Hover states, dark transitions */
  --flow-primary-pressed: #0A2BC7;  /* Pressed states */
  --flow-cyan: #049DD9;             /* Azure: Flow indicators, secondary energy */
  --flow-cyan-bright: #05C7F2;      /* Bright Cyan: Live beacons, glowing conduit beads */
  --flow-magenta: #D9299B;          /* Flow Pink: High-accent AI highlight (2-4% usage) */
  --flow-ink: #0D0D0D;              /* Flow Ink: Deepest contrast neutral */

  /* Neutral Spectrum */
  --neutral-0: #FFFFFF;             /* Card surfaces & clean canvas */
  --neutral-50: #F7F8FA;            /* Secondary section backgrounds */
  --neutral-100: #F1F4F8;           /* Subtle card borders & capsule fills */
  --neutral-200: #E6EAF0;           /* Crisp dividers & borders */
  --neutral-300: #DDE3EA;           /* Inactive track rails */
  --neutral-500: #6B7280;           /* Secondary body text & metadata */
  --neutral-700: #374151;           /* Strong secondary headings */
  --neutral-900: #0D0D0D;           /* Primary display typography */

  /* Semantic System */
  --success: #16803C;  --success-bg: #EAF7EF;
  --warning: #B7791F;  --warning-bg: #FFF7E6;
  --error: #C62828;    --error-bg: #FDECEC;
  --info: #0528F2;     --info-bg: #EEF2FF;
}
```

### 7.2 Color Usage Distribution (The 70-20-10 Rule)
- **65–70% Neutrals & Whites:** Generous whitespace, crisp white cards, light-grey backgrounds (`#F7F8FA`).
- **15–20% Electric / Deep Blue:** Primary navigation, active pills, high-priority buttons, key financial amounts.
- **7–10% Cyan / Azure:** Energy conduit pulses, live beacons, status badges, secondary progress bars.
- **2–4% Magenta Accent:** Exclusively for AI highlight moments; never used as a dominant background.

### 7.3 Typography Hierarchy
1. **Lorin (Self-Hosted Webfont):**
   - Headings, section titles, card headers, and premium editorial text.
   - Weights: `300 (Light)`, `400 (Regular)`, `700 (Bold)`, `800 (ExtraBold)`.
2. **Manrope (Google Fonts):**
   - High-legibility UI controls, navigation labels, body paragraphs, and forms.
   - Weights: `400`, `500`, `600`, `700`.
3. **Bebas Neue / Display:**
   - Hero telemetry metrics, large percentage numbers, and section numbering (`01`, `02`, `06`).
4. **JetBrains Mono / System Monospace:**
   - Transaction hashes (`TXN-10482`), invoice numbers (`INV-10482`), UTR codes, GSTINs, and pipeline latencies (`14ms`).

---

## 8. Development, Build & Verification Workflow

### 8.1 Prerequisites
- **Node.js:** `v20.x` or `v22.x`
- **Package Manager:** `npm` or `pnpm` (`pnpm >= 9.x`)

### 8.2 Standard Commands

```bash
# Install dependencies
npm install
# or
pnpm install

# Start local development server (Vite runs on port 8443 or available port)
npm run dev
# or
pnpm dev

# Type check codebase without emitting output
npx tsc --noEmit

# Production Build (Vite bundles client assets into /dist)
npm run build
# or
pnpm build

# Preview production build locally
npm run preview
# or
pnpm preview

# Format code with oxfmt
npm run format
# or
pnpm format
```

### 8.3 Build Verification Status
- Production build compiles cleanly in **< 500ms** (`vite v8.0.5`).
- Zero TypeScript diagnostics errors (`tsc --noEmit` passes with exit code 0).
- Fully tree-shaken JS and CSS bundles with automated vendor chunk splitting for GSAP and ScrollTrigger.

---

## 9. Accessibility (a11y) & Performance Standards

1. **Accessibility Compliance:**
   - Strict adherence to **WCAG 2.1 AA** color contrast ratios across all text elements.
   - All interactive triggers feature semantic ARIA attributes (`aria-expanded`, `aria-controls`, `aria-selected`, `aria-label`).
   - Visible keyboard `:focus-visible` rings styled with brand electric blue (`#0528F2`).
   - Modal focus trapping and document body scroll-lock implemented in `DemoDialog`.
2. **Motion Sensitivity:**
   - All GSAP animations, interval timers, and pulsing SVG conduits check for `prefers-reduced-motion: reduce`.
   - When reduced motion is requested by the OS, interval pulse cycles are paused, transitions are set to standard opacity, and SVG transform movements are minimized.
3. **Responsive Viewports:**
   - **Large Desktop (1440px+):** Full 1280px max-width container with comfortable breathing room and dual-flank layouts.
   - **Compact Desktop / Laptop (1024px–1439px):** Optimized column grids, streamlined conduit SVGs.
   - **Tablet Landscape & Portrait (768px–1023px):** Horizontal scrolling capsule rails, stacked card decks.
   - **Mobile (320px–767px):** Full-width stacked modules, touch-friendly tap targets (minimum 44x44px), sticky bottom actions.

---

## 10. Summary Checklist for Engineering & Design Handoff

- [x] **Single Source of Truth:** `src/FinalHomepage.tsx` is the primary active composition.
- [x] **TXN-10482 Continuity:** Identical customer, invoice, and warehouse details maintained across Hero, Living Transaction, AI Advantage, and Decision Observatory.
- [x] **Section 06 Cognitive Load Refinement:** Implemented single causality sentence, dominant impact headline, action-oriented decision, and progressive disclosure drawers.
- [x] **Responsive Capsule Rail:** Custom styled horizontal signal strip with chevron arrows preserved for tablet/mobile.
- [x] **Zero Build Errors:** Verified with Vite 8.0.5 and TypeScript 5.7.
- [x] **Institutional Trust:** Complete registered and corporate Hyderabad/Secunderabad office details and sovereign cloud residency declared in footer.

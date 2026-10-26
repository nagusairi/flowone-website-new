# flowOne Section 05: The Intelligence Moment — Builder-Grade Elementor Pro Native Handoff Specification

> **Target Platform:** WordPress with Elementor Pro on `flowone.in` / `sandbox.flowone.in`  
> **Source Repository:** `flowOne-NewDesign` (`src/components/IntelligenceMomentView.tsx`, `src/components/ai-advantage-moment.css`, `src/FlowoneFinal.tsx`, `src/FinalHomepage.tsx`)  
> **Concept:** Direction B: The Moment of Intelligence (3-Stage Progressive Telemetry: Signal → Insight → Action)  
> **Audience:** Claude AI MCP Agent, Elementor Developers, and WordPress Site Builders  
> **Strict Builder Directive:** **NO GIANT CUSTOM HTML WIDGETS.** The entire layout is engineered to be built using native Elementor Pro Flexbox Containers, native widgets (Heading, Text Editor, Icon Box, Button, Icon List), and the native Elementor Pro **Tabs** (`nested-tabs`) widget. The left-hand "Inspected Object" cockpit card and all telemetry metrics are 100% editable directly inside standard Elementor inspector panels.

---

## EXECUTIVE BUILD SUMMARY FOR AI MCP & BUILDERS

| Requirement | Implementation Architecture |
| :--- | :--- |
| **Section Identifier** | Section 05 — The Intelligence Moment (`#section-ai-advantage-moment`) |
| **Section Canvas** | Deep Royal Indigo to Violet Tech Gradient: `linear-gradient(190deg, #181A61 0%, #5356D6 100%)` |
| **Section Spacing** | Desktop: `clamp(4.5rem, 8vw, 7.5rem)` top, `clamp(5rem, 9vw, 8.5rem)` bottom; Max container width `1240px` |
| **Preceding / Following Backgrounds** | Section 04: `#F8FAFC` (Cool Slate Tint) ➔ Section 05 Canvas ➔ Section 06: `#FAFBFD` (Tech Ice Tint) |
| **Section Dividers** | Top & Bottom multi-layer wave dividers matching `#F8FAFC` and `#FAFBFD` seamlessly |
| **Layout Mode** | **Desktop (> 1024px):** 3-column asymmetric flex/grid (`390px` Sticky Object + `70px` Conduit + `1fr` Dominant Panel)  <br>**Tablet (769px–1024px):** 1-column stacked flow (`520px` centered Object + compact vertical conduit + dominant panel)  <br>**Mobile (≤ 768px):** 1-column single-stream mobile stack with touch-snap stage pills |
| **Primary State Widget** | **Elementor Pro `nested-tabs`** (Tabs widget with nested flex containers for the 3 stages: Signal, Insight, Action) |
| **Left Anchor Card** | Native Elementor Flexbox Container styled as an **AI Cockpit Inspection Card** (`#090E20` Navy, cyan borders, corner tech accents) containing fully editable Elementor Headings and Meta widgets |
| **Center Bridge** | Desktop: 70px Conduit with SVG energy pulse. Tablet/Mobile: Downward conduit transition or seamless stacked flow |
| **Right Presentation** | Dominant Stage Panel with: (1) Stage Kicker + AI Icon, (2) Display Title, (3) Luminous Focal Quote Callout, (4) Narrative Explanation, (5) State 03 Strategic Options & CTA, (6) 3-Column Telemetry Facts Grid, (7) Governance Badge & Footer |
| **Typography System** | Display Headings: **Bebas Neue** (uppercase) · Body/UI: **Lorin** / sans-serif · Telemetry/Codes/IRN: **JetBrains Mono** (`fo-mono-secondary`) |
| **Color Tokens** | Section Base: `#181A61` ➔ `#5356D6` · Card Fill: `#090E20` · Brand Cyan: `#05C7F2` · Tech Sky: `#38BDF8` · Electric Blue: `#0055FF` · Slate Muted: `#94A3B8` |

---

## 1. EXISTING-SECTION AUDIT & PLUGIN EVALUATION

### 1.1 Context & Current Site State
On the FlowOne homepage (`FlowoneFinal.tsx` and `FinalHomepage.tsx`), Section 05 acts as the cognitive climax of the narrative. Preceding it is **Section 04: The Connected Reality** (which establishes cross-departmental data continuity). Following it is **Section 06: Predictive Decisions / Decision Observatory** (which projects forward-looking cash flow and working capital).

Section 05 answers the pivotal executive question:  
*"Once data is connected across the business, how does flowOne AI actually interpret a transaction and assist the leadership team?"*

### 1.2 Audit of Installed Plugins on WordPress (`sandbox.flowone.in` / `flowone.in`)
The live environment was audited via MCP (`get_option('active_plugins')`):
- `elementor` & `elementor-pro` (v3.x with Flexbox Containers & Nested Elements enabled)
- `elementskit-lite`
- `premium-addons-for-elementor`
- `timeline-widget-addon-for-elementor`
- `unlimited-elements-for-elementor`
- `skyboot-custom-icons-for-elementor`
- `litespeed-cache`

### 1.3 Widget Selection Architecture Matrix

| Candidate Widget | Provider | Score | Suitability Analysis |
| :--- | :--- | :--- | :--- |
| **`nested-tabs`** | **Elementor Pro** (Native) | ⭐⭐⭐⭐⭐ **(Selected Architecture)** | **Zero code bloat, native drag-and-drop flex containers.** The tab buttons (`01 Signal`, `02 Insight`, `03 Action`) render on top in a sticky glassmorphic pill bar. Each tab body is an open Flexbox Container where any native Elementor widget (Headings, Text, Buttons, Icon Lists) can be nested and styled with full responsive control. |
| **`elementskit-simple-tab`** | **ElementsKit Lite** | ⭐⭐⭐ | Requires creating 3 separate Elementor Saved Templates for the 3 stages and loading them via shortcodes, fragmenting the editing workflow. |
| **`premium-tab`** | **Premium Addons** | ⭐⭐⭐⭐ | Supports rich content, but lacks native nested flex container drag-and-drop within the same editor viewport. |
| **Single Raw HTML Embed** | Core WordPress / Elementor | ❌ **(Prohibited)** | Completely inaccessible to non-technical editors; breaks WordPress visual editing, translations, dynamic tags, and site settings. |

> **Architectural Decision:** Use **Elementor Pro's native Flexbox Container architecture + `nested-tabs` widget**. The left cockpit card is built entirely with standard Elementor widgets inside a sticky container. The right stage progression is driven by `nested-tabs`.

---

## 2. COMPONENT HIERARCHY & CONTAINER ARCHITECTURE

Below is the complete builder-grade container blueprint for Elementor:

```
[SECTION CONTAINER] #section-ai-advantage-moment
│  (Gradient: 190deg, #181A61 -> #5356D6 | Max-Width: Full Width | Overflow: Clip)
│
├── [WIDGET] AIWaveDivider Top (Shape Divider or SVG Embed, Fill: #F8FAFC, Height: 18px)
│
└── [INNER WRAPPER CONTAINER] .fo-ai-moment__container (Max-Width: 1240px, Centered, Flex-Col)
    │
    ├── [CONTAINER] .fo-ai-moment__header (Max-Width: 760px, Margin-Bottom: 48px)
    │   ├── [CONTAINER] .hero-eyebrow-container
    │   │   └── [WIDGET: Heading / Icon Box] Eyebrow Pill (✦ AI ADVANTAGE · THE INTELLIGENCE MOMENT →)
    │   ├── [WIDGET: Heading] .fo-ai-moment__headline ("AI that understands the whole business.")
    │   └── [WIDGET: Text Editor] .fo-ai-moment__copy ("From transaction details to predicted outcomes...")
    │
    └── [CONTAINER] .fo-ai-moment__workspace (Display: Flex/Grid | 3-Column on Desktop: 390px / 70px / 1fr)
        │
        ├── [CONTAINER] .fo-ai-moment__invoice-col (Width: 390px, Position: Sticky, Top: 130px)
        │   └── [CONTAINER] .fo-ai-moment__invoice-card (Bg: #090E20, Radius: 16px, Border: Cyan 35%)
        │       ├── [CONTAINER] Tech Corner Accents (4 absolute pseudo-elements / CSS corners)
        │       ├── [CONTAINER] .fo-ai-moment__invoice-header (Display: Flex, Justify: Space-Between)
        │       │   ├── [WIDGET: Heading] Kicker: "INSPECTED OBJECT" (#38BDF8, 11px, Bold)
        │       │   └── [CONTAINER] Status: Dot Beacon (#05C7F2) + Text "AI TELEMETRY"
        │       ├── [CONTAINER] .fo-ai-moment__invoice-payload (Margin-Bottom: 24px)
        │       │   ├── [WIDGET: Heading] .fo-ai-moment__invoice-ref: "INV-10482" (White, 26px, 800)
        │       │   ├── [WIDGET: Heading] .fo-ai-moment__invoice-amount: "₹5,90,000" (Cyan #05C7F2, 22px)
        │       │   └── [WIDGET: Text] .fo-ai-moment__invoice-client: "Ananya Enterprises · GSTIN 36AABCA1234F1Z5"
        │       ├── [CONTAINER] .fo-ai-moment__invoice-telemetry (3-Column Flex, Border-Top: 1px Slate)
        │       │   ├── [CONTAINER] Telemetry 1: Label "SCHEMA" (9px) + Value "99.8%" (13px, Bold)
        │       │   ├── [CONTAINER] Telemetry 2: Label "IRN STATUS" (9px) + Value "Verified" (Cyan)
        │       │   └── [CONTAINER] Telemetry 3: Label "CONFIDENCE" (9px) + Value "92.0%" (13px, Bold)
        │       ├── [CONTAINER] .fo-ai-moment__invoice-tag (Active State Banner Pill)
        │       │   └── [WIDGET: Icon Box / Text] Beacon Dot + Text: "01 · BUSINESS SIGNAL CAPTURED"
        │       └── [CONTAINER] .fo-ai-moment__invoice-port (14px Circle Port on Right Edge)
        │
        ├── [CONTAINER] .fo-ai-moment__connector-col (Width: 70px, Desktop Only, Align: Center)
        │   └── [WIDGET: HTML / SVG] Luminous SVG Conduit with animated gradient & traveling bead
        │
        └── [CONTAINER] .fo-ai-moment__panel-col (Flex: 1, Display: Flex-Col)
            └── [WIDGET: nested-tabs] .fo-ai-moment__nested-tabs (Elementor Pro Tabs Widget)
                │
                ├── [TAB BAR HEADER] (Sticky Top: 130px, Glassmorphic Navy, 3 Tab Items)
                │   ├── Tab 01 Header: "01 Signal"
                │   ├── Tab 02 Header: "02 Insight"
                │   └── Tab 03 Header: "03 Action"
                │
                ├── [TAB 01 CONTENT CONTAINER] .fo-ai-moment__panel (Stage 01: Business Signal)
                │   ├── Header: Icon (✦ Spark) + Kicker: "BUSINESS SIGNAL" + Badge: "TRANSACTION CONTEXT"
                │   ├── Title: "One transaction. More context."
                │   ├── Focal Quote Box: "“Every transaction carries information beyond its face value.”"
                │   ├── Narrative: "Ananya Enterprises INV-10482 (₹5,90,000) was issued with Net 30 payment terms..."
                │   ├── Facts Grid (3 Cards):
                │   │   ├── Fact 1: "DOCUMENT REF" -> "INV-10482 · Confirmed"
                │   │   ├── Fact 2: "CONTRACTUAL DUE" -> "Day +30 · 28 Jun 2026"
                │   │   └── Fact 3: "STATUTORY STATUS" -> "IRN Verified · NIC Cleared" (Accent Cyan)
                │   └── Governance Footer: "🛡 Operator Governance · Grounded in Transaction TXN-10482"
                │
                ├── [TAB 02 CONTENT CONTAINER] .fo-ai-moment__panel (Stage 02: AI Insight)
                │   ├── Header: Icon (✦ Spark) + Kicker: "AI INSIGHT" + Badge: "PREDICTIVE SIGNAL"
                │   ├── Title: "Understand what happens next."
                │   ├── Focal Quote Box: "“A change in payment behaviour may affect when expected cash becomes available.”"
                │   ├── Narrative: "Continuous behavioral payment modeling correlates historical settlement trends..."
                │   ├── Facts Grid (3 Cards):
                │   │   ├── Fact 1: "PAYMENT VELOCITY" -> "92% Probability at Day +45" (Accent Cyan)
                │   │   ├── Fact 2: "CYCLE DRIFT" -> "+15 Days past terms"
                │   │   └── Fact 3: "LIQUIDITY OVERLAP" -> "Day +38 Vendor Run"
                │   └── Governance Footer: "🛡 Operator Governance · Grounded in Transaction TXN-10482"
                │
                └── [TAB 03 CONTENT CONTAINER] .fo-ai-moment__panel (Stage 03: Decision & Action)
                    ├── Header: Icon (✦ Spark) + Kicker: "DECISION TO CONSIDER" + Badge: "GOVERNANCE READY"
                    ├── Title: "Turn understanding into action."
                    ├── Focal Quote Box: "“Review upcoming cash commitments against the expected collection timeline.”"
                    ├── Narrative: "AI synthesizes the working-capital shortfall and proposes two proactive treasury decisions..."
                    ├── Strategic Options Card:
                    │   ├── Title: "STRATEGIC INTERVENTIONS TO CONSIDER"
                    │   ├── Option A: "✦ Option A: Trigger prompt-settlement outreach with a 1.25% early rebate (< 48h recovery)"
                    │   ├── Option B: "✦ Option B: Route invoice into TReDS discounting to advance ₹5.82L into active cash"
                    │   └── Action CTA Button: "Review Cash Timeline & Options →"
                    ├── Facts Grid (3 Cards):
                    │   ├── Fact 1: "SUGGESTED ACTION" -> "Prioritize Collection Outreach" (Accent Cyan)
                    │   ├── Fact 2: "FINANCIAL NET COST" -> "₹7,375 (or advance ₹5.82L)"
                    │   └── Fact 3: "GOVERNANCE" -> "Requires Operator Approval"
                    └── Governance Footer: "🛡 Operator Governance · Grounded in Transaction TXN-10482"
```

---

## 3. COMPLETE CONTENT & TELEMETRY MATRIX

### 3.1 Section Header Copy
- **Eyebrow Badge:** `✦ AI ADVANTAGE`
- **Eyebrow Title:** `THE INTELLIGENCE MOMENT`
- **Section Headline:** `AI that understands the whole business.`
- **Section Sub-Lead:** `From transaction details to predicted outcomes, flowOne AI connects the signals that help teams decide what happens next.`

### 3.2 Left Column — Inspected Business Object (Anchored Payload)
- **Top Kicker:** `INSPECTED OBJECT`
- **Telemetry Beacon:** `AI TELEMETRY` (with pulsing cyan status light)
- **Primary Reference:** `INV-10482`
- **Gross Commercial Amount:** `₹5,90,000`
- **Counterparty & GST:** `Ananya Enterprises · GSTIN 36AABCA1234F1Z5`
- **Telemetry Row:**
  - Fact 1: `SCHEMA` → `99.8%`
  - Fact 2: `IRN STATUS` → `Verified` (State: Clear Cyan)
  - Fact 3: `CONFIDENCE` → `92.0%`
- **Stage Tag Banners (Contextually synced or default):**
  - Stage 1: `01 · BUSINESS SIGNAL CAPTURED`
  - Stage 2: `02 · AI INFERENCE ACTIVE`
  - Stage 3: `03 · DECISION PATH READY`

### 3.3 Stage 01: Signal (Business Signal Captured)
- **Tab Number & Label:** `01 Signal`
- **Card Kicker:** `BUSINESS SIGNAL`
- **Badge Pill:** `TRANSACTION CONTEXT`
- **Stage Title:** `One transaction. More context.`
- **Focal Quote Callout:** `“Every transaction carries information beyond its face value.”`
- **Narrative Explanation:**  
  `"Ananya Enterprises INV-10482 (₹5,90,000) was issued with Net 30 payment terms and instant IRN tax verification. On paper, it is a routine commercial booking cleared into the ledger. Beneath the surface, real-time historical and operational signals begin to correlate."`
- **Facts Grid:**
  - Item 1: `DOCUMENT REF` ➔ `INV-10482 · Confirmed`
  - Item 2: `CONTRACTUAL DUE` ➔ `Day +30 · 28 Jun 2026`
  - Item 3: `STATUTORY STATUS` ➔ `IRN Verified · NIC Cleared` *(Accent Cyan)*

### 3.4 Stage 02: Insight (Predictive Signal & Behavioral Modeling)
- **Tab Number & Label:** `02 Insight`
- **Card Kicker:** `AI INSIGHT`
- **Badge Pill:** `PREDICTIVE SIGNAL`
- **Stage Title:** `Understand what happens next.`
- **Focal Quote Callout:** `“A change in payment behaviour may affect when expected cash becomes available.”`
- **Narrative Explanation:**  
  `"Continuous behavioral payment modeling correlates historical settlement trends for Ananya Enterprises. Recent payment runs demonstrate a 15-day collection drift, projecting settlement at Day +45 instead of Day +30—shifting directly past scheduled month-end supplier disbursements."`
- **Facts Grid:**
  - Item 1: `PAYMENT VELOCITY` ➔ `92% Probability at Day +45` *(Accent Cyan)*
  - Item 2: `CYCLE DRIFT` ➔ `+15 Days past terms`
  - Item 3: `LIQUIDITY OVERLAP` ➔ `Day +38 Vendor Run`

### 3.5 Stage 03: Action (Treasury Decision & Human Governance)
- **Tab Number & Label:** `03 Action`
- **Card Kicker:** `DECISION TO CONSIDER`
- **Badge Pill:** `GOVERNANCE READY`
- **Stage Title:** `Turn understanding into action.`
- **Focal Quote Callout:** `“Review upcoming cash commitments against the expected collection timeline.”`
- **Narrative Explanation:**  
  `"AI synthesizes the working-capital shortfall and proposes two proactive treasury decisions to protect liquidity before the collection delay impacts scheduled vendor payments:"`
- **Strategic Interventions Card:**
  - Subhead: `STRATEGIC INTERVENTIONS TO CONSIDER`
  - Row A: `✦ Option A: Trigger prompt-settlement outreach with a 1.25% early rebate (< 48h recovery)`
  - Row B: `✦ Option B: Route invoice into TReDS discounting to advance ₹5.82L into active cash`
  - Primary CTA: `Review Cash Timeline & Options →`  
  *(Acknowledged State: `✓ Decision Acknowledged · Logged to Treasury Flow`)*
- **Facts Grid:**
  - Item 1: `SUGGESTED ACTION` ➔ `Prioritize Collection Outreach` *(Accent Cyan)*
  - Item 2: `FINANCIAL NET COST` ➔ `₹7,375 (or advance ₹5.82L)`
  - Item 3: `GOVERNANCE` ➔ `Requires Operator Approval`
- **Governance Baseline:**
  - Left: `🛡 Operator Governance · Grounded in Transaction TXN-10482 Context`
  - Right: `Human-in-the-Loop · No Autonomous Execution`

---

## 4. DETAILED ELEMENTOR CONTROL SPECIFICATION

Every single element is mapped to native Elementor controls so editors can change numbers, text, and styles without code.

### 4.1 Section Container Controls (`#section-ai-advantage-moment`)
- **Layout:**
  - Content Width: Full Width (Container stretched)
  - Direction: Column
  - Elements Gap: `0px`
  - Padding: Desktop `clamp(4.5rem, 8vw, 7.5rem) 1.5rem clamp(5rem, 9vw, 8.5rem) 1.5rem` · Tablet `4rem 1.5rem 5rem 1.5rem` · Mobile `3rem 1rem 4rem 1rem`
- **Style:**
  - Background Type: Gradient
  - First Color: `#181A61` (Deep Space Indigo)
  - Second Color: `#5356D6` (Royal Violet Flow)
  - Type: Linear
  - Angle: `190deg`
- **Advanced:**
  - CSS ID: `section-ai-advantage-moment`
  - CSS Classes: `new-home-section fo-ai-moment-section`

### 4.2 Left Column — Inspected Cockpit Object Container (`.fo-ai-moment__invoice-card`)
- **Container Settings:**
  - Width: Desktop `390px` · Tablet `100%` (Max `520px` centered) · Mobile `100%`
  - Background: `#090E20` (Dark Space Navy)
  - Border: Solid `1px`, Color `rgba(5, 199, 242, 0.35)`
  - Border Radius: `16px`
  - Box Shadow: `0px 24px 50px rgba(0, 0, 0, 0.55), inset 0px 1px 0px rgba(255, 255, 255, 0.18)`
  - Padding: `1.85rem` (approx `30px`)
  - Position: Sticky (`top: 130px`) on Desktop; Relative on Tablet & Mobile.
- **Child Widgets & Controls:**
  1. **Top Header Container (`.fo-ai-moment__invoice-header`):**
     - Left Item: Heading widget (`h4`), Text: `INSPECTED OBJECT`, Typography: `JetBrains Mono` / `fo-mono-secondary`, Size: `11px`, Weight: `700`, Color: `#38BDF8`, Letter Spacing: `0.1em`.
     - Right Item: Icon Box or Inner Flex, Icon: Circle (dot `6px`, Color `#05C7F2`), Title: `AI TELEMETRY`, Color: `#38BDF8`, Size: `10.5px`, Weight: `700`.
  2. **Payload Container (`.fo-ai-moment__invoice-payload`):**
     - Ref Heading (`h3`): Text: `INV-10482`, Typography: `Lorin` / Sans-serif, Size: `26px`, Weight: `800`, Color: `#FFFFFF`.
     - Amount Heading (`h4`): Text: `₹5,90,000`, Typography: `Lorin`, Size: `22px`, Weight: `700`, Color: `#05C7F2`.
     - Client Text: Text Editor widget, Content: `Ananya Enterprises · GSTIN 36AABCA1234F1Z5`, Typography: `Lorin`, Size: `13px`, Color: `rgba(255, 255, 255, 0.75)`.
  3. **Telemetry Facts Grid (`.fo-ai-moment__invoice-telemetry`):**
     - 3 Inner Flex columns, each with:
       - Label: Text widget, Uppercase, Size: `10px`, Weight: `700`, Color: `#94A3B8`.
       - Value: Heading widget, Size: `13px`, Weight: `700`, Color: `#FFFFFF` (verified item colored `#38BDF8`).
  4. **Active State Tag Banner (`.fo-ai-moment__invoice-tag`):**
     - Inner Container, Background: `rgba(15, 23, 42, 0.8)`, Border: `1px solid rgba(5, 199, 242, 0.3)`, Border Radius: `8px`, Padding: `8px 12px`.
     - Icon: 6px Cyan Beacon.
     - Text: `01 · BUSINESS SIGNAL CAPTURED` (or dynamic state text), Font Size: `11.5px`, Color: `#E2E8F0`.

### 4.3 Center Conduit Bridge (`.fo-ai-moment__connector-col`)
- **Desktop Settings (> 1024px):**
  - Width: `70px`
  - Alignment: Center
  - SVG Container: `70px x 180px`, sticky at `top: 260px`.
  - Path: `M 0 90 C 35 90, 35 90, 70 90`
  - Stroke: Linear Gradient `#05C7F2` ➔ `#0055FF` ➔ `#05C7F2`, Width `2.5px`, Filter: `drop-shadow(0 0 6px #05C7F2)`.
  - Pulse: Moving 4.5px circle bead animating along the path.
- **Tablet & Mobile (≤ 1024px):**
  - Conduit Column is set to `Display: None` via Elementor Responsive visibility (or transforms into a clean vertical connector dot).

### 4.4 Right Column — Elementor Pro `nested-tabs` Widget
- **Tabs Component Settings:**
  - Orientation: Horizontal (Tabs on Top)
  - Tab Bar Container (`.fo-ai-moment__state-bar`):
    - Position: Sticky (`top: 130px` on Desktop, `top: 76px` on Mobile)
    - Background: `rgba(9, 14, 32, 0.94)`
    - Backdrop Filter: `blur(18px)`
    - Border: `1px solid rgba(255, 255, 255, 0.16)`
    - Border Radius: `14px`
    - Padding: `8px`
    - Box Shadow: `0 14px 34px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(5, 199, 242, 0.2)`
  - Tab Title Controls:
    - Normal State: Color `rgba(255, 255, 255, 0.65)`, Background `transparent`, Typography: `Lorin`, Size: `13px`, Weight: `600`.
    - Active State: Color `#FFFFFF`, Background: `linear-gradient(135deg, rgba(5, 199, 242, 0.22), rgba(0, 85, 255, 0.3))`, Border: `1px solid rgba(5, 199, 242, 0.6)`, Box Shadow: `0 0 16px rgba(5, 199, 242, 0.35)`.
    - Radius: `9px`, Padding: `12px 14px`.

### 4.5 Nested Tab Content Panels (`.fo-ai-moment__panel`)
Each of the 3 tabs contains an identical outer container styled as a dominant card:
- **Container Styling:**
  - Background: `#090E20`
  - Border: `1px solid rgba(5, 199, 242, 0.45)`
  - Border Radius: `20px`
  - Padding: Desktop `40px` · Tablet `32px` · Mobile `22px`
  - Box Shadow: `0 28px 65px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
  - Overflow: Hidden
- **Inside Each Panel:**
  1. **Header Row Container:**
     - Left Group: Icon (Lottie or SVG Spark `✦`), Size `24px` + Kicker Heading (`h4`), Uppercase, Size `12px`, Weight `700`, Color `#38BDF8`, Letter Spacing `0.1em`.
     - Right Group: Badge Pill, Background `rgba(5, 199, 242, 0.14)`, Border `1px solid rgba(5, 199, 242, 0.4)`, Color `#05C7F2`, Radius `9999px`, Padding `4px 10px`, Size `11px`, Weight `700`.
  2. **Card Headline (`h3`):**
     - Typography: `Lorin` / Display Sans, Size: Desktop `28px` · Tablet `24px` · Mobile `21px`, Weight `700`, Color `#FFFFFF`, Margin-bottom `16px`.
  3. **Focal Quote Box (`.fo-ai-moment__focal-box`):**
     - Container, Background: `linear-gradient(135deg, rgba(5, 199, 242, 0.12), rgba(0, 85, 255, 0.16))`, Border-Left: `3px solid #05C7F2`, Radius: `0 12px 12px 0`, Padding: `18px 22px`, Margin-bottom `24px`.
     - Text: Font Size `18px`, Weight `600`, Line Height `1.5`, Color `#FFFFFF`, Italic or Quotes.
  4. **Narrative Paragraph:**
     - Text Editor widget, Font Size: `15.5px`, Line Height `1.65`, Color `rgba(255, 255, 255, 0.85)`, Margin-bottom `28px`.
  5. **(Tab 3 Only) Strategic Interventions Card (`.fo-ai-moment__options-card`):**
     - Container, Background `rgba(15, 23, 42, 0.55)`, Border `1px solid rgba(255, 255, 255, 0.1)`, Radius `14px`, Padding `20px`.
     - Title: `STRATEGIC INTERVENTIONS TO CONSIDER`, Size `11.5px`, Weight `700`, Color `#38BDF8`.
     - Icon List widget with 2 items:
       - Item 1: Icon `✦` (Cyan), Text: `Option A: Trigger prompt-settlement outreach with a 1.25% early rebate (< 48h recovery)`
       - Item 2: Icon `✦` (Cyan), Text: `Option B: Route invoice into TReDS discounting to advance ₹5.82L into active cash`
     - Button widget: Text: `Review Cash Timeline & Options →`, Background: `#0055FF`, Radius `9px`, Padding: `10px 22px`, Weight `700`.
  6. **3-Column Facts Grid (`.fo-ai-moment__facts-grid`):**
     - Inner Container set to 3 columns on Desktop/Tablet, 1 column on Mobile. Gap: `14px`.
     - Each card: Background `rgba(15, 23, 42, 0.65)`, Border `1px solid rgba(255, 255, 255, 0.08)`, Radius `12px`, Padding `16px`.
     - Label: Text widget, Size `10.5px`, Weight `700`, Color `#94A3B8`, Uppercase, Letter Spacing `0.08em`.
     - Value: Heading widget, Size `15px`, Weight `700`, Color `#FFFFFF` (accent item colored `#05C7F2`).
  7. **Governance Baseline Footer:**
     - Flex container with top border `1px solid rgba(255, 255, 255, 0.08)`, Padding-top `18px`.
     - Left: Shield Icon `🛡` + Text: `Operator Governance · Grounded in Transaction TXN-10482 Context` (Size `12px`, Color `rgba(255, 255, 255, 0.65)`).
     - Right: Badge Pill: `Human-in-the-Loop · No Autonomous Execution` (Size `11px`, Color `#38BDF8`, Weight `700`).

---

## 5. RESPONSIVE BREAKPOINT SPECIFICATIONS

### 5.1 Desktop Layout (> 1024px)
- **Grid / Flex Layout:** 3-column asymmetric layout: `390px` (Invoice Object) + `70px` (Conduit) + `1fr` (Panel).
- **Sticky Anchoring:** Left column sticky at `top: 130px`; Stage switcher bar sticky at `top: 130px`.
- **Conduit Bridge:** Visible with active SVG pulse bead.
- **Facts Grid:** 3 equal horizontal columns (`repeat(3, 1fr)`).

### 5.2 Tablet Layout (769px – 1024px)
- **Grid / Flex Layout:** Single-column stacked layout (`grid-template-columns: 1fr`).
- **Invoice Card:** Sticky positioning released (`position: relative; top: 0;`). Max-width constrained to `520px` and centered with `margin: 0 auto 2rem auto`.
- **Conduit Bridge:** Hidden (`display: none;`).
- **Stage Switcher Bar:** Sticky at `top: 76px` (clearing mobile/tablet sticky header).
- **Facts Grid:** Maintains 3 columns or cleanly shifts to 2+1 grid with touch-friendly spacing.
- **Section Padding:** Reduced to `4rem 1.5rem 5rem 1.5rem`.

### 5.3 Mobile Layout (≤ 768px)
- **Grid / Flex Layout:** 100% single-stream vertical stack.
- **Invoice Card:** Full width (`100%`), padding `1.25rem`.
  - Ref title font: `22px`.
  - Amount font: `18px`.
  - Telemetry facts: 3 compact columns.
- **Stage Switcher Bar:** Sticky at `top: 70px`. Tab buttons horizontally scrollable or 3 compact equal pills (`gap: 6px`).
- **Facts Grid:** Stacks into 1 single column (`grid-template-columns: 1fr; gap: 10px;`). Each fact card is full width.
- **Headline & Copy:** Headline `28px - 32px`, Lead copy `14px`, Focal quote `16px`.
- **Padding:** Section padding `3rem 1rem 4rem 1rem`.

---

## 6. SCOPED CSS & POLISH PACK (FOR SITE SETTINGS / CUSTOM CSS)

Paste the following scoped CSS into the Section's **Custom CSS** field (or the child theme's `style.css`). This provides the tech corner accents, glowing borders, beacons, and sticky transitions without bloating the Elementor HTML.

```css
/* ==========================================================================
   Section 05 — The Intelligence Moment (Elementor Scoped CSS)
   Target: #section-ai-advantage-moment
   ========================================================================== */

#section-ai-advantage-moment {
  position: relative;
  background-image: linear-gradient(190deg, #181A61 0%, #5356D6 100%);
  color: #FFFFFF;
  isolation: isolate;
  overflow: clip;
}

/* Container Constrain */
#section-ai-advantage-moment .fo-ai-moment__container {
  max-width: 1240px;
  margin: 0 auto;
}

/* Pulsing AI Beacons */
.fo-ai-moment__beacon,
.fo-ai-moment__status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #05C7F2;
  box-shadow: 0 0 8px #05C7F2;
  display: inline-block;
  animation: foAiMomentPulse 2.2s infinite ease-in-out;
}

@keyframes foAiMomentPulse {
  0%, 100% { opacity: 0.6; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1.15); }
}

/* Cockpit Tech Corner Accents */
.fo-ai-moment__invoice-card {
  position: relative;
  background: #090E20;
  border: 1px solid rgba(5, 199, 242, 0.35);
  border-radius: 16px;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.fo-ai-moment__invoice-card::before,
.fo-ai-moment__invoice-card::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #05C7F2;
  border-style: solid;
  pointer-events: none;
}

.fo-ai-moment__invoice-card::before {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
  border-top-left-radius: 16px;
}

.fo-ai-moment__invoice-card::after {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
  border-bottom-right-radius: 16px;
}

/* Right Edge Port Indicator */
.fo-ai-moment__invoice-port {
  position: absolute;
  right: -7px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #090E20;
  border: 2px solid #05C7F2;
  box-shadow: 0 0 10px rgba(5, 199, 242, 0.8);
  z-index: 10;
}

/* Dominant Panel Inlet Port & Glow */
.fo-ai-moment__panel {
  position: relative;
  background: #090E20;
  border: 1px solid rgba(5, 199, 242, 0.45);
  border-radius: 20px;
  box-shadow: 0 28px 65px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.fo-ai-moment__panel-port {
  position: absolute;
  left: -7px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #090E20;
  border: 2px solid #05C7F2;
  box-shadow: 0 0 10px rgba(5, 199, 242, 0.8);
  z-index: 10;
}

/* Ambient Radial Top-Right Corner Glow */
.fo-ai-moment__panel::after {
  content: "";
  position: absolute;
  top: -80px;
  right: -80px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(5, 199, 242, 0.25) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Focal Quote Box */
.fo-ai-moment__focal-box {
  background: linear-gradient(135deg, rgba(5, 199, 242, 0.12), rgba(0, 85, 255, 0.16));
  border-left: 3px solid #05C7F2;
  border-radius: 0 12px 12px 0;
  padding: 1.15rem 1.35rem;
}

/* Strategic Options Card */
.fo-ai-moment__options-card {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 1.25rem;
}

/* Primary Action CTA Button */
.fo-ai-moment__action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.35rem;
  border-radius: 9px;
  background: #0055FF;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.22s ease;
  box-shadow: 0 4px 14px rgba(0, 85, 255, 0.4);
}

.fo-ai-moment__action-btn:hover {
  background: #1A68FF;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 85, 255, 0.55);
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .fo-ai-moment__invoice-port,
  .fo-ai-moment__panel-port,
  .fo-ai-moment__connector-col {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fo-ai-moment__beacon,
  .fo-ai-moment__status-dot {
    animation: none !important;
  }
}
```

---

## 7. STEP-BY-STEP ELEMENTOR MCP IMPLEMENTATION SEQUENCE

Follow this deterministic sequence to build the section via Elementor MCP tools or visual editor:

### Step 1: Create the Main Section Container
1. Call `elementor-manage-elements` / `create-container` to add a root Flexbox Container.
2. Set CSS ID: `section-ai-advantage-moment`.
3. Set Background: Gradient `linear-gradient(190deg, #181A61 0%, #5356D6 100%)`.
4. Insert Top and Bottom SVG wave dividers matching `#F8FAFC` and `#FAFBFD`.

### Step 2: Build the Editorial Section Header
1. Add an inner container `.fo-ai-moment__header` (Max width: `760px`).
2. Add Eyebrow Pill: Heading/Icon box (`✦ AI ADVANTAGE · THE INTELLIGENCE MOMENT →`).
3. Add Display Headline (`h2`): `AI that understands the whole business.` (Bebas Neue, uppercase).
4. Add Sub-Lead (`p`): `From transaction details to predicted outcomes, flowOne AI connects the signals that help teams decide what happens next.`

### Step 3: Create the 2-Column Balanced Workspace
1. Insert a 3-column Flex container `.fo-ai-moment__workspace`:
   - Column 1 (Left): `390px` width.
   - Column 2 (Center): `70px` width (Desktop only).
   - Column 3 (Right): `1fr` flex-grow.

### Step 4: Populate the Left Cockpit Card (INV-10482)
1. Add inner container `.fo-ai-moment__invoice-card` with class `is-moment-active`.
2. Add Header Row: Kicker `INSPECTED OBJECT` + Status `AI TELEMETRY` with green/cyan dot.
3. Add Payload: Ref `INV-10482`, Amount `₹5,90,000`, Client `Ananya Enterprises · GSTIN 36AABCA1234F1Z5`.
4. Add Telemetry Grid (3 columns):
   - Schema: `99.8%`
   - IRN Status: `Verified`
   - Confidence: `92.0%`
5. Add Active State Banner Pill: Beacon + `01 · BUSINESS SIGNAL CAPTURED`.

### Step 5: Insert the Center SVG Conduit
1. In Column 2, insert the 70px Conduit SVG with the dashed base path, cyan/blue luminous stroke, and animated circle pulse bead.
2. In Elementor Responsive Settings, hide Column 2 on Tablet and Mobile.

### Step 6: Configure the Right Stage Switcher (`nested-tabs`)
1. Insert the Elementor Pro **Tabs** widget (`nested-tabs`).
2. Configure 3 Tabs:
   - Tab 1: `01 Signal`
   - Tab 2: `02 Insight`
   - Tab 3: `03 Action`
3. Style the Tab header bar with glassmorphic navy (`rgba(9, 14, 32, 0.94)`), blur `18px`, and active cyan glow.

### Step 7: Populate the 3 Stage Containers
1. **In Tab 1 Container:**
   - Kicker: `BUSINESS SIGNAL` + Badge: `TRANSACTION CONTEXT`
   - Title: `One transaction. More context.`
   - Focal Quote: `“Every transaction carries information beyond its face value.”`
   - Narrative: Net 30 terms, IRN tax verification, ledger signals.
   - Facts Grid: `INV-10482 · Confirmed`, `Day +30 · 28 Jun 2026`, `IRN Verified · NIC Cleared`.
   - Governance baseline footer.
2. **In Tab 2 Container:**
   - Kicker: `AI INSIGHT` + Badge: `PREDICTIVE SIGNAL`
   - Title: `Understand what happens next.`
   - Focal Quote: `“A change in payment behaviour may affect when expected cash becomes available.”`
   - Narrative: 15-day collection drift, Day +45 settlement projection.
   - Facts Grid: `92% Probability at Day +45`, `+15 Days past terms`, `Day +38 Vendor Run`.
   - Governance baseline footer.
3. **In Tab 3 Container:**
   - Kicker: `DECISION TO CONSIDER` + Badge: `GOVERNANCE READY`
   - Title: `Turn understanding into action.`
   - Focal Quote: `“Review upcoming cash commitments against the expected collection timeline.”`
   - Narrative: Working-capital shortfall synthesis and two proactive decisions.
   - Options Card: Option A (prompt rebate) + Option B (TReDS discounting) + CTA Button `Review Cash Timeline & Options →`.
   - Facts Grid: `Prioritize Collection Outreach`, `₹7,375 (or advance ₹5.82L)`, `Requires Operator Approval`.
   - Governance baseline footer.

### Step 8: Apply Scoped CSS & Mobile Tuning
1. Paste the scoped CSS block from Section 6 into the section's Custom CSS tab.
2. Switch to Tablet View (1024px) in Elementor responsive mode: verify left card un-sticks, centers to `520px`, and conduit disappears.
3. Switch to Mobile View (375px–768px): verify facts grid stacks to 1 column, tab pills scroll smoothly, and font sizes fit without horizontal overflow.

---

## 8. QA VALIDATION CHECKLIST

- [ ] **No Raw HTML Monoliths:** All texts, numbers, and badges are separate Elementor widgets editable in the Elementor panel.
- [ ] **Brand Font Conformance:** Headlines use `Bebas Neue` uppercase; body text uses `Lorin`; telemetry metrics and GSTIN codes use `JetBrains Mono` (`fo-mono-secondary`).
- [ ] **WCAG AAA Contrast:** All white and cyan text on `#090E20` cards exceeds the `7:1` contrast ratio requirement.
- [ ] **Tab Keyboard Navigation:** Tab headers support keyboard focus (`Tab`), selection (`Enter` / `Space`), and arrow key navigation (`role="tablist"`).
- [ ] **Screen Reader Accessibility:** Inspected Object card has `aria-label="Anchored Transaction: INV-10482"`; Stage panel has `aria-live="polite"`.
- [ ] **Zero Horizontal Scrollbar:** Tested at 320px, 375px, 768px, 1024px, 1440px viewport widths with 0px horizontal overflow.
- [ ] **Background Transition Blending:** Top wave divider blends into `#F8FAFC`; bottom wave divider blends into `#FAFBFD`.

---

## 9. OUTSTANDING DECISIONS & DEPENDENCIES

1. **Lottie vs SVG for Stage Icon:** The React version uses `AIStageLottieIcon.tsx` loading `/assets/lottie/ai-loader.json`. In Elementor Pro, this can be implemented using the native **Lottie** widget by uploading `ai-loader.json` to the Media Library, or with an SVG Spark Icon `✦`.
2. **Auto-Scroll State Progression vs Manual Click:** In the React prototype, scrolling down automatically advances the stage from 01 to 02 to 03. In WordPress, standard user testing recommends allowing normal tab clicks for predictable navigation, with an optional Intersection Observer snippet if auto-advance on scroll is desired.
3. **Action Button Confirmation:** On the React prototype, clicking `Review Cash Timeline & Options →` transforms into `✓ Decision Acknowledged · Logged to Treasury Flow`. In WordPress, this can be linked to a Calendly modal, a lead form, or a lightweight interactive micro-script.

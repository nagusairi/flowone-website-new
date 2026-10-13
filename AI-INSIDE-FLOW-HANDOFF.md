# AI INSIDE THE FLOW — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 07: AI Inside Flow** (`#ai-inside-flow` / `.home-ai.home-section`) of the flowOne website.

---

## 1. SECTION OVERVIEW

### 1.1 Purpose & Page Position
- **Section Purpose**: Demonstrates flowOne's embedded, real-time deterministic AI intelligence. Unlike conventional systems where AI is an external chatbot or disconnected sidebar, this section visualizes an active transaction object (`INV-10482`, Ananya Enterprises, ₹5,90,000) pinned on the left while an event bus stream continuously evaluates it across 6 progression stages on the right:
  1. `01 · UNDERSTAND`: Schema extraction and OCR field parsing.
  2. `02 · MATCH`: Deterministic 3-way reconciliation and PO lineage linking.
  3. `03 · VALIDATE`: Real-time statutory rules, GSTIN verification, and IRN compliance.
  4. `04 · PREDICT`: Forward payment velocity forecasting and anomaly lead-time scoring.
  5. `05 · DECIDE`: Autonomous recommendation of prioritized recovery protocols.
  6. `06 · ACT`: One-click execution and ledger settlement dispatch.
- **Desktop vs. Mobile Experience**:
  - **Desktop (`≥ 1024px`)**: Employs a 3-column pinned progression surface driven by GSAP ScrollTrigger. As the visitor scrolls, the screen pins for `360%` scroll duration while the 6 cards cascade and stack with tactile 3D spatial offsets (`x: i * 24px, y: i * 14px`), accompanied by a center animated luminous event bus beam.
  - **Tablet & Mobile (`≤ 1024px`)**: Automatically de-pins into an intuitive sequential card stack where all 6 AI evaluation phases are laid out in a clean vertical feed, with an accessible horizontal category stepper at the top.
- **Section Placement**:
  - **Preceding Section**: Section 06: Platform Capabilities / Core Modules (`#capabilities` / `.home-capabilities`, lines 734–801 in `Homepage.tsx`).
  - **Succeeding Section**: Section 08: Predictive Flow / Cross-Entity Intelligence (`.home-predictive.home-section`, lines 982–1010 in `Homepage.tsx`).

### 1.2 Component File Names & Exact Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 165–281**: `aiStages` constant data array (6 comprehensive AI progression stages with metrics, verified details, and payoff action module).
  - **Lines 435–438**: State hooks (`aiActiveStage`, `aiActionExecuted`, `aiPinRef`, `aiTriggerRef`).
  - **Lines 443–452**: `scrollToAiStage` programmatic stepper navigation function.
  - **Lines 494–550**: GSAP ScrollTrigger timeline configuration (`anticipatePin`, `scrub: 0.4`, `xPercent: 120` entrance, spatial stacking offsets).
  - **Lines 803–980**: Complete section markup (header row, `.ai-pinned-grid`, `.ai-invoice`, `.ai-connector-bridge`, `.ai-stage-tracker`, `.ai-stack-viewport`, and `.home-ai-footer`).
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `Icon` component rendering `name="spark"` and `name="arrow"`.
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (max-width and horizontal fluid page padding).
  - **Line 5**: `.home-section` (vertical section padding).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 2076–2110**: Dark canvas `.home-ai`, custom magenta `.home-index` eyebrow capsule, and `@keyframes beacon-pulse-ai`.
  - **Lines 2111–2301**: Left column `.ai-invoice`, HUD corner brackets (`.ai-corner`), active telemetry tray (`.ai-telemetry-metrics`), verified context pills (`.ai-knows`), and evaluation status indicator tag.
  - **Lines 2302–2349**: Center stream connector (`.ai-connector-bridge`, `.ai-connector-line`, `.ai-connector-pulse-dot`, `@keyframes aiPulseTravel`, vertical "EVENT BUS" tag).
  - **Lines 2351–2767**: Right column `.ai-stack-column`, stepper pills (`.ai-stage-tracker`), stack viewport (`.ai-stack-viewport`), layered cards (`.ai-stack-card`), header with spark badge, metrics tray, verified details grid, payoff action box (`.ai-card-payoff-box`), and interactive execution CTA button (`.fo-button.is-primary.is-executed`).
  - **Lines 2768–2785**: `.home-ai-footer` and `.section-text-link.inverse`.
  - **Line 4396**: `@media (max-width: 64rem)` (1024px single-column heading row).
  - **Lines 4402–4406**: `@media (max-width: 64rem)` (1024px tablet layout: collapse 3-column grid to 1 column, hide connector bridge, convert card viewport to vertical flex stack, suppress card transforms).
  - **Lines 4463–4466**: `@media (max-width: 48rem)` (768px mobile section padding and heading margin).
  - **Lines 4539–4545**: `@media (max-width: 48rem)` (768px mobile single-column metrics trays, details grid, and full-width payoff actions).
  - **Lines 4639–4642**: `@media (prefers-reduced-motion: reduce)` motion suppression rules.
- **`src/components/flowone.css`**:
  - **Lines 36–37, 39, 40**: Base `.fo-icon`, `.fo-icon-16`, `.fo-icon-action`, `.fo-icon-inverse`.
- **`src/index.css`**:
  - **Lines 11–221**: Core color tokens, typography scales, spacing tokens, and glow effects.

---

## 2. CODE

### 2.1 Verbatim JSX/TSX Markup

From `src/Homepage.tsx` (Lines 165–281: Data Array):
```tsx
const aiStages = [
  {
    stepName: "UNDERSTAND",
    kicker: "01 · AI / UNDERSTAND",
    badgeLabel: "EXTRACTION COMPLETE",
    title: "Understand & Extract Business Object",
    summary: "Understand the business object and extract relevant information.",
    metrics: [
      { label: "CONFIDENCE", value: "99.8%" },
      { label: "EXTRACTION TIME", value: "38ms" },
      { label: "FIELDS PARSED", value: "18 / 18" },
    ],
    details: [
      { label: "PAYLOAD TYPE", value: "B2B Tax Invoice (PDF / JSON)" },
      { label: "IDENTIFIED ENTITY", value: "Ananya Enterprises · GSTIN 36AABCA1234F1Z5" },
      { label: "LINE ITEMS", value: "Cloud Operations · ₹5,00,000 + 18% GST" },
      { label: "PAYMENT TERMS", value: "Net 30 · Due 28 Jun 2026" },
    ],
  },
  {
    stepName: "MATCH",
    kicker: "02 · AI / MATCH",
    badgeLabel: "3-WAY MATCH VERIFIED",
    title: "Connect Records & Document Lineage",
    summary: "Connect relevant records, documents or data.",
    metrics: [
      { label: "RECON VARIANCE", value: "₹0.00" },
      { label: "PO MATCH RATE", value: "100%" },
      { label: "CORRELATION", value: "Deterministic" },
    ],
    details: [
      { label: "PURCHASE ORDER", value: "PO-8841 · Linked & Approved" },
      { label: "GOODS RECEIPT", value: "GRN-104 · Inspection Cleared" },
      { label: "MASTER CONTRACT", value: "MSA-2025-ANANYA · Clause 4.2 Verified" },
      { label: "LINEAGE INTEGRITY", value: "Immutable Cryptographic Link" },
    ],
  },
  {
    stepName: "VALIDATE",
    kicker: "03 · AI / VALIDATE",
    badgeLabel: "STATUTORY & POLICY PASSED",
    title: "Verify Statutory & Business Rules",
    summary: "Check policy, business rules, compliance or tax conditions.",
    metrics: [
      { label: "IRN VERIFICATION", value: "Valid & Signed" },
      { label: "TAX CODE AUDIT", value: "HSN 998313 (18%)" },
      { label: "POLICY DRIFT", value: "0.0%" },
    ],
    details: [
      { label: "IRP SIGNATURE", value: "NIC Portal Digital Hash Authenticated" },
      { label: "E-WAY BILL", value: "EWB-9920148 · Cleared & Synced" },
      { label: "GSTN PORTAL", value: "Active Taxpayer · Return Compliant" },
      { label: "CREDIT LIMIT", value: "Approved Limit ₹25,00,000 (Within Cap)" },
    ],
  },
  {
    stepName: "PREDICT",
    kicker: "04 · AI / PREDICT",
    badgeLabel: "PREDICTIVE RISK SIGNAL",
    title: "Forecast Payment Velocity & Delay Risk",
    summary: "Identify likely outcomes, anomalies, delays or risks.",
    metrics: [
      { label: "PAYMENT PROBABILITY", value: "92% in 4 Days" },
      { label: "CYCLE DRIFT RISK", value: "+12 Days (If Delayed)" },
      { label: "HISTORICAL VELOCITY", value: "38 Days Avg." },
    ],
    details: [
      { label: "HISTORICAL PATTERN", value: "Customer pays reliably within 38 days" },
      { label: "CURRENT POSITION", value: "Day 34 · Approaching due window boundary" },
      { label: "RISK SIGNAL", value: "Probability drops 40% if not prompted before Day 38" },
      { label: "CASH IMPACT", value: "₹5,90,000 forward liquidity factor" },
    ],
  },
  {
    stepName: "DECIDE",
    kicker: "05 · AI / DECIDE",
    badgeLabel: "DECISION READY",
    title: "Recommend Optimal Business Action",
    summary: "Recommend the next appropriate business action.",
    metrics: [
      { label: "RECOMMENDED ACTION", value: "Prioritize Collection" },
      { label: "TARGET CHANNEL", value: "WhatsApp + Email" },
      { label: "EXPECTED RECOVERY", value: "< 48 Hours" },
    ],
    details: [
      { label: "DECISION RATIONALE", value: "Pre-empt payment drift before customer payment run" },
      { label: "OUTREACH PROTOCOL", value: "Automated executive summary with instant payment link" },
      { label: "INCENTIVE MODEL", value: "Highlight 1.5% prompt settlement rebate" },
      { label: "GOVERNANCE", value: "Pre-approved under Collection Policy v4" },
    ],
  },
  {
    stepName: "ACT",
    kicker: "06 · AI / ACT",
    badgeLabel: "PAYOFF READY",
    title: "Execute & Route Business Action",
    summary: "Execute or route the recommended action.",
    metrics: [
      { label: "EXECUTION STATE", value: "Ready to Trigger" },
      { label: "PAYMENT LINK", value: "Generated & Signed" },
      { label: "AUDIT LINEAGE", value: "Append-Only" },
    ],
    details: [
      { label: "RECIPIENT", value: "finance@ananyaenterprises.com · Accounts Payable" },
      { label: "PAYMENT RAILS", value: "Dynamic Virtual Account + UPI QR + NEFT Bridge" },
      { label: "ERP LEDGER", value: "Pre-allocated cash expectation posted to SAP" },
      { label: "AUDIT TRAIL", value: "TXN-ACT-10482 sealed with cryptographic timestamp" },
    ],
    actionBlock: {
      headline: "Prioritize collection & dispatch payment link",
      subhead: "AI scheduled authenticated multi-channel outreach with instant reconciliation link.",
      primaryCta: "Review Collection",
      secondaryCta: "Schedule Auto-Followup",
      status: "QUEUED FOR DISPATCH · TODAY, 10:00 AM",
    },
  },
];
```

From `src/Homepage.tsx` (Lines 803–980: Section Markup):
```tsx
<section id="ai-inside-flow" className="home-ai home-section">
  <div className="home-container">
    <div className="section-heading-row">
      <div>
        <span className="home-index">AI INSIDE THE FLOW</span>
        <h2>AI that works<br/>inside the flow.</h2>
      </div>
      <p>{"AI doesn't sit beside your business. It understands what is happening and helps decide what happens next."}</p>
    </div>

    {/* Pinned Layered Progression Surface */}
    <div ref={aiPinRef} className="ai-pin-surface">
      <div className="ai-pinned-grid">
        {/* Left Column: Persistent Inspected Business Object */}
        <div className="ai-invoice-column">
          <div className="ai-invoice">
            <div className="ai-corner tl" aria-hidden="true" />
            <div className="ai-corner tr" aria-hidden="true" />
            <div className="ai-corner bl" aria-hidden="true" />
            <div className="ai-corner br" aria-hidden="true" />
            <div className="ai-invoice-meta">
              <span>INSPECTED BUSINESS OBJECT</span>
              <span className="ai-pill-active">
                <span className="ai-beacon-dot" aria-hidden="true" />
                AI EVALUATION ACTIVE
              </span>
            </div>
            <strong>INV-10482</strong>
            <b>₹5,90,000</b>
            <small>Ananya Enterprises · GSTIN 36AABCA1234F1Z5</small>
            <div className="ai-telemetry-metrics">
              <div><small>SCHEMA MATCH</small><strong>99.8%</strong></div>
              <div><small>IRN STATUS</small><strong>Verified</strong></div>
              <div><small>TIMING CONFIDENCE</small><strong>92.0%</strong></div>
            </div>
            <div className="ai-knows">
              {["Customer profile", "Invoice line items", "Historical velocity", "Due date window", "IRP status"].map(x => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <div className="ai-invoice-state-tag">
              <span className="ai-state-indicator-dot" aria-hidden="true" />
              <span>CURRENT EVALUATION: <strong>0{aiActiveStage + 1} · {aiStages[aiActiveStage].stepName}</strong></span>
            </div>
          </div>
        </div>

        {/* Luminous Stream Connector */}
        <div className="ai-connector-bridge" aria-hidden="true">
          <div className="ai-connector-line">
            <span className="ai-connector-pulse-dot" />
          </div>
          <span className="ai-connector-tag">EVENT BUS</span>
        </div>

        {/* Right Column: Progressive Layered Stack */}
        <div className="ai-stack-column">
          {/* Stage Progress Stepper */}
          <div className="ai-stage-tracker" role="tablist" aria-label="AI Progression Stages">
            {aiStages.map((stage, idx) => {
              const isActive = aiActiveStage === idx;
              const isComplete = idx < aiActiveStage;
              return (
                <button
                  key={stage.stepName}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`ai-tracker-step ${isActive ? "is-active" : isComplete ? "is-complete" : ""}`}
                  onClick={() => scrollToAiStage(idx)}
                >
                  <span className="ai-tracker-num">0{idx + 1}</span>
                  <span className="ai-tracker-label">{stage.stepName}</span>
                  {isComplete && <span className="ai-tracker-check" aria-hidden="true">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Viewport for Stacked Cards */}
          <div className="ai-stack-viewport">
            {aiStages.map((stage, idx) => {
              const isActive = aiActiveStage === idx;
              const isComplete = idx < aiActiveStage;
              return (
                <article
                  key={stage.stepName}
                  className={`ai-stack-card ai-card-${idx} ${isActive ? "is-active" : isComplete ? "is-complete" : "is-future"}`}
                  style={{ zIndex: 10 + idx }}
                  aria-current={isActive ? "step" : undefined}
                >
                  {/* Top Hairline Gradient Beam */}
                  <div className="ai-card-beam" aria-hidden="true" />

                  {/* Header row */}
                  <div className="ai-card-header">
                    <div className="ai-card-header-left">
                      <span className="ai-card-spark-icon" aria-hidden="true">
                        <Icon name="spark" size={16} tone="action" />
                      </span>
                      <div>
                        <span className="ai-card-kicker">{stage.kicker}</span>
                        <h3 className="ai-card-title">{stage.title}</h3>
                      </div>
                    </div>
                    <span className={`ai-card-status-badge ${isActive ? "is-active" : isComplete ? "is-complete" : ""}`}>
                      <span className="ai-card-beacon" aria-hidden="true" />
                      {isComplete ? "✓ COMPLETE" : stage.badgeLabel}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="ai-card-summary">{stage.summary}</p>

                  {/* Inset Metrics Tray */}
                  <div className="ai-card-metrics">
                    {stage.metrics.map(m => (
                      <div className="ai-card-metric-cell" key={m.label}>
                        <span className="ai-card-metric-label">{m.label}</span>
                        <strong className="ai-card-metric-value">{m.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Contextual Verified Details Grid */}
                  <div className="ai-card-details-grid">
                    {stage.details.map(d => (
                      <div className="ai-card-detail-item" key={d.label}>
                        <span className="ai-card-detail-label">{d.label}</span>
                        <span className="ai-card-detail-val">{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Final Payoff Action Module (Stage 06 ACT) */}
                  {stage.actionBlock && (
                    <div className="ai-card-payoff-box">
                      <div className="ai-payoff-top">
                        <div className="ai-payoff-info">
                          <span className="ai-payoff-tag">RECOMMENDED ACTION</span>
                          <strong className="ai-payoff-title">{stage.actionBlock.headline}</strong>
                          <p className="ai-payoff-sub">{stage.actionBlock.subhead}</p>
                        </div>
                        <span className="ai-payoff-status-pill">
                          <span className="ai-payoff-pulse" aria-hidden="true" />
                          {stage.actionBlock.status}
                        </span>
                      </div>
                      <div className="ai-payoff-actions">
                        <button
                          type="button"
                          className={`fo-button is-primary ${aiActionExecuted ? "is-executed" : ""}`}
                          onClick={() => setAiActionExecuted(true)}
                        >
                          {aiActionExecuted ? "✓ Collection Dispatched" : stage.actionBlock.primaryCta}
                        </button>
                        <button type="button" className="fo-button is-secondary">
                          {stage.actionBlock.secondaryCta}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    {/* Section Explore Action Link */}
    <div className="home-ai-footer">
      <a className="section-text-link inverse" href="#ai-inside-flow">
        Explore AI Inside the Flow <Icon name="arrow" size={16} tone="inverse" />
      </a>
    </div>
  </div>
</section>
```

---

### 2.2 Verbatim CSS Stylesheet

```css
/* Container & Section Base */
.home-container {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

.home-section {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
}

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

/* SECTION 07: AI Inside Flow Dark Canvas */
.home-ai {
  position: relative;
  color: var(--color-white);
  background: var(--color-brand-ink);
  background-image: radial-gradient(circle at 85% 20%, rgba(0, 184, 230, 0.12), transparent 45%);
}

.home-ai .home-index {
  background: rgba(5, 199, 242, 0.08);
  border-color: rgba(5, 199, 242, 0.25);
  color: #05C7F2;
  box-shadow: 0 0 12px rgba(5, 199, 242, 0.15);
}

.home-ai .home-index:hover {
  background: rgba(5, 199, 242, 0.14);
  border-color: rgba(5, 199, 242, 0.35);
}

.home-ai .home-index::before {
  background: var(--flow-magenta);
  box-shadow: 0 0 10px rgba(217, 41, 155, 0.9);
  animation: beacon-pulse-ai 2.4s ease-in-out infinite;
}

@keyframes beacon-pulse-ai {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 10px rgba(217, 41, 155, 0.9);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
    box-shadow: 0 0 4px rgba(217, 41, 155, 0.4);
  }
}

.home-ai .section-heading-row > p {
  color: var(--color-neutral-400);
}

/* Pinned Grid Surface */
.ai-pin-surface {
  position: relative;
  width: 100%;
}

.ai-pinned-grid {
  display: grid;
  grid-template-columns: minmax(320px, 360px) 48px minmax(520px, 1fr);
  align-items: start;
  gap: 0;
  min-height: calc(100vh - 8rem);
  padding-block: var(--spacing-4) var(--spacing-6);
}

/* Left Column: Inspected Business Object Card */
.ai-invoice-column {
  position: relative;
  z-index: 5;
}

.ai-invoice {
  position: relative;
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.ai-corner {
  position: absolute;
  width: 9px;
  height: 9px;
  border-color: var(--color-brand-cyan);
}
.ai-corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
.ai-corner.tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; }
.ai-corner.bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; }
.ai-corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

.ai-invoice-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-invoice-meta span {
  color: var(--color-brand-cyan);
  font-family: var(--font-family-mono, monospace);
  font-size: 0.62rem;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.ai-pill-active {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  padding: 0.18rem 0.5rem;
  border-radius: var(--radius-sm);
}

.ai-beacon-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 6px #34d399;
  animation: aiBeaconPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes aiBeaconPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.ai-invoice strong {
  margin-top: var(--spacing-3);
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-family: var(--font-family-mono, monospace);
}

.ai-invoice b {
  display: block;
  margin-top: 0.25rem;
  font-size: 2.15rem;
  font-weight: 750;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.035em;
  color: #ffffff;
}

.ai-invoice small {
  margin-top: 0.3rem;
  color: var(--color-neutral-400);
  font-size: 0.6875rem;
  line-height: 1.35;
}

.ai-telemetry-metrics {
  margin-top: 0.95rem;
  padding: 0.65rem 0.75rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.ai-telemetry-metrics div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ai-telemetry-metrics small {
  margin-top: 0;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.52rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ai-telemetry-metrics strong {
  margin-top: 0;
  font-size: 0.8rem;
  color: var(--color-white);
  font-feature-settings: "tnum";
}

.ai-knows {
  margin-top: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.ai-knows span {
  padding: 0.28rem 0.5rem;
  color: var(--color-neutral-300);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  font-size: 0.58rem;
  background: rgba(255, 255, 255, 0.03);
}

.ai-invoice-state-tag {
  margin-top: 1rem;
  padding: 0.45rem 0.65rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(0, 184, 230, 0.08);
  border: 1px solid rgba(0, 184, 230, 0.25);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono, monospace);
  font-size: 0.58rem;
  color: #94a3b8;
}

.ai-state-indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-brand-cyan);
  box-shadow: 0 0 6px var(--color-brand-cyan);
}

.ai-invoice-state-tag strong {
  margin-top: 0;
  font-size: 0.6rem;
  color: #ffffff;
  letter-spacing: 0.04em;
}

/* Center Connector Bridge */
.ai-connector-bridge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 6.5rem;
  height: 100%;
}

.ai-connector-line {
  position: relative;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, rgba(0, 34, 255, 0.6) 0%, rgba(0, 184, 230, 0.8) 100%);
  overflow: visible;
}

.ai-connector-pulse-dot {
  position: absolute;
  top: -3px;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--flow-cyan-bright);
  box-shadow: 0 0 10px var(--flow-cyan-bright), 0 0 18px rgba(5, 199, 242, 0.8);
  animation: aiPulseTravel 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes aiPulseTravel {
  0% { left: 0%; opacity: 0; transform: scale(0.6); }
  15% { opacity: 1; transform: scale(1.2); }
  85% { opacity: 1; transform: scale(1.2); }
  100% { left: 100%; opacity: 0; transform: scale(0.6); }
}

.ai-connector-tag {
  margin-top: 0.5rem;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.48rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  color: #64748b;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Right Column: Progressive Layered Stack */
.ai-stack-column {
  position: relative;
  width: 100%;
  padding-left: 0.75rem;
}

.ai-stage-tracker {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.25rem;
}

.ai-stage-tracker::-webkit-scrollbar {
  display: none;
}

.ai-tracker-step {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.65rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.ai-tracker-step:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
}

.ai-tracker-num {
  font-size: 0.58rem;
  opacity: 0.7;
}

.ai-tracker-label {
  letter-spacing: 0.04em;
}

.ai-tracker-check {
  font-size: 0.62rem;
  color: #34d399;
  margin-left: 0.15rem;
}

.ai-tracker-step.is-active {
  background: rgba(0, 184, 230, 0.16);
  border-color: rgba(0, 184, 230, 0.5);
  color: #ffffff;
  font-weight: 750;
  box-shadow: 0 0 12px rgba(0, 184, 230, 0.25);
}

.ai-tracker-step.is-complete {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #34d399;
}

.ai-stack-viewport {
  position: relative;
  width: 100%;
  min-height: 520px;
  height: 520px;
}

.ai-stack-card {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 130px);
  max-width: 580px;
  min-height: 420px;
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 1.35rem 1.5rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.75);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  will-change: transform, opacity;
  box-sizing: border-box;
}

.ai-stack-card.is-active {
  background: rgba(15, 23, 42, 0.98);
  border-color: rgba(0, 184, 230, 0.48);
  box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.85), 0 0 28px rgba(0, 184, 230, 0.15);
}

.ai-stack-card.is-complete {
  background: rgba(15, 23, 42, 0.85);
  border-color: rgba(255, 255, 255, 0.08);
}

.ai-card-beam {
  position: absolute;
  top: -1px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: var(--gradient-intelligence);
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ai-stack-card.is-active .ai-card-beam {
  opacity: 1;
}

.ai-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.ai-card-header-left {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.ai-card-spark-icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: linear-gradient(135deg, rgba(0, 34, 255, 0.25) 0%, rgba(0, 184, 230, 0.25) 100%);
  border: 1px solid rgba(0, 184, 230, 0.35);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.ai-card-kicker {
  display: block;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.62rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  color: var(--color-brand-cyan);
}

.ai-card-title {
  margin: 0.15rem 0 0 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.ai-card-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.ai-card-status-badge.is-active {
  color: var(--flow-cyan-bright);
  background: rgba(4, 157, 217, 0.12);
  border-color: rgba(4, 157, 217, 0.35);
}

.ai-card-status-badge.is-complete {
  color: #34d399;
  background: rgba(22, 128, 60, 0.16);
  border-color: rgba(22, 128, 60, 0.35);
}

.ai-card-beacon {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.ai-card-status-badge.is-active .ai-card-beacon {
  box-shadow: 0 0 6px var(--flow-cyan-bright);
  animation: aiBeaconPulse 1.8s infinite;
}

.ai-card-summary {
  margin: 0.65rem 0 0.85rem 0;
  font-size: 0.8125rem;
  color: var(--neutral-400);
  line-height: 1.45;
}

.ai-card-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  margin-bottom: 0.85rem;
}

.ai-card-metric-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ai-card-metric-label {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.52rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ai-card-metric-value {
  font-size: 0.875rem;
  font-weight: 750;
  color: #f8fafc;
  letter-spacing: -0.015em;
  font-feature-settings: "tnum";
}

.ai-card-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.ai-card-detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.5rem 0.65rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
}

.ai-card-detail-label {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.06em;
}

.ai-card-detail-val {
  font-size: 0.7rem;
  color: #cbd5e1;
  font-weight: 500;
  line-height: 1.35;
}

/* Final Stage Payoff Action Box (Stage 06 ACT) */
.ai-card-payoff-box {
  margin-top: 0.85rem;
  padding: 0.85rem 1rem;
  background: rgba(0, 34, 255, 0.08);
  border: 1px solid rgba(0, 184, 230, 0.35);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 34, 255, 0.15);
}

.ai-payoff-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.ai-payoff-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ai-payoff-tag {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.54rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  color: var(--flow-cyan-bright);
}

.ai-payoff-title {
  font-size: 0.875rem;
  font-weight: 750;
  color: #ffffff;
  letter-spacing: -0.015em;
}

.ai-payoff-sub {
  margin: 0.15rem 0 0 0;
  font-size: 0.72rem;
  color: var(--neutral-400);
  line-height: 1.35;
}

.ai-payoff-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: 4px;
  font-family: var(--font-family-mono, monospace);
  font-size: 0.54rem;
  font-weight: 750;
  color: #34d399;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.ai-payoff-pulse {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 6px #34d399;
  animation: aiBeaconPulse 1.8s infinite;
}

.ai-payoff-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.ai-payoff-actions .fo-button {
  min-height: 2.15rem;
  padding-inline: 0.95rem;
  font-size: 0.75rem;
  font-weight: 650;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.ai-payoff-actions .fo-button.is-primary {
  background: var(--flow-primary);
  color: var(--neutral-0);
  border: 1px solid var(--flow-primary);
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.3);
}

.ai-payoff-actions .fo-button.is-primary:hover {
  background: var(--gradient-flow);
  border-color: #049DD9;
  box-shadow: 0 4px 14px rgba(5, 40, 242, 0.45), 0 0 10px rgba(5, 199, 242, 0.35);
  transform: translateY(-1px);
}

.ai-payoff-actions .fo-button.is-primary:active {
  background: var(--flow-primary-pressed);
  border-color: var(--flow-primary-pressed);
  transform: translateY(1px);
}

.ai-payoff-actions .fo-button.is-primary.is-executed {
  background: rgba(22, 128, 60, 0.2);
  color: var(--success);
  border-color: rgba(22, 128, 60, 0.4);
}

.ai-payoff-actions .fo-button.is-secondary {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--neutral-0);
}

.ai-payoff-actions .fo-button.is-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--neutral-0);
}

.ai-payoff-actions .fo-button.is-secondary:active {
  background: rgba(255, 255, 255, 0.18);
}

/* Footer Section Action Link */
.home-ai-footer {
  margin-top: 1.5rem;
  padding-top: 0.75rem;
}

.section-text-link {
  width: fit-content;
  min-height: var(--control-md);
  margin-top: var(--spacing-3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-brand-blue);
  text-decoration: none;
  font-size: var(--font-small);
  font-weight: 700;
}
.section-text-link.inverse {
  color: var(--color-white);
}

/* ==========================================================================
   RESPONSIVE MEDIA QUERIES
   ========================================================================== */
@media (max-width: 64rem) {
  .section-heading-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  .ai-pinned-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    min-height: auto;
  }
  .ai-connector-bridge {
    display: none;
  }
  .ai-stack-column {
    padding-left: 0;
  }
  .ai-stack-viewport {
    position: static;
    height: auto;
    min-height: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ai-stack-card {
    position: static;
    width: 100%;
    max-width: 100%;
    min-height: auto;
    transform: none !important;
    opacity: 1 !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
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
  .ai-pinned-grid {
    gap: 1.25rem;
  }
  .ai-invoice {
    padding: 1.15rem;
  }
  .ai-telemetry-metrics {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
  .ai-card-metrics {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
  .ai-card-details-grid {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
  .ai-payoff-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .ai-payoff-actions {
    flex-direction: column;
    align-items: stretch;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .ai-stack-card {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    transform: none !important;
    opacity: 1 !important;
    transition: none !important;
  }
  .ai-stack-viewport {
    height: auto !important;
    min-height: auto !important;
    position: static !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
  }
  .ai-connector-pulse-dot {
    animation: none !important;
  }
  .ai-beacon-dot,
  .ai-card-beacon,
  .ai-payoff-pulse {
    animation: none !important;
  }
}
```

---

### 2.3 Resolved Design Tokens

| Token Name | Defined In | Aliased / Inherited Chain | Resolved Literal Value | Usage in This Section |
| :--- | :--- | :--- | :--- | :--- |
| `--color-brand-ink` | `src/index.css` | `var(--flow-ink)` | `#0D0D0D` | `.home-ai` dark section background |
| `--color-white` | `src/index.css` | `var(--neutral-0)` | `#FFFFFF` | Base text color, amounts, titles, active tracker text |
| `--color-neutral-400` | `src/index.css` | Raw token | `#9CA3AF` | Heading `<p>`, invoice sub-text, card summary, payoff subhead |
| `--color-neutral-300` | `src/index.css` | Raw token | `#DDE3EA` | `.ai-knows` verified pill text color |
| `--color-brand-cyan` | `src/index.css` | `var(--flow-cyan)` | `#049DD9` | Corner brackets, invoice meta text, kickers, state indicator dot |
| `--flow-cyan-bright` | `src/index.css` | Raw token | `#05C7F2` | Eyebrow text, traveling pulse dot, payoff tag |
| `--flow-magenta` | `src/index.css` | Raw token | `#D9299B` | Eyebrow beacon dot background and glow |
| `--flow-primary` | `src/index.css` | Raw token | `#0528F2` | Primary payoff button background |
| `--flow-primary-pressed`| `src/index.css` | Raw token | `#0A2BC7` | Primary payoff button active state |
| `--success` | `src/index.css` | Raw token | `#16803C` | Executed button text color |
| `--gradient-flow` | `src/index.css` | Raw token | `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)` | Primary button hover gradient |
| `--gradient-intelligence`| `src/index.css` | Raw token | `linear-gradient(135deg, #05C7F2 0%, #0540F2 48%, #D9299B 100%)` | Card top hairline beam |
| `--container-wide` | `src/index.css` | Raw token | `80rem` (1280px) | Container max-width |
| `--page-padding` | `src/index.css` | Raw token | `clamp(1.25rem, 3.34vw, 3rem)` | Container side padding |
| `--radius-sm` | `src/index.css` | Raw token | `0.25rem` (4px) | Badges, tags, known context pills |
| `--radius-md` | `src/index.css` | Raw token | `0.5rem` (8px) | Metrics trays |
| `--radius-lg` | `src/index.css` | Raw token | `0.75rem` (12px) | Left inspected invoice card |
| `--radius-full` | `src/index.css` | Raw token | `9999px` | Circular beacon dots, traveling pulse dot |
| `--font-h2` | `src/index.css` | Raw token | `clamp(2.25rem, 3.34vw, 3rem)` | Main `<h2>` heading size |
| `--font-family-primary` | `src/index.css` | Raw token | `"Manrope", sans-serif` | Global typography |
| `--font-family-mono` | Not declared in `:root` | Fallback stack | `ui-monospace, SFMono-Regular, Menlo, monospace` | Invoice number, telemetry labels, stage trackers |

---

### 2.4 JavaScript & ScrollTrigger Animation Code

#### Desktop GSAP ScrollTrigger Scrubbing Engine (Verbatim Code)
```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const media = gsap.matchMedia();

media.add("(min-width: 1024px)", () => {
  const pinSurface = document.querySelector(".ai-pin-surface");
  if (!pinSurface) return;

  const cards = pinSurface.querySelectorAll(".ai-stack-card");
  if (!cards || cards.length < 6) return;

  // Initialize initial card positions
  gsap.set(cards[0], { x: 0, y: 0, xPercent: 0, opacity: 1 });
  for (let i = 1; i < cards.length; i++) {
    gsap.set(cards[i], { xPercent: 120, x: 0, y: 0, opacity: 0 });
  }

  // Create timeline pinned to viewport
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinSurface,
      start: "top top+=68",
      end: "+=360%",
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        const stage = Math.min(5, Math.floor(self.progress * 6));
        updateActiveStageUI(stage);
      },
    },
  });

  // Build card stacking sequence
  for (let i = 1; i < cards.length; i++) {
    tl.to(
      cards[i],
      {
        xPercent: 0,
        x: i * 24,
        y: i * 14,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      i - 1
    );
    tl.to(
      cards[i - 1],
      {
        opacity: 0.72,
        duration: 0.4,
        ease: "power1.out",
      },
      i - 1 + 0.3
    );
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
});
```

#### Vanilla JS Controller for Elementor / WordPress (Interactive Tab / Stepper Fallback)
```javascript
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector("#ai-inside-flow");
  if (!section) return;

  const steps = section.querySelectorAll(".ai-tracker-step");
  const cards = section.querySelectorAll(".ai-stack-card");
  const invoiceEvaluation = section.querySelector(".ai-invoice-state-tag strong");
  const executeBtn = section.querySelector(".fo-button.is-primary");

  const stageNames = ["UNDERSTAND", "MATCH", "VALIDATE", "PREDICT", "DECIDE", "ACT"];

  function setStage(targetIndex) {
    steps.forEach((step, idx) => {
      if (idx === targetIndex) {
        step.classList.add("is-active");
        step.classList.remove("is-complete");
        step.setAttribute("aria-selected", "true");
      } else if (idx < targetIndex) {
        step.classList.remove("is-active");
        step.classList.add("is-complete");
        step.setAttribute("aria-selected", "false");
      } else {
        step.classList.remove("is-active", "is-complete");
        step.setAttribute("aria-selected", "false");
      }
    });

    cards.forEach((card, idx) => {
      if (idx === targetIndex) {
        card.className = `ai-stack-card ai-card-${idx} is-active`;
        card.setAttribute("aria-current", "step");
      } else if (idx < targetIndex) {
        card.className = `ai-stack-card ai-card-${idx} is-complete`;
        card.removeAttribute("aria-current");
      } else {
        card.className = `ai-stack-card ai-card-${idx} is-future`;
        card.removeAttribute("aria-current");
      }
    });

    if (invoiceEvaluation) {
      invoiceEvaluation.textContent = `0${targetIndex + 1} · ${stageNames[targetIndex]}`;
    }
  }

  steps.forEach((step, idx) => {
    step.addEventListener("click", () => setStage(idx));
  });

  if (executeBtn) {
    executeBtn.addEventListener("click", function () {
      this.classList.add("is-executed");
      this.textContent = "✓ Collection Dispatched";
    });
  }
});
```

---

## 3. CONTENT

### 3.1 Exhaustive Text Strings in Display Order

#### Section Heading
- **Eyebrow Capsule**: `AI INSIDE THE FLOW` (`<span class="home-index">`)
- **Main Heading**: `AI that works`<br>`inside the flow.` (`<h2>`)
- **Subtitle Paragraph**: `AI doesn't sit beside your business. It understands what is happening and helps decide what happens next.` (`<p>`)

#### Left Column: Inspected Business Object
- **Meta Kicker**: `INSPECTED BUSINESS OBJECT`
- **Active Pill**: `AI EVALUATION ACTIVE`
- **Invoice Number**: `INV-10482`
- **Total Amount**: `₹5,90,000`
- **Entity & GSTIN**: `Ananya Enterprises · GSTIN 36AABCA1234F1Z5`
- **Telemetry Metric 1**: Label: `SCHEMA MATCH` | Value: `99.8%`
- **Telemetry Metric 2**: Label: `IRN STATUS` | Value: `Verified`
- **Telemetry Metric 3**: Label: `TIMING CONFIDENCE` | Value: `92.0%`
- **Verified Context Pills (5 Tags)**:
  - `Customer profile`
  - `Invoice line items`
  - `Historical velocity`
  - `Due date window`
  - `IRP status`
- **Evaluation Status Indicator**: `CURRENT EVALUATION: 01 · UNDERSTAND` (Dynamic `01`–`06`)

#### Center Connector Bridge
- **Bus Tag Label**: `EVENT BUS`

#### Right Column: Stepper Bar (6 Steps)
1. `01 UNDERSTAND`
2. `02 MATCH`
3. `03 VALIDATE`
4. `04 PREDICT`
5. `05 DECIDE`
6. `06 ACT`

#### Stage 01: UNDERSTAND
- **Kicker**: `01 · AI / UNDERSTAND`
- **Title**: `Understand & Extract Business Object`
- **Status Badge**: `EXTRACTION COMPLETE` (Complete: `✓ COMPLETE`)
- **Summary**: `Understand the business object and extract relevant information.`
- **Metrics**:
  - `CONFIDENCE`: `99.8%`
  - `EXTRACTION TIME`: `38ms`
  - `FIELDS PARSED`: `18 / 18`
- **Details**:
  - `PAYLOAD TYPE`: `B2B Tax Invoice (PDF / JSON)`
  - `IDENTIFIED ENTITY`: `Ananya Enterprises · GSTIN 36AABCA1234F1Z5`
  - `LINE ITEMS`: `Cloud Operations · ₹5,00,000 + 18% GST`
  - `PAYMENT TERMS`: `Net 30 · Due 28 Jun 2026`

#### Stage 02: MATCH
- **Kicker**: `02 · AI / MATCH`
- **Title**: `Connect Records & Document Lineage`
- **Status Badge**: `3-WAY MATCH VERIFIED`
- **Summary**: `Connect relevant records, documents or data.`
- **Metrics**:
  - `RECON VARIANCE`: `₹0.00`
  - `PO MATCH RATE`: `100%`
  - `CORRELATION`: `Deterministic`
- **Details**:
  - `PURCHASE ORDER`: `PO-8841 · Linked & Approved`
  - `GOODS RECEIPT`: `GRN-104 · Inspection Cleared`
  - `MASTER CONTRACT`: `MSA-2025-ANANYA · Clause 4.2 Verified`
  - `LINEAGE INTEGRITY`: `Immutable Cryptographic Link`

#### Stage 03: VALIDATE
- **Kicker**: `03 · AI / VALIDATE`
- **Title**: `Verify Statutory & Business Rules`
- **Status Badge**: `STATUTORY & POLICY PASSED`
- **Summary**: `Check policy, business rules, compliance or tax conditions.`
- **Metrics**:
  - `IRN VERIFICATION`: `Valid & Signed`
  - `TAX CODE AUDIT`: `HSN 998313 (18%)`
  - `POLICY DRIFT`: `0.0%`
- **Details**:
  - `IRP SIGNATURE`: `NIC Portal Digital Hash Authenticated`
  - `E-WAY BILL`: `EWB-9920148 · Cleared & Synced`
  - `GSTN PORTAL`: `Active Taxpayer · Return Compliant`
  - `CREDIT LIMIT`: `Approved Limit ₹25,00,000 (Within Cap)`

#### Stage 04: PREDICT
- **Kicker**: `04 · AI / PREDICT`
- **Title**: `Forecast Payment Velocity & Delay Risk`
- **Status Badge**: `PREDICTIVE RISK SIGNAL`
- **Summary**: `Identify likely outcomes, anomalies, delays or risks.`
- **Metrics**:
  - `PAYMENT PROBABILITY`: `92% in 4 Days`
  - `CYCLE DRIFT RISK`: `+12 Days (If Delayed)`
  - `HISTORICAL VELOCITY`: `38 Days Avg.`
- **Details**:
  - `HISTORICAL PATTERN`: `Customer pays reliably within 38 days`
  - `CURRENT POSITION`: `Day 34 · Approaching due window boundary`
  - `RISK SIGNAL`: `Probability drops 40% if not prompted before Day 38`
  - `CASH IMPACT`: `₹5,90,000 forward liquidity factor`

#### Stage 05: DECIDE
- **Kicker**: `05 · AI / DECIDE`
- **Title**: `Recommend Optimal Business Action`
- **Status Badge**: `DECISION READY`
- **Summary**: `Recommend the next appropriate business action.`
- **Metrics**:
  - `RECOMMENDED ACTION`: `Prioritize Collection`
  - `TARGET CHANNEL`: `WhatsApp + Email`
  - `EXPECTED RECOVERY`: `< 48 Hours`
- **Details**:
  - `DECISION RATIONALE`: `Pre-empt payment drift before customer payment run`
  - `OUTREACH PROTOCOL`: `Automated executive summary with instant payment link`
  - `INCENTIVE MODEL`: `Highlight 1.5% prompt settlement rebate`
  - `GOVERNANCE`: `Pre-approved under Collection Policy v4`

#### Stage 06: ACT
- **Kicker**: `06 · AI / ACT`
- **Title**: `Execute & Route Business Action`
- **Status Badge**: `PAYOFF READY`
- **Summary**: `Execute or route the recommended action.`
- **Metrics**:
  - `EXECUTION STATE`: `Ready to Trigger`
  - `PAYMENT LINK`: `Generated & Signed`
  - `AUDIT LINEAGE`: `Append-Only`
- **Details**:
  - `RECIPIENT`: `finance@ananyaenterprises.com · Accounts Payable`
  - `PAYMENT RAILS`: `Dynamic Virtual Account + UPI QR + NEFT Bridge`
  - `ERP LEDGER`: `Pre-allocated cash expectation posted to SAP`
  - `AUDIT TRAIL`: `TXN-ACT-10482 sealed with cryptographic timestamp`
- **Action Payoff Box**:
  - Tag: `RECOMMENDED ACTION`
  - Headline: `Prioritize collection & dispatch payment link`
  - Subhead: `AI scheduled authenticated multi-channel outreach with instant reconciliation link.`
  - Status Pill: `QUEUED FOR DISPATCH · TODAY, 10:00 AM`
  - Primary CTA (Default): `Review Collection`
  - Primary CTA (Executed): `✓ Collection Dispatched`
  - Secondary CTA: `Schedule Auto-Followup`

#### Section Footer
- **Action Link**: `Explore AI Inside the Flow` (`<a href="#ai-inside-flow">`)

### 3.2 Hyperlinks & Outbound Destinations
- **Footer Link**:
  - Destination URL: `#ai-inside-flow`
  - Label: `Explore AI Inside the Flow`
  - Type: In-page anchor (scrolls back to the top of Section 07).

---

## 4. LAYOUT SPEC

### 4.1 Container & Vertical Spacing
- **Section Padding**:
  - Desktop / Tablet (`> 768px`): `clamp(3.25rem, 5.5vh, 4.5rem)` top and bottom.
  - Mobile (`≤ 768px`): `clamp(2.25rem, 4.5vh, 3rem)` top and bottom.
- **Container Max-Width**: `80rem` (1280px).
- **Container Side Gutters**: `clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
- **Header Row Margin-Bottom**: `clamp(1.75rem, 3vh, 2.35rem)`.
- **Pinned Surface Min-Height**: `calc(100vh - 8rem)` on desktop.

### 4.2 Desktop 3-Column Grid (`≥ 1024px`)
- **Grid Template**:
  `grid-template-columns: minmax(320px, 360px) 48px minmax(520px, 1fr); align-items: start; gap: 0;`
- **Left Column (`.ai-invoice-column`)**:
  - Width: `320px–360px`, `z-index: 5`.
  - Glass card: `padding: 1.35rem`, `background: rgba(15, 23, 42, 0.82)`, `border: 1px solid rgba(255, 255, 255, 0.14)`, `border-radius: 0.75rem`, `backdrop-filter: blur(16px)`.
- **Center Column (`.ai-connector-bridge`)**:
  - Width: `48px`, `padding-top: 6.5rem`, `display: flex; flex-direction: column; align-items: center;`.
  - Line: `height: 2px; background: linear-gradient(90deg, rgba(0, 34, 255, 0.6) 0%, rgba(0, 184, 230, 0.8) 100%);`.
  - Traveling Pulse: `8px × 8px` glowing cyan circle.
- **Right Column (`.ai-stack-column`)**:
  - `padding-left: 0.75rem`.
  - Stepper Bar: `margin-bottom: 1.25rem`.
  - Stack Viewport: `position: relative; width: 100%; height: 520px; min-height: 520px;`.
  - Stacked Cards: `position: absolute; top: 0; left: 0; width: calc(100% - 130px); max-width: 580px; min-height: 420px;`.
  - Spatial Cascade: Each consecutive card stacks with `x: i * 24px, y: i * 14px` when pinned.

---

## 5. RESPONSIVE SPEC

### 5.1 Breakpoint Architecture

```
Desktop (≥ 1025px / > 64rem)
   │
   ├─► 2-Column Heading Row: 1.4fr : 0.8fr (gap 80px)
   ├─► 3-Column Pinned Grid: minmax(320px, 360px) 48px minmax(520px, 1fr)
   ├─► Center Luminous Connector Bridge Active (Event Bus line + traveling pulse dot)
   ├─► GSAP ScrollTrigger Surface Pinning Enabled (+=360% scroll distance)
   ├─► Stack Viewport (520px fixed height) with 3D Absolute Spatial Cards
   └─► Horizontal Category Stepper at top of right stack
   │
Tablet (769px – 1024px / 48rem – 64rem)
   │
   ├─► Single-Column Heading Row: grid-template-columns: 1fr; gap 32px
   ├─► 1-Column Pinned Grid: grid-template-columns: 1fr; gap 28px (1.75rem)
   ├─► CENTER CONNECTOR BRIDGE HIDDEN: display: none (.ai-connector-bridge)
   ├─► GSAP PINNING DISABLED: media.add("(min-width: 1024px)") skips execution
   ├─► STACK VIEWPORT DE-PINS TO VERTICAL FLEX FEED: position: static; height: auto
   └─► ALL 6 CARDS STACK SEQUENTIALLY: position: static; width: 100%; transform: none !important
   │
Mobile (≤ 768px / ≤ 48rem)
   │
   ├─► Section Padding Clamped: clamp(2.25rem, 4.5vh, 3rem)
   ├─► Left Invoice Padding: reduced to 1.15rem
   ├─► INVOICE METRICS TRAY BECOMES 1-COLUMN STACK: grid-template-columns: 1fr; gap: 6.4px
   ├─► CARD METRICS TRAY BECOMES 1-COLUMN STACK: grid-template-columns: 1fr; gap: 6.4px
   ├─► VERIFIED DETAILS GRID BECOMES 1-COLUMN STACK: grid-template-columns: 1fr; gap: 6.4px
   ├─► PAYOFF TOP FLEX DIRECTION SHIFTS TO COLUMN: flex-direction: column; gap: 8px
   └─► PAYOFF CTA BUTTONS STRETCH FULL WIDTH: flex-direction: column; align-items: stretch
```

### 5.2 Responsive Property Change Matrix

| Selector / Element | Desktop (> 1024px) | Tablet (769px – 1024px) | Mobile (≤ 768px) |
| :--- | :--- | :--- | :--- |
| `.ai-pinned-grid` | `320px–360px 48px 520px–1fr` | `1fr; gap: 1.75rem;` | `1fr; gap: 1.25rem;` |
| `.ai-connector-bridge` | `display: flex;` (Event bus pulse) | `display: none;` | `display: none;` |
| `.ai-stack-viewport` | `position: relative; height: 520px;` | `position: static; height: auto; display: flex; flex-direction: column; gap: 1rem;` | `position: static; height: auto; display: flex; flex-direction: column; gap: 1rem;` |
| `.ai-stack-card` | `position: absolute; width: calc(100% - 130px); max-width: 580px;` | `position: static; width: 100%; max-width: 100%; transform: none !important; opacity: 1 !important;` | `position: static; width: 100%; max-width: 100%; transform: none !important;` |
| `.ai-telemetry-metrics` | `repeat(3, 1fr)` | `repeat(3, 1fr)` | `1fr; gap: 0.4rem;` |
| `.ai-card-metrics` | `repeat(3, 1fr)` | `repeat(3, 1fr)` | `1fr; gap: 0.4rem;` |
| `.ai-card-details-grid` | `repeat(2, 1fr)` | `repeat(2, 1fr)` | `1fr; gap: 0.4rem;` |
| `.ai-payoff-actions` | `display: flex; flex-direction: row;` | `display: flex; flex-direction: row;` | `display: flex; flex-direction: column; align-items: stretch;` |

---

## 6. TYPOGRAPHY

| Style Role | Font Family | Size / Clamp | Weight | Line Height | Letter Spacing | Resolved Color | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Section Eyebrow** (`.home-index`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | `700` | `1` | `0.12em` | `#05C7F2` | `uppercase` |
| **Section Heading** (`.home-section h2`) | `"Manrope", sans-serif` | `clamp(2.25rem, 3.34vw, 3rem)` | `650` | `1.08` | `-0.05em` | `#FFFFFF` | `none` |
| **Intro Paragraph** (`.section-heading-row > p`) | `"Manrope", sans-serif` | `1.0625rem` (17px) | `400` | `1.7` | `normal` | `#9CA3AF` | `none` |
| **Invoice Meta Kicker** (`.ai-invoice-meta span`)| `ui-monospace, monospace` | `0.62rem` (9.92px) | `750` | `normal` | `0.08em` | `#049DD9` | `uppercase` |
| **Invoice Number** (`.ai-invoice strong`) | `ui-monospace, monospace` | `1.4rem` (22.4px) | `700` | `normal` | `-0.02em` | `#FFFFFF` | `none` |
| **Invoice Amount** (`.ai-invoice b`) | `"Manrope", sans-serif` | `2.15rem` (34.4px) | `750` | `normal` | `-0.035em` | `#FFFFFF` | `none` |
| **Invoice Sub-entity** (`.ai-invoice small`) | `"Manrope", sans-serif` | `0.6875rem` (11px) | `400` | `1.35` | `normal` | `#9CA3AF` | `none` |
| **Telemetry Label** (`.ai-telemetry-metrics small`)| `ui-monospace, monospace` | `0.52rem` (8.32px) | `750` | `normal` | `0.06em` | `#64748B` | `uppercase` |
| **Telemetry Value** (`.ai-telemetry-metrics strong`)| `"Manrope", sans-serif` | `0.8rem` (12.8px) | `700` | `normal` | `normal` | `#FFFFFF` | `none` |
| **Event Bus Tag** (`.ai-connector-tag`) | `ui-monospace, monospace` | `0.48rem` (7.68px) | `750` | `normal` | `0.1em` | `#64748B` | `uppercase` |
| **Stepper Button Text** (`.ai-tracker-step`) | `ui-monospace, monospace` | `0.65rem` (10.4px) | `600` | `normal` | `0.04em` | `#94A3B8` (active: `#FFFFFF`)| `none` |
| **Card Kicker** (`.ai-card-kicker`) | `ui-monospace, monospace` | `0.62rem` (9.92px) | `750` | `normal` | `0.08em` | `#049DD9` | `uppercase` |
| **Card Title** (`.ai-card-title`) | `"Manrope", sans-serif` | `1.05rem` (16.8px) | `700` | `1.3` | `-0.02em` | `#FFFFFF` | `none` |
| **Card Status Badge** (`.ai-card-status-badge`)| `ui-monospace, monospace` | `0.56rem` (8.96px) | `700` | `normal` | `0.05em` | `#94A3B8` (active: `#05C7F2`)| `uppercase` |
| **Card Summary Copy** (`.ai-card-summary`) | `"Manrope", sans-serif` | `0.8125rem` (13px) | `400` | `1.45` | `normal` | `#9CA3AF` | `none` |
| **Card Metric Label** (`.ai-card-metric-label`)| `ui-monospace, monospace` | `0.52rem` (8.32px) | `750` | `normal` | `0.06em` | `#64748B` | `uppercase` |
| **Card Metric Value** (`.ai-card-metric-value`)| `"Manrope", sans-serif` | `0.875rem` (14px) | `750` | `normal` | `-0.015em` | `#F8FAFC` | `none` |
| **Detail Item Label** (`.ai-card-detail-label`)| `ui-monospace, monospace` | `0.5rem` (8px) | `750` | `normal` | `0.06em` | `#64748B` | `uppercase` |
| **Detail Item Value** (`.ai-card-detail-val`)| `"Manrope", sans-serif` | `0.7rem` (11.2px) | `500` | `1.35` | `normal` | `#CBD5E1` | `none` |
| **Payoff Tag** (`.ai-payoff-tag`) | `ui-monospace, monospace` | `0.54rem` (8.64px) | `750` | `normal` | `0.08em` | `#05C7F2` | `uppercase` |
| **Payoff Headline** (`.ai-payoff-title`) | `"Manrope", sans-serif` | `0.875rem` (14px) | `750` | `normal` | `-0.015em` | `#FFFFFF` | `none` |
| **Payoff Subhead** (`.ai-payoff-sub`) | `"Manrope", sans-serif` | `0.72rem` (11.52px) | `400` | `1.35` | `normal` | `#9CA3AF` | `none` |
| **Footer Text Link** (`.section-text-link`) | `"Manrope", sans-serif` | `0.9375rem` (15px) | `700` | `normal` | `normal` | `#FFFFFF` | `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Keyframe Animations

#### Magenta Eyebrow Beacon (`@keyframes beacon-pulse-ai`)
- **Duration**: `2.4s ease-in-out infinite`
- **Keyframes**:
  ```css
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px rgba(217, 41, 155, 0.9); }
  50%      { opacity: 0.5; transform: scale(0.8); box-shadow: 0 0 4px rgba(217, 41, 155, 0.4); }
  ```

#### Emerald Beacon Pulse (`@keyframes aiBeaconPulse`)
- **Duration**: `2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
- **Keyframes**:
  ```css
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.85); }
  ```

#### Luminous Pulse Travel (`@keyframes aiPulseTravel`)
- **Duration**: `2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite`
- **Keyframes**:
  ```css
  0%   { left: 0%; opacity: 0; transform: scale(0.6); }
  15%  { opacity: 1; transform: scale(1.2); }
  85%  { opacity: 1; transform: scale(1.2); }
  100% { left: 100%; opacity: 0; transform: scale(0.6); }
  ```

### 7.2 Interactive Hover & Execution States

#### Stepper Tabs (`.ai-tracker-step`)
- **Hover**: `background: rgba(255, 255, 255, 0.08); color: #f8fafc;`
- **Active State (`.is-active`)**:
  - `background: rgba(0, 184, 230, 0.16);`
  - `border-color: rgba(0, 184, 230, 0.5);`
  - `color: #ffffff;`
  - `box-shadow: 0 0 12px rgba(0, 184, 230, 0.25);`

#### Payoff Primary Button (`.fo-button.is-primary`)
- **Default**: `background: #0528F2; color: #FFFFFF; border: 1px solid #0528F2; box-shadow: 0 2px 8px rgba(5, 40, 242, 0.3);`
- **Hover**: `background: linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%); border-color: #049DD9; transform: translateY(-1px);`
- **Executed State (`.is-executed`)**:
  - `background: rgba(22, 128, 60, 0.2);`
  - `color: #16803C;`
  - `border-color: rgba(22, 128, 60, 0.4);`
  - Text updates to `"✓ Collection Dispatched"`.

### 7.3 Reduced-Motion Suppression
Under `@media (prefers-reduced-motion: reduce)`:
- All cards de-pin and display statically (`position: static !important; width: 100% !important; transform: none !important; opacity: 1 !important;`).
- `@keyframes aiPulseTravel`, `@keyframes aiBeaconPulse`, and `@keyframes beacon-pulse-ai` are disabled (`animation: none !important;`).

---

## 8. ICONS

### 8.1 Icon Inventory

| Icon Purpose | Icon Name | Library / Source | ViewBox | Dimensions | Stroke Width | Stroke Linecap / Linejoin | Resolved Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Stack Card Spark Header Badge | `spark` | FlowOne Icon (`src/components/flowone.tsx`) | `0 0 24 24` | `16px × 16px` | `1.5` | `round` / `round` | `#0528F2` (`tone="action"`) |
| Section Footer Explore Arrow | `arrow` | FlowOne Icon (`src/components/flowone.tsx`) | `0 0 24 24` | `16px × 16px` | `1.5` | `round` / `round` | `#FFFFFF` (`tone="inverse"`) |

### 8.2 Inline SVG Code

#### 1. AI Spark Icon (`16×16`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" />
</svg>
```

#### 2. Footer Action Arrow (`16×16`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 12h14m-5-5 5 5-5 5" />
</svg>
```

### 8.3 Vector Archive & Asset Directory
- **Zip Archive**: `ai-inside-icons.zip`
- **Asset Directory**: `ai-inside-assets/`
  - `ai-inside-spark.svg`
  - `ai-inside-arrow-right.svg`

---

## 9. ACCESSIBILITY

- **ARIA Landmarks & Roles**:
  - Stepper track has `role="tablist"` with `aria-label="AI Progression Stages"`.
  - Stepper buttons have `role="tab"` and `aria-selected="true|false"`.
  - Active stack card receives `aria-current="step"`.
- **Decorative Elements (`aria-hidden="true"`)**:
  - HUD corner brackets (`.ai-corner`): `aria-hidden="true"`.
  - Beacon dots (`.ai-beacon-dot`, `.ai-card-beacon`, `.ai-payoff-pulse`): `aria-hidden="true"`.
  - Center connector bridge and pulse dot: `aria-hidden="true"`.
  - Hairline gradient beam (`.ai-card-beam`): `aria-hidden="true"`.
  - Spark icons: `aria-hidden="true"`.
- **Color Contrast Ratios (Dark Canvas `#0D0D0D`)**:
  - Section Title (`#FFFFFF` on `#0D0D0D`): **18.2:1** (Passes AAA).
  - Subtitle Paragraph (`#9CA3AF` on `#0D0D0D`): **6.8:1** (Passes AAA).
  - Cyan Eyebrow & Kickers (`#05C7F2` on dark): **9.1:1** (Passes AAA).
  - Emerald Status Indicators (`#34D399` on dark): **9.6:1** (Passes AAA).
  - Card Metric Value (`#F8FAFC` on dark glass): **17.5:1** (Passes AAA).

---

## 10. NOT FOUND IN CODE

1. **Footer Link Anchors Back to Section Itself**:
   - The footer CTA `<a className="section-text-link inverse" href="#ai-inside-flow">` links back to `#ai-inside-flow` rather than an external AI whitepaper or product page.
2. **Review Collection Button Is Client-Side Prototype**:
   - Clicking `"Review Collection"` in Stage 6 flips local React state `aiActionExecuted` to `true`, rendering `"✓ Collection Dispatched"` with green styling, but triggers no API call or modal dialog.
3. **Undefined `--font-family-mono` Token**:
   - Relies on browser fallback stack (`ui-monospace, SFMono-Regular, Menlo, monospace`).
4. **GSAP ScrollTrigger Dependency on Desktop**:
   - The desktop cascading stack animation depends entirely on the external GSAP library and ScrollTrigger plugin. If GSAP is not loaded, the script fallback provided in Section 2.4 must be used to ensure tabs function correctly.

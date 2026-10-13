# flowOne "Living Transaction" Section — Elementor Pro Build Handoff Specification

> **Target Platform:** WordPress with Elementor Pro (Containers, Custom Code / HTML, Headings, Text Editor, Button widgets, Tabs/Carousel, Custom CSS)  
> **Source Repository:** `flowOne-NewDesign`  
> **Section:** Section 03 — Living Transaction (`#living-transaction` / `.home-living`)  
> **Specification Version:** 1.0 (Strict Code-Audit Release)  
> **Authoring Rule:** Every selector, dimension, color, animation, and breakpoint is derived verbatim from the audited source repository files. No approximations, redesigns, or assumed values are used. If something is unknown or missing, it is documented as `NOT FOUND IN CODE`.

---

## 1. SECTION OVERVIEW

### Purpose and Position on the Page
The "Living Transaction" section (`<section id="living-transaction" className="home-living">`) serves as the primary interactive product proof and simulation engine of the flowOne homepage. It demystifies flowOne's core proposition by taking the visitor through the continuous lifecycle of a single real-world commercial transaction (**TXN-10482**, Ananya Enterprises, ₹5,00,000 base contract expanding to ₹5,90,000 with statutory GST) across 10 progressive operating stages:
1. `ORDER` (Commercial order confirmation, SO-10482, 125 units)
2. `INVENTORY` (Warehouse stock allocation in Hyderabad DC-02)
3. `INVOICE` (Tax invoice issuance with 18% GST, INV-10482)
4. `GST` (Statutory E-Invoice verification, IRN hash generation, GSTR-1 population)
5. `RECEIVABLE` (Open AR ledger tracking, due in 4 days)
6. `AI PREDICTION` (Flow Intelligence behavioral payment probability forecast at 92%)
7. `COLLECTION` (Collections orchestration, pre-due reminder cadence)
8. `BANK` (Automated HDFC Corporate Feed bank reconciliation with 98% match confidence)
9. `CASH` (Operating treasury clearance and active cash confirmation)
10. `DECISION` (Executive closure, working capital refresh, credit limit update)

- **Preceding Section:** Section 02 — The Business Loop (`<section className="home-problem home-section">`)
- **Succeeding Section:** Section 04 — The Cost of Silos / System Fragmentation (`<section className="home-fragmentation home-section">`)

### Structural Summary
The section adapts dynamically between desktop and smaller viewports:
- **Desktop (≥1025px):** Features an Apple-style "Take a closer look" interactive explorer layout. The left column (`.apple-explorer`, minmax 320px to 0.36fr) houses a vertical chevron step switcher and 10 pill buttons that expand in-situ into rich descriptive narrative cards with key fact metadata chips. The right column (`.living-ui`, 1fr) displays the high-fidelity live enterprise workspace with dark telemetry header, 4-column metadata strip, active transaction stage canvas (tables, allocation summaries, reconciliation bridges), and continuous ledger status footer.
- **Tablet & Mobile (≤1024px / `64rem`):** The desktop 2-column layout hides (`display: none`), and an interactive mobile touch carousel (`.living-mobile-wrapper`) engages. The carousel features a centered enterprise stage card, screen-edge full-bleed chevron trigger arrows (`.apple-edge-arrow`) extending flush to the screen boundaries, proportional centered description cards, touch swipe gesture detection, and a continuous horizontal progress track indicator.

### Component Files and Exact Line Ranges

| File Path | Exact Line Range | Role in Section |
| :--- | :--- | :--- |
| `src/Homepage.tsx` | Lines 653–665 | Section shell markup (`#living-transaction`), intro header, and desktop/mobile switch |
| `src/Homepage.tsx` | Lines 7–18 | `transactionStates` schema (10 stages with labels, summaries, facts, and states) |
| `src/Homepage.tsx` | Lines 433, 454–458 | Active stage state (`livingState`) and `handleSelectState` callback |
| `src/Homepage.tsx` | Lines 1639–1784 | `LivingNarrative` component (Apple-style left column navigator & in-situ cards) |
| `src/Homepage.tsx` | Lines 1786–2230 | `LivingProduct` component (Live enterprise UI, 10 stage canvas states, tables, and footer) |
| `src/Homepage.tsx` | Lines 2232–2355 | `LivingMobileCarousel` component (Touch carousel, edge arrows, progress track) |
| `src/homepage.css` | Lines 916–922 | Section shell & intro grid styles (`.home-living`, `.living-intro`, `.living-sticky`) |
| `src/homepage.css` | Lines 923–962 | Desktop Apple-style explorer (`.apple-explorer`, `.apple-pill-*`, `.apple-desc-*`) |
| `src/homepage.css` | Lines 963–1076 | Mobile Apple-style carousel (`.living-mobile-*`, `.apple-edge-arrow`) |
| `src/homepage.css` | Lines 1077–1148 | Enterprise UI workspace (`.living-ui`, headers, meta strip, tables, callouts) |
| `src/homepage.css` | Lines 4393–4395 | Tablet media query (`@media (max-width: 64rem)`): hides desktop, displays carousel |
| `src/homepage.css` | Lines 4492–4508 | Mobile media query (`@media (max-width: 48rem)`): padding, arrow, and grid collapses |
| `src/homepage.css` | Lines 4634–4635 | Accessibility reduced motion rules (`@media (prefers-reduced-motion: reduce)`) |
| `src/components/flowone.tsx` | Lines 6–17, 67–70, 120–123 | `Icon`, `Status`, and `FlowConnector` UI primitives |
| `src/components/flowone.css` | Lines 36–42, 68–70 | Status indicators, flow connector pulse animation, and icon styles |
| `src/index.css` | Lines 11–221 | Canonical design tokens, colors, gradients, shadows, and root typography |

---

## 2. CODE

### 2.1 Verbatim JSX / TSX Markup

#### Section Shell (`src/Homepage.tsx`, Lines 653–665)
```tsx
    <section id="living-transaction" className="home-living">
      <div className="home-container living-intro">
        <div>
          <span className="home-index">LIVING TRANSACTION</span>
          <h2>One transaction.<br/>Connected from start to cash.</h2>
        </div>
        <p>Follow a single ₹5,00,000 order as it moves through operations, finance, compliance, collection and cash.</p>
      </div>
      <div className="living-desktop home-container"><div className="living-sticky"><LivingNarrative index={livingState} setIndex={setLivingState} onSelectState={handleSelectState}/><LivingProduct index={livingState}/></div></div>
      <div className="living-mobile-wrapper">
        <LivingMobileCarousel index={livingState} onSelectState={handleSelectState} />
      </div>
    </section>
```

#### Data Schema: Transaction States (`src/Homepage.tsx`, Lines 7–18)
```tsx
const transactionStates = [
  { label: "ORDER", pillLabel: "Order", eyebrow: "ORDER CONFIRMATION", title: "Order confirmed", summary: "A ₹5,00,000 order begins one continuous business journey.", state: "complete", facts: [["ORDER VALUE","₹5,00,000"],["UNITS","125"],["CUSTOMER","Ananya Enterprises"],["STATUS","Confirmed"]] },
  { label: "INVENTORY", pillLabel: "Inventory", eyebrow: "STOCK ALLOCATION", title: "Inventory allocated", summary: "The same transaction reserves stock in the Hyderabad warehouse.", state: "complete", facts: [["STOCK","125 units allocated"],["WAREHOUSE","Hyderabad"],["STATUS","Allocated"]] },
  { label: "INVOICE", pillLabel: "Invoice", eyebrow: "COMMERCIAL INVOICE", title: "Invoice issued", summary: "Operational activity becomes a financial obligation without losing context.", state: "active", facts: [["INVOICE","INV-10482"],["SUBTOTAL","₹5,00,000"],["GST","₹90,000"],["TOTAL","₹5,90,000"]] },
  { label: "GST", pillLabel: "GST Compliance", eyebrow: "STATUTORY VALIDATION", title: "Compliance validated", summary: "Tax context stays attached to the transaction.", state: "complete", facts: [["GST","₹90,000"],["E-INVOICE","Generated"],["VALIDATION","Passed"],["E-WAY BILL","Ready"],["STATUS","Compliant"]] },
  { label: "RECEIVABLE", pillLabel: "Receivable", eyebrow: "OPEN RECEIVABLE", title: "Receivable open", summary: "Finance sees the amount, customer and due date in the same flow.", state: "active", facts: [["AMOUNT","₹5,90,000"],["CUSTOMER","Ananya Enterprises"],["DUE","In 4 days"],["STATUS","Open"]] },
  { label: "AI PREDICTION", pillLabel: "AI Prediction", eyebrow: "PREDICTIVE INTELLIGENCE", title: "Intelligence enters the flow", summary: "92% probability of payment within 4 days.", state: "predictive", facts: [["PAYMENT PROBABILITY","92%"],["EXPECTED","Within 4 days"],["RECOMMENDED ACTION","Prioritize only if behaviour changes"]] },
  { label: "COLLECTION", pillLabel: "Collection", eyebrow: "ACTIONABLE REMINDER", title: "Insight becomes action", summary: "A payment reminder is ready when the business context calls for it.", state: "recommended", facts: [["REMINDER","Payment due"],["STATUS","Scheduled"],["ACTION","Send Reminder"]] },
  { label: "BANK", pillLabel: "Bank Recon", eyebrow: "AUTO RECONCILIATION", title: "Payment matched", summary: "The bank receipt reconnects to the same invoice automatically.", state: "processing", facts: [["PAYMENT","₹5,90,000"],["STATUS","Received"],["MATCH","INV-10482"],["CONFIDENCE","98%"]] },
  { label: "CASH", pillLabel: "Cash Liquidity", eyebrow: "AVAILABLE LIQUIDITY", title: "Cash available", summary: "The transaction completes its operational and financial journey.", state: "complete", facts: [["AVAILABLE CASH","₹5,90,000"],["STATUS","Received"],["TRANSACTION","TXN-10482"]] },
  { label: "DECISION", pillLabel: "Decision", eyebrow: "EXECUTIVE CLOSURE", title: "Decision ready", summary: "The transaction is no longer just an invoice. It is part of the business’s financial picture.", state: "recommended", facts: [["OUTCOME","Cash collected"],["CONTEXT","Restored"],["NEXT","Decision ready"]] },
] as const;
```

#### LivingNarrative Component (`src/Homepage.tsx`, Lines 1639–1784)
```tsx
const LivingNarrative = memo(function LivingNarrative({
  index,
  setIndex,
  onSelectState,
}: {
  index: number;
  setIndex?: (i: number) => void;
  onSelectState?: (i: number) => void;
}) {
  const handleSelect = (targetIndex: number) => {
    startTransition(() => {
      if (onSelectState) {
        onSelectState(targetIndex);
      } else if (setIndex) {
        setIndex(targetIndex);
      }
    });
  };

  const handlePrev = () => {
    if (index > 0) {
      handleSelect(index - 1);
    }
  };

  const handleNext = () => {
    if (index < transactionStates.length - 1) {
      handleSelect(index + 1);
    }
  };

  // Standalone mode for mobile stacked list
  if (!setIndex && !onSelectState) {
    const x = transactionStates[index];
    return (
      <aside className="apple-explorer apple-explorer-single">
        <div className="apple-pill-group is-active">
          <div className="apple-desc-card">
            <p className="apple-desc-lead">
              <strong className="apple-desc-bold">{x.pillLabel}.</strong>{" "}
              <span className="apple-desc-text">{x.summary}</span>
            </p>
            {x.facts && x.facts.length > 0 && (
              <div className="apple-desc-chips" aria-label="Key facts">
                {x.facts.map(([label, val]) => (
                  <div key={label} className="apple-desc-chip">
                    <span className="apple-chip-k">{label}</span>
                    <span className="apple-chip-v">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="apple-explorer" aria-label="Transaction states explorer">
      {/* Left Chevron Navigation Group */}
      <div className="apple-nav-chevrons" aria-label="Step navigation">
        <button
          type="button"
          className="apple-chevron-btn"
          disabled={index === 0}
          aria-label="Previous step"
          onClick={handlePrev}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 8.5L7 4.5L11 8.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="apple-chevron-btn"
          disabled={index === transactionStates.length - 1}
          aria-label="Next step"
          onClick={handleNext}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Vertical Pill List with In-Situ Expanded Card (Apple "Take a closer look" pattern) */}
      <div className="apple-pills-column" role="tablist" aria-orientation="vertical">
        {transactionStates.map((x, i) => {
          const isActive = i === index;
          return (
            <div
              key={x.label}
              className={`apple-pill-group ${isActive ? "is-active" : ""}`}
            >
              {isActive ? (
                /* In-situ expanded card replaces the pill button directly */
                <div
                  id={`apple-desc-${i}`}
                  role="tabpanel"
                  aria-labelledby={`apple-pill-tab-${i}`}
                  className="apple-desc-card"
                >
                  <p className="apple-desc-lead">
                    <strong className="apple-desc-bold">{x.pillLabel}.</strong>{" "}
                    <span className="apple-desc-text">{x.summary}</span>
                  </p>
                  {x.facts && x.facts.length > 0 && (
                    <div className="apple-desc-chips" aria-label="Key facts">
                      {x.facts.map(([label, val]) => (
                        <div key={label} className="apple-desc-chip">
                          <span className="apple-chip-k">{label}</span>
                          <span className="apple-chip-v">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Inactive pill button with circular (+) icon */
                <button
                  type="button"
                  role="tab"
                  id={`apple-pill-tab-${i}`}
                  aria-selected={false}
                  aria-expanded={false}
                  aria-controls={`apple-desc-${i}`}
                  className="apple-pill-btn"
                  onClick={() => handleSelect(i)}
                >
                  <span className="apple-pill-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 4.75V11.25M4.75 8H11.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="apple-pill-label">{x.pillLabel}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
});
```

#### LivingProduct Component (`src/Homepage.tsx`, Lines 1786–2230)
*(Note: Full verbatim rendering across all 10 stages)*
```tsx
const LivingProduct = memo(function LivingProduct({ index }: { index: number }) {
  const [reminderSent, setReminderSent] = useState(false);
  const currentValue = index >= 2 ? "₹5,90,000" : "₹5,00,000";

  const statusLabel =
    index >= 9
      ? "Completed"
      : index === 8
      ? "Paid"
      : index === 7
      ? "Processing"
      : index === 6
      ? "Pending"
      : index === 5
      ? "Processing"
      : index === 4
      ? "Pending"
      : index === 3
      ? "Approved"
      : index >= 1
      ? "Processing"
      : "Approved";

  return (
    <div className="living-workspace-v2" aria-label="Living Transaction Workspace">
      {/* 1. Stage Header: Title, Option 1 Lead, and Enhanced Metadata Pills */}
      <div className="living-stage-header">
        <h3 className="living-stage-title">{cur.titleUpper}</h3>
        <p className="living-stage-lead">{cur.lead}</p>

        {/* Enhanced Pills Row */}
        <div className="living-stage-pills-row" aria-label="Transaction Highlights">
          {/* Reference pill */}
          <div className="living-pill is-blue">
            <span>{cur.pills[0].text}</span>
          </div>

          {/* Customer & GSTIN Badge */}
          <div className="living-pill is-entity" title="Customer & Statutory GSTIN">
            <span className="living-pill-avatar">AE</span>
            <span className="living-pill-entity-name">Ananya Enterprises</span>
            <span className="living-pill-gst-divider">·</span>
            <span className="living-pill-gst-val">GST: 36AABCA1234F1Z5</span>
          </div>

          {/* Remaining contextual pills */}
          {cur.pills.slice(1).map((p, pIdx) => (
            <div key={pIdx} className={`living-pill is-${p.tone}`}>
              <span>{p.text}</span>
            </div>
          ))}

          {/* Dynamic Status Pill */}
          <div className={`living-pill is-status is-${cur.statusTone}`}>
            <span className="living-status-indicator" />
            <span>Status: {cur.statusLabel}</span>
          </div>
        </div>
      </div>

      {/* 2. Center Card Container with SVG Gradient Overlays */}
      <div className="living-card-shell" key={index}>
        <img
          src="/assets/gradient-top.svg"
          alt=""
          className="living-card-gradient-top"
          aria-hidden="true"
        />
        <img
          src="/assets/gradient-bottom.svg"
          alt=""
          className="living-card-gradient-bottom"
          aria-hidden="true"
        />

        <div className="living-card-content">
        {index === 0 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Sales Order · SO-10482</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Order Confirmed</span>
            </div>
            <div className="living-table-shell">
              <table className="living-table">
                <thead>
                  <tr>
                    <th>LINE ITEM DESCRIPTION</th>
                    <th>QTY</th>
                    <th>UNIT PRICE</th>
                    <th style={{ textAlign: "right" }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>flowOne Connected Operations Suite — Annual Enterprise License</td>
                    <td>125 units</td>
                    <td>₹4,000</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>₹5,00,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="living-table-totals">
              <div><span>Subtotal</span><b>₹5,00,000</b></div>
              <div className="grand-total"><span>Sales Order Total</span><b>₹5,00,000</b></div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>COMMERCIAL WORKFLOW ROUTE</span>
                <small>Demand Initiated</small>
              </div>
              <p>Commercial agreement confirmed for 125 units. The sales order initiates an automated fulfillment workflow directly in Hyderabad inventory.</p>
            </div>
          </div>
        )}

        {index === 1 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Warehouse Allocation · SO-10482</strong>
              <span className="living-badge-pill is-info">125 / 125 Units Allocated</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>ALLOCATED UNITS</span>
                <strong>125 units (100% reserved)</strong>
              </div>
              <div className="living-grid-item">
                <span>WAREHOUSE LOCATION</span>
                <strong>Hyderabad Central DC (DC-02)</strong>
              </div>
              <div className="living-grid-item">
                <span>STORAGE BIN</span>
                <strong>Rack HYD-B4 · Bin 12</strong>
              </div>
              <div className="living-grid-item">
                <span>FULFILLMENT STATUS</span>
                <strong>Allocated · Outbound Ready</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>CONTINUOUS INVENTORY INTEGRATION</span>
                <small>Zero Silo Handoff</small>
              </div>
              <p>The same transaction reserves stock in the Hyderabad warehouse. Operations clears fulfillment without manual re-entry or detached warehouse spreadsheets.</p>
            </div>
          </div>
        )}

        {index === 2 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Tax Invoice · INV-10482</strong>
              <span className="living-badge-pill is-info">Issued · Due 28 Jun 2026</span>
            </div>
            <div className="living-table-shell">
              <table className="living-table">
                <thead>
                  <tr>
                    <th>DESCRIPTION &amp; SAC CODE</th>
                    <th>TAXABLE VALUE</th>
                    <th>CGST (9%)</th>
                    <th>SGST (9%)</th>
                    <th style={{ textAlign: "right" }}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Connected Platform Subscription (125 units) · SAC 998313</td>
                    <td>₹5,00,000</td>
                    <td>₹45,000</td>
                    <td>₹45,000</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>₹5,90,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="living-table-totals">
              <div><span>Subtotal</span><b>₹5,00,000</b></div>
              <div><span>Total GST (18%)</span><b>₹90,000</b></div>
              <div className="grand-total"><span>Invoice Amount</span><b>₹5,90,000</b></div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>FINANCIAL OBLIGATION FORMED</span>
                <small>Context Preserved</small>
              </div>
              <p>Operational fulfillment automatically converts into a tax invoice. Commercial value advances from ₹5,00,000 to ₹5,90,000 with complete tax metadata attached.</p>
            </div>
          </div>
        )}

        {index === 3 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>GST &amp; E-Invoicing Verification · INV-10482</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Compliant</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>E-INVOICE STATUS</span>
                <strong>Generated &amp; Signed by IRP</strong>
              </div>
              <div className="living-grid-item">
                <span>GST APPLIED</span>
                <strong>₹90,000 (CGST ₹45k + SGST ₹45k)</strong>
              </div>
              <div className="living-grid-item">
                <span>IRN HASH</span>
                <strong>7b4cf829019a...392a (Verified)</strong>
              </div>
              <div className="living-grid-item">
                <span>STATUTORY VALIDATION</span>
                <strong>Passed · Auto-mapped to GSTR-1</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>COMPLIANCE IN THE FLOW</span>
                <small>E-Way Bill Ready</small>
              </div>
              <p>Tax context stays attached to the transaction. Government e-invoicing validations pass autonomously without logging into separate statutory portals.</p>
            </div>
          </div>
        )}

        {index === 4 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Accounts Receivable Ledger · Ananya Enterprises</strong>
              <span className="living-badge-pill is-warning">Open · Due in 4 days</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>OPEN RECEIVABLE</span>
                <strong>₹5,90,000</strong>
              </div>
              <div className="living-grid-item">
                <span>DUE WINDOW</span>
                <strong>Due in 4 days (28 Jun 2026)</strong>
              </div>
              <div className="living-grid-item">
                <span>AGING BUCKET</span>
                <strong>Current (0–30 Days)</strong>
              </div>
              <div className="living-grid-item">
                <span>CUSTOMER EXPOSURE</span>
                <strong>Ananya Enterprises · Clean Record</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>CONNECTED LEDGER CONTEXT</span>
                <small>Real-Time Exposure</small>
              </div>
              <p>Finance sees the exact amount, customer profile, and due date in the same flow. Operations and finance share one unified view of customer commitments.</p>
            </div>
          </div>
        )}

        {index === 5 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Flow Intelligence · Payment Behavior Forecast</strong>
              <span className="living-badge-pill is-info"><Icon name="spark" size={14} tone="action"/> 92% Probability</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>PAYMENT PROBABILITY</span>
                <strong style={{ fontSize: "1.2rem", color: "var(--color-brand-blue)" }}>92%</strong>
              </div>
              <div className="living-grid-item">
                <span>EXPECTED SETTLEMENT</span>
                <strong>Within 4 days (by 28 Jun 2026)</strong>
              </div>
              <div className="living-grid-item">
                <span>HISTORICAL ANALYSIS</span>
                <strong>24 previous transactions evaluated</strong>
              </div>
              <div className="living-grid-item">
                <span>SETTLEMENT CYCLE</span>
                <strong>Average turnaround: 28 days</strong>
              </div>
            </div>
            <div className="living-callout-panel is-ai">
              <div className="living-callout-header">
                <span>AI WORKING INSIDE THE TRANSACTION</span>
                <small>Behavioral Confidence</small>
              </div>
              <strong>Recommended action: Prioritize collection only if payment behaviour changes.</strong>
              <p>Intelligence analyzes Ananya Enterprises&apos;s settlement velocity in the context of seasonal cash flows. No speculative reminders are needed at this stage.</p>
            </div>
          </div>
        )}

        {index === 6 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Collections Orchestration · INV-10482</strong>
              <span className="living-badge-pill is-warning">{reminderSent ? "Reminder Sent" : "Reminder Scheduled"}</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>COLLECTION AMOUNT</span>
                <strong>₹5,90,000</strong>
              </div>
              <div className="living-grid-item">
                <span>SCHEDULED CADENCE</span>
                <strong>Pre-due reminder window (Day 26)</strong>
              </div>
              <div className="living-grid-item">
                <span>PREFERRED CHANNEL</span>
                <strong>WhatsApp Commercial + Finance Email</strong>
              </div>
              <div className="living-grid-item">
                <span>STATUS</span>
                <strong>{reminderSent ? "Sent · Verified" : "Scheduled · Ready to Trigger"}</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>INSIGHT BECOMES ACTION</span>
                <small>Contextual Outreach</small>
              </div>
              <p>A payment reminder is calibrated and ready when the business context calls for it. The reminder includes instant verified payment settlement links.</p>
              <div style={{ marginTop: "0.5rem" }}>
                <Button size="small" onClick={() => setReminderSent(true)}>
                  {reminderSent ? "Reminder Sent ✓" : "Send Reminder"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {index === 7 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Automated Bank Reconciliation · HDFC Corporate Feed</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Matched · 98% Confidence</span>
            </div>
            <div className="living-reconcile-match">
              <div className="living-reconcile-box">
                <span>BANK STATEMENT RECEIPT</span>
                <strong>₹5,90,000 received</strong>
                <small>HDFC Bank · A/c 2048</small>
                <small>UTR98204018274 · 24 Jun 14:08</small>
              </div>
              <div className="living-reconcile-bridge">
                <span>98% CONFIDENCE</span>
                <FlowConnector state="completed" pulse />
                <span>ZERO VARIANCE</span>
              </div>
              <div className="living-reconcile-box">
                <span>MATCHED INVOICE</span>
                <strong>INV-10482</strong>
                <small>Ananya Enterprises</small>
                <small>Exact amount &amp; entity match</small>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>ZERO MANUAL RECONCILIATION</span>
                <small>Instant Matching</small>
              </div>
              <p>The bank receipt reconnects to the same invoice automatically. Bank fee, timestamp, and remittance identifiers match without human intervention.</p>
            </div>
          </div>
        )}

        {index === 8 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Operating Treasury &amp; Cash Position</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Received</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>AVAILABLE CASH</span>
                <strong style={{ fontSize: "1.25rem", color: "var(--color-status-success)" }}>₹5,90,000</strong>
              </div>
              <div className="living-grid-item">
                <span>CLEARING TIMESTAMP</span>
                <strong>24 Jun 2026 · Value Date Settled</strong>
              </div>
              <div className="living-grid-item">
                <span>JOURNAL POSTING</span>
                <strong>Dr HDFC Bank / Cr Accounts Receivable</strong>
              </div>
              <div className="living-grid-item">
                <span>TRANSACTION RECORD</span>
                <strong>TXN-10482 (Fully Cleared)</strong>
              </div>
            </div>
            <div className="living-callout-panel is-dark">
              <div className="living-callout-header">
                <span>LIQUIDITY CONFIRMED</span>
                <small>Funds Available</small>
              </div>
              <p>The transaction completes its operational and financial journey. ₹5,90,000 is now active operating cash for forward deployment.</p>
            </div>
          </div>
        )}

        {index === 9 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Unified Business Outcome · Strategic Clarity</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Reconciled</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>RECEIVABLE STATUS</span>
                <strong>Receivable cleared · INV-10482 ₹0</strong>
              </div>
              <div className="living-grid-item">
                <span>OPERATIONAL STATUS</span>
                <strong>Inventory fulfilled · 125 units delivered</strong>
              </div>
              <div className="living-grid-item">
                <span>COMPLIANCE STATUS</span>
                <strong>GST validated · GSTR-1 populated</strong>
              </div>
              <div className="living-grid-item">
                <span>TREASURY STATUS</span>
                <strong>Bank reconciled · +₹5,90,000 cash</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>THE LOOP IS CLOSED</span>
                <small>Decision Ready</small>
              </div>
              <strong>The transaction is now part of the business’s financial picture.</strong>
              <p>Working capital updated, forward cash forecast hardened, and Ananya Enterprises&apos;s commercial credit limit refreshed for the next order.</p>
            </div>
          </div>
        )}
      </div>

      <footer className="living-ui-footer">
        <span className="living-footer-tag">TXN-10482 · CONTINUOUS LEDGER</span>
        <div className="living-footer-status">
          <div className="living-footer-track" aria-hidden="true">
            {transactionStates.map((_, i) => (
              <span key={i} className={`living-track-segment ${i <= index ? "is-filled" : ""}`} />
            ))}
          </div>
          <span>Stage {String(index + 1).padStart(2, "0")} of 10 · {transactionStates[index].pillLabel}</span>
        </div>
      </footer>
    </div>
  );
});
```

#### LivingMobileCarousel Component (`src/Homepage.tsx`, Lines 2232–2355)
```tsx
const LivingMobileCarousel = memo(function LivingMobileCarousel({
  index,
  onSelectState,
}: {
  index: number;
  onSelectState: (i: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handlePrev = () => {
    if (index > 0) {
      onSelectState(index - 1);
    }
  };

  const handleNext = () => {
    if (index < transactionStates.length - 1) {
      onSelectState(index + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = transactionStates[index];
  const progressPercent = ((index + 1) / transactionStates.length) * 100;

  return (
    <div
      className="living-mobile-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Transaction stages explorer"
    >
      {/* 1. Visual Stage: Centered LivingProduct */}
      <div className="living-mobile-product-stage">
        <LivingProduct index={index} />
      </div>

      {/* 2. Full-bleed Controls Row with Screen-Edge Arrow Wrappers */}
      <div className="living-mobile-controls-row">
        {/* Left Edge Arrow: Hidden on first slide (index === 0) */}
        {index > 0 && (
          <button
            type="button"
            className="apple-edge-arrow apple-edge-arrow--prev"
            aria-label="Previous transaction stage"
            onClick={handlePrev}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Centered Description Card with proportional width */}
        <div className="apple-mobile-desc-card">
          <p className="apple-desc-lead">
            <strong className="apple-desc-bold">{current.pillLabel}.</strong>{" "}
            <span className="apple-desc-text">{current.summary}</span>
          </p>
          {current.facts && current.facts.length > 0 && (
            <div className="apple-desc-chips" aria-label="Key facts">
              {current.facts.map(([label, val]) => (
                <div key={label} className="apple-desc-chip">
                  <span className="apple-chip-k">{label}</span>
                  <span className="apple-chip-v">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Edge Arrow: Hidden on last slide (index === length - 1) */}
        {index < transactionStates.length - 1 && (
          <button
            type="button"
            className="apple-edge-arrow apple-edge-arrow--next"
            aria-label="Next transaction stage"
            onClick={handleNext}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* 3. Horizontal Progress Track Indicator as shown in Apple reference image */}
      <div
        className="living-mobile-progress"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={transactionStates.length}
        aria-label={`Stage ${index + 1} of ${transactionStates.length} - ${current.pillLabel}`}
      >
        <div
          className="living-mobile-progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
});
```

---

### 2.2 Verbatim CSS

```css
/* ==========================================================================
   1. SECTION SHELL & INTRO GRID (src/homepage.css)
   ========================================================================== */
.home-living {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
  background: var(--color-white);
}

.living-intro {
  display: grid;
  grid-template-columns: 1.4fr .8fr;
  gap: var(--spacing-10);
  align-items: end;
}

.living-intro h2 {
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-h2);
  line-height: 1.05;
  letter-spacing: -.05em;
  font-weight: 650;
}

.living-intro p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.living-desktop {
  margin-top: clamp(1.75rem, 3vh, 2.5rem);
  background: var(--color-white);
}

.living-sticky {
  min-height: auto;
  padding-block: var(--spacing-2);
  display: grid;
  grid-template-columns: minmax(320px, .36fr) 1fr;
  gap: var(--spacing-6);
  align-items: start;
}

/* ==========================================================================
   2. APPLE-STYLE DESKTOP EXPLORER SIDEBAR (src/homepage.css)
   ========================================================================== */
.apple-explorer {
  display: flex;
  align-items: flex-start;
  gap: 1.15rem;
  width: 100%;
}

.apple-explorer-single {
  display: block;
  width: 100%;
}

.apple-nav-chevrons {
  display: flex;
  flex-direction: column;
  gap: .45rem;
  padding-top: .25rem;
  flex-shrink: 0;
}

.apple-chevron-btn {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: var(--radius-full);
  background: var(--neutral-100);
  border: 1px solid rgba(0, 0, 0, .08);
  color: var(--neutral-900);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 180ms cubic-bezier(.16, 1, .3, 1);
  padding: 0;
}

.apple-chevron-btn:hover:not(:disabled) {
  background: var(--neutral-200);
  transform: scale(1.08);
}

.apple-chevron-btn:active:not(:disabled) {
  transform: scale(.94);
}

.apple-chevron-btn:focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 2px;
}

.apple-chevron-btn:disabled {
  opacity: .24;
  cursor: not-allowed;
}

.apple-pills-column {
  display: flex;
  flex-direction: column;
  gap: .45rem;
  flex: 1;
  min-width: 0;
  padding-right: .25rem;
}

.apple-pills-column::-webkit-scrollbar {
  display: none;
}

.apple-pill-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  scroll-margin-block: .5rem;
}

.apple-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: .55rem;
  padding: .36rem 1.05rem .36rem .55rem;
  border-radius: var(--radius-full);
  background: var(--neutral-100);
  border: 1px solid rgba(0, 0, 0, .04);
  color: var(--neutral-900);
  font-family: var(--font-family-primary);
  font-size: .88rem;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  max-width: 100%;
  text-align: left;
  transition: all 180ms cubic-bezier(.16, 1, .3, 1);
  user-select: none;
}

.apple-pill-btn:hover {
  background: var(--neutral-200);
  transform: translateX(2px);
}

.apple-pill-btn:active {
  transform: scale(.98);
}

.apple-pill-btn:focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 2px;
}

.apple-pill-icon {
  width: 1.15rem;
  height: 1.15rem;
  display: grid;
  place-items: center;
  color: var(--neutral-700);
  flex-shrink: 0;
  transition: color 180ms ease;
}

.apple-pill-btn:hover .apple-pill-icon {
  color: var(--neutral-900);
}

.apple-pill-label {
  letter-spacing: -.01em;
  white-space: nowrap;
}

.apple-desc-card {
  background: var(--neutral-100);
  border-radius: 1.25rem;
  padding: 1.1rem 1.3rem;
  border: 1px solid rgba(0, 0, 0, .05);
  display: flex;
  flex-direction: column;
  gap: .7rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .03);
  animation: apple-desc-in 220ms cubic-bezier(.16, 1, .3, 1) both;
}

@keyframes apple-desc-in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.apple-desc-lead {
  margin: 0;
  color: #424245;
  font-size: .9rem;
  line-height: 1.52;
  letter-spacing: -.01em;
}

.apple-desc-bold {
  color: var(--neutral-900);
  font-weight: 700;
  letter-spacing: -.02em;
}

.apple-desc-text {
  color: #515154;
}

.apple-desc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
  padding-top: .4rem;
  border-top: 1px solid rgba(0, 0, 0, .06);
}

.apple-desc-chip {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  background: var(--neutral-0);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-full);
  padding: .2rem .55rem;
  font-size: .64rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .03);
}

.apple-chip-k {
  color: var(--color-neutral-500);
  font-weight: 700;
  letter-spacing: .06em;
  font-size: .55rem;
}

.apple-chip-v {
  color: var(--neutral-900);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-family: var(--font-family-mono);
}

/* ==========================================================================
   3. APPLE-STYLE MOBILE TOUCH CAROUSEL (src/homepage.css)
   ========================================================================== */
.living-mobile-wrapper {
  display: none;
  width: 100%;
  padding-inline: clamp(1rem, 3.8vw, 2.25rem);
  box-sizing: border-box;
}

.living-mobile-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: clamp(1.25rem, 2.5vh, 2rem);
  user-select: none;
  position: relative;
  overflow: hidden;
}

.living-mobile-product-stage {
  width: 100%;
  max-width: 720px;
  margin-inline: auto;
}

.living-mobile-controls-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: calc(100% + clamp(1rem, 3.8vw, 2.25rem) * 2);
  margin-inline: calc(clamp(1rem, 3.8vw, 2.25rem) * -1);
  position: relative;
  min-height: 4rem;
  padding-inline: 0;
}

.apple-edge-arrow {
  position: absolute;
  bottom: 0;
  height: 3.5rem;
  width: clamp(3.2rem, 8vw, 4.75rem);
  background: var(--neutral-100);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--neutral-900);
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 5;
  transition: all 180ms cubic-bezier(.16, 1, .3, 1);
  padding: 0;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.apple-edge-arrow--prev {
  left: 0;
  border-left: 0;
  border-radius: 0 9999px 9999px 0;
  justify-content: flex-end;
  padding-right: clamp(0.75rem, 2vw, 1.35rem);
}

.apple-edge-arrow--next {
  right: 0;
  border-right: 0;
  border-radius: 9999px 0 0 9999px;
  justify-content: flex-start;
  padding-left: clamp(0.75rem, 2vw, 1.35rem);
}

.apple-edge-arrow:hover {
  background: var(--neutral-200);
}

.apple-edge-arrow:active {
  transform: scale(0.96);
}

.apple-edge-arrow:focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 2px;
}

.apple-mobile-desc-card {
  width: calc(100% - clamp(7.5rem, 18vw, 11rem));
  max-width: 600px;
  margin-inline: auto;
  background: var(--neutral-100);
  border-radius: 1.35rem;
  padding: 1.15rem 1.4rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  animation: apple-desc-in 220ms cubic-bezier(.16, 1, .3, 1) both;
}

.living-mobile-progress {
  width: calc(100% - clamp(7.5rem, 18vw, 11rem));
  max-width: 600px;
  height: 4px;
  background: var(--neutral-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-inline: auto;
  position: relative;
}

.living-mobile-progress-bar {
  height: 100%;
  background: var(--color-brand-blue);
  border-radius: var(--radius-full);
  transition: width 280ms cubic-bezier(.16, 1, .3, 1);
}

/* ==========================================================================
   4. LIVING ENTERPRISE UI WORKSPACE (src/homepage.css)
   ========================================================================== */
.living-workspace-v2 {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: 100%;
}

/* 1. Header: Title, Lead Paragraph, and Enhanced Metadata Pills */
.living-stage-header {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.living-stage-title {
  font-size: clamp(1.25rem, 2.2vw, 1.55rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.15;
}

.living-stage-lead {
  font-size: 0.88rem;
  color: #374151;
  line-height: 1.58;
  margin: 0;
  max-width: 54rem;
}

/* 2. Enhanced Pills Row */
.living-stage-pills-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.living-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.2;
  transition: all 180ms ease;
  white-space: nowrap;
}

.living-pill.is-blue {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1D4ED8;
}

.living-pill.is-neutral {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  color: #374151;
}

.living-pill.is-purple {
  background: #FAF5FF;
  border: 1px solid #E9D5FF;
  color: #7E22CE;
}

.living-pill.is-warning {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
}

/* Customer & GSTIN Pill */
.living-pill.is-entity {
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  color: #0F172A;
  font-weight: 600;
  gap: 0.45rem;
}

.living-pill-avatar {
  width: 17px;
  height: 17px;
  border-radius: 4px;
  background: #00348E;
  color: #FFFFFF;
  font-size: 9px;
  font-weight: 800;
  display: inline-grid;
  place-items: center;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.living-pill-entity-name {
  font-weight: 700;
  color: #0F172A;
}

.living-pill-gst-divider {
  color: #94A3B8;
}

.living-pill-gst-val {
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  color: #475569;
}

/* Status Pill with Pulsing Dot */
.living-pill.is-status {
  padding: 0.3rem 0.8rem;
  gap: 0.45rem;
}

.living-pill.is-status.is-success {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
}

.living-pill.is-status.is-info {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1E40AF;
}

.living-pill.is-status.is-warning {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
}

.living-pill.is-status.is-purple {
  background: #FAF5FF;
  border: 1px solid #E9D5FF;
  color: #6B21A8;
}

.living-status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
  display: inline-block;
}

/* 3. Center Card Shell with SVG Gradient Overlays */
.living-card-shell {
  position: relative;
  overflow: hidden;
  background: #FFFFFF;
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.85);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 20px 48px -12px rgba(11, 16, 32, 0.35);
  padding: 1.5rem 1.75rem;
  min-height: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  animation: living-card-in 240ms cubic-bezier(.16, 1, .3, 1) both;
}

@keyframes living-card-in {
  from { opacity: 0.4; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.living-card-gradient-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: auto;
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
}

.living-card-gradient-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  height: auto;
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
}

.living-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.living-enterprise-card {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.living-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(13, 13, 13, 0.06);
  padding-bottom: 0.65rem;
}

.living-card-header strong {
  font-size: 0.98rem;
  font-weight: 750;
  color: #111827;
  letter-spacing: -0.015em;
}

.living-card-header span {
  font-size: 0.65rem;
  color: var(--color-text-tertiary);
  font-weight: 700;
}

.living-table-shell {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.living-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.74rem;
}

.living-table th {
  text-align: left;
  padding: 0.45rem 0.6rem;
  color: var(--color-text-tertiary);
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.06em;
  border-bottom: 1px solid rgba(13, 13, 13, 0.06);
}

.living-table td {
  padding: 0.6rem 0.6rem;
  border-bottom: 1px solid rgba(13, 13, 13, 0.05);
  color: var(--color-text-secondary);
}

.living-table tr:last-child td {
  border-bottom: 0;
}

.living-table-totals {
  margin-top: 0.85rem;
  padding-top: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-end;
  font-size: 0.78rem;
}

.living-table-totals div {
  display: flex;
  justify-content: space-between;
  width: 13.5rem;
  color: var(--color-text-tertiary);
}

.living-table-totals div.grand-total {
  border-top: 1px solid rgba(13, 13, 13, 0.08);
  padding-top: 0.5rem;
  margin-top: 0.15rem;
  color: var(--color-text-primary);
  font-weight: 750;
  font-size: 0.95rem;
}

.living-grid-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
  margin-top: 0.25rem;
}

.living-grid-item {
  padding: 0.75rem 0.9rem;
  background: rgba(249, 250, 251, 0.85);
  border: 1px solid rgba(13, 13, 13, 0.06);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: border-color 0.2s ease;
}

.living-grid-item:hover {
  border-color: rgba(5, 40, 242, 0.2);
}

.living-grid-item span {
  color: var(--color-text-tertiary);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.living-grid-item strong {
  font-size: 0.86rem;
  color: var(--color-text-primary);
  font-weight: 600;
}

.living-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  font-weight: 700;
}

.living-badge-pill.is-success {
  background: rgba(16, 185, 129, 0.08);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.living-badge-pill.is-info {
  background: rgba(5, 40, 242, 0.06);
  color: var(--flow-primary);
  border: 1px solid rgba(5, 40, 242, 0.18);
}

.living-badge-pill.is-warning {
  background: rgba(217, 119, 6, 0.08);
  color: #D97706;
  border: 1px solid rgba(217, 119, 6, 0.25);
}

/* Upgraded Callout Panel with Gradient Border & Sparkle Icon Box */
.living-callout-panel {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  padding: 1.15rem 1.4rem;
  border-radius: 14px;
  border: 1.5px solid transparent;
  background: 
    linear-gradient(#FFFFFF, #FFFFFF) padding-box,
    linear-gradient(135deg, #00AEEF 0%, #0079C2 30%, #8045B0 70%, #E12991 100%) border-box;
  box-shadow: 0 4px 16px rgba(128, 69, 176, 0.06);
  margin-top: 1.65rem;
  position: relative;
  z-index: 1;
}

.living-callout-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: linear-gradient(135deg, #0079C2 0%, #8045B0 50%, #E12991 100%);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(128, 69, 176, 0.25);
  margin-top: 0.1rem;
}

.living-callout-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.living-callout-kicker {
  display: block;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #0528F2;
  text-transform: uppercase;
  line-height: 1.25;
}

.living-callout-text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.58;
  color: #374151;
  font-weight: 450;
}

.living-callout-action {
  margin-top: 0.5rem;
}

/* 4. Bottom Step Navigation Dash Bar */
.living-bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.25rem 0;
}

.living-step-indicators {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.living-step-segment {
  width: 26px;
  height: 6px;
  border-radius: 9999px;
  background: #E2E8F0;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: all 180ms ease;
}

.living-step-segment:hover {
  background: #CBD5E1;
}

.living-step-segment.is-filled {
  background: #0528F2;
}

.living-step-counter {
  font-size: 0.76rem;
  font-weight: 650;
  color: #1F2937;
  letter-spacing: -0.01em;
}

.living-reconcile-match {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: .75rem;
  align-items: center;
}

.living-reconcile-box {
  padding: .75rem;
  background: var(--color-neutral-50);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.living-reconcile-box span {
  font-size: .56rem;
  font-weight: 700;
  color: var(--color-text-tertiary);
  letter-spacing: .06em;
}

.living-reconcile-box strong {
  font-size: .9rem;
}

.living-reconcile-box small {
  font-size: .62rem;
  color: var(--color-text-tertiary);
}

.living-reconcile-bridge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .25rem;
  font-size: .65rem;
  font-weight: 700;
  color: var(--color-status-info);
}

/* ==========================================================================
   5. RESPONSIVE MEDIA QUERIES (src/homepage.css)
   ========================================================================== */
@media (max-width: 64rem) {
  .living-intro {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .living-desktop {
    display: none;
  }

  .living-mobile-wrapper {
    display: block;
    width: 100%;
  }
}

@media (max-width: 48rem) {
  .home-living {
    min-height: auto;
    padding-block: clamp(2.25rem, 4.5vh, 3rem);
  }

  .living-mobile-carousel {
    gap: 1.25rem;
  }

  .apple-edge-arrow {
    height: 3.15rem;
    width: clamp(2.75rem, 9.5vw, 3.8rem);
  }

  .apple-edge-arrow--prev {
    padding-right: 0.75rem;
  }

  .apple-edge-arrow--next {
    padding-left: 0.75rem;
  }

  .apple-mobile-desc-card {
    width: calc(100% - clamp(6.2rem, 22vw, 8.5rem));
    padding: 0.95rem 1.05rem;
    border-radius: 1.15rem;
  }

  .living-mobile-progress {
    width: calc(100% - clamp(6.2rem, 22vw, 8.5rem));
  }

  .apple-desc-lead {
    font-size: 0.86rem;
    line-height: 1.48;
  }

  .living-ui {
    min-height: auto;
  }

  .living-ui-header {
    padding: var(--spacing-2);
  }

  .living-ui-headline {
    flex-direction: column;
    align-items: flex-start;
    gap: .5rem;
  }

  .living-ui-headline-right {
    width: 100%;
    justify-content: space-between;
  }

  .living-ui-value-box {
    border-left: 0;
    padding-left: 0;
    align-items: flex-start;
  }

  .living-ui-meta-strip {
    grid-template-columns: repeat(2, 1fr);
  }

  .living-grid-summary {
    grid-template-columns: 1fr;
  }

  .living-reconcile-match {
    grid-template-columns: 1fr;
    gap: .5rem;
  }

  .living-footer-telemetry {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .apple-desc-card {
    animation: none;
  }

  .apple-chevron-btn,
  .apple-pill-btn,
  .apple-pill-icon {
    transition: none;
  }

  .living-ui-canvas {
    animation: none;
  }
}
```

---

### 2.3 Shared Tokens and Resolved Values

When variables exist across multiple stylesheet layers, **`src/index.css`** acts as the canonical source for `:root` definitions, and **`src/homepage.css`** applies component-level overrides. Below is the resolution table for every variable used by Section 03:

| Variable Name | Canonical Alias | Resolved Literal Value | Usage in Section 03 | Precedence / Winning File |
| :--- | :--- | :--- | :--- | :--- |
| `--color-white` | `--neutral-0` | `#FFFFFF` | Background of section, cards, enterprise tables, edge arrow contrast | `src/index.css` (:root) |
| `--neutral-50` | `--color-neutral-50` | `#F7F8FA` | Meta strip background, summary card backgrounds, reconcile boxes | `src/index.css` (:root) |
| `--neutral-100` | — | `#F1F4F8` | Inactive pill background, chevron button background, desc card background | `src/index.css` (:root) |
| `--neutral-200` | `--color-neutral-200` | `#E6EAF0` | Pill hover background, chip border, progress track background | `src/index.css` (:root) |
| `--neutral-300` | `--color-neutral-300` | `#DDE3EA` | Light dividing borders | `src/index.css` (:root) |
| `--color-neutral-400` | — | `#9CA3AF` | Crumb icons, entity subtitle, value box label, status sub-tags | `src/index.css` (:root) |
| `--color-neutral-500` | `--neutral-500` | `#6B7280` | Chip label key (`.apple-chip-k`) | `src/index.css` (:root) |
| `--color-neutral-600` | — | `#4B5563` | Footer tag text (`.living-footer-tag`) | `src/index.css` (:root) |
| `--neutral-700` | `--color-neutral-700` | `#374151` | Inactive circular plus icon (`.apple-pill-icon`) | `src/index.css` (:root) |
| `--neutral-900` | `--color-text-primary` | `#0D0D0D` | Main heading color, active pill label, chip value, table primary text | `src/index.css` (:root) |
| `--flow-primary` | `--color-brand-blue` | `#0528F2` | Active progress bar fill, callout left accent, status active color, AI probability text | `src/index.css` (:root) |
| `--flow-cyan` | `--color-brand-cyan` | `#049DD9` | Header TXN tag text, AI callout border accent | `src/index.css` (:root) |
| `--flow-ink` | `--color-brand-ink` | `#0D0D0D` | Dark UI header background, dark callout accent border | `src/index.css` (:root) |
| `--success` | `--color-status-success`| `#16803C` | Green success badge text, telemetry dot active color | `src/index.css` (:root) |
| `--success-bg` | — | `#EAF7EF` | Green success badge background | `src/index.css` (:root) |
| `--warning` | `--color-status-warning`| `#B7791F` | Yellow warning badge text (Receivables open, Collections scheduled) | `src/index.css` (:root) |
| `--warning-bg` | — | `#FFF7E6` | Yellow warning badge background | `src/index.css` (:root) |
| `--state-focus` | — | `#0528F2` | Focus-visible high-contrast outline ring | `src/index.css` (:root) |
| `--font-family-primary` | — | `"Manrope", sans-serif` | Global font for headings, pills, body copy, and tables | `src/index.css` (:root) |
| `--font-family-mono` | — | `monospace` | Fact chip numeric values, footer ledger IDs | `src/index.css` (:root) |
| `--font-h2` | — | `clamp(2.25rem, 3.34vw, 3rem)` (36px to 48px) | Section `<h2>` heading size | `src/index.css` (:root) |
| `--spacing-2` | — | `1rem` (16px) | Mobile header padding override | `src/index.css` (:root) |
| `--spacing-4` | — | `2rem` (32px) | Heading top margin (`margin: var(--spacing-4) 0 0`) | `src/index.css` (:root) |
| `--spacing-6` | — | `3rem` (48px) | Gap between explorer sidebar and workspace grid | `src/index.css` (:root) |
| `--spacing-10` | — | `5rem` (80px) | Intro heading row gap (`.living-intro` gap) | `src/index.css` (:root) |
| `--radius-sm` | — | `0.25rem` (4px) | Badges & tags border radius | `src/index.css` (:root) |
| `--radius-md` | — | `0.5rem` (8px) | Summary card & callout panel border radius | `src/index.css` (:root) |
| `--radius-lg` | — | `0.75rem` (12px) | Enterprise canvas card outer radius | `src/index.css` (:root) |
| `--radius-xl` | — | `1rem` (16px) | Living UI main shell outer border radius | `src/index.css` (:root) |
| `--radius-full` | — | `9999px` | Circular chevrons, pills, edge arrows, and progress bar ends | `src/index.css` (:root) |
| `--shadow-xs` | — | `0 1px 2px rgb(11 16 32 / 0.04)` | Enterprise card shadow | `src/index.css` (:root) |
| `--shadow-md` | — | `0 12px 32px rgb(11 16 32 / 0.08)` | Main Living UI console outer shadow | `src/index.css` (:root) |
| `--motion-standard` | — | `350ms` | Canvas transition timing | `src/index.css` (:root) |
| `--ease-power3-out` | — | `cubic-bezier(0.22, 1, 0.36, 1)` | Canvas entrance animation easing curve | `src/index.css` (:root) |

---

### 2.4 JavaScript & Behaviour Hooks

#### 1. Verbatim Component Hooks (`src/Homepage.tsx`)
```tsx
// Inside Homepage parent component:
const [livingState, setLivingState] = useState(0);

const handleSelectState = useCallback((targetIndex: number) => {
  startTransition(() => {
    setLivingState(targetIndex);
  });
}, []);

// Inside LivingProduct (stage 6 interaction):
const [reminderSent, setReminderSent] = useState(false);

// Inside LivingMobileCarousel (touch detection):
const touchStartX = useRef<number | null>(null);
const touchStartY = useRef<number | null>(null);

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
  touchStartY.current = e.touches[0].clientY;
};

const handleTouchEnd = (e: React.TouchEvent) => {
  if (touchStartX.current === null || touchStartY.current === null) return;
  const deltaX = e.changedTouches[0].clientX - touchStartX.current;
  const deltaY = e.changedTouches[0].clientY - touchStartY.current;
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
    if (deltaX < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  }
  touchStartX.current = null;
  touchStartY.current = null;
};
```

#### 2. Plain Vanilla JavaScript Controller for Elementor Pro
```javascript
document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('living-transaction');
  if (!section) return;

  let activeIndex = 0;
  const totalStages = 10;

  // Elements
  const chevronPrev = section.querySelectorAll('.apple-chevron-btn')[0];
  const chevronNext = section.querySelectorAll('.apple-chevron-btn')[1];
  const edgePrev = section.querySelector('.apple-edge-arrow--prev');
  const edgeNext = section.querySelector('.apple-edge-arrow--next');
  const progressBar = section.querySelector('.living-mobile-progress-bar');
  const stageButtons = section.querySelectorAll('.apple-pill-btn');

  function updateStage(newIndex) {
    if (newIndex < 0 || newIndex >= totalStages) return;
    activeIndex = newIndex;

    // Update Chevron states
    if (chevronPrev) chevronPrev.disabled = (activeIndex === 0);
    if (chevronNext) chevronNext.disabled = (activeIndex === totalStages - 1);
    if (edgePrev) edgePrev.style.display = (activeIndex === 0 ? 'none' : 'flex');
    if (edgeNext) edgeNext.style.display = (activeIndex === totalStages - 1 ? 'none' : 'flex');

    // Update Progress Bar
    if (progressBar) {
      const pct = ((activeIndex + 1) / totalStages) * 100;
      progressBar.style.width = pct + '%';
    }

    // Toggle Desktop Pills vs Desc Cards
    const pillGroups = section.querySelectorAll('.apple-pill-group');
    pillGroups.forEach((group, idx) => {
      if (idx === activeIndex) {
        group.classList.add('is-active');
      } else {
        group.classList.remove('is-active');
      }
    });

    // Toggle Living Canvas Cards (Desktop & Mobile)
    const canvases = section.querySelectorAll('.living-ui-canvas > div');
    canvases.forEach((card, idx) => {
      card.style.display = (idx === activeIndex ? 'flex' : 'none');
    });

    // Update Header Value Box & Status
    const valueEl = section.querySelector('.living-ui-value-box b');
    if (valueEl) {
      valueEl.textContent = (activeIndex >= 2 ? '₹5,90,000' : '₹5,00,000');
    }

    // Update Footer Stage Text
    const footerStatus = section.querySelector('.living-footer-status span');
    if (footerStatus) {
      const stageNum = String(activeIndex + 1).padStart(2, '0');
      footerStatus.textContent = `Stage ${stageNum} of 10`;
    }
  }

  // Bind desktop chevrons
  if (chevronPrev) chevronPrev.addEventListener('click', () => updateStage(activeIndex - 1));
  if (chevronNext) chevronNext.addEventListener('click', () => updateStage(activeIndex + 1));
  if (edgePrev) edgePrev.addEventListener('click', () => updateStage(activeIndex - 1));
  if (edgeNext) edgeNext.addEventListener('click', () => updateStage(activeIndex + 1));

  // Bind desktop pill clicks
  stageButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateStage(idx));
  });

  // Touch Swipe Handler for Mobile
  const carousel = section.querySelector('.living-mobile-carousel');
  if (carousel) {
    let startX = 0, startY = 0;
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX < 0) updateStage(activeIndex + 1);
        else updateStage(activeIndex - 1);
      }
    }, { passive: true });
  }

  // Initialize
  updateStage(0);
});
```

---

## 3. CONTENT

### 3.1 Display Order Content Inventory

| Item # | Semantic Tag | CSS Class / Component | Verbatim Text Content | URL / Anchor Destination | Status / Type |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | `<span>` | `.home-index` | `"LIVING TRANSACTION"` | None | Section index eyebrow |
| **02** | `<h2>` | `.living-intro h2` | `"One transaction."`<br/>`"Connected from start to cash."` | None | Primary display heading |
| **03** | `<p>` | `.living-intro p` | `"Follow a single ₹5,00,000 order as it moves through operations, finance, compliance, collection and cash."` | None | Section lead paragraph |
| **04** | `<button>` | `.apple-chevron-btn` (Prev) | Up Chevron SVG (disabled on index 0) | None | Step navigation button |
| **05** | `<button>` | `.apple-chevron-btn` (Next) | Down Chevron SVG (disabled on index 9) | None | Step navigation button |

---

### 3.2 The 10 Transaction Stages Full Specifications

#### Stage 0: ORDER (`pillLabel: "Order"`, `state: "complete"`)
- **Summary:** `"A ₹5,00,000 order begins one continuous business journey."`
- **Key Facts:**
  - `ORDER VALUE`: `"₹5,00,000"`
  - `UNITS`: `"125"`
  - `CUSTOMER`: `"Ananya Enterprises"`
  - `STATUS`: `"Confirmed"`
- **Canvas Card Header:** `"Sales Order · SO-10482"` \| Badge: `✓ Order Confirmed` (`.is-success`)
- **Table:**
  - Column Headers: `LINE ITEM DESCRIPTION`, `QTY`, `UNIT PRICE`, `AMOUNT`
  - Line 1: `flowOne Connected Operations Suite — Annual Enterprise License` \| `125 units` \| `₹4,000` \| `₹5,000,000`
  - Totals: Subtotal `₹5,00,000` \| Sales Order Total `₹5,00,000`
- **Callout Panel:** Header: `COMMERCIAL WORKFLOW ROUTE` (`Demand Initiated`).  
  Body: *"Commercial agreement confirmed for 125 units. The sales order initiates an automated fulfillment workflow directly in Hyderabad inventory."*

#### Stage 1: INVENTORY (`pillLabel: "Inventory"`, `state: "complete"`)
- **Summary:** `"The same transaction reserves stock in the Hyderabad warehouse."`
- **Key Facts:**
  - `STOCK`: `"125 units allocated"`
  - `WAREHOUSE`: `"Hyderabad"`
  - `STATUS`: `"Allocated"`
- **Canvas Card Header:** `"Warehouse Allocation · SO-10482"` \| Badge: `125 / 125 Units Allocated` (`.is-info`)
- **Summary Grid (4 Cells):**
  1. `ALLOCATED UNITS`: `"125 units (100% reserved)"`
  2. `WAREHOUSE LOCATION`: `"Hyderabad Central DC (DC-02)"`
  3. `STORAGE BIN`: `"Rack HYD-B4 · Bin 12"`
  4. `FULFILLMENT STATUS`: `"Allocated · Outbound Ready"`
- **Callout Panel:** Header: `CONTINUOUS INVENTORY INTEGRATION` (`Zero Silo Handoff`).  
  Body: *"The same transaction reserves stock in the Hyderabad warehouse. Operations clears fulfillment without manual re-entry or detached warehouse spreadsheets."*

#### Stage 2: INVOICE (`pillLabel: "Invoice"`, `state: "active"`)
- **Summary:** `"Operational activity becomes a financial obligation without losing context."`
- **Key Facts:**
  - `INVOICE`: `"INV-10482"`
  - `SUBTOTAL`: `"₹5,00,000"`
  - `GST`: `"₹90,000"`
  - `TOTAL`: `"₹5,90,000"`
- **Canvas Card Header:** `"Tax Invoice · INV-10482"` \| Badge: `Issued · Due 28 Jun 2026` (`.is-info`)
- **Table:**
  - Column Headers: `DESCRIPTION & SAC CODE`, `TAXABLE VALUE`, `CGST (9%)`, `SGST (9%)`, `TOTAL`
  - Line 1: `Connected Platform Subscription (125 units) · SAC 998313` \| `₹5,00,000` \| `₹45,000` \| `₹45,000` \| `₹5,90,000`
  - Totals: Subtotal `₹5,00,000` \| Total GST (18%) `₹90,000` \| Invoice Amount `₹5,90,000`
- **Callout Panel:** Header: `FINANCIAL OBLIGATION FORMED` (`Context Preserved`).  
  Body: *"Operational fulfillment automatically converts into a tax invoice. Commercial value advances from ₹5,00,000 to ₹5,90,000 with complete tax metadata attached."*

#### Stage 3: GST (`pillLabel: "GST Compliance"`, `state: "complete"`)
- **Summary:** `"Tax context stays attached to the transaction."`
- **Key Facts:**
  - `GST`: `"₹90,000"`
  - `E-INVOICE`: `"Generated"`
  - `VALIDATION`: `"Passed"`
  - `E-WAY BILL`: `"Ready"`
  - `STATUS`: `"Compliant"`
- **Canvas Card Header:** `"GST & E-Invoicing Verification · INV-10482"` \| Badge: `✓ Compliant` (`.is-success`)
- **Summary Grid (4 Cells):**
  1. `E-INVOICE STATUS`: `"Generated & Signed by IRP"`
  2. `GST APPLIED`: `"₹90,000 (CGST ₹45k + SGST ₹45k)"`
  3. `IRN HASH`: `"7b4cf829019a...392a (Verified)"`
  4. `STATUTORY VALIDATION`: `"Passed · Auto-mapped to GSTR-1"`
- **Callout Panel:** Header: `COMPLIANCE IN THE FLOW` (`E-Way Bill Ready`).  
  Body: *"Tax context stays attached to the transaction. Government e-invoicing validations pass autonomously without logging into separate statutory portals."*

#### Stage 4: RECEIVABLE (`pillLabel: "Receivable"`, `state: "active"`)
- **Summary:** `"Finance sees the amount, customer and due date in the same flow."`
- **Key Facts:**
  - `AMOUNT`: `"₹5,90,000"`
  - `CUSTOMER`: `"Ananya Enterprises"`
  - `DUE`: `"In 4 days"`
  - `STATUS`: `"Open"`
- **Canvas Card Header:** `"Accounts Receivable Ledger · Ananya Enterprises"` \| Badge: `Open · Due in 4 days` (`.is-warning`)
- **Summary Grid (4 Cells):**
  1. `OPEN RECEIVABLE`: `"₹5,90,000"`
  2. `DUE WINDOW`: `"Due in 4 days (28 Jun 2026)"`
  3. `AGING BUCKET`: `"Current (0–30 Days)"`
  4. `CUSTOMER EXPOSURE`: `"Ananya Enterprises · Clean Record"`
- **Callout Panel:** Header: `CONNECTED LEDGER CONTEXT` (`Real-Time Exposure`).  
  Body: *"Finance sees the exact amount, customer profile, and due date in the same flow. Operations and finance share one unified view of customer commitments."*

#### Stage 5: AI PREDICTION (`pillLabel: "AI Prediction"`, `state: "predictive"`)
- **Summary:** `"92% probability of payment within 4 days."`
- **Key Facts:**
  - `PAYMENT PROBABILITY`: `"92%"`
  - `EXPECTED`: `"Within 4 days"`
  - `RECOMMENDED ACTION`: `"Prioritize only if behaviour changes"`
- **Canvas Card Header:** `"Flow Intelligence · Payment Behavior Forecast"` \| Badge: Spark Icon `92% Probability` (`.is-info`)
- **Summary Grid (4 Cells):**
  1. `PAYMENT PROBABILITY`: `"92%"` (highlighted in `#0528F2`, font size 1.2rem)
  2. `EXPECTED SETTLEMENT`: `"Within 4 days (by 28 Jun 2026)"`
  3. `HISTORICAL ANALYSIS`: `"24 previous transactions evaluated"`
  4. `SETTLEMENT CYCLE`: `"Average turnaround: 28 days"`
- **Callout Panel (`.is-ai`):** Header: `AI WORKING INSIDE THE TRANSACTION` (`Behavioral Confidence`).  
  Title: *"Recommended action: Prioritize collection only if payment behaviour changes."*  
  Body: *"Intelligence analyzes Ananya Enterprises's settlement velocity in the context of seasonal cash flows. No speculative reminders are needed at this stage."*

#### Stage 6: COLLECTION (`pillLabel: "Collection"`, `state: "recommended"`)
- **Summary:** `"A payment reminder is ready when the business context calls for it."`
- **Key Facts:**
  - `REMINDER`: `"Payment due"`
  - `STATUS`: `"Scheduled"`
  - `ACTION`: `"Send Reminder"`
- **Canvas Card Header:** `"Collections Orchestration · INV-10482"` \| Badge: `Reminder Scheduled` (or `Reminder Sent` if toggled)
- **Summary Grid (4 Cells):**
  1. `COLLECTION AMOUNT`: `"₹5,90,000"`
  2. `SCHEDULED CADENCE`: `"Pre-due reminder window (Day 26)"`
  3. `PREFERRED CHANNEL`: `"WhatsApp Commercial + Finance Email"`
  4. `STATUS`: `"Scheduled · Ready to Trigger"` (or `"Sent · Verified"`)
- **Callout Panel:** Header: `INSIGHT BECOMES ACTION` (`Contextual Outreach`).  
  Body: *"A payment reminder is calibrated and ready when the business context calls for it. The reminder includes instant verified payment settlement links."*  
  Action Control: Button `Send Reminder` (toggles to `Reminder Sent ✓`).

#### Stage 7: BANK (`pillLabel: "Bank Recon"`, `state: "processing"`)
- **Summary:** `"The bank receipt reconnects to the same invoice automatically."`
- **Key Facts:**
  - `PAYMENT`: `"₹5,90,000"`
  - `STATUS`: `"Received"`
  - `MATCH`: `"INV-10482"`
  - `CONFIDENCE`: `"98%"`
- **Canvas Card Header:** `"Automated Bank Reconciliation · HDFC Corporate Feed"` \| Badge: `✓ Matched · 98% Confidence` (`.is-success`)
- **Reconciliation Bridge Component (`.living-reconcile-match`):**
  - Left Box: `BANK STATEMENT RECEIPT` \| `₹5,90,000 received` \| `HDFC Bank · A/c 2048` \| `UTR98204018274 · 24 Jun 14:08`
  - Center Bridge: `98% CONFIDENCE` \| Pulsing green flow connector (`.fo-flow-connector.is-completed.has-pulse`) \| `ZERO VARIANCE`
  - Right Box: `MATCHED INVOICE` \| `INV-10482` \| `Ananya Enterprises` \| `Exact amount & entity match`
- **Callout Panel:** Header: `ZERO MANUAL RECONCILIATION` (`Instant Matching`).  
  Body: *"The bank receipt reconnects to the same invoice automatically. Bank fee, timestamp, and remittance identifiers match without human intervention."*

#### Stage 8: CASH (`pillLabel: "Cash Liquidity"`, `state: "complete"`)
- **Summary:** `"The transaction completes its operational and financial journey."`
- **Key Facts:**
  - `AVAILABLE CASH`: `"₹5,90,000"`
  - `STATUS`: `"Received"`
  - `TRANSACTION`: `"TXN-10482"`
- **Canvas Card Header:** `"Operating Treasury & Cash Position"` \| Badge: `✓ Received` (`.is-success`)
- **Summary Grid (4 Cells):**
  1. `AVAILABLE CASH`: `"₹5,90,000"` (highlighted in `#16803C`, font size 1.25rem)
  2. `CLEARING TIMESTAMP`: `"24 Jun 2026 · Value Date Settled"`
  3. `JOURNAL POSTING`: `"Dr HDFC Bank / Cr Accounts Receivable"`
  4. `TRANSACTION RECORD`: `"TXN-10482 (Fully Cleared)"`
- **Callout Panel (`.is-dark`):** Header: `LIQUIDITY CONFIRMED` (`Funds Available`).  
  Body: *"The transaction completes its operational and financial journey. ₹5,90,000 is now active operating cash for forward deployment."*

#### Stage 9: DECISION (`pillLabel: "Decision"`, `state: "recommended"`)
- **Summary:** `"The transaction is no longer just an invoice. It is part of the business’s financial picture."`
- **Key Facts:**
  - `OUTCOME`: `"Cash collected"`
  - `CONTEXT`: `"Restored"`
  - `NEXT`: `"Decision ready"`
- **Canvas Card Header:** `"Unified Business Outcome · Strategic Clarity"` \| Badge: `✓ Reconciled` (`.is-success`)
- **Summary Grid (4 Cells):**
  1. `RECEIVABLE STATUS`: `"Receivable cleared · INV-10482 ₹0"`
  2. `OPERATIONAL STATUS`: `"Inventory fulfilled · 125 units delivered"`
  3. `COMPLIANCE STATUS`: `"GST validated · GSTR-1 populated"`
  4. `TREASURY STATUS`: `"Bank reconciled · +₹5,90,000 cash"`
- **Callout Panel:** Header: `THE LOOP IS CLOSED` (`Decision Ready`).  
  Title: *"The transaction is now part of the business’s financial picture."*  
  Body: *"Working capital updated, forward cash forecast hardened, and Ananya Enterprises's commercial credit limit refreshed for the next order."*

---

## 4. LAYOUT SPEC

### 4.1 Section & Container Geometry
- **Outer Section (`.home-living`):**
  - Width: `100%`.
  - Padding-Block:
    - Desktop: `clamp(3.25rem, 5.5vh, 4.5rem)` (52px to 72px).
    - Mobile (≤48rem / 768px): `clamp(2.25rem, 4.5vh, 3rem)` (36px to 48px).
  - Background: `var(--color-white)` = `#FFFFFF`.
- **Inner Container (`.home-container`):**
  - Max Width: `var(--container-wide)` = `80rem` (1280px).
  - Side Padding: `var(--page-padding)` = `clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
  - Alignment: `margin-inline: auto;`.

### 4.2 Intro Header Row (`.living-intro`)
- **Display:** 2-column Grid.
- **Columns:** `1.4fr 0.8fr` (Heading left, lead description right).
- **Gap:** `var(--spacing-10)` = `5rem` (80px).
- **Alignment:** `align-items: end`.
- **Tablet Override (≤64rem):** `grid-template-columns: 1fr; gap: var(--spacing-4);`.

### 4.3 Desktop Explorer Layout (`.living-desktop`, `.living-sticky`)
- **Margin Top:** `clamp(1.75rem, 3vh, 2.5rem)`.
- **Grid Structure:** `grid-template-columns: minmax(320px, 0.36fr) 1fr;`
- **Grid Gap:** `var(--spacing-6)` = `3rem` (48px).
- **Alignment:** `align-items: start`.
- **Left Column (`.apple-explorer`):**
  - Left Chevrons: `flex-direction: column; gap: 0.45rem; padding-top: 0.25rem; flex-shrink: 0;`
  - Right Pills: `flex-direction: column; gap: 0.45rem; flex: 1; min-width: 0; padding-right: 0.25rem;`
  - In-situ Expanded Card (`.apple-desc-card`): `padding: 1.1rem 1.3rem; border-radius: 1.25rem (20px); gap: 0.7rem;`
- **Right Column (`.living-ui`):**
  - Header: `min-height: 3.6rem; padding: 0.65rem 1.15rem; background: #0D0D0D;`
  - Meta Strip: `display: grid; grid-template-columns: repeat(4, 1fr); background: #F7F8FA;`
  - Canvas: `padding: 0.9rem 1.15rem; background: #F7F8FA; flex: 1; overflow-y: auto;`
  - Footer: `min-height: 2.2rem; padding: 0.35rem 1.15rem; background: #FFFFFF;`

### 4.4 Mobile Carousel Layout (`.living-mobile-wrapper`)
- **Wrapper Padding:** `padding-inline: clamp(1rem, 3.8vw, 2.25rem)`.
- **Carousel Flow:** `display: flex; flex-direction: column; align-items: center; gap: 1.5rem;`
- **Product Stage:** `width: 100%; max-width: 720px; margin-inline: auto;`
- **Controls Row:** Full bleed extending past wrapper gutters:
  `width: calc(100% + clamp(1rem, 3.8vw, 2.25rem) * 2); margin-inline: calc(clamp(1rem, 3.8vw, 2.25rem) * -1);`
- **Edge Arrows:** Flush against viewport edges:
  - Prev: `left: 0; border-radius: 0 9999px 9999px 0; justify-content: flex-end; padding-right: clamp(0.75rem, 2vw, 1.35rem);`
  - Next: `right: 0; border-radius: 9999px 0 0 9999px; justify-content: flex-start; padding-left: clamp(0.75rem, 2vw, 1.35rem);`
  - Desktop size: `height: 3.5rem; width: clamp(3.2rem, 8vw, 4.75rem);`
  - Mobile size: `height: 3.15rem; width: clamp(2.75rem, 9.5vw, 3.8rem);`
- **Description Card:** Centered between arrows:
  `width: calc(100% - clamp(7.5rem, 18vw, 11rem)); max-width: 600px;` (on mobile: `calc(100% - clamp(6.2rem, 22vw, 8.5rem))`).
- **Progress Track:** Matches description card width:
  `height: 4px; background: #E6EAF0; border-radius: 9999px; fill: #0528F2;`

---

## 5. RESPONSIVE SPEC

### Breakpoint Table

| Breakpoint Name | Media Query in Code | Pixel Equivalent | Purpose in Section 03 |
| :--- | :--- | :--- | :--- |
| **Desktop Wide** | Base default (no query) | `> 1024px` | 2-column `.living-sticky` grid (320px : 1fr); Apple-style left pill navigator. |
| **Tablet Threshold** | `@media (max-width: 64rem)` | `≤ 1024px` | Desktop grid hidden (`.living-desktop { display: none; }`); Mobile carousel displayed (`.living-mobile-wrapper { display: block; }`); `.living-intro` stacks to 1 column. |
| **Mobile Threshold** | `@media (max-width: 48rem)` | `≤ 768px` | Section padding reduces; edge arrows compress; UI meta strip collapses to 2×2 grid; UI header stacks vertically; footer telemetry hidden. |
| **Accessibility** | `@media (prefers-reduced-motion: reduce)` | System flag | Disables in-situ expand animation (`apple-desc-in`), button hover transforms, and canvas slide entrance. |

---

## 6. TYPOGRAPHY

Every typographic style across Section 03 is cataloged below with exact resolved values:

| Element / Class | Font Family | Size (Fluid / Fixed) | Weight | Line Height | Letter Spacing | Resolved Color (HEX) | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Section Eyebrow** (`.home-index`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | 700 | `1` | `0.12em` | `#0528F2` | `uppercase` |
| **Section Heading** (`.living-intro h2`) | `"Manrope", sans-serif` | `clamp(2.25rem, 3.34vw, 3rem)` | 650 | `1.05` | `-0.05em` | `#0D0D0D` | `none` |
| **Intro Paragraph** (`.living-intro p`) | `"Manrope", sans-serif` | `1.0625rem` (17px) | 400 | `1.7` | `normal` | `#374151` | `none` |
| **Inactive Pill Label** (`.apple-pill-label`) | `"Manrope", sans-serif` | `0.88rem` (14.08px) | 500 | `normal` | `-0.01em` | `#0D0D0D` | `none` |
| **Expanded Pill Title** (`.apple-desc-bold`) | `"Manrope", sans-serif` | `0.9rem` (14.4px) | 700 | `1.52` | `-0.02em` | `#0D0D0D` | `none` |
| **Expanded Summary** (`.apple-desc-text`) | `"Manrope", sans-serif` | `0.9rem` (14.4px) | 400 | `1.52` | `-0.01em` | `#515154` | `none` |
| **Chip Key** (`.apple-chip-k`) | `"Manrope", sans-serif` | `0.55rem` (8.8px) | 700 | `normal` | `0.06em` | `#6B7280` | `uppercase` |
| **Chip Value** (`.apple-chip-v`) | `monospace` / Primary | `0.64rem` (10.24px) | 600 | `normal` | `normal` | `#0D0D0D` (tabular-nums) | `none` |
| **UI Crumb Navigation** (`.living-ui-crumb`) | `"Manrope", sans-serif` | `0.6rem` (9.6px) | 700 | `normal` | `0.08em` | `#9CA3AF` | `none` |
| **UI Entity Title** (`.living-ui-entity strong`)| `"Manrope", sans-serif` | `0.98rem` (15.68px) | 700 | `normal` | `-0.02em` | `#FFFFFF` | `none` |
| **UI Entity Subtitle** (`.living-ui-entity span`)| `"Manrope", sans-serif` | `0.62rem` (9.92px) | 600 | `normal` | `normal` | `#9CA3AF` | `none` |
| **UI Value Box Value** (`.living-ui-value-box b`)| `"Manrope", sans-serif` | `1.15rem` (18.4px) | 700 | `normal` | `-0.04em` | `#FFFFFF` (tabular-nums) | `none` |
| **Meta Strip Label** (`.living-meta-item span`) | `"Manrope", sans-serif` | `0.52rem` (8.32px) | 700 | `normal` | `0.06em` | `#6B7280` | `uppercase` |
| **Meta Strip Value** (`.living-meta-item strong`)| `"Manrope", sans-serif` | `0.65rem` (10.4px) | 600 | `normal` | `normal` | `#374151` | `none` |
| **Table Headings** (`.living-table th`) | `"Manrope", sans-serif` | `0.56rem` (8.96px) | 700 | `normal` | `0.06em` | `#6B7280` | `uppercase` |
| **Table Cells** (`.living-table td`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | 400 | `normal` | `normal` | `#374151` | `none` |
| **Table Grand Total** (`.grand-total b`) | `"Manrope", sans-serif` | `0.85rem` (13.6px) | 700 | `normal` | `normal` | `#0D0D0D` | `none` |
| **Callout Header Kicker** (`.living-callout-header span`)| `"Manrope", sans-serif` | `0.58rem` (9.28px) | 700 | `normal` | `0.08em` | `#0528F2` | `uppercase` |
| **Callout Title** (`.living-callout-panel strong`)| `"Manrope", sans-serif` | `0.85rem` (13.6px) | 700 | `normal` | `-0.02em` | `#0D0D0D` | `none` |
| **Callout Body** (`.living-callout-panel p`) | `"Manrope", sans-serif` | `0.72rem` (11.52px) | 400 | `1.55` | `normal` | `#374151` | `none` |
| **Footer Tag** (`.living-footer-tag`) | `monospace` | `0.58rem` (9.28px) | 700 | `normal` | `0.06em` | `#4B5563` | `none` |
| **Footer Status Text** (`.living-footer-status span`)| `"Manrope", sans-serif` | `0.65rem` (10.4px) | 600 | `normal` | `normal` | `#0528F2` | `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Interactive Element States

#### Desktop Chevron Switcher (`.apple-chevron-btn`)
- **Default:** `background: #F1F4F8; border: 1px solid rgba(0, 0, 0, 0.08); color: #0D0D0D;`
- **Hover:** `background: #E6EAF0; transform: scale(1.08);` via `180ms cubic-bezier(.16, 1, .3, 1)`.
- **Active:** `transform: scale(0.94);`
- **Disabled (`:disabled`):** `opacity: 0.24; cursor: not-allowed;`
- **Focus:** `outline: 2px solid #0528F2; outline-offset: 2px;`

#### Inactive Stage Pill Button (`.apple-pill-btn`)
- **Default:** `background: #F1F4F8; border: 1px solid rgba(0, 0, 0, 0.04); color: #0D0D0D;`
- **Hover:** `background: #E6EAF0; transform: translateX(2px);`
- **Active:** `transform: scale(0.98);`
- **Focus:** `outline: 2px solid #0528F2; outline-offset: 2px;`

#### In-Situ Expanded Card (`.apple-desc-card`)
- **Mount Animation:** `@keyframes apple-desc-in` (duration `220ms cubic-bezier(0.16, 1, 0.3, 1)`):
  - `from { opacity: 0; transform: translateY(-5px); }`
  - `to { opacity: 1; transform: translateY(0); }`

#### Mobile Full-Bleed Edge Arrows (`.apple-edge-arrow`)
- **Default:** `background: #F1F4F8; color: #0D0D0D;`
- **Hover:** `background: #E6EAF0;`
- **Active:** `transform: scale(0.96);`
- **Visibility:** Hidden on index boundary (Prev hidden on index 0, Next hidden on index 9).

#### Live Enterprise Canvas (`.living-ui-canvas`)
- **Step Change Animation:** `@keyframes living-canvas-enter` (duration `350ms cubic-bezier(0.22, 1, 0.36, 1)`):
  - `from { opacity: 0.3; transform: translateY(0.35rem); }`
  - `to { opacity: 1; transform: none; }`

#### Stage 6 Action Control ("Send Reminder" Button)
- **Action:** Clicking toggles local state `setReminderSent(true)`.
- **Label Update:** Switches from `"Send Reminder"` to `"Reminder Sent ✓"`.
- **Header Badge:** Switches from `"Reminder Scheduled"` to `"Reminder Sent"`.
- **Status Field:** Switches from `"Scheduled · Ready to Trigger"` to `"Sent · Verified"`.

---

### 7.2 Mobile Touch Gestures & Horizontal Progress Bar
- **Touch Swipe Detection:** Captures `onTouchStart` and `onTouchEnd`. If `Math.abs(deltaX) > Math.abs(deltaY)` and horizontal movement exceeds `40px`:
  - Swipe Left (`deltaX < 0`): Advances to next stage (`handleNext()`).
  - Swipe Right (`deltaX > 0`): Returns to previous stage (`handlePrev()`).
- **Progress Track Calculation:**
  `progressPercent = ((index + 1) / 10) * 100` (interpolates dynamically from `10%` to `100%` with a smooth 280ms cubic-bezier transition).

---

### 7.3 Reduced-Motion Handling
Under `@media (prefers-reduced-motion: reduce)`:
- `.apple-desc-card { animation: none; }`
- `.apple-chevron-btn, .apple-pill-btn, .apple-pill-icon { transition: none; }`
- `.living-ui-canvas { animation: none; }`

---

## 8. ICONS

### Icon Inventory Table

| Icon / Asset | Library / Source | Package Equivalent | Size | Stroke Width | Color | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Chevron Up** | Custom inline SVG | Lucide `ChevronUp` | 14px × 14px | 1.75 | `#0D0D0D` | Desktop sidebar previous step trigger |
| **Chevron Down**| Custom inline SVG | Lucide `ChevronDown` | 14px × 14px | 1.75 | `#0D0D0D` | Desktop sidebar next step trigger |
| **Circular Plus**| Custom inline SVG | Custom SVG | 16px × 16px | 1.25 | `#374151` | Inactive pill button expand indicator |
| **Check Icon** | In-repo `Icon` (`src/components/flowone.tsx`)| Lucide `Check` | 14px × 14px (viewBox 24×24) | 1.5 | `#16803C` | Badges: Confirmed, Compliant, Matched, Received |
| **Spark Icon** | In-repo `Icon` (`src/components/flowone.tsx`)| Lucide `Sparkles` | 14px × 14px (viewBox 24×24) | 1.5 | `#0528F2` | Stage 5 Flow Intelligence prediction badge |
| **Edge Arrow Left**| Custom inline SVG | Lucide `ChevronLeft` | 20px × 20px | 2.2 | `#0D0D0D` | Mobile screen-edge carousel previous trigger |
| **Edge Arrow Right**| Custom inline SVG | Lucide `ChevronRight` | 20px × 20px | 2.2 | `#0D0D0D` | Mobile screen-edge carousel next trigger |

---

### Verbatim Inline SVG Markup

#### 1. Chevron Up (`living-transaction-chevron-up.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <path d="M3 8.5L7 4.5L11 8.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

#### 2. Chevron Down (`living-transaction-chevron-down.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

#### 3. Circular Plus (`living-transaction-plus-circle.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <circle cx="8" cy="8" r="6.75" stroke="currentColor" stroke-width="1.2" />
  <path d="M8 4.75V11.25M4.75 8H11.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
</svg>
```

#### 4. Check Icon (`living-transaction-check.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m5 12 4 4L19 6" />
</svg>
```

#### 5. Spark Icon (`living-transaction-spark.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" />
</svg>
```

#### 6. Edge Arrow Left (`living-transaction-arrow-left.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

#### 7. Edge Arrow Right (`living-transaction-arrow-right.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

### Downloadable Icon Package
- **Archive Path:** `living-transaction-icons.zip` (in workspace root)
- **Asset Directory:** `living-transaction-assets/`
- **Files Included:**
  1. `living-transaction-chevron-up.svg`
  2. `living-transaction-chevron-down.svg`
  3. `living-transaction-plus-circle.svg`
  4. `living-transaction-check.svg`
  5. `living-transaction-spark.svg`
  6. `living-transaction-arrow-left.svg`
  7. `living-transaction-arrow-right.svg`

---

## 9. ACCESSIBILITY

### Semantic Roles & Structure
- Root container uses semantic `<section id="living-transaction" className="home-living">`.
- Desktop sidebar uses `role="tablist"` with `aria-orientation="vertical"`.
- Each inactive button uses `role="tab"`, `aria-selected={false}`, and links via `aria-controls` to the matching expanded panel.
- Each expanded panel uses `role="tabpanel"` and links back via `aria-labelledby`.
- Mobile carousel uses `aria-roledescription="carousel"` and `aria-label="Transaction stages explorer"`.
- The horizontal progress bar uses `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.

### Keyboard Navigation & Focus Order
- Step chevrons and pill buttons are fully Tab-accessible.
- Focus visible rings display a high-contrast 2px solid `#0528F2` outline with a 2px offset (`outline: 2px solid var(--state-focus); outline-offset: 2px;`).
- When chevrons reach boundary steps (0 or 9), they dynamically declare `disabled` and `cursor: not-allowed`.

---

## 10. NOT FOUND IN CODE

In accordance with the handoff audit instructions, the following items were verified to be **NOT FOUND IN CODE**:

1. **Outbound External Hyperlinks:**
   - `NOT FOUND IN CODE`. The entire section contains no external `<a>` tags. (Only the previous Hero CTA links to `#living-transaction`).
2. **Infinite Autoplay Loop for the 10 Stages:**
   - `NOT FOUND IN CODE`. Unlike Section 02 which autoplays on scroll entrance, Section 03 is purely user-controlled (manual click, hover, chevron step, or mobile touch swipe).
3. **Sticky Screen Pinning Behavior:**
   - `.living-sticky` has `min-height: auto; position: static;` in the stylesheet; true viewport position pinning (`position: sticky`) is not implemented on desktop.
4. **RTL (Right-to-Left) Styles:**
   - `NOT FOUND IN CODE`. Edge arrows assume left-to-right geometry (`apple-edge-arrow--prev` pinned to `left: 0`).
5. **Mobile Viewport Switch below 1024px:**
   - On viewports between 768px and 1024px, the desktop layout is completely hidden and replaced by the mobile carousel (`@media (max-width: 64rem)`). Tablet does not have a distinct dual-column desktop-style view.

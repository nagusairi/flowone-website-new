import React, { memo, useState, useRef } from "react";
import "./predictive-one-insight.css";

/* ==========================================================================
   flowOne Section 06 — Predictive Business Decisions
   View C: The One Insight — Editorial Intelligence Concept
   Single Coherent Surface · 3-Stage Causality Hierarchy:
   Signal → Predicted Consequence → Decision to Consider
   ========================================================================== */

export type SignalId =
  | "receivables"
  | "supplier-payments"
  | "inventory"
  | "expected-cash"
  | "collection-risk";

export interface OneInsightData {
  id: SignalId;
  name: string;
  category: string;
  entity: string;
  metric: string;
  metricLabel: string;
  
  // 1. Observed Signal
  signalStatement: string;
  signalContext: string;

  // 2. Business Consequence (Primary visual prominence)
  consequenceHeadline: string;
  consequenceExplanation: string;
  consequenceCallout: {
    label: string;
    value: string;
    impactType: "negative" | "warning" | "caution";
  };

  // 3. Decision to Consider (Actionable, grounded recommendation)
  decisionAction: string;
  decisionExplanation: string;
  decisionOutcomeBadge: string;
}

const oneInsightSignals: OneInsightData[] = [
  {
    id: "receivables",
    name: "Receivables",
    category: "Inflow Signal",
    entity: "Ananya INV-10482 · ₹5.90L",
    metric: "+15D LAG",
    metricLabel: "Day +30 → +45 Shift",
    signalStatement:
      "Collection reconciliation indicates payment for Ananya INV-10482 (₹5,90,000) will arrive 12–15 days past contractual term.",
    signalContext: "Counterparty Payment Reconciliation · 3-Cycle Historical Pattern",
    consequenceHeadline:
      "Delayed collections shift available working capital past scheduled supplier settlements.",
    consequenceExplanation:
      "The ₹5.90L collection shift compresses Day +38 operating liquidity to ₹24.8L—narrowing available cash headroom 41% below the recommended safety floor, exactly 7 days prior to mandatory vendor disbursements.",
    consequenceCallout: {
      label: "Projected Liquidity Valley",
      value: "Day +38 Cash: ₹24.8L (leaves only ₹2.8L above emergency floor)",
      impactType: "negative",
    },
    decisionAction:
      "Automate a 1.25% early-settlement incentive or execute one-click TReDS discounting.",
    decisionExplanation:
      "Offer a dynamic 1.25% early payment discount (₹7,375 net cost) for settlement within 5 days, or route invoice through TReDS discounting to advance ₹5.82L inflow to Day +28.",
    decisionOutcomeBadge:
      "Accelerates ₹5.82L to Day +28 · Eliminates Day +38 cash compression without borrowing",
  },
  {
    id: "supplier-payments",
    name: "Supplier Payments",
    category: "Payment Commitment",
    entity: "Shanti Metals PO-9201 · ₹4.50L",
    metric: "₹4.50L DUE",
    metricLabel: "Section 43B(h) Window",
    signalStatement:
      "Statutory Section 43B(h) payment of ₹4,50,000 for Shanti Metals falls due on Day +38, coinciding with bi-monthly salary disbursements.",
    signalContext: "MSME Statutory Timeline · Section 43B(h) Mandatory Window",
    consequenceHeadline:
      "Mandatory vendor payout coincides with ₹12.0L payroll drain before customer receivables clear.",
    consequenceExplanation:
      "MSME vendor settlement is non-negotiable under Section 43B(h). Paying during peak payroll week depletes operating reserves, while delaying beyond the 45-day statutory window incurs compound interest penalties at 3x RBI bank rate and forfeiture of tax deductibility.",
    consequenceCallout: {
      label: "Statutory Deadline Exposure",
      value: "Day +38 absolute cutoff to preserve 100% income tax deductibility",
      impactType: "caution",
    },
    decisionAction:
      "Prioritize MSME disbursement on Day +38 and reschedule non-statutory vendor payouts to Day +48.",
    decisionExplanation:
      "Lock the ₹4.50L MSME payout on Day +38 to protect full tax deductions and supplier standing, while rescheduling non-statutory vendor disbursements (PO-8814 ₹3.20L) until customer collections arrive.",
    decisionOutcomeBadge:
      "100% Tax Deductibility Safeguarded · Preserves ₹3.20L liquidity during peak payroll",
  },
  {
    id: "inventory",
    name: "Inventory Commitments",
    category: "Operational Commitment",
    entity: "DC-02 Warehouse Hub · ₹6.20L",
    metric: "-32% STOCK",
    metricLabel: "Safety Stock Threshold",
    signalStatement:
      "DC-02 Bhiwandi warehouse stock run reaches safety threshold (-32%), requiring a ₹6,20,000 replenishment purchase order by Day +20.",
    signalContext: "Q2 Production Line Allocation · DC-02 Bhiwandi Hub",
    consequenceHeadline:
      "A full 90-day PO locks committed capital before current batch collections arrive.",
    consequenceExplanation:
      "Releasing a single ₹6.20L PO immediately drains liquid reserves and adds avoidable warehouse holding costs, whereas zero procurement action halts manufacturing lines on Day +42 across ₹14.5L in contracted deliveries.",
    consequenceCallout: {
      label: "Operational Risk Trade-Off",
      value: "Assembly stoppage on Day +42 vs ₹6.20L premature capital lock",
      impactType: "warning",
    },
    decisionAction:
      "Issue a split consignment PO: ₹2.40L (30-day runway) now, releasing tranche 2 on confirmed collections.",
    decisionExplanation:
      "Stagger PO into a 30-day delivery tranche (₹2.40L) released immediately to safeguard 100% production uptime, releasing tranche 2 (₹3.80L) upon confirmed receipt of Ananya invoice funds.",
    decisionOutcomeBadge:
      "Zero Assembly Downtime · Preserves ₹3.80L liquid cash during critical cash valley",
  },
  {
    id: "expected-cash",
    name: "Expected Cash",
    category: "Liquidity Trajectory",
    entity: "HDFC Operating Facility · ₹42.5L",
    metric: "₹24.8L LOW",
    metricLabel: "Day +38 Reserve Valley",
    signalStatement:
      "Operating cash trajectory is projected to decline from ₹42.5L to a low of ₹24.8L on Day +38 as scheduled outflows outpace receipts.",
    signalContext: "Treasury 60-Day Forward Forecast · HDFC Main Facility",
    consequenceHeadline:
      "Available liquidity buffer tightens to within ₹2.8L of the corporate emergency reserve baseline.",
    consequenceExplanation:
      "The confluence of delayed customer collections and mandatory vendor payouts compresses liquidity headroom to near-floor levels, leaving zero margin of safety for secondary collection delays without triggering emergency overdraft.",
    consequenceCallout: {
      label: "Headroom Compression",
      value: "Liquidity contracts by 41% (Day +38 floor reaches ₹24.8L)",
      impactType: "negative",
    },
    decisionAction:
      "Activate drawing power on the pre-approved credit facility as a zero-cost standby reserve.",
    decisionExplanation:
      "Establish immediate drawing power on pre-approved bank credit facility or activate dynamic discounting across top receivables, securing a ₹15.0L safety buffer in advance with zero interest until drawdown.",
    decisionOutcomeBadge:
      "+₹15.0L Standby Buffer Secured · Zero Interest Cost Until Utilized",
  },
  {
    id: "collection-risk",
    name: "Collection Risk",
    category: "Variance Pattern",
    entity: "Enterprise Accounts Ledger",
    metric: "14-18D LAG",
    metricLabel: "Cyclical Batch Pattern",
    signalStatement:
      "Ledger variance analysis flags recurring month-end payment batching across 2 Tier-1 corporate clients totaling ₹9,10,000.",
    signalContext: "Enterprise Ledger Analysis · Accounts Receivable Volatility",
    consequenceHeadline:
      "Fixed 25th-of-month AP approval cycles create an artificial 14–18 day collection lag.",
    consequenceExplanation:
      "Enterprise clients process vendor disbursements on rigid monthly approval dates rather than contractual due dates, artificially expanding Days Sales Outstanding (DSO) by 11.4 days and driving unnecessary short-term borrowing.",
    consequenceCallout: {
      label: "Working Capital Drag",
      value: "+11.4 Days Average DSO expansion across enterprise clients",
      impactType: "warning",
    },
    decisionAction:
      "Synchronize invoice dispatch cycles to the 18th of the month to capture clients' current approval run.",
    decisionExplanation:
      "Adjust invoice dispatch from the 28th to the 18th of each month, aligning with enterprise internal AP review windows to eliminate the 15-day batching penalty without client friction.",
    decisionOutcomeBadge:
      "Eliminates 15-day batching delay · Restores DSO to baseline without commercial friction",
  },
];

export const PredictiveOneInsightView = memo(function PredictiveOneInsightView() {
  const [selectedSignalId, setSelectedSignalId] = useState<SignalId>("receivables");
  const nodeRefs = useRef<Record<SignalId, HTMLButtonElement | null>>({
    receivables: null,
    "supplier-payments": null,
    inventory: null,
    "expected-cash": null,
    "collection-risk": null,
  });

  const currentIndex = oneInsightSignals.findIndex(s => s.id === selectedSignalId);
  const currentSignal = oneInsightSignals[currentIndex] ?? oneInsightSignals[0];

  const prevSignal = currentIndex > 0 ? oneInsightSignals[currentIndex - 1] : null;
  const nextSignal = currentIndex < oneInsightSignals.length - 1 ? oneInsightSignals[currentIndex + 1] : null;

  const handleSelectPrev = () => {
    if (prevSignal) setSelectedSignalId(prevSignal.id);
  };

  const handleSelectNext = () => {
    if (nextSignal) setSelectedSignalId(nextSignal.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (index + 1 < oneInsightSignals.length) {
        const nextId = oneInsightSignals[index + 1].id;
        setSelectedSignalId(nextId);
        nodeRefs.current[nextId]?.focus();
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      if (index - 1 >= 0) {
        const prevId = oneInsightSignals[index - 1].id;
        setSelectedSignalId(prevId);
        nodeRefs.current[prevId]?.focus();
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstId = oneInsightSignals[0].id;
      setSelectedSignalId(firstId);
      nodeRefs.current[firstId]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastId = oneInsightSignals[oneInsightSignals.length - 1].id;
      setSelectedSignalId(lastId);
      nodeRefs.current[lastId]?.focus();
    }
  };

  return (
    <section
      id="predictive-one-insight"
      className="fo-one-insight-section"
      aria-label="Section: Predictive Business Decisions — View C: The One Insight"
    >
      <div className="fo-one-insight-ambient" aria-hidden="true" />

      <div className="fo-one-insight-container">
        {/* EDITORIAL HEADER & INTRO (§4) */}
        <header className="fo-one-insight-header">
          <div className="hero-eyebrow-container" style={{ marginBottom: "1.1rem" }}>
            <div className="hero-modern-eyebrow is-static" role="note" aria-label="Predictive Business Decisions">
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>PREDICTIVE</span>
              </span>
              <span className="hero-eyebrow-title">PREDICTIVE BUSINESS DECISIONS</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <h2 className="fo-one-insight-heading">
            Every signal changes <em>the bigger picture.</em>
          </h2>
          <p className="fo-one-insight-lead">
            See how changes across receivables, payments and operations can influence your financial position—and the decisions that follow.
          </p>
        </header>

        {/* 2-COLUMN COCKPIT SPLIT (§5) */}
        <div className="fo-one-insight-workspace">
          {/* ==============================================================
              LEFT COLUMN: Business Signal Selector
              ============================================================== */}
          <div className="fo-one-insight-signals-col">
            <div className="fo-signals-col-header" role="region" aria-label="Business Signals Header">
              <span className="fo-signals-col-label">BUSINESS SIGNALS</span>
              <span className="fo-signals-col-hint">Select a signal to examine its predicted impact.</span>
            </div>

            {/* Mobile & Tablet Interactive Capsule Navigator */}
            <div className="fo-one-insight-mobile-capsule" role="region" aria-label="Mobile Signal Selector">
              <button
                type="button"
                className="fo-capsule-btn-arrow"
                onClick={handleSelectPrev}
                disabled={!prevSignal}
                aria-label={prevSignal ? `Previous: ${prevSignal.name}` : "No previous signal"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="fo-capsule-active-bubble">
                <span className="fo-capsule-active-dot" aria-hidden="true" />
                <span>{currentSignal.name}</span>
              </div>

              <button
                type="button"
                className="fo-capsule-btn-arrow"
                onClick={handleSelectNext}
                disabled={!nextSignal}
                aria-label={nextSignal ? `Next: ${nextSignal.name}` : "No next signal"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Mobile Horizontal Touch Pills for Instant Direct Access */}
            <div className="fo-one-insight-mobile-pills" role="tablist" aria-label="Quick Signal Pills">
              {oneInsightSignals.map(sig => {
                const isActive = sig.id === selectedSignalId;
                return (
                  <button
                    key={sig.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`fo-mobile-pill-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setSelectedSignalId(sig.id)}
                  >
                    <span>{sig.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop 5-Signal List */}
            <div
              className="fo-one-insight-signals-list"
              role="tablist"
              aria-label="Business Signals List"
            >
              {oneInsightSignals.map((sig, idx) => {
                const isSelected = sig.id === selectedSignalId;
                return (
                  <button
                    key={sig.id}
                    ref={el => {
                      nodeRefs.current[sig.id] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="fo-one-insight-stream"
                    tabIndex={isSelected ? 0 : -1}
                    className={`fo-one-signal-card ${isSelected ? "is-selected" : ""}`}
                    onClick={() => setSelectedSignalId(sig.id)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                  >
                    <div className="fo-one-signal-header">
                      <span className="fo-one-signal-name">{sig.name}</span>
                      {isSelected && <span className="fo-one-signal-dot" aria-hidden="true" />}
                    </div>

                    <div className="fo-one-signal-meta-row">
                      <span className="fo-one-signal-metric">{sig.metric}</span>
                      <span className="fo-one-signal-label">{sig.metricLabel}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==============================================================
              RIGHT COLUMN: The One Insight (Single Coherent Surface)
              ============================================================== */}
          <div className="fo-one-insight-editorial-col">
            <article
              className="fo-one-insight-surface"
              aria-label={`One Insight Analysis for ${currentSignal.name}`}
            >
              {/* Context Top Bar */}
              <div className="fo-one-insight-topbar">
                <div className="fo-one-insight-context-tag">
                  <span className="fo-context-tag-dot" aria-hidden="true" />
                  <span>{currentSignal.entity}</span>
                </div>

                <div className="fo-one-insight-status-pill">
                  <span className="fo-status-pill-beacon" aria-hidden="true" />
                  <span>AI Predictive Synthesis · TXN-10482</span>
                </div>
              </div>

              {/* The 3-Stage Connected Narrative Track */}
              <div
                id="fo-one-insight-stream"
                key={currentSignal.id}
                className="fo-one-insight-stream"
                role="region"
                aria-live="polite"
              >
                {/* ---------------- STAGE 01: OBSERVED SIGNAL ---------------- */}
                <div className="fo-stage-row fo-stage-row--signal">
                  <div className="fo-stage-rail-col" aria-hidden="true">
                    <div className="fo-stage-node fo-stage-node--01">01</div>
                    <div className="fo-stage-line fo-stage-line--1to2" />
                  </div>

                  <div className="fo-stage-body">
                    <div className="fo-stage-kicker-row">
                      <span className="fo-stage-kicker fo-stage-kicker--01">OBSERVED SIGNAL</span>
                      <span className="fo-stage-pill-tag fo-stage-pill-tag--signal">{currentSignal.category}</span>
                    </div>

                    <p className="fo-stage-statement">{currentSignal.signalStatement}</p>
                    <span className="fo-stage-subcontext">{currentSignal.signalContext}</span>
                  </div>
                </div>

                {/* ----------- STAGE 02: PREDICTED CONSEQUENCE (PRIMARY FOCUS) ----------- */}
                <div className="fo-stage-row fo-stage-row--consequence">
                  <div className="fo-stage-rail-col" aria-hidden="true">
                    <div className="fo-stage-node fo-stage-node--02">02</div>
                    <div className="fo-stage-line fo-stage-line--2to3" />
                  </div>

                  <div className="fo-stage-body">
                    <div className="fo-stage-kicker-row">
                      <span className="fo-stage-kicker fo-stage-kicker--02">PREDICTED CONSEQUENCE</span>
                      <span className="fo-stage-pill-tag fo-stage-pill-tag--focus">Core Impact</span>
                    </div>

                    <h3 className="fo-stage-consequence-headline">
                      {currentSignal.consequenceHeadline}
                    </h3>

                    <p className="fo-stage-consequence-body">
                      {currentSignal.consequenceExplanation}
                    </p>

                    <div className={`fo-consequence-callout fo-consequence-callout--${currentSignal.consequenceCallout.impactType}`}>
                      <span className="fo-callout-icon" aria-hidden="true">
                        {currentSignal.consequenceCallout.impactType === "negative" ? "⚠" : "ℹ"}
                      </span>
                      <strong className="fo-callout-label">{currentSignal.consequenceCallout.label}</strong>
                      <span className="fo-callout-sep" aria-hidden="true">·</span>
                      <span className="fo-callout-value">{currentSignal.consequenceCallout.value}</span>
                    </div>
                  </div>
                </div>

                {/* ------------- STAGE 03: DECISION TO CONSIDER ------------- */}
                <div className="fo-stage-row fo-stage-row--decision">
                  <div className="fo-stage-rail-col" aria-hidden="true">
                    <div className="fo-stage-node fo-stage-node--03">03</div>
                  </div>

                  <div className="fo-stage-body">
                    <div className="fo-stage-kicker-row">
                      <span className="fo-stage-kicker fo-stage-kicker--03">DECISION TO CONSIDER</span>
                      <span className="fo-stage-pill-tag fo-stage-pill-tag--action">Recommended Action</span>
                    </div>

                    <h4 className="fo-stage-decision-title">
                      {currentSignal.decisionAction}
                    </h4>

                    <p className="fo-stage-decision-desc">
                      {currentSignal.decisionExplanation}
                    </p>

                    <div className="fo-decision-outcome-badge">
                      <span className="fo-outcome-check" aria-hidden="true">✓</span>
                      <span>{currentSignal.decisionOutcomeBadge}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Surface Bottom Trust Footer */}
              <div className="fo-one-insight-footer">
                <div className="fo-one-insight-governance">
                  <span className="fo-governance-shield" aria-hidden="true">🛡</span>
                  <span>Operator Oversight · Verified against enterprise ledger patterns · Human approval required</span>
                </div>
                <div className="fo-one-insight-sim-status">
                  Live Simulation · TXN-10482 Context
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PredictiveOneInsightView;

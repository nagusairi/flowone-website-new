import React, { memo, useState, useRef } from "react";
import "./decision-observatory.css";

/* ==========================================================================
   Section 06 — Predictive Business Decisions
   Direction B — The Decision Observatory
   Interactive Business Signals · Consequence Mapping · Contextual Intelligence
   Refined UX & Cognitive Load Reduction (Master Prompt Spec)
   ========================================================================== */

export type SignalId =
  | "receivables"
  | "supplier-payments"
  | "inventory"
  | "expected-cash"
  | "collection-risk";

export interface SignalNodeData {
  id: SignalId;
  name: string;
  category: string;
  entity: string;
  metric: string;
  metricLabel: string;
  description: string;
  // Causality (§5)
  primaryCausalitySentence: string;
  relatedSignalIds: SignalId[];
  relationshipNotes: {
    targetId: SignalId;
    relationLabel: string;
    isPrimary: boolean;
  }[];
  // Impact Area (§6)
  impactHeadline: string;
  impactMetricVal: string;
  impactSubmetric: string;
  impactSummary: string;
  ripples: {
    title: string;
    description: string;
  }[];
  // Decision Area (§7)
  decisionActionTitle: string;
  decisionActionDesc: string;
  decisionRationale: string;
  strategicTag: string;
  feasibility: string;
  simulationDelta: string;
}

/* ==========================================================================
   Signal Data Model (Grounding in flowOne Enterprise Transaction TXN-10482)
   ========================================================================== */
export const signalsData: SignalNodeData[] = [
  {
    id: "receivables",
    name: "Receivables",
    category: "Inflow Signal",
    entity: "Ananya INV-10482 · ₹5.90L",
    metric: "+15D LAG",
    metricLabel: "Day +30 → +45 Shift",
    description: "Historical counterparty reconciliation indicates payment clearing shifts 12-15 days past term.",
    primaryCausalitySentence: "Payment delay of ₹5.90L shifts inflow past the scheduled vendor settlement window.",
    relatedSignalIds: ["expected-cash", "supplier-payments"],
    relationshipNotes: [
      { targetId: "expected-cash", relationLabel: "Inflow Timing Shift", isPrimary: true },
      { targetId: "supplier-payments", relationLabel: "Cash Timing Constraint", isPrimary: false },
    ],
    impactHeadline: "Working Capital Inflow Drift",
    impactMetricVal: "₹5,90,000",
    impactSubmetric: "Projected Inflow Shift (Day +30 → +45)",
    impactSummary: "Customer payment arrival shifts past the scheduled month-end settlement window based on 3-cycle reconciliation pattern, compressing operating liquidity.",
    ripples: [
      {
        title: "Projected Cash Compression",
        description: "Operating cash drops to ₹24.8L on Day +38, compressing liquidity headroom 41% below the recommended safety floor.",
      },
      {
        title: "Vendor Payout Window Clash",
        description: "Scheduled MSME settlement of ₹4.50L falls 7 days prior to the delayed receivable arrival.",
      },
      {
        title: "Statutory 45-Day Deadline Exposure",
        description: "Unadjusted payment schedules risk Section 43B(h) compliance window if cash is not prioritized.",
      },
    ],
    decisionActionTitle: "Automate 1.25% Dynamic Early-Settlement Incentive",
    decisionActionDesc: "Offer a 1.25% early payment discount (₹7,375 benefit) for settlement within 5 days, or execute one-click TReDS invoice discounting via bank conduit.",
    decisionRationale: "Accelerates ₹5.82L inflow to Day +28, eliminating the Day +38 liquidity valley entirely without high-interest borrowing.",
    strategicTag: "Cash Velocity Acceleration",
    feasibility: "Pre-Configured Incentive · One-Click",
    simulationDelta: "+₹5.82L by Day +28 · Zero Overdraft Risk",
  },
  {
    id: "supplier-payments",
    name: "Supplier Payments",
    category: "Payment Commitment",
    entity: "Shanti Metals PO-9201 · ₹4.50L",
    metric: "₹4.50L DUE",
    metricLabel: "Section 43B(h) Window",
    description: "Statutory 45-day MSME settlement timeline coincides with peak bi-weekly payroll disbursement.",
    primaryCausalitySentence: "Statutory Section 43B(h) payment of ₹4.50L falls due before expected customer collections arrive.",
    relatedSignalIds: ["expected-cash", "receivables"],
    relationshipNotes: [
      { targetId: "expected-cash", relationLabel: "Mandatory Cash Outflow", isPrimary: true },
      { targetId: "receivables", relationLabel: "Collection Dependency", isPrimary: false },
    ],
    impactHeadline: "Mandatory Compliance Disbursement Due",
    impactMetricVal: "₹4,50,000",
    impactSubmetric: "Statutory Outflow · Section 43B(h) Deadline",
    impactSummary: "MSME vendor invoice settlement is non-negotiable under Section 43B(h), requiring full payment on or before Day +38 to preserve 100% tax deductibility.",
    ripples: [
      {
        title: "Disbursement Concentration",
        description: "Vendor settlement aligns with bi-monthly salary disbursement (₹12.0L), creating peak cumulative cash burn in Week 5.",
      },
      {
        title: "Inflow Dependency",
        description: "Treasury initially budgeted Ananya invoice collections to fund this disbursement without external borrowing.",
      },
      {
        title: "Income Tax Penalty Risk",
        description: "Delaying beyond 45 days triggers compound interest at 3x RBI bank rate and income-tax expense disallowance.",
      },
    ],
    decisionActionTitle: "Prioritize MSME & Stagger Non-Critical Payables",
    decisionActionDesc: "Lock MSME disbursement for Day +38 while rescheduling non-statutory vendor disbursements (PO-8814 ₹3.20L) to Day +48 post-collection.",
    decisionRationale: "Safeguards 100% tax deductibility and vendor trust while smoothing net weekly outflows across payment cycles.",
    strategicTag: "Statutory Capital Preservation",
    feasibility: "Policy Approved · Zero Penalty",
    simulationDelta: "100% Tax Deductible · Balanced Week 5 Reserve",
  },
  {
    id: "inventory",
    name: "Inventory Commitments",
    category: "Operational Commitment",
    entity: "DC-02 Warehouse Hub · ₹6.20L",
    metric: "-32% STOCK",
    metricLabel: "Safety Stock Threshold",
    description: "Raw material for Q2 order run requires PO release by Day +20 to prevent assembly line stoppage.",
    primaryCausalitySentence: "Procurement PO release of ₹6.20L commits operating capital before customer receivables clear.",
    relatedSignalIds: ["supplier-payments", "expected-cash"],
    relationshipNotes: [
      { targetId: "supplier-payments", relationLabel: "Creates Procurement Liability", isPrimary: true },
      { targetId: "expected-cash", relationLabel: "Locks Operating Capital", isPrimary: false },
    ],
    impactHeadline: "Replenishment Required for Production Continuity",
    impactMetricVal: "₹6,20,000",
    impactSubmetric: "Committed Capital · DC-02 Stock Run",
    impactSummary: "Material inventory for Q2 order run reaches safety stock threshold, requiring replenishment PO release to prevent assembly delays.",
    ripples: [
      {
        title: "Assembly Stoppage Risk",
        description: "Zero procurement action halts production on Day +42, placing ₹14.5L in contracted client deliveries at risk.",
      },
      {
        title: "Working Capital Lock",
        description: "Issuing a full 90-day PO immediately commits ₹6.20L before current batch receivables have cleared.",
      },
      {
        title: "Warehouse Holding Drag",
        description: "Excess batch delivery adds ₹18,000/month in avoidable holding fees at DC-02 Bhiwandi warehouse.",
      },
    ],
    decisionActionTitle: "Split Consignment Delivery (30D / 60D Tranches)",
    decisionActionDesc: "Release split PO for ₹2.40L (30-day runway) immediately, releasing tranche 2 (₹3.80L) upon confirmed receipt of Ananya invoice funds.",
    decisionRationale: "Protects 100% manufacturing continuity while preserving ₹3.80L liquidity during the critical Day +35 to +40 cash window.",
    strategicTag: "Working Capital Efficiency",
    feasibility: "Supplier Pre-Aligned · Low Friction",
    simulationDelta: "Zero Stockout · ₹3.80L Liquidity Preserved",
  },
  {
    id: "expected-cash",
    name: "Expected Cash",
    category: "Liquidity Trajectory",
    entity: "HDFC Operating Facility · ₹42.5L",
    metric: "₹24.8L LOW",
    metricLabel: "Day +38 Reserve Valley",
    description: "Net operating balance tracks downward as scheduled disbursements outpace delayed customer collections.",
    primaryCausalitySentence: "Operating cash reserve drops to ₹24.8L as scheduled outflows outpace delayed client receipts.",
    relatedSignalIds: ["receivables", "supplier-payments", "collection-risk"],
    relationshipNotes: [
      { targetId: "receivables", relationLabel: "Primary Inflow Axis", isPrimary: true },
      { targetId: "supplier-payments", relationLabel: "Peak Outflow Drain", isPrimary: true },
      { targetId: "collection-risk", relationLabel: "Volatility Multiplier", isPrimary: false },
    ],
    impactHeadline: "Projected Liquidity Headroom Compression",
    impactMetricVal: "₹17,70,000",
    impactSubmetric: "Projected Net Drawdown · Day +38 Floor: ₹24.8L",
    impactSummary: "Operating cash declines from ₹42.5L to ₹24.8L on Day +38 due to the simultaneous impact of delayed receipts and statutory vendor payouts.",
    ripples: [
      {
        title: "Minimum Operational Floor",
        description: "Cash reserve approaches within ₹2.8L of the corporate ₹22.0L emergency liquidity baseline.",
      },
      {
        title: "Secondary Delay Exposure",
        description: "Any secondary collection delay exceeding ₹3.0L would trigger emergency overdraft borrowing at 11.5% APR.",
      },
      {
        title: "Planned Capex Disruption",
        description: "Scheduled IT infrastructure deployment on Day +35 must be deferred unless working capital is stabilized.",
      },
    ],
    decisionActionTitle: "Activate Standby Working Capital Conduit",
    decisionActionDesc: "Establish drawing power on pre-approved credit facility or activate dynamic discounting across top 3 outstanding receivables.",
    decisionRationale: "Establishes a ₹15.0L standby liquidity buffer 14 days in advance without incurring interest until drawdown.",
    strategicTag: "Treasury Risk Insulation",
    feasibility: "Pre-Approved Facility · Instant",
    simulationDelta: "+₹15.0L Standby Buffer · Zero Overdraft Risk",
  },
  {
    id: "collection-risk",
    name: "Collection Risk",
    category: "Variance Pattern",
    entity: "Enterprise Accounts Ledger",
    metric: "14-18D LAG",
    metricLabel: "Cyclical Batch Pattern",
    description: "Historical ledger analysis flags month-end payment batching by Tier-1 corporate clients rather than default insolvency.",
    primaryCausalitySentence: "Month-end corporate payment batching creates an artificial 14–18 day collection lag.",
    relatedSignalIds: ["receivables", "expected-cash"],
    relationshipNotes: [
      { targetId: "receivables", relationLabel: "Causes Invoice Aging", isPrimary: true },
      { targetId: "expected-cash", relationLabel: "Propagates Liquidity Lag", isPrimary: false },
    ],
    impactHeadline: "Predictable Enterprise Settlement Delay",
    impactMetricVal: "₹9,10,000",
    impactSubmetric: "At-Risk Inflow · 2 Enterprise Accounts",
    impactSummary: "Historical ledger analysis reveals corporate accounts batch vendor disbursements on fixed monthly dates rather than honoring contractual terms.",
    ripples: [
      {
        title: "Predictable Bureaucratic Delay",
        description: "Corporate AP cycles process vendor checks only on the 25th of each month, creating artificial 15-day payment lag.",
      },
      {
        title: "Days Sales Outstanding (DSO) Drag",
        description: "Average DSO expands by 11.4 days across enterprise accounts, increasing working capital financing cost.",
      },
      {
        title: "Forecasting Distortion",
        description: "Standard accounting assumptions hide this predictable pattern, creating unexpected month-end cash crunches.",
      },
    ],
    decisionActionTitle: "Synchronize Billing Cycles to Client ERP Batches",
    decisionActionDesc: "Shift invoice delivery date from the 28th to the 18th of the month to capture client's internal 25th-of-month AP approval run.",
    decisionRationale: "Aligning invoice presentation with the client's internal approval calendar accelerates receipt by 12 days without commercial friction.",
    strategicTag: "Workflow Synchronization",
    feasibility: "Automated Billing Rule · Zero Cost",
    simulationDelta: "-12 Days DSO · Natural Cash Alignment",
  },
];

/* ==========================================================================
   DecisionObservatorySection Component
   ========================================================================== */
export const DecisionObservatorySection = memo(function DecisionObservatorySection() {
  const [selectedSignalId, setSelectedSignalId] = useState<SignalId>("supplier-payments");
  const [showImpactDetails, setShowImpactDetails] = useState<boolean>(false);
  const [showReasoning, setShowReasoning] = useState<boolean>(false);
  const [showRelatedSignals, setShowRelatedSignals] = useState<boolean>(false);

  const nodeRefs = useRef<Record<SignalId, HTMLButtonElement | null>>({
    receivables: null,
    "supplier-payments": null,
    inventory: null,
    "expected-cash": null,
    "collection-risk": null,
  });

  const currentSignal = signalsData.find(s => s.id === selectedSignalId) || signalsData[0];
  const currentIndex = signalsData.findIndex(s => s.id === selectedSignalId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  // Linear bounded: start at index 0 (Receivables), end at index 4 (Collection Risk)
  const prevSignal2 = safeIndex >= 2 ? signalsData[safeIndex - 2] : null;
  const prevSignal1 = safeIndex >= 1 ? signalsData[safeIndex - 1] : null;
  const nextSignal1 = safeIndex + 1 < signalsData.length ? signalsData[safeIndex + 1] : null;
  const nextSignal2 = safeIndex + 2 < signalsData.length ? signalsData[safeIndex + 2] : null;

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && prevSignal1) {
        setSelectedSignalId(prevSignal1.id);
      } else if (diff < 0 && nextSignal1) {
        setSelectedSignalId(nextSignal1.id);
      }
    }
    touchStartX.current = null;
  };

  const handleSelectPrev = () => {
    if (prevSignal1) setSelectedSignalId(prevSignal1.id);
  };

  const handleSelectNext = () => {
    if (nextSignal1) setSelectedSignalId(nextSignal1.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (index + 1 < signalsData.length) {
        setSelectedSignalId(signalsData[index + 1].id);
        nodeRefs.current[signalsData[index + 1].id]?.focus();
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      if (index - 1 >= 0) {
        setSelectedSignalId(signalsData[index - 1].id);
        nodeRefs.current[signalsData[index - 1].id]?.focus();
      }
    }
  };

  return (
    <section
      id="decision-observatory"
      className="fo-decision-observatory"
      aria-label="Section: Predictive Business Decisions"
    >
      <div className="fo-decision-observatory__container">
        {/* EDITORIAL HEADER & INTRO (§2, §3) */}
        <header className="fo-decision-observatory__intro">
          <div className="hero-eyebrow-container" style={{ marginBottom: "0.85rem" }}>
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
          <h2 className="fo-decision-observatory__heading">
            Every signal changes <em>the bigger picture.</em>
          </h2>
          <p className="fo-decision-observatory__copy">
            See how changes across receivables, payments and operations can influence your financial position—and the decisions that follow.
          </p>
        </header>

        {/* 2-COLUMN COCKPIT SPLIT (40% Left / 60% Right) */}
        <div className="fo-observatory-cockpit-split">
          {/* ==============================================================
              LEFT COLUMN: Signal Explorer Panel (40% Width)
              ============================================================== */}
          <div className="fo-observatory-cockpit-left">
            {/* ROW 1: INTERACTION INSTRUCTION BAR (§4.1) */}
            <div className="fo-decision-observatory__instruction-bar is-cockpit" role="region" aria-label="Signal Explorer Header">
              <span className="fo-instruction-label">BUSINESS SIGNALS</span>
              <span className="fo-instruction-text">Select a signal to explore its impact.</span>
            </div>

            {/* TABLET & MOBILE SIGNAL CAPSULE STRIP WITH ARROWS (§11) */}
            <div
              className="fo-observatory-mobile-capsule"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Tablet & Mobile Signal Selector Strip"
            >
              <button
                type="button"
                className={`fo-capsule-arrow fo-capsule-arrow--prev ${!prevSignal1 ? "is-disabled" : ""}`}
                onClick={handleSelectPrev}
                disabled={!prevSignal1}
                aria-label={prevSignal1 ? `Previous signal: ${prevSignal1.name}` : "No previous signal"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {prevSignal2 && (
                <button
                  type="button"
                  className="fo-capsule-ghost fo-capsule-ghost--outer fo-capsule-ghost--prev-2"
                  onClick={() => setSelectedSignalId(prevSignal2.id)}
                  aria-label={`Select ${prevSignal2.name}`}
                >
                  <span>{prevSignal2.name}</span>
                </button>
              )}

              {prevSignal1 && (
                <button
                  type="button"
                  className="fo-capsule-ghost fo-capsule-ghost--inner fo-capsule-ghost--prev-1"
                  onClick={() => setSelectedSignalId(prevSignal1.id)}
                  aria-label={`Select ${prevSignal1.name}`}
                >
                  <span>{prevSignal1.name}</span>
                </button>
              )}

              <div className="fo-capsule-active">
                <span>{currentSignal.name}</span>
              </div>

              {nextSignal1 && (
                <button
                  type="button"
                  className="fo-capsule-ghost fo-capsule-ghost--inner fo-capsule-ghost--next-1"
                  onClick={() => setSelectedSignalId(nextSignal1.id)}
                  aria-label={`Select ${nextSignal1.name}`}
                >
                  <span>{nextSignal1.name}</span>
                </button>
              )}

              {nextSignal2 && (
                <button
                  type="button"
                  className="fo-capsule-ghost fo-capsule-ghost--outer fo-capsule-ghost--next-2"
                  onClick={() => setSelectedSignalId(nextSignal2.id)}
                  aria-label={`Select ${nextSignal2.name}`}
                >
                  <span>{nextSignal2.name}</span>
                </button>
              )}

              <button
                type="button"
                className={`fo-capsule-arrow fo-capsule-arrow--next ${!nextSignal1 ? "is-disabled" : ""}`}
                onClick={handleSelectNext}
                disabled={!nextSignal1}
                aria-label={nextSignal1 ? `Next signal: ${nextSignal1.name}` : "No next signal"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* DESKTOP ONLY: 2-COLUMN SIGNAL SELECTOR GRID (§4.2, §4.3) */}
            <div
              className="fo-observatory-signals-grid"
              role="tablist"
              aria-label="Business Signals Selector"
            >
              {signalsData.map((sig, idx) => {
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
                    tabIndex={isSelected ? 0 : -1}
                    className={`fo-signal-card ${isSelected ? "is-selected" : ""} ${
                      idx === 4 ? "is-span-2" : ""
                    }`}
                    onClick={() => setSelectedSignalId(sig.id)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                  >
                    <div className="fo-signal-card-header">
                      <span className="fo-signal-name">{sig.name}</span>
                      {isSelected && <span className="fo-signal-active-dot" aria-hidden="true" />}
                    </div>

                    <div className="fo-signal-card-body">
                      <span className="fo-signal-value">{sig.metric}</span>
                      <span className="fo-signal-context">{sig.metricLabel}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==============================================================
              RIGHT COLUMN: Deep Impact & Decision Deck (60% Width)
              ============================================================== */}
          <div className="fo-observatory-cockpit-right">
            {/* ROW 1: ACTIVE CAUSALITY LINK BAR (§5) */}
            <div className="fo-observatory-causality-bar" role="region" aria-label="Causal Relationship">
              <div className="fo-causality-content">
                <span className="fo-causality-label">CAUSAL RELATIONSHIP</span>
                <p className="fo-causality-sentence">
                  {currentSignal.primaryCausalitySentence}
                </p>
              </div>
              {currentSignal.relationshipNotes.length > 1 && (
                <button
                  type="button"
                  className="fo-causality-disclosure-btn"
                  onClick={() => setShowRelatedSignals(prev => !prev)}
                  aria-expanded={showRelatedSignals}
                  aria-controls="fo-related-signals"
                >
                  <span>{showRelatedSignals ? "Hide related signals" : "View related signals"}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={showRelatedSignals ? "is-rotated" : ""}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </div>

            {showRelatedSignals && (
              <div id="fo-related-signals" className="fo-related-signals-drawer">
                {currentSignal.relationshipNotes.map(r => {
                  const target = signalsData.find(s => s.id === r.targetId);
                  return (
                    <div key={r.targetId} className="fo-related-signal-row">
                      <span className="fo-related-target">{target?.name}:</span>
                      <span className="fo-related-desc">{r.relationLabel}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ROW 2: DECISION & IMPACT STACK (§6, §7) */}
            <div className="fo-observatory-deck-stack">
              {/* 5A. BUSINESS IMPACT (§6) */}
              <article
                className="fo-observatory-panel fo-impact-panel"
                aria-label="Potential Business Impact Panel"
              >
                <div className="fo-panel-kicker-row">
                  <span className="fo-panel-kicker">POTENTIAL BUSINESS IMPACT</span>
                </div>

                <div className="fo-impact-content-grid">
                  <div className="fo-impact-text-col">
                    <h3 className="fo-impact-title">{currentSignal.impactHeadline}</h3>
                    <p className="fo-impact-desc">{currentSignal.impactSummary}</p>
                  </div>

                  <div className="fo-impact-metric-box">
                    <span className="fo-metric-tag">PROJECTED IMPACT</span>
                    <div className="fo-metric-number">{currentSignal.impactMetricVal}</div>
                    <div className="fo-metric-sub">{currentSignal.impactSubmetric}</div>
                  </div>
                </div>

                {currentSignal.ripples.length > 0 && (
                  <div className="fo-disclosure-container">
                    <button
                      type="button"
                      className="fo-disclosure-btn"
                      onClick={() => setShowImpactDetails(prev => !prev)}
                      aria-expanded={showImpactDetails}
                      aria-controls="fo-impact-details"
                    >
                      <span>{showImpactDetails ? "Hide impact details" : "View impact details"}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={showImpactDetails ? "is-rotated" : ""}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {showImpactDetails && (
                      <div id="fo-impact-details" className="fo-impact-drawer">
                        <div className="fo-ripples-grid">
                          {currentSignal.ripples.map((rip, i) => (
                            <div key={i} className="fo-ripple-item">
                              <span className="fo-ripple-idx">{i + 1}</span>
                              <div className="fo-ripple-body">
                                <strong className="fo-ripple-title">{rip.title}</strong>
                                <p className="fo-ripple-text">{rip.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>

              {/* 5B. DECISION TO CONSIDER (§7) */}
              <article
                className="fo-observatory-panel fo-decision-panel"
                aria-label="Decision to Consider Panel"
              >
                <div className="fo-panel-kicker-row">
                  <span className="fo-panel-kicker">DECISION TO CONSIDER</span>
                </div>

                <div className="fo-decision-main">
                  <h3 className="fo-decision-title">{currentSignal.decisionActionTitle}</h3>
                  <p className="fo-decision-desc">{currentSignal.decisionActionDesc}</p>

                  <div className="fo-rationale-box">
                    <span className="fo-rationale-label">Why this option may help:</span>
                    <span className="fo-rationale-text">{currentSignal.decisionRationale}</span>
                  </div>
                </div>

                <div className="fo-disclosure-container">
                  <button
                    type="button"
                    className="fo-disclosure-btn"
                    onClick={() => setShowReasoning(prev => !prev)}
                    aria-expanded={showReasoning}
                    aria-controls="fo-decision-reasoning"
                  >
                    <span>{showReasoning ? "Hide reasoning" : "View reasoning"}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={showReasoning ? "is-rotated" : ""}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {showReasoning && (
                    <div id="fo-decision-reasoning" className="fo-reasoning-drawer">
                      <div className="fo-reasoning-chips">
                        <div className="fo-reasoning-chip">
                          <span className="fo-chip-label">Feasibility:</span>
                          <strong className="fo-chip-val">{currentSignal.feasibility}</strong>
                        </div>
                        <div className="fo-reasoning-chip">
                          <span className="fo-chip-label">Simulated Outcome:</span>
                          <strong className="fo-chip-val">{currentSignal.simulationDelta}</strong>
                        </div>
                      </div>

                      <div className="fo-guardrail-alert">
                        <span className="fo-guardrail-icon" aria-hidden="true">ℹ</span>
                        <span>
                          Operator Recommendation · Grounded in Transaction TXN-10482 Context · Awaiting Human Confirmation
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>

            {/* ROW 3: CLOSING EDITORIAL BANNER (§8) */}
            <footer className="fo-decision-observatory__closing is-simplified">
              <p className="fo-decision-observatory__closing-copy">
                Understand the connection. Anticipate the consequence. <em>Decide with context.</em>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
});

export default DecisionObservatorySection;

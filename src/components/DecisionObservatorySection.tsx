import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import "./decision-observatory.css";

/* ==========================================================================
   Section 06 — Predictive Business Decisions
   Direction B — The Decision Observatory
   Interactive Business Signals · Consequence Mapping · Contextual Intelligence
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
  statusBadge: string;
  metric: string;
  metricLabel: string;
  description: string;
  relatedSignalIds: SignalId[];
  relationshipNotes: {
    targetId: SignalId;
    relationLabel: string;
    isPrimary: boolean;
  }[];
  // Impact Area
  impactMetricVal: string;
  impactSubmetric: string;
  impactStatus: string;
  impactSummary: string;
  ripples: {
    title: string;
    description: string;
  }[];
  // Decision Area
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
const signalsData: SignalNodeData[] = [
  {
    id: "receivables",
    name: "Receivables",
    category: "Inflow Signal",
    entity: "Ananya INV-10482 · ₹5.90L",
    statusBadge: "12-Day Inflow Drift",
    metric: "+15D LAG",
    metricLabel: "Day +30 → +45 Shift",
    description: "Historical counterparty reconciliation indicates payment clearing shifts 12-15 days past term.",
    relatedSignalIds: ["expected-cash", "supplier-payments"],
    relationshipNotes: [
      { targetId: "expected-cash", relationLabel: "Inflow Timing Shift", isPrimary: true },
      { targetId: "supplier-payments", relationLabel: "Cash Timing Constraint", isPrimary: false },
    ],
    impactMetricVal: "₹5,90,000 INFLOW SHIFT",
    impactSubmetric: "Arrival resets from Day +30 to Day +45",
    impactStatus: "Working Capital Friction",
    impactSummary: "Customer payment arrival shifts past the scheduled month-end settlement window based on 3-cycle reconciliation pattern.",
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
    decisionActionDesc: "Offer a 1.25% early payment discount (₹7,375 benefit) for settlement within 5 days, or execute one-click TReDS invoice discounting via HDFC bank conduit.",
    decisionRationale: "Accelerating ₹5.82L inflow to Day +28 eliminates the Day +38 liquidity valley entirely without drawing on high-interest credit lines.",
    strategicTag: "Cash Velocity Acceleration",
    feasibility: "Pre-Configured Incentive · One-Click",
    simulationDelta: "+₹5.82L by Day +28 · Zero Overdraft Risk",
  },
  {
    id: "supplier-payments",
    name: "Supplier Payments",
    category: "Payment Commitment",
    entity: "Shanti Metals PO-9201 · ₹4.50L",
    statusBadge: "Day +38 Statutory Window",
    metric: "₹4.50L DUE",
    metricLabel: "Section 43B(h) Window",
    description: "Statutory 45-day MSME settlement timeline coincides with peak bi-weekly payroll disbursement.",
    relatedSignalIds: ["expected-cash", "receivables"],
    relationshipNotes: [
      { targetId: "expected-cash", relationLabel: "Mandatory Cash Outflow", isPrimary: true },
      { targetId: "receivables", relationLabel: "Collection Dependency", isPrimary: false },
    ],
    impactMetricVal: "₹4,50,000 STATUTORY OUTFLOW",
    impactSubmetric: "Section 43B(h) Mandatory Deadline",
    impactStatus: "Compliance Priority",
    impactSummary: "MSME vendor invoice settlement is non-negotiable under Section 43B(h), requiring full payment on or before Day +38 to preserve tax deductibility.",
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
    statusBadge: "Safety Stock Reorder Trigger",
    metric: "-32% STOCK",
    metricLabel: "Safety Stock Threshold",
    description: "Raw material for Q2 order run requires PO release by Day +20 to prevent assembly line stoppage.",
    relatedSignalIds: ["supplier-payments", "expected-cash"],
    relationshipNotes: [
      { targetId: "supplier-payments", relationLabel: "Creates Procurement Liability", isPrimary: true },
      { targetId: "expected-cash", relationLabel: "Locks Operating Capital", isPrimary: false },
    ],
    impactMetricVal: "₹6,20,000 COMMITTED CAPITAL",
    impactSubmetric: "DC-02 Stock Run for Q2 Client Deliveries",
    impactStatus: "Supply Chain Continuity",
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
    decisionRationale: "Maintains 100% manufacturing continuity while preserving ₹3.80L liquidity during the critical Day +35 to +40 cash window.",
    strategicTag: "Working Capital Efficiency",
    feasibility: "Supplier Pre-Aligned · Low Friction",
    simulationDelta: "Zero Stockout · ₹3.80L Liquidity Preserved",
  },
  {
    id: "expected-cash",
    name: "Expected Cash",
    category: "Liquidity Trajectory",
    entity: "HDFC Operating Facility · ₹42.5L",
    statusBadge: "Day +38 Valley: ₹24.8L",
    metric: "₹24.8L FLOOR",
    metricLabel: "-41% Reserve Headroom",
    description: "Net operating balance tracks downward as scheduled disbursements outpace delayed customer collections.",
    relatedSignalIds: ["receivables", "supplier-payments", "collection-risk"],
    relationshipNotes: [
      { targetId: "receivables", relationLabel: "Primary Inflow Axis", isPrimary: true },
      { targetId: "supplier-payments", relationLabel: "Peak Outflow Drain", isPrimary: true },
      { targetId: "collection-risk", relationLabel: "Volatility Multiplier", isPrimary: false },
    ],
    impactMetricVal: "₹17,70,000 NET DRAWDOWN",
    impactSubmetric: "Projected Cash Valley: ₹24.8L on Day +38",
    impactStatus: "Headroom Compression",
    impactSummary: "Operating cash declines from ₹42.5L to ₹24.8L on Day +38 due to the simultaneous impact of delayed receipts and statutory payouts.",
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
    decisionActionDesc: "Establish drawing power on pre-approved HDFC credit line or activate dynamic discounting across top 3 outstanding receivables.",
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
    statusBadge: "Cyclical Settlement Lag",
    metric: "14-18D LAG",
    metricLabel: "Cyclical Batch Pattern",
    description: "Historical ledger analysis flags month-end payment batching by Tier-1 corporate clients rather than default insolvency.",
    relatedSignalIds: ["receivables", "expected-cash"],
    relationshipNotes: [
      { targetId: "receivables", relationLabel: "Causes Invoice Aging", isPrimary: true },
      { targetId: "expected-cash", relationLabel: "Propagates Liquidity Lag", isPrimary: false },
    ],
    impactMetricVal: "₹9,10,000 AT-RISK INFLOW",
    impactSubmetric: "2 Enterprise Accounts Exhibiting Drift",
    impactStatus: "Systemic Friction",
    impactSummary: "Historical ledger analysis reveals corporate accounts batch vendor disbursements on fixed monthly dates, missing contractual Net-30 terms.",
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
  const nodeRefs = useRef<Record<SignalId, HTMLButtonElement | null>>({
    receivables: null,
    "supplier-payments": null,
    inventory: null,
    "expected-cash": null,
    "collection-risk": null,
  });

  const currentSignal = signalsData.find(s => s.id === selectedSignalId) || signalsData[0];

  // Helper to determine relationship state between any two signals
  const isSignalRelated = (id: SignalId) => {
    if (id === selectedSignalId) return false;
    return currentSignal.relatedSignalIds.includes(id);
  };

  // Keyboard navigation across signals
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % signalsData.length;
      setSelectedSignalId(signalsData[nextIndex].id);
      nodeRefs.current[signalsData[nextIndex].id]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + signalsData.length) % signalsData.length;
      setSelectedSignalId(signalsData[prevIndex].id);
      nodeRefs.current[signalsData[prevIndex].id]?.focus();
    }
  };

  return (
    <section
      id="decision-observatory"
      className="fo-decision-observatory"
      aria-label="Section: Predictive Business Decisions — The Decision Observatory"
    >
      <div className="fo-decision-observatory__container">
        {/* ==================================================================
            1. EDITORIAL HEADER & COPY (§4)
            ================================================================== */}
        <header className="fo-decision-observatory__intro">
          <div
            className="fo-decision-observatory__eyebrow"
            role="note"
            aria-label="Predictive Business Decisions"
          >
            <span className="fo-decision-observatory__beacon" aria-hidden="true" />
            <span className="fo-decision-observatory__eyebrow-text">
              PREDICTIVE BUSINESS DECISIONS
            </span>
          </div>
          <h2 className="fo-decision-observatory__heading">
            Every signal changes <em>the bigger picture.</em>
          </h2>
          <p className="fo-decision-observatory__copy">
            See how changes across receivables, payments and operations can influence your financial position—and the decisions that follow.
          </p>
        </header>

        {/* ==================================================================
            2. INTERACTION INSTRUCTION BAR (§4)
            ================================================================== */}
        <div
          className="fo-decision-observatory__instruction-bar"
          role="region"
          aria-label="Interactive Navigation Instructions"
        >
          <div className="fo-decision-observatory__instruction">
            <span className="fo-decision-observatory__instruction-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
            <span>Select a business signal to explore its potential impact.</span>
          </div>

          <div className="fo-decision-observatory__active-signal-badge">
            <span className="fo-decision-observatory__active-pulse" aria-hidden="true" />
            <span>FOCUS: {currentSignal.name.toUpperCase()}</span>
          </div>
        </div>

        {/* ==================================================================
            3. TOP COMPACT SIGNAL SELECTOR STRIP (5 Semantic Boxes)
            ================================================================== */}
        <div
          className="fo-observatory-top-signals"
          role="tablist"
          aria-label="5 Business Signals Selector"
        >
          {signalsData.map((sig, idx) => {
            const isSelected = sig.id === selectedSignalId;
            const isRelated = isSignalRelated(sig.id);

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
                className={`fo-observatory-compact-node ${
                  isSelected ? "is-selected" : isRelated ? "is-related" : "is-idle"
                }`}
                onClick={() => setSelectedSignalId(sig.id)}
                onKeyDown={e => handleKeyDown(e, idx)}
              >
                <div className="fo-compact-node-top">
                  <span className="fo-compact-node-cat">
                    <span className="fo-compact-node-dot" aria-hidden="true" />
                    {sig.category}
                  </span>
                  <span className="fo-compact-node-badge">
                    {isSelected ? "ACTIVE FOCUS" : isRelated ? "RIPPLE" : "IDLE"}
                  </span>
                </div>

                <h3 className="fo-compact-node-title">{sig.name}</h3>
                <div className="fo-compact-node-entity">{sig.entity}</div>

                <div className="fo-compact-node-footer">
                  <span className="fo-compact-node-metric">{sig.metric}</span>
                  <span className="fo-compact-node-status">{sig.statusBadge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CAUSALITY RELATIONSHIP LINK BAR */}
        <div className="fo-observatory-relationship-bar">
          <div className="fo-relationship-tag">
            <span aria-hidden="true">⚡</span>
            <span>ACTIVE CAUSALITY LINK:</span>
          </div>
          <div className="fo-relationship-path">
            {currentSignal.relationshipNotes.map((r, i) => {
              const target = signalsData.find(s => s.id === r.targetId);
              return (
                <span key={r.targetId} className="fo-relationship-chip">
                  <span className="fo-relationship-source">{currentSignal.name}</span>
                  <span className="fo-relationship-arrow" aria-hidden="true">→</span>
                  <span className="fo-relationship-target">{target?.name}</span>
                  <span className="fo-relationship-label">({r.relationLabel})</span>
                  {i < currentSignal.relationshipNotes.length - 1 && (
                    <span className="fo-relationship-sep" aria-hidden="true">·</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            4. MAIN SIDE-BY-SIDE DECK (2 Equal Columns)
            Left: Potential Business Impact | Right: Decision to Consider
            ================================================================== */}
        <div className="fo-observatory-deck-grid">
          {/* LEFT: POTENTIAL BUSINESS IMPACT */}
          <article
            className="fo-observatory-deck-card fo-observatory-impact-card"
            aria-label="Potential Business Impact Panel"
          >
            <div className="fo-observatory-panel-header">
              <h3 className="fo-observatory-panel-title">POTENTIAL BUSINESS IMPACT</h3>
              <span className="fo-observatory-panel-badge is-impact">
                {currentSignal.impactStatus}
              </span>
            </div>

            <div className="fo-decision-observatory__impact-metric-block">
              <div className="fo-decision-observatory__impact-metric-val">
                {currentSignal.impactMetricVal}
              </div>
              <div className="fo-decision-observatory__impact-submetric">
                {currentSignal.impactSubmetric}
              </div>
            </div>

            <p className="fo-decision-observatory__impact-summary">
              {currentSignal.impactSummary}
            </p>

            <div className="fo-decision-observatory__ripple-list">
              {currentSignal.ripples.map((rip, i) => (
                <div key={i} className="fo-decision-observatory__ripple-item">
                  <span className="fo-decision-observatory__ripple-bullet" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <strong>{rip.title}:</strong> {rip.description}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* RIGHT: DECISION TO CONSIDER */}
          <article
            className="fo-observatory-deck-card fo-observatory-decision-card"
            aria-label="Decision to Consider Panel"
          >
            <div className="fo-observatory-panel-header">
              <h3 className="fo-observatory-panel-title">DECISION TO CONSIDER</h3>
              <span className="fo-observatory-panel-badge is-decision">
                {currentSignal.strategicTag}
              </span>
            </div>

            <div className="fo-decision-observatory__decision-action-block">
              <h4 className="fo-decision-observatory__decision-action-title">
                {currentSignal.decisionActionTitle}
              </h4>
              <p className="fo-decision-observatory__decision-action-desc">
                {currentSignal.decisionActionDesc}
              </p>
            </div>

            <div className="fo-decision-observatory__decision-rationale">
              <strong>Why This Matters:</strong> {currentSignal.decisionRationale}
            </div>

            <div className="fo-decision-observatory__decision-meta-row">
              <div className="fo-decision-observatory__decision-meta-pill">
                <span>Feasibility:</span>
                <strong>{currentSignal.feasibility}</strong>
              </div>
              <div className="fo-decision-observatory__decision-meta-pill">
                <span>Simulated Outcome:</span>
                <strong>{currentSignal.simulationDelta}</strong>
              </div>
            </div>

            {/* Guardrail Note */}
            <div className="fo-decision-observatory__guardrail-note">
              <span aria-hidden="true">ℹ</span>
              <span>
                Operator Recommendation · Grounded in Transaction TXN-10482 Context · Awaiting Human Confirmation
              </span>
            </div>
          </article>
        </div>

        {/* ==================================================================
            5. CLOSING EDITORIAL BANNER (§4)
            ================================================================== */}
        <footer className="fo-decision-observatory__closing">
          <div className="fo-decision-observatory__closing-copy">
            Understand the connection. Anticipate the consequence. <em>Decide with context.</em>
          </div>
          <div className="fo-decision-observatory__closing-tag">
            <span>TRANSITION → SECTION 07 · BUSINESS OUTCOMES</span>
          </div>
        </footer>
      </div>
    </section>
  );
});

export default DecisionObservatorySection;

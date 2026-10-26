import React, { memo, useState, useRef } from "react";
import "./predictive-signal-to-consequence.css";

/* ==========================================================================
   flowOne Section 06 — Predictive Business Decisions
   View E: Signal to Consequence — Visual Causal Chain Concept
   Connected Spatial Path:
   01 Signal ──→ 02 Consequence (Focal) ──→ 03 Decision
   ========================================================================== */

export type SignalId =
  | "receivables"
  | "supplier-payments"
  | "inventory"
  | "expected-cash"
  | "collection-risk";

export interface SignalCausalChainItem {
  id: SignalId;
  name: string;
  category: string;
  entity: string;
  signalMetric: string;
  signalContext: string;

  // 01 · Signal
  signalTitle: string;
  signalDescription: string;
  signalTelemetry: string;

  // 02 · Consequence (Focal Emphasis)
  consequenceTitle: string;
  consequenceDescription: string;
  consequenceImpactBadge: string;

  // 03 · Decision
  decisionTitle: string;
  decisionDescription: string;
  decisionActionBadge: string;
}

const causalChainSignals: SignalCausalChainItem[] = [
  {
    id: "receivables",
    name: "Receivables",
    category: "Inflow Signal",
    entity: "Ananya INV-10482 · ₹5.90L",
    signalMetric: "+15D LAG",
    signalContext: "Day +30 → +45 Shift",
    signalTitle: "Collection Timing Drift",
    signalDescription:
      "Payment reconciliation indicates Ananya INV-10482 (₹5,90,000) clearing shifts 12–15 days past contractual term.",
    signalTelemetry: "INV-10482 · Day +45 projected",
    consequenceTitle: "Day +38 Liquidity Valley",
    consequenceDescription:
      "Delayed inflow shifts past scheduled month-end vendor settlements, compressing operating cash 41% below the safety floor.",
    consequenceImpactBadge: "₹24.8L Reserve Floor · 7D before MSME due",
    decisionTitle: "Accelerate Inflow or Discount",
    decisionDescription:
      "Trigger 1.25% early-settlement incentive (₹7,375 net cost) or execute TReDS discounting to advance ₹5.82L to Day +28.",
    decisionActionBadge: "✓ Advances ₹5.82L · Prevents overdraft",
  },
  {
    id: "supplier-payments",
    name: "Supplier Payments",
    category: "Payment Commitment",
    entity: "Shanti Metals PO-9201 · ₹4.50L",
    signalMetric: "₹4.50L DUE",
    signalContext: "Section 43B(h) Window",
    signalTitle: "Section 43B(h) Deadline",
    signalDescription:
      "Mandatory MSME settlement of ₹4,50,000 falls due on Day +38, coinciding with bi-monthly salary disbursement.",
    signalTelemetry: "PO-9201 · Day +38 statutory cutoff",
    consequenceTitle: "Cash Drain Clash & Tax Risk",
    consequenceDescription:
      "Paying during payroll draws cash reserves near zero, while missing 45 days triggers compound interest and tax deductibility forfeiture.",
    consequenceImpactBadge: "Tax Deductibility Cutoff · ₹12.0L Payroll Clash",
    decisionTitle: "Prioritize MSME & Stagger Payables",
    decisionDescription:
      "Lock MSME payment on Day +38 to safeguard 100% tax deduction, deferring non-statutory vendor payouts (₹3.20L) to Day +48.",
    decisionActionBadge: "✓ 100% Tax Deductible · Protects ₹3.20L reserve",
  },
  {
    id: "inventory",
    name: "Inventory Commitments",
    category: "Operational Commitment",
    entity: "DC-02 Warehouse Hub · ₹6.20L",
    signalMetric: "-32% STOCK",
    signalContext: "Safety Stock Threshold",
    signalTitle: "Stock Safety Floor Reached",
    signalDescription:
      "DC-02 Bhiwandi warehouse stock run reaches safety threshold (-32%), requiring a ₹6,20,000 replenishment PO by Day +20.",
    signalTelemetry: "DC-02 Bhiwandi · -32% safety breach",
    consequenceTitle: "Line Stoppage vs Capital Lock",
    consequenceDescription:
      "A full 90-day PO locks committed capital before batch collections arrive, but zero procurement halts assembly on Day +42.",
    consequenceImpactBadge: "Day +42 Assembly Risk · ₹14.5L Deliveries at Risk",
    decisionTitle: "Split 30D / 60D Tranche PO",
    decisionDescription:
      "Release split PO for ₹2.40L (30-day runway) immediately to maintain uptime, releasing tranche 2 on confirmed collections.",
    decisionActionBadge: "✓ Zero Line Downtime · Preserves ₹3.80L liquidity",
  },
  {
    id: "expected-cash",
    name: "Expected Cash",
    category: "Liquidity Trajectory",
    entity: "HDFC Operating Facility · ₹42.5L",
    signalMetric: "₹24.8L LOW",
    signalContext: "Day +38 Reserve Valley",
    signalTitle: "Downward Cash Trajectory",
    signalDescription:
      "Operating balance tracks downward from ₹42.5L as scheduled disbursements outpace incoming customer receipts.",
    signalTelemetry: "HDFC Facility · ₹17.7L projected drawdown",
    consequenceTitle: "Emergency Buffer Depletion",
    consequenceDescription:
      "Headroom contracts to within ₹2.8L of the corporate emergency baseline, leaving zero buffer for secondary collection variances.",
    consequenceImpactBadge: "₹2.8L Headroom Remaining · Zero Variance Buffer",
    decisionTitle: "Activate Standby Facility",
    decisionDescription:
      "Establish drawing power on pre-approved credit facility or activate dynamic invoice discounting across top receivables.",
    decisionActionBadge: "✓ +₹15.0L Standby Buffer · Zero Interest Until Drawdown",
  },
  {
    id: "collection-risk",
    name: "Collection Risk",
    category: "Variance Pattern",
    entity: "Enterprise Accounts Ledger",
    signalMetric: "14-18D LAG",
    signalContext: "Cyclical Batch Pattern",
    signalTitle: "Corporate Batching Delay",
    signalDescription:
      "Enterprise accounts process vendor disbursements on fixed monthly dates rather than contractual invoice terms.",
    signalTelemetry: "2 Enterprise Accounts · ₹9.10L in batch",
    consequenceTitle: "Artificial 15-Day DSO Drag",
    consequenceDescription:
      "Invoices delivered past the 25th roll over to the following month, needlessly inflating DSO by 11.4 days across corporate accounts.",
    consequenceImpactBadge: "+11.4 Days DSO Expansion · Working Capital Drag",
    decisionTitle: "Synchronize Dispatch Date",
    decisionDescription:
      "Shift invoice delivery from the 28th to the 18th of the month to capture clients' current approval cycle without commercial friction.",
    decisionActionBadge: "✓ Eliminates 15D Batching · Accelerates ₹9.10L settlement",
  },
];

export const PredictiveSignalToConsequenceView = memo(
  function PredictiveSignalToConsequenceView() {
    const [selectedSignalId, setSelectedSignalId] = useState<SignalId>("receivables");
    const nodeRefs = useRef<Record<SignalId, HTMLButtonElement | null>>({
      receivables: null,
      "supplier-payments": null,
      inventory: null,
      "expected-cash": null,
      "collection-risk": null,
    });

    const currentIndex = causalChainSignals.findIndex(s => s.id === selectedSignalId);
    const currentSignal = causalChainSignals[currentIndex] ?? causalChainSignals[0];

    const prevSignal = currentIndex > 0 ? causalChainSignals[currentIndex - 1] : null;
    const nextSignal = currentIndex < causalChainSignals.length - 1 ? causalChainSignals[currentIndex + 1] : null;

    const handleSelectPrev = () => {
      if (prevSignal) setSelectedSignalId(prevSignal.id);
    };

    const handleSelectNext = () => {
      if (nextSignal) setSelectedSignalId(nextSignal.id);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (index + 1 < causalChainSignals.length) {
          const nextId = causalChainSignals[index + 1].id;
          setSelectedSignalId(nextId);
          nodeRefs.current[nextId]?.focus();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (index - 1 >= 0) {
          const prevId = causalChainSignals[index - 1].id;
          setSelectedSignalId(prevId);
          nodeRefs.current[prevId]?.focus();
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        const firstId = causalChainSignals[0].id;
        setSelectedSignalId(firstId);
        nodeRefs.current[firstId]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const lastId = causalChainSignals[causalChainSignals.length - 1].id;
        setSelectedSignalId(lastId);
        nodeRefs.current[lastId]?.focus();
      }
    };

    return (
      <section
        id="predictive-signal-consequence"
        className="fo-signal-consequence-section"
        aria-label="Section: Predictive Business Decisions — View E: Signal to Consequence"
      >
        <div className="fo-chain-ambient" aria-hidden="true" />

        <div className="fo-chain-container">
          {/* EDITORIAL HEADER & INTRO (§4) */}
          <header className="fo-chain-header">
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
            <h2 className="fo-chain-heading">
              Every signal changes <em>the bigger picture.</em>
            </h2>
            <p className="fo-chain-lead">
              See how changes across receivables, payments and operations can influence your financial position—and the decisions that follow.
            </p>
          </header>

          {/* 2-COLUMN COCKPIT SPLIT (§5) */}
          <div className="fo-chain-workspace">
            {/* ==============================================================
                LEFT COLUMN: Business Signal Selector
                ============================================================== */}
            <div className="fo-chain-signals-col">
              <div className="fo-chain-signals-header" role="region" aria-label="Business Signals Header">
                <span className="fo-chain-signals-label">BUSINESS SIGNALS</span>
                <span className="fo-chain-signals-hint">Select a signal to trace its downstream consequences.</span>
              </div>

              {/* Mobile & Tablet Interactive Capsule Navigator */}
              <div className="fo-chain-mobile-capsule" role="region" aria-label="Mobile Signal Selector">
                <button
                  type="button"
                  className="fo-chain-capsule-btn"
                  onClick={handleSelectPrev}
                  disabled={!prevSignal}
                  aria-label={prevSignal ? `Previous: ${prevSignal.name}` : "No previous signal"}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="fo-chain-capsule-active">
                  <span className="fo-chain-capsule-dot" aria-hidden="true" />
                  <span>{currentSignal.name}</span>
                </div>

                <button
                  type="button"
                  className="fo-chain-capsule-btn"
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
              <div className="fo-chain-mobile-pills" role="tablist" aria-label="Quick Signal Pills">
                {causalChainSignals.map(sig => {
                  const isActive = sig.id === selectedSignalId;
                  return (
                    <button
                      key={sig.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-chain-pill-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => setSelectedSignalId(sig.id)}
                    >
                      <span>{sig.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop 5-Signal List */}
              <div
                className="fo-chain-signals-list"
                role="tablist"
                aria-label="Business Signals List"
              >
                {causalChainSignals.map((sig, idx) => {
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
                      aria-controls="fo-chain-track-panel"
                      tabIndex={isSelected ? 0 : -1}
                      className={`fo-chain-signal-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => setSelectedSignalId(sig.id)}
                      onKeyDown={e => handleKeyDown(e, idx)}
                    >
                      <div className="fo-chain-signal-header">
                        <span className="fo-chain-signal-name">{sig.name}</span>
                        {isSelected && <span className="fo-chain-signal-dot" aria-hidden="true" />}
                      </div>

                      <div className="fo-chain-signal-meta">
                        <span className="fo-chain-signal-badge">{sig.signalMetric}</span>
                        <span className="fo-chain-signal-context">{sig.signalContext}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==============================================================
                RIGHT COLUMN: Visual Causal Chain (Horizontal Connected Flow)
                ============================================================== */}
            <div className="fo-chain-editorial-col">
              <article
                className="fo-chain-canvas"
                aria-label={`Visual Causal Chain for ${currentSignal.name}`}
              >
                {/* Context Top Bar */}
                <div className="fo-chain-topbar">
                  <div className="fo-chain-entity-tag">
                    <span className="fo-chain-entity-dot" aria-hidden="true" />
                    <span>LIVE CAUSAL CONTEXT · {currentSignal.entity}</span>
                  </div>

                  <div className="fo-chain-meta-indicator">
                    <span>Continuous Causal Flow</span>
                  </div>
                </div>

                {/* 3 Connected Spatial Stages along a Horizontal Path */}
                <div
                  id="fo-chain-track-panel"
                  key={currentSignal.id}
                  className="fo-chain-track"
                  role="region"
                  aria-live="polite"
                >
                  {/* ---------------- STAGE 01: SIGNAL ---------------- */}
                  <div className="fo-chain-stage fo-chain-stage--signal">
                    <div className="fo-chain-stage-header">
                      <span className="fo-chain-step-pill fo-chain-step-pill--signal">01</span>
                      <span className="fo-chain-step-title">SIGNAL</span>
                    </div>

                    <h3 className="fo-chain-node-title">{currentSignal.signalTitle}</h3>
                    <p className="fo-chain-node-desc">{currentSignal.signalDescription}</p>

                    <div className="fo-chain-stage-footer">
                      <span className="fo-chain-telemetry-badge">{currentSignal.signalTelemetry}</span>
                    </div>
                  </div>

                  {/* RESTING CONNECTOR 01 ──→ 02 */}
                  <div className="fo-chain-connector fo-chain-connector--1to2" aria-hidden="true">
                    <div className="fo-chain-line-track">
                      <div className="fo-chain-line-pulse" />
                    </div>
                    <div className="fo-chain-arrow-head">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* ----------- STAGE 02: CONSEQUENCE (FOCAL EMPHASIS) ----------- */}
                  <div className="fo-chain-stage fo-chain-stage--consequence">
                    <div className="fo-chain-stage-header">
                      <span className="fo-chain-step-pill fo-chain-step-pill--consequence">02</span>
                      <span className="fo-chain-step-title">PREDICTED CONSEQUENCE</span>
                      <span className="fo-chain-focus-chip">Primary Consequence</span>
                    </div>

                    <h3 className="fo-chain-node-title">{currentSignal.consequenceTitle}</h3>
                    <p className="fo-chain-node-desc">{currentSignal.consequenceDescription}</p>

                    <div className="fo-chain-stage-footer">
                      <span className="fo-chain-consequence-badge">{currentSignal.consequenceImpactBadge}</span>
                    </div>
                  </div>

                  {/* RESTING CONNECTOR 02 ──→ 03 */}
                  <div className="fo-chain-connector fo-chain-connector--2to3" aria-hidden="true">
                    <div className="fo-chain-line-track">
                      <div className="fo-chain-line-pulse" />
                    </div>
                    <div className="fo-chain-arrow-head">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* ---------------- STAGE 03: DECISION ---------------- */}
                  <div className="fo-chain-stage fo-chain-stage--decision">
                    <div className="fo-chain-stage-header">
                      <span className="fo-chain-step-pill fo-chain-step-pill--decision">03</span>
                      <span className="fo-chain-step-title">DECISION TO CONSIDER</span>
                    </div>

                    <h3 className="fo-chain-node-title">{currentSignal.decisionTitle}</h3>
                    <p className="fo-chain-node-desc">{currentSignal.decisionDescription}</p>

                    <div className="fo-chain-stage-footer">
                      <span className="fo-chain-decision-badge">{currentSignal.decisionActionBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Canvas Trust Footer */}
                <div className="fo-chain-footer">
                  <div className="fo-chain-governance">
                    <span className="fo-chain-shield" aria-hidden="true">🛡</span>
                    <span>Operator Governance · Grounded in Transaction TXN-10482 Context · Human approval required</span>
                  </div>
                  <div className="fo-chain-status-tag">
                    Connected Causal Engine · Real-time
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default PredictiveSignalToConsequenceView;

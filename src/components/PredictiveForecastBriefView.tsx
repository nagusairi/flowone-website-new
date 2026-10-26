import React, { memo, useState, useRef } from "react";
import "./predictive-forecast-brief.css";

/* ==========================================================================
   flowOne Section 06 — Predictive Business Decisions
   View D: The Forecast Brief — Executive Briefing Concept
   Focused Executive Forecast:
   Projected Impact (Dominant) → Why It Matters → Decision to Consider
   ========================================================================== */

export type SignalId =
  | "receivables"
  | "supplier-payments"
  | "inventory"
  | "expected-cash"
  | "collection-risk";

export interface ForecastBriefItem {
  id: SignalId;
  name: string;
  category: string;
  entity: string;
  signalMetric: string;
  signalContext: string;
  
  // Executive Briefing Hierarchy
  impactEyebrow: string;
  primaryImpactMetric: string;
  primaryImpactUnit: string;
  primaryImpactHeadline: string;
  
  whyItMatters: string;
  
  decisionToConsider: string;
  decisionBenefitBadge: string;
  horizonTag: string;
}

const forecastBriefSignals: ForecastBriefItem[] = [
  {
    id: "receivables",
    name: "Receivables",
    category: "Inflow Signal",
    entity: "Ananya INV-10482 · ₹5.90L",
    signalMetric: "+15D LAG",
    signalContext: "Day +30 → +45 Shift",
    impactEyebrow: "POTENTIAL BUSINESS IMPACT",
    primaryImpactMetric: "₹5,90,000",
    primaryImpactUnit: "Inflow Drift (+15 Days past term)",
    primaryImpactHeadline:
      "Delayed customer collections shift Day +38 cash reserve below the operating safety floor.",
    whyItMatters:
      "Customer collections arrive after scheduled month-end supplier settlements, compressing available cash headroom by 41% during peak disbursement week.",
    decisionToConsider:
      "Automate a 1.25% early-settlement incentive (₹7,375 net cost) or execute TReDS discounting to advance ₹5.82L inflow to Day +28.",
    decisionBenefitBadge:
      "Accelerates ₹5.82L to Day +28 · Eliminates Day +38 cash valley without borrowing",
    horizonTag: "Timing: Day +30 → +45",
  },
  {
    id: "supplier-payments",
    name: "Supplier Payments",
    category: "Payment Commitment",
    entity: "Shanti Metals PO-9201 · ₹4.50L",
    signalMetric: "₹4.50L DUE",
    signalContext: "Section 43B(h) Window",
    impactEyebrow: "POTENTIAL BUSINESS IMPACT",
    primaryImpactMetric: "₹4,50,000",
    primaryImpactUnit: "Mandatory MSME Outflow (Section 43B(h))",
    primaryImpactHeadline:
      "Mandatory vendor payout coincides with ₹12.0L payroll disbursement before collections clear.",
    whyItMatters:
      "MSME vendor settlement is non-negotiable under Section 43B(h). Paying during peak payroll depletes operating reserves, while delaying beyond 45 days triggers compound interest penalties and forfeiture of tax deductibility.",
    decisionToConsider:
      "Lock the ₹4.50L MSME disbursement for Day +38 to safeguard tax deductions, while rescheduling non-statutory vendor payouts (PO-8814 ₹3.20L) to Day +48.",
    decisionBenefitBadge:
      "100% Tax Deductibility Safeguarded · Retains ₹3.20L liquidity during peak payroll",
    horizonTag: "Cutoff: Day +38",
  },
  {
    id: "inventory",
    name: "Inventory Commitments",
    category: "Operational Commitment",
    entity: "DC-02 Warehouse Hub · ₹6.20L",
    signalMetric: "-32% STOCK",
    signalContext: "Safety Stock Threshold",
    impactEyebrow: "POTENTIAL BUSINESS IMPACT",
    primaryImpactMetric: "-32% Floor",
    primaryImpactUnit: "Safety Stock Breach (₹6.20L PO Required)",
    primaryImpactHeadline:
      "A full 90-day replenishment PO locks operating capital before current batch collections arrive.",
    whyItMatters:
      "Releasing a full ₹6.20L PO drains immediate liquidity and adds warehouse holding fees, whereas zero procurement action halts assembly lines on Day +42 across ₹14.5L in contracted deliveries.",
    decisionToConsider:
      "Issue a split consignment PO: release ₹2.40L (30-day runway) now, releasing tranche 2 (₹3.80L) upon confirmed customer collections.",
    decisionBenefitBadge:
      "Zero Assembly Downtime · Preserves ₹3.80L liquid cash during critical cash valley",
    horizonTag: "PO Window: Day +20",
  },
  {
    id: "expected-cash",
    name: "Expected Cash",
    category: "Liquidity Trajectory",
    entity: "HDFC Operating Facility · ₹42.5L",
    signalMetric: "₹24.8L LOW",
    signalContext: "Day +38 Reserve Valley",
    impactEyebrow: "POTENTIAL BUSINESS IMPACT",
    primaryImpactMetric: "₹24,80,000",
    primaryImpactUnit: "Day +38 Projected Floor (₹17.7L Net Drawdown)",
    primaryImpactHeadline:
      "Operating cash buffer contracts to within ₹2.8L of the corporate emergency baseline.",
    whyItMatters:
      "Scheduled statutory payouts and payroll outpace delayed customer receipts, leaving zero margin of safety for secondary collection variances without emergency overdraft borrowing.",
    decisionToConsider:
      "Establish drawing power on the pre-approved credit facility or activate dynamic discounting across top receivables to secure a ₹15.0L standby reserve.",
    decisionBenefitBadge:
      "+₹15.0L Standby Buffer Secured · Zero Interest Cost Until Utilized",
    horizonTag: "Trajectory Floor: Day +38",
  },
  {
    id: "collection-risk",
    name: "Collection Risk",
    category: "Variance Pattern",
    entity: "Enterprise Accounts Ledger",
    signalMetric: "14-18D LAG",
    signalContext: "Cyclical Batch Pattern",
    impactEyebrow: "POTENTIAL BUSINESS IMPACT",
    primaryImpactMetric: "+11.4 Days",
    primaryImpactUnit: "Average DSO Variance (₹9.10L in 2 Accounts)",
    primaryImpactHeadline:
      "Fixed 25th-of-month AP approval cycles create an artificial 14–18 day collection lag.",
    whyItMatters:
      "Enterprise clients batch vendor payments on rigid monthly cutoff dates. Invoices delivered after the cutoff roll over to the following month, needlessly inflating DSO and working capital carrying cost.",
    decisionToConsider:
      "Advance invoice dispatch from the 28th to the 18th of each month to enter clients' current internal approval cycle without commercial friction.",
    decisionBenefitBadge:
      "Eliminates 15-day batching delay · Restores DSO to baseline without commercial friction",
    horizonTag: "Approval Cycle: 25th Monthly",
  },
];

export const PredictiveForecastBriefView = memo(function PredictiveForecastBriefView() {
  const [selectedSignalId, setSelectedSignalId] = useState<SignalId>("receivables");
  const nodeRefs = useRef<Record<SignalId, HTMLButtonElement | null>>({
    receivables: null,
    "supplier-payments": null,
    inventory: null,
    "expected-cash": null,
    "collection-risk": null,
  });

  const currentIndex = forecastBriefSignals.findIndex(s => s.id === selectedSignalId);
  const currentSignal = forecastBriefSignals[currentIndex] ?? forecastBriefSignals[0];

  const prevSignal = currentIndex > 0 ? forecastBriefSignals[currentIndex - 1] : null;
  const nextSignal = currentIndex < forecastBriefSignals.length - 1 ? forecastBriefSignals[currentIndex + 1] : null;

  const handleSelectPrev = () => {
    if (prevSignal) setSelectedSignalId(prevSignal.id);
  };

  const handleSelectNext = () => {
    if (nextSignal) setSelectedSignalId(nextSignal.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (index + 1 < forecastBriefSignals.length) {
        const nextId = forecastBriefSignals[index + 1].id;
        setSelectedSignalId(nextId);
        nodeRefs.current[nextId]?.focus();
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      if (index - 1 >= 0) {
        const prevId = forecastBriefSignals[index - 1].id;
        setSelectedSignalId(prevId);
        nodeRefs.current[prevId]?.focus();
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstId = forecastBriefSignals[0].id;
      setSelectedSignalId(firstId);
      nodeRefs.current[firstId]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastId = forecastBriefSignals[forecastBriefSignals.length - 1].id;
      setSelectedSignalId(lastId);
      nodeRefs.current[lastId]?.focus();
    }
  };

  return (
    <section
      id="predictive-forecast-brief"
      className="fo-forecast-brief-section"
      aria-label="Section: Predictive Business Decisions — View D: The Forecast Brief"
    >
      <div className="fo-forecast-brief-ambient" aria-hidden="true" />

      <div className="fo-forecast-brief-container">
        {/* EDITORIAL HEADER & INTRO (§4) */}
        <header className="fo-forecast-brief-header">
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
          <h2 className="fo-forecast-brief-heading">
            Every signal changes <em>the bigger picture.</em>
          </h2>
          <p className="fo-forecast-brief-lead">
            See how changes across receivables, payments and operations can influence your financial position—and the decisions that follow.
          </p>
        </header>

        {/* 2-COLUMN COCKPIT SPLIT (§5) */}
        <div className="fo-forecast-brief-workspace">
          {/* ==============================================================
              LEFT COLUMN: Business Signal Selector
              ============================================================== */}
          <div className="fo-forecast-signals-col">
            <div className="fo-forecast-signals-header" role="region" aria-label="Business Signals Header">
              <span className="fo-forecast-signals-label">BUSINESS SIGNALS</span>
              <span className="fo-forecast-signals-hint">Select a signal to inspect its executive forecast.</span>
            </div>

            {/* Mobile & Tablet Interactive Capsule Navigator */}
            <div className="fo-forecast-mobile-capsule" role="region" aria-label="Mobile Signal Selector">
              <button
                type="button"
                className="fo-brief-capsule-btn"
                onClick={handleSelectPrev}
                disabled={!prevSignal}
                aria-label={prevSignal ? `Previous: ${prevSignal.name}` : "No previous signal"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="fo-brief-capsule-active">
                <span className="fo-brief-capsule-dot" aria-hidden="true" />
                <span>{currentSignal.name}</span>
              </div>

              <button
                type="button"
                className="fo-brief-capsule-btn"
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
            <div className="fo-forecast-mobile-pills" role="tablist" aria-label="Quick Signal Pills">
              {forecastBriefSignals.map(sig => {
                const isActive = sig.id === selectedSignalId;
                return (
                  <button
                    key={sig.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`fo-forecast-pill-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setSelectedSignalId(sig.id)}
                  >
                    <span>{sig.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop 5-Signal List */}
            <div
              className="fo-forecast-signals-list"
              role="tablist"
              aria-label="Business Signals List"
            >
              {forecastBriefSignals.map((sig, idx) => {
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
                    aria-controls="fo-forecast-brief-content"
                    tabIndex={isSelected ? 0 : -1}
                    className={`fo-forecast-signal-card ${isSelected ? "is-selected" : ""}`}
                    onClick={() => setSelectedSignalId(sig.id)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                  >
                    <div className="fo-forecast-signal-header">
                      <span className="fo-forecast-signal-name">{sig.name}</span>
                      {isSelected && <span className="fo-forecast-signal-dot" aria-hidden="true" />}
                    </div>

                    <div className="fo-forecast-signal-meta">
                      <span className="fo-forecast-signal-badge">{sig.signalMetric}</span>
                      <span className="fo-forecast-signal-context">{sig.signalContext}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==============================================================
              RIGHT COLUMN: The Forecast Brief (Executive Briefing Surface)
              ============================================================== */}
          <div className="fo-forecast-brief-editorial-col">
            <article
              className="fo-forecast-brief-card"
              aria-label={`Forecast Brief for ${currentSignal.name}`}
            >
              {/* Context Top Bar */}
              <div className="fo-forecast-brief-topbar">
                <div className="fo-forecast-brief-entity-tag">
                  <span className="fo-entity-tag-dot" aria-hidden="true" />
                  <span>EXECUTIVE BRIEFING · {currentSignal.entity}</span>
                </div>

                <div className="fo-forecast-brief-horizon-pill">
                  <span>{currentSignal.horizonTag}</span>
                </div>
              </div>

              {/* The Briefing Content Stream (3 Clear Levels) */}
              <div
                id="fo-forecast-brief-content"
                key={currentSignal.id}
                className="fo-forecast-brief-content"
                role="region"
                aria-live="polite"
              >
                {/* ---------------- LEVEL 1: PROJECTED IMPACT (DOMINANT) ---------------- */}
                <div className="fo-brief-impact-section">
                  <span className="fo-brief-impact-eyebrow">
                    {currentSignal.impactEyebrow}
                  </span>

                  <div className="fo-brief-impact-headline-group">
                    <div className="fo-brief-impact-stat-row">
                      <span className="fo-brief-impact-stat">
                        {currentSignal.primaryImpactMetric}
                      </span>
                      <span className="fo-brief-impact-unit">
                        {currentSignal.primaryImpactUnit}
                      </span>
                    </div>

                    <h3 className="fo-brief-impact-takeaway">
                      {currentSignal.primaryImpactHeadline}
                    </h3>
                  </div>
                </div>

                {/* Subtle Divider */}
                <div className="fo-brief-divider" aria-hidden="true" />

                {/* ---------------- LEVEL 2: WHY IT MATTERS ---------------- */}
                <div className="fo-brief-why-section">
                  <span className="fo-brief-section-kicker">WHY IT MATTERS</span>
                  <p className="fo-brief-why-text">
                    {currentSignal.whyItMatters}
                  </p>
                </div>

                {/* ---------------- LEVEL 3: DECISION TO CONSIDER ---------------- */}
                <div className="fo-brief-decision-box">
                  <span className="fo-brief-decision-kicker">DECISION TO CONSIDER</span>
                  <h4 className="fo-brief-decision-action">
                    {currentSignal.decisionToConsider}
                  </h4>
                  <div className="fo-brief-decision-badge">
                    <span className="fo-brief-check-icon" aria-hidden="true">✓</span>
                    <span>{currentSignal.decisionBenefitBadge}</span>
                  </div>
                </div>
              </div>

              {/* Surface Bottom Trust Footer */}
              <div className="fo-forecast-brief-footer">
                <div className="fo-forecast-brief-governance">
                  <span className="fo-brief-shield" aria-hidden="true">🛡</span>
                  <span>Grounded in FlowOne ERP ledger · TXN-10482 Context · Human approval required</span>
                </div>
                <div className="fo-forecast-brief-status-tag">
                  Executive Briefing · Real-time
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PredictiveForecastBriefView;

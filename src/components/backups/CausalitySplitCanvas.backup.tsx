import React, { memo, useState, useEffect, useRef } from "react";
import "../causality-loops.css";

/* ==========================================================================
   Section 02 — The Business Causality Map (BACKUP)
   Suggestion 3: The Split Interactive Canvas
   Continuous Horizontal Stage Stepper + Cause & Consequence Dual-Wing Theatre
   ========================================================================== */

export interface CausalityStageData {
  id: string;
  num: string;
  name: string;
  progressPercent: number;
  triggerTitle: string;
  triggerDetail: string;
  consequence: string;
  metricBadge: string;
  contextTag: string;
  isFinal?: boolean;
}

const causalityStages: CausalityStageData[] = [
  {
    id: "order",
    num: "01",
    name: "Order",
    progressPercent: 20,
    triggerTitle: "Sales Order Locked",
    triggerDetail: "Customer accepts commercial quotation. Line items, pricing, and buyer GSTIN lock into one shared context.",
    consequence: "Commercial terms, customer GSTIN, and line items are locked into one shared transaction context without re-entry.",
    metricBadge: "SO-10482 · Confirmed",
    contextTag: "Commercial Context Formed",
  },
  {
    id: "inventory",
    num: "02",
    name: "Inventory",
    progressPercent: 36,
    triggerTitle: "Stock Reservation Triggered",
    triggerDetail: "DC-02 warehouse receives instant allocation signal. Physical inventory is earmarked before dispatch.",
    consequence: "Stock is allocated in real time. Physical goods lock against the sales order with zero spreadsheet drift.",
    metricBadge: "125 Units · DC-02",
    contextTag: "Inventory In Sync",
  },
  {
    id: "invoice",
    num: "03",
    name: "Invoice",
    progressPercent: 52,
    triggerTitle: "Tax Invoice & IRN Generated",
    triggerDetail: "Fulfillment gate pass verified. E-invoicing API clears with NIC portal and generates signed QR code.",
    consequence: "Operational fulfillment converts into a statutory tax invoice with IRN and tax metadata permanently attached.",
    metricBadge: "INV-10482 · 18% GST",
    contextTag: "Tax Cleared & Issued",
  },
  {
    id: "receivable",
    num: "04",
    name: "Receivable",
    progressPercent: 68,
    triggerTitle: "Ledger Debit Posted",
    triggerDetail: "Accounts receivable book updates instantly. Credit aging clock begins tracking Net-30 payment window.",
    consequence: "The open balance posts directly to the accounting ledger. Finance sees terms, due dates, and aging without lag.",
    metricBadge: "₹5,90,000 · Net 30",
    contextTag: "Real-Time Ledger Posted",
  },
  {
    id: "cash",
    num: "05",
    name: "Cash",
    progressPercent: 84,
    triggerTitle: "Inward Bank Match",
    triggerDetail: "HDFC bank feed ingests incoming NEFT. System matches customer remittance against open invoice.",
    consequence: "Inbound payment matches the invoice automatically. Ledger clears and UTR is logged with zero statement ticking.",
    metricBadge: "HDFC Matched 98%",
    contextTag: "Auto-Reconciled",
  },
  {
    id: "decision",
    num: "06",
    name: "Decision",
    progressPercent: 100,
    isFinal: true,
    triggerTitle: "Continuous Loop Complete",
    triggerDetail: "Closed loop updates working capital, cash forecast, and inventory reorder metrics in real time.",
    consequence: "Real-time working capital, liquidity, and operational metrics update instantly. Leadership acts on verified truth.",
    metricBadge: "Working Capital Updated",
    contextTag: "Continuous Loop Complete",
  },
];

export const CausalitySplitCanvasBackup = memo(function CausalitySplitCanvasBackup() {
  const [activeStageId, setActiveStageId] = useState<string>("order");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = causalityStages.findIndex(s => s.id === activeStageId);
  const activeStage = causalityStages[activeIndex] || causalityStages[0];
  const nextStage = causalityStages[(activeIndex + 1) % causalityStages.length];

  // Auto-progress stages every 4.2s when not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveStageId(prev => {
        const idx = causalityStages.findIndex(s => s.id === prev);
        return causalityStages[(idx + 1) % causalityStages.length].id;
      });
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (index + 1) % causalityStages.length;
      setActiveStageId(causalityStages[nextIdx].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (index - 1 + causalityStages.length) % causalityStages.length;
      setActiveStageId(causalityStages[prevIdx].id);
    }
  };

  return (
    <section
      id="business-causality"
      className="new-home-section new-home-causality-section fo-causality-split-section"
      aria-labelledby="causality-heading"
    >
      <div className="home-container">
        <div
          className="causality-panel fo-causality-split"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Ambient Decorative Glow */}
          <div className="causality-ambient-glow" aria-hidden="true" />

          {/* Section Introduction */}
          <div className="causality-intro">
            <div className="causality-label-pill" role="note" aria-label="Section label: The Business Loop">
              <span className="causality-label-beacon" aria-hidden="true" />
              <span>THE BUSINESS LOOP</span>
            </div>
            <h2 id="causality-heading" className="causality-heading">
              Business doesn’t happen in modules.
            </h2>
            <p className="causality-subtext">
              One continuous path. Six business stages. A chain of consequences.
            </p>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="causality-divider" aria-hidden="true" />

          {/* 1. HORIZONTAL STEPPER RAIL */}
          <div
            className="fo-causality-split__stepper-bar"
            role="tablist"
            aria-label="Six sequential business stages"
          >
            {causalityStages.map((stage, idx) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`fo-causality-split__step-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveStageId(stage.id)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                >
                  <div className="fo-causality-split__step-top">
                    <span className="fo-causality-split__step-num">{stage.num}</span>
                    <span className="fo-causality-split__step-dot" aria-hidden="true" />
                  </div>
                  <span className="fo-causality-split__step-name">{stage.name}</span>
                  <div className="fo-causality-split__step-progress-track" aria-hidden="true">
                    <div className={`fo-causality-split__step-progress-fill ${isPaused ? "is-paused" : ""}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* 2. SPLIT THEATRE CARD (CAUSE VS CONSEOUENCE) */}
          <div
            className="fo-causality-split__theatre"
            role="region"
            aria-live="polite"
            aria-label={`Active stage: ${activeStage.name}`}
          >
            {/* LEFT WING: THE BUSINESS EVENT (TRIGGER) */}
            <div className="fo-causality-split__wing fo-causality-split__wing--cause">
              <div className="fo-causality-split__wing-badge">
                <span>STAGE {activeStage.num} · BUSINESS EVENT</span>
              </div>
              <h3 className="fo-causality-split__wing-title">
                {activeStage.triggerTitle}
              </h3>
              <p className="fo-causality-split__wing-desc">
                {activeStage.triggerDetail}
              </p>

              <div className="fo-causality-split__pill-row">
                <span className="fo-causality-split__pill is-highlight">
                  <span aria-hidden="true">●</span> {activeStage.metricBadge}
                </span>
                <span className="fo-causality-split__pill">
                  {activeStage.contextTag}
                </span>
              </div>
            </div>

            {/* CENTER CONDUIT WITH ANIMATED DIRECTIONAL PULSE */}
            <div className="fo-causality-split__conduit" aria-hidden="true">
              <div className="fo-causality-split__conduit-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* RIGHT WING: DETERMINISTIC ENTERPRISE RIPPLE (CONSEQUENCE) */}
            <div className="fo-causality-split__wing fo-causality-split__wing--effect">
              <div className="fo-causality-split__wing-badge">
                <span>DETERMINISTIC ENTERPRISE RIPPLE</span>
              </div>
              <h3 className="fo-causality-split__wing-title">
                {activeStage.isFinal ? "Loop Completed & Connected" : `Ripple to ${nextStage.name}`}
              </h3>
              <p className="fo-causality-split__wing-desc">
                {activeStage.consequence}
              </p>

              <div className="fo-causality-split__pill-row">
                <span className="fo-causality-split__pill is-highlight">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M13.333 4 6 11.333 2.667 8"
                      stroke="#05C7F2"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {activeStage.isFinal ? "Closed Loop Complete" : "100% In Sync"}
                </span>
                <span className="fo-causality-split__pill">
                  {activeStage.isFinal ? "Telemetry Truth" : `Next: ${nextStage.name}`}
                </span>
              </div>
            </div>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="causality-divider" aria-hidden="true" />

          {/* Concluding Statement (Preserved exactly per approved design) */}
          <div className="causality-closing">
            <h3 className="causality-closing-headline">
              ONE BUSINESS EVENT. A CHAIN OF CONSEQUENCES.
            </h3>
            <p className="causality-closing-sub">
              Your software should understand the whole journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CausalitySplitCanvasBackup;

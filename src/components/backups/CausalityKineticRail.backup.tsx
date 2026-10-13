import React, { memo, useState, useEffect, useRef } from "react";
import "../causality-loops.css";

/* ==========================================================================
   Section 02 — The Business Loop (Causality Map) (BACKUP)
   Suggestion 1: The Interactive Kinetic Rail
   Continuous Pipeline Rail · Flowing Energy Pulse · Domino Ripple Wave
   ========================================================================== */

interface KineticStage {
  id: string;
  num: string;
  name: string;
  tag: string;
  triggerEvent: string;
  consequence: string;
  metricBadge: string;
  contextTag: string;
  rippleTarget: string;
  isFinal?: boolean;
}

const kineticStages: KineticStage[] = [
  {
    id: "order",
    num: "01",
    name: "Order",
    tag: "COMMERCIAL ORIGIN",
    triggerEvent: "Sales Order Locked (SO-10482)",
    consequence: "Commercial terms, customer GSTIN, and line items are locked into one shared transaction context without re-entry.",
    metricBadge: "SO-10482 · Confirmed",
    contextTag: "Commercial Context Formed",
    rippleTarget: "Allocates 125 Units at DC-02 Warehouse",
  },
  {
    id: "inventory",
    num: "02",
    name: "Inventory",
    tag: "STOCK ALLOCATION",
    triggerEvent: "DC-02 Stock Reservation",
    consequence: "Stock is allocated in real time. Physical goods lock against the sales order with zero spreadsheet drift.",
    metricBadge: "125 Units · DC-02",
    contextTag: "Inventory In Sync",
    rippleTarget: "Initiates E-Invoice Generation & IRN Filing",
  },
  {
    id: "invoice",
    num: "03",
    name: "Invoice",
    tag: "STATUTORY TAX",
    triggerEvent: "Tax Invoice & IRN Generated",
    consequence: "Operational fulfillment converts into a statutory tax invoice with IRN and tax metadata permanently attached.",
    metricBadge: "INV-10482 · 18% GST",
    contextTag: "Tax Cleared & Issued",
    rippleTarget: "Debits Accounts Receivable Ledger with Net-30 Terms",
  },
  {
    id: "receivable",
    num: "04",
    name: "Receivable",
    tag: "LEDGER POSTING",
    triggerEvent: "Real-Time Ledger Debit",
    consequence: "The open balance posts directly to the accounting ledger. Finance sees terms, due dates, and aging without lag.",
    metricBadge: "₹5,90,000 · Net 30",
    contextTag: "Real-Time Ledger Posted",
    rippleTarget: "Monitors Inward NEFT Settlement at HDFC Bank",
  },
  {
    id: "cash",
    num: "05",
    name: "Cash",
    tag: "BANK RECONCILIATION",
    triggerEvent: "Inbound NEFT Matched",
    consequence: "Inbound payment matches the invoice automatically. Ledger clears and UTR is logged with zero statement ticking.",
    metricBadge: "HDFC Matched 98%",
    contextTag: "Auto-Reconciled",
    rippleTarget: "Closes Loop & Updates Executive Working Capital",
  },
  {
    id: "decision",
    num: "06",
    name: "Decision",
    tag: "EXECUTIVE TRUTH",
    triggerEvent: "Continuous Loop Complete",
    consequence: "Real-time working capital, liquidity, and operational metrics update instantly. Leadership acts on verified truth.",
    metricBadge: "Working Capital Updated",
    contextTag: "Continuous Loop Complete",
    rippleTarget: "Loops Back into Continuous Commercial Pipeline",
    isFinal: true,
  },
];

export const CausalityKineticRailBackup = memo(function CausalityKineticRailBackup() {
  const [activeStageId, setActiveStageId] = useState<string>("order");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = kineticStages.findIndex(s => s.id === activeStageId);
  const activeStage = kineticStages[activeIndex] || kineticStages[0];

  // Auto-progress stages every 4.2s when not hovered
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveStageId(prev => {
        const idx = kineticStages.findIndex(s => s.id === prev);
        return kineticStages[(idx + 1) % kineticStages.length].id;
      });
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Calculate rail fill percentage based on active stage
  const railProgress = (activeIndex / (kineticStages.length - 1)) * 100;

  // Domino Ripple calculation: If hovering or active on stage i, downstream nodes wave
  const focusIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section
      id="business-causality"
      className="new-home-section new-home-causality-section fo-causality-kinetic-section"
      aria-labelledby="causality-heading"
    >
      <div className="home-container">
        <div
          className="causality-panel fo-causality-kinetic"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredIndex(null);
          }}
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

          {/* 1. KINETIC PIPELINE RAIL BOX */}
          <div
            className="fo-causality-kinetic__rail-box"
            role="region"
            aria-label="Interactive Kinetic Causality Rail"
          >
            {/* The Background Glowing Pipeline Track with Progress Fill */}
            <div className="fo-causality-kinetic__track-line" aria-hidden="true">
              <div
                className="fo-causality-kinetic__track-fill"
                style={{ width: `${railProgress}%` }}
              />
              {/* Traveling Pulse Energy Bead */}
              <div
                className="fo-causality-kinetic__pulse-bead"
                style={{ left: `${railProgress}%` }}
              />
            </div>

            {/* 6 Interactive Stage Nodes Row */}
            <div
              className="fo-causality-kinetic__nodes-row"
              role="tablist"
              aria-label="Causality Stages"
            >
              {kineticStages.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                const isDownstream = idx > focusIndex;
                const rippleDelay = (idx - focusIndex) * 0.08;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`fo-causality-kinetic__node-btn ${isActive ? "is-active" : ""} ${
                      isDownstream ? "is-downstream-ripple" : ""
                    }`}
                    style={
                      isDownstream
                        ? ({ "--ripple-delay": `${rippleDelay}s` } as React.CSSProperties)
                        : undefined
                    }
                    onClick={() => setActiveStageId(stage.id)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                  >
                    <div className="fo-causality-kinetic__node-beacon">
                      <span className="fo-causality-kinetic__node-halo" aria-hidden="true" />
                    </div>
                    <span className="fo-causality-kinetic__node-num">{stage.num}</span>
                    <span className="fo-causality-kinetic__node-label">{stage.name}</span>
                    <span className="fo-causality-kinetic__node-badge">{stage.metricBadge}</span>
                  </button>
                );
              })}
            </div>

            {/* 2. DEDICATED SINGLE-DECK CONSEQUENCE THEATER */}
            <div
              className="fo-causality-kinetic__theater-card"
              role="region"
              aria-live="polite"
              aria-label={`Active causality stage: ${activeStage.name}`}
            >
              <div className="fo-causality-kinetic__theater-left">
                <div className="fo-causality-kinetic__theater-meta">
                  <span className="fo-causality-kinetic__theater-tag">
                    STAGE {activeStage.num} · {activeStage.tag}
                  </span>
                  <span className="fo-causality-kinetic__theater-status">
                    {activeStage.contextTag}
                  </span>
                </div>
                <h3 className="fo-causality-kinetic__theater-title">
                  {activeStage.triggerEvent}
                </h3>
                <p className="fo-causality-kinetic__theater-desc">
                  {activeStage.consequence}
                </p>
              </div>

              <div className="fo-causality-kinetic__theater-right">
                <div className="fo-causality-kinetic__ripple-banner">
                  <span className="fo-causality-kinetic__ripple-label">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#05C7F2"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    AUTOMATED CAUSALITY RIPPLE:
                  </span>
                  <strong className="fo-causality-kinetic__ripple-target">
                    {activeStage.rippleTarget}
                  </strong>
                </div>

                <div className="fo-causality-kinetic__pill-row">
                  <span className="fo-causality-kinetic__pill is-primary">
                    {activeStage.isFinal ? "Closed Loop Complete" : "Zero Spreadsheet Drift"}
                  </span>
                  <span className="fo-causality-kinetic__pill">
                    {activeStage.metricBadge}
                  </span>
                </div>
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

export default CausalityKineticRailBackup;

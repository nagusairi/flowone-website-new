import React, { memo, useState, useEffect, useRef } from "react";
import "./causality-loops.css";

/* ==========================================================================
   Section 02 — The Business Loop (Causality Map)
   Suggestion 2: The Stadium Closed-Circuit Loop
   Circular Racetrack Circuit · Closed Loop Closure · Central Telemetry Hub
   ========================================================================== */

interface StadiumStage {
  id: string;
  num: string;
  name: string;
  tag: string;
  triggerEvent: string;
  consequence: string;
  metricBadge: string;
  contextTag: string;
  rippleTarget: string;
  placement: "top" | "bottom" | "right";
  isFinal?: boolean;
  // Coordinate on stadium racetrack (viewBox 960 x 540)
  x: number;
  y: number;
}

const stadiumStages: StadiumStage[] = [
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
    placement: "top",
    x: 260,
    y: 100,
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
    placement: "top",
    x: 480,
    y: 100,
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
    placement: "top",
    x: 700,
    y: 100,
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
    placement: "right",
    x: 870,
    y: 270,
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
    placement: "bottom",
    x: 620,
    y: 440,
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
    placement: "bottom",
    x: 340,
    y: 440,
  },
];

export const CausalityStadiumLoop = memo(function CausalityStadiumLoop() {
  const [activeStageId, setActiveStageId] = useState<string>("order");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timerResetKey, setTimerResetKey] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = stadiumStages.findIndex(s => s.id === activeStageId);
  const activeStage = stadiumStages[activeIndex] || stadiumStages[0];

  // Auto-progress stages in a continuous loop right from page load (4.6s per stage)
  useEffect(() => {
    if (isPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timerRef.current = setTimeout(() => {
      setActiveStageId(prev => {
        const idx = stadiumStages.findIndex(s => s.id === prev);
        return stadiumStages[(idx + 1) % stadiumStages.length].id;
      });
    }, 4600);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStageId, isPaused, timerResetKey]);

  // Smoothly center the active stage button within the mobile horizontal ribbon
  useEffect(() => {
    if (!mobileRailRef.current) return;
    const container = mobileRailRef.current;
    const activeBtn = container.querySelector<HTMLButtonElement>(".fo-stadium-mobile__stage-pill.is-active");

    if (activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const currentScroll = container.scrollLeft;
      const offsetWithinContainer = btnRect.left - containerRect.left;
      const targetScroll = currentScroll + offsetWithinContainer - (containerRect.width / 2) + (btnRect.width / 2);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth"
      });
    }
  }, [activeStageId]);

  // When user clicks a stage: jump immediately, reset dwell timer, and resume auto-loop
  const selectStage = (id: string) => {
    setActiveStageId(id);
    setIsPaused(false);
    setTimerResetKey(k => k + 1);
  };

  const goToNext = () => {
    setActiveStageId(prev => {
      const idx = stadiumStages.findIndex(s => s.id === prev);
      return stadiumStages[(idx + 1) % stadiumStages.length].id;
    });
    setIsPaused(false);
    setTimerResetKey(k => k + 1);
  };

  const goToPrev = () => {
    setActiveStageId(prev => {
      const idx = stadiumStages.findIndex(s => s.id === prev);
      return stadiumStages[(idx - 1 + stadiumStages.length) % stadiumStages.length].id;
    });
    setIsPaused(false);
    setTimerResetKey(k => k + 1);
  };

  return (
    <section
      id="business-causality"
      className="new-home-section new-home-causality-section fo-causality-stadium-section"
      aria-labelledby="causality-heading"
    >
      <div className="home-container">
        <div className="causality-panel fo-causality-stadium">
          {/* Subtle Ambient Decorative Glow */}
          <div className="causality-ambient-glow" aria-hidden="true" />

          {/* Section Introduction */}
          <div className="causality-intro">
            <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
              <div className="hero-modern-eyebrow is-static is-dark-theme" role="note" aria-label="The Business Loop">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>THE LOOP</span>
                </span>
                <span className="hero-eyebrow-title">CLOSED-CIRCUIT CAUSALITY</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
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

          {/* ==============================================================
              1. DESKTOP VIEW: STADIUM CLOSED-CIRCUIT TRACK ARENA (Desktop Only)
              Preserved 100% intact without modifying desktop coordinates or layout
              ============================================================== */}
          <div className="fo-causality-stadium__desktop-view">
            <div
              className="fo-causality-stadium__track-wrapper"
              role="region"
              aria-label="Closed-Loop Business Racetrack Circuit"
            >
              {/* SVG Circuit Canvas */}
              <div className="fo-causality-stadium__circuit-canvas">
                <svg
                  className="fo-causality-stadium__svg"
                  viewBox="0 0 960 540"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="stadiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0528F2" />
                      <stop offset="50%" stopColor="#05C7F2" />
                      <stop offset="100%" stopColor="#0528F2" />
                    </linearGradient>
                    <filter id="stadiumGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Base Stadium Racetrack Path */}
                  {/* Top straight: 260,100 -> 700,100 | Right arc: to 700,440 | Bottom straight: to 260,440 | Left arc: back to 260,100 */}
                  <path
                    d="M 260 100 L 700 100 A 170 170 0 0 1 700 440 L 260 440 A 170 170 0 0 1 260 100 Z"
                    className="fo-stadium-loop-path"
                  />

                  {/* Continuous Flowing Energy Pulse Stream */}
                  <path
                    d="M 260 100 L 700 100 A 170 170 0 0 1 700 440 L 260 440 A 170 170 0 0 1 260 100 Z"
                    className="fo-stadium-pulse-path"
                  />

                  {/* Left Return Conduit Loop Badge */}
                  <g transform="translate(45, 242)">
                    <rect
                      width="120"
                      height="56"
                      rx="8"
                      fill="rgba(5, 40, 242, 0.25)"
                      stroke="rgba(5, 199, 242, 0.45)"
                      strokeWidth="1.5"
                    />
                    <text
                      x="60"
                      y="24"
                      fill="#05C7F2"
                      fontSize="9"
                      fontWeight="800"
                      fontFamily="monospace"
                      textAnchor="middle"
                      letterSpacing="0.08em"
                    >
                      CLOSED LOOP
                    </text>
                    <text
                      x="60"
                      y="42"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      ↻ RECIRCULATES
                    </text>
                  </g>

                  {/* Connector lines to central hub for active stage */}
                  <line
                    x1={activeStage.x}
                    y1={activeStage.y}
                    x2={480}
                    y2={270}
                    stroke="#05C7F2"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                </svg>

                {/* 6 Interactive Perimeter Nodes (HTML positioned over SVG) */}
                <div
                  className="fo-causality-stadium__nodes-overlay"
                  role="tablist"
                  aria-label="Stadium Loop Stages"
                >
                  {stadiumStages.map(stage => {
                    const isActive = stage.id === activeStageId;
                    // Percentage coordinates for responsive positioning (960 x 540)
                    const leftPct = (stage.x / 960) * 100;
                    const topPct = (stage.y / 540) * 100;

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        className={`fo-causality-stadium__node-btn is-${stage.placement} ${isActive ? "is-active" : ""}`}
                        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                        onClick={() => selectStage(stage.id)}
                      >
                        <div className="fo-causality-stadium__node-core">
                          <span className="fo-causality-stadium__node-num">{stage.num}</span>
                        </div>
                        <div className="fo-causality-stadium__node-callout">
                          <span className="fo-causality-stadium__node-name">{stage.name}</span>
                          <span className="fo-causality-stadium__node-badge">{stage.metricBadge}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Central Command & Telemetry Console */}
                <div
                  className="fo-causality-stadium__center-hub"
                  role="region"
                  aria-live="polite"
                  aria-label={`Active stage telemetry: ${activeStage.name}`}
                >
                  {/* Dynamic Loop Progress Bar */}
                  {!isPaused && (
                    <div className="fo-stadium-loop-progress-bar" key={`hub-bar-${activeStage.id}-${timerResetKey}`} aria-hidden="true">
                      <div className="fo-stadium-loop-progress-fill" />
                    </div>
                  )}

                  <div className="fo-causality-stadium__hub-top">
                    <span className="fo-causality-stadium__hub-pill">
                      STAGE {activeStage.num} · {activeStage.tag}
                    </span>
                    <div className="fo-causality-stadium__hub-top-right">
                      <span className="fo-causality-stadium__hub-status">
                        {activeStage.contextTag}
                      </span>
                      <button
                        type="button"
                        className={`fo-stadium-loop-badge ${isPaused ? "is-paused" : "is-looping"}`}
                        onClick={() => setIsPaused(p => !p)}
                        aria-label={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
                        title={isPaused ? "Click to resume loop" : "Click to pause loop"}
                      >
                        <span className="fo-stadium-loop-beacon" aria-hidden="true" />
                        <span>{isPaused ? "PAUSED" : "AUTO LOOP"}</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="fo-causality-stadium__hub-title">
                    {activeStage.triggerEvent}
                  </h3>

                  <p className="fo-causality-stadium__hub-desc">
                    {activeStage.consequence}
                  </p>

                  <div className="fo-causality-stadium__hub-footer">
                    <div className="fo-causality-stadium__hub-ripple">
                      <span className="fo-causality-stadium__hub-ripple-label">
                        NEXT RIPPLE:
                      </span>
                      <strong className="fo-causality-stadium__hub-ripple-val">
                        {activeStage.rippleTarget}
                      </strong>
                    </div>

                    <div className="fo-causality-stadium__hub-pills">
                      <span className="fo-causality-stadium__hub-badge is-active">
                        {activeStage.isFinal ? "Loop Complete" : "Zero Re-Keying"}
                      </span>
                      <span className="fo-causality-stadium__hub-badge">
                        {activeStage.metricBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              2. MOBILE VIEW: THE CLOSED-LOOP CIRCUIT COCKPIT (Mobile Only <= 768px)
              Creative, tactile, responsive vertical circuit layout with zero overlap
              ============================================================== */}
          <div
            className="fo-causality-stadium__mobile-view"
            role="region"
            aria-label="Mobile Business Loop Closed-Circuit View"
          >
            {/* Top Circuit Stage Rail with Infinite Loop Indicator */}
            <div className="fo-stadium-mobile__rail-shell" ref={mobileRailRef}>
              <div className="fo-stadium-mobile__rail-track" role="tablist" aria-label="Business loop stages">
                {stadiumStages.map((stage, idx) => {
                  const isActive = stage.id === activeStageId;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-stadium-mobile__stage-pill ${isActive ? "is-active" : ""}`}
                      onClick={() => selectStage(stage.id)}
                    >
                      <span className="fo-stadium-mobile__pill-num">{stage.num}</span>
                      <span className="fo-stadium-mobile__pill-name">{stage.name}</span>
                      {idx < stadiumStages.length - 1 && (
                        <span className="fo-stadium-mobile__pill-arrow" aria-hidden="true">→</span>
                      )}
                    </button>
                  );
                })}
                {/* Loop Closure Conduit Badge */}
                <div className="fo-stadium-mobile__loop-badge" aria-hidden="true">
                  <span>↻</span>
                  <span>CLOSED LOOP</span>
                </div>
              </div>
            </div>

            {/* Mobile Active Stage Cockpit Card */}
            <div className="fo-stadium-mobile__card" role="region" aria-live="polite">
              {/* Dynamic Loop Progress Bar */}
              {!isPaused && (
                <div className="fo-stadium-loop-progress-bar" key={`mob-bar-${activeStage.id}-${timerResetKey}`} aria-hidden="true">
                  <div className="fo-stadium-loop-progress-fill" />
                </div>
              )}

              <div className="fo-stadium-mobile__card-top">
                <span className="fo-stadium-mobile__card-badge">
                  STAGE {activeStage.num} · {activeStage.tag}
                </span>
                <button
                  type="button"
                  className={`fo-stadium-loop-badge fo-stadium-loop-badge--mobile ${isPaused ? "is-paused" : "is-looping"}`}
                  onClick={() => setIsPaused(p => !p)}
                  aria-label={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
                >
                  <span className="fo-stadium-loop-beacon" aria-hidden="true" />
                  <span>{isPaused ? "PAUSED" : "LOOP"}</span>
                </button>
              </div>

              <h3 className="fo-stadium-mobile__card-title">
                {activeStage.triggerEvent}
              </h3>

              <p className="fo-stadium-mobile__card-desc">
                {activeStage.consequence}
              </p>

              {/* Ripple Conduit Alert */}
              <div className="fo-stadium-mobile__ripple-banner">
                <span className="fo-stadium-mobile__ripple-label">NEXT RIPPLE:</span>
                <strong className="fo-stadium-mobile__ripple-val">{activeStage.rippleTarget}</strong>
              </div>

              {/* Telemetry Pills */}
              <div className="fo-stadium-mobile__card-footer">
                <span className="fo-stadium-mobile__tag-pill is-primary">
                  {activeStage.isFinal ? "Loop Complete" : "Zero Re-Keying"}
                </span>
                <span className="fo-stadium-mobile__tag-pill">
                  {activeStage.metricBadge}
                </span>
              </div>
            </div>

            {/* Closed Loop Continuous Flow Banner */}
            <div className={`fo-stadium-mobile__circuit-banner ${activeStage.isFinal ? "is-closing" : ""}`}>
              <div className="fo-stadium-mobile__circuit-icon" aria-hidden="true">
                ↻
              </div>
              <div className="fo-stadium-mobile__circuit-text">
                <strong>{activeStage.isFinal ? "Closed Loop Complete" : "Continuous Closed Circuit"}</strong>
                <span>
                  {activeStage.isFinal
                    ? "Executive truth loops back to commercial origin with zero silo drift."
                    : `Stage ${activeStage.num} of 06 connected in real-time causality.`}
                </span>
              </div>
            </div>

            {/* Thumb Stepper Navigation */}
            <div className="fo-stadium-mobile__stepper-bar">
              <button
                type="button"
                className="fo-stadium-mobile__step-btn"
                onClick={goToPrev}
                aria-label="Previous business stage"
              >
                ← Prev
              </button>
              <div className="fo-stadium-mobile__step-dots" aria-hidden="true">
                {stadiumStages.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    className={`fo-stadium-mobile__step-dot ${s.id === activeStageId ? "is-active" : ""}`}
                    onClick={() => selectStage(s.id)}
                    aria-label={`Jump to stage ${s.num}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="fo-stadium-mobile__step-btn"
                onClick={goToNext}
                aria-label="Next business stage"
              >
                Next →
              </button>
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

export default CausalityStadiumLoop;

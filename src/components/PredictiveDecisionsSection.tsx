import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import "./predictive-decisions.css";

/* ==========================================================================
   Section 06 — Predictive Business Decisions
   Direction A — The Future Signal: Cinematic Scroll-Driven Financial Forecast
   ========================================================================== */

export type ForecastScene = "present" | "future" | "pressure" | "decision" | "outcomes";

interface TimelinePoint {
  dayLabel: string;
  dayOffset: number;
  actualCash?: number; // in Lakhs (e.g. 42.5 = ₹42,50,000)
  projectedCash?: number;
  projectedLow?: number;
  projectedHigh?: number;
  alternativeCash?: number; // with decision executed
  eventTag?: string;
  eventDescription?: string;
  isPressurePoint?: boolean;
  isToday?: boolean;
}

const timelineData: TimelinePoint[] = [
  {
    dayLabel: "-30D",
    dayOffset: -30,
    actualCash: 38.2,
    eventTag: "HISTORICAL",
    eventDescription: "Q1 Final Close Settled",
  },
  {
    dayLabel: "-15D",
    dayOffset: -15,
    actualCash: 40.8,
    eventTag: "COLLECTIONS",
    eventDescription: "₹18.4L Routine Receivables Cleared",
  },
  {
    dayLabel: "TODAY (0D)",
    dayOffset: 0,
    actualCash: 42.5,
    projectedCash: 42.5,
    projectedLow: 42.5,
    projectedHigh: 42.5,
    alternativeCash: 42.5,
    isToday: true,
    eventTag: "CURRENT POSITION",
    eventDescription: "₹42,50,000 Cash on Hand · INV-10482 Booked (₹5.90L)",
  },
  {
    dayLabel: "+15D",
    dayOffset: 15,
    projectedCash: 45.2,
    projectedLow: 43.8,
    projectedHigh: 46.5,
    alternativeCash: 45.2,
    eventTag: "EXPECTED INFLOW",
    eventDescription: "Vertex Corp ₹3.20L Expected",
  },
  {
    dayLabel: "+30D",
    dayOffset: 30,
    projectedCash: 39.4,
    projectedLow: 36.8,
    projectedHigh: 41.5,
    alternativeCash: 44.5,
    eventTag: "ORIGINAL DUE DATE",
    eventDescription: "Ananya INV-10482 Due (Historical 12-day drift detected)",
  },
  {
    dayLabel: "+38D",
    dayOffset: 38,
    projectedCash: 24.8,
    projectedLow: 21.5,
    projectedHigh: 27.2,
    alternativeCash: 38.6,
    isPressurePoint: true,
    eventTag: "PRESSURE POINT",
    eventDescription: "MSME Vendor Settlement ₹4.50L + Payroll ₹12.00L Due",
  },
  {
    dayLabel: "+45D",
    dayOffset: 45,
    projectedCash: 32.1,
    projectedLow: 28.5,
    projectedHigh: 35.0,
    alternativeCash: 43.8,
    eventTag: "DELAYED COLLECTION",
    eventDescription: "Ananya Inflow Arrives (Delayed by 15 Days)",
  },
  {
    dayLabel: "+60D",
    dayOffset: 60,
    projectedCash: 39.8,
    projectedLow: 35.2,
    projectedHigh: 44.0,
    alternativeCash: 48.2,
    eventTag: "MONTH-END HORIZON",
    eventDescription: "Normalized Operating Working Capital",
  },
];

/* ==========================================================================
   Subcomponent: PredictiveSectionIntro
   Renders Section Label, Headline & Supporting Copy (Strict Approved Copy)
   ========================================================================== */
function PredictiveSectionIntro() {
  return (
    <div className="fo-predictive__intro">
      <div className="fo-predictive__eyebrow" role="note" aria-label="Predictive Business Decisions">
        <span className="fo-predictive__beacon" aria-hidden="true" />
        <span className="fo-predictive__eyebrow-text">PREDICTIVE BUSINESS DECISIONS</span>
      </div>

      <h2 className="fo-predictive__heading">
        See what&apos;s coming.<br />
        <em>Decide with clarity.</em>
      </h2>

      <p className="fo-predictive__copy">
        Connected financial signals help you anticipate what may happen next—and understand which decisions deserve attention today.
      </p>
    </div>
  );
}

/* ==========================================================================
   Subcomponent: FutureSignalVisualization
   Interactive SVG Chart transitioning from Actual (Solid) to Projected (Dashed)
   ========================================================================== */
interface VisualProps {
  scene: ForecastScene;
  activePointIndex: number;
  onSelectPoint: (idx: number) => void;
  decisionApplied: boolean;
  onToggleDecision: () => void;
}

function FutureSignalVisualization({
  scene,
  activePointIndex,
  onSelectPoint,
  decisionApplied,
  onToggleDecision,
}: VisualProps) {
  // SVG Dimensions & Coordinate Scaling
  // viewBox: 0 0 920 360
  // X: 80 to 860 (range: 780)
  // Y: 310 (₹15L) to 50 (₹55L) (range: 260)
  const minCash = 15;
  const maxCash = 55;

  const getX = (offset: number) => {
    // offset ranges from -30 to +60 (total 90)
    const norm = (offset - -30) / 90;
    return 75 + norm * 770;
  };

  const getY = (val: number) => {
    const norm = (val - minCash) / (maxCash - minCash);
    return 310 - norm * 260;
  };

  // Coordinates of key landmarks
  const xToday = getX(0); // Day 0
  const yToday = getY(42.5);

  // Scene Visibility Flags
  const showFuture = scene !== "present";
  const showPressure = scene === "pressure" || scene === "decision" || scene === "outcomes";
  const showDecisionState = scene === "decision" || scene === "outcomes";

  // Actual Curve Path (Days -30 to 0)
  const actualPath = `M ${getX(-30)} ${getY(38.2)} Q ${getX(-22)} ${getY(39.0)}, ${getX(-15)} ${getY(40.8)} T ${xToday} ${yToday}`;

  // Projected Base Curve Path (Days 0 to +60)
  const p15 = [getX(15), getY(45.2)];
  const p30 = [getX(30), getY(39.4)];
  const p38 = [getX(38), getY(24.8)]; // Pressure dip
  const p45 = [getX(45), getY(32.1)];
  const p60 = [getX(60), getY(39.8)];

  const projectedCurve = `M ${xToday} ${yToday} C ${getX(7)} ${getY(44.5)}, ${getX(10)} ${p15[1]}, ${p15[0]} ${p15[1]} C ${getX(22)} ${getY(45.5)}, ${getX(25)} ${p30[1]}, ${p30[0]} ${p30[1]} C ${getX(33)} ${getY(33.0)}, ${getX(35)} ${p38[1]}, ${p38[0]} ${p38[1]} C ${getX(40)} ${getY(23.0)}, ${getX(42)} ${p45[1]}, ${p45[0]} ${p45[1]} C ${getX(50)} ${getY(35.5)}, ${getX(55)} ${p60[1]}, ${p60[0]} ${p60[1]}`;

  // Alternative Recovered Path (with Decision executed)
  const alt30 = [getX(30), getY(44.5)];
  const alt38 = [getX(38), getY(38.6)]; // Avoids dip!
  const alt45 = [getX(45), getY(43.8)];
  const alt60 = [getX(60), getY(48.2)];

  const alternativeCurve = `M ${xToday} ${yToday} C ${getX(10)} ${getY(44.0)}, ${getX(20)} ${alt30[1]}, ${alt30[0]} ${alt30[1]} C ${getX(34)} ${getY(42.0)}, ${getX(36)} ${alt38[1]}, ${alt38[0]} ${alt38[1]} C ${getX(41)} ${getY(41.0)}, ${getX(43)} ${alt45[1]}, ${alt45[0]} ${alt45[1]} C ${getX(52)} ${getY(46.0)}, ${getX(56)} ${alt60[1]}, ${alt60[0]} ${alt60[1]}`;

  // Uncertainty Corridor Area Polygon (Days 0 to +60)
  const upperPath = `${xToday},${yToday} C ${getX(10)},${getY(46.5)} ${getX(25)},${getY(41.5)} ${p30[0]},${getY(41.5)} C ${getX(35)},${getY(27.2)} ${getX(42)},${getY(35.0)} ${p45[0]},${getY(35.0)} C ${getX(55)},${getY(44.0)} ${getX(58)},${getY(44.0)} ${p60[0]},${getY(44.0)}`;
  const lowerPath = `${p60[0]},${getY(35.2)} C ${getX(55)},${getY(32.0)} ${getX(45)},${getY(28.5)} ${p45[0]},${getY(28.5)} C ${getX(38)},${getY(21.5)} ${getX(32)},${getY(36.8)} ${p30[0]},${getY(36.8)} C ${getX(20)},${getY(43.8)} ${getX(10)},${getY(42.5)} ${xToday},${yToday}`;
  const corridorPoints = `${upperPath} L ${lowerPath} Z`;

  return (
    <div className="fo-predictive__chart-wrapper">
      {/* Top Chart Header: Visual Legend & Scenario Switcher */}
      <div className="fo-predictive__chart-header">
        <div className="fo-predictive__legend">
          <div className="fo-legend-item is-actual">
            <span className="fo-legend-line fo-legend-line--solid" />
            <span className="fo-legend-label">ACTUAL (Verified Ledger)</span>
          </div>

          <div className="fo-legend-item is-projected">
            <span className="fo-legend-line fo-legend-line--dashed" />
            <span className="fo-legend-label">PROJECTED (Connected Signals)</span>
          </div>

          {showDecisionState && decisionApplied && (
            <div className="fo-legend-item is-optimized">
              <span className="fo-legend-line fo-legend-line--optimized" />
              <span className="fo-legend-label">RESOLVED POSITION (+₹13.8L BUFFER)</span>
            </div>
          )}
        </div>

        {/* Interactive Scenario Toggle (Scene 4 & 5) */}
        {showDecisionState && (
          <div className="fo-predictive__scenario-toggle">
            <span className="fo-toggle-kicker">MODEL SCENARIO:</span>
            <button
              type="button"
              className={`fo-toggle-pill ${!decisionApplied ? "is-active" : ""}`}
              onClick={onToggleDecision}
            >
              Base Forecast (Unmitigated)
            </button>
            <button
              type="button"
              className={`fo-toggle-pill ${decisionApplied ? "is-active is-resolved" : ""}`}
              onClick={onToggleDecision}
            >
              ✦ With Early-Pay Rebate
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="fo-predictive__svg-canvas">
        <svg
          viewBox="0 0 920 360"
          className="fo-predictive-svg"
          aria-label="Financial forecast line chart showing cash position transitioning from actual to projected with liquidity pressure point"
        >
          <defs>
            {/* Uncertainty Corridor Gradient */}
            <linearGradient id="foForecastBandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#D9299B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0528F2" stopOpacity="0.08" />
            </linearGradient>

            {/* Critical Pressure Zone Glow */}
            <linearGradient id="foRiskZoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9299B" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D9299B" stopOpacity="0.02" />
            </linearGradient>

            {/* Resolved Buffer Zone Glow */}
            <linearGradient id="foResolvedBandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16803C" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#16803C" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid Lines (Y-Axis Cash Levels) */}
          {[50, 40, 30, 20].map(cashVal => {
            const y = getY(cashVal);
            return (
              <g key={cashVal} className="fo-svg-grid-row">
                <line x1="60" y1={y} x2="880" y2={y} className="fo-svg-grid-line" />
                <text x="50" y={y + 4} className="fo-svg-grid-label" textAnchor="end">
                  ₹{cashVal}L
                </text>
              </g>
            );
          })}

          {/* Baseline Zero Liquidity Floor */}
          <line x1="60" y1="310" x2="880" y2="310" className="fo-svg-floor-line" />

          {/* Vertical 'TODAY' Separation Divider */}
          <line
            x1={xToday}
            y1="40"
            x2={xToday}
            y2="315"
            className="fo-svg-today-divider"
          />
          <g transform={`translate(${xToday}, 32)`}>
            <rect x="-38" y="-12" width="76" height="20" rx="10" className="fo-today-pill-bg" />
            <text x="0" y="2" textAnchor="middle" className="fo-today-pill-text">TODAY</text>
          </g>

          {/* Uncertainty Corridor Band (Scene 2+) */}
          {showFuture && !decisionApplied && (
            <path
              d={`M ${corridorPoints}`}
              fill="url(#foForecastBandGrad)"
              className="fo-svg-corridor-path"
            />
          )}

          {/* Pressure Danger Column Zone (Scene 3+) */}
          {showPressure && !decisionApplied && (
            <rect
              x={getX(34)}
              y="50"
              width={getX(42) - getX(34)}
              height="260"
              fill="url(#foRiskZoneGrad)"
              className="fo-svg-pressure-zone"
            />
          )}

          {/* 1. ACTUAL LINE (Solid Electric Blue) */}
          <path
            d={actualPath}
            fill="none"
            className="fo-svg-actual-line"
          />

          {/* 2. BASE PROJECTED LINE (Dashed Cyan / Magenta) */}
          {showFuture && (
            <path
              d={projectedCurve}
              fill="none"
              className={`fo-svg-projected-line ${decisionApplied ? "is-dimmed" : ""}`}
            />
          )}

          {/* 3. RECOVERED ALTERNATIVE LINE (Scene 4 & 5 when applied) */}
          {showDecisionState && decisionApplied && (
            <path
              d={alternativeCurve}
              fill="none"
              className="fo-svg-alternative-line"
            />
          )}

          {/* Event Nodes & Markers on Curve */}
          {timelineData.map((pt, idx) => {
            const x = getX(pt.dayOffset);
            const isActual = pt.dayOffset <= 0;
            const isCurrent = idx === activePointIndex;

            let y = getY(pt.actualCash || pt.projectedCash || 42.5);
            if (decisionApplied && pt.alternativeCash) {
              y = getY(pt.alternativeCash);
            }

            // Only show future nodes when future is unlocked in scene
            if (!isActual && !showFuture) return null;

            return (
              <g
                key={pt.dayLabel}
                className={`fo-svg-node ${isCurrent ? "is-selected" : ""} ${pt.isPressurePoint ? "is-pressure" : ""} ${pt.isToday ? "is-today" : ""}`}
                onClick={() => onSelectPoint(idx)}
                style={{ cursor: "pointer" }}
              >
                {/* Node Vertical Alignment Guide on Hover/Selection */}
                {isCurrent && (
                  <line x1={x} y1="40" x2={x} y2="310" className="fo-node-guide-line" />
                )}

                {/* Outer Pulse Ring for Pressure Point */}
                {pt.isPressurePoint && showPressure && !decisionApplied && (
                  <circle cx={x} cy={y} r="14" className="fo-pressure-pulse-ring" />
                )}

                {/* Node Point Dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isCurrent ? "6.5" : pt.isPressurePoint ? "5.5" : "4.5"}
                  className={`fo-node-dot ${isActual ? "is-actual-dot" : "is-projected-dot"}`}
                />

                {/* Day Label along X-Axis */}
                <text x={x} y="332" textAnchor="middle" className="fo-svg-x-label">
                  {pt.dayLabel}
                </text>
              </g>
            );
          })}

          {/* Callout Beacon for Pressure Point (+38D) */}
          {showPressure && !decisionApplied && (
            <g transform={`translate(${getX(38)}, ${getY(24.8) - 22})`}>
              <rect x="-60" y="-24" width="120" height="24" rx="4" className="fo-pressure-badge-bg" />
              <text x="0" y="-8" textAnchor="middle" className="fo-pressure-badge-text">
                ⚠️ DEFICIT RISK: ₹24.8L
              </text>
            </g>
          )}

          {/* Callout Beacon for Resolved Position */}
          {showDecisionState && decisionApplied && (
            <g transform={`translate(${getX(38)}, ${getY(38.6) - 22})`}>
              <rect x="-65" y="-24" width="130" height="24" rx="4" className="fo-resolved-badge-bg" />
              <text x="0" y="-8" textAnchor="middle" className="fo-resolved-badge-text">
                ✓ BUFFER SECURED: ₹38.6L
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Forecast Explanation Strip */}
      <div className="fo-predictive__chart-footer">
        <div className="fo-chart-footer-label">
          <strong>ACTUAL → PROJECTED</strong>
          <span>Explore how expected collections and upcoming payments may shape your future cash position.</span>
        </div>

        <div className="fo-chart-footer-metrics">
          <div className="fo-footer-metric">
            <small>CURRENT CASH</small>
            <strong>₹42.50 Lakhs</strong>
          </div>
          <div className="fo-footer-metric-div" aria-hidden="true" />
          <div className="fo-footer-metric">
            <small>DAY +38 RISK</small>
            <strong className={decisionApplied ? "is-resolved-metric" : "is-risk-metric"}>
              {decisionApplied ? "₹38.60 Lakhs (Safe)" : "₹24.80 Lakhs (Pressure)"}
            </strong>
          </div>
          <div className="fo-footer-metric-div" aria-hidden="true" />
          <div className="fo-footer-metric">
            <small>HORIZON</small>
            <strong>60-Day Forward Signal</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Subcomponent: ForecastInsightPanel
   Explains the Business Event / Assumption behind the highlighted forecast point
   ========================================================================== */
interface InsightProps {
  scene: ForecastScene;
  activePoint: TimelinePoint;
}

function ForecastInsightPanel({ scene, activePoint }: InsightProps) {
  const isPressure = scene === "pressure" || scene === "decision" || scene === "outcomes" || activePoint.isPressurePoint;

  return (
    <div className={`fo-predictive__insight-card ${isPressure ? "is-pressure-alert" : ""}`}>
      <div className="fo-insight-header">
        <span className="fo-insight-badge">
          <span className="fo-insight-beacon" aria-hidden="true" />
          {isPressure ? "SIGNAL EVENT IDENTIFIED" : "CONNECTED CONTEXT"}
        </span>
        <span className="fo-insight-time-tag">
          {activePoint.dayLabel} · TIMELINE INSPECTOR
        </span>
      </div>

      <h3 className="fo-insight-title">
        {isPressure
          ? "Receivable Delay Meets Mandatory MSME Supplier Settlement"
          : activePoint.eventDescription}
      </h3>

      <p className="fo-insight-body">
        {isPressure ? (
          <>
            <strong>Ananya Enterprises</strong> (INV-10482, ₹5,90,000) typically remits in 42 days rather than Net 30.
            Meanwhile, scheduled supplier disbursement for <strong>DC-02 Storage Edge Units (₹4,50,000)</strong> must legally settle
            under <strong>Section 43B(h) (45-Day MSME Rule)</strong> on Day +38, creating a temporary ₹17.7 Lakh liquidity squeeze.
          </>
        ) : (
          <>
            Based on historical transaction telemetry, purchase contracts and verified banking streams,
            flowOne synthesizes known invoices and projected commitments into one deterministic working capital trajectory.
          </>
        )}
      </p>

      {/* Structural Data Breakdown Matrix */}
      <div className="fo-insight-data-grid">
        <div className="fo-insight-metric-box">
          <span className="fo-data-label">EXPECTED INFLOW</span>
          <strong className="fo-data-val">₹5,90,000</strong>
          <small className="fo-data-sub">INV-10482 (Ananya)</small>
        </div>

        <div className="fo-insight-metric-box">
          <span className="fo-data-label">COMMITMENT DUE</span>
          <strong className="fo-data-val is-negative">-₹4,50,000</strong>
          <small className="fo-data-sub">PO-9201 (Supplier)</small>
        </div>

        <div className="fo-insight-metric-box">
          <span className="fo-data-label">STATUTORY WINDOW</span>
          <strong className="fo-data-val">MSME 45-Day</strong>
          <small className="fo-data-sub">Sec 43B(h) Strict</small>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Subcomponent: DecisionConsiderationPanel
   Presents concrete, context-aware decisions the business can consider
   ========================================================================== */
interface DecisionProps {
  decisionApplied: boolean;
  onApplyDecision: () => void;
}

function DecisionConsiderationPanel({ decisionApplied, onApplyDecision }: DecisionProps) {
  return (
    <div className={`fo-predictive__decision-card ${decisionApplied ? "is-applied" : ""}`}>
      <div className="fo-decision-header">
        <span className="fo-decision-kicker">DECISION TO CONSIDER</span>
        <span className="fo-decision-confidence">PRE-EMPTIVE ACTION RECOMMENDED</span>
      </div>

      <h3 className="fo-decision-title">
        Resolve the Liquidity Deficit Before Settlement Due Date
      </h3>

      <p className="fo-decision-desc">
        Forecast visibility helps the business consider options earlier. You have 3 validated paths before Day +38:
      </p>

      {/* Action Options Grid */}
      <div className="fo-decision-options" role="list">
        {/* Option 1: Dynamic Early Payment Incentive */}
        <div className={`fo-decision-option-tile ${decisionApplied ? "is-selected-action" : ""}`} role="listitem">
          <div className="fo-option-top">
            <span className="fo-option-tag">RECOMMENDED OPTION</span>
            <span className="fo-option-impact">+₹5.81L BY DAY +28</span>
          </div>
          <strong className="fo-option-name">Offer 1.5% Early-Settlement Rebate to Ananya</strong>
          <p className="fo-option-sub">
            Incentivize buyer with a ₹8,850 dynamic rebate to settle within 28 days.
            Secures ₹5,81,150 cash in bank 10 days before supplier PO settlement.
          </p>
          <button
            type="button"
            className="fo-option-action-btn"
            onClick={onApplyDecision}
          >
            {decisionApplied ? "✓ Simulation Applied (Buffer Active)" : "Simulate Early-Payment Rebate"}
          </button>
        </div>

        {/* Option 2: Pre-Approved Bank Factoring */}
        <div className="fo-decision-option-tile" role="listitem">
          <div className="fo-option-top">
            <span className="fo-option-tag">BANK RAILS</span>
            <span className="fo-option-impact">SAME-DAY DRAWDOWN</span>
          </div>
          <strong className="fo-option-name">Activate Connected Invoice Discounting</strong>
          <p className="fo-option-sub">
            Drawdown pre-approved 85% advance (₹5,01,500) against verified IRN-82104491
            via HDFC integrated corporate banking portal with zero offline documentation.
          </p>
        </div>

        {/* Option 3: Vendor Settlement Realignment */}
        <div className="fo-decision-option-tile" role="listitem">
          <div className="fo-option-top">
            <span className="fo-option-tag">SUPPLIER DESK</span>
            <span className="fo-option-impact">ZERO PENALTY</span>
          </div>
          <strong className="fo-option-name">Reschedule Secondary Non-MSME Supplier</strong>
          <p className="fo-option-sub">
            Stagger secondary supplier PO-9288 (₹2.20L) by 7 days while prioritizing primary MSME supplier
            to maintain 100% tax compliance without cash depletion.
          </p>
        </div>
      </div>

      {/* Closing Transition Copy (Strict Approved Copy) */}
      <div className="fo-predictive__closing-bar">
        <p className="fo-closing-text">
          <strong>See the potential impact. Understand your options. Act with context.</strong>
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main Component: PredictiveDecisionsSection
   Coordinates Narrative Progression (Scene 1 through Scene 5) & Scroll Handlers
   ========================================================================== */
export const PredictiveDecisionsSection = memo(function PredictiveDecisionsSection() {
  const [activeScene, setActiveScene] = useState<ForecastScene>("pressure");
  const [activePointIndex, setActivePointIndex] = useState<number>(5); // Default to +38D Pressure Point
  const [decisionApplied, setDecisionApplied] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Sync scene changes when user clicks stepper tabs
  const handleSceneChange = useCallback((scene: ForecastScene) => {
    setActiveScene(scene);
    switch (scene) {
      case "present":
        setActivePointIndex(2); // TODAY
        setDecisionApplied(false);
        break;
      case "future":
        setActivePointIndex(3); // +15D
        setDecisionApplied(false);
        break;
      case "pressure":
        setActivePointIndex(5); // +38D Pressure Point
        setDecisionApplied(false);
        break;
      case "decision":
        setActivePointIndex(5); // +38D
        break;
      case "outcomes":
        setActivePointIndex(7); // +60D
        setDecisionApplied(true);
        break;
    }
  }, []);

  const handleSelectPoint = useCallback((idx: number) => {
    setActivePointIndex(idx);
    const pt = timelineData[idx];
    if (pt.isPressurePoint) {
      setActiveScene("pressure");
    } else if (pt.dayOffset > 0) {
      setActiveScene("future");
    } else {
      setActiveScene("present");
    }
  }, []);

  const handleToggleDecision = useCallback(() => {
    setDecisionApplied(prev => !prev);
  }, []);

  const scenesList: Array<{ id: ForecastScene; label: string; stepNum: string }> = [
    { id: "present", label: "01 / Present Position", stepNum: "SCENE 01" },
    { id: "future", label: "02 / Projected Horizon", stepNum: "SCENE 02" },
    { id: "pressure", label: "03 / Pressure Point", stepNum: "SCENE 03" },
    { id: "decision", label: "04 / Decisions to Consider", stepNum: "SCENE 04" },
    { id: "outcomes", label: "05 / Business Outcomes", stepNum: "SCENE 05" },
  ];

  return (
    <section
      ref={sectionRef}
      id="predictive-decisions"
      className="fo-predictive-decisions"
      aria-label="Predictive Business Decisions: The Future Signal"
    >
      <div className="home-container fo-predictive__container">
        {/* 1. Introductory Editorial Heading */}
        <PredictiveSectionIntro />

        {/* 2. Interactive Scene Stepper (Supports Click & Scroll Sync) */}
        <nav
          className="fo-predictive__stepper"
          role="tablist"
          aria-label="Financial forecast progression scenes"
        >
          {scenesList.map((sc) => {
            const isActive = activeScene === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`fo-predictive__step-btn ${isActive ? "is-active" : ""}`}
                onClick={() => handleSceneChange(sc.id)}
              >
                <span className="fo-step-num">{sc.stepNum}</span>
                <span className="fo-step-label">{sc.label.replace(/^0\d \/ /, "")}</span>
              </button>
            );
          })}
        </nav>

        {/* 3. The Central Financial Visualisation (The Future Signal) */}
        <FutureSignalVisualization
          scene={activeScene}
          activePointIndex={activePointIndex}
          onSelectPoint={handleSelectPoint}
          decisionApplied={decisionApplied}
          onToggleDecision={handleToggleDecision}
        />

        {/* 4. Dual Workspace Panels: Contextual Insight & Decision Panel */}
        <div className="fo-predictive__workspace-panels">
          <ForecastInsightPanel
            scene={activeScene}
            activePoint={timelineData[activePointIndex]}
          />

          <DecisionConsiderationPanel
            decisionApplied={decisionApplied}
            onApplyDecision={handleToggleDecision}
          />
        </div>
      </div>
    </section>
  );
});

export default PredictiveDecisionsSection;

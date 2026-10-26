import { memo, useState, useRef, useCallback } from "react";
import { Icon } from "./flowone";
import { departmentFunctions, DepartmentFunction } from "./connectedRealityData";

/* ==========================================================================
   Section 04: The Connected Reality — Suggestion 2: 6-Node Circuit Rail
   - Top: Reality Mode Switcher (✕ Fragmented Reality vs ✦ Connected Reality)
   - Middle: Interactive 6-Node Circuit Rail with live conduit beam vs severed links
   - Bottom: Single Executive Inspector Card for the selected node
   - Mobile: Touch-scrollable circuit ribbon + HUD stepper for effortless inspection
   ========================================================================== */

export const ConnectedRealityCircuitRail = memo(function ConnectedRealityCircuitRail() {
  const [realityMode, setRealityMode] = useState<"connected" | "fragmented">("connected");
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(2); // Default to Finance & Billing (Node 03)
  const circuitRailRef = useRef<HTMLDivElement>(null);

  const activeDept: DepartmentFunction = departmentFunctions[activeNodeIdx] || departmentFunctions[0];

  const handleSelectNode = useCallback((index: number) => {
    setActiveNodeIdx(index);
    // Smoothly center selected node on mobile
    const railEl = circuitRailRef.current;
    if (railEl) {
      const nodes = railEl.querySelectorAll(".circuit-node-btn");
      const target = nodes[index] as HTMLElement | undefined;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, []);

  const handlePrev = useCallback(() => {
    if (activeNodeIdx > 0) {
      handleSelectNode(activeNodeIdx - 1);
    }
  }, [activeNodeIdx, handleSelectNode]);

  const handleNext = useCallback(() => {
    if (activeNodeIdx < departmentFunctions.length - 1) {
      handleSelectNode(activeNodeIdx + 1);
    }
  }, [activeNodeIdx, handleSelectNode]);

  const isConnected = realityMode === "connected";

  return (
    <section
      id="connected-reality-circuit-section"
      className={`new-home-section connected-circuit-section is-mode-${realityMode}`}
      aria-labelledby="circuit-rail-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            1. SECTION HEADER (Clean, Left-Aligned)
            ============================================================== */}
        <div className="circuit-intro">
          <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
            <div className="hero-modern-eyebrow is-static" role="note" aria-label="The Connected Reality">
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>REALITY</span>
              </span>
              <span className="hero-eyebrow-title">THE CONNECTED REALITY</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="circuit-header-row">
            <div className="circuit-header-left">
              <h2 id="circuit-rail-heading" className="circuit-title">
                The transaction is connected.<br />
                The systems usually aren’t.
              </h2>
              <p className="circuit-desc">
                Commercial, operations, finance, tax, collections and banking form a continuous business circuit.
                Toggle between Fragmented and Connected to inspect how flowOne heals the severed conduits.
              </p>
            </div>

            {/* REALITY MODE SEGMENTED TOGGLE */}
            <div className="circuit-toggle-wrapper">
              <div
                className="circuit-mode-toggle"
                role="group"
                aria-label="Toggle between Fragmented Reality and flowOne Connected"
              >
                <button
                  type="button"
                  className={`circuit-toggle-btn is-fragmented ${!isConnected ? "is-active" : ""}`}
                  onClick={() => setRealityMode("fragmented")}
                  aria-pressed={!isConnected}
                >
                  <span className="circuit-toggle-icon" aria-hidden="true">✕</span>
                  <span>Fragmented Reality</span>
                </button>
                <button
                  type="button"
                  className={`circuit-toggle-btn is-connected ${isConnected ? "is-active" : ""}`}
                  onClick={() => setRealityMode("connected")}
                  aria-pressed={isConnected}
                >
                  <span className="circuit-toggle-spark" aria-hidden="true">✦</span>
                  <span>flowOne Connected</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==============================================================
            2A. DESKTOP INTERACTIVE 6-NODE CIRCUIT RAIL (> 1024px)
            ============================================================== */}
        <div className="circuit-rail-shell circuit-desktop-rail" role="region" aria-label="Interactive 6-node circuit bus">
          {/* Status Banner Strip */}
          <div className={`circuit-rail-banner ${isConnected ? "is-connected" : "is-fragmented"}`}>
            <div className="circuit-banner-meta">
              <span className="circuit-banner-dot" aria-hidden="true" />
              <span className="circuit-banner-label">
                {isConnected ? (
                  <>
                    <strong>CONNECTED REALITY CONDUIT:</strong> 6 of 6 Core Functions Operating in Real-Time Shared Context
                  </>
                ) : (
                  <>
                    <strong>FRAGMENTED SILO CIRCUIT:</strong> Severed Interfaces Cause Operational Drift, Manual Re-Keying &amp; Reconciliation Delays
                  </>
                )}
              </span>
            </div>
            <span className="circuit-banner-telemetry">
              {isConnected ? "100% IN SYNC · < 14ms LATENCY" : "5 SEVERED CONDUITS DETECTED"}
            </span>
          </div>

          {/* 6-Node Track Container */}
          <div
            ref={circuitRailRef}
            className={`circuit-nodes-track ${isConnected ? "is-connected-beam" : "is-severed-beam"}`}
            role="tablist"
            aria-label="Transaction circuit nodes"
          >
            {departmentFunctions.map((dept, index) => {
              const isActive = index === activeNodeIdx;
              const isLast = index === departmentFunctions.length - 1;

              return (
                <div key={dept.id} className="circuit-node-slot">
                  {/* Node Button */}
                  <button
                    type="button"
                    role="tab"
                    id={`circuit-node-${dept.id}`}
                    aria-selected={isActive}
                    aria-controls="circuit-inspector-panel"
                    className={`circuit-node-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => handleSelectNode(index)}
                  >
                    {/* Top Step Pill */}
                    <div className="circuit-node-pill">
                      <span className="circuit-node-code">{dept.funcCode}</span>
                      <span className="circuit-node-status-dot" aria-hidden="true" />
                    </div>

                    {/* Node Core Indicator Circle */}
                    <div className="circuit-node-core">
                      <span className="circuit-node-core-ring" aria-hidden="true" />
                      <span className="circuit-node-core-dot" aria-hidden="true" />
                    </div>

                    {/* Department Label */}
                    <span className="circuit-node-name">{dept.shortLabel}</span>

                    {/* State-Specific Dynamic Badge */}
                    <span className={`circuit-node-badge ${isConnected ? "is-connected" : "is-fragmented"}`}>
                      {isConnected ? dept.connectedBadge : dept.fragmentedBadge}
                    </span>
                  </button>

                  {/* Inter-Node Conduit Connector Wire (Between Nodes) */}
                  {!isLast && (
                    <div className={`circuit-connector-wire ${isConnected ? "is-connected" : "is-severed"}`} aria-hidden="true">
                      <span className="circuit-wire-line" />
                      <span className="circuit-wire-glyph">
                        {isConnected ? "✦" : "✕"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            2B. MOBILE & TABLET SMART-CIRCUIT HUD (<= 1024px)
            Zero-overflow adaptive circuit meter + integrated thumb controls
            ============================================================== */}
        <div className="circuit-smart-hud circuit-mobile-hud" aria-label="Transaction circuit progress">
          {/* Header row: Status + Stepper controls */}
          <div className="circuit-smart-hud-header">
            <div className="circuit-smart-hud-status">
              <span className={`circuit-smart-status-dot ${isConnected ? "is-connected" : "is-fragmented"}`} />
              <span className="circuit-smart-status-text">
                {isConnected ? (
                  <><strong>100% IN SYNC</strong> · Real-Time Shared Context</>
                ) : (
                  <><strong>SEVERED CONDUITS</strong> · Siloed Drift</>
                )}
              </span>
            </div>

            <div className="circuit-smart-hud-stepper">
              <button
                type="button"
                className="circuit-smart-nav-btn"
                onClick={handlePrev}
                disabled={activeNodeIdx === 0}
                aria-label="Previous node"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="circuit-smart-step-count">
                {activeNodeIdx + 1} / {departmentFunctions.length}
              </span>
              <button
                type="button"
                className="circuit-smart-nav-btn"
                onClick={handleNext}
                disabled={activeNodeIdx === departmentFunctions.length - 1}
                aria-label="Next node"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Adaptive Bead Circuit Meter: Fits 100% of screens with zero overflow */}
          <div className="circuit-smart-meter" role="tablist" aria-label="Select circuit node">
            {departmentFunctions.map((dept, idx) => {
              const isActive = idx === activeNodeIdx;
              const isLast = idx === departmentFunctions.length - 1;

              return (
                <div key={dept.id} className="circuit-smart-bead-wrapper">
                  <button
                    type="button"
                    role="tab"
                    id={`circuit-smart-node-${dept.id}`}
                    aria-selected={isActive}
                    aria-controls="circuit-inspector-panel"
                    className={`circuit-smart-bead-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => handleSelectNode(idx)}
                    aria-label={`Inspect Node ${dept.funcCode}: ${dept.funcName}`}
                  >
                    {isActive ? (
                      <span className={`circuit-smart-active-pill ${isConnected ? "is-connected" : "is-fragmented"}`}>
                        <span className="circuit-smart-active-dot" />
                        <span className="circuit-smart-active-code">{dept.funcCode}</span>
                        <span className="circuit-smart-active-name">{dept.shortLabel}</span>
                      </span>
                    ) : (
                      <span className="circuit-smart-bead-circle">{dept.funcCode}</span>
                    )}
                  </button>

                  {!isLast && (
                    <div
                      className={`circuit-smart-wire ${isConnected ? "is-connected" : "is-severed"}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            3. SINGLE EXECUTIVE INSPECTOR CARD
            ============================================================== */}
        <main
          id="circuit-inspector-panel"
          role="tabpanel"
          aria-labelledby={`circuit-node-${activeDept.id}`}
          className={`circuit-inspector-card ${isConnected ? "is-connected" : "is-fragmented"}`}
        >
          {/* Top Bar: Node Identity & Conduit Status */}
          <div className="circuit-inspector-top">
            <div className="circuit-inspector-identity">
              <span className="circuit-inspector-node-tag">
                NODE {activeDept.funcCode} OF 06 · {activeDept.category}
              </span>
              <span className="circuit-inspector-ref-tag">
                {activeDept.reference} · {activeDept.metric}
              </span>
            </div>

            <div className="circuit-inspector-status-badge">
              {isConnected ? (
                <span className="circuit-status-pill is-success">
                  <span className="circuit-status-dot is-blue" />
                  <span>LIVE CONDUIT · 100% IN SYNC</span>
                </span>
              ) : (
                <span className="circuit-status-pill is-warning">
                  <span className="circuit-status-dot is-red" />
                  <span>SEVERED LINK · MANUAL DRIFT</span>
                </span>
              )}
            </div>
          </div>

          {/* Middle Body: Narrative & Reality Breakdown */}
          <div className="circuit-inspector-body">
            {/* Left Column: Context & Headline */}
            <div className="circuit-inspector-narrative">
              <span className="circuit-narrative-dept">{activeDept.funcName}</span>
              <h3 className="circuit-narrative-title">{activeDept.headline}</h3>
              <p className="circuit-narrative-lead">{activeDept.lead}</p>

              {/* Object Box */}
              <div className="circuit-object-box">
                <span className="circuit-object-label">SHARED OBJECT IN TRANSIT</span>
                <strong className="circuit-object-val">
                  {activeDept.objectName} ({activeDept.reference})
                </strong>
                <span className="circuit-object-detail">{activeDept.detail}</span>
              </div>
            </div>

            {/* Right Column: Reality Detail Panel */}
            <div className="circuit-inspector-reality">
              {isConnected ? (
                /* Connected State View */
                <div className="circuit-reality-panel is-connected">
                  <div className="circuit-reality-header">
                    <span className="circuit-reality-tag is-blue">
                      <span className="circuit-reality-spark" aria-hidden="true">✦</span>
                      <span>FLOWONE CONNECTED CONTEXT</span>
                    </span>
                    <span className="circuit-reality-tool is-flowone">
                      {activeDept.connectedToolName}
                    </span>
                  </div>

                  <div className="circuit-reality-callout is-blue">
                    <span className="circuit-callout-kicker">✦ SHARED CONTEXT BENEFIT</span>
                    <p className="circuit-callout-text">{activeDept.connectedBenefit}</p>
                  </div>

                  <div className="circuit-conduit-footer is-active">
                    <span className="circuit-conduit-dot is-blue" aria-hidden="true" />
                    <span className="circuit-conduit-label">ACTIVE REAL-TIME CONDUIT:</span>
                    <span className="circuit-conduit-val">{activeDept.connectedLink}</span>
                  </div>
                </div>
              ) : (
                /* Fragmented State View */
                <div className="circuit-reality-panel is-fragmented">
                  <div className="circuit-reality-header">
                    <span className="circuit-reality-tag is-red">
                      <span className="circuit-reality-icon" aria-hidden="true">✕</span>
                      <span>FRAGMENTED SILO STATE</span>
                    </span>
                    <span className="circuit-reality-tool is-silo">
                      <span aria-hidden="true">{activeDept.incompatibleToolIcon}</span>
                      <span>{activeDept.incompatibleToolName}</span>
                    </span>
                  </div>

                  <div className="circuit-reality-callout is-red">
                    <span className="circuit-callout-kicker">⚠️ DEPARTMENTAL BLIND SPOT</span>
                    <p className="circuit-callout-text">{activeDept.siloImpact}</p>
                  </div>

                  <div className="circuit-conduit-footer is-severed">
                    <span className="circuit-conduit-dot is-red" aria-hidden="true" />
                    <span className="circuit-conduit-label">SEVERED CONDUIT:</span>
                    <span className="circuit-conduit-val">{activeDept.severedStatus}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar: Telemetry & Mobile Stepper HUD */}
          <div className="circuit-inspector-footer">
            <div className="circuit-inspector-telemetry">
              <span className="circuit-telemetry-item">
                <i className="circuit-telemetry-dot" aria-hidden="true" />
                <span>Single Source of Truth</span>
              </span>
              <span className="circuit-telemetry-sep" aria-hidden="true">/</span>
              <span className="circuit-telemetry-item">
                <strong>Zero Manual Re-Entry</strong>
              </span>
              <span className="circuit-telemetry-sep" aria-hidden="true">/</span>
              <span className="circuit-telemetry-item">
                <strong>&lt; 14ms Transaction Lineage</strong>
              </span>
            </div>

            {/* Stepper Controls (Works everywhere, especially handy on mobile) */}
            <div className="circuit-stepper-controls" aria-label="Step through nodes">
              <button
                type="button"
                className="circuit-stepper-btn"
                onClick={handlePrev}
                disabled={activeNodeIdx === 0}
                aria-label="Previous node"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Prev Node</span>
              </button>
              <span className="circuit-stepper-counter">
                {activeNodeIdx + 1} / {departmentFunctions.length}
              </span>
              <button
                type="button"
                className="circuit-stepper-btn"
                onClick={handleNext}
                disabled={activeNodeIdx === departmentFunctions.length - 1}
                aria-label="Next node"
              >
                <span>Next Node</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
});

export default ConnectedRealityCircuitRail;

import React, { memo, useState } from "react";
import { signalsData, SignalId } from "./DecisionObservatorySection";
import "./decision-observatory.css";

/* ==========================================================================
   Section 06 — Predictive Business Decisions
   Direction B2 — The Decision Observatory (Top Tabs & 2-Column Split View)
   Reference Design: Pill-shaped top tabs for Business Signals
   2-Column Layout:
     - Top Full-Width Row: CAUSAL RELATIONSHIP
     - Left Column (Col 1): POTENTIAL BUSINESS IMPACT
     - Right Column (Col 2): DECISION TO CONSIDER
   ========================================================================== */

export const DecisionObservatoryTabsView = memo(function DecisionObservatoryTabsView() {
  const [selectedSignalId, setSelectedSignalId] = useState<SignalId>("supplier-payments");

  const currentSignal = signalsData.find(s => s.id === selectedSignalId) || signalsData[0];

  return (
    <section
      id="decision-observatory-tabs"
      className="fo-decision-observatory fo-decision-observatory--tabs"
      aria-label="Section: Predictive Business Decisions — Observatory Top Tabs View"
    >
      <div className="fo-decision-observatory__container">
        {/* EDITORIAL HEADER & INTRO */}
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
            Select an operational signal to see how it affects your financial trajectory, statutory obligations, and the forward-looking decisions that follow.
          </p>
        </header>

        {/* ==============================================================
            TOP TABS BAR (Reference Pill Design)
            ============================================================== */}
        <div className="fo-observatory-tabs-wrapper" role="region" aria-label="Business Signals Navigation">
          <div className="fo-observatory-tabs-track" role="tablist" aria-label="Business Signals">
            {signalsData.map((sig, idx) => {
              const isSelected = sig.id === selectedSignalId;
              const tabNum = `0${idx + 1}`;
              const tabLabel = `${tabNum} ${sig.name.toUpperCase()}`;

              return (
                <button
                  key={sig.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={`fo-observatory-tab-pill ${isSelected ? "is-active" : ""}`}
                  onClick={() => setSelectedSignalId(sig.id)}
                >
                  {isSelected && <span className="fo-observatory-tab-dot" aria-hidden="true" />}
                  <span className="fo-observatory-tab-text">{tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            TAB CONTENT DECK
            Row 1: Full-Width CAUSAL RELATIONSHIP Row
            Row 2: 2-Column Split (Impact vs Decision)
            ============================================================== */}
        <div className="fo-observatory-deck-container">
          {/* ROW 1: FULL-WIDTH CAUSAL RELATIONSHIP BANNER */}
          <div className="fo-observatory-causality-banner" role="region" aria-label="Causal Relationship Context">
            <div className="fo-causality-header-row">
              <div className="fo-causality-tag">
                <span className="fo-causality-beacon" aria-hidden="true" />
                <span className="fo-causality-kicker">CAUSAL RELATIONSHIP</span>
              </div>
              <div className="fo-causality-signal-meta">
                <span className="fo-causality-entity">{currentSignal.entity}</span>
                <span className="fo-causality-metric-pill">{currentSignal.metric}</span>
              </div>
            </div>

            <p className="fo-causality-lead-sentence">
              {currentSignal.primaryCausalitySentence}
            </p>

            {currentSignal.relationshipNotes.length > 0 && (
              <div className="fo-causality-chains">
                <span className="fo-chains-label">Downstream Dependencies:</span>
                <div className="fo-chains-list">
                  {currentSignal.relationshipNotes.map((r) => {
                    const target = signalsData.find((s) => s.id === r.targetId);
                    return (
                      <span key={r.targetId} className="fo-chain-chip">
                        <strong className="fo-chain-target">{target?.name}</strong>
                        <span className="fo-chain-rel">({r.relationLabel})</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ROW 2: 2-COLUMN MAIN CONTENT DECK */}
          <div className="fo-observatory-2col-layout">
            {/* COLUMN 1: POTENTIAL BUSINESS IMPACT */}
            <article
              className="fo-observatory-col-card fo-col-impact"
              aria-label="Potential Business Impact Panel"
            >
              <div className="fo-col-kicker-row">
                <span className="fo-col-kicker">POTENTIAL BUSINESS IMPACT</span>
                <span className="fo-col-badge">{currentSignal.category}</span>
              </div>

              <h3 className="fo-col-title">{currentSignal.impactHeadline}</h3>

              {/* Metric Highlight Box */}
              <div className="fo-impact-metric-highlight">
                <div className="fo-metric-subtag">PROJECTED IMPACT</div>
                <div className="fo-metric-value">{currentSignal.impactMetricVal}</div>
                <div className="fo-metric-caption">{currentSignal.impactSubmetric}</div>
              </div>

              {/* Summary Narrative */}
              <p className="fo-col-summary">{currentSignal.impactSummary}</p>

              {/* Consequence Ripples */}
              {currentSignal.ripples.length > 0 && (
                <div className="fo-ripples-deck">
                  <span className="fo-ripples-heading">DOWNSTREAM CONSEQUENCE RIPPLES</span>
                  <div className="fo-ripples-list">
                    {currentSignal.ripples.map((rip, i) => (
                      <div key={i} className="fo-ripple-card">
                        <span className="fo-ripple-number">0{i + 1}</span>
                        <div className="fo-ripple-content">
                          <strong className="fo-ripple-name">{rip.title}</strong>
                          <p className="fo-ripple-desc">{rip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* COLUMN 2: DECISION TO CONSIDER */}
            <article
              className="fo-observatory-col-card fo-col-decision"
              aria-label="Decision to Consider Panel"
            >
              <div className="fo-col-kicker-row">
                <span className="fo-col-kicker">DECISION TO CONSIDER</span>
                <span className="fo-col-badge is-action">{currentSignal.strategicTag}</span>
              </div>

              <h3 className="fo-col-title">{currentSignal.decisionActionTitle}</h3>
              <p className="fo-col-summary">{currentSignal.decisionActionDesc}</p>

              {/* Rationale Callout Box */}
              <div className="fo-rationale-callout">
                <span className="fo-rationale-title">Why this option may help:</span>
                <p className="fo-rationale-body">{currentSignal.decisionRationale}</p>
              </div>

              {/* Strategic Feasibility & Simulated Outcome Chips */}
              <div className="fo-decision-chips-grid">
                <div className="fo-decision-chip">
                  <span className="fo-chip-eyebrow">Operational Feasibility</span>
                  <strong className="fo-chip-metric">{currentSignal.feasibility}</strong>
                </div>
                <div className="fo-decision-chip">
                  <span className="fo-chip-eyebrow">Simulated Outcome</span>
                  <strong className="fo-chip-metric">{currentSignal.simulationDelta}</strong>
                </div>
              </div>

              {/* Human-in-the-Loop Governance Notice */}
              <div className="fo-governance-guardrail">
                <span className="fo-guardrail-badge" aria-hidden="true">🛡</span>
                <div className="fo-guardrail-text">
                  <strong>Operator Governance · Human-in-the-Loop</strong>
                  <span>Grounded in Transaction TXN-10482 Context · Awaiting Human Confirmation</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* CLOSING EDITORIAL BANNER */}
        <footer className="fo-decision-observatory__closing is-simplified">
          <p className="fo-decision-observatory__closing-copy">
            Understand the connection. Anticipate the consequence. <em>Decide with context.</em>
          </p>
        </footer>
      </div>
    </section>
  );
});

export default DecisionObservatoryTabsView;

import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIStageLottieIcon from "./AIStageLottieIcon";
import "./ai-advantage-moment.css";

export interface IntelligenceMomentViewProps {
  beforeSectionBg?: string; // Preceding section color (Section 04: #F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  className?: string;
}

interface MomentStateData {
  stepNum: string;
  stepLabel: string;
  eyebrow: string;
  badgeLabel: string;
  title: string;
  focalQuote: string;
  narrative: string;
  facts: Array<{ label: string; value: string; isAccent?: boolean }>;
  invoiceStateText: string;
  options?: string[];
  actionCta?: string;
}

const momentStates: MomentStateData[] = [
  {
    stepNum: "01",
    stepLabel: "Signal",
    eyebrow: "BUSINESS SIGNAL",
    badgeLabel: "TRANSACTION CONTEXT",
    title: "One transaction. More context.",
    focalQuote: "Every transaction carries information beyond its face value.",
    narrative:
      "Ananya Enterprises INV-10482 (₹5,90,000) was issued with Net 30 payment terms and instant IRN tax verification. On paper, it is a routine commercial booking cleared into the ledger. Beneath the surface, real-time historical and operational signals begin to correlate.",
    facts: [
      { label: "DOCUMENT REF", value: "INV-10482 · Confirmed" },
      { label: "CONTRACTUAL DUE", value: "Day +30 · 28 Jun 2026" },
      { label: "STATUTORY STATUS", value: "IRN Verified · NIC Cleared", isAccent: true },
    ],
    invoiceStateText: "01 · BUSINESS SIGNAL CAPTURED",
  },
  {
    stepNum: "02",
    stepLabel: "Insight",
    eyebrow: "AI INSIGHT",
    badgeLabel: "PREDICTIVE SIGNAL",
    title: "Understand what happens next.",
    focalQuote:
      "A change in payment behaviour may affect when expected cash becomes available.",
    narrative:
      "Continuous behavioral payment modeling correlates historical settlement trends for Ananya Enterprises. Recent payment runs demonstrate a 15-day collection drift, projecting settlement at Day +45 instead of Day +30—shifting directly past scheduled month-end supplier disbursements.",
    facts: [
      { label: "PAYMENT VELOCITY", value: "92% Probability at Day +45", isAccent: true },
      { label: "CYCLE DRIFT", value: "+15 Days past terms" },
      { label: "LIQUIDITY OVERLAP", value: "Day +38 Vendor Run" },
    ],
    invoiceStateText: "02 · AI INFERENCE ACTIVE",
  },
  {
    stepNum: "03",
    stepLabel: "Action",
    eyebrow: "DECISION TO CONSIDER",
    badgeLabel: "GOVERNANCE READY",
    title: "Turn understanding into action.",
    focalQuote:
      "Review upcoming cash commitments against the expected collection timeline.",
    narrative:
      "AI synthesizes the working-capital shortfall and proposes two proactive treasury decisions to protect liquidity before the collection delay impacts scheduled vendor payments:",
    options: [
      "Option A: Trigger prompt-settlement outreach with a 1.25% early rebate (< 48h recovery)",
      "Option B: Route invoice into TReDS discounting to advance ₹5.82L into active cash",
    ],
    facts: [
      { label: "SUGGESTED ACTION", value: "Prioritize Collection Outreach", isAccent: true },
      { label: "FINANCIAL NET COST", value: "₹7,375 (or advance ₹5.82L)" },
      { label: "GOVERNANCE", value: "Requires Operator Approval" },
    ],
    actionCta: "Review Cash Timeline & Options",
    invoiceStateText: "03 · DECISION PATH READY",
  },
];

export const IntelligenceMomentView = memo(function IntelligenceMomentView({
  beforeSectionBg = "#F8FAFC",
  afterSectionBg = "#FAFBFD",
  className = "",
}: IntelligenceMomentViewProps) {
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [actionConfirmed, setActionConfirmed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isManualClickRef = useRef(false);

  const currentState = momentStates[activeStateIndex] || momentStates[0];

  // Manual jump to specific state
  const handleJumpToState = useCallback((index: number) => {
    isManualClickRef.current = true;
    setActiveStateIndex(index);
    window.setTimeout(() => {
      isManualClickRef.current = false;
    }, 800);
  }, []);

  // Action button click in State 03
  const handleConfirmAction = useCallback(() => {
    setActionConfirmed(true);
  }, []);

  // Section-local scroll sequence across the 3 moments
  useEffect(() => {
    let isUnmounted = false;

    const handleScroll = () => {
      if (isManualClickRef.current || isUnmounted) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Active range when section enters viewport until it leaves
      const totalDistance = rect.height - windowHeight * 0.45;
      if (totalDistance <= 0) return;

      const currentScroll = -rect.top + windowHeight * 0.25;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDistance));

      // Map progress across 3 states
      const stateIndex = Math.min(
        momentStates.length - 1,
        Math.floor(progress * momentStates.length)
      );

      setActiveStateIndex(stateIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      isUnmounted = true;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="section-ai-advantage-moment"
      ref={sectionRef}
      className={`new-home-section fo-ai-moment-section ${className}`}
      aria-labelledby="fo-ai-moment-heading"
    >
      {/* Top Animated Multi-Layer Wave Divider */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={18}
        durationSeconds={35}
      />

      <div className="home-container fo-ai-moment__container">
        {/* Editorial Section Header */}
        <header className="fo-ai-moment__header">
          <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
            <div
              className="hero-modern-eyebrow is-static"
              role="note"
              aria-label="AI Advantage · The Intelligence Moment"
            >
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>AI ADVANTAGE</span>
              </span>
              <span className="hero-eyebrow-title">THE INTELLIGENCE MOMENT</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <h2 id="fo-ai-moment-heading" className="fo-ai-moment__headline">
            AI that understands the whole business.
          </h2>

          <p className="fo-ai-moment__copy">
            From transaction details to predicted outcomes, flowOne AI connects the
            signals that help teams decide what happens next.
          </p>
        </header>

        {/* Two-Column Balanced Composition */}
        <div className="fo-ai-moment__workspace">
          {/* LEFT: Business Object (Stable Visual Anchor) */}
          <div className="fo-ai-moment__invoice-col">
            <aside
              className="fo-ai-moment__invoice-card is-moment-active"
              aria-label="Anchored Transaction: INV-10482"
            >
              {/* Tech Corner Accents */}
              <div className="fo-ai-moment__corner fo-ai-moment__corner--tl" aria-hidden="true" />
              <div className="fo-ai-moment__corner fo-ai-moment__corner--tr" aria-hidden="true" />
              <div className="fo-ai-moment__corner fo-ai-moment__corner--bl" aria-hidden="true" />
              <div className="fo-ai-moment__corner fo-ai-moment__corner--br" aria-hidden="true" />

              {/* Invoice Meta Header */}
              <div className="fo-ai-moment__invoice-header">
                <span className="fo-ai-moment__invoice-kicker">INSPECTED OBJECT</span>
                <span className="fo-ai-moment__invoice-status">
                  <span className="fo-ai-moment__status-dot" aria-hidden="true" />
                  <span>AI TELEMETRY</span>
                </span>
              </div>

              {/* Core Financial Payload */}
              <div className="fo-ai-moment__invoice-payload">
                <strong className="fo-ai-moment__invoice-ref">INV-10482</strong>
                <span className="fo-ai-moment__invoice-amount">₹5,90,000</span>
                <p className="fo-ai-moment__invoice-client">
                  Ananya Enterprises · GSTIN 36AABCA1234F1Z5
                </p>
              </div>

              {/* Telemetry Facts */}
              <div className="fo-ai-moment__invoice-telemetry">
                <div className="fo-ai-moment__telemetry-item">
                  <small>SCHEMA</small>
                  <strong>99.8%</strong>
                </div>
                <div className="fo-ai-moment__telemetry-item">
                  <small>IRN STATUS</small>
                  <strong className="is-verified">Verified</strong>
                </div>
                <div className="fo-ai-moment__telemetry-item">
                  <small>CONFIDENCE</small>
                  <strong>92.0%</strong>
                </div>
              </div>

              {/* Active State Banner */}
              <div className="fo-ai-moment__invoice-tag">
                <span className="fo-ai-moment__tag-beacon" aria-hidden="true" />
                <span>{currentState.invoiceStateText}</span>
              </div>

              {/* Output Port for SVG Connector */}
              <div
                className="fo-ai-moment__invoice-port"
                title="Conduit Output Port"
                aria-hidden="true"
              />
            </aside>
          </div>

          {/* CENTER: One Primary Curved SVG Connector */}
          <div className="fo-ai-moment__connector-col" aria-hidden="true">
            <div className="fo-ai-moment__connector-shell">
              <svg
                className="fo-ai-moment__connector-svg"
                viewBox="0 0 70 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="fo-moment-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0055FF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="fo-moment-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Base Dashed Conduit */}
                <path
                  d="M 0 90 C 35 90, 35 90, 70 90"
                  stroke="rgba(5, 199, 242, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Luminous Core Stream */}
                <path
                  d="M 0 90 C 35 90, 35 90, 70 90"
                  stroke="url(#fo-moment-grad)"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#fo-moment-glow)"
                />

                {/* Traveling Energy Pulse */}
                <circle
                  r="4.5"
                  fill="#05C7F2"
                  filter="url(#fo-moment-glow)"
                >
                  <animateMotion
                    path="M 0 90 L 70 90"
                    dur={activeStateIndex === 1 ? "1.8s" : "2.8s"}
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </div>

          {/* RIGHT: Intelligence Presentation (One Dominant Panel) */}
          <div className="fo-ai-moment__panel-col">
            {/* 3-State Stage Switcher Bar */}
            <div
              className="fo-ai-moment__state-bar"
              role="tablist"
              aria-label="Moment of Intelligence Progression"
            >
              <div className="fo-ai-moment__state-track">
                {momentStates.map((st, idx) => {
                  const isActive = activeStateIndex === idx;
                  const isComplete = idx < activeStateIndex;
                  return (
                    <button
                      key={st.stepLabel}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-moment__state-btn ${
                        isActive ? "is-active" : isComplete ? "is-complete" : ""
                      }`}
                      onClick={() => handleJumpToState(idx)}
                    >
                      <span className="fo-ai-moment__state-num">{st.stepNum}</span>
                      <span className="fo-ai-moment__state-label">{st.stepLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Single Prominent Intelligence Panel */}
            <article
              className="fo-ai-moment__panel"
              aria-live="polite"
              aria-label={`Moment Stage ${currentState.stepNum}: ${currentState.title}`}
            >
              {/* Inlet Port on Left Edge */}
              <div className="fo-ai-moment__panel-port" aria-hidden="true" />

              {/* Dynamic Corner Glow */}
              <div
                className={`fo-ai-moment__panel-glow ${
                  activeStateIndex === 2 ? "fo-ai-moment__panel-glow--action" : ""
                }`}
                aria-hidden="true"
              />

              <div className="fo-ai-moment__panel-content">
                {/* Header with Kicker & Lottie Icon */}
                <div className="fo-ai-moment__card-header">
                  <div className="fo-ai-moment__header-group">
                    <AIStageLottieIcon isActive={true} size={28} />
                    <span className="fo-ai-moment__card-kicker">{currentState.eyebrow}</span>
                  </div>

                  <span className="fo-ai-moment__card-badge">{currentState.badgeLabel}</span>
                </div>

                {/* State Title */}
                <h3 className="fo-ai-moment__card-title">{currentState.title}</h3>

                {/* Primary Focal Callout (The Core Moment) */}
                <div
                  className={`fo-ai-moment__focal-box ${
                    activeStateIndex === 2 ? "fo-ai-moment__focal-box--action" : ""
                  }`}
                >
                  <p className="fo-ai-moment__focal-text">“{currentState.focalQuote}”</p>
                </div>

                {/* Narrative Explanation */}
                <p className="fo-ai-moment__narrative">{currentState.narrative}</p>

                {/* State 03 Suggested Options List */}
                {currentState.options && (
                  <div className="fo-ai-moment__options-card">
                    <span className="fo-ai-moment__options-title">
                      STRATEGIC INTERVENTIONS TO CONSIDER
                    </span>
                    <div className="fo-ai-moment__options-list">
                      {currentState.options.map((opt, oIdx) => (
                        <div key={oIdx} className="fo-ai-moment__option-row">
                          <span className="fo-ai-moment__option-bullet" aria-hidden="true">
                            ✦
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="fo-ai-moment__action-controls">
                      {actionConfirmed ? (
                        <div className="fo-ai-moment__action-confirmed">
                          <span aria-hidden="true">✓</span>
                          <span>Decision Acknowledged · Logged to Treasury Flow</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="fo-ai-moment__action-btn"
                          onClick={handleConfirmAction}
                        >
                          <span>{currentState.actionCta}</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3-Column Facts Grid */}
                <div className="fo-ai-moment__facts-grid">
                  {currentState.facts.map((fact) => (
                    <div key={fact.label} className="fo-ai-moment__fact-item">
                      <span className="fo-ai-moment__fact-label">{fact.label}</span>
                      <strong
                        className={`fo-ai-moment__fact-value ${
                          fact.isAccent ? "is-accent" : ""
                        }`}
                      >
                        {fact.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Governance Footer */}
                <div className="fo-ai-moment__panel-footer">
                  <div className="fo-ai-moment__footer-governance">
                    <span aria-hidden="true">🛡</span>
                    <span>Operator Governance · Grounded in Transaction TXN-10482 Context</span>
                  </div>
                  <div className="fo-ai-moment__footer-badge">
                    Human-in-the-Loop · No Autonomous Execution
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Bottom Animated Multi-Layer Wave Divider */}
      <AIWaveDivider
        position="bottom"
        fillColor={afterSectionBg}
        height={18}
        durationSeconds={35}
      />
    </section>
  );
});

export default IntelligenceMomentView;

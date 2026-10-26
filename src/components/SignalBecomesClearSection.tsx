import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIStageLottieIcon from "./AIStageLottieIcon";
import "./ai-advantage-signal-clear.css";

export interface SignalBecomesClearSectionProps {
  beforeSectionBg?: string; // Preceding section color (Section 04: #F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  className?: string;
}

interface NarrativeStateData {
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

const narrativeStates: NarrativeStateData[] = [
  {
    stepNum: "01",
    stepLabel: "Signal",
    eyebrow: "BUSINESS SIGNAL",
    badgeLabel: "CONVERGENCE DETECTED",
    title: "A change worth noticing.",
    focalQuote: "A customer's payment timing may be shifting.",
    narrative:
      "Transaction context can help surface changes that deserve attention. Ananya Enterprises INV-10482 (₹5,90,000) was issued with Net 30 payment terms and instant IRN tax verification. Beneath the surface, real-time historical and operational signals begin to correlate.",
    facts: [
      { label: "DOCUMENT REF", value: "INV-10482 · Confirmed" },
      { label: "CONTRACTUAL DUE", value: "Day +30 · 28 Jun 2026" },
      { label: "STATUTORY STATUS", value: "IRN Verified · NIC Cleared", isAccent: true },
    ],
    invoiceStateText: "01 · 5 SIGNALS DETECTED",
  },
  {
    stepNum: "02",
    stepLabel: "Understanding",
    eyebrow: "AI INSIGHT",
    badgeLabel: "PREDICTIVE IMPACT",
    title: "See the wider impact.",
    focalQuote:
      "Collection timing can affect the cash available for upcoming commitments.",
    narrative:
      "Understanding timing in context helps teams assess potential downstream effects. Historical settlement trends indicate a 15-day collection drift, shifting expected cash receipt past the scheduled month-end supplier disbursement run.",
    facts: [
      { label: "PAYMENT VELOCITY", value: "92% Probability at Day +45", isAccent: true },
      { label: "CYCLE DRIFT", value: "+15 Days past terms" },
      { label: "LIQUIDITY OVERLAP", value: "Day +38 Vendor Run" },
    ],
    invoiceStateText: "02 · CORRELATION SYNTHESIS",
  },
  {
    stepNum: "03",
    stepLabel: "Direction",
    eyebrow: "DIRECTION TO CONSIDER",
    badgeLabel: "GOVERNANCE READY",
    title: "Know where to focus.",
    focalQuote:
      "Review upcoming payment timing against near-term commitments.",
    narrative:
      "Give teams a clearer starting point for their next decision. AI models suggest reviewing the timeline against vendor payables and considering early settlement incentive or TReDS discounting to safeguard liquidity.",
    options: [
      "Option A: Trigger prompt-settlement outreach with a 1.25% early rebate (< 48h recovery)",
      "Option B: Route invoice into TReDS discounting to advance ₹5.82L into active cash",
    ],
    facts: [
      { label: "SUGGESTED ACTION", value: "Prioritize Collection Outreach", isAccent: true },
      { label: "FINANCIAL COST", value: "₹7,375 rebate (or ₹5.82L advance)" },
      { label: "GOVERNANCE", value: "Requires Operator Approval" },
    ],
    actionCta: "Review Upcoming Cash Timeline",
    invoiceStateText: "03 · STRATEGIC PATH FORMED",
  },
];

export const SignalBecomesClearSection = memo(function SignalBecomesClearSection({
  beforeSectionBg = "#F8FAFC",
  afterSectionBg = "#FAFBFD",
  className = "",
}: SignalBecomesClearSectionProps) {
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [actionConfirmed, setActionConfirmed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isManualClickRef = useRef(false);

  const currentState = narrativeStates[activeStateIndex] || narrativeStates[0];

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

  // Section-local scroll sequence across the 3 states
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
        narrativeStates.length - 1,
        Math.floor(progress * narrativeStates.length)
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
      id="section-ai-advantage-signal-clear"
      ref={sectionRef}
      className={`new-home-section fo-ai-signal-clear-section ${className}`}
      aria-labelledby="fo-ai-signal-clear-heading"
    >
      {/* Top Animated Multi-Layer Deep Sapphire Wave Divider (Option 2) */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={36}
        durationSeconds={35}
        className="fo-ai-advantage__wave--top"
      />

      <div className="fo-ai-signal-clear__container">
        {/* Editorial Section Header */}
        <header className="fo-ai-signal-clear__header">
          <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
            <div
              className="hero-modern-eyebrow is-static"
              role="note"
              aria-label="AI Advantage · The Signal Becomes Clear"
            >
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>AI ADVANTAGE</span>
              </span>
              <span className="hero-eyebrow-title">THE SIGNAL BECOMES CLEAR</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <h2 id="fo-ai-signal-clear-heading" className="fo-ai-signal-clear__headline">
            AI that understands the whole business.
          </h2>

          <p className="fo-ai-signal-clear__copy">
            From transaction details to predicted outcomes, flowOne AI connects the
            signals that help teams decide what happens next.
          </p>
        </header>

        {/* Three-Zone Balanced Composition */}
        <div className="fo-ai-signal-clear__workspace">
          {/* ZONE B: Persistent Transaction Anchor (Left) */}
          <div className="fo-ai-signal-clear__invoice-col">
            <aside
              className="fo-ai-signal-clear__invoice-card is-active-state"
              aria-label="Anchored Transaction: INV-10482"
            >
              {/* Tech Corner Brackets */}
              <div className="fo-ai-signal-clear__corner fo-ai-signal-clear__corner--tl" aria-hidden="true" />
              <div className="fo-ai-signal-clear__corner fo-ai-signal-clear__corner--tr" aria-hidden="true" />
              <div className="fo-ai-signal-clear__corner fo-ai-signal-clear__corner--bl" aria-hidden="true" />
              <div className="fo-ai-signal-clear__corner fo-ai-signal-clear__corner--br" aria-hidden="true" />

              {/* Invoice Meta Header */}
              <div className="fo-ai-signal-clear__invoice-header">
                <span className="fo-ai-signal-clear__invoice-kicker">COMMERCIAL OBJECT</span>
                <span className="fo-ai-signal-clear__invoice-beacon">
                  <span className="fo-ai-signal-clear__beacon-dot" aria-hidden="true" />
                  <span>LIVE SIGNALS</span>
                </span>
              </div>

              {/* Core Financial Payload */}
              <div className="fo-ai-signal-clear__invoice-payload">
                <strong className="fo-ai-signal-clear__invoice-ref">INV-10482</strong>
                <span className="fo-ai-signal-clear__invoice-amount">₹5,90,000</span>
                <p className="fo-ai-signal-clear__invoice-client">
                  Ananya Enterprises · GSTIN 36AABCA1234F1Z5
                </p>
              </div>

              {/* Telemetry Facts */}
              <div className="fo-ai-signal-clear__invoice-telemetry">
                <div className="fo-ai-signal-clear__telemetry-box">
                  <small>SCHEMA</small>
                  <strong>99.8%</strong>
                </div>
                <div className="fo-ai-signal-clear__telemetry-box">
                  <small>IRN STATUS</small>
                  <strong className="is-verified">Verified</strong>
                </div>
                <div className="fo-ai-signal-clear__telemetry-box">
                  <small>CONFIDENCE</small>
                  <strong>92.0%</strong>
                </div>
              </div>

              {/* Dynamic State Badge */}
              <div className="fo-ai-signal-clear__invoice-tag">
                <span className="fo-ai-signal-clear__beacon-dot" aria-hidden="true" />
                <span>{currentState.invoiceStateText}</span>
              </div>
            </aside>
          </div>

          {/* MOBILE ORGANIC WAVE DIVIDER (Between stacked halves on small screens) */}
          <div className="fo-ai-signal-clear__mobile-wave" aria-hidden="true">
            <AIWaveDivider position="top" fillColor="#090E20" height={24} durationSeconds={28} />
          </div>

          {/* SIGNATURE VISUAL: Harmonic Convergence Vertical Stream Divider (Center 120px) */}
          <div className="fo-ai-signal-clear__convergence-col" aria-hidden="true">
            <div className="fo-ai-signal-clear__convergence-shell">
              <svg
                className="fo-ai-signal-clear__convergence-svg"
                viewBox="0 0 120 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Organic Harmonic Stream Gradients */}
                  <linearGradient id="fo-harmonic-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.2" />
                  </linearGradient>

                  <linearGradient id="fo-harmonic-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#0055FF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
                  </linearGradient>

                  <linearGradient id="fo-harmonic-grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#5356D6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0055FF" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Signal Trace Gradients */}
                  <linearGradient id="fo-sig-grad-diffuse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="fo-sig-grad-converge" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#0055FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="fo-sig-grad-unified" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#38BDF8" stopOpacity="1" />
                    <stop offset="70%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0055FF" stopOpacity="0.95" />
                  </linearGradient>

                  <filter id="fo-sig-glow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Underlying 3-Layer Harmonic Vertical Stream Ribbons (Option 1) */}
                <g className="fo-ai-signal-clear__harmonic-ribbons" opacity="0.85">
                  {/* Layer 1 (Back Wave: Cyan #05C7F2, 35s animation) */}
                  <path
                    className="fo-ai-signal-clear__harmonic-layer-1"
                    d="M 45 0 C 85 80, 15 160, 55 240 C 95 280, 25 320, 50 320 L 30 320 C 5 320, 75 280, 35 240 C -5 160, 65 80, 25 0 Z"
                    fill="url(#fo-harmonic-grad-1)"
                  />

                  {/* Layer 2 (Middle Wave: Electric Blue #38BDF8, 28s animation) */}
                  <path
                    className="fo-ai-signal-clear__harmonic-layer-2"
                    d="M 65 0 C 25 80, 100 160, 40 240 C 20 280, 85 320, 65 320 L 45 320 C 65 320, 0 280, 20 240 C 80 160, 5 80, 45 0 Z"
                    fill="url(#fo-harmonic-grad-2)"
                  />

                  {/* Layer 3 (Front Core Wave: Gradient, 42s animation) */}
                  <path
                    className="fo-ai-signal-clear__harmonic-layer-3"
                    d="M 55 0 C 75 60, 35 140, 70 220 C 90 270, 45 320, 60 320 L 50 320 C 35 320, 80 270, 60 220 C 25 140, 65 60, 45 0 Z"
                    fill="url(#fo-harmonic-grad-3)"
                  />
                </g>

                {/* 2. Dynamic Convergence Traces Layered on the Harmonic Stream */}
                {/* State 01: 5 Fragmented, Distributed Traces flowing through the harmonic field */}
                {activeStateIndex === 0 && (
                  <g className="fo-traces-state-1">
                    {/* Trace 1: Payment Velocity Drift */}
                    <path
                      d="M 0 50 C 55 50, 75 60, 120 60"
                      stroke="url(#fo-sig-grad-diffuse)"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />
                    <circle r="3.5" fill="#05C7F2" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 0 50 C 55 50, 75 60, 120 60" dur="2.8s" repeatCount="indefinite" />
                    </circle>

                    {/* Trace 2: Contractual Due Window */}
                    <path
                      d="M 0 105 C 50 105, 80 115, 120 115"
                      stroke="url(#fo-sig-grad-diffuse)"
                      strokeWidth="2"
                    />
                    <circle r="4" fill="#38BDF8" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 0 105 C 50 105, 80 115, 120 115" dur="2.2s" repeatCount="indefinite" />
                    </circle>

                    {/* Trace 3: Ledger Commitments (Center) */}
                    <path
                      d="M 0 160 L 120 160"
                      stroke="url(#fo-sig-grad-diffuse)"
                      strokeWidth="2.4"
                      strokeDasharray="6 3"
                    />
                    <circle r="4.5" fill="#05C7F2" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 0 160 L 120 160" dur="1.9s" repeatCount="indefinite" />
                    </circle>

                    {/* Trace 4: GSTN Compliance */}
                    <path
                      d="M 0 215 C 50 215, 80 205, 120 205"
                      stroke="url(#fo-sig-grad-diffuse)"
                      strokeWidth="2"
                    />
                    <circle r="4" fill="#38BDF8" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 0 215 C 50 215, 80 205, 120 205" dur="2.4s" repeatCount="indefinite" />
                    </circle>

                    {/* Trace 5: Vendor Payables */}
                    <path
                      d="M 0 270 C 55 270, 75 260, 120 260"
                      stroke="url(#fo-sig-grad-diffuse)"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />
                    <circle r="3.5" fill="#05C7F2" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 0 270 C 55 270, 75 260, 120 260" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}

                {/* State 02: 5 Traces Inwardly Converging into Synthesis Core */}
                {activeStateIndex === 1 && (
                  <g className="fo-traces-state-2">
                    {/* Trace 1 curve to center */}
                    <path
                      d="M 0 50 C 40 50, 40 160, 60 160"
                      stroke="url(#fo-sig-grad-converge)"
                      strokeWidth="2.2"
                    />
                    {/* Trace 2 curve to center */}
                    <path
                      d="M 0 105 C 40 105, 45 160, 60 160"
                      stroke="url(#fo-sig-grad-converge)"
                      strokeWidth="2.5"
                    />
                    {/* Trace 3 direct */}
                    <path
                      d="M 0 160 L 60 160"
                      stroke="url(#fo-sig-grad-converge)"
                      strokeWidth="3.2"
                    />
                    {/* Trace 4 curve to center */}
                    <path
                      d="M 0 215 C 40 215, 45 160, 60 160"
                      stroke="url(#fo-sig-grad-converge)"
                      strokeWidth="2.5"
                    />
                    {/* Trace 5 curve to center */}
                    <path
                      d="M 0 270 C 40 270, 40 160, 60 160"
                      stroke="url(#fo-sig-grad-converge)"
                      strokeWidth="2.2"
                    />

                    {/* Central Synthesis Glowing Nexus with Multi-Layer Aura */}
                    <circle cx="60" cy="160" r="14" fill="#05C7F2" opacity="0.3" filter="url(#fo-sig-glow)">
                      <animate attributeName="r" values="12;16;12" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="60" cy="160" r="8" fill="#05C7F2" filter="url(#fo-sig-glow)" />
                    <circle cx="60" cy="160" r="4.5" fill="#FFFFFF" filter="url(#fo-sig-glow)" />

                    {/* Unified synthesized conduit out of node */}
                    <path
                      d="M 60 160 L 120 160"
                      stroke="url(#fo-sig-grad-converge)"
                      strokeWidth="4"
                      filter="url(#fo-sig-glow)"
                    />
                    <circle r="5" fill="#05C7F2" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 60 160 L 120 160" dur="1.1s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}

                {/* State 03: Fully Unified Radiant Laser Conduit & Harmonic Tributaries */}
                {activeStateIndex === 2 && (
                  <g className="fo-traces-state-3">
                    {/* Tributary top */}
                    <path
                      d="M 0 70 C 35 70, 40 160, 60 160"
                      stroke="rgba(5, 199, 242, 0.55)"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    {/* Tributary bottom */}
                    <path
                      d="M 0 250 C 35 250, 40 160, 60 160"
                      stroke="rgba(5, 199, 242, 0.55)"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />

                    {/* Ambient Glow Aura */}
                    <path
                      d="M 0 160 L 120 160"
                      stroke="rgba(5, 199, 242, 0.3)"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Core Laser Beam */}
                    <path
                      d="M 0 160 L 120 160"
                      stroke="url(#fo-sig-grad-unified)"
                      strokeWidth="5"
                      filter="url(#fo-sig-glow)"
                    />
                    {/* Hot White Filament */}
                    <path
                      d="M 0 160 L 120 160"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                    />

                    {/* High-Velocity High-Coherence Energy Pulse */}
                    <circle r="5.5" fill="#FFFFFF" filter="url(#fo-sig-glow)">
                      <animateMotion path="M 0 160 L 120 160" dur="0.9s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* ZONE C: Clarity & Insight (Primary Evolution Panel) */}
          <div className="fo-ai-signal-clear__insight-col">
            {/* 3-State Narrative Scrubber Bar */}
            <div
              className="fo-ai-signal-clear__scrubber"
              role="tablist"
              aria-label="Progressive Narrative Progression"
            >
              <div className="fo-ai-signal-clear__scrubber-track">
                {narrativeStates.map((st, idx) => {
                  const isActive = activeStateIndex === idx;
                  const isComplete = idx < activeStateIndex;
                  return (
                    <button
                      key={st.stepLabel}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-signal-clear__scrubber-btn ${
                        isActive ? "is-active" : isComplete ? "is-complete" : ""
                      }`}
                      onClick={() => handleJumpToState(idx)}
                    >
                      <span className="fo-ai-signal-clear__scrubber-num">{st.stepNum}</span>
                      <span className="fo-ai-signal-clear__scrubber-label">{st.stepLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Clarity Information Surface */}
            <article
              className="fo-ai-signal-clear__panel"
              aria-live="polite"
              aria-label={`Clarity Stage ${currentState.stepNum}: ${currentState.title}`}
            >
              {/* Dynamic Corner Synthesis Glow */}
              <div
                className={`fo-ai-signal-clear__panel-glow ${
                  activeStateIndex === 2 ? "fo-ai-signal-clear__panel-glow--step3" : ""
                }`}
                aria-hidden="true"
              />

              <div className="fo-ai-signal-clear__panel-inner">
                {/* Header with Kicker & Lottie Icon */}
                <div className="fo-ai-signal-clear__card-header">
                  <div className="fo-ai-signal-clear__header-group">
                    <AIStageLottieIcon isActive={true} size={28} />
                    <span className="fo-ai-signal-clear__card-kicker">{currentState.eyebrow}</span>
                  </div>

                  <span className="fo-ai-signal-clear__card-badge">{currentState.badgeLabel}</span>
                </div>

                {/* State Title */}
                <h3 className="fo-ai-signal-clear__card-title">{currentState.title}</h3>

                {/* Focal Callout: The Clear Understanding */}
                <div className="fo-ai-signal-clear__focal-box">
                  <p className="fo-ai-signal-clear__focal-quote">“{currentState.focalQuote}”</p>
                </div>

                {/* Narrative Explanation */}
                <p className="fo-ai-signal-clear__supporting-line">{currentState.narrative}</p>

                {/* State 03 Suggested Strategic Options List */}
                {currentState.options && (
                  <div className="fo-ai-signal-clear__consideration-card">
                    <span className="fo-ai-signal-clear__consideration-title">
                      STRATEGIC CONSIDERATIONS
                    </span>
                    <div className="fo-ai-signal-clear__consideration-list">
                      {currentState.options.map((opt, oIdx) => (
                        <div key={oIdx} className="fo-ai-signal-clear__consideration-row">
                          <span className="fo-ai-signal-clear__bullet" aria-hidden="true">
                            ✦
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="fo-ai-signal-clear__action-controls">
                      {actionConfirmed ? (
                        <div className="fo-ai-signal-clear__action-confirmed">
                          <span aria-hidden="true">✓</span>
                          <span>Decision Logged · Forwarded to Treasury Review</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="fo-ai-signal-clear__action-btn"
                          onClick={handleConfirmAction}
                        >
                          <span>{currentState.actionCta}</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3-Column Contextual Facts Grid */}
                <div className="fo-ai-signal-clear__facts-grid">
                  {currentState.facts.map((fact) => (
                    <div key={fact.label} className="fo-ai-signal-clear__fact-item">
                      <span className="fo-ai-signal-clear__fact-label">{fact.label}</span>
                      <strong
                        className={`fo-ai-signal-clear__fact-val ${
                          fact.isAccent ? "is-accent" : ""
                        }`}
                      >
                        {fact.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Governance Footer */}
                <div className="fo-ai-signal-clear__panel-footer">
                  <div className="fo-ai-signal-clear__footer-shield">
                    <span aria-hidden="true">🛡</span>
                    <span>Operator Governance · Grounded in Transaction INV-10482 Context</span>
                  </div>
                  <div className="fo-ai-signal-clear__footer-badge">
                    Human-in-the-Loop · No Autonomous Execution
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Bottom Animated Multi-Layer Deep Sapphire Wave Divider (Option 2) */}
      <AIWaveDivider
        position="bottom"
        fillColor={afterSectionBg}
        height={36}
        durationSeconds={35}
        className="fo-ai-advantage__wave--bottom"
      />
    </section>
  );
});

export default SignalBecomesClearSection;

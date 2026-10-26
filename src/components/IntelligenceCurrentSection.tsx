import React, { memo, useState, useEffect } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIStageLottieIcon from "./AIStageLottieIcon";
import "./ai-advantage-current.css";

export interface IntelligenceCurrentSectionProps {
  beforeSectionBg?: string; // Preceding section color (Section 04: #F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  className?: string;
}

interface StagePillItem {
  num: string;
  name: string;
  kicker: string;
  title: string;
  tagline: string;
  metric: string;
}

const stagePills: StagePillItem[] = [
  {
    num: "01",
    name: "UNDERSTAND",
    kicker: "01 · SCHEMA EXTRACTION",
    title: "Understand & Extract Business Object",
    tagline: "Deterministic OCR extraction & structured schema verification in 38ms.",
    metric: "99.8% Confidence",
  },
  {
    num: "02",
    name: "MATCH",
    kicker: "02 · 3-WAY RECONCILIATION",
    title: "Connect Records & Document Lineage",
    tagline: "Automated correlation links PO, goods receipt, and ledger commitments with zero variance.",
    metric: "100% PO Match",
  },
  {
    num: "03",
    name: "VALIDATE",
    kicker: "03 · STATUTORY & COMPLIANCE",
    title: "Verify Statutory & Business Rules",
    tagline: "Real-time verification against GSTN API, e-Way bills, and internal credit limits.",
    metric: "IRN Cleared · NIC Signed",
  },
  {
    num: "04",
    name: "PREDICT",
    kicker: "04 · PAYMENT VELOCITY",
    title: "Forecast Payment Velocity & Delay Risk",
    tagline: "Continuous behavioral modeling predicts +15-day collection drift before month-end payout.",
    metric: "92% Predictive Confidence",
  },
  {
    num: "05",
    name: "DECIDE",
    kicker: "05 · STRATEGIC PROTOCOL",
    title: "Recommend Optimal Business Action",
    tagline: "Synthesizes cashflow impact and suggests prompt outreach or invoice discounting.",
    metric: "Pre-Approved Governance",
  },
  {
    num: "06",
    name: "ACT",
    kicker: "06 · GOVERNED DISPATCH",
    title: "Execute Governed Ledger Action",
    tagline: "One-click execution dispatches settlement workflows with immutable audit lineage.",
    metric: "Human-in-the-Loop",
  },
];

export const IntelligenceCurrentSection = memo(function IntelligenceCurrentSection({
  beforeSectionBg = "#F8FAFC",
  afterSectionBg = "#FAFBFD",
  className = "",
}: IntelligenceCurrentSectionProps) {
  const [activePillIndex, setActivePillIndex] = useState(0);
  const [pillMode, setPillMode] = useState<"interactive" | "ambient">("ambient");

  // Auto-advance in ambient mode (Option B)
  useEffect(() => {
    if (pillMode !== "ambient") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActivePillIndex((prev) => (prev + 1) % stagePills.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [pillMode]);

  const currentPill = stagePills[activePillIndex] || stagePills[0];

  return (
    <section
      id="section-ai-advantage-intelligence-current"
      className={`new-home-section fo-ai-current-section ${className}`}
      aria-labelledby="fo-ai-current-heading"
    >
      {/* Top Transition: multi-layer wave divider matching preceding section background */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={18}
        durationSeconds={35}
      />

      <div className="fo-ai-current__container">
        {/* Balanced Two-Part Workspace */}
        <div className="fo-ai-current__workspace">
          {/* LEFT: Financial Transaction Composition & Connected Signals (~52%) */}
          <div className="fo-ai-current__visual-col">
            <div className="fo-ai-current__canvas">
              {/* Routing Connectors SVG */}
              <svg
                className="fo-ai-current__connectors-svg"
                viewBox="0 0 540 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="fo-connector-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#534AB7" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="fo-connector-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#534AB7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#185FA5" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Connector from Top-Right Signal (Collection Drift) to Invoice & Focal Point */}
                <path
                  d="M 430 40 C 370 40, 380 120, 360 140"
                  stroke="url(#fo-connector-grad-1)"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                />
                <path
                  d="M 360 140 C 440 140, 480 180, 520 190"
                  stroke="#185FA5"
                  strokeWidth="1.8"
                  strokeOpacity="0.5"
                />

                {/* Connector from Bottom-Right Signal (Working Capital) to Focal Point */}
                <path
                  d="M 420 330 C 460 330, 480 240, 520 190"
                  stroke="url(#fo-connector-grad-2)"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                />

                {/* Connector from Bottom-Left Signal (Statutory) across to Invoice */}
                <path
                  d="M 170 330 C 230 330, 240 280, 260 260"
                  stroke="rgba(24, 95, 165, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>

              {/* Central Refined Invoice Card (INV-10482) */}
              <aside
                className="fo-ai-current__invoice"
                aria-label="Anchored Commercial Transaction: INV-10482"
              >
                {/* Invoice Meta Header */}
                <div className="fo-ai-current__inv-header">
                  <span className="fo-ai-current__inv-kicker">COMMERCIAL OBJECT</span>
                  <div className="fo-ai-current__inv-badge">
                    <span className="fo-ai-current__inv-badge-dot" aria-hidden="true" />
                    <span>{currentPill.kicker}</span>
                  </div>
                </div>

                {/* Invoice Main Identification & Amount */}
                <div className="fo-ai-current__inv-payload">
                  <strong className="fo-ai-current__inv-ref">INV-10482</strong>
                  <span className="fo-ai-current__inv-amount">₹5,90,000</span>
                  <p className="fo-ai-current__inv-client">
                    Ananya Enterprises Pvt Ltd · GSTIN 36AABCA1234F1Z5
                  </p>
                </div>

                {/* Line Item / Context Rows */}
                <div className="fo-ai-current__inv-rows" aria-label="Transaction line details">
                  <div className="fo-ai-current__inv-row">
                    <span>Commercial Fulfillment (SO-10482)</span>
                    <span>₹5,00,000</span>
                  </div>
                  <div className="fo-ai-current__inv-row">
                    <span>Statutory GST (CGST + SGST 18%)</span>
                    <span>₹90,000</span>
                  </div>
                </div>

                {/* Telemetry Tray */}
                <div className="fo-ai-current__inv-telemetry">
                  <div className="fo-ai-current__inv-metric">
                    <small>TERMS</small>
                    <strong className="is-highlight">Net 30 · Day +30</strong>
                  </div>
                  <div className="fo-ai-current__inv-metric">
                    <small>PO MATCH</small>
                    <strong>3-Way Cleared</strong>
                  </div>
                  <div className="fo-ai-current__inv-metric">
                    <small>CONFIDENCE</small>
                    <strong className="is-highlight">{currentPill.metric.split(" ")[0]}</strong>
                  </div>
                </div>
              </aside>

              {/* Surrounding Connected Business Signals */}
              {/* Signal 1: Top Right (Payment Velocity Context) */}
              <div
                className="fo-ai-current__signal fo-ai-current__signal--top-right"
                aria-label="Connected signal: Collection drift"
              >
                <span className="fo-ai-current__signal-kicker">COLLECTION DRIFT</span>
                <p className="fo-ai-current__signal-text">Historical +15d settlement shift</p>
                <span className="fo-ai-current__signal-meta">Projected Day +45</span>
              </div>

              {/* Signal 2: Bottom Right (Working Capital Context) */}
              <div
                className="fo-ai-current__signal fo-ai-current__signal--bottom-right"
                aria-label="Connected signal: Working capital impact"
              >
                <span className="fo-ai-current__signal-kicker">WORKING CAPITAL</span>
                <p className="fo-ai-current__signal-text">Day +38 vendor disbursement run</p>
                <span className="fo-ai-current__signal-meta">Liquidity Overlap</span>
              </div>

              {/* Signal 3: Bottom Left (Contractual Due Context) */}
              <div
                className="fo-ai-current__signal fo-ai-current__signal--bottom-left"
                aria-label="Connected signal: Statutory terms"
              >
                <span className="fo-ai-current__signal-kicker">STATUTORY DUE</span>
                <p className="fo-ai-current__signal-text">Net 30 window ends 28 Jun 2026</p>
                <span className="fo-ai-current__signal-meta">NIC Cleared</span>
              </div>

              {/* Intelligence Focal Point: Visual Convergence Node near the Divider */}
              <div
                className="fo-ai-current__focal-point"
                role="status"
                aria-label="Connected Intelligence Synthesis Point"
              >
                <span className="fo-ai-current__focal-lottie" aria-hidden="true">
                  <AIStageLottieIcon isActive={true} size={22} />
                </span>
                <div className="fo-ai-current__focal-text">
                  <strong>INTELLIGENCE SYNTHESIS</strong>
                  <small>{currentPill.name} Active</small>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: The Animated Organic Vertical Divider (The Intelligence Current) */}
          <div
            className="fo-ai-current__divider-col"
            aria-hidden="true"
            title="The Intelligence Current organic divider"
          >
            <div className="fo-ai-current__vertical-divider-shell">
              <svg
                className="fo-ai-current__vertical-svg"
                viewBox="0 0 70 520"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="fo-current-grad-front" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DCEBFA" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#E5E8FA" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#C5DCF8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Layer 1 (Back Wave: Soft Periwinkle #E5E8FA, 35s animation) */}
                <path
                  className="fo-ai-current__layer-back"
                  d="M 28 0 C 48 80, 8 160, 36 250 C 60 330, 15 420, 32 520 L 0 520 L 0 0 Z"
                />

                {/* Layer 2 (Middle Wave: Mist Blue #DCEBFA, 28s animation) */}
                <path
                  className="fo-ai-current__layer-mid"
                  d="M 38 0 C 12 70, 52 150, 24 235 C 2 320, 54 400, 28 520 L 0 520 L 0 0 Z"
                />

                {/* Layer 3 (Front Wave: Front Blend, 42s animation) */}
                <path
                  className="fo-ai-current__layer-front"
                  d="M 20 0 C 42 60, 16 140, 44 220 C 68 310, 10 390, 40 520 L 0 520 L 0 0 Z"
                />
              </svg>
            </div>
          </div>

          {/* MOBILE ONLY: Horizontal Organic Transition between Stacked Halves */}
          <div className="fo-ai-current__horizontal-divider-shell" aria-hidden="true">
            <div className="fo-ai-current__horizontal-track">
              <svg
                className="fo-ai-current__horizontal-svg"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mobile Layer 1 */}
                <path
                  d="m527,19.6c203.9-53,263.1,20.4,320.3,0,86.7-31.1,152.7,4.6,152.7,4.6v35.8H0v-35.8S62.1,8.5,94.9,6.6c32.8-2,62.8,7.4,75.8,13.3,23.3,10.4,84,34.9,134.4,37.3s202.5-32.6,221.9-37.6Z"
                  fill="#E5E8FA"
                  opacity="0.55"
                />
                {/* Mobile Layer 2 */}
                <path
                  d="m266,19.6c45.5,0,77.2,13.9,129.1,23.5,28.6,5.2,150.3,6.1,254-23.5,103.7-29.5,91.7,20.6,149.2,0,86-30.6,201.7,16.5,201.7,16.5v23.9H0v-21.9s28.2,11.1,92.1,11.1c97.7-.1,132.2-29.6,173.9-29.6Z"
                  fill="#DCEBFA"
                  opacity="0.75"
                />
                {/* Mobile Layer 3 */}
                <path
                  d="m233.9,42.7c200,34.5,266-39.3,395.1-11.7,129,28,129,25.8,186.2,16.7,56.8-9.1,52.5-14.6,94.9-19.1,61.3-6.7,89.9,31.5,89.9,31.5H0s9.9-24.5,83.6-28.9,86.8.7,150.3,11.5Z"
                  fill="#F8FAFF"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: Editorial Content (~48%) */}
          <div className="fo-ai-current__content-col">
            {/* Eyebrow */}
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

            {/* Headline (Bebas Neue) */}
            <h2 id="fo-ai-current-heading" className="fo-ai-current__headline">
              AI that understands <br className="fo-ai-current__br-desktop" />
              the whole business.
            </h2>

            {/* Description (Lorin) */}
            <p className="fo-ai-current__desc">
              flowOne connects transaction details, operational context and financial
              signals to help teams see what matters next.
            </p>

            {/* Compact Info Pills Track & Contextual Stepper (Option A & B) */}
            <div className="fo-ai-current__pills-wrapper">
              <div className="fo-ai-current__pills-header">
                <span className="fo-ai-current__pills-caption">6-STAGE INTELLIGENCE LIFECYCLE</span>
                <div className="fo-ai-current__mode-toggle" role="group" aria-label="Pill View Mode">
                  <button
                    type="button"
                    className={`fo-ai-current__mode-btn ${pillMode === "interactive" ? "is-active" : ""}`}
                    onClick={() => setPillMode("interactive")}
                    aria-pressed={pillMode === "interactive"}
                    title="Option A: Interactive Stepper with contextual micro-card"
                  >
                    Option A (Interactive)
                  </button>
                  <button
                    type="button"
                    className={`fo-ai-current__mode-btn ${pillMode === "ambient" ? "is-active" : ""}`}
                    onClick={() => setPillMode("ambient")}
                    aria-pressed={pillMode === "ambient"}
                    title="Option B: Ambient Editorial Badges (Minimal)"
                  >
                    Option B (Ambient)
                  </button>
                </div>
              </div>

              {/* Horizontal 6-Pills Track */}
              <div
                className="fo-ai-current__pills-track"
                role="tablist"
                aria-label="Intelligence Lifecycle Progression"
              >
                {stagePills.map((pill, idx) => {
                  const isActive = activePillIndex === idx;
                  return (
                    <button
                      key={pill.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-current__pill-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => setActivePillIndex(idx)}
                    >
                      {isActive && pillMode === "ambient" && (
                        <span className="fo-ai-current__pill-dot" aria-hidden="true" />
                      )}
                      <span className="fo-ai-current__pill-num">{pill.num}</span>
                      <span className="fo-ai-current__pill-label">{pill.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Option B: Ambient Subtle Stream Caption (Minimal & Calm) */}
              {pillMode === "ambient" && (
                <div className="fo-ai-current__ambient-caption" aria-live="polite">
                  <div className="fo-ai-current__ambient-indicator">
                    <span className="fo-ai-current__pill-dot" aria-hidden="true" />
                    <span>{currentPill.kicker}</span>
                  </div>
                  <span className="fo-ai-current__ambient-tagline">
                    {currentPill.metric}
                  </span>
                </div>
              )}

              {/* Option A: Contextual Micro-Card (Rendered when in interactive mode) */}
              {pillMode === "interactive" && (
                <div
                  className="fo-ai-current__pill-detail"
                  role="tabpanel"
                  aria-label={`${currentPill.num} ${currentPill.name} Stage Overview`}
                >
                  <div className="fo-ai-current__detail-top">
                    <span className="fo-ai-current__detail-kicker">{currentPill.kicker}</span>
                    <span className="fo-ai-current__detail-metric">{currentPill.metric}</span>
                  </div>
                  <h4 className="fo-ai-current__detail-title">{currentPill.title}</h4>
                  <p className="fo-ai-current__detail-tagline">{currentPill.tagline}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Transition: multi-layer wave divider matching following section background */}
      <AIWaveDivider
        position="bottom"
        fillColor={afterSectionBg}
        height={18}
        durationSeconds={35}
      />
    </section>
  );
});

export default IntelligenceCurrentSection;

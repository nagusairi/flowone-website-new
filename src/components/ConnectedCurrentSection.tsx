import React, { memo, useState, useEffect } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIStageLottieIcon from "./AIStageLottieIcon";
import "./ai-advantage-connected-current.css";

export interface ConnectedCurrentSectionProps {
  beforeSectionBg?: string; // Preceding section color (#F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  initialVariant?: "fusion" | "river" | "unified";
  className?: string;
}

export type ConnCurrentVariant = "fusion" | "river" | "unified";

interface ConnectedStepItem {
  key: string;
  num: string;
  name: string;
  shortLabel: string;
  dotColor: string;
  milestone: string;
  sub: string;
  kicker: string;
  metric: string;
  title: string;
  desc: string;
}

const connectedSteps: ConnectedStepItem[] = [
  {
    key: "ops",
    num: "01",
    name: "OPERATIONS",
    shortLabel: "OPERATIONS",
    dotColor: "#059669",
    milestone: "PO-8841 Dispatched",
    sub: "Fulfillment & Delivery",
    kicker: "01 · PHYSICAL OPERATIONS",
    metric: "100% Goods Receipt",
    title: "The Physical Journey: Dispatch, Receipt & Verification",
    desc: "PO-8841 is issued, goods are dispatched, and physical receipt is verified at the warehouse gate with zero line-item variance.",
  },
  {
    key: "finance",
    num: "02",
    name: "FINANCE",
    shortLabel: "FINANCE",
    dotColor: "#185FA5",
    milestone: "Net 30 · Scheduled",
    sub: "Billing & Working Capital",
    kicker: "02 · FINANCIAL CONTEXT",
    metric: "₹5,90,000 Linked",
    title: "The Economic Journey: Invoice Terms & Working Capital",
    desc: "Ananya Enterprises invoice is posted to the ledger, correlated with contractual Net 30 terms, and linked to working capital forecasts.",
  },
  {
    key: "compliance",
    num: "03",
    name: "COMPLIANCE",
    shortLabel: "COMPLIANCE",
    dotColor: "#534AB7",
    milestone: "IRN / E-Way Cleared",
    sub: "Statutory & Audit Lineage",
    kicker: "03 · REGULATORY INTEGRITY",
    metric: "NIC Signed & Sealed",
    title: "The Statutory Journey: Tax Clearance & Audit Lineage",
    desc: "Real-time IRN registration on the GSTN portal, verified e-Way bill 4910, and immutable audit trail ensure complete regulatory certainty.",
  },
];

export const ConnectedCurrentSection = memo(function ConnectedCurrentSection({
  beforeSectionBg = "#F8FAFC",
  afterSectionBg = "#FAFBFD",
  initialVariant = "fusion",
  className = "",
}: ConnectedCurrentSectionProps) {
  const [variant, setVariant] = useState<ConnCurrentVariant>(initialVariant);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isUnifiedView, setIsUnifiedView] = useState(false);
  const [pillMode, setPillMode] = useState<"interactive" | "ambient">("ambient");

  // Read URL query param ?opt=1, ?opt=2, ?opt=3
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const opt = params.get("opt");
      if (opt === "1") setVariant("fusion");
      else if (opt === "2") setVariant("river");
      else if (opt === "3") setVariant("unified");
    }
  }, []);

  // Ambient auto-advance
  useEffect(() => {
    if (pillMode !== "ambient") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % connectedSteps.length);
      setIsUnifiedView(false);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [pillMode]);

  const activeStep = connectedSteps[activeStepIndex] || connectedSteps[0];
  const activeKey = isUnifiedView ? "unified" : activeStep.key;

  const handleSelectStep = (idx: number) => {
    setActiveStepIndex(idx);
    setIsUnifiedView(false);
  };

  const handleSelectUnified = () => {
    setIsUnifiedView(true);
  };

  return (
    <section
      id="section-ai-advantage-connected-current"
      className={`new-home-section fo-ai-conn-current-section ${className}`}
      aria-labelledby="fo-ai-conn-current-heading"
    >
      {/* Top Transition: multi-layer wave divider matching preceding section background */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={18}
        durationSeconds={35}
      />

      <div className="fo-ai-conn-current__container">
        {/* Balanced Two-Part Workspace (~52% Visual, ~48% Editorial) */}
        <div className="fo-ai-conn-current__workspace">
          {/* LEFT: Visual Column with In-Section Variant Switcher */}
          <div className="fo-ai-conn-current__visual-col">
            {/* IN-SECTION VARIANT SWITCHER BAR */}
            <div
              className="fo-ai-conn-current__variant-nav"
              role="tablist"
              aria-label="Compare Connected Current Design Variants"
            >
              <button
                type="button"
                role="tab"
                aria-selected={variant === "fusion"}
                className={`fo-ai-conn-current__variant-btn ${variant === "fusion" ? "is-active" : ""}`}
                onClick={() => setVariant("fusion")}
                title="Option 1: Balanced Editorial Fusion (Central Invoice + 3 Satellites)"
              >
                Option 1: Balanced Fusion
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={variant === "river"}
                className={`fo-ai-conn-current__variant-btn ${variant === "river" ? "is-active" : ""}`}
                onClick={() => setVariant("river")}
                title="Option 2: Tri-Stream River (Continuous Fluid Streams)"
              >
                Option 2: Tri-Stream River
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={variant === "unified"}
                className={`fo-ai-conn-current__variant-btn ${variant === "unified" ? "is-active" : ""}`}
                onClick={() => setVariant("unified")}
                title="Option 3: Unified Ledger (Single Minimalist Card)"
              >
                Option 3: Unified Ledger
              </button>
            </div>

            {/* CANVAS */}
            <div className="fo-ai-conn-current__canvas">
              <div className="fo-ai-conn-current__grid-pattern" aria-hidden="true" />

              {/* ==========================================================
                  OPTION 1: BALANCED FUSION (Central Invoice + 3 Satellites)
                  ========================================================== */}
              {variant === "fusion" && (
                <>
                  {/* SVG Conduits & Pulse Beads */}
                  <svg
                    className="fo-ai-conn-current__svg-layer"
                    viewBox="0 0 600 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="fo-cc-grad-ops" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#185FA5" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="fo-cc-grad-fin" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#185FA5" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="fo-cc-grad-comp" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#534AB7" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#185FA5" stopOpacity="0.9" />
                      </linearGradient>

                      <filter id="fo-cc-glow-ops" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#059669" floodOpacity="0.8" />
                      </filter>
                      <filter id="fo-cc-glow-fin" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#185FA5" floodOpacity="0.8" />
                      </filter>
                      <filter id="fo-cc-glow-comp" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#534AB7" floodOpacity="0.8" />
                      </filter>
                    </defs>

                    {/* Background Conduit Rails */}
                    <path d="M 120 70 C 180 70, 210 200, 260 235" stroke="#E2E8F0" strokeWidth="2.8" strokeLinecap="round" />
                    <path d="M 120 420 C 180 420, 210 280, 260 245" stroke="#E2E8F0" strokeWidth="2.8" strokeLinecap="round" />
                    <path d="M 480 420 C 420 420, 360 280, 290 245" stroke="#E2E8F0" strokeWidth="2.8" strokeLinecap="round" />

                    {/* Active Fluid Curves */}
                    <path
                      d="M 120 70 C 180 70, 210 200, 260 235"
                      stroke="url(#fo-cc-grad-ops)"
                      strokeWidth={activeKey === "ops" || isUnifiedView ? "2.6" : "1.4"}
                      strokeOpacity={activeKey === "ops" || isUnifiedView ? 1 : 0.35}
                    />
                    <path
                      d="M 120 420 C 180 420, 210 280, 260 245"
                      stroke="url(#fo-cc-grad-fin)"
                      strokeWidth={activeKey === "finance" || isUnifiedView ? "2.6" : "1.4"}
                      strokeOpacity={activeKey === "finance" || isUnifiedView ? 1 : 0.35}
                    />
                    <path
                      d="M 480 420 C 420 420, 360 280, 290 245"
                      stroke="url(#fo-cc-grad-comp)"
                      strokeWidth={activeKey === "compliance" || isUnifiedView ? "2.6" : "1.4"}
                      strokeOpacity={activeKey === "compliance" || isUnifiedView ? 1 : 0.35}
                    />

                    {/* Traveling Energy Pulse Beads toward AI Hub */}
                    <circle r="4.5" fill="#059669" filter="url(#fo-cc-glow-ops)">
                      <animateMotion
                        path="M 120 70 C 180 70, 210 200, 260 235"
                        dur="3s"
                        repeatCount="indefinite"
                        calcMode="linear"
                      />
                      <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.85; 1" dur="3s" repeatCount="indefinite" />
                    </circle>

                    <circle r="4.5" fill="#185FA5" filter="url(#fo-cc-glow-fin)">
                      <animateMotion
                        path="M 120 420 C 180 420, 210 280, 260 245"
                        dur="2.8s"
                        begin="0.5s"
                        repeatCount="indefinite"
                        calcMode="linear"
                      />
                      <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.85; 1" dur="2.8s" begin="0.5s" repeatCount="indefinite" />
                    </circle>

                    <circle r="4.5" fill="#534AB7" filter="url(#fo-cc-glow-comp)">
                      <animateMotion
                        path="M 480 420 C 420 420, 360 280, 290 245"
                        dur="3.2s"
                        begin="1s"
                        repeatCount="indefinite"
                        calcMode="linear"
                      />
                      <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.85; 1" dur="3.2s" begin="1s" repeatCount="indefinite" />
                    </circle>
                  </svg>

                  {/* Satellite Node 1: Top-Left (Operations) */}
                  <div
                    className={`fo-ai-conn-current__sat-node fo-ai-conn-current__sat--ops ${
                      activeKey === "ops" || isUnifiedView ? "is-active" : ""
                    }`}
                    onClick={() => handleSelectStep(0)}
                  >
                    <span className="fo-ai-conn-current__sat-tag">
                      <span style={{ color: "#059669" }}>●</span> 01 · OPERATIONS
                    </span>
                    <h4 className="fo-ai-conn-current__sat-title">PO-8841 Dispatched</h4>
                    <span className="fo-ai-conn-current__sat-sub">100% Goods Receipt Verified</span>
                  </div>

                  {/* Satellite Node 2: Bottom-Left (Finance) */}
                  <div
                    className={`fo-ai-conn-current__sat-node fo-ai-conn-current__sat--fin ${
                      activeKey === "finance" || isUnifiedView ? "is-active" : ""
                    }`}
                    onClick={() => handleSelectStep(1)}
                  >
                    <span className="fo-ai-conn-current__sat-tag">
                      <span style={{ color: "#185FA5" }}>●</span> 02 · FINANCE
                    </span>
                    <h4 className="fo-ai-conn-current__sat-title">Net 30 · Ledger</h4>
                    <span className="fo-ai-conn-current__sat-sub">Day +38 Working Capital Run</span>
                  </div>

                  {/* Satellite Node 3: Bottom-Right (Compliance) */}
                  <div
                    className={`fo-ai-conn-current__sat-node fo-ai-conn-current__sat--comp ${
                      activeKey === "compliance" || isUnifiedView ? "is-active" : ""
                    }`}
                    onClick={() => handleSelectStep(2)}
                  >
                    <span className="fo-ai-conn-current__sat-tag">
                      <span style={{ color: "#534AB7" }}>●</span> 03 · COMPLIANCE
                    </span>
                    <h4 className="fo-ai-conn-current__sat-title">NIC IRN Verified</h4>
                    <span className="fo-ai-conn-current__sat-sub">E-Way Bill 4910 Cleared</span>
                  </div>

                  {/* Central Hero Invoice */}
                  <div className="fo-ai-conn-current__hero-invoice">
                    <div className="fo-ai-conn-current__invoice-hdr">
                      <div className="fo-ai-conn-current__invoice-pill">
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#185FA5" }} />
                        <span>CONNECTED TXN</span>
                      </div>
                      <span className="fo-ai-conn-current__invoice-ref">INV-10482</span>
                    </div>

                    <span className="fo-ai-conn-current__invoice-client">Ananya Enterprises Pvt Ltd</span>
                    <div className="fo-ai-conn-current__invoice-amt-row">
                      <span className="fo-ai-conn-current__invoice-amt">₹5,90,000</span>
                      <span className="fo-ai-conn-current__invoice-terms">Due in 12d · Net 30</span>
                    </div>

                    <div className="fo-ai-conn-current__invoice-ftr">
                      <span>GSTN: 27AABCT3514Q1ZS</span>
                      <span style={{ color: "#059669", fontWeight: 600 }}>✓ In Sync</span>
                    </div>
                  </div>

                  {/* 52px Cosmic AI Intelligence Convergence Hub */}
                  <div className="fo-ai-conn-current__hub" aria-hidden="true">
                    <div className="fo-ai-conn-current__hub-orb">
                      <span className="fo-ai-conn-current__hub-halo" />
                      <span className="fo-ai-conn-current__hub-orbit" />
                      <span className="fo-ai-conn-current__hub-beacon" />
                      <div className="fo-ai-conn-current__hub-tag">
                        <span className="fo-ai-conn-current__hub-tag-dot" />
                        <span>flowOne AI</span>
                      </div>
                      <div className="fo-ai-conn-current__hub-icon-shell">
                        <AIStageLottieIcon isActive={true} size={42} className="fo-ai-conn-current__hub-lottie" />
                        <svg className="fo-ai-conn-current__hub-spark-svg" viewBox="0 0 32 32" fill="none">
                          <path
                            d="M16 2 L18.8 12.2 L29 15 L18.8 17.8 L16 28 L13.2 17.8 L3 15 L13.2 12.2 Z"
                            fill="url(#fo-spark-glow-fusion)"
                          />
                          <circle cx="16" cy="15" r="2.8" fill="#FFFFFF" opacity="0.95" />
                          <defs>
                            <linearGradient id="fo-spark-glow-fusion" x1="3" y1="2" x2="29" y2="28" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#05C7F2" />
                              <stop offset="0.45" stopColor="#0528F2" />
                              <stop offset="0.85" stopColor="#D9299B" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ==========================================================
                  OPTION 2: TRI-STREAM RIVER (Continuous Flowing Color Streams)
                  ========================================================== */}
              {variant === "river" && (
                <div className="fo-ai-conn-current__river-shell">
                  <svg
                    className="fo-ai-conn-current__svg-layer"
                    viewBox="0 0 600 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="fo-river-grad-ops" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                        <stop offset="60%" stopColor="#059669" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="fo-river-grad-fin" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#185FA5" stopOpacity="0.2" />
                        <stop offset="60%" stopColor="#185FA5" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="fo-river-grad-comp" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#534AB7" stopOpacity="0.2" />
                        <stop offset="60%" stopColor="#534AB7" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>

                    {/* 3 Flowing Ribbon Streams converging into (310, 240) */}
                    <path
                      d="M 20 85 C 130 85, 200 230, 310 240"
                      stroke="url(#fo-river-grad-ops)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 240 C 130 240, 200 240, 310 240"
                      stroke="url(#fo-river-grad-fin)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 395 C 130 395, 200 250, 310 240"
                      stroke="url(#fo-river-grad-comp)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    {/* Unified River Conduit from Hub into Card */}
                    <path
                      d="M 310 240 L 380 240"
                      stroke="#05C7F2"
                      strokeWidth="7"
                      strokeLinecap="round"
                      filter="drop-shadow(0 0 8px rgba(5, 199, 242, 0.8))"
                    />

                    {/* Fast Flowing Traveling Particles */}
                    <circle r="5" fill="#059669">
                      <animateMotion path="M 20 85 C 130 85, 200 230, 310 240 L 380 240" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                    <circle r="5" fill="#185FA5">
                      <animateMotion path="M 20 240 C 130 240, 200 240, 310 240 L 380 240" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
                    </circle>
                    <circle r="5" fill="#534AB7">
                      <animateMotion path="M 20 395 C 130 395, 200 250, 310 240 L 380 240" dur="2.8s" begin="0.8s" repeatCount="indefinite" />
                    </circle>
                  </svg>

                  {/* Inline Floating Stream Badges */}
                  <div className="fo-ai-conn-current__river-badge fo-ai-conn-current__river-badge--ops">
                    <span>● 01 OPERATIONS: PO-8841</span>
                  </div>
                  <div className="fo-ai-conn-current__river-badge fo-ai-conn-current__river-badge--fin">
                    <span>● 02 FINANCE: NET 30 LEDGER</span>
                  </div>
                  <div className="fo-ai-conn-current__river-badge fo-ai-conn-current__river-badge--comp">
                    <span>● 03 COMPLIANCE: NIC IRN</span>
                  </div>

                  {/* Convergence Hub */}
                  <div style={{ position: "absolute", top: "50%", left: "310px", transform: "translate(-50%, -50%)", zIndex: 6 }}>
                    <div className="fo-ai-conn-current__hub-orb">
                      <span className="fo-ai-conn-current__hub-halo" />
                      <span className="fo-ai-conn-current__hub-orbit" />
                      <div className="fo-ai-conn-current__hub-icon-shell">
                        <AIStageLottieIcon isActive={true} size={42} className="fo-ai-conn-current__hub-lottie" />
                      </div>
                    </div>
                  </div>

                  {/* Transaction Card */}
                  <div className="fo-ai-conn-current__river-card">
                    <div className="fo-ai-conn-current__invoice-hdr">
                      <div className="fo-ai-conn-current__invoice-pill">
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#185FA5" }} />
                        <span>CONNECTED RIVER</span>
                      </div>
                      <span className="fo-ai-conn-current__invoice-ref">INV-10482</span>
                    </div>
                    <span className="fo-ai-conn-current__invoice-client">Ananya Enterprises Pvt Ltd</span>
                    <div className="fo-ai-conn-current__invoice-amt-row">
                      <span className="fo-ai-conn-current__invoice-amt">₹5,90,000</span>
                      <span className="fo-ai-conn-current__invoice-terms">Due in 12d</span>
                    </div>
                    <div style={{ fontSize: "0.64rem", color: "#059669", fontWeight: 600 }}>
                      ✓ 3 Business Streams Unified
                    </div>
                  </div>
                </div>
              )}

              {/* ==========================================================
                  OPTION 3: UNIFIED LEDGER (Single Minimalist Hero Document)
                  ========================================================== */}
              {variant === "unified" && (
                <div className="fo-ai-conn-current__ledger-shell">
                  <div className="fo-ai-conn-current__ledger-aura" aria-hidden="true" />
                  <div className="fo-ai-conn-current__ledger-card">
                    <div className="fo-ai-conn-current__invoice-hdr">
                      <div className="fo-ai-conn-current__invoice-pill">
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#185FA5" }} />
                        <span>UNIFIED LIVING LEDGER</span>
                      </div>
                      <span className="fo-ai-conn-current__invoice-ref">INV-10482</span>
                    </div>

                    <span className="fo-ai-conn-current__invoice-client">Ananya Enterprises Pvt Ltd</span>
                    <div className="fo-ai-conn-current__invoice-amt-row">
                      <span className="fo-ai-conn-current__invoice-amt">₹5,90,000</span>
                      <span className="fo-ai-conn-current__invoice-terms">Net 30 · Due in 12 Days</span>
                    </div>

                    {/* Living Telemetry Rows */}
                    <div className="fo-ai-conn-current__telemetry-list">
                      <div className="fo-ai-conn-current__telemetry-row">
                        <span className="fo-ai-conn-current__telemetry-label" style={{ color: "#059669" }}>
                          ● Operations
                        </span>
                        <span className="fo-ai-conn-current__telemetry-val">PO-8841 · 100% Goods Receipt</span>
                      </div>
                      <div className="fo-ai-conn-current__telemetry-row">
                        <span className="fo-ai-conn-current__telemetry-label" style={{ color: "#185FA5" }}>
                          ● Finance
                        </span>
                        <span className="fo-ai-conn-current__telemetry-val">Day +38 Working Capital Runway</span>
                      </div>
                      <div className="fo-ai-conn-current__telemetry-row">
                        <span className="fo-ai-conn-current__telemetry-label" style={{ color: "#534AB7" }}>
                          ● Compliance
                        </span>
                        <span className="fo-ai-conn-current__telemetry-val">NIC IRN & E-Way 4910 Signed</span>
                      </div>
                    </div>

                    {/* Integrated AI Lineage Bar */}
                    <div className="fo-ai-conn-current__ledger-ai-bar">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#05C7F2" }} />
                        flowOne AI Connected Lineage
                      </span>
                      <span style={{ color: "#534AB7" }}>Zero Silo Drift</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: Signature 3-Layer Organic Current Wave Divider (from Direction 01) */}
          <div
            className="fo-ai-conn-current__divider-col"
            aria-hidden="true"
            title="The Connected Current organic wave divider"
          >
            <div className="fo-ai-conn-current__vertical-divider-shell">
              <svg
                className="fo-ai-conn-current__vertical-svg"
                viewBox="0 0 70 520"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Layer 1 (Back Wave: Soft Periwinkle #E5E8FA, 35s animation) */}
                <path
                  className="fo-ai-conn-current__layer-back"
                  d="M 28 0 C 48 80, 8 160, 36 250 C 60 330, 15 420, 32 520 L 0 520 L 0 0 Z"
                />

                {/* Layer 2 (Middle Wave: Mist Blue #DCEBFA, 28s animation) */}
                <path
                  className="fo-ai-conn-current__layer-mid"
                  d="M 38 0 C 12 70, 52 150, 24 235 C 2 320, 54 400, 28 520 L 0 520 L 0 0 Z"
                />

                {/* Layer 3 (Front Wave: Front Blend, 42s animation) */}
                <path
                  className="fo-ai-conn-current__layer-front"
                  d="M 20 0 C 42 60, 16 140, 44 220 C 68 310, 10 390, 40 520 L 0 520 L 0 0 Z"
                />
              </svg>
            </div>
          </div>

          {/* MOBILE ONLY: Horizontal Organic Transition between Stacked Halves */}
          <div className="fo-ai-conn-current__horizontal-divider-shell" aria-hidden="true">
            <div className="fo-ai-conn-current__horizontal-track">
              <svg
                className="fo-ai-conn-current__horizontal-svg"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m527,19.6c203.9-53,263.1,20.4,320.3,0,86.7-31.1,152.7,4.6,152.7,4.6v35.8H0v-35.8S62.1,8.5,94.9,6.6c32.8-2,62.8,7.4,75.8,13.3,23.3,10.4,84,34.9,134.4,37.3s202.5-32.6,221.9-37.6Z"
                  fill="#E5E8FA"
                  opacity="0.55"
                />
                <path
                  d="m266,19.6c45.5,0,77.2,13.9,129.1,23.5,28.6,5.2,150.3,6.1,254-23.5,103.7-29.5,91.7,20.6,149.2,0,86-30.6,201.7,16.5,201.7,16.5v23.9H0v-21.9s28.2,11.1,92.1,11.1c97.7-.1,132.2-29.6,173.9-29.6Z"
                  fill="#DCEBFA"
                  opacity="0.75"
                />
                <path
                  d="m233.9,42.7c200,34.5,266-39.3,395.1-11.7,129,28,129,25.8,186.2,16.7,56.8-9.1,52.5-14.6,94.9-19.1,61.3-6.7,89.9,31.5,89.9,31.5H0s9.9-24.5,83.6-28.9,86.8.7,150.3,11.5Z"
                  fill="#F8FAFF"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: Editorial Content (~48%) */}
          <div className="fo-ai-conn-current__content-col">
            {/* Eyebrow — Hero Section Modern Eyebrow Capsule (Static, Non-Clickable) */}
            <div className="hero-eyebrow-container fo-ai-path__eyebrow-container">
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
                    <path
                      d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Headline (Bebas Neue) */}
            <h2 id="fo-ai-conn-current-heading" className="fo-ai-conn-current__headline">
              One connected view. <br className="hidden md:inline" />
              Better-informed decisions.
            </h2>

            {/* Description (Lorin) */}
            <p className="fo-ai-conn-current__desc">
              flowOne AI brings related business context together, helping teams
              understand the wider implications of everyday transactions.
            </p>

            {/* Connected Journey Stepper (4 Pills Track) */}
            <div className="fo-ai-conn-current__pills-wrapper">
              <div className="fo-ai-conn-current__pills-header">
                <span className="fo-ai-conn-current__pills-caption">THE CONNECTED JOURNEY</span>
                <div className="fo-ai-conn-current__mode-toggle" role="group" aria-label="Journey Mode">
                  <button
                    type="button"
                    className={`fo-ai-conn-current__mode-btn ${pillMode === "interactive" ? "is-active" : ""}`}
                    onClick={() => setPillMode("interactive")}
                    aria-pressed={pillMode === "interactive"}
                    title="Interactive: Click stages to explore individual cards"
                  >
                    Interactive
                  </button>
                  <button
                    type="button"
                    className={`fo-ai-conn-current__mode-btn ${pillMode === "ambient" ? "is-active" : ""}`}
                    onClick={() => setPillMode("ambient")}
                    aria-pressed={pillMode === "ambient"}
                    title="Ambient Flow: Auto-advancing connected route"
                  >
                    Ambient Flow
                  </button>
                </div>
              </div>

              {/* Steps Track */}
              <div
                className="fo-ai-conn-current__pills-track"
                role="tablist"
                aria-label="Connected Business Stages"
              >
                {connectedSteps.map((stage, idx) => {
                  const isActive = !isUnifiedView && activeStepIndex === idx;
                  return (
                    <button
                      key={stage.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-conn-current__pill-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => handleSelectStep(idx)}
                    >
                      {isActive && <span className="fo-ai-conn-current__pill-dot" aria-hidden="true" />}
                      <span className="fo-ai-conn-current__pill-num">{stage.num}</span>
                      <span>{stage.shortLabel}</span>
                    </button>
                  );
                })}

                {/* Unified Complete View Button */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isUnifiedView}
                  className={`fo-ai-conn-current__pill-btn ${isUnifiedView ? "is-active" : ""}`}
                  onClick={handleSelectUnified}
                  title="View all connected functions converged into one path"
                >
                  {isUnifiedView && <span className="fo-ai-conn-current__pill-dot" aria-hidden="true" />}
                  <span>UNIFIED PATH</span>
                </button>
              </div>

              {/* Interactive Detail Card (When in interactive mode) */}
              {pillMode === "interactive" ? (
                <div
                  className="fo-ai-conn-current__pill-detail"
                  role="tabpanel"
                  aria-label={`${activeStep.shortLabel} Detail`}
                >
                  <div className="fo-ai-conn-current__detail-top">
                    <span className="fo-ai-conn-current__detail-kicker">
                      {isUnifiedView ? "COMPLETE BUSINESS JOURNEY" : activeStep.kicker}
                    </span>
                    <span className="fo-ai-conn-current__detail-metric">
                      {isUnifiedView ? "3 Functions In Sync" : activeStep.metric}
                    </span>
                  </div>
                  <h6 className="fo-ai-conn-current__detail-title">
                    {isUnifiedView
                      ? "Three Business Functions, One Continuous Lineage"
                      : activeStep.title}
                  </h6>
                  <p className="fo-ai-conn-current__detail-desc">
                    {isUnifiedView
                      ? "Instead of isolated silos operating in the dark, flowOne AI tracks the entire journey of INV-10482 across operations, finance, and compliance, ensuring every decision is made with the complete picture in view."
                      : activeStep.desc}
                  </p>
                </div>
              ) : (
                /* Ambient Mode Minimal Caption */
                <div className="fo-ai-conn-current__ambient-caption" aria-live="polite">
                  <div className="fo-ai-conn-current__ambient-indicator">
                    <span className="fo-ai-conn-current__pill-dot" aria-hidden="true" />
                    <span>{activeStep.kicker}</span>
                  </div>
                  <span className="fo-ai-conn-current__ambient-tagline">
                    {activeStep.metric} · {activeStep.shortLabel}
                  </span>
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

export default ConnectedCurrentSection;

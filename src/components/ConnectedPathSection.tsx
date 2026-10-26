import React, { memo, useState, useEffect } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIStageLottieIcon from "./AIStageLottieIcon";
import "./ai-advantage-path.css";

export interface ConnectedPathSectionProps {
  beforeSectionBg?: string; // Preceding section color (Section 04: #F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  className?: string;
}

export type BusinessOriginKey = "ops" | "finance" | "compliance" | "unified";

interface PathStageItem {
  key: BusinessOriginKey;
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

const pathStages: PathStageItem[] = [
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

export const ConnectedPathSection = memo(function ConnectedPathSection({
  beforeSectionBg = "#FFFFFF",
  afterSectionBg = "#F8FAFC",
  className = "",
}: ConnectedPathSectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isUnifiedView, setIsUnifiedView] = useState(false);

  const activeStage = pathStages[activeStepIndex] || pathStages[0];
  const activeKey: BusinessOriginKey = isUnifiedView ? "unified" : activeStage.key;

  const handleSelectStep = (idx: number) => {
    setActiveStepIndex(idx);
    setIsUnifiedView(false);
  };

  const handleSelectUnified = () => {
    setIsUnifiedView(true);
  };

  return (
    <section
      id="section-ai-advantage-connected-path"
      className={`new-home-section fo-ai-path-section ${className}`}
      aria-labelledby="fo-ai-path-heading"
    >
      {/* Top Transition: multi-layer wave divider matching preceding section background */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={18}
        durationSeconds={35}
      />

      <div className="fo-ai-path__container">
        {/* Balanced Two-Part Workspace (~52% Visual, ~48% Editorial) */}
        <div className="fo-ai-path__workspace">
          {/* LEFT: Connected Path Canvas (~52%) */}
          <div className="fo-ai-path__visual-col">
            <div className="fo-ai-path__canvas">
              {/* Subtle Coordinate Grid Pattern */}
              <div className="fo-ai-path__grid-pattern" aria-hidden="true" />

              {/* THREE BUSINESS ORIGINS (Left Edge) */}
              <div className="fo-ai-path__origins-col" role="group" aria-label="Business Origin Points">
                {pathStages.map((stage, idx) => {
                  const isActive = isUnifiedView || activeStepIndex === idx;
                  return (
                    <button
                      key={stage.key}
                      type="button"
                      className={`fo-ai-path__origin-card ${isActive ? "is-active" : ""}`}
                      onClick={() => handleSelectStep(idx)}
                      aria-pressed={isActive}
                      title={`Inspect ${stage.name} stage`}
                    >
                      <div className="fo-ai-path__origin-header">
                        <span
                          className="fo-ai-path__origin-dot"
                          style={{ backgroundColor: stage.dotColor }}
                          aria-hidden="true"
                        />
                        <span className="fo-ai-path__origin-name">{stage.name}</span>
                      </div>
                      <span className="fo-ai-path__origin-milestone">{stage.milestone}</span>
                      <span className="fo-ai-path__origin-sub">{stage.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* CONVERGING & BI-DIRECTIONAL SVG CONDUITS */}
              <svg
                className="fo-ai-path__conduits-svg"
                viewBox="0 0 600 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="fo-path-grad-ops" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#185FA5" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="fo-path-grad-fin" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="fo-path-grad-comp" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#534AB7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#185FA5" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="fo-path-grad-unified" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Luminous Glow Filters for Traveling Energy Beads */}
                  <filter id="fo-glow-ops" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#059669" floodOpacity="0.85" />
                  </filter>
                  <filter id="fo-glow-fin" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#185FA5" floodOpacity="0.85" />
                  </filter>
                  <filter id="fo-glow-comp" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#534AB7" floodOpacity="0.85" />
                  </filter>
                  <filter id="fo-glow-unified" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#05C7F2" floodOpacity="0.95" />
                  </filter>
                  <filter id="fo-glow-inquiry" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.95" />
                  </filter>
                </defs>

                {/* Left Background Conduit Guides (Converging to AI Hub at x: 267, y: 240) */}
                <path d="M 144 88 C 205 88, 225 235, 267 240" className="fo-ai-path__rail-bg" />
                <path d="M 144 240 L 267 240" className="fo-ai-path__rail-bg" />
                <path d="M 144 392 C 205 392, 225 245, 267 240" className="fo-ai-path__rail-bg" />

                {/* Left Active Rails */}
                <path
                  d="M 144 88 C 205 88, 225 235, 267 240"
                  stroke="url(#fo-path-grad-ops)"
                  strokeWidth={activeKey === "ops" || isUnifiedView ? "2.6" : "1.4"}
                  strokeOpacity={activeKey === "ops" || isUnifiedView ? 1 : 0.35}
                  className="fo-ai-path__rail-active"
                />
                <path
                  d="M 144 240 L 267 240"
                  stroke="url(#fo-path-grad-fin)"
                  strokeWidth={activeKey === "finance" || isUnifiedView ? "2.6" : "1.4"}
                  strokeOpacity={activeKey === "finance" || isUnifiedView ? 1 : 0.35}
                  className="fo-ai-path__rail-active"
                />
                <path
                  d="M 144 392 C 205 392, 225 245, 267 240"
                  stroke="url(#fo-path-grad-comp)"
                  strokeWidth={activeKey === "compliance" || isUnifiedView ? "2.6" : "1.4"}
                  strokeOpacity={activeKey === "compliance" || isUnifiedView ? 1 : 0.35}
                  className="fo-ai-path__rail-active"
                />

                {/* ----------------- DUAL-TRACK BI-DIRECTIONAL BRIDGE ----------------- */}
                {/* 1. Upper Inquiry Track (y: 233): Transaction -> flowOne AI */}
                <path
                  d="M 344 233 L 267 233"
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  strokeOpacity="0.75"
                />
                {/* Inquiry Micro-Beacon on Transaction Card edge (x: 344, y: 233) */}
                <circle cx="344" cy="233" r="3" fill="none" stroke="#F59E0B" strokeWidth="1.2">
                  <animate attributeName="r" values="3; 8" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9; 0" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="344" cy="233" r="3" fill="#F59E0B" />
                <text x="305" y="226" fill="#D97706" fontSize="7.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
                  INQUIRY ◂
                </text>

                {/* 2. Lower Verified Context Track (y: 247): flowOne AI -> Transaction */}
                <path
                  d="M 267 247 L 344 247"
                  stroke="url(#fo-path-grad-unified)"
                  strokeWidth="3.2"
                  className="fo-ai-path__rail-active"
                />
                {/* Absorption pin on Transaction Card edge (x: 344, y: 247) */}
                <circle cx="344" cy="247" r="3" fill="#05C7F2" />
                <text x="305" y="259" fill="#0284C7" fontSize="7.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
                  ▸ VERIFIED
                </text>

                {/* ----------------- TRAVELING ENERGY PULSE BEADS ----------------- */}
                {/* 1. Operations Stream -> AI Hub */}
                <circle r="4.5" fill="#059669" filter="url(#fo-glow-ops)">
                  <animateMotion
                    path="M 144 88 C 205 88, 225 235, 267 240"
                    dur="3.2s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                  <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.15; 0.88; 1" dur="3.2s" repeatCount="indefinite" />
                </circle>

                {/* 2. Finance Stream -> AI Hub */}
                <circle r="4.5" fill="#185FA5" filter="url(#fo-glow-fin)">
                  <animateMotion
                    path="M 144 240 L 267 240"
                    dur="2.8s"
                    begin="0.4s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                  <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.15; 0.88; 1" dur="2.8s" begin="0.4s" repeatCount="indefinite" />
                </circle>

                {/* 3. Compliance Stream -> AI Hub */}
                <circle r="4.5" fill="#534AB7" filter="url(#fo-glow-comp)">
                  <animateMotion
                    path="M 144 392 C 205 392, 225 245, 267 240"
                    dur="3.4s"
                    begin="0.8s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                  <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.15; 0.88; 1" dur="3.4s" begin="0.8s" repeatCount="indefinite" />
                </circle>

                {/* 4. Amber Inquiry Bead (Transaction Card -> flowOne AI Hub along Upper Track) */}
                <circle r="4.5" fill="#F59E0B" filter="url(#fo-glow-inquiry)">
                  <animateMotion
                    path="M 344 233 L 267 233"
                    dur="2.2s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 1; 1; 0.2; 0"
                    keyTimes="0; 0.15; 0.85; 0.95; 1"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 5. Electric Cyan Synthesis Bead (flowOne AI Hub -> Transaction Card along Lower Track) */}
                <circle r="5" fill="#05C7F2" filter="url(#fo-glow-unified)">
                  <animateMotion
                    path="M 267 247 L 344 247"
                    dur="1.5s"
                    begin="1.1s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 1; 1; 0"
                    keyTimes="0; 0.2; 0.85; 1"
                    dur="1.5s"
                    begin="1.1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* CONVERGENCE HUB & INTELLIGENCE POINT (Standout AI Cosmic Core at x: 267, y: 240) */}
              <div className="fo-ai-path__convergence-hub" aria-hidden="true">
                <div className="fo-ai-path__intel-point">
                  {/* Ambient Glow Aura */}
                  <span className="fo-ai-path__intel-glow-halo" />
                  {/* Rotating Tech Dashed Ring */}
                  <span className="fo-ai-path__intel-orbit" />
                  {/* Pulsing Beacon Ring */}
                  <span className="fo-ai-path__intel-beacon" />
                  
                  {/* Bi-Directional Resonance Wave Shockwave */}
                  <div className="fo-ai-path__bidirectional-wave" />

                  {/* Micro Floating AI Badge */}
                  <div className="fo-ai-path__intel-tag">
                    <span className="fo-ai-path__intel-tag-dot" />
                    <span>flowOne AI</span>
                  </div>

                  {/* Prominent High-Contrast AI Spark Symbol & Lottie Burst */}
                  <div className="fo-ai-path__intel-icon-shell">
                    <AIStageLottieIcon isActive={true} size={42} className="fo-ai-path__intel-lottie" />
                    <svg className="fo-ai-path__intel-spark-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path
                        d="M16 2 L18.8 12.2 L29 15 L18.8 17.8 L16 28 L13.2 17.8 L3 15 L13.2 12.2 Z"
                        fill="url(#fo-spark-glow-grad)"
                      />
                      <circle cx="16" cy="15" r="2.8" fill="#FFFFFF" opacity="0.95" />
                      <defs>
                        <linearGradient id="fo-spark-glow-grad" x1="3" y1="2" x2="29" y2="28" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#05C7F2" />
                          <stop offset="0.45" stopColor="#0528F2" />
                          <stop offset="0.85" stopColor="#D9299B" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* CONNECTED TRANSACTION DOCUMENT (Anchored on the Right, left edge at x: 344) */}
              <div
                className="fo-ai-path__transaction-card"
                role="region"
                aria-label="Connected Transaction Card with Live Telemetry"
              >
                <div className="fo-ai-path__txn-header">
                  <div className="fo-ai-path__txn-badge">
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#7C3AED",
                      }}
                      aria-hidden="true"
                    />
                    <span>BI-DIRECTIONAL SYNC</span>
                  </div>
                  <span className="fo-ai-path__txn-ref">INV-10482</span>
                </div>

                <span className="fo-ai-path__txn-client">Ananya Enterprises Pvt Ltd</span>
                <div className="fo-ai-path__txn-amount-row">
                  <span className="fo-ai-path__txn-amount">₹5,90,000</span>
                  <span className="fo-ai-path__txn-terms">Net 30 · Due in 12d</span>
                </div>

                {/* Tri-state Lineage Indicators */}
                <div className="fo-ai-path__lineage-list">
                  <div className="fo-ai-path__lineage-item">
                    <span style={{ color: "#059669" }}>
                      <span className="fo-ai-path__lineage-check">✓</span> Operations
                    </span>
                    <span>PO-8841 Matched</span>
                  </div>
                  <div className="fo-ai-path__lineage-item">
                    <span style={{ color: "#185FA5" }}>
                      <span className="fo-ai-path__lineage-check">✓</span> Finance
                    </span>
                    <span>Day +38 Cash Run</span>
                  </div>
                  <div className="fo-ai-path__lineage-item">
                    <span style={{ color: "#534AB7" }}>
                      <span className="fo-ai-path__lineage-check">✓</span> Compliance
                    </span>
                    <span>NIC IRN Verified</span>
                  </div>
                </div>

                {/* Real-Time Bi-Directional Query Console */}
                <div
                  className="fo-ai-path__implication-box"
                  style={{
                    background: "linear-gradient(135deg, rgba(245, 243, 255, 0.95) 0%, rgba(240, 249, 255, 0.85) 100%)",
                    borderColor: "rgba(221, 214, 254, 0.9)",
                  }}
                >
                  <div className="fo-ai-path__implication-header">
                    <span className="fo-ai-path__bidirectional-tag">
                      <span
                        className="fo-ai-path__implication-dot"
                        style={{ backgroundColor: "#7C3AED", boxShadow: "0 0 6px #7C3AED" }}
                      />
                      REAL-TIME QUERY
                    </span>
                    <span className="fo-ai-path__implication-conf">0ms Latency</span>
                  </div>
                  <p className="fo-ai-path__implication-text">
                    Zero variance detected across ERP, GSTN & Warehouse Gate records.
                  </p>
                  <div
                    className="fo-ai-path__implication-action"
                    style={{
                      color: "#6D28D9",
                      background: "rgba(124, 58, 237, 0.08)",
                      borderColor: "rgba(124, 58, 237, 0.2)",
                    }}
                  >
                    <span className="fo-ai-path__action-check">✓</span>
                    <span>Implications Analyzed: Capital & Audit Safe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Content (~48%) */}
          <div className="fo-ai-path__content-col">
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
            <h2 id="fo-ai-path-heading" className="fo-ai-path__headline">
              One connected view. <br className="hidden md:inline" />
              Better-informed decisions.
            </h2>

            {/* Description (Lorin) */}
            <p className="fo-ai-path__desc">
              flowOne AI brings related business context together, helping teams
              understand the wider implications of everyday transactions.
            </p>

            {/* Connected Path Stepper & Journey Horizons */}
            <div className="fo-ai-path__stepper-wrapper">
              <div className="fo-ai-path__stepper-header">
                <span className="fo-ai-path__stepper-caption">THE CONNECTED JOURNEY</span>
              </div>

              {/* Steps Track (Compact) */}
              <div
                className="fo-ai-path__steps-track"
                role="tablist"
                aria-label="Connected Business Stages"
              >
                {pathStages.map((stage, idx) => {
                  const isActive = !isUnifiedView && activeStepIndex === idx;
                  return (
                    <button
                      key={stage.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-path__step-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => handleSelectStep(idx)}
                    >
                      {isActive && <span className="fo-ai-path__step-dot" aria-hidden="true" />}
                      <span className="fo-ai-path__step-num">{stage.num}</span>
                      <span>{stage.shortLabel}</span>
                    </button>
                  );
                })}

                {/* Unified Complete View Button */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isUnifiedView}
                  className={`fo-ai-path__step-btn ${isUnifiedView ? "is-active" : ""}`}
                  onClick={handleSelectUnified}
                  title="View all connected functions converged into one path"
                >
                  {isUnifiedView && <span className="fo-ai-path__step-dot" aria-hidden="true" />}
                  <span>UNIFIED PATH</span>
                </button>
              </div>

              {/* Interactive Detail Card */}
              <div
                className="fo-ai-path__step-detail"
                role="tabpanel"
                aria-label={`${activeStage.shortLabel} Detail`}
              >
                <div className="fo-ai-path__detail-top">
                  <span className="fo-ai-path__detail-kicker">
                    {isUnifiedView ? "COMPLETE BUSINESS JOURNEY" : activeStage.kicker}
                  </span>
                  <span className="fo-ai-path__detail-metric">
                    {isUnifiedView ? "3 Functions In Sync" : activeStage.metric}
                  </span>
                </div>
                <h6 className="fo-ai-path__detail-title">
                  {isUnifiedView
                    ? "Three Business Functions, One Continuous Lineage"
                    : activeStage.title}
                </h6>
                <p className="fo-ai-path__detail-desc">
                  {isUnifiedView
                    ? "Instead of isolated silos operating in the dark, flowOne AI tracks the entire journey of INV-10482 across operations, finance, and compliance, ensuring every decision is made with the complete picture in view."
                    : activeStage.desc}
                </p>
              </div>
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

export default ConnectedPathSection;

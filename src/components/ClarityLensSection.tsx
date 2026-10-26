import React, { memo, useState, useEffect } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIStageLottieIcon from "./AIStageLottieIcon";
import "./ai-advantage-lens.css";

export interface ClarityLensSectionProps {
  beforeSectionBg?: string; // Preceding section color (Section 04: #F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  className?: string;
}

export type ClarityFocusAngle = "all" | "happened" | "context" | "focus";

interface ClarityFacetItem {
  key: ClarityFocusAngle;
  num: string;
  shortLabel: string;
  kicker: string;
  metric: string;
  title: string;
  desc: string;
}

const clarityFacets: ClarityFacetItem[] = [
  {
    key: "happened",
    num: "01",
    shortLabel: "WHAT HAPPENED",
    kicker: "01 · THE TRANSACTION",
    metric: "100% Tax Lineage",
    title: "The Isolated Record: Validated Terms & Amount",
    desc: "Ananya Enterprises INV-10482 (₹5,90,000) issued with Net 30 terms. Deterministic OCR extraction and IRN tax registry verification confirm baseline operational truth.",
  },
  {
    key: "context",
    num: "02",
    shortLabel: "WHAT MATTERS",
    kicker: "02 · OPERATIONAL CONTEXT",
    metric: "44d Historical Velocity",
    title: "The Contextual Story: Settlement Velocity & Goods Receipt",
    desc: "AI brings customer payment velocity (+14d drift) and confirmed PO-8841 goods receipt into focus, revealing that settlement will naturally arrive after the scheduled vendor cycle.",
  },
  {
    key: "focus",
    num: "03",
    shortLabel: "WHERE TO FOCUS",
    kicker: "03 · STRATEGIC HORIZON",
    metric: "Pre-Approved TReDS",
    title: "The Forward Decision: Working Capital Preservation",
    desc: "Rather than reacting to an overdue invoice next month, the clarity field surfaces proactive liquidity options—such as automated early discounting and cashflow scheduling.",
  },
];

export const ClarityLensSection = memo(function ClarityLensSection({
  beforeSectionBg = "#F8FAFC",
  afterSectionBg = "#FAFBFD",
  className = "",
}: ClarityLensSectionProps) {
  const [activeFacetIndex, setActiveFacetIndex] = useState(1); // Default to "02 WHAT MATTERS" (the contextual bridge)
  const [lensMode, setLensMode] = useState<"interactive" | "ambient">("interactive");
  const [isUnifiedView, setIsUnifiedView] = useState(false);

  // Auto-advance in ambient mode
  useEffect(() => {
    if (lensMode !== "ambient") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveFacetIndex((prev) => (prev + 1) % clarityFacets.length);
      setIsUnifiedView(false);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [lensMode]);

  const activeFacet = clarityFacets[activeFacetIndex] || clarityFacets[0];
  const activeFocus: ClarityFocusAngle = isUnifiedView ? "all" : activeFacet.key;

  const handleSelectFacet = (idx: number) => {
    setActiveFacetIndex(idx);
    setIsUnifiedView(false);
  };

  const handleSelectUnified = () => {
    setIsUnifiedView(true);
  };

  return (
    <section
      id="section-ai-advantage-clarity-lens"
      className={`new-home-section fo-ai-lens-section ${className}`}
      aria-labelledby="fo-ai-lens-heading"
    >
      {/* Top Transition: multi-layer wave divider matching preceding section background */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={18}
        durationSeconds={35}
      />

      <div className="fo-ai-lens__container">
        {/* Balanced Two-Part Workspace (~52% Visual, ~48% Editorial) */}
        <div className="fo-ai-lens__workspace">
          {/* LEFT: The Clarity Field Visual (~52%) */}
          <div className="fo-ai-lens__visual-col">
            <div className="fo-ai-lens__canvas">
              {/* Precision Optical Grid Pattern */}
              <div className="fo-ai-lens__grid-pattern" aria-hidden="true" />

              {/* Optical Aperture Reticle Marks */}
              <div className="fo-ai-lens__reticle-mark fo-ai-lens__reticle-tl" aria-hidden="true" />
              <div className="fo-ai-lens__reticle-mark fo-ai-lens__reticle-tr" aria-hidden="true" />
              <div className="fo-ai-lens__reticle-mark fo-ai-lens__reticle-bl" aria-hidden="true" />
              <div className="fo-ai-lens__reticle-mark fo-ai-lens__reticle-br" aria-hidden="true" />

              {/* The Clarity Lens Aperture Halo (Dynamically adjusts position & focus) */}
              <div
                className={`fo-ai-lens__aperture-halo is-focus-${activeFocus}`}
                aria-hidden="true"
              />

              {/* SVG Optical Connector Lines */}
              <svg
                className="fo-ai-lens__connectors-svg"
                viewBox="0 0 580 490"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="fo-lens-grad-velocity" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#534AB7" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="fo-lens-grad-fulfillment" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="fo-lens-grad-capital" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#534AB7" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Ray 1: Primary Invoice to Node 1 (Customer Velocity - Top Right) */}
                <path
                  d="M 370 210 C 430 190, 440 140, 460 95"
                  stroke="url(#fo-lens-grad-velocity)"
                  strokeWidth={activeFocus === "context" || activeFocus === "all" ? "2" : "1.2"}
                  strokeDasharray="4 3"
                  className="fo-ai-lens__connector-path"
                  strokeOpacity={activeFocus === "context" || activeFocus === "all" ? 1 : 0.45}
                />
                <circle cx="410" cy="165" r="3" fill="#534AB7" opacity="0.8" />

                {/* Ray 2: Primary Invoice to Node 2 (Fulfillment - Bottom Left) */}
                <path
                  d="M 210 270 C 150 290, 140 330, 115 375"
                  stroke="url(#fo-lens-grad-fulfillment)"
                  strokeWidth={activeFocus === "context" || activeFocus === "all" ? "2" : "1.2"}
                  strokeDasharray="4 3"
                  className="fo-ai-lens__connector-path"
                  strokeOpacity={activeFocus === "context" || activeFocus === "all" ? 1 : 0.45}
                />
                <circle cx="155" cy="325" r="3" fill="#059669" opacity="0.8" />

                {/* Ray 3: Primary Invoice to Node 3 (Working Capital - Bottom Right) */}
                <path
                  d="M 370 270 C 430 290, 440 330, 465 375"
                  stroke="url(#fo-lens-grad-capital)"
                  strokeWidth={activeFocus === "focus" || activeFocus === "all" ? "2" : "1.2"}
                  strokeDasharray="4 3"
                  className="fo-ai-lens__connector-path"
                  strokeOpacity={activeFocus === "focus" || activeFocus === "all" ? 1 : 0.45}
                />
                <circle cx="415" cy="325" r="3" fill="#185FA5" opacity="0.8" />
              </svg>

              {/* PRIMARY TRANSACTION (The Anchor in Focus) */}
              <div
                className={`fo-ai-lens__invoice-card ${
                  activeFocus === "happened" || activeFocus === "all" ? "is-active-focus" : ""
                }`}
                role="region"
                aria-label="Primary Financial Document"
              >
                <div className="fo-ai-lens__invoice-header">
                  <div className="fo-ai-lens__invoice-badge">
                    <span className="fo-ai-lens__invoice-badge-dot" aria-hidden="true" />
                    <span>TAX INVOICE</span>
                  </div>
                  <span className="fo-ai-lens__invoice-ref">INV-10482</span>
                </div>

                <div className="fo-ai-lens__invoice-body">
                  <span className="fo-ai-lens__invoice-client">Ananya Enterprises Pvt Ltd</span>
                  <div className="fo-ai-lens__invoice-amount-row">
                    <span className="fo-ai-lens__invoice-amount">₹5,90,000</span>
                    <span className="fo-ai-lens__invoice-terms">Due in 12d · Net 30</span>
                  </div>

                  <div className="fo-ai-lens__invoice-line-item">
                    <span className="fo-ai-lens__invoice-line-title">
                      Industrial Sensors (Batch 402)
                    </span>
                    <span className="fo-ai-lens__invoice-line-qty">1,200 pcs</span>
                  </div>
                </div>

                <div className="fo-ai-lens__invoice-footer">
                  <span className="fo-ai-lens__invoice-status-pill">
                    <span className="fo-ai-lens__invoice-status-pill-dot" aria-hidden="true" />
                    IRN Verified · NIC Cleared
                  </span>
                  <span>GSTN: 27AABCT3514Q1ZS</span>
                </div>
              </div>

              {/* SURROUNDING CONTEXT NODE 1: Top-Right (Customer Velocity) */}
              <div
                className={`fo-ai-lens__context-node fo-ai-lens__node--velocity ${
                  activeFocus === "context" || activeFocus === "all"
                    ? "is-focused"
                    : "is-muted"
                }`}
              >
                <span className="fo-ai-lens__node-tag">
                  <span style={{ color: "#534AB7" }}>●</span> 01 · PAYMENT VELOCITY
                </span>
                <h4 className="fo-ai-lens__node-title">Settlement Cadence</h4>
                <span className="fo-ai-lens__node-metric">44d Avg (+14d Drift)</span>
                <p className="fo-ai-lens__node-detail">
                  Consistent historical payer. Cashflow expected past contractual Net 30.
                </p>
                <div className="fo-ai-lens__drift-bar-shell" aria-hidden="true">
                  <div className="fo-ai-lens__drift-bar-fill" />
                </div>
              </div>

              {/* SURROUNDING CONTEXT NODE 2: Bottom-Left (3-Way Fulfillment) */}
              <div
                className={`fo-ai-lens__context-node fo-ai-lens__node--fulfillment ${
                  activeFocus === "context" || activeFocus === "all"
                    ? "is-focused"
                    : "is-muted"
                }`}
              >
                <span className="fo-ai-lens__node-tag">
                  <span style={{ color: "#059669" }}>●</span> 02 · 3-WAY RECONCILIATION
                </span>
                <h4 className="fo-ai-lens__node-title">Order Lineage</h4>
                <span className="fo-ai-lens__node-metric" style={{ color: "#059669" }}>
                  PO-8841 · 100% Match
                </span>
                <p className="fo-ai-lens__node-detail">
                  Goods receipt signed. E-Way bill 4910 validated with zero dispute risk.
                </p>
              </div>

              {/* SURROUNDING CONTEXT NODE 3: Bottom-Right (Working Capital Horizon) */}
              <div
                className={`fo-ai-lens__context-node fo-ai-lens__node--capital ${
                  activeFocus === "focus" || activeFocus === "all"
                    ? "is-focused"
                    : "is-muted"
                }`}
              >
                <span className="fo-ai-lens__node-tag">
                  <span style={{ color: "#185FA5" }}>●</span> 03 · CAPITAL IMPACT
                </span>
                <h4 className="fo-ai-lens__node-title">Liquidity Horizon</h4>
                <span className="fo-ai-lens__node-metric">Day +38 Vendor Run</span>
                <p className="fo-ai-lens__node-detail">
                  Pre-approved for TReDS dynamic discount to bridge vendor disbursement.
                </p>
              </div>
            </div>
          </div>

          {/* CENTER: The Animated Clarity Boundary Divider (The Asymmetric Meniscus) */}
          <div
            className="fo-ai-lens__divider-col"
            aria-hidden="true"
            title="The Clarity Lens organic boundary"
          >
            <div className="fo-ai-lens__vertical-divider-shell">
              <svg
                className="fo-ai-lens__vertical-svg"
                viewBox="0 0 72 520"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="fo-lens-stroke-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#185FA5" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#185FA5" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#534AB7" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Layer 1 (Back Layer: Soft Periwinkle #E5E8FA, Meniscus Curvature) */}
                <path
                  className="fo-ai-lens__layer-back"
                  d="M 28 0 C 38 110, 12 180, 54 260 C 18 340, 42 430, 30 520 L 0 520 L 0 0 Z"
                />

                {/* Layer 2 (Middle Layer: Mist Blue #DCEBFA, Offset Meniscus) */}
                <path
                  className="fo-ai-lens__layer-mid"
                  d="M 38 0 C 18 100, 56 170, 24 260 C 62 350, 16 430, 34 520 L 0 520 L 0 0 Z"
                />

                {/* Layer 3 (Front Layer: Cool White #F8FAFF Blend) */}
                <path
                  className="fo-ai-lens__layer-front"
                  d="M 20 0 C 42 90, 16 170, 48 260 C 14 350, 48 430, 24 520 L 0 520 L 0 0 Z"
                />

                {/* Center Meniscus Highlight Stroke */}
                <path
                  className="fo-ai-lens__layer-stroke"
                  d="M 20 0 C 42 90, 16 170, 48 260 C 14 350, 48 430, 24 520"
                />
              </svg>
            </div>
          </div>

          {/* MOBILE ONLY: Horizontal Organic Transition between Stacked Halves */}
          <div className="fo-ai-lens__horizontal-divider-shell" aria-hidden="true">
            <div className="fo-ai-lens__horizontal-track">
              <svg
                className="fo-ai-lens__horizontal-svg"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 0 C 350 42, 650 42, 1000 0 L 1000 60 L 0 60 Z"
                  fill="#F8FAFF"
                />
                <path
                  d="M 0 10 C 350 48, 650 48, 1000 10 L 1000 60 L 0 60 Z"
                  fill="#DCEBFA"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: Editorial Content (~48%) */}
          <div className="fo-ai-lens__content-col">
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
            <h2 id="fo-ai-lens-heading" className="fo-ai-lens__headline">
              See beyond the transaction.
            </h2>

            {/* Description (Lorin) */}
            <p className="fo-ai-lens__desc">
              Understand the relationships between what happened, what may follow, and
              where your team should focus.
            </p>

            {/* Selective Clarity Facets (Interactive & Ambient Stepper) */}
            <div className="fo-ai-lens__facets-wrapper">
              <div className="fo-ai-lens__facets-header">
                <span className="fo-ai-lens__facets-caption">SELECTIVE CLARITY HORIZONS</span>
                <div className="fo-ai-lens__mode-toggle" role="group" aria-label="Clarity Lens Mode">
                  <button
                    type="button"
                    className={`fo-ai-lens__mode-btn ${lensMode === "interactive" ? "is-active" : ""}`}
                    onClick={() => setLensMode("interactive")}
                    aria-pressed={lensMode === "interactive"}
                    title="Interactive Focus: Click to reveal specific context angles"
                  >
                    Interactive
                  </button>
                  <button
                    type="button"
                    className={`fo-ai-lens__mode-btn ${lensMode === "ambient" ? "is-active" : ""}`}
                    onClick={() => setLensMode("ambient")}
                    aria-pressed={lensMode === "ambient"}
                    title="Ambient Flow: Auto-advancing optical cycle"
                  >
                    Ambient Flow
                  </button>
                </div>
              </div>

              {/* Facets Selector Track */}
              <div
                className="fo-ai-lens__facets-track"
                role="tablist"
                aria-label="Clarity Focus Perspectives"
              >
                {clarityFacets.map((facet, idx) => {
                  const isActive = !isUnifiedView && activeFacetIndex === idx;
                  return (
                    <button
                      key={facet.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-lens__facet-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => handleSelectFacet(idx)}
                    >
                      {isActive && <span className="fo-ai-lens__facet-dot" aria-hidden="true" />}
                      <span className="fo-ai-lens__facet-num">{facet.num}</span>
                      <span>{facet.shortLabel}</span>
                    </button>
                  );
                })}

                {/* Unified All in Focus Button */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isUnifiedView}
                  className={`fo-ai-lens__facet-btn ${isUnifiedView ? "is-active" : ""}`}
                  onClick={handleSelectUnified}
                  title="View the complete unified clarity story"
                >
                  {isUnifiedView && <span className="fo-ai-lens__facet-dot" aria-hidden="true" />}
                  <span>ALL IN FOCUS</span>
                </button>
              </div>

              {/* Interactive Detail Card (When in interactive mode) */}
              {lensMode === "interactive" ? (
                <div
                  className="fo-ai-lens__facet-detail"
                  role="tabpanel"
                  aria-label={`${activeFacet.shortLabel} Detail`}
                >
                  <div className="fo-ai-lens__detail-top">
                    <span className="fo-ai-lens__detail-kicker">
                      {isUnifiedView ? "UNIFIED PERSPECTIVE" : activeFacet.kicker}
                    </span>
                    <span className="fo-ai-lens__detail-metric">
                      {isUnifiedView ? "3 Connected Signals" : activeFacet.metric}
                    </span>
                  </div>
                  <h4 className="fo-ai-lens__detail-title">
                    {isUnifiedView
                      ? "Complete Contextual Lineage in Sharp Focus"
                      : activeFacet.title}
                  </h4>
                  <p className="fo-ai-lens__detail-desc">
                    {isUnifiedView
                      ? "By revealing the primary invoice alongside customer settlement velocity, verified goods receipts, and working capital forecasts, flowOne enables teams to act proactively rather than reactively."
                      : activeFacet.desc}
                  </p>
                </div>
              ) : (
                /* Ambient Mode Minimal Caption */
                <div className="fo-ai-lens__ambient-caption" aria-live="polite">
                  <div className="fo-ai-lens__ambient-indicator">
                    <span className="fo-ai-lens__facet-dot" aria-hidden="true" />
                    <span>{activeFacet.kicker}</span>
                  </div>
                  <span className="fo-ai-lens__ambient-tagline">
                    {activeFacet.metric} · {activeFacet.shortLabel}
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

export default ClarityLensSection;

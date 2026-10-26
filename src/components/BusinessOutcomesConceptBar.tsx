import React, { memo } from "react";

/* ==========================================================================
   Section 07 — Business Outcomes Concept Selector Bar
   Design-Review Comparison Control:
   - 01 — The Outcome Gallery (Default)
   - 02 — One Business. Four Breakthroughs.
   - 03 — The Business Impact Map
   ========================================================================== */

export type BusinessOutcomesLayout = "01" | "02" | "03";

export interface BusinessOutcomesConceptBarProps {
  activeLayout: BusinessOutcomesLayout;
  onSelectLayout: (layout: BusinessOutcomesLayout) => void;
  className?: string;
}

export const BusinessOutcomesConceptBar = memo(function BusinessOutcomesConceptBar({
  activeLayout,
  onSelectLayout,
  className = "",
}: BusinessOutcomesConceptBarProps) {
  return (
    <aside
      className={`living-concept-comparison-bar section-07-outcomes-comparison-bar ${className}`}
      aria-label="Business Outcomes Layout Selector"
    >
      <div className="home-container">
        <div className="living-concept-selector-shell">
          <div className="living-concept-meta">
            <span className="living-concept-beacon" aria-hidden="true" />
            <span className="living-concept-tag">Business Outcomes · Compare Directions</span>
          </div>

          <div
            className="living-concept-buttons"
            role="tablist"
            aria-label="Choose Business Outcomes Direction"
          >
            {/* Direction 01 — The Outcome Gallery (Preserved Default) */}
            <button
              type="button"
              role="tab"
              id="fo-outcomes-tab-01"
              aria-controls="business-outcomes"
              aria-selected={activeLayout === "01"}
              className={`living-concept-btn ${activeLayout === "01" ? "is-active" : ""}`}
              onClick={() => onSelectLayout("01")}
            >
              <span>01 — The Outcome Gallery</span>
              <span className="concept-pill-badge">2×2 Gallery · Scroll-Aware</span>
            </button>

            {/* Direction 02 — One Business. Four Breakthroughs. */}
            <button
              type="button"
              role="tab"
              id="fo-outcomes-tab-02"
              aria-controls="business-outcomes"
              aria-selected={activeLayout === "02"}
              className={`living-concept-btn ${activeLayout === "02" ? "is-active" : ""}`}
              onClick={() => onSelectLayout("02")}
            >
              <span>02 — One Business. Four Breakthroughs.</span>
              <span className="concept-pill-badge">Connected Thread</span>
            </button>

            {/* Direction 03 — The Business Impact Map */}
            <button
              type="button"
              role="tab"
              id="fo-outcomes-tab-03"
              aria-controls="business-outcomes"
              aria-selected={activeLayout === "03"}
              className={`living-concept-btn ${activeLayout === "03" ? "is-active" : ""}`}
              onClick={() => onSelectLayout("03")}
            >
              <span>03 — The Business Impact Map</span>
              <span className="concept-pill-badge">Interactive Map</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
});

export default BusinessOutcomesConceptBar;

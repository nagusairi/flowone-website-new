import React, { memo } from "react";

export type AIAdvantageViewConcept =
  | "current"
  | "unfolds"
  | "moment"
  | "signal-clear"
  | "intelligence-current"
  | "clarity-lens"
  | "connected-path"
  | "connected-current"
  | string;

export interface AIAdvantageConceptBarProps {
  activeConcept: AIAdvantageViewConcept;
  onSelectConcept: (concept: AIAdvantageViewConcept) => void;
  className?: string;
}

export const AIAdvantageConceptBar = memo(function AIAdvantageConceptBar({
  activeConcept,
  onSelectConcept,
  className = "",
}: AIAdvantageConceptBarProps) {
  return (
    <aside
      className={`living-concept-comparison-bar section-05-ai-comparison-bar ${className}`}
      aria-label="AI Advantage Concept Selector"
    >
      <div className="home-container">
        <div className="living-concept-selector-shell">
          <div className="living-concept-meta">
            <span className="living-concept-beacon" aria-hidden="true" />
            <span className="living-concept-tag">AI Advantage · Compare Views</span>
          </div>

          <div
            className="living-concept-buttons"
            role="tablist"
            aria-label="Choose AI Advantage Concept"
          >
            {/* View 1: Current Design (Baseline) */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-current"
              aria-controls="section-ai-advantage"
              aria-selected={activeConcept === "current"}
              className={`living-concept-btn ${activeConcept === "current" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("current")}
            >
              <span>Current Design</span>
              <span className="concept-pill-badge">Baseline Stack</span>
            </button>

            {/* View 2: Direction A · The Intelligence Unfolds */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-unfolds"
              aria-controls="section-ai-advantage-unfolds"
              aria-selected={activeConcept === "unfolds"}
              className={`living-concept-btn ${activeConcept === "unfolds" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("unfolds")}
            >
              <span>Direction A: The Intelligence Unfolds</span>
              <span className="concept-pill-badge">Scroll-Driven</span>
            </button>

            {/* View 3: Direction B · The Moment of Intelligence */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-moment"
              aria-controls="section-ai-advantage-moment"
              aria-selected={activeConcept === "moment"}
              className={`living-concept-btn ${activeConcept === "moment" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("moment")}
            >
              <span>Direction B: The Moment of Intelligence</span>
              <span className="concept-pill-badge">3-State Narrative</span>
            </button>

            {/* View 4: Direction 01 · The Signal Becomes Clear */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-signal-clear"
              aria-controls="section-ai-advantage-signal-clear"
              aria-selected={activeConcept === "signal-clear"}
              className={`living-concept-btn ${activeConcept === "signal-clear" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("signal-clear")}
            >
              <span>Direction 01: The Signal Becomes Clear</span>
              <span className="concept-pill-badge">Convergence</span>
            </button>

            {/* View 5: 01 — The Intelligence Current */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-intelligence-current"
              aria-controls="section-ai-advantage-intelligence-current"
              aria-selected={activeConcept === "intelligence-current"}
              className={`living-concept-btn ${activeConcept === "intelligence-current" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("intelligence-current")}
            >
              <span>01 — The Intelligence Current</span>
              <span className="concept-pill-badge">Editorial Current</span>
            </button>

            {/* View 6: 02 — The Clarity Lens */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-clarity-lens"
              aria-controls="section-ai-advantage-clarity-lens"
              aria-selected={activeConcept === "clarity-lens"}
              className={`living-concept-btn ${activeConcept === "clarity-lens" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("clarity-lens")}
            >
              <span>02 — The Clarity Lens</span>
              <span className="concept-pill-badge">Focus Field</span>
            </button>

            {/* View 7: 03 — The Connected Path */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-connected-path"
              aria-controls="section-ai-advantage-connected-path"
              aria-selected={activeConcept === "connected-path"}
              className={`living-concept-btn ${activeConcept === "connected-path" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("connected-path")}
            >
              <span>03 — The Connected Path</span>
              <span className="concept-pill-badge">Connected Journey</span>
            </button>

            {/* View 8: 03B — The Connected Current */}
            <button
              type="button"
              role="tab"
              id="fo-ai-tab-connected-current"
              aria-controls="section-ai-advantage-connected-current"
              aria-selected={activeConcept === "connected-current"}
              className={`living-concept-btn ${activeConcept === "connected-current" ? "is-active" : ""}`}
              onClick={() => onSelectConcept("connected-current")}
            >
              <span>03B — The Connected Current</span>
              <span className="concept-pill-badge">Editorial Current</span>
            </button>

            {/* Ready for future views (e.g. Direction B, Direction C) */}
          </div>
        </div>
      </div>
    </aside>
  );
});

export default AIAdvantageConceptBar;

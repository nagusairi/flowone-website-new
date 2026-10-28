import { memo } from "react";
import { PriorityId } from "./BookDemoTypes";
import { getPriorityById } from "./priority-definitions";

interface DemoContextPanelProps {
  selectedPriorities: PriorityId[];
}

export const DemoContextPanel = memo(function DemoContextPanel({
  selectedPriorities,
}: DemoContextPanelProps) {
  const isSingle = selectedPriorities.length === 1;
  const singleDef = isSingle ? getPriorityById(selectedPriorities[0]) : null;

  const headline = singleDef
    ? singleDef.contextTitle
    : "A connected view.\nA clearer next step.";

  const description = singleDef
    ? singleDef.contextDesc
    : "Explore how finance and operations can work together around your business priorities.";

  return (
    <aside className="demo-aside" aria-label="Walkthrough Focus and Overview">
      {/* Actual Website Logo */}
      <div className="demo-logo-box">
        <img
          src="/assets/flowone-logo.svg"
          alt="flowOne"
          className="demo-actual-logo"
        />
      </div>

      <div className="demo-aside-eyebrow-wrap">
        <span className="demo-aside-eyebrow">
          <span className="demo-eyebrow-spark" aria-hidden="true">✦</span>
          <span>YOUR BUSINESS. YOUR DEMO.</span>
        </span>
      </div>

      <h2 id="demo-aside-title" className="demo-aside-title">
        {headline.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < headline.split("\n").length - 1 && <br />}
          </span>
        ))}
      </h2>

      <p id="demo-aside-copy" className="demo-aside-copy">
        {description}
      </p>

      <div className="demo-summary">
        <span className="demo-summary-label">YOUR WALKTHROUGH FOCUS</span>
        <div className="demo-chips" id="demo-chips" aria-live="polite">
          {selectedPriorities.length === 0 ? (
            <span className="demo-chip is-placeholder">
              <span className="demo-chip-dot" aria-hidden="true" />
              Let’s find your starting point
            </span>
          ) : (
            selectedPriorities.map((id) => {
              const def = getPriorityById(id);
              return def ? (
                <span className="demo-chip is-active" key={id}>
                  <span className="demo-chip-check" aria-hidden="true">✓</span>
                  {def.label}
                </span>
              ) : null;
            })
          )}
        </div>
      </div>

      <div className="demo-aside-bottom">
        <span className="demo-live-beacon" aria-hidden="true">
          <i />
        </span>
        <span>A conversation shaped around your business.</span>
      </div>
    </aside>
  );
});

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
      <div className="demo-wordmark" aria-label="flowOne">
        flow<span>O</span>ne
      </div>

      <span className="demo-aside-eyebrow">YOUR BUSINESS. YOUR DEMO.</span>

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
            <span className="demo-chip">Let’s find your starting point</span>
          ) : (
            selectedPriorities.map((id) => {
              const def = getPriorityById(id);
              return def ? (
                <span className="demo-chip" key={id}>
                  {def.label}
                </span>
              ) : null;
            })
          )}
        </div>
      </div>

      <div className="demo-aside-bottom">
        <i aria-hidden="true" />
        <span>A conversation shaped around your business.</span>
      </div>
    </aside>
  );
});

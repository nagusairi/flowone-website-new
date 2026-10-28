import { memo } from "react";
import { PriorityId } from "./BookDemoTypes";
import { PRIORITY_DEFINITIONS } from "./priority-definitions";

interface PrioritySelectorProps {
  selected: PriorityId[];
  onChange: (next: PriorityId[]) => void;
  error?: string;
  onErrorChange: (err: string) => void;
}

export const PrioritySelector = memo(function PrioritySelector({
  selected,
  onChange,
  error,
  onErrorChange,
}: PrioritySelectorProps) {
  const handleToggle = (id: PriorityId) => {
    onErrorChange("");

    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
      return;
    }

    if (id === "explore") {
      onChange(["explore"]);
      return;
    }

    const withoutExplore = selected.filter((x) => x !== "explore");
    if (withoutExplore.length >= 3) {
      onErrorChange(
        "Choose up to three priorities. Deselect one to add another."
      );
      return;
    }

    onChange([...withoutExplore, id]);
  };

  return (
    <section className="demo-stage" data-stage="0" aria-labelledby="demo-title">
      <h2 id="demo-title" className="demo-heading" tabIndex={-1}>
        Where should we focus?
      </h2>
      <p className="demo-subtitle" id="demo-subtitle">
        Choose up to three priorities.
      </p>

      <div
        className="demo-options"
        role="group"
        aria-label="Business Priorities"
      >
        {PRIORITY_DEFINITIONS.map((opt) => {
          const isPressed = selected.includes(opt.id);
          const customClass = `demo-option ${
            opt.fullWidth ? "is-fullwidth" : ""
          } ${opt.dashed ? "is-dashed" : ""} ${isPressed ? "is-selected" : ""}`;

          return (
            <button
              key={opt.id}
              type="button"
              className={customClass}
              data-value={opt.id}
              aria-pressed={isPressed}
              onClick={() => handleToggle(opt.id)}
            >
              <svg
                className="option-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={opt.svgPath} />
              </svg>
              <span className="option-text">
                <strong>{opt.label}</strong>
              </span>
              <i className="demo-check" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="demo-selection-note">
        <span>A tailored walkthrough starts here.</span>
        <span id="demo-selected-count" aria-live="polite">
          {selected.length} / 3 selected
        </span>
      </div>

      {error && (
        <p className="demo-error" id="demo-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
});

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
        Choose up to three priorities to personalize your walkthrough.
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
              <div className="option-icon-box" aria-hidden="true">
                <svg
                  className="option-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={opt.svgPath} />
                </svg>
              </div>

              <div className="option-text">
                <strong className="option-label">{opt.label}</strong>
              </div>

              <div className="demo-check" aria-hidden="true">
                <svg
                  className="demo-check-svg"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M1 4L3.8 7L9 1"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      <div className="demo-selection-note">
        <span className="demo-note-left">A tailored walkthrough starts here.</span>
        <span id="demo-selected-count" aria-live="polite">
          <strong className="count-num">{selected.length}</strong> / 3 selected
        </span>
      </div>

      {error && (
        <div className="demo-error-box" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="demo-error" id="demo-error">
            {error}
          </p>
        </div>
      )}
    </section>
  );
});

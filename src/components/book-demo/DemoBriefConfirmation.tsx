import { memo } from "react";
import { DemoFormData } from "./BookDemoTypes";
import { getPriorityById } from "./priority-definitions";

interface DemoBriefConfirmationProps {
  data: DemoFormData;
  onClose: () => void;
  onEdit: () => void;
}

export const DemoBriefConfirmation = memo(function DemoBriefConfirmation({
  data,
  onClose,
  onEdit,
}: DemoBriefConfirmationProps) {
  const firstName = data.name.trim().split(" ")[0] || "there";

  const priorityLabels = data.priorities
    .map((id) => getPriorityById(id)?.label)
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      className="demo-success"
      id="demo-success"
      aria-labelledby="demo-success-title"
    >
      <div className="demo-success-icon" aria-hidden="true">
        ✓
      </div>

      <span className="demo-aside-eyebrow">YOUR DEMO BRIEF IS READY</span>

      <h2 id="demo-success-title" className="demo-success-title" tabIndex={-1}>
        A good conversation
        <br />
        starts with context.
      </h2>

      <p id="demo-success-copy" className="demo-success-copy">
        Thanks, {firstName}. Here’s the focus for your flowOne walkthrough.
      </p>

      <div className="demo-confirmation">
        <small className="demo-confirmation-label">YOUR WALKTHROUGH</small>
        <p className="demo-confirmation-summary">
          <strong>{data.company}</strong> · {data.role}
          <br />
          <span className="demo-confirmation-priorities">
            {priorityLabels || "General overview"}
          </span>
          <br />
          <span className="demo-confirmation-email">{data.email}</span>
        </p>
      </div>

      <p className="demo-preview-label">
        Preview complete. This prototype has not sent your details or booked a
        meeting.
      </p>

      <div className="demo-success-actions">
        <button
          type="button"
          className="demo-next demo-done-btn"
          id="demo-done"
          onClick={onClose}
        >
          <span>Back to the page</span>
          <span className="demo-btn-arrow" aria-hidden="true">↗</span>
        </button>

        <button
          type="button"
          className="demo-edit"
          id="demo-edit"
          onClick={onEdit}
        >
          Edit my details
        </button>
      </div>
    </section>
  );
});

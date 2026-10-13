import React, { memo } from "react";
import "./business-outcomes.css";

/* ==========================================================================
   Section 07 — Business Outcomes
   Concept B: Three Outcomes (Visibility · Control · Confidence)
   Clean, minimal, typography-led layout
   ========================================================================== */

interface OutcomeItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const outcomesData: OutcomeItem[] = [
  {
    id: "visibility",
    title: "Visibility",
    description: "Understand what's happening across your business.",
    icon: (
      <svg
        className="fo-business-outcomes__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "control",
    title: "Control",
    description: "Keep workflows, commitments and exceptions in view.",
    icon: (
      <svg
        className="fo-business-outcomes__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="4" x2="20" y1="21" y2="21" />
        <line x1="4" x2="20" y1="14" y2="14" />
        <line x1="4" x2="20" y1="7" y2="7" />
        <circle cx="9" cy="7" r="2" />
        <circle cx="15" cy="14" r="2" />
        <circle cx="7" cy="21" r="2" />
      </svg>
    ),
  },
  {
    id: "confidence",
    title: "Confidence",
    description: "Make decisions with connected business context.",
    icon: (
      <svg
        className="fo-business-outcomes__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
];

export const BusinessOutcomesSection = memo(function BusinessOutcomesSection() {
  return (
    <section
      id="business-outcomes"
      className="fo-business-outcomes"
      aria-label="Section: Business Outcomes"
    >
      <div className="fo-business-outcomes__container">
        {/* ==================================================================
            1. EDITORIAL INTRO (§4)
            ================================================================== */}
        <header className="fo-business-outcomes__intro">
          <div
            className="fo-business-outcomes__eyebrow"
            role="note"
            aria-label="Business Outcomes"
          >
            <span className="fo-business-outcomes__beacon" aria-hidden="true" />
            <span className="fo-business-outcomes__eyebrow-text">
              BUSINESS OUTCOMES
            </span>
          </div>
          <h2 className="fo-business-outcomes__heading">
            Better visibility. Stronger control. Clearer decisions.
          </h2>
          <p className="fo-business-outcomes__copy">
            When your financial operations connect, the bigger picture becomes easier to understand.
          </p>
        </header>

        {/* ==================================================================
            2. THREE OUTCOME COLUMNS (§3, §6)
            ================================================================== */}
        <div
          className="fo-business-outcomes__grid"
          role="region"
          aria-label="Core Business Outcomes"
        >
          {outcomesData.map(outcome => (
            <article key={outcome.id} className="fo-business-outcomes__item">
              <div className="fo-business-outcomes__icon-wrapper">
                {outcome.icon}
              </div>
              <h3 className="fo-business-outcomes__title">{outcome.title}</h3>
              <p className="fo-business-outcomes__desc">{outcome.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default BusinessOutcomesSection;

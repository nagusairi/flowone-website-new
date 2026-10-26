import React, { memo, useEffect, useRef } from "react";
import "./business-outcomes-gallery.css";

/* ==========================================================================
   Section 07 — Business Outcomes
   Direction 01 — The Outcome Gallery
   Motion: Subtle entrance sequence, static internal visuals
   ========================================================================== */

export const BusinessOutcomesGallery = memo(function BusinessOutcomesGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect user's motion preferences immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-entered");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-entered");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="business-outcomes"
      ref={sectionRef}
      className="fo-outcome-gallery-section"
      aria-labelledby="fo-outcome-gallery-heading"
    >
      <div className="fo-outcome-gallery__container">
        {/* ==================================================================
            1. EDITORIAL SECTION INTRODUCTION
            ================================================================== */}
        <header className="fo-outcome-gallery__intro">
          <div className="hero-eyebrow-container" style={{ marginBottom: "0.25rem" }}>
            <div className="hero-modern-eyebrow is-static" role="note" aria-label="Business Outcomes">
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>OUTCOMES</span>
              </span>
              <span className="hero-eyebrow-title">BUSINESS OUTCOMES</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <h2 id="fo-outcome-gallery-heading" className="fo-outcome-gallery__heading">
            Less friction. More business momentum.
          </h2>

          <p className="fo-outcome-gallery__copy">
            See the difference when your business works as one.
          </p>
        </header>

        {/* ==================================================================
            2. TWO-BY-TWO GALLERY GRID
            ================================================================== */}
        <div
          className="fo-outcome-gallery__grid"
          role="region"
          aria-label="Core Business Outcomes Gallery"
        >
          {/* ================================================================
              CARD 01: CASHFLOW CLARITY
              Visual: Receivables becoming easier to distinguish (3 tracks)
              Follow-up marker receives one restrained blue emphasis
              ================================================================ */}
          <article className="fo-outcome-card" aria-labelledby="fo-card-title-01">
            <div className="fo-outcome-card__header">
              <h3 id="fo-card-title-01" className="fo-outcome-card__title">
                Cashflow clarity
              </h3>
              <p className="fo-outcome-card__description">
                Understand what is due, what is delayed and what needs attention.
              </p>
            </div>

            <div
              className="fo-outcome-card__visual fo-outcome-card__visual--cashflow"
              role="img"
              aria-label="Visual track illustrating Due, Overdue, and prioritized Follow-up receivables"
            >
              <div className="fo-cashflow-tracks">
                {/* Track 1: Due */}
                <div className="fo-cashflow-track">
                  <span className="fo-cashflow-label">Due</span>
                  <div className="fo-cashflow-lane">
                    <span className="fo-cashflow-marker fo-cashflow-marker--due" aria-hidden="true" />
                  </div>
                  <span className="fo-cashflow-status">Scheduled</span>
                </div>

                {/* Track 2: Overdue */}
                <div className="fo-cashflow-track">
                  <span className="fo-cashflow-label">Overdue</span>
                  <div className="fo-cashflow-lane">
                    <span className="fo-cashflow-marker fo-cashflow-marker--overdue" aria-hidden="true" />
                  </div>
                  <span className="fo-cashflow-status">In Review</span>
                </div>

                {/* Track 3: Follow-up (One restrained blue emphasis) */}
                <div className="fo-cashflow-track fo-cashflow-track--followup">
                  <span className="fo-cashflow-label">Follow-up</span>
                  <div className="fo-cashflow-lane">
                    <span className="fo-cashflow-marker fo-cashflow-marker--followup" aria-hidden="true" />
                  </div>
                  <span className="fo-cashflow-status">Active Focus</span>
                </div>
              </div>
            </div>
          </article>

          {/* ================================================================
              CARD 02: CONNECTED OPERATIONS
              Visual: A transaction moving through clear handoffs (Order → Invoice → Collection)
              Cool white with pale periwinkle accents
              ================================================================ */}
          <article className="fo-outcome-card" aria-labelledby="fo-card-title-02">
            <div className="fo-outcome-card__header">
              <h3 id="fo-card-title-02" className="fo-outcome-card__title">
                Connected operations
              </h3>
              <p className="fo-outcome-card__description">
                Keep transactions moving with clearer handoffs across teams.
              </p>
            </div>

            <div
              className="fo-outcome-card__visual fo-outcome-card__visual--operations"
              role="img"
              aria-label="Milestone journey illustrating Order, Invoice, and Collection handoffs"
            >
              <div className="fo-journey-flow">
                {/* Milestone 1: Order */}
                <div className="fo-journey-node">
                  <div className="fo-journey-capsule">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <span className="fo-journey-title">Order</span>
                  <span className="fo-journey-sub">Captured</span>
                </div>

                {/* Connector 1 */}
                <div className="fo-journey-connector" aria-hidden="true">
                  <div className="fo-journey-connector-arrow">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Milestone 2: Invoice */}
                <div className="fo-journey-node is-active">
                  <div className="fo-journey-capsule">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h12M6 16h8" />
                    </svg>
                  </div>
                  <span className="fo-journey-title">Invoice</span>
                  <span className="fo-journey-sub">Fulfilled</span>
                </div>

                {/* Connector 2 */}
                <div className="fo-journey-connector" aria-hidden="true">
                  <div className="fo-journey-connector-arrow">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Milestone 3: Collection */}
                <div className="fo-journey-node">
                  <div className="fo-journey-capsule">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <span className="fo-journey-title">Collection</span>
                  <span className="fo-journey-sub">Realized</span>
                </div>
              </div>
            </div>
          </article>

          {/* ================================================================
              CARD 03: CONTROL & COMPLIANCE
              Visual: Supporting information connected to its transaction
              Document outline with 2 connected references: Supporting document, Exception record
              ================================================================ */}
          <article className="fo-outcome-card" aria-labelledby="fo-card-title-03">
            <div className="fo-outcome-card__header">
              <h3 id="fo-card-title-03" className="fo-outcome-card__title">
                Control & compliance
              </h3>
              <p className="fo-outcome-card__description">
                Keep financial records, supporting documents and exceptions easier to trace.
              </p>
            </div>

            <div
              className="fo-outcome-card__visual fo-outcome-card__visual--compliance"
              role="img"
              aria-label="Diagram showing a primary transaction connected to its supporting document and exception record"
            >
              <div className="fo-compliance-schema">
                {/* Minimal Document Outline */}
                <div className="fo-compliance-doc">
                  <div className="fo-compliance-doc-top">
                    <span className="fo-compliance-doc-tag">RECORD</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="fo-compliance-doc-line" />
                  <div className="fo-compliance-doc-line fo-compliance-doc-line--med" />
                  <div className="fo-compliance-doc-line fo-compliance-doc-line--short" />
                  <div className="fo-compliance-doc-line fo-compliance-doc-line--accent" />
                </div>

                {/* Fine Branch Connectors */}
                <div className="fo-compliance-branches" aria-hidden="true">
                  <svg width="48" height="76" viewBox="0 0 48 76" fill="none">
                    <path
                      d="M2 38 H20 C32 38, 34 18, 46 18"
                      stroke="#185FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 38 H20 C32 38, 34 58, 46 58"
                      stroke="#185FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="2" cy="38" r="2.5" fill="#185FA5" />
                    <circle cx="46" cy="18" r="2" fill="#185FA5" />
                    <circle cx="46" cy="58" r="2" fill="#185FA5" />
                  </svg>
                </div>

                {/* Two Connected References */}
                <div className="fo-compliance-links">
                  <div className="fo-compliance-link-chip">
                    <span className="fo-compliance-link-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </span>
                    <span className="fo-compliance-link-text">Supporting document</span>
                  </div>

                  <div className="fo-compliance-link-chip">
                    <span className="fo-compliance-link-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </span>
                    <span className="fo-compliance-link-text">Exception record</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ================================================================
              CARD 04: BETTER DECISIONS
              Visual: Two types of context informing one point of focus
              Inputs: Financial signals, Operational context → Decision context
              ================================================================ */}
          <article className="fo-outcome-card" aria-labelledby="fo-card-title-04">
            <div className="fo-outcome-card__header">
              <h3 id="fo-card-title-04" className="fo-outcome-card__title">
                Better decisions
              </h3>
              <p className="fo-outcome-card__description">
                Bring financial signals and operational context into the same view.
              </p>
            </div>

            <div
              className="fo-outcome-card__visual fo-outcome-card__visual--decisions"
              role="img"
              aria-label="Diagram showing financial signals and operational context converging into a single decision context"
            >
              <div className="fo-decisions-schema">
                {/* Inputs: Financial signals & Operational context */}
                <div className="fo-decisions-inputs">
                  <div className="fo-decisions-input-chip fo-decisions-input-chip--financial">
                    <span className="fo-decisions-chip-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </span>
                    <span className="fo-decisions-chip-label">Financial signals</span>
                  </div>

                  <div className="fo-decisions-input-chip fo-decisions-input-chip--operational">
                    <span className="fo-decisions-chip-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </span>
                    <span className="fo-decisions-chip-label">Operational context</span>
                  </div>
                </div>

                {/* Converging Conduits */}
                <div className="fo-decisions-conduits" aria-hidden="true">
                  <svg width="44" height="76" viewBox="0 0 44 76" fill="none">
                    <path
                      d="M2 18 C18 18, 22 38, 42 38"
                      stroke="#185FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 58 C18 58, 22 38, 42 38"
                      stroke="#534AB7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="2" cy="18" r="2.5" fill="#185FA5" />
                    <circle cx="2" cy="58" r="2.5" fill="#534AB7" />
                  </svg>
                </div>

                {/* Modest Focal Point: Decision context */}
                <div className="fo-decisions-focal">
                  <span className="fo-decisions-focal-dot" aria-hidden="true" />
                  <span className="fo-decisions-focal-label">Decision context</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
});

export default BusinessOutcomesGallery;

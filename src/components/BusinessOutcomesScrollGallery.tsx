import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import "./business-outcomes-scroll-gallery.css";

/* ==========================================================================
   Section 07 — Business Outcomes
   01 — The Outcome Gallery (Refined, Interactive & Scroll-Aware)
   Exclusively implemented for the flowOne Final Page (Zero comparison selector)
   ========================================================================== */

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export const BusinessOutcomesScrollGallery = memo(function BusinessOutcomesScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Individual card progress (0 to 1)
  const [progresses, setProgresses] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [replaying, setReplaying] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const replayingRef = useRef<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const rafIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef(false);

  // Replay animation for a specific card
  const handleReplay = useCallback((cardIndex: number) => {
    if (isReducedMotionRef.current) return;
    if (replayingRef.current[cardIndex]) return;

    replayingRef.current[cardIndex] = true;
    setReplaying((prev) => {
      const next = [...prev] as [boolean, boolean, boolean, boolean];
      next[cardIndex] = true;
      return next;
    });

    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds smooth progression

    const stepReplay = (now: number) => {
      const elapsed = now - startTime;
      const t = clamp(elapsed / duration, 0, 1);
      const eased = easeOutCubic(t);

      setProgresses((prev) => {
        const next = [...prev] as [number, number, number, number];
        next[cardIndex] = eased;
        return next;
      });

      if (t < 1) {
        requestAnimationFrame(stepReplay);
      } else {
        replayingRef.current[cardIndex] = false;
        setReplaying((prev) => {
          const next = [...prev] as [boolean, boolean, boolean, boolean];
          next[cardIndex] = false;
          return next;
        });
      }
    };

    requestAnimationFrame(stepReplay);
  }, []);

  // IntersectionObserver for entrance reveal + Scroll progression calculation
  useEffect(() => {
    const secEl = sectionRef.current;
    if (!secEl) return;

    // Check user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      isReducedMotionRef.current = true;
      secEl.classList.add("is-entered");
      setProgresses([1, 1, 1, 1]);
      return;
    }

    let isSectionInView = false;

    // Reveal entrance when section enters view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            secEl.classList.add("is-entered");
            isSectionInView = true;
          } else {
            isSectionInView = false;
          }
        });
      },
      { threshold: 0.05, rootMargin: "100px 0px" }
    );

    observer.observe(secEl);

    // Natural document scroll calculation
    const handleScroll = () => {
      if (!isSectionInView && !secEl.classList.contains("is-entered")) return;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const isDesktop = window.innerWidth > 820;

        // Calculate progress for each card/row
        const updatedProgresses: [number, number, number, number] = [...progresses];

        if (isDesktop) {
          // Row 1: Cards 0 & 1 coordinated
          if (!replayingRef.current[0] || !replayingRef.current[1]) {
            const card0 = cardRefs.current[0];
            if (card0) {
              const rect = card0.getBoundingClientRect();
              // Begins entering lower portion (0.92), reaches complete around middle (0.48)
              const startY = windowHeight * 0.92;
              const endY = windowHeight * 0.48;
              const p = clamp((startY - rect.top) / (startY - endY), 0, 1);
              if (!replayingRef.current[0]) updatedProgresses[0] = p;
              if (!replayingRef.current[1]) updatedProgresses[1] = p;
            }
          }

          // Row 2: Cards 2 & 3 coordinated
          if (!replayingRef.current[2] || !replayingRef.current[3]) {
            const card2 = cardRefs.current[2];
            if (card2) {
              const rect = card2.getBoundingClientRect();
              const startY = windowHeight * 0.92;
              const endY = windowHeight * 0.48;
              const p = clamp((startY - rect.top) / (startY - endY), 0, 1);
              if (!replayingRef.current[2]) updatedProgresses[2] = p;
              if (!replayingRef.current[3]) updatedProgresses[3] = p;
            }
          }
        } else {
          // Mobile: each stacked card has its own progress range
          cardRefs.current.forEach((card, idx) => {
            if (!card || replayingRef.current[idx]) return;
            const rect = card.getBoundingClientRect();
            const startY = windowHeight * 0.90;
            const endY = windowHeight * 0.45;
            updatedProgresses[idx] = clamp((startY - rect.top) / (startY - endY), 0, 1);
          });
        }

        setProgresses(updatedProgresses);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial pass in case section is already in viewport
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const [p1, p2, p3, p4] = progresses;

  return (
    <section
      id="business-outcomes"
      ref={sectionRef}
      className="fo-scroll-gallery-section"
      aria-labelledby="fo-scroll-gallery-heading"
    >
      <div className="fo-scroll-gallery__container">
        {/* ==================================================================
            1. EDITORIAL SECTION INTRODUCTION
            ================================================================== */}
        <header className="fo-scroll-gallery__intro">
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

          <h2 id="fo-scroll-gallery-heading" className="fo-scroll-gallery__heading">
            Less friction. More business momentum.
          </h2>

          <p className="fo-scroll-gallery__copy">
            See the difference when your business works as one.
          </p>
        </header>

        {/* ==================================================================
            2. TWO-BY-TWO GALLERY GRID
            ================================================================== */}
        <div
          className="fo-scroll-gallery__grid"
          role="region"
          aria-label="Core Business Outcomes Gallery"
        >
          {/* ================================================================
              CARD 01: CASHFLOW CLARITY
              Scroll-linked horizontal tracks: Due, Overdue, Follow-up
              Follow-up marker receives one restrained blue emphasis
              ================================================================ */}
          <article
            ref={(el) => { cardRefs.current[0] = el; }}
            className="fo-scroll-outcome-card"
            aria-labelledby="fo-card-title-01"
          >
            <div className="fo-scroll-outcome-card__header">
              <div className="fo-scroll-outcome-card__top">
                <h3 id="fo-card-title-01" className="fo-scroll-outcome-card__title">
                  Cashflow clarity
                </h3>
                <button
                  type="button"
                  className={`fo-outcome-replay-btn ${replaying[0] ? "is-replaying" : ""}`}
                  onClick={() => handleReplay(0)}
                  aria-label="Replay Cashflow clarity visual"
                  title="Replay visual animation"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 8a6 6 0 1 1 1.76 4.24M2 13V8h5" />
                  </svg>
                  <span>Replay visual</span>
                </button>
              </div>

              <p className="fo-scroll-outcome-card__description">
                Understand what is due, what is delayed and what needs attention.
              </p>
            </div>

            <div
              className="fo-scroll-outcome-card__visual fo-scroll-outcome-card__visual--cashflow"
              role="img"
              aria-label="Interactive track illustrating Due, Overdue, and prioritized Follow-up receivables"
            >
              <div className="fo-scroll-cashflow-tracks">
                {/* Track 1: Due */}
                <div className="fo-scroll-cashflow-track">
                  <span className="fo-scroll-cashflow-label">Due</span>
                  <div className="fo-scroll-cashflow-lane-track">
                    <div
                      className="fo-scroll-cashflow-lane-fill"
                      style={{ width: `${Math.round(clamp(p1 * 1.2, 0, 1) * 100)}%` }}
                    />
                    <span
                      className="fo-scroll-cashflow-marker"
                      style={{
                        left: `${Math.round(clamp(p1 * 38, 0, 38))}%`,
                        opacity: clamp(p1 * 2, 0.4, 1),
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="fo-scroll-cashflow-status">Scheduled</span>
                </div>

                {/* Track 2: Overdue */}
                <div className="fo-scroll-cashflow-track">
                  <span className="fo-scroll-cashflow-label">Overdue</span>
                  <div className="fo-scroll-cashflow-lane-track">
                    <div
                      className="fo-scroll-cashflow-lane-fill"
                      style={{ width: `${Math.round(clamp((p1 - 0.15) * 1.3, 0, 1) * 100)}%` }}
                    />
                    <span
                      className="fo-scroll-cashflow-marker fo-scroll-cashflow-marker--overdue"
                      style={{
                        left: `${Math.round(clamp((p1 - 0.15) * 75, 0, 64))}%`,
                        opacity: clamp((p1 - 0.15) * 2, 0.3, 1),
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="fo-scroll-cashflow-status">In Review</span>
                </div>

                {/* Track 3: Follow-up (Restrained Blue Emphasis) */}
                <div className="fo-scroll-cashflow-track fo-scroll-cashflow-track--followup">
                  <span
                    className={`fo-scroll-cashflow-label ${p1 >= 0.85 ? "is-highlighted" : ""}`}
                  >
                    Follow-up
                  </span>
                  <div className="fo-scroll-cashflow-lane-track">
                    <div
                      className="fo-scroll-cashflow-lane-fill"
                      style={{ width: `${Math.round(clamp((p1 - 0.3) * 1.45, 0, 1) * 100)}%` }}
                    />
                    <span
                      className={`fo-scroll-cashflow-marker fo-scroll-cashflow-marker--followup ${p1 >= 0.85 ? "is-emphasized" : ""}`}
                      style={{
                        left: `${Math.round(clamp((p1 - 0.3) * 117, 0, 82))}%`,
                        opacity: clamp((p1 - 0.3) * 2, 0.2, 1),
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`fo-scroll-cashflow-status ${p1 >= 0.85 ? "is-emphasized" : ""}`}
                  >
                    Active Focus
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* ================================================================
              CARD 02: CONNECTED OPERATIONS
              Scroll-linked milestone reveal: Order → Invoice → Collection
              ================================================================ */}
          <article
            ref={(el) => { cardRefs.current[1] = el; }}
            className="fo-scroll-outcome-card"
            aria-labelledby="fo-card-title-02"
          >
            <div className="fo-scroll-outcome-card__header">
              <div className="fo-scroll-outcome-card__top">
                <h3 id="fo-card-title-02" className="fo-scroll-outcome-card__title">
                  Connected operations
                </h3>
                <button
                  type="button"
                  className={`fo-outcome-replay-btn ${replaying[1] ? "is-replaying" : ""}`}
                  onClick={() => handleReplay(1)}
                  aria-label="Replay Connected operations visual"
                  title="Replay visual animation"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 8a6 6 0 1 1 1.76 4.24M2 13V8h5" />
                  </svg>
                  <span>Replay visual</span>
                </button>
              </div>

              <p className="fo-scroll-outcome-card__description">
                Keep transactions moving with clearer handoffs across teams.
              </p>
            </div>

            <div
              className="fo-scroll-outcome-card__visual fo-scroll-outcome-card__visual--operations"
              role="img"
              aria-label="Milestone journey illustrating Order, Invoice, and Collection handoffs connected progressively"
            >
              <div className="fo-scroll-journey-wrap">
                {/* SVG Connecting Track with Dashoffset Reveal */}
                <svg
                  className="fo-scroll-journey-svg"
                  viewBox="0 0 340 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Background Track Guide */}
                  <line x1="20" y1="6" x2="320" y2="6" stroke="#E5E8FA" strokeWidth="2" strokeDasharray="3 3" />
                  {/* Active Animated Connector Path (Total length 300) */}
                  <line
                    x1="20"
                    y1="6"
                    x2="320"
                    y2="6"
                    stroke="#534AB7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="300"
                    strokeDashoffset={300 * (1 - clamp(p2, 0, 1))}
                  />
                  {/* Traveling Marker Node */}
                  {p2 > 0.05 && (
                    <circle
                      cx={20 + 300 * clamp(p2, 0, 1)}
                      cy="6"
                      r="3.5"
                      fill="#534AB7"
                    />
                  )}
                </svg>

                <div className="fo-scroll-journey-flow">
                  {/* Milestone 1: Order */}
                  <div className={`fo-scroll-journey-node ${p2 >= 0.15 ? "is-reached is-active" : ""}`}>
                    <div className="fo-scroll-journey-capsule">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <span className="fo-scroll-journey-title">Order</span>
                    <span className="fo-scroll-journey-sub">Captured</span>
                  </div>

                  {/* Milestone 2: Invoice */}
                  <div className={`fo-scroll-journey-node ${p2 >= 0.55 ? "is-reached is-active" : ""}`}>
                    <div className="fo-scroll-journey-capsule">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h12M6 16h8" />
                      </svg>
                    </div>
                    <span className="fo-scroll-journey-title">Invoice</span>
                    <span className="fo-scroll-journey-sub">Fulfilled</span>
                  </div>

                  {/* Milestone 3: Collection */}
                  <div className={`fo-scroll-journey-node ${p2 >= 0.90 ? "is-reached is-active" : ""}`}>
                    <div className="fo-scroll-journey-capsule">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <span className="fo-scroll-journey-title">Collection</span>
                    <span className="fo-scroll-journey-sub">Realized</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ================================================================
              CARD 03: CONTROL & COMPLIANCE
              Scroll progression: Primary document → Two connected relationship lines
              → Supporting references locked into focus
              ================================================================ */}
          <article
            ref={(el) => { cardRefs.current[2] = el; }}
            className="fo-scroll-outcome-card"
            aria-labelledby="fo-card-title-03"
          >
            <div className="fo-scroll-outcome-card__header">
              <div className="fo-scroll-outcome-card__top">
                <h3 id="fo-card-title-03" className="fo-scroll-outcome-card__title">
                  Control & compliance
                </h3>
                <button
                  type="button"
                  className={`fo-outcome-replay-btn ${replaying[2] ? "is-replaying" : ""}`}
                  onClick={() => handleReplay(2)}
                  aria-label="Replay Control & compliance visual"
                  title="Replay visual animation"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 8a6 6 0 1 1 1.76 4.24M2 13V8h5" />
                  </svg>
                  <span>Replay visual</span>
                </button>
              </div>

              <p className="fo-scroll-outcome-card__description">
                Keep financial records, supporting documents and exceptions easier to trace.
              </p>
            </div>

            <div
              className="fo-scroll-outcome-card__visual fo-scroll-outcome-card__visual--compliance"
              role="img"
              aria-label="Diagram showing a primary transaction connected progressively to its supporting document and exception record"
            >
              <div className="fo-scroll-compliance-schema">
                {/* Primary Document */}
                <div
                  className="fo-scroll-compliance-doc"
                  style={{
                    opacity: clamp(p3 * 1.5, 0.4, 1),
                    transform: `scale(${0.96 + clamp(p3 * 0.04, 0, 0.04)})`,
                  }}
                >
                  <div className="fo-scroll-compliance-doc-top">
                    <span className="fo-scroll-compliance-doc-tag">RECORD</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="fo-scroll-compliance-doc-line" />
                  <div className="fo-scroll-compliance-doc-line fo-scroll-compliance-doc-line--med" />
                  <div className="fo-scroll-compliance-doc-line fo-scroll-compliance-doc-line--short" />
                  <div className="fo-scroll-compliance-doc-line fo-scroll-compliance-doc-line--accent" />
                </div>

                {/* Animated Relationship Lines (SVG) */}
                <div className="fo-scroll-compliance-branches" aria-hidden="true">
                  <svg width="48" height="76" viewBox="0 0 48 76" fill="none">
                    {/* Top Branch (Length ~55) */}
                    <path
                      d="M2 38 H20 C32 38, 34 18, 46 18"
                      stroke="#185FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="55"
                      strokeDashoffset={55 * (1 - clamp((p3 - 0.2) / 0.55, 0, 1))}
                    />
                    {/* Bottom Branch (Length ~55) */}
                    <path
                      d="M2 38 H20 C32 38, 34 58, 46 58"
                      stroke="#185FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="55"
                      strokeDashoffset={55 * (1 - clamp((p3 - 0.3) / 0.55, 0, 1))}
                    />
                    <circle cx="2" cy="38" r="2.5" fill="#185FA5" opacity={clamp(p3 * 2, 0.3, 1)} />
                    <circle cx="46" cy="18" r="2" fill="#185FA5" opacity={p3 >= 0.65 ? 1 : 0.2} />
                    <circle cx="46" cy="58" r="2" fill="#185FA5" opacity={p3 >= 0.75 ? 1 : 0.2} />
                  </svg>
                </div>

                {/* Two Connected Reference Chips */}
                <div className="fo-scroll-compliance-links">
                  <div
                    className={`fo-scroll-compliance-link-chip ${p3 >= 0.65 ? "is-active" : ""}`}
                    style={{
                      opacity: clamp((p3 - 0.25) * 1.8, 0.3, 1),
                      transform: `translateX(${(1 - clamp((p3 - 0.25) * 1.8, 0, 1)) * 4}px)`,
                    }}
                  >
                    <span className="fo-scroll-compliance-link-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </span>
                    <span className="fo-scroll-compliance-link-text">Supporting document</span>
                  </div>

                  <div
                    className={`fo-scroll-compliance-link-chip ${p3 >= 0.75 ? "is-active" : ""}`}
                    style={{
                      opacity: clamp((p3 - 0.35) * 1.8, 0.3, 1),
                      transform: `translateX(${(1 - clamp((p3 - 0.35) * 1.8, 0, 1)) * 4}px)`,
                    }}
                  >
                    <span className="fo-scroll-compliance-link-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </span>
                    <span className="fo-scroll-compliance-link-text">Exception record</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ================================================================
              CARD 04: BETTER DECISIONS
              Scroll progression: Financial signals + Operational context
              → Converging paths into Decision context focal point
              ================================================================ */}
          <article
            ref={(el) => { cardRefs.current[3] = el; }}
            className="fo-scroll-outcome-card"
            aria-labelledby="fo-card-title-04"
          >
            <div className="fo-scroll-outcome-card__header">
              <div className="fo-scroll-outcome-card__top">
                <h3 id="fo-card-title-04" className="fo-scroll-outcome-card__title">
                  Better decisions
                </h3>
                <button
                  type="button"
                  className={`fo-outcome-replay-btn ${replaying[3] ? "is-replaying" : ""}`}
                  onClick={() => handleReplay(3)}
                  aria-label="Replay Better decisions visual"
                  title="Replay visual animation"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 8a6 6 0 1 1 1.76 4.24M2 13V8h5" />
                  </svg>
                  <span>Replay visual</span>
                </button>
              </div>

              <p className="fo-scroll-outcome-card__description">
                Bring financial signals and operational context into the same view.
              </p>
            </div>

            <div
              className="fo-scroll-outcome-card__visual fo-scroll-outcome-card__visual--decisions"
              role="img"
              aria-label="Diagram showing financial signals and operational context converging progressively into a unified decision context"
            >
              <div className="fo-scroll-decisions-schema">
                {/* Inputs: Financial signals & Operational context */}
                <div className="fo-scroll-decisions-inputs">
                  <div
                    className="fo-scroll-decisions-input-chip fo-scroll-decisions-input-chip--financial"
                    style={{
                      opacity: clamp(p4 * 1.5, 0.4, 1),
                      transform: `translateX(${(1 - clamp(p4 * 1.5, 0, 1)) * -4}px)`,
                    }}
                  >
                    <span className="fo-decisions-chip-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </span>
                    <span className="fo-decisions-chip-label">Financial signals</span>
                  </div>

                  <div
                    className="fo-scroll-decisions-input-chip fo-scroll-decisions-input-chip--operational"
                    style={{
                      opacity: clamp((p4 - 0.1) * 1.5, 0.4, 1),
                      transform: `translateX(${(1 - clamp((p4 - 0.1) * 1.5, 0, 1)) * -4}px)`,
                    }}
                  >
                    <span className="fo-decisions-chip-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="3" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </span>
                    <span className="fo-decisions-chip-label">Operational context</span>
                  </div>
                </div>

                {/* Converging Conduits (SVG) */}
                <div className="fo-scroll-decisions-conduits" aria-hidden="true">
                  <svg width="44" height="76" viewBox="0 0 44 76" fill="none">
                    {/* Top Conduit (Length ~48) */}
                    <path
                      d="M2 18 C18 18, 22 38, 42 38"
                      stroke="#185FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="48"
                      strokeDashoffset={48 * (1 - clamp((p4 - 0.2) / 0.55, 0, 1))}
                    />
                    {/* Bottom Conduit (Length ~48) */}
                    <path
                      d="M2 58 C18 58, 22 38, 42 38"
                      stroke="#534AB7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="48"
                      strokeDashoffset={48 * (1 - clamp((p4 - 0.25) / 0.55, 0, 1))}
                    />
                    <circle cx="2" cy="18" r="2.5" fill="#185FA5" opacity={clamp(p4 * 2, 0.3, 1)} />
                    <circle cx="2" cy="58" r="2.5" fill="#534AB7" opacity={clamp((p4 - 0.1) * 2, 0.3, 1)} />
                  </svg>
                </div>

                {/* Modest Focal Point: Decision context */}
                <div
                  className={`fo-scroll-decisions-focal ${p4 >= 0.75 ? "is-active" : ""}`}
                  style={{
                    opacity: clamp((p4 - 0.3) * 1.8, 0.4, 1),
                    transform: `translateX(${(1 - clamp((p4 - 0.3) * 1.8, 0, 1)) * 4}px)`,
                  }}
                >
                  <span className="fo-scroll-decisions-focal-dot" aria-hidden="true" />
                  <span className="fo-scroll-decisions-focal-label">Decision context</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
});

export default BusinessOutcomesScrollGallery;

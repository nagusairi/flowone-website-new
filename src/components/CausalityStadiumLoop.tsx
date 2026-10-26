import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import "./causality-loops.css";

/* ==========================================================================
   Section 02 — Business Problem: The Consequence Loop
   Racetrack Circuit · Missing Context Handoffs · Downstream Consequences
   Demonstrates why the connected solution (Section 03) matters.
   ========================================================================== */

export interface ConsequenceStage {
  id: string;
  num: string;
  name: string;
  shortProblem: string;
  panelHeading: string;
  explanation: string;
  consequence: string;
  placement: "top" | "bottom" | "right";
  // Coordinates on stadium racetrack (viewBox 960 x 600)
  x: number;
  y: number;
  // Outgoing path segment from this stage to next stage
  segmentPath: string;
}

export const consequenceStages: ConsequenceStage[] = [
  {
    id: "order",
    num: "01",
    name: "Order",
    shortProblem: "Change stays in sales",
    panelHeading: "The update stops with one team.",
    explanation:
      "Revised delivery terms remain in the sales record while other teams continue using the original commitment.",
    consequence: "Operations plans against outdated delivery information.",
    placement: "top",
    x: 260,
    y: 75,
    segmentPath: "M 260 75 L 480 75",
  },
  {
    id: "inventory",
    num: "02",
    name: "Inventory",
    shortProblem: "Fulfilment context is missing",
    panelHeading: "Billing waits for the latest fulfilment status.",
    explanation:
      "Stock or dispatch changes do not reach finance promptly, leaving billing teams to request confirmation.",
    consequence: "Invoice preparation waits for clarification.",
    placement: "top",
    x: 480,
    y: 75,
    segmentPath: "M 480 75 L 700 75",
  },
  {
    id: "invoice",
    num: "03",
    name: "Invoice",
    shortProblem: "Billing needs clarification",
    panelHeading: "The invoice starts with a reconciliation task.",
    explanation:
      "Finance must reconcile order and delivery details before issuing the invoice.",
    consequence: "The collection clock starts later.",
    placement: "top",
    x: 700,
    y: 75,
    segmentPath: "M 700 75 A 180 225 0 0 1 880 300",
  },
  {
    id: "receivable",
    num: "04",
    name: "Receivable",
    shortProblem: "Follow-up lacks context",
    panelHeading: "Collections sees the balance, not the issue.",
    explanation:
      "The outstanding invoice reaches collections without the delivery clarification that explains the delay.",
    consequence: "Reminders repeat while the underlying issue remains unresolved.",
    placement: "right",
    x: 880,
    y: 300,
    segmentPath: "M 880 300 A 180 225 0 0 1 700 525 L 620 525",
  },
  {
    id: "cash",
    num: "05",
    name: "Cash",
    shortProblem: "Expected receipts shift",
    panelHeading: "The cash plan keeps the original assumption.",
    explanation:
      "Expected payment timing changes while the cash plan still assumes the earlier receipt date.",
    consequence: "Planned outflows face tighter cash headroom.",
    placement: "bottom",
    x: 620,
    y: 525,
    segmentPath: "M 620 525 L 340 525",
  },
  {
    id: "decision",
    num: "06",
    name: "Decision",
    shortProblem: "Leaders see the impact late",
    panelHeading: "The business picture needs reconciling.",
    explanation:
      "Teams report different versions of the same transaction, leaving leadership to piece together the wider impact.",
    consequence: "Decisions wait while teams reconcile the picture.",
    placement: "bottom",
    x: 340,
    y: 525,
    segmentPath: "M 340 525 L 260 525 A 180 225 0 0 1 260 75",
  },
];

export const CausalityStadiumLoop = memo(function CausalityStadiumLoop() {
  const [activeStageId, setActiveStageId] = useState<string>("order");
  const [isExplicitlyPaused, setIsExplicitlyPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const [timerResetKey, setTimerResetKey] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = consequenceStages.findIndex((s) => s.id === activeStageId);
  const activeStage = consequenceStages[activeIndex] || consequenceStages[0];
  const nextStage = consequenceStages[(activeIndex + 1) % consequenceStages.length];

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Viewport intersection observer: pause when section is out of view
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Document visibility listener: pause when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsInViewport(false);
      } else if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsInViewport(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Automatic cycling: 8 seconds per stage
  const shouldCycle =
    !isExplicitlyPaused &&
    !isHovered &&
    !isFocused &&
    isInViewport &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!shouldCycle) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveStageId((prev) => {
          const idx = consequenceStages.findIndex((s) => s.id === prev);
          return consequenceStages[(idx + 1) % consequenceStages.length].id;
        });
        setIsFading(false);
      }, 200);
    }, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStageId, shouldCycle, timerResetKey]);

  // Center active stage pill in mobile rail
  useEffect(() => {
    if (!mobileRailRef.current) return;
    const container = mobileRailRef.current;
    const activeBtn = container.querySelector<HTMLButtonElement>(
      ".fo-stadium-mobile__stage-pill.is-active"
    );

    if (activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const currentScroll = container.scrollLeft;
      const offsetWithinContainer = btnRect.left - containerRect.left;
      const targetScroll =
        currentScroll + offsetWithinContainer - containerRect.width / 2 + btnRect.width / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [activeStageId]);

  // Manual stage selection
  const selectStage = useCallback((id: string) => {
    setIsFading(true);
    setTimeout(() => {
      setActiveStageId(id);
      setIsFading(false);
    }, 150);
    setTimerResetKey((k) => k + 1);
  }, []);

  const goToNext = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setActiveStageId((prev) => {
        const idx = consequenceStages.findIndex((s) => s.id === prev);
        return consequenceStages[(idx + 1) % consequenceStages.length].id;
      });
      setIsFading(false);
    }, 150);
    setTimerResetKey((k) => k + 1);
  }, []);

  const goToPrev = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setActiveStageId((prev) => {
        const idx = consequenceStages.findIndex((s) => s.id === prev);
        return consequenceStages[
          (idx - 1 + consequenceStages.length) % consequenceStages.length
        ].id;
      });
      setIsFading(false);
    }, 150);
    setTimerResetKey((k) => k + 1);
  }, []);

  const togglePause = useCallback(() => {
    setIsExplicitlyPaused((prev) => !prev);
    setTimerResetKey((k) => k + 1);
  }, []);

  return (
    <section
      id="business-causality"
      ref={sectionRef}
      className="new-home-section new-home-causality-section fo-causality-stadium-section"
      aria-labelledby="causality-heading"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="home-container">
        <div className="causality-panel fo-causality-stadium">
          {/* Subtle Ambient Decorative Glow */}
          <div className="causality-ambient-glow" aria-hidden="true" />

          {/* Section Introduction */}
          <header className="causality-intro">
            <div className="hero-eyebrow-container" style={{ marginBottom: "0.85rem" }}>
              <div
                className="hero-modern-eyebrow is-static is-dark-theme"
                role="note"
                aria-label="The Business Problem"
              >
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>PROBLEM</span>
                </span>
                <span className="hero-eyebrow-title">THE BUSINESS PROBLEM</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <h2 id="causality-heading" className="causality-heading">
              One disconnected step.<br />
              <em>Consequences across the business.</em>
            </h2>

            <p className="causality-subtext">
              An order changes. The update stays with one team. Billing, collections and cash planning continue with yesterday’s information.
            </p>
          </header>

          {/* Subtle Horizontal Divider */}
          <div className="causality-divider" aria-hidden="true" />

          {/* ==============================================================
              1. DESKTOP VIEW: RACETRACK CIRCUIT & DETAIL PANEL
              ============================================================== */}
          <div className="fo-causality-stadium__desktop-view">
            <div
              className="fo-causality-stadium__track-wrapper"
              role="region"
              aria-label="The Consequence Loop Racetrack"
            >
              {/* SVG Circuit Canvas */}
              <div className="fo-causality-stadium__circuit-canvas">
                <svg
                  className="fo-causality-stadium__svg"
                  viewBox="0 0 960 600"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="consequenceAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E9B66B" />
                      <stop offset="100%" stopColor="#F5D6A6" />
                    </linearGradient>
                    <filter id="consequenceGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Base Quiet Slate Racetrack Path */}
                  <path
                    d="M 260 75 L 700 75 A 180 225 0 0 1 700 525 L 260 525 A 180 225 0 0 1 260 75 Z"
                    className="fo-stadium-loop-path"
                  />

                  {/* Highlighted Outgoing Handoff Gap (Missing Context) */}
                  <path
                    d={activeStage.segmentPath}
                    className="fo-stadium-handoff-gap"
                  />

                  {/* Fine connector line from active node to central panel */}
                  <line
                    x1={activeStage.x}
                    y1={activeStage.y}
                    x2={480}
                    y2={300}
                    className="fo-stadium-connector-line"
                  />
                </svg>

                {/* Six Interactive Stage Nodes Positioned Around Track */}
                <div
                  className="fo-causality-stadium__nodes-overlay"
                  role="tablist"
                  aria-label="Consequence Loop Stages"
                >
                  {consequenceStages.map((stage) => {
                    const isActive = stage.id === activeStageId;
                    const isNextAffected = stage.id === nextStage.id;
                    const leftPct = (stage.x / 960) * 100;
                    const topPct = (stage.y / 600) * 100;

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        className={`fo-causality-stadium__node-btn is-${stage.placement} ${
                          isActive ? "is-active" : isNextAffected ? "is-next-affected" : ""
                        }`}
                        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                        onClick={() => selectStage(stage.id)}
                      >
                        <div className="fo-causality-stadium__node-core">
                          <span className="fo-causality-stadium__node-num">{stage.num}</span>
                        </div>
                        <div className="fo-causality-stadium__node-callout">
                          <span className="fo-causality-stadium__node-name">{stage.name}</span>
                          <span className="fo-causality-stadium__node-badge">
                            {stage.shortProblem}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Central Consequence Detail Panel */}
                <div
                  className="fo-causality-stadium__center-hub"
                  role="region"
                  aria-live="polite"
                  aria-label={`Active stage consequence: ${activeStage.name}`}
                  onPointerEnter={() => setIsHovered(true)}
                  onPointerLeave={() => setIsHovered(false)}
                >
                  {/* Dwell Progress Bar */}
                  {shouldCycle && (
                    <div
                      className="fo-stadium-loop-progress-bar"
                      key={`dwell-bar-${activeStage.id}-${timerResetKey}`}
                      aria-hidden="true"
                    >
                      <div className="fo-stadium-loop-progress-fill" />
                    </div>
                  )}

                  {/* Panel Top Header */}
                  <div className="fo-causality-stadium__hub-top">
                    <span className="fo-causality-stadium__hub-pill">
                      STAGE {activeStage.num} · {activeStage.name.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      className={`fo-stadium-loop-badge ${
                        isExplicitlyPaused ? "is-paused" : "is-looping"
                      }`}
                      onClick={togglePause}
                      aria-label={
                        isExplicitlyPaused
                          ? "Resume automatic stage cycling"
                          : "Pause automatic stage cycling"
                      }
                      title={
                        isExplicitlyPaused
                          ? "Click to resume automatic cycling"
                          : "Click to pause automatic cycling"
                      }
                    >
                      <span className="fo-stadium-loop-beacon" aria-hidden="true" />
                      <span>{isExplicitlyPaused ? "PAUSED" : "AUTO CYCLING"}</span>
                    </button>
                  </div>

                  {/* Dynamic Panel Content */}
                  <div
                    className={`fo-stadium-hub-content-deck ${
                      isFading ? "is-fading" : ""
                    }`}
                  >
                    <h3 className="fo-causality-stadium__hub-title">
                      {activeStage.panelHeading}
                    </h3>

                    <p className="fo-causality-stadium__hub-desc">
                      {activeStage.explanation}
                    </p>

                    <div className="fo-causality-hub-divider" aria-hidden="true" />

                    <div className="fo-causality-consequence-box">
                      <span className="fo-causality-consequence-kicker">
                        DOWNSTREAM CONSEQUENCE
                      </span>
                      <p className="fo-causality-consequence-text">
                        {activeStage.consequence}
                      </p>
                    </div>
                  </div>

                  {/* Panel Bottom Footer */}
                  <div className="fo-causality-stadium__hub-footer">
                    <span className="fo-causality-scenario-tag">
                      Illustrative business scenario
                    </span>
                    <span className="fo-causality-hub-stage-counter">
                      {activeStage.num} / 06
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              2. MOBILE VIEW: COMPACT STAGE SELECTOR & CONSEQUENCE CARD (<= 768px)
              ============================================================== */}
          <div
            className="fo-causality-stadium__mobile-view"
            role="region"
            aria-label="Mobile Consequence Loop View"
          >
            {/* Horizontal Stage Ribbon */}
            <div className="fo-stadium-mobile__rail-shell" ref={mobileRailRef}>
              <div
                className="fo-stadium-mobile__rail-track"
                role="tablist"
                aria-label="Business loop stages"
              >
                {consequenceStages.map((stage, idx) => {
                  const isActive = stage.id === activeStageId;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-stadium-mobile__stage-pill ${
                        isActive ? "is-active" : ""
                      }`}
                      onClick={() => selectStage(stage.id)}
                    >
                      <span className="fo-stadium-mobile__pill-num">{stage.num}</span>
                      <span className="fo-stadium-mobile__pill-name">{stage.name}</span>
                      {idx < consequenceStages.length - 1 && (
                        <span
                          className="fo-stadium-mobile__pill-arrow"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Active Stage Card */}
            <div
              className="fo-stadium-mobile__card"
              role="region"
              aria-live="polite"
              onPointerEnter={() => setIsHovered(true)}
              onPointerLeave={() => setIsHovered(false)}
            >
              {shouldCycle && (
                <div
                  className="fo-stadium-loop-progress-bar"
                  key={`mob-dwell-${activeStage.id}-${timerResetKey}`}
                  aria-hidden="true"
                >
                  <div className="fo-stadium-loop-progress-fill" />
                </div>
              )}

              <div className="fo-stadium-mobile__card-top">
                <span className="fo-stadium-mobile__card-badge">
                  STAGE {activeStage.num} · {activeStage.name.toUpperCase()}
                </span>
                <button
                  type="button"
                  className={`fo-stadium-loop-badge fo-stadium-loop-badge--mobile ${
                    isExplicitlyPaused ? "is-paused" : "is-looping"
                  }`}
                  onClick={togglePause}
                  aria-label={
                    isExplicitlyPaused
                      ? "Resume automatic stage cycling"
                      : "Pause automatic stage cycling"
                  }
                >
                  <span className="fo-stadium-loop-beacon" aria-hidden="true" />
                  <span>{isExplicitlyPaused ? "PAUSED" : "CYCLING"}</span>
                </button>
              </div>

              <div
                className={`fo-stadium-hub-content-deck ${
                  isFading ? "is-fading" : ""
                }`}
              >
                <h3 className="fo-stadium-mobile__card-title">
                  {activeStage.panelHeading}
                </h3>

                <p className="fo-stadium-mobile__card-desc">
                  {activeStage.explanation}
                </p>

                <div className="fo-causality-consequence-box">
                  <span className="fo-causality-consequence-kicker">
                    DOWNSTREAM CONSEQUENCE
                  </span>
                  <p className="fo-causality-consequence-text">
                    {activeStage.consequence}
                  </p>
                </div>
              </div>

              <div className="fo-stadium-mobile__card-footer">
                <span className="fo-causality-scenario-tag">
                  Illustrative business scenario
                </span>
              </div>
            </div>

            {/* Thumb Stepper Navigation */}
            <div className="fo-stadium-mobile__stepper-bar">
              <button
                type="button"
                className="fo-stadium-mobile__step-btn"
                onClick={goToPrev}
                aria-label="Previous business stage"
              >
                ← Prev
              </button>
              <div className="fo-stadium-mobile__step-dots" aria-hidden="true">
                {consequenceStages.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`fo-stadium-mobile__step-dot ${
                      s.id === activeStageId ? "is-active" : ""
                    }`}
                    onClick={() => selectStage(s.id)}
                    aria-label={`Jump to stage ${s.num}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="fo-stadium-mobile__step-btn"
                onClick={goToNext}
                aria-label="Next business stage"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="causality-divider" aria-hidden="true" />

          {/* Concluding Statement */}
          <footer className="causality-closing">
            <h3 className="causality-closing-headline">
              The transaction keeps moving. The context doesn’t always follow.
            </h3>
            <p className="causality-closing-sub">
              Illustrative business scenario · Section 03 demonstrates the connected solution.
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
});

export default CausalityStadiumLoop;

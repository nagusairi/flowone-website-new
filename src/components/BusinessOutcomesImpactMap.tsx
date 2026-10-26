import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import "./business-outcomes-impact-map.css";

/* ==========================================================================
   Section 07 — Business Outcomes: Direction 03
   "03 — The Business Impact Map"
   Motion: Interactive, scroll-aware
   Central idea: Value extends across the business when finance and operations share context
   ========================================================================== */

interface MapOutcome {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  detailHeading: string;
  detailDescription: string;
  metaSignal: string;
  // SVG cubic curve path definition from center anchor to destination (640x370 viewBox)
  pathD: string;
  pathLength: number;
}

const mapOutcomes: MapOutcome[] = [
  {
    id: "cashflow",
    num: "01",
    title: "Cashflow",
    subtitle: "Greater visibility",
    detailHeading: "See what needs attention.",
    detailDescription: "Understand what is due, what is delayed and where follow-up is needed.",
    metaSignal: "Continuous Receivables Visibility · Clearer Priorities",
    pathD: "M 270 175 C 205 175, 160 115, 125 78",
    pathLength: 180,
  },
  {
    id: "operations",
    num: "02",
    title: "Operations",
    subtitle: "Clearer handoffs",
    detailHeading: "Keep work moving together.",
    detailDescription: "Connect transactions and team handoffs across the business.",
    metaSignal: "Shared Transaction Journey · Order to Settlement",
    pathD: "M 370 175 C 435 175, 480 115, 515 78",
    pathLength: 180,
  },
  {
    id: "control",
    num: "03",
    title: "Control",
    subtitle: "Clearer oversight",
    detailHeading: "Keep the supporting context close.",
    detailDescription: "Trace financial activity through its records, supporting documents and exceptions.",
    metaSignal: "Auditable Lineage · Supporting Documents in Context",
    pathD: "M 270 195 C 205 195, 160 255, 125 292",
    pathLength: 180,
  },
  {
    id: "decisions",
    num: "04",
    title: "Decisions",
    subtitle: "More connected context",
    detailHeading: "See the wider picture before acting.",
    detailDescription: "Bring financial signals and operational context together to support informed decisions.",
    metaSignal: "Unified Business Signals · Action with Context",
    pathD: "M 370 195 C 435 195, 480 255, 515 292",
    pathLength: 180,
  },
];

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export const BusinessOutcomesImpactMap = memo(function BusinessOutcomesImpactMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string>("cashflow");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [travelProgress, setTravelProgress] = useState<number>(1);
  const [isTraveling, setIsTraveling] = useState<boolean>(false);

  const activeOutcome = mapOutcomes.find((o) => o.id === selectedId) || mapOutcomes[0];
  const activeIndex = mapOutcomes.findIndex((o) => o.id === selectedId);

  const isReducedMotionRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Deliberate selection trigger with optional traveling highlight pass
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);

    if (isReducedMotionRef.current) return;

    // Trigger one brief traveling highlight along the selected path (~700ms)
    setIsTraveling(true);
    setTravelProgress(0);

    const startTime = performance.now();
    const duration = 720;

    const stepTravel = (now: number) => {
      const elapsed = now - startTime;
      const t = clamp(elapsed / duration, 0, 1);
      setTravelProgress(t);

      if (t < 1) {
        requestAnimationFrame(stepTravel);
      } else {
        setIsTraveling(false);
      }
    };

    requestAnimationFrame(stepTravel);
  }, []);

  // Keyboard navigation for tablist
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex = currentIndex;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % mapOutcomes.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + mapOutcomes.length) % mapOutcomes.length;
        e.preventDefault();
      } else if (e.key === "Home") {
        nextIndex = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        nextIndex = mapOutcomes.length - 1;
        e.preventDefault();
      }

      if (nextIndex !== currentIndex) {
        handleSelect(mapOutcomes[nextIndex].id);
        const nextBtn = document.getElementById(`fo-dest-tab-${mapOutcomes[nextIndex].id}`);
        if (nextBtn) nextBtn.focus();
      }
    },
    [handleSelect]
  );

  // Natural document scroll calculation for connecting paths reveal only
  useEffect(() => {
    const secEl = sectionRef.current;
    if (!secEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      isReducedMotionRef.current = true;
      secEl.classList.add("is-entered");
      setScrollProgress(1);
      return;
    }

    let isSectionInView = false;

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
      { threshold: 0.05, rootMargin: "80px 0px" }
    );

    observer.observe(secEl);

    const handleScroll = () => {
      if (!isSectionInView && !secEl.classList.contains("is-entered")) return;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const rect = secEl.getBoundingClientRect();
        // Begins entering lower portion (0.92), reaches complete around middle (0.48)
        const startY = windowHeight * 0.92;
        const endY = windowHeight * 0.48;
        const p = clamp((startY - rect.top) / (startY - endY), 0, 1);
        setScrollProgress(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section
      id="business-outcomes"
      ref={sectionRef}
      className="fo-impact-map-section"
      aria-labelledby="fo-impact-map-heading"
    >
      <div className="fo-impact-map__container">
        {/* ==================================================================
            1. EDITORIAL SECTION INTRODUCTION
            ================================================================== */}
        <header className="fo-impact-map__intro">
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

          <h2 id="fo-impact-map-heading" className="fo-impact-map__heading">
            Make every business move count.
          </h2>

          <p className="fo-impact-map__copy">
            One connected platform. Outcomes across the business.
          </p>
        </header>

        {/* ==================================================================
            2. DESKTOP WORKSPACE (~65% Map Canvas + ~35% Shared Detail Area)
            ================================================================== */}
        <div className="fo-impact-map__workspace">
          {/* MAP CANVAS (Desktop) */}
          <div className="fo-impact-map__canvas-wrap" role="region" aria-label="Business Impact Map Canvas">
            {/* SVG Connecting Paths Layer */}
            <svg
              className="fo-impact-map__svg-layer"
              viewBox="0 0 640 370"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {mapOutcomes.map((item) => {
                const isSelected = item.id === selectedId;
                const offset = item.pathLength * (1 - scrollProgress);

                return (
                  <path
                    key={item.id}
                    d={item.pathD}
                    className={`fo-impact-path ${isSelected ? "is-active" : ""}`}
                    strokeDasharray={item.pathLength}
                    strokeDashoffset={offset}
                  />
                );
              })}

              {/* Single Optional Traveling Highlight on Selection */}
              {isTraveling && (
                <circle
                  className="fo-impact-traveler"
                  r="4"
                  cx={
                    activeOutcome.id === "cashflow"
                      ? 270 - 145 * travelProgress
                      : activeOutcome.id === "operations"
                      ? 370 + 145 * travelProgress
                      : activeOutcome.id === "control"
                      ? 270 - 145 * travelProgress
                      : 370 + 145 * travelProgress
                  }
                  cy={
                    activeOutcome.id === "cashflow" || activeOutcome.id === "operations"
                      ? 175 - 97 * travelProgress
                      : 195 + 97 * travelProgress
                  }
                />
              )}
            </svg>

            {/* Central Anchor: flowOne */}
            <div className="fo-impact-map__anchor" aria-label="Central Platform: flowOne">
              <span className="fo-impact-map__anchor-spark" aria-hidden="true">✦</span>
              <span className="fo-impact-map__anchor-text">flowOne</span>
              <span className="fo-impact-map__anchor-badge">PLATFORM</span>
            </div>

            {/* Four Destination Controls (HTML Buttons) */}
            <div role="tablist" aria-label="Business Outcomes Destinations">
              {mapOutcomes.map((item, idx) => {
                const isSelected = item.id === selectedId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`fo-dest-tab-${item.id}`}
                    aria-selected={isSelected}
                    aria-controls="fo-impact-detail-panel"
                    tabIndex={isSelected ? 0 : -1}
                    className={`fo-impact-destination fo-dest--${item.id} ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleSelect(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  >
                    <span className="fo-impact-destination__node" aria-hidden="true" />
                    <div className="fo-impact-destination__text">
                      <span className="fo-impact-destination__title">{item.title}</span>
                      <span className="fo-impact-destination__subtitle">{item.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DEDICATED MOBILE VERTICAL SPINE TREE (< 768px) */}
          <div className="fo-impact-map__mobile-tree" aria-label="Mobile Business Impact Map">
            <div className="fo-impact-map__mobile-anchor-bar">
              <div className="fo-impact-map__mobile-anchor">
                <span className="fo-impact-map__anchor-spark" aria-hidden="true">✦</span>
                <span className="fo-impact-map__anchor-text">flowOne</span>
                <span className="fo-impact-map__anchor-badge">PLATFORM</span>
              </div>
            </div>

            <div className="fo-impact-map__mobile-spine-wrap" role="tablist" aria-label="Business Outcomes Options">
              <div className="fo-impact-map__mobile-spine-line" aria-hidden="true" />

              {mapOutcomes.map((item, idx) => {
                const isSelected = item.id === selectedId;

                return (
                  <div
                    key={item.id}
                    className={`fo-impact-mobile-branch-item ${isSelected ? "is-selected" : ""}`}
                  >
                    <div className="fo-impact-mobile-branch-link" aria-hidden="true" />
                    <button
                      type="button"
                      role="tab"
                      id={`fo-dest-mobile-tab-${item.id}`}
                      aria-selected={isSelected}
                      aria-controls="fo-impact-detail-panel"
                      tabIndex={isSelected ? 0 : -1}
                      className={`fo-impact-mobile-btn ${isSelected ? "is-selected" : ""}`}
                      onClick={() => handleSelect(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                    >
                      <div className="fo-impact-mobile-btn__left">
                        <span className="fo-impact-destination__node" aria-hidden="true" />
                        <span className="fo-impact-mobile-btn__title">{item.title}</span>
                      </div>
                      <span className="fo-impact-mobile-btn__subtitle">{item.subtitle}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SHARED EDITORIAL DETAIL AREA (~35% Desktop, below map on Mobile) */}
          <div
            id="fo-impact-detail-panel"
            role="tabpanel"
            aria-labelledby={`fo-dest-tab-${selectedId}`}
            className="fo-impact-map__detail-area"
          >
            <div key={activeOutcome.id} className="fo-impact-detail-content">
              <span className="fo-impact-detail-label">
                <span className="fo-impact-detail-label-dot" aria-hidden="true" />
                OUTCOME {activeOutcome.num} · {activeOutcome.title}
              </span>

              <h3 className="fo-impact-detail-heading">
                {activeOutcome.detailHeading}
              </h3>

              <p className="fo-impact-detail-desc">
                {activeOutcome.detailDescription}
              </p>

              <div className="fo-impact-detail-meta" aria-hidden="true">
                <span>✦</span>
                <span>{activeOutcome.metaSignal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default BusinessOutcomesImpactMap;

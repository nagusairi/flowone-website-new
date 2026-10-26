import { memo, useState, useRef, useCallback } from "react";
import { Icon } from "./flowone";
import { departmentFunctions } from "./connectedRealityData";

/* ==========================================================================
   Section 04: The Connected Reality — Suggestion 1: Flat Department Tabs
   Reference Design: Stripe / Developer Documentation Vertical & Mobile Rail
   - Desktop: Flat 6 tabs, continuous left guideline spine, 2.5px solid blue line on active item
   - Mobile: Pattern 1 — Living Transaction Option C Touch-Snap Carousel + HUD Stepper
   - No category group headings; direct department switching
   ========================================================================== */

export const ConnectedRealityNestedTabs = memo(function ConnectedRealityNestedTabs() {
  const [activeDeptId, setActiveDeptId] = useState<string>("sales");
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const activeDept = departmentFunctions.find((d) => d.id === activeDeptId) || departmentFunctions[0];

  const handleDesktopTabClick = useCallback((id: string, index: number) => {
    setActiveDeptId(id);
    setActiveMobileIdx(index);
  }, []);

  const scrollToMobileIdx = useCallback((index: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const slides = el.querySelectorAll(".connected-mobile-slide");
    const target = slides[index] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveMobileIdx(index);
      setActiveDeptId(departmentFunctions[index].id);
    }
  }, []);

  const handlePrev = useCallback(() => {
    if (activeMobileIdx > 0) {
      scrollToMobileIdx(activeMobileIdx - 1);
    }
  }, [activeMobileIdx, scrollToMobileIdx]);

  const handleNext = useCallback(() => {
    if (activeMobileIdx < departmentFunctions.length - 1) {
      scrollToMobileIdx(activeMobileIdx + 1);
    }
  }, [activeMobileIdx, scrollToMobileIdx]);

  // Real-time synchronization when user swipes cards horizontally on mobile
  const handleMobileScroll = useCallback(() => {
    const el = mobileTrackRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      const scrollLeft = el.scrollLeft;
      const firstSlide = el.querySelector(".connected-mobile-slide") as HTMLElement | null;
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth + 12; // width + gap
        const idx = Math.min(
          departmentFunctions.length - 1,
          Math.max(0, Math.round(scrollLeft / slideWidth))
        );
        if (idx !== activeMobileIdx) {
          setActiveMobileIdx(idx);
          setActiveDeptId(departmentFunctions[idx].id);
        }
      }
    }
  }, [activeMobileIdx]);

  return (
    <section
      id="connected-reality-tabs-section"
      className="new-home-section connected-reality-tabs-section"
      aria-labelledby="connected-tabs-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            1. SECTION HEADER (Clean, Left-Aligned)
            ============================================================== */}
        <div className="connected-tabs-intro">
          <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
            <div className="hero-modern-eyebrow is-static" role="note" aria-label="The Connected Reality">
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>REALITY</span>
              </span>
              <span className="hero-eyebrow-title">THE CONNECTED REALITY</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <h2 id="connected-tabs-heading" className="connected-tabs-title">
            The transaction is connected.<br />
            The systems usually aren’t.
          </h2>

          <p className="connected-tabs-desc">
            Sales sees the order. Operations sees the stock. Finance sees the invoice. GST sees the tax.
            Select an operational domain below to inspect the disconnected reality versus the flowOne unified context.
          </p>
        </div>

        {/* ==============================================================
            2. DESKTOP VIEW (> 900px)
            Stripe / Documentation Style Vertical Tabs Layout
            ============================================================== */}
        <div className="connected-tabs-desktop-view">
          <div className="connected-tabs-frame" role="region" aria-label="Department comparison tabs">
            {/* LEFT SIDEBAR: Flat 6-Tab List with Continuous Left Spine Track */}
            <aside className="connected-tabs-sidebar" aria-label="Operational departments navigation">
              <div
                className="connected-sidebar-items-list"
                role="tablist"
                aria-label="Operational departments"
              >
                {departmentFunctions.map((dept, index) => {
                  const isActive = dept.id === activeDeptId;
                  return (
                    <button
                      type="button"
                      key={dept.id}
                      role="tab"
                      id={`tab-${dept.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${dept.id}`}
                      className={`connected-sidebar-tab-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => handleDesktopTabClick(dept.id, index)}
                    >
                      <span className="connected-tab-text">{dept.funcName}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* RIGHT CONTENT PANE: Active Department Details + Dual Comparison Card */}
            <main
              id={`panel-${activeDept.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeDept.id}`}
              className="connected-tabs-content"
            >
              {/* Header: Subtitle + Big Headline + Editorial Description */}
              <div className="connected-content-head">
                <span className="connected-content-kicker">
                  {activeDept.category} · {activeDept.reference} · {activeDept.metric}
                </span>
                <h3 className="connected-content-headline">
                  {activeDept.headline}
                </h3>
                <p className="connected-content-lead">
                  {activeDept.lead}
                </p>
              </div>

              {/* DUAL BEFORE / AFTER REALITY COMPARISON CARD */}
              <div className="connected-comparison-grid">
                {/* LEFT CARD: Fragmented Reality (Before) */}
                <div className="connected-reality-card is-fragmented">
                  <div className="connected-card-top">
                    <div className="connected-card-badge is-warning">
                      <span className="connected-badge-icon" aria-hidden="true">✕</span>
                      <span>FRAGMENTED REALITY</span>
                    </div>
                    <span className="connected-tool-pill">
                      <span className="connected-tool-icon" aria-hidden="true">{activeDept.incompatibleToolIcon}</span>
                      <span>{activeDept.incompatibleToolName}</span>
                    </span>
                  </div>

                  <div className="connected-card-body">
                    <span className="connected-body-kicker">⚠️ DEPARTMENTAL BLIND SPOT</span>
                    <p className="connected-body-text">{activeDept.siloImpact}</p>
                  </div>

                  <div className="connected-card-footer is-severed">
                    <span className="connected-conduit-dot" aria-hidden="true" />
                    <span className="connected-conduit-label">SEVERED LINK:</span>
                    <span className="connected-conduit-val">{activeDept.severedStatus}</span>
                  </div>
                </div>

                {/* RIGHT CARD: flowOne Connected (After) */}
                <div className="connected-reality-card is-connected">
                  <div className="connected-card-top">
                    <div className="connected-card-badge is-success">
                      <span className="connected-badge-icon" aria-hidden="true">✦</span>
                      <span>FLOWONE CONNECTED</span>
                    </div>
                    <span className="connected-tool-pill is-flowone">
                      <span className="connected-tool-spark" aria-hidden="true">✦</span>
                      <span>{activeDept.connectedToolName}</span>
                    </span>
                  </div>

                  <div className="connected-card-body">
                    <span className="connected-body-kicker is-blue">✦ SHARED CONTEXT BENEFIT</span>
                    <p className="connected-body-text is-dark">{activeDept.connectedBenefit}</p>
                  </div>

                  <div className="connected-card-footer is-active">
                    <span className="connected-conduit-dot is-blue" aria-hidden="true" />
                    <span className="connected-conduit-label is-blue">ACTIVE CONDUIT:</span>
                    <span className="connected-conduit-val is-blue">{activeDept.connectedLink}</span>
                  </div>
                </div>
              </div>

              {/* Micro Telemetry Bar */}
              <div className="connected-content-telemetry">
                <span className="connected-telemetry-item">
                  <i className="connected-telemetry-dot" aria-hidden="true" />
                  <span>Single Source of Truth</span>
                </span>
                <span className="connected-telemetry-sep" aria-hidden="true">/</span>
                <span className="connected-telemetry-item">
                  <strong>Zero Manual Re-Entry</strong>
                </span>
                <span className="connected-telemetry-sep" aria-hidden="true">/</span>
                <span className="connected-telemetry-item">
                  <strong>&lt; 14ms Latency</strong>
                </span>
              </div>
            </main>
          </div>
        </div>

        {/* ==============================================================
            3. MOBILE VIEW (<= 900px)
            Pattern 1: Living Transaction Option C Touch-Snap Carousel + HUD Stepper
            ============================================================== */}
        <div className="connected-tabs-mobile-view" aria-label="Department comparison mobile carousel">
          {/* Top HUD Stepper Bar */}
          <div className="connected-tabs-mobile-hud" aria-label="Mobile department switcher">
            <div className="connected-tabs-mobile-hud-meta">
              <span className="connected-tabs-mobile-beacon" aria-hidden="true" />
              <span className="connected-tabs-mobile-hud-title">
                Dept {activeMobileIdx + 1} of {departmentFunctions.length} · <strong>{departmentFunctions[activeMobileIdx].funcName}</strong>
              </span>
            </div>
            <div className="connected-tabs-mobile-hud-actions">
              <button
                type="button"
                className="connected-tabs-mobile-nav-btn"
                onClick={handlePrev}
                disabled={activeMobileIdx === 0}
                aria-label="Previous department"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                className="connected-tabs-mobile-nav-btn"
                onClick={handleNext}
                disabled={activeMobileIdx === departmentFunctions.length - 1}
                aria-label="Next department"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Touch-Snap Carousel Track */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="connected-tabs-mobile-carousel"
            role="region"
            aria-label="Swipeable department cards"
          >
            {departmentFunctions.map((dept, index) => {
              const isSlideActive = index === activeMobileIdx;
              return (
                <article
                  key={dept.id}
                  className={`connected-mobile-slide ${isSlideActive ? "is-active" : ""}`}
                  aria-label={`${dept.funcName} comparison`}
                >
                  {/* Slide Header */}
                  <div className="connected-content-head">
                    <span className="connected-content-kicker">
                      {dept.category} · {dept.reference} · {dept.metric}
                    </span>
                    <h3 className="connected-content-headline">
                      {dept.headline}
                    </h3>
                    <p className="connected-content-lead">
                      {dept.lead}
                    </p>
                  </div>

                  {/* Dual Comparison Cards Stacked for Mobile */}
                  <div className="connected-comparison-grid">
                    {/* Fragmented Reality Card */}
                    <div className="connected-reality-card is-fragmented">
                      <div className="connected-card-top">
                        <div className="connected-card-badge is-warning">
                          <span className="connected-badge-icon" aria-hidden="true">✕</span>
                          <span>FRAGMENTED REALITY</span>
                        </div>
                        <span className="connected-tool-pill">
                          <span className="connected-tool-icon" aria-hidden="true">{dept.incompatibleToolIcon}</span>
                          <span>{dept.incompatibleToolName}</span>
                        </span>
                      </div>

                      <div className="connected-card-body">
                        <span className="connected-body-kicker">⚠️ DEPARTMENTAL BLIND SPOT</span>
                        <p className="connected-body-text">{dept.siloImpact}</p>
                      </div>

                      <div className="connected-card-footer is-severed">
                        <span className="connected-conduit-dot" aria-hidden="true" />
                        <span className="connected-conduit-label">SEVERED LINK:</span>
                        <span className="connected-conduit-val">{dept.severedStatus}</span>
                      </div>
                    </div>

                    {/* flowOne Connected Card */}
                    <div className="connected-reality-card is-connected">
                      <div className="connected-card-top">
                        <div className="connected-card-badge is-success">
                          <span className="connected-badge-icon" aria-hidden="true">✦</span>
                          <span>FLOWONE CONNECTED</span>
                        </div>
                        <span className="connected-tool-pill is-flowone">
                          <span className="connected-tool-spark" aria-hidden="true">✦</span>
                          <span>{dept.connectedToolName}</span>
                        </span>
                      </div>

                      <div className="connected-card-body">
                        <span className="connected-body-kicker is-blue">✦ SHARED CONTEXT BENEFIT</span>
                        <p className="connected-body-text is-dark">{dept.connectedBenefit}</p>
                      </div>

                      <div className="connected-card-footer is-active">
                        <span className="connected-conduit-dot is-blue" aria-hidden="true" />
                        <span className="connected-conduit-label is-blue">ACTIVE CONDUIT:</span>
                        <span className="connected-conduit-val is-blue">{dept.connectedLink}</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Telemetry Bar */}
                  <div className="connected-content-telemetry">
                    <span className="connected-telemetry-item">
                      <i className="connected-telemetry-dot" aria-hidden="true" />
                      <span>Single Source of Truth</span>
                    </span>
                    <span className="connected-telemetry-sep" aria-hidden="true">/</span>
                    <span className="connected-telemetry-item">
                      <strong>Zero Manual Re-Entry</strong>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Interactive Dots Scrubber */}
          <div className="connected-tabs-mobile-scrubber" aria-hidden="true">
            <div className="connected-tabs-mobile-dots">
              {departmentFunctions.map((dept, sIdx) => (
                <button
                  type="button"
                  key={dept.id}
                  className={`connected-tabs-mobile-dot ${sIdx === activeMobileIdx ? "is-active" : sIdx < activeMobileIdx ? "is-passed" : ""}`}
                  onClick={() => scrollToMobileIdx(sIdx)}
                  aria-label={`Jump to department ${dept.funcName}`}
                />
              ))}
            </div>
            <span className="connected-tabs-mobile-swipe-hint">
              Swipe cards horizontally or tap dots to explore all departments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ConnectedRealityNestedTabs;

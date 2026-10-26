import { memo, useState, useRef, useCallback } from "react";
import { Icon } from "./flowone";
import { departmentFunctions, DepartmentFunction } from "./connectedRealityData";

/* ==========================================================================
   Section 04: The Connected Reality — Suggestion 3: Streamlined Bento Matrix
   - Desktop (> 1024px): 3×2 Bento Grid with Hover/Tap specs reveal
   - Tablet (769px–1024px): 2×3 Balanced Bento Grid with generous breathing room
   - Mobile (<= 768px): Touch-Snap Bento Carousel + HUD Stepper + Tap-to-Reveal
   - Global Mode Switcher: ✕ Fragmented Reality vs ✦ flowOne Connected
   ========================================================================== */

export const ConnectedRealityBentoMatrix = memo(function ConnectedRealityBentoMatrix() {
  const [realityMode, setRealityMode] = useState<"connected" | "fragmented">("connected");
  const [expandedCardId, setExpandedCardId] = useState<string | null>("finance"); // Default open on finance
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const isConnected = realityMode === "connected";

  // Toggle card expansion (tap/click)
  const toggleExpandCard = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  // Mobile navigation
  const scrollToMobileSlide = useCallback((index: number) => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    const slides = el.querySelectorAll(".bento-mobile-card");
    const target = slides[index] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveMobileIdx(index);
    }
  }, []);

  const handleMobilePrev = () => {
    if (activeMobileIdx > 0) {
      scrollToMobileSlide(activeMobileIdx - 1);
    }
  };

  const handleMobileNext = () => {
    if (activeMobileIdx < departmentFunctions.length - 1) {
      scrollToMobileSlide(activeMobileIdx + 1);
    }
  };

  // Real-time mobile scroll synchronization
  const handleMobileScroll = useCallback(() => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      const scrollLeft = el.scrollLeft;
      const firstSlide = el.querySelector(".bento-mobile-card") as HTMLElement | null;
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth + 12;
        const idx = Math.min(
          departmentFunctions.length - 1,
          Math.max(0, Math.round(scrollLeft / slideWidth))
        );
        if (idx !== activeMobileIdx) {
          setActiveMobileIdx(idx);
        }
      }
    }
  }, [activeMobileIdx]);

  return (
    <section
      id="connected-reality-bento-section"
      className={`new-home-section connected-bento-section is-mode-${realityMode}`}
      aria-labelledby="bento-matrix-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            1. SECTION HEADER (Clean, Left-Aligned)
            ============================================================== */}
        <div className="bento-intro">
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

          <div className="bento-header-row">
            <div className="bento-header-left">
              <h2 id="bento-matrix-heading" className="bento-title">
                The transaction is connected.<br />
                The systems usually aren’t.
              </h2>
              <p className="bento-desc">
                Commercial, operations, finance, tax, collections, and banking form six operational pillars.
                Explore the streamlined bento matrix below to inspect the disconnected silo vs. flowOne unified context.
              </p>
            </div>

            {/* REALITY MODE SEGMENTED TOGGLE */}
            <div className="bento-toggle-wrapper">
              <div
                className="bento-mode-toggle"
                role="group"
                aria-label="Toggle between Fragmented Reality and flowOne Connected"
              >
                <button
                  type="button"
                  className={`bento-toggle-btn is-fragmented ${!isConnected ? "is-active" : ""}`}
                  onClick={() => setRealityMode("fragmented")}
                  aria-pressed={!isConnected}
                >
                  <span className="bento-toggle-icon" aria-hidden="true">✕</span>
                  <span>Fragmented Reality</span>
                </button>
                <button
                  type="button"
                  className={`bento-toggle-btn is-connected ${isConnected ? "is-active" : ""}`}
                  onClick={() => setRealityMode("connected")}
                  aria-pressed={isConnected}
                >
                  <span className="bento-toggle-spark" aria-hidden="true">✦</span>
                  <span>flowOne Connected</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==============================================================
            2. DESKTOP & TABLET BENTO GRID
            - Desktop (> 1024px): 3 Columns × 2 Rows
            - Tablet (769px–1024px): 2 Columns × 3 Rows
            ============================================================== */}
        <div className="bento-grid-wrapper bento-desktop-tablet-view" role="region" aria-label="Bento department matrix">
          <div className="bento-grid-track">
            {departmentFunctions.map((dept) => {
              const isExpanded = expandedCardId === dept.id;

              return (
                <article
                  key={dept.id}
                  className={`bento-tile ${isExpanded ? "is-expanded" : ""} ${isConnected ? "is-connected" : "is-fragmented"}`}
                  onClick={() => toggleExpandCard(dept.id)}
                  aria-expanded={isExpanded}
                >
                  {/* Tile Top Bar: Step Code + Name + Tool Pill */}
                  <div className="bento-tile-top">
                    <div className="bento-tile-identity">
                      <span className="bento-tile-code">{dept.funcCode}</span>
                      <strong className="bento-tile-name">{dept.funcName}</strong>
                    </div>

                    <span className={`bento-tile-pill ${isConnected ? "is-connected" : "is-fragmented"}`}>
                      {isConnected ? (
                        <>
                          <span className="bento-pill-spark">✦</span>
                          <span>{dept.connectedBadge}</span>
                        </>
                      ) : (
                        <>
                          <span className="bento-pill-icon">{dept.incompatibleToolIcon}</span>
                          <span>{dept.fragmentedBadge}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Tile Primary Impact Statement */}
                  <div className="bento-tile-body">
                    <p className="bento-tile-impact">
                      {isConnected ? dept.connectedBenefit : dept.siloImpact}
                    </p>
                  </div>

                  {/* Tile Drawer Toggle Hint */}
                  <div className="bento-tile-drawer-hint" aria-hidden="true">
                    <span className="bento-hint-text">
                      {dept.reference} · {dept.metric}
                    </span>
                    <span className={`bento-hint-arrow ${isExpanded ? "is-open" : ""}`}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>

                  {/* Expandable Spec Drawer (Reveals on Hover/Tap) */}
                  <div className={`bento-tile-drawer ${isExpanded ? "is-open" : ""}`}>
                    <div className="bento-drawer-inner">
                      <div className="bento-drawer-row">
                        <span className="bento-drawer-label">TRANSIT OBJECT:</span>
                        <strong className="bento-drawer-val">{dept.objectName} ({dept.reference})</strong>
                      </div>
                      <div className="bento-drawer-row">
                        <span className="bento-drawer-label">
                          {isConnected ? "ACTIVE CONDUIT:" : "SEVERED LINK:"}
                        </span>
                        <span className={`bento-drawer-val ${isConnected ? "is-blue" : "is-red"}`}>
                          {isConnected ? dept.connectedLink : dept.severedStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            3. MOBILE BENTO CAROUSEL (<= 768px)
            Zero-scroll trap: Single ~400px swipeable block + HUD Stepper + Tap Reveal
            ============================================================== */}
        <div className="bento-mobile-view" aria-label="Mobile bento carousel">
          {/* Top HUD Stepper */}
          <div className="bento-mobile-hud">
            <div className="bento-mobile-hud-meta">
              <span className={`bento-mobile-beacon ${isConnected ? "is-connected" : "is-fragmented"}`} aria-hidden="true" />
              <span className="bento-mobile-hud-title">
                Dept {activeMobileIdx + 1} of {departmentFunctions.length} · <strong>{departmentFunctions[activeMobileIdx].funcName}</strong>
              </span>
            </div>

            <div className="bento-mobile-hud-actions">
              <button
                type="button"
                className="bento-mobile-nav-btn"
                onClick={handleMobilePrev}
                disabled={activeMobileIdx === 0}
                aria-label="Previous department"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                className="bento-mobile-nav-btn"
                onClick={handleMobileNext}
                disabled={activeMobileIdx === departmentFunctions.length - 1}
                aria-label="Next department"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Touch-Snap Carousel Track */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="bento-mobile-carousel-track"
            role="region"
            aria-label="Swipeable bento cards"
          >
            {departmentFunctions.map((dept, index) => {
              const isSlideActive = index === activeMobileIdx;
              const isExpanded = expandedCardId === dept.id;

              return (
                <article
                  key={dept.id}
                  className={`bento-mobile-card ${isSlideActive ? "is-active" : ""} ${isConnected ? "is-connected" : "is-fragmented"}`}
                  onClick={() => toggleExpandCard(dept.id)}
                  aria-label={`${dept.funcName} card`}
                >
                  {/* Top Bar */}
                  <div className="bento-tile-top">
                    <div className="bento-tile-identity">
                      <span className="bento-tile-code">{dept.funcCode}</span>
                      <strong className="bento-tile-name">{dept.funcName}</strong>
                    </div>

                    <span className={`bento-tile-pill ${isConnected ? "is-connected" : "is-fragmented"}`}>
                      {isConnected ? (
                        <>
                          <span className="bento-pill-spark">✦</span>
                          <span>{dept.connectedBadge}</span>
                        </>
                      ) : (
                        <>
                          <span className="bento-pill-icon">{dept.incompatibleToolIcon}</span>
                          <span>{dept.fragmentedBadge}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Impact Statement */}
                  <div className="bento-tile-body">
                    <p className="bento-tile-impact">
                      {isConnected ? dept.connectedBenefit : dept.siloImpact}
                    </p>
                  </div>

                  {/* Tap to Reveal Drawer Trigger */}
                  <div className="bento-tile-drawer-hint">
                    <span className="bento-hint-text">
                      {dept.reference} · {dept.metric}
                    </span>
                    <span className={`bento-hint-arrow ${isExpanded ? "is-open" : ""}`}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>

                  {/* Drawer */}
                  <div className={`bento-tile-drawer ${isExpanded ? "is-open" : ""}`}>
                    <div className="bento-drawer-inner">
                      <div className="bento-drawer-row">
                        <span className="bento-drawer-label">TRANSIT OBJECT:</span>
                        <strong className="bento-drawer-val">{dept.objectName} ({dept.reference})</strong>
                      </div>
                      <div className="bento-drawer-row">
                        <span className="bento-drawer-label">
                          {isConnected ? "ACTIVE CONDUIT:" : "SEVERED LINK:"}
                        </span>
                        <span className={`bento-drawer-val ${isConnected ? "is-blue" : "is-red"}`}>
                          {isConnected ? dept.connectedLink : dept.severedStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Interactive Dots Scrubber */}
          <div className="bento-mobile-scrubber" aria-hidden="true">
            <div className="bento-mobile-dots">
              {departmentFunctions.map((dept, sIdx) => (
                <button
                  type="button"
                  key={dept.id}
                  className={`bento-mobile-dot ${sIdx === activeMobileIdx ? "is-active" : sIdx < activeMobileIdx ? "is-passed" : ""}`}
                  onClick={() => scrollToMobileSlide(sIdx)}
                  aria-label={`Jump to department ${dept.funcName}`}
                />
              ))}
            </div>
            <span className="bento-mobile-swipe-hint">
              Swipe cards or tap to expand conduit specs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ConnectedRealityBentoMatrix;

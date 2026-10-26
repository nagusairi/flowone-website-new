import { memo, useState, useRef, useCallback } from "react";
import { Icon } from "./flowone";
import { stackCardsData } from "./transactionCardsData";

/* ==========================================================================
   Section 03: Living Transaction — Option C: Streamlined Stacking Deck
   - Desktop: Full section layout + spacious 2-column stacking deck
   - Mobile: World-Class Horizontal Touch-Snap Carousel (Pattern 1)
     • Zero scroll trap: single fixed-height block (~480px)
     • Native touch scroll-snap (88vw cards with peek of next card)
     • Mobile HUD stepper (‹ Prev / Next ›) + live stage beacon
     • 10 interactive progress dots with touch jump & swipe hint
   - Signals / Horizontal stage rail removed (direct sticky docking at 5rem)
   - "TXN-10482 · ₹5,90,000 TOTAL CONTRACT" moved under card left title,
     placed directly next to TXN pill (Screenshot 2 position)
   ========================================================================== */

export const LivingTransactionStackC = memo(function LivingTransactionStackC() {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Sync active mobile index on horizontal scroll
  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      const scrollLeft = el.scrollLeft;
      const firstCard = el.querySelector(".stack-c-card") as HTMLElement | null;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth + 14;
        const idx = Math.min(
          stackCardsData.length - 1,
          Math.max(0, Math.round(scrollLeft / cardWidth))
        );
        if (idx !== activeMobileIdx) {
          setActiveMobileIdx(idx);
        }
      }
    }
  }, [activeMobileIdx]);

  const scrollToStage = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".stack-c-card");
    const targetCard = cards[index] as HTMLElement | undefined;
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveMobileIdx(index);
    }
  };

  const handlePrev = () => {
    if (activeMobileIdx > 0) {
      scrollToStage(activeMobileIdx - 1);
    }
  };

  const handleNext = () => {
    if (activeMobileIdx < stackCardsData.length - 1) {
      scrollToStage(activeMobileIdx + 1);
    }
  };

  return (
    <section
      id="living-stack-c"
      className="new-home-section living-stack-c-section"
      aria-labelledby="stack-c-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            TOP: Full Section Editorial Header (Strict Left-Aligned)
            ============================================================== */}
        <header className="stack-c-header">
          <div className="hero-eyebrow-container" style={{ marginBottom: "1.15rem" }}>
            <div className="hero-modern-eyebrow is-static" role="note" aria-label="Living Transaction">
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>TRANSACTION</span>
              </span>
              <span className="hero-eyebrow-title">THE LIVING TRANSACTION</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <h2 id="stack-c-heading" className="stack-c-title">
            One transaction.<br />
            Connected from start to cash.
          </h2>

          <p className="stack-c-desc">
            Follow a ₹5,00,000 order across operations, finance, compliance, collections and cash.
            Each operational stage glides into a continuous, full-width executive workspace.
          </p>
        </header>

        {/* ==============================================================
            MOBILE-ONLY HUD STEPPER (Pattern 1 Controller)
            Visible on <= 768px, hidden on desktop.
            ============================================================== */}
        <div className="stack-c-mobile-hud" aria-label="Transaction stage mobile navigation">
          <div className="stack-c-mobile-hud-meta">
            <span className="stack-c-mobile-beacon" aria-hidden="true" />
            <span className="stack-c-mobile-hud-title">
              Stage {activeMobileIdx + 1} of 10 · <strong>{stackCardsData[activeMobileIdx].stageName}</strong>
            </span>
          </div>
          <div className="stack-c-mobile-hud-actions">
            <button
              type="button"
              className="stack-c-mobile-nav-btn"
              onClick={handlePrev}
              disabled={activeMobileIdx === 0}
              aria-label="Previous stage"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              className="stack-c-mobile-nav-btn"
              onClick={handleNext}
              disabled={activeMobileIdx === stackCardsData.length - 1}
              aria-label="Next stage"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ==============================================================
            CARDS TRACK
            - Desktop: Vertical Sticky Stacking Deck (5rem + index * 10px)
            - Mobile: Horizontal Touch-Snap Carousel (Pattern 1)
            ============================================================== */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="stack-c-deck-track"
          role="feed"
          aria-label="Stacked transaction stages deck"
        >
          {stackCardsData.map((card, index) => {
            // Desktop staggered top offset docks cleanly under the navbar
            const topOffset = `calc(5rem + ${index * 10}px)`;
            const zIndex = index + 1;

            return (
              <article
                key={card.id}
                id={`stack-c-card-${card.id}`}
                className={`stack-c-card stack-c-card--${card.id} ${index === activeMobileIdx ? "is-mobile-active" : ""}`}
                style={{
                  top: topOffset,
                  zIndex: zIndex,
                }}
                aria-label={`Stage ${card.stageNum}: ${card.title}`}
              >
                {/* 1. Clean Top Rim Tab */}
                <div className="stack-c-card-rim" aria-hidden="true">
                  <div className="stack-c-rim-left">
                    <span className="stack-c-rim-tag">
                      {card.stageName.toUpperCase()}
                    </span>
                    <span className="stack-c-rim-status-pill">
                      <span className="stack-c-rim-dot" />
                      <span>IN SYNC</span>
                    </span>
                  </div>
                  <div className="stack-c-rim-right">
                    <span className="stack-c-stage-step">Stage {card.stageIndex} of 10</span>
                  </div>
                </div>

                {/* 2. Main Card Body (2-column layout on Desktop, stacked on Mobile) */}
                <div className="stack-c-card-body">
                  {/* Left Column: Stage Narrative, Metadata & Progress */}
                  <div className="stack-c-card-left">
                    <div className="stack-c-card-headline-group">
                      <h3 className="stack-c-card-title">{card.title}</h3>
                      <p className="stack-c-card-lead">{card.lead}</p>
                    </div>

                    {/* Metadata & Status Pills Cluster with Total Contract Meta moved next to TXN pill */}
                    <div className="stack-c-pills-cluster">
                      {/* Primary TXN Pill */}
                      <span className="stack-c-pill is-blue">
                        TXN-10482
                      </span>

                      {/* Total Contract Pill moved here (Screenshot 2 position) */}
                      <span className="stack-c-pill is-contract">
                        <span className="stack-c-contract-dot" aria-hidden="true" />
                        <span>₹5,90,000 TOTAL CONTRACT</span>
                      </span>

                      {/* Remaining Stage Pills */}
                      {card.pills
                        .filter(pill => pill.text !== "TXN-10482")
                        .map((pill, pIdx) => (
                          <span key={pIdx} className={`stack-c-pill is-${pill.tone}`}>
                            {pill.text.startsWith("Status:") && card.statusDotTone && (
                              <i className={`stack-c-dot is-${card.statusDotTone}`} aria-hidden="true" />
                            )}
                            <span>{pill.text}</span>
                          </span>
                        ))}
                    </div>

                    {/* Stage Progress Dashes Footer (Desktop only) */}
                    <div className="stack-c-progress-footer">
                      <div className="stack-c-dashes-row" aria-hidden="true">
                        {Array.from({ length: 10 }).map((_, dIdx) => (
                          <span
                            key={dIdx}
                            className={`stack-c-dash ${dIdx < card.stageIndex ? "is-filled" : ""}`}
                          />
                        ))}
                      </div>
                      <span className="stack-c-stage-badge">
                        Stage {card.stageIndex} of 10 · {card.stageName}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Inner Living Shell Cockpit */}
                  <div className="stack-c-card-right">
                    <div className="stack-c-shell">
                      {/* Shell Topbar */}
                      <div className="stack-c-shell-top">
                        <strong className="stack-c-shell-heading">{card.shellHeaderTitle}</strong>
                        <span className={`stack-c-shell-badge is-${card.badgeTone}`}>
                          <span className="stack-c-spark-icon" aria-hidden="true">✦</span>
                          <span>{card.badgeLabel}</span>
                        </span>
                      </div>

                      {/* 4 Metric Boxes (2x2 Grid) */}
                      <div className="stack-c-metrics-grid">
                        {card.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="stack-c-metric-box">
                            <span className="stack-c-metric-label">{metric.label}</span>
                            <strong className="stack-c-metric-value">{metric.value}</strong>
                          </div>
                        ))}
                      </div>

                      {/* Connected Closure Callout Panel */}
                      <div className="stack-c-callout-panel">
                        <div className="stack-c-callout-icon-box" aria-hidden="true">
                          <Icon name="spark" size={16} tone="action" />
                        </div>
                        <div className="stack-c-callout-content">
                          <span className="stack-c-callout-kicker">{card.calloutKicker}</span>
                          <p className="stack-c-callout-text">{card.calloutText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ==============================================================
            MOBILE-ONLY SCRUBBER & DOTS (Pattern 1 Bottom Indicator)
            Visible on <= 768px, hidden on desktop.
            ============================================================== */}
        <div className="stack-c-mobile-scrubber" aria-hidden="true">
          <div className="stack-c-mobile-dots">
            {stackCardsData.map((stage, sIdx) => (
              <button
                type="button"
                key={stage.id}
                className={`stack-c-mobile-dot ${sIdx === activeMobileIdx ? "is-active" : sIdx < activeMobileIdx ? "is-passed" : ""}`}
                onClick={() => scrollToStage(sIdx)}
                aria-label={`Jump to stage ${stage.stageName}`}
              />
            ))}
          </div>
          <span className="stack-c-mobile-swipe-hint">
            Swipe cards horizontally or tap dots to explore all 10 stages
          </span>
        </div>
      </div>
    </section>
  );
});

export default LivingTransactionStackC;

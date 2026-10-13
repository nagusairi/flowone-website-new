import { memo, useState, useEffect } from "react";
import { Icon } from "./flowone";
import { stackCardsData as stackCards } from "./transactionCardsData";

/* ==========================================================================
   Section 03: Living Transaction — Option A: Sticky Stacking Cards (Two-Column)
   Left column is sticky with section narrative & quick stage jump buttons.
   Right column contains the 10 self-contained transaction stage cards that
   scroll up and stack on top of each other like a deck of cards.
   ========================================================================== */

/* ==========================================================================
   LivingTransactionStackA Component
   ========================================================================== */
export const LivingTransactionStackA = memo(function LivingTransactionStackA() {
  const [activeStageId, setActiveStageId] = useState<string>("order");

  // Track which card is currently in view using real-time viewport bounding rect
  useEffect(() => {
    const handleScroll = () => {
      // Docking line: where a card docks near top of viewport (~140px)
      const dockingThreshold = 140;
      let currentActive = stackCards[0].id;

      for (let i = 0; i < stackCards.length; i++) {
        const el = document.getElementById(`stack-card-${stackCards[i].id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // The highest index card that has arrived at or above the docking threshold is the active card
          if (rect.top <= dockingThreshold) {
            currentActive = stackCards[i].id;
          }
        }
      }

      setActiveStageId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="living-stack-a"
      className="new-home-section living-stack-a-section"
      aria-labelledby="stack-a-heading"
    >
      <div className="home-container">
        <div className="stack-a-layout">
          {/* ==============================================================
              LEFT COLUMN: Sticky Anchor & Progression Controls
              ============================================================== */}
          <aside className="stack-a-sticky-col">
            <div className="stack-a-intro">
              <div className="stack-a-eyebrow" role="note" aria-label="Living Transaction">
                <span className="stack-a-beacon" aria-hidden="true" />
                <span>LIVING TRANSACTION · OPTION A</span>
              </div>
              <h2 id="stack-a-heading" className="stack-a-title">
                One transaction.<br />
                Connected from start to cash.
              </h2>
              <p className="stack-a-desc">
                Follow a ₹5,00,000 order across operations, finance, compliance, collections and cash.
                Each operational stage stacks into a single, cohesive business reality.
              </p>
            </div>

            {/* Live Journey Progress Tracker */}
            <div className="stack-a-nav-steps" aria-label="10 sequential transaction stages progress">
              <span className="stack-a-nav-kicker">10 SEQUENTIAL TRANSACTION STAGES</span>
              <div className="stack-a-nav-list">
                {stackCards.map((card) => {
                  const isActive = card.id === activeStageId;
                  return (
                    <div
                      key={card.id}
                      className={`stack-a-nav-btn ${isActive ? "is-active" : ""}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span className="stack-a-nav-num">{card.stageNum}</span>
                      <span className="stack-a-nav-name">{card.stageName}</span>
                      <span className="stack-a-nav-arrow" aria-hidden="true">→</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ==============================================================
              RIGHT COLUMN: Sticky Stacking Cards Deck (from bottom)
              Each card is self-contained and stacks incrementally!
              ============================================================== */}
          <div className="stack-a-cards-col" role="feed" aria-label="Transaction stages stacked deck">
            {stackCards.map((card, index) => {
              // Staggered top offset (5rem + 11px per card for compact above-the-fold clearance)
              const topOffset = `calc(5rem + ${index * 11}px)`;
              const zIndex = index + 1;

              return (
                <article
                  key={card.id}
                  id={`stack-card-${card.id}`}
                  className={`stack-a-card stack-a-card--${card.id}`}
                  style={{
                    top: topOffset,
                    zIndex: zIndex,
                  }}
                  aria-label={`Stage ${card.stageNum}: ${card.title}`}
                >
                  {/* Subtle top rim indicator for stacked cards */}
                  <div className="stack-a-card-rim" aria-hidden="true">
                    <span className="stack-a-rim-tag">
                      STAGE {card.stageNum} · {card.stageName.toUpperCase()}
                    </span>
                    <span className="stack-a-rim-sep">/</span>
                    <span className="stack-a-rim-value">TXN-10482 · ₹5,90,000</span>
                  </div>

                  {/* Stage Headline & Narrative + Right Flank Status Pills (Red marked area) */}
                  <header className="stack-a-card-header">
                    <div className="stack-a-header-title-block">
                      <h3 className="stack-a-card-title">{card.title}</h3>
                      <p className="stack-a-card-lead">{card.lead}</p>
                    </div>

                    {/* Metadata & Status Pills placed in right column beside the title */}
                    <div className="stack-a-pills-cluster">
                      {card.pills.map((pill, pIdx) => (
                        <span key={pIdx} className={`stack-a-pill is-${pill.tone}`}>
                          {pill.text.startsWith("Status:") && card.statusDotTone && (
                            <i className={`stack-a-dot is-${card.statusDotTone}`} aria-hidden="true" />
                          )}
                          <span>{pill.text}</span>
                        </span>
                      ))}
                    </div>
                  </header>

                  {/* Inner Living Card Shell (Exact structure as Image 1) */}
                  <div className="stack-a-shell">
                    {/* Shell Topbar */}
                    <div className="stack-a-shell-top">
                      <strong className="stack-a-shell-heading">{card.shellHeaderTitle}</strong>
                      <span className={`stack-a-shell-badge is-${card.badgeTone}`}>
                        <span className="stack-a-spark-icon" aria-hidden="true">✦</span>
                        <span>{card.badgeLabel}</span>
                      </span>
                    </div>

                    {/* 4 Metric Boxes (2x2 Grid) */}
                    <div className="stack-a-metrics-grid">
                      {card.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="stack-a-metric-box">
                          <span className="stack-a-metric-label">{metric.label}</span>
                          <strong className="stack-a-metric-value">{metric.value}</strong>
                        </div>
                      ))}
                    </div>

                    {/* Connected Closure Callout Panel */}
                    <div className="stack-a-callout-panel">
                      <div className="stack-a-callout-icon-box" aria-hidden="true">
                        <Icon name="spark" size={16} tone="action" />
                      </div>
                      <div className="stack-a-callout-content">
                        <span className="stack-a-callout-kicker">{card.calloutKicker}</span>
                        <p className="stack-a-callout-text">{card.calloutText}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators & Stage Counter Footer */}
                  <footer className="stack-a-card-footer">
                    <div className="stack-a-dashes-row" aria-hidden="true">
                      {Array.from({ length: 10 }).map((_, dIdx) => (
                        <span
                          key={dIdx}
                          className={`stack-a-dash ${dIdx < card.stageIndex ? "is-filled" : ""}`}
                        />
                      ))}
                    </div>
                    <span className="stack-a-stage-counter">
                      Stage {card.stageIndex} of 10 · {card.stageName}
                    </span>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default LivingTransactionStackA;

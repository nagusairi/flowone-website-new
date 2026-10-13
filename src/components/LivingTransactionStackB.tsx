import { memo, useState, useEffect, useRef } from "react";
import { Icon } from "./flowone";
import { stackCardsData } from "./transactionCardsData";

/* ==========================================================================
   Section 03: Living Transaction — Option B: Full-Width Stacking Deck
   Header is centered / editorial with full-width horizontal stage navigator.
   Cards span full width across the container, featuring a spacious dual-flank
   cockpit layout (narrative + living shell) and sticky cascading deck.
   ========================================================================== */

export const LivingTransactionStackB = memo(function LivingTransactionStackB() {
  const [activeStageId, setActiveStageId] = useState<string>("order");
  const railRef = useRef<HTMLDivElement>(null);

  // Track which card is currently in view and synchronize rail when Card 10 scrolls with page
  useEffect(() => {
    const handleScroll = () => {
      // Base docking line: where card 0 docks below the sticky rail (8.25rem = 132px)
      const baseDockingOffset = 132;
      let currentActive = stackCardsData[0].id;

      for (let i = 0; i < stackCardsData.length; i++) {
        const el = document.getElementById(`stack-b-card-${stackCardsData[i].id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Each card i docks at (baseDockingOffset + i * 10)px
          const targetDockTop = baseDockingOffset + i * 10;
          if (rect.top <= targetDockTop + 10) {
            currentActive = stackCardsData[i].id;
          }
        }
      }

      setActiveStageId(currentActive);

      // Lock-step exit scroll: when the final card (Card 10 Decision) reaches its end
      // and starts scrolling with the page, synchronize the sticky stage rail to scroll
      // upward at the exact same 1:1 rate so they travel together as a unified unit.
      const lastCard = document.getElementById("stack-b-card-decision");
      if (lastCard && railRef.current) {
        const rect10 = lastCard.getBoundingClientRect();
        const dockedTop10 = baseDockingOffset + (stackCardsData.length - 1) * 10; // 222px
        if (rect10.top < dockedTop10) {
          const delta = dockedTop10 - rect10.top;
          railRef.current.style.transform = `translateY(-${delta}px)`;
        } else {
          railRef.current.style.transform = "translateY(0)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safely auto-scroll horizontal rail scroller if active pill moves outside viewport (mobile/tablet)
  useEffect(() => {
    const scroller = document.querySelector(".stack-b-rail-scroller");
    const activePill = scroller?.querySelector(".stack-b-rail-pill.is-active") as HTMLElement | null;
    if (scroller && activePill) {
      const scrollerRect = scroller.getBoundingClientRect();
      const pillRect = activePill.getBoundingClientRect();
      if (pillRect.left < scrollerRect.left || pillRect.right > scrollerRect.right) {
        scroller.scrollTo({
          left: activePill.offsetLeft - scroller.clientWidth / 2 + activePill.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeStageId]);

  return (
    <section
      id="living-stack-b"
      className="new-home-section living-stack-b-section"
      aria-labelledby="stack-b-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            TOP: Full-Width Editorial Header
            ============================================================== */}
        <header className="stack-b-header">
          <div className="stack-b-eyebrow" role="note" aria-label="Living Transaction">
            <span className="stack-b-beacon" aria-hidden="true" />
            <span>LIVING TRANSACTION</span>
          </div>

          <h2 id="stack-b-heading" className="stack-b-title">
            One transaction.<br />
            Connected from start to cash.
          </h2>

          <p className="stack-b-desc">
            Follow a ₹5,00,000 order across operations, finance, compliance, collections and cash.
            Each operational stage glides into a continuous, full-width executive workspace.
          </p>
        </header>

        {/* ==============================================================
            STICKY HORIZON STAGE RAIL
            Floats cleanly beneath the navbar as user scrolls through stages
            ============================================================== */}
        <div ref={railRef} className="stack-b-stage-rail-sticky" aria-label="10 sequential transaction stages horizontal tracker">
          <div className="stack-b-stage-rail">
            <div className="stack-b-rail-scroller">
              {stackCardsData.map((card, idx) => {
                const isActive = card.id === activeStageId;
                const activeIdx = stackCardsData.findIndex(c => c.id === activeStageId);
                const isCompleted = idx < activeIdx;

                const handlePillClick = () => {
                  const el = document.getElementById(`stack-b-card-${card.id}`);
                  if (el) {
                    const yOffset = -135;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                };

                return (
                  <button
                    type="button"
                    key={card.id}
                    className={`stack-b-rail-pill ${isActive ? "is-active" : ""} ${isCompleted ? "is-completed" : ""}`}
                    onClick={handlePillClick}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Jump to stage ${card.stageName}: ${isCompleted ? "Completed" : isActive ? "Active" : "Upcoming"}`}
                  >
                    {/* Interactive visual cue replacing raw stage numbers */}
                    <span className="stack-b-rail-cue" aria-hidden="true">
                      {isCompleted ? (
                        <svg className="stack-b-cue-check" width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : isActive ? (
                        <span className="stack-b-cue-beacon">
                          <span className="stack-b-cue-pulse" />
                          <span className="stack-b-cue-dot" />
                        </span>
                      ) : (
                        <span className="stack-b-cue-ring" />
                      )}
                    </span>
                    <span className="stack-b-rail-name">{card.stageName}</span>
                    {idx < stackCardsData.length - 1 && (
                      <span className="stack-b-rail-sep" aria-hidden="true">→</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==============================================================
            FULL-WIDTH STACKING CARDS DECK
            Cards span full width and stack incrementally on scroll!
            ============================================================== */}
        <div className="stack-b-deck-track" role="feed" aria-label="Full-width stacked transaction stages deck">
          {stackCardsData.map((card, index) => {
            // Staggered top offset docks cleanly under the sticky rail (8.25rem + 10px per card)
            const topOffset = `calc(8.25rem + ${index * 10}px)`;
            const zIndex = index + 1;

            return (
              <article
                key={card.id}
                id={`stack-b-card-${card.id}`}
                className={`stack-b-card stack-b-card--${card.id}`}
                style={{
                  top: topOffset,
                  zIndex: zIndex,
                }}
                aria-label={`Stage ${card.stageNum}: ${card.title}`}
              >
                {/* Clean Top Rim Tab (Identifies card when stacked with zero repetitive text) */}
                <div className="stack-b-card-rim" aria-hidden="true">
                  <div className="stack-b-rim-left">
                    <span className="stack-b-rim-tag">
                      {card.stageName.toUpperCase()}
                    </span>
                    <span className="stack-b-rim-status-pill">
                      <span className="stack-b-rim-dot" />
                      <span>IN SYNC</span>
                    </span>
                  </div>
                  <div className="stack-b-rim-right">
                    <span className="stack-b-rim-meta">TXN-10482 · ₹5,90,000 TOTAL CONTRACT</span>
                  </div>
                </div>

                {/* Main Card Body (Spacious 2-column wide layout) */}
                <div className="stack-b-card-body">
                  {/* Left Column: Stage Narrative, Metadata & Progress */}
                  <div className="stack-b-card-left">
                    <div className="stack-b-card-headline-group">
                      <h3 className="stack-b-card-title">{card.title}</h3>
                      <p className="stack-b-card-lead">{card.lead}</p>
                    </div>

                    {/* Metadata & Status Pills Cluster */}
                    <div className="stack-b-pills-cluster">
                      {card.pills.map((pill, pIdx) => (
                        <span key={pIdx} className={`stack-b-pill is-${pill.tone}`}>
                          {pill.text.startsWith("Status:") && card.statusDotTone && (
                            <i className={`stack-b-dot is-${card.statusDotTone}`} aria-hidden="true" />
                          )}
                          <span>{pill.text}</span>
                        </span>
                      ))}
                    </div>

                    {/* Stage Progress Dashes Footer */}
                    <div className="stack-b-progress-footer">
                      <div className="stack-b-dashes-row" aria-hidden="true">
                        {Array.from({ length: 10 }).map((_, dIdx) => (
                          <span
                            key={dIdx}
                            className={`stack-b-dash ${dIdx < card.stageIndex ? "is-filled" : ""}`}
                          />
                        ))}
                      </div>
                      <span className="stack-b-stage-badge">
                        Stage {card.stageIndex} of 10 · {card.stageName}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Inner Living Shell Cockpit */}
                  <div className="stack-b-card-right">
                    <div className="stack-b-shell">
                      {/* Shell Topbar */}
                      <div className="stack-b-shell-top">
                        <strong className="stack-b-shell-heading">{card.shellHeaderTitle}</strong>
                        <span className={`stack-b-shell-badge is-${card.badgeTone}`}>
                          <span className="stack-b-spark-icon" aria-hidden="true">✦</span>
                          <span>{card.badgeLabel}</span>
                        </span>
                      </div>

                      {/* 4 Metric Boxes (2x2 Grid) */}
                      <div className="stack-b-metrics-grid">
                        {card.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="stack-b-metric-box">
                            <span className="stack-b-metric-label">{metric.label}</span>
                            <strong className="stack-b-metric-value">{metric.value}</strong>
                          </div>
                        ))}
                      </div>

                      {/* Connected Closure Callout Panel */}
                      <div className="stack-b-callout-panel">
                        <div className="stack-b-callout-icon-box" aria-hidden="true">
                          <Icon name="spark" size={16} tone="action" />
                        </div>
                        <div className="stack-b-callout-content">
                          <span className="stack-b-callout-kicker">{card.calloutKicker}</span>
                          <p className="stack-b-callout-text">{card.calloutText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default LivingTransactionStackB;

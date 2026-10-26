import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIInvoiceContextCard from "./AIInvoiceContextCard";
import AIStageLottieIcon from "./AIStageLottieIcon";
import { aiAdvantageStages } from "./aiAdvantageData";
import "./ai-advantage-unfolds.css";

export interface AIAdvantageIntelligenceUnfoldsViewProps {
  beforeSectionBg?: string; // Preceding section color (Section 04: #F8FAFC)
  afterSectionBg?: string;  // Following section color (#FAFBFD)
  className?: string;
}

export const AIAdvantageIntelligenceUnfoldsView = memo(
  function AIAdvantageIntelligenceUnfoldsView({
    beforeSectionBg = "#F8FAFC",
    afterSectionBg = "#FAFBFD",
    className = "",
  }: AIAdvantageIntelligenceUnfoldsViewProps) {
    const [activeStageIndex, setActiveStageIndex] = useState(0);
    const [actionExecuted, setActionExecuted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const invoiceColRef = useRef<HTMLElement>(null);
    const isManualClickRef = useRef(false);

    const activeStage = aiAdvantageStages[activeStageIndex] || aiAdvantageStages[0];

    // Jump to specific cognitive stage
    const handleJumpToStage = useCallback((index: number) => {
      isManualClickRef.current = true;
      setActiveStageIndex(index);

      // On desktop, also smooth scroll to the section's corresponding scroll slice
      const section = sectionRef.current;
      if (section && window.innerWidth >= 1080) {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const totalDistance = rect.height - window.innerHeight;
        if (totalDistance > 0) {
          const targetY = sectionTop + (index / (aiAdvantageStages.length - 1)) * totalDistance;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }

      window.setTimeout(() => {
        isManualClickRef.current = false;
      }, 700);
    }, []);

    // Interactive Stage 06 execution trigger
    const handleExecuteAction = useCallback(() => {
      setActionExecuted(true);
    }, []);

    // Section-local scroll progression mapping to the 6 intelligence stages
    useEffect(() => {
      let isUnmounted = false;

      const handleScroll = () => {
        if (isManualClickRef.current || isUnmounted) return;
        const section = sectionRef.current;
        if (!section) return;

        // On mobile/tablet, rely primarily on the stepper or standard view
        if (window.innerWidth < 1080) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalDistance = rect.height - windowHeight;
        if (totalDistance <= 0) return;

        // Current scroll progress within section [0, 1]
        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalDistance));

        // Map progress across the 6 stages
        const stageIndex = Math.min(
          aiAdvantageStages.length - 1,
          Math.floor(progress * aiAdvantageStages.length)
        );

        setActiveStageIndex(stageIndex);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => {
        isUnmounted = true;
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <section
        id="section-ai-advantage-unfolds"
        ref={sectionRef}
        className={`new-home-section fo-ai-unfolds-section ${className}`}
        aria-labelledby="fo-ai-unfolds-heading"
      >
        {/* Top Animated Wave Divider */}
        <AIWaveDivider
          position="top"
          fillColor={beforeSectionBg}
          height={18}
          durationSeconds={35}
        />

        {/* Pinned Viewport Wrapper for Desktop Scroll Progression */}
        <div className="fo-ai-unfolds__pin-wrapper">
          <div className="home-container fo-ai-unfolds__container">
            {/* Section Editorial Header */}
            <header className="fo-ai-unfolds__header">
              <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
                <div
                  className="hero-modern-eyebrow is-static"
                  role="note"
                  aria-label="AI Advantage · The Intelligence Moment"
                >
                  <span className="hero-eyebrow-badge">
                    <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                    <span>AI ADVANTAGE</span>
                  </span>
                  <span className="hero-eyebrow-title">THE INTELLIGENCE MOMENT</span>
                  <span className="hero-eyebrow-arrow" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              <h2 id="fo-ai-unfolds-heading" className="fo-ai-unfolds__headline">
                AI that understands the whole business.
              </h2>

              <p className="fo-ai-unfolds__copy">
                From transaction details to predicted outcomes, flowOne AI connects the
                signals that help teams decide what happens next.
              </p>
            </header>

            {/* Two-Column Living Intelligence Workspace */}
            <div className="fo-ai-unfolds__workspace">
              {/* LEFT COLUMN: Persistent Business Object (Sticky Invoice Anchor) */}
              <div className="fo-ai-unfolds__invoice-col">
                <AIInvoiceContextCard
                  ref={invoiceColRef}
                  activeStageIndex={activeStageIndex}
                  activeStageName={activeStage.stepName}
                  onSelectStage={handleJumpToStage}
                />
              </div>

              {/* RIGHT COLUMN: Layered Stacking Intelligence Panels Deck */}
              <div className="fo-ai-unfolds__progression-col">
                {/* Sticky Cognitive Stage Stepper */}
                <div
                  id="fo-ai-unfolds-stepper"
                  className="fo-ai-unfolds__stepper"
                  role="tablist"
                  aria-label="Cognitive Stages Progression"
                >
                  <div className="fo-ai-unfolds__stepper-track">
                    {aiAdvantageStages.map((stg, sIdx) => {
                      const isActive = activeStageIndex === sIdx;
                      const isComplete = sIdx < activeStageIndex;
                      return (
                        <button
                          key={stg.stepName}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`fo-ai-unfolds__stepper-btn ${
                            isActive ? "is-active" : isComplete ? "is-complete" : ""
                          }`}
                          onClick={() => handleJumpToStage(sIdx)}
                        >
                          <span className="fo-ai-unfolds__stepper-num">0{sIdx + 1}</span>
                          <span className="fo-ai-unfolds__stepper-label">{stg.stepName}</span>
                          {isComplete && (
                            <span className="fo-ai-unfolds__stepper-check" aria-hidden="true">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layered Stack of Six Intelligence Panels */}
                <div
                  className="fo-ai-unfolds__deck"
                  role="feed"
                  aria-label="Progressive Intelligence Panels"
                >
                  {aiAdvantageStages.map((stage, index) => {
                    const isActive = index === activeStageIndex;
                    const isReceded = index < activeStageIndex;
                    const isUpcoming = index > activeStageIndex;

                    // Physical Deck Depth Stacking Styles
                    let stackStyle: React.CSSProperties = {};
                    let stateClass = "is-active";

                    if (isActive) {
                      stateClass = "is-active";
                      stackStyle = {
                        transform: "translateY(0) scale(1)",
                        opacity: 1,
                        zIndex: 30,
                      };
                    } else if (isReceded) {
                      stateClass = "is-receded";
                      const depth = activeStageIndex - index;
                      const yOffset = -depth * 14;
                      const scale = Math.max(0.88, 1 - depth * 0.035);
                      const opacity = Math.max(0.25, 0.65 - depth * 0.15);
                      stackStyle = {
                        transform: `translateY(${yOffset}px) scale(${scale})`,
                        opacity,
                        zIndex: 10 + index,
                      };
                    } else if (isUpcoming) {
                      stateClass = "is-upcoming";
                      stackStyle = {
                        transform: "translateY(32px) scale(0.96)",
                        opacity: 0,
                        zIndex: 5,
                      };
                    }

                    return (
                      <article
                        key={stage.stepName}
                        id={`fo-ai-unfold-card-${index}`}
                        className={`fo-ai-unfolds__stage-card fo-ai-card--${stage.stepName.toLowerCase()} ${stateClass}`}
                        style={stackStyle}
                        aria-hidden={isUpcoming ? true : undefined}
                        aria-current={isActive ? "step" : undefined}
                        aria-label={`AI Stage 0${index + 1}: ${stage.title}`}
                      >
                        {/* Dynamic ambient corner glow */}
                        <div
                          className={`fo-ai-unfolds__stage-glow ${
                            stage.stepName === "ACT" ? "fo-ai-unfolds__stage-glow--magenta" : ""
                          }`}
                          aria-hidden="true"
                        />

                        <div className="fo-ai-unfolds__stage-inner">
                          {/* Card Header with Kicker & Lottie Icon on Active Card */}
                          <div className="fo-ai-unfolds__card-header">
                            <div className="fo-ai-unfolds__kicker-group">
                              {/* Lottie Instance 2: Active Panel Heading Only */}
                              {isActive ? (
                                <AIStageLottieIcon isActive={true} size={24} />
                              ) : (
                                <span
                                  className="fo-ai-unfolds__static-spark"
                                  aria-hidden="true"
                                >
                                  ✦
                                </span>
                              )}
                              <span className="fo-ai-unfolds__kicker">{stage.kicker}</span>
                            </div>

                            <span
                              className={`fo-ai-unfolds__badge ${
                                stage.stepName === "ACT" ? "fo-ai-unfolds__badge--act" : ""
                              }`}
                            >
                              {stage.badgeLabel}
                            </span>
                          </div>

                          {/* Title & Narrative Explanation */}
                          <h3 className="fo-ai-unfolds__card-title">{stage.title}</h3>
                          <p className="fo-ai-unfolds__card-summary">{stage.summary}</p>

                          {/* 2-Column Restrained Metrics Grid */}
                          <div className="fo-ai-unfolds__metrics-grid">
                            {stage.metrics.slice(0, 2).map((metric) => (
                              <div key={metric.label} className="fo-ai-unfolds__metric-box">
                                <span className="fo-ai-unfolds__metric-label">
                                  {metric.label}
                                </span>
                                <strong className="fo-ai-unfolds__metric-val">
                                  {metric.value}
                                </strong>
                              </div>
                            ))}
                          </div>

                          {/* Relevant Contextual Details (1-2 Key Details) */}
                          <div className="fo-ai-unfolds__details-box">
                            <span className="fo-ai-unfolds__details-title">
                              CONTEXTUAL TRANSACTION LINEAGE
                            </span>
                            <div className="fo-ai-unfolds__details-list">
                              {stage.details.slice(0, 2).map((detail) => (
                                <div key={detail.label} className="fo-ai-unfolds__detail-row">
                                  <span className="fo-ai-unfolds__detail-label">
                                    {detail.label}
                                  </span>
                                  <span className="fo-ai-unfolds__detail-val">
                                    {detail.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stage 06 Execution Action Block */}
                          {stage.actionBlock && (
                            <div className="fo-ai-unfolds__action-card">
                              <div className="fo-ai-unfolds__action-status">
                                <span
                                  className="fo-ai-unfolds__action-status-dot"
                                  aria-hidden="true"
                                />
                                <span>{stage.actionBlock.status}</span>
                              </div>

                              <h4 className="fo-ai-unfolds__action-headline">
                                {stage.actionBlock.headline}
                              </h4>
                              <p className="fo-ai-unfolds__action-subhead">
                                {stage.actionBlock.subhead}
                              </p>

                              <div className="fo-ai-unfolds__action-buttons">
                                {actionExecuted ? (
                                  <div className="fo-ai-unfolds__action-executed">
                                    <span aria-hidden="true">✓</span>
                                    <span>
                                      Action Dispatched · Autonomous Recovery Rails Armed
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="fo-ai-unfolds__btn-primary"
                                      onClick={handleExecuteAction}
                                    >
                                      <span>{stage.actionBlock.primaryCta}</span>
                                      <span aria-hidden="true">→</span>
                                    </button>
                                    <button
                                      type="button"
                                      className="fo-ai-unfolds__btn-secondary"
                                      onClick={handleExecuteAction}
                                    >
                                      <span>{stage.actionBlock.secondaryCta}</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Panel Governance Footer */}
                          <div className="fo-ai-unfolds__workbench-footer">
                            <div className="fo-ai-unfolds__footer-shield">
                              <span aria-hidden="true">🛡</span>
                              <span>Operator Governance · Grounded in TXN-10482 Context</span>
                            </div>
                            <div className="fo-ai-unfolds__footer-tag">
                              Deterministic Lineage · Guardrails Active
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Animated Wave Divider */}
        <AIWaveDivider
          position="bottom"
          fillColor={afterSectionBg}
          height={18}
          durationSeconds={35}
        />
      </section>
    );
  }
);

export default AIAdvantageIntelligenceUnfoldsView;

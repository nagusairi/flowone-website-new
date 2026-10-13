import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import AIWaveDivider from "./AIWaveDivider";
import AIInvoiceContextCard from "./AIInvoiceContextCard";
import AIIntelligenceCard from "./AIIntelligenceCard";
import { aiAdvantageStages } from "./aiAdvantageData";

export interface AIAdvantageSectionProps {
  beforeSectionBg?: string; // Color of preceding section (Section 04: #F8FAFC)
  afterSectionBg?: string; // Color of subsequent section / footer (#041938)
  className?: string;
}

export const AIAdvantageSection = memo(function AIAdvantageSection({
  beforeSectionBg = "#F8FAFC",
  afterSectionBg = "#041938",
  className = "",
}: AIAdvantageSectionProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [actionExecuted, setActionExecuted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const invoiceColRef = useRef<HTMLElement>(null);

  const activeStage = aiAdvantageStages[activeStageIndex] || aiAdvantageStages[0];

  // Section 03 Option A Reference Mechanics + Option B Lock-Step Exit Scroll
  useEffect(() => {
    const handleScroll = () => {
      // Docking line: cards dock at top: 204px directly under sticky stepper
      const dockingThreshold = 206;
      let currentActive = 0;

      for (let i = 0; i < aiAdvantageStages.length; i++) {
        const el = document.getElementById(`fo-ai-card-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Highest index card arrived at or above docking threshold is the active card
          if (rect.top <= dockingThreshold) {
            currentActive = i;
          }
        }
      }

      setActiveStageIndex(currentActive);

      // Lock-step exit scroll: when the final card (Card 06 / Stage 06 Act) finishes its dwell
      // and begins scrolling upward with the page, synchronize the Top Button Stack (stepper),
      // the left invoice column, and EVERY SLIDE in the stack so all cards scroll along at once as one unit!
      const lastCard = document.getElementById(`fo-ai-card-${aiAdvantageStages.length - 1}`);
      if (lastCard) {
        const rectLast = lastCard.getBoundingClientRect();
        // Docked position for all cards is 204px
        const dockedTop = 204;
        if (rectLast.top < dockedTop) {
          const delta = dockedTop - rectLast.top;
          if (stepperRef.current) {
            stepperRef.current.style.transform = `translateY(-${delta}px)`;
          }
          if (invoiceColRef.current) {
            invoiceColRef.current.style.transform = `translateY(-${delta}px)`;
          }
          // Synchronize every earlier card in the stack so all cards scroll along together at once
          for (let i = 0; i < aiAdvantageStages.length - 1; i++) {
            const cardEl = document.getElementById(`fo-ai-card-${i}`);
            if (cardEl) {
              cardEl.style.transform = `translateY(-${delta}px)`;
            }
          }
        } else {
          if (stepperRef.current) {
            stepperRef.current.style.transform = "translateY(0)";
          }
          if (invoiceColRef.current) {
            invoiceColRef.current.style.transform = "translateY(0)";
          }
          for (let i = 0; i < aiAdvantageStages.length - 1; i++) {
            const cardEl = document.getElementById(`fo-ai-card-${i}`);
            if (cardEl) {
              cardEl.style.transform = "translateY(0)";
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to stage handler
  const handleJumpToStage = useCallback((index: number) => {
    setActiveStageIndex(index);
    const targetEl = document.getElementById(`fo-ai-card-${index}`);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - 204;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  }, []);

  const handleExecuteAction = useCallback(() => {
    setActionExecuted(true);
  }, []);

  return (
    <section
      id="section-ai-advantage"
      ref={sectionRef}
      className={`new-home-section fo-ai-advantage ${className}`}
      aria-labelledby="fo-ai-heading"
    >
      {/* ==============================================================
          1. TOP ANIMATED MULTI-LAYER WAVE DIVIDER
          Blends Section 04 (#F8FAFC) into Indigo Canvas
          ============================================================== */}
      <AIWaveDivider
        position="top"
        fillColor={beforeSectionBg}
        height={18}
        durationSeconds={35}
      />

      <div className="home-container fo-ai-advantage__container">
        {/* ==============================================================
            2. SECTION EDITORIAL HEADER
            Exact Approved Copy + FlowOne Brand Signature Gradient
            ============================================================== */}
        <div className="fo-ai-advantage__header">
          <div className="fo-ai-advantage__eyebrow" role="note" aria-label="AI Advantage">
            <span className="fo-ai-advantage__beacon" aria-hidden="true" />
            <span className="fo-ai-advantage__eyebrow-text">
              AI ADVANTAGE · THE INTELLIGENCE MOMENT
            </span>
          </div>

          <h2 id="fo-ai-heading" className="fo-ai-advantage__headline">
            AI that works inside the flow.
          </h2>

          <p className="fo-ai-advantage__copy">
            AI doesn&apos;t sit beside your business. It understands what is happening and helps decide what happens next.
          </p>
        </div>

        {/* ==============================================================
            3. TWO-COLUMN LIVING INTELLIGENCE WORKSPACE
            Left: Sticky Invoice Anchor | Center: 2 Data Streams | Right: Stacked Cards
            ============================================================== */}
        <div className="fo-ai-advantage__workspace">
          {/* LEFT COLUMN: Vertically Centered Sticky Invoice Card */}
          <AIInvoiceContextCard
            ref={invoiceColRef}
            activeStageIndex={activeStageIndex}
            activeStageName={activeStage.stepName}
            onSelectStage={handleJumpToStage}
          />

          {/* RIGHT COLUMN: Layered Stacking Intelligence Cards */}
          <div className="fo-ai-advantage__stack-col" role="feed" aria-label="AI Progression Stack">
            {/* Quick Interactive Stage Stepper (Sticky aligned with Invoice top) */}
            <div
              ref={stepperRef}
              id="fo-ai-tracker-inlet"
              className="fo-ai-advantage__stepper"
              role="tablist"
              aria-label="Cognitive Stages Progression"
            >
              {/* Target Port for Context Stream (Connector A) */}
              <div className="fo-ai-stepper-port" aria-hidden="true">
                <span className="fo-ai-card-port-beacon" />
              </div>

              <div className="fo-ai-stepper-track">
                {aiAdvantageStages.map((stg, sIdx) => {
                  const isActive = activeStageIndex === sIdx;
                  const isComplete = sIdx < activeStageIndex;
                  return (
                    <button
                      key={stg.stepName}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fo-ai-stepper-btn ${
                        isActive ? "is-active" : isComplete ? "is-complete" : ""
                      }`}
                      onClick={() => handleJumpToStage(sIdx)}
                    >
                      <span className="fo-ai-stepper-num">0{sIdx + 1}</span>
                      <span className="fo-ai-stepper-label">{stg.stepName}</span>
                      {isComplete && <span className="fo-ai-stepper-check" aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* The 6 Stacking Cards Deck (Exact 0-offset sticky stack directly below stepper) */}
            <div className="fo-ai-advantage__stack">
              {aiAdvantageStages.map((stage, index) => {
                const isActive = activeStageIndex === index;
                const isComplete = index < activeStageIndex;
                // Zero-offset: all cards dock at the exact same top position (204px)
                const topOffset = "204px";
                const zIndex = 10 + index;

                return (
                  <AIIntelligenceCard
                    key={stage.stepName}
                    stage={stage}
                    index={index}
                    totalStages={aiAdvantageStages.length}
                    isActive={isActive}
                    isComplete={isComplete}
                    topOffset={topOffset}
                    zIndex={zIndex}
                    onExecuteAction={handleExecuteAction}
                    actionExecuted={actionExecuted}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          4. BOTTOM ANIMATED MULTI-LAYER WAVE DIVIDER
          Blends Indigo Canvas into Following Section / Footer (#041938)
          ============================================================== */}
      <AIWaveDivider
        position="bottom"
        fillColor={afterSectionBg}
        height={18}
        durationSeconds={35}
      />
    </section>
  );
});

export default AIAdvantageSection;

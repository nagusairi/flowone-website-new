import React, { memo } from "react";
import AIStageLottieIcon from "./AIStageLottieIcon";

export interface AIIntelligenceStageData {
  stepName: string;
  kicker: string;
  badgeLabel: string;
  title: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  details: Array<{ label: string; value: string }>;
  actionBlock?: {
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    status: string;
  };
}

export interface AIIntelligenceCardProps {
  stage: AIIntelligenceStageData;
  index: number;
  totalStages: number;
  isActive: boolean;
  isComplete: boolean;
  topOffset: string;
  zIndex: number;
  onExecuteAction?: () => void;
  actionExecuted?: boolean;
}

export const AIIntelligenceCard = memo(function AIIntelligenceCard({
  stage,
  index,
  totalStages,
  isActive,
  isComplete,
  topOffset,
  zIndex,
  onExecuteAction,
  actionExecuted = false,
}: AIIntelligenceCardProps) {
  const cardStateClass = isActive
    ? "is-active"
    : isComplete
    ? "is-complete"
    : "is-future";

  return (
    <article
      id={`fo-ai-card-${index}`}
      className={`fo-ai-advantage__card fo-ai-card--${stage.stepName.toLowerCase()} ${cardStateClass}`}
      style={{
        top: topOffset,
        zIndex: zIndex,
      }}
      aria-label={`AI Stage 0${index + 1}: ${stage.title}`}
      aria-current={isActive ? "step" : undefined}
    >
      {/* Top Hairline Glowing Gradient Rim */}
      <div className="fo-ai-advantage__card-beam" aria-hidden="true" />

      {/* Subtle Stacking Deck Rim Indicator */}
      <div className="fo-ai-advantage__card-rim" aria-hidden="true">
        <span className="fo-ai-rim-tag">
          STAGE 0{index + 1} · {stage.stepName}
        </span>
        <span className="fo-ai-rim-sep">/</span>
        <span className="fo-ai-rim-status">
          {isComplete ? "RESOLVED & IMMUTABLE" : isActive ? "ACTIVE COGNITIVE PROCESS" : "PENDING STAGE"}
        </span>
      </div>

      {/* Connection Inflow Port for Connector B on Active Card */}
      <div
        id={`fo-ai-card-port-${index}`}
        className="fo-ai-advantage__card-port"
        title="Insight Connection Inlet"
        aria-hidden="true"
      >
        <span className="fo-ai-card-port-beacon" />
      </div>

      {/* ==============================================================
          CARD HEADER: Exact Required Structure
          [Lottie icon] [stage kicker + stage heading] [optional status badge]
          ============================================================== */}
      <header className="fo-ai-advantage__card-header">
        <div className="fo-ai-advantage__card-header-left">
          {/* 1. Lottie Icon Mount */}
          <div className="fo-ai-advantage__lottie-wrapper">
            <AIStageLottieIcon
              isActive={isActive}
              stageIndex={index}
              size={28}
            />
          </div>

          {/* 2. Text Group (Stage Kicker + Stage Heading) */}
          <div className="fo-ai-advantage__card-title-group">
            <span className="fo-ai-advantage__card-kicker">{stage.kicker}</span>
            <h3 className="fo-ai-advantage__card-title">{stage.title}</h3>
          </div>
        </div>

        {/* 3. Optional Status Badge */}
        <div className="fo-ai-advantage__card-header-right">
          <span
            className={`fo-ai-advantage__card-badge ${
              isActive ? "is-active" : isComplete ? "is-complete" : ""
            }`}
          >
            <span className="fo-ai-advantage__card-beacon" aria-hidden="true" />
            <span>{isComplete ? "✓ COMPLETE" : stage.badgeLabel}</span>
          </span>
        </div>
      </header>

      {/* Summary Narrative */}
      <p className="fo-ai-advantage__card-summary">{stage.summary}</p>

      {/* Inset Metrics Grid (3 Cells) */}
      <div className="fo-ai-advantage__card-metrics">
        {stage.metrics.map((m, mIdx) => (
          <div className="fo-ai-card-metric-cell" key={mIdx}>
            <span className="fo-ai-metric-label">{m.label}</span>
            <strong className="fo-ai-metric-value">{m.value}</strong>
          </div>
        ))}
      </div>

      {/* Contextual Verified Details Grid (4 items) */}
      <div className="fo-ai-advantage__card-details-grid">
        {stage.details.map((d, dIdx) => (
          <div className="fo-ai-card-detail-item" key={dIdx}>
            <span className="fo-ai-detail-label">{d.label}</span>
            <span className="fo-ai-detail-val">{d.value}</span>
          </div>
        ))}
      </div>

      {/* Stage 06 (ACT) Autonomous Decision & Routing Action Block */}
      {stage.actionBlock && (
        <div className="fo-ai-advantage__action-block">
          <div className="fo-ai-action-content">
            <div className="fo-ai-action-header">
              <span className="fo-ai-action-kicker">AUTONOMOUS DISPATCH ORCHESTRATION</span>
              <strong className="fo-ai-action-title">{stage.actionBlock.headline}</strong>
              <p className="fo-ai-action-desc">{stage.actionBlock.subhead}</p>
            </div>
            <div className="fo-ai-action-controls">
              <button
                type="button"
                className={`fo-ai-action-btn fo-ai-action-btn--primary ${
                  actionExecuted ? "is-executed" : ""
                }`}
                onClick={onExecuteAction}
              >
                <span>
                  {actionExecuted
                    ? "✓ DISPATCH SENT & RECONCILED"
                    : stage.actionBlock.primaryCta}
                </span>
                <span className="fo-ai-btn-arrow" aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="fo-ai-action-btn fo-ai-action-btn--secondary"
              >
                {stage.actionBlock.secondaryCta}
              </button>
            </div>
            <div className="fo-ai-action-status">
              <span className="fo-ai-status-pulse-dot" aria-hidden="true" />
              <span>
                {actionExecuted
                  ? "CONFIRMATION LOGGED TO SAP LEDGER · TXN-ACT-10482"
                  : stage.actionBlock.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Card Footer Progress Dials */}
      <footer className="fo-ai-advantage__card-footer">
        <div className="fo-ai-dashes-row" aria-hidden="true">
          {Array.from({ length: totalStages }).map((_, dIdx) => (
            <span
              key={dIdx}
              className={`fo-ai-dash ${dIdx <= index ? "is-filled" : ""}`}
            />
          ))}
        </div>
        <span className="fo-ai-stage-counter">
          Stage 0{index + 1} of 0{totalStages} · {stage.stepName}
        </span>
      </footer>
    </article>
  );
});

export default AIIntelligenceCard;

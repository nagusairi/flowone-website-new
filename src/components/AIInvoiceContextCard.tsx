import React, { memo, forwardRef } from "react";
import AIDataStreamConnectors from "./AIDataStreamConnectors";

export interface AIInvoiceContextCardProps {
  activeStageIndex: number;
  activeStageName: string;
  onSelectStage?: (index: number) => void;
  className?: string;
}

const contextChips = [
  "Customer profile",
  "Invoice line items",
  "Historical velocity",
  "Due date window",
  "IRP status",
];

export const AIInvoiceContextCard = memo(
  forwardRef<HTMLElement, AIInvoiceContextCardProps>(function AIInvoiceContextCard(
    {
      activeStageIndex,
      activeStageName,
      onSelectStage,
      className = "",
    },
    ref
  ) {
    return (
      <aside
        ref={ref}
        className={`fo-ai-advantage__invoice-col ${className}`}
      aria-label="Inspected Business Object: Live Invoice Context"
    >
      <div className="fo-ai-advantage__invoice" id="fo-ai-invoice-card">
        {/* Architectural Tech Corner Accents */}
        <div className="fo-ai-corner fo-ai-corner--tl" aria-hidden="true" />
        <div className="fo-ai-corner fo-ai-corner--tr" aria-hidden="true" />
        <div className="fo-ai-corner fo-ai-corner--bl" aria-hidden="true" />
        <div className="fo-ai-corner fo-ai-corner--br" aria-hidden="true" />

        {/* Top Telemetry Header */}
        <div className="fo-ai-advantage__invoice-meta">
          <span className="fo-ai-advantage__invoice-kicker">INSPECTED BUSINESS OBJECT</span>
          <span className="fo-ai-advantage__invoice-beacon">
            <span className="fo-ai-beacon-dot" aria-hidden="true" />
            <span>AI EVALUATION ACTIVE</span>
          </span>
        </div>

        {/* Core Financial Identification */}
        <div className="fo-ai-advantage__invoice-payload">
          <strong className="fo-ai-advantage__invoice-ref">INV-10482</strong>
          <span className="fo-ai-advantage__invoice-amount">₹5,90,000</span>
          <p className="fo-ai-advantage__invoice-client">
            Ananya Enterprises · GSTIN 36AABCA1234F1Z5
          </p>
        </div>

        {/* 3 Telemetry Verification Metrics */}
        <div className="fo-ai-advantage__invoice-telemetry">
          <div className="fo-ai-telemetry-box">
            <small>SCHEMA MATCH</small>
            <strong>99.8%</strong>
          </div>
          <div className="fo-ai-telemetry-box">
            <small>IRN STATUS</small>
            <strong className="is-verified">Verified</strong>
          </div>
          <div className="fo-ai-telemetry-box">
            <small>TIMING CONFIDENCE</small>
            <strong>92.0%</strong>
          </div>
        </div>

        {/* Transaction Context Tags */}
        <div className="fo-ai-advantage__invoice-chips">
          <span className="fo-ai-chips-label">RELEVANT CONTEXT CHANNELS</span>
          <div className="fo-ai-chips-list">
            {contextChips.map((chip) => (
              <span key={chip} className="fo-ai-chip">
                <i className="fo-ai-chip-bullet" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Active Stage Evaluation Banner */}
        <div className="fo-ai-advantage__invoice-state-tag">
          <span className="fo-ai-state-indicator-pulse" aria-hidden="true" />
          <span className="fo-ai-state-text">
            CURRENT EVALUATION:{" "}
            <strong>
              0{activeStageIndex + 1} · {activeStageName}
            </strong>
          </span>
        </div>

        {/* Output Ports for Data Stream Connectors on Right Border */}
        <div
          id="fo-ai-port-context"
          className="fo-ai-advantage__invoice-port fo-ai-port--context"
          title="Context Stream Outlet (Connector A)"
          aria-hidden="true"
        >
          <span className="fo-ai-port-ping" />
        </div>
        <div
          id="fo-ai-port-active"
          className="fo-ai-advantage__invoice-port fo-ai-port--active"
          title="Active Insight Stream Outlet (Connector B)"
          aria-hidden="true"
        >
          <span className="fo-ai-port-ping" />
        </div>
      </div>

      {/* Two Curved Animated Data Streams (Sticky Bridge to Right Column) */}
      <AIDataStreamConnectors />
    </aside>
  );
}));

export default AIInvoiceContextCard;

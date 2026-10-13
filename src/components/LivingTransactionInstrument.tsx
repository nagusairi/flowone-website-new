import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button, FlowConnector, Icon } from "./flowone";

/* ==========================================================================
   Section 03B: Living Transaction — Precision Financial Instrument
   Concept B: Central transaction canvas with contextual telemetry signals
   Consistent identity: TXN-10482, Ananya Enterprises, ₹5,00,000 base (₹5,90,000 with 18% GST)
   ========================================================================== */

export interface InstrumentStage {
  id: string;
  num: string;
  label: string;
  shortTag: string;
  docType: string;
  docRef: string;
  statusLabel: string;
  statusTone: "success" | "info" | "warning" | "purple";
  activeBalance: string;
  taxContext: string;
  cashRealized: string;
  reconciliationState: string;
  operationalFootprint: {
    title: string;
    metric: string;
    subtext: string;
    badge: string;
  };
  statutoryFootprint: {
    title: string;
    metric: string;
    subtext: string;
    status: string;
  };
  executiveInsight: string;
  kicker: string;
}

export const instrumentStages: InstrumentStage[] = [
  {
    id: "order",
    num: "01",
    label: "Order",
    shortTag: "SO-10482",
    docType: "COMMERCIAL SALES ORDER",
    docRef: "SO-10482 · PO-AN-2026-88",
    statusLabel: "Commercial Contract Locked",
    statusTone: "success",
    activeBalance: "₹5,00,000.00",
    taxContext: "18% GST Pending Invoice",
    cashRealized: "₹0.00 (Pre-fulfillment)",
    reconciliationState: "Awaiting Delivery & Invoice",
    operationalFootprint: {
      title: "Commercial Commitment",
      metric: "125 Units",
      subtext: "Enterprise Edge Cloud Appliances (EEC-400X) confirmed under Net 30 terms.",
      badge: "Sales & CRM Locked",
    },
    statutoryFootprint: {
      title: "GSTIN Verification",
      metric: "36AABCA1234F1Z5",
      subtext: "Ananya Enterprises registered entity verified active on GSTN portal.",
      status: "Verified Active",
    },
    executiveInsight: "A ₹5,00,000 commercial commitment is locked into the unified event fabric. Inventory allocation and fulfillment routes are triggered automatically with zero re-entry.",
    kicker: "COMMERCIAL CONTRACT FORMED",
  },
  {
    id: "inventory",
    num: "02",
    label: "Inventory",
    shortTag: "DC-02 Reserved",
    docType: "WAREHOUSE ALLOCATION & MANIFEST",
    docRef: "WH-ALLOC-10482 · Rack HYD-B4",
    statusLabel: "100% Stock Reserved",
    statusTone: "info",
    activeBalance: "₹5,00,000.00",
    taxContext: "E-Way Bill Pre-Mapped",
    cashRealized: "₹0.00 (Fulfillment Active)",
    reconciliationState: "Dispatch Readiness Cleared",
    operationalFootprint: {
      title: "Physical Stock Allocation",
      metric: "125 / 125 Units",
      subtext: "Reserved at Hyderabad Central DC-02, Rack HYD-B4, Zone C. Barcode serialized.",
      badge: "Zero Stockout Drift",
    },
    statutoryFootprint: {
      title: "HSN Code & Valuation",
      metric: "HSN 8471.30 · ₹4,000/u",
      subtext: "Statutory tariff classification locked against warehouse SKU catalogue.",
      status: "Classification In Sync",
    },
    executiveInsight: "Physical inventory locks directly against commercial commitments. The warehouse clears pick and pack without waiting for spreadsheet reconciliation or email confirmations.",
    kicker: "PHYSICAL ASSETS SYNCHRONIZED",
  },
  {
    id: "invoice",
    num: "03",
    label: "Invoice",
    shortTag: "INV-10482",
    docType: "STATUTORY TAX INVOICE",
    docRef: "INV-10482 · Ref SO-10482",
    statusLabel: "Tax Invoice Issued",
    statusTone: "info",
    activeBalance: "₹5,90,000.00",
    taxContext: "₹90,000 GST Attached",
    cashRealized: "₹0.00 (Receivable Open)",
    reconciliationState: "Ledger Obligation Formed",
    operationalFootprint: {
      title: "Operational Fulfillment",
      metric: "Dispatched",
      subtext: "Courier manifest courier assigned. Dispatch confirmed from Hyderabad DC-02.",
      badge: "POD Tracking Active",
    },
    statutoryFootprint: {
      title: "Tax Liability Recognition",
      metric: "CGST ₹45k + SGST ₹45k",
      subtext: "Inter-state supply rule evaluated. State code 36 (Telangana) intra-state applied.",
      status: "18% GST Computed",
    },
    executiveInsight: "Operational dispatch converts directly into Tax Invoice INV-10482. Contract value advances from ₹5,00,000 to ₹5,90,000 with complete tax breakdown permanently attached.",
    kicker: "FINANCIAL OBLIGATION FORMED",
  },
  {
    id: "gst",
    num: "04",
    label: "GST",
    shortTag: "IRN Cleared",
    docType: "STATUTORY E-INVOICE & IRP DOSSIER",
    docRef: "IRN: 7b4cf829019a...392a",
    statusLabel: "IRN Verified & Signed",
    statusTone: "success",
    activeBalance: "₹5,90,000.00",
    taxContext: "IRN Hash Signed · QR Ready",
    cashRealized: "₹0.00 (Receivable Open)",
    reconciliationState: "GSTR-1 Auto-Mapped",
    operationalFootprint: {
      title: "Dispatch Authorization",
      metric: "E-Way Bill Ready",
      subtext: "Part A & Part B e-way bill generated autonomously for transport compliance.",
      badge: "Zero Portal Re-entry",
    },
    statutoryFootprint: {
      title: "Government IRP Handshake",
      metric: "IRP Ack 1126104829104",
      subtext: "Cryptographic QR payload verified by NIC statutory validation portal.",
      status: "100% Compliant",
    },
    executiveInsight: "Statutory validation runs autonomously in the flow. flowOne handshakes with the government IRP portal, generating verified IRN hash and signed QR code without external logins.",
    kicker: "AUTONOMOUS COMPLIANCE CLEARED",
  },
  {
    id: "receivable",
    num: "05",
    label: "Receivable",
    shortTag: "₹5.9L Open",
    docType: "ACCOUNTS RECEIVABLE LEDGER",
    docRef: "AR-INV-10482 · Net 30",
    statusLabel: "Open Receivable · Due in 4d",
    statusTone: "warning",
    activeBalance: "₹5,90,000.00 Open",
    taxContext: "Tax Invoiced ₹90,000",
    cashRealized: "₹0.00 (Pending Remittance)",
    reconciliationState: "Aging: Current (0-30d)",
    operationalFootprint: {
      title: "Credit Risk Profile",
      metric: "AAA Rating",
      subtext: "Ananya Enterprises historical on-time payment probability rated at 94.2%.",
      badge: "Low Default Risk",
    },
    statutoryFootprint: {
      title: "MSME 45-Day Monitor",
      metric: "Day 26 of 30",
      subtext: "Section 43B(h) compliance clock running. Payment scheduled within safe credit window.",
      status: "Rule-Compliant",
    },
    executiveInsight: "Open balance posts directly to the accounting ledger. Finance gains real-time visibility into payment terms, due dates, and aging without waiting for month-end reconciliation.",
    kicker: "REAL-TIME LEDGER POSTING",
  },
  {
    id: "collection",
    num: "06",
    label: "Collection",
    shortTag: "1-Click Link",
    docType: "COLLECTIONS ORCHESTRATION CADENCE",
    docRef: "DISPATCH-COL-10482",
    statusLabel: "Automated Reminder Cadence",
    statusTone: "info",
    activeBalance: "₹5,90,000.00 Open",
    taxContext: "Invoice INV-10482 Attached",
    cashRealized: "₹0.00 (Reminder Active)",
    reconciliationState: "Virtual Account Assigned",
    operationalFootprint: {
      title: "Multi-Rail Engagement",
      metric: "WhatsApp + Email",
      subtext: "Pre-due reminder dispatched with authenticated statement attachment.",
      badge: "Dignified Tone",
    },
    statutoryFootprint: {
      title: "Payment Gateway Token",
      metric: "UPI / NEFT VA-4820",
      subtext: "Dedicated dynamic virtual account created to ensure automated bank matching.",
      status: "Virtual Account Active",
    },
    executiveInsight: "Context-aware payment reminders engage debtors without aggressive spam. flowOne delivers an instant 1-click payment link embedded with UPI and virtual account NEFT rails.",
    kicker: "PROACTIVE COLLECTIONS ENGAGEMENT",
  },
  {
    id: "bank",
    num: "07",
    label: "Bank",
    shortTag: "HDFC Feed",
    docType: "CORPORATE BANK STATEMENT INGESTION",
    docRef: "HDFC A/c 2048 · UTR98204018274",
    statusLabel: "Credit Remittance Ingested",
    statusTone: "success",
    activeBalance: "₹5,90,000.00 Ingested",
    taxContext: "GST Output Fully Paid",
    cashRealized: "₹5,90,000.00 (In Bank)",
    reconciliationState: "Awaiting Bilateral Match",
    operationalFootprint: {
      title: "Bank Gateway Telemetry",
      metric: "18ms Host-to-Host",
      subtext: "Direct API feed from HDFC Bank corporate cash management portal.",
      badge: "Encrypted ISO 20022",
    },
    statutoryFootprint: {
      title: "Bank UTR Cryptographic Proof",
      metric: "UTR98204018274",
      subtext: "Value date 24-Jun-2026. Electronic remittance confirmed settled by RBI clearing house.",
      status: "Settled In Account",
    },
    executiveInsight: "Corporate bank statement feed synchronizes in real time. Inbound remittance of ₹5,90,000 arrives with raw UTR identifier and cryptographic payload ready for correlation.",
    kicker: "DIRECT HOST-TO-HOST INGESTION",
  },
  {
    id: "reconciliation",
    num: "08",
    label: "Reconciliation",
    shortTag: "98% Matched",
    docType: "BILATERAL RECONCILIATION ENGINE",
    docRef: "INV-10482 ⇄ UTR98204018274",
    statusLabel: "98% Match · Auto-Reconciled",
    statusTone: "success",
    activeBalance: "₹0.00 (Balance Cleared)",
    taxContext: "GST Ledger Balanced",
    cashRealized: "₹5,90,000.00 Settled",
    reconciliationState: "Reconciled · Zero Variance",
    operationalFootprint: {
      title: "Matching Confidence",
      metric: "98.4% Confidence",
      subtext: "Exact amount (₹5,90,000), debtor GSTIN match, and reference token correlated.",
      badge: "Zero Human Ticking",
    },
    statutoryFootprint: {
      title: "Clearing Journal Voucher",
      metric: "JV-2026-9104",
      subtext: "Debit Bank Account / Credit Trade Debtors posted with immutable ledger audit hash.",
      status: "Ledger Cleared",
    },
    executiveInsight: "Inbound bank payment matches invoice INV-10482 at 98% confidence. Real-time bilateral matching clears the receivable and records UTR reference with zero statement ticking.",
    kicker: "SUB-SECOND BILATERAL MATCHING",
  },
  {
    id: "cashflow",
    num: "09",
    label: "Cashflow",
    shortTag: "₹5.9L Liquid",
    docType: "TREASURY CASH & WORKING CAPITAL",
    docRef: "TXN-10482 · Liquidity Pool",
    statusLabel: "Liquid Runway Expanded",
    statusTone: "success",
    activeBalance: "₹0.00 Outstanding",
    taxContext: "Statutory Tax Provisioned",
    cashRealized: "₹5,90,000.00 Liquid Cash",
    reconciliationState: "Treasury Synchronized",
    operationalFootprint: {
      title: "Working Capital Recycling",
      metric: "+₹5,90,000 Liquid",
      subtext: "Released into primary treasury liquidity account. Available for procurement.",
      badge: "Real-Time Treasury",
    },
    statutoryFootprint: {
      title: "Cash Flow Forecast",
      metric: "+4.2 Days Runway",
      subtext: "90-day rolling cash projection recalibrated with zero forecast distortion.",
      status: "Forecast Hardened",
    },
    executiveInsight: "Collected funds immediately unlock into available working capital. Treasury dashboards reflect ₹5,90,000 in liquid runway, funding the next procurement cycle without credit drag.",
    kicker: "INSTANT CAPITAL ACCELERATION",
  },
  {
    id: "decision",
    num: "10",
    label: "Decision",
    shortTag: "Loop Closed",
    docType: "EXECUTIVE RESOLUTION & CLOSURE",
    docRef: "TXN-10482 · Complete Loop",
    statusLabel: "Business Loop Completed",
    statusTone: "purple",
    activeBalance: "₹0.00 Open · Cycle Complete",
    taxContext: "Tax Filed & Paid",
    cashRealized: "₹5,90,000.00 Realized",
    reconciliationState: "Closed Loop Verified",
    operationalFootprint: {
      title: "Days Sales Outstanding",
      metric: "24 Days DSO",
      subtext: "Reduced from 32-day sector benchmark. Working capital velocity improved by 25%.",
      badge: "Optimal Velocity",
    },
    statutoryFootprint: {
      title: "Audit & Ledger Integrity",
      metric: "100% Cryptographic Audit",
      subtext: "Zero manual spreadsheet adjustments. Complete transaction journey archived.",
      status: "Deterministic Truth",
    },
    executiveInsight: "The transaction loop closes with executive-grade intelligence. Commercial margin, DSO performance, and working capital impact are indexed into leadership dashboards for confident decisions.",
    kicker: "CONNECTED BUSINESS REALITY",
  },
];

/* ==========================================================================
   Main Component: LivingTransactionInstrument (Concept B)
   ========================================================================== */
export const LivingTransactionInstrument = memo(function LivingTransactionInstrument() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const activeStage = instrumentStages[activeStageIndex];

  // Auto-play cadence toggle
  useEffect(() => {
    if (!isPlaying) {
      if (playTimerRef.current) {
        window.clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsPlaying(false);
      return;
    }

    playTimerRef.current = window.setInterval(() => {
      setActiveStageIndex(curr => (curr + 1) % instrumentStages.length);
    }, 2800);

    return () => {
      if (playTimerRef.current) {
        window.clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    };
  }, [isPlaying]);

  const handleSelectStage = useCallback((index: number) => {
    setIsPlaying(false);
    setActiveStageIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setActiveStageIndex(curr => (curr === 0 ? instrumentStages.length - 1 : curr - 1));
  }, []);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setActiveStageIndex(curr => (curr === instrumentStages.length - 1 ? 0 : curr + 1));
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(curr => !curr);
  }, []);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="living-instrument"
      className="new-home-section living-instrument-section"
      aria-labelledby="instrument-heading"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="home-container instrument-container">
        {/* ==================================================================
            1. EDITORIAL INTRODUCTION & TELEMETRY HUD
            ================================================================== */}
        <header className="instrument-editorial-header">
          <div className="instrument-editorial-copy">
            <div className="instrument-eyebrow-pill" role="note" aria-label="Living Transaction">
              <span className="instrument-beacon-dot" aria-hidden="true" />
              <span>LIVING TRANSACTION · PRECISION FINANCIAL INSTRUMENT</span>
            </div>
            <h2 id="instrument-heading" className="instrument-headline">
              One transaction. Connected from start to cash.
            </h2>
            <p className="instrument-lead-copy">
              Follow a ₹5,00,000 order across operations, finance, compliance, collections and cash.
              Explore how one business event dynamically reshapes the entire enterprise operating posture.
            </p>
          </div>

          {/* Telemetry HUD Pod */}
          <div className="instrument-hud-pod" aria-label="Active Instrument Telemetry Status">
            <div className="instrument-hud-row">
              <span className="instrument-hud-label">UNIFIED LEDGER OBJECT</span>
              <strong className="instrument-hud-val">TXN-10482</strong>
            </div>
            <div className="instrument-hud-divider" aria-hidden="true" />
            <div className="instrument-hud-entity">
              <span className="instrument-hud-entity-name">Ananya Enterprises</span>
              <span className="instrument-hud-gstin">GSTIN: 36AABCA1234F1Z5</span>
            </div>
            <div className="instrument-hud-divider" aria-hidden="true" />
            <div className="instrument-hud-status">
              <span className="instrument-hud-status-dot" aria-hidden="true" />
              <span>100% Deterministic Sync · 14ms Engine Latency</span>
            </div>
          </div>
        </header>

        {/* ==================================================================
            2. COMPACT INTEGRATED TRANSACTION EVENT TRACE
            Restrained horizontal progression control with direct stage selection
            ================================================================== */}
        <div className="instrument-trace-shell" aria-label="Transaction Progression Controls">
          <div className="instrument-trace-controls-bar">
            <div className="instrument-trace-meta">
              <span className="instrument-trace-kicker">STAGE PROGRESSION</span>
              <strong className="instrument-trace-counter">
                {activeStage.num} OF {String(instrumentStages.length).padStart(2, "0")} · {activeStage.label.toUpperCase()}
              </strong>
            </div>

            <div className="instrument-trace-nav-actions">
              <button
                type="button"
                className="instrument-action-btn instrument-action-prev"
                onClick={handlePrev}
                aria-label="Previous transaction stage"
              >
                <Icon name="arrow" size={14} />
                <span>Prev</span>
              </button>

              <button
                type="button"
                className={`instrument-action-btn instrument-action-play ${isPlaying ? "is-playing" : ""}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause automated transaction progression" : "Auto-advance transaction stages"}
              >
                <span className="instrument-play-icon" aria-hidden="true">
                  {isPlaying ? "❚❚" : "▶"}
                </span>
                <span>{isPlaying ? "Pause Flow" : "Auto Flow"}</span>
              </button>

              <button
                type="button"
                className="instrument-action-btn instrument-action-next"
                onClick={handleNext}
                aria-label="Next transaction stage"
              >
                <span>Next</span>
                <span className="instrument-arrow-flipped" aria-hidden="true">
                  <Icon name="arrow" size={14} />
                </span>
              </button>
            </div>
          </div>

          {/* Horizontal Trace Rail Nodes */}
          <div className="instrument-trace-rail" role="tablist" aria-label="10 sequential transaction stages">
            <div className="instrument-trace-rail-track" aria-hidden="true">
              <div
                className="instrument-trace-rail-fill"
                style={{
                  width: `${(activeStageIndex / (instrumentStages.length - 1)) * 100}%`,
                }}
              />
            </div>

            {instrumentStages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPassed = idx < activeStageIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`instrument-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`instrument-canvas-${stage.id}`}
                  className={`instrument-trace-node ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
                  onClick={() => handleSelectStage(idx)}
                >
                  <div className="instrument-node-indicator">
                    {isPassed ? (
                      <span className="instrument-node-check" aria-hidden="true">✓</span>
                    ) : (
                      <span className="instrument-node-dot" aria-hidden="true" />
                    )}
                  </div>
                  <div className="instrument-node-meta">
                    <span className="instrument-node-num">{stage.num}</span>
                    <span className="instrument-node-label">{stage.label}</span>
                  </div>
                  <span className={`instrument-node-tag is-${stage.statusTone}`}>
                    {stage.shortTag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            3. PRECISION OPERATING WORKSPACE GRID
            Asymmetrical composition: Left Telemetry Pod + Central Canvas + Right Financial Pod
            ================================================================== */}
        <div className="instrument-workspace-grid">
          {/* ----------------------------------------------------------------
              LEFT SIGNAL POD: Operational & Pre-Settlement Telemetry
              ---------------------------------------------------------------- */}
          <aside className="instrument-signal-pod instrument-signal-pod--left" aria-label="Operational Telemetry Signals">
            <div className="instrument-signal-card">
              <div className="instrument-signal-card__head">
                <span className="instrument-signal-tag">OPERATIONAL CONDUIT</span>
                <span className="instrument-signal-badge">{activeStage.operationalFootprint.badge}</span>
              </div>
              <strong className="instrument-signal-metric">{activeStage.operationalFootprint.metric}</strong>
              <span className="instrument-signal-title">{activeStage.operationalFootprint.title}</span>
              <p className="instrument-signal-desc">{activeStage.operationalFootprint.subtext}</p>
            </div>

            <div className="instrument-signal-card instrument-signal-card--statutory">
              <div className="instrument-signal-card__head">
                <span className="instrument-signal-tag">STATUTORY POSTURE</span>
                <span className="instrument-signal-badge is-verified">{activeStage.statutoryFootprint.status}</span>
              </div>
              <strong className="instrument-signal-metric instrument-signal-metric--mono">
                {activeStage.statutoryFootprint.metric}
              </strong>
              <span className="instrument-signal-title">{activeStage.statutoryFootprint.title}</span>
              <p className="instrument-signal-desc">{activeStage.statutoryFootprint.subtext}</p>
            </div>

            <div className="instrument-signal-kicker-card">
              <div className="instrument-kicker-beacon" aria-hidden="true" />
              <div>
                <span className="instrument-kicker-label">{activeStage.kicker}</span>
                <p className="instrument-kicker-text">{activeStage.executiveInsight}</p>
              </div>
            </div>
          </aside>

          {/* ----------------------------------------------------------------
              CENTER DOMINANT CANVAS: Realistic Product Operating Interface
              ---------------------------------------------------------------- */}
          <main
            id={`instrument-canvas-${activeStage.id}`}
            role="tabpanel"
            aria-labelledby={`instrument-tab-${activeStage.id}`}
            className="instrument-canvas-shell"
          >
            {/* Visual Header Overlays */}
            <div className="instrument-canvas-ambient" aria-hidden="true" />

            {/* Canvas Product Top Bar */}
            <div className="instrument-canvas-topbar">
              <div className="instrument-canvas-doc-identity">
                <span className="instrument-doc-type-badge">{activeStage.docType}</span>
                <strong className="instrument-doc-ref">{activeStage.docRef}</strong>
              </div>

              <div className="instrument-canvas-status-cluster">
                <span className="instrument-canvas-latency">14ms Engine Latency</span>
                <span className={`instrument-status-badge is-${activeStage.statusTone}`}>
                  <span className="instrument-status-dot" aria-hidden="true" />
                  {activeStage.statusLabel}
                </span>
              </div>
            </div>

            {/* Canvas Dynamic Realistic Document Body */}
            <div className="instrument-canvas-viewport">
              {activeStage.id === "order" && (
                <div className="instrument-doc-view instrument-doc-order">
                  <div className="instrument-doc-head-grid">
                    <div>
                      <span className="instrument-head-kicker">CUSTOMER & ENTITY</span>
                      <strong className="instrument-head-primary">Ananya Enterprises</strong>
                      <span className="instrument-head-sub">Plot 48, HITEC City, Hyderabad · GSTIN: 36AABCA1234F1Z5</span>
                    </div>
                    <div className="instrument-head-meta-col">
                      <div className="instrument-meta-pair">
                        <span>PO NUMBER</span>
                        <strong>PO-AN-2026-88</strong>
                      </div>
                      <div className="instrument-meta-pair">
                        <span>PAYMENT TERMS</span>
                        <strong>Net 30 Days</strong>
                      </div>
                    </div>
                  </div>

                  <div className="instrument-table-wrapper">
                    <table className="instrument-data-table">
                      <thead>
                        <tr>
                          <th>ITEM DESCRIPTION</th>
                          <th>SKU</th>
                          <th className="is-num">QTY</th>
                          <th className="is-num">UNIT RATE</th>
                          <th className="is-num">LINE TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Enterprise Edge Cloud Appliance</strong>
                            <small>Hardware appliance with embedded security gateway</small>
                          </td>
                          <td className="is-mono">EEC-400X</td>
                          <td className="is-num">125</td>
                          <td className="is-num">₹4,000.00</td>
                          <td className="is-num is-bold">₹5,00,000.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="instrument-order-summary-footer">
                    <div className="instrument-badge-pill-cluster">
                      <span className="instrument-pill">Auto-Routed to DC-02</span>
                      <span className="instrument-pill">Zero Spreadsheet Drift</span>
                      <span className="instrument-pill">Commercial Lock Cleared</span>
                    </div>
                    <div className="instrument-amount-readout">
                      <span>BASE CONTRACT COMMITMENT</span>
                      <strong>₹5,00,000.00</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "inventory" && (
                <div className="instrument-doc-view instrument-doc-inventory">
                  <div className="instrument-doc-head-grid">
                    <div>
                      <span className="instrument-head-kicker">FULFILLMENT DEPOT</span>
                      <strong className="instrument-head-primary">Hyderabad Central Distribution Center (DC-02)</strong>
                      <span className="instrument-head-sub">Aisle 4 · Zone C · Storage Bin Rack HYD-B4</span>
                    </div>
                    <div className="instrument-head-meta-col">
                      <div className="instrument-meta-pair">
                        <span>ALLOCATION STATUS</span>
                        <strong className="text-emerald-600">100% Reserved</strong>
                      </div>
                      <div className="instrument-meta-pair">
                        <span>BARCODE SCAN</span>
                        <strong>125/125 Matched</strong>
                      </div>
                    </div>
                  </div>

                  <div className="instrument-inventory-gauge-panel">
                    <div className="instrument-gauge-header">
                      <span>STOCK RESERVATION PROGRESS</span>
                      <strong>125 OF 125 UNITS COMMITTED (100%)</strong>
                    </div>
                    <div className="instrument-gauge-track">
                      <div className="instrument-gauge-bar" style={{ width: "100%" }} />
                    </div>
                    <div className="instrument-gauge-stats">
                      <span>Total Available: 480 units</span>
                      <span className="text-blue-600 font-semibold">125 Units Reserved for SO-10482</span>
                      <span>Remaining Unreserved: 355 units</span>
                    </div>
                  </div>

                  <div className="instrument-grid-checklist">
                    <div className="instrument-check-box is-complete">
                      <span className="instrument-check-mark">✓</span>
                      <div>
                        <strong>Physical Goods Pick Ticket</strong>
                        <small>Auto-generated and routed to mobile warehouse terminal</small>
                      </div>
                    </div>
                    <div className="instrument-check-box is-complete">
                      <span className="instrument-check-mark">✓</span>
                      <div>
                        <strong>Packing Slip & Transit Label</strong>
                        <small>Serial numbers bound to SO-10482 transaction hash</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "invoice" && (
                <div className="instrument-doc-view instrument-doc-invoice">
                  <div className="instrument-doc-head-grid">
                    <div>
                      <span className="instrument-head-kicker">TAX INVOICE RECIPIENT</span>
                      <strong className="instrument-head-primary">Ananya Enterprises</strong>
                      <span className="instrument-head-sub">GSTIN: 36AABCA1234F1Z5 · State: Telangana (36)</span>
                    </div>
                    <div className="instrument-head-meta-col">
                      <div className="instrument-meta-pair">
                        <span>INVOICE DATE</span>
                        <strong>18 Jun 2026</strong>
                      </div>
                      <div className="instrument-meta-pair">
                        <span>PAYMENT DUE</span>
                        <strong>28 Jun 2026 (Net 30)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="instrument-tax-ledger-breakdown">
                    <div className="instrument-tax-row">
                      <span>Subtotal (Commercial Contract Value)</span>
                      <span className="is-mono">₹5,00,000.00</span>
                    </div>
                    <div className="instrument-tax-row">
                      <span>Central GST (CGST @ 9%)</span>
                      <span className="is-mono">+₹45,000.00</span>
                    </div>
                    <div className="instrument-tax-row">
                      <span>State GST (SGST @ 9%)</span>
                      <span className="is-mono">+₹45,000.00</span>
                    </div>
                    <div className="instrument-tax-row is-total">
                      <strong>Total Statutory Invoice Amount Payable</strong>
                      <strong className="is-mono is-primary-amount">₹5,90,000.00</strong>
                    </div>
                  </div>

                  <div className="instrument-invoice-footer-notes">
                    <span className="instrument-pill">Digital Signature Verified (Class 3)</span>
                    <span className="instrument-pill">IRN Ready for Statutory Filing</span>
                    <span className="instrument-pill">No Spreadsheet Lag</span>
                  </div>
                </div>
              )}

              {activeStage.id === "gst" && (
                <div className="instrument-doc-view instrument-doc-gst">
                  <div className="instrument-gst-dossier-card">
                    <div className="instrument-gst-banner">
                      <div className="instrument-gst-seal" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="#0528F2" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="m9 12 2 2 4-4" stroke="#0528F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <strong>GOVERNMENT INVOICE REGISTRATION PORTAL (IRP)</strong>
                        <small>Statutory cryptographic validation cleared with zero manual portal logins</small>
                      </div>
                    </div>

                    <div className="instrument-hash-box">
                      <span className="instrument-hash-label">INVOICE REFERENCE NUMBER (IRN)</span>
                      <code className="instrument-hash-code">
                        7b4cf829019a3b2e98d89a01f4c3d82a1789c0a1b2c3d4e5f6a7b8c9d0e1f2a3
                      </code>
                    </div>

                    <div className="instrument-gst-metrics-grid">
                      <div className="instrument-gst-stat">
                        <span>ACK NUMBER</span>
                        <strong>1126104829104</strong>
                      </div>
                      <div className="instrument-gst-stat">
                        <span>ACK TIMESTAMP</span>
                        <strong>18-JUN-2026 10:14:22 IST</strong>
                      </div>
                      <div className="instrument-gst-stat">
                        <span>GSTR-1 TABLE</span>
                        <strong>Table 4A (B2B Supplies)</strong>
                      </div>
                      <div className="instrument-gst-stat">
                        <span>QR CODE STATUS</span>
                        <strong className="text-emerald-600">Signed & Validated</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "receivable" && (
                <div className="instrument-doc-view instrument-doc-ar">
                  <div className="instrument-doc-head-grid">
                    <div>
                      <span className="instrument-head-kicker">ACCOUNTS RECEIVABLE LEDGER</span>
                      <strong className="instrument-head-primary">INV-10482 Posted to Trade Debtors</strong>
                      <span className="instrument-head-sub">Customer: Ananya Enterprises · Current Aging: 0–30 Days</span>
                    </div>
                    <div className="instrument-head-meta-col">
                      <div className="instrument-meta-pair">
                        <span>DUE DATE</span>
                        <strong className="text-amber-600">28 Jun 2026 (Due in 4 Days)</strong>
                      </div>
                      <div className="instrument-meta-pair">
                        <span>PAYMENT TERMS</span>
                        <strong>Net 30 Days</strong>
                      </div>
                    </div>
                  </div>

                  <div className="instrument-ar-aging-table">
                    <div className="instrument-aging-column is-active-bucket">
                      <span className="instrument-aging-label">0–30 DAYS (CURRENT)</span>
                      <strong className="instrument-aging-val">₹5,90,000.00</strong>
                      <span className="instrument-aging-badge">INV-10482 Due</span>
                    </div>
                    <div className="instrument-aging-column">
                      <span className="instrument-aging-label">31–60 DAYS</span>
                      <strong className="instrument-aging-val">₹0.00</strong>
                      <span className="instrument-aging-sub">Clear</span>
                    </div>
                    <div className="instrument-aging-column">
                      <span className="instrument-aging-label">61–90 DAYS</span>
                      <strong className="instrument-aging-val">₹0.00</strong>
                      <span className="instrument-aging-sub">Clear</span>
                    </div>
                    <div className="instrument-aging-column">
                      <span className="instrument-aging-label">90+ DAYS (OVERDUE)</span>
                      <strong className="instrument-aging-val">₹0.00</strong>
                      <span className="instrument-aging-sub">Clear</span>
                    </div>
                  </div>

                  <div className="instrument-ar-action-bar">
                    <span>Ledger Discipline: Dispatched goods immediately reflect in working capital debt register</span>
                    <strong className="text-slate-800">No Journal Lag</strong>
                  </div>
                </div>
              )}

              {activeStage.id === "collection" && (
                <div className="instrument-doc-view instrument-doc-collection">
                  <div className="instrument-collection-preview-panel">
                    <div className="instrument-collection-header">
                      <div>
                        <span className="instrument-head-kicker">TIMED CADENCE WORKFLOW</span>
                        <strong className="instrument-head-primary">Pre-Due Courtesy Remittance Notice</strong>
                        <span className="instrument-head-sub">Automated multi-channel dispatch triggered 4 days prior to maturity</span>
                      </div>
                      <span className="instrument-status-badge is-info">Scheduled & Dispatched</span>
                    </div>

                    <div className="instrument-collection-payload-card">
                      <div className="instrument-msg-head">
                        <span className="instrument-msg-channel">WHATSAPP BUSINESS + EMAIL NOTICE</span>
                        <span className="instrument-msg-time">Sent Today 09:30 AM</span>
                      </div>
                      <div className="instrument-msg-body">
                        <p>
                          <strong>Dear Ananya Enterprises Accounts Team,</strong><br />
                          Invoice <strong>INV-10482</strong> for <strong>₹5,90,000.00</strong> is due on <strong>28 Jun 2026</strong>.
                          Access your verified invoice and execute 1-click clearance via NEFT Virtual Account or instant UPI below.
                        </p>
                        <div className="instrument-link-box">
                          <span className="instrument-link-tag">DYNAMIC INSTANT PAYMENT RAILS</span>
                          <strong className="instrument-link-url">flowone.pay/txn10482 · VA-HDFC-4820</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "bank" && (
                <div className="instrument-doc-view instrument-doc-bank">
                  <div className="instrument-bank-feed-card">
                    <div className="instrument-bank-feed-head">
                      <div className="instrument-bank-logo-box">
                        <strong className="instrument-bank-code">HDFC</strong>
                        <span>CORPORATE H2H GATEWAY</span>
                      </div>
                      <div className="instrument-bank-badge">
                        <span className="instrument-bank-live-dot" />
                        <span>Real-Time Host-to-Host Stream</span>
                      </div>
                    </div>

                    <div className="instrument-feed-entry">
                      <div className="instrument-feed-entry__top">
                        <span className="instrument-entry-date">24-JUN-2026 14:22:08 IST</span>
                        <span className="instrument-entry-type">NEFT CREDIT REMITTANCE</span>
                      </div>
                      <div className="instrument-feed-entry__core">
                        <div>
                          <strong className="instrument-entry-amount">+₹5,90,000.00 CR</strong>
                          <span className="instrument-entry-ref">UTR: UTR98204018274</span>
                        </div>
                        <span className="instrument-status-badge is-success">Settled In Account</span>
                      </div>
                      <div className="instrument-feed-entry__meta">
                        <span>A/c: *******2048 (Current Account)</span>
                        <span>Remitter: ANANYA ENTERPRISES (36AABCA1234F1Z5)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "reconciliation" && (
                <div className="instrument-doc-view instrument-doc-reconciliation">
                  <div className="instrument-recon-bridge">
                    <div className="instrument-recon-node instrument-recon-invoice">
                      <span className="instrument-recon-kicker">COMMERCIAL LEDGER INVOICE</span>
                      <strong className="instrument-recon-title">INV-10482</strong>
                      <div className="instrument-recon-stat">Amount: <strong>₹5,90,000.00</strong></div>
                      <div className="instrument-recon-stat">Entity: <strong>Ananya Enterprises</strong></div>
                      <span className="instrument-recon-status">Tax Cleared</span>
                    </div>

                    <div className="instrument-recon-connector-zone">
                      <div className="instrument-recon-match-pill">
                        <span className="instrument-recon-match-icon">⚡</span>
                        <strong>98.4% MATCH</strong>
                      </div>
                      <FlowConnector active pulse state="active" />
                      <span className="instrument-recon-bridge-label">Zero Human Ticking</span>
                    </div>

                    <div className="instrument-recon-node instrument-recon-bank">
                      <span className="instrument-recon-kicker">BANK REMITTANCE CREDIT</span>
                      <strong className="instrument-recon-title">UTR98204018274</strong>
                      <div className="instrument-recon-stat">Amount: <strong>₹5,90,000.00 CR</strong></div>
                      <div className="instrument-recon-stat">Source: <strong>HDFC Corporate Feed</strong></div>
                      <span className="instrument-recon-status is-settled">Funds Settled</span>
                    </div>
                  </div>

                  <div className="instrument-recon-cleared-banner">
                    <div className="instrument-cleared-check">✓</div>
                    <div>
                      <strong>Automated Bilateral Clearance Executed</strong>
                      <small>Accounts Receivable credited · Bank account debited · Zero reconciliation variance</small>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "cashflow" && (
                <div className="instrument-doc-view instrument-doc-cashflow">
                  <div className="instrument-cashflow-cockpit">
                    <div className="instrument-cockpit-stat-box">
                      <span className="instrument-cockpit-kicker">RECOGNIZED LIQUID CASH</span>
                      <strong className="instrument-cockpit-value">₹5,90,000.00</strong>
                      <span className="instrument-cockpit-note text-emerald-600">Immediate Working Capital Liquidity</span>
                    </div>

                    <div className="instrument-cash-impact-grid">
                      <div className="instrument-impact-tile">
                        <span>OPERATING CASH RUNWAY</span>
                        <strong>+4.2 Days</strong>
                        <small>Recalibrated automatically</small>
                      </div>
                      <div className="instrument-impact-tile">
                        <span>CASH CONVERSION CYCLE</span>
                        <strong>-8 Days</strong>
                        <small>Sub-30 day cash cycle achieved</small>
                      </div>
                      <div className="instrument-impact-tile">
                        <span>CAPITAL VELOCITY</span>
                        <strong>100% Recycled</strong>
                        <small>Funds available for PO funding</small>
                      </div>
                    </div>

                    <div className="instrument-cash-alloc-bar">
                      <span>Treasury Posture: Available liquidity instantly allocated to upcoming vendor supply commitments</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStage.id === "decision" && (
                <div className="instrument-doc-view instrument-doc-decision">
                  <div className="instrument-closure-dossier">
                    <div className="instrument-closure-header">
                      <div className="instrument-closure-badge">
                        <span className="instrument-closure-beacon" />
                        <span>CLOSED BUSINESS LOOP COMPLETED</span>
                      </div>
                      <h3 className="instrument-closure-title">One Continuous Journey. Verified Truth.</h3>
                      <p className="instrument-closure-sub">
                        TXN-10482 has transitioned from commercial order to physical fulfillment, statutory tax filing, bilateral bank clearance and treasury cash realization.
                      </p>
                    </div>

                    <div className="instrument-closure-stats-deck">
                      <div className="instrument-closure-stat-card">
                        <span className="instrument-closure-stat-kicker">GROSS CONTRACT</span>
                        <strong className="instrument-closure-stat-val">₹5,00,000</strong>
                        <span className="instrument-closure-stat-sub">125 Units Dispatched</span>
                      </div>
                      <div className="instrument-closure-stat-card">
                        <span className="instrument-closure-stat-kicker">TAX PROVISION</span>
                        <strong className="instrument-closure-stat-val">₹90,000</strong>
                        <span className="instrument-closure-stat-sub">IRN Cleared & Mapped</span>
                      </div>
                      <div className="instrument-closure-stat-card">
                        <span className="instrument-closure-stat-kicker">CASH SETTLED</span>
                        <strong className="instrument-closure-stat-val text-emerald-600">₹5,90,000</strong>
                        <span className="instrument-closure-stat-sub">100% In Bank Account</span>
                      </div>
                      <div className="instrument-closure-stat-card">
                        <span className="instrument-closure-stat-kicker">TIME-TO-CASH</span>
                        <strong className="instrument-closure-stat-val text-blue-600">24 Days</strong>
                        <span className="instrument-closure-stat-sub">Zero Ledger Drift</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Canvas Instrument Footer */}
            <footer className="instrument-canvas-footer">
              <div className="instrument-footer-kpi-row">
                <div className="instrument-footer-kpi">
                  <span className="instrument-footer-kpi-k">ACTIVE BALANCE</span>
                  <strong className="instrument-footer-kpi-v">{activeStage.activeBalance}</strong>
                </div>
                <div className="instrument-footer-sep" aria-hidden="true" />
                <div className="instrument-footer-kpi">
                  <span className="instrument-footer-kpi-k">TAX POSTURE</span>
                  <strong className="instrument-footer-kpi-v">{activeStage.taxContext}</strong>
                </div>
                <div className="instrument-footer-sep" aria-hidden="true" />
                <div className="instrument-footer-kpi">
                  <span className="instrument-footer-kpi-k">RECONCILIATION</span>
                  <strong className="instrument-footer-kpi-v">{activeStage.reconciliationState}</strong>
                </div>
              </div>

              <div className="instrument-footer-actions">
                <Button size="small" variant="secondary" onClick={handleNext}>
                  {activeStageIndex === instrumentStages.length - 1 ? "Restart Cycle" : "Advance Stage →"}
                </Button>
              </div>
            </footer>
          </main>

          {/* ----------------------------------------------------------------
              RIGHT SIGNAL POD: Real-Time Financial Ledger & Liquidity Impact
              ---------------------------------------------------------------- */}
          <aside className="instrument-signal-pod instrument-signal-pod--right" aria-label="Financial Impact Signals">
            <div className="instrument-signal-card instrument-signal-card--ledger">
              <div className="instrument-signal-card__head">
                <span className="instrument-signal-tag">FINANCIAL LEDGER STATE</span>
                <span className="instrument-signal-badge is-blue">Live Ledger</span>
              </div>
              <strong className="instrument-signal-metric instrument-signal-metric--mono">
                {activeStage.activeBalance}
              </strong>
              <span className="instrument-signal-title">Active Exposure & Balance</span>
              <p className="instrument-signal-desc">
                {activeStageIndex >= 7
                  ? "Receivable fully settled and cleared. Outstanding debtor exposure reduced to ₹0."
                  : "Recognized as legitimate trade obligation under active Net 30 commercial terms."}
              </p>
            </div>

            <div className="instrument-signal-card instrument-signal-card--cash">
              <div className="instrument-signal-card__head">
                <span className="instrument-signal-tag">LIQUID CASH REALIZED</span>
                <span className={`instrument-signal-badge ${activeStageIndex >= 6 ? "is-verified" : "is-pending"}`}>
                  {activeStageIndex >= 6 ? "Realized in Bank" : "Pending Inflow"}
                </span>
              </div>
              <strong className="instrument-signal-metric instrument-signal-metric--mono text-emerald-600">
                {activeStage.cashRealized}
              </strong>
              <span className="instrument-signal-title">HDFC Host-to-Host Feed</span>
              <p className="instrument-signal-desc">
                {activeStageIndex >= 6
                  ? "Remittance settled in primary corporate operating account. Available for treasury allocation."
                  : "Inbound cash anticipated upon invoice maturity. Monitored by real-time banking rails."}
              </p>
            </div>

            <div className="instrument-signal-hash-card">
              <div className="instrument-hash-row">
                <span className="instrument-hash-title">CRYPTOGRAPHIC AUDIT PROOF</span>
                <span className="instrument-hash-stamp">SHA-256</span>
              </div>
              <code className="instrument-hash-snip">
                {activeStage.id === "order" && "sha256:4a8f9c1b...order_init"}
                {activeStage.id === "inventory" && "sha256:7b2d1e4a...stock_lock"}
                {activeStage.id === "invoice" && "sha256:9c8e4f1a...inv_issued"}
                {activeStage.id === "gst" && "sha256:1a2b3c4d...irp_signed"}
                {activeStage.id === "receivable" && "sha256:5e6f7a8b...ar_posted"}
                {activeStage.id === "collection" && "sha256:9a0b1c2d...cadence_on"}
                {activeStage.id === "bank" && "sha256:3d4e5f6a...bank_credit"}
                {activeStage.id === "reconciliation" && "sha256:7a8b9c0d...reconciled"}
                {activeStage.id === "cashflow" && "sha256:1e2f3a4b...treasury_up"}
                {activeStage.id === "decision" && "sha256:0a1b2c3d...loop_closed"}
              </code>
              <small className="instrument-hash-note">Deterministic audit trail · Zero tampering</small>
            </div>
          </aside>
        </div>

        {/* ==================================================================
            4. CROSS-DEPARTMENT CONDUIT BRIDGE
            Integrated telemetry showing the 5 departments in continuous sync
            ================================================================== */}
        <div className="instrument-conduit-bridge" aria-label="Five Departmental Pipelines Connected to This Transaction">
          <div className="instrument-conduit-node is-active">
            <span className="instrument-conduit-tag">01 · COMMERCIAL</span>
            <strong>SO-10482 Locked</strong>
            <small>₹5,00,000 Base Order</small>
          </div>
          <div className="instrument-conduit-connector" aria-hidden="true">→</div>

          <div className={`instrument-conduit-node ${activeStageIndex >= 1 ? "is-active" : ""}`}>
            <span className="instrument-conduit-tag">02 · WAREHOUSE</span>
            <strong>125 Units Allocated</strong>
            <small>DC-02 Rack HYD-B4</small>
          </div>
          <div className="instrument-conduit-connector" aria-hidden="true">→</div>

          <div className={`instrument-conduit-node ${activeStageIndex >= 3 ? "is-active" : ""}`}>
            <span className="instrument-conduit-tag">03 · COMPLIANCE</span>
            <strong>IRN Hash Signed</strong>
            <small>18% GST Validated</small>
          </div>
          <div className="instrument-conduit-connector" aria-hidden="true">→</div>

          <div className={`instrument-conduit-node ${activeStageIndex >= 7 ? "is-active" : ""}`}>
            <span className="instrument-conduit-tag">04 · RECONCILIATION</span>
            <strong>98% Auto-Matched</strong>
            <small>UTR98204018274</small>
          </div>
          <div className="instrument-conduit-connector" aria-hidden="true">→</div>

          <div className={`instrument-conduit-node ${activeStageIndex >= 9 ? "is-active is-complete" : ""}`}>
            <span className="instrument-conduit-tag">05 · TREASURY</span>
            <strong>₹5,90,000 Realized</strong>
            <small>Loop Complete</small>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LivingTransactionInstrument;

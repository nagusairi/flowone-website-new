import React, { memo, useState, useCallback, Fragment } from "react";
import { Icon } from "./flowone";

/* ==========================================================================
   Section 04A: The Blue-Shift Canvas
   From Fragmented Reality to Connected Business
   ========================================================================== */

interface BusinessFunctionData {
  id: string;
  funcCode: string;
  funcName: string;
  objectName: string;
  reference: string;
  metric: string;
  detail: string;
  // Disconnected System Identity (Option 1 & Option 2)
  incompatibleToolIcon: string;
  incompatibleToolName: string;
  severedStatus: string;
  // Fragmented state data
  siloTag: string;
  siloSymptom: string;
  siloImpact: string;
  // Connected state data
  connectedTag: string;
  connectedLink: string;
  connectedBenefit: string;
}

const businessFunctions: BusinessFunctionData[] = [
  {
    id: "sales",
    funcCode: "01",
    funcName: "SALES & COMMERCIAL",
    objectName: "Customer Order",
    reference: "SO-10482",
    metric: "125 Units · ₹5,00,000",
    detail: "Acme Technologies Pvt Ltd",
    incompatibleToolIcon: "🏢",
    incompatibleToolName: "CRM SYSTEM (ISOLATED)",
    severedStatus: "✕ NO API LINK TO WAREHOUSE",
    siloTag: "SILO 01 · CRM ONLY",
    siloSymptom: "Order trapped in sales CRM",
    siloImpact: "Operations & finance have no visibility into committed delivery terms or pricing approvals.",
    connectedTag: "CONNECTED · SO-10482",
    connectedLink: "Direct lock to Inventory Reserve & Finance Ledger",
    connectedBenefit: "Immediate stock reservation and automated credit review with zero sales-ops drift.",
  },
  {
    id: "operations",
    funcCode: "02",
    funcName: "OPERATIONS & STOCK",
    objectName: "Fulfillment & Reserve",
    reference: "ALLOC-10482",
    metric: "125 Units Allocated",
    detail: "DC-02 Bengaluru Hub",
    incompatibleToolIcon: "📊",
    incompatibleToolName: "EXCEL SPREADSHEET (OFFLINE)",
    severedStatus: "✕ DISPATCH UNKNOWN TO BILLING",
    siloTag: "SILO 02 · OFFLINE SPREADSHEET",
    siloSymptom: "Stock tracked on offline Excel sheet",
    siloImpact: "Finance is unaware of physical dispatch; cannot issue tax invoice until paperwork returns.",
    connectedTag: "CONNECTED · 125 ALLOCATED",
    connectedLink: "Auto-dispatches pick note into E-Way bill & invoice",
    connectedBenefit: "Barcode dispatch trigger automatically initiates billing and compliance without waiting on paper.",
  },
  {
    id: "finance",
    funcCode: "03",
    funcName: "FINANCE & BILLING",
    objectName: "Tax Invoice & Ledger",
    reference: "INV-10482",
    metric: "₹5,90,000 Total Value",
    detail: "Base ₹5,00,000 + 18% GST ₹90,000",
    incompatibleToolIcon: "💼",
    incompatibleToolName: "STANDALONE ACCOUNTING ERP",
    severedStatus: "✕ MANUAL INVOICE RE-KEYING",
    siloTag: "SILO 03 · DISCONNECTED ACCOUNTING",
    siloSymptom: "Re-keyed into standalone ERP",
    siloImpact: "Billing clerk manually copies line items; discrepancies in unit prices delay ledger posting.",
    connectedTag: "CONNECTED · INV-10482",
    connectedLink: "Automated 3-way match across order, dispatch & rate card",
    connectedBenefit: "Zero-reentry general ledger entry posted instantaneously with audit-ready lineage.",
  },
  {
    id: "gst",
    funcCode: "04",
    funcName: "GST & COMPLIANCE",
    objectName: "E-Invoice & Tax",
    reference: "IRN-82104491",
    metric: "18% IGST · ₹90,000",
    detail: "HSN 8471 · NIC Portal Validated",
    incompatibleToolIcon: "🏛️",
    incompatibleToolName: "GOVT TAX WEB PORTAL",
    severedStatus: "✕ TRANSCRIPTION RISK ON IRN",
    siloTag: "SILO 04 · MANUAL GOVT PORTAL",
    siloSymptom: "Copied manually to govt portal",
    siloImpact: "Tax accountant logs into external portal separately; transcription errors risk compliance penalties.",
    connectedTag: "CONNECTED · IRN VERIFIED",
    connectedLink: "Native API E-Invoice IRN & E-Way clearance",
    connectedBenefit: "Instantaneous IRN clearance and QR code stamping with automatic GSTR-1 ledger alignment.",
  },
  {
    id: "collections",
    funcCode: "05",
    funcName: "COLLECTIONS & AGING",
    objectName: "Accounts Receivable",
    reference: "DUE IN 4D",
    metric: "₹5,90,000 Receivable",
    detail: "Net 30 · Customer Terms",
    incompatibleToolIcon: "📑",
    incompatibleToolName: "STATIC AR AGING PRINT",
    severedStatus: "✕ BLIND CALLS (POD UNVERIFIED)",
    siloTag: "SILO 05 · UNTRACKED AGING DUMP",
    siloSymptom: "Static weekly AR spreadsheet dump",
    siloImpact: "Collector calls customer blindly without knowing delivery was delayed by 2 days, causing disputes.",
    connectedTag: "CONNECTED · DUE IN 4D",
    connectedLink: "Dynamic aging clock synced to verified delivery POD",
    connectedBenefit: "Due date calculated dynamically from verified delivery proof; AI predicts payment timeline.",
  },
  {
    id: "banking",
    funcCode: "06",
    funcName: "BANKING & SETTLEMENT",
    objectName: "Bank Reconciliation",
    reference: "HDFC-CORP",
    metric: "₹5,90,000 Settlement",
    detail: "Virtual Account NEFT Match",
    incompatibleToolIcon: "🏦",
    incompatibleToolName: "MONTHLY BANK STATEMENT PDF",
    severedStatus: "✕ 30-DAY STATEMENT DRIFT",
    siloTag: "SILO 06 · STATEMENT DRIFT",
    siloSymptom: "Monthly offline bank statement",
    siloImpact: "Unapplied NEFT credits sit unreconciled for weeks; client credit limit remains blocked.",
    connectedTag: "CONNECTED · 100% RECONCILED",
    connectedLink: "Direct Virtual Account API auto-matching",
    connectedBenefit: "Funds credit matches invoice instantaneously; customer credit unblocks and ledger closes in real time.",
  },
];

/* Option 2: Architectural Silo Department Data */
interface SiloData {
  id: string;
  siloNum: string;
  departmentTitle: string;
  incompatiblePlatform: string;
  functionIds: string[];
  internalBreak: {
    siloHandoff: string;
    connectedHandoff: string;
  };
}

interface SiloBarrierData {
  id: string;
  fromSilo: string;
  toSilo: string;
  siloWarning: string;
  severedConduit: string;
  connectedConduit: string;
}

const silosOption2: SiloData[] = [
  {
    id: "commercial",
    siloNum: "01",
    departmentTitle: "COMMERCIAL & FULFILLMENT",
    incompatiblePlatform: "Isolated Sales CRM & Offline DC-02 Spreadsheets",
    functionIds: ["sales", "operations"],
    internalBreak: {
      siloHandoff: "⚡✕ DISCONNECT: Sales emails order PDF to warehouse · Stock allocators rely on manual inventory counts",
      connectedHandoff: "✦ ZERO-DRIFT LOCK: Order creation instantly triggers barcode inventory reservation in DC-02",
    },
  },
  {
    id: "accounting",
    siloNum: "02",
    departmentTitle: "BILLING & COMPLIANCE",
    incompatiblePlatform: "Standalone Accounting ERP & External NIC Tax Portal",
    functionIds: ["finance", "gst"],
    internalBreak: {
      siloHandoff: "⚡✕ DISCONNECT: Tax accountant logs into external portal separately · Manual transcription of HSN & values",
      connectedHandoff: "✦ REAL-TIME COMPLIANCE: Native API auto-generates IRN QR stamp with instant GSTR-1 ledger alignment",
    },
  },
  {
    id: "treasury",
    siloNum: "03",
    departmentTitle: "RECEIVABLES & SETTLEMENT",
    incompatiblePlatform: "Static Weekly AR Printouts & Monthly Bank PDF Statements",
    functionIds: ["collections", "banking"],
    internalBreak: {
      siloHandoff: "⚡✕ DISCONNECT: Unapplied NEFT credits sit unreconciled for weeks · Customer credit limits remain locked",
      connectedHandoff: "✦ 14MS SETTLEMENT: Virtual account auto-matches NEFT credits in real time · Credit unblocks immediately",
    },
  },
];

const siloBarriersOption2: SiloBarrierData[] = [
  {
    id: "barrier-1",
    fromSilo: "COMMERCIAL",
    toSilo: "BILLING",
    siloWarning: "🛑 SILO PARTITION WALL",
    severedConduit: "⚡✕ SEVERED CONDUIT: Billing delayed waiting for physical paper Proof of Delivery (POD)",
    connectedConduit: "✦ FLOW CONDUIT: Barcode dispatch triggers instant digital E-Way bill & tax invoice",
  },
  {
    id: "barrier-2",
    fromSilo: "BILLING",
    toSilo: "TREASURY",
    siloWarning: "🛑 SILO PARTITION WALL",
    severedConduit: "⚡✕ SEVERED CONDUIT: Weekly untracked AR dump · Customer called without dispatch context",
    connectedConduit: "✦ FLOW CONDUIT: Dynamic aging clock synced to verified delivery proof · AI cash forecast",
  },
];

export const BlueShiftCanvas = memo(function BlueShiftCanvas() {
  const [mode, setMode] = useState<"fragmented" | "connected">("fragmented");
  const [variant, setVariant] = useState<"option1" | "option2">("option2");

  const handleModeChange = useCallback((newMode: "fragmented" | "connected") => {
    setMode(newMode);
  }, []);

  const isConnected = mode === "connected";

  // Helper to render individual function card (Compact Cockpit Micro-Card)
  const renderFunctionCard = (item: BusinessFunctionData, index: number, isOpt2: boolean) => (
    <article
      key={item.id}
      className={`blue-shift-card blue-shift-card--${item.id} ${
        isConnected ? "is-connected-card" : "is-fragmented-card"
      } ${isOpt2 ? "is-option2-card" : ""}`}
      style={{ "--item-index": index } as React.CSSProperties}
    >
      {/* 1. Unified Single Header: Function code + name on left, tool pill on right */}
      <div className="blue-shift-card-header">
        <div className="blue-shift-card-func">
          <span className="blue-shift-card-num">{item.funcCode}</span>
          <span className="blue-shift-card-name">{item.funcName}</span>
        </div>

        <div className={`blue-shift-card-tool-tag ${isConnected ? "is-connected" : "is-silo"}`}>
          <span className="blue-shift-card-tool-icon" aria-hidden="true">
            {isConnected ? "✦" : item.incompatibleToolIcon}
          </span>
          <span className="blue-shift-card-tool-title">
            {isConnected ? "flowOne Unified" : item.incompatibleToolName.replace(/\s*\(.*\)/, "")}
          </span>
          <span className="blue-shift-card-tool-mark" aria-hidden="true">
            {isConnected ? "✦" : "✕"}
          </span>
        </div>
      </div>

      {/* 2. Card Object & Metric */}
      <div className="blue-shift-card-object">
        <div className="blue-shift-object-header-row">
          <span className="blue-shift-object-label">{item.objectName}</span>
          <span className="blue-shift-object-ref">{item.reference}</span>
        </div>
        <strong className="blue-shift-object-metric">{item.metric}</strong>
        <span className="blue-shift-object-detail">{item.detail}</span>
      </div>

      {/* 3. Card Context Body: Clean unboxed description with subtle micro-kicker */}
      <div className="blue-shift-card-body">
        <p className="blue-shift-context-text">
          <span className={`blue-shift-context-prefix ${isConnected ? "is-connected" : "is-silo"}`}>
            {isConnected ? "✦ Shared Context: " : "⚠ Blind Spot: "}
          </span>
          {isConnected ? item.connectedBenefit : item.siloImpact}
        </p>
      </div>

      {/* 4. Card Footer: Sleek 1-line Telemetry Conduit Strip */}
      <div className="blue-shift-card-footer">
        <div className={`blue-shift-conduit-indicator ${isConnected ? "is-connected-conduit" : "is-severed-conduit"}`}>
          <span className="blue-shift-conduit-dot" aria-hidden="true" />
          <span className="blue-shift-conduit-kicker">
            {isConnected ? "CONDUIT:" : "SEVERED:"}
          </span>
          <span className="blue-shift-conduit-text">
            {isConnected ? item.connectedLink : item.severedStatus.replace(/^✕\s*/, "")}
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="blue-shift-canvas-section"
      className="new-home-section blue-shift-canvas-section"
      aria-labelledby="blue-shift-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            1. EDITORIAL INTRODUCTION (Asymmetrical, High-Hierarchy)
            ============================================================== */}
        <div className="blue-shift-intro">
          <div className="blue-shift-intro-left">
            <div className="blue-shift-eyebrow" role="note" aria-label="The Connected Reality">
              <span className="blue-shift-beacon" aria-hidden="true" />
              <span>THE CONNECTED REALITY · TRANSFORMATION MATRIX</span>
            </div>

            <h2 id="blue-shift-heading" className="blue-shift-title">
              The transaction is connected.<br />
              The systems usually aren’t.
            </h2>
          </div>

          <div className="blue-shift-intro-right">
            <p className="blue-shift-copy">
              Sales sees the order. Operations sees the stock. Finance sees the invoice. GST sees the tax. The bank sees the payment.
            </p>
            <p className="blue-shift-emphasis">
              Everyone sees a piece. Nobody sees the whole flow.
            </p>
          </div>
        </div>

        {/* Variant Comparison Selector (Option 1 vs Option 2) */}
        <div className="blue-shift-variant-bar">
          <div className="blue-shift-variant-selector" role="group" aria-label="Section 04A Visual Variants">
            <span className="blue-shift-variant-label">VISUAL DIRECTION:</span>
            <button
              type="button"
              className={`blue-shift-variant-pill ${variant === "option2" ? "is-active" : ""}`}
              onClick={() => setVariant("option2")}
            >
              Option 2: Silo Partition Walls & Severed Conduits
            </button>
            <button
              type="button"
              className={`blue-shift-variant-pill ${variant === "option1" ? "is-active" : ""}`}
              onClick={() => setVariant("option1")}
            >
              Option 1: Incompatible Systems & Physical Drift
            </button>
          </div>
        </div>

        {/* ==============================================================
            2. THE BLUE-SHIFT TRANSFORMATION CANVAS
            The central experiential centerpiece of Section 04A
            ============================================================== */}
        <div
          className={`blue-shift-canvas ${isConnected ? "is-connected-state" : "is-fragmented-state"} ${
            variant === "option2" ? "is-variant-option2" : "is-variant-option1"
          }`}
          role="region"
          aria-label="Transformation Canvas: Comparing Fragmented Reality vs Connected Reality"
        >
          {/* Canvas Ambient Atmosphere */}
          <div className="blue-shift-canvas-glow" aria-hidden="true" />
          <div className="blue-shift-canvas-grid-pattern" aria-hidden="true" />

          {/* Canvas Top Bar: Telemetry + Segmented Mode Switcher */}
          <header className="blue-shift-canvas-topbar">
            <div className="blue-shift-telemetry">
              <div className="blue-shift-telemetry-badge">
                <span
                  className={`blue-shift-telemetry-dot ${isConnected ? "is-connected" : "is-fragmented"}`}
                  aria-hidden="true"
                />
                <span className="blue-shift-telemetry-label">
                  {isConnected
                    ? "ONE SHARED BUSINESS CONTEXT"
                    : variant === "option2"
                    ? "3 DEPARTMENTAL SILOS · SEVERED CONDUITS"
                    : "ONE BUSINESS · 6 DISCONNECTED VIEWS"}
                </span>
              </div>
              <span className="blue-shift-telemetry-txn">
                TXN-10482 · ₹5,90,000 TOTAL CONTRACT
              </span>
            </div>

            {/* Accessible Segmented Control */}
            <div
              className="blue-shift-mode-selector"
              role="tablist"
              aria-label="Select transaction reality view"
            >
              <button
                type="button"
                role="tab"
                id="tab-fragmented"
                aria-selected={!isConnected}
                aria-controls="panel-transformation"
                className={`blue-shift-tab-btn ${!isConnected ? "is-active" : ""}`}
                onClick={() => handleModeChange("fragmented")}
              >
                <span className="blue-shift-tab-icon" aria-hidden="true">✕</span>
                <span>Fragmented Reality</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-connected"
                aria-selected={isConnected}
                aria-controls="panel-transformation"
                className={`blue-shift-tab-btn ${isConnected ? "is-active" : ""}`}
                onClick={() => handleModeChange("connected")}
              >
                <span className="blue-shift-tab-icon is-spark" aria-hidden="true">✦</span>
                <span>Connected Reality</span>
              </button>
            </div>
          </header>

          {/* State Banner: Dynamic Editorial Kicker */}
          <div className="blue-shift-state-banner">
            <div className="blue-shift-state-banner-content">
              <span className="blue-shift-state-kicker">
                {isConnected ? "CONNECTED STATE" : "FRAGMENTED STATE"}
              </span>
              <h3 className="blue-shift-state-headline">
                {isConnected
                  ? "One shared business context."
                  : variant === "option2"
                  ? "Impenetrable departmental silos. Severed conduits."
                  : "One business. Too many disconnected views."}
              </h3>
              <p className="blue-shift-state-desc">
                {isConnected
                  ? "Sales, operations, finance, compliance, collections and banking act from one synchronized transaction object."
                  : variant === "option2"
                  ? "Physical boundaries isolate Commercial, Billing, and Treasury. Broken data conduits require manual paper and phone calls to bridge the gap."
                  : "Critical context drifts across 6 departmental silos. Employees copy data manually to bridge the missing links."}
              </p>
            </div>

            <div className="blue-shift-state-indicator">
              <span className={`blue-shift-indicator-pill ${isConnected ? "is-connected" : "is-fragmented"}`}>
                <span className="blue-shift-indicator-beacon" aria-hidden="true" />
                <span>
                  {isConnected
                    ? "6 of 6 Functions Linked · 0 Re-Entry"
                    : variant === "option2"
                    ? "3 Silos Divided by Partition Walls · 2 Severed Conduits"
                    : "6 Disconnected Silos · Manual Reconciliation"}
                </span>
              </span>
            </div>
          </div>

          {/* Connected SVG Pipeline Rail (Reveals only in Connected State) */}
          <div
            className={`blue-shift-connection-rail ${isConnected ? "is-visible" : "is-hidden"}`}
            aria-hidden="true"
          >
            <div className="blue-shift-rail-line" />
            <div className="blue-shift-rail-pulse-beacon" />
          </div>

          {/* ==============================================================
              3. TRANSFORMATION SURFACES: OPTION 1 vs OPTION 2
              ============================================================== */}
          <div
            id="panel-transformation"
            role="tabpanel"
            aria-labelledby={isConnected ? "tab-connected" : "tab-fragmented"}
          >
            {variant === "option1" ? (
              /* OPTION 1: 3x2 Matrix with Physical Drift & Incompatible Systems */
              <div className="blue-shift-grid">
                {businessFunctions.map((item, index) =>
                  renderFunctionCard(item, index, false)
                )}
              </div>
            ) : (
              /* OPTION 2: 3 Departmental Silos with Partition Walls & Severed Conduits */
              <div className="blue-shift-silos-layout">
                {silosOption2.map((silo, sIdx) => {
                  const firstItem = businessFunctions.find(f => f.id === silo.functionIds[0])!;
                  const secondItem = businessFunctions.find(f => f.id === silo.functionIds[1])!;

                  return (
                    <Fragment key={silo.id}>
                      {/* Department Silo Column */}
                      <div className={`blue-shift-silo-column blue-shift-silo-column--${silo.id}`}>
                        {/* Silo Department Header */}
                        <div className="blue-shift-silo-header">
                          <div className="blue-shift-silo-header-left">
                            <span className="blue-shift-silo-num">SILO {silo.siloNum}</span>
                            <h4 className="blue-shift-silo-name">{silo.departmentTitle}</h4>
                            <span className="blue-shift-silo-platform">
                              {isConnected ? "flowOne SYNCHRONIZED ARCHITECTURE" : silo.incompatiblePlatform}
                            </span>
                          </div>
                          <span className={`blue-shift-silo-badge ${isConnected ? "is-connected" : "is-silo"}`}>
                            {isConnected ? "✦ SYNCHRONIZED" : "🛑 ISOLATED SILO"}
                          </span>
                        </div>

                        {/* Top Card */}
                        {renderFunctionCard(firstItem, sIdx * 2, true)}

                        {/* Internal Department Handoff Indicator */}
                        <div
                          className={`blue-shift-internal-handoff ${
                            isConnected ? "is-connected-handoff" : "is-severed-handoff"
                          }`}
                        >
                          <span className="blue-shift-handoff-icon" aria-hidden="true">
                            {isConnected ? "✦" : "⚡✕"}
                          </span>
                          <span className="blue-shift-handoff-text">
                            {isConnected ? silo.internalBreak.connectedHandoff : silo.internalBreak.siloHandoff}
                          </span>
                        </div>

                        {/* Bottom Card */}
                        {renderFunctionCard(secondItem, sIdx * 2 + 1, true)}
                      </div>

                      {/* Silo Partition Wall & Severed Conduit Barrier between Columns */}
                      {sIdx < silosOption2.length - 1 && (
                        <div
                          className={`blue-shift-silo-barrier ${
                            isConnected ? "is-connected-barrier" : "is-severed-barrier"
                          }`}
                          aria-label={isConnected ? "Connected Conduit Gateway" : "Silo Partition Wall Barrier"}
                        >
                          <div className="blue-shift-barrier-line" />
                          <div className="blue-shift-barrier-badge">
                            <span className="blue-shift-barrier-kicker">
                              {isConnected ? "✦ FLOW CONDUIT" : siloBarriersOption2[sIdx].siloWarning}
                            </span>
                            <span className="blue-shift-barrier-reason">
                              {isConnected
                                ? siloBarriersOption2[sIdx].connectedConduit
                                : siloBarriersOption2[sIdx].severedConduit}
                            </span>
                          </div>
                          <div className="blue-shift-barrier-line" />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>

          {/* ==============================================================
              4. STRONG CONNECTED-STATE CONCLUSION
              Editorial closing panel reinforcing the central thesis
              ============================================================== */}
          <footer
            className={`blue-shift-conclusion ${
              isConnected ? "is-connected-conclusion" : "is-fragmented-conclusion"
            }`}
          >
            <div className="blue-shift-conclusion-left">
              <span className="blue-shift-conclusion-kicker">
                {isConnected ? "✦ THE CONNECTED ADVANTAGE" : "⚠️ THE FRAGMENTATION TAX"}
              </span>
              <h4 className="blue-shift-conclusion-heading">
                {isConnected
                  ? "Connect the work that moves your business."
                  : "When systems are severed, your teams become the API."}
              </h4>
              <p className="blue-shift-conclusion-sub">
                {isConnected
                  ? "flowOne binds order entry, stock allocation, tax compliance, invoicing, collections, and cash into one continuous, tamper-evident pipeline."
                  : "Manual re-entry causes data drift, delayed invoicing, compliance mismatches, uncollected revenue, and weeks of bank reconciliation friction."}
              </p>
            </div>

            <div className="blue-shift-conclusion-stats">
              <div className="blue-shift-stat-item">
                <strong className="blue-shift-stat-value">
                  {isConnected ? "100%" : "0%"}
                </strong>
                <span className="blue-shift-stat-label">
                  {isConnected ? "Shared Lineage" : "Direct Context"}
                </span>
              </div>

              <div className="blue-shift-stat-item">
                <strong className="blue-shift-stat-value">
                  {isConnected ? "0" : "6x"}
                </strong>
                <span className="blue-shift-stat-label">
                  {isConnected ? "Manual Re-entry" : "Duplicate Entry"}
                </span>
              </div>

              <div className="blue-shift-stat-item">
                <strong className="blue-shift-stat-value">
                  {isConnected ? "14ms" : "4-7d"}
                </strong>
                <span className="blue-shift-stat-label">
                  {isConnected ? "Cross-team Sync" : "Reconciliation Lag"}
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
});

export default BlueShiftCanvas;

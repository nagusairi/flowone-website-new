import { memo, useState, useCallback } from "react";
import { Icon } from "./flowone";

/* ==========================================================================
   Section 04B: The Connected Business Blueprint
   One Business. One Connected Operating Model.
   An architectural representation of flowOne linking 6 business functions
   around one central shared transaction context.
   ========================================================================== */

interface BlueprintNode {
  id: string;
  nodeNumber: string;
  funcName: string;
  responsibility: string;
  objectKey: string;
  metric: string;
  detail: string;
  wing: "left" | "right";
  // Architectural connection data
  upstreamFeed: string;
  downstreamFeed: string;
  sharedContextRole: string;
  assuranceNote: string;
  relatedNodeIds: string[];
}

const blueprintNodes: BlueprintNode[] = [
  {
    id: "sales",
    nodeNumber: "NODE-01",
    funcName: "Sales",
    responsibility: "Customer and order",
    objectKey: "SO-10482",
    metric: "125 Units · ₹5,00,000",
    detail: "Acme Technologies Pvt Ltd",
    wing: "left",
    upstreamFeed: "Commercial Contract & PO Approval",
    downstreamFeed: "Stock Reservation (DC-02) & Invoice Generation",
    sharedContextRole: "Initiates the transaction context. Commits customer terms, quantities, and agreed rate cards.",
    assuranceNote: "Locks commercial parameters into the ledger spine so operations and billing never act on drifted rates.",
    relatedNodeIds: ["operations", "finance"],
  },
  {
    id: "operations",
    nodeNumber: "NODE-02",
    funcName: "Operations",
    responsibility: "Stock and fulfilment",
    objectKey: "ALLOC-10482",
    metric: "125 Units Picked & Packed",
    detail: "DC-02 Bengaluru Hub",
    wing: "left",
    upstreamFeed: "Sales Order SO-10482 Line Items",
    downstreamFeed: "E-Way Bill Clearance & 3-Way Match",
    sharedContextRole: "Validates physical fulfillment. Confirms serial numbers, batch numbers, and dispatch timestamps.",
    assuranceNote: "Barcode pick-and-pack verification triggers the e-way bill and billing events without human re-entry.",
    relatedNodeIds: ["sales", "finance", "compliance"],
  },
  {
    id: "finance",
    nodeNumber: "NODE-03",
    funcName: "Finance",
    responsibility: "Invoice and ledger",
    objectKey: "INV-10482",
    metric: "₹5,90,000 Total Value",
    detail: "Base ₹5,00,000 + 18% GST ₹90,000",
    wing: "left",
    upstreamFeed: "SO-10482 Terms + DC-02 Dispatch Note",
    downstreamFeed: "IRN Registration & Accounts Receivable",
    sharedContextRole: "Executes programmatic 3-way match. Posts tamper-evident journal entries across tax and AR ledgers.",
    assuranceNote: "Matches contract price against dispatched quantity automatically; eliminates manual billing discrepancies.",
    relatedNodeIds: ["sales", "operations", "compliance", "collections"],
  },
  {
    id: "compliance",
    nodeNumber: "NODE-04",
    funcName: "Compliance",
    responsibility: "GST and validation",
    objectKey: "IRN-82104491",
    metric: "18% IGST · ₹90,000",
    detail: "HSN 8471 · NIC Portal Validated",
    wing: "right",
    upstreamFeed: "INV-10482 Line Items & Transporter ID",
    downstreamFeed: "Customer E-Invoice & GSTR-1 Ledger",
    sharedContextRole: "Interfaces directly with government tax infrastructure. Obtains digital signature and QR code clearance.",
    assuranceNote: "Generates E-Invoice IRN and e-way bill in real time; tax ledgers align with 100% compliance integrity.",
    relatedNodeIds: ["operations", "finance", "collections"],
  },
  {
    id: "collections",
    nodeNumber: "NODE-05",
    funcName: "Collections",
    responsibility: "Receivables and follow-up",
    objectKey: "DUE IN 4D",
    metric: "₹5,90,000 Receivable",
    detail: "Net 30 · Calibrated to Delivery",
    wing: "right",
    upstreamFeed: "INV-10482 + Verified Delivery POD",
    downstreamFeed: "Bank Settlement Matching Forecast",
    sharedContextRole: "Tracks customer payment clock calibrated to verified delivery date; provides dynamic cash forecast.",
    assuranceNote: "Prevents customer disputes by synchronizing due dates with verified logistics proof of delivery.",
    relatedNodeIds: ["finance", "banking"],
  },
  {
    id: "banking",
    nodeNumber: "NODE-06",
    funcName: "Banking",
    responsibility: "Payment and reconciliation",
    objectKey: "HDFC-CORP",
    metric: "100% Reconciled · ₹5,90,000",
    detail: "Virtual Account NEFT Credit",
    wing: "right",
    upstreamFeed: "Bank Core API & Incoming NEFT Feed",
    downstreamFeed: "Ledger Closure & Credit Limit Reset",
    sharedContextRole: "Matches incoming credits to INV-10482 via Virtual Account; automatically marks receivable paid.",
    assuranceNote: "Closes the transaction loop instantly upon bank clearance; unblocks customer credit without manual delay.",
    relatedNodeIds: ["collections", "finance"],
  },
];

export const ConnectedBusinessBlueprint = memo(function ConnectedBusinessBlueprint() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleSelectNode = useCallback((id: string) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  const handleReset = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const selectedNode = blueprintNodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <section
      id="connected-blueprint-section"
      className="new-home-section connected-blueprint-section"
      aria-labelledby="blueprint-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            A. EDITORIAL INTRODUCTION (Asymmetric, Blueprint Anchor)
            ============================================================== */}
        <div className="blueprint-intro">
          <div className="blueprint-intro-left">
            <div className="blueprint-eyebrow" role="note" aria-label="Connected Business Architecture">
              <span className="blueprint-beacon" aria-hidden="true" />
              <span>CONNECTED BUSINESS ARCHITECTURE · BLUEPRINT</span>
            </div>

            <h2 id="blueprint-heading" className="blueprint-title">
              Every function sees its part.<br />
              flowOne connects the whole.
            </h2>
          </div>

          <div className="blueprint-intro-right">
            <p className="blueprint-subtext">
              Shared transaction context connects the work across your business.
            </p>
            <div className="blueprint-spec-tag">
              <span className="blueprint-spec-label">BLUEPRINT SPEC:</span>
              <span className="blueprint-spec-code">FO-ARCH-10482 // CONTINUOUS OPERATING MODEL</span>
            </div>
          </div>
        </div>

        {/* ==============================================================
            B. THE CONNECTED ARCHITECTURAL BLUEPRINT CANVAS
            ============================================================== */}
        <div
          className={`connected-business-blueprint ${selectedNode ? "is-node-inspected" : "is-system-overview"}`}
          role="region"
          aria-label="Connected Business Blueprint: Interactive Architectural Operating Model"
        >
          {/* Blueprint Grid & Technical Calibrations */}
          <div className="blueprint-canvas-grid" aria-hidden="true" />
          <div className="blueprint-ambient-glow" aria-hidden="true" />

          {/* Blueprint Canvas Header & Filter Strip */}
          <header className="blueprint-canvas-header">
            <div className="blueprint-canvas-status">
              <span className="blueprint-status-dot" aria-hidden="true" />
              <span className="blueprint-status-title">SYSTEM TOPOLOGY: LIVE ARCHITECTURAL MATRIX</span>
              <span className="blueprint-status-sep">·</span>
              <span className="blueprint-status-active-count">
                {selectedNode
                  ? `INSPECTING ${selectedNode.nodeNumber} (${selectedNode.funcName.toUpperCase()})`
                  : "ALL 6 OPERATIONAL NODES ACTIVE"}
              </span>
            </div>

            {/* Quick Node Navigation Buttons */}
            <div
              className="blueprint-node-selector"
              role="toolbar"
              aria-label="Filter blueprint node connection"
            >
              <button
                type="button"
                className={`blueprint-selector-btn ${selectedNodeId === null ? "is-active" : ""}`}
                onClick={handleReset}
                aria-pressed={selectedNodeId === null}
              >
                <span>✦ Overview</span>
              </button>

              {blueprintNodes.map((node) => {
                const isCurrent = selectedNodeId === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    className={`blueprint-selector-btn ${isCurrent ? "is-active" : ""}`}
                    onClick={() => handleSelectNode(node.id)}
                    aria-pressed={isCurrent}
                  >
                    <span className="blueprint-btn-num">{node.nodeNumber.replace("NODE-", "")}</span>
                    <span>{node.funcName}</span>
                  </button>
                );
              })}
            </div>
          </header>

          {/* ==============================================================
              C. MAIN ARCHITECTURAL BLUEPRINT STAGE
              Central Shared Transaction Anchor flanked by Left & Right Functions
              ============================================================== */}
          <div className="blueprint-stage-layout">
            {/* LEFT WING: Commercial, Physical, and Financial Entry */}
            <div className="blueprint-wing blueprint-wing--left">
              <div className="blueprint-wing-header">
                <span className="blueprint-wing-tag">WING A // COMMERCIAL & DISPATCH</span>
              </div>

              <div className="blueprint-wing-nodes">
                {blueprintNodes.filter((n) => n.wing === "left").map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isRelated = selectedNode?.relatedNodeIds.includes(node.id) ?? false;
                  const isDimmed = selectedNodeId !== null && !isSelected && !isRelated;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      id={`blueprint-node-${node.id}`}
                      className={`blueprint-node-card ${isSelected ? "is-selected" : ""} ${
                        isRelated ? "is-related" : ""
                      } ${isDimmed ? "is-dimmed" : ""}`}
                      onClick={() => handleSelectNode(node.id)}
                      aria-expanded={isSelected}
                      aria-label={`${node.nodeNumber}: ${node.funcName} — ${node.responsibility}`}
                    >
                      <div className="blueprint-node-top">
                        <div className="blueprint-node-identity">
                          <span className="blueprint-node-code">{node.nodeNumber}</span>
                          <strong className="blueprint-node-name">{node.funcName}</strong>
                        </div>
                        <span className="blueprint-node-ref">{node.objectKey}</span>
                      </div>

                      <div className="blueprint-node-sub">
                        <span className="blueprint-node-resp">{node.responsibility}</span>
                      </div>

                      <div className="blueprint-node-metric-box">
                        <span className="blueprint-metric-val">{node.metric}</span>
                        <span className="blueprint-metric-det">{node.detail}</span>
                      </div>

                      <div className="blueprint-node-port blueprint-port-right" aria-hidden="true">
                        <span className="blueprint-port-line" />
                        <span className="blueprint-port-terminal" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CENTRAL ANCHOR: ONE SHARED TRANSACTION CONTEXT */}
            <div className="blueprint-center-spine" aria-label="Central Shared Transaction Context">
              <div className="blueprint-spine-conduit-left" aria-hidden="true" />

              <div className="blueprint-spine-core">
                <div className="blueprint-core-topbar">
                  <div className="blueprint-core-beacon-box">
                    <span className="blueprint-core-beacon" aria-hidden="true" />
                    <span className="blueprint-core-kicker">CENTRAL TRANSACTION SPINE</span>
                  </div>
                  <span className="blueprint-core-live-tag">TXN-10482 · LIVE CONDUIT</span>
                </div>

                <div className="blueprint-core-main">
                  <span className="blueprint-core-label">SHARED BUSINESS CONTEXT</span>
                  <strong className="blueprint-core-title">TXN-10482 · ₹5,90,000</strong>
                  <span className="blueprint-core-customer">Acme Technologies Pvt Ltd</span>
                </div>

                <div className="blueprint-core-stats-grid">
                  <div className="blueprint-core-stat">
                    <span className="blueprint-stat-lbl">SYNCHRONIZATION</span>
                    <strong className="blueprint-stat-val">6 of 6 Active</strong>
                  </div>
                  <div className="blueprint-core-stat">
                    <span className="blueprint-stat-lbl">DRIFT LATENCY</span>
                    <strong className="blueprint-stat-val">0ms · Unified</strong>
                  </div>
                  <div className="blueprint-core-stat">
                    <span className="blueprint-stat-lbl">DATA REDUNDANCY</span>
                    <strong className="blueprint-stat-val">0 Re-Entry</strong>
                  </div>
                  <div className="blueprint-core-stat">
                    <span className="blueprint-stat-lbl">AUDIT INTEGRITY</span>
                    <strong className="blueprint-stat-val">Append-Only</strong>
                  </div>
                </div>

                <div className="blueprint-core-footer">
                  <div className="blueprint-core-feed-track">
                    <span className="blueprint-core-pulse-bar" aria-hidden="true" />
                    <span className="blueprint-core-feed-text">
                      {selectedNode
                        ? `Tracing active conduit: ${selectedNode.funcName} (${selectedNode.objectKey}) ↔ Shared Spine`
                        : "Continuous flow: Orders, stock, invoices, tax, AR and bank feed the same object"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="blueprint-spine-conduit-right" aria-hidden="true" />
            </div>

            {/* RIGHT WING: Compliance, Collections, and Liquidity */}
            <div className="blueprint-wing blueprint-wing--right">
              <div className="blueprint-wing-header">
                <span className="blueprint-wing-tag">WING B // COMPLIANCE & CASH</span>
              </div>

              <div className="blueprint-wing-nodes">
                {blueprintNodes.filter((n) => n.wing === "right").map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isRelated = selectedNode?.relatedNodeIds.includes(node.id) ?? false;
                  const isDimmed = selectedNodeId !== null && !isSelected && !isRelated;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      id={`blueprint-node-${node.id}`}
                      className={`blueprint-node-card ${isSelected ? "is-selected" : ""} ${
                        isRelated ? "is-related" : ""
                      } ${isDimmed ? "is-dimmed" : ""}`}
                      onClick={() => handleSelectNode(node.id)}
                      aria-expanded={isSelected}
                      aria-label={`${node.nodeNumber}: ${node.funcName} — ${node.responsibility}`}
                    >
                      <div className="blueprint-node-port blueprint-port-left" aria-hidden="true">
                        <span className="blueprint-port-terminal" />
                        <span className="blueprint-port-line" />
                      </div>

                      <div className="blueprint-node-top">
                        <div className="blueprint-node-identity">
                          <span className="blueprint-node-code">{node.nodeNumber}</span>
                          <strong className="blueprint-node-name">{node.funcName}</strong>
                        </div>
                        <span className="blueprint-node-ref">{node.objectKey}</span>
                      </div>

                      <div className="blueprint-node-sub">
                        <span className="blueprint-node-resp">{node.responsibility}</span>
                      </div>

                      <div className="blueprint-node-metric-box">
                        <span className="blueprint-metric-val">{node.metric}</span>
                        <span className="blueprint-metric-det">{node.detail}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ==============================================================
              D. TECHNICAL ARCHITECTURAL INSPECTOR PANEL
              Updates in real-time when a function is selected or hovered
              ============================================================== */}
          <div className="blueprint-inspector" aria-live="polite">
            <div className="blueprint-inspector-header">
              <div className="blueprint-inspector-tag">
                <span className="blueprint-inspector-icon" aria-hidden="true">✦</span>
                <span>
                  {selectedNode
                    ? `NODE INSPECTION TELEMETRY // ${selectedNode.nodeNumber} · ${selectedNode.funcName.toUpperCase()}`
                    : "GLOBAL TOPOLOGY TELEMETRY // UNIFIED OPERATING MODEL"}
                </span>
              </div>
              {selectedNode && (
                <button
                  type="button"
                  className="blueprint-inspector-close-btn"
                  onClick={handleReset}
                  aria-label="Return to full architectural overview"
                >
                  <span>Reset to Overview ✕</span>
                </button>
              )}
            </div>

            <div className="blueprint-inspector-grid">
              <div className="blueprint-inspector-col">
                <span className="blueprint-inspector-label">OPERATING RESPONSIBILITY</span>
                <strong className="blueprint-inspector-value">
                  {selectedNode
                    ? `${selectedNode.funcName}: ${selectedNode.responsibility}`
                    : "Continuous Transaction Integrity Across All Functions"}
                </strong>
                <p className="blueprint-inspector-desc">
                  {selectedNode
                    ? selectedNode.sharedContextRole
                    : "Every operational change in sales, warehousing, invoicing, tax, collections or bank reconciliation immediately registers inside the centralized transaction spine."}
                </p>
              </div>

              <div className="blueprint-inspector-col">
                <span className="blueprint-inspector-label">ARCHITECTURAL CONDUITS</span>
                <div className="blueprint-conduit-pair">
                  <div className="blueprint-conduit-item">
                    <span className="blueprint-conduit-kicker">UPSTREAM FEED:</span>
                    <span className="blueprint-conduit-val">
                      {selectedNode ? selectedNode.upstreamFeed : "Customer Purchase Orders & Commercial Commitments"}
                    </span>
                  </div>
                  <div className="blueprint-conduit-item">
                    <span className="blueprint-conduit-kicker">DOWNSTREAM FEED:</span>
                    <span className="blueprint-conduit-val">
                      {selectedNode ? selectedNode.downstreamFeed : "Real-time General Ledger, GST Returns & Cash Flow"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="blueprint-inspector-col blueprint-inspector-col--highlight">
                <span className="blueprint-inspector-label">SYSTEM ASSURANCE</span>
                <p className="blueprint-assurance-text">
                  {selectedNode
                    ? selectedNode.assuranceNote
                    : "No employee copies data between disconnected systems. Errors, transcription drift, and month-end reconciliation bottlenecks are architecturally eliminated."}
                </p>
              </div>
            </div>
          </div>

          {/* ==============================================================
              E. SHARED OUTCOME
              "One informed business decision."
              ============================================================== */}
          <footer className="blueprint-outcome-dock" aria-label="Shared Outcome of Connected Architecture">
            <div className="blueprint-outcome-left">
              <div className="blueprint-outcome-badge">
                <span className="blueprint-outcome-dot" aria-hidden="true" />
                <span>ARCHITECTURAL CONSEQUENCE</span>
              </div>
              <h3 className="blueprint-outcome-title">
                One informed business decision.
              </h3>
              <p className="blueprint-outcome-desc">
                When commercial, physical, legal, and financial realities share one transaction context, leaders act on truth—not reports compiled days after the fact.
              </p>
            </div>

            <div className="blueprint-outcome-telemetry">
              <div className="blueprint-outcome-metric">
                <span className="blueprint-outcome-metric-label">SINGLE TRUTH SOURCE</span>
                <strong className="blueprint-outcome-metric-value">100%</strong>
                <span className="blueprint-outcome-metric-sub">Lineage verified</span>
              </div>

              <div className="blueprint-outcome-sep" aria-hidden="true" />

              <div className="blueprint-outcome-metric">
                <span className="blueprint-outcome-metric-label">RECONCILIATION LAG</span>
                <strong className="blueprint-outcome-metric-value">0 Days</strong>
                <span className="blueprint-outcome-metric-sub">Continuous closing</span>
              </div>

              <div className="blueprint-outcome-sep" aria-hidden="true" />

              <div className="blueprint-outcome-metric">
                <span className="blueprint-outcome-metric-label">DECISION LATENCY</span>
                <strong className="blueprint-outcome-metric-value">Real-time</strong>
                <span className="blueprint-outcome-metric-sub">Immediate visibility</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
});

export default ConnectedBusinessBlueprint;

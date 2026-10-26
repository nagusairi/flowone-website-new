import { memo, useState, useCallback, useId } from "react";
import { Icon } from "./flowone";

/* ==========================================================================
   Section 05: The Business Control Atlas (Direction B)
   Six roles. One connected operating picture.
   An architectural operating system connecting functional perspectives
   around shared business transaction context.
   ========================================================================== */

export type AtlasRoleId =
  | "owner"
  | "cfo"
  | "controller"
  | "procurement"
  | "operations"
  | "compliance";

export interface AtlasSignal {
  label: string;
  value: string;
  sub: string;
  tone?: "primary" | "cyan" | "neutral" | "success";
}

export interface AtlasRoleConfig {
  id: AtlasRoleId;
  roleNumber: string;
  name: string;
  shortName: string;
  perspective: string;
  description: string;
  kicker: string;
  connectedStages: string[];
  workflowLineage: {
    upstream: string;
    downstream: string;
    contextRelation: string;
  };
  signals: AtlasSignal[];
  procurementWorkflow?: string[];
}

const ATLAS_ROLES: Record<AtlasRoleId, AtlasRoleConfig> = {
  controller: {
    id: "controller",
    roleNumber: "03",
    name: "Finance Controller",
    shortName: "Controller",
    perspective: "Financial control and transaction accuracy",
    description: "Maintain visibility across financial operations and transaction accuracy.",
    kicker: "FINANCIAL INTEGRITY & ACCURACY",
    connectedStages: ["Invoice", "Receivable"],
    workflowLineage: {
      upstream: "Approved Dispatch & PO-4091 Terms",
      downstream: "IRN Registration & Ledger Posting",
      contextRelation: "Validates 3-way match across orders, stock notes, and billing ledgers.",
    },
    signals: [
      { label: "INVOICE STATUS", value: "INV-10482 Posted", sub: "Base ₹5,00,000 + GST ₹90,000", tone: "primary" },
      { label: "RECONCILIATION", value: "100% Matched", sub: "Sub-second ledger-to-bank match", tone: "success" },
      { label: "LEDGER DRIFT", value: "₹0.00 Variance", sub: "Tamper-evident double entry", tone: "neutral" },
      { label: "GST TREATMENT", value: "IRN Verified", sub: "Direct IRP & GSTR-1 sync", tone: "cyan" },
    ],
  },
  owner: {
    id: "owner",
    roleNumber: "01",
    name: "Business Owner",
    shortName: "Owner",
    perspective: "Business performance and overall operational visibility",
    description: "Understand how business activity connects to financial outcomes.",
    kicker: "COMMERCIAL VELOCITY & HEALTH",
    connectedStages: ["Order", "Cash"],
    workflowLineage: {
      upstream: "Customer Contract & Commercial Terms",
      downstream: "Working Capital Runway Recycling",
      contextRelation: "Translates operational transactions directly into forward growth runways.",
    },
    signals: [
      { label: "ANNUAL REVENUE", value: "₹8.4 Cr ARR", sub: "+18.4% YoY trajectory", tone: "primary" },
      { label: "ORDER VELOCITY", value: "SO-10482 Active", sub: "125 units confirmed", tone: "neutral" },
      { label: "EXPECTED CASH", value: "₹5,90,000", sub: "Realization in 4 days", tone: "cyan" },
      { label: "FORWARD RUNWAY", value: "18 Months", sub: "92% cashflow confidence", tone: "success" },
    ],
  },
  cfo: {
    id: "cfo",
    roleNumber: "02",
    name: "CFO",
    shortName: "CFO",
    perspective: "Financial position and forward-looking decisions",
    description: "Connect financial position with the decisions that shape what comes next.",
    kicker: "TREASURY & LIQUIDITY RUNWAY",
    connectedStages: ["Receivable", "Cash"],
    workflowLineage: {
      upstream: "Invoiced Receivables Portfolio",
      downstream: "Multi-Bank Settlement & Treasury Forecast",
      contextRelation: "Forecasts dynamic cash positions and working capital velocity in real time.",
    },
    signals: [
      { label: "RECEIVABLES EXPOSURE", value: "₹5,90,000", sub: "Net 30 · Due in 4 days", tone: "primary" },
      { label: "EXPECTED INFLOW", value: "₹14.8 Lakh", sub: "4 invoices scheduled this week", tone: "cyan" },
      { label: "LIQUID CASH", value: "₹1.42 Cr", sub: "Optimal treasury buffer", tone: "success" },
      { label: "DSO TRAJECTORY", value: "-18 Days", sub: "Automated collection speed", tone: "neutral" },
    ],
  },
  procurement: {
    id: "procurement",
    roleNumber: "04",
    name: "Procurement",
    shortName: "Procurement",
    perspective: "Purchasing and supplier-side operations",
    description: "Connect purchasing activity with goods receipt, supplier invoicing and payment.",
    kicker: "SPEND GOVERNANCE & SUPPLIER FLOW",
    connectedStages: ["Inventory", "Invoice"],
    workflowLineage: {
      upstream: "Sales Order Stock Allocation Demands",
      downstream: "Supplier Bill Clearance & AP Settlement",
      contextRelation: "Enforces multi-tier purchasing approval and goods receipt verification.",
    },
    procurementWorkflow: [
      "Demand",
      "Purchase Request",
      "Purchase Order",
      "Supplier",
      "Goods Received",
      "Supplier Invoice",
      "Payment",
    ],
    signals: [
      { label: "PO COMMITMENT", value: "PO-4091 Approved", sub: "₹3,20,000 spend committed", tone: "primary" },
      { label: "SUPPLIER ON-TIME", value: "98.2% OTIF", sub: "Precision Components Ltd", tone: "success" },
      { label: "3-WAY MATCH", value: "100% Match", sub: "PO vs GRN-2041 vs Bill", tone: "cyan" },
      { label: "CREDIT SCHEDULE", value: "Net 45 Days", sub: "Automated AP payment run", tone: "neutral" },
    ],
  },
  operations: {
    id: "operations",
    roleNumber: "05",
    name: "Warehouse & Operations",
    shortName: "Operations",
    perspective: "Stock availability, allocation, and fulfilment",
    description: "See what is available, what is committed, and what needs operational attention.",
    kicker: "FULFILLMENT & STOCK VELOCITY",
    connectedStages: ["Order", "Inventory"],
    workflowLineage: {
      upstream: "Sales Order SO-10482 Allocation",
      downstream: "DC Pick-Pack & E-Way Bill Clearance",
      contextRelation: "Binds inventory reservation directly to order commitments and dispatch gates.",
    },
    signals: [
      { label: "AVAILABLE STOCK", value: "450 Units", sub: "Total regional warehouse reserve", tone: "neutral" },
      { label: "ALLOCATED STOCK", value: "125 Units", sub: "Reserved for SO-10482", tone: "primary" },
      { label: "DISPATCH HUB", value: "DC-02 Bhiwandi", sub: "Bay 04 · Ready for carrier", tone: "cyan" },
      { label: "TURN TIME", value: "4.2 Hours", sub: "Pick-to-ship barcode scan", tone: "success" },
    ],
  },
  compliance: {
    id: "compliance",
    roleNumber: "06",
    name: "Compliance",
    shortName: "Compliance",
    perspective: "Compliance visibility within the transaction",
    description: "Keep relevant compliance work connected to the transactions it supports.",
    kicker: "STATUTORY LINEAGE & CLEARANCE",
    connectedStages: ["Invoice", "Receivable"],
    workflowLineage: {
      upstream: "INV-10482 Itemized Tax & Transporter Data",
      downstream: "Customer QR Invoice & GSTR-1 Ledger",
      contextRelation: "Performs instant statutory handshake with government tax infrastructure.",
    },
    signals: [
      { label: "IRN GENERATION", value: "IRN-82104491", sub: "Validated in <1.2s via NIC", tone: "success" },
      { label: "GST ASSESSMENT", value: "18% IGST ₹90,000", sub: "HSN 8471 classification", tone: "primary" },
      { label: "E-WAY BILL", value: "EWB-901844", sub: "Active & transporter linked", tone: "cyan" },
      { label: "ITC ACCURACY", value: "Zero Mismatch", sub: "Clean 2B credit lineage", tone: "neutral" },
    ],
  },
};

const ROLE_ORDER: AtlasRoleId[] = [
  "controller", // Default per prompt
  "owner",
  "cfo",
  "procurement",
  "operations",
  "compliance",
];

const SHARED_CONTEXT_STAGES = [
  { id: "Order", label: "Order", code: "SO-10482", detail: "125 Units Confirmed" },
  { id: "Inventory", label: "Inventory", code: "DC-02", detail: "Stock Allocated" },
  { id: "Invoice", label: "Invoice", code: "INV-10482", detail: "₹5,90,000 Total" },
  { id: "Receivable", label: "Receivable", code: "NET 30", detail: "Due in 4 Days" },
  { id: "Cash", label: "Cash", code: "HDFC-09", detail: "Working Runway" },
];

const ConnectedBusinessAtlas = memo(function ConnectedBusinessAtlas() {
  // Default is Finance Controller as specified in the prompt
  const [activeRoleId, setActiveRoleId] = useState<AtlasRoleId>("controller");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const atlasRegionId = useId();

  const handleRoleSelect = useCallback((roleId: AtlasRoleId) => {
    setActiveRoleId(roleId);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const currentIndex = ROLE_ORDER.indexOf(activeRoleId);
    if (deltaX > 45) {
      // Swiped right -> prev role
      const prevIndex = (currentIndex - 1 + ROLE_ORDER.length) % ROLE_ORDER.length;
      setActiveRoleId(ROLE_ORDER[prevIndex]);
    } else if (deltaX < -45) {
      // Swiped left -> next role
      const nextIndex = (currentIndex + 1) % ROLE_ORDER.length;
      setActiveRoleId(ROLE_ORDER[nextIndex]);
    }
    setTouchStartX(null);
  }, [activeRoleId, touchStartX]);

  const activeRole = ATLAS_ROLES[activeRoleId];

  // Carousel indexes for mobile / tablet
  const currentIdx = ROLE_ORDER.indexOf(activeRoleId);
  const prevIdx = (currentIdx - 1 + ROLE_ORDER.length) % ROLE_ORDER.length;
  const prev2Idx = (currentIdx - 2 + ROLE_ORDER.length) % ROLE_ORDER.length;
  const nextIdx = (currentIdx + 1) % ROLE_ORDER.length;
  const next2Idx = (currentIdx + 2) % ROLE_ORDER.length;

  const prevRole = ATLAS_ROLES[ROLE_ORDER[prevIdx]];
  const prev2Role = ATLAS_ROLES[ROLE_ORDER[prev2Idx]];
  const nextRole = ATLAS_ROLES[ROLE_ORDER[nextIdx]];
  const next2Role = ATLAS_ROLES[ROLE_ORDER[next2Idx]];

  return (
    <section
      id="connected-business-atlas-section"
      className="new-home-section connected-business-atlas-section"
      aria-labelledby="atlas-section-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            A. EDITORIAL INTRODUCTION (Strict Approved Copy)
            ============================================================== */}
        <header className="atlas-editorial-intro">
          <div className="atlas-intro-left">
            <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
              <div className="hero-modern-eyebrow is-static" role="note" aria-label="Connected Business Architecture">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>ARCHITECTURE</span>
                </span>
                <span className="hero-eyebrow-title">CONNECTED BUSINESS ARCHITECTURE</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <h2 id="atlas-section-heading" className="atlas-title">
              Every function sees its part. flowOne connects the whole.
            </h2>
          </div>

          <div className="atlas-intro-right">
            <p className="atlas-supporting-copy">
              Shared transaction context connects the work across your business.
            </p>
          </div>
        </header>

        {/* ==============================================================
            B. MOBILE & TABLET RESPONSIVE CAPSULE SELECTOR
            ============================================================== */}
        <div
          className="atlas-mobile-capsule"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Role perspective selector"
        >
          {/* Previous Arrow */}
          <button
            type="button"
            className="atlas-capsule-arrow atlas-capsule-arrow--prev"
            onClick={() => handleRoleSelect(prevRole.id)}
            aria-label={`Previous role: ${prevRole.name}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Secondary Previous Ghost (Revealed on tablet) */}
          <button
            type="button"
            className="atlas-capsule-ghost atlas-capsule-ghost--prev-outer"
            onClick={() => handleRoleSelect(prev2Role.id)}
            aria-label={`Select ${prev2Role.name}`}
          >
            <span>{prev2Role.shortName}</span>
          </button>

          {/* Primary Previous Ghost */}
          <button
            type="button"
            className="atlas-capsule-ghost atlas-capsule-ghost--prev"
            onClick={() => handleRoleSelect(prevRole.id)}
            aria-label={`Select ${prevRole.name}`}
          >
            <span>{prevRole.shortName}</span>
          </button>

          {/* Active Center Pill */}
          <div className="atlas-capsule-active" aria-current="true">
            <span className="atlas-capsule-num">{activeRole.roleNumber}</span>
            <span className="atlas-capsule-name">{activeRole.name}</span>
            <span className="atlas-capsule-dot" aria-hidden="true" />
          </div>

          {/* Primary Next Ghost */}
          <button
            type="button"
            className="atlas-capsule-ghost atlas-capsule-ghost--next"
            onClick={() => handleRoleSelect(nextRole.id)}
            aria-label={`Select ${nextRole.name}`}
          >
            <span>{nextRole.shortName}</span>
          </button>

          {/* Secondary Next Ghost (Revealed on tablet) */}
          <button
            type="button"
            className="atlas-capsule-ghost atlas-capsule-ghost--next-outer"
            onClick={() => handleRoleSelect(next2Role.id)}
            aria-label={`Select ${next2Role.name}`}
          >
            <span>{next2Role.shortName}</span>
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="atlas-capsule-arrow atlas-capsule-arrow--next"
            onClick={() => handleRoleSelect(nextRole.id)}
            aria-label={`Next role: ${nextRole.name}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ==============================================================
            C. ARCHITECTURAL BUSINESS CONTROL ATLAS (Main Canvas)
            Asymmetric composition: Left Wing (Operations/Commercial),
            Center Spine (Shared Context + Inspector),
            Right Wing (Governance & Compliance)
            ============================================================== */}
        <div
          className="atlas-operating-canvas"
          role="region"
          aria-label="The Business Control Atlas Operating Model"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Ambient Decorative Grids & Glow */}
          <div className="atlas-canvas-ambient-grid" aria-hidden="true" />

          {/* LEFT WING: Source Operations & Strategy (Owner, Operations, Procurement) */}
          <div className="atlas-flank atlas-flank--left" role="tablist" aria-label="Operational and Procurement Roles">
            {/* 1. Business Owner */}
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleId === "owner"}
              className={`atlas-role-station atlas-station--owner ${
                activeRoleId === "owner" ? "is-active" : ""
              }`}
              onClick={() => handleRoleSelect("owner")}
            >
              <div className="atlas-station-head">
                <span className="atlas-station-num">{ATLAS_ROLES.owner.roleNumber}</span>
                <span className="atlas-station-name">{ATLAS_ROLES.owner.name}</span>
                {activeRoleId === "owner" && (
                  <span className="atlas-station-active-beacon" aria-hidden="true" />
                )}
              </div>
              <p className="atlas-station-desc">{ATLAS_ROLES.owner.description}</p>
              <div className="atlas-station-tags">
                <span className="atlas-tag">Revenue · Orders</span>
                <span className="atlas-tag is-accent">Runway Visibility</span>
              </div>
            </button>

            {/* 5. Warehouse & Operations */}
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleId === "operations"}
              className={`atlas-role-station atlas-station--operations ${
                activeRoleId === "operations" ? "is-active" : ""
              }`}
              onClick={() => handleRoleSelect("operations")}
            >
              <div className="atlas-station-head">
                <span className="atlas-station-num">{ATLAS_ROLES.operations.roleNumber}</span>
                <span className="atlas-station-name">{ATLAS_ROLES.operations.name}</span>
                {activeRoleId === "operations" && (
                  <span className="atlas-station-active-beacon" aria-hidden="true" />
                )}
              </div>
              <p className="atlas-station-desc">{ATLAS_ROLES.operations.description}</p>
              <div className="atlas-station-tags">
                <span className="atlas-tag">Stock Allocation</span>
                <span className="atlas-tag is-cyan">DC-02 Fulfilment</span>
              </div>
            </button>

            {/* 4. Procurement */}
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleId === "procurement"}
              className={`atlas-role-station atlas-station--procurement ${
                activeRoleId === "procurement" ? "is-active" : ""
              }`}
              onClick={() => handleRoleSelect("procurement")}
            >
              <div className="atlas-station-head">
                <span className="atlas-station-num">{ATLAS_ROLES.procurement.roleNumber}</span>
                <span className="atlas-station-name">{ATLAS_ROLES.procurement.name}</span>
                {activeRoleId === "procurement" && (
                  <span className="atlas-station-active-beacon" aria-hidden="true" />
                )}
              </div>
              <p className="atlas-station-desc">{ATLAS_ROLES.procurement.description}</p>
              <div className="atlas-station-tags">
                <span className="atlas-tag">Purchase Orders</span>
                <span className="atlas-tag">Supplier 3-Way Match</span>
              </div>
            </button>
          </div>

          {/* CENTER SPINE: Central Shared Context & Active Architectural Inspector */}
          <div className="atlas-center-spine">
            {/* CENTRAL SHARED BUSINESS CONTEXT CARD */}
            <div
              className="atlas-shared-context-dock"
              role="region"
              aria-label="Shared Business Context Backbone"
            >
              <div className="atlas-context-dock-head">
                <div className="atlas-context-badge">
                  <span className="atlas-context-spark" aria-hidden="true">✦</span>
                  <span className="atlas-context-label">SHARED BUSINESS CONTEXT</span>
                </div>
                <div className="atlas-context-identity">
                  <span className="atlas-identity-id">SO-10482</span>
                  <span className="atlas-identity-sep">·</span>
                  <span className="atlas-identity-party">Ananya Enterprises</span>
                  <span className="atlas-identity-sep">·</span>
                  <strong className="atlas-identity-value">₹5,90,000 Total</strong>
                </div>
              </div>

              {/* Central Transaction Flow Backbone Sequence */}
              <div
                className="atlas-backbone-sequence"
                role="region"
                aria-label="Central Transaction Flow: Order to Cash"
              >
                <div className="atlas-backbone-track" aria-hidden="true" />
                <div className="atlas-backbone-nodes">
                  {SHARED_CONTEXT_STAGES.map((stg, i) => {
                    const isConnected = activeRole.connectedStages.includes(stg.id);
                    return (
                      <div
                        key={stg.id}
                        className={`atlas-backbone-node ${isConnected ? "is-connected" : ""}`}
                      >
                        <div className="atlas-node-chip">
                          <span className="atlas-node-idx">{i + 1}</span>
                          <span className="atlas-node-label">{stg.label}</span>
                          {isConnected && (
                            <span className="atlas-node-pulse" aria-hidden="true" />
                          )}
                        </div>
                        <div className="atlas-node-meta">
                          <span className="atlas-node-code">{stg.code}</span>
                          <small className="atlas-node-sub">{stg.detail}</small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="atlas-context-dock-footer">
                <span className="atlas-context-note">
                  One continuous business object linking commercial, physical, and financial reality.
                </span>
              </div>
            </div>

            {/* DYNAMIC ROLE PERSPECTIVE INSPECTOR */}
            <div
              className="atlas-role-inspector"
              role="region"
              aria-label={`${activeRole.name} Operational Perspective`}
            >
              <div className="atlas-inspector-header">
                <div className="atlas-inspector-role-kicker">
                  <span className="atlas-kicker-dot" aria-hidden="true" />
                  <span>{activeRole.kicker}</span>
                </div>
                <h3 className="atlas-inspector-role-title">
                  {activeRole.name} Perspective
                </h3>
                <p className="atlas-inspector-role-desc">
                  {activeRole.description}
                </p>
              </div>

              {/* Procurement Specific Workflow Pipeline (Displayed when Procurement is active) */}
              {activeRole.procurementWorkflow && (
                <div
                  className="atlas-procurement-pipeline"
                  role="region"
                  aria-label="Procurement Operational Workflow"
                >
                  <span className="atlas-pipeline-kicker">OPERATIONAL PROCUREMENT PIPELINE</span>
                  <div className="atlas-pipeline-steps">
                    {activeRole.procurementWorkflow.map((step, idx) => (
                      <div key={step} className="atlas-pipeline-step">
                        <span className="atlas-pipeline-index">{idx + 1}</span>
                        <span className="atlas-pipeline-label">{step}</span>
                        {idx < activeRole.procurementWorkflow!.length - 1 && (
                          <span className="atlas-pipeline-arrow" aria-hidden="true">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4-Cell Operational Signals Grid */}
              <div
                className="atlas-signals-grid"
                role="region"
                aria-label={`${activeRole.name} Live Operational Indicators`}
              >
                {activeRole.signals.map((sig) => (
                  <article key={sig.label} className={`atlas-signal-card tone-${sig.tone || "neutral"}`}>
                    <span className="atlas-signal-label">{sig.label}</span>
                    <strong className="atlas-signal-val">{sig.value}</strong>
                    <span className="atlas-signal-sub">{sig.sub}</span>
                  </article>
                ))}
              </div>

              {/* Architectural Relationship Lineage Card */}
              <div className="atlas-lineage-dock">
                <div className="atlas-lineage-item">
                  <span className="atlas-lineage-tag">UPSTREAM DEMAND</span>
                  <span className="atlas-lineage-val">{activeRole.workflowLineage.upstream}</span>
                </div>
                <div className="atlas-lineage-divider" aria-hidden="true">⇄</div>
                <div className="atlas-lineage-item">
                  <span className="atlas-lineage-tag">DOWNSTREAM OUTCOME</span>
                  <span className="atlas-lineage-val">{activeRole.workflowLineage.downstream}</span>
                </div>
              </div>
              <div className="atlas-lineage-relation">
                <span className="atlas-relation-spark" aria-hidden="true">✦</span>
                <span className="atlas-relation-text">{activeRole.workflowLineage.contextRelation}</span>
              </div>
            </div>
          </div>

          {/* RIGHT WING: Governance & Compliance (CFO, Finance Controller, Compliance) */}
          <div className="atlas-flank atlas-flank--right" role="tablist" aria-label="Financial and Governance Roles">
            {/* 2. CFO */}
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleId === "cfo"}
              className={`atlas-role-station atlas-station--cfo ${
                activeRoleId === "cfo" ? "is-active" : ""
              }`}
              onClick={() => handleRoleSelect("cfo")}
            >
              <div className="atlas-station-head">
                <span className="atlas-station-num">{ATLAS_ROLES.cfo.roleNumber}</span>
                <span className="atlas-station-name">{ATLAS_ROLES.cfo.name}</span>
                {activeRoleId === "cfo" && (
                  <span className="atlas-station-active-beacon" aria-hidden="true" />
                )}
              </div>
              <p className="atlas-station-desc">{ATLAS_ROLES.cfo.description}</p>
              <div className="atlas-station-tags">
                <span className="atlas-tag is-accent">Treasury Buffer</span>
                <span className="atlas-tag">DSO Velocity</span>
              </div>
            </button>

            {/* 3. Finance Controller (Initial Default Active Role) */}
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleId === "controller"}
              className={`atlas-role-station atlas-station--controller ${
                activeRoleId === "controller" ? "is-active" : ""
              }`}
              onClick={() => handleRoleSelect("controller")}
            >
              <div className="atlas-station-head">
                <span className="atlas-station-num">{ATLAS_ROLES.controller.roleNumber}</span>
                <span className="atlas-station-name">{ATLAS_ROLES.controller.name}</span>
                {activeRoleId === "controller" && (
                  <span className="atlas-station-active-beacon" aria-hidden="true" />
                )}
              </div>
              <p className="atlas-station-desc">{ATLAS_ROLES.controller.description}</p>
              <div className="atlas-station-tags">
                <span className="atlas-tag is-accent">Double-Entry Ledger</span>
                <span className="atlas-tag is-cyan">Sub-Second Recon</span>
              </div>
            </button>

            {/* 6. Compliance */}
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleId === "compliance"}
              className={`atlas-role-station atlas-station--compliance ${
                activeRoleId === "compliance" ? "is-active" : ""
              }`}
              onClick={() => handleRoleSelect("compliance")}
            >
              <div className="atlas-station-head">
                <span className="atlas-station-num">{ATLAS_ROLES.compliance.roleNumber}</span>
                <span className="atlas-station-name">{ATLAS_ROLES.compliance.name}</span>
                {activeRoleId === "compliance" && (
                  <span className="atlas-station-active-beacon" aria-hidden="true" />
                )}
              </div>
              <p className="atlas-station-desc">{ATLAS_ROLES.compliance.description}</p>
              <div className="atlas-station-tags">
                <span className="atlas-tag">IRN & E-Way Bill</span>
                <span className="atlas-tag is-cyan">ITC Clearance</span>
              </div>
            </button>
          </div>
        </div>

        {/* ==============================================================
            D. CLOSING STATEMENT (Strict Approved Copy)
            ============================================================== */}
        <footer className="atlas-closing-footer">
          <p className="atlas-closing-statement">
            One informed business decision.
          </p>
        </footer>
      </div>
    </section>
  );
});

export default ConnectedBusinessAtlas;

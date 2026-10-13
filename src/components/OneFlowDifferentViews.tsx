import { memo, useCallback, useState } from "react";
import { ProductKPI } from "./product-ui";

/* ==========================================================================
   Section: BUILT FOR EVERY ROLE · One flow. Different views.
   Classic Role-Based Architecture from Homepage.tsx
   ========================================================================== */

const roles = [
  {
    id: "cfo",
    name: "CFO",
    headline: "Cash Realization · Collections · Capital Forecast",
    description: "Monitors cash realization across open receivables, collection turnaround velocity, and forward liquidity runways.",
    stages: ["Order", "Invoice", "Receivable", "Collection", "Bank", "Cash"],
    activeStageIndex: 3, // "Collection"
    activeStageStatus: "COLLECTION ACTIVE",
    metrics: [
      { label: "OUTSTANDING RECEIVABLES", value: "₹5,90,000", change: "Due in 4 days", type: "standard" as const },
      { label: "CASH POSITION", value: "₹1.42 Cr", change: "Optimal runway", type: "standard" as const },
      { label: "EXPECTED COLLECTIONS", value: "₹14.8 Lakh", change: "4 Invoices this week", type: "predictive" as const },
    ],
  },
  {
    id: "controller",
    name: "FINANCE CONTROLLER",
    headline: "Financial Accuracy · GST Treatment · Ledger Reconciliation",
    description: "Verifies invoice tax metadata, monitors statutory GSTR filings, and ensures zero drift between ledger and bank statements.",
    stages: ["Invoice", "GST", "Receivable", "Bank", "Reconciliation"],
    activeStageIndex: 4, // "Reconciliation"
    activeStageStatus: "AUTO-MATCHING",
    metrics: [
      { label: "UNRECONCILED TRANSACTIONS", value: "0 Invoices", change: "100% matched", type: "trend" as const },
      { label: "GST RECONCILIATION STATUS", value: "100% Matched", change: "Zero tax credit drift", type: "standard" as const },
      { label: "INVOICE EXCEPTIONS", value: "0 Discrepancies", change: "Zero variance", type: "alert" as const },
    ],
  },
  {
    id: "owner",
    name: "BUSINESS OWNER",
    headline: "Business Performance · Revenue Realization · Cash Visibility",
    description: "Tracks end-to-end commercial momentum, operational health, and available working cash without waiting for month-end reports.",
    stages: ["Order", "Inventory", "Invoice", "Receivable", "Cash", "Forecast"],
    activeStageIndex: 4, // "Cash"
    activeStageStatus: "FUNDS REALIZED",
    metrics: [
      { label: "REVENUE", value: "₹8.4 Cr ARR", change: "+18.4% YoY", type: "standard" as const },
      { label: "AVAILABLE CASH", value: "₹1.42 Cr", change: "Optimal runway", type: "trend" as const },
      { label: "CASH FLOW FORECAST", value: "18 Months", change: "92% confidence", type: "predictive" as const },
    ],
  },
  {
    id: "operations",
    name: "OPERATIONS",
    headline: "Order Processing · Inventory Allocation · Fulfillment",
    description: "Orchestrates order routing, warehouse stock commitments, and outbound fulfillment with live inventory synchronization.",
    stages: ["Order", "Inventory", "Allocation", "Fulfillment", "Invoice"],
    activeStageIndex: 3, // "Fulfillment"
    activeStageStatus: "DISPATCH READY",
    metrics: [
      { label: "ORDERS IN PROGRESS", value: "12 Orders", change: "On schedule", type: "standard" as const },
      { label: "INVENTORY ALLOCATED", value: "125 / 125 Units", change: "DC-02 Reserved", type: "standard" as const },
      { label: "FULFILLMENT PROGRESS", value: "99.4%", change: "Optimal turnaround", type: "trend" as const },
    ],
  },
  {
    id: "procurement",
    name: "PROCUREMENT",
    headline: "Purchase Orders · Suppliers · Receipts",
    description: "Governs purchase requisitions, supplier master records, purchase order releases, and automated 3-way invoice matching.",
    stages: ["Demand", "Purchase Request", "Purchase Order", "Vendor", "Receipt", "Invoice"],
    activeStageIndex: 2, // "Purchase Order"
    activeStageStatus: "PO COMMITTED",
    metrics: [
      { label: "OPEN PURCHASE COMMITMENTS", value: "₹18.2 Lakh", change: "12 Approved", type: "standard" as const },
      { label: "PENDING PURCHASE ORDERS", value: "3 Orders", change: "Awaiting receipt", type: "alert" as const },
      { label: "INVOICE PRICE DISCREPANCIES", value: "₹0", change: "Zero variance", type: "standard" as const },
    ],
  },
  {
    id: "warehouse",
    name: "WAREHOUSE",
    headline: "Stock Availability · Picking · Dispatch & Replenishment",
    description: "Controls physical bin movements, pick-and-pack routing, outbound dispatch manifests, and automated safety stock reorders.",
    stages: ["Order", "Stock", "Allocation", "Pick", "Dispatch", "Replenishment"],
    activeStageIndex: 3, // "Pick"
    activeStageStatus: "PICKING ACTIVE",
    metrics: [
      { label: "AVAILABLE STOCK", value: "1,420 Units", change: "Optimal levels", type: "standard" as const },
      { label: "ORDERS AWAITING PICK", value: "4 Orders", change: "Rack HYD-B4", type: "standard" as const },
      { label: "REPLENISHMENT REQUIRED", value: "0 SKUs", change: "Safe thresholds", type: "trend" as const },
    ],
  },
  {
    id: "compliance",
    name: "COMPLIANCE",
    headline: "Document Generation · GST Compliance · Statutory Reconciliation",
    description: "Generates authenticated IRP e-invoices, issues signed QR payloads, clears logistics E-Way bills, and reconciles GSTR returns.",
    stages: ["Invoice", "E-Invoice", "E-Way Bill", "GST", "Reconciliation"],
    activeStageIndex: 3, // "GST"
    activeStageStatus: "GST VERIFIED",
    metrics: [
      { label: "E-INVOICE STATUS", value: "100% Signed", change: "IRP validated", type: "standard" as const },
      { label: "GST RECONCILIATION STATUS", value: "Auto-Populated", change: "GSTR-1 aligned", type: "trend" as const },
      { label: "OPEN COMPLIANCE EXCEPTIONS", value: "0 Exceptions", change: "Audit ready", type: "standard" as const },
    ],
  },
] as const;

function formatRoleTitle(name: string) {
  if (name === "CFO" || name === "GST" || name === "PO") return name;
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function RoleFlow({
  stages,
  activeIndex,
  roleName,
}: {
  stages: readonly string[];
  activeIndex: number;
  roleName: string;
}) {
  return (
    <div
      className="role-flow"
      role="region"
      aria-label={`${roleName} workflow timeline: ${stages.join(" → ")}`}
    >
      {stages.map((stage, i) => {
        const isComplete = i < activeIndex;
        const isActive = i === activeIndex;
        const isPending = i > activeIndex;

        return (
          <div
            key={stage}
            className={`role-flow-step ${
              isComplete ? "is-complete" : isActive ? "is-active" : "is-pending"
            }`}
            aria-current={isActive ? "step" : undefined}
          >
            <div className="role-flow-node-wrap">
              <i className="role-flow-node" aria-hidden="true">
                {isComplete && (
                  <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                    <path
                      d="M1 3L2.6 4.6L6 1.2"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {isActive && <span className="role-flow-active-beacon" />}
              </i>
              <span className="role-flow-label">{stage}</span>
            </div>
            {i < stages.length - 1 && (
              <b
                className={`role-flow-line ${
                  i < activeIndex ? "is-complete" : "is-pending"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export interface OneFlowDifferentViewsProps {
  id?: string;
  className?: string;
}

export const OneFlowDifferentViews = memo(function OneFlowDifferentViews({
  id = "roles",
  className = "",
}: OneFlowDifferentViewsProps) {
  const [role, setRole] = useState(0);
  const [roleTouchStartX, setRoleTouchStartX] = useState<number | null>(null);

  const handleRoleTouchStart = useCallback((e: React.TouchEvent) => {
    setRoleTouchStartX(e.touches[0].clientX);
  }, []);

  const handleRoleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (roleTouchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - roleTouchStartX;
    if (deltaX > 40) {
      setRole((r) => (r - 1 + roles.length) % roles.length);
    } else if (deltaX < -40) {
      setRole((r) => (r + 1) % roles.length);
    }
    setRoleTouchStartX(null);
  }, [roleTouchStartX]);

  return (
    <section id={id} className={`home-roles home-section ${className}`}>
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">BUILT FOR EVERY ROLE</span>
            <h2 className="role-main-title">One flow.<br />Different views.</h2>
          </div>
          <p className="role-main-desc">Every team works from the same transaction context—focused on the decisions that matter to them.</p>
        </div>

        {/* Mobile / Tablet Pill Carousel Selector */}
        <div
          className="role-mobile-capsule"
          onTouchStart={handleRoleTouchStart}
          onTouchEnd={handleRoleTouchEnd}
          role="region"
          aria-label="Role selector"
        >
          <button
            type="button"
            className="role-capsule-arrow role-capsule-arrow--prev"
            onClick={() => setRole((r) => (r - 1 + roles.length) % roles.length)}
            aria-label={`Previous role: ${formatRoleTitle(roles[(role - 1 + roles.length) % roles.length].name)}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="role-capsule-ghost role-capsule-ghost--prev"
            onClick={() => setRole((r) => (r - 1 + roles.length) % roles.length)}
            aria-label={`Select ${formatRoleTitle(roles[(role - 1 + roles.length) % roles.length].name)}`}
          >
            <span>{formatRoleTitle(roles[(role - 1 + roles.length) % roles.length].name)}</span>
          </button>

          <div className="role-capsule-active">
            <span>{formatRoleTitle(roles[role].name)}</span>
          </div>

          <button
            type="button"
            className="role-capsule-ghost role-capsule-ghost--next"
            onClick={() => setRole((r) => (r + 1) % roles.length)}
            aria-label={`Select ${formatRoleTitle(roles[(role + 1) % roles.length].name)}`}
          >
            <span>{formatRoleTitle(roles[(role + 1) % roles.length].name)}</span>
          </button>

          <button
            type="button"
            className="role-capsule-arrow role-capsule-arrow--next"
            onClick={() => setRole((r) => (r + 1) % roles.length)}
            aria-label={`Next role: ${formatRoleTitle(roles[(role + 1) % roles.length].name)}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Desktop Role Navigation List & Main Card */}
        <div className="role-selector">
          <div role="tablist" aria-label="Business roles" className="role-tablist">
            {roles.map((x, i) => (
              <button
                role="tab"
                aria-selected={role === i}
                onClick={() => setRole(i)}
                key={x.name}
                className="role-tab-btn"
              >
                <span>{x.name}</span>
              </button>
            ))}
          </div>

          <div
            className="role-view"
            onTouchStart={handleRoleTouchStart}
            onTouchEnd={handleRoleTouchEnd}
          >
            <div className="role-view-header">
              <div className="role-view-header-left">
                <span className="role-view-kicker">{roles[role].name} VIEW · SAME BUSINESS REALITY</span>
                <div
                  className="role-view-active-pill"
                  aria-label={`Active workflow stage: ${roles[role].stages[roles[role].activeStageIndex]}`}
                >
                  <span className="role-view-active-dot" aria-hidden="true" />
                  <span>{roles[role].activeStageStatus} · {roles[role].stages[roles[role].activeStageIndex].toUpperCase()}</span>
                </div>
              </div>
              <span className="role-view-badge">SYNCHRONIZED CONTEXT</span>
            </div>

            <strong className="role-view-heading">{roles[role].headline}</strong>
            <p className="role-view-desc">{roles[role].description}</p>

            <RoleFlow
              stages={roles[role].stages}
              activeIndex={roles[role].activeStageIndex}
              roleName={roles[role].name}
            />

            <div className="role-metrics">
              {roles[role].metrics.map((kpi) => (
                <ProductKPI
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  change={kpi.change}
                  type={kpi.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default OneFlowDifferentViews;

import React, { memo, useState, useCallback, useId } from "react";
import { Icon } from "./flowone";

/* ==========================================================================
   Section 05: The Perspective Shift (Role-Based Intelligence)
   Direction A: One business. Different perspectives. One connected reality.
   ========================================================================== */

export type RoleId =
  | "business-owner"
  | "cfo"
  | "finance-controller"
  | "procurement"
  | "warehouse-ops"
  | "compliance";

export interface StageItem {
  label: string;
  status: "completed" | "active" | "queued";
  detail: string;
}

export interface MetricItem {
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  isPositive?: boolean;
}

export interface PanelItem {
  key: string;
  value: string;
  badge?: string;
  highlight?: boolean;
}

export interface RoleConfig {
  id: RoleId;
  roleNumber: string;
  name: string;
  shortName: string;
  badge: string;
  lensKicker: string;
  lensTitle: string;
  lensDescription: string;
  transactionAspect: string;
  stages: StageItem[];
  metrics: MetricItem[];
  panel1: {
    title: string;
    tag: string;
    items: PanelItem[];
  };
  panel2: {
    title: string;
    tag: string;
    items: PanelItem[];
  };
  decisionPrompt: {
    kicker: string;
    summary: string;
    impact: string;
    actionLabel: string;
  };
}

const roleConfigs: Record<RoleId, RoleConfig> = {
  "business-owner": {
    id: "business-owner",
    roleNumber: "01",
    name: "Business Owner",
    shortName: "Owner",
    badge: "EXECUTIVE PERFORMANCE LENS",
    lensKicker: "HOLISTIC VISIBILITY · END-TO-END FLOW",
    lensTitle: "From Order Confirmation to Working Capital Velocity",
    lensDescription:
      "Track total business velocity without getting trapped in departmental weeds. See how customer commitments convert into confirmed deliveries and predictable bank deposits.",
    transactionAspect: "SO-10482 · Ananya Enterprises · ₹5,90,000 Total Value",
    stages: [
      { label: "Order", status: "completed", detail: "SO-10482 Signed (125 Units)" },
      { label: "Inventory", status: "completed", detail: "125 Units Reserved DC-02" },
      { label: "Invoice", status: "completed", detail: "INV-10482 Stamped" },
      { label: "Receivable", status: "active", detail: "Due in 4 Days (Net 30)" },
      { label: "Cash", status: "queued", detail: "Expected NEFT Inflow" },
      { label: "Decision", status: "queued", detail: "Working Capital Reinvest" },
    ],
    metrics: [
      {
        label: "Total Contract Value",
        value: "₹5,90,000",
        subtext: "125 Units @ ₹4,000 + 18% IGST",
        trend: "Fully Committed",
        isPositive: true,
      },
      {
        label: "Gross Operating Margin",
        value: "32.4%",
        subtext: "Zero price or discount variance",
        trend: "+2.1% vs Budget",
        isPositive: true,
      },
      {
        label: "Working Capital Cycle",
        value: "28 Days",
        subtext: "4 days faster than industry average",
        trend: "-4 Days Lead",
        isPositive: true,
      },
    ],
    panel1: {
      title: "Commercial & Fulfilment Order Lineage",
      tag: "ORDER LIFECYCLE",
      items: [
        { key: "Customer Account", value: "Ananya Enterprises Pvt Ltd", badge: "TIER-1" },
        { key: "Sales Order Reference", value: "SO-10482 (PO #PO-9912 Verified)" },
        { key: "Fulfillment Origin", value: "DC-02 Hub (Bengaluru) → Hyderabad" },
        { key: "Allocation Status", value: "125 / 125 Units Hard-Reserved", highlight: true },
      ],
    },
    panel2: {
      title: "Cashflow & Counterparty Health",
      tag: "WORKING CAPITAL",
      items: [
        { key: "Agreed Payment Terms", value: "Net 30 Days (Due in 4 Days)" },
        { key: "Counterparty Credit Score", value: "94 / 100 · Prime On-Time Payee", highlight: true },
        { key: "Revenue Recognition", value: "Automated Ledger Post · GSTR-1 Aligned" },
        { key: "Capital Leakage Risk", value: "0.0% · No Unapplied Credits", badge: "CLEAN" },
      ],
    },
    decisionPrompt: {
      kicker: "EXECUTIVE DECISION POINT",
      summary: "Commercial order fulfilled with zero operational margin drift.",
      impact: "Customer eligible for ₹10,00,000 expanded credit line upon verified bank settlement.",
      actionLabel: "Review Account Velocity",
    },
  },

  cfo: {
    id: "cfo",
    roleNumber: "02",
    name: "CFO",
    shortName: "CFO",
    badge: "CAPITAL & LIQUIDITY LENS",
    lensKicker: "FORWARD-LOOKING TREASURY & RISK EXPOSURE",
    lensTitle: "Receivables Exposure & Predictive Cash Inflow",
    lensDescription:
      "Protect corporate liquidity and eliminate counterparty drag. Monitor aging risk, expected collection timelines, and borrowing facility headroom in real time.",
    transactionAspect: "INV-10482 · Net 30 Term · ₹5,90,000 Total Exposure",
    stages: [
      { label: "Credit Review", status: "completed", detail: "₹15L Limit Authorized" },
      { label: "Revenue Post", status: "completed", detail: "₹5,00,000 Base Recognized" },
      { label: "Tax Escrow", status: "completed", detail: "₹90,000 IGST Segregated" },
      { label: "Expected Inflow", status: "active", detail: "Inflow Scheduled Day +4" },
      { label: "Virtual Rec", status: "queued", detail: "Virtual Account Auto-NEFT" },
      { label: "Cash Velocity", status: "queued", detail: "+₹5.9L Net Liquidity" },
    ],
    metrics: [
      {
        label: "Open Receivable Exposure",
        value: "₹5,90,000",
        subtext: "Current bracket (0-30 Days)",
        trend: "0 Days Overdue",
        isPositive: true,
      },
      {
        label: "AI Collection Probability",
        value: "98.2%",
        subtext: "Verified delivery POD + historical score",
        trend: "High Confidence",
        isPositive: true,
      },
      {
        label: "Cost of Working Capital",
        value: "0.0%",
        subtext: "Zero invoice factoring required",
        trend: "Optimal Headroom",
        isPositive: true,
      },
    ],
    panel1: {
      title: "Receivables Exposure & Credit Limit",
      tag: "BALANCE SHEET",
      items: [
        { key: "Debtor Exposure", value: "₹5,90,000 (Current 0-30d Bracket)" },
        { key: "Debtor Turnover (DSI)", value: "26 Days Average Settlement" },
        { key: "Default Probability", value: "< 0.4% (Tier-1 Corporate Profile)", highlight: true },
        { key: "Dynamic Credit Line", value: "₹9.1L Headroom Remaining", badge: "APPROVED" },
      ],
    },
    panel2: {
      title: "Treasury Inflow & Tax Segregation",
      tag: "TREASURY FORECAST",
      items: [
        { key: "Settlement Account", value: "HDFC Corporate Virtual Account" },
        { key: "Liquidity Projection", value: "Cash Inflow Forecasted on Day +4", highlight: true },
        { key: "Statutory Tax Hold", value: "₹90,000 Pre-Allocated for Output GST" },
        { key: "Net Cash Addition", value: "+₹5,00,000 Direct Operating Cash", badge: "UNENCUMBERED" },
      ],
    },
    decisionPrompt: {
      kicker: "TREASURY DECISION POINT",
      summary: "High-probability cash arrival locks scheduled vendor settlement run.",
      impact: "Unlock scheduled vendor AP batch for 1.5% prompt-payment cash discount.",
      actionLabel: "Authorize Early Payment Batch",
    },
  },

  "finance-controller": {
    id: "finance-controller",
    roleNumber: "03",
    name: "Finance Controller",
    shortName: "Controller",
    badge: "TRANSACTION ACCURACY & AUDIT LENS",
    lensKicker: "3-WAY MATCHING & AUDIT INTEGRITY",
    lensTitle: "Deterministic Ledger Posting & Zero Re-Entry",
    lensDescription:
      "Ensure absolute statutory precision across sales orders, warehouse pick lists, and accounting entries. Eliminate manual invoice re-typing and month-end reconciliation friction.",
    transactionAspect: "INV-10482 · 3-Way Match Passed · 0 Discrepancy",
    stages: [
      { label: "Sales Order", status: "completed", detail: "SO-10482 Line Items Match" },
      { label: "Pick Pass", status: "completed", detail: "125 Units Outbound Verified" },
      { label: "Rate Card", status: "completed", detail: "₹4,000 / Unit Approved" },
      { label: "Tax Invoice", status: "completed", detail: "INV-10482 General Ledger" },
      { label: "GST Return", status: "completed", detail: "IRN Generated & QRs Stamped" },
      { label: "Audit Hash", status: "active", detail: "SHA-256 Ledger Lineage" },
    ],
    metrics: [
      {
        label: "3-Way Match Accuracy",
        value: "100%",
        subtext: "Order, dispatch, and rate card sync",
        trend: "Zero Variance",
        isPositive: true,
      },
      {
        label: "Manual Re-Keying",
        value: "0 Entries",
        subtext: "Zero human re-transcription needed",
        trend: "100% Direct",
        isPositive: true,
      },
      {
        label: "Ledger Posting Lag",
        value: "0.00s",
        subtext: "Deterministic dual-entry booking",
        trend: "Real-Time",
        isPositive: true,
      },
    ],
    panel1: {
      title: "3-Way Automated Match Matrix",
      tag: "VOUCHER AUDIT",
      items: [
        { key: "Sales Order SO-10482", value: "125 Units @ ₹4,000 = ₹5,00,000", badge: "MATCH" },
        { key: "Dispatch ALLOC-10482", value: "125 Units Outbound DC-02", badge: "MATCH" },
        { key: "Tax Invoice INV-10482", value: "₹5,00,000 + 18% IGST = ₹5,90,000", badge: "MATCH" },
        { key: "Voucher Reconciliation", value: "₹0.00 Discrepancy · Pre-Approved", highlight: true },
      ],
    },
    panel2: {
      title: "General Ledger & Tax Sub-Ledger Entries",
      tag: "LEDGER MAPPINGS",
      items: [
        { key: "Debit Entry", value: "Accounts Receivable — Ananya (₹5,90,000)" },
        { key: "Credit Entry (Sales)", value: "Sales Revenue Account #4010 (₹5,00,000)" },
        { key: "Credit Entry (Tax)", value: "Output IGST Payable Account #2210 (₹90,000)" },
        { key: "Cryptographic Hash", value: "Verified Immutable Audit Signature", highlight: true },
      ],
    },
    decisionPrompt: {
      kicker: "CONTROLLER CONTROL POINT",
      summary: "Deterministic ledger postings confirmed without paperwork delay.",
      impact: "Month-end closing books ready with zero manual reconciling adjustments.",
      actionLabel: "View Ledger Lineage",
    },
  },

  procurement: {
    id: "procurement",
    roleNumber: "04",
    name: "Procurement",
    shortName: "Procurement",
    badge: "SUPPLY CHAIN & VENDOR LENS",
    lensKicker: "UPSTREAM SUPPLY & VENDOR COMMITMENTS",
    lensTitle: "Purchasing Flow & MSME 45-Day Payment Tracking",
    lensDescription:
      "Connect downstream sales demand with upstream component procurement. Manage purchase orders, supplier delivery schedules, and statutory MSME vendor settlement deadlines.",
    transactionAspect: "PO-4091 · Apex Hardware Ltd · Fulfils SO-10482 Demand",
    stages: [
      { label: "Demand Signal", status: "completed", detail: "SO-10482 Triggered Demand" },
      { label: "PO Released", status: "completed", detail: "PO-4091 to Apex Hardware" },
      { label: "Supplier Gate", status: "completed", detail: "Raw Batch In-Transit" },
      { label: "Goods Receipt", status: "completed", detail: "GRN-10482 Inspected 100%" },
      { label: "Vendor Invoice", status: "completed", detail: "BILL-8821 (₹3,20,000)" },
      { label: "MSME Clock", status: "active", detail: "Day 12 of 45 (Compliant)" },
    ],
    metrics: [
      {
        label: "Procured Batch Value",
        value: "₹3,20,000",
        subtext: "Component batch for 125 units",
        trend: "Within Budget",
        isPositive: true,
      },
      {
        label: "Supplier On-Time Rate",
        value: "99.1%",
        subtext: "Apex Hardware delivery performance",
        trend: "+3.4% Reliability",
        isPositive: true,
      },
      {
        label: "MSME Rule Compliance",
        value: "100%",
        subtext: "Within statutory 45-day window",
        trend: "Zero Penalty",
        isPositive: true,
      },
    ],
    panel1: {
      title: "Purchase Order & Upstream Fulfilment",
      tag: "SUPPLY LINEAGE",
      items: [
        { key: "Upstream PO Reference", value: "PO-4091 (Linked to SO-10482)", badge: "LINKED" },
        { key: "Component Specification", value: "Sub-Assembly Raw Units Batch A-125" },
        { key: "Goods Receipt Note", value: "GRN-10482 (Quality Passed · 0 Rejects)", highlight: true },
        { key: "Gross Fulfilment Margin", value: "Cost ₹3,20,000 vs Revenue ₹5,00,000" },
      ],
    },
    panel2: {
      title: "Vendor Payables & MSME 45-Day Clock",
      tag: "STATUTORY PAYABLES",
      items: [
        { key: "Vendor Classification", value: "Apex Hardware Ltd (MSME Enterprise)" },
        { key: "Vendor Invoice Total", value: "BILL-8821 · ₹3,20,000 Verified" },
        { key: "Section 43B(h) Clock", value: "33 Days Remaining (Compliant Window)", highlight: true },
        { key: "Cashflow Sync", value: "Payment Release Scheduled After Ananya Receipt", badge: "ALIGNED" },
      ],
    },
    decisionPrompt: {
      kicker: "PROCUREMENT CONTROL POINT",
      summary: "Upstream components secured and verified against downstream order.",
      impact: "Vendor payout timed to align with verified customer receivable inflow.",
      actionLabel: "Inspect Supplier Milestone",
    },
  },

  "warehouse-ops": {
    id: "warehouse-ops",
    roleNumber: "05",
    name: "Warehouse & Operations",
    shortName: "Operations",
    badge: "PHYSICAL STOCK & DISPATCH LENS",
    lensKicker: "INVENTORY ALLOCATION & LOGISTICS CONDUIT",
    lensTitle: "Real-Time Stock Hard-Lock & Gate Pass Dispatch",
    lensDescription:
      "Synchronize physical warehouse movement directly with commercial orders and tax billing. Pick, pack, and generate automated digital dispatch passes without clipboard lag.",
    transactionAspect: "ALLOC-10482 · DC-02 Hub · 125 Units Hard-Locked",
    stages: [
      { label: "Order Lock", status: "completed", detail: "Hard Reserve 125 Units" },
      { label: "Bin Location", status: "completed", detail: "Aisle 4, Shelf B-12 (DC-02)" },
      { label: "Barcode Pick", status: "completed", detail: "Pick List PK-10482 Scanned" },
      { label: "Pack & Weigh", status: "completed", detail: "125 Units Verified 480kg" },
      { label: "E-Way Bill", status: "completed", detail: "EWB-99201481 Generated" },
      { label: "Gate Pass", status: "active", detail: "Vehicle KA-01-AB-4410" },
    ],
    metrics: [
      {
        label: "Stock Hard-Allocated",
        value: "125 Units",
        subtext: "Zero phantom inventory drift",
        trend: "100% Reserved",
        isPositive: true,
      },
      {
        label: "Pick-to-Dispatch Time",
        value: "42 Mins",
        subtext: "Automated digital pick note",
        trend: "-58% Lead Time",
        isPositive: true,
      },
      {
        label: "Dispatch Scan Accuracy",
        value: "100.0%",
        subtext: "Barcode verified gate check",
        trend: "Zero Return",
        isPositive: true,
      },
    ],
    panel1: {
      title: "Physical Inventory Allocation & Staging",
      tag: "STOCK LOCATION",
      items: [
        { key: "Storage Hub", value: "DC-02 Bengaluru Hub (HYD-B4 Bay)", badge: "DC-02" },
        { key: "SKU Identification", value: "Enterprise Model EX-100 (Serial Stamped)" },
        { key: "Warehouse Availability", value: "125 Allocated / 375 Remaining Available" },
        { key: "Staging Location", value: "Zone 2 · Bay 4 · Shelf 12 (Hard-Locked)", highlight: true },
      ],
    },
    panel2: {
      title: "Logistics, Carrier & Digital Gate Pass",
      tag: "DISPATCH LOGISTICS",
      items: [
        { key: "Dispatch Gate Pass", value: "GP-10482 (Signed Digital Dispatch)", highlight: true },
        { key: "Active E-Way Transit", value: "EWB-99201481 (Transit Clear)" },
        { key: "Assigned Carrier", value: "Express Cargo Lines · KA-01-AB-4410" },
        { key: "Automated Billing Trigger", value: "Physical Gate Scan Triggers INV-10482", badge: "AUTO-SYNC" },
      ],
    },
    decisionPrompt: {
      kicker: "OPERATIONS DISPATCH POINT",
      summary: "Physical stock out the door; billing informed instantaneously.",
      impact: "Finance automatically issues verified tax invoice upon gate scan with POD link.",
      actionLabel: "Track Dispatch Transit",
    },
  },

  compliance: {
    id: "compliance",
    roleNumber: "06",
    name: "Compliance",
    shortName: "Compliance",
    badge: "STATUTORY INTEGRITY & GST LENS",
    lensKicker: "E-INVOICE IRN & GSTR-1 ALIGNMENT",
    lensTitle: "Statutory Tax Clearance & Tamper-Evident Trail",
    lensDescription:
      "Eliminate transcription errors and compliance penalties. Validate HSN codes, clear government portal IRN stamping via direct API, and align tax sub-ledgers automatically.",
    transactionAspect: "IRN-82104491 · NIC Portal Cleared · GSTR-1 Aligned",
    stages: [
      { label: "HSN Validation", status: "completed", detail: "HSN 8471 Verified (18% Tax)" },
      { label: "E-Invoice API", status: "completed", detail: "NIC Portal Handshake Cleared" },
      { label: "IRN Stamp", status: "completed", detail: "64-Char Hash Generated" },
      { label: "QR Stamping", status: "completed", detail: "Cryptographic QR Embedded" },
      { label: "GSTR-1 Map", status: "active", detail: "Table 4B B2B Auto-Filed" },
      { label: "Audit Seal", status: "active", detail: "Tax Lineage Stored" },
    ],
    metrics: [
      {
        label: "Statutory Tax Value",
        value: "₹90,000",
        subtext: "18% IGST on ₹5,00,000 base value",
        trend: "Verified Match",
        isPositive: true,
      },
      {
        label: "IRN Clearance Speed",
        value: "140ms",
        subtext: "Direct NIC e-invoicing API handshake",
        trend: "Instant Clear",
        isPositive: true,
      },
      {
        label: "Audit Exposure Risk",
        value: "0.0%",
        subtext: "GSTR-1, EWB & 3B aligned in real-time",
        trend: "Zero Penalty",
        isPositive: true,
      },
    ],
    panel1: {
      title: "E-Invoice Validation & IRN Cryptography",
      tag: "GOVERNMENT PORTAL",
      items: [
        { key: "Tax Invoice Reference", value: "INV-10482 (HSN Code 8471 — Computing)" },
        { key: "Buyer GSTIN Validation", value: "36AAACA1234F1Z5 (Ananya · Active GSTIN)", badge: "VALIDATED" },
        { key: "Government IRN Hash", value: "82104491e0a2991bf882c199201824..." },
        { key: "QR Code Status", value: "NIC Cryptographic Digital Stamp Verified", highlight: true },
      ],
    },
    panel2: {
      title: "Tax Sub-Ledger & Return Alignment",
      tag: "STATUTORY RETURNS",
      items: [
        { key: "Supply Classification", value: "Inter-State B2B (Karnataka → Telangana)" },
        { key: "Output IGST Account", value: "₹90,000 Booked to Output Tax Ledger" },
        { key: "E-Way Bill Linkage", value: "EWB-99201481 (Transit Route Verified)" },
        { key: "Buyer 2B Matching", value: "100% Seamless Input Tax Credit for Buyer", highlight: true, badge: "ITC-READY" },
      ],
    },
    decisionPrompt: {
      kicker: "COMPLIANCE CLEARANCE POINT",
      summary: "Statutory tax clearance complete with zero transcription risk.",
      impact: "Buyer claims input tax credit without mismatched invoice disputes.",
      actionLabel: "Inspect IRN Certificate",
    },
  },
};

const roleOrder: RoleId[] = [
  "business-owner",
  "cfo",
  "finance-controller",
  "procurement",
  "warehouse-ops",
  "compliance",
];

const PerspectiveShift = memo(function PerspectiveShift() {
  const [activeRole, setActiveRole] = useState<RoleId>("business-owner");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const tablistId = useId();

  const handleRoleChange = useCallback((roleId: RoleId) => {
    setActiveRole(roleId);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const currentIndex = roleOrder.indexOf(activeRole);
    if (deltaX > 45) {
      // Swiped right -> go to previous role
      const prevIndex = (currentIndex - 1 + roleOrder.length) % roleOrder.length;
      handleRoleChange(roleOrder[prevIndex]);
    } else if (deltaX < -45) {
      // Swiped left -> go to next role
      const nextIndex = (currentIndex + 1) % roleOrder.length;
      handleRoleChange(roleOrder[nextIndex]);
    }
    setTouchStartX(null);
  }, [activeRole, handleRoleChange, touchStartX]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = roleOrder.indexOf(activeRole);
      let nextIndex = -1;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % roleOrder.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + roleOrder.length) % roleOrder.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = roleOrder.length - 1;
      }

      if (nextIndex !== -1) {
        const nextRole = roleOrder[nextIndex];
        setActiveRole(nextRole);
        const button = document.getElementById(`tab-${tablistId}-${nextRole}`);
        button?.focus();
      }
    },
    [activeRole, tablistId]
  );

  const currentConfig = roleConfigs[activeRole];

  // Carousel adjacent indexes for mobile/tablet capsule view
  const currentRoleIdx = roleOrder.indexOf(activeRole);
  const prevIdx = (currentRoleIdx - 1 + roleOrder.length) % roleOrder.length;
  const prev2Idx = (currentRoleIdx - 2 + roleOrder.length) % roleOrder.length;
  const nextIdx = (currentRoleIdx + 1) % roleOrder.length;
  const next2Idx = (currentRoleIdx + 2) % roleOrder.length;

  const prevRole = roleOrder[prevIdx];
  const prev2Role = roleOrder[prev2Idx];
  const nextRole = roleOrder[nextIdx];
  const next2Role = roleOrder[next2Idx];

  return (
    <section
      id="perspective-shift-section"
      className="new-home-section perspective-shift-section"
      aria-labelledby="perspective-shift-heading"
    >
      <div className="home-container">
        {/* ==============================================================
            1. EDITORIAL INTRODUCTION (Preserving Exact Approved Copy)
            ============================================================== */}
        <div className="perspective-shift-intro">
          <div className="perspective-shift-intro-left">
            <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
              <div className="hero-modern-eyebrow is-static" role="note" aria-label="Role-Based Intelligence">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>PERSPECTIVES</span>
                </span>
                <span className="hero-eyebrow-title">ROLE-BASED INTELLIGENCE</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <h2 id="perspective-shift-heading" className="perspective-shift-title">
              One business. Different perspectives. One connected reality.
            </h2>
          </div>

          <div className="perspective-shift-intro-right">
            <p className="perspective-shift-copy">
              Every team has different decisions to make. flowOne gives each role a relevant view of the business, powered by the same connected transaction context.
            </p>
          </div>
        </div>

        {/* ==============================================================
            2A. MOBILE & TABLET RESPONSIVE CAPSULE SELECTOR
            (Adapts depending on viewport width: reveals more roles with active pill & arrows)
            ============================================================== */}
        <div
          className="perspective-shift-mobile-capsule"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Role perspective selector"
        >
          {/* Previous Arrow Button */}
          <button
            type="button"
            className="perspective-capsule-arrow perspective-capsule-arrow--prev"
            onClick={() => handleRoleChange(prevRole)}
            aria-label={`Previous role: ${roleConfigs[prevRole].name}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Secondary Previous Ghost (Revealed on wider tablet viewports) */}
          <button
            type="button"
            className="perspective-capsule-ghost perspective-capsule-ghost--prev-outer"
            onClick={() => handleRoleChange(prev2Role)}
            aria-label={`Select ${roleConfigs[prev2Role].name}`}
          >
            <span>{roleConfigs[prev2Role].shortName}</span>
          </button>

          {/* Primary Previous Ghost (Visible on mobile & tablet) */}
          <button
            type="button"
            className="perspective-capsule-ghost perspective-capsule-ghost--prev"
            onClick={() => handleRoleChange(prevRole)}
            aria-label={`Select ${roleConfigs[prevRole].name}`}
          >
            <span>{roleConfigs[prevRole].shortName}</span>
          </button>

          {/* Active Center Pill (Current Colors: Electric Blue #0022FF + Cyan Dot #00B8E6) */}
          <div className="perspective-capsule-active" aria-current="true">
            <span className="perspective-capsule-num">{roleConfigs[activeRole].roleNumber}</span>
            <span className="perspective-capsule-name">{roleConfigs[activeRole].name}</span>
            <span className="perspective-capsule-dot" aria-hidden="true" />
          </div>

          {/* Primary Next Ghost (Visible on mobile & tablet) */}
          <button
            type="button"
            className="perspective-capsule-ghost perspective-capsule-ghost--next"
            onClick={() => handleRoleChange(nextRole)}
            aria-label={`Select ${roleConfigs[nextRole].name}`}
          >
            <span>{roleConfigs[nextRole].shortName}</span>
          </button>

          {/* Secondary Next Ghost (Revealed on wider tablet viewports) */}
          <button
            type="button"
            className="perspective-capsule-ghost perspective-capsule-ghost--next-outer"
            onClick={() => handleRoleChange(next2Role)}
            aria-label={`Select ${roleConfigs[next2Role].name}`}
          >
            <span>{roleConfigs[next2Role].shortName}</span>
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            className="perspective-capsule-arrow perspective-capsule-arrow--next"
            onClick={() => handleRoleChange(nextRole)}
            aria-label={`Next role: ${roleConfigs[nextRole].name}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ==============================================================
            2B. DESKTOP INTERACTIVE ROLE SELECTOR BAR (Full 6 Roles Tablist for > 1024px)
            ============================================================== */}
        <div className="perspective-shift-selector-wrapper">
          <div
            className="perspective-shift-selector"
            role="tablist"
            aria-label="Select business role perspective"
            onKeyDown={handleKeyDown}
          >
            {roleOrder.map((roleId) => {
              const role = roleConfigs[roleId];
              const isSelected = activeRole === roleId;

              return (
                <button
                  key={roleId}
                  type="button"
                  role="tab"
                  id={`tab-${tablistId}-${roleId}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tablistId}-${roleId}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`perspective-shift-tab-btn ${isSelected ? "is-active" : ""}`}
                  onClick={() => handleRoleChange(roleId)}
                >
                  <span className="perspective-shift-tab-num">{role.roleNumber}</span>
                  <span className="perspective-shift-tab-name">{role.name}</span>
                  {isSelected && (
                    <span className="perspective-shift-tab-indicator" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            3. PRIMARY INTERACTIVE WORKSPACE (The Perspective Canvas)
            ============================================================== */}
        <div
          id={`panel-${tablistId}-${activeRole}`}
          role="tabpanel"
          aria-labelledby={`tab-${tablistId}-${activeRole}`}
          className="perspective-shift-workspace"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Workspace Ambient Subtle Glow */}
          <div className="perspective-workspace-glow" aria-hidden="true" />

          {/* Top Header: Role Lens + Shared Business Context Anchor */}
          <header className="perspective-workspace-header">
            <div className="perspective-workspace-lens-info">
              <div className="perspective-workspace-role-badge">
                <span className="perspective-workspace-badge-dot" aria-hidden="true" />
                <span className="perspective-workspace-badge-kicker">
                  {currentConfig.badge}
                </span>
              </div>
              <h3 className="perspective-workspace-title">{currentConfig.lensTitle}</h3>
              <p className="perspective-workspace-desc">{currentConfig.lensDescription}</p>
            </div>

            {/* Unobtrusive Shared Context Anchor */}
            <aside
              className="perspective-workspace-shared-context"
              aria-label="Shared Transaction Context"
            >
              <div className="perspective-shared-badge">
                <span className="perspective-shared-spark" aria-hidden="true">✦</span>
                <span className="perspective-shared-label">SHARED BUSINESS CONTEXT</span>
              </div>
              <strong className="perspective-shared-aspect">
                {currentConfig.transactionAspect}
              </strong>
              <span className="perspective-shared-sub">
                Same transaction object · Filtered to role authority
              </span>
            </aside>
          </header>

          {/* Connected Workflow Lifecycle Rail */}
          <div
            className="perspective-workspace-flow-rail"
            role="region"
            aria-label={`${currentConfig.name} Workflow Pipeline`}
          >
            <div className="perspective-rail-track" aria-hidden="true" />
            <div className="perspective-rail-steps">
              {currentConfig.stages.map((stage, idx) => (
                <div
                  key={stage.label}
                  className={`perspective-rail-step is-${stage.status}`}
                >
                  <div className="perspective-step-node">
                    <span className="perspective-step-index">{idx + 1}</span>
                    <span className="perspective-step-state-beacon" aria-hidden="true" />
                  </div>
                  <div className="perspective-step-info">
                    <span className="perspective-step-label">{stage.label}</span>
                    <small className="perspective-step-detail">{stage.detail}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Column Core Metrics Tray */}
          <div
            className="perspective-workspace-metrics-grid"
            role="region"
            aria-label={`${currentConfig.name} Live Operational Indicators`}
          >
            {currentConfig.metrics.map((metric) => (
              <article key={metric.label} className="perspective-metric-card">
                <div className="perspective-metric-top">
                  <span className="perspective-metric-label">{metric.label}</span>
                  {metric.trend && (
                    <span
                      className={`perspective-metric-trend ${
                        metric.isPositive ? "is-positive" : "is-neutral"
                      }`}
                    >
                      {metric.trend}
                    </span>
                  )}
                </div>
                <strong className="perspective-metric-val">{metric.value}</strong>
                <span className="perspective-metric-sub">{metric.subtext}</span>
              </article>
            ))}
          </div>

          {/* Dual Detailed Operational Data Panels */}
          <div className="perspective-workspace-panels-grid">
            {/* Panel 1 */}
            <article className="perspective-data-panel">
              <header className="perspective-panel-header">
                <span className="perspective-panel-tag">{currentConfig.panel1.tag}</span>
                <h4 className="perspective-panel-title">{currentConfig.panel1.title}</h4>
              </header>
              <div className="perspective-panel-body">
                {currentConfig.panel1.items.map((item) => (
                  <div
                    key={item.key}
                    className={`perspective-panel-row ${item.highlight ? "is-highlighted" : ""}`}
                  >
                    <span className="perspective-panel-key">{item.key}</span>
                    <div className="perspective-panel-val-wrapper">
                      <span className="perspective-panel-val">{item.value}</span>
                      {item.badge && (
                        <span className="perspective-panel-badge">{item.badge}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Panel 2 */}
            <article className="perspective-data-panel">
              <header className="perspective-panel-header">
                <span className="perspective-panel-tag">{currentConfig.panel2.tag}</span>
                <h4 className="perspective-panel-title">{currentConfig.panel2.title}</h4>
              </header>
              <div className="perspective-panel-body">
                {currentConfig.panel2.items.map((item) => (
                  <div
                    key={item.key}
                    className={`perspective-panel-row ${item.highlight ? "is-highlighted" : ""}`}
                  >
                    <span className="perspective-panel-key">{item.key}</span>
                    <div className="perspective-panel-val-wrapper">
                      <span className="perspective-panel-val">{item.value}</span>
                      {item.badge && (
                        <span className="perspective-panel-badge">{item.badge}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Executive Decision Point & Operational Impact Card */}
          <footer className="perspective-workspace-decision-card">
            <div className="perspective-decision-left">
              <span className="perspective-decision-kicker">
                ✦ {currentConfig.decisionPrompt.kicker}
              </span>
              <h4 className="perspective-decision-summary">
                {currentConfig.decisionPrompt.summary}
              </h4>
              <p className="perspective-decision-impact">
                {currentConfig.decisionPrompt.impact}
              </p>
            </div>

            <div className="perspective-decision-right">
              <button
                type="button"
                className="perspective-decision-action-btn"
                aria-label={currentConfig.decisionPrompt.actionLabel}
              >
                <span>{currentConfig.decisionPrompt.actionLabel}</span>
                <Icon name="arrow" size={16} tone="inverse" />
              </button>
            </div>
          </footer>
        </div>

        {/* ==============================================================
            4. CLOSING STATEMENT (Preserving Exact Approved Copy)
            ============================================================== */}
        <div className="perspective-shift-conclusion">
          <p className="perspective-shift-closing-text">
            Everyone sees what matters to them. The business stays connected.
          </p>
        </div>
      </div>
    </section>
  );
});

export default PerspectiveShift;

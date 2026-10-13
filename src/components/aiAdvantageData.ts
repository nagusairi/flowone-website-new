import { AIIntelligenceStageData } from "./AIIntelligenceCard";

export const aiAdvantageStages: AIIntelligenceStageData[] = [
  {
    stepName: "UNDERSTAND",
    kicker: "01 · AI / UNDERSTAND",
    badgeLabel: "EXTRACTION COMPLETE",
    title: "Understand & Extract Business Object",
    summary:
      "flowOne ingests incoming financial instruments and instantly extracts structured transaction data with deterministic schema verification.",
    metrics: [
      { label: "CONFIDENCE", value: "99.8%" },
      { label: "EXTRACTION TIME", value: "38ms" },
      { label: "FIELDS PARSED", value: "18 / 18" },
    ],
    details: [
      { label: "PAYLOAD TYPE", value: "B2B Tax Invoice (PDF / JSON)" },
      { label: "IDENTIFIED ENTITY", value: "Ananya Enterprises · GSTIN 36AABCA1234F1Z5" },
      { label: "LINE ITEMS", value: "Cloud Operations · ₹5,00,000 + 18% GST" },
      { label: "PAYMENT TERMS", value: "Net 30 · Due 28 Jun 2026" },
    ],
  },
  {
    stepName: "MATCH",
    kicker: "02 · AI / MATCH",
    badgeLabel: "3-WAY MATCH VERIFIED",
    title: "Connect Records & Document Lineage",
    summary:
      "Automated cross-functional correlation links purchase order, warehouse receipt, and ledger commitments with zero human intervention.",
    metrics: [
      { label: "RECON VARIANCE", value: "₹0.00" },
      { label: "PO MATCH RATE", value: "100%" },
      { label: "CORRELATION", value: "Deterministic" },
    ],
    details: [
      { label: "PURCHASE ORDER", value: "PO-8841 · Linked & Approved" },
      { label: "GOODS RECEIPT", value: "GRN-104 · Inspection Cleared" },
      { label: "MASTER CONTRACT", value: "MSA-2025-ANANYA · Clause 4.2 Verified" },
      { label: "LINEAGE INTEGRITY", value: "Immutable Cryptographic Link" },
    ],
  },
  {
    stepName: "VALIDATE",
    kicker: "03 · AI / VALIDATE",
    badgeLabel: "STATUTORY & POLICY PASSED",
    title: "Verify Statutory & Business Rules",
    summary:
      "Real-time verification against GSTN API, e-Way bills, HSN codes, and internal commercial credit limits before booking ledger entries.",
    metrics: [
      { label: "IRN VERIFICATION", value: "Valid & Signed" },
      { label: "TAX CODE AUDIT", value: "HSN 998313 (18%)" },
      { label: "POLICY DRIFT", value: "0.0%" },
    ],
    details: [
      { label: "IRP SIGNATURE", value: "NIC Portal Digital Hash Authenticated" },
      { label: "E-WAY BILL", value: "EWB-9920148 · Cleared & Synced" },
      { label: "GSTN PORTAL", value: "Active Taxpayer · Return Compliant" },
      { label: "CREDIT LIMIT", value: "Approved Limit ₹25,00,000 (Within Cap)" },
    ],
  },
  {
    stepName: "PREDICT",
    kicker: "04 · AI / PREDICT",
    badgeLabel: "PREDICTIVE RISK SIGNAL",
    title: "Forecast Payment Velocity & Delay Risk",
    summary:
      "Continuous behavioral payment analysis forecasts collection velocity and flags working capital drift days before default windows.",
    metrics: [
      { label: "PAYMENT PROBABILITY", value: "92% in 4 Days" },
      { label: "CYCLE DRIFT RISK", value: "+12 Days (If Delayed)" },
      { label: "HISTORICAL VELOCITY", value: "38 Days Avg." },
    ],
    details: [
      { label: "HISTORICAL PATTERN", value: "Customer pays reliably within 38 days" },
      { label: "CURRENT POSITION", value: "Day 34 · Approaching due window boundary" },
      { label: "RISK SIGNAL", value: "Probability drops 40% if not prompted before Day 38" },
      { label: "CASH IMPACT", value: "₹5,90,000 forward liquidity factor" },
    ],
  },
  {
    stepName: "DECIDE",
    kicker: "05 · AI / DECIDE",
    badgeLabel: "DECISION READY",
    title: "Recommend Optimal Business Action",
    summary:
      "AI synthesizes cashflow impact and suggests the optimal intervention strategy according to company credit governance policies.",
    metrics: [
      { label: "RECOMMENDED ACTION", value: "Prioritize Collection" },
      { label: "TARGET CHANNEL", value: "WhatsApp + Email" },
      { label: "EXPECTED RECOVERY", value: "< 48 Hours" },
    ],
    details: [
      { label: "DECISION RATIONALE", value: "Pre-empt payment drift before customer payment run" },
      { label: "OUTREACH PROTOCOL", value: "Automated executive summary with instant payment link" },
      { label: "INCENTIVE MODEL", value: "Highlight 1.5% prompt settlement rebate" },
      { label: "GOVERNANCE", value: "Pre-approved under Collection Policy v4" },
    ],
  },
  {
    stepName: "ACT",
    kicker: "06 · AI / ACT",
    badgeLabel: "PAYOFF READY",
    title: "Execute & Route Business Action",
    summary:
      "Trigger autonomous multi-rail payment recovery, generate authenticated payment tokens, and seal immutable audit trails in the ERP ledger.",
    metrics: [
      { label: "EXECUTION STATE", value: "Ready to Trigger" },
      { label: "PAYMENT LINK", value: "Generated & Signed" },
      { label: "AUDIT LINEAGE", value: "Append-Only" },
    ],
    details: [
      { label: "RECIPIENT", value: "finance@ananyaenterprises.com · Accounts Payable" },
      { label: "PAYMENT RAILS", value: "Dynamic Virtual Account + UPI QR + NEFT Bridge" },
      { label: "ERP LEDGER", value: "Pre-allocated cash expectation posted to SAP" },
      { label: "AUDIT TRAIL", value: "TXN-ACT-10482 sealed with cryptographic timestamp" },
    ],
    actionBlock: {
      headline: "Prioritize collection & dispatch payment link",
      subhead:
        "AI scheduled authenticated multi-channel outreach with instant reconciliation link.",
      primaryCta: "Review Collection",
      secondaryCta: "Schedule Auto-Followup",
      status: "QUEUED FOR DISPATCH · TODAY, 10:00 AM",
    },
  },
];

import { memo, startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AIAction, Badge, Button, FlowConnector, FlowNode, Icon, Status } from "./components/flowone";
import { AIFlowStep, Decision, Outcome, StateIndicator } from "./components/flow-system";
import { Forecast, InvoiceUI, ProductAI, ProductKPI, Reconciliation } from "./components/product-ui";
import { WebsiteHeader } from "./components/navigation-system";

const transactionStates = [
  { label: "ORDER", pillLabel: "Order", eyebrow: "STATE 01", title: "Order confirmed", summary: "A ₹5,00,000 order begins one continuous business journey.", state: "complete", facts: [["ORDER VALUE","₹5,00,000"],["UNITS","125"],["CUSTOMER","Ananya Enterprises"],["STATUS","Confirmed"]] },
  { label: "INVENTORY", pillLabel: "Inventory", eyebrow: "STATE 02", title: "Inventory allocated", summary: "The same transaction reserves stock in the Hyderabad warehouse.", state: "complete", facts: [["STOCK","125 units allocated"],["WAREHOUSE","Hyderabad"],["STATUS","Allocated"]] },
  { label: "INVOICE", pillLabel: "Invoice", eyebrow: "STATE 03", title: "Invoice issued", summary: "Operational activity becomes a financial obligation without losing context.", state: "active", facts: [["INVOICE","INV-10482"],["SUBTOTAL","₹5,00,000"],["GST","₹90,000"],["TOTAL","₹5,90,000"]] },
  { label: "GST", pillLabel: "GST Compliance", eyebrow: "STATE 04", title: "Compliance validated", summary: "Tax context stays attached to the transaction.", state: "complete", facts: [["GST","₹90,000"],["E-INVOICE","Generated"],["VALIDATION","Passed"],["E-WAY BILL","Ready"],["STATUS","Compliant"]] },
  { label: "RECEIVABLE", pillLabel: "Receivable", eyebrow: "STATE 05", title: "Receivable open", summary: "Finance sees the amount, customer and due date in the same flow.", state: "active", facts: [["AMOUNT","₹5,90,000"],["CUSTOMER","Ananya Enterprises"],["DUE","In 4 days"],["STATUS","Open"]] },
  { label: "AI PREDICTION", pillLabel: "AI Prediction", eyebrow: "STATE 06", title: "Intelligence enters the flow", summary: "92% probability of payment within 4 days.", state: "predictive", facts: [["PAYMENT PROBABILITY","92%"],["EXPECTED","Within 4 days"],["RECOMMENDED ACTION","Prioritize only if behaviour changes"]] },
  { label: "COLLECTION", pillLabel: "Collection", eyebrow: "STATE 07", title: "Insight becomes action", summary: "A payment reminder is ready when the business context calls for it.", state: "recommended", facts: [["REMINDER","Payment due"],["STATUS","Scheduled"],["ACTION","Send Reminder"]] },
  { label: "BANK", pillLabel: "Bank Recon", eyebrow: "STATE 08", title: "Payment matched", summary: "The bank receipt reconnects to the same invoice automatically.", state: "processing", facts: [["PAYMENT","₹5,90,000"],["STATUS","Received"],["MATCH","INV-10482"],["CONFIDENCE","98%"]] },
  { label: "CASH", pillLabel: "Cash Liquidity", eyebrow: "STATE 09", title: "Cash available", summary: "The transaction completes its operational and financial journey.", state: "complete", facts: [["AVAILABLE CASH","₹5,90,000"],["STATUS","Received"],["TRANSACTION","TXN-10482"]] },
  { label: "DECISION", pillLabel: "Decision", eyebrow: "STATE 10", title: "Decision ready", summary: "The transaction is no longer just an invoice. It is part of the business’s financial picture.", state: "recommended", facts: [["OUTCOME","Cash collected"],["CONTEXT","Restored"],["NEXT","Decision ready"]] },
] as const;

const capabilities = [
  {
    title: "GET PAID FASTER",
    subtitle: "Receivables, Invoicing & Cash Velocity",
    summary: "Automate invoice lifecycle, eliminate DSO friction, and reconcile receivables directly into working cash without manual spreadsheet tracking.",
    count: "4 Workflows",
    items: [
      { name: "Customer-to-Cash", tag: "PIPELINE", desc: "Connect orders, dispatch, and invoices directly to collection ledgers." },
      { name: "Accounts Receivable", tag: "LEDGER", desc: "Real-time ageing schedules, auto-dispute handling, and invoice matching." },
      { name: "Credit & Risk", tag: "AI SCORING", desc: "Dynamic counterparty limits and predictive payment default alerts." },
      { name: "Collections & Payments", tag: "AUTOMATION", desc: "Multi-rail payment collection with automated bank reconciliation." },
    ],
    active: ["INVOICE", "RECEIVABLE", "COLLECTION", "CASH"],
    metrics: [
      { label: "DSO REDUCTION", value: "-18 Days" },
      { label: "RECON SPEED", value: "Real-Time" },
      { label: "CLEARANCE", value: "100% Match" },
    ],
  },
  {
    title: "CONTROL PROCUREMENT",
    subtitle: "Spend Governance & Vendor Settlement",
    summary: "Enforce strict spend controls, automate 3-way matching, and execute vendor disbursements with zero ledger discrepancies.",
    count: "4 Workflows",
    items: [
      { name: "Procure-to-Pay", tag: "WORKFLOW", desc: "End-to-end purchasing governance from requisition to bank clearance." },
      { name: "Purchase Orders", tag: "GOVERNANCE", desc: "Multi-tier approval matrices with dynamic budget ceiling checks." },
      { name: "Accounts Payable", tag: "AUTOMATED", desc: "Optical extraction and automated 3-way line item verification." },
      { name: "Vendor Management", tag: "COMPLIANCE", desc: "Verified GSTIN onboarding, MSME tracking, and payment schedules." },
    ],
    active: ["ORDER", "INVOICE", "BANK"],
    metrics: [
      { label: "SPEND VARIANCE", value: "₹0.00" },
      { label: "3-WAY MATCH", value: "99.4%" },
      { label: "PO APPROVAL", value: "<2 Hours" },
    ],
  },
  {
    title: "RUN INVENTORY BETTER",
    subtitle: "Warehouse Allocation & Stock Velocity",
    summary: "Unify multi-location warehouse inventories with live sales orders, automated reorder thresholds, and demand intelligence.",
    count: "4 Workflows",
    items: [
      { name: "Inventory Intelligence", tag: "PREDICTIVE", desc: "Multi-echelon demand forecasting and automated safety stock alerts." },
      { name: "Warehouse Management", tag: "FULFILLMENT", desc: "Live bin allocation, pick-and-pack optimization, and dispatch tracking." },
      { name: "Stock & Replenishment", tag: "AUTOMATION", desc: "Algorithmic reorder triggers linked directly to supplier POs." },
      { name: "Order Management", tag: "ROUTING", desc: "Split-order routing and fulfillment across regional distribution centers." },
    ],
    active: ["ORDER", "INVENTORY", "INVOICE"],
    metrics: [
      { label: "STOCKOUT RISK", value: "Zero" },
      { label: "DISPATCH TURN", value: "4.2 Hours" },
      { label: "PICK ACCURACY", value: "99.9%" },
    ],
  },
  {
    title: "CONTROL CASH & BANKING",
    subtitle: "Treasury Forecasting & Auto-Reconciliation",
    summary: "Consolidate multi-bank balances, eliminate manual bank statement reconciliations, and forecast forward cash runways with precision.",
    count: "4 Workflows",
    items: [
      { name: "Cash & Banking", tag: "TREASURY", desc: "Unified multi-bank position dashboard with live transaction feeds." },
      { name: "Bank Reconciliation", tag: "ZERO DRIFT", desc: "Sub-second ledger-to-bank statement matching with zero variance." },
      { name: "Cash Flow Forecasting", tag: "PREDICTIVE", desc: "Scenario-based cash runways factoring in scheduled AP and expected AR." },
      { name: "Financial Visibility", tag: "REAL-TIME", desc: "CFO-ready executive liquidity telemetry and working capital metrics." },
    ],
    active: ["COLLECTION", "BANK", "CASH"],
    metrics: [
      { label: "FORWARD RUNWAY", value: "18 Months" },
      { label: "BANK SYNC", value: "Automated" },
      { label: "RECON DRIFT", value: "₹0.00" },
    ],
  },
  {
    title: "STAY COMPLIANT",
    subtitle: "Statutory Clearances & Audit Lineage",
    summary: "Generate authenticated IRN e-invoices, auto-clear e-way bills, and reconcile GST returns directly within transaction state.",
    count: "4 Workflows",
    items: [
      { name: "GST Hub", tag: "TAX ENGINE", desc: "Unified statutory compliance terminal for multi-GSTIN enterprises." },
      { name: "E-Invoicing", tag: "INSTANT IRN", desc: "Automated direct IRP handshake and QR code stamping on issuance." },
      { name: "E-Way Bills", tag: "LOGISTICS", desc: "Automated dispatch generation synchronized with transporter portals." },
      { name: "GST Reconciliation", tag: "AUTOMATION", desc: "Real-time GSTR-1, 2B, and 3B auto-population with zero tax credit loss." },
    ],
    active: ["INVOICE", "GST", "BANK"],
    metrics: [
      { label: "IRN CLEARANCE", value: "Instant" },
      { label: "GSTR-1 DRIFT", value: "0.0%" },
      { label: "AUDIT LINEAGE", value: "Append-Only" },
    ],
  },
];

const roles = [
  ["CFO",["Cash","Receivables","Forecast","Risk","Decision"]],["FINANCE CONTROLLER",["Receivables","Payables","Reconciliation"]],["BUSINESS OWNER",["Business health","Cash","Decisions"]],
  ["OPERATIONS",["Orders","Inventory","Fulfillment"]],["PROCUREMENT",["PO","Suppliers","Commitments"]],["WAREHOUSE",["Orders","Inventory","Movement","Replenishment"]],["COMPLIANCE",["GST","E-Invoice","E-Way Bill","Reconciliation"]],
] as const;

const roleKPIs: Record<string, Array<{ label: string; value: string; change?: string; type: "standard" | "comparison" | "alert" | "trend" | "predictive" }>> = {
  "CFO": [
    { label: "DSO (DAYS SALES OUTSTANDING)", value: "28 Days", change: "-6d vs last mo", type: "trend" },
    { label: "WORKING CAPITAL VELOCITY", value: "+₹1.2 Cr", change: "+8.4%", type: "standard" },
    { label: "FORWARD CASH RUNWAY", value: "18 Months", change: "Predictive", type: "predictive" },
  ],
  "FINANCE CONTROLLER": [
    { label: "UNMATCHED LEDGER ITEMS", value: "0 Invoices", change: "100% matched", type: "trend" },
    { label: "AUTOMATED RECONCILIATION", value: "98.4%", change: "+2.1%", type: "standard" },
    { label: "COLLECTIONS DUE THIS WEEK", value: "₹14.8 Lakh", change: "4 Invoices", type: "alert" },
  ],
  "BUSINESS OWNER": [
    { label: "OPERATING MARGIN", value: "24.2%", change: "+3.1%", type: "standard" },
    { label: "CASH CONVERSION CYCLE", value: "3.2x", change: "Optimal", type: "trend" },
    { label: "PIPELINE ARR FORECAST", value: "₹8.4 Cr", change: "92% conf", type: "predictive" },
  ],
  "OPERATIONS": [
    { label: "FULFILLMENT SLA", value: "99.4%", change: "+0.8%", type: "standard" },
    { label: "HYDERABAD DC CAPACITY", value: "84%", change: "Optimal", type: "standard" },
    { label: "STOCKOUT RISK", value: "0 Items", change: "Protected", type: "trend" },
  ],
  "PROCUREMENT": [
    { label: "COMMITTED PURCHASE ORDERS", value: "₹18.2 Lakh", change: "12 Approved", type: "standard" },
    { label: "SUPPLIER SLA COMPLIANCE", value: "96.5%", change: "+1.8%", type: "trend" },
    { label: "INVOICE PRICE DISCREPANCIES", value: "₹0", change: "Zero variance", type: "standard" },
  ],
  "WAREHOUSE": [
    { label: "ALLOCATED DISPATCH UNITS", value: "125 Units", change: "HYD-B4 Ready", type: "standard" },
    { label: "PICK & PACK ACCURACY", value: "99.9%", change: "Verified", type: "trend" },
    { label: "DISPATCH TURNAROUND", value: "4.2 Hours", change: "-1.5h vs target", type: "standard" },
  ],
  "COMPLIANCE": [
    { label: "E-INVOICE GENERATION", value: "100% Passed", change: "IRP signed", type: "standard" },
    { label: "GSTR-1 RECONCILIATION", value: "Auto-Populated", change: "Zero drift", type: "trend" },
    { label: "STATUTORY AUDIT READINESS", value: "100%", change: "Real-time logs", type: "standard" },
  ],
};

const aiStages = [
  {
    stepName: "UNDERSTAND",
    kicker: "01 · AI / UNDERSTAND",
    badgeLabel: "EXTRACTION COMPLETE",
    title: "Understand & Extract Business Object",
    summary: "Understand the business object and extract relevant information.",
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
    summary: "Connect relevant records, documents or data.",
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
    summary: "Check policy, business rules, compliance or tax conditions.",
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
    summary: "Identify likely outcomes, anomalies, delays or risks.",
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
    summary: "Recommend the next appropriate business action.",
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
    summary: "Execute or route the recommended action.",
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
      subhead: "AI scheduled authenticated multi-channel outreach with instant reconciliation link.",
      primaryCta: "Review Collection",
      secondaryCta: "Schedule Auto-Followup",
      status: "QUEUED FOR DISPATCH · TODAY, 10:00 AM",
    },
  },
];

const outcomeStories = [
  { title: "GET PAID FASTER", path: ["Receivable", "Collection", "Cash"], metric: "-12 Days DSO", desc: "Automate reminders and reconcile payments the moment they hit the bank." },
  { title: "CONTROL CASH", path: ["Bank", "Reconciliation", "Forecast"], metric: "₹12.4 Cr Forecast", desc: "Know your exact forward treasury without manual spreadsheet reconciliation." },
  { title: "REDUCE MANUAL WORK", path: ["Document", "AI", "Workflow"], metric: "-80% Manual Entry", desc: "Documents become data, transactions match automatically, and audits run themselves." },
  { title: "CATCH RISK EARLIER", path: ["Data", "AI", "Prediction"], metric: "4-Day Lead Time", desc: "AI predicts payment anomalies before invoices become overdue." },
  { title: "STAY COMPLIANT", path: ["Transaction", "GST", "Validation"], metric: "100% E-Invoicing", desc: "IRN generation, e-way bills, and GSTR-1 filings happen directly inside the transaction." },
  { title: "RUN OPERATIONS WITH CLARITY", path: ["Order", "Inventory", "Fulfillment"], metric: "99.9% Accuracy", desc: "Every department acts on identical inventory, customer, and financial context." },
];

const fragmentItems = [
  { area: "SALES", object: "ORDER", clean: "SO-10482", silo: "SILO 01 · CRM ONLY" },
  { area: "OPERATIONS", object: "STOCK", clean: "125 ALLOCATED", silo: "SILO 02 · OFFLINE SHEET" },
  { area: "FINANCE", object: "INVOICE", clean: "INV-10482", silo: "SILO 03 · DISCONNECTED" },
  { area: "GST", object: "TAX", clean: "IRN VERIFIED", silo: "SILO 04 · MANUAL PORTAL" },
  { area: "COLLECTIONS", object: "RECEIVABLE", clean: "DUE IN 4D", silo: "SILO 05 · UNTRACKED" },
  { area: "BANK", object: "PAYMENT", clean: "MATCHED 98%", silo: "SILO 06 · STATEMENT DRIFT" },
  { area: "SPREADSHEETS", object: "STATUS", clean: "AUTOMATED", silo: "WARNING · DUPLICATE KEY" },
  { area: "EMAIL", object: "APPROVAL", clean: "IN-FLOW", silo: "DELAY · 42 THREADS" },
];

const trustPillars = [
  {
    id: "audit",
    tag: "01 · LINEAGE",
    title: "Append-Only Transaction Lineage",
    subtitle: "Cryptographic Event Ledger",
    description: "Every journal entry, invoice alteration, and payment state is permanently committed into an append-only timeline with actor ID, microsecond timestamp, and delta. No silent edits, no phantom entries.",
    badge: "IMMUTABLE RECORD",
    tone: "green",
    code: "TXN-10482_INV_SEALED",
    rows: [
      { label: "ACTOR", value: "priya.s@ananya.in", tag: "FINANCE LEAD" },
      { label: "RECORD", value: "₹5,90,000 · GST 18% · COMMITTED" },
      { label: "HASH", value: "sha256:9b2d8e41a7f0c13e...", isHash: true },
    ],
  },
  {
    id: "governance",
    tag: "02 · ACCESS",
    title: "Dual-Key Maker-Checker Governance",
    subtitle: "Enforced Separation of Duties",
    description: "Strict least-privilege role boundaries prevent conflicting authority. The sales rep who books an order cannot clear an invoice credit memo; cash disbursements and credit overrides mandate multi-party sign-off.",
    badge: "DUAL-SIGN POLICY",
    tone: "blue",
    code: "POLICY #GOV-204",
    maker: { role: "MAKER · PROPOSAL", name: "Rohan M. [Sales Ops]", status: "SUBMITTED" },
    gate: "POLICY GATE: THRESHOLD > ₹2,00,000",
    checker: { role: "CHECKER · CLEARANCE", name: "Anita V. [VP Finance]", status: "AUTHORIZED" },
  },
  {
    id: "statutory",
    tag: "03 · STATUTORY",
    title: "Direct GSTN & IRP Tax Clearing",
    subtitle: "Zero-Portal Tax Clearance",
    description: "Built natively into Indian statutory tax infrastructure. Invoices generate signed IRN and QR codes automatically at confirmation; E-Way bills clear without third-party portal hops or manual spreadsheets.",
    badge: "DIRECT TAX RAILS",
    tone: "green",
    code: "ZERO REJECTIONS",
    grid: [
      { label: "IRN STATUS", value: "47b9...e281", sub: "CRYPTOGRAPHICALLY SIGNED" },
      { label: "E-WAY BILL", value: "#1810482029", sub: "DISPATCH PERMIT CLEARED" },
      { label: "GSTIN VALIDATION", value: "29AABCU9603R1ZM", sub: "ACTIVE IN DATABASE" },
      { label: "3-WAY RECON", value: "GSTR-1 ↔ 2B ↔ BOOKS", sub: "100% RECONCILED" },
    ],
  },
  {
    id: "banking",
    tag: "04 · BANKING",
    title: "Zero-Variance Bank Reconciliation",
    subtitle: "Deterministic Ledger-to-Bank Bridge",
    description: "Automated host-to-host multi-bank statement synchronization. Incoming NEFT/RTGS credits are paired to open receivables in sub-second intervals with zero balance drift.",
    badge: "OPEN BANKING BRIDGE",
    tone: "cyan",
    code: "HDFC DIRECT CONNECT",
    bank: {
      credit: "₹5,90,000.00 CR (Direct Feed)",
      ledger: "₹5,90,000.00 CLR (INV-10482)",
      variance: "₹0.00",
      speed: "48ms Auto-Match",
    },
  },
  {
    id: "residency",
    tag: "05 · SECURITY",
    title: "Tenant Sandboxing & India Data Residency",
    subtitle: "Sovereign Tenant Boundary",
    description: "Dedicated cryptographic database partitioning ensures complete multi-tenant isolation. All transaction, vendor, and customer data remains strictly resident within Indian sovereign data centers.",
    badge: "RESIDENT SOVEREIGNTY",
    tone: "blue",
    code: "TENANT_0x91F",
    grid: [
      { label: "STORAGE CIPHER", value: "AES-256-GCM", sub: "AT REST ENCRYPTION" },
      { label: "DATA RESIDENCY", value: "Mumbai (ap-south-1)", sub: "DOMESTIC JURISDICTION" },
      { label: "TRANSPORT PROTOCOL", value: "mTLS · TLS 1.3", sub: "END-TO-END CIPHER" },
      { label: "TENANT ISOLATION", value: "0% Co-Mingling", sub: "DEDICATED KEY RING" },
    ],
  },
  {
    id: "continuity",
    tag: "06 · RUNTIME",
    title: "Deterministic Operational Continuity",
    subtitle: "99.99% High-Consequence Runtime",
    description: "Engineered for continuous financial throughput during peak fiscal closures, quarterly audit deadlines, and month-end dispatch surges with automated multi-zone failover.",
    badge: "CONTINUOUS RUNTIME",
    tone: "green",
    code: "99.99% COMMITMENT",
    feed: [
      { label: "Posting & Journal Engine", status: "12ms · NOMINAL" },
      { label: "Statutory Gateway (GSTN/IRP)", status: "CONNECTED" },
      { label: "Transaction Multi-AZ Replication", status: "0ms LAG" },
    ],
    rpo: "RPO: 0 SECONDS · AUTOMATED FAILOVER",
  },
];

export default function Homepage() {
  const [demoOpen,setDemoOpen] = useState(false);
  const [capability,setCapability] = useState(0);
  const [role,setRole] = useState(0);
  const [fragmented,setFragmented] = useState(false);
  const [livingState,setLivingState] = useState(0);
  const livingRef = useRef<HTMLElement>(null);
  const livingPinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<any>(null);

  const aiPinRef = useRef<HTMLDivElement>(null);
  const aiTriggerRef = useRef<any>(null);
  const [aiActiveStage, setAiActiveStage] = useState(0);
  const [aiActionExecuted, setAiActionExecuted] = useState(false);

  const openDemo = useCallback(()=>setDemoOpen(true),[]);
  const closeDemo = useCallback(()=>setDemoOpen(false),[]);

  const scrollToAiStage = useCallback((targetIndex: number) => {
    startTransition(() => {
      setAiActiveStage(targetIndex);
    });
    if (aiTriggerRef.current) {
      const trigger = aiTriggerRef.current;
      const targetScroll = trigger.start + (targetIndex / 5) * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  }, []);

  const handleSelectState = useCallback((targetIndex: number) => {
    startTransition(() => {
      setLivingState(targetIndex);
    });
    if (triggerRef.current) {
      const trigger = triggerRef.current;
      const progress = (targetIndex + 0.5) / 10;
      const targetScroll = trigger.start + progress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    let rAF = 0;
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--fo-scroll-progress", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rAF = requestAnimationFrame(updateProgress);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rAF);
    };
  }, []);

  useLayoutEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup=()=>{};
    let cancelled=false;
    void Promise.all([import("gsap"),import("gsap/ScrollTrigger")]).then(([gsapModule,scrollModule])=>{
      if(cancelled)return;
      const gsap=gsapModule.gsap;
      const ScrollTrigger=scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const media=gsap.matchMedia();

      if (livingPinRef.current) {
        media.add("(min-width: 769px)",()=>{
          const trigger=ScrollTrigger.create({
            trigger:livingPinRef.current,
            start:"top top+=68",
            end:"+=900%",
            pin:true,
            scrub:.35,
            anticipatePin:1,
            onUpdate: (self) => {
              const next = Math.min(9, Math.floor(self.progress * 10));
              setLivingState((prev) => (prev !== next ? next : prev));
            },
          });
          triggerRef.current = trigger;
          return()=>{
            trigger.kill();
            triggerRef.current = null;
          };
        });
      }

      if (aiPinRef.current) {
        media.add("(min-width: 1024px)", () => {
          if (!aiPinRef.current) return;
          const cards = aiPinRef.current.querySelectorAll<HTMLElement>(".ai-stack-card");
          if (!cards || cards.length < 6) return;

          gsap.set(cards[0], { x: 0, y: 0, xPercent: 0, opacity: 1 });
          for (let i = 1; i < cards.length; i++) {
            gsap.set(cards[i], { xPercent: 120, x: 0, y: 0, opacity: 0 });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: aiPinRef.current,
              start: "top top+=68",
              end: "+=360%",
              pin: true,
              scrub: 0.4,
              anticipatePin: 1,
              onUpdate: (self) => {
                const stage = Math.min(5, Math.floor(self.progress * 6));
                setAiActiveStage((prev) => (prev !== stage ? stage : prev));
              },
            },
          });

          aiTriggerRef.current = tl.scrollTrigger;

          for (let i = 1; i < cards.length; i++) {
            tl.to(
              cards[i],
              {
                xPercent: 0,
                x: i * 24,
                y: i * 14,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
              },
              i - 1
            );
            tl.to(
              cards[i - 1],
              {
                opacity: 0.72,
                duration: 0.4,
                ease: "power1.out",
              },
              i - 1 + 0.3
            );
          }

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            aiTriggerRef.current = null;
          };
        });
      }

      cleanup=()=>media.revert();
    });
    return()=>{cancelled=true;cleanup()};
  },[]);

  return <main id="main-content" className="homepage">
    <a className="fo-skip-link" href="#home-hero">Skip to main content</a>
    <WebsiteHeader onDemo={openDemo} />
    <section id="home-hero" className="home-hero">
      <div className="home-container hero-grid">
        <div className="hero-copy">
          <span className="home-eyebrow">CONNECTED BUSINESS OPERATIONS PLATFORM</span>
          <h1>Your business moves as one.<br/><em>Your software should too.</em></h1>
          <p>flowOne connects finance, operations, compliance and AI into one continuous business flow.</p>
          <div className="hero-actions"><Button size="large" onClick={openDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse"/>}>Book a Demo</Button><a className="home-secondary-cta" href="#living-transaction">See How It Flows <Icon name="arrow" size={16} tone="action"/></a></div>
          <div className="hero-trust" aria-label="flowOne connects five areas of business"><span>FINANCE</span><i/><span>OPERATIONS</span><i/><span>COMPLIANCE</span><i/><span>CASH</span><i/><span>AI</span></div>
          <small>One connected platform for the work that moves your business.</small>
        </div>
        <HeroFlow />
      </div>
    </section>

    <section className="home-problem home-section">
      <div className="home-container problem-grid">
        <div><span className="home-index">02 · THE BUSINESS LOOP</span><h2>Business doesn’t happen in modules.</h2></div>
        <div className="problem-copy"><p>An order becomes inventory.<br/>Inventory becomes an invoice.<br/>An invoice becomes a receivable.<br/>A payment becomes cash.<br/>A business decision follows.</p><strong>This is one business event.<br/>Your software should understand the whole journey.</strong></div>
      </div>
      <BusinessLoop />
    </section>

    <section id="living-transaction" ref={livingRef} className="home-living">
      <div className="home-container living-intro"><span className="home-index">03 · LIVING TRANSACTION</span><h2>One transaction.<br/>Connected from start to cash.</h2><p>Follow a single ₹5,00,000 order as it moves through operations, finance, compliance, collection and cash.</p></div>
      <div ref={livingPinRef} className="living-desktop home-container"><div className="living-sticky"><LivingNarrative index={livingState} setIndex={setLivingState} onSelectState={handleSelectState}/><LivingProduct index={livingState}/></div></div>
      <div className="living-mobile home-container">{transactionStates.map((_,i)=><div className="living-mobile-state" key={i}><LivingNarrative index={i}/><LivingProduct index={i}/></div>)}</div>
    </section>

    <section className="home-fragmentation home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">04 · FRAGMENTATION</span>
            <h2>The transaction is connected.<br/>The systems usually aren’t.</h2>
          </div>
          <p>Sales sees the order. Operations sees the stock. Finance sees the invoice. GST sees the tax. The bank sees the payment.<br/><strong>Everyone sees a piece. Nobody sees the whole flow.</strong></p>
        </div>
        <div className={`home-fragment-visual ${fragmented ? "is-fragmented" : ""}`}>
          <div className="fragment-control">
            <div className="fragment-control-left">
              <span className="fragment-kicker">TXN-10482 · ONE BUSINESS EVENT</span>
              <strong>{fragmented ? "Siloed Reality: Context Severed Across 8 Disconnected Systems" : "flowOne Reality: Continuous Shared Transaction Pipeline"}</strong>
            </div>
            <button onClick={() => setFragmented(v => !v)}>
              <span>{fragmented ? "Restore Connected Context" : "Simulate Siloed Fragmentation"}</span>
              <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="fragment-items">
            {fragmentItems.map((item, i) => (
              <div className={`fragment-${i}`} key={item.area}>
                <div className="fragment-card-top">
                  <span>{item.area}</span>
                  <span className={`fragment-pill ${fragmented ? "is-silo" : "is-connected"}`}>
                    {fragmented ? item.silo : item.clean}
                  </span>
                </div>
                <strong>{item.object}</strong>
                <small>{fragmented ? "Context copied manually" : "TXN-10482 · Continuous Flow"}</small>
              </div>
            ))}
          </div>
          <div className="fragment-caption-bar">
            <span className="fragment-pulse-dot" aria-hidden="true" />
            <p aria-live="polite">
              {fragmented
                ? "Fragmented state: Operational and financial context drifts between silos. Manual reconciliation required."
                : "Connected state: Sales, operations, finance, tax, and banking act from one synchronized transaction object."}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="connection" className="home-connection home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">05 · CONNECTION</span>
            <h2>flowOne connects the work that moves your business.</h2>
          </div>
          <p>Finance, operations, compliance, cash and AI work from the same business context.</p>
        </div>
        <div className="connection-identity">
          <div className="connection-identity-left">
            <span className="connection-mono-id">TXN-10482</span>
            <strong>Ananya Enterprises · ₹5,00,000 → ₹5,90,000</strong>
          </div>
          <StateIndicator state="complete" />
        </div>
        <ConnectedFlow />
        <Outcome label="Same business. Same transaction. One connected system." value="Context restored · Decision ready" />
      </div>
    </section>

    <section id="capabilities" className="home-capabilities home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">03 · EXPLORE THE PLATFORM</span>
            <h2>Start with the work that matters most.</h2>
          </div>
          <p>Choose an outcome to see how flowOne helps you improve the workflows behind it.</p>
        </div>
        <div className="capability-composition">
          {/* LEFT COLUMN: CAPABILITY NAVIGATOR */}
          <div className="capability-list" role="tablist" aria-label="Capability areas">
            {capabilities.map((group, i) => (
              <button
                type="button"
                role="tab"
                aria-selected={capability === i}
                onClick={() => setCapability(i)}
                key={group.title}
                className={`capability-nav-card ${capability === i ? "is-active" : ""}`}
              >
                <div className="capability-nav-top">
                  <span className="capability-num">0{i + 1}</span>
                  <span className="capability-count">{group.count}</span>
                </div>
                <div className="capability-nav-body">
                  <strong className="capability-nav-title">{group.title}</strong>
                  <span className="capability-nav-sub">{group.subtitle}</span>
                </div>
                <div className="capability-nav-arrow" aria-hidden="true">
                  <Icon name="arrow" size={16} tone={capability === i ? "action" : "muted"} />
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT COLUMN: MODERN ARCHITECTURAL CARD */}
          <div className="capability-detail">
            {/* Top signature hairline beam */}
            <div className="capability-detail-beam" aria-hidden="true" />

            {/* Header row */}
            <div className="capability-detail-header">
              <div className="capability-detail-kicker-group">
                <span className="capability-detail-kicker">0{capability + 1} · UNIFIED ARCHITECTURE</span>
                <h3 className="capability-detail-title">{capabilities[capability].title}</h3>
              </div>
              <span className="capability-live-badge">
                <span className="capability-beacon" aria-hidden="true" />
                LIVE OPERATIONAL FABRIC
              </span>
            </div>

            <p className="capability-detail-summary">
              {capabilities[capability].summary}
            </p>

            {/* 2×2 Tactile Workflow Cards */}
            <div className="capability-items-grid">
              {capabilities[capability].items.map((item, idx) => (
                <a href="#living-transaction" key={item.name} className="capability-workflow-card">
                  <div className="capability-card-top">
                    <span className="capability-card-tag">{item.tag}</span>
                    <span className="capability-card-index">0{idx + 1}</span>
                  </div>
                  <strong className="capability-card-name">{item.name}</strong>
                  <span className="capability-card-desc">{item.desc}</span>
                  <div className="capability-card-arrow" aria-hidden="true">
                    <span>Explore workflow</span>
                    <Icon name="arrow" size={14} tone="action" />
                  </div>
                </a>
              ))}
            </div>

            {/* Active Pipeline Stage Visualizer */}
            <div className="capability-pipeline-panel">
              <div className="capability-pipeline-header">
                <span className="capability-pipeline-label">SYNCHRONIZED PIPELINE STAGES</span>
                <span className="capability-pipeline-status">4 OF 8 ACTIVE IN REAL-TIME</span>
              </div>
              <CapabilityFlow active={capabilities[capability].active} />
            </div>

            {/* Footer action */}
            <div className="capability-detail-footer">
              <Button size="medium" onClick={openDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="ai-inside-flow" className="home-ai home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">07 · AI INSIDE THE FLOW</span>
            <h2>AI that works<br/>inside the flow.</h2>
          </div>
          <p>{"AI doesn't sit beside your business. It understands what is happening and helps decide what happens next."}</p>
        </div>

        {/* Pinned Layered Progression Surface */}
        <div ref={aiPinRef} className="ai-pin-surface">
          <div className="ai-pinned-grid">
            {/* Left Column: Persistent Inspected Business Object */}
            <div className="ai-invoice-column">
              <div className="ai-invoice">
                <div className="ai-corner tl" aria-hidden="true" />
                <div className="ai-corner tr" aria-hidden="true" />
                <div className="ai-corner bl" aria-hidden="true" />
                <div className="ai-corner br" aria-hidden="true" />
                <div className="ai-invoice-meta">
                  <span>INSPECTED BUSINESS OBJECT</span>
                  <span className="ai-pill-active">
                    <span className="ai-beacon-dot" aria-hidden="true" />
                    AI EVALUATION ACTIVE
                  </span>
                </div>
                <strong>INV-10482</strong>
                <b>₹5,90,000</b>
                <small>Ananya Enterprises · GSTIN 36AABCA1234F1Z5</small>
                <div className="ai-telemetry-metrics">
                  <div><small>SCHEMA MATCH</small><strong>99.8%</strong></div>
                  <div><small>IRN STATUS</small><strong>Verified</strong></div>
                  <div><small>TIMING CONFIDENCE</small><strong>92.0%</strong></div>
                </div>
                <div className="ai-knows">
                  {["Customer profile", "Invoice line items", "Historical velocity", "Due date window", "IRP status"].map(x => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                <div className="ai-invoice-state-tag">
                  <span className="ai-state-indicator-dot" aria-hidden="true" />
                  <span>CURRENT EVALUATION: <strong>0{aiActiveStage + 1} · {aiStages[aiActiveStage].stepName}</strong></span>
                </div>
              </div>
            </div>

            {/* Luminous Stream Connector */}
            <div className="ai-connector-bridge" aria-hidden="true">
              <div className="ai-connector-line">
                <span className="ai-connector-pulse-dot" />
              </div>
              <span className="ai-connector-tag">EVENT BUS</span>
            </div>

            {/* Right Column: Progressive Layered Stack */}
            <div className="ai-stack-column">
              {/* Stage Progress Stepper */}
              <div className="ai-stage-tracker" role="tablist" aria-label="AI Progression Stages">
                {aiStages.map((stage, idx) => {
                  const isActive = aiActiveStage === idx;
                  const isComplete = idx < aiActiveStage;
                  return (
                    <button
                      key={stage.stepName}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`ai-tracker-step ${isActive ? "is-active" : isComplete ? "is-complete" : ""}`}
                      onClick={() => scrollToAiStage(idx)}
                    >
                      <span className="ai-tracker-num">0{idx + 1}</span>
                      <span className="ai-tracker-label">{stage.stepName}</span>
                      {isComplete && <span className="ai-tracker-check" aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Viewport for Stacked Cards */}
              <div className="ai-stack-viewport">
                {aiStages.map((stage, idx) => {
                  const isActive = aiActiveStage === idx;
                  const isComplete = idx < aiActiveStage;
                  return (
                    <article
                      key={stage.stepName}
                      className={`ai-stack-card ai-card-${idx} ${isActive ? "is-active" : isComplete ? "is-complete" : "is-future"}`}
                      style={{ zIndex: 10 + idx }}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {/* Top Hairline Gradient Beam */}
                      <div className="ai-card-beam" aria-hidden="true" />

                      {/* Header row */}
                      <div className="ai-card-header">
                        <div className="ai-card-header-left">
                          <span className="ai-card-spark-icon" aria-hidden="true">
                            <Icon name="spark" size={16} tone="action" />
                          </span>
                          <div>
                            <span className="ai-card-kicker">{stage.kicker}</span>
                            <h3 className="ai-card-title">{stage.title}</h3>
                          </div>
                        </div>
                        <span className={`ai-card-status-badge ${isActive ? "is-active" : isComplete ? "is-complete" : ""}`}>
                          <span className="ai-card-beacon" aria-hidden="true" />
                          {isComplete ? "✓ COMPLETE" : stage.badgeLabel}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="ai-card-summary">{stage.summary}</p>

                      {/* Inset Metrics Tray */}
                      <div className="ai-card-metrics">
                        {stage.metrics.map(m => (
                          <div className="ai-card-metric-cell" key={m.label}>
                            <span className="ai-card-metric-label">{m.label}</span>
                            <strong className="ai-card-metric-value">{m.value}</strong>
                          </div>
                        ))}
                      </div>

                      {/* Contextual Verified Details Grid */}
                      <div className="ai-card-details-grid">
                        {stage.details.map(d => (
                          <div className="ai-card-detail-item" key={d.label}>
                            <span className="ai-card-detail-label">{d.label}</span>
                            <span className="ai-card-detail-val">{d.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Final Payoff Action Module (Stage 06 ACT) */}
                      {stage.actionBlock && (
                        <div className="ai-card-payoff-box">
                          <div className="ai-payoff-top">
                            <div className="ai-payoff-info">
                              <span className="ai-payoff-tag">RECOMMENDED ACTION</span>
                              <strong className="ai-payoff-title">{stage.actionBlock.headline}</strong>
                              <p className="ai-payoff-sub">{stage.actionBlock.subhead}</p>
                            </div>
                            <span className="ai-payoff-status-pill">
                              <span className="ai-payoff-pulse" aria-hidden="true" />
                              {stage.actionBlock.status}
                            </span>
                          </div>
                          <div className="ai-payoff-actions">
                            <button
                              type="button"
                              className={`fo-button is-primary ${aiActionExecuted ? "is-executed" : ""}`}
                              onClick={() => setAiActionExecuted(true)}
                            >
                              {aiActionExecuted ? "✓ Collection Dispatched" : stage.actionBlock.primaryCta}
                            </button>
                            <button type="button" className="fo-button is-secondary">
                              {stage.actionBlock.secondaryCta}
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section Explore Action Link */}
        <div className="home-ai-footer">
          <a className="section-text-link inverse" href="#ai-inside-flow">
            Explore AI Inside the Flow <Icon name="arrow" size={16} tone="inverse" />
          </a>
        </div>
      </div>
    </section>

    <section className="home-predictive home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">08 · PREDICTIVE FLOW</span>
            <h2>Once everything is connected,<br/>the business becomes predictable.</h2>
          </div>
          <p>Connected data turns reporting into foresight—and foresight into action.</p>
        </div>
        <div className="predictive-steps">
          {["WHAT HAPPENED", "WHAT IS HAPPENING", "WHAT WILL HAPPEN", "WHAT SHOULD WE DO"].map((x, i) => (
            <div key={x} className={`predictive-step-item ${i === 2 ? "is-highlight" : ""}`}>
              <div className="predictive-step-header">
                <span className="predictive-step-num">0{i + 1}</span>
                <span className="predictive-step-stage">{i < 2 ? "HISTORICAL" : i === 2 ? "PREDICTIVE" : "PRESCRIPTIVE"}</span>
              </div>
              <strong>{x}</strong>
              {i < 3 && <Icon name="arrow" size={16} tone="muted" />}
            </div>
          ))}
        </div>
        <Forecast />
        <Decision
          signal="CASH POSITION"
          insight="Expected cash position may tighten next week due to delayed receivables"
          action="REVIEW UPCOMING RECEIVABLES &amp; DISPATCH REMINDERS"
        />
      </div>
    </section>

    <section className="home-outcomes home-section">
      <div className="home-container">
        <span className="home-index">09 · BUSINESS OUTCOMES</span>
        <h2>Better flow.<br/>Better decisions.<br/>Better business.</h2>
        <div className="outcome-editorial">
          {outcomeStories.map((story, i) => (
            <article className={`outcome-story story-${i}`} key={story.title}>
              <span className="outcome-watermark">0{i + 1}</span>
              <div className="outcome-story-topline">
                <span className="outcome-index-tag">[ 0{i + 1} · OUTCOME ]</span>
                <span className="outcome-metric-pill">{story.metric}</span>
              </div>
              <div className="outcome-story-body">
                <strong>{story.title}</strong>
                <p className="outcome-story-desc">{story.desc}</p>
              </div>
              <div className="outcome-story-path">
                <b>{story.path[0]}</b>
                <Icon name="arrow" size={14} tone="muted" />
                <b>{story.path[1]}</b>
                <Icon name="arrow" size={14} tone="muted" />
                <b>{story.path[2]}</b>
              </div>
            </article>
          ))}
        </div>
        <button className="outcome-demo-link" onClick={openDemo}>
          See what one connected workflow could change <Icon name="arrow" size={16} tone="action" />
        </button>
      </div>
    </section>

    <section className="home-roles home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">10 · WHO IT’S FOR</span>
            <h2>One flow.<br/>Different views.</h2>
          </div>
          <p>Every team works from the same transaction context—focused on the decisions that matter to them.</p>
        </div>
        <div className="role-selector">
          <div role="tablist" aria-label="Business roles">
            {roles.map((x, i) => (
              <button
                role="tab"
                aria-selected={role === i}
                onClick={() => setRole(i)}
                key={x[0]}
              >
                <span>{x[0]}</span>
              </button>
            ))}
          </div>
          <div className="role-view">
            <div className="role-view-header">
              <span className="role-view-kicker">{roles[role][0]} VIEW · SAME BUSINESS REALITY</span>
              <span className="role-view-badge">SYNCHRONIZED CONTEXT</span>
            </div>
            <strong>{roles[role][1].join(" · ")}</strong>
            <RoleFlow areas={roles[role][1]} />
            <div className="role-metrics">
              {(roleKPIs[roles[role][0]] || []).map(kpi => (
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

    <section id="proof" className="home-proof home-section">
      <div className="home-container"><div className="section-heading-row"><div><span className="home-index">11 · PROOF</span><h2>Built for businesses that need the whole picture.</h2></div><p>Verified customer evidence will live here. Until supplied, every proof point remains explicitly marked.</p></div>
        <div className="proof-placeholder"><div><span>PROOF COMING SOON · VERIFIED EVIDENCE ONLY</span><strong>[Customer name and verified quote]</strong><div className="proof-fields">{["CUSTOMER LOGO","INDUSTRY","PROBLEM","FLOW IMPLEMENTED","MEASURED OUTCOME"].map(x=><p key={x}><b>{x}</b><span>[To be supplied]</span></p>)}</div></div><a href="#final-cta">[Case study link] <Icon name="arrow" size={16} tone="action"/></a></div>
      </div>
    </section>

    <section className="home-answer home-section" aria-labelledby="what-is-flowone">
      <div className="home-container answer-grid"><div><span className="home-index">A CONNECTED OPERATING MODEL</span><h2 id="what-is-flowone">What is flowOne?</h2></div><div><p>flowOne is a connected Business Operations Platform that brings finance, operations, compliance, cash and AI together around one continuous business flow.</p><dl><div><dt>What does flowOne connect?</dt><dd>Customer-to-Cash, Procure-to-Pay, Inventory-to-Cash and Record-to-Report workflows.</dd></div><div><dt>Who is flowOne for?</dt><dd>Indian businesses, CFOs, finance teams, operations teams and business owners.</dd></div><div><dt>How does flowOne use AI?</dt><dd>AI works inside transactions to understand context, predict change, recommend action and help teams act.</dd></div></dl></div></div>
    </section>

    <section id="trust" className="home-trust home-section" aria-labelledby="trust-heading">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">12 · TRUST</span>
            <h2 id="trust-heading">Built for the financial work your business depends on.</h2>
          </div>
          <p>Control, accountability and clear access are part of the operating model—not decorative claims.</p>
        </div>
        <TrustArchitecture />
      </div>
    </section>

    <section id="final-cta" className="home-final-cta">
      <div className="home-container">
        <div className="cta-horizon-beam" aria-hidden="true" />
        <span className="cta-eyebrow">FROM TRANSACTION TO DECISION. ONE CONNECTED FLOW.</span>
        <h2>Ready to connect<br/><span className="cta-highlight">your business?</span></h2>
        <p>Start with one workflow. Connect the rest when you’re ready.</p>
        <div className="cta-actions">
          <Button size="large" onClick={openDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>
            Book a Demo
          </Button>
          <a className="cta-explore-link" href="#connection">
            Explore Platform <Icon name="arrow" size={16} tone="inverse" />
          </a>
        </div>
      </div>
    </section>
    <HomeFooter onDemo={openDemo}/>
    <DemoDialog open={demoOpen} onClose={closeDemo}/>
  </main>;
}

const TrustArchitecture = memo(function TrustArchitecture() {
  const [activeCard, setActiveCard] = useState<string>("audit");

  return (
    <div className="trust-architecture">
      {/* Live System Governance Bar */}
      <div className="trust-telemetry-bar" aria-label="System Governance Status">
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-beacon" aria-hidden="true" />
          <span className="trust-telemetry-label">SYSTEM INTEGRITY:</span>
          <span className="trust-telemetry-value">100% DETERMINISTIC POSTINGS</span>
        </div>
        <div className="trust-telemetry-divider" aria-hidden="true" />
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-label">STATUTORY RAILS:</span>
          <span className="trust-telemetry-value">GSTN · E-INVOICE IRP · E-WAY</span>
        </div>
        <div className="trust-telemetry-divider" aria-hidden="true" />
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-label">GOVERNANCE:</span>
          <span className="trust-telemetry-value">DUAL-KEY MAKER-CHECKER</span>
        </div>
        <div className="trust-telemetry-divider" aria-hidden="true" />
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-label">DATA BOUNDARY:</span>
          <span className="trust-telemetry-value">AES-256 · INDIA RESIDENT</span>
        </div>
      </div>

      {/* 6-Card Bento Matrix */}
      <div className="trust-matrix" role="region" aria-label="Financial trust and control pillars">
        {trustPillars.map((pillar) => {
          const p = pillar as any;
          const isActive = activeCard === p.id;
          return (
            <div
              key={p.id}
              className={`trust-card ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveCard(p.id)}
              onMouseEnter={() => setActiveCard(p.id)}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveCard(p.id);
                }
              }}
            >
              <div className="trust-card-top">
                <div className="trust-card-meta">
                  <span className="trust-card-tag">{p.tag}</span>
                  <span className="trust-card-status">{p.badge}</span>
                </div>
                <h3 className="trust-card-title">{p.title}</h3>
                <span className="trust-card-sub">{p.subtitle}</span>
                <p className="trust-card-desc">{p.description}</p>
              </div>

              {/* Embedded Micro-Visual Terminal */}
              <div className={`trust-visual trust-visual-${p.id}`}>
                <div className="trust-v-header">
                  <span className={`trust-v-badge trust-badge-${p.tone}`}>
                    <span className="trust-beacon-dot" aria-hidden="true" />
                    {p.badge}
                  </span>
                  <span className="trust-v-code">{p.code}</span>
                </div>

                {p.id === "audit" && p.rows && (
                  <div className="trust-v-body">
                    {p.rows.map((r: any) => (
                      <div className="trust-v-row" key={r.label}>
                        <span className="trust-v-dim">{r.label}</span>
                        <span className={r.isHash ? "trust-v-hash" : "trust-v-bright"}>{r.value}</span>
                        {r.tag && <span className="trust-v-tag">{r.tag}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {p.id === "governance" && p.maker && p.checker && (
                  <div className="trust-dual-steps">
                    <div className="trust-dual-step is-complete">
                      <div className="trust-step-marker">01</div>
                      <div className="trust-step-info">
                        <span className="trust-step-role">{p.maker.role}</span>
                        <span className="trust-step-actor">{p.maker.name}</span>
                      </div>
                      <span className="trust-step-status">{p.maker.status}</span>
                    </div>
                    <div className="trust-dual-connector">
                      <span className="trust-connector-line" />
                      <span className="trust-connector-lock">{p.gate}</span>
                      <span className="trust-connector-line" />
                    </div>
                    <div className="trust-dual-step is-authorized">
                      <div className="trust-step-marker">02</div>
                      <div className="trust-step-info">
                        <span className="trust-step-role">{p.checker.role}</span>
                        <span className="trust-step-actor">{p.checker.name}</span>
                      </div>
                      <span className="trust-step-status is-approved">{p.checker.status}</span>
                    </div>
                  </div>
                )}

                {p.id === "statutory" && p.grid && (
                  <div className="trust-tax-grid">
                    {p.grid.map((cell: any) => (
                      <div className="trust-tax-cell" key={cell.label}>
                        <span className="trust-v-dim">{cell.label}</span>
                        <span className="trust-tax-val">{cell.value}</span>
                        <span className="trust-tax-sub">{cell.sub}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.id === "banking" && p.bank && (
                  <div className="trust-bank-balance">
                    <div className="trust-bank-row">
                      <span>Bank Statement:</span>
                      <strong>{p.bank.credit}</strong>
                    </div>
                    <div className="trust-bank-row">
                      <span>Ledger Receivable:</span>
                      <strong>{p.bank.ledger}</strong>
                    </div>
                    <div className="trust-bank-divider" />
                    <div className="trust-bank-summary">
                      <div>
                        <span className="trust-v-dim">VARIANCE</span>
                        <span className="trust-bank-zero">{p.bank.variance} (Zero Drift)</span>
                      </div>
                      <div className="trust-bank-align-right">
                        <span className="trust-v-dim">SPEED</span>
                        <span className="trust-bank-speed">{p.bank.speed}</span>
                      </div>
                    </div>
                  </div>
                )}

                {p.id === "residency" && p.grid && (
                  <div className="trust-vault-grid">
                    {p.grid.map((cell: any) => (
                      <div className="trust-vault-item" key={cell.label}>
                        <span className="trust-v-dim">{cell.label}</span>
                        <span className="trust-vault-highlight">{cell.value}</span>
                        <span className="trust-v-sub">{cell.sub}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.id === "continuity" && p.feed && (
                  <div className="trust-heartbeat-feed">
                    {p.feed.map((hb: any) => (
                      <div className="trust-hb-item" key={hb.label}>
                        <span className="trust-hb-indicator is-live" />
                        <span className="trust-hb-label">{hb.label}</span>
                        <span className="trust-hb-status">{hb.status}</span>
                      </div>
                    ))}
                    <div className="trust-hb-summary-strip">
                      <span>{p.rpo}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const heroLeftFragments = [
  { id: "sales", label: "SALES & CRM", metric: "SO-10482", detail: "Order Confirmed", status: "CONNECTED" },
  { id: "stock", label: "WAREHOUSE & STOCK", metric: "125 Units", detail: "Allocated DC-02", status: "IN SYNC" },
  { id: "finance", label: "FINANCE & LEDGER", metric: "INV-10482", detail: "₹5,90,000 Open", status: "REAL-TIME" },
] as const;

const heroRightFragments = [
  { id: "gst", label: "GST COMPLIANCE", metric: "IRN Cleared", detail: "Instant E-Invoice", status: "VALIDATED" },
  { id: "bank", label: "BANKING & CASH", metric: "Auto-Recon", detail: "HDFC Matched", status: "RECEIVED" },
  { id: "ai", label: "AI INTELLIGENCE", metric: "92% Accuracy", detail: "Cash Probability", status: "ACTIVE" },
] as const;

const HeroFlow = memo(function HeroFlow() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setPulseIndex(i => (i + 1) % 3);
    }, 2400);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-pipeline-console"
      aria-label="flowOne Central Architecture: 6 business fragments connected to the central flowOne engine via live pipelines."
    >
      <div className="hero-pipeline-beam" aria-hidden="true" />

      {/* Top Telemetry Header */}
      <div className="hero-pipeline-topbar">
        <div className="hero-live-beacon" aria-label="System status: Live operating telemetry">
          <i aria-hidden="true" />
          <span>LIVE OPERATIONAL CONDUIT</span>
        </div>
        <div className="hero-topbar-sync">
          <span className="hero-sync-pulse-badge">6 OF 6 FRAGMENTS IN SYNC</span>
          <span className="hero-latency-tag">TXN-10482 · 14ms</span>
        </div>
      </div>

      {/* Main Dual-Flank Converging Pipeline Canvas */}
      <div className="hero-pipeline-stage">
        {/* LEFT FLANK (3 Fragments) */}
        <div className="hero-flank hero-flank-left">
          {heroLeftFragments.map((frag, idx) => (
            <div
              className={`hero-frag-card is-${frag.id} ${pulseIndex === idx ? "is-pulsing" : ""}`}
              key={frag.id}
            >
              <div className="hero-frag-meta">
                <span className="hero-frag-tag">{frag.label}</span>
                <span className="hero-frag-status">{frag.status}</span>
              </div>
              <div className="hero-frag-body">
                <strong>{frag.metric}</strong>
                <small>{frag.detail}</small>
              </div>
              <div className="hero-frag-port hero-port-right" aria-hidden="true">
                <i />
              </div>
            </div>
          ))}
        </div>

        {/* LEFT PIPELINES (SVG Conduits converging into Center) */}
        <div className="hero-conduits-col hero-conduits-left" aria-hidden="true">
          <svg className="hero-conduit-svg" viewBox="0 0 70 210" fill="none">
            {/* Top branch: left top card to center top */}
            <path d="M 0 35 C 35 35, 35 75, 70 75" className="conduit-rail-path" />
            <path d="M 0 35 C 35 35, 35 75, 70 75" className="conduit-rail-glow" />
            {/* Mid branch: straight into center */}
            <path d="M 0 105 L 70 105" className="conduit-rail-path" />
            <path d="M 0 105 L 70 105" className="conduit-rail-glow" />
            {/* Bottom branch: left bottom card to center bottom */}
            <path d="M 0 175 C 35 175, 35 135, 70 135" className="conduit-rail-path" />
            <path d="M 0 175 C 35 175, 35 135, 70 135" className="conduit-rail-glow" />

            {/* Inward Moving Energy Pulses */}
            <circle className="conduit-pulse-bead conduit-pulse-left-1" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-left-2" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-left-3" r="3.5" />
          </svg>
        </div>

        {/* CENTER ENGINE HUB (flowOne Core) */}
        <div className="hero-hub-center">
          <div className="hero-hub-beacon-rings" aria-hidden="true">
            <span className="hub-ring hub-ring-1" />
            <span className="hub-ring hub-ring-2" />
          </div>

          <div className="hero-hub-card">
            <div className="hero-hub-header">
              <div className="hero-hub-emblem" aria-hidden="true">
                <img src="/assets/flowone-spark-mark.png" alt="" className="hero-hub-logo-img" />
                <span className="hero-hub-beacon-dot" />
              </div>
              <div className="hero-hub-branding">
                <strong className="hero-hub-brand-name">flowOne</strong>
                <span className="hero-hub-brand-sub">CORE ENGINE</span>
              </div>
            </div>

            <div className="hero-hub-payload">
              <span className="hero-hub-kicker">UNIFIED TRANSACTION FABRIC</span>
              <strong className="hero-hub-txn">TXN-10482</strong>
              <div className="hero-hub-val-row">
                <span className="hero-hub-amount">₹5,90,000</span>
                <span className="hero-hub-state-pill">IN SYNC</span>
              </div>
            </div>

            <div className="hero-hub-sync-status">
              <span className="hero-hub-status-dot" aria-hidden="true" />
              <span>Zero Silo Drift · Single Source of Truth</span>
            </div>
          </div>
        </div>

        {/* RIGHT PIPELINES (SVG Conduits converging into Center) */}
        <div className="hero-conduits-col hero-conduits-right" aria-hidden="true">
          <svg className="hero-conduit-svg" viewBox="0 0 70 210" fill="none">
            {/* Top branch: right top card to center top */}
            <path d="M 70 35 C 35 35, 35 75, 0 75" className="conduit-rail-path" />
            <path d="M 70 35 C 35 35, 35 75, 0 75" className="conduit-rail-glow" />
            {/* Mid branch: straight into center */}
            <path d="M 70 105 L 0 105" className="conduit-rail-path" />
            <path d="M 70 105 L 0 105" className="conduit-rail-glow" />
            {/* Bottom branch: right bottom card to center bottom */}
            <path d="M 70 175 C 35 175, 35 135, 0 135" className="conduit-rail-path" />
            <path d="M 70 175 C 35 175, 35 135, 0 135" className="conduit-rail-glow" />

            {/* Inward Moving Energy Pulses */}
            <circle className="conduit-pulse-bead conduit-pulse-right-1" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-right-2" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-right-3" r="3.5" />
          </svg>
        </div>

        {/* RIGHT FLANK (3 Fragments) */}
        <div className="hero-flank hero-flank-right">
          {heroRightFragments.map((frag, idx) => (
            <div
              className={`hero-frag-card is-${frag.id} ${pulseIndex === idx ? "is-pulsing" : ""}`}
              key={frag.id}
            >
              <div className="hero-frag-port hero-port-left" aria-hidden="true">
                <i />
              </div>
              <div className="hero-frag-meta">
                <span className="hero-frag-tag">{frag.label}</span>
                <span className="hero-frag-status">{frag.status}</span>
              </div>
              <div className="hero-frag-body">
                <strong>{frag.metric}</strong>
                <small>{frag.detail}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="hero-pipeline-footer">
        <div className="hero-footer-stat">
          <span>PIPELINE LATENCY</span>
          <strong>&lt; 14ms</strong>
        </div>
        <div className="hero-footer-divider" aria-hidden="true" />
        <div className="hero-footer-stat">
          <span>CONTEXT INTEGRITY</span>
          <strong>100%</strong>
        </div>
        <div className="hero-footer-divider" aria-hidden="true" />
        <div className="hero-footer-stat">
          <span>STATUTORY AUDIT</span>
          <strong>IMMUTABLE</strong>
        </div>
      </div>
    </div>
  );
});

const BusinessLoop = memo(function BusinessLoop() {
  const items = [
    ["BUSINESS ACTIVITY", "Demand begins", "Commercial terms agreed"],
    ["TRANSACTION", "Context forms", "TXN-10482 generated"],
    ["OPERATIONS", "Work happens", "125 units reserved DC-02"],
    ["FINANCE", "Value is recorded", "INV-10482 + GST linked"],
    ["CASH", "Money arrives", "HDFC bank matched 98%"],
    ["DECISION", "The business acts", "Working capital updated"],
  ] as const;
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(5);
      hasPlayed.current = true;
      return;
    }
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting || hasPlayed.current) return;
        hasPlayed.current = true;
        items.forEach((_, index) =>
          timers.current.push(window.setTimeout(() => setActive(index), index * 900))
        );
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.current.forEach(window.clearTimeout);
    };
  }, []);

  const activate = (index: number) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    hasPlayed.current = true;
    setActive(index);
  };

  return (
    <div ref={root} className={`business-loop home-container is-step-${active}`}>
      <div className="business-flow-rail" aria-hidden="true">
        <div className="business-flow-rail-track" />
        <i className="business-flow-rail-fill" />
        <b className="business-flow-rail-pulse" />
      </div>
      <div className="business-loop-grid">
        {items.map(([title, description, detail], index) => (
          <button
            key={title}
            className={`loop-item loop-${index} ${
              index < active ? "is-complete" : index === active ? "is-active" : ""
            }`}
            onPointerEnter={() => activate(index)}
            onFocus={() => activate(index)}
            onClick={() => activate(index)}
            aria-current={index === active ? "step" : undefined}
          >
            <div className="loop-item-topline">
              <span className="loop-mono-tag">[ 0{index + 1} ]</span>
              <span className="loop-status-dot" aria-hidden="true" />
            </div>
            <i className="business-flow-node" aria-hidden="true" />
            <div className="loop-item-content">
              <strong>{title}</strong>
              <small>{description}</small>
              <span className="loop-detail-tag">{detail}</span>
            </div>
          </button>
        ))}
      </div>
      <p className="fo-sr-only">{items.map(item => item[0]).join(", then ")}.</p>
    </div>
  );
});

const LivingNarrative = memo(function LivingNarrative({
  index,
  setIndex,
  onSelectState,
}: {
  index: number;
  setIndex?: (i: number) => void;
  onSelectState?: (i: number) => void;
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const col = columnRef.current;
    const pill = activePillRef.current;
    if (col && pill) {
      const colTop = col.scrollTop;
      const colHeight = col.clientHeight;
      const pillTop = pill.offsetTop;
      const pillHeight = pill.offsetHeight;

      // Only scroll if outside the visible boundaries of the pill column
      if (pillTop < colTop) {
        col.scrollTop = pillTop;
      } else if (pillTop + pillHeight > colTop + colHeight) {
        col.scrollTop = pillTop + pillHeight - colHeight;
      }
    }
  }, [index]);

  const handleSelect = (targetIndex: number) => {
    startTransition(() => {
      if (onSelectState) {
        onSelectState(targetIndex);
      } else if (setIndex) {
        setIndex(targetIndex);
      }
    });
  };

  const handlePrev = () => {
    if (index > 0) {
      handleSelect(index - 1);
    }
  };

  const handleNext = () => {
    if (index < transactionStates.length - 1) {
      handleSelect(index + 1);
    }
  };

  // Standalone mode for mobile stacked list
  if (!setIndex && !onSelectState) {
    const x = transactionStates[index];
    return (
      <aside className="apple-explorer apple-explorer-single">
        <div className="apple-pill-group is-active">
          <div className="apple-pill-btn is-active">
            <span className="apple-pill-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </span>
            <span className="apple-pill-label">{x.pillLabel}</span>
          </div>
          <div className="apple-desc-card">
            <p className="apple-desc-lead">
              <strong className="apple-desc-bold">{x.title}.</strong>{" "}
              <span className="apple-desc-text">{x.summary}</span>
            </p>
            {x.facts && x.facts.length > 0 && (
              <div className="apple-desc-chips" aria-label="Key facts">
                {x.facts.map(([label, val]) => (
                  <div key={label} className="apple-desc-chip">
                    <span className="apple-chip-k">{label}</span>
                    <span className="apple-chip-v">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="apple-explorer" aria-label="Transaction states explorer">
      {/* Left Chevron Navigation Group */}
      <div className="apple-nav-chevrons" aria-label="Step navigation">
        <button
          type="button"
          className="apple-chevron-btn"
          disabled={index === 0}
          aria-label="Previous step"
          onClick={handlePrev}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 8.5L7 4.5L11 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="apple-chevron-btn"
          disabled={index === transactionStates.length - 1}
          aria-label="Next step"
          onClick={handleNext}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Vertical Pill List with Inline Accordion Description */}
      <div ref={columnRef} className="apple-pills-column" role="tablist" aria-orientation="vertical">
        {transactionStates.map((x, i) => {
          const isActive = i === index;
          return (
            <div
              key={x.label}
              ref={isActive ? activePillRef : null}
              className={`apple-pill-group ${isActive ? "is-active" : ""}`}
            >
              <button
                type="button"
                role="tab"
                id={`apple-pill-tab-${i}`}
                aria-selected={isActive}
                aria-expanded={isActive}
                aria-controls={`apple-desc-${i}`}
                className={`apple-pill-btn ${isActive ? "is-active" : ""}`}
                onClick={() => handleSelect(i)}
              >
                <span className="apple-pill-icon" aria-hidden="true">
                  {isActive ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="apple-pill-label">{x.pillLabel}</span>
              </button>

              {/* Description displays directly under the active pill on scroll and click */}
              {isActive && (
                <div
                  id={`apple-desc-${i}`}
                  role="tabpanel"
                  aria-labelledby={`apple-pill-tab-${i}`}
                  className="apple-desc-card"
                >
                  <p className="apple-desc-lead">
                    <strong className="apple-desc-bold">{x.title}.</strong>{" "}
                    <span className="apple-desc-text">{x.summary}</span>
                  </p>
                  {x.facts && x.facts.length > 0 && (
                    <div className="apple-desc-chips" aria-label="Key facts">
                      {x.facts.map(([label, val]) => (
                        <div key={label} className="apple-desc-chip">
                          <span className="apple-chip-k">{label}</span>
                          <span className="apple-chip-v">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
});

const LivingProduct = memo(function LivingProduct({ index }: { index: number }) {
  const [reminderSent, setReminderSent] = useState(false);
  const currentValue = index >= 2 ? "₹5,90,000" : "₹5,00,000";

  const statusLabel =
    index >= 9
      ? "Completed"
      : index === 8
      ? "Paid"
      : index === 7
      ? "Processing"
      : index === 6
      ? "Pending"
      : index === 5
      ? "Processing"
      : index === 4
      ? "Pending"
      : index === 3
      ? "Approved"
      : index >= 1
      ? "Processing"
      : "Approved";

  return (
    <div className="living-ui" aria-label="Living Transaction Workspace">
      <header className="living-ui-header">
        <div className="living-ui-topline">
          <div className="living-ui-crumb">
            <span>flowOne</span>
            <i>/</i>
            <span>Commercial Ops</span>
            <i>/</i>
            <span>Fulfillment to Cash</span>
          </div>
          <span className="living-ui-txn-tag">TXN-10482</span>
        </div>
        <div className="living-ui-headline">
          <div className="living-ui-entity">
            <strong>Ananya Enterprises</strong>
            <span>Enterprise Commercial Contract · Standard Terms</span>
          </div>
          <div className="living-ui-headline-right">
            <div className="living-ui-value-box">
              <small>CURRENT TRANSACTION VALUE</small>
              <b>{currentValue}</b>
            </div>
            <Status label={statusLabel} />
          </div>
        </div>
      </header>

      <div className="living-ui-meta-strip" aria-label="Transaction metadata">
        <div className="living-meta-item">
          <span>CUSTOMER / GSTIN</span>
          <strong>Ananya Enterprises (36AABCA1234F1Z5)</strong>
        </div>
        <div className="living-meta-item">
          <span>OPERATIONAL HUB</span>
          <strong>Hyderabad Central DC (DC-02)</strong>
        </div>
        <div className="living-meta-item">
          <span>ORIGIN DATE</span>
          <strong>18 Jun 2026</strong>
        </div>
        <div className="living-meta-item">
          <span>COMMERCIAL TERMS</span>
          <strong>Net 30 Days · E-Invoice Eligible</strong>
        </div>
      </div>

      <div key={index} className="living-ui-canvas">
        {index === 0 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Sales Order · SO-10482</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Order Confirmed</span>
            </div>
            <div className="living-table-shell">
              <table className="living-table">
                <thead>
                  <tr>
                    <th>LINE ITEM DESCRIPTION</th>
                    <th>QTY</th>
                    <th>UNIT PRICE</th>
                    <th style={{ textAlign: "right" }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>flowOne Connected Operations Suite — Annual Enterprise License</td>
                    <td>125 units</td>
                    <td>₹4,000</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>₹5,00,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="living-table-totals">
              <div><span>Subtotal</span><b>₹5,00,000</b></div>
              <div className="grand-total"><span>Sales Order Total</span><b>₹5,00,000</b></div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>COMMERCIAL WORKFLOW ROUTE</span>
                <small>Demand Initiated</small>
              </div>
              <p>Commercial agreement confirmed for 125 units. The sales order initiates an automated fulfillment workflow directly in Hyderabad inventory.</p>
            </div>
          </div>
        )}

        {index === 1 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Warehouse Allocation · SO-10482</strong>
              <span className="living-badge-pill is-info">125 / 125 Units Allocated</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>ALLOCATED UNITS</span>
                <strong>125 units (100% reserved)</strong>
              </div>
              <div className="living-grid-item">
                <span>WAREHOUSE LOCATION</span>
                <strong>Hyderabad Central DC (DC-02)</strong>
              </div>
              <div className="living-grid-item">
                <span>STORAGE BIN</span>
                <strong>Rack HYD-B4 · Bin 12</strong>
              </div>
              <div className="living-grid-item">
                <span>FULFILLMENT STATUS</span>
                <strong>Allocated · Outbound Ready</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>CONTINUOUS INVENTORY INTEGRATION</span>
                <small>Zero Silo Handoff</small>
              </div>
              <p>The same transaction reserves stock in the Hyderabad warehouse. Operations clears fulfillment without manual re-entry or detached warehouse spreadsheets.</p>
            </div>
          </div>
        )}

        {index === 2 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Tax Invoice · INV-10482</strong>
              <span className="living-badge-pill is-info">Issued · Due 28 Jun 2026</span>
            </div>
            <div className="living-table-shell">
              <table className="living-table">
                <thead>
                  <tr>
                    <th>DESCRIPTION &amp; SAC CODE</th>
                    <th>TAXABLE VALUE</th>
                    <th>CGST (9%)</th>
                    <th>SGST (9%)</th>
                    <th style={{ textAlign: "right" }}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Connected Platform Subscription (125 units) · SAC 998313</td>
                    <td>₹5,00,000</td>
                    <td>₹45,000</td>
                    <td>₹45,000</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>₹5,90,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="living-table-totals">
              <div><span>Subtotal</span><b>₹5,00,000</b></div>
              <div><span>Total GST (18%)</span><b>₹90,000</b></div>
              <div className="grand-total"><span>Invoice Amount</span><b>₹5,90,000</b></div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>FINANCIAL OBLIGATION FORMED</span>
                <small>Context Preserved</small>
              </div>
              <p>Operational fulfillment automatically converts into a tax invoice. Commercial value advances from ₹5,00,000 to ₹5,90,000 with complete tax metadata attached.</p>
            </div>
          </div>
        )}

        {index === 3 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>GST &amp; E-Invoicing Verification · INV-10482</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Compliant</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>E-INVOICE STATUS</span>
                <strong>Generated &amp; Signed by IRP</strong>
              </div>
              <div className="living-grid-item">
                <span>GST APPLIED</span>
                <strong>₹90,000 (CGST ₹45k + SGST ₹45k)</strong>
              </div>
              <div className="living-grid-item">
                <span>IRN HASH</span>
                <strong>7b4cf829019a...392a (Verified)</strong>
              </div>
              <div className="living-grid-item">
                <span>STATUTORY VALIDATION</span>
                <strong>Passed · Auto-mapped to GSTR-1</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>COMPLIANCE IN THE FLOW</span>
                <small>E-Way Bill Ready</small>
              </div>
              <p>Tax context stays attached to the transaction. Government e-invoicing validations pass autonomously without logging into separate statutory portals.</p>
            </div>
          </div>
        )}

        {index === 4 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Accounts Receivable Ledger · Ananya Enterprises</strong>
              <span className="living-badge-pill is-warning">Open · Due in 4 days</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>OPEN RECEIVABLE</span>
                <strong>₹5,90,000</strong>
              </div>
              <div className="living-grid-item">
                <span>DUE WINDOW</span>
                <strong>Due in 4 days (28 Jun 2026)</strong>
              </div>
              <div className="living-grid-item">
                <span>AGING BUCKET</span>
                <strong>Current (0–30 Days)</strong>
              </div>
              <div className="living-grid-item">
                <span>CUSTOMER EXPOSURE</span>
                <strong>Ananya Enterprises · Clean Record</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>CONNECTED LEDGER CONTEXT</span>
                <small>Real-Time Exposure</small>
              </div>
              <p>Finance sees the exact amount, customer profile, and due date in the same flow. Operations and finance share one unified view of customer commitments.</p>
            </div>
          </div>
        )}

        {index === 5 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Flow Intelligence · Payment Behavior Forecast</strong>
              <span className="living-badge-pill is-info"><Icon name="spark" size={14} tone="action"/> 92% Probability</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>PAYMENT PROBABILITY</span>
                <strong style={{ fontSize: "1.2rem", color: "var(--color-brand-blue)" }}>92%</strong>
              </div>
              <div className="living-grid-item">
                <span>EXPECTED SETTLEMENT</span>
                <strong>Within 4 days (by 28 Jun 2026)</strong>
              </div>
              <div className="living-grid-item">
                <span>HISTORICAL ANALYSIS</span>
                <strong>24 previous transactions evaluated</strong>
              </div>
              <div className="living-grid-item">
                <span>SETTLEMENT CYCLE</span>
                <strong>Average turnaround: 28 days</strong>
              </div>
            </div>
            <div className="living-callout-panel is-ai">
              <div className="living-callout-header">
                <span>AI WORKING INSIDE THE TRANSACTION</span>
                <small>Behavioral Confidence</small>
              </div>
              <strong>Recommended action: Prioritize collection only if payment behaviour changes.</strong>
              <p>Intelligence analyzes Ananya Enterprises&apos;s settlement velocity in the context of seasonal cash flows. No speculative reminders are needed at this stage.</p>
            </div>
          </div>
        )}

        {index === 6 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Collections Orchestration · INV-10482</strong>
              <span className="living-badge-pill is-warning">{reminderSent ? "Reminder Sent" : "Reminder Scheduled"}</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>COLLECTION AMOUNT</span>
                <strong>₹5,90,000</strong>
              </div>
              <div className="living-grid-item">
                <span>SCHEDULED CADENCE</span>
                <strong>Pre-due reminder window (Day 26)</strong>
              </div>
              <div className="living-grid-item">
                <span>PREFERRED CHANNEL</span>
                <strong>WhatsApp Commercial + Finance Email</strong>
              </div>
              <div className="living-grid-item">
                <span>STATUS</span>
                <strong>{reminderSent ? "Sent · Verified" : "Scheduled · Ready to Trigger"}</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>INSIGHT BECOMES ACTION</span>
                <small>Contextual Outreach</small>
              </div>
              <p>A payment reminder is calibrated and ready when the business context calls for it. The reminder includes instant verified payment settlement links.</p>
              <div style={{ marginTop: "0.5rem" }}>
                <Button size="small" onClick={() => setReminderSent(true)}>
                  {reminderSent ? "Reminder Sent ✓" : "Send Reminder"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {index === 7 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Automated Bank Reconciliation · HDFC Corporate Feed</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Matched · 98% Confidence</span>
            </div>
            <div className="living-reconcile-match">
              <div className="living-reconcile-box">
                <span>BANK STATEMENT RECEIPT</span>
                <strong>₹5,90,000 received</strong>
                <small>HDFC Bank · A/c 2048</small>
                <small>UTR98204018274 · 24 Jun 14:08</small>
              </div>
              <div className="living-reconcile-bridge">
                <span>98% CONFIDENCE</span>
                <FlowConnector state="completed" pulse />
                <span>ZERO VARIANCE</span>
              </div>
              <div className="living-reconcile-box">
                <span>MATCHED INVOICE</span>
                <strong>INV-10482</strong>
                <small>Ananya Enterprises</small>
                <small>Exact amount &amp; entity match</small>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>ZERO MANUAL RECONCILIATION</span>
                <small>Instant Matching</small>
              </div>
              <p>The bank receipt reconnects to the same invoice automatically. Bank fee, timestamp, and remittance identifiers match without human intervention.</p>
            </div>
          </div>
        )}

        {index === 8 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Operating Treasury &amp; Cash Position</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Received</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>AVAILABLE CASH</span>
                <strong style={{ fontSize: "1.25rem", color: "var(--color-status-success)" }}>₹5,90,000</strong>
              </div>
              <div className="living-grid-item">
                <span>CLEARING TIMESTAMP</span>
                <strong>24 Jun 2026 · Value Date Settled</strong>
              </div>
              <div className="living-grid-item">
                <span>JOURNAL POSTING</span>
                <strong>Dr HDFC Bank / Cr Accounts Receivable</strong>
              </div>
              <div className="living-grid-item">
                <span>TRANSACTION RECORD</span>
                <strong>TXN-10482 (Fully Cleared)</strong>
              </div>
            </div>
            <div className="living-callout-panel is-dark">
              <div className="living-callout-header">
                <span>LIQUIDITY CONFIRMED</span>
                <small>Funds Available</small>
              </div>
              <p>The transaction completes its operational and financial journey. ₹5,90,000 is now active operating cash for forward deployment.</p>
            </div>
          </div>
        )}

        {index === 9 && (
          <div className="living-enterprise-card">
            <div className="living-card-header">
              <strong>Unified Business Outcome · Strategic Clarity</strong>
              <span className="living-badge-pill is-success"><Icon name="check" size={14} tone="success"/> Reconciled</span>
            </div>
            <div className="living-grid-summary">
              <div className="living-grid-item">
                <span>RECEIVABLE STATUS</span>
                <strong>Receivable cleared · INV-10482 ₹0</strong>
              </div>
              <div className="living-grid-item">
                <span>OPERATIONAL STATUS</span>
                <strong>Inventory fulfilled · 125 units delivered</strong>
              </div>
              <div className="living-grid-item">
                <span>COMPLIANCE STATUS</span>
                <strong>GST validated · GSTR-1 populated</strong>
              </div>
              <div className="living-grid-item">
                <span>TREASURY STATUS</span>
                <strong>Bank reconciled · +₹5,90,000 cash</strong>
              </div>
            </div>
            <div className="living-callout-panel">
              <div className="living-callout-header">
                <span>THE LOOP IS CLOSED</span>
                <small>Decision Ready</small>
              </div>
              <strong>The transaction is now part of the business’s financial picture.</strong>
              <p>Working capital updated, forward cash forecast hardened, and Ananya Enterprises&apos;s commercial credit limit refreshed for the next order.</p>
            </div>
          </div>
        )}
      </div>

      <footer className="living-ui-footer">
        <span className="living-footer-tag">TXN-10482 · CONTINUOUS LEDGER</span>
        <div className="living-footer-status">
          <i className="living-telemetry-dot is-active" />
          <span>Stage {String(index + 1).padStart(2, "0")} of 10 · {transactionStates[index].pillLabel}</span>
        </div>
      </footer>
    </div>
  );
});

const connectionStages = [
  { step: "01", name: "Order", status: "Confirmed", state: "complete" },
  { step: "02", name: "Inventory", status: "Allocated", state: "complete" },
  { step: "03", name: "Invoice", status: "Issued", state: "complete" },
  { step: "04", name: "GST", status: "Compliant", state: "complete" },
  { step: "05", name: "Receivable", status: "Open", state: "active" },
  { step: "06", name: "Collection", status: "Scheduled", state: "active" },
  { step: "07", name: "Bank", status: "Matched", state: "complete" },
  { step: "08", name: "Cash", status: "Received", state: "complete" },
  { step: "09", name: "Decision", status: "Settled", state: "recommended" },
] as const;

const ConnectedFlow = memo(function ConnectedFlow() {
  return (
    <div className="connection-pipeline" aria-label="Connected transaction flow pipeline">
      <div className="connection-rail" aria-hidden="true">
        <div className="connection-rail-line" />
        <div className="connection-rail-pulse" />
      </div>
      <div className="connection-grid">
        {connectionStages.map((stage, i) => {
          const isComplete = stage.state === "complete";
          const isActive = stage.state === "active";
          const isRecommended = stage.state === "recommended";

          return (
            <div
              key={stage.name}
              className={`connection-station ${isComplete ? "is-complete" : ""} ${isActive ? "is-active" : ""} ${isRecommended ? "is-recommended" : ""}`}
            >
              <div className="connection-station-node" aria-hidden="true">
                <span className="connection-node-dot">
                  {isComplete ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isActive ? (
                    <span className="connection-pulse-ring" />
                  ) : (
                    <span className="connection-inner-dot" />
                  )}
                </span>
                {i < connectionStages.length - 1 && (
                  <span className="connection-arrow" aria-hidden="true">
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                      <path d="M2 1L5 3.5L2 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="connection-station-card">
                <span className="connection-station-idx">{stage.step}</span>
                <strong className="connection-station-name">{stage.name}</strong>
                <span className="connection-station-status">{stage.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

function CapabilityFlow({active}:{active:readonly string[]}) {
  const items=["ORDER","INVENTORY","INVOICE","GST","RECEIVABLE","COLLECTION","BANK","CASH"];
  return <div className="capability-flow">{items.map((x,i)=><div className={active.includes(x)?"is-relevant":""} key={x}><i/><span>{x}</span>{i<items.length-1&&<b/>}</div>)}</div>;
}

function RoleFlow({areas}:{areas:readonly string[]}) {
  const states=["Order","Inventory","Invoice","GST","Receivable","Cash","Forecast","Decision"];
  return <div className="role-flow" aria-label={`Shared flow highlighting ${areas.join(", ")}`}>{states.map((x,i)=><div className={areas.some(area=>x.toLowerCase().includes(area.toLowerCase().split(" ")[0])||area.toLowerCase().includes(x.toLowerCase()))?"is-active":""} key={x}><i/><span>{x}</span>{i<states.length-1&&<b/>}</div>)}</div>;
}

function HomeFooter({onDemo}:{onDemo:()=>void}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="home-footer" id="flowone-footer" role="contentinfo">
      <div className="home-container footer-shell">
        {/* LAYER 1: CONVERSION LAUNCHPAD */}
        <section className="footer-launchpad" aria-label="Ready to connect your business flow">
          <div className="footer-launchpad__ambient-glow" aria-hidden="true" />
          <div className="footer-launchpad__content">
            <div className="footer-launchpad__eyebrow">
              <span className="footer-beacon" aria-hidden="true" />
              <span>ONE CONNECTED BUSINESS FLOW</span>
            </div>
            <h2 className="footer-launchpad__title">
              Ready to connect the work that moves your business?
            </h2>
            <p className="footer-launchpad__desc">
              Join forward-looking Indian mid-market enterprises replacing fragmented ERPs and manual spreadsheet workarounds with one continuous, deterministic transaction flow.
            </p>
            <div className="footer-launchpad__trust-pills">
              <span className="footer-pill">
                <svg className="footer-pill__icon" viewBox="0 0 16 16" fill="none"><path d="M13.333 4 6 11.333 2.667 8" stroke="#05C7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Zero Rip-and-Replace
              </span>
              <span className="footer-pill">
                <svg className="footer-pill__icon" viewBox="0 0 16 16" fill="none"><path d="M8 1.333 2.667 4v4c0 3.333 2.266 6.467 5.333 7.333 3.067-.866 5.333-4 5.333-7.333V4L8 1.333z" stroke="#05C7F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                100% Domestic Cloud Vault
              </span>
              <span className="footer-pill">
                <svg className="footer-pill__icon" viewBox="0 0 16 16" fill="none"><path d="M2 4.667h12M2 8h12M2 11.333h12" stroke="#05C7F2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Native GSTN & 48+ Indian Banks
              </span>
            </div>
          </div>
          <div className="footer-launchpad__actions">
            <Button size="large" onClick={onDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>
              Book a Live Demo
            </Button>
            <a href="#living-transaction" className="footer-launchpad__sandbox-btn">
              <span>Explore Interactive Sandbox</span>
              <span className="footer-launchpad__spark">⚡</span>
            </a>
          </div>
        </section>

        {/* LAYER 2: 5-PILLAR ARCHITECTURAL SITEMAP */}
        <nav className="footer-sitemap" aria-label="Complete Sitemap & Solutions Directory">
          {/* Pillar 1: Solutions */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">SOLUTIONS & SUITES</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#capabilities">Customer-to-Cash (AR)</a></li>
              <li><a href="#capabilities">Procure-to-Pay (AP)</a></li>
              <li><a href="#capabilities">Inventory & Warehouse</a></li>
              <li><a href="#capabilities">Cash, Treasury & Banking</a></li>
              <li><a href="#capabilities">GST Compliance & E-Way</a></li>
              <li><a href="#capabilities">Financial Closure & Controls</a></li>
              <li><a href="#capabilities">Working Capital Velocity</a></li>
            </ul>
          </div>

          {/* Pillar 2: Platform */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">CORE PLATFORM</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#connection">Platform Architecture</a></li>
              <li><a href="#connection">Unified Event Fabric</a></li>
              <li><a href="#connection">Deterministic Flow Pipelines</a></li>
              <li><a href="#connection">48+ Bank & GSTN Gateways</a></li>
              <li><a href="#connection">Document Extraction OCR</a></li>
              <li><a href="#connection">Policy Clearance Matrices</a></li>
              <li><a href="#connection">Security & Trust Architecture</a></li>
            </ul>
          </div>

          {/* Pillar 3: AI Runtime */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">AGENTIC AI RUNTIME</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#ai-inside-flow">flowOne AI Business Agent</a></li>
              <li><a href="#ai-inside-flow">WhatsApp Business AI Rails</a></li>
              <li><a href="#ai-inside-flow">Email Intelligence & Ingestion</a></li>
              <li><a href="#ai-inside-flow">Predictive Cash Forecasting</a></li>
              <li><a href="#ai-inside-flow">Credit Risk & Anomaly Alerts</a></li>
              <li><a href="#ai-inside-flow">Autonomous Bank Reconciliation</a></li>
              <li><a href="#ai-inside-flow">Maker-Checker Governance</a></li>
            </ul>
          </div>

          {/* Pillar 4: Resources */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">RESOURCES & GUIDES</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#proof">Practitioner Blog</a></li>
              <li><a href="#proof">GST & E-Invoicing Playbooks</a></li>
              <li><a href="#proof">MSME 45-Day Payment Rule Guide</a></li>
              <li><a href="#proof">Working Capital Benchmarks</a></li>
              <li><a href="#proof">Architecture Demos & Videos</a></li>
              <li><a href="#proof">CFO Perspectives & Strategy</a></li>
              <li><a href="#proof">Interactive ROI Calculator</a></li>
            </ul>
          </div>

          {/* Pillar 5: Company & Ecosystem (Transferred from header nav) */}
          <div className="footer-col" id="founder-diary">
            <div className="footer-col__header">
              <h3 className="footer-col__title">COMPANY & ECOSYSTEM</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#trust">About flowOne</a></li>
              <li><a href="#trust">Our Story & Mission</a></li>
              <li><a href="#trust">Leadership & Values</a></li>
              <li>
                <a href="/founders-diary/" className="footer-link-highlight">
                  <span>Founder’s Diary</span>
                  <span className="footer-link-badge">INSIGHTS</span>
                </a>
              </li>
              <li>
                <a href="#trust" className="footer-link-highlight">
                  <span>Careers</span>
                  <span className="footer-link-badge footer-link-badge--hiring">WE’RE HIRING</span>
                </a>
              </li>
              <li><a href="#trust">Partner & Integrator Program</a></li>
              <li><a href="#trust">Contact & Enterprise Advisory</a></li>
            </ul>
          </div>
        </nav>

        {/* LAYER 3: INSTITUTIONAL TRUST & SOVEREIGN FOOTPRINT */}
        <section className="footer-trust-deck" aria-label="Physical Offices and Sovereign Data Residency">
          <div className="footer-trust-card">
            <div className="footer-trust-card__header">
              <div className="footer-trust-card__icon-box">
                <svg viewBox="0 0 24 24" fill="none" className="footer-trust-card__icon"><path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 9v.01M9 13v.01M9 17v.01M17 13v.01M17 17v.01" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <span className="footer-trust-card__tag">LEGAL ENTITY</span>
                <h4 className="footer-trust-card__title">Registered Office</h4>
              </div>
            </div>
            <address className="footer-trust-card__address">
              Building #. 9-1-66, (501) Shyam Chabbrss Vihar,<br />
              SD Road, Secunderabad, Telangana 500003, India
            </address>
          </div>

          <div className="footer-trust-card">
            <div className="footer-trust-card__header">
              <div className="footer-trust-card__icon-box">
                <svg viewBox="0 0 24 24" fill="none" className="footer-trust-card__icon"><path d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10z" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="11" r="2.5" stroke="#05C7F2" strokeWidth="1.75"/></svg>
              </div>
              <div>
                <span className="footer-trust-card__tag">PRODUCT & TECH HQ</span>
                <h4 className="footer-trust-card__title">Corporate Office</h4>
              </div>
            </div>
            <address className="footer-trust-card__address">
              Office 207 & 208 (2nd Floor), Manjeera Trinity Corporate,<br />
              JNTU-Hitech City Road, Kukatpally, Hyderabad, Telangana 500072, India
            </address>
          </div>

          <div className="footer-trust-card footer-trust-card--highlight">
            <div className="footer-trust-card__header">
              <div className="footer-trust-card__icon-box">
                <svg viewBox="0 0 24 24" fill="none" className="footer-trust-card__icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <span className="footer-trust-card__tag footer-trust-card__tag--sovereign">SOVEREIGN RESIDENCY</span>
                <h4 className="footer-trust-card__title">Institutional Cloud Security</h4>
              </div>
            </div>
            <p className="footer-trust-card__info">
              100% Domestic Indian Cloud Vault (AWS Mumbai / GCP Delhi) · AES-256-GCM encryption at rest & in transit · SOC 2 Type II / ISO 27001 readiness · Deterministic cryptographic audit trail.
            </p>
          </div>
        </section>

        {/* LAYER 4: TELEMETRY & DIRECT CONTACT RAILS */}
        <section className="footer-telemetry-bar" aria-label="System status and contact channels">
          <div className="footer-telemetry-bar__status">
            <span className="footer-telemetry-beacon">
              <i className="footer-telemetry-beacon__dot" aria-hidden="true" />
              <strong className="footer-telemetry-beacon__label">ALL SYSTEMS OPERATIONAL</strong>
            </span>
            <span className="footer-telemetry-sep" aria-hidden="true">/</span>
            <span className="footer-telemetry-metric">99.99% PLATFORM UPTIME</span>
            <span className="footer-telemetry-sep" aria-hidden="true">/</span>
            <span className="footer-telemetry-metric">TRANSACTION ENGINE ACTIVE</span>
          </div>

          <div className="footer-telemetry-bar__channels">
            <a href="tel:+917670890889" className="footer-channel-link">
              <svg viewBox="0 0 24 24" fill="none" className="footer-channel-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>+91 7670890889</span>
            </a>
            <a href="mailto:sales@flowone.in" className="footer-channel-link">
              <svg viewBox="0 0 24 24" fill="none" className="footer-channel-icon"><rect width="20" height="16" x="2" y="4" rx="2" stroke="currentColor" strokeWidth="1.75"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
              <span>sales@flowone.in</span>
            </a>
            <div className="footer-social-links" aria-label="Social media channels">
              <a href="https://linkedin.com/company/flowone" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://twitter.com/flowone_in" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="X (formerly Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com/@flowone" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://github.com/flowone" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* LAYER 5: BRAND & LEGAL BASELINE */}
        <section className="footer-baseline">
          <div className="footer-baseline__brand">
            <img src="/assets/flowOne-Logo_Inverse.svg" alt="flowOne" className="footer-baseline__logo" />
            <span className="footer-baseline__motto">REIMAGINE BUSINESS WITH AI</span>
          </div>

          <p className="footer-baseline__copy">
            © 2026 flowOne Technologies Pvt. Ltd. All rights reserved.
          </p>

          <div className="footer-baseline__legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Data & Sovereign Residency</a>
            <a href="#cookies">Cookie Policy</a>
            <button type="button" onClick={scrollToTop} className="footer-back-to-top" aria-label="Scroll back to top">
              <span>Back to top</span>
              <svg viewBox="0 0 16 16" fill="none" className="footer-back-to-top__icon"><path d="M8 12.667V3.333m0 0L4 7.333m4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </section>
      </div>
    </footer>
  );
}

function DemoDialog({open,onClose}:{open:boolean;onClose:()=>void}) {
  const closeRef=useRef<HTMLButtonElement>(null);
  const dialogRef=useRef<HTMLDivElement>(null);
  const previousFocus=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    if(!open)return;
    previousFocus.current=document.activeElement as HTMLElement;
    document.body.classList.add("fo-nav-lock");
    closeRef.current?.focus();
    const fn=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){onClose();return}
      if(e.key!=="Tab")return;
      const items=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button,input,select,a[href]")||[]);
      if(!items.length)return;
      if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1)?.focus()}
      else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus()}
    };
    document.addEventListener("keydown",fn);
    return()=>{document.removeEventListener("keydown",fn);document.body.classList.remove("fo-nav-lock");previousFocus.current?.focus()}
  },[open,onClose]);
  return <div className={`home-demo-layer ${open?"is-open":""}`} inert={!open} aria-hidden={!open}><button className="home-demo-backdrop" onClick={onClose} aria-label="Close demo request"/><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="demo-title" aria-describedby="demo-description" className="home-demo-dialog"><header><div><span>BOOK A DEMO</span><h2 id="demo-title">Let’s connect your first flow.</h2></div><button ref={closeRef} onClick={onClose} aria-label="Close"><Icon name="close" size={20}/></button></header><p id="demo-description">Tell us where your business flow breaks today. A flowOne specialist will continue the conversation.</p><form onSubmit={e=>{e.preventDefault();onClose()}}><label><span>Work email</span><input type="email" required placeholder="you@company.com"/></label><label><span>Company</span><input required placeholder="Company name"/></label><label><span>Where should we start?</span><select defaultValue=""><option value="" disabled>Select a workflow</option><option>Get paid faster</option><option>Control procurement</option><option>Run inventory better</option><option>Control cash & banking</option><option>Stay compliant</option></select></label><Button>Request a Demo</Button></form><small>Prototype only. No information is submitted.</small></div></div>;
}

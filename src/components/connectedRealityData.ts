/* ==========================================================================
   Section 04: The Connected Reality — Shared Department Data
   Used across Suggestion 1 (Nested Tabs), Suggestion 2 (Circuit Rail),
   and Suggestion 3 (Streamlined Bento).
   ========================================================================== */

export interface DepartmentFunction {
  id: string;
  funcCode: string;
  funcName: string;
  shortLabel: string;
  category: string;
  domainId: string;
  objectName: string;
  reference: string;
  metric: string;
  detail: string;
  headline: string;
  lead: string;
  // Node Badges
  fragmentedBadge: string;
  connectedBadge: string;
  // Fragmented (Before)
  incompatibleToolIcon: string;
  incompatibleToolName: string;
  severedStatus: string;
  siloImpact: string;
  // Connected (After)
  connectedToolName: string;
  connectedLink: string;
  connectedBenefit: string;
}

export const departmentFunctions: DepartmentFunction[] = [
  {
    id: "sales",
    funcCode: "01",
    funcName: "SALES & COMMERCIAL",
    shortLabel: "Sales",
    category: "Commercial & Sales",
    domainId: "commercial",
    objectName: "Customer Order",
    reference: "SO-10482",
    metric: "125 Units · ₹5,00,000",
    detail: "Acme Technologies Pvt Ltd",
    headline: "Commercial Sales Agreement",
    lead: "Customer order SO-10482 confirmed for 125 units (₹5,00,000). Commercial terms, pricing approvals, and customer GSTIN lock into a shared transaction context.",
    fragmentedBadge: "CRM Trapped",
    connectedBadge: "Commercial Lock",
    incompatibleToolIcon: "🏢",
    incompatibleToolName: "CRM System (Isolated)",
    severedStatus: "No API Link to Warehouse",
    siloImpact: "Order is trapped in the sales CRM. Warehouse and billing teams have zero visibility into committed delivery terms or pricing approvals.",
    connectedToolName: "flowOne Commercial Lock",
    connectedLink: "Direct real-time lock to Inventory Reserve & Finance Ledger",
    connectedBenefit: "Immediate stock reservation and automated credit review with zero sales-ops drift or spreadsheet transcription.",
  },
  {
    id: "operations",
    funcCode: "02",
    funcName: "OPERATIONS & STOCK",
    shortLabel: "Operations",
    category: "Operations & Supply",
    domainId: "operations",
    objectName: "Fulfillment & Reserve",
    reference: "ALLOC-10482",
    metric: "125 Units Allocated",
    detail: "DC-02 Bengaluru Hub",
    headline: "Warehouse Allocation & Dispatch",
    lead: "Physical inventory is allocated in real time at DC-02 Central Hub. Goods lock against the sales order with zero spreadsheet drift.",
    fragmentedBadge: "Offline Excel",
    connectedBadge: "Auto Dispatch",
    incompatibleToolIcon: "📊",
    incompatibleToolName: "Excel Spreadsheet (Offline)",
    severedStatus: "Dispatch Unknown to Billing",
    siloImpact: "Stock is tracked in offline spreadsheets. Billing is unaware of physical dispatch and cannot issue a tax invoice until paperwork returns.",
    connectedToolName: "flowOne Dynamic Fulfillment",
    connectedLink: "Auto-dispatches pick note into E-Way bill & invoice generation",
    connectedBenefit: "Barcode dispatch trigger automatically initiates billing and compliance without waiting for manual paper sign-offs.",
  },
  {
    id: "finance",
    funcCode: "03",
    funcName: "FINANCE & BILLING",
    shortLabel: "Finance",
    category: "Finance & Statutory",
    domainId: "finance",
    objectName: "Tax Invoice & Ledger",
    reference: "INV-10482",
    metric: "₹5,90,000 Total Value",
    detail: "Base ₹5,00,000 + 18% GST ₹90,000",
    headline: "Tax Invoicing & Ledger Lineage",
    lead: "Tax invoice INV-10482 generated for ₹5,90,000. Complete itemized lineage posted to general ledger with zero manual re-entry.",
    fragmentedBadge: "Manual Re-Key",
    connectedBadge: "GL Auto-Post",
    incompatibleToolIcon: "💼",
    incompatibleToolName: "Standalone Accounting ERP",
    severedStatus: "Manual Invoice Re-Keying",
    siloImpact: "Billing clerks manually copy line items into a legacy ERP. Price and tax discrepancies cause invoice disputes and delay ledger posting.",
    connectedToolName: "flowOne General Ledger Engine",
    connectedLink: "Automated 3-way match across order, dispatch & rate card",
    connectedBenefit: "Zero-reentry general ledger entry posted instantaneously with immutable audit-ready lineage.",
  },
  {
    id: "gst",
    funcCode: "04",
    funcName: "GST & COMPLIANCE",
    shortLabel: "GST",
    category: "GST & Compliance",
    domainId: "gst",
    objectName: "E-Invoice & Tax",
    reference: "IRN-82104491",
    metric: "18% IGST · ₹90,000",
    detail: "HSN 8471 · NIC Portal Validated",
    headline: "Govt E-Invoice & Compliance Clearance",
    lead: "Instant statutory verification via direct NIC portal integration. Generates signed IRN and cryptographic QR code in real time.",
    fragmentedBadge: "NIC Portal Drift",
    connectedBadge: "Signed IRN Clear",
    incompatibleToolIcon: "🏛️",
    incompatibleToolName: "Govt Tax Web Portal",
    severedStatus: "Transcription Risk on IRN",
    siloImpact: "Tax accountant logs into the government portal separately to key in invoice details. Transcription errors create statutory compliance penalties.",
    connectedToolName: "flowOne Native Statutory API",
    connectedLink: "Direct NIC API E-Invoice IRN & E-Way clearance",
    connectedBenefit: "Instantaneous IRN clearance and QR code stamping with automatic GSTR-1 ledger alignment.",
  },
  {
    id: "collections",
    funcCode: "05",
    funcName: "COLLECTIONS & AGING",
    shortLabel: "Collections",
    category: "Collections & Aging",
    domainId: "collections",
    objectName: "Accounts Receivable",
    reference: "DUE IN 4D",
    metric: "₹5,90,000 Receivable",
    detail: "Net 30 · Customer Terms",
    headline: "Accounts Receivable & Aging Velocity",
    lead: "Open receivable tracked against verified delivery proof. Dynamic aging clock prevents overdue drift with automated reminder workflows.",
    fragmentedBadge: "Blind Calls",
    connectedBadge: "POD Dynamic Clock",
    incompatibleToolIcon: "📑",
    incompatibleToolName: "Static AR Aging Printout",
    severedStatus: "Blind Calls (POD Unverified)",
    siloImpact: "Collector calls the customer blindly from a weekly report without knowing delivery was delayed, damaging buyer goodwill and causing disputes.",
    connectedToolName: "flowOne Dynamic AR Engine",
    connectedLink: "Dynamic aging clock synced to verified delivery POD",
    connectedBenefit: "Due date calculated dynamically from verified delivery proof; automated dispute-free payment reminders.",
  },
  {
    id: "banking",
    funcCode: "06",
    funcName: "BANKING & SETTLEMENT",
    shortLabel: "Banking",
    category: "Banking & Settlement",
    domainId: "banking",
    objectName: "Bank Reconciliation",
    reference: "HDFC-CORP",
    metric: "₹5,90,000 Settlement",
    detail: "Virtual Account NEFT Match",
    headline: "Corporate Bank Ingestion & Auto-Match",
    lead: "Direct corporate bank feed synchronization. Incoming remittance of ₹5,90,000 matched bilateral to invoice INV-10482 at 98% confidence.",
    fragmentedBadge: "30-Day Lag",
    connectedBadge: "Instant Settlement",
    incompatibleToolIcon: "🏦",
    incompatibleToolName: "Monthly Bank Statement PDF",
    severedStatus: "30-Day Statement Drift",
    siloImpact: "Unapplied NEFT credits sit unreconciled for weeks. Customer credit limit remains locked, blocking new orders.",
    connectedToolName: "flowOne Real-Time Banking API",
    connectedLink: "Direct Virtual Account API auto-matching & ledger clearance",
    connectedBenefit: "Funds credit matches invoice instantaneously; customer credit unblocks and ledger closes in real time.",
  },
];

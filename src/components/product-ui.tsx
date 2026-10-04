import type { ReactNode } from "react";
import { Avatar, Badge, Button, Divider, FlowConnector, FlowNode, Icon, InputField, Status } from "./flowone";
import { Decision, Milestone, Outcome, StateIndicator } from "./flow-system";

export function ProductSidebar({ collapsed = false, mobile = false }: { collapsed?: boolean; mobile?: boolean }) {
  const items = ["Dashboard", "Sales", "Receivables", "Credit", "Purchasing", "Inventory", "Cash & Banking", "GST & Compliance", "Reports", "AI", "Settings"];
  return <nav className={`product-sidebar ${collapsed ? "is-collapsed" : ""} ${mobile ? "is-mobile" : ""}`} aria-label="Product navigation">
    <div className="product-sidebar-context"><span>AE</span>{!collapsed && <div><strong>Ananya Group</strong><small>Primary workspace</small></div>}<Icon name="chevron" size={14} tone="muted" /></div>
    <div className="product-nav-items">{items.map((item, i) => <a href="#product-ui-system" className={i === 2 ? "is-active" : ""} key={item} aria-current={i === 2 ? "page" : undefined}><i>{item.slice(0, 1)}</i>{!collapsed && <span>{item}</span>}{item === "Receivables" && !collapsed && <Badge tone="danger">8</Badge>}</a>)}</div>
  </nav>;
}

export function ProductTopBar({ compact = false, scrolled = false }: { compact?: boolean; scrolled?: boolean }) {
  return <header className={`product-topbar ${compact ? "is-compact" : ""} ${scrolled ? "is-scrolled" : ""}`}><img src="/assets/flowone-logo.svg" alt="flowOne" /><div className="product-workspace"><span>WORKSPACE</span><strong>Ananya Group · India</strong></div><label className="product-global-search"><Icon name="search" size={16} tone="muted" /><input aria-label="Global search" placeholder="Search transactions, customers…" /><kbd>⌘ K</kbd></label><div className="product-top-actions"><Button variant="icon" size="small" ariaLabel="Notifications"><span className="product-notification-dot" /><span aria-hidden="true">N</span></Button><Button variant="icon" size="small" ariaLabel="Help">?</Button><Avatar size={32} initials="AK" /></div></header>;
}

export function Breadcrumb({ items }: { items: string[] }) {
  return <nav className="product-breadcrumb" aria-label="Breadcrumb">{items.map((item, i) => <span key={item}>{i < items.length - 1 ? <a href="#product-ui-system">{item}</a> : <b aria-current="page">{item}</b>}{i < items.length - 1 && <i>/</i>}</span>)}</nav>;
}

export function ProductPageHeader({ title = "Accounts Receivable", description = "Track invoices, collections and customer exposure.", compact = false }: { title?: string; description?: string; compact?: boolean }) {
  return <div className={`product-page-header ${compact ? "is-compact" : ""}`}><div><Breadcrumb items={["Finance", "Receivables"]} /><strong>{title}</strong><p>{description}</p></div><ActionBar /></div>;
}

export function ActionBar() {
  return <div className="product-action-bar"><Button variant="tertiary" size="small">Export</Button><Button variant="secondary" size="small">Send reminder</Button><Button size="small" iconBefore={<span>+</span>}>Create invoice</Button><Button variant="icon" size="small" ariaLabel="More actions">•••</Button></div>;
}

export function ContextBar() {
  return <div className="product-context-bar">{[["CUSTOMER", "Ananya Enterprises"], ["PERIOD", "September 2026"], ["STATUS", "Overdue"], ["BUSINESS UNIT", "Hyderabad"]].map(([label, value], i) => <div key={label}><span>{label}</span>{i === 2 ? <Status label="Overdue" /> : <strong>{value}</strong>}</div>)}</div>;
}

export function ProductKPI({ label, value, change, type = "standard" }: { label: string; value: string; change?: string; type?: "standard" | "comparison" | "alert" | "trend" | "predictive" }) {
  return <div className={`product-kpi is-${type}`}><span>{label}</span><strong>{value}</strong>{change && <small>{type === "predictive" && <Icon name="spark" size={14} />}<b>{change}</b> vs last month</small>}</div>;
}

type Row = { invoice: string; customer: string; amount: string; due: string; probability: string; status: "Pending" | "Approved" | "Overdue" | "Paid" };
const defaultRows: Row[] = [
  { invoice: "INV-10482", customer: "Ananya Enterprises", amount: "₹5,90,000", due: "Due in 4 days", probability: "92%", status: "Overdue" },
  { invoice: "INV-10461", customer: "Northstar Supply", amount: "₹2,18,400", due: "Due in 12 days", probability: "98%", status: "Approved" },
  { invoice: "INV-10433", customer: "Kiteworks India", amount: "₹86,000", due: "Paid 24 Jun", probability: "Matched", status: "Paid" },
];

export function ProductTable({ state = "default", rows = defaultRows }: { state?: "default" | "loading" | "empty" | "error"; rows?: Row[] }) {
  return <div className={`product-table is-${state}`} role="table" aria-label="Receivables">
    <div className="product-table-tools"><span>{rows.length} invoices</span><div><Button variant="tertiary" size="small">Bulk actions</Button><Button variant="icon" size="small" ariaLabel="Table settings">≡</Button></div></div>
    <div className="product-table-head" role="row"><span><input type="checkbox" aria-label="Select all rows" /></span><button>Invoice ↕</button><button>Customer ↕</button><button>Amount ↕</button><span>Due</span><span>AI signal</span><span>Status</span><span>Action</span></div>
    {state === "loading" ? Array.from({ length: 3 }).map((_, i) => <div className="product-table-skeleton" key={i}>{Array.from({ length: 6 }).map((__, j) => <i key={j} />)}</div>)
      : state === "empty" ? <ProductState type="empty" compact />
      : state === "error" ? <ProductState type="error" compact />
      : rows.map((row, i) => <div className={`product-table-row ${i === 0 ? "is-selected" : ""}`} role="row" key={row.invoice}><span><input type="checkbox" aria-label={`Select ${row.invoice}`} defaultChecked={i === 0} /></span><div><strong>{row.invoice}</strong><small>18 Jun 2026</small></div><strong>{row.customer}</strong><b>{row.amount}</b><span>{row.due}</span><span className="product-ai-signal"><Icon name="spark" size={14} />{row.probability}</span><Status label={row.status} /><Button variant="tertiary" size="small">View</Button></div>)}
    <footer><span>Showing 1–3 of 48</span><div><Button variant="secondary" size="small">Previous</Button><Button variant="secondary" size="small">Next</Button></div></footer>
  </div>;
}

export function FilterBar() {
  return <div className="product-filter-bar"><label><Icon name="search" size={16} tone="muted" /><input aria-label="Search invoices" placeholder="Search invoices" /></label><button>Status <Badge>3</Badge><Icon name="chevron" size={14} /></button><button>Date range <Icon name="chevron" size={14} /></button><button>Saved view <Icon name="chevron" size={14} /></button><Button variant="tertiary" size="small">Clear</Button><Button variant="secondary" size="small">Apply</Button></div>;
}

export function ProductSearch({ state = "results" }: { state?: "default" | "focus" | "typing" | "results" | "empty" | "loading" }) {
  return <div className={`product-search is-${state}`}><label><Icon name="search" size={20} tone="muted" /><input aria-label="Search flowOne" defaultValue={state === "default" ? "" : "Ananya"} placeholder="Search flowOne" />{state === "loading" && <span className="fo-spinner" />}</label>{state !== "default" && <div className="product-search-results">{state === "empty" ? <p>No transactions found.</p> : <><span>BEST MATCH</span><button><div><strong>Ananya Enterprises</strong><small>Customer · Hyderabad</small></div><Icon name="arrow" size={16} /></button><button><div><strong>INV-10482</strong><small>Invoice · ₹5,90,000</small></div><Icon name="arrow" size={16} /></button></>}</div>}</div>;
}

export function ProductState({ type, compact = false }: { type: "empty" | "loading" | "error"; compact?: boolean }) {
  const copy = type === "empty" ? ["No invoices yet", "Create your first invoice to start tracking receivables.", "Create invoice"] : type === "error" ? ["Bank connection unavailable", "Latest transaction data could not be synchronized.", "Reconnect"] : ["Loading workspace", "Preserving your layout while current data loads.", "Processing"];
  return <div className={`product-state is-${type} ${compact ? "is-compact" : ""}`}><i>{type === "loading" ? <span className="fo-spinner" /> : <Icon name={type === "error" ? "alert" : "arrow"} size={20} />}</i><strong>{copy[0]}</strong><p>{copy[1]}</p><Button variant={type === "error" ? "secondary" : "primary"} size="small" state={type === "loading" ? "disabled" : "default"}>{copy[2]}</Button></div>;
}

export function ProductDetailDrawer() {
  return <div className="product-drawer-context"><div className="product-drawer-table"><ProductTable /></div><aside><header><div><span>INVOICE DETAIL</span><strong>INV-10482</strong></div><Button variant="icon" size="small" ariaLabel="Close"><Icon name="close" size={16} /></Button></header><ContextBar /><div className="product-drawer-section"><strong>Payment outlook</strong><ProductAI type="prediction" /></div><Divider /><div className="product-drawer-section"><strong>Activity</strong><ActivityTimeline compact /></div><footer><Button variant="secondary" size="small">View invoice</Button><Button size="small">Send reminder</Button></footer></aside></div>;
}

export function ActivityTimeline({ compact = false }: { compact?: boolean }) {
  const events = [["Payment received", "Bank · Auto-matched", "24 Jun · 14:08"], ["Customer opened invoice", "Ananya Enterprises", "20 Jun · 09:42"], ["Reminder sent", "Priya Sharma", "19 Jun · 11:15"], ["GST validated", "flowOne system", "18 Jun · 16:20"], ["Invoice created", "Amit Kumar", "18 Jun · 15:54"]];
  return <div className={`product-timeline ${compact ? "is-compact" : ""}`}>{events.slice(0, compact ? 3 : events.length).map(([event, actor, time], i) => <div key={event}><i>{i === 0 ? <Icon name="check" size={14} /> : <span />}</i><div><strong>{event}</strong><span>{actor}</span><small>{time}</small></div></div>)}</div>;
}

export function Approval() {
  return <article className="product-approval"><header><div><span>APPROVAL REQUEST · AP-2048</span><strong>Purchase order approval</strong></div><Badge tone="warning">Policy review</Badge></header><div className="approval-facts"><div><span>REQUESTER</span><b>Neha Verma</b></div><div><span>AMOUNT</span><b>₹8,40,000</b></div><div><span>POLICY</span><b>Within threshold</b></div></div><div className="approval-recommendation"><Icon name="spark" size={16} /><div><span>FLOWONE RECOMMENDATION</span><strong>Approve with standard payment terms</strong><p>Matched budget, supplier and receiving policy.</p></div></div><footer><Button variant="tertiary" size="small">Escalate</Button><Button variant="secondary" size="small">Send back</Button><Button variant="destructive" size="small">Reject</Button><Button size="small">Approve</Button></footer></article>;
}

export function DocumentPreview() {
  return <div className="product-document"><header><div><span>INVOICE</span><strong>INV-10482</strong></div><div><Status label="Approved" /><Button variant="icon" size="small" ariaLabel="Download">↓</Button></div></header><div className="document-paper"><div className="document-brand">ANANYA<br />ENTERPRISES</div><div className="document-meta"><span>Issued 18 Jun 2026</span><span>Due 28 Jun 2026</span></div><Divider /><div className="document-lines"><i /><i /><i /><i /></div><div className="document-total"><span>TOTAL</span><strong>₹5,90,000</strong></div></div><footer><span>GST validated · Original document</span><Button variant="secondary" size="small">Open document</Button></footer></div>;
}

export function InvoiceUI() {
  return <article className="product-invoice"><header><div><span>INVOICE</span><strong>INV-10482</strong><p>Ananya Enterprises</p></div><Status label="Overdue" /></header><div className="invoice-dates"><div><span>ISSUED</span><b>18 Jun 2026</b></div><div><span>DUE</span><b>28 Jun 2026</b></div></div><div className="invoice-lines"><div><span>Operations platform · Annual</span><b>₹5,00,000</b></div><div><span>Subtotal</span><b>₹5,00,000</b></div><div><span>GST · 18%</span><b>₹90,000</b></div><div><strong>Total</strong><strong>₹5,90,000</strong></div></div><ProductAI type="prediction" /><footer><Button variant="secondary" size="small">Download</Button><Button size="small">Send reminder</Button></footer></article>;
}

export function PaymentUI() {
  return <article className="product-payment"><header><span>PAYMENT · PAY-8831</span><Status label="Processing" /></header><strong>₹5,90,000</strong><p>Ananya Enterprises</p><div>{[["METHOD", "Bank transfer"], ["DATE", "24 Jun 2026"], ["REFERENCE", "UTR98204018"], ["BANK", "HDFC · 2048"], ["RECONCILIATION", "Suggested match"]].map(([a,b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div><footer><StateIndicator state="processing" /><Button variant="secondary" size="small">View bank entry</Button></footer></article>;
}

export function Reconciliation() {
  return <article className="product-reconciliation"><div className="reconcile-side"><span>BANK TRANSACTION</span><strong>₹5,90,000</strong><p>Ananya Enterprises · UTR98204018</p><small>24 Jun 2026</small></div><div className="reconcile-link"><span>98%</span><FlowConnector state="predictive" pulse /></div><div className="reconcile-side"><span>SUGGESTED MATCH</span><strong>INV-10482</strong><p>Difference · ₹0</p><small>Exact amount + customer match</small></div><footer><Button variant="secondary" size="small">Review</Button><Button size="small">Match</Button></footer></article>;
}

export function ProductAI({ type = "insight" }: { type?: "insight" | "recommendation" | "prediction" | "action" }) {
  const content = {
    insight: ["PAYMENT INSIGHT", "Customer usually pays within 38 days.", "Current invoice is at day 34.", "Review context"],
    recommendation: ["RECOMMENDED ACTION", "Prioritize collection for this invoice.", "Payment probability is expected to decline after the due window.", "Review Collection"],
    prediction: ["PAYMENT PREDICTION", "92% probability within 4 days.", "Based on 24 previous payments.", "Prioritize"],
    action: ["EXECUTABLE ACTION", "Create purchase order for 500 units.", "Stockout expected in 8 days.", "Create PO"],
  }[type];
  return <article className={`product-ai is-${type}`}><i><Icon name="spark" size={16} /></i><div><span>{content[0]}</span><strong>{content[1]}</strong><p>{content[2]}</p><div><Badge tone="info">Confidence 92%</Badge><Button variant={type === "insight" ? "tertiary" : "secondary"} size="small">{content[3]}</Button></div></div></article>;
}

export function DataChart({ type = "line" }: { type?: "line" | "bar" | "area" | "distribution" | "sparkline" }) {
  return <figure className={`data-chart is-${type}`}><figcaption className="fo-sr-only">{type === "bar" ? "Collections increased across the last 30 days, reaching the highest weekly value in week six." : "Cash position increased to ₹12.4 crore over the last 30 days."}</figcaption><header><div><span>{type.toUpperCase()} CHART</span><strong>{type === "bar" ? "Collections by week" : "Cash position"}</strong></div><Badge>Last 30 days</Badge></header><div className="chart-plot" aria-hidden="true"><i className="chart-grid-lines" />{type === "bar" || type === "distribution" ? <div className="chart-bars">{[48,72,55,86,64,92,76].map((h,i) => <b style={{"--bar-height": `${h}%`} as React.CSSProperties} key={i} />)}</div> : <svg viewBox="0 0 500 140" preserveAspectRatio="none"><path className="chart-area" d="M0 120 C80 110 90 70 160 82 S250 95 300 48 S410 66 500 18 L500 140 L0 140Z" /><path className="chart-line" d="M0 120 C80 110 90 70 160 82 S250 95 300 48 S410 66 500 18" /></svg>}</div><footer><span><i />Actual</span><strong>₹12.4 Cr</strong></footer></figure>;
}

export function Forecast() {
  return <article className="product-forecast" aria-describedby="forecast-summary"><p id="forecast-summary" className="fo-sr-only">Cash is forecast at ₹12.4 crore over 30 days. A delayed customer payment may reduce expected cash by ₹5,90,000.</p><header><div><span>CASH FLOW FORECAST</span><strong>Expected cash position</strong></div><div><b>₹12.4 Cr</b><small>30-day forecast</small></div></header><div className="forecast-plot" aria-hidden="true"><svg viewBox="0 0 700 220" preserveAspectRatio="none"><path className="forecast-range" d="M350 100 C440 55 510 70 700 30 L700 150 C520 130 450 150 350 100Z" /><path className="forecast-actual" d="M0 170 C80 150 120 90 190 120 S300 130 350 100" /><path className="forecast-future" d="M350 100 C440 78 510 115 700 62" /><line x1="350" x2="350" y1="10" y2="210" /></svg><div className="forecast-event"><i /><span>RISK EVENT</span><strong>Customer payment delayed</strong><small>Potential impact · ₹5,90,000</small></div></div><footer><span><i className="actual" />Historical</span><span><i className="predicted" />Forecast</span><span><i className="range" />Confidence range</span></footer></article>;
}

export function ProductScenario({ title, context, signal, action, outcome }: { title: string; context: string; signal: string; action: string; outcome: string }) {
  return <article className="product-scenario"><header><span>FOCUSED EXAMPLE</span><strong>{title}</strong><p>{context}</p></header><div><FlowNode label={context} state="active" /><FlowConnector state="predictive" /><ProductAI type="prediction" /><Decision signal={signal} insight={action} action={outcome} /></div></article>;
}

export function CanonicalWorkspace() {
  return <div className="canonical-workspace"><ProductTopBar compact /><ProductSidebar collapsed /><main><ProductPageHeader title="Ananya Enterprises" description="Invoice, receivable and collection context." compact /><ContextBar /><div className="workspace-kpis"><ProductKPI label="TRANSACTION" value="INV-10482" /><ProductKPI label="VALUE" value="₹5,90,000" /><ProductKPI label="STATUS" value="Due in 4 days" type="alert" /><ProductKPI label="PAYMENT PROBABILITY" value="92%" type="predictive" /></div><div className="workspace-flow">{["Invoice", "Receivable", "AI prediction", "Collection", "Bank", "Cash"].map((item,i,all) => <div key={item}><FlowNode label={item} state={i < 2 ? "complete" : i === 2 ? "predictive" : i === 3 ? "recommended" : "idle"} />{i < all.length - 1 && <FlowConnector state={i < 2 ? "completed" : i === 2 ? "predictive" : "inactive"} pulse={i === 2} />}</div>)}</div><div className="workspace-lower"><InvoiceUI /><div><ProductAI type="recommendation" /><Outcome label="Expected cash impact" value="₹5,90,000 · within 4 days" /></div></div></main></div>;
}

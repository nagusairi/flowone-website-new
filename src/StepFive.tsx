import { Button, FlowConnector, FlowNode, Icon } from "./components/flowone";
import {
  ActionBar, ActivityTimeline, Approval, Breadcrumb, CanonicalWorkspace, ContextBar, DataChart,
  DocumentPreview, FilterBar, Forecast, InvoiceUI, PaymentUI, ProductAI, ProductDetailDrawer,
  ProductKPI, ProductPageHeader, ProductScenario, ProductSearch, ProductSidebar, ProductState,
  ProductTable, ProductTopBar, Reconciliation,
} from "./components/product-ui";

function ProductDoc({ index, title, note, children, wide = false, dark = false }: { index: string; title: string; note: string; children: React.ReactNode; wide?: boolean; dark?: boolean }) {
  return <section className={`product-doc ${wide ? "is-wide" : ""} ${dark ? "is-dark" : ""}`}><header><span>{index}</span><div role="heading" aria-level={3}>{title}</div><p>{note}</p></header><div className="product-doc-stage">{children}</div></section>;
}

export default function StepFive() {
  return <div id="product-ui-system" className="step-five">
    <section className="product-system-intro"><div className="container-wide"><span>STEP 05 · 07 — PRODUCT UI SYSTEM</span><div role="heading" aria-level={2}>Clarity, control<br />and consequence.</div><p>Real software for understanding what happened, what matters and what to do next.</p><div className="product-principles">{["CONTEXT", "DATA", "ACTION", "INTELLIGENCE", "OUTCOME"].map((x,i) => <div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></div></section>
    <div className="product-system-body container-wide">
      <ProductDoc index="01" title="App Shell" note="Canonical hierarchy: top bar, navigation and focused workspace." wide><div className="shell-specimen"><ProductTopBar /><div><ProductSidebar /><main><ProductPageHeader /><ContextBar /><div className="shell-placeholder"><i /><i /><i /></div></main></div></div></ProductDoc>
      <ProductDoc index="02" title="Navigation" note="Expanded, collapsed and mobile states stay subordinate to work."><div className="navigation-specimens"><ProductSidebar /><ProductSidebar collapsed /><ProductSidebar mobile /></div></ProductDoc>
      <ProductDoc index="03" title="Top Bar" note="Quiet access to workspace, search, help and identity."><div className="topbar-specimens"><ProductTopBar /><ProductTopBar compact scrolled /></div></ProductDoc>
      <ProductDoc index="04" title="Page Header" note="Establish location and hierarchy before data appears."><ProductPageHeader /></ProductDoc>
      <ProductDoc index="05" title="Context" note="Compact business context remains visible near the work."><ContextBar /></ProductDoc>
      <ProductDoc index="06" title="Actions" note="One primary action; supporting actions remain restrained."><ActionBar /></ProductDoc>
      <ProductDoc index="07" title="KPI" note="Metrics are information first—not automatically cards."><div className="product-kpi-grid"><ProductKPI label="TOTAL RECEIVABLES" value="₹12.4 Cr" change="+8.2%" type="comparison" /><ProductKPI label="OVERDUE" value="₹84.2 L" change="+3.1%" type="alert" /><ProductKPI label="EXPECTED IN 7 DAYS" value="₹3.8 Cr" change="92% confidence" type="predictive" /><ProductKPI label="COLLECTION DSO" value="42 days" change="-3 days" type="trend" /></div></ProductDoc>
      <ProductDoc index="08" title="Tables" note="Dense, precise rows with selection, sorting, AI signal and action." wide><ProductTable /></ProductDoc>
      <ProductDoc index="09" title="Filters" note="Controls remain close to the data they affect."><FilterBar /></ProductDoc>
      <ProductDoc index="10" title="Search" note="Fast global, page and table discovery."><div className="search-grid"><ProductSearch state="results" /><ProductSearch state="empty" /></div></ProductDoc>
      <ProductDoc index="11" title="Empty / Loading / Error" note="State communication preserves structure and provides recovery."><div className="product-state-grid"><ProductState type="empty" /><ProductState type="loading" /><ProductState type="error" /></div><div className="table-state-grid"><ProductTable state="loading" /><ProductTable state="empty" /><ProductTable state="error" /></div></ProductDoc>
      <ProductDoc index="12" title="Detail Drawer" note="Inspect records while preserving table context." wide><ProductDetailDrawer /></ProductDoc>
      <ProductDoc index="13" title="Activity Timeline" note="Actor, event, time and result explain what happened."><ActivityTimeline /></ProductDoc>
      <ProductDoc index="14" title="Approval" note="Policy context and recommendation support an accountable decision."><Approval /></ProductDoc>
      <ProductDoc index="15" title="Document" note="Reusable document context—not a complete PDF viewer."><DocumentPreview /></ProductDoc>
      <ProductDoc index="16" title="Invoice" note="A complete editable invoice pattern with contextual intelligence."><InvoiceUI /></ProductDoc>
      <ProductDoc index="17" title="Payment" note="Payment, bank and reconciliation state stay connected."><PaymentUI /></ProductDoc>
      <ProductDoc index="18" title="Reconciliation" note="AI proposes an explainable, executable match."><Reconciliation /></ProductDoc>
      <ProductDoc index="19" title="AI Insight" note="Evidence attached to an existing business object."><ProductAI type="insight" /></ProductDoc>
      <ProductDoc index="20" title="AI Recommendation" note="Specific recommendation, reason and next step."><ProductAI type="recommendation" /></ProductDoc>
      <ProductDoc index="21" title="AI Prediction" note="Current state, time horizon and confidence."><ProductAI type="prediction" /></ProductDoc>
      <ProductDoc index="22" title="AI Action" note="Intelligence becomes an executable action."><ProductAI type="action" /></ProductDoc>
      <ProductDoc index="23" title="Charts" note="Comparison and trend without decorative visualization." wide><div className="chart-grid"><DataChart /><DataChart type="bar" /><DataChart type="area" /><DataChart type="distribution" /></div></ProductDoc>
      <ProductDoc index="24" title="Forecast" note="Clearly separates history, expectation, confidence and risk event." wide><Forecast /></ProductDoc>
      <ProductDoc index="25" title="Flow + Product UI" note="Context, data, AI, action and consequence in focused compositions." wide dark><div className="scenario-grid"><ProductScenario title="Invoice → Receivable" context="INV-10482 · ₹5,90,000" signal="PAYMENT TIMING" action="92% within 4 days" outcome="PRIORITIZE COLLECTION" /><ProductScenario title="Bank Reconciliation" context="UTR98204018 · ₹5,90,000" signal="MATCH CONFIDENCE" action="98% exact match" outcome="RECONCILE" /><ProductScenario title="Credit Risk Review" context="Ananya · ₹18 L exposure" signal="RISK CHANGE" action="Limit utilization at 82%" outcome="REVIEW LIMIT" /><ProductScenario title="Inventory Risk" context="SKU-2048 · 125 units" signal="STOCKOUT" action="Expected in 8 days" outcome="CREATE PO" /><ProductScenario title="Cash Flow Forecast" context="30-day cash position" signal="DELAY IMPACT" action="₹5,90,000 at risk" outcome="ADJUST FORECAST" /><ProductScenario title="AI Collection" context="INV-10482 · Day 34" signal="PAYMENT PROBABILITY" action="Drops after day 38" outcome="SEND REMINDER" /></div></ProductDoc>
      <ProductDoc index="26" title="Canonical Transaction Workspace" note="One mini workspace combines invoice, receivable, prediction, action and cash consequence." wide><CanonicalWorkspace /></ProductDoc>
      <ProductDoc index="27" title="Responsive States" note="Product UI simplifies and recomposes instead of shrinking."><div className="responsive-product-states"><div><span>DESKTOP</span><ProductTopBar compact /></div><div className="is-tablet"><span>TABLET</span><ProductPageHeader compact /></div><div className="is-mobile"><span>MOBILE</span><ProductKPI label="RECEIVABLE" value="₹5,90,000" type="predictive" /><div>{["Invoice","AI","Collect","Cash"].map((x,i,a)=><div key={x}><FlowNode label={x} state={i===1?"predictive":i<1?"complete":"idle"} />{i<a.length-1&&<FlowConnector vertical state={i===1?"predictive":"inactive"} />}</div>)}</div><nav aria-label="Mobile product navigation">{["Home","Sales","Cash","More"].map(x=><button key={x}>{x.slice(0,1)}<span>{x}</span></button>)}</nav></div></div></ProductDoc>
      <ProductDoc index="28" title="Accessibility States" note="Focus, status, labels and recovery remain explicit without hover or color."><div className="accessibility-product-grid"><button className="access-focus-demo">Visible keyboard focus</button><label><input type="checkbox" defaultChecked /> Selection includes a native control</label><div><Icon name="alert" size={16} tone="danger" /><span>Error includes icon and message</span></div><Button state="disabled">Disabled action</Button></div><p className="accessibility-note">WCAG 2.2 AA · 44px touch targets · semantic controls · reduced motion · non-color status · responsive reading order</p></ProductDoc>
    </div>
  </div>;
}

import { AIInsight, FlowConnector, FlowNode, Icon } from "./components/flowone";
import {
  AIFlowStep, CompactFlow, Decision, FlowGroup, FlowPulse, Milestone, NumberedStage, Outcome,
  StateIndicator, Transaction, TransactionRow, canonicalStates,
} from "./components/flow-system";

function FlowDoc({ index, title, description, children, dark = false }: { index: string; title: string; description: string; children: React.ReactNode; dark?: boolean }) {
  return <section className={`flow-doc ${dark ? "is-dark" : ""}`}><header><span>{index}</span><div role="heading" aria-level={3}>{title}</div><p>{description}</p></header><div className="flow-doc-stage">{children}</div></section>;
}

export default function StepThree() {
  return <div className="step-three">
    <section className="flow-system-intro">
      <div className="container-wide">
        <span>STEP 03 · 06 — FLOW SYSTEM</span>
        <div role="heading" aria-level={2}>Business continuity,<br />made visible.</div>
        <div className="flow-equation"><b>FLOW</b><i>+</i><b>TRANSACTION</b><i>+</i><b>INTELLIGENCE</b><i>+</i><b>CONSEQUENCE</b></div>
        <p>Your business doesn’t run in modules. Neither should your software.</p>
      </div>
    </section>

    <div className="flow-system-body container-wide">
      <FlowDoc index="01" title="Flow Nodes" description="A canonical node states what happened, where the transaction is and what it means.">
        <div className="canonical-node-grid">
          <FlowNode label="ORDER" value="₹5,00,000" meta="Ananya Enterprises" state="idle" interactive />
          <FlowNode label="INVENTORY" value="125 units" meta="Allocated" state="active" interactive />
          <FlowNode label="INVOICE" value="₹5,90,000" meta="Generating" state="processing" interactive />
          <FlowNode label="BANK" value="₹5,90,000" meta="Received" state="complete" interactive />
          <FlowNode label="RECEIVABLE" value="+6 days" meta="Payment risk" state="attention" interactive />
          <FlowNode label="GST" value="₹90,000" meta="Validation failed" state="error" interactive />
          <FlowNode label="COLLECTION" value="92%" meta="Payment probability" state="predictive" interactive />
          <FlowNode label="DECISION" value="Ready" meta="Prioritize collection" state="recommended" interactive />
        </div>
        <div className="state-model">{canonicalStates.map((state, i) => <div key={state}><b>{String(i + 1).padStart(2, "0")}</b><StateIndicator state={state} /></div>)}</div>
      </FlowDoc>

      <FlowDoc index="02" title="Connectors" description="A relationship has direction, state and meaning—not decoration.">
        <div className="connector-grid">
          {(["inactive", "active", "completed", "attention", "predictive"] as const).map(state => <div key={state}><span>{state}</span><FlowConnector state={state} pulse={state === "active" || state === "predictive"} /></div>)}
          <div className="vertical-connector-demo"><span>vertical</span><FlowConnector state="active" vertical /></div>
          <div className="diagonal-connector-demo"><span>diagonal · exceptional</span><FlowConnector state="predictive" diagonal /></div>
        </div>
      </FlowDoc>

      <FlowDoc index="03" title="Flow Pulse" description="A precise signal that something meaningful is moving through the business." dark>
        <div className="pulse-grid"><div><span>TRANSACTION</span><FlowPulse /></div><div><span>PREDICTION</span><FlowPulse state="predictive" /></div><div><span>ATTENTION</span><FlowPulse state="attention" /></div></div>
        <p className="motion-note">Directional · 700ms · Power3.inOut · motion disabled when reduced motion is preferred</p>
      </FlowDoc>

      <FlowDoc index="04" title="Stages" description="Number, state and relationship form one reusable business-journey unit.">
        <div className="numbered-stages">
          <NumberedStage number="01" label="ORDER" value="₹5,00,000" supporting="Confirmed" state="completed" />
          <NumberedStage number="02" label="FULFILL" value="125 units" supporting="Allocated" state="completed" />
          <NumberedStage number="03" label="INVOICE" value="₹5,90,000" supporting="Generating" state="active" />
          <NumberedStage number="04" label="COLLECT" value="92%" supporting="Predicted" state="upcoming" />
          <NumberedStage number="05" label="CASH" supporting="Available" state="upcoming" last />
        </div>
      </FlowDoc>

      <FlowDoc index="05" title="Groups" description="Related activity belongs to one connected business journey.">
        <div className="group-grid">
          <FlowGroup title="CUSTOMER → CASH" description="Demand becomes available cash." outcome="Cash collected">
            {["Lead", "Order", "Invoice", "Receivable", "Collection", "Bank", "Cash"].map((item, i, all) => <div className="group-step" key={item}><FlowNode label={item} state={i < 3 ? "complete" : i === 3 ? "active" : "idle"} />{i < all.length - 1 && <FlowConnector state={i < 3 ? "completed" : i === 3 ? "active" : "inactive"} />}</div>)}
          </FlowGroup>
          <FlowGroup title="RECORD → REPORT" description="Transactions become decisions." outcome="Decision made">
            {["Transaction", "Classify", "Reconcile", "Ledger", "Close", "Report", "Decision"].map((item, i, all) => <div className="group-step" key={item}><FlowNode label={item} state={i < 4 ? "complete" : i === 4 ? "processing" : "idle"} />{i < all.length - 1 && <FlowConnector state={i < 4 ? "completed" : "inactive"} />}</div>)}
          </FlowGroup>
        </div>
      </FlowDoc>

      <FlowDoc index="06" title="Transactions" description="Identity persists while one business object transforms through operational and financial states.">
        <Transaction identity={{ id: "TXN-10482", amount: "₹5,00,000", entity: "Ananya Enterprises" }} currentStage="Receivable" aiSignal="Payment probability is 92%. Expected in 4 days.">
          {[
            ["ORDER", "₹5,00,000", "complete"], ["INVENTORY", "125 units", "complete"], ["INVOICE", "₹5,90,000", "complete"],
            ["GST", "₹90,000", "complete"], ["RECEIVABLE", "₹5,90,000", "active"], ["COLLECTION", "92%", "predictive"], ["BANK", "Pending", "idle"], ["CASH", "Pending", "idle"],
          ].map(([label, value, state], i, all) => <div className="transaction-step" key={label}><FlowNode label={label} value={value} state={state as "complete" | "active" | "predictive" | "idle"} />{i < all.length - 1 && <FlowConnector state={i < 4 ? "completed" : i === 4 ? "predictive" : "inactive"} pulse={i === 4} />}</div>)}
        </Transaction>
      </FlowDoc>

      <FlowDoc index="07" title="Transaction Rows" description="Compact continuity for tables, feeds, collections and AI workflows.">
        <div className="transaction-row-list">
          <TransactionRow id="TXN-10482" entity="Ananya Enterprises" amount="₹5,90,000" stage="Receivable" status="Due in 4 days" signal="92%" action="Prioritize" />
          <TransactionRow id="TXN-10461" entity="Northstar Supply" amount="₹2,18,400" stage="Approval" status="Policy matched" signal="98%" action="Approve" />
          <TransactionRow id="TXN-10433" entity="Kiteworks India" amount="₹86,000" stage="Bank" status="Reconciled" signal="Matched" action="Review" />
        </div>
      </FlowDoc>

      <FlowDoc index="08" title="Milestones" description="Compact evidence of a meaningful completed event.">
        <div className="milestone-track"><Milestone label="Invoice Generated" detail="18 Jun · ₹5,90,000" /><Milestone label="GST Filed" detail="18 Jun · ₹90,000" /><Milestone label="Payment Received" detail="24 Jun · ₹5,90,000" /><Milestone label="Bank Reconciled" detail="24 Jun · Auto-matched" /></div>
      </FlowDoc>

      <FlowDoc index="09" title="Decision Nodes" description="A signal becomes a consequence, then an executable decision.">
        <div className="decision-list"><Decision signal="PAYMENT RISK" insight="High probability of +6 day delay" action="PRIORITIZE COLLECTION" /><Decision signal="LOW STOCK" insight="Reorder point in 4 days" action="CREATE PURCHASE ORDER" state="attention" /></div>
      </FlowDoc>

      <FlowDoc index="10" title="Outcomes" description="Completion is a business consequence, not a decorative success state.">
        <div className="outcome-grid"><Outcome label="Cash collected" value="₹5,90,000" /><Outcome label="Risk reduced" value="6 days recovered" /><Outcome label="Inventory replenished" value="250 units" /><Outcome label="GST reconciled" value="₹90,000" /></div>
      </FlowDoc>

      <FlowDoc index="11" title="AI Inside Flow" description="AI understands, predicts and acts on a business object without becoming the interface.">
        <div className="ai-flow-context"><FlowNode label="INVOICE RECEIVED" value="₹2,18,400" meta="Northstar Supply" state="active" /><FlowConnector state="predictive" pulse /></div>
        <div className="ai-flow-model">{(["Understand", "Match", "Validate", "Predict", "Decide", "Act"] as const).map((step, i, all) => <AIFlowStep key={step} step={step} state={i < 3 ? "complete" : i === 3 ? "active" : "idle"} last={i === all.length - 1} />)}</div>
        <div className="ai-flow-answer"><div><span>UNDERSTOOD</span><b>Supplier, ₹2,18,400, GST ₹33,315</b></div><div><span>PREDICTED</span><b>Unusual tax variance</b></div><div><span>NEXT</span><b>Review anomaly</b></div></div>
      </FlowDoc>

      <FlowDoc index="12" title="Business Flow Examples" description="Small system demonstrations—not marketing sections.">
        <div className="business-flow-grid">
          <CompactFlow title="FLOW 01 · CUSTOMER → CASH" items={["Order", "Invoice", "Receivable", "AI · 92%", "Collection", "Bank", "Cash"]} activeIndex={3} />
          <CompactFlow title="FLOW 02 · PROCURE → PAY" items={["Request", "PO", "Receipt", "Invoice", "Approval", "Payment"]} activeIndex={4} />
          <CompactFlow title="FLOW 03 · INVENTORY → CASH" items={["Order", "Stock", "Fulfillment", "Invoice", "Collection", "Cash"]} activeIndex={2} />
          <CompactFlow title="FLOW 04 · RECORD → REPORT" items={["Transaction", "Classification", "Reconciliation", "Ledger", "Close", "Report", "Decision"]} activeIndex={4} />
        </div>
      </FlowDoc>

      <FlowDoc index="13" title="Responsive Flow" description="Horizontal on wide screens; deliberately recomposed into a vertical narrative on mobile.">
        <div className="responsive-flow-demo">
          <div className="responsive-device"><span>DESKTOP · MARKETING FLOW</span><div>{["Order", "Invoice", "Receivable", "Cash"].map((item, i, all) => <div key={item}><FlowNode label={item} state={i < 2 ? "complete" : i === 2 ? "active" : "idle"} />{i < all.length - 1 && <FlowConnector state={i < 2 ? "completed" : "active"} />}</div>)}</div></div>
          <div className="responsive-device is-mobile"><span>MOBILE · RECOMPOSED</span><div>{["Order", "Invoice", "Receivable", "Cash"].map((item, i, all) => <div key={item}><FlowNode label={item} state={i < 2 ? "complete" : i === 2 ? "active" : "idle"} />{i < all.length - 1 && <FlowConnector state={i < 2 ? "completed" : "active"} vertical />}</div>)}</div></div>
        </div>
        <div className="density-legend"><div><b>MARKETING FLOW</b><span>Large · Editorial · Few nodes</span></div><div><b>PRODUCT FLOW</b><span>Moderate · Interactive · Stateful</span></div><div><b>DATA FLOW</b><span>Compact · Precise · Information-rich</span></div></div>
      </FlowDoc>

      <FlowDoc index="14" title="Flow Motion States" description="Motion answers what changed. State remains legible when motion is absent." dark>
        <div className="motion-state-grid"><div><span>100–180ms</span><b>Micro state</b><StateIndicator state="active" /></div><div><span>180–350ms</span><b>Component transition</b><StateIndicator state="processing" /></div><div><span>350–700ms</span><b>Transaction movement</b><FlowPulse /></div><div><span>700–1200ms</span><b>Rare narrative moment</b><FlowPulse state="predictive" /></div></div>
      </FlowDoc>

      <FlowDoc index="15" title="Flow Relationship Map" description="The construction logic for every future flowOne experience.">
        <div className="flow-relationship-map">{["FOUNDATION", "PRIMITIVES", "CORE COMPONENTS", "FLOW NODE", "CONNECTOR", "STAGE", "TRANSACTION", "AI", "DECISION", "OUTCOME"].map((item, i, all) => <div key={item}><b>{item}</b>{i < all.length - 1 && <Icon name="arrow" size={20} tone="muted" />}</div>)}</div>
        <AIInsight state="recommended">The flow system is ready to become the visual backbone of product and marketing experiences.</AIInsight>
      </FlowDoc>
    </div>
  </div>;
}

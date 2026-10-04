import {
  AIAction, AIInsight, Avatar, Badge, Button, Card, Cluster, Container, Divider, DrawerSpecimen,
  FlowConnector, FlowNode, FlowStage, Grid, Icon, InputField, Link, Metric, ModalSpecimen,
  ProductShell, SelectField, Stack, Status, Tabs, Text, Tooltip,
} from "./components/flowone";

function Doc({ name, purpose, variants, children, className = "" }: { name: string; purpose: string; variants: string; children: React.ReactNode; className?: string }) {
  return <article className={`component-doc ${className}`}><header><div><span>{name}</span><p>{purpose}</p></div><code>{variants}</code></header><div className="component-stage">{children}</div><footer><span>DO · Reuse structure and semantic state.</span><span>DON’T · Duplicate for content alone.</span></footer></article>;
}

function Chapter({ index, title, note }: { index: string; title: string; note: string }) {
  return <div className="component-chapter"><span>{index}</span><div role="heading" aria-level={2}>{title}</div><p>{note}</p></div>;
}

export default function StepTwo() {
  return <div id="component-system" className="step-two">
    <section className="component-intro">
      <div className="container-wide">
        <span>STEP 02 · COMPONENT GRAMMAR</span>
        <div role="heading" aria-level={2}>From calm foundations<br />to intelligent action.</div>
        <p>Reusable primitives and components for editorial storytelling, operational product UI and transaction flow.</p>
      </div>
    </section>

    <section className="component-section container-wide">
      <Chapter index="04" title="Primitives" note="Structural rules before visual components. Every primitive inherits Step 01 tokens." />
      <div className="doc-grid">
        <Doc name="FO / Primitive / Container" purpose="Consistent horizontal alignment." variants="Full · Wide · Standard · Narrow" className="doc-wide">
          <div className="container-demo"><Container variant="wide"><span>Wide / 1280</span></Container><Container variant="standard"><span>Standard / 1200</span></Container><Container variant="narrow"><span>Narrow / 760</span></Container></div>
        </Doc>
        <Doc name="FO / Primitive / Stack" purpose="Vertical rhythm without arbitrary gaps." variants="Gap 8–80 · Align · Width">
          <Stack gap={16}><i className="primitive-block" /><i className="primitive-block short" /><i className="primitive-block shorter" /></Stack>
        </Doc>
        <Doc name="FO / Primitive / Cluster" purpose="Wrapping horizontal groups." variants="Gap · Align · Wrap · Justify">
          <Cluster><Badge>Metadata</Badge><Badge tone="brand">Action</Badge><Status label="Approved" /></Cluster>
        </Doc>
        <Doc name="FO / Primitive / Grid" purpose="Responsive structural columns." variants="12 · 8 · 4 columns">
          <Grid columns={12}>{Array.from({ length: 12 }).map((_, i) => <i className="primitive-column" key={i} />)}</Grid>
        </Doc>
        <Doc name="FO / Primitive / Divider" purpose="Quiet visual separation." variants="H / V · Subtle / Default / Strong">
          <Stack gap={24}><Divider weight="subtle" /><Divider /><Divider weight="strong" /></Stack>
        </Doc>
        <Doc name="FO / Primitive / Text" purpose="Semantic hierarchy, never arbitrary sizing." variants="10 styles · 5 tones" className="doc-wide">
          <div className="text-primitive-demo"><Text style="h3">A connected business state.</Text><Text style="body-large" tone="secondary">Manrope remains editorial at scale and precise in operational contexts.</Text><Text style="caption" tone="tertiary">CAPTION · SEMANTIC TYPOGRAPHY</Text></div>
        </Doc>
        <Doc name="FO / Primitive / Icon" purpose="Functional geometric line icons." variants="14 · 16 · 20 · 24 · 32">
          <Cluster gap={24}>{([14, 16, 20, 24, 32] as const).map(size => <div className="icon-demo" key={size}><Icon size={size} tone="action" /><code>{size}</code></div>)}</Cluster>
        </Doc>
      </div>
    </section>

    <section className="component-section core-section">
      <div className="container-wide">
        <Chapter index="05" title="Core components" note="One interaction model, expressed through variants and semantic state." />
        <div className="doc-grid">
          <Doc name="FO / Button" purpose="Clear action hierarchy and accessible targets." variants="5 types · 3 sizes · 6 states" className="doc-wide">
            <div className="button-matrix">
              <Cluster><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="tertiary">Tertiary</Button><Button variant="destructive">Destructive</Button><Button variant="icon" ariaLabel="Continue"><Icon name="arrow" size={20} /></Button></Cluster>
              <Cluster><Button size="small">Small</Button><Button size="medium" iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>Medium</Button><Button size="large">Large</Button><Button state="focus">Focus</Button><Button state="loading">Loading</Button><Button state="disabled">Disabled</Button></Cluster>
            </div>
          </Doc>
          <Doc name="FO / Link" purpose="Inline and directional navigation." variants="Inline · Navigation · Arrow · External">
            <Stack gap={16}><Link>Inline link</Link><Link variant="navigation">Navigation link</Link><Link variant="arrow">View transaction</Link><Link variant="external">External resource</Link></Stack>
          </Doc>
          <Doc name="FO / Badge" purpose="Quiet classification, never primary action." variants="6 tones · 2 sizes">
            <Cluster gap={8}><Badge>Neutral</Badge><Badge tone="brand">Brand</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Danger</Badge><Badge tone="info">Info</Badge></Cluster>
          </Doc>
          <Doc name="FO / Status" purpose="Compact business state with non-color cues." variants="9 states · Dot / Icon / Label" className="doc-wide">
            <Cluster gap={24}>{(["Draft", "Processing", "Pending", "Approved", "Completed", "Paid", "Attention", "Overdue", "Failed"] as const).map(label => <Status label={label} key={label} />)}</Cluster>
          </Doc>
          <Doc name="FO / Card" purpose="Content boundary, not a default layout language." variants="4 types · 5 states" className="doc-wide">
            <div className="card-matrix"><Card title="Standard surface">Quiet structural boundary.</Card><Card variant="interactive" title="Interactive record">Focus and direction are explicit.</Card><Card variant="highlight" state="selected" title="Selected context">Blue clarifies current state.</Card><Card variant="dark" title="Controlled emphasis">Reserved for high-impact moments.</Card></div>
          </Doc>
          <Doc name="FO / Input / Text" purpose="Labeled, legible data entry." variants="5 types · 7 states" className="doc-wide">
            <div className="field-matrix"><InputField /><InputField variant="search" state="focus" label="Search" /><InputField state="filled" /><InputField state="error" /><InputField state="success" /></div>
          </Doc>
          <Doc name="FO / Select / Default" purpose="Closed selection control." variants="7 states">
            <Stack gap={24}><SelectField /><SelectField state="selected" /></Stack>
          </Doc>
          <Doc name="FO / Tabs" purpose="Current location and available alternatives." variants="Underline · Segmented · 5 states">
            <Stack gap={32}><Tabs /><Tabs variant="segmented" active={1} /></Stack>
          </Doc>
          <Doc name="FO / Tooltip" purpose="Short secondary clarification." variants="Top · Bottom · Left · Right">
            <div className="tooltip-demo"><Tooltip direction="top">Payment probability</Tooltip><Tooltip direction="bottom">Updated 4m ago</Tooltip></div>
          </Doc>
          <Doc name="FO / Avatar" purpose="Professional identity and presence." variants="Person · Initials · Group · 4 sizes">
            <Cluster gap={16}><Avatar size={24} /><Avatar size={32} initials="RM" /><Avatar size={40} initials="SK" /><Avatar size={48} initials="NV" /></Cluster>
          </Doc>
          <Doc name="FO / Overlay / Modal" purpose="Focused confirmation without full workflow." variants="Small · Medium · Large" className="doc-wide">
            <ModalSpecimen />
          </Doc>
          <Doc name="FO / Overlay / Drawer" purpose="Inspect detail while preserving context." variants="Right · Left · Bottom" className="doc-wide">
            <DrawerSpecimen />
          </Doc>
        </div>
      </div>
    </section>

    <section className="component-section flow-section">
      <div className="container-wide">
        <Chapter index="06" title="flowOne components" note="Distinctiveness comes from business state, transaction movement, consequence and action." />
        <div className="doc-grid">
          <Doc name="FO / Flow / Node" purpose="What happened, where it is and its state." variants="Idle · Active · Processing · Complete · Warning · Error" className="doc-wide">
            <div className="node-matrix"><FlowNode label="Order" meta="SO-2048 received" /><FlowNode label="Invoice" meta="Awaiting approval" state="active" /><FlowNode label="GST" meta="Validation in progress" state="processing" /><FlowNode label="Collection" meta="Payment received" state="complete" /><FlowNode label="Receivable" meta="Due in 2 days" state="warning" /><FlowNode label="Bank" meta="Sync failed" state="error" /></div>
          </Doc>
          <Doc name="FO / Flow / Connector" purpose="Precise directional transaction relationship." variants="H · V · Active · Inactive · Pulse">
            <Stack gap={32}><FlowConnector /><FlowConnector active /><FlowConnector active pulse /></Stack>
          </Doc>
          <Doc name="FO / Flow / Stage" purpose="Reusable transaction narrative step." variants="Upcoming · Active · Completed · Attention" className="doc-wide">
            <div className="stage-sequence"><FlowStage label="Order" meta="Confirmed" state="completed" /><FlowConnector active /><FlowStage label="Invoice" meta="Ready to issue" state="active" /><FlowConnector pulse /><FlowStage label="Collection" meta="Expected in 14d" state="upcoming" /></div>
          </Doc>
          <Doc name="FO / Data / Metric" purpose="Meaningful value independent of a card." variants="Standard · Positive · Negative · Neutral · Attention" className="doc-wide">
            <div className="metric-matrix"><Metric label="Receivables" value="₹5,90,000" trend="+12.4%" tone="positive" comparison=" vs last month" /><Metric label="DSO" value="42 days" trend="-3 days" tone="positive" comparison=" improvement" /><Metric label="Payment probability" value="92%" tone="neutral" /><Metric label="Overdue exposure" value="₹84,200" trend="+8.2%" tone="attention" comparison=" this week" /></div>
          </Doc>
          <Doc name="FO / Product / App Shell" purpose="Responsive product framework—not a dashboard." variants="Desktop · Tablet · Mobile" className="doc-full">
            <ProductShell />
          </Doc>
          <Doc name="FO / AI / Insight" purpose="Intelligence attached to business context." variants="Informational · Predictive · Warning · Recommended" className="doc-wide">
            <Stack gap={16}><AIInsight>Payment probability is 92%.</AIInsight><AIInsight state="warning">Inventory may fall below reorder point in 4 days.</AIInsight></Stack>
          </Doc>
          <Doc name="FO / AI / Action" purpose="Intelligence becomes an executable next step." variants="Suggested · Ready · Executing · Completed · Dismissed" className="doc-wide">
            <AIAction />
          </Doc>
        </div>
      </div>
    </section>

    <section className="relationship-section">
      <div className="container-wide">
        <span>COMPONENT RELATIONSHIP MAP</span>
        <div className="relationship-map">
          {["FOUNDATION", "PRIMITIVES", "CORE COMPONENTS", "FLOW COMPONENTS", "PRODUCT UI", "AI COMPONENTS", "PATTERNS", "PAGES"].map((item, i) => <div key={item} className={i > 5 ? "is-future" : ""}><strong>{item}</strong>{i < 7 && <Icon name="arrow" size={20} tone="muted" />}</div>)}
        </div>
        <p>Patterns and pages are intentionally deferred to later stages.</p>
      </div>
    </section>
  </div>;
}

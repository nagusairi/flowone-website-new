import { useEffect, useRef, useState } from "react";
import { AIAction, Button, FlowConnector, FlowNode, Icon, Tabs } from "./flowone";
import { FlowPulse, StateIndicator } from "./flow-system";
import { MobileAccordion, WebsiteHeader } from "./navigation-system";

function Replay({ onClick, label = "Replay interaction" }: { onClick: () => void; label?: string }) {
  return <Button variant="secondary" size="small" onClick={onClick as never} iconBefore={<span aria-hidden="true">↻</span>}>{label}</Button>;
}

export function HeroFlowMotion() {
  const [run, setRun] = useState(1);
  return <div className="motion-prototype motion-hero-flow" key={run}><div className="motion-prototype-bar"><span>FO-MOTION-HERO-01 · ONE SHOT</span><Replay onClick={() => setRun(v => v + 1)} /></div><div className="hero-motion-copy"><span>01 · HEADER STABLE</span><strong>Business moves as one.</strong><p>Hierarchy enters first. The flow explains the promise second.</p><Button size="small">Explore flowOne</Button></div><div className="hero-motion-track">{["BUSINESS","TRANSACTION","FINANCE","CASH","DECISION"].map((item,i,all)=><div className={`hero-motion-step step-${i}`} key={item}><FlowNode label={item} state={i === all.length-1 ? "recommended" : "complete"} />{i<all.length-1&&<FlowConnector state="active" pulse />}</div>)}</div></div>;
}

export function PulseStateDemo() {
  const [state, setState] = useState<"inactive" | "active" | "processing" | "completed" | "predictive" | "attention">("active");
  const [run, setRun] = useState(1);
  return <div className="motion-pulse-demo"><div className="motion-controls">{(["inactive","active","processing","completed","predictive","attention"] as const).map(item=><button className={item===state?"is-active":""} onClick={()=>{setState(item);setRun(v=>v+1)}} key={item}>{item}</button>)}</div><div className={`pulse-state-track is-${state}`} key={run}><FlowNode label="ORDER" value="₹5,00,000" state={state==="completed"?"complete":"active"} /><div>{state!=="inactive"&&state!=="completed"&&<FlowPulse state={state==="predictive"?"predictive":state==="attention"?"attention":"active"} />}<FlowConnector state={state==="attention"?"attention":state==="predictive"?"predictive":state==="completed"?"completed":state==="inactive"?"inactive":"active"} /></div><FlowNode label="INVOICE" value="₹5,90,000" state={state==="completed"?"complete":state==="predictive"?"predictive":"idle"} /></div></div>;
}

export function NodeTransitionMotion() {
  const states = ["idle","active","processing","complete"] as const;
  const [step,setStep]=useState(0);
  return <div className="node-transition-demo"><div><span>CANONICAL SEQUENCE</span><b>{String(step+1).padStart(2,"0")} / 04</b></div><div className="node-transition-track"><FlowNode label="PREVIOUS" value="Order" state={step===0?"active":"complete"} /><FlowConnector state={step<2?"active":"completed"} pulse={step===1} /><FlowNode label="NEXT NODE" value="Invoice" state={states[step]} /></div><div className="motion-controls">{states.map((state,i)=><button className={i===step?"is-active":""} onClick={()=>setStep(i)} key={state}>{state}</button>)}</div></div>;
}

export function TransactionMotion() {
  const stages = ["ORDER","INVENTORY","INVOICE","GST","RECEIVABLE","COLLECTION","BANK","CASH"];
  const [stage,setStage]=useState(0);
  return <div className="motion-transaction"><header><div><span>TXN-10482</span><strong>₹5,00,000</strong><p>Ananya Enterprises</p></div><div><small>CURRENT STATE</small><b>{stages[stage]}</b></div></header><div className="transaction-motion-id"><i />Persistent identity · value and context remain continuous</div><div className="transaction-motion-track">{stages.map((item,i,all)=><div className={i===stage?"is-current":i<stage?"is-past":""} key={item}><FlowNode label={item} state={i<stage?"complete":i===stage?"active":"idle"} />{i<all.length-1&&<FlowConnector state={i<stage?"completed":i===stage?"active":"inactive"} pulse={i===stage} />}</div>)}</div><footer><Button variant="secondary" size="small" state={stage===0?"disabled":"default"} onClick={()=>setStage(v=>Math.max(0,v-1)) as never}>Previous</Button><span>{String(stage+1).padStart(2,"0")} / {String(stages.length).padStart(2,"0")}</span><Button size="small" state={stage===stages.length-1?"disabled":"default"} onClick={()=>setStage(v=>Math.min(stages.length-1,v+1)) as never}>Next state</Button></footer></div>;
}

export function LivingTransactionMotion() {
  const stages = ["Order","Inventory","Invoice","GST","Receivable","AI","Collection","Bank","Cash","Decision"];
  const [stage,setStage]=useState(0);
  return <div className="living-motion-demo"><aside><span>{String(stage+1).padStart(2,"0")} / {String(stages.length).padStart(2,"0")}</span><strong>{stages[stage]}</strong><p>{stage<5?"The transaction becomes operational and financial context.":stage===5?"Intelligence enters the existing transaction.":"Action moves toward an accountable outcome."}</p><div className="living-progress">{stages.map((_,i)=><button aria-label={`View ${stages[i]}`} className={i===stage?"is-active":i<stage?"is-complete":""} onClick={()=>setStage(i)} key={i} />)}</div></aside><div className="living-product"><span>PRODUCT UI · STATE UPDATE</span><div><FlowNode label={stages[stage].toUpperCase()} value={stage===0?"₹5,00,000":stage===5?"92% probability":"₹5,90,000"} state={stage===5?"predictive":stage===9?"recommended":"active"} /><StateIndicator state={stage===5?"predictive":stage===9?"recommended":"active"} /></div><p>Transaction ID · TXN-10482</p></div></div>;
}

export function FragmentationMotion() {
  const states = ["connected","disconnected","fragmented","reconnected"] as const;
  const [state,setState]=useState<typeof states[number]>("connected");
  return <div className={`fragment-motion is-${state}`}><div className="motion-controls">{states.map(item=><button className={item===state?"is-active":""} onClick={()=>setState(item)} key={item}>{item}</button>)}</div><div className="fragment-stage"><div><span>TXN-10482</span><strong>ORDER</strong><small>₹5,00,000</small></div><i /><div><span>TXN-10482</span><strong>INVOICE</strong><small>₹5,90,000</small></div><i /><div><span>TXN-10482</span><strong>CASH</strong><small>Expected</small></div></div><footer><StateIndicator state={state==="reconnected"?"complete":state==="fragmented"?"attention":"active"} /><span>{state==="fragmented"?"Context separated · identity remains visible":state==="reconnected"?"Identity, context and outcome restored":"One transaction · connected context"}</span></footer></div>;
}

export function AIMotion() {
  const steps = ["understand","evidence","recommend","action"] as const;
  const [step,setStep]=useState(0);
  return <div className="ai-motion-demo"><header><FlowNode label="RECEIVABLE" value="₹5,90,000" meta="Ananya Enterprises" state={step>0?"predictive":"active"} /><div><span>AI ENTERS THE BUSINESS OBJECT</span><strong>{steps[step]}</strong></div></header><div className="ai-motion-layers"><div className={step>=0?"is-visible":""}><span>UNDERSTOOD</span><b>Invoice · Day 34 · Ananya Enterprises</b></div><div className={step>=1?"is-visible":""}><span>EVIDENCE</span><b>Customer usually pays within 38 days</b></div><div className={step>=2?"is-visible":""}><span>RECOMMENDATION</span><b>Prioritize collection today</b></div><div className={step>=3?"is-visible":""}><span>ACTION</span><Button size="small">Send reminder</Button></div></div><footer><Button variant="secondary" size="small" onClick={()=>setStep(v=>Math.max(0,v-1)) as never}>Back</Button><span>{step+1} / 4</span><Button size="small" onClick={()=>setStep(v=>Math.min(3,v+1)) as never}>Continue</Button></footer></div>;
}

export function PredictionMotion() {
  const [revealed,setRevealed]=useState(false);
  return <div className={`prediction-motion ${revealed?"is-revealed":""}`}><div className="motion-prototype-bar"><span>FO-MOTION-FCAST-01</span><Replay label="Reveal forecast" onClick={()=>{setRevealed(false);requestAnimationFrame(()=>setRevealed(true))}} /></div><svg viewBox="0 0 700 220" preserveAspectRatio="none" aria-label="Historical cash flow extending into forecast"><path className="prediction-history" d="M0 170 C90 155 130 90 210 122 S310 132 350 100" /><path className="prediction-range" d="M350 100 C440 55 520 70 700 35 L700 155 C520 135 450 150 350 100Z" /><path className="prediction-future" pathLength="1" d="M350 100 C440 78 520 115 700 62" /><line x1="350" x2="350" y1="10" y2="210" /></svg><div className="prediction-labels"><span>HISTORICAL</span><b>CURRENT</b><span>FORECAST · 92% CONFIDENCE</span></div></div>;
}

export function ProductInteractionMotion() {
  const [tab,setTab]=useState(0);
  const [selected,setSelected]=useState(false);
  const [action,setAction]=useState<"suggested"|"executing"|"completed">("suggested");
  useEffect(()=>{if(action!=="executing")return;const t=setTimeout(()=>setAction("completed"),700);return()=>clearTimeout(t)},[action]);
  return <div className="product-motion-demo"><Tabs active={tab} /><div className="product-motion-tabs">{["Overview","Activity","Documents"].map((item,i)=><button className={i===tab?"is-active":""} onClick={()=>setTab(i)} key={item}>{item}</button>)}</div><button className={`motion-table-row ${selected?"is-selected":""}`} onClick={()=>setSelected(v=>!v)}><span>INV-10482</span><strong>Ananya Enterprises</strong><b>₹5,90,000</b><StateIndicator state={selected?"active":"attention"} /></button><AIAction state={action} /><Button size="small" state={action==="executing"?"loading":"default"} onClick={()=>setAction("executing") as never}>{action==="completed"?"Completed":"Accept AI action"}</Button></div>;
}

export function NavigationMotion() {
  return <div className="navigation-motion-demo"><WebsiteHeader /><div className="mobile-motion-preview"><WebsiteHeader forceMobile /><MobileAccordion menu="Platform" expanded onToggle={()=>{}} /></div></div>;
}

export function OverlayMotion() {
  const [drawer,setDrawer]=useState(false);
  const [modal,setModal]=useState(false);
  return <div className="overlay-motion-demo"><div className="overlay-actions"><Button onClick={()=>setDrawer(true) as never}>Open drawer</Button><Button variant="secondary" onClick={()=>setModal(true) as never}>Open modal</Button></div><div className={`motion-drawer ${drawer?"is-open":""}`} inert={!drawer}><header><strong>Invoice detail</strong><button onClick={()=>setDrawer(false)} aria-label="Close drawer"><Icon name="close" size={20} /></button></header><p>Context remains visible while detail enters from the right.</p></div><div className={`motion-modal-layer ${modal?"is-open":""}`} inert={!modal} onClick={()=>setModal(false)}><div role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><strong>Confirm action</strong><p>Move this invoice to collection?</p><footer><Button variant="secondary" size="small" onClick={()=>setModal(false) as never}>Cancel</Button><Button size="small" onClick={()=>setModal(false) as never}>Confirm</Button></footer></div></div></div>;
}

export function RevealMotion() {
  const [run,setRun]=useState(1);
  return <div className="reveal-motion-demo" key={run}><div className="motion-prototype-bar"><span>GROUPED REVEAL · 350–700ms</span><Replay onClick={()=>setRun(v=>v+1)} /></div><div><span>FLOWONE SYSTEM</span><strong>Enter with purpose.</strong><p>Heading, explanation and supporting visual move as one related group—not as a theatrical cascade.</p></div><i /></div>;
}

export function ChartMotion() {
  const [run,setRun]=useState(1);
  return <div className="chart-motion-demo" key={run}><div className="motion-prototype-bar"><span>HISTORICAL → CURRENT → FORECAST</span><Replay onClick={()=>setRun(v=>v+1)} /></div><svg viewBox="0 0 700 180" preserveAspectRatio="none"><path className="chart-motion-history" pathLength="1" d="M0 145 C100 130 125 72 220 100 S320 115 380 75" /><path className="chart-motion-forecast" pathLength="1" d="M380 75 C475 52 550 95 700 30" /></svg></div>;
}

export function NumberMotion() {
  const [value,setValue]=useState(590000);
  return <div className="number-motion-demo"><span>INTRODUCED VALUE · ONE CONTROLLED CHANGE</span><strong>₹{value.toLocaleString("en-IN")}</strong><p>Numbers remain stable after introduction. They do not replay on every viewport entry.</p><div><Button variant="secondary" size="small" onClick={()=>setValue(0) as never}>Reset</Button><Button size="small" onClick={()=>setValue(590000) as never}>Update value</Button></div></div>;
}

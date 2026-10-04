import type { ReactNode } from "react";
import { AIInsight, Button, FlowConnector, FlowNode, Icon, type FlowState } from "./flowone";

export const canonicalStates = ["idle", "active", "processing", "complete", "attention", "error", "predictive", "recommended"] as const;

export function FlowPulse({ state = "active", label = "Transaction moving" }: { state?: "active" | "predictive" | "attention"; label?: string }) {
  return <div className={`fo-canonical-pulse is-${state}`} aria-label={label}><span /><i /></div>;
}

export function StateIndicator({ state, compact = false }: { state: typeof canonicalStates[number]; compact?: boolean }) {
  return <span className={`fo-state-indicator is-${state} ${compact ? "is-compact" : ""}`}><i />{!compact && <span>{state}</span>}</span>;
}

export function NumberedStage({ number, label, value, supporting, state, last = false }: { number: string; label: string; value?: string; supporting: string; state: "upcoming" | "active" | "completed" | "attention"; last?: boolean }) {
  const nodeState: FlowState = state === "completed" ? "complete" : state === "attention" ? "attention" : state === "active" ? "active" : "idle";
  return <div className="fo-numbered-stage">
    <span>{number}</span>
    <FlowNode label={label} value={value} meta={supporting} state={nodeState} interactive />
    {!last && <FlowConnector state={state === "completed" ? "completed" : state === "attention" ? "attention" : state === "active" ? "active" : "inactive"} pulse={state === "active"} />}
  </div>;
}

export function FlowGroup({ title, description, outcome, children }: { title: string; description?: string; outcome: string; children: ReactNode }) {
  return <article className="fo-flow-group">
    <header><div><span>FLOW GROUP</span><strong>{title}</strong></div>{description && <p>{description}</p>}</header>
    <div className="fo-flow-group-track">{children}</div>
    <Outcome label={outcome} compact />
  </article>;
}

export type TransactionIdentity = { id: string; amount: string; entity: string };
export function Transaction({ identity, currentStage, aiSignal, children }: { identity: TransactionIdentity; currentStage: string; aiSignal?: string; children: ReactNode }) {
  return <article className="fo-transaction">
    <header>
      <div><span>{identity.id}</span><strong>{identity.amount}</strong><p>{identity.entity}</p></div>
      <div><small>CURRENT STAGE</small><b>{currentStage}</b></div>
    </header>
    <div className="fo-transaction-continuity"><i /><span>ONE BUSINESS OBJECT · CONTINUOUS IDENTITY</span></div>
    <div className="fo-transaction-track">{children}</div>
    {aiSignal && <AIInsight>{aiSignal}</AIInsight>}
  </article>;
}

export function TransactionRow({ id, entity, amount, stage, status, signal, action }: { id: string; entity: string; amount: string; stage: string; status: string; signal: string; action: string }) {
  return <div className="fo-transaction-row">
    <div><span>{id}</span><strong>{entity}</strong></div>
    <b>{amount}</b>
    <div><small>CURRENT STATE</small><span>{stage}</span></div>
    <StateIndicator state={status === "Due in 4 days" ? "attention" : "active"} compact />
    <span>{status}</span>
    <div className="fo-row-signal"><Icon name="spark" size={14} /><b>{signal}</b></div>
    <Button variant="tertiary" size="small" iconAfter={<Icon name="arrow" size={14} tone="action" />}>{action}</Button>
  </div>;
}

export function Milestone({ label, detail, complete = true }: { label: string; detail: string; complete?: boolean }) {
  return <div className={`fo-milestone ${complete ? "is-complete" : ""}`}><i>{complete && <Icon name="check" size={14} />}</i><div><strong>{label}</strong><span>{detail}</span></div></div>;
}

export function Decision({ signal, insight, action, state = "recommended" }: { signal: string; insight: string; action: string; state?: "recommended" | "attention" | "complete" }) {
  return <article className={`fo-decision is-${state}`}>
    <div><span>SIGNAL</span><strong>{signal}</strong></div><Icon name="arrow" size={20} tone="muted" />
    <div><span>CONSEQUENCE</span><strong>{insight}</strong></div><Icon name="arrow" size={20} tone="muted" />
    <div className="fo-decision-action"><span>DECISION</span><strong>{action}</strong><Button size="small">Execute</Button></div>
  </article>;
}

export function Outcome({ label, value, compact = false }: { label: string; value?: string; compact?: boolean }) {
  return <div className={`fo-outcome ${compact ? "is-compact" : ""}`}><i><Icon name="check" size={16} /></i><div><span>OUTCOME</span><strong>{label}</strong>{value && <b>{value}</b>}</div></div>;
}

export type AIStepName = "Understand" | "Match" | "Validate" | "Predict" | "Decide" | "Act";
const aiDescriptions: Record<AIStepName, string> = {
  Understand: "Extract supplier, amount and GST",
  Match: "Connect PO and receipt",
  Validate: "Check policy and tax",
  Predict: "Identify anomaly or delay",
  Decide: "Recommend next action",
  Act: "Route and execute",
};

export function AIFlowStep({ step, state = "idle", last = false }: { step: AIStepName; state?: "idle" | "active" | "complete"; last?: boolean }) {
  return <div className={`fo-ai-flow-step is-${state}`}>
    <div><Icon name={state === "complete" ? "check" : "spark"} size={16} /><span>AI / {step}</span><small>{aiDescriptions[step]}</small></div>
    {!last && <FlowConnector state={state === "complete" ? "completed" : state === "active" ? "predictive" : "inactive"} pulse={state === "active"} />}
  </div>;
}

export function CompactFlow({ title, items, activeIndex = -1 }: { title: string; items: string[]; activeIndex?: number }) {
  return <article className="fo-compact-flow"><header><span>BUSINESS FLOW</span><strong>{title}</strong></header><div>{items.map((item, index) => <div className="fo-compact-step" key={item}><FlowNode label={item} state={index < activeIndex ? "complete" : index === activeIndex ? "active" : "idle"} /><>{index < items.length - 1 && <FlowConnector state={index < activeIndex ? "completed" : index === activeIndex ? "active" : "inactive"} />}</></div>)}</div></article>;
}

import { useId, type ReactNode } from "react";

export type Size = "small" | "medium" | "large";
export type InteractionState = "default" | "hover" | "focus" | "pressed" | "disabled" | "loading";

export function Icon({ name = "arrow", size = 20, tone = "default" }: { name?: "arrow" | "spark" | "check" | "alert" | "search" | "close" | "chevron"; size?: 14 | 16 | 20 | 24 | 32; tone?: "default" | "muted" | "inverse" | "action" | "danger" | "success" | "warning" }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    spark: <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    alert: <><path d="M12 8v5" /><path d="M12 17h.01" /><path d="M10.2 4.5 3.5 18h17L13.8 4.5a2 2 0 0 0-3.6 0Z" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m8 10 4 4 4-4" />,
  };
  return <svg className={`fo-icon fo-icon-${size} fo-icon-${tone}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>;
}

export function Container({ variant = "standard", children }: { variant?: "full" | "wide" | "standard" | "narrow"; children: ReactNode }) {
  return <div className={`fo-container fo-container-${variant}`}>{children}</div>;
}

export function Stack({ gap = 24, children }: { gap?: 8 | 16 | 24 | 32 | 40 | 48 | 64 | 80; children: ReactNode }) {
  return <div className={`fo-stack fo-gap-${gap}`}>{children}</div>;
}

export function Cluster({ gap = 16, justify = "start", wrap = true, children }: { gap?: 8 | 16 | 24 | 32; justify?: "start" | "between" | "end"; wrap?: boolean; children: ReactNode }) {
  return <div className={`fo-cluster fo-gap-${gap} fo-justify-${justify} ${wrap ? "fo-wrap" : ""}`}>{children}</div>;
}

export function Grid({ columns = 12, children }: { columns?: 4 | 8 | 12; children: ReactNode }) {
  return <div className={`fo-grid fo-grid-${columns}`}>{children}</div>;
}

export function Divider({ orientation = "horizontal", weight = "default" }: { orientation?: "horizontal" | "vertical"; weight?: "subtle" | "default" | "strong" }) {
  return <div className={`fo-divider fo-divider-${orientation} fo-divider-${weight}`} aria-hidden="true" />;
}

export function Text({ style = "body", tone = "primary", children }: { style?: "display-xl" | "display-large" | "h1" | "h2" | "h3" | "body-large" | "body" | "small" | "caption" | "nav"; tone?: "primary" | "secondary" | "tertiary" | "inverse" | "disabled"; children: ReactNode }) {
  return <div className={`fo-text fo-text-${style} fo-text-${tone}`}>{children}</div>;
}

export function Button({ variant = "primary", size = "medium", state = "default", iconBefore, iconAfter, children, ariaLabel, onClick }: { variant?: "primary" | "secondary" | "tertiary" | "destructive" | "icon"; size?: Size; state?: InteractionState; iconBefore?: ReactNode; iconAfter?: ReactNode; children?: ReactNode; ariaLabel?: string; onClick?: () => void }) {
  const disabled = state === "disabled" || state === "loading";
  return (
    <button className={`fo-button fo-button-${variant} fo-button-${size} is-${state}`} disabled={disabled} aria-label={ariaLabel} aria-busy={state === "loading"} onClick={onClick}>
      {state === "loading" ? <span className="fo-spinner" aria-hidden="true" /> : iconBefore}
      {children && <span>{children}</span>}
      {state !== "loading" && iconAfter}
    </button>
  );
}

export function Link({ variant = "inline", children }: { variant?: "inline" | "navigation" | "arrow" | "external"; children: ReactNode }) {
  return <a className={`fo-link fo-link-${variant}`} href="#component-system">{children}{variant === "arrow" && <Icon name="arrow" size={16} tone="action" />}{variant === "external" && <span aria-hidden="true">↗</span>}</a>;
}

export function Badge({ tone = "neutral", size = "small", children }: { tone?: "neutral" | "brand" | "success" | "warning" | "danger" | "info"; size?: "small" | "medium"; children: ReactNode }) {
  return <span className={`fo-badge fo-badge-${tone} fo-badge-${size}`}>{children}</span>;
}

const statusTone: Record<string, string> = {
  Draft: "neutral", Processing: "info", Pending: "warning", Approved: "success", Completed: "ink",
  Paid: "success", Attention: "attention", Overdue: "attention", Failed: "danger",
};

export function Status({ label, indicator = "dot" }: { label: keyof typeof statusTone; indicator?: "dot" | "icon" | "label" }) {
  const tone = statusTone[label];
  return <span className={`fo-status fo-status-${tone}`}>{indicator === "dot" && <i />}{indicator === "icon" && <Icon name={tone === "success" ? "check" : "alert"} size={14} />}<span>{label}</span></span>;
}

export function Card({ variant = "standard", state = "default", title, children }: { variant?: "standard" | "interactive" | "highlight" | "dark"; state?: "default" | "hover" | "focus" | "selected" | "disabled"; title: string; children: ReactNode }) {
  return <article className={`fo-card fo-card-${variant} is-${state}`} tabIndex={variant === "interactive" ? 0 : undefined}><span className="fo-card-kicker">{variant}</span><strong>{title}</strong><div>{children}</div>{variant === "interactive" && <Icon name="arrow" size={20} />}</article>;
}

export function InputField({ variant = "default", state = "empty", label = "Invoice reference", helper = "Use the reference shown on the invoice." }: { variant?: "default" | "icon" | "prefix" | "suffix" | "search"; state?: "empty" | "focus" | "filled" | "error" | "success" | "disabled" | "read-only"; label?: string; helper?: string }) {
  const descriptionId = useId();
  const value = state === "filled" || state === "success" ? "INV-2048" : "";
  const error = state === "error";
  return <label className={`fo-field is-${state}`}><span>{label}</span><div className="fo-input-shell">{(variant === "icon" || variant === "search") && <Icon name="search" size={16} tone="muted" />}{variant === "prefix" && <b>INV–</b>}<input placeholder={variant === "search" ? "Search records" : "Enter reference"} defaultValue={value} disabled={state === "disabled"} readOnly={state === "read-only"} aria-invalid={error} aria-describedby={descriptionId} />{variant === "suffix" && <b>INR</b>}{state === "success" && <Icon name="check" size={16} tone="success" />}</div><small id={descriptionId} aria-live={error ? "polite" : undefined}>{error ? "A valid invoice reference is required." : helper}</small></label>;
}

export function SelectField({ state = "default" }: { state?: "default" | "hover" | "focus" | "open" | "selected" | "error" | "disabled" }) {
  const descriptionId = useId();
  return <label className={`fo-field fo-select is-${state}`}><span>Payment terms</span><div className="fo-input-shell"><select defaultValue={state === "selected" ? "30" : ""} disabled={state === "disabled"} aria-invalid={state === "error"} aria-describedby={descriptionId}><option value="" disabled>Select terms</option><option value="30">Net 30 days</option></select><Icon name="chevron" size={16} tone="muted" /></div><small id={descriptionId}>{state === "error" ? "Select payment terms." : "Applied to future invoices."}</small></label>;
}

export function Tabs({ variant = "underline", active = 0 }: { variant?: "underline" | "segmented"; active?: number }) {
  return <div className={`fo-tabs fo-tabs-${variant}`} role="tablist" aria-label="Record views">{["Overview", "Activity", "Documents"].map((tab, index) => <button key={tab} role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""}>{tab}</button>)}</div>;
}

export function Tooltip({ direction = "top", children }: { direction?: "top" | "bottom" | "left" | "right"; children: ReactNode }) {
  return <span className={`fo-tooltip fo-tooltip-${direction}`} role="tooltip">{children}</span>;
}

export function Avatar({ size = 40, initials = "AK", status = true }: { size?: 24 | 32 | 40 | 48; initials?: string; status?: boolean }) {
  return <span className={`fo-avatar fo-avatar-${size}`} aria-label={`User ${initials}`}>{initials}{status && <i aria-label="Online" />}</span>;
}

export function ModalSpecimen() {
  return <div className="fo-overlay-specimen"><div className="fo-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="fo-overlay-head"><div><strong id="modal-title">Confirm approval</strong><p>Review this action before continuing.</p></div><Button variant="icon" size="small" ariaLabel="Close"><Icon name="close" size={16} /></Button></div><div className="fo-overlay-content">The invoice will move to the approved state and notify the owner.</div><div className="fo-overlay-actions"><Button variant="secondary" size="small">Cancel</Button><Button size="small">Approve</Button></div></div></div>;
}

export function DrawerSpecimen() {
  return <div className="fo-drawer-specimen"><div className="fo-drawer"><div className="fo-overlay-head"><div><span>RECORD DETAIL</span><strong>INV-2048</strong></div><Button variant="icon" size="small" ariaLabel="Close"><Icon name="close" size={16} /></Button></div><Divider /><div className="fo-overlay-content">Context remains visible while a record is inspected.</div></div></div>;
}

export type FlowState = "idle" | "active" | "processing" | "complete" | "attention" | "warning" | "error" | "predictive" | "recommended";
export function FlowNode({ label, meta, value, status, state = "idle", interactive = false, onActivate, onFocus, onPointerEnter }: { label: string; meta?: string; value?: string; status?: string; state?: FlowState; interactive?: boolean; onActivate?: () => void; onFocus?: () => void; onPointerEnter?: () => void }) {
  const content = <>
    <i>{state === "complete" ? <Icon name="check" size={14} /> : state === "predictive" ? <Icon name="spark" size={14} /> : <span />}</i>
    <div><strong>{label}</strong>{value && <b>{value}</b>}{meta && <small>{meta}</small>}</div>
    <span>{status || (state === "warning" ? "attention" : state)}</span>
  </>;
  return interactive
    ? <button type="button" className={`fo-flow-node is-${state} is-interactive`} aria-label={`${label}${value ? `, ${value}` : ""}, ${status || state}`} onClick={onActivate} onFocus={onFocus} onPointerEnter={onPointerEnter}>{content}</button>
    : <div className={`fo-flow-node is-${state}`}>{content}</div>;
}

export function FlowConnector({ active = false, pulse = false, vertical = false, diagonal = false, state }: { active?: boolean; pulse?: boolean; vertical?: boolean; diagonal?: boolean; state?: "inactive" | "active" | "completed" | "attention" | "predictive" }) {
  const resolvedState = state || (active ? "active" : "inactive");
  return <div className={`fo-flow-connector is-${resolvedState} ${pulse ? "has-pulse" : ""} ${vertical ? "is-vertical" : ""} ${diagonal ? "is-diagonal" : ""}`} aria-label={`${resolvedState} directional relationship`}><i /></div>;
}

export function FlowStage({ label, meta, state }: { label: string; meta: string; state: "upcoming" | "active" | "completed" | "attention" }) {
  const nodeState: FlowState = state === "completed" ? "complete" : state === "attention" ? "attention" : state === "active" ? "active" : "idle";
  return <div className="fo-flow-stage"><FlowNode label={label} meta={meta} state={nodeState} /><small>{state}</small></div>;
}

export function Metric({ label, value, trend, tone = "neutral", comparison }: { label: string; value: string; trend?: string; tone?: "positive" | "negative" | "neutral" | "attention"; comparison?: string }) {
  return <div className={`fo-metric fo-metric-${tone}`}><span>{label}</span><strong>{value}</strong>{trend && <small><b>{trend}</b>{comparison}</small>}</div>;
}

export function AIInsight({ state = "predictive", children }: { state?: "informational" | "predictive" | "warning" | "recommended"; children: ReactNode }) {
  return <article className={`fo-ai-insight is-${state}`}><div className="fo-ai-mark"><Icon name={state === "warning" ? "alert" : "spark"} size={16} /></div><div><span>FLOWONE INTELLIGENCE · {state}</span><strong>{children}</strong><p>Based on transaction history and current business state.</p></div></article>;
}

export function AIAction({ state = "suggested" }: { state?: "suggested" | "ready" | "executing" | "completed" | "dismissed" }) {
  return <article className={`fo-ai-action is-${state}`} aria-live="polite"><div><span>RECOMMENDED ACTION · {state}</span><strong>Prioritize collection for this invoice</strong><p>Payment probability is expected to decline after the due window.</p></div><div className="fo-ai-actions"><Button variant="tertiary" size="small">Dismiss</Button><Button size="small" state={state === "executing" ? "loading" : "default"}>{state === "completed" ? "Completed" : "Review Collection"}</Button></div></article>;
}

export function ProductShell() {
  return <div className="fo-product-shell"><div className="fo-product-top"><img src="/assets/flowone-logo.svg" alt="flowOne" /><div><Icon name="search" size={16} tone="muted" /><Avatar size={32} /></div></div><aside><i className="is-current" /><i /><i /><i /><i /></aside><div className="fo-product-content"><span>OPERATIONS / OVERVIEW</span><strong>Business workspace</strong><div className="fo-product-placeholder"><i /><i /><i /></div></div></div>;
}

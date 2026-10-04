import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "./flowone";

export function AccessibleFlowSummary({ stages }: { stages: string[] }) {
  return <ol className="accessible-flow-summary" aria-label="Flow sequence">{stages.map((stage, index) => <li key={stage}><span>{stage}</span>{index < stages.length - 1 && <small>Then</small>}</li>)}</ol>;
}

export function AccessibleDialogDemo() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = dialog.current;
    const focusable = () => Array.from(node?.querySelectorAll<HTMLElement>("button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])") || []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); (trigger.current || previous)?.focus(); };
  }, [open]);

  return <div className="accessible-dialog-demo">
    <button ref={trigger} className="fo-button fo-button-primary fo-button-medium is-default" onClick={() => setOpen(true)}>Open accessible dialog</button>
    <div className={`accessible-dialog-layer ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <button className="accessible-dialog-backdrop" aria-label="Close dialog" onClick={() => setOpen(false)} />
      <div ref={dialog} className="accessible-dialog" role="dialog" aria-modal="true" aria-labelledby="accessible-dialog-title" aria-describedby="accessible-dialog-description">
        <header><div><span>INVOICE ACTION</span><strong id="accessible-dialog-title">Send payment reminder?</strong></div><Button variant="icon" size="small" ariaLabel="Close dialog" onClick={() => setOpen(false)}><Icon name="close" size={16} /></Button></header>
        <p id="accessible-dialog-description">Ananya Enterprises will receive a reminder for invoice INV-10482.</p>
        <footer><Button variant="secondary" size="small" onClick={() => setOpen(false)}>Cancel</Button><Button size="small" onClick={() => setOpen(false)}>Send reminder</Button></footer>
      </div>
    </div>
  </div>;
}

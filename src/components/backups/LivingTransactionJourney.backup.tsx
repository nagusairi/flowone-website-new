import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button, FlowConnector, Icon } from "./flowone";

/* ==========================================================================
   Section 03A: Living Transaction — 10 Sequential Stages Dataset
   Consistent identity: TXN-10482, Ananya Enterprises, ₹5,00,000 order (₹5,90,000 with 18% GST)
   ========================================================================== */
export interface JourneyStage {
  id: string;
  num: string;
  label: string;
  shortTag: string;
  titleUpper: string;
  eyebrow: string;
  lead: string;
  summary: string;
  statusLabel: string;
  statusTone: "success" | "info" | "warning" | "purple";
  pills: Array<{ text: string; tone: "blue" | "neutral" | "purple" | "warning" }>;
  facts: Array<[string, string]>;
  calloutKicker: string;
  calloutText: string;
}

export const journeyStages: JourneyStage[] = [
  {
    id: "order",
    num: "01",
    label: "Order",
    shortTag: "SO-10482",
    titleUpper: "SALES ORDER",
    eyebrow: "ORDER CONFIRMATION",
    lead: "Order SO-10482 is confirmed for ₹5,00,000. The living workspace captures customer GSTIN, locks Net 30 terms, and initiates automated fulfillment routing directly to Hyderabad inventory.",
    summary: "A ₹5,00,000 order begins one continuous business journey across sales, warehouse, and finance.",
    statusLabel: "Confirmed",
    statusTone: "success",
    pills: [
      { text: "SO-10482", tone: "blue" },
      { text: "₹5,00,000 Total", tone: "blue" },
      { text: "125 Units", tone: "neutral" },
      { text: "Hyderabad DC-02", tone: "neutral" },
    ],
    facts: [
      ["ORDER VALUE", "₹5,00,000"],
      ["UNITS", "125"],
      ["CUSTOMER", "Ananya Enterprises"],
      ["STATUS", "Confirmed"],
    ],
    calloutKicker: "COMMERCIAL WORKFLOW ROUTE",
    calloutText: "Commercial agreement confirmed for 125 units. The sales order initiates an automated fulfillment workflow directly in Hyderabad inventory.",
  },
  {
    id: "inventory",
    num: "02",
    label: "Inventory",
    shortTag: "DC-02 Reserved",
    titleUpper: "WAREHOUSE ALLOCATION",
    eyebrow: "STOCK ALLOCATION",
    lead: "Stock reserved in real time at Hyderabad Central DC. The transaction locks Rack HYD-B4 without manual warehouse emails, ensuring physical goods match commercial commitments with zero stockout drift.",
    summary: "The same transaction reserves stock in the Hyderabad warehouse, clearing fulfillment without spreadsheet handoffs.",
    statusLabel: "Allocated",
    statusTone: "info",
    pills: [
      { text: "SO-10482", tone: "blue" },
      { text: "Rack HYD-B4", tone: "blue" },
      { text: "125 Units (100% Reserved)", tone: "neutral" },
      { text: "Hyderabad DC-02", tone: "neutral" },
    ],
    facts: [
      ["STOCK", "125 units allocated"],
      ["WAREHOUSE", "Hyderabad DC-02"],
      ["STATUS", "Allocated"],
    ],
    calloutKicker: "CONTINUOUS INVENTORY INTEGRATION",
    calloutText: "The same transaction reserves stock in the Hyderabad warehouse. Operations clears fulfillment without manual re-entry or detached warehouse spreadsheets.",
  },
  {
    id: "invoice",
    num: "03",
    label: "Invoice",
    shortTag: "INV-10482",
    titleUpper: "TAX INVOICE",
    eyebrow: "COMMERCIAL INVOICE",
    lead: "Operational dispatch converts directly into Tax Invoice INV-10482. Contract value advances from ₹5,00,000 to ₹5,90,000 with 18% GST (CGST+SGST) attached, eliminating manual billing re-entry.",
    summary: "Operational activity becomes a financial obligation without losing context.",
    statusLabel: "Issued",
    statusTone: "info",
    pills: [
      { text: "INV-10482", tone: "blue" },
      { text: "₹5,90,000 Total", tone: "blue" },
      { text: "18% GST Attached", tone: "blue" },
      { text: "Net 30 Terms", tone: "neutral" },
    ],
    facts: [
      ["INVOICE", "INV-10482"],
      ["SUBTOTAL", "₹5,00,000"],
      ["GST", "₹90,000"],
      ["TOTAL", "₹5,90,000"],
    ],
    calloutKicker: "FINANCIAL OBLIGATION FORMED",
    calloutText: "Operational fulfillment automatically converts into a tax invoice. Commercial value advances from ₹5,00,000 to ₹5,90,000 with complete tax metadata attached.",
  },
  {
    id: "gst",
    num: "04",
    label: "GST",
    shortTag: "IRN Cleared",
    titleUpper: "GST COMPLIANCE",
    eyebrow: "STATUTORY VALIDATION",
    lead: "Statutory validation runs autonomously in the flow. flowOne handshakes with the government IRP portal, generating verified IRN hash and QR codes ready for e-way bill generation with zero portal logins.",
    summary: "Tax context stays attached to the transaction, clearing government e-invoicing validations autonomously.",
    statusLabel: "Compliant",
    statusTone: "success",
    pills: [
      { text: "INV-10482", tone: "blue" },
      { text: "IRN Verified", tone: "blue" },
      { text: "₹90,000 GST", tone: "neutral" },
      { text: "GSTR-1 Mapped", tone: "neutral" },
    ],
    facts: [
      ["GST", "₹90,000"],
      ["E-INVOICE", "Generated & Signed"],
      ["VALIDATION", "Passed"],
      ["E-WAY BILL", "Ready"],
    ],
    calloutKicker: "COMPLIANCE IN THE FLOW",
    calloutText: "Tax context stays attached to the transaction. Government e-invoicing validations pass autonomously without logging into separate statutory portals.",
  },
  {
    id: "receivable",
    num: "05",
    label: "Receivable",
    shortTag: "₹5.9L Open",
    titleUpper: "ACCOUNTS RECEIVABLE",
    eyebrow: "OPEN RECEIVABLE",
    lead: "Open receivable posted directly to the finance ledger. Finance gains sub-second visibility into due date (28 Jun), payment terms, and aging without waiting for month-end reconciliation.",
    summary: "Finance sees the amount, customer and due date in the same flow with zero ledger drift.",
    statusLabel: "Open · Due 4d",
    statusTone: "warning",
    pills: [
      { text: "INV-10482", tone: "blue" },
      { text: "₹5,90,000 Open", tone: "blue" },
      { text: "Due in 4 Days", tone: "warning" },
      { text: "Net 30 Terms", tone: "neutral" },
    ],
    facts: [
      ["AMOUNT", "₹5,90,000"],
      ["CUSTOMER", "Ananya Enterprises"],
      ["DUE", "In 4 days"],
      ["STATUS", "Open"],
    ],
    calloutKicker: "LEDGER DISCIPLINE AT DISPATCH",
    calloutText: "Finance sees the amount, customer and due date in the same flow. No manual journal entry or reconciliation lag between operations and accounting.",
  },
  {
    id: "collection",
    num: "06",
    label: "Collection",
    shortTag: "1-Click Link",
    titleUpper: "COLLECTIONS ORCHESTRATION",
    eyebrow: "ACTIONABLE REMINDER",
    lead: "Intelligent, context-aware payment reminders. Rather than aggressive spam, flowOne prepares a personalized link with UPI & NEFT payment rails only if behavioral drift is detected.",
    summary: "A payment reminder is ready when the business context calls for it, with multi-rail links.",
    statusLabel: "Scheduled",
    statusTone: "info",
    pills: [
      { text: "INV-10482", tone: "blue" },
      { text: "Scheduled Reminder", tone: "blue" },
      { text: "UPI / NEFT Rails", tone: "neutral" },
      { text: "1-Click Link", tone: "neutral" },
    ],
    facts: [
      ["REMINDER", "Payment due"],
      ["STATUS", "Scheduled"],
      ["CHANNELS", "WhatsApp + Email"],
    ],
    calloutKicker: "TIMED, DIGNIFIED ENGAGEMENT",
    calloutText: "A payment reminder is ready when the business context calls for it. Single-click dispatch over WhatsApp or email with embedded UPI/NEFT payment link.",
  },
  {
    id: "bank",
    num: "07",
    label: "Bank",
    shortTag: "HDFC Feed",
    titleUpper: "BANK FEED INGESTION",
    eyebrow: "DIRECT BANK FEED",
    lead: "Direct corporate bank feed synchronization. Incoming remittance of ₹5,90,000 arrives with raw UTR-98204018274 payload from HDFC Bank, ready for deterministic correlation.",
    summary: "Real-time host-to-host multi-bank statement synchronization pairs credits instantly.",
    statusLabel: "Credit Received",
    statusTone: "success",
    pills: [
      { text: "HDFC A/c 2048", tone: "blue" },
      { text: "₹5,90,000 CR", tone: "blue" },
      { text: "UTR98204018274", tone: "neutral" },
      { text: "Value Date Settled", tone: "neutral" },
    ],
    facts: [
      ["CREDIT", "₹5,90,000.00 CR"],
      ["BANK", "HDFC Corporate Feed"],
      ["REF", "UTR98204018274"],
      ["STATUS", "Received"],
    ],
    calloutKicker: "DIRECT BANK RAILS",
    calloutText: "Real-time host-to-host bank statement feed. Inbound remittance arrives with raw UTR identifier and cryptographic payload.",
  },
  {
    id: "reconciliation",
    num: "08",
    label: "Reconciliation",
    shortTag: "98% Matched",
    titleUpper: "AUTOMATED RECONCILIATION",
    eyebrow: "AUTO RECONCILIATION",
    lead: "Inbound bank payment matches invoice INV-10482 at 98% confidence. Real-time ledger matching clears the receivable and logs bank reference UTR98204018274 with zero manual statement ticking.",
    summary: "The bank receipt reconnects to the same invoice automatically with zero statement ticking.",
    statusLabel: "Reconciled",
    statusTone: "success",
    pills: [
      { text: "INV-10482", tone: "blue" },
      { text: "₹5,90,000 Matched", tone: "blue" },
      { text: "UTR98204018274", tone: "neutral" },
      { text: "98% Confidence", tone: "neutral" },
    ],
    facts: [
      ["PAYMENT", "₹5,90,000"],
      ["STATUS", "Received"],
      ["MATCH", "INV-10482"],
      ["CONFIDENCE", "98%"],
    ],
    calloutKicker: "SUB-SECOND RECONCILIATION",
    calloutText: "The bank receipt reconnects to the same invoice automatically. Bank fee, timestamp, and remittance identifiers match without human intervention.",
  },
  {
    id: "cashflow",
    num: "09",
    label: "Cashflow",
    shortTag: "₹5.9L Liquid",
    titleUpper: "CASH LIQUIDITY & TREASURY",
    eyebrow: "AVAILABLE LIQUIDITY",
    lead: "Collected funds immediately unlock into available working capital. Treasury dashboards reflect ₹5,90,000 in liquid runway, automatically updating 90-day cash flow forecasts.",
    summary: "The transaction completes its operational and financial journey, unlocking liquid working capital.",
    statusLabel: "Cash Realized",
    statusTone: "success",
    pills: [
      { text: "TXN-10482", tone: "blue" },
      { text: "₹5,90,000 Liquid", tone: "blue" },
      { text: "Treasury Synced", tone: "neutral" },
      { text: "HDFC Primary", tone: "neutral" },
    ],
    facts: [
      ["AVAILABLE CASH", "₹5,90,000"],
      ["STATUS", "Received"],
      ["TRANSACTION", "TXN-10482"],
      ["RUNWAY", "Updated"],
    ],
    calloutKicker: "INSTANT CAPITAL RECYCLING",
    calloutText: "The transaction completes its operational and financial journey. Cash is instantly recognized in working capital forecasts, funding the next procurement cycle.",
  },
  {
    id: "decision",
    num: "10",
    label: "Decision",
    shortTag: "Loop Closed",
    titleUpper: "EXECUTIVE OUTCOME",
    eyebrow: "EXECUTIVE CLOSURE",
    lead: "The transaction loop closes with executive-grade intelligence. Commercial margin, DSO performance, and working capital impact are indexed into the CFO dashboard for growth decisions.",
    summary: "The transaction is no longer just an invoice. It is part of the business’s financial picture.",
    statusLabel: "Decision Ready",
    statusTone: "purple",
    pills: [
      { text: "TXN-10482", tone: "blue" },
      { text: "Loop Closed", tone: "blue" },
      { text: "DSO Optimized", tone: "neutral" },
      { text: "CFO Telemetry", tone: "purple" },
    ],
    facts: [
      ["OUTCOME", "Cash collected"],
      ["CONTEXT", "Restored"],
      ["NEXT", "Decision ready"],
    ],
    calloutKicker: "CONNECTED BUSINESS CLOSURE",
    calloutText: "The transaction is no longer just an invoice—it is part of the business’s financial intelligence, proving how operations and cash flow move as one.",
  },
];

/* ==========================================================================
   Callout Panel Component
   ========================================================================== */
function JourneyCallout({
  kicker,
  text,
  action,
}: {
  kicker: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="living-callout-panel">
      <div className="living-callout-icon-box" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z" fill="white" />
          <path d="M18 15L18.8 17.2L21 18L18.8 18.8L18 21L17.2 18.8L15 18L17.2 17.2L18 15Z" fill="white" />
        </svg>
      </div>
      <div className="living-callout-body">
        <strong className="living-callout-kicker">{kicker}</strong>
        <p className="living-callout-text">{text}</p>
        {action && <div className="living-callout-action">{action}</div>}
      </div>
    </div>
  );
}

/* ==========================================================================
   Section 03A: LivingTransactionJourney Main Component
   ========================================================================== */
export default memo(function LivingTransactionJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reminderSent, setReminderSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Desktop Scroll-Driven Stage Calculation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el && window.innerWidth >= 1025) {
          const rect = el.getBoundingClientRect();
          const scrollDistance = rect.height - window.innerHeight;
          if (scrollDistance > 0) {
            const progress = -rect.top / scrollDistance;
            const clamped = Math.min(1, Math.max(0, progress));
            const calculatedIndex = Math.min(journeyStages.length - 1, Math.floor(clamped * journeyStages.length));
            setActiveIndex(calculatedIndex);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direct Click Stage Selection & Smooth Scroll Alignment
  const handleSelectStage = useCallback((idx: number) => {
    setActiveIndex(idx);
    const el = sectionRef.current;
    if (el && window.innerWidth >= 1025) {
      const rect = el.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const scrollDistance = el.scrollHeight - window.innerHeight;
      const targetY = sectionTop + (idx / journeyStages.length) * scrollDistance + 10;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => Math.min(journeyStages.length - 1, prev + 1));
  }, []);

  // Touch Swipe Handlers for Mobile / Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const cur = journeyStages[activeIndex];

  return (
    <section
      id="living-transaction"
      ref={sectionRef}
      className="new-home-section living-journey-section"
      aria-labelledby="living-journey-heading"
    >
      <div className="living-journey-sticky-shell">
        <div className="home-container living-journey-container">
          {/* Section Introduction */}
          <div className="living-journey-intro">
            <div className="living-journey-pill" role="note" aria-label="Living Transaction">
              <span className="living-journey-beacon" aria-hidden="true" />
              <span>LIVING TRANSACTION</span>
            </div>
            <h2 id="living-journey-heading" className="living-journey-title">
              One transaction.<br />
              Connected from start to cash.
            </h2>
            <p className="living-journey-desc">
              Follow a ₹5,00,000 order across operations, finance, compliance, collections and cash.
            </p>
          </div>

          {/* Main Asymmetrical Workspace Layout */}
          <div className="living-journey-layout">
            {/* LEFT COLUMN: Persistent Transaction Journey Rail */}
            <aside className="living-journey-rail" aria-label="Transaction stages progress rail">
              <div className="living-rail-track" aria-hidden="true">
                <div
                  className="living-rail-track-fill"
                  style={{
                    height: `${((activeIndex + 0.5) / journeyStages.length) * 100}%`,
                  }}
                />
              </div>

              <div className="living-rail-steps" role="tablist" aria-orientation="vertical">
                {journeyStages.map((stage, i) => {
                  const isActive = i === activeIndex;
                  const isCompleted = i < activeIndex;

                  return (
                    <div
                      key={stage.id}
                      className={`living-rail-item ${isActive ? "is-active" : ""} ${isCompleted ? "is-completed" : ""}`}
                    >
                      <button
                        type="button"
                        role="tab"
                        id={`journey-tab-${stage.id}`}
                        aria-selected={isActive}
                        aria-controls={`journey-workspace-${stage.id}`}
                        className="living-rail-btn"
                        onClick={() => handleSelectStage(i)}
                      >
                        {/* Node Beacon */}
                        <span className="living-rail-node" aria-hidden="true">
                          {isCompleted ? (
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                              <path d="M13.333 4 6 11.333 2.667 8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <i className="living-rail-node-dot" />
                          )}
                        </span>

                        {/* Stage Number & Label */}
                        <div className="living-rail-label-box">
                          <span className="living-rail-num">{stage.num}</span>
                          <span className="living-rail-name">{stage.label}</span>
                          <span className="living-rail-tag">{stage.shortTag}</span>
                        </div>
                      </button>

                      {/* In-situ Expanded Narrative Card for the Active Stage */}
                      {isActive && (
                        <div className="living-rail-drawer" role="tabpanel" aria-labelledby={`journey-tab-${stage.id}`}>
                          <p className="living-rail-summary">{stage.summary}</p>
                          <div className="living-rail-facts" aria-label="Stage facts">
                            {stage.facts.map(([k, v]) => (
                              <div key={k} className="living-rail-chip">
                                <span className="living-chip-k">{k}</span>
                                <span className="living-chip-v">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* RIGHT COLUMN: Living Product Workspace */}
            <main
              className="living-journey-workspace"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Active Transaction Workspace"
            >
              {/* Workspace Stage Header */}
              <div className="living-stage-header">
                <h3 className="living-stage-title">{cur.titleUpper}</h3>
                <p className="living-stage-lead">{cur.lead}</p>

                {/* Metadata Pills Row */}
                <div className="living-stage-pills-row" aria-label="Transaction Metadata">
                  <div className="living-pill is-blue">
                    <span>{cur.pills[0].text}</span>
                  </div>

                  {/* Customer Entity & Statutory GSTIN Pill */}
                  <div className="living-pill is-entity" title="Counterparty Details">
                    <span className="living-pill-avatar">AE</span>
                    <span className="living-pill-entity-name">Ananya Enterprises</span>
                    <span className="living-pill-gst-divider">·</span>
                    <span className="living-pill-gst-val">GST: 36AABCA1234F1Z5</span>
                  </div>

                  {cur.pills.slice(1).map((p, pIdx) => (
                    <div key={pIdx} className={`living-pill is-${p.tone}`}>
                      <span>{p.text}</span>
                    </div>
                  ))}

                  <div className={`living-pill is-status is-${cur.statusTone}`}>
                    <span className="living-status-indicator" />
                    <span>Status: {cur.statusLabel}</span>
                  </div>
                </div>
              </div>

              {/* Living Card Shell with Gradient Overlays */}
              <div className="living-card-shell" key={cur.id}>
                <img
                  src="/assets/gradient-top.svg"
                  alt=""
                  className="living-card-gradient-top"
                  aria-hidden="true"
                />
                <img
                  src="/assets/gradient-bottom.svg"
                  alt=""
                  className="living-card-gradient-bottom"
                  aria-hidden="true"
                />

                <div className="living-card-content">
                  {/* STAGE 01: SALES ORDER */}
                  {activeIndex === 0 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>Sales Order · SO-10482</strong>
                        <span className="living-badge-pill is-success">
                          <Icon name="check" size={14} tone="success" /> Order Confirmed
                        </span>
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
                              <td style={{ textAlign: "right", fontWeight: 700 }}>₹5,00,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="living-table-totals">
                        <div><span>Subtotal</span><b>₹5,00,000</b></div>
                        <div className="grand-total"><span>Sales Order Total</span><b>₹5,00,000</b></div>
                      </div>
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 02: WAREHOUSE ALLOCATION */}
                  {activeIndex === 1 && (
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
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 03: TAX INVOICE */}
                  {activeIndex === 2 && (
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
                              <td style={{ textAlign: "right", fontWeight: 700 }}>₹5,90,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="living-table-totals">
                        <div><span>Subtotal</span><b>₹5,00,000</b></div>
                        <div><span>Total GST (18%)</span><b>₹90,000</b></div>
                        <div className="grand-total"><span>Invoice Amount</span><b>₹5,90,000</b></div>
                      </div>
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 04: GST COMPLIANCE */}
                  {activeIndex === 3 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>GST &amp; E-Invoicing Verification · INV-10482</strong>
                        <span className="living-badge-pill is-success">
                          <Icon name="check" size={14} tone="success" /> Compliant
                        </span>
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
                          <strong className="living-mono-hash">7b4cf829019a...392a (Verified)</strong>
                        </div>
                        <div className="living-grid-item">
                          <span>STATUTORY VALIDATION</span>
                          <strong>Passed · Auto-mapped to GSTR-1</strong>
                        </div>
                      </div>
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 05: ACCOUNTS RECEIVABLE */}
                  {activeIndex === 4 && (
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
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 06: COLLECTION */}
                  {activeIndex === 5 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>Collections Orchestration · INV-10482</strong>
                        <span className="living-badge-pill is-info">
                          {reminderSent ? "Reminder Dispatched" : "Scheduled Cadence"}
                        </span>
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
                          <span>PAYMENT RAILS</span>
                          <strong>UPI QR + Virtual Account NEFT Link</strong>
                        </div>
                      </div>
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                        action={
                          <Button size="small" onClick={() => setReminderSent(true)}>
                            {reminderSent ? "Reminder Sent ✓" : "Trigger Dynamic Payment Link"}
                          </Button>
                        }
                      />
                    </div>
                  )}

                  {/* STAGE 07: BANK INGESTION */}
                  {activeIndex === 6 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>Direct Corporate Bank Feed · HDFC A/c 2048</strong>
                        <span className="living-badge-pill is-success">
                          <Icon name="check" size={14} tone="success" /> Inbound Credit Received
                        </span>
                      </div>
                      <div className="living-grid-summary">
                        <div className="living-grid-item">
                          <span>BANK REMITTANCE</span>
                          <strong style={{ color: "var(--color-status-success)" }}>₹5,90,000.00 CR</strong>
                        </div>
                        <div className="living-grid-item">
                          <span>UTR IDENTIFIER</span>
                          <strong>UTR98204018274</strong>
                        </div>
                        <div className="living-grid-item">
                          <span>VALUE DATE</span>
                          <strong>24 Jun 2026 · 14:08 IST</strong>
                        </div>
                        <div className="living-grid-item">
                          <span>HOST INTEGRATION</span>
                          <strong>HDFC Host-to-Host Gateway</strong>
                        </div>
                      </div>
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 08: RECONCILIATION */}
                  {activeIndex === 7 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>Automated Bank Reconciliation Bridge · HDFC ↔ INV-10482</strong>
                        <span className="living-badge-pill is-success">
                          <Icon name="check" size={14} tone="success" /> Matched · 98% Confidence
                        </span>
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
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 09: CASHFLOW POSITION */}
                  {activeIndex === 8 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>Operating Treasury &amp; Cash Position</strong>
                        <span className="living-badge-pill is-success">
                          <Icon name="check" size={14} tone="success" /> Funds Cleared
                        </span>
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
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}

                  {/* STAGE 10: DECISION OUTCOME */}
                  {activeIndex === 9 && (
                    <div className="living-enterprise-card">
                      <div className="living-card-header">
                        <strong>Unified Business Outcome · Strategic Clarity</strong>
                        <span className="living-badge-pill is-purple">
                          <Icon name="spark" size={14} tone="action" /> Loop Closed
                        </span>
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
                      <JourneyCallout
                        kicker={cur.calloutKicker}
                        text={cur.calloutText}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Step Navigation Bar */}
              <div className="living-bottom-nav">
                <div className="living-mobile-nav-buttons">
                  <button
                    type="button"
                    className="living-mobile-step-btn"
                    disabled={activeIndex === 0}
                    onClick={handlePrev}
                    aria-label="Previous transaction stage"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    className="living-mobile-step-btn"
                    disabled={activeIndex === journeyStages.length - 1}
                    onClick={handleNext}
                    aria-label="Next transaction stage"
                  >
                    Next →
                  </button>
                </div>

                <div className="living-step-indicators" aria-label="Step progress">
                  {journeyStages.map((step, i) => (
                    <button
                      key={step.id}
                      type="button"
                      className={`living-step-segment ${i <= activeIndex ? "is-filled" : ""}`}
                      onClick={() => handleSelectStage(i)}
                      aria-label={`Jump to stage ${step.num}: ${step.label}`}
                    />
                  ))}
                </div>

                <span className="living-step-counter">
                  Stage {cur.num} of 10 · {cur.label}
                </span>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
});

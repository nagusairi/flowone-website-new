import React, { memo, useState, useRef } from "react";
import "./decision-canvas.css";

/* ==========================================================================
   Section 06 — Predictive Business Decisions
   Direction B3 — The Decision Canvas
   Layout: Three insight cards + one full-width decision strip
   Visual direction: Premium editorial, softly tinted, precise and compact
   ========================================================================== */

export type CanvasSignalId =
  | "receivables"
  | "supplier-payments"
  | "inventory"
  | "expected-cash"
  | "collection-risk";

export interface CanvasSignalData {
  id: CanvasSignalId;
  tabNumber: string;
  tabLabel: string;
  // Card 1: What Changed
  card1Category: string;
  card1Headline: string;
  card1Explanation: string;
  card1Reference: string;
  // Card 2: Business Impact
  card2Category: string;
  card2Headline: string;
  card2Explanation: string;
  card2ContextTag: string;
  // Card 3: What It Affects
  card3Category: string;
  card3Affects: {
    domain: string;
    consequence: string;
  }[];
  // Full-Width Decision Strip
  decisionHeadline: string;
  decisionDesc: string;
  decisionBenefit: string;
  feasibility: string;
  simulationDelta: string;
  assumptions: string;
}

export const canvasSignalsData: CanvasSignalData[] = [
  {
    id: "receivables",
    tabNumber: "01",
    tabLabel: "RECEIVABLES",
    // Card 1
    card1Category: "INFLOW SIGNAL",
    card1Headline: "₹5.90L arriving 15 days later",
    card1Explanation: "Invoice INV-10482 is expected on Day +45 instead of Day +30 based on 3-cycle customer reconciliation history.",
    card1Reference: "Ananya Enterprises · INV-10482",
    // Card 2
    card2Category: "LIQUIDITY FORECAST",
    card2Headline: "₹24.8L projected cash floor",
    card2Explanation: "Delayed receipts reduce cash available for scheduled payments and bi-weekly payroll on Day +38.",
    card2ContextTag: "Day +38 Reserve Valley · 41% Headroom Compression",
    // Card 3
    card3Category: "DOWNSTREAM DEPENDENCIES",
    card3Affects: [
      {
        domain: "Supplier Payments",
        consequence: "₹4.50L falls due before the expected customer receipt.",
      },
      {
        domain: "Spending Flexibility",
        consequence: "Less cash remains available for other planned commitments.",
      },
    ],
    // Decision Strip
    decisionHeadline: "Consider an early-payment incentive.",
    decisionDesc: "Offer a 1.25% discount (₹7,375 benefit) for settlement within 5 days, or execute one-click TReDS invoice discounting via bank conduit.",
    decisionBenefit: "Accelerates ₹5.82L inflow to Day +28, clearing the Day +38 liquidity valley before supplier payments.",
    feasibility: "Pre-Configured Incentive · One-Click",
    simulationDelta: "+₹5.82L by Day +28 · Zero Overdraft Risk",
    assumptions: "Assumes counterparty payment clearing history of 12–15 day drift and standard 1.25% dynamic discount policy.",
  },
  {
    id: "supplier-payments",
    tabNumber: "02",
    tabLabel: "SUPPLIER PAYMENTS",
    // Card 1
    card1Category: "PAYMENT COMMITMENT",
    card1Headline: "₹4.50L payment approaching",
    card1Explanation: "The supplier payment is scheduled for Day +38, before the delayed customer receipt arrives.",
    card1Reference: "Shanti Metals · PO-9201",
    // Card 2
    card2Category: "LIQUIDITY FORECAST",
    card2Headline: "Outflows converge in Week 5",
    card2Explanation: "The vendor payment overlaps with ₹12.0L bi-weekly payroll, peak cumulative pressure on available cash.",
    card2ContextTag: "Peak Cumulative Outflow · ₹16.5L Combined Draw",
    // Card 3
    card3Category: "DOWNSTREAM DEPENDENCIES",
    card3Affects: [
      {
        domain: "Cash Availability",
        consequence: "Expected collections arrive 7 days after the payment window.",
      },
      {
        domain: "Payment Priorities",
        consequence: "Non-statutory disbursements must be staggered to protect 100% tax deductibility.",
      },
    ],
    // Decision Strip
    decisionHeadline: "Prioritize the statutory supplier payment.",
    decisionDesc: "Lock MSME disbursement for Day +38 while rescheduling non-statutory vendor disbursements (PO-8814 ₹3.20L) to Day +48 post-collection.",
    decisionBenefit: "Safeguards 100% tax deductibility under Section 43B(h) while smoothing net weekly cash outflows.",
    feasibility: "Policy Approved · Zero Penalty",
    simulationDelta: "100% Tax Deductible · Balanced Week 5 Reserve",
    assumptions: "Section 43B(h) mandates 45-day payment window; non-critical supplier terms permit 10-day rescheduling.",
  },
  {
    id: "inventory",
    tabNumber: "03",
    tabLabel: "INVENTORY COMMITMENTS",
    // Card 1
    card1Category: "OPERATIONAL COMMITMENT",
    card1Headline: "₹6.20L replenishment planned",
    card1Explanation: "Stock is approaching its safety threshold (-32%), bringing forward a mandatory procurement PO decision.",
    card1Reference: "DC-02 Warehouse Hub · SKU-4028",
    // Card 2
    card2Category: "WORKING CAPITAL COMMITMENT",
    card2Headline: "Cash committed before collection",
    card2Explanation: "A full 90-day order commits ₹6.20L before expected customer receipts arrive in company accounts.",
    card2ContextTag: "₹14.5L Assembly Run At Risk · Day +42 Cutoff",
    // Card 3
    card3Category: "DOWNSTREAM DEPENDENCIES",
    card3Affects: [
      {
        domain: "Production Continuity",
        consequence: "Delaying replenishment past Day +20 halts assembly on Day +42.",
      },
      {
        domain: "Available Cash",
        consequence: "Purchasing the full quantity immediately reduces near-term liquidity.",
      },
    ],
    // Decision Strip
    decisionHeadline: "Consider phased replenishment tranches.",
    decisionDesc: "Order ₹2.40L (30-day runway) immediately; release tranche 2 (₹3.80L) upon confirmed receipt of Ananya invoice funds.",
    decisionBenefit: "Maintains 100% production continuity while preserving ₹3.80L liquidity during the Day +35–40 window.",
    feasibility: "Supplier Pre-Aligned · Low Friction",
    simulationDelta: "Zero Stockout · ₹3.80L Liquidity Preserved",
    assumptions: "Supplier accepts split consignment deliveries (30D/60D) without imposing batch-price surcharges.",
  },
  {
    id: "expected-cash",
    tabNumber: "04",
    tabLabel: "EXPECTED CASH",
    // Card 1
    card1Category: "LIQUIDITY TRAJECTORY",
    card1Headline: "₹42.5L to ₹24.8L net drawdown",
    card1Explanation: "Net operating balance tracks downward as scheduled statutory and payroll disbursements outpace delayed receipts.",
    card1Reference: "HDFC Operating Facility · Primary Reserve",
    // Card 2
    card2Category: "LIQUIDITY FORECAST",
    card2Headline: "₹2.8L cushion above safety baseline",
    card2Explanation: "Operating cash reserve approaches within ₹2.8L of the corporate ₹22.0L emergency operating liquidity baseline.",
    card2ContextTag: "₹17.7L Net Drawdown · Day +38 Reserve Valley",
    // Card 3
    card3Category: "DOWNSTREAM DEPENDENCIES",
    card3Affects: [
      {
        domain: "Collections Dependency",
        consequence: "Any secondary delay exceeding ₹3.0L triggers 11.5% overdraft.",
      },
      {
        domain: "Planned Spending",
        consequence: "Scheduled infrastructure and capex deployments require temporary deferral.",
      },
    ],
    // Decision Strip
    decisionHeadline: "Activate standby working capital buffer.",
    decisionDesc: "Establish drawing power on pre-approved credit facility or activate dynamic discounting across top 3 open invoices.",
    decisionBenefit: "Establishes a ₹15.0L standby liquidity buffer 14 days in advance without incurring interest until drawdown.",
    feasibility: "Pre-Approved Facility · Instant",
    simulationDelta: "+₹15.0L Standby Buffer · Zero Overdraft Risk",
    assumptions: "Corporate line active with zero commitment fees; accessible within 2 hours of formal trigger.",
  },
  {
    id: "collection-risk",
    tabNumber: "05",
    tabLabel: "COLLECTION RISK",
    // Card 1
    card1Category: "VARIANCE PATTERN",
    card1Headline: "14–18 day cyclical batch lag",
    card1Explanation: "Historical ledger analysis flags month-end payment batching by Tier-1 corporate clients rather than default insolvency.",
    card1Reference: "Enterprise Accounts Ledger · 2 Accounts",
    // Card 2
    card2Category: "WORKING CAPITAL DRAG",
    card2Headline: "₹9.10L predictable inflow shift",
    card2Explanation: "Corporate AP cycles process vendor checks only on the 25th of each month, expanding average DSO by 11.4 days.",
    card2ContextTag: "Predictable AP Cycle · 25th-of-Month Run",
    // Card 3
    card3Category: "DOWNSTREAM DEPENDENCIES",
    card3Affects: [
      {
        domain: "Invoice Submission Timing",
        consequence: "Invoices submitted after client cutoff roll over to the subsequent month.",
      },
      {
        domain: "Customer Payment Run",
        consequence: "Aligning invoice presentation accelerates cash arrival by 12 days.",
      },
    ],
    // Decision Strip
    decisionHeadline: "Synchronize billing cycles to client ERP runs.",
    decisionDesc: "Shift invoice generation and delivery dates from the 28th to the 18th of the month to capture client's internal 25th AP approval run.",
    decisionBenefit: "Shortens average DSO by 12 days through natural workflow synchronization with zero customer friction or discounts.",
    feasibility: "Automated Billing Rule · Zero Cost",
    simulationDelta: "-12 Days DSO · Natural Cash Alignment",
    assumptions: "Client AP calendar accepts invoices approved by the 22nd into the 25th payment cycle.",
  },
];

/* ==========================================================================
   Micro-Visual Components (Crisp SVGs with subtle localized washes)
   ========================================================================== */

function MicroVisualCard1({ signalId }: { signalId: CanvasSignalId }) {
  switch (signalId) {
    case "receivables":
      // Two date markers showing Day +30 -> Day +45
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <line x1="8" y1="18" x2="48" y2="18" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="12" cy="18" r="4.5" fill="#FFFFFF" stroke="#185FA5" strokeWidth="2" />
          <text x="12" y="32" textAnchor="middle" fontSize="7" fill="#64748B" fontWeight="600">+30D</text>
          <path d="M 38 15 L 48 18 L 38 21" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="18" r="4.5" fill="#185FA5" />
          <text x="48" y="32" textAnchor="middle" fontSize="7" fill="#185FA5" fontWeight="700">+45D</text>
        </svg>
      );
    case "supplier-payments":
      // Payment marker labelled ₹4.50L / Day +38
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <rect x="6" y="8" width="48" height="20" rx="4" fill="#FFFFFF" stroke="#185FA5" strokeWidth="1.5" />
          <path d="M 12 18 L 18 18 M 24 18 L 44 18" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="44" cy="18" r="3" fill="#D97706" />
          <text x="30" y="22" textAnchor="middle" fontSize="6.5" fill="#185FA5" fontWeight="700">D+38</text>
        </svg>
      );
    case "inventory":
      // Restrained stock threshold marker (-32% stock)
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <rect x="8" y="10" width="44" height="16" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="8" y="10" width="28" height="16" rx="3" fill="#BFDBFE" />
          <line x1="36" y1="6" x2="36" y2="30" stroke="#D97706" strokeWidth="1.5" strokeDasharray="2 1" />
          <text x="36" y="34" textAnchor="middle" fontSize="6" fill="#D97706" fontWeight="700">SAFE</text>
        </svg>
      );
    case "expected-cash":
      // Start-to-end comparison: ₹42.5L -> ₹24.8L
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <path d="M 10 12 L 28 16 L 48 24" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="12" r="3" fill="#10B981" />
          <circle cx="48" cy="24" r="3" fill="#D97706" />
          <path d="M 44 24 L 48 24 L 48 20" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "collection-risk":
      // Compact calendar interval labelled 14-18 days
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <rect x="10" y="8" width="40" height="22" rx="3" fill="#FFFFFF" stroke="#185FA5" strokeWidth="1.2" />
          <line x1="10" y1="14" x2="50" y2="14" stroke="#185FA5" strokeWidth="1.2" />
          <text x="30" y="24" textAnchor="middle" fontSize="7" fill="#185FA5" fontWeight="700">14–18D</text>
        </svg>
      );
  }
}

function MicroVisualCard2({ signalId }: { signalId: CanvasSignalId }) {
  switch (signalId) {
    case "receivables":
      // Cash position marker labelled ₹24.8L / Day +38
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <path d="M 8 10 Q 25 10 32 24 T 52 26" stroke="#C4B5FD" strokeWidth="1.5" fill="none" />
          <circle cx="32" cy="24" r="4" fill="#534AB7" />
          <text x="32" y="34" textAnchor="middle" fontSize="6.5" fill="#534AB7" fontWeight="700">₹24.8L</text>
        </svg>
      );
    case "supplier-payments":
      // Two short outflow tracks representing vendor payment and payroll
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <rect x="8" y="10" width="38" height="6" rx="3" fill="#DDD6FE" />
          <rect x="8" y="10" width="22" height="6" rx="3" fill="#534AB7" />
          <rect x="8" y="20" width="44" height="6" rx="3" fill="#DDD6FE" />
          <rect x="8" y="20" width="36" height="6" rx="3" fill="#7C3AED" />
        </svg>
      );
    case "inventory":
      // Clearly labelled capital split: ₹2.40L + ₹3.80L
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <rect x="8" y="14" width="18" height="12" rx="2" fill="#534AB7" />
          <rect x="30" y="14" width="22" height="12" rx="2" fill="#DDD6FE" stroke="#534AB7" strokeWidth="1" strokeDasharray="2 1" />
          <text x="17" y="23" textAnchor="middle" fontSize="6" fill="#FFFFFF" fontWeight="700">T1</text>
          <text x="41" y="23" textAnchor="middle" fontSize="6" fill="#534AB7" fontWeight="700">T2</text>
        </svg>
      );
    case "expected-cash":
      // Labelled ₹2.8L gap above the ₹22.0L scenario baseline
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <line x1="8" y1="28" x2="52" y2="28" stroke="#534AB7" strokeWidth="1.5" />
          <line x1="8" y1="16" x2="52" y2="16" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="30" y1="16" x2="30" y2="28" stroke="#534AB7" strokeWidth="1.5" />
          <text x="44" y="24" textAnchor="middle" fontSize="6.5" fill="#534AB7" fontWeight="700">+₹2.8L</text>
        </svg>
      );
    case "collection-risk":
      // Two account markers associated with ₹9.10L at-risk inflow
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <circle cx="18" cy="18" r="7" fill="#534AB7" />
          <circle cx="42" cy="18" r="7" fill="#8B5CF6" />
          <line x1="25" y1="18" x2="35" y2="18" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="1 1" />
          <text x="18" y="20.5" textAnchor="middle" fontSize="6" fill="#FFFFFF" fontWeight="700">A1</text>
          <text x="42" y="20.5" textAnchor="middle" fontSize="6" fill="#FFFFFF" fontWeight="700">A2</text>
        </svg>
      );
  }
}

function MicroVisualCard3({ signalId }: { signalId: CanvasSignalId }) {
  switch (signalId) {
    case "receivables":
      // Two aligned timing tracks: supplier payment before receipt
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <line x1="8" y1="12" x2="34" y2="12" stroke="#316C72" strokeWidth="2" strokeLinecap="round" />
          <circle cx="34" cy="12" r="3" fill="#D97706" />
          <line x1="8" y1="24" x2="48" y2="24" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="24" r="3" fill="#316C72" />
        </svg>
      );
    case "supplier-payments":
      // Connector between supplier timing and customer collections
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <circle cx="14" cy="18" r="5" fill="#316C72" />
          <path d="M 19 18 C 28 10, 32 26, 41 18" stroke="#316C72" strokeWidth="1.5" fill="none" />
          <circle cx="46" cy="18" r="5" fill="#99F6E4" stroke="#316C72" strokeWidth="1.5" />
        </svg>
      );
    case "inventory":
      // Two connected labels: Production continuity / Available cash
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <rect x="8" y="8" width="16" height="20" rx="3" fill="#E6FFFA" stroke="#316C72" strokeWidth="1.2" />
          <line x1="24" y1="18" x2="36" y2="18" stroke="#316C72" strokeWidth="1.5" />
          <rect x="36" y="8" width="16" height="20" rx="3" fill="#316C72" />
        </svg>
      );
    case "expected-cash":
      // Two small dependency branches: Collections / Planned spending
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <circle cx="12" cy="18" r="4" fill="#316C72" />
          <path d="M 16 18 L 28 18 M 28 18 L 44 11 M 28 18 L 44 25" stroke="#316C72" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="46" cy="11" r="3" fill="#0D9488" />
          <circle cx="46" cy="25" r="3" fill="#14B8A6" />
        </svg>
      );
    case "collection-risk":
      // Timing relationship between invoice submission and customer payment run
      return (
        <svg viewBox="0 0 60 36" fill="none" className="fo-card-microvisual" aria-hidden="true">
          <circle cx="16" cy="18" r="6" fill="#CCFBF1" stroke="#316C72" strokeWidth="1.2" />
          <text x="16" y="20.5" textAnchor="middle" fontSize="6" fill="#316C72" fontWeight="700">18</text>
          <path d="M 22 18 L 36 18" stroke="#316C72" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="42" cy="18" r="6" fill="#316C72" />
          <text x="42" y="20.5" textAnchor="middle" fontSize="6" fill="#FFFFFF" fontWeight="700">25</text>
        </svg>
      );
  }
}

/* ==========================================================================
   Converging Motif for Decision Strip (Two lines joining into one forward path)
   ========================================================================== */
function DecisionConvergingMotif() {
  return (
    <svg viewBox="0 0 54 38" fill="none" className="fo-decision-motif-svg" aria-hidden="true">
      {/* Top flow line */}
      <path d="M 4 8 C 22 8, 28 19, 44 19" stroke="#185FA5" strokeWidth="2.2" strokeLinecap="round" />
      {/* Bottom flow line */}
      <path d="M 4 30 C 22 30, 28 19, 44 19" stroke="#534AB7" strokeWidth="2.2" strokeLinecap="round" />
      {/* Converged forward arrowhead */}
      <path d="M 37 14 L 46 19 L 37 24" stroke="#0022FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ==========================================================================
   Main Component: DecisionCanvasView
   ========================================================================== */
export const DecisionCanvasView = memo(function DecisionCanvasView() {
  const [activeSignalId, setActiveSignalId] = useState<CanvasSignalId>("supplier-payments");
  const [showAssumptions, setShowAssumptions] = useState(false);

  const currentSignal = canvasSignalsData.find((s) => s.id === activeSignalId) || canvasSignalsData[0];
  const currentIndex = canvasSignalsData.findIndex((s) => s.id === activeSignalId);

  const tabRefs = useRef<Record<CanvasSignalId, HTMLButtonElement | null>>({
    receivables: null,
    "supplier-payments": null,
    inventory: null,
    "expected-cash": null,
    "collection-risk": null,
  });

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index + 1 < canvasSignalsData.length) {
        const next = canvasSignalsData[index + 1];
        setActiveSignalId(next.id);
        tabRefs.current[next.id]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index - 1 >= 0) {
        const prev = canvasSignalsData[index - 1];
        setActiveSignalId(prev.id);
        tabRefs.current[prev.id]?.focus();
      }
    }
  };

  return (
    <section
      id="decision-canvas"
      className="fo-decision-canvas"
      aria-label="Section: Predictive Business Decisions — Direction B3 The Decision Canvas"
    >
      <div className="fo-decision-canvas__container">
        {/* 1. SECTION INTRODUCTION */}
        <header className="fo-canvas-intro">
          <div className="hero-eyebrow-container">
            <div className="hero-modern-eyebrow is-static" role="note" aria-label="Predictive Business Decisions">
              <span className="hero-eyebrow-badge">
                <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                <span>PREDICTIVE</span>
              </span>
              <span className="hero-eyebrow-title">PREDICTIVE BUSINESS DECISIONS</span>
              <span className="hero-eyebrow-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          <h2 className="fo-canvas-heading">
            Every signal changes <em>the bigger picture.</em>
          </h2>

          <p className="fo-canvas-copy">
            See what changed, what it affects and which decision to consider.
          </p>
        </header>

        {/* 2. FIVE HORIZONTAL SIGNAL TABS */}
        <div className="fo-canvas-tabs-wrapper" role="region" aria-label="Business Signals">
          <div className="fo-canvas-tabs-track" role="tablist" aria-label="Business Signals Navigation">
            {canvasSignalsData.map((sig, idx) => {
              const isSelected = sig.id === activeSignalId;
              const tabLabel = `${sig.tabNumber} ${sig.tabLabel}`;

              return (
                <button
                  key={sig.id}
                  ref={(el) => { tabRefs.current[sig.id] = el; }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={`fo-canvas-tab-pill ${isSelected ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveSignalId(sig.id);
                    setShowAssumptions(false);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  {isSelected && <span className="fo-canvas-tab-dot" aria-hidden="true" />}
                  <span>{tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. THREE EQUAL-WIDTH INSIGHT CARDS */}
        <div className="fo-canvas-cards-grid" role="region" aria-label="Signal Story Cards">
          {/* CARD 1 — WHAT CHANGED (Ice Blue) */}
          <article className="fo-canvas-card fo-card-changed" aria-label="What Changed Card">
            <div className="fo-card-wash" aria-hidden="true" />
            <div className="fo-card-top-row">
              <span className="fo-card-kicker">WHAT CHANGED · {currentSignal.card1Category}</span>
              <MicroVisualCard1 signalId={currentSignal.id} />
            </div>

            <div className="fo-card-body">
              <h3 className="fo-card-headline">{currentSignal.card1Headline}</h3>
              <p className="fo-card-explanation">{currentSignal.card1Explanation}</p>
            </div>

            <footer className="fo-card-footer">
              <span className="fo-card-pill-tag">
                <strong>Ref:</strong> {currentSignal.card1Reference}
              </span>
            </footer>
          </article>

          {/* CARD 2 — BUSINESS IMPACT (Soft Lavender) */}
          <article className="fo-canvas-card fo-card-impact" aria-label="Business Impact Card">
            <div className="fo-card-wash" aria-hidden="true" />
            <div className="fo-card-top-row">
              <span className="fo-card-kicker">BUSINESS IMPACT · {currentSignal.card2Category}</span>
              <MicroVisualCard2 signalId={currentSignal.id} />
            </div>

            <div className="fo-card-body">
              <h3 className="fo-card-headline">{currentSignal.card2Headline}</h3>
              <p className="fo-card-explanation">{currentSignal.card2Explanation}</p>
            </div>

            <footer className="fo-card-footer">
              <span className="fo-card-pill-tag">
                <strong>Impact:</strong> {currentSignal.card2ContextTag}
              </span>
            </footer>
          </article>

          {/* CARD 3 — WHAT IT AFFECTS (Cool Mineral) */}
          <article className="fo-canvas-card fo-card-affects" aria-label="What It Affects Card">
            <div className="fo-card-wash" aria-hidden="true" />
            <div className="fo-card-top-row">
              <span className="fo-card-kicker">WHAT IT AFFECTS · {currentSignal.card3Category}</span>
              <MicroVisualCard3 signalId={currentSignal.id} />
            </div>

            <div className="fo-card-body">
              <div className="fo-affects-stack">
                {currentSignal.card3Affects.map((item, i) => (
                  <div key={i} className="fo-affect-item">
                    <span className="fo-affect-title">{item.domain}</span>
                    <p className="fo-affect-desc">{item.consequence}</p>
                  </div>
                ))}
              </div>
            </div>

            <footer className="fo-card-footer">
              <span className="fo-card-pill-tag">
                <strong>Network:</strong> 2 Downstream Linkages Active
              </span>
            </footer>
          </article>
        </div>

        {/* 4. FULL-WIDTH DECISION STRIP (Spanning all 3 columns beneath) */}
        <div className="fo-decision-strip" role="region" aria-label="Decision to Consider">
          <div className="fo-decision-strip-main">
            {/* Left Area: Motif & Kicker */}
            <div className="fo-decision-motif-wrap">
              <DecisionConvergingMotif />
              <span className="fo-decision-kicker">
                <span className="fo-decision-kicker-dot" aria-hidden="true" />
                DECISION TO CONSIDER
              </span>
            </div>

            {/* Center Area: Action Headline, Desc & Benefit */}
            <div className="fo-decision-content-col">
              <h3 className="fo-decision-headline">{currentSignal.decisionHeadline}</h3>
              <p className="fo-decision-desc">{currentSignal.decisionDesc}</p>
              <p className="fo-decision-benefit">
                <span className="fo-decision-benefit-icon" aria-hidden="true">✦</span>
                <span>{currentSignal.decisionBenefit}</span>
              </p>
            </div>

            {/* Right Area: Assumptions & Details Button */}
            <div className="fo-decision-actions-col">
              <button
                type="button"
                className={`fo-decision-toggle-btn ${showAssumptions ? "is-expanded" : ""}`}
                onClick={() => setShowAssumptions((prev) => !prev)}
                aria-expanded={showAssumptions}
              >
                <span>{showAssumptions ? "Hide assumptions" : "View assumptions & details"}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="fo-decision-review-tag">Subject to operator review</span>
            </div>
          </div>

          {/* Expandable Details Drawer */}
          {showAssumptions && (
            <div className="fo-decision-drawer" role="region" aria-label="Scenario Assumptions and Feasibility">
              <div className="fo-drawer-card">
                <span className="fo-drawer-label">Operational Feasibility</span>
                <p className="fo-drawer-val">{currentSignal.feasibility}</p>
              </div>
              <div className="fo-drawer-card">
                <span className="fo-drawer-label">Simulated Financial Outcome</span>
                <p className="fo-drawer-val">{currentSignal.simulationDelta}</p>
              </div>
              <div className="fo-drawer-card">
                <span className="fo-drawer-label">Governing Assumptions</span>
                <p className="fo-drawer-val">{currentSignal.assumptions}</p>
              </div>
            </div>
          )}
        </div>

        {/* 5. SMALL ILLUSTRATIVE-SCENARIO NOTE */}
        <footer className="fo-canvas-footnote">
          <p className="fo-canvas-footnote-text">
            * Grounded in operational transaction TXN-10482 · Simulated scenario data for predictive advisory demonstration.
          </p>
          <span className="fo-canvas-footnote-badge">
            <span aria-hidden="true">🛡</span> Human-in-the-Loop Governance
          </span>
        </footer>
      </div>
    </section>
  );
});

export default DecisionCanvasView;

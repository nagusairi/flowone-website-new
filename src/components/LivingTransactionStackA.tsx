import React, { memo, useState, useEffect } from "react";

/* ==========================================================================
   Section 03: Living Transaction — Option A: Redesigned Compact Stacking Deck
   Inspired by Reference Image (Animated Off-Canvas Stacking Aesthetics)
   - Clean, compact, minimal cards with clear visual hierarchy
   - Circular icon emblems + clean divider + condensed narrative
   - Compact essential details strip
   - Zero signals clutter on the left side
   - Supports Light Enterprise and Dark Studio (Reference Match) themes
   ========================================================================== */

export interface CompactStageFact {
  label: string;
  value: string;
}

export interface CompactCardData {
  id: string;
  stageNum: string;
  stageName: string;
  title: string;
  kicker: string;
  badgeLabel: string;
  badgeTone: "success" | "info" | "warning" | "purple";
  lead: string;
  facts: [CompactStageFact, CompactStageFact, CompactStageFact, CompactStageFact];
  statusHighlight: string;
}

export const compactCardsData: CompactCardData[] = [
  {
    id: "order",
    stageNum: "01",
    stageName: "Order",
    title: "Commercial Sales Order",
    kicker: "STAGE 01 · ORDER CONFIRMED",
    badgeLabel: "SO-10482 Confirmed",
    badgeTone: "success",
    lead: "Order SO-10482 confirmed for 125 units (₹5,00,000). Commercial terms, customer GSTIN, and line items lock into a shared transaction context without re-entry.",
    facts: [
      { label: "DOC / REF", value: "SO-10482 · Confirmed" },
      { label: "COUNTERPARTY", value: "Ananya Enterprises" },
      { label: "AMOUNT & TERMS", value: "₹5,00,000 · Net 30" },
      { label: "DOWNSTREAM LINK", value: "DC-02 Warehouse Allocation" },
    ],
    statusHighlight: "Commercial Lock Active",
  },
  {
    id: "inventory",
    stageNum: "02",
    stageName: "Inventory",
    title: "Warehouse Stock Allocation",
    kicker: "STAGE 02 · STOCK RESERVED",
    badgeLabel: "125 Units Allocated",
    badgeTone: "info",
    lead: "Stock reserved in real time at Hyderabad Central DC-02. Physical goods lock against the sales order with zero spreadsheet drift.",
    facts: [
      { label: "DEPOT / ZONE", value: "Hyderabad DC-02 · Zone C" },
      { label: "RACK LOCATION", value: "Rack HYD-B4 · Aisle 4" },
      { label: "ALLOCATION", value: "125 / 125 Units (100%)" },
      { label: "VARIANCE", value: "0 Units · Barcode Verified" },
    ],
    statusHighlight: "Stock Lock Verified",
  },
  {
    id: "invoice",
    stageNum: "03",
    stageName: "Invoice",
    title: "Commercial Tax Invoice",
    kicker: "STAGE 03 · INVOICE ISSUED",
    badgeLabel: "INV-10482 Issued",
    badgeTone: "info",
    lead: "Operational fulfillment automatically converts into Tax Invoice INV-10482. Commercial value advances to ₹5,90,000 with 18% GST metadata attached.",
    facts: [
      { label: "INVOICE NUMBER", value: "INV-10482" },
      { label: "TAXABLE BASE", value: "₹5,00,000.00" },
      { label: "GST LIABILITY", value: "18% (₹90,000 IGST)" },
      { label: "TOTAL PAYABLE", value: "₹5,90,000.00 Total" },
    ],
    statusHighlight: "Tax Lineage Attached",
  },
  {
    id: "gst",
    stageNum: "04",
    stageName: "GST",
    title: "GST Statutory Compliance",
    kicker: "STAGE 04 · GOVERNMENT IRP",
    badgeLabel: "IRN Hash Signed",
    badgeTone: "success",
    lead: "flowOne handshakes with the government IRP portal, generating verified IRN hash, signed QR code, and logistics e-Way bill autonomously.",
    facts: [
      { label: "IRP ACK NO", value: "1126104829104" },
      { label: "IRN HASH", value: "7b4cf829019a...392a" },
      { label: "GSTR-1 MAPPING", value: "Table 4A (B2B Supplies)" },
      { label: "E-WAY BILL", value: "EWB-4910 Generated" },
    ],
    statusHighlight: "NIC Cryptographic Seal",
  },
  {
    id: "receivable",
    stageNum: "05",
    stageName: "Receivable",
    title: "Accounts Receivable Ledger",
    kicker: "STAGE 05 · LEDGER POSTED",
    badgeLabel: "Due in 4 Days",
    badgeTone: "warning",
    lead: "Open receivable posts directly to the finance ledger. Finance gains real-time visibility into customer terms, due dates, and aging without journal lag.",
    facts: [
      { label: "OUTSTANDING", value: "₹5,90,000.00 Open" },
      { label: "AGING BUCKET", value: "0–30 Days (Current)" },
      { label: "CONTRACT DUE", value: "28 Jun 2026 (Net 30)" },
      { label: "CREDIT HEALTH", value: "AAA · 94% Probability" },
    ],
    statusHighlight: "Real-Time Ledger Posted",
  },
  {
    id: "collection",
    stageNum: "06",
    stageName: "Collection",
    title: "Collections Orchestration",
    kicker: "STAGE 06 · PAYMENT LINK",
    badgeLabel: "Link Dispatched",
    badgeTone: "info",
    lead: "Timed payment reminder engages debtor with embedded UPI and virtual account rails, accelerating turnaround without client friction.",
    facts: [
      { label: "ENGAGEMENT", value: "Pre-Due Courtesy Notice" },
      { label: "CHANNELS", value: "WhatsApp Business + Email" },
      { label: "PAYMENT RAILS", value: "Dynamic UPI & Virtual A/c" },
      { label: "PORTAL URL", value: "flowone.pay/txn10482" },
    ],
    statusHighlight: "1-Click Direct Settlement",
  },
  {
    id: "bank",
    stageNum: "07",
    stageName: "Bank",
    title: "Bank Feed Ingestion",
    kicker: "STAGE 07 · REMITTANCE ARRIVED",
    badgeLabel: "₹5.90L CR Received",
    badgeTone: "success",
    lead: "Direct corporate bank feed synchronization. Incoming remittance of ₹5,90,000 arrives with raw UTR identifier from HDFC Bank.",
    facts: [
      { label: "BANK GATEWAY", value: "HDFC Corporate Feed" },
      { label: "INBOUND UTR", value: "UTR98204018274" },
      { label: "CREDIT AMOUNT", value: "+₹5,90,000.00 CR" },
      { label: "VALUE DATE", value: "24-Jun-2026 · Settled" },
    ],
    statusHighlight: "Bank Gateway Cleared",
  },
  {
    id: "reconciliation",
    stageNum: "08",
    stageName: "Reconciliation",
    title: "Automated Reconciliation",
    kicker: "STAGE 08 · BILATERAL MATCH",
    badgeLabel: "98.4% Matched",
    badgeTone: "success",
    lead: "Bank credit matches invoice INV-10482 at 98% confidence. Ledger clears and UTR is logged with zero statement ticking.",
    facts: [
      { label: "INVOICE MATCH", value: "INV-10482 (₹5,90,000)" },
      { label: "BANK REMITTANCE", value: "UTR98204018274" },
      { label: "CONFIDENCE", value: "98.4% Confidence Score" },
      { label: "LEDGER DRIFT", value: "₹0.00 (Zero Drift)" },
    ],
    statusHighlight: "Auto-Reconciled",
  },
  {
    id: "cashflow",
    stageNum: "09",
    stageName: "Cashflow",
    title: "Cash Liquidity & Treasury",
    kicker: "STAGE 09 · WORKING CAPITAL",
    badgeLabel: "Cash Realized",
    badgeTone: "success",
    lead: "Collected funds immediately unlock into available working capital, extending liquidity runway and funding next procurement cycles.",
    facts: [
      { label: "AVAILABLE CASH", value: "₹5,90,000.00 Liquid" },
      { label: "RUNWAY BOOST", value: "+4.2 Days Runway" },
      { label: "CYCLE VELOCITY", value: "-8 Days CCC Acceleration" },
      { label: "RECYCLING", value: "Procurement PO Funded" },
    ],
    statusHighlight: "Treasury In Sync",
  },
  {
    id: "decision",
    stageNum: "10",
    stageName: "Decision",
    title: "Executive Outcome",
    kicker: "STAGE 10 · LOOP COMPLETE",
    badgeLabel: "Strategic Clarity",
    badgeTone: "purple",
    lead: "The loop closes with verified intelligence. Commercial margin, DSO performance, and working capital impact are indexed into the CFO dashboard.",
    facts: [
      { label: "OPERATIONS", value: "125 Units Delivered" },
      { label: "STATUTORY TAX", value: "GST Validated & Filed" },
      { label: "SETTLEMENT", value: "100% Cash Realized" },
      { label: "INTELLIGENCE", value: "CFO Dashboard Indexed" },
    ],
    statusHighlight: "Closed-Circuit Complete",
  },
];

/* Helper to render clean SVG icons for each stage */
function StageIcon({ stageId, isDark }: { stageId: string; isDark: boolean }) {
  const strokeColor = isDark ? "#38BDF8" : "#0528F2";

  switch (stageId) {
    case "order":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case "inventory":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
        </svg>
      );
    case "invoice":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M8 7h8M8 11h8M8 15h5" />
        </svg>
      );
    case "gst":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "receivable":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "collection":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      );
    case "bank":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 2 7h20L12 2z" />
        </svg>
      );
    case "reconciliation":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
      );
    case "cashflow":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "decision":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return null;
  }
}

export interface LivingTransactionStackAProps {
  theme?: "light" | "dark";
  id?: string;
  className?: string;
}

export const LivingTransactionStackA = memo(function LivingTransactionStackA({
  theme = "light",
  id = "living-stack-a",
  className = "",
}: LivingTransactionStackAProps) {
  const isDark = theme === "dark";
  const [activeStageId, setActiveStageId] = useState<string>("order");

  // Track active card position on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Dynamic center dock threshold based on current viewport height
      const dockTop = typeof window !== "undefined" ? Math.max(60, window.innerHeight * 0.5 - 170) : 180;
      let currentActive = compactCardsData[0].id;

      for (let i = 0; i < compactCardsData.length; i++) {
        const el = document.getElementById(`${id}-card-${compactCardsData[i].id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const cardDockTop = dockTop - 24 + i * 13;
          // Card is active when it reaches within 25px of its sticky docking position
          if (rect.top <= cardDockTop + 25) {
            currentActive = compactCardsData[i].id;
          }
        }
      }

      setActiveStageId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [id]);

  const activeStageIndex = compactCardsData.findIndex((c) => c.id === activeStageId);
  const activeStage = compactCardsData[activeStageIndex] || compactCardsData[0];

  const handleJumpToStage = (stageId: string) => {
    const stageIndex = compactCardsData.findIndex((c) => c.id === stageId);
    const el = document.getElementById(`${id}-card-${stageId}`);
    if (el && stageIndex !== -1) {
      const dockTop = typeof window !== "undefined" ? Math.max(60, window.innerHeight * 0.5 - 170) : 180;
      const cardDockTop = dockTop - 24 + stageIndex * 13;
      const y = el.getBoundingClientRect().top + window.pageYOffset - cardDockTop;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id={id}
      className={`new-home-section living-stack-a-section ${isDark ? "is-dark-theme-section" : "is-light-theme-section"} ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="home-container">
        <div className="stack-compact-layout">
          {/* ==============================================================
              LEFT COLUMN: Clean, Clutter-Free Sticky Editorial Anchor
              (Signals removed per design requirement to eliminate visual clutter)
              ============================================================== */}
          <aside className="stack-compact-sticky-col">
            <div className="stack-compact-intro">
              {/* Eyebrow — FlowOne Standardized Modern Static Eyebrow Capsule */}
              <div className="hero-eyebrow-container">
                <div
                  className={`hero-modern-eyebrow is-static ${isDark ? "is-dark-theme" : ""}`}
                  role="note"
                  aria-label="The Living Transaction"
                >
                  <span className="hero-eyebrow-badge">
                    <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                    <span>TRANSACTION</span>
                  </span>
                  <span className="hero-eyebrow-title">THE LIVING TRANSACTION</span>
                  <span className="hero-eyebrow-arrow" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              <h2 id={`${id}-heading`} className="stack-compact-title">
                One transaction.<br />
                Connected from start to cash.
              </h2>

              <p className="stack-compact-desc">
                Follow a ₹5,00,000 order across operations, finance, compliance, collections and cash.
                Each operational stage stacks into a single, cohesive business reality.
              </p>

              {/* Minimalist Live Runway Progress HUD (Clean, compact replacement for the old 10-button signal cluster) */}
              <div className="stack-compact-meter-card" aria-label="Transaction progress summary">
                <div className="stack-compact-meter-head">
                  <span className="stack-compact-meter-dot" aria-hidden="true" />
                  <span className="stack-compact-meter-caption">LIVE RECONCILED RUNWAY</span>
                  <span className="stack-compact-stage-badge">
                    STAGE {activeStage.stageNum} / 10
                  </span>
                </div>

                <div className="stack-compact-meter-body">
                  <strong className="stack-compact-meter-active-name">{activeStage.stageName.toUpperCase()} ACTIVE</strong>
                  <span className="stack-compact-meter-sub">TXN-10482 · ₹5,90,000 In Sync</span>
                </div>

                {/* Micro Progress Track */}
                <div className="stack-compact-progress-track" aria-hidden="true">
                  <div
                    className="stack-compact-progress-fill"
                    style={{ width: `${((activeStageIndex + 1) / compactCardsData.length) * 100}%` }}
                  />
                </div>

                {/* Compact Interactive Dot Strip for Quick Jumping */}
                <div className="stack-compact-quick-dots" role="tablist" aria-label="Jump to transaction stage">
                  {compactCardsData.map((card, idx) => {
                    const isActive = card.id === activeStageId;
                    const isPassed = idx < activeStageIndex;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`stack-compact-dot-btn ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
                        onClick={() => handleJumpToStage(card.id)}
                        title={`Jump to ${card.stageNum} · ${card.stageName}`}
                      >
                        <span className="sr-only">{card.stageName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* ==============================================================
              RIGHT COLUMN: Redesigned Compact Cards Deck
              Inspired by Reference Image (Animated Off-Canvas Stacking Aesthetics)
              ============================================================== */}
          <div className="stack-compact-cards-col" role="feed" aria-label="Transaction stages stacked deck">
            {compactCardsData.map((card, index) => {
              // Vertical center aligned with left editorial column and 13px distinct card offset
              const topOffset = `calc(var(--compact-dock-top, clamp(3.75rem, calc(50vh - 170px), 13rem)) - 24px + ${index * 13}px)`;
              const zIndex = index + 1;
              const isCurrentActive = card.id === activeStageId;

              return (
                <article
                  key={card.id}
                  id={`${id}-card-${card.id}`}
                  className={`stack-compact-card stack-compact-card--${card.id} ${isDark ? "is-dark-card" : "is-light-card"} ${isCurrentActive ? "is-current-active" : ""}`}
                  style={{
                    top: topOffset,
                    zIndex: zIndex,
                  }}
                  aria-label={`Stage ${card.stageNum}: ${card.title}`}
                >
                  {/* Top Bar / Kicker Row */}
                  <div className="stack-compact-top-meta">
                    <div className="stack-compact-kicker-group">
                      <span className="stack-compact-num-pill">{card.stageNum}</span>
                      <span className="stack-compact-kicker">{card.kicker}</span>
                    </div>
                    <div className="stack-compact-status-chip">
                      <span className={`status-dot status-dot--${card.badgeTone}`} aria-hidden="true" />
                      <span>{card.badgeLabel}</span>
                    </div>
                  </div>

                  {/* Primary Card Header: Circular Icon + Title (Direct Inspiration from Reference Image) */}
                  <header className="stack-compact-card-header">
                    <div className="stack-compact-icon-badge" aria-hidden="true">
                      <StageIcon stageId={card.id} isDark={isDark} />
                    </div>
                    <div className="stack-compact-title-wrap">
                      <h3 className="stack-compact-card-title">{card.title}</h3>
                      <span className="stack-compact-id-tag">TXN-10482 · Ananya Enterprises</span>
                    </div>
                  </header>

                  {/* Clean Subtle Horizontal Divider Line (Reference Image Anchor) */}
                  <div className="stack-compact-divider" aria-hidden="true" />

                  {/* Body: Condensed Narrative Explanation */}
                  <p className="stack-compact-narrative">
                    {card.lead}
                  </p>

                  {/* Essential Details Strip: Clean 4-Item Context Grid */}
                  <div className="stack-compact-facts-grid" role="list" aria-label="Stage essential facts">
                    {card.facts.map((fact, fIdx) => (
                      <div key={fIdx} className="stack-compact-fact-tile" role="listitem">
                        <span className="fact-label">{fact.label}</span>
                        <strong className="fact-value" title={fact.value}>{fact.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Card Footnote / Audit Assurance Row */}
                  <footer className="stack-compact-card-footer">
                    <div className="stack-compact-assurance">
                      <span className="assurance-check">✓</span>
                      <span className="assurance-text">{card.statusHighlight}</span>
                    </div>
                    <span className="stack-compact-counter">
                      Stage {card.stageNum} of 10
                    </span>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default LivingTransactionStackA;

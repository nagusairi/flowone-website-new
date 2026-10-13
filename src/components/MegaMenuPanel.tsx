import React, { useState, useEffect, useRef } from "react";
import "./mega-menu-panel.css";

/* ==========================================================================
   flowOne Mega Menu Types & Data Structures
   ========================================================================== */

export type MenuKey = "Products" | "Platform" | "Company" | "Support";

export interface MenuItemData {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  badgeTone?: "brand" | "ai" | "new";
  iconName?: string;
  href?: string;
}

export interface MenuColumnData {
  id: string;
  heading: string;
  items: MenuItemData[];
}

export interface SpotlightCardData {
  badge: string;
  title: string;
  description: string;
  metrics?: Array<{ label: string; value: string }>;
  actionLabel: string;
  actionHref?: string;
  theme?: "brand" | "ai" | "dark";
}

export interface MenuCategoryData {
  columns: MenuColumnData[];
  spotlight?: SpotlightCardData;
  footer?: {
    prompt: string;
    actionLabel: string;
    actionHref?: string;
  };
}

/* ==========================================================================
   Content Definition (Placeholders matching live WordPress architecture)
   ========================================================================== */

export const megaMenuData: Record<MenuKey, MenuCategoryData> = {
  Products: {
    columns: [
      {
        id: "finance-ops",
        heading: "FINANCE & COMPLIANCE",
        items: [
          {
            id: "c2c",
            label: "Customer-to-Cash",
            description: "Accelerate collections, automate AR invoices & mitigate credit risk.",
            badge: "CORE",
            badgeTone: "brand",
            iconName: "c2c",
            href: "#customer-to-cash",
          },
          {
            id: "p2p",
            label: "Procure-to-Pay",
            description: "Automate PO approvals, 3-way matching & MSME 45-day vendor compliance.",
            iconName: "p2p",
            href: "#procure-to-pay",
          },
          {
            id: "cash-banking",
            label: "Cash & Multi-Bank Recon",
            description: "Real-time bank statement feeds, automated matching & daily cash forecasts.",
            iconName: "bank",
            href: "#cash-banking",
          },
          {
            id: "gst",
            label: "GST & E-Invoicing",
            description: "Instant IRN generation, automated E-Way bills & GSTR-2B reconciliation.",
            badge: "STATUTORY",
            badgeTone: "brand",
            iconName: "tax",
            href: "#gst-compliance",
          },
          {
            id: "ledger",
            label: "General Ledger & Close",
            description: "Unified continuous accounting ledger with zero month-end reconciliation lag.",
            iconName: "ledger",
            href: "#general-ledger",
          },
          {
            id: "msme",
            label: "MSME 45-Day Governance",
            description: "Track vendor registration status, payment deadlines & Section 43B(h) compliance.",
            iconName: "msme",
            href: "#msme-compliance",
          },
        ],
      },
      {
        id: "ops-automation",
        heading: "OPERATIONS & AUTOMATION",
        items: [
          {
            id: "inventory",
            label: "Inventory Intelligence",
            description: "Multi-warehouse live stock availability, batch tracking & auto-replenishment.",
            iconName: "inventory",
            href: "#inventory",
          },
          {
            id: "multi-entity",
            label: "Multi-Entity Consolidation",
            description: "Unify branches, warehouses and multi-state GSTINs onto a single truth plane.",
            badge: "ENTERPRISE",
            badgeTone: "brand",
            iconName: "entity",
            href: "#multi-entity",
          },
          {
            id: "order-dispatch",
            label: "Order & Dispatch Velocity",
            description: "Sync sales orders to warehouse picking lists and automated delivery challans.",
            iconName: "dispatch",
            href: "#order-dispatch",
          },
          {
            id: "credit-risk",
            label: "Dynamic Credit Scoring",
            description: "Assess counterparty risk and dynamically enforce credit limits before dispatch.",
            iconName: "credit",
            href: "#credit-scoring",
          },
          {
            id: "bank-connect",
            label: "Automated Banking Rails",
            description: "Direct API banking integration with HDFC, ICICI, Axis and SBI accounts.",
            iconName: "connect",
            href: "#banking-rails",
          },
          {
            id: "ai-copilot",
            label: "AI Copilot & CFO Cockpit",
            description: "Natural-language query engine, variance anomaly detection & proactive alerts.",
            badge: "AI 2.0",
            badgeTone: "ai",
            iconName: "spark",
            href: "#ai-copilot",
          },
        ],
      },
    ],
    spotlight: {
      badge: "LIVE ARCHITECTURE",
      title: "The Living Transaction",
      description: "Every sales order, inventory pick, invoice, GST clearance, and bank reconciliation moves as one atomic entity—with zero data drift.",
      metrics: [
        { label: "SYNC LATENCY", value: "14ms" },
        { label: "BANK RECON", value: "99.8%" },
        { label: "ERP SILOS", value: "ZERO" },
      ],
      actionLabel: "See Architecture in Motion",
      actionHref: "#living-transaction",
      theme: "brand",
    },
    footer: {
      prompt: "Ready to unify your business operations across finance, stock, and compliance?",
      actionLabel: "Book a 20-Min Architecture Walkthrough",
      actionHref: "#book-demo",
    },
  },

  Platform: {
    columns: [
      {
        id: "platform-core",
        heading: "PLATFORM ARCHITECTURE",
        items: [
          {
            id: "unified-fabric",
            label: "Continuous Transaction Engine",
            description: "Event-driven distributed ledger engine guaranteeing zero drift across enterprise silos.",
            badge: "PATENTED",
            badgeTone: "brand",
            iconName: "c2c",
            href: "#transaction-engine",
          },
          {
            id: "integration-mesh",
            label: "Composable Integration Mesh",
            description: "Bidirectional connectors for Tally Prime, SAP ECC/S4, Zoho Books and custom ERPs.",
            iconName: "connect",
            href: "#integrations",
          },
          {
            id: "sovereign-cloud",
            label: "Sovereign Indian Cloud & Security",
            description: "100% data residency in Tier-IV Indian data centres. SOC 2 Type II, ISO 27001 & RBI compliant.",
            badge: "SECURE",
            badgeTone: "brand",
            iconName: "entity",
            href: "#security-cloud",
          },
          {
            id: "role-perspectives",
            label: "Role-Governed Perspectives",
            description: "Contextual, customized operational workspaces for CFOs, controllers, ops and sales teams.",
            iconName: "spark",
            href: "#role-perspectives",
          },
        ],
      },
    ],
    spotlight: {
      badge: "DATA SOVEREIGNTY",
      title: "Engineered for Indian Enterprise",
      description: "Built from the ground up for Indian statutory frameworks, banking APIs, and high-velocity multi-state operations.",
      metrics: [
        { label: "DATA RESIDENCY", value: "100% IN" },
        { label: "ENCRYPTION", value: "AES-256" },
        { label: "UPTIME SLA", value: "99.98%" },
      ],
      actionLabel: "Read Security Whitepaper",
      actionHref: "#security-docs",
      theme: "dark",
    },
    footer: {
      prompt: "Looking for developer documentation, Webhooks, or API authentication specs?",
      actionLabel: "Explore Developer Docs & APIs",
      actionHref: "#api-docs",
    },
  },

  Company: {
    columns: [
      {
        id: "company-about",
        heading: "ABOUT FLOWONE",
        items: [
          {
            id: "mission",
            label: "About flowOne",
            description: "Our mission to build the unified operating nervous system for Indian enterprise.",
            iconName: "c2c",
            href: "#about-us",
          },
          {
            id: "founders-diary",
            label: "Founder's Diary",
            description: "Firsthand reflections on building sovereign business software, architecture and culture.",
            badge: "FEATURED",
            badgeTone: "brand",
            iconName: "spark",
            href: "/founders-diary/",
          },
          {
            id: "careers",
            label: "Careers & Engineering",
            description: "Join a high-cadence team solving deep distributed systems and financial automation.",
            badge: "HIRING",
            badgeTone: "new",
            iconName: "p2p",
            href: "#careers",
          },
          {
            id: "contact-hubs",
            label: "Contact & Regional Hubs",
            description: "Executive offices in Mumbai, Bengaluru, Delhi NCR and Singapore.",
            iconName: "entity",
            href: "#contact",
          },
        ],
      },
    ],
    spotlight: {
      badge: "FOUNDER MANIFESTO",
      title: "Why flowOne Exists",
      description: "Indian businesses operate in an increasingly fast, highly regulated environment. Patching 5 disconnected tools is holding them back. We built one flow.",
      actionLabel: "Read the Founder Letter",
      actionHref: "/founders-diary/",
      theme: "brand",
    },
    footer: {
      prompt: "Have a partnership inquiry or want to connect with our executive leadership team?",
      actionLabel: "Get in Touch With Leadership",
      actionHref: "#contact-leadership",
    },
  },

  Support: {
    columns: [
      {
        id: "support-resources",
        heading: "HELP & RESOURCES",
        items: [
          {
            id: "knowledge-base",
            label: "Documentation & Guides",
            description: "Step-by-step playbooks for bank integration, GST compliance, and system onboarding.",
            iconName: "tax",
            href: "#docs",
          },
          {
            id: "tax-guides",
            label: "Statutory & Tax Helpdesk",
            description: "Up-to-date resources on E-Invoicing amendments, GSTR-2B matching and MSME rules.",
            iconName: "ledger",
            href: "#statutory-help",
          },
          {
            id: "status-uptime",
            label: "System Status & Health",
            description: "Live real-time telemetry on API endpoints, GST portal connectors and banking rails.",
            badge: "99.98%",
            badgeTone: "brand",
            iconName: "connect",
            href: "#system-status",
          },
          {
            id: "support-portal",
            label: "Dedicated Support Portal",
            description: "Raise tickets, track SLA resolution timeframes, or talk to an enterprise account manager.",
            iconName: "msme",
            href: "#support-tickets",
          },
        ],
      },
    ],
    spotlight: {
      badge: "ENTERPRISE SLA",
      title: "Dedicated 24/7 Operations Desk",
      description: "Every enterprise client receives a dedicated solutions engineer, 15-minute emergency SLA, and active monitoring.",
      metrics: [
        { label: "P1 SLA", value: "<15 min" },
        { label: "CSAT SCORE", value: "4.9/5.0" },
        { label: "COVERAGE", value: "24/7/365" },
      ],
      actionLabel: "Visit Enterprise Support Desk",
      actionHref: "#support-desk",
      theme: "ai",
    },
    footer: {
      prompt: "Encountering a statutory deadline or urgent bank reconciliation issue?",
      actionLabel: "Contact Emergency Support Line",
      actionHref: "#emergency-support",
    },
  },
};

/* ==========================================================================
   SVG Micro-Icons for Menu Items
   ========================================================================== */

function MenuSvgIcon({ name }: { name?: string }) {
  switch (name) {
    case "c2c":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <path d="M7 15h2" />
          <path d="M15 15h2" />
        </svg>
      );
    case "p2p":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      );
    case "bank":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21h18" />
          <path d="M3 10h18" />
          <path d="M5 6l7-3 7 3" />
          <path d="M6 10v8" />
          <path d="M10 10v8" />
          <path d="M14 10v8" />
          <path d="M18 10v8" />
        </svg>
      );
    case "tax":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case "ledger":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="14" y2="10" />
        </svg>
      );
    case "msme":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "inventory":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
      );
    case "entity":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "dispatch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "credit":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "connect":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "spark":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Z" />
          <path d="m18 15 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" />
        </svg>
      );
  }
}

/* ==========================================================================
   MegaMenuPanel Component (Full Handoff Component)
   ========================================================================== */

export interface MegaMenuPanelProps {
  menuKey: MenuKey;
  isOpen: boolean;
  isClosing?: boolean;
  onNavigate?: (href: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MegaMenuPanel({
  menuKey,
  isOpen,
  isClosing = false,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuPanelProps) {
  const data = megaMenuData[menuKey];
  if (!isOpen && !isClosing) return null;

  const modifierClass = `fo-megapanel--${menuKey.toLowerCase()}`;
  const stateClass = isClosing ? "is-closing" : "is-open";

  return (
    <div
      className={`fo-megapanel ${modifierClass} ${stateClass}`}
      role="region"
      aria-label={`${menuKey} navigation panel`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 1. Hairline Signature Gradient Beam */}
      <div className="fo-megapanel__beam" aria-hidden="true" />

      {/* 2. Main Boxed Container */}
      <div className="fo-megapanel__container">
        <div className="fo-megapanel__body">
          {/* Left Area: Navigation Columns Grid */}
          <div className="fo-megapanel__nav-section">
            {data.columns.map(column => (
              <div className="fo-megapanel__column" key={column.id}>
                {/* Column Heading Category Kicker */}
                <div className="fo-megapanel__column-header">
                  <span className="fo-megapanel__column-heading">
                    {column.heading}
                  </span>
                </div>

                {/* Vertical Items List */}
                <div className="fo-megapanel__list" role="list">
                  {column.items.map((item, index) => (
                    <a
                      key={item.id}
                      href={item.href || "#"}
                      className="fo-megapanel__item"
                      role="listitem"
                      onClick={e => {
                        if (onNavigate && item.href) {
                          e.preventDefault();
                          onNavigate(item.href);
                        }
                      }}
                      style={{ "--item-index": index } as React.CSSProperties}
                    >
                      {/* Item Icon */}
                      <span className="fo-megapanel__item-icon" aria-hidden="true">
                        <MenuSvgIcon name={item.iconName} />
                      </span>

                      {/* Item Text Block */}
                      <div className="fo-megapanel__item-content">
                        <div className="fo-megapanel__item-title-row">
                          <strong className="fo-megapanel__item-label">
                            {item.label}
                          </strong>
                          {item.badge && (
                            <span className={`fo-megapanel__item-badge fo-megapanel__item-badge--${item.badgeTone || "brand"}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="fo-megapanel__item-desc">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Hover Arrow Action Indicator */}
                      <span className="fo-megapanel__item-arrow" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10" />
                          <path d="M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Area: Architecture / Feature Spotlight Card */}
          {data.spotlight && (
            <aside className={`fo-megapanel__spotlight fo-megapanel__spotlight--${data.spotlight.theme || "brand"}`}>
              {/* Corner Reticle Tech Brackets */}
              <span className="fo-spotlight-reticle fo-spotlight-reticle--tl" aria-hidden="true" />
              <span className="fo-spotlight-reticle fo-spotlight-reticle--tr" aria-hidden="true" />
              <span className="fo-spotlight-reticle fo-spotlight-reticle--bl" aria-hidden="true" />
              <span className="fo-spotlight-reticle fo-spotlight-reticle--br" aria-hidden="true" />

              <div className="fo-megapanel__spotlight-header">
                <span className="fo-megapanel__spotlight-badge">
                  <span className="fo-spotlight-beacon-dot" aria-hidden="true" />
                  {data.spotlight.badge}
                </span>
              </div>

              <div className="fo-megapanel__spotlight-content">
                <h4 className="fo-megapanel__spotlight-title">
                  {data.spotlight.title}
                </h4>
                <p className="fo-megapanel__spotlight-desc">
                  {data.spotlight.description}
                </p>
              </div>

              {/* Optional Telemetry Metrics Grid */}
              {data.spotlight.metrics && (
                <div className="fo-megapanel__spotlight-metrics">
                  {data.spotlight.metrics.map(metric => (
                    <div className="fo-spotlight-metric-cell" key={metric.label}>
                      <span className="fo-spotlight-metric-label">{metric.label}</span>
                      <strong className="fo-spotlight-metric-val">{metric.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Spotlight Bottom Action */}
              <div className="fo-megapanel__spotlight-footer">
                <a
                  href={data.spotlight.actionHref || "#"}
                  className="fo-megapanel__spotlight-action"
                  onClick={e => {
                    if (onNavigate && data.spotlight?.actionHref) {
                      e.preventDefault();
                      onNavigate(data.spotlight.actionHref);
                    }
                  }}
                >
                  <span>{data.spotlight.actionLabel}</span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8h10" />
                    <path d="M9 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </aside>
          )}
        </div>

        {/* 3. Panel Footer CTA Bar */}
        {data.footer && (
          <div className="fo-megapanel__footer">
            <div className="fo-megapanel__footer-left">
              <span className="fo-megapanel__footer-spark" aria-hidden="true">✦</span>
              <p className="fo-megapanel__footer-prompt">
                {data.footer.prompt}
              </p>
            </div>
            <div className="fo-megapanel__footer-right">
              <a
                href={data.footer.actionHref || "#"}
                className="fo-megapanel__footer-btn"
                onClick={e => {
                  if (onNavigate && data.footer?.actionHref) {
                    e.preventDefault();
                    onNavigate(data.footer.actionHref);
                  }
                }}
              >
                <span>{data.footer.actionLabel}</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10" />
                  <path d="M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

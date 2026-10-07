import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "./flowone";

type MenuKey = "Solutions" | "Platform" | "AI" | "Resources" | "Company";
type MenuGroup = {
  eyebrow: string;
  title: string;
  items: Array<{ label: string; description?: string }>;
  hoverTelemetry?: TelemetryObject;
};

type TelemetryObject = {
  headerLabel: string;
  badgeLabel: string;
  objectId: string;
  heroValue: string;
  subtitle: string;
  metrics: Array<{ label: string; value: string }>;
  chips: string[];
  actionLabel: string;
  accent?: "ai";
};

export const navigationContent: Record<MenuKey, { groups: MenuGroup[]; telemetry: TelemetryObject }> = {
  Solutions: {
    groups: [
      {
        eyebrow: "PILLAR 01 · REVENUE",
        title: "Get Paid Faster",
        items: ["Customer-to-Cash", "Accounts Receivable", "Credit & Risk", "Collections & Payments"].map(label => ({
          label,
          description: label === "Customer-to-Cash" ? "Connect every step from order to available cash." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PILLAR 01 · REVENUE & RECEIVABLES",
          badgeLabel: "FOCUS WORKFLOW",
          objectId: "ACCOUNTS RECEIVABLE LIFECYCLE",
          heroValue: "Accelerate Cash Velocity",
          subtitle: "Automates the accounts receivable journey from customer invoice dispatch to payment settlement—eliminating DSO delays, mitigating counterparty credit risk, and automating multi-channel collection follow-ups.",
          metrics: [
            { label: "CORE GOAL", value: "DSO Acceleration" },
            { label: "COLLECTIONS", value: "Auto-Reminders" },
            { label: "CREDIT RISK", value: "Dynamic Limits" },
          ],
          chips: ["Customer-to-Cash", "Accounts Receivable", "Credit Scoring", "Collections & Payments", "Payment Links"],
          actionLabel: "View Receivables & Cash Flow",
        },
      },
      {
        eyebrow: "PILLAR 02 · SPEND",
        title: "Control Procurement",
        items: ["Procure-to-Pay", "Purchase Orders", "Accounts Payable", "Vendor Management"].map(label => ({
          label,
          description: label === "Procure-to-Pay" ? "Control spend from request through settlement." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PILLAR 02 · SPEND & PROCUREMENT",
          badgeLabel: "FOCUS WORKFLOW",
          objectId: "PROCURE-TO-PAY CONTROLS",
          heroValue: "Spend Governance & Settlement",
          subtitle: "Enforces purchasing controls before funds leave the company. Automates multi-level purchase order approvals, 3-way invoice matching, verified vendor onboarding, and MSME 45-day settlement compliance.",
          metrics: [
            { label: "MATCHING", value: "3-Way Verified" },
            { label: "CONTROLS", value: "Budget Gates" },
            { label: "COMPLIANCE", value: "MSME 45-Day" },
          ],
          chips: ["Procure-to-Pay", "Purchase Orders", "Accounts Payable", "Vendor Management", "MSME Tracking"],
          actionLabel: "View Procurement Controls",
        },
      },
      {
        eyebrow: "PILLAR 03 · WAREHOUSE",
        title: "Run Inventory Better",
        items: ["Inventory Intelligence", "Warehouse Management", "Stock & Replenishment", "Order Management"].map(label => ({
          label,
          description: label === "Inventory Intelligence" ? "Real-time stock velocity & warehouse allocation." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PILLAR 03 · INVENTORY & WAREHOUSE",
          badgeLabel: "FOCUS WORKFLOW",
          objectId: "STOCK ALLOCATION RUNTIME",
          heroValue: "Live Stock Allocation & Velocity",
          subtitle: "Synchronizes multi-warehouse stock availability with live sales orders and procurement pipelines. Prevents stockouts, optimizes batch reorder points, and tracks dispatch velocity across facilities.",
          metrics: [
            { label: "VISIBILITY", value: "Multi-Warehouse" },
            { label: "ALLOCATION", value: "Real-Time Lock" },
            { label: "REORDER", value: "Auto-Thresholds" },
          ],
          chips: ["Inventory Intelligence", "Warehouse Management", "Stock & Replenishment", "Order Management", "Batch Tracking"],
          actionLabel: "View Inventory Workflows",
        },
      },
      {
        eyebrow: "PILLAR 04 · TREASURY",
        title: "Control Cash & Banking",
        items: ["Cash & Banking", "Bank Reconciliation", "Cash Flow Forecasting", "Financial Visibility"].map(label => ({
          label,
          description: label === "Cash & Banking" ? "Automated multi-bank reconciliation & cash visibility." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PILLAR 04 · TREASURY & LIQUIDITY",
          badgeLabel: "FOCUS WORKFLOW",
          objectId: "MULTI-BANK RECON ENGINE",
          heroValue: "Automated Banking & Cash Flow",
          subtitle: "Connects enterprise bank accounts directly to commercial ledgers. Reconciles high-volume NEFT, RTGS, and UPI receipts against open invoices and delivers forward-looking cash forecasting.",
          metrics: [
            { label: "CONNECTIVITY", value: "Direct Bank APIs" },
            { label: "RECONCILIATION", value: "Real-Time Matching" },
            { label: "TREASURY", value: "Cash Forecasting" },
          ],
          chips: ["Cash & Banking", "Bank Reconciliation", "Cash Flow Forecasting", "Financial Visibility", "Statement Feeds"],
          actionLabel: "View Cash & Banking Workflows",
        },
      },
      {
        eyebrow: "PILLAR 05 · STATUTORY",
        title: "Stay Compliant",
        items: ["GST Hub", "E-Invoicing", "E-Way Bills", "GST Reconciliation"].map(label => ({
          label,
          description: label === "GST Hub" ? "Automated e-invoicing, IRN signing & return filing." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PILLAR 05 · STATUTORY & TAX",
          badgeLabel: "FOCUS WORKFLOW",
          objectId: "NATIVE COMPLIANCE GATEWAY",
          heroValue: "Automated GST & Statutory Hub",
          subtitle: "Embedded compliance engine integrated directly with GSTN and IRP portals. Generates e-invoices with signed IRN QR codes, clears e-way bills on dispatch, and automates GSTR-1 to GSTR-2B reconciliation.",
          metrics: [
            { label: "GATEWAYS", value: "Direct GSTN / IRP" },
            { label: "E-INVOICING", value: "Automated IRN" },
            { label: "AUDIT", value: "Statutory Trace" },
          ],
          chips: ["GST Hub", "E-Invoicing", "E-Way Bills", "GST Reconciliation", "GSTR-1 ↔ 2B Sync"],
          actionLabel: "View Compliance Hub",
        },
      },
    ],
    telemetry: {
      headerLabel: "SOLUTIONS SUITE",
      badgeLabel: "EXECUTIVE SYNOPSIS",
      objectId: "OPERATIONAL DOMAIN OVERVIEW",
      heroValue: "The 5-Pillar Connected Suite",
      subtitle: "Unifies the entire operational and financial lifecycle of enterprise business—connecting customer sales orders, spend governance, multi-warehouse inventory, bank liquidity, and direct statutory GST compliance into one continuous transaction flow.",
      metrics: [
        { label: "LIFECYCLE", value: "Order to Cash" },
        { label: "INTEGRATION", value: "Zero-Bridge Sync" },
        { label: "COMPLIANCE", value: "Native GST & IRN" },
      ],
      chips: ["Order-to-Cash", "Procure-to-Pay", "Warehouse Allocation", "Multi-Bank Recon", "Statutory E-Way"],
      actionLabel: "Explore All Solutions",
    },
  },
  Platform: {
    groups: [
      {
        eyebrow: "FOUNDATION 01 · SYSTEM",
        title: "Platform Architecture",
        items: ["Platform Overview", "Finance Operations", "Business Operations", "Workflow Automation"].map(label => ({
          label,
          description: label === "Platform Overview" ? "One connected operating system for business." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PLATFORM · CORE ENGINE",
          badgeLabel: "ARCHITECTURAL SPEC",
          objectId: "SYSTEM OVERVIEW",
          heroValue: "Unified Operating System",
          subtitle: "A modern transactional architecture unifying finance, business operations, and automated workflows into one deterministic system of record.",
          metrics: [
            { label: "DATA FABRIC", value: "Unified Model" },
            { label: "ORCHESTRATION", value: "Event-Driven" },
            { label: "RELIABILITY", value: "Transactional ACID" },
          ],
          chips: ["Platform Overview", "Finance Operations", "Business Operations", "Workflow Automation"],
          actionLabel: "Explore Core Platform",
        },
      },
      {
        eyebrow: "FOUNDATION 02 · PIPELINES",
        title: "Business Flows",
        items: ["Customer → Cash", "Procure → Pay", "Inventory → Cash", "Record → Report"].map(label => ({
          label,
          description: label === "Customer → Cash" ? "End-to-end deterministic transaction journey." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PLATFORM · TRANSACTION PIPELINES",
          badgeLabel: "FLOW ARCHITECTURE",
          objectId: "CROSS-FUNCTIONAL JOURNEYS",
          heroValue: "End-to-End Event Pipelines",
          subtitle: "Maps enterprise operations as continuous journeys: Customer to Cash, Procure to Pay, Inventory to Cash, and Record to Report—preserving full transaction context across department boundaries.",
          metrics: [
            { label: "FLOW MODEL", value: "Unbroken Lineage" },
            { label: "STAGES", value: "Multi-Department" },
            { label: "TRACKING", value: "State-Machine" },
          ],
          chips: ["Customer → Cash", "Procure → Pay", "Inventory → Cash", "Record → Report"],
          actionLabel: "Explore Business Flows",
        },
      },
      {
        eyebrow: "FOUNDATION 03 · RUNTIME",
        title: "Platform Capabilities",
        items: ["Document Intelligence", "Approvals & Workflows", "Integrations", "Reporting & Analytics"].map(label => ({
          label,
          description: label === "Document Intelligence" ? "AI-powered transaction data extraction." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PLATFORM · EXTENSIBILITY",
          badgeLabel: "INFRASTRUCTURE",
          objectId: "INTELLIGENCE & INTEGRATIONS",
          heroValue: "Extensible Infrastructure",
          subtitle: "Native intelligence extraction, multi-tier approval matrices, open integration adapters for legacy ERPs, and real-time operational reporting.",
          metrics: [
            { label: "EXTRACTION", value: "Document OCR" },
            { label: "APPROVALS", value: "Policy Matrices" },
            { label: "APIS", value: "REST / Webhooks" },
          ],
          chips: ["Document Intelligence", "Approvals & Workflows", "Integrations", "Reporting & Analytics"],
          actionLabel: "Explore Capabilities",
        },
      },
      {
        eyebrow: "FOUNDATION 04 · SECURITY",
        title: "Security & Trust",
        items: ["Security", "Compliance", "Data & Privacy"].map(label => ({
          label,
          description: label === "Security" ? "Institutional data residency & governance." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "PLATFORM · INSTITUTIONAL TRUST",
          badgeLabel: "DATA RESIDENCY",
          objectId: "GOVERNANCE STANDARDS",
          heroValue: "Institutional Security & Residency",
          subtitle: "Enterprise data isolation, AES-256 encryption at rest and in transit, India-only data residency, and deterministic cryptographic audit logging.",
          metrics: [
            { label: "RESIDENCY", value: "India Sovereign Vault" },
            { label: "ENCRYPTION", value: "AES-256-GCM" },
            { label: "ACCESS", value: "Role-Based & MFA" },
          ],
          chips: ["Security", "Compliance", "Data & Privacy", "Audit Lineage"],
          actionLabel: "View Security Architecture",
        },
      },
    ],
    telemetry: {
      headerLabel: "PLATFORM FOUNDATION",
      badgeLabel: "SYSTEM ARCHITECTURE",
      objectId: "CORE OPERATING ENGINE",
      heroValue: "The Unified Event Fabric",
      subtitle: "The foundational technology behind flowOne. Replaces disconnected ERP modules and spreadsheet workarounds with an append-only transaction bus, deterministic double-entry posting, and native integrations with 48+ Indian banks and GSTN gateways.",
      metrics: [
        { label: "LEDGER MODEL", value: "Append-Only" },
        { label: "POSTING", value: "Deterministic" },
        { label: "GATEWAYS", value: "48+ Banks & GSTN" },
      ],
      chips: ["Event Stream", "Continuous Audit Trail", "Statutory Rails", "REST & Webhooks", "Maker-Checker"],
      actionLabel: "Explore Platform Architecture",
    },
  },
  AI: {
    groups: [
      {
        eyebrow: "INTELLIGENCE 01 · TRANSACTION AI",
        title: "AI Inside The Flow",
        items: [
          "AI Business Agent",
          "Document Intelligence",
          "AI Invoice Processing",
          "AI Bank Reconciliation",
          "Cash Flow Forecasting",
        ].map(label => ({
          label,
          description: label === "AI Business Agent" ? "Contextual intelligence that understands and acts." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "TRANSACTION AI · DECISION ENGINES",
          badgeLabel: "EMBEDDED INTELLIGENCE",
          objectId: "DOMAIN-SPECIFIC MODELS",
          heroValue: "Operational Intelligence",
          subtitle: "Specialized machine learning models trained on business transaction semantics: invoice schema parsing, ledger anomaly detection, payment probability scoring, and automated bank record reconciliation.",
          metrics: [
            { label: "PARSING", value: "Multi-Format OCR" },
            { label: "ANOMALIES", value: "Real-Time Alerts" },
            { label: "PREDICTION", value: "Settlement Windows" },
          ],
          chips: ["AI Business Agent", "Document Intelligence", "AI Invoice Processing", "AI Bank Reconciliation", "Cash Flow Forecasting"],
          actionLabel: "View AI Engines",
          accent: "ai",
        },
      },
      {
        eyebrow: "INTELLIGENCE 02 · COMMUNICATIONS",
        title: "Channel Intelligence",
        items: [
          { label: "WhatsApp Intelligence", description: "Conversational collections, payment links & live status over WhatsApp." },
          { label: "Email Intelligence", description: "Automated inbox parsing & invoice attachment extraction." },
          { label: "Collections Intelligence" },
          { label: "Credit Risk Intelligence" },
          { label: "Anomaly Detection" },
        ],
        hoverTelemetry: {
          headerLabel: "CHANNEL AI · CONVERSATIONAL COMMS",
          badgeLabel: "VERIFIED CHANNELS",
          objectId: "COMMUNICATION INTELLIGENCE",
          heroValue: "Conversational Transaction Rails",
          subtitle: "Engages counterparties directly over verified WhatsApp Business and enterprise email—reading buyer replies, dispatching signed e-invoices with payment links, and automating follow-up cycles.",
          metrics: [
            { label: "WHATSAPP", value: "Verified Business API" },
            { label: "EMAIL INBOX", value: "Automated AP/AR OCR" },
            { label: "COLLECTIONS", value: "Conversational Nudges" },
          ],
          chips: ["WhatsApp Intelligence", "Email Intelligence", "Collections Intelligence", "Credit Risk Intelligence", "Anomaly Detection"],
          actionLabel: "View Communication AI",
          accent: "ai",
        },
      },
      {
        eyebrow: "INTELLIGENCE 03 · EXECUTION",
        title: "Autonomous Workflows",
        items: [
          { label: "Smart Approvals", description: "Policy-driven automated clearances." },
          { label: "Automated Actions" },
          { label: "Exception Management" },
          { label: "Policy Clearance Matrix" },
        ],
        hoverTelemetry: {
          headerLabel: "AI WORKFLOWS · POLICY AUTOMATION",
          badgeLabel: "GOVERNANCE GATES",
          objectId: "EXECUTION RUNTIME",
          heroValue: "Policy-Governed Autonomy",
          subtitle: "Translates AI recommendations into verified enterprise actions: auto-approving compliant low-risk invoices, preparing bank reconciliation batches, and escalating anomalies to designated controllers.",
          metrics: [
            { label: "OVERSIGHT", value: "Maker-Checker" },
            { label: "EXCEPTIONS", value: "Auto-Routing" },
            { label: "AUDIT", value: "Deterministic Log" },
          ],
          chips: ["Smart Approvals", "Automated Actions", "Exception Management", "Policy Matrix"],
          actionLabel: "View AI Workflows",
          accent: "ai",
        },
      },
    ],
    telemetry: {
      headerLabel: "AUTONOMOUS ENGINE",
      badgeLabel: "CAPABILITY OVERVIEW",
      objectId: "AI INSIDE THE FLOW",
      heroValue: "Context-Aware Decision Runtime",
      subtitle: "Artificial intelligence engineered directly into transaction state transitions—extracting unstructured documents, communicating over WhatsApp and email, predicting settlement timelines, and preparing bank matches under strict policy-governed human oversight.",
      metrics: [
        { label: "EXECUTION", value: "Embedded in Flow" },
        { label: "CHANNELS", value: "WhatsApp & Email" },
        { label: "GOVERNANCE", value: "Human-in-the-Loop" },
      ],
      chips: ["Document OCR", "WhatsApp Comms", "Email Ingestion", "Auto Bank Recon", "Policy Clearance"],
      actionLabel: "Explore flowOne AI System",
      accent: "ai",
    },
  },
  Resources: {
    groups: [
      {
        eyebrow: "DOCS 01 · EDUCATION",
        title: "Guides & Playbooks",
        items: ["Blog", "Finance Guides", "GST Guides", "Cash Flow Guides"].map(label => ({
          label,
          description: label === "Blog" ? "Finance, GST, AI and product education." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "KNOWLEDGE · GUIDES & PLAYBOOKS",
          badgeLabel: "STATUTORY DOCS",
          objectId: "PRACTITIONER EDUCATION",
          heroValue: "Operational & Tax Handbooks",
          subtitle: "Comprehensive walkthroughs on Indian GST e-invoicing compliance, MSME 45-day vendor payment regulations, cash flow forecasting methodologies, and accounts receivable management.",
          metrics: [
            { label: "TAX DOCS", value: "GST & E-Way" },
            { label: "TREASURY", value: "Cash Management" },
            { label: "AUDIENCE", value: "Finance Teams" },
          ],
          chips: ["Blog", "Finance Guides", "GST Guides", "Cash Flow Guides"],
          actionLabel: "Read Guides & Playbooks",
        },
      },
      {
        eyebrow: "DOCS 02 · VALIDATION",
        title: "Proof & Case Studies",
        items: ["Case Studies", "Customer Stories", "ROI Calculator", "Success Stories"].map(label => ({
          label,
          description: label === "Case Studies" ? "Verified operational outcomes." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "KNOWLEDGE · VERIFIED OUTCOMES",
          badgeLabel: "OPERATIONAL PROOF",
          objectId: "FIELD VALIDATION",
          heroValue: "Verified Enterprise Case Studies",
          subtitle: "In-depth implementation analyses detailing how mid-market and enterprise businesses eliminated spreadsheet reconciliations, reduced DSO, and automated Indian statutory compliance.",
          metrics: [
            { label: "SECTORS", value: "Manufacturing & Dist" },
            { label: "VALIDATION", value: "Real Deployments" },
            { label: "TOOLS", value: "Interactive ROI" },
          ],
          chips: ["Case Studies", "Customer Stories", "ROI Calculator", "Success Stories"],
          actionLabel: "View Case Studies",
        },
      },
      {
        eyebrow: "DOCS 03 · SESSIONS",
        title: "Videos & Walkthroughs",
        items: ["Webinars", "Product Videos", "5-Minute Videos", "Demo Videos"].map(label => ({
          label,
          description: label === "Webinars" ? "Deep-dive operational walkthroughs." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "KNOWLEDGE · VIDEO SESSIONS",
          badgeLabel: "WALKTHROUGHS",
          objectId: "MEDIA REPOSITORY",
          heroValue: "Technical Demos & Webinars",
          subtitle: "Deep-dive architecture walkthroughs, 5-minute feature breakdowns, and recorded webinars showcasing live transaction processing and multi-bank reconciliation.",
          metrics: [
            { label: "DEMOS", value: "Feature Breakdowns" },
            { label: "WEBINARS", value: "Live Walkthroughs" },
            { label: "DURATION", value: "5 to 30 Mins" },
          ],
          chips: ["Webinars", "Product Videos", "5-Minute Videos", "Demo Videos"],
          actionLabel: "Watch Product Videos",
        },
      },
      {
        eyebrow: "DOCS 04 · STRATEGY",
        title: "CFO Perspectives",
        items: ["CFO Insights", "Finance Trends", "AI in Finance", "Business Operations"].map(label => ({
          label,
          description: label === "CFO Insights" ? "Strategic treasury & risk perspectives." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "KNOWLEDGE · EXECUTIVE STRATEGY",
          badgeLabel: "CFO BRIEFS",
          objectId: "EXECUTIVE BENCHMARKS",
          heroValue: "Strategic Working Capital Insights",
          subtitle: "Executive analysis on working capital velocity, counterparty credit risk management, and the evolution of AI inside enterprise finance.",
          metrics: [
            { label: "THEME", value: "Working Capital" },
            { label: "LEVEL", value: "C-Suite & Board" },
            { label: "PERSPECTIVE", value: "Macro & Treasury" },
          ],
          chips: ["CFO Insights", "Finance Trends", "AI in Finance", "Business Operations"],
          actionLabel: "Read CFO Insights",
        },
      },
    ],
    telemetry: {
      headerLabel: "KNOWLEDGE REPOSITORY",
      badgeLabel: "PRACTITIONER LIBRARY",
      objectId: "RESEARCH & FRAMEWORKS",
      heroValue: "Finance & Operations Playbooks",
      subtitle: "A curated practitioner library for controllers, CFOs, and operational leaders—featuring statutory compliance handbooks (GST/E-Way/MSME 45-day rules), working capital optimization frameworks, and technical architecture specs.",
      metrics: [
        { label: "FOCUS", value: "Regulatory & Ops" },
        { label: "AUDIENCE", value: "CFOs & Controllers" },
        { label: "FORMATS", value: "Guides & Specs" },
      ],
      chips: ["GST Compliance Guides", "DSO Reduction Models", "MSME Rule Tracking", "Architecture Specs", "Video Walkthroughs"],
      actionLabel: "Browse Resource Library",
    },
  },
  Company: {
    groups: [
      {
        eyebrow: "IDENTITY 01 · MISSION",
        title: "About flowOne",
        items: ["About flowOne", "Our Story", "Leadership", "Careers"].map(label => ({
          label,
          description: label === "About flowOne" ? "Why connected business operations matter." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "COMPANY · VISION & ORIGINS",
          badgeLabel: "FOUNDING THESIS",
          objectId: "OUR MISSION",
          heroValue: "Reimagining Enterprise Work",
          subtitle: "Why connected business operations matter. Our story, founding values, and leadership team building modern software infrastructure for Indian businesses.",
          metrics: [
            { label: "FOUNDED", value: "2024" },
            { label: "LOCATION", value: "Mumbai, India" },
            { label: "TALENT", value: "Engineering-First" },
          ],
          chips: ["About flowOne", "Our Story", "Leadership", "Careers"],
          actionLabel: "Read Our Story",
        },
      },
      {
        eyebrow: "IDENTITY 02 · CHANNELS",
        title: "Connect & Partner",
        items: ["Contact Us", "Partner With Us"].map(label => ({
          label,
          description: label === "Contact Us" ? "Speak directly with our solutions team." : undefined,
        })),
        hoverTelemetry: {
          headerLabel: "COMPANY · COMMUNICATIONS",
          badgeLabel: "ENGAGEMENT",
          objectId: "SOLUTIONS ADVISORY",
          heroValue: "Direct Enterprise Engagement",
          subtitle: "Speak directly with our solutions architects, enterprise deployment team, or explore partnership and integration opportunities.",
          metrics: [
            { label: "SUPPORT", value: "Dedicated Advisors" },
            { label: "DEPLOYMENT", value: "Guided Onboarding" },
            { label: "ECOSYSTEM", value: "ERP & Bank Partners" },
          ],
          chips: ["Contact Us", "Partner With Us", "Enterprise Advisory"],
          actionLabel: "Contact Our Team",
        },
      },
    ],
    telemetry: {
      headerLabel: "ORGANIZATION PROFILE",
      badgeLabel: "MISSION & PRINCIPLES",
      objectId: "ABOUT FLOWONE",
      heroValue: "Engineered for High-Consequence Ops",
      subtitle: "Built specifically to eliminate enterprise software fragmentation in India. Engineered from the ground up with domestic sovereign cloud data residency, immutable cryptographic auditability, and dedicated support for Indian statutory compliance.",
      metrics: [
        { label: "HEADQUARTERS", value: "Mumbai, MH" },
        { label: "SECURITY", value: "SOC 2 · ISO 27001" },
        { label: "DATA", value: "100% Domestic Vault" },
      ],
      chips: ["Our Story", "Founder's Diary", "Leadership", "Sovereign Residency", "Open Positions"],
      actionLabel: "Meet flowOne & Our Team",
    },
  },
};

export function NavItem({ label, state = "default", hasMenu = true, onClick }: { label: string; state?: "default" | "hover" | "focus" | "active" | "open"; hasMenu?: boolean; onClick?: () => void }) {
  if (!hasMenu) return <a className={`fo-nav-item fo-founder-diary is-${state}`} href="#founder-diary">{label}</a>;
  return (
    <button className={`fo-nav-item is-${state}`} type="button" aria-expanded={state === "open"} onClick={onClick}>
      <span className="fo-nav-label">{label}</span>
      <span className="fo-nav-chevron" aria-hidden="true">
        <Icon name="chevron" size={14} tone="muted" />
      </span>
      {state === "open" && <span className="fo-nav-indicator" aria-hidden="true" />}
    </button>
  );
}

export function DemoCTA({ state = "default", compact = false, onClick }: { state?: "default" | "hover" | "focus" | "pressed" | "loading" | "disabled"; compact?: boolean; onClick?: () => void }) {
  return <Button size={compact ? "small" : "medium"} state={state} onClick={onClick} iconAfter={!compact ? <Icon name="arrow" size={16} tone="inverse" /> : undefined}>Book a Demo</Button>;
}

export function MegaMenu({ menu, state = "open", onNavigate }: { menu: MenuKey; state?: "closed" | "opening" | "open" | "closing"; onNavigate?: () => void }) {
  const content = navigationContent[menu];
  const target = { Solutions: "#capabilities", Platform: "#connection", AI: "#ai-inside-flow", Resources: "#proof", Company: "#trust" }[menu];

  return (
    <div className={`fo-mega fo-mega-${menu.toLowerCase()} is-${state}`} id={`mega-${menu}`} aria-hidden={state === "closed"}>
      <div className="fo-mega__beam" aria-hidden="true" />
      <div className="fo-mega__inner">
        <div className="fo-mega__groups">
          {content.groups.map(group => (
            <section className="fo-mega__group" key={group.title}>
              <div className="fo-mega__group-header">
                <span className="fo-mega__group-eyebrow">{group.eyebrow}</span>
                <h3 className="fo-mega__group-title">{group.title}</h3>
              </div>
              <div className="fo-mega__items-grid">
                {group.items.map((item, i) => (
                  <a
                    className={`fo-mega__item ${i === 0 && item.description ? "is-primary" : ""}`}
                    href={target}
                    onClick={onNavigate}
                    key={item.label}
                  >
                    <div className="fo-mega__item-content">
                      <div className="fo-mega__item-heading">
                        <strong>{item.label}</strong>
                        {i === 0 && item.description && (
                          <span className="fo-mega__primary-badge">PRIMARY</span>
                        )}
                      </div>
                      {item.description && <small>{item.description}</small>}
                    </div>
                    <span className="fo-mega__item-arrow" aria-hidden="true">
                      <Icon name="arrow" size={14} tone="action" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Architectural HUD Telemetry Aside (Option 1: Static Domain Synopsis) */}
        <aside className={`fo-mega__feature ${content.telemetry.accent ? "is-ai" : ""}`}>
          {/* Target Reticle Corner Brackets */}
          <span className="fo-hud-reticle fo-hud-reticle--tl" aria-hidden="true" />
          <span className="fo-hud-reticle fo-hud-reticle--tr" aria-hidden="true" />
          <span className="fo-hud-reticle fo-hud-reticle--bl" aria-hidden="true" />
          <span className="fo-hud-reticle fo-hud-reticle--br" aria-hidden="true" />

          {/* Header Bar */}
          <div className="fo-hud-header">
            <span className="fo-hud-label">{content.telemetry.headerLabel}</span>
            <span className="fo-hud-badge">
              <span className="fo-hud-beacon" aria-hidden="true" />
              {content.telemetry.badgeLabel}
            </span>
          </div>

          {/* Hero Object & Value */}
          <div className="fo-hud-hero">
            <div className="fo-hud-id">{content.telemetry.objectId}</div>
            <div className="fo-hud-val">{content.telemetry.heroValue}</div>
            <div className="fo-hud-sub">{content.telemetry.subtitle}</div>
          </div>

          {/* Inset 3-Column Metrics Tray */}
          <div className="fo-hud-metrics">
            {content.telemetry.metrics.map(metric => (
              <div className="fo-hud-metric-cell" key={metric.label}>
                <span className="fo-hud-metric-label">{metric.label}</span>
                <strong className="fo-hud-metric-val">{metric.value}</strong>
              </div>
            ))}
          </div>

          {/* Contextual Inspection Tag Chips */}
          <div className="fo-hud-chips">
            {content.telemetry.chips.map(chip => (
              <span className="fo-hud-chip" key={chip}>{chip}</span>
            ))}
          </div>

          {/* Bottom Action Launcher */}
          <div className="fo-hud-action">
            <a href={target} onClick={onNavigate} className="fo-feature-link-tile">
              <span>{content.telemetry.actionLabel}</span>
              <Icon name="arrow" size={14} tone={content.telemetry.accent ? "default" : "action"} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function MobileAccordion({ menu, expanded, onToggle, onNavigate, disabled = false }: { menu: MenuKey; expanded: boolean; onToggle: () => void; onNavigate?: () => void; disabled?: boolean }) {
  const content = navigationContent[menu];
  const target = { Solutions: "#capabilities", Platform: "#connection", AI: "#ai-inside-flow", Resources: "#proof", Company: "#trust" }[menu];
  return <div className={`fo-mobile-accordion ${expanded ? "is-expanded" : "is-collapsed"} ${disabled ? "is-disabled" : ""}`}>
    <button type="button" aria-expanded={expanded} aria-controls={`mobile-${menu}`} onClick={onToggle} disabled={disabled}><span>{menu}</span><Icon name="chevron" size={20} /></button>
    <div id={`mobile-${menu}`} className="fo-mobile-accordion__content">{content.groups.map(group => <section key={group.title}><span>{group.title}</span>{group.items.map(item => <a href={target} onClick={onNavigate} key={item.label}>{item.label}</a>)}</section>)}</div>
  </div>;
}

export function WebsiteHeader({ forceMobile = false, forceDark = false, forceScrolled = false, initialMenu = null, onDemo }: { forceMobile?: boolean; forceDark?: boolean; forceScrolled?: boolean; initialMenu?: MenuKey | null; onDemo?: () => void }) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(initialMenu);
  const [mobileOpen, setMobileOpen] = useState(forceMobile && initialMenu !== null);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(initialMenu);
  const [scrolled, setScrolled] = useState(forceScrolled);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) { setMobileOpen(false); menuTrigger.current?.focus(); }
      setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    if (mobileOpen && !forceMobile) {
      document.body.classList.add("fo-nav-lock");
      requestAnimationFrame(() => mobilePanel.current?.querySelector<HTMLElement>("button")?.focus());
    }
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("fo-nav-lock"); };
  }, [forceMobile, mobileOpen]);

  const toggleMenu = (menu: MenuKey) => setOpenMenu(current => current === menu ? null : menu);
  const closeMobile = () => { setMobileOpen(false); menuTrigger.current?.focus(); };
  const handleDemo = () => { setOpenMenu(null); setMobileOpen(false); onDemo?.(); };
  const classes = `fo-header ${scrolled ? "is-scrolled" : ""} ${forceDark ? "is-dark" : ""} ${openMenu ? "has-mega-open" : ""} ${mobileOpen ? "has-mobile-open" : ""} ${forceMobile ? "is-forced-mobile" : ""}`;

  return <div className={classes}>
    <div className="fo-scroll-progress" aria-hidden="true"><i /></div>
    <header className="fo-header__bar">
      <a className="fo-header__logo" href="#home-hero" aria-label="flowOne home"><img src="/assets/flowone-logo.svg" alt="" /></a>
      <nav className="fo-nav" aria-label="Primary navigation">
        {(Object.keys(navigationContent) as MenuKey[]).map(menu => <NavItem key={menu} label={menu} state={openMenu === menu ? "open" : menu === "Solutions" ? "active" : "default"} onClick={() => toggleMenu(menu)} />)}
      </nav>
      <div className="fo-header__actions">
        <div className="fd-pill">
          <a className="fd-pill__btn" href="/founders-diary/">{"Founder's Diary"}</a>
        </div>
        <DemoCTA compact={forceMobile} onClick={handleDemo} />
        <button ref={menuTrigger} className="fo-mobile-trigger" type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => mobileOpen ? closeMobile() : setMobileOpen(true)}>{mobileOpen ? <Icon name="close" size={20} /> : <span><i /><i /><i /></span>}</button>
      </div>
    </header>
    {openMenu && <MegaMenu menu={openMenu} onNavigate={() => setOpenMenu(null)} />}
    <div className="fo-mobile-nav" ref={mobilePanel} aria-hidden={!mobileOpen} inert={!mobileOpen}>
      <div className="fo-mobile-nav__top"><span>NAVIGATION</span><button type="button" onClick={closeMobile} aria-label="Close navigation"><Icon name="close" size={20} /></button></div>
      <div className="fo-mobile-nav__body">{(Object.keys(navigationContent) as MenuKey[]).map(menu => <MobileAccordion key={menu} menu={menu} expanded={mobileSection === menu} onToggle={() => setMobileSection(current => current === menu ? null : menu)} onNavigate={closeMobile} />)}<a className="fo-mobile-founder" href="/founders-diary/" onClick={closeMobile}>Founder’s Diary<span>Founder perspectives, decisions and the flowOne journey.</span></a></div>
      <div className="fo-mobile-nav__footer"><DemoCTA onClick={handleDemo} /><small>REIMAGINE BUSINESS WITH AI.</small></div>
    </div>
    {mobileOpen && <button className="fo-mobile-scrim" aria-label="Close navigation overlay" onClick={closeMobile} />}
  </div>;
}

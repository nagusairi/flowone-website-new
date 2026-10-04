import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "./flowone";

type MenuKey = "Solutions" | "Platform" | "AI" | "Resources" | "Company";
type MenuGroup = {
  title: string;
  badge?: string;
  tagline?: string;
  items: Array<{ label: string; description?: string }>;
  activeStages?: string[];
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
        title: "GET PAID FASTER",
        badge: "CONNECTED ARCHITECTURE",
        tagline: "These aren't separate products. They are connected capabilities working inside one unified business system.",
        items: ["Customer-to-Cash", "Accounts Receivable", "Credit & Risk", "Collections & Payments"].map(label => ({ label })),
        activeStages: ["INVOICE", "RECEIVABLE", "COLLECTION", "CASH"],
      },
      {
        title: "CONTROL PROCUREMENT",
        badge: "AP AUTOMATION",
        tagline: "Control spend from requisition and 3-way matching through automated vendor payments.",
        items: ["Procure-to-Pay", "Purchase Orders", "Accounts Payable", "Vendor Management"].map(label => ({ label })),
        activeStages: ["ORDER", "INVENTORY", "INVOICE", "BANK"],
      },
      {
        title: "RUN INVENTORY BETTER",
        badge: "SUPPLY INTELLIGENCE",
        tagline: "Real-time multi-location warehouse visibility, batch serialization, and stock replenishment.",
        items: ["Inventory Intelligence", "Warehouse Management", "Stock & Replenishment", "Order Management"].map(label => ({ label })),
        activeStages: ["ORDER", "INVENTORY", "GST"],
      },
      {
        title: "CONTROL CASH & BANKING",
        badge: "TREASURY ENGINE",
        tagline: "Automated multi-bank statement ingestion, algorithmic matching, and cash forecasting.",
        items: ["Cash & Banking", "Bank Reconciliation", "Cash Flow Forecasting", "Financial Visibility"].map(label => ({ label })),
        activeStages: ["RECEIVABLE", "COLLECTION", "BANK", "CASH"],
      },
      {
        title: "STAY COMPLIANT",
        badge: "STATUTORY RAILS",
        tagline: "Automated e-invoicing, IRN signing, e-way bills, and direct GSTR-1 to 2B reconciliation.",
        items: ["GST Hub", "E-Invoicing", "E-Way Bills", "GST Reconciliation"].map(label => ({ label })),
        activeStages: ["INVOICE", "GST", "RECEIVABLE"],
      },
    ],
    telemetry: {
      headerLabel: "FLAGSHIP WORKFLOW IN FOCUS",
      badgeLabel: "CONNECTED PIPELINE",
      objectId: "ORDER-TO-CASH RUNTIME",
      heroValue: "18 Days Saved",
      subtitle: "SteelTech Corp · Order → Dispatch → IRN → Bank Settlement",
      metrics: [
        { label: "DSO IMPACT", value: "-18 Days" },
        { label: "IRN SIGNING", value: "Instant" },
        { label: "CASH POST", value: "100% Match" },
      ],
      chips: ["Customer order", "Invoice lineage", "E-Way Bill", "Multi-bank recon", "Cash velocity"],
      actionLabel: "Explore Connected Solutions",
    },
  },
  Platform: {
    groups: [
      {
        title: "PLATFORM OVERVIEW",
        badge: "UNIFIED OS",
        tagline: "One connected operating fabric uniting finance, operations, statutory rails, and contextual AI.",
        items: ["Platform Overview", "Finance Operations", "Business Operations", "Workflow Automation"].map(label => ({ label })),
      },
      {
        title: "BUSINESS FLOWS",
        badge: "DUAL-RAIL BUS",
        tagline: "Deterministic transaction journeys engineered with continuous real-time synchronization.",
        items: ["Customer → Cash", "Procure → Pay", "Inventory → Cash", "Record → Report"].map(label => ({ label })),
      },
      {
        title: "CORE CAPABILITIES",
        badge: "DEEP CONNECTIVITY",
        tagline: "Document intelligence, multi-tier approvals, 48+ core banking bridges, and real-time analytics.",
        items: ["Document Intelligence", "Approvals & Workflows", "Integrations", "Reporting & Analytics"].map(label => ({ label })),
      },
    ],
    telemetry: {
      headerLabel: "PLATFORM ARCHITECTURE",
      badgeLabel: "DUAL-RAIL BUS",
      objectId: "UNIFIED OPERATING ENGINE",
      heroValue: "Zero Data Silos",
      subtitle: "Continuous Event Fabric · 48 ERP & Banking Endpoints",
      metrics: [
        { label: "EVENT LATENCY", value: "42ms" },
        { label: "POSTING", value: "Deterministic" },
        { label: "SYNC STATE", value: "Real-Time" },
      ],
      chips: ["Immutable log", "Dual-rail bus", "Auto-reconciliation", "Statutory rails", "REST / Webhooks"],
      actionLabel: "Explore Platform Architecture",
    },
  },
  AI: {
    groups: [
      {
        title: "AI CAPABILITIES",
        badge: "AUTONOMOUS AGENTS",
        tagline: "Autonomous intelligence operating directly inside transaction state—not in disconnected tabs.",
        items: ["AI Business Agent", "Document Intelligence", "AI Invoice Processing", "AI Bank Reconciliation"].map(label => ({ label })),
      },
      {
        title: "INTELLIGENCE & RISK",
        badge: "PREDICTIVE MODELS",
        tagline: "Predictive cash forecasting, credit risk scoring, and real-time ledger anomaly detection.",
        items: ["Cash Flow Forecasting", "Credit Risk Intelligence", "Collections Intelligence", "Anomaly Detection"].map(label => ({ label })),
      },
      {
        title: "AI WORKFLOWS",
        badge: "SMART POLICIES",
        tagline: "Policy-driven automated clearances, smart approvals, and exception resolution at enterprise scale.",
        items: ["Smart Approvals", "Automated Actions", "Exception Management", "Policy Engine"].map(label => ({ label })),
      },
    ],
    telemetry: {
      headerLabel: "AI IN TRANSACTION RUNTIME",
      badgeLabel: "EVALUATION ACTIVE",
      objectId: "INSPECTED OBJECT: INV-10482",
      heroValue: "₹5,90,000",
      subtitle: "Ananya Enterprises · Contextual Extraction & Verification",
      metrics: [
        { label: "SCHEMA MATCH", value: "99.8%" },
        { label: "IRN STATUS", value: "Verified" },
        { label: "CONFIDENCE", value: "92.0%" },
      ],
      chips: ["Customer profile", "Invoice line items", "Historical velocity", "Due date window", "IRP status"],
      actionLabel: "Explore flowOne AI",
      accent: "ai",
    },
  },
  Resources: {
    groups: [
      {
        title: "LEARN & GUIDES",
        badge: "EXPERT PLAYBOOKS",
        tagline: "Actionable frameworks, regulatory guides, and operational playbooks for finance leaders.",
        items: ["Blog", "Finance Guides", "GST Guides", "Cash Flow Guides"].map(label => ({ label })),
      },
      {
        title: "PROOF & CASE STUDIES",
        badge: "VERIFIED IMPACT",
        tagline: "Verified operational outcomes, measurable DSO reductions, and real customer case studies.",
        items: ["Case Studies", "Customer Stories", "ROI Calculator", "Success Stories"].map(label => ({ label })),
      },
      {
        title: "WATCH & WEBINARS",
        badge: "VIDEO LIBRARY",
        tagline: "Deep-dive architecture walkthroughs, 5-minute video explainers, and live interactive demos.",
        items: ["Webinars", "Product Videos", "5-Minute Videos", "Demo Videos"].map(label => ({ label })),
      },
      {
        title: "INSIGHTS & BENCHMARKS",
        badge: "2026 BENCHMARK",
        tagline: "Macro CFO trends, statutory regulatory analysis, and working capital velocity benchmarks.",
        items: ["CFO Insights", "Finance Trends", "AI in Finance", "Business Operations"].map(label => ({ label })),
      },
    ],
    telemetry: {
      headerLabel: "FEATURED CFO PUBLICATION",
      badgeLabel: "2026 EDITION",
      objectId: "ANNUAL BENCHMARK REPORT",
      heroValue: "42% Faster",
      subtitle: "Treasury & Working Capital Velocity Study across 500+ Enterprises",
      metrics: [
        { label: "CFO COHORT", value: "500+ Cos." },
        { label: "READ TIME", value: "8 Mins" },
        { label: "VERIFIED ROI", value: "3.4×" },
      ],
      chips: ["CFO Insights", "GST Playbook", "Working Capital", "Case Studies", "ROI Calculator"],
      actionLabel: "Read the 2026 CFO Report",
    },
  },
  Company: {
    groups: [
      {
        title: "ABOUT FLOWONE",
        badge: "OUR MISSION",
        tagline: "Built in Mumbai for consequence. We build the connected operating system businesses depend on.",
        items: ["About flowOne", "Our Story", "Leadership", "Careers"].map(label => ({ label })),
      },
      {
        title: "TRUST & GOVERNANCE",
        badge: "SOVEREIGN CLOUD",
        tagline: "Institutional data sovereignty, domestic multi-AZ Indian infrastructure, and dual-key controls.",
        items: ["Security", "Compliance", "Data & Privacy", "Sovereign Cloud"].map(label => ({ label })),
      },
      {
        title: "CONNECT WITH US",
        badge: "GET IN TOUCH",
        tagline: "Speak directly with our enterprise solutions team, partner with us, or explore open roles.",
        items: ["Contact Us", "Partner With Us", "Press & Media", "Office Locations"].map(label => ({ label })),
      },
    ],
    telemetry: {
      headerLabel: "COMPANY & MISSION SPOTLIGHT",
      badgeLabel: "MUMBAI, INDIA",
      objectId: "THE FLOWONE JOURNEY",
      heroValue: "Built for Trust",
      subtitle: "Reimagining Indian enterprise finance & operations since 2024",
      metrics: [
        { label: "HEADQUARTERS", value: "Mumbai, MH" },
        { label: "TEAM & TALENT", value: "60+ Builders" },
        { label: "CAREERS", value: "Hiring Now" },
      ],
      chips: ["Our Story", "Founder's Diary", "Leadership", "Open Careers", "Institutional Governance"],
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
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const currentGroup = content.groups[activeGroupIndex] || content.groups[0];

  return (
    <div className={`fo-mega fo-mega-${menu.toLowerCase()} is-${state}`} id={`mega-${menu}`} aria-hidden={state === "closed"}>
      <div className="fo-mega__beam" aria-hidden="true" />
      <div className="fo-mega__inner">
        {/* Left Column: Category Navigator */}
        <div className="fo-mega__nav-col">
          <div className="fo-mega__cat-list" role="tablist" aria-label={`${menu} categories`}>
            {content.groups.map((group, idx) => {
              const isSelected = activeGroupIndex === idx;
              return (
                <button
                  key={group.title}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`fo-mega__cat-btn ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveGroupIndex(idx)}
                  onMouseEnter={() => setActiveGroupIndex(idx)}
                >
                  {isSelected && <span className="fo-mega__cat-active-bar" aria-hidden="true" />}
                  <span className="fo-mega__cat-idx">0{idx + 1}</span>
                  <span className="fo-mega__cat-title">{group.title}</span>
                  <span className="fo-mega__cat-count">{group.items.length} Workflows</span>
                  <span className="fo-mega__cat-arrow" aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Modern Architectural Detail Card */}
        <div className="fo-mega__detail-col">
          <div className="fo-mega__card">
            <div className="fo-mega__card-beam" aria-hidden="true" />

            {/* Card Header Bar */}
            <div className="fo-mega__card-header">
              <span className="fo-mega__card-title">{currentGroup.title}</span>
              <span className="fo-mega__card-badge">
                <span className="fo-mega__card-beacon" aria-hidden="true" />
                {currentGroup.badge || "CONNECTED ARCHITECTURE"}
              </span>
            </div>

            {/* Contextual Tagline */}
            <p className="fo-mega__card-tagline">
              {currentGroup.tagline || "These aren't separate products. They are connected capabilities working inside one unified business system."}
            </p>

            {/* 2x2 Grid of Modern Workflow Cards */}
            <div className="fo-mega__card-grid">
              {currentGroup.items.map(item => (
                <a
                  href={target}
                  onClick={onNavigate}
                  key={item.label}
                  className="fo-mega__card-tile"
                >
                  <span className="fo-mega__card-tile-label">{item.label}</span>
                  <span className="fo-mega__card-tile-arrow" aria-hidden="true">
                    <Icon name="arrow" size={14} tone="action" />
                  </span>
                </a>
              ))}
            </div>

            {/* Visual Footer: Live Connected Pipeline Flow for Solutions, Telemetry for Others */}
            {menu === "Solutions" ? (
              <div className="fo-mega__pipeline" aria-label="Connected transaction pipeline">
                {["ORDER", "INVENTORY", "INVOICE", "GST", "RECEIVABLE", "COLLECTION", "BANK", "CASH"].map((stage, idx, arr) => {
                  const isActive = currentGroup.activeStages
                    ? currentGroup.activeStages.some(s => s.toUpperCase() === stage)
                    : (stage === "INVOICE" || stage === "RECEIVABLE" || stage === "COLLECTION" || stage === "CASH");
                  return (
                    <div className={`fo-pipeline__step ${isActive ? "is-active" : ""}`} key={stage}>
                      <span className="fo-pipeline__node" />
                      <span className="fo-pipeline__label">{stage}</span>
                      {idx < arr.length - 1 && <span className="fo-pipeline__line" />}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="fo-mega__telemetry-bar">
                <span className="fo-telemetry-beacon" aria-hidden="true" />
                <span className="fo-telemetry-mono">{content.telemetry.objectId}</span>
                <span className="fo-telemetry-sep">/</span>
                <span className="fo-telemetry-lead">{content.telemetry.heroValue}</span>
                <span className="fo-telemetry-sub">— {content.telemetry.subtitle}</span>
              </div>
            )}

            {/* Action Launcher */}
            <div className="fo-mega__card-footer">
              <a href={target} onClick={onNavigate} className="fo-mega__card-action">
                <span>{menu === "Solutions" ? "Explore Solutions Architecture" : content.telemetry.actionLabel}</span>
                <Icon name="arrow" size={14} tone="action" />
              </a>
            </div>
          </div>
        </div>
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

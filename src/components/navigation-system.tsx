import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "./flowone";

type MenuKey = "Solutions" | "Platform" | "AI" | "Resources" | "Company";
type MenuGroup = { title: string; items: Array<{ label: string; description?: string }> };

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
      { title: "GET PAID FASTER", items: ["Customer-to-Cash", "Accounts Receivable", "Credit & Risk", "Collections & Payments"].map(label => ({ label, description: label === "Customer-to-Cash" ? "Connect every step from order to available cash." : undefined })) },
      { title: "CONTROL PROCUREMENT", items: ["Procure-to-Pay", "Purchase Orders", "Accounts Payable", "Vendor Management"].map(label => ({ label, description: label === "Procure-to-Pay" ? "Control spend from request through settlement." : undefined })) },
      { title: "RUN INVENTORY BETTER", items: ["Inventory Intelligence", "Warehouse Management", "Stock & Replenishment", "Order Management"].map(label => ({ label, description: label === "Inventory Intelligence" ? "Real-time stock velocity & warehouse allocation." : undefined })) },
      { title: "CONTROL CASH & BANKING", items: ["Cash & Banking", "Bank Reconciliation", "Cash Flow Forecasting", "Financial Visibility"].map(label => ({ label, description: label === "Cash & Banking" ? "Automated multi-bank reconciliation & cash visibility." : undefined })) },
      { title: "STAY COMPLIANT", items: ["GST Hub", "E-Invoicing", "E-Way Bills", "GST Reconciliation"].map(label => ({ label, description: label === "GST Hub" ? "Automated e-invoicing, IRN signing & return filing." : undefined })) },
    ],
    telemetry: {
      headerLabel: "CONNECTED TRANSACTION LINEAGE",
      badgeLabel: "CASH PIPELINE ACTIVE",
      objectId: "SO-9402",
      heroValue: "₹14,20,000",
      subtitle: "SteelTech Corp · Connected Order-to-Cash",
      metrics: [
        { label: "DISPATCH", value: "Cleared" },
        { label: "IRN SIGNED", value: "Instant" },
        { label: "DSO IMPACT", value: "-18 Days" },
      ],
      chips: ["Customer order", "Invoice lineage", "E-Way Bill", "Bank Recon", "Cash Post"],
      actionLabel: "Explore Connected Solutions",
    },
  },
  Platform: {
    groups: [
      { title: "PLATFORM", items: ["Platform Overview", "Finance Operations", "Business Operations", "Workflow Automation"].map(label => ({ label, description: label === "Platform Overview" ? "One connected operating system for business." : undefined })) },
      { title: "BUSINESS FLOWS", items: ["Customer → Cash", "Procure → Pay", "Inventory → Cash", "Record → Report"].map(label => ({ label, description: label === "Customer → Cash" ? "End-to-end deterministic transaction journey." : undefined })) },
      { title: "CAPABILITIES", items: ["Document Intelligence", "Approvals & Workflows", "Integrations", "Reporting & Analytics"].map(label => ({ label, description: label === "Document Intelligence" ? "AI-powered transaction data extraction." : undefined })) },
    ],
    telemetry: {
      headerLabel: "OPERATING BUS TELEMETRY",
      badgeLabel: "DUAL-RAIL STREAM",
      objectId: "BUS-TXN-8821",
      heroValue: "₹1,24,50,000",
      subtitle: "Unified Ledger Stream · 48 Core Banking & ERP Endpoints",
      metrics: [
        { label: "EVENT LATENCY", value: "42ms" },
        { label: "POSTING", value: "Deterministic" },
        { label: "VARIANCE", value: "₹0.00" },
      ],
      chips: ["Immutable log", "Dual-rail bus", "Auto-reconciliation", "Statutory clearance"],
      actionLabel: "Explore Platform Architecture",
    },
  },
  AI: {
    groups: [
      { title: "AI", items: ["AI Business Agent", "Document Intelligence", "AI Invoice Processing", "AI Bank Reconciliation", "Cash Flow Forecasting", "Credit Risk Intelligence", "Collections Intelligence", "Anomaly Detection"].map(label => ({ label, description: label === "AI Business Agent" ? "Contextual intelligence that understands and acts." : undefined })) },
      { title: "AI WORKFLOWS", items: ["Smart Approvals", "Automated Actions", "Exception Management"].map(label => ({ label, description: label === "Smart Approvals" ? "Policy-driven automated clearances." : undefined })) },
    ],
    telemetry: {
      headerLabel: "INSPECTED BUSINESS OBJECT",
      badgeLabel: "AI EVALUATION ACTIVE",
      objectId: "INV-10482",
      heroValue: "₹5,90,000",
      subtitle: "Ananya Enterprises · GSTIN 36AABCA1234F1Z5",
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
      { title: "LEARN", items: ["Blog", "Finance Guides", "GST Guides", "Cash Flow Guides"].map(label => ({ label, description: label === "Blog" ? "Finance, GST, AI and product education." : undefined })) },
      { title: "PROOF", items: ["Case Studies", "Customer Stories", "ROI Calculator", "Success Stories"].map(label => ({ label, description: label === "Case Studies" ? "Verified operational outcomes." : undefined })) },
      { title: "WATCH", items: ["Webinars", "Product Videos", "5-Minute Videos", "Demo Videos"].map(label => ({ label, description: label === "Webinars" ? "Deep-dive operational walkthroughs." : undefined })) },
      { title: "INSIGHTS", items: ["CFO Insights", "Finance Trends", "AI in Finance", "Business Operations"].map(label => ({ label, description: label === "CFO Insights" ? "Strategic treasury & risk perspectives." : undefined })) },
    ],
    telemetry: {
      headerLabel: "CFO & TREASURY INTELLIGENCE",
      badgeLabel: "2026 BENCHMARK",
      objectId: "BENCHMARK-26",
      heroValue: "42% Faster",
      subtitle: "Working Capital Velocity & Statutory Automation Study",
      metrics: [
        { label: "COHORT", value: "500+ Cos." },
        { label: "CYCLE TIME", value: "3.4× Faster" },
        { label: "STATUTORY DRIFT", value: "0.0%" },
      ],
      chips: ["CFO Insights", "GST Playbook", "Working Capital", "Case Studies", "ROI Model"],
      actionLabel: "Visit the Company Blog",
    },
  },
  Company: {
    groups: [
      { title: "ABOUT", items: ["About flowOne", "Our Story", "Leadership", "Careers"].map(label => ({ label, description: label === "About flowOne" ? "Why connected business operations matter." : undefined })) },
      { title: "TRUST", items: ["Security", "Compliance", "Data & Privacy"].map(label => ({ label, description: label === "Security" ? "Institutional data residency & governance." : undefined })) },
      { title: "CONNECT", items: ["Contact Us", "Partner With Us"].map(label => ({ label, description: label === "Contact Us" ? "Speak directly with our solutions team." : undefined })) },
    ],
    telemetry: {
      headerLabel: "INSTITUTIONAL GOVERNANCE",
      badgeLabel: "SOVEREIGN VAULT",
      objectId: "NODE-MUMBAI-01",
      heroValue: "100% Resident",
      subtitle: "Domestic Mumbai Multi-AZ Infrastructure & Audit Log",
      metrics: [
        { label: "ENCRYPTION", value: "AES-256" },
        { label: "CO-MINGLING", value: "0.0%" },
        { label: "UPTIME SLA", value: "99.99%" },
      ],
      chips: ["Maker-checker", "Dual-key controls", "Indian data sovereignty", "SOC2 Type II"],
      actionLabel: "Meet flowOne & Trust",
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
          {content.groups.map((group, groupIdx) => (
            <section className="fo-mega__group" key={group.title}>
              <div className="fo-mega__group-header">
                <span className="fo-mega__group-index">0{groupIdx + 1}</span>
                <span className="fo-mega__group-title">{group.title}</span>
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

        {/* Architectural HUD Telemetry Aside */}
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

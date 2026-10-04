import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "./flowone";

type MenuKey = "Solutions" | "Platform" | "AI" | "Resources" | "Company";
type MenuGroup = { title: string; items: Array<{ label: string; description?: string }> };

export const navigationContent: Record<MenuKey, { groups: MenuGroup[]; feature: { title: string; links: string[]; accent?: "ai" } }> = {
  Solutions: {
    groups: [
      { title: "GET PAID FASTER", items: ["Customer-to-Cash", "Accounts Receivable", "Credit & Risk", "Collections & Payments"].map(label => ({ label, description: label === "Customer-to-Cash" ? "Connect every step from order to available cash." : undefined })) },
      { title: "CONTROL PROCUREMENT", items: ["Procure-to-Pay", "Purchase Orders", "Accounts Payable", "Vendor Management"].map(label => ({ label, description: label === "Procure-to-Pay" ? "Control spend from request through settlement." : undefined })) },
      { title: "RUN INVENTORY BETTER", items: ["Inventory Intelligence", "Warehouse Management", "Stock & Replenishment", "Order Management"].map(label => ({ label, description: label === "Inventory Intelligence" ? "Real-time stock velocity & warehouse allocation." : undefined })) },
      { title: "CONTROL CASH & BANKING", items: ["Cash & Banking", "Bank Reconciliation", "Cash Flow Forecasting", "Financial Visibility"].map(label => ({ label, description: label === "Cash & Banking" ? "Automated multi-bank reconciliation & cash visibility." : undefined })) },
      { title: "STAY COMPLIANT", items: ["GST Hub", "E-Invoicing", "E-Way Bills", "GST Reconciliation"].map(label => ({ label, description: label === "GST Hub" ? "Automated e-invoicing, IRN signing & return filing." : undefined })) },
    ],
    feature: { title: "Where should we start?", links: ["Get Paid Faster", "Control Procurement", "Explore All"] },
  },
  Platform: {
    groups: [
      { title: "PLATFORM", items: ["Platform Overview", "Finance Operations", "Business Operations", "Workflow Automation"].map(label => ({ label, description: label === "Platform Overview" ? "One connected operating system for business." : undefined })) },
      { title: "BUSINESS FLOWS", items: ["Customer → Cash", "Procure → Pay", "Inventory → Cash", "Record → Report"].map(label => ({ label, description: label === "Customer → Cash" ? "End-to-end deterministic transaction journey." : undefined })) },
      { title: "CAPABILITIES", items: ["Document Intelligence", "Approvals & Workflows", "Integrations", "Reporting & Analytics"].map(label => ({ label, description: label === "Document Intelligence" ? "AI-powered transaction data extraction." : undefined })) },
    ],
    feature: { title: "One business. One connected flow.", links: ["Explore the platform"] },
  },
  AI: {
    groups: [
      { title: "AI", items: ["AI Business Agent", "Document Intelligence", "AI Invoice Processing", "AI Bank Reconciliation", "Cash Flow Forecasting", "Credit Risk Intelligence", "Collections Intelligence", "Anomaly Detection"].map(label => ({ label, description: label === "AI Business Agent" ? "Contextual intelligence that understands and acts." : undefined })) },
      { title: "AI WORKFLOWS", items: ["Smart Approvals", "Automated Actions", "Exception Management"].map(label => ({ label, description: label === "Smart Approvals" ? "Policy-driven automated clearances." : undefined })) },
    ],
    feature: { title: "AI that works inside the flow.", links: ["Explore flowOne AI"], accent: "ai" },
  },
  Resources: {
    groups: [
      { title: "LEARN", items: ["Blog", "Finance Guides", "GST Guides", "Cash Flow Guides"].map(label => ({ label, description: label === "Blog" ? "Finance, GST, AI and product education." : undefined })) },
      { title: "PROOF", items: ["Case Studies", "Customer Stories", "ROI Calculator", "Success Stories"].map(label => ({ label, description: label === "Case Studies" ? "Verified operational outcomes." : undefined })) },
      { title: "WATCH", items: ["Webinars", "Product Videos", "5-Minute Videos", "Demo Videos"].map(label => ({ label, description: label === "Webinars" ? "Deep-dive operational walkthroughs." : undefined })) },
      { title: "INSIGHTS", items: ["CFO Insights", "Finance Trends", "AI in Finance", "Business Operations"].map(label => ({ label, description: label === "CFO Insights" ? "Strategic treasury & risk perspectives." : undefined })) },
    ],
    feature: { title: "Practical insight for modern finance.", links: ["Visit the company blog"] },
  },
  Company: {
    groups: [
      { title: "ABOUT", items: ["About flowOne", "Our Story", "Leadership", "Careers"].map(label => ({ label, description: label === "About flowOne" ? "Why connected business operations matter." : undefined })) },
      { title: "TRUST", items: ["Security", "Compliance", "Data & Privacy"].map(label => ({ label, description: label === "Security" ? "Institutional data residency & governance." : undefined })) },
      { title: "CONNECT", items: ["Contact Us", "Partner With Us"].map(label => ({ label, description: label === "Contact Us" ? "Speak directly with our solutions team." : undefined })) },
    ],
    feature: { title: "Built for trust and consequence.", links: ["Meet flowOne"] },
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

        {/* Operational Spotlight Aside */}
        <aside className={`fo-mega__feature ${content.feature.accent ? "is-ai" : ""}`}>
          <div className="fo-feature-header">
            <span className="fo-feature-beacon" aria-hidden="true" />
            <span className="fo-feature-badge">PLATFORM SPOTLIGHT</span>
          </div>
          <strong className="fo-feature-title">{content.feature.title}</strong>

          {/* Mini Flow Preview Widget */}
          {menu === "Solutions" && (
            <div className="fo-feature-flow" aria-label="Connected pipeline preview">
              <span className="fo-flow-chip is-active">Order</span>
              <span className="fo-flow-connector" />
              <span className="fo-flow-chip is-active">Invoice</span>
              <span className="fo-flow-connector" />
              <span className="fo-flow-chip is-active">GST</span>
              <span className="fo-flow-connector" />
              <span className="fo-flow-chip is-cash">Cash</span>
            </div>
          )}

          {menu === "Platform" && (
            <div className="fo-feature-dual-rail" aria-label="Dual-rail operating bus">
              <div className="fo-rail-track">
                <span className="fo-rail-node">01</span>
                <span className="fo-rail-line" />
                <span className="fo-rail-node">02</span>
                <span className="fo-rail-line" />
                <span className="fo-rail-node">03</span>
              </div>
              <span className="fo-rail-caption">ONE CONTINUOUS AUDITED BUS</span>
            </div>
          )}

          {menu === "AI" && (
            <div className="fo-feature-ai-card" aria-label="Contextual AI prediction">
              <div className="fo-ai-card-row">
                <span>TXN-10482 PREDICTION</span>
                <strong>92% PROBABILITY</strong>
              </div>
              <div className="fo-ai-card-sub">AI operates inside transaction state—not in disconnected side tabs.</div>
            </div>
          )}

          <div className="fo-feature-links">
            {content.feature.links.map(link => (
              <a href={target} onClick={onNavigate} key={link} className="fo-feature-link-tile">
                <span>{link}</span>
                <Icon name="arrow" size={14} tone={content.feature.accent ? "default" : "action"} />
              </a>
            ))}
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

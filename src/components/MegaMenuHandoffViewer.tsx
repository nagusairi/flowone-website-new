import { useState } from "react";
import MegaMenuPanel, { MenuKey, megaMenuData } from "./MegaMenuPanel";
import "./mega-menu-panel.css";

type Breakpoint = "desktop" | "tablet" | "mobile" | "fluid";

export default function MegaMenuHandoffViewer() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>("Products");
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const [hoverTrigger, setHoverTrigger] = useState(false);
  const [hoverItem, setHoverItem] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<MenuKey | null>("Products");
  const [specDrawerOpen, setSpecDrawerOpen] = useState(false);

  const menus: MenuKey[] = ["Products", "Platform", "Company", "Support"];

  const getFrameWidth = () => {
    switch (breakpoint) {
      case "desktop":
        return "1440px";
      case "tablet":
        return "820px";
      case "mobile":
        return "390px";
      case "fluid":
      default:
        return "100%";
    }
  };

  return (
    <div className="fo-handoff-viewer">
      {/* Top Telemetry & Control Bar */}
      <header className="fo-handoff-viewer__bar">
        <div className="fo-handoff-viewer__title-block">
          <span className="fo-handoff-tag">ELEMENTOR PRO HANDOFF</span>
          <h1 className="fo-handoff-title">flowOne Mega-Menu Dropdown Panel Spec</h1>
        </div>

        {/* Breakpoint Switcher */}
        <div className="fo-handoff-controls">
          <div className="fo-handoff-segmented" role="group" aria-label="Breakpoint View">
            <button
              type="button"
              className={`fo-handoff-btn ${breakpoint === "desktop" ? "is-active" : ""}`}
              onClick={() => { setBreakpoint("desktop"); setActiveMenu("Products"); setMobileDrawerOpen(false); }}
            >
              Desktop (1440px)
            </button>
            <button
              type="button"
              className={`fo-handoff-btn ${breakpoint === "tablet" ? "is-active" : ""}`}
              onClick={() => { setBreakpoint("tablet"); setActiveMenu("Products"); setMobileDrawerOpen(false); }}
            >
              Tablet (820px)
            </button>
            <button
              type="button"
              className={`fo-handoff-btn ${breakpoint === "mobile" ? "is-active" : ""}`}
              onClick={() => { setBreakpoint("mobile"); setActiveMenu(null); setMobileDrawerOpen(true); }}
            >
              Mobile (390px)
            </button>
            <button
              type="button"
              className={`fo-handoff-btn ${breakpoint === "fluid" ? "is-active" : ""}`}
              onClick={() => setBreakpoint("fluid")}
            >
              Fluid (100%)
            </button>
          </div>

          {/* Active Menu Selector */}
          <div className="fo-handoff-segmented" role="group" aria-label="Menu Item State">
            <button
              type="button"
              className={`fo-handoff-btn ${activeMenu === null && !mobileDrawerOpen ? "is-active" : ""}`}
              onClick={() => { setActiveMenu(null); setMobileDrawerOpen(false); }}
            >
              Closed (Default)
            </button>
            {menus.map(menu => (
              <button
                key={menu}
                type="button"
                className={`fo-handoff-btn ${activeMenu === menu ? "is-active" : ""}`}
                onClick={() => {
                  setActiveMenu(menu);
                  setMobileAccordion(menu);
                  if (breakpoint === "mobile") setMobileDrawerOpen(true);
                }}
              >
                {menu} {menu === "Products" ? "(2 Cols × 6)" : "(Single)"}
              </button>
            ))}
          </div>

          {/* Simulation Toggles */}
          <div className="fo-handoff-segmented" role="group" aria-label="Interactive States">
            <button
              type="button"
              className={`fo-handoff-btn ${hoverTrigger ? "is-active" : ""}`}
              onClick={() => setHoverTrigger(!hoverTrigger)}
            >
              Hover Trigger: {hoverTrigger ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              className={`fo-handoff-btn ${hoverItem ? "is-active" : ""}`}
              onClick={() => setHoverItem(!hoverItem)}
            >
              Hover Item: {hoverItem ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              className={`fo-handoff-btn fo-handoff-btn--accent ${specDrawerOpen ? "is-active" : ""}`}
              onClick={() => setSpecDrawerOpen(!specDrawerOpen)}
            >
              {specDrawerOpen ? "Close Spec Guide" : "Elementor Spec Guide"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage Frame */}
      <main className="fo-handoff-viewer__stage">
        <div
          className={`fo-handoff-frame fo-handoff-frame--${breakpoint}`}
          style={{ width: getFrameWidth() }}
        >
          {/* Simulated Header Navigation Bar */}
          <div className="fo-sim-header">
            <div className="fo-sim-header__inner">
              {/* Logo */}
              <div className="fo-sim-header__logo">
                <img src="/assets/flowone-logo.svg" alt="flowOne" />
              </div>

              {/* Desktop / Tablet Nav Items (Hidden on Mobile) */}
              <nav className="fo-sim-nav">
                {menus.map(menu => {
                  const isOpen = activeMenu === menu;
                  const isHovered = hoverTrigger && menu === "Products";
                  return (
                    <button
                      key={menu}
                      type="button"
                      className={`fo-sim-nav-btn ${isOpen ? "is-open" : ""} ${isHovered ? "is-hover" : ""}`}
                      onClick={() => setActiveMenu(isOpen ? null : menu)}
                    >
                      <span>{menu}</span>
                      <svg
                        className="fo-sim-nav-chevron"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                      {isOpen && <span className="fo-sim-nav-indicator" />}
                    </button>
                  );
                })}
              </nav>

              {/* Right CTA Actions */}
              <div className="fo-sim-header__actions">
                <a href="#founders-diary" className="fo-sim-fd-pill">Founder's Diary</a>
                <button type="button" className="fo-sim-btn-demo">Book a Demo</button>
                {/* Mobile Hamburger Trigger */}
                <button
                  type="button"
                  className="fo-sim-hamburger"
                  onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop / Tablet Mega-Menu Dropdown Panel */}
            {activeMenu && breakpoint !== "mobile" && (
              <MegaMenuPanel
                menuKey={activeMenu}
                isOpen={true}
                onNavigate={(href) => console.log("Navigate to:", href)}
              />
            )}
          </div>

          {/* Mobile Drawer (Visible when breakpoint is mobile and open) */}
          {breakpoint === "mobile" && mobileDrawerOpen && (
            <div className="fo-sim-mobile-drawer">
              <div className="fo-sim-mobile-drawer__header">
                <img src="/assets/flowone-logo.svg" alt="flowOne" />
                <button
                  type="button"
                  className="fo-sim-mobile-close"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="fo-sim-mobile-drawer__body">
                {menus.map(menu => {
                  const isExpanded = mobileAccordion === menu;
                  const data = megaMenuData[menu];
                  return (
                    <div className="fo-sim-mobile-group" key={menu}>
                      <button
                        type="button"
                        className={`fo-sim-mobile-group__btn ${isExpanded ? "is-expanded" : ""}`}
                        onClick={() => setMobileAccordion(isExpanded ? null : menu)}
                      >
                        <span>{menu}</span>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 6l4 4 4-4" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="fo-sim-mobile-group__content">
                          {data.columns.map(col => (
                            <div key={col.id} className="fo-sim-mobile-col">
                              <span className="fo-sim-mobile-col__heading">{col.heading}</span>
                              <div className="fo-sim-mobile-items">
                                {col.items.map(item => (
                                  <a key={item.id} href={item.href || "#"} className="fo-sim-mobile-item">
                                    <div className="fo-sim-mobile-item__main">
                                      <strong>{item.label}</strong>
                                      {item.badge && <span className="fo-sim-mobile-badge">{item.badge}</span>}
                                    </div>
                                    <span className="fo-sim-mobile-arrow">→</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="fo-sim-mobile-drawer__footer">
                <button type="button" className="fo-sim-btn-demo" style={{ width: "100%", padding: "0.85rem" }}>
                  Book a Demo
                </button>
                <small className="fo-sim-mobile-trust">100% SOVEREIGN INDIAN CLOUD · RBI & GST COMPLIANT</small>
              </div>
            </div>
          )}

          {/* Simulated Hero Section Background */}
          <div className="fo-sim-hero">
            <div className="fo-sim-hero__container">
              <span className="fo-sim-hero__eyebrow">✦ CONNECTED BUSINESS PLATFORM</span>
              <h2>Your business moves as one.<br /><em>Your software should too.</em></h2>
              <p>
                flowOne connects finance, inventory, compliance and AI into one continuous transactional fabric.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-in Elementor Pro Implementation Guide */}
      {specDrawerOpen && (
        <aside className="fo-spec-drawer" role="complementary" aria-label="Elementor Implementation Spec">
          <div className="fo-spec-drawer__header">
            <h3>Elementor Pro Mega Menu Rebuild Spec</h3>
            <button type="button" onClick={() => setSpecDrawerOpen(false)}>✕</button>
          </div>
          <div className="fo-spec-drawer__content">
            <section className="fo-spec-sec">
              <h4>1. Elementor Widget Mapping</h4>
              <ul>
                <li><strong>Widget:</strong> Nav Menu widget (Pro) with Mega Menu enabled.</li>
                <li><strong>Content Width:</strong> Full Width (100%) or Boxed (1240px).</li>
                <li><strong>Container Structure:</strong> Outer Flex Container (Direction: Column) &gt; Inner Grid Container (Columns: 1fr 340px) &gt; Footer Strip (Flex Row).</li>
              </ul>
            </section>

            <section className="fo-spec-sec">
              <h4>2. Typography Roles</h4>
              <ul>
                <li><strong>Column Heading:</strong> Manrope 800, 11px, Line-Height 1.2, Letter-Spacing 0.08em, Uppercase (#0528F2).</li>
                <li><strong>Item Label:</strong> Manrope 700, 14px, Line-Height 1.25, Letter-Spacing -0.01em (#0D0D0D default, #0528F2 hover).</li>
                <li><strong>Item Description:</strong> Manrope 500, 12px, Line-Height 1.4 (#6B7280).</li>
                <li><strong>CTA Text:</strong> Manrope 700, 13px, Letter-Spacing 0.01em (#FFFFFF on #0528F2).</li>
              </ul>
            </section>

            <section className="fo-spec-sec">
              <h4>3. Brand Global Color Variables</h4>
              <ul>
                <li><code>--flow-primary</code>: #0528F2</li>
                <li><code>--flow-ink</code>: #0D0D0D</li>
                <li><code>--neutral-700</code>: #374151</li>
                <li><code>--neutral-500</code>: #6B7280</li>
                <li><code>--neutral-50</code>: #F7F8FA</li>
                <li><code>--flow-cyan-bright</code>: #05C7F2</li>
              </ul>
            </section>
          </div>
        </aside>
      )}
    </div>
  );
}

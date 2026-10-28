import { memo, useEffect, useRef, useState } from "react";
import { Button, Icon } from "./components/flowone";
import { WebsiteHeader } from "./components/navigation-system";
import { BookDemoModal } from "./components/book-demo";
import LivingTransactionStackC from "./components/LivingTransactionStackC";
import ConnectedRealityNestedTabs from "./components/ConnectedRealityNestedTabs";
import PerspectiveShift from "./components/PerspectiveShift";
import ConnectedBusinessAtlas from "./components/ConnectedBusinessAtlas";
import AIAdvantageSection from "./components/AIAdvantageSection";
import AIAdvantageIntelligenceUnfoldsView from "./components/AIAdvantageIntelligenceUnfoldsView";
import IntelligenceMomentView from "./components/IntelligenceMomentView";
import SignalBecomesClearSection from "./components/SignalBecomesClearSection";
import IntelligenceCurrentSection from "./components/IntelligenceCurrentSection";
import ClarityLensSection from "./components/ClarityLensSection";
import ConnectedPathSection from "./components/ConnectedPathSection";
import ConnectedCurrentSection from "./components/ConnectedCurrentSection";
import AIAdvantageConceptBar from "./components/AIAdvantageConceptBar";
import PredictiveDecisionsSection from "./components/PredictiveDecisionsSection";
import DecisionObservatorySection from "./components/DecisionObservatorySection";
import DecisionObservatoryTabsView from "./components/DecisionObservatoryTabsView";
import PredictiveOneInsightView from "./components/PredictiveOneInsightView";
import PredictiveForecastBriefView from "./components/PredictiveForecastBriefView";
import PredictiveSignalToConsequenceView from "./components/PredictiveSignalToConsequenceView";
import BusinessOutcomesBreakthroughs from "./components/BusinessOutcomesBreakthroughs";
import OneFlowDifferentViews from "./components/OneFlowDifferentViews";
import CausalityStadiumLoop from "./components/CausalityStadiumLoop";
import "./final-homepage.css";

/* ==========================================================================
   Hero Pipeline Fragments Data (Source of truth from approved design)
   ========================================================================== */
const heroLeftFragments = [
  { id: "sales", label: "SALES & CRM", metric: "SO-10482", detail: "Order Confirmed", status: "CONNECTED" },
  { id: "stock", label: "WAREHOUSE & STOCK", metric: "125 Units", detail: "Allocated DC-02", status: "IN SYNC" },
  { id: "finance", label: "FINANCE & LEDGER", metric: "INV-10482", detail: "₹5,90,000 Open", status: "REAL-TIME" },
] as const;

const heroRightFragments = [
  { id: "gst", label: "GST COMPLIANCE", metric: "IRN Cleared", detail: "Instant E-Invoice", status: "VALIDATED" },
  { id: "bank", label: "BANKING & CASH", metric: "Auto-Recon", detail: "HDFC Matched", status: "RECEIVED" },
  { id: "ai", label: "AI INTELLIGENCE", metric: "92% Accuracy", detail: "Cash Probability", status: "ACTIVE" },
] as const;

/* ==========================================================================
   HeroFlow — Complete Dual-Flank Converging Pipeline Canvas
   ========================================================================== */
const HeroFlow = memo(function HeroFlow() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setPulseIndex(i => (i + 1) % 3);
    }, 2400);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-pipeline-console"
      aria-label="flowOne Central Architecture: 6 business fragments connected to the central flowOne engine via live pipelines."
    >
      <div className="hero-pipeline-beam" aria-hidden="true" />

      {/* Top Telemetry Header */}
      <div className="hero-pipeline-topbar">
        <div className="hero-live-beacon" aria-label="System status: Live operating telemetry">
          <i aria-hidden="true" />
          <span>LIVE OPERATIONAL CONDUIT</span>
        </div>
        <div className="hero-topbar-sync">
          <span className="hero-sync-pulse-badge">6 OF 6 FRAGMENTS IN SYNC</span>
          <span className="hero-latency-tag">TXN-10482 · 14ms</span>
        </div>
      </div>

      {/* Main Dual-Flank Converging Pipeline Canvas */}
      <div className="hero-pipeline-stage">
        {/* LEFT FLANK (3 Fragments) */}
        <div className="hero-flank hero-flank-left">
          {heroLeftFragments.map((frag, idx) => (
            <div
              className={`hero-frag-card is-${frag.id} ${pulseIndex === idx ? "is-pulsing" : ""}`}
              key={frag.id}
            >
              <div className="hero-frag-meta">
                <span className="hero-frag-tag">{frag.label}</span>
                <span className="hero-frag-status">{frag.status}</span>
              </div>
              <div className="hero-frag-body">
                <strong>{frag.metric}</strong>
                <small>{frag.detail}</small>
              </div>
              <div className="hero-frag-port hero-port-right" aria-hidden="true">
                <i />
              </div>
            </div>
          ))}
        </div>

        {/* LEFT PIPELINES (SVG Conduits converging into Center) */}
        <div className="hero-conduits-col hero-conduits-left" aria-hidden="true">
          <svg className="hero-conduit-svg" viewBox="0 0 70 210" fill="none">
            {/* Top branch: left top card to center top */}
            <path d="M 0 35 C 35 35, 35 75, 70 75" className="conduit-rail-path" />
            <path d="M 0 35 C 35 35, 35 75, 70 75" className="conduit-rail-glow" />
            {/* Mid branch: straight into center */}
            <path d="M 0 105 L 70 105" className="conduit-rail-path" />
            <path d="M 0 105 L 70 105" className="conduit-rail-glow" />
            {/* Bottom branch: left bottom card to center bottom */}
            <path d="M 0 175 C 35 175, 35 135, 70 135" className="conduit-rail-path" />
            <path d="M 0 175 C 35 175, 35 135, 70 135" className="conduit-rail-glow" />

            {/* Inward Moving Energy Pulses */}
            <circle className="conduit-pulse-bead conduit-pulse-left-1" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-left-2" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-left-3" r="3.5" />
          </svg>
        </div>

        {/* CENTER ENGINE HUB (flowOne Core) */}
        <div className="hero-hub-center">
          <div className="hero-hub-beacon-rings" aria-hidden="true">
            <span className="hub-ring hub-ring-1" />
            <span className="hub-ring hub-ring-2" />
          </div>

          <div className="hero-hub-card">
            <div className="hero-hub-header">
              <div className="hero-hub-emblem" aria-hidden="true">
                <img src="/assets/flowone-spark-mark.png" alt="" className="hero-hub-logo-img" />
                <span className="hero-hub-beacon-dot" />
              </div>
              <div className="hero-hub-branding">
                <strong className="hero-hub-brand-name">flowOne</strong>
                <span className="hero-hub-brand-sub">CORE ENGINE</span>
              </div>
            </div>

            <div className="hero-hub-payload">
              <span className="hero-hub-kicker">UNIFIED TRANSACTION FABRIC</span>
              <strong className="hero-hub-txn">TXN-10482</strong>
              <div className="hero-hub-val-row">
                <span className="hero-hub-amount">₹5,90,000</span>
                <span className="hero-hub-state-pill">IN SYNC</span>
              </div>
            </div>

            <div className="hero-hub-sync-status">
              <span className="hero-hub-status-dot" aria-hidden="true" />
              <span>Zero Silo Drift · Single Source of Truth</span>
            </div>
          </div>
        </div>

        {/* RIGHT PIPELINES (SVG Conduits converging into Center) */}
        <div className="hero-conduits-col hero-conduits-right" aria-hidden="true">
          <svg className="hero-conduit-svg" viewBox="0 0 70 210" fill="none">
            {/* Top branch: right top card to center top */}
            <path d="M 70 35 C 35 35, 35 75, 0 75" className="conduit-rail-path" />
            <path d="M 70 35 C 35 35, 35 75, 0 75" className="conduit-rail-glow" />
            {/* Mid branch: straight into center */}
            <path d="M 70 105 L 0 105" className="conduit-rail-path" />
            <path d="M 70 105 L 0 105" className="conduit-rail-glow" />
            {/* Bottom branch: right bottom card to center bottom */}
            <path d="M 70 175 C 35 175, 35 135, 0 135" className="conduit-rail-path" />
            <path d="M 70 175 C 35 175, 35 135, 0 135" className="conduit-rail-glow" />

            {/* Inward Moving Energy Pulses */}
            <circle className="conduit-pulse-bead conduit-pulse-right-1" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-right-2" r="3.5" />
            <circle className="conduit-pulse-bead conduit-pulse-right-3" r="3.5" />
          </svg>
        </div>

        {/* RIGHT FLANK (3 Fragments) */}
        <div className="hero-flank hero-flank-right">
          {heroRightFragments.map((frag, idx) => (
            <div
              className={`hero-frag-card is-${frag.id} ${pulseIndex === idx ? "is-pulsing" : ""}`}
              key={frag.id}
            >
              <div className="hero-frag-port hero-port-left" aria-hidden="true">
                <i />
              </div>
              <div className="hero-frag-meta">
                <span className="hero-frag-tag">{frag.label}</span>
                <span className="hero-frag-status">{frag.status}</span>
              </div>
              <div className="hero-frag-body">
                <strong>{frag.metric}</strong>
                <small>{frag.detail}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="hero-pipeline-footer">
        <div className="hero-footer-stat">
          <span>PIPELINE LATENCY</span>
          <strong>&lt; 14ms</strong>
        </div>
        <div className="hero-footer-divider" aria-hidden="true" />
        <div className="hero-footer-stat">
          <span>CONTEXT INTEGRITY</span>
          <strong>100%</strong>
        </div>
        <div className="hero-footer-divider" aria-hidden="true" />
        <div className="hero-footer-stat">
          <span>STATUTORY AUDIT</span>
          <strong>IMMUTABLE</strong>
        </div>
      </div>
    </div>
  );
});

/* ==========================================================================
   FinalFooter — Dedicated 5-Layer Enterprise Footer System for Final Homepage
   ========================================================================== */
function FinalFooter({ onDemo }: { onDemo: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="home-footer" id="flowone-footer" role="contentinfo">
      <div className="home-container footer-shell">
        {/* LAYER 1: CONVERSION LAUNCHPAD */}
        <section className="footer-launchpad" aria-label="Ready to connect your business flow">
          <div className="footer-launchpad__ambient-glow" aria-hidden="true" />
          <div className="footer-launchpad__content">
            <div className="hero-eyebrow-container" style={{ marginBottom: "1.1rem" }}>
              <div className="hero-modern-eyebrow is-static is-dark-theme" role="note" aria-label="One Connected Business Flow">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>CONVERGENCE</span>
                </span>
                <span className="hero-eyebrow-title">ONE CONNECTED BUSINESS FLOW</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <h2 className="footer-launchpad__title">
              Ready to connect the work that moves your business?
            </h2>
            <p className="footer-launchpad__desc">
              Join forward-looking Indian mid-market enterprises replacing fragmented ERPs and manual spreadsheet workarounds with one continuous, deterministic transaction flow.
            </p>
            <div className="footer-launchpad__trust-pills">
              <span className="footer-pill">
                <svg className="footer-pill__icon" viewBox="0 0 16 16" fill="none"><path d="M13.333 4 6 11.333 2.667 8" stroke="#05C7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Zero Rip-and-Replace
              </span>
              <span className="footer-pill">
                <svg className="footer-pill__icon" viewBox="0 0 16 16" fill="none"><path d="M8 1.333 2.667 4v4c0 3.333 2.266 6.467 5.333 7.333 3.067-.866 5.333-4 5.333-7.333V4L8 1.333z" stroke="#05C7F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                100% Domestic Cloud Vault
              </span>
              <span className="footer-pill">
                <svg className="footer-pill__icon" viewBox="0 0 16 16" fill="none"><path d="M2 4.667h12M2 8h12M2 11.333h12" stroke="#05C7F2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Native GSTN & 48+ Indian Banks
              </span>
            </div>
          </div>
          <div className="footer-launchpad__actions">
            <Button size="large" onClick={onDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>
              Book a Live Demo
            </Button>
            <a href="#living-transaction" className="footer-launchpad__sandbox-btn">
              <span>Explore Interactive Sandbox</span>
              <span className="footer-launchpad__spark">⚡</span>
            </a>
          </div>
        </section>

        {/* LAYER 2: 6-PILLAR ARCHITECTURAL SITEMAP */}
        <nav className="footer-sitemap" aria-label="Complete Sitemap & Solutions Directory">
          {/* Pillar 1: Solutions */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">SOLUTIONS & SUITES</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#capabilities">Customer-to-Cash (AR)</a></li>
              <li><a href="#capabilities">Procure-to-Pay (AP)</a></li>
              <li><a href="#capabilities">Inventory & Warehouse</a></li>
              <li><a href="#capabilities">Cash, Treasury & Banking</a></li>
              <li><a href="#capabilities">GST Compliance & E-Way</a></li>
              <li><a href="#capabilities">Financial Closure & Controls</a></li>
              <li><a href="#capabilities">Working Capital Velocity</a></li>
            </ul>
          </div>

          {/* Pillar 2: Platform */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">CORE PLATFORM</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#connection">Platform Architecture</a></li>
              <li><a href="#connection">Unified Event Fabric</a></li>
              <li><a href="#connection">Deterministic Flow Pipelines</a></li>
              <li><a href="#connection">48+ Bank & GSTN Gateways</a></li>
              <li><a href="#connection">Document Extraction OCR</a></li>
              <li><a href="#connection">Policy Clearance Matrices</a></li>
              <li><a href="#connection">Security & Trust Architecture</a></li>
            </ul>
          </div>

          {/* Pillar 3: AI Runtime */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">AGENTIC AI RUNTIME</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#ai-inside-flow">flowOne AI Business Agent</a></li>
              <li><a href="#ai-inside-flow">WhatsApp Business AI Rails</a></li>
              <li><a href="#ai-inside-flow">Email Intelligence & Ingestion</a></li>
              <li><a href="#ai-inside-flow">Predictive Cash Forecasting</a></li>
              <li><a href="#ai-inside-flow">Credit Risk & Anomaly Alerts</a></li>
              <li><a href="#ai-inside-flow">Autonomous Bank Reconciliation</a></li>
              <li><a href="#ai-inside-flow">Maker-Checker Governance</a></li>
            </ul>
          </div>

          {/* Pillar 4: Built for */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">BUILT FOR</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#roles">CFOs & Finance Leaders</a></li>
              <li><a href="#roles">Finance & Accounting</a></li>
              <li><a href="#roles">AR & Collections Teams</a></li>
              <li><a href="#roles">AP & Procurement Controls</a></li>
              <li><a href="#roles">Treasury & Banking</a></li>
              <li><a href="#roles">Operations & Warehouse</a></li>
              <li><a href="#roles">Growing & Multi-Location</a></li>
            </ul>
          </div>

          {/* Pillar 5: Resources */}
          <div className="footer-col">
            <div className="footer-col__header">
              <h3 className="footer-col__title">RESOURCES & GUIDES</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#proof">Practitioner Blog</a></li>
              <li><a href="#proof">GST & E-Invoicing Playbooks</a></li>
              <li><a href="#proof">MSME 45-Day Payment Rule Guide</a></li>
              <li><a href="#proof">Working Capital Benchmarks</a></li>
              <li><a href="#proof">Architecture Demos & Videos</a></li>
              <li><a href="#proof">CFO Perspectives & Strategy</a></li>
              <li><a href="#proof">Interactive ROI Calculator</a></li>
            </ul>
          </div>

          {/* Pillar 6: Company & Ecosystem */}
          <div className="footer-col" id="founder-diary">
            <div className="footer-col__header">
              <h3 className="footer-col__title">COMPANY & ECOSYSTEM</h3>
            </div>
            <ul className="footer-col__links">
              <li><a href="#trust">About flowOne</a></li>
              <li><a href="#trust">Our Story & Mission</a></li>
              <li><a href="#trust">Leadership & Values</a></li>
              <li>
                <a href="/founders-diary/" className="footer-link-highlight">
                  <span>Founder’s Diary</span>
                  <span className="footer-link-badge">INSIGHTS</span>
                </a>
              </li>
              <li>
                <a href="#trust" className="footer-link-highlight">
                  <span>Careers</span>
                  <span className="footer-link-badge footer-link-badge--hiring">WE’RE HIRING</span>
                </a>
              </li>
              <li><a href="#trust">Partner & Integrator Program</a></li>
              <li><a href="#trust">Contact & Enterprise Advisory</a></li>
            </ul>
          </div>
        </nav>

        {/* LAYER 3: INSTITUTIONAL TRUST & SOVEREIGN FOOTPRINT */}
        <section className="footer-trust-deck" aria-label="Physical Offices and Sovereign Data Residency">
          <div className="footer-trust-card">
            <div className="footer-trust-card__header">
              <div className="footer-trust-card__icon-box">
                <svg viewBox="0 0 24 24" fill="none" className="footer-trust-card__icon"><path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 9v.01M9 13v.01M9 17v.01M17 13v.01M17 17v.01" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <span className="footer-trust-card__tag">LEGAL ENTITY</span>
                <h4 className="footer-trust-card__title">Registered Office</h4>
              </div>
            </div>
            <address className="footer-trust-card__address">
              Building #. 9-1-66, (501) Shyam Chabbrss Vihar,<br />
              SD Road, Secunderabad, Telangana 500003, India
            </address>
          </div>

          <div className="footer-trust-card">
            <div className="footer-trust-card__header">
              <div className="footer-trust-card__icon-box">
                <svg viewBox="0 0 24 24" fill="none" className="footer-trust-card__icon"><path d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10z" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="11" r="2.5" stroke="#05C7F2" strokeWidth="1.75"/></svg>
              </div>
              <div>
                <span className="footer-trust-card__tag">PRODUCT & TECH HQ</span>
                <h4 className="footer-trust-card__title">Corporate Office</h4>
              </div>
            </div>
            <address className="footer-trust-card__address">
              Office 207 & 208 (2nd Floor), Manjeera Trinity Corporate,<br />
              JNTU-Hitech City Road, Kukatpally, Hyderabad, Telangana 500072, India
            </address>
          </div>

          <div className="footer-trust-card footer-trust-card--highlight">
            <div className="footer-trust-card__header">
              <div className="footer-trust-card__icon-box">
                <svg viewBox="0 0 24 24" fill="none" className="footer-trust-card__icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="#05C7F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <span className="footer-trust-card__tag footer-trust-card__tag--sovereign">SOVEREIGN RESIDENCY</span>
                <h4 className="footer-trust-card__title">Institutional Cloud Security</h4>
              </div>
            </div>
            <p className="footer-trust-card__info">
              100% Domestic Indian Cloud Vault (AWS Mumbai / GCP Delhi) · AES-256-GCM encryption at rest & in transit · SOC 2 Type II / ISO 27001 readiness · Deterministic cryptographic audit trail.
            </p>
          </div>
        </section>

        {/* LAYER 4: TELEMETRY & DIRECT CONTACT RAILS */}
        <section className="footer-telemetry-bar" aria-label="System status and contact channels">
          <div className="footer-telemetry-bar__status">
            <span className="footer-telemetry-beacon">
              <i className="footer-telemetry-beacon__dot" aria-hidden="true" />
              <strong className="footer-telemetry-beacon__label">ALL SYSTEMS OPERATIONAL</strong>
            </span>
            <span className="footer-telemetry-sep" aria-hidden="true">/</span>
            <span className="footer-telemetry-metric">99.99% PLATFORM UPTIME</span>
            <span className="footer-telemetry-sep" aria-hidden="true">/</span>
            <span className="footer-telemetry-metric">TRANSACTION ENGINE ACTIVE</span>
          </div>

          <div className="footer-telemetry-bar__channels">
            <a href="tel:+917670890889" className="footer-channel-link">
              <svg viewBox="0 0 24 24" fill="none" className="footer-channel-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>+91 7670890889</span>
            </a>
            <a href="mailto:sales@flowone.in" className="footer-channel-link">
              <svg viewBox="0 0 24 24" fill="none" className="footer-channel-icon"><rect width="20" height="16" x="2" y="4" rx="2" stroke="currentColor" strokeWidth="1.75"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
              <span>sales@flowone.in</span>
            </a>
            <div className="footer-social-links" aria-label="Social media channels">
              <a href="https://linkedin.com/company/flowone" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://twitter.com/flowone_in" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="X (formerly Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com/@flowone" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://facebook.com/flowone" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://instagram.com/flowone.in" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* LAYER 5: BRAND & LEGAL BASELINE */}
        <section className="footer-baseline">
          <div className="footer-baseline__brand">
            <img src="/assets/flowOne-Logo_Inverse.svg" alt="flowOne" className="footer-baseline__logo" />
            <span className="footer-baseline__motto">REIMAGINE BUSINESS WITH AI</span>
          </div>

          <p className="footer-baseline__copy">
            © 2026 flowOne Technologies Pvt. Ltd. All rights reserved.
          </p>

          <div className="footer-baseline__legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Data & Sovereign Residency</a>
            <a href="#cookies">Cookie Policy</a>
            <button type="button" onClick={scrollToTop} className="footer-back-to-top" aria-label="Scroll back to top">
              <span>Back to top</span>
              <svg viewBox="0 0 16 16" fill="none" className="footer-back-to-top__icon"><path d="M8 12.667V3.333m0 0L4 7.333m4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </section>
      </div>
    </footer>
  );
}



/* ==========================================================================
   CausalityStage Definition & Verified Data
   ========================================================================== */
interface CausalityStage {
  id: string;
  num: string;
  name: string;
  progressPercent: number;
  isFinal?: boolean;
  consequence: string;
  metricBadge: string;
  contextTag: string;
}

const causalityStages: CausalityStage[] = [
  {
    id: "order",
    num: "01",
    name: "Order",
    progressPercent: 20,
    consequence: "Commercial terms, customer GSTIN, and line items are locked into one shared transaction context without re-entry.",
    metricBadge: "SO-10482 · Confirmed",
    contextTag: "Commercial Context Formed",
  },
  {
    id: "inventory",
    num: "02",
    name: "Inventory",
    progressPercent: 36,
    consequence: "Stock is allocated in real time. Physical goods lock against the sales order with zero spreadsheet drift.",
    metricBadge: "125 Units · DC-02",
    contextTag: "Inventory In Sync",
  },
  {
    id: "invoice",
    num: "03",
    name: "Invoice",
    progressPercent: 52,
    consequence: "Operational fulfillment converts into a statutory tax invoice with IRN and tax metadata permanently attached.",
    metricBadge: "INV-10482 · 18% GST",
    contextTag: "Tax Cleared & Issued",
  },
  {
    id: "receivable",
    num: "04",
    name: "Receivable",
    progressPercent: 68,
    consequence: "The open balance posts directly to the accounting ledger. Finance sees terms, due dates, and aging without lag.",
    metricBadge: "₹5,90,000 · Net 30",
    contextTag: "Real-Time Ledger Posted",
  },
  {
    id: "cash",
    num: "05",
    name: "Cash",
    progressPercent: 84,
    consequence: "Inbound payment matches the invoice automatically. Ledger clears and UTR is logged with zero statement ticking.",
    metricBadge: "HDFC Matched 98%",
    contextTag: "Auto-Reconciled",
  },
  {
    id: "decision",
    num: "06",
    name: "Decision",
    progressPercent: 100,
    isFinal: true,
    consequence: "Real-time working capital, liquidity, and operational metrics update instantly. Leadership acts on verified truth.",
    metricBadge: "Working Capital Updated",
    contextTag: "Continuous Loop Complete",
  },
];

/* ==========================================================================
   Section 02 — The Business Causality Map Component
   ========================================================================== */
const CausalityMap = memo(function CausalityMap() {
  const [expandedStage, setExpandedStage] = useState<string | null>("order");
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const toggleStage = (id: string) => {
    setExpandedStage(curr => (curr === id ? null : id));
  };

  return (
    <section id="business-causality" className="new-home-section new-home-causality-section" aria-labelledby="causality-heading">
      <div className="home-container">
        <div className="causality-panel">
          {/* Subtle Ambient Decorative Glow */}
          <div className="causality-ambient-glow" aria-hidden="true" />

          {/* Section Introduction */}
          <div className="causality-intro">
            <div className="hero-eyebrow-container" style={{ marginBottom: "1rem" }}>
              <div className="hero-modern-eyebrow is-static is-dark-theme" role="note" aria-label="The Business Loop">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>THE LOOP</span>
                </span>
                <span className="hero-eyebrow-title">CLOSED-CIRCUIT CAUSALITY</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <h2 id="causality-heading" className="causality-heading">
              Business doesn’t happen in modules.
            </h2>
            <p className="causality-subtext">
              One continuous path. Six business stages. A chain of consequences.
            </p>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="causality-divider" aria-hidden="true" />

          {/* Six Sequential Business Stages */}
          <div className="causality-stages" role="list" aria-label="Six sequential business stages">
            {causalityStages.map((stage) => {
              const isExpanded = expandedStage === stage.id;
              const isHovered = hoveredStage === stage.id;
              const isStageActive = isExpanded || isHovered;

              return (
                <div
                  key={stage.id}
                  className={`causality-stage-item ${isExpanded ? "is-expanded" : ""} ${stage.isFinal ? "is-final-stage" : ""}`}
                  role="listitem"
                  onPointerEnter={() => setHoveredStage(stage.id)}
                  onPointerLeave={() => setHoveredStage(null)}
                >
                  <button
                    type="button"
                    className={`causality-stage-trigger ${isStageActive ? "is-active" : ""}`}
                    onClick={() => toggleStage(stage.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`causality-drawer-${stage.id}`}
                    id={`causality-trigger-${stage.id}`}
                  >
                    {/* Left: Number + Separator + Label */}
                    <div className="causality-stage-meta">
                      <span className="causality-stage-num">{stage.num}</span>
                      <span className="causality-stage-sep" aria-hidden="true">—</span>
                      <span className="causality-stage-name">{stage.name}</span>
                    </div>

                    {/* Middle: Progressive Horizontal Line */}
                    <div className="causality-stage-line-container" aria-hidden="true">
                      <div className="causality-stage-line-track">
                        <div
                          className="causality-stage-line-fill"
                          style={{ width: `${stage.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Right: State Indicator */}
                    <div className="causality-stage-indicator">
                      {stage.isFinal ? (
                        <div className="causality-completed-indicator" title="Completed business loop">
                          <span className="causality-completed-icon" aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                              <path d="M13.333 4 6 11.333 2.667 8" stroke="#05C7F2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className="causality-completed-text">LOOP COMPLETE</span>
                        </div>
                      ) : (
                        <span className={`causality-chevron-indicator ${isExpanded ? "is-rotated" : ""}`} aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Expandable Consequence Drawer */}
                  <div
                    id={`causality-drawer-${stage.id}`}
                    role="region"
                    aria-labelledby={`causality-trigger-${stage.id}`}
                    className={`causality-stage-drawer ${isExpanded ? "is-open" : ""}`}
                    hidden={!isExpanded}
                  >
                    <div className="causality-drawer-inner">
                      <div className="causality-drawer-connector" aria-hidden="true" />
                      <div className="causality-drawer-content">
                        <p className="causality-consequence-text">{stage.consequence}</p>
                        <div className="causality-telemetry-pill">
                          <span className="causality-telemetry-dot" aria-hidden="true" />
                          <span className="causality-telemetry-badge">{stage.metricBadge}</span>
                          <span className="causality-telemetry-sep" aria-hidden="true">·</span>
                          <span className="causality-telemetry-status">{stage.contextTag}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="causality-divider" aria-hidden="true" />

          {/* Concluding Statement */}
          <div className="causality-closing">
            <h3 className="causality-closing-headline">
              One business event. A chain of consequences.
            </h3>
            <p className="causality-closing-sub">
              Your software should understand the whole journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ==========================================================================
   FinalHomepage — Dedicated Final Homepage for Edits
   Header + Hero + Causality + Living Txn + Blueprint + AI + Decisions + Outcomes + Dedicated Footer
   ========================================================================== */
export default function FinalHomepage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);
  const closeDemo = () => setDemoOpen(false);

  // Section 05 Concept Comparator: Classic ("One flow. Different views.") vs Direction 05B (The Business Control Atlas) vs Direction 05A (The Perspective Shift) vs All
  const [section05Concept, setSection05Concept] = useState<"classic" | "05B" | "05A" | "all">("classic");

  // Section 05 AI Advantage Concept Comparator: "unfolds" (Direction A) vs "current" (Baseline Stack) vs "moment" (Direction B) vs "signal-clear" (Direction 01) vs "intelligence-current" (01 — The Intelligence Current) vs "clarity-lens" (02 — The Clarity Lens) vs "connected-path" (03 — The Connected Path) vs "connected-current" (03B — The Connected Current)
  const [section05AIConcept, setSection05AIConcept] = useState<"current" | "unfolds" | "moment" | "signal-clear" | "intelligence-current" | "clarity-lens" | "connected-path" | "connected-current">("unfolds");

  // Section 06 Experimental Concept Comparator: Direction 06B (The Decision Observatory) vs Direction 06B-tabs (Observatory Top Tabs) vs Direction 06A (The Future Signal) vs View C (The One Insight) vs View D (The Forecast Brief) vs View E (Signal to Consequence) vs All
  const [section06Concept, setSection06Concept] = useState<"06B" | "06B-tabs" | "06A" | "06C" | "06D" | "06E" | "all">("06B-tabs");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();

    // Section 05 AI Advantage URL query / hash parsing
    const aiParam = params.get("ai")?.toLowerCase();
    if (aiParam === "connected-current" || aiParam === "the-connected-current" || aiParam === "03b" || aiParam === "current-path" || hash.includes("connected-current") || hash.includes("03b")) {
      setSection05AIConcept("connected-current");
    } else if (aiParam === "connected-path" || aiParam === "the-connected-path" || aiParam === "direction-03" || aiParam === "03" || hash.includes("connected-path")) {
      setSection05AIConcept("connected-path");
    } else if (aiParam === "clarity-lens" || aiParam === "the-clarity-lens" || aiParam === "direction-02" || aiParam === "02" || hash.includes("clarity-lens")) {
      setSection05AIConcept("clarity-lens");
    } else if (aiParam === "intelligence-current" || aiParam === "the-intelligence-current" || aiParam === "current-flow" || aiParam === "flow-current" || hash.includes("intelligence-current") || hash.includes("the-intelligence-current")) {
      setSection05AIConcept("intelligence-current");
    } else if (aiParam === "signal-clear" || aiParam === "direction-01" || aiParam === "01" || aiParam === "clear" || hash.includes("signal-clear") || hash.includes("direction-01")) {
      setSection05AIConcept("signal-clear");
    } else if (aiParam === "moment" || aiParam === "direction-b" || aiParam === "05b" || hash.includes("ai-moment") || hash.includes("direction-b")) {
      setSection05AIConcept("moment");
    } else if (aiParam === "unfolds" || aiParam === "direction-a" || aiParam === "05a" || hash.includes("ai-unfolds") || hash.includes("direction-a")) {
      setSection05AIConcept("unfolds");
    } else if (aiParam === "current" || hash.includes("ai-current")) {
      setSection05AIConcept("current");
    }

    const sec5Param = params.get("sec5")?.toLowerCase();
    if (sec5Param === "05b" || sec5Param === "atlas" || hash.includes("atlas")) {
      setSection05Concept("05B");
    } else if (sec5Param === "05a" || sec5Param === "perspective" || hash.includes("perspective")) {
      setSection05Concept("05A");
    } else if (sec5Param === "all" || hash.includes("sec5-all")) {
      setSection05Concept("all");
    } else if (sec5Param === "classic" || hash.includes("roles") || hash.includes("classic")) {
      setSection05Concept("classic");
    }

    const sec6Param = params.get("sec6")?.toLowerCase();
    if (sec6Param === "06b-tabs" || sec6Param === "tabs" || sec6Param === "observatory-tabs" || hash.includes("observatory-tabs") || hash.includes("tabs")) {
      setSection06Concept("06B-tabs");
    } else if (sec6Param === "06a" || sec6Param === "future-signal" || hash.includes("future-signal")) {
      setSection06Concept("06A");
    } else if (sec6Param === "06b" || sec6Param === "observatory" || hash.includes("observatory")) {
      setSection06Concept("06B");
    } else if (sec6Param === "06c" || sec6Param === "one-insight" || sec6Param === "view-c" || hash.includes("one-insight")) {
      setSection06Concept("06C");
    } else if (sec6Param === "06d" || sec6Param === "forecast-brief" || sec6Param === "brief" || sec6Param === "view-d" || hash.includes("forecast-brief") || hash.includes("brief")) {
      setSection06Concept("06D");
    } else if (sec6Param === "06e" || sec6Param === "signal-consequence" || sec6Param === "chain" || sec6Param === "view-e" || hash.includes("signal-consequence") || hash.includes("view-e")) {
      setSection06Concept("06E");
    } else if (sec6Param === "all" || hash.includes("sec6-all")) {
      setSection06Concept("all");
    }
  }, []);

  return (
    <main id="main-content" className="homepage new-homepage">
      <a className="fo-skip-link" href="#home-hero">Skip to main content</a>

      {/* 1. CURRENT HEADER (Reused without redesign) */}
      <WebsiteHeader onDemo={openDemo} />

      {/* 2. APPROVED HERO SECTION (Preserved complete design & HeroFlow) */}
      <section id="home-hero" className="home-hero">
        <div className="home-container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow-container">
              <div className="hero-modern-eyebrow is-static" role="note" aria-label="Connected Business Platform">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>PLATFORM</span>
                </span>
                <span className="hero-eyebrow-title">CONNECTED BUSINESS PLATFORM</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <h1>
              Your business moves as one.<br />
              <em>Your software should too.</em>
            </h1>
            <p>
              flowOne is a composable business platform that connects finance, operations, compliance and{" "}
              <span className="hero-gradient-text">AI into one continuous flow</span>
              —uniting the workflows, systems and intelligence that move your business forward.
            </p>
            <div className="hero-progression" aria-label="Start where it matters. Connect the flow. Scale across the business.">
              <span className="hero-progression-phase">
                <span>Start where it matters.</span>
                <span className="hero-progression-arrow" aria-hidden="true">→</span>
              </span>
              <span className="hero-progression-phase">
                <span>Connect the flow.</span>
                <span className="hero-progression-arrow" aria-hidden="true">→</span>
              </span>
              <span className="hero-progression-phase is-final">
                <span>Scale across the business.</span>
              </span>
            </div>
            <div className="hero-actions">
              <Button size="large" onClick={openDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>
                Book a Demo
              </Button>
              <a className="home-secondary-cta" href="#living-transaction">
                See How It Flows <Icon name="arrow" size={16} tone="action" />
              </a>
            </div>
            <div className="hero-trust-zone">
              <div className="hero-trust" aria-label="flowOne connects five areas of business">
                <span>FINANCE</span>
                <i />
                <span>OPERATIONS</span>
                <i />
                <span>COMPLIANCE</span>
                <i />
                <span>CASH</span>
                <i />
                <span>AI</span>
              </div>
              <small>One connected platform for the work that moves your business.</small>
            </div>
          </div>

          {/* Right Column: HeroFlow */}
          <HeroFlow />
        </div>
      </section>

      {/* 3. SECTION 02 — THE BUSINESS LOOP (THE STADIUM CLOSED-CIRCUIT LOOP) */}
      <CausalityStadiumLoop />

      {/* ==============================================================
          4. SECTION 03 — THE LIVING TRANSACTION
          Option C: Compact Stacking Deck (Cockpit Top · Compact 760px)
          ============================================================== */}
      <LivingTransactionStackC />

      {/* ==============================================================
          5. SECTION 04 — THE CONNECTED REALITY
          Suggestion 1: Department Nested Tabs (Stripe / Docs Reference Style)
          ============================================================== */}
      <ConnectedRealityNestedTabs />

      {/* ==============================================================
          AI ADVANTAGE · THE INTELLIGENCE MOMENT
          Concept Comparator: Current Design vs Direction A vs Direction B vs Direction 01 vs 01 — The Intelligence Current vs 02 — The Clarity Lens vs 03 — The Connected Path vs 03B — The Connected Current
          ============================================================== */}
      <AIAdvantageConceptBar
        activeConcept={section05AIConcept}
        onSelectConcept={(c) => setSection05AIConcept(c as "current" | "unfolds" | "moment" | "signal-clear" | "intelligence-current" | "clarity-lens" | "connected-path" | "connected-current")}
      />

      {section05AIConcept === "connected-current" ? (
        <ConnectedCurrentSection beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      ) : section05AIConcept === "connected-path" ? (
        <ConnectedPathSection beforeSectionBg="#FFFFFF" afterSectionBg="#F8FAFC" />
      ) : section05AIConcept === "clarity-lens" ? (
        <ClarityLensSection beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      ) : section05AIConcept === "intelligence-current" ? (
        <IntelligenceCurrentSection beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      ) : section05AIConcept === "signal-clear" ? (
        <SignalBecomesClearSection beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      ) : section05AIConcept === "moment" ? (
        <IntelligenceMomentView beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      ) : section05AIConcept === "unfolds" ? (
        <AIAdvantageIntelligenceUnfoldsView beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      ) : (
        <AIAdvantageSection beforeSectionBg="#F8FAFC" afterSectionBg="#FAFBFD" />
      )}

      {/* ==============================================================
          PREDICTIVE BUSINESS DECISIONS EXPERIMENTS
          Direction B: The Decision Observatory vs Direction A: The Future Signal vs View C: The One Insight
          ============================================================== */}
      <div className="living-concept-comparison-bar section-06-comparison-bar" aria-label="Predictive Decisions Concept Selector">
        <div className="home-container">
          <div className="living-concept-selector-shell">
            <div className="living-concept-meta">
              <span className="living-concept-beacon" aria-hidden="true" />
              <span className="living-concept-tag">Predictive Decisions · Compare Concepts</span>
            </div>
            <div className="living-concept-buttons" role="tablist" aria-label="Choose Predictive Decisions Concept">
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "06B-tabs"}
                className={`living-concept-btn ${section06Concept === "06B-tabs" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("06B-tabs")}
              >
                <span>Direction B2: Observatory (Top Tabs)</span>
                <span className="concept-pill-badge">Top Tabs · 2-Col Deck</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "06B"}
                className={`living-concept-btn ${section06Concept === "06B" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("06B")}
              >
                <span>Direction B: The Decision Observatory</span>
                <span className="concept-pill-badge">Interactive Signal Map</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "06A"}
                className={`living-concept-btn ${section06Concept === "06A" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("06A")}
              >
                <span>Direction A: The Future Signal</span>
                <span className="concept-pill-badge">Forecast Progression</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "06C"}
                className={`living-concept-btn ${section06Concept === "06C" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("06C")}
              >
                <span>View C: The One Insight</span>
                <span className="concept-pill-badge">Single Narrative</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "06D"}
                className={`living-concept-btn ${section06Concept === "06D" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("06D")}
              >
                <span>View D: The Forecast Brief</span>
                <span className="concept-pill-badge">Executive Briefing</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "06E"}
                className={`living-concept-btn ${section06Concept === "06E" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("06E")}
              >
                <span>View E: Signal to Consequence</span>
                <span className="concept-pill-badge">Causal Chain</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section06Concept === "all"}
                className={`living-concept-btn ${section06Concept === "all" ? "is-active" : ""}`}
                onClick={() => setSection06Concept("all")}
              >
                <span>View All Sequentially</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Direction 06B-tabs: The Decision Observatory (Top Tabs View) */}
      {(section06Concept === "06B-tabs" || section06Concept === "all") && (
        <DecisionObservatoryTabsView />
      )}

      {/* Render Direction 06B: The Decision Observatory (Preserved) */}
      {(section06Concept === "06B" || section06Concept === "all") && (
        <DecisionObservatorySection />
      )}

      {/* Render Direction 06A: The Future Signal (Preserved complete design) */}
      {(section06Concept === "06A" || section06Concept === "all") && (
        <PredictiveDecisionsSection />
      )}

      {/* Render View C: The One Insight (New Editorial Concept) */}
      {(section06Concept === "06C" || section06Concept === "all") && (
        <PredictiveOneInsightView />
      )}

      {/* Render View D: The Forecast Brief (New Executive Briefing Concept) */}
      {(section06Concept === "06D" || section06Concept === "all") && (
        <PredictiveForecastBriefView />
      )}

      {/* Render View E: Signal to Consequence (New Causal Chain Concept) */}
      {(section06Concept === "06E" || section06Concept === "all") && (
        <PredictiveSignalToConsequenceView />
      )}

      {/* ==============================================================
          7. SECTION 07 — BUSINESS OUTCOMES
          Direction 02: One Business. Four Breakthroughs. (Connected Thread)
          ============================================================== */}
      <BusinessOutcomesBreakthroughs />

      {/* ==============================================================
          ROLE-BASED INTELLIGENCE / CONNECTED BUSINESS ARCHITECTURE
          Classic: One flow. Different views. vs Atlas vs Perspective Shift
          ============================================================== */}
      <div className="living-concept-switch-bar section-05-comparison-bar" aria-label="Role Architecture Concept Selector">
        <div className="home-container">
          <div className="living-concept-selector-shell">
            <div className="living-concept-meta">
              <span className="living-concept-beacon" aria-hidden="true" />
              <span className="living-concept-tag">Role Architecture · Compare Concepts</span>
            </div>
            <div className="living-concept-buttons" role="tablist" aria-label="Choose Role Architecture Concept">
              <button
                type="button"
                role="tab"
                aria-selected={section05Concept === "classic"}
                className={`living-concept-btn ${section05Concept === "classic" ? "is-active" : ""}`}
                onClick={() => setSection05Concept("classic")}
              >
                <span>One Flow. Different Views</span>
                <span className="concept-pill-badge">Classic Role Views</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section05Concept === "05B"}
                className={`living-concept-btn ${section05Concept === "05B" ? "is-active" : ""}`}
                onClick={() => setSection05Concept("05B")}
              >
                <span>Business Control Atlas</span>
                <span className="concept-pill-badge">Architectural Atlas</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section05Concept === "05A"}
                className={`living-concept-btn ${section05Concept === "05A" ? "is-active" : ""}`}
                onClick={() => setSection05Concept("05A")}
              >
                <span>Perspective Shift</span>
                <span className="concept-pill-badge">Interactive Workspace</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={section05Concept === "all"}
                className={`living-concept-btn ${section05Concept === "all" ? "is-active" : ""}`}
                onClick={() => setSection05Concept("all")}
              >
                <span>View All Sequentially</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Classic Section: One flow. Different views. (Default) */}
      {(section05Concept === "classic" || section05Concept === "all") && (
        <OneFlowDifferentViews />
      )}

      {/* Render Direction 05B: The Business Control Atlas */}
      {(section05Concept === "05B" || section05Concept === "all") && (
        <ConnectedBusinessAtlas />
      )}

      {/* Render Direction 05A: The Perspective Shift (Preserved) */}
      {(section05Concept === "05A" || section05Concept === "all") && (
        <PerspectiveShift />
      )}

      {/* DEDICATED FINAL FOOTER */}
      <FinalFooter onDemo={openDemo} />

      {/* Interactive 3-Step Demo Modal System */}
      <BookDemoModal open={demoOpen} onClose={closeDemo} />
    </main>
  );
}

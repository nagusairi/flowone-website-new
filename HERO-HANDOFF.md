# flowOne Hero Section — Elementor Pro Build Handoff Specification

> **Target Platform:** WordPress with Elementor Pro (Containers, Custom Code / HTML, Headings, Text Editor, Button widgets, Custom CSS)  
> **Source Repository:** `flowOne-NewDesign`  
> **Section:** Section 01 — Homepage Hero (`#home-hero`)  
> **Specification Version:** 1.0 (Strict Code-Audit Release)  
> **Authoring Rule:** Every selector, dimension, color, animation, and breakpoint is derived verbatim from the audited source repository files. No approximations, redesigns, or assumed values are used. If something is unknown or missing, it is documented as `NOT FOUND IN CODE`.

---

## 1. SECTION OVERVIEW

### Purpose and Position on the Page
The Hero section (`#home-hero`) serves as the primary above-the-fold anchor and conversion centerpiece of the flowOne homepage. It introduces flowOne as a composable business platform unifying finance, operations, compliance, and AI into one continuous operating flow.

- **Preceding Component:** `WebsiteHeader` (`.fo-header`) — Sticky navigation bar (rendered immediately before `#home-hero`).
- **Succeeding Section:** Section 02: The Business Loop / Problem statement (`<section className="home-problem home-section">` with `.problem-grid`).

### Structural Summary
The section consists of a 2-column responsive grid (`.hero-grid`):
1. **Left Column (`.hero-copy`):** Architectural beacon pill eyebrow (`CONNECTED BUSINESS PLATFORM`), primary display heading (`<h1>`), value narrative paragraph with highlighted gradient inline text, 3-phase horizontal operational progression bar (`Start where it matters. → Connect the flow. → Scale across the business.`), high-contrast primary CTA button (`Book a Demo`) paired with an inline link (`See How It Flows`), a 5-pillar micro-trust tag strip (`FINANCE · OPERATIONS · COMPLIANCE · CASH · AI`), and an enterprise subtitle footnote.
2. **Right Column (`HeroFlow` / `.hero-pipeline-console`):** An interactive dual-flank live operating telemetry console that visually represents 6 core enterprise business fragments (Sales & CRM, Warehouse & Stock, Finance & Ledger, GST Compliance, Banking & Cash, AI Intelligence) converging through dual-directional SVG conduit pipelines into the central flowOne Core Engine hub (`TXN-10482`, `₹5,90,000`, `IN SYNC`), complete with synchronized pulsing state machine cycles, animated SVG energy flows, and bottom pipeline latency/audit indicators.

### Component Files and Exact Line Ranges

| File Path | Exact Line Range | Role in Hero Section |
| :--- | :--- | :--- |
| `src/Homepage.tsx` | Line 560 | Accessible skip-to-content anchor (`.fo-skip-link`) pointing to `#home-hero` |
| `src/Homepage.tsx` | Lines 562–591 | `<section id="home-hero" className="home-hero">` container & `.hero-copy` markup |
| `src/Homepage.tsx` | Lines 1370–1380 | Static data schemas (`heroLeftFragments`, `heroRightFragments`) |
| `src/Homepage.tsx` | Lines 1382–1553 | `HeroFlow` component implementation (telemetry console, SVG conduits, hub) |
| `src/Homepage.tsx` | Line 440 | `openDemo` handler callback (`setDemoOpen(true)`) invoked by primary CTA |
| `src/homepage.css` | Lines 6–60 | Eyebrow capsule (`.home-eyebrow`) & `@keyframes beacon-pulse` |
| `src/homepage.css` | Lines 64–182 | Hero section shell, grid, typography, CTAs, trust strip, and `@keyframes home-enter` |
| `src/homepage.css` | Lines 183–607 | Telemetry console, conduits, flank cards, central engine hub, and animations |
| `src/homepage.css` | Lines 4388–4392 | Tablet media query (`@media (max-width: 64rem)`) |
| `src/homepage.css` | Lines 4467–4480 | Mobile media query (`@media (max-width: 48rem)`) |
| `src/homepage.css` | Line 4623 | Narrow mobile media query (`@media (max-width: 36rem)`) |
| `src/homepage.css` | Lines 4628–4633 | Accessibility reduced motion rules (`@media (prefers-reduced-motion: reduce)`) |
| `src/components/flowone.tsx` | Lines 6–17 | `Icon` primitive SVG component |
| `src/components/flowone.tsx` | Lines 43–51 | `Button` primitive component |
| `src/components/flowone.css` | Lines 36–82, 96 | Button sizes, primary gradient styling, icon transitions, and `:focus-visible` |
| `src/index.css` | Lines 11–221 | Design tokens, color palette, gradients, radii, shadows, and root typography |

---

## 2. CODE

### 2.1 Verbatim JSX / TSX Markup

#### Skip Link & Section Shell (`src/Homepage.tsx`, Lines 560–591)
```tsx
    <a className="fo-skip-link" href="#home-hero">Skip to main content</a>
    <WebsiteHeader onDemo={openDemo} />
    <section id="home-hero" className="home-hero">
      <div className="home-container hero-grid">
        <div className="hero-copy">
          <span className="home-eyebrow">CONNECTED BUSINESS PLATFORM</span>
          <h1>Your business moves as one.<br/><em>Your software should too.</em></h1>
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
          <div className="hero-actions"><Button size="large" onClick={openDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse"/>}>Book a Demo</Button><a className="home-secondary-cta" href="#living-transaction">See How It Flows <Icon name="arrow" size={16} tone="action"/></a></div>
          <div className="hero-trust" aria-label="flowOne connects five areas of business"><span>FINANCE</span><i/><span>OPERATIONS</span><i/><span>COMPLIANCE</span><i/><span>CASH</span><i/><span>AI</span></div>
          <small>One connected platform for the work that moves your business.</small>
        </div>
        <HeroFlow />
      </div>
    </section>
```

#### Datasets & HeroFlow Component (`src/Homepage.tsx`, Lines 1370–1553)
```tsx
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
```

#### Primitive Components (`src/components/flowone.tsx`)
```tsx
export function Icon({ name = "arrow", size = 20, tone = "default" }: { name?: "arrow" | "spark" | "check" | "alert" | "search" | "close" | "chevron"; size?: 14 | 16 | 20 | 24 | 32; tone?: "default" | "muted" | "inverse" | "action" | "danger" | "success" | "warning" }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    spark: <path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Zm6 12 .7 1.8L20.5 18l-1.8.8L18 21l-.8-2.2-1.7-.8 1.7-1.2L18 15Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    alert: <><path d="M12 8v5" /><path d="M12 17h.01" /><path d="M10.2 4.5 3.5 18h17L13.8 4.5a2 2 0 0 0-3.6 0Z" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m8 10 4 4 4-4" />,
  };
  return <svg className={`fo-icon fo-icon-${size} fo-icon-${tone}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>;
}

export function Button({ variant = "primary", size = "medium", state = "default", iconBefore, iconAfter, children, ariaLabel, onClick }: { variant?: "primary" | "secondary" | "tertiary" | "destructive" | "icon"; size?: Size; state?: InteractionState; iconBefore?: ReactNode; iconAfter?: ReactNode; children?: ReactNode; ariaLabel?: string; onClick?: () => void }) {
  const disabled = state === "disabled" || state === "loading";
  return (
    <button className={`fo-button fo-button-${variant} fo-button-${size} is-${state}`} disabled={disabled} aria-label={ariaLabel} aria-busy={state === "loading"} onClick={onClick}>
      {state === "loading" ? <span className="fo-spinner" aria-hidden="true" /> : iconBefore}
      {children && <span>{children}</span>}
      {state !== "loading" && iconAfter}
    </button>
  );
}
```

---

### 2.2 Verbatim CSS

```css
/* ==========================================================================
   1. ACCESSIBLE SKIP LINK (src/index.css)
   ========================================================================== */
.fo-skip-link {
  position: fixed;
  top: var(--spacing-2);
  left: var(--spacing-2);
  padding: .75rem var(--spacing-2);
  color: var(--color-white);
  background: var(--color-brand-ink);
  border-radius: var(--radius-md);
  transform: translateY(-200%);
  z-index: calc(var(--z-toast) + 1);
}
.fo-skip-link:focus { transform: none; }

/* ==========================================================================
   2. EYEBROW CAPSULE & BEACON (src/homepage.css)
   ========================================================================== */
.home-eyebrow,
.home-index {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.32rem 0.85rem;
  border-radius: var(--radius-full);
  background: rgba(5, 40, 242, 0.05);
  border: 1px solid rgba(5, 40, 242, 0.12);
  color: var(--flow-primary);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(5, 40, 242, 0.04);
  transition: all var(--motion-productive) var(--ease-standard);
  cursor: default;
  user-select: none;
}

.home-eyebrow::before,
.home-index::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--flow-cyan-bright);
  box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  flex-shrink: 0;
  animation: beacon-pulse 2.4s ease-in-out infinite;
}

.home-eyebrow:hover,
.home-index:hover {
  background: rgba(5, 40, 242, 0.08);
  border-color: rgba(5, 40, 242, 0.22);
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.08);
}

@keyframes beacon-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  }
  50% {
    opacity: 0.45;
    transform: scale(0.8);
    box-shadow: 0 0 3px rgba(5, 199, 242, 0.3);
  }
}

/* ==========================================================================
   3. HERO SHELL, GRID & COPY (src/homepage.css)
   ========================================================================== */
.home-hero {
  position: relative;
  min-height: calc(100dvh - 4.75rem);
  padding-block: clamp(1rem, 2vh, 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: var(--color-white);
  background-image:
    radial-gradient(circle, rgba(0, 34, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to right, rgba(17, 24, 39, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 24, 39, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.home-container.hero-grid {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(1.5rem, 3.2vw, 3rem);
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-copy .home-eyebrow {
  display: inline-block;
  margin-bottom: clamp(0.75rem, 1.4vh, 1.1rem);
}

.hero-copy h1 {
  max-width: 44rem;
  margin: 0;
  font-size: clamp(2.35rem, 3.6vw, 3.45rem);
  line-height: 1.06;
  letter-spacing: -.05em;
  font-weight: 650;
  animation: home-enter var(--motion-expressive) var(--ease-power3-out) both;
}

.hero-copy h1 em { color: var(--color-brand-blue); font-style: normal; }

.hero-copy > p {
  max-width: 39rem;
  margin-top: clamp(1rem, 1.8vh, 1.4rem);
  color: var(--color-text-secondary);
  font-size: clamp(0.975rem, 1.15vw, 1.08rem);
  line-height: 1.58;
  animation: home-enter var(--motion-expressive) .1s both;
}

.hero-gradient-text {
  background: var(--gradient-flow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  display: inline;
}

.hero-progression {
  margin-top: clamp(0.75rem, 1.4vh, 1rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  font-size: clamp(0.92rem, 1.05vw, 1.02rem);
  font-weight: 650;
  letter-spacing: -0.015em;
  color: var(--flow-ink, #0d0d0d);
  line-height: 1.45;
  animation: home-enter var(--motion-expressive) 0.15s both;
}

.hero-progression-phase {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.hero-progression-arrow {
  display: inline-block;
  margin-left: 0.45rem;
  margin-right: 0.15rem;
  color: var(--color-brand-blue);
  font-weight: 700;
  opacity: 0.85;
  user-select: none;
}

.hero-actions {
  margin-top: clamp(1.1rem, 2vh, 1.5rem);
  display: flex;
  align-items: center;
  gap: clamp(0.85rem, 1.5vw, 1.25rem);
  animation: home-enter var(--motion-expressive) .2s both;
}

.hero-trust {
  margin-top: clamp(1.25rem, 2.2vh, 1.65rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5rem;
  color: var(--color-text-tertiary);
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .08em;
}

.hero-trust i { width: .2rem; height: .2rem; background: var(--color-border-strong); border-radius: var(--radius-full); }

.home-secondary-cta { min-height: var(--control-lg); display: inline-flex; align-items: center; gap: .5rem; color: var(--flow-primary); text-decoration: none; font-size: var(--font-small); font-weight: 700; transition: color 180ms ease; }
.home-secondary-cta:hover { color: var(--flow-primary-deep); }
.home-secondary-cta .fo-icon { transition: transform var(--motion-fast); }
.home-secondary-cta:hover .fo-icon { transform: translateX(.2rem); }

.hero-copy > small {
  display: block;
  margin-top: clamp(0.35rem, 0.7vh, 0.55rem);
  color: var(--color-text-tertiary);
  font-size: 0.72rem;
  line-height: 1.4;
}

@keyframes home-enter { from { opacity: 0; transform: translateY(.75rem); } to { opacity: 1; transform: none; } }

/* ==========================================================================
   4. BUTTON & ICON COMPONENT CSS (src/components/flowone.css)
   ========================================================================== */
.fo-icon { flex: 0 0 auto; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.fo-icon-14 { width: .875rem; height: .875rem; } .fo-icon-16 { width: 1rem; height: 1rem; }
.fo-icon-20 { width: 1.25rem; height: 1.25rem; } .fo-icon-24 { width: 1.5rem; height: 1.5rem; } .fo-icon-32 { width: 2rem; height: 2rem; }
.fo-icon-default { color: var(--color-text-primary); } .fo-icon-muted { color: var(--color-text-tertiary); }
.fo-icon-inverse { color: var(--color-white); } .fo-icon-action { color: var(--color-brand-blue); }
.fo-icon-danger { color: var(--color-status-danger); } .fo-icon-success { color: var(--color-status-success); }
.fo-icon-warning { color: var(--color-status-warning); }

.fo-button {
  min-width: max-content; display: inline-flex; align-items: center; justify-content: center; gap: var(--spacing-1);
  padding-inline: var(--spacing-3); border: 1px solid transparent; border-radius: var(--radius-md);
  font: 600 var(--font-button)/1 var(--font-family-primary); cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}
.fo-button .fo-icon {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.fo-button-small { height: var(--control-sm); padding-inline: var(--spacing-2); font-size: .875rem; }
.fo-button-medium { height: var(--control-md); padding-inline: 1.25rem; }
.fo-button-large { height: var(--control-lg); }

.fo-button-primary {
  position: relative;
  color: #FFFFFF;
  background-color: var(--flow-primary);
  background-image: linear-gradient(135deg, #0528F2 0%, #049DD9 50%, #05C7F2 100%);
  background-size: 200% 100%;
  background-position: 0% 0%;
  box-shadow: 0 2px 8px rgba(5, 40, 242, 0.22);
  transition: background-position 350ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 250ms ease,
              transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              color 180ms ease;
}
.fo-button-primary:hover, .fo-button-primary.is-hover {
  background-position: 100% 0%;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35);
}
.fo-button-primary:hover .fo-icon, .fo-button-primary.is-hover .fo-icon {
  transform: translateX(3px);
}
.fo-button-primary:active, .fo-button-primary.is-pressed {
  background-position: 50% 0%;
  color: #FFFFFF;
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35);
}

:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 3px;
}

/* ==========================================================================
   5. HERO PIPELINE CONSOLE (src/homepage.css)
   ========================================================================== */
.hero-pipeline-console {
  position: relative;
  min-height: auto;
  padding: 0.95rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: var(--color-brand-ink);
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 20px 48px -12px rgba(11, 16, 32, 0.35);
  animation: home-enter var(--motion-expressive) .35s both;
  overflow: hidden;
}

.hero-pipeline-beam {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-flow);
}

.hero-pipeline-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-topbar-sync {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.hero-sync-pulse-badge {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--flow-cyan-bright);
  background: rgba(5, 199, 242, 0.1);
  border: 1px solid rgba(5, 199, 242, 0.28);
  border-radius: 4px;
  padding: 0.12rem 0.45rem;
}

/* Pipeline Stage: 5-column bilateral layout */
.hero-pipeline-stage {
  position: relative;
  display: grid;
  grid-template-columns: 1.08fr 50px 1.25fr 50px 1.08fr;
  align-items: center;
  gap: 0;
  width: 100%;
}

.hero-flank {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  z-index: 2;
}

.hero-frag-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.45rem 0.65rem;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-frag-card:hover,
.hero-frag-card.is-pulsing {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(5, 199, 242, 0.4);
  box-shadow: 0 4px 14px rgba(5, 40, 242, 0.25);
  transform: translateY(-1px);
}

.hero-frag-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
}

.hero-frag-tag {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  color: var(--color-neutral-400);
}

.hero-frag-status {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border-radius: 3px;
  padding: 0.05rem 0.25rem;
}

.hero-frag-body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem;
}

.hero-frag-body strong {
  font-size: 0.74rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.hero-frag-body small {
  font-size: 0.56rem;
  color: #94a3b8;
}

/* Flank Port Connector Nodes */
.hero-frag-port {
  position: absolute;
  top: 50%;
  width: 7px;
  height: 7px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: var(--dark-900);
  border: 1.5px solid var(--flow-cyan);
  display: grid;
  place-items: center;
  z-index: 3;
}

.hero-port-right {
  right: -4px;
}

.hero-port-left {
  left: -4px;
}

.hero-frag-port i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--flow-cyan-bright);
  box-shadow: 0 0 4px var(--flow-cyan-bright);
}

/* Conduits Column */
.hero-conduits-col {
  position: relative;
  height: 100%;
  min-height: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.hero-conduit-svg {
  width: 100%;
  height: 175px;
  overflow: visible;
}

.conduit-rail-path {
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 2px;
  stroke-linecap: round;
}

.conduit-rail-glow {
  stroke: var(--flow-cyan-bright);
  stroke-width: 1.5px;
  stroke-dasharray: 6 12;
  opacity: 0.75;
  animation: conduitFlowInward 1.8s linear infinite;
}

@keyframes conduitFlowInward {
  from {
    stroke-dashoffset: 36;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.conduit-pulse-bead {
  fill: #ffffff;
  filter: drop-shadow(0 0 5px rgba(5, 199, 242, 0.9));
}

/* Center Engine Hub */
.hero-hub-center {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  padding: 0 0.2rem;
}

.hero-hub-beacon-rings {
  position: absolute;
  inset: -8px;
  pointer-events: none;
}

.hub-ring {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  border: 1px solid rgba(5, 199, 242, 0.25);
  animation: hubRingPulse 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.hub-ring-2 {
  animation-delay: 1.6s;
}

@keyframes hubRingPulse {
  0% { transform: scale(0.96); opacity: 0.6; }
  50% { transform: scale(1.04); opacity: 0.2; }
  100% { transform: scale(1.1); opacity: 0; }
}

.hero-hub-card {
  position: relative;
  width: 100%;
  padding: 0.75rem 0.85rem;
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 26, 0.98) 100%);
  border: 1.5px solid rgba(5, 199, 242, 0.35);
  border-radius: 12px;
  box-shadow: 0 0 24px -4px rgba(5, 40, 242, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: center;
}

.hero-hub-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-hub-emblem {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-hub-logo-img {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 0 6px rgba(5, 199, 242, 0.75));
}

.hero-hub-beacon-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

.hero-hub-branding {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.hero-hub-brand-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.hero-hub-brand-sub {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.48rem;
  font-weight: 700;
  color: var(--flow-cyan-bright);
  letter-spacing: 0.08em;
}

.hero-hub-payload {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.2rem 0;
}

.hero-hub-kicker {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5rem;
  font-weight: 750;
  color: var(--color-brand-cyan);
  letter-spacing: 0.06em;
}

.hero-hub-txn {
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.hero-hub-val-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 0.1rem;
}

.hero-hub-amount {
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.hero-hub-state-pill {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5rem;
  font-weight: 700;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 4px;
  padding: 0.08rem 0.35rem;
}

.hero-hub-sync-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.52rem;
  color: #94a3b8;
  padding-top: 0.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.hero-hub-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 5px #10b981;
}

/* Footer Telemetry Bar */
.hero-pipeline-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 0.45rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-footer-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.08rem;
}

.hero-footer-stat span {
  font-family: var(--font-family-mono, monospace);
  font-size: 0.5rem;
  font-weight: 700;
  color: var(--color-neutral-400);
  letter-spacing: 0.05em;
}

.hero-footer-stat strong {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.01em;
}

.hero-footer-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.1);
}

/* ==========================================================================
   6. RESPONSIVE MEDIA QUERIES (src/homepage.css)
   ========================================================================== */
@media (max-width: 64rem) {
  .home-hero { min-height: auto; padding-block: clamp(2rem, 4vh, 3.5rem); }
  .hero-grid { grid-template-columns: 1fr; }
  .hero-copy { max-width: 52rem; }
  .hero-pipeline-console { width: 100%; max-width: 44rem; }
}

@media (max-width: 48rem) {
  .home-hero { min-height: auto; padding-block: var(--section-medium); }
  .hero-grid { gap: var(--spacing-8); }
  .hero-copy h1 { font-size: clamp(2.5rem, 12vw, 3.25rem); }
  .hero-copy > p { font-size: 1.08rem; }
  .hero-actions { align-items: stretch; flex-direction: column; }
  .hero-actions .fo-button, .home-secondary-cta { width: 100%; justify-content: center; }

  .hero-pipeline-console { min-height: auto; padding: 0.85rem; }
  .hero-pipeline-stage { display: flex; flex-direction: column; gap: 0.65rem; }
  .hero-conduits-col { display: none; }
  .hero-hub-center { width: 100%; order: 1; padding: 0; }
  .hero-flank-left { order: 2; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }
  .hero-flank-right { order: 3; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }
  .hero-port-right, .hero-port-left { display: none; }
}

@media (max-width: 36rem) {
  .hero-flank-left, .hero-flank-right { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy h1, .hero-copy > p, .hero-progression, .hero-actions, .hero-operating-surface { animation: none; }
  .hero-minimal-pulse, .hero-live-beacon i { animation: none; }
}
```

---

### 2.3 Shared Tokens and Resolved Values

When variables exist across multiple files, **`src/index.css`** acts as the canonical `:root` definition source, while **`src/homepage.css`** and **`src/components/flowone.css`** apply component-level overrides. Below are the resolved values for every variable used by the Hero section:

| Variable Name | Canonical Alias | Resolved Literal Value | Usage in Hero Section | Precedence / Winning File |
| :--- | :--- | :--- | :--- | :--- |
| `--flow-primary` | `--color-brand-blue` | `#0528F2` | Eyebrow text, secondary CTA color, H1 `<em>` color, progression arrow color, button base | `src/index.css` (:root) |
| `--flow-primary-deep` | `--color-action-primary-hover` | `#0540F2` | Secondary CTA hover text | `src/index.css` (:root) |
| `--flow-primary-pressed` | `--color-action-primary-pressed` | `#0A2BC7` | Primary button pressed/active background | `src/index.css` (:root) |
| `--flow-cyan` | `--color-brand-cyan` | `#049DD9` | Hub kicker text, flank port border | `src/index.css` (:root) |
| `--flow-cyan-bright` | — | `#05C7F2` | Eyebrow beacon dot, sync badge text, conduit SVG glow, flank port core dot, hub sub-brand | `src/index.css` (:root) |
| `--flow-ink` | `--color-brand-ink` | `#0D0D0D` | Progression text color, pipeline console background, skip link background | `src/index.css` (:root) |
| `--color-white` | `--neutral-0` | `#FFFFFF` | Hero background canvas, primary button text, hub card metrics, stat values | `src/index.css` (:root) |
| `--color-text-secondary`| `--neutral-700` | `#374151` | Hero body paragraph (`.hero-copy > p`) | `src/index.css` (:root) |
| `--color-text-tertiary` | `--neutral-500` | `#6B7280` | Trust strip text, footnote text (`.hero-copy > small`) | `src/index.css` (:root) |
| `--color-neutral-400` | — | `#9CA3AF` | Fragment card tag (`.hero-frag-tag`), footer stat label (`.hero-footer-stat span`) | `src/index.css` (:root) |
| `--color-border-strong` | `--neutral-300` | `#DDE3EA` | Trust strip dot dividers (`.hero-trust i`) | `src/index.css` (:root) |
| `--dark-900` | — | `#0D0D0D` | Flank connector node background | `src/index.css` (:root) |
| `--gradient-flow` | — | `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)` | `.hero-gradient-text`, `.hero-pipeline-beam` top hairline | `src/index.css` (:root) |
| `--state-focus` | — | `#0528F2` | Focus-visible outline ring | `src/index.css` (:root) |
| `--font-family-primary` | — | `"Manrope", sans-serif` | Global font for headings, body copy, and buttons | `src/index.css` (:root) |
| `--font-family-mono` | — | `monospace` | Telemetry tags, metrics, badges, and statuses | `src/homepage.css` (fallback) |
| `--font-h1` | — | `clamp(2.5rem, 3.9vw, 3.5rem)` | Heading 1 token in index.css (Note: `.hero-copy h1` uses its own explicit clamp; see Typography section) | `src/homepage.css` wins for `.hero-copy h1` |
| `--font-button` | — | `0.9375rem` (15px) | Primary button font size | `src/index.css` (:root) |
| `--font-small` | — | `0.9375rem` (15px) | Secondary CTA link font size | `src/index.css` (:root) |
| `--control-lg` | — | `3.25rem` (52px) | Height of Book a Demo button & min-height of Secondary CTA | `src/index.css` (:root) |
| `--spacing-1` | — | `0.5rem` (8px) | Button flex child gap | `src/index.css` (:root) |
| `--spacing-2` | — | `1rem` (16px) | Skip link padding / offsets | `src/index.css` (:root) |
| `--spacing-3` | — | `1.5rem` (24px) | Button horizontal inline padding | `src/index.css` (:root) |
| `--spacing-8` | — | `4rem` (64px) | Mobile grid gap (`.hero-grid` gap at ≤48rem) | `src/homepage.css` (≤48rem) |
| `--section-medium` | — | `5rem` (80px) | Mobile vertical section padding (`.home-hero` padding-block at ≤48rem) | `src/homepage.css` (≤48rem) |
| `--container-wide` | — | `80rem` (1280px) | Max content width of `.home-container.hero-grid` | `src/index.css` (:root) |
| `--page-padding` | — | `clamp(1.25rem, 3.34vw, 3rem)` | Dynamic horizontal page gutter (20px to 48px) | `src/index.css` (:root) |
| `--radius-md` | — | `0.5rem` (8px) | Button border radius, skip link radius | `src/index.css` (:root) |
| `--radius-xl` | — | `1rem` (16px) | Pipeline console outer border radius | `src/index.css` (:root) |
| `--radius-full` | — | `9999px` | Eyebrow pill radius, trust divider dot radius | `src/index.css` (:root) |
| `--motion-fast` | — | `180ms` | Secondary CTA icon hover transition | `src/index.css` (:root) |
| `--motion-expressive` | — | `700ms` | Entrance animation duration (`home-enter`) | `src/index.css` (:root) |
| `--ease-power3-out` | — | `cubic-bezier(0.22, 1, 0.36, 1)` | Heading entrance animation timing | `src/index.css` (:root) |
| `--z-toast` | — | `1100` | Skip link stacking index (`1101`) | `src/index.css` (:root) |

---

### 2.4 JavaScript & Behaviour Hooks

#### 1. Verbatim Fragment Pulse Timer Hook (`src/Homepage.tsx`, Lines 1383–1391)
```tsx
const [pulseIndex, setPulseIndex] = useState(0);

useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const interval = window.setInterval(() => {
    setPulseIndex(i => (i + 1) % 3);
  }, 2400);
  return () => window.clearInterval(interval);
}, []);
```

#### 2. Verbatim Demo Modal Trigger (`src/Homepage.tsx`, Lines 399, 440)
```tsx
const [demoOpen, setDemoOpen] = useState(false);
const openDemo = useCallback(() => setDemoOpen(true), []);
```

#### 3. Plain JavaScript Rebuild Snippet for Elementor Pro
For an Elementor Pro rebuild using an HTML widget or child theme script:
```javascript
document.addEventListener('DOMContentLoaded', function () {
  // Respect reduced-motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const leftCards = document.querySelectorAll('.hero-flank-left .hero-frag-card');
  const rightCards = document.querySelectorAll('.hero-flank-right .hero-frag-card');
  if (!leftCards.length || !rightCards.length) return;

  let activeIndex = 0;
  setInterval(function () {
    // Remove previous pulse
    leftCards.forEach(card => card.classList.remove('is-pulsing'));
    rightCards.forEach(card => card.classList.remove('is-pulsing'));

    // Apply next pulse
    activeIndex = (activeIndex + 1) % leftCards.length;
    if (leftCards[activeIndex]) leftCards[activeIndex].classList.add('is-pulsing');
    if (rightCards[activeIndex]) rightCards[activeIndex].classList.add('is-pulsing');
  }, 2400);
});
```

---

## 3. CONTENT

### Display Order Inventory

| Item # | Semantic Tag | CSS Class / Component | Verbatim Text Content | URL / Anchor Destination | Status / Type |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | `<a>` | `.fo-skip-link` | `"Skip to main content"` | `#home-hero` | Accessible skip link |
| **02** | `<span>` | `.home-eyebrow` | `"CONNECTED BUSINESS PLATFORM"` | None | Eyebrow badge with beacon dot |
| **03** | `<h1>` | `.hero-copy h1` | `"Your business moves as one."`<br/>`<em>Your software should too.</em>` | None | Primary display heading |
| **04** | `<p>` | `.hero-copy > p` | `"flowOne is a composable business platform that connects finance, operations, compliance and "` | None | Lead paragraph (Part 1) |
| **05** | `<span>` | `.hero-gradient-text` | `"AI into one continuous flow"` | None | Lead paragraph gradient highlight |
| **06** | Text node | `.hero-copy > p` | `"—uniting the workflows, systems and intelligence that move your business forward."` | None | Lead paragraph (Part 2) |
| **07** | `<div>` | `.hero-progression` | — | None | Container `aria-label`: `"Start where it matters. Connect the flow. Scale across the business."` |
| **08** | `<span>` | `.hero-progression-phase` | `"Start where it matters."` + `"→"` | None | Phase 1 milestone |
| **09** | `<span>` | `.hero-progression-phase` | `"Connect the flow."` + `"→"` | None | Phase 2 milestone |
| **10** | `<span>` | `.hero-progression-phase.is-final` | `"Scale across the business."` | None | Phase 3 milestone |
| **11** | `<button>` | `.fo-button-primary` | `"Book a Demo"` + Arrow icon | `PLACEHOLDER` (Triggers demo dialog) | Primary conversion CTA |
| **12** | `<a>` | `.home-secondary-cta` | `"See How It Flows "` + Arrow icon | `#living-transaction` | Secondary in-page link |
| **13** | `<div>` | `.hero-trust` | — | None | Container `aria-label`: `"flowOne connects five areas of business"` |
| **14** | `<span>` | `.hero-trust span` | `"FINANCE"` | None | Trust token 1 |
| **15** | `<span>` | `.hero-trust span` | `"OPERATIONS"` | None | Trust token 2 |
| **16** | `<span>` | `.hero-trust span` | `"COMPLIANCE"` | None | Trust token 3 |
| **17** | `<span>` | `.hero-trust span` | `"CASH"` | None | Trust token 4 |
| **18** | `<span>` | `.hero-trust span` | `"AI"` | None | Trust token 5 |
| **19** | `<small>` | `.hero-copy > small` | `"One connected platform for the work that moves your business."` | None | Enterprise subtitle footnote |
| **20** | `<div>` | `.hero-pipeline-console` | — | None | Console `aria-label`: `"flowOne Central Architecture: 6 business fragments connected to the central flowOne engine via live pipelines."` |
| **21** | `<div>` | `.hero-live-beacon` | `"LIVE OPERATIONAL CONDUIT"` | None | Status `aria-label`: `"System status: Live operating telemetry"` |
| **22** | `<span>` | `.hero-sync-pulse-badge` | `"6 OF 6 FRAGMENTS IN SYNC"` | None | System status badge |
| **23** | `<span>` | `.hero-latency-tag` | `"TXN-10482 · 14ms"` | None | Latency telemetry tag |
| **24** | Card 1 | `.hero-frag-card.is-sales` | Tag: `"SALES & CRM"` \| Status: `"CONNECTED"`<br/>Metric: `"SO-10482"` \| Detail: `"Order Confirmed"` | None | Left flank fragment |
| **25** | Card 2 | `.hero-frag-card.is-stock` | Tag: `"WAREHOUSE & STOCK"` \| Status: `"IN SYNC"`<br/>Metric: `"125 Units"` \| Detail: `"Allocated DC-02"` | None | Left flank fragment |
| **26** | Card 3 | `.hero-frag-card.is-finance` | Tag: `"FINANCE & LEDGER"` \| Status: `"REAL-TIME"`<br/>Metric: `"INV-10482"` \| Detail: `"₹5,90,000 Open"` | None | Left flank fragment |
| **27** | Hub Brand | `.hero-hub-header` | `"flowOne"` \| Sub: `"CORE ENGINE"` | None | Center hub title |
| **28** | Hub Payload | `.hero-hub-payload` | Kicker: `"UNIFIED TRANSACTION FABRIC"`<br/>Txn: `"TXN-10482"`<br/>Amount: `"₹5,90,000"` \| Pill: `"IN SYNC"` | None | Center transaction display |
| **29** | Hub Sync | `.hero-hub-sync-status` | `"Zero Silo Drift · Single Source of Truth"` | None | Center hub footnote |
| **30** | Card 4 | `.hero-frag-card.is-gst` | Tag: `"GST COMPLIANCE"` \| Status: `"VALIDATED"`<br/>Metric: `"IRN Cleared"` \| Detail: `"Instant E-Invoice"` | None | Right flank fragment |
| **31** | Card 5 | `.hero-frag-card.is-bank` | Tag: `"BANKING & CASH"` \| Status: `"RECEIVED"`<br/>Metric: `"Auto-Recon"` \| Detail: `"HDFC Matched"` | None | Right flank fragment |
| **32** | Card 6 | `.hero-frag-card.is-ai` | Tag: `"AI INTELLIGENCE"` \| Status: `"ACTIVE"`<br/>Metric: `"92% Accuracy"` \| Detail: `"Cash Probability"` | None | Right flank fragment |
| **33** | Stat 1 | `.hero-footer-stat` | Label: `"PIPELINE LATENCY"` \| Value: `"< 14ms"` | None | Telemetry footer stat |
| **34** | Stat 2 | `.hero-footer-stat` | Label: `"CONTEXT INTEGRITY"` \| Value: `"100%"` | None | Telemetry footer stat |
| **35** | Stat 3 | `.hero-footer-stat` | Label: `"STATUTORY AUDIT"` \| Value: `"IMMUTABLE"` | None | Telemetry footer stat |

---

## 4. LAYOUT SPEC

### 4.1 Container & Spatial Boundaries
- **Outer Section (`.home-hero`):**
  - Width: `100%`
  - Min-Height: Desktop: `calc(100dvh - 4.75rem)` (Viewport height minus 76px desktop header). Tablet & Mobile: `auto`.
  - Box-Sizing: `border-box`.
  - Positioning: `position: relative`.
- **Inner Content Container (`.home-container.hero-grid`):**
  - Max Width: `var(--container-wide)` = `80rem` (1280px).
  - Calculated Width Formula: `width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));`
  - Horizontal Page Padding (`--page-padding`): `clamp(1.25rem, 3.34vw, 3rem)` (20px at small screens to 48px at large screens).
  - Margin: `margin-inline: auto;` (Centers content horizontally).

### 4.2 Grid Structure & Alignment
- **Desktop (≥1025px):**
  - Display: `grid`
  - Columns: `1.08fr 0.92fr` (Left copy column is ~54% of width; right console is ~46%).
  - Column Gap: `clamp(1.5rem, 3.2vw, 3rem)` (24px to 48px).
  - Vertical Alignment: `align-items: center`.
- **Tablet (768px–1024px / in code `max-width: 64rem`):**
  - Columns: `1fr` (Single column stacked).
  - Copy Max Width: `max-width: 52rem`.
  - Pipeline Console Max Width: `width: 100%; max-width: 44rem; margin-inline: auto;`.
- **Mobile (≤767px / in code `max-width: 48rem`):**
  - Columns: `1fr`.
  - Grid Gap: `var(--spacing-8)` = `4rem` (64px).

### 4.3 Vertical Spacing Rhythm
- **Section Padding-Block:**
  - Desktop: `padding-block: clamp(1rem, 2vh, 2rem);` (16px to 32px).
  - Tablet (≤64rem): `padding-block: clamp(2rem, 4vh, 3.5rem);` (32px to 56px).
  - Mobile (≤48rem): `padding-block: var(--section-medium);` = `5rem` (80px).
- **Left Column Vertical Gaps:**
  - Eyebrow bottom margin: `clamp(0.75rem, 1.4vh, 1.1rem);`
  - H1 margin: `0;`
  - Paragraph top margin: `clamp(1rem, 1.8vh, 1.4rem);`
  - Progression strip top margin: `clamp(0.75rem, 1.4vh, 1rem);`
  - Actions cluster top margin: `clamp(1.1rem, 2vh, 1.5rem);`
  - Trust strip top margin: `clamp(1.25rem, 2.2vh, 1.65rem);`
  - Footnote top margin: `clamp(0.35rem, 0.7vh, 0.55rem);`

### 4.4 Fixed Dimensions & Sizing
- **Heading 1 Max Width:** `max-width: 44rem` (704px).
- **Body Copy Max Width:** `max-width: 39rem` (624px).
- **Primary CTA Button:** Height: `3.25rem` (52px), Padding: `0 1.5rem` (`0 24px`), Min-width: `max-content`.
- **Secondary CTA Link:** Min-height: `3.25rem` (52px).
- **Console SVG Conduit Columns:** Width: `50px`, Height: `175px`, SVG viewBox: `0 0 70 210`.
- **Hub Card Logo Image:** `width: 22px; height: 22px;` inside a `24px x 24px` emblem shell.
- **Flank Port Nodes:** Outer shell: `7px x 7px` circle; Inner dot: `3px x 3px` circle.
- **Eyebrow Beacon Dot:** `6px x 6px` circle.
- **Trust Strip Dots:** `0.2rem x 0.2rem` (3.2px x 3.2px) circles.
- **Footer Divider Line:** Width: `1px`, Height: `16px`.

### 4.5 Background Construction
- **Canvas Background:** Pure CSS multi-layered background (no external raster image):
  ```css
  background: var(--color-white); /* #FFFFFF */
  background-image:
    radial-gradient(circle, rgba(0, 34, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to right, rgba(17, 24, 39, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 24, 39, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  ```
  - **Layer 1:** 40px grid of subtle `#0022FF` dots at 5% opacity (`rgba(0, 34, 255, 0.05)`).
  - **Layer 2 & 3:** 40px grid lines in dark neutral at 2% opacity (`rgba(17, 24, 39, 0.02)`).
- **Pipeline Console Background:**
  - Background: `var(--color-brand-ink)` = `#0D0D0D`.
  - Border: `1px solid rgba(255, 255, 255, 0.12)`.
  - Border-Radius: `var(--radius-xl)` = `1rem` (16px).
  - Box-Shadow: `inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 20px 48px -12px rgba(11, 16, 32, 0.35);`.
  - Top Beam: `height: 2px; background: linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%);`.
- **Hub Card Background:**
  - Background: `linear-gradient(160deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 26, 0.98) 100%)`.
  - Border: `1.5px solid rgba(5, 199, 242, 0.35)`.
  - Border-Radius: `12px`.
  - Box-Shadow: `0 0 24px -4px rgba(5, 40, 242, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)`.

---

## 5. RESPONSIVE SPEC

### Breakpoint Table

| Breakpoint Name | Media Query in Code | Pixel Equivalent | Purpose in Code |
| :--- | :--- | :--- | :--- |
| **Desktop Wide** | Base default (no query) | `> 1024px` | 2-column hero grid (1.08fr : 0.92fr); bilateral 5-column stage in pipeline console. |
| **Tablet Threshold** | `@media (max-width: 64rem)` | `≤ 1024px` | Hero grid collapses to 1-column; copy max-width 52rem; console max-width 44rem. |
| **Mobile Threshold** | `@media (max-width: 48rem)` | `≤ 768px` | Section padding increases to 5rem; actions stack vertically; console stage reorders to column. |
| **Narrow Mobile** | `@media (max-width: 36rem)` | `≤ 576px` | Left & right flank fragment cards collapse from 3-column grid to 1-column stack. |
| **Accessibility** | `@media (prefers-reduced-motion: reduce)` | System flag | Disables entrance animations, beacon pulses, and JS interval pulse cycling. |

### Component Responsive Transformations

#### Tablet (768px–1024px)
- **Container Layout:** `.hero-grid` switches from `grid-template-columns: 1.08fr 0.92fr` to `grid-template-columns: 1fr`.
- **Min Height:** `.home-hero` drops from `calc(100dvh - 4.75rem)` to `min-height: auto`.
- **Padding:** `.home-hero` padding-block adjusts to `clamp(2rem, 4vh, 3.5rem)`.
- **Widths:** `.hero-copy` expands to `max-width: 52rem`. `.hero-pipeline-console` is set to `width: 100%; max-width: 44rem; margin-inline: auto;`.
- **Console Stage:** The pipeline console stage maintains its 5-column bilateral layout (`1.08fr 50px 1.25fr 50px 1.08fr`) because the viewport is sufficiently wide.

#### Mobile (≤767px / Code `≤48rem` / 768px)
- **Grid Gap:** Expands to `var(--spacing-8)` = `4rem` (64px).
- **H1 Typography:** Clamps to `font-size: clamp(2.5rem, 12vw, 3.25rem);` (dynamically larger on mobile).
- **Body Copy:** Font size sets to `1.08rem`.
- **Actions Cluster:**
  - Layout switches from horizontal row to full-width vertical stack: `align-items: stretch; flex-direction: column;`.
  - Both `.fo-button` and `.home-secondary-cta` take `width: 100%; justify-content: center;`.
- **Pipeline Console:**
  - Padding reduces to `0.85rem` (13.6px).
  - Stage layout completely reorganizes: `.hero-pipeline-stage` switches from 5-column grid to `display: flex; flex-direction: column; gap: 0.65rem;`.
  - SVG conduit columns are hidden: `.hero-conduits-col { display: none; }`.
  - Port connection nodes on cards are hidden: `.hero-port-right, .hero-port-left { display: none; }`.
  - Vertical order is rewritten via CSS flexbox:
    1. **Order 1 (Top):** Center Engine Hub (`.hero-hub-center { width: 100%; order: 1; padding: 0; }`).
    2. **Order 2 (Middle):** Left Flank Fragments (`.hero-flank-left { order: 2; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }`).
    3. **Order 3 (Bottom):** Right Flank Fragments (`.hero-flank-right { order: 3; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }`).

#### Narrow Mobile (≤576px / Code `≤36rem`)
- Left and right flank cards collapse from 3-column rows into single-column vertical stacks:
  `.hero-flank-left, .hero-flank-right { grid-template-columns: 1fr; }`

---

## 6. TYPOGRAPHY

Every typographic style used across the Hero section is documented below with exact resolved values:

| Element / Class | Font Family | Size (Fluid / Fixed) | Weight | Line Height | Letter Spacing | Resolved Color (HEX) | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** (`.home-eyebrow`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | 700 | `1` | `0.12em` | `#0528F2` | `uppercase` |
| **Heading 1** (`.hero-copy h1`) | `"Manrope", sans-serif` | Desktop: `clamp(2.35rem, 3.6vw, 3.45rem)`<br/>Mobile: `clamp(2.5rem, 12vw, 3.25rem)` | 650 | `1.06` | `-0.05em` | `#0D0D0D` | `none` |
| **H1 Emphasis** (`.hero-copy h1 em`) | `"Manrope", sans-serif` | Same as H1 | 650 | `1.06` | `-0.05em` | `#0528F2` | `none` (font-style: normal) |
| **Body Paragraph** (`.hero-copy > p`) | `"Manrope", sans-serif` | Desktop: `clamp(0.975rem, 1.15vw, 1.08rem)`<br/>Mobile: `1.08rem` | 400 | `1.58` | `normal` (0) | `#374151` | `none` |
| **Gradient Text** (`.hero-gradient-text`) | `"Manrope", sans-serif` | Same as Paragraph | 600 | `1.58` | `normal` (0) | Gradient Clip | `none` |
| **Progression Phase** (`.hero-progression-phase`) | `"Manrope", sans-serif` | `clamp(0.92rem, 1.05vw, 1.02rem)` | 650 | `1.45` | `-0.015em` | `#0D0D0D` | `none` |
| **Progression Arrow** (`.hero-progression-arrow`) | `"Manrope", sans-serif` | Inherited from Phase | 700 | Inherited | Inherited | `#0528F2` (opacity: 0.85) | `none` |
| **Primary CTA** (`.fo-button-primary`) | `"Manrope", sans-serif` | `0.9375rem` (15px) | 600 | `1` | `normal` (0) | `#FFFFFF` | `none` |
| **Secondary CTA** (`.home-secondary-cta`) | `"Manrope", sans-serif` | `0.9375rem` (15px) | 700 | `1` | `normal` (0) | `#0528F2` (hover: `#0540F2`) | `none` |
| **Trust Strip** (`.hero-trust span`) | `"Manrope", sans-serif` | `0.58rem` (9.28px) | 700 | `normal` | `0.08em` | `#6B7280` | `uppercase` |
| **Footnote** (`.hero-copy > small`) | `"Manrope", sans-serif` | `0.72rem` (11.52px) | 400 | `1.4` | `normal` (0) | `#6B7280` | `none` |
| **Sync Pulse Badge** (`.hero-sync-pulse-badge`) | `monospace` | `0.54rem` (8.64px) | 700 | `normal` | `0.05em` | `#05C7F2` | `uppercase` |
| **Fragment Tag** (`.hero-frag-tag`) | `monospace` | `0.5rem` (8px) | 750 | `normal` | `0.06em` | `#9CA3AF` | `uppercase` |
| **Fragment Status** (`.hero-frag-status`) | `monospace` | `0.48rem` (7.68px) | 700 | `normal` | `0.04em` | `#34D399` | `uppercase` |
| **Fragment Metric** (`.hero-frag-body strong`) | `"Manrope", sans-serif` | `0.74rem` (11.84px) | 700 | `normal` | `-0.01em` | `#FFFFFF` | `none` |
| **Fragment Detail** (`.hero-frag-body small`) | `"Manrope", sans-serif` | `0.56rem` (8.96px) | 400 | `normal` | `normal` (0) | `#94A3B8` | `none` |
| **Hub Brand Name** (`.hero-hub-brand-name`) | `"Manrope", sans-serif` | `0.82rem` (13.12px) | 800 | `1.1` | `-0.02em` | `#FFFFFF` | `none` |
| **Hub Subtitle** (`.hero-hub-brand-sub`) | `monospace` | `0.48rem` (7.68px) | 700 | `normal` | `0.08em` | `#05C7F2` | `uppercase` |
| **Hub Kicker** (`.hero-hub-kicker`) | `monospace` | `0.5rem` (8px) | 750 | `normal` | `0.06em` | `#049DD9` | `uppercase` |
| **Hub TXN ID** (`.hero-hub-txn`) | `"Manrope", sans-serif` | `0.95rem` (15.2px) | 800 | `normal` | `-0.01em` | `#FFFFFF` | `none` |
| **Hub Currency** (`.hero-hub-amount`) | `"Manrope", sans-serif` | `1.15rem` (18.4px) | 800 | `normal` | `-0.02em` | `#FFFFFF` (tabular-nums) | `none` |
| **Hub State Pill** (`.hero-hub-state-pill`) | `monospace` | `0.5rem` (8px) | 700 | `normal` | `normal` (0) | `#34D399` | `uppercase` |
| **Hub Sync Status** (`.hero-hub-sync-status`) | `"Manrope", sans-serif` | `0.52rem` (8.32px) | 400 | `normal` | `normal` (0) | `#94A3B8` | `none` |
| **Footer Stat Label** (`.hero-footer-stat span`) | `monospace` | `0.5rem` (8px) | 700 | `normal` | `0.05em` | `#9CA3AF` | `uppercase` |
| **Footer Stat Value** (`.hero-footer-stat strong`)| `"Manrope", sans-serif` | `0.68rem` (10.88px) | 700 | `normal` | `-0.01em` | `#FFFFFF` | `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Interactive Element States

#### Primary Button (`.fo-button-primary` / "Book a Demo")
- **Default State:**
  - `background-color: #0528F2;`
  - `background-image: linear-gradient(135deg, #0528F2 0%, #049DD9 50%, #05C7F2 100%);`
  - `background-size: 200% 100%;`
  - `background-position: 0% 0%;`
  - `box-shadow: 0 2px 8px rgba(5, 40, 242, 0.22);`
  - `color: #FFFFFF;`
- **Hover State (`:hover`, `.is-hover`):**
  - `background-position: 100% 0%;` (gradient slides horizontally)
  - `transform: translateY(-1px);`
  - `box-shadow: 0 6px 20px -3px rgba(5, 40, 242, 0.45), 0 0 12px rgba(5, 199, 242, 0.35);`
  - Arrow Icon: `transform: translateX(3px);` via `200ms cubic-bezier(0.16, 1, 0.3, 1)`.
- **Active / Pressed State (`:active`, `.is-pressed`):**
  - `background-position: 50% 0%;`
  - `transform: translateY(1px);`
  - `box-shadow: 0 2px 6px rgba(5, 40, 242, 0.35);`
- **Focus Visible (`:focus-visible`):**
  - `outline: 2px solid #0528F2; outline-offset: 3px;`

#### Secondary CTA Link (`.home-secondary-cta` / "See How It Flows")
- **Default State:**
  - `color: #0528F2;`
  - `transition: color 180ms ease;`
- **Hover State (`:hover`):**
  - `color: #0540F2;`
  - Arrow Icon: `transform: translateX(0.2rem);` via `180ms ease`.
- **Focus Visible (`:focus-visible`):**
  - `outline: 2px solid #0528F2; outline-offset: 3px;`

#### Eyebrow Capsule (`.home-eyebrow`)
- **Default State:**
  - `background: rgba(5, 40, 242, 0.05);`
  - `border: 1px solid rgba(5, 40, 242, 0.12);`
  - `box-shadow: 0 1px 3px rgba(5, 40, 242, 0.04);`
- **Hover State (`:hover`):**
  - `background: rgba(5, 40, 242, 0.08);`
  - `border-color: rgba(5, 40, 242, 0.22);`
  - `box-shadow: 0 2px 8px rgba(5, 40, 242, 0.08);`

#### Fragment Cards (`.hero-frag-card`)
- **Default State:**
  - `background: rgba(255, 255, 255, 0.035);`
  - `border: 1px solid rgba(255, 255, 255, 0.09);`
  - `box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);`
- **Hover / Active Pulsing State (`:hover`, `.is-pulsing`):**
  - `background: rgba(255, 255, 255, 0.07);`
  - `border-color: rgba(5, 199, 242, 0.4);`
  - `box-shadow: 0 4px 14px rgba(5, 40, 242, 0.25);`
  - `transform: translateY(-1px);`
  - `transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);`

---

### 7.2 Entrance Animations (On Page Load)
All left-column elements execute the `@keyframes home-enter` choreography on page mount:

```css
@keyframes home-enter {
  from { opacity: 0; transform: translateY(0.75rem); }
  to { opacity: 1; transform: none; }
}
```

- **H1:** `duration: 700ms`, `delay: 0s`, `easing: cubic-bezier(0.22, 1, 0.36, 1)`
- **Paragraph:** `duration: 700ms`, `delay: 0.1s` (100ms)
- **Progression Strip:** `duration: 700ms`, `delay: 0.15s` (150ms)
- **Actions Cluster:** `duration: 700ms`, `delay: 0.2s` (200ms)
- **Pipeline Console:** `duration: 700ms`, `delay: 0.35s` (350ms)

---

### 7.3 Looping Autonomous Animations

#### 1. Architectural Beacon Dot Pulse (`.home-eyebrow::before`)
- **Keyframe:** `@keyframes beacon-pulse`
- **Timing:** `2.4s ease-in-out infinite`
- **Behavior:**
  - `0%, 100%`: `opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);`
  - `50%`: `opacity: 0.45; transform: scale(0.8); box-shadow: 0 0 3px rgba(5, 199, 242, 0.3);`

#### 2. Conduit Pipe Energy Pulse (`.conduit-rail-glow`)
- **Keyframe:** `@keyframes conduitFlowInward`
- **Timing:** `1.8s linear infinite`
- **Behavior:**
  - `from`: `stroke-dashoffset: 36;`
  - `to`: `stroke-dashoffset: 0;`
  - Pulses inward toward the center hub card along both SVG branches.

#### 3. Hub Concentric Beacon Rings (`.hub-ring`, `.hub-ring-2`)
- **Keyframe:** `@keyframes hubRingPulse`
- **Timing:** `3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite`
- **Ring 2 Delay:** `1.6s`
- **Behavior:**
  - `0%`: `transform: scale(0.96); opacity: 0.6;`
  - `50%`: `transform: scale(1.04); opacity: 0.2;`
  - `100%`: `transform: scale(1.1); opacity: 0;`

#### 4. Synchronized Fragment State Machine Cycling
- **Trigger:** JavaScript timer cycling every `2400ms`.
- **Mechanism:** Rotates index `0 -> 1 -> 2 -> 0`.
- **Visual Impact:** Simultaneously highlights:
  - Cycle 0: Sales & CRM (Left) and GST Compliance (Right)
  - Cycle 1: Warehouse & Stock (Left) and Banking & Cash (Right)
  - Cycle 2: Finance & Ledger (Left) and AI Intelligence (Right)

---

### 7.4 Reduced-Motion Handling
Under `@media (prefers-reduced-motion: reduce)`:
- All entrance animations (`home-enter`) are disabled (`animation: none`).
- Eyebrow beacon pulse and hub ring pulses are cancelled (`animation: none`).
- The JavaScript 2400ms pulse cycle check aborts on mount (`if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;`).
- All interactive transforms resolve immediately without transitions.

---

## 8. ICONS

### Icon Inventory Table

| Icon / Asset | Library / Source | Package Equivalent | Size | Stroke Width | Color | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Arrow** (`name="arrow"`) | Custom in-repo component (`src/components/flowone.tsx`) | Lucide `ArrowRight` / `MoveRight` | 16px × 16px | 1.5 | Primary: `#FFFFFF`<br/>Secondary: `#0528F2` | Trailing icon in "Book a Demo" & "See How It Flows" |
| **Left Conduits SVG** | Custom inline SVG graphic | None (custom vector) | 50px × 175px (viewBox 0 0 70 210) | 2px base, 1.5px pulse | Rails: `rgba(255,255,255,0.12)`<br/>Glow: `#05C7F2` | Left converging pipelines |
| **Right Conduits SVG** | Custom inline SVG graphic | None (custom vector) | 50px × 175px (viewBox 0 0 70 210) | 2px base, 1.5px pulse | Rails: `rgba(255,255,255,0.12)`<br/>Glow: `#05C7F2` | Right converging pipelines |
| **Spark Logo Mark** | Raster Asset (`/assets/flowone-spark-mark.png`) | Brand Mark | 22px × 22px | N/A | Full color PNG | Center Hub Header Emblem |

---

### Verbatim Inline SVG Markup

#### 1. Arrow Icon (`hero-arrow.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 12h14m-5-5 5 5-5 5" />
</svg>
```

#### 2. Left Pipeline Conduits (`hero-conduit-left.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 210" fill="none" class="hero-conduit-svg" aria-hidden="true">
  <!-- Top branch: left top card to center top -->
  <path d="M 0 35 C 35 35, 35 75, 70 75" class="conduit-rail-path" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" stroke-linecap="round" />
  <path d="M 0 35 C 35 35, 35 75, 70 75" class="conduit-rail-glow" stroke="#05C7F2" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.75" />
  <!-- Mid branch: straight into center -->
  <path d="M 0 105 L 70 105" class="conduit-rail-path" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" stroke-linecap="round" />
  <path d="M 0 105 L 70 105" class="conduit-rail-glow" stroke="#05C7F2" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.75" />
  <!-- Bottom branch: left bottom card to center bottom -->
  <path d="M 0 175 C 35 175, 35 135, 70 135" class="conduit-rail-path" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" stroke-linecap="round" />
  <path d="M 0 175 C 35 175, 35 135, 70 135" class="conduit-rail-glow" stroke="#05C7F2" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.75" />

  <!-- Inward Moving Energy Pulses -->
  <circle class="conduit-pulse-bead conduit-pulse-left-1" r="3.5" fill="#ffffff" />
  <circle class="conduit-pulse-bead conduit-pulse-left-2" r="3.5" fill="#ffffff" />
  <circle class="conduit-pulse-bead conduit-pulse-left-3" r="3.5" fill="#ffffff" />
</svg>
```

#### 3. Right Pipeline Conduits (`hero-conduit-right.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 210" fill="none" class="hero-conduit-svg" aria-hidden="true">
  <!-- Top branch: right top card to center top -->
  <path d="M 70 35 C 35 35, 35 75, 0 75" class="conduit-rail-path" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" stroke-linecap="round" />
  <path d="M 70 35 C 35 35, 35 75, 0 75" class="conduit-rail-glow" stroke="#05C7F2" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.75" />
  <!-- Mid branch: straight into center -->
  <path d="M 70 105 L 0 105" class="conduit-rail-path" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" stroke-linecap="round" />
  <path d="M 70 105 L 0 105" class="conduit-rail-glow" stroke="#05C7F2" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.75" />
  <!-- Bottom branch: right bottom card to center bottom -->
  <path d="M 70 175 C 35 175, 35 135, 0 135" class="conduit-rail-path" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" stroke-linecap="round" />
  <path d="M 70 175 C 35 175, 35 135, 0 135" class="conduit-rail-glow" stroke="#05C7F2" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.75" />

  <!-- Inward Moving Energy Pulses -->
  <circle class="conduit-pulse-bead conduit-pulse-right-1" r="3.5" fill="#ffffff" />
  <circle class="conduit-pulse-bead conduit-pulse-right-2" r="3.5" fill="#ffffff" />
  <circle class="conduit-pulse-bead conduit-pulse-right-3" r="3.5" fill="#ffffff" />
</svg>
```

### Downloadable Icon Package
All hero vector assets have been compiled into individual SVG files and archived in:
- **Archive Path:** `hero-icons.zip` (in workspace root)
- **Files Included:**
  1. `hero-arrow.svg`
  2. `hero-conduit-left.svg`
  3. `hero-conduit-right.svg`
- **Asset Directory:** `hero-assets/` (also contains `flowone-spark-mark.png`)

---

## 9. ACCESSIBILITY

### Semantic Roles & Structure
- Root container uses semantic `<section id="home-hero" className="home-hero">`.
- Primary heading uses a single, top-level `<h1>`.
- CTAs use semantic `<button>` for dialog dispatch and `<a>` for in-page navigation.

### ARIA Attributes
- **Skip Link:** `<a className="fo-skip-link" href="#home-hero">Skip to main content</a>` enables immediate keyboard bypass of header navigation to the Hero landmark.
- **Progression Strip:** Container has `aria-label="Start where it matters. Connect the flow. Scale across the business."`. The decorative directional arrows have `aria-hidden="true"` so screen readers hear the unified string without punctuation distortion.
- **Trust Strip:** Container has `aria-label="flowOne connects five areas of business"`. The divider dots have `<i>` tags without text.
- **Pipeline Console:** Outer container has `aria-label="flowOne Central Architecture: 6 business fragments connected to the central flowOne engine via live pipelines."`.
- **Top Telemetry Header:** Beacon has `aria-label="System status: Live operating telemetry"`. Decorative beacon dot has `aria-hidden="true"`.
- **Decorative Elements Marked `aria-hidden="true"`:**
  - `.hero-pipeline-beam` (Top hairline gradient)
  - `.hero-conduits-col` (Both left and right SVG conduit columns)
  - `.hero-hub-beacon-rings` (Concentric radar pulse rings)
  - `.hero-hub-emblem` (Spark image wrapper)
  - `.hero-hub-status-dot` (Sync footnote green dot)
  - `.hero-frag-port` (Flank connection nodes)
  - `.hero-footer-divider` (Footer vertical dividing lines)

### Keyboard Navigation & Focus Order
- **Focus Order:**
  1. Skip link (on initial Tab press) -> `#home-hero`
  2. "Book a Demo" button (`.fo-button-primary`)
  3. "See How It Flows" link (`.home-secondary-cta`)
- **Focus Indicators:**
  Both interactive elements implement `:focus-visible` displaying a high-contrast 2px solid `#0528F2` outline with a 3px outline offset (`outline: 2px solid var(--state-focus); outline-offset: 3px;`).

---

## 10. NOT FOUND IN CODE

In strict accordance with the handoff audit rules, the following items were thoroughly searched for and confirmed to be **NOT FOUND IN CODE**:

1. **Base Styling for `.hero-live-beacon`:**
   - Declared in JSX (`<div className="hero-live-beacon" aria-label="System status: Live operating telemetry"><i aria-hidden="true" /><span>LIVE OPERATIONAL CONDUIT</span></div>`), but no matching base CSS class `.hero-live-beacon` exists in `src/homepage.css` or `src/index.css`. It is only referenced inside the reduced-motion media query (`.hero-live-beacon i { animation: none; }`). In the browser, it inherits standard flex item behavior from `.hero-pipeline-topbar`.
2. **Base Styling for `.hero-latency-tag`:**
   - Declared in JSX (`<span className="hero-latency-tag">TXN-10482 · 14ms</span>`), but no CSS declaration for `.hero-latency-tag` exists in the codebase. It renders using inherited inline styles.
3. **Explicit Coordinates (`cx`, `cy`) on SVG Conduit Pulse Beads:**
   - The `<circle className="conduit-pulse-bead conduit-pulse-left-1" r="3.5" />` elements do not define `cx` or `cy` attributes in the JSX, nor do the `.conduit-pulse-left-*` classes contain CSS motion offset paths (`offset-path`). In standard browser SVG rendering, unset circles default to `cx="0" cy="0"`.
4. **Target URL for "Book a Demo" Button:**
   - In React, this button attaches to `onClick={openDemo}`, which opens an in-page modal dialog. An external web URL (e.g. `/book-demo/` or a calendar link) is `NOT FOUND IN CODE`. For Elementor Pro, this must be mapped to an Elementor Popup action or marked as `PLACEHOLDER`.
5. **CSS Variable Definitions for `--motion-productive` and `--ease-standard`:**
   - In `src/homepage.css` line 24, `.home-eyebrow` specifies `transition: all var(--motion-productive) var(--ease-standard);`. However, neither `--motion-productive` nor `--ease-standard` is declared in `:root` inside `src/index.css`. The browser falls back to initial transition values (duration 0s / default ease).
6. **RTL (Right-to-Left) Styles:**
   - `NOT FOUND IN CODE`. The Hero section contains no `[dir="rtl"]` selectors, logical pipeline mirrors, or direction-aware conduit transforms.
7. **Drill-down or Click Handlers on Fragment Cards:**
   - The 6 fragment cards (`.hero-frag-card`) are purely visual telemetry cards; they have no `cursor: pointer`, anchor links, or click listeners in the code.

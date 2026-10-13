# flowOne "The Business Loop" Section — Elementor Pro Build Handoff Specification

> **Target Platform:** WordPress with Elementor Pro (Containers, Custom Code / HTML, Headings, Text Editor, Button widgets, Custom CSS)  
> **Source Repository:** `flowOne-NewDesign`  
> **Section:** Section 02 — The Business Loop (`.home-problem.home-section`)  
> **Specification Version:** 1.0 (Strict Code-Audit Release)  
> **Authoring Rule:** Every selector, dimension, color, animation, and breakpoint is derived verbatim from the audited source repository files. No approximations, redesigns, or assumed values are used. If something is unknown or missing, it is documented as `NOT FOUND IN CODE`.

---

## 1. SECTION OVERVIEW

### Purpose and Position on the Page
"The Business Loop" section (`<section className="home-problem home-section">`) articulates the central architectural argument and philosophical core of flowOne: **"Business doesn’t happen in modules."** Traditional business software divides work into isolated silos (CRM, ERP, Billing, Banking), but flowOne treats transactions as continuous, interconnected operational journeys.

- **Preceding Section:** Section 01 — Homepage Hero (`<section id="home-hero" className="home-hero">`)
- **Succeeding Section:** Section 03 — Living Transaction interactive explorer (`<section id="living-transaction" className="home-living">`)

### Structural Summary
The section is organized into two distinct functional layers:
1. **Upper Narrative Layer (`.problem-grid`):** A 2-column layout pairing:
   - **Left Column:** Architectural beacon pill index (`THE BUSINESS LOOP`) and primary section heading (`<h2>Business doesn’t happen in modules.</h2>`).
   - **Right Column (`.problem-copy`):** An animated vertical timeline (**Kinetic Causality Thread**, `.causality-thread`) mapping 5 interconnected milestones from order creation to executive decision, anchored by an executive payoff callout card (`.causality-payoff`).
2. **Lower Interactive Bus Layer (`BusinessLoop` / `.business-loop`):** A full-width, 6-station interactive lifecycle bus spanning:
   - `[ 01 ] BUSINESS ACTIVITY`
   - `[ 02 ] TRANSACTION`
   - `[ 03 ] OPERATIONS`
   - `[ 04 ] FINANCE`
   - `[ 05 ] CASH`
   - `[ 06 ] DECISION`  
   Connected by a continuous horizontal progress rail (`.business-flow-rail`) featuring an automated 900ms scroll-triggered sequence and full hover/focus manual interaction states.

### Component Files and Exact Line Ranges

| File Path | Exact Line Range | Role in Section |
| :--- | :--- | :--- |
| `src/Homepage.tsx` | Lines 593–651 | `<section className="home-problem home-section">` markup & `.problem-grid` narrative |
| `src/Homepage.tsx` | Lines 1555–1637 | `BusinessLoop` component implementation (interactive 6-step operating bus) |
| `src/homepage.css` | Lines 6–60 | Eyebrow/index capsule (`.home-index`) & `@keyframes beacon-pulse` |
| `src/homepage.css` | Line 61 | Section `h2` heading token styling |
| `src/homepage.css` | Lines 609–738 | Base section layout, `.problem-grid`, `.causality-thread`, and `.causality-payoff` |
| `src/homepage.css` | Lines 739–915 | Dual-rail operating bus (`.business-loop`), progress fill, and interactive `.loop-item` cards |
| `src/homepage.css` | Lines 4464–4466 | Mobile section padding token rules (`@media (max-width: 48rem)`) |
| `src/homepage.css` | Lines 4482–4491 | Mobile breakpoint overrides for problem grid, causality thread, and loop cards |
| `src/homepage.css` | Lines 4630–4632, 4638 | Accessibility reduced-motion overrides (`@media (prefers-reduced-motion: reduce)`) |
| `src/index.css` | Lines 11–221 | Canonical design tokens, colors, gradients, typography, and focus ring definitions |

---

## 2. CODE

### 2.1 Verbatim JSX / TSX Markup

#### Section Shell & Narrative Grid (`src/Homepage.tsx`, Lines 593–651)
```tsx
    <section className="home-problem home-section">
      <div className="home-container problem-grid">
        <div>
          <span className="home-index">THE BUSINESS LOOP</span>
          <h2>Business doesn’t happen in modules.</h2>
        </div>
        <div className="problem-copy">
          <div className="causality-thread" aria-label="Business causality progression">
            <div className="causality-step">
              <span className="causality-node" aria-hidden="true" />
              <span className="causality-text">
                <strong>An order</strong>
                <span className="causality-arrow" aria-hidden="true">→</span>
                <span>becomes</span>
                <strong>inventory.</strong>
              </span>
            </div>
            <div className="causality-step">
              <span className="causality-node" aria-hidden="true" />
              <span className="causality-text">
                <strong>Inventory</strong>
                <span className="causality-arrow" aria-hidden="true">→</span>
                <span>becomes</span>
                <strong>an invoice.</strong>
              </span>
            </div>
            <div className="causality-step">
              <span className="causality-node" aria-hidden="true" />
              <span className="causality-text">
                <strong>An invoice</strong>
                <span className="causality-arrow" aria-hidden="true">→</span>
                <span>becomes</span>
                <strong>a receivable.</strong>
              </span>
            </div>
            <div className="causality-step">
              <span className="causality-node" aria-hidden="true" />
              <span className="causality-text">
                <strong>A payment</strong>
                <span className="causality-arrow" aria-hidden="true">→</span>
                <span>becomes</span>
                <strong>cash.</strong>
              </span>
            </div>
            <div className="causality-step is-final">
              <span className="causality-node" aria-hidden="true" />
              <span className="causality-text">
                <strong>A business decision follows.</strong>
              </span>
            </div>
          </div>
          <div className="causality-payoff">
            <strong>This is one business event.</strong>
            <p>Your software should understand the whole journey.</p>
          </div>
        </div>
      </div>
      <BusinessLoop />
    </section>
```

#### BusinessLoop Operating Bus Component (`src/Homepage.tsx`, Lines 1555–1637)
```tsx
const BusinessLoop = memo(function BusinessLoop() {
  const items = [
    ["BUSINESS ACTIVITY", "Demand begins", "Commercial terms agreed"],
    ["TRANSACTION", "Context forms", "TXN-10482 generated"],
    ["OPERATIONS", "Work happens", "125 units reserved DC-02"],
    ["FINANCE", "Value is recorded", "INV-10482 + GST linked"],
    ["CASH", "Money arrives", "HDFC bank matched 98%"],
    ["DECISION", "The business acts", "Working capital updated"],
  ] as const;
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(5);
      hasPlayed.current = true;
      return;
    }
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting || hasPlayed.current) return;
        hasPlayed.current = true;
        items.forEach((_, index) =>
          timers.current.push(window.setTimeout(() => setActive(index), index * 900))
        );
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.current.forEach(window.clearTimeout);
    };
  }, []);

  const activate = (index: number) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    hasPlayed.current = true;
    setActive(index);
  };

  return (
    <div ref={root} className={`business-loop home-container is-step-${active}`}>
      <div className="business-flow-rail" aria-hidden="true">
        <div className="business-flow-rail-track" />
        <i className="business-flow-rail-fill" />
        <b className="business-flow-rail-pulse" />
      </div>
      <div className="business-loop-grid">
        {items.map(([title, description, detail], index) => (
          <button
            key={title}
            className={`loop-item loop-${index} ${
              index < active ? "is-complete" : index === active ? "is-active" : ""
            }`}
            onPointerEnter={() => activate(index)}
            onFocus={() => activate(index)}
            onClick={() => activate(index)}
            aria-current={index === active ? "step" : undefined}
          >
            <div className="loop-item-topline">
              <span className="loop-mono-tag">[ 0{index + 1} ]</span>
              <span className="loop-status-dot" aria-hidden="true" />
            </div>
            <i className="business-flow-node" aria-hidden="true" />
            <div className="loop-item-content">
              <strong>{title}</strong>
              <small>{description}</small>
              <span className="loop-detail-tag">{detail}</span>
            </div>
          </button>
        ))}
      </div>
      <p className="fo-sr-only">{items.map(item => item[0]).join(", then ")}.</p>
    </div>
  );
});
```

---

### 2.2 Verbatim CSS

```css
/* ==========================================================================
   1. SECTION CONTAINER & BASE PADDING (src/homepage.css)
   ========================================================================== */
.home-section {
  padding-block: clamp(3.25rem, 5.5vh, 4.5rem);
}

.home-problem {
  background: var(--color-surface-page);
}

.home-container {
  width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));
  margin-inline: auto;
}

/* ==========================================================================
   2. EYEBROW / INDEX PILL CAPSULE (src/homepage.css)
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
   3. SECTION HEADING & UPPER GRID (src/homepage.css)
   ========================================================================== */
.home-section h2 {
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-h2);
  line-height: var(--leading-heading);
  letter-spacing: -.05em;
  font-weight: 650;
}

.problem-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-10);
  align-items: start;
}

.problem-copy {
  padding-top: clamp(0.25rem, 0.8vw, 0.75rem);
  display: flex;
  flex-direction: column;
}

/* ==========================================================================
   4. KINETIC CAUSALITY THREAD (src/homepage.css)
   ========================================================================== */
.causality-thread {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding-left: 2rem;
}

.causality-thread::before {
  content: "";
  position: absolute;
  left: 0.44rem;
  top: 0.75rem;
  bottom: 0.75rem;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-brand-blue) 0%,
    var(--flow-cyan) 65%,
    rgba(5, 40, 242, 0.2) 100%
  );
  border-radius: var(--radius-full);
}

.causality-step {
  position: relative;
  display: flex;
  align-items: center;
  font-size: clamp(1.02rem, 1.15vw, 1.15rem);
  line-height: 1.45;
  color: var(--color-text-secondary);
  letter-spacing: -0.015em;
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), color 180ms ease;
  cursor: default;
}

.causality-step:hover {
  transform: translateX(4px);
}

.causality-node {
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.92rem;
  height: 0.92rem;
  border-radius: var(--radius-full);
  background: var(--neutral-0, #ffffff);
  border: 2px solid var(--color-brand-blue);
  box-shadow: 0 0 0 3px rgba(5, 40, 242, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 180ms ease;
  z-index: 2;
}

.causality-node::after {
  content: "";
  width: 0.32rem;
  height: 0.32rem;
  border-radius: var(--radius-full);
  background: var(--color-brand-blue);
  transition: background 180ms ease;
}

.causality-step:hover .causality-node {
  border-color: var(--flow-primary-deep);
  box-shadow: 0 0 0 5px rgba(5, 40, 242, 0.16);
}

.causality-step.is-final .causality-node {
  border-color: var(--flow-cyan-bright);
}

.causality-step.is-final .causality-node::after {
  background: var(--flow-cyan-bright);
  box-shadow: 0 0 6px rgba(5, 199, 242, 0.8);
}

.causality-text {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.55rem;
}

.causality-text strong {
  color: var(--flow-ink, #0d0d0d);
  font-weight: 650;
  letter-spacing: -0.015em;
}

.causality-arrow {
  color: var(--color-brand-blue);
  font-weight: 700;
  user-select: none;
  font-size: 0.95em;
  opacity: 0.85;
  transition: transform 180ms ease;
}

.causality-step:hover .causality-arrow {
  transform: translateX(2px);
  color: var(--flow-primary-deep);
}

/* ==========================================================================
   5. PAYOFF EXECUTIVE CALLOUT CARD (src/homepage.css)
   ========================================================================== */
.causality-payoff {
  margin-top: clamp(1.6rem, 2.8vh, 2.2rem);
  padding: 1.15rem 1.4rem;
  background: rgba(5, 40, 242, 0.035);
  border: 1px solid rgba(5, 40, 242, 0.12);
  border-left: 3.5px solid var(--flow-primary);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  box-shadow: 0 2px 10px rgba(5, 40, 242, 0.04);
}

.causality-payoff strong {
  font-size: clamp(1.18rem, 1.35vw, 1.32rem);
  font-weight: 700;
  color: var(--flow-ink, #0d0d0d);
  letter-spacing: -0.025em;
  line-height: 1.3;
}

.causality-payoff p {
  margin: 0;
  font-size: clamp(0.925rem, 1.05vw, 1.02rem);
  color: var(--color-text-secondary);
  line-height: 1.55;
  letter-spacing: -0.01em;
}

/* ==========================================================================
   6. THE BUSINESS LOOP OPERATING BUS (src/homepage.css)
   ========================================================================== */
.business-loop {
  --flow-progress: 0%;
  position: relative;
  margin-top: clamp(1.75rem, 3vh, 2.5rem);
  padding-block: 2rem;
}

.business-loop.is-step-0 { --flow-progress: 8.33%; }
.business-loop.is-step-1 { --flow-progress: 25%; }
.business-loop.is-step-2 { --flow-progress: 41.66%; }
.business-loop.is-step-3 { --flow-progress: 58.33%; }
.business-loop.is-step-4 { --flow-progress: 75%; }
.business-loop.is-step-5 { --flow-progress: 91.66%; }

.business-flow-rail {
  position: absolute;
  left: 2rem;
  right: 2rem;
  top: 4.25rem;
  height: 2px;
  pointer-events: none;
  z-index: 1;
}

.business-flow-rail-track {
  position: absolute;
  inset: 0;
  background: var(--color-neutral-300);
  height: 2px;
}

.business-flow-rail-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 2px;
  width: var(--flow-progress);
  background: var(--color-brand-blue);
  box-shadow: 0 0 8px rgba(0, 34, 255, 0.4);
  transition: width 900ms var(--ease-power3-in-out);
}

.business-flow-rail-pulse {
  position: absolute;
  left: var(--flow-progress);
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--radius-full);
  background: var(--color-brand-blue);
  border: 1.5px solid var(--color-white);
  box-shadow: 0 0 10px rgba(0, 34, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: left 900ms var(--ease-power3-in-out);
}

.business-loop-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.85rem;
  position: relative;
  z-index: 2;
}

.loop-item {
  min-height: 15rem;
  padding: 1rem 0.85rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-top: 3px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  cursor: pointer;
  font: inherit;
  color: var(--color-text-primary);
  transition: transform var(--motion-standard), box-shadow var(--motion-standard), border-color var(--motion-standard);
  position: relative;
}

.loop-item:hover, .loop-item:focus-visible {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
  border-top-color: var(--color-brand-blue);
}

.loop-item:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.loop-item-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loop-mono-tag {
  color: var(--color-neutral-500);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: color var(--motion-fast);
}

.loop-status-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: var(--radius-full);
  background: var(--color-neutral-300);
  transition: background var(--motion-fast);
}

.business-flow-node {
  width: 0.75rem;
  height: 0.75rem;
  margin-top: 1.5rem;
  border-radius: var(--radius-full);
  background: var(--color-white);
  border: 2px solid var(--color-neutral-400);
  transition: all var(--motion-fast);
}

.loop-item-content {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.loop-item-content strong {
  font-size: 0.82rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.loop-item-content small {
  color: var(--color-text-tertiary);
  font-size: 0.7rem;
}

.loop-detail-tag {
  margin-top: 0.4rem;
  padding-top: 0.4rem;
  border-top: 1px dashed var(--color-border-default);
  font-size: 0.62rem;
  color: var(--color-neutral-500);
  font-weight: 600;
}

.loop-item.is-complete {
  border-top-color: var(--color-brand-ink);
}

.loop-item.is-complete .loop-mono-tag {
  color: var(--color-neutral-700);
}

.loop-item.is-complete .loop-status-dot {
  background: var(--color-brand-ink);
}

.loop-item.is-complete .business-flow-node {
  background: var(--color-brand-ink);
  border-color: var(--color-brand-ink);
}

.loop-item.is-active {
  border-color: var(--color-border-default);
  border-top: 3px solid var(--color-brand-blue);
  box-shadow: 0 6px 20px rgba(0, 34, 255, 0.12);
  transform: translateY(-3px);
}

.loop-item.is-active .loop-mono-tag {
  color: var(--color-brand-blue);
}

.loop-item.is-active .loop-status-dot {
  background: var(--color-brand-blue);
  box-shadow: 0 0 6px var(--color-brand-blue);
}

.loop-item.is-active .business-flow-node {
  width: 0.85rem;
  height: 0.85rem;
  background: var(--color-brand-blue);
  border-color: var(--color-brand-blue);
  box-shadow: 0 0 0 3px rgba(0, 34, 255, 0.25);
}

.loop-item.is-active .loop-item-content strong {
  color: var(--color-brand-blue);
}

.loop-item.is-active .loop-detail-tag {
  color: var(--color-brand-blue);
}

/* ==========================================================================
   7. ACCESSIBLE SCREEN-READER TEXT (src/index.css)
   ========================================================================== */
.fo-sr-only {
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  position: absolute !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* ==========================================================================
   8. RESPONSIVE MEDIA QUERIES (src/homepage.css)
   ========================================================================== */
@media (max-width: 48rem) {
  .home-section {
    padding-block: clamp(2.25rem, 4.5vh, 3rem);
  }

  .home-section h2 {
    font-size: var(--font-h2);
  }

  .problem-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }

  .problem-copy {
    padding-top: 0.25rem;
  }

  .causality-thread {
    padding-left: 1.6rem;
    gap: 0.9rem;
  }

  .causality-node {
    left: -1.6rem;
    width: 0.85rem;
    height: 0.85rem;
  }

  .causality-payoff {
    padding: 1rem 1.15rem;
    margin-top: 1.35rem;
  }

  .business-loop {
    min-height: auto;
    margin-top: 1.75rem;
    padding-block: 1rem;
  }

  .business-flow-rail {
    display: none;
  }

  .business-loop-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .loop-item {
    min-height: 8rem;
  }
}

/* ==========================================================================
   9. ACCESSIBILITY REDUCED-MOTION (src/homepage.css)
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .home-eyebrow::before,
  .home-index::before {
    animation: none;
  }

  .business-flow-rail-pulse {
    animation: none;
  }

  .business-flow-rail-fill {
    transition: none;
  }

  .loop-item {
    transition: none;
  }

  .causality-step,
  .causality-arrow,
  .causality-node {
    transition: none !important;
    transform: none !important;
  }
}
```

---

### 2.3 Shared Tokens and Resolved Values

When tokens exist across multiple stylesheet layers, **`src/index.css`** acts as the canonical source for `:root` definitions, and **`src/homepage.css`** applies local component overrides. Below is the complete resolution table for every token used by Section 02:

| Variable Name | Canonical Alias | Resolved Literal Value | Usage in Section 02 | Precedence / Winning File |
| :--- | :--- | :--- | :--- | :--- |
| `--color-surface-page` | `--neutral-0` | `#FFFFFF` | Background of section (`.home-problem`) | `src/index.css` (:root) |
| `--flow-primary` | `--color-brand-blue` | `#0528F2` | Eyebrow pill text, causality node border, payoff left border, active loop card elements | `src/index.css` (:root) |
| `--flow-primary-deep` | `--color-action-primary-hover` | `#0540F2` | Hover state border for causality nodes & hover color for arrows | `src/index.css` (:root) |
| `--flow-cyan` | `--color-brand-cyan` | `#049DD9` | Middle color of causality vertical gradient line | `src/index.css` (:root) |
| `--flow-cyan-bright` | — | `#05C7F2` | Eyebrow 6px pulsing beacon dot, final milestone node border and core dot | `src/index.css` (:root) |
| `--flow-ink` | `--color-brand-ink` | `#0D0D0D` | Milestone text strong highlights, payoff heading, completed card borders/dots | `src/index.css` (:root) |
| `--neutral-0` | `--color-white` | `#FFFFFF` | Causality node background, loop card background, rail pulse dot border | `src/index.css` (:root) |
| `--neutral-200` | `--color-border-default` | `#E6EAF0` | Loop card border default, loop detail dashed divider line | `src/index.css` (:root) |
| `--neutral-300` | `--color-neutral-300` | `#DDE3EA` | Rail background track, default loop card top border, inactive dot background | `src/index.css` (:root) |
| `--neutral-400` | `--color-neutral-400` | `#9CA3AF` | Inactive step flow node ring border (`.business-flow-node`) | `src/index.css` (:root) |
| `--neutral-500` | `--color-text-tertiary` | `#6B7280` | Inactive card mono tag, description text, detail tag text | `src/index.css` (:root) |
| `--neutral-700` | `--color-text-secondary` | `#374151` | Milestone body text, payoff body text, completed card mono tag | `src/index.css` (:root) |
| `--neutral-900` | `--color-text-primary` | `#0D0D0D` | Loop card base font color | `src/index.css` (:root) |
| `--color-border-focus` | `--state-focus` | `#0528F2` | Focus-visible outline for interactive loop card buttons | `src/index.css` (:root) |
| `--font-family-primary` | — | `"Manrope", sans-serif` | Global font for headings, body copy, and cards | `src/index.css` (:root) |
| `--font-h2` | — | `clamp(2.25rem, 3.34vw, 3rem)` (36px to 48px) | Section `<h2>` heading size | `src/index.css` (:root) |
| `--leading-heading` | — | `1.08` | Line-height for `<h2>` | `src/index.css` (:root) |
| `--spacing-4` | — | `2rem` (32px) | Heading top margin (`margin: var(--spacing-4) 0 0`) | `src/index.css` (:root) |
| `--spacing-6` | — | `3rem` (48px) | Mobile grid gap on `.problem-grid` (≤48rem) | `src/index.css` (:root) |
| `--spacing-10` | — | `5rem` (80px) | Desktop grid gap on `.problem-grid` | `src/index.css` (:root) |
| `--radius-md` | — | `0.5rem` (8px) | Loop item card border-radius | `src/index.css` (:root) |
| `--radius-lg` | — | `0.75rem` (12px) | Payoff callout card border-radius | `src/index.css` (:root) |
| `--radius-full` | — | `9999px` | Eyebrow pill, nodes, status dots, and rail pulse dot | `src/index.css` (:root) |
| `--shadow-xs` | — | `0 1px 2px rgb(11 16 32 / 0.04)` | Default loop item card shadow | `src/index.css` (:root) |
| `--shadow-sm` | — | `0 4px 12px rgb(11 16 32 / 0.06)` | Hovered loop item card shadow | `src/index.css` (:root) |
| `--motion-fast` | — | `180ms` | Micro-interaction transitions (status dots, node colors, tags) | `src/index.css` (:root) |
| `--motion-standard` | — | `350ms` | Card hover elevation and transform transitions | `src/index.css` (:root) |
| `--ease-power3-in-out`| — | `cubic-bezier(0.65, 0, 0.35, 1)` | Progress rail fill and pulse movement easing | `src/index.css` (:root) |
| `--container-wide` | — | `80rem` (1280px) | Container max width constraint | `src/index.css` (:root) |
| `--page-padding` | — | `clamp(1.25rem, 3.34vw, 3rem)` | Horizontal page gutter (20px to 48px) | `src/index.css` (:root) |

---

### 2.4 JavaScript & Behaviour Hooks

#### 1. Verbatim React Component Hook (`src/Homepage.tsx`, Lines 1569–1600)
```tsx
const [active, setActive] = useState(0);
const root = useRef<HTMLDivElement>(null);
const timers = useRef<number[]>([]);
const hasPlayed = useRef(false);

useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setActive(5);
    hasPlayed.current = true;
    return;
  }
  const node = root.current;
  if (!node) return;
  const observer = new IntersectionObserver(
    entries => {
      if (!entries[0]?.isIntersecting || hasPlayed.current) return;
      hasPlayed.current = true;
      items.forEach((_, index) =>
        timers.current.push(window.setTimeout(() => setActive(index), index * 900))
      );
      observer.disconnect();
    },
    { threshold: 0.35 }
  );
  observer.observe(node);
  return () => {
    observer.disconnect();
    timers.current.forEach(window.clearTimeout);
  };
}, []);

const activate = (index: number) => {
  timers.current.forEach(window.clearTimeout);
  timers.current = [];
  hasPlayed.current = true;
  setActive(index);
};
```

#### 2. Plain Vanilla JavaScript Snippet for Elementor Pro
Paste this into an Elementor HTML widget or child theme script:
```javascript
document.addEventListener('DOMContentLoaded', function () {
  const loopRoot = document.querySelector('.business-loop');
  if (!loopRoot) return;

  const loopItems = loopRoot.querySelectorAll('.loop-item');
  const railFill = loopRoot.querySelector('.business-flow-rail-fill');
  const railPulse = loopRoot.querySelector('.business-flow-rail-pulse');

  const progressSteps = ['8.33%', '25%', '41.66%', '58.33%', '75%', '91.66%'];
  let timers = [];
  let hasPlayed = false;

  function setStep(index) {
    // Update container class for progress variable
    loopRoot.className = loopRoot.className.replace(/is-step-\d+/g, '').trim() + ' is-step-' + index;
    if (railFill) railFill.style.width = progressSteps[index];
    if (railPulse) railPulse.style.left = progressSteps[index];

    // Update individual card states
    loopItems.forEach(function (card, i) {
      card.classList.remove('is-complete', 'is-active');
      card.removeAttribute('aria-current');
      if (i < index) {
        card.classList.add('is-complete');
      } else if (i === index) {
        card.classList.add('is-active');
        card.setAttribute('aria-current', 'step');
      }
    });
  }

  function manualActivate(index) {
    timers.forEach(clearTimeout);
    timers = [];
    hasPlayed = true;
    setStep(index);
  }

  // Bind pointer, click, and keyboard focus to every card
  loopItems.forEach(function (card, idx) {
    card.addEventListener('pointerenter', function () { manualActivate(idx); });
    card.addEventListener('focus', function () { manualActivate(idx); });
    card.addEventListener('click', function () { manualActivate(idx); });
  });

  // Reduced motion: jump directly to final step
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setStep(5);
    hasPlayed = true;
    return;
  }

  // IntersectionObserver entrance sequence
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || hasPlayed) return;
      hasPlayed = true;
      loopItems.forEach(function (_, index) {
        timers.push(setTimeout(function () {
          setStep(index);
        }, index * 900));
      });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(loopRoot);
  } else {
    setStep(0);
  }
});
```

---

## 3. CONTENT

### Display Order Content Inventory

| Item # | Semantic Tag | CSS Class / Component | Verbatim Text Content | URL / Anchor Destination | Status / Type |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | `<span>` | `.home-index` | `"THE BUSINESS LOOP"` | None | Section beacon eyebrow badge |
| **02** | `<h2>` | `.home-section h2` | `"Business doesn’t happen in modules."` | None | Primary section heading |
| **03** | `<div>` | `.causality-thread` | — | None | Container `aria-label`: `"Business causality progression"` |
| **04** | Step 1 | `.causality-step` | `"An order "` + `"→"` + `" becomes "` + `"inventory."` | None | Milestone 1 |
| **05** | Step 2 | `.causality-step` | `"Inventory "` + `"→"` + `" becomes "` + `"an invoice."` | None | Milestone 2 |
| **06** | Step 3 | `.causality-step` | `"An invoice "` + `"→"` + `" becomes "` + `"a receivable."` | None | Milestone 3 |
| **07** | Step 4 | `.causality-step` | `"A payment "` + `"→"` + `" becomes "` + `"cash."` | None | Milestone 4 |
| **08** | Step 5 | `.causality-step.is-final` | `"A business decision follows."` | None | Milestone 5 (Final outcome) |
| **09** | `<strong>`| `.causality-payoff strong` | `"This is one business event."` | None | Payoff card title |
| **10** | `<p>` | `.causality-payoff p` | `"Your software should understand the whole journey."` | None | Payoff card body paragraph |
| **11** | Station 1 | `.loop-item.loop-0` | Tag: `"[ 01 ]"`<br/>Title: `"BUSINESS ACTIVITY"`<br/>Desc: `"Demand begins"`<br/>Detail: `"Commercial terms agreed"` | None | Operating bus step button |
| **12** | Station 2 | `.loop-item.loop-1` | Tag: `"[ 02 ]"`<br/>Title: `"TRANSACTION"`<br/>Desc: `"Context forms"`<br/>Detail: `"TXN-10482 generated"` | None | Operating bus step button |
| **13** | Station 3 | `.loop-item.loop-2` | Tag: `"[ 03 ]"`<br/>Title: `"OPERATIONS"`<br/>Desc: `"Work happens"`<br/>Detail: `"125 units reserved DC-02"` | None | Operating bus step button |
| **14** | Station 4 | `.loop-item.loop-3` | Tag: `"[ 04 ]"`<br/>Title: `"FINANCE"`<br/>Desc: `"Value is recorded"`<br/>Detail: `"INV-10482 + GST linked"` | None | Operating bus step button |
| **15** | Station 5 | `.loop-item.loop-4` | Tag: `"[ 05 ]"`<br/>Title: `"CASH"`<br/>Desc: `"Money arrives"`<br/>Detail: `"HDFC bank matched 98%"` | None | Operating bus step button |
| **16** | Station 6 | `.loop-item.loop-5` | Tag: `"[ 06 ]"`<br/>Title: `"DECISION"`<br/>Desc: `"The business acts"`<br/>Detail: `"Working capital updated"` | None | Operating bus step button |
| **17** | `<p>` | `.fo-sr-only` | `"BUSINESS ACTIVITY, then TRANSACTION, then OPERATIONS, then FINANCE, then CASH, then DECISION."` | None | Screen-reader full journey sequence |

### Link Destination Summary
- **Links in Section:** `NONE`. Section 02 contains zero outbound hyperlinks or anchor links (`<a>` tags). All 6 lifecycle cards are implemented as accessible `<button>` controls.

---

## 4. LAYOUT SPEC

### 4.1 Container & Section Geometry
- **Outer Section (`.home-problem.home-section`):**
  - Width: `100%`.
  - Padding-Block:
    - Desktop: `clamp(3.25rem, 5.5vh, 4.5rem)` (52px to 72px).
    - Mobile (≤48rem / 768px): `clamp(2.25rem, 4.5vh, 3rem)` (36px to 48px).
  - Background: `var(--color-surface-page)` = `#FFFFFF` (clean neutral background, establishing the alternating canvas rhythm following the Hero).
- **Container Max Width & Padding:**
  - Formula: `width: min(calc(100% - (var(--page-padding) * 2)), var(--container-wide));`
  - Container Max Width: `var(--container-wide)` = `80rem` (1280px).
  - Horizontal Padding: `var(--page-padding)` = `clamp(1.25rem, 3.34vw, 3rem)` (20px to 48px).
  - Margin: `margin-inline: auto;` (Centers layout).

### 4.2 Narrative Layer Layout (`.problem-grid`)
- **Structure:** 2-column CSS Grid.
- **Columns:** `1fr 1fr` (50% / 50% split).
- **Gap:** `var(--spacing-10)` = `5rem` (80px).
- **Alignment:** `align-items: start`.
- **Left Column:**
  - Contains `.home-index` pill capsule and `<h2>`.
  - `h2` Top Margin: `var(--spacing-4)` = `2rem` (32px).
- **Right Column (`.problem-copy`):**
  - Padding Top: `clamp(0.25rem, 0.8vw, 0.75rem)`.
  - Display: Flexbox column.

### 4.3 Kinetic Causality Thread Layout (`.causality-thread`)
- **Padding-Left:** `2rem` (32px) on desktop; `1.6rem` (25.6px) on mobile.
- **Vertical Step Gap:** `1.1rem` (17.6px) on desktop; `0.9rem` (14.4px) on mobile.
- **Vertical Connecting Line (`.causality-thread::before`):**
  - Position: `position: absolute; left: 0.44rem; top: 0.75rem; bottom: 0.75rem; width: 2px;`
  - Border-Radius: `var(--radius-full)` = `9999px`.
  - Background:
    ```css
    background: linear-gradient(
      to bottom,
      #0528F2 0%,
      #049DD9 65%,
      rgba(5, 40, 242, 0.2) 100%
    );
    ```
- **Node Geometry (`.causality-node`):**
  - Position: `position: absolute; left: -2rem; top: 50%; transform: translateY(-50%);` (on mobile: `left: -1.6rem`).
  - Outer Node: `width: 0.92rem; height: 0.92rem; border-radius: 50%; border: 2px solid #0528F2; background: #FFFFFF;`
  - Outer Glow: `box-shadow: 0 0 0 3px rgba(5, 40, 242, 0.08);`
  - Inner Core (`::after`): `width: 0.32rem; height: 0.32rem; border-radius: 50%; background: #0528F2;`
  - Final Step Node (`.is-final`): Border `#05C7F2`, inner core `#05C7F2` with `box-shadow: 0 0 6px rgba(5, 199, 242, 0.8)`.

### 4.4 Payoff Executive Callout Card (`.causality-payoff`)
- **Margin Top:** `clamp(1.6rem, 2.8vh, 2.2rem)` on desktop; `1.35rem` on mobile.
- **Padding:** `1.15rem 1.4rem` on desktop; `1rem 1.15rem` on mobile.
- **Background:** `rgba(5, 40, 242, 0.035)` (soft 3.5% electric blue tint).
- **Border:** `1px solid rgba(5, 40, 242, 0.12); border-left: 3.5px solid #0528F2;`
- **Border Radius:** `var(--radius-lg)` = `0.75rem` (12px).
- **Box Shadow:** `0 2px 10px rgba(5, 40, 242, 0.04)`.
- **Flex Gap:** `0.35rem` between heading and description.

### 4.5 The Business Loop Operating Bus (`.business-loop`)
- **Margin Top:** `clamp(1.75rem, 3vh, 2.5rem)` on desktop; `1.75rem` on mobile.
- **Padding Block:** `2rem` (32px) on desktop; `1rem` (16px) on mobile.
- **Progress Flow Rail (`.business-flow-rail`):**
  - Position: `position: absolute; left: 2rem; right: 2rem; top: 4.25rem; height: 2px;`
  - Background Track: `background: #DDE3EA; height: 2px;`
  - Fill Line: `height: 2px; width: var(--flow-progress); background: #0528F2; box-shadow: 0 0 8px rgba(0, 34, 255, 0.4); transition: width 900ms cubic-bezier(0.65, 0, 0.35, 1);`
  - Pulse Dot: `width: 0.5rem; height: 0.5rem; border-radius: 50%; left: var(--flow-progress); top: 50%; transform: translate(-50%, -50%); background: #0528F2; border: 1.5px solid #FFFFFF; box-shadow: 0 0 10px rgba(0, 34, 255, 0.5); transition: left 900ms cubic-bezier(0.65, 0, 0.35, 1);`
  - Mobile Behavior: `display: none !important;` (hidden at ≤48rem).
- **Loop Cards Grid (`.business-loop-grid`):**
  - Desktop: `display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.85rem;`
  - Mobile: `grid-template-columns: 1fr; gap: 0.75rem;`
- **Individual Loop Item Cards (`.loop-item`):**
  - Dimensions: Desktop: `min-height: 15rem` (240px); Mobile: `min-height: 8rem` (128px).
  - Padding: `1rem 0.85rem` (16px × 13.6px).
  - Border: `1px solid #E6EAF0; border-top: 3px solid #DDE3EA; border-radius: 0.5rem;`
  - Shadow: `box-shadow: 0 1px 2px rgb(11 16 32 / 0.04);`
  - Internal Node Ring (`.business-flow-node`):
    - Position: `margin-top: 1.5rem; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: #FFFFFF; border: 2px solid #9CA3AF;`
    - When Complete (`.is-complete`): `background: #0D0D0D; border-color: #0D0D0D;`
    - When Active (`.is-active`): `width: 0.85rem; height: 0.85rem; background: #0528F2; border-color: #0528F2; box-shadow: 0 0 0 3px rgba(0, 34, 255, 0.25);`

---

## 5. RESPONSIVE SPEC

### Breakpoint Table

| Breakpoint Name | Media Query in Code | Pixel Equivalent | Changes in Section 02 |
| :--- | :--- | :--- | :--- |
| **Desktop / Laptop**| Base (no query) | `> 768px` | 2-column `.problem-grid` (1fr 1fr, 5rem gap); 6-column `.business-loop-grid` (`repeat(6, 1fr)`); active horizontal `.business-flow-rail`. |
| **Tablet Range** | `@media (max-width: 64rem)` | `768px–1024px` | No specific overrides exist in code for Section 02; maintains 2-column grid and 6-card row until 768px. |
| **Mobile Threshold**| `@media (max-width: 48rem)` | `≤ 768px` | Section padding decreases; `.problem-grid` stacks to 1 column; thread padding tightens; rail hides; loop cards stack to 1 column. |
| **Accessibility** | `@media (prefers-reduced-motion: reduce)` | System flag | Disables beacon dot animation, rail transitions, card transform transitions, and causality step shifts. |

### Responsive Transformations Detail

#### Tablet (768px–1024px)
- The codebase defines no selector overrides under `@media (max-width: 64rem)` for `.problem-grid`, `.causality-thread`, or `.business-loop`.
- Both the narrative grid (1fr 1fr) and the 6-card lifecycle bus remain horizontal across standard tablet viewports (≥769px).

#### Mobile (≤767px / in code `@media (max-width: 48rem)` / 768px)
- **Section Padding:** Reduces from `clamp(3.25rem, 5.5vh, 4.5rem)` to `clamp(2.25rem, 4.5vh, 3rem)`.
- **Narrative Grid:**
  - `.problem-grid` collapses from 2 columns to a single column: `grid-template-columns: 1fr; gap: var(--spacing-6);` (48px).
  - `.problem-copy` reduces top padding to `0.25rem`.
- **Causality Thread:**
  - Left padding reduces from `2rem` to `1.6rem`.
  - Node position shifts: `.causality-node { left: -1.6rem; width: 0.85rem; height: 0.85rem; }`.
  - Step gap tightens from `1.1rem` to `0.9rem`.
- **Payoff Card:**
  - Margin top decreases to `1.35rem`.
  - Internal padding adjusts to `1rem 1.15rem`.
- **Business Loop Operating Bus:**
  - Container padding-block drops to `1rem`.
  - **Horizontal Rail Hidden:** `.business-flow-rail { display: none; }` (The track, fill, and pulse dot are hidden).
  - **Grid Layout:** Collapses from 6 horizontal columns to a 1-column vertical card stack:
    `.business-loop-grid { grid-template-columns: 1fr; gap: 0.75rem; }`
  - **Card Height:** Min-height decreases from `15rem` to `8rem` (`.loop-item { min-height: 8rem; }`).

---

## 6. TYPOGRAPHY

Every text style in Section 02 is cataloged below with exact resolved values:

| Element / Class | Font Family | Size (Fluid / Fixed) | Weight | Line Height | Letter Spacing | Resolved Color (HEX) | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow Index** (`.home-index`) | `"Manrope", sans-serif` | `0.68rem` (10.88px) | 700 | `1` | `0.12em` | `#0528F2` | `uppercase` |
| **Section Heading** (`.home-section h2`)| `"Manrope", sans-serif` | `clamp(2.25rem, 3.34vw, 3rem)` | 650 | `1.08` | `-0.05em` | `#0D0D0D` | `none` |
| **Causality Step Body** (`.causality-step`)| `"Manrope", sans-serif` | `clamp(1.02rem, 1.15vw, 1.15rem)` | 400 | `1.45` | `-0.015em` | `#374151` | `none` |
| **Causality Highlight** (`.causality-text strong`)| `"Manrope", sans-serif` | Same as Step Body | 650 | `1.45` | `-0.015em` | `#0D0D0D` | `none` |
| **Causality Arrow** (`.causality-arrow`)| `"Manrope", sans-serif` | `0.95em` (relative) | 700 | Inherited | Inherited | `#0528F2` (opacity: 0.85) | `none` |
| **Payoff Title** (`.causality-payoff strong`)| `"Manrope", sans-serif` | `clamp(1.18rem, 1.35vw, 1.32rem)` | 700 | `1.3` | `-0.025em` | `#0D0D0D` | `none` |
| **Payoff Paragraph** (`.causality-payoff p`)| `"Manrope", sans-serif` | `clamp(0.925rem, 1.05vw, 1.02rem)` | 400 | `1.55` | `-0.01em` | `#374151` | `none` |
| **Loop Mono Tag (Inactive)** (`.loop-mono-tag`)| `monospace` / Primary | `0.62rem` (9.92px) | 700 | `normal` | `0.08em` | `#6B7280` | `none` |
| **Loop Mono Tag (Complete)** (`.is-complete .loop-mono-tag`)| `monospace` / Primary | `0.62rem` (9.92px) | 700 | `normal` | `0.08em` | `#374151` | `none` |
| **Loop Mono Tag (Active)** (`.is-active .loop-mono-tag`)| `monospace` / Primary | `0.62rem` (9.92px) | 700 | `normal` | `0.08em` | `#0528F2` | `none` |
| **Loop Card Title (Default)** (`.loop-item-content strong`)| `"Manrope", sans-serif` | `0.82rem` (13.12px) | 700 | `1.3` | `-0.01em` | `#0D0D0D` | `none` |
| **Loop Card Title (Active)** (`.is-active .loop-item-content strong`)| `"Manrope", sans-serif` | `0.82rem` (13.12px) | 700 | `1.3` | `-0.01em` | `#0528F2` | `none` |
| **Loop Card Description** (`.loop-item-content small`)| `"Manrope", sans-serif` | `0.7rem` (11.2px) | 400 | `normal` | `normal` | `#6B7280` | `none` |
| **Loop Detail Tag (Default)** (`.loop-detail-tag`)| `"Manrope", sans-serif` | `0.62rem` (9.92px) | 600 | `normal` | `normal` | `#6B7280` | `none` |
| **Loop Detail Tag (Active)** (`.is-active .loop-detail-tag`)| `"Manrope", sans-serif` | `0.62rem` (9.92px) | 600 | `normal` | `normal` | `#0528F2` | `none` |
| **Screen Reader Journey** (`.fo-sr-only`)| `"Manrope", sans-serif` | `1.0625rem` (17px) | 400 | `1.6` | `normal` | `#0D0D0D` | `none` |

---

## 7. INTERACTIONS AND ANIMATION

### 7.1 Interactive Element States

#### Causality Step Milestones (`.causality-step`)
- **Default State:**
  - `transform: none;`
  - Text color: `#374151`. Arrow color: `#0528F2` (opacity 0.85).
  - Node border: `#0528F2`. Node shadow: `0 0 0 3px rgba(5, 40, 242, 0.08)`.
- **Hover State (`:hover`):**
  - Entire row shifts right: `transform: translateX(4px);` via `180ms cubic-bezier(0.16, 1, 0.3, 1)`.
  - Arrow advances right: `transform: translateX(2px); color: #0540F2;` via `180ms ease`.
  - Node expands outer glow: `border-color: #0540F2; box-shadow: 0 0 0 5px rgba(5, 40, 242, 0.16);` via `180ms ease`.

#### Lifecycle Bus Cards (`.loop-item`)
- **Default / Inactive State:**
  - Background: `#FFFFFF`.
  - Border: `1px solid #E6EAF0; border-top: 3px solid #DDE3EA;`
  - Shadow: `box-shadow: 0 1px 2px rgb(11 16 32 / 0.04);`
  - Node ring: `width: 0.75rem; height: 0.75rem; border: 2px solid #9CA3AF; background: #FFFFFF;`
- **Hover State (`:hover`):**
  - `transform: translateY(-3px);`
  - `box-shadow: 0 4px 12px rgb(11 16 32 / 0.06);`
  - `border-top-color: #0528F2;`
- **Keyboard Focus State (`:focus-visible`):**
  - `transform: translateY(-3px);`
  - `box-shadow: 0 4px 12px rgb(11 16 32 / 0.06);`
  - `border-top-color: #0528F2;`
  - `outline: 2px solid #0528F2; outline-offset: 2px;`
- **Completed State (`.is-complete`, stations before current active):**
  - Top border: `border-top-color: #0D0D0D;`
  - Topline tag: `color: #374151;`
  - Topline status dot: `background: #0D0D0D;`
  - Center node: `background: #0D0D0D; border-color: #0D0D0D;`
- **Active State (`.is-active`, currently selected station):**
  - Top border: `border-top: 3px solid #0528F2;`
  - Elevation: `box-shadow: 0 6px 20px rgba(0, 34, 255, 0.12); transform: translateY(-3px);`
  - Topline tag: `color: #0528F2;`
  - Topline status dot: `background: #0528F2; box-shadow: 0 0 6px #0528F2;`
  - Center node: `width: 0.85rem; height: 0.85rem; background: #0528F2; border-color: #0528F2; box-shadow: 0 0 0 3px rgba(0, 34, 255, 0.25);`
  - Typography: Title and detail tag switch to `#0528F2`.

---

### 7.2 Entrance & Scroll Progression Sequence
- **Trigger:** `IntersectionObserver` observing `.business-loop` with `threshold: 0.35` (fires when 35% of the operating bus enters the viewport).
- **Execution:** Cycles sequentially from station 0 to station 5 with `index * 900ms` delays:
  - `0ms`: Station 0 (`BUSINESS ACTIVITY`) active -> Rail progress: `8.33%`
  - `900ms`: Station 1 (`TRANSACTION`) active -> Rail progress: `25.00%`
  - `1800ms`: Station 2 (`OPERATIONS`) active -> Rail progress: `41.66%`
  - `2700ms`: Station 3 (`FINANCE`) active -> Rail progress: `58.33%`
  - `3600ms`: Station 4 (`CASH`) active -> Rail progress: `75.00%`
  - `4500ms`: Station 5 (`DECISION`) active -> Rail progress: `91.66%`
- **Fill Rail & Pulse Animation:**
  - Transition: `transition: width 900ms cubic-bezier(0.65, 0, 0.35, 1);`
  - Pulse Dot: `transition: left 900ms cubic-bezier(0.65, 0, 0.35, 1);`
- **Manual User Interruption:**
  Any user interaction (`pointerenter`, `click`, or keyboard `focus`) immediately cancels pending timers via `timers.current.forEach(window.clearTimeout)` and locks manual selection.

---

### 7.3 Reduced-Motion Handling
Under `@media (prefers-reduced-motion: reduce)`:
- The React hook automatically jumps to final state (`setActive(5)`), sets `hasPlayed.current = true`, and cancels the `IntersectionObserver`.
- CSS transitions on rail fill, pulse dot, card transforms, and causality thread steps are set to `none !important`.
- Beacon dot pulse animation (`beacon-pulse`) is disabled (`animation: none`).

---

## 8. ICONS

### Code Implementation Analysis
In strict adherence to the code audit:
- **Icon Libraries (e.g. lucide-react):** `NONE USED IN THIS SECTION`.
- **Inline SVGs:** `NONE USED IN THIS SECTION`.
- Directional arrows in the Causality Thread are rendered via the unicode glyph **`→`** (`U+2192`, Rightwards Arrow).
- All timeline nodes and connector lines are rendered purely via CSS (`.causality-node`, `.business-flow-node`, `.business-flow-rail`).

---

### Vector Graphic Equivalents for Elementor Pro
For Elementor builders who prefer implementing SVG vector assets over raw unicode characters and CSS shapes, clean vector equivalents have been generated and packaged:

#### 1. Directional Arrow (`business-loop-arrow.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 12h14m-5-5 5 5-5 5" />
</svg>
```

#### 2. Dual-Ring Kinetic Node (`business-loop-node.svg`)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="9" stroke="#0528F2" stroke-width="2" fill="#FFFFFF" />
  <circle cx="12" cy="12" r="3" fill="#0528F2" />
</svg>
```

### Downloadable Icon Package
- **Archive Path:** `business-loop-icons.zip` (in workspace root)
- **Asset Directory:** `business-loop-assets/`
- **Files Included:**
  1. `business-loop-arrow.svg`
  2. `business-loop-node.svg`

---

## 9. ACCESSIBILITY

### Semantic Structure & Landmarks
- Container uses semantic `<section className="home-problem home-section">`.
- Heading hierarchy maintains semantic order: `<h2>Business doesn’t happen in modules.</h2>`.
- Interactive stations in the lifecycle bus use semantic `<button>` elements (not non-interactive `<div>`s).

### ARIA Attributes & Screen Reader Support
1. **Causality Thread:** Outer container declares `aria-label="Business causality progression"` to orient assistive software.
2. **Directional Glyphs:** Decorative arrows declare `aria-hidden="true"`, preventing screen readers from reading *"right arrow"* between terms.
3. **Nodes & Rails:** Decorative timeline circles and progress rails declare `aria-hidden="true"`.
4. **Current Active Station:** The currently selected station button dynamically receives `aria-current="step"`.
5. **Screen Reader Announcement:** A dedicated screen-reader-only paragraph is rendered at the base of the operating bus:
   ```html
   <p className="fo-sr-only">
     BUSINESS ACTIVITY, then TRANSACTION, then OPERATIONS, then FINANCE, then CASH, then DECISION.
   </p>
   ```
   This gives screen reader users an immediate, linear mental model of the entire 6-phase journey.

### Keyboard Navigation & Focus
- Every station button is fully reachable via standard keyboard Tab sequence.
- Focus visibility applies a high-contrast 2px solid `#0528F2` outline with a 2px offset:
  `outline: 2px solid var(--color-border-focus); outline-offset: 2px;`
- Focusing any card activates that station, instantly aligning the progress rail without requiring an enter/space press.

---

## 10. NOT FOUND IN CODE

In accordance with the code audit instructions, the following items were verified to be **NOT FOUND IN CODE**:

1. **Outbound / Anchor Links:**
   - `NOT FOUND IN CODE`. The entire section contains zero `<a>` tags. All interactive elements are JavaScript-driven `<button>` elements.
2. **Touch Swipe Gestures for Mobile Cards:**
   - `NOT FOUND IN CODE`. On mobile viewports (≤768px), the operating bus collapses into a vertical stack; horizontal swipe gestures (such as touch carousels) are not implemented.
3. **CSS Variable Definitions for `--motion-productive` and `--ease-standard`:**
   - In `src/homepage.css` line 24, `.home-index` declares `transition: all var(--motion-productive) var(--ease-standard);`. Neither variable is defined in `:root` in `src/index.css`. The browser falls back to initial transition values.
4. **Tablet Breakpoint Adjustments (768px–1024px):**
   - `NOT FOUND IN CODE`. Under `@media (max-width: 64rem)` (1024px), no overrides are provided for `.problem-grid` or `.business-loop`. The layout maintains its desktop 2-column and 6-card proportions until crossing below 768px (`48rem`).
5. **RTL (Right-to-Left) Styles:**
   - `NOT FOUND IN CODE`. No `[dir="rtl"]` styles exist. The progress rail fill originates from `left: 0` and the pulse animates along `left: var(--flow-progress)`.

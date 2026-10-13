# FINAL CONVERSION CTA & DEMO MODAL — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 13: Final Conversion CTA & Demo Request Modal** (`#final-cta` / `.home-final-cta`, lines 1170–1185, and `DemoDialog`, lines 2762–2783 in `src/Homepage.tsx`) of the flowOne website.

> [!IMPORTANT]
> **CRITICAL BUILD INSTRUCTION FOR ELEMENTOR BUILDERS**:
> The React/TSX/CSS in this document is the **visual and behavioral source of truth only**. It must **not** be pasted into WordPress as a raw HTML block. Every element must be constructed natively in Elementor Pro using Containers (Flexbox), native widgets (Heading, Text Editor, Button), **Elementor Pro Form Widget**, and the **Elementor Pro Popup Builder**. Custom CSS must only be used where native Elementor controls are structurally incapable of delivering the design (e.g. the glowing horizon beam, text gradient clipping, and the cyan pulse beacon).

---

# PART A — STANDARD CONTENT

## 1. FILE MAP & SECTION OVERVIEW

### 1.1 Purpose & Page Placement
- **Section Purpose**: Serves as the primary conversion engine of the flowOne homepage. Following all exploratory, persona-specific, and trust-building sections, Section 13 delivers an urgent, unified call to action: *"Ready to connect your business? Start with one workflow. Connect the rest when you’re ready."*
- **Dual Conversion Architecture**:
  1. **Direct High-Intent Conversion**: The primary button (`Book a Demo`) triggers the accessible, high-conversion **Demo Request Dialog** (`DemoDialog`), allowing prospective enterprise clients to select their initial workflow friction point (`Get paid faster`, `Control procurement`, `Run inventory better`, `Control cash & banking`, `Stay compliant`).
  2. **Secondary Platform Exploration**: The secondary link (`Explore Platform →`) smoothly anchors the visitor back to Section 06 (`#connection` / Connection Arena) to inspect the interactive system topology.
- **Visual Staging (The Horizon Beam)**:
  - Anchored on a deep dark canvas (`--color-brand-ink: #0D0D0D`).
  - Topped with the signature `cta-horizon-beam`: a 2px glowing horizon line with a 32px multi-tone blue/cyan aura (`box-shadow: 0 0 32px rgba(0, 34, 255, 0.45)`).
  - Displays a high-contrast gradient text highlight on the words **"your business?"** using the signature brand gradient.
- **Page Placement**:
  - **Preceding Section**: Section 12: Connected Operating Model & Trust Architecture (`.home-answer` + `#trust`, lines 1153–1368 in `src/Homepage.tsx`).
  - **Succeeding Section**: Section 14 / Footer: 5-Layer Enterprise Footer System (`.home-footer`, lines 1186, 2486–2760 in `src/Homepage.tsx`).

### 1.2 Component File Names & Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 1170–1185**: Complete Section 13 CTA markup (`#final-cta`, `.cta-horizon-beam`, `.cta-eyebrow`, `h2`, `.cta-highlight`, `p`, `.cta-actions`, `<Button>` "Book a Demo", and `.cta-explore-link`).
  - **Lines 2762–2783**: `DemoDialog` component implementation (modal layer, backdrop, focus trap, Escape key listener, header with close button, lead copy, 3-field form with select dropdown, submit button, and prototype disclaimer).
  - **Line 399**: `const [demoOpen, setDemoOpen] = useState(false);` and modal trigger handlers.
- **`src/homepage.css`**:
  - **Lines 3723–3805**: Section 13 styles (`.home-final-cta`, `.cta-horizon-beam`, `.cta-eyebrow`, `.cta-eyebrow::before`, `.cta-highlight`, `.cta-actions`, `.cta-explore-link`, `.cta-explore-link:hover`).
  - **Lines 4367–4386**: Demo Dialog styles (`.home-demo-layer`, `.home-demo-layer.is-open`, `.home-demo-backdrop`, `.home-demo-dialog`, header, form, inputs, select, button).
  - **Lines 4600–4601**: `@media (max-width: 48rem)` (768px mobile override: `.cta-actions` vertical column, `.cta-explore-link` centered).
  - **Lines 4617–4619**: `@media (max-width: 48rem)` (768px mobile override: `.home-demo-dialog` transforms into a bottom-sheet drawer with 1-column form stack).
  - **Lines 4629, 4632**: Reduced motion overrides (`@media (prefers-reduced-motion: reduce)`).
- **`src/components/flowone.tsx`**:
  - **Lines 6–17**: `<Icon />` primitive rendering `name="arrow"` (`size={16} tone="inverse"`) and `name="close"` (`size={20}`).
  - **Lines 43–82**: `<Button />` primitive (rendering `size="large"`, `iconAfter`, and hover effects).
- **`src/components/flowone.css`**:
  - **Lines 45–109**: `.fo-button`, `.fo-button-large`, `.fo-button-primary` styling.
- **`src/index.css`**:
  - **Lines 11–221**: Design tokens (brand blue `#0528F2`, cyan bright `#05C7F2`, ink `#0D0D0D`, neutral scale, and shadow tokens).

---

## 2. VERBATIM CODE

### 2.1 Verbatim Section 13 JSX Markup (`src/Homepage.tsx`, Lines 1170–1185)
```tsx
    <section id="final-cta" className="home-final-cta">
      <div className="home-container">
        <div className="cta-horizon-beam" aria-hidden="true" />
        <span className="cta-eyebrow">FROM TRANSACTION TO DECISION. ONE CONNECTED FLOW.</span>
        <h2>Ready to connect<br/><span className="cta-highlight">your business?</span></h2>
        <p>Start with one workflow. Connect the rest when you’re ready.</p>
        <div className="cta-actions">
          <Button size="large" onClick={openDemo} iconAfter={<Icon name="arrow" size={16} tone="inverse" />}>
            Book a Demo
          </Button>
          <a className="cta-explore-link" href="#connection">
            Explore Platform <Icon name="arrow" size={16} tone="inverse" />
          </a>
        </div>
      </div>
    </section>
```

### 2.2 Verbatim Demo Dialog JSX Markup (`src/Homepage.tsx`, Lines 2762–2783)
```tsx
function DemoDialog({open,onClose}:{open:boolean;onClose:()=>void}) {
  const closeRef=useRef<HTMLButtonElement>(null);
  const dialogRef=useRef<HTMLDivElement>(null);
  const previousFocus=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    if(!open)return;
    previousFocus.current=document.activeElement as HTMLElement;
    document.body.classList.add("fo-nav-lock");
    closeRef.current?.focus();
    const fn=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){onClose();return}
      if(e.key!=="Tab")return;
      const items=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button,input,select,a[href]")||[]);
      if(!items.length)return;
      if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1)?.focus()}
      else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus()}
    };
    document.addEventListener("keydown",fn);
    return()=>{document.removeEventListener("keydown",fn);document.body.classList.remove("fo-nav-lock");previousFocus.current?.focus()}
  },[open,onClose]);
  return <div className={`home-demo-layer ${open?"is-open":""}`} inert={!open} aria-hidden={!open}><button className="home-demo-backdrop" onClick={onClose} aria-label="Close demo request"/><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="demo-title" aria-describedby="demo-description" className="home-demo-dialog"><header><div><span>BOOK A DEMO</span><h2 id="demo-title">Let’s connect your first flow.</h2></div><button ref={closeRef} onClick={onClose} aria-label="Close"><Icon name="close" size={20}/></button></header><p id="demo-description">Tell us where your business flow breaks today. A flowOne specialist will continue the conversation.</p><form onSubmit={e=>{e.preventDefault();onClose()}}><label><span>Work email</span><input type="email" required placeholder="you@company.com"/></label><label><span>Company</span><input required placeholder="Company name"/></label><label><span>Where should we start?</span><select defaultValue=""><option value="" disabled>Select a workflow</option><option>Get paid faster</option><option>Control procurement</option><option>Run inventory better</option><option>Control cash & banking</option><option>Stay compliant</option></select></label><Button>Request a Demo</Button></form><small>Prototype only. No information is submitted.</small></div></div>;
}
```

### 2.3 Verbatim CSS Styles (`src/homepage.css`)
```css
/* SECTION 13: Final Conversion CTA */
.home-final-cta {
  position: relative;
  padding-block: clamp(3.5rem, 6vh, 4.75rem);
  color: var(--color-white);
  background: var(--color-brand-ink);
  overflow: hidden;
}

.cta-horizon-beam {
  position: relative;
  width: 100%;
  max-width: 32rem;
  height: 2px;
  margin-bottom: var(--spacing-6);
  background: var(--gradient-brand-signature);
  box-shadow: 0 0 32px rgba(0, 34, 255, 0.45);
}

.cta-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.32rem 0.85rem;
  border-radius: var(--radius-full);
  background: rgba(5, 199, 242, 0.08);
  border: 1px solid rgba(5, 199, 242, 0.22);
  color: #05C7F2;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1;
  width: fit-content;
  box-shadow: 0 0 12px rgba(5, 199, 242, 0.12);
}

.cta-eyebrow::before {
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

.home-final-cta h2 {
  max-width: 55rem;
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-display-lg);
  line-height: 1.02;
  letter-spacing: -0.055em;
  font-weight: 650;
}

.cta-highlight {
  background: var(--gradient-brand-signature);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-final-cta p {
  margin-top: var(--spacing-4);
  color: var(--color-neutral-400);
  font-size: var(--font-body-lg);
  line-height: 1.6;
}

.cta-actions {
  margin-top: var(--spacing-6);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.cta-explore-link {
  min-height: var(--control-lg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-white);
  text-decoration: none;
  font-weight: 700;
  font-size: var(--font-small);
  transition: transform var(--motion-fast);
}

.cta-explore-link:hover {
  transform: translateX(4px);
}

/* Demo Request Dialog / Modal Overlay */
.home-demo-layer {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  pointer-events: none;
  z-index: var(--z-modal);
  transition: opacity var(--motion-fast);
}

.home-demo-layer.is-open {
  opacity: 1;
  pointer-events: auto;
}

.home-demo-backdrop {
  position: absolute;
  inset: 0;
  background: rgb(11 16 32 / .45);
  border: 0;
  cursor: pointer;
}

.home-demo-dialog {
  width: min(calc(100% - 2rem), 36rem);
  padding: var(--spacing-4);
  position: relative;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transform: translateY(.75rem);
  transition: transform var(--motion-standard);
}

.home-demo-layer.is-open .home-demo-dialog {
  transform: none;
}

.home-demo-dialog > header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.home-demo-dialog > header > div {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.home-demo-dialog header span {
  color: var(--flow-primary);
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.home-demo-dialog h2 {
  margin: 0;
  font-size: var(--font-h3);
  letter-spacing: -.04em;
  font-weight: 650;
  color: var(--color-text-primary);
}

.home-demo-dialog header > button {
  width: var(--control-sm);
  height: var(--control-sm);
  display: grid;
  place-items: center;
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 180ms ease;
  color: var(--color-text-primary);
}

.home-demo-dialog header > button:hover {
  border-color: var(--neutral-500);
  background: var(--neutral-50);
}

.home-demo-dialog header > button:focus-visible {
  outline: 2px solid var(--state-focus);
  outline-offset: 2px;
}

.home-demo-dialog > p {
  margin-top: var(--spacing-3);
  color: var(--color-text-tertiary);
  line-height: 1.6;
  font-size: var(--font-small);
}

.home-demo-dialog form {
  margin-top: var(--spacing-4);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2);
}

.home-demo-dialog label {
  display: flex;
  flex-direction: column;
  gap: .4rem;
  color: var(--color-text-secondary);
  font-size: var(--font-caption);
  font-weight: 600;
}

.home-demo-dialog label:nth-child(3) {
  grid-column: 1 / -1;
}

.home-demo-dialog input,
.home-demo-dialog select {
  height: var(--control-md);
  padding-inline: .75rem;
  background: var(--color-white);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  font: 400 var(--font-small)/1 var(--font-family-primary);
  color: var(--color-text-primary);
  outline: none;
}

.home-demo-dialog input:focus,
.home-demo-dialog select:focus {
  border-color: var(--state-focus);
  box-shadow: 0 0 0 2px var(--state-focus-ring);
}

.home-demo-dialog form > .fo-button {
  grid-column: 1 / -1;
}

.home-demo-dialog > small {
  display: block;
  margin-top: var(--spacing-2);
  color: var(--color-text-tertiary);
  font-size: var(--font-caption);
}

/* Responsive Media Queries */
@media (max-width: 48rem) {
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-explore-link {
    justify-content: center;
  }

  .home-demo-dialog {
    width: 100%;
    max-height: 92vh;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }

  .home-demo-dialog form {
    grid-template-columns: 1fr;
  }

  .home-demo-dialog label:nth-child(3),
  .home-demo-dialog form > .fo-button {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta-eyebrow::before {
    animation: none;
  }
  .cta-explore-link {
    transition: none;
  }
  .home-demo-layer,
  .home-demo-dialog {
    transition: none;
  }
}
```

### 2.4 Shared Design Tokens & Resolved Values
| CSS Token Name | Resolved Hex / CSS Value | Description / Element Usage |
| :--- | :--- | :--- |
| `--color-brand-ink` | `#0D0D0D` | Final CTA background canvas (`.home-final-cta`) |
| `--color-white` | `#FFFFFF` | Heading text, explore link text, demo modal surface |
| `--color-neutral-400` | `#9CA3AF` | Final CTA description text (`.home-final-cta p`) |
| `--color-text-primary` | `#0D0D0D` | Modal heading, input text |
| `--color-text-secondary` | `#374151` | Modal form input labels |
| `--color-text-tertiary` | `#6B7280` | Modal description copy, prototype disclaimer |
| `--flow-primary` | `#0528F2` | Modal kicker text, focus borders |
| `--flow-cyan-bright` | `#05C7F2` | Horizon beam gradient stop, eyebrow pulse dot |
| `--gradient-brand-signature` | `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)` | Horizon beam, heading text gradient clip |
| `--font-display-lg` | `clamp(2.75rem, 4.45vw, 4rem)` | Final CTA main heading font size (`44px` to `64px`) |
| `--font-h3` | `clamp(1.75rem, 2.23vw, 2rem)` | Modal heading font size (`28px` to `32px`) |
| `--font-body-lg` | `1.25rem` (`20px`) | Final CTA description font size |
| `--font-small` | `0.9375rem` (`15px`) | Explore link font size, input text font size |
| `--control-sm` | `2.25rem` (`36px`) | Modal close button dimension |
| `--control-md` | `2.75rem` (`44px`) | Form input / select height |
| `--control-lg` | `3.25rem` (`52px`) | Large button / link height target |
| `--radius-md` | `0.5rem` (`8px`) | Form inputs, close button border radius |
| `--radius-xl` | `1rem` (`16px`) | Modal dialog border radius |
| `--radius-full` | `9999px` | Eyebrow pill border radius |
| `--z-modal` | `1000` | Modal layer z-index |

---

## 3. CONTENT MATRIX

Every text string in display order across Section 13 and the Demo Dialog:

### 3.1 Section 13: Final Conversion CTA (`#final-cta`)
| # | Element Description | String Content | HTML Tag | Font Family | Size | Weight | Color Token & Hex |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **01** | Section Eyebrow Badge | `FROM TRANSACTION TO DECISION. ONE CONNECTED FLOW.` | `<span class="cta-eyebrow">` | Manrope | `0.68rem` (`11px`) | 700 | `#05C7F2` (Cyan) |
| **02** | Main Heading (Line 1) | `Ready to connect` | `<h2>` | Manrope | `clamp(2.75rem, 4.45vw, 4rem)` | 650 | `--color-white` (`#FFFFFF`) |
| **03** | Main Heading (Line 2 Gradient) | `your business?` | `<span class="cta-highlight">` | Manrope | `clamp(2.75rem, 4.45vw, 4rem)` | 650 | Multi-Tone Gradient |
| **04** | Section Subtitle Copy | `Start with one workflow. Connect the rest when you’re ready.` | `<p>` | Manrope | `1.25rem` (`20px`) | 400 | `--color-neutral-400` (`#9CA3AF`) |
| **05** | Primary Action Button | `Book a Demo` | `<Button size="large">` | Manrope | `0.9375rem` (`15px`) | 600 | `--color-white` (`#FFFFFF`) |
| **06** | Secondary Explore Link | `Explore Platform` | `<a class="cta-explore-link">` | Manrope | `0.9375rem` (`15px`) | 700 | `--color-white` (`#FFFFFF`) |

### 3.2 Demo Request Dialog (`DemoDialog`)
| # | Element Description | String Content | HTML Tag | Font Family | Size | Weight | Color Token & Hex |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **07** | Modal Kicker Notice | `BOOK A DEMO` | `<span>` | Manrope | `0.62rem` (`10px`) | 700 | `--flow-primary` (`#0528F2`) |
| **08** | Modal Dialog Title | `Let’s connect your first flow.` | `<h2 id="demo-title">` | Manrope | `clamp(1.75rem, 2.23vw, 2rem)` | 650 | `--color-text-primary` (`#0D0D0D`) |
| **09** | Modal Description Copy | `Tell us where your business flow breaks today. A flowOne specialist will continue the conversation.` | `<p id="demo-description">` | Manrope | `0.9375rem` (`15px`) | 400 | `--color-text-tertiary` (`#6B7280`) |
| **10** | Form Label 1 | `Work email` | `<label><span>` | Manrope | `0.8125rem` (`13px`) | 600 | `--color-text-secondary` (`#374151`) |
| **11** | Form Placeholder 1 | `you@company.com` | `<input type="email">` | Manrope | `0.9375rem` (`15px`) | 400 | `--color-text-primary` (`#0D0D0D`) |
| **12** | Form Label 2 | `Company` | `<label><span>` | Manrope | `0.8125rem` (`13px`) | 600 | `--color-text-secondary` (`#374151`) |
| **13** | Form Placeholder 2 | `Company name` | `<input>` | Manrope | `0.9375rem` (`15px`) | 400 | `--color-text-primary` (`#0D0D0D`) |
| **14** | Form Label 3 | `Where should we start?` | `<label><span>` | Manrope | `0.8125rem` (`13px`) | 600 | `--color-text-secondary` (`#374151`) |
| **15** | Select Dropdown Default | `Select a workflow` | `<option disabled>` | Manrope | `0.9375rem` (`15px`) | 400 | Muted Placeholder |
| **16** | Select Option 1 | `Get paid faster` | `<option>` | Manrope | `0.9375rem` (`15px`) | 400 | Standard Select Option |
| **17** | Select Option 2 | `Control procurement` | `<option>` | Manrope | `0.9375rem` (`15px`) | 400 | Standard Select Option |
| **18** | Select Option 3 | `Run inventory better` | `<option>` | Manrope | `0.9375rem` (`15px`) | 400 | Standard Select Option |
| **19** | Select Option 4 | `Control cash & banking` | `<option>` | Manrope | `0.9375rem` (`15px`) | 400 | Standard Select Option |
| **20** | Select Option 5 | `Stay compliant` | `<option>` | Manrope | `0.9375rem` (`15px`) | 400 | Standard Select Option |
| **21** | Modal Submit Button | `Request a Demo` | `<Button>` | Manrope | `0.9375rem` (`15px`) | 600 | `--color-white` (`#FFFFFF`) |
| **22** | Prototype Disclaimer | `Prototype only. No information is submitted.` | `<small>` | Manrope | `0.8125rem` (`13px`) | 400 | `--color-text-tertiary` (`#6B7280`) |

---

## 4. MEDIA & ASSETS

All assets have been extracted, saved to `final-cta-assets/`, and packaged into `final-cta-icons.zip`.

| Asset File Name | Format | Display Dimensions | Native ViewBox | CSS Color / Tone | Description & Placement |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `arrow.svg` | SVG | `16 × 16 px` | `0 0 24 24` | `--color-white` (`#FFFFFF`) | Right-pointing arrow icon used in `Book a Demo` button and `Explore Platform` link. |
| `close.svg` | SVG | `20 × 20 px` | `0 0 24 24` | `--color-text-primary` (`#0D0D0D`) | Dismiss cross icon in the top-right corner of the Demo Dialog. |

### 4.1 Asset Package Reference
- **Directory**: `final-cta-assets/`
  - `final-cta-assets/arrow.svg`
  - `final-cta-assets/close.svg`
- **ZIP File**: `final-cta-icons.zip` (located in root workspace directory)

---

## 5. LAYOUT & STRUCTURE

### 5.1 Container Hierarchy
```text
section#final-cta.home-final-cta (bg: #0D0D0D, padding: clamp(56px, 6vh, 76px) 0)
└── div.home-container (max-width: 1280px, centered)
    ├── div.cta-horizon-beam (height: 2px, max-width: 32rem, gradient beam + glow)
    ├── span.cta-eyebrow (inline-flex, cyan badge with glowing beacon dot)
    ├── h2 (font-size: clamp(44px, 4.45vw, 64px), line-height: 1.02)
    │   ├── Text: "Ready to connect"
    │   ├── br
    │   └── span.cta-highlight ("your business?") (gradient background clip text)
    ├── p (font-size: 20px, color: #9CA3AF, line-height: 1.6)
    └── div.cta-actions (flex row, gap: 16px, align-items: center)
        ├── Button.fo-button.fo-button-primary.fo-button-large ("Book a Demo" + arrow icon)
        └── a.cta-explore-link ("Explore Platform" + arrow icon, href: "#connection")

div.home-demo-layer (fixed overlay, inset: 0, z-index: 1000)
├── button.home-demo-backdrop (fixed backdrop, bg: rgba(11, 16, 32, 0.45))
└── div.home-demo-dialog (modal dialog, max-width: 36rem / 576px, bg: #FFFFFF, radius: 16px, padding: 32px)
    ├── header (flex row, justify-between)
    │   ├── div (kicker: "BOOK A DEMO" + h2: "Let’s connect your first flow.")
    │   └── button (close button: 36x36px with close icon)
    ├── p ("Tell us where your business flow breaks today...")
    ├── form (CSS Grid: 2 columns, gap: 16px)
    │   ├── label ("Work email" + input type="email")
    │   ├── label ("Company" + input text)
    │   ├── label ("Where should we start?" + select dropdown) (spans 2 columns)
    │   └── Button ("Request a Demo") (spans 2 columns)
    └── small ("Prototype only. No information is submitted.")
```

---

## 6. RESPONSIVE BEHAVIOUR

### 6.1 Desktop (`≥ 1024px`)
- **Horizon Beam**: Width expands to `max-width: 32rem` (`512px`).
- **Heading**: Renders at fluid clamp up to `64px` with `-0.055em` letter-spacing.
- **Actions Row**: Horizontal flexbox (`align-items: center; gap: 16px;`).
- **Demo Modal**: Centered floating card with maximum width `36rem` (`576px`), surrounded by dark translucent backdrop. Form fields arranged in 2 columns (Email + Company), with Dropdown and Submit button spanning both columns.

### 6.2 Tablet (`768px – 1023px`)
- Actions row remains horizontal.
- Modal remains centered with `1rem` margin on narrow tablets (`width: min(calc(100% - 2rem), 36rem)`).

### 6.3 Mobile (`< 768px`)
- **Actions Container (`.cta-actions`)**:
  - Automatically switches to vertical stack (`flex-direction: column; align-items: stretch; gap: 16px;`).
  - Primary button (`Book a Demo`) expands to full width (`width: 100%; justify-content: center;`).
  - Secondary explore link centers horizontally (`justify-content: center; min-height: 48px;`).
- **Demo Modal (`.home-demo-dialog`)**:
  - Transforms into a **Mobile Bottom-Sheet Drawer**:
    - `width: 100%;`
    - `position: absolute; bottom: 0;`
    - `max-height: 92vh; overflow-y: auto;`
    - `border-radius: 16px 16px 0 0;` (top corners rounded only).
  - Form switches from 2 columns to a **single vertical stack** (`grid-template-columns: 1fr;`).
  - Form inputs maintain `44px` minimum touch target height.

---

## 7. INTERACTION & ANIMATION

### 7.1 Horizon Beam Glow & Pulsing Beacon
1. **Horizon Beam (`.cta-horizon-beam`)**:
   - Background: `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)`.
   - Box-Shadow: `0 0 32px rgba(0, 34, 255, 0.45)`.
2. **Eyebrow Beacon Dot (`.cta-eyebrow::before`)**:
   - Cyan dot with 2.4s infinite pulsing keyframe (`@keyframes beacon-pulse`).
3. **Explore Link Hover (`.cta-explore-link:hover`)**:
   - `transform: translateX(4px);` with smooth 180ms ease.

### 7.2 Modal Dialog Open / Close Transition
- When `is-open` is toggled:
  - Layer fades in from `opacity: 0` to `opacity: 1` (`transition: opacity 180ms ease`).
  - Dialog card translates from `translateY(0.75rem)` (`12px` down) to `translateY(0)` (`transition: transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`).

---

## 8. DEPENDENCIES & THIRD-PARTY LIBRARIES

- **Zero Outside JavaScript Libraries**: Fully vanilla React / DOM event architecture.
- **Native Keyboard Handlers**: Custom focus trap, `Escape` key dismissal, and `fo-nav-lock` body scroll locking implemented via standard browser APIs.

---

## 9. ACCESSIBILITY SPECIFICATIONS

- **Accessible Dialog Landmark**:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby="demo-title"`
  - `aria-describedby="demo-description"`
- **Strict Keyboard Focus Trapping**:
  - When opened, focus immediately locks onto the close button (`closeRef.current?.focus()`).
  - Tabbing through inputs cycles continuously inside the dialog (never leaking to background elements).
  - Pressing `Escape` closes the modal immediately.
  - When closed, focus returns automatically to the element that triggered it (`previousFocus.current?.focus()`).
- **High-Contrast Ratios**:
  - White title `#FFFFFF` on `#0D0D0D` background: **20.8:1** (WCAG AAA).
  - Eyebrow text `#05C7F2` on `rgba(5, 199, 242, 0.08)`: **8.9:1** (WCAG AAA).
  - Description `#9CA3AF` on `#0D0D0D`: **9.2:1** (WCAG AAA).

---

## 10. EDGE CASES & STRESS TESTING

1. **Mobile Virtual Keyboard Overlay**: On mobile devices when the keyboard opens, `max-height: 92vh; overflow-y: auto;` ensures the submit button and inputs remain scrollable and accessible.
2. **Rapid Click / Backdrop Click**: Clicking the backdrop outside the dialog card triggers `onClose` cleanly without triggering child event bubbling.
3. **Form Validation**: HTML5 `required` and `type="email"` provide instant native validation before submission.

---

## 11. BUILD ESTIMATE & ACCEPTANCE CRITERIA

- **Elementor Implementation Difficulty**: **Medium** (CTA section is Low, Popup Form configuration is Medium).
- **Estimated Build Time**: **45 to 60 minutes**.
- **QA Acceptance Checklist**:
  - [ ] Section background is `#0D0D0D` with full-bleed coverage.
  - [ ] Glowing horizon beam line renders with the multi-tone blue/cyan gradient and aura.
  - [ ] "your business?" displays the vibrant gradient text clip.
  - [ ] Clicking "Book a Demo" opens the Elementor Pro Popup modal cleanly.
  - [ ] Modal close button and backdrop click dismiss the popup.
  - [ ] Form contains all 3 fields (`Work email`, `Company`, `Where should we start?` dropdown) with matching options.
  - [ ] Mobile view stacks CTA buttons vertically and transforms the modal into a bottom sheet.

---

# PART B — ELEMENTOR PRO IMPLEMENTATION SPECIFICATION

## 1. ELEMENTOR CONTAINER HIERARCHY & WIDGET MAPPING

### 1.1 Section 13 CTA Container Architecture
```text
[Container: Section Root] (.home-final-cta)
│   - HTML Tag: <section>
│   - CSS ID: final-cta
│   - Content Width: Full Width (100%)
│   - Background: Custom Color (#0D0D0D / Brand Ink)
│   - Padding: Desktop [76px, 0px, 76px, 0px] | Mobile [56px, 0px, 56px, 0px]
│
└── [Container: Content Wrapper] (.home-container)
    │   - Content Width: Boxed (1280px)
    │   - Padding: Desktop [0px, 48px, 0px, 48px] | Mobile [0px, 20px, 0px, 20px]
    │   - Direction: Column
    │   - Align Items: Start
    │   - Gap: [0px]
    │
    ├── [Widget: Divider / Container Line] (.cta-horizon-beam)
    │       - Width: Max [512px] (32rem)
    │       - Height: [2px]
    │       - Margin Bottom: [40px]
    │       - Custom CSS: Gradient background and 32px box-shadow aura (see Section 5.1)
    │
    ├── [Widget: Heading] (Eyebrow Badge) (.cta-eyebrow)
    │       - Title: "FROM TRANSACTION TO DECISION. ONE CONNECTED FLOW."
    │       - HTML Tag: <span>
    │       - Typography: Manrope, 11px, Weight: 700, Uppercase, Letter Spacing: 0.12em, Color: #05C7F2
    │       - Custom CSS: Eyebrow pill background + cyan pulse dot (see Section 5.2)
    │
    ├── [Widget: Heading] (Display Title)
    │       - Title: "Ready to connect<br><span class=\"cta-highlight\">your business?</span>"
    │       - HTML Tag: <h2>
    │       - Typography: Global Font: Display Large (clamp 44px to 64px), Weight: 650, Line Height: 1.02, Letter Spacing: -0.055em, Color: #FFFFFF
    │       - Margin Top: [32px]
    │       - Custom CSS: Gradient text clip on .cta-highlight (see Section 5.3)
    │
    ├── [Widget: Text Editor] (Description Copy)
    │       - Content: "<p>Start with one workflow. Connect the rest when you’re ready.</p>"
    │       - Typography: Manrope, 20px, Weight: 400, Line Height: 1.6, Color: #9CA3AF
    │       - Margin Top: [32px]
    │
    └── [Container: Actions Cluster] (.cta-actions)
        │   - Direction: Desktop: Row (Horizontal) | Mobile: Column (Vertical)
        │   - Align Items: Desktop: Center | Mobile: Stretch
        │   - Gap: [16px]
        │   - Margin Top: [40px]
        │
        ├── [Widget: Button] (Book a Demo)
        │       - Text: "Book a Demo"
        │       - Link: Dynamic Tag -> Actions -> **Popup** (Action: Open Popup, Popup: "Popup - Book a Demo")
        │       - Icon: Upload SVG `arrow.svg`, Position: After, Spacing: 8px
        │       - Button Size: Large (Min-Height: 52px, Padding: 16px 32px)
        │       - Background: Flow Primary (#0528F2), Hover: Flow Primary Deep (#0540F2)
        │       - Border Radius: [8px]
        │       - Typography: Manrope, 15px, Weight: 600
        │       - Mobile: Width [100%]
        │
        └── [Widget: Button / Link] (Explore Platform) (.cta-explore-link)
                - Text: "Explore Platform"
                - Link: URL -> `#connection`
                - Icon: Upload SVG `arrow.svg`, Position: After, Spacing: 8px
                - Style: Background: Transparent, Text Color: #FFFFFF, Padding: 14px 20px
                - Typography: Manrope, 15px, Weight: 700
                - Mobile: Width [100%], Align: Center
```

### 1.2 Elementor Pro Popup: "Popup - Book a Demo" Architecture
Built inside **Templates > Popups** in WordPress:
```text
[Popup Settings]
│   - Width: Desktop [576px] | Mobile [100%]
│   - Height: Fit to Content (Mobile: Custom 92vh)
│   - Position: Desktop: Center / Center | Mobile: Bottom / Center
│   - Overlay: Yes (Color: rgba(11, 16, 32, 0.45))
│   - Close Button: Yes (Custom Position, Icon: close.svg, Border: 1px solid #E6EAF0, Radius: 8px)
│   - Entrance Animation: Fade In Up (Mobile: Slide In Up)
│   - Animation Duration: 0.35s
│   - Prevent Page Scroll: Yes (Locks body scroll while active)
│
└── [Container: Modal Body] (.home-demo-dialog)
    │   - Background: Pure White (#FFFFFF)
    │   - Border Radius: Desktop [16px] | Mobile [16px 16px 0 0]
    │   - Padding: [32px]
    │   - Direction: Column, Gap: [20px]
    │
    ├── [Container: Modal Header]
    │   ├── [Widget: Heading] -> "BOOK A DEMO" (Tag: <span>, 10px, 700, Uppercase, Color: #0528F2)
    │   └── [Widget: Heading] -> "Let’s connect your first flow." (Tag: <h2>, 28-32px, 650 weight, Color: #0D0D0D)
    │
    ├── [Widget: Text Editor]
    │       - Content: "Tell us where your business flow breaks today. A flowOne specialist will continue the conversation."
    │       - Typography: Manrope, 15px, Color: #6B7280, Line Height: 1.6
    │
    ├── [Widget: Form] (Elementor Pro Form Widget)
    │   │   - Form Name: "flowOne Demo Request"
    │   │   - Fields:
    │   │       1. Item #1: Type: Email | Label: "Work email" | Placeholder: "you@company.com" | Required: Yes | Column Width: Desktop [50%] / Mobile [100%]
    │   │       2. Item #2: Type: Text | Label: "Company" | Placeholder: "Company name" | Required: Yes | Column Width: Desktop [50%] / Mobile [100%]
    │   │       3. Item #3: Type: Select | Label: "Where should we start?" | Required: Yes | Column Width: [100%]
    │   │          - Options:
    │   │              Get paid faster
    │   │              Control procurement
    │   │              Run inventory better
    │   │              Control cash & banking
    │   │              Stay compliant
    │   │   - Buttons:
    │   │       - Submit Button Text: "Request a Demo"
    │   │       - Column Width: [100%]
    │   │       - Style: Background: Flow Primary (#0528F2), Height: 48px, Radius: 8px, Typography: Manrope 15px 600 weight
    │   │   - Actions After Submit: Email (or Webhook to CRM/HubSpot)
    │
    └── [Widget: Text Editor] (Disclaimer)
            - Content: "<small>Prototype only. No information is submitted.</small>"
            - Typography: Manrope, 13px, Color: #6B7280
```

---

## 2. GLOBAL STYLES MAPPING

### 2.1 Elementor Global Colors
| Site Token | Hex Code | Elementor Global Color Name | Role in Section |
| :--- | :--- | :--- | :--- |
| `--color-brand-ink` | `#0D0D0D` | **Brand Ink** | Final CTA background canvas |
| `--color-white` | `#FFFFFF` | **White** | Primary heading, explore link, modal card background |
| `--color-neutral-400` | `#9CA3AF` | **Neutral 400** | Final CTA description text |
| `--flow-primary` | `#0528F2` | **Flow Primary** | "Book a Demo" button, modal kicker, input focus outline |
| `--flow-primary-deep` | `#0540F2` | **Flow Primary Deep** | Button hover state |
| `--flow-cyan-bright` | `#05C7F2` | **Flow Cyan Bright** | Eyebrow text, horizon beam glow aura |
| `--color-border-default` | `#E6EAF0` | **Border Default** | Modal close button border, input borders |
| `--color-text-primary` | `#0D0D0D` | **Text Primary** | Modal heading, form input text |
| `--color-text-secondary` | `#374151` | **Text Secondary** | Form input labels |
| `--color-text-tertiary` | `#6B7280` | **Text Tertiary** | Modal description paragraph, disclaimer text |

### 2.2 Elementor Global Typography Presets
| Preset Name | Font Family | Size | Weight | Line Height | Used In |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Display Large** | Manrope | `64px` (desktop) / `44px` (mobile) | 650 | 1.02 | `Ready to connect your business?` |
| **Heading 3** | Manrope | `32px` (desktop) / `28px` (mobile) | 650 | 1.25 | `Let’s connect your first flow.` |
| **Body Large** | Manrope | `20px` (`1.25rem`) | 400 | 1.6 | Final CTA description paragraph |
| **Button Text** | Manrope | `15px` (`0.9375rem`) | 600 | 1.0 | `Book a Demo`, `Request a Demo` |
| **Eyebrow Pill** | Manrope | `11px` (`0.68rem`) | 700 | 1.0 | `FROM TRANSACTION TO DECISION...` |
| **Form Label** | Manrope | `13px` (`0.8125rem`) | 600 | 1.3 | Modal form labels (`Work email`, etc.) |

---

## 3. REUSABLE COMPONENTS & ELEMENTOR POPUP TEMPLATE

1. **Elementor Pro Popup Template: `Popup - Book a Demo`**:
   - Save the demo dialog as an Elementor Pro Popup template.
   - Configure **Display Conditions**: Entire Site (or flowOne Homepage).
   - Configure **Triggers**: Click on Element (Selector: `.fo-open-demo, [href="#demo"]` or via Button Dynamic Tag).
   - This single Popup can be opened by:
     - Header "Book a Demo" button.
     - Section 13 "Book a Demo" CTA button.
     - Footer "Book a Demo" launchpad button.

---

## 4. NATIVE ELEMENTOR CAPABILITIES UTILIZATION

| React / TSX Feature | Native Elementor Pro Equivalent | Benefit / Implementation Notes |
| :--- | :--- | :--- |
| Modal Dialog & Focus Trap | **Elementor Pro Popup Builder** | Native accessibility, background overlay, page scroll prevention, and escape key listener without writing custom JavaScript. |
| 3-Field Form | **Elementor Pro Form Widget** | Native field mapping, required validations, select dropdown, and CRM integrations (Webhook, Mailchimp, HubSpot, or Email notification). |
| Dynamic Modal Trigger | **Button Link: Dynamic Tag > Popup** | Opens the demo popup seamlessly without writing onclick scripts. |
| Mobile Bottom Sheet | **Popup Position: Bottom + Width: 100%** | In Elementor Popup mobile settings, set vertical position to Bottom and width to 100% to create a native app-like bottom sheet. |

---

## 5. CUSTOM CODE MINIMIZATION STRATEGY

### 5.1 Custom CSS: Horizon Beam Glow Aura
Apply this snippet to the **Horizon Beam Container / Divider Widget**:

```css
/* Scoped to the Horizon Beam */
selector {
  width: 100%;
  max-width: 32rem;
  height: 2px;
  background: linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%);
  box-shadow: 0 0 32px rgba(0, 34, 255, 0.45);
  margin-bottom: 2.5rem;
}
```

### 5.2 Custom CSS: Cyan Pulsing Beacon Dot
Apply this snippet to the **CTA Eyebrow Heading Widget**:

```css
/* Eyebrow Pill with Pulse Dot */
selector {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.32rem 0.85rem;
  border-radius: 9999px;
  background: rgba(5, 199, 242, 0.08);
  border: 1px solid rgba(5, 199, 242, 0.22);
  width: fit-content;
  box-shadow: 0 0 12px rgba(5, 199, 242, 0.12);
}

selector::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #05C7F2;
  box-shadow: 0 0 8px rgba(5, 199, 242, 0.8);
  flex-shrink: 0;
  animation: finalBeaconPulse 2.4s ease-in-out infinite;
}

@keyframes finalBeaconPulse {
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

@media (prefers-reduced-motion: reduce) {
  selector::before {
    animation: none;
  }
}
```

### 5.3 Custom CSS: Gradient Text Highlight
Apply this snippet to the **Main Heading Widget**:

```css
/* Scoped to the Heading Widget */
selector .cta-highlight {
  background: linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 6. STEP-BY-STEP ELEMENTOR BUILD GUIDE

### Step 1: Section 13 Root Container Setup
1. In Elementor, add a new **Container (Flexbox)**.
2. In **Layout**:
   - Content Width: **Full Width**.
   - HTML Tag: `<section>`.
3. In **Style**:
   - Background Type: **Classic** → Color: `#0D0D0D`.
4. In **Advanced**:
   - CSS ID: `final-cta`.
   - Padding: Desktop `Top: 76px, Bottom: 76px` | Mobile `Top: 56px, Bottom: 56px`.

### Step 2: Inner Content Wrapper & Horizon Beam
1. Drag a child **Container** inside the root section.
2. In **Layout**:
   - Content Width: **Boxed** (`1280px`).
   - Direction: **Column**.
   - Align Items: **Start**.
   - Padding: `Left: 48px, Right: 48px` (Mobile: `Left: 20px, Right: 20px`).
3. Add a child Container or Divider for the Horizon Beam:
   - Width: `512px` (`32rem`), Height: `2px`.
   - In **Advanced > Custom CSS**, paste the snippet from Section 5.1.

### Step 3: Eyebrow Badge & Gradient Heading
1. Add a **Heading Widget** for the Eyebrow:
   - Title: `FROM TRANSACTION TO DECISION. ONE CONNECTED FLOW.`.
   - Tag: `<span>`.
   - Typography: Manrope, `11px`, 700 weight, Uppercase, Color: `#05C7F2`.
   - In **Advanced > Custom CSS**, paste the snippet from Section 5.2.
2. Add a second **Heading Widget** for the Main Title:
   - Title: `Ready to connect<br><span class="cta-highlight">your business?</span>`.
   - Tag: `<h2>`.
   - Typography: Global Display Large (`64px` desktop / `44px` mobile), 650 weight, Line Height `1.02`, Color `#FFFFFF`.
   - Margin Top: `32px`.
   - In **Advanced > Custom CSS**, paste the snippet from Section 5.3.
3. Add a **Text Editor Widget** for the Subtitle:
   - Content: `<p>Start with one workflow. Connect the rest when you’re ready.</p>`.
   - Typography: Manrope, `20px`, 400 weight, Line Height `1.6`, Color `#9CA3AF`.
   - Margin Top: `32px`.

### Step 4: Actions Cluster Setup
1. Drag a child **Container (Flexbox)** below the subtitle.
2. In **Layout**:
   - Direction: **Row** (Desktop) | **Column** (Mobile).
   - Align Items: **Center** (Desktop) | **Stretch** (Mobile).
   - Gap: `16px`.
   - Margin Top: `40px`.
3. Add the Primary Button ("Book a Demo"):
   - Text: `Book a Demo`.
   - Link: Dynamic Tag -> **Popup** (Action: Open Popup, select `Popup - Book a Demo`).
   - Icon: Upload SVG `arrow.svg` (from `final-cta-icons.zip`), Position: **After**, Spacing: `8px`.
   - Style: Background `#0528F2`, Text Color `#FFFFFF`, Height `52px`, Padding `16px 32px`, Radius `8px`.
4. Add the Secondary Link ("Explore Platform"):
   - Text: `Explore Platform`.
   - Link: `#connection`.
   - Icon: Upload SVG `arrow.svg`, Position: **After**, Spacing: `8px`.
   - Style: Background `Transparent`, Text Color `#FFFFFF`, Padding `14px 20px`, Radius `8px`.

### Step 5: Elementor Pro Popup Setup ("Popup - Book a Demo")
1. In WordPress Admin, navigate to **Templates > Popups > Add New**. Name it `Popup - Book a Demo`.
2. In **Popup Settings (Gear Icon)**:
   - Width: `576px` (Mobile: `100%`).
   - Position: Center / Center (Mobile: Bottom / Center).
   - Entrance Animation: `Fade In Up` (Mobile: `Slide In Up`).
   - Overlay: `#0B1020` with 45% opacity.
   - Close Button: Yes (styled with `1px solid #E6EAF0`, radius `8px`).
   - Advanced: Prevent Page Scrolling: **Yes**.
3. Inside the Popup Canvas Container:
   - Background: `#FFFFFF`, Radius: `16px` (Mobile: `16px 16px 0 0`), Padding: `32px`.
   - Add Kicker: `BOOK A DEMO` (`10px`, 700, `#0528F2`).
   - Add Title: `Let’s connect your first flow.` (`32px`, 650, `#0D0D0D`).
   - Add Paragraph: `Tell us where your business flow breaks today...` (`15px`, `#6B7280`).
4. Add the **Elementor Form Widget**:
   - Field 1: Email (Label: `Work email`, Placeholder: `you@company.com`, Required, Width: `50%` desktop / `100%` mobile).
   - Field 2: Text (Label: `Company`, Placeholder: `Company name`, Required, Width: `50%` desktop / `100%` mobile).
   - Field 3: Select (Label: `Where should we start?`, Required, Width: `100%`, Options: `Get paid faster\nControl procurement\nRun inventory better\nControl cash & banking\nStay compliant`).
   - Submit Button: `Request a Demo` (Width: `100%`, Background `#0528F2`, Height `48px`, Radius `8px`).
5. Add Disclaimer: `<small>Prototype only. No information is submitted.</small>` (`13px`, `#6B7280`).
6. Click **Publish** → Set Conditions: `Entire Site` (Save & Close).

### Step 6: Responsive Preview & QA
1. Preview **Desktop (`1440px`)**: Verify dark canvas, glowing horizon beam, gradient text clip, and button popup trigger.
2. Preview **Mobile (`375px`)**: Verify vertical action button stack and bottom-sheet drawer appearance of the demo dialog.

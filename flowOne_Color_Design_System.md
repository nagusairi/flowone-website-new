# flowOne Color Design System
## Antigravity Website Handoff Specification
**Version:** 1.0  
**Brand:** flowOne  
**Visual Direction:** Fluid Intelligence  
**Primary principle:** Premium enterprise finance + AI intelligence + fluid movement

---

## 1. Purpose

This document defines the approved color system for the flowOne website.

The objective is to evolve the current website into a **premium, modern, intelligent B2B SaaS experience** while preserving the recognizable flowOne logo colors.

The implementation must feel:

- Premium
- Elegant
- Smooth
- Enterprise-grade
- Intelligent
- Modern
- Financially trustworthy
- AI-native without looking like a generic AI startup

### Core visual idea

> **Electric Blue → Azure → Cyan → Magenta**

The spectrum represents the flowOne concept of connected financial operations and intelligence.

**Important:** The colors must be used with restraint. The website should be predominantly neutral, with brand colors providing hierarchy and moments of emphasis.

---

# 2. Brand Color Hierarchy

Do NOT give all brand colors equal visual weight.

Recommended approximate distribution:

| Color family | Target visual usage |
|---|---:|
| White / neutrals | 65–70% |
| Electric / deep blue | 15–20% |
| Cyan / azure | 7–10% |
| Gradients / glow | 2–5% |
| Magenta | 2–4% |

### Key rule

**Magenta is an accent, not a primary UI color.**

**Cyan represents flow and movement.**

**Blue represents trust, action and financial intelligence.**

---

# 3. Core Brand Palette

## 3.1 Electric Blue — Primary

**HEX:** `#0528F2`

Role:

- Primary brand color
- Primary CTA
- Primary links
- Active navigation
- Important UI actions
- Key metrics
- Selected states
- Major product visual elements

Use this as the dominant brand accent.

### CSS token

```css
--flow-primary: #0528F2;
```

---

## 3.2 Deep Blue

**HEX:** `#0540F2`

Role:

- Secondary blue
- Hover states
- Supporting UI
- Data visualization
- Dark-to-blue transitions
- Gradient support

### CSS token

```css
--flow-primary-deep: #0540F2;
```

---

## 3.3 Azure — Flow

**HEX:** `#049DD9`

Role:

- Flow
- Connectivity
- Automation
- Process transitions
- Data movement
- Supporting visualizations

### CSS token

```css
--flow-cyan: #049DD9;
```

---

## 3.4 Bright Cyan — Flow / Velocity

**HEX:** `#05C7F2`

Role:

- Flow highlights
- Automation indicators
- Interactive data visualization
- Product motion
- Subtle glow
- AI/data connection points

### CSS token

```css
--flow-cyan-bright: #05C7F2;
```

---

## 3.5 Magenta — Intelligence Accent

**HEX:** `#D9299B`

Role:

- AI
- Intelligence
- Insight
- Special highlights
- AI-generated moments
- Gradient endpoint
- Small decorative accents

### CSS token

```css
--flow-magenta: #D9299B;
```

### Critical usage rule

Do NOT use magenta for:

- Primary buttons
- Large backgrounds
- Main navigation
- Body text
- Large cards
- Generic decorative elements throughout the page

Magenta should feel **rare and intentional**.

---

## 3.6 Ink — Authority

**HEX:** `#0D0D0D`

Role:

- Primary text
- Dark sections
- Footer
- Strong contrast
- Technology / AI sections
- High-authority content

### CSS token

```css
--flow-ink: #0D0D0D;
```

---

# 4. Neutral System

The website should not rely on pure white everywhere.

Use a subtle neutral hierarchy to create section rhythm.

| Token | HEX | Usage |
|---|---|---|
| Neutral 0 | `#FFFFFF` | Main background / surfaces |
| Neutral 50 | `#F7F8FA` | Alternate sections |
| Neutral 100 | `#F1F4F8` | Secondary surfaces |
| Neutral 200 | `#E6EAF0` | Subtle borders |
| Neutral 300 | `#DDE3EA` | Default borders |
| Neutral 500 | `#6B7280` | Secondary text |
| Neutral 700 | `#374151` | Strong secondary text |
| Neutral 900 | `#0D0D0D` | Primary text / dark background |

### CSS

```css
--neutral-0: #FFFFFF;
--neutral-50: #F7F8FA;
--neutral-100: #F1F4F8;
--neutral-200: #E6EAF0;
--neutral-300: #DDE3EA;
--neutral-500: #6B7280;
--neutral-700: #374151;
--neutral-900: #0D0D0D;
```

---

# 5. Dark Theme / Dark Sections

Use dark sections selectively to create contrast.

| Token | HEX |
|---|---|
| Dark 900 | `#0D0D0D` |
| Dark 800 | `#12151C` |
| Dark 700 | `#1A1F2A` |

```css
--dark-900: #0D0D0D;
--dark-800: #12151C;
--dark-700: #1A1F2A;
```

### Recommended usage

Dark sections are especially appropriate for:

- flowOne AI
- AI architecture
- Technology / infrastructure
- Product intelligence
- Advanced automation
- Final CTA
- High-impact product visualizations

Do not turn the entire website into dark mode.

---

# 6. Official Gradients

Gradients are part of the flowOne visual language, but they must be used selectively.

## 6.1 Flow Gradient

### Meaning

**Trust → Flow → Velocity**

```css
--gradient-flow: linear-gradient(
  135deg,
  #0528F2 0%,
  #049DD9 55%,
  #05C7F2 100%
);
```

Use for:

- Process flows
- Automation
- Product architecture
- Connected workflows
- Data movement
- Hero visual accents
- Decorative flow paths

---

## 6.2 Intelligence Gradient

### Meaning

**Data → Intelligence → Insight**

```css
--gradient-intelligence: linear-gradient(
  135deg,
  #05C7F2 0%,
  #0540F2 48%,
  #D9299B 100%
);
```

Use for:

- flowOne AI
- AI Core
- AI insights
- Predictive analytics
- Intelligent automation
- AI visualization
- AI-specific highlights

### Important

Do not use the Intelligence Gradient on every card, button or heading.

It should identify **AI/intelligence moments**.

---

# 7. Semantic Color System

Brand colors and functional colors must remain separate.

Do not use brand magenta/cyan as substitutes for status colors.

## Success

Recommended:

```css
--success: #16803C;
--success-bg: #EAF7EF;
```

Use for:

- Paid
- Completed
- Reconciled
- Approved
- Healthy

## Warning

Recommended:

```css
--warning: #B7791F;
--warning-bg: #FFF7E6;
```

Use for:

- Attention
- Pending
- Approaching due date
- Review required

## Error

Recommended:

```css
--error: #C62828;
--error-bg: #FDECEC;
```

Use for:

- Failed
- Overdue
- Error
- Blocked
- Rejected

## Informational

Use flowOne blue:

```css
--info: #0528F2;
--info-bg: #EEF2FF;
```

---

# 8. Semantic Meaning of Brand Colors

The brand palette should have a consistent meaning across the marketing website and product UI.

| Color | Semantic meaning |
|---|---|
| `#0528F2` Electric Blue | Trust / Action / Financial intelligence |
| `#0540F2` Deep Blue | Depth / Technology / Supporting action |
| `#049DD9` Azure | Flow / Connectivity / Automation |
| `#05C7F2` Bright Cyan | Velocity / Data movement / Interaction |
| `#D9299B` Magenta | AI / Intelligence / Insight |
| `#0D0D0D` Ink | Authority / Structure / Technology |

This semantic mapping should remain consistent.

---

# 9. Website Background Strategy

Do not build the website as a continuous white canvas.

Use controlled background changes to establish rhythm.

Recommended sequence:

### Hero

`#FFFFFF`

### Product / Platform

`#F7F8FA`

### Solutions

`#FFFFFF`

### AI / Intelligence

`#0D0D0D` or `#12151C`

### Proof / Results

`#F7F8FA`

### Resources / Content

`#FFFFFF`

### Final CTA

`#0D0D0D` or deep blue

This is guidance, not a rigid requirement. Preserve existing information architecture and use the sequence where it improves visual rhythm.

---

# 10. Typography Color Rules

## Primary headings

```css
color: #0D0D0D;
```

## Body text

```css
color: #374151;
```

## Secondary / supporting text

```css
color: #6B7280;
```

## Links

```css
color: #0528F2;
```

## Heading emphasis

Use Electric Blue selectively:

```text
Automate your
<span class="brand-emphasis">financial operations.</span>
```

Do not make entire headings blue by default.

---

# 11. Button Color System

## Primary CTA

Background:

`#0528F2`

Text:

`#FFFFFF`

Hover:

`#0540F2`

Example:

**Book a Demo**

---

## Secondary CTA

Background:

`#FFFFFF`

Border:

`#DDE3EA`

Text:

`#0D0D0D`

Hover:

- Border → `#0528F2`
- Text → `#0528F2`
- Very subtle neutral/blue background tint

---

## Dark CTA

Background:

`#0D0D0D`

Text:

`#FFFFFF`

Use selectively.

---

## AI CTA

The Intelligence Gradient may be used for a CTA only when the action is explicitly AI-related.

Do not use it for the standard site-wide primary CTA.

---

# 12. Cards

Cards should primarily remain neutral.

### Default card

```css
background: #FFFFFF;
border: 1px solid #E6EAF0;
```

### Hover

Use subtle elevation and/or border emphasis.

Avoid turning cards into colored blocks.

### Do NOT create

- Blue card
- Cyan card
- Pink card
- Purple card
- Gradient card

as a generic card system.

Brand color should appear inside cards through:

- icons
- metrics
- charts
- indicators
- small accents
- interaction states

This keeps the experience premium and enterprise-grade.

---

# 13. Borders

Use restrained borders.

### Default

```css
border-color: #E6EAF0;
```

### Stronger

```css
border-color: #DDE3EA;
```

### Brand emphasis

Use:

```css
border-color: #0528F2;
```

only for active/selected states.

Avoid bright cyan/magenta borders around ordinary cards.

---

# 14. Data Visualization

Data visualization should use the brand spectrum carefully.

Recommended order:

1. `#0528F2`
2. `#0540F2`
3. `#049DD9`
4. `#05C7F2`
5. `#D9299B`

Use neutral gray for secondary/background data where possible.

### Important

Do not automatically assign every chart a rainbow palette.

The chart should communicate data hierarchy first.

---

# 15. AI Visual Language

AI should have a recognizable color identity.

### AI base

`#0528F2`

### AI flow

`#05C7F2`

### AI intelligence accent

`#D9299B`

### AI background

`#0D0D0D` / `#12151C`

Use the Intelligence Gradient for:

- AI Core
- AI network
- AI insight moments
- AI-generated recommendations
- predictive interfaces

Use subtle glow rather than heavy neon effects.

---

# 16. Glow Rules

Glow should be subtle.

### Blue glow

```css
box-shadow: 0 0 40px rgba(5, 40, 242, 0.12);
```

### Cyan glow

```css
box-shadow: 0 0 40px rgba(5, 199, 242, 0.12);
```

### Magenta glow

```css
box-shadow: 0 0 40px rgba(217, 41, 155, 0.10);
```

Do not use strong neon glows around ordinary UI components.

---

# 17. FlowOne Visual Principle

Use **Color Flow** as a visual metaphor.

Color transitions can represent:

```text
Financial data
      ↓
Automation
      ↓
Intelligence
      ↓
Action
```

Possible visual transition:

```text
Electric Blue
      ↓
Azure
      ↓
Cyan
      ↓
Magenta
```

This can be used in:

- Invoice lifecycle
- Order-to-cash
- Procure-to-pay
- Cashflow
- Reconciliation
- AI workflows
- Data architecture
- Platform diagrams

---

# 18. What NOT to do

Avoid the following visual treatment:

- Rainbow gradients
- Excessive neon
- Magenta-heavy layouts
- Cyan-heavy layouts
- Gradient backgrounds behind every section
- Gradient buttons everywhere
- Colored cards everywhere
- Glassmorphism overload
- Excessive glowing borders
- Blue text for every heading
- Multiple unrelated blues
- Generic purple AI aesthetics
- Excessive decorative blobs
- AI sparkles everywhere

The goal is:

> **90% restraint + 10% visual surprise.**

---

# 19. Accessibility

All text and interactive elements must maintain WCAG AA contrast.

Never sacrifice readability for brand color.

### Especially important

Do not use:

- Bright cyan for small body text
- Magenta for small body text
- Low-opacity blue text on white
- Light gray text for essential information

For small text, prefer:

`#0D0D0D`, `#374151`, or `#6B7280` depending on contrast requirements.

Primary blue should be used carefully for text and checked for contrast at the implemented font size/weight.

---

# 20. Complete CSS Variable Block

Antigravity should consolidate the website's color tokens into a centralized system similar to the following:

```css
:root {

  /* =========================
     FLOWONE BRAND
     ========================= */

  --flow-primary: #0528F2;
  --flow-primary-deep: #0540F2;

  --flow-cyan: #049DD9;
  --flow-cyan-bright: #05C7F2;

  --flow-magenta: #D9299B;

  --flow-ink: #0D0D0D;


  /* =========================
     NEUTRALS
     ========================= */

  --neutral-0: #FFFFFF;
  --neutral-50: #F7F8FA;
  --neutral-100: #F1F4F8;
  --neutral-200: #E6EAF0;
  --neutral-300: #DDE3EA;

  --neutral-500: #6B7280;
  --neutral-700: #374151;
  --neutral-900: #0D0D0D;


  /* =========================
     DARK
     ========================= */

  --dark-900: #0D0D0D;
  --dark-800: #12151C;
  --dark-700: #1A1F2A;


  /* =========================
     SEMANTIC
     ========================= */

  --success: #16803C;
  --success-bg: #EAF7EF;

  --warning: #B7791F;
  --warning-bg: #FFF7E6;

  --error: #C62828;
  --error-bg: #FDECEC;

  --info: #0528F2;
  --info-bg: #EEF2FF;


  /* =========================
     GRADIENTS
     ========================= */

  --gradient-flow:
    linear-gradient(
      135deg,
      #0528F2 0%,
      #049DD9 55%,
      #05C7F2 100%
    );

  --gradient-intelligence:
    linear-gradient(
      135deg,
      #05C7F2 0%,
      #0540F2 48%,
      #D9299B 100%
    );
}
```

---

# 21. Antigravity Implementation Instructions

### IMPORTANT

Do not redesign the website from scratch.

Use the existing website structure, content, layout and components as the baseline.

Apply this document as a **visual design-system update**.

### Required actions

1. Audit all existing colors across the website.
2. Identify hard-coded colors.
3. Replace duplicated/near-duplicate brand colors with the approved tokens.
4. Create centralized CSS variables/design tokens.
5. Preserve the existing flowOne logo colors.
6. Use `#0528F2` as the primary action color.
7. Use `#049DD9` and `#05C7F2` to communicate flow, connectivity and automation.
8. Reserve `#D9299B` for AI/intelligence accents.
9. Use `#0D0D0D` for authority, typography and dark sections.
10. Introduce `#F7F8FA` and `#F1F4F8` to create subtle section rhythm.
11. Replace generic gradients with the two approved flowOne gradients.
12. Remove unnecessary rainbow/neon gradients.
13. Avoid excessive colored cards.
14. Preserve accessibility and verify contrast.
15. Ensure hover, active, focus and selected states remain visually coherent.
16. Keep responsive behavior unchanged unless a color treatment requires a small adjustment.
17. Do not introduce new brand colors without documenting and justifying them.
18. Keep functional success/warning/error colors separate from the brand palette.

---

# 22. Final Design Intent

The final website should communicate:

### TRUST

through Electric Blue.

### FLOW

through Azure and Cyan.

### INTELLIGENCE

through the restrained Magenta accent.

### AUTHORITY

through Ink.

### PREMIUM

through White, neutral space and visual restraint.

The resulting experience should feel:

> **A premium financial operating platform built for the intelligent, AI-enabled enterprise.**

Not:

> A colorful AI startup website.

---

## 23. One-line Brand Rule

> **Blue earns trust. Cyan shows flow. Magenta signals intelligence. Black creates authority. White creates premium space.**

---

# 24. Complete Interaction-State Color System

This section is mandatory. Do not infer interactive states from the base palette.

Every interactive component must have a deliberate:

**Default → Hover → Active/Pressed → Focus → Selected → Disabled → Loading → Error/Success where applicable**

The interaction system must remain visually consistent with the core flowOne palette.

---

## 24.1 Interaction State Principles

### Hover

Hover should communicate:

> "This element is interactive."

Use subtle color, border, elevation or background changes.

Do not make ordinary components suddenly become saturated gradients.

### Active / Pressed

Active should communicate:

> "The user is currently pressing or has activated this control."

It should feel slightly deeper/more committed than hover.

### Focus

Focus should communicate:

> "Keyboard or assistive technology focus is currently here."

Focus must never depend only on color.

Use a visible focus ring.

```css
:focus-visible {
  outline: 2px solid #0528F2;
  outline-offset: 3px;
}
```

### Selected

Selected should communicate:

> "This is the currently chosen item."

Use a combination of color + indicator/border/background where appropriate.

### Disabled

Disabled should communicate:

> "This control exists but cannot currently be used."

Use neutral colors and reduced visual emphasis.

Do not use blurred or extremely low-opacity elements that become inaccessible.

### Loading

Loading should preserve the component's identity.

Do not replace a primary CTA with an unrelated color.

### Error / Success

Use semantic colors, not brand accent colors.

---

# 25. Button Interaction States

## Primary Button

Base:

```css
background: #0528F2;
color: #FFFFFF;
```

Hover:

```css
background: #0540F2;
color: #FFFFFF;
```

Active / Pressed:

```css
background: #0A2BC7;
color: #FFFFFF;
transform: translateY(1px);
```

Focus:

```css
outline: 2px solid #0528F2;
outline-offset: 3px;
```

Disabled:

```css
background: #DDE3EA;
color: #6B7280;
cursor: not-allowed;
```

Loading:

- Keep primary blue.
- Show an appropriate spinner/progress indicator.
- Prevent duplicate submission.
- Do not switch to magenta.

---

## Secondary Button

Base:

```css
background: #FFFFFF;
border: 1px solid #DDE3EA;
color: #0D0D0D;
```

Hover:

```css
background: #F7F8FA;
border-color: #0528F2;
color: #0528F2;
```

Active:

```css
background: #EEF2FF;
border-color: #0540F2;
color: #0540F2;
```

Focus:

```css
outline: 2px solid #0528F2;
outline-offset: 3px;
```

Disabled:

```css
background: #F1F4F8;
border-color: #E6EAF0;
color: #6B7280;
```

---

## Dark Button

Base:

```css
background: #0D0D0D;
color: #FFFFFF;
```

Hover:

```css
background: #1A1F2A;
```

Active:

```css
background: #12151C;
```

Focus:

```css
outline: 2px solid #0528F2;
outline-offset: 3px;
```

---

# 26. Text Link States

Default:

```css
color: #0528F2;
```

Hover:

```css
color: #0540F2;
text-decoration: underline;
text-underline-offset: 3px;
```

Active:

```css
color: #0A2BC7;
```

Focus:

```css
outline: 2px solid #0528F2;
outline-offset: 3px;
```

Visited:

Do not introduce purple browser-default styling.

Use a controlled brand-compatible treatment if visited-state styling is required.

Disabled:

```css
color: #6B7280;
```

---

# 27. Navigation States

## Default

```css
color: #374151;
```

## Hover

```css
color: #0528F2;
```

Use subtle background tint only where the navigation component supports it.

## Active / Current Page

```css
color: #0528F2;
```

Use an additional visual indicator such as:

- bottom indicator
- active background
- weight change

Do not rely on color alone.

## Focus

Visible blue focus ring.

## Disabled

```css
color: #6B7280;
```

---

# 28. Navigation Dropdown States

Dropdown container:

```css
background: #FFFFFF;
border: 1px solid #E6EAF0;
```

Item default:

```css
color: #374151;
```

Item hover:

```css
background: #F7F8FA;
color: #0528F2;
```

Item active/selected:

```css
background: #EEF2FF;
color: #0528F2;
```

Do not use magenta for generic navigation interactions.

---

# 29. Card States

## Default

```css
background: #FFFFFF;
border: 1px solid #E6EAF0;
```

## Hover

Use:

- subtle elevation
- slightly stronger border
- optional very subtle blue tint

Example:

```css
border-color: #DDE3EA;
box-shadow: 0 8px 24px rgba(13, 13, 13, 0.06);
```

For clickable cards, a subtle blue border may be introduced.

## Active

```css
border-color: #0528F2;
```

Use carefully.

## Selected

Use:

```css
border: 1px solid #0528F2;
background: #F7F8FA;
```

and provide another indicator where necessary.

## Disabled

Reduce emphasis using neutral colors.

Never turn the card gray enough that its content becomes unreadable.

---

# 30. Tabs

## Default

```css
color: #6B7280;
```

## Hover

```css
color: #0528F2;
```

Optional background:

```css
background: #F7F8FA;
```

## Active / Selected

```css
color: #0528F2;
```

Use an active indicator:

```css
border-bottom: 2px solid #0528F2;
```

## Focus

Visible focus ring.

## Disabled

```css
color: #6B7280;
opacity: 0.6;
```

Do not rely solely on opacity.

---

# 31. Form Fields

## Default

```css
background: #FFFFFF;
border: 1px solid #DDE3EA;
color: #0D0D0D;
```

## Hover

```css
border-color: #6B7280;
```

## Focus

```css
border-color: #0528F2;
box-shadow: 0 0 0 3px rgba(5, 40, 242, 0.12);
```

## Filled

Maintain:

```css
color: #0D0D0D;
```

## Disabled

```css
background: #F1F4F8;
border-color: #E6EAF0;
color: #6B7280;
```

## Error

```css
border-color: #C62828;
```

Error message:

```css
color: #C62828;
```

Error background where appropriate:

```css
background: #FDECEC;
```

## Success

```css
border-color: #16803C;
```

Success message:

```css
color: #16803C;
```

---

# 32. Checkbox / Radio / Toggle

Default:

```css
border-color: #DDE3EA;
```

Hover:

```css
border-color: #0528F2;
```

Selected:

```css
background: #0528F2;
border-color: #0528F2;
```

Selected icon/check:

```css
color: #FFFFFF;
```

Focus:

Visible blue focus ring.

Disabled:

Use neutral gray treatment.

Do not use magenta for ordinary selection controls.

---

# 33. Filter / Chip States

## Default

```css
background: #FFFFFF;
border: 1px solid #DDE3EA;
color: #374151;
```

## Hover

```css
background: #F7F8FA;
border-color: #0528F2;
color: #0528F2;
```

## Selected

```css
background: #EEF2FF;
border-color: #0528F2;
color: #0528F2;
```

## Active / Pressed

Use a slightly deeper blue treatment.

## Disabled

Neutral gray.

---

# 34. Icon Button States

Default:

```css
color: #374151;
background: transparent;
```

Hover:

```css
color: #0528F2;
background: #F7F8FA;
```

Active:

```css
color: #0540F2;
background: #EEF2FF;
```

Focus:

Visible focus ring.

Disabled:

```css
color: #6B7280;
```

Avoid turning every icon button into a colored circular badge.

---

# 35. Accordion States

## Default

Neutral text and border.

## Hover

Subtle neutral/blue emphasis.

## Open / Active

Use Electric Blue for:

- heading
- icon
- active indicator

Do not introduce magenta unless the accordion is specifically AI-related.

---

# 36. Pagination

Default:

```css
background: #FFFFFF;
color: #374151;
border: 1px solid #DDE3EA;
```

Hover:

```css
color: #0528F2;
border-color: #0528F2;
```

Active:

```css
background: #0528F2;
color: #FFFFFF;
border-color: #0528F2;
```

Disabled:

Neutral gray.

---

# 37. AI-Specific Interaction States

AI components are the exception where the Intelligence Gradient may be used.

## AI Default

Primary blue/cyan identity.

## AI Hover

Introduce a subtle cyan glow or gradient shift.

## AI Active

Increase the intensity of the blue/cyan treatment.

## AI Selected

A subtle Intelligence Gradient border or indicator may be used.

## AI Focus

Accessible blue focus ring.

## AI Loading

Use subtle animated blue/cyan progression.

Magenta may appear as a small intelligence accent.

## AI Success / Error

Still use semantic Success/Error colors.

Do not use Magenta to communicate success or error.

---

# 38. Status Badge States

Brand colors must not replace functional status colors.

### Success

```css
color: #16803C;
background: #EAF7EF;
```

### Warning

```css
color: #B7791F;
background: #FFF7E6;
```

### Error

```css
color: #C62828;
background: #FDECEC;
```

### Information

```css
color: #0528F2;
background: #EEF2FF;
```

### AI

Only when the badge means AI/intelligence:

```css
color: #0540F2;
```

A subtle Intelligence Gradient may be used as a visual accent.

---

# 39. Hover Philosophy

Hover states must be **smooth, restrained and intentional**.

Recommended transition:

```css
transition:
  color 180ms ease,
  background-color 180ms ease,
  border-color 180ms ease,
  box-shadow 180ms ease,
  transform 180ms ease;
```

Do not use excessive transform movement.

Recommended maximum:

```css
transform: translateY(-1px);
```

for appropriate interactive cards/buttons.

Buttons can use:

```css
transform: translateY(1px);
```

when pressed.

Avoid:

- large jumps
- scaling that changes layout
- neon flashing
- excessive glow
- color cycling

---

# 40. Focus Must Never Be Removed

Do NOT use:

```css
outline: none;
```

unless an equivalent accessible focus treatment is explicitly implemented.

Keyboard users must be able to identify the active element.

---

# 41. Interaction-State Token Layer

Where practical, establish tokens for interaction states:

```css
:root {

  --state-hover-bg: #F7F8FA;
  --state-active-bg: #EEF2FF;

  --state-focus: #0528F2;
  --state-focus-ring: rgba(5, 40, 242, 0.12);

  --state-disabled-bg: #F1F4F8;
  --state-disabled-border: #E6EAF0;
  --state-disabled-text: #6B7280;

  --state-selected: #0528F2;

  --state-success: #16803C;
  --state-success-bg: #EAF7EF;

  --state-warning: #B7791F;
  --state-warning-bg: #FFF7E6;

  --state-error: #C62828;
  --state-error-bg: #FDECEC;
}
```

---

# 42. Interaction-State QA Checklist

Before considering implementation complete, verify:

- [ ] Every primary button has default / hover / active / focus / disabled
- [ ] Every secondary button has default / hover / active / focus / disabled
- [ ] Navigation has default / hover / active / focus
- [ ] Dropdowns have hover / selected / focus
- [ ] Links have hover / active / focus
- [ ] Cards have hover where clickable
- [ ] Tabs have hover / selected / focus / disabled
- [ ] Inputs have default / hover / focus / disabled / error / success
- [ ] Checkboxes and radios have selected / focus / disabled
- [ ] Toggles have selected / focus / disabled
- [ ] Filters/chips have hover / selected / active / disabled
- [ ] Icon buttons have hover / active / focus / disabled
- [ ] Accordions have hover / open / focus
- [ ] Pagination has hover / active / disabled
- [ ] AI components have dedicated but restrained AI states
- [ ] Loading states preserve component identity
- [ ] Error/success use semantic colors
- [ ] Focus states are keyboard-visible
- [ ] No browser-default purple visited links appear unintentionally
- [ ] No random colors were introduced
- [ ] No excessive gradients were introduced
- [ ] No component becomes unnecessarily neon on hover
- [ ] Mobile/touch states remain coherent
- [ ] Reduced-motion preferences are respected for animated interaction states

---

# 43. Final Interaction Principle

The flowOne interaction system should feel:

> **Responsive, intelligent and polished — never flashy for the sake of being flashy.**

The user should always understand:

- what is clickable
- what is active
- what is selected
- what is focused
- what is disabled
- what is loading
- what succeeded
- what needs attention
- what represents AI

without having to decode the interface.


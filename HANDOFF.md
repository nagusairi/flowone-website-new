# flowOne Project Handoff

## 1. Current production state

This repository contains the complete flowOne design-system work and the current high-fidelity homepage implementation.

The application currently rendered by Vite is the homepage:

```tsx
// src/App.tsx
import Homepage from "./Homepage";

export default function App() {
  return <Homepage />;
}
```

The earlier design-system catalog files remain in the repository as source-of-truth documentation and reusable implementation references, but they are not rendered by `App.tsx`.

Do not regenerate the project from screenshots. Continue from the code in this repository.

## 2. Runtime and tooling

- Node.js: 22
- pnpm: 10.34.3
- React: 19
- Vite: 8
- TypeScript: 5.7
- Tailwind CSS: 4
- GSAP: 3.15
- Formatting: oxfmt

The exact package graph is recorded in `pnpm-lock.yaml`.

### Install and verify

```bash
pnpm install --frozen-lockfile
pnpm build
```

Outside Figma Make, start local development with:

```bash
pnpm dev
```

Inside Figma Make, the development server is already supervised and must not be started manually.

## 3. Brand source of truth

- Brand: `flowOne`
- Tagline: `REIMAGINE BUSINESS WITH AI.`
- Category: Connected Business Operations Platform
- Positioning: “Your business moves as one. Your software should too.”
- Philosophy: “Your business doesn’t run in modules. Neither should your software.”
- AI position: “AI that works inside the flow.”
- Differentiator: Flow + Transaction + Intelligence + Consequence

### Logo

Use the supplied artwork without redrawing or recoloring it:

```text
public/assets/flowone-logo.svg
```

### Core colors

- Electric Blue: `#0022FF`
- Flow Pink: `#E22991`
- Flow Cyan: `#00B8E6`
- Flow Ink: `#0B1020`

All canonical tokens are declared in `src/index.css`.

### Typography

- Manrope only
- Wired through the Google Fonts import in `src/index.css`
- Fluid display and heading sizes use `clamp()`

## 4. Source architecture

### Application entry

- `src/main.tsx` — React mount
- `src/App.tsx` — renders the homepage only
- `src/Homepage.tsx` — complete homepage content, state, interactions, and composition
- `src/homepage.css` — homepage layout, responsive behavior, and homepage-specific motion
- `src/index.css` — global token foundation and stylesheet imports
- `index.html` — title, metadata, Open Graph, canonical URL, and JSON-LD

### Reusable system modules

- `src/components/flowone.tsx`
  - Primitives
  - Buttons
  - Links
  - Badges
  - Status
  - Cards
  - Fields
  - Tabs
  - Tooltips
  - Avatars
  - Flow Node, Connector, Stage
  - AI Insight and AI Action

- `src/components/flow-system.tsx`
  - Flow Pulse
  - State Indicator
  - Numbered Stage
  - Flow Group
  - Transaction
  - Transaction Row
  - Milestone
  - Decision
  - Outcome
  - AI Flow Step

- `src/components/product-ui.tsx`
  - Product navigation and shell
  - Page headers and context
  - KPIs
  - Tables and filters
  - Search and states
  - Drawers and timelines
  - Approval, invoice, payment, and reconciliation UI
  - Product AI
  - Charts and forecast

- `src/components/navigation-system.tsx`
  - Global header
  - Desktop mega menus
  - Mobile navigation
  - Mobile accordions
  - Demo CTA

- `src/components/motion-system.tsx`
  - Motion prototypes and interaction specifications

- `src/components/accessibility-system.tsx`
  - Accessible dialog
  - Accessible Flow summary

Each component module has a corresponding CSS file in `src/components/`.

### Motion utilities

- `src/motion/accessibility.ts`
- `src/motion/flow.ts`
- `src/motion/reveal.ts`
- `src/motion/scroll.ts`

### Retained design-system catalog

These files document and demonstrate the systems created before the homepage:

- `src/StepTwo.tsx`
- `src/StepThree.tsx`
- `src/StepFive.tsx`
- `src/StepSix.tsx`
- `src/StepEight.tsx`
- `src/StepNine.tsx`

They are intentionally not imported by `src/App.tsx`.

There is no standalone `StepFour.tsx` or `StepSeven.tsx`. Governance and homepage architecture were incorporated into the implemented systems and homepage rather than retained as separate rendered files.

## 5. Current homepage structure

The homepage in `src/Homepage.tsx` contains:

1. Existing global header
2. Hero
3. Business problem and Business Flow
4. Living Transaction
5. Fragmentation
6. Connection
7. Capability areas
8. AI inside the flow
9. Predictive business flow
10. Outcomes
11. Role-based views
12. Proof placeholder
13. “What is flowOne?” semantic answer block
14. Trust
15. Final CTA
16. Full footer
17. Accessible Book a Demo dialog

## 6. Final hero implementation

The current hero visual is intentionally restrained.

It communicates:

```text
ONE TRANSACTION → AI INTELLIGENCE → CASH CONSEQUENCE
```

Visible content:

- Ananya Enterprises
- TXN-10482
- ₹5,90,000
- Invoice · Due in 4 days
- Order → Invoice → AI → Cash
- AI payment probability: 92%
- Expected within 4 days
- Cash received: ₹5,90,000
- GST validated
- 125 units allocated
- Payment expected

It uses one one-shot 950ms pulse. It does not loop.

Do not restore the previous stacked-card, dashboard, or large explanatory hero concepts.

## 7. Business Flow interaction

The “Business Activity → Transaction → Operations → Finance → Cash → Decision” section uses:

- One continuous horizontal rail
- Six aligned nodes
- Neutral future path
- Quiet Ink completed nodes
- Electric Blue active node
- 900ms state progression
- One-shot viewport-triggered sequence
- Hover, focus, click, and tap selection
- Vertical connected timeline on mobile
- Static completed state under reduced motion

Do not convert this section into a conventional arrow flowchart.

## 8. Living Transaction interaction

The Living Transaction is the homepage’s primary product demonstration.

Persistent identity:

- TXN-10482
- Ananya Enterprises
- Original order: ₹5,00,000
- Current invoice/cash value: ₹5,90,000

States:

1. Order
2. Inventory
3. Invoice
4. GST
5. Receivable
6. AI Prediction
7. Collection
8. Bank
9. Cash
10. Decision

### Desktop

- Uses GSAP ScrollTrigger
- GSAP and ScrollTrigger are dynamically imported
- The narrative/workspace pair is pinned
- Scroll distance: `+=900%`
- Scrub: `0.35`
- Ten scroll chapters update one persistent workspace
- The section releases naturally after Decision

### Mobile

- No GSAP
- No pinning
- All ten states render sequentially

### Reduced motion

- GSAP is not loaded
- Pinning is disabled
- All ten states render sequentially
- State reveal and pulse motion are removed

Do not replace the persistent workspace with ten screenshots or unrelated cards.

## 9. Navigation

The global navigation is implemented in `navigation-system.tsx`.

Top-level order:

1. Solutions
2. Platform
3. AI
4. Resources
5. Company
6. Founder’s Diary
7. Book a Demo

Founder’s Diary is a direct top-level link and must not move inside Company.

The header includes:

- Click-first mega menus
- Escape close
- Mobile menu
- Mobile accordions
- Scroll lock
- Focus movement and restoration
- Persistent Book a Demo CTA
- Subtle page-progress line

## 10. Conversion behavior

Book a Demo appears in:

- Header
- Mobile navigation
- Hero
- Final CTA
- Footer CTA band

The demo dialog:

- Is a prototype only
- Does not submit data
- Has labels and required fields
- Traps focus
- Closes with Escape
- Restores focus
- Locks body scroll
- Becomes a bottom sheet on mobile

A backend integration is still required for production submission.

## 11. Proof and trust policy

No customer evidence has been supplied.

The homepage intentionally uses explicit placeholders:

- Customer logo
- Customer name
- Industry
- Problem
- Flow implemented
- Measured outcome
- Verified quote

Do not invent:

- Customer names
- Customer logos
- Testimonials
- ROI
- DSO improvement
- Collection improvement
- Revenue
- Certifications
- Security badges

Replace placeholders only with verified evidence.

## 12. SEO, AEO, and GEO

`index.html` includes:

- SEO title
- Meta description
- Canonical URL
- Open Graph title and description
- SoftwareApplication JSON-LD
- Audience definition

The homepage includes a visible “What is flowOne?” answer:

> flowOne is a connected Business Operations Platform that brings finance, operations, compliance, cash and AI together around one continuous business flow.

The visible content also establishes:

- Indian-business audience
- Customer-to-Cash
- Procure-to-Pay
- Inventory-to-Cash
- Record-to-Report
- Finance and Business Operations
- GST compliance
- AI applied inside business transactions

## 13. Accessibility

Current implementation includes:

- One homepage H1
- Logical H2/H3 hierarchy
- Skip link
- Visible focus
- Keyboard-operable navigation and interactions
- Touch-friendly controls
- Focus-contained dialog
- Form labels
- Explicit status text
- Accessible Flow summaries
- Accessible forecast summaries
- Reduced-motion modes
- Non-color-only status communication
- Mobile sequential alternatives to pinned motion

Target remains WCAG 2.2 AA.

## 14. Responsive checkpoints

Canonical checkpoints:

- 390px
- 768px
- 1024px
- 1280px
- 1440px+

Key behavior:

- Mobile recomposes rather than shrinks
- Header becomes compact mobile navigation
- Flow changes from horizontal to vertical
- Living Transaction becomes sequential
- Tables become priority lists
- Drawers become bottom sheets
- Tabs can scroll horizontally
- Forms become single-column

## 15. Known incomplete production integrations

The following are intentionally not complete:

1. Demo form backend
2. Destination pages for Solutions, Platform, AI, Resources, Company, Blog, and Founder’s Diary
3. Verified proof content
4. Real privacy, terms, and cookies pages
5. Production analytics and conversion tracking
6. Production consent management

Do not interpret these as visual-design omissions.

## 16. Non-negotiable visual rules

Preserve:

- Manrope
- Existing semantic tokens
- 8px spacing rhythm
- Calm white financial workspace
- Restrained shadows
- Subtle borders
- Electric Blue for action
- Cyan for intelligence
- Pink for attention/exception only
- Ink for control and high-impact moments
- Signature gradient only for rare accents

Avoid:

- Generic SaaS hero layouts
- ERP visual density on marketing pages
- AI orbs
- Robot imagery
- Stock business photography
- Glassmorphism
- Neon
- Gradient blobs
- Decorative particles
- Excessive cards
- Excessive pills
- Floating dashboard widgets
- Fabricated analytics

## 17. Handoff process for Antigravity

1. Transfer the entire repository, not screenshots or copied source snippets.
2. Include hidden files, `pnpm-lock.yaml`, `.mise.toml`, and `public/assets/flowone-logo.svg`.
3. Ask Antigravity to read:
   - `AGENTS.md` or the repository instructions provided with the project
   - `HANDOFF.md`
   - `src/index.css`
   - `src/Homepage.tsx`
   - `src/homepage.css`
4. Install using `pnpm install --frozen-lockfile`.
5. Run `pnpm build` before making changes.
6. Confirm the baseline build succeeds.
7. Review the homepage at 390, 768, 1024, 1280, and 1440px.
8. Make changes through existing components and tokens.
9. Do not replace the homepage or regenerate the design system.
10. Run `pnpm build` after every substantive change.

## 18. Copy-paste Antigravity onboarding prompt

```text
You are continuing the existing flowOne project.

The full repository is the source of truth. Do not regenerate the application from screenshots and do not redesign it from scratch.

Before changing anything:

1. Read the repository instructions.
2. Read HANDOFF.md in full.
3. Inspect src/App.tsx, src/Homepage.tsx, src/homepage.css, src/index.css, and the reusable modules under src/components/.
4. Run pnpm install --frozen-lockfile.
5. Run pnpm build and confirm the baseline succeeds.

Current state:

- src/App.tsx renders the real flowOne homepage.
- The Step*.tsx files are retained design-system references and are not the rendered application.
- The homepage uses the supplied logo at public/assets/flowone-logo.svg.
- The desktop Living Transaction uses dynamically imported GSAP ScrollTrigger.
- Mobile and reduced-motion Living Transaction experiences are sequential and unpinned.
- The demo form is a prototype with no backend.
- Customer proof and certification data must never be fabricated.

Preserve:

- Existing tokens, Manrope typography, components, navigation, Flow System, Product UI, motion language, responsive behavior, and accessibility behavior.
- The positioning: “Your business moves as one. Your software should too.”
- The category: Connected Business Operations Platform.
- Founder’s Diary as a direct top-level navigation item.

Do not introduce generic SaaS patterns, AI orbs, glassmorphism, neon, stock imagery, fabricated metrics, or a new visual language.

Use existing components and variants before creating anything new.

After changes:

- Test 390, 768, 1024, 1280, and 1440px.
- Verify keyboard navigation and reduced motion.
- Run pnpm build.
- Report exactly what changed and any remaining production integrations.
```

## 19. Baseline verification

At handoff time:

```text
pnpm build: PASS
```

The repository working tree was clean before this handoff document was added.

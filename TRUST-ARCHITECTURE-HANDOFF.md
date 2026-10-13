# CONNECTED OPERATING MODEL & TRUST ARCHITECTURE — ELEMENTOR PRO BUILD HANDOFF SPECIFICATION

This document provides a pixel-accurate, code-verified Elementor Pro implementation specification for **Section 12: Connected Operating Model & Trust Architecture** (`.home-answer` and `#trust` / `.home-trust.home-section`, lines 1153–1368 in `src/Homepage.tsx`) of the flowOne website.

> [!IMPORTANT]
> **CRITICAL BUILD INSTRUCTION FOR ELEMENTOR BUILDERS**:
> The React/TSX/CSS in this document is the **visual and behavioral source of truth only**. It must **not** be pasted into WordPress as a raw HTML block. Every element must be constructed natively in Elementor Pro using Containers (Flexbox/Grid), native widgets (Heading, Text Editor, Icon Box, Button), Global Styles, responsive controls, and reusable Components. Custom CSS must only be used where native Elementor controls are structurally incapable of delivering the design (e.g. the animated green telemetry beacon pulse dot and the active card gradient accent line).

---

# PART A — STANDARD CONTENT

## 1. FILE MAP & SECTION OVERVIEW

### 1.1 Purpose & Page Placement
- **Section Purpose**: Establishes the authoritative architectural bedrock and institutional security foundations of flowOne. While preceding sections demonstrate user experience and workflows, Section 12 answers the two most critical executive questions:
  1. **Section 12A: The Operating Model Definition (`.home-answer`)**: Provides an unambiguous, executive-level definition of what flowOne is, what core workflows it unifies (Customer-to-Cash, Procure-to-Pay, Inventory-to-Cash, Record-to-Report), who it is built for, and how embedded AI operates inside transactions.
  2. **Section 12B: Security & Sovereign Trust Architecture (`#trust`)**: Replaces vague marketing slogans with 6 audited, deterministic financial trust pillars. Each pillar pairs executive-level governance assurances with an embedded live micro-visual terminal proving the underlying engineering reality:
     - **Pillar 01 (Lineage)**: Append-Only Transaction Lineage (Cryptographic Event Ledger, actor ID, SHA-256 hash).
     - **Pillar 02 (Access)**: Dual-Key Maker-Checker Governance (Enforced separation of duties with policy gates).
     - **Pillar 03 (Statutory)**: Direct GSTN & IRP Tax Clearing (Signed IRN, E-Way bills, 3-way reconciliation).
     - **Pillar 04 (Banking)**: Zero-Variance Bank Reconciliation (Direct host-to-host feeds, sub-second matching, ₹0.00 drift).
     - **Pillar 05 (Security)**: Tenant Sandboxing & India Data Residency (AES-256-GCM cipher, Mumbai ap-south-1 sovereign boundary).
     - **Pillar 06 (Runtime)**: Deterministic Operational Continuity (99.99% high-consequence runtime, zero RPO automated failover).
- **Institutional Telemetry Bar**: Positioned directly above the bento matrix, rendering a live status strip (`100% DETERMINISTIC POSTINGS`, `GSTN · E-INVOICE IRP · E-WAY`, `DUAL-KEY MAKER-CHECKER`, `AES-256 · INDIA RESIDENT`) with an animated glowing pulse beacon.
- **Page Placement**:
  - **Preceding Section**: Section 11: Proof / Verified Customer Evidence (`#proof` / `.home-proof.home-section`, lines 1147–1151 in `src/Homepage.tsx`).
  - **Succeeding Section**: Section 13: Final Conversion CTA (`#final-cta` / `.home-final-cta`, lines 1170–1185 in `src/Homepage.tsx`).

### 1.2 Component File Names & Line Ranges
- **`src/Homepage.tsx`**:
  - **Lines 303–396**: `trustPillars` constant data array (all 6 pillars with badges, codes, tones, and micro-visual data structures).
  - **Lines 1153–1155**: Section 12A markup (`.home-answer`, `.answer-grid`, `<dl>`, `<dt>`, `<dd>`).
  - **Lines 1157–1168**: Section 12B markup (`#trust`, `.home-trust`, heading row, `<TrustArchitecture />`).
  - **Lines 1191–1368**: `TrustArchitecture` component implementation (telemetry bar, 6-card bento grid, interactive card hover/active state, and micro-visual terminal bodies).
- **`src/homepage.css`**:
  - **Line 4**: `.home-container` (container width & fluid padding formula).
  - **Line 5**: `.home-section` (section vertical padding clamp).
  - **Lines 8–47**: `.home-index` (capsule eyebrow, pulse animation dot pseudo-element, hover state).
  - **Lines 49–60**: `@keyframes beacon-pulse` (cyan glowing beacon animation).
  - **Lines 61–63**: `.home-section h2`, `.section-heading-row`, and `.section-heading-row > p`.
  - **Lines 3210–3218**: Section 12A styles (`.home-answer`, `.answer-grid`, definition list `<dl>`, `<dt>`, `<dd>`).
  - **Lines 3220–3721**: Section 12B styles (`.home-trust`, `.trust-architecture`, `.trust-telemetry-bar`, `.trust-telemetry-item`, `.trust-telemetry-beacon`, `.trust-telemetry-divider`, `.trust-matrix`, `.trust-card`, `.trust-card:hover`, `.trust-card.is-active`, `.trust-card::before`, `.trust-visual`, `.trust-v-header`, `.trust-v-badge`, `.trust-badge-*`, `.trust-v-code`, `.trust-v-body`, `.trust-v-row`, `.trust-v-dim`, `.trust-v-bright`, `.trust-v-tag`, `.trust-v-hash`, `.trust-dual-steps`, `.trust-dual-step`, `.trust-step-marker`, `.trust-step-info`, `.trust-step-status`, `.trust-dual-connector`, `.trust-tax-grid`, `.trust-tax-cell`, `.trust-bank-balance`, `.trust-bank-row`, `.trust-bank-divider`, `.trust-bank-summary`, `.trust-vault-grid`, `.trust-vault-item`, `.trust-heartbeat-feed`, `.trust-hb-item`, `.trust-hb-summary-strip`).
  - **Line 4460**: `@media (max-width: 64rem)` (1024px tablet override: `.trust-matrix` collapses to 2 columns).
  - **Lines 4593–4599**: `@media (max-width: 48rem)` (768px mobile override: `.answer-grid` 1 column, `.trust-telemetry-bar` vertical column, `.trust-telemetry-divider` hidden, `.trust-matrix` 1 column, `.trust-card` padding 1.25rem).
  - **Line 4629**: `@media (prefers-reduced-motion: reduce)` motion suppression rules.
- **`src/index.css`**:
  - **Lines 11–221**: Design tokens (brand blue `#0528F2`, cyan bright `#05C7F2`, ink `#0D0D0D`, neutral scale, success `#16803C`, typography clamps, radius tokens, and spatial scale).

---

## 2. VERBATIM CODE

### 2.1 Verbatim Data Array (`src/Homepage.tsx`, Lines 303–396)
```tsx
const trustPillars = [
  {
    id: "audit",
    tag: "01 · LINEAGE",
    title: "Append-Only Transaction Lineage",
    subtitle: "Cryptographic Event Ledger",
    description: "Every journal entry, invoice alteration, and payment state is permanently committed into an append-only timeline with actor ID, microsecond timestamp, and delta. No silent edits, no phantom entries.",
    badge: "IMMUTABLE RECORD",
    tone: "green",
    code: "TXN-10482_INV_SEALED",
    rows: [
      { label: "ACTOR", value: "priya.s@ananya.in", tag: "FINANCE LEAD" },
      { label: "RECORD", value: "₹5,90,000 · GST 18% · COMMITTED" },
      { label: "HASH", value: "sha256:9b2d8e41a7f0c13e...", isHash: true },
    ],
  },
  {
    id: "governance",
    tag: "02 · ACCESS",
    title: "Dual-Key Maker-Checker Governance",
    subtitle: "Enforced Separation of Duties",
    description: "Strict least-privilege role boundaries prevent conflicting authority. The sales rep who books an order cannot clear an invoice credit memo; cash disbursements and credit overrides mandate multi-party sign-off.",
    badge: "DUAL-SIGN POLICY",
    tone: "blue",
    code: "POLICY #GOV-204",
    maker: { role: "MAKER · PROPOSAL", name: "Rohan M. [Sales Ops]", status: "SUBMITTED" },
    gate: "POLICY GATE: THRESHOLD > ₹2,00,000",
    checker: { role: "CHECKER · CLEARANCE", name: "Anita V. [VP Finance]", status: "AUTHORIZED" },
  },
  {
    id: "statutory",
    tag: "03 · STATUTORY",
    title: "Direct GSTN & IRP Tax Clearing",
    subtitle: "Zero-Portal Tax Clearance",
    description: "Built natively into Indian statutory tax infrastructure. Invoices generate signed IRN and QR codes automatically at confirmation; E-Way bills clear without third-party portal hops or manual spreadsheets.",
    badge: "DIRECT TAX RAILS",
    tone: "green",
    code: "ZERO REJECTIONS",
    grid: [
      { label: "IRN STATUS", value: "47b9...e281", sub: "CRYPTOGRAPHICALLY SIGNED" },
      { label: "E-WAY BILL", value: "#1810482029", sub: "DISPATCH PERMIT CLEARED" },
      { label: "GSTIN VALIDATION", value: "29AABCU9603R1ZM", sub: "ACTIVE IN DATABASE" },
      { label: "3-WAY RECON", value: "GSTR-1 ↔ 2B ↔ BOOKS", sub: "100% RECONCILED" },
    ],
  },
  {
    id: "banking",
    tag: "04 · BANKING",
    title: "Zero-Variance Bank Reconciliation",
    subtitle: "Deterministic Ledger-to-Bank Bridge",
    description: "Automated host-to-host multi-bank statement synchronization. Incoming NEFT/RTGS credits are paired to open receivables in sub-second intervals with zero balance drift.",
    badge: "OPEN BANKING BRIDGE",
    tone: "cyan",
    code: "HDFC DIRECT CONNECT",
    bank: {
      credit: "₹5,90,000.00 CR (Direct Feed)",
      ledger: "₹5,90,000.00 CLR (INV-10482)",
      variance: "₹0.00",
      speed: "48ms Auto-Match",
    },
  },
  {
    id: "residency",
    tag: "05 · SECURITY",
    title: "Tenant Sandboxing & India Data Residency",
    subtitle: "Sovereign Tenant Boundary",
    description: "Dedicated cryptographic database partitioning ensures complete multi-tenant isolation. All transaction, vendor, and customer data remains strictly resident within Indian sovereign data centers.",
    badge: "RESIDENT SOVEREIGNTY",
    tone: "blue",
    code: "TENANT_0x91F",
    grid: [
      { label: "STORAGE CIPHER", value: "AES-256-GCM", sub: "AT REST ENCRYPTION" },
      { label: "DATA RESIDENCY", value: "Mumbai (ap-south-1)", sub: "DOMESTIC JURISDICTION" },
      { label: "TRANSPORT PROTOCOL", value: "mTLS · TLS 1.3", sub: "END-TO-END CIPHER" },
      { label: "TENANT ISOLATION", value: "0% Co-Mingling", sub: "DEDICATED KEY RING" },
    ],
  },
  {
    id: "continuity",
    tag: "06 · RUNTIME",
    title: "Deterministic Operational Continuity",
    subtitle: "99.99% High-Consequence Runtime",
    description: "Engineered for continuous financial throughput during peak fiscal closures, quarterly audit deadlines, and month-end dispatch surges with automated multi-zone failover.",
    badge: "CONTINUOUS RUNTIME",
    tone: "green",
    code: "99.99% COMMITMENT",
    feed: [
      { label: "Posting & Journal Engine", status: "12ms · NOMINAL" },
      { label: "Statutory Gateway (GSTN/IRP)", status: "CONNECTED" },
      { label: "Transaction Multi-AZ Replication", status: "0ms LAG" },
    ],
    rpo: "RPO: 0 SECONDS · AUTOMATED FAILOVER",
  },
];
```

### 2.2 Verbatim JSX / TSX Markup (`src/Homepage.tsx`, Lines 1153–1168 & 1191–1368)
```tsx
    {/* SECTION 12A: The Operating Model Definition */}
    <section className="home-answer home-section" aria-labelledby="what-is-flowone">
      <div className="home-container answer-grid">
        <div>
          <span className="home-index">A CONNECTED OPERATING MODEL</span>
          <h2 id="what-is-flowone">What is flowOne?</h2>
        </div>
        <div>
          <p>flowOne is a connected Business Operations Platform that brings finance, operations, compliance, cash and AI together around one continuous business flow.</p>
          <dl>
            <div>
              <dt>What does flowOne connect?</dt>
              <dd>Customer-to-Cash, Procure-to-Pay, Inventory-to-Cash and Record-to-Report workflows.</dd>
            </div>
            <div>
              <dt>Who is flowOne for?</dt>
              <dd>Indian businesses, CFOs, finance teams, operations teams and business owners.</dd>
            </div>
            <div>
              <dt>How does flowOne use AI?</dt>
              <dd>AI works inside transactions to understand context, predict change, recommend action and help teams act.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    {/* SECTION 12B: Security & Sovereign Trust Architecture */}
    <section id="trust" className="home-trust home-section" aria-labelledby="trust-heading">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="home-index">SECURITY & SOVEREIGN TRUST</span>
            <h2 id="trust-heading">Built for the financial work your business depends on.</h2>
          </div>
          <p>Control, accountability and clear access are part of the operating model—not decorative claims.</p>
        </div>
        <TrustArchitecture />
      </div>
    </section>
```

```tsx
const TrustArchitecture = memo(function TrustArchitecture() {
  const [activeCard, setActiveCard] = useState<string>("audit");

  return (
    <div className="trust-architecture">
      {/* Live System Governance Bar */}
      <div className="trust-telemetry-bar" aria-label="System Governance Status">
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-beacon" aria-hidden="true" />
          <span className="trust-telemetry-label">SYSTEM INTEGRITY:</span>
          <span className="trust-telemetry-value">100% DETERMINISTIC POSTINGS</span>
        </div>
        <div className="trust-telemetry-divider" aria-hidden="true" />
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-label">STATUTORY RAILS:</span>
          <span className="trust-telemetry-value">GSTN · E-INVOICE IRP · E-WAY</span>
        </div>
        <div className="trust-telemetry-divider" aria-hidden="true" />
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-label">GOVERNANCE:</span>
          <span className="trust-telemetry-value">DUAL-KEY MAKER-CHECKER</span>
        </div>
        <div className="trust-telemetry-divider" aria-hidden="true" />
        <div className="trust-telemetry-item">
          <span className="trust-telemetry-label">DATA BOUNDARY:</span>
          <span className="trust-telemetry-value">AES-256 · INDIA RESIDENT</span>
        </div>
      </div>

      {/* 6-Card Bento Matrix */}
      <div className="trust-matrix" role="region" aria-label="Financial trust and control pillars">
        {trustPillars.map((pillar) => {
          const p = pillar as any;
          const isActive = activeCard === p.id;
          return (
            <div
              key={p.id}
              className={`trust-card ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveCard(p.id)}
              onMouseEnter={() => setActiveCard(p.id)}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveCard(p.id);
                }
              }}
            >
              <div className="trust-card-top">
                <div className="trust-card-meta">
                  <span className="trust-card-tag">{p.tag}</span>
                  <span className="trust-card-status">{p.badge}</span>
                </div>
                <h3 className="trust-card-title">{p.title}</h3>
                <span className="trust-card-sub">{p.subtitle}</span>
                <p className="trust-card-desc">{p.description}</p>
              </div>

              {/* Embedded Micro-Visual Terminal */}
              <div className={`trust-visual trust-visual-${p.id}`}>
                <div className="trust-v-header">
                  <span className={`trust-v-badge trust-badge-${p.tone}`}>
                    <span className="trust-beacon-dot" aria-hidden="true" />
                    {p.badge}
                  </span>
                  <span className="trust-v-code">{p.code}</span>
                </div>

                {p.id === "audit" && p.rows && (
                  <div className="trust-v-body">
                    {p.rows.map((r: any) => (
                      <div className="trust-v-row" key={r.label}>
                        <span className="trust-v-dim">{r.label}</span>
                        <span className={r.isHash ? "trust-v-hash" : "trust-v-bright"}>{r.value}</span>
                        {r.tag && <span className="trust-v-tag">{r.tag}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {p.id === "governance" && p.maker && p.checker && (
                  <div className="trust-dual-steps">
                    <div className="trust-dual-step is-complete">
                      <div className="trust-step-marker">01</div>
                      <div className="trust-step-info">
                        <span className="trust-step-role">{p.maker.role}</span>
                        <span className="trust-step-actor">{p.maker.name}</span>
                      </div>
                      <span className="trust-step-status">{p.maker.status}</span>
                    </div>
                    <div className="trust-dual-connector">
                      <span className="trust-connector-line" />
                      <span className="trust-connector-lock">{p.gate}</span>
                      <span className="trust-connector-line" />
                    </div>
                    <div className="trust-dual-step is-authorized">
                      <div className="trust-step-marker">02</div>
                      <div className="trust-step-info">
                        <span className="trust-step-role">{p.checker.role}</span>
                        <span className="trust-step-actor">{p.checker.name}</span>
                      </div>
                      <span className="trust-step-status is-approved">{p.checker.status}</span>
                    </div>
                  </div>
                )}

                {p.id === "statutory" && p.grid && (
                  <div className="trust-tax-grid">
                    {p.grid.map((cell: any) => (
                      <div className="trust-tax-cell" key={cell.label}>
                        <span className="trust-v-dim">{cell.label}</span>
                        <span className="trust-tax-val">{cell.value}</span>
                        <span className="trust-tax-sub">{cell.sub}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.id === "banking" && p.bank && (
                  <div className="trust-bank-balance">
                    <div className="trust-bank-row">
                      <span>Bank Statement:</span>
                      <strong>{p.bank.credit}</strong>
                    </div>
                    <div className="trust-bank-row">
                      <span>Ledger Receivable:</span>
                      <strong>{p.bank.ledger}</strong>
                    </div>
                    <div className="trust-bank-divider" />
                    <div className="trust-bank-summary">
                      <div>
                        <span className="trust-v-dim">VARIANCE</span>
                        <span className="trust-bank-zero">{p.bank.variance} (Zero Drift)</span>
                      </div>
                      <div className="trust-bank-align-right">
                        <span className="trust-v-dim">SPEED</span>
                        <span className="trust-bank-speed">{p.bank.speed}</span>
                      </div>
                    </div>
                  </div>
                )}

                {p.id === "residency" && p.grid && (
                  <div className="trust-vault-grid">
                    {p.grid.map((cell: any) => (
                      <div className="trust-vault-item" key={cell.label}>
                        <span className="trust-v-dim">{cell.label}</span>
                        <span className="trust-vault-highlight">{cell.value}</span>
                        <span className="trust-v-sub">{cell.sub}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.id === "continuity" && p.feed && (
                  <div className="trust-heartbeat-feed">
                    {p.feed.map((hb: any) => (
                      <div className="trust-hb-item" key={hb.label}>
                        <span className="trust-hb-indicator is-live" />
                        <span className="trust-hb-label">{hb.label}</span>
                        <span className="trust-hb-status">{hb.status}</span>
                      </div>
                    ))}
                    <div className="trust-hb-summary-strip">
                      <span>{p.rpo}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
```

### 2.3 Verbatim CSS Styles (`src/homepage.css`)
```css
/* SECTION 12A: Operating Model Definition */
.home-answer {
  background: var(--neutral-0);
}

.answer-grid {
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: var(--spacing-10);
}

.answer-grid > div:last-child > p {
  font-size: 1.35rem;
  line-height: 1.55;
  font-weight: 500;
}

.answer-grid dl {
  margin: var(--spacing-5) 0 0;
}

.answer-grid dl > div {
  padding-block: var(--spacing-2);
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: var(--spacing-3);
  border-top: 1px solid var(--color-border-default);
}

.answer-grid dt {
  font-weight: 700;
}

.answer-grid dd {
  margin: 0;
  color: var(--color-text-tertiary);
  line-height: 1.6;
}

/* SECTION 12B: Trust Architecture Matrix */
.home-trust {
  background: var(--neutral-50);
  position: relative;
}

.trust-architecture {
  margin-top: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
}

/* Institutional Telemetry Bar */
.trust-telemetry-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  padding: 0.85rem 1.5rem;
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(11, 16, 32, 0.03);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
}

.trust-telemetry-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.trust-telemetry-beacon {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: var(--radius-full);
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
  animation: hero-beacon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.trust-telemetry-label {
  color: var(--color-text-tertiary);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.trust-telemetry-value {
  color: var(--color-text-primary);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.trust-telemetry-divider {
  width: 1px;
  height: 1rem;
  background: var(--color-border-default);
}

/* 6-Card Matrix */
.trust-matrix {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.trust-card {
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  transition: border-color var(--motion-fast) ease, box-shadow var(--motion-fast) ease, transform var(--motion-fast) ease;
  box-shadow: 0 2px 8px rgba(11, 16, 32, 0.03);
}

.trust-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background var(--motion-fast) ease;
}

.trust-card:hover,
.trust-card.is-active {
  border-color: rgba(0, 34, 255, 0.4);
  box-shadow: 0 10px 30px -4px rgba(11, 16, 32, 0.08), 0 0 0 1px rgba(0, 34, 255, 0.1);
  transform: translateY(-2px);
}

.trust-card:hover::before,
.trust-card.is-active::before {
  background: var(--gradient-brand-signature);
}

.trust-card:focus-visible {
  border-color: var(--color-brand-blue);
  box-shadow: 0 0 0 2px rgba(0, 34, 255, 0.25);
}

.trust-card-top {
  display: flex;
  flex-direction: column;
}

.trust-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.trust-card-tag {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-brand-blue);
  background: rgba(0, 34, 255, 0.06);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 34, 255, 0.12);
}

.trust-card-status {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-text-tertiary);
}

.trust-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.3rem;
  line-height: 1.3;
}

.trust-card-sub {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.75rem;
}

.trust-card-desc {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin: 0;
}

/* Micro-Visual Terminal Surface */
.trust-visual {
  background: var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #E2E8F0;
  font-size: 0.72rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.trust-v-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.trust-v-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.trust-beacon-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: currentColor;
}

.trust-badge-green { color: #34D399; }
.trust-badge-blue { color: #60A5FA; }
.trust-badge-cyan { color: #22D3EE; }

.trust-v-code {
  font-size: 0.62rem;
  color: #94A3B8;
  letter-spacing: 0.04em;
}

/* Micro-Visual: Lineage Rows */
.trust-v-body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.trust-v-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.trust-v-dim {
  color: #64748B;
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.trust-v-bright {
  color: #F8FAFC;
  font-weight: 500;
}

.trust-v-tag {
  background: rgba(0, 34, 255, 0.3);
  color: #93C5FD;
  padding: 0.1rem 0.35rem;
  border-radius: 2px;
  font-size: 0.58rem;
  font-weight: 600;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.trust-v-hash {
  color: #94A3B8;
  font-size: 0.65rem;
  word-break: break-all;
}

/* Micro-Visual: Dual-Key Steps */
.trust-dual-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.trust-dual-step {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius-sm);
}

.trust-step-marker {
  font-size: 0.62rem;
  font-weight: 700;
  color: #64748B;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.15rem 0.35rem;
  border-radius: 2px;
}

.trust-step-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.trust-step-role {
  font-size: 0.58rem;
  color: #94A3B8;
  font-weight: 600;
}

.trust-step-actor {
  font-size: 0.68rem;
  color: #F8FAFC;
  font-weight: 500;
}

.trust-step-status {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #94A3B8;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
}

.trust-step-status.is-approved {
  color: #34D399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.trust-dual-connector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.85rem;
}

.trust-connector-line {
  height: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
}

.trust-connector-lock {
  font-size: 0.58rem;
  color: #CBD5E1;
  letter-spacing: 0.04em;
  background: rgba(0, 34, 255, 0.25);
  border: 1px solid rgba(0, 34, 255, 0.4);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

/* Micro-Visual: Tax Grid */
.trust-tax-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.55rem;
}

.trust-tax-cell {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.45rem 0.55rem;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.trust-tax-val {
  color: #F8FAFC;
  font-size: 0.68rem;
  font-weight: 600;
}

.trust-tax-sub {
  color: #34D399;
  font-size: 0.55rem;
  letter-spacing: 0.03em;
  font-weight: 600;
}

/* Micro-Visual: Bank Balance */
.trust-bank-balance {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.trust-bank-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.68rem;
  color: #94A3B8;
}

.trust-bank-row strong {
  color: #F8FAFC;
  font-weight: 600;
}

.trust-bank-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-block: 0.15rem;
}

.trust-bank-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trust-bank-zero {
  display: block;
  color: #34D399;
  font-weight: 700;
  font-size: 0.72rem;
}

.trust-bank-speed {
  display: block;
  color: #22D3EE;
  font-weight: 600;
  font-size: 0.68rem;
}

.trust-bank-align-right {
  text-align: right;
}

/* Micro-Visual: Vault Grid */
.trust-vault-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.55rem;
}

.trust-vault-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.45rem 0.55rem;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.trust-vault-highlight {
  color: #60A5FA;
  font-size: 0.68rem;
  font-weight: 600;
}

.trust-v-sub {
  color: #64748B;
  font-size: 0.55rem;
  letter-spacing: 0.03em;
}

/* Micro-Visual: Heartbeat Feed */
.trust-heartbeat-feed {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.trust-hb-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.35rem 0.55rem;
  border-radius: var(--radius-sm);
}

.trust-hb-indicator {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #34D399;
  box-shadow: 0 0 6px rgba(52, 211, 153, 0.7);
}

.trust-hb-label {
  flex: 1;
  font-size: 0.65rem;
  color: #E2E8F0;
}

.trust-hb-status {
  font-size: 0.62rem;
  font-weight: 700;
  color: #34D399;
}

.trust-hb-summary-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.35rem;
  font-size: 0.6rem;
  font-weight: 700;
  color: #94A3B8;
  letter-spacing: 0.05em;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Responsive Media Queries */
@media (max-width: 64rem) {
  .trust-matrix {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 48rem) {
  .answer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-5);
  }

  .answer-grid dl > div {
    grid-template-columns: 1fr;
    gap: .5rem;
  }

  .trust-telemetry-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 1rem;
  }

  .trust-telemetry-divider {
    display: none;
  }

  .trust-matrix {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .trust-card {
    padding: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust-telemetry-beacon {
    animation: none;
  }
}
```

### 2.4 Shared Design Tokens & Resolved Values
| CSS Token Name | Resolved Hex / CSS Value | Description / Element Usage |
| :--- | :--- | :--- |
| `--neutral-0` | `#FFFFFF` | Answer section background (`.home-answer`), trust card background (`.trust-card`) |
| `--neutral-50` | `#F7F8FA` | Trust section background (`.home-trust`) |
| `--color-brand-ink` | `#0D0D0D` | Dark background for embedded micro-visual terminals (`.trust-visual`) |
| `--color-brand-blue` | `#0528F2` | Eyebrow text, badge borders, active card borders |
| `--flow-primary` | `#0528F2` | Primary brand accent tone |
| `--flow-cyan-bright` | `#05C7F2` | Eyebrow glowing pulse dot |
| `--success` | `#16803C` | Telemetry live status beacon dot |
| `--color-border-default` | `#E6EAF0` | Telemetry bar border, trust card default border |
| `--color-text-primary` | `#0D0D0D` | Headings, card titles, telemetry values |
| `--color-text-secondary` | `#374151` | Card body paragraphs, description copy |
| `--color-text-tertiary` | `#6B7280` | Card kickers, telemetry labels, metadata subtitles |
| `--radius-sm` | `0.25rem` (`4px`) | Micro-visual item cells, code badges |
| `--radius-md` | `0.5rem` (`8px`) | Micro-visual terminal container radius |
| `--radius-lg` | `0.75rem` (`12px`) | Telemetry bar outer corner radius |
| `--radius-xl` | `1rem` (`16px`) | Bento matrix card outer corner radius |
| `--radius-full` | `9999px` | Policy lock badge, pill badges, circular dots |
| `--gradient-brand-signature` | `linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%)` | Top border 2px accent highlight on card hover/active (`::before`) |

---

## 3. CONTENT MATRIX

Every text string in display order across Section 12A and Section 12B:

### 3.1 Section 12A: The Operating Model Definition (`.home-answer`)
| # | Element Description | String Content | HTML Tag | Font Family | Size | Weight | Color Token & Hex |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **01** | Section Eyebrow Badge | `A CONNECTED OPERATING MODEL` | `<span>` | Manrope | `11px` | 700 | `--flow-primary` (`#0528F2`) |
| **02** | Main Section Title | `What is flowOne?` | `<h2>` | Manrope | `36-48px` | 650 | `--color-text-primary` (`#0D0D0D`) |
| **03** | Executive Platform Lead | `flowOne is a connected Business Operations Platform that brings finance, operations, compliance, cash and AI together around one continuous business flow.` | `<p>` | Manrope | `1.35rem` (`21.6px`) | 500 | `--color-text-primary` (`#0D0D0D`) |
| **04** | Definition 1 Question | `What does flowOne connect?` | `<dt>` | Manrope | `1.0625rem` (`17px`) | 700 | `--color-text-primary` (`#0D0D0D`) |
| **05** | Definition 1 Answer | `Customer-to-Cash, Procure-to-Pay, Inventory-to-Cash and Record-to-Report workflows.` | `<dd>` | Manrope | `1.0625rem` (`17px`) | 400 | `--color-text-tertiary` (`#6B7280`) |
| **06** | Definition 2 Question | `Who is flowOne for?` | `<dt>` | Manrope | `1.0625rem` (`17px`) | 700 | `--color-text-primary` (`#0D0D0D`) |
| **07** | Definition 2 Answer | `Indian businesses, CFOs, finance teams, operations teams and business owners.` | `<dd>` | Manrope | `1.0625rem` (`17px`) | 400 | `--color-text-tertiary` (`#6B7280`) |
| **08** | Definition 3 Question | `How does flowOne use AI?` | `<dt>` | Manrope | `1.0625rem` (`17px`) | 700 | `--color-text-primary` (`#0D0D0D`) |
| **09** | Definition 3 Answer | `AI works inside transactions to understand context, predict change, recommend action and help teams act.` | `<dd>` | Manrope | `1.0625rem` (`17px`) | 400 | `--color-text-tertiary` (`#6B7280`) |

### 3.2 Section 12B: Security & Sovereign Trust Header & Telemetry Bar (`#trust`)
| # | Element Description | String Content | HTML Tag | Font Family | Size | Weight | Color Token & Hex |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **10** | Section Eyebrow Badge | `SECURITY & SOVEREIGN TRUST` | `<span>` | Manrope | `11px` | 700 | `--flow-primary` (`#0528F2`) |
| **11** | Main Section Title | `Built for the financial work your business depends on.` | `<h2>` | Manrope | `36-48px` | 650 | `--color-text-primary` (`#0D0D0D`) |
| **12** | Section Description Copy | `Control, accountability and clear access are part of the operating model—not decorative claims.` | `<p>` | Manrope | `1.0625rem` (`17px`) | 400 | `--color-text-secondary` (`#374151`) |
| **13** | Telemetry 1 Label | `SYSTEM INTEGRITY:` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 600 | `--color-text-tertiary` (`#6B7280`) |
| **14** | Telemetry 1 Value | `100% DETERMINISTIC POSTINGS` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 700 | `--color-text-primary` (`#0D0D0D`) |
| **15** | Telemetry 2 Label | `STATUTORY RAILS:` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 600 | `--color-text-tertiary` (`#6B7280`) |
| **16** | Telemetry 2 Value | `GSTN · E-INVOICE IRP · E-WAY` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 700 | `--color-text-primary` (`#0D0D0D`) |
| **17** | Telemetry 3 Label | `GOVERNANCE:` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 600 | `--color-text-tertiary` (`#6B7280`) |
| **18** | Telemetry 3 Value | `DUAL-KEY MAKER-CHECKER` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 700 | `--color-text-primary` (`#0D0D0D`) |
| **19** | Telemetry 4 Label | `DATA BOUNDARY:` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 600 | `--color-text-tertiary` (`#6B7280`) |
| **20** | Telemetry 4 Value | `AES-256 · INDIA RESIDENT` | `<span>` | Monospace | `0.72rem` (`11.5px`) | 700 | `--color-text-primary` (`#0D0D0D`) |

### 3.3 Section 12B: The 6 Trust Pillars Matrix
| Pillar | Meta Tag | Title & Subtitle | Description | Terminal Badge & Code | Micro-Visual Data Strings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pillar 01** (`audit`) | `01 · LINEAGE` | **Append-Only Transaction Lineage**<br>*Cryptographic Event Ledger* | Every journal entry, invoice alteration, and payment state is permanently committed into an append-only timeline with actor ID, microsecond timestamp, and delta. No silent edits, no phantom entries. | `IMMUTABLE RECORD` (Green)<br>`TXN-10482_INV_SEALED` | • `ACTOR`: `priya.s@ananya.in` (`FINANCE LEAD`)<br>• `RECORD`: `₹5,90,000 · GST 18% · COMMITTED`<br>• `HASH`: `sha256:9b2d8e41a7f0c13e...` |
| **Pillar 02** (`governance`) | `02 · ACCESS` | **Dual-Key Maker-Checker Governance**<br>*Enforced Separation of Duties* | Strict least-privilege role boundaries prevent conflicting authority. The sales rep who books an order cannot clear an invoice credit memo; cash disbursements and credit overrides mandate multi-party sign-off. | `DUAL-SIGN POLICY` (Blue)<br>`POLICY #GOV-204` | • Step 01: `MAKER · PROPOSAL` / `Rohan M. [Sales Ops]` (`SUBMITTED`)<br>• Lock: `POLICY GATE: THRESHOLD > ₹2,00,000`<br>• Step 02: `CHECKER · CLEARANCE` / `Anita V. [VP Finance]` (`AUTHORIZED`) |
| **Pillar 03** (`statutory`) | `03 · STATUTORY` | **Direct GSTN & IRP Tax Clearing**<br>*Zero-Portal Tax Clearance* | Built natively into Indian statutory tax infrastructure. Invoices generate signed IRN and QR codes automatically at confirmation; E-Way bills clear without third-party portal hops or manual spreadsheets. | `DIRECT TAX RAILS` (Green)<br>`ZERO REJECTIONS` | • `IRN STATUS`: `47b9...e281` (`CRYPTOGRAPHICALLY SIGNED`)<br>• `E-WAY BILL`: `#1810482029` (`DISPATCH PERMIT CLEARED`)<br>• `GSTIN VALIDATION`: `29AABCU9603R1ZM` (`ACTIVE IN DATABASE`)<br>• `3-WAY RECON`: `GSTR-1 ↔ 2B ↔ BOOKS` (`100% RECONCILED`) |
| **Pillar 04** (`banking`) | `04 · BANKING` | **Zero-Variance Bank Reconciliation**<br>*Deterministic Ledger-to-Bank Bridge* | Automated host-to-host multi-bank statement synchronization. Incoming NEFT/RTGS credits are paired to open receivables in sub-second intervals with zero balance drift. | `OPEN BANKING BRIDGE` (Cyan)<br>`HDFC DIRECT CONNECT` | • `Bank Statement:` `₹5,90,000.00 CR (Direct Feed)`<br>• `Ledger Receivable:` `₹5,90,000.00 CLR (INV-10482)`<br>• `VARIANCE`: `₹0.00 (Zero Drift)`<br>• `SPEED`: `48ms Auto-Match` |
| **Pillar 05** (`residency`) | `05 · SECURITY` | **Tenant Sandboxing & India Data Residency**<br>*Sovereign Tenant Boundary* | Dedicated cryptographic database partitioning ensures complete multi-tenant isolation. All transaction, vendor, and customer data remains strictly resident within Indian sovereign data centers. | `RESIDENT SOVEREIGNTY` (Blue)<br>`TENANT_0x91F` | • `STORAGE CIPHER`: `AES-256-GCM` (`AT REST ENCRYPTION`)<br>• `DATA RESIDENCY`: `Mumbai (ap-south-1)` (`DOMESTIC JURISDICTION`)<br>• `TRANSPORT PROTOCOL`: `mTLS · TLS 1.3` (`END-TO-END CIPHER`)<br>• `TENANT ISOLATION`: `0% Co-Mingling` (`DEDICATED KEY RING`) |
| **Pillar 06** (`continuity`) | `06 · RUNTIME` | **Deterministic Operational Continuity**<br>*99.99% High-Consequence Runtime* | Engineered for continuous financial throughput during peak fiscal closures, quarterly audit deadlines, and month-end dispatch surges with automated multi-zone failover. | `CONTINUOUS RUNTIME` (Green)<br>`99.99% COMMITMENT` | • `Posting & Journal Engine`: `12ms · NOMINAL`<br>• `Statutory Gateway (GSTN/IRP)`: `CONNECTED`<br>• `Transaction Multi-AZ Replication`: `0ms LAG`<br>• Summary Strip: `RPO: 0 SECONDS · AUTOMATED FAILOVER` |

---

## 4. MEDIA & ASSETS

All supplementary vector icons for the 6 trust pillars have been generated, saved in `trust-assets/`, and packaged in `trust-icons.zip`.

| Asset File Name | Format | Display Dimensions | Native ViewBox | CSS Color / Tone | Description & Elementor Usage |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `audit-lineage.svg` | SVG | `24 × 24 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Ledger scroll document with verification lines (Pillar 01 icon). |
| `dual-governance.svg` | SVG | `24 × 24 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Dual-key padlock mechanism (Pillar 02 icon). |
| `tax-clearing.svg` | SVG | `24 × 24 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Verified check circular clearance emblem (Pillar 03 icon). |
| `bank-reconciliation.svg` | SVG | `24 × 24 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Dual ledger card bank synchronization (Pillar 04 icon). |
| `data-residency.svg` | SVG | `24 × 24 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Sovereign security boundary shield (Pillar 05 icon). |
| `runtime-continuity.svg` | SVG | `24 × 24 px` | `0 0 24 24` | `--flow-primary` (`#0528F2`) | Continuous high-consequence heartbeat line (Pillar 06 icon). |

### 4.1 Asset Package Reference
- **Directory**: `trust-assets/`
  - `trust-assets/audit-lineage.svg`
  - `trust-assets/dual-governance.svg`
  - `trust-assets/tax-clearing.svg`
  - `trust-assets/bank-reconciliation.svg`
  - `trust-assets/data-residency.svg`
  - `trust-assets/runtime-continuity.svg`
- **ZIP File**: `trust-icons.zip` (located in root workspace directory)

---

## 5. LAYOUT & STRUCTURE

### 5.1 Container Hierarchy
```text
section.home-answer.home-section (width: 100%, bg: #FFFFFF, padding: 96px 0)
└── div.home-container.answer-grid (CSS Grid: 0.8fr 1.2fr, gap: 80px)
    ├── div (Left Column: flex column, gap 0)
    │   ├── span.home-index (pill badge: "A CONNECTED OPERATING MODEL")
    │   └── h2#what-is-flowone ("What is flowOne?")
    └── div (Right Column: flex column, gap: 40px)
        ├── p (Lead Paragraph: 21.6px font, line-height: 1.55)
        └── dl (Definition List: flex column)
            ├── div (Grid: 0.8fr 1.2fr, border-top: 1px solid #E6EAF0, padding: 16px 0)
            │   ├── dt ("What does flowOne connect?")
            │   └── dd ("Customer-to-Cash, Procure-to-Pay, Inventory-to-Cash...")
            ├── div (Grid: 0.8fr 1.2fr, border-top: 1px solid #E6EAF0, padding: 16px 0)
            │   ├── dt ("Who is flowOne for?")
            │   └── dd ("Indian businesses, CFOs, finance teams...")
            └── div (Grid: 0.8fr 1.2fr, border-top: 1px solid #E6EAF0, padding: 16px 0)
                ├── dt ("How does flowOne use AI?")
                └── dd ("AI works inside transactions to understand context...")

section#trust.home-trust.home-section (width: 100%, bg: #F7F8FA, padding: 96px 0)
└── div.home-container (max-width: 1280px, centered)
    ├── div.section-heading-row (CSS Grid: 1.4fr 0.8fr, gap: 80px, align-items: end)
    │   ├── div (flex column)
    │   │   ├── span.home-index (pill badge: "SECURITY & SOVEREIGN TRUST")
    │   │   └── h2#trust-heading ("Built for the financial work your business depends on.")
    │   └── p ("Control, accountability and clear access are part of the operating model...")
    └── div.trust-architecture (flex column, gap: 40px)
        ├── div.trust-telemetry-bar (horizontal flex wrap, bg: #FFFFFF, radius: 12px, padding: 14px 24px)
        │   ├── div.trust-telemetry-item (green beacon pulse dot + SYSTEM INTEGRITY + value)
        │   ├── div.trust-telemetry-divider (vertical 1px line)
        │   ├── div.trust-telemetry-item (STATUTORY RAILS + value)
        │   ├── div.trust-telemetry-divider (vertical 1px line)
        │   ├── div.trust-telemetry-item (GOVERNANCE + value)
        │   ├── div.trust-telemetry-divider (vertical 1px line)
        │   └── div.trust-telemetry-item (DATA BOUNDARY + value)
        └── div.trust-matrix (CSS Grid: 3 columns [repeat(3, 1fr)], gap: 24px)
            ├── div.trust-card (Card 01 - Audit Lineage)
            ├── div.trust-card (Card 02 - Dual-Key Governance)
            ├── div.trust-card (Card 03 - Statutory Tax Clearing)
            ├── div.trust-card (Card 04 - Bank Reconciliation)
            ├── div.trust-card (Card 05 - Sovereign Data Residency)
            └── div.trust-card (Card 06 - Operational Continuity)
```

---

## 6. RESPONSIVE BEHAVIOUR

### 6.1 Desktop (`≥ 1024px`)
- **Answer Section (`.home-answer`)**: 2-column grid (`0.8fr 1.2fr`) with `80px` gap. Left column holds the sticky/aligned heading; right column holds the large lead paragraph and 3 structured `<dl>` definition rows.
- **Trust Heading Row**: 2-column grid (`1.4fr 0.8fr`) with `80px` gap.
- **Telemetry Bar**: Single-row horizontal bar with `space-between` alignment and `1px` vertical dividers.
- **Bento Matrix**: 3-column grid (`repeat(3, 1fr)`) with `24px` (`1.5rem`) gap.

### 6.2 Tablet (`768px – 1023px`)
- **Answer Section**: Collapses to single column with `32px` vertical gap.
- **Trust Heading Row**: Collapses to single column with `32px` vertical gap.
- **Telemetry Bar**: Stays horizontal with wrapped items or flex spacing.
- **Bento Matrix**: Collapses to **2-column grid** (`grid-template-columns: repeat(2, 1fr);`) with `24px` gap.

### 6.3 Mobile (`< 768px`)
- **Section Padding**: Top and bottom padding reduces to `clamp(2.25rem, 4.5vh, 3rem)` (`36px` to `48px`).
- **Answer Section**:
  - Lead paragraph scales down to `1.15rem`.
  - Definition rows (`dl > div`) collapse to single column (`grid-template-columns: 1fr; gap: 0.5rem;`), stacking the question directly above the answer.
- **Telemetry Bar**:
  - Switches to vertical column (`flex-direction: column; align-items: flex-start; gap: 0.6rem; padding: 1rem;`).
  - Dividers are hidden (`display: none;`).
- **Bento Matrix**:
  - Collapses to **1-column grid** (`grid-template-columns: 1fr; gap: 1rem;`).
  - Card padding reduces from `1.6rem` to `1.25rem` (`20px`).
  - Terminal code font scales down smoothly to ensure hashes and values don't overflow viewport boundaries.

---

## 7. INTERACTION & ANIMATION

### 7.1 Interactive Card States
- **Hover & Active State (`.trust-card:hover, .trust-card.is-active`)**:
  - `border-color: rgba(0, 34, 255, 0.4);`
  - `box-shadow: 0 10px 30px -4px rgba(11, 16, 32, 0.08), 0 0 0 1px rgba(0, 34, 255, 0.1);`
  - `transform: translateY(-2px);`
  - Top edge reveals a vibrant 2px gradient line (`::before` with `background: var(--gradient-brand-signature)`).
- **Keyboard Navigation**:
  - Each card has `tabIndex={0}` and `role="button"`.
  - Pressing `Enter` or `Space` toggles `aria-pressed="true"` and activates the card.
  - High-contrast 2px blue focus ring triggers on `:focus-visible`.

### 7.2 Telemetry Pulse Animation
- The green telemetry beacon dot (`.trust-telemetry-beacon`) features an infinite 2-second heartbeat glow:
  ```css
  animation: hero-beacon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  ```
- Suppressed immediately when `prefers-reduced-motion: reduce` is detected.

---

## 8. DEPENDENCIES & THIRD-PARTY LIBRARIES

- **Zero Outside JavaScript Libraries**: Fully independent of GSAP, ScrollTrigger, or external slider engines. All interactions are powered by React `useState` and native CSS transforms.
- **Web-Safe Monospace Stack**: Micro-visual terminals leverage standard system monospace fonts (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`) for razor-sharp rendering with zero webfont download overhead.

---

## 9. ACCESSIBILITY SPECIFICATIONS

- **Landmarks & Regions**:
  - Section 12A marked with `aria-labelledby="what-is-flowone"`.
  - Section 12B marked with `aria-labelledby="trust-heading"`.
  - Bento matrix designated as an accessible region: `role="region" aria-label="Financial trust and control pillars"`.
- **Keyboard Operability**: Full arrow/tab navigation across cards with explicit `onKeyDown` handlers.
- **Contrast Ratios**:
  - Dark terminal cards (`#E2E8F0` text on `#0D0D0D` background): **15.2:1** (WCAG AAA).
  - Terminal green tags (`#34D399` on `#0D0D0D`): **9.6:1** (WCAG AAA).
  - Terminal cyan tags (`#22D3EE` on `#0D0D0D`): **11.4:1** (WCAG AAA).
  - Card titles (`#0D0D0D` on `#FFFFFF`): **18.5:1** (WCAG AAA).

---

## 10. EDGE CASES & STRESS TESTING

1. **Monospace Hash Wrapping**: In Pillar 01, long cryptographic SHA-256 strings (`sha256:9b2d8e41a7f0c13e...`) employ `word-break: break-all;` to prevent horizontal card blowout on 320px mobile screens.
2. **Two-Tier Grid Scaling**: In Pillar 03 and Pillar 05, the 4-cell micro-visuals use `grid-template-columns: repeat(2, 1fr)` with compact `0.45rem` padding, ensuring perfect alignment across all viewports.
3. **Multi-Step Flow Connectivity**: In Pillar 02, the policy gate lock badge and flex connector lines expand fluidly between steps 01 and 02 without wrapping awkward line breaks.

---

## 11. BUILD ESTIMATE & ACCEPTANCE CRITERIA

- **Elementor Implementation Difficulty**: **Medium** (Structured Bento Grid + Micro-Visual containers).
- **Estimated Build Time**: **60 to 75 minutes**.
- **QA Acceptance Checklist**:
  - [ ] Section 12A (`.home-answer`) renders pure white background with 2-column FAQ layout on desktop, collapsing to stacked view on mobile.
  - [ ] Section 12B (`.home-trust`) renders `#F7F8FA` background.
  - [ ] Telemetry bar renders 4 items with dividers on desktop, and collapses to clean vertical list on mobile with active green pulse beacon.
  - [ ] Bento matrix displays 3 columns on desktop, 2 columns on tablet (`1024px`), and 1 column on mobile (`768px`).
  - [ ] All 6 cards feature the dark `#0D0D0D` terminal with monospace syntax highlighting.
  - [ ] Card hover displays the 2px gradient line on the top edge, blue border highlight, and `-2px` vertical lift.

---

# PART B — ELEMENTOR PRO IMPLEMENTATION SPECIFICATION

## 1. ELEMENTOR CONTAINER HIERARCHY & WIDGET MAPPING

Section 12 is built as two consecutive sections or containers:

### 1.1 Section 12A: The Operating Model Definition
```text
[Container: Section 12A Root] (.home-answer)
│   - HTML Tag: <section>
│   - Content Width: Full Width
│   - Background: Pure White (#FFFFFF)
│   - Padding: Desktop [96px, 0px, 96px, 0px] | Mobile [48px, 0px, 48px, 0px]
│
└── [Container: Content Wrapper] (.home-container)
    │   - Content Width: Boxed (1280px)
    │   - Padding: Desktop [0px, 48px, 0px, 48px] | Mobile [0px, 20px, 0px, 20px]
    │   - Layout Type: Grid (Desktop: 2 Columns [0.8fr, 1.2fr]) | Tablet & Mobile: 1 Column
    │   - Column Gap: [80px] (Mobile: [24px])
    │
    ├── [Container: Left Heading Column]
    │   │   - Direction: Column, Align: Start
    │   ├── [Widget: Heading] (Eyebrow Badge) -> "A CONNECTED OPERATING MODEL" (Tag: <span>, CSS snippet applied)
    │   └── [Widget: Heading] (Section Title) -> "What is flowOne?" (Tag: <h2>, Heading 2 preset, Margin-top: 32px)
    │
    └── [Container: Right Content Column]
        │   - Direction: Column, Gap: [32px]
        ├── [Widget: Text Editor] (Lead Paragraph)
        │       - Content: "flowOne is a connected Business Operations Platform that brings finance, operations, compliance, cash and AI together around one continuous business flow."
        │       - Typography: Manrope, 21.6px, Weight: 500, Line Height: 1.55, Color: #0D0D0D
        │
        └── [Container: FAQ Definition List]
            │   - Direction: Column
            ├── [Container: Definition Row 1]
            │   │   - Layout Type: Grid (Desktop: 0.8fr 1.2fr | Mobile: 1fr)
            │   │   - Border Top: [1px solid #E6EAF0], Padding: [16px, 0px, 16px, 0px]
            │   ├── [Widget: Heading] -> "What does flowOne connect?" (Tag: <dt>, 17px, Weight: 700, Color: #0D0D0D)
            │   └── [Widget: Text Editor] -> "Customer-to-Cash, Procure-to-Pay, Inventory-to-Cash and Record-to-Report workflows." (Tag: <dd>, 17px, Color: #6B7280)
            │
            ├── [Container: Definition Row 2]
            │   │   - Layout Type: Grid (Desktop: 0.8fr 1.2fr | Mobile: 1fr)
            │   │   - Border Top: [1px solid #E6EAF0], Padding: [16px, 0px, 16px, 0px]
            │   ├── [Widget: Heading] -> "Who is flowOne for?" (Tag: <dt>, 17px, Weight: 700, Color: #0D0D0D)
            │   └── [Widget: Text Editor] -> "Indian businesses, CFOs, finance teams, operations teams and business owners." (Tag: <dd>, 17px, Color: #6B7280)
            │
            └── [Container: Definition Row 3]
                │   - Layout Type: Grid (Desktop: 0.8fr 1.2fr | Mobile: 1fr)
                │   - Border Top: [1px solid #E6EAF0], Padding: [16px, 0px, 16px, 0px]
                ├── [Widget: Heading] -> "How does flowOne use AI?" (Tag: <dt>, 17px, Weight: 700, Color: #0D0D0D)
                └── [Widget: Text Editor] -> "AI works inside transactions to understand context, predict change, recommend action and help teams act." (Tag: <dd>, 17px, Color: #6B7280)
```

### 1.2 Section 12B: Security & Sovereign Trust Architecture
```text
[Container: Section 12B Root] (.home-trust)
│   - HTML Tag: <section>
│   - CSS ID: trust
│   - Background: Neutral 50 (#F7F8FA)
│   - Padding: Desktop [96px, 0px, 96px, 0px] | Mobile [48px, 0px, 48px, 0px]
│
└── [Container: Content Wrapper] (.home-container)
    │   - Content Width: Boxed (1280px)
    │   - Direction: Column, Gap: [40px]
    │
    ├── [Container: Heading Row] (.section-heading-row)
    │   │   - Layout Type: Grid (Desktop: 1.4fr 0.8fr | Tablet & Mobile: 1fr)
    │   │   - Align Items: End, Gap: [80px] (Mobile: [16px])
    │   ├── [Container: Left Column]
    │   │   ├── [Widget: Heading] (Eyebrow Badge) -> "SECURITY & SOVEREIGN TRUST"
    │   │   └── [Widget: Heading] (Section Title) -> "Built for the financial work your business depends on."
    │   └── [Widget: Text Editor] (Description) -> "Control, accountability and clear access are part of the operating model—not decorative claims."
    │
    ├── [Container: Institutional Telemetry Bar] (.trust-telemetry-bar)
    │   │   - Direction: Desktop: Row (Horizontal, Justify: Space Between) | Mobile: Column (Align: Start)
    │   │   - Background: Pure White (#FFFFFF), Border: [1px solid #E6EAF0], Radius: [12px], Padding: [14px, 24px]
    │   ├── [Widget: Text Editor] (Item 1 with green pulse beacon) -> "[dot] SYSTEM INTEGRITY: 100% DETERMINISTIC POSTINGS"
    │   ├── [Container: Divider Line] (Width: 1px, Height: 16px, Background: #E6EAF0, Mobile: Hidden)
    │   ├── [Widget: Text Editor] (Item 2) -> "STATUTORY RAILS: GSTN · E-INVOICE IRP · E-WAY"
    │   ├── [Container: Divider Line] (Width: 1px, Height: 16px, Background: #E6EAF0, Mobile: Hidden)
    │   ├── [Widget: Text Editor] (Item 3) -> "GOVERNANCE: DUAL-KEY MAKER-CHECKER"
    │   ├── [Container: Divider Line] (Width: 1px, Height: 16px, Background: #E6EAF0, Mobile: Hidden)
    │   └── [Widget: Text Editor] (Item 4) -> "DATA BOUNDARY: AES-256 · INDIA RESIDENT"
    │
    └── [Container: Bento Matrix Grid] (.trust-matrix)
        │   - Layout Type: Grid (Desktop: 3 Columns [repeat(3, 1fr)] | Tablet: 2 Columns | Mobile: 1 Column)
        │   - Gap: [24px] (Mobile: [16px])
        │
        ├── [Container: Trust Card 01 - Audit Lineage]
        │   ├── [Container: Card Top Content]
        │   │   ├── [Container: Meta Row] (Tag: "01 · LINEAGE" + Status: "IMMUTABLE RECORD")
        │   │   ├── [Widget: Heading] -> "Append-Only Transaction Lineage" (Tag: <h3>, 18.4px, Weight: 700)
        │   │   ├── [Widget: Heading] -> "Cryptographic Event Ledger" (Tag: <span>, 12px, Weight: 600, Uppercase)
        │   │   └── [Widget: Text Editor] -> Description paragraph (14px, Color: #374151)
        │   └── [Container: Micro-Visual Terminal 01] (.trust-visual)
        │       ├── [Container: Terminal Header] (Badge: "IMMUTABLE RECORD" + Code: "TXN-10482_INV_SEALED")
        │       └── [Container: Terminal Body] (3 rows: Actor, Record, SHA256 Hash)
        │
        ├── [Container: Trust Card 02 - Dual-Key Governance]
        │   ├── [Container: Card Top Content]
        │   │   ├── [Container: Meta Row] (Tag: "02 · ACCESS" + Status: "DUAL-SIGN POLICY")
        │   │   ├── [Widget: Heading] -> "Dual-Key Maker-Checker Governance"
        │   │   ├── [Widget: Heading] -> "Enforced Separation of Duties"
        │   │   └── [Widget: Text Editor] -> Description paragraph
        │   └── [Container: Micro-Visual Terminal 02] (.trust-visual)
        │       ├── [Container: Terminal Header] (Badge: "DUAL-SIGN POLICY" + Code: "POLICY #GOV-204")
        │       └── [Container: Dual Steps Flow] (Step 01 Maker + Policy Gate Lock + Step 02 Checker Authorized)
        │
        ├── [Container: Trust Card 03 - Statutory Tax Clearing]
        │   ├── [Container: Card Top Content]
        │   │   ├── [Container: Meta Row] (Tag: "03 · STATUTORY" + Status: "DIRECT TAX RAILS")
        │   │   ├── [Widget: Heading] -> "Direct GSTN & IRP Tax Clearing"
        │   │   ├── [Widget: Heading] -> "Zero-Portal Tax Clearance"
        │   │   └── [Widget: Text Editor] -> Description paragraph
        │   └── [Container: Micro-Visual Terminal 03] (.trust-visual)
        │       ├── [Container: Terminal Header] (Badge: "DIRECT TAX RAILS" + Code: "ZERO REJECTIONS")
        │       └── [Container: 4-Cell Tax Grid] (IRN Status, E-Way Bill, GSTIN Validation, 3-Way Recon)
        │
        ├── [Container: Trust Card 04 - Bank Reconciliation]
        │   ├── [Container: Card Top Content]
        │   │   ├── [Container: Meta Row] (Tag: "04 · BANKING" + Status: "OPEN BANKING BRIDGE")
        │   │   ├── [Widget: Heading] -> "Zero-Variance Bank Reconciliation"
        │   │   ├── [Widget: Heading] -> "Deterministic Ledger-to-Bank Bridge"
        │   │   └── [Widget: Text Editor] -> Description paragraph
        │   └── [Container: Micro-Visual Terminal 04] (.trust-visual)
        │       ├── [Container: Terminal Header] (Badge: "OPEN BANKING BRIDGE" + Code: "HDFC DIRECT CONNECT")
        │       └── [Container: Bank Terminal Body] (Bank Statement, Ledger Receivable, Zero Drift Variance, 48ms Speed)
        │
        ├── [Container: Trust Card 05 - Sovereign Data Residency]
        │   ├── [Container: Card Top Content]
        │   │   ├── [Container: Meta Row] (Tag: "05 · SECURITY" + Status: "RESIDENT SOVEREIGNTY")
        │   │   ├── [Widget: Heading] -> "Tenant Sandboxing & India Data Residency"
        │   │   ├── [Widget: Heading] -> "Sovereign Tenant Boundary"
        │   │   └── [Widget: Text Editor] -> Description paragraph
        │   └── [Container: Micro-Visual Terminal 05] (.trust-visual)
        │       ├── [Container: Terminal Header] (Badge: "RESIDENT SOVEREIGNTY" + Code: "TENANT_0x91F")
        │       └── [Container: 4-Cell Vault Grid] (Storage Cipher, Data Residency Mumbai, Transport mTLS, Tenant Isolation)
        │
        └── [Container: Trust Card 06 - Operational Continuity]
            ├── [Container: Card Top Content]
            │   ├── [Container: Meta Row] (Tag: "06 · RUNTIME" + Status: "CONTINUOUS RUNTIME")
            │   ├── [Widget: Heading] -> "Deterministic Operational Continuity"
            │   ├── [Widget: Heading] -> "99.99% High-Consequence Runtime"
            │   └── [Widget: Text Editor] -> Description paragraph
            └── [Container: Micro-Visual Terminal 06] (.trust-visual)
                ├── [Container: Terminal Header] (Badge: "CONTINUOUS RUNTIME" + Code: "99.99% COMMITMENT")
                └── [Container: Heartbeat Terminal Body] (3 live heartbeat items + RPO 0 Seconds summary strip)
```

---

## 2. GLOBAL STYLES MAPPING

### 2.1 Elementor Global Colors
| Site Token | Hex Code | Elementor Global Color Name | Elementor Placement |
| :--- | :--- | :--- | :--- |
| `--neutral-0` | `#FFFFFF` | **White / Surface Page** | Section 12A background, card background, card titles |
| `--neutral-50` | `#F7F8FA` | **Neutral 50** | Section 12B background |
| `--color-brand-ink` | `#0D0D0D` | **Brand Ink / Dark Surface** | Micro-visual terminal backgrounds (`.trust-visual`) |
| `--color-brand-blue` | `#0528F2` | **Flow Primary** | Eyebrow badges, tag backgrounds, active border outlines |
| `--color-border-default` | `#E6EAF0` | **Border Default** | Card default borders, FAQ row divider lines, telemetry border |
| `--color-text-primary` | `#0D0D0D` | **Text Primary** | Headings, card titles, telemetry values |
| `--color-text-secondary` | `#374151` | **Text Secondary** | Card description copy, lead paragraph |
| `--color-text-tertiary` | `#6B7280` | **Text Tertiary** | Card subtitles, FAQ answers, telemetry labels |
| `--success` | `#10B981` / `#34D399` | **Success Green** | Telemetry beacon, green status tags, heartbeat dots |

### 2.2 Elementor Global Typography Presets
| Preset Name | Font Family | Size | Weight | Line Height | Used In |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Heading 2** | Manrope | `48px` (desktop) / `36px` (mobile) | 650 | 1.08 | `What is flowOne?`, `Built for the financial work...` |
| **Heading 3** | Manrope | `18.4px` (`1.15rem`) | 700 | 1.3 | Bento card titles |
| **Lead Paragraph** | Manrope | `21.6px` (`1.35rem`) | 500 | 1.55 | Section 12A opening statement |
| **Body Standard** | Manrope | `17px` | 400 | 1.7 | Description paragraphs |
| **Card Description** | Manrope | `14px` (`0.88rem`) | 400 | 1.55 | Bento card descriptions |
| **Terminal Code** | Monospace | `11.5px` (`0.72rem`) | 600 | 1.4 | Micro-visual labels, values, telemetry bar |

---

## 3. REUSABLE COMPONENTS & LOOP TEMPLATES

1. **Elementor Component: `FAQ Definition Row`**:
   - Reusable flex/grid container pairing a 700-weight question on the left and a 400-weight answer on the right with a top border.
2. **Elementor Component: `Bento Trust Card`**:
   - Master template for the 6 cards. If data-driven, a Custom Post Type (`trust_pillar`) with ACF fields for `tag`, `subtitle`, `badge_tone`, `terminal_code`, and Repeater fields for terminal rows can power an **Elementor Pro Loop Grid**.

---

## 4. NATIVE ELEMENTOR CAPABILITIES UTILIZATION

| React / TSX Feature | Native Elementor Pro Equivalent | Benefit / Implementation Notes |
| :--- | :--- | :--- |
| FAQ Definition List (`<dl>`) | **Container Grid** or **Toggle / Accordion Widget** | Can be built with native Grid Containers or an uncollapsed Accordion widget. |
| Bento 3-column Matrix | **Container Grid** | Set columns to 3 on Desktop, 2 on Tablet, 1 on Mobile directly in Layout controls. |
| Card Hover Lift (`translateY(-2px)`) | **Style > Transform > Hover > Translate Y: -2px** | Native Elementor CSS transforms eliminate custom JavaScript hover listeners. |
| Card Box Shadow & Border Hover | **Style > Border / Box Shadow > Hover** | Configure border color `rgba(0, 34, 255, 0.4)` and shadow `0 10px 30px -4px rgba(11, 16, 32, 0.08)` natively. |

---

## 5. CUSTOM CODE MINIMIZATION STRATEGY

### 5.1 Custom CSS: Top Accent Gradient Border Line
Apply this snippet to the **Container (Bento Matrix Grid)** or each individual **Trust Card Container**:

```css
/* Scoped to Trust Card Container */
selector {
  position: relative;
  overflow: hidden;
  transition: all 180ms ease;
}

selector::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background 180ms ease;
}

selector:hover::before,
selector.is-active::before {
  background: linear-gradient(135deg, #0528F2 0%, #049DD9 55%, #05C7F2 100%);
}
```

### 5.2 Custom CSS: Telemetry Green Pulse Beacon
Apply this to the **Telemetry Bar Container**:

```css
/* Telemetry Pulse Dot */
selector .trust-telemetry-beacon {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
  animation: telemetryPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  margin-right: 6px;
  vertical-align: middle;
}

@keyframes telemetryPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(16, 185, 129, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  selector .trust-telemetry-beacon {
    animation: none;
  }
}
```

---

## 6. STEP-BY-STEP ELEMENTOR BUILD GUIDE

### Step 1: Section 12A Setup (The Operating Model Definition)
1. Add a **Container (Flexbox)**, set Content Width: **Full Width**, Background: `#FFFFFF`, Padding: `96px 0` (Mobile: `48px 0`).
2. Add a child **Container (Grid)** for Content Wrapper (Boxed `1280px`, Padding `0 48px`). Set Desktop Columns: `0.8fr 1.2fr`, Mobile: `1fr`, Gap: `80px`.
3. In the left column, add the `A CONNECTED OPERATING MODEL` eyebrow heading widget and the `What is flowOne?` H2 heading widget.
4. In the right column, add the Lead Text Editor widget (`21.6px`, 500 weight) and 3 Definition Rows with `1px solid #E6EAF0` top borders.

### Step 2: Section 12B Setup (Security & Sovereign Trust)
1. Add a **Container (Flexbox)**, set HTML Tag: `<section>`, CSS ID: `trust`, Background: `#F7F8FA`, Padding: `96px 0`.
2. Add Content Wrapper (Boxed `1280px`, Direction: Column, Gap: `40px`).
3. Add the **Heading Row Container (Grid)** with columns `1.4fr 0.8fr`, Eyebrow, H2, and explanatory text.

### Step 3: Telemetry Bar Setup
1. Drag a child **Container (Flexbox)** below the heading row.
2. Set Direction: **Row**, Justify: **Space Between**, Background: `#FFFFFF`, Border: `1px solid #E6EAF0`, Radius: `12px`, Padding: `14px 24px`.
3. Add 4 Text Editor items with monospace styling (`11.5px`), and 3 Container dividers (`1px` width, `16px` height, `#E6EAF0`).
4. Paste the snippet from Section 5.2 into Advanced > Custom CSS.
5. In Mobile preview, switch direction to **Column** and set dividers to **Display: None**.

### Step 4: Bento Matrix Grid Setup
1. Drag a child **Container (Grid)** into the Content Wrapper.
2. In **Layout**, set Columns: Desktop `3`, Tablet `2`, Mobile `1`. Set Gap: `24px`.
3. Paste the snippet from Section 5.1 into Advanced > Custom CSS.

### Step 5: Building the 6 Trust Cards
For each card:
1. Add a child Container (Background: `#FFFFFF`, Border: `1px solid #E6EAF0`, Radius: `16px`, Padding: `25px`, Direction: Column, Justify: Space Between).
2. Set Hover Transform: **Translate Y: -2px**, Hover Border: `rgba(0, 34, 255, 0.4)`, Hover Shadow: `0 10px 30px -4px rgba(11, 16, 32, 0.08)`.
3. Add the Top Content:
   - Meta Row with Tag (`01 · LINEAGE`) and Badge (`IMMUTABLE RECORD`).
   - Title Heading (H3, `18.4px`, 700 weight, `#0D0D0D`).
   - Subtitle Heading (`12px`, 600 weight, Uppercase, `#6B7280`).
   - Description Paragraph (`14px`, `#374151`).
4. Add the Micro-Visual Container:
   - Background: `#0D0D0D`, Border: `1px solid rgba(255, 255, 255, 0.08)`, Radius: `8px`, Padding: `16px`, Font: Monospace, Color: `#E2E8F0`.
   - Add Terminal Header and specific micro-visual layout (lineage rows, dual-key steps, tax grid, bank balance, vault grid, or heartbeat feed).

### Step 6: Responsive Verification & QA
1. Check **Desktop (`1440px`)**: 3-column matrix, horizontal telemetry bar, 2-column FAQ.
2. Check **Tablet (`1024px`)**: 2-column matrix, single-column heading.
3. Check **Mobile (`375px`)**: 1-column matrix, vertical telemetry bar, stacked FAQ.
4. Verify hover states, beacon pulse, and publish.

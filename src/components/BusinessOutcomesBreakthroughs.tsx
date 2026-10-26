import React, { memo, useEffect, useRef } from "react";
import "./business-outcomes-breakthroughs.css";

/* ==========================================================================
   Section 07 — Business Outcomes
   Direction 02 — "02 — One Business. Four Breakthroughs."
   Creative Direction: Asymmetric editorial composition with connected thread
   Motion: Subtle entrance sequence, primarily static
   ========================================================================== */

interface BreakthroughItem {
  id: string;
  num: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const breakthroughsData: BreakthroughItem[] = [
  {
    id: "cashflow",
    num: "01",
    title: "Cashflow visibility",
    description: "Understand what is due, what is delayed and where attention is needed.",
    illustration: (
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden="true">
        <line x1="2" y1="8" x2="54" y2="8" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="18" x2="54" y2="18" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="28" x2="54" y2="28" stroke="#DCEBFA" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="8" r="2.5" fill="#94A3B8" />
        <circle cx="34" cy="18" r="2.5" fill="#64748B" />
        <circle cx="44" cy="28" r="3.5" fill="#185FA5" />
      </svg>
    ),
  },
  {
    id: "execution",
    num: "02",
    title: "Smoother execution",
    description: "Keep transactions moving with clearer handoffs across teams.",
    illustration: (
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden="true">
        <line x1="10" y1="18" x2="46" y2="18" stroke="#E5E8FA" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="18" x2="34" y2="18" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="18" r="4" fill="#FFFFFF" stroke="#534AB7" strokeWidth="1.5" />
        <circle cx="28" cy="18" r="4" fill="#FFFFFF" stroke="#534AB7" strokeWidth="1.5" />
        <circle cx="46" cy="18" r="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "control",
    num: "03",
    title: "Stronger control",
    description: "Trace financial activity through its records, supporting documents and exceptions.",
    illustration: (
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="20" height="24" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="10" y1="12" x2="22" y2="12" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="17" x2="19" y2="17" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 18 H36 C40 18, 42 14, 46 14" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="26" cy="18" r="1.5" fill="#185FA5" />
        <rect x="42" y="8" width="12" height="12" rx="2" fill="#FFFFFF" stroke="#185FA5" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "decisions",
    num: "04",
    title: "Confident decisions",
    description: "Bring financial signals and operational context together before taking action.",
    illustration: (
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden="true">
        <path d="M6 10 C20 10, 26 18, 42 18" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 26 C20 26, 26 18, 42 18" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="10" r="2" fill="#185FA5" />
        <circle cx="6" cy="26" r="2" fill="#534AB7" />
        <circle cx="44" cy="18" r="3.5" fill="#185FA5" stroke="#FFFFFF" strokeWidth="1" />
      </svg>
    ),
  },
];

export const BusinessOutcomesBreakthroughs = memo(function BusinessOutcomesBreakthroughs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-entered");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-entered");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="business-outcomes"
      ref={sectionRef}
      className="fo-breakthroughs-section"
      aria-labelledby="fo-breakthroughs-heading"
    >
      <div className="fo-breakthroughs__container">
        <div className="fo-breakthroughs__layout">
          {/* ==============================================================
              LEFT COLUMN: EDITORIAL STATEMENT (~42%)
              Left-aligned with generous whitespace and intentional wrap
              ============================================================== */}
          <aside className="fo-breakthroughs__intro" aria-label="Business Outcomes Statement">
            <div className="hero-eyebrow-container" style={{ marginBottom: "0.25rem" }}>
              <div className="hero-modern-eyebrow is-static" role="note" aria-label="Business Outcomes">
                <span className="hero-eyebrow-badge">
                  <span className="hero-eyebrow-spark" aria-hidden="true">✦</span>
                  <span>OUTCOMES</span>
                </span>
                <span className="hero-eyebrow-title">BUSINESS OUTCOMES</span>
                <span className="hero-eyebrow-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <h2 id="fo-breakthroughs-heading" className="fo-breakthroughs__heading">
              The impact isn’t isolated.<br />
              It’s connected.
            </h2>

            <p className="fo-breakthroughs__copy">
              When finance and operations share context, improvements in one part of the business can support the next.
            </p>
          </aside>

          {/* ==============================================================
              RIGHT COLUMN: FOUR CONNECTED OUTCOME ROWS (~58%)
              Connected by the signature thread starting at Node 01, ending at Node 04
              ============================================================== */}
          <main className="fo-breakthroughs__outcomes-col" aria-label="Four connected business outcomes">
            <ol className="fo-breakthroughs__list">
              {breakthroughsData.map((item, index) => (
                <li
                  key={item.id}
                  className="fo-breakthrough-row"
                  aria-labelledby={`fo-breakthrough-title-${item.id}`}
                >
                  {/* Sequence Number & Connected Thread Node */}
                  <div className="fo-breakthrough-thread-col" aria-hidden="true">
                    {/* Continuous vertical thread segment */}
                    <div className="fo-breakthrough-thread-line" />

                    {/* Small Node Marker */}
                    <div className="fo-breakthrough-node-wrap">
                      <span className="fo-breakthrough-node" />
                    </div>

                    {/* Number: 01, 02, 03, 04 */}
                    <span className="fo-breakthrough-seq-num">{item.num}</span>
                  </div>

                  {/* Text Column: Title & Description */}
                  <div className="fo-breakthrough-text-col">
                    <h3 id={`fo-breakthrough-title-${item.id}`} className="fo-breakthrough-title">
                      {item.title}
                    </h3>
                    <p className="fo-breakthrough-desc">
                      {item.description}
                    </p>
                  </div>

                  {/* Optional Micro-Illustration Column */}
                  <div className="fo-breakthrough-visual-col" aria-hidden="true">
                    <div className="fo-micro-illustration">
                      {item.illustration}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </main>
        </div>
      </div>
    </section>
  );
});

export default BusinessOutcomesBreakthroughs;

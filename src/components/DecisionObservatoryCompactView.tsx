import React, { memo, useState } from "react";
import { signalsData, SignalId } from "./DecisionObservatorySection";
import "./decision-observatory-compact.css";

/**
 * Compact view for the Decision Observatory.
 *
 * Layout:
 *  - Sticky causal relationship banner (full width).
 *  - Left vertical stepper lists business signals.
 *  - Right panel shows Impact & Decision cards for the selected signal.
 *  - Each card uses an accordion to reveal full narrative on demand.
 */
export const DecisionObservatoryCompactView = memo(function DecisionObservatoryCompactView() {
  const [selectedSignalId, setSelectedSignalId] = useState<SignalId>("supplier-payments");
  const [openAccordion, setOpenAccordion] = useState<"impact" | "decision" | null>(null);

  const currentSignal = signalsData.find((s) => s.id === selectedSignalId) ?? signalsData[0];

  const toggleAccordion = (panel: "impact" | "decision") => {
    setOpenAccordion((prev) => (prev === panel ? null : panel));
  };

  return (
    <section
      id="decision-observatory-compact"
      className="fo-decision-observatory fo-decision-observatory--compact"
      aria-label="Section: Predictive Business Decisions — Observatory Compact View"
    >
      {/* Sticky causal banner */}
      <div className="fo-causal-banner sticky top-0 bg-white shadow-sm z-10 p-4" role="region" aria-label="Causal Relationship Context">
        <div className="fo-causality-header-row flex items-center justify-between">
          <div className="fo-causality-tag flex items-center">
            <span className="fo-causality-beacon" aria-hidden="true" />
            <span className="fo-causality-kicker">CAUSAL RELATIONSHIP</span>
          </div>
          <div className="fo-causality-signal-meta flex items-center gap-2">
            <span className="fo-causality-entity">{currentSignal.entity}</span>
            <span className="fo-causality-metric-pill">{currentSignal.metric}</span>
          </div>
        </div>
        <p className="fo-causality-lead-sentence mt-2 text-gray-700">
          {currentSignal.primaryCausalitySentence}
        </p>
        {currentSignal.relationshipNotes.length > 0 && (
          <div className="fo-causality-chains mt-3">
            <span className="fo-chains-label font-medium">Downstream Dependencies:</span>
            <div className="fo-chains-list flex flex-wrap gap-2 mt-1">
              {currentSignal.relationshipNotes.map((r) => {
                const target = signalsData.find((s) => s.id === r.targetId);
                return (
                  <span key={r.targetId} className="fo-chain-chip border border-gray-200 rounded px-2 py-1 text-sm">
                    <strong className="fo-chain-target">{target?.name}</strong>
                    <span className="fo-chain-rel text-gray-500"> ({r.relationLabel})</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main layout – stepper + content */}
      <div className="fo-compact-main grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 mt-6">
        {/* Stepper */}
        <nav className="fo-stepper flex flex-col gap-2" aria-label="Business Signals Selector">
          {signalsData.map((sig, idx) => {
            const isActive = sig.id === selectedSignalId;
            return (
              <button
                key={sig.id}
                type="button"
                role="button"
                aria-pressed={isActive}
                className={`fo-stepper-item flex items-center gap-2 px-3 py-2 rounded-lg ${isActive ? "bg-primary-100 text-primary-800" : "bg-gray-50 hover:bg-gray-100"}`}
                onClick={() => setSelectedSignalId(sig.id)}
              >
                <span className="fo-stepper-number font-medium">{`0${idx + 1}`}</span>
                <span className="fo-stepper-label text-sm font-medium">{sig.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Content panel */}
        <div className="fo-compact-content space-y-8">
          {/* Impact Card */}
          <article
            className="fo-card fo-card-impact border rounded-lg overflow-hidden"
            aria-label="Potential Business Impact Panel"
          >
            <header className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion("impact")} role="button" aria-expanded={openAccordion === "impact"}>
              <h3 className="text-lg font-semibold">POTENTIAL BUSINESS IMPACT — {currentSignal.category}</h3>
              <span className="fo-accordion-icon" aria-hidden="true">{openAccordion === "impact" ? "▾" : "▸"}</span>
            </header>
            <div className={`px-4 py-3 ${openAccordion === "impact" ? "block" : "hidden"}`} role="region" aria-label="Impact details">
              <h4 className="text-xl font-bold mb-2">{currentSignal.impactHeadline}</h4>
              <div className="fo-metric-highlight flex items-baseline gap-2 mb-3">
                <div className="fo-metric-value text-4xl font-bold">{currentSignal.impactMetricVal}</div>
                <div className="fo-metric-subtext text-sm text-gray-500">{currentSignal.impactSubmetric}</div>
              </div>
              <p className="text-gray-700 mb-3">{currentSignal.impactSummary}</p>
              {currentSignal.ripples.length > 0 && (
                <section className="fo-ripples-deck mt-2">
                  <span className="fo-ripples-heading font-medium">DOWNSTREAM CONSEQUENCE RIPPLES</span>
                  <div className="grid gap-2 mt-1">
                    {currentSignal.ripples.map((rip, i) => (
                      <div key={i} className="fo-ripple-card border border-gray-200 rounded p-2">
                        <span className="fo-ripple-number font-mono text-sm mr-2">0{i + 1}</span>
                        <div className="inline-block">
                          <strong className="block font-medium">{rip.title}</strong>
                          <p className="text-sm text-gray-600">{rip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>

          {/* Decision Card */}
          <article
            className="fo-card fo-card-decision border rounded-lg overflow-hidden"
            aria-label="Decision to Consider Panel"
          >
            <header className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion("decision")} role="button" aria-expanded={openAccordion === "decision"}>
              <h3 className="text-lg font-semibold">DECISION TO CONSIDER — {currentSignal.strategicTag}</h3>
              <span className="fo-accordion-icon" aria-hidden="true">{openAccordion === "decision" ? "▾" : "▸"}</span>
            </header>
            <div className={`px-4 py-3 ${openAccordion === "decision" ? "block" : "hidden"}`} role="region" aria-label="Decision details">
              <h4 className="text-xl font-bold mb-2">{currentSignal.decisionActionTitle}</h4>
              <p className="mb-3 text-gray-700">{currentSignal.decisionActionDesc}</p>
              <div className="fo-rationale-callout border-l-4 border-primary-600 pl-3 mb-3">
                <strong className="block font-medium mb-1">Why this option may help:</strong>
                <p className="text-sm text-gray-600">{currentSignal.decisionRationale}</p>
              </div>
              <div className="fo-decision-chips-grid grid grid-cols-2 gap-4">
                <div className="fo-decision-chip border p-3 rounded">
                  <span className="fo-chip-eyebrow block text-xs text-gray-500">Operational Feasibility</span>
                  <strong className="fo-chip-metric block text-lg font-semibold">{currentSignal.feasibility}</strong>
                </div>
                <div className="fo-decision-chip border p-3 rounded">
                  <span className="fo-chip-eyebrow block text-xs text-gray-500">Simulated Outcome</span>
                  <strong className="fo-chip-metric block text-lg font-semibold">{currentSignal.simulationDelta}</strong>
                </div>
              </div>
              <div className="fo-governance-guardrail mt-4 flex items-center gap-2 text-sm text-gray-600">
                <span className="fo-guardrail-badge" aria-hidden="true">🛡</span>
                <strong>Operator Governance · Human‑in‑the‑Loop</strong>
                <span>Grounded in Transaction TXN-10482 Context · Awaiting Human Confirmation</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
});

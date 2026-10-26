import { useState, useEffect, lazy, Suspense } from "react";
import Homepage from "./Homepage";
import NewHomepage from "./NewHomepage";
import FinalHomepage from "./FinalHomepage";
import FlowoneFinal from "./FlowoneFinal";

const MegaMenuHandoffViewer = lazy(() => import("./components/MegaMenuHandoffViewer"));

export default function App() {
  // Support URL-based switching via ?view=final or ?view=flowone-final or ?view=new or ?view=classic or ?view=megamenu
  const [view, setView] = useState<"final" | "flowone-final" | "new" | "classic" | "megamenu">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("view");
      if (v === "final" || window.location.pathname === "/final") return "final";
      if (v === "flowone-final" || window.location.pathname === "/flowone-final") return "flowone-final";
      if (v === "new" || window.location.pathname === "/new") return "new";
      if (v === "classic" || window.location.pathname === "/classic") return "classic";
      if (v === "megamenu" || window.location.pathname === "/megamenu") return "megamenu";
    }
    return "final"; // Default to Final Homepage for edits
  });

  const [switcherVisible, setSwitcherVisible] = useState(true);

  // Sync browser URL when switching view
  const handleSwitch = (nextView: "final" | "flowone-final" | "new" | "classic" | "megamenu") => {
    setView(nextView);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", nextView);
      window.history.replaceState({}, "", url.toString());
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("view");
      if (v === "classic") setView("classic");
      else if (v === "megamenu") setView("megamenu");
      else if (v === "new") setView("new");
      else if (v === "flowone-final") setView("flowone-final");
      else setView("final");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      {view === "final" ? (
        <FinalHomepage />
      ) : view === "flowone-final" ? (
        <FlowoneFinal />
      ) : view === "new" ? (
        <NewHomepage />
      ) : view === "megamenu" ? (
        <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "#64748B" }}>Loading Mega Menu Spec...</div>}>
          <MegaMenuHandoffViewer />
        </Suspense>
      ) : (
        <Homepage />
      )}

      {/* Development & Review Switcher Toolbar */}
      {switcherVisible ? (
        <div className="flowone-page-switcher" role="navigation" aria-label="Page version comparison switcher">
          <span className="flowone-switcher-tag">
            <span className="flowone-switcher-dot" aria-hidden="true" />
            VIEW:
          </span>
          <button
            type="button"
            className={`flowone-switcher-btn ${view === "final" ? "is-active" : ""}`}
            onClick={() => handleSwitch("final")}
            aria-pressed={view === "final"}
          >
            Final Home (Editable)
          </button>
          <button
            type="button"
            className={`flowone-switcher-btn ${view === "flowone-final" ? "is-active" : ""}`}
            onClick={() => handleSwitch("flowone-final")}
            aria-pressed={view === "flowone-final"}
          >
            Flowone Final
          </button>
          <button
            type="button"
            className={`flowone-switcher-btn ${view === "new" ? "is-active" : ""}`}
            onClick={() => handleSwitch("new")}
            aria-pressed={view === "new"}
          >
            New Homepage
          </button>
          <button
            type="button"
            className={`flowone-switcher-btn ${view === "megamenu" ? "is-active" : ""}`}
            onClick={() => handleSwitch("megamenu")}
            aria-pressed={view === "megamenu"}
          >
            Mega Menu Spec
          </button>
          <button
            type="button"
            className={`flowone-switcher-btn ${view === "classic" ? "is-active" : ""}`}
            onClick={() => handleSwitch("classic")}
            aria-pressed={view === "classic"}
          >
            Classic Homepage
          </button>
          <button
            type="button"
            className="flowone-switcher-btn"
            style={{ padding: "0.2rem 0.45rem", opacity: 0.6 }}
            onClick={() => setSwitcherVisible(false)}
            aria-label="Hide switcher"
            title="Hide switcher widget"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSwitcherVisible(true)}
          className="flowone-page-switcher"
          style={{ cursor: "pointer", opacity: 0.8 }}
          title="Show version switcher"
        >
          <span className="flowone-switcher-dot" aria-hidden="true" />
          <span style={{ padding: "0.2rem 0.5rem", color: "#CBD5E1", fontSize: "0.62rem", fontWeight: 700 }}>
            {view === "flowone-final" ? "Flowone Final" : view === "new" ? "New Homepage" : view === "final" ? "Final Home" : "Classic Homepage"} ⇄
          </span>
        </button>
      )}
    </>
  );
}

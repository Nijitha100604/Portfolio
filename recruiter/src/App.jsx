import { useCallback, useState } from "react";
import { SECTION_IDS } from "./config/sections";
import { usePortfolio } from "./context/PortfolioContext";
import useScrollSpy from "./hooks/useScrollSpy";
import ToggleButton from "./components/layout/ToggleButton";
import Sidebar from "./components/layout/Sidebar";
import ScrollProgress from "./components/layout/ScrollProgress";
import Footer from "./components/layout/Footer";
import ErrorState from "./components/common/ErrorState";
import Home from "./sections/Home";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Certifications from "./sections/Certifications";
// import Activities from "./sections/Activities";
import Contact from "./sections/Contact";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, slow, error, reload } = usePortfolio();
  const active = useScrollSpy(SECTION_IDS, !!error);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the sidebar first, then glide to the section once the panel is sliding away.
  const navigate = useCallback((id) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }, 260);
  }, []);

  return (
    <>
      <ScrollProgress />
      <ToggleButton open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
      <Sidebar open={menuOpen} active={active} onClose={closeMenu} onNavigate={navigate} />

      <main>
        {error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : (
          <>
            <Home />
            <Education />
            <Projects />
            <Skills />
            <Certifications />
            {/* <Activities /> */}
            <Contact />
          </>
        )}
      </main>

      <Footer />

      {loading && slow && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[65] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl bg-ink px-5 py-3 text-center text-sm text-white shadow-lg"
        >
          Waking up the server. The first visit can take up to a minute.
        </div>
      )}
    </>
  );
}

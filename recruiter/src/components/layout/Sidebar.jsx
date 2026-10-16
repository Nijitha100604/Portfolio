import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS } from "../../config/sections";
import { usePortfolio } from "../../context/PortfolioContext";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

export default function Sidebar({ open, active, onClose, onNavigate }) {
  const { profile } = usePortfolio();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-ink/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />
      )}
      {open && (
        <motion.aside
          key="panel"
          id="site-menu"
          aria-label="Site navigation"
          className="fixed inset-y-0 left-0 z-50 flex w-[78%] max-w-[280px] flex-col bg-surface pt-20 shadow-xl"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        >
          {profile?.name && <p className="px-6 pb-5 font-display text-xl">{profile.name}</p>}
          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            <ul className="space-y-1">
              {SECTIONS.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(id);
                      }}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
                        isActive ? "bg-tint text-accent-deep" : "text-ink hover:bg-page"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

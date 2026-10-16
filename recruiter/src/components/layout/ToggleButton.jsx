import { FiMenu, FiX } from "react-icons/fi";

export default function ToggleButton({ open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu"
      className="fixed left-4 top-4 z-[55] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
    >
      {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
    </button>
  );
}

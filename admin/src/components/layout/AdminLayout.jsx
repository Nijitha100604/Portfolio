import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FiHome, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { RESOURCES } from "../../config/resources";

const NAV = [
  { to: "/", label: "Dashboard", icon: FiHome, end: true },
  { to: "/profile", label: "Profile", icon: FiUser },
  ...RESOURCES.map((r) => ({ to: `/${r.key}`, label: r.title, icon: r.icon })),
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen">
      {open && <div aria-hidden="true" className="fixed inset-0 z-30 bg-ink/50 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="px-6 py-5 font-display text-xl font-semibold">Portfolio admin</p>
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="space-y-1">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                      isActive ? "bg-tint text-accent-deep" : "text-ink hover:bg-page"
                    }`
                  }
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur sm:px-8">
          <button type="button" className="icon-btn md:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <FiMenu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:block">{admin?.email}</span>
            <button type="button" className="btn btn-quiet" onClick={logout}>
              <FiLogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

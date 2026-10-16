import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchPortfolio } from "../api/portfolio";

const PortfolioContext = createContext(null);

const EMPTY = {
  profile: null,
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  activities: [],
};

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSlow(false);
    // Show a "waking up" notice if the server takes more than 5 seconds.
    const timer = setTimeout(() => setSlow(true), 5000);
    try {
      setData(await fetchPortfolio());
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "The server did not respond.");
    } finally {
      clearTimeout(timer);
      setSlow(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <PortfolioContext.Provider value={{ ...data, loading, slow, error, reload: load }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}

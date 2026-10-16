import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import client, { clearToken, getToken, setToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(!!getToken()); // true while we verify a saved token

  // On page load, confirm the saved token is still valid.
  useEffect(() => {
    if (!getToken()) return;
    client
      .get("/auth/me")
      .then((res) => setAdmin(res.data))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  // Fired by the API client when the server says the token is no longer valid.
  useEffect(() => {
    const onExpired = () => {
      setAdmin(null);
      toast.error("Your session expired. Please log in again.");
    };
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await client.post("/auth/login", { email, password });
    setToken(data.token);
    setAdmin(data.admin);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, checking, login, logout }}>{children}</AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/common/Spinner";

export default function Login() {
  const { admin, checking, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const from = location.state?.from || "/";

  if (!checking && admin) return <Navigate to={from} replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form onSubmit={submit} noValidate className="w-full max-w-sm rounded-xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="font-display text-3xl font-semibold">Admin login</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage your portfolio.</p>

        <label htmlFor="email" className="mb-1.5 mt-6 block text-sm font-medium">
          Email
        </label>
        <input id="email" type="email" autoComplete="username" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password" className="mb-1.5 mt-4 block text-sm font-medium">
          Password
        </label>
        <input id="password" type="password" autoComplete="current-password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-danger-tint px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary mt-6 w-full" disabled={busy}>
          {busy && <Spinner className="h-4 w-4" />}
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

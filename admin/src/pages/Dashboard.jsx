import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiUser } from "react-icons/fi";
import client from "../api/client";
import { RESOURCES } from "../config/resources";
import Spinner from "../components/common/Spinner";

const RECRUITER_URL = import.meta.env.VITE_RECRUITER_URL;

export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [profileName, setProfileName] = useState(null);

  useEffect(() => {
    Promise.allSettled([...RESOURCES.map((r) => client.get(r.endpoint)), client.get("/profile")]).then((results) => {
      const next = {};
      RESOURCES.forEach((r, i) => {
        next[r.key] = results[i].status === "fulfilled" ? results[i].value.data.length : null;
      });
      setCounts(next);
      const profile = results[RESOURCES.length];
      setProfileName(profile.status === "fulfilled" ? profile.value.data?.name || "" : null);
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Everything you add here appears on the recruiter site.</p>

      {!counts ? (
        <div className="grid place-items-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/profile" className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-tint text-accent-deep">
                <FiUser className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-xl font-semibold">Profile</p>
              <p className="text-sm text-muted">{profileName ? `Set up for ${profileName}` : "Not set up yet"}</p>
            </Link>

            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <Link key={r.key} to={`/${r.key}`} className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-tint text-accent-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-display text-xl font-semibold">{r.title}</p>
                  <p className="text-sm text-muted">{counts[r.key] === null ? "Could not load" : `${counts[r.key]} ${counts[r.key] === 1 ? "item" : "items"}`}</p>
                </Link>
              );
            })}
          </div>

          {RECRUITER_URL && (
            <a href={RECRUITER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-quiet mt-8">
              <FiExternalLink className="h-4 w-4" />
              View recruiter site
            </a>
          )}
        </>
      )}
    </div>
  );
}

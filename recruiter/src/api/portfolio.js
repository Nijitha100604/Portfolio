import client from "./client";

const ENDPOINTS = {
  profile: "/profile",
  education: "/education",
  skills: "/skills",
  projects: "/projects",
  certifications: "/certifications",
  activities: "/activities",
};

// Fetches everything in parallel. If some requests fail, the rest still show.
export async function fetchPortfolio() {
  const keys = Object.keys(ENDPOINTS);
  const results = await Promise.allSettled(keys.map((k) => client.get(ENDPOINTS[k])));

  if (results.every((r) => r.status === "rejected")) {
    throw results[0].reason;
  }

  const data = {};
  keys.forEach((key, i) => {
    const r = results[i];
    data[key] = r.status === "fulfilled" ? r.value.data : key === "profile" ? null : [];
  });
  return data;
}

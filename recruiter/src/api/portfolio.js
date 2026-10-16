import client from "./client";
import profile from "../docs/profile";
import skills from "../docs/skills";
import projects from "../docs/projects";
import certifications from "../docs/certifications";
import activities from "../docs/activities";
import education_details from "../docs/education";

const byOrder = (list) => [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// Saved copy of your content, used when the API cannot be reached.
const FALLBACK = {
  profile,
  education: byOrder(education_details),
  skills,
  projects: byOrder(projects),
  certifications: byOrder(certifications),
  activities,
};


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

  const data = {};
  let usingFallback = false;

  keys.forEach((key, i) => {
    const result = results[i];
    if (result.status === "fulfilled") {
      data[key] = result.value.data;
    } else {
      data[key] = FALLBACK[key]; // this request failed, so use the saved copy
      usingFallback = true;
    }
  });

  if (usingFallback) console.warn("API unreachable: showing saved content from src/docs.");
  return { ...data, usingFallback };
}
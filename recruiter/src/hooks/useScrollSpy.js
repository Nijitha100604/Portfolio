import { useEffect, useState } from "react";

// Returns the id of the section currently in the middle of the viewport.
// `refreshKey` re-attaches the observer if sections are unmounted and remounted.
export default function useScrollSpy(ids, refreshKey) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return active;
}

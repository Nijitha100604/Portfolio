import { useMemo } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Section from "../components/common/Section";
import Skeleton from "../components/common/Skeleton";

const CATEGORY_ORDER = ["AI/GenAI", "Full-Stack", "Languages", "Databases", "Tools"];
const rank = (c) => {
  const i = CATEGORY_ORDER.indexOf(c);
  return i === -1 ? 99 : i;
};

export default function Skills() {
  const { skills, loading } = usePortfolio();

  const groups = useMemo(() => {
    const byCategory = {};
    skills.forEach((s) => {
      (byCategory[s.category] ||= []).push(s);
    });
    return Object.keys(byCategory)
      .sort((a, b) => rank(a) - rank(b))
      .map((category) => ({ category, items: byCategory[category] }));
  }, [skills]);

  return (
    <Section id="skills" title="Skills">
      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-16" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <p className="text-muted">Skills will appear here soon.</p>
      ) : (
        <dl className="divide-y divide-line border-y border-line">
          {groups.map(({ category, items }) => (
            <div key={category} className="grid gap-3 py-6 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="font-display text-xl font-medium">{category}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li key={skill._id} className="chip">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}

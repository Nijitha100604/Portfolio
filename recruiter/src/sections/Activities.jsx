import { usePortfolio } from "../context/PortfolioContext";
import Section from "../components/common/Section";
import Skeleton from "../components/common/Skeleton";

export default function Activities() {
  const { activities, loading } = usePortfolio();

  return (
    <Section id="activities" title="Activities" intro="Papers, competitions and achievements.">
      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2].map((n) => (
            <Skeleton key={n} className="h-20" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-muted">Activities will appear here soon.</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {activities.map((a) => (
            <li key={a._id} className="grid gap-2 py-6 md:grid-cols-[96px_1fr] md:gap-8">
              <p className="font-display text-xl font-medium text-accent-deep">{a.year}</p>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-medium leading-snug">{a.title}</h3>
                  <span className="rounded-full bg-tint px-3 py-0.5 text-sm text-accent-deep">{a.type}</span>
                </div>
                {a.event && <p className="mt-1 text-sm text-muted">{a.event}</p>}
                {a.description && <p className="mt-2 max-w-[68ch] text-muted">{a.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

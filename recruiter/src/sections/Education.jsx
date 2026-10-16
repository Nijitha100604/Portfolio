import { usePortfolio } from "../context/PortfolioContext";
import Section from "../components/common/Section";
import Skeleton from "../components/common/Skeleton";

function EducationCard({ item }) {
  const isCgpa = item.scoreType === "CGPA";
  const years = [item.startYear, item.endYear].filter(Boolean).join(" to ");

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
      <span className="w-fit rounded-full bg-tint px-3 py-1 text-sm font-semibold text-accent-deep">
        {item.level}
      </span>
      <h3 className="mt-4 font-display text-xl font-medium leading-snug">{item.institution}</h3>
      {item.degree && <p className="mt-1 text-muted">{item.degree}</p>}
      {years && <p className="mt-1 text-sm text-muted">{years}</p>}
      <div className="mt-auto border-t border-line pt-5">
        <p className="font-display text-3xl font-medium">
          {item.score}
          {!isCgpa && "%"}
        </p>
        <p className="text-sm text-muted">{isCgpa ? "CGPA" : "Percentage"}</p>
      </div>
    </article>
  );
}

export default function Education() {
  const { education, loading } = usePortfolio();

  return (
    <Section id="education" title="Education">
      {loading ? (
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((n) => (
            <Skeleton key={n} className="h-56" />
          ))}
        </div>
      ) : education.length === 0 ? (
        <p className="text-muted">Education details will appear here soon.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {education.map((item) => (
            <EducationCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
}

import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Section from "../components/common/Section";
import Skeleton from "../components/common/Skeleton";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";

export default function Projects() {
  const { projects, loading } = usePortfolio();
  const [selected, setSelected] = useState(null);

  return (
    <Section id="projects" title="Projects" intro="Selected work in full-stack development and applied AI.">
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((n) => (
            <Skeleton key={n} className="h-72" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-muted">Projects will appear here soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} onOpen={setSelected} />
          ))}
        </div>
      )}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

import { optimizeImage } from "../../utils/cloudinary";

export default function ProjectCard({ project, onOpen }) {
  const tech = project.techStack || [];
  const extra = tech.length - 4;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      {project.images?.[0] && (
        <img
          src={optimizeImage(project.images[0], 700)}
          alt={`${project.title} preview`}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-medium leading-snug">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-muted">{project.shortDescription}</p>
        {tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tech.slice(0, 4).map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
            {extra > 0 && <li className="chip text-muted">+{extra} more</li>}
          </ul>
        )}
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Read more about ${project.title}`}
          className="mt-6 w-fit font-semibold text-accent-deep underline-offset-4 hover:underline"
        >
          Read more...
        </button>
      </div>
    </article>
  );
}

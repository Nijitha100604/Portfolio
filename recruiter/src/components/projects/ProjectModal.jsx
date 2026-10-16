import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import Modal from "../common/Modal";
import { optimizeImage } from "../../utils/cloudinary";

function Gallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (step) => setIndex((i) => (i + step + count) % count);
  const arrow =
    "absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-ink shadow transition-colors hover:text-accent";

  return (
    <div className="bg-page">
      <div className="relative aspect-video">
        <img
          src={optimizeImage(images[index], 1200)}
          alt={`${title} screenshot ${index + 1} of ${count}`}
          className="h-full w-full object-contain"
        />
        {count > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`${arrow} left-3`}>
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(1)} className={`${arrow} right-3`}>
              <FiChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="flex justify-center gap-2 py-3">
          {images.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Show image ${n + 1}`}
              onClick={() => setIndex(n)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${n === index ? "bg-accent" : "bg-line"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// `project` is null when closed. We remember the last one so the
// content doesn't vanish while the closing animation plays.
export default function ProjectModal({ project, onClose }) {
  const last = useRef(null);
  if (project) last.current = project;
  const p = project || last.current;

  return (
    <Modal open={!!project} onClose={onClose} title={p?.title || "Project details"}>
      {p && (
        <div>
          {p.images?.length > 0 && <Gallery key={p._id} images={p.images} title={p.title} />}
          <div className={`p-6 sm:p-8 ${p.images?.length ? "" : "pt-14"}`}>
            <h3 className="font-display text-2xl font-medium leading-snug sm:text-3xl">{p.title}</h3>

            {(p.role || p.duration) && (
              <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2 text-sm">
                {p.role && (
                  <div>
                    <dt className="text-muted">Role</dt>
                    <dd className="font-medium">{p.role}</dd>
                  </div>
                )}
                {p.duration && (
                  <div>
                    <dt className="text-muted">Duration</dt>
                    <dd className="font-medium">{p.duration}</dd>
                  </div>
                )}
              </dl>
            )}

            <p className="mt-6 max-w-[68ch] whitespace-pre-line leading-relaxed text-muted">
              {p.fullDescription || p.shortDescription}
            </p>

            {p.features?.length > 0 && (
              <>
                <h4 className="mt-8 font-display text-lg font-medium">Key features</h4>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {p.techStack?.length > 0 && (
              <>
                <h4 className="mt-8 font-display text-lg font-medium">Tech stack</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.techStack.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {(p.githubUrl || p.liveUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FaGithub aria-hidden="true" className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-quiet">
                    <FiExternalLink aria-hidden="true" className="h-4 w-4" />
                    Live demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

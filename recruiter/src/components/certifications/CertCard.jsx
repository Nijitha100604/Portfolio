import { FiEye } from "react-icons/fi";

export default function CertCard({ cert, onView }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
      <h3 className="font-display text-xl font-medium leading-snug">{cert.name}</h3>
      {cert.issuer && <p className="mt-1 text-muted">{cert.issuer}</p>}
      {cert.issueDate && <p className="mt-1 text-sm text-muted">Issued {cert.issueDate}</p>}
      <button
        type="button"
        onClick={() => onView(cert)}
        aria-label={`View certificate: ${cert.name}`}
        className="btn btn-quiet mt-auto w-fit self-start"
      >
        <FiEye aria-hidden="true" className="h-4 w-4" />
        View certificate
      </button>
    </article>
  );
}

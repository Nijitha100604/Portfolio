import { useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import Modal from "../common/Modal";
import { optimizeImage } from "../../utils/cloudinary";

// `cert` is null when closed. We remember the last one for the closing animation.
export default function CertModal({ cert, onClose }) {
  const last = useRef(null);
  if (cert) last.current = cert;
  const c = cert || last.current;

  return (
    <Modal open={!!cert} onClose={onClose} title={c?.name || "Certificate"}>
      {c && (
        <div className="p-5 pt-14 sm:p-8 sm:pt-14">
          <h3 className="pr-4 font-display text-2xl font-medium leading-snug">{c.name}</h3>
          {c.issuer && <p className="mt-1 text-muted">{c.issuer}</p>}
          <div className="mt-5 flex justify-center rounded-lg bg-page p-2 sm:p-4">
            <img
              src={optimizeImage(c.certificateImageUrl, 1600)}
              alt={`Certificate: ${c.name}`}
              className="max-h-[62vh] w-auto max-w-full object-contain"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={c.certificateImageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-quiet">
              <FiExternalLink aria-hidden="true" className="h-4 w-4" />
              Open full image
            </a>
            {c.credentialUrl && (
              <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FiExternalLink aria-hidden="true" className="h-4 w-4" />
                Verify credential
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

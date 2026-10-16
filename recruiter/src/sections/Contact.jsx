import { FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";
import Section from "../components/common/Section";
import Skeleton from "../components/common/Skeleton";

const card =
  "flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent";
const iconBox = "grid h-11 w-11 place-items-center rounded-full bg-tint text-accent-deep";

export default function Contact() {
  const { profile, loading } = usePortfolio();

  return (
    <Section
      id="contact"
      title="Contact me"
      intro="Have an opportunity or a question ? Send an email or connect with me on LinkedIn."
    >
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className={card}>
              <span className={iconBox}>
                <FiMail aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="mt-4 font-display text-xl font-medium">Email me</span>
              <span className="mt-1 break-all text-muted">{profile.email}</span>
            </a>
          )}
          {profile?.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={card}>
              <span className={iconBox}>
                <FaLinkedinIn aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="mt-4 font-display text-xl font-medium">Connect on LinkedIn</span>
              <span className="mt-1 text-muted">Send a connection request or a message.</span>
            </a>
          )}
        </div>
      )}
    </Section>
  );
}

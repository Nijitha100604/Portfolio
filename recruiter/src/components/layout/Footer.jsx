import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();
  const name = profile?.name || "Nijitha Mol M";

  return (
    <footer className="bg-ink px-6 py-10 text-white/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <div className="flex gap-3">
          {profile?.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:border-white hover:text-white"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          )}
          {profile?.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:border-white hover:text-white"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

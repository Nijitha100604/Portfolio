import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";
import { optimizeImage } from "../utils/cloudinary";
import { resumeDownloadUrl } from "../utils/drive";
import Skeleton from "../components/common/Skeleton";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function Home() {
  const { profile, loading } = usePortfolio();

  return (
    <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      {loading ? (
        <div className="flex w-full max-w-xl flex-col items-center gap-4">
          <Skeleton className="h-44 w-44 rounded-full" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-72" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
      ) : (
        <>
          <div className="relative h-44 w-44 sm:h-52 sm:w-52">
            <span aria-hidden="true" className="avatar-ring absolute inset-0 rounded-full" />
            {profile?.photoUrl ? (
              <img
                src={optimizeImage(profile.photoUrl, 480)}
                alt={profile.name ? `Portrait of ${profile.name}` : "Portrait"}
                className="absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)] rounded-full border-[3px] border-surface object-cover"
              />
            ) : (
              <div className="absolute inset-[5px] grid place-items-center rounded-full border-[3px] border-surface bg-tint font-display text-5xl text-accent-deep">
                {initials(profile?.name)}
              </div>
            )}
          </div>

          <div aria-hidden="true" className="grow-line mt-8 h-0.5 w-48 rounded-full bg-accent" />

          <h1 className="mt-6 font-display text-4xl font-medium sm:text-6xl">{profile?.name}</h1>
          {profile?.degreeTitle && <p className="mt-3 text-lg text-accent-deep">{profile.degreeTitle}</p>}
          {profile?.bio && (
            <p className="mt-6 w-full max-w-3xl hyphens-auto text-justify text-base leading-relaxed text-muted sm:text-lg">
              {profile.bio}
            </p>
          )}

          {profile?.resumeUrl && (
            <a
              href={resumeDownloadUrl(profile.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              <FiDownload aria-hidden="true" className="h-4 w-4" />
              Download resume
            </a>
          )}

          <div className="mt-8 flex gap-3">
            {profile?.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="icon-link"
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
                className="icon-link"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}
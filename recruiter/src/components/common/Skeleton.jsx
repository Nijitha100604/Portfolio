export default function Skeleton({ className = "" }) {
  const radius = className.includes("rounded") ? "" : "rounded-lg";
  return <div aria-hidden="true" className={`animate-pulse bg-line ${radius} ${className}`} />;
}

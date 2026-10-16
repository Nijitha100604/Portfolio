// Decorative ECG trace. Draws itself once on page load (see .ecg-path in index.css).
export default function EcgLine({ className = "" }) {
  return (
    <svg viewBox="0 0 320 44" fill="none" aria-hidden="true" className={className}>
      <path
        className="ecg-path"
        pathLength="1"
        d="M0 24H96L106 24L113 14L121 38L131 4L141 42L149 24H168L176 19L184 24H320"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Section from "../components/common/Section";
import Skeleton from "../components/common/Skeleton";
import CertCard from "../components/certifications/CertCard";
import CertModal from "../components/certifications/CertModal";

export default function Certifications() {
  const { certifications, loading } = usePortfolio();
  const [selected, setSelected] = useState(null);

  return (
    <Section id="certifications" title="Certifications">
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((n) => (
            <Skeleton key={n} className="h-44" />
          ))}
        </div>
      ) : certifications.length === 0 ? (
        <p className="text-muted">Certifications will appear here soon.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <CertCard key={cert._id} cert={cert} onView={setSelected} />
          ))}
        </div>
      )}
      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

import { FiHome, FiBookOpen, FiFolder, FiCode, FiAward, FiFlag, FiMail } from "react-icons/fi";

// Order here = order on the page = order in the sidebar.
// To hide a section, remove it here and remove its component in App.jsx.
export const SECTIONS = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "education", label: "Education", icon: FiBookOpen },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "certifications", label: "Certifications", icon: FiAward },
  // { id: "activities", label: "Activities", icon: FiFlag },
  { id: "contact", label: "Contact", icon: FiMail },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

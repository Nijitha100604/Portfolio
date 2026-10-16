import { FiAward, FiBookOpen, FiCode, FiFlag, FiFolder } from "react-icons/fi";
import { optimizeImage } from "../utils/cloudinary";

// Field types: text, url, textarea, number, select, tags, list, image, images
// Option values must match the enums in the server models exactly.

export const PROFILE_FIELDS = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "degreeTitle", label: "Degree title", type: "text", placeholder: "Undergraduate - B.E. Biomedical Engineering", wide: true },
  { name: "bio", label: "Bio", type: "textarea", rows: 6, help: "3 to 4 lines work best." },
  { name: "email", label: "Email", type: "text" },
  { name: "linkedinUrl", label: "LinkedIn URL", type: "url" },
  { name: "githubUrl", label: "GitHub URL", type: "url" },
  {
    name: "resumeUrl",
    label: "Resume link",
    type: "url",
    help: "Paste the Google Drive share link (set to Anyone with the link).",
  },
  { name: "photoUrl", label: "Profile photo", type: "image", folder: "profile" },
];

export const RESOURCES = [
  {
    key: "education",
    title: "Education",
    singular: "education entry",
    endpoint: "/education",
    icon: FiBookOpen,
    columns: [
      { key: "order", label: "Order" },
      { key: "level", label: "Level" },
      { key: "institution", label: "Institution" },
      { label: "Years", render: (i) => [i.startYear, i.endYear].filter(Boolean).join(" to ") },
      { label: "Score", render: (i) => `${i.score}${i.scoreType === "Percentage" ? "%" : " CGPA"}` },
    ],
    fields: [
      { name: "level", label: "Level", type: "select", options: ["UG", "HSC", "SSLC"], required: true },
      { name: "institution", label: "Institution", type: "text", required: true },
      { name: "degree", label: "Degree or stream", type: "text" },
      { name: "score", label: "Score", type: "text", required: true, placeholder: "9.06" },
      { name: "startYear", label: "Start year", type: "number", min: 1990, max: 2100 },
      { name: "endYear", label: "End year", type: "number", min: 1990, max: 2100 },
      { name: "scoreType", label: "Score type", type: "select", options: ["CGPA", "Percentage"], required: true, defaultValue: "Percentage" },
      { name: "order", label: "Display order", type: "number", min: 0, defaultValue: 0, help: "Lower numbers show first." },
    ],
  },
  {
    key: "skills",
    title: "Skills",
    singular: "skill",
    endpoint: "/skills",
    icon: FiCode,
    bulkField: "name",
    columns: [
      { key: "category", label: "Category" },
      { key: "name", label: "Skill" },
      { key: "order", label: "Order" },
    ],
    fields: [
      { name: "category", label: "Category", type: "select", options: ["AI/GenAI", "Full-Stack", "Languages", "Databases", "Tools"], required: true },
      { name: "name", label: "Skill name", type: "text", required: true, help: "When adding, you can enter several skills separated by commas." },
      { name: "order", label: "Display order", type: "number", min: 0, defaultValue: 0 },
    ],
  },
  {
    key: "projects",
    title: "Projects",
    singular: "project",
    endpoint: "/projects",
    icon: FiFolder,
    columns: [
      { key: "order", label: "Order" },
      { key: "title", label: "Title" },
      { key: "role", label: "Role" },
      { key: "duration", label: "Duration" },
      { label: "Images", render: (i) => (i.images?.length ? `${i.images.length}` : "None") },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "shortDescription", label: "Short description", type: "textarea", rows: 3, required: true, help: "Shown on the project card." },
      { name: "fullDescription", label: "Full description", type: "textarea", rows: 7, help: "Shown in the Read more popup." },
      { name: "role", label: "Role", type: "text" },
      { name: "duration", label: "Duration", type: "text", placeholder: "3 months" },
      { name: "techStack", label: "Tech stack", type: "tags", placeholder: "React.js, then press Enter" },
      { name: "features", label: "Key features", type: "list", placeholder: "Describe one feature" },
      { name: "images", label: "Images", type: "images", folder: "projects" },
      { name: "githubUrl", label: "GitHub URL", type: "url" },
      { name: "liveUrl", label: "Live demo URL", type: "url", help: "Optional." },
      { name: "order", label: "Display order", type: "number", min: 0, defaultValue: 0 },
    ],
  },
  {
    key: "certifications",
    title: "Certifications",
    singular: "certification",
    endpoint: "/certifications",
    icon: FiAward,
    columns: [
      {
        label: "Image",
        render: (i) =>
          i.certificateImageUrl ? (
            <img src={optimizeImage(i.certificateImageUrl, 120)} alt="" className="h-10 w-14 rounded border border-line object-cover" />
          ) : null,
      },
      { key: "name", label: "Name" },
      { key: "issuer", label: "Issuer" },
      { key: "issueDate", label: "Issued" },
      { key: "order", label: "Order" },
    ],
    fields: [
      { name: "name", label: "Certification name", type: "text", required: true, wide: true },
      { name: "issuer", label: "Issuer", type: "text", placeholder: "ServiceNow" },
      { name: "issueDate", label: "Issue date", type: "text", placeholder: "Aug 2025" },
      { name: "credentialUrl", label: "Credential URL", type: "url", help: "Optional verification link." },
      { name: "order", label: "Display order", type: "number", min: 0, defaultValue: 0 },
      { name: "certificateImageUrl", label: "Certificate image", type: "image", folder: "certificates", required: true },
    ],
  },
  {
    key: "activities",
    title: "Activities",
    singular: "activity",
    endpoint: "/activities",
    icon: FiFlag,
    columns: [
      { key: "year", label: "Year" },
      { key: "type", label: "Type" },
      { key: "title", label: "Title" },
      { key: "event", label: "Event" },
      { key: "order", label: "Order" },
    ],
    fields: [
      { name: "type", label: "Type", type: "select", options: ["Paper", "Competition", "Achievement"], required: true },
      { name: "year", label: "Year", type: "number", min: 1990, max: 2100 },
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "event", label: "Event", type: "text", wide: true },
      { name: "description", label: "Description", type: "textarea", rows: 4 },
      { name: "order", label: "Display order", type: "number", min: 0, defaultValue: 0 },
    ],
  },
];

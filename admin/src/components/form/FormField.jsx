import TagInput from "./TagInput";
import ListInput from "./ListInput";
import ImageUploader from "./ImageUploader";

// Renders one form control, chosen by the field's `type` in config/resources.jsx.
export default function FormField({ field, value, error, onChange }) {
  const id = `field-${field.name}`;
  const invalid = error ? "input-error" : "";
  const describedBy = error ? `${id}-error` : field.help ? `${id}-help` : undefined;
  const common = { id, "aria-invalid": !!error, "aria-describedby": describedBy };

  let control;
  switch (field.type) {
    case "textarea":
      control = (
        <textarea {...common} rows={field.rows || 5} className={`input ${invalid}`} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      );
      break;
    case "select":
      control = (
        <select {...common} className={`input ${invalid}`} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select...</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
      break;
    case "number":
      control = (
        <input {...common} type="number" min={field.min} max={field.max} className={`input ${invalid}`} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      );
      break;
    case "tags":
      control = <TagInput id={id} value={value} onChange={onChange} placeholder={field.placeholder} />;
      break;
    case "list":
      control = <ListInput id={id} value={value} onChange={onChange} placeholder={field.placeholder} />;
      break;
    case "image":
      control = <ImageUploader id={id} value={value} onChange={onChange} folder={field.folder} />;
      break;
    case "images":
      control = <ImageUploader id={id} value={value} onChange={onChange} folder={field.folder} multiple />;
      break;
    default:
      control = (
        <input {...common} type={field.type === "url" ? "url" : "text"} className={`input ${invalid}`} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      );
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {field.label}
        {field.required && <span className="text-danger"> *</span>}
      </label>
      {control}
      {field.help && !error && (
        <p id={`${id}-help`} className="mt-1.5 text-sm text-muted">
          {field.help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

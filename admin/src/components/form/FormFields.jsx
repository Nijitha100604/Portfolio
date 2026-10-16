import FormField from "./FormField";

const WIDE_TYPES = ["textarea", "tags", "list", "image", "images"];

// Lays out every field of a resource in a two-column grid.
export default function FormFields({ fields, values, errors, onChange }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className={WIDE_TYPES.includes(field.type) || field.wide ? "sm:col-span-2" : ""}>
          <FormField
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(val) => onChange(field.name, val)}
          />
        </div>
      ))}
    </div>
  );
}

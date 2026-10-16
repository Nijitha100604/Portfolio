const ARRAY_TYPES = ["tags", "list", "images"];

// Starting values for a form: from an existing item (edit) or defaults (add).
export function initialValues(fields, item = null) {
  const values = {};
  fields.forEach((f) => {
    const existing = item?.[f.name];
    if (ARRAY_TYPES.includes(f.type)) {
      values[f.name] = Array.isArray(existing) ? [...existing] : [];
    } else if (existing !== undefined && existing !== null) {
      values[f.name] = String(existing);
    } else {
      values[f.name] = !item && f.defaultValue !== undefined ? String(f.defaultValue) : "";
    }
  });
  return values;
}

const isEmpty = (val) => (Array.isArray(val) ? val.length === 0 : String(val ?? "").trim() === "");

// Returns { fieldName: "message" } for every invalid field.
export function validate(fields, values) {
  const errors = {};
  fields.forEach((f) => {
    const val = values[f.name];
    const empty = isEmpty(val);

    if (f.required && empty) {
      errors[f.name] = `${f.label} is required`;
      return;
    }
    if (empty) return;

    if (f.type === "number") {
      const n = Number(val);
      if (Number.isNaN(n)) errors[f.name] = "Enter a valid number";
      else if (f.min !== undefined && n < f.min) errors[f.name] = `Must be at least ${f.min}`;
      else if (f.max !== undefined && n > f.max) errors[f.name] = `Must be at most ${f.max}`;
    }
    if (f.type === "url" && !/^https?:\/\//i.test(String(val).trim())) {
      errors[f.name] = "Enter a full link starting with http:// or https://";
    }
  });
  return errors;
}

// Converts form values into the JSON body the API expects.
export function buildPayload(fields, values) {
  const body = {};
  fields.forEach((f) => {
    const val = values[f.name];
    if (f.type === "number") {
      if (String(val).trim() === "") body[f.name] = f.defaultValue !== undefined ? f.defaultValue : null;
      else body[f.name] = Number(val);
    } else if (Array.isArray(val)) {
      body[f.name] = val.map((x) => (typeof x === "string" ? x.trim() : x)).filter(Boolean);
    } else {
      body[f.name] = typeof val === "string" ? val.trim() : val;
    }
  });
  return body;
}

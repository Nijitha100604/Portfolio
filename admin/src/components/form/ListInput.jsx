import { FiPlus, FiTrash2 } from "react-icons/fi";

// A list of text lines you can add to and remove from (used for project features).
export default function ListInput({ id, value, onChange, placeholder }) {
  const update = (i, text) => onChange(value.map((v, n) => (n === i ? text : v)));
  const remove = (i) => onChange(value.filter((_, n) => n !== i));

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            id={i === 0 ? id : undefined}
            className="input"
            value={item}
            placeholder={placeholder}
            aria-label={`Item ${i + 1}`}
            onChange={(e) => update(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onChange([...value, ""]);
              }
            }}
          />
          <button type="button" className="icon-btn shrink-0" aria-label={`Remove item ${i + 1}`} onClick={() => remove(i)}>
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-quiet" onClick={() => onChange([...value, ""])}>
        <FiPlus className="h-4 w-4" />
        Add item
      </button>
    </div>
  );
}

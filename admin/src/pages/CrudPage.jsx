import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import { buildPayload, initialValues, validate } from "../utils/form";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Spinner from "../components/common/Spinner";
import FormFields from "../components/form/FormFields";

const formatCell = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return <span className="text-muted">Not set</span>;
  return String(value);
};

// One page that handles list / add / edit / delete for any resource in config/resources.jsx.
export default function CrudPage({ resource }) {
  const { title, singular, endpoint, columns, fields, bulkField } = resource;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const { data } = await client.get(endpoint);
      setItems(data);
    } catch (err) {
      setLoadError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setValues(initialValues(fields));
    setErrors({});
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setValues(initialValues(fields, item));
    setErrors({});
    setFormOpen(true);
  };

  const closeForm = () => !saving && setFormOpen(false);

  const setValue = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(fields, values);
    if (Object.keys(found).length) {
      setErrors(found);
      toast.error("Please fix the highlighted fields");
      return;
    }

    let body = buildPayload(fields, values);
    let count = 1;
    // Skills: "Python, Java, C++" becomes three separate skills.
    if (!editing && bulkField) {
      const names = String(values[bulkField]).split(",").map((s) => s.trim()).filter(Boolean);
      if (names.length > 1) {
        body = names.map((n) => ({ ...body, [bulkField]: n }));
        count = names.length;
      }
    }

    setSaving(true);
    try {
      if (editing) await client.put(`${endpoint}/${editing._id}`, body);
      else await client.post(endpoint, body);
      toast.success(editing ? "Changes saved" : count > 1 ? `${count} ${singular}s added` : `Added ${singular}`);
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await client.delete(`${endpoint}/${toDelete._id}`);
      toast.success("Deleted");
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          {!loading && !loadError && (
            <p className="mt-1 text-sm text-muted">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <FiPlus className="h-4 w-4" />
          Add {singular}
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
        {loading ? (
          <div className="grid place-items-center py-20">
            <Spinner />
          </div>
        ) : loadError ? (
          <div role="alert" className="px-6 py-16 text-center">
            <p className="font-medium">Could not load {title.toLowerCase()}</p>
            <p className="mt-1 text-sm text-muted">{loadError}</p>
            <button type="button" className="btn btn-quiet mt-4" onClick={load}>
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-medium">No {title.toLowerCase()} yet</p>
            <p className="mt-1 text-sm text-muted">Add your first {singular} to show it on the recruiter site.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-line bg-page text-muted">
                <tr>
                  {columns.map((c) => (
                    <th key={c.label} scope="col" className="px-4 py-3 font-medium">
                      {c.label}
                    </th>
                  ))}
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((item) => (
                  <tr key={item._id} className="align-middle">
                    {columns.map((c) => (
                      <td key={c.label} className="px-4 py-3">
                        {c.render ? c.render(item) : formatCell(item[c.key])}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button type="button" className="icon-btn" aria-label={`Edit ${item.title || item.name || singular}`} onClick={() => openEdit(item)}>
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="icon-btn hover:!border-danger hover:!text-danger"
                          aria-label={`Delete ${item.title || item.name || singular}`}
                          onClick={() => setToDelete(item)}
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={formOpen} title={editing ? `Edit ${singular}` : `Add ${singular}`} onClose={closeForm}>
        <form onSubmit={submit} noValidate>
          <FormFields fields={fields} values={values} errors={errors} onChange={setValue} />
          <div className="mt-8 flex justify-end gap-3 border-t border-line pt-5">
            <button type="button" className="btn btn-quiet" onClick={closeForm} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving && <Spinner className="h-4 w-4" />}
              {editing ? "Save changes" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title={`Delete ${singular}?`}
        message={`"${toDelete?.title || toDelete?.name || toDelete?.institution || "This item"}" will be removed from the database and from the recruiter site. This cannot be undone.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}

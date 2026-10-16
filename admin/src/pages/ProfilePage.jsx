import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import client, { getErrorMessage } from "../api/client";
import { PROFILE_FIELDS } from "../config/resources";
import { buildPayload, initialValues, validate } from "../utils/form";
import FormFields from "../components/form/FormFields";
import Spinner from "../components/common/Spinner";

export default function ProfilePage() {
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoadError(null);
    client
      .get("/profile")
      .then(({ data }) => setValues(initialValues(PROFILE_FIELDS, data)))
      .catch((err) => setLoadError(getErrorMessage(err)));
  };

  useEffect(load, []);

  const setValue = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(PROFILE_FIELDS, values);
    if (Object.keys(found).length) {
      setErrors(found);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSaving(true);
    try {
      await client.put("/profile", buildPayload(PROFILE_FIELDS, values));
      toast.success("Profile saved");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Profile</h1>
      <p className="mt-1 text-sm text-muted">This is the Home section of the recruiter site.</p>

      <div className="mt-6 rounded-xl border border-line bg-surface p-6">
        {loadError ? (
          <div role="alert" className="py-10 text-center">
            <p className="font-medium">Could not load your profile</p>
            <p className="mt-1 text-sm text-muted">{loadError}</p>
            <button type="button" className="btn btn-quiet mt-4" onClick={load}>
              Try again
            </button>
          </div>
        ) : !values ? (
          <div className="grid place-items-center py-16">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <FormFields fields={PROFILE_FIELDS} values={values} errors={errors} onChange={setValue} />
            <div className="mt-8 flex justify-end border-t border-line pt-5">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving && <Spinner className="h-4 w-4" />}
                Save profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

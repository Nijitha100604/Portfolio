import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight, FiTrash2, FiUpload } from "react-icons/fi";
import { getErrorMessage } from "../../api/client";
import { uploadImages } from "../../api/upload";
import { optimizeImage } from "../../utils/cloudinary";
import Spinner from "../common/Spinner";

const MAX_BYTES = 5 * 1024 * 1024; // same limit as the server
const MAX_FILES = 8;

// Single image: value is a URL string. Multiple: value is an array of URLs.
export default function ImageUploader({ id, value, onChange, folder, multiple = false }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const images = multiple ? value : value ? [value] : [];

  const handleFiles = async (fileList) => {
    let files = Array.from(fileList);
    if (!files.length) return;
    if (!multiple) files = files.slice(0, 1);
    if (files.length > MAX_FILES) return toast.error(`Choose up to ${MAX_FILES} images at a time`);

    for (const file of files) {
      if (!file.type.startsWith("image/")) return toast.error(`"${file.name}" is not an image`);
      if (file.size > MAX_BYTES) return toast.error(`"${file.name}" is larger than 5 MB`);
    }

    setUploading(true);
    try {
      const urls = await uploadImages(files, folder);
      onChange(multiple ? [...images, ...urls] : urls[0]);
      toast.success(urls.length > 1 ? `${urls.length} images uploaded` : "Image uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (i) => onChange(multiple ? images.filter((_, n) => n !== i) : "");
  const move = (i, step) => {
    const next = [...images];
    [next[i], next[i + step]] = [next[i + step], next[i]];
    onChange(next);
  };

  return (
    <div>
      {images.length > 0 && (
        <ul className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((url, i) => (
            <li key={url} className="overflow-hidden rounded-lg border border-line bg-page">
              <img src={optimizeImage(url, 400)} alt={`Uploaded ${i + 1}`} className="h-28 w-full object-contain" />
              <div className="flex items-center justify-between border-t border-line bg-surface p-1.5">
                {multiple ? (
                  <div className="flex gap-1">
                    <button type="button" className="icon-btn !h-8 !w-8" aria-label="Move earlier" disabled={i === 0} onClick={() => move(i, -1)}>
                      <FiArrowLeft className="h-4 w-4" />
                    </button>
                    <button type="button" className="icon-btn !h-8 !w-8" aria-label="Move later" disabled={i === images.length - 1} onClick={() => move(i, 1)}>
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <span />
                )}
                <button type="button" className="icon-btn !h-8 !w-8 hover:!border-danger hover:!text-danger" aria-label="Remove image" onClick={() => remove(i)}>
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button type="button" className="btn btn-quiet" disabled={uploading} onClick={() => inputRef.current?.click()}>
        {uploading ? <Spinner className="h-4 w-4" /> : <FiUpload className="h-4 w-4" />}
        {uploading ? "Uploading..." : images.length && !multiple ? "Replace image" : multiple ? "Add images" : "Choose image"}
      </button>
      <p className="mt-2 text-sm text-muted">
        JPG or PNG, up to 5 MB each{multiple ? `, ${MAX_FILES} at a time. The first image is the project thumbnail.` : "."}
      </p>
    </div>
  );
}

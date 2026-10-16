import client from "./client";

// Uploads files to Cloudinary through your API and returns their URLs.
// folder: "profile" | "projects" | "certificates" | "resume"
export async function uploadImages(files, folder) {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  const { data } = await client.post(`/upload?folder=${folder}`, form);
  return data.urls;
}

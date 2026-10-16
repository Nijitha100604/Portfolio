const DRIVE_FILE = /drive\.google\.com\/file\/d\/([^/?#]+)/;

// Turns a Google Drive "view" link into a direct download link.
// Any other URL is returned unchanged.
export function resumeDownloadUrl(url) {
  if (!url) return null;
  const match = url.match(DRIVE_FILE);
  return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
}

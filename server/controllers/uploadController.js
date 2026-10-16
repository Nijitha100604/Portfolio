import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";

const ALLOWED_FOLDERS = ["profile", "projects", "certificates", "resume"];

const uploadBuffer = (buffer, folder) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: `portfolio/${folder}`, resource_type: "auto" },
            (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
    });

export const uploadFiles = asyncHandler(async (req, res) => {
    const folder = req.query.folder;

    if (!ALLOWED_FOLDERS.includes(folder)) {
        res.status(400);
        throw new Error(`folder must be one of: ${ALLOWED_FOLDERS.join(", ")}`);
    }
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error("No files uploaded");
    }

    const results = await Promise.all(req.files.map((file) => uploadBuffer(file.buffer, folder)));
    const urls = results.map((r) => r.secure_url);

    res.status(201).json({ urls });
});
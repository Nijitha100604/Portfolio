import express from "express";
import upload from "../middleware/upload.js";
import { uploadFiles } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array("files", 8), uploadFiles);

export default router;
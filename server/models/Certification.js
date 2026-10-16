import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        issuer: { type: String, trim: true },
        issueDate: { type: String, trim: true }, // e.g. "Aug 2025"
        certificateImageUrl: { type: String, required: true, trim: true },
        credentialUrl: { type: String, trim: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
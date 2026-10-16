import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        degreeTitle: { type: String, trim: true },
        bio: { type: String, trim: true },
        photoUrl: { type: String, trim: true },
        email: { type: String, trim: true },
        linkedinUrl: { type: String, trim: true },
        githubUrl: { type: String, trim: true },
        resumeUrl: { type: String, trim: true },
    },
    { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
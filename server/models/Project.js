import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        shortDescription: { type: String, required: true, trim: true },
        fullDescription: { type: String, trim: true },
        role: { type: String, trim: true },
        techStack: { type: [String], default: [] },
        features: { type: [String], default: [] },
        images: { type: [String], default: [] },
        githubUrl: { type: String, trim: true },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
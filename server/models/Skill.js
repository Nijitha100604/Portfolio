import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: ["AI/GenAI", "Full-Stack", "Languages", "Databases", "Tools"],
        },
        name: { type: String, required: true, trim: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
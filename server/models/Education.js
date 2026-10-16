import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
    {
        level: { type: String, required: true, enum: ["UG", "HSC", "SSLC"] },
        institution: { type: String, required: true, trim: true },
        degree: { type: String, trim: true },
        startYear: { type: Number },
        endYear: { type: Number },
        score: { type: String, required: true, trim: true },
        scoreType: { type: String, enum: ["CGPA", "Percentage"], default: "Percentage" },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
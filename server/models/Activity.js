import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        type: { type: String, required: true, enum: ["Paper", "Competition", "Achievement"] },
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        event: { type: String, trim: true },
        year: { type: Number },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
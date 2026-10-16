import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);

adminSchema.methods.matchPassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.passwordHash);
};

export default mongoose.model("Admin", adminSchema);
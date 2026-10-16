import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        res.status(400);
        throw new Error("Email and password are required");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin || !(await admin.matchPassword(password))) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    res.json({ token, admin: { id: admin._id, email: admin.email } });
});

export const getMe = asyncHandler(async (req, res) => {
    res.json({ id: req.admin._id, email: req.admin.email });
});
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
        res.status(401);
        throw new Error("Not authorized: no token");
    }

    let admin;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        admin = await Admin.findById(decoded.id).select("-passwordHash");
    } catch {
        admin = null;
    }

    if (!admin) {
        res.status(401);
        throw new Error("Not authorized: token invalid or expired");
    }

    req.admin = admin;
    next();
});
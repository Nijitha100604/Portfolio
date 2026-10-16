import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const run = async () => {
    const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first");
        process.exit(1);
    }

    await connectDB();

    const passwordHash = await bcrypt.hash(password, 12);
    const existing = await Admin.findOne({ email });

    if (existing) {
        existing.passwordHash = passwordHash;
        await existing.save();
        console.log("Admin already existed: password updated");
    } else {
        await Admin.create({ email, passwordHash });
        console.log("Admin created");
    }

    await mongoose.disconnect();
    process.exit(0);
};

run();
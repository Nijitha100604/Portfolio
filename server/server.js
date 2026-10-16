import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import Education from "./models/Education.js";
import Skill from "./models/Skill.js";
import Project from "./models/Project.js";
import Certification from "./models/Certification.js";
import Activity from "./models/Activity.js";
import crudController from "./controllers/crudController.js";
import crudRouter from "./routes/crudRouter.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
app.set("trust proxy", 1);

// Allowed frontends
const allowedOrigins = (process.env.CLIENT_URLS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

// Middleware
app.use(helmet());
app.use(
    cors({
        origin: (origin, callback) => {
            // allow tools like Postman and the listed frontends
            if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
            callback(new Error("Not allowed by CORS"));
        },
    })
);
app.use(express.json({ limit: "1mb" }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/education", crudRouter(crudController(Education, { sort: { order: 1 } })));
app.use("/api/skills", crudRouter(crudController(Skill, { sort: { category: 1, order: 1, name: 1 } })));
app.use("/api/projects", crudRouter(crudController(Project)));
app.use("/api/certifications", crudRouter(crudController(Certification)));
app.use("/api/activities", crudRouter(crudController(Activity, { sort: { year: -1, order: 1 } })));

// Errors (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
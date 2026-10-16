import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const crudRouter = (controller) => {
    const router = express.Router();

    // public (recruiter site)
    router.get("/", controller.getAll);
    router.get("/:id", controller.getOne);

    // protected (admin site)
    router.post("/", protect, controller.create);
    router.put("/:id", protect, controller.update);
    router.delete("/:id", protect, controller.remove);

    return router;
};

export default crudRouter;
import asyncHandler from "../utils/asyncHandler.js";

const crudController = (Model, { sort = { order: 1, createdAt: -1 } } = {}) => ({
    getAll: asyncHandler(async (req, res) => {
        const items = await Model.find().sort(sort);
        res.json(items);
    }),

    getOne: asyncHandler(async (req, res) => {
        const item = await Model.findById(req.params.id);
        if (!item) {
            res.status(404);
            throw new Error("Not found");
        }
        res.json(item);
    }),

    create: asyncHandler(async (req, res) => {
        const item = await Model.create(req.body);
        res.status(201).json(item);
    }),

    update: asyncHandler(async (req, res) => {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            res.status(404);
            throw new Error("Not found");
        }
        res.json(item);
    }),

    remove: asyncHandler(async (req, res) => {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404);
            throw new Error("Not found");
        }
        res.json({ message: "Deleted successfully", id: req.params.id });
    }),
});

export default crudController;
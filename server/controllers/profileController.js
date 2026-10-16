import Profile from "../models/Profile.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne();
    res.json(profile || {});
});

export const updateProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
    });
    res.json(profile);
});
import express from "express";
import { upload } from "../middleware/image-uploader.middleware.js";
import { uploadProfilePic } from "../controllers/profile-picture.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/profile-picture
router.post("/", authMiddleware, upload.single("file"), uploadProfilePic);

export default router;

import { Router } from "express";
import { uploadProfilePic } from "../controllers/profile-picture.controller.js";
import { upload } from "../middleware/image-uploader.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; // if using auth

const router = Router();

router.patch(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadProfilePic
);

export default router;

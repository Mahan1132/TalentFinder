import { Router } from "express";
const router = Router();

import { getAllUsers } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getUserId,
  searchUsers,
  updateUser,
} from "../controller/searchUser.controller.js";
import { uploadProfilePic } from "../controller/profile-picture.controller.js";
import { upload } from "../middleware/image-uploader.middleware.js";

//get all users
router.get("/getAllUsers", authMiddleware, getAllUsers);

//search users
router.get("/search", authMiddleware, searchUsers);

// get user by Id (isSelf)
router.get("/:id", authMiddleware, getUserId);

//update own profile
router.put("/:id", authMiddleware, updateUser);

router.patch(
  "/uploadProfilePic",
  authMiddleware, //checkToken
  upload.single("image"),
  uploadProfilePic
);

export default router;

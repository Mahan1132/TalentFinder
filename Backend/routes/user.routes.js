import { Router } from "express";
const router = Router();

import { getAllUsers } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserId, searchUsers } from "../controller/searchUser.controller.js";

//get all users
router.get("/getAllUsers", authMiddleware, getAllUsers);

//search users
router.get("/search", authMiddleware, searchUsers);

// get user by Id
router.get("/:id", authMiddleware, getUserId);
export default router;

import { Router } from "express";
const router = Router();

import { getAllUsers } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { searchUsers } from "../controller/searchUser.controller.js";

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.get("/search", authMiddleware, searchUsers);
export default router;

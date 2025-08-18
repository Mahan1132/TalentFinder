import { Router } from "express";
import {
  addExperience,
  deleteExperience,
  getUserExperiences,
  updateExperience,
} from "../controller/experience.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, addExperience);
router.get("/:userId", authMiddleware, getUserExperiences);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;

import express from "express";
import {
  getExperienceByUser,
  addExperience,
} from "../controller/experience.controller.js";

const router = express.Router();

router.get("/:userId", getExperienceByUser);
router.post("/", addExperience);

export default router;

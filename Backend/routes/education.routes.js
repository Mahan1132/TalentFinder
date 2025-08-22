import express from "express";
import {
  addEducation,
  getUserEducation,
  updateEducation,
  deleteEducation,
} from "../controller/education.controller.js";

const router = express.Router();

router.post("/", addEducation);
router.get("/:userId", getUserEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;

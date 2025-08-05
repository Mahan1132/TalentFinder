import { Router } from "express";
const router = Router();
import { getAllUsers, login, register } from "../controller/auth.controller.js";

router.post("/register", register);
router.post("/login", login);
router.post("/getAllUsers", getAllUsers);

export default router;

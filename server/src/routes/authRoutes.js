// routes/authRoutes.js
import express from "express";
import {
  loginStudent,
  registerStudent,
} from "../controllers/studentAuthController.js";

const router = express.Router();
router.post("/login", loginStudent);
router.post("/register", registerStudent);
export default router;

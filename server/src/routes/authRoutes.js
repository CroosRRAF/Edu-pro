// routes/authRoutes.js
import express from "express";
import { adminLogin, registerAdmin } from "../controllers/adminController.js";
import {
  loginStudent,
  registerStudent,
} from "../controllers/studentAuthController.js";
import { teacherLogin } from "../controllers/teacherController.js";

const router = express.Router();

// Student Authentication
router.post("/student/login", loginStudent);
router.post("/student/register", registerStudent);

// Admin Authentication
router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminLogin);

// Teacher Authentication
router.post("/teacher/login", teacherLogin);

export default router;

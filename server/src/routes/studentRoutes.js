// routes/studentRoutes.js
import express from "express";
import {
  getProfile,
  updateProfile,
  enrollCourse,
  joinSport,
  getStudentDashboardData,
} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Get full dashboard data (courses, sports, books, attendance)
router.get("/:id/dashboard", authMiddleware, getStudentDashboardData);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/courses/enroll", authMiddleware, enrollCourse);
router.post("/sports/join", authMiddleware, joinSport);

// router.get("/:id", authMiddleware, getStudentById);
// router.put("/:id", authMiddleware, updateStudentProfile);
// router.get("/:id/attendance", authMiddleware, getAttendance);
// router.get("/:id/results", authMiddleware, getResults);

export default router;

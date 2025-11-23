// routes/studentRoutes.js
import express from "express";
import {
  enrollCourse,
  getAttendance,
  getProfile,
  getResults,
  getStudentDashboardData,
  joinSport,
  updateProfile,
} from "../controllers/studentController.js";
import { studentAuth } from "../middlewares/auth.js";

const router = express.Router();

// Get full dashboard data (courses, sports, books, attendance)
router.get("/:id/dashboard", studentAuth, getStudentDashboardData);

router.get("/profile", studentAuth, getProfile);
router.put("/profile", studentAuth, updateProfile);
router.post("/courses/enroll", studentAuth, enrollCourse);
router.post("/sports/join", studentAuth, joinSport);

// Attendance & Results
router.get("/attendance", studentAuth, getAttendance);
router.get("/results", studentAuth, getResults);

export default router;

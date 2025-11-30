// routes/studentRoutes.js
import express from "express";
import {
  enrollCourse,
  getAttendance,
  getCourses,
  getProfile,
  getResults,
  getSports,
  getStudentDashboardData,
  joinSport,
  updateProfile,
} from "../controllers/studentController.js";
import { studentAuth } from "../middlewares/auth.js";

const router = express.Router();

// Get full dashboard data (courses, sports, books, attendance)
router.get("/:id/dashboard", studentAuth, getStudentDashboardData);

// Profile routes
router.get("/profile", studentAuth, getProfile);
router.put("/profile", studentAuth, updateProfile);

// Courses routes
router.get("/courses", studentAuth, getCourses);
router.post("/courses/enroll", studentAuth, enrollCourse);

// Sports routes
router.get("/sports", studentAuth, getSports);
router.post("/sports/join", studentAuth, joinSport);

// Attendance & Results
router.get("/attendance", studentAuth, getAttendance);
router.get("/results", studentAuth, getResults);

export default router;

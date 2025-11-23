import express from "express";
import {
  createAttendance,
  createBook,
  createCoach,
  createCourse,
  createResult,
  // School Profile
  createSchoolProfile,
  createSport,
  createStudent,
  deleteAttendance,
  deleteBook,
  deleteCoach,
  deleteCourse,
  deleteResult,
  deleteSport,
  deleteStudent,
  // Attendance
  getAllAttendance,
  // Library
  getAllBooks,
  // Coaches
  getAllCoaches,
  // Courses
  getAllCourses,
  // Results
  getAllResults,
  // Sports
  getAllSports,
  // Students
  getAllStudents,
  getDashboardOverview,
  getSchoolProfile,
  getStudentById,
  updateAttendance,
  updateBook,
  updateCoach,
  updateCourse,
  updateResult,
  updateSchoolProfile,
  updateSport,
  updateStudent,
} from "../controllers/adminController.js";
import { adminAuth, checkPermission } from "../middlewares/auth.js";

const router = express.Router();

// Dashboard (Admin only)
router.get("/dashboard", adminAuth, getDashboardOverview);

// School Profile Management
router.post("/school/profile", adminAuth, createSchoolProfile);
router.put("/school/profile", adminAuth, updateSchoolProfile);
router.get("/school/profile", adminAuth, getSchoolProfile);

// Students Routes
router.get(
  "/students",
  adminAuth,
  checkPermission("students", "view"),
  getAllStudents
);
router.get(
  "/students/:id",
  adminAuth,
  checkPermission("students", "view"),
  getStudentById
);
router.post(
  "/students",
  adminAuth,
  checkPermission("students", "create"),
  createStudent
);
router.put(
  "/students/:id",
  adminAuth,
  checkPermission("students", "edit"),
  updateStudent
);
router.delete(
  "/students/:id",
  adminAuth,
  checkPermission("students", "delete"),
  deleteStudent
);

// Courses Routes
router.get(
  "/courses",
  adminAuth,
  checkPermission("courses", "view"),
  getAllCourses
);
router.post(
  "/courses",
  adminAuth,
  checkPermission("courses", "create"),
  createCourse
);
router.put(
  "/courses/:id",
  adminAuth,
  checkPermission("courses", "edit"),
  updateCourse
);
router.delete(
  "/courses/:id",
  adminAuth,
  checkPermission("courses", "delete"),
  deleteCourse
);

// Sports Routes
router.get(
  "/sports",
  adminAuth,
  checkPermission("sports", "view"),
  getAllSports
);
router.post(
  "/sports",
  adminAuth,
  checkPermission("sports", "create"),
  createSport
);
router.put(
  "/sports/:id",
  adminAuth,
  checkPermission("sports", "edit"),
  updateSport
);
router.delete(
  "/sports/:id",
  adminAuth,
  checkPermission("sports", "delete"),
  deleteSport
);

// Library Routes
router.get(
  "/books",
  adminAuth,
  checkPermission("library", "view"),
  getAllBooks
);
router.post(
  "/books",
  adminAuth,
  checkPermission("library", "create"),
  createBook
);
router.put(
  "/books/:id",
  adminAuth,
  checkPermission("library", "edit"),
  updateBook
);
router.delete(
  "/books/:id",
  adminAuth,
  checkPermission("library", "delete"),
  deleteBook
);

// Attendance Routes
router.get(
  "/attendance",
  adminAuth,
  checkPermission("attendance", "view"),
  getAllAttendance
);
router.post(
  "/attendance",
  adminAuth,
  checkPermission("attendance", "create"),
  createAttendance
);
router.put(
  "/attendance/:id",
  adminAuth,
  checkPermission("attendance", "edit"),
  updateAttendance
);
router.delete(
  "/attendance/:id",
  adminAuth,
  checkPermission("attendance", "delete"),
  deleteAttendance
);

// Results Routes
router.get(
  "/results",
  adminAuth,
  checkPermission("results", "view"),
  getAllResults
);
router.post(
  "/results",
  adminAuth,
  checkPermission("results", "create"),
  createResult
);
router.put(
  "/results/:id",
  adminAuth,
  checkPermission("results", "edit"),
  updateResult
);
router.delete(
  "/results/:id",
  adminAuth,
  checkPermission("results", "delete"),
  deleteResult
);

// Coaches Routes
router.get(
  "/coaches",
  adminAuth,
  checkPermission("coaches", "view"),
  getAllCoaches
);
router.post(
  "/coaches",
  adminAuth,
  checkPermission("coaches", "create"),
  createCoach
);
router.put(
  "/coaches/:id",
  adminAuth,
  checkPermission("coaches", "edit"),
  updateCoach
);
router.delete(
  "/coaches/:id",
  adminAuth,
  checkPermission("coaches", "delete"),
  deleteCoach
);

export default router;

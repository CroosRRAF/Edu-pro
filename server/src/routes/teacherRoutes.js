import express from "express";
import {
  deleteTeacher,
  deleteTeachers,
  deleteTeachersByClass,
  getTeacherDetail,
  getTeachers,
  teacherAttendance,
  teacherRegister,
  updateTeacherSubject,
} from "../controllers/teacherController.js";
import { adminAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

// Teacher Registration (Admin only - Login handled in authRoutes)
router.post("/register", adminAuth, teacherRegister);

// Teacher Management (Admin only)
router.get("/school/:id", adminAuth, getTeachers);
router.get("/:id", requireRole("admin", "teacher"), getTeacherDetail);
router.put("/:id/subject", adminAuth, updateTeacherSubject);
router.delete("/:id", adminAuth, deleteTeacher);
router.delete("/school/:id", adminAuth, deleteTeachers);
router.delete("/class/:id", adminAuth, deleteTeachersByClass);

// Teacher Attendance (Self-tracking or Admin)
router.post(
  "/:id/attendance",
  requireRole("admin", "teacher"),
  teacherAttendance
);

export default router;

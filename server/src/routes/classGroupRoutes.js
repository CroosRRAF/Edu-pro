import express from "express";
import {
  createClassGroup,
  deleteClassGroup,
  deleteClassGroups,
  getClassGroupDetail,
  getClassGroups,
  getClassGroupStudents,
  updateClassGroup,
} from "../controllers/classGroupController.js";
import { adminAuth, authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Class Group Management (Admin only)
router.post("/", adminAuth, createClassGroup);
router.get("/school/:id", adminAuth, getClassGroups);
router.get("/:id", authMiddleware, getClassGroupDetail);
router.get("/:id/students", authMiddleware, getClassGroupStudents);
router.put("/:id", adminAuth, updateClassGroup);
router.delete("/:id", adminAuth, deleteClassGroup);
router.delete("/school/:id", adminAuth, deleteClassGroups);

export default router;

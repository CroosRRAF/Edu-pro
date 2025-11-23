import express from "express";
import {
  createNotice,
  deleteNotice,
  deleteNotices,
  getNoticeById,
  getNotices,
  updateNotice,
} from "../controllers/noticeController.js";
import { adminAuth, authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Notice Management
router.post("/", authMiddleware, createNotice); // Admin, Teacher (with role check)
router.get("/school/:id", authMiddleware, getNotices); // All authenticated users
router.get("/:id", authMiddleware, getNoticeById);
router.put("/:id", authMiddleware, updateNotice); // Admin, Notice creator
router.delete("/:id", adminAuth, deleteNotice); // Admin only
router.delete("/school/:id", adminAuth, deleteNotices); // Admin only

export default router;

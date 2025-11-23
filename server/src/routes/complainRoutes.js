import express from "express";
import {
  createComplaint,
  deleteComplaint,
  getComplaintById,
  getComplaints,
  updateComplaintStatus,
} from "../controllers/complainController.js";
import { adminAuth, authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Complaint Management
router.post("/", authMiddleware, createComplaint); // All authenticated users
router.get("/school/:id", adminAuth, getComplaints); // Admin only
router.get("/:id", authMiddleware, getComplaintById); // User can view their own
router.put("/:id/status", adminAuth, updateComplaintStatus); // Admin only
router.delete("/:id", adminAuth, deleteComplaint); // Admin only

export default router;

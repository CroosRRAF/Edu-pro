import express from "express";
import {
  assignModuleToCourse,
  createModule,
  deleteModule,
  getModuleById,
  getModules,
  updateModule,
} from "../controllers/moduleController.js";
import { adminAuth, authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Module Management (Admin only)
router.post("/", adminAuth, createModule);
router.get("/", authMiddleware, getModules);
router.get("/:id", authMiddleware, getModuleById);
router.put("/:id", adminAuth, updateModule);
router.delete("/:id", adminAuth, deleteModule);

// Module-Course Assignment
router.post("/:id/assign-course", adminAuth, assignModuleToCourse);

export default router;

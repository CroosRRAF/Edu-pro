import express from "express";
import {
  calculateFine,
  getLibraryTransactions,
  getStudentTransactions,
  issueBook,
  returnBook,
  updateFine,
} from "../controllers/libraryController.js";
import { adminAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

// Library Transaction Management
router.post("/issue", adminAuth, issueBook);
router.post("/return", adminAuth, returnBook);
router.get("/transactions", adminAuth, getLibraryTransactions);
router.get(
  "/student/:id/transactions",
  requireRole("admin", "student"),
  getStudentTransactions
);

// Fine Management
router.get("/calculate-fine/:transactionId", adminAuth, calculateFine);
router.put("/fine/:transactionId", adminAuth, updateFine);

export default router;

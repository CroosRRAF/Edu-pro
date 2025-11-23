import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple routes
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Test the problematic routes step by step
const router = express.Router();

// Test parameter routes
router.get("/:id/dashboard", (req, res) => {
  res.json({ id: req.params.id, page: "dashboard" });
});

router.get("/profile", (req, res) => {
  res.json({ message: "profile" });
});

app.use("/api/test", router);

app.listen(PORT, () => {
  console.log(`🚀 Simplified server running on port ${PORT}`);
});

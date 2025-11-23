import cors from "cors";
import express from "express";

const app = express();
const PORT = 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple test routes
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Test server is running" });
});

app.get("/test/:id", (req, res) => {
  res.json({ id: req.params.id, message: "Test route with parameter" });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});

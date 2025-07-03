import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectDB } from "./config/connectDB.js";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

// Validate environment variables
const requiredEnvVars = ["PORT", "MONGO_URL"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(
    cors({ 
        origin: "http://localhost:5173"
    })
);
app.use(express.json());

// Routes
app.get("/", (_, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    throw process.exit(1);
  });
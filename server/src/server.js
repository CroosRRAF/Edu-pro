import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/connectDB.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["PORT", "MONGO_URL", "JWT_SECRET"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length) {
  console.error(
    `❌ Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// =====================
// Graceful Shutdown Handlers
// =====================
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Unhandled rejection handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// =====================
// Connect to Database & Start Server
// =====================
connectDB()
  .then(() => {
    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST"],
      },
    });

    // Socket.IO connection handling
    io.on("connection", (socket) => {
      console.log(`🔌 Client connected: ${socket.id}`);

      // Join user to their room based on user ID
      socket.on("join", (userId) => {
        socket.join(`user:${userId}`);
        console.log(`User ${userId} joined their room`);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
      });
    });

    // Make io accessible to routes
    app.set("io", io);

    server.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`🔌 WebSocket: Socket.IO enabled`);
      console.log("=".repeat(50));
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

# Edu-Pro Technology Stack & Development Guide

**Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025

---

## Table of Contents

1. [Technology Overview](#1-technology-overview)
2. [Frontend Stack](#2-frontend-stack)
3. [Backend Stack](#3-backend-stack)
4. [Database Configuration](#4-database-configuration)
5. [Project Structure](#5-project-structure)
6. [Environment Setup](#6-environment-setup)
7. [Installation Guide](#7-installation-guide)
8. [Development Workflow](#8-development-workflow)
9. [Security Implementation](#9-security-implementation)
10. [Testing Guide](#10-testing-guide)
11. [Deployment Guide](#11-deployment-guide)

---

## 1. Technology Overview

### 1.1 MERN Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        MERN STACK                           │
├─────────────────────────────────────────────────────────────┤
│  M - MongoDB 8.0+      │  Document-based NoSQL database     │
│  E - Express 4.21.2    │  Web application framework         │
│  R - React 19.1.0      │  Frontend UI library               │
│  N - Node.js 22.16+    │  JavaScript runtime                │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Version Summary

| Layer        | Technology   | Version | Purpose          |
| ------------ | ------------ | ------- | ---------------- |
| **Frontend** | React        | 19.1.0  | UI Library       |
|              | Vite         | 7.0.0   | Build Tool       |
|              | Tailwind CSS | 3.4.17  | Styling          |
|              | React Router | 7.6.3   | Routing          |
| **Backend**  | Node.js      | 22.16+  | Runtime          |
|              | Express      | 4.21.2  | Web Framework    |
|              | Mongoose     | 8.9.4   | ODM              |
| **Database** | MongoDB      | 8.0+    | Database         |
| **Auth**     | JWT          | 9.0.2   | Token Auth       |
|              | bcryptjs     | 2.4.3   | Password Hashing |

---

## 2. Frontend Stack

### 2.1 Core Dependencies

```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.3",
    "axios": "^1.10.0",
    "lucide-react": "^0.525.0",
    "framer-motion": "^12.19.2",
    "react-hook-form": "^7.59.0"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "tailwindcss": "^3.4.17",
    "@vitejs/plugin-react": "^4.5.0",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.4",
    "eslint": "^9.28.0"
  }
}
```

### 2.2 Frontend Architecture

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   ├── Card.jsx
│   │   ├── Loading.jsx
│   │   ├── Pagination.jsx
│   │   └── Alert.jsx
│   ├── layout/          # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── forms/           # Form components
│       ├── LoginForm.jsx
│       ├── RegisterForm.jsx
│       └── ProfileForm.jsx
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── admin/          # Admin pages
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Teachers.jsx
│   │   ├── Classes.jsx
│   │   └── Settings.jsx
│   ├── student/        # Student pages
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── Attendance.jsx
│   │   └── Results.jsx
│   ├── teacher/        # Teacher pages
│   │   ├── Dashboard.jsx
│   │   ├── Classes.jsx
│   │   ├── Attendance.jsx
│   │   └── Results.jsx
│   ├── coach/          # Coach pages
│   │   ├── Dashboard.jsx
│   │   ├── Sports.jsx
│   │   └── Teams.jsx
│   └── librarian/      # Librarian pages
│       ├── Dashboard.jsx
│       ├── Books.jsx
│       └── Transactions.jsx
├── services/           # API service modules
│   ├── api.js         # Axios instance
│   ├── authService.js
│   ├── adminService.js
│   ├── studentService.js
│   ├── teacherService.js
│   ├── coachService.js
│   └── librarianService.js
├── context/            # React contexts
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── NotificationContext.jsx
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useForm.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── utils/              # Utility functions
│   ├── constants.js
│   ├── helpers.js
│   ├── validators.js
│   └── formatters.js
├── styles/             # Global styles
│   └── globals.css
├── App.jsx             # Main app component
├── main.jsx           # Entry point
└── routes.jsx         # Route definitions
```

### 2.3 Service Layer Pattern

```javascript
// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

```javascript
// services/authService.js
import api from "./api";

export const authService = {
  // Admin auth
  registerAdmin: (data) => api.post("/auth/admin/register", data),
  loginAdmin: (data) => api.post("/auth/admin/login", data),

  // Student auth
  registerStudent: (data) => api.post("/auth/student/register", data),
  loginStudent: (data) => api.post("/auth/student/login", data),

  // Teacher auth
  registerTeacher: (data) => api.post("/auth/teacher/register", data),
  loginTeacher: (data) => api.post("/auth/teacher/login", data),

  // Coach auth
  registerCoach: (data) => api.post("/auth/coach/register", data),
  loginCoach: (data) => api.post("/auth/coach/login", data),

  // Librarian auth
  registerLibrarian: (data) => api.post("/auth/librarian/register", data),
  loginLibrarian: (data) => api.post("/auth/librarian/login", data),

  // Token verification
  verifyToken: () => api.get("/auth/verify"),

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
```

### 2.4 Context Providers

```javascript
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await authService.verifyToken();
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  const login = async (credentials, role) => {
    const loginFn = {
      admin: authService.loginAdmin,
      student: authService.loginStudent,
      teacher: authService.loginTeacher,
      coach: authService.loginCoach,
      librarian: authService.loginLibrarian,
    }[role];

    const { data } = await loginFn(credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data[role] || data.admin));
    setUser(data[role] || data.admin);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 2.5 Custom Hooks

```javascript
// hooks/useFetch.js
import { useState, useEffect } from "react";

export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFn();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await fetchFn();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};
```

### 2.6 Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        secondary: {
          50: "#f8fafc",
          500: "#64748b",
          700: "#334155",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

---

## 3. Backend Stack

### 3.1 Core Dependencies

```json
{
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^8.9.4",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^8.0.0",
    "dotenv": "^16.5.0",
    "@upstash/ratelimit": "^1.35.1",
    "@upstash/redis": "^1.35.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

### 3.2 Backend Architecture

```
server/
├── config/             # Configuration files
│   ├── db.js          # Database connection
│   ├── env.js         # Environment validation
│   └── constants.js   # App constants
├── controllers/        # Request handlers
│   ├── authController.js
│   ├── adminController.js
│   ├── studentController.js
│   ├── teacherController.js
│   ├── coachController.js
│   ├── classGroupController.js
│   ├── courseController.js
│   ├── moduleController.js
│   ├── attendanceController.js
│   ├── examController.js
│   ├── resultController.js
│   ├── bookController.js
│   ├── transactionController.js
│   ├── sportController.js
│   ├── noticeController.js
│   └── complainController.js
├── middleware/         # Middleware functions
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── rateLimitMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
├── models/             # Mongoose schemas
│   ├── Admin.js
│   ├── Student.js
│   ├── Teacher.js
│   ├── Coach.js
│   ├── ClassGroup.js
│   ├── Course.js
│   ├── Module.js
│   ├── Attendance.js
│   ├── Exam.js
│   ├── Result.js
│   ├── Book.js
│   ├── LibraryTransaction.js
│   ├── Sport.js
│   ├── Notice.js
│   └── Complain.js
├── routes/             # Route definitions
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   ├── studentRoutes.js
│   ├── teacherRoutes.js
│   ├── classGroupRoutes.js
│   ├── moduleRoutes.js
│   ├── libraryRoutes.js
│   ├── noticeRoutes.js
│   └── complainRoutes.js
├── utils/              # Utility functions
│   ├── generateToken.js
│   ├── generateID.js
│   ├── responseHandler.js
│   ├── validators.js
│   └── helpers.js
├── app.js             # Express app setup
└── server.js          # Server entry point
```

### 3.3 Server Configuration

```javascript
// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classGroupRoutes from "./routes/classGroupRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import complainRoutes from "./routes/complainRoutes.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/classgroups", classGroupRoutes);
app.use("/api/v1/modules", moduleRoutes);
app.use("/api/v1/library", libraryRoutes);
app.use("/api/v1/notices", noticeRoutes);
app.use("/api/v1/complaints", complainRoutes);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;
```

### 3.4 Database Connection

```javascript
// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      // MongoDB 8.0+ options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### 3.5 Middleware Implementation

```javascript
// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Coach from "../models/Coach.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user based on role
      let user;
      switch (decoded.role) {
        case "admin":
        case "principal":
        case "librarian":
          user = await Admin.findById(decoded.id).select("-password");
          break;
        case "student":
          user = await Student.findById(decoded.id).select("-password");
          break;
        case "teacher":
          user = await Teacher.findById(decoded.id).select("-password");
          break;
        case "coach":
          user = await Coach.findById(decoded.id).select("-password");
          break;
        default:
          return res.status(401).json({
            success: false,
            message: "Invalid user role",
          });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      req.user.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
  } catch (error) {
    next(error);
  }
};

// middleware/roleMiddleware.js
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

export const checkPermission = (resource, action) => {
  return (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "principal") {
      return res.status(403).json({
        success: false,
        message: "Only admins can perform this action",
      });
    }

    if (req.user.permissions && !req.user.hasPermission(resource, action)) {
      return res.status(403).json({
        success: false,
        message: `Not authorized to ${action} ${resource}`,
      });
    }

    next();
  };
};
```

### 3.6 Rate Limiting

```javascript
// middleware/rateLimitMiddleware.js
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client (if using Upstash)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// Create rate limiters
const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per minute
  analytics: true,
});

const generalLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "15 m"), // 100 requests per 15 minutes
  analytics: true,
});

// Rate limit middleware
export const rateLimitAuth = async (req, res, next) => {
  if (process.env.DISABLE_RATE_LIMITING === "true") {
    return next();
  }

  const identifier = req.ip || "anonymous";
  const { success, limit, remaining, reset } = await authLimiter.limit(
    identifier
  );

  res.set({
    "X-RateLimit-Limit": limit,
    "X-RateLimit-Remaining": remaining,
    "X-RateLimit-Reset": reset,
  });

  if (!success) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  next();
};

export const rateLimitGeneral = async (req, res, next) => {
  if (process.env.DISABLE_RATE_LIMITING === "true") {
    return next();
  }

  const identifier = req.user?.id || req.ip || "anonymous";
  const { success, limit, remaining, reset } = await generalLimiter.limit(
    identifier
  );

  res.set({
    "X-RateLimit-Limit": limit,
    "X-RateLimit-Remaining": remaining,
    "X-RateLimit-Reset": reset,
  });

  if (!success) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  next();
};
```

---

## 4. Database Configuration

### 4.1 MongoDB Connection String

**Development:**

```
mongodb://127.0.0.1:27017/OnlineSchool
```

**Production:**

```
mongodb+srv://<username>:<password>@cluster.mongodb.net/OnlineSchool?retryWrites=true&w=majority
```

### 4.2 Mongoose Configuration

```javascript
// config/db.js
const mongooseOptions = {
  // Connection pool settings
  maxPoolSize: 10,
  minPoolSize: 5,

  // Server selection
  serverSelectionTimeoutMS: 5000,

  // Socket timeout
  socketTimeoutMS: 45000,

  // Heartbeat
  heartbeatFrequencyMS: 10000,
};
```

### 4.3 Database Indexes

```javascript
// Create indexes for performance
// Run once during setup or migration

// Students
db.students.createIndex({ email: 1 }, { unique: true });
db.students.createIndex({ studentID: 1 }, { unique: true });
db.students.createIndex({ schoolID: 1 });
db.students.createIndex({ classGroup: 1 });

// Teachers
db.teachers.createIndex({ email: 1 }, { unique: true });
db.teachers.createIndex({ teacherID: 1 }, { unique: true });
db.teachers.createIndex({ schoolID: 1 });

// Attendance (compound index for daily queries)
db.attendances.createIndex({ classGroup: 1, date: 1 }, { unique: true });

// Results (compound index for student-exam lookup)
db.results.createIndex({ student: 1, exam: 1 }, { unique: true });

// Books (text search)
db.books.createIndex({ title: "text", author: "text", category: "text" });
```

---

## 5. Project Structure

### 5.1 Complete Folder Structure

```
edu-pro/
├── client/                    # Frontend (React)
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
│
├── server/                    # Backend (Node.js/Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── docs/                      # Documentation
│   ├── UNIFIED_SYSTEM_SPECIFICATION.md
│   ├── DATABASE_SCHEMA_REFERENCE.md
│   ├── API_ENDPOINTS_REFERENCE.md
│   └── TECHNOLOGY_DEVELOPMENT_GUIDE.md
│
├── .gitignore
├── README.md
└── package.json              # Root package.json (for scripts)
```

### 5.2 Root Package.json Scripts

```json
{
  "name": "edu-pro",
  "version": "1.0.0",
  "scripts": {
    "client": "cd client && npm run dev",
    "server": "cd server && npm run dev",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "install:all": "npm install && cd client && npm install && cd ../server && npm install",
    "build": "cd client && npm run build",
    "start": "cd server && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

---

## 6. Environment Setup

### 6.1 Server Environment (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URL=mongodb://127.0.0.1:27017/OnlineSchool

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# Rate Limiting (Upstash Redis - Optional)
UPSTASH_REDIS_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_TOKEN=your-redis-token
DISABLE_RATE_LIMITING=true

# CORS
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### 6.2 Client Environment (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1

# App Configuration
VITE_APP_NAME=Edu-Pro
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### 6.3 Environment Validation

```javascript
// config/env.js
const requiredEnvVars = ["PORT", "MONGO_URL", "JWT_SECRET", "JWT_EXPIRES_IN"];

export const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  // Validate JWT_SECRET length
  if (process.env.JWT_SECRET.length < 32) {
    console.warn(
      "WARNING: JWT_SECRET should be at least 32 characters for security"
    );
  }

  console.log("✓ Environment variables validated");
};
```

---

## 7. Installation Guide

### 7.1 Prerequisites

- **Node.js:** v22.16.0 or higher
- **npm:** v10.x or higher
- **MongoDB:** v8.0 or higher (local or Atlas)
- **Git:** Latest version

### 7.2 Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/edu-pro.git
cd edu-pro

# 2. Install all dependencies
npm run install:all

# 3. Configure environment variables
# Server
cp server/.env.example server/.env
# Edit server/.env with your values

# Client
cp client/.env.example client/.env
# Edit client/.env with your values

# 4. Start MongoDB (if local)
mongod --dbpath /path/to/data/db

# 5. Run the application
# Development (both client & server)
npm run dev

# Or run separately:
npm run server   # Backend only (http://localhost:5000)
npm run client   # Frontend only (http://localhost:5173)
```

### 7.3 MongoDB Setup

**Local Installation:**

```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community@8.0
brew services start mongodb-community@8.0

# Windows (Chocolatey)
choco install mongodb

# Ubuntu
sudo apt-get install mongodb

# Verify installation
mongosh --version
```

**MongoDB Atlas (Cloud):**

1. Create account at mongodb.com/atlas
2. Create new cluster (free tier available)
3. Create database user
4. Get connection string
5. Whitelist IP addresses
6. Update MONGO_URL in .env

---

## 8. Development Workflow

### 8.1 Git Workflow

```bash
# Feature branch workflow
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Make changes, commit frequently
git add .
git commit -m "feat: add student registration validation"

# Push and create PR
git push origin feature/your-feature-name
```

### 8.2 Commit Message Convention

```
<type>(<scope>): <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
feat(auth): add JWT refresh token support
fix(attendance): correct deadline validation
docs(api): update endpoint documentation
```

### 8.3 Code Style

**ESLint Configuration:**

```javascript
// eslint.config.js
export default [
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
];
```

### 8.4 API Testing

**Using Thunder Client or Postman:**

1. Import environment variables
2. Set base URL: `http://localhost:5000/api/v1`
3. For authenticated endpoints, add header:
   ```
   Authorization: Bearer <token>
   ```

**Test Flow:**

1. Register admin → Get token
2. Create school profile
3. Create students/teachers
4. Test CRUD operations
5. Test role-based access

---

## 9. Security Implementation

### 9.1 Security Checklist

| Security Measure   | Implementation       | Status |
| ------------------ | -------------------- | ------ |
| Password Hashing   | bcryptjs (10 rounds) | ✅     |
| JWT Authentication | jsonwebtoken         | ✅     |
| RBAC               | Custom middleware    | ✅     |
| Rate Limiting      | Upstash Redis        | ✅     |
| CORS               | Configured domains   | ✅     |
| Helmet             | Security headers     | ✅     |
| Input Validation   | Mongoose + custom    | ✅     |
| Error Handling     | Generic messages     | ✅     |

### 9.2 Security Headers (Helmet)

```javascript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-site" },
    dnsPrefetchControl: true,
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
  })
);
```

### 9.3 Input Sanitization

```javascript
// utils/validators.js
import mongoose from "mongoose";

export const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return input.trim().replace(/[<>]/g, "");
  }
  return input;
};

export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};
```

---

## 10. Testing Guide

### 10.1 API Testing Examples

**Test Authentication:**

```javascript
// Test: Admin Registration
POST /api/v1/auth/admin/register
{
  "username": "test_admin",
  "email": "test@school.com",
  "password": "test123456",
  "confirmPassword": "test123456"
}
// Expected: 201 Created

// Test: Invalid Password
POST /api/v1/auth/admin/register
{
  "username": "test_admin",
  "email": "test@school.com",
  "password": "short",
  "confirmPassword": "short"
}
// Expected: 400 Bad Request (password too short)
```

**Test Authorization:**

```javascript
// Test: Access admin route without token
GET /api/v1/admin/students
// Expected: 401 Unauthorized

// Test: Access admin route with student token
GET /api/v1/admin/students
Authorization: Bearer <student_token>
// Expected: 403 Forbidden
```

### 10.2 Manual Test Checklist

**Authentication Tests:**

- [ ] Admin can register
- [ ] Admin can login
- [ ] Student can register (gender matches school type)
- [ ] Student cannot register wrong gender for school type
- [ ] Teacher can register
- [ ] Coach can register
- [ ] Librarian can register
- [ ] Invalid credentials rejected

**Authorization Tests:**

- [ ] Admin can access all routes
- [ ] Student can only access student routes
- [ ] Teacher can only access teacher routes
- [ ] Unauthorized access returns 403

**Business Logic Tests:**

- [ ] School ID generated correctly
- [ ] Student ID generated correctly
- [ ] Teacher ID generated correctly
- [ ] Attendance deadline enforced
- [ ] Classroom capacity enforced (max 30)
- [ ] Library fine calculated correctly

---

## 11. Deployment Guide

### 11.1 Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Configure MongoDB Atlas (not local)
- [ ] Enable rate limiting (Upstash Redis)
- [ ] Set proper CORS origins
- [ ] Enable HTTPS
- [ ] Configure logging
- [ ] Set up monitoring

### 11.2 Environment Variables (Production)

```env
NODE_ENV=production
PORT=5000
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/EduPro
JWT_SECRET=your-very-long-and-secure-secret-key-minimum-32-chars
JWT_EXPIRES_IN=24h
UPSTASH_REDIS_URL=https://your-redis.upstash.io
UPSTASH_REDIS_TOKEN=your-token
DISABLE_RATE_LIMITING=false
FRONTEND_URL=https://your-frontend-domain.com
```

### 11.3 Deployment Platforms

**Backend (Node.js):**

- Railway
- Render
- Heroku
- DigitalOcean App Platform
- AWS EC2/ECS

**Frontend (React):**

- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

**Database (MongoDB):**

- MongoDB Atlas (recommended)
- AWS DocumentDB
- Self-hosted

### 11.4 Build Commands

```bash
# Build frontend for production
cd client
npm run build
# Output: client/dist/

# Start backend in production
cd server
npm start
```

---

**Document Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025

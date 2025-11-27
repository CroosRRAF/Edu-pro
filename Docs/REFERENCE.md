# ⚡ Quick Reference Guide

**Version:** 1.0.0
**Last Updated:** November 25, 2025
**Purpose:** Fast access to common code patterns, commands, and solutions

---

## 📋 Table of Contents

1. [Environment & Setup](#1-environment--setup)
2. [Common Commands](#2-common-commands)
3. [Code Snippets - Frontend](#3-code-snippets---frontend)
4. [Code Snippets - Backend](#4-code-snippets---backend)
5. [API Patterns](#5-api-patterns)
6. [Database Queries](#6-database-queries)
7. [Authentication Patterns](#7-authentication-patterns)
8. [Error Handling](#8-error-handling)
9. [Validation Patterns](#9-validation-patterns)
10. [Common Issues & Solutions](#10-common-issues--solutions)

---

## 1. Environment & Setup

### 🔧 Environment Variables

#### **Backend (.env)**

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb://127.0.0.1:27017/OnlineSchool
JWT_SECRET=your-super-secret-key-change-in-production-32chars-minimum
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
DISABLE_RATE_LIMITING=true
```

#### **Frontend (.env)**

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Edu-Pro
VITE_APP_VERSION=1.0.0
```

---

## 2. Common Commands

### 📦 Installation

```bash
# Install all dependencies (root, client, server)
npm run install:all

# Install client only
cd client && npm install

# Install server only
cd server && npm install
```

### ▶️ Running the Application

```bash
# Run both client & server (from root)
npm run dev

# Run server only
npm run server
# or
cd server && npm run dev

# Run client only
npm run client
# or
cd client && npm run dev
```

### 🏗️ Building

```bash
# Build frontend for production
cd client
npm run build
# Output: client/dist/

# Preview production build
npm run preview
```

### 🧪 Testing

```bash
# Backend health check
curl http://localhost:5000/api/v1/health

# Frontend dev server
# http://localhost:5173
```

### 🗄️ MongoDB Commands

```bash
# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (macOS/Linux)
sudo systemctl start mongod

# Access MongoDB Shell
mongosh

# Use database
use OnlineSchool

# Show collections
show collections

# Find all users
db.admins.find().pretty()
db.students.find().pretty()
```

### 📝 Git Commands

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Add changes
git add .

# Commit (conventional format)
git commit -m "feat(module): description"
# Types: feat, fix, docs, style, refactor, test, chore

# Push
git push origin feature/your-feature-name

# Pull latest
git pull origin dev
```

---

## 3. Code Snippets - Frontend

### ⚛️ React Component Template

```jsx
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button, Loading, Alert } from "@/components/common";
import { studentService } from "@/services/studentService";

const ComponentName = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await studentService.getSomething();
      setData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Alert type="error">{error}</Alert>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Component Title</h1>
      {/* Your content */}
    </div>
  );
};

export default ComponentName;
```

### 🎣 Custom Hook Pattern

```jsx
// hooks/useApi.js
import { useState, useEffect } from "react";

export const useApi = (apiFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFn();
      setData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

// Usage
const { data, loading, error, refetch } = useApi(
  () => studentService.getProfile(),
  []
);
```

### 📝 Form with React Hook Form

```jsx
import { useForm } from "react-hook-form";
import { Input, Button } from "@/components/common";

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await apiService.submitForm(data);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Min 3 characters" },
        })}
        error={errors.name?.message}
      />

      <Input
        type="email"
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email format",
          },
        })}
        error={errors.email?.message}
      />

      <Button type="submit" loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
```

### 🔐 Protected Route

```jsx
// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loading from "./common/Loading";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Loading fullScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Usage in routes
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>;
```

### 📊 Table Component Usage

```jsx
import { Table } from "@/components/common";

const MyTable = ({ data }) => {
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "grade", label: "Grade", sortable: true },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <>
          <Button size="sm" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      onSort={handleSort}
      pagination
      itemsPerPage={10}
    />
  );
};
```

---

## 4. Code Snippets - Backend

### 🎯 Controller Template

```javascript
// controllers/exampleController.js
import Model from "../models/Model.js";

// @desc    Get all items
// @route   GET /api/v1/items
// @access  Private
export const getItems = async (req, res, next) => {
  try {
    const items = await Model.find({ schoolID: req.user.schoolID })
      .populate("relatedField")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single item
// @route   GET /api/v1/items/:id
// @access  Private
export const getItem = async (req, res, next) => {
  try {
    const item = await Model.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create item
// @route   POST /api/v1/items
// @access  Private
export const createItem = async (req, res, next) => {
  try {
    const item = await Model.create({
      ...req.body,
      schoolID: req.user.schoolID,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update item
// @route   PUT /api/v1/items/:id
// @access  Private
export const updateItem = async (req, res, next) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete item
// @route   DELETE /api/v1/items/:id
// @access  Private
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
```

### 📋 Mongoose Model Template

```javascript
// models/Example.js
import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },

    // Reference to another model
    relatedModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RelatedModel",
    },

    // Array of references
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    // School reference (multi-tenant)
    schoolID: {
      type: String,
      required: true,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
exampleSchema.index({ email: 1 }, { unique: true });
exampleSchema.index({ schoolID: 1 });
exampleSchema.index({ status: 1, schoolID: 1 });

// Virtual property
exampleSchema.virtual("displayName").get(function () {
  return `${this.name} (${this.email})`;
});

// Instance method
exampleSchema.methods.someMethod = function () {
  // Do something
  return this.name.toUpperCase();
};

// Static method
exampleSchema.statics.findBySchool = function (schoolID) {
  return this.find({ schoolID });
};

// Pre-save hook
exampleSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Do something before save
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Example", exampleSchema);
```

### 🛣️ Route Template

```javascript
// routes/exampleRoutes.js
import express from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/exampleController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// GET /api/v1/items
router.get("/", getItems);

// GET /api/v1/items/:id
router.get("/:id", getItem);

// POST /api/v1/items (admin only)
router.post("/", authorize("admin"), createItem);

// PUT /api/v1/items/:id (admin only)
router.put("/:id", authorize("admin"), updateItem);

// DELETE /api/v1/items/:id (admin only)
router.delete("/:id", authorize("admin"), deleteItem);

export default router;
```

---

## 5. API Patterns

### 📡 Making API Calls (Frontend)

```javascript
// services/exampleService.js
import api from "./api";

export const exampleService = {
  // GET all
  getAll: (params) => api.get("/items", { params }),

  // GET by ID
  getById: (id) => api.get(`/items/${id}`),

  // CREATE
  create: (data) => api.post("/items", data),

  // UPDATE
  update: (id, data) => api.put(`/items/${id}`, data),

  // DELETE
  delete: (id) => api.delete(`/items/${id}`),

  // Custom endpoint
  customAction: (id, data) => api.post(`/items/${id}/action`, data),
};

// Usage in component
import { exampleService } from "@/services/exampleService";

// Get all with params
const response = await exampleService.getAll({
  page: 1,
  limit: 10,
  status: "active",
});

// Create new
const newItem = await exampleService.create({
  name: "New Item",
  description: "Description",
});

// Update
const updated = await exampleService.update(itemId, {
  name: "Updated Name",
});

// Delete
await exampleService.delete(itemId);
```

### 🔑 Authentication Headers

```javascript
// Automatically added by axios interceptor in api.js
// But if needed manually:

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

axios.get("/api/v1/protected-route", config);
```

---

## 6. Database Queries

### 🔍 Common Mongoose Queries

```javascript
// Find all
const items = await Model.find();

// Find with filter
const items = await Model.find({ status: "active" });

// Find with multiple conditions
const items = await Model.find({
  status: "active",
  grade: 10,
  schoolID: "sch_001b",
});

// Find one
const item = await Model.findOne({ email: "test@example.com" });

// Find by ID
const item = await Model.findById(id);

// Find with populate
const item = await Model.findById(id)
  .populate("classGroup")
  .populate("teacher");

// Find with select (specific fields)
const items = await Model.find().select("name email status");

// Find with sort
const items = await Model.find().sort({ createdAt: -1 }); // Descending

// Find with pagination
const page = 1;
const limit = 10;
const items = await Model.find()
  .skip((page - 1) * limit)
  .limit(limit);

// Count documents
const count = await Model.countDocuments({ status: "active" });

// Find and update
const updated = await Model.findByIdAndUpdate(
  id,
  { status: "inactive" },
  { new: true, runValidators: true }
);

// Find and delete
const deleted = await Model.findByIdAndDelete(id);

// Aggregation
const results = await Model.aggregate([
  { $match: { schoolID: "sch_001b" } },
  { $group: { _id: "$grade", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
```

---

## 7. Authentication Patterns

### 🔐 JWT Token Generation

```javascript
// utils/generateToken.js
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      schoolID: user.schoolID,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
  );
};

// Usage in controller
const token = generateToken(user);
res.json({
  success: true,
  data: { user, token },
});
```

### 🔒 Password Hashing

```javascript
// In model (pre-save hook)
import bcrypt from "bcryptjs";

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing passwords (instance method)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Usage
const isMatch = await user.comparePassword(password);
```

### 👤 Getting Current User

```javascript
// Backend (from middleware)
const currentUser = req.user;
const schoolID = req.user.schoolID;
const userRole = req.user.role;

// Frontend (from context)
import { useAuth } from "@/context/AuthContext";

const { user, isAuthenticated } = useAuth();
const userRole = user?.role;
const schoolID = user?.schoolID;
```

---

## 8. Error Handling

### ❌ Backend Error Handling

```javascript
// middleware/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = { statusCode: 404, message };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = { statusCode: 409, message };
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { statusCode: 400, message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
```

### 🎯 Frontend Error Handling

```javascript
// In component
try {
  const response = await apiService.someAction();
  // Success
} catch (error) {
  // Handle different error types
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data.message;

    if (status === 401) {
      // Unauthorized - redirect to login
      navigate("/login");
    } else if (status === 403) {
      // Forbidden
      setError("You do not have permission");
    } else if (status === 404) {
      // Not found
      setError("Resource not found");
    } else {
      // Other errors
      setError(message || "An error occurred");
    }
  } else if (error.request) {
    // Request made but no response
    setError("No response from server. Check your connection.");
  } else {
    // Other errors
    setError("An unexpected error occurred");
  }
}
```

---

## 9. Validation Patterns

### ✅ Backend Validation

```javascript
// In controller
const validateInput = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push("Name must be at least 3 characters");
  }

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
};
```

### ✅ Frontend Validation (React Hook Form)

```javascript
const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: "Invalid email format",
  },
};

const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
};

const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Name cannot exceed 50 characters",
  },
};

// Usage
<Input {...register("email", emailValidation)} error={errors.email?.message} />;
```

---

## 10. Common Issues & Solutions

### 🔧 Issue: CORS Error

**Error:**

```
Access to XMLHttpRequest at 'http://localhost:5000' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**

```javascript
// server/app.js
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
```

---

### 🔧 Issue: 401 Unauthorized

**Cause:** Missing or invalid token

**Solution:**

```javascript
// Check if token is stored
const token = localStorage.getItem("token");

// Check if token is sent in request
// In api.js interceptor:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### 🔧 Issue: Database Connection Failed

**Error:**

```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

```bash
# Check if MongoDB is running
mongosh

# Start MongoDB
# Windows: net start MongoDB
# macOS/Linux: sudo systemctl start mongod

# Check connection string in .env
MONGO_URL=mongodb://127.0.0.1:27017/OnlineSchool
```

---

### 🔧 Issue: Port Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

---

### 🔧 Issue: Module Not Found

**Error:**

```
Cannot find module '@/components/Button'
```

**Solution:**

```javascript
// Check vite.config.js has path alias
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}

// Or use relative imports
import Button from '../components/common/Button';
```

---

### 🔧 Issue: Validation Error in Mongoose

**Error:**

```
ValidationError: email: Path `email` is required.
```

**Solution:**

```javascript
// Ensure all required fields are provided
const data = {
  name: "John Doe",
  email: "john@example.com", // Don't forget this!
  password: "password123",
};

await Model.create(data);
```

---

## 📝 Commit Message Templates

```bash
# Feature
git commit -m "feat(auth): add student login functionality"

# Bug fix
git commit -m "fix(attendance): correct deadline validation"

# Documentation
git commit -m "docs(api): update endpoint documentation"

# Styling
git commit -m "style(dashboard): improve layout spacing"

# Refactor
git commit -m "refactor(services): consolidate API calls"

# Test
git commit -m "test(auth): add login integration tests"

# Chore
git commit -m "chore(deps): update dependencies"
```

---

## 🎨 Tailwind CSS Common Classes

```html
<!-- Container -->
<div class="container mx-auto px-4">
  <!-- Card -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Button -->
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      <!-- Input -->
      <input
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Flex -->
        <div class="flex items-center justify-between">
          <!-- Responsive Text -->
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
            <!-- Spacing -->
            <div class="mt-4 mb-6 px-4 py-2"></div>
          </h1>
        </div>
      </div>
    </button>
  </div>
</div>
```

---

## 🚀 Deployment Quick Commands

```bash
# Build frontend
cd client
npm run build

# Environment check
node -v  # Should be 22.16+
npm -v   # Should be 10+

# MongoDB connection test
mongosh "mongodb+srv://cluster.mongodb.net/test"

# Verify environment variables
# Backend: All required vars set
# Frontend: VITE_API_URL points to production

# Deploy backend (Render/Railway)
git push origin main

# Deploy frontend (Vercel)
vercel --prod
```

---

**Last Updated:** November 25, 2025
**Version:** 1.0.0

**💡 Tip: Bookmark this page for quick access during development!**

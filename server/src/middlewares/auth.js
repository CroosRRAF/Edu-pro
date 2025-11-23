import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

// =====================
// Universal Authentication Middleware
// Verifies JWT token and attaches user info to req.user
// =====================
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, adminID/studentID/teacherID }
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// =====================
// Role-Based Authentication Middleware
// Usage: requireRole('admin'), requireRole(['admin', 'teacher'])
// =====================
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userRole = req.user.role;
    const rolesArray = allowedRoles.flat(); // Handle both single and array arguments

    if (!rolesArray.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied: ${rolesArray.join(" or ")} role required`,
      });
    }

    next();
  };
};

// =====================
// Student Authentication Middleware
// Verifies token and checks student role + active status
// =====================
export const studentAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== "student") {
      return res
        .status(403)
        .json({ message: "Access denied: Student role required" });
    }

    // Verify student still exists and is active
    const student = await Student.findById(decoded.id);
    if (!student || student.status !== "active") {
      return res
        .status(401)
        .json({ message: "Student account not found or inactive" });
    }

    req.student = student;
    next();
  } catch (error) {
    console.error("Error in studentAuth:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// =====================
// Teacher Authentication Middleware
// Verifies token and checks teacher role + active status
// =====================
export const teacherAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Access denied: Teacher role required" });
    }

    // Verify teacher still exists and is active
    const teacher = await Teacher.findById(decoded.id);
    if (!teacher || teacher.status !== "active") {
      return res
        .status(401)
        .json({ message: "Teacher account not found or inactive" });
    }

    req.teacher = teacher;
    next();
  } catch (error) {
    console.error("Error in teacherAuth:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// =====================
// Admin Authentication Middleware
// Verifies token and checks admin role + active status
// =====================
export const adminAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied: Admin role required" });
    }

    // Verify admin still exists and is active
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.status !== "active") {
      return res
        .status(401)
        .json({ message: "Admin account not found or inactive" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Error in adminAuth:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// =====================
// Permission Checker Middleware
// Checks if admin has specific permission for a resource
// Usage: checkPermission('students', 'create')
// =====================
export const checkPermission = (resource, action) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: "Admin authentication required" });
    }

    if (!req.admin.hasPermission(resource, action)) {
      return res.status(403).json({
        message: `Access denied: ${action} permission required for ${resource}`,
      });
    }

    next();
  };
};

// =====================
// School Ownership Verification
// Ensures the authenticated user belongs to the same school
// =====================
export const verifySameSchool = (req, res, next) => {
  const userSchool =
    req.admin?.school || req.teacher?.school || req.student?.school;
  const targetSchool = req.params.schoolId || req.body.school;

  if (!userSchool) {
    return res.status(401).json({ message: "School information not found" });
  }

  if (targetSchool && userSchool.toString() !== targetSchool.toString()) {
    return res.status(403).json({ message: "Access denied: Different school" });
  }

  next();
};

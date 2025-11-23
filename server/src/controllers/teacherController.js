import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Course from "../models/Course.js";
import Teacher from "../models/Teacher.js";

// =====================
// Teacher Registration (Admin only)
// =====================
export const teacherRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("school").notEmpty().withMessage("School ID is required"),
  body("teachSclass").optional(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, school, teachSubject, teachSclass } =
        req.body;

      const existingTeacher = await Teacher.findOne({
        email: email.toLowerCase(),
      });

      if (existingTeacher) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const teacher = new Teacher({
        name,
        email: email.toLowerCase(),
        password, // Will be hashed by pre-save hook
        role: "Teacher",
        school,
        teachSubject,
        teachSclass,
      });

      await teacher.save();

      // Update Course with teacher assignment if provided
      if (teachSubject) {
        await Course.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
      }

      const result = teacher.toObject();
      delete result.password;

      res.status(201).json({
        message: "Teacher registered successfully",
        teacher: result,
      });
    } catch (error) {
      console.error("Error in teacherRegister:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Teacher Login
// =====================
export const teacherLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      let teacher = await Teacher.findOne({ email: email.toLowerCase() })
        .populate("teachSubject", "courseName")
        .populate("school", "schoolName")
        .populate("teachSclass", "name grade section");

      if (!teacher) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await teacher.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: teacher._id, role: "teacher", school: teacher.school },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
      );

      const teacherData = teacher.toObject();
      delete teacherData.password;

      res.status(200).json({
        message: "Login successful",
        token,
        teacher: teacherData,
      });
    } catch (error) {
      console.error("Error in teacherLogin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Get All Teachers by School
// =====================
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ school: req.params.id })
      .populate("teachSubject", "courseName")
      .populate("teachSclass", "name grade section")
      .select("-password");

    if (teachers.length > 0) {
      res.status(200).json(teachers);
    } else {
      res.status(404).json({ message: "No teachers found" });
    }
  } catch (error) {
    console.error("Error in getTeachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Teacher Details
// =====================
export const getTeacherDetail = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("teachSubject", "courseName sessions")
      .populate("school", "schoolName")
      .populate("teachSclass", "name grade section")
      .select("-password");

    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ message: "No teacher found" });
    }
  } catch (error) {
    console.error("Error in getTeacherDetail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update Teacher Subject/Course Assignment
// =====================
export const updateTeacherSubject = async (req, res) => {
  const { teacherId, teachSubject } = req.body;

  if (!teacherId || !teachSubject) {
    return res
      .status(400)
      .json({ message: "Teacher ID and Subject ID are required" });
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { teachSubject },
      { new: true }
    ).select("-password");

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Update Course with new teacher
    await Course.findByIdAndUpdate(teachSubject, { teacher: teacherId });

    res.status(200).json({
      message: "Teacher subject updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error in updateTeacherSubject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete Teacher
// =====================
export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Remove teacher reference from Course
    await Course.updateOne(
      { teacher: deletedTeacher._id },
      { $unset: { teacher: 1 } }
    );

    res.status(200).json({
      message: "Teacher deleted successfully",
      teacher: deletedTeacher,
    });
  } catch (error) {
    console.error("Error in deleteTeacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete All Teachers by School
// =====================
export const deleteTeachers = async (req, res) => {
  try {
    const deletionResult = await Teacher.deleteMany({ school: req.params.id });

    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ message: "No teachers found to delete" });
    }

    // Remove teacher references from all Courses
    await Course.updateMany(
      { school: req.params.id },
      { $unset: { teacher: 1 } }
    );

    res.status(200).json({
      message: `${deletionResult.deletedCount} teachers deleted successfully`,
      deletedCount: deletionResult.deletedCount,
    });
  } catch (error) {
    console.error("Error in deleteTeachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete Teachers by Class
// =====================
export const deleteTeachersByClass = async (req, res) => {
  try {
    const deletionResult = await Teacher.deleteMany({
      teachSclass: req.params.id,
    });

    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ message: "No teachers found to delete" });
    }

    res.status(200).json({
      message: `${deletionResult.deletedCount} teachers deleted successfully`,
      deletedCount: deletionResult.deletedCount,
    });
  } catch (error) {
    console.error("Error in deleteTeachersByClass:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Teacher Attendance
// =====================
export const teacherAttendance = async (req, res) => {
  const { date, presentCount, absentCount } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const attendanceDate = new Date(date);
    const existingAttendance = teacher.attendance.find(
      (a) => a.date.toDateString() === attendanceDate.toDateString()
    );

    if (existingAttendance) {
      existingAttendance.presentCount = presentCount;
      existingAttendance.absentCount = absentCount;
    } else {
      teacher.attendance.push({
        date: attendanceDate,
        presentCount,
        absentCount,
      });
    }

    await teacher.save();

    res.status(200).json({
      message: "Attendance recorded successfully",
      attendance: teacher.attendance,
    });
  } catch (error) {
    console.error("Error in teacherAttendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { body, validationResult } from "express-validator";
import ClassGroup from "../models/ClassGroup.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

// =====================
// Create ClassGroup with Auto-Allocation Logic
// =====================
export const createClassGroup = [
  body("grade")
    .isInt({ min: 1, max: 14 })
    .withMessage("Grade must be between 1 and 14"),
  body("section")
    .isIn(["A", "B", "C", "D", "E"])
    .withMessage("Section must be A, B, C, D, or E"),
  body("school").notEmpty().withMessage("School ID is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { grade, section, school, classTeacher } = req.body;
      const name = `${grade}${section}`; // e.g., "10A"

      // Check if class already exists
      const existingClass = await ClassGroup.findOne({
        grade,
        section,
        school,
      });

      if (existingClass) {
        return res
          .status(400)
          .json({ message: "This class group already exists" });
      }

      // Create new class group
      const classGroup = new ClassGroup({
        name,
        grade,
        section,
        school,
        classTeacher,
        maxStudents: 30, // PDP requirement
      });

      await classGroup.save();

      res.status(201).json({
        message: "Class group created successfully",
        classGroup,
      });
    } catch (error) {
      console.error("Error in createClassGroup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Get All ClassGroups by School
// =====================
export const getClassGroups = async (req, res) => {
  try {
    const { grade } = req.query;
    const filter = { school: req.params.id };

    if (grade) {
      filter.grade = parseInt(grade);
    }

    const classGroups = await ClassGroup.find(filter)
      .populate("classTeacher", "name email")
      .populate("school", "schoolName")
      .sort({ grade: 1, section: 1 });

    if (classGroups.length > 0) {
      res.status(200).json(classGroups);
    } else {
      res.status(404).json({ message: "No class groups found" });
    }
  } catch (error) {
    console.error("Error in getClassGroups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get ClassGroup Details
// =====================
export const getClassGroupDetail = async (req, res) => {
  try {
    const classGroup = await ClassGroup.findById(req.params.id)
      .populate("school", "schoolName")
      .populate("classTeacher", "name email");

    if (classGroup) {
      // Get student count
      const studentCount = await Student.countDocuments({
        classGroup: classGroup._id,
      });

      res.status(200).json({
        ...classGroup.toObject(),
        studentCount,
        availableSeats: classGroup.maxStudents - studentCount,
      });
    } else {
      res.status(404).json({ message: "No class group found" });
    }
  } catch (error) {
    console.error("Error in getClassGroupDetail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Students in a ClassGroup
// =====================
export const getClassGroupStudents = async (req, res) => {
  try {
    const students = await Student.find({ classGroup: req.params.id })
      .select("-password")
      .populate("courses", "courseName")
      .sort({ rollNum: 1 });

    if (students.length > 0) {
      res.status(200).json(students);
    } else {
      res.status(404).json({ message: "No students found in this class" });
    }
  } catch (error) {
    console.error("Error in getClassGroupStudents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update ClassGroup
// =====================
export const updateClassGroup = async (req, res) => {
  try {
    const { classTeacher } = req.body;

    const updatedClassGroup = await ClassGroup.findByIdAndUpdate(
      req.params.id,
      { classTeacher },
      { new: true }
    ).populate("classTeacher", "name email");

    if (!updatedClassGroup) {
      return res.status(404).json({ message: "Class group not found" });
    }

    res.status(200).json({
      message: "Class group updated successfully",
      classGroup: updatedClassGroup,
    });
  } catch (error) {
    console.error("Error in updateClassGroup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete ClassGroup (with cascading deletes)
// =====================
export const deleteClassGroup = async (req, res) => {
  try {
    const deletedClass = await ClassGroup.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class group not found" });
    }

    // Cascade delete: Remove students, teachers assigned to this class
    await Student.deleteMany({ classGroup: req.params.id });
    await Teacher.updateMany(
      { teachSclass: req.params.id },
      { $unset: { teachSclass: 1 } }
    );

    res.status(200).json({
      message: "Class group deleted successfully",
      deletedClass,
    });
  } catch (error) {
    console.error("Error in deleteClassGroup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete All ClassGroups by School
// =====================
export const deleteClassGroups = async (req, res) => {
  try {
    const deletionResult = await ClassGroup.deleteMany({
      school: req.params.id,
    });

    if (deletionResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No class groups found to delete" });
    }

    // Cascade delete
    await Student.deleteMany({ school: req.params.id });
    await Teacher.updateMany(
      { school: req.params.id },
      { $unset: { teachSclass: 1 } }
    );
    await Course.deleteMany({ school: req.params.id });

    res.status(200).json({
      message: `${deletionResult.deletedCount} class groups deleted successfully`,
      deletedCount: deletionResult.deletedCount,
    });
  } catch (error) {
    console.error("Error in deleteClassGroups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

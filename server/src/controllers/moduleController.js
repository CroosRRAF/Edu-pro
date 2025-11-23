import { body, validationResult } from "express-validator";
import Course from "../models/Course.js";
import Modules from "../models/Module.js";

// =====================
// Create Module
// =====================
export const createModule = [
  body("moduleID").notEmpty().withMessage("Module ID is required"),
  body("moduleName").notEmpty().withMessage("Module name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("credits")
    .isInt({ min: 0 })
    .withMessage("Credits must be a positive number"),
  body("course").notEmpty().withMessage("Course ID is required"),
  body("instructor").notEmpty().withMessage("Instructor ID is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        moduleID,
        moduleName,
        description,
        credits,
        grade,
        course,
        instructor,
      } = req.body;

      // Check if module ID already exists
      const existingModule = await Modules.findOne({ moduleID });
      if (existingModule) {
        return res.status(400).json({ message: "Module ID already exists" });
      }

      const module = new Modules({
        moduleID,
        moduleName,
        description,
        credits,
        grade,
        course,
        instructor,
      });

      await module.save();

      // Add module to course
      await Course.findByIdAndUpdate(course, {
        $push: { modules: module._id },
      });

      res.status(201).json({
        message: "Module created successfully",
        module,
      });
    } catch (error) {
      console.error("Error in createModule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Get All Modules
// =====================
export const getModules = async (req, res) => {
  try {
    const { course, grade } = req.query;
    const filter = {};

    if (course) filter.course = course;
    if (grade) filter.grade = parseInt(grade);

    const modules = await Modules.find(filter)
      .populate("course", "courseName")
      .populate("instructor", "name email");

    if (modules.length > 0) {
      res.status(200).json(modules);
    } else {
      res.status(404).json({ message: "No modules found" });
    }
  } catch (error) {
    console.error("Error in getModules:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Module by ID
// =====================
export const getModuleById = async (req, res) => {
  try {
    const module = await Modules.findById(req.params.id)
      .populate("course", "courseName grade")
      .populate("instructor", "name email");

    if (module) {
      res.status(200).json(module);
    } else {
      res.status(404).json({ message: "Module not found" });
    }
  } catch (error) {
    console.error("Error in getModuleById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update Module
// =====================
export const updateModule = async (req, res) => {
  try {
    const { moduleName, description, credits, instructor } = req.body;

    const updatedModule = await Modules.findByIdAndUpdate(
      req.params.id,
      { moduleName, description, credits, instructor },
      { new: true }
    ).populate("instructor", "name email");

    if (!updatedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json({
      message: "Module updated successfully",
      module: updatedModule,
    });
  } catch (error) {
    console.error("Error in updateModule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete Module
// =====================
export const deleteModule = async (req, res) => {
  try {
    const deletedModule = await Modules.findByIdAndDelete(req.params.id);

    if (!deletedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Remove module from course
    await Course.findByIdAndUpdate(deletedModule.course, {
      $pull: { modules: deletedModule._id },
    });

    res.status(200).json({
      message: "Module deleted successfully",
      module: deletedModule,
    });
  } catch (error) {
    console.error("Error in deleteModule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Assign Module to Course
// =====================
export const assignModuleToCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const moduleId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const module = await Modules.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Update module's course reference
    module.course = courseId;
    await module.save();

    // Add module to course's modules array
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { modules: moduleId }, // Prevents duplicates
    });

    res.status(200).json({
      message: "Module assigned to course successfully",
      module,
    });
  } catch (error) {
    console.error("Error in assignModuleToCourse:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

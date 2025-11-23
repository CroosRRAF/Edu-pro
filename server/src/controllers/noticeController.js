import { body, validationResult } from "express-validator";
import Notice from "../models/Notice.js";

// =====================
// Create Notice (Hierarchical)
// =====================
export const createNotice = [
  body("title").notEmpty().withMessage("Title is required"),
  body("details").notEmpty().withMessage("Details are required"),
  body("school").notEmpty().withMessage("School ID is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, details, school } = req.body;

      const notice = new Notice({
        title,
        details,
        date: new Date(),
        school,
      });

      await notice.save();

      res.status(201).json({
        message: "Notice created successfully",
        notice,
      });
    } catch (error) {
      console.error("Error in createNotice:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Get All Notices by School
// =====================
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ school: req.params.id })
      .populate("school", "schoolName")
      .sort({ date: -1 }); // Most recent first

    if (notices.length > 0) {
      res.status(200).json(notices);
    } else {
      res.status(404).json({ message: "No notices found" });
    }
  } catch (error) {
    console.error("Error in getNotices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Notice by ID
// =====================
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id).populate(
      "school",
      "schoolName"
    );

    if (notice) {
      res.status(200).json(notice);
    } else {
      res.status(404).json({ message: "Notice not found" });
    }
  } catch (error) {
    console.error("Error in getNoticeById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update Notice
// =====================
export const updateNotice = async (req, res) => {
  try {
    const { title, details } = req.body;

    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, details },
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error("Error in updateNotice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete Notice
// =====================
export const deleteNotice = async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      message: "Notice deleted successfully",
      notice: deletedNotice,
    });
  } catch (error) {
    console.error("Error in deleteNotice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete All Notices by School
// =====================
export const deleteNotices = async (req, res) => {
  try {
    const deletionResult = await Notice.deleteMany({ school: req.params.id });

    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ message: "No notices found to delete" });
    }

    res.status(200).json({
      message: `${deletionResult.deletedCount} notices deleted successfully`,
      deletedCount: deletionResult.deletedCount,
    });
  } catch (error) {
    console.error("Error in deleteNotices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { body, validationResult } from "express-validator";
import Complain from "../models/Complain.js";

// =====================
// Create Complaint
// =====================
export const createComplaint = [
  body("complaint").notEmpty().withMessage("Complaint details are required"),
  body("school").notEmpty().withMessage("School ID is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { complaint, school } = req.body;
      const user = req.user.id; // From auth middleware

      const newComplaint = new Complain({
        user,
        complaint,
        date: new Date(),
        school,
      });

      await newComplaint.save();

      res.status(201).json({
        message: "Complaint submitted successfully",
        complaint: newComplaint,
      });
    } catch (error) {
      console.error("Error in createComplaint:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Get All Complaints by School (Admin Only)
// =====================
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complain.find({ school: req.params.id })
      .populate("user", "name email")
      .populate("school", "schoolName")
      .sort({ date: -1 }); // Most recent first

    if (complaints.length > 0) {
      res.status(200).json(complaints);
    } else {
      res.status(404).json({ message: "No complaints found" });
    }
  } catch (error) {
    console.error("Error in getComplaints:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Complaint by ID
// =====================
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complain.findById(req.params.id)
      .populate("user", "name email")
      .populate("school", "schoolName");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Check if user owns the complaint or is admin
    if (
      complaint.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this complaint" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    console.error("Error in getComplaintById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update Complaint Status (Admin Only)
// =====================
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "in-review", "resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be: pending, in-review, or resolved",
      });
    }

    const updatedComplaint = await Complain.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error in updateComplaintStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Delete Complaint (Admin Only)
// =====================
export const deleteComplaint = async (req, res) => {
  try {
    const deletedComplaint = await Complain.findByIdAndDelete(req.params.id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint deleted successfully",
      complaint: deletedComplaint,
    });
  } catch (error) {
    console.error("Error in deleteComplaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

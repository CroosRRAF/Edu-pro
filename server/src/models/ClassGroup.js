import mongoose from "mongoose";

const classGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 14, // Supports grades 1-14 as per PDP
    },
    section: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E"], // Maximum 5 sections per grade (up to 150 students)
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    maxStudents: {
      type: Number,
      default: 30, // As per PDP requirement
    },
  },
  { timestamps: true }
);

// Compound index to ensure unique grade-section per school
classGroupSchema.index({ school: 1, grade: 1, section: 1 }, { unique: true });

const ClassGroup = mongoose.model("ClassGroup", classGroupSchema);
export default ClassGroup;

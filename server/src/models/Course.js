import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseID: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]{2,4}\d{3}$/, // Example: CS101
    },
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in weeks
    sessions: { type: String }, // Number of sessions or description
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 14, // Course is for a specific grade level
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modules",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// Ensure unique course code per school
courseSchema.index({ school: 1, courseID: 1 }, { unique: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;

import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    examID: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 14, // Exam is for all students in this grade
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modules", // Optional: Exam can be for specific module or entire course
    },
    examDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    passingMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    examType: {
      type: String,
      enum: ["midterm", "final", "quiz", "assignment", "practical"],
      default: "midterm",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;

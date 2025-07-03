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

const Course = mongoose.model("Course", courseSchema);
export default Course;

import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    moduleID: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]{3}\d{3}$/, // Example: MOD101
    },
    moduleName: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true, min: 0 },
    grade: {
      type: Number,
      min: 1,
      max: 14, // Module can be grade-specific
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

const Modules = mongoose.model("Modules", moduleSchema);
export default Modules;

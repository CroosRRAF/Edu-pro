import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modules",
      required: true,
    },
    score: { type: Number, required: true, min: 0, max: 100 },
    grade: {
      type: String,
      required: true,
      enum: ["A+", "A", "A-", "B+", "B", "C", "D", "F"],
    },
  },
  { timestamps: true }
);

resultSchema.index({ student: 1, module: 1 }, { unique: true });

const Results = mongoose.model("Results", resultSchema);
export default Results;

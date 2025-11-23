import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modules",
    },
    marksObtained: { type: Number, required: true, min: 0 },
    totalMarks: { type: Number, required: true, min: 0 },
    percentage: { type: Number, min: 0, max: 100 },
    grade: {
      type: String,
      enum: ["A+", "A", "A-", "B+", "B", "C", "D", "F"],
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

// Calculate percentage and grade before saving
resultSchema.pre("save", function (next) {
  this.percentage = (this.marksObtained / this.totalMarks) * 100;

  // Auto-assign grade based on percentage
  if (this.percentage >= 90) this.grade = "A+";
  else if (this.percentage >= 85) this.grade = "A";
  else if (this.percentage >= 80) this.grade = "A-";
  else if (this.percentage >= 75) this.grade = "B+";
  else if (this.percentage >= 70) this.grade = "B";
  else if (this.percentage >= 60) this.grade = "C";
  else if (this.percentage >= 50) this.grade = "D";
  else this.grade = "F";

  next();
});

resultSchema.index({ student: 1, exam: 1 }, { unique: true });

const Results = mongoose.model("Results", resultSchema);
export default Results;

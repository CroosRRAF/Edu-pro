import bcrypt from "bcrypt"; // ✅ Required for password hashing
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      unique: true,
      match: /^S[A-Z0-9]{7,9}$/, // Allow values like "S1234ABC"
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      match: /^\+?\d{10,15}$/, // Supports + or plain digits
    },
    rollNum: {
      type: Number,
    },
    classGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassGroup",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    sports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sports",
        default: [],
      },
    ],
    birth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Hash password before saving
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 🔐 Method to compare password during login
studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Students = mongoose.model("Students", studentSchema);
export default Students;

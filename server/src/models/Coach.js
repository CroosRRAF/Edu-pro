import bcrypt from "bcrypt";
import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    coachID: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z0-9]{6,10}$/, // Example: COACH123
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      match: /^\+?\d{10,15}$/,
    },
    sports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sports",
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Indexes for efficient querying
// Note: coachID and email already have unique indexes from field definitions

// Hash password before saving
coachSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
coachSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Coaches = mongoose.model("Coaches", coachSchema);
export default Coaches;

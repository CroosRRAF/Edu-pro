import mongoose from "mongoose";

const complainSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students", // Linking to Student model
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    complaint: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const Complain = mongoose.model("Complain", complainSchema);
export default Complain;

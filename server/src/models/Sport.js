import mongoose from "mongoose";

const sportSchema = new mongoose.Schema(
  {
    sportName: { type: String, required: true },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coaches",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Sports = mongoose.model("Sports", sportSchema);
export default Sports;

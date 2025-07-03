import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    bookID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    bookTitle: { type: String, required: true }, // Optional: Keep for quick access
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
    },
    fine: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const Library = mongoose.model("Library", librarySchema);
export default Library;

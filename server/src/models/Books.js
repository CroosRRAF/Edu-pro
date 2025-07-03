import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
      match: /^(?:\d{10}|\d{13})$/, // Supports ISBN-10 or ISBN-13
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.totalCopies;
        },
        message: "Available copies cannot exceed total copies",
      },
    },
    publicationYear: {
      type: Number,
      required: true,
      min: 1800,
      max: new Date().getFullYear(),
    },
    category: {
      type: String,
      enum: ["fiction", "non-fiction", "textbook", "reference", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

// Indexes for efficient querying
bookSchema.index({ isbn: 1 });
bookSchema.index({ title: 1 });

const Books = mongoose.model("Books", bookSchema);
export default Books;

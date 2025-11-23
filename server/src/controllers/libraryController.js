import { body, validationResult } from "express-validator";
import Book from "../models/Book.js";
import LibraryTransaction from "../models/LibraryTransaction.js";

// =====================
// Issue Book
// =====================
export const issueBook = [
  body("bookID").notEmpty().withMessage("Book ID is required"),
  body("borrowedBy").notEmpty().withMessage("Student ID is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { bookID, borrowedBy } = req.body;

      // Check if book is available
      const book = await Book.findById(bookID);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      if (book.availableCopies <= 0) {
        return res.status(400).json({ message: "Book is not available" });
      }

      // Create transaction
      const transaction = new LibraryTransaction({
        bookID,
        bookTitle: book.title,
        borrowedBy,
        borrowDate: new Date(),
        status: "borrowed",
      });

      await transaction.save();

      // Decrease available copies
      book.availableCopies -= 1;
      await book.save();

      res.status(201).json({
        message: "Book issued successfully",
        transaction,
      });
    } catch (error) {
      console.error("Error in issueBook:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Return Book
// =====================
export const returnBook = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;

    const transaction = await LibraryTransaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Calculate fine if overdue (example: $1 per day after 14 days)
    const borrowDate = new Date(transaction.borrowDate);
    const returnDate = new Date();
    const daysElapsed = Math.floor(
      (returnDate - borrowDate) / (1000 * 60 * 60 * 24)
    );
    const dueDate = 14; // 14 days borrowing period

    let fine = 0;
    if (daysElapsed > dueDate) {
      fine = (daysElapsed - dueDate) * 1; // $1 per day
    }

    // Update transaction
    transaction.returnDate = returnDate;
    transaction.status = fine > 0 ? "overdue" : "returned";
    transaction.fine = fine;
    await transaction.save();

    // Increase available copies
    const book = await Book.findById(transaction.bookID);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.status(200).json({
      message: "Book returned successfully",
      transaction,
      fine: fine > 0 ? `$${fine}` : "No fine",
    });
  } catch (error) {
    console.error("Error in returnBook:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get All Library Transactions
// =====================
export const getLibraryTransactions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) filter.status = status;

    const transactions = await LibraryTransaction.find(filter)
      .populate("bookID", "title author isbn")
      .populate("borrowedBy", "name email")
      .sort({ borrowDate: -1 });

    if (transactions.length > 0) {
      res.status(200).json(transactions);
    } else {
      res.status(404).json({ message: "No transactions found" });
    }
  } catch (error) {
    console.error("Error in getLibraryTransactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Student's Transactions
// =====================
export const getStudentTransactions = async (req, res) => {
  try {
    const transactions = await LibraryTransaction.find({
      borrowedBy: req.params.id,
    })
      .populate("bookID", "title author isbn")
      .sort({ borrowDate: -1 });

    if (transactions.length > 0) {
      res.status(200).json(transactions);
    } else {
      res
        .status(404)
        .json({ message: "No transactions found for this student" });
    }
  } catch (error) {
    console.error("Error in getStudentTransactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Calculate Fine
// =====================
export const calculateFine = async (req, res) => {
  try {
    const transaction = await LibraryTransaction.findById(
      req.params.transactionId
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const borrowDate = new Date(transaction.borrowDate);
    const currentDate = new Date();
    const daysElapsed = Math.floor(
      (currentDate - borrowDate) / (1000 * 60 * 60 * 24)
    );
    const dueDate = 14;

    let fine = 0;
    if (daysElapsed > dueDate) {
      fine = (daysElapsed - dueDate) * 1; // $1 per day
    }

    res.status(200).json({
      daysElapsed,
      dueDate,
      fine: fine > 0 ? `$${fine}` : "No fine",
      overdueDays: Math.max(0, daysElapsed - dueDate),
    });
  } catch (error) {
    console.error("Error in calculateFine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update Fine
// =====================
export const updateFine = async (req, res) => {
  try {
    const { fine } = req.body;

    if (fine === undefined || fine < 0) {
      return res.status(400).json({ message: "Valid fine amount is required" });
    }

    const transaction = await LibraryTransaction.findByIdAndUpdate(
      req.params.transactionId,
      { fine },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Fine updated successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error in updateFine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import Students from "../models/Students.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

// =====================
// Login Student
// =====================
export const loginStudent = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const student = await Students.findOne({ email: email.toLowerCase() });
      if (!student) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: student._id, studentID: student.studentID, role: "student" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        student: { ...student.toObject(), password: undefined },
      });
    } catch (error) {
      console.error("Error in loginStudent controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Register Student
// =====================
export const registerStudent = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("contact")
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Valid contact number is required"),
  body("birth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid birth date is required"),
  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, contact, birth, gender } = req.body;

      const existingStudent = await Students.findOne({
        email: email.toLowerCase(),
      });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const studentID = `S${uuidv4().slice(0, 8).toUpperCase()}`;

      const student = new Students({
        studentID,
        name,
        email: email.toLowerCase(),
        password, // Schema's pre-save hook will hash it
        contact,
        birth: birth || new Date("2000-01-01"),
        gender: gender || "other",
        courses: [],
        sports: [],
        status: "active",
      });

      await student.save();

      const token = jwt.sign(
        { id: student._id, studentID, role: "student" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );

      res.status(201).json({
        message: "Student registered successfully",
        token,
        student: { ...student.toObject(), password: undefined },
      });
    } catch (error) {
      console.error("Error in registerStudent controller:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
        stack: error.stack,
      });
    }
  },
];

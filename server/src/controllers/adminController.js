import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Attendance from "../models/Attendance.js";
import Books from "../models/Books.js";
import Coaches from "../models/Coaches.js";
import Course from "../models/Course.js";
import Results from "../models/Results.js";
import Sports from "../models/Sports.js";
import Students from "../models/Students.js";

// Admin Authentication
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin.status !== "active") {
      return res.status(401).json({ message: "Account is not active" });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, adminID: admin.adminID, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        adminID: admin.adminID,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Dashboard Overview
export const getDashboardOverview = async (req, res) => {
  try {
    const [
      totalStudents,
      totalCourses,
      totalSports,
      totalBooks,
      totalCoaches,
      recentAttendance,
      recentResults,
    ] = await Promise.all([
      Students.countDocuments({ status: "active" }),
      Course.countDocuments(),
      Sports.countDocuments(),
      Books.countDocuments(),
      Coaches.countDocuments({ status: "active" }),
      Attendance.find()
        .sort({ date: -1 })
        .limit(10)
        .populate("student", "name"),
      Results.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("student", "name")
        .populate("module", "name"),
    ]);

    res.json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalSports,
        totalBooks,
        totalCoaches,
        recentAttendance,
        recentResults,
      },
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Students Management
export const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status = "" } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { studentID: { $regex: search, $options: "i" } },
      ];
    }
    if (status) {
      query.status = status;
    }

    const students = await Students.find(query)
      .populate("courses", "name code")
      .populate("sports", "sportName")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Students.countDocuments(query);

    res.json({
      success: true,
      data: students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Get all students error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.id)
      .populate("courses", "name code instructor")
      .populate("sports", "sportName coach");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    console.error("Get student by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // Check if studentID or email already exists
    const existingStudent = await Students.findOne({
      $or: [{ studentID: studentData.studentID }, { email: studentData.email }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student ID or email already exists",
      });
    }

    const student = new Students(studentData);
    await student.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("Create student error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const student = await Students.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Update student error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Students.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Courses Management
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("modules", "moduleID moduleName description credits")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: courses });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Create course error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Sports Management
export const getAllSports = async (req, res) => {
  try {
    const sports = await Sports.find()
      .populate("coach", "name email")
      .populate("captain", "name")
      .populate("participants", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: sports });
  } catch (error) {
    console.error("Get all sports error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSport = async (req, res) => {
  try {
    const sport = new Sports(req.body);
    await sport.save();

    res.status(201).json({
      success: true,
      message: "Sport created successfully",
      data: sport,
    });
  } catch (error) {
    console.error("Create sport error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSport = async (req, res) => {
  try {
    const { id } = req.params;
    const sport = await Sports.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sport) {
      return res.status(404).json({ message: "Sport not found" });
    }

    res.json({
      success: true,
      message: "Sport updated successfully",
      data: sport,
    });
  } catch (error) {
    console.error("Update sport error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSport = async (req, res) => {
  try {
    const { id } = req.params;
    const sport = await Sports.findByIdAndDelete(id);

    if (!sport) {
      return res.status(404).json({ message: "Sport not found" });
    }

    res.json({
      success: true,
      message: "Sport deleted successfully",
    });
  } catch (error) {
    console.error("Delete sport error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Library Management
export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 });
    res.json({ success: true, data: books });
  } catch (error) {
    console.error("Get all books error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = new Books(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Create book error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete book error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Attendance Management
export const getAllAttendance = async (req, res) => {
  try {
    const { date, studentId } = req.query;
    let query = {};

    if (date) {
      query.date = new Date(date);
    }
    if (studentId) {
      query.student = studentId;
    }

    const attendance = await Attendance.find(query)
      .populate("student", "name studentID")
      .sort({ date: -1 });

    res.json({ success: true, data: attendance });
  } catch (error) {
    console.error("Get all attendance error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance recorded successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Create attendance error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Update attendance error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json({
      success: true,
      message: "Attendance record deleted successfully",
    });
  } catch (error) {
    console.error("Delete attendance error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Results Management
export const getAllResults = async (req, res) => {
  try {
    const results = await Results.find()
      .populate("student", "name studentID")
      .populate("module", "name code")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: results });
  } catch (error) {
    console.error("Get all results error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createResult = async (req, res) => {
  try {
    const result = new Results(req.body);
    await result.save();

    res.status(201).json({
      success: true,
      message: "Result created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create result error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Results.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({
      success: true,
      message: "Result updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update result error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Results.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    console.error("Delete result error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Coaches Management
export const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coaches.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coaches });
  } catch (error) {
    console.error("Get all coaches error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCoach = async (req, res) => {
  try {
    const coach = new Coaches(req.body);
    await coach.save();

    res.status(201).json({
      success: true,
      message: "Coach created successfully",
      data: coach,
    });
  } catch (error) {
    console.error("Create coach error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCoach = async (req, res) => {
  try {
    const { id } = req.params;
    const coach = await Coaches.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.json({
      success: true,
      message: "Coach updated successfully",
      data: coach,
    });
  } catch (error) {
    console.error("Update coach error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCoach = async (req, res) => {
  try {
    const { id } = req.params;
    const coach = await Coaches.findByIdAndDelete(id);

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.json({
      success: true,
      message: "Coach deleted successfully",
    });
  } catch (error) {
    console.error("Delete coach error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// School Profile Management
// =====================

// Create School Profile (with ID generation)
export const createSchoolProfile = [
  body("schoolName").notEmpty().withMessage("School name is required"),
  body("schoolType")
    .isIn(["boys", "girls", "mixed"])
    .withMessage("School type must be boys, girls, or mixed"),
  body("address").notEmpty().withMessage("Address is required"),
  body("contactNumber")
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Valid contact number is required"),
  body("email").isEmail().withMessage("Valid email is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        schoolName,
        schoolType,
        address,
        contactNumber,
        email,
        establishedYear,
      } = req.body;

      // Generate school ID: sch_XXXY (XXX=auto-increment, Y=b/g/m)
      const lastAdmin = await Admin.findOne().sort({ createdAt: -1 });
      let schoolCounter = 1;
      if (lastAdmin && lastAdmin.schoolID) {
        const lastCounter = parseInt(lastAdmin.schoolID.substring(4, 7));
        schoolCounter = lastCounter + 1;
      }

      const typeCode =
        schoolType === "boys" ? "b" : schoolType === "girls" ? "g" : "m";
      const schoolID = `sch_${String(schoolCounter).padStart(
        3,
        "0"
      )}${typeCode}`;

      // Update admin with school profile
      const admin = await Admin.findById(req.user.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      admin.schoolName = schoolName;
      admin.schoolID = schoolID;
      admin.schoolType = schoolType;
      admin.address = address;
      admin.contactNumber = contactNumber;
      admin.schoolEmail = email;
      admin.establishedYear = establishedYear;
      await admin.save();

      res.status(201).json({
        success: true,
        message: "School profile created successfully",
        data: {
          schoolID,
          schoolName,
          schoolType,
          address,
          contactNumber,
          email,
          establishedYear,
        },
      });
    } catch (error) {
      console.error("Create school profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Update School Profile
export const updateSchoolProfile = async (req, res) => {
  try {
    const {
      schoolName,
      schoolType,
      address,
      contactNumber,
      email,
      establishedYear,
    } = req.body;

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (schoolName) admin.schoolName = schoolName;
    if (schoolType) admin.schoolType = schoolType;
    if (address) admin.address = address;
    if (contactNumber) admin.contactNumber = contactNumber;
    if (email) admin.schoolEmail = email;
    if (establishedYear) admin.establishedYear = establishedYear;

    await admin.save();

    res.json({
      success: true,
      message: "School profile updated successfully",
      data: {
        schoolID: admin.schoolID,
        schoolName: admin.schoolName,
        schoolType: admin.schoolType,
        address: admin.address,
        contactNumber: admin.contactNumber,
        email: admin.schoolEmail,
        establishedYear: admin.establishedYear,
      },
    });
  } catch (error) {
    console.error("Update school profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get School Profile
export const getSchoolProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select(
      "schoolID schoolName schoolType address contactNumber schoolEmail establishedYear"
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      success: true,
      data: {
        schoolID: admin.schoolID,
        schoolName: admin.schoolName,
        schoolType: admin.schoolType,
        address: admin.address,
        contactNumber: admin.contactNumber,
        email: admin.schoolEmail,
        establishedYear: admin.establishedYear,
      },
    });
  } catch (error) {
    console.error("Get school profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register Admin (School Owner)
export const registerAdmin = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("schoolName").notEmpty().withMessage("School name is required"),
  body("schoolType")
    .isIn(["boys", "girls", "mixed"])
    .withMessage("School type must be boys, girls, or mixed"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        name,
        email,
        password,
        schoolName,
        schoolType,
        address,
        contactNumber,
      } = req.body;

      // Check if email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Generate adminID and schoolID
      const lastAdmin = await Admin.findOne().sort({ createdAt: -1 });
      let adminCounter = 1;
      let schoolCounter = 1;

      if (lastAdmin) {
        if (lastAdmin.adminID) {
          const lastAdminNum = parseInt(lastAdmin.adminID.substring(3));
          adminCounter = lastAdminNum + 1;
        }
        if (lastAdmin.schoolID) {
          const lastSchoolNum = parseInt(lastAdmin.schoolID.substring(4, 7));
          schoolCounter = lastSchoolNum + 1;
        }
      }

      const adminID = `adm${String(adminCounter).padStart(4, "0")}`;
      const typeCode =
        schoolType === "boys" ? "b" : schoolType === "girls" ? "g" : "m";
      const schoolID = `sch_${String(schoolCounter).padStart(
        3,
        "0"
      )}${typeCode}`;

      const admin = new Admin({
        adminID,
        name,
        email,
        password,
        schoolName,
        schoolID,
        schoolType,
        address,
        contactNumber,
        role: "principal",
        status: "active",
      });

      await admin.save();

      const token = jwt.sign(
        { id: admin._id, adminID: admin.adminID, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        token,
        admin: {
          adminID,
          schoolID,
          name,
          email,
          schoolName,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error("Register admin error:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

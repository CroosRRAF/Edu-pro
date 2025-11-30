import Attendance from "../models/Attendance.js";
import Course from "../models/Course.js";
import LibraryTransaction from "../models/LibraryTransaction.js";
import Result from "../models/Result.js";
import Sport from "../models/Sport.js";
import Student from "../models/Student.js";

import { body, validationResult } from "express-validator";

// =====================
// Get Student Dashboard Data
// GET /api/students/:id/dashboard
// =====================

export const getStudentDashboardData = async (req, res) => {
  try {
    // Fetch student with populated courses and sports
    const student = await Student.findById(req.params.id)
      .select("studentID name email contact birth gender status courses sports")
      .populate({
        path: "courses",
        select: "courseID courseName modules",
        populate: {
          path: "modules",
          select: "moduleID moduleName",
        },
      })
      .populate({
        path: "sports",
        select: "sportName captain",
      });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Fetch attendance (last 10 records, sorted by date descending)
    const attendance = await Attendance.find({ student: req.params.id })
      .select("date present")
      .sort({ date: -1 })
      .limit(10);

    // Fetch library records with populated book details
    const library = await LibraryTransaction.find({ borrowedBy: req.params.id })
      .select("bookID bookTitle borrowDate returnDate status fine")
      .populate({
        path: "bookID",
        select: "title isbn",
      });

    // Fetch results with populated module details
    const results = await Result.find({ student: req.params.id })
      .select("module score grade")
      .populate({
        path: "module",
        select: "moduleID moduleName",
      });

    // Format the response to match frontend expectations
    const response = {
      student: {
        studentID: student.studentID,
        name: student.name,
        email: student.email,
        contact: student.contact,
        birth: student.birth,
        gender: student.gender,
        status: student.status,
        courses: student.courses.map((course) => ({
          courseID: course.courseID,
          courseName: course.courseName,
          modules: course.modules.map((module) => ({
            moduleID: module.moduleID,
            moduleName: module.moduleName,
          })),
        })),
        sports: student.sports.map((sport) => ({
          sportName: sport.sportName,
          captain:
            sport.captain.toString() === req.params.id
              ? "Captain"
              : "Participant",
        })),
      },
      attendance,
      library: library.map((record) => ({
        bookTitle: record.bookTitle,
        bookID: record.bookID._id,
        isbn: record.bookID.isbn,
        borrowDate: record.borrowDate,
        returnDate: record.returnDate,
        status: record.status,
        fine: record.fine,
      })),
      results: results.map((result) => ({
        module: {
          moduleID: result.module.moduleID,
          moduleName: result.module.moduleName,
        },
        score: result.score,
        grade: result.grade,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(
      "Error in getStudentDashboardData controller:",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Student Profile
// GET /api/students/profile
// =====================
export const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .select("-password")
      .populate("courses", "courseID courseName")
      .populate("sports", "sportName");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    console.error("Error in getProfile controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Update Student Profile
// PUT /api/students/profile
// =====================
export const updateProfile = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("contact")
    .optional()
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
      const { name, contact, birth, gender } = req.body;
      const updates = {};
      if (name) updates.name = name;
      if (contact) updates.contact = contact;
      if (birth) updates.birth = birth;
      if (gender) updates.gender = gender;

      const student = await Student.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        student,
      });
    } catch (error) {
      console.error("Error in updateProfile controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Enroll in Course
// POST /api/students/courses/enroll
// =====================
export const enrollCourse = [
  body("courseID").notEmpty().withMessage("Course ID is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { courseID } = req.body;
      const course = await Course.findOne({ courseID });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const student = await Student.findById(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (student.courses.includes(course._id)) {
        return res
          .status(400)
          .json({ message: "Already enrolled in this course" });
      }

      student.courses.push(course._id);
      await student.save();

      res.status(200).json({
        message: "Enrolled in course successfully",
        course: { courseID: course.courseID, courseName: course.courseName },
      });
    } catch (error) {
      console.error("Error in enrollCourse controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const joinSport = [
  body("sportName").notEmpty().withMessage("Sport name is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { sportName } = req.body;
      const sport = await Sport.findOne({ sportName });
      if (!sport) {
        return res.status(404).json({ message: "Sport not found" });
      }

      const student = await Student.findById(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (student.sports.includes(sport._id)) {
        return res.status(400).json({ message: "Already joined this sport" });
      }

      student.sports.push(sport._id);
      sport.participants.push(student._id);
      await Promise.all([student.save(), sport.save()]);

      res.status(200).json({
        message: "Joined sport successfully",
        sport: { sportName: sport.sportName },
      });
    } catch (error) {
      console.error("Error in joinSport controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Get Student Attendance
// GET /api/students/attendance
// =====================
export const getAttendance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { student: req.user.id };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const attendance = await Attendance.find(filter)
      .select("date present status remarks")
      .sort({ date: -1 });

    if (attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    // Calculate attendance statistics
    const totalDays = attendance.length;
    const presentDays = attendance.filter((record) => record.present).length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage = ((presentDays / totalDays) * 100).toFixed(2);

    res.status(200).json({
      message: "Attendance records retrieved successfully",
      statistics: {
        totalDays,
        presentDays,
        absentDays,
        attendancePercentage: `${attendancePercentage}%`,
      },
      attendance,
    });
  } catch (error) {
    console.error("Error in getAttendance controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Get Student Results
// GET /api/students/results
// =====================
export const getResults = async (req, res) => {
  try {
    const { grade, course } = req.query;
    const filter = { student: req.user.id };

    // Find student to get their classGroup and then grade
    const student = await Student.findById(req.user.id).populate("classGroup");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get results with populated exam and module details
    const results = await Result.find(filter)
      .populate({
        path: "exam",
        select: "examID examName examType grade course module totalMarks",
        populate: [
          { path: "course", select: "courseName courseCode" },
          { path: "module", select: "moduleName moduleID" },
        ],
      })
      .select("marksObtained percentage grade remarks createdAt")
      .sort({ createdAt: -1 });

    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    // Filter by grade if provided
    let filteredResults = results;
    if (grade) {
      filteredResults = results.filter(
        (result) => result.exam && result.exam.grade === parseInt(grade)
      );
    }

    // Filter by course if provided
    if (course) {
      filteredResults = filteredResults.filter(
        (result) =>
          result.exam &&
          result.exam.course &&
          result.exam.course._id.toString() === course
      );
    }

    // Calculate overall statistics
    const totalExams = filteredResults.length;
    const averagePercentage = (
      filteredResults.reduce((sum, result) => sum + result.percentage, 0) /
      totalExams
    ).toFixed(2);

    // Grade distribution
    const gradeDistribution = filteredResults.reduce((acc, result) => {
      acc[result.grade] = (acc[result.grade] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      message: "Results retrieved successfully",
      statistics: {
        totalExams,
        averagePercentage: `${averagePercentage}%`,
        gradeDistribution,
      },
      results: filteredResults,
    });
  } catch (error) {
    console.error("Error in getResults controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get student's enrolled courses
 * @route GET /api/v1/students/courses
 * @access Private (Student)
 */
export const getCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId)
      .populate({
        path: "courses.courseID",
        select: "courseName courseCode description modules",
        populate: {
          path: "modules",
          select: "moduleName moduleCode credits",
        },
      })
      .select("courses");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Courses retrieved successfully",
      courses: student.courses,
    });
  } catch (error) {
    console.error("Error in getCourses controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get student's sports activities
 * @route GET /api/v1/students/sports
 * @access Private (Student)
 */
export const getSports = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId)
      .populate({
        path: "sports.sportID",
        select: "sportName sportType coach schedule",
        populate: {
          path: "coach",
          select: "name email",
        },
      })
      .select("sports");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Sports activities retrieved successfully",
      sports: student.sports,
    });
  } catch (error) {
    console.error("Error in getSports controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

import mongoose from "mongoose";
import Attendance from "./models/Attendance.js";
import Books from "./models/Books.js";
import Coaches from "./models/Coaches.js";
import Course from "./models/Course.js";
import Library from "./models/Library.js";
import Modules from "./models/Modules.js";
import Results from "./models/Results.js";
import Sports from "./models/Sports.js";
import Students from "./models/Students.js";

async function insertData() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/OnlineSchool");
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Promise.all([
      Attendance.deleteMany({}),
      Books.deleteMany({}),
      Coaches.deleteMany({}),
      Course.deleteMany({}),
      Library.deleteMany({}),
      Modules.deleteMany({}),
      Results.deleteMany({}),
      Sports.deleteMany({}),
      Students.deleteMany({}),
    ]);
    console.log("✅ Old Истина Old data cleared");

    // Insert Students
    const students = await Students.create([
      {
        studentID: "S12345678",
        name: "John Brown",
        email: "john.brown@example.com",
        password: "password123",
        contact: "+12345678901",
        birth: new Date("2000-01-01"),
        gender: "male",
        status: "active",
      },
      {
        studentID: "S12345679",
        name: "Sarah Lee",
        email: "sarah.lee@example.com",
        password: "password123",
        contact: "+12345678902",
        birth: new Date("2001-03-12"),
        gender: "female",
      },
      {
        studentID: "S12345680",
        name: "Alex Kim",
        email: "alex.kim@example.com",
        password: "password123",
        contact: "+12345678903",
        birth: new Date("1999-07-20"),
        gender: "other",
      },
    ]);
    const studentMap = Object.fromEntries(
      students.map((s) => [s.name, s._id])
    );

    // Insert Coaches
    const coaches = await Coaches.create([
      {
        coachID: "COACH123",
        name: "Michael Smith",
        email: "michael.smith@example.com",
        password: "coachpass123",
        contact: "+12345678904",
        status: "active",
      },
      {
        coachID: "COACH124",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        password: "coachpass123",
        contact: "+12345678905",
        status: "active",
      },
    ]);
    const coachMap = Object.fromEntries(
      coaches.map((c) => [c.name, c._id])
    );

    // Insert Books
    const books = await Books.create([
      {
        isbn: "9780142437247",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        totalCopies: 10,
        availableCopies: 8,
        publicationYear: 1925,
        category: "fiction",
      },
      {
        isbn: "9780451524935",
        title: "1984",
        author: "George Orwell",
        totalCopies: 15,
        availableCopies: 12,
        publicationYear: 1949,
        category: "fiction",
      },
      {
        isbn: "9780061120084",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        totalCopies: 12,
        availableCopies: 10,
        publicationYear: 1960,
        category: "fiction",
      },
    ]);
    const bookMap = Object.fromEntries(
      books.map((b) => [b.title, b._id])
    );

    // Insert Modules
    const modules = await Modules.create([
      {
        moduleID: "MOD101",
        moduleName: "Introduction to Computer Science",
        description: "Basic concepts of computer science and programming.",
        credits: 3,
        instructor: coachMap["Michael Smith"],
      },
      {
        moduleID: "MOD102",
        moduleName: "Advanced Mathematics",
        description: "In-depth study of calculus and linear algebra.",
        credits: 4,
        instructor: coachMap["Sarah Johnson"],
      },
    ]);
    const moduleMap = Object.fromEntries(
      modules.map((m) => [m.moduleName, m._id])
    );

    // Insert Courses
    const courses = await Course.create([
      {
        courseID: "CS101",
        courseName: "Computer Science Fundamentals",
        description: "Introduction to programming and computer science concepts.",
        duration: 12,
        modules: [moduleMap["Introduction to Computer Science"]],
      },
      {
        courseID: "MATH101",
        courseName: "Calculus I",
        description: "Fundamentals of calculus and its applications.",
        duration: 12,
        modules: [moduleMap["Advanced Mathematics"]],
      },
    ]);
    const courseMap = Object.fromEntries(
      courses.map((c) => [c.courseName, c._id])
    );

    // Update Students with Courses
    await Students.updateMany(
      {},
      {
        $set: {
          courses: [
            courseMap["Computer Science Fundamentals"],
            courseMap["Calculus I"],
          ],
        },
      }
    );

    // Insert Sports
    const sports = await Sports.create([
      {
        sportName: "Basketball",
        coach: coachMap["Michael Smith"],
        captain: studentMap["John Brown"],
        participants: [
          studentMap["John Brown"],
          studentMap["Sarah Lee"],
          studentMap["Alex Kim"],
        ],
      },
      {
        sportName: "Soccer",
        coach: coachMap["Sarah Johnson"],
        captain: studentMap["Sarah Lee"],
        participants: [studentMap["Sarah Lee"], studentMap["Alex Kim"]],
      },
    ]);

    // Insert Attendance
    await Attendance.create([
      {
        student: studentMap["John Brown"],
        date: new Date("2025-06-21"),
        present: false,
      },
      {
        student: studentMap["John Brown"],
        date: new Date("2025-06-22"),
        present: true,
      },
      {
        student: studentMap["Sarah Lee"],
        date: new Date("2025-06-21"),
        present: true,
      },
      {
        student: studentMap["Sarah Lee"],
        date: new Date("2025-06-22"),
        present: false,
      },
    ]);

    // Insert Library Records
    await Library.create([
      {
        bookID: bookMap["The Great Gatsby"],
        bookTitle: "The Great Gatsby",
        borrowedBy: studentMap["John Brown"],
        borrowDate: new Date("2025-06-01"),
        returnDate: new Date("2025-06-15"),
        status: "returned",
        fine: 0,
      },
      {
        bookID: bookMap["1984"],
        bookTitle: "1984",
        borrowedBy: studentMap["Sarah Lee"],
        borrowDate: new Date("2025-06-10"),
        status: "borrowed",
        fine: 0,
      },
    ]);

    // Insert Results
    await Results.create([
      {
        student: studentMap["John Brown"],
        module: moduleMap["Introduction to Computer Science"],
        score: 85,
        grade: "B+",
      },
      {
        student: studentMap["Sarah Lee"],
        module: moduleMap["Advanced Mathematics"],
        score: 92,
        grade: "A",
      },
    ]);

    console.log("✅ Data inserted successfully");

  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("✅ MongoDB connection closed");
  }
}

insertData();
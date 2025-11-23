import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../src/models/Admin.js";
import Attendance from "../src/models/Attendance.js";
import Books from "../src/models/Books.js";
import Coaches from "../src/models/Coaches.js";
import Course from "../src/models/Course.js";
import Library from "../src/models/Library.js";
import Modules from "../src/models/Modules.js";
import Results from "../src/models/Results.js";
import Sports from "../src/models/Sports.js";
import Students from "../src/models/Students.js";

dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/OnlineSchool",
      {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    );
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
      Admin.deleteMany({}),
    ]);
    console.log("✅ Old data cleared");

    // Insert Admins
    const admins = await Admin.create([
      {
        adminID: "A12345678",
        name: "Admin User",
        email: "admin@school.com",
        password: "admin123",
        contact: "+12345678900",
        role: "super_admin",
        status: "active",
      },
      {
        adminID: "A12345679",
        name: "Moderator User",
        email: "moderator@school.com",
        password: "moderator123",
        contact: "+12345678901",
        role: "moderator",
        status: "active",
      },
    ]);
    console.log("✅ Admins created");

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
        status: "active",
      },
      {
        studentID: "S12345680",
        name: "Alex Kim",
        email: "alex.kim@example.com",
        password: "password123",
        contact: "+12345678903",
        birth: new Date("1999-07-20"),
        gender: "other",
        status: "active",
      },
    ]);
    console.log("✅ Students created");

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
    console.log("✅ Coaches created");

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
    console.log("✅ Books created");

    // Insert Modules
    const modules = await Modules.create([
      {
        moduleID: "MOD101",
        moduleName: "Introduction to Computer Science",
        description: "Basic concepts of computer science and programming.",
        credits: 3,
        instructor: coaches[0]._id,
      },
      {
        moduleID: "MOD102",
        moduleName: "Advanced Mathematics",
        description: "In-depth study of calculus and linear algebra.",
        credits: 4,
        instructor: coaches[1]._id,
      },
    ]);
    console.log("✅ Modules created");

    // Insert Courses
    const courses = await Course.create([
      {
        courseID: "CS101",
        courseName: "Computer Science Fundamentals",
        description: "Introduction to computer science concepts",
        duration: 12, // Duration in weeks
        modules: [modules[0]._id],
      },
      {
        courseID: "MATH101",
        courseName: "Calculus I",
        description: "Introduction to calculus",
        duration: 16, // Duration in weeks
        modules: [modules[1]._id],
      },
    ]);
    console.log("✅ Courses created");

    // Update students with their enrolled courses
    await Students.findByIdAndUpdate(students[0]._id, {
      $push: { courses: courses[0]._id },
    });
    await Students.findByIdAndUpdate(students[1]._id, {
      $push: { courses: { $each: [courses[0]._id, courses[1]._id] } },
    });
    await Students.findByIdAndUpdate(students[2]._id, {
      $push: { courses: courses[1]._id },
    });
    console.log("✅ Students enrolled in courses");

    // Insert Sports
    const sports = await Sports.create([
      {
        sportName: "Basketball",
        coach: coaches[0]._id,
        captain: students[0]._id,
        participants: [students[0]._id, students[1]._id, students[2]._id],
      },
      {
        sportName: "Soccer",
        coach: coaches[1]._id,
        captain: students[1]._id,
        participants: [students[1]._id, students[2]._id],
      },
    ]);
    console.log("✅ Sports created");

    // Update students with their sports participation
    await Students.findByIdAndUpdate(students[0]._id, {
      $push: { sports: { $each: [sports[0]._id, sports[1]._id] } },
    });
    await Students.findByIdAndUpdate(students[1]._id, {
      $push: { sports: { $each: [sports[0]._id, sports[1]._id] } },
    });
    await Students.findByIdAndUpdate(students[2]._id, {
      $push: { sports: { $each: [sports[0]._id, sports[1]._id] } },
    });
    console.log("✅ Students enrolled in sports");

    // Insert Attendance
    await Attendance.create([
      {
        student: students[0]._id,
        date: new Date("2024-01-15"),
        present: true,
      },
      {
        student: students[0]._id,
        date: new Date("2024-01-16"),
        present: false,
      },
      {
        student: students[1]._id,
        date: new Date("2024-01-15"),
        present: true,
      },
      {
        student: students[1]._id,
        date: new Date("2024-01-16"),
        present: true,
      },
    ]);
    console.log("✅ Attendance created");

    // Insert Results
    await Results.create([
      {
        student: students[0]._id,
        module: modules[0]._id,
        score: 85,
        grade: "B+",
      },
      {
        student: students[1]._id,
        module: modules[1]._id,
        score: 92,
        grade: "A",
      },
    ]);
    console.log("✅ Results created");

    // Insert Library Records
    await Library.create([
      {
        bookID: books[0]._id,
        bookTitle: "The Great Gatsby",
        borrowedBy: students[0]._id,
        borrowDate: new Date("2024-01-01"),
        returnDate: new Date("2024-01-15"),
        status: "returned",
        fine: 0,
      },
      {
        bookID: books[1]._id,
        bookTitle: "1984",
        borrowedBy: students[1]._id,
        borrowDate: new Date("2024-01-10"),
        status: "borrowed",
        fine: 0,
      },
    ]);
    console.log("✅ Library records created");

    console.log("✅ Database seeded successfully!");
    console.log("\n📋 Login Credentials:");
    console.log("Admin: admin@school.com / admin123");
    console.log("Moderator: moderator@school.com / moderator123");
    console.log("Student: john.brown@example.com / password123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("✅ MongoDB connection closed");
  }
}

seedDatabase();

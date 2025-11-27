# Edu-Pro Database Schema Reference

**Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025
**Database:** MongoDB 8.0+ with Mongoose 8.9.4 ODM

---

## Table of Contents

1. [Overview](#1-overview)
2. [Entity Relationship Diagram](#2-entity-relationship-diagram)
3. [User Models](#3-user-models)
4. [Academic Models](#4-academic-models)
5. [Attendance & Assessment Models](#5-attendance--assessment-models)
6. [Library Models](#6-library-models)
7. [Sports Model](#7-sports-model)
8. [Communication Models](#8-communication-models)
9. [Index Definitions](#9-index-definitions)
10. [Validation Patterns](#10-validation-patterns)

---

## 1. Overview

### 1.1 Database Summary

| Metric            | Value                                    |
| ----------------- | ---------------------------------------- |
| Total Collections | 15                                       |
| ODM Framework     | Mongoose 8.9.4                           |
| Database          | MongoDB 8.0+                             |
| Connection        | `mongodb://127.0.0.1:27017/OnlineSchool` |

### 1.2 Collection List

| #   | Collection            | Description           | Document Type |
| --- | --------------------- | --------------------- | ------------- |
| 1   | `admins`              | School administrators | User          |
| 2   | `students`            | Enrolled students     | User          |
| 3   | `teachers`            | Teaching staff        | User          |
| 4   | `coaches`             | Sports staff          | User          |
| 5   | `classgroups`         | Classrooms/sections   | Academic      |
| 6   | `courses`             | Course catalog        | Academic      |
| 7   | `modules`             | Course modules        | Academic      |
| 8   | `attendances`         | Daily attendance      | Assessment    |
| 9   | `exams`               | Examinations          | Assessment    |
| 10  | `results`             | Student results       | Assessment    |
| 11  | `books`               | Library catalog       | Library       |
| 12  | `librarytransactions` | Borrow/return records | Library       |
| 13  | `sports`              | Sports activities     | Sports        |
| 14  | `notices`             | Announcements         | Communication |
| 15  | `complains`           | User complaints       | Communication |

---

## 2. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ADMIN (Principal)                                  │
│  • schoolID (unique)                                                        │
│  • adminID (unique)                                                         │
│  • permissions object                                                       │
└─────────────────────────────┬───────────────────────────────────────────────┘
                              │ 1:1 owns school
                              │
          ┌───────────────────┼───────────────────┬───────────────────┐
          │                   │                   │                   │
          ▼                   ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│    STUDENT      │ │    TEACHER      │ │     COACH       │ │   LIBRARIAN     │
│ • studentID     │ │ • teacherID     │ │ • coachType     │ │ (stored in      │
│ • classGroup    │ │ • subjectsTaught│ │ • specialization│ │  admins with    │
│ • courses[ ]    │ │ • classGroup    │ │ • teams[ ]      │ │  role)          │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘ └─────────────────┘
         │                   │                   │
         │           ┌───────┴───────┐           │
         │           │               │           │
         ▼           ▼               ▼           ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   CLASSGROUP    │ │     COURSE      │ │     SPORT       │
│ • className     │ │ • courseName    │ │ • sportName     │
│ • grade         │ │ • modules[ ]    │ │ • participants[]│
│ • students[ ]   │ │ • teacher       │ │ • coach         │
│ • teacher       │ │ • grade         │ │ • events[ ]     │
└────────┬────────┘ └────────┬────────┘ └─────────────────┘
         │                   │
         │                   ▼
         │          ┌─────────────────┐
         │          │     MODULE      │
         │          │ • moduleName    │
         │          │ • credits       │
         │          │ • instructor    │
         │          └─────────────────┘
         │
         ├──────────────────────────────────────┐
         │                                      │
         ▼                                      ▼
┌─────────────────┐                   ┌─────────────────┐
│   ATTENDANCE    │                   │      EXAM       │
│ • date          │                   │ • examName      │
│ • students[{    │                   │ • examType      │
│   student,      │                   │ • date          │
│   status}]      │                   │ • modules[ ]    │
│ • finalized     │                   │ • totalMarks    │
└─────────────────┘                   └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │     RESULT      │
                                      │ • student       │
                                      │ • exam          │
                                      │ • marks[{       │
                                      │   module,       │
                                      │   obtained}]    │
                                      │ • grade         │
                                      └─────────────────┘

┌─────────────────┐        ┌─────────────────────────────┐
│      BOOK       │◀───────│   LIBRARY TRANSACTION       │
│ • title         │        │ • book                      │
│ • isbn          │        │ • student                   │
│ • totalCopies   │        │ • issueDate                 │
│ • available     │        │ • dueDate                   │
└─────────────────┘        │ • returnDate                │
                           │ • fine                      │
                           └─────────────────────────────┘

┌─────────────────┐        ┌─────────────────────────────┐
│     NOTICE      │        │        COMPLAIN             │
│ • title         │        │ • title                     │
│ • content       │        │ • description               │
│ • audience      │        │ • submittedBy               │
│ • createdBy     │        │ • status                    │
│ • targetClass   │        │ • response                  │
└─────────────────┘        └─────────────────────────────┘
```

---

## 3. User Models

### 3.1 Admin Schema

**Collection:** `admins`

```javascript
const adminSchema = new mongoose.Schema({
  adminID: {
    type: String,
    unique: true,
    // Format: admXXXX (e.g., adm0001)
    // Auto-generated on creation
  },

  // Authentication
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Never returned in queries
  },

  // Personal Information
  name: {
    type: String,
    trim: true,
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
  },

  // School Information
  schoolID: {
    type: String,
    unique: true,
    sparse: true,
    // Format: sch_XXXy (e.g., sch_001b)
  },

  schoolName: String,

  schoolType: {
    type: String,
    enum: ["boys", "girls", "mixed"],
  },

  role: {
    type: String,
    enum: ["admin", "principal", "librarian", "assistant_librarian"],
    default: "admin",
  },

  // Permissions Object
  permissions: {
    students: {
      create: { type: Boolean, default: true },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
    },
    teachers: {
      create: { type: Boolean, default: true },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
    },
    courses: {
      create: { type: Boolean, default: true },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
    },
    sports: {
      create: { type: Boolean, default: true },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
    },
    library: {
      create: { type: Boolean, default: true },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
    },
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Methods
adminSchema.methods.hasPermission = function (resource, action) {
  return this.permissions?.[resource]?.[action] === true;
};

// Pre-save hook for password hashing
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.updatedAt = Date.now();
  next();
});
```

**Indexes:**

```javascript
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ adminID: 1 }, { unique: true });
adminSchema.index({ schoolID: 1 }, { unique: true, sparse: true });
```

---

### 3.2 Student Schema

**Collection:** `students`

```javascript
const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    unique: true,
    // Format: st{schoolLast4}{nicLast4}
    // Example: st010m1099
  },

  // Personal Information
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },

  nic: {
    type: String,
    required: [true, "NIC is required"],
    // National Identity Card number
    // Last 4 digits used for ID generation
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
    // Must match school type for boys/girls schools
  },

  dateOfBirth: {
    type: Date,
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
  },

  photo: {
    type: String, // URL to profile photo
  },

  // Academic Information
  classGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassGroup",
    // Reference to assigned classroom
  },

  grade: {
    type: Number,
    min: 1,
    max: 14,
  },

  section: {
    type: String,
    enum: ["A", "B", "C", "D", "E"],
  },

  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  // Registration & Status
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["active", "inactive", "graduated", "transferred"],
    default: "active",
  },

  // Guardian Information
  guardianName: String,
  guardianPhone: String,
  guardianRelation: String,

  // School Reference
  schoolID: {
    type: String,
    required: [true, "School ID is required"],
  },

  role: {
    type: String,
    default: "student",
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Validation: Gender must match school type
studentSchema.pre("save", async function (next) {
  if (this.isModified("gender") || this.isNew) {
    const Admin = mongoose.model("Admin");
    const school = await Admin.findOne({ schoolID: this.schoolID });

    if (school) {
      if (school.schoolType === "boys" && this.gender !== "male") {
        throw new Error("Only male students can register in boys school");
      }
      if (school.schoolType === "girls" && this.gender !== "female") {
        throw new Error("Only female students can register in girls school");
      }
    }
  }
  next();
});
```

**Indexes:**

```javascript
studentSchema.index({ studentID: 1 }, { unique: true });
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ schoolID: 1 });
studentSchema.index({ classGroup: 1 });
studentSchema.index({ grade: 1, section: 1 });
```

---

### 3.3 Teacher Schema

**Collection:** `teachers`

```javascript
const teacherSchema = new mongoose.Schema({
  teacherID: {
    type: String,
    unique: true,
    // Format: te{schoolLast4}{nicLast4}
    // Example: te010m1102
  },

  // Personal Information
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },

  nic: {
    type: String,
    required: [true, "NIC is required"],
  },

  phone: String,

  address: String,

  photo: String,

  // Professional Information
  qualification: {
    type: String,
    // e.g., "M.Ed", "B.Sc", "Ph.D"
  },

  experience: {
    type: Number, // Years of experience
  },

  specialization: {
    type: String,
    // Primary subject area
  },

  // Role & Assignment
  teacherRole: {
    type: String,
    enum: ["grade_incharge", "class_teacher", "subject_teacher"],
    default: "subject_teacher",
  },

  // For Grade Incharge (Supervisor)
  assignedGrades: [
    {
      type: Number,
      min: 1,
      max: 14,
      // e.g., [1, 2, 3, 4, 5] for primary supervisor
    },
  ],

  // For Class Teacher
  classGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassGroup",
    // Single classroom assignment
  },

  // For Subject Teacher
  subjectsTaught: [
    {
      type: String,
      // List of subjects taught
    },
  ],

  assignedClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassGroup",
      // Classes where teacher teaches
    },
  ],

  // Employment
  joiningDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["active", "inactive", "on_leave", "terminated"],
    default: "active",
  },

  // School Reference
  schoolID: {
    type: String,
    required: [true, "School ID is required"],
  },

  role: {
    type: String,
    default: "teacher",
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

**Indexes:**

```javascript
teacherSchema.index({ teacherID: 1 }, { unique: true });
teacherSchema.index({ email: 1 }, { unique: true });
teacherSchema.index({ schoolID: 1 });
teacherSchema.index({ classGroup: 1 });
teacherSchema.index({ teacherRole: 1 });
```

---

### 3.4 Coach Schema

**Collection:** `coaches`

```javascript
const coachSchema = new mongoose.Schema({
  coachID: {
    type: String,
    unique: true,
  },

  // Personal Information
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },

  phone: String,

  address: String,

  photo: String,

  // Coach Type
  coachType: {
    type: String,
    enum: ["head_coach", "assistant_coach"],
    default: "assistant_coach",
  },

  // Specialization
  specialization: {
    type: String,
    // e.g., "Cricket", "Football", "Athletics"
  },

  sportsCategory: {
    type: String,
    enum: ["indoor", "outdoor", "both"],
  },

  // Assigned Teams/Sports
  assignedSports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sport",
    },
  ],

  // Experience
  experience: Number,

  certifications: [String],

  // Employment
  joiningDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["active", "inactive", "on_leave"],
    default: "active",
  },

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "coach",
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

## 4. Academic Models

### 4.1 ClassGroup Schema

**Collection:** `classgroups`

```javascript
const classGroupSchema = new mongoose.Schema({
  classGroupID: {
    type: String,
    unique: true,
  },

  // Class Identification
  className: {
    type: String,
    required: [true, "Class name is required"],
    // e.g., "10A", "5B", "12C"
  },

  grade: {
    type: Number,
    required: [true, "Grade is required"],
    min: 1,
    max: 14,
  },

  section: {
    type: String,
    required: [true, "Section is required"],
    enum: ["A", "B", "C", "D", "E"],
  },

  // Academic Year
  academicYear: {
    type: String,
    // e.g., "2024-2025"
  },

  // Class Teacher (one per class)
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  // Enrolled Students
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],

  // Capacity
  capacity: {
    type: Number,
    default: 30,
    max: 30,
  },

  currentStrength: {
    type: Number,
    default: 0,
  },

  // Assigned Courses
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  // Room Information
  roomNumber: String,

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for checking if class is full
classGroupSchema.virtual("isFull").get(function () {
  return this.currentStrength >= this.capacity;
});

// Pre-save validation
classGroupSchema.pre("save", function (next) {
  if (this.students && this.students.length > this.capacity) {
    throw new Error(`Class cannot exceed ${this.capacity} students`);
  }
  this.currentStrength = this.students ? this.students.length : 0;
  next();
});
```

**Indexes:**

```javascript
classGroupSchema.index({ schoolID: 1, grade: 1, section: 1 }, { unique: true });
classGroupSchema.index({ teacher: 1 });
```

---

### 4.2 Course Schema

**Collection:** `courses`

```javascript
const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    unique: true,
  },

  // Course Information
  courseName: {
    type: String,
    required: [true, "Course name is required"],
    trim: true,
    // e.g., "Mathematics", "Physics", "English"
  },

  courseCode: {
    type: String,
    // e.g., "MATH-101", "PHY-201"
  },

  description: {
    type: String,
  },

  // Academic Level
  grade: {
    type: Number,
    required: [true, "Grade is required"],
    min: 1,
    max: 14,
  },

  // Course Content
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],

  // Assignment
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  classGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassGroup",
    },
  ],

  // Duration
  duration: {
    type: Number, // Duration in weeks
  },

  credits: {
    type: Number,
    default: 3,
  },

  // Status
  status: {
    type: String,
    enum: ["active", "inactive", "archived"],
    default: "active",
  },

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

### 4.3 Module Schema

**Collection:** `modules`

```javascript
const moduleSchema = new mongoose.Schema({
  moduleID: {
    type: String,
    unique: true,
  },

  // Module Information
  moduleName: {
    type: String,
    required: [true, "Module name is required"],
    trim: true,
    // e.g., "Algebra", "Thermodynamics", "Grammar"
  },

  moduleCode: {
    type: String,
  },

  description: {
    type: String,
  },

  // Academic Details
  credits: {
    type: Number,
    default: 1,
  },

  duration: {
    type: Number, // Duration in hours/weeks
  },

  // Assignment
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  // Content
  topics: [String],

  learningOutcomes: [String],

  // Assessment
  assessmentType: {
    type: String,
    enum: ["exam", "assignment", "project", "mixed"],
    default: "exam",
  },

  // Status
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

## 5. Attendance & Assessment Models

### 5.1 Attendance Schema

**Collection:** `attendances`

```javascript
const attendanceSchema = new mongoose.Schema({
  attendanceID: {
    type: String,
    unique: true,
  },

  // Class Reference
  classGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassGroup",
    required: true,
  },

  // Date
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  // Student Records
  students: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["present", "absent", "late", "leave"],
        default: "absent",
      },
      remarks: String,
    },
  ],

  // Tracking
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },

  markedAt: {
    type: Date,
    default: Date.now,
  },

  // Finalization
  finalized: {
    type: Boolean,
    default: false,
  },

  finalizedAt: Date,

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique constraint: one attendance per class per day
attendanceSchema.index({ classGroup: 1, date: 1 }, { unique: true });

// Auto-finalization check
attendanceSchema.methods.canEdit = function () {
  const now = new Date();
  const cutoffTime = new Date(this.date);
  cutoffTime.setHours(21, 0, 0, 0); // 9:00 PM
  return now < cutoffTime && !this.finalized;
};
```

**Business Rules Implementation:**

```javascript
// Deadline check (8:30 PM)
const isBeforeDeadline = () => {
  const now = new Date();
  const deadline = new Date();
  deadline.setHours(20, 30, 0, 0);
  return now < deadline;
};

// Auto-finalization job (runs at 9:00 PM)
const finalizeAttendance = async (schoolID) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await Attendance.updateMany(
    {
      schoolID,
      date: { $gte: today },
      finalized: false,
    },
    {
      finalized: true,
      finalizedAt: new Date(),
    }
  );
};
```

---

### 5.2 Exam Schema

**Collection:** `exams`

```javascript
const examSchema = new mongoose.Schema({
  examID: {
    type: String,
    unique: true,
  },

  // Exam Information
  examName: {
    type: String,
    required: [true, "Exam name is required"],
    trim: true,
    // e.g., "Mid Term Examination", "Final Exam"
  },

  examType: {
    type: String,
    enum: ["midterm", "final", "test", "quiz", "assignment"],
    required: true,
  },

  description: String,

  // Schedule
  date: {
    type: Date,
    required: true,
  },

  startTime: String,

  duration: {
    type: Number, // Duration in minutes
  },

  // Academic Scope
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 14,
  },

  classGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassGroup",
    },
  ],

  // Subjects/Modules
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  // Marks
  totalMarks: {
    type: Number,
    required: true,
  },

  passingMarks: {
    type: Number,
  },

  // Status
  status: {
    type: String,
    enum: ["scheduled", "ongoing", "completed", "cancelled"],
    default: "scheduled",
  },

  // Created By
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel",
  },

  createdByModel: {
    type: String,
    enum: ["Admin", "Teacher"],
  },

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

### 5.3 Result Schema

**Collection:** `results`

```javascript
const resultSchema = new mongoose.Schema({
  resultID: {
    type: String,
    unique: true,
  },

  // References
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },

  // Marks Breakdown
  marks: [
    {
      module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
      marksObtained: {
        type: Number,
        required: true,
        min: 0,
      },
      totalMarks: {
        type: Number,
        required: true,
      },
      percentage: Number,
    },
  ],

  // Aggregate Scores
  totalMarksObtained: {
    type: Number,
    required: true,
  },

  totalMaxMarks: {
    type: Number,
    required: true,
  },

  percentage: {
    type: Number,
    // Calculated: (totalMarksObtained / totalMaxMarks) * 100
  },

  // Grading
  grade: {
    type: String,
    // e.g., "A+", "A", "B+", "B", "C", "D", "F"
  },

  gpa: {
    type: Number,
    min: 0,
    max: 4.0,
  },

  // Status
  status: {
    type: String,
    enum: ["pass", "fail", "pending"],
    default: "pending",
  },

  // Entry Information
  enteredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  remarks: String,

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique: one result per student per exam
resultSchema.index({ student: 1, exam: 1 }, { unique: true });

// Pre-save: Calculate percentage and determine pass/fail
resultSchema.pre("save", function (next) {
  if (this.totalMaxMarks > 0) {
    this.percentage = (this.totalMarksObtained / this.totalMaxMarks) * 100;

    // Grade calculation
    if (this.percentage >= 90) this.grade = "A+";
    else if (this.percentage >= 80) this.grade = "A";
    else if (this.percentage >= 70) this.grade = "B+";
    else if (this.percentage >= 60) this.grade = "B";
    else if (this.percentage >= 50) this.grade = "C";
    else if (this.percentage >= 40) this.grade = "D";
    else this.grade = "F";

    // Pass/Fail
    this.status = this.percentage >= 40 ? "pass" : "fail";
  }
  next();
});
```

---

## 6. Library Models

### 6.1 Book Schema

**Collection:** `books`

```javascript
const bookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    unique: true,
  },

  // Book Information
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
  },

  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },

  isbn: {
    type: String,
    unique: true,
    sparse: true,
    // International Standard Book Number
  },

  // Classification
  category: {
    type: String,
    // e.g., "Fiction", "Science", "History", "Mathematics"
  },

  genre: String,

  subject: String,

  // Publication Details
  publisher: String,

  publicationYear: Number,

  edition: String,

  language: {
    type: String,
    default: "English",
  },

  // Physical Details
  pages: Number,

  location: {
    type: String,
    // Shelf location: e.g., "Shelf A, Row 3"
  },

  // Inventory
  totalCopies: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },

  availableCopies: {
    type: Number,
    required: true,
    default: 1,
  },

  // Status
  status: {
    type: String,
    enum: ["available", "unavailable", "damaged", "lost"],
    default: "available",
  },

  // Media
  coverImage: String,

  description: String,

  // Metadata
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "addedByModel",
  },

  addedByModel: {
    type: String,
    enum: ["Admin", "Teacher"],
  },

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual: Check if book is available
bookSchema.virtual("isAvailable").get(function () {
  return this.availableCopies > 0 && this.status === "available";
});
```

**Indexes:**

```javascript
bookSchema.index({ schoolID: 1 });
bookSchema.index({ isbn: 1 }, { unique: true, sparse: true });
bookSchema.index({ title: "text", author: "text", category: "text" });
```

---

### 6.2 LibraryTransaction Schema

**Collection:** `librarytransactions`

```javascript
const libraryTransactionSchema = new mongoose.Schema({
  transactionID: {
    type: String,
    unique: true,
  },

  // Transaction Type
  type: {
    type: String,
    enum: ["issue", "return", "renew"],
    required: true,
  },

  // References
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  // Dates
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  dueDate: {
    type: Date,
    required: true,
  },

  returnDate: {
    type: Date,
    // Null until book is returned
  },

  // Fine Calculation
  fine: {
    type: Number,
    default: 0,
    // Calculated: daysOverdue * finePerDay
  },

  finePerDay: {
    type: Number,
    default: 1, // $1 per day
  },

  finePaid: {
    type: Boolean,
    default: false,
  },

  // Status
  status: {
    type: String,
    enum: ["issued", "returned", "overdue", "lost"],
    default: "issued",
  },

  // Staff
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "issuedByModel",
  },

  issuedByModel: {
    type: String,
    enum: ["Admin", "Teacher"],
    default: "Admin",
  },

  returnedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "returnedToModel",
  },

  returnedToModel: {
    type: String,
    enum: ["Admin", "Teacher"],
  },

  // Notes
  remarks: String,

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Methods: Calculate fine
libraryTransactionSchema.methods.calculateFine = function () {
  if (this.returnDate && this.returnDate > this.dueDate) {
    const overdueDays = Math.ceil(
      (this.returnDate - this.dueDate) / (1000 * 60 * 60 * 24)
    );
    return overdueDays * this.finePerDay;
  }
  return 0;
};

// Pre-save: Auto-calculate fine on return
libraryTransactionSchema.pre("save", function (next) {
  if (this.isModified("returnDate") && this.returnDate) {
    this.fine = this.calculateFine();
    this.status = "returned";
  }

  // Check for overdue
  if (!this.returnDate && new Date() > this.dueDate) {
    this.status = "overdue";
  }

  next();
});
```

**Indexes:**

```javascript
libraryTransactionSchema.index({ student: 1, status: 1 });
libraryTransactionSchema.index({ book: 1, status: 1 });
libraryTransactionSchema.index({ schoolID: 1, status: 1 });
libraryTransactionSchema.index({ dueDate: 1, status: 1 });
```

---

## 7. Sports Model

### 7.1 Sport Schema

**Collection:** `sports`

```javascript
const sportSchema = new mongoose.Schema({
  sportID: {
    type: String,
    unique: true,
  },

  // Sport Information
  sportName: {
    type: String,
    required: [true, "Sport name is required"],
    trim: true,
    // e.g., "Cricket", "Football", "Chess"
  },

  description: String,

  // Category
  category: {
    type: String,
    enum: ["indoor", "outdoor"],
    required: true,
  },

  // Staff
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
  },

  assistantCoaches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
    },
  ],

  // Team
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },

  viceCaptain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },

  participants: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      joinedDate: {
        type: Date,
        default: Date.now,
      },
      position: String,
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "active", "inactive"],
        default: "pending",
      },
    },
  ],

  // Age Category
  ageCategory: {
    type: String,
    enum: ["under-12", "under-14", "under-16", "under-19", "open"],
  },

  // Events
  events: [
    {
      eventName: {
        type: String,
        required: true,
      },
      eventType: {
        type: String,
        enum: ["practice", "match", "tournament", "training"],
      },
      date: Date,
      time: String,
      location: String,
      opponent: String,
      result: String,
      notes: String,
    },
  ],

  // Schedule
  practiceSchedule: [
    {
      day: {
        type: String,
        enum: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
      startTime: String,
      endTime: String,
      location: String,
    },
  ],

  // Capacity
  maxParticipants: {
    type: Number,
    default: 30,
  },

  // Status
  status: {
    type: String,
    enum: ["active", "inactive", "seasonal"],
    default: "active",
  },

  season: String,

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Methods
sportSchema.methods.getActiveParticipants = function () {
  return this.participants.filter(
    (p) => p.status === "active" || p.status === "approved"
  );
};

sportSchema.methods.getPendingRegistrations = function () {
  return this.participants.filter((p) => p.status === "pending");
};
```

---

## 8. Communication Models

### 8.1 Notice Schema

**Collection:** `notices`

```javascript
const noticeSchema = new mongoose.Schema({
  noticeID: {
    type: String,
    unique: true,
  },

  // Notice Content
  title: {
    type: String,
    required: [true, "Notice title is required"],
    trim: true,
    maxlength: 200,
  },

  content: {
    type: String,
    required: [true, "Notice content is required"],
  },

  // Author
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel",
    required: true,
  },

  createdByModel: {
    type: String,
    enum: ["Admin", "Teacher", "Coach"],
    required: true,
  },

  createdByRole: {
    type: String,
    enum: [
      "principal",
      "grade_incharge",
      "class_teacher",
      "coach",
      "librarian",
    ],
  },

  // Audience Targeting
  audience: {
    type: String,
    enum: [
      "all",
      "students",
      "teachers",
      "grade",
      "class",
      "sports",
      "library",
    ],
    required: true,
  },

  targetGrade: {
    type: Number,
    min: 1,
    max: 14,
    // Required if audience is 'grade'
  },

  targetClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassGroup",
    // Required if audience is 'class'
  },

  targetSport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport",
    // Required if audience is 'sports'
  },

  // Scheduling
  publishDate: {
    type: Date,
    default: Date.now,
  },

  expiryDate: Date,

  // Priority
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },

  // Status
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "published",
  },

  // Attachments
  attachments: [
    {
      filename: String,
      url: String,
      type: String,
    },
  ],

  // Tracking
  viewCount: {
    type: Number,
    default: 0,
  },

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

### 8.2 Complain Schema

**Collection:** `complains`

```javascript
const complainSchema = new mongoose.Schema({
  complainID: {
    type: String,
    unique: true,
  },

  // Complaint Details
  title: {
    type: String,
    required: [true, "Complaint title is required"],
    trim: true,
    maxlength: 200,
  },

  description: {
    type: String,
    required: [true, "Complaint description is required"],
  },

  // Category
  category: {
    type: String,
    enum: [
      "academic",
      "discipline",
      "facility",
      "sports",
      "library",
      "staff",
      "other",
    ],
    required: true,
  },

  // Submitter
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "submittedByModel",
    required: true,
  },

  submittedByModel: {
    type: String,
    enum: ["Student", "Teacher", "Coach", "Admin"],
    required: true,
  },

  submittedByRole: String,

  // Status Tracking
  status: {
    type: String,
    enum: [
      "pending",
      "in-review",
      "assigned",
      "in-progress",
      "resolved",
      "closed",
      "rejected",
    ],
    default: "pending",
  },

  // Assignment
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "assignedToModel",
  },

  assignedToModel: {
    type: String,
    enum: ["Admin", "Teacher", "Coach"],
  },

  assignedDate: Date,

  // Resolution
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "resolvedByModel",
  },

  resolvedByModel: {
    type: String,
    enum: ["Admin", "Teacher", "Coach"],
  },

  resolvedDate: Date,

  // Response
  response: String,

  internalNotes: String,

  // Priority
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },

  // Attachments
  attachments: [
    {
      filename: String,
      url: String,
      type: String,
    },
  ],

  // School Reference
  schoolID: {
    type: String,
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

## 9. Index Definitions

### 9.1 Primary Indexes (Unique)

| Collection  | Field(s)                   | Type            |
| ----------- | -------------------------- | --------------- |
| admins      | `email`                    | Unique          |
| admins      | `adminID`                  | Unique          |
| admins      | `schoolID`                 | Unique, Sparse  |
| students    | `studentID`                | Unique          |
| students    | `email`                    | Unique          |
| teachers    | `teacherID`                | Unique          |
| teachers    | `email`                    | Unique          |
| coaches     | `coachID`                  | Unique          |
| coaches     | `email`                    | Unique          |
| classgroups | `schoolID, grade, section` | Compound Unique |
| courses     | `courseID`                 | Unique          |
| modules     | `moduleID`                 | Unique          |
| attendances | `classGroup, date`         | Compound Unique |
| results     | `student, exam`            | Compound Unique |
| books       | `isbn`                     | Unique, Sparse  |

### 9.2 Secondary Indexes (Performance)

| Collection          | Field(s)             | Purpose                   |
| ------------------- | -------------------- | ------------------------- |
| students            | `schoolID`           | Multi-tenant filtering    |
| students            | `classGroup`         | Class listing             |
| students            | `grade, section`     | Academic filtering        |
| teachers            | `schoolID`           | Multi-tenant filtering    |
| teachers            | `teacherRole`        | Role-based queries        |
| attendances         | `schoolID, date`     | Daily reports             |
| results             | `exam`               | Exam results aggregation  |
| librarytransactions | `student, status`    | Student borrowing history |
| librarytransactions | `dueDate, status`    | Overdue tracking          |
| notices             | `schoolID, audience` | Notice filtering          |
| complains           | `schoolID, status`   | Status tracking           |

### 9.3 Text Indexes (Search)

| Collection | Fields                    | Purpose        |
| ---------- | ------------------------- | -------------- |
| books      | `title, author, category` | Book search    |
| notices    | `title, content`          | Notice search  |
| students   | `name, email`             | Student search |

---

## 10. Validation Patterns

### 10.1 Email Validation

```javascript
match: [/^\S+@\S+\.\S+$/, "Invalid email format"];
```

### 10.2 ID Patterns

| Entity     | Regex Pattern           | Example    |
| ---------- | ----------------------- | ---------- |
| School ID  | `/^sch_\d{3}[bgm]$/`    | sch_001b   |
| Admin ID   | `/^adm\d{4}$/`          | adm0001    |
| Student ID | `/^st\d{3}[bgm]\d{4}$/` | st010m1099 |
| Teacher ID | `/^te\d{3}[bgm]\d{4}$/` | te010m1102 |

### 10.3 Field Constraints

| Field      | Constraint       | Model(s)   |
| ---------- | ---------------- | ---------- |
| Password   | minlength: 6     | All users  |
| Username   | minlength: 3     | Admin      |
| Grade      | min: 1, max: 14  | Multiple   |
| Capacity   | max: 30          | ClassGroup |
| Percentage | min: 0, max: 100 | Result     |
| GPA        | min: 0, max: 4.0 | Result     |

### 10.4 Enum Values Reference

**Gender:**

```javascript
["male", "female", "other"];
```

**School Type:**

```javascript
["boys", "girls", "mixed"];
```

**Attendance Status:**

```javascript
["present", "absent", "late", "leave"];
```

**Teacher Role:**

```javascript
["grade_incharge", "class_teacher", "subject_teacher"];
```

**Coach Type:**

```javascript
["head_coach", "assistant_coach"];
```

**Sports Category:**

```javascript
["indoor", "outdoor"];
```

**Notice Audience:**

```javascript
["all", "students", "teachers", "grade", "class", "sports", "library"];
```

**Complaint Status:**

```javascript
[
  "pending",
  "in-review",
  "assigned",
  "in-progress",
  "resolved",
  "closed",
  "rejected",
];
```

**Priority:**

```javascript
["low", "medium", "high", "urgent"];
```

---

**Document Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025
**Database:** MongoDB 8.0+ with Mongoose 8.9.4

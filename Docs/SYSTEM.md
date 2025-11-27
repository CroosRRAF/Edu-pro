# Edu-Pro School Management System - Complete Unified Specification

**Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025
**Status:** Production Ready ✅

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [User Roles & Permissions](#4-user-roles--permissions)
5. [Core Modules](#5-core-modules)
6. [School Management](#6-school-management)
7. [Academic Structure](#7-academic-structure)
8. [Attendance System](#8-attendance-system)
9. [Examination & Results](#9-examination--results)
10. [Library Management](#10-library-management)
11. [Sports Management](#11-sports-management)
12. [Communication System](#12-communication-system)
13. [ID Generation System](#13-id-generation-system)
14. [Security & Authentication](#14-security--authentication)
15. [Business Rules](#15-business-rules)

---

## 1. Executive Summary

### 1.1 What is Edu-Pro?

**Edu-Pro** (also known as **EduPro** or **Online School Management System**) is a comprehensive, full-stack school management platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a unified solution for managing all aspects of school operations including academic management, library operations, sports activities, and administrative functions.

### 1.2 Purpose & Scope

The system is designed to:

- Manage complete school operations from a single platform
- Support multiple school types (Boys, Girls, Mixed)
- Provide role-based access for different user types
- Automate ID generation for schools, students, and teachers
- Handle academic records, attendance, examinations, and results
- Manage library inventory and book transactions
- Coordinate sports activities and team management
- Facilitate communication through notices and complaint handling

### 1.3 Target Users

| User Type          | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **Schools**        | Primary, secondary, and mixed-gender educational institutions (supporting up to 150 students per grade) |
| **Administrators** | Principals with full system control                                                                     |
| **Teaching Staff** | Subject teachers, class teachers, grade incharges/supervisors                                           |
| **Support Staff**  | Coaches (Head/Assistant), Librarians (Head/Assistant)                                                   |
| **Students**       | Self-service academic portal access                                                                     |

### 1.4 Key Benefits

- **Centralized Management**: Single platform for all school operations
- **Automated Processes**: ID generation, attendance finalization, fine calculation
- **Role-Based Security**: JWT authentication with granular permissions
- **Hierarchical Communication**: Notice propagation based on organizational structure
- **Scalable Architecture**: Support for multiple schools with separate data isolation
- **Real-time Tracking**: Attendance, results, and library transactions

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   CLIENT (React 19.1.0)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Admin   │  │ Student  │  │ Teacher  │  │  Coach   │     │
│  │Dashboard │  │Dashboard │  │Dashboard │  │Dashboard │     │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘     │
│       └─────────────┴──────────────┴──────────────┘           │
│                          │                                    │
│                 ┌────────▼────────┐                           │
│                 │  Service Layer  │                           │
│                 │  (100+ Methods) │                           │
│                 └────────┬────────┘                           │
└──────────────────────────┼───────────────────────────────────┘
                           │ HTTP/REST + JWT
                           │
┌──────────────────────────▼───────────────────────────────────┐
│              SERVER (Node.js 22.16 + Express 4.21)            │
│  ┌───────────────────────────────────────────────────────┐   │
│  │         API Routes (9 modules, 100+ endpoints)        │   │
│  └─────────────────────┬─────────────────────────────────┘   │
│                        │                                      │
│  ┌─────────────────────▼─────────────────────────────────┐   │
│  │     Middleware (Auth, Role-Check, Rate-Limit, CORS)   │   │
│  └─────────────────────┬─────────────────────────────────┘   │
│                        │                                      │
│  ┌─────────────────────▼─────────────────────────────────┐   │
│  │   Controllers (Business Logic & Request Processing)   │   │
│  └─────────────────────┬─────────────────────────────────┘   │
│                        │                                      │
│  ┌─────────────────────▼─────────────────────────────────┐   │
│  │       Models (15 Mongoose Schemas with Validation)    │   │
│  └─────────────────────┬─────────────────────────────────┘   │
└────────────────────────┼──────────────────────────────────────┘
                         │ Mongoose ODM
                         │
┌────────────────────────▼──────────────────────────────────────┐
│                    DATABASE (MongoDB 8.0)                     │
│  Collections: Admin, Student, Teacher, Coach, ClassGroup,    │
│  Course, Module, Attendance, Exam, Result, Notice, Complain, │
│  Book, LibraryTransaction, Sport                              │
└───────────────────────────────────────────────────────────────┘
```

### 2.2 Design Patterns

| Pattern              | Layer    | Purpose                                       |
| -------------------- | -------- | --------------------------------------------- |
| **MVC**              | Backend  | Models, Controllers, Routes separation        |
| **Service Layer**    | Frontend | Centralized API communication                 |
| **Context + Hooks**  | Frontend | State management (Auth, Theme, Notifications) |
| **Feature-Based**    | Frontend | Organized by business domain                  |
| **Repository**       | Backend  | Data access abstraction                       |
| **Middleware Chain** | Backend  | Request processing pipeline                   |

### 2.3 API Architecture

**Base URLs:**

- Development: `http://localhost:5000/api/v1`
- Production: `https://your-domain.com/api/v1`

**Route Structure:**

```
/api/v1/
├── /auth                    # Authentication endpoints
│   ├── /admin               # Admin auth (register, login)
│   ├── /student             # Student auth
│   ├── /teacher             # Teacher auth
│   ├── /coach               # Coach auth
│   └── /librarian           # Librarian auth
├── /admin                   # Admin operations
├── /students                # Student operations
├── /teachers                # Teacher operations
├── /classgroups             # Class group management
├── /modules                 # Course modules
├── /library                 # Library operations
├── /notices                 # Notice board
└── /complaints              # Complaint system
```

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology       | Version | Purpose                 |
| ---------------- | ------- | ----------------------- |
| React            | 19.1.0  | UI library              |
| Vite             | 7.0.0   | Build tool & dev server |
| React Router DOM | 7.6.3   | Client-side routing     |
| Tailwind CSS     | 3.4.17  | Utility-first styling   |
| Axios            | 1.10.0  | HTTP client             |
| Lucide React     | 0.525.0 | Icon library            |
| Framer Motion    | 12.19.2 | Animations              |
| React Hook Form  | 7.59.0  | Form management         |

**Frontend Statistics:**

- 60+ files created
- 5000+ lines of code
- 18 reusable components
- 5 custom hooks
- 3 context providers
- 100+ API service methods

### 3.2 Backend Technologies

| Technology     | Version | Purpose                        |
| -------------- | ------- | ------------------------------ |
| Node.js        | 22.16+  | Runtime environment            |
| Express        | 4.21.2  | Web framework                  |
| MongoDB        | 8.0+    | NoSQL database                 |
| Mongoose       | 8.9.4   | MongoDB ODM                    |
| JSON Web Token | 9.0.2   | Authentication                 |
| bcryptjs       | 2.4.3   | Password hashing               |
| Helmet         | 8.0.0   | Security headers               |
| CORS           | 2.8.5   | Cross-origin support           |
| Upstash Redis  | 1.35.1  | Rate limiting (sliding window) |

**Backend Statistics:**

- 15 database models
- 9 route modules
- 100+ API endpoints
- 149 npm packages
- 0 vulnerabilities

### 3.3 Development Tools

- **ESLint**: Code quality and linting
- **Nodemon**: Auto-restart server on changes
- **Git**: Version control
- **VS Code**: Recommended IDE
- **Thunder Client/Postman**: API testing
- **MongoDB Compass**: Database GUI

---

## 4. User Roles & Permissions

### 4.1 Role Hierarchy

```
┌─────────────────────────────────────────────────┐
│                  ADMIN/PRINCIPAL                │
│  • Full system access                           │
│  • Create/manage all entities                   │
│  • View all data and analytics                  │
│  • System configuration                         │
└─────────────┬───────────────────────────────────┘
              │
    ┌─────────┴─────────┬────────────┬────────────┐
    │                   │            │            │
┌───▼────┐      ┌───────▼──────┐ ┌──▼──────┐  ┌─▼────────┐
│TEACHER │      │    COACH     │ │LIBRARIAN│  │ STUDENT  │
│        │      │              │ │         │  │          │
│Manages │      │ Manages      │ │Manages  │  │Self-     │
│Classes │      │ Sports       │ │Library  │  │Service   │
└────────┘      └──────────────┘ └─────────┘  └──────────┘
```

### 4.2 Detailed Role Descriptions

#### 4.2.1 Admin/Principal

**Access Level:** Full system control

**Responsibilities:**

- School profile management and creation
- User management (students, teachers, coaches, librarians)
- Academic structure (grades, classrooms, courses, modules)
- System-wide announcements
- Complaint resolution and oversight
- Reports and analytics generation

**Unique Capabilities:**

- Create school profile with auto-generated School ID (`sch_XXXy`)
- School type selection (Boys/Girls/Mixed)
- Grant/revoke permissions for all users
- Access all modules and data across the system

**Dashboard Statistics:**

- Total students, teachers, courses, sports
- Recent activities and pending tasks
- System-wide analytics and charts

#### 4.2.2 Teacher

**Access Level:** Class and subject management

**Sub-Roles:**
| Sub-Role | Scope | Responsibilities |
|----------|-------|------------------|
| **Grade Incharge/Supervisor** | Multiple grades (e.g., 1-5, 6-9, 10-11, 12-14) | Oversees all classrooms, assigns teachers, manages academic coordination |
| **Class Teacher** | One specific classroom (max 30 students) | Manages classroom, takes daily attendance, handles notices, maintains discipline |
| **Subject Teacher** | Assigned subjects | Teaches assigned subjects to assigned classes |

**Capabilities:**

- Mark daily attendance (deadline: 8:30 PM, finalized at 9:00 PM)
- Enter exam results for assigned subjects
- Track student progress
- Post notices to assigned classes
- View student academic records

**Auto-Generated ID Format:** `te + schoolLast4 + NIC_last4`
Example: `te010m1102` (school: sch_010m, NIC ends in 1102)

#### 4.2.3 Student

**Access Level:** Self-service portal

**Capabilities:**

- View personal profile and academic records
- Enroll in courses
- Register for sports activities
- View attendance records
- Access exam results
- Browse library catalog and borrow/return books
- Submit complaints
- View notices targeted to students

**Auto-Generated ID Format:** `st + schoolLast4 + NIC_last4`
Example: `st010m1099` (school: sch_010m, NIC ends in 1099)

**Restrictions:**

- Gender must match school type (enforced during registration)
- Cannot modify academic records
- View-only access to results and attendance

#### 4.2.4 Coach

**Access Level:** Sports management

**Types:**

- **Head Coach**: Overall sports ground management
- **Assistant Coach**: Specific sport assistance

**Responsibilities:**

- Manage sports activities (Indoor/Outdoor categories)
- Review and approve student registrations for sports
- Schedule matches and events
- Track participant performance
- Maintain team lists
- Post sports-related notices

#### 4.2.5 Librarian

**Access Level:** Library operations

**Types:**

- **Librarian**: Full library management
- **Assistant Librarian**: Support operations

**Responsibilities:**

- Manage book catalog (add, edit, delete)
- Issue books to students
- Process returns
- Calculate fines automatically based on overdue days
- Track overdue books
- Manage library inventory
- View borrowing history
- Post library notices

### 4.3 Permissions Matrix

| Feature             |  Admin   |        Teacher         |       Coach       |   Librarian    | Student  |
| ------------------- | :------: | :--------------------: | :---------------: | :------------: | :------: |
| **Students**        |
| View all students   |    ✅    |    ✅ (own classes)    | ✅ (participants) | ✅ (borrowers) |    ❌    |
| Create students     |    ✅    |           ❌           |        ❌         |       ❌       |    ❌    |
| Edit students       |    ✅    |           ❌           |        ❌         |       ❌       |    ❌    |
| Delete students     |    ✅    |           ❌           |        ❌         |       ❌       |    ❌    |
| **Attendance**      |
| View attendance     |    ✅    |    ✅ (own classes)    |        ❌         |       ❌       | ✅ (own) |
| Mark attendance     |    ✅    |    ✅ (own classes)    |        ❌         |       ❌       |    ❌    |
| Edit attendance     |    ✅    |    ✅ (before 9 PM)    |        ❌         |       ❌       |    ❌    |
| **Results**         |
| View all results    |    ✅    |    ✅ (own classes)    |        ❌         |       ❌       | ✅ (own) |
| Enter results       |    ✅    | ✅ (assigned subjects) |        ❌         |       ❌       |    ❌    |
| Modify results      |    ✅    |           ❌           |        ❌         |       ❌       |    ❌    |
| **Library**         |
| Manage books        |    ✅    |           ❌           |        ❌         |       ✅       |    ❌    |
| Issue books         |    ✅    |           ❌           |        ❌         |       ✅       |    ❌    |
| Return books        |    ✅    |           ❌           |        ❌         |       ✅       |    ❌    |
| Browse books        |    ✅    |           ✅           |        ✅         |       ✅       |    ✅    |
| **Sports**          |
| Manage sports       |    ✅    |           ❌           |   ✅ (assigned)   |       ❌       |    ❌    |
| Register students   |    ✅    |           ❌           |        ✅         |       ❌       |    ✅    |
| Schedule events     |    ✅    |           ❌           |        ✅         |       ❌       |    ❌    |
| **Notices**         |
| Create notices      |    ✅    |           ✅           |        ✅         |       ✅       |    ❌    |
| Edit/delete notices | ✅ (all) |        ✅ (own)        |     ✅ (own)      |    ✅ (own)    |    ❌    |
| View notices        |    ✅    |           ✅           |        ✅         |       ✅       |    ✅    |
| **Complaints**      |
| Submit complaints   |    ✅    |           ✅           |        ✅         |       ✅       |    ✅    |
| View all complaints |    ✅    |           ❌           |        ❌         |       ❌       |    ❌    |
| Resolve complaints  |    ✅    |           ❌           |        ❌         |       ❌       |    ❌    |

---

## 5. Core Modules

### 5.1 Module Overview

The system consists of 8 core modules:

| #   | Module                    | Purpose                 | Key Features                                   |
| --- | ------------------------- | ----------------------- | ---------------------------------------------- |
| 1   | **Authentication**        | Secure user access      | Multi-role login, JWT tokens, password hashing |
| 2   | **School Management**     | School configuration    | Profile setup, ID generation, school types     |
| 3   | **Academic Structure**    | Curriculum organization | Grades, classrooms, courses, modules           |
| 4   | **Attendance**            | Daily tracking          | Marking, deadlines, auto-finalization          |
| 5   | **Examination & Results** | Assessment management   | Exams, marks entry, result publishing          |
| 6   | **Library**               | Book operations         | Catalog, issue/return, fines                   |
| 7   | **Sports**                | Athletic activities     | Teams, events, registrations                   |
| 8   | **Communication**         | Notices & complaints    | Hierarchical notices, complaint routing        |

---

## 6. School Management

### 6.1 Admin Registration & Onboarding

#### 6.1.1 Admin Registration

The school administrator (Principal) registers using:

- Email (unique, validated format)
- Username
- Password (minimum 6 characters, hashed with bcrypt)
- Confirm Password

After successful registration, the admin logs in using these credentials.

#### 6.1.2 Initial Onboarding Flow

Once logged in for the first time:

1. Admin is redirected to the **Dashboard**
2. Admin must create:
   - **School Profile** (with all foundational information)
   - **Personal Profile (Principal Profile)**
3. Only after these steps can the admin access all system modules

### 6.2 School Profile

A school profile contains all foundational information:

| Component        | Description                      |
| ---------------- | -------------------------------- |
| School Name      | Unique identifier for the school |
| School Type      | Boys / Girls / Mixed             |
| Address          | Physical location                |
| Contact Number   | Primary phone                    |
| Email            | School email address             |
| Established Year | Foundation year                  |
| Classrooms       | Physical classroom inventory     |
| Grades           | Academic levels offered (1-14)   |
| Subjects         | Curriculum subjects              |
| Teachers         | Teaching staff roster            |
| Students         | Enrolled students                |
| Library          | Book collection                  |
| Sports Ground    | Athletic facilities              |

### 6.3 School Type Selection

Admin must choose one of three school types:

| Type              | Code | Description          | Student Restriction               |
| ----------------- | ---- | -------------------- | --------------------------------- |
| **Boys' School**  | `b`  | Male students only   | Only male students can register   |
| **Girls' School** | `g`  | Female students only | Only female students can register |
| **Mixed School**  | `m`  | All genders          | No gender restriction             |

This selection affects:

- Student registration validation (gender matching)
- System access and permissions
- ID generation suffix

### 6.4 School ID Generation

**Format:** `sch_XXXY`

| Component | Description                             | Example |
| --------- | --------------------------------------- | ------- |
| `sch_`    | Fixed prefix                            | sch\_   |
| `XXX`     | Auto-increment 3-digit number (001-999) | 010     |
| `Y`       | School type code (b/g/m)                | m       |

**Examples:**

- `sch_001b` - First boys' school
- `sch_010m` - Tenth mixed school
- `sch_999g` - 999th girls' school

**Validation Pattern:** `/^sch_\d{3}[bgm]$/`

---

## 7. Academic Structure

### 7.1 Grades & Classrooms

#### 7.1.1 Grade Creation

Admin can:

- Create all grades at once (e.g., Grade 1 to Grade 14)
- Or add grades individually

**Grade Levels:**
| Category | Grades | Description |
|----------|--------|-------------|
| Primary | 1-5 | Elementary education |
| Middle | 6-9 | Secondary education |
| O-Levels | 10-11 | Ordinary level |
| A-Levels | 12-14 | Advanced level (1st year, 2nd year, final year) |

#### 7.1.2 Classroom Creation Rules

Each grade has multiple sections based on student count:

**Allocation Formula:**

- **Maximum students per classroom:** 30
- **Sections available:** A, B, C, D, E (up to 5 sections per grade)
- **Maximum students per grade:** 150

**Example Allocation for Grade 10:**
| Student Count | Classroom Distribution |
|---------------|----------------------|
| 1-30 | 10A only |
| 31-60 | 10A (30) + 10B (remaining) |
| 61-90 | 10A (30) + 10B (30) + 10C (remaining) |
| 91-120 | 10A-10D |
| 121-150 | 10A-10E |

Classrooms auto-generate based on student enrollment load.

#### 7.1.3 Grade Incharge & Class Teacher Assignment

**Grade Incharges (Supervisors)** are assigned to groups of grades:
| Supervisor | Grades Covered |
|------------|----------------|
| Supervisor 1 | Grades 1-5 (Primary) |
| Supervisor 2 | Grades 6-9 (Middle) |
| Supervisor 3 | Grades 10-11 (O-Levels) |
| Supervisor 4 | Grades 12-14 (A-Levels) |

**Responsibilities:**

| Role               | Scope                 | Duties                                                                                           |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------ |
| **Grade Incharge** | Assigned grade group  | Oversees all classrooms, assigns teachers, manages academic coordination                         |
| **Class Teacher**  | Exactly one classroom | Takes daily attendance, handles classroom notices, maintains discipline, manages max 30 students |

### 7.2 Courses & Modules

#### 7.2.1 Course Structure

```javascript
{
  courseID: String,           // Auto-generated
  courseName: String,         // e.g., "Mathematics"
  description: String,        // Course description
  modules: [ObjectId],        // Array of module references
  teacher: ObjectId,          // Assigned teacher
  duration: Number,           // Duration in weeks
  grade: Number,              // Grade level (1-14)
  schoolID: String            // School reference
}
```

#### 7.2.2 Module Structure

```javascript
{
  moduleID: String,
  moduleName: String,         // e.g., "Algebra"
  description: String,
  credits: Number,
  instructor: ObjectId        // Instructor reference
}
```

---

## 8. Attendance System

### 8.1 Overview

The attendance system provides daily tracking of student presence with strict time-based controls.

### 8.2 Attendance Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Class Teacher  │────▶│  Mark Students  │────▶│  Submit Before  │
│  Opens System   │     │  Present/Absent │     │    8:30 PM      │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                        ┌─────────────────┐              │
                        │  System Auto-   │◀─────────────┘
                        │  Finalizes at   │
                        │    9:00 PM      │
                        └─────────────────┘
```

### 8.3 Time Constraints

| Event             | Time          | Description                                    |
| ----------------- | ------------- | ---------------------------------------------- |
| Marking Deadline  | 8:30 PM       | Teachers must complete attendance by this time |
| Edit Window       | Until 8:30 PM | Modifications allowed                          |
| Auto-Finalization | 9:00 PM       | System locks all records for the day           |
| Post-Finalization | After 9:00 PM | No further edits allowed (admin override only) |

### 8.4 Attendance Status Options

| Status  | Code      | Description                      |
| ------- | --------- | -------------------------------- |
| Present | `present` | Student attended class           |
| Absent  | `absent`  | Student did not attend           |
| Late    | `late`    | Student arrived after start time |
| Leave   | `leave`   | Approved absence                 |

### 8.5 Attendance Data Model

```javascript
{
  attendanceID: String,
  classGroup: ObjectId,       // Reference to ClassGroup
  date: Date,                 // Attendance date
  students: [{
    student: ObjectId,        // Student reference
    status: String            // present/absent/late/leave
  }],
  markedBy: ObjectId,         // Teacher who marked
  finalized: Boolean,         // Lock status
  schoolID: String
}
```

### 8.6 Reports Available

- Daily attendance by class
- Monthly attendance summaries
- Student-wise attendance percentage
- Class-wise attendance analytics

---

## 9. Examination & Results

### 9.1 Exam Management

#### 9.1.1 Exam Creation

Teachers/Admins can create examinations with:

- Exam name and type (midterm, final, test)
- Date and schedule
- Associated course/modules
- Maximum score
- Applicable classes

#### 9.1.2 Exam Data Model

```javascript
{
  examID: String,
  examName: String,           // e.g., "Mid Term Examination"
  examType: String,           // midterm, final, test
  date: Date,
  grade: Number,
  modules: [ObjectId],        // Subjects included
  totalMarks: Number,
  schoolID: String
}
```

### 9.2 Results Entry

#### 9.2.1 Workflow

1. Teacher selects exam and class
2. Enters marks for each student per module
3. Scores validated against maximum
4. Auto-calculation of grades (if configured)
5. Results linked to student, exam, and module

#### 9.2.2 Result Data Model

```javascript
{
  resultID: String,
  student: ObjectId,
  exam: ObjectId,
  marks: [{
    module: ObjectId,
    marksObtained: Number,
    totalMarks: Number
  }],
  totalMarks: Number,
  percentage: Number,
  grade: String,              // Letter grade (A, B, C, etc.)
  status: String,             // pass/fail
  schoolID: String
}
```

### 9.3 Result Viewing Access

| Role     | Access Level                             |
| -------- | ---------------------------------------- |
| Students | View own results only                    |
| Teachers | View class results for assigned subjects |
| Admin    | View all results, generate reports       |

---

## 10. Library Management

### 10.1 Overview

Each school has **one library** managed by dedicated library staff.

### 10.2 Library Staff

| Role                    | Responsibilities                          |
| ----------------------- | ----------------------------------------- |
| **Librarian**           | Full library management, policy decisions |
| **Assistant Librarian** | Support operations, day-to-day tasks      |

### 10.3 Book Catalog

#### 10.3.1 Book Data Model

```javascript
{
  bookID: String,
  title: String,
  author: String,
  isbn: String,               // Unique ISBN
  category: String,           // Genre/category
  totalCopies: Number,
  availableCopies: Number,
  publisher: String,
  publicationYear: Number,
  location: String,           // Shelf location
  schoolID: String
}
```

### 10.4 Transaction System

#### 10.4.1 Issue Book Process

1. Student requests book
2. Librarian verifies availability
3. Creates transaction record with due date
4. Updates available copies count

#### 10.4.2 Return Book Process

1. Student returns book
2. Librarian processes return
3. Calculates fine if overdue
4. Updates availability
5. Records return date

#### 10.4.3 Transaction Data Model

```javascript
{
  transactionID: String,
  student: ObjectId,
  book: ObjectId,
  issueDate: Date,
  dueDate: Date,
  returnDate: Date,
  status: String,             // issued, returned, overdue
  fine: Number,
  librarian: ObjectId,
  schoolID: String
}
```

### 10.5 Fine Calculation

**Formula:** `Fine = Days Overdue × Fine Per Day`

| Parameter    | Default Value |
| ------------ | ------------- |
| Fine Per Day | $1.00         |
| Grace Period | 0 days        |

**Example:**

- Due Date: December 5
- Return Date: December 8
- Days Overdue: 3
- Fine: 3 × $1.00 = **$3.00**

### 10.6 Library Operations

Operations performed when librarian/assistant receives the physical book:

- Add new books to inventory
- Update issued/returned status
- Mark damaged/missing books
- Post library notices

---

## 11. Sports Management

### 11.1 Overview

Each school has **one sports ground** with organized athletic activities.

### 11.2 Sports Staff

| Role                | Responsibilities                                  |
| ------------------- | ------------------------------------------------- |
| **Head Coach**      | Overall sports ground management, major decisions |
| **Assistant Coach** | Specific sport assistance, training support       |

### 11.3 Sports Categories

| Category    | Examples                               |
| ----------- | -------------------------------------- |
| **Indoor**  | Chess, Table Tennis, Badminton, Carrom |
| **Outdoor** | Cricket, Football, Athletics, Hockey   |

### 11.4 Student Registration Process

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Student   │────▶│   Applies   │────▶│    Coach    │────▶│  Approved/  │
│   Portal    │     │  for Sport  │     │   Reviews   │     │   Denied    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

1. Student registers for a sport through portal
2. Application submitted with relevant details
3. Coach reviews application
4. Coach approves or denies based on criteria
5. If approved, student added to team roster

### 11.5 Sport Data Model

```javascript
{
  sportID: String,
  sportName: String,
  description: String,
  category: String,           // indoor/outdoor
  coach: ObjectId,
  captain: ObjectId,          // Student captain
  participants: [ObjectId],   // Array of student references
  events: [{
    eventName: String,
    date: Date,
    location: String,
    type: String              // match, practice, tournament
  }],
  schoolID: String
}
```

### 11.6 Coach Operations

- Update sports categories (Indoor/Outdoor)
- Manage age categories
- Schedule upcoming sports events
- Process team registrations
- Track participant performance
- Maintain event results

---

## 12. Communication System

### 12.1 Notice Management

#### 12.1.1 Hierarchical Notice Propagation

Notices propagate **downward** based on organizational hierarchy:

```
                    ┌─────────────────┐
                    │    Principal    │
                    │  (Entire School)│
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼───────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │  Supervisor   │ │  Supervisor │ │  Supervisor │
    │  (Grades 1-5) │ │ (Grades 6-9)│ │(Grades 10+) │
    └───────┬───────┘ └──────┬──────┘ └──────┬──────┘
            │                │                │
    ┌───────▼───────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │ Class Teacher │ │Class Teacher│ │Class Teacher│
    │  (Classroom)  │ │ (Classroom) │ │ (Classroom) │
    └───────┬───────┘ └──────┬──────┘ └──────┬──────┘
            │                │                │
    ┌───────▼───────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │   Students    │ │  Students   │ │  Students   │
    └───────────────┘ └─────────────┘ └─────────────┘
```

#### 12.1.2 Notice Creation Permissions

| Role                            | Can Post Notice To                           |
| ------------------------------- | -------------------------------------------- |
| **Principal**                   | Entire school (all modules, all users)       |
| **Supervisor (Grade Incharge)** | All classrooms in their assigned grade group |
| **Class Teacher**               | Only their classroom students                |
| **Coach**                       | Sports participants                          |
| **Librarian**                   | Library users                                |

#### 12.1.3 Notice Types

- Announcements
- Exam schedules
- Events
- Urgent instructions
- Sports updates
- Library updates
- Holiday notices

#### 12.1.4 Notice Data Model

```javascript
{
  noticeID: String,
  title: String,
  content: String,
  createdBy: ObjectId,
  createdByRole: String,
  audience: String,           // all, students, teachers, grade, class
  targetGrade: Number,        // If audience is 'grade'
  targetClass: ObjectId,      // If audience is 'class'
  publishDate: Date,
  priority: String,           // low, medium, high, urgent
  schoolID: String
}
```

### 12.2 Complaint Management

#### 12.2.1 Who Can Submit Complaints?

**Every user** in the system:

- Students
- Teachers
- Supervisors
- Sports staff (Coaches)
- Library staff (Librarians)

#### 12.2.2 Complaint Handling Workflow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │────▶│   Submit    │────▶│  Principal  │────▶│   Forward   │
│  (Any Role) │     │  Complaint  │     │   Reviews   │     │ to Dept.    │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
┌─────────────┐     ┌─────────────┐     ┌─────────────┐            │
│   Closed    │◀────│  Resolved   │◀────│  Assigned   │◀───────────┘
│             │     │             │     │   Person    │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Routing by Category:**
| Category | Forwarded To |
|----------|--------------|
| Academic issues | Grade Supervisor |
| Discipline issues | Class Teacher/Supervisor |
| Sports issues | Head Coach |
| Library issues | Librarian |
| Facility issues | Admin staff |

#### 12.2.3 Complaint Status Tracking

| Status        | Description                      |
| ------------- | -------------------------------- |
| `pending`     | Newly submitted, awaiting review |
| `in-review`   | Principal is reviewing           |
| `assigned`    | Forwarded to department          |
| `in-progress` | Being worked on                  |
| `resolved`    | Issue addressed                  |
| `closed`      | Complaint closed                 |

#### 12.2.4 Complaint Data Model

```javascript
{
  complainID: String,
  title: String,
  description: String,
  category: String,           // academic, discipline, facility, sports, library, other
  submittedBy: ObjectId,
  submittedByRole: String,
  status: String,
  response: String,
  assignedTo: ObjectId,
  resolvedBy: ObjectId,
  schoolID: String
}
```

---

## 13. ID Generation System

### 13.1 Overview

The system uses automated ID generation for schools, students, and teachers to ensure uniqueness and traceability.

### 13.2 ID Patterns

| Entity      | Format            | Pattern                 | Example      |
| ----------- | ----------------- | ----------------------- | ------------ |
| **School**  | `sch_XXXY`        | XXX=001-999, Y=b/g/m    | `sch_010m`   |
| **Admin**   | `admXXXX`         | XXXX=0001-9999          | `adm0001`    |
| **Student** | `st{school}{nic}` | school=last4, nic=last4 | `st010m1099` |
| **Teacher** | `te{school}{nic}` | school=last4, nic=last4 | `te010m1102` |

### 13.3 Validation Patterns (Regex)

```javascript
// School ID
/^sch_\d{3}[bgm]$/

// Admin ID
/^adm\d{4}$/

// Student ID
/^st\d{3}[bgm]\d{4}$/

// Teacher ID
/^te\d{3}[bgm]\d{4}$/
```

### 13.4 Generation Logic

#### 13.4.1 School ID Generation

```javascript
async function generateSchoolID(schoolType) {
  // Get count of existing schools
  const count = await Admin.countDocuments({ schoolID: { $exists: true } });

  // Format: sch_XXXy
  const typeCode =
    schoolType === "boys" ? "b" : schoolType === "girls" ? "g" : "m";
  const number = String(count + 1).padStart(3, "0");

  return `sch_${number}${typeCode}`;
}
```

#### 13.4.2 Student ID Generation

```javascript
function generateStudentID(schoolID, nic) {
  // Extract last 4 characters of school ID (e.g., "010m" from "sch_010m")
  const schoolPart = schoolID.slice(-4);

  // Extract last 4 digits from NIC
  const nicDigits = nic.replace(/\D/g, "");
  const nicPart = nicDigits.slice(-4).padStart(4, "0");

  return `st${schoolPart}${nicPart}`;
}
```

#### 13.4.3 Teacher ID Generation

```javascript
function generateTeacherID(schoolID, nic) {
  const schoolPart = schoolID.slice(-4);
  const nicDigits = nic.replace(/\D/g, "");
  const nicPart = nicDigits.slice(-4).padStart(4, "0");

  return `te${schoolPart}${nicPart}`;
}
```

### 13.5 ID Generation Examples

**Scenario 1: Boys' School**

- School Type: boys
- School Count: 0 (first school)
- Generated School ID: `sch_001b`

**Scenario 2: Student Registration**

- School ID: `sch_010m`
- Student NIC: `200012345678`
- Last 4 of school: `010m`
- Last 4 of NIC: `5678`
- Generated Student ID: `st010m5678`

**Scenario 3: Teacher Registration**

- School ID: `sch_001b`
- Teacher NIC: `198512348765`
- Last 4 of school: `001b`
- Last 4 of NIC: `8765`
- Generated Teacher ID: `te001b8765`

---

## 14. Security & Authentication

### 14.1 Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Submit  │────▶│ Validate │────▶│ Generate │
│  Login   │     │  Creds   │     │ Password │     │   JWT    │
└──────────┘     └──────────┘     └──────────┘     └────┬─────┘
                                                        │
┌──────────┐     ┌──────────┐     ┌──────────┐          │
│ Protected│◀────│  Verify  │◀────│  Store   │◀─────────┘
│ Resource │     │   JWT    │     │  Token   │
└──────────┘     └──────────┘     └──────────┘
```

### 14.2 JWT Token Structure

**Payload includes:**

- User ID
- User role
- Email
- School ID (for multi-tenant isolation)

**Configuration:**

- Token Expiry: 24 hours (configurable via `JWT_EXPIRES_IN`)
- Algorithm: HS256
- Secret: Environment variable `JWT_SECRET`

### 14.3 Password Security

| Aspect        | Implementation                         |
| ------------- | -------------------------------------- |
| Hashing       | bcryptjs with 10 salt rounds           |
| Storage       | Never stored in plain text             |
| Validation    | Minimum 6 characters                   |
| Pre-save Hook | Automatic hashing before database save |

### 14.4 Role-Based Access Control (RBAC)

**Middleware Chain:**

```javascript
// 1. Universal JWT verification
const protect = async (req, res, next) => {
  // Verifies JWT token
  // Attaches user to req.user
};

// 2. Role-specific access
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

// 3. Permission checking
const checkPermission = (resource, action) => {
  return (req, res, next) => {
    if (!req.user.hasPermission(resource, action)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};
```

### 14.5 Admin Permissions Object

```javascript
{
  students: { create: true, read: true, update: true, delete: true },
  teachers: { create: true, read: true, update: true, delete: true },
  courses: { create: true, read: true, update: true, delete: true },
  sports: { create: true, read: true, update: true, delete: true },
  library: { create: true, read: true, update: true, delete: true }
}
```

**Method:** `admin.hasPermission(resource, action)` returns boolean

### 14.6 Security Measures

| Measure              | Implementation                       |
| -------------------- | ------------------------------------ |
| **Password Hashing** | bcryptjs with salt rounds            |
| **JWT Secrets**      | Stored in environment variables      |
| **Token Expiry**     | 24 hours (configurable)              |
| **Rate Limiting**    | Upstash Redis sliding window         |
| **Input Validation** | Mongoose schema + custom validators  |
| **CORS**             | Configured for frontend domain only  |
| **Helmet**           | Security headers (XSS, CSP, etc.)    |
| **Error Handling**   | Generic messages (no sensitive data) |

### 14.7 Rate Limiting Configuration

| Endpoint Type    | Limit        | Window              |
| ---------------- | ------------ | ------------------- |
| Authentication   | 5 requests   | 60 seconds per IP   |
| General API      | 100 requests | 15 minutes per user |
| Admin Operations | 200 requests | 15 minutes          |

**Headers Returned:**

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1701780000
```

---

## 15. Business Rules

### 15.1 Student Registration Rules

| Rule                | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| Gender Matching     | Student gender must match school type (boys→male, girls→female, mixed→any) |
| School Verification | Student must belong to an existing, active school                          |
| NIC Validation      | Valid National Identity Card number required                               |
| Email Uniqueness    | Email must be unique across all students                                   |
| Class Assignment    | Students assigned to classrooms (max 30 per class)                         |

### 15.2 Attendance Rules

| Rule               | Description                                 |
| ------------------ | ------------------------------------------- |
| Daily Marking      | Class teacher marks attendance once per day |
| Deadline           | Must complete by 8:30 PM                    |
| Auto-Finalization  | System locks records at 9:00 PM             |
| No Late Edits      | After 9:00 PM, only admin can modify        |
| Class Teacher Only | Only assigned class teacher can mark        |

### 15.3 Classroom Allocation Rules

| Rule              | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| Maximum Capacity  | 30 students per classroom                                     |
| Auto-Sectioning   | System creates sections A-E based on enrollment               |
| One Class Teacher | Each classroom has exactly one class teacher                  |
| Grade Grouping    | Supervisors assigned to grade groups (1-5, 6-9, 10-11, 12-14) |

### 15.4 Library Rules

| Rule                  | Description                                   |
| --------------------- | --------------------------------------------- |
| One Library           | Each school has exactly one library           |
| Physical Verification | Book operations require physical book receipt |
| Automatic Fines       | System calculates fines based on overdue days |
| Availability Tracking | Real-time tracking of available copies        |

### 15.5 Sports Rules

| Rule                    | Description                                |
| ----------------------- | ------------------------------------------ |
| Registration Approval   | Coaches must approve student registrations |
| One Sports Ground       | Each school has one sports ground          |
| Category Classification | Sports classified as Indoor or Outdoor     |
| Age Categories          | Students grouped by age for competitions   |

### 15.6 Notice Propagation Rules

| Rule              | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| Downward Flow     | Notices flow from higher to lower levels                           |
| Scope Limitation  | Users can only post to their assigned scope                        |
| Visibility        | Students see notices from principal, supervisor, and class teacher |
| No Upward Posting | Lower roles cannot post to higher organizational levels            |

### 15.7 Complaint Routing Rules

| Rule                 | Description                                    |
| -------------------- | ---------------------------------------------- |
| Central Receipt      | All complaints go directly to Principal        |
| Category Routing     | Principal forwards based on complaint category |
| Status Tracking      | All complaints have trackable status           |
| Resolution Authority | Only Principal can mark as resolved/closed     |

---

## Appendix A: Environment Variables

### Server (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb://127.0.0.1:27017/OnlineSchool
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
DISABLE_RATE_LIMITING=true
FRONTEND_URL=http://localhost:5173
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Edu-Pro
VITE_APP_VERSION=1.0.0
```

---

## Appendix B: API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "count": 10
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes

| Code | Meaning               | When Used                   |
| ---- | --------------------- | --------------------------- |
| 200  | OK                    | Successful GET, PUT, DELETE |
| 201  | Created               | Successful POST (creation)  |
| 400  | Bad Request           | Invalid input data          |
| 401  | Unauthorized          | Missing or invalid token    |
| 403  | Forbidden             | Insufficient permissions    |
| 404  | Not Found             | Resource doesn't exist      |
| 409  | Conflict              | Duplicate entry             |
| 429  | Too Many Requests     | Rate limit exceeded         |
| 500  | Internal Server Error | Server error                |

---

**Document Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025
**Status:** Production Ready ✅

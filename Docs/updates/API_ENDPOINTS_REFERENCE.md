# Edu-Pro Complete API Reference

**Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025
**Base URL:** `/api/v1`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication](#2-authentication)
3. [Admin Endpoints](#3-admin-endpoints)
4. [Student Endpoints](#4-student-endpoints)
5. [Teacher Endpoints](#5-teacher-endpoints)
6. [ClassGroup Endpoints](#6-classgroup-endpoints)
7. [Course & Module Endpoints](#7-course--module-endpoints)
8. [Attendance Endpoints](#8-attendance-endpoints)
9. [Exam & Result Endpoints](#9-exam--result-endpoints)
10. [Library Endpoints](#10-library-endpoints)
11. [Sports Endpoints](#11-sports-endpoints)
12. [Notice Endpoints](#12-notice-endpoints)
13. [Complaint Endpoints](#13-complaint-endpoints)
14. [Response Formats](#14-response-formats)
15. [Error Codes](#15-error-codes)

---

## 1. Overview

### 1.1 Base Configuration

| Setting         | Value                            |
| --------------- | -------------------------------- |
| Base URL (Dev)  | `http://localhost:5000/api/v1`   |
| Base URL (Prod) | `https://your-domain.com/api/v1` |
| Content-Type    | `application/json`               |
| Authentication  | Bearer Token (JWT)               |

### 1.2 Request Headers

```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### 1.3 Rate Limiting

| Endpoint Type    | Limit        | Window     | Algorithm      |
| ---------------- | ------------ | ---------- | -------------- |
| Authentication   | 5 requests   | 60 seconds | Sliding window |
| General API      | 100 requests | 15 minutes | Sliding window |
| Admin Operations | 200 requests | 15 minutes | Sliding window |

**Rate Limit Headers:**

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1701780000
```

### 1.4 Route Summary

| Route Group    | Prefix         | Endpoints |
| -------------- | -------------- | --------- |
| Authentication | `/auth`        | 10        |
| Admin          | `/admin`       | 15+       |
| Students       | `/students`    | 12+       |
| Teachers       | `/teachers`    | 10+       |
| Class Groups   | `/classgroups` | 8         |
| Modules        | `/modules`     | 6         |
| Library        | `/library`     | 12        |
| Notices        | `/notices`     | 6         |
| Complaints     | `/complaints`  | 8         |

---

## 2. Authentication

### 2.1 Admin Authentication

#### Register Admin

```http
POST /auth/admin/register
```

**Request Body:**

```json
{
  "username": "principal_john",
  "email": "john@school.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "admin": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "adminID": "adm0001",
      "username": "principal_john",
      "email": "john@school.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login Admin

```http
POST /auth/admin/login
```

**Request Body:**

```json
{
  "email": "john@school.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "adminID": "adm0001",
      "username": "principal_john",
      "email": "john@school.com",
      "schoolID": "sch_001b",
      "schoolName": "ABC Boys School",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2.2 Student Authentication

#### Register Student

```http
POST /auth/student/register
```

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "john.student@school.com",
  "password": "password123",
  "nic": "200012345678",
  "gender": "male",
  "grade": 10,
  "schoolID": "sch_001b"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "student": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "studentID": "st001b5678",
      "name": "John Smith",
      "email": "john.student@school.com",
      "gender": "male",
      "grade": 10,
      "schoolID": "sch_001b"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**

- Gender must match school type (boys school → male only)
- NIC must be valid
- School ID must exist

#### Login Student

```http
POST /auth/student/login
```

**Request Body:**

```json
{
  "email": "john.student@school.com",
  "password": "password123"
}
```

### 2.3 Teacher Authentication

#### Register Teacher

```http
POST /auth/teacher/register
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane.teacher@school.com",
  "password": "password123",
  "nic": "198012341102",
  "qualification": "M.Ed",
  "specialization": "Mathematics",
  "schoolID": "sch_001b"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Teacher registered successfully",
  "data": {
    "teacher": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "teacherID": "te001b1102",
      "name": "Jane Doe",
      "email": "jane.teacher@school.com",
      "qualification": "M.Ed",
      "specialization": "Mathematics",
      "teacherRole": "subject_teacher",
      "schoolID": "sch_001b"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login Teacher

```http
POST /auth/teacher/login
```

### 2.4 Coach Authentication

#### Register Coach

```http
POST /auth/coach/register
```

**Request Body:**

```json
{
  "name": "Mike Johnson",
  "email": "mike.coach@school.com",
  "password": "password123",
  "coachType": "head_coach",
  "specialization": "Cricket",
  "sportsCategory": "outdoor",
  "schoolID": "sch_001b"
}
```

#### Login Coach

```http
POST /auth/coach/login
```

### 2.5 Librarian Authentication

#### Register Librarian

```http
POST /auth/librarian/register
```

**Request Body:**

```json
{
  "name": "Sarah Wilson",
  "email": "sarah.librarian@school.com",
  "password": "password123",
  "role": "librarian",
  "schoolID": "sch_001b"
}
```

#### Login Librarian

```http
POST /auth/librarian/login
```

### 2.6 Token Verification

#### Verify Token

```http
GET /auth/verify
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "role": "admin",
      "schoolID": "sch_001b"
    }
  }
}
```

---

## 3. Admin Endpoints

### 3.1 School Management

#### Create School Profile

```http
POST /admin/school
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "schoolName": "ABC Boys High School",
  "schoolType": "boys",
  "address": "123 Education Street",
  "phone": "+1234567890",
  "email": "info@abcschool.com",
  "establishedYear": 1995
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "School profile created successfully",
  "data": {
    "schoolID": "sch_001b",
    "schoolName": "ABC Boys High School",
    "schoolType": "boys"
  }
}
```

#### Get School Profile

```http
GET /admin/school
Authorization: Bearer <admin_token>
```

#### Update School Profile

```http
PUT /admin/school
Authorization: Bearer <admin_token>
```

### 3.2 User Management

#### Get All Students

```http
GET /admin/students
Authorization: Bearer <admin_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Results per page (default: 10) |
| grade | number | Filter by grade |
| section | string | Filter by section |
| status | string | Filter by status |

**Response (200 OK):**

```json
{
  "success": true,
  "count": 150,
  "totalPages": 15,
  "currentPage": 1,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "studentID": "st001b5678",
      "name": "John Smith",
      "email": "john.student@school.com",
      "grade": 10,
      "section": "A",
      "status": "active"
    }
  ]
}
```

#### Get Single Student

```http
GET /admin/students/:id
Authorization: Bearer <admin_token>
```

#### Create Student

```http
POST /admin/students
Authorization: Bearer <admin_token>
```

#### Update Student

```http
PUT /admin/students/:id
Authorization: Bearer <admin_token>
```

#### Delete Student

```http
DELETE /admin/students/:id
Authorization: Bearer <admin_token>
```

#### Get All Teachers

```http
GET /admin/teachers
Authorization: Bearer <admin_token>
```

#### Create Teacher

```http
POST /admin/teachers
Authorization: Bearer <admin_token>
```

#### Update Teacher

```http
PUT /admin/teachers/:id
Authorization: Bearer <admin_token>
```

#### Delete Teacher

```http
DELETE /admin/teachers/:id
Authorization: Bearer <admin_token>
```

### 3.3 Dashboard Statistics

#### Get Dashboard Stats

```http
GET /admin/dashboard/stats
Authorization: Bearer <admin_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalStudents": 450,
    "totalTeachers": 35,
    "totalCourses": 28,
    "totalSports": 8,
    "recentActivities": [],
    "attendanceToday": {
      "present": 420,
      "absent": 30
    },
    "pendingComplaints": 5
  }
}
```

---

## 4. Student Endpoints

### 4.1 Profile

#### Get Own Profile

```http
GET /students/profile
Authorization: Bearer <student_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "studentID": "st001b5678",
    "name": "John Smith",
    "email": "john.student@school.com",
    "gender": "male",
    "grade": 10,
    "section": "A",
    "classGroup": {
      "_id": "64f...",
      "className": "10A"
    },
    "enrolledCourses": [],
    "status": "active"
  }
}
```

#### Update Own Profile

```http
PUT /students/profile
Authorization: Bearer <student_token>
```

### 4.2 Academic

#### Get My Attendance

```http
GET /students/attendance
Authorization: Bearer <student_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| month | number | Filter by month (1-12) |
| year | number | Filter by year |

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "attendance": [
      {
        "date": "2024-01-15",
        "status": "present"
      },
      {
        "date": "2024-01-16",
        "status": "absent"
      }
    ],
    "summary": {
      "totalDays": 20,
      "present": 18,
      "absent": 2,
      "percentage": 90
    }
  }
}
```

#### Get My Results

```http
GET /students/results
Authorization: Bearer <student_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "exam": {
        "examName": "Mid Term Examination",
        "examType": "midterm"
      },
      "totalMarksObtained": 450,
      "totalMaxMarks": 500,
      "percentage": 90,
      "grade": "A+",
      "status": "pass"
    }
  ]
}
```

#### Get My Courses

```http
GET /students/courses
Authorization: Bearer <student_token>
```

### 4.3 Library

#### Get My Borrowed Books

```http
GET /students/library/borrowed
Authorization: Bearer <student_token>
```

#### Get Library Catalog

```http
GET /students/library/books
Authorization: Bearer <student_token>
```

### 4.4 Sports

#### Get Available Sports

```http
GET /students/sports
Authorization: Bearer <student_token>
```

#### Register for Sport

```http
POST /students/sports/:sportId/register
Authorization: Bearer <student_token>
```

#### Get My Sports

```http
GET /students/sports/my
Authorization: Bearer <student_token>
```

---

## 5. Teacher Endpoints

### 5.1 Profile & Classes

#### Get Own Profile

```http
GET /teachers/profile
Authorization: Bearer <teacher_token>
```

#### Get Assigned Classes

```http
GET /teachers/classes
Authorization: Bearer <teacher_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f...",
      "className": "10A",
      "grade": 10,
      "section": "A",
      "currentStrength": 28,
      "students": []
    }
  ]
}
```

#### Get Class Students

```http
GET /teachers/classes/:classId/students
Authorization: Bearer <teacher_token>
```

### 5.2 Attendance

#### Mark Attendance

```http
POST /teachers/attendance
Authorization: Bearer <teacher_token>
```

**Request Body:**

```json
{
  "classGroupId": "64f1a2b3c4d5e6f7a8b9c0d4",
  "date": "2024-01-15",
  "attendance": [
    {
      "studentId": "64f1a2b3c4d5e6f7a8b9c0d2",
      "status": "present"
    },
    {
      "studentId": "64f1a2b3c4d5e6f7a8b9c0d5",
      "status": "absent"
    }
  ]
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "attendanceID": "att_001",
    "classGroup": "64f...",
    "date": "2024-01-15",
    "markedBy": "64f...",
    "finalized": false
  }
}
```

**Time Validation:**

- Must be before 8:30 PM deadline
- After 9:00 PM, records are auto-finalized

#### Get Attendance for Class

```http
GET /teachers/attendance/:classId
Authorization: Bearer <teacher_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| date | string | Specific date (YYYY-MM-DD) |
| startDate | string | Range start |
| endDate | string | Range end |

#### Update Attendance

```http
PUT /teachers/attendance/:attendanceId
Authorization: Bearer <teacher_token>
```

**Note:** Only allowed before 9:00 PM and if not finalized.

### 5.3 Results

#### Enter Results

```http
POST /teachers/results
Authorization: Bearer <teacher_token>
```

**Request Body:**

```json
{
  "examId": "64f1a2b3c4d5e6f7a8b9c0d6",
  "results": [
    {
      "studentId": "64f1a2b3c4d5e6f7a8b9c0d2",
      "marks": [
        {
          "moduleId": "64f...",
          "marksObtained": 85,
          "totalMarks": 100
        }
      ]
    }
  ]
}
```

#### Get Results for Class

```http
GET /teachers/results/:classId/:examId
Authorization: Bearer <teacher_token>
```

---

## 6. ClassGroup Endpoints

### 6.1 Management

#### Create Class Group

```http
POST /classgroups
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "grade": 10,
  "section": "A",
  "academicYear": "2024-2025",
  "teacherId": "64f1a2b3c4d5e6f7a8b9c0d3",
  "roomNumber": "101"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Class group created successfully",
  "data": {
    "_id": "64f...",
    "className": "10A",
    "grade": 10,
    "section": "A",
    "capacity": 30,
    "currentStrength": 0
  }
}
```

#### Get All Class Groups

```http
GET /classgroups
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| grade | number | Filter by grade |
| section | string | Filter by section |

#### Get Single Class Group

```http
GET /classgroups/:id
Authorization: Bearer <token>
```

#### Update Class Group

```http
PUT /classgroups/:id
Authorization: Bearer <admin_token>
```

#### Delete Class Group

```http
DELETE /classgroups/:id
Authorization: Bearer <admin_token>
```

### 6.2 Student Assignment

#### Add Student to Class

```http
POST /classgroups/:id/students
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "studentId": "64f1a2b3c4d5e6f7a8b9c0d2"
}
```

**Validation:**

- Class must not exceed 30 students
- Student must not already be in a class

#### Remove Student from Class

```http
DELETE /classgroups/:id/students/:studentId
Authorization: Bearer <admin_token>
```

#### Assign Teacher to Class

```http
PUT /classgroups/:id/teacher
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "teacherId": "64f1a2b3c4d5e6f7a8b9c0d3"
}
```

---

## 7. Course & Module Endpoints

### 7.1 Course Management

#### Create Course

```http
POST /courses
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "courseName": "Mathematics",
  "courseCode": "MATH-101",
  "description": "Foundation mathematics for Grade 10",
  "grade": 10,
  "teacherId": "64f...",
  "duration": 40,
  "credits": 4
}
```

#### Get All Courses

```http
GET /courses
Authorization: Bearer <token>
```

#### Get Course by ID

```http
GET /courses/:id
Authorization: Bearer <token>
```

#### Update Course

```http
PUT /courses/:id
Authorization: Bearer <admin_token>
```

#### Delete Course

```http
DELETE /courses/:id
Authorization: Bearer <admin_token>
```

### 7.2 Module Management

#### Create Module

```http
POST /modules
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "moduleName": "Algebra",
  "moduleCode": "MATH-101-A",
  "description": "Introduction to Algebra",
  "courseId": "64f...",
  "credits": 1,
  "instructorId": "64f...",
  "topics": ["Linear Equations", "Quadratic Equations", "Polynomials"]
}
```

#### Get All Modules

```http
GET /modules
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| courseId | string | Filter by course |

#### Get Module by ID

```http
GET /modules/:id
Authorization: Bearer <token>
```

#### Update Module

```http
PUT /modules/:id
Authorization: Bearer <admin_token>
```

#### Delete Module

```http
DELETE /modules/:id
Authorization: Bearer <admin_token>
```

---

## 8. Attendance Endpoints

### 8.1 Admin Attendance

#### Get All Attendance Records

```http
GET /attendance
Authorization: Bearer <admin_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| date | string | Filter by date |
| classGroupId | string | Filter by class |
| finalized | boolean | Filter by finalization status |

#### Get Attendance by ID

```http
GET /attendance/:id
Authorization: Bearer <token>
```

#### Bulk Mark Attendance

```http
POST /attendance/bulk
Authorization: Bearer <admin_token>
```

#### Force Finalize Attendance

```http
PUT /attendance/:id/finalize
Authorization: Bearer <admin_token>
```

**Note:** Admin can force finalize even after 9:00 PM.

### 8.2 Reports

#### Get Daily Report

```http
GET /attendance/report/daily
Authorization: Bearer <admin_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| date | string | Report date (default: today) |

#### Get Monthly Report

```http
GET /attendance/report/monthly
Authorization: Bearer <admin_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| month | number | Month (1-12) |
| year | number | Year |
| classGroupId | string | Optional class filter |

---

## 9. Exam & Result Endpoints

### 9.1 Exam Management

#### Create Exam

```http
POST /exams
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "examName": "Mid Term Examination",
  "examType": "midterm",
  "description": "First semester mid-term exam",
  "date": "2024-03-15",
  "startTime": "09:00",
  "duration": 180,
  "grade": 10,
  "classGroupIds": ["64f..."],
  "moduleIds": ["64f..."],
  "totalMarks": 100,
  "passingMarks": 40
}
```

#### Get All Exams

```http
GET /exams
Authorization: Bearer <token>
```

#### Get Exam by ID

```http
GET /exams/:id
Authorization: Bearer <token>
```

#### Update Exam

```http
PUT /exams/:id
Authorization: Bearer <admin_token>
```

#### Delete Exam

```http
DELETE /exams/:id
Authorization: Bearer <admin_token>
```

### 9.2 Result Management

#### Get All Results

```http
GET /results
Authorization: Bearer <admin_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| examId | string | Filter by exam |
| studentId | string | Filter by student |
| grade | number | Filter by grade |
| status | string | Filter by pass/fail |

#### Get Result by ID

```http
GET /results/:id
Authorization: Bearer <token>
```

#### Create/Update Result

```http
POST /results
Authorization: Bearer <admin_token | teacher_token>
```

#### Get Result Statistics

```http
GET /results/stats/:examId
Authorization: Bearer <admin_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "examId": "64f...",
    "totalStudents": 28,
    "passed": 25,
    "failed": 3,
    "passPercentage": 89.3,
    "averageScore": 72.5,
    "highestScore": 98,
    "lowestScore": 32,
    "gradeDistribution": {
      "A+": 5,
      "A": 8,
      "B+": 6,
      "B": 4,
      "C": 2,
      "D": 0,
      "F": 3
    }
  }
}
```

---

## 10. Library Endpoints

### 10.1 Book Management

#### Add Book

```http
POST /library/books
Authorization: Bearer <admin_token | librarian_token>
```

**Request Body:**

```json
{
  "title": "Introduction to Physics",
  "author": "Richard Feynman",
  "isbn": "978-0-123456-78-9",
  "category": "Science",
  "publisher": "Academic Press",
  "publicationYear": 2020,
  "totalCopies": 10,
  "location": "Shelf A, Row 3"
}
```

#### Get All Books

```http
GET /library/books
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search title/author |
| category | string | Filter by category |
| available | boolean | Filter available only |
| page | number | Page number |
| limit | number | Results per page |

#### Get Book by ID

```http
GET /library/books/:id
Authorization: Bearer <token>
```

#### Update Book

```http
PUT /library/books/:id
Authorization: Bearer <admin_token | librarian_token>
```

#### Delete Book

```http
DELETE /library/books/:id
Authorization: Bearer <admin_token | librarian_token>
```

### 10.2 Transactions

#### Issue Book

```http
POST /library/issue
Authorization: Bearer <admin_token | librarian_token>
```

**Request Body:**

```json
{
  "bookId": "64f...",
  "studentId": "64f...",
  "dueDate": "2024-02-15"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Book issued successfully",
  "data": {
    "transactionID": "txn_001",
    "book": {
      "title": "Introduction to Physics"
    },
    "student": {
      "name": "John Smith",
      "studentID": "st001b5678"
    },
    "issueDate": "2024-01-15",
    "dueDate": "2024-02-15",
    "status": "issued"
  }
}
```

#### Return Book

```http
POST /library/return
Authorization: Bearer <admin_token | librarian_token>
```

**Request Body:**

```json
{
  "transactionId": "64f..."
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Book returned successfully",
  "data": {
    "transactionID": "txn_001",
    "returnDate": "2024-02-20",
    "daysOverdue": 5,
    "fine": 5,
    "status": "returned"
  }
}
```

#### Renew Book

```http
POST /library/renew
Authorization: Bearer <admin_token | librarian_token>
```

**Request Body:**

```json
{
  "transactionId": "64f...",
  "newDueDate": "2024-03-01"
}
```

### 10.3 Reports

#### Get Overdue Books

```http
GET /library/overdue
Authorization: Bearer <admin_token | librarian_token>
```

#### Get Transaction History

```http
GET /library/transactions
Authorization: Bearer <admin_token | librarian_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| studentId | string | Filter by student |
| bookId | string | Filter by book |
| status | string | Filter by status |
| startDate | string | Date range start |
| endDate | string | Date range end |

#### Get Student Borrowing History

```http
GET /library/history/:studentId
Authorization: Bearer <admin_token | librarian_token>
```

---

## 11. Sports Endpoints

### 11.1 Sport Management

#### Create Sport

```http
POST /sports
Authorization: Bearer <admin_token | coach_token>
```

**Request Body:**

```json
{
  "sportName": "Cricket",
  "description": "School cricket team",
  "category": "outdoor",
  "coachId": "64f...",
  "ageCategory": "under-16",
  "maxParticipants": 25,
  "practiceSchedule": [
    {
      "day": "monday",
      "startTime": "15:00",
      "endTime": "17:00",
      "location": "Main Ground"
    }
  ]
}
```

#### Get All Sports

```http
GET /sports
Authorization: Bearer <token>
```

#### Get Sport by ID

```http
GET /sports/:id
Authorization: Bearer <token>
```

#### Update Sport

```http
PUT /sports/:id
Authorization: Bearer <admin_token | coach_token>
```

#### Delete Sport

```http
DELETE /sports/:id
Authorization: Bearer <admin_token>
```

### 11.2 Participants

#### Get Participants

```http
GET /sports/:id/participants
Authorization: Bearer <admin_token | coach_token>
```

#### Approve/Reject Registration

```http
PUT /sports/:id/participants/:participantId
Authorization: Bearer <admin_token | coach_token>
```

**Request Body:**

```json
{
  "status": "approved",
  "position": "Batsman"
}
```

#### Remove Participant

```http
DELETE /sports/:id/participants/:participantId
Authorization: Bearer <admin_token | coach_token>
```

### 11.3 Events

#### Add Event

```http
POST /sports/:id/events
Authorization: Bearer <admin_token | coach_token>
```

**Request Body:**

```json
{
  "eventName": "Inter-School Cricket Tournament",
  "eventType": "tournament",
  "date": "2024-04-15",
  "time": "09:00",
  "location": "City Stadium",
  "opponent": "XYZ School"
}
```

#### Get Sport Events

```http
GET /sports/:id/events
Authorization: Bearer <token>
```

#### Update Event Result

```http
PUT /sports/:sportId/events/:eventId
Authorization: Bearer <admin_token | coach_token>
```

---

## 12. Notice Endpoints

### 12.1 Notice Management

#### Create Notice

```http
POST /notices
Authorization: Bearer <admin_token | teacher_token | coach_token>
```

**Request Body:**

```json
{
  "title": "Annual Sports Day",
  "content": "Annual sports day will be held on...",
  "audience": "all",
  "priority": "high",
  "publishDate": "2024-01-20",
  "expiryDate": "2024-01-25"
}
```

**Audience-Specific Examples:**

For Grade-specific notice (Grade Incharge):

```json
{
  "title": "Grade 10 Parent Meeting",
  "content": "All grade 10 parents are invited...",
  "audience": "grade",
  "targetGrade": 10,
  "priority": "medium"
}
```

For Class-specific notice (Class Teacher):

```json
{
  "title": "Class 10A Field Trip",
  "content": "Class 10A students will have a field trip...",
  "audience": "class",
  "targetClass": "64f...",
  "priority": "high"
}
```

#### Get All Notices

```http
GET /notices
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| audience | string | Filter by audience |
| priority | string | Filter by priority |
| status | string | Filter by status |

#### Get Notice by ID

```http
GET /notices/:id
Authorization: Bearer <token>
```

#### Update Notice

```http
PUT /notices/:id
Authorization: Bearer <admin_token | creator_token>
```

#### Delete Notice

```http
DELETE /notices/:id
Authorization: Bearer <admin_token | creator_token>
```

### 12.2 Notice Queries

#### Get My Notices (Student)

```http
GET /notices/my
Authorization: Bearer <student_token>
```

Returns notices targeted to:

- All students
- Student's specific grade
- Student's specific class
- School-wide notices

---

## 13. Complaint Endpoints

### 13.1 Complaint Submission

#### Submit Complaint

```http
POST /complaints
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Library Book Availability",
  "description": "Required textbooks are often unavailable in the library...",
  "category": "library",
  "priority": "medium"
}
```

#### Get My Complaints

```http
GET /complaints/my
Authorization: Bearer <token>
```

### 13.2 Complaint Management (Admin)

#### Get All Complaints

```http
GET /complaints
Authorization: Bearer <admin_token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status |
| category | string | Filter by category |
| priority | string | Filter by priority |

#### Get Complaint by ID

```http
GET /complaints/:id
Authorization: Bearer <admin_token>
```

#### Update Complaint Status

```http
PUT /complaints/:id/status
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "status": "in-progress",
  "assignedTo": "64f...",
  "internalNotes": "Forwarded to librarian for review"
}
```

#### Respond to Complaint

```http
PUT /complaints/:id/respond
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "response": "We have added 5 copies of the requested textbooks.",
  "status": "resolved"
}
```

#### Delete Complaint

```http
DELETE /complaints/:id
Authorization: Bearer <admin_token>
```

---

## 14. Response Formats

### 14.1 Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "count": 10,
  "totalPages": 5,
  "currentPage": 1
}
```

### 14.2 Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 14.3 Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    },
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 15. Error Codes

### 15.1 HTTP Status Codes

| Code | Name                  | Description                             |
| ---- | --------------------- | --------------------------------------- |
| 200  | OK                    | Successful GET, PUT, DELETE             |
| 201  | Created               | Successful POST (resource created)      |
| 204  | No Content            | Successful DELETE with no response body |
| 400  | Bad Request           | Invalid input data, validation errors   |
| 401  | Unauthorized          | Missing or invalid authentication token |
| 403  | Forbidden             | Insufficient permissions for operation  |
| 404  | Not Found             | Resource does not exist                 |
| 409  | Conflict              | Duplicate entry, resource conflict      |
| 422  | Unprocessable Entity  | Valid request but cannot process        |
| 429  | Too Many Requests     | Rate limit exceeded                     |
| 500  | Internal Server Error | Server-side error                       |

### 15.2 Application Error Codes

| Code     | Description                  |
| -------- | ---------------------------- |
| AUTH_001 | Invalid credentials          |
| AUTH_002 | Token expired                |
| AUTH_003 | Token invalid                |
| AUTH_004 | Account not found            |
| PERM_001 | Insufficient permissions     |
| PERM_002 | Resource access denied       |
| VAL_001  | Required field missing       |
| VAL_002  | Invalid field format         |
| VAL_003  | Value out of range           |
| RES_001  | Resource not found           |
| RES_002  | Resource already exists      |
| RES_003  | Resource conflict            |
| ATT_001  | Attendance deadline passed   |
| ATT_002  | Attendance already finalized |
| LIB_001  | Book not available           |
| LIB_002  | Maximum books borrowed       |
| LIB_003  | Outstanding fines            |
| CLS_001  | Class capacity exceeded      |
| CLS_002  | Student already assigned     |

---

**Document Version:** 2.0.0 (Consolidated)
**Last Updated:** November 25, 2025
**Total Endpoints:** 100+

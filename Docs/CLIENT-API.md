# 📚 Complete API Reference - Edu-Pro Client

## Overview

This document provides a comprehensive reference for all API services, endpoints, and usage patterns in the Edu-Pro client application.

---

## 🔐 Authentication Services

### **adminAuth**

```javascript
import { adminAuth } from "@/services/authService";

// Register
await adminAuth.register({
  name: string,
  email: string,
  password: string,
  schoolName: string,
});

// Login
await adminAuth.login({
  email: string,
  password: string,
});
```

### **studentAuth**

```javascript
import { studentAuth } from "@/services/authService";

// Register
await studentAuth.register({
  name: string,
  email: string,
  password: string,
  studentId: string,
  classId: string,
});

// Login
await studentAuth.login({
  email: string,
  password: string,
});
```

### **teacherAuth**

```javascript
import { teacherAuth } from "@/services/authService";

// Register (Admin only)
await teacherAuth.register({
  name: string,
  email: string,
  password: string,
  subject: string,
});

// Login
await teacherAuth.login({
  email: string,
  password: string,
});
```

### **coachAuth**

```javascript
import { coachAuth } from '@/services/authService';

// Register (Admin only)
await coachAuth.register({
  name: string,
  email: string,
  password: string,
  sports: string[]
});

// Login
await coachAuth.login({
  email: string,
  password: string
});
```

### **librarianAuth**

```javascript
import { librarianAuth } from "@/services/authService";

// Register (Admin only)
await librarianAuth.register({
  name: string,
  email: string,
  password: string,
});

// Login
await librarianAuth.login({
  email: string,
  password: string,
});
```

### **Common Auth Methods**

```javascript
import {
  logout,
  getCurrentUser,
  isAuthenticated,
  getUserRole,
} from "@/services/authService";

// Logout
logout(); // Clears all tokens and user data

// Get current user
const user = getCurrentUser(); // Returns user object with role

// Check authentication
const authenticated = isAuthenticated(); // Returns boolean

// Get user role
const role = getUserRole(); // Returns 'admin' | 'student' | 'teacher' | 'coach' | 'librarian' | null
```

---

## 👨‍💼 Admin Services

### **adminService**

```javascript
import adminService from "@/services/adminService";

// Dashboard
const dashboard = await adminService.getDashboard();

// School Profile
const profile = await adminService.getSchoolProfile();
await adminService.updateSchoolProfile(data);

// Students
const students = await adminService.getAllStudents();
const student = await adminService.getStudentById(id);
await adminService.createStudent(data);
await adminService.updateStudent(id, data);
await adminService.deleteStudent(id);

// Teachers
const teachers = await adminService.getAllTeachers();
const teacher = await adminService.getTeacherById(id);
await adminService.createTeacher(data);
await adminService.updateTeacher(id, data);
await adminService.deleteTeacher(id);

// Courses
const courses = await adminService.getAllCourses();
const course = await adminService.getCourseById(id);
await adminService.createCourse(data);
await adminService.updateCourse(id, data);
await adminService.deleteCourse(id);

// Sports
const sports = await adminService.getAllSports();
const sport = await adminService.getSportById(id);
await adminService.createSport(data);
await adminService.updateSport(id, data);
await adminService.deleteSport(id);

// Coaches
const coaches = await adminService.getAllCoaches();
const coach = await adminService.getCoachById(id);
await adminService.createCoach(data);
await adminService.updateCoach(id, data);
await adminService.deleteCoach(id);

// Books
const books = await adminService.getAllBooks();
const book = await adminService.getBookById(id);
await adminService.createBook(data);
await adminService.updateBook(id, data);
await adminService.deleteBook(id);

// Attendance
const attendance = await adminService.getAllAttendance();
const record = await adminService.getAttendanceById(id);
await adminService.createAttendance(data);
await adminService.updateAttendance(id, data);
await adminService.deleteAttendance(id);

// Results
const results = await adminService.getAllResults();
const result = await adminService.getResultById(id);
await adminService.createResult(data);
await adminService.updateResult(id, data);
await adminService.deleteResult(id);
```

---

## 🎓 Student Services

### **studentService**

```javascript
import studentService from "@/services/studentService";

// Dashboard
const dashboard = await studentService.getDashboard();

// Profile
const profile = await studentService.getProfile();
await studentService.updateProfile(data);

// Courses
const courses = await studentService.getCourses();
await studentService.enrollCourse(courseId);

// Sports
const sports = await studentService.getSports();
await studentService.joinSport(sportId);

// Attendance
const attendance = await studentService.getAttendance();

// Results
const results = await studentService.getResults();
```

---

## 👨‍🏫 Teacher Services

### **teacherService**

```javascript
import teacherService from "@/services/teacherService";

// Dashboard
const dashboard = await teacherService.getDashboard();

// Profile
const profile = await teacherService.getProfile();
await teacherService.updateProfile(data);

// Classes
const classes = await teacherService.getClasses();
const classDetails = await teacherService.getClassDetails(classId);
const students = await teacherService.getClassStudents(classId);
const stats = await teacherService.getClassStatistics(classId);

// Attendance
await teacherService.markAttendance(classId, {
  date: string,
  students: [{ studentId: string, status: "present" | "absent" | "late" }],
});
const attendance = await teacherService.getAttendance(classId, {
  date,
  month,
  year,
});

// Results
await teacherService.createResults({
  classId: string,
  examId: string,
  results: [{ studentId: string, marks: number }],
});
const results = await teacherService.getResults(classId);
await teacherService.updateResult(resultId, data);

// Others
const subjects = await teacherService.getSubjects();
const notices = await teacherService.getNotices();
const progress = await teacherService.getStudentProgress(classId, studentId);
```

---

## 🏆 Coach Services

### **coachService**

```javascript
import coachService from "@/services/coachService";

// Dashboard
const dashboard = await coachService.getDashboard();

// Profile
const profile = await coachService.getProfile();
await coachService.updateProfile(data);

// Sports
const sports = await coachService.getSports();
const sportDetails = await coachService.getSportDetails(sportId);
const stats = await coachService.getSportStatistics(sportId);

// Participants
const participants = await coachService.getParticipants(sportId);
await coachService.addParticipant(sportId, studentId);
await coachService.removeParticipant(sportId, studentId);

// Events
await coachService.createEvent({
  sportId: string,
  title: string,
  date: string,
  location: string,
  type: string,
});
const events = await coachService.getEvents(sportId);
await coachService.updateEvent(eventId, data);
await coachService.deleteEvent(eventId);

// Performance
await coachService.recordPerformance({
  sportId: string,
  studentId: string,
  eventId: string,
  metrics: object,
});
const performance = await coachService.getPerformance(sportId, studentId);

// Others
const notices = await coachService.getNotices();
```

---

## 📚 Librarian Services

### **librarianService**

```javascript
import librarianService from "@/services/librarianService";

// Dashboard
const dashboard = await librarianService.getDashboard();

// Profile
const profile = await librarianService.getProfile();
await librarianService.updateProfile(data);

// Books
const books = await librarianService.getAllBooks({ page, limit, search });
const book = await librarianService.getBookById(bookId);
await librarianService.createBook({
  title: string,
  author: string,
  isbn: string,
  category: string,
  quantity: number,
});
await librarianService.updateBook(bookId, data);
await librarianService.deleteBook(bookId);
const searchResults = await librarianService.searchBooks(query);

// Transactions
await librarianService.issueBook({
  bookId: string,
  studentId: string,
  dueDate: string,
});
await librarianService.returnBook(transactionId, {
  returnDate: string,
  condition: string,
});
const transactions = await librarianService.getTransactions({
  page,
  limit,
  status,
});
const transaction = await librarianService.getTransactionById(transactionId);
const studentTransactions = await librarianService.getStudentTransactions(
  studentId
);

// Overdue & Fines
const overdueBooks = await librarianService.getOverdueBooks();
const fine = await librarianService.calculateFine(transactionId);
await librarianService.payFine(transactionId, {
  amount: number,
  method: string,
});

// Statistics
const stats = await librarianService.getLibraryStatistics();
const available = await librarianService.getAvailableBooks();
const issued = await librarianService.getIssuedBooks();
```

---

## 🔗 API Endpoints Reference

### **Base URL**

```javascript
const API_VERSION = "/api/v1";
```

### **Authentication Endpoints**

```
POST /api/v1/auth/admin/register
POST /api/v1/auth/admin/login
POST /api/v1/auth/student/register
POST /api/v1/auth/student/login
POST /api/v1/auth/teacher/register
POST /api/v1/auth/teacher/login
POST /api/v1/auth/coach/register
POST /api/v1/auth/coach/login
POST /api/v1/auth/librarian/register
POST /api/v1/auth/librarian/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

### **Admin Endpoints**

```
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/profile
GET    /api/v1/admin/school/profile
PUT    /api/v1/admin/school/profile

GET    /api/v1/admin/students
GET    /api/v1/admin/students/:id
POST   /api/v1/admin/students
PUT    /api/v1/admin/students/:id
DELETE /api/v1/admin/students/:id

GET    /api/v1/admin/teachers
GET    /api/v1/admin/teachers/:id
POST   /api/v1/admin/teachers
PUT    /api/v1/admin/teachers/:id
DELETE /api/v1/admin/teachers/:id

GET    /api/v1/admin/courses
GET    /api/v1/admin/courses/:id
POST   /api/v1/admin/courses
PUT    /api/v1/admin/courses/:id
DELETE /api/v1/admin/courses/:id

GET    /api/v1/admin/sports
GET    /api/v1/admin/sports/:id
POST   /api/v1/admin/sports
PUT    /api/v1/admin/sports/:id
DELETE /api/v1/admin/sports/:id

GET    /api/v1/admin/coaches
GET    /api/v1/admin/coaches/:id
POST   /api/v1/admin/coaches
PUT    /api/v1/admin/coaches/:id
DELETE /api/v1/admin/coaches/:id
```

### **Student Endpoints**

```
GET  /api/v1/student/:id/dashboard
GET  /api/v1/student/profile
PUT  /api/v1/student/profile
GET  /api/v1/student/courses
POST /api/v1/student/courses/enroll
GET  /api/v1/student/sports
POST /api/v1/student/sports/join
GET  /api/v1/student/attendance
GET  /api/v1/student/results
```

### **Teacher Endpoints**

```
GET  /api/v1/teacher/dashboard
GET  /api/v1/teacher/profile
PUT  /api/v1/teacher/profile
GET  /api/v1/teacher/classes
GET  /api/v1/teacher/classes/:id
GET  /api/v1/teacher/classes/:id/students
POST /api/v1/teacher/classes/:id/attendance
GET  /api/v1/teacher/classes/:id/attendance
POST /api/v1/teacher/results
GET  /api/v1/teacher/classes/:id/results
PUT  /api/v1/teacher/results/:id
GET  /api/v1/teacher/subjects
GET  /api/v1/teacher/notices
GET  /api/v1/teacher/classes/:classId/students/:studentId/progress
GET  /api/v1/teacher/classes/:id/stats
```

### **Coach Endpoints**

```
GET    /api/v1/coach/dashboard
GET    /api/v1/coach/profile
PUT    /api/v1/coach/profile
GET    /api/v1/coach/sports
GET    /api/v1/coach/sports/:id
GET    /api/v1/coach/sports/:id/participants
POST   /api/v1/coach/sports/:id/participants
DELETE /api/v1/coach/sports/:sportId/participants/:studentId
POST   /api/v1/coach/events
GET    /api/v1/coach/sports/:id/events
PUT    /api/v1/coach/events/:id
DELETE /api/v1/coach/events/:id
POST   /api/v1/coach/performance
GET    /api/v1/coach/sports/:sportId/participants/:studentId/performance
GET    /api/v1/coach/sports/:id/stats
GET    /api/v1/coach/notices
```

### **Librarian Endpoints**

```
GET  /api/v1/librarian/dashboard
GET  /api/v1/librarian/profile
PUT  /api/v1/librarian/profile
```

### **Library Endpoints (Shared)**

```
GET    /api/v1/library/books
GET    /api/v1/library/books/:id
POST   /api/v1/library/books
PUT    /api/v1/library/books/:id
DELETE /api/v1/library/books/:id
GET    /api/v1/library/books/search
POST   /api/v1/library/issue
POST   /api/v1/library/return/:id
GET    /api/v1/library/transactions
GET    /api/v1/library/transactions/:id
GET    /api/v1/library/students/:id/transactions
GET    /api/v1/library/overdue
GET    /api/v1/library/transactions/:id/fine
POST   /api/v1/library/transactions/:id/pay
GET    /api/v1/library/stats
GET    /api/v1/library/available
GET    /api/v1/library/issued
```

### **Notice Endpoints (Shared)**

```
GET    /api/v1/notices
GET    /api/v1/notices/:id
POST   /api/v1/notices
PUT    /api/v1/notices/:id
DELETE /api/v1/notices/:id
```

### **Complaint Endpoints (Shared)**

```
GET    /api/v1/complaints
GET    /api/v1/complaints/:id
POST   /api/v1/complaints
PUT    /api/v1/complaints/:id
DELETE /api/v1/complaints/:id
```

---

## 🛠️ API Client Configuration

### **Base Axios Instance**

```javascript
import { apiClient } from "@/services/api";

// Automatic features:
// - Base URL from environment variable
// - Auto-inject auth token from localStorage
// - Automatic 401 handling (logout + redirect)
// - Error response formatting
```

### **Request Interceptor**

```javascript
// Automatically adds token to headers
headers: {
  Authorization: `Bearer ${token}`;
}
```

### **Response Interceptor**

```javascript
// Success: Returns response.data
// Error:
// - 401: Auto logout + redirect to login
// - Other: Throws formatted error
```

---

## 📦 Data Models

### **Student**

```typescript
{
  _id: string;
  studentId: string; // st010m1099
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  address: string;
  classId: string;
  enrollmentDate: Date;
  status: "active" | "inactive" | "graduated";
}
```

### **Teacher**

```typescript
{
  _id: string
  teacherId: string // te010m1102
  name: string
  email: string
  phone: string
  subject: string
  classesAssigned: string[]
  joiningDate: Date
  status: 'active' | 'inactive'
}
```

### **Coach**

```typescript
{
  _id: string
  coachId: string
  name: string
  email: string
  phone: string
  sports: string[]
  specialization: string
  joiningDate: Date
  status: 'active' | 'inactive'
}
```

### **Book**

```typescript
{
  _id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  publishYear: number;
  quantity: number;
  available: number;
  location: string;
}
```

### **Transaction**

```typescript
{
  _id: string
  bookId: string
  studentId: string
  issueDate: Date
  dueDate: Date
  returnDate?: Date
  fine: number
  status: 'issued' | 'returned' | 'overdue'
}
```

---

## 🔒 Authentication Flow

```
1. User submits login form
2. authService.{role}Auth.login(credentials)
3. API returns { token, user }
4. Save to localStorage: {role}Token, {role}Data
5. AuthContext updates with user data
6. Redirect to dashboard
7. All API calls auto-include token
8. On 401 response: logout + redirect to login
```

---

## ⚠️ Error Handling

### **Service Layer**

```javascript
try {
  const data = await adminService.createStudent(formData);
  // Success handling
} catch (error) {
  // error.response.data.message
  // error.message
}
```

### **Using useApi Hook**

```javascript
const { data, loading, error, execute } = useApi(adminService.getAllStudents);

useEffect(() => {
  execute();
}, []);

if (error) {
  // Display error message
}
```

---

**Last Updated**: November 24, 2025
**Version**: 1.0.0

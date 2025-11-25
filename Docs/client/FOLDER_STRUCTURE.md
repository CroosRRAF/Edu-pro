# 📁 Complete Folder Structure - Edu-Pro Client

## 🏗️ Architecture Overview

```
client/
├── public/                         # Static assets
├── src/
│   ├── assets/                     # Images, icons, fonts
│   │   └── react.svg
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/                 # Generic UI components
│   │   │   ├── Alert.jsx          # Alert notifications
│   │   │   ├── Badge.jsx          # Status badges
│   │   │   ├── Button.jsx         # Button component
│   │   │   ├── Card.jsx           # Card container
│   │   │   ├── Input.jsx          # Input field
│   │   │   ├── Loader.jsx         # Loading spinner
│   │   │   ├── Modal.jsx          # Modal dialog
│   │   │   ├── Select.jsx         # Dropdown select
│   │   │   ├── Table.jsx          # Data table
│   │   │   └── index.js           # Barrel exports
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── AuthLayout.jsx     # Auth pages layout
│   │   │   ├── DashboardLayout.jsx # Dashboard layout
│   │   │   ├── Header.jsx         # App header
│   │   │   ├── Sidebar.jsx        # Sidebar navigation
│   │   │   └── index.js           # Barrel exports
│   │   │
│   │   ├── forms/                 # Form components
│   │   │   ├── FormInput.jsx      # Form input with validation [TO CREATE]
│   │   │   ├── FormSelect.jsx     # Form select with validation [TO CREATE]
│   │   │   ├── FormTextarea.jsx   # Form textarea [TO CREATE]
│   │   │   ├── FormDatePicker.jsx # Date picker [TO CREATE]
│   │   │   └── index.js           # Barrel exports [TO CREATE]
│   │   │
│   │   ├── AdminLogin.jsx         # Admin login page [EXISTING - USER CREATED]
│   │   ├── StudentLogin.jsx       # Student login page [EXISTING - USER CREATED]
│   │   ├── StudentRegister.jsx    # Student register page [EXISTING - USER CREATED]
│   │   ├── LandingPage.jsx        # Landing page [EXISTING - USER CREATED]
│   │   ├── RateLimitedUI.jsx      # Rate limit component [EXISTING - USER CREATED]
│   │   ├── ProtectedRoute.jsx     # Route guard [CREATED - PHASE 1]
│   │   └── index.js               # Component exports [CREATED - PHASE 1]
│   │
│   ├── features/                  # Feature-based modules (Domain-Driven Design)
│   │   ├── admin/                 # Admin feature ✅ DOMAIN-ORGANIZED
│   │   │   ├── attendance/        # Attendance management domain
│   │   │   │   ├── AttendanceOverview.jsx
│   │   │   │   ├── AttendanceReport.jsx
│   │   │   │   ├── MarkAttendance.jsx
│   │   │   │   ├── StudentAttendance.jsx
│   │   │   │   └── AttendanceFinalization.jsx
│   │   │   ├── complaints/        # Complaint management domain
│   │   │   │   ├── ComplaintsList.jsx
│   │   │   │   └── ComplaintDetail.jsx
│   │   │   ├── components/        # Shared admin components [EMPTY]
│   │   │   ├── courses/           # Course management domain
│   │   │   │   ├── CourseList.jsx
│   │   │   │   ├── CreateCourse.jsx
│   │   │   │   ├── EditCourse.jsx
│   │   │   │   ├── CourseDetail.jsx
│   │   │   │   └── ModuleManagement.jsx
│   │   │   ├── library/           # Library management domain
│   │   │   │   ├── BooksList.jsx
│   │   │   │   ├── CreateBook.jsx
│   │   │   │   ├── EditBook.jsx
│   │   │   │   ├── BookDetail.jsx
│   │   │   │   └── LibraryTransactions.jsx
│   │   │   ├── notices/           # Notice management domain
│   │   │   │   ├── NoticesList.jsx
│   │   │   │   ├── CreateNotice.jsx
│   │   │   │   └── EditNotice.jsx
│   │   │   ├── pages/             # Centralized exports [EMPTY]
│   │   │   ├── results/           # Results management domain
│   │   │   │   ├── ExamList.jsx
│   │   │   │   ├── CreateExam.jsx
│   │   │   │   ├── ExamSchedule.jsx
│   │   │   │   ├── EnterResults.jsx
│   │   │   │   ├── ResultsList.jsx
│   │   │   │   ├── ResultsReport.jsx
│   │   │   │   └── StudentResult.jsx
│   │   │   ├── sports/            # Sports management domain
│   │   │   │   ├── SportsList.jsx
│   │   │   │   ├── CreateSport.jsx
│   │   │   │   ├── EditSport.jsx
│   │   │   │   └── SportDetail.jsx
│   │   │   ├── students/          # Student management domain
│   │   │   │   ├── StudentList.jsx
│   │   │   │   ├── CreateStudent.jsx
│   │   │   │   ├── EditStudent.jsx
│   │   │   │   ├── StudentDetail.jsx
│   │   │   │   └── BulkImportStudents.jsx
│   │   │   └── teachers/          # Teacher management domain
│   │   │       ├── TeacherList.jsx
│   │   │       ├── CreateTeacher.jsx
│   │   │       ├── EditTeacher.jsx
│   │   │       └── TeacherDetail.jsx
│   │   │
│   │   ├── student/               # Student feature ✅ DOMAIN-ORGANIZED (Phase 2.2)
│   │   │   ├── attendance/        # Attendance domain
│   │   │   │   ├── MyAttendance.jsx         # Monthly attendance view
│   │   │   │   └── AttendanceReport.jsx     # Yearly analytics
│   │   │   ├── components/        # Shared student components [EMPTY]
│   │   │   ├── courses/           # Courses domain
│   │   │   │   ├── MyCourses.jsx            # View enrolled courses
│   │   │   │   ├── CourseEnrollment.jsx     # Browse & enroll
│   │   │   │   └── CourseDetail.jsx         # Course details with tabs
│   │   │   ├── library/           # Library domain [PHASE 2.2 - PENDING]
│   │   │   │   ├── BookCatalog.jsx          # [TO CREATE]
│   │   │   │   ├── MyBooks.jsx              # [TO CREATE]
│   │   │   │   └── BookRequest.jsx          # [TO CREATE]
│   │   │   ├── pages/             # Centralized barrel exports
│   │   │   │   └── index.js       # Re-exports all student pages
│   │   │   ├── profile/           # Profile domain [PHASE 2.2 - PENDING]
│   │   │   │   ├── EditProfile.jsx          # [TO CREATE]
│   │   │   │   ├── ChangePassword.jsx       # [TO CREATE]
│   │   │   │   └── NotificationSettings.jsx # [TO CREATE]
│   │   │   ├── results/           # Results domain
│   │   │   │   ├── MyResults.jsx            # All exams with filtering
│   │   │   │   ├── ResultsAnalysis.jsx      # Performance analytics
│   │   │   │   └── ExamResultDetail.jsx     # Single exam detail
│   │   │   └── sports/            # Sports domain
│   │   │       ├── MySports.jsx             # Joined sports
│   │   │       ├── JoinSport.jsx            # Browse & join
│   │   │       └── SportDetail.jsx          # Sport details with tabs
│   │   │
│   │   ├── teacher/               # Teacher feature [FUTURE - PHASE 2.3]
│   │   │   ├── classes/           # Class management domain [TO CREATE]
│   │   │   ├── attendance/        # Attendance marking domain [TO CREATE]
│   │   │   ├── results/           # Results entry domain [TO CREATE]
│   │   │   ├── components/        # Shared teacher components [TO CREATE]
│   │   │   └── pages/             # Centralized exports [TO CREATE]
│   │   │
│   │   ├── coach/                 # Coach feature [FUTURE - PHASE 2.4]
│   │   │   ├── sports/            # Sports management domain [TO CREATE]
│   │   │   ├── participants/      # Participant management domain [TO CREATE]
│   │   │   ├── events/            # Event management domain [TO CREATE]
│   │   │   ├── components/        # Shared coach components [TO CREATE]
│   │   │   └── pages/             # Centralized exports [TO CREATE]
│   │   │
│   │   ├── librarian/             # Librarian feature [FUTURE - PHASE 2.5]
│   │   │   ├── books/             # Book management domain [TO CREATE]
│   │   │   ├── transactions/      # Transaction management domain [TO CREATE]
│   │   │   ├── components/        # Shared librarian components [TO CREATE]
│   │   │   └── pages/             # Centralized exports [TO CREATE]
│   │   │
│   │   └── auth/                  # Authentication feature [PHASE 1 ✅]
│   │       ├── components/        # Auth-specific components
│   │       │   ├── AdminLogin.jsx
│   │       │   ├── StudentLogin.jsx
│   │       │   ├── StudentRegister.jsx
│   │       │   └── LandingPage.jsx
│   │       └── pages/             # Auth pages (if needed for routing)
│   │
│   ├── context/                   # React Context providers
│   │   ├── AuthContext.jsx        # Authentication state [CREATED - PHASE 1]
│   │   ├── ThemeContext.jsx       # Theme management [CREATED - PHASE 1]
│   │   └── NotificationContext.jsx # Notifications [CREATED - PHASE 1]
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.js             # Auth hook [CREATED - PHASE 1]
│   │   ├── useApi.js              # API call hook [CREATED - PHASE 1]
│   │   ├── useDebounce.js         # Debounce hook [CREATED - PHASE 1]
│   │   ├── useLocalStorage.js     # LocalStorage hook [CREATED - PHASE 1]
│   │   └── usePermissions.js      # Permissions hook [CREATED - PHASE 1]
│   │
│   ├── services/                  # API service layer
│   │   ├── api.js                 # Axios instance [CREATED - PHASE 1]
│   │   ├── authService.js         # Auth API [CREATED - PHASE 1]
│   │   ├── adminService.js        # Admin API [CREATED - PHASE 1]
│   │   ├── studentService.js      # Student API [CREATED - PHASE 1]
│   │   ├── teacherService.js      # Teacher API [TO CREATE]
│   │   ├── coachService.js        # Coach API [TO CREATE]
│   │   ├── librarianService.js    # Librarian API [TO CREATE]
│   │   └── commonService.js       # Shared API [TO CREATE]
│   │
│   ├── utils/                     # Utility functions
│   │   ├── validators.js          # Validation functions [CREATED - PHASE 1]
│   │   ├── formatters.js          # Formatting functions [CREATED - PHASE 1]
│   │   ├── dateHelpers.js         # Date utilities [CREATED - PHASE 1]
│   │   ├── axiosInstance.js       # Axios config [EXISTING - USER CREATED]
│   │   └── helpers.js             # General helpers [TO CREATE]
│   │
│   ├── constants/                 # Constants and config
│   │   ├── roles.js               # User roles [CREATED - PHASE 1]
│   │   ├── routes.js              # App routes [CREATED - PHASE 1]
│   │   ├── apiEndpoints.js        # API endpoints [CREATED - PHASE 1]
│   │   ├── permissions.js         # Permission mappings [TO CREATE]
│   │   └── config.js              # App configuration [TO CREATE]
│   │
│   ├── pages/                     # Page components
│   │   ├── AdminDashboard.jsx     # Admin dashboard [EXISTING - USER CREATED]
│   │   ├── StudentDashboard.jsx   # Student dashboard [EXISTING - USER CREATED]
│   │   ├── TeacherDashboard.jsx   # Teacher dashboard [TO CREATE]
│   │   ├── CoachDashboard.jsx     # Coach dashboard [TO CREATE]
│   │   ├── LibrarianDashboard.jsx # Librarian dashboard [TO CREATE]
│   │   ├── NotFound.jsx           # 404 page [TO CREATE]
│   │   └── Unauthorized.jsx       # 401 page [TO CREATE]
│   │
│   ├── App.jsx                    # Main app component [UPDATED - PHASE 1]
│   ├── main.jsx                   # App entry point [EXISTING]
│   └── index.css                  # Global styles [EXISTING]
│
├── .env                           # Environment variables [EXISTING]
├── .env.example                   # Env template [TO CREATE]
├── .gitignore                     # Git ignore [EXISTING]
├── eslint.config.js               # ESLint config [EXISTING]
├── index.html                     # HTML template [EXISTING]
├── package.json                   # Dependencies [EXISTING]
├── postcss.config.js              # PostCSS config [EXISTING]
├── tailwind.config.js             # Tailwind config [UPDATED - PHASE 1]
├── vite.config.js                 # Vite config [EXISTING]
├── README.md                      # Project README [EXISTING]
├── PHASE1_COMPLETE.md             # Phase 1 guide [CREATED]
├── IMPLEMENTATION_SUMMARY.md      # Implementation docs [CREATED]
├── COMPONENT_GUIDE.md             # Component usage guide [CREATED]
└── FOLDER_STRUCTURE.md            # This file [CREATING]
```

---

## 🎯 Domain-Driven Feature Structure

### **Design Philosophy**

This project uses **Domain-Driven Design (DDD)** for the features directory, organizing code by **business domains** rather than technical layers. Each user role follows the same pattern for consistency.

### **Admin/Principal** ✅ COMPLETE (Phase 2.1)

- **Routes**: `/admin/*`
- **Structure**: Domain-organized by functional area
- **Services**: `adminService.js`
- **Domains**:
  - **students/** - Student management (CRUD, bulk import, detail view)
  - **teachers/** - Teacher management (CRUD, assignment, detail view)
  - **courses/** - Course management (CRUD, modules, detail view)
  - **sports/** - Sports management (CRUD, coaches, detail view)
  - **library/** - Library management (books CRUD, transactions)
  - **attendance/** - Attendance tracking (overview, marking, reports, finalization)
  - **results/** - Exam & results management (create exams, enter results, analytics)
  - **notices/** - Notice board (CRUD)
  - **complaints/** - Complaint handling (view, respond, resolve)
- **Total Pages**: 35+ pages across 9 domains

### **Student** ✅ 11/14 COMPLETE (Phase 2.2 - In Progress)

- **Routes**: `/student/*`
- **Structure**: Domain-organized by functional area
- **Services**: `studentService.js`
- **Domains**:
  - **courses/** ✅ (3/3 pages)
    - MyCourses.jsx - View enrolled courses with stats
    - CourseEnrollment.jsx - Browse & enroll in available courses
    - CourseDetail.jsx - Detailed course view with modules/materials tabs
  - **attendance/** ✅ (2/2 pages)
    - MyAttendance.jsx - Monthly attendance view with filtering
    - AttendanceReport.jsx - Yearly analytics with insights
  - **results/** ✅ (3/3 pages)
    - MyResults.jsx - All exam results with year/type filtering
    - ResultsAnalysis.jsx - Performance analytics by course/exam type
    - ExamResultDetail.jsx - Detailed single exam result view
  - **sports/** ✅ (3/3 pages)
    - MySports.jsx - View joined sports activities
    - JoinSport.jsx - Browse and join available sports
    - SportDetail.jsx - Sport details with schedule/participants tabs
  - **library/** ⏳ (0/3 pages - PENDING)
    - BookCatalog.jsx - Browse and search books
    - MyBooks.jsx - View issued books with due dates
    - BookRequest.jsx - Request new books
  - **profile/** ⏳ (0/3 pages - PENDING)
    - EditProfile.jsx - Edit personal information
    - ChangePassword.jsx - Change password/security
    - NotificationSettings.jsx - Notification preferences
- **Exports**: Centralized in `pages/index.js` for easy imports
- **Total**: 14 pages across 6 domains

### **Teacher** (Phase 2.3 - Future)

- **Routes**: `/teacher/*`
- **Structure**: Domain-organized (TBD)
- **Services**: `teacherService.js`
- **Planned Domains**:
  - **classes/** - Class management & student lists
  - **attendance/** - Mark attendance for classes
  - **results/** - Enter exam results
  - **progress/** - Track student progress
- **Status**: Not yet started

### **Coach** (Phase 2.4 - Future)

- **Routes**: `/coach/*`
- **Structure**: Domain-organized (TBD)
- **Services**: `coachService.js`
- **Planned Domains**:
  - **sports/** - Manage sports activities
  - **participants/** - Manage participants
  - **events/** - Schedule and manage events
  - **performance/** - Track athlete performance
- **Status**: Not yet started

### **Librarian** (Phase 2.5 - Future)

- **Routes**: `/librarian/*`
- **Structure**: Domain-organized (TBD)
- **Services**: `librarianService.js`
- **Planned Domains**:
  - **books/** - Book management (CRUD, categories, stock)
  - **transactions/** - Issue/return books
  - **overdues/** - Manage overdue books and fines
  - **reports/** - Library analytics and reports
- **Status**: Not yet started

---

## 📊 File Status Legend

- ✅ **[CREATED - PHASE 1]**: Completed in Phase 1
- 📝 **[EXISTING - USER CREATED]**: User's original files
- 🔧 **[UPDATED - PHASE 1]**: Modified in Phase 1
- ⏳ **[TO CREATE]**: Pending implementation

---

## 🔄 Integration Points

### **1. Authentication Flow**

```
Login Component → authService → AuthContext → Protected Routes → Dashboard
```

### **2. API Flow**

```
Component → Service Layer → api.js (Axios) → Backend → Response → Component Update
```

### **3. State Management**

```
AuthContext (User, Role, Token)
ThemeContext (Light/Dark)
NotificationContext (Toast Messages)
```

### **4. Route Protection**

```
ProtectedRoute → Check Auth → Check Role → Allow/Deny → Redirect
```

---

## 📦 Architectural Patterns

### **1. Domain-Driven Design (DDD)**

Organize code by business domains (courses, attendance, sports) rather than technical layers (components, pages). This makes the codebase more intuitive and scalable.

**Example**:

```
student/
  courses/               # Everything related to courses
    MyCourses.jsx
    CourseEnrollment.jsx
    CourseDetail.jsx
  attendance/            # Everything related to attendance
    MyAttendance.jsx
    AttendanceReport.jsx
```

### **2. Feature-Sliced Design**

Each user role (admin, student, teacher) is a self-contained feature with its own domains and components.

### **3. Barrel Exports Pattern**

Centralized exports via `pages/index.js` for cleaner imports:

```javascript
// Instead of:
import MyCourses from "../courses/MyCourses";
import MyAttendance from "../attendance/MyAttendance";

// Use:
import { MyCourses, MyAttendance } from "./features/student/pages";
```

### **4. Service Layer Pattern**

API logic is separated from UI components for better testability and reusability:

```
Component → Service Layer → API Client → Backend
```

### **5. Custom Hooks Pattern**

Encapsulate reusable logic in custom hooks:

```javascript
useAuth() - Authentication state and methods
useApi() - API calls with loading/error states
usePermissions() - Role-based access control
```

### **6. Context + Hooks Pattern**

Global state management without Redux complexity:

```
AuthContext + useAuth hook
ThemeContext + useTheme hook
NotificationContext + useNotification hook
```

---

## 🎨 Why This Structure is Better

### **Scalability** ✅

- Adding new features is as simple as creating a new domain folder
- Each domain can grow independently
- Easy to split into micro-frontends if needed

### **Maintainability** ✅

- Related code lives together (courses pages in courses folder)
- Changes are isolated to specific domains
- Easy to find and update code

### **Developer Experience** ✅

- Intuitive folder names match business terminology
- New developers can navigate easily
- Clear ownership boundaries for teams

### **Code Organization** ✅

- No giant folders with 50+ files
- Logical grouping by business function
- Consistent pattern across all roles

### **Testing** ✅

- Test files can live near source code
- Domain-specific test utilities
- Easier to achieve high coverage

### **Performance** ✅

- Easy to implement code-splitting by domain
- Lazy load specific features
- Optimized bundle sizes

---

## 📊 Domain Organization Rules

### **When to Create a New Domain Folder**

✅ **DO create a domain folder when**:

- The feature has 2+ related pages
- The feature has distinct business logic
- The feature may grow in the future
- The feature can be described with a noun (courses, attendance, sports)

❌ **DON'T create a domain folder when**:

- Single standalone page (put in pages/)
- Shared across multiple domains (put in components/)
- Pure utility/helper code (put in utils/)

### **Folder Naming**

- Use **lowercase plural** for domain folders: `courses/`, `results/`, `sports/`
- Use **PascalCase** for component files: `MyCourses.jsx`, `CourseDetail.jsx`
- Be **descriptive and clear**: `attendance/` not `att/`

---

## 📝 File Naming Conventions

### **Components**

- **PascalCase**: `StudentList.jsx`, `CourseDetail.jsx`
- **Descriptive**: Name indicates purpose
- **No abbreviations**: `CreateStudent.jsx` not `CreateStud.jsx`

### **Services**

- **camelCase**: `studentService.js`, `authService.js`
- **Suffix**: Always end with `Service.js`

### **Utils**

- **camelCase**: `validators.js`, `formatters.js`, `dateHelpers.js`
- **Descriptive**: Name indicates category of utilities

### **Constants**

- **camelCase**: `roles.js`, `routes.js`, `apiEndpoints.js`
- **Descriptive**: Name indicates what constants it contains

### **Hooks**

- **camelCase with 'use' prefix**: `useAuth.js`, `useApi.js`
- **Descriptive**: Name indicates what the hook does

---

## 🛠️ Technology Stack

### **Frontend**

- React 19.1.0
- Vite 7.0.0
- React Router DOM 7.6.3
- Tailwind CSS 3.4.17

### **State Management**

- Context API (Auth, Theme, Notifications)
- Custom Hooks (useAuth, useApi, usePermissions)

### **UI/UX**

- Lucide React (Icons)
- Framer Motion (Animations)
- React Hook Form (Forms)

### **API Layer**

- Axios 1.10.0
- Custom interceptors
- Token management

---

## 📋 Next Steps (Phase 2)

1. **Create Teacher Feature** (`features/teacher/`)

   - Components: ClassManagement, AttendanceMarking, ResultsEntry
   - Pages: Dashboard, Classes, Attendance, Results
   - Service: teacherService.js

2. **Create Coach Feature** (`features/coach/`)

   - Components: SportsManagement, ParticipantManagement, EventScheduling
   - Pages: Dashboard, Sports, Participants
   - Service: coachService.js

3. **Create Librarian Feature** (`features/librarian/`)

   - Components: BookManagement, TransactionManagement, IssueReturn
   - Pages: Dashboard, Books, Transactions
   - Service: librarianService.js

4. **Create Form Components** (`components/forms/`)

   - FormInput, FormSelect, FormTextarea, FormDatePicker
   - Integration with react-hook-form

5. **Create Error Pages** (`pages/`)

   - NotFound (404)
   - Unauthorized (401)
   - ServerError (500)

6. **Update Authentication**

   - Add Coach login/register
   - Add Librarian login/register
   - Update authService with all roles

7. **Update Sidebar Navigation**
   - Add Teacher menu items
   - Add Coach menu items
   - Add Librarian menu items

---

## 🎨 Design Patterns Used

### **1. Feature-Based Architecture**

Organize by business domain, not by file type

### **2. Service Layer Pattern**

Separate API logic from UI components

### **3. Custom Hooks Pattern**

Encapsulate reusable logic

### **4. Context + Hooks Pattern**

Global state management without Redux

### **5. Component Composition**

Build complex UIs from simple components

### **6. Protected Routes Pattern**

Role-based access control

---

## 📝 Naming Conventions

### **Files**

- Components: `PascalCase.jsx`
- Services: `camelCase.js`
- Utils: `camelCase.js`
- Constants: `camelCase.js`

### **Folders**

- Features: `lowercase`
- Components: `lowercase`

### **Variables**

- Constants: `UPPER_CASE`
- Functions: `camelCase`
- Components: `PascalCase`

---

**Last Updated**: November 25, 2025
**Current Phase**: Phase 2.2 (Student Features) - 11/14 pages complete
**Architecture**: Domain-Driven Design (DDD) + Feature-Sliced Design
**Pattern Consistency**: ✅ All features follow same domain organization

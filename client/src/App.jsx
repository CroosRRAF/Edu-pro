import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import PWAInstallPrompt from "./components/pwa/PWAInstallPrompt";
import PWAUpdatePrompt from "./components/pwa/PWAUpdatePrompt";
import { ROLES } from "./constants/roles";
import { ROUTES } from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import("./components/LandingPage"));
const AdminLogin = React.lazy(() => import("./components/AdminLogin"));
const AdminRegister = React.lazy(() => import("./components/AdminRegister"));
const StudentLogin = React.lazy(() => import("./components/StudentLogin"));
const StudentRegister = React.lazy(() =>
  import("./components/StudentRegister")
);
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const StudentDashboard = React.lazy(() => import("./pages/StudentDashboard"));

// Admin School Management Pages
const SchoolProfileSetup = React.lazy(() =>
  import("./features/admin/school/SchoolProfileSetup")
);
const SchoolProfile = React.lazy(() =>
  import("./features/admin/school/SchoolProfile")
);
const PrincipalProfile = React.lazy(() =>
  import("./features/admin/school/PrincipalProfile")
);

// Admin Grade Management Pages
const GradeList = React.lazy(() => import("./features/admin/grades/GradeList"));
const CreateGrade = React.lazy(() =>
  import("./features/admin/grades/CreateGrade")
);
const GradeDetail = React.lazy(() =>
  import("./features/admin/grades/GradeDetail")
);
const ClassroomManagement = React.lazy(() =>
  import("./features/admin/grades/ClassroomManagement")
);

// Admin Exam Management Pages
const CreateExam = React.lazy(() =>
  import("./features/admin/exams/CreateExam")
);
const ExamSchedule = React.lazy(() =>
  import("./features/admin/exams/ExamSchedule")
);
const ExamList = React.lazy(() => import("./features/admin/exams/ExamList"));

// Admin Student Management Pages
const StudentList = React.lazy(() =>
  import("./features/admin/students/StudentList")
);
const CreateStudent = React.lazy(() =>
  import("./features/admin/students/CreateStudent")
);
const EditStudent = React.lazy(() =>
  import("./features/admin/students/EditStudent")
);
const StudentDetail = React.lazy(() =>
  import("./features/admin/students/StudentDetail")
);
const BulkImportStudents = React.lazy(() =>
  import("./features/admin/students/BulkImportStudents")
);

// Admin Teacher Management Pages
const TeacherList = React.lazy(() =>
  import("./features/admin/teachers/TeacherList")
);
const CreateTeacher = React.lazy(() =>
  import("./features/admin/teachers/CreateTeacher")
);
const EditTeacher = React.lazy(() =>
  import("./features/admin/teachers/EditTeacher")
);
const TeacherDetail = React.lazy(() =>
  import("./features/admin/teachers/TeacherDetail")
);

// Admin Course Management Pages
const CourseList = React.lazy(() =>
  import("./features/admin/courses/CourseList")
);
const CreateCourse = React.lazy(() =>
  import("./features/admin/courses/CreateCourse")
);
const EditCourse = React.lazy(() =>
  import("./features/admin/courses/EditCourse")
);
const CourseDetail = React.lazy(() =>
  import("./features/admin/courses/CourseDetail")
);
const ModuleManagement = React.lazy(() =>
  import("./features/admin/courses/ModuleManagement")
);

// Admin Sports Management Pages
const SportsList = React.lazy(() =>
  import("./features/admin/sports/SportsList")
);
const CreateSport = React.lazy(() =>
  import("./features/admin/sports/CreateSport")
);
const EditSport = React.lazy(() => import("./features/admin/sports/EditSport"));
const SportDetail = React.lazy(() =>
  import("./features/admin/sports/SportDetail")
);

// Admin Library Management Pages
const BooksList = React.lazy(() =>
  import("./features/admin/library/BooksList")
);
const CreateBook = React.lazy(() =>
  import("./features/admin/library/CreateBook")
);
const EditBook = React.lazy(() => import("./features/admin/library/EditBook"));
const BookDetail = React.lazy(() =>
  import("./features/admin/library/BookDetail")
);
const LibraryTransactions = React.lazy(() =>
  import("./features/admin/library/LibraryTransactions")
);

// Admin Attendance Management Pages
const AttendanceOverview = React.lazy(() =>
  import("./features/admin/attendance/AttendanceOverview")
);
const MarkAttendance = React.lazy(() =>
  import("./features/admin/attendance/MarkAttendance")
);
const AttendanceReport = React.lazy(() =>
  import("./features/admin/attendance/AttendanceReport")
);
const StudentAttendance = React.lazy(() =>
  import("./features/admin/attendance/StudentAttendance")
);
const AttendanceFinalization = React.lazy(() =>
  import("./features/admin/attendance/AttendanceFinalization")
);

// Admin Results Management Pages
const ResultsList = React.lazy(() =>
  import("./features/admin/results/ResultsList")
);
const EnterResults = React.lazy(() =>
  import("./features/admin/results/EnterResults")
);
const ResultsReport = React.lazy(() =>
  import("./features/admin/results/ResultsReport")
);
const StudentResult = React.lazy(() =>
  import("./features/admin/results/StudentResult")
);

// Admin Notices Management Pages
const NoticesList = React.lazy(() =>
  import("./features/admin/notices/NoticesList")
);
const CreateNotice = React.lazy(() =>
  import("./features/admin/notices/CreateNotice")
);
const EditNotice = React.lazy(() =>
  import("./features/admin/notices/EditNotice")
);

// Admin Complaints Management Pages
const ComplaintsList = React.lazy(() =>
  import("./features/admin/complaints/ComplaintsList")
);
const ComplaintDetail = React.lazy(() =>
  import("./features/admin/complaints/ComplaintDetail")
);

// Student Feature Pages
const MyCourses = React.lazy(() =>
  import("./features/student/courses/MyCourses")
);
const CourseEnrollment = React.lazy(() =>
  import("./features/student/courses/CourseEnrollment")
);
const StudentCourseDetail = React.lazy(() =>
  import("./features/student/courses/CourseDetail")
);
const MyAttendance = React.lazy(() =>
  import("./features/student/attendance/MyAttendance")
);
const StudentAttendanceReport = React.lazy(() =>
  import("./features/student/attendance/AttendanceReport")
);
const MyResults = React.lazy(() =>
  import("./features/student/results/MyResults")
);
const ResultsAnalysis = React.lazy(() =>
  import("./features/student/results/ResultsAnalysis")
);
const ExamResultDetail = React.lazy(() =>
  import("./features/student/results/ExamResultDetail")
);
const MySports = React.lazy(() => import("./features/student/sports/MySports"));
const JoinSport = React.lazy(() =>
  import("./features/student/sports/JoinSport")
);
const StudentSportDetail = React.lazy(() =>
  import("./features/student/sports/SportDetail")
);
const BookCatalog = React.lazy(() =>
  import("./features/student/library/BookCatalog")
);
const MyBooks = React.lazy(() => import("./features/student/library/MyBooks"));
const BookRequest = React.lazy(() =>
  import("./features/student/library/BookRequest")
);
const EditProfile = React.lazy(() =>
  import("./features/student/profile/EditProfile")
);
const ChangePassword = React.lazy(() =>
  import("./features/student/profile/ChangePassword")
);
const NotificationSettings = React.lazy(() =>
  import("./features/student/profile/NotificationSettings")
);

// Teacher Feature Pages
const TeacherDashboard = React.lazy(() => import("./pages/TeacherDashboard"));
const MyClasses = React.lazy(() =>
  import("./features/teacher/classes/MyClasses")
);
const ClassDetail = React.lazy(() =>
  import("./features/teacher/classes/ClassDetail")
);
const ClassStatistics = React.lazy(() =>
  import("./features/teacher/classes/ClassStatistics")
);
const TeacherMarkAttendance = React.lazy(() =>
  import("./features/teacher/attendance/MarkAttendance")
);
const TeacherAttendanceReport = React.lazy(() =>
  import("./features/teacher/attendance/AttendanceReport")
);
const StudentAttendanceHistory = React.lazy(() =>
  import("./features/teacher/attendance/StudentAttendanceHistory")
);
const TeacherEnterResults = React.lazy(() =>
  import("./features/teacher/results/EnterResults")
);
const ResultsSummary = React.lazy(() =>
  import("./features/teacher/results/ResultsSummary")
);
const ClassPerformance = React.lazy(() =>
  import("./features/teacher/progress/ClassPerformance")
);
const StudentProgress = React.lazy(() =>
  import("./features/teacher/progress/StudentProgress")
);

// Coach Feature Pages
const CoachDashboard = React.lazy(() => import("./pages/CoachDashboard"));
const CoachMySports = React.lazy(() =>
  import("./features/coach/sports/MySports")
);
const CoachSportDetail = React.lazy(() =>
  import("./features/coach/sports/SportDetail")
);
const SportStatistics = React.lazy(() =>
  import("./features/coach/sports/SportStatistics")
);
const ParticipantsList = React.lazy(() =>
  import("./features/coach/participants/ParticipantsList")
);
const AddParticipant = React.lazy(() =>
  import("./features/coach/participants/AddParticipant")
);
const ParticipantPerformance = React.lazy(() =>
  import("./features/coach/participants/ParticipantPerformance")
);
const EventsList = React.lazy(() =>
  import("./features/coach/events/EventsList")
);
const CreateEvent = React.lazy(() =>
  import("./features/coach/events/CreateEvent")
);
const EventResults = React.lazy(() =>
  import("./features/coach/events/EventResults")
);
const PerformanceTracking = React.lazy(() =>
  import("./features/coach/performance/PerformanceTracking")
);

// Librarian Feature Pages
const LibrarianDashboard = React.lazy(() =>
  import("./pages/LibrarianDashboard")
);
const LibrarianBookCatalog = React.lazy(() =>
  import("./features/librarian/books/BookCatalog")
);

// Error Pages
const NotFound = React.lazy(() => import("./pages/errors/NotFound"));
const Unauthorized = React.lazy(() => import("./pages/errors/Unauthorized"));
const ServerError = React.lazy(() => import("./pages/errors/ServerError"));
const Offline = React.lazy(() => import("./pages/errors/Offline"));
const AddEditBook = React.lazy(() =>
  import("./features/librarian/books/AddEditBook")
);
const IssueReturnBooks = React.lazy(() =>
  import("./features/librarian/transactions/IssueReturnBooks")
);
const TransactionHistory = React.lazy(() =>
  import("./features/librarian/transactions/TransactionHistory")
);
const LibraryMembers = React.lazy(() =>
  import("./features/librarian/members/LibraryMembers")
);
const LibraryAnalytics = React.lazy(() =>
  import("./features/librarian/analytics/LibraryAnalytics")
);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <NotificationProvider>
                <ToastContainer />
                <React.Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                  }
                >
                  <Routes>
                    {/* Public Routes */}
                    <Route path={ROUTES.HOME} element={<LandingPage />} />
                    <Route path={ROUTES.LOGIN} element={<StudentLogin />} />
                    <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
                    <Route
                      path={ROUTES.ADMIN_REGISTER}
                      element={<AdminRegister />}
                    />
                    <Route
                      path={ROUTES.REGISTER}
                      element={<StudentRegister />}
                    />

                    {/* Admin Routes */}
                    <Route
                      path={ROUTES.ADMIN_DASHBOARD}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin School Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_SCHOOL_SETUP}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <SchoolProfileSetup />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_SCHOOL_PROFILE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <SchoolProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_PRINCIPAL_PROFILE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <PrincipalProfile />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Grade Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_GRADES}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <GradeList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_GRADES_CREATE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateGrade />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_GRADES_VIEW}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <GradeDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_CLASSROOMS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ClassroomManagement />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Exam Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_EXAMS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ExamList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_EXAMS_CREATE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateExam />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_EXAMS_SCHEDULE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ExamSchedule />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Student Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.STUDENTS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <StudentList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.STUDENTS}/create`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateStudent />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.STUDENTS}/import`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <BulkImportStudents />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.STUDENTS}/edit/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EditStudent />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.STUDENTS}/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <StudentDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Teacher Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.TEACHERS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <TeacherList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.TEACHERS}/create`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateTeacher />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.TEACHERS}/edit/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EditTeacher />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.TEACHERS}/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <TeacherDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Course Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.COURSES}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CourseList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.COURSES}/create`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateCourse />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.COURSES}/edit/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EditCourse />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.COURSES}/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CourseDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_COURSES_MODULES}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          \n <ModuleManagement />
                          \n{" "}
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Sports Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.SPORTS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <SportsList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.SPORTS}/create`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateSport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.SPORTS}/edit/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EditSport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.SPORTS}/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <SportDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Library Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.LIBRARY}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <BooksList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.LIBRARY}/create`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateBook />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.LIBRARY}/edit/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EditBook />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.LIBRARY}/transactions`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <LibraryTransactions />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.LIBRARY}/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <BookDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Attendance Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.ATTENDANCE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <AttendanceOverview />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.ATTENDANCE}/mark`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <MarkAttendance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.ATTENDANCE}/report`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <AttendanceReport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.ATTENDANCE}/student/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <StudentAttendance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.ADMIN_ATTENDANCE_FINALIZE}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          \n <AttendanceFinalization />
                          \n{" "}
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Results Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.RESULTS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ResultsList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.RESULTS}/enter`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EnterResults />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.RESULTS}/report`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ResultsReport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.RESULTS}/student/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <StudentResult />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Notices Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.NOTICES}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <NoticesList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.NOTICES}/create`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <CreateNotice />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.NOTICES}/edit/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <EditNotice />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Complaints Management Routes */}
                    <Route
                      path={ROUTES.ADMIN_ROUTES.COMPLAINTS}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ComplaintsList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.ADMIN_ROUTES.COMPLAINTS}/:id`}
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            ROLES.ADMIN,
                            ROLES.PRINCIPAL,
                            ROLES.SUPER_ADMIN,
                          ]}
                        >
                          <ComplaintDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Routes */}
                    <Route
                      path={ROUTES.STUDENT_DASHBOARD}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <StudentDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Courses */}
                    <Route
                      path={ROUTES.STUDENT_COURSES}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <MyCourses />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_COURSES}/enroll`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <CourseEnrollment />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_COURSES}/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <StudentCourseDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Attendance */}
                    <Route
                      path={ROUTES.STUDENT_ATTENDANCE}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <MyAttendance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_ATTENDANCE}/report`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <StudentAttendanceReport />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Results */}
                    <Route
                      path={ROUTES.STUDENT_RESULTS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <MyResults />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_RESULTS}/analysis`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <ResultsAnalysis />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_RESULTS}/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <ExamResultDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Sports */}
                    <Route
                      path={ROUTES.STUDENT_SPORTS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <MySports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_SPORTS}/join`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <JoinSport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_SPORTS}/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <StudentSportDetail />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Library */}
                    <Route
                      path={ROUTES.STUDENT_LIBRARY}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <BookCatalog />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_LIBRARY}/my-books`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <MyBooks />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_LIBRARY}/request`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <BookRequest />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Profile */}
                    <Route
                      path={ROUTES.STUDENT_PROFILE}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <EditProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_PROFILE}/password`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <ChangePassword />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.STUDENT_PROFILE}/notifications`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                          <NotificationSettings />
                        </ProtectedRoute>
                      }
                    />

                    {/* Teacher Routes */}
                    <Route
                      path={ROUTES.TEACHER_DASHBOARD}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <TeacherDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Teacher Classes */}
                    <Route
                      path={ROUTES.TEACHER_CLASSES}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <MyClasses />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.TEACHER_CLASSES}/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <ClassDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.TEACHER_CLASSES}/:id/statistics`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <ClassStatistics />
                        </ProtectedRoute>
                      }
                    />

                    {/* Teacher Attendance */}
                    <Route
                      path={ROUTES.TEACHER_ATTENDANCE}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <TeacherMarkAttendance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.TEACHER_ATTENDANCE}/report`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <TeacherAttendanceReport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.TEACHER_ATTENDANCE}/student/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <StudentAttendanceHistory />
                        </ProtectedRoute>
                      }
                    />

                    {/* Teacher Results */}
                    <Route
                      path={ROUTES.TEACHER_RESULTS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <TeacherEnterResults />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.TEACHER_RESULTS}/summary`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <ResultsSummary />
                        </ProtectedRoute>
                      }
                    />

                    {/* Teacher Progress */}
                    <Route
                      path={`${ROUTES.TEACHER_CLASSES}/performance`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <ClassPerformance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.TEACHER_CLASSES}/student/:id/progress`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                          <StudentProgress />
                        </ProtectedRoute>
                      }
                    />

                    {/* Coach Routes */}
                    <Route
                      path={ROUTES.COACH_DASHBOARD}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <CoachDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Coach Sports */}
                    <Route
                      path={ROUTES.COACH_SPORTS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <CoachMySports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.COACH_SPORTS}/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <CoachSportDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.COACH_SPORTS}/:id/statistics`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <SportStatistics />
                        </ProtectedRoute>
                      }
                    />

                    {/* Coach Participants */}
                    <Route
                      path={ROUTES.COACH_PARTICIPANTS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <ParticipantsList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.COACH_PARTICIPANTS}/add`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <AddParticipant />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.COACH_PARTICIPANTS}/:id`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <ParticipantPerformance />
                        </ProtectedRoute>
                      }
                    />

                    {/* Coach Events */}
                    <Route
                      path={ROUTES.COACH_EVENTS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <EventsList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.COACH_EVENTS}/create`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <CreateEvent />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.COACH_EVENTS}/:id/results`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <EventResults />
                        </ProtectedRoute>
                      }
                    />

                    {/* Coach Performance */}
                    <Route
                      path={ROUTES.COACH_PERFORMANCE}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
                          <PerformanceTracking />
                        </ProtectedRoute>
                      }
                    />

                    {/* Librarian Routes */}
                    <Route
                      path={ROUTES.LIBRARIAN_DASHBOARD}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <LibrarianDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Librarian Books */}
                    <Route
                      path={ROUTES.LIBRARIAN_BOOKS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <LibrarianBookCatalog />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.LIBRARIAN_BOOKS}/add`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <AddEditBook />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={`${ROUTES.LIBRARIAN_BOOKS}/edit/:bookId`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <AddEditBook />
                        </ProtectedRoute>
                      }
                    />

                    {/* Librarian Transactions */}
                    <Route
                      path={ROUTES.LIBRARIAN_ISSUE}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <IssueReturnBooks />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.LIBRARIAN_TRANSACTIONS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <TransactionHistory />
                        </ProtectedRoute>
                      }
                    />

                    {/* Librarian Members */}
                    <Route
                      path={`${ROUTES.LIBRARIAN_DASHBOARD}/members`}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <LibraryMembers />
                        </ProtectedRoute>
                      }
                    />

                    {/* Librarian Analytics */}
                    <Route
                      path={ROUTES.LIBRARIAN_STATS}
                      element={
                        <ProtectedRoute allowedRoles={[ROLES.LIBRARIAN]}>
                          <LibraryAnalytics />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback Route - 404 */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="/401" element={<Unauthorized />} />
                    <Route path="/500" element={<ServerError />} />
                    <Route path="/offline" element={<Offline />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </React.Suspense>
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>

      {/* PWA Components */}
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
    </HelmetProvider>
  );
}

export default App;

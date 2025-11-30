/**
 * API endpoints configuration
 * Note: API_VERSION is empty because /api/v1 is already in the baseURL
 */

const API_VERSION = "";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    ADMIN_REGISTER: `${API_VERSION}/auth/admin/register`,
    ADMIN_LOGIN: `${API_VERSION}/auth/admin/login`,
    STUDENT_REGISTER: `${API_VERSION}/auth/student/register`,
    STUDENT_LOGIN: `${API_VERSION}/auth/student/login`,
    TEACHER_REGISTER: `${API_VERSION}/auth/teacher/register`,
    TEACHER_LOGIN: `${API_VERSION}/auth/teacher/login`,
    COACH_REGISTER: `${API_VERSION}/auth/coach/register`,
    COACH_LOGIN: `${API_VERSION}/auth/coach/login`,
    LIBRARIAN_REGISTER: `${API_VERSION}/auth/librarian/register`,
    LIBRARIAN_LOGIN: `${API_VERSION}/auth/librarian/login`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    REFRESH_TOKEN: `${API_VERSION}/auth/refresh`,
    FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
  },

  // Admin endpoints
  ADMIN: {
    DASHBOARD: `${API_VERSION}/admin/dashboard`,
    PROFILE: `${API_VERSION}/admin/profile`,
    SCHOOL_PROFILE: `${API_VERSION}/admin/school/profile`,
    STUDENTS: `${API_VERSION}/admin/students`,
    STUDENT_BY_ID: (id) => `${API_VERSION}/admin/students/${id}`,
    COURSES: `${API_VERSION}/admin/courses`,
    COURSE_BY_ID: (id) => `${API_VERSION}/admin/courses/${id}`,
    SPORTS: `${API_VERSION}/admin/sports`,
    SPORT_BY_ID: (id) => `${API_VERSION}/admin/sports/${id}`,
    BOOKS: `${API_VERSION}/admin/books`,
    BOOK_BY_ID: (id) => `${API_VERSION}/admin/books/${id}`,
    ATTENDANCE: `${API_VERSION}/admin/attendance`,
    ATTENDANCE_BY_ID: (id) => `${API_VERSION}/admin/attendance/${id}`,
    RESULTS: `${API_VERSION}/admin/results`,
    RESULT_BY_ID: (id) => `${API_VERSION}/admin/results/${id}`,
    COACHES: `${API_VERSION}/admin/coaches`,
    COACH_BY_ID: (id) => `${API_VERSION}/admin/coaches/${id}`,
    TEACHERS: `${API_VERSION}/admin/teachers`,
    TEACHER_BY_ID: (id) => `${API_VERSION}/admin/teachers/${id}`,
  },

  // Student endpoints
  STUDENT: {
    DASHBOARD: (id) => `${API_VERSION}/students/${id}/dashboard`,
    PROFILE: `${API_VERSION}/students/profile`,
    COURSES: `${API_VERSION}/students/courses`,
    ENROLL_COURSE: `${API_VERSION}/students/courses/enroll`,
    SPORTS: `${API_VERSION}/students/sports`,
    JOIN_SPORT: `${API_VERSION}/students/sports/join`,
    ATTENDANCE: `${API_VERSION}/students/attendance`,
    RESULTS: `${API_VERSION}/students/results`,
  },

  // Teacher endpoints
  TEACHER: {
    DASHBOARD: `${API_VERSION}/teacher/dashboard`,
    PROFILE: `${API_VERSION}/teacher/profile`,
    CLASSES: `${API_VERSION}/teacher/classes`,
    CLASS_DETAILS: `${API_VERSION}/teacher/classes/:id`,
    CLASS_STUDENTS: `${API_VERSION}/teacher/classes/:id/students`,
    MARK_ATTENDANCE: `${API_VERSION}/teacher/classes/:id/attendance`,
    ATTENDANCE: `${API_VERSION}/teacher/classes/:id/attendance`,
    RESULTS: `${API_VERSION}/teacher/results`,
    RESULTS_BY_CLASS: `${API_VERSION}/teacher/classes/:id/results`,
    UPDATE_RESULT: `${API_VERSION}/teacher/results/:id`,
    NOTICES: `${API_VERSION}/teacher/notices`,
    SUBJECTS: `${API_VERSION}/teacher/subjects`,
    STUDENT_PROGRESS: `${API_VERSION}/teacher/classes/:classId/students/:studentId/progress`,
    CLASS_STATS: `${API_VERSION}/teacher/classes/:id/stats`,
  },

  // Coach endpoints
  COACH: {
    DASHBOARD: `${API_VERSION}/coach/dashboard`,
    PROFILE: `${API_VERSION}/coach/profile`,
    SPORTS: `${API_VERSION}/coach/sports`,
    SPORT_DETAILS: `${API_VERSION}/coach/sports/:id`,
    PARTICIPANTS: `${API_VERSION}/coach/sports/:id/participants`,
    ADD_PARTICIPANT: `${API_VERSION}/coach/sports/:id/participants`,
    REMOVE_PARTICIPANT: `${API_VERSION}/coach/sports/:sportId/participants/:studentId`,
    EVENTS: `${API_VERSION}/coach/events`,
    SPORT_EVENTS: `${API_VERSION}/coach/sports/:id/events`,
    UPDATE_EVENT: `${API_VERSION}/coach/events/:id`,
    DELETE_EVENT: `${API_VERSION}/coach/events/:id`,
    PERFORMANCE: `${API_VERSION}/coach/performance`,
    PARTICIPANT_PERFORMANCE: `${API_VERSION}/coach/sports/:sportId/participants/:studentId/performance`,
    SPORT_STATS: `${API_VERSION}/coach/sports/:id/stats`,
    NOTICES: `${API_VERSION}/coach/notices`,
  },

  // Librarian endpoints
  LIBRARIAN: {
    DASHBOARD: `${API_VERSION}/librarian/dashboard`,
    PROFILE: `${API_VERSION}/librarian/profile`,
  },

  // Shared endpoints
  NOTICES: {
    LIST: `${API_VERSION}/notices`,
    BY_ID: (id) => `${API_VERSION}/notices/${id}`,
    CREATE: `${API_VERSION}/notices`,
    UPDATE: (id) => `${API_VERSION}/notices/${id}`,
    DELETE: (id) => `${API_VERSION}/notices/${id}`,
  },

  COMPLAINTS: {
    LIST: `${API_VERSION}/complaints`,
    BY_ID: (id) => `${API_VERSION}/complaints/${id}`,
    CREATE: `${API_VERSION}/complaints`,
    UPDATE: (id) => `${API_VERSION}/complaints/${id}`,
    DELETE: (id) => `${API_VERSION}/complaints/${id}`,
  },

  // Library endpoints
  LIBRARY: {
    BOOKS: `${API_VERSION}/library/books`,
    BOOK_DETAILS: `${API_VERSION}/library/books/:id`,
    UPDATE_BOOK: `${API_VERSION}/library/books/:id`,
    DELETE_BOOK: `${API_VERSION}/library/books/:id`,
    SEARCH: `${API_VERSION}/library/books/search`,
    ISSUE_BOOK: `${API_VERSION}/library/issue`,
    RETURN_BOOK: `${API_VERSION}/library/return/:id`,
    TRANSACTIONS: `${API_VERSION}/library/transactions`,
    TRANSACTION_DETAILS: `${API_VERSION}/library/transactions/:id`,
    STUDENT_TRANSACTIONS: `${API_VERSION}/library/students/:id/transactions`,
    OVERDUE: `${API_VERSION}/library/overdue`,
    CALCULATE_FINE: `${API_VERSION}/library/transactions/:id/fine`,
    PAY_FINE: `${API_VERSION}/library/transactions/:id/pay`,
    STATS: `${API_VERSION}/library/stats`,
    AVAILABLE: `${API_VERSION}/library/available`,
    ISSUED: `${API_VERSION}/library/issued`,
  },
};

export default API_ENDPOINTS;

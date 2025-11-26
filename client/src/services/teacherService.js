import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./api";

/**
 * Teacher Service
 * Handles all teacher-related API calls
 */

/**
 * Get teacher dashboard data
 */
export const getDashboard = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TEACHER.DASHBOARD);
  return response.data;
};

/**
 * Get teacher profile
 */
export const getProfile = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TEACHER.PROFILE);
  return response.data;
};

/**
 * Update teacher profile
 */
export const updateProfile = async (data) => {
  const response = await apiClient.put(API_ENDPOINTS.TEACHER.PROFILE, data);
  return response.data;
};

/**
 * Get assigned classes
 */
export const getClasses = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TEACHER.CLASSES);
  return response.data;
};

/**
 * Get class details
 */
export const getClassDetails = async (classId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.TEACHER.CLASS_DETAILS.replace(":id", classId)
  );
  return response.data;
};

/**
 * Get students in a class
 */
export const getClassStudents = async (classId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.TEACHER.CLASS_STUDENTS.replace(":id", classId)
  );
  return response.data;
};

/**
 * Mark attendance
 */
export const markAttendance = async (classId, data) => {
  const response = await apiClient.post(
    API_ENDPOINTS.TEACHER.MARK_ATTENDANCE.replace(":id", classId),
    data
  );
  return response.data;
};

/**
 * Get attendance records
 */
export const getAttendance = async (classId, params = {}) => {
  const response = await apiClient.get(
    API_ENDPOINTS.TEACHER.ATTENDANCE.replace(":id", classId),
    { params }
  );
  return response.data;
};

/**
 * Create/Update results
 */
export const createResults = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.TEACHER.RESULTS, data);
  return response.data;
};

/**
 * Get results by class
 */
export const getResults = async (classId, params = {}) => {
  const response = await apiClient.get(
    API_ENDPOINTS.TEACHER.RESULTS_BY_CLASS.replace(":id", classId),
    { params }
  );
  return response.data;
};

/**
 * Update student result
 */
export const updateResult = async (resultId, data) => {
  const response = await apiClient.put(
    API_ENDPOINTS.TEACHER.UPDATE_RESULT.replace(":id", resultId),
    data
  );
  return response.data;
};

/**
 * Get notices
 */
export const getNotices = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TEACHER.NOTICES);
  return response.data;
};

/**
 * Get assigned subjects
 */
export const getSubjects = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TEACHER.SUBJECTS);
  return response.data;
};

/**
 * Get student progress in class
 */
export const getStudentProgress = async (classId, studentId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.TEACHER.STUDENT_PROGRESS.replace(":classId", classId).replace(
      ":studentId",
      studentId
    )
  );
  return response.data;
};

/**
 * Get class statistics
 */
export const getClassStatistics = async (classId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.TEACHER.CLASS_STATS.replace(":id", classId)
  );
  return response.data;
};

/**
 * Export teacher service
 */
const teacherService = {
  getDashboard,
  getProfile,
  updateProfile,
  getClasses,
  getClassDetails,
  getClassStudents,
  markAttendance,
  getAttendance,
  createResults,
  getResults,
  updateResult,
  getNotices,
  getSubjects,
  getStudentProgress,
  getClassStatistics,
};

export default teacherService;
export { teacherService };

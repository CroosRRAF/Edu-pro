import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./api";

/**
 * Coach Service
 * Handles all coach-related API calls
 */

/**
 * Get coach dashboard data
 */
export const getDashboard = async () => {
  const response = await apiClient.get(API_ENDPOINTS.COACH.DASHBOARD);
  return response.data;
};

/**
 * Get coach profile
 */
export const getProfile = async () => {
  const response = await apiClient.get(API_ENDPOINTS.COACH.PROFILE);
  return response.data;
};

/**
 * Update coach profile
 */
export const updateProfile = async (data) => {
  const response = await apiClient.put(API_ENDPOINTS.COACH.PROFILE, data);
  return response.data;
};

/**
 * Get assigned sports
 */
export const getSports = async () => {
  const response = await apiClient.get(API_ENDPOINTS.COACH.SPORTS);
  return response.data;
};

/**
 * Get sport details
 */
export const getSportDetails = async (sportId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COACH.SPORT_DETAILS.replace(":id", sportId)
  );
  return response.data;
};

/**
 * Get participants in a sport
 */
export const getParticipants = async (sportId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COACH.PARTICIPANTS.replace(":id", sportId)
  );
  return response.data;
};

/**
 * Add participant to sport
 */
export const addParticipant = async (sportId, studentId) => {
  const response = await apiClient.post(
    API_ENDPOINTS.COACH.ADD_PARTICIPANT.replace(":id", sportId),
    { studentId }
  );
  return response.data;
};

/**
 * Remove participant from sport
 */
export const removeParticipant = async (sportId, studentId) => {
  const response = await apiClient.delete(
    API_ENDPOINTS.COACH.REMOVE_PARTICIPANT.replace(":sportId", sportId).replace(
      ":studentId",
      studentId
    )
  );
  return response.data;
};

/**
 * Create event/match
 */
export const createEvent = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.COACH.EVENTS, data);
  return response.data;
};

/**
 * Get events for a sport
 */
export const getEvents = async (sportId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COACH.SPORT_EVENTS.replace(":id", sportId)
  );
  return response.data;
};

/**
 * Update event
 */
export const updateEvent = async (eventId, data) => {
  const response = await apiClient.put(
    API_ENDPOINTS.COACH.UPDATE_EVENT.replace(":id", eventId),
    data
  );
  return response.data;
};

/**
 * Delete event
 */
export const deleteEvent = async (eventId) => {
  const response = await apiClient.delete(
    API_ENDPOINTS.COACH.DELETE_EVENT.replace(":id", eventId)
  );
  return response.data;
};

/**
 * Record performance
 */
export const recordPerformance = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.COACH.PERFORMANCE, data);
  return response.data;
};

/**
 * Get participant performance
 */
export const getPerformance = async (sportId, studentId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COACH.PARTICIPANT_PERFORMANCE.replace(
      ":sportId",
      sportId
    ).replace(":studentId", studentId)
  );
  return response.data;
};

/**
 * Get sport statistics
 */
export const getSportStatistics = async (sportId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COACH.SPORT_STATS.replace(":id", sportId)
  );
  return response.data;
};

/**
 * Get notices
 */
export const getNotices = async () => {
  const response = await apiClient.get(API_ENDPOINTS.COACH.NOTICES);
  return response.data;
};

/**
 * Export coach service
 */
export const coachService = {
  getDashboard,
  getProfile,
  updateProfile,
  getSports,
  getSportDetails,
  getParticipants,
  addParticipant,
  removeParticipant,
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  recordPerformance,
  getPerformance,
  getSportStatistics,
  getNotices,
};

export default coachService;

import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./api";

/**
 * Librarian Service
 * Handles all librarian-related API calls
 */

/**
 * Get librarian dashboard data
 */
export const getDashboard = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARIAN.DASHBOARD);
  return response.data;
};

/**
 * Get librarian profile
 */
export const getProfile = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARIAN.PROFILE);
  return response.data;
};

/**
 * Update librarian profile
 */
export const updateProfile = async (data) => {
  const response = await apiClient.put(API_ENDPOINTS.LIBRARIAN.PROFILE, data);
  return response.data;
};

/**
 * Get all books
 */
export const getAllBooks = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.BOOKS, { params });
  return response.data;
};

/**
 * Get book by ID
 */
export const getBookById = async (bookId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.LIBRARY.BOOK_DETAILS.replace(":id", bookId)
  );
  return response.data;
};

/**
 * Create new book
 */
export const createBook = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.LIBRARY.BOOKS, data);
  return response.data;
};

/**
 * Update book
 */
export const updateBook = async (bookId, data) => {
  const response = await apiClient.put(
    API_ENDPOINTS.LIBRARY.UPDATE_BOOK.replace(":id", bookId),
    data
  );
  return response.data;
};

/**
 * Delete book
 */
export const deleteBook = async (bookId) => {
  const response = await apiClient.delete(
    API_ENDPOINTS.LIBRARY.DELETE_BOOK.replace(":id", bookId)
  );
  return response.data;
};

/**
 * Search books
 */
export const searchBooks = async (query) => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.SEARCH, {
    params: { q: query },
  });
  return response.data;
};

/**
 * Issue book to student
 */
export const issueBook = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.LIBRARY.ISSUE_BOOK, data);
  return response.data;
};

/**
 * Return book from student
 */
export const returnBook = async (transactionId, data) => {
  const response = await apiClient.post(
    API_ENDPOINTS.LIBRARY.RETURN_BOOK.replace(":id", transactionId),
    data
  );
  return response.data;
};

/**
 * Get all transactions
 */
export const getTransactions = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.TRANSACTIONS, {
    params,
  });
  return response.data;
};

/**
 * Get transaction by ID
 */
export const getTransactionById = async (transactionId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.LIBRARY.TRANSACTION_DETAILS.replace(":id", transactionId)
  );
  return response.data;
};

/**
 * Get transactions by student
 */
export const getStudentTransactions = async (studentId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.LIBRARY.STUDENT_TRANSACTIONS.replace(":id", studentId)
  );
  return response.data;
};

/**
 * Get overdue books
 */
export const getOverdueBooks = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.OVERDUE);
  return response.data;
};

/**
 * Calculate fine
 */
export const calculateFine = async (transactionId) => {
  const response = await apiClient.get(
    API_ENDPOINTS.LIBRARY.CALCULATE_FINE.replace(":id", transactionId)
  );
  return response.data;
};

/**
 * Pay fine
 */
export const payFine = async (transactionId, data) => {
  const response = await apiClient.post(
    API_ENDPOINTS.LIBRARY.PAY_FINE.replace(":id", transactionId),
    data
  );
  return response.data;
};

/**
 * Get library statistics
 */
export const getLibraryStatistics = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.STATS);
  return response.data;
};

/**
 * Get available books count
 */
export const getAvailableBooks = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.AVAILABLE);
  return response.data;
};

/**
 * Get issued books count
 */
export const getIssuedBooks = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LIBRARY.ISSUED);
  return response.data;
};

/**
 * Export librarian service
 */
export const librarianService = {
  getDashboard,
  getProfile,
  updateProfile,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  issueBook,
  returnBook,
  getTransactions,
  getTransactionById,
  getStudentTransactions,
  getOverdueBooks,
  calculateFine,
  payFine,
  getLibraryStatistics,
  getAvailableBooks,
  getIssuedBooks,
};

export default librarianService;

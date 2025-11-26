/**
 * Date helper utility functions
 */

/**
 * Check if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date) => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check if date is in the past
 */
export const isPast = (date) => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj < new Date();
};

/**
 * Check if date is in the future
 */
export const isFuture = (date) => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj > new Date();
};

/**
 * Get start of day
 */
export const startOfDay = (date = new Date()) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
};

/**
 * Get end of day
 */
export const endOfDay = (date = new Date()) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
};

/**
 * Get start of week
 */
export const startOfWeek = (date = new Date()) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const day = dateObj.getDay();
  const diff = dateObj.getDate() - day;
  return new Date(dateObj.setDate(diff));
};

/**
 * Get end of week
 */
export const endOfWeek = (date = new Date()) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const day = dateObj.getDay();
  const diff = dateObj.getDate() + (6 - day);
  return new Date(dateObj.setDate(diff));
};

/**
 * Get start of month
 */
export const startOfMonth = (date = new Date()) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
};

/**
 * Get end of month
 */
export const endOfMonth = (date = new Date()) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
};

/**
 * Add days to date
 */
export const addDays = (date, days) => {
  const dateObj = date instanceof Date ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Subtract days from date
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Add months to date
 */
export const addMonths = (date, months) => {
  const dateObj = date instanceof Date ? new Date(date) : new Date(date);
  dateObj.setMonth(dateObj.getMonth() + months);
  return dateObj;
};

/**
 * Subtract months from date
 */
export const subtractMonths = (date, months) => {
  return addMonths(date, -months);
};

/**
 * Get difference in days
 */
export const diffInDays = (date1, date2) => {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  const diff = Math.abs(d2 - d1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * Get difference in hours
 */
export const diffInHours = (date1, date2) => {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  const diff = Math.abs(d2 - d1);
  return Math.floor(diff / (1000 * 60 * 60));
};

/**
 * Get age from birth date
 */
export const getAge = (birthDate) => {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = birthDate instanceof Date ? birthDate : new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Check if date is between two dates
 */
export const isBetween = (date, startDate, endDate) => {
  const d = date instanceof Date ? date : new Date(date);
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  return d >= start && d <= end;
};

/**
 * Format date for input field (YYYY-MM-DD)
 */
export const formatDateForInput = (date) => {
  if (!date) return "";
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toISOString().split("T")[0];
};

/**
 * Format date (MM/DD/YYYY)
 */
export const formatDate = (date) => {
  if (!date) return "";
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * Format date and time (MM/DD/YYYY HH:MM AM/PM)
 */
export const formatDateTime = (date) => {
  if (!date) return "";
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Get day name
 */
export const getDayName = (date, short = false) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    weekday: short ? "short" : "long",
  });
};

/**
 * Get month name
 */
export const getMonthName = (date, short = false) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: short ? "short" : "long",
  });
};

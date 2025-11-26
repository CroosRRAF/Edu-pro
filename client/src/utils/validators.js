/**
 * Validation utility functions
 */

/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (supports international format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
};

/**
 * School ID validation (sch_010m format)
 */
export const isValidSchoolID = (schoolID) => {
  const schoolIDRegex = /^sch_\d{3}[bgm]$/;
  return schoolIDRegex.test(schoolID);
};

/**
 * Student ID validation (st010m1099 format)
 */
export const isValidStudentID = (studentID) => {
  const studentIDRegex = /^st\d{3}[bgm]\d{4}$/;
  return studentIDRegex.test(studentID);
};

/**
 * Teacher ID validation (te010m1102 format)
 */
export const isValidTeacherID = (teacherID) => {
  const teacherIDRegex = /^te\d{3}[bgm]\d{4}$/;
  return teacherIDRegex.test(teacherID);
};

/**
 * Admin ID validation (adm0001 format)
 */
export const isValidAdminID = (adminID) => {
  const adminIDRegex = /^adm\d{4}$/;
  return adminIDRegex.test(adminID);
};

/**
 * NIC validation (basic)
 */
export const isValidNIC = (nic) => {
  return nic && nic.length >= 9;
};

/**
 * Password strength validation
 */
export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Required field validation
 */
export const isRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Min length validation
 */
export const minLength = (value, min) => {
  if (typeof value === "string") {
    return value.trim().length >= min;
  }
  return false;
};

/**
 * Max length validation
 */
export const maxLength = (value, max) => {
  if (typeof value === "string") {
    return value.trim().length <= max;
  }
  return false;
};

/**
 * Number range validation
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * URL validation
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Date validation
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Form validation helper
 */
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];

    if (fieldRules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
    } else if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = "Invalid email address";
    } else if (fieldRules.phone && !isValidPhone(value)) {
      errors[field] = "Invalid phone number";
    } else if (
      fieldRules.minLength &&
      !minLength(value, fieldRules.minLength)
    ) {
      errors[field] = `Minimum length is ${fieldRules.minLength}`;
    } else if (
      fieldRules.maxLength &&
      !maxLength(value, fieldRules.maxLength)
    ) {
      errors[field] = `Maximum length is ${fieldRules.maxLength}`;
    } else if (fieldRules.custom && !fieldRules.custom(value)) {
      errors[field] = fieldRules.customMessage || "Invalid value";
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Aliases for compatibility
export const validateEmail = isValidEmail;
export const validatePhone = isValidPhone;

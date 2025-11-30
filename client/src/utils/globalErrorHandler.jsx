/**
 * Global Error Handler
 *
 * Sets up application-wide error handling for:
 * - Unhandled promise rejections
 * - Global window errors
 * - Network errors
 * - API errors
 *
 * This file should be imported early in the application lifecycle (main.jsx)
 */

import { toast } from "react-toastify";
import { logError, logWarning } from "./errorLogger";

/**
 * Initialize global error handlers
 */
export const initGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", handleUnhandledRejection);

  // Handle global JavaScript errors
  window.addEventListener("error", handleGlobalError);

  // Handle resource loading errors
  window.addEventListener("error", handleResourceError, true);

  // Set up network error detection
  setupNetworkErrorDetection();

  console.log("✅ Global error handlers initialized");
};

/**
 * Clean up global error handlers
 */
export const cleanupGlobalErrorHandlers = () => {
  window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  window.removeEventListener("error", handleGlobalError);
  window.removeEventListener("error", handleResourceError, true);
};

/**
 * Handle unhandled promise rejections
 */
const handleUnhandledRejection = (event) => {
  event.preventDefault(); // Prevent console error

  const error = event.reason;

  // Log the error
  logError(error || new Error("Unhandled Promise Rejection"), {
    type: "unhandledRejection",
    promise: event.promise?.toString(),
  });

  // Show user-friendly notification
  showErrorNotification(
    "An unexpected error occurred",
    "Please try again or contact support if the problem persists."
  );
};

/**
 * Handle global JavaScript errors
 */
const handleGlobalError = (event) => {
  // Only handle actual errors, not resource loading errors
  if (!event.error) return;

  event.preventDefault();

  const error = event.error;

  // Log the error
  logError(error, {
    type: "globalError",
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });

  // Show user-friendly notification for critical errors
  if (isCriticalError(error)) {
    showErrorNotification(
      "Critical Error",
      "The application encountered a critical error. Please reload the page."
    );
  }
};

/**
 * Handle resource loading errors (images, scripts, stylesheets)
 */
const handleResourceError = (event) => {
  // Only handle resource errors
  if (event.target === window) return;

  const target = event.target || event.srcElement;
  const isResourceError =
    target.tagName === "IMG" ||
    target.tagName === "SCRIPT" ||
    target.tagName === "LINK";

  if (isResourceError) {
    logWarning("Resource loading failed", {
      type: "resourceError",
      tagName: target.tagName,
      src: target.src || target.href,
      id: target.id,
      className: target.className,
    });

    // For images, set a fallback
    if (target.tagName === "IMG" && !target.dataset.errorHandled) {
      target.dataset.errorHandled = "true";
      target.src = "/placeholder-image.png"; // Set your fallback image
      target.alt = "Image failed to load";
    }
  }
};

/**
 * Set up network error detection
 */
const setupNetworkErrorDetection = () => {
  // Monitor online/offline status
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // Intercept fetch to handle network errors
  interceptFetch();
};

/**
 * Handle online status
 */
const handleOnline = () => {
  console.log("✅ Network connection restored");

  showSuccessNotification("Connection Restored", "You are back online!");
};

/**
 * Handle offline status
 */
const handleOffline = () => {
  console.warn("⚠️ Network connection lost");

  logWarning("Network connection lost", {
    type: "offline",
  });

  showErrorNotification(
    "Connection Lost",
    "You are currently offline. Some features may not be available.",
    { autoClose: false }
  );
};

/**
 * Intercept fetch to handle network errors globally
 */
const interceptFetch = () => {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);

      // Handle HTTP error responses
      if (!response.ok) {
        handleHTTPError(response, args[0]);
      }

      return response;
    } catch (error) {
      // Handle network errors
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        logError(error, {
          type: "networkError",
          url: args[0],
        });

        showErrorNotification(
          "Network Error",
          "Unable to connect to the server. Please check your connection."
        );
      }

      throw error;
    }
  };
};

/**
 * Handle HTTP error responses
 */
const handleHTTPError = (response, url) => {
  const { status, statusText } = response;

  // Log based on status code
  if (status >= 500) {
    logError(new Error(`Server Error: ${status} ${statusText}`), {
      type: "serverError",
      status,
      statusText,
      url,
    });
  } else if (status >= 400) {
    logWarning(`Client Error: ${status} ${statusText}`, {
      type: "clientError",
      status,
      statusText,
      url,
    });
  }

  // Show user notifications for specific errors
  switch (status) {
    case 401:
      handleUnauthorized();
      break;
    case 403:
      showErrorNotification(
        "Access Denied",
        "You do not have permission to perform this action."
      );
      break;
    case 404:
      logWarning("Resource not found", { url, status });
      break;
    case 429:
      showErrorNotification(
        "Too Many Requests",
        "Please slow down and try again in a moment."
      );
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      showErrorNotification(
        "Server Error",
        "The server is experiencing issues. Please try again later."
      );
      break;
    default:
      break;
  }
};

/**
 * Handle unauthorized errors (401)
 */
const handleUnauthorized = () => {
  // Clear authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  logWarning("Unauthorized access - redirecting to login", {
    type: "unauthorized",
  });

  showErrorNotification(
    "Session Expired",
    "Your session has expired. Please log in again."
  );

  // Redirect to login after a short delay
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
};

/**
 * Determine if an error is critical
 */
const isCriticalError = (error) => {
  const criticalErrors = [
    "ChunkLoadError",
    "SecurityError",
    "ReferenceError",
    "SyntaxError",
  ];

  return criticalErrors.some(
    (type) => error.name === type || error.message.includes(type)
  );
};

/**
 * Show error notification to user
 */
const showErrorNotification = (title, message, options = {}) => {
  if (typeof toast !== "undefined") {
    toast.error(
      <div>
        <strong>{title}</strong>
        <br />
        {message}
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options,
      }
    );
  } else {
    console.error(`${title}: ${message}`);
  }
};

/**
 * Show success notification to user
 */
const showSuccessNotification = (title, message, options = {}) => {
  if (typeof toast !== "undefined") {
    toast.success(
      <div>
        <strong>{title}</strong>
        <br />
        {message}
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options,
      }
    );
  } else {
    console.log(`${title}: ${message}`);
  }
};

/**
 * Report error to user via UI
 */
export const reportErrorToUser = (error, context = {}) => {
  const errorMessage = error.message || "An unexpected error occurred";
  const userFriendlyMessage = getUserFriendlyMessage(error);

  showErrorNotification("Error", userFriendlyMessage);

  logError(error, {
    ...context,
    reportedToUser: true,
  });
};

/**
 * Get user-friendly error message
 */
const getUserFriendlyMessage = (error) => {
  const errorMap = {
    "Network request failed":
      "Unable to connect to the server. Please check your internet connection.",
    "Failed to fetch":
      "Unable to reach the server. Please check your connection and try again.",
    timeout: "The request took too long. Please try again.",
    Unauthorized: "Your session has expired. Please log in again.",
    Forbidden: "You do not have permission to access this resource.",
    "Not Found": "The requested resource was not found.",
    "Internal Server Error":
      "The server encountered an error. Please try again later.",
  };

  const message = error.message || "";

  for (const [key, value] of Object.entries(errorMap)) {
    if (message.includes(key)) {
      return value;
    }
  }

  return "An unexpected error occurred. Please try again or contact support.";
};

/**
 * Export error handler utilities
 */
export default {
  init: initGlobalErrorHandlers,
  cleanup: cleanupGlobalErrorHandlers,
  reportErrorToUser,
};

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Try to get admin token first, then student token
    const adminToken = localStorage.getItem("adminToken");
    const studentToken = localStorage.getItem("studentToken");

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (studentToken) {
      config.headers.Authorization = `Bearer ${studentToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentData");

      // Redirect to appropriate login page
      const currentPath = window.location.pathname;
      if (currentPath.includes("admin")) {
        window.location.href = "/admin/login";
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;

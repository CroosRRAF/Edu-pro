import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/axiosInstance"; // Custom Axios instance
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch("password"); // Watch password for confirmation validation

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        contact: data.contact,
        birth: data.birth,
        gender: data.gender,
      });

      setSuccess("Registration successful! Redirecting to login...");

      // Reset form
      reset();

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);

      console.log("Student registered:", response.data);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setApiError(
        err.response?.data?.message ||
          err.response?.data?.errors?.map((e) => e.msg).join(", ") ||
          "Registration failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Registration
        </h2>

        {apiError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg"
            role="alert"
          >
            {apiError}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded-lg"
            role="alert"
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              placeholder="Enter your student email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              placeholder="Enter password (min 6 chars)"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`w-full px-4 py-3 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block mb-1 font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="text"
              className={`w-full px-4 py-3 border ${
                errors.contact ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              placeholder="Enter contact number (e.g., +1234567890)"
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Invalid contact number",
                },
              })}
              aria-invalid={errors.contact ? "true" : "false"}
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="birth"
              className="block mb-1 font-medium text-gray-700"
            >
              Date of Birth (Optional)
            </label>
            <input
              id="birth"
              type="date"
              className={`w-full px-4 py-3 border ${
                errors.birth ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              {...register("birth", {
                validate: (value) =>
                  !value ||
                  (new Date(value) <= new Date() &&
                    new Date(value) >= new Date("1900-01-01")) ||
                  "Invalid date of birth",
              })}
              aria-invalid={errors.birth ? "true" : "false"}
            />
            {errors.birth && (
              <p className="mt-1 text-sm text-red-600">{errors.birth.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block mb-1 font-medium text-gray-700"
            >
              Gender (Optional)
            </label>
            <select
              id="gender"
              className={`w-full px-4 py-3 border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              {...register("gender", {
                validate: (value) =>
                  !value ||
                  ["male", "female", "other"].includes(value) ||
                  "Invalid gender",
              })}
              aria-invalid={errors.gender ? "true" : "false"}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 space-y-2">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentRegister;
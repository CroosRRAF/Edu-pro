import {
  Book,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import api from "../utils/axiosInstance";

const StudentDashboard = () => {
  const [data, setData] = useState({
    student: null,
    attendance: [],
    library: [],
    results: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("studentData"));
        const token = localStorage.getItem("studentToken");

        if (!studentData?._id || !token) {
          setError(
            "You are not logged in. Please log in to view the dashboard."
          );
          return;
        }

        const studentId = studentData._id;
        const response = await api.get(`/students/${studentId}/dashboard`);
        setData({
          student: response.data.student,
          attendance: response.data.attendance || [],
          library: response.data.library || [],
          results: response.data.results || [],
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data. Please try again later."
        );
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <Link
            to={ROUTES.STUDENT_LOGIN}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!data.student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 text-gray-600">
          No student data found.
        </div>
      </div>
    );
  }

  // Calculate attendance percentage
  const attendancePercentage =
    data.attendance.length > 0
      ? Math.round(
          (data.attendance.filter((a) => a.present).length /
            data.attendance.length) *
            100
        )
      : 0;

  // Calculate average score
  const averageScore =
    data.results.length > 0
      ? Math.round(
          data.results.reduce((sum, r) => sum + r.score, 0) /
            data.results.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {data.student.name}!
              </h1>
              <p className="text-blue-100">
                Student ID: {data.student.studentID}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-blue-100">Status</p>
                <p className="font-semibold capitalize">
                  {data.student.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Attendance</p>
                <p className="text-3xl font-bold text-blue-600">
                  {attendancePercentage}%
                </p>
              </div>
              <Calendar className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-green-600">
                  {averageScore}%
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Enrolled Courses</p>
                <p className="text-3xl font-bold text-purple-600">
                  {data.student.courses?.length || 0}
                </p>
              </div>
              <BookOpen className="h-12 w-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Borrowed Books</p>
                <p className="text-3xl font-bold text-orange-600">
                  {data.library.filter((l) => l.status === "borrowed").length}
                </p>
              </div>
              <Book className="h-12 w-12 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to={ROUTES.STUDENT_COURSES}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                My Courses
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_ATTENDANCE}
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Calendar className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Attendance
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_RESULTS}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Results
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_LIBRARY}
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Book className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Library
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_SPORTS}
              className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <Trophy className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Sports
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_NOTICES}
              className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Notices
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_COMPLAINTS}
              className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <ClipboardList className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Complaints
              </span>
            </Link>

            <Link
              to={ROUTES.STUDENT_PROFILE}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="h-8 w-8 text-gray-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Profile
              </span>
            </Link>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Attendance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Attendance
              </h2>
              <Link
                to={ROUTES.STUDENT_ATTENDANCE}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            {data.attendance.length > 0 ? (
              <div className="space-y-2">
                {data.attendance.slice(0, 5).map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <span className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.present
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.present ? "Present" : "Absent"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No attendance records found.
              </p>
            )}
          </div>

          {/* Recent Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Results
              </h2>
              <Link
                to={ROUTES.STUDENT_RESULTS}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            {data.results.length > 0 ? (
              <div className="space-y-2">
                {data.results.slice(0, 5).map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <span className="text-sm text-gray-700 font-medium">
                      {result.module?.moduleName || "N/A"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">
                        {result.score}%
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          result.grade === "A"
                            ? "bg-green-100 text-green-800"
                            : result.grade === "B"
                            ? "bg-blue-100 text-blue-800"
                            : result.grade === "C"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No results available yet.
              </p>
            )}
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
              <Link
                to={ROUTES.STUDENT_COURSES}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            {data.student.courses && data.student.courses.length > 0 ? (
              <div className="space-y-3">
                {data.student.courses.slice(0, 4).map((course, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <p className="font-semibold text-gray-800">
                      {course.courseName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Code: {course.courseID}
                    </p>
                    {course.modules && course.modules.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {course.modules.length} module(s)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No courses enrolled yet.
              </p>
            )}
          </div>

          {/* Library Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Library Status
              </h2>
              <Link
                to={ROUTES.STUDENT_LIBRARY}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            {data.library.length > 0 ? (
              <div className="space-y-2">
                {data.library.slice(0, 4).map((record, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded border-l-4 border-orange-500"
                  >
                    <p className="font-semibold text-gray-800 text-sm">
                      {record.bookTitle}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">
                        {record.isbn}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          record.status === "borrowed"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                    {record.fine > 0 && (
                      <p className="text-xs text-red-600 mt-1">
                        Fine: ${record.fine}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No library records found.
              </p>
            )}
          </div>
        </div>

        {/* Sports Activities */}
        {data.student.sports && data.student.sports.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Sports Activities
              </h2>
              <Link
                to={ROUTES.STUDENT_SPORTS}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.student.sports.map((sport, index) => (
                <div
                  key={index}
                  className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {sport.sportName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {sport.captain ? "Team Captain" : "Member"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

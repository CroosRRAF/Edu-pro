import { Book, Calendar, ChevronRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Badge, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * My Courses Page
 * Displays list of courses the student is enrolled in
 */
function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { success, error: showError } = useNotification();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getCourses();
      setCourses(response.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load courses";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`${ROUTES.STUDENT_COURSES}/${courseId}`);
  };

  const handleEnrollMore = () => {
    navigate(`${ROUTES.STUDENT_COURSES}/enroll`);
  };

  if (loading) {
    return (
      <DashboardLayout title="My Courses">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="My Courses">
        <Alert type="error" message={error} onClose={() => setError(null)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Courses"
      subtitle="View and manage your enrolled courses"
    >
      {/* Header with Enroll Button */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Enrolled Courses ({courses.length})
          </h2>
          <p className="text-gray-600 mt-1">
            Access your course materials, modules, and schedules
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleEnrollMore}
          icon={<Book className="h-5 w-5" />}
        >
          Enroll in More Courses
        </Button>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Book className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Courses Enrolled Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your learning journey by enrolling in courses
            </p>
            <Button variant="primary" onClick={handleEnrollMore}>
              Browse Available Courses
            </Button>
          </div>
        </Card>
      ) : (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course._id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewCourse(course._id)}
            >
              {/* Course Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {course.courseName}
                  </h3>
                  <Badge variant="success">Enrolled</Badge>
                </div>
                {course.courseID && (
                  <p className="text-sm text-gray-500">{course.courseID}</p>
                )}
              </div>

              {/* Course Description */}
              {course.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>
              )}

              {/* Course Stats */}
              <div className="space-y-2 mb-4">
                {/* Modules */}
                {course.modules && course.modules.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Book className="h-4 w-4 mr-2 text-primary-500" />
                    <span>
                      {course.modules.length} Module
                      {course.modules.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {/* Grade */}
                {course.grade && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-primary-500" />
                    <span>Grade {course.grade}</span>
                  </div>
                )}

                {/* Enrolled Date */}
                {course.enrolledAt && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                    <span>
                      Enrolled:{" "}
                      {new Date(course.enrolledAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* View Details Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewCourse(course._id);
                  }}
                  className="w-full flex items-center justify-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                >
                  View Course Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Stats (if courses exist) */}
      {courses.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                {courses.length}
              </p>
              <p className="text-gray-600 mt-1">Total Courses</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                {courses.reduce(
                  (total, course) => total + (course.modules?.length || 0),
                  0
                )}
              </p>
              <p className="text-gray-600 mt-1">Total Modules</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                {courses.filter((c) => c.status === "active").length ||
                  courses.length}
              </p>
              <p className="text-gray-600 mt-1">Active Courses</p>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyCourses;

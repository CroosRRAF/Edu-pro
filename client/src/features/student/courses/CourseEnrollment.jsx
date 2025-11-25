import { Book, CheckCircle, ChevronRight, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  Input,
  Loader,
} from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../hooks/useAuth";
import { adminService } from "../../../services/adminService";
import { studentService } from "../../../services/studentService";

/**
 * Course Enrollment Page
 * Browse and enroll in available courses
 */
function CourseEnrollment() {
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const navigate = useNavigate();
  const { success, error: showError } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, selectedGrade, allCourses, enrolledCourses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all available courses
      const coursesResponse = await adminService.getAllCourses();
      const allCoursesData = coursesResponse.data || [];

      // Fetch student's enrolled courses
      const enrolledResponse = await studentService.getCourses();
      const enrolledData = enrolledResponse.data || [];

      setAllCourses(allCoursesData);
      setEnrolledCourses(enrolledData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load courses";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...allCourses];

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.courseName?.toLowerCase().includes(search) ||
          course.description?.toLowerCase().includes(search) ||
          course.courseID?.toLowerCase().includes(search)
      );
    }

    // Filter by grade
    if (selectedGrade !== "all") {
      filtered = filtered.filter(
        (course) => course.grade?.toString() === selectedGrade
      );
    }

    setFilteredCourses(filtered);
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course._id === courseId);
  };

  const handleEnroll = async (courseId, courseName) => {
    try {
      setEnrolling((prev) => ({ ...prev, [courseId]: true }));

      await studentService.enrollCourse(courseId);

      success(`Successfully enrolled in ${courseName}!`);

      // Refresh courses
      await fetchCourses();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to enroll in course";
      showError(errorMsg);
    } finally {
      setEnrolling((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`${ROUTES.STUDENT_COURSES}/${courseId}`);
  };

  const handleBackToMyCourses = () => {
    navigate(ROUTES.STUDENT_COURSES);
  };

  // Get unique grades from all courses
  const availableGrades = [
    ...new Set(allCourses.map((c) => c.grade).filter(Boolean)),
  ].sort((a, b) => a - b);

  if (loading) {
    return (
      <DashboardLayout title="Enroll in Courses">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Enroll in Courses">
        <Alert type="error" message={error} onClose={() => setError(null)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Enroll in Courses"
      subtitle="Browse and enroll in available courses"
    >
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Available Courses
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <Button variant="outline" onClick={handleBackToMyCourses}>
          Back to My Courses
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <Input
            placeholder="Search courses by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5" />}
          />

          {/* Grade Filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Grades</option>
            {availableGrades.map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Enrollment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">
              {allCourses.length}
            </p>
            <p className="text-gray-600 mt-1">Total Courses</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-success-600">
              {enrolledCourses.length}
            </p>
            <p className="text-gray-600 mt-1">Enrolled</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-info-600">
              {allCourses.length - enrolledCourses.length}
            </p>
            <p className="text-gray-600 mt-1">Available to Enroll</p>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Book className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedGrade !== "all"
                ? "Try adjusting your filters"
                : "No courses are available at this time"}
            </p>
            {(searchTerm || selectedGrade !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGrade("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course._id);
            const isEnrollingThis = enrolling[course._id];

            return (
              <Card
                key={course._id}
                className={`hover:shadow-lg transition-shadow ${
                  enrolled ? "border-2 border-success-500" : ""
                }`}
              >
                {/* Course Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
                      {course.courseName}
                    </h3>
                    {enrolled ? (
                      <Badge variant="success" className="ml-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enrolled
                      </Badge>
                    ) : (
                      <Badge variant="info" className="ml-2">
                        Available
                      </Badge>
                    )}
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

                {/* Course Info */}
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
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {enrolled ? (
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => handleViewCourse(course._id)}
                      icon={<ChevronRight className="h-4 w-4" />}
                    >
                      View Course
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() =>
                          handleEnroll(course._id, course.courseName)
                        }
                        loading={isEnrollingThis}
                        disabled={isEnrollingThis}
                      >
                        {isEnrollingThis ? "Enrolling..." : "Enroll Now"}
                      </Button>
                      <button
                        onClick={() => handleViewCourse(course._id)}
                        className="w-full text-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

export default CourseEnrollment;

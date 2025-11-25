import {
  Book,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  Loader,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { adminService } from "../../../services/adminService";
import { studentService } from "../../../services/studentService";

/**
 * Course Detail Page
 * View detailed information about a specific course
 */
function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();
  const { success, error: showError } = useNotification();

  useEffect(() => {
    if (id) {
      fetchCourseDetail();
      checkEnrollmentStatus();
    }
  }, [id]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminService.getCourseById(id);
      setCourse(response.data);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load course details";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const response = await studentService.getCourses();
      const enrolledCourses = response.data || [];
      const enrolled = enrolledCourses.some((c) => c._id === id);
      setIsEnrolled(enrolled);
    } catch (err) {
      console.error("Failed to check enrollment status:", err);
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);

      await studentService.enrollCourse(id);

      success(`Successfully enrolled in ${course.courseName}!`);
      setIsEnrolled(true);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to enroll in course";
      showError(errorMsg);
    } finally {
      setEnrolling(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackToCourses = () => {
    navigate(ROUTES.STUDENT_COURSES);
  };

  if (loading) {
    return (
      <DashboardLayout title="Course Details">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout title="Course Details">
        <Alert type="error" message={error || "Course not found"} />
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            icon={<ChevronLeft className="h-4 w-4" />}
          >
            Go Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={course.courseName} subtitle={course.courseID}>
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          icon={<ChevronLeft className="h-4 w-4" />}
          className="mb-4"
        >
          Back
        </Button>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {course.courseName}
            </h2>
            {course.description && (
              <p className="text-gray-600 text-lg">{course.description}</p>
            )}
          </div>

          <div className="ml-6">
            {isEnrolled ? (
              <Badge variant="success" size="lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Enrolled
              </Badge>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleEnroll}
                loading={enrolling}
                disabled={enrolling}
              >
                {enrolling ? "Enrolling..." : "Enroll in Course"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg mr-4">
              <Book className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {course.modules?.length || 0}
              </p>
              <p className="text-gray-600 text-sm">Modules</p>
            </div>
          </div>
        </Card>

        {course.grade && (
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-info-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-info-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {course.grade}
                </p>
                <p className="text-gray-600 text-sm">Grade Level</p>
              </div>
            </div>
          </Card>
        )}

        {course.teacher && (
          <Card className="md:col-span-2">
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {course.teacher.name || "N/A"}
                </p>
                <p className="text-gray-600 text-sm">Instructor</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="modules">Modules</Tab>
          <Tab value="materials">Materials</Tab>
        </TabList>

        {/* Overview Tab */}
        <TabPanel value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Course Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {course.description ||
                    "No description available for this course."}
                </p>
              </Card>

              {/* Course Information */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Course Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Course ID:</span>
                    <span className="font-medium text-gray-800">
                      {course.courseID}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Grade Level:</span>
                    <span className="font-medium text-gray-800">
                      {course.grade ? `Grade ${course.grade}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Modules:</span>
                    <span className="font-medium text-gray-800">
                      {course.modules?.length || 0}
                    </span>
                  </div>
                  {course.teacher && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium text-gray-800">
                        {course.teacher.name}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Status */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Enrollment Status
                </h3>
                {isEnrolled ? (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 mx-auto text-success-600 mb-3" />
                    <p className="text-gray-700 font-medium mb-2">
                      You are enrolled in this course
                    </p>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleBackToCourses}
                      className="mt-4"
                    >
                      View My Courses
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Clock className="h-12 w-12 mx-auto text-warning-600 mb-3" />
                    <p className="text-gray-700 font-medium mb-2">
                      Not yet enrolled
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Enroll to access course materials and modules
                    </p>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleEnroll}
                      loading={enrolling}
                      disabled={enrolling}
                    >
                      {enrolling ? "Enrolling..." : "Enroll Now"}
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabPanel>

        {/* Modules Tab */}
        <TabPanel value="modules">
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Course Modules
            </h3>

            {course.modules && course.modules.length > 0 ? (
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <div
                    key={module._id || index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-primary-700 font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {module.moduleName || `Module ${index + 1}`}
                        </h4>
                        {module.moduleID && (
                          <p className="text-sm text-gray-500 mb-2">
                            {module.moduleID}
                          </p>
                        )}
                        {module.description && (
                          <p className="text-gray-600 text-sm">
                            {module.description}
                          </p>
                        )}
                      </div>
                      {isEnrolled && (
                        <Badge variant="success" className="ml-4">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Access
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Book className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No modules available yet</p>
              </div>
            )}
          </Card>
        </TabPanel>

        {/* Materials Tab */}
        <TabPanel value="materials">
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Course Materials
            </h3>

            {isEnrolled ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Course materials coming soon
                </p>
                <p className="text-gray-500 text-sm">
                  Your instructor will upload materials here
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto text-warning-600 mb-4" />
                <p className="text-gray-700 font-medium mb-2">
                  Enrollment Required
                </p>
                <p className="text-gray-600 mb-6">
                  You need to enroll in this course to access materials
                </p>
                <Button
                  variant="primary"
                  onClick={handleEnroll}
                  loading={enrolling}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </Button>
              </div>
            )}
          </Card>
        </TabPanel>
      </Tabs>
    </DashboardLayout>
  );
}

export default CourseDetail;

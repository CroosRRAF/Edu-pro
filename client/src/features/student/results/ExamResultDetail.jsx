import {
  Award,
  Calendar,
  CheckCircle,
  ChevronLeft,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Badge, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * Exam Result Detail Page
 * View detailed information about a specific exam result
 */
function ExamResultDetail() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { error: showError } = useNotification();

  useEffect(() => {
    if (id) {
      fetchResultDetail();
    }
  }, [id]);

  const fetchResultDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all results and find the specific one
      const response = await studentService.getResults({});
      const allResults = response.data || [];
      const resultData = allResults.find((r) => r._id === id);

      if (!resultData) {
        throw new Error("Result not found");
      }

      setResult(resultData);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load result details";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.STUDENT_RESULTS);
  };

  const getGrade = (score, passingScore = 50) => {
    if (score >= 90)
      return { grade: "A+", text: "Excellent", variant: "success" };
    if (score >= 80)
      return { grade: "A", text: "Very Good", variant: "success" };
    if (score >= 70) return { grade: "B", text: "Good", variant: "info" };
    if (score >= 60) return { grade: "C", text: "Average", variant: "warning" };
    if (score >= passingScore)
      return { grade: "D", text: "Pass", variant: "warning" };
    return { grade: "F", text: "Fail", variant: "error" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <DashboardLayout title="Exam Result Details">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  if (error || !result) {
    return (
      <DashboardLayout title="Exam Result Details">
        <Alert type="error" message={error || "Result not found"} />
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            icon={<ChevronLeft className="h-4 w-4" />}
          >
            Back to Results
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const gradeInfo = getGrade(result.score || 0, result.passingScore);
  const isPassed = (result.score || 0) >= (result.passingScore || 50);

  return (
    <DashboardLayout title="Exam Result Details" subtitle={result.examName}>
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          icon={<ChevronLeft className="h-4 w-4" />}
        >
          Back to Results
        </Button>
      </div>

      {/* Score Card */}
      <Card
        className={`mb-6 bg-gradient-to-br ${
          isPassed
            ? "from-success-50 to-success-100 border-success-200"
            : "from-error-50 to-error-100 border-error-200"
        }`}
      >
        <div className="text-center py-6">
          <div className="mb-4">
            {isPassed ? (
              <CheckCircle className="h-16 w-16 mx-auto text-success-600" />
            ) : (
              <XCircle className="h-16 w-16 mx-auto text-error-600" />
            )}
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {result.score || 0}%
          </h2>
          <Badge
            variant={gradeInfo.variant}
            size="lg"
            className="text-xl px-6 py-2"
          >
            Grade: {gradeInfo.grade}
          </Badge>
          <p
            className={`mt-3 text-lg font-medium ${
              isPassed ? "text-success-700" : "text-error-700"
            }`}
          >
            {gradeInfo.text}
          </p>
        </div>
      </Card>

      {/* Exam Information */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Exam Information
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Exam Name:</span>
            <span className="text-gray-900">{result.examName || "N/A"}</span>
          </div>

          {result.courseName && (
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Course:</span>
              <span className="text-gray-900">{result.courseName}</span>
            </div>
          )}

          {result.examType && (
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Exam Type:</span>
              <Badge variant="secondary">
                {result.examType.charAt(0).toUpperCase() +
                  result.examType.slice(1)}
              </Badge>
            </div>
          )}

          {result.examDate && (
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Date:</span>
              <span className="text-gray-900 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                {formatDate(result.examDate)}
              </span>
            </div>
          )}

          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Passing Score:</span>
            <span className="text-gray-900">{result.passingScore || 50}%</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-600 font-medium">Status:</span>
            <Badge variant={isPassed ? "success" : "error"}>
              {isPassed ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Passed
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3 mr-1" />
                  Failed
                </>
              )}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Performance Analysis */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Analysis
        </h3>
        <div className="space-y-4">
          {/* Score Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Your Score
              </span>
              <span className="text-sm font-medium text-gray-700">
                {result.score}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  result.score >= 90
                    ? "bg-success-600"
                    : result.score >= 75
                    ? "bg-info-600"
                    : result.score >= (result.passingScore || 50)
                    ? "bg-warning-600"
                    : "bg-error-600"
                }`}
                style={{ width: `${Math.min(result.score || 0, 100)}%` }}
              />
            </div>
          </div>

          {/* Passing Threshold */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Passing Threshold</p>
                <p className="text-sm text-gray-600 mt-1">
                  Minimum score required to pass
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {result.passingScore || 50}%
              </p>
            </div>
          </div>

          {/* Performance Indicator */}
          <div
            className={`p-4 rounded-lg ${
              result.score >= 90
                ? "bg-success-50 border border-success-200"
                : result.score >= 75
                ? "bg-info-50 border border-info-200"
                : result.score >= (result.passingScore || 50)
                ? "bg-warning-50 border border-warning-200"
                : "bg-error-50 border border-error-200"
            }`}
          >
            <div className="flex items-start">
              <Award
                className={`h-5 w-5 mr-3 mt-0.5 ${
                  result.score >= 90
                    ? "text-success-600"
                    : result.score >= 75
                    ? "text-info-600"
                    : result.score >= (result.passingScore || 50)
                    ? "text-warning-600"
                    : "text-error-600"
                }`}
              />
              <div>
                <p className="font-medium text-gray-900">{gradeInfo.text}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {result.score >= 90
                    ? "Outstanding performance! You have mastered this subject."
                    : result.score >= 75
                    ? "Good work! You have a strong understanding of the material."
                    : result.score >= (result.passingScore || 50)
                    ? "You passed the exam. Consider reviewing the material to improve."
                    : "You did not pass this exam. Please review the material and seek help if needed."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Remarks */}
      {result.remarks && (
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Remarks</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{result.remarks}</p>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default ExamResultDetail;

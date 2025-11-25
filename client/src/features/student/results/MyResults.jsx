import {
  Award,
  BarChart,
  BookOpen,
  Filter,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, Badge, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * My Results Page
 * View exam results and academic performance
 */
function MyResults() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExamType, setSelectedExamType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("");
  const [stats, setStats] = useState({
    totalExams: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    passedExams: 0,
    failedExams: 0,
  });

  const { error: showError } = useNotification();

  useEffect(() => {
    // Set current year as default
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear.toString());
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchResults();
    }
  }, [selectedYear]);

  useEffect(() => {
    filterResults();
  }, [results, selectedExamType]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        year: selectedYear,
      };

      const response = await studentService.getResults(params);
      const resultsData = response.data || [];

      setResults(resultsData);
      calculateStats(resultsData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load results";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = () => {
    let filtered = [...results];

    if (selectedExamType !== "all") {
      filtered = filtered.filter(
        (result) =>
          result.examType?.toLowerCase() === selectedExamType.toLowerCase()
      );
    }

    setFilteredResults(filtered);
  };

  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({
        totalExams: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passedExams: 0,
        failedExams: 0,
      });
      return;
    }

    const scores = data.map((r) => r.score || 0);
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / data.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passed = data.filter(
      (r) => (r.score || 0) >= (r.passingScore || 50)
    ).length;
    const failed = data.length - passed;

    setStats({
      totalExams: data.length,
      averageScore: average.toFixed(2),
      highestScore: highest,
      lowestScore: lowest,
      passedExams: passed,
      failedExams: failed,
    });
  };

  const getGradeBadge = (score, passingScore = 50) => {
    if (score >= 90)
      return { variant: "success", label: "A+", text: "Excellent" };
    if (score >= 80)
      return { variant: "success", label: "A", text: "Very Good" };
    if (score >= 70) return { variant: "info", label: "B", text: "Good" };
    if (score >= 60) return { variant: "warning", label: "C", text: "Average" };
    if (score >= passingScore)
      return { variant: "warning", label: "D", text: "Pass" };
    return { variant: "error", label: "F", text: "Fail" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get unique exam types
  const examTypes = [
    "all",
    ...new Set(results.map((r) => r.examType).filter(Boolean)),
  ];

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (loading) {
    return (
      <DashboardLayout title="My Results">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Results"
      subtitle="View your exam results and academic performance"
    >
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exam Type
            </label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {examTypes
                .filter((type) => type !== "all")
                .map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Exams */}
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg mr-4">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalExams}
              </p>
              <p className="text-gray-600 text-sm mt-1">Total Exams</p>
            </div>
          </div>
        </Card>

        {/* Average Score */}
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-info-100 rounded-lg mr-4">
              <BarChart className="h-6 w-6 text-info-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-info-600">
                {stats.averageScore}%
              </p>
              <p className="text-gray-600 text-sm mt-1">Average Score</p>
            </div>
          </div>
        </Card>

        {/* Highest Score */}
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-success-100 rounded-lg mr-4">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-success-600">
                {stats.highestScore}%
              </p>
              <p className="text-gray-600 text-sm mt-1">Highest Score</p>
            </div>
          </div>
        </Card>

        {/* Lowest Score */}
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-warning-100 rounded-lg mr-4">
              <TrendingDown className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-warning-600">
                {stats.lowestScore}%
              </p>
              <p className="text-gray-600 text-sm mt-1">Lowest Score</p>
            </div>
          </div>
        </Card>

        {/* Passed Exams */}
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-success-100 rounded-lg mr-4">
              <Award className="h-6 w-6 text-success-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-success-600">
                {stats.passedExams}
              </p>
              <p className="text-gray-600 text-sm mt-1">Passed</p>
            </div>
          </div>
        </Card>

        {/* Failed Exams */}
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-error-100 rounded-lg mr-4">
              <TrendingDown className="h-6 w-6 text-error-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-error-600">
                {stats.failedExams}
              </p>
              <p className="text-gray-600 text-sm mt-1">Failed</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Results List */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Exam Results
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {filteredResults.length} result
              {filteredResults.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Filter className="h-5 w-5 text-gray-400" />
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600">
              {selectedExamType !== "all" ||
              selectedYear !== new Date().getFullYear().toString()
                ? "Try adjusting your filters"
                : "No exam results available yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result, index) => {
              const grade = getGradeBadge(
                result.score || 0,
                result.passingScore
              );

              return (
                <div
                  key={result._id || index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Exam Info */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {result.examName || "Exam"}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {result.courseName && (
                              <Badge variant="secondary">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {result.courseName}
                              </Badge>
                            )}
                            {result.examType && (
                              <Badge variant="info">
                                {result.examType.charAt(0).toUpperCase() +
                                  result.examType.slice(1)}
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500">
                              {formatDate(result.examDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score & Grade */}
                    <div className="flex items-center gap-6">
                      {/* Score */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Score</p>
                        <p
                          className={`text-3xl font-bold ${
                            (result.score || 0) >= 90
                              ? "text-success-600"
                              : (result.score || 0) >= 70
                              ? "text-info-600"
                              : (result.score || 0) >=
                                (result.passingScore || 50)
                              ? "text-warning-600"
                              : "text-error-600"
                          }`}
                        >
                          {result.score || 0}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Pass: {result.passingScore || 50}%
                        </p>
                      </div>

                      {/* Grade */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Grade</p>
                        <Badge
                          variant={grade.variant}
                          size="lg"
                          className="text-lg px-4 py-2"
                        >
                          {grade.label}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {grade.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remarks */}
                  {result.remarks && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Remarks:</span>{" "}
                        {result.remarks}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}

export default MyResults;

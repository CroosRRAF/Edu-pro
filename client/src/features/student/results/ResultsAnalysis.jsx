import {
  Award,
  BarChart2,
  BookOpen,
  Download,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * Results Analysis Page
 * Detailed analysis of academic performance
 */
function ResultsAnalysis() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [analysis, setAnalysis] = useState({
    overall: {},
    byCourse: [],
    byExamType: [],
    trend: [],
  });

  const { error: showError, success } = useNotification();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear.toString());
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchResults();
    }
  }, [selectedYear]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await studentService.getResults({
        year: selectedYear,
      });

      const resultsData = response.data || [];
      setResults(resultsData);
      analyzeResults(resultsData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load results";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const analyzeResults = (data) => {
    if (data.length === 0) {
      setAnalysis({
        overall: {},
        byCourse: [],
        byExamType: [],
        trend: [],
      });
      return;
    }

    // Overall analysis
    const scores = data.map((r) => r.score || 0);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const average = totalScore / data.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passed = data.filter(
      (r) => (r.score || 0) >= (r.passingScore || 50)
    ).length;
    const passRate = (passed / data.length) * 100;

    // By course
    const courseMap = {};
    data.forEach((result) => {
      const courseName = result.courseName || "Unknown";
      if (!courseMap[courseName]) {
        courseMap[courseName] = [];
      }
      courseMap[courseName].push(result.score || 0);
    });

    const byCourse = Object.entries(courseMap)
      .map(([course, scores]) => ({
        course,
        average: (
          scores.reduce((sum, s) => sum + s, 0) / scores.length
        ).toFixed(2),
        count: scores.length,
        highest: Math.max(...scores),
        lowest: Math.min(...scores),
      }))
      .sort((a, b) => parseFloat(b.average) - parseFloat(a.average));

    // By exam type
    const typeMap = {};
    data.forEach((result) => {
      const type = result.examType || "Other";
      if (!typeMap[type]) {
        typeMap[type] = [];
      }
      typeMap[type].push(result.score || 0);
    });

    const byExamType = Object.entries(typeMap).map(([type, scores]) => ({
      type,
      average: (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(
        2
      ),
      count: scores.length,
    }));

    // Trend analysis (by month if dates available)
    const trend = data
      .filter((r) => r.examDate)
      .sort((a, b) => new Date(a.examDate) - new Date(b.examDate))
      .map((r) => ({
        date: new Date(r.examDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        score: r.score || 0,
        exam: r.examName || "Exam",
      }));

    setAnalysis({
      overall: {
        average: average.toFixed(2),
        highest,
        lowest,
        passRate: passRate.toFixed(1),
        totalExams: data.length,
      },
      byCourse,
      byExamType,
      trend,
    });
  };

  const handleDownloadReport = () => {
    success("Downloading results analysis report...");
    // TODO: Implement PDF download
  };

  const getPerformanceLevel = (average) => {
    if (average >= 90)
      return { label: "Excellent", color: "success", icon: Award };
    if (average >= 75)
      return { label: "Good", color: "info", icon: TrendingUp };
    if (average >= 60)
      return { label: "Average", color: "warning", icon: BarChart2 };
    return { label: "Needs Improvement", color: "error", icon: TrendingDown };
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (loading) {
    return (
      <DashboardLayout title="Results Analysis">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  const performance = getPerformanceLevel(
    parseFloat(analysis.overall.average || 0)
  );
  const PerformanceIcon = performance.icon;

  return (
    <DashboardLayout
      title="Results Analysis"
      subtitle="Comprehensive analysis of your academic performance"
    >
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {/* Header Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Academic Year:
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="primary"
          onClick={handleDownloadReport}
          icon={<Download className="h-4 w-4" />}
        >
          Download Report
        </Button>
      </div>

      {results.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Results Available
            </h3>
            <p className="text-gray-600">
              No exam results found for {selectedYear}
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* Overall Performance */}
          <Card className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Overall Performance - {selectedYear}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total Exams</p>
                <p className="text-3xl font-bold text-primary-700">
                  {analysis.overall.totalExams}
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-info-50 to-info-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Average Score</p>
                <p className="text-3xl font-bold text-info-700">
                  {analysis.overall.average}%
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Highest</p>
                <p className="text-3xl font-bold text-success-700">
                  {analysis.overall.highest}%
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Lowest</p>
                <p className="text-3xl font-bold text-warning-700">
                  {analysis.overall.lowest}%
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Pass Rate</p>
                <p className="text-3xl font-bold text-success-700">
                  {analysis.overall.passRate}%
                </p>
              </div>
            </div>

            {/* Performance Level */}
            <div
              className={`mt-6 p-4 bg-${performance.color}-50 border border-${performance.color}-200 rounded-lg`}
            >
              <div className="flex items-center">
                <PerformanceIcon
                  className={`h-6 w-6 text-${performance.color}-600 mr-3`}
                />
                <div>
                  <p className={`font-semibold text-${performance.color}-900`}>
                    {performance.label} Performance
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {parseFloat(analysis.overall.average) >= 90
                      ? "Outstanding work! You are performing exceptionally well across all subjects."
                      : parseFloat(analysis.overall.average) >= 75
                      ? "Good progress! Keep up the consistent effort in your studies."
                      : parseFloat(analysis.overall.average) >= 60
                      ? "Satisfactory performance. Focus on improving in weaker subjects."
                      : "Your performance needs attention. Consider seeking additional help in challenging subjects."}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance by Course */}
          <Card className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Performance by Course
            </h3>
            <div className="space-y-3">
              {analysis.byCourse.map((course, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {course.course}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {course.count} exam{course.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Average</p>
                        <p
                          className={`text-2xl font-bold ${
                            parseFloat(course.average) >= 90
                              ? "text-success-600"
                              : parseFloat(course.average) >= 75
                              ? "text-info-600"
                              : parseFloat(course.average) >= 60
                              ? "text-warning-600"
                              : "text-error-600"
                          }`}
                        >
                          {course.average}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Range</p>
                        <p className="text-sm font-medium text-gray-800">
                          {course.lowest}% - {course.highest}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance by Exam Type */}
          {analysis.byExamType.length > 0 && (
            <Card className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Performance by Exam Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.byExamType.map((type, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-center">
                      <Badge variant="secondary" size="lg" className="mb-3">
                        {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                      </Badge>
                      <p className="text-3xl font-bold text-gray-800 mb-1">
                        {type.average}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {type.count} exam{type.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Performance Trend */}
          {analysis.trend.length > 0 && (
            <Card>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Performance Trend
              </h3>
              <div className="space-y-2">
                {analysis.trend.slice(-10).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.exam}</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${
                          item.score >= 90
                            ? "text-success-600"
                            : item.score >= 75
                            ? "text-info-600"
                            : item.score >= 60
                            ? "text-warning-600"
                            : "text-error-600"
                        }`}
                      >
                        {item.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </DashboardLayout>
  );
}

export default ResultsAnalysis;

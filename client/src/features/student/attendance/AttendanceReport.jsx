import {
  Award,
  BookOpen,
  Calendar,
  Download,
  Filter,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * Attendance Report Page
 * View detailed attendance reports with analytics
 */
function AttendanceReport() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [viewMode, setViewMode] = useState("monthly"); // 'monthly' or 'detailed'

  const { error: showError, success } = useNotification();

  useEffect(() => {
    // Set current year as default
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear.toString());
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchAttendanceReport();
    }
  }, [selectedYear]);

  const fetchAttendanceReport = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch attendance for the entire year
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const promises = allMonths.map((month) =>
        studentService
          .getAttendance({
            month: month.toString(),
            year: selectedYear,
          })
          .catch(() => ({ data: [] }))
      );

      const results = await Promise.all(promises);
      const yearData = results.flatMap((res) => res.data || []);

      setAttendanceData(yearData);
      setFilteredData(yearData);
      calculateMonthlyStats(yearData);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load attendance report";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyStats = (data) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const statsByMonth = monthNames
      .map((monthName, index) => {
        const monthData = data.filter((record) => {
          const recordDate = new Date(record.date);
          return recordDate.getMonth() === index;
        });

        const total = monthData.length;
        const present = monthData.filter((r) => r.status === "present").length;
        const absent = monthData.filter((r) => r.status === "absent").length;
        const late = monthData.filter((r) => r.status === "late").length;
        const percentage = total > 0 ? ((present + late) / total) * 100 : 0;

        return {
          month: monthName,
          monthNumber: index + 1,
          total,
          present,
          absent,
          late,
          percentage: percentage.toFixed(1),
        };
      })
      .filter((stat) => stat.total > 0); // Only show months with data

    setMonthlyStats(statsByMonth);
  };

  const handleDownloadReport = () => {
    success("Downloading attendance report...");
    // TODO: Implement PDF/CSV download functionality
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return "text-success-600";
    if (percentage >= 75) return "text-info-600";
    if (percentage >= 60) return "text-warning-600";
    return "text-error-600";
  };

  const getPercentageBadge = (percentage) => {
    if (percentage >= 90) return "success";
    if (percentage >= 75) return "info";
    if (percentage >= 60) return "warning";
    return "error";
  };

  // Calculate overall statistics
  const overallStats = {
    total: attendanceData.length,
    present: attendanceData.filter((r) => r.status === "present").length,
    absent: attendanceData.filter((r) => r.status === "absent").length,
    late: attendanceData.filter((r) => r.status === "late").length,
  };
  overallStats.percentage =
    overallStats.total > 0
      ? ((overallStats.present + overallStats.late) / overallStats.total) * 100
      : 0;

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (loading) {
    return (
      <DashboardLayout title="Attendance Report">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Attendance Report"
      subtitle="Comprehensive attendance analytics and reports"
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
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Year Selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Year:</label>
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setViewMode(viewMode === "monthly" ? "detailed" : "monthly")
            }
            icon={<Filter className="h-4 w-4" />}
          >
            {viewMode === "monthly" ? "Detailed View" : "Monthly View"}
          </Button>
          <Button
            variant="primary"
            onClick={handleDownloadReport}
            icon={<Download className="h-4 w-4" />}
          >
            Download Report
          </Button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Days</p>
              <p className="text-3xl font-bold text-gray-800">
                {overallStats.total}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <Calendar className="h-8 w-8 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present</p>
              <p className="text-3xl font-bold text-success-700">
                {overallStats.present}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <Award className="h-8 w-8 text-success-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-error-50 to-error-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-3xl font-bold text-error-700">
                {overallStats.absent}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <Calendar className="h-8 w-8 text-error-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-info-50 to-info-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
              <p
                className={`text-3xl font-bold ${getPercentageColor(
                  overallStats.percentage
                )}`}
              >
                {overallStats.percentage.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <TrendingUp className="h-8 w-8 text-info-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Statistics */}
      {viewMode === "monthly" && (
        <Card>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Monthly Breakdown - {selectedYear}
            </h3>
          </div>

          {monthlyStats.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Data Available
              </h3>
              <p className="text-gray-600">
                No attendance records found for {selectedYear}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Days
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absent
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Late
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyStats.map((stat) => (
                    <tr key={stat.monthNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {stat.month}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {stat.total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-success-600">
                          {stat.present}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-error-600">
                          {stat.absent}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-warning-600">
                          {stat.late}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Badge
                          variant={getPercentageBadge(
                            parseFloat(stat.percentage)
                          )}
                        >
                          {stat.percentage}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Performance Insights */}
      <Card className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Insights
        </h3>
        <div className="space-y-4">
          {/* Attendance Rate Analysis */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <TrendingUp
                className={`h-5 w-5 mr-3 mt-0.5 ${
                  overallStats.percentage >= 90
                    ? "text-success-600"
                    : overallStats.percentage >= 75
                    ? "text-info-600"
                    : "text-warning-600"
                }`}
              />
              <div>
                <p className="font-medium text-gray-900">
                  {overallStats.percentage >= 90
                    ? "Excellent Attendance!"
                    : overallStats.percentage >= 75
                    ? "Good Attendance"
                    : "Needs Improvement"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {overallStats.percentage >= 90
                    ? "You are maintaining an excellent attendance record. Keep up the great work!"
                    : overallStats.percentage >= 75
                    ? "Your attendance is good, but there is room for improvement."
                    : "Your attendance is below the recommended level. Try to improve your regularity."}
                </p>
              </div>
            </div>
          </div>

          {/* Best Month */}
          {monthlyStats.length > 0 && (
            <div className="p-4 bg-success-50 rounded-lg">
              <div className="flex items-start">
                <Award className="h-5 w-5 text-success-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Best Month</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {
                      monthlyStats.reduce((best, current) =>
                        parseFloat(current.percentage) >
                        parseFloat(best.percentage)
                          ? current
                          : best
                      ).month
                    }{" "}
                    with{" "}
                    {
                      monthlyStats.reduce((best, current) =>
                        parseFloat(current.percentage) >
                        parseFloat(best.percentage)
                          ? current
                          : best
                      ).percentage
                    }
                    % attendance
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default AttendanceReport;

import {
  Calendar,
  CheckCircle,
  Clock,
  Minus,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, Badge, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * My Attendance Page
 * View personal attendance records and statistics
 */
function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { error: showError } = useNotification();

  useEffect(() => {
    // Set current month and year as default
    const now = new Date();
    setSelectedMonth((now.getMonth() + 1).toString());
    setSelectedYear(now.getFullYear().toString());
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchAttendance();
    }
  }, [selectedMonth, selectedYear]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        month: selectedMonth,
        year: selectedYear,
      };

      const response = await studentService.getAttendance(params);
      const attendanceData = response.data || [];

      setAttendance(attendanceData);
      calculateStats(attendanceData);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load attendance";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const present = data.filter((a) => a.status === "present").length;
    const absent = data.filter((a) => a.status === "absent").length;
    const late = data.filter((a) => a.status === "late").length;
    const percentage = total > 0 ? ((present + late) / total) * 100 : 0;

    setStats({
      total,
      present,
      absent,
      late,
      percentage: percentage.toFixed(1),
    });
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return (
          <Badge variant="success">
            <CheckCircle className="h-3 w-3 mr-1" />
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="error">
            <XCircle className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge variant="warning">
            <Clock className="h-3 w-3 mr-1" />
            Late
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Minus className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const time = new Date(timeString);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate month and year options
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (loading) {
    return (
      <DashboardLayout title="My Attendance">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Attendance"
      subtitle="View your attendance records and statistics"
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
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
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
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Total Days */}
        <Card>
          <div className="text-center">
            <div className="p-3 bg-info-100 rounded-lg inline-block mb-2">
              <Calendar className="h-6 w-6 text-info-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-gray-600 text-sm mt-1">Total Days</p>
          </div>
        </Card>

        {/* Present */}
        <Card>
          <div className="text-center">
            <div className="p-3 bg-success-100 rounded-lg inline-block mb-2">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <p className="text-3xl font-bold text-success-600">
              {stats.present}
            </p>
            <p className="text-gray-600 text-sm mt-1">Present</p>
          </div>
        </Card>

        {/* Absent */}
        <Card>
          <div className="text-center">
            <div className="p-3 bg-error-100 rounded-lg inline-block mb-2">
              <XCircle className="h-6 w-6 text-error-600" />
            </div>
            <p className="text-3xl font-bold text-error-600">{stats.absent}</p>
            <p className="text-gray-600 text-sm mt-1">Absent</p>
          </div>
        </Card>

        {/* Late */}
        <Card>
          <div className="text-center">
            <div className="p-3 bg-warning-100 rounded-lg inline-block mb-2">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
            <p className="text-3xl font-bold text-warning-600">{stats.late}</p>
            <p className="text-gray-600 text-sm mt-1">Late</p>
          </div>
        </Card>

        {/* Attendance Rate */}
        <Card>
          <div className="text-center">
            <div
              className={`p-3 rounded-lg inline-block mb-2 ${
                stats.percentage >= 75
                  ? "bg-success-100"
                  : stats.percentage >= 50
                  ? "bg-warning-100"
                  : "bg-error-100"
              }`}
            >
              {stats.percentage >= 75 ? (
                <TrendingUp className="h-6 w-6 text-success-600" />
              ) : stats.percentage >= 50 ? (
                <Minus className="h-6 w-6 text-warning-600" />
              ) : (
                <TrendingDown className="h-6 w-6 text-error-600" />
              )}
            </div>
            <p
              className={`text-3xl font-bold ${
                stats.percentage >= 75
                  ? "text-success-600"
                  : stats.percentage >= 50
                  ? "text-warning-600"
                  : "text-error-600"
              }`}
            >
              {stats.percentage}%
            </p>
            <p className="text-gray-600 text-sm mt-1">Attendance Rate</p>
          </div>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Attendance Records
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {months.find((m) => m.value === selectedMonth)?.label}{" "}
            {selectedYear}
          </p>
        </div>

        {attendance.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Attendance Records
            </h3>
            <p className="text-gray-600">
              No attendance records found for the selected period
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((record, index) => (
                  <tr key={record._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(record.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTime(record.checkInTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {record.remarks || "-"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}

export default MyAttendance;

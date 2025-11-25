import { Calendar, ChevronRight, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Badge, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * My Sports Page
 * View sports activities that the student has joined
 */
function MySports() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { error: showError } = useNotification();

  useEffect(() => {
    fetchMySports();
  }, []);

  const fetchMySports = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await studentService.getSports();
      const sportsData = response.data || [];

      setSports(sportsData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load sports";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMore = () => {
    navigate(`${ROUTES.STUDENT_SPORTS}/join`);
  };

  const handleViewSport = (sportId) => {
    navigate(`${ROUTES.STUDENT_SPORTS}/${sportId}`);
  };

  if (loading) {
    return (
      <DashboardLayout title="My Sports">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Sports"
      subtitle="Sports activities you have joined"
    >
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            My Sports Activities
          </h2>
          <p className="text-gray-600 mt-1">
            {sports.length} sport{sports.length !== 1 ? "s" : ""} joined
          </p>
        </div>
        <Button variant="primary" onClick={handleJoinMore}>
          Join More Sports
        </Button>
      </div>

      {/* Quick Stats */}
      {sports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                {sports.length}
              </p>
              <p className="text-gray-600 mt-1">Total Sports</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-success-600">
                {sports.filter((s) => s.status === "active").length}
              </p>
              <p className="text-gray-600 mt-1">Active</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-info-600">
                {sports.reduce((sum, s) => sum + (s.sessions?.length || 0), 0)}
              </p>
              <p className="text-gray-600 mt-1">Total Sessions</p>
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {sports.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Sports Activities Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't joined any sports activities. Start by joining a
              sport!
            </p>
            <Button variant="primary" onClick={handleJoinMore}>
              Browse Sports
            </Button>
          </div>
        </Card>
      ) : (
        /* Sports Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <Card key={sport._id} className="hover:shadow-lg transition-shadow">
              {/* Sport Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1">
                    {sport.sportName || "Sport"}
                  </h3>
                  <Badge
                    variant={
                      sport.status === "active" ? "success" : "secondary"
                    }
                  >
                    {sport.status || "Active"}
                  </Badge>
                </div>
                {sport.sportID && (
                  <p className="text-sm text-gray-500">{sport.sportID}</p>
                )}
              </div>

              {/* Sport Description */}
              {sport.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {sport.description}
                </p>
              )}

              {/* Sport Info */}
              <div className="space-y-2 mb-4">
                {/* Coach */}
                {sport.coach && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-primary-500" />
                    <span>Coach: {sport.coach.name || "N/A"}</span>
                  </div>
                )}

                {/* Schedule */}
                {sport.schedule && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                    <span>{sport.schedule}</span>
                  </div>
                )}

                {/* Sessions */}
                {sport.sessions && sport.sessions.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Trophy className="h-4 w-4 mr-2 text-primary-500" />
                    <span>
                      {sport.sessions.length} Session
                      {sport.sessions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Join Date */}
              {sport.joinedDate && (
                <div className="pt-4 border-t border-gray-200 mb-4">
                  <p className="text-xs text-gray-500">
                    Joined:{" "}
                    {new Date(sport.joinedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              {/* Action Button */}
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleViewSport(sport._id)}
                icon={<ChevronRight className="h-4 w-4" />}
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default MySports;

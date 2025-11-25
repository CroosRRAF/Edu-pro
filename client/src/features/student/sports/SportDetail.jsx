import {
  Award,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Clock,
  MapPin,
  Trophy,
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
 * Sport Detail Page
 * View detailed information about a specific sport
 */
function SportDetail() {
  const { id } = useParams();
  const [sport, setSport] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();
  const { success, error: showError } = useNotification();

  useEffect(() => {
    if (id) {
      fetchSportDetail();
      checkJoinStatus();
    }
  }, [id]);

  const fetchSportDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminService.getSportById(id);
      setSport(response.data);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load sport details";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const checkJoinStatus = async () => {
    try {
      const response = await studentService.getSports();
      const joinedSports = response.data || [];
      const joined = joinedSports.some((s) => s._id === id);
      setIsJoined(joined);
    } catch (err) {
      console.error("Failed to check join status:", err);
    }
  };

  const handleJoin = async () => {
    try {
      setJoining(true);

      await studentService.joinSport(id);

      success(`Successfully joined ${sport.sportName}!`);
      setIsJoined(true);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to join sport";
      showError(errorMsg);
    } finally {
      setJoining(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackToMySports = () => {
    navigate(ROUTES.STUDENT_SPORTS);
  };

  if (loading) {
    return (
      <DashboardLayout title="Sport Details">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  if (error || !sport) {
    return (
      <DashboardLayout title="Sport Details">
        <Alert type="error" message={error || "Sport not found"} />
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
    <DashboardLayout title={sport.sportName} subtitle={sport.sportID}>
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
              {sport.sportName}
            </h2>
            {sport.description && (
              <p className="text-gray-600 text-lg">{sport.description}</p>
            )}
          </div>

          <div className="ml-6">
            {isJoined ? (
              <Badge variant="success" size="lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Joined
              </Badge>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleJoin}
                loading={joining}
                disabled={joining}
              >
                {joining ? "Joining..." : "Join Sport"}
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
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {sport.participants?.length || 0}
              </p>
              <p className="text-gray-600 text-sm">Participants</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-success-100 rounded-lg mr-4">
              <Trophy className="h-6 w-6 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {sport.sessions?.length || 0}
              </p>
              <p className="text-gray-600 text-sm">Sessions</p>
            </div>
          </div>
        </Card>

        {sport.coach && (
          <Card className="md:col-span-2">
            <div className="flex items-center">
              <div className="p-3 bg-info-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-info-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {sport.coach.name || "N/A"}
                </p>
                <p className="text-gray-600 text-sm">Coach</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="schedule">Schedule</Tab>
          <Tab value="participants">Participants</Tab>
        </TabList>

        {/* Overview Tab */}
        <TabPanel value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  About This Sport
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {sport.description ||
                    "No description available for this sport."}
                </p>
              </Card>

              {/* Sport Information */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Sport Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Sport ID:</span>
                    <span className="font-medium text-gray-800">
                      {sport.sportID}
                    </span>
                  </div>
                  {sport.schedule && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium text-gray-800">
                        {sport.schedule}
                      </span>
                    </div>
                  )}
                  {sport.venue && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Venue:</span>
                      <span className="font-medium text-gray-800 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {sport.venue}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium text-gray-800">
                      {sport.participants?.length || 0}
                    </span>
                  </div>
                  {sport.coach && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Coach:</span>
                      <span className="font-medium text-gray-800">
                        {sport.coach.name}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Status */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Join Status
                </h3>
                {isJoined ? (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 mx-auto text-success-600 mb-3" />
                    <p className="text-gray-700 font-medium mb-2">
                      You are a member
                    </p>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleBackToMySports}
                      className="mt-4"
                    >
                      View My Sports
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Clock className="h-12 w-12 mx-auto text-warning-600 mb-3" />
                    <p className="text-gray-700 font-medium mb-2">
                      Not yet joined
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Join to participate in activities and sessions
                    </p>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleJoin}
                      loading={joining}
                      disabled={joining}
                    >
                      {joining ? "Joining..." : "Join Now"}
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabPanel>

        {/* Schedule Tab */}
        <TabPanel value="schedule">
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Training Schedule
            </h3>

            {sport.sessions && sport.sessions.length > 0 ? (
              <div className="space-y-3">
                {sport.sessions.map((session, index) => (
                  <div
                    key={session._id || index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {session.title || `Session ${index + 1}`}
                        </h4>
                        <div className="space-y-2">
                          {session.date && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(session.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          )}
                          {session.time && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {session.time}
                            </div>
                          )}
                          {session.venue && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              {session.venue}
                            </div>
                          )}
                        </div>
                      </div>
                      {isJoined && (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Registered
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  {sport.schedule || "No training sessions scheduled yet"}
                </p>
              </div>
            )}
          </Card>
        </TabPanel>

        {/* Participants Tab */}
        <TabPanel value="participants">
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Participants
            </h3>

            {sport.participants && sport.participants.length > 0 ? (
              <div className="space-y-3">
                {sport.participants.map((participant, index) => (
                  <div
                    key={participant._id || index}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {participant.name || "Student"}
                          </p>
                          {participant.studentID && (
                            <p className="text-sm text-gray-500">
                              {participant.studentID}
                            </p>
                          )}
                        </div>
                      </div>
                      {participant._id === sport.coach?._id && (
                        <Badge variant="warning">
                          <Award className="h-3 w-3 mr-1" />
                          Coach
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No participants yet</p>
                {!isJoined && (
                  <Button
                    variant="primary"
                    onClick={handleJoin}
                    loading={joining}
                    disabled={joining}
                    className="mt-4"
                  >
                    Be the First to Join
                  </Button>
                )}
              </div>
            )}
          </Card>
        </TabPanel>
      </Tabs>
    </DashboardLayout>
  );
}

export default SportDetail;

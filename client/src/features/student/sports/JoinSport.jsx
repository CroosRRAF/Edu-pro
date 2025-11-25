import { CheckCircle, ChevronRight, Search, Trophy, Users } from "lucide-react";
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
import { adminService } from "../../../services/adminService";
import { studentService } from "../../../services/studentService";

/**
 * Join Sport Page
 * Browse and join available sports activities
 */
function JoinSport() {
  const [allSports, setAllSports] = useState([]);
  const [joinedSports, setJoinedSports] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { success, error: showError } = useNotification();

  useEffect(() => {
    fetchSports();
  }, []);

  useEffect(() => {
    filterSports();
  }, [searchTerm, allSports, joinedSports]);

  const fetchSports = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all available sports
      const sportsResponse = await adminService.getAllSports();
      const allSportsData = sportsResponse.data || [];

      // Fetch student's joined sports
      const joinedResponse = await studentService.getSports();
      const joinedData = joinedResponse.data || [];

      setAllSports(allSportsData);
      setJoinedSports(joinedData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load sports";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const filterSports = () => {
    let filtered = [...allSports];

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (sport) =>
          sport.sportName?.toLowerCase().includes(search) ||
          sport.description?.toLowerCase().includes(search) ||
          sport.sportID?.toLowerCase().includes(search) ||
          sport.coach?.name?.toLowerCase().includes(search)
      );
    }

    setFilteredSports(filtered);
  };

  const isJoined = (sportId) => {
    return joinedSports.some((sport) => sport._id === sportId);
  };

  const handleJoin = async (sportId, sportName) => {
    try {
      setJoining((prev) => ({ ...prev, [sportId]: true }));

      await studentService.joinSport(sportId);

      success(`Successfully joined ${sportName}!`);

      // Refresh sports
      await fetchSports();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to join sport";
      showError(errorMsg);
    } finally {
      setJoining((prev) => ({ ...prev, [sportId]: false }));
    }
  };

  const handleViewSport = (sportId) => {
    navigate(`${ROUTES.STUDENT_SPORTS}/${sportId}`);
  };

  const handleBackToMySports = () => {
    navigate(ROUTES.STUDENT_SPORTS);
  };

  if (loading) {
    return (
      <DashboardLayout title="Join Sport">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Join Sport">
        <Alert type="error" message={error} onClose={() => setError(null)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Join Sport"
      subtitle="Browse and join available sports activities"
    >
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Available Sports</h2>
          <p className="text-gray-600 mt-1">
            {filteredSports.length} sport
            {filteredSports.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <Button variant="outline" onClick={handleBackToMySports}>
          Back to My Sports
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <Input
          placeholder="Search sports by name, coach, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-5 w-5" />}
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">
              {allSports.length}
            </p>
            <p className="text-gray-600 mt-1">Total Sports</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-success-600">
              {joinedSports.length}
            </p>
            <p className="text-gray-600 mt-1">Joined</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-info-600">
              {allSports.length - joinedSports.length}
            </p>
            <p className="text-gray-600 mt-1">Available to Join</p>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      {filteredSports.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Sports Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search"
                : "No sports are available at this time"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Sports Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSports.map((sport) => {
            const joined = isJoined(sport._id);
            const isJoiningThis = joining[sport._id];

            return (
              <Card
                key={sport._id}
                className={`hover:shadow-lg transition-shadow ${
                  joined ? "border-2 border-success-500" : ""
                }`}
              >
                {/* Sport Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
                      {sport.sportName}
                    </h3>
                    {joined ? (
                      <Badge variant="success" className="ml-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Joined
                      </Badge>
                    ) : (
                      <Badge variant="info" className="ml-2">
                        Available
                      </Badge>
                    )}
                  </div>
                  {sport.sportID && (
                    <p className="text-sm text-gray-500">{sport.sportID}</p>
                  )}
                </div>

                {/* Sport Description */}
                {sport.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                      <Trophy className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{sport.schedule}</span>
                    </div>
                  )}

                  {/* Participants */}
                  {sport.participants && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-primary-500" />
                      <span>
                        {sport.participants.length} Participant
                        {sport.participants.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {joined ? (
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => handleViewSport(sport._id)}
                      icon={<ChevronRight className="h-4 w-4" />}
                    >
                      View Details
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleJoin(sport._id, sport.sportName)}
                        loading={isJoiningThis}
                        disabled={isJoiningThis}
                      >
                        {isJoiningThis ? "Joining..." : "Join Now"}
                      </Button>
                      <button
                        onClick={() => handleViewSport(sport._id)}
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

export default JoinSport;

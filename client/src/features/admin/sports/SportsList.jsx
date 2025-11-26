import {
  Edit,
  Eye,
  Filter,
  Plus,
  Search,
  Target,
  Trash2,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, TableSkeleton } from "../../../components/common";
import Alert from "../../../components/common/Alert";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import Table from "../../../components/common/Table";
import { ROUTES } from "../../../constants/routes";
import { adminService } from "../../../services/adminService";

export default function SportsList() {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    coaches: 0,
    totalParticipants: 0,
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [sportTypeFilter, setSportTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Delete modal
  const [deleteModal, setDeleteModal] = useState({ open: false, sport: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSports();
  }, [currentPage, searchTerm, sportTypeFilter, statusFilter]);

  const fetchSports = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        type: sportTypeFilter,
        status: statusFilter,
      };

      const response = await adminService.getAllSports(params);

      if (response.data) {
        const sportsData = Array.isArray(response.data)
          ? response.data
          : response.data.sports || [];
        setSports(sportsData);

        // Calculate stats
        const total = sportsData.length;
        const active = sportsData.filter((s) => s.coach).length;
        const uniqueCoaches = new Set(
          sportsData.map((s) => s.coach?._id).filter(Boolean)
        );
        const totalParticipants = sportsData.reduce(
          (sum, s) => sum + (s.participants?.length || 0),
          0
        );

        setStats({
          total,
          active,
          coaches: uniqueCoaches.size,
          totalParticipants,
        });

        // Set pagination
        const totalCount = response.data.total || sportsData.length;
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      }
    } catch (err) {
      console.error("Error fetching sports:", err);
      setError(err.response?.data?.message || "Failed to load sports");
      setSports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.sport) return;

    try {
      setDeleting(true);
      await adminService.deleteSport(deleteModal.sport._id);

      setDeleteModal({ open: false, sport: null });
      fetchSports();
    } catch (err) {
      console.error("Error deleting sport:", err);
      setError(err.response?.data?.message || "Failed to delete sport");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "sportName",
      label: "Sport Name",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="font-semibold">{value}</span>
        </div>
      ),
    },
    {
      key: "coach",
      label: "Coach",
      render: (value) => (
        <span className="text-sm">
          {value?.name || (
            <span className="text-muted-foreground">Not Assigned</span>
          )}
        </span>
      ),
    },
    {
      key: "captain",
      label: "Captain",
      render: (value) => (
        <div className="flex items-center gap-1">
          {value?.name ? (
            <>
              <UserCheck className="w-3 h-3 text-success" />
              <span className="text-sm">{value.name}</span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">No Captain</span>
          )}
        </div>
      ),
    },
    {
      key: "participants",
      label: "Participants",
      render: (value) => (
        <Badge variant="info">{value?.length || 0} students</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (_, sport) => {
        const hasCoach = sport.coach;
        const hasParticipants = sport.participants?.length > 0;

        if (hasCoach && hasParticipants) {
          return <Badge variant="success">Active</Badge>;
        } else if (hasCoach) {
          return <Badge variant="warning">Coach Assigned</Badge>;
        } else {
          return <Badge variant="secondary">Inactive</Badge>;
        }
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, sport) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(`${ROUTES.ADMIN_ROUTES.SPORTS}/${sport._id}`)
            }
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(`${ROUTES.ADMIN_ROUTES.SPORTS}/edit/${sport._id}`)
            }
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteModal({ open: true, sport })}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sports Management</h1>
          <p className="text-muted-foreground">
            Manage sports activities and teams
          </p>
        </div>
        <Button
          onClick={() => navigate(`${ROUTES.ADMIN_ROUTES.SPORTS}/create`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sport
        </Button>
      </div>

      {/* Error Message */}
      {error && <Alert type="error">{error}</Alert>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sports</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Target className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Sports</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-info/10 rounded-lg">
              <UserCheck className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Coaches</p>
              <p className="text-2xl font-bold">{stats.coaches}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Users className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="text-2xl font-bold">{stats.totalParticipants}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search sports..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            icon={Search}
          />

          <Select
            value={sportTypeFilter}
            onChange={(e) => {
              setSportTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: "", label: "All Sport Types" },
              { value: "team", label: "Team Sports" },
              { value: "individual", label: "Individual Sports" },
              { value: "indoor", label: "Indoor Sports" },
              { value: "outdoor", label: "Outdoor Sports" },
            ]}
            icon={Filter}
          />

          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: "", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "hasCoach", label: "Has Coach" },
              { value: "hasParticipants", label: "Has Participants" },
              { value: "inactive", label: "Inactive" },
            ]}
            icon={Filter}
          />
        </div>
      </Card>

      {/* Table */}
      <Card>
        {sports.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sports found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first sport
            </p>
            <Button
              onClick={() => navigate(`${ROUTES.ADMIN_ROUTES.SPORTS}/create`)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Sport
            </Button>
          </div>
        ) : (
          <>
            <Table columns={columns} data={sports} />

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() =>
          !deleting && setDeleteModal({ open: false, sport: null })
        }
        title="Delete Sport"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete{" "}
            <strong>{deleteModal.sport?.sportName}</strong>? This action cannot
            be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, sport: null })}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

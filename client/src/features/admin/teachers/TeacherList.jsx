import {
  Download,
  Edit,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../../../components/common";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Loader from "../../../components/common/Loader";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import Table from "../../../components/common/Table";
import { ROUTES } from "../../../constants/routes";
import { adminService } from "../../../services/adminService";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const itemsPerPage = 10;

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch teachers
  useEffect(() => {
    fetchTeachers();
  }, [currentPage, searchQuery, subjectFilter, statusFilter]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        subject: subjectFilter,
        status: statusFilter,
      };

      const response = await adminService.getTeachers(params);

      if (response.data.success) {
        setTeachers(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalTeachers(response.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError(err.response?.data?.message || "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSubjectFilter = (e) => {
    setSubjectFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!teacherToDelete) return;

    try {
      setDeleting(true);
      await adminService.deleteTeacher(teacherToDelete._id);

      fetchTeachers();
      setDeleteModal(false);
      setTeacherToDelete(null);
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert(err.response?.data?.message || "Failed to delete teacher");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: "success",
      inactive: "secondary",
      onLeave: "warning",
      resigned: "destructive",
    };
    return (
      <Badge variant={statusMap[status] || "default"}>{status || "N/A"}</Badge>
    );
  };

  const columns = [
    {
      header: "Teacher ID",
      accessor: "teacherId",
      cell: (row) => (
        <span className="font-mono text-sm">{row.teacherId || "N/A"}</span>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {row.name?.charAt(0).toUpperCase() || "T"}
            </span>
          </div>
          <div>
            <div className="font-medium">{row.name || "N/A"}</div>
            <div className="text-xs text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Subjects",
      accessor: "subjects",
      cell: (row) => {
        const subjects = Array.isArray(row.subjects) ? row.subjects : [];
        if (subjects.length === 0)
          return <span className="text-muted-foreground">None</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 2).map((subject, idx) => (
              <Badge key={idx} variant="info" size="sm">
                {subject.name || subject}
              </Badge>
            ))}
            {subjects.length > 2 && (
              <Badge variant="secondary" size="sm">
                +{subjects.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      header: "Classes",
      accessor: "classes",
      cell: (row) => {
        const classes = Array.isArray(row.classes) ? row.classes : [];
        return <span className="font-medium">{classes.length || 0}</span>;
      },
    },
    {
      header: "Phone",
      accessor: "phone",
      cell: (row) => row.phone || "N/A",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Joined",
      accessor: "joiningDate",
      cell: (row) =>
        row.joiningDate
          ? new Date(row.joiningDate).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`${ROUTES.ADMIN_ROUTES.TEACHERS}/${row._id}`}>
            <Button variant="ghost" size="sm" title="View Details">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`${ROUTES.ADMIN_ROUTES.TEACHERS}/edit/${row._id}`}>
            <Button variant="ghost" size="sm" title="Edit">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            title="Delete"
            onClick={() => handleDeleteClick(row)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>
          <p className="text-muted-foreground">
            Manage teaching staff and assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`${ROUTES.ADMIN_ROUTES.TEACHERS}/create`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total Teachers</div>
          <div className="text-2xl font-bold mt-1">{totalTeachers}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Active</div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {teachers.filter((t) => t.status === "active").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">On Leave</div>
          <div className="text-2xl font-bold mt-1 text-orange-600">
            {teachers.filter((t) => t.status === "onLeave").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Subjects Taught</div>
          <div className="text-2xl font-bold mt-1 text-blue-600">
            {teachers.reduce(
              (acc, t) =>
                acc + (Array.isArray(t.subjects) ? t.subjects.length : 0),
              0
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name, email, or teacher ID..."
              value={searchQuery}
              onChange={handleSearch}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {(subjectFilter || statusFilter) && (
              <Badge variant="primary" className="ml-2">
                {[subjectFilter, statusFilter].filter(Boolean).length}
              </Badge>
            )}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <Select
              label="Subject"
              value={subjectFilter}
              onChange={handleSubjectFilter}
              options={[
                { value: "", label: "All Subjects" },
                { value: "Mathematics", label: "Mathematics" },
                { value: "Science", label: "Science" },
                { value: "English", label: "English" },
                { value: "History", label: "History" },
                { value: "Geography", label: "Geography" },
                { value: "Physics", label: "Physics" },
                { value: "Chemistry", label: "Chemistry" },
                { value: "Biology", label: "Biology" },
              ]}
            />
            <Select
              label="Status"
              value={statusFilter}
              onChange={handleStatusFilter}
              options={[
                { value: "", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "onLeave", label: "On Leave" },
                { value: "resigned", label: "Resigned" },
              ]}
            />
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSubjectFilter("");
                  setStatusFilter("");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Teachers Table */}
      <div className="bg-card rounded-lg border">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchTeachers} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No teachers found</p>
            <Link to={`${ROUTES.ADMIN_ROUTES.TEACHERS}/create`}>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add First Teacher
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Table columns={columns} data={teachers} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t p-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => !deleting && setDeleteModal(false)}
        title="Delete Teacher"
        size="sm"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete{" "}
            <strong>{teacherToDelete?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteModal(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
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

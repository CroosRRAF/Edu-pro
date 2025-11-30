import {
  Download,
  Edit,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../../../components/common";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import Table from "../../../components/common/Table";
import { ROUTES } from "../../../constants/routes";
import { adminService } from "../../../services/adminService";
import { studentListReportTemplate } from "../../../utils/exportHelpers";
import { LazyExportButton as ExportButton } from "../../../utils/lazyLoad";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const itemsPerPage = 10;

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchQuery, classFilter, statusFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        class: classFilter,
        status: statusFilter,
      };

      const response = await adminService.getAllStudents(params);

      if (response.data.success) {
        setStudents(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalStudents(response.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleClassFilter = (e) => {
    setClassFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;

    try {
      setDeleting(true);
      await adminService.deleteStudent(studentToDelete._id);

      // Refresh list
      fetchStudents();
      setDeleteModal(false);
      setStudentToDelete(null);
    } catch (err) {
      console.error("Error deleting student:", err);
      alert(err.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: "success",
      inactive: "secondary",
      suspended: "warning",
      graduated: "info",
    };
    return (
      <Badge variant={statusMap[status] || "default"}>{status || "N/A"}</Badge>
    );
  };

  const columns = [
    {
      header: "Student ID",
      accessor: "studentId",
      cell: (row) => (
        <span className="font-mono text-sm">{row.studentId || "N/A"}</span>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {row.name?.charAt(0).toUpperCase() || "S"}
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
      header: "Class",
      accessor: "class",
      cell: (row) => row.class?.name || "Not assigned",
    },
    {
      header: "Roll Number",
      accessor: "rollNumber",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Enrolled",
      accessor: "enrollmentDate",
      cell: (row) =>
        row.enrollmentDate
          ? new Date(row.enrollmentDate).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`${ROUTES.ADMIN_ROUTES.STUDENTS}/${row._id}`}>
            <Button variant="ghost" size="sm" title="View Details">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`${ROUTES.ADMIN_ROUTES.STUDENTS}/edit/${row._id}`}>
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
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage student records and enrollments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            data={students.map((s) => ({
              studentId: s.studentId || s._id,
              name: s.name,
              email: s.email,
              grade: s.grade,
              class: s.class?.name || "Not assigned",
              gender: s.gender,
              contact: s.contact || "N/A",
              enrollmentDate: s.enrollmentDate,
            }))}
            columns={studentListReportTemplate.columns}
            filename="students_list"
            title="Student List Report"
            metadata={{ generatedBy: "Admin", generatedAt: new Date() }}
            variant="outline"
          />
          <Link to={`${ROUTES.ADMIN_ROUTES.STUDENTS}/import`}>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Import
            </Button>
          </Link>
          <Link to={`${ROUTES.ADMIN_ROUTES.STUDENTS}/create`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total Students</div>
          <div className="text-2xl font-bold mt-1">{totalStudents}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Active</div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {students.filter((s) => s.status === "active").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Inactive</div>
          <div className="text-2xl font-bold mt-1 text-gray-600">
            {students.filter((s) => s.status === "inactive").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Suspended</div>
          <div className="text-2xl font-bold mt-1 text-orange-600">
            {students.filter((s) => s.status === "suspended").length}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name, email, or student ID..."
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
            {(classFilter || statusFilter) && (
              <Badge variant="primary" className="ml-2">
                {[classFilter, statusFilter].filter(Boolean).length}
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
              label="Class"
              value={classFilter}
              onChange={handleClassFilter}
              options={[
                { value: "", label: "All Classes" },
                { value: "Class 1", label: "Class 1" },
                { value: "Class 2", label: "Class 2" },
                { value: "Class 3", label: "Class 3" },
                { value: "Class 4", label: "Class 4" },
                { value: "Class 5", label: "Class 5" },
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
                { value: "suspended", label: "Suspended" },
                { value: "graduated", label: "Graduated" },
              ]}
            />
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setClassFilter("");
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

      {/* Students Table */}
      <div className="bg-card rounded-lg border">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchStudents} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No students found</p>
            <Link to={`${ROUTES.ADMIN_ROUTES.STUDENTS}/create`}>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add First Student
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Table columns={columns} data={students} />

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
        title="Delete Student"
        size="sm"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete{" "}
            <strong>{studentToDelete?.name}</strong>? This action cannot be
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

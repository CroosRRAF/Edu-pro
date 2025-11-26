import {
  BookOpen,
  Clock,
  Edit,
  Eye,
  Filter,
  GraduationCap,
  Plus,
  Search,
  Trash2,
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

export default function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    byGrade: 0,
    totalModules: 0,
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Delete modal
  const [deleteModal, setDeleteModal] = useState({ open: false, course: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchTerm, gradeFilter, statusFilter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        grade: gradeFilter,
        status: statusFilter,
      };

      const response = await adminService.getAllCourses(params);

      if (response.data) {
        const coursesData = Array.isArray(response.data)
          ? response.data
          : response.data.courses || [];
        setCourses(coursesData);

        // Calculate stats
        const total = coursesData.length;
        const active = coursesData.filter((c) => c.teacher).length;
        const totalModules = coursesData.reduce(
          (sum, c) => sum + (c.modules?.length || 0),
          0
        );

        setStats({
          total,
          active,
          byGrade: gradeFilter ? total : coursesData.length,
          totalModules,
        });

        // Set pagination
        const totalCount = response.data.total || coursesData.length;
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.response?.data?.message || "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.course) return;

    try {
      setDeleting(true);
      await adminService.deleteCourse(deleteModal.course._id);

      setDeleteModal({ open: false, course: null });
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      setError(err.response?.data?.message || "Failed to delete course");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "courseID",
      label: "Course Code",
      render: (value) => (
        <span className="font-mono font-semibold text-primary">{value}</span>
      ),
    },
    {
      key: "courseName",
      label: "Course Name",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "grade",
      label: "Grade",
      render: (value) => <Badge variant="info">Grade {value}</Badge>,
    },
    {
      key: "teacher",
      label: "Teacher",
      render: (value) => (
        <span className="text-sm">
          {value?.name || (
            <span className="text-muted-foreground">Not Assigned</span>
          )}
        </span>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      render: (value) => <span className="text-sm">{value} weeks</span>,
    },
    {
      key: "modules",
      label: "Modules",
      render: (value) => (
        <Badge variant="secondary">{value?.length || 0} modules</Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, course) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(`${ROUTES.ADMIN_ROUTES.COURSES}/${course._id}`)
            }
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(`${ROUTES.ADMIN_ROUTES.COURSES}/edit/${course._id}`)
            }
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteModal({ open: true, course })}
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
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage courses and curriculum</p>
        </div>
        <Button
          onClick={() => navigate(`${ROUTES.ADMIN_ROUTES.COURSES}/create`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Error Message */}
      {error && <Alert type="error">{error}</Alert>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <GraduationCap className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">With Teachers</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-info/10 rounded-lg">
              <Users className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grade Levels</p>
              <p className="text-2xl font-bold">10</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Modules</p>
              <p className="text-2xl font-bold">{stats.totalModules}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            icon={Search}
          />

          <Select
            value={gradeFilter}
            onChange={(e) => {
              setGradeFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: "", label: "All Grades" },
              { value: "1", label: "Grade 1" },
              { value: "2", label: "Grade 2" },
              { value: "3", label: "Grade 3" },
              { value: "4", label: "Grade 4" },
              { value: "5", label: "Grade 5" },
              { value: "6", label: "Grade 6" },
              { value: "7", label: "Grade 7" },
              { value: "8", label: "Grade 8" },
              { value: "9", label: "Grade 9" },
              { value: "10", label: "Grade 10" },
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
              { value: "assigned", label: "Teacher Assigned" },
              { value: "unassigned", label: "No Teacher" },
              { value: "hasModules", label: "With Modules" },
            ]}
            icon={Filter}
          />
        </div>
      </Card>

      {/* Table */}
      <Card>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first course
            </p>
            <Button
              onClick={() => navigate(`${ROUTES.ADMIN_ROUTES.COURSES}/create`)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </div>
        ) : (
          <>
            <Table columns={columns} data={courses} />

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
          !deleting && setDeleteModal({ open: false, course: null })
        }
        title="Delete Course"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the course{" "}
            <strong>{deleteModal.course?.courseName}</strong>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, course: null })}
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

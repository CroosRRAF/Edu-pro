# 🎨 Component Usage Guide

## Quick Reference for Using Edu-Pro Components

---

## 📘 **Common Components**

### **Button**

```jsx
import { Button } from '@/components/common';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Submit
</Button>

// With icon
<Button
  variant="success"
  icon={<CheckIcon />}
  iconPosition="left"
>
  Save Changes
</Button>

// Loading state
<Button loading={isSubmitting}>
  Processing...
</Button>

// Full width
<Button fullWidth variant="primary">
  Sign In
</Button>
```

### **Input**

```jsx
import { Input } from "@/components/common";
import { Mail } from "lucide-react";

<Input
  label="Email Address"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon={<Mail className="h-5 w-5" />}
  error={errors.email}
  required
/>;
```

### **Select**

```jsx
import { Select } from "@/components/common";

<Select
  label="School Type"
  name="schoolType"
  value={schoolType}
  onChange={(e) => setSchoolType(e.target.value)}
  options={[
    { value: "boys", label: "Boys' School" },
    { value: "girls", label: "Girls' School" },
    { value: "mixed", label: "Mixed School" },
  ]}
  error={errors.schoolType}
  required
/>;
```

### **Modal**

```jsx
import { Modal, Button } from "@/components/common";

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add New Student"
  size="lg"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Save
      </Button>
    </>
  }
>
  {/* Modal content */}
</Modal>;
```

### **Card**

```jsx
import { Card } from "@/components/common";

<Card
  title="Student Statistics"
  subtitle="Overview of student enrollment"
  footer={<Button variant="link">View Details</Button>}
>
  {/* Card content */}
</Card>;
```

### **Badge**

```jsx
import { Badge } from '@/components/common';

<Badge variant="success">Active</Badge>
<Badge variant="danger">Suspended</Badge>
<Badge variant="warning">Pending</Badge>
```

### **Alert**

```jsx
import { Alert } from "@/components/common";

<Alert
  type="success"
  title="Success!"
  message="Student created successfully"
  onClose={() => setShowAlert(false)}
/>;
```

### **Table**

```jsx
import { Table, Pagination } from '@/components/common';

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  {
    header: 'Status',
    accessor: 'status',
    render: (value) => <Badge variant={value === 'active' ? 'success' : 'danger'}>{value}</Badge>
  }
];

<Table
  columns={columns}
  data={students}
  loading={loading}
  onRowClick={(row) => navigate(`/students/${row.id}`)}
/>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
```

---

## 🏗️ **Layout Components**

### **DashboardLayout**

```jsx
import { DashboardLayout } from "@/components/layout";

function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Your dashboard content */}
    </DashboardLayout>
  );
}
```

### **AuthLayout**

```jsx
import { AuthLayout } from "@/components/layout";

function Login() {
  return <AuthLayout>{/* Your login form */}</AuthLayout>;
}
```

---

## 🪝 **Custom Hooks**

### **useAuth**

```jsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, role, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome {user.name}</div>;
}
```

### **useApi**

```jsx
import { useApi } from "@/hooks/useApi";
import { adminService } from "@/services/adminService";

function StudentList() {
  const { data, loading, error, execute } = useApi(adminService.getAllStudents);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Alert type="error" message={error} />;

  return <Table data={data} />;
}
```

### **usePermissions**

```jsx
import { usePermissions } from "@/hooks/usePermissions";

function StudentActions({ student }) {
  const { canEdit, canDelete } = usePermissions();

  return (
    <div>
      {canEdit("students") && (
        <Button onClick={() => editStudent(student)}>Edit</Button>
      )}
      {canDelete("students") && (
        <Button variant="danger" onClick={() => deleteStudent(student)}>
          Delete
        </Button>
      )}
    </div>
  );
}
```

### **useDebounce**

```jsx
import { useDebounce } from "@/hooks/useDebounce";

function SearchBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Perform search
      searchStudents(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

---

## 🌐 **API Services**

### **Authentication**

```jsx
import { adminAuth, studentAuth } from "@/services/authService";

// Admin login
const handleAdminLogin = async () => {
  try {
    const response = await adminAuth.login({ email, password });
    // Token automatically saved to localStorage
    navigate("/admin/dashboard");
  } catch (error) {
    console.error(error);
  }
};

// Student register
const handleStudentRegister = async () => {
  try {
    const response = await studentAuth.register(formData);
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};
```

### **Admin Operations**

```jsx
import { adminService } from "@/services/adminService";

// Get all students
const students = await adminService.getAllStudents();

// Create student
const newStudent = await adminService.createStudent(studentData);

// Update student
const updated = await adminService.updateStudent(id, updatedData);

// Delete student
await adminService.deleteStudent(id);
```

---

## 🎨 **Context Usage**

### **AuthContext**

```jsx
import { useAuthContext } from "@/context/AuthContext";

function Header() {
  const { user, logout } = useAuthContext();

  return (
    <div>
      <span>{user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### **NotificationContext**

```jsx
import { useNotification } from "@/context/NotificationContext";

function StudentForm() {
  const { success, error } = useNotification();

  const handleSubmit = async () => {
    try {
      await adminService.createStudent(data);
      success("Student created successfully!");
    } catch (err) {
      error("Failed to create student");
    }
  };
}
```

### **ThemeContext**

```jsx
import { useTheme } from "@/context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
  );
}
```

---

## 🛠️ **Utilities**

### **Formatters**

```jsx
import { formatDate, formatCurrency, formatID } from "@/utils/formatters";

formatDate(new Date()); // "Nov 24, 2025"
formatCurrency(1000); // "$1,000.00"
formatID("sch_010m"); // "SCH-010M"
truncateText("Long text...", 20); // "Long text..."
capitalizeWords("hello world"); // "Hello World"
```

### **Validators**

```jsx
import { isValidEmail, validatePassword } from "@/utils/validators";

isValidEmail("test@example.com"); // true
validatePassword("weak"); // { isValid: false, errors: [...] }
```

### **Date Helpers**

```jsx
import { addDays, diffInDays, getAge } from "@/utils/dateHelpers";

addDays(new Date(), 7); // Date 7 days from now
diffInDays(date1, date2); // Difference in days
getAge(birthDate); // Age in years
```

---

## 🔒 **Protected Routes**

```jsx
import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLES } from "@/constants/roles";

<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.PRINCIPAL]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>;
```

---

## 📱 **Responsive Design Classes**

```jsx
// Mobile first approach
<div className="px-4 sm:px-6 lg:px-8">        // Responsive padding
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">  // Responsive grid
<div className="text-sm sm:text-base lg:text-lg">  // Responsive text
```

---

## 🎯 **Best Practices**

1. **Always use constants** for routes and roles
2. **Wrap API calls** in try-catch blocks
3. **Use loading states** for better UX
4. **Implement error handling** for all forms
5. **Validate user input** before API calls
6. **Use debounce** for search inputs
7. **Memoize expensive operations** with useMemo/useCallback
8. **Keep components small** and focused
9. **Use TypeScript** for better type safety (optional)
10. **Test components** before integration

---

**Happy Coding! 🚀**

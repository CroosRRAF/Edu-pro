import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Badge, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * My Books Page
 * View student's issued books with due dates and return status
 */
function MyBooks() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returning, setReturning] = useState(null);

  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useNotification();

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      // This endpoint needs to be implemented in studentService
      // For now, using placeholder. Backend should provide student's issued books
      const response = (await studentService.getIssuedBooks?.()) || {
        data: [],
      };
      const booksData = response.data || [];

      setIssuedBooks(booksData);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load issued books";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      setReturning(bookId);

      // This endpoint needs to be implemented in studentService
      await studentService.returnBook?.(bookId);

      showSuccess("Book return request submitted successfully");
      fetchIssuedBooks(); // Reload books
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to return book";
      showError(errorMsg);
    } finally {
      setReturning(null);
    }
  };

  const calculateDaysRemaining = (dueDate) => {
    if (!dueDate) return null;

    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const calculateFine = (dueDate, finePerDay = 5) => {
    const daysRemaining = calculateDaysRemaining(dueDate);
    if (daysRemaining === null || daysRemaining >= 0) return 0;

    return Math.abs(daysRemaining) * finePerDay;
  };

  const getDueDateBadge = (dueDate) => {
    const daysRemaining = calculateDaysRemaining(dueDate);

    if (daysRemaining === null) {
      return { variant: "default", text: "No due date" };
    }

    if (daysRemaining < 0) {
      return {
        variant: "error",
        text: `Overdue by ${Math.abs(daysRemaining)} days`,
      };
    }

    if (daysRemaining === 0) {
      return { variant: "warning", text: "Due today" };
    }

    if (daysRemaining <= 3) {
      return { variant: "warning", text: `${daysRemaining} days left` };
    }

    return { variant: "success", text: `${daysRemaining} days left` };
  };

  const handleBackToCatalog = () => {
    navigate(ROUTES.STUDENT_LIBRARY);
  };

  // Calculate statistics
  const totalFines = issuedBooks.reduce(
    (sum, book) => sum + calculateFine(book.dueDate),
    0
  );
  const overdueBooks = issuedBooks.filter(
    (book) => calculateDaysRemaining(book.dueDate) < 0
  );

  if (loading) {
    return (
      <DashboardLayout title="My Books">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Books"
      subtitle="View your issued books and due dates"
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
          <h2 className="text-2xl font-bold text-gray-800">My Issued Books</h2>
          <p className="text-gray-600 mt-1">
            {issuedBooks.length} book{issuedBooks.length !== 1 ? "s" : ""}{" "}
            currently issued
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleBackToCatalog}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Catalog
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">
              {issuedBooks.length}
            </p>
            <p className="text-gray-600 mt-1">Books Issued</p>
          </div>
        </Card>

        <Card
          className={
            overdueBooks.length > 0 ? "border-error-200 bg-error-50" : ""
          }
        >
          <div className="text-center">
            <p
              className={`text-3xl font-bold ${
                overdueBooks.length > 0 ? "text-error-600" : "text-success-600"
              }`}
            >
              {overdueBooks.length}
            </p>
            <p className="text-gray-600 mt-1">Overdue Books</p>
          </div>
        </Card>

        <Card
          className={totalFines > 0 ? "border-warning-200 bg-warning-50" : ""}
        >
          <div className="text-center">
            <p
              className={`text-3xl font-bold ${
                totalFines > 0 ? "text-warning-600" : "text-success-600"
              }`}
            >
              ₹{totalFines}
            </p>
            <p className="text-gray-600 mt-1">Total Fines</p>
          </div>
        </Card>
      </div>

      {/* Fine Warning */}
      {totalFines > 0 && (
        <Alert
          type="warning"
          message={`You have pending fines of ₹${totalFines}. Please return overdue books and pay fines at the library.`}
          className="mb-6"
        />
      )}

      {/* Empty State */}
      {issuedBooks.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Books Issued
            </h3>
            <p className="text-gray-600 mb-6">
              You don't have any books issued from the library
            </p>
            <Button onClick={handleBackToCatalog}>Browse Book Catalog</Button>
          </div>
        </Card>
      ) : (
        /* Books List */
        <div className="space-y-4">
          {issuedBooks.map((book) => {
            const dueDateInfo = getDueDateBadge(book.dueDate);
            const fine = calculateFine(book.dueDate);
            const isReturning = returning === book._id;

            return (
              <Card
                key={book._id}
                className={fine > 0 ? "border-error-200" : ""}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* Book Info */}
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start mb-2">
                      <BookOpen className="h-5 w-5 text-primary-500 mr-2 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {book.bookTitle || book.title || "Untitled Book"}
                        </h3>
                        {book.author && (
                          <p className="text-sm text-gray-600 mt-1">
                            by {book.author}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {/* Issue Date */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-info-500" />
                        <span>
                          <span className="font-medium">Issued:</span>{" "}
                          {book.issueDate
                            ? new Date(book.issueDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-warning-500" />
                        <span>
                          <span className="font-medium">Due:</span>{" "}
                          {book.dueDate
                            ? new Date(book.dueDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      {/* ISBN */}
                      {book.isbn && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">ISBN:</span> {book.isbn}
                        </div>
                      )}

                      {/* Fine */}
                      {fine > 0 && (
                        <div className="flex items-center text-sm text-error-600">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <span className="font-medium">Fine: ₹{fine}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    <Badge variant={dueDateInfo.variant}>
                      {dueDateInfo.text}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReturnBook(book._id)}
                      disabled={isReturning}
                      icon={<RotateCcw className="h-4 w-4" />}
                    >
                      {isReturning ? "Returning..." : "Return Book"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info Footer */}
      {issuedBooks.length > 0 && (
        <Card className="mt-6 bg-info-50 border-info-200">
          <div className="text-sm text-info-800">
            <p className="font-medium mb-2">Library Policy:</p>
            <ul className="list-disc list-inside space-y-1 text-info-700">
              <li>Fine for overdue books: ₹5 per day</li>
              <li>Maximum issue period: 14 days (can be extended once)</li>
              <li>
                Please return or renew books before the due date to avoid fines
              </li>
            </ul>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default MyBooks;

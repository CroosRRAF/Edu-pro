import { ArrowLeft, BookPlus, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Input } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { ROUTES } from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * Book Request Page
 * Request new books to be added to the library
 */
function BookRequest() {
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    publisher: "",
    isbn: "",
    edition: "",
    category: "",
    reasonForRequest: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.bookTitle.trim()) {
      setError("Book title is required");
      return;
    }

    if (!formData.author.trim()) {
      setError("Author name is required");
      return;
    }

    if (!formData.reasonForRequest.trim()) {
      setError("Please provide a reason for your request");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // This endpoint needs to be implemented in studentService
      await studentService.requestBook?.(formData);

      showSuccess(
        "Book request submitted successfully. The librarian will review your request."
      );

      // Reset form
      setFormData({
        bookTitle: "",
        author: "",
        publisher: "",
        isbn: "",
        edition: "",
        category: "",
        reasonForRequest: "",
      });

      // Navigate back after a short delay
      setTimeout(() => {
        navigate(ROUTES.STUDENT_LIBRARY);
      }, 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to submit book request";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToCatalog = () => {
    navigate(ROUTES.STUDENT_LIBRARY);
  };

  return (
    <DashboardLayout
      title="Request Book"
      subtitle="Request new books to be added to the library"
    >
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Request a Book</h2>
          <p className="text-gray-600 mt-1">
            Can't find a book? Request it to be added to our library
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

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {/* Request Form */}
      <div className="max-w-3xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Title */}
            <div>
              <label
                htmlFor="bookTitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Book Title <span className="text-error-500">*</span>
              </label>
              <Input
                id="bookTitle"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Author <span className="text-error-500">*</span>
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Publisher and Edition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="publisher"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Publisher
                </label>
                <Input
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Enter publisher name"
                />
              </div>

              <div>
                <label
                  htmlFor="edition"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Edition
                </label>
                <Input
                  id="edition"
                  name="edition"
                  value={formData.edition}
                  onChange={handleChange}
                  placeholder="e.g., 5th Edition, 2023"
                />
              </div>
            </div>

            {/* ISBN and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="isbn"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ISBN
                </label>
                <Input
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="Enter ISBN (optional)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  ISBN helps us identify the exact book
                </p>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select category</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Literature">Literature</option>
                  <option value="History">History</option>
                  <option value="Technology">Technology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts">Arts</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Reference">Reference</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Reason for Request */}
            <div>
              <label
                htmlFor="reasonForRequest"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason for Request <span className="text-error-500">*</span>
              </label>
              <textarea
                id="reasonForRequest"
                name="reasonForRequest"
                value={formData.reasonForRequest}
                onChange={handleChange}
                placeholder="Why do you need this book? How will it help your studies?"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Provide a detailed reason to help the librarian process your
                request
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                icon={<Send className="h-4 w-4" />}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToCatalog}
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-info-50 border-info-200">
          <div className="flex items-start">
            <BookPlus className="h-5 w-5 text-info-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-info-800">
              <p className="font-medium mb-2">Book Request Guidelines:</p>
              <ul className="list-disc list-inside space-y-1 text-info-700">
                <li>Your request will be reviewed by the librarian</li>
                <li>Approval depends on relevance to curriculum and budget</li>
                <li>
                  You'll be notified once the book is available or if the
                  request is declined
                </li>
                <li>
                  Please provide accurate book details for faster processing
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default BookRequest;

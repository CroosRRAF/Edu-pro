import { Book, BookOpen, ChevronRight, Filter, Search } from "lucide-react";
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

/**
 * Book Catalog Page
 * Browse and search available books in the library
 */
function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();
  const { error: showError } = useNotification();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchTerm, selectedCategory, books]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminService.getAllBooks();
      const booksData = response.data || [];

      setBooks(booksData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load books";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = [...books];

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title?.toLowerCase().includes(search) ||
          book.author?.toLowerCase().includes(search) ||
          book.isbn?.toLowerCase().includes(search) ||
          book.publisher?.toLowerCase().includes(search)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (book) =>
          book.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredBooks(filtered);
  };

  const handleViewBook = (bookId) => {
    // For now, just show a message. Can implement book detail view later
    navigate(`${ROUTES.STUDENT_LIBRARY}/${bookId}`);
  };

  const handleViewMyBooks = () => {
    navigate(`${ROUTES.STUDENT_LIBRARY}/my-books`);
  };

  const getAvailabilityBadge = (book) => {
    const available = (book.totalCopies || 0) - (book.issuedCopies || 0);
    if (available > 5) return { variant: "success", text: "Available" };
    if (available > 0) return { variant: "warning", text: `${available} left` };
    return { variant: "error", text: "Not Available" };
  };

  // Get unique categories
  const categories = [
    "all",
    ...new Set(books.map((b) => b.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <DashboardLayout title="Book Catalog">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Book Catalog"
      subtitle="Browse and search library books"
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
          <h2 className="text-2xl font-bold text-gray-800">Library Books</h2>
          <p className="text-gray-600 mt-1">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>
        <Button variant="outline" onClick={handleViewMyBooks}>
          My Issued Books
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <Input
            placeholder="Search by title, author, ISBN, or publisher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5" />}
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            {categories
              .filter((c) => c !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">
              {books.length}
            </p>
            <p className="text-gray-600 mt-1">Total Books</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-success-600">
              {
                books.filter(
                  (b) => (b.totalCopies || 0) - (b.issuedCopies || 0) > 0
                ).length
              }
            </p>
            <p className="text-gray-600 mt-1">Available</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-info-600">
              {categories.length - 1}
            </p>
            <p className="text-gray-600 mt-1">Categories</p>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Books Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your filters"
                : "No books are available in the library"}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Books Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const availability = getAvailabilityBadge(book);

            return (
              <Card
                key={book._id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewBook(book._id)}
              >
                {/* Book Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {book.title}
                      </h3>
                      {book.author && (
                        <p className="text-sm text-gray-600 mt-1">
                          by {book.author}
                        </p>
                      )}
                    </div>
                    <Badge variant={availability.variant} className="ml-2">
                      {availability.text}
                    </Badge>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-2 mb-4">
                  {book.category && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Filter className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{book.category}</span>
                    </div>
                  )}

                  {book.isbn && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Book className="h-4 w-4 mr-2 text-primary-500" />
                      <span>ISBN: {book.isbn}</span>
                    </div>
                  )}

                  {book.publisher && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Publisher:</span>{" "}
                      {book.publisher}
                    </div>
                  )}
                </div>

                {/* Availability Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Total: {book.totalCopies || 0} copies
                    </span>
                    <span className="text-gray-600">
                      Issued: {book.issuedCopies || 0}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <Button
                  variant="ghost"
                  fullWidth
                  className="mt-4"
                  icon={<ChevronRight className="h-4 w-4" />}
                >
                  View Details
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

export default BookCatalog;

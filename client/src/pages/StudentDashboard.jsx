import React, { useState, useEffect } from 'react';
import api from "../utils/axiosInstance"; // Import custom Axios instance

const StudentDashboard = () => {
  const [data, setData] = useState({ student: null, attendance: [], library: [], results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve student data and token from localStorage
        const studentData = JSON.parse(localStorage.getItem("studentData"));
        const token = localStorage.getItem("studentToken");

        if (!studentData || !studentData._id || !token) {
          setError("You are not logged in. Please log in to view the dashboard.");
          setLoading(false);
          return;
        }

        // Use studentData._id for the API call
        const studentId = studentData._id;
        const response = await api.get(`/students/${studentId}/dashboard`);
        setData({
          student: response.data.student,
          attendance: response.data.attendance,
          library: response.data.library,
          results: response.data.results,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array since studentId is retrieved inside useEffect

  if (loading) {
    return <div className="text-center p-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!data.student) {
    return <div className="text-center p-8 text-gray-600">No student data found.</div>;
  }

  // Profile Component
  const Profile = ({ student }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile</h2>
      <div className="space-y-2">
        <p><strong className="text-gray-600">Student ID:</strong> {student.studentID}</p>
        <p><strong className="text-gray-600">Name:</strong> {student.name}</p>
        <p><strong className="text-gray-600">Email:</strong> {student.email}</p>
        <p><strong className="text-gray-600">Contact:</strong> {student.contact}</p>
        <p><strong className="text-gray-600">Birth Date:</strong> {new Date(student.birth).toLocaleDateString()}</p>
        <p><strong className="text-gray-600">Gender:</strong> {student.gender}</p>
        <p><strong className="text-gray-600">Status:</strong> {student.status}</p>
      </div>
    </div>
  );

  // Courses Component
  const Courses = ({ courses }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enrolled Courses</h2>
      <ul className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.courseID}>
              <p className="font-semibold">{course.courseName} ({course.courseID})</p>
              <p className="text-sm text-gray-600">
                Modules: {course.modules.length > 0 ? course.modules.map((m) => m.moduleName).join(', ') : 'None'}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No courses enrolled.</p>
        )}
      </ul>
    </div>
  );

  // Sports Component
  const Sports = ({ sports }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Sports</h2>
      <ul className="space-y-4">
        {sports.length > 0 ? (
          sports.map((sport, index) => (
            <li key={index}>
              <p className="font-semibold">{sport.sportName} - <span className="text-gray-600">Role: {sport.captain}</span></p>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No sports enrolled.</p>
        )}
      </ul>
    </div>
  );

  // Library Component
  const Library = ({ records }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Library Records</h2>
      {records.length > 0 ? (
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Book Title</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Borrow Date</th>
              <th className="p-3">Return Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Fine</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{record.bookTitle}</td>
                <td className="p-3">{record.isbn}</td>
                <td className="p-3">{new Date(record.borrowDate).toLocaleDateString()}</td>
                <td className="p-3">{record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                <td className="p-3">{record.status}</td>
                <td className="p-3">${record.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No library records found.</p>
      )}
    </div>
  );

  // Attendance Component
  const Attendance = ({ records }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance (Last 10 Days)</h2>
      {records.length > 0 ? (
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{new Date(record.date).toLocaleDateString()}</td>
                <td className="p-3">{record.present ? 'Present' : 'Absent'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No attendance records found.</p>
      )}
    </div>
  );

  // Results Component
  const Results = ({ results }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Academic Results</h2>
      {results.length > 0 ? (
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Module</th>
              <th className="p-3">Score</th>
              <th className="p-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{result.module.moduleName}</td>
                <td className="p-3">{result.score}</td>
                <td className="p-3">{result.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Profile student={data.student} />
        <Courses courses={data.student.courses} />
        <Sports sports={data.student.sports} />
        <Library records={data.library} />
        <Attendance records={data.attendance} />
        <Results results={data.results} />
      </div>
    </div>
  );
};

export default StudentDashboard;
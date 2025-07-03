import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import StudentRegister from "./components/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/register" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
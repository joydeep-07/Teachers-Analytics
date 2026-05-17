import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import Root from "./layouts/Root";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTeachers from "./pages/admin/ManageTeachers";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import MyAttendance from "./pages/teacher/MyAttendance";
import RegisterTeacher from "./pages/admin/RegisterTeacher";
import EditTeacher from "./pages/admin/EditTeacher";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="attendance" element={<div>Admin Attendance</div>} />
            <Route path="leaves" element={<div>Admin Leaves</div>} />
            <Route path="salary" element={<div>Admin Salary</div>} />
            <Route path="register-teacher" element={<RegisterTeacher />} />
            <Route path="teachers/:id" element={<EditTeacher/> } />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="attendance" element={<MyAttendance />} />
            <Route path="leaves" element={<div>My Leaves</div>} />
            <Route path="salary" element={<div>My Salary</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

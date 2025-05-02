import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddEmployeeForm from "./components/admin/AddEmployeeForm";
import EmployeeSearch from "./components/admin/EmployeeSearch";
import GeneratePayrollForm from "./components/admin/GeneratePayrollForm";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Redirect root */}
      <Route
        path="/"
        element={
          <Navigate
            to={user.role === "admin" ? "/admin" : "/employee"}
            replace
          />
        }
      />

      {/* Admin area */}
      {user.role === "admin" && (
        <Route element={<AdminLayout user={user} />}>
          {/* landing dashboard could be at /admin */}
          <Route path="/admin" element={<AdminDashboard user={user} />} />
          <Route path="/admin/add" element={<AddEmployeeForm />} />
          <Route path="/admin/search" element={<EmployeeSearch />} />
          <Route path="/admin/generate" element={<GeneratePayrollForm />} />
        </Route>
      )}

      {/* Employee area */}
      {user.role === "employee" && (
        <Route
          path="/employee"
          element={<EmployeeDashboard empid={user.empid} />}
        />
      )}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

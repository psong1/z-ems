import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddEmployeeForm from "./components/admin/AddEmployeeForm";
import EmployeeSearch from "./components/admin/EmployeeSearch";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import AdminPayrollPanel from "./components/admin/PayrollAdminPanel";
import AdminUpdateSalary from "./components/admin/AdminUpdateSalary";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [user, setUser] = useState(null);

  // 1) If not logged in, only show login (any other path → /login)
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // 2) Once logged in, show protected routes (no more /login)
  return (
    <Routes>
      {/* Redirect root → appropriate dashboard */}
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
        <Route
          path="/admin"
          element={<AdminLayout user={user} setUser={setUser} />}
        >
          <Route index element={<AdminDashboard user={user} />} />
          <Route path="add" element={<AddEmployeeForm />} />
          <Route path="search" element={<EmployeeSearch />} />
          <Route path="generate" element={<AdminPayrollPanel />} />
          <Route path="update" element={<AdminUpdateSalary />} />
        </Route>
      )}

      {/* Employee area */}
      {user.role === "employee" && (
        <Route
          path="/employee"
          element={<EmployeeDashboard empid={user.empid} setUser={setUser} />}
        />
      )}

      {/* Catch‑all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

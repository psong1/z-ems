import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddEmployeeForm from "./components/admin/AddEmployeeForm";
import EmployeeSearch from "./components/admin/EmployeeSearch";
import GeneratePayrollForm from "./components/admin/GeneratePayrollForm";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage setUser={setUser} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={user.role === "admin" ? "/admin" : "/employee"}
              replace
            />
          }
        />
        {/* Admin routes */}
        {user.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add" element={<AddEmployeeForm />} />
            <Route path="/admin/search" element={<EmployeeSearch />} />
            <Route path="/admin/generate" element={<GeneratePayrollForm />} />
          </>
        )}
        {/* Employee routes */}
        {user.role === "employee" && (
          <Route
            path="/employee"
            element={<EmployeeDashboard empid={user.empid} />}
          />
        )}
        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

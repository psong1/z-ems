// src/components/admin/AdminLayout.jsx
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ user }) {
  return (
    <>
      <AdminNavbar user={user} />
      <div style={{ padding: "1rem" }}>
        {/* Any admin page (add/search/generate) will be rendered here */}
        <Outlet />
      </div>
    </>
  );
}

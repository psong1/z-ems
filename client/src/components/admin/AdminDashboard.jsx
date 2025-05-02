import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ user }) {
  const nav = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>
        Welcome, {user.fname} {user.lname}!
      </h1>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => nav("/admin/add")}>➕ Add Employee</button>{" "}
        <button onClick={() => nav("/admin/search")}>
          🔍 Search / Update Employee
        </button>{" "}
        <button onClick={() => nav("/admin/generate")}>
          📝 Generate Payroll
        </button>
      </div>
    </div>
  );
}

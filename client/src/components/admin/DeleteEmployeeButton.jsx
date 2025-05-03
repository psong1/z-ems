import React from "react";
import { Button } from "react-bootstrap";
import { deleteEmployee } from "../../api/admin";

export default function DeleteEmployeeButton({ empid, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      const res = await deleteEmployee(empid);
      alert(res.status || "Deleted");
      if (onDeleted) onDeleted(empid);
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Delete Employee
    </Button>
  );
}

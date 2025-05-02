import { deleteEmployee } from "../../api/admin";

export default function DeleteEmployeeButton({ empid }) {
  const handleDelete = async () => {
    if (window.confirm("Delete this employee?")) {
      try {
        const res = await deleteEmployee({ empid });
        alert(res.status || "Deleted");
      } catch {
        alert("Delete failed");
      }
    }
  };

  return <button onClick={handleDelete}>Delete Employee</button>;
}

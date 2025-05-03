import { useState } from "react";
import { updateEmployee as apiUpdateEmployee } from "../../api/admin";

export default function UpdateEmployeeForm({ employee }) {
  const [form, setForm] = useState({ ...employee });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiUpdateEmployee(form.empid, form);
      setMsg("Employee updated successfully");
    } catch (err) {
      console.error(err);
      setMsg("Update failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h3>Update Employee</h3>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, val]) =>
          key === "empid" ? null : (
            <input
              key={key}
              name={key}
              value={val ?? ""}
              onChange={handleChange}
              placeholder={key}
            />
          )
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

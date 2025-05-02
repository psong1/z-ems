import { useState } from "react";
import { updateEmployee } from "../../api/admin";

export default function UpdateEmployeeForm({ employee }) {
  const [form, setForm] = useState({ ...employee });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateEmployee(form);
      setMsg(res.status || "Updated");
    } catch {
      setMsg("Update failed");
    }
  };

  return (
    <div>
      <h3>Update Employee</h3>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map(
          (key) =>
            key !== "empid" && (
              <input
                key={key}
                name={key}
                value={form[key]}
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

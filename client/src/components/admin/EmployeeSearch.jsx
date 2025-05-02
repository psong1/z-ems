import { useState } from "react";
import { getEmployee } from "../../api/admin";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import DeleteEmployeeButton from "./DeleteEmployeeButton";

export default function EmployeeSearch() {
  const [query, setQuery] = useState({
    empid: "",
    fname: "",
    lname: "",
    ssn: "",
  });
  const [employee, setEmployee] = useState(null);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((q) => ({ ...q, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.empid && !query.fname && !query.lname && !query.ssn) {
      setMsg("Please fill at least one search field");
      return;
    }
    try {
      const data = await getEmployee(query);
      setEmployee(data);
      setMsg("");
      setEditing(false);
    } catch {
      setMsg("Employee not found");
      setEmployee(null);
    }
  };

  return (
    <div>
      <h2>Search Employee</h2>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <form onSubmit={handleSearch}>
        <input
          name="empid"
          value={query.empid}
          onChange={handleChange}
          placeholder="Employee ID"
        />
        <input
          name="fname"
          value={query.fname}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="lname"
          value={query.lname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="ssn"
          value={query.ssn}
          onChange={handleChange}
          placeholder="SSN"
        />
        <button type="submit">Search</button>
      </form>

      {employee && (
        <div style={{ marginTop: 20 }}>
          <h3>Employee Details</h3>
          <table>
            <tbody>
              {Object.entries(employee).map(([key, val]) => {
                if (val == null || key === "password") return null;
                return (
                  <tr key={key}>
                    <th style={{ textAlign: "left", paddingRight: 10 }}>
                      {key}
                    </th>
                    <td>{val.toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: 20 }}>
            <button onClick={() => setEditing((e) => !e)}>
              {editing ? "Cancel" : "Edit Employee"}
            </button>
            <DeleteEmployeeButton empid={employee.empid} />
          </div>

          {editing && <UpdateEmployeeForm employee={employee} />}
        </div>
      )}
    </div>
  );
}

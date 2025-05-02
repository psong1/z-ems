import { useState } from "react";
import { generatePayroll } from "../../api/admin";

export default function GeneratePayrollForm() {
  const [empid, setEmpid] = useState("");
  const [salary, setSalary] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await generatePayroll({ empid, salary });
      setMsg(res.status || "Payroll generated");
    } catch {
      setMsg("Failed to generate");
    }
  };

  return (
    <div>
      <h2>Generate Payroll</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={empid}
          onChange={(e) => setEmpid(e.target.value)}
          placeholder="Employee ID"
          required
        />
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
          required
        />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
}

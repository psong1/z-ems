import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { addEmployee } from "../../api/admin";

export default function AddEmployeeForm() {
  const [form, setForm] = useState({
    empid: "",
    fname: "",
    lname: "",
    hireDate: "",
    salary: "",
    ssn: "",
    username: "",
    password: "",
    role: "employee",
  });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addEmployee(form);
      setMsg({ variant: "success", text: res.status || "Employee added" });
      setTimeout(() => nav("/admin"), 1000);
    } catch (err) {
      const serverMsg =
        err.response?.data?.error || err.message || "Failed to add employee";
      setMsg({ variant: "danger", text: serverMsg });
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {msg && <Alert variant={msg.variant}>{msg.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="empid">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              name="empid"
              type="number"
              min="1"
              value={form.empid}
              onChange={handleChange}
              placeholder="e.g. 101"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="fname"
              value={form.fname}
              onChange={handleChange}
              placeholder="e.g. Jane"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lname"
              value={form.lname}
              onChange={handleChange}
              placeholder="e.g. Doe"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="hireDate">
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
              name="hireDate"
              type="date"
              value={form.hireDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              name="salary"
              type="number"
              step="0.01"
              min="0"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. 50000"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="ssn">
            <Form.Label>SSN</Form.Label>
            <Form.Control
              name="ssn"
              value={form.ssn}
              onChange={handleChange}
              placeholder="123-45-6789"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              defaultValue="password"
              value={form.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={form.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Employee
        </Button>
      </Form>
    </div>
  );
}

import { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
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
  const [msg, setMsg] = useState({ text: "", variant: "" });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((q) => ({ ...q, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.empid && !query.fname && !query.lname && !query.ssn) {
      setMsg({
        text: "Please fill at least one search field",
        variant: "warning",
      });
      return;
    }
    try {
      const data = await getEmployee(query.empid);
      setEmployee(data);
      setMsg({ text: "", variant: "" });
      setEditing(false);
    } catch {
      setMsg({ text: "Employee not found", variant: "danger" });
      setEmployee(null);
    }
  };

  const handleDeleted = (deletedId) => {
    setEmployee(null);
    setMsg({ text: `Employee ${deletedId} deleted`, variant: "success" });
  };

  return (
    <Container className="mt-4">
      <h2>Search / Edit Employee</h2>

      {msg.text && <Alert variant={msg.variant}>{msg.text}</Alert>}

      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control
              name="empid"
              value={query.empid}
              onChange={handleChange}
              placeholder="Employee ID"
            />
          </Col>
          <Col md={3}>
            <Form.Control
              name="fname"
              value={query.fname}
              onChange={handleChange}
              placeholder="First Name"
            />
          </Col>
          <Col md={3}>
            <Form.Control
              name="lname"
              value={query.lname}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </Col>
          <Col md={3}>
            <Form.Control
              name="ssn"
              value={query.ssn}
              onChange={handleChange}
              placeholder="SSN"
            />
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>

      {employee && (
        <>
          <hr />

          <h3>Employee Details</h3>
          <Table bordered hover responsive>
            <tbody>
              {Object.entries(employee).map(([key, val]) => {
                if (val == null || key === "password") return null;

                let label;
                if (key === "empid") label = "Employee ID";
                else if (key === "fname") label = "First Name";
                else if (key === "lname") label = "Last Name";
                else if (key === "email") label = "Email";
                else if (key === "hireDate") label = "Hire Date";
                else if (key === "salary") label = "Salary";
                else if (key === "ssn") label = "SSN";
                else if (key === "username") label = "Username";
                else if (key === "role") label = "Role";
                else label = key;

                let display;
                if (key === "hireDate") {
                  display = new Date(val).toLocaleDateString();
                } else if (key === "salary") {
                  display = "$" + Number(val).toFixed(2);
                } else {
                  display = val.toString();
                }

                return (
                  <tr key={key}>
                    <th>{label}</th>
                    <td>{display}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Row className="mb-3">
            <Col>
              <Button
                variant={editing ? "secondary" : "warning"}
                onClick={() => setEditing((e) => !e)}
              >
                {editing ? "Cancel" : "Edit Employee"}
              </Button>
            </Col>
            <Col className="text-end">
              <DeleteEmployeeButton
                empid={employee.empid}
                onDeleted={handleDeleted}
              />
            </Col>
          </Row>

          {editing && <UpdateEmployeeForm employee={employee} />}
        </>
      )}
    </Container>
  );
}

import React, { useState } from "react";
import {
  Form,
  Button,
  Table,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { updateSalary } from "../../api/admin";

export default function AdminUpdateSalary() {
  const [percentage, setPercentage] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [updatedEmployees, setUpdatedEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUpdatedEmployees([]);
    setLoading(true);

    try {
      const data = await updateSalary({
        percentage: parseFloat(percentage),
        minSalary: parseFloat(minSalary),
        maxSalary: parseFloat(maxSalary),
      });

      setUpdatedEmployees(data.employees || []);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Salaries by Range</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="percentage">
              <Form.Label>Percentage Increase (%)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="minSalary">
              <Form.Label>Min Salary (inclusive)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="maxSalary">
              <Form.Label>Max Salary (exclusive)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Salaries"}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {updatedEmployees.length > 0 && (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Old Salary</th>
              <th>New Salary</th>
            </tr>
          </thead>
          <tbody>
            {updatedEmployees.map((emp) => (
              <tr key={emp.empid}>
                <td>{emp.empid}</td>
                <td>{emp.fname}</td>
                <td>{emp.lname}</td>
                <td>{emp.oldSalary.toFixed(2)}</td>
                <td>{emp.newSalary.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

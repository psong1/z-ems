import { useEffect, useState } from "react";
import { Container, Card, Table, Spinner, Alert } from "react-bootstrap";
import { getInfo, getPayrollHistory } from "../../api/employee";

export default function EmployeeDashboard({ empid }) {
  const [info, setInfo] = useState(null);
  const [history, setHistory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getInfo(empid), getPayrollHistory(empid)])
      .then(([infoData, historyData]) => {
        setInfo(infoData);
        setHistory(historyData);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your data");
      });
  }, [empid]);

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  if (!info || history === null) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Header>Your Profile</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Name:</strong> {info.fname} {info.lname}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {info.email}
          </Card.Text>
          <Card.Text>
            <strong>Hire Date:</strong>{" "}
            {new Date(info.hireDate).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <strong>Role:</strong> {info.role}
          </Card.Text>
        </Card.Body>
      </Card>

      <h4>Payroll History</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Earnings</th>
            <th>Fed Tax</th>
            <th>Medicare</th>
            <th>Social Security</th>
            <th>State Tax</th>
            <th>401k</th>
            <th>Health Care</th>
          </tr>
        </thead>
        <tbody>
          {history.map((p) => (
            <tr key={p.payID}>
              <td>{new Date(p.payDate).toLocaleDateString()}</td>
              <td>${p.earnings.toFixed(2)}</td>
              <td>${p.fed_tax.toFixed(2)}</td>
              <td>${p.fed_med.toFixed(2)}</td>
              <td>${p.fed_SS.toFixed(2)}</td>
              <td>${p.state_tax.toFixed(2)}</td>
              <td>${p.retire_401k.toFixed(2)}</td>
              <td>${p.healthcare.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ user }) {
  const nav = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          Welcome, {user.fname} {user.lname}! Role: {user.role}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-nav" />
        <Navbar.Collapse id="admin-nav" className="justify-content-end">
          <Nav>
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => nav("/admin/add")}
            >
              ➕ Add
            </Button>
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={() => nav("/admin/search")}
            >
              🔍 Search
            </Button>
            <Button
              variant="outline-success"
              className="me-2"
              onClick={() => nav("/admin/update")}
            >
              📝 Update
            </Button>
            <Button
              variant="outline-success"
              onClick={() => nav("/admin/generate")}
            >
              📝 Payroll
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import React from "react";
import { Container, Tabs, Tab, Row, Col } from "react-bootstrap";
import Hero from "../hero/Hero";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

export default function AdminLayout({ user, setUser }) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Hero />
      <Container fluid className="bg-light py-3">
        <Row>
          <Col>
            <h4>
              👋 Hello, {user.fname} {user.lname} | Role:{" "}
              {user.role.toUpperCase()}
            </h4>
          </Col>
          <Col className="text-end">
            <LogoutButton setUser={setUser} />
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <Tabs
          activeKey={pathname}
          onSelect={(key) => key && nav(key)}
          className="mb-3"
        >
          <Tab eventKey="/admin" title="🏠 Home" />
          <Tab eventKey="/admin/add" title="➕ Add Employee" />
          <Tab eventKey="/admin/search" title="🔍 Search / Update" />
          <Tab eventKey="/admin/update" title="📝 Update Salaries" />
          <Tab eventKey="/admin/generate" title="💰 Payroll" />
        </Tabs>

        <Outlet />
      </Container>
    </>
  );
}

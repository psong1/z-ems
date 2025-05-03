import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default function PersonalInfoCard({ user }) {
  console.log(user);
  const date = new Date(user.hireDate).toLocaleDateString();
  return (
    <Card className="mb-4">
      <Card.Header>
        <h3>Employee Profile</h3>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>ID:</strong> {user.empid}
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Email:</strong> {user.email}
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Salary:</strong> ${user.salary}
          </ListGroup.Item>

          <ListGroupItem>
            <strong>Username:</strong> {user.username}
          </ListGroupItem>

          <ListGroupItem>
            <strong>Hire Date:</strong> {date}
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

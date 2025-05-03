import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/hero/hero.css";

export default function Hero() {
  return (
    <div className="bg-primary text-white py-5 mb-4 hero">
      <Container>
        <Row className="justify-content-center">
          <Col md="8" className="text-center">
            <h1 className="display-4">Z Employee Management System</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

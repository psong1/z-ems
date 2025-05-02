// src/components/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Container } from "react-bootstrap";
import { login } from "../../api/auth";
import z from "../../../public/z.png";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      if (result.authenticated) {
        setUser({
          empid: result.empid,
          role: result.role,
          fname: result.fname,
          lname: result.lname,
        });
        navigate(result.role === "admin" ? "/admin" : "/employee");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Server error");
    }
  };

  return (
    <Container className="mt-5">
      <img
        src={z}
        alt="Z Logo"
        style={{ maxWidth: "150px", width: "100%", marginBottom: "1.5rem" }}
      />
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Sign In
        </Button>
      </Form>
    </Container>
  );
}

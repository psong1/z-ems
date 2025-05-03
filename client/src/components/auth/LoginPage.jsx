import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Container } from "react-bootstrap";
import { login } from "../../api/auth";
import Hero from "../hero/Hero";
import "../../assets/css/auth/LoginPage.css";

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
        localStorage.setItem("jwt", result.token);
        setUser({
          empid: result.empid,
          role: result.role,
          fname: result.fname,
          lname: result.lname,
        });
        navigate(result.role === "admin" ? "/admin" : "/employee");
      } else {
        setError("Invalid email/password");
      }
    } catch (err) {
      console.error("Login error", err);
      if (err.response?.status === 401) {
        setError("Invalid email/password");
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <>
      <Hero />
      <Container fluid className="login">
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
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
    </>
  );
}

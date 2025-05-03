import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

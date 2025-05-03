import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Tabs,
  Tab,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getInfo, getPayrollHistory } from "../../api/employee";
import Hero from "../hero/Hero";
import PayrollHistoryTable from "./PayrollHistoryTable";
import PersonalInfoCard from "./PersonalInfoCard";
import LogoutButton from "../auth/LogoutButton";

export default function EmployeeDashboard({ empid, setUser }) {
  const [info, setInfo] = useState(null);
  const [history, setHistory] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

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

  // const handleLogout = () => {
  //   localStorage.removeItem("jwt");
  //   setUser(null);
  //   navigate("/login", { replace: true });
  // };

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
    <>
      <Hero />

      <Container fluid className="bg-light py-3">
        <Row>
          <Col>
            <h5>
              👋 Hello, {info.fname} {info.lname}
            </h5>
          </Col>
          <Col className="text-end">
            <LogoutButton setUser={setUser} />
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <Tabs
          id="employee-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="profile" title="Profile" />
          <Tab eventKey="history" title="Payment History" />
        </Tabs>

        {activeTab === "profile" && <PersonalInfoCard user={info} />}

        {activeTab === "history" && (
          <>
            <h4>Payroll History</h4>
            <PayrollHistoryTable records={history} />
          </>
        )}
      </Container>
    </>
  );
}

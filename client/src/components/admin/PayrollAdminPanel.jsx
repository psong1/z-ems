import { useState, useEffect } from "react";
import {
  getAllPayrollHistory,
  getTotalByJobTitle,
  getTotalByDivision,
  getJobTitles,
  getDivisions,
} from "../../api/admin";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Table,
  Alert,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";

export default function AdminPayrollPanel() {
  const [panel, setPanel] = useState("history"); // "history" | "totals"
  const [inputs, setInputs] = useState({
    empid: "",
    salary: "",
    month: "",
    year: "",
    totalsType: "job",
    selectedOption: "",
  });
  const [options, setOptions] = useState([]); // jobTitles or divisions
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((i) => ({ ...i, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (panel !== "totals") return;
    (async () => {
      try {
        if (inputs.totalsType === "job") {
          setOptions(await getJobTitles());
        } else {
          setOptions(await getDivisions());
        }
        setInputs((i) => ({ ...i, selectedOption: "" }));
      } catch {
        setError("Could not load job/division list");
      }
    })();
  }, [panel, inputs.totalsType]);

  const handleHistory = async (e) => {
    e.preventDefault();
    try {
      const history = await getAllPayrollHistory();
      setResult(history);
      setError("");
    } catch {
      setError("Failed to fetch all payroll history");
      setResult(null);
    }
  };

  const handleTotals = async (e) => {
    e.preventDefault();
    try {
      const month = parseInt(inputs.month, 10);
      const year = parseInt(inputs.year, 10);
      const selected = inputs.selectedOption;

      console.log("→ fetching totals for:", {
        type: inputs.totalsType,
        month,
        year,
        selected,
      });

      let totals;
      if (inputs.totalsType === "job") {
        totals = await getTotalByJobTitle({
          month,
          year,
          title: selected,
        });
      } else {
        totals = await getTotalByDivision({
          month,
          year,
          division: selected,
        });
      }

      console.log("← totals response:", totals);
      setResult(totals);
      setError("");
    } catch (err) {
      console.error("fetch totals error:", err);
      setError("Failed to fetch totals");
      setResult(null);
    }
  };

  return (
    <Container className="py-4">
      <ButtonGroup className="mb-3">
        <Button
          variant={panel === "history" ? "primary" : "outline-primary"}
          onClick={() => {
            setPanel("history");
            setResult(null);
            setError("");
          }}
        >
          📜 History
        </Button>
        <Button
          variant={panel === "totals" ? "primary" : "outline-primary"}
          onClick={() => {
            setPanel("totals");
            setResult(null);
            setError("");
          }}
        >
          📊 Totals
        </Button>
      </ButtonGroup>

      {/* HISTORY FORM */}
      {panel === "history" && (
        <Form onSubmit={handleHistory}>
          <Button type="submit">Fetch All Payroll History</Button>
        </Form>
      )}

      {/* TOTALS FORM */}
      {panel === "totals" && (
        <Form onSubmit={handleTotals}>
          <Row className="g-2 align-items-end">
            <Col md>
              <Form.Group>
                <Form.Label>Month</Form.Label>
                <Form.Control
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  value={inputs.month}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  name="year"
                  type="number"
                  value={inputs.year}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Label className="d-block">Totals Type</Form.Label>
              <ButtonGroup>
                <ToggleButton
                  id="totals-job"
                  type="radio"
                  name="totalsType"
                  value="job"
                  variant="outline-secondary"
                  checked={inputs.totalsType === "job"}
                  onChange={handleChange}
                >
                  By Job
                </ToggleButton>
                <ToggleButton
                  id="totals-division"
                  type="radio"
                  name="totalsType"
                  value="division"
                  variant="outline-secondary"
                  checked={inputs.totalsType === "division"}
                  onChange={handleChange}
                >
                  By Division
                </ToggleButton>
              </ButtonGroup>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>
                  {inputs.totalsType === "job" ? "Job Title" : "Division"}
                </Form.Label>
                <Form.Select
                  name="selectedOption"
                  value={inputs.selectedOption}
                  onChange={handleChange}
                  required
                >
                  <option value="">— Select —</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="auto" className="align-self-end">
              <Button type="submit">Fetch Totals</Button>
            </Col>
          </Row>
        </Form>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* History table */}
      {panel === "history" && Array.isArray(result) && (
        <Table striped bordered hover size="sm" className="mt-3 history-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Pay Date</th>
              <th>Earnings</th>
              <th>Federal Tax</th>
              <th>Medicare</th>
              <th>Social Security</th>
              <th>State Tax</th>
              <th>401k</th>
              <th>Healthcare</th>
            </tr>
          </thead>
          <tbody>
            {result.map((p, i) => (
              <tr key={i}>
                <td>{p.empid}</td>
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
      )}

      {/* Totals table */}
      {panel === "totals" && result && !Array.isArray(result) && (
        <Table bordered size="sm" className="mt-3" style={{ width: "auto" }}>
          <thead>
            <tr>
              <th>{inputs.totalsType === "job" ? "Job Title" : "Division"}</th>
              <th>Total Pay</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result).map(([key, val]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>${val.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

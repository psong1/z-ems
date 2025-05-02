import Table from "react-bootstrap/Table";

function PayrollHistoryTable({ records }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Pay Date</th>
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
        {records.map((p) => (
          <tr key={p.payID}>
            <td>{new Date(p.payDate).toLocaleDateString()}</td>
            <td>{p.earnings}</td>
            <td>{p.fed_tax}</td>
            <td>{p.fed_med}</td>
            <td>{p.fed_SS}</td>
            <td>{p.state_tax}</td>
            <td>{p.retire_401k}</td>
            <td>{p.healthcare}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PayrollHistoryTable;

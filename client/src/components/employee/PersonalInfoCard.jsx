export default function PersonalInfoCard({ info }) {
  return (
    <div>
      <h3>
        Welcome {info.fname} {info.lname}!
      </h3>
      <ul>
        <li>ID: {info.empid}</li>
        <li>Email: {info.email}</li>
        <li>Salary: ${info.salary}</li>
      </ul>
    </div>
  );
}

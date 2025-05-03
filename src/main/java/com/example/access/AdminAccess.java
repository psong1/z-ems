package com.example.access;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.models.Employee;
import com.example.models.SalaryUpdate;

public class AdminAccess {
    private Connection connection;

    public AdminAccess(Connection connection) {
        this.connection = connection;
    }

    public Employee findEmployee(int empid, String Fname, String Lname, String SSN) throws SQLException {
        String sql = "SELECT empid, fname, lname, email, hireDate, salary, SSN, username, password, role "
                   + "FROM employees "
                   + "WHERE empid = ? AND fname = ? AND lname = ? AND SSN = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            stmt.setString(2, Fname);
            stmt.setString(3, Lname);
            stmt.setString(4, SSN);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Employee(
                        rs.getInt   ("empid"),
                        rs.getString("fname"),
                        rs.getString("lname"),
                        rs.getString("email"),
                        rs.getDate  ("hireDate"), 
                        rs.getDouble("salary"),
                        rs.getString("SSN"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("role")
                    );  
                } else {
                    return null;
                }
            }
        }
    }

    public Employee findById(int empid) throws SQLException {
        String sql = """
            SELECT
                empid,
                fname,
                lname,
                email,
                hireDate,
                salary,
                SSN,
                username,
                password,
                role
            FROM employees
            WHERE empid = ?
            """;
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Employee(
                        rs.getInt    ("empid"),
                        rs.getString ("fname"),
                        rs.getString ("lname"),
                        rs.getString ("email"),
                        rs.getDate   ("hireDate"),
                        rs.getDouble ("salary"),
                        rs.getString ("SSN"),
                        rs.getString ("username"),
                        rs.getString ("password"),
                        rs.getString ("role")
                    );
                } else {
                    return null;
                }
            }
        }
    }
    
    public void submitNewEmployee(
    int empid,
    String Fname,
    String Lname,
    String email,
    java.sql.Date hireDate,
    double salary,
    String SSN,
    String username,
    String password,
    String role
) throws SQLException {
    String sql = """
        INSERT INTO employees
          (empid, fname, lname, email, hireDate, salary, SSN, username, password, role)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
        stmt.setInt(1, empid);
        stmt.setString(2, Fname);
        stmt.setString(3, Lname);
        stmt.setString(4, email);
        stmt.setDate(5, hireDate);
        stmt.setDouble(6, salary);
        stmt.setString(7, SSN);
        stmt.setString(8, username);
        stmt.setString(9, password);
        stmt.setString(10, role);
        stmt.executeUpdate();
    }
}

    public void update(Employee emp) throws SQLException {
        String sql = "UPDATE employees SET fname = ?, lname = ?, email = ?, hireDate = ?, salary = ?, SSN = ?, username = ?, password = ?, role = ? WHERE empid = ?";
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, emp.getFname());
            stmt.setString(2, emp.getLname());
            stmt.setString(3, emp.getEmail());
            stmt.setDate(4, new java.sql.Date(emp.getHireDate().getTime()));
            stmt.setDouble(5, emp.getSalary());
            stmt.setString(6, emp.getSSN());
            stmt.setString(7, emp.getUsername());
            stmt.setString(8, emp.getPassword());
            stmt.setString(9, emp.getRole());
            stmt.setInt(10, emp.getEmpid());
    
            int rows = stmt.executeUpdate();
            if (rows == 0) {
                throw new IllegalArgumentException("Update failed, no employee with empid:");
            }
        }
    }

    public void removeEmployee(int empid) throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(
             "DELETE FROM employee_division WHERE empid = ?"
        )) {
            stmt.setInt(1, empid);
            stmt.executeUpdate();
        }
        try (PreparedStatement stmt = connection.prepareStatement(
             "DELETE FROM employees WHERE empid = ?"
        )) {
            stmt.setInt(1, empid);
            int rows = stmt.executeUpdate();
            if (rows == 0) {
                throw new IllegalArgumentException("Delete failed, no employee with empid: " + empid);
            }
        }
    }

    public List<String> getAllJobTitles() throws SQLException {
        String sql = "SELECT job_title FROM job_titles ORDER BY job_title";
        List<String> result = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
          while (rs.next()) {
            result.add(rs.getString("job_title"));
          }
        }
        return result;
      }
    
      public List<String> getAllDivisions() throws SQLException {
        String sql = "SELECT Name FROM division ORDER BY Name";
        List<String> result = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
          while (rs.next()) {
            result.add(rs.getString("Name"));
          }
        }
        return result;
      }


    public void updateSalary(double percentage, double minSalary, double maxSalary) throws SQLException {
        String sql = "UPDATE employees SET Salary = Salary * ? WHERE Salary >= ? AND Salary < ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            double multiplier = 1 + (percentage / 100.0);
            stmt.setDouble(1, multiplier);
            stmt.setDouble(2, minSalary);
            stmt.setDouble(3, maxSalary);
    
            int rows = stmt.executeUpdate();
            if (rows == 0) {
                throw new IllegalArgumentException("Update Salary failed, No employees found in the specified salary range.");
            }
        }
    }

    public List<SalaryUpdate> updateSalaryAndFetch(
            double percentage, double minSalary, double maxSalary
        ) throws SQLException
    {
        double multiplier = 1 + (percentage / 100.0);
        String selectSql = """
            SELECT empid, fname, lname, salary
            FROM employees
            WHERE salary >= ? AND salary < ?
            """;
        List<SalaryUpdate> results = new ArrayList<>();
        try (PreparedStatement ps = connection.prepareStatement(selectSql)) {
            ps.setDouble(1, minSalary);
            ps.setDouble(2, maxSalary);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    int    id  = rs.getInt("empid");
                    String fn  = rs.getString("fname");
                    String ln  = rs.getString("lname");
                    double old = rs.getDouble("salary");
                    double neu = old * multiplier;
                    results.add(new SalaryUpdate(id, fn, ln, old, neu));
                }
            }
        }

        if (!results.isEmpty()) {
            String updateSql = """
                UPDATE employees
                SET salary = salary * ?
                WHERE salary >= ? AND salary < ?
                """;
            try (PreparedStatement ps2 = connection.prepareStatement(updateSql)) {
                ps2.setDouble(1, multiplier);
                ps2.setDouble(2, minSalary);
                ps2.setDouble(3, maxSalary);
                ps2.executeUpdate();
            }
        }
        return results;
    }
}

package com.example.access;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.example.models.Employee;

public class AdminAccess {
    private Connection connection;

    public AdminAccess(Connection connection) {
        this.connection = connection;
    }

    public Employee findEmployee(int empid, String Fname, String Lname, String SSN) throws SQLException {
        String sql = "SELECT empid, fname, lname, email, hireDate, salary, SSN, username, password, role "
                   + "FROM employees "
                   + "WHERE empid = ? OR fname = ? OR lname = ? OR SSN = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            stmt.setString(2, Fname);
            stmt.setString(3, Lname);
            stmt.setString(4, SSN);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Employee(
                        rs.getInt("empid"),
                        rs.getString("fname"),
                        rs.getString("lname"),
                        rs.getString("email"),
                        rs.getDate("hireDate"),
                        rs.getDouble("salary"),
                        rs.getString("SSN"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("role")
                    );
                } else {
                    throw new IllegalArgumentException(
                      "No employee found for empid=" + empid +
                      ", name=" + Fname + " " + Lname +
                      ", SSN=" + SSN
                    );
                }
            }
        }
    }
    public void submitNewEmployee(int empid, String Fname, String Lname, Date hireDate, double salary, String SSN, String username, String password, String role) throws SQLException {
        String sql = "INSERT INTO employees (empid, fname, lname, hireDate, salary, SSN, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            stmt.setString(2, Fname);
            stmt.setString(3, Lname);
            stmt.setDate(4, new java.sql.Date(hireDate.getTime()));
            stmt.setDouble(5, salary);
            stmt.setString(6, SSN);
            stmt.setString(7, username);
            stmt.setString(8, password);
            stmt.setString(9, role);
    
            int rows = stmt.executeUpdate();
    
            if (rows == 0) {
                throw new IllegalArgumentException("Insert failed, Invalid inputs.");
            }
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
        String sql = "DELETE FROM employees WHERE empid = ?";
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
    
            int rows = stmt.executeUpdate();
    
            if (rows == 0) {
                throw new IllegalArgumentException("Delete failed, no employee with empid: " + empid);
            }
        }
    }
    public void updateSalary(double percentage, double minSalary, double maxSalary) throws SQLException {
        String sql = "UPDATE employees SET salary = salary * ? WHERE salary >= ? AND salary < ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            double multiplier = 1 + (percentage / 100.0);
            stmt.setDouble(1, multiplier);
            stmt.setDouble(2, minSalary);
            stmt.setDouble(3, maxSalary);
    
            int rows = stmt.executeUpdate();
            if (rows == 0) {
                throw new IllegalArgumentException("Update Salaray failed, No employees found in the specified salary range.");
            }
        }
    }
    
}

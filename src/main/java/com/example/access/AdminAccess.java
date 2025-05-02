package com.example.access;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.models.Employee;

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

    public void submitNewEmployee(int empid, String Fname, String Lname, Date hireDate, double salary, String SSN, String username, String password, String role) throws SQLException {
        String sql = "INSERT INTO employees (empid, Fname, Lname, hireDate, salary, SSN, username, password, role)"
        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            stmt.setString(2, Fname);
            stmt.setString(3, Lname);
            stmt.setDate(4, hireDate);
            stmt.setDouble(5, salary);
            stmt.setString(6, SSN);
            stmt.setString(7, username);
            stmt.setString(8, password);
            stmt.setString(9, role);

            stmt.executeUpdate();
        }
    }

    public void update(Employee emp) {

    }

    public void removeEmployee(int empid) {

    }

    public void updateSalary(double salary) {
        
    }
}

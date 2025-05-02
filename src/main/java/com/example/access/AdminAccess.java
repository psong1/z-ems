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

    public void submitNewEmployee(int empid, String Fname, String Lname, Date hireDate, double salary, String SSN, String username, String password, String role) {

    }

    public void update(Employee emp) {

    }

    public void removeEmployee(int empid) {

    }

    public void updateSalary(double salary) {
        
    }
}

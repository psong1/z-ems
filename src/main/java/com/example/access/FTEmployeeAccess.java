package com.example.access;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.models.Employee;
import com.example.models.Payroll;

public class FTEmployeeAccess {
    private final Connection connection;

    public FTEmployeeAccess(Connection connection) {
        this.connection = connection;
    }

    public Employee getEmployeeById(int empid, int currentEmpId) throws SQLException {
        if (empid != currentEmpId) {
            throw new SecurityException("Access denied: cannot view other employees' data");
        }

        String sql = "SELECT empid, fname, lname, email, hireDate, salary, SSN, username, password, role "
                   + "FROM employees WHERE empid = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    throw new IllegalArgumentException("No employee found with empid=" + empid);
                }
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
            }
        }
    }

    public List<Payroll> getPayrollHistory(int empid) throws SQLException {
        String sql = """
            SELECT 
              payID,
              pay_date,
              earnings,
              fed_tax,
              fed_med,
              fed_SS,
              state_tax,
              retire_401k,
              health_care,
              empid
            FROM payroll
            WHERE empid = ?
            ORDER BY pay_date DESC
            """;
    
        List<Payroll> history = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, empid);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    history.add(new Payroll(
                        rs.getInt("payID"),
                        rs.getDate("pay_date"),
                        rs.getDouble("earnings"),
                        rs.getDouble("fed_tax"),
                        rs.getDouble("fed_med"),
                        rs.getDouble("fed_SS"), 
                        rs.getDouble("state_tax"),
                        rs.getDouble("retire_401k"),
                        rs.getDouble("health_care"),
                        rs.getInt("empid")
                    ));
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace(); 
        }
        return history;
    }
    
}

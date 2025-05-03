package com.example.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.models.Payroll;

public class GeneratePayroll {
    private Connection connection;

    public GeneratePayroll(Connection connection) {
        this.connection = connection;
    }

    public List<Payroll> getAllPayrollHistory() throws SQLException {
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
            ORDER BY empid, pay_date
            """;
    
        List<Payroll> list = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new Payroll(
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
        return list;
    }

    public Map<String,Double> getTotalPayByJobTitle(int month, int year, String jobTitle) throws SQLException {
        String sql = """
        SELECT jt.job_title    AS job_title,
                SUM(p.earnings) AS total_pay
            FROM payroll p
            JOIN employees e             ON p.empid = e.empid
            JOIN employee_job_titles ejt ON e.empid = ejt.empid
            JOIN job_titles jt           ON ejt.job_title_id = jt.job_title_id
        WHERE MONTH(p.pay_date) = ? 
            AND YEAR(p.pay_date)  = ?
            AND jt.job_title      = ?
        GROUP BY jt.job_title
        """;
        Map<String,Double> totals = new HashMap<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, month);
            stmt.setInt(2, year);
            stmt.setString(3, jobTitle);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    totals.put(
                        rs.getString("job_title"),
                        rs.getDouble("total_pay")
                    );
                }
            }
        }
        return totals;
    }

    public Map<String,Double> getTotalPayByDivision(int month, int year, String divisionName) throws SQLException {
        String sql = """
        SELECT d.Name         AS division,
                SUM(p.earnings) AS total_pay
            FROM payroll p
            JOIN employees e          ON p.empid = e.empid
            JOIN employee_division ed ON e.empid = ed.empid
            JOIN division d           ON ed.div_ID = d.ID
        WHERE MONTH(p.pay_date) = ?
            AND YEAR(p.pay_date)  = ?
            AND d.Name            = ?
        GROUP BY d.Name
        """;
        Map<String,Double> totals = new HashMap<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, month);
            stmt.setInt(2, year);
            stmt.setString(3, divisionName);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    totals.put(
                        rs.getString("division"),
                        rs.getDouble("total_pay")
                    );
                }
            }
        }
        return totals;
    }

}

package com.example.service;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GeneratePayroll {
    private Connection connection;

    public GeneratePayroll(Connection connection) {
        this.connection = connection;
    }
    // all are void to get rid of errors but will need to be StringBuilders
    public StringBuilder generateEmployeePayroll(int empid) {
        StringBuilder payrollInfo = new StringBuilder();
    String sql = "SELECT e.fname, e.lname, e.empid, e.salary, p.pay_date, p.earnings, p.fed_tax, p.fed_med, p.fed_SS, p.state_tax, p.retire_401k, p.health_care "
               + "FROM employees e "
               + "JOIN payroll p ON e.empid = p.empid "
               + "WHERE e.empid = ?";
    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
        stmt.setInt(1, empid);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) { 
                String fname = rs.getString("fname");
                String lname = rs.getString("lname");
                Date payDate = rs.getDate("pay_date");
                double salary = rs.getDouble("salary");
                double earnings = rs.getDouble("earnings");
                double fedTax = rs.getDouble("fed_tax");
                double fedMed = rs.getDouble("fed_med");
                double fedSS = rs.getDouble("fed_SS");
                double stateTax = rs.getDouble("state_tax");
                double retire401k = rs.getDouble("retire_401k");
                double healthCare = rs.getDouble("health_care");

                // Build the payroll info for the employee
                payrollInfo.append(String.format("Employee: %s %s (ID: %d)%n", fname, lname, empid));
                payrollInfo.append(String.format("Pay Date: %s%n", payDate.toString()));
                payrollInfo.append(String.format("Earnings: $%.2f%n", earnings));
                payrollInfo.append(String.format("Employee Salary: $%.2f%n", salary));
                payrollInfo.append(String.format("Federal Tax: $%.2f%n", fedTax));
                payrollInfo.append(String.format("Federal Med: $%.2f%n", fedMed));
                payrollInfo.append(String.format("Social Security: $%.2f%n", fedSS));
                payrollInfo.append(String.format("State Tax: $%.2f%n", stateTax));
                payrollInfo.append(String.format("401k Retirement: $%.2f%n", retire401k));
                payrollInfo.append(String.format("Health Care: $%.2f%n", healthCare));
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return payrollInfo;
}
    

    public StringBuilder generatePayrollByDiv() {
        StringBuilder report = new StringBuilder();

    String sql = "SELECT d.division_name, SUM(p.earnings) AS total_pay " 
             + "FROM payroll p " 
             + "JOIN employees e ON p.empid = e.empid " 
             + "JOIN employee_division ed ON e.empid = ed.empid " 
             + "JOIN division d ON ed.div_ID = d.div_ID " 
             + "GROUP BY d.division_name " ;


    try (PreparedStatement stmt = connection.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {


        while (rs.next()) {
            String divisionName = rs.getString("division_name");
            double totalPay = rs.getDouble("total_pay");

            report.append(String.format("%s: $%.2f%n", divisionName, totalPay));
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }

    // Return the generated report
    return report;
}
    
    public StringBuilder generatePayrollByJobTitle() {
        StringBuilder report = new StringBuilder();
    String sql = "SELECT jt.title AS job_title, SUM(p.earnings) AS total_pay "
               + "FROM payroll p "
               + "JOIN employees e ON p.empid = e.empid "
               + "JOIN employee_job_titles ejt ON e.empid = ejt.empid "
               + "JOIN job_titles jt ON ejt.job_title_id = jt.job_title_id "
               + "GROUP BY jt.title ";
    
    try (PreparedStatement stmt = connection.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        while (rs.next()) {
            String jobTitle = rs.getString("job_title");
            double totalPay = rs.getDouble("total_pay");

            report.append(String.format("%s: $%.2f%n", jobTitle, totalPay));
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }
    return report;
}
}
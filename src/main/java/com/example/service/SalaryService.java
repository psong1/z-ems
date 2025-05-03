package com.example.service;
import java.sql.Connection;
import java.sql.SQLException;

import com.example.access.AdminAccess;

public class SalaryService {
    private AdminAccess adminAccess;

    public SalaryService(Connection connection) {
        this.adminAccess = new AdminAccess(connection);
    }

    public void updateSalaryRange(double percentage, double minSalary, double maxSalary) throws SQLException {
        adminAccess.updateSalary(percentage, minSalary, maxSalary);
    }
}

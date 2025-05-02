package com.example.service;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;

import com.example.access.AdminAccess;
import com.example.models.Employee;

public class EmployeeService {
    private AdminAccess adminAccess;

    public EmployeeService(Connection connection) {
        this.adminAccess = new AdminAccess(connection);
    }

    public void addEmployee(int empid, 
            String fname, 
            String lname, 
            Date hireDate, 
            double salary, 
            String ssn, 
            String username, 
            String password, 
            String role) throws SQLException {
        adminAccess.submitNewEmployee(empid, fname, lname, hireDate, salary, ssn, username, password, role);
    }

    public Employee getEmployee() {
        return null;
    }
    
    public void updateEmployee() {

    }

    public void removeEmployee() {

    }
}

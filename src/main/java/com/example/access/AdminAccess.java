package com.example.access;
import java.sql.Connection;
import java.util.Date;

import com.example.models.Employee;

public class AdminAccess {
    private Connection connection;

    public AdminAccess(Connection connection) {
        this.connection = connection;
    }

    public Employee findEmployee(int empid, String Fname, String Lname, String SSN) {
        return null;
    }

    public static void submitNewEmployee(int empid, String Fname, String Lname, Date hireDate, double salary, String SSN, String username, String password, String role) {

    }

    public static void update(Employee emp) {

    }

    public static void updateSalary(double salary) {
        
    }
}

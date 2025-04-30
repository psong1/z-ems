package com.example.models;
import java.util.*;
import com.example.models.Employee; 

public class FTEmployee extends Employee{
    public FTEmployee(int empid, String Fname, String Lname, String email, Date hireDate, double salary, String SSN, String username, String password) {
        super(empid, Fname, Lname, email, hireDate, salary, SSN, username, password, "employee");
    }

    public void showEmployeeInfo() {
        
    }
}


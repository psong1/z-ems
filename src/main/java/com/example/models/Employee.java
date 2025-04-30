package com.example.models;
import java.util.Date;

public class Employee {
    private int empid;
    private  String Fname;
    private String Lname;
    private String email;
    private Date hireDate;
    private double salary;
    private String SSN;
    private String username;
    private String password;
    private String role; 

    public Employee(int empid, String Fname, String Lname, String email, Date hireDate, double salary, String SSN, String username, String password, String role) {
        this.empid = empid;
        this.Fname = Fname;
        this.Lname = Lname;
        this.email = email;
        this.hireDate = hireDate;
        this.salary = salary;
        this.SSN = SSN;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public int getEmpid() {
        return empid;
    }

    public void setEmpid(int empid) {
        this.empid = empid;
    }

    public String getFname() {
        return Fname;
    }

    public void setFname(String Fname) {
        this.Fname = Fname;
    }

    public String getLname() {
        return Lname;
    }

    public void setLname(String Lname) {
        this.Lname = Lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getSSN() {
        return SSN;
    }

    public void setSSN(String SSN) {
        this.SSN = SSN;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
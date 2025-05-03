package com.example.models;

// need this data to display the employees that had their salary updated
public class SalaryUpdate {
    private int empid;
    private String fname;
    private String lname;
    private double oldSalary;
    private double newSalary;

    public SalaryUpdate(int empid, String fname, String lname, double oldSalary, double newSalary) {
        this.empid     = empid;
        this.fname     = fname;
        this.lname     = lname;
        this.oldSalary = oldSalary;
        this.newSalary = newSalary;

    }

    public int getEmpid() {
        return empid;
    }

    public void setEmpid(int empid) {
        this.empid = empid;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public double getOldSalary() {
        return oldSalary;
    }

    public void setOldSalary(double oldSalary) {
        this.oldSalary = oldSalary;
    }

    public double getNewSalary() {
        return newSalary;
    }

    public void setNewSalary(double newSalary) {
        this.newSalary = newSalary;
    }
}
package com.example.models;
import java.util.Date;

public class Payroll {
    private int payID;
    private Date payDate;
    private double earnings;
    private double fed_tax;
    private double fed_med;
    private double fed_SS;
    private double state_tax;
    private double retire_401k;
    private double health_care;
    private int empid;

    public Payroll(int payID, Date payDate, double earnings, double fed_tax, double fed_med, double fed_SS, double state_tax, double retire_401k, double health_care, int empid) {
        this.payID = payID;
        this.payDate = payDate;
        this.earnings = earnings;
        this.fed_med = fed_med;
        this.fed_tax = fed_tax;
        this.fed_SS = fed_SS;
        this.state_tax = state_tax;
        this.retire_401k = retire_401k;
        this.health_care = health_care;
        this.empid = empid;
    }

    public int getPayID() {
        return payID;
    }

    public void setPayID(int payID) {
        this.payID = payID;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public double getEarnings() {
        return earnings;
    }

    public void setEarnings(double earnings) {
        this.earnings = earnings;
    }

    public double getFed_tax() {
        return fed_tax;
    }

    public void setFed_tax(double fed_tax) {
        this.fed_tax = fed_tax;
    }

    public double getFed_med() {
        return fed_med;
    }

    public void setFed_med(double fed_med) {
        this.fed_med = fed_med;
    }

    public double getFed_SS() {
        return fed_SS;
    }

    public void setFed_SS(double fed_SS) {
        this.fed_SS = fed_SS;
    }

    public double getState_tax() {
        return state_tax;
    }

    public void setState_tax(double state_tax) {
        this.state_tax = state_tax;
    }

    public double getRetire_401k() {
        return retire_401k;
    }

    public void setRetire_401k(double retire_401k) {
        this.retire_401k = retire_401k;
    }

    public double getHealthcare() {
        return health_care;
    }

    public void setHealthcare(double health_care) {
        this.health_care = health_care;
    }

    public int getEmpid() {
        return empid;
    }

    public void setEmpid(int empid) {
        this.empid = empid;
    }

    
}

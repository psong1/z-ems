import java.util.*;

public class Admin extends Employee {
    public Admin(int empid, String Fname, String Lname, String email, Date hireDate, double salary, String SSN, String username, String password) {
        super(empid, Fname, Lname, email, hireDate, salary, SSN, username, password, "admin");
    }

    public void manageEmployees() {

    }

    public void generateReports() {

    }
}
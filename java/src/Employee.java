public class Employee extends User {
    public Employee(int empid, String username) {
        super(empid, username, "employee");
    }

    @Override
    public void showDashboard() {
        
    }
}

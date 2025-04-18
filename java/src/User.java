public abstract class User {
    protected int empid;
    protected String username;
    protected String role;

    public User(int empid, String username, String role) {
        this.empid = empid;
        this.username = username;
        this.role = role;
    }

    public void showDashboard() {
        // need to add functionality
    }

    public int getEmpId() {
        return empid;
    } 

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}

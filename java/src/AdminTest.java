import org.junit.Test;
import java.util.Date;

import static org.junit.Assert.*;

public class AdminTest {

    @Test
    public void testAdminConstructorAndGetters() {
        int empid = 101;
        String Fname = "Alice";
        String Lname = "Smith";
        String email = "alice@example.com";
        Date hireDate = new Date();
        double salary = 75000.00;
        String SSN = "123-45-6789";
        String username = "adminAlice";
        String password = "strongPass123";

        Admin admin = new Admin(empid, Fname, Lname, email, hireDate, salary, SSN, username, password);

        assertEquals(empid, admin.getEmpid());
        assertEquals(Fname, admin.getFname());
        assertEquals(Lname, admin.getLname());
        assertEquals(email, admin.getEmail());
        assertEquals(hireDate, admin.getHireDate());
        assertEquals(salary, admin.getSalary(), 0.001); // Use delta for double comparison
        assertEquals(SSN, admin.getSSN());
        assertEquals(username, admin.getUsername());
        assertEquals(password, admin.getPassword());
        assertEquals("admin", admin.getRole());
    }
}

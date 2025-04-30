package com.example.access;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import org.junit.Test;

import com.example.DBConnection;
import com.example.models.Admin;

public class AdminAccessTest {

    @Test
    public void testConstructorSetsConnection() {
        try (Connection conn = DBConnection.getConnection()) {
            AdminAccess adminAccess = new AdminAccess(conn);
            assertNotNull("AdminAccess should be created with a connection", adminAccess);
        } catch (SQLException e) {
            fail("Database connection failed: " + e.getMessage());
        }
    }

    @Test
    public void testFindEmployeeReturnsNull() {
        try (Connection conn = DBConnection.getConnection()) {
            AdminAccess adminAccess = new AdminAccess(conn);
            assertNull("findEmployee should return null (not implemented)", 
                adminAccess.findEmployee(1, "Test", "User", "123-45-6789"));
        } catch (SQLException e) {
            fail("DB connection failed: " + e.getMessage());
        }
    }

    @Test
    public void testStaticMethodsInvokeWithoutError() {
        try {
            Admin dummy = new Admin(1, "John", "Doe", "john@example.com", new Date(), 50000, "111-22-3333", "johndoe", "password");

            AdminAccess.submitNewEmployee(1, "Jane", "Smith", new Date(), 60000, "222-33-4444", "jsmith", "pass123", "admin");
            AdminAccess.update(dummy);
            AdminAccess.updateSalary(70000);

            // If no exceptions are thrown, we assume these are callable (since they're not implemented)
            assertTrue(true);
        } catch (Exception e) {
            fail("Static method call failed: " + e.getMessage());
        }
    }
}
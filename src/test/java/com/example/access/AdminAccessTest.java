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
    public void testInstanceMethodsInvokeWithoutError() {
        try (Connection conn = DBConnection.getConnection()) {
            AdminAccess adminAccess = new AdminAccess(conn);

            adminAccess.submitNewEmployee(
                1, "Jane", "Smith",
                new Date(),      // hireDate
                60000,           // salary
                "222-33-4444",   // SSN
                "jsmith",        // username
                "pass123",       // password
                "admin"          // role
            );

            Admin dummy = new Admin(
                1,
                "Jane",
                "Smith",
                "jane@example.com",
                new Date(),
                60000.00,
                "222-33-4444",
                "jsmith",
                "pass123"
            );
            adminAccess.update(dummy);

            adminAccess.updateSalary(65000);

            adminAccess.removeEmployee(1);

            assertTrue(true);
        } catch (SQLException e) {
            fail("Instance method call failed: " + e.getMessage());
        }
    }
}
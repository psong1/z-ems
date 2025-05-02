package com.example.access;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;

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
                100, "Jane", "Smith",
                "Jane@example.com",
                new Date(System.currentTimeMillis()), 
                60000,  
                "222-33-4444",
                "jsmith",
                "pass123", 
                "admin"
            );

            Admin dummy = new Admin(
                100,
                "Jane",
                "Smith",
                "Jane@example.com",
                new Date(System.currentTimeMillis()),
                60000.00,
                "222-33-4444",
                "jsmith",
                "pass123"
            );
            adminAccess.update(dummy);

            adminAccess.updateSalary(0.32, 30000.00, 60000.00);

            adminAccess.removeEmployee(100);

            assertTrue(true);
        } catch (SQLException e) {
            fail("Instance method call failed: " + e.getMessage());
        }
    }
}
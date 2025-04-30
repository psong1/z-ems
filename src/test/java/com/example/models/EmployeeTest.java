package com.example.models;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class EmployeeTest {

    @Test
    public void testEmployeeConstructorAndGetters() {
        Date hireDate = new Date();
        Admin admin = new Admin(1001, "Alice", "Johnson", "alice@example.com", hireDate, 75000.0, "123-45-6789", "alicej", "pass123");

        assertEquals(1001, admin.getEmpid());
        assertEquals("Alice", admin.getFname());
        assertEquals("Johnson", admin.getLname());
        assertEquals("alice@example.com", admin.getEmail());
        assertEquals(hireDate, admin.getHireDate());
        assertEquals(75000.0, admin.getSalary(), 0.001);
        assertEquals("123-45-6789", admin.getSSN());
        assertEquals("alicej", admin.getUsername());
        assertEquals("pass123", admin.getPassword());
        assertEquals("admin", admin.getRole());
    }

    @Test
    public void testEmployeeSetters() {
        Admin admin = new Admin(0, "", "", "", new Date(), 0.0, "", "", "");

        admin.setEmpid(2002);
        admin.setFname("Bob");
        admin.setLname("Smith");
        admin.setEmail("bob@example.com");
        Date newDate = new Date();
        admin.setHireDate(newDate);
        admin.setSalary(65000.0);
        admin.setSSN("987-65-4321");
        admin.setUsername("bobsmith");
        admin.setPassword("securepass");
        admin.setRole("admin");

        assertEquals(2002, admin.getEmpid());
        assertEquals("Bob", admin.getFname());
        assertEquals("Smith", admin.getLname());
        assertEquals("bob@example.com", admin.getEmail());
        assertEquals(newDate, admin.getHireDate());
        assertEquals(65000.0, admin.getSalary(), 0.001);
        assertEquals("987-65-4321", admin.getSSN());
        assertEquals("bobsmith", admin.getUsername());
        assertEquals("securepass", admin.getPassword());
        assertEquals("admin", admin.getRole());
    }
}

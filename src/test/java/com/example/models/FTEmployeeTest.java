package com.example.models;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class FTEmployeeTest {

    @Test
    public void testConstructorAndGetters() {
        Date hireDate = new Date();
        FTEmployee ft = new FTEmployee(3001, "Charlie", "Brown", "charlie@example.com", hireDate, 60000.0, "111-22-3333", "charlieb", "mypassword");

        assertEquals(3001, ft.getEmpid());
        assertEquals("Charlie", ft.getFname());
        assertEquals("Brown", ft.getLname());
        assertEquals("charlie@example.com", ft.getEmail());
        assertEquals(hireDate, ft.getHireDate());
        assertEquals(60000.0, ft.getSalary(), 0.001);
        assertEquals("111-22-3333", ft.getSSN());
        assertEquals("charlieb", ft.getUsername());
        assertEquals("mypassword", ft.getPassword());
        assertEquals("employee", ft.getRole());
    }

    @Test
    public void testSetters() {
        FTEmployee ft = new FTEmployee(0, "", "", "", new Date(), 0.0, "", "", "");

        ft.setEmpid(4004);
        ft.setFname("Dana");
        ft.setLname("White");
        ft.setEmail("dana@example.com");
        Date newDate = new Date();
        ft.setHireDate(newDate);
        ft.setSalary(72000.0);
        ft.setSSN("222-33-4444");
        ft.setUsername("danaw");
        ft.setPassword("newpass");
        ft.setRole("employee");

        assertEquals(4004, ft.getEmpid());
        assertEquals("Dana", ft.getFname());
        assertEquals("White", ft.getLname());
        assertEquals("dana@example.com", ft.getEmail());
        assertEquals(newDate, ft.getHireDate());
        assertEquals(72000.0, ft.getSalary(), 0.001);
        assertEquals("222-33-4444", ft.getSSN());
        assertEquals("danaw", ft.getUsername());
        assertEquals("newpass", ft.getPassword());
        assertEquals("employee", ft.getRole());
    }
}
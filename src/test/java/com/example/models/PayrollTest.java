package com.example.models;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class PayrollTest {

    @Test
    public void testConstructorAndGetters() {
        Date payDate = new Date();
        Payroll payroll = new Payroll(
            1001,         // payID
            payDate,      // pay_date
            5000.0,       // earnings
            500.0,        // fed_tax
            72.5,         // fed_med
            50.0,         // fed_SS
            200.0,        // state_tax
            250.0,        // retire_401k
            150.0,        // health_care
            3001          // empid
        );

        assertEquals(1001,    payroll.getPayID());
        assertEquals(payDate, payroll.getPayDate());
        assertEquals(5000.0,  payroll.getEarnings(),    0.001);
        assertEquals(500.0,   payroll.getFed_tax(),     0.001);
        assertEquals(72.5,    payroll.getFed_med(),     0.001);
        assertEquals(50.0,    payroll.getFed_SS(),      0.001);
        assertEquals(200.0,   payroll.getState_tax(),   0.001);
        assertEquals(250.0,   payroll.getRetire_401k(), 0.001);
        assertEquals(150.0,   payroll.getHealthcare(), 0.001);
        assertEquals(3001,    payroll.getEmpid());
    }

    @Test
    public void testSetters() {
        Payroll payroll = new Payroll(
            0, new Date(),
            0.0,   // earnings
            0.0,   // fed_tax
            0.0,   // fed_med
            0.0,   // fed_SS
            0.0,   // state_tax
            0.0,   // retire_401k
            0.0,   // health_care
            0      // empid
        );

        Date newDate = new Date();
        payroll.setPayID(2002);
        payroll.setPayDate(newDate);
        payroll.setEarnings(8000.0);
        payroll.setFed_tax(640.0);
        payroll.setFed_med(116.0);
        payroll.setFed_SS(40.0);
        payroll.setState_tax(320.0);
        payroll.setRetire_401k(400.0);
        payroll.setHealthcare(180.0);
        payroll.setEmpid(4002);

        assertEquals(2002,    payroll.getPayID());
        assertEquals(newDate, payroll.getPayDate());
        assertEquals(8000.0,  payroll.getEarnings(),    0.001);
        assertEquals(640.0,   payroll.getFed_tax(),     0.001);
        assertEquals(116.0,   payroll.getFed_med(),     0.001);
        assertEquals(40.0,    payroll.getFed_SS(),      0.001);
        assertEquals(320.0,   payroll.getState_tax(),   0.001);
        assertEquals(400.0,   payroll.getRetire_401k(), 0.001);
        assertEquals(180.0,   payroll.getHealthcare(), 0.001);
        assertEquals(4002,    payroll.getEmpid());
    }
}

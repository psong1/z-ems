package com.example;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.example.access.AdminAccess;
import com.example.access.FTEmployeeAccess;
import com.example.auth.UserAuth;
import com.example.models.Employee;
import com.example.models.Payroll;
import com.example.service.GeneratePayroll;
import com.example.util.JWTUtil;

import io.javalin.Javalin;
import io.javalin.http.Context;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;



public class App {
    public static void main(String[] args) {

        Javalin app = Javalin.create(cfg -> {

            cfg.http.defaultContentType = "application/json";        
        })
        .start("0.0.0.0", 8080);
        


        app.post("/api/auth", App::handleAuth);

        app.get ("/api/admin",  App::handleAdmin);
        app.post("/api/admin",  App::handleAdmin);

        app.get("/api/employee", App::handleEmployee);
    }

    private static void handleAuth(Context ctxt) {
        String action = ctxt.queryParam("action");
        if (!"login".equals(action)) {
            ctxt.status(400).json(Map.of("error", "Invalid auth action"));
            return;
        }
        String email = ctxt.queryParam("email");
        String pw = ctxt.queryParam("password");
        try {
            if (!UserAuth.authenticate(email, pw)) {
                ctxt.status(401).json(Map.of("authenticated", false));
                return;
            }
            int empid   = UserAuth.getEmpId(email);
            String role = UserAuth.getRole(email);
            // var names = UserAuth.getNamesByEmail(email);
            String fname = UserAuth.getFName(email);
            String lname = UserAuth.getLName(email);
    
            String token = JWTUtil.generateToken(empid, role);

            // 2) return first & last name separately
            ctxt.json(Map.of(
                "authenticated", true,
                "empid",         empid,
                "role",          role,
                "fname",         fname,
                "lname",         lname,
                "token",         token
            ));
        } catch (SQLException e) {
            ctxt.status(500).json(Map.of("error", "DB error: " + e.getMessage()));
        }
    }

    private static Jws<Claims> requireJwt(Context ctxt) {
        String auth = ctxt.header("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new JwtException("Missing or invalid Authorization header");
        }
        return JWTUtil.parseToken(auth.substring(7));
    }
    
    // ADMIN
    private static void handleAdmin(Context ctxt) {
        Jws<Claims> jwt;
        try {
            jwt = requireJwt(ctxt);
        } catch (JwtException e) {
            ctxt.status(401).json(Map.of("error", "Not authenticated"));
            return;
        }
        
        String role = jwt.getBody().get("role", String.class);
        if (!"admin".equals(role)) {
            ctxt.status(403).json(Map.of("error", "Admin only"));
            return;
        }

        String action = ctxt.queryParam("action");
        try (Connection conn = DBConnection.getConnection()) {
            AdminAccess adminAccess = new AdminAccess(conn);

            switch (action) {
                case "addEmployee" -> {
                    int    empid  = Integer.parseInt(ctxt.queryParam("empid"));
                    String fname  = ctxt.queryParam("fname");
                    String lname  = ctxt.queryParam("lname");
                    java.sql.Date hd    = java.sql.Date.valueOf(ctxt.queryParam("hireDate"));
                    double salary = Double.parseDouble(ctxt.queryParam("salary"));
                    String ssn    = ctxt.queryParam("ssn");
                    String usern  = ctxt.queryParam("username");
                    String passw  = ctxt.queryParam("password");
                    String roleIn = ctxt.queryParam("role");
                    adminAccess.submitNewEmployee(empid, fname, lname, hd, salary, ssn, usern, passw, roleIn);
                    ctxt.json(Map.of("status", "added"));
                }
                case "updateEmployee" -> {
                    Employee e = ctxt.bodyAsClass(Employee.class);
                    adminAccess.update(e);
                    ctxt.json(Map.of("status", "updated"));
                }
                case "removeEmployee", "deleteEmployee" -> {
                    int empid = Integer.parseInt(ctxt.queryParam("empid"));
                    adminAccess.removeEmployee(empid);
                    ctxt.json(Map.of("status", "deleted"));
                }
                case "generatePayroll" -> {
                    int    empid  = Integer.parseInt(ctxt.queryParam("empid"));
                    double salary = Double.parseDouble(ctxt.queryParam("salary"));
                    new GeneratePayroll().generateEmployeePayroll(empid, salary);
                    ctxt.json(Map.of("status", "payroll generated"));
                }
                case "getEmployee" -> {
                    Integer empid = ctxt.queryParamAsClass("empid", Integer.class).getOrDefault(null);
                    String  fname = ctxt.queryParam("fname"); 
                    String  lname = ctxt.queryParam("lname");
                    String  ssn   = ctxt.queryParam("ssn");
                
                    Employee e = adminAccess.findEmployee(empid, fname, lname, ssn);
                
                    if (e == null) {
                        ctxt.status(404).json(Map.of("error", "Employee not found"));
                    } else {
                        ctxt.json(e);
                    }
                }
                
                default -> {
                    ctxt.status(400).json(Map.of("error", "Invalid admin action"));
                }
            }
        } catch (SQLException e) {
            ctxt.status(500).json(Map.of("error", "DB error: " + e.getMessage()));
        }
    }

    // EMPLOYEE
    private static void handleEmployee(Context ctxt) {
        Jws<Claims> jwt;
        try {
            jwt = requireJwt(ctxt);
        } catch (JwtException e) {
            ctxt.status(401).json(Map.of("error", "Not authenticated"));
            return;
        }
        int currentEmpId = Integer.parseInt(jwt.getBody().getSubject());

        String action = ctxt.queryParam("action");
        Integer empid = ctxt.queryParamAsClass("empid", Integer.class).getOrDefault(null);
    
        try (Connection conn = DBConnection.getConnection()) {
            FTEmployeeAccess empAccess = new FTEmployeeAccess(conn);
    
            switch (action) {
                case "getSelf" -> {
                    try {
                        Employee e = empAccess.getEmployeeById(empid, currentEmpId);
                        ctxt.json(e);
                    } catch (SecurityException se) {
                        ctxt.status(403).json(Map.of("error", se.getMessage()));
                    }
                }
                case "getPayrollHistory" -> {
                    if (!empid.equals(currentEmpId)) {
                      ctxt.status(403).json(Map.of("error", "Access denied"));
                    } else {
                      List<Payroll> history = empAccess.getPayrollHistory(empid);
                      ctxt.json(history);
                    }
                  }
                default -> {
                    ctxt.status(400).json(Map.of("error", "Invalid employee action"));
                }
            }
        } catch (SQLException e) {
            ctxt.status(500).json(Map.of("error", "DB error: " + e.getMessage()));
        }
    }
    
}

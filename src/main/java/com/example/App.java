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
        });
        
        app.post("/api/auth", App::handleAuth);
        
        app.post  ("/api/admin/employees",               App::handleAdminAdd);
        app.get   ("/api/admin/employees/{empid}",       App::handleAdminGet);
        app.put   ("/api/admin/employees/{empid}",       App::handleAdminUpdate);
        app.delete ("/api/admin/employees/{empid}",      App::handleAdminDelete);
        
        app.post  ("/api/admin/employees/{empid}/payroll", App::handleGeneratePayroll);
        
        app.get("/api/employee/self",    App::handleEmployeeGetSelf);
        app.get("/api/employee/payroll", App::handleEmployeeGetPayroll);
        
        app.start("0.0.0.0", 8080);
        
    }

    // AUTH
    private static void handleAuth(Context ctx) {
        String action = ctx.queryParam("action");
        if (!"login".equals(action)) {
            ctx.status(400).json(Map.of("error", "Invalid auth action"));
            return;
        }
        String email = ctx.queryParam("email");
        String pw    = ctx.queryParam("password");
        try {
            if (!UserAuth.authenticate(email, pw)) {
                ctx.status(401).json(Map.of("authenticated", false));
                return;
            }
            int    empid = UserAuth.getEmpId(email);
            String role  = UserAuth.getRole(email);
            String fname = UserAuth.getFName(email);
            String lname = UserAuth.getLName(email);

            String token = JWTUtil.generateToken(empid, role);

            ctx.json(Map.of(
                "authenticated", true,
                "empid",         empid,
                "role",          role,
                "fname",         fname,
                "lname",         lname,
                "token",         token
            ));
        } catch (SQLException e) {
            ctx.status(500).json(Map.of("error", "DB error: " + e.getMessage()));
        }
    }

    private static Jws<Claims> requireJwt(Context ctx) {
        String h = ctx.header("Authorization");
        if (h == null || !h.startsWith("Bearer ")) {
            throw new JwtException("Missing or invalid Authorization header");
        }
        return JWTUtil.parseToken(h.substring(7));
    }

    // ADMIN
    private static void handleAdminAdd(Context ctx) {
        Jws<Claims> jwt = authorizeAdmin(ctx);
        Employee e = ctx.bodyAsClass(Employee.class);
        try (Connection conn = DBConnection.getConnection()) {
            new AdminAccess(conn).submitNewEmployee(
                e.getEmpid(), e.getFname(), e.getLname(), e.getEmail(),
                new java.sql.Date(e.getHireDate().getTime()),
                e.getSalary(), e.getSSN(), e.getUsername(), e.getPassword(), e.getRole()
            );
            ctx.status(201).json(Map.of("status","added"));
        } catch (SQLException ex) {
            ctx.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminGet(Context ctx) {
        Jws<Claims> jwt = authorizeAdmin(ctx);
        int empid = Integer.parseInt(ctx.pathParam("empid"));
        try (Connection conn = DBConnection.getConnection()) {
            Employee e = new AdminAccess(conn).findById(empid);
            if (e == null) {
                ctx.status(404).json(Map.of("error","not found"));
            } else {
                ctx.json(e);
            }
        } catch (SQLException ex) {
            ctx.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminUpdate(Context ctx) {
        Jws<Claims> jwt = authorizeAdmin(ctx);
        int empid = Integer.parseInt(ctx.pathParam("empid"));
        Employee e = ctx.bodyAsClass(Employee.class);
        if (e.getEmpid() != empid) {
            ctx.status(400).json(Map.of("error","URL empid/body empid mismatch"));
            return;
        }
        try (Connection conn = DBConnection.getConnection()) {
            new AdminAccess(conn).update(e);
            ctx.json(Map.of("status","updated"));
        } catch (SQLException ex) {
            ctx.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminDelete(Context ctx) {
        Jws<Claims> jwt = authorizeAdmin(ctx);
        int empid = Integer.parseInt(ctx.pathParam("empid"));
        try (Connection conn = DBConnection.getConnection()) {
            new AdminAccess(conn).removeEmployee(empid);
            ctx.json(Map.of("status","deleted"));
        } catch (SQLException ex) {
            ctx.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleGeneratePayroll(Context ctx) {
        Jws<Claims> jwt = authorizeAdmin(ctx);
        int empid = Integer.parseInt(ctx.pathParam("empid"));
        Map<String,Double> body = ctx.bodyAsClass(Map.class);
        double salary = body.getOrDefault("salary", 0.0);
        new GeneratePayroll().generateEmployeePayroll(empid, salary);
        ctx.json(Map.of("status","payroll generated"));
    }

    private static Jws<Claims> authorizeAdmin(Context ctx) {
        try {
            Jws<Claims> jwt = requireJwt(ctx);
            if (!"admin".equals(jwt.getBody().get("role", String.class))) {
                ctx.status(403).json(Map.of("error","admin only"));
                throw new JwtException("must be admin");
            }
            return jwt;
        } catch (JwtException e) {
            throw new RuntimeException();
        }
    }

    // EMPLOYEE
    private static void handleEmployeeGetSelf(Context ctx) {
        Jws<Claims> jwt = requireJwt(ctx);
        int current = Integer.parseInt(jwt.getBody().getSubject());
        try (Connection conn = DBConnection.getConnection()) {
            Employee e = new FTEmployeeAccess(conn).getEmployeeById(current, current);
            ctx.json(e);
        } catch (SQLException ex) {
            ctx.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        } catch (SecurityException se) {
            ctx.status(403).json(Map.of("error",se.getMessage()));
        }
    }

    private static void handleEmployeeGetPayroll(Context ctx) {
        Jws<Claims> jwt = requireJwt(ctx);
        int current = Integer.parseInt(jwt.getBody().getSubject());
        try (Connection conn = DBConnection.getConnection()) {
            List<Payroll> history = new FTEmployeeAccess(conn).getPayrollHistory(current);
            ctx.json(history);
        } catch (SQLException ex) {
            ctx.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }
}

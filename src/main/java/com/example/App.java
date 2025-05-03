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
import com.example.models.SalaryUpdate;
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
        
        // AUTH
        app.post("/api/auth", App::handleAuth);
        
        // ADMIN
        app.post  ("/api/admin/employees",               App::handleAdminAdd);
        app.get   ("/api/admin/employees/{empid}",       App::handleAdminGet);
        app.put("/api/admin/employees/salary", App::handleAdminUpdateSalary);
        app.put   ("/api/admin/employees/{empid}",       App::handleAdminUpdate);
        app.delete ("/api/admin/employees/{empid}",      App::handleAdminDelete);
        app.get("/api/admin/payroll",              App::handleAdminPayrollHistory);
        app.get("/api/admin/payroll/job-title",   App::handleAdminTotalByJobTitle);
        app.get("/api/admin/payroll/division",    App::handleAdminTotalByDivision);
        app.get("/api/admin/job-titles",    App::handleAdminGetJobTitles);
        app.get("/api/admin/divisions",     App::handleAdminGetDivisions);
        
        // Employee
        app.get("/api/employee/self",    App::handleEmployeeGetSelf);
        app.get("/api/employee/payroll", App::handleEmployeeGetPayroll);
        
        app.start("0.0.0.0", 8080);
        
    }

    // AUTH
    private static void handleAuth(Context ctxt) {
        String action = ctxt.queryParam("action");
        if (!"login".equals(action)) {
            ctxt.status(400).json(Map.of("error", "Invalid auth action"));
            return;
        }
        String email = ctxt.queryParam("email");
        String pw    = ctxt.queryParam("password");
        try {
            if (!UserAuth.authenticate(email, pw)) {
                ctxt.status(401).json(Map.of("authenticated", false));
                return;
            }
            int    empid = UserAuth.getEmpId(email);
            String role  = UserAuth.getRole(email);
            String fname = UserAuth.getFName(email);
            String lname = UserAuth.getLName(email);

            String token = JWTUtil.generateToken(empid, role);

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
        String h = ctxt.header("Authorization");
        if (h == null || !h.startsWith("Bearer ")) {
            throw new JwtException("Missing or invalid Authorization header");
        }
        return JWTUtil.parseToken(h.substring(7));
    }

    // ADMIN
    private static void handleAdminAdd(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        Employee e = ctxt.bodyAsClass(Employee.class);
        try (Connection conn = DBConnection.getConnection()) {
            new AdminAccess(conn).submitNewEmployee(
                e.getEmpid(), e.getFname(), e.getLname(), e.getEmail(),
                new java.sql.Date(e.getHireDate().getTime()),
                e.getSalary(), e.getSSN(), e.getUsername(), e.getPassword(), e.getRole()
            );
            ctxt.status(201).json(Map.of("status","added"));
        } catch (SQLException ex) {
            ctxt.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminGet(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        int empid = Integer.parseInt(ctxt.pathParam("empid"));
        try (Connection conn = DBConnection.getConnection()) {
            Employee e = new AdminAccess(conn).findById(empid);
            if (e == null) {
                ctxt.status(404).json(Map.of("error","not found"));
            } else {
                ctxt.json(e);
            }
        } catch (SQLException ex) {
            ctxt.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminUpdate(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        int empid = Integer.parseInt(ctxt.pathParam("empid"));
        Employee e = ctxt.bodyAsClass(Employee.class);
        if (e.getEmpid() != empid) {
            ctxt.status(400).json(Map.of("error","URL empid/body empid mismatch"));
            return;
        }
        try (Connection conn = DBConnection.getConnection()) {
            new AdminAccess(conn).update(e);
            ctxt.json(Map.of("status","updated"));
        } catch (SQLException ex) {
            ctxt.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminDelete(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        int empid = Integer.parseInt(ctxt.pathParam("empid"));
        try (Connection conn = DBConnection.getConnection()) {
            new AdminAccess(conn).removeEmployee(empid);
            ctxt.json(Map.of("status","deleted"));
        } catch (SQLException ex) {
            ctxt.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }

    private static void handleAdminPayrollHistory(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        try (Connection conn = DBConnection.getConnection()) {
            var svc = new GeneratePayroll(conn);
            List<Payroll> history = svc.getAllPayrollHistory();
            ctxt.json(history);
        } catch (SQLException e) {
            ctxt.status(500).json(Map.of("error", e.getMessage()));
        }
    }
    
    private static void handleAdminTotalByJobTitle(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        int month = Integer.parseInt(ctxt.queryParam("month"));
        int year  = Integer.parseInt(ctxt.queryParam("year"));
        String jobTitle = ctxt.queryParam("title");
     
        try (Connection conn = DBConnection.getConnection()) {
            var svc = new GeneratePayroll(conn);
 
            Map<String,Double> totals = svc.getTotalPayByJobTitle(month, year, jobTitle);
            ctxt.json(totals);
        } catch (SQLException e) {
            ctxt.status(500).json(Map.of("error", e.getMessage()));
        }
    }

    private static void handleAdminTotalByDivision(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        int month = Integer.parseInt(ctxt.queryParam("month"));
        int year  = Integer.parseInt(ctxt.queryParam("year"));
        String division = ctxt.queryParam("division"); 
        
        try (Connection conn = DBConnection.getConnection()) {
            var svc = new GeneratePayroll(conn);
            Map<String,Double> totals = svc.getTotalPayByDivision(month, year, division);
            ctxt.json(totals);
        } catch (SQLException e) {
            ctxt.status(500).json(Map.of("error", e.getMessage()));
        }
    }

    private static void handleAdminGetJobTitles(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        try (Connection conn = DBConnection.getConnection()) {
          List<String> titles = new AdminAccess(conn).getAllJobTitles();
          ctxt.json(titles);
        } catch (SQLException e) {
            e.printStackTrace();
            ctxt.status(500).json(Map.of("error", e.getMessage()));
        }
      }
      
      private static void handleAdminGetDivisions(Context ctxt) {
        Jws<Claims> jwt = authorizeAdmin(ctxt);
        try (Connection conn = DBConnection.getConnection()) {
          List<String> divs = new AdminAccess(conn).getAllDivisions();
          ctxt.json(divs);
        } catch (SQLException e) {
            e.printStackTrace();
            ctxt.status(500).json(Map.of("error", e.getMessage()));
        }
      }

      private static void handleAdminUpdateSalary(Context ctx) {
        authorizeAdmin(ctx);
        Map<String,Object> body = ctx.bodyAsClass(Map.class);
        double percentage = ((Number)body.get("percentage")).doubleValue();
        double minSalary  = ((Number)body.get("minSalary")).doubleValue();
        double maxSalary  = ((Number)body.get("maxSalary")).doubleValue();
    
        try (Connection conn = DBConnection.getConnection()) {
            List<SalaryUpdate> updated = 
                new AdminAccess(conn)
                    .updateSalaryAndFetch(percentage, minSalary, maxSalary);
    
            if (updated.isEmpty()) {
                ctx.status(400).json(Map.of("error", "No employees in that salary range."));
            } else {
                ctx.json(Map.of("employees", updated));
            }
        } catch (SQLException e) {
            ctx.status(500).json(Map.of("error", "DB error: " + e.getMessage()));
        }
    }
    

    private static Jws<Claims> authorizeAdmin(Context ctxt) {
        try {
            Jws<Claims> jwt = requireJwt(ctxt);
            if (!"admin".equals(jwt.getBody().get("role", String.class))) {
                ctxt.status(403).json(Map.of("error","admin only"));
                throw new JwtException("must be admin");
            }
            return jwt;
        } catch (JwtException e) {
            throw new RuntimeException();
        }
    }

    // EMPLOYEE
    private static void handleEmployeeGetSelf(Context ctxt) {
        Jws<Claims> jwt = requireJwt(ctxt);
        int current = Integer.parseInt(jwt.getBody().getSubject());
        try (Connection conn = DBConnection.getConnection()) {
            Employee e = new FTEmployeeAccess(conn).getEmployeeById(current, current);
            ctxt.json(e);
        } catch (SQLException ex) {
            ctxt.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        } catch (SecurityException se) {
            ctxt.status(403).json(Map.of("error",se.getMessage()));
        }
    }

    private static void handleEmployeeGetPayroll(Context ctxt) {
        Jws<Claims> jwt = requireJwt(ctxt);
        int current = Integer.parseInt(jwt.getBody().getSubject());
        try (Connection conn = DBConnection.getConnection()) {
            List<Payroll> history = new FTEmployeeAccess(conn).getPayrollHistory(current);
            ctxt.json(history);
        } catch (SQLException ex) {
            ctxt.status(500).json(Map.of("error","DB error: "+ex.getMessage()));
        }
    }
}

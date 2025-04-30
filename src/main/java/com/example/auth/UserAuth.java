package com.example.auth;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.DBConnection;

public class UserAuth {

    public static boolean authenticate(String email, String password) throws SQLException {
        String statement = "SELECT * FROM employees WHERE email = ? AND password = ?";

        try (Connection connection = DBConnection.getConnection();
        PreparedStatement stmt = connection.prepareStatement(statement)) {
            stmt.setString(1, email);
            stmt.setString(2, password);

            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        }
    }

    public static int getEmpId(String email) throws SQLException {
        String sql = "SELECT empid FROM employees WHERE email = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("empid");
                }
            }
        }
        return -1;
    }

    public static String getRole(String email) throws SQLException {
        String sql = "SELECT role FROM employees WHERE email = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("role");
                }
            }
        }
        return null;
    }
} 
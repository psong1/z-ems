package com.example.auth;
import java.sql.*;

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


} 
package com.example.util;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JWTUtil {
    private static final Key SIGNING_KEY = Keys.hmacShaKeyFor(
        System.getenv().getOrDefault("JWT_SECRET",
           "change_this_to_a_very_long_random_secret_at_least_32_chars")
        .getBytes()
    );

    // Token time-to-live (e.g. 24h)
    private static final long TTL_MILLIS = 1000L * 60 * 60 * 24;

    // Generate a JWT containing the employee ID as the subject
    public static String generateToken(int empid, String role) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
            .setSubject(Integer.toString(empid))
            .addClaims(Map.of("role", role))
            .setIssuedAt(new Date(now))
            .setExpiration(new Date(now + TTL_MILLIS))
            .signWith(SIGNING_KEY, SignatureAlgorithm.HS256)
            .compact();
    }

    // Parse and verify the given JWT. Throws JwtException (or subclass)
    public static Jws<Claims> parseToken(String token) throws JwtException {
        return Jwts.parserBuilder()
            .setSigningKey(SIGNING_KEY)
            .build()
            .parseClaimsJws(token);
    }
}

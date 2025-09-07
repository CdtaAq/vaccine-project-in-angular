package com.vaccination.security;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {
  private final String secret = "replace_with_env_secret"; // read from properties in real code
  private final long expirationMs = 3600000;

  public String generateToken(String username, String role) {
    return Jwts.builder()
      .setSubject(username)
      .claim("role", role)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
      .signWith(SignatureAlgorithm.HS256, secret.getBytes())
      .compact();
  }

  public String extractUsername(String token) { return extractClaim(token, Claims::getSubject); }
  private <T> T extractClaim(String token, Function<Claims,T> resolver) {
    final Claims claims = Jwts.parserBuilder().setSigningKey(secret.getBytes()).build().parseClaimsJws(token).getBody();
    return resolver.apply(claims);
  }

  public Claims extractAllClaims(String token) {
    return Jwts.parserBuilder().setSigningKey(secret.getBytes()).build().parseClaimsJws(token).getBody();
  }
}

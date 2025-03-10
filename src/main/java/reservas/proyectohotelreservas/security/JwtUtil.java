package reservas.proyectohotelreservas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // Extraer el nombre de usuario del token
    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extraer el rol del token
    public String getRoleFromToken(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    // Extraer un claim específico del token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extraer todos los claims del token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Verificar si el token ha expirado
    private Boolean isTokenExpired(String token) {
        final Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    public String generateToken(String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role); // Agregamos el rol al token

        System.out.println("🔑 Generando token para:");
        System.out.println("Email: " + email);
        System.out.println("Rol: " + role);

        String token = createToken(claims, email);

        System.out.println("✅ Token generado: " + token);
        return token;
    }

    // Crear un token JWT
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Validar el token JWT
    public Boolean validateToken(String token) {
        try {
            final String username = getUsernameFromToken(token);
            return (username != null && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    // Obtener la clave de firma
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

package reservas.proyectohotelreservas.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtTokenFilter jwtTokenFilter; // Filtro JWT

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/api/habitaciones").permitAll()
                        .requestMatchers("/auth/login", "/auth/register").permitAll()
                        .requestMatchers("/usuarios/actualizar/**").permitAll()
                        .requestMatchers("/reservas/todas").hasAuthority("ROLE_ADMIN") // 🔹 Solo Admin puede acceder
                        .requestMatchers("/reservas/usuario/**").permitAll()
                        .requestMatchers("/reservas").permitAll()
                        .requestMatchers("/usuarios/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENTE")
                        .requestMatchers("/habitaciones/**").permitAll()
                        .requestMatchers("/admin/**").permitAll()
                        .requestMatchers("/admin/reservas").permitAll()
                        .requestMatchers("/admin/habitaciones").permitAll()
                        .requestMatchers("/admin/usuarios").hasAuthority("ROLE_ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public HttpMessageConverter<Object> createMappingJacksonHttpMessageConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setSupportedMediaTypes(List.of(MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON_UTF8));
        return converter;
    }

}

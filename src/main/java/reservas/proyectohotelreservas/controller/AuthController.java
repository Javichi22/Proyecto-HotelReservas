package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.dto.AuthRequest;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.service.UsuarioService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5174")  // 🔹 Permitir peticiones desde cualquier frontend
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Usuario usuario) {
        Map<String, String> response = new HashMap<>();
        try {
            usuarioService.saveUsuario(usuario);
            response.put("message", "Usuario registrado con éxito");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error al registrar usuario: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(authRequest.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // Verifica si la contraseña es correcta
            if (passwordEncoder.matches(authRequest.getPassword(), usuario.getPassword())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Inicio de sesión exitoso");
                response.put("role", usuario.getRol().toString()); // Asegurar que el rol es un String correcto

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
    }

}

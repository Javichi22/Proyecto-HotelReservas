package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.security.JwtUtil;
import reservas.proyectohotelreservas.service.UsuarioService;



import java.util.Optional;

@RestController
@RequestMapping("/usuarios") // Endpoint base: http://localhost:8080/usuarios
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Obtener datos del usuario por email
    @GetMapping("/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(usuarioOpt.get());
    }

    // ✅ Actualizar datos del usuario
    @PutMapping("/actualizar/{email}")
    public ResponseEntity<String> updateUsuario(@PathVariable String email, @RequestBody Usuario usuarioActualizado) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellidos(usuarioActualizado.getApellidos());
        usuario.setFechaNacimiento(usuarioActualizado.getFechaNacimiento());

        usuarioService.guardarUsuario(usuario);
        return ResponseEntity.ok("✅ Perfil actualizado correctamente");
    }

}

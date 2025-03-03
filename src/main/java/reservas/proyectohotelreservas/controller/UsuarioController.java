package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.service.UsuarioService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios") // Endpoint base: http://localhost:8080/usuarios
@CrossOrigin(origins = "http://localhost:5174") // Permite peticiones desde el frontend
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // 🔹 Obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    // 🔹 Obtener usuario por email
    @GetMapping("/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        Optional<Usuario> usuarioOpt = usuarioService.getUsuarioByEmail(email);
        return usuarioOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 🔹 CREAR Usuario (usando `/usuarios`)
    @PostMapping("/crear")
    public ResponseEntity<?> createUser(@RequestBody Usuario usuario) {
        try {
            usuarioService.saveUsuario(usuario);
            return ResponseEntity.ok("Usuario creado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear usuario: " + e.getMessage());
        }
    }

    // 🔹 EDITAR usuario (Actualizar datos)
    @PutMapping("/{email}")
    public ResponseEntity<String> updateUsuario(@PathVariable String email, @RequestBody Usuario usuarioActualizado) {
        Optional<Usuario> usuarioOpt = usuarioService.getUsuarioByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellidos(usuarioActualizado.getApellidos());
        usuario.setFechaNacimiento(usuarioActualizado.getFechaNacimiento());

        usuarioService.saveUsuario(usuario);
        return ResponseEntity.ok("Perfil actualizado correctamente");
    }

    // 🔹 ELIMINAR usuario por email
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUsuario(@PathVariable String email) {
        usuarioService.deleteUsuario(email);
        return ResponseEntity.ok("Usuario eliminado con éxito");
    }
}

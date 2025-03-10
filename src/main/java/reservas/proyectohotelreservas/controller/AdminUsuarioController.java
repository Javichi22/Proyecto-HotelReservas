package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.service.UsuarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // ✅ Obtener todos los usuarios
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        try {
            List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
            return ResponseEntity.ok(usuarios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // ✅ Crear un nuevo usuario
    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // ✅ Editar un usuario existente
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        Optional<Usuario> usuarioOpt = usuarioService.obtenerUsuarioPorId(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setEmail(usuarioActualizado.getEmail());
        usuario.setPassword(usuarioActualizado.getPassword());

        Usuario usuarioEditado = usuarioService.guardarUsuario(usuario);
        return ResponseEntity.ok(usuarioEditado);
    }

    // ✅ Eliminar usuario por ID
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        try {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.ok("✅ Usuario eliminado con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌ Error al eliminar el usuario: " + e.getMessage());
        }
    }
}
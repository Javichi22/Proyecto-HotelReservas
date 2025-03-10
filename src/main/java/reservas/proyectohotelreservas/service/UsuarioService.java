package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Obtener un usuario por email
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // ✅ Obtener usuario por ID
    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // ✅ Obtener todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    // Verificar si la contraseña coincide
    public boolean passwordMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // ✅ Guardar un nuevo usuario (CREAR)
    public Usuario guardarUsuario(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword())); // 🔐 Encriptar contraseña
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        // Buscar el usuario por ID
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // Actualizar los campos permitidos
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());

            // 🔐 Si la contraseña cambia, se encripta nuevamente
            if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().isEmpty()) {
                usuario.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
            }

            // Guardar el usuario actualizado
            return usuarioRepository.save(usuario);
        } else {
            // Lanzar una excepción si el usuario no se encuentra
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
    }

    // ✅ Eliminar usuario (DELETE)
    public boolean eliminarUsuario(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

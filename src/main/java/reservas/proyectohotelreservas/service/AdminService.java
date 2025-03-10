package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.repository.ReservaRepository;
import reservas.proyectohotelreservas.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private ReservaRepository reservaRepository;

        // 📌 Obtener todos los usuarios
        public List<Usuario> getAllUsuarios() {
            return usuarioRepository.findAll();
        }

        // 📌 Obtener usuario por ID
        public Optional<Usuario> getUsuarioById(Long id) {
            return usuarioRepository.findById(id);
        }

        // 📌 Crear un nuevo usuario
        public Usuario saveUsuario(Usuario usuario) {
            return usuarioRepository.save(usuario);
        }

        // 📌 Editar usuario existente
        public Usuario updateUsuario(Long id, Usuario usuarioActualizado) {
            Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
            if (usuarioOpt.isPresent()) {
                Usuario usuario = usuarioOpt.get();
                usuario.setNombre(usuarioActualizado.getNombre());
                usuario.setEmail(usuarioActualizado.getEmail());
                usuario.setPassword(usuarioActualizado.getPassword()); // ⚠️ Asegúrate de encriptar si es necesario
                return usuarioRepository.save(usuario);
            }
            return null; // Devuelve null si no se encuentra el usuario
        }

        // 📌 Eliminar usuario por ID
        public boolean deleteUsuario(Long id) {
            if (usuarioRepository.existsById(id)) {
                usuarioRepository.deleteById(id);
                return true;
            }
            return false;
        }
}

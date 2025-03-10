package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.model.Rol;
import reservas.proyectohotelreservas.repository.UsuarioRepository;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 🔹 Buscar usuario en la base de datos
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("❌ Usuario no encontrado: " + email));

        // ✅ Obtener el nombre del rol correctamente
        String role = "ROLE_USER"; // Valor por defecto

        Rol userRole = usuario.getRol(); // Obtener el objeto Rol
        if (userRole != null) {
            String nombreRol = userRole.toString(); // ✅ Intenta con toString() si getNombre() no existe
            if (!nombreRol.isEmpty()) {
                role = nombreRol.startsWith("ROLE_") ? nombreRol : "ROLE_" + nombreRol;
            }
        }

        System.out.println("✅ Usuario autenticado: " + usuario.getEmail() + ", Rol: " + role); // Debug

        return User.withUsername(usuario.getEmail())
                .password(usuario.getPassword())
                .authorities(role) // 🔹 Se usa "authorities()" en vez de "roles()" para evitar doble "ROLE_"
                .build();
    }
}


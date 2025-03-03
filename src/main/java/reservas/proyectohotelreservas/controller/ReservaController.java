package reservas.proyectohotelreservas.controller;

import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.service.ReservaService;
import reservas.proyectohotelreservas.service.UsuarioService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/reservas")
@PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private UsuarioService usuarioService;

    // 🔹 Obtener todas las reservas (Solo ADMIN)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Reserva> getAllReservas() {
        return reservaService.getAllReservas();
    }

    // 🔹 Obtener reservas diarias para la página principal
    @GetMapping("/diarias")
    public List<Reserva> getReservasDiarias() {
        return reservaService.getReservasDiarias();
    }

    // 🔹 Obtener reservas del usuario autenticado (para CLIENTE)
    @GetMapping("/{email}")
    @PreAuthorize("hasRole('CLIENTE')")
    public List<Reserva> getReservasByUser(@PathVariable String email) {
        return reservaService.getReservasByEmail(email);
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<?> createReserva(@RequestBody Reserva reserva, Principal principal) {
        String emailUsuario = principal.getName(); // Obtiene el email del usuario autenticado

        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(emailUsuario);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            reserva.setUsuario(usuario);
            reservaService.saveReserva(reserva);
            return ResponseEntity.ok("Reserva creada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
        }
    }


    // 🔹 Editar reserva (para CLIENTE)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<?> updateReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        reservaService.updateReserva(id, reserva);
        return ResponseEntity.ok("Reserva actualizada");
    }

    // 🔹 Eliminar reserva (para CLIENTE y ADMIN)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> deleteReserva(@PathVariable Long id) {
        reservaService.deleteReserva(id);
        return ResponseEntity.ok("Reserva eliminada");
    }
}

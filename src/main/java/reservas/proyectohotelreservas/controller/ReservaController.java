package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.dto.ReservaRequest;
import reservas.proyectohotelreservas.model.Habitacion;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.security.JwtUtil;
import reservas.proyectohotelreservas.service.HabitacionService;
import reservas.proyectohotelreservas.service.ReservaService;
import reservas.proyectohotelreservas.service.UsuarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private HabitacionService habitacionService;

    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping("/todas")
    public ResponseEntity<List<Reserva>> obtenerTodasLasReservas() {
        List<Reserva> reservas = reservaService.obtenerTodasLasReservas();
        return ResponseEntity.ok(reservas);
    }


    // ✅ Hacer una reserva
    @PostMapping("/reservas")
    public ResponseEntity<?> realizarReserva(@RequestBody ReservaRequest reservaRequest,
                                             @RequestHeader("Authorization") String token) {
        System.out.println("📩 Petición de reserva recibida para usuario: " + reservaRequest.getEmailUsuario());

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("⚠️ Token no proporcionado.");
        }

        if (!jwtUtil.validateToken(token.replace("Bearer ", ""))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("⚠️ Token no válido o expirado.");
        }

        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(reservaRequest.getEmailUsuario());

        if (usuarioOpt.isEmpty()) {
            System.out.println("⚠️ Usuario no encontrado: " + reservaRequest.getEmailUsuario());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("⚠️ Usuario no encontrado.");
        }

        Optional<Habitacion> habitacionOpt = habitacionService.obtenerHabitacionPorId(reservaRequest.getHabitacionId());

        if (habitacionOpt.isEmpty()) {
            System.out.println("⚠️ Habitación no encontrada: " + reservaRequest.getHabitacionId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("⚠️ Habitación no encontrada.");
        }

        Usuario usuario = usuarioOpt.get();
        Habitacion habitacion = habitacionOpt.get();

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setHabitacion(habitacion);
        reserva.setFechaEntrada(reservaRequest.getFechaEntrada());
        reserva.setFechaSalida(reservaRequest.getFechaSalida());

        Reserva nuevaReserva = reservaService.guardarReserva(reserva);
        System.out.println("✅ Reserva guardada con éxito. ID: " + nuevaReserva.getId());

        return ResponseEntity.ok(nuevaReserva);
    }

    // 🔹 Obtener reservas de un usuario autenticado
    @GetMapping("/usuario/{email}")
    public ResponseEntity<List<Reserva>> obtenerReservasUsuario(@PathVariable String email) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<Reserva> reservas = reservaService.obtenerReservasPorUsuario(usuarioOpt.get());
        return ResponseEntity.ok(reservas);
    }
}

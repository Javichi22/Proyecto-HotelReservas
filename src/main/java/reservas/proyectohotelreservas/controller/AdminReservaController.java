package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.dto.ReservaRequest;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.service.ReservaService;

import java.util.List;


@RestController
@RequestMapping("/admin/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminReservaController {

    @Autowired
    private ReservaService reservaService;

    // 🔵 Obtener todas las reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> obtenerReservas() {
        return ResponseEntity.ok(reservaService.obtenerTodasLasReservas());
    }

    // 🟢 Crear una nueva reserva
    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaRequest reservaRequest) {
        try {
            Reserva nuevaReserva = reservaService.guardarReserva(reservaRequest);
            return ResponseEntity.ok(nuevaReserva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la reserva: " + e.getMessage());
        }
    }

    // ✏️ Editar una reserva
    @PutMapping("/{id}")
    public ResponseEntity<?> editarReserva(@PathVariable Long id, @RequestBody ReservaRequest reservaRequest) {
        try {
            Reserva reservaEditada = reservaService.actualizarReserva(id, reservaRequest);
            return ResponseEntity.ok(reservaEditada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la reserva: " + e.getMessage());
        }
    }

    // ❌ Eliminar una reserva
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReserva(@PathVariable Long id) {
        try {
            reservaService.eliminarReserva(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

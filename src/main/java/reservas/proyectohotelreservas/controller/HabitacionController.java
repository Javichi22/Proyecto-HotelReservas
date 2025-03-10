package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Habitacion;
import reservas.proyectohotelreservas.service.HabitacionService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173") // Asegurar que el frontend puede acceder
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    // ✅ Obtener todas las habitaciones
    @GetMapping("/habitaciones")
    public ResponseEntity<List<Habitacion>> obtenerHabitaciones() {
        List<Habitacion> habitaciones = habitacionService.obtenerTodasLasHabitaciones();
        return ResponseEntity.ok(habitaciones);
    }
}
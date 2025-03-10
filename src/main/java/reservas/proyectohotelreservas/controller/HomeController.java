package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Habitacion;
import reservas.proyectohotelreservas.service.HabitacionService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @Autowired
    private HabitacionService habitacionService;

    // 🔹 Obtener todas las habitaciones disponibles
    @GetMapping("/habitaciones")
    public List<Habitacion> getHabitacionesDisponibles() {
        return habitacionService.getHabitacionesDisponibles();
    }
}

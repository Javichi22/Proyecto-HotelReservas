package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.model.Habitacion;
import reservas.proyectohotelreservas.repository.HabitacionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HabitacionService {

    @Autowired
    private HabitacionRepository habitacionRepository;

    // ✅ Método para obtener todas las habitaciones
    public List<Habitacion> obtenerTodasLasHabitaciones() {
        return habitacionRepository.findAll();
    }

    public Optional<Habitacion> obtenerHabitacionPorId(Long id) {
        return habitacionRepository.findById(id);
    }

    public Habitacion guardarHabitacion(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    public List<Habitacion> getHabitacionesDisponibles() {
        return habitacionRepository.findAll();
    }

}

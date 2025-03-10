package reservas.proyectohotelreservas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reservas.proyectohotelreservas.model.Habitacion;

import java.util.List;
import java.util.Optional;

public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    Optional<Habitacion> findById(Long id);
}
package reservas.proyectohotelreservas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reservas.proyectohotelreservas.model.Reserva;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuarioEmail(String email);
}

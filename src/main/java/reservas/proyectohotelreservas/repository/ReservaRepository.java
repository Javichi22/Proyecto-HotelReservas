package reservas.proyectohotelreservas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.model.Usuario;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuario(Usuario usuario);
    List<Reserva> findAll();
}

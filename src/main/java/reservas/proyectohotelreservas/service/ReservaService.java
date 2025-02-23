package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.repository.ReservaRepository;

import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public Reserva crearReserva(Reserva reserva) {
        // Lógica adicional si es necesario
        return reservaRepository.save(reserva);
    }

    public List<Reserva> obtenerReservasPorCliente(String cliente) {
        return reservaRepository.findByCliente(cliente);
    }

    public List<Reserva> obtenerReservasPorEstado(String estado) {
        return reservaRepository.findByEstado(estado);
    }

    public void cancelarReserva(Long reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        reserva.setEstado("cancelada");
        reservaRepository.save(reserva);
    }
}

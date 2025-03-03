package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.repository.ReservaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;


@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    public List<Reserva> getReservasByEmail(String email) {
        return reservaRepository.findByUsuarioEmail(email);
    }

    public void saveReserva(Reserva reserva) {
        reservaRepository.save(reserva);
    }

    public void updateReserva(Long id, Reserva reserva) {
        Reserva existing = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        existing.setFechaEntrada(reserva.getFechaEntrada());
        existing.setFechaSalida(reserva.getFechaSalida());
        existing.setHabitacion(reserva.getHabitacion());
        reservaRepository.save(existing);
    }

    public void deleteReserva(Long id) {
        reservaRepository.deleteById(id);
    }

    // 🔹 Generar reservas diarias aleatorias para la API
    public List<Reserva> getReservasDiarias() {
        List<Reserva> reservas = reservaRepository.findAll();

        // Simulación de actualización diaria cambiando la fecha de entrada aleatoriamente
        reservas.forEach(reserva -> {
            reserva.setFechaEntrada(LocalDate.now().plusDays(new Random().nextInt(7))); // Cambia la fecha aleatoriamente
            reserva.setFechaSalida(reserva.getFechaEntrada().plusDays(3)); // 3 días después
        });

        return reservas;
    }
}
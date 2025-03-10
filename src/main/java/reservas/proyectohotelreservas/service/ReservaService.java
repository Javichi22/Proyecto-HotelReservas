package reservas.proyectohotelreservas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reservas.proyectohotelreservas.dto.ReservaRequest;
import reservas.proyectohotelreservas.model.Habitacion;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.repository.HabitacionRepository;
import reservas.proyectohotelreservas.repository.ReservaRepository;
import reservas.proyectohotelreservas.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // ✅ Añadimos UsuarioRepository

    // ✅ Obtener todas las reservas
    public List<Reserva> obtenerTodasLasReservas() {
        List<Reserva> reservas = reservaRepository.findAll();

        // Verificar que cada reserva tiene usuario y devolverlo correctamente
        for (Reserva reserva : reservas) {
            if (reserva.getUsuario() == null) {
                reserva.setUsuario(new Usuario()); // Si no tiene usuario, asignamos uno ficticio
            }
        }

        return reservas;
    }

    // ✅ Crear una nueva reserva
    public Reserva guardarReserva(ReservaRequest reservaRequest) {
        Reserva reserva = new Reserva();

        // Buscar usuario por ID
        Usuario usuario = usuarioRepository.findById(reservaRequest.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Buscar habitación por ID
        Habitacion habitacion = habitacionRepository.findById(reservaRequest.getHabitacionId())
                .orElseThrow(() -> new IllegalArgumentException("Habitación no encontrada"));

        // Asignar datos
        reserva.setUsuario(usuario);
        reserva.setHabitacion(habitacion);  // Asegúrate de que esto no sea nulo
        reserva.setFechaEntrada(reservaRequest.getFechaEntrada());
        reserva.setFechaSalida(reservaRequest.getFechaSalida());

        return reservaRepository.save(reserva);
    }

    public Reserva actualizarReserva(Long id, ReservaRequest reservaRequest) {
        Optional<Reserva> reservaExistente = reservaRepository.findById(id);

        if (reservaExistente.isPresent()) {
            Reserva reserva = reservaExistente.get();

            // Buscar el usuario por ID
            Usuario usuario = usuarioRepository.findById(reservaRequest.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Buscar la habitación por ID
            Habitacion habitacion = habitacionRepository.findById(reservaRequest.getHabitacionId())
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

            // Actualizar los campos de la reserva
            reserva.setUsuario(usuario);
            reserva.setHabitacion(habitacion);  // Asegúrate de actualizar la habitación
            reserva.setFechaEntrada(reservaRequest.getFechaEntrada());
            reserva.setFechaSalida(reservaRequest.getFechaSalida());

            return reservaRepository.save(reserva);  // Guardar la reserva actualizada
        } else {
            throw new RuntimeException("Reserva no encontrada");
        }
    }

    // ✅ Guardar reserva
    public Reserva guardarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    // ✅ Obtener reservas de un usuario específico
    public List<Reserva> obtenerReservasPorUsuario(Usuario usuario) {
        return reservaRepository.findByUsuario(usuario);
    }

    // ✅ Eliminar una reserva
    public void eliminarReserva(Long id) {
        reservaRepository.deleteById(id);
    }
}

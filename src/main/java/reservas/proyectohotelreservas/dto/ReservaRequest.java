package reservas.proyectohotelreservas.dto;

import java.time.LocalDate;

public class ReservaRequest {

    private String emailUsuario;
    private Long usuarioId;
    private Long habitacionId;
    private LocalDate fechaEntrada;
    private LocalDate fechaSalida;

    // ✅ Getters y Setters

    // Getters y Setters
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Long getHabitacionId() { return habitacionId; }

    public void setHabitacionId(Long habitacionId) {
        this.habitacionId = habitacionId;
    }

    public LocalDate getFechaEntrada() { return fechaEntrada; }
    public void setFechaEntrada(LocalDate fechaEntrada) { this.fechaEntrada = fechaEntrada; }

    public LocalDate getFechaSalida() { return fechaSalida; }
    public void setFechaSalida(LocalDate fechaSalida) { this.fechaSalida = fechaSalida; }
}

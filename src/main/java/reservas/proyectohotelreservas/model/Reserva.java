package reservas.proyectohotelreservas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reservas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habitacion_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Habitacion habitacion;

    @Column(nullable = false)
    private LocalDate fechaEntrada;

    @Column(nullable = false)
    private LocalDate fechaSalida;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Transient // ✅ No se almacena en la base de datos, solo para la lógica
    private String emailUsuario;
    // ✅ Métodos GETTERS y SETTERS
    public String getEmailUsuario() {
        return usuario != null ? usuario.getEmail() : emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Habitacion getHabitacion() {
        return habitacion;
    }

    public void setHabitacion(Habitacion habitacion) {
        this.habitacion = habitacion;
    }

    public LocalDate getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public Usuario getUsuario() { // ✅ Cambiado de getUsuarioId() a getUsuario()
        return usuario;
    }

    public void setUsuario(Usuario usuario) { // ✅ Cambiado de setUsuarioId() a setUsuario()
        this.usuario = usuario;
    }
}

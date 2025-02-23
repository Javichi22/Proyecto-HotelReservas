package reservas.proyectohotelreservas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor

public class Habitacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int capacidad;
    private double precio;

    @OneToMany(mappedBy = "habitacion")
    private List<Reserva> reservas;
}

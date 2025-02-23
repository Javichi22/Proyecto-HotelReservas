package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Reserva;
import reservas.proyectohotelreservas.service.ReservaService;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:4200") // Para conectar con Angular

public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/crear")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva, Authentication authentication) {
        String cliente = authentication.getName();
        reserva.setCliente(cliente);
        Reserva nuevaReserva = reservaService.crearReserva(reserva);
        return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
    }

    @GetMapping("/cliente/{cliente}")
    public ResponseEntity<List<Reserva>> obtenerReservasPorCliente(@PathVariable String cliente) {
        List<Reserva> reservas = reservaService.obtenerReservasPorCliente(cliente);
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @PostMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarReserva(@PathVariable Long id, Authentication authentication) {
        String cliente = authentication.getName();
        reservaService.cancelarReserva(id);
        return new ResponseEntity<>("Reserva cancelada con éxito", HttpStatus.OK);
    }
}

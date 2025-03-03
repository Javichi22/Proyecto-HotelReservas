package reservas.proyectohotelreservas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reservas.proyectohotelreservas.model.Usuario;
import reservas.proyectohotelreservas.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ADMIN')")  // 🔐 Solo ADMIN puede acceder
public class AdminController {

    @Autowired
    private UsuarioService usuarioService;

    // 📌 Obtener todos los usuarios (solo ADMIN)
    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios() {
        return usuarioService.getAllUsuarios();
    }
}
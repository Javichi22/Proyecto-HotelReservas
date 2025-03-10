import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const CustomNavbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-lg sticky-top px-3">
            <Container>
                {/* 🔹 LOGO */}
                <Navbar.Brand href="/" className="fw-bold d-flex align-items-center gap-2">
                    Hotel Reservas
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center gap-3">
                        {/* 🔹 SI NO ESTÁ LOGUEADO */}
                        {!token ? (
                            <>
                                <NavLink to="/login" className="nav-link">Iniciar Sesión</NavLink>
                                <NavLink to="/register" className="nav-link">Registrarse</NavLink>
                            </>
                        ) : (
                            <>
                                {/* 🔹 SI ES ADMIN */}
                                {userRole === "ROLE_ADMIN" ? (
                                    <>
                                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                                        <NavLink to="/admin/reservas" className="nav-link">Gestión de Reservas</NavLink>
                                        <NavLink to="/admin/usuarios" className="nav-link">Gestionar Usuarios</NavLink>
                                    </>
                                ) : (
                                    <>
                                        {/* 🔹 SI ES CLIENTE */}
                                        <NavLink to="/" className="nav-link">Inicio</NavLink>
                                        <NavLink to="/reservas" className="nav-link">Mis Reservas</NavLink>
                                        <NavLink to="/perfil" className="nav-link">Perfil</NavLink>
                                    </>
                                )}
                                {/* 🔹 BOTÓN CERRAR SESIÓN */}
                                <Button
                                    variant="danger"
                                    onClick={handleLogout}
                                    className="btn-sm px-3 py-2 ms-3"
                                >
                                    Cerrar Sesión
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;

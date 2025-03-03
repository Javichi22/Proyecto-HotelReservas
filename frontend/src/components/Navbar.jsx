import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h1 className="logo">Hotel Reservas</h1>
            <div className="nav-links">
                <NavLink to="/">Inicio</NavLink>

                {!token ? (
                    <>
                        <NavLink to="/login">Iniciar Sesión</NavLink>
                        <NavLink to="/register">Registrarse</NavLink>
                    </>
                ) : (
                    <>
                        {userRole === "ROLE_ADMIN" && <NavLink to="/dashboard">Gestión de Usuarios</NavLink>}
                        <NavLink to="/reservas">Mis Reservas</NavLink>
                        <NavLink to="/perfil">Perfil</NavLink>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

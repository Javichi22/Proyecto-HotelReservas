import { useEffect, useState } from "react";

const Dashboard = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        fechaNacimiento: "",
        rol: "CLIENTE"
    });

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        const response = await fetch("http://localhost:8080/usuarios");
        const data = await response.json();
        setUsuarios(data);
    };

    const handleDelete = async (email) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            await fetch(`http://localhost:8080/usuarios/${email}`, {
                method: "DELETE",
            });
            fetchUsuarios();
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/usuarios/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario),
        });
        fetchUsuarios();
        setNuevoUsuario({ nombre: "", apellidos: "", email: "", password: "", fechaNacimiento: "", rol: "CLIENTE" });
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>

            {/* Formulario para crear usuarios */}
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} required />
                <input type="text" placeholder="Apellidos" value={nuevoUsuario.apellidos} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellidos: e.target.value })} required />
                <input type="email" placeholder="Correo" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} required />
                <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} required />
                <input type="date" value={nuevoUsuario.fechaNacimiento} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fechaNacimiento: e.target.value })} required />
                <select value={nuevoUsuario.rol} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                    <option value="CLIENTE">Cliente</option>
                    <option value="ADMIN">Administrador</option>
                </select>
                <button type="submit">Crear Usuario</button>
            </form>

            {/* Lista de usuarios */}
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.email}>
                        {usuario.nombre} {usuario.apellidos} ({usuario.email}) - {usuario.rol}
                        <button onClick={() => handleDelete(usuario.email)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;

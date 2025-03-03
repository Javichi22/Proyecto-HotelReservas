import { useEffect, useState } from "react";

const UsuariosDashboard = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
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

    // 📌 Obtener lista de usuarios
    const fetchUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:8080/usuarios");

            if (!response.ok) {
                throw new Error("Error al obtener usuarios");
            }

            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
            alert("No se pudieron obtener los usuarios.");
        }
    };

    // 📌 Crear usuario con validación
    const handleCreateUsuario = async () => {
        if (!nuevoUsuario.nombre || !nuevoUsuario.apellidos || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.fechaNacimiento) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario),
            });

            if (!response.ok) {
                throw new Error("Error al crear usuario.");
            }

            alert("Usuario creado con éxito.");
            setNuevoUsuario({ nombre: "", apellidos: "", email: "", password: "", fechaNacimiento: "", rol: "CLIENTE" });
            fetchUsuarios();
        } catch (error) {
            console.error(error);
            alert("No se pudo crear el usuario.");
        }
    };

    // 📌 Editar usuario con validación
    const handleEditUsuario = async () => {
        if (!usuarioEditado.nombre || !usuarioEditado.apellidos || !usuarioEditado.fechaNacimiento) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/usuarios/${usuarioEditado.email}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioEditado),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar usuario.");
            }

            alert("Usuario actualizado con éxito.");
            setUsuarioEditado(null);
            fetchUsuarios();
        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar el usuario.");
        }
    };

    // 📌 Confirmar y eliminar usuario
    const handleDeleteUsuario = async (email) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar este usuario?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/usuarios/${email}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Error al eliminar usuario.");
            }

            alert("Usuario eliminado con éxito.");
            fetchUsuarios();
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el usuario.");
        }
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>

            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.email}>
                        {usuario.nombre} {usuario.apellidos} - {usuario.email} ({usuario.rol})
                        <button onClick={() => setUsuarioEditado(usuario)}>✏ Editar</button>
                        <button onClick={() => handleDeleteUsuario(usuario.email)}>🗑 Eliminar</button>
                    </li>
                ))}
            </ul>

            <h3>Crear Nuevo Usuario</h3>
            <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
            <input type="text" placeholder="Apellidos" value={nuevoUsuario.apellidos} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellidos: e.target.value })} />
            <input type="email" placeholder="Email" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
            <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
            <input type="date" value={nuevoUsuario.fechaNacimiento} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fechaNacimiento: e.target.value })} />
            <select value={nuevoUsuario.rol} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                <option value="CLIENTE">Cliente</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button onClick={handleCreateUsuario}>➕ Crear Usuario</button>

            {usuarioEditado && (
                <div>
                    <h3>Editar Usuario</h3>
                    <input type="text" placeholder="Nombre" value={usuarioEditado.nombre} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellidos" value={usuarioEditado.apellidos} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, apellidos: e.target.value })} />
                    <input type="date" value={usuarioEditado.fechaNacimiento} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, fechaNacimiento: e.target.value })} />
                    <button onClick={handleEditUsuario}>✅ Actualizar Usuario</button>
                    <button onClick={() => setUsuarioEditado(null)}>❌ Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default UsuariosDashboard;

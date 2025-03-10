import { useState, useEffect } from "react";
import "../assets/styles/index.css";

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // 📌 Cargar usuarios desde el backend
    const fetchUsuarios = () => {
        fetch("http://localhost:8080/admin/usuarios", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error("❌ Error al cargar usuarios:", error));
    };

    // 📌 Eliminar usuario
    const eliminarUsuario = (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

        fetch(`http://localhost:8080/admin/usuarios/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert("✅ Usuario eliminado correctamente");
                fetchUsuarios();
            })
            .catch(error => console.error("❌ Error al eliminar usuario:", error));
    };

    // 📌 Manejar cambios en el formulario
    const handleInputChange = (e) => {
        setSelectedUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // 📌 Mostrar formulario para crear usuario ARRIBA
    const handleCrearUsuario = () => {
        setSelectedUser({ nombre: "", apellidos: "", email: "", password: "", fechaNacimiento: "", rol: "ROLE_CLIENTE" });
    };

    // 📌 Mostrar formulario para editar usuario
    const handleEditarUsuario = (user) => {
        setSelectedUser({ ...user });
    };

    // 📌 Crear nuevo usuario igual que en Register.jsx
    const crearUsuario = async () => {
        if (!selectedUser || !selectedUser.nombre || !selectedUser.apellidos || !selectedUser.email || !selectedUser.password || !selectedUser.fechaNacimiento) {
            alert("❌ Todos los campos son obligatorios.");
            return;
        }

        const userData = {
            nombre: selectedUser.nombre,
            apellidos: selectedUser.apellidos,
            email: selectedUser.email,
            password: selectedUser.password,
            fechaNacimiento: selectedUser.fechaNacimiento,
            rol: "ROLE_CLIENTE"
        };

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (response.ok) {
                    alert("✅ Usuario registrado con éxito");
                    fetchUsuarios(); // 🔥 Actualiza la tabla automáticamente
                    setSelectedUser(null); // 🔥 Se oculta el formulario después de crear
                } else {
                    alert("⚠️ Error: " + data.message);
                }
            } else {
                alert("⚠️ Error: El servidor no devolvió un JSON válido.");
            }
        } catch (error) {
            alert("❌ Error al registrar usuario.");
        }
    };

    // 📌 Editar usuario existente
    const editarUsuario = async () => {
        if (!selectedUser || !selectedUser.id) {
            alert("❌ Error: Usuario no seleccionado.");
            return;
        }

        const updatedUser = {
            nombre: selectedUser.nombre,
            apellidos: selectedUser.apellidos,
            email: selectedUser.email,
            password: selectedUser.password,
            fechaNacimiento: selectedUser.fechaNacimiento
        };

        try {
            const response = await fetch(`http://localhost:8080/admin/usuarios/${selectedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                alert("✅ Usuario actualizado correctamente");
                fetchUsuarios();
                setSelectedUser(null);
            } else {
                alert("⚠️ Error al actualizar usuario");
            }
        } catch (error) {
            alert("❌ Error al editar usuario.");
        }
    };

    return (
        <div className="admin-container">
            <h2>Gestión de Usuarios</h2>

            {/* 📌 FORMULARIO SE MUEVE ARRIBA AQUÍ */}
            {selectedUser && (
                <div className="form-container">
                    <h3>{selectedUser.id ? "Editar Usuario" : "Crear Usuario"}</h3>
                    <input type="text" name="nombre" placeholder="Nombre" value={selectedUser.nombre || ""}
                           onChange={handleInputChange}/>
                    <input type="text" name="apellidos" placeholder="Apellidos" value={selectedUser.apellidos || ""}
                           onChange={handleInputChange}/>
                    <input type="email" name="email" placeholder="Email" value={selectedUser.email || ""}
                           onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder="Contraseña" value={selectedUser.password || ""}
                           onChange={handleInputChange} />
                    <input type="date" name="fechaNacimiento" placeholder="Fecha de Nacimiento" value={selectedUser.fechaNacimiento || ""}
                           onChange={handleInputChange} />
                    <button className="btn-guardar" onClick={selectedUser.id ? editarUsuario : crearUsuario}>
                        {selectedUser.id ? "Guardar Cambios" : "Crear"}
                    </button>
                </div>
            )}

            <table className="usuarios-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {usuarios.map((user) => (
                    <tr key={user.id}>
                        <td>{user.nombre}</td>
                        <td>{user.email}</td>
                        <td className="acciones">
                            <button className="btn-crear" onClick={handleCrearUsuario}>Crear</button>
                            <button className="btn-editar" onClick={() => handleEditarUsuario(user)}>Editar</button>
                            <button className="btn-eliminar" onClick={() => eliminarUsuario(user.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsuarios;

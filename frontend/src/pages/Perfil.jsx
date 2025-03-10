import { useEffect, useState } from "react";

const Perfil = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch(`http://localhost:8080/usuarios/${email}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los datos del perfil.");
                }

                const data = await response.json();
                console.log("📥 Datos del perfil recibidos:", data);

                setNombre(data.nombre);
                setApellidos(data.apellidos);
                setFechaNacimiento(data.fechaNacimiento);
            } catch (error) {
                console.error("❌ Error al obtener el perfil:", error);
            }
        };

        fetchPerfil();
    }, [email]);

    const handleActualizarPerfil = async (e) => {
        e.preventDefault();

        const updatedUser = {
            nombre,
            apellidos,
            email, // ✅ Incluir email en la actualización
            fechaNacimiento,
        };

        console.log("📤 Enviando datos al backend:", updatedUser);

        try {
            const response = await fetch(`http://localhost:8080/usuarios/actualizar/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await response.text();
            console.log("📥 Respuesta del backend:", data);

            if (response.ok) {
                alert("✅ Perfil actualizado correctamente");
                localStorage.setItem("email", updatedUser.email);
            } else {
                alert("⚠️ Error al actualizar el perfil: " + data);
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("❌ Error al actualizar el perfil.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center">Mi Perfil</h2>
                <form onSubmit={handleActualizarPerfil}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" value={email} disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de Nacimiento</label>
                        <input type="date" className="form-control" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Actualizar Perfil</button>
                </form>
            </div>
        </div>
    );
};

export default Perfil;

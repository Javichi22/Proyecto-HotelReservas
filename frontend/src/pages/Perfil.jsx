import { useState, useEffect } from "react";

const Perfil = () => {
    const [perfil, setPerfil] = useState({
        nombre: "",
        email: "",
        apellidos: "",
        fechaNacimiento: "",
    });

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch(`http://localhost:8080/usuarios/${localStorage.getItem("email")}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Error al obtener perfil");
                const data = await response.json();
                setPerfil(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPerfil();
    }, []);

    const handleChange = (e) => {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/usuarios/${perfil.email}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(perfil),
            });
            if (!response.ok) throw new Error("Error al actualizar perfil");
            alert("Perfil actualizado con éxito");
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar el perfil");
        }
    };

    return (
        <div className="perfil-container">
            <h2>Mi Perfil</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={perfil.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="apellidos" value={perfil.apellidos} onChange={handleChange} placeholder="Apellidos" required />
                <input type="date" name="fechaNacimiento" value={perfil.fechaNacimiento} onChange={handleChange} required />
                <button type="submit">Actualizar Perfil</button>
            </form>
        </div>
    );
};

export default Perfil;

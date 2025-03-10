import { useState } from "react";

const Habitaciones = ({ habitaciones }) => {
    const [fechaEntrada, setFechaEntrada] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");

    const handleReservar = async (habitacionId) => {
        const userEmail = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        console.log("🛠️ Intentando reservar habitación ID:", habitacionId);

        if (!fechaEntrada || !fechaSalida) {
            alert("⚠️ Debes seleccionar fechas de entrada y salida.");
            return;
        }

        if (new Date(fechaEntrada) >= new Date(fechaSalida)) {
            alert("⚠️ La fecha de entrada debe ser anterior a la fecha de salida.");
            return;
        }

        if (!token.trim() || !userEmail.trim()) {
            alert("⚠️ Error: No estás autenticado. Por favor, inicia sesión nuevamente.");
            window.location.href = "/login"; // Redirigir a la página de login si no está autenticado
            return;
        }

        const reservaRequest = {
            emailUsuario: userEmail,
            habitacionId: habitacionId,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida
        };

        try {
            const response = await fetch("http://localhost:8080/reservas/reservar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(reservaRequest)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            alert("✅ Reserva guardada con éxito.");
            window.location.href = "/mis-reservas"; // Redirige a "Mis Reservas"
        } catch (error) {
            alert(`❌ Error al reservar: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>🏨 Habitaciones Disponibles</h2>

            <label>Fecha Entrada:</label>
            <input type="date" value={fechaEntrada} onChange={(e) => setFechaEntrada(e.target.value)} />
            <label>Fecha Salida:</label>
            <input type="date" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} />

            <div className="habitaciones-grid">
                {habitaciones.map((habitacion) => (
                    <div key={habitacion.id} className="habitacion-card">
                        <h3>{habitacion.nombre}</h3>
                        <p>{habitacion.descripcion}</p>
                        <p><strong>Precio:</strong> {habitacion.precio}€ por noche</p>
                        <button onClick={() => handleReservar(habitacion.id)}>Reservar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habitaciones;

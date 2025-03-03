import { useEffect, useState } from "react";

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const userEmail = localStorage.getItem("email"); // Obtener el email del usuario autenticado

    useEffect(() => {
        const fetchReservas = async () => {
            if (!userEmail) {
                console.error("No se encontró email en localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/reservas/${userEmail}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al obtener reservas: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Reservas obtenidas:", data); // DEBUG: Ver las reservas
                setReservas(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReservas();
    }, [userEmail]);

    return (
        <div>
            <h2>Mis Reservas</h2>
            {reservas.length === 0 ? (
                <p>No tienes reservas registradas.</p>
            ) : (
                <ul>
                    {reservas.map((reserva) => (
                        <li key={reserva.id}>
                            <p>Habitación: {reserva.habitacion}</p>
                            <p>Entrada: {reserva.fechaEntrada}</p>
                            <p>Salida: {reserva.fechaSalida}</p>
                            <button onClick={() => cancelarReserva(reserva.id)}>Cancelar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const cancelarReserva = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/reservas/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.ok) {
            alert("Reserva eliminada correctamente");
            window.location.reload();
        } else {
            alert("Error al eliminar la reserva");
        }
    } catch (error) {
        console.error(error);
    }
};

export default Reservas;

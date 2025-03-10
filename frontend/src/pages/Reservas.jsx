import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

const Reservas = () => {
    const [reservas, setReservas] = useState(() => {
        return JSON.parse(localStorage.getItem("reservas")) || [];
    });

    const handleEliminarReserva = (id) => {
        const nuevasReservas = reservas.filter(reserva => reserva.id !== id);
        setReservas(nuevasReservas);
        localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    };

    const handleReservar = async (habitacionId, fechaEntrada, fechaSalida) => {
        const usuarioEmail = sessionStorage.getItem("email"); // Obtener el usuario autenticado

        if (!usuarioEmail) {
            alert("Debes iniciar sesión para reservar.");
            return;
        }

        const nuevaReserva = {
            emailUsuario: usuarioEmail,
            habitacionId,
            fechaEntrada,
            fechaSalida
        };

        try {
            const response = await fetch("http://localhost:8080/reservas/nueva", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaReserva)
            });

            if (response.ok) {
                alert("Reserva realizada con éxito.");
                window.location.reload(); // Recargar para ver cambios
            } else {
                alert("Error al reservar.");
            }
        } catch (error) {
            console.error("Error en la reserva:", error);
            alert("Error en la conexión.");
        }
    };


    return (
        <Container>
            <h2 className="text-center mt-4">Mis Reservas</h2>
            {reservas.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    No tienes reservas registradas.
                </Alert>
            ) : (
                <Row>
                    {reservas.map((reserva) => (
                        <Col key={reserva.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={reserva.habitacionImagen} alt={reserva.habitacionNombre} />
                                <Card.Body>
                                    <Card.Title>{reserva.habitacionNombre}</Card.Title>
                                    <Card.Text>Precio: {reserva.precio}€</Card.Text>
                                    <Card.Text>Entrada: {reserva.fechaEntrada}</Card.Text>
                                    <Card.Text>Salida: {reserva.fechaSalida}</Card.Text>
                                    <Button variant="danger" onClick={() => handleEliminarReserva(reserva.id)}>
                                        Cancelar Reserva
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Reservas;

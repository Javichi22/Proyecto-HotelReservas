import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

const Home = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [reservas, setReservas] = useState(() => {
        return JSON.parse(localStorage.getItem("reservas")) || [];
    });

    const [fechaEntrada, setFechaEntrada] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/habitaciones")
            .then(response => response.json())
            .then(data => {
                console.log("📥 Habitaciones recibidas:", data);
                setHabitaciones(data);
            })
            .catch(error => console.error("❌ Error cargando habitaciones:", error));
    }, []);

    const handleReservar = (habitacion) => {
        const userEmail = sessionStorage.getItem("email") || localStorage.getItem("email");

        if (!userEmail) {
            alert("❌ No hay sesión activa. Inicia sesión para reservar.");
            return;
        }

        if (!fechaEntrada || !fechaSalida) {
            alert("📅 Selecciona una fecha de entrada y salida.");
            return;
        }

        const nuevaReserva = {
            id: new Date().getTime(), // ID único en frontend
            emailUsuario: userEmail,
            habitacionId: habitacion.id,
            habitacionNombre: habitacion.nombre,
            habitacionImagen: habitacion.imagenUrl,
            precio: habitacion.precio,
            fechaEntrada,
            fechaSalida
        };

        const nuevasReservas = [...reservas, nuevaReserva];
        setReservas(nuevasReservas);
        localStorage.setItem("reservas", JSON.stringify(nuevasReservas));

        alert("✅ Reserva añadida en tus reservas");
    };

    return (
        <Container>
            <h2 className="text-center mt-4">Habitaciones Disponibles</h2>

            {/* Selector de fechas */}
            <Row className="mb-3">
                <Col>
                    <Form.Label>Fecha de Entrada</Form.Label>
                    <Form.Control type="date" onChange={(e) => setFechaEntrada(e.target.value)} />
                </Col>
                <Col>
                    <Form.Label>Fecha de Salida</Form.Label>
                    <Form.Control type="date" onChange={(e) => setFechaSalida(e.target.value)} />
                </Col>
            </Row>

            <Row>
                {habitaciones.map((habitacion) => (
                    <Col key={habitacion.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={habitacion.imagenUrl} alt={habitacion.nombre} />
                            <Card.Body>
                                <Card.Title>{habitacion.nombre}</Card.Title>
                                <Card.Text>Precio: {habitacion.precio}€</Card.Text>
                                <Button variant="primary" onClick={() => handleReservar(habitacion)}>
                                    Reservar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;

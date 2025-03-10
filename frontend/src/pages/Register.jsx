import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = { nombre, apellidos, email, password, fechaNacimiento, rol: "ROLE_CLIENTE" };

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (response.ok) {
                    alert("✅ Usuario registrado con éxito");
                    navigate("/login");
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

    return (
        <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-4">
            <Row className="w-100">
                <Col md={{ span: 8, offset: 2 }}>
                    <Card style={{ maxWidth: "700px" }} className="mx-auto p-4 shadow-lg">
                        <Card.Body>
                            <h2 className="text-center mb-4">Registro</h2>
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                                </Form.Group>

                                <Button variant="dark" type="submit" className="w-100">
                                    Registrarse
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

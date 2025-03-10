import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("📥 Datos recibidos:", data);

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("email", email);

                console.log("✅ Usuario autenticado:", email);

                // 🔄 Ahora, siempre redirige al INICIO
                navigate("/");
            } else {
                alert("❌ Error al iniciar sesión");
            }
        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            alert("Error de conexión con el servidor.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-5">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="p-4 shadow-lg border-0" style={{ maxWidth: "600px" }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">🔑 Iniciar Sesión</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="dark" type="submit" className="w-100">
                                    Ingresar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
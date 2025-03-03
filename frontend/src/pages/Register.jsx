import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    const navigate = useNavigate(); // Para redirigir al login

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            nombre,
            apellidos,
            email,
            password,
            fechaNacimiento,
            rol: "ROLE_CLIENTE"
        };

        console.log("📤 Enviando datos al backend:", userData); // 🛠 Verificar en consola

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            // 📌 ✅ Verifica si el contenido es JSON antes de hacer response.json()
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log("📥 Respuesta del backend:", data); // 🛠 Verificar en consola

                if (response.ok) {
                    alert(data.message);
                    navigate("/login");
                } else {
                    alert("⚠️ Error: " + data.message);
                }
            } else {
                alert("⚠️ Error: El servidor no devolvió un JSON válido.");
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("❌ Error al registrar usuario.");
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;

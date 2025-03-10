import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import AdminReservas from "../pages/AdminReservas.jsx";
import AdminUsuarios from "../pages/AdminUsuarios.jsx";
import Reservas from "../pages/Reservas.jsx";
import Perfil from "../pages/Perfil.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Navbar from "../components/Navbar.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* 🔹 Rutas protegidas para usuarios autenticados */}
                    <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                    <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />

                    {/* 🔹 Rutas protegidas solo para ADMIN */}
                    <Route path="/admin/reservas" element={<ProtectedRoute requiredRole="ADMIN"><AdminReservas /></ProtectedRoute>} />
                    <Route path="/admin/usuarios" element={<ProtectedRoute requiredRole="ADMIN"><AdminUsuarios /></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

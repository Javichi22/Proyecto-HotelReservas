import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import UsuariosDashboard from "../pages/UsuariosDashboard.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import Reservas from "../pages/Reservas.jsx";
import Perfil from "../pages/Perfil.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Navbar from "../components/Navbar.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 🔹 Rutas protegidas para usuarios autenticados */}
                <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />

                {/* 🔹 Rutas protegidas solo para ADMIN */}
                <Route path="/dashboard" element={<ProtectedRoute requiredRole="ADMIN"><Dashboard /></ProtectedRoute>} />
                <Route path="/usuarios" element={<ProtectedRoute requiredRole="ADMIN"><UsuariosDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminPanel /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;

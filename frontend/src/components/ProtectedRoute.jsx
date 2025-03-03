import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== `ROLE_${requiredRole}`) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

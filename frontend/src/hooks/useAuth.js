import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(requiredRole) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (requiredRole && user.rol !== requiredRole) {
            navigate("/");
        }
    }, [user, navigate, requiredRole]);

    return user;
}

import { useEffect, useState } from "react";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/");
                const data = await response.json();
                setUser(data.results[0]); // Guardar el usuario aleatorio
            } catch (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        };

        fetchUser();
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div>
            <h2>Bienvenido a Hotel Reservas</h2>
            <p>Disfruta de la mejor experiencia en reservas de hoteles.</p>

            {/* 🔹 Mostrar datos de la API si existen */}
            {user && (
                <div>
                    <h3>🏨 Nuestro huésped del día</h3>
                    <img src={user.picture.large} alt="Huésped del día" />
                    <p>Nombre: {user.name.first} {user.name.last}</p>
                    <p>País: {user.location.country}</p>
                </div>
            )}
        </div>
    );
};

export default Home;

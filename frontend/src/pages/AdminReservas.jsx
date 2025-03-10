import { useEffect, useState, useCallback } from "react";

const AdminReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [reservaForm, setReservaForm] = useState({
        id: null,
        usuarioId: "",
        habitacionId: "",
        fechaEntrada: "",
        fechaSalida: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    const fetchReservas = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/admin/reservas", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Error al obtener reservas");

            const data = await response.json();
            setReservas(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchUsuarios = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/admin/usuarios", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Error al obtener usuarios");

            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchHabitaciones = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/admin/habitaciones", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Error al obtener habitaciones");

            const data = await response.json();
            setHabitaciones(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchReservas();
        fetchUsuarios();
        fetchHabitaciones();
    }, [fetchReservas, fetchUsuarios, fetchHabitaciones]);

    const handleInputChange = (e) => {
        setReservaForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const cargarReservaParaEditar = (reserva) => {
        setReservaForm({
            id: reserva.id,
            usuarioId: reserva.usuario ? reserva.usuario.id : "",
            habitacionId: reserva.habitacion ? reserva.habitacion.id : "",
            fechaEntrada: reserva.fechaEntrada,
            fechaSalida: reserva.fechaSalida
        });
        setModoEdicion(true);
        setMostrarFormulario(true);
    };

    const resetearFormulario = () => {
        setReservaForm({
            id: null,
            usuarioId: "",
            habitacionId: "",
            fechaEntrada: "",
            fechaSalida: "",
        });
        setModoEdicion(false);
        setMostrarFormulario(false);
    };

    const validarReserva = () => {
        if (!reservaForm.usuarioId || !reservaForm.habitacionId || !reservaForm.fechaEntrada || !reservaForm.fechaSalida) {
            alert("❌ Todos los campos son obligatorios.");
            return false;
        }

        if (new Date(reservaForm.fechaEntrada) >= new Date(reservaForm.fechaSalida)) {
            alert("❌ La fecha de entrada debe ser anterior a la fecha de salida.");
            return false;
        }

        return true;
    };

    const crearReserva = async () => {
        if (!validarReserva()) return;

        const nuevaReserva = {
            usuarioId: parseInt(reservaForm.usuarioId),
            habitacionId: parseInt(reservaForm.habitacionId),
            fechaEntrada: reservaForm.fechaEntrada,
            fechaSalida: reservaForm.fechaSalida
        };

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/admin/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(nuevaReserva),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Error al crear la reserva");
            }

            alert("✅ Reserva creada correctamente");
            fetchReservas();
            resetearFormulario();
        } catch (error) {
            setError(error.message);
            alert("❌ No se pudo crear la reserva. " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarReserva = async () => {
        if (!reservaForm.usuarioId || !reservaForm.habitacionId || !reservaForm.fechaEntrada || !reservaForm.fechaSalida) {
            alert("❌ Todos los campos son obligatorios.");
            return;
        }

        const reservaActualizada = {
            usuarioId: parseInt(reservaForm.usuarioId),
            habitacionId: parseInt(reservaForm.habitacionId),  // Asegúrate de que habitacionId se envíe correctamente
            fechaEntrada: reservaForm.fechaEntrada,
            fechaSalida: reservaForm.fechaSalida
        };

        try {
            const response = await fetch(`http://localhost:8080/admin/reservas/${reservaForm.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(reservaActualizada),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Error al actualizar la reserva");
            }

            alert("✅ Reserva actualizada correctamente");
            fetchReservas();  // Recargar la lista de reservas
            resetearFormulario();  // Limpiar el formulario
        } catch (error) {
            alert("❌ No se pudo actualizar la reserva. " + error.message);
        }
    };

    const eliminarReserva = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta reserva?")) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/admin/reservas/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Error al eliminar la reserva");

            alert("✅ Reserva eliminada correctamente");
            fetchReservas();
        } catch (error) {
            setError(error.message);
            alert("❌ No se pudo eliminar la reserva.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Gestión de Reservas</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <button className="btn btn-primary mb-3" onClick={() => {
                resetearFormulario();
                setMostrarFormulario(true);
            }}>Crear Reserva</button>

            {loading && <div className="text-center">Cargando...</div>}

            <table className="table table-bordered text-center">
                <thead className="bg-dark text-white">
                <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Habitación</th>
                    <th>Fecha Entrada</th>
                    <th>Fecha Salida</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {reservas.map((reserva, index) => (
                    <tr key={reserva.id}>
                        <td>{index + 1}</td>
                        <td>{reserva.usuario ? reserva.usuario.nombre : "Sin usuario"}</td>
                        <td>{reserva.habitacion ? reserva.habitacion.nombre : "Sin habitación"}</td>
                        <td>{reserva.fechaEntrada}</td>
                        <td>{reserva.fechaSalida}</td>
                        <td>
                            <button className="btn btn-success btn-sm me-2" onClick={() => cargarReservaParaEditar(reserva)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {mostrarFormulario && (
                <div className="mt-4 p-4 border rounded bg-light">
                    <h3>{modoEdicion ? "✏️ Editar Reserva" : "➕ Crear Reserva"}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); modoEdicion ? editarReserva() : crearReserva(); }}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <select name="usuarioId" className="form-control" value={reservaForm.usuarioId} onChange={handleInputChange}>
                                <option value="">Selecciona un usuario</option>
                                {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Habitación</label>
                            <select name="habitacionId" className="form-control" value={reservaForm.habitacionId} onChange={handleInputChange}>
                                <option value="">Selecciona una habitación</option>
                                {habitaciones.map(h => <option key={h.id} value={h.id}>{h.nombre}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Fecha Entrada</label>
                            <input type="date" name="fechaEntrada" className="form-control" value={reservaForm.fechaEntrada} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Fecha Salida</label>
                            <input type="date" name="fechaSalida" className="form-control" value={reservaForm.fechaSalida} onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">{modoEdicion ? "Actualizar" : "Crear"}</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminReservas;
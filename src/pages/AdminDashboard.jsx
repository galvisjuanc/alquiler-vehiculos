import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Loader from '../components/Loader';

export default function AdminDashboard() {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [setError] = useState(null);

    // Estado para el formulario de nuevo vehículo
    const [nuevoVehiculo, setNuevoVehiculo] = useState({
        marca: '', modelo: '', placa: '', estado: ''
    });

    const navigate = useNavigate();

// 1. La función de fetch AHORA SOLO hace el fetch. Ya no recibe parámetros ni activa el loading inicial.
    const fetchVehiculos = useCallback(async () => {
        try {
            const res = await API.get('/vehiculos');
            setVehiculos(res.data);
        } catch (err) {
            setError("No se pudo cargar la lista de gestión. Error: " + err.message);
        } finally {
            // Solo apagamos el loading al terminar
            setLoading(false);
        }
    }, []);

// 2. El useEffect queda súper limpio, sin quejas del linter.
    useEffect(() => {
        fetchVehiculos();
    }, [fetchVehiculos]);

// 3. Manejar registro (POST)
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/vehiculos', nuevoVehiculo);
            alert("Vehículo registrado exitosamente.");
            setNuevoVehiculo({ marca: '', modelo: '', placa: '', estado: '' });

            // ¡AQUÍ ES DONDE ACTIVAMOS EL LOADING MANUALMENTE!
            setLoading(true);
            fetchVehiculos(); // Recargar lista
        } catch (err) {
            alert("Error al registrar: " + err.message);
        }
    };

// 4. Manejar actualización de estado (PUT)
    const handleUpdateStatus = async (id, nuevoEstado) => {
        try {
            // Activamos el estado de carga antes de la operación
            setLoading(true);

            if (nuevoEstado === 'NO_DISPONIBLE') {
                // 1. Si se selecciona NO_DISPONIBLE, disparamos el flujo de alquiler

                await API.post(`/operaciones/alquilar/${id}`);
                alert("Vehículo alquilado exitosamente (Estado: NO_DISPONIBLE).");

            } else if (nuevoEstado === 'DISPONIBLE') {
                // 2. Si estaba rentado y lo pasas a DISPONIBLE, llamamos a tu nuevo endpoint de cancelación
                await API.post(`/operaciones/cancelaralquiler/${id}`);
                alert("Alquiler cancelado. El vehículo vuelve a estar DISPONIBLE.");

            }

            // REFRESCAR LA VISTA: Volvemos a traer la lista actualizada de la base de datos
            await fetchVehiculos();

        } catch (err) {
            console.error(err);
            alert("Error al procesar el cambio de estado: " + (err.response?.data?.message || err.message));

            // Si hay un error, apagamos el loader manualmente para que la interfaz no se quede congelada
            setLoading(false);
        }
    };

    const handleStatusSuccess = () => {
        // Podríamos volver a ejecutar el fetch o simplemente navegar
        navigate('/admin');
    };

    if (loading) return <Loader />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel de Administración</h1>

            {/* SECCIÓN 1: FORMULARIO DE REGISTRO */}
            <section style={styles.section}>
                <h3>➕ Registrar Nuevo Vehículo</h3>
                <form onSubmit={handleCreate} style={styles.form}>
                    <input type="text" placeholder="Marca" required value={nuevoVehiculo.marca}
                           onChange={e => setNuevoVehiculo({...nuevoVehiculo, marca: e.target.value})} />
                    <input type="text" placeholder="Modelo" required value={nuevoVehiculo.modelo}
                           onChange={e => setNuevoVehiculo({...nuevoVehiculo, modelo: e.target.value})} />
                    <input type="text" placeholder="Placa" required value={nuevoVehiculo.placa}
                           onChange={e => setNuevoVehiculo({...nuevoVehiculo, placa: e.target.value})} />
                    <input type="text" placeholder="Estado" required value={nuevoVehiculo.estado}
                           onChange={e => setNuevoVehiculo({...nuevoVehiculo, estado: e.target.value})} />
                    <button type="submit" style={styles.btnSubmit}>Guardar Vehículo</button>
                </form>
            </section>

            {/* SECCIÓN 2: TABLA DE GESTIÓN */}
            <section style={styles.section}>
                <h3>📋 Gestión de Flota Actual</h3>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehículo</th>
                        <th>Placa</th>
                        <th>Estado Actual</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehiculos.map(v => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.marca} {v.modelo}</td>
                            <td>{v.placa}</td>
                            <td><strong>{v.estado}</strong></td>
                            <td>
                                <select
                                    value={v.estado}
                                    onChange={(e) => handleUpdateStatus(v.id, e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="DISPONIBLE">Disponible</option>
                                    <option value="NO_DISPONIBLE">No Disponible</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

const styles = {
    container: { maxWidth: '1100px', margin: '0 auto', padding: '30px' },
    title: { borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '30px' },
    section: { background: '#f9f9f9', padding: '25px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #ddd' },
    form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
    btnSubmit: { background: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    select: { padding: '5px', borderRadius: '4px' }
};
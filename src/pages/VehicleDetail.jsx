import { useState } from 'react'; // Añadir useState
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import RentalModal from '../components/RentalModal';

export default function VehicleDetail() {
    // 1. Extraemos el ID de la URL (ej: /vehiculos/5 -> id = 5)
    const { id } = useParams();

    // 2. Hook de navegación para programar botones de "Atrás"
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. Hacemos la petición al Back-End para traer solo este vehículo
    const { data: vehiculo, loading, error } = useFetch(`/vehiculos/${id}`);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    // Función para refrescar los datos tras alquilar (simulación)
    const handleRentalSuccess = () => {
        // Podríamos volver a ejecutar el fetch o simplemente navegar
        navigate('/vehiculos');
    };

    // Si la petición termina pero no hay datos, mostramos un aviso
    if (!vehiculo) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Vehículo no encontrado.</div>;

    // Lógica visual para el estado (similar a la tarjeta)
    const isDisponible = vehiculo.estado?.toLowerCase() === 'disponible';

    return (
        <div style={styles.container}>
            {/* Botón para regresar al catálogo */}
            <button onClick={() => navigate('/vehiculos')} style={styles.backButton}>
                ← Volver al Catálogo
            </button>

            <div style={styles.cardLayout}>
                {/* Columna Izquierda: Imagen o Placeholder */}
                <div style={styles.imageSection}>
                    <span style={{ fontSize: '6rem' }}>🚙</span>
                </div>

                {/* Columna Derecha: Información y Acciones */}
                <div style={styles.infoSection}>
                    <h1 style={styles.title}>{vehiculo.marca} {vehiculo.modelo}</h1>
                    <p style={styles.badge}>{vehiculo.estado}</p>

                    <div style={styles.detailsGrid}>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Año de Fabricación</span>
                            <span style={styles.value}>{vehiculo.anio}</span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Precio Diario</span>
                            <span style={styles.value}>${vehiculo.precioPorDia}</span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Kilometraje</span>
                            <span style={styles.value}>{vehiculo.kilometraje || 'N/A'} km</span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Identificador (ID)</span>
                            <span style={styles.value}>#{vehiculo.id}</span>
                        </div>
                    </div>

                    <div style={styles.actionSection}>
                        <h2 style={styles.priceTag}>Total estimado: ${vehiculo.precioPorDia} / día</h2>

                        {/* Botón de Alquiler: Solo se habilita si está disponible */}

                        <button
                            style={{...styles.rentButton, opacity: vehiculo.estado === 'DISPONIBLE' ? 1 : 0.5}}
                            disabled={vehiculo.estado !== 'DISPONIBLE'}
                            onClick={() => setIsModalOpen(true)}
                        >
                            {vehiculo.estado === 'DISPONIBLE' ? 'Solicitar Alquiler' : 'No Disponible'}
                        </button>

                        <RentalModal
                            vehiculo={vehiculo}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onRentalSuccess={handleRentalSuccess}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Estilos de la vista de detalle
const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
        fontSize: '1rem',
        marginBottom: '20px',
        padding: 0,
        textDecoration: 'underline'
    },
    cardLayout: {
        display: 'flex',
        flexWrap: 'wrap',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        border: '1px solid #eaeaea'
    },
    imageSection: {
        flex: '1 1 400px',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        borderRight: '1px solid #eaeaea'
    },
    infoSection: {
        flex: '1 1 400px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '2rem',
        color: '#222'
    },
    badge: {
        display: 'inline-block',
        background: '#e9ecef',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#495057',
        width: 'fit-content',
        marginBottom: '24px'
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
    },
    detailItem: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '0.85rem',
        color: '#6c757d',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    value: {
        fontSize: '1.1rem',
        color: '#212529',
        fontWeight: '500'
    },
    actionSection: {
        marginTop: 'auto',
        paddingTop: '20px',
        borderTop: '1px solid #eaeaea'
    },
    priceTag: {
        margin: '0 0 15px 0',
        color: '#1a1a1a',
        fontSize: '1.5rem'
    },
    rentButton: {
        width: '100%',
        padding: '14px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        transition: 'background 0.2s'
    }
};
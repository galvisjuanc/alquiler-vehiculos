import { Link } from 'react-router-dom';

export default function VehicleCard({ vehiculo }) {
    // Desestructuramos las propiedades del objeto que viene del backend
    // Ajusta estos nombres si en tu base de datos/entidad de Java se llaman diferente (ej. placa, precioDia)
    const { id, marca, modelo, placa, estado } = vehiculo;

    // Lógica dinámica para el color del estado del vehículo
    const obtenerEstiloEstado = (status) => {
        const baseStyle = {
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '0.85em',
            fontWeight: 'bold',
            display: 'inline-block'
        };

        switch (status?.toLowerCase()) {
            case 'disponible':
                return { ...baseStyle, background: '#e6f4ea', color: '#137333' };
            case 'alquilado':
                return { ...baseStyle, background: '#fce8e6', color: '#c5221f' };
            case 'mantenimiento':
                return { ...baseStyle, background: '#ffe8d6', color: '#b05b00' };
            default:
                return { ...baseStyle, background: '#f1f3f4', color: '#3c4043' };
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.imagePlaceholder}>
                🚗 {/* Puedes reemplazar esto por una imagen real más adelante */}
            </div>

            <div style={styles.content}>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={styles.title}>Carro # {id}</h3>
                </div>

                <p style={styles.text}><strong>Marca:</strong> {marca}</p>
                <p style={styles.text}><strong>Modelo:</strong> {modelo}</p>
                <p style={styles.text}><strong>Placa:</strong> {placa}</p>

                <div style={{ margin: '12px 0' }}>
                    <span style={obtenerEstiloEstado(estado)}>{estado}</span>
                </div>

                {/* Enlace dinámico de React Router hacia la vista de detalles */}
                <Link to={`/vehiculos/${id}`} style={styles.button}>
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
}

// Estilos modernos en línea para mantener el componente auto-contenido
const styles = {
    card: {
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease',
        border: '1px solid #f0f0f0'
    },
    imagePlaceholder: {
        height: '140px',
        background: '#f7f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
        borderBottom: '1px solid #f0f0f0'
    },
    content: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    title: {
        margin: 0,
        fontSize: '1.2rem',
        color: '#1a1a1a'
    },
    model: {
        fontWeight: 'normal',
        color: '#666'
    },
    text: {
        margin: '4px 0',
        color: '#555',
        fontSize: '0.95rem'
    },
    button: {
        marginTop: 'auto',
        display: 'block',
        textAlign: 'center',
        background: '#007bff',
        color: '#fff',
        padding: '10px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'background 0.2s'
    }
};
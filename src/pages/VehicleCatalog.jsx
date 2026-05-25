import { useFetch } from '../hooks/useFetch';
import VehicleCard from '../components/VehicleCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function VehicleCatalog() {

    const { data: vehiculos, loading, error } = useFetch('/vehiculos');

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ marginBottom: '24px', color: '#ffffff' }}>Vehículos Disponibles</h1>

            {vehiculos && vehiculos.length === 0 && (
                <p>No se encontraron vehículos registrados en el sistema.</p>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {vehiculos && vehiculos.map((vehiculo) => (
                    // Inyectamos el componente reutilizable pasando el objeto por props
                    <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
                ))}
            </div>
        </div>
    );
}
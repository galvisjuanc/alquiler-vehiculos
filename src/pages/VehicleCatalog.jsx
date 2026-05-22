import { useFetch } from '../hooks/useFetch';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function VehicleCatalog() {
    // Usamos el Custom Hook apuntando a la URL local de tu API Gateway
    // Ajusta el puerto 8080 y la ruta '/api/vehiculos' según la configuración exacta de tu backend
    const { data: vehiculos, loading, error } = useFetch('http://localhost:8080/api/vehiculos');

    // 1. Pantalla de carga
    if (loading) return <Loader />;

    // 2. Pantalla de error
    if (error) return <ErrorMessage message={error} />;

    // 3. Pantalla de éxito (Renderizamos la lista)
    return (
        <div className="page">
            <h1>Catálogo de Vehículos</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>

                {/* Mapeamos el arreglo de vehículos que nos devolvió el backend */}
                {vehiculos && vehiculos.map((vehiculo) => (
                    <div key={vehiculo.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                        <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
                        <p>Estado: {vehiculo.estado}</p>
                        {/* Aquí luego insertaremos el componente <VehicleCard /> */}
                    </div>
                ))}

            </div>
        </div>
    );
}
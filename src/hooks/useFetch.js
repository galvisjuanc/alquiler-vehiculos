import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    // 1. Definimos los tres estados fundamentales
    const [data, setData] = useState(null);       // Guarda la respuesta del backend
    const [loading, setLoading] = useState(true); // Controla el icono de carga
    const [error, setError] = useState(null);     // Atrapa mensajes si el servidor falla

    useEffect(() => {
        // Creamos una función asíncrona interna para usar async/await
        const fetchData = async () => {
            try {
                // Reiniciamos los estados antes de cada petición
                setLoading(true);
                setError(null);

                // Hacemos la petición HTTP GET
                const response = await axios.get(url);

                // Si todo sale bien, guardamos los datos
                setData(response.data);
            } catch (err) {
                // Si el microservicio está caído o hay un error 404/500
                setError(err.response?.data?.message || 'Error de conexión con el servidor');
            } finally {
                // Siempre apagamos el estado de carga, haya éxito o error
                setLoading(false);
            }
        };

        // Ejecutamos la función
        fetchData();

        // El array de dependencias [url] le dice a React:
        // "Si la URL cambia, vuelve a ejecutar este useEffect"
    }, [url]);

    // Retornamos los estados para que cualquier componente los pueda usar
    return { data, loading, error };
};
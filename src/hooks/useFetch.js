import { useState, useEffect } from 'react';
import API from '../services/api';

export const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await API.get(endpoint);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al conectar con el servidor de vehículos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};
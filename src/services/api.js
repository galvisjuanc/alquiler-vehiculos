import axios from 'axios';

// Creamos una instancia personalizada de Axios
const API = axios.create({
    // Apuntamos a la URL base de tu API Gateway en Docker
    baseURL: 'http://localhost:8080/api',
    timeout: 5000, // Si el backend tarda más de 5 segundos, cancela la petición
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default API;
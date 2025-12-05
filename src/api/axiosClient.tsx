// Ejemplo de configuración de Axios para incluir el token
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Tu base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token en cada solicitud
axiosClient.interceptors.request.use(config => {
  // Recupera el token del localStorage (o de tu contexto de autenticación)
  const token = localStorage.getItem('access_token'); 

  if (token) {
    // Usa el formato Bearer, que es estándar
    config.headers['Authorization'] = `Bearer ${token}`; 
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosClient;
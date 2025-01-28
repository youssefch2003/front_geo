import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
  withXSRFToken: true
});

export default axiosInstance;
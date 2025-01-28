import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
  withXSRFToken: true
});

export default instanceAxios;
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, 
  headers: {
    'Accept': 'application/json',  // Added Accept header
    'Content-Type': 'application/json',
  

  },
  withCredentials: true, 
  withXSRFToken: true
});

export default instanceAxios;
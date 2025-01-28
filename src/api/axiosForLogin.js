import axios from 'axios';

// Create an Axios instance for login requests
const axiosForLogin = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL, 
    withCredentials: true, // Ensures cookies are sent with requests
    withXSRFToken: true
  });
  
  // Function to get the CSRF token
  const getCsrfToken = async () => {
    try {
      await axiosForLogin.get('/sanctum/csrf-cookie');
      console.log('CSRF token retrieved successfully');
    } catch (error) {
      
      console.error('Error retrieving CSRF token:', error.response ? error.response.data : error.message);
    }
  };
  
  // Named exports
  export { axiosForLogin, getCsrfToken };
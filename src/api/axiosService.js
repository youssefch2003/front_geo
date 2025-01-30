// axiosService.js
import instanceAxios from './instanceAxios';

// Example: Get all services
export const  fetchServices = async () => {
  try {
    const response = await instanceAxios.get('/services');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

// Get all employees
export const  fetchEmployees = async () => {
  try {
    const response = await instanceAxios.get('/all');
    console.log(response.data);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
// Get all employees
export const fetchEmployeesSameService = async () => {
  try {
    const response = await instanceAxios.get(`/services/encommuns`);
    // console.log("99999999999999999",response.data);
    return response.data.users; // Assuming response contains users
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Add new service
export const addService = async ({name, responsable_id}) => {
  console.log(name,
    responsable_id,"drom the req")
    try {
      const response = await instanceAxios.post('/services', {
        name,
        responsable_id,
      });
      console.log('Service created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  // Edit an existing service
export const editService = async (id,{name, responsable_id}) => {

    try {
      const urlId = id;
      console.log('Service ID:', urlId); // Log to confirm the ID is correct
  
      const response = await instanceAxios.put(`/services/${urlId}`, {
        name,
        responsable_id,
      });
      console.log('Service updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };
  
  // Delete a service
  export const deleteService = async (id) => {
    try {
      const response = await instanceAxios.delete(`/services/${id}`);
      console.log('Service deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };


// axiosForEmployees.js
import instanceAxios from './instanceAxios';

// Example: Get all employees
export const fetchEmployees = async () => {
  try {
    const response = await instanceAxios.get('/all');
    console.log(response.data.users);
    return response.data.users; // Adjust to the response structure as needed
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

// Add new employee
export const addEmployee = async ({ firstName, lastName, email, password, role, service_id }) => {
  try {
    const response = await instanceAxios.post('/users', {
      firstName,
      lastName,
      email,
      password,
      role,
      service_id,
      
    });
    console.log('Employee created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
  }
};

// Edit an existing employee
export const editEmployee = async (id, { firstName, lastName, email, password, role, service_id,status }) => {
  try {
    const urlId = id;
    console.log('Employee ID:', urlId); // Log to confirm the ID is correct
    
    const response = await instanceAxios.put(`/users/${urlId}`, {
      firstName,
      lastName,
      email,
      password,
      role,
      service_id,
      status
    });
    console.log('Employee updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

// Delete an employee
export const deleteEmployee = async (id) => {
  try {
    const response = await instanceAxios.delete(`/users/${id}`);
    console.log('Employee deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

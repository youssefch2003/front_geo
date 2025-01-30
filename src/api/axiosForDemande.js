//axiosForDemande.js

import instanceAxios from './instanceAxios';

// Example: Get all demandes (leave requests)
export const fetchDemandes = async () => {
  try {
    const response = await instanceAxios.get('/demandes'); // Assuming '/demandes' is the route for fetching demandes
    // console.log(response.data); // Log response data for debugging
    return response.data.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching demandes:', error); // Log errors if something goes wrong
    throw error; // Rethrow the error to be handled by the calling code
  }
};
// Function to create a new demande (leave request)
export const addDemande = async (demandeData) => {
    console.log(demandeData,"from api file ")
    try {
      const response = await instanceAxios.post('/demandes', demandeData); // Assuming '/demandes' is the route to add a demande
      console.log(response.data); // Log response data
      return response.data; // Return response data
    } catch (error) {
      console.error('Error adding demande:', error); // Log errors if something goes wrong
      throw error; // Rethrow the error to be handled in the calling code
    }
  };
// Function to update an existing demande (leave request)
export const updateDemande = async (id, demandeData) => {
    try {
      const response = await instanceAxios.put(`/demandes/${id}`, demandeData); // Assuming '/demandes/{id}' is the route to update a demande
      console.log(response.data); // Log response data
      return response.data; // Return response data
    } catch (error) {
      console.error('Error updating demande:', error); // Log errors if something goes wrong
      throw error; // Rethrow the error to be handled in the calling code
    }
  };
// Function to delete an existing demande (leave request)
export const deleteDemande = async (id) => {
    try {
      const response = await instanceAxios.delete(`/demandes/${id}`); // Assuming '/demandes/{id}' is the route to delete a demande
      console.log(response.data); // Log response data
      return response.data; // Return response data
    } catch (error) {
      console.error('Error deleting demande:', error); // Log errors if something goes wrong
      throw error; // Rethrow the error to be handled in the calling code
    }
  };

  
// Get all type conges
export const fetchTypeConges = async () => {
    try {
      const response = await instanceAxios.get('/type-conges'); 
    //   console.log("type conges success",response.data); 
      return response.data.list;
    } catch (error) {
      console.error('Error fetching demandes:', error); 
      throw error; 
    }
  };
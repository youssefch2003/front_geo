import React, { useState, useEffect } from 'react';
import Table from './Table';
import { fetchServices, addService, editService, deleteService } from '../../api/axiosService'; // Assuming you have these functions for editing and deleting services
import ServiceModal from './ServiceModal';

const Services = () => {
  const [services, setServices] = useState([]); // State to hold services data
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setServiceToEdit(null); // Reset service to edit when modal is closed
  };

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Responsable', accessor: 'responsable_name' },
   
  ];

  // Fetch services from the backend
  const loadServices = async () => {
    try {
      const fetchedServices = await fetchServices();
  
      // Flatten data for nested properties
      const processedServices = fetchedServices.map((service) => ({
        ...service,
        responsable_name: service.responsable
          ? `${service.responsable.firstName || ''} ${service.responsable.lastName || ''}`.trim() || 'N/A'
          : 'N/A',
      }));
  
      setServices(processedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    }
  };

  // Load services initially
  useEffect(() => {
    loadServices();
  }, []);

  // Filter the data based on the search query
  const filteredData = Array.isArray(services)
    ? services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.responsable_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Function to handle new service creation
  const handleNewService = async (newService) => {
    try {
      if (serviceToEdit) {
        // Make API call to edit the service if editing
        await editService(serviceToEdit.id, newService); // Assuming 'id' is the unique identifier
      } else {
        // Make API call to create the new service
        await addService(newService);
      }

      // After service is created or updated, fetch the updated list of services
      loadServices(); // Trigger a reload of services after adding or editing

      // Close the modal after service is created or updated
      setIsModalOpen(false);
      setServiceToEdit(null); // Reset the edit state after success
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  // Function to handle service editing
  const handleEdit = (service) => {
    setServiceToEdit(service);
    setIsModalOpen(true); // Open modal in edit mode
  };

  // Function to handle service deletion
  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);  // Make sure deleteService is working correctly
      loadServices();  // Reload services after deleting
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64"
        />
        <button
          onClick={() => setIsModalOpen(true)} // Open modal for new service
          className="py-2 px-6 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Ajouter
        </button>
      </div>

      {/* Table with filtered data */}
      <Table columns={columns} data={filteredData} />
      
      {/* Pass the handleNewService function as a prop */}
      <Table 
  columns={columns} 
  data={filteredData} 
  handleEdit={handleEdit} 
  handleDelete={handleDelete}
/>

    </div>
  );
};

export default Services;

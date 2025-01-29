import React, { useState, useEffect } from 'react';
import Table from './Table';
import { fetchServices, addService, editService, deleteService } from '../../api/axiosService'; // Assuming you have these functions for editing and deleting services
import ServiceModal from './ServiceModal';
import { useToaster } from 'rsuite';
import Toast from '../../utils/Toast';

const Services = () => {
  const [services, setServices] = useState([]); // State to hold services data
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [toasts, setToasts] = useState([]); // State to manage toasts


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setServiceToEdit(null); // Reset service to edit when modal is closed
  };

  const columns = [
    { Header: 'Nom', accessor: 'name' },
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
        await editService(serviceToEdit.id, newService);
        setToasts(prevToasts => [
          ...prevToasts,
          { type: 'success', message: 'Le service a été mis à jour.' }
        ]);
      } else {
        await addService(newService);
        setToasts(prevToasts => [
          ...prevToasts,
          { type: 'success', message: 'Le service a été ajouté.' }
        ]);
      }
      await loadServices();
      toggleModal();

      // Supprimer le toast après 5 secondes (5000ms)
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'Le service a été mis à jour.' && toast.message !== 'Le service a été ajouté.'));
      }, 5000);

    } catch (error) {
      console.error('Erreur lors de la sauvegarde du service :', error);
      setToasts(prevToasts => [
        ...prevToasts,
        { type: 'error', message: 'Il y a eu un problème lors de la sauvegarde du service.' }
      ]);
      
      // Supprimer le toast d'erreur après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'Il y a eu un problème lors de la sauvegarde du service.'));
      }, 5000);
    }
};



  

  // Function to handle service editing
  const handleEdit = (service) => {
    setServiceToEdit(service);
    setIsModalOpen(true); // Open modal in edit mode
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);  // Supprimer le service
      loadServices();  // Recharger les services après la suppression
  
      // Afficher un toast de succès
      setToasts(prevToasts => [
        ...prevToasts,
        { type: 'success', message: 'Le service a été supprimé avec succès.' }
      ]);
  
      // Supprimer le toast de succès après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'Le service a été supprimé avec succès.'));
      }, 5000);
  
    } catch (error) {
      console.error('Erreur lors de la suppression du service :', error);
  
      // Afficher un toast d'erreur
      setToasts(prevToasts => [
        ...prevToasts,
        { type: 'error', message: 'Il y a eu un problème lors de la suppression du service.' }
      ]);
  
      // Supprimer le toast d'erreur après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'Il y a eu un problème lors de la suppression du service.'));
      }, 5000);
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

      
      
            {/* Pass the handleNewService function as a prop */}
            <Table 
        columns={columns} 
        data={filteredData} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete}
      />
      <ServiceModal 
  isOpen={isModalOpen} 
  onClose={toggleModal} 
  onServiceCreated={handleNewService} 
  serviceToEdit={serviceToEdit} 
/>
<div className="fixed bottom-0 right-0 p-4 space-y-4">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            type={toast.type}
            message={toast.message}
            onClose={() => setToasts(toasts.filter((_, i) => i !== index))}
          />
        ))}
      </div>

    </div>
  );
};

export default Services;

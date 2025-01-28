import React, { useState, useEffect } from 'react';

const ServiceModal = ({ isOpen, onClose, onServiceCreated, serviceToEdit }) => {
  const [serviceData, setServiceData] = useState({
    name: '',
    responsable: '',
  });

  useEffect(() => {
    if (serviceToEdit) {
      setServiceData({
        name: serviceToEdit.name || '',
        responsable: serviceToEdit.responsable_name || '',
      });
    } else {
      setServiceData({
        name: '',
        responsable: '',
      });
    }
  }, [serviceToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if we're editing or creating a new service
    if (serviceToEdit) {
      // Call edit service API if editing
      try {
        await onServiceCreated(serviceData, serviceToEdit.id); // Assuming editService is passed as onServiceCreated
        onClose(); // Close modal after success
      } catch (error) {
        console.error('Error editing service:', error);
      }
    } else {
      // Call add service API if creating new
      try {
        await onServiceCreated(serviceData);
        onClose(); // Close modal after success
      } catch (error) {
        console.error('Error creating service:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl mb-4">{serviceToEdit ? 'Edit Service' : 'Add Service'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={serviceData.name}
                onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="responsable" className="block text-sm font-medium text-gray-700">Responsable</label>
              <input
                type="text"
                id="responsable"
                value={serviceData.responsable}
                onChange={(e) => setServiceData({ ...serviceData, responsable: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 py-2 px-6 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-6 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600"
              >
                {serviceToEdit ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ServiceModal;

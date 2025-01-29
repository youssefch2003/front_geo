import React, { useState, useEffect } from "react";
import { fetchEmployees } from "../../api/axiosService";

const ServiceModal = ({ isOpen, onClose, onServiceCreated, serviceToEdit }) => {
  const [serviceData, setServiceData] = useState({
    name: "",
    responsable_id: "",
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (serviceToEdit) {
      setServiceData({
        id: serviceToEdit.id,
        name: serviceToEdit.name || "",
        responsable_id: serviceToEdit.responsable_id || "",
      });
    } else {
      setServiceData({
        name: "",
        responsable_id: "",
      });
    }
  }, [serviceToEdit]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchEmployees();
        setEmployees(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    loadEmployees();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!serviceData.name || !serviceData.responsable_id) {
  //     console.log("Missing required fields.");
  //     return;
  //   }
  //   console.log("Submitting service data:", serviceData);
  //   try {
  //     await onServiceCreated(serviceData, serviceToEdit?.id);
  //     onClose();
  //   } catch (error) {
  //     console.error('Error saving service:', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceData.name || !serviceData.responsable_id) {
      console.log("Missing required fields.");
      return;
    }
    console.log("Submitting service data:", serviceData);

    // Ensure responsable_id is a number
    const dataToSubmit = {
      ...serviceData,
      responsable_id: Number(serviceData.responsable_id), // Convert to number
    };

    try {
      console.log(serviceToEdit, "❤️❤️❤️❤️❤️❤️");
      await onServiceCreated(dataToSubmit, serviceToEdit?.id);
      onClose();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center borderrounded-lg z-50">
        <div className="bg-slate-50 p-6 rounded-lg w-96  shadow-lg shadow-slate-500 ">
          <h2 className="text-2xl mb-4">
            {serviceToEdit ? "Modifier Service" : "Ajouter Service"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                value={serviceData.name}
                onChange={(e) =>
                  setServiceData({ ...serviceData, name: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="responsable"
                className="block text-sm font-medium text-gray-700"
              >
                Responsable
              </label>
              <select
                id="responsable"
                value={serviceData.responsable_id}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    responsable_id: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Responsable</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 py-2 px-6 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="py-2 px-6 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600"
              >
                {serviceToEdit ? "Enregistrer" : "Ajouter un service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ServiceModal;

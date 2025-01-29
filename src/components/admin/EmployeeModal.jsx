import React, { useState, useEffect } from "react";
import { fetchEmployees, fetchServices } from "../../api/axiosService";

const EmployeeModal = ({ isOpen, onClose, onEmployeeCreated, employeeToEdit }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "",
    service_id: "",
    role: "", // Added role field
  });
  const [services, setServices] = useState([]);
// console.log(employeeData,'66666')
  useEffect(() => {
    if (employeeToEdit) {
      setEmployeeData({
        id: employeeToEdit.id,
        firstName: employeeToEdit.firstName || "",
        lastName: employeeToEdit.lastName || "",
        email: employeeToEdit.email || "",
        password: employeeToEdit.password || "",
        status: employeeToEdit.status || "",
        service_id: employeeToEdit.service_id || "",
      });
    } else {
      setEmployeeData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        status: "",
        service_id: "",
        role: "", // Initialize role as empty
      });
    }
  }, [employeeToEdit]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchServices(); // Assuming a function to get services
        setServices(response); // Load services
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    loadServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that all required fields are filled
    // if (
    //   !employeeData.firstName ||
    //   !employeeData.lastName ||
    //   !employeeData.email ||
    //   !employeeData.password ||
    //   !employeeData.status ||
    //   !employeeData.service_id ||
    //   (employeeToEdit && !employeeData.role)  // Check for role only if it's being edited
    // ) {
    //   console.log("Missing required fields.");
    //   return;
    // }
  
    const dataToSubmit = {
      ...employeeData,
      service_id: Number(employeeData.service_id), // Ensure service_id is a number
    };
  
    console.log("Data to submit:******************", dataToSubmit);
  
    try {
      await onEmployeeCreated(dataToSubmit, employeeToEdit?.id);
      onClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };
  

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center borderrounded-lg z-50">
        <div className="bg-slate-50 p-6 rounded-lg w-96 shadow-lg shadow-slate-500">
          <h2 className="text-2xl mb-4">
            {employeeToEdit ? "Modifier Employé" : "Ajouter Employé"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Form fields for firstName, lastName, email, etc. */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={employeeData.firstName}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, firstName: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={employeeData.lastName}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, lastName: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={employeeData.email}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, email: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={employeeData.password}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, password: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
    Statut
  </label>
  <select
    id="status"
    value={employeeData.status === 1 ? "active" : employeeData.status === 0 ? "inactive" : ""}
    onChange={(e) =>
      setEmployeeData({
        ...employeeData,
        status: e.target.value === "active" ? 1 : e.target.value === "inactive" ? 0 : "",
      })
    }
    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
    required
  >
    <option value="">Sélectionnez un statut</option>
    <option value="active">Actif</option>
    <option value="inactive">Inactif</option>
  </select>
</div>

            <div className="mb-4">
              <label htmlFor="service_id" className="block text-sm font-medium text-gray-700">
                Service
              </label>
              <select
                id="service_id"
                value={employeeData.service_id}
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    service_id: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
           {/* Role Selection - Only show when adding a new employee */}
{!employeeToEdit && (
  <div className="mb-4">
    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
      Rôle
    </label>
    <select
      id="role"
      value={employeeData.role}
      onChange={(e) =>
        setEmployeeData({ ...employeeData, role: e.target.value })
      }
      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
      required
    >
      <option value="">Sélectionnez un rôle</option>
      <option value="admin">Admin</option>
      <option value="responsable">Responsable</option>
      <option value="employe">Employé</option>
    </select>
  </div>
)}
            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded-lg"
            >
              {employeeToEdit ? "Mettre à jour" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EmployeeModal;

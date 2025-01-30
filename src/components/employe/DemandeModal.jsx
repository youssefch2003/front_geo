import React, { useState, useEffect } from "react";
import { fetchEmployeesSameService } from "../../api/axiosService"; // Adjust according to your API structure
import { fetchTypeConges } from "../../api/axiosForDemande";

const DemandeModal = ({ isOpen, onClose, onDemandeCreated, demandeToEdit }) => {
  const [demandeData, setDemandeData] = useState({
    conge_type_id: "",
    start_date: "",
    end_date: "",
    remplacant_id: "",
  });

  const [employees, setEmployees] = useState([]);
  const [congeTypes, setCongeTypes] = useState([]); // For conge types (e.g., Sick Leave, Annual Leave)

  // Load the demande data for editing
  useEffect(() => {
    if (demandeToEdit) {
      setDemandeData({
        id: demandeToEdit.id,
        conge_type_id: demandeToEdit.conge_type_id || "",
        start_date: demandeToEdit.start_date || "",
        end_date: demandeToEdit.end_date || "",
        remplacant_id: demandeToEdit.remplacant_id || "",
      });
    } else {
      setDemandeData({
        conge_type_id: "",
        start_date: "",
        end_date: "",
        remplacant_id: "",
      });
    }
  }, [demandeToEdit]);

  // Load employees and conge types from API or mock data
  useEffect(() => {
    const loadEmployees = async () => {
        try {
          const employees = await fetchEmployeesSameService();
          setEmployees(employees); // Assuming employees is an array
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      };
    
     

    const loadCongeTypes = async ()=>{
        try {
            const response = await fetchTypeConges(); // Adjust this function for employee fetching
            setCongeTypes(response);
          } catch (error) {
            console.error("Error fetching employees:", error);
          }
    }

  

    loadEmployees();
    loadCongeTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!demandeData.conge_type_id || !demandeData.start_date || !demandeData.end_date  || !demandeData.remplacant_id) {
      console.log("Missing required fields.");
      return;
    }

    const dataToSubmit = {
      ...demandeData,
      conge_type_id: Number(demandeData.conge_type_id),
      remplacant_id: Number(demandeData.remplacant_id),
      start_date: new Date(demandeData.start_date),
      end_date: new Date(demandeData.end_date),
    };
    console.log(dataToSubmit)
    try {
      await onDemandeCreated(dataToSubmit, demandeToEdit?.id);
      setDemandeData({
        conge_type_id: "",
        start_date: "",
        end_date: "",
        remplacant_id: "",
      });
      onClose();
    } catch (error) {
      console.error("Error saving demande:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-2xl mb-4">
            {demandeToEdit ? "Modifier Demande" : "Ajouter Demande"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="conge_type_id" className="block text-sm font-medium text-gray-700">
                Type de congé
              </label>
              <select
                id="conge_type_id"
                value={demandeData.conge_type_id}
                onChange={(e) => setDemandeData({ ...demandeData, conge_type_id: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Sélectionner un type de congé</option>
                {congeTypes.map((conge) => (
                    <option key={conge.id} value={conge.id}>
                        {conge.name}
                    </option>
                    ))}
              </select>
            </div>

          

            <div className="mb-4">
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                Date de début
              </label>
              <input
                type="date"
                id="start_date"
                value={demandeData.start_date}
                onChange={(e) => setDemandeData({ ...demandeData, start_date: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                Date de fin
              </label>
              <input
                type="date"
                id="end_date"
                value={demandeData.end_date}
                onChange={(e) => setDemandeData({ ...demandeData, end_date: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              />
            </div>

         

            <div className="mb-4">
              <label htmlFor="remplacant_id" className="block text-sm font-medium text-gray-700">
                Remplaçant
              </label>
              <select
                id="remplacant_id"
                value={demandeData.remplacant_id}
                onChange={(e) => setDemandeData({ ...demandeData, remplacant_id: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Sélectionner un remplaçant</option>
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
                {demandeToEdit ? "Enregistrer" : "Ajouter une Demande"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default DemandeModal;

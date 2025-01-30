import React, { useState, useEffect } from "react";
import { fetchEmployees } from "../../api/axiosService"; // Adjust according to your API structure
import Table from "../admin/Table"; // Make sure to import your Table component
import DemandeModal from "./DemandeModal"; // Import the modal for adding/editing demande
import Toast from "../../utils/Toast"; // Make sure to import your Toast component
import { fetchDemandes, addDemande, updateDemande, deleteDemande } from "../../api/axiosForDemande";

const Demande = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [demandeData, setDemandeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demandeToEdit, setDemandeToEdit] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const fetchDemandeDataFromAPI = async () => {
      try {
        const data = await fetchDemandes();
        console.log(data,"6363+")
        setDemandeData(data);
      } catch (error) {
        console.error("Error fetching demandes:", error);
      }
    };
    fetchDemandeDataFromAPI();
  }, []);

  useEffect(() => {
   
    setFilteredData(
        demandeData.filter((demande) => {
          return (
            (demande.conge_type && demande.conge_type.name && demande.conge_type.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (demande.motif && demande.motif.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        })
      );
      
          
  }, [searchQuery, demandeData]);
  
  const handleEdit = (demande) => {
    setDemandeToEdit(demande);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDemande(id);
      setDemandeData(demandeData.filter(demande => demande.id !== id));
      setToasts([...toasts, { type: "success", message: "Demande deleted successfully!" }]);
    } catch (error) {
      setToasts([...toasts, { type: "error", message: "Error deleting demande!" }]);
      console.error("Error deleting demande:", error);
    }
  };

  const handleNewDemande = async (newDemande) => {
    try {
      const savedDemande = await addDemande(newDemande);
      setDemandeData([...demandeData, savedDemande]);
      setToasts([...toasts, { type: "success", message: "Demande added successfully!" }]);
    } catch (error) {
      setToasts([...toasts, { type: "error", message: "Error adding demande!" }]);
      console.error("Error adding demande:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setDemandeToEdit(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Demandes</h1>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-6 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
        >
          Ajouter
        </button>
      </div>
      <Table 
        columns={[
            { Header: "Type de congé", accessor: "conge_type.name", Cell: ({ row }) => row.original.conge_type?.name || 'N/A' },
            { Header: "Motif", accessor: "motif", Cell: ({ row }) => row.original.motif || 'N/A' },
            { Header: "Statut", accessor: "status", Cell: ({ row }) => row.original.status || 'N/A' },
            { Header: "Date de début", accessor: "start_date" },
          { Header: "Date de fin", accessor: "end_date" },
        ]}
        data={filteredData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <DemandeModal 
        isOpen={isModalOpen} 
        onClose={toggleModal} 
        onDemandeCreated={handleNewDemande} 
        demandeToEdit={demandeToEdit} 
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

export default Demande;

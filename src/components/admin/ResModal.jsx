import React, { useState, useEffect } from "react";

const ResModal = ({ isOpen, onClose, onDemandeUpdated, demandeToEdit }) => {
  const [demandeData, setDemandeData] = useState({
    status: "",
    motif: "",
  });

  // Load the demande data for editing
  useEffect(() => {
    if (demandeToEdit) {
      setDemandeData({
        status: demandeToEdit.status || "",
        motif: demandeToEdit.motif || "",
  

      });
    } else {
      setDemandeData({
        status: "",
        motif: "",
      });
    }
  }, [demandeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure a demande is selected before updating
    if (!demandeToEdit?.id) {
      console.log("No demande selected for update.");
      return;
    }

    const dataToSubmit = {
      status: demandeData.status,
      motif: demandeData.motif,
      end_date:demandeToEdit.end_date || "",
      start_date:demandeToEdit.start_date || "",
    };

    try {
      await onDemandeUpdated(dataToSubmit, demandeToEdit.id);
      setDemandeData({ status: "", motif: "" });
      onClose();
    } catch (error) {
      console.error("Error updating demande:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96  shadow-lg shadow-slate-500">
          <h2 className="text-2xl mb-4">Modifier Demande</h2>
          <form onSubmit={handleSubmit}>
            {/* Status Field */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <select
                id="status"
                value={demandeData.status}
                onChange={(e) => setDemandeData({ ...demandeData, status: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Sélectionner un statut</option>
                <option value="en attente">En attente</option>
                <option value="approuvé">Approuvé</option>
                <option value="rejeté">Rejeté</option>
                <option value="en cours">En cours</option>
              </select>
            </div>

            {/* Motif Field */}
            <div className="mb-4">
              <label htmlFor="motif" className="block text-sm font-medium text-gray-700">
                Motif
              </label>
              <textarea
                id="motif"
                value={demandeData.motif}
                onChange={(e) => setDemandeData({ ...demandeData, motif: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              ></textarea>
            </div>

            {/* Buttons */}
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
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ResModal;

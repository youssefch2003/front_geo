// ViewModal.jsx
import React from 'react';

const ViewModal = ({ isOpen, onClose, demande, dataType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg shadow-slate-500 p-6 w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {dataType === 'employee' ? 'Employé' : 'Service'} Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {dataType === 'employee' ? (
            <>
              <div className="flex justify-between">
                <span className="font-semibold">Nom:</span>
                <span>{demande?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Responsable:</span>
                <span>{demande?.responsable_name}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="font-semibold">Nom du Service:</span>
                <span>{demande?.service_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Manager:</span>
                <span>{demande?.manager_name}</span>
              </div>
            </>
          )}
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;

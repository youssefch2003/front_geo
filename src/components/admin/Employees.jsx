import React, { useState, useEffect } from 'react';
import Table from './Table';
import { fetchEmployees, editEmployee, deleteEmployee, addEmployee } from '../../api/axiosForEmployees';
import EmployeeModal from './EmployeeModal';
import { useToaster } from 'rsuite';
import Toast from '../../utils/Toast';

const roleOptions = ['admin', 'responsable', 'employe']; // Example role options

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEmployeeToEdit(null);
  };

  const loadEmployees = async () => {
    try {
      const fetchedEmployees = await fetchEmployees();
      // Flatten data for nested properties
      const processedEmployees = fetchedEmployees.map((employee) => ({
        ...employee,
        service_name: employee.service
          ? employee.service.name || 'N/A'
          : 'N/A',
      }));
  
      setEmployees(processedEmployees);

    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Function to handle employee editing
  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true); // Open modal in edit mode
  };

  // Function to handle new employee creation
  const handleNewEmployee = async (newEmployee) => {
    try {
      if (employeeToEdit) {
        await editEmployee(employeeToEdit.id, newEmployee);
        setToasts(prevToasts => [
          ...prevToasts,
          { type: 'success', message: 'L\'employé a été mis à jour.' }
        ]);
      } else {
        await addEmployee(newEmployee);
        setToasts(prevToasts => [
          ...prevToasts,
          { type: 'success', message: 'L\'employé a été ajouté.' }
        ]);
      }
      await loadEmployees();
      toggleModal();

      // Supprimer le toast après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'L\'employé a été mis à jour.' && toast.message !== 'L\'employé a été ajouté.'));
      }, 5000);

    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'employé :', error);
      setToasts(prevToasts => [
        ...prevToasts,
        { type: 'error', message: 'Il y a eu un problème lors de la sauvegarde de l\'employé.' }
      ]);
      
      // Supprimer le toast d'erreur après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'Il y a eu un problème lors de la sauvegarde de l\'employé.'));
      }, 5000);
    }
  };

  // Function to handle employee deletion
  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);  // Supprimer l'employé
      loadEmployees();  // Recharger les employés après la suppression
  
      // Afficher un toast de succès
      setToasts(prevToasts => [
        ...prevToasts,
        { type: 'success', message: 'L\'employé a été supprimé avec succès.' }
      ]);
  
      // Supprimer le toast de succès après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'L\'employé a été supprimé avec succès.'));
      }, 5000);
  
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé :', error);
  
      // Afficher un toast d'erreur
      setToasts(prevToasts => [
        ...prevToasts,
        { type: 'error', message: 'Il y a eu un problème lors de la suppression de l\'employé.' }
      ]);
  
      // Supprimer le toast d'erreur après 5 secondes
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.message !== 'Il y a eu un problème lors de la suppression de l\'employé.'));
      }, 5000);
    }
  };

  // Filter the data based on the search query
  const filteredData = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = [
    { Header: 'Prénom', accessor: 'firstName' },
    { Header: 'Nom', accessor: 'lastName' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Statut', accessor: 'status' },
    { Header: 'Service', accessor: 'service_name' },
    { 
      Header: 'Rôle', 
      accessor: 'roles', 
      Cell: ({ row }) => {
        const employee = row;
        const roles = employee.roles || [];
        const currentRole = roles.length > 0 ? roles[0].name : 'N/A';

        return editingRole === employee.id ? (
          <select
            value={currentRole}
            onChange={(e) => handleRoleChange(employee, e.target.value)}
            onBlur={() => setEditingRole(null)}
            className=' border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 '
            autoFocus
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        ) : (
          <span
            onClick={() => setEditingRole(employee.id)}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {currentRole}
          </span>
        );
      }
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employés</h1>

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
          onClick={() => setIsModalOpen(true)} // Open modal for new employee
          className="py-2 px-6 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Ajouter
        </button>
      </div>

      {/* Pass the handleNewEmployee function as a prop */}
      <Table 
        columns={columns} 
        data={filteredData} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete}
      />
      <EmployeeModal 
        isOpen={isModalOpen} 
        onClose={toggleModal} 
        onEmployeeCreated={handleNewEmployee} 
        employeeToEdit={employeeToEdit} 
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

export default Employees;

import React from 'react';
import A from '../../assets/A.png'
import B from '../../assets/R.png'
import E from '../../assets/A.png'
import { useSelector } from 'react-redux';

const Welcome = () => {
  const { user, role } = useSelector((state) => state.auth);

  // Map backend roles to display names
  const roleMapping = {
    admin: 'Administrateur',
    responsable: 'Responsable',
    employe: 'Employé',
  };

  // Determine the profile image based on the role
  const getProfileImage = (role) => {
    switch (role) {
      case 'admin':
        return A;
      case 'responsable':
        return B;
      case 'employe':
        return E;
      default:
        return A; // Default image
    }
  };

  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex items-center">
        {/* Dynamic Image Based on Role */}
        <img src={getProfileImage(role)} alt={role} className="h-12 w-12 mr-2" />

        <div>
          <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            Heureux de vous revoir, {user?.firstName} !
          </h5>
          <p className="text-left font-normal text-gray-700 dark:text-gray-400">
            {roleMapping[role] || 'Utilisateur'} {/* Default to 'Utilisateur' if role is undefined */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

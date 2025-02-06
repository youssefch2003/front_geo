import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to manage menu visibility

  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Handle Logout action
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="relative">
      {/* Ellipsis button to toggle the dropdown */}
      <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
        <EllipsisVertical className="h-5" />
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
          <ul className="text-gray-700 p-0.5">
            {/* <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => console.log('Navigating to Paramètres')}
              >
                Paramètres
              </a>
            </li> */}
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavMenu;

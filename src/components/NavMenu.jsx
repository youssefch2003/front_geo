import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import { logout } from '../redux/authSlice';
import { Logout } from '../api/authApi';

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Handle Logout
  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      await Logout(); // Call API to log out the user
      dispatch(logout()); // Update Redux state
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
        <EllipsisVertical className="h-5" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
          <ul className="text-gray-700 p-0.5">
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

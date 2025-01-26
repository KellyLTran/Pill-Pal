import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import useUserStore from '../hooks/userStore'; // Correct import path
import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons

export default function Navbar() {
  const { user, logout } = useUserStore();
  const location = useLocation(); // Get the current location

  return (
    <div className="font-montserrat fixed top-0 w-full shadow-lg bg-white z-100">
      <div className="container mx-auto flex flex-row justify-between items-center h-20 px-4">
        {/* Logo */}
        <Link to="/" className="text-black hover:text-slate-300 px-4 py-2 rounded transition duration-300">
          <div>
            <img className="w-20" src="package-lock.png" alt="Logo" />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-row items-center space-x-4">
          {user ? (
            <>
              {/* Greeting Message */}
              <span className="text-gray-800 font-semibold">
                Hello, {user.name}!
              </span>

              {/* Home Link with Icon */}
              <Link
                to="/home"
                className={`flex items-center px-4 py-2 rounded transition duration-300 ${
                  location.pathname === '/home'
                    ? 'text-blue-600 font-bold' // Bold and blue if active
                    : 'text-black hover:text-blue-600' // Default styling
                }`}
              >
                <FaHome className="mr-2" /> Home
              </Link>

              {/* History Link with Icon */}
              <Link
                to="/history"
                className={`flex items-center px-4 py-2 rounded transition duration-300 ${
                  location.pathname === '/history'
                    ? 'text-blue-600 font-bold' // Bold and blue if active
                    : 'text-black hover:text-blue-600' // Default styling
                }`}
              >
                <FaHistory className="mr-2" /> History
              </Link>

              {/* Logout Button with Icon */}
              <button
                onClick={logout}
                className="text-black hover:text-red-600 px-4 py-2 rounded transition duration-300 flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import useUserStore from '../hooks/userStore'; // Correct import path
import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons

export default function Navbar() {
  const { authUser, logout } = useUserStore();

  return (
    <div className="font-montserrat fixed top-0 w-full shadow-lg bg-white">
      <div className="container mx-auto flex flex-row justify-between items-center h-20 px-4">
        {/* Logo */}
        <Link to="/" className="text-black hover:text-slate-300 px-4 py-2 rounded transition duration-300">
          <div>
            <img className="w-20" src="package-lock.png" alt="Logo" />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-row items-center space-x-4">
          {authUser ? (
            <>
              {/* Home Link with Icon */}
              <Link
                to="/home"
                className="text-black hover:text-blue-600 px-4 py-2 rounded transition duration-300 flex items-center"
              >
                <FaHome className="mr-2" /> Home
              </Link>

              {/* History Link with Icon */}
              <Link
                to="/history"
                className="text-black hover:text-blue-600 px-4 py-2 rounded transition duration-300 flex items-center"
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
          ) : (
            <>
              {/* Login and Signup Links (only shown when not logged in) */}
              <Link
                to="/login"
                className="text-black hover:text-blue-600 px-4 py-2 rounded transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-black hover:text-blue-600 px-4 py-2 rounded transition duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
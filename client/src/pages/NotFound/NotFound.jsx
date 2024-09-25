// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-10  shadow-sm text-center">
        <h1 className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <button className="px-6 py-3 bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-300  dark:bg-green-600 dark:hover:bg-green-500">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

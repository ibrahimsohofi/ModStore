import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-500 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <FiAlertTriangle className="text-primary-500 text-6xl" />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved. Check the URL or try going back to the home page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
        >
          <FiHome className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

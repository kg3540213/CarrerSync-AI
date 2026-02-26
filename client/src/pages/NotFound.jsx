import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <LoadingSpinner />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you're looking for doesn't exist</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-dull transition-colors"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFound;
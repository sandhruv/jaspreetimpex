import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="error-code">404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary-custom">
            <FiHome /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary-custom">
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

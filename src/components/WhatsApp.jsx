import { FiMessageCircle } from 'react-icons/fi';
import './WhatsApp.css';

const WhatsApp = () => {
  const phoneNumber = '919876703899';
  const message = 'Hi, I would like to know more about your logistics services.';
  
  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <button className="whatsapp-float" onClick={handleClick} aria-label="Chat on WhatsApp">
      <FiMessageCircle />
    </button>
  );
};

export default WhatsApp;

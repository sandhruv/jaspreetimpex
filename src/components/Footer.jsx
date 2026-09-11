import { Link } from 'react-router-dom';
import { FiArrowUp, FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Services', path: '/services' },
    { name: 'Photos', path: '/photos' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const services = [
    'Freight Forwarding',
    'Customs Clearance',
    'Warehousing & Distribution',
    'DG Shipment Handling',
    'E-commerce Logistics',
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="logo-icon">JI</div>
                <div className="logo-text">
                  <span className="logo-name">Jaspreet Impex</span>
                  <span className="logo-tagline">LOGISTICS</span>
                </div>
              </Link>
              <p className="footer-description">
                Your trusted partner for end-to-end logistics solutions across India and globally.
                Specializing in freight forwarding, customs clearance, and supply chain management.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <FiFacebook />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                  <FiTwitter />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-products">
              <h4>Our Services</h4>
              <ul>
                {services.map((service) => (
                  <li key={service}>
                    <Link to="/services">{service}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact Info</h4>
              <div className="contact-items">
                <div className="contact-item">
                  <span>📍 Location: Phagwara, Punjab, India</span>
                </div>
                <div className="contact-item">
                  <span>📞 +91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <span>✉️ info@jaspreetimpex.com</span>
                </div>
              </div>

              <div className="certification-badge">
                <span className="cert-icon">🏅</span>
                <div className="cert-info">
                  <span className="cert-title">ISO 9002 Certified</span>
                  <span className="cert-text">GST: 03ATPPK3375A1ZX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Jaspreet Impex. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span className="separator">|</span>
              <Link to="/terms-of-service">Terms of Service</Link>
              <span className="separator">|</span>
              <span>Licensed Customs House Agent</span>
              <span className="separator">|</span>
              <span>ISO 9002 Certified</span>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <FiArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
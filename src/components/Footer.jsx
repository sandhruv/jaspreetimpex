import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiArrowUp, FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Products', path: '/products' },
    { name: 'Photos', path: '/photos' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const products = [
    'Automotive Components',
    'Metal Washers',
    'Metal Fasteners',
    'Custom Parts',
    'Industrial Components',
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="logo-icon">JT</div>
                <div className="logo-text">
                  <span className="logo-name">Jaspreet Impex</span>
                  <span className="logo-tagline">GEE TEC</span>
                </div>
              </Link>
              <p className="footer-description">
                Established through the vision of Late S. Kirpal Singh Sethi,
                delivering world-quality automotive components and metal fasteners
                to over 40 countries worldwide.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FiFacebook />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
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
              <h4>Our Products</h4>
              <ul>
                {products.map((product) => (
                  <li key={product}>
                    <Link to="/products">{product}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact Info</h4>
              <div className="contact-items">
                <div className="contact-item">
                  <FiMapPin className="contact-icon" />
                  <span>Phagwara, Kapurthala, Punjab, India</span>
                </div>
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <span>info@jaspreetimpex.com</span>
                </div>
              </div>

              <div className="certification-badge">
                <span className="cert-icon">🏅</span>
                <div className="cert-info">
                  <span className="cert-title">ISO 9002</span>
                  <span className="cert-text">Certified Company</span>
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
              © {new Date().getFullYear()} Jaspreet Impex (GEE TEC). All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <span>GST: 03ATPPK3375A1ZX</span>
              <span className="separator">|</span>
              <span>100% Export Unit</span>
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

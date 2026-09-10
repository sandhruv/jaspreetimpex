import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiMail, FiChevronDown, FiUser, FiLogIn, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'About Us',
      path: '/about-us',
      children: [
        { name: 'Our Story', path: '/about-us#story' },
        { name: 'Quality Policy', path: '/about-us#quality' },
        { name: 'Our Team', path: '/about-us#team' },
      ],
    },
    {
      name: 'Products',
      path: '/products',
      children: [
        { name: 'Automotive Components', path: '/products#automotive' },
        { name: 'Metal Washers', path: '/products#washers' },
        { name: 'Other Products', path: '/products#other' },
      ],
    },
    { name: 'Photos', path: '/photos' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const handleDropdownEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <a href="tel:+919876543210" className="top-bar-item">
                <FiPhone /> +91 98765 43210
              </a>
              <a href="mailto:info@jaspreetimpex.com" className="top-bar-item">
                <FiMail /> info@jaspreetimpex.com
              </a>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-item">GST: 03ATPPK3375A1ZX</span>
              <span className="top-bar-item">ISO 9002 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <div className="logo-icon">JI</div>
              <div className="logo-text">
                <span className="logo-name">Jaspreet Impex</span>
                <span className="logo-tagline">GEE TEC</span>
              </div>
            </Link>

            <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
                    onMouseEnter={() => item.children && handleDropdownEnter(index)}
                    onMouseLeave={() => item.children && handleDropdownLeave()}
                  >
                    <Link
                      to={item.path}
                      className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.name}
                      {item.children && <FiChevronDown className="dropdown-icon" />}
                    </Link>
                    {item.children && activeDropdown === index && (
                      <ul className="dropdown-menu">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link to={child.path} className="dropdown-item">
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile Auth Buttons */}
              <div className="mobile-login-wrapper">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" className="btn-login-mobile">
                        <FiSettings /> Admin Dashboard
                      </Link>
                    )}
                    <button className="btn-logout-mobile" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="btn-login-mobile">
                    <FiLogIn /> Login
                  </Link>
                )}
              </div>
            </nav>

            <div className="header-actions">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="btn-login">
                      <FiSettings /> Dashboard
                    </Link>
                  )}
                  <button className="btn-login" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-login">
                  <FiUser /> Login
                </Link>
              )}
              <Link to="/contact-us" className="btn-primary-custom header-cta">
                Get a Quote
              </Link>
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

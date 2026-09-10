import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiMail, FiChevronDown, FiUser, FiLogIn, FiLogOut, FiSettings, FiHome, FiInfo, FiPackage, FiImage, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const navIcons = {
  'Home': <FiHome />,
  'About Us': <FiInfo />,
  'Products': <FiPackage />,
  'Photos': <FiImage />,
  'Contact Us': <FiMessageSquare />,
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - desktop only */}
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

            {/* Desktop Nav */}
            <nav className="nav-desktop">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
                    onMouseEnter={() => item.children && setActiveDropdown(index)}
                    onMouseLeave={() => item.children && setActiveDropdown(null)}
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
                            <Link to={child.path} className="dropdown-item">{child.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="header-actions-desktop">
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
            </div>

            {/* Mobile Hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="logo-icon">JI</div>
            <div className="logo-text">
              <span className="logo-name">Jaspreet Impex</span>
              <span className="logo-tagline">GEE TEC</span>
            </div>
          </Link>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={item.name} className="mobile-nav-item">
                {item.children ? (
                  <>
                    <button
                      className={`mobile-nav-link ${activeDropdown === index ? 'active' : ''}`}
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <span className="mobile-nav-icon">{navIcons[item.name]}</span>
                      <span>{item.name}</span>
                      <FiChevronDown className={`mobile-chevron ${activeDropdown === index ? 'rotated' : ''}`} />
                    </button>
                    {activeDropdown === index && (
                      <ul className="mobile-submenu">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link to={child.path} className="mobile-submenu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mobile-nav-icon">{navIcons[item.name]}</span>
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu-footer">
          <Link to="/contact-us" className="btn-primary-custom mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>
            Get a Quote
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn-login-mobile-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <FiSettings /> Admin Dashboard
                </Link>
              )}
              <button className="btn-logout-mobile-full" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login-mobile-full" onClick={() => setIsMobileMenuOpen(false)}>
              <FiLogIn /> Login
            </Link>
          )}
          <div className="mobile-contact-info">
            <a href="tel:+919876543210"><FiPhone /> +91 98765 43210</a>
            <a href="mailto:info@jaspreetimpex.com"><FiMail /> info@jaspreetimpex.com</a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;

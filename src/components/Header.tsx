"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiPhone,
  FiMail,
  FiChevronDown,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiHome,
  FiInfo,
  FiTruck,
  FiImage,
  FiMessageSquare,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

const navIcons: Record<string, React.ReactNode> = {
  Home: <FiHome />,
  "About Us": <FiInfo />,
  Services: <FiTruck />,
  Photos: <FiImage />,
  "Contact Us": <FiMessageSquare />,
};

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "About Us",
    path: "/about-us",
    children: [
      { name: "Our Story", path: "/about-us#story" },
      { name: "Our Mission", path: "/about-us#mission" },
      { name: "Our Network", path: "/about-us#network" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    children: [
      { name: "Freight Forwarding", path: "/services#freight" },
      { name: "Customs Clearance", path: "/services#customs" },
      { name: "Warehousing", path: "/services#warehouse" },
      { name: "Specialized Logistics", path: "/services#specialized" },
    ],
  },
  { name: "Photos", path: "/photos" },
  { name: "Contact Us", path: "/contact-us" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="top-bar-item">
                <FiPhone /> +91 98767 03899
              </span>
              <span className="top-bar-item">
                <FiMail /> info@jaspreetimpex.com
              </span>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-item">GST: 03ATPPK3375A1ZX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              <div className="logo-icon">JI</div>
              <div className="logo-text">
                <span className="logo-name">Jaspreet Impex</span>
                <span className="logo-tagline">LOGISTICS</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="nav-desktop">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    className={`nav-item ${item.children ? "has-dropdown" : ""}`}
                    onMouseEnter={() => item.children && setActiveDropdown(index)}
                    onMouseLeave={() => item.children && setActiveDropdown(null)}
                  >
                    <Link
                      href={item.path}
                      className={`nav-link ${pathname === item.path ? "active" : ""}`}
                    >
                      {item.name}
                      {item.children && (
                        <FiChevronDown className="dropdown-icon" />
                      )}
                    </Link>
                    {item.children && activeDropdown === index && (
                      <ul className="dropdown-menu">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link href={child.path} className="dropdown-item">
                              {child.name}
                            </Link>
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
                    <Link href="/admin" className="btn-login">
                      <FiSettings /> Admin
                    </Link>
                  )}
                  <button className="btn-login" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn-login">
                  <FiUser /> Login
                </Link>
              )}
              <Link href="/contact-us" className="btn-primary-custom header-cta">
                Request Quote
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
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <Link href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="logo-icon">JI</div>
            <div className="logo-text">
              <span className="logo-name">Jaspreet Impex</span>
              <span className="logo-tagline">LOGISTICS</span>
            </div>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
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
                      className={`mobile-nav-link ${activeDropdown === index ? "active" : ""}`}
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <span className="mobile-nav-icon">{navIcons[item.name]}</span>
                      <span>{item.name}</span>
                      <FiChevronDown
                        className={`mobile-chevron ${activeDropdown === index ? "rotated" : ""}`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <ul className="mobile-submenu">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.path}
                              className="mobile-submenu-link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`mobile-nav-link ${pathname === item.path ? "active" : ""}`}
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
          <Link
            href="/contact-us"
            className="btn-primary-custom mobile-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Request Quote
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="btn-login-mobile-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiSettings /> Admin Panel
                </Link>
              )}
              <button
                className="btn-logout-mobile-full"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-login-mobile-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiLogIn /> Login
            </Link>
          )}
          <div className="mobile-contact-info">
            <span>
              <FiPhone /> +91 98767 03899
            </span>
            <span>
              <FiMail /> info@jaspreetimpex.com
            </span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}

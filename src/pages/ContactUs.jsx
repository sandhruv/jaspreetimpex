import { useEffect, useState } from 'react';
import { FiSend, FiPhone, FiMail, FiMapPin, FiClock, FiHome } from 'react-icons/fi';
import axios from 'axios';
import SEO from '../components/SEO';
import './ContactUs.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    product: '',
    quantity: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/inquiries`, formData);
      alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        country: '',
        product: '',
        quantity: '',
        message: '',
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 0755-82493720'],
      action: 'tel:+919876543210',
    },
    {
      icon: <FiMail />,
      title: 'Email',
      details: ['info@jaspreetimpex.com', 'sales@jaspreetimpex.com'],
      action: 'mailto:info@jaspreetimpex.com',
    },
    {
      icon: <FiMapPin />,
      title: 'Office',
      details: ['Phagwara, Kapurthala', 'Punjab, India'],
      action: null,
    },
    {
      icon: <FiHome />,
      title: 'Manufacturing',
      details: ['Phagwara Industrial Area', 'Punjab, India'],
      action: null,
    },
    {
      icon: <FiClock />,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
      action: null,
    },
  ];

  return (
    <div className="contact-us-page">
      <SEO
        title="Contact Us - Jaspreet Impex | Get Quote for Automotive Components"
        description="Contact Jaspreet Impex for automotive components inquiries. Phone: +91 98765 43210. Email: info@jaspreetimpex.com. Located in Phagwara, Punjab, India."
        keywords="contact Jaspreet Impex, automotive components inquiry, GEE TEC contact, quote for brake parts"
        url="https://jaspreetimpex.com/contact-us"
      />
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch for inquiries about our products and services</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us an Inquiry</h2>
              <p className="form-subtitle">
                Fill out the form below and our team will respond within 24 hours.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company Name *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product">Product Interest *</label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a product</option>
                      <option value="brake">Brake Components</option>
                      <option value="clutch">Clutch Parts</option>
                      <option value="engine">Engine Components</option>
                      <option value="suspension">Suspension Parts</option>
                      <option value="washers">Metal Washers</option>
                      <option value="fasteners">Metal Fasteners</option>
                      <option value="custom">Custom Requirements</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Estimated Quantity</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 10,000 pieces per month"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us about your specific requirements, specifications, or any questions you have..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary-custom submit-btn" disabled={submitting}>
                  <FiSend /> {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-panel">
              <h3>Contact Information</h3>
              <p className="info-subtitle">
                Reach out to us directly or visit our office.
              </p>

              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h4>{info.title}</h4>
                      {info.details.map((detail, i) =>
                        info.action ? (
                          <a key={i} href={info.action}>
                            {detail}
                          </a>
                        ) : (
                          <p key={i}>{detail}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="gst-badge">
                <span className="gst-label">GST Number</span>
                <span className="gst-number">03ATPPK3375A1ZX</span>
              </div>

              <div className="cert-badge">
                <span className="cert-icon">🏅</span>
                <div className="cert-info">
                  <span className="cert-title">ISO 9002 Certified</span>
                  <span className="cert-text">Quality Management System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-placeholder">
            <div className="map-content">
              <FiMapPin className="map-icon" />
              <h3>Our Location</h3>
              <p>Phagwara, Kapurthala, Punjab, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

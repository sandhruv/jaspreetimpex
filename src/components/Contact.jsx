import { useEffect, useRef, useState } from 'react';
import { FiSend, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import axios from 'axios';
import './Contact.css';

const API_URL = 'http://localhost:5000/api';

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/inquiries`, formData);
      alert('Thank you for your inquiry! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        product: '',
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
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 0755-82493720'],
    },
    {
      icon: <FiMail />,
      title: 'Email Us',
      details: ['info@jaspreetimpex.com', 'sales@jaspreetimpex.com'],
    },
    {
      icon: <FiMapPin />,
      title: 'Visit Us',
      details: ['Phagwara, Kapurthala', 'Punjab, India'],
    },
    {
      icon: <FiClock />,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <section className="contact-section section" ref={sectionRef} id="contact">
      <div className="contact-bg"></div>
      <div className="container">
        <div className="section-title fade-in">
          <h2>Get In Touch</h2>
          <p>Ready to discuss your automotive component requirements? Contact us today.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info fade-in">
            <h3>Contact Information</h3>
            <p className="info-subtitle">
              Reach out to us for inquiries about our products and services.
            </p>

            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    {info.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="gst-info">
              <span className="gst-label">GST Number:</span>
              <span className="gst-number">03ATPPK3375A1ZX</span>
            </div>
          </div>

          <div className="contact-form-wrapper fade-in">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
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
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
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

              <div className="form-group">
                <label htmlFor="product">Product Interest</label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                >
                  <option value="">Select a product category</option>
                  <option value="automotive">Automotive Components</option>
                  <option value="washers">Metal Washers</option>
                  <option value="fasteners">Metal Fasteners</option>
                  <option value="custom">Custom Requirements</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary-custom submit-btn" disabled={submitting}>
                <FiSend /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

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

  return (
    <section className="contact-section section" ref={sectionRef} id="contact">
      <div className="contact-bg"></div>
      <div className="container">
        <div className="section-title fade-in">
          <h2>Get In Touch</h2>
          <p>Ready to streamline your logistics? Request a quote or speak with our team today.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info fade-in">
            <h3>Why Contact Us?</h3>
            <p className="info-subtitle">
              Whether you have a complex shipment requirement, need a quote, or are looking to
              optimize your supply chain, our team is ready to assist.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-content">
                  <h4>Freight Forwarding</h4>
                  <p>Air, sea, and road transport solutions for your cargo</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-content">
                  <h4>Customs Clearance</h4>
                  <p>Smooth import/export clearance with full compliance</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-content">
                  <h4>Supply Chain</h4>
                  <p>End-to-end logistics management and optimization</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper fade-in">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Request a Quote</h3>

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
                <label htmlFor="product">Service Interest</label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="freight">Freight Forwarding</option>
                  <option value="customs">Customs Clearance</option>
                  <option value="warehouse">Warehousing & Distribution</option>
                  <option value="dg">DG Shipment Handling</option>
                  <option value="ecommerce">E-commerce Logistics</option>
                  <option value="supply-chain">Supply Chain Management</option>
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
                  placeholder="Tell us about your logistics requirements..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary-custom submit-btn" disabled={submitting}>
                <FiSend /> {submitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
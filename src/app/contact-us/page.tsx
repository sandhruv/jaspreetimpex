"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    product: "",
    cargoType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
      await fetch(`${API_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("Thank you for your inquiry! Our team will contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        country: "",
        product: "",
        cargoType: "",
        message: "",
      });
    } catch {
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-us-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch for logistics inquiries and quotes</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Request a Quote</h2>
              <p className="form-subtitle">
                Fill out the form below and our logistics team will respond within 24 hours.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cu-name">Full Name *</label>
                    <input
                      type="text"
                      id="cu-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cu-email">Email Address *</label>
                    <input
                      type="email"
                      id="cu-email"
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
                    <label htmlFor="cu-company">Company Name *</label>
                    <input
                      type="text"
                      id="cu-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cu-phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="cu-phone"
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
                    <label htmlFor="cu-country">Country *</label>
                    <input
                      type="text"
                      id="cu-country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cu-product">Service Required *</label>
                    <select
                      id="cu-product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="freight">Freight Forwarding</option>
                      <option value="customs">Customs Clearance</option>
                      <option value="warehouse">Warehousing &amp; Distribution</option>
                      <option value="dg">DG Shipment Handling</option>
                      <option value="ecommerce">E-commerce Logistics</option>
                      <option value="supply-chain">Supply Chain Management</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cu-cargoType">Cargo Type</label>
                  <input
                    type="text"
                    id="cu-cargoType"
                    name="cargoType"
                    value={formData.cargoType}
                    onChange={handleChange}
                    placeholder="e.g., General cargo, Hazardous materials, Electronics"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cu-message">Your Message *</label>
                  <textarea
                    id="cu-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us about your logistics requirements, origin/destination, volume, timeline..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary-custom submit-btn" disabled={submitting}>
                  <FiSend /> {submitting ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-panel">
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

              <div className="gst-badge">
                <span className="cert-text">GST: 03ATPPK3375A1ZX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-placeholder">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=300&fit=crop"
              alt="Jaspreet Impex Global Network"
              className="map-image"
              loading="lazy"
            />
            <div className="map-content">
              <h3>Our Logistics Network</h3>
              <p>Serving businesses across India and 50+ countries worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

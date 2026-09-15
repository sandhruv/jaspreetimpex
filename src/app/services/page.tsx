"use client";

import { useState } from "react";
import {
  FiArrowRight,
  FiTruck,
  FiGlobe,
  FiShield,
  FiBox,
} from "react-icons/fi";

const categories = [
  {
    id: "freight",
    name: "Freight Forwarding",
    icon: <FiGlobe />,
    description:
      "International freight forwarding services with seamless coordination across air, sea, and road transport for global shipping needs.",
    services: [
      {
        name: "Air Freight",
        description: "Fast and secure air cargo services for urgent international shipments and high-value goods.",
        features: ["Express Handling", "Global Air Cargo", "Real-Time Tracking"],
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=400&h=200&fit=crop",
      },
      {
        name: "Sea Freight (FCL & LCL)",
        description: "Full Container Load and Less than Container Load sea cargo services with efficient port coordination.",
        features: ["FCL & LCL", "Global Ports", "Container Shipping"],
        image: "/images/sea-freight.jpg",
      },
      {
        name: "Road Transportation",
        description: "Reliable domestic and cross-border transportation solutions for manufacturers and exporters.",
        features: ["Pan India", "Safe Delivery", "Fast Transit"],
        image: "https://images.unsplash.com/photo-1745956983820-6e960f7e8472?w=400&h=200&fit=crop",
      },
      {
        name: "Multimodal Transport",
        description: "Integrated transport solutions combining multiple modes for optimal efficiency.",
        features: ["Integrated Solutions", "Cost Effective", "Flexible Routing"],
        image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=200&fit=crop",
      },
    ],
  },
  {
    id: "customs",
    name: "Customs Clearance",
    icon: <FiShield />,
    description:
      "Smooth customs clearance services ensuring compliance with Indian import/export regulations and minimizing delays.",
    services: [
      {
        name: "Import Clearance",
        description: "Efficient handling of all import documentation and regulatory requirements.",
        features: ["Documentation", "Duty Optimization", "Fast Processing"],
        image: "/images/customs.jpg",
      },
      {
        name: "Export Clearance",
        description: "Streamlined export processes ensuring compliance and timely shipment.",
        features: ["Export Licenses", "Compliance", "Quick Turnaround"],
        image: "/images/customs.jpg",
      },
      {
        name: "Documentation Handling",
        description: "Complete management of all customs documentation and paperwork.",
        features: ["Digital Documentation", "Accuracy", "Expert Handling"],
        image: "/images/customs.jpg",
      },
      {
        name: "Regulatory Compliance",
        description: "Ensuring all shipments meet international trade regulations and standards.",
        features: ["Legal Compliance", "Risk Management", "Audit Support"],
        image: "/images/customs.jpg",
      },
    ],
  },
  {
    id: "warehouse",
    name: "Warehousing & Distribution",
    icon: <FiBox />,
    description:
      "Strategically located warehouses offering flexible storage, detailed inventory management, and streamlined distribution.",
    services: [
      {
        name: "Storage Solutions",
        description: "Flexible warehouse space tailored to your inventory requirements.",
        features: ["Secure Storage", "Climate Control", "Scalable Space"],
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=200&fit=crop",
      },
      {
        name: "Inventory Management",
        description: "Advanced systems for real-time inventory tracking and management.",
        features: ["Real-Time Updates", "Barcode System", "Reports"],
        image: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=400&h=200&fit=crop",
      },
      {
        name: "Order Fulfillment",
        description: "Efficient pick, pack, and ship operations for e-commerce and retail.",
        features: ["Fast Processing", "Accuracy", "Custom Packaging"],
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=200&fit=crop",
      },
      {
        name: "Last-Mile Delivery",
        description: "Reliable doorstep delivery across India with tracking capabilities.",
        features: ["Door Delivery", "Tracking", "Same Day Options"],
        image: "https://images.unsplash.com/photo-1745956983820-6e960f7e8472?w=400&h=200&fit=crop",
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized Logistics",
    icon: <FiTruck />,
    description:
      "Expert handling of hazardous materials, oversized cargo, and specialized logistics solutions with strict compliance to safety regulations.",
    services: [
      {
        name: "DG Shipment Handling",
        description: "Specialized handling of dangerous goods with strict compliance to IMCO regulations.",
        features: ["IMCO Classes", "Safety Protocols", "Certified Handlers"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=200&fit=crop",
      },
      {
        name: "Project Cargo",
        description: "Complex logistics for oversized, heavy, or sensitive cargo with route surveys.",
        features: ["Route Planning", "Heavy Lift", "Specialized Equipment"],
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=200&fit=crop",
      },
      {
        name: "E-commerce Logistics",
        description: "Tailored solutions for online businesses including fulfillment and returns.",
        features: ["Order Processing", "Returns Management", "Integration"],
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=200&fit=crop",
      },
      {
        name: "Supply Chain Management",
        description: "End-to-end supply chain optimization and management services.",
        features: ["Consulting", "Optimization", "Technology Driven"],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("freight");
  const activeCat = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="products-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive logistics solutions for your business needs</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="products-overview section">
        <div className="container">
          <div className="section-title">
            <h2>Service Categories</h2>
            <p>End-to-end logistics solutions across India and globally</p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="category-description">
            <p>{activeCat.description}</p>
          </div>

          <div className="products-grid">
            {activeCat.services.map((service, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="product-img"
                    loading="lazy"
                  />
                </div>
                <div className="product-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="product-features">
                    {service.features.map((feature, i) => (
                      <span key={i} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a href="/contact-us" className="product-link">
                    Request Quote <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="manufacturing-section section" id="network">
        <div className="container">
          <div className="manufacturing-grid">
            <div className="manufacturing-content">
              <div className="section-badge">Our Network</div>
              <h2>Pan-India Logistics Network</h2>
              <p>
                Our extensive logistics network covers all major cities and industrial
                hubs across India, ensuring seamless cargo movement.
              </p>
              <ul className="manufacturing-features">
                <li>Major cities coverage across India</li>
                <li>Strategic warehouse locations</li>
                <li>Multi-modal transport connectivity</li>
                <li>Global shipping partnerships</li>
                <li>Advanced tracking technology</li>
              </ul>
            </div>
            <div className="manufacturing-visual">
              <div className="visual-placeholder">
                <span className="visual-icon">&#128667;</span>
                <span>Global Logistics Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="products-cta section">
        <div className="container">
          <div className="cta-box">
            <h2>Need a Custom Logistics Solution?</h2>
            <p>
              We tailor our services to meet your unique shipping and supply chain requirements
              across India and globally.
            </p>
            <a href="/contact-us" className="btn-primary-custom">
              Contact Us <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

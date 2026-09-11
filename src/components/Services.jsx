import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiPackage, FiBox, FiArrowUpRight, FiGlobe, FiShield, FiClock } from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('freight');

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

  const categories = [
    {
      id: 'freight',
      name: 'Freight Forwarding',
      icon: <FiGlobe />,
      services: [
        'Air Freight',
        'Sea Freight (FCL & LCL)',
        'Road Transportation',
        'Multimodal Transport',
      ],
      images: [
        'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1762141226718-a57447db19cb?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=240&fit=crop',
      ],
      description: 'International freight forwarding services with seamless coordination across air, sea, and road transport for global shipping needs.',
    },
    {
      id: 'customs',
      name: 'Customs Clearance',
      icon: <FiShield />,
      services: [
        'Import Clearance',
        'Export Clearance',
        'Documentation Handling',
        'Regulatory Compliance',
      ],
      images: [
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=240&fit=crop',
      ],
      description: 'Smooth customs clearance services ensuring compliance with Indian import/export regulations and minimizing delays.',
    },
    {
      id: 'warehouse',
      name: 'Warehousing & Distribution',
      icon: <FiBox />,
      services: [
        'Storage Solutions',
        'Inventory Management',
        'Order Fulfillment',
        'Last-Mile Delivery',
      ],
      images: [
        'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1565891741441-64926e441838?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=240&fit=crop',
      ],
      description: 'Strategically located warehouses offering flexible storage, detailed inventory management, and streamlined distribution.',
    },
    {
      id: 'specialized',
      name: 'Specialized Logistics',
      icon: <FiTruck />,
      services: [
        'DG Shipment Handling',
        'Project Cargo',
        'E-commerce Logistics',
        'Supply Chain Management',
      ],
      images: [
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=240&fit=crop',
        'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=240&fit=crop',
      ],
      description: 'Expert handling of hazardous materials, oversized cargo, and specialized logistics solutions with strict compliance to safety regulations.',
    },
  ];

  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <section className="services-section section" ref={sectionRef} id="services">
      <div className="services-bg"></div>
      <div className="container">
        <div className="section-title fade-in">
          <h2>Our Services</h2>
          <p>Comprehensive logistics solutions covering freight forwarding, customs clearance, warehousing, and specialized cargo handling</p>
        </div>

        <div className="services-tabs fade-in">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`tab-btn ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="services-content fade-in">
          <div className="content-grid">
            <div className="content-info">
              <h3>{activeCategory.name}</h3>
              <p>{activeCategory.description}</p>

              <div className="product-list">
                {activeCategory.services.map((service, index) => (
                  <div key={index} className="product-item">
                    <span className="product-bullet"></span>
                    {service}
                  </div>
                ))}
              </div>

              <Link to="/contact-us" className="btn-primary-custom">
                Request Quote <FiArrowRight />
              </Link>
            </div>

            <div className="content-visual">
              <div className="visual-grid">
                {activeCategory.services.map((service, index) => (
                  <div
                    key={index}
                    className="visual-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img 
                      src={activeCategory.images[index]} 
                      alt={service}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-info">
                      <span className="card-name">{service}</span>
                      <FiArrowUpRight className="card-arrow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="services-cta fade-in">
          <div className="cta-content">
            <h3>Need a Custom Logistics Solution?</h3>
            <p>We tailor our services to meet your unique shipping and supply chain requirements across India and globally.</p>
            <Link to="/contact-us" className="btn-primary-custom">
              Contact Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSettings, FiGrid, FiBox, FiArrowUpRight } from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('automotive');

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
      id: 'automotive',
      name: 'Automotive Components',
      icon: <FiSettings />,
      products: [
        'Brake Components',
        'Clutch Parts',
        'Engine Components',
        'Suspension Parts',
      ],
      description: 'Precision-engineered automotive components manufactured to meet international quality standards.',
    },
    {
      id: 'washers',
      name: 'Metal Washers',
      icon: <FiGrid />,
      products: [
        'Flat Washers',
        'Spring Washers',
        'Lock Washers',
        'Custom Washers',
      ],
      description: 'High-quality metal washers in various sizes and specifications for industrial applications.',
    },
    {
      id: 'other',
      name: 'Other Products',
      icon: <FiBox />,
      products: [
        'Metal Fasteners',
        'Custom Machined Parts',
        'Industrial Components',
        'Specialty Items',
      ],
      description: 'Diverse range of precision-engineered products tailored to specific industry requirements.',
    },
  ];

  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <section className="services-section section" ref={sectionRef} id="services">
      <div className="services-bg"></div>
      <div className="container">
        <div className="section-title fade-in">
          <h2>Our Product Categories</h2>
          <p>Comprehensive range of precision-engineered automotive components and metal fasteners</p>
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
                {activeCategory.products.map((product, index) => (
                  <div key={index} className="product-item">
                    <span className="product-bullet"></span>
                    {product}
                  </div>
                ))}
              </div>

              <Link to="/products" className="btn-primary-custom">
                View All Products <FiArrowRight />
              </Link>
            </div>

            <div className="content-visual">
              <div className="visual-grid">
                {activeCategory.products.map((product, index) => (
                  <div
                    key={index}
                    className="visual-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-placeholder">
                      <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="card-info">
                      <span className="card-name">{product}</span>
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
            <h3>Need Custom Specifications?</h3>
            <p>We manufacture products tailored to your specific requirements with international quality standards.</p>
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

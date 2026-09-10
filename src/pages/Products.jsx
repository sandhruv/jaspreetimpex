import { useEffect, useState } from 'react';
import { FiArrowRight, FiSettings, FiGrid, FiBox } from 'react-icons/fi';
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('automotive');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      id: 'automotive',
      name: 'Automotive Components',
      icon: <FiSettings />,
      description: 'Precision-engineered automotive components manufactured to meet international quality standards for global automotive industry.',
      products: [
        {
          name: 'Brake Components',
          description: 'High-performance brake parts including pads, discs, and calipers designed for safety and durability.',
          features: ['ISO 9002 Certified', 'Heat Resistant', 'Long Lifespan'],
        },
        {
          name: 'Clutch Parts',
          description: 'Precision-machined clutch components ensuring smooth transmission operation.',
          features: ['Precision Machined', 'Wear Resistant', 'OEM Specifications'],
        },
        {
          name: 'Engine Components',
          description: 'Critical engine parts manufactured with exact specifications for optimal performance.',
          features: ['High Precision', 'Temperature Stable', 'Premium Quality'],
        },
        {
          name: 'Suspension Parts',
          description: 'Durable suspension components designed for comfort and vehicle stability.',
          features: ['Heavy Duty', 'Corrosion Resistant', 'Tested Quality'],
        },
      ],
    },
    {
      id: 'washers',
      name: 'Metal Washers',
      icon: <FiGrid />,
      description: 'High-quality metal washers in various sizes and specifications for industrial and automotive applications.',
      products: [
        {
          name: 'Flat Washers',
          description: 'Standard flat washers for load distribution and surface protection.',
          features: ['Various Sizes', 'Zinc Plated', 'Stainless Options'],
        },
        {
          name: 'Spring Washers',
          description: 'Lock washers designed to prevent loosening under vibration.',
          features: ['Vibration Proof', 'High Tension', 'Durable'],
        },
        {
          name: 'Lock Washers',
          description: 'Specialized washers for secure fastening in critical applications.',
          features: ['Secure Lock', 'Heavy Duty', 'Reliable'],
        },
        {
          name: 'Custom Washers',
          description: 'Manufactured to customer specifications for unique applications.',
          features: ['Custom Sizes', 'Special Materials', 'Bulk Orders'],
        },
      ],
    },
    {
      id: 'other',
      name: 'Other Products',
      icon: <FiBox />,
      description: 'Diverse range of precision-engineered products tailored to specific industry requirements.',
      products: [
        {
          name: 'Metal Fasteners',
          description: 'Complete range of bolts, nuts, and screws for various applications.',
          features: ['Multiple Grades', 'Corrosion Resistant', 'ISO Certified'],
        },
        {
          name: 'Custom Machined Parts',
          description: 'CNC machined components manufactured to exact customer specifications.',
          features: ['CNC Precision', 'Custom Designs', 'Quick Turnaround'],
        },
        {
          name: 'Industrial Components',
          description: 'General industrial parts and components for manufacturing sector.',
          features: ['Bulk Supply', 'Quality Tested', 'Competitive Prices'],
        },
        {
          name: 'Specialty Items',
          description: 'Specialized products designed for specific industry needs.',
          features: ['Unique Designs', 'Expert Engineering', 'Tailored Solutions'],
        },
      ],
    },
  ];

  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="products-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Our Products</h1>
          <p>Precision-engineered automotive components and metal fasteners</p>
        </div>
      </section>

      {/* Products Overview */}
      <section className="products-overview section">
        <div className="container">
          <div className="section-title">
            <h2>Product Categories</h2>
            <p>Comprehensive range of quality products for global automotive industry</p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
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
            {activeCat.products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <div className="image-placeholder">
                    <span className="product-number">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-features">
                    {product.features.map((feature, i) => (
                      <span key={i} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a href="/contact-us" className="product-link">
                    Inquire Now <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="manufacturing-section section">
        <div className="container">
          <div className="manufacturing-grid">
            <div className="manufacturing-content">
              <div className="section-badge">Manufacturing Excellence</div>
              <h2>State-of-the-Art Production Facility</h2>
              <p>
                Our manufacturing base features modern machinery, state-of-the-art
                testing equipment, and dedicated quality laboratories in India.
              </p>
              <ul className="manufacturing-features">
                <li>Modern CNC machinery for precision manufacturing</li>
                <li>Dedicated quality testing laboratories</li>
                <li>Advanced monitoring equipment</li>
                <li>Skilled workforce with years of experience</li>
                <li>Compliance with international standards</li>
              </ul>
            </div>
            <div className="manufacturing-visual">
              <div className="visual-placeholder">
                <span className="visual-icon">⚙️</span>
                <span>Advanced Manufacturing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="products-cta section">
        <div className="container">
          <div className="cta-box">
            <h2>Need Custom Specifications?</h2>
            <p>We manufacture products tailored to your specific requirements with international quality standards.</p>
            <a href="/contact-us" className="btn-primary-custom">
              Contact Us <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;

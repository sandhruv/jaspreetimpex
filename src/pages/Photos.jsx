import { useEffect, useState } from 'react';
import './Photos.css';

const Photos = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = [
    {
      id: 1,
      title: 'Manufacturing Facility',
      category: 'facility',
      description: 'Our state-of-the-art manufacturing plant in Phagwara, Punjab',
    },
    {
      id: 2,
      title: 'CNC Machining',
      category: 'machinery',
      description: 'Advanced CNC machines for precision component manufacturing',
    },
    {
      id: 3,
      title: 'Quality Lab',
      category: 'quality',
      description: 'Dedicated quality testing laboratory with modern equipment',
    },
    {
      id: 4,
      title: 'Brake Components',
      category: 'products',
      description: 'Precision-engineered brake components for global automotive industry',
    },
    {
      id: 5,
      title: 'Metal Washers',
      category: 'products',
      description: 'Various types of metal washers manufactured to international standards',
    },
    {
      id: 6,
      title: 'Assembly Line',
      category: 'facility',
      description: 'Automated assembly line for efficient production',
    },
    {
      id: 7,
      title: 'Testing Equipment',
      category: 'quality',
      description: 'Advanced testing equipment for quality assurance',
    },
    {
      id: 8,
      title: 'Clutch Parts',
      category: 'products',
      description: 'High-performance clutch components',
    },
    {
      id: 9,
      title: 'Warehouse',
      category: 'facility',
      description: 'Organized warehouse for inventory management',
    },
    {
      id: 10,
      title: 'Lathe Machine',
      category: 'machinery',
      description: 'Precision lathe machines for component turning',
    },
    {
      id: 11,
      title: 'Engine Components',
      category: 'products',
      description: 'Critical engine parts manufactured to exact specifications',
    },
    {
      id: 12,
      title: 'Quality Inspection',
      category: 'quality',
      description: 'Final quality inspection before dispatch',
    },
  ];

  const filters = [
    { id: 'all', name: 'All Photos' },
    { id: 'facility', name: 'Facility' },
    { id: 'machinery', name: 'Machinery' },
    { id: 'products', name: 'Products' },
    { id: 'quality', name: 'Quality' },
  ];

  const filteredPhotos =
    activeFilter === 'all'
      ? photos
      : photos.filter((photo) => photo.category === activeFilter);

  return (
    <div className="photos-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Our Facility</h1>
          <p>Take a look at our manufacturing facility and products</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section">
        <div className="container">
          <div className="section-title">
            <h2>Photo Gallery</h2>
            <p>Explore our manufacturing capabilities and product range</p>
          </div>

          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <div className="photos-grid">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <div className="photo-placeholder">
                  <span className="photo-number">
                    {String(photo.id).padStart(2, '0')}
                  </span>
                </div>
                <div className="photo-overlay">
                  <h4>{photo.title}</h4>
                  <p>{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">40+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Quality Tested</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Photos;

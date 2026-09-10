import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiGlobe, FiPackage, FiShield, FiArrowRight } from 'react-icons/fi';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

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

    const elements = sectionRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FiGlobe />,
      title: 'Global Reach',
      description: 'Exporting to 40+ countries worldwide with reliable supply chain solutions',
    },
    {
      icon: <FiAward />,
      title: 'ISO 9002 Certified',
      description: 'International quality standards ensuring consistent product excellence',
    },
    {
      icon: <FiPackage />,
      title: 'Modern Manufacturing',
      description: 'State-of-the-art machinery and dedicated quality laboratories',
    },
    {
      icon: <FiShield />,
      title: 'Quality Assurance',
      description: 'Multi-stage quality checks from raw materials to finished products',
    },
  ];

  return (
    <section className="about-section section" ref={sectionRef} id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content slide-in-left">
            <div className="section-badge">About Jaspreet Impex</div>
            <h2 className="about-title">
              Heritage of Excellence in
              <span className="highlight"> Automotive Manufacturing</span>
            </h2>
            <p className="about-description">
              Established through the vision of <strong>Late S. Kirpal Singh Sethi</strong>,
              Jaspreet Impex (GEE TEC) started as a small unit in Phagwara, Punjab,
              and has grown into a large-scale enterprise serving the global automotive industry.
            </p>
            <p className="about-description">
              As a <strong>100% export unit</strong>, we combine the advantages of low production
              costs in India with international quality standards, delivering precision-engineered
              components to over 40 countries worldwide.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-number">15+</span>
                <span className="highlight-label">Years Experience</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">40+</span>
                <span className="highlight-label">Countries Served</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">100%</span>
                <span className="highlight-label">Export Focus</span>
              </div>
            </div>

            <Link to="/about-us" className="btn-primary-custom">
              Learn More <FiArrowRight />
            </Link>
          </div>

          <div className="about-visual slide-in-right">
            <div className="about-image-main">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">🏭</span>
                  <span>Manufacturing Facility</span>
                </div>
              </div>
            </div>
            <div className="experience-badge">
              <span className="exp-number">15+</span>
              <span className="exp-text">Years of Excellence</span>
            </div>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card fade-in"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

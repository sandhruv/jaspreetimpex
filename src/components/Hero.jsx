import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.classList.add('visible');
    }
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            15+ Years of Excellence
          </div>

          <h1 className="hero-title">
            Precision Engineered
            <span className="highlight"> Automotive Components</span>
            <br />& Metal Fasteners
          </h1>

          <p className="hero-description">
            Delivering world-quality automotive components and metal fasteners to over 40 countries.
            Combining Indian manufacturing excellence with international quality standards.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">40+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Export Unit</span>
            </div>
          </div>

          <div className="hero-buttons">
            <Link to="/products" className="btn-primary-custom">
              Our Products <FiArrowRight />
            </Link>
            <Link to="/contact-us" className="btn-secondary-custom">
              Get a Quote <FiArrowRight />
            </Link>
          </div>

          <div className="hero-video-trigger">
            <button className="play-btn" aria-label="Play video">
              <FiPlay />
            </button>
            <span>Watch Our Story</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card card-1">
            <div className="card-icon">⚙️</div>
            <span>ISO 9002</span>
          </div>
          <div className="visual-card card-2">
            <div className="card-icon">🌍</div>
            <span>Global Export</span>
          </div>
          <div className="visual-card card-3">
            <div className="card-icon">🏭</div>
            <span>Made in India</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;

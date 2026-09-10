import { useEffect } from 'react';
import { FiAward, FiGlobe, FiPackage, FiShield, FiTarget, FiUsers } from 'react-icons/fi';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: '2009', event: 'Founded by Late S. Kirpal Singh Sethi in Phagwara, Punjab' },
    { year: '2012', event: 'Expanded manufacturing facility with modern machinery' },
    { year: '2015', event: 'Achieved ISO 9002 certification' },
    { year: '2018', event: 'Expanded to 30+ countries worldwide' },
    { year: '2020', event: 'Established dedicated quality laboratories' },
    { year: '2024', event: 'Serving 40+ countries with 100% export focus' },
  ];

  const values = [
    {
      icon: <FiTarget />,
      title: 'Precision',
      description: 'Every component is manufactured with exact specifications and tight tolerances.',
    },
    {
      icon: <FiShield />,
      title: 'Quality',
      description: 'Multi-stage quality checks ensure international standards are met consistently.',
    },
    {
      icon: <FiGlobe />,
      title: 'Global Reach',
      description: 'Reliable supply chain delivering to over 40 countries worldwide.',
    },
    {
      icon: <FiUsers />,
      title: 'Customer Focus',
      description: 'Dedicated support and personalized service for every client.',
    },
  ];

  return (
    <div className="about-us-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>About Jaspreet Impex</h1>
          <p>Heritage of Excellence in Automotive Manufacturing</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section section" id="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <div className="section-badge">Our Story</div>
              <h2>A Legacy Built on Vision and Excellence</h2>
              <p>
                Jaspreet Impex (GEE TEC) was established through the vision of
                <strong> Late S. Kirpal Singh Sethi</strong>, starting as a small unit
                in Phagwara, Punjab, and expanding into a large-scale enterprise.
              </p>
              <p>
                What began as a modest manufacturing operation has grown into a
                <strong> 100% export unit</strong> delivering precision-engineered
                automotive components and metal fasteners to over 40 countries worldwide.
              </p>
              <p>
                Our competitive advantage lies in combining low production costs in India
                with international quality standards, making us a preferred partner for
                global automotive companies.
              </p>
            </div>
            <div className="story-visual">
              <div className="story-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🏭</span>
                  <span>Our Manufacturing Heritage</span>
                </div>
              </div>
              <div className="story-stats">
                <div className="stat-box">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section section">
        <div className="container">
          <div className="section-title">
            <h2>Our Journey</h2>
            <p>Key milestones in our growth story</p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-section section">
        <div className="container">
          <div className="vision-grid">
            <div className="vision-card">
              <div className="vision-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide the best solutions for automotive components, combining
                Indian manufacturing excellence with international quality standards,
                ensuring customer satisfaction through reliable delivery and competitive pricing.
              </p>
            </div>
            <div className="vision-card">
              <div className="vision-icon">🌐</div>
              <h3>Our Vision</h3>
              <p>
                To become a globally recognized leader in automotive component manufacturing,
                known for precision engineering, quality reliability, and customer-centric approach.
              </p>
            </div>
            <div className="vision-card">
              <div className="vision-icon">⭐</div>
              <h3>Our Purpose</h3>
              <p>
                Making precision-engineered automotive components accessible worldwide,
                while maintaining the highest standards of quality and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="quality-section section" id="quality">
        <div className="container">
          <div className="section-title">
            <h2>Quality Policy</h2>
            <p>Committed to excellence at every stage</p>
          </div>

          <div className="quality-content">
            <div className="quality-main">
              <p className="quality-statement">
                Quality checks occur at every stage of production. Raw materials and
                finished components undergo testing using monitoring equipment to meet
                international specifications before dispatch.
              </p>

              <div className="quality-process">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <h4>Raw Material Testing</h4>
                  <p>All incoming materials undergo rigorous testing for composition and quality.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">02</div>
                  <h4>In-Process Monitoring</h4>
                  <p>Continuous quality monitoring during manufacturing ensures consistency.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">03</div>
                  <h4>Final Inspection</h4>
                  <p>Finished products undergo final inspection with advanced testing equipment.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">04</div>
                  <h4>Certification</h4>
                  <p>Complete documentation and quality certification before dispatch.</p>
                </div>
              </div>
            </div>

            <div className="quality-certifications">
              <div className="cert-card">
                <FiAward className="cert-icon" />
                <h4>ISO 9002</h4>
                <p>Quality Management System Certified</p>
              </div>
              <div className="cert-card">
                <FiPackage className="cert-icon" />
                <h4>100% Inspection</h4>
                <p>Every product undergoes complete quality check</p>
              </div>
              <div className="cert-card">
                <FiShield className="cert-icon" />
                <h4>International Standards</h4>
                <p>Meeting global automotive quality requirements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section section">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>The principles that guide our operations</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

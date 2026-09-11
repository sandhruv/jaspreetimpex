import { useEffect } from 'react';
import { FiAward, FiGlobe, FiTruck, FiShield, FiTarget, FiUsers } from 'react-icons/fi';
import SEO from '../components/SEO';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: '2000s', event: 'Founded with a vision to provide reliable logistics solutions' },
    { year: '2010s', event: 'Expanded operations across major Indian cities' },
    { year: '2015', event: 'Achieved licensed customs house agent status' },
    { year: '2018', event: 'Expanded to serve 30+ countries globally' },
    { year: '2020', event: 'Established specialized DG handling capabilities' },
    { year: '2024', event: 'Serving 50+ countries with comprehensive logistics solutions' },
  ];

  const values = [
    {
      icon: <FiTarget />,
      title: 'Reliability',
      description: 'Every shipment is handled with precision and delivered on time, every time.',
    },
    {
      icon: <FiShield />,
      title: 'Safety',
      description: 'Strict adherence to international safety standards and regulatory compliance.',
    },
    {
      icon: <FiGlobe />,
      title: 'Global Reach',
      description: 'Comprehensive network covering 50+ countries with seamless logistics solutions.',
    },
    {
      icon: <FiUsers />,
      title: 'Customer Focus',
      description: 'Dedicated support and personalized service for every client.',
    },
  ];

  return (
    <div className="about-us-page">
      <SEO
        title="About Us - Jaspreet Impex | Logistics Solutions India"
        description="Learn about Jaspreet Impex - your trusted logistics partner offering freight forwarding, customs clearance, and supply chain solutions across India and globally."
        keywords="about Jaspreet Impex, logistics company India, freight forwarding, customs clearance"
        url="https://jaspreetimpex.com/about-us"
      />
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>About Jaspreet Impex</h1>
          <p>Your Trusted Partner for End-to-End Logistics Solutions</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section section" id="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <div className="section-badge">Our Story</div>
              <h2>A Legacy Built on Trust and Excellence</h2>
              <p>
                Jaspreet Impex was established with a vision to provide reliable and efficient
                logistics solutions to businesses across India and beyond.
              </p>
              <p>
                What began as a modest operation has grown into a
                <strong> comprehensive logistics company</strong> serving 50+ countries with
                freight forwarding, customs clearance, and supply chain management services.
              </p>
              <p>
                Our competitive advantage lies in combining cost-effective solutions with
                international quality standards, making us a preferred logistics partner for
                businesses worldwide.
              </p>
            </div>
            <div className="story-visual">
              <div className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=400&fit=crop" 
                  alt="Jaspreet Impex Global Logistics" 
                  className="story-img"
                  loading="lazy"
                />
              </div>
              <div className="story-stats">
                <div className="stat-box">
                  <span className="stat-number">22+</span>
                  <span className="stat-label">Years</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">50+</span>
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
                To provide seamless logistics solutions that empower businesses to grow,
                combining Indian logistics expertise with global standards of efficiency
                and reliability.
              </p>
            </div>
            <div className="vision-card">
              <div className="vision-icon">🌐</div>
              <h3>Our Vision</h3>
              <p>
                To become a globally recognized leader in logistics solutions,
                known for reliability, safety, and customer-centric approach.
              </p>
            </div>
            <div className="vision-card">
              <div className="vision-icon">⭐</div>
              <h3>Our Purpose</h3>
              <p>
                Making global trade accessible and efficient for businesses of all sizes,
                while maintaining the highest standards of safety and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="quality-section section" id="quality">
        <div className="container">
          <div className="section-title">
            <h2>Our Commitment</h2>
            <p>Dedicated to excellence in every shipment</p>
          </div>

          <div className="quality-content">
            <div className="quality-main">
              <p className="quality-statement">
                We prioritize safety, compliance, and efficiency in every aspect of our
                operations. Our team ensures that all shipments are handled with the utmost
                care and delivered on time.
              </p>

              <div className="quality-process">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <h4>Route Planning</h4>
                  <p>Optimal route selection for efficient and cost-effective delivery.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">02</div>
                  <h4>Real-Time Tracking</h4>
                  <p>Advanced tracking systems for complete shipment visibility.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">03</div>
                  <h4>Compliance Check</h4>
                  <p>Ensuring all regulatory requirements are met for smooth clearance.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">04</div>
                  <h4>Safe Delivery</h4>
                  <p>Secure handling and timely delivery to destination.</p>
                </div>
              </div>
            </div>

            <div className="quality-certifications">
              <div className="cert-card">
                <FiAward className="cert-icon" />
                <h4>Licensed CHA</h4>
                <p>Licensed Customs House Agent</p>
              </div>
              <div className="cert-card">
                <FiTruck className="cert-icon" />
                <h4>MSME Registered</h4>
                <p>Government Recognized Enterprise</p>
              </div>
              <div className="cert-card">
                <FiShield className="cert-icon" />
                <h4>Safety Certified</h4>
                <p>International Safety Standards Compliance</p>
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
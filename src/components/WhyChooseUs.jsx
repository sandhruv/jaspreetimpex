import { useEffect, useRef } from 'react';
import { FiTarget, FiTruck, FiDollarSign, FiClock, FiHeadphones, FiCheckCircle } from 'react-icons/fi';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
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

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const advantages = [
    {
      icon: <FiTarget />,
      title: 'Precision Quality',
      description: 'Every product undergoes rigorous quality checks at multiple stages of production.',
    },
    {
      icon: <FiTruck />,
      title: 'Global Delivery',
      description: 'Reliable supply chain ensuring timely delivery to 40+ countries worldwide.',
    },
    {
      icon: <FiDollarSign />,
      title: 'Competitive Pricing',
      description: 'Cost-effective manufacturing in India with international quality standards.',
    },
    {
      icon: <FiClock />,
      title: 'Quick Turnaround',
      description: 'Efficient production processes ensuring fast lead times for all orders.',
    },
    {
      icon: <FiHeadphones />,
      title: 'Dedicated Support',
      description: 'Personalized customer service with dedicated account managers.',
    },
    {
      icon: <FiCheckCircle />,
      title: 'ISO Certified',
      description: 'ISO 9002 certified processes ensuring consistent quality and reliability.',
    },
  ];

  return (
    <section className="why-section section" ref={sectionRef} id="why-choose">
      <div className="container">
        <div className="why-grid">
          <div className="why-content fade-in">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="why-title">
              Your Trusted Partner for
              <span className="highlight"> Automotive Excellence</span>
            </h2>
            <p className="why-description">
              With over 15 years of experience and a commitment to quality, Jaspreet Impex
              delivers precision-engineered components that meet the highest international standards.
            </p>

            <div className="quality-checks">
              <h4>Our Quality Commitment:</h4>
              <ul>
                <li>
                  <FiCheckCircle className="check-icon" />
                  Raw material testing before production
                </li>
                <li>
                  <FiCheckCircle className="check-icon" />
                  In-process quality monitoring
                </li>
                <li>
                  <FiCheckCircle className="check-icon" />
                  Final inspection with advanced equipment
                </li>
                <li>
                  <FiCheckCircle className="check-icon" />
                  Documentation and certification
                </li>
              </ul>
            </div>
          </div>

          <div className="advantages-grid">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="advantage-card fade-in"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="advantage-icon">{advantage.icon}</div>
                <h3 className="advantage-title">{advantage.title}</h3>
                <p className="advantage-description">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

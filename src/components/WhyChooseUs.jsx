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
      title: 'Precision & Reliability',
      description: 'Every shipment is handled with meticulous planning and real-time tracking for guaranteed delivery.',
    },
    {
      icon: <FiTruck />,
      title: 'Pan-India Network',
      description: 'Comprehensive logistics network covering all major cities and industrial hubs across India.',
    },
    {
      icon: <FiDollarSign />,
      title: 'Cost-Effective Solutions',
      description: 'Optimized logistics solutions that reduce costs while maintaining highest service standards.',
    },
    {
      icon: <FiClock />,
      title: 'On-Time Delivery',
      description: '99.8% on-time delivery rate through efficient route planning and proactive monitoring.',
    },
    {
      icon: <FiHeadphones />,
      title: '24/7 Customer Support',
      description: 'Dedicated support team available round the clock to address your logistics needs.',
    },
    {
      icon: <FiCheckCircle />,
      title: 'Safety & Compliance',
      description: 'Strict adherence to international safety standards and regulatory compliance for all shipments.',
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
              <span className="highlight"> Logistics Excellence</span>
            </h2>
            <p className="why-description">
              With decades of experience and a commitment to reliability, Jaspreet Impex
              delivers seamless logistics solutions that keep your business moving forward.
            </p>

            <div className="quality-checks">
              <h4>Our Commitment:</h4>
              <ul>
                <li>
                  <FiCheckCircle className="check-icon" />
                  Real-time shipment tracking & visibility
                </li>
                <li>
                  <FiCheckCircle className="check-icon" />
                  Dedicated account managers for personalized service
                </li>
                <li>
                  <FiCheckCircle className="check-icon" />
                  Comprehensive insurance coverage options
                </li>
                <li>
                  <FiCheckCircle className="check-icon" />
                  End-to-end supply chain management
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
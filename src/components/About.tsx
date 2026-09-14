"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FiAward, FiGlobe, FiTruck, FiShield, FiArrowRight } from "react-icons/fi";

const features = [
  {
    icon: <FiGlobe />,
    title: "Global Network",
    description: "Serving 50+ countries with reliable freight forwarding and supply chain solutions",
  },
  {
    icon: <FiAward />,
    title: "Licensed & Certified",
    description: "Licensed customs house agent with MSME registration and industry certifications",
  },
  {
    icon: <FiTruck />,
    title: "Multimodal Transport",
    description: "Comprehensive air, sea, and road transport solutions across India and globally",
  },
  {
    icon: <FiShield />,
    title: "Safety & Compliance",
    description: "Strict adherence to international safety regulations and DG handling protocols",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section section" ref={sectionRef} id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content slide-in-left">
            <div className="section-badge">About Jaspreet Impex</div>
            <h2 className="about-title">
              Your Trusted Partner for
              <span className="highlight"> End-to-End Logistics</span>
            </h2>
            <p className="about-description">
              Jaspreet Impex is a leading logistics company based in India, specializing in
              providing efficient and reliable logistics solutions. With a strong presence
              in the industry, we offer comprehensive services tailored to diverse business needs.
            </p>
            <p className="about-description">
              Our commitment goes beyond simply moving goods. We deliver exceptional value through
              cost-effective, technology-driven services while maintaining the highest standards
              of professionalism, integrity, and safety.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-number">10K+</span>
                <span className="highlight-label">Shipments Delivered</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">50+</span>
                <span className="highlight-label">Countries Served</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">24/7</span>
                <span className="highlight-label">Support Available</span>
              </div>
            </div>

            <Link href="/about-us" className="btn-primary-custom">
              Learn More <FiArrowRight />
            </Link>
          </div>

          <div className="about-visual slide-in-right">
            <div className="about-image-main">
              <img
                src="/images/about.jpg"
                alt="Aerial view of warehouse with trucks and logistics operations"
                className="about-img"
                loading="lazy"
              />
            </div>
            <div className="experience-badge">
              <span className="exp-number">22+</span>
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
}

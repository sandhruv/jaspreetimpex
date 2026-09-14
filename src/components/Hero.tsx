"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FiArrowRight, FiPlay, FiAirplay, FiTruck, FiBox } from "react-icons/fi";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.classList.add("visible");
    }
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-background">
        <img
          src="/images/hero.png"
          alt="Container port with gantry cranes loading freight containers"
          className="hero-bg-image"
          loading="eager"
          width={1920}
          height={1080}
        />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Your Trusted Logistics Partner
          </div>

          <h1 className="hero-title">
            Seamless Logistics
            <span className="highlight"> Solutions Across India</span>
            <br />& Beyond
          </h1>

          <p className="hero-description">
            From freight forwarding to customs clearance, we deliver end-to-end logistics
            solutions with precision, reliability, and global reach.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Shipments Delivered</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">99.8%</span>
              <span className="stat-label">On-Time Delivery</span>
            </div>
          </div>

          <div className="hero-buttons">
            <Link href="/services" className="btn-primary-custom">
              Our Services <FiArrowRight />
            </Link>
            <Link href="/contact-us" className="btn-secondary-custom">
              Request Quote <FiArrowRight />
            </Link>
          </div>

          <div className="hero-video-trigger">
            <button className="play-btn" aria-label="Play video">
              <FiPlay />
            </button>
            <span>Watch How We Work</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card card-1">
            <div className="card-icon">
              <FiAirplay />
            </div>
            <span>Air Freight</span>
          </div>
          <div className="visual-card card-2">
            <div className="card-icon">
              <FiBox />
            </div>
            <span>Sea Freight</span>
          </div>
          <div className="visual-card card-3">
            <div className="card-icon">
              <FiTruck />
            </div>
            <span>Road Transport</span>
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
}

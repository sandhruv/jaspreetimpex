"use client";

import { useState } from "react";

const photos = [
  { id: 1, title: "Container Terminal", category: "facility", description: "Busy container terminal with gantry cranes loading freight containers to trucks", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&h=600&fit=crop" },
  { id: 2, title: "Warehouse Operations", category: "facility", description: "Modern warehouse with organized shelving and forklift operations", image: "/images/warehouse.jpg" },
  { id: 3, title: "Cargo Aircraft", category: "machinery", description: "Air freight operations for urgent international shipments", image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=600&fit=crop" },
  { id: 4, title: "Container Ship", category: "facility", description: "Large cargo ship loaded with containers at port", image: "https://images.unsplash.com/photo-1617952739858-28043cecdae3?w=600&h=600&fit=crop" },
  { id: 5, title: "Customs Documentation", category: "quality", description: "Customs clearance documentation and compliance processing", image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=600&fit=crop" },
  { id: 6, title: "Forklift Operations", category: "machinery", description: "Forklift moving cargo at distribution warehouse", image: "https://images.unsplash.com/photo-1661963559074-679de6f4f04d?w=600&h=600&fit=crop" },
  { id: 7, title: "Truck Fleet", category: "machinery", description: "Fleet of trucks for road transportation across India", image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=600&fit=crop" },
  { id: 8, title: "Cargo Loading", category: "facility", description: "Efficient cargo loading and unloading at port", image: "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=600&h=600&fit=crop" },
  { id: 9, title: "GPS Tracking", category: "quality", description: "Real-time cargo tracking and monitoring system", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop" },
  { id: 10, title: "Distribution Hub", category: "facility", description: "Last-mile delivery distribution center", image: "/images/warehouse.jpg" },
  { id: 11, title: "Safety Equipment", category: "quality", description: "Safety protocols and equipment for DG shipment handling", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop" },
  { id: 12, title: "Port Operations", category: "facility", description: "Container port with cranes and maritime operations", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=600&fit=crop" },
];

const filters = [
  { id: "all", name: "All Photos" },
  { id: "facility", name: "Facilities" },
  { id: "machinery", name: "Equipment" },
  { id: "quality", name: "Operations" },
];

export default function PhotosPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeFilter);

  return (
    <div className="photos-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Our Operations</h1>
          <p>Take a look at our logistics facilities and operations</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section">
        <div className="container">
          <div className="section-title">
            <h2>Photo Gallery</h2>
            <p>Explore our logistics capabilities and global operations</p>
          </div>

          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <div className="photos-grid">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="photo-img"
                  loading="lazy"
                />
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
              <span className="stat-number">22+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Shipments Delivered</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">99.8%</span>
              <span className="stat-label">On-Time Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

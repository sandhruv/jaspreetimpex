import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Home = () => {
  const [settings, setSettings] = useState({
    hero: true,
    about: true,
    services: true,
    whyChooseUs: true,
    contact: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/site-settings`);
        if (res.data.data) {
          setSettings({
            hero: res.data.data.hero ?? true,
            about: res.data.data.about ?? true,
            services: res.data.data.services ?? true,
            whyChooseUs: res.data.data.whyChooseUs ?? true,
            contact: res.data.data.contact ?? true
          });
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      <SEO
        title="Jaspreet Impex (GEE TEC) | Automotive Components & Metal Fasteners Manufacturer India"
        description="Leading manufacturer and exporter of precision automotive components, brake parts, clutch parts, metal washers, and fasteners from India. 15+ years experience, ISO 9002 certified."
        keywords="automotive components manufacturer India, metal fasteners exporter, brake parts India, clutch components, metal washers, GEE TEC"
        url="https://jaspreetimpex.com"
      />
      {settings.hero && <Hero />}
      {settings.about && <About />}
      {settings.services && <Services />}
      {settings.whyChooseUs && <WhyChooseUs />}
      {settings.contact && <Contact />}
    </>
  );
};

export default Home;

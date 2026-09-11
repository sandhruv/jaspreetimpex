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
        title="Jaspreet Impex | Logistics Solutions - Freight Forwarding, Customs Clearance & Supply Chain"
        description="Leading logistics company in India offering freight forwarding, customs clearance, warehousing, DG shipment handling, and end-to-end supply chain solutions."
        keywords="logistics company India, freight forwarding, customs clearance, supply chain management, DG shipment handling, warehousing, e-commerce logistics"
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
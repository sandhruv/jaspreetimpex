import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO
        title="Jaspreet Impex (GEE TEC) | Automotive Components & Metal Fasteners Manufacturer India"
        description="Leading manufacturer and exporter of precision automotive components, brake parts, clutch parts, metal washers, and fasteners from India. 15+ years experience, ISO 9002 certified."
        keywords="automotive components manufacturer India, metal fasteners exporter, brake parts India, clutch components, metal washers, GEE TEC"
        url="https://jaspreetimpex.com"
      />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
    </>
  );
};

export default Home;

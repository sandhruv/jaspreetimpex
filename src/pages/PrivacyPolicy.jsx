import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Legal.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <SEO
        title="Privacy Policy - Jaspreet Impex"
        description="Privacy Policy of Jaspreet Impex - How we collect, use, and protect your personal information."
        url="https://jaspreetimpex.com/privacy-policy"
      />
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How we protect your data</p>
        </div>
      </section>

      <section className="legal-section section">
        <div className="container">
          <div className="legal-content">
            <p className="last-updated">Last updated: September 2026</p>

            <h2>1. Information We Collect</h2>
            <p>
              When you submit an inquiry through our contact forms, we collect the following personal information:
            </p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Country</li>
              <li>Service interest</li>
              <li>Message content</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Respond to your logistics inquiries and provide quotes</li>
              <li>Communicate about our services</li>
              <li>Improve our website and services</li>
              <li>Send relevant updates (with your consent)</li>
            </ul>

            <h2>3. Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              Your data is stored securely and is only accessed by authorized team members
              who need it to provide our services.
            </p>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your data only when required by law or with trusted service
              providers who assist in our operations.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Our website uses cookies and analytics tools (Google Analytics) to improve
              your browsing experience and understand how visitors use our site.
              You can control cookie settings through your browser preferences.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>7. Contact Us</h2>
            <p>
              For any privacy-related concerns, please contact us at:
            </p>
            <ul>
              <li>Email: info@jaspreetimpex.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Phagwara, Punjab, India</li>
            </ul>

            <div className="legal-nav">
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

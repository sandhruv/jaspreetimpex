import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Jaspreet Impex",
  description:
    "Terms of Service for Jaspreet Impex - Terms and conditions for using our website and services.",
};

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Terms and conditions</p>
        </div>
      </section>

      <section className="legal-section section">
        <div className="container">
          <div className="legal-content">
            <p className="last-updated">Last updated: September 2026</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Jaspreet Impex website, you accept and agree
              to be bound by these Terms of Service. If you do not agree, please do
              not use our website.
            </p>

            <h2>2. Services</h2>
            <p>
              Jaspreet Impex provides logistics services including freight forwarding,
              customs clearance, warehousing, and supply chain management. All services
              are subject to separate service agreements and contracts.
            </p>

            <h2>3. Website Usage</h2>
            <ul>
              <li>You agree to use the website for lawful purposes only</li>
              <li>You will not attempt to gain unauthorized access to any part of the website</li>
              <li>You will not use the website to transmit any harmful or malicious content</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images,
              is the property of Jaspreet Impex and is protected by copyright laws.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              Jaspreet Impex shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our website or services.
              Our liability is limited to the extent permitted by law.
            </p>

            <h2>6. Shipping &amp; Delivery</h2>
            <p>
              All shipping and logistics services are governed by separate terms outlined
              in individual service agreements. Jaspreet Impex follows industry-standard
              practices for cargo handling and delivery.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be
              subject to the exclusive jurisdiction of courts in Punjab, India.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be
              effective immediately upon posting on this page.
            </p>

            <h2>9. Contact</h2>
            <p>For questions about these Terms of Service, contact us at:</p>
            <ul>
              <li>Email: info@jaspreetimpex.com</li>
              <li>Phone: +91 98767 03899</li>
            </ul>

            <div className="legal-nav">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/contact-us">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

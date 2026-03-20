import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFileContract, FaGavel, FaShieldAlt, FaUsers, FaCog, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import './TermsOfService.css';

const TermsOfService = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="terms-of-service-page">
      {/* Header */}
      <motion.header 
        className="terms-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button 
          className="back-button"
          onClick={goBack}
          aria-label="Go back"
        >
          <FaArrowLeft />
          Back
        </button>
        <div className="terms-title-section">
          <FaFileContract className="terms-icon" />
          <h1>Terms of Service</h1>
          <p className="terms-subtitle">Legal terms governing your use of L² Flows services</p>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main 
        className="terms-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="terms-container">
          {/* Introduction */}
          <section className="terms-section">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("you" or "Client") 
              and lsquaredflows.agency ("we," "us," or "our"), governing your access to and use of our website, 
              software, services, and related business automation and AI-powered tools (collectively, the "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. 
              If you do not agree, you must not use our Services.
            </p>
            <div className="effective-date">
              <strong>Effective Date:</strong> September 2025
            </div>
          </section>

          {/* Services Provided */}
          <section className="terms-section">
            <h2><FaCog className="section-icon" />Services Provided</h2>
            <p>
              lsquaredflows.agency delivers automated business solutions including:
            </p>
            <ul>
              <li>Taxi service automation</li>
              <li>Barber shop booking systems</li>
              <li>AI-powered customer communication</li>
              <li>CRM integration</li>
              <li>Workflow automation tools</li>
              <li>Third-party integrations via n8n platform</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Services with reasonable notice.
            </p>
          </section>

          {/* Client Responsibilities */}
          <section className="terms-section">
            <h2><FaUsers className="section-icon" />Client Responsibilities</h2>
            <p>You represent and warrant that:</p>
            
            <div className="responsibility-category">
              <h3>1. Authority and Compliance</h3>
              <ul>
                <li>You have the authority to enter into this agreement and use the Services</li>
                <li>All data submitted via our Services complies with applicable laws and regulations, including data protection laws</li>
                <li>You will provide accurate, current, and complete information required for the Services and update it promptly when needed</li>
              </ul>
            </div>

            <div className="responsibility-category">
              <h3>2. Data Protection Compliance</h3>
              <ul>
                <li>You are responsible for obtaining any consents required under applicable laws, including GDPR, from data subjects before submitting their personal data through our Services</li>
                <li>You will comply with all data protection obligations applicable to your use of the Services</li>
              </ul>
            </div>
          </section>

          {/* Data Protection and Privacy */}
          <section className="terms-section">
            <h2><FaLock className="section-icon" />Data Protection and Privacy</h2>
            <p>
              Your use of the Services is governed by our Privacy Policy, which describes how we collect, use, and protect your data. 
              We are committed to GDPR compliance and respecting your privacy rights.
            </p>
            <p>
              You agree to comply with any data protection obligations applicable to your use of the Services.
            </p>
          </section>

          {/* Acceptable Use */}
          <section className="terms-section">
            <h2><FaExclamationTriangle className="section-icon" />Acceptable Use</h2>
            <p>You agree not to use the Services to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe intellectual property or proprietary rights</li>
              <li>Transmit harmful or malicious code or content</li>
              <li>Engage in fraudulent, abusive, or harmful activities</li>
              <li>Interfere with the integrity or performance of the Services</li>
            </ul>
            <p className="warning-text">
              <strong>Warning:</strong> Violation of this clause may result in immediate suspension or termination of your access.
            </p>
          </section>

          {/* Intellectual Property Rights */}
          <section className="terms-section">
            <h2><FaShieldAlt className="section-icon" />Intellectual Property Rights</h2>
            <p>
              All intellectual property rights in the Services, including software, workflows, AI models, trademarks, and content, 
              remain the exclusive property of lsquaredflows.agency or its licensors.
            </p>
            <p>
              You are granted a limited, non-exclusive license to use the Services as permitted under these Terms.
            </p>
          </section>

          {/* Fees, Payment, and Billing */}
          <section className="terms-section">
            <h2>Fees, Payment, and Billing</h2>
            <ul>
              <li>If applicable, fees for Services are payable as agreed in client contracts or service order forms</li>
              <li>We reserve the right to modify pricing with prior notice</li>
              <li>Late payments may result in suspended access</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="terms-section">
            <h2><FaGavel className="section-icon" />Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, lsquaredflows.agency's total liability arising out of or 
              relating to your use of the Services shall not exceed the amount paid by you to us for the Services during 
              the twelve months preceding the claim.
            </p>
            
            <div className="liability-category">
              <h3>We are not liable for:</h3>
              <ul>
                <li>Indirect, incidental, special, consequential, or punitive damages, including loss of profits or data</li>
                <li>Damages caused by third-party services or force majeure events beyond our control</li>
                <li>Any damages arising from unauthorized access or data breaches caused by your failure to secure access credentials</li>
              </ul>
            </div>
          </section>

          {/* Indemnification */}
          <section className="terms-section">
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless lsquaredflows.agency and its officers, directors, employees, 
              affiliates, and agents from any claims, damages, liabilities, costs, or expenses arising from:
            </p>
            <ul>
              <li>Your violation of these Terms or applicable laws</li>
              <li>Your data submissions or use of the Services</li>
              <li>Your breach of third-party rights or privacy obligations</li>
            </ul>
          </section>

          {/* Security and Data Breach Notification */}
          <section className="terms-section">
            <h2><FaLock className="section-icon" />Security and Data Breach Notification</h2>
            <p>
              We implement reasonable security measures to protect data processed via our Services. In the event of a personal 
              data breach affecting EU data subjects, we will notify you and relevant authorities in accordance with GDPR timelines.
            </p>
            <p>
              You are responsible for securing your access credentials and using the Services in compliance with security recommendations.
            </p>
          </section>

          {/* Force Majeure */}
          <section className="terms-section">
            <h2>Force Majeure</h2>
            <p>
              lsquaredflows.agency shall not be liable for delays or failures in performance resulting from causes beyond our 
              reasonable control, including but not limited to:
            </p>
            <ul>
              <li>Natural disasters</li>
              <li>Cyberattacks</li>
              <li>Pandemics</li>
              <li>Government actions</li>
              <li>Third-party service outages</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="terms-section">
            <h2>Termination</h2>
            <ul>
              <li>Either party may terminate the contract for convenience with prior written notice as specified in client agreements</li>
              <li>We may suspend or terminate your access if you breach these Terms or engage in prohibited conduct</li>
              <li>Upon termination, your access to the Services ceases, and we may retain data as required by law or to fulfill contractual obligations</li>
            </ul>
          </section>

          {/* Governing Law and Dispute Resolution */}
          <section className="terms-section">
            <h2><FaGavel className="section-icon" />Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the EU member state where lsquaredflows.agency is registered or where you are located, as applicable.
            </p>
            <p>
              Disputes should first be attempted to resolve amicably. If unresolved, disputes may be brought before competent courts or arbitration bodies with appropriate jurisdiction.
            </p>
          </section>

          {/* Amendments */}
          <section className="terms-section">
            <h2>Amendments</h2>
            <p>
              We reserve the right to update these Terms from time to time to reflect changes in laws, practices, or Services. 
              Changes will be communicated in advance by reasonable means. Continued use after changes signifies acceptance.
            </p>
          </section>

          {/* Contact Information */}
          <section className="terms-section contact-section">
            <h2>Contact Information</h2>
            <p>
              For questions about these Terms, data protection, or to exercise your rights, please contact:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> lsquaredflows@gmail.com</p>
              <p><strong>Website:</strong> https://lsquaredflows.agency</p>
            </div>
          </section>

          {/* Meta verification footer with DellOrco Enterprise information */}
          <footer className="main-footer">
            <div className="footer-content">
              <div className="footer-main">
                <span>©️ 2025 DellOrco Enterprise, obrt za računalno programiranje, vl. Lovre Dell'Orco</span>
                
                <div className="company-info">
                  <p>Matije Gupca 1, 21000 Split, Hrvatska</p>
                  <p>Email: lsquaredflows@gmail.com | Tel: +385955764483</p>
                  <p>All rights reserved.</p>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="legal-links">
                  <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>
                  <a href="/terms-of-service" className="terms-link">Terms of Service</a>
                </div>
              </div>
            </div>
            
            <div className="terms-footer">
              <p><strong>Effective Date:</strong> September 2025</p>
              <p>These Terms of Service apply to all L² Flows Agency services and users.</p>
              <button 
                className="scroll-to-top"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                ↑ Back to Top
              </button>
            </div>
          </footer>
        </div>
      </motion.main>
    </div>
  );
};

export default TermsOfService;

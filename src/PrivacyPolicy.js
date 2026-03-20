import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaShieldAlt, FaLock, FaEye, FaCog, FaUsers, FaGavel } from 'react-icons/fa';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="privacy-policy-page">
      {/* Header */}
      <motion.header 
        className="privacy-header"
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
        <div className="privacy-title-section">
          <FaShieldAlt className="privacy-icon" />
          <h1>Privacy Policy</h1>
          <p className="privacy-subtitle">How we protect and handle your data</p>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main 
        className="privacy-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="privacy-container">
          {/* Introduction */}
          <section className="privacy-section">
            <h2>Introduction</h2>
            <p>
              L² Flows Agency ("we," "our," or "us") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, store, and share information when you use our business 
              automation and AI services, including our website lsquaredflows.agency and all related services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="privacy-section">
            <h2><FaEye className="section-icon" />Information We Collect</h2>
            
            <div className="info-category">
              <h3>1. Customer Information</h3>
              <p>We collect information you provide directly to us through various communication channels:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number, business name, and job title</li>
                <li><strong>Communication Data:</strong> Messages, inquiries, and support requests through WhatsApp, Telegram, email, and web forms</li>
                <li><strong>Business Information:</strong> Company details, industry type, business size, and specific automation requirements</li>
                <li><strong>Service Preferences:</strong> Your preferences for automation solutions, communication methods, and service delivery</li>
              </ul>
            </div>

            <div className="info-category">
              <h3>2. Business Data from Automation Services</h3>
              <p>When you use our automation services, we may collect:</p>
              <ul>
                <li><strong>Workflow Data:</strong> Information processed through our n8n automation workflows</li>
                <li><strong>Integration Data:</strong> Data from third-party services you connect (Google Calendar, Google Sheets, CRM systems, etc.)</li>
                <li><strong>Performance Metrics:</strong> Usage statistics, automation success rates, and system performance data</li>
                <li><strong>Custom Configuration:</strong> Your specific automation rules, triggers, and business logic settings</li>
              </ul>
            </div>

            <div className="info-category">
              <h3>3. Technical Data</h3>
              <p>We automatically collect certain technical information:</p>
              <ul>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on our website, features used, and interaction patterns</li>
                <li><strong>Log Data:</strong> Server logs, error reports, and system performance metrics</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience</li>
              </ul>
            </div>

            <div className="info-category">
              <h3>4. AI System Interactions</h3>
              <p>When you interact with our AI-powered systems:</p>
              <ul>
                <li><strong>Conversation Data:</strong> Chat logs, voice commands, and AI interaction history</li>
                <li><strong>Training Data:</strong> Anonymized data used to improve our AI models and services</li>
                <li><strong>Response Analytics:</strong> AI performance metrics and user satisfaction data</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="privacy-section">
            <h2><FaCog className="section-icon" />How We Use Your Information</h2>
            
            <div className="usage-category">
              <h3>1. Service Delivery</h3>
              <ul>
                <li><strong>Automation Implementation:</strong> Building and maintaining your business automation workflows</li>
                <li><strong>AI-Powered Services:</strong> Providing intelligent customer service and communication solutions</li>
                <li><strong>Appointment Management:</strong> Operating scheduling and booking systems for your business</li>
                <li><strong>Data Processing:</strong> Executing automated workflows and data transformations</li>
                <li><strong>Technical Support:</strong> Providing assistance with your automation systems</li>
              </ul>
            </div>

            <div className="usage-category">
              <h3>2. Service Improvement</h3>
              <ul>
                <li><strong>Optimization:</strong> Analyzing usage patterns to improve our services</li>
                <li><strong>Feature Development:</strong> Developing new automation capabilities and AI features</li>
                <li><strong>Performance Monitoring:</strong> Ensuring reliable service delivery and system uptime</li>
                <li><strong>Quality Assurance:</strong> Testing and validating automation workflows</li>
              </ul>
            </div>

            <div className="usage-category">
              <h3>3. Communication</h3>
              <ul>
                <li><strong>Service Updates:</strong> Notifying you about new features, maintenance, or changes</li>
                <li><strong>Support:</strong> Responding to your inquiries and providing technical assistance</li>
                <li><strong>Marketing:</strong> Sending relevant information about our services (with your consent)</li>
                <li><strong>Emergency Communications:</strong> Important service notifications and security alerts</li>
              </ul>
            </div>
          </section>

          {/* Data Storage and Security */}
          <section className="privacy-section">
            <h2><FaLock className="section-icon" />Data Storage and Security</h2>
            
            <div className="security-category">
              <h3>1. Storage Locations</h3>
              <ul>
                <li><strong>Cloud Infrastructure:</strong> Your data is stored on secure cloud platforms with industry-standard encryption</li>
                <li><strong>Geographic Distribution:</strong> Data may be stored in multiple geographic locations for redundancy and performance</li>
                <li><strong>Third-Party Services:</strong> Some data may be stored with our trusted service providers (Google, n8n, etc.)</li>
              </ul>
            </div>

            <div className="security-category">
              <h3>2. Security Measures</h3>
              <ul>
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access controls</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                <li><strong>Secure APIs:</strong> All integrations use secure, authenticated API connections</li>
                <li><strong>Backup Systems:</strong> Regular data backups with disaster recovery procedures</li>
              </ul>
            </div>

            <div className="security-category">
              <h3>3. Data Retention</h3>
              <ul>
                <li><strong>Service Data:</strong> Retained for the duration of your service agreement plus 2 years</li>
                <li><strong>Communication Logs:</strong> Retained for 3 years for support and legal purposes</li>
                <li><strong>Technical Logs:</strong> Retained for 1 year for system monitoring and improvement</li>
                <li><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="privacy-section">
            <h2><FaUsers className="section-icon" />Data Sharing and Disclosure</h2>
            
            <div className="sharing-category">
              <h3>1. We Do Not Sell Personal Data</h3>
              <p>We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </div>

            <div className="sharing-category">
              <h3>2. Service Providers</h3>
              <p>We may share data with trusted service providers who assist in delivering our services:</p>
              <ul>
                <li><strong>Google Services:</strong> Calendar, Sheets, Gmail, and Analytics integration</li>
                <li><strong>Communication Platforms:</strong> WhatsApp, Telegram, and email service providers</li>
                <li><strong>Automation Platforms:</strong> n8n and other workflow automation tools</li>
                <li><strong>Cloud Infrastructure:</strong> Secure hosting and data storage providers</li>
                <li><strong>Payment Processors:</strong> For billing and payment processing (if applicable)</li>
              </ul>
            </div>

            <div className="sharing-category">
              <h3>3. Legal Requirements</h3>
              <p>We may disclose information when required by law or to:</p>
              <ul>
                <li><strong>Comply with Legal Process:</strong> Court orders, subpoenas, or government requests</li>
                <li><strong>Protect Rights:</strong> Defend our rights, property, or safety, or that of our users</li>
                <li><strong>Prevent Fraud:</strong> Investigate and prevent fraudulent or illegal activities</li>
                <li><strong>Emergency Situations:</strong> Protect against imminent harm to individuals or property</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="privacy-section">
            <h2><FaGavel className="section-icon" />Your Rights and Choices</h2>
            
            <div className="rights-category">
              <h3>1. Access and Portability</h3>
              <ul>
                <li><strong>Data Access:</strong> Request a copy of your personal information</li>
                <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Account Information:</strong> View and update your account details and preferences</li>
              </ul>
            </div>

            <div className="rights-category">
              <h3>2. Data Control</h3>
              <ul>
                <li><strong>Data Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Data Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Processing Restrictions:</strong> Limit how we process your data in certain circumstances</li>
              </ul>
            </div>

            <div className="rights-category">
              <h3>3. Communication Preferences</h3>
              <ul>
                <li><strong>Marketing Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Communication Channels:</strong> Choose your preferred communication methods</li>
                <li><strong>Automated Communications:</strong> Opt-out of automated messages and notifications</li>
              </ul>
            </div>
          </section>

          {/* Service-Specific Policies */}
          <section className="privacy-section">
            <h2>Service-Specific Privacy Policies</h2>
            
            <div className="service-category">
              <h3>Taxi Service Automation</h3>
              <ul>
                <li><strong>Location Data:</strong> GPS coordinates and route information for dispatch optimization</li>
                <li><strong>Customer Data:</strong> Names, phone numbers, and trip history for service delivery</li>
                <li><strong>Payment Information:</strong> Billing details processed through secure payment systems</li>
                <li><strong>Retention Period:</strong> Trip data retained for 2 years for service improvement</li>
              </ul>
            </div>

            <div className="service-category">
              <h3>Barber Shop Booking Systems</h3>
              <ul>
                <li><strong>Appointment Data:</strong> Customer preferences, service history, and scheduling information</li>
                <li><strong>Personal Details:</strong> Names, contact information, and service preferences</li>
                <li><strong>Payment Records:</strong> Transaction history and billing information</li>
                <li><strong>Retention Period:</strong> Customer data retained for 3 years for service continuity</li>
              </ul>
            </div>

            <div className="service-category">
              <h3>General Business Automation</h3>
              <ul>
                <li><strong>Workflow Data:</strong> Business process information and automation configurations</li>
                <li><strong>Integration Data:</strong> Data from connected business systems and applications</li>
                <li><strong>Performance Metrics:</strong> Automation success rates and efficiency measurements</li>
                <li><strong>Retention Period:</strong> Business data retained per client agreement terms</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="privacy-section contact-section">
            <h2>Contact Information</h2>
            
            <div className="contact-category">
              <h3>Data Protection Inquiries</h3>
              <p>For questions about this Privacy Policy or your data rights:</p>
              <p><strong>Email:</strong> lsquaredflows@gmail.com</p>
              <p><strong>Subject Line:</strong> Privacy Policy Inquiry</p>
            </div>

            <div className="contact-category">
              <h3>Service-Specific Questions</h3>
              <p>For questions about specific services or data handling:</p>
              <p><strong>Email:</strong> lsquaredflows@gmail.com</p>
              <p><strong>Subject Line:</strong> Service Privacy Question</p>
            </div>

            <div className="contact-category">
              <h3>General Contact</h3>
              <p><strong>L² Flows Agency</strong></p>
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
            
            <div className="privacy-footer">
              <p><strong>Effective Date:</strong> January 1, 2024</p>
              <p><strong>Last Updated:</strong> January 1, 2024</p>
              <p>This Privacy Policy applies to all L² Flows Agency services and users.</p>
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

export default PrivacyPolicy;

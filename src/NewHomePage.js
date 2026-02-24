import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaTimes, FaComments, FaLinkedin, FaInstagram, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiOpenai, SiN8N, SiAirtable, SiSlack, SiGoogleanalytics, SiGooglecalendar, SiGmail, SiNotion, SiWhatsapp } from 'react-icons/si';
import logo from './logohere.png';
import ChatbotTermsModal from './ChatbotTermsModal';
import './NewDesign.css';

function NewHomePage() {
  // Preserve existing functionality
  const calendlyUrl = 'https://calendly.com/lsquaredflows/30min';
  const demoEmailUrl = 'mailto:sales@lsquaredflows.agency?subject=Demo Request - L² Flows AI Automation&body=Hi L² Flows team,%0D%0A%0D%0AI would like to request a demo of your AI automation platform.%0D%0A%0D%0APlease include:%0D%0A- My business type:%0D%0A- Current challenges:%0D%0A- Preferred demo time:%0D%0A%0D%0AThank you!';
  
  // AI Customer Support Chatbot state
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! 👋 I\'m your L² Flows assistant.\n\nI can help you with:\n• Automation solutions\n• Pricing information\n• Demo requests\n• Technical questions\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  // Generate or retrieve session ID (persists until page reload)
  const [sessionId] = useState(() => {
    let id = sessionStorage.getItem('chatSessionId');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('chatSessionId', id);
    }
    return id;
  });

  // Ref for auto-scrolling messages
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Check if user already accepted terms on component mount
  useEffect(() => {
    const accepted = localStorage.getItem('chatbot-terms-accepted');
    if (accepted === 'true') {
      setTermsAccepted(true);
    }
  }, []);

  // Prevent body scroll when chatbot is open (mobile fix)
  useEffect(() => {
    if (chatbotOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [chatbotOpen]);

  // Handle terms acceptance
  const handleTermsAccept = () => {
    localStorage.setItem('chatbot-terms-accepted', 'true');
    setTermsAccepted(true);
    setShowTermsModal(false);
    setChatbotOpen(true);
  };

  // Handle terms rejection
  const handleTermsCancel = () => {
    setShowTermsModal(false);
    setChatbotOpen(false);
  };

  // Handle chatbot button click
  const handleChatbotButtonClick = () => {
    if (!chatbotOpen && !termsAccepted) {
      setShowTermsModal(true);
    } else {
      setChatbotOpen(!chatbotOpen);
      if (!chatbotOpen) setHasNotification(false);
    }
  };

  // Chat functionality (preserved from original)
  // Format message to make URLs clickable
  const formatMessageWithLinks = (text) => {
    // Regex for detecting URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split text by URLs
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      // If it's a URL, make it clickable
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index}
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="message-url-link"
            onClick={(e) => e.stopPropagation()}
          >
            🔗 Click to view
          </a>
        );
      }
      // Otherwise return plain text
      return <span key={index}>{part}</span>;
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { 
      role: 'user', 
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create abort controller with 20 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds

      const response = await fetch('https://lsquaredflows.app.n8n.cloud/webhook/lsquared-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputMessage,
          sessionId: sessionId  // ✅ Send session ID with every message
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId); // Clear timeout if request succeeds
      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || 'Sorry, I encountered an error.',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Revenue calculator (spec: employees × hourly rate × hours/week × 52)
  const [employees, setEmployees] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursSaved, setHoursSaved] = useState(20);
  const weeklySavings = employees * hourlyRate * hoursSaved;
  const annualSavings = weeklySavings * 52;
  const threeYearSavings = annualSavings * 3;

  useEffect(() => {
    // no-op for dependency
  }, [employees, hourlyRate, hoursSaved]);

  // Services for Refined Dark (6 cards)
  const services = [
    { title: 'Custom AI Agents', desc: 'Intelligent agents that handle complex tasks and decisions autonomously.', icon: '🧠' },
    { title: 'Workflow Automation', desc: 'Streamline operations with automated workflows across your tools.', icon: '⚙️' },
    { title: 'Data Integration', desc: 'Unify your data across systems for a single source of truth.', icon: '🗄️' },
    { title: 'Conversational AI', desc: 'Chatbots and voice interfaces that scale your customer conversations.', icon: '💬' },
    { title: 'Predictive Analytics', desc: 'Turn data into forecasts and recommendations that drive growth.', icon: '📈' },
    { title: 'API Development', desc: 'Custom integrations and APIs that connect your entire stack.', icon: '⚡' }
  ];

  const industries = [
    { icon: '🏥', title: 'Healthcare', desc: 'Patient management, appointment scheduling, and medical records automation' },
    { icon: '🛒', title: 'E-commerce', desc: 'Order processing, inventory management, and customer service automation' },
    { icon: '🏠', title: 'Real Estate', desc: 'Property listings, client management, and automated follow-ups' },
    { icon: '💼', title: 'Professional Services', desc: 'Client onboarding, project tracking, and billing automation' },
    { icon: '🏭', title: 'Manufacturing', desc: 'Supply chain automation, quality control, and production scheduling' },
    { icon: '🎓', title: 'Education', desc: 'Student enrollment, course management, and automated grading' }
  ];

  const tools = [
    { icon: <SiOpenai />, name: 'OpenAI', desc: 'AI for research, content, and automation', link: 'https://openai.com' },
    { icon: <SiN8N />, name: 'n8n', desc: 'Workflow automation platform', link: 'https://n8n.io' },
    { icon: <SiAirtable />, name: 'Airtable', desc: 'Database meets spreadsheet', link: 'https://airtable.com' },
    { icon: <SiSlack />, name: 'Slack', desc: 'Team communication platform', link: 'https://slack.com' },
    { icon: <SiGoogleanalytics />, name: 'Google Analytics', desc: 'Website analytics', link: 'https://analytics.google.com' },
    { icon: <SiGooglecalendar />, name: 'Google Calendar', desc: 'Calendar management', link: 'https://calendar.google.com' },
    { icon: <SiGmail />, name: 'Gmail', desc: 'Email platform', link: 'https://gmail.com' },
    { icon: <SiNotion />, name: 'Notion', desc: 'All-in-one workspace', link: 'https://notion.so' },
    { icon: <SiWhatsapp />, name: 'WhatsApp', desc: 'Messaging platform', link: 'https://whatsapp.com' }
  ];

  const testimonials = [
    {
      quote: 'As the owner of a barber shop, I was thrilled when L² Flows implemented an automated scheduling system with voice commands. Clients can now easily book appointments without waiting on the line, and my calendar is always up-to-date and error-free. This innovation saves me hours of admin work every week and has elevated our service quality.',
      name: 'Ivan B.',
      title: 'Barber Shop Owner',
      timeSaved: '8-10 hours per week'
    },
    {
      quote: 'The automated booking system has transformed our restaurant operations. We went from managing reservations manually to having an AI-powered system that handles everything seamlessly. Our no-show rate decreased significantly, and customer satisfaction is at an all-time high.',
      name: 'Maria S.',
      title: 'Restaurant Manager',
      timeSaved: '6-8 hours per week'
    }
  ];

  // Testimonial rotation state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Calculator state
  const [inquiryValue, setInquiryValue] = useState(500);
  const [missedInquiries, setMissedInquiries] = useState(50);
  const [calculatedRevenue, setCalculatedRevenue] = useState(25000);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Calculator effect
  useEffect(() => {
    const revenue = inquiryValue * missedInquiries;
    setCalculatedRevenue(revenue);
  }, [inquiryValue, missedInquiries]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="new-homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} aria-label="L² Flows - go to top">
            <img src={logo} alt="L² Flows Logo" className="nav-logo-img" />
            <h2>L² Flows</h2>
          </a>
          <div className={`nav-menu ${mobileMenuOpen ? 'nav-menu-active' : ''}`}>
            <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#calculator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="nav-link nav-cta" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
          </div>
          <div className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero — Refined Dark */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI automation that <span className="hero-highlight">scales revenue</span>, not headcount
            </h1>
            <p className="hero-subtitle hero-subtext">
              Turn lost leads into sales with intelligent automation that works 24/7. Never miss another opportunity again.
            </p>
            <div className="hero-buttons">
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => window.open(calendlyUrl, '_blank')}>
                Book a Strategy Call
              </motion.button>
              <motion.button className="btn btn-secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                View Case Studies
              </motion.button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">$4.2M</div>
                <div className="hero-stat-label">Revenue generated</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">60%</div>
                <div className="hero-stat-label">Average cost reduction</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">24/7</div>
                <div className="hero-stat-label">Autonomous operations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">What we build</h2>
          <p className="section-subtitle">Custom automation and AI that scales revenue without scaling headcount.</p>
          <div className="services-grid">
            {services.map((s, i) => (
              <motion.div key={i} className="service-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="service-card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="calculator-section">
        <div className="calculator-panel">
          <h2 className="section-title">ROI Calculator</h2>
          <p className="section-subtitle">See how much you could save with automation.</p>
          <div className="calculator-inputs">
            <div className="calculator-form-group">
              <label>Number of Employees</label>
              <input type="number" min={1} value={employees} onChange={(e) => setEmployees(Number(e.target.value) || 0)} />
            </div>
            <div className="calculator-form-group">
              <label>Avg. Hourly Rate ($)</label>
              <input type="number" min={0} value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value) || 0)} />
            </div>
            <div className="calculator-form-group">
              <label>Hours Saved / Week</label>
              <input type="number" min={0} value={hoursSaved} onChange={(e) => setHoursSaved(Number(e.target.value) || 0)} />
            </div>
          </div>
          <div className="calculator-result-card">
            <div className="calculator-result-icon">📊</div>
            <div className="calculator-result-value">${(annualSavings / 1000).toFixed(0)}K</div>
            <div className="calculator-result-meta">Annual savings</div>
            <div className="calculator-result-meta">${weeklySavings.toLocaleString()} / week</div>
            <div className="calculator-result-meta">${(threeYearSavings / 1000000).toFixed(1)}M over 3 years</div>
          </div>
          <p className="calculator-disclaimer">Estimates based on inputs. Actual results may vary.</p>
          <div style={{ marginTop: 24 }}>
            <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => window.open(calendlyUrl, '_blank')}>
              Schedule a Call
            </motion.button>
          </div>
        </div>
      </section>

      <section id="contact" className="services-section" style={{ paddingTop: 64 }}>
        <div className="container">
          <h2 className="section-title">Get in touch</h2>
          <p className="section-subtitle">Ready to automate your operations? We'd love to hear from you.</p>
          <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => window.open(calendlyUrl, '_blank')}>
            Schedule a Call
          </motion.button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-cta-block">
            <h2>Ready to automate your operations?</h2>
            <p>Book a strategy call and see how L² Flows can scale your revenue without scaling headcount.</p>
            <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => window.open(calendlyUrl, '_blank')}>
              Schedule a Call
            </motion.button>
          </div>
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>L² Flows</h3>
              <p>AI automation that scales revenue, not headcount. You do you.</p>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">AI Agents</a></li>
                <li><a href="#services">Workflow Automation</a></li>
                <li><a href="#services">Data Integration</a></li>
                <li><a href="#services">API Development</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#contact">About</a></li>
                <li><a href="#services">Case Studies</a></li>
                <li><a href="#contact">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <p>© {new Date().getFullYear()} L² Flows. All rights reserved.</p>
            <div className="footer-socials">
              <a href="https://linkedin.com/company/lsquaredflows" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://instagram.com/lsquaredflows" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="mailto:sales@lsquaredflows.agency" aria-label="Email"><FaEnvelope /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Customer Support Chatbot - Preserved from original */}
      <motion.button
        className="chatbot-floating-btn"
        onClick={handleChatbotButtonClick}
        whileHover={{ scale: 1.1, rotate: chatbotOpen ? 0 : 5 }}
        whileTap={{ scale: 0.9 }}
        aria-label={chatbotOpen ? "Close AI Chat" : "Open AI Customer Support Chat"}
      >
        {chatbotOpen ? <FaTimes className="chatbot-icon" /> : <span className="chatbot-icon chatbot-robot">🤖</span>}
        {!chatbotOpen && hasNotification && <span className="chatbot-notification-dot"></span>}
        {!chatbotOpen && <span className="chatbot-pulse"></span>}
      </motion.button>

      {/* Chatbot Widget */}
      {chatbotOpen && (
        <motion.div
          className="chatbot-widget"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
        >
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <FaRobot className="chatbot-header-icon" />
              <div className="chatbot-header-text">
                <h4>L² Flows AI Assistant</h4>
                <span className="chatbot-status">Online</span>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setChatbotOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <div className="chat-message-content">
                  {msg.role === 'assistant' && <FaRobot className="chat-message-icon" />}
                  <p>
                    {formatMessageWithLinks(msg.content)}
                    {msg.timestamp && (
                      <span className="message-timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="chat-message assistant">
                <div className="chat-message-content">
                  <FaRobot className="chat-message-icon" />
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form className="chatbot-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="chatbot-input"
              placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!inputMessage.trim() || isLoading}
            >
              <FaComments />
            </button>
          </form>

          {/* Footer */}
          <div className="chatbot-footer">
            <span className="footer-text">Powered by L² Flows AI</span>
          </div>
        </motion.div>
      )}

      {/* Chatbot Overlay - Click to close */}
      {chatbotOpen && (
        <motion.div
          className="chatbot-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setChatbotOpen(false)}
        />
      )}

      {/* Chatbot Terms Modal */}
      {showTermsModal && (
        <ChatbotTermsModal
          onAccept={handleTermsAccept}
          onCancel={handleTermsCancel}
        />
      )}
    </div>
  );
}

export default NewHomePage;

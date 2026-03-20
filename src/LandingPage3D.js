import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaComments, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight, FaShip, FaHotel, FaCommentDots, FaCogs, FaConciergeBell, FaCar, FaHeartbeat, FaBriefcase, FaCheckCircle, FaMapMarkerAlt, FaClock, FaChevronDown } from 'react-icons/fa';
import { HeroScene, ServicesOrbitScene, DevCycleScene, ProjectsScene } from './components/Scene3D';
import IntroBurst from './components/IntroBurst';
import ChatbotTermsModal from './ChatbotTermsModal';
import './LandingPage3D.css';

/* ─── Scroll-triggered section wrapper ─── */
function RevealSection({ children, className = '', delay = 0, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Main Component ─── */
export default function LandingPage3D() {
  const calendlyUrl = 'https://calendly.com/lsquaredflows/30min';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [expandedCareer, setExpandedCareer] = useState(null);

  // Intro burst state
  const [introPhase, setIntroPhase] = useState('playing'); // 'playing' | 'fading' | 'done'

  const handleIntroComplete = () => {
    setIntroPhase('fading');
    setTimeout(() => setIntroPhase('done'), 800);
  };

  // Services scroll-orbit state
  const servicesWrapRef = useRef(null);
  const [servicesScroll, setServicesScroll] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!servicesWrapRef.current) return;
      const rect = servicesWrapRef.current.getBoundingClientRect();
      const scrollHeight = servicesWrapRef.current.offsetHeight - window.innerHeight;
      const rawProgress = -rect.top / scrollHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));
      setServicesScroll(progress);
      setActiveServiceIdx(Math.min(5, Math.floor(progress * 6)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Process / Development Cycle scroll state
  const processWrapRef = useRef(null);
  const [processScroll, setProcessScroll] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!processWrapRef.current) return;
      const rect = processWrapRef.current.getBoundingClientRect();
      const scrollHeight = processWrapRef.current.offsetHeight - window.innerHeight;
      const rawProgress = -rect.top / scrollHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));
      setProcessScroll(progress);
      setActivePhase(Math.min(4, Math.floor(progress * 5)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Chatbot state (preserved from original)
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! 👋 I\'m your L² Flows assistant.\n\nI can help you with:\n• Our services & pricing\n• Project inquiries\n• Technical questions\n\nWhat would you like to know?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [sessionId] = useState(() => {
    let id = sessionStorage.getItem('chatSessionId');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('chatSessionId', id);
    }
    return id;
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const accepted = localStorage.getItem('chatbot-terms-accepted');
    if (accepted === 'true') setTermsAccepted(true);
  }, []);

  useEffect(() => {
    if (chatbotOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [chatbotOpen, mobileMenuOpen]);

  const handleTermsAccept = () => { localStorage.setItem('chatbot-terms-accepted', 'true'); setTermsAccepted(true); setShowTermsModal(false); setChatbotOpen(true); };
  const handleTermsCancel = () => { setShowTermsModal(false); setChatbotOpen(false); };
  const handleChatbotButtonClick = () => {
    if (!chatbotOpen && !termsAccepted) { setShowTermsModal(true); }
    else { setChatbotOpen(!chatbotOpen); if (!chatbotOpen) setHasNotification(false); }
  };

  const formatMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => part.match(urlRegex) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="chat-link">🔗 Click to view</a>
    ) : <span key={i}>{part}</span>);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    const userMessage = { role: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);
      const response = await fetch('https://lsquaredflows.app.n8n.cloud/webhook/lsquared-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, sessionId }), signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'Sorry, I encountered an error.', timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting right now. Please try again later.', timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  // Projects — click-only navigation
  const projects = [
    { title: 'AI Customer Support Agent', desc: 'Conversational AI chatbot deployed for an e-commerce brand — handles order tracking, returns, FAQs, and live handoff. Reduced support tickets by 64% and cut average response time from 4 hours to under 8 seconds.', icon: <FaCommentDots />, tags: ['AI Chatbot', 'E-commerce', 'NLP'] },
    { title: 'Hotel Self Check-In System', desc: 'Check-in app for a boutique hotel chain — ID scanning, digital key provisioning, upsell prompts, and automated guest communication. Eliminated front-desk queues and reduced check-in time to under 90 seconds.', icon: <FaHotel />, tags: ['Hospitality', 'Mobile App', 'IoT'] },
    { title: 'Rent-a-Car Booking Platform', desc: 'Full-stack web and mobile booking system for a car rental company — real-time fleet availability, online reservations, damage reporting, and Stripe payment integration. Increased online bookings by 3x in the first quarter.', icon: <FaCar />, tags: ['Full-Stack', 'Booking Engine', 'Payments'] },
    { title: 'AI Lead Qualification Bot', desc: 'WhatsApp and web chatbot for a real estate agency — qualifies inbound leads, schedules property viewings, and syncs with CRM. Captured 40% more qualified leads while cutting manual follow-up time by 80%.', icon: <FaRobot />, tags: ['Lead Gen', 'WhatsApp API', 'CRM'] },
    { title: 'Invoice & Expense Automation', desc: 'Workflow automation for a logistics company — AI extracts data from invoices and receipts, routes approvals, syncs with accounting software, and flags anomalies. Saved the finance team 25+ hours per week.', icon: <FaCogs />, tags: ['Automation', 'Document AI', 'Finance'] },
    { title: 'Restaurant AI Concierge', desc: 'AI-powered ordering and reservation assistant for a restaurant group — handles table bookings, menu recommendations, dietary filters, and post-visit feedback via Instagram DM and web chat.', icon: <FaConciergeBell />, tags: ['AI Agent', 'Hospitality', 'Social'] },
    { title: 'Yacht Charter Booking System', desc: 'Booking platform connecting yacht owners with travelers — availability calendar, crew profiles, itinerary builder, marina builders, secure deposits, and multilingual guest communication across the Mediterranean market.', icon: <FaShip />, tags: ['Marketplace', 'Travel Tech', 'Payments'] },
    { title: 'Clinic Appointment Scheduler', desc: 'Patient-facing booking app for a private clinic network — online scheduling, automated SMS reminders, insurance pre-check, and EHR sync. Reduced no-shows by 38% and freed up 15 admin hours weekly.', icon: <FaHeartbeat />, tags: ['HealthTech', 'Scheduling', 'SMS'] },
  ];

  const services = [
    { title: 'Software Development', desc: 'Custom web and enterprise applications built with modern stacks — scalable, secure, and performant.', icon: '💻' },
    { title: 'AI Agents', desc: 'Autonomous AI agents that handle complex tasks, make decisions, and learn from interactions.', icon: '🤖' },
    { title: 'Website & App Design', desc: 'Stunning, conversion-optimized websites and native mobile applications.', icon: '🎨' },
    { title: 'Native Applications', desc: 'iOS and Android apps with seamless UX, offline capability, and native performance.', icon: '📱' },
    { title: 'AI Enterprise Workflows', desc: 'End-to-end workflow automation connecting your entire tool stack with intelligent orchestration.', icon: '⚙️' },
    { title: 'AI Chatbots & Concierge', desc: 'Conversational AI that scales your customer interactions and provides 24/7 intelligent support.', icon: '💬' },
  ];

  const devCycleSteps = [
    { step: '01', title: 'Discovery', desc: 'Deep dive into your business processes, pain points, and growth goals.' },
    { step: '02', title: 'Architecture', desc: 'Blueprint the technical solution — scalable, secure, and future-proof.' },
    { step: '03', title: 'Development', desc: 'Agile sprints with weekly demos — you see progress, not just promises.' },
    { step: '04', title: 'AI Integration', desc: 'Embed intelligence — from chatbots to decision engines to workflow automation.' },
    { step: '05', title: 'Launch & Scale', desc: 'Deploy, monitor, optimize — and scale as your business grows.' },
  ];

  // Smooth scroll handler
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-3d">
      {/* ─── Intro Burst Overlay ─── */}
      {introPhase !== 'done' && (
        <div className={`intro-burst-overlay ${introPhase === 'fading' ? 'fade-out' : ''}`}>
          <IntroBurst onComplete={handleIntroComplete} />
          <div className="intro-burst-text">
            <motion.span
              className="intro-logo-l2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >L²</motion.span>
            <motion.span
              className="intro-logo-flows"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >Flows</motion.span>
          </div>
        </div>
      )}

      {/* ─── Navigation ─── */}
      <nav className="nav-3d">
        <div className="nav-3d-inner">
          <button className="nav-3d-logo" onClick={() => scrollTo('hero')}>
            <span className="logo-l2">L²</span>
            <span className="logo-flows">Flows</span>
          </button>

          <div className={`nav-3d-links ${mobileMenuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollTo('services')}>Services</button>
            <button onClick={() => scrollTo('projects')}>Projects</button>
            <button onClick={() => scrollTo('process')}>Process</button>
            <button onClick={() => scrollTo('careers')}>Careers</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="nav-3d-cta">
              Get Started <FaArrowRight />
            </a>
          </div>

          <button className={`nav-3d-burger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && <div className="nav-3d-overlay" onClick={() => setMobileMenuOpen(false)} />}

      {/* ─── Hero ─── */}
      <section id="hero" className="hero-3d">
        <HeroScene />
        <div className="hero-3d-content">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="hero-3d-tag">Software & AI Agency</p>
            <h1 className="hero-3d-title">
              We Build <span className="gold-text">Intelligent</span> Software
              <br />That Grows Your Business
            </h1>
            <p className="hero-3d-sub">
              From AI-powered applications to enterprise workflow automation — we engineer solutions that convert, scale, and deliver results.
            </p>
            <div className="hero-3d-btns">
              <motion.a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Inquire Demo <FaArrowRight style={{ marginLeft: '6px' }} />
              </motion.a>
              <motion.button className="btn-outline" onClick={() => scrollTo('projects')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                View Our Work
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="hero-3d-stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <div className="stat-item">
              <span className="stat-value"><AnimatedCounter target={20} suffix="+" /></span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-value"><AnimatedCounter target={98} suffix="%" /></span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">AI-Powered Support</span>
            </div>
          </motion.div>
        </div>

        <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ─── Services: Scroll-driven 3D orbit ─── */}
      <div id="services" className="services-orbit-wrap" ref={servicesWrapRef}>
        <div className="services-orbit-sticky">
          {/* Full-screen 3D canvas */}
          <div className="services-orbit-canvas">
            <ServicesOrbitScene scrollProgress={servicesScroll} />
          </div>

          {/* Overlay: section heading */}
          <motion.div
            className="services-orbit-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: servicesScroll < 0.05 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-tag">What We Do</p>
            <h2 className="section-heading">Full-Spectrum <span className="gold-text">Digital Solutions</span></h2>
            <p className="section-desc">Scroll to explore our services</p>
            <motion.div className="scroll-hint" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <span>↓</span>
            </motion.div>
          </motion.div>

          {/* Active service card overlay */}
          {services.map((s, i) => (
            <motion.div
              key={i}
              className={`services-orbit-card ${activeServiceIdx === i ? 'active' : ''}`}
              initial={false}
              animate={{
                opacity: activeServiceIdx === i ? 1 : 0,
                x: activeServiceIdx === i ? 0 : (i < activeServiceIdx ? -40 : 40),
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="services-orbit-card-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}

          {/* Progress dots */}
          <div className="services-orbit-dots">
            {services.map((_, i) => (
              <div key={i} className={`orbit-dot ${activeServiceIdx === i ? 'active' : ''}`} />
            ))}
          </div>

          {/* Progress bar */}
          <div className="services-orbit-progress">
            <div className="services-orbit-progress-fill" style={{ height: `${servicesScroll * 100}%` }} />
          </div>
        </div>
      </div>

      {/* ─── Projects ─── */}
      <RevealSection id="projects" className="projects-3d">
        <ProjectsScene />
        <div className="section-container projects-3d-inner">
          <p className="section-tag">Our Work</p>
          <h2 className="section-heading">Projects That <span className="gold-text">Deliver Results</span></h2>
          <p className="section-desc">Click any project to explore what we've built.</p>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <motion.button
                key={i}
                className={`project-card ${activeProject === i ? 'active' : ''}`}
                onClick={() => setActiveProject(i)}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <div className="project-card-icon">{p.icon}</div>
                <h4 className="project-card-title">{p.title}</h4>
                <div className="project-card-tags">
                  {p.tags.map((t, j) => <span key={j} className="project-card-tag">{t}</span>)}
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              className="project-detail-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="project-detail-left">
                <div className="project-detail-icon-lg">{projects[activeProject].icon}</div>
                <div className="project-detail-number">{String(activeProject + 1).padStart(2, '0')}</div>
              </div>
              <div className="project-detail-right">
                <h3>{projects[activeProject].title}</h3>
                <p>{projects[activeProject].desc}</p>
                <div className="project-tags">
                  {projects[activeProject].tags.map((t, j) => <span key={j} className="project-tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </RevealSection>

      {/* ─── Development Lifecycle: Scroll-driven 3D ─── */}
      <div id="process" className="process-orbit-wrap" ref={processWrapRef}>
        <div className="process-orbit-sticky">
          {/* Full-screen 3D canvas */}
          <div className="process-orbit-canvas">
            <DevCycleScene scrollProgress={processScroll} activePhase={activePhase} />
          </div>

          {/* Header — visible at start */}
          <motion.div
            className="process-orbit-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: processScroll < 0.05 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-tag-light">Our Process</p>
            <h2 className="process-orbit-title">The <span className="gold-text">Development Lifecycle</span></h2>
            <p className="process-orbit-subtitle">Scroll to journey through our 5-phase methodology</p>
            <motion.div className="scroll-hint-dark" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <span>↓</span>
            </motion.div>
          </motion.div>

          {/* Phase cards — one visible at a time */}
          {devCycleSteps.map((s, i) => (
            <motion.div
              key={i}
              className={`process-phase-card ${activePhase === i ? 'active' : ''}`}
              initial={false}
              animate={{
                opacity: activePhase === i ? 1 : 0,
                y: activePhase === i ? 0 : (i < activePhase ? -30 : 30),
                scale: activePhase === i ? 1 : 0.95,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="process-phase-num">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="process-phase-indicator">
                {devCycleSteps.map((_, j) => (
                  <div key={j} className={`phase-pip ${j === i ? 'active' : j < i ? 'past' : ''}`} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Large step number background */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              className="process-big-num"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.06, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              {devCycleSteps[activePhase]?.step}
            </motion.div>
          </AnimatePresence>

          {/* Right-side progress */}
          <div className="process-orbit-progress">
            <div className="process-orbit-progress-fill" style={{ height: `${processScroll * 100}%` }} />
          </div>
          <div className="process-orbit-phase-label">
            {devCycleSteps[activePhase]?.title}
          </div>
        </div>
      </div>

      {/* ─── Careers ─── */}
      <RevealSection id="careers" className="careers-section">
        <div className="section-container">
          <p className="section-tag">Join Our Team</p>
          <h2 className="section-heading">We're <span className="gold-text">Hiring</span></h2>
          <p className="section-desc">Join a fast-growing AI & software agency and help shape the future of intelligent automation.</p>

          <div className="careers-grid">
            <motion.div
              className={`career-card ${expandedCareer === 'sales' ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="career-card-clickable" onClick={() => setExpandedCareer(expandedCareer === 'sales' ? null : 'sales')}>
                <div className="career-card-header">
                  <div className="career-card-icon"><FaBriefcase /></div>
                  <div className="career-badge">Now Hiring</div>
                </div>
                <h3>Sales Executive</h3>
                <p className="career-tagline">Drive revenue growth by connecting businesses with transformative AI solutions.</p>

                <div className="career-meta">
                  <span><FaClock /> Full-Time</span>
                  <span><FaMapMarkerAlt /> Remote / Hybrid</span>
                </div>

                <div className="career-expand-hint">
                  <span>{expandedCareer === 'sales' ? 'Hide details' : 'View full description'}</span>
                  <motion.span animate={{ rotate: expandedCareer === 'sales' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown />
                  </motion.span>
                </div>
              </div>

              <AnimatePresence>
                {expandedCareer === 'sales' && (
                  <motion.div
                    className="career-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="career-details-inner">
                      <h4>What You'll Do</h4>
                      <ul>
                        <li><FaCheckCircle /> Identify and close high-value enterprise deals in AI automation, SaaS, and custom software verticals</li>
                        <li><FaCheckCircle /> Build and manage a pipeline of qualified B2B leads through outbound prospecting, networking, and strategic partnerships</li>
                        <li><FaCheckCircle /> Conduct product demos and discovery calls, translating technical capabilities into business outcomes</li>
                        <li><FaCheckCircle /> Collaborate with the delivery team to scope proposals, define project timelines, and ensure seamless handoffs</li>
                        <li><FaCheckCircle /> Represent L² Flows at industry events, trade shows, and conferences to expand brand visibility</li>
                      </ul>

                      <h4>Requirements</h4>
                      <ul>
                        <li><FaCheckCircle /> 3+ years of B2B sales experience, preferably in technology, SaaS, or professional services</li>
                        <li><FaCheckCircle /> Excellent communication, negotiation, and relationship-building skills</li>
                        <li><FaCheckCircle /> Experience with CRM tools (HubSpot, Salesforce, or equivalent) and modern sales methodologies</li>
                        <li><FaCheckCircle /> Self-starter mentality — comfortable in a fast-paced, results-driven startup environment</li>
                      </ul>

                      <h4>What We Offer</h4>
                      <ul>
                        <li><FaCheckCircle /> Competitive base salary + uncapped commission structure</li>
                        <li><FaCheckCircle /> Remote-first flexibility with optional hybrid workspace</li>
                        <li><FaCheckCircle /> Early-stage equity opportunity — grow with the company</li>
                        <li><FaCheckCircle /> Work alongside a world-class engineering and AI team</li>
                        <li><FaCheckCircle /> Professional development budget and conference sponsorship</li>
                      </ul>

                      <motion.a
                        href="mailto:lsquaredflows@gmail.com?subject=Sales%20Executive%20Application"
                        className="btn-gold career-apply-btn"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Apply Now <FaArrowRight />
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ─── CTA Banner ─── */}
      <RevealSection className="cta-3d">
        <div className="section-container cta-3d-inner">
          <h2>Ready to build something <span className="gold-text">extraordinary</span>?</h2>
          <p>Let's discuss how AI and custom software can transform your business.</p>
          <div className="cta-3d-btns">
            <motion.a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Inquire Demo <FaArrowRight />
            </motion.a>
          </div>
        </div>
      </RevealSection>

      {/* ─── Contact / Footer ─── */}
      <footer id="contact" className="footer-3d">
        <div className="section-container">
          <div className="footer-3d-grid">
            <div className="footer-3d-brand">
              <div className="footer-logo">
                <span className="logo-l2">L²</span>
                <span className="logo-flows">Flows</span>
              </div>
              <p>Software & AI Agency building intelligent solutions that scale your business.</p>
              <div className="footer-socials">
                <a href="https://linkedin.com/company/lsquaredflows" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://instagram.com/lsquaredflows" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href="mailto:lsquaredflows@gmail.com" aria-label="Email"><FaEnvelope /></a>
              </div>
            </div>

            <div className="footer-3d-links">
              <h4>Services</h4>
              <button onClick={() => scrollTo('services')}>Software Development</button>
              <button onClick={() => scrollTo('services')}>AI Agents</button>
              <button onClick={() => scrollTo('services')}>Native Apps</button>
              <button onClick={() => scrollTo('services')}>AI Workflows</button>
            </div>

            <div className="footer-3d-links">
              <h4>Company</h4>
              <button onClick={() => scrollTo('projects')}>Projects</button>
              <button onClick={() => scrollTo('process')}>Our Process</button>
              <button onClick={() => scrollTo('careers')}>Careers</button>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>

            <div className="footer-3d-links">
              <h4>Get in Touch</h4>
              <a href="mailto:lsquaredflows@gmail.com">lsquaredflows@gmail.com</a>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
            </div>
          </div>

          <div className="footer-3d-bottom">
            <p>&copy; {new Date().getFullYear()} L² Flows. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ─── Chatbot (Preserved) ─── */}
      {showTermsModal && <ChatbotTermsModal onAccept={handleTermsAccept} onCancel={handleTermsCancel} />}

      <AnimatePresence>
        {chatbotOpen && (
          <motion.div className="chatbot-panel" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}>
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <FaRobot className="chatbot-avatar" />
                <div>
                  <strong>L² Assistant</strong>
                  <span className="chatbot-status">Online</span>
                </div>
              </div>
              <button onClick={() => setChatbotOpen(false)} className="chatbot-close" aria-label="Close"><FaTimes /></button>
            </div>

            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chatbot-msg ${m.role}`}>
                  <div className="chatbot-msg-bubble">{formatMessageWithLinks(m.content)}</div>
                </div>
              ))}
              {isLoading && <div className="chatbot-msg assistant"><div className="chatbot-msg-bubble typing"><span /><span /><span /></div></div>}
              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input" onSubmit={sendMessage}>
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Type your message..." disabled={isLoading} />
              <button type="submit" disabled={isLoading || !inputMessage.trim()}>Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button className={`chatbot-fab ${hasNotification ? 'notify' : ''}`} onClick={handleChatbotButtonClick} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} aria-label="Chat">
        {chatbotOpen ? <FaTimes /> : <FaComments />}
      </motion.button>
    </div>
  );
}

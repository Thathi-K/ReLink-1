import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Lucide Icons - Professional selection
import { 
  ChevronRight, Users, Briefcase, Building, TrendingUp, 
  Shield, Target, Award, Globe, MessageCircle, Phone, 
  Mail, MapPin, Facebook, Linkedin, Twitter, Menu, X,
  CheckCircle, Star, Zap, FileText, GraduationCap, Search,
  UserCheck, Calendar, Video, BookOpen, Lock, Eye,
  CreditCard, DollarSign, PieChart, LineChart, Activity,
  Trophy, Medal, Flag, Map, Navigation, Compass, Check,
  Plus, Play, RefreshCw, Volume2, Camera, Headphones,
  PhoneCall, Voicemail, Sparkles, Rocket, UsersRound,
  Building2, Target as TargetArrow, HeartHandshake,
  BarChart3, DownloadCloud, UploadCloud, Bell, Settings,
  LogOut, Home, Info, HelpCircle, ShieldCheck, Clock,
  ThumbsUp, TrendingUp as TrendingUpIcon, ArrowRight,
  ArrowUpRight, Users as UsersIcon, CircleDollarSign,
  Building as BuildingIcon, Target as TargetIcon,
  Award as AwardIcon, Globe as GlobeIcon, Send,
  FileDown
} from 'lucide-react';

// Components
import ReLinkLogo from '../../assets/RelinkLOGO.jpeg';
import BotServiceLogo from '../../assets/RelinkLOGO.jpeg';
import IntroVideo from '../../assets/intro-video.mp4';

const LandingPage = () => {
  const navigate = useNavigate();
  
  // State Management
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [stats, setStats] = useState({
    members: 0,
    jobs: 0,
    companies: 0,
    successRate: 0,
    communities: 0,
    trainingHours: 0
  });
  const [botActive, setBotActive] = useState(false);
  const [botMessages, setBotMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to RE-Link! I'm your assistant. We connect rehabilitated individuals with meaningful employment opportunities. How can I help you today?", 
      fromBot: true,
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [botLogoHover, setBotLogoHover] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [particles, setParticles] = useState([]);
  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    jobs: 0,
    companies: 0,
    successRate: 0,
    communities: 0,
    trainingHours: 0
  });
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Data Arrays
  const heroTitles = [
    "Create Your Second Chance",
    "Rebuild Your Life",
    "Transforming The Future",
    "Your Journey to Renewal",
    "Empowering The Community"
  ];

  const titleColors = [
    '#10b981', // Emerald
    '#047857', // Deep Emerald
    '#065f46', // Forest Green
    '#059669', // Medium Emerald
    '#34d399'  // Light Emerald
  ];

  // Features Data
  const features = [
    {
      icon: <TargetArrow size={40} className="feature-icon-svg" />,
      title: 'Smart Job Matching',
      description: 'AI-powered algorithm matches skills with verified employment opportunities across South Africa.',
      stats: '94% Accuracy Rate',
      color: '#10b981'
    },
    {
      icon: <GraduationCap size={40} className="feature-icon-svg" />,
      title: 'Skills Development',
      description: 'Access to certified training programs and skill enhancement courses for professional growth.',
      stats: '2,850+ Training Hours',
      color: '#047857'
    },
    {
      icon: <ShieldCheck size={40} className="feature-icon-svg" />,
      title: 'Secure Verification',
      description: 'End-to-end encrypted verification ensuring privacy and security for all members.',
      stats: '100% Secure Platform',
      color: '#065f46'
    },
    {
      icon: <UsersRound size={40} className="feature-icon-svg" />,
      title: 'Mentorship Network',
      description: 'Connect with experienced mentors and supportive communities nationwide.',
      stats: '53 Active Communities',
      color: '#059669'
    },
    {
      icon: <FileText size={40} className="feature-icon-svg" />,
      title: 'Career Coaching',
      description: 'Professional CV building and interview preparation with certified career coaches.',
      stats: '89% Success Rate',
      color: '#34d399'
    },
    {
      icon: <Building2 size={40} className="feature-icon-svg" />,
      title: 'Employer Partnerships',
      description: 'Direct connections with 215+ verified employers committed to second chances.',
      stats: 'Trusted Nationwide',
      color: '#064e3b'
    }
  ];

  // Success Stories
  const successStories = [
    {
      name: 'Thabo M.',
      role: 'Senior Welder',
      company: 'Industrial Solutions SA',
      story: 'After 7 years, RE-Link helped me rebuild. Today I lead a team of 12 welders.',
      duration: '3 years employed',
      avatar: 'TM',
      verified: true
    },
    {
      name: 'Sarah K.',
      role: 'HR Manager',
      company: 'Retail Group Africa',
      story: 'Hiring through RE-Link brought dedicated talent. The support system is exceptional.',
      duration: '2 years partnership',
      avatar: 'SK',
      verified: true
    },
    {
      name: 'Nomsa D.',
      role: 'Office Manager',
      company: 'Financial Services Ltd',
      story: 'The mentorship program gave me confidence. Assistant to manager in 18 months.',
      duration: '1.5 years employed',
      avatar: 'ND',
      verified: true
    }
  ];

  // Stats Data - Updated with REALISTIC animated values
  const statCards = [
    { icon: <Users size={40} />, value: animatedStats.members, label: 'Members Served', change: '+28%' },
    { icon: <Briefcase size={40} />, value: animatedStats.jobs, label: 'Jobs Secured', change: '+35%' },
    { icon: <Building size={40} />, value: animatedStats.companies, label: 'Partner Companies', change: '+42' },
    { icon: <Target size={40} />, value: `${animatedStats.successRate}%`, label: 'Success Rate', change: '+12%' },
    { icon: <UsersRound size={40} />, value: animatedStats.communities, label: 'Support Groups', change: '+18' },
    { icon: <Clock size={40} />, value: animatedStats.trainingHours, label: 'Training Hours', change: '+850/m' }
  ];

  // Refs
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const chatbotRef = useRef(null);
  const videoRef = useRef(null);

  // Title Rotation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Particle Animation
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1
    }));
    setParticles(newParticles);
  }, []);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats Animation - Updated with REALISTIC figures
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const targetStats = {
      members: 3426, // Realistic: 3,426 members
      jobs: 1845,    // Realistic: 1,845 jobs secured
      companies: 247, // Realistic: 247 partner companies
      successRate: 94, // Realistic: 94% success rate
      communities: 65, // Realistic: 65 support groups
      trainingHours: 2850 // Realistic: 2,850 training hours
    };

    Object.keys(targetStats).forEach((stat) => {
      let start = 0;
      const end = targetStats[stat];
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeProgress * end);

        setAnimatedStats(prev => ({
          ...prev,
          [stat]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  };

  // Bot Functionality
  const handleBotMessage = (message) => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = { 
      id: Date.now(), 
      text: message, 
      fromBot: false,
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, newUserMessage]);

    // Bot response
    setTimeout(() => {
      let response = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "Hello! Welcome to RE-Link. I can help you with registration, job opportunities, employer partnerships, or answer questions about our platform. What would you like to know?";
      } else if (lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
        response = "Click the 'Register Now' button at the top of the page. You'll need: Valid ID, Proof of rehabilitation completion, and contact information. The process takes about 10 minutes.";
      } else if (lowerMessage.includes('job') || lowerMessage.includes('employment')) {
        response = "We have 1,845+ active opportunities. After registration, our AI will match you with suitable positions. Popular sectors: Construction, Retail, Manufacturing, Hospitality, and Administration.";
      } else if (lowerMessage.includes('employer') || lowerMessage.includes('hire')) {
        response = "Employers benefit from dedicated talent, reduced recruitment costs, and B-BBEE points. Click 'For Employers' in the navigation to schedule a consultation.";
      } else if (lowerMessage.includes('support')) {
        response = "We provide 24/7 support: Helpline (0800-123-456), Email support, In-person counseling at our 9 provincial offices, and community mentorship programs.";
      } else {
        response = "I understand you're asking about employment opportunities. I can help with registration, job matching, employer partnerships, or support services. What specific information do you need?";
      }

      const botResponse = { 
        id: Date.now() + 1, 
        text: response, 
        fromBot: true,
        timestamp: new Date()
      };
      setBotMessages(prev => [...prev, botResponse]);
      
      // Scroll to bottom after response
      setTimeout(() => {
        if (chatbotRef.current) {
          chatbotRef.current.scrollTop = chatbotRef.current.scrollHeight;
        }
      }, 100);
    }, 1000);

    setUserInput('');
  };

  const quickReplies = [
    "How to register?",
    "Find jobs near me",
    "Employer benefits",
    "Training programs",
    "Contact support",
    "Success stories"
  ];

  // Navigation Handlers
  const handleRegister = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleWatchIntro = () => {
    setIsVideoModalOpen(true);
  };

  const handleViewBrochure = () => {
    setIsBrochureModalOpen(true);
  };

  // Bot Logo Handler
  const handleBotLogoClick = () => {
    setBotActive(!botActive);
  };

  // Handle video play
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-spinner">
            <div className="spinner-ring"></div>
            <img 
              src={ReLinkLogo} 
              alt="RE-Link" 
              className="loading-logo"
              style={{ transform: `scale(${1 + Math.sin(Date.now() / 500) * 0.1})` }}
            />
          </div>
          <div className="loading-text">
            <h2>Building Bridges to Brighter Futures</h2>
            <p>Loading your pathway to second chances...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Navigation - Hidden by default, shows on hover or scroll */}
      <nav 
        className={`navbar ${isNavHovered || isScrolled ? 'active' : ''}`}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        <div className="nav-container">
          <div 
            className="logo-container"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`logo-glow ${logoHover ? 'active' : ''}`}></div>
            <img 
              src={ReLinkLogo} 
              alt="RE-Link Logo" 
              className={`logo-image ${logoHover ? 'hover' : ''}`}
            />
            <div className="logo-text">
              <h1>RE-LINK</h1>
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#stats">Impact</a></li>
              <li><a href="#stories">Success Stories</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            
            <div className="nav-actions">
              <button className="btn-signin" onClick={handleSignIn}>
                <LogOut size={18} />
                <span>Sign In</span>
              </button>
              <button className="btn-register" onClick={handleRegister}>
                <UserCheck size={18} />
                <span>Register Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-background">
          {particles.map((particle) => (
            <div 
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.id * 0.2}s`,
                animationDuration: `${particle.speed * 3}s`
              }}
            />
          ))}
          <div className="gradient-mesh"></div>
        </div>

        <div className="hero-content">
          {/* Larger Logo with No Slogan */}
          <div 
            className="logo-container-main"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`logo-glow-main ${logoHover ? 'active' : ''}`}></div>
            <img 
              src={ReLinkLogo} 
              alt="RE-Link Logo" 
              className={`logo-image-main ${logoHover ? 'hover' : ''}`}
            />
            <div className="logo-text-main">
              <h1>RE-LINK</h1>
            </div>
          </div>

          <div className="hero-badge">
            <Sparkles size={16} />
            <span>South Africa's Leading Reintegration Platform</span>
          </div>

          {/* VERTICAL TITLE LAYOUT - Single line, bigger text */}
          <div className="hero-title-container-vertical">
            <div className="title-static-vertical">Empowering</div>
            <div className="title-animated-container-vertical">
              {heroTitles.map((title, index) => (
                <div
                  key={index}
                  className={`title-slide-vertical ${index === currentTitleIndex ? 'active' : ''}`}
                  style={{ color: titleColors[index] }}
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="title-indicator-vertical">
              {heroTitles.map((_, index) => (
                <div 
                  key={index}
                  className={`dot-vertical ${index === currentTitleIndex ? 'active' : ''}`}
                  onClick={() => setCurrentTitleIndex(index)}
                />
              ))}
            </div>
          </div>

          <p className="hero-subtitle">
            A revolutionary South African platform connecting rehabilitated individuals 
            with meaningful employment opportunities, skills development, and community 
            support for sustainable reintegration.
          </p>

          {/* Updated 4-Button Layout */}
          <div className="hero-actions">
            <button className="btn-primary" onClick={handleRegister}>
              <Rocket size={20} />
              <span>Start Your Journey</span>
              <ArrowRight size={18} />
              <div className="btn-shine"></div>
            </button>
            <button className="btn-secondary" onClick={handleWatchIntro}>
              <Play size={20} />
              <span>Watch Introduction</span>
            </button>
            <button className="btn-tertiary" onClick={handleViewBrochure}>
              <FileDown size={20} />
              <span>View Brochure</span>
            </button>
            <button className="btn-quaternary" onClick={handleSignIn}>
              <LogOut size={20} />
              <span>Member Sign In</span>
            </button>
          </div>

          <div className="hero-stats-preview">
            {statCards.slice(0, 4).map((stat, index) => (
              <div key={index} className="stat-preview">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Explore Opportunities</span>
        </div>
      </section>

      {/* Enhanced Stats Section with Line Graph */}
      <section id="stats" className="stats-section" ref={statsRef}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <TrendingUpIcon size={20} />
              <span>Real Impact, Measurable Results</span>
            </div>
            <h2 className="section-title">
              Transforming <span className="highlight">Lives</span> Across South Africa
            </h2>
            <p className="section-subtitle">
              Since 2020, we've created pathways to employment and empowerment
            </p>
          </div>

          <div className="stats-grid">
            {statCards.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="stat-card-icon">{stat.icon}</div>
                <div className="stat-card-content">
                  <h3 className="stat-number">
                    {statsVisible ? stat.value : '0'}
                    {stat.label === 'Success Rate' && '%'}
                  </h3>
                  <p className="stat-desc">{stat.label}</p>
                  <div className="stat-trend">
                    <TrendingUp size={16} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="stat-wave"></div>
              </div>
            ))}
          </div>

          {/* Enhanced Animated Line Graph */}
          <div className="line-graph-section">
            <h3 className="graph-title">Monthly Progress Overview (2024)</h3>
            <div className="graph-comparison">
              <div className="graph-container-line">
                <div className="graph-header">
                  <div className="graph-header-item">
                    <div className="graph-bullet" style={{ background: '#10b981' }}></div>
                    <span>Job Placements</span>
                  </div>
                  <div className="graph-header-item">
                    <div className="graph-bullet" style={{ background: '#34d399' }}></div>
                    <span>Training Completions</span>
                  </div>
                  <div className="graph-header-item">
                    <div className="graph-bullet" style={{ background: '#fbbf24' }}></div>
                    <span>Success Rate %</span>
                  </div>
                </div>
                
                <div className="graph-wrapper">
                  <div className="graph-y-axis">
                    <span>200</span>
                    <span>150</span>
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                  </div>
                  
                  <div className="graph-content">
                    <svg className="line-graph" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
                      {/* Grid Lines */}
                      <line x1="0" y1="60" x2="800" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="120" x2="800" y2="120" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="180" x2="800" y2="180" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="240" x2="800" y2="240" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                      
                      {/* Job Placements Line (Emerald) */}
                      <path 
                        d="M50,240 L150,180 L250,120 L350,60 L450,100 L550,80 L650,40" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3"
                        className="line-animation"
                        strokeLinecap="round"
                      />
                      
                      {/* Training Completions Line (Light Emerald) */}
                      <path 
                        d="M50,220 L150,160 L250,100 L350,80 L450,60 L550,100 L650,60" 
                        fill="none" 
                        stroke="#34d399" 
                        strokeWidth="3"
                        className="line-animation"
                        strokeLinecap="round"
                        style={{ animationDelay: '0.2s' }}
                      />
                      
                      {/* Success Rate Line (Gold) */}
                      <path 
                        d="M50,200 L150,140 L250,80 L350,100 L450,80 L550,120 L650,80" 
                        fill="none" 
                        stroke="#fbbf24" 
                        strokeWidth="3"
                        className="line-animation"
                        strokeLinecap="round"
                        style={{ animationDelay: '0.4s' }}
                      />
                      
                      {/* Data Points */}
                      {[
                        { x: 50, y: 240, value: '45' },
                        { x: 150, y: 180, value: '112' },
                        { x: 250, y: 120, value: '156' },
                        { x: 350, y: 60, value: '198' },
                        { x: 450, y: 100, value: '164' },
                        { x: 550, y: 80, value: '185' },
                        { x: 650, y: 40, value: '210' }
                      ].map((point, i) => (
                        <g key={i} className="data-point">
                          <circle 
                            cx={point.x} 
                            cy={point.y} 
                            r="5" 
                            fill="#10b981"
                            className="point-animation"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                          <text 
                            x={point.x} 
                            y={point.y - 15} 
                            textAnchor="middle" 
                            fill="#10b981" 
                            fontSize="12" 
                            fontWeight="600"
                            className="value-animation"
                            style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                          >
                            {point.value}
                          </text>
                        </g>
                      ))}
                    </svg>
                    
                    <div className="graph-x-axis">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                        <div key={month} className="x-axis-label">
                          <span>{month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="graph-stats">
                <div className="graph-stat-card">
                  <div className="stat-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stat-content">
                    <h4>78% Growth</h4>
                    <p>Year-over-year increase in placements</p>
                  </div>
                </div>
                <div className="graph-stat-card">
                  <div className="stat-icon">
                    <Target size={24} />
                  </div>
                  <div className="stat-content">
                    <h4>94% Accuracy</h4>
                    <p>Job matching success rate</p>
                  </div>
                </div>
                <div className="graph-stat-card">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-content">
                    <h4>3.4K+ Members</h4>
                    <p>Active platform users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Updated Icons */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <Sparkles size={20} />
              <span>Comprehensive Support Ecosystem</span>
            </div>
            <h2 className="section-title">
              Your Pathway to <span className="highlight">Success</span>
            </h2>
            <p className="section-subtitle">
              Everything you need for successful reintegration and career growth
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${index === activeFeature ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-glow" style={{ background: feature.color }}></div>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-stats">
                  <div className="stats-tag" style={{ background: feature.color }}>
                    <Check size={14} />
                    <span>{feature.stats}</span>
                  </div>
                </div>
                <div className="feature-hover">
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="stories-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <Trophy size={20} />
              <span>Real Stories, Real Impact</span>
            </div>
            <h2 className="section-title">
              Transforming <span className="highlight">Lives</span> Every Day
            </h2>
            <p className="section-subtitle">
              Hear from those who have successfully rebuilt their lives through RE-Link
            </p>
          </div>

          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-header">
                  <div className="story-avatar">
                    <div className="avatar-initials">{story.avatar}</div>
                    {story.verified && <div className="verified-badge"><Check size={12} /></div>}
                  </div>
                  <div className="story-info">
                    <h3>{story.name}</h3>
                    <p>{story.role}</p>
                    <div className="story-company">
                      <Building size={12} />
                      <span>{story.company}</span>
                    </div>
                  </div>
                </div>
                <div className="story-content">
                  <p>"{story.story}"</p>
                </div>
                <div className="story-footer">
                  <div className="story-duration">
                    <Clock size={14} />
                    <span>{story.duration}</span>
                  </div>
                  <button className="story-connect">
                    <MessageCircle size={14} />
                    <span>Connect</span>
                  </button>
                </div>
                <div className="story-quote">
                  <QuoteIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with realistic numbers */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <div className="cta-badge">
              <Rocket size={24} />
              <span>Ready to Begin?</span>
            </div>
            <h2 className="cta-title">
              Join <span className="highlight">3,426+</span> Members Who Found Their Second Chance
            </h2>
            <p className="cta-subtitle">
              Start your journey today. Registration takes less than 10 minutes and opens 
              doors to employment, training, and community support.
            </p>
            
            <div className="cta-actions">
              <button className="cta-primary" onClick={handleRegister}>
                <UserCheck size={20} />
                <span>Register for Free</span>
                <ArrowRight size={18} />
              </button>
              <button className="cta-secondary" onClick={handleSignIn}>
                <LogOut size={20} />
                <span>Existing Member Sign In</span>
              </button>
            </div>

            <div className="cta-features">
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>No Registration Fees</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>24/7 Support Available</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Nationwide Opportunities</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Government Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
                <div className="footer-logo-text">
                  <h3>RE-LINK</h3>
                  <p>Second Chances, Real Connections</p>
                </div>
              </div>
              <p className="footer-description">
                Empowering rehabilitated individuals across South Africa through 
                employment, mentorship, and community reintegration since 2020.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link"><Facebook size={20} /></a>
                <a href="#" className="social-link"><Linkedin size={20} /></a>
                <a href="#" className="social-link"><Twitter size={20} /></a>
                <a href="#" className="social-link"><InstagramIcon size={20} /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Our Services</a></li>
                <li><a href="#stats">Impact Report</a></li>
                <li><a href="#stories">Success Stories</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Training Materials</a></li>
                <li><a href="#">Employer Portal</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    <strong>Helpline</strong>
                    <span>0800 123 456</span>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <div>
                    <strong>Email</strong>
                    <span>support@re-link.co.za</span>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <div>
                    <strong>Head Office</strong>
                    <span>123 Hope Street, Johannesburg, 2000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="certifications">
              <div className="cert-badge">
                <Shield size={16} />
                <span>NPO Registered</span>
              </div>
              <div className="cert-badge">
                <Award size={16} />
                <span>B-BBEE Level 1</span>
              </div>
              <div className="cert-badge">
                <CheckCircle size={16} />
                <span>GDPR Compliant</span>
              </div>
            </div>
            <p className="copyright">
              © 2024 RE-LINK. All rights reserved. Building a better South Africa through second chances.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {/* Video Introduction Modal */}
      {isVideoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Welcome to RE-Link</h3>
              <button className="modal-close" onClick={() => setIsVideoModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="video-container">
                <video 
                  ref={videoRef}
                  controls
                  className="intro-video"
                  poster="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                >
                  <source src={IntroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="modal-description">
                <h4>About Our Platform</h4>
                <p>RE-Link is dedicated to connecting rehabilitated individuals with meaningful employment opportunities across South Africa. Our comprehensive platform provides job matching, skills development, mentorship, and community support.</p>
                <div className="video-details">
                  <div className="video-detail">
                    <Clock size={16} />
                    <span>Duration: 3:45</span>
                  </div>
                  <div className="video-detail">
                    <Calendar size={16} />
                    <span>Updated: January 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brochure Modal */}
      {isBrochureModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBrochureModalOpen(false)}>
          <div className="modal-content brochure-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>RE-Link Brochure</h3>
              <button className="modal-close" onClick={() => setIsBrochureModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="brochure-content">
                <div className="brochure-cover">
                  <div className="brochure-logo">
                    <img src={ReLinkLogo} alt="RE-Link" />
                  </div>
                  <h2>RE-LINK</h2>
                  <p className="brochure-tagline">Second Chances, Real Connections</p>
                </div>
                
                <div className="brochure-section">
                  <h4><TargetIcon size={20} /> Our Vision</h4>
                  <p>To create a South Africa where every rehabilitated individual has equal access to meaningful employment, dignity, and the opportunity to contribute positively to society.</p>
                </div>
                
                <div className="brochure-section">
                  <h4><AwardIcon size={20} /> Our Mission</h4>
                  <p>To bridge the gap between rehabilitation and reintegration by providing comprehensive employment solutions, skills development, and community support that empowers individuals to rebuild their lives with dignity and purpose.</p>
                </div>
                
                <div className="brochure-section">
                  <h4><GlobeIcon size={20} /> Core Values</h4>
                  <ul>
                    <li><Check size={16} /> <strong>Empathy:</strong> Understanding every individual's unique journey</li>
                    <li><Check size={16} /> <strong>Integrity:</strong> Operating with transparency and honesty</li>
                    <li><Check size={16} /> <strong>Inclusion:</strong> Creating opportunities for all</li>
                    <li><Check size={16} /> <strong>Sustainability:</strong> Building lasting solutions</li>
                    <li><Check size={16} /> <strong>Excellence:</strong> Delivering quality services</li>
                  </ul>
                </div>
                
                <div className="brochure-download">
                  <button className="download-btn">
                    <DownloadCloud size={20} />
                    <span>Download Full Brochure (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bot Service Logo Button - Bottom Right */}
      <div 
        className={`bot-service-logo ${botActive ? 'active' : ''}`}
        onMouseEnter={() => setBotLogoHover(true)}
        onMouseLeave={() => setBotLogoHover(false)}
        onClick={handleBotLogoClick}
      >
        <div className={`bot-logo-glow ${botLogoHover ? 'active' : ''}`}></div>
        <img 
          src={BotServiceLogo} 
          alt="RE-Link Assistant" 
          className={`bot-logo-image ${botLogoHover ? 'hover' : ''}`}
        />
        <div className="bot-logo-badge">
          <MessageCircle size={16} />
        </div>
        <div className="bot-logo-tooltip">
          Click to chat with our assistant
        </div>
      </div>

      {/* Enhanced Bot Service */}
      <div className={`chatbot-container ${botActive ? 'active' : ''}`}>
        <div className="chatbot-header" onClick={() => setBotActive(!botActive)}>
          <div className="bot-avatar">
            <MessageCircle size={24} />
            <div className="bot-status"></div>
          </div>
          <div className="bot-info">
            <h4>RE-Link Assistant</h4>
            <p>Always here to help</p>
          </div>
          <div className="bot-toggle">
            {botActive ? <ChevronRight size={20} /> : <MessageCircle size={20} />}
          </div>
        </div>

        <div className="chatbot-messages" ref={chatbotRef}>
          {botMessages.map((msg) => (
            <div key={msg.id} className={`message ${msg.fromBot ? 'bot' : 'user'}`}>
              <div className="message-content">{msg.text}</div>
              <div className="message-time">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              className="quick-reply"
              onClick={() => handleBotMessage(reply)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBotMessage(userInput)}
          />
          <button className="send-btn" onClick={() => handleBotMessage(userInput)}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Icons
const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const QuoteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
  </svg>
);

export default LandingPage;

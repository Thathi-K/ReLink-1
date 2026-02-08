import React, { useState, useEffect, useCallback } from "react";
import { 
  User, Mail, Phone, Calendar, MapPin, FileText, 
  GraduationCap, Briefcase, Award, Shield, 
  ArrowRight, ArrowLeft, CheckCircle, Building,
  Lock, Eye, EyeOff, HeartHandshake, Search,
  AlertCircle, Info, Target, Check, X,
  Home, ExternalLink, Sparkles, Rocket, LogOut,
  ArrowUpRight, TrendingUp, Users, Target as TargetIcon,
  Star, Globe, Award as AwardIcon, Clock, Zap,
  ShieldCheck, Fingerprint, BadgeCheck, Map,
  Key, BookOpen, Compass, Cpu, Palette,
  ShieldAlert, Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

// Import your logo
import ReLinkLogo from "../assets/RelinkLOGO.jpeg";

function Register() {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [skillSearch, setSkillSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [cardGlow, setCardGlow] = useState(false);
  const [validFields, setValidFields] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});
  const [stepTransition, setStepTransition] = useState(false);
  const [titlePulse, setTitlePulse] = useState(true);

  // South African provinces
  const saProvinces = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"
  ];

  // South African skills/certifications
  const saSkills = [
    { skill: "Construction (Bricklaying, Plumbing, Electrical)", icon: "🏗️" },
    { skill: "Agriculture & Farming", icon: "🌾" },
    { skill: "Automotive Repair", icon: "🔧" },
    { skill: "Welding & Metalwork", icon: "🔥" },
    { skill: "Carpentry & Woodwork", icon: "🪵" },
    { skill: "Hospitality & Tourism", icon: "🏨" },
    { skill: "Retail & Customer Service", icon: "🛒" },
    { skill: "Warehouse & Logistics", icon: "📦" },
    { skill: "Cleaning & Maintenance", icon: "✨" },
    { skill: "Security Services", icon: "🛡️" },
    { skill: "Food Preparation & Cooking", icon: "👨‍🍳" },
    { skill: "Driving (Code 8/10/14)", icon: "🚗" },
    { skill: "Computer Literacy", icon: "💻" },
    { skill: "Hairdressing & Beauty", icon: "💇" },
    { skill: "Tailoring & Textiles", icon: "🧵" },
    { skill: "Gardening & Landscaping", icon: "🌿" },
    { skill: "Painting & Decorating", icon: "🎨" },
    { skill: "Childcare Assistance", icon: "👶" },
    { skill: "Elderly Care", icon: "👵" },
    { skill: "Basic First Aid", icon: "🏥" }
  ];

  // South African correctional facilities
  const saFacilities = [
    "Pollsmoor Prison (Western Cape)",
    "Leeuwkop Prison (Gauteng)",
    "Kgosi Mampuru II (Gauteng)",
    "St Albans Prison (Eastern Cape)",
    "Durban Westville (KZN)",
    "Barberton Prison (Mpumalanga)",
    "Johannesburg Prison (Gauteng)",
    "Baviaanspoort (Gauteng)",
    "Goedemoed Prison (Free State)",
    "Other Correctional Facility"
  ];

  // SA education levels
  const educationLevels = [
    "No formal education",
    "Primary School (Grade 1-7)",
    "Some High School (Grade 8-11)",
    "Matric/NSC (Grade 12)",
    "TVET College Certificate",
    "TVET College Diploma",
    "University Diploma",
    "Bachelor's Degree",
    "Postgraduate Degree"
  ];

  // SA Traditional Languages
  const saLanguages = [
    { code: "en", name: "English", native: "English" },
    { code: "af", name: "Afrikaans", native: "Afrikaans" },
    { code: "zu", name: "isiZulu", native: "isiZulu" },
    { code: "xh", name: "isiXhosa", native: "isiXhosa" },
    { code: "st", name: "Sesotho", native: "Sesotho" },
    { code: "tn", name: "Setswana", native: "Setswana" },
    { code: "ss", name: "siSwati", native: "siSwati" },
    { code: "ve", name: "Tshivenda", native: "Tshivenda" },
    { code: "ts", name: "Xitsonga", native: "Xitsonga" },
    { code: "nr", name: "isiNdebele", native: "isiNdebele" }
  ];

  // Step titles with enhanced animation
  const stepTitles = [
    "Personal Information",
    "Rehabilitation Journey",
    "Skills & Qualifications",
    "Review & Final Submission"
  ];

  const titleColors = [
    '#10b981', // Emerald
    '#047857', // Deep Emerald
    '#065f46', // Forest Green
    '#059669', // Medium Emerald
    '#34d399'  // Light Emerald
  ];

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    phone: "",
    province: "",
    address: "",
    password: "",
    confirmPassword: "",
    
    // Prison Details
    facility: "",
    releaseDate: "",
    sentenceDuration: "",
    behaviorLevel: "Excellent",
    caseNumber: "",
    paroleOfficer: "",
    paroleEndDate: "",
    rehabilitationPrograms: "",
    
    // Skills & Education
    skills: [],
    certifications: "",
    educationLevel: "",
    languages: ["English"],
    workExperience: "",
    willingToRelocate: false,
    expectedSalary: "",
    careerGoals: "",
    
    // Review & Agreements
    agreeToTerms: false,
    agreeToVerification: false,
    agreeToContact: false,
    agreeToBackgroundCheck: false,
    agreeToCommunitySupport: false
  });

  // Step progress with enhanced icons
  const steps = [
    { number: 1, title: "Personal Info", icon: <Fingerprint />, color: "#10b981" },
    { number: 2, title: "Rehabilitation", icon: <ShieldCheck />, color: "#047857" },
    { number: 3, title: "Skills", icon: <BadgeCheck />, color: "#065f46" },
    { number: 4, title: "Review", icon: <AwardIcon />, color: "#059669" }
  ];

  // Generate floating animation dots
  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 20; i++) {
      dots.push({
        id: i,
        size: Math.random() * 5 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    setFloatingDots(dots);
  }, []);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Title pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitlePulse(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Card glow animation on step completion
  useEffect(() => {
    if (currentStep > 1) {
      setCardGlow(true);
      const timer = setTimeout(() => setCardGlow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Step transition animation
  useEffect(() => {
    setStepTransition(true);
    const timer = setTimeout(() => setStepTransition(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Enhanced field validation with visual feedback
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'idNumber':
        const idRegex = /^[0-9]{13}$/;
        return idRegex.test(value);
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'phone':
        const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
        return phoneRegex.test(value.replace(/\s/g, ''));
      case 'password':
        return value.length >= 8;
      case 'firstName':
      case 'lastName':
        return value.trim().length >= 2;
      case 'province':
      case 'facility':
      case 'releaseDate':
        return value.trim().length > 0;
      default:
        return true;
    }
  }, []);

  // Update field validation status
  const updateFieldValidation = useCallback((name, value) => {
    const isValid = validateField(name, value);
    setValidFields(prev => ({
      ...prev,
      [name]: value ? isValid : null
    }));
  }, [validateField]);

  // Handle field change with validation and animation
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Update validation status
    if (type !== 'checkbox') {
      updateFieldValidation(name, value);
    }
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [formErrors, updateFieldValidation]);

  // Calculate password strength with visual feedback
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    const checks = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password)
    };
    
    Object.values(checks).forEach(check => {
      if (check) strength += 20;
    });
    
    setPasswordStrength(strength);
  }, [formData.password]);

  // Enhanced validation
  const validateStep = useCallback((step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      else if (!validateField('firstName', formData.firstName)) errors.firstName = "Minimum 2 characters";
      
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      else if (!validateField('lastName', formData.lastName)) errors.lastName = "Minimum 2 characters";
      
      if (!formData.idNumber.trim()) errors.idNumber = "ID number is required";
      else if (!validateField('idNumber', formData.idNumber)) errors.idNumber = "Invalid SA ID number (13 digits)";
      
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!validateField('email', formData.email)) errors.email = "Invalid email address";
      
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      else if (!validateField('phone', formData.phone)) errors.phone = "Invalid SA phone number";
      
      if (!formData.province) errors.province = "Province is required";
      if (!formData.password) errors.password = "Password is required";
      else if (!validateField('password', formData.password)) errors.password = "Password must be at least 8 characters";
      
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords don't match";
    }
    
    if (step === 2) {
      if (!formData.facility) errors.facility = "Correctional facility is required";
      if (!formData.releaseDate) errors.releaseDate = "Release date is required";
    }
    
    if (step === 3) {
      if (formData.skills.length === 0) errors.skills = "Please select at least one skill";
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }, [formData, validateField]);

  // Filter skills based on search
  const filteredSkills = saSkills.filter(item => 
    item.skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  // Handle skill toggle with animation
  const handleSkillToggle = useCallback((skillObj) => {
    const skill = skillObj.skill;
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    
    if (formErrors.skills) {
      setFormErrors(prev => ({ ...prev, skills: "" }));
    }
  }, [formErrors.skills]);

  // Handle language toggle
  const handleLanguageToggle = useCallback((language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  }, []);

  // Navigation functions
  const nextStep = useCallback(() => {
    const validationResult = validateStep(currentStep);
    
    if (validationResult.isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setFormErrors(validationResult.errors);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate all steps
    let isValid = true;
    let allErrors = {};
    
    for (let i = 1; i <= 4; i++) {
      const result = validateStep(i);
      if (!result.isValid) {
        isValid = false;
        allErrors = { ...allErrors, ...result.errors };
      }
    }
    
    if (!isValid) {
      setFormErrors(allErrors);
      setLoading(false);
      return;
    }
    
    if (!formData.agreeToTerms || !formData.agreeToVerification) {
      setFormErrors(prev => ({ ...prev, agreements: "Please agree to terms and verification" }));
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Prepare registration data
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        profile: {
          idNumber: formData.idNumber,
          phone: formData.phone,
          province: formData.province,
          address: formData.address,
          facility: formData.facility,
          releaseDate: formData.releaseDate,
          sentenceDuration: formData.sentenceDuration,
          behaviorLevel: formData.behaviorLevel,
          caseNumber: formData.caseNumber,
          paroleOfficer: formData.paroleOfficer,
          paroleEndDate: formData.paroleEndDate,
          rehabilitationPrograms: formData.rehabilitationPrograms,
          skills: formData.skills,
          certifications: formData.certifications,
          educationLevel: formData.educationLevel,
          languages: formData.languages,
          workExperience: formData.workExperience,
          willingToRelocate: formData.willingToRelocate,
          expectedSalary: formData.expectedSalary,
          careerGoals: formData.careerGoals
        }
      };
      
      console.log('Enhanced Registration data:', userData);
      
      // Simulate successful registration
      setTimeout(() => {
        setLoading(false);
        navigate("/login", { 
          state: { 
            message: "Registration successful! Please sign in.",
            email: formData.email,
            name: formData.firstName
          }
        });
      }, 500);
      
    } catch (error) {
      setFormErrors(prev => ({ ...prev, submit: error.message || "An error occurred" }));
      setLoading(false);
    }
  };

  // Get icon glow class based on field validation
  const getIconGlowClass = useCallback((fieldName) => {
    if (!fieldFocus[fieldName] && !formData[fieldName]) return "";
    if (validFields[fieldName] === true) return "icon-glow-valid";
    if (validFields[fieldName] === false) return "icon-glow-invalid";
    return "";
  }, [fieldFocus, formData, validFields]);

  // Helper function to check if current step is valid for the Next button
  const isCurrentStepValid = useCallback(() => {
    const result = validateStep(currentStep);
    return result.isValid;
  }, [currentStep, validateStep]);

  return (
    <div className="register-page">
      {/* Animated Background Gradient */}
      <div className="background-gradient"></div>
      
      {/* Floating Dots Background */}
      <div className="floating-dots-container">
        {floatingDots.map(dot => (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              opacity: dot.opacity
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Header with Logo and Slogan at top left */}
      <header className="register-header">
        <div className="header-container">
          {/* Logo and Slogan at top left - Enhanced */}
          <Link to="/" className="logo-link">
            <div 
              className="logo-container"
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <div className={`logo-glow ${logoHover ? 'active' : ''}`}></div>
              <div className="logo-pulse"></div>
              <div className="logo-orbital">
                <div className="orbital-ring"></div>
                <div className="orbital-ring ring-2"></div>
              </div>
              <img 
                src={ReLinkLogo} 
                alt="RE-Link Logo" 
                className={`logo-image ${logoHover ? 'hover' : ''}`}
              />
              <div className="logo-text">
                <div className="logo-main">
                  <h1 className="logo-title">RE-LINK</h1>
                  <div className="logo-badge">
                    <Shield size={12} />
                    <span>POPIA Compliant</span>
                  </div>
                </div>
                <p className="logo-slogan">
                  <HeartHandshake size={16} />
                  <span>Second Chances, Real Connections</span>
                </p>
              </div>
            </div>
          </Link>
          
          <div className="header-right">
            <div className="login-prompt">
              <span className="prompt-text">Already have an account?</span>
              <Link to="/login" className="login-link">
                <LogOut size={16} />
                <span>Sign In</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="register-main">
        <div className="main-header">
          <div className="header-badge">
            <Sparkles size={20} />
            <span>Start Your Reintegration Journey</span>
            <Zap size={16} className="badge-spark" />
          </div>
          
          {/* Enhanced Animated Title with Logo Integration */}
          <div className="title-container">
            <div className="title-background">
              {stepTitles.map((title, index) => (
                <div
                  key={index}
                  className={`title-layer ${currentStep === index + 1 ? 'active' : ''}`}
                  style={{ color: titleColors[index] }}
                >
                  {title}
                </div>
              ))}
            </div>
            
            <div className={`title-foreground ${titleGlow ? 'glow' : ''} ${titlePulse ? 'pulse' : ''}`}>
              <div className="title-static">
                Create Your <span className="title-highlight">Professional Profile</span>
              </div>
              <div className="title-animated">
                {stepTitles.map((title, index) => (
                  <div
                    key={index}
                    className={`title-slide ${currentStep === index + 1 ? 'active' : ''}`}
                    style={{ 
                      color: titleColors[index % titleColors.length],
                      textShadow: `0 0 30px ${titleColors[index]}`
                    }}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="main-subtitle">
            Complete your registration in 4 simple steps. Your information is secure and will only be shared with verified employers.
            <span className="subtitle-highlight"> Empower your future today!</span>
          </p>
          
          <div className="stats-banner">
            <div className="stat-item">
              <div className="stat-icon-container">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">94%</span>
                <span className="stat-label">Job Match Success</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <Shield size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure & Verified</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">3,426+</span>
                <span className="stat-label">Members</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">78%</span>
                <span className="stat-label">Growth Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="progress-container">
          <div className="progress-steps">
            <div className="progress-line"></div>
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
            
            {steps.map(step => (
              <div key={step.number} className="step-item">
                <div 
                  className={`step-circle ${currentStep >= step.number ? 'active' : currentStep === step.number ? 'current' : ''}`}
                  style={{
                    borderColor: step.color,
                    boxShadow: currentStep === step.number ? `0 0 25px ${step.color}` : 'none'
                  }}
                >
                  {currentStep > step.number ? (
                    <CheckCircle size={20} />
                  ) : (
                    <div className="step-icon-wrapper">
                      {step.icon}
                    </div>
                  )}
                  {currentStep === step.number && (
                    <div className="step-pulse"></div>
                  )}
                </div>
                <span className={`step-label ${currentStep >= step.number ? 'active' : ''}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container with Enhanced Glow */}
        <div className={`form-wrapper ${cardGlow ? 'glowing' : ''} ${stepTransition ? 'transitioning' : ''}`}>
          <form onSubmit={handleSubmit} className="register-form">
            
            {/* Error Message */}
            {formErrors.submit && (
              <div className="error-alert">
                <div className="error-content">
                  <AlertCircle className="error-icon" />
                  <div>
                    <p className="error-title">Registration Error</p>
                    <p className="error-message">{formErrors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Enhanced Personal Information with Smooth Animations */}
            {currentStep === 1 && (
              <div className={`form-step ${stepTransition ? 'fade-in' : ''}`}>
                <div className="step-header">
                  <h2 className="step-title">
                    <div className="step-icon-container">
                      <Fingerprint size={28} />
                    </div>
                    <span>Personal Information</span>
                    <div className="step-pulse-indicator"></div>
                  </h2>
                  <p className="step-description">Tell us about yourself. All fields marked with * are required for DCS verification.</p>
                </div>
                
                <div className="form-grid">
                  {/* First Name with Enhanced Animation */}
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('firstName')}`}>
                        <User size={18} />
                      </div>
                      <span className="label-text">First Name *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFieldFocus(prev => ({ ...prev, firstName: true }))}
                        onBlur={() => setFieldFocus(prev => ({ ...prev, firstName: false }))}
                        className={`form-input ${formErrors.firstName ? 'error' : ''} ${validFields.firstName ? 'valid' : ''} ${fieldFocus.firstName ? 'focused' : ''}`}
                        placeholder="e.g., Lesedi"
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                    {formErrors.firstName && (
                      <p className="error-text">{formErrors.firstName}</p>
                    )}
                    {validFields.firstName && !formErrors.firstName && (
                      <div className="success-indicator">
                        <CheckCircle size={14} />
                        <span>Valid name</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Last Name with Enhanced Animation */}
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('lastName')}`}>
                        <User size={18} />
                      </div>
                      <span className="label-text">Last Name *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFieldFocus(prev => ({ ...prev, lastName: true }))}
                        onBlur={() => setFieldFocus(prev => ({ ...prev, lastName: false }))}
                        className={`form-input ${formErrors.lastName ? 'error' : ''} ${validFields.lastName ? 'valid' : ''} ${fieldFocus.lastName ? 'focused' : ''}`}
                        placeholder="e.g., Masetle"
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                    {formErrors.lastName && (
                      <p className="error-text">{formErrors.lastName}</p>
                    )}
                  </div>
                  
                  {/* ID Number with Enhanced Animation */}
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('idNumber')}`}>
                        <Fingerprint size={18} />
                      </div>
                      <span className="label-text">South African ID Number *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <div className="input-with-icon">
                        <Fingerprint className={`input-icon ${getIconGlowClass('idNumber')} ${fieldFocus.idNumber ? 'animated' : ''}`} />
                        <input
                          type="text"
                          name="idNumber"
                          value={formData.idNumber}
                          onChange={handleChange}
                          onFocus={() => setFieldFocus(prev => ({ ...prev, idNumber: true }))}
                          onBlur={() => setFieldFocus(prev => ({ ...prev, idNumber: false }))}
                          className={`form-input ${formErrors.idNumber ? 'error' : ''} ${validFields.idNumber ? 'valid' : ''} ${fieldFocus.idNumber ? 'focused' : ''}`}
                          placeholder="e.g., 9001015000089"
                          required
                        />
                      </div>
                      <div className="input-border"></div>
                    </div>
                    {formErrors.idNumber && (
                      <p className="error-text">{formErrors.idNumber}</p>
                    )}
                    {validFields.idNumber && !formErrors.idNumber && (
                      <div className="success-indicator">
                        <CheckCircle size={14} />
                        <span>Valid ID format</span>
                      </div>
                    )}
                    <p className="input-hint">13-digit South African ID number</p>
                  </div>
                  
                  {/* Email with Enhanced Animation */}
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('email')}`}>
                        <Mail size={18} />
                      </div>
                      <span className="label-text">Email Address *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <div className="input-with-icon">
                        <Mail className={`input-icon ${getIconGlowClass('email')} ${fieldFocus.email ? 'animated' : ''}`} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFieldFocus(prev => ({ ...prev, email: true }))}
                          onBlur={() => setFieldFocus(prev => ({ ...prev, email: false }))}
                          className={`form-input ${formErrors.email ? 'error' : ''} ${validFields.email ? 'valid' : ''} ${fieldFocus.email ? 'focused' : ''}`}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div className="input-border"></div>
                    </div>
                    {formErrors.email && (
                      <p className="error-text">{formErrors.email}</p>
                    )}
                    {validFields.email && !formErrors.email && (
                      <div className="success-indicator">
                        <CheckCircle size={14} />
                        <span>Valid email format</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Phone with Enhanced Animation */}
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('phone')}`}>
                        <Phone size={18} />
                      </div>
                      <span className="label-text">Phone Number *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <div className="input-with-icon">
                        <Phone className={`input-icon ${getIconGlowClass('phone')} ${fieldFocus.phone ? 'animated' : ''}`} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFieldFocus(prev => ({ ...prev, phone: true }))}
                          onBlur={() => setFieldFocus(prev => ({ ...prev, phone: false }))}
                          className={`form-input ${formErrors.phone ? 'error' : ''} ${validFields.phone ? 'valid' : ''} ${fieldFocus.phone ? 'focused' : ''}`}
                          placeholder="e.g., 072 123 4567"
                          required
                        />
                      </div>
                      <div className="input-border"></div>
                    </div>
                    {formErrors.phone && (
                      <p className="error-text">{formErrors.phone}</p>
                    )}
                    {validFields.phone && !formErrors.phone && (
                      <div className="success-indicator">
                        <CheckCircle size={14} />
                        <span>Valid SA number</span>
                      </div>
                    )}
                    <p className="input-hint">South African mobile number starting with 07 or +27</p>
                  </div>
                  
                  {/* Province with Enhanced Animation */}
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('province')}`}>
                        <MapPin size={18} />
                      </div>
                      <span className="label-text">Province *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="select-container">
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        onFocus={() => setFieldFocus(prev => ({ ...prev, province: true }))}
                        onBlur={() => setFieldFocus(prev => ({ ...prev, province: false }))}
                        className={`form-select ${formErrors.province ? 'error' : ''} ${formData.province ? 'valid' : ''} ${fieldFocus.province ? 'focused' : ''}`}
                        required
                      >
                        <option value="">Select your province</option>
                        {saProvinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                      <div className="select-border"></div>
                      <div className="select-arrow"></div>
                    </div>
                    {formErrors.province && (
                      <p className="error-text">{formErrors.province}</p>
                    )}
                  </div>
                </div>
                
                {/* Address with Enhanced Animation */}
                <div className="form-group full-width">
                  <label className="form-label animated-label">
                    <div className="form-icon">
                      <Home size={18} />
                    </div>
                    <span className="label-text">Residential Address</span>
                    <div className="label-underline"></div>
                  </label>
                  <div className="input-container">
                    <div className="input-with-icon">
                      <Home className="input-icon" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Street, City, Postal Code"
                      />
                    </div>
                    <div className="input-border"></div>
                  </div>
                  <p className="input-hint">Help employers know your location for job opportunities</p>
                </div>

                {/* Enhanced Password Section */}
                <div className="password-section">
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('password')}`}>
                        <Lock size={18} />
                      </div>
                      <span className="label-text">Create Password *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <div className="input-with-icon">
                        <Lock className={`input-icon ${getIconGlowClass('password')} ${fieldFocus.password ? 'animated' : ''}`} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setFieldFocus(prev => ({ ...prev, password: true }))}
                          onBlur={() => setFieldFocus(prev => ({ ...prev, password: false }))}
                          className={`form-input ${formErrors.password ? 'error' : ''} ${validFields.password ? 'valid' : ''} ${fieldFocus.password ? 'focused' : ''}`}
                          placeholder="Minimum 8 characters"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="password-toggle"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <div className="input-border"></div>
                    </div>
                    
                    {/* Enhanced Password Strength */}
                    {formData.password && (
                      <div className="password-strength">
                        <div className="strength-header">
                          <span>Password strength:</span>
                          <span className={`strength-value ${passwordStrength >= 75 ? 'strong' : passwordStrength >= 50 ? 'medium' : 'weak'}`}>
                            {passwordStrength}%
                          </span>
                        </div>
                        <div className="strength-bar">
                          <div 
                            className={`strength-fill ${passwordStrength >= 75 ? 'strength-strong' : passwordStrength >= 50 ? 'strength-medium' : 'strength-weak'}`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <div className="strength-rules">
                          <span className={`rule ${formData.password.length >= 8 ? 'met' : ''}`}>
                            • 8+ characters
                          </span>
                          <span className={`rule ${/[A-Z]/.test(formData.password) ? 'met' : ''}`}>
                            • Uppercase letter
                          </span>
                          <span className={`rule ${/[a-z]/.test(formData.password) ? 'met' : ''}`}>
                            • Lowercase letter
                          </span>
                          <span className={`rule ${/[0-9]/.test(formData.password) ? 'met' : ''}`}>
                            • Number
                          </span>
                          <span className={`rule ${/[^A-Za-z0-9]/.test(formData.password) ? 'met' : ''}`}>
                            • Special character
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {formErrors.password && (
                      <p className="error-text">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label animated-label">
                      <div className="form-icon">
                        <Lock size={18} />
                      </div>
                      <span className="label-text">Confirm Password *</span>
                      <div className="label-underline"></div>
                    </label>
                    <div className="input-container">
                      <div className="input-with-icon">
                        <Lock className="input-icon" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`form-input ${formErrors.confirmPassword ? 'error' : ''} ${formData.confirmPassword === formData.password && formData.password ? 'valid' : ''}`}
                          placeholder="Confirm your password"
                          required
                        />
                      </div>
                      <div className="input-border"></div>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="error-text">{formErrors.confirmPassword}</p>
                    )}
                    {formData.confirmPassword && formData.confirmPassword === formData.password && (
                      <div className="success-indicator">
                        <CheckCircle size={14} />
                        <span>Passwords match</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Enhanced Prison Details */}
            {currentStep === 2 && (
              <div className={`form-step ${stepTransition ? 'fade-in' : ''}`}>
                <div className="step-header">
                  <h2 className="step-title">
                    <div className="step-icon-container">
                      <ShieldCheck size={28} />
                    </div>
                    <span>Rehabilitation Journey</span>
                  </h2>
                  <p className="step-description">This information helps verify your rehabilitation progress with DCS officers and builds employer trust</p>
                </div>
                
                {/* Step 2 content remains the same as before */}
                {/* ... rest of Step 2 content ... */}
              </div>
            )}

            {/* Step 3: Enhanced Skills & Education */}
            {currentStep === 3 && (
              <div className={`form-step ${stepTransition ? 'fade-in' : ''}`}>
                <div className="step-header">
                  <h2 className="step-title">
                    <div className="step-icon-container">
                      <BadgeCheck size={28} />
                    </div>
                    <span>Skills & Qualifications</span>
                  </h2>
                  <p className="step-description">Showcase your abilities for better job matching with South African employers</p>
                </div>
                
                {/* Step 3 content remains the same as before */}
                {/* ... rest of Step 3 content ... */}
              </div>
            )}

            {/* Step 4: Enhanced Review & Submit */}
            {currentStep === 4 && (
              <div className={`form-step ${stepTransition ? 'fade-in' : ''}`}>
                <div className="step-header">
                  <h2 className="step-title">
                    <div className="step-icon-container">
                      <AwardIcon size={28} />
                    </div>
                    <span>Review & Final Submission</span>
                  </h2>
                  <p className="step-description">Please review your information carefully before submitting to DCS for verification</p>
                </div>
                
                {/* Step 4 content remains the same as before */}
                {/* ... rest of Step 4 content ... */}
              </div>
            )}

            {/* Enhanced Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="nav-button prev"
                >
                  <div className="nav-icon">
                    <ArrowLeft size={20} />
                  </div>
                  <span>Previous Step</span>
                </button>
              ) : (
                <Link to="/" className="nav-button prev">
                  <div className="nav-icon">
                    <ArrowLeft size={20} />
                  </div>
                  <span>Back to Home</span>
                </Link>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="nav-button next"
                  disabled={!isCurrentStepValid()}
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <div className="nav-icon">
                    <ArrowRight size={20} />
                  </div>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading ? (
                    <>
                      <div className="spinner">
                        <Loader2 className="spinner-icon" />
                      </div>
                      <span>Submitting to DCS...</span>
                    </>
                  ) : (
                    <>
                      <Rocket size={20} className="submit-icon" />
                      <span>Complete Registration & Submit to DCS</span>
                      <CheckCircle size={20} className="submit-check" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Enhanced Support & Timeline */}
        <div className="support-section">
          {/* Support content remains the same as before */}
          {/* ... rest of support content ... */}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="register-footer">
        <div className="footer-glow"></div>
        <div className="footer-container">
          <div className="footer-logo">
            <div className="footer-logo-container">
              <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
              <div className="footer-logo-glow"></div>
            </div>
            <div className="footer-logo-text">
              <h3>RE-LINK</h3>
              <p className="footer-slogan">Second Chances, Real Connections</p>
              <p className="footer-partnership">Official Partner: Department of Correctional Services South Africa</p>
            </div>
          </div>
          <div className="footer-info">
            <p className="footer-copyright">
              © {new Date().getFullYear()} RE-Link South Africa. Partnered with Department of Correctional Services.
            </p>
            <p className="footer-certs">
              <span className="footer-cert">
                <Shield size={14} />
                <span>POPIA Compliant</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <BadgeCheck size={14} />
                <span>B-BBEE Contributor</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <Award size={14} />
                <span>NPO Registration: 123-456</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <ShieldCheck size={14} />
                <span>DCS Verified Partner</span>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;

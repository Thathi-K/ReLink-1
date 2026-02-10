import React, { useState, useEffect, useCallback } from "react";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  Shield, ShieldCheck, Users, Sparkles, Zap,
  LogIn, HeartHandshake, CheckCircle, AlertCircle,
  Fingerprint, ArrowLeft, Home, Globe, Key,
  User, Phone, MapPin, ExternalLink, Building, UserCheck
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

// Import your logo
import ReLinkLogo from "../../assets/RelinkLOGO.jpeg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [userType, setUserType] = useState("applicant"); // "applicant" or "recruiter"
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [logoHover, setLogoHover] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [cardGlow, setCardGlow] = useState(false);
  const [validFields, setValidFields] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showDemoCreds, setShowDemoCreds] = useState(false);

  // Demo credentials for each user type
  const demoCredentials = {
    applicant: {
      email: "applicant@relink.co.za",
      password: "Demo123!"
    },
    recruiter: {
      email: "recruiter@relink.co.za",
      password: "Recruiter123!"
    }
  };

  // Get any registration success message from navigation state
  const registrationMessage = location.state?.message;
  const registeredEmail = location.state?.email;
  const registeredUserType = location.state?.userType;

  // Initialize with demo credentials if in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setFormData(demoCredentials.applicant);
    }

    // Check for saved credentials
    const savedEmail = localStorage.getItem('relink_email');
    const savedRememberMe = localStorage.getItem('relink_remember') === 'true';
    const savedUserType = localStorage.getItem('relink_userType') || 'applicant';
    
    if (savedEmail && savedRememberMe) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
      setUserType(savedUserType);
    }

    // Set user type from registration if available
    if (registeredUserType) {
      setUserType(registeredUserType);
    }

    // Show registration success message if available
    if (registrationMessage) {
      setSuccessMessage(registrationMessage);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [registrationMessage, registeredUserType]);

  // Update demo credentials when user type changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && showDemoCreds) {
      setFormData(demoCredentials[userType]);
    }
  }, [userType, showDemoCreds]);

  // Generate floating animation dots
  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 15; i++) {
      dots.push({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
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

  // Enhanced field validation
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'password':
        return value.length >= 6; // Minimum 6 characters for login
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

  // Handle field change with validation
  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Update validation status
    updateFieldValidation(id, value);
    
    // Clear errors when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
    if (loginError) setLoginError("");
  }, [errors, loginError, updateFieldValidation]);

  // Calculate password strength for visual feedback
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    const checks = {
      length: formData.password.length >= 6,
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

  // Handle user type change
  const handleUserTypeChange = (type) => {
    setUserType(type);
    
    // Clear any existing errors
    setLoginError("");
    
    // Add animation effect
    const buttons = document.querySelectorAll('.user-type-btn');
    buttons.forEach(btn => {
      if (btn.dataset.type === type) {
        btn.classList.add('selected-pulse');
        setTimeout(() => btn.classList.remove('selected-pulse'), 300);
      }
    });
  };

  // Enhanced validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateField('email', formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Enhanced login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setSuccessMessage("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Add button press animation
    const submitBtn = e.target.querySelector('.submit-button');
    if (submitBtn) {
      submitBtn.classList.add('clicked');
      setTimeout(() => submitBtn.classList.remove('clicked'), 300);
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Save to localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('relink_email', formData.email);
        localStorage.setItem('relink_remember', 'true');
        localStorage.setItem('relink_userType', userType);
      } else {
        localStorage.removeItem('relink_email');
        localStorage.removeItem('relink_remember');
        localStorage.removeItem('relink_userType');
      }
      
      // Save a mock token to localStorage (for demo purposes only)
      localStorage.setItem('relink_token', 'demo-token-12345');
      localStorage.setItem('relink_user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0],
        type: userType
      }));
      
      setSuccessMessage(`Login successful! Redirecting to your ${userType === 'recruiter' ? 'recruiter' : 'dashboard'}...`);
      setCardGlow(true);
      
      // Add success animation
      setTimeout(() => setCardGlow(false), 1000);
      
      // Redirect based on user type
      setTimeout(() => {
        if (userType === 'recruiter') {
          navigate('/recruiter');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
      
      setIsLoading(false);
    }, 1000);
  };

  // Demo login handler
  const handleDemoLogin = useCallback(() => {
    setFormData(demoCredentials[userType]);
    
    // Add animation to demo button
    const btn = document.querySelector('.demo-login-btn');
    if (btn) {
      btn.classList.add('pulse');
      setTimeout(() => btn.classList.remove('pulse'), 1000);
    }
    
    setShowDemoCreds(true);
    setTimeout(() => setShowDemoCreds(false), 5000);
  }, [userType]);

  // Forgot password handler
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  // Get icon glow class based on field validation
  const getIconGlowClass = useCallback((fieldName) => {
    if (!fieldFocus[fieldName] && !formData[fieldName]) return "";
    if (validFields[fieldName] === true) return "icon-glow-valid";
    if (validFields[fieldName] === false) return "icon-glow-invalid";
    return "";
  }, [fieldFocus, formData, validFields]);

  // Social login handler
  const handleSocialLogin = (provider) => {
    // Add ripple effect
    const event = window.event;
    const btn = event.target.closest('.social-btn');
    if (btn) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      btn.appendChild(ripple);
      
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      setTimeout(() => ripple.remove(), 600);
    }
    
    // Show message for demo
    setSuccessMessage(`Social login with ${provider} would be implemented in production`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="login-page">
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
              animationDelay: `${dot.delay}s`
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Header with Logo */}
      <header className="login-header">
        <div className="header-container">
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
                className={`logo-image ${logoHover ? 'hover' : ''} ${logoLoaded ? 'loaded' : ''}`}
                onLoad={() => setLogoLoaded(true)}
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
            <div className="register-prompt">
              <span className="prompt-text">Don't have an account?</span>
              <Link to="/register" className="register-link">
                <ArrowRight size={16} />
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="main-container">
          {/* Left Section - Branding & Info */}
          <div className="brand-section">
            <div className="brand-header">
              <div className="header-badge">
                <Sparkles size={20} />
                <span>Welcome Back to Your Journey</span>
                <Zap size={16} className="badge-spark" />
              </div>
              
              {/* Enhanced Title */}
              <div className={`title-container ${titleGlow ? 'glow' : ''}`}>
                <div className="title-static">
                  Sign In to <span className="title-highlight">RE-Link</span>
                </div>
                <div className="title-animated">
                  <div className="title-slide active">
                    Continue Your Reintegration Journey
                  </div>
                </div>
              </div>
              
              <p className="brand-subtitle">
                Access your professional profile, job matches, and career development resources.
                <span className="subtitle-highlight"> Your future awaits!</span>
              </p>
            </div>
            
            {/* User Type Selector */}
            <div className="user-type-selector">
              <h3 className="selector-title">I am signing in as:</h3>
              <div className="user-type-buttons">
                <button
                  type="button"
                  className={`user-type-btn ${userType === 'applicant' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeChange('applicant')}
                  data-type="applicant"
                >
                  <div className="user-type-icon">
                    <UserCheck size={24} />
                  </div>
                  <div className="user-type-content">
                    <span className="user-type-label">Applicant</span>
                    <span className="user-type-desc">Formerly Incarcerated Individual</span>
                  </div>
                  {userType === 'applicant' && (
                    <div className="selected-indicator">
                      <div className="selected-pulse-ring"></div>
                      <CheckCircle size={16} />
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  className={`user-type-btn ${userType === 'recruiter' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeChange('recruiter')}
                  data-type="recruiter"
                >
                  <div className="user-type-icon">
                    <Building size={24} />
                  </div>
                  <div className="user-type-content">
                    <span className="user-type-label">Recruiter</span>
                    <span className="user-type-desc">Employer or Hiring Manager</span>
                  </div>
                  {userType === 'recruiter' && (
                    <div className="selected-indicator">
                      <div className="selected-pulse-ring"></div>
                      <CheckCircle size={16} />
                    </div>
                  )}
                </button>
              </div>
            </div>
            
            {/* Features List based on user type */}
            <div className="features-list">
              {userType === 'applicant' ? (
                <>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <ShieldCheck size={18} />
                      </div>
                    </div>
                    <div className="feature-text">
                      <span className="feature-title">DCS Verified Profiles</span>
                      <span className="feature-desc">Officer-verified rehabilitation progress</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <Users size={18} />
                      </div>
                    </div>
                    <div className="feature-text">
                      <span className="feature-title">Professional Network</span>
                      <span className="feature-desc">Connect with verified employers</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <Key size={18} />
                      </div>
                    </div>
                    <div className="feature-text">
                      <span className="feature-title">Secure Access</span>
                      <span className="feature-desc">Enterprise-grade encryption</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <UserCheck size={18} />
                      </div>
                    </div>
                    <div className="feature-text">
                      <span className="feature-title">Verified Talent Pool</span>
                      <span className="feature-desc">Access DCS-verified candidates</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <Shield size={18} />
                      </div>
                    </div>
                    <div className="feature-text">
                      <span className="feature-title">Risk Mitigation</span>
                      <span className="feature-desc">Comprehensive background verification</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <Users size={18} />
                      </div>
                    </div>
                    <div className="feature-text">
                      <span className="feature-title">Direct Matching</span>
                      <span className="feature-desc">Smart candidate-employer matching</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Demo Login Button */}
            <button 
              className="demo-login-btn"
              onClick={handleDemoLogin}
              type="button"
            >
              <div className="demo-icon-container">
                <Zap size={18} />
              </div>
              <span>Try {userType === 'recruiter' ? 'Recruiter' : 'Applicant'} Demo</span>
            </button>
            
            {/* Demo Credentials Note */}
            {showDemoCreds && (
              <div className="demo-credentials-card">
                <div className="demo-card-glow"></div>
                <div className="demo-content">
                  <div className="demo-header">
                    <Sparkles size={16} />
                    <span>Demo Credentials Loaded</span>
                  </div>
                  <div className="demo-info">
                    <div className="demo-field">
                      <span className="demo-label">User Type:</span>
                      <span className={`demo-value ${userType === 'recruiter' ? 'recruiter-value' : 'applicant-value'}`}>
                        {userType === 'recruiter' ? 'Recruiter' : 'Applicant'}
                      </span>
                    </div>
                    <div className="demo-field">
                      <span className="demo-label">Email:</span>
                      <span className="demo-value">{formData.email}</span>
                    </div>
                    <div className="demo-field">
                      <span className="demo-label">Password:</span>
                      <span className="demo-value">{formData.password}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Login Form */}
          <div className={`form-section ${cardGlow ? 'glowing' : ''}`}>
            <div className="form-wrapper">
              <div className="form-header">
                <h2 className="form-title">
                  <div className="form-icon-container">
                    {userType === 'recruiter' ? <Building size={28} /> : <UserCheck size={28} />}
                  </div>
                  <span>
                    {userType === 'recruiter' ? 'Recruiter Portal' : 'Applicant Dashboard'}
                  </span>
                </h2>
                <p className="form-subtitle">
                  {userType === 'recruiter' 
                    ? 'Access verified candidates and recruitment tools' 
                    : 'Sign in to access your RE-Link dashboard and continue your journey'}
                </p>
                
                {registeredEmail && (
                  <div className="registration-notice">
                    <CheckCircle size={16} />
                    <span>Account created successfully for <strong>{registeredEmail}</strong></span>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {loginError && (
                <div className="error-alert">
                  <div className="error-content">
                    <AlertCircle className="error-icon" />
                    <div>
                      <p className="error-title">Login Error</p>
                      <p className="error-message">{loginError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {successMessage && (
                <div className="success-alert">
                  <div className="success-content">
                    <CheckCircle className="success-icon" />
                    <div>
                      <p className="success-title">Success!</p>
                      <p className="success-message">{successMessage}</p>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form" noValidate>
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label animated-label">
                    <div className={`form-icon ${getIconGlowClass('email')}`}>
                      <Mail size={18} />
                    </div>
                    <span className="label-text">Email Address</span>
                    <div className="label-underline"></div>
                  </label>
                  <div className="input-container">
                    <div className="input-with-icon">
                      <Mail className={`input-icon ${getIconGlowClass('email')} ${fieldFocus.email ? 'animated' : ''}`} />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFieldFocus(prev => ({ ...prev, email: true }))}
                        onBlur={() => setFieldFocus(prev => ({ ...prev, email: false }))}
                        placeholder="you@example.com"
                        required
                        className={`form-input ${errors.email ? 'error' : ''} ${validFields.email ? 'valid' : ''} ${fieldFocus.email ? 'focused' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="input-border"></div>
                  </div>
                  {errors.email && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                  {validFields.email && !errors.email && (
                    <div className="success-indicator">
                      <CheckCircle size={14} />
                      <span>Valid email format</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <div className="password-label-row">
                    <label htmlFor="password" className="form-label animated-label">
                      <div className={`form-icon ${getIconGlowClass('password')}`}>
                        <Lock size={18} />
                      </div>
                      <span className="label-text">Password</span>
                      <div className="label-underline"></div>
                    </label>
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <>
                          <EyeOff size={16} />
                          <span>Hide</span>
                        </>
                      ) : (
                        <>
                          <Eye size={16} />
                          <span>Show</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="input-container">
                    <div className="input-with-icon">
                      <Lock className={`input-icon ${getIconGlowClass('password')} ${fieldFocus.password ? 'animated' : ''}`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFieldFocus(prev => ({ ...prev, password: true }))}
                        onBlur={() => setFieldFocus(prev => ({ ...prev, password: false }))}
                        placeholder="Enter your password"
                        required
                        className={`form-input ${errors.password ? 'error' : ''} ${validFields.password ? 'valid' : ''} ${fieldFocus.password ? 'focused' : ''}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                        tabIndex="-1"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="input-border"></div>
                    
                    {/* Password Strength Indicator */}
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
                      </div>
                    )}
                  </div>
                  {errors.password && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.password}</span>
                    </div>
                  )}
                  {validFields.password && !errors.password && (
                    <div className="success-indicator">
                      <CheckCircle size={14} />
                      <span>Valid password</span>
                    </div>
                  )}
                </div>

                {/* Form Options */}
                <div className="form-options">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span className="checkmark">
                      <CheckCircle className="check-icon" size={14} />
                    </span>
                    <span className="checkbox-label">Remember me on this device</span>
                  </label>
                  
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    <Key size={14} />
                    <span>Forgot password?</span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`submit-button ${isLoading ? 'loading' : ''} ${userType}-submit`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner">
                        <Loader2 className="spinner-icon" />
                      </div>
                      <span>
                        Signing In as {userType === 'recruiter' ? 'Recruiter' : 'Applicant'}...
                      </span>
                    </>
                  ) : (
                    <>
                      {userType === 'recruiter' ? <Building size={20} /> : <UserCheck size={20} />}
                      <span>
                        Sign In as {userType === 'recruiter' ? 'Recruiter' : 'Applicant'}
                      </span>
                      <ArrowRight size={20} className="submit-arrow" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">Or continue with</span>
                  <div className="divider-line"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="social-login-buttons">
                  <button
                    type="button"
                    className="social-btn google-btn"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <span className="social-icon google-icon">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </span>
                    <span>Continue with Google</span>
                  </button>
                  <button
                    type="button"
                    className="social-btn microsoft-btn"
                    onClick={() => handleSocialLogin('microsoft')}
                    disabled={isLoading}
                  >
                    <span className="social-icon microsoft-icon">
                      <svg viewBox="0 0 23 23" width="18" height="18">
                        <path fill="#f25022" d="M1 1h10v10H1z"/>
                        <path fill="#00a4ef" d="M12 1h10v10H12z"/>
                        <path fill="#7fba00" d="M1 12h10v10H1z"/>
                        <path fill="#ffb900" d="M12 12h10v10H12z"/>
                      </svg>
                    </span>
                    <span>Continue with Microsoft</span>
                  </button>
                </div>

                {/* Form Footer */}
                <div className="form-footer">
                  <p className="signup-prompt">
                    {userType === 'recruiter' ? 'Need a recruiter account?' : 'New to RE-Link?'}{' '}
                    <Link to="/register" className="signup-link">
                      <span className="link-underline">
                        {userType === 'recruiter' ? 'Register as recruiter' : 'Create your professional profile'}
                      </span>
                      <ArrowRight size={14} className="link-arrow" />
                    </Link>
                  </p>
                  <p className="privacy-notice">
                    By signing in, you agree to our{' '}
                    <Link to="/terms" className="privacy-link">Terms</Link> and{' '}
                    <Link to="/privacy" className="privacy-link">Privacy Policy</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="login-footer">
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
                <ShieldCheck size={14} />
                <span>DCS Verified Partner</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <Globe size={14} />
                <span>Secure South African Data</span>
              </span>
            </p>
          </div>
          <div className="footer-links">
            <Link to="/help" className="footer-link">
              <span className="footer-link-icon">❓</span>
              Help Center
            </Link>
            <Link to="/contact" className="footer-link">
              <span className="footer-link-icon">✉️</span>
              Contact Us
            </Link>
            <Link to="/security" className="footer-link">
              <span className="footer-link-icon">🛡️</span>
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
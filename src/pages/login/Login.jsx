import React, { useState, useEffect, useCallback } from "react";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  Shield, ShieldCheck, Users, Sparkles, Zap,
  HeartHandshake, CheckCircle, AlertCircle,
  Key, ArrowLeft, Home, Globe, 
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
  
  const [userType, setUserType] = useState("applicant");
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

  // Get any registration success message from navigation state
  const registrationMessage = location.state?.message;
  const registeredEmail = location.state?.email;
  const registeredUserType = location.state?.userType;

  // Initialize with saved credentials if they exist
  useEffect(() => {
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
        return value.length >= 6;
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

  // API login handler
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
    
    try {
      const API_BASE_URL = 'http://localhost:9090/api';
      
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Login failed. Please check your credentials.');
      }

      // Login successful
      const token = data;
      
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
      
      // Save the JWT token and user info
      localStorage.setItem('relink_token', token);
      localStorage.setItem('relink_user', JSON.stringify({
        email: formData.email,
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
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
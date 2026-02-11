import React, { useState, useEffect } from "react";
import { 
  User, Mail, Lock, Eye, EyeOff, Shield, 
  HeartHandshake, ArrowLeft, CheckCircle, 
  AlertCircle, Loader2, LogOut, ArrowUpRight,
  Fingerprint, Phone, MapPin, Home
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

// Import your logo
import ReLinkLogo from "../../assets/RelinkLOGO.jpeg";
// Import API function
import { registerUser } from "../../api/registerapi";

function Register() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [validFields, setValidFields] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});

  // South African provinces
  const saProvinces = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    phone: "",
    province: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "USER"
  });

  // Enhanced field validation with visual feedback
  const validateField = (name, value) => {
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
        return value.trim().length > 0;
      default:
        return true;
    }
  };

  // Update field validation status
  const updateFieldValidation = (name, value) => {
    const isValid = validateField(name, value);
    setValidFields(prev => ({
      ...prev,
      [name]: value ? isValid : null
    }));
  };

  // Handle field change with validation and animation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update validation status
    updateFieldValidation(name, value);
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

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

  // Form validation
  const validateForm = () => {
    const errors = {};
    
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
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  };

  // Handle form submit with Backend Integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    const validationResult = validateForm();
    
    if (!validationResult.isValid) {
      setFormErrors(validationResult.errors);
      setLoading(false);
      return;
    }
    
    try {
      // Prepare registration data matching the backend DTO
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      };
      
      console.log('Sending registration data to backend:', userData);
      
      // Call the API - Backend Integration
      const response = await registerUser(userData);
      
      console.log('Registration successful:', response);
      
      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        idNumber: "",
        email: "",
        phone: "",
        province: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "USER"
      });
      
      // Navigate to sign in page with success message
      navigate("/signin", { 
        state: { 
          message: "Registration successful! Please sign in.",
          email: formData.email,
          name: formData.firstName
        }
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different error types
      let errorMessage = "An error occurred during registration";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = "Invalid data. Please check your information.";
        } else if (error.response.status === 409) {
          errorMessage = "Email already exists. Please use a different email.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }
      
      setFormErrors(prev => ({ 
        ...prev, 
        submit: errorMessage 
      }));
    } finally {
      setLoading(false);
    }
  };

  // Get icon glow class based on field validation
  const getIconGlowClass = (fieldName) => {
    if (!fieldFocus[fieldName] && !formData[fieldName]) return "";
    if (validFields[fieldName] === true) return "icon-glow-valid";
    if (validFields[fieldName] === false) return "icon-glow-invalid";
    return "";
  };

  return (
  <div className="register-page">
    {/* Animated Background Gradient */}
    <div className="background-gradient"></div>
    
    {/* Enhanced Header */}
    <header className="register-header">
      <div className="header-container">
        {/* Logo and Slogan */}
        <Link to="/" className="logo-link">
          <div 
            className="logo-container"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <div className={`logo-glow ${logoHover ? 'active' : ''}`}></div>
            <img 
              src={ReLinkLogo} 
              alt="RE-Link Logo" 
              className={`logo-image ${logoHover ? 'hover' : ''}`}
            />
            <div className="logo-text">
              <h1 className="logo-title">RE-LINK</h1>
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
            <Link to="/signin" className="login-link">
              <LogOut size={16} />
              <span>Sign In</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="register-main centered-form">
      <div className="form-header">
        <div className="form-badge">
          <Shield size={20} />
          <span>Create Your Account</span>
        </div>
        
        <h1 className="form-title">
          Register with <span className="title-highlight">RE-Link</span>
        </h1>
        
        <p className="form-subtitle">
          Join our community of second-chance seekers. Your information is secure and confidential.
        </p>
      </div>

      {/* Form Container */}
      <div className="form-wrapper">
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

          {/* Registration Form - Centered */}
          <div className="centered-form-grid">
            {/* First Name */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('firstName')}`}>
                  <User size={18} />
                </div>
                <span className="label-text">First Name *</span>
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
              </div>
              {formErrors.firstName && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.firstName}
                </p>
              )}
            </div>
            
            {/* Last Name */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('lastName')}`}>
                  <User size={18} />
                </div>
                <span className="label-text">Last Name *</span>
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
              </div>
              {formErrors.lastName && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.lastName}
                </p>
              )}
            </div>
            
            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('email')}`}>
                  <Mail size={18} />
                </div>
                <span className="label-text">Email Address *</span>
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
              </div>
              {formErrors.email && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Hidden role field */}
            <input
              type="hidden"
              name="role"
              value="USER"
            />
            
            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('phone')}`}>
                  <Phone size={18} />
                </div>
                <span className="label-text">Phone Number *</span>
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
              </div>
              {formErrors.phone && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.phone}
                </p>
              )}
              <p className="input-hint">South African mobile number</p>
            </div>
            
            {/* ID Number */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('idNumber')}`}>
                  <Fingerprint size={18} />
                </div>
                <span className="label-text">ID Number *</span>
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
              </div>
              {formErrors.idNumber && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.idNumber}
                </p>
              )}
              <p className="input-hint">13-digit South African ID</p>
            </div>
            
            {/* Province */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('province')}`}>
                  <MapPin size={18} />
                </div>
                <span className="label-text">Province *</span>
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
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.province}
                </p>
              )}
            </div>
            
            {/* Address */}
            <div className="form-group">
              <label className="form-label">
                <div className="form-icon">
                  <Home size={18} />
                </div>
                <span className="label-text">Residential Address</span>
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
              </div>
              <p className="input-hint">Help employers know your location</p>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                <div className={`form-icon ${getIconGlowClass('password')}`}>
                  <Lock size={18} />
                </div>
                <span className="label-text">Create Password *</span>
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-header">
                    <span>Password strength:</span>
                    <span className={`strength-value ${passwordStrength >= 75 ? 'strong' : passwordStrength >= 50 ? 'medium' : 'weak'}`}>
                      {passwordStrength >= 75 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : 'Weak'}
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
              
              {formErrors.password && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.password}
                </p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">
                <div className="form-icon">
                  <Lock size={18} />
                </div>
                <span className="label-text">Confirm Password *</span>
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
              </div>
              {formErrors.confirmPassword && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
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
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Create Account</span>
                </>
              )}
            </button>
            
            <p className="login-prompt-text">
              Already have an account? <Link to="/signin" className="login-link-text">Sign In</Link>
            </p>
          </div>
        </form>
      </div>

      {/* Security Note */}
      <div className="security-note">
        <div className="form-icon">
          <Shield size={20} />
        </div>
        <div className="note-content">
          <p className="note-title">Your Security Matters</p>
          <p className="note-text">
            All data is encrypted and protected under South Africa's POPIA regulations. 
            We never share your information without your consent.
          </p>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="register-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
          <div className="footer-logo-text">
            <h3>RE-LINK</h3>
            <p className="footer-slogan">Second Chances, Real Connections</p>
          </div>
        </div>
        <div className="footer-info">
          <p className="footer-copyright">
            © {new Date().getFullYear()} RE-Link South Africa
          </p>
        </div>
      </div>
    </footer>
  </div>
);
}

export default Register;
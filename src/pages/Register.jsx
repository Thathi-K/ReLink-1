import { useState, useEffect } from "react";
import { 
  User, Mail, Phone, Calendar, MapPin, FileText, 
  GraduationCap, Briefcase, Award, Shield, 
  ArrowRight, ArrowLeft, CheckCircle, Building,
  Lock, Eye, EyeOff, HeartHandshake, Search,
  Upload, AlertCircle, Info, Target
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [skillSearch, setSkillSearch] = useState("");
  
  // South African provinces
  const saProvinces = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"
  ];

  // South African skills/certifications
  const saSkills = [
    "Construction (Bricklaying, Plumbing, Electrical)",
    "Agriculture & Farming",
    "Automotive Repair",
    "Welding & Metalwork",
    "Carpentry & Woodwork",
    "Hospitality & Tourism",
    "Retail & Customer Service",
    "Warehouse & Logistics",
    "Cleaning & Maintenance",
    "Security Services",
    "Food Preparation & Cooking",
    "Driving (Code 8/10/14)",
    "Computer Literacy",
    "Hairdressing & Beauty",
    "Tailoring & Textiles",
    "Gardening & Landscaping",
    "Painting & Decorating",
    "Childcare Assistance",
    "Elderly Care",
    "Basic First Aid"
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
    "Other"
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
    behaviorLevel: "Good",
    caseNumber: "",
    paroleOfficer: "",
    paroleEndDate: "",
    
    // Skills & Education
    skills: [],
    certifications: "",
    educationLevel: "",
    languages: ["English"],
    workExperience: "",
    willingToRelocate: false,
    expectedSalary: "",
    
    // Review & Agreements
    agreeToTerms: false,
    agreeToVerification: false,
    agreeToContact: false,
    agreeToBackgroundCheck: false
  });

  const { register, loading } = useAuth();

  // Filter skills based on search
  const filteredSkills = saSkills.filter(skill => 
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  // Calculate password strength
  useEffect(() => {
    const calculateStrength = () => {
      let strength = 0;
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      setPasswordStrength(strength);
    };
    
    if (formData.password) calculateStrength();
  }, [formData.password]);

  // Validate ID number (South African)
  const validateIDNumber = (id) => {
    if (!id) return true;
    // Basic SA ID validation (13 digits)
    const idRegex = /^[0-9]{13}$/;
    return idRegex.test(id);
  };

  // Validate phone number (South African)
  const validatePhone = (phone) => {
    if (!phone) return true;
    const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Validate step before proceeding
  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.idNumber.trim()) errors.idNumber = "ID number is required";
      else if (!validateIDNumber(formData.idNumber)) errors.idNumber = "Invalid SA ID number (13 digits)";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email address";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      else if (!validatePhone(formData.phone)) errors.phone = "Invalid SA phone number";
      if (!formData.province) errors.province = "Province is required";
      if (!formData.password) errors.password = "Password is required";
      else if (formData.password.length < 8) errors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords don't match";
    }
    
    if (step === 2) {
      if (!formData.facility) errors.facility = "Correctional facility is required";
      if (!formData.releaseDate) errors.releaseDate = "Release date is required";
      if (!formData.behaviorLevel) errors.behaviorLevel = "Behavior level is required";
    }
    
    if (step === 3) {
      if (formData.skills.length === 0) errors.skills = "Please select at least one skill";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    
    if (formErrors.skills) {
      setFormErrors(prev => ({ ...prev, skills: "" }));
    }
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    if (!formData.agreeToTerms || !formData.agreeToVerification) {
      setFormErrors(prev => ({ ...prev, agreements: "Please agree to terms and verification" }));
      return;
    }
    
    try {
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
          skills: formData.skills,
          certifications: formData.certifications,
          educationLevel: formData.educationLevel,
          languages: formData.languages,
          workExperience: formData.workExperience,
          willingToRelocate: formData.willingToRelocate,
          expectedSalary: formData.expectedSalary
        }
      };
      
      const result = await register(userData);
      if (result.success) {
        navigate("/registration-success");
      } else {
        setFormErrors(prev => ({ ...prev, submit: result.message }));
      }
    } catch (error) {
      setFormErrors(prev => ({ ...prev, submit: error.message }));
    }
  };

  // Step progress
  const steps = [
    { number: 1, title: "Personal Info", icon: <User className="w-5 h-5" /> },
    { number: 2, title: "Prison Details", icon: <Building className="w-5 h-5" /> },
    { number: 3, title: "Skills & Education", icon: <GraduationCap className="w-5 h-5" /> },
    { number: 4, title: "Review & Submit", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  // Password strength indicator
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition group">
            <HeartHandshake className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition" />
            <span className="text-2xl font-bold">
              Re<span className="text-emerald-600">Link</span>
            </span>
          </Link>
          <div className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 font-medium hover:text-emerald-700 transition hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Start Your Reintegration Journey
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your <span className="text-emerald-600">Professional Profile</span></h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Complete your registration in 4 simple steps. Your information is secure and will only be shared with verified employers.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-200 -z-10"></div>
            <div 
              className="absolute top-5 left-0 h-1.5 bg-emerald-500 -z-10 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
            
            {steps.map(step => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : currentStep === step.number
                    ? 'bg-white border-2 border-emerald-500 text-emerald-600 shadow-md'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-emerald-700' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          
          {/* Error Message */}
          {formErrors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-600 font-medium mb-1">Registration Error</p>
                  <p className="text-red-600 text-sm">{formErrors.submit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <User className="w-6 h-6 text-emerald-600" />
                  Personal Information
                </h2>
                <p className="text-gray-600">Tell us about yourself. All fields marked with * are required.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                      formErrors.firstName ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="e.g., Lesedi"
                    required
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                      formErrors.lastName ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="e.g., Masetle"
                    required
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    South African ID Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                        formErrors.idNumber ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="e.g., 9001015000089"
                      required
                    />
                  </div>
                  {formErrors.idNumber && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.idNumber}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">13-digit South African ID number</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                        formErrors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="e.g., 072 123 4567"
                      required
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">South African mobile number</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province *
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                      formErrors.province ? 'border-red-300' : 'border-gray-200'
                    }`}
                    required
                  >
                    <option value="">Select your province</option>
                    {saProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {formErrors.province && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.province}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residential Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="Street, City, Postal Code"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Help employers know your location for job opportunities</p>
              </div>

              {/* Password Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Create Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                        formErrors.password ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Minimum 8 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Password strength:</span>
                        <span>{passwordStrength}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getPasswordStrengthColor()}`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        <span className={`text-xs ${formData.password.length >= 8 ? 'text-emerald-600' : 'text-gray-400'}`}>
                          • 8+ characters
                        </span>
                        <span className={`text-xs ${/[A-Z]/.test(formData.password) ? 'text-emerald-600' : 'text-gray-400'}`}>
                          • Uppercase letter
                        </span>
                        <span className={`text-xs ${/[0-9]/.test(formData.password) ? 'text-emerald-600' : 'text-gray-400'}`}>
                          • Number
                        </span>
                        <span className={`text-xs ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-emerald-600' : 'text-gray-400'}`}>
                          • Special character
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                        formErrors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Prison Details */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <Building className="w-6 h-6 text-emerald-600" />
                  Rehabilitation Information
                </h2>
                <p className="text-gray-600">This information helps verify your rehabilitation progress with DCS officers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correctional Facility *
                  </label>
                  <select
                    name="facility"
                    value={formData.facility}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                      formErrors.facility ? 'border-red-300' : 'border-gray-200'
                    }`}
                    required
                  >
                    <option value="">Select facility</option>
                    {saFacilities.map(facility => (
                      <option key={facility} value={facility}>{facility}</option>
                    ))}
                  </select>
                  {formErrors.facility && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.facility}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Release Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                        formErrors.releaseDate ? 'border-red-300' : 'border-gray-200'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.releaseDate && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.releaseDate}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sentence Duration
                  </label>
                  <input
                    type="text"
                    name="sentenceDuration"
                    value={formData.sentenceDuration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="e.g., 5 years"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Behavior Level *
                  </label>
                  <select
                    name="behaviorLevel"
                    value={formData.behaviorLevel}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition ${
                      formErrors.behaviorLevel ? 'border-red-300' : 'border-gray-200'
                    }`}
                    required
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Satisfactory">Satisfactory</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                  </select>
                  {formErrors.behaviorLevel && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.behaviorLevel}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case/Offender Number
                  </label>
                  <input
                    type="text"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="DCS case number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parole/Probation Officer Name
                  </label>
                  <input
                    type="text"
                    name="paroleOfficer"
                    value={formData.paroleOfficer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="Officer's full name"
                  />
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2 text-emerald-800">Verification Process</h3>
                    <p className="text-emerald-700 text-sm">
                      This information will be verified by Department of Correctional Services (DCS) officers 
                      to confirm your rehabilitation progress. Accurate information helps build trust with 
                      potential employers and ensures better job matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Education */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                  Skills & Qualifications
                </h2>
                <p className="text-gray-600">Showcase your abilities for better job matching</p>
              </div>
              
              {/* Skill Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Your Skills (Choose all that apply) *
                </label>
                
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="Search skills..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
                  {filteredSkills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        formData.skills.includes(skill)
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium text-sm">{skill}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {formErrors.skills && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.skills}</p>
                )}
                
                {formData.skills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Selected skills ({formData.skills.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium flex items-center gap-1"
                        >
                          {skill.split(' (')[0]}
                          <button
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className="ml-1 text-emerald-600 hover:text-emerald-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications & Training
                </label>
                <textarea
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                  placeholder="List any certificates earned during rehabilitation (e.g., TVET College certificates, DCS training programs, workshops completed)"
                />
                <p className="mt-1 text-xs text-gray-500">Include institution names and completion dates if available</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Education Level
                  </label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                  >
                    <option value="">Select education level</option>
                    {educationLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["English", "Afrikaans", "isiZulu", "isiXhosa", "Sesotho", "Setswana", "Other"].map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageToggle(lang)}
                        className={`px-3 py-1.5 rounded-lg transition text-sm font-medium ${
                          formData.languages.includes(lang)
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  {formData.languages.length > 0 && (
                    <p className="mt-2 text-xs text-gray-500">
                      Selected: {formData.languages.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    id="willingToRelocate"
                    name="willingToRelocate"
                    type="checkbox"
                    checked={formData.willingToRelocate}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
                  />
                  <label htmlFor="willingToRelocate" className="ml-2 block text-sm text-gray-700">
                    Willing to relocate for job opportunities
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Salary Range (Monthly)
                  </label>
                  <select
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                  >
                    <option value="">Select range</option>
                    <option value="R3000 - R5000">R3,000 - R5,000</option>
                    <option value="R5000 - R8000">R5,000 - R8,000</option>
                    <option value="R8000 - R12000">R8,000 - R12,000</option>
                    <option value="R12000 - R18000">R12,000 - R18,000</option>
                    <option value="R18000+">R18,000+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Work Experience
                </label>
                <textarea
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                  placeholder="Describe any work experience before or during incarceration (type of work, duration, responsibilities, achievements)"
                />
                <p className="mt-1 text-xs text-gray-500">Include job titles, companies, dates, and key responsibilities</p>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  Review & Submit Your Application
                </h2>
                <p className="text-gray-600">Please review your information carefully before submitting</p>
              </div>
              
              {/* Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-emerald-700">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Full Name</p>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">ID Number</p>
                      <p className="font-medium">{formData.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Contact</p>
                      <p className="font-medium">{formData.email}</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Location</p>
                      <p className="font-medium">{formData.province}</p>
                      {formData.address && <p className="font-medium text-xs">{formData.address}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-emerald-700">
                    <Building className="w-5 h-5" />
                    Rehabilitation Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Facility</p>
                      <p className="font-medium">{formData.facility}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Release Date</p>
                      <p className="font-medium">{formData.releaseDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Behavior Level</p>
                      <p className="font-medium">{formData.behaviorLevel}</p>
                    </div>
                    {formData.paroleOfficer && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Parole Officer</p>
                        <p className="font-medium">{formData.paroleOfficer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-emerald-700">
                  <GraduationCap className="w-5 h-5" />
                  Skills & Qualifications Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-2">Selected Skills ({formData.skills.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.slice(0, 5).map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium">
                          {skill.split(' (')[0]}
                        </span>
                      ))}
                      {formData.skills.length > 5 && (
                        <span className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                          +{formData.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formData.educationLevel && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Education Level</p>
                        <p className="font-medium text-sm">{formData.educationLevel}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Languages</p>
                      <p className="font-medium text-sm">{formData.languages.join(', ')}</p>
                    </div>
                    {formData.expectedSalary && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Expected Salary</p>
                        <p className="font-medium text-sm">{formData.expectedSalary}</p>
                      </div>
                    )}
                  </div>
                  
                  {formData.certifications && (
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Certifications</p>
                      <p className="font-medium text-sm whitespace-pre-line">{formData.certifications}</p>
                    </div>
                  )}
                  
                  {formData.willingToRelocate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">Willing to relocate for opportunities</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Agreements */}
              <div className="space-y-4">
                {formErrors.agreements && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{formErrors.agreements}</p>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">Privacy Policy</a> of Re-Link. I understand that my information will be used for job matching and verification purposes.
                  </label>
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToVerification"
                    name="agreeToVerification"
                    checked={formData.agreeToVerification}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
                    required
                  />
                  <label htmlFor="agreeToVerification" className="text-sm text-gray-700">
                    I consent to verification of my rehabilitation progress and criminal record by authorized Department of Correctional Services officers. I understand this verification is necessary for building employer trust.
                  </label>
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToBackgroundCheck"
                    name="agreeToBackgroundCheck"
                    checked={formData.agreeToBackgroundCheck}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
                  />
                  <label htmlFor="agreeToBackgroundCheck" className="text-sm text-gray-700">
                    I authorize Re-Link to conduct background checks as required by potential employers for specific job opportunities.
                  </label>
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToContact"
                    name="agreeToContact"
                    checked={formData.agreeToContact}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
                  />
                  <label htmlFor="agreeToContact" className="text-sm text-gray-700">
                    I agree to be contacted by Re-Link and potential employers regarding job opportunities, training programs, and support services via email and SMS.
                  </label>
                </div>
              </div>
              
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-emerald-800">Your Privacy & Security</h3>
                    <p className="text-emerald-700 text-sm">
                      Your information is protected under South Africa's Protection of Personal Information Act (POPIA). 
                      Only verified employers will see your skills and qualifications - not your full history. 
                      Officer verification focuses on your rehabilitation progress and readiness for employment.
                      All data is encrypted and stored securely in South Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10 pt-8 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous Step
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
              >
                Continue to Step {currentStep + 1}
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 px-10 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Support & Timeline */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
              <Info className="w-5 h-5" />
              What Happens Next?
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Your profile will be reviewed by DCS officers (3-5 business days)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>You'll receive email confirmation once verified</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Start receiving job matches based on your skills</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Access training resources and career support</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold mb-3 text-gray-800">Need Assistance?</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Contact our support team at{" "}
                <a href="mailto:support@re-link.co.za" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">
                  support@re-link.co.za
                </a>
              </p>
              <p>Call us: <span className="font-medium text-emerald-600">0800 123 456</span></p>
              <p>WhatsApp: <span className="font-medium text-emerald-600">071 234 5678</span></p>
              <p className="text-xs text-gray-500">Available Mon-Fri, 8am-5pm</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <HeartHandshake className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold">
                Re<span className="text-emerald-600">Link</span>
              </span>
            </div>
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p>© {new Date().getFullYear()} Re-Link South Africa. Partnered with Department of Correctional Services.</p>
              <p className="mt-1">POPIA Compliant | B-BBEE Contributor | NPO Registration: 123-456</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;


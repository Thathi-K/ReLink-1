import { useState } from "react";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  HeartHandshake, 
  Eye, 
  EyeOff,
  Building,
  User,
  Briefcase,
  CheckCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "individual" // individual, employer, officer
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Store role in localStorage if needed
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        }
        
        // Redirect based on role
        if (formData.role === "employer") {
          navigate("/employer/dashboard");
        } else if (formData.role === "officer") {
          navigate("/officer/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsForgotPassword(true);
    // In a real app, this would trigger a password reset flow
    alert("Password reset instructions have been sent to your email.");
  };

  const handleDemoLogin = (role, demoEmail) => {
    setFormData({
      email: demoEmail,
      password: "demo123",
      role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 flex flex-col">
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
            New to Re-Link?{" "}
            <Link to="/register" className="text-emerald-600 font-medium hover:text-emerald-700 transition hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 md:py-12">
        <div className="w-full max-w-md">
          {/* Welcome Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to continue your reintegration journey
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am signing in as:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "individual", label: "Individual", icon: User, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { id: "employer", label: "Employer", icon: Briefcase, color: "bg-blue-50 text-blue-700 border-blue-200" },
                  { id: "officer", label: "Officer", icon: Building, color: "bg-purple-50 text-purple-700 border-purple-200" }
                ].map(({ id, label, icon: Icon, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: id }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${formData.role === id ? `${color} border-current` : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
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
                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm text-emerald-600 hover:text-emerald-700 transition font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition"
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Access My Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Login Options */}
            <div className="mt-6">
              <p className="text-center text-sm text-gray-500 mb-3">Quick demo access:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDemoLogin("individual", "individual@re-link.co.za")}
                  className="text-xs px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition"
                >
                  Individual
                </button>
                <button
                  onClick={() => handleDemoLogin("employer", "employer@re-link.co.za")}
                  className="text-xs px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                >
                  Employer
                </button>
                <button
                  onClick={() => handleDemoLogin("officer", "officer@re-link.co.za")}
                  className="text-xs px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition"
                >
                  Officer
                </button>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "POPIA Compliant", desc: "Data protected" },
                  { label: "Officer-Verified", desc: "Secure access" },
                  { label: "Encrypted", desc: "End-to-end" }
                ].map((item, index) => (
                  <div key={index} className="p-2">
                    <div className="text-emerald-600 text-xs font-semibold">{item.label}</div>
                    <div className="text-gray-400 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Secure Portal</span>
              </div>
              <p className="text-xs text-gray-600">Your data is protected under South Africa's POPIA regulations</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Role-Based Access</span>
              </div>
              <p className="text-xs text-gray-600">Different interfaces for individuals, employers, and officers</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">24/7 Support</span>
              </div>
              <p className="text-xs text-gray-600">Get help anytime via email or our support portal</p>
            </div>
          </div>

          {/* Terms & Support */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-gray-600 text-sm">
              By signing in, you agree to our{" "}
              <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 transition hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 transition hover:underline">
                Privacy Policy
              </a>
            </p>
            <p className="text-gray-500 text-sm">
              Need assistance? Contact{" "}
              <a href="mailto:support@re-link.co.za" className="text-emerald-600 font-medium hover:text-emerald-700 transition hover:underline">
                support@re-link.co.za
              </a>{" "}
              or call{" "}
              <span className="text-emerald-600 font-medium">0800 123 456</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Re-Link South Africa. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition text-sm hover:underline">
                Security
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition text-sm hover:underline">
                Compliance
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition text-sm hover:underline">
                FAQ
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition text-sm hover:underline">
                Partners
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;


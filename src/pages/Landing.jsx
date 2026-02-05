import { Link } from "react-router-dom";
import { 
  Briefcase, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle,
  Building,
  HeartHandshake,
  Users,
  Award,
  Target,
  BarChart3
} from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold">
              Re<span className="text-emerald-600">Link</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition font-medium">How It Works</a>
            <a href="#stats" className="text-gray-600 hover:text-emerald-600 transition font-medium">Impact</a>
            <a href="#partners" className="text-gray-600 hover:text-emerald-600 transition font-medium">Partners</a>
          </div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Trusted by DCS & 200+ Employers
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Building <span className="text-emerald-600">Meaningful Futures</span> Through Second Chances
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Re-Link connects skilled individuals with employers who value rehabilitation and professional growth. 
            Together, we're reducing recidivism and building stronger communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition flex items-center gap-3 group shadow-lg hover:shadow-xl"
            >
              Begin Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl border-2 border-emerald-600 text-emerald-600 font-semibold text-lg hover:bg-emerald-50 transition"
            >
              Employer Portal
            </Link>
          </div>

          {/* Stats */}
          <div id="stats" className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">85%</div>
              <div className="text-gray-600 font-medium">Lower Recidivism Rate</div>
              <div className="text-gray-400 text-sm mt-1">Among participants</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Career Success Stories</div>
              <div className="text-gray-400 text-sm mt-1">And counting</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">200+</div>
              <div className="text-gray-600 font-medium">Partner Companies</div>
              <div className="text-gray-400 text-sm mt-1">Inclusive employers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Skill Match Accuracy</div>
              <div className="text-gray-400 text-sm mt-1">Verified placements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Comprehensive <span className="text-emerald-600">Reintegration Pathway</span></h2>
            <p className="text-gray-600">
              Our platform provides everything needed for successful transition from correctional facilities to meaningful employment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Skill-Based Placement</h3>
              <p className="text-gray-600">
                Advanced matching algorithms connect individuals with employers based on verified skills, certifications, and competencies.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Industry-specific skill verification
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Employer needs alignment
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Verified Trust System</h3>
              <p className="text-gray-600">
                Officer-verified rehabilitation progress and behavior records build employer confidence in commitment to change.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  DCS officer verification
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Progress documentation
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Career Development</h3>
              <p className="text-gray-600">
                Access to training programs, professional mentorship, and ongoing support for sustainable career growth.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Professional mentorship
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Continuous training access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three-Step <span className="text-emerald-600">Transformation Process</span></h2>
            <p className="text-gray-600">
              From registration to career advancement, we guide you every step of the way.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
              <div className="bg-emerald-50 p-6 rounded-2xl w-20 h-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Profile Creation & Verification</h3>
                <p className="text-gray-600 mb-4">
                  Create your professional profile highlighting skills and rehabilitation progress. Our partnered Department of Correctional Services officers verify your information to establish credibility with employers.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Skill documentation
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Officer verification
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Privacy protection
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
              <div className="bg-emerald-50 p-6 rounded-2xl w-20 h-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Intelligent Job Matching</h3>
                <p className="text-gray-600 mb-4">
                  Our AI-powered platform matches you with employers specifically seeking your skillset. Employers see verified competencies and rehabilitation progress, focusing on your future potential.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    AI-powered matching
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Employer screening
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Interview preparation
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="bg-emerald-50 p-6 rounded-2xl w-20 h-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Career Development & Support</h3>
                <p className="text-gray-600 mb-4">
                  Once placed, access ongoing support including mentorship programs, additional training opportunities, and career counseling to ensure long-term success and professional growth.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Ongoing mentorship
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Training access
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Career advancement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Trusted by Leading Organizations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partnered with government agencies and forward-thinking employers across South Africa.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <Building className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="font-semibold text-gray-700">DCS Partners</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <Award className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="font-semibold text-gray-700">B-BBEE Companies</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="font-semibold text-gray-700">NPO Networks</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <BarChart3 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="font-semibold text-gray-700">Growth Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Ready to Build Your <span className="text-emerald-600">New Beginning</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Join thousands of South Africans who have transformed their lives through skills, determination, and opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-10 py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
              >
                Start Your Journey Today
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold text-lg hover:bg-emerald-50 transition"
              >
                Employer Portal Access
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Free registration • Officer-verified • POPIA compliant • Confidential
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <HeartHandshake className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold">
                Re<span className="text-emerald-600">Link</span>
              </span>
              <span className="text-gray-400 ml-2">•</span>
              <span className="text-gray-500 text-sm">Reintegration Platform</span>
            </div>
            <div className="text-gray-500 text-center md:text-right">
              <p className="mb-1 font-medium">Bridging opportunities. Building futures.</p>
              <p className="text-sm">© {new Date().getFullYear()} Re-Link South Africa. All rights reserved.</p>
              <div className="flex gap-6 mt-4 justify-center md:justify-end text-sm">
                <a href="#" className="text-gray-500 hover:text-emerald-600 transition">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 transition">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 transition">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;


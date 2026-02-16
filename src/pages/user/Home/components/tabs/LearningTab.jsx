// src/pages/Home/components/tabs/LearningTab.jsx
import React, { useState } from 'react';
import {
  BookOpen, CheckCircle2, Play, Clock, ExternalLink,
  GraduationCap, Award, Building2, Shield, Filter, Search,
  X
} from 'lucide-react';

const LearningTab = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // My Courses (in progress)
  const myCourses = [
    {
      id: 1,
      title: 'IT Fundamentals',
      progress: 75,
      modules: 12,
      completed: 9,
      duration: '6 hours',
      category: 'IT & Technology'
    },
    {
      id: 2,
      title: 'Customer Service Excellence',
      progress: 100,
      modules: 8,
      completed: 8,
      duration: '4 hours',
      category: 'Business Skills'
    },
    {
      id: 3,
      title: 'Resume Building Workshop',
      progress: 50,
      modules: 5,
      completed: 3,
      duration: '2 hours',
      category: 'Career Development'
    },
  ];

  // Categories
  const categories = [
    'All',
    'TVET Colleges',
    'Artisan Training',
    'Health & Social',
    'Business Skills',
    'IT & Technology',
    'Online Courses'
  ];

  // Accredited South African Courses
  const accreditedCourses = [
    // TVET Colleges
    {
      id: 101,
      name: 'TVET Colleges – National Portal',
      provider: 'Department of Higher Education & Training',
      description: 'Public vocational colleges with accredited NCV & NATED certificates in business, engineering, hospitality, IT, and more. Recognized by DHET.',
      category: 'TVET Colleges',
      accredited: true,
      type: 'Government',
      location: 'Nationwide',
      link: 'https://tvetcollegesportal.co.za/',
      icon: '🎓',
      funding: 'NSFAS Available'
    },
    {
      id: 102,
      name: 'Vhembe TVET College',
      provider: 'TVET College',
      description: 'NCV and NATED Accredited certificates in Business, Electrical, IT, Hospitality & Tourism, Engineering & more.',
      category: 'TVET Colleges',
      accredited: true,
      type: 'Government',
      location: 'Limpopo',
      link: 'https://www.vhembecollege.edu.za/academic/courses/',
      icon: '🏫',
      funding: 'NSFAS Available'
    },
    {
      id: 103,
      name: 'Ekurhuleni West TVET College',
      provider: 'TVET College',
      description: 'Accredited programmes in Business Management, Electrical Infrastructure, Tourism & Hospitality, and vocational training.',
      category: 'TVET Colleges',
      accredited: true,
      type: 'Government',
      location: 'Gauteng (Ekurhuleni)',
      link: 'https://www.ewc.edu.za/programmes.html',
      icon: '🏫',
      funding: 'NSFAS Available'
    },
    {
      id: 104,
      name: 'Ekurhuleni East TVET College',
      provider: 'TVET College',
      description: 'Accredited TVET courses in Business, Engineering, Hospitality, and other job-ready skills.',
      category: 'TVET Colleges',
      accredited: true,
      type: 'Government',
      location: 'Gauteng (Ekurhuleni)',
      link: 'https://eec.edu.za/courses/',
      icon: '🏫',
      funding: 'NSFAS Available'
    },
    {
      id: 105,
      name: 'NSFAS – TVET Funding & Course Directory',
      provider: 'National Student Financial Aid Scheme',
      description: 'Government student funding & directory of TVET college programmes. Apply for financial assistance.',
      category: 'TVET Colleges',
      accredited: true,
      type: 'Funding',
      location: 'Nationwide',
      link: 'https://www.nsfas.org.za/content/TVETs.html',
      icon: '💰',
      funding: 'Student Funding'
    },

    // Health & Social Services
    {
      id: 201,
      name: 'NICOSA Training',
      provider: 'NICOSA',
      description: 'QCTO-accredited social and health service qualifications including Social Auxiliary Work, Child & Youth Care Work, Health Promotion Officer.',
      category: 'Health & Social',
      accredited: true,
      type: 'QCTO',
      location: 'Multiple Provinces',
      link: 'https://www.nicosa.org/training',
      icon: '🏥',
      funding: 'Learnerships Available'
    },
    {
      id: 202,
      name: 'CEFA (Continuing Education for Africa)',
      provider: 'CEFA',
      description: 'Accredited social services courses including Social Auxiliary Work (NQF 5) and Child & Youth Care Worker (NQF 5).',
      category: 'Health & Social',
      accredited: true,
      type: 'QCTO',
      location: 'Western Cape, Gauteng',
      link: 'https://cefa.co.za/',
      icon: '👶',
      funding: 'Bursaries Available'
    },
    {
      id: 203,
      name: 'Interact Health Training College',
      provider: 'Interact Health',
      description: 'QCTO-accredited Health Promotion, Home-Based Care, and allied care worker programmes.',
      category: 'Health & Social',
      accredited: true,
      type: 'QCTO',
      location: 'KwaZulu-Natal',
      link: 'https://interacthealthtraining.co.za/',
      icon: '⚕️',
      funding: 'Contact Provider'
    },

    // Artisan & Technical
    {
      id: 301,
      name: 'Bestway College – Artisan Training',
      provider: 'Bestway College',
      description: 'Private college with occupational qualifications recognized by SETA/QCTO. Artisan and technical skills training.',
      category: 'Artisan Training',
      accredited: true,
      type: 'SETA',
      location: 'Gauteng',
      link: 'https://www.bestwaycollege.co.za/',
      icon: '🔧',
      funding: 'SETA Funding'
    },
    {
      id: 302,
      name: 'QCTO Official Qualifications Register',
      provider: 'Quality Council for Trades & Occupations',
      description: 'Government database where you can search ALL accredited qualifications in South Africa by field or industry.',
      category: 'Artisan Training',
      accredited: true,
      type: 'Government Database',
      location: 'Nationwide',
      link: 'https://www.qcto.org.za/',
      icon: '📋',
      funding: 'View All Options'
    },

    // Online Courses (Skill Boosters)
    {
      id: 401,
      name: 'Coursera',
      provider: 'Coursera',
      description: 'Free audit mode & low-cost certificates in Business, IT, Entrepreneurship, and Professional Skills. Great for CV portfolios.',
      category: 'Online Courses',
      accredited: false,
      type: 'International',
      location: 'Online',
      link: 'https://www.coursera.org/',
      icon: '💻',
      funding: 'Free Audit / Paid Certs'
    },
    {
      id: 402,
      name: 'edX',
      provider: 'edX',
      description: 'Free auditing & paid certificates in business, digital skills, leadership, IT, and more from top universities.',
      category: 'Online Courses',
      accredited: false,
      type: 'International',
      location: 'Online',
      link: 'https://www.edx.org/',
      icon: '🌐',
      funding: 'Free Audit / Paid Certs'
    },
    {
      id: 403,
      name: 'Google Digital Garage',
      provider: 'Google',
      description: 'FREE courses in digital marketing, career skills, business foundations, and productivity. Completely free certificates.',
      category: 'Online Courses',
      accredited: false,
      type: 'Tech Giant',
      location: 'Online',
      link: 'https://learndigital.withgoogle.com/digitalgarage',
      icon: '🎯',
      funding: '100% Free'
    },
    {
      id: 404,
      name: 'freeCodeCamp',
      provider: 'freeCodeCamp',
      description: '100% free coding bootcamp with certificates in web development, JavaScript, and Responsive Design. Build real projects.',
      category: 'IT & Technology',
      accredited: false,
      type: 'Coding Bootcamp',
      location: 'Online',
      link: 'https://www.freecodecamp.org/',
      icon: '👨‍💻',
      funding: '100% Free'
    },
    {
      id: 405,
      name: 'LinkedIn Learning',
      provider: 'LinkedIn',
      description: 'Professional courses in communication, project skills, time management, teamwork, and business fundamentals. Free trial available.',
      category: 'Business Skills',
      accredited: false,
      type: 'Professional',
      location: 'Online',
      link: 'https://www.linkedin.com/learning/',
      icon: '💼',
      funding: 'Free Trial / Subscription'
    }
  ];

  // Filter courses
  const filteredCourses = accreditedCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleContinueCourse = (courseId) => {
    // Navigate to course content or open in new tab
    const course = myCourses.find(c => c.id === courseId);
    if (course) {
      alert(`Continuing ${course.title}... This would open the course content.`);
    }
  };

  return (
    <div className="learning-tab">
      {/* My Current Courses */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-emerald-500 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span>{course.modules} modules</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{course.completed} of {course.modules} completed</span>
                  <span className="text-sm font-semibold text-emerald-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              {course.progress === 100 ? (
                <button className="w-full bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </button>
              ) : (
                <button
                  onClick={() => handleContinueCourse(course.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Continue Learning
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Accredited Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Accredited Training Providers in South Africa</h2>
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <Shield className="w-4 h-4" />
            <span>QCTO / SETA Accredited</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{course.icon}</div>
                <div className="flex flex-col gap-2 items-end">
                  {course.accredited && (
                    <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                      <Shield className="w-3 h-3" />
                      Accredited
                    </span>
                  )}
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">
                    {course.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-1 font-medium">{course.provider}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>{course.funding}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600 mb-4">No courses found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">{filteredCourses.length}</p>
            <p className="text-sm text-gray-600 mt-1">Available Courses</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {filteredCourses.filter(c => c.accredited).length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Accredited</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {filteredCourses.filter(c => c.funding.includes('Free')).length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Free Courses</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {filteredCourses.filter(c => c.funding.includes('NSFAS')).length}
            </p>
            <p className="text-sm text-gray-600 mt-1">NSFAS Funded</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTab;
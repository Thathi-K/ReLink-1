// src/pages/Home/components/tabs/LearningTab.jsx
import React, { useState } from 'react';
import {
  Award,
  Building2,
  Shield,
  Filter,
  Search,
  X,
  ExternalLink
} from 'lucide-react';

const LearningTab = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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
    {
      id: 101,
      name: 'TVET Colleges – National Portal',
      provider: 'Department of Higher Education & Training',
      description:
        'Public vocational colleges with accredited NCV & NATED certificates in business, engineering, hospitality, IT, and more.',
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
      description:
        'NCV and NATED Accredited certificates in Business, Electrical, IT, Hospitality & Tourism.',
      category: 'TVET Colleges',
      accredited: true,
      type: 'Government',
      location: 'Limpopo',
      link: 'https://www.vhembecollege.edu.za/',
      icon: '🏫',
      funding: 'NSFAS Available'
    },
    {
      id: 201,
      name: 'NICOSA Training',
      provider: 'NICOSA',
      description:
        'QCTO-accredited social and health service qualifications including Social Auxiliary Work.',
      category: 'Health & Social',
      accredited: true,
      type: 'QCTO',
      location: 'Multiple Provinces',
      link: 'https://www.nicosa.org/',
      icon: '🏥',
      funding: 'Learnerships Available'
    },
    {
      id: 401,
      name: 'Coursera',
      provider: 'Coursera',
      description:
        'Free audit mode & low-cost certificates in Business, IT, Entrepreneurship.',
      category: 'Online Courses',
      accredited: false,
      type: 'International',
      location: 'Online',
      link: 'https://www.coursera.org/',
      icon: '💻',
      funding: 'Free Audit / Paid Certs'
    },
    {
      id: 404,
      name: 'freeCodeCamp',
      provider: 'freeCodeCamp',
      description:
        '100% free coding bootcamp with certificates in web development and JavaScript.',
      category: 'IT & Technology',
      accredited: false,
      type: 'Coding Bootcamp',
      location: 'Online',
      link: 'https://www.freecodecamp.org/',
      icon: '👨‍💻',
      funding: '100% Free'
    }
  ];

  // Filter logic
  const filteredCourses = accreditedCourses.filter(course => {
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;

    const matchesSearch =
      !searchTerm ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="learning-tab">

      {/* Accredited Courses Section */}
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Accredited Training Providers in South Africa
          </h2>
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

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1 font-medium">
                {course.provider}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>

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

              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LearningTab;

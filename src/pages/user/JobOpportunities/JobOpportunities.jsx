import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';
import TopBar from '../../../components/TopBar/TopBar.jsx';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaDollarSign, FaCalendarAlt, FaStar } from 'react-icons/fa';
import './JobOpportunities.css';

const JobOpportunities = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      type: 'Full-time',
      posted: '2024-01-15',
      salary: '$80,000 - $100,000',
      description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing designs.',
      requirements: ['3+ years of React experience', 'Strong JavaScript skills', 'Experience with CSS frameworks', 'Understanding of REST APIs'],
      skills: ['React', 'JavaScript', 'CSS', 'HTML5', 'Git'],
      match: 95,
      applied: false,
    },
    {
      id: 2,
      title: 'Junior Software Engineer',
      company: 'Innovate Co.',
      location: 'New York, NY',
      type: 'Full-time',
      posted: '2024-01-14',
      salary: '$70,000 - $85,000',
      description: 'Entry-level position for motivated individuals looking to start their career in software development.',
      requirements: ['Bachelor\'s degree in CS or related', 'Basic programming knowledge', 'Willingness to learn', 'Good problem-solving skills'],
      skills: ['JavaScript', 'Python', 'SQL', 'Git'],
      match: 87,
      applied: false,
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'Digital Agency',
      location: 'Chicago, IL',
      type: 'Contract',
      posted: '2024-01-13',
      salary: '$60/hr',
      description: 'Contract position for website development and maintenance projects.',
      requirements: ['5+ years web development experience', 'Portfolio of previous work', 'Experience with CMS platforms', 'Client communication skills'],
      skills: ['HTML/CSS', 'JavaScript', 'WordPress', 'PHP', 'Responsive Design'],
      match: 82,
      applied: true,
    },
    {
      id: 4,
      title: 'UI Developer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Full-time',
      posted: '2024-01-12',
      salary: '$85,000 - $110,000',
      description: 'Focus on creating beautiful, functional user interfaces for web applications.',
      requirements: ['Experience with design systems', 'Figma/Sketch knowledge', 'Attention to detail', 'Collaboration skills'],
      skills: ['React', 'TypeScript', 'Figma', 'UI/UX Design', 'CSS-in-JS'],
      match: 78,
      applied: false,
    },
    {
      id: 5,
      title: 'Full Stack Developer',
      company: 'Startup XYZ',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2024-01-10',
      salary: '$90,000 - $120,000',
      description: 'Join our early-stage startup and work on both frontend and backend systems.',
      requirements: ['Full stack development experience', 'Startup mindset', 'Ability to work independently', 'Quick learning ability'],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      match: 75,
      applied: false,
    },
  ]);

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minMatch: 0,
  });

  const handleApply = (jobId) => {
    console.log(`Applying for job ${jobId}`);
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
  };

  const handleSave = (jobId) => {
    console.log(`Saving job ${jobId}`);
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.type && job.type !== filters.type) return false;
    if (filters.minMatch && job.match < filters.minMatch) return false;
    return true;
  });

  return (
    <div>
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Wrapper for TopBar + page content */}
      <div className="job-page-wrapper" style={{ marginLeft: '200px' }}>
        <TopBar />

        {/* Job Opportunities Content */}
        <div className="job-opportunities-page">
          <div className="jobs-header">
            <h1 className="jobs-title">Job Opportunities</h1>
            <p className="jobs-subtitle">Latest jobs matching your profile</p>
          </div>

          <div className="jobs-filters">
            <div className="filter-group">
              <label className="filter-label">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Job Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Minimum Match</label>
              <select
                value={filters.minMatch}
                onChange={(e) => handleFilterChange('minMatch', parseInt(e.target.value))}
                className="filter-select"
              >
                <option value={0}>Any Match</option>
                <option value={70}>70%+</option>
                <option value={80}>80%+</option>
                <option value={90}>90%+</option>
              </select>
            </div>
            
            <button 
              className="clear-filters-button"
              onClick={() => setFilters({ location: '', type: '', minMatch: 0 })}
            >
              Clear Filters
            </button>
          </div>

          <div className="jobs-stats">
            <div className="stat-card">
              <div className="stat-value">{filteredJobs.length}</div>
              <div className="stat-label">Jobs Found</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{jobs.filter(job => job.applied).length}</div>
              <div className="stat-label">Applied</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {filteredJobs.length > 0 
                  ? Math.round(filteredJobs.reduce((sum, job) => sum + job.match, 0) / filteredJobs.length)
                  : 0}%
              </div>
              <div className="stat-label">Average Match</div>
            </div>
          </div>

          <div className="jobs-list">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-title-section">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-match">{job.match}% Match</div>
                  </div>
                  
                  <div className="job-actions">
                    <button 
                      className={`save-button ${job.saved ? 'saved' : ''}`}
                      onClick={() => handleSave(job.id)}
                      title={job.saved ? 'Remove from saved' : 'Save job'}
                    >
                      <FaStar />
                    </button>
                  </div>
                </div>
                
                <div className="job-meta">
                  <div className="meta-item">
                    <FaBuilding className="meta-icon" />
                    <span className="meta-text">{job.company}</span>
                  </div>
                  <div className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    <span className="meta-text">{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <span className="meta-text">{job.type}</span>
                  </div>
                  <div className="meta-item">
                    <FaDollarSign className="meta-icon" />
                    <span className="meta-text">{job.salary}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span className="meta-text">Posted: {job.posted}</span>
                  </div>
                </div>
                
                <div className="job-description">
                  <p>{job.description}</p>
                </div>
                
                <div className="job-requirements">
                  <h4 className="requirements-title">Requirements:</h4>
                  <ul className="requirements-list">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="requirement-item">{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="job-skills">
                  <h4 className="skills-title">Required Skills:</h4>
                  <div className="skills-tags">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="job-actions-footer">
                  {job.applied ? (
                    <button className="applied-button" disabled>
                      ✓ Applied
                    </button>
                  ) : (
                    <button 
                      className="apply-button"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply Now
                    </button>
                  )}
                  
                  <button 
                    className="view-details-button"
                    onClick={() => console.log(`View details for job ${job.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="no-jobs">
              <FaStar className="no-jobs-icon" />
              <h3 className="no-jobs-title">No jobs found</h3>
              <p className="no-jobs-message">Try adjusting your filters to see more opportunities</p>
              <button 
                className="reset-filters-button"
                onClick={() => setFilters({ location: '', type: '', minMatch: 0 })}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities;

import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import './JobRecommendationCard.css';

const JobRecommendationsCard = () => {
  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      skills: ['React', 'JavaScript', 'CSS'],
      match: 95,
    },
    {
      id: 2,
      title: 'Junior Software Engineer',
      company: 'Innovate Co.',
      location: 'New York, NY',
      skills: ['JavaScript', 'HTML', 'CSS'],
      match: 87,
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'Digital Agency',
      location: 'Chicago, IL',
      skills: ['React', 'Node.js', 'MongoDB'],
      match: 82,
    },
    {
      id: 4,
      title: 'UI Developer',
      company: 'Design Studio',
      location: 'Remote',
      skills: ['React', 'TypeScript', 'Figma'],
      match: 78,
    },
  ];

  const handleApply = (jobId) => {
    console.log(`Applying for job ${jobId}`);
  };

  const handleSave = (jobId) => {
    console.log(`Saving job ${jobId}`);
  };

  return (
    <div className="job-recommendations-card">
      <div className="jobs-header">
        <h3 className="jobs-title">Recommended Jobs</h3>
        <button className="browse-all-button" onClick={() => console.log('Browse all jobs')}>
          Browse All
        </button>
      </div>

      <div className="jobs-list">
        {recommendedJobs.map((job) => (
          <div key={job.id} className="job-item">
            <div className="job-header">
              <div className="job-title-container">
                <h4 className="job-title">{job.title}</h4>
                <div className="match-badge">{job.match}% Match</div>
              </div>
              <div className="job-actions">
                <button className="save-button" onClick={() => handleSave(job.id)} title="Save job">
                  <FaStar />
                </button>
              </div>
            </div>

            <div className="job-details">
              <div className="job-company">
                <FaBuilding className="detail-icon" />
                {job.company}
              </div>
              <div className="job-location">
                <FaMapMarkerAlt className="detail-icon" />
                {job.location}
              </div>
            </div>

            <div className="job-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <button className="apply-button" onClick={() => handleApply(job.id)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendationsCard;

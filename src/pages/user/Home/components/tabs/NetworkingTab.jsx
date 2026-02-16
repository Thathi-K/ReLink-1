import React, { useState } from 'react';
import {
  BriefcaseBusiness, Filter, MapPin, Briefcase,
  Building2, SendHorizontal, Clock
} from "lucide-react";

function NetworkingTab({ 
  user, 
  featuredJobs, 
  industries, 
  locations, 
  jobTypes,
  jobCategories,
  onApplyForJob 
}) {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [showJobCategory, setShowJobCategory] = useState("All");

  const filteredJobs = featuredJobs.filter(job => {
    if (selectedIndustry !== "All Industries" && job.industry !== selectedIndustry) return false;
    if (selectedLocation !== "All Locations" && job.location !== selectedLocation) return false;
    if (jobType !== "All Types" && job.type !== jobType) return false;
    if (showJobCategory !== "All" && job.category !== showJobCategory) return false;
    return true;
  });

  return (
    <div className="networking-tab">
      <div className="networking-header">
        <h3 className="section-title">
          <BriefcaseBusiness size={28} />
          <span>Find Your Next Opportunity</span>
        </h3>
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <FilterGroup
            icon={Filter}
            label="Industry"
            value={selectedIndustry}
            onChange={setSelectedIndustry}
            options={industries}
          />
          <FilterGroup
            icon={MapPin}
            label="Location"
            value={selectedLocation}
            onChange={setSelectedLocation}
            options={locations}
          />
          <FilterGroup
            icon={Briefcase}
            label="Job Type"
            value={jobType}
            onChange={setJobType}
            options={jobTypes}
          />
        </div>
      </div>

      <div className="jobs-section">
        <div className="jobs-header">
          <h4 className="jobs-title">Available Opportunities</h4>
        </div>

        {filteredJobs.length === 0 ? (
          <NoJobsFound />
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={() => onApplyForJob(job)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ icon: Icon, label, value, onChange, options }) {
  return (
    <div className="filter-group">
      <label className="filter-label">
        <Icon size={16} />
        {label}
      </label>
      <select 
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function JobCard({ job, onApply }) {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="company-logo">
          <img src={job.logo} alt={job.company} className="logo-img" />
        </div>
        <div className="job-main-info">
          <h4 className="job-title">{job.title}</h4>
          <p className="job-company">
            <Building2 size={14} />
            <span>{job.company}</span>
          </p>
          <div className="job-match">
            <span className="match-score">{job.matches}</span>
            <span className="job-type">{job.type}</span>
          </div>
        </div>
      </div>

      <div className="job-details">
        <div className="detail-row">
          <div className="detail-item">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="detail-item">
            <span className="salary-icon">R</span>
            <span>{job.salary}</span>
          </div>
        </div>

        <div className="job-description">
          <p>{job.description}</p>
        </div>
      </div>

      <div className="job-footer">
        <div className="job-actions">
          <button className="job-action-btn apply" onClick={onApply}>
            <SendHorizontal size={16} />
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function NoJobsFound() {
  return (
    <div className="no-jobs-found">
      <Briefcase size={48} />
      <h4>No opportunities found</h4>
      <p>Try adjusting your filters</p>
    </div>
  );
}

export default NetworkingTab;
import React, { createContext, useContext, useState, useEffect } from 'react';
import jobService from '../services/jobService';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    setJobs(jobService.getJobs());
    setLoading(false);

    // Subscribe to changes
    const unsubscribe = jobService.subscribe((updatedJobs) => {
      setJobs(updatedJobs.filter(job => job.status === 'active'));
    });

    return unsubscribe;
  }, []);

  const applyForJob = (jobId) => {
    return jobService.applyForJob(jobId, 'current-user-id');
  };

  const toggleSaveJob = (jobId) => {
    return jobService.toggleSaveJob(jobId, 'current-user-id');
  };

  const filterJobs = (filters) => {
    return jobService.filterJobs(filters);
  };

  const value = {
    jobs,
    loading,
    applyForJob,
    toggleSaveJob,
    filterJobs,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
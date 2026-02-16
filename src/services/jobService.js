// This will act as a shared service between recruiter and user dashboards
class JobService {
  constructor() {
    // Initialize with some sample jobs
    this.jobs = [
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
        saved: false,
        postedBy: 'recruiter-1', // ID of recruiter who posted
        companyId: 1,
        applicants: 0,
        status: 'active',
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
        saved: false,
        postedBy: 'recruiter-1',
        companyId: 2,
        applicants: 0,
        status: 'active',
      },
      // ... other jobs
    ];

    this.listeners = [];
  }

  // Subscribe to changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notify all listeners of changes
  notify() {
    this.listeners.forEach(listener => listener(this.jobs));
  }

  // Get all active jobs
  getJobs() {
    return this.jobs.filter(job => job.status === 'active');
  }

  // Add a new job (called by recruiter)
  addJob(jobData, recruiterId) {
    const newJob = {
      id: this.jobs.length + 1,
      ...jobData,
      posted: new Date().toISOString().split('T')[0],
      applied: false,
      saved: false,
      postedBy: recruiterId,
      applicants: 0,
      status: 'active',
      match: this.calculateMatch(jobData), // You'd implement this based on user profile
    };
    this.jobs.push(newJob);
    this.notify();
    return newJob;
  }

  // Update a job (called by recruiter)
  updateJob(jobId, updatedData) {
    const index = this.jobs.findIndex(job => job.id === jobId);
    if (index !== -1) {
      this.jobs[index] = { ...this.jobs[index], ...updatedData };
      this.notify();
      return this.jobs[index];
    }
    return null;
  }

  // Delete a job (called by recruiter)
  deleteJob(jobId) {
    this.jobs = this.jobs.filter(job => job.id !== jobId);
    this.notify();
  }

  // Apply for a job (called by user)
  applyForJob(jobId, userId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (job) {
      job.applied = true;
      job.applicants += 1;
      this.notify();
      return true;
    }
    return false;
  }

  // Save/unsave a job (called by user)
  toggleSaveJob(jobId, userId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (job) {
      job.saved = !job.saved;
      this.notify();
      return job.saved;
    }
    return false;
  }

  // Filter jobs for user
  filterJobs(filters = {}) {
    return this.getJobs().filter(job => {
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.type && job.type !== filters.type) return false;
      if (filters.minMatch && job.match < filters.minMatch) return false;
      if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }

  // Calculate match percentage (you'd implement based on user skills/experience)
  calculateMatch(job) {
    // This is a placeholder - implement actual matching logic
    return Math.floor(Math.random() * 30) + 70; // Random between 70-100
  }

  // Get jobs posted by a specific recruiter
  getRecruiterJobs(recruiterId) {
    return this.jobs.filter(job => job.postedBy === recruiterId);
  }
}

// Create a singleton instance
const jobService = new JobService();
export default jobService;
export const mockData = {
  user: {
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    credibilityScore: 75,
    profileCompletion: 75,
  },
  
  stats: [
    { id: 1, title: "Credibility Score", value: "75%", icon: "⭐", trend: "+5%" },
    { id: 2, title: "Profile Views", value: "128", icon: "👁️", trend: "+12%" },
    { id: 3, title: "Referrals", value: "8", icon: "🤝", trend: "+3" },
    { id: 4, title: "Job Applications", value: "12", icon: "📄", trend: "+5" },
  ],
  
  profileTasks: [
    { id: 1, label: "Basic information added", completed: true },
    { id: 2, label: "Skills & certifications added", completed: true },
    { id: 3, label: "Add video introduction", completed: false },
    { id: 4, label: "Complete work history", completed: false },
  ],
  
  activities: [
    { id: 1, action: "Profile updated", time: "2 hours ago", icon: "📝" },
    { id: 2, action: "Applied for Job: Frontend Developer", time: "1 day ago", icon: "💼" },
    { id: 3, action: "Received referral from John D.", time: "2 days ago", icon: "🤝" },
    { id: 4, action: "Skill added: React.js", time: "3 days ago", icon: "⚡" },
    { id: 5, action: "Completed certification: JavaScript Basics", time: "1 week ago", icon: "🏆" },
  ],
  
  recommendedJobs: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      skills: ["React", "JavaScript", "CSS"],
      match: 95,
    },
    {
      id: 2,
      title: "Junior Software Engineer",
      company: "Innovate Co.",
      location: "New York, NY",
      skills: ["JavaScript", "HTML", "CSS"],
      match: 87,
    },
    {
      id: 3,
      title: "Web Developer",
      company: "Digital Agency",
      location: "Chicago, IL",
      skills: ["React", "Node.js", "MongoDB"],
      match: 82,
    },
    {
      id: 4,
      title: "UI Developer",
      company: "Design Studio",
      location: "Remote",
      skills: ["React", "TypeScript", "Figma"],
      match: 78,
    },
  ],
  
  quickActions: [
    {
      id: 1,
      title: "Request Referrals",
      icon: "🤝",
      description: "Ask connections for referrals",
    },
    {
      id: 2,
      title: "Update Skills",
      icon: "⚡",
      description: "Add or update your skills",
    },
    {
      id: 3,
      title: "Browse Skills",
      icon: "🔍",
      description: "Explore skills to learn",
    },
    {
      id: 4,
      title: "Mentor Session",
      icon: "👨‍🏫",
      description: "Schedule mentorship",
    },
  ],
  
  referrals: {
    verified: [
      { id: 1, name: "John Smith", position: "Senior Developer", date: "2024-01-15" },
      { id: 2, name: "Sarah Johnson", position: "Team Lead", date: "2024-01-10" },
      { id: 3, name: "Mike Wilson", position: "CTO", date: "2024-01-05" },
      { id: 4, name: "Emily Brown", position: "HR Manager", date: "2023-12-20" },
    ],
    pending: [
      { id: 5, name: "David Lee", position: "Product Manager", date: "2024-01-18" },
      { id: 6, name: "Lisa Wang", position: "Director of Engineering", date: "2024-01-16" },
    ],
  },
  
  jobs: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-time",
      posted: "2024-01-15",
      salary: "$80,000 - $100,000",
      match: 95,
    },
    {
      id: 2,
      title: "Junior Software Engineer",
      company: "Innovate Co.",
      location: "New York, NY",
      type: "Full-time",
      posted: "2024-01-14",
      salary: "$70,000 - $85,000",
      match: 87,
    },
    {
      id: 3,
      title: "Web Developer",
      company: "Digital Agency",
      location: "Chicago, IL",
      type: "Contract",
      posted: "2024-01-13",
      salary: "$60/hr",
      match: 82,
    },
    {
      id: 4,
      title: "UI Developer",
      company: "Design Studio",
      location: "Remote",
      type: "Full-time",
      posted: "2024-01-12",
      salary: "$85,000 - $110,000",
      match: 78,
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "Startup XYZ",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2024-01-10",
      salary: "$90,000 - $120,000",
      match: 75,
    },
  ],
};
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  Briefcase,
  FileText,
  Building2,
  MessageSquare,
  Bell,
  ClipboardList,
  Eye,
  Users,
  Plus,
  TrendingUp,
  ArrowRight,
  Star,
  LogOut,
  X,
  DollarSign,
  MapPin,
  Clock,
  Filter,
  ArrowUpDown,
  Heart,
  Send,
  Edit2,
  Trash2,
  Check,
  XCircle,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  Bookmark,
  ChevronDown,
  Globe,
} from "lucide-react";

function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [editingJob, setEditingJob] = useState(null);
  const [favorites, setFavorites] = useState([1, 2]); // IDs of favorited candidates
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  const notificationRef = useRef(null);

  // Filtering and Sorting States
  const [candidateFilter, setCandidateFilter] = useState("all"); // all, favorites
  const [candidateSortBy, setCandidateSortBy] = useState("score"); // score, name
  const [applicationFilter, setApplicationFilter] = useState("all"); // all, pending, accepted, rejected
  const [applicationSortBy, setApplicationSortBy] = useState("recent"); // recent, score

  // Form state for new/edit job
  const [jobForm, setJobForm] = useState({
    title: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
  });

  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    name: "TechCorp Inc.",
    industry: "Technology",
    size: "50-200 employees",
    website: "https://techcorp.example.com",
    location: "San Francisco, CA",
    description: "We are a leading technology company focused on innovative solutions.",
    benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours"],
  });

  // Mock data - Expanded
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "IT Support Specialist",
      location: "Remote",
      type: "full-time",
      salary: "$50k - $70k",
      description: "We're looking for an experienced IT Support Specialist to join our team. You'll be responsible for providing technical support to our employees and maintaining our IT infrastructure.",
      postedDate: "2024-01-15",
      applicants: 23,
      status: "active",
    },
    {
      id: 2,
      title: "Frontend Developer",
      location: "New York, NY",
      type: "full-time",
      salary: "$90k - $130k",
      description: "Join our frontend team to build amazing user experiences. You'll work with React, TypeScript, and modern web technologies.",
      postedDate: "2024-01-18",
      applicants: 15,
      status: "active",
    },
    {
      id: 3,
      title: "Network Engineer",
      location: "Austin, TX",
      type: "full-time",
      salary: "$80k - $110k",
      description: "We need a skilled Network Engineer to design, implement, and maintain our network infrastructure.",
      postedDate: "2024-01-20",
      applicants: 9,
      status: "active",
    },
    {
      id: 4,
      title: "Product Manager",
      location: "San Francisco, CA",
      type: "full-time",
      salary: "$120k - $160k",
      description: "Lead product development and strategy for our core products. Work with cross-functional teams to deliver value to customers.",
      postedDate: "2024-01-10",
      applicants: 31,
      status: "active",
    },
    {
      id: 5,
      title: "UX Designer",
      location: "Remote",
      type: "contract",
      salary: "$70k - $100k",
      description: "Create beautiful and intuitive user experiences. Conduct user research and design wireframes and prototypes.",
      postedDate: "2024-01-05",
      applicants: 18,
      status: "active",
    },
  ]);

  const stats = [
    {
      title: "Active Job Postings",
      value: jobPostings.length.toString(),
      change: "+2 this month",
      icon: Briefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Applications",
      value: "47",
      change: "+12 this week",
      icon: ClipboardList,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Candidates Viewed",
      value: "89",
      change: "+28 this month",
      icon: Eye,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Successful Hires",
      value: "3",
      change: "This quarter",
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Application Received",
      message: "Marcus Johnson applied for IT Support Specialist",
      time: "2 hours ago",
      read: false,
      type: "application",
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message: "Interview with Sarah Williams confirmed for tomorrow",
      time: "5 hours ago",
      read: false,
      type: "interview",
    },
    {
      id: 3,
      title: "Job Posting Expiring Soon",
      message: "Frontend Developer position expires in 3 days",
      time: "1 day ago",
      read: true,
      type: "alert",
    },
  ]);

  const allCandidates = [
    {
      id: 1,
      name: "Marcus Johnson",
      role: "IT Support Specialist",
      score: 78,
      email: "marcus.j@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      experience: "5 years",
      skills: ["IT Support", "Hardware Repair", "Windows Server", "Networking"],
      linkedin: "linkedin.com/in/marcusj",
      github: "github.com/marcusj",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "David Williams",
      role: "IT Support Specialist",
      score: 72,
      email: "d.williams@email.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      experience: "3 years",
      skills: ["Help Desk", "Troubleshooting", "Active Directory"],
      linkedin: "linkedin.com/in/davidw",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 3,
      name: "Robert Garcia",
      role: "Network Engineer",
      score: 92,
      email: "robert.garcia@email.com",
      phone: "+1 (555) 345-6789",
      location: "San Francisco, CA",
      experience: "8 years",
      skills: ["Cisco", "Network Security", "Routing", "Firewalls", "VPN"],
      linkedin: "linkedin.com/in/robertg",
      github: "github.com/robertg",
      avatar: null,
      initials: "RG",
    },
    {
      id: 4,
      name: "Sarah Chen",
      role: "Software Developer",
      score: 88,
      email: "sarah.chen@email.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      experience: "6 years",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      linkedin: "linkedin.com/in/sarahc",
      github: "github.com/sarahchen",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "Frontend Developer",
      score: 85,
      email: "emily.davis@email.com",
      phone: "+1 (555) 567-8901",
      location: "Remote",
      experience: "4 years",
      skills: ["React", "TypeScript", "CSS", "UI/UX", "Figma"],
      linkedin: "linkedin.com/in/emilyd",
      github: "github.com/emilydavis",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 6,
      name: "Michael Brown",
      role: "Product Manager",
      score: 81,
      email: "michael.b@email.com",
      phone: "+1 (555) 678-9012",
      location: "Boston, MA",
      experience: "7 years",
      skills: ["Product Strategy", "Agile", "Roadmapping", "Analytics"],
      linkedin: "linkedin.com/in/michaelb",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
  ];

  const quickActions = [
    {
      title: "Post New Job",
      icon: Plus,
      isPrimary: true,
      action: "modal",
    },
    {
      title: "Browse Candidates",
      icon: Users,
      isPrimary: false,
      view: "find-candidates",
    },
    {
      title: "Review Applications",
      icon: ClipboardList,
      isPrimary: false,
      view: "applications",
    },
    {
      title: "Company Profile",
      icon: TrendingUp,
      isPrimary: false,
      view: "company-profile",
    },
  ];

  const [applications, setApplications] = useState([
    {
      id: 1,
      candidateId: 1,
      name: "Marcus Johnson",
      role: "IT Support Specialist",
      jobId: 1,
      time: "2 hours ago",
      score: 78,
      referrals: 4,
      avatar: "https://i.pravatar.cc/150?img=12",
      status: "pending",
    },
    {
      id: 2,
      candidateId: 2,
      name: "David Williams",
      role: "IT Support Specialist",
      jobId: 1,
      time: "5 hours ago",
      score: 72,
      referrals: 3,
      avatar: "https://i.pravatar.cc/150?img=13",
      status: "pending",
    },
    {
      id: 3,
      candidateId: 5,
      name: "Emily Davis",
      role: "Frontend Developer",
      jobId: 2,
      time: "1 day ago",
      score: 85,
      referrals: 5,
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "accepted",
    },
    {
      id: 4,
      candidateId: 3,
      name: "Robert Garcia",
      role: "Network Engineer",
      jobId: 3,
      time: "2 days ago",
      score: 92,
      referrals: 8,
      avatar: null,
      status: "pending",
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      candidateId: 1,
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Thank you for considering my application!",
      time: "10 min ago",
      unread: 2,
      conversation: [
        {
          id: 1,
          sender: "candidate",
          message: "Hi! I just applied for the IT Support Specialist position.",
          time: "2 hours ago",
        },
        {
          id: 2,
          sender: "recruiter",
          message: "Hello Marcus! We received your application and are reviewing it.",
          time: "1 hour ago",
        },
        {
          id: 3,
          sender: "candidate",
          message: "Thank you for considering my application!",
          time: "10 min ago",
        },
      ],
    },
    {
      id: 2,
      candidateId: 5,
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=9",
      lastMessage: "When would be a good time for an interview?",
      time: "1 hour ago",
      unread: 1,
      conversation: [
        {
          id: 1,
          sender: "recruiter",
          message: "Hi Emily, we'd like to schedule an interview with you.",
          time: "3 hours ago",
        },
        {
          id: 2,
          sender: "candidate",
          message: "That's great! When would be a good time for an interview?",
          time: "1 hour ago",
        },
      ],
    },
    {
      id: 3,
      candidateId: 3,
      name: "Robert Garcia",
      avatar: null,
      initials: "RG",
      lastMessage: "I have 8 years of network engineering experience.",
      time: "3 hours ago",
      unread: 0,
      conversation: [
        {
          id: 1,
          sender: "recruiter",
          message: "Hi Robert, could you tell us more about your networking experience?",
          time: "5 hours ago",
        },
        {
          id: 2,
          sender: "candidate",
          message: "I have 8 years of network engineering experience.",
          time: "3 hours ago",
        },
      ],
    },
  ]);

  const topCandidates = allCandidates
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const recentApplications = applications.slice(0, 2);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      view: "dashboard",
    },
    {
      id: "candidates",
      label: "Find Candidates",
      icon: Search,
      view: "find-candidates",
    },
    {
      id: "postings",
      label: "Job Postings",
      icon: Briefcase,
      view: "job-postings",
    },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      view: "applications",
    },
    {
      id: "company",
      label: "Company Profile",
      icon: Building2,
      view: "company-profile",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      view: "messages",
    },
  ];

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const handleNavClick = (item) => {
    setActiveNav(item.id);
    setCurrentView(item.view);
  };

  const handleActionClick = (action) => {
    if (action.action === "modal") {
      setShowJobModal(true);
      setEditingJob(null);
      setJobForm({
        title: "",
        location: "",
        type: "full-time",
        salary: "",
        description: "",
      });
    } else if (action.view) {
      setCurrentView(action.view);
      setActiveNav(
        action.view === "find-candidates"
          ? "candidates"
          : action.view === "applications"
            ? "applications"
            : action.view === "company-profile"
              ? "company"
              : "dashboard"
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = allCandidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      // Edit existing job
      setJobPostings(
        jobPostings.map((job) =>
          job.id === editingJob.id
            ? {
                ...job,
                ...jobForm,
              }
            : job
        )
      );
      alert("Job updated successfully!");
    } else {
      // Add new job
      const newJob = {
        id: jobPostings.length + 1,
        ...jobForm,
        postedDate: new Date().toISOString().split("T")[0],
        applicants: 0,
        status: "active",
      };
      setJobPostings([...jobPostings, newJob]);
      alert("Job posted successfully!");
    }
    setShowJobModal(false);
    setEditingJob(null);
    setJobForm({
      title: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
    });
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
    });
    setShowJobModal(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobPostings(jobPostings.filter((job) => job.id !== jobId));
      alert("Job posting deleted!");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      console.log("User logged out");
      alert("Logged out successfully!");
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const toggleFavorite = (candidateId) => {
    if (favorites.includes(candidateId)) {
      setFavorites(favorites.filter((id) => id !== candidateId));
    } else {
      setFavorites([...favorites, candidateId]);
    }
  };

  const handleApplicationStatus = (applicationId, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    alert(`Application ${newStatus}!`);
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && selectedMessage) {
      const newMessage = {
        id: selectedMessage.conversation.length + 1,
        sender: "recruiter",
        message: messageText,
        time: "Just now",
      };
      setMessages(
        messages.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                conversation: [...msg.conversation, newMessage],
                lastMessage: messageText,
                time: "Just now",
              }
            : msg
        )
      );
      setMessageText("");
      // Update selectedMessage
      setSelectedMessage({
        ...selectedMessage,
        conversation: [...selectedMessage.conversation, newMessage],
        lastMessage: messageText,
        time: "Just now",
      });
    }
  };

  const handleCompanyProfileUpdate = (e) => {
    e.preventDefault();
    alert("Company profile updated successfully!");
  };

  // Filter and sort candidates
  const getFilteredCandidates = () => {
    let filtered = [...allCandidates];

    // Apply filter
    if (candidateFilter === "favorites") {
      filtered = filtered.filter((c) => favorites.includes(c.id));
    }

    // Apply sorting
    if (candidateSortBy === "score") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (candidateSortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  // Filter and sort applications
  const getFilteredApplications = () => {
    let filtered = [...applications];

    // Apply filter
    if (applicationFilter !== "all") {
      filtered = filtered.filter((app) => app.status === applicationFilter);
    }

    // Apply sorting
    if (applicationSortBy === "score") {
      filtered.sort((a, b) => b.score - a.score);
    }
    // recent is default order

    return filtered;
  };

  // Render different views based on currentView state
  const renderViewContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    data-testid={`stat-card-${index}`}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {stat.title}
                        </p>
                        <h3 className="text-4xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                      </div>
                      <div
                        className={`${stat.iconBg} ${stat.iconColor} p-3 rounded-xl`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    data-testid={`action-${action.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`p-8 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                      action.isPrimary
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-900 border-gray-200 hover:border-emerald-500"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        action.isPrimary ? "text-white" : "text-gray-600"
                      }`}
                    />
                    <p
                      className={`font-semibold ${
                        action.isPrimary ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {action.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Bottom Section - Recent Applications & Top Candidates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <div
                className="bg-white rounded-xl p-6 border border-gray-200"
                data-testid="recent-applications"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Recent Applications
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Latest candidates who applied to your jobs
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    data-testid="view-all-applications"
                    onClick={() => {
                      setCurrentView("applications");
                      setActiveNav("applications");
                    }}
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      data-testid={`application-${application.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        const candidate = allCandidates.find(
                          (c) => c.id === application.candidateId
                        );
                        if (candidate) handleViewCandidate(candidate);
                      }}
                    >
                      <img
                        src={application.avatar}
                        alt={application.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">
                          {application.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Applied for: {application.role}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {application.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-bold text-gray-900">
                              {application.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {application.referrals} referrals
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Candidates */}
              <div
                className="bg-white rounded-xl p-6 border border-gray-200"
                data-testid="top-candidates"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Top Candidates
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Highest credibility scores matching your criteria
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    data-testid="view-all-candidates"
                    onClick={() => {
                      setCurrentView("find-candidates");
                      setActiveNav("candidates");
                    }}
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {topCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      data-testid={`candidate-${candidate.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewCandidate(candidate)}
                    >
                      {candidate.avatar ? (
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {candidate.initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                          {candidate.score} Score
                        </span>
                        <button
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          data-testid={`view-profile-${candidate.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCandidate(candidate);
                          }}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "find-candidates":
        const filteredCandidates = getFilteredCandidates();
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Find Candidates
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Browse and connect with talented professionals
                </p>
              </div>
              <div className="flex gap-3">
                {/* Filter */}
                <div className="relative">
                  <select
                    value={candidateFilter}
                    onChange={(e) => setCandidateFilter(e.target.value)}
                    data-testid="candidate-filter"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                  >
                    <option value="all">All Candidates</option>
                    <option value="favorites">Favorites Only</option>
                  </select>
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {/* Sort */}
                <div className="relative">
                  <select
                    value={candidateSortBy}
                    onChange={(e) => setCandidateSortBy(e.target.value)}
                    data-testid="candidate-sort"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                  >
                    <option value="score">Sort by Score</option>
                    <option value="name">Sort by Name</option>
                  </select>
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  data-testid={`candidate-card-${candidate.id}`}
                  className="p-5 border border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer relative"
                  onClick={() => handleViewCandidate(candidate)}
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(candidate.id);
                    }}
                    data-testid={`favorite-${candidate.id}`}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(candidate.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>

                  <div className="flex items-start gap-4">
                    {candidate.avatar ? (
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {candidate.initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pr-8">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {candidate.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {candidate.role}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {candidate.location}
                        </span>
                        <span>{candidate.experience}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {candidate.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{candidate.skills.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                          Score: {candidate.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No candidates found</p>
              </div>
            )}
          </div>
        );

      case "applications":
        const filteredApplications = getFilteredApplications();
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Applications
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and review candidate applications
                </p>
              </div>
              <div className="flex gap-3">
                {/* Filter */}
                <div className="relative">
                  <select
                    value={applicationFilter}
                    onChange={(e) => setApplicationFilter(e.target.value)}
                    data-testid="application-filter"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                  >
                    <option value="all">All Applications</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {/* Sort */}
                <div className="relative">
                  <select
                    value={applicationSortBy}
                    onChange={(e) => setApplicationSortBy(e.target.value)}
                    data-testid="application-sort"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="score">Highest Score</option>
                  </select>
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  data-testid={`application-card-${app.id}`}
                  className="p-5 border border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {app.avatar ? (
                      <img
                        src={app.avatar}
                        alt={app.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        RG
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {app.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Applied for: {app.role}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {app.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-amber-500 mb-2">
                            <Star className="w-5 h-5 fill-current" />
                            <span className="font-bold text-gray-900 text-lg">
                              {app.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {app.referrals} referrals
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            app.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : app.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>

                        {app.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleApplicationStatus(app.id, "accepted")
                              }
                              data-testid={`accept-${app.id}`}
                              className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1"
                            >
                              <Check className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleApplicationStatus(app.id, "rejected")
                              }
                              data-testid={`reject-${app.id}`}
                              className="px-4 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            const candidate = allCandidates.find(
                              (c) => c.id === app.candidateId
                            );
                            if (candidate) handleViewCandidate(candidate);
                          }}
                          data-testid={`view-details-${app.id}`}
                          className="ml-auto px-4 py-1.5 border border-emerald-500 text-emerald-600 text-sm font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No applications found</p>
              </div>
            )}
          </div>
        );

      case "company-profile":
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Company Profile
            </h2>
            <form onSubmit={handleCompanyProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyProfile.name}
                    onChange={(e) =>
                      setCompanyProfile({
                        ...companyProfile,
                        name: e.target.value,
                      })
                    }
                    data-testid="company-name-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={companyProfile.industry}
                    onChange={(e) =>
                      setCompanyProfile({
                        ...companyProfile,
                        industry: e.target.value,
                      })
                    }
                    data-testid="company-industry-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Company Size
                  </label>
                  <select
                    value={companyProfile.size}
                    onChange={(e) =>
                      setCompanyProfile({
                        ...companyProfile,
                        size: e.target.value,
                      })
                    }
                    data-testid="company-size-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="50-200 employees">50-200 employees</option>
                    <option value="200-500 employees">200-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={companyProfile.website}
                    onChange={(e) =>
                      setCompanyProfile({
                        ...companyProfile,
                        website: e.target.value,
                      })
                    }
                    data-testid="company-website-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={companyProfile.location}
                    onChange={(e) =>
                      setCompanyProfile({
                        ...companyProfile,
                        location: e.target.value,
                      })
                    }
                    data-testid="company-location-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    value={companyProfile.description}
                    onChange={(e) =>
                      setCompanyProfile({
                        ...companyProfile,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    data-testid="company-description-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Benefits & Perks
                </label>
                <div className="flex flex-wrap gap-2">
                  {companyProfile.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                data-testid="save-company-profile"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </form>
          </div>
        );

      case "messages":
        return (
          <div className="bg-white rounded-xl border border-gray-200 h-[600px] flex">
            {/* Messages List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    data-testid={`message-${msg.id}`}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === msg.id ? "bg-emerald-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {msg.avatar ? (
                        <img
                          src={msg.avatar}
                          alt={msg.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {msg.initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            {msg.name}
                          </h3>
                          <span className="text-xs text-gray-400">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {msg.lastMessage}
                        </p>
                        {msg.unread > 0 && (
                          <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                            {msg.unread} new
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedMessage ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                    {selectedMessage.avatar ? (
                      <img
                        src={selectedMessage.avatar}
                        alt={selectedMessage.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedMessage.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    data-testid="chat-messages"
                  >
                    {selectedMessage.conversation.map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex ${
                          conv.sender === "recruiter"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            conv.sender === "recruiter"
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{conv.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              conv.sender === "recruiter"
                                ? "text-emerald-100"
                                : "text-gray-500"
                            }`}
                          >
                            {conv.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t border-gray-200"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message..."
                        data-testid="message-input"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="submit"
                        data-testid="send-message-button"
                        className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "job-postings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Job Postings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your active job listings
                </p>
              </div>
              <button
                onClick={() => handleActionClick({ action: "modal" })}
                data-testid="post-new-job-button"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Post New Job
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {jobPostings.map((job) => (
                <div
                  key={job.id}
                  data-testid={`job-card-${job.id}`}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditJob(job)}
                            data-testid={`edit-job-${job.id}`}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            data-testid={`delete-job-${job.id}`}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Posted: {job.postedDate}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                            {job.applicants} Applicants
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentView("applications");
                            setActiveNav("applications");
                          }}
                          className="px-4 py-2 border border-emerald-500 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          View Applications
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">Select a view from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" data-testid="recruiter-dashboard">
      {/* Sidebar */}
      <aside
        className="w-64 bg-white border-r border-gray-200 flex flex-col"
        data-testid="sidebar"
      >
        {/* Logo */}
        <div
          className="h-20 flex items-center px-6 border-b border-gray-200"
          data-testid="logo-section"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ReLink</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1" data-testid="navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                data-testid={`nav-${item.id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
                {item.id === "messages" &&
                  messages.filter((m) => m.unread > 0).length > 0 && (
                    <span className="ml-auto px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      {messages.reduce((sum, m) => sum + m.unread, 0)}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200" data-testid="user-profile">
          <div className="flex items-center gap-3 px-2 py-3">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Sarah Chen"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Sarah Chen
              </p>
              <p className="text-xs text-gray-500 truncate">
                sarah@techcorp.com
              </p>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              data-testid="logout-button"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between"
          data-testid="top-bar"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Recruiter Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back, Sarah!</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="search-input"
                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </form>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                data-testid="notifications-button"
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div
                  className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                  data-testid="notifications-dropdown"
                >
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <button
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        onClick={markAllAsRead}
                        data-testid="mark-all-read"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        data-testid={`notification-${notification.id}`}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? "bg-emerald-50" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              notification.type === "application"
                                ? "bg-blue-100 text-blue-600"
                                : notification.type === "interview"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {notification.type === "application" ? (
                              <FileText className="w-5 h-5" />
                            ) : notification.type === "interview" ? (
                              <Calendar className="w-5 h-5" />
                            ) : (
                              <Bell className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-gray-900 text-sm">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button
                      className="w-full text-center text-sm font-medium text-emerald-600 hover:text-emerald-700 py-2"
                      onClick={() => setShowNotifications(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8" data-testid="main-content">
          {renderViewContent()}
        </main>
      </div>

      {/* Post New Job Modal */}
      {showJobModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          data-testid="job-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowJobModal(false);
            }
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingJob ? "Edit Job" : "Post New Job"}
              </h2>
              <button
                onClick={() => {
                  setShowJobModal(false);
                  setEditingJob(null);
                }}
                data-testid="close-job-modal"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="p-6" data-testid="job-form">
              <div className="space-y-5">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, title: e.target.value })
                    }
                    placeholder="e.g. Senior Frontend Developer"
                    data-testid="job-title-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, location: e.target.value })
                    }
                    placeholder="e.g. San Francisco, CA (Remote)"
                    data-testid="job-location-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Job Type and Salary */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Job Type *
                    </label>
                    <select
                      value={jobForm.type}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, type: e.target.value })
                      }
                      data-testid="job-type-select"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Salary Range
                    </label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, salary: e.target.value })
                      }
                      placeholder="e.g. $80k - $120k"
                      data-testid="job-salary-input"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    required
                    value={jobForm.description}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, description: e.target.value })
                    }
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={6}
                    data-testid="job-description-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowJobModal(false);
                    setEditingJob(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  data-testid="cancel-job-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  data-testid="submit-job-button"
                >
                  {editingJob ? "Update Job" : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidate Detail Modal */}
      {showCandidateModal && selectedCandidate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          data-testid="candidate-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCandidateModal(false);
              setSelectedCandidate(null);
            }
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Candidate Profile
              </h2>
              <button
                onClick={() => {
                  setShowCandidateModal(false);
                  setSelectedCandidate(null);
                }}
                data-testid="close-candidate-modal"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6" data-testid="candidate-details">
              {/* Header */}
              <div className="flex items-start gap-6 mb-6">
                {selectedCandidate.avatar ? (
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {selectedCandidate.initials}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedCandidate.name}
                      </h3>
                      <p className="text-lg text-gray-600 mt-1">
                        {selectedCandidate.role}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(selectedCandidate.id)}
                      data-testid="modal-favorite-button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.includes(selectedCandidate.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 text-lg font-bold rounded-lg">
                      Score: {selectedCandidate.score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{selectedCandidate.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{selectedCandidate.experience}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {selectedCandidate.linkedin && (
                  <a
                    href={`https://${selectedCandidate.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {selectedCandidate.github && (
                  <a
                    href={`https://${selectedCandidate.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
                  Schedule Interview
                </button>
                <button className="flex-1 px-6 py-3 border border-emerald-500 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          data-testid="search-results-modal"
          onClick={() => setSearchResults([])}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length})
              </h2>
              <button
                onClick={() => setSearchResults([])}
                data-testid="close-search-results"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {searchResults.map((candidate) => (
                <div
                  key={candidate.id}
                  data-testid={`search-result-${candidate.id}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
                  onClick={() => {
                    handleViewCandidate(candidate);
                    setSearchResults([]);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-gray-600">{candidate.role}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                      {candidate.score} Score
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;

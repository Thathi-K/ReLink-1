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
} from "lucide-react";

function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard"); // For routing alternative
  const notificationRef = useRef(null);

  // Form state for new job
  const [jobForm, setJobForm] = useState({
    title: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
  });

  // Mock data
  const stats = [
    {
      title: "Active Job Postings",
      value: "5",
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

  const notifications = [
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
  ];

  const allCandidates = [
    { id: 1, name: "Marcus Johnson", role: "IT Support Specialist", score: 78 },
    { id: 2, name: "David Williams", role: "IT Support Specialist", score: 72 },
    { id: 3, name: "Robert Garcia", role: "Network Engineer", score: 92 },
    { id: 4, name: "Sarah Chen", role: "Software Developer", score: 88 },
    { id: 5, name: "Emily Davis", role: "Frontend Developer", score: 85 },
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

  const recentApplications = [
    {
      id: 1,
      name: "Marcus Johnson",
      role: "IT Support Specialist",
      time: "2 hours ago",
      score: 78,
      referrals: 4,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "David Williams",
      role: "IT Support Specialist",
      time: "5 hours ago",
      score: 72,
      referrals: 3,
      avatar: "https://i.pravatar.cc/150?img=13",
    },
  ];

  const topCandidates = [
    {
      id: 1,
      name: "Robert Garcia",
      initials: "RG",
      score: 92,
      skills: ["IT Support", "Networking", "+1"],
      avatar: null,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      score: 78,
      skills: ["IT Support", "Hardware Repair", "+1"],
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
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
    } else if (action.view) {
      setCurrentView(action.view);
      setActiveNav(action.view === "find-candidates" ? "candidates" : 
                  action.view === "applications" ? "applications" : 
                  action.view === "company-profile" ? "company" : "dashboard");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = allCandidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.role.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
      console.log("Search results:", results);
    }
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    console.log("New job posted:", jobForm);
    setShowJobModal(false);
    setJobForm({
      title: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
    });
    alert("Job posted successfully!");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      console.log("User logged out");
      // In a real app, you would clear authentication and redirect
      window.location.href = "/login"; // Simple redirect without router
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (notificationId) => {
    console.log("Marking notification as read:", notificationId);
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
                        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
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
                      className={`w-8 h-8 mx-auto mb-3 ${action.isPrimary ? "text-white" : "text-gray-600"}`}
                    />
                    <p
                      className={`font-semibold ${action.isPrimary ? "text-white" : "text-gray-900"}`}
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
                      onClick={() => console.log(`View application: ${application.name}`)}
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
                      onClick={() =>
                        console.log(`View profile: ${candidate.name}`)
                      }
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
                          {candidate.skills.map((skill, idx) => (
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
                            console.log(`View profile: ${candidate.name}`)
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
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Candidates</h2>
            <div className="space-y-4">
              {allCandidates.map((candidate) => (
                <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-gray-600">{candidate.role}</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                      Score: {candidate.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "applications":
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={app.avatar} alt={app.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-semibold">{app.name}</h3>
                      <p className="text-gray-600">{app.role}</p>
                      <p className="text-sm text-gray-500">{app.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "company-profile":
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Profile</h2>
            <p className="text-gray-600">Company profile content would go here.</p>
          </div>
        );
      
      case "messages":
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <p className="text-gray-600">Messages content would go here.</p>
          </div>
        );
      
      case "job-postings":
        return (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Postings</h2>
            <p className="text-gray-600">Job postings content would go here.</p>
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
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div
          className="p-4 border-t border-gray-200"
          data-testid="user-profile"
        >
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
                placeholder="Search..."
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
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
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
                        onClick={() => console.log("Mark all as read")}
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
                              <Clock className="w-5 h-5" />
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
              <h2 className="text-2xl font-bold text-gray-900">Post New Job</h2>
              <button
                onClick={() => setShowJobModal(false)}
                data-testid="close-job-modal"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={handleJobSubmit}
              className="p-6"
              data-testid="job-form"
            >
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
                  onClick={() => setShowJobModal(false)}
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
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {searchResults.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
                  onClick={() => {
                    console.log("View candidate:", candidate);
                    setCurrentView("find-candidates");
                    setActiveNav("candidates");
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
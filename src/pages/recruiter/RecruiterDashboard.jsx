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

// Import components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StatsGrid from './components/StatsGrid';
import QuickActions from './components/QuickActions';
import RecentApplications from './components/RecentApplications';
import TopCandidates from './components/TopCandidates';
import JobModal from './components/JobModal';
import CandidateModal from './components/CandidateModal';
import SearchResults from './components/SearchResults';
import NotificationsDropdown from './components/NotificationsDropdown';

// Import views
import FindCandidatesView from './views/FindCandidatesView';
import ApplicationsView from './views/ApplicationsView';
import CompanyProfileView from './views/CompanyProfileView';
import MessagesView from './views/MessagesView';
import JobPostingsView from './views/JobPostingsView';

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
  const [favorites, setFavorites] = useState([1, 2]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  const notificationRef = useRef(null);

  // Filtering and Sorting States
  const [candidateFilter, setCandidateFilter] = useState("all");
  const [candidateSortBy, setCandidateSortBy] = useState("score");
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [applicationSortBy, setApplicationSortBy] = useState("recent");

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

  // Mock data
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "IT Support Specialist",
      location: "Remote",
      type: "full-time",
      salary: "$50k - $70k",
      description: "We're looking for an experienced IT Support Specialist to join our team.",
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
      description: "Join our frontend team to build amazing user experiences.",
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
      description: "We need a skilled Network Engineer to design and maintain our network infrastructure.",
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
      description: "Lead product development and strategy for our core products.",
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
      description: "Create beautiful and intuitive user experiences.",
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
      initials: "RG",
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
      alert("Logged out successfully!");
    }
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

    if (candidateFilter === "favorites") {
      filtered = filtered.filter((c) => favorites.includes(c.id));
    }

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

    if (applicationFilter !== "all") {
      filtered = filtered.filter((app) => app.status === applicationFilter);
    }

    if (applicationSortBy === "score") {
      filtered.sort((a, b) => b.score - a.score);
    }

    return filtered;
  };

  // Render different views
  const renderViewContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            <StatsGrid stats={stats} />
            <QuickActions 
              actions={quickActions} 
              onActionClick={handleActionClick} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentApplications 
                applications={recentApplications}
                candidates={allCandidates}
                onViewAll={() => {
                  setCurrentView("applications");
                  setActiveNav("applications");
                }}
                onViewCandidate={handleViewCandidate}
              />
              <TopCandidates 
                candidates={topCandidates}
                favorites={favorites}
                onViewAll={() => {
                  setCurrentView("find-candidates");
                  setActiveNav("candidates");
                }}
                onViewCandidate={handleViewCandidate}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </>
        );

      case "find-candidates":
        return (
          <FindCandidatesView
            candidates={allCandidates}
            filteredCandidates={getFilteredCandidates()}
            favorites={favorites}
            candidateFilter={candidateFilter}
            candidateSortBy={candidateSortBy}
            onFilterChange={setCandidateFilter}
            onSortChange={setCandidateSortBy}
            onToggleFavorite={toggleFavorite}
            onViewCandidate={handleViewCandidate}
          />
        );

      case "applications":
        return (
          <ApplicationsView
            applications={getFilteredApplications()}
            candidates={allCandidates}
            applicationFilter={applicationFilter}
            applicationSortBy={applicationSortBy}
            onFilterChange={setApplicationFilter}
            onSortChange={setApplicationSortBy}
            onStatusChange={handleApplicationStatus}
            onViewCandidate={handleViewCandidate}
          />
        );

      case "company-profile":
        return (
          <CompanyProfileView
            profile={companyProfile}
            onProfileChange={setCompanyProfile}
            onSave={handleCompanyProfileUpdate}
          />
        );

      case "messages":
        return (
          <MessagesView
            messages={messages}
            selectedMessage={selectedMessage}
            onSelectMessage={setSelectedMessage}
            onSendMessage={handleSendMessage}
            messageText={messageText}
            onMessageTextChange={setMessageText}
          />
        );

      case "job-postings":
        return (
          <JobPostingsView
            jobPostings={jobPostings}
            onEditJob={handleEditJob}
            onDeleteJob={handleDeleteJob}
            onPostNewJob={() => setShowJobModal(true)}
            onViewApplications={() => {
              setCurrentView("applications");
              setActiveNav("applications");
            }}
          />
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
      <Sidebar 
        navItems={navItems}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        unreadMessagesCount={messages.reduce((sum, m) => sum + m.unread, 0)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearch}
          onNotificationClick={() => setShowNotifications(!showNotifications)}
          unreadNotificationsCount={notifications.filter(n => !n.read).length}
        >
          <NotificationsDropdown
            ref={notificationRef}
            isOpen={showNotifications}
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onClose={() => setShowNotifications(false)}
          />
        </TopBar>

        <main className="flex-1 overflow-y-auto p-8" data-testid="main-content">
          {renderViewContent()}
        </main>
      </div>

      <JobModal
        isOpen={showJobModal}
        onClose={() => {
          setShowJobModal(false);
          setEditingJob(null);
        }}
        onSubmit={handleJobSubmit}
        jobForm={jobForm}
        onFormChange={setJobForm}
        isEditing={!!editingJob}
      />

      <CandidateModal
        isOpen={showCandidateModal}
        candidate={selectedCandidate}
        onClose={() => {
          setShowCandidateModal(false);
          setSelectedCandidate(null);
        }}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedCandidate ? favorites.includes(selectedCandidate.id) : false}
      />

      <SearchResults
        results={searchResults}
        onClose={() => setSearchResults([])}
        onSelectCandidate={(candidate) => {
          handleViewCandidate(candidate);
          setSearchResults([]);
        }}
      />
    </div>
  );
}

export default RecruiterDashboard;
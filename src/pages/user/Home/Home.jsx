import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon, Briefcase, MessageCircle, Users, User,
  Calendar, Bell, Search, LogOut, ChevronRight, Sparkles,
  Shield, CheckCircle, TrendingUp, MapPin, Globe, HeartHandshake,
  Zap, ArrowRight, Award, Clock, Star, Building, BookOpen,
  Target, FileText, Video, Music, Coffee, Handshake, Sun,
  Moon, Menu, X, Filter, Share2, ThumbsUp, MessageSquare,
  Send, Bot, HelpCircle, Phone, Mail, Linkedin, Facebook,
  Twitter, Instagram, Youtube, ShieldCheck, Key, AlertCircle,
  Loader2, Plus, Heart, SendHorizontal, MoreVertical, Edit,
  Trash2, Eye, Download, Upload, Award as Trophy, TrendingUp as ChartUp,
  Users as UserGroup, Building2, HeartHandshake as HandHeart,
  CalendarDays, Target as Bullseye, BriefcaseBusiness, GraduationCap,
  Megaphone, Globe2, Clock4, CheckCircle2, ShieldAlert, UserCheck,
  Image, Archive, RefreshCw, ExternalLink, Link2, DownloadCloud, UploadCloud,
  FileText as Document, UserPlus, EyeOff, Globe as GlobeIcon,
  FileUp, ClipboardCheck, BarChart3, Layers, Network, Activity,
  FileSearch, FileBarChart, ClipboardList, CalendarCheck, Timer,
  Map, Navigation, UsersRound, UserCog, FileCode, Lock, Unlock,
  ChartBar, Settings, BellRing, CreditCard, BadgeCheck, Fingerprint,
  ShieldOff, Smartphone, Monitor, Tablet, Wifi, WifiOff, Database,
  Server, Cloud, CloudOff, HardDrive, Terminal, Code, Cpu, MemoryStick,
  Router, ShieldQuestion, AlertTriangle, Info, CheckSquare, Square,
  Circle, CircleDot, Radio, ToggleLeft, ToggleRight, SwitchCamera,
  Camera, CameraOff, Mic, MicOff, Headphones, Volume2, VolumeX,
  Video as VideoIcon, VideoOff, PhoneCall, PhoneOff, Mail as MailIcon,
  Inbox, MailOpen, Reply, Forward, Bookmark, Tag, Hash, AtSign,
  Maximize2, Minimize2, Expand, Shrink, Move, RotateCw, RotateCcw,
  ZoomIn, ZoomOut, Crop, Palette, PaintBucket, Type, Bold, Italic,
  Underline, Strikethrough, Heading, Pilcrow, List, ListOrdered,
  ListChecks, Quote, Code2, Brackets, Braces, Parentheses, Sigma, 
  Percent, Divide, X as XIcon, Plus as PlusIcon, Minus, Equal, 
  Infinity, Pi, Variable, DollarSign, Euro, PoundSterling, Bitcoin,
  TrendingDown, BarChart, PieChart, LineChart, CandlestickChart,
  GitBranch, GitCommit, GitPullRequest, GitMerge, GitCompare,
  GitFork, Scissors, Copy, CopyCheck, CopyX, File as FileIcon,
  FilePlus, FileMinus, FileX, FileDigit, FileJson, FileOutput, 
  FileInput, FileSpreadsheet, FileKey, FileKey2, Folder, FolderOpen,
  FolderPlus, FolderMinus, FolderX, FolderTree, FolderKanban, 
  FolderSearch, FolderSymlink, Save, SaveAll, FolderSync,
  CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog,
  Sunrise, Sunset, CloudSun, CloudMoon, Thermometer, Umbrella, 
  Wind, Droplets, Waves, TreePine, Mountain, Locate, LocateFixed,
  Route, Flag, FlagTriangleRight, NavigationOff, MapPinOff, Compass,
  Crosshair, Satellite, SatelliteDish, RadioTower, Signal, 
  SignalHigh, SignalMedium, SignalLow, SignalZero, Bluetooth,
  Tv, Tv2, MonitorSmartphone, Watch, Printer, Scan, Keyboard,
  Mouse, Speaker, Volume as VolumeIcon, Webcam, Battery, 
  BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, 
  BatteryWarning, Power, PowerOff, CircuitBoard, Cctv, TerminalSquare, 
  CodeSquare, Octagon, Hexagon, Pentagon, Triangle, Diamond, Shapes, 
  Clipboard, ClipboardCopy, ClipboardPaste, ClipboardX
} from "lucide-react";

import "./Home.css";

// Mock images - Tailored for South Africa
const ReLinkLogo = "https://via.placeholder.com/100x100/047857/ffffff?text=RE-Link";
const BuildRightLogo = "https://via.placeholder.com/100x100/10b981/ffffff?text=BuildRight";
const LogisticsSALogo = "https://via.placeholder.com/100x100/059669/ffffff?text=LogisticsSA";
const CallComLogo = "https://via.placeholder.com/100x100/3b82f6/ffffff?text=CallCom";
const ConstructionCoLogo = "https://via.placeholder.com/100x100/f59e0b/000000?text=Construction";
const WareHouseProLogo = "https://via.placeholder.com/100x100/8b5cf6/ffffff?text=WarehousePro";

// South African specific user journeys
const UserJourney1 = "https://via.placeholder.com/600x400/10b981/ffffff?text=Soweto+Success";
const UserJourney2 = "https://via.placeholder.com/600x400/059669/ffffff?text=Cape+Town+Journey";
const UserJourney3 = "https://via.placeholder.com/600x400/047857/ffffff?text=JHB+Transformation";
const CompanyPost1 = "https://via.placeholder.com/600x400/3b82f6/ffffff?text=SA+Job+Fair";
const CompanyPost2 = "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Team+SA";
const QuoteImage1 = "https://via.placeholder.com/600x400/f59e0b/000000?text=Ubuntu+Quote";
const QuoteImage2 = "https://via.placeholder.com/600x400/ef4444/ffffff?text=SA+Success";

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({
    name: "Thabo Mbeki",
    email: "thabo.mbeki@example.com",
    userType: "ex-convict",
    phone: "0821234567",
    idNumber: "9001015000089",
    dob: "1990-01-01",
    location: "Soweto, Johannesburg"
  });
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [botMessage, setBotMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [logoHover, setLogoHover] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const [titleGlow, setTitleGlow] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [credibilityScore, setCredibilityScore] = useState(78);
  const [postType, setPostType] = useState("journey");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [salaryRange, setSalaryRange] = useState("All Ranges");
  const [availability, setAvailability] = useState("All");
  const [jobType, setJobType] = useState("All Types");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [referralDocuments, setReferralDocuments] = useState([
    { id: 1, name: "Police Clearance Certificate.pdf", type: "clearance", date: "2024-02-10", status: "verified", points: 30, size: "2.5 MB" },
    { id: 2, name: "Rehabilitation Certificate.jpg", type: "rehab", date: "2024-02-05", status: "verified", points: 20, size: "1.8 MB" },
    { id: 3, name: "Previous Employer Reference.pdf", type: "employer", date: "2024-02-01", status: "pending", points: 15, size: "3.2 MB" }
  ]);
  const [referralType, setReferralType] = useState("employer");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [newMessageNotification, setNewMessageNotification] = useState(true);
  const [showJobCategory, setShowJobCategory] = useState("All");
  const [botSpinning, setBotSpinning] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [appointments, setAppointments] = useState([
    { id: 1, type: "rehab", title: "Rehabilitation Session", date: "2024-02-15", time: "10:00 AM", location: "Soweto Hope Center", status: "upcoming" },
    { id: 2, type: "medical", title: "Clinic Check-up", date: "2024-02-18", time: "2:30 PM", location: "Chris Hani Baragwanath", status: "upcoming" },
    { id: 3, type: "community", title: "Community Service", date: "2024-02-20", time: "9:00 AM", location: "Orlando Park", status: "upcoming" },
    { id: 4, type: "volunteer", title: "Volunteer Work", date: "2024-02-22", time: "8:00 AM", location: "Soweto Food Bank", status: "upcoming" },
    { id: 5, type: "counseling", title: "Counseling Session", date: "2024-02-25", time: "11:00 AM", location: "Soweto Support Center", status: "upcoming" }
  ]);
  const [jobsApplied, setJobsApplied] = useState([
    { id: 1, title: "Construction Supervisor", company: "BuildRight", date: "2024-02-10", status: "review" },
    { id: 2, title: "Warehouse Assistant", company: "Unitrans Logistics", date: "2024-02-08", status: "interview" },
    { id: 3, title: "Customer Service", company: "Vodacom", date: "2024-02-05", status: "applied" },
    { id: 4, title: "Driver", company: "Bidvest Steiner", date: "2024-02-03", status: "rejected" },
    { id: 5, title: "Retail Assistant", company: "Shoprite", date: "2024-02-01", status: "accepted" }
  ]);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [userProgress, setUserProgress] = useState({
    profileCompletion: 85,
    jobSearchActivity: 90,
    networkingScore: 75,
    skillDevelopment: 60,
    communityEngagement: 95,
    documentSubmission: 80
  });
  const [darkMode, setDarkMode] = useState(false);
  const [quickStats, setQuickStats] = useState({
    dailyViews: 24,
    weeklyConnections: 8,
    monthlyApplications: 12,
    totalReferrals: 5,
    eventsAttended: 3,
    certificatesEarned: 2
  });
  
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const postFileInputRef = useRef(null);
  const profilePicRef = useRef(null);
  const logoRef = useRef(null);

  // Enhanced user data loading with more details
  useEffect(() => {
    // Load user data from localStorage or use mock data
    const savedUser = localStorage.getItem('relink_user');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Set South African mock user data
      setUser({
        name: "Thabo Mbeki",
        email: "thabo.mbeki@example.com",
        userType: "ex-convict",
        phone: "0821234567",
        idNumber: "9001015000089",
        dob: "1990-01-01",
        location: "Soweto, Johannesburg"
      });
    }
    
    // Load credibility score
    const savedScore = localStorage.getItem('relink_credibility_score');
    if (savedScore) {
      setCredibilityScore(parseInt(savedScore));
    }
    
    // Load profile picture
    const savedProfilePic = localStorage.getItem('relink_profile_pic');
    if (savedProfilePic) {
      setProfilePicture(savedProfilePic);
    }
    
    // Load appointments
    const savedAppointments = localStorage.getItem('relink_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
    
    // Load jobs applied
    const savedJobsApplied = localStorage.getItem('relink_jobs_applied');
    if (savedJobsApplied) {
      setJobsApplied(JSON.parse(savedJobsApplied));
    }

    // Generate enhanced floating dots
    const dots = [];
    for (let i = 0; i < 25; i++) {
      dots.push({
        id: i,
        size: Math.random() * 8 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#047857" : "#065f46"
      });
    }
    setFloatingDots(dots);

    // Enhanced title glow animation
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 1500);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enhanced Bot responses with South African context (keeping for potential future use)
  const botResponses = {
    greeting: "Molo! I'm RE-Link Assistant. I can help you navigate the platform, find jobs, connect with employers, submit referrals, or answer questions about your reintegration journey in South Africa.",
    jobs: "Looking for jobs in SA? Go to the Networking tab to see available positions matched to your skills. You can filter by location, salary, industry, and availability. Check out our Job Match feature for personalized recommendations!",
    employers: "To message verified employers, click on the Messages tab. Only verified employers can message here for your security. You'll see a green checkmark next to their names. Remember to check your credibility score before applying!",
    profile: "Update your professional profile in the Profile tab to get better job matches. Add your skills, education, certificates, and work experience. A complete profile increases your credibility score by 25%!",
    community: "Check the Community tab to submit referral documents, track your rehabilitation timeline, and build your credibility score through positive community engagement. Attend events to network with fellow South Africans!",
    referrals: "You can submit referral documents from employers, rehabilitation centers, police officers, or community leaders. Each document adds to your credibility score. Verified documents earn more points!",
    posting: "In the Home tab, you can share your journey, post opportunities, motivational quotes, or positive content. Choose the post type that fits your content. Remember, positivity attracts opportunities!",
    support: "Need help? You can contact our support team at support@relink.co.za or call 0800-RE-LINK (735-465). We're here to help you succeed. Emergency support is available 24/7 across South Africa.",
    overview: "The Overview tab gives you a complete dashboard of your progress. Check your credibility score, upcoming appointments, jobs applied, and quick statistics about your journey.",
    networking: "Networking tab shows available jobs, learnerships, volunteer work, and internships. Use filters to find the perfect opportunity in your province. Don't forget to check networking tips at the bottom!",
    credibility: "Your credibility score is calculated based on referrals, employment history, community engagement, and document verification. Higher scores attract better opportunities with South African employers!",
    documents: "You can upload documents in the Community tab. Each verified document boosts your score. Keep your documents updated for maximum credibility impact.",
    timeline: "Track your rehabilitation journey in the Community tab. Add milestones from pre-arrest to present day. This helps employers understand your growth journey.",
    privacy: "In Profile settings, you can choose what information to share. Sensitive data can be hidden and only shown to verified recruiters when you grant permission.",
    appointments: "Manage your appointments in the Overview tab. Set reminders for rehab sessions, check-ups, community service, and interviews. Stay organized with your schedule!",
    applications: "Track all your job applications in the Overview tab. See which ones are under review, accepted, or need follow-up with South African employers.",
    default: "I'm here to help! You can ask me about jobs, employers, referrals, posting content, your profile, community events, overview dashboard, or general support in South Africa."
  };

  // Enhanced image selection with preview
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size too large. Please select an image under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.onerror = () => {
        alert("Error reading file. Please try another image.");
      };
      reader.readAsDataURL(file);
    }
  };

  // Enhanced post submission with validation
  const handleNewPost = () => {
    if (!newPost.trim() && !selectedImage) {
      alert("Please add some content or an image to post.");
      return;
    }
    
    if (newPost.length > 1000) {
      alert("Post content is too long. Maximum 1000 characters.");
      return;
    }
    
    const userType = user?.userType || "ex-convict";
    let postRole = "";
    let postIcon = "";
    
    switch(userType) {
      case "recruiter":
        postRole = "Verified Recruiter";
        postIcon = "👔";
        break;
      case "npo":
        postRole = "Non-Profit Organization";
        postIcon = "🤝";
        break;
      case "ngo":
        postRole = "Non-Governmental Organization";
        postIcon = "🌍";
        break;
      case "community":
        postRole = "Community Leader";
        postIcon = "👥";
        break;
      case "volunteer":
        postRole = "Volunteer Seeker";
        postIcon = "❤️";
        break;
      default:
        postRole = "RE-Link Member";
        postIcon = "👤";
    }
    
    const newPostObj = {
      id: posts.length + 1,
      user: user?.name || "Anonymous",
      userType: userType,
      role: postRole,
      icon: postIcon,
      content: newPost,
      image: selectedImage,
      postType: postType,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      shares: 0,
      verified: userType === "recruiter" || userType === "npo" || userType === "ngo" || userType === "community",
      allowComments: userType === "recruiter" || userType === "npo" || userType === "ngo" || userType === "community" || userType === "volunteer"
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setSelectedImage(null);
    setPostType("journey");
    if (postFileInputRef.current) {
      postFileInputRef.current.value = "";
    }
    
    // Add notification for successful post
    setNotifications(prev => prev + 1);
    
    // Save to localStorage
    localStorage.setItem('relink_posts', JSON.stringify([newPostObj, ...posts]));
  };

  // Enhanced like post with animation
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  // Enhanced comment handling with user type restrictions
  const handleAddComment = (postId, comment) => {
    if (!comment.trim()) return;
    
    const userType = user?.userType || "ex-convict";
    const allowedToComment = ["recruiter", "npo", "ngo", "community", "volunteer"].includes(userType);
    
    if (!allowedToComment) {
      alert("Only employers, NGOs, NPOs, and community leaders can comment on posts.");
      return;
    }
    
    setPosts(posts.map(post => {
      if (post.id === postId && post.allowComments) {
        const newComments = [...post.comments, {
          id: post.comments.length + 1,
          user: user?.name || "Anonymous",
          userType: userType,
          content: comment,
          timestamp: "Just now",
          verified: ["recruiter", "npo", "ngo", "community"].includes(userType)
        }];
        return { ...post, comments: newComments };
      }
      return post;
    }));
  };

  // Enhanced job application
  const handleApplyForJob = (jobId) => {
    const job = featuredJobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Check if already applied
    if (jobsApplied.some(app => app.title === job.title)) {
      alert(`You've already applied for ${job.title} at ${job.company}.`);
      return;
    }
    
    // Add to applications
    const newApplication = {
      id: jobsApplied.length + 1,
      title: job.title,
      company: job.company,
      date: new Date().toLocaleDateString(),
      status: "applied"
    };
    
    setJobsApplied([newApplication, ...jobsApplied]);
    
    // Save to localStorage
    localStorage.setItem('relink_jobs_applied', JSON.stringify([newApplication, ...jobsApplied]));
    
    alert(`✅ Application submitted for ${job.title} at ${job.company}\nYou will be contacted by the employer within 48 hours.\nCheck your Applications in the Overview tab.`);
  };

  // Enhanced messaging with auto-response
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "text"
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
    
    // Auto-reply simulation based on context
    setTimeout(() => {
      const responses = [
        "Thank you for your message. We'll review it and get back to you shortly.",
        "We appreciate your interest. Our hiring team will contact you within 2 business days.",
        "Thank you for reaching out. We're currently reviewing applications and will update you soon.",
        "Your message has been received. We'll get back to you regarding next steps.",
        "Thanks for your inquiry. We'll connect you with the right person in our team."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botReply = {
        id: messages.length + 2,
        sender: "employer",
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        type: "text"
      };
      setMessages(prev => [...prev, botReply]);
    }, 1500);
  };

  // Enhanced document upload with validation
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload PDF, JPG, or PNG files only.");
      return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size too large. Maximum 10MB.");
      return;
    }
    
    setUploadingFile(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newDocument = {
        id: referralDocuments.length + 1,
        name: file.name,
        type: referralType,
        date: new Date().toLocaleDateString(),
        status: "pending",
        points: getReferralPoints(referralType),
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      };
      
      setReferralDocuments([newDocument, ...referralDocuments]);
      setUploadingFile(false);
      
      // Update credibility score
      const newScore = Math.min(100, credibilityScore + newDocument.points);
      setCredibilityScore(newScore);
      localStorage.setItem('relink_credibility_score', newScore.toString());
      
      // Save documents to localStorage
      localStorage.setItem('relink_documents', JSON.stringify([newDocument, ...referralDocuments]));
      
      // Show success message
      alert(`✅ Document "${file.name}" uploaded successfully!\n+${newDocument.points} credibility points added.`);
    }, 2000);
  };

  const getReferralPoints = (type) => {
    const pointsMap = {
      employer: 15,
      rehab: 20,
      police: 25,
      community: 10,
      volunteer: 12,
      education: 18,
      clearance: 30
    };
    return pointsMap[type] || 10;
  };

  // Enhanced logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      navigate('/login');
    }
  };

  // Enhanced delete account handler
  const handleDeleteAccount = () => {
    if (window.confirm("⚠️ WARNING: Are you sure you want to delete your account?\n\nThis action cannot be undone. All your data including:\n• Profile information\n• Job applications\n• Messages\n• Referral documents\n• Community posts\n\nWill be permanently deleted.")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      localStorage.removeItem('relink_email');
      localStorage.removeItem('relink_remember');
      navigate('/');
    }
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem('relink_profile_pic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle appointment status update
  const handleAppointmentStatus = (id, status) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status: status } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('relink_appointments', JSON.stringify(updatedAppointments));
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Mock data - Enhanced Posts from different user types with South African context
  const motivationalPosts = [
    {
      id: 1,
      user: "Thabo M.",
      userType: "ex-convict",
      role: "Construction Manager",
      icon: "👷",
      content: "Three years ago, I walked out of prison with nothing but hope. Today, I'm leading a team of 15 at BuildRight Construction in Soweto. Your past doesn't define your future. #SecondChances #SouthAfrica #SuccessStory #Construction",
      image: UserJourney1,
      timestamp: "2 hours ago",
      likes: 142,
      comments: [
        { id: 1, user: "Sarah K.", userType: "recruiter", content: "So inspiring! Thank you for sharing your journey!", timestamp: "1 hour ago", verified: true },
        { id: 2, user: "Soweto Hope Center", userType: "npo", content: "We're so proud of your journey Thabo! Keep inspiring others in our community.", timestamp: "45 min ago", verified: true }
      ],
      shares: 8,
      postType: "journey",
      verified: false,
      allowComments: true
    },
    {
      id: 2,
      user: "BuildRight Construction SA",
      userType: "recruiter",
      role: "Verified Employer",
      icon: "👔",
      content: "Our team-building event in Johannesburg last week! Proud to work with such dedicated South Africans. We're growing and always looking for hardworking people to join our family. #HiringSA #ConstructionJobs #TeamBuilding",
      image: CompanyPost1,
      timestamp: "3 hours ago",
      likes: 156,
      comments: [
        { id: 1, user: "Community Builders SA", userType: "ngo", content: "Great initiative! We'd love to partner with you on community projects.", timestamp: "2 hours ago", verified: true }
      ],
      shares: 22,
      postType: "company",
      verified: true,
      allowComments: true
    },
    {
      id: 3,
      user: "Soweto Rehabilitation Centre",
      userType: "npo",
      role: "Non-Profit Organization",
      icon: "🤝",
      content: "Free counseling sessions available every Tuesday and Thursday at our Soweto center. Dealing with reintegration challenges? Our professional counselors are here to help. DM for appointment. #SupportSA #MentalHealth #Community",
      timestamp: "1 day ago",
      likes: 203,
      comments: [],
      shares: 45,
      postType: "support",
      verified: true,
      allowComments: true
    },
    {
      id: 4,
      user: "Mike T.",
      userType: "ex-convict",
      role: "Warehouse Supervisor",
      icon: "👤",
      content: "Completed my forklift certification today at the Johannesburg Training Centre! Another step forward in my career development. Never stop learning! #Certification #CareerGrowth #WarehouseSA",
      image: UserJourney2,
      timestamp: "5 hours ago",
      likes: 89,
      comments: [
        { id: 1, user: "Unitrans Logistics", userType: "recruiter", content: "Congratulations Mike! We're always looking for certified operators for our Gauteng warehouses.", timestamp: "3 hours ago", verified: true }
      ],
      shares: 15,
      postType: "achievement",
      verified: false,
      allowComments: true
    },
    {
      id: 5,
      user: "Community Builders NGO SA",
      userType: "ngo",
      role: "Non-Governmental Organization",
      icon: "🌍",
      content: "Volunteer opportunities available for community outreach programs in townships across Gauteng. Gain valuable experience while making a difference in your community. No previous experience required. #VolunteerSA #CommunityService #GiveBack",
      timestamp: "2 days ago",
      likes: 127,
      comments: [],
      shares: 32,
      postType: "volunteer",
      verified: true,
      allowComments: true
    }
  ];

  // Enhanced featured jobs with South African companies and salaries
  const featuredJobs = [
    // Available Jobs
    {
      id: 1,
      title: "Construction Supervisor",
      company: "BuildRight Construction",
      logo: BuildRightLogo,
      location: "Soweto, Johannesburg",
      salary: "R25,000 - R35,000",
      type: "Full-time",
      matches: "95% match",
      urgent: true,
      posted: "2 hours ago",
      skills: ["Leadership", "Construction", "Safety", "Team Management"],
      industry: "Construction",
      description: "Leading construction projects in Soweto, managing teams, ensuring safety compliance.",
      requirements: "5+ years construction experience, leadership skills, safety certification",
      category: "job",
      benefits: ["Medical Aid", "Provident Fund", "Training", "Growth Opportunities"]
    },
    {
      id: 2,
      title: "Warehouse Manager",
      company: "Unitrans Logistics",
      logo: LogisticsSALogo,
      location: "Johannesburg",
      salary: "R22,000 - R32,000",
      type: "Full-time",
      matches: "88% match",
      urgent: false,
      posted: "1 day ago",
      skills: ["Management", "Logistics", "Inventory", "Operations"],
      industry: "Logistics",
      description: "Oversee warehouse operations, manage inventory, lead warehouse staff in Gauteng.",
      requirements: "Warehouse experience, management skills, inventory knowledge",
      category: "job",
      benefits: ["Performance Bonus", "Transport Allowance", "Medical Insurance"]
    },
    // Learnerships
    {
      id: 3,
      title: "Construction Learnership",
      company: "WBHO Construction",
      logo: ConstructionCoLogo,
      location: "Pretoria",
      salary: "R8,000 - R12,000",
      type: "Learnership",
      matches: "92% match",
      urgent: true,
      posted: "1 day ago",
      skills: ["Willing to Learn", "Teamwork", "Basic Construction"],
      industry: "Construction",
      description: "12-month learnership program with on-the-job training and classroom learning.",
      requirements: "Matric certificate, no experience required",
      category: "learnership",
      benefits: ["NQF Certification", "Stipend", "Mentorship", "Job Placement"]
    },
    {
      id: 4,
      title: "Logistics Learnership",
      company: "Imperial Logistics",
      logo: WareHouseProLogo,
      location: "Durban",
      salary: "R9,000 - R13,000",
      type: "Learnership",
      matches: "85% match",
      urgent: false,
      posted: "3 days ago",
      skills: ["Organization", "Basic Computer", "Communication"],
      industry: "Logistics",
      description: "18-month learnership in warehouse operations and logistics management.",
      requirements: "Grade 12, good communication skills",
      category: "learnership",
      benefits: ["Certificate", "Monthly Stipend", "Career Guidance"]
    },
    // Volunteer Work
    {
      id: 5,
      title: "Community Volunteer",
      company: "Soweto Hope Centre",
      logo: BuildRightLogo,
      location: "Soweto",
      salary: "Volunteer",
      type: "Volunteer",
      matches: "98% match",
      urgent: true,
      posted: "5 hours ago",
      skills: ["Empathy", "Communication", "Community Service"],
      industry: "Community",
      description: "Support community outreach programs and assist with daily operations in Soweto.",
      requirements: "Passion for community work, good interpersonal skills",
      category: "volunteer",
      benefits: ["Certificate", "Experience", "Networking", "Meals Provided"]
    },
    {
      id: 6,
      title: "Environmental Volunteer",
      company: "Greenpeace South Africa",
      logo: LogisticsSALogo,
      location: "Cape Town",
      salary: "Volunteer",
      type: "Volunteer",
      matches: "90% match",
      urgent: false,
      posted: "2 days ago",
      skills: ["Environmental Awareness", "Teamwork", "Physical Fitness"],
      industry: "Environment",
      description: "Participate in environmental conservation projects and community education.",
      requirements: "Interest in environmental issues, team player",
      category: "volunteer",
      benefits: ["Training", "Certificate", "Community Recognition"]
    },
    // Internships
    {
      id: 7,
      title: "Business Intern",
      company: "Vodacom South Africa",
      logo: CallComLogo,
      location: "Johannesburg",
      salary: "R10,000 - R15,000",
      type: "Internship",
      matches: "87% match",
      urgent: true,
      posted: "1 day ago",
      skills: ["Communication", "Office Skills", "Customer Service"],
      industry: "Business",
      description: "6-month internship in business operations and customer service.",
      requirements: "Recent graduate, good communication skills",
      category: "internship",
      benefits: ["Stipend", "Mentorship", "Potential Employment"]
    },
    {
      id: 8,
      title: "IT Support Intern",
      company: "Dimension Data",
      logo: ConstructionCoLogo,
      location: "Sandton",
      salary: "R12,000 - R18,000",
      type: "Internship",
      matches: "82% match",
      urgent: false,
      posted: "4 days ago",
      skills: ["Basic IT", "Problem Solving", "Communication"],
      industry: "Technology",
      description: "12-month internship providing IT support and learning technical skills.",
      requirements: "Basic computer knowledge, willingness to learn",
      category: "internship",
      benefits: ["Training", "Certificate", "Tech Equipment", "Mentorship"]
    }
  ];

  // Enhanced networking tips for South African context
  const networkingTips = [
    "Complete your profile with all skills and experiences to attract more South African employers",
    "Attend community events to boost your credibility score and network with local professionals",
    "Connect with verified South African recruiters directly through the Messages tab",
    "Share your journey and achievements to inspire others and build your reputation",
    "Regularly update your availability status in the Networking tab",
    "Apply to jobs that match at least 80% of your skills for better chances",
    "Follow up with employers 3-5 days after applying",
    "Join industry-specific groups to expand your professional network in South Africa",
    "Ask for recommendations from supervisors to strengthen your profile",
    "Stay active on the platform - South African employers notice engaged candidates",
    "Customize your application for each job - generic applications get overlooked",
    "Attend virtual career fairs and networking events regularly",
    "Update your skills regularly as you complete new training",
    "Be responsive to messages - quick replies show professionalism",
    "Build a portfolio of your work and achievements"
  ];

  // Enhanced rehabilitation timeline with South African context
  const rehabilitationTimeline = [
    {
      id: 1,
      year: "2018",
      event: "Pre-Incarceration",
      description: "Working as construction assistant in Soweto, learning basic skills",
      status: "pre",
      icon: "🏗️",
      color: "#10b981"
    },
    {
      id: 2,
      year: "2019",
      event: "Incarceration Begins",
      description: "Started sentence at Johannesburg Correctional Facility",
      status: "incarcerated",
      icon: "🔒",
      color: "#ef4444"
    },
    {
      id: 3,
      year: "2020",
      event: "Vocational Training",
      description: "Completed construction certification in prison program",
      status: "progress",
      icon: "📚",
      color: "#3b82f6"
    },
    {
      id: 4,
      year: "2021",
      event: "Behavioral Rehabilitation",
      description: "Completed anger management and life skills programs",
      status: "progress",
      icon: "🧠",
      color: "#8b5cf6"
    },
    {
      id: 5,
      year: "2022",
      event: "Release Preparation",
      description: "Pre-release counseling and job readiness training",
      status: "progress",
      icon: "🚪",
      color: "#f59e0b"
    },
    {
      id: 6,
      year: "2023",
      event: "Release Date",
      description: "Released and joined RE-Link platform in South Africa",
      status: "post",
      icon: "🎉",
      color: "#10b981"
    },
    {
      id: 7,
      year: "2023",
      event: "First Job Placement",
      description: "Construction worker at BuildRight Construction in Soweto",
      status: "post",
      icon: "👷",
      color: "#10b981"
    },
    {
      id: 8,
      year: "2024",
      event: "Current Position",
      description: "Promoted to Construction Supervisor",
      status: "post",
      icon: "⭐",
      color: "#10b981"
    },
    {
      id: 9,
      year: "2024",
      event: "Community Leadership",
      description: "Started mentoring new RE-Link members in Soweto",
      status: "post",
      icon: "👥",
      color: "#10b981"
    }
  ];

  // Enhanced conversations with South African companies
  const conversations = [
    {
      id: 1,
      employer: "BuildRight Construction",
      logo: BuildRightLogo,
      lastMessage: "Hi there! We'd like to schedule an interview...",
      time: "10:30 AM",
      unread: true,
      verified: true,
      messages: [
        { id: 1, sender: "employer", content: "Hello! We reviewed your profile and were impressed with your construction experience. Would you be available for an interview next week at our Soweto office?", time: "10:30 AM", read: true, type: "text" },
        { id: 2, sender: "user", content: "Yes, I would be very interested! I'm available Monday through Wednesday next week.", time: "10:35 AM", read: true, type: "text" },
        { id: 3, sender: "employer", content: "Great! Let's schedule for Tuesday at 2 PM at our Johannesburg office. The address is 123 Construction Street, Soweto.", time: "10:36 AM", read: true, type: "text" }
      ]
    },
    {
      id: 2,
      employer: "Unitrans Logistics",
      logo: LogisticsSALogo,
      lastMessage: "Thank you for your application...",
      time: "Yesterday",
      unread: false,
      verified: true,
      messages: [
        { id: 1, sender: "employer", content: "Thank you for applying for the Warehouse Manager position. We'll review your application and get back to you within 3 business days.", time: "Yesterday, 3:45 PM", read: true, type: "text" }
      ]
    },
    {
      id: 3,
      employer: "Vodacom South Africa",
      logo: CallComLogo,
      lastMessage: "We have an urgent opening that matches your profile...",
      time: "Just now",
      unread: true,
      verified: true,
      messages: []
    }
  ];

  // Enhanced credibility metrics
  const credibilityMetrics = [
    { label: "Community Participation", score: 85, color: "#10b981", points: 25, icon: "👥" },
    { label: "Professional Development", score: 72, color: "#059669", points: 18, icon: "📚" },
    { label: "Employment Stability", score: 90, color: "#047857", points: 30, icon: "💼" },
    { label: "Mentorship Engagement", score: 65, color: "#065f46", points: 15, icon: "👨‍🏫" },
    { label: "Rehabilitation Completion", score: 100, color: "#064e3b", points: 20, icon: "✅" },
    { label: "Document Verification", score: 80, color: "#022c22", points: 25, icon: "📄" }
  ];

  // Enhanced referral types for South African context
  const referralTypes = [
    { id: "employer", label: "Previous Employer", icon: Briefcase, description: "Reference letter from past employer", points: 15, color: "#10b981" },
    { id: "rehab", label: "Rehabilitation Center", icon: HeartHandshake, description: "Completion certificate from rehab", points: 20, color: "#059669" },
    { id: "police", label: "Police Officer", icon: ShieldCheck, description: "Character reference from SAPS", points: 25, color: "#047857" },
    { id: "community", label: "Community Leader", icon: Users, description: "Recommendation from community leader", points: 10, color: "#065f46" },
    { id: "volunteer", label: "Volunteer Work", icon: HandHeart, description: "Proof of volunteer service", points: 12, color: "#064e3b" },
    { id: "education", label: "Education/Training", icon: GraduationCap, description: "Certificates or diplomas", points: 18, color: "#022c22" },
    { id: "clearance", label: "Police Clearance", icon: Document, description: "Official SAPS clearance certificate", points: 30, color: "#10b981" }
  ];

  // Enhanced industries list for South Africa
  const industries = [
    "All Industries",
    "Construction",
    "Logistics",
    "Customer Service",
    "Manufacturing",
    "Retail",
    "Hospitality",
    "Cleaning Services",
    "Security",
    "Driving/Delivery",
    "Agriculture",
    "Technology",
    "Healthcare",
    "Education",
    "Other"
  ];

  // Enhanced South African locations
  const locations = [
    "All Locations",
    "Johannesburg",
    "Soweto",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "Bloemfontein",
    "East London",
    "Nelspruit",
    "Polokwane",
    "Kimberley",
    "Remote",
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape"
  ];

  // Enhanced South African salary ranges
  const salaryRanges = [
    "All Ranges",
    "R8,000 - R12,000",
    "R12,000 - R18,000",
    "R18,000 - R25,000",
    "R25,000 - R35,000",
    "R35,000+"
  ];

  // Enhanced availability options
  const availabilityOptions = [
    "All",
    "Immediate",
    "1-2 Weeks",
    "1 Month",
    "Flexible",
    "Part-time",
    "Weekends Only"
  ];

  // Enhanced job types
  const jobTypes = [
    "All Types",
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Freelance",
    "Remote",
    "Hybrid"
  ];

  // Job categories for filtering
  const jobCategories = [
    { id: "All", label: "All Opportunities", icon: Briefcase },
    { id: "job", label: "Available Jobs", icon: BriefcaseBusiness },
    { id: "learnership", label: "Learnerships", icon: GraduationCap },
    { id: "volunteer", label: "Volunteer Work", icon: HandHeart },
    { id: "internship", label: "Internships", icon: BookOpen }
  ];

  // Initialize posts with sample data
  useEffect(() => {
    // Load posts from localStorage or use mock data
    const savedPosts = localStorage.getItem('relink_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(motivationalPosts);
      localStorage.setItem('relink_posts', JSON.stringify(motivationalPosts));
    }
    
    // Load documents from localStorage
    const savedDocuments = localStorage.getItem('relink_documents');
    if (savedDocuments) {
      setReferralDocuments(JSON.parse(savedDocuments));
    }
    
    // Initialize selected conversation
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
      setMessages(conversations[0].messages);
    }
  }, []);

  // Enhanced post type options based on user type
  const postTypeOptions = user?.userType === "ex-convict" ? [
    { value: "journey", label: "My Journey", icon: "🚶" },
    { value: "achievement", label: "Achievement", icon: "🏆" },
    { value: "quote", label: "Motivational Quote", icon: "💭" },
    { value: "support", label: "Support/Advice", icon: "🤗" },
    { value: "question", label: "Ask Question", icon: "❓" }
  ] : user?.userType === "recruiter" ? [
    { value: "opportunity", label: "Job Opportunity", icon: "💼" },
    { value: "company", label: "Company Update", icon: "🏢" },
    { value: "quote", label: "Motivational Quote", icon: "💭" },
    { value: "event", label: "Career Event", icon: "📅" }
  ] : [
    { value: "volunteer", label: "Volunteer Work", icon: "🤝" },
    { value: "support", label: "Support/Advice", icon: "🤗" },
    { value: "education", label: "Educational Opportunity", icon: "🎓" },
    { value: "quote", label: "Motivational Quote", icon: "💭" },
    { value: "event", label: "Community Event", icon: "📅" }
  ];

  // Enhanced job filtering
  const filteredJobs = featuredJobs.filter(job => {
    if (selectedIndustry !== "All Industries" && job.industry !== selectedIndustry) return false;
    if (selectedLocation !== "All Locations" && job.location !== selectedLocation) return false;
    if (jobType !== "All Types" && job.type !== jobType) return false;
    if (showJobCategory !== "All" && job.category !== showJobCategory) return false;
    return true;
  });

  // Filter jobs by category
  const jobsByCategory = {
    job: filteredJobs.filter(job => job.category === "job"),
    learnership: filteredJobs.filter(job => job.category === "learnership"),
    volunteer: filteredJobs.filter(job => job.category === "volunteer"),
    internship: filteredJobs.filter(job => job.category === "internship")
  };

  // Handle logo animation
  const handleLogoAnimation = () => {
    if (logoRef.current) {
      logoRef.current.classList.add('logo-spin');
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.classList.remove('logo-spin');
        }
      }, 1000);
    }
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Enhanced Background Elements */}
      <div className="background-gradient"></div>
      
      <div className="floating-dots-container">
        {floatingDots.map(dot => (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              backgroundColor: dot.color
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Left Side Navigation */}
      <div className="side-navigation">
        <div className="nav-container">
          {/* Enhanced Logo Section with Animation */}
          <div 
            className="logo-section"
            onClick={() => {
              setActiveTab('overview');
              handleLogoAnimation();
            }}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <div className={`logo-glow ${logoHover ? 'active' : ''}`}></div>
            <div className="logo-pulse"></div>
            <div className="logo-orbital">
              <div className="orbital-ring"></div>
              <div className="orbital-ring ring-2"></div>
            </div>
            <img 
              ref={logoRef}
              src={ReLinkLogo} 
              alt="RE-Link Logo" 
              className={`logo-image ${logoHover ? 'hover' : ''} ${logoLoaded ? 'loaded' : ''}`}
              onLoad={() => setLogoLoaded(true)}
            />
            <div className="logo-text">
              <h1 className="logo-title">RE-LINK</h1>
              <p className="logo-slogan">Second Chances, Real Connections</p>
              <div className="logo-badge">
                <ShieldCheck size={12} />
                <span>DCS Verified</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Items */}
          <div className="nav-items">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <div className="nav-icon">
                <BarChart3 size={22} />
              </div>
              <span className="nav-label">Overview</span>
              {activeTab === 'overview' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <div className="nav-icon">
                <HomeIcon size={22} />
              </div>
              <span className="nav-label">Home</span>
              {activeTab === 'home' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'networking' ? 'active' : ''}`}
              onClick={() => setActiveTab('networking')}
            >
              <div className="nav-icon">
                <Briefcase size={22} />
                <span className="nav-badge">{featuredJobs.length}</span>
              </div>
              <span className="nav-label">Networking</span>
              {activeTab === 'networking' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <div className="nav-icon">
                <Users size={22} />
              </div>
              <span className="nav-label">Community</span>
              {activeTab === 'community' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('messages');
                setNewMessageNotification(false);
              }}
            >
              <div className="nav-icon">
                <MessageCircle size={22} />
                {newMessageNotification && <span className="nav-badge">3</span>}
              </div>
              <span className="nav-label">Messages</span>
              {activeTab === 'messages' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="nav-icon">
                <User size={22} />
              </div>
              <span className="nav-label">Profile</span>
              {activeTab === 'profile' && <div className="nav-indicator"></div>}
            </button>
          </div>

          {/* Enhanced User Profile Summary */}
          <div className="user-summary">
            <div className="profile-avatar" onClick={() => profilePicRef.current?.click()}>
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="profile-avatar-img" />
              ) : (
                <span className="avatar-initial">{user?.name?.charAt(0) || "U"}</span>
              )}
              <input
                type="file"
                ref={profilePicRef}
                accept="image/*"
                onChange={handleProfilePictureUpload}
                style={{ display: 'none' }}
              />
            </div>
            <div className="profile-info">
              <span className="profile-name">{user?.name || "User"}</span>
              <span className="profile-type">{user?.userType ? user.userType.replace('-', ' ').toUpperCase() : "MEMBER"}</span>
            </div>
            <div className="credibility-score">
              <div className="score-circle">
                <span className="score-value">{credibilityScore}</span>
              </div>
              <span className="score-label">CRED</span>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="theme-toggle">
            <button 
              className={`theme-toggle-btn ${darkMode ? 'dark' : 'light'}`}
              onClick={handleDarkModeToggle}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content Area */}
      <div className="main-content">
        {/* Enhanced Top Header */}
        <header className="top-header">
          <div className="search-section">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search jobs, posts, members, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery("")}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={22} />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <main className="content-area">
          {/* Enhanced Welcome Banner */}
          <div className={`welcome-banner ${titleGlow ? 'glow' : ''}`}>
            <div className="welcome-content">
              <div className="welcome-text">
                <div className="welcome-badge">
                  <Sparkles size={20} />
                  <span>Welcome back, {user?.name || "Champion"}!</span>
                </div>
                <h2 className="welcome-title">
                  Your Journey to Success Continues
                  <span className="title-highlight"> Today</span>
                </h2>
                <p className="welcome-subtitle">
                  Connect with opportunities, build credibility, and thrive with South African professionals who believe in second chances.
                </p>
              </div>
              <div className="welcome-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{credibilityScore}/100</span>
                    <span className="stat-label">Credibility Score</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Briefcase size={20} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{filteredJobs.length}</span>
                    <span className="stat-label">Available Jobs</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Users size={20} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{jobsApplied.length}</span>
                    <span className="stat-label">Applications</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{appointments.length}</span>
                    <span className="stat-label">Appointments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Content Container */}
          <div className="tab-content-container">
            
            {/* OVERVIEW TAB - Enhanced Dashboard */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-header">
                  <h3 className="section-title">
                    <BarChart3 size={28} />
                    <span>Your Dashboard</span>
                  </h3>
                  <p className="section-subtitle">Track your progress, appointments, and opportunities all in one place</p>
                </div>

                {/* Quick Stats Grid */}
                <div className="quick-stats-grid">
                  <div className="quick-stat-card">
                    <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                      <Eye size={24} />
                    </div>
                    <div className="quick-stat-content">
                      <span className="quick-stat-number">{quickStats.dailyViews}</span>
                      <span className="quick-stat-label">Daily Profile Views</span>
                    </div>
                    <div className="quick-stat-trend">
                      <TrendingUp size={16} />
                      <span>+12%</span>
                    </div>
                  </div>
                  
                  <div className="quick-stat-card">
                    <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
                      <Network size={24} />
                    </div>
                    <div className="quick-stat-content">
                      <span className="quick-stat-number">{quickStats.weeklyConnections}</span>
                      <span className="quick-stat-label">Weekly Connections</span>
                    </div>
                    <div className="quick-stat-trend">
                      <TrendingUp size={16} />
                      <span>+8%</span>
                    </div>
                  </div>
                  
                  <div className="quick-stat-card">
                    <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>
                      <Send size={24} />
                    </div>
                    <div className="quick-stat-content">
                      <span className="quick-stat-number">{quickStats.monthlyApplications}</span>
                      <span className="quick-stat-label">Monthly Applications</span>
                    </div>
                    <div className="quick-stat-trend">
                      <TrendingUp size={16} />
                      <span>+15%</span>
                    </div>
                  </div>
                  
                  <div className="quick-stat-card">
                    <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
                      <FileText size={24} />
                    </div>
                    <div className="quick-stat-content">
                      <span className="quick-stat-number">{quickStats.totalReferrals}</span>
                      <span className="quick-stat-label">Total Referrals</span>
                    </div>
                    <div className="quick-stat-trend">
                      <TrendingUp size={16} />
                      <span>+5%</span>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="dashboard-grid">
                  {/* Credibility Score Card */}
                  <div className="dashboard-card large">
                    <div className="card-header">
                      <h4 className="card-title">
                        <Target size={20} />
                        <span>Credibility Score</span>
                      </h4>
                      <button className="card-action">
                        <RefreshCw size={16} />
                      </button>
                    </div>
                    <div className="credibility-display">
                      <div className="score-circle-large">
                        <span className="score-value-large">{credibilityScore}</span>
                        <span className="score-label-large">/100</span>
                      </div>
                      <div className="score-breakdown">
                        {credibilityMetrics.map((metric, index) => (
                          <div key={index} className="score-metric">
                            <div className="metric-info">
                              <span className="metric-icon">{metric.icon}</span>
                              <span className="metric-label">{metric.label}</span>
                            </div>
                            <div className="metric-bar-container">
                              <div 
                                className="metric-bar"
                                style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                              ></div>
                              <span className="metric-value">{metric.score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Appointments */}
                  <div className="dashboard-card">
                    <div className="card-header">
                      <h4 className="card-title">
                        <Calendar size={20} />
                        <span>Upcoming Appointments</span>
                      </h4>
                      <button className="card-action">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="appointments-list">
                      {appointments.slice(0, 3).map(appointment => (
                        <div key={appointment.id} className="appointment-item">
                          <div className="appointment-type">
                            <div 
                              className="type-indicator"
                              style={{ 
                                backgroundColor: 
                                  appointment.type === 'rehab' ? '#10b981' :
                                  appointment.type === 'medical' ? '#3b82f6' :
                                  appointment.type === 'community' ? '#8b5cf6' :
                                  appointment.type === 'volunteer' ? '#f59e0b' : '#ef4444'
                              }}
                            ></div>
                            <span className="appointment-title">{appointment.title}</span>
                          </div>
                          <div className="appointment-details">
                            <span className="appointment-date">{appointment.date}</span>
                            <span className="appointment-time">{appointment.time}</span>
                          </div>
                          <div className="appointment-actions">
                            <button 
                              className="status-btn"
                              onClick={() => handleAppointmentStatus(appointment.id, 'completed')}
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button className="more-btn">
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Jobs Applied */}
                  <div className="dashboard-card">
                    <div className="card-header">
                      <h4 className="card-title">
                        <Briefcase size={20} />
                        <span>Jobs Applied</span>
                      </h4>
                      <span className="card-badge">{jobsApplied.length}</span>
                    </div>
                    <div className="applications-list">
                      {jobsApplied.slice(0, 4).map(job => (
                        <div key={job.id} className="application-item">
                          <div className="application-info">
                            <span className="application-title">{job.title}</span>
                            <span className="application-company">{job.company}</span>
                          </div>
                          <div className="application-status">
                            <span className={`status-badge ${job.status}`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                            <span className="application-date">{job.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User Progress */}
                  <div className="dashboard-card">
                    <div className="card-header">
                      <h4 className="card-title">
                        <Activity size={20} />
                        <span>Your Progress</span>
                      </h4>
                      <span className="card-badge">85%</span>
                    </div>
                    <div className="progress-metrics">
                      {Object.entries(userProgress).map(([key, value]) => (
                        <div key={key} className="progress-item">
                          <div className="progress-label">
                            <span className="progress-name">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span className="progress-value">{value}%</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                  <div className="activity-header">
                    <h4 className="activity-title">Recent Activity</h4>
                    <button className="view-all-btn">View All</button>
                  </div>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon success">
                        <CheckCircle size={16} />
                      </div>
                      <div className="activity-content">
                        <span className="activity-text">Applied for Construction Supervisor at BuildRight</span>
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon info">
                        <FileText size={16} />
                      </div>
                      <div className="activity-content">
                        <span className="activity-text">Uploaded Police Clearance Certificate</span>
                        <span className="activity-time">1 day ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon warning">
                        <Calendar size={16} />
                      </div>
                      <div className="activity-content">
                        <span className="activity-text">Scheduled Rehabilitation Session</span>
                        <span className="activity-time">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HOME TAB - Enhanced Community Feed */}
            {activeTab === 'home' && (
              <div className="home-tab">
                <div className="feed-header">
                  <h3 className="feed-title">
                    <Users size={24} />
                    Community Feed
                    <span className="feed-badge">{posts.length} posts</span>
                  </h3>
                  <div className="feed-actions">
                    <div className="post-type-selector">
                      <select 
                        className="post-type-select"
                        value={postType}
                        onChange={(e) => setPostType(e.target.value)}
                      >
                        {postTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="media-buttons">
                      <button 
                        className="upload-media-btn"
                        onClick={() => postFileInputRef.current?.click()}
                      >
                        <Image size={20} />
                        <span>Add Media</span>
                      </button>
                      <input
                        type="file"
                        ref={postFileInputRef}
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: 'none' }}
                      />
                      <button className="upload-video-btn">
                        <Video size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Create Post */}
                <div className="create-post-card">
                  <div className="post-user-info">
                    <div className="user-avatar">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="user-avatar-img" />
                      ) : (
                        <span className="avatar-initial">{user?.name?.charAt(0) || "U"}</span>
                      )}
                    </div>
                    <div className="user-details">
                      <h4 className="user-name">{user?.name || "You"}</h4>
                      <span className="user-type">
                        {user?.userType ? user.userType.replace('-', ' ').toUpperCase() : "MEMBER"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="post-content-area">
                    <textarea
                      placeholder={`Share your ${postTypeOptions.find(opt => opt.value === postType)?.label?.toLowerCase() || 'thoughts'}... (Max 1000 characters)`}
                      value={newPost}
                      onChange={(e) => {
                        if (e.target.value.length <= 1000) {
                          setNewPost(e.target.value);
                        }
                      }}
                      className="post-input"
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="char-count">
                      {newPost.length}/1000 characters
                    </div>
                    
                    {selectedImage && (
                      <div className="selected-image-preview">
                        <img src={selectedImage} alt="Selected" className="preview-image" />
                        <button 
                          className="remove-image-btn"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
                    <div className="post-actions">
                      <div className="post-type-indicator">
                        <span className="type-badge">
                          {postTypeOptions.find(opt => opt.value === postType)?.icon || "📝"} 
                          {postTypeOptions.find(opt => opt.value === postType)?.label || postType.toUpperCase()}
                        </span>
                      </div>
                      <button 
                        className="post-submit-btn"
                        onClick={handleNewPost}
                        disabled={!newPost.trim() && !selectedImage}
                      >
                        <SendHorizontal size={20} />
                        <span>Post</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Posts Feed */}
                <div className="posts-feed">
                  {posts.map(post => (
                    <div key={post.id} className="post-card">
                      <div className="post-header">
                        <div className="post-user">
                          <div className="post-avatar">
                            <span className="post-avatar-icon">{post.icon}</span>
                            {post.verified && (
                              <div className="verified-badge">
                                <ShieldCheck size={12} />
                              </div>
                            )}
                          </div>
                          <div className="post-user-info">
                            <h4 className="post-username">{post.user}</h4>
                            <div className="post-user-details">
                              <span className="post-user-role">{post.role}</span>
                              <span className="post-type-tag">{post.postType}</span>
                            </div>
                          </div>
                        </div>
                        <div className="post-timestamp">
                          <Clock size={14} />
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                      
                      <div className="post-content">
                        <p>{post.content}</p>
                        {post.image && (
                          <div className="post-image">
                            <img src={post.image} alt="Post content" />
                          </div>
                        )}
                      </div>
                      
                      <div className="post-stats">
                        <div className="post-stat">
                          <Heart size={16} />
                          <span>{post.likes} likes</span>
                        </div>
                        <div className="post-stat">
                          <MessageSquare size={16} />
                          <span>{post.comments.length} comments</span>
                        </div>
                        <div className="post-stat">
                          <Share2 size={16} />
                          <span>{post.shares} shares</span>
                        </div>
                      </div>
                      
                      <div className="post-actions">
                        <button 
                          className="post-action-btn"
                          onClick={() => handleLikePost(post.id)}
                        >
                          <ThumbsUp size={18} />
                          <span>Like</span>
                        </button>
                        <button className="post-action-btn">
                          <MessageSquare size={18} />
                          <span>Comment</span>
                        </button>
                        <button className="post-action-btn">
                          <Share2 size={18} />
                          <span>Share</span>
                        </button>
                        <button className="post-action-btn">
                          <Bookmark size={18} />
                        </button>
                      </div>
                      
                      {/* Enhanced Comments Section */}
                      <div className="post-comments">
                        <div className="comments-header">
                          <span className="comments-title">Comments ({post.comments.length})</span>
                          {post.allowComments ? (
                            <span className="comments-note">Only employers & organizations can comment</span>
                          ) : (
                            <span className="comments-note">Comments disabled</span>
                          )}
                        </div>
                        
                        {post.comments.map(comment => (
                          <div key={comment.id} className="comment-item">
                            <div className="comment-avatar">
                              <span className="avatar-initial-small">{comment.user.charAt(0)}</span>
                              {comment.verified && (
                                <div className="comment-verified">
                                  <ShieldCheck size={10} />
                                </div>
                              )}
                            </div>
                            <div className="comment-content">
                              <div className="comment-header">
                                <span className="comment-user">{comment.user}</span>
                                {comment.userType && (
                                  <span className="comment-user-type">{comment.userType.toUpperCase()}</span>
                                )}
                                <span className="comment-time">{comment.timestamp}</span>
                              </div>
                              <p className="comment-text">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                        
                        {post.allowComments && (
                          <div className="add-comment-section">
                            <div className="comment-avatar-small">
                              <span className="avatar-initial-small">{user?.name?.charAt(0) || "U"}</span>
                            </div>
                            <div className="comment-input-container">
                              <input
                                type="text"
                                placeholder="Add a comment as an employer or organization..."
                                className="comment-input"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && e.target.value.trim()) {
                                    handleAddComment(post.id, e.target.value);
                                    e.target.value = '';
                                  }
                                }}
                              />
                              <button 
                                className="comment-submit-btn"
                                onClick={(e) => {
                                  const input = e.target.closest('.comment-input-container').querySelector('.comment-input');
                                  if (input.value.trim()) {
                                    handleAddComment(post.id, input.value);
                                    input.value = '';
                                  }
                                }}
                              >
                                <SendHorizontal size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NETWORKING TAB - Enhanced Job Search */}
            {activeTab === 'networking' && (
              <div className="networking-tab">
                <div className="networking-header">
                  <h3 className="section-title">
                    <BriefcaseBusiness size={28} />
                    <span>Find Your Next Opportunity</span>
                  </h3>
                  <p className="section-subtitle">Jobs tailored to your skills and experience in South Africa</p>
                </div>

                {/* Enhanced Filters Section */}
                <div className="filters-section">
                  <div className="filters-grid">
                    <div className="filter-group">
                      <label className="filter-label">
                        <Filter size={16} />
                        Industry
                      </label>
                      <select 
                        className="filter-select"
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                      >
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label className="filter-label">
                        <MapPin size={16} />
                        Location
                      </label>
                      <select 
                        className="filter-select"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label className="filter-label">
                        <span className="salary-icon">R</span>
                        Salary Range
                      </label>
                      <select 
                        className="filter-select"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                      >
                        {salaryRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label className="filter-label">
                        <Calendar size={16} />
                        Availability
                      </label>
                      <select 
                        className="filter-select"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                      >
                        {availabilityOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label className="filter-label">
                        <Briefcase size={16} />
                        Job Type
                      </label>
                      <select 
                        className="filter-select"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label className="filter-label">&nbsp;</label>
                      <button 
                        className="reset-filters-btn"
                        onClick={() => {
                          setSelectedIndustry("All Industries");
                          setSelectedLocation("All Locations");
                          setSalaryRange("All Ranges");
                          setAvailability("All");
                          setJobType("All Types");
                          setShowJobCategory("All");
                        }}
                      >
                        <X size={16} />
                        <span>Reset All</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job Categories Tabs */}
                <div className="category-tabs">
                  {jobCategories.map(category => (
                    <button
                      key={category.id}
                      className={`category-tab ${showJobCategory === category.id ? 'active' : ''}`}
                      onClick={() => setShowJobCategory(category.id)}
                    >
                      <category.icon size={18} />
                      <span>{category.label}</span>
                      <span className="category-count">
                        {category.id === 'All' ? filteredJobs.length : jobsByCategory[category.id]?.length || 0}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Enhanced Jobs Grid */}
                <div className="jobs-section">
                  <div className="jobs-header">
                    <h4 className="jobs-title">
                      {showJobCategory === 'All' ? 'All Opportunities' : jobCategories.find(c => c.id === showJobCategory)?.label}
                      <span className="match-badge">{filteredJobs.length} matches</span>
                    </h4>
                    <div className="sort-options">
                      <select className="sort-select">
                        <option>Sort by: Best Match</option>
                        <option>Sort by: Most Recent</option>
                        <option>Sort by: Salary (High to Low)</option>
                        <option>Sort by: Application Deadline</option>
                      </select>
                    </div>
                  </div>
                  
                  {filteredJobs.length === 0 ? (
                    <div className="no-jobs-found">
                      <Briefcase size={48} />
                      <h4>No opportunities found</h4>
                      <p>Try adjusting your filters or check back later for new opportunities</p>
                    </div>
                  ) : (
                    <div className="jobs-grid">
                      {filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                          {job.urgent && (
                            <div className="urgent-badge">
                              <Zap size={12} />
                              <span>URGENT HIRING</span>
                            </div>
                          )}
                          
                          <div className="job-header">
                            <div className="company-logo">
                              <img src={job.logo} alt={job.company} className="logo-img" />
                              {job.urgent && <div className="logo-glow"></div>}
                            </div>
                            <div className="job-main-info">
                              <div className="job-title-row">
                                <h4 className="job-title">{job.title}</h4>
                                <span className="job-category">{job.category}</span>
                              </div>
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
                            <div className="detail-row">
                              <div className="detail-item">
                                <Clock size={14} />
                                <span>{job.type}</span>
                              </div>
                              <div className="detail-item">
                                <Calendar size={14} />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                            
                            <div className="job-description">
                              <p>{job.description}</p>
                            </div>
                            
                            <div className="job-skills">
                              {job.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                            
                            {job.benefits && (
                              <div className="job-benefits">
                                <span className="benefits-label">Benefits:</span>
                                <div className="benefits-list">
                                  {job.benefits.map((benefit, index) => (
                                    <span key={index} className="benefit-tag">{benefit}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="job-footer">
                            <div className="job-requirements">
                              <span className="requirements-label">Requirements:</span>
                              <span className="requirements-text">{job.requirements}</span>
                            </div>
                            <div className="job-actions">
                              <button className="job-action-btn view">
                                <Eye size={16} />
                                <span>View Details</span>
                              </button>
                              <button 
                                className="job-action-btn apply"
                                onClick={() => handleApplyForJob(job.id)}
                              >
                                <SendHorizontal size={16} />
                                <span>Apply Now</span>
                              </button>
                              <button className="job-action-btn save">
                                <Bookmark size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Networking Tips */}
                <div className="networking-tips">
                  <div className="tips-header">
                    <h4 className="tips-title">
                      <Megaphone size={20} />
                      Professional Networking Tips for South Africa
                    </h4>
                    <button className="refresh-tips-btn" onClick={() => setNotifications(prev => prev + 1)}>
                      <RefreshCw size={16} />
                    </button>
                  </div>
                  <div className="tips-list">
                    {networkingTips.map((tip, index) => (
                      <div key={index} className="tip-item">
                        <CheckCircle2 size={16} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Application Stats */}
                <div className="application-stats">
                  <div className="stat-card">
                    <div className="stat-card-icon">
                      <Send size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-card-number">{jobsApplied.length}</span>
                      <span className="stat-card-label">Applications Sent</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-icon">
                      <Clock size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-card-number">3</span>
                      <span className="stat-card-label">Interviews Scheduled</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-card-number">1</span>
                      <span className="stat-card-label">Job Offers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COMMUNITY TAB - Enhanced Credibility Building */}
            {activeTab === 'community' && (
              <div className="community-tab">
                <div className="community-header">
                  <h3 className="section-title">
                    <Users size={28} />
                    <span>Build Your Credibility</span>
                  </h3>
                  <p className="section-subtitle">Track your journey and submit referrals to increase your credibility score</p>
                </div>

                {/* Enhanced Credibility Dashboard */}
                <div className="credibility-dashboard">
                  <div className="dashboard-header">
                    <div className="score-display">
                      <div className="score-circle-large">
                        <span className="score-value-large">{credibilityScore}</span>
                        <span className="score-label-large">/100</span>
                      </div>
                      <div className="score-info">
                        <h4 className="score-title">Credibility Score</h4>
                        <p className="score-description">Based on referrals, employment history, and community engagement in South Africa</p>
                        <div className="score-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${credibilityScore}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{credibilityScore}% complete</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="score-breakdown">
                      <h5 className="breakdown-title">Score Breakdown</h5>
                      {credibilityMetrics.map((metric, index) => (
                        <div key={index} className="metric-item">
                          <div className="metric-label">
                            <div 
                              className="metric-dot"
                              style={{ backgroundColor: metric.color }}
                            ></div>
                            <span className="metric-name">{metric.label}</span>
                            <span className="metric-icon">{metric.icon}</span>
                          </div>
                          <div className="metric-details">
                            <div className="metric-bar">
                              <div 
                                className="metric-fill"
                                style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                              ></div>
                            </div>
                            <span className="metric-value">{metric.score}% (+{metric.points} pts)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Referral System */}
                <div className="referral-system">
                  <div className="referral-header">
                    <h4 className="referral-title">
                      <FileText size={24} />
                      Submit Referral Documents
                    </h4>
                    <p className="referral-subtitle">Upload documents to increase your credibility score</p>
                  </div>
                  
                  <div className="referral-types">
                    {referralTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`referral-type-card ${referralType === type.id ? 'selected' : ''}`}
                        onClick={() => setReferralType(type.id)}
                        style={{ borderLeftColor: type.color }}
                      >
                        <div className="type-icon">
                          <type.icon size={24} />
                        </div>
                        <div className="type-details">
                          <h5 className="type-name">{type.label}</h5>
                          <p className="type-desc">{type.description}</p>
                        </div>
                        <div className="type-points">
                          <span className="points-value">+{type.points} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="upload-section">
                    <div className="upload-card">
                      <div className="upload-icon">
                        <UploadCloud size={48} />
                      </div>
                      <div className="upload-info">
                        <h5 className="upload-title">Upload {referralTypes.find(t => t.id === referralType)?.label} Document</h5>
                        <p className="upload-description">
                          Upload scanned copy or photo of your document. Accepted formats: PDF, JPG, PNG (Max 10MB)
                        </p>
                      </div>
                      <div className="upload-actions">
                        <input
                          type="file"
                          id="document-upload"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleDocumentUpload}
                          className="file-input"
                        />
                        <label htmlFor="document-upload" className="upload-btn">
                          {uploadingFile ? (
                            <>
                              <Loader2 size={16} className="spinner" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload size={16} />
                              <span>Choose File</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    
                    {/* Uploaded Documents */}
                    {referralDocuments.length > 0 && (
                      <div className="uploaded-documents">
                        <h5 className="documents-title">Recently Uploaded Documents</h5>
                        <div className="documents-list">
                          {referralDocuments.slice(0, 3).map(doc => (
                            <div key={doc.id} className="document-item">
                              <div className="document-icon">
                                <FileText size={20} />
                              </div>
                              <div className="document-info">
                                <span className="document-name">{doc.name}</span>
                                <div className="document-meta">
                                  <span className="document-type">{doc.type}</span>
                                  <span className="document-date">{doc.date}</span>
                                  <span className="document-points">+{doc.points} pts</span>
                                  <span className="document-size">{doc.size}</span>
                                </div>
                              </div>
                              <div className="document-actions">
                                <button className="document-action">
                                  <Eye size={16} />
                                </button>
                                <button className="document-action">
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Rehabilitation Timeline */}
                <div className="timeline-section">
                  <div className="timeline-header">
                    <h4 className="timeline-title">
                      <Clock4 size={24} />
                      Your Rehabilitation Journey in South Africa
                    </h4>
                    <button className="edit-timeline-btn">
                      <Edit size={16} />
                      <span>Edit Timeline</span>
                    </button>
                  </div>
                  
                  <div className="timeline-container">
                    <div className="timeline-track">
                      {rehabilitationTimeline.map((item, index) => (
                        <div key={item.id} className={`timeline-item ${item.status}`}>
                          <div className="timeline-marker">
                            <div 
                              className="marker-dot"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            {index < rehabilitationTimeline.length - 1 && (
                              <div className="timeline-connector"></div>
                            )}
                          </div>
                          <div className="timeline-content">
                            <div className="timeline-year">{item.year}</div>
                            <div className="timeline-event-row">
                              <span className="timeline-event-icon">{item.icon}</span>
                              <h5 className="timeline-event">{item.event}</h5>
                            </div>
                            <p className="timeline-description">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Community Events */}
                <div className="community-events">
                  <div className="events-header">
                    <h4 className="events-title">
                      <Calendar size={24} />
                      Upcoming Community Events
                    </h4>
                    <button className="view-all-btn">View All</button>
                  </div>
                  <div className="events-grid">
                    <div className="event-card">
                      <div className="event-date">
                        <span className="event-day">15</span>
                        <span className="event-month">FEB</span>
                      </div>
                      <div className="event-details">
                        <h5 className="event-title">Job Fair 2024 - Soweto</h5>
                        <p className="event-description">Connect with employers and find opportunities</p>
                        <div className="event-info">
                          <span className="event-location">Soweto Expo Centre</span>
                          <span className="event-time">9:00 AM - 4:00 PM</span>
                        </div>
                      </div>
                      <button className="event-rsvp">RSVP</button>
                    </div>
                    <div className="event-card">
                      <div className="event-date">
                        <span className="event-day">22</span>
                        <span className="event-month">FEB</span>
                      </div>
                      <div className="event-details">
                        <h5 className="event-title">Skills Workshop - Johannesburg</h5>
                        <p className="event-description">Learn interview skills and resume writing</p>
                        <div className="event-info">
                          <span className="event-location">Johannesburg Career Centre</span>
                          <span className="event-time">2:00 PM - 5:00 PM</span>
                        </div>
                      </div>
                      <button className="event-rsvp">RSVP</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MESSAGES TAB - Enhanced Communication */}
            {activeTab === 'messages' && (
              <div className="messages-tab">
                <div className="messages-header">
                  <h3 className="section-title">
                    <MessageCircle size={28} />
                    <span>Messages</span>
                  </h3>
                  <p className="section-subtitle">Communicate with verified South African employers only</p>
                </div>

                <div className="messages-container">
                  {/* Enhanced Conversations List */}
                  <div className="conversations-sidebar">
                    <div className="conversations-header">
                      <h4 className="conversations-title">Employer Conversations</h4>
                      <div className="conversation-filters">
                        <button className="filter-btn active">All</button>
                        <button className="filter-btn">Unread</button>
                        <button className="filter-btn">
                          <Archive size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="conversations-list">
                      {conversations.map(convo => (
                        <div 
                          key={convo.id}
                          className={`conversation-item ${selectedConversation?.id === convo.id ? 'active' : ''} ${convo.unread ? 'unread' : ''}`}
                          onClick={() => {
                            setSelectedConversation(convo);
                            setMessages(convo.messages);
                            convo.unread = false;
                          }}
                        >
                          <div className="conversation-avatar">
                            <img src={convo.logo} alt={convo.employer} className="employer-logo" />
                            {convo.verified && (
                              <div className="verified-indicator">
                                <ShieldCheck size={10} />
                              </div>
                            )}
                          </div>
                          <div className="conversation-details">
                            <div className="conversation-header">
                              <h5 className="employer-name">{convo.employer}</h5>
                              <span className="conversation-time">{convo.time}</span>
                            </div>
                            <p className="conversation-preview">{convo.lastMessage}</p>
                            <div className="conversation-status">
                              {convo.verified && (
                                <span className="verified-badge-small">
                                  <ShieldCheck size={10} />
                                  Verified
                                </span>
                              )}
                              {convo.unread && <span className="unread-indicator"></span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Chat Area */}
                  <div className="chat-area">
                    {selectedConversation ? (
                      <>
                        <div className="chat-header">
                          <div className="chat-partner">
                            <div className="partner-avatar">
                              <img src={selectedConversation.logo} alt={selectedConversation.employer} />
                            </div>
                            <div className="partner-info">
                              <h4 className="partner-name">{selectedConversation.employer}</h4>
                              <div className="partner-status">
                                <div className="status-dot online"></div>
                                <span>Verified South African Employer • Online</span>
                              </div>
                            </div>
                          </div>
                          <div className="chat-actions">
                            <button className="chat-action-btn">
                              <Phone size={18} />
                            </button>
                            <button className="chat-action-btn">
                              <Archive size={18} />
                            </button>
                            <button className="chat-action-btn">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="chat-messages">
                          {messages.length > 0 ? (
                            <>
                              <div className="message-date">
                                <span>Today</span>
                              </div>
                              {messages.map(message => (
                                <div 
                                  key={message.id} 
                                  className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                                >
                                  <div className="message-content">
                                    <p>{message.content}</p>
                                    <span className="message-time">{message.time}</span>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className="no-messages">
                              <MessageSquare size={48} />
                              <h4>Start a conversation</h4>
                              <p>Send your first message to {selectedConversation.employer}</p>
                            </div>
                          )}
                          <div ref={messageEndRef} />
                        </div>
                        
                        <div className="chat-input-area">
                          <div className="message-input-container">
                            <input
                              type="text"
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              placeholder="Type your message..."
                              className="message-input"
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <div className="input-actions">
                              <button className="input-action-btn">
                                <Image size={18} />
                              </button>
                              <button className="input-action-btn">
                                <FileText size={18} />
                              </button>
                              <button 
                                className="send-message-btn"
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                              >
                                <Send size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="no-conversation-selected">
                        <MessageCircle size={64} />
                        <h4>Select a conversation</h4>
                        <p>Choose a South African employer from the list to start messaging</p>
                        <div className="messaging-tips">
                          <h5>Messaging Tips:</h5>
                          <ul>
                            <li>Be professional and respectful</li>
                            <li>Clearly state your purpose</li>
                            <li>Attach relevant documents if needed</li>
                            <li>Follow up politely if no response</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE TAB - Enhanced User Profile */}
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <div className="profile-header-section">
                  <div className="profile-cover">
                    <div className="profile-avatar-large">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="profile-avatar-img-large" />
                      ) : (
                        <span className="avatar-initial-large">{user?.name?.charAt(0) || "U"}</span>
                      )}
                      <button 
                        className="change-photo-btn"
                        onClick={() => profilePicRef.current?.click()}
                      >
                        <Camera size={16} />
                        <span>Change Photo</span>
                      </button>
                      <input
                        type="file"
                        ref={profilePicRef}
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className="profile-info-main">
                      <h2 className="profile-name">{user?.name || "Your Name"}</h2>
                      <p className="profile-title">RE-Link Member - South Africa</p>
                      <div className="profile-stats">
                        <div className="profile-stat-item">
                          <span className="stat-number">{credibilityScore}</span>
                          <span className="stat-label">Credibility</span>
                        </div>
                        <div className="profile-stat-item">
                          <span className="stat-number">{jobsApplied.length}</span>
                          <span className="stat-label">Applications</span>
                        </div>
                        <div className="profile-stat-item">
                          <span className="stat-number">{referralDocuments.length}</span>
                          <span className="stat-label">Documents</span>
                        </div>
                        <div className="profile-stat-item">
                          <span className="stat-number">{appointments.length}</span>
                          <span className="stat-label">Appointments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-content">
                  {/* Enhanced Personal Information */}
                  <div className="profile-section">
                    <div className="section-header">
                      <h3 className="section-title">
                        <UserCheck size={24} />
                        <span>Personal Information</span>
                      </h3>
                      <button className="edit-section-btn">
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                    </div>
                    
                    <div className="personal-info-grid">
                      <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{user?.name || "Not provided"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{user?.email || "Not provided"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone</span>
                        <span className="info-value">+27 {user?.phone || "Not provided"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">ID Number</span>
                        <span className="info-value">{user?.idNumber || "Not provided"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Date of Birth</span>
                        <span className="info-value">{user?.dob || "Not provided"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Location</span>
                        <span className="info-value">{user?.location || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sensitive Information Section */}
                  <div className="profile-section">
                    <div className="section-header">
                      <h3 className="section-title">
                        <Shield size={24} />
                        <span>Sensitive Information</span>
                        <span className="section-badge">Visible to Verified South African Recruiters Only</span>
                      </h3>
                      <button 
                        className="toggle-sensitive-btn"
                        onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                      >
                        {showSensitiveInfo ? <EyeOff size={16} /> : <Eye size={16} />}
                        <span>{showSensitiveInfo ? 'Hide' : 'Show'}</span>
                      </button>
                    </div>
                    
                    {showSensitiveInfo ? (
                      <div className="sensitive-info-grid">
                        <div className="info-item">
                          <span className="info-label">Correctional Facility</span>
                          <span className="info-value">Johannesburg Correctional Centre</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Sentence Duration</span>
                          <span className="info-value">2019 - 2023 (4 years)</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Offense Category</span>
                          <span className="info-value">Non-violent property crime</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Parole Officer</span>
                          <span className="info-value">Officer Sarah Johnson (SAPS)</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Parole End Date</span>
                          <span className="info-value">December 2025</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Rehabilitation Status</span>
                          <span className="info-value success">Completed</span>
                        </div>
                      </div>
                    ) : (
                      <div className="sensitive-info-hidden">
                        <Lock size={32} />
                        <p>This information is hidden and only visible to verified South African recruiters</p>
                        <button 
                          className="show-sensitive-btn"
                          onClick={() => setShowSensitiveInfo(true)}
                        >
                          <Eye size={16} />
                          <span>Show to View</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Skills & Education */}
                  <div className="profile-section">
                    <div className="section-header">
                      <h3 className="section-title">
                        <GraduationCap size={24} />
                        <span>Skills, Education & Certificates</span>
                      </h3>
                      <button className="add-item-btn">
                        <Plus size={16} />
                        <span>Add</span>
                      </button>
                    </div>
                    
                    <div className="skills-section">
                      <h4 className="subsection-title">Skills</h4>
                      <div className="skills-list">
                        {["Construction", "Leadership", "Team Management", "Safety Compliance", "Problem Solving", "Communication"].map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="education-section">
                      <h4 className="subsection-title">Education & Certificates</h4>
                      <div className="education-list">
                        <div className="education-item">
                          <div className="edu-icon">
                            <Award size={20} />
                          </div>
                          <div className="edu-details">
                            <h5 className="edu-title">Construction Management Certificate</h5>
                            <p className="edu-institution">SA Technical Training Centre, Johannesburg</p>
                            <span className="edu-year">2022</span>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="edu-icon">
                            <Award size={20} />
                          </div>
                          <div className="edu-details">
                            <h5 className="edu-title">Forklift Operator License</h5>
                            <p className="edu-institution">SA Construction Authority</p>
                            <span className="edu-year">2023</span>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="edu-icon">
                            <Award size={20} />
                          </div>
                          <div className="edu-details">
                            <h5 className="edu-title">Health & Safety Training</h5>
                            <p className="edu-institution">Construction Safety Board of SA</p>
                            <span className="edu-year">2023</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Work Experience */}
                  <div className="profile-section">
                    <div className="section-header">
                      <h3 className="section-title">
                        <Briefcase size={24} />
                        <span>Work Experience in South Africa</span>
                      </h3>
                      <button className="add-item-btn">
                        <Plus size={16} />
                        <span>Add Experience</span>
                      </button>
                    </div>
                    
                    <div className="experience-list">
                      <div className="experience-item">
                        <div className="exp-icon">
                          <Briefcase size={20} />
                        </div>
                        <div className="exp-details">
                          <h5 className="exp-title">Construction Supervisor</h5>
                          <p className="exp-company">BuildRight Construction, Soweto</p>
                          <span className="exp-duration">2023 - Present</span>
                          <p className="exp-description">Leading construction projects, managing teams of 15+, ensuring safety compliance, and coordinating with clients.</p>
                        </div>
                      </div>
                      <div className="experience-item">
                        <div className="exp-icon">
                          <Briefcase size={20} />
                        </div>
                        <div className="exp-details">
                          <h5 className="exp-title">Construction Worker</h5>
                          <p className="exp-company">BuildRight Construction, Soweto</p>
                          <span className="exp-duration">2023 - 2023 (6 months)</span>
                          <p className="exp-description">General construction work, team collaboration, following safety protocols, and learning advanced skills.</p>
                        </div>
                      </div>
                      <div className="experience-item">
                        <div className="exp-icon">
                          <Briefcase size={20} />
                        </div>
                        <div className="exp-details">
                          <h5 className="exp-title">Warehouse Assistant</h5>
                          <p className="exp-company">Unitrans Logistics, Johannesburg</p>
                          <span className="exp-duration">2023 - 2023 (3 months)</span>
                          <p className="exp-description">Inventory management, packing, shipping, and assisting with warehouse operations.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Account Actions */}
                  <div className="profile-section">
                    <div className="section-header">
                      <h3 className="section-title">
                        <Settings size={24} />
                        <span>Account Settings</span>
                      </h3>
                    </div>
                    
                    <div className="account-actions">
                      <button className="account-action-btn">
                        <DownloadCloud size={18} />
                        <div className="action-content">
                          <span className="action-title">Export Data</span>
                          <span className="action-desc">Download all your RE-Link data</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                      
                      <button className="account-action-btn">
                        <Shield size={18} />
                        <div className="action-content">
                          <span className="action-title">Privacy Settings</span>
                          <span className="action-desc">Manage your privacy preferences</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                      
                      <button className="account-action-btn">
                        <BellRing size={18} />
                        <div className="action-content">
                          <span className="action-title">Notifications</span>
                          <span className="action-desc">Configure your notification settings</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                      
                      <button className="account-action-btn logout" onClick={handleLogout}>
                        <LogOut size={18} />
                        <div className="action-content">
                          <span className="action-title">Logout</span>
                          <span className="action-desc">Sign out of your account</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                      
                      <button className="account-action-btn delete" onClick={handleDeleteAccount}>
                        <Trash2 size={18} />
                        <div className="action-content">
                          <span className="action-title">Delete Account</span>
                          <span className="action-desc">Permanently remove your account</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Enhanced Footer */}
        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-left">
              <div className="footer-logo">
                <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
                <div className="footer-logo-text">
                  <h4>RE-LINK</h4>
                  <p>Second Chances, Real Connections</p>
                </div>
              </div>
              <p className="footer-partnership">Official Partner: Department of Correctional Services South Africa</p>
              <div className="footer-certs">
                <span className="footer-cert">
                  <ShieldCheck size={14} />
                  <span>POPIA Compliant</span>
                </span>
                <span className="footer-cert">
                  <Shield size={14} />
                  <span>Secure Platform</span>
                </span>
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-links">
                <a href="#" className="footer-link">
                  <HelpCircle size={14} />
                  <span>Help Center</span>
                </a>
                <a href="#" className="footer-link">
                  <Shield size={14} />
                  <span>Privacy Policy</span>
                </a>
                <a href="#" className="footer-link">
                  <FileText size={14} />
                  <span>Terms of Service</span>
                </a>
                <a href="#" className="footer-link">
                  <Phone size={14} />
                  <span>Contact Support</span>
                </a>
              </div>
              <p className="footer-copyright">
                © {new Date().getFullYear()} RE-Link South Africa. All rights reserved.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <Facebook size={16} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={16} />
                </a>
                <a href="#" className="social-link">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
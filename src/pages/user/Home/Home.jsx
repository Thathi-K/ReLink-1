// src/pages/Home/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon, Briefcase, MessageCircle, Users, User,
  BarChart3, LogOut, Trash2, Sun, Moon
} from "lucide-react";

// Import all subcomponents
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';

// Import tab components
import OverviewTab from './components/tabs/OverviewTab';
import HomeTab from './components/tabs/HomeTab';
import NetworkingTab from './components/tabs/NetworkingTab';
import LearningTab from './components/tabs/LearningTab';
import MentorsTab from './components/tabs/MentorsTab';
import CommunityTab from './components/tabs/CommunityTab';
import MessagesTab from './components/tabs/MessagesTab';
import ProfileTab from './components/tabs/ProfileTab';

// Import data and utilities
import {
  motivationalPosts,
  featuredJobs,
  networkingTips,
  rehabilitationTimeline,
  conversations,
  credibilityMetrics,
  referralTypes,
  industries,
  locations,
  salaryRanges,
  availabilityOptions,
  jobTypes,
  jobCategories,
  postTypeOptions
} from './data/mockData';

import "./Home.css";
import ReLinkLogo from "../../../assets/RelinkLOGO.jpeg";

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [credibilityScore, setCredibilityScore] = useState(78);
  const [profilePicture, setProfilePicture] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [quickStats, setQuickStats] = useState({
    dailyViews: 24,
    weeklyConnections: 8,
    monthlyApplications: 12,
    totalReferrals: 5,
    eventsAttended: 3,
    certificatesEarned: 2
  });

  const logoRef = useRef(null);

  // Load data on component mount
  useEffect(() => {
    loadUserData();
    loadInitialData();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('relink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
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

    const savedScore = localStorage.getItem('relink_credibility_score');
    if (savedScore) {
      setCredibilityScore(parseInt(savedScore));
    }

    const savedProfilePic = localStorage.getItem('relink_profile_pic');
    if (savedProfilePic) {
      setProfilePicture(savedProfilePic);
    }
  };

  const loadInitialData = () => {
    const savedPosts = localStorage.getItem('relink_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(motivationalPosts);
      localStorage.setItem('relink_posts', JSON.stringify(motivationalPosts));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("⚠️ WARNING: Are you sure you want to delete your account?\n\nThis action cannot be undone.")) {
      localStorage.clear();
      navigate('/');
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

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

  const handleProfilePictureUpdate = (newPicture) => {
    setProfilePicture(newPicture);
    localStorage.setItem('relink_profile_pic', newPicture);
  };

  const handleCredibilityScoreUpdate = (newScore) => {
    setCredibilityScore(newScore);
    localStorage.setItem('relink_credibility_score', newScore.toString());
  };

  const handlePostsUpdate = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem('relink_posts', JSON.stringify(updatedPosts));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        credibilityScore={credibilityScore}
        profilePicture={profilePicture}
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        onLogoAnimation={handleLogoAnimation}
        logoRef={logoRef}
        logo={ReLinkLogo}
      />

      <div className="main-content">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
        />

        <main className="content-area">
          <div className="welcome-banner">
            <div className="welcome-content">
              <div className="welcome-text">
                <h2 className="welcome-title">
                  Welcome back, {user?.name || "Champion"}!
                </h2>
                <p className="welcome-subtitle">
                  Your journey to success continues today
                </p>
              </div>
              <div className="welcome-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <BarChart3 size={20} />
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
                    <span className="stat-number">{featuredJobs.length}</span>
                    <span className="stat-label">Available Jobs</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <GraduationCap size={20} />
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">15+</span>
                    <span className="stat-label">Courses Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-content-container">
            {activeTab === 'overview' && (
              <OverviewTab
                user={user}
                credibilityScore={credibilityScore}
                quickStats={quickStats}
                credibilityMetrics={credibilityMetrics}
              />
            )}

            {activeTab === 'home' && (
              <HomeTab
                user={user}
                posts={posts}
                profilePicture={profilePicture}
                onPostsUpdate={handlePostsUpdate}
                postTypeOptions={postTypeOptions}
              />
            )}

            {activeTab === 'networking' && (
              <NetworkingTab
                user={user}
                featuredJobs={featuredJobs}
                industries={industries}
                locations={locations}
                jobTypes={jobTypes}
                jobCategories={jobCategories}
                onApplyForJob={(job) => {
                  console.log('Applied for job:', job);
                  alert(`✅ Application submitted for ${job.title}!`);
                }}
              />
            )}

            {activeTab === 'learning' && (
              <LearningTab user={user} />
            )}

            {activeTab === 'mentors' && (
              <MentorsTab user={user} />
            )}

            {activeTab === 'community' && (
              <CommunityTab
                user={user}
                credibilityScore={credibilityScore}
                referralTypes={referralTypes}
                rehabilitationTimeline={rehabilitationTimeline}
                networkingTips={networkingTips}
                onCredibilityUpdate={handleCredibilityScoreUpdate}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesTab
                user={user}
                conversations={conversations}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileTab
                user={user}
                profilePicture={profilePicture}
                onProfilePictureUpdate={handleProfilePictureUpdate}
                onLogout={handleLogout}
                onDeleteAccount={handleDeleteAccount}
              />
            )}
          </div>
        </main>

        <Footer logo={ReLinkLogo} />
      </div>
    </div>
  );
}

export default Home;
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Public pages
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

// User dashboard pages
import UserDashboard from "./pages/user/UserDashboard/UserDashboard.jsx";
import Profile from "./pages/user/Profile/Profile.jsx";
import JobOpportunities from "./pages/user/JobOpportunities/JobOpportunities.jsx";
import Referrals from "./pages/user/Referrals/Referrals.jsx";
import Timeline from "./pages/user/Timeline/Timeline.jsx";
import MentorsPage from "./pages/user/Mentors/Mentors.jsx";
import VerificationDashboard from "./pages/user/Verification/VerificationDashboard.jsx";

//Recruiter dashboard

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User area */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/mentors" element={<MentorsPage/>} />
        <Route path="/documents" element={<VerificationDashboard/>} />

        {/* Recruiter area */}
        <Route path="/recruiter" element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

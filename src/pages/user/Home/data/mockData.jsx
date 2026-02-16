// ==========================
// Imports
// ==========================
import BuildRightLogo from "../../../../assets/buildright_thumb.jpg";
import LogisticsSALogo from "../../../../assets/logistics_thumb.jpg";
import CallComLogo from "../../../../assets/callcom_thumb.jpg";
import ConstructionCoLogo from "../../../../assets/constructionco_thumb.jpg";

import {
  GraduationCap,
  Briefcase,
  BriefcaseBusiness,
  HandHeart,
  BookOpen
} from "lucide-react";


// ==========================
// Mock Images
// ==========================
const UserJourney1 =
  "https://via.placeholder.com/600x400/10b981/ffffff?text=Soweto+Success";
const UserJourney2 =
  "https://via.placeholder.com/600x400/059669/ffffff?text=Cape+Town+Journey";
const CompanyPost1 =
  "https://via.placeholder.com/600x400/3b82f6/ffffff?text=SA+Job+Fair";


// ==========================
// Motivational Posts
// ==========================
export const motivationalPosts = [
  {
    id: 1,
    user: "Thabo M.",
    userType: "ex-convict",
    role: "Construction Manager",
    icon: "👷",
    content:
      "Three years ago, I walked out of prison with nothing but hope. Today, I'm leading a team of 15 at BuildRight Construction in Soweto.",
    image: UserJourney1,
    timestamp: "2 hours ago",
    likes: 142,
    comments: [],
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
    content:
      "Our team-building event in Johannesburg last week! Proud to work with such dedicated South Africans.",
    image: CompanyPost1,
    timestamp: "3 hours ago",
    likes: 156,
    comments: [],
    shares: 22,
    postType: "company",
    verified: true,
    allowComments: true
  }
];


// ==========================
// Featured Jobs
// ==========================
export const featuredJobs = [
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
    skills: ["Leadership", "Construction", "Safety"],
    industry: "Construction",
    description: "Leading construction projects in Soweto.",
    requirements: "5+ years experience",
    category: "job",
    benefits: ["Medical Aid", "Provident Fund"]
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
    skills: ["Management", "Logistics"],
    industry: "Logistics",
    description: "Oversee warehouse operations.",
    requirements: "Warehouse experience",
    category: "job",
    benefits: ["Performance Bonus"]
  }
];


// ==========================
// Networking Tips
// ==========================
export const networkingTips = [
  "Complete your profile to attract employers",
  "Connect with verified recruiters",
  "Share your journey and achievements",
  "Stay active on the platform"
];


// ==========================
// Rehabilitation Timeline
// ==========================
export const rehabilitationTimeline = [
  {
    id: 1,
    year: "2019",
    event: "Incarceration Begins",
    description: "Started sentence",
    status: "incarcerated",
    icon: "🔒",
    color: "#ef4444"
  },
  {
    id: 2,
    year: "2023",
    event: "Release Date",
    description: "Joined RE-Link platform",
    status: "post",
    icon: "🎉",
    color: "#10b981"
  }
];


// ==========================
// Conversations
// ==========================
export const conversations = [
  {
    id: 1,
    employer: "BuildRight Construction",
    logo: BuildRightLogo,
    lastMessage: "We'd like to schedule an interview...",
    time: "10:30 AM",
    unread: true,
    verified: true,
    messages: []
  }
];


// ==========================
// Credibility Metrics
// ==========================
export const credibilityMetrics = [
  { label: "Skills & Employability", score: 85, color: "#10b981" },
  { label: "Rehabilitation Engagement", score: 72, color: "#059669" }
];


// ==========================
// Referral Types
// ==========================
export const referralTypes = [
  { id: "employer", label: "Previous Employer", points: 15 },
  { id: "education", label: "Education/Training", points: 18 }
];


// ==========================
// Filters
// ==========================
export const industries = [
  "All Industries",
  "Construction",
  "Logistics",
  "Retail"
];

export const locations = [
  "All Locations",
  "Johannesburg",
  "Soweto",
  "Cape Town"
];

export const salaryRanges = [
  "All Ranges",
  "R8,000 - R12,000",
  "R12,000 - R18,000",
  "R18,000 - R25,000"
];

export const availabilityOptions = [
  "All",
  "Immediate",
  "1-2 Weeks",
  "1 Month",
  "Flexible",
  "Part-time",
  "Weekends Only"
];

export const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Remote"
];


// ==========================
// Job Categories
// ==========================
export const jobCategories = [
  { id: "All", label: "All Opportunities", icon: Briefcase },
  { id: "job", label: "Available Jobs", icon: BriefcaseBusiness },
  { id: "learnership", label: "Learnerships", icon: GraduationCap },
  { id: "volunteer", label: "Volunteer Work", icon: HandHeart },
  { id: "internship", label: "Internships", icon: BookOpen }
];


// ==========================
// Post Type Options
// ==========================
export const postTypeOptions = {
  "ex-convict": [
    { value: "journey", label: "My Journey", icon: "🚶" },
    { value: "achievement", label: "Achievement", icon: "🏆" }
  ],
  recruiter: [
    { value: "opportunity", label: "Job Opportunity", icon: "💼" },
    { value: "company", label: "Company Update", icon: "🏢" }
  ],
  default: [
    { value: "quote", label: "Motivational Quote", icon: "💭" }
  ]
};

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
const UserJourney1 = "https://via.placeholder.com/600x400/10b981/ffffff?text=Soweto+Success";
const UserJourney2 = "https://via.placeholder.com/600x400/059669/ffffff?text=Cape+Town+Journey";
const CompanyPost1 = "https://via.placeholder.com/600x400/3b82f6/ffffff?text=SA+Job+Fair";


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
      "Three years ago, I walked out of prison with nothing but hope. Today, I'm leading a team of 15 at BuildRight Construction in Soweto. Your past doesn't define your future.",
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
  },
  {
    id: 3,
    user: "Mike T.",
    userType: "ex-convict",
    role: "Warehouse Supervisor",
    icon: "👤",
    content:
      "Completed my forklift certification today at the Johannesburg Training Centre! Never stop learning!",
    image: UserJourney2,
    timestamp: "5 hours ago",
    likes: 89,
    comments: [],
    shares: 15,
    postType: "achievement",
    verified: false,
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
    skills: ["Leadership", "Construction", "Safety", "Team Management"],
    industry: "Construction",
    description:
      "Leading construction projects in Soweto, managing teams, ensuring safety compliance.",
    requirements:
      "5+ years construction experience, leadership skills, safety certification",
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
    description:
      "Oversee warehouse operations and manage inventory.",
    requirements:
      "Warehouse experience, management skills, inventory knowledge",
    category: "job",
    benefits: ["Performance Bonus", "Transport Allowance", "Medical Insurance"]
  },
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
    skills: ["Willing to Learn", "Teamwork"],
    industry: "Construction",
    description:
      "12-month learnership program with on-the-job training.",
    requirements:
      "Matric certificate, no experience required",
    category: "learnership",
    benefits: ["NQF Certification", "Stipend", "Mentorship"]
  }
];


// ==========================
// Filters
// ==========================
export const industries = [
  "All Industries",
  "Construction",
  "Logistics",
  "Customer Service",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Security",
  "Technology",
  "Healthcare"
];

export const locations = [
  "All Locations",
  "Johannesburg",
  "Soweto",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Remote"
];

export const salaryRanges = [
  "All Ranges",
  "R8,000 - R12,000",
  "R12,000 - R18,000",
  "R18,000 - R25,000",
  "R25,000 - R35,000",
  "R35,000+"
];

export const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Remote"
];


// ==========================
// Job Categories (FIXED)
// ==========================
export const jobCategories = [
  { id: "All", label: "All Opportunities", icon: Briefcase },
  { id: "job", label: "Available Jobs", icon: BriefcaseBusiness },
  { id: "learnership", label: "Learnerships", icon: GraduationCap },
  { id: "volunteer", label: "Volunteer Work", icon: HandHeart },
  { id: "internship", label: "Internships", icon: BookOpen }
];

import React, { useState, useEffect } from 'react';
import {
  BarChart3, Eye, Network, Send, FileText,
  Target, Calendar, Briefcase, TrendingUp
} from "lucide-react";

function OverviewTab({ user, credibilityScore, quickStats, credibilityMetrics }) {
  const [appointments, setAppointments] = useState([]);
  const [jobsApplied, setJobsApplied] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedAppointments = localStorage.getItem('relink_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments([
        { id: 1, type: "rehab", title: "Rehabilitation Session", date: "2024-02-15", time: "10:00 AM", location: "Soweto Hope Center", status: "upcoming" },
        { id: 2, type: "medical", title: "Clinic Check-up", date: "2024-02-18", time: "2:30 PM", location: "Chris Hani Baragwanath", status: "upcoming" }
      ]);
    }

    const savedJobs = localStorage.getItem('relink_jobs_applied');
    if (savedJobs) {
      setJobsApplied(JSON.parse(savedJobs));
    } else {
      setJobsApplied([
        { id: 1, title: "Construction Supervisor", company: "BuildRight", date: "2024-02-10", status: "review" },
        { id: 2, title: "Warehouse Assistant", company: "Unitrans Logistics", date: "2024-02-08", status: "interview" }
      ]);
    }
  };

  return (
    <div className="overview-tab">
      <div className="overview-header">
        <h3 className="section-title">
          <BarChart3 size={28} />
          <span>Your Dashboard</span>
        </h3>
      </div>

      <div className="quick-stats-grid">
        <QuickStatCard
          icon={Eye}
          number={quickStats.dailyViews}
          label="Daily Profile Views"
          color="linear-gradient(135deg, #10b981, #34d399)"
        />
        <QuickStatCard
          icon={Network}
          number={quickStats.weeklyConnections}
          label="Weekly Connections"
          color="linear-gradient(135deg, #3b82f6, #60a5fa)"
        />
        <QuickStatCard
          icon={Send}
          number={quickStats.monthlyApplications}
          label="Monthly Applications"
          color="linear-gradient(135deg, #8b5cf6, #a78bfa)"
        />
        <QuickStatCard
          icon={FileText}
          number={quickStats.totalReferrals}
          label="Total Referrals"
          color="linear-gradient(135deg, #f59e0b, #fbbf24)"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card large">
          <div className="card-header">
            <h4 className="card-title">
              <Target size={20} />
              <span>Credibility Score</span>
            </h4>
          </div>
          <CredibilityDisplay 
            score={credibilityScore} 
            metrics={credibilityMetrics} 
          />
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h4 className="card-title">
              <Calendar size={20} />
              <span>Upcoming Appointments</span>
            </h4>
          </div>
          <AppointmentsList appointments={appointments} />
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h4 className="card-title">
              <Briefcase size={20} />
              <span>Jobs Applied</span>
            </h4>
          </div>
          <JobsAppliedList jobs={jobsApplied} />
        </div>
      </div>
    </div>
  );
}

function QuickStatCard({ icon: Icon, number, label, color }) {
  return (
    <div className="quick-stat-card">
      <div className="quick-stat-icon" style={{ background: color }}>
        <Icon size={24} />
      </div>
      <div className="quick-stat-content">
        <span className="quick-stat-number">{number}</span>
        <span className="quick-stat-label">{label}</span>
      </div>
    </div>
  );
}

function CredibilityDisplay({ score, metrics }) {
  return (
    <div className="credibility-display">
      <div className="score-circle-large">
        <span className="score-value-large">{score}</span>
        <span className="score-label-large">/100</span>
      </div>
      <div className="score-breakdown">
        {metrics.map((metric, index) => (
          <div key={index} className="score-metric">
            <div className="metric-info">
              <span className="metric-icon">{metric.icon}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
            <div className="metric-bar-container">
              <div 
                className="metric-bar"
                style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
              />
              <span className="metric-value">{metric.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentsList({ appointments }) {
  return (
    <div className="appointments-list">
      {appointments.slice(0, 3).map(appointment => (
        <div key={appointment.id} className="appointment-item">
          <div className="appointment-type">
            <div 
              className="type-indicator"
              style={{ 
                backgroundColor: 
                  appointment.type === 'rehab' ? '#10b981' :
                  appointment.type === 'medical' ? '#3b82f6' : '#8b5cf6'
              }}
            />
            <span className="appointment-title">{appointment.title}</span>
          </div>
          <div className="appointment-details">
            <span className="appointment-date">{appointment.date}</span>
            <span className="appointment-time">{appointment.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function JobsAppliedList({ jobs }) {
  return (
    <div className="applications-list">
      {jobs.slice(0, 4).map(job => (
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
  );
}

export default OverviewTab;
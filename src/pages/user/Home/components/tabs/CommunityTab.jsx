import React, { useState, useRef } from 'react';
import {
  Users,
  FileText,
  Upload,
  Loader2,
  Clock4,
  HeartHandshake,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  HandHeart
} from "lucide-react";

function CommunityTab({
  user,
  credibilityScore,
  referralTypes,
  rehabilitationTimeline,
  networkingTips,
  onCredibilityUpdate
}) {
  const [referralDocuments, setReferralDocuments] = useState([]);
  const [referralType, setReferralType] = useState("employer");
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef(null);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload PDF, JPG, or PNG files only.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size too large. Maximum 10MB.");
      return;
    }

    setUploadingFile(true);

    setTimeout(() => {
      const points = getReferralPoints(referralType);

      const newDocument = {
        id: Date.now(),
        name: file.name,
        type: referralType,
        date: new Date().toLocaleDateString(),
        status: "pending",
        points,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      };

      setReferralDocuments((prev) => [newDocument, ...prev]);
      setUploadingFile(false);

      const newScore = Math.min(100, credibilityScore + points);
      onCredibilityUpdate(newScore);

      alert(`✅ Document "${file.name}" uploaded successfully!\n+${points} credibility points added.`);
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

  return (
    <div className="community-tab">
      <div className="community-header">
        <h3 className="section-title">
          <Users size={28} />
          <span>Build Your Credibility</span>
        </h3>
      </div>

      <div className="credibility-dashboard">
        <div className="score-display">
          <div className="score-circle-large">
            <span className="score-value-large">{credibilityScore}</span>
            <span className="score-label-large">/100</span>
          </div>
          <div className="score-info">
            <h4>Credibility Score</h4>
            <p>
              Based on referrals, employment history, and community engagement
            </p>
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="referral-system">
        <h4 className="referral-title">
          <FileText size={24} />
          Submit Referral Documents
        </h4>

        <div className="referral-types">
          {referralTypes.map((type) => (
            <ReferralTypeCard
              key={type.id}
              type={type}
              isSelected={referralType === type.id}
              onSelect={() => setReferralType(type.id)}
            />
          ))}
        </div>

        <div className="upload-section">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleDocumentUpload}
            style={{ display: "none" }}
          />

          <button
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
          >
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
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <h4>
          <Clock4 size={24} />
          Your Rehabilitation Journey
        </h4>

        <div className="timeline-track">
          {rehabilitationTimeline.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Networking Tips */}
      <div className="tips-section">
        <h4>Networking Tips</h4>
        {networkingTips.map((tip, index) => (
          <div key={index} className="tip-item">
            • {tip}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferralTypeCard({ type, isSelected, onSelect }) {
  const IconComponent = getIconForType(type.id);

  return (
    <div
      className={`referral-type-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="type-icon">
        <IconComponent size={24} />
      </div>
      <div>
        <h5>{type.label}</h5>
        <p>{type.description}</p>
      </div>
      <span className="points-badge">+{type.points}</span>
    </div>
  );
}

function getIconForType(typeId) {
  const icons = {
    employer: Briefcase,
    rehab: HeartHandshake,
    police: ShieldCheck,
    community: Users,
    volunteer: HandHeart,
    education: GraduationCap,
    clearance: FileText   // ✅ FIXED (was Document)
  };
  return icons[typeId] || FileText;
}

function TimelineItem({ item }) {
  return (
    <div className={`timeline-item ${item.status}`}>
      <div
        className="marker-dot"
        style={{ backgroundColor: item.color }}
      />
      <div>
        <div>{item.year}</div>
        <h5>{item.event}</h5>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default CommunityTab;

import React from 'react';
import { Shield, FileText } from "lucide-react";

function Footer({ logo }) {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="RE-Link" className="footer-logo-img" />
            <div className="footer-logo-text">
              <h4>RE-LINK</h4>
              <p>Second Chances, Real Connections</p>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <a href="#" className="footer-link">
              <Shield size={14} />
              <span>Privacy Policy</span>
            </a>
            <a href="#" className="footer-link">
              <FileText size={14} />
              <span>Terms of Service</span>
            </a>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} RE-Link South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
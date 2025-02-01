import * as React from "react";
import letMeKnow from './assets/let-me-know-icon.svg';

export function Footer() {
  return (
    <div className="footer-container">
        <div className="footer-btns">
        <div className="footer-left">
            <p>Suggestions?</p>
            <div className="let-me-know-btn">
                <img src={letMeKnow} alt="Let me know" className="let-me-know-btn-icon" />
                <span>let me know</span>
            </div>
        </div>
        <div className="footer-right">
            <p>Support me</p>
            <div className="support-me-btn">
                <img src={letMeKnow} alt="Support me" className="support-me-btn-icon" />
                <span>buy me a coffee</span>
        </div>
        </div>
        </div>
        <p className="footer-copyright">©2025 Save & Resume | Version 1.0.0</p>
    </div>
  );
}

export default Footer;
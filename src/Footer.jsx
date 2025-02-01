import * as React from "react";
import letMeKnow from './assets/let-me-know-icon.svg';
import supportMe from './assets/buy-me-a-coffee-icon.svg';

export function Footer() {
  return (
    <div className="footer-container">
        <div className="footer-btns">
        <div className="footer-left">
            <p>Suggestions?</p>
            {/* <div className="let-me-know-btn">
                <img src={letMeKnow} alt="Let me know" className="let-me-know-btn-icon" />
                <span>let me know</span>
            </div> */}
            <a 
                href="https://www.linkedin.com/in/jithinsabu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="let-me-know-link"
            >
                <div className="let-me-know-btn">
                    <img src={letMeKnow} alt="Let me know" className="let-me-know-btn-icon" />
                    <span>let me know</span>
                </div>
            </a>
        </div>
        <div className="footer-right">
            <p>Support me</p>
            <a 
                href="https://www.buymeacoffee.com/jithinsabu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="support-me-link"
            >
                <div className="support-me-btn">
                    <img src={supportMe} alt="Support me" className="support-me-btn-icon" />
                    <span>buy me a coffee</span>
                </div>
            </a>
        </div>
        </div>
        <p className="footer-copyright">©2025 Save & Resume | Version 1.0.0</p>
    </div>
  );
}

export default Footer;
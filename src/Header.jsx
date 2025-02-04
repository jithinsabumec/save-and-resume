import * as React from "react";
import logo from './assets/icon_word.svg';

export function Header() {
  return (
    <div className="navbar">
        <img src={logo} alt="Save & Resume" className="logo" />
        <div className="navbar-right">
        {/* <div className="coming-soon">Coming soon!</div> */}
        <a 
                    href="https://chromewebstore.google.com/detail/save-resume/bdhfmkbbfmbhimbnhdglopcdlkihpike" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="addtochrome-btn"
                >
                    <div>
                    Add to Chrome
                    </div>
                </a>
        {/* <div className="addtochrome-btn">Add to Chrome</div> */}
        </div>
    </div>
  );
}

export default Header;
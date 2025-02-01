import * as React from "react";
import herodesktop from './assets/hero-image.svg';
import heromobile from './assets/hero-image-mobile.svg';
export function Hero() {
  return (<div className="hero-container">
  <div className="hero-container-text">
            <div className="hero-text">
                <h1 className="break-desktop">
                Because life happens <br /> between that 2 hour video...
                </h1>
                <h1 className="break-mobile">
                Because life <br />happens between <br />that 2 hour video... 
                </h1>
                <h2 className="break-desktop-h2">
                Save timestamps in long videos and pick up exactly where you left off. <br /> Like a bookmark for your brain, but for YouTube tutorials.
                </h2>
                <h2 className="break-mobile-h2">
                Save timestamps in long videos and pick up exactly where you left off.  Like a bookmark <br />for your brain, but for YouTube tutorials.
                </h2>
            </div>
                <a 
                    href="https://drive.google.com/drive/folders/1Wg7yAjcmkxLitbbCIIhXdY-znEIpWhNE?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="download-link"
                >
                    <div className="download-btn">
                        Download extension - it's free
                    </div>
                </a>
        </div>
        <img src={herodesktop} alt="Hero Image" className="hero-image-desktop" />
        <img src={heromobile} alt="Hero Image" className="hero-image-mobile" />
        </div>
  );
}

export default Hero;
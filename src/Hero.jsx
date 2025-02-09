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
                    href="https://chromewebstore.google.com/detail/save-resume/bdhfmkbbfmbhimbnhdglopcdlkihpike" 
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
        
        <div>
            <a href="https://www.producthunt.com/posts/save-resume?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-save&#0045;resume" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=840225&theme=dark&t=1739113879714" alt="Save&#0032;&#0038;&#0032;Resume - The&#0032;Ultimate&#0032;YouTube&#0032;Timestamp&#0032;Saver&#0046; | Product Hunt" className="product-hunt-badge"/></a>
        </div>
        </div>
  );
}

export default Hero;
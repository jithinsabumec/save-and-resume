import * as React from "react";
import hero from './assets/hero-image.svg';

export function Hero() {
  return (<div className="hero-container">
  <div className="hero-container-text">
            <div className="hero-text">
                <h1>
                Because life happens <br /> between that 2 hour video...
                </h1>
                <h2>
                Save timestamps in long videos and pick up exactly where you left off. <br /> Like a bookmark for your brain, but for YouTube tutorials.
                </h2>
            </div>
                <div className="download-btn">
                Download extension - it's free
                </div>
        </div>
        <img src={hero} alt="Hero Image" className="hero-image" />
        </div>
  );
}

export default Hero;
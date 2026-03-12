import * as React from "react";
import heroPreview from "./assets/figma/hero-preview.png";

export function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-container-text">
        <div className="hero-text">
          <h1>Stop losing your place in YouTube videos.</h1>
          <h2>
            Save any moment in one click. Jump straight back whenever you want.
            <br />
            Free, no account needed.
          </h2>
        </div>

        <a
          href="https://chromewebstore.google.com/detail/save-resume/bdhfmkbbfmbhimbnhdglopcdlkihpike"
          target="_blank"
          rel="noopener noreferrer"
          className="download-link"
        >
          <span className="download-btn">Add to chrome - it’s free</span>
        </a>
      </div>
    </section>
  );
}

export default Hero;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import icon from './assets/logo(icon+wordmark).svg'
import stepOneImage from './assets/how-it-works-01.svg';
import stepTwoImage from './assets/how-it-works-02.svg';
import stepThreeImage from './assets/how-it-works-03.svg';
import waitlistPreview from './assets/phone.svg';
import playIcon from './assets/circle-play.svg';
import iconLogo from './assets/icon.svg'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';

const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/save-resume/bdhfmkbbfmbhimbnhdglopcdlkihpike';
const FEEDBACK_URL = 'https://app.youform.com/forms/7u8sqy1m';
const BUY_ME_A_COFFEE_URL = 'https://www.buymeacoffee.com/jithinsabu';
const DEMO_VIDEO_URL =
  'https://firebasestorage.googleapis.com/v0/b/save-and-resume.firebasestorage.app/o/demo-extension.mp4?alt=media&token=ffcaf06a-1dac-4e97-8469-567f99365241';
const DEMO_VIDEO_ASPECT_RATIO = 1624 / 1080;
const DEFAULT_WAITLIST_GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfwJ1qzmCfVxEbBPQxhOkloj9cHbz5Wosv1zPp7fkq4FDHnKQ/formResponse';
const DEFAULT_WAITLIST_GOOGLE_FORM_EMAIL_ENTRY = 'entry.307182452';

const WAITLIST_CONFIG = {
  appsScriptUrl: (process.env.REACT_APP_WAITLIST_APPS_SCRIPT_URL || '').trim(),
  googleFormAction:
    (process.env.REACT_APP_WAITLIST_GOOGLE_FORM_ACTION || DEFAULT_WAITLIST_GOOGLE_FORM_ACTION)
      .trim()
      .split('?')[0],
  googleFormEmailEntry:
    (process.env.REACT_APP_WAITLIST_GOOGLE_FORM_EMAIL_ENTRY || DEFAULT_WAITLIST_GOOGLE_FORM_EMAIL_ENTRY).trim(),
};

const DEMO_STEP_DURATION_MS = 3500;
const DEMO_STEP_FADE_DURATION_MS = 300;
const DEMO_STEP_SWIPE_THRESHOLD_PX = 48;

const stepItems = [
  {
    number: '01',
    image: stepOneImage,
    width: 232,
    height: 189,
    title: 'Open a YouTube video',
    description: 'Open any YouTube video and navigate to the moment you want to save.',
  },
  {
    number: '02',
    image: stepTwoImage,
    width: 281,
    height: 193,
    title: 'Save a Timestamp',
    description: 'Click "Save Timestamp" using the extension button or keyboard shortcut.',
  },
  {
    number: '03',
    image: stepThreeImage,
    width: 250,
    height: 192,
    title: 'Jump to Timestamps',
    description: 'Click any saved timestamp in the extension and continue from that exact moment.',
  },
];

const demoModalSteps = [
  {
    heading: 'Open a YouTube video',
    description: 'Navigate to any moment you want to come back to.',
  },
  {
    heading: 'Save the timestamp',
    description: 'Click Save Timestamp or press Alt+S.',
  },
  {
    heading: 'Jump straight back',
    description: 'Click any saved timestamp to resume from that exact second.',
  },
];

const featureItems = [
  {
    title: 'Local by default',
    description:
      'Your timestamps are saved on your device. Nothing is sent anywhere unless you choose to sync.',
    icon: 'monitor',
  },
  {
    title: 'Optional sync',
    description:
      'Sign in with Google to access your timestamps on any device. Completely optional, never forced.',
    icon: 'cloud',
  },
  {
    title: 'Categories',
    description: 'Group your timestamps into categories like Learning, Work, or Research.',
    icon: 'folders',
  },
];

const faqItems = [
  {
    question: 'What is the Save & Resume extension?',
    answer:
      'It’s a free Chrome extension that lets you easily save, organize, and jump to exact moments in any YouTube video. Perfect for note-taking, reviewing, or bookmarking scenes.',
  },
  {
    question: "Doesn't YouTube already show where I left off?",
    answer:
      'YouTube does remember your watch history but only up to a point. It tracks the last position on recent videos but it does not let you deliberately save a specific moment you want to come back to. If you watch another video in between, or if too much time passes, your position is often lost. Save & Resume gives you deliberate control over exactly what you save and when, rather than relying on YouTube to remember for you.',
  },
  {
    question: 'Which browsers does it work on?',
    answer:
      'Save & Resume is a Chrome extension so it works on Chrome and any Chromium based browser like Edge or Brave. It does not work on Firefox or Safari.',
  },
  {
    question: 'Does it work on all YouTube videos?',
    answer:
      'It works on any video on youtube.com. It does not work on YouTube embeds on other websites, only on the YouTube platform directly.',
  },
  {
    question: 'What happens to my data if I uninstall the extension?',
    answer:
      'If you are signed in, your timestamps are safe in your account and will be there when you reinstall. If you are using local storage only, uninstalling will remove that data, so sign in first if you want to keep your timestamps before uninstalling.',
  },
  {
    question: 'Is the Android app available?',
    answer:
      'Not yet but it is coming soon. You can join the waitlist on this page to get notified the moment it launches.',
  },
];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function submitWaitlistEmail(email) {
  if (WAITLIST_CONFIG.appsScriptUrl) {
    const body = new URLSearchParams();
    body.append('email', email);
    body.append('source', 'save-and-resume-website');
    body.append('createdAt', new Date().toISOString());

    await fetch(WAITLIST_CONFIG.appsScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: body.toString(),
    });

    return;
  }

  if (WAITLIST_CONFIG.googleFormAction && WAITLIST_CONFIG.googleFormEmailEntry) {
    const body = new URLSearchParams();
    body.append(WAITLIST_CONFIG.googleFormEmailEntry, email);

    await fetch(WAITLIST_CONFIG.googleFormAction, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: body.toString(),
    });

    return;
  }

  throw new Error('WAITLIST_NOT_CONFIGURED');
}

function Icon({ type }) {
  if (type === 'monitor') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 5H6C5.20435 5 4.44129 5.31607 3.87868 5.87868C3.31607 6.44129 3 7.20435 3 8V22C3 22.7956 3.31607 23.5587 3.87868 24.1213C4.44129 24.6839 5.20435 25 6 25H26C26.7956 25 27.5587 24.6839 28.1213 24.1213C28.6839 23.5587 29 22.7956 29 22V8C29 7.20435 28.6839 6.44129 28.1213 5.87868C27.5587 5.31607 26.7956 5 26 5ZM27 22C27 22.2652 26.8946 22.5196 26.7071 22.7071C26.5196 22.8946 26.2652 23 26 23H6C5.73478 23 5.48043 22.8946 5.29289 22.7071C5.10536 22.5196 5 22.2652 5 22V8C5 7.73478 5.10536 7.48043 5.29289 7.29289C5.48043 7.10536 5.73478 7 6 7H26C26.2652 7 26.5196 7.10536 26.7071 7.29289C26.8946 7.48043 27 7.73478 27 8V22ZM21 28C21 28.2652 20.8946 28.5196 20.7071 28.7071C20.5196 28.8946 20.2652 29 20 29H12C11.7348 29 11.4804 28.8946 11.2929 28.7071C11.1054 28.5196 11 28.2652 11 28C11 27.7348 11.1054 27.4804 11.2929 27.2929C11.4804 27.1054 11.7348 27 12 27H20C20.2652 27 20.5196 27.1054 20.7071 27.2929C20.8946 27.4804 21 27.7348 21 28Z" fill="#898F99" />
      </svg>

    );
  }

  if (type === 'cloud') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.0011 5C17.9582 5.00157 15.956 5.57142 14.2185 6.64582C12.4809 7.72023 11.0765 9.25682 10.1623 11.0837C9.07479 10.9251 7.96622 10.9923 6.90578 11.2811C5.84535 11.5699 4.85578 12.0741 3.99882 12.7622C3.14186 13.4504 2.43589 14.3077 1.92493 15.2808C1.41397 16.2538 1.109 17.3217 1.02902 18.4179C0.949047 19.514 1.09579 20.6149 1.4601 21.6518C1.82441 22.6887 2.39847 23.6395 3.14647 24.4447C3.89447 25.2499 4.80037 25.8924 5.80767 26.3321C6.81496 26.7717 7.90204 26.9991 9.00109 27H20.0011C22.9185 27 25.7164 25.8411 27.7793 23.7782C29.8422 21.7153 31.0011 18.9174 31.0011 16C31.0011 13.0826 29.8422 10.2847 27.7793 8.22183C25.7164 6.15893 22.9185 5 20.0011 5ZM20.0011 25H9.00109C7.40979 25 5.88367 24.3679 4.75845 23.2426C3.63323 22.1174 3.00109 20.5913 3.00109 19C3.00109 17.4087 3.63323 15.8826 4.75845 14.7574C5.88367 13.6321 7.40979 13 9.00109 13C9.13859 13 9.27609 13 9.41234 13.0138C9.13887 13.9856 9.00049 14.9904 9.00109 16C9.00109 16.2652 9.10645 16.5196 9.29399 16.7071C9.48152 16.8946 9.73588 17 10.0011 17C10.2663 17 10.5207 16.8946 10.7082 16.7071C10.8957 16.5196 11.0011 16.2652 11.0011 16C11.0011 14.22 11.5289 12.4799 12.5179 10.9999C13.5068 9.51983 14.9124 8.36627 16.5569 7.68508C18.2015 7.0039 20.0111 6.82567 21.7569 7.17293C23.5027 7.5202 25.1064 8.37737 26.3651 9.63604C27.6237 10.8947 28.4809 12.4984 28.8282 14.2442C29.1754 15.99 28.9972 17.7996 28.316 19.4442C27.6348 21.0887 26.4813 22.4943 25.0012 23.4832C23.5212 24.4722 21.7811 25 20.0011 25ZM24.7086 13.2925C24.8016 13.3854 24.8753 13.4957 24.9257 13.6171C24.976 13.7385 25.0019 13.8686 25.0019 14C25.0019 14.1314 24.976 14.2615 24.9257 14.3829C24.8753 14.5043 24.8016 14.6146 24.7086 14.7075L18.7086 20.7075C18.6157 20.8005 18.5054 20.8742 18.384 20.9246C18.2626 20.9749 18.1325 21.0008 18.0011 21.0008C17.8697 21.0008 17.7396 20.9749 17.6182 20.9246C17.4968 20.8742 17.3865 20.8005 17.2936 20.7075L14.2936 17.7075C14.106 17.5199 14.0005 17.2654 14.0005 17C14.0005 16.7346 14.106 16.4801 14.2936 16.2925C14.4812 16.1049 14.7357 15.9994 15.0011 15.9994C15.2665 15.9994 15.521 16.1049 15.7086 16.2925L18.0011 18.5863L23.2936 13.2925C23.3865 13.1995 23.4968 13.1258 23.6182 13.0754C23.7395 13.0251 23.8697 12.9992 24.0011 12.9992C24.1325 12.9992 24.2626 13.0251 24.384 13.0754C24.5054 13.1258 24.6157 13.1995 24.7086 13.2925Z" fill="#898F99" />
      </svg>

    );
  }

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 8H19.3337L15.8663 5.4C15.5196 5.14132 15.0988 5.00107 14.6663 5H9C8.46957 5 7.96086 5.21071 7.58579 5.58579C7.21071 5.96086 7 6.46957 7 7V9H5C4.46957 9 3.96086 9.21071 3.58579 9.58579C3.21071 9.96086 3 10.4696 3 11V25C3 25.5304 3.21071 26.0391 3.58579 26.4142C3.96086 26.7893 4.46957 27 5 27H24.1112C24.612 26.9993 25.092 26.8001 25.4461 26.4461C25.8001 26.092 25.9993 25.612 26 25.1112V23H28.1112C28.612 22.9993 29.092 22.8001 29.4461 22.4461C29.8001 22.092 29.9993 21.612 30 21.1112V10C30 9.46957 29.7893 8.96086 29.4142 8.58579C29.0391 8.21071 28.5304 8 28 8ZM24 25H5V11H10.6663L14.4 13.8C14.5731 13.9298 14.7836 14 15 14H24V25ZM28 21H26V14C26 13.4696 25.7893 12.9609 25.4142 12.5858C25.0391 12.2107 24.5304 12 24 12H15.3337L11.8663 9.4C11.5196 9.14132 11.0988 9.00107 10.6663 9H9V7H14.6663L18.4 9.8C18.5731 9.92982 18.7836 10 19 10H28V21Z" fill="#898F99" />
    </svg>

  );
}

function App() {
  const [email, setEmail] = useState('');
  const [waitlistMessage, setWaitlistMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoVideoOpen, setIsDemoVideoOpen] = useState(false);
  const [isDemoVideoReady, setIsDemoVideoReady] = useState(false);
  const [hasDemoVideoError, setHasDemoVideoError] = useState(false);
  const [activeDemoStepIndex, setActiveDemoStepIndex] = useState(0);
  const [visibleDemoStepIndex, setVisibleDemoStepIndex] = useState(0);
  const [demoStepTransition, setDemoStepTransition] = useState(null);
  const [demoStepAnimationKey, setDemoStepAnimationKey] = useState(0);
  const demoVideoRef = useRef(null);
  const visibleDemoStepIndexRef = useRef(0);
  const demoStepTransitionRef = useRef(null);
  const demoStepSwipeRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
  });

  const resetDemoStepSequence = useCallback(() => {
    visibleDemoStepIndexRef.current = 0;
    demoStepTransitionRef.current = null;
    setActiveDemoStepIndex(0);
    setVisibleDemoStepIndex(0);
    setDemoStepTransition(null);
    setDemoStepAnimationKey((currentKey) => currentKey + 1);
  }, []);

  const beginDemoStepTransition = useCallback((nextIndex) => {
    const fromIndex = demoStepTransitionRef.current
      ? demoStepTransitionRef.current.toIndex
      : visibleDemoStepIndexRef.current;

    setActiveDemoStepIndex(nextIndex);
    setDemoStepAnimationKey((currentKey) => currentKey + 1);

    if (nextIndex === fromIndex) {
      visibleDemoStepIndexRef.current = nextIndex;
      demoStepTransitionRef.current = null;
      setVisibleDemoStepIndex(nextIndex);
      setDemoStepTransition(null);
      return;
    }

    const nextTransition = { fromIndex, toIndex: nextIndex };
    demoStepTransitionRef.current = nextTransition;
    setDemoStepTransition(nextTransition);
  }, []);

  const clearDemoStepSwipe = useCallback(() => {
    demoStepSwipeRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
    };
  }, []);

  const changeDemoStepByOffset = useCallback(
    (offset) => {
      const totalSteps = demoModalSteps.length;
      const currentIndex = demoStepTransitionRef.current
        ? demoStepTransitionRef.current.toIndex
        : visibleDemoStepIndexRef.current;
      const nextIndex = (currentIndex + offset + totalSteps) % totalSteps;
      beginDemoStepTransition(nextIndex);
    },
    [beginDemoStepTransition]
  );

  const handleDemoStepPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    demoStepSwipeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }, []);

  const handleDemoStepPointerUp = useCallback(
    (event) => {
      const swipeState = demoStepSwipeRef.current;

      if (swipeState.pointerId !== event.pointerId) {
        return;
      }

      if (
        event.currentTarget.releasePointerCapture &&
        event.currentTarget.hasPointerCapture &&
        event.currentTarget.hasPointerCapture(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const deltaX = event.clientX - swipeState.startX;
      const deltaY = event.clientY - swipeState.startY;

      clearDemoStepSwipe();

      if (Math.abs(deltaX) < DEMO_STEP_SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return;
      }

      changeDemoStepByOffset(deltaX < 0 ? 1 : -1);
    },
    [changeDemoStepByOffset, clearDemoStepSwipe]
  );

  useEffect(() => {
    visibleDemoStepIndexRef.current = visibleDemoStepIndex;
  }, [visibleDemoStepIndex]);

  useEffect(() => {
    demoStepTransitionRef.current = demoStepTransition;
  }, [demoStepTransition]);

  useEffect(() => {
    if (!isDemoVideoOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        resetDemoStepSequence();
        setIsDemoVideoOpen(false);
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDemoVideoOpen, resetDemoStepSequence]);

  useEffect(() => {
    const videoElement = demoVideoRef.current;

    if (!videoElement) {
      return;
    }

    if (isDemoVideoOpen) {
      videoElement.currentTime = 0;
      videoElement.play().catch(() => { });
      return;
    }

    videoElement.pause();
    videoElement.currentTime = 0;
  }, [isDemoVideoOpen]);

  useEffect(() => {
    if (!isDemoVideoOpen) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      beginDemoStepTransition((activeDemoStepIndex + 1) % demoModalSteps.length);
    }, DEMO_STEP_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeDemoStepIndex, beginDemoStepTransition, demoStepAnimationKey, isDemoVideoOpen]);

  useEffect(() => {
    if (!demoStepTransition) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      visibleDemoStepIndexRef.current = demoStepTransition.toIndex;
      demoStepTransitionRef.current = null;
      setVisibleDemoStepIndex(demoStepTransition.toIndex);
      setDemoStepTransition(null);
    }, DEMO_STEP_FADE_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [demoStepTransition]);

  async function onWaitlistSubmit(event) {
    event.preventDefault();
    setWaitlistMessage('');
    setIsError(false);

    if (!isValidEmail(email)) {
      setWaitlistMessage('Please enter a valid email address.');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitWaitlistEmail(email.trim());
      setWaitlistMessage('You are on the waitlist. We will notify you when it launches.');
      setEmail('');
    } catch (error) {
      if (error.message === 'WAITLIST_NOT_CONFIGURED') {
        setWaitlistMessage(
          'Waitlist is not connected yet. Open .env.local and add your Apps Script URL or Google Form values.'
        );
      } else {
        setWaitlistMessage('Could not save your email right now. Please try again.');
      }
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function openDemoVideo() {
    resetDemoStepSequence();
    setIsDemoVideoReady(false);
    setHasDemoVideoError(false);
    setIsDemoVideoOpen(true);
  }

  function closeDemoVideo() {
    resetDemoStepSequence();
    setIsDemoVideoOpen(false);
  }

  const currentDemoStep = demoModalSteps[visibleDemoStepIndex];

  return (
    <div className="landing-page">
      <header className="top-nav">
        <div className="section-wrap nav-inner">
          <a href="#top" className="brand-link" aria-label="Save and Resume home">
            <img src={icon} alt="Save and Resume" className="brand-wordmark" width="86" height="24" />
          </a>
          <div className="nav-right">
            <span className="launch-text">android app launching soon!</span>
            <a href="#waitlist" className="pill-btn small-btn">
              join waitlist
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="section-wrap">
            <div className="hero-content">
              <div className="hero-text-content">
                <h1>Stop losing your place in YouTube videos.</h1>
                <p>
                  Save any moment in one click.
                  Jump straight back whenever you want.
                  <br />
                  Free, no account needed.
                </p>

                <div className="hero-buttons">
                  <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noopener noreferrer" className="primary-btn">
                    Add to Chrome - it&apos;s free
                  </a>
                  <button type="button" className="ghost-btn" onClick={openDemoVideo}>
                    See how it works <img src={playIcon} alt="" className="play-dot" width="17" height="17" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section-block">
          <div className="section-wrap centered-section">
            <div className="section-heading">
              <p className="section-label">How it works</p>
              <h2>Three steps, that&apos;s it</h2>
            </div>
            <div className="steps-grid">
              {stepItems.map((step) => (
                <article key={step.number} className="info-card step-card">
                  <div className="step-media">
                    <p className="step-number">{step.number}</p>
                    <img
                      src={step.image}
                      alt=""
                      width={step.width}
                      height={step.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-wrap centered-section features-section">
            <div className="section-heading">
              <p className="section-label">Features</p>
              <h2>
                Everything you need,
                <br />
                nothing you don&apos;t
              </h2>
            </div>
            <div className="features-grid">
              {featureItems.map((feature) => (
                <article key={feature.title} className="info-card feature-card">
                  <Icon type={feature.icon} />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="section-block">
          <div className="section-wrap">
            <div className="waitlist-card">
              <div className="waitlist-visual">
                <img
                  src={waitlistPreview}
                  alt="Android app preview"
                  width="295"
                  height="315"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="waitlist-content">
                <h2>Save &amp; Resume is coming to Playstore.</h2>
                <p>Be the first to know when it launches.</p>
                <form className="waitlist-form" onSubmit={onWaitlistSubmit}>
                  <input
                    className="waitlist-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email"
                    required
                  />
                  <button type="submit" className="primary-btn waitlist-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Notify me'}
                  </button>
                </form>
                {waitlistMessage ? (
                  <p className={`waitlist-message ${isError ? 'is-error' : 'is-success'}`}>{waitlistMessage}</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="section-block faq-section">
          <div className="section-wrap faq-layout">
            <div>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              <Accordion type="single" collapsible className="faq-accordion">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index + 1}`} className="faq-item">
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p>{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <img
            src={iconLogo}
            alt="Save and Resume"
            className="footer-logo"
            width="17"
            height="17"
            loading="lazy"
            decoding="async"
          />
          <div className="footer-links">
            <div>
              <a
                href={FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline-animation"
              >
                Feature Requests
              </a>
              <a
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline-animation"
              >
                Buy me a coffee
              </a>
            </div>
            <div>
              <a
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline-animation"
              >
                Download Chrome Extension
              </a>
              <span className="footer-link-disabled" aria-disabled="true">
                Download Android App (coming soon)
              </span>
            </div>
            <div>
              <a
                href="https://jithinsabumec.github.io/save-and-resume-mobile-terms-of-use/"
                className="hover-underline-animation"
              >
                Terms of Use
              </a>
              <a
                href="https://jithinsabumec.github.io/save-and-resume-mobile-privacy-policy/"
                className="hover-underline-animation"
              >
                Privacy Policy
              </a>
              <a
                href="https://jithinsabumec.github.io/save-and-resume-mobile-delete-account/"
                className="hover-underline-animation"
              >
                Delete Account
              </a>
            </div>
          </div>
          <p className="copyright">©2026 Save &amp; Resume | Version 1.2.7</p>
        </div>
      </footer>

      {isDemoVideoOpen ? (
        <div
          className="video-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Save and Resume demo video"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDemoVideo();
            }
          }}
        >
          <div className="video-dialog">
            <div className="video-dialog-panel">
              <div className="video-player-shell" style={{ aspectRatio: String(DEMO_VIDEO_ASPECT_RATIO) }}>
                {!isDemoVideoReady && !hasDemoVideoError ? (
                  <div className="video-loader" aria-hidden="true">
                    <span className="video-loader-spinner" />
                  </div>
                ) : null}
                {hasDemoVideoError ? (
                  <div className="video-error-message">
                    The video could not load right now. Please close this and try again.
                  </div>
                ) : null}
                <video
                  ref={demoVideoRef}
                  className={`demo-video-player ${isDemoVideoReady ? 'is-ready' : ''}`}
                  src={DEMO_VIDEO_URL}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => {
                    setIsDemoVideoReady(true);
                    setHasDemoVideoError(false);
                  }}
                  onCanPlay={() => {
                    setIsDemoVideoReady(true);
                    setHasDemoVideoError(false);
                  }}
                  onError={() => {
                    setHasDemoVideoError(true);
                    setIsDemoVideoReady(false);
                  }}
                >
                  Your browser does not support the demo video.
                </video>
              </div>

              <div className="video-dialog-body">
                <div
                  className="demo-step-copy"
                  aria-live="polite"
                  onPointerDown={handleDemoStepPointerDown}
                  onPointerUp={handleDemoStepPointerUp}
                  onPointerCancel={clearDemoStepSwipe}
                >
                  {demoStepTransition ? (
                    <>
                      <div className="demo-step-copy-layer is-exiting">
                        <h2 className="demo-step-heading">{demoModalSteps[demoStepTransition.fromIndex].heading}</h2>
                        <p className="demo-step-description">
                          {demoModalSteps[demoStepTransition.fromIndex].description}
                        </p>
                      </div>
                      <div className="demo-step-copy-layer is-entering">
                        <h2 className="demo-step-heading">{demoModalSteps[demoStepTransition.toIndex].heading}</h2>
                        <p className="demo-step-description">
                          {demoModalSteps[demoStepTransition.toIndex].description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="demo-step-copy-layer is-visible">
                      <h2 className="demo-step-heading">{currentDemoStep.heading}</h2>
                      <p className="demo-step-description">{currentDemoStep.description}</p>
                    </div>
                  )}
                </div>

                <div className="demo-step-progress" role="group" aria-label="Choose demo step">
                  {demoModalSteps.map((step, index) => {
                    const isActive = index === activeDemoStepIndex;

                    return (
                      <button
                        key={step.heading}
                        type="button"
                        className={`demo-progress-dot ${isActive ? 'is-active' : ''}`}
                        aria-label={`Show step ${index + 1}: ${step.heading}`}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => {
                          beginDemoStepTransition(index);
                        }}
                      >
                        {isActive ? (
                          <span
                            key={`${index}-${demoStepAnimationKey}`}
                            className="demo-progress-fill"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <button type="button" className="primary-btn video-dismiss-btn" onClick={closeDemoVideo}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Analytics />
    </div>
  );
}

export default App;

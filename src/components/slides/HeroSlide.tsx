import React, { useEffect, useState } from 'react';
import { WHISPER_LINES } from '../../utils/constants';

interface HeroSlideProps {
  isActive: boolean;
  anim: boolean;
  onOpenPortalOrSignIn: () => void;
  onSignInWithGoogle: () => void;
  isGoogleLoading?: boolean;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({
  isActive,
  anim,
  onOpenPortalOrSignIn,
  onSignInWithGoogle,
  isGoogleLoading = false,
}) => {
  const [whisperIndex, setWhisperIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!anim) {
      setDisplayText(WHISPER_LINES[whisperIndex]);
      return;
    }

    let charIdx = 0;
    let deleting = false;
    let timeoutId: number;

    const tick = () => {
      const line = WHISPER_LINES[whisperIndex];
      if (!deleting) {
        charIdx++;
        setDisplayText(line.slice(0, charIdx));
        if (charIdx >= line.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, 2600);
          return;
        }
        timeoutId = window.setTimeout(tick, 42);
      } else {
        charIdx--;
        setDisplayText(line.slice(0, charIdx));
        if (charIdx <= 0) {
          deleting = false;
          setWhisperIndex((prev) => (prev + 1) % WHISPER_LINES.length);
          timeoutId = window.setTimeout(tick, 320);
          return;
        }
        timeoutId = window.setTimeout(tick, 22);
      }
    };

    timeoutId = window.setTimeout(tick, 42);
    return () => clearTimeout(timeoutId);
  }, [whisperIndex, anim]);

  return (
    <section
      className={`slide acc-gold ${isActive ? 'is-active' : ''}`}
      id="top"
      data-title="Start here"
      data-accent="gold"
      aria-roledescription="slide"
      aria-label="1 of 5 — Start here"
    >
      <div className="slide-scroll">
        <div className="slide-inner">
          <h1 className="hero-title">
            STOP FEELING<br />
            SORRY FOR<br />
            <span className="gold-text">YOURSELF.</span>
          </h1>

          <p className="hero-body">
            Your brain is not broken. It's a <b style={{ color: '#fff' }}>spotlight, not a filing cabinet</b> — and it was
            never built to store, sort, and start everything alone. So we built it an external brain.{' '}
            <b style={{ color: 'var(--gold)' }}>AI does the remembering. The sorting. The starting.</b> You do the living.
          </p>

          <p className="hero-note">
            THIS ISN'T PRODUCTIVITY COACHING. THIS IS A <b style={{ color: 'var(--pink)' }}>WEAPON</b> AGAINST THE WALL OF AWFUL.
          </p>

          <div className="note-card">
            <span id="aiWhisperText" className="note-text whisper-caret">
              {displayText}
            </span>
          </div>

          <div className="cta-row" style={{ marginTop: '0.4rem' }}>
            <button
              type="button"
              className="u-space-btn"
              onClick={onOpenPortalOrSignIn}
              style={{ border: 'none', backgroundOrigin: 'border-box' }}
            >
              <strong>MEMBER PORTAL</strong>
              <div className="u-space-stars-wrap">
                <div className="u-space-stars" />
              </div>
              <div className="u-space-glow">
                <div className="u-space-circle" />
                <div className="u-space-circle" />
              </div>
            </button>

            <button
              type="button"
              className={`button google ${isGoogleLoading ? 'is-loading' : ''}`}
              onClick={onSignInWithGoogle}
              disabled={isGoogleLoading}
              aria-busy={isGoogleLoading}
            >
              <span className="google-sparkles" aria-hidden="true">
                <span className="google-sparkle sp-1">✦</span>
                <span className="google-sparkle sp-2">✧</span>
                <span className="google-sparkle sp-3">✦</span>
                <span className="google-sparkle sp-4">✧</span>
                <span className="google-sparkle sp-5">✦</span>
                <span className="google-sparkle sp-6">✧</span>
              </span>
              <svg
                viewBox="0 0 256 262"
                preserveAspectRatio="xMidYMid"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              <span className="button-text">
                {isGoogleLoading && <span className="google-spinner" aria-hidden="true" />}
                {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

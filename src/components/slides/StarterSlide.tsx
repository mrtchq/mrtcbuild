import React from 'react';

interface StarterSlideProps {
  isActive: boolean;
  onNext?: () => void;
}

export const StarterSlide: React.FC<StarterSlideProps> = ({ isActive, onNext }) => {
  return (
    <section
      className={`slide acc-cyan ${isActive ? 'is-active' : ''}`}
      id="starter"
      data-title="Starter Class"
      data-accent="cyan"
      aria-roledescription="slide"
      aria-label="2 of 4 — Starter Class"
    >
      <div className="slide-scroll">
        <div className="slide-inner tier-slide-inner">
          <div className="tier-header-row">
            <span className="chip" style={{ color: 'var(--cyan)', borderColor: 'rgba(0, 229, 255, 0.45)' }}>
              <span className="dot-pulse" style={{ background: 'var(--cyan)' }} aria-hidden="true" />
              CLASS I // RECRUIT
            </span>
            <span className="tier-nav-indicator">PAGE 2 OF 4</span>
          </div>

          <article className="card edge tier-card acc-cyan">
            <div className="tier-card-head">
              <div className="tier-title-wrap">
                <span className="tier-tagline">ENTRY PROTOCOL</span>
                <h2 className="tier-title">STARTER</h2>
              </div>
              <div className="tier-price-wrap">
                <div className="tier-price" style={{ color: '#ffffff' }}>
                  $0
                </div>
                <span className="tier-per">/ FOREVER</span>
              </div>
            </div>

            <p className="tier-desc">
              Free forever entry point. Built to give your executive function a fast win in under 15 minutes with zero overwhelm.
            </p>

            <ul className="tier-features">
              <li>
                <span className="tier-bullet" aria-hidden="true">✦</span>
                <span><strong>Google's free AI suite</strong>, wired the ADHD-friendly way</span>
              </li>
              <li>
                <span className="tier-bullet" aria-hidden="true">✦</span>
                <span><strong>The Brain-Dump starter system</strong> to conquer the Wall of Awful</span>
              </li>
              <li>
                <span className="tier-bullet" aria-hidden="true">✦</span>
                <span><strong>Community access</strong> — join your party of fellow neurodivergent builders</span>
              </li>
              <li>
                <span className="tier-bullet" aria-hidden="true">✦</span>
                <span><strong>Instant momentum</strong> — get your first functional AI loop running day one</span>
              </li>
            </ul>

            <div className="tier-cta-wrap">
              <a
                className="btn btn-ghost btn-block tier-btn"
                href="https://news.mrtc.me/#/portal/signup/free"
                target="_blank"
                rel="noopener noreferrer"
              >
                START FREE →
              </a>
              {onNext && (
                <button
                  type="button"
                  className="tier-next-btn"
                  onClick={onNext}
                  aria-label="Next tier: Pro"
                >
                  Swipe or click for Pro Class →
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

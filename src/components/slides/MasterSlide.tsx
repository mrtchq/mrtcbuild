import React from 'react';

interface MasterSlideProps {
  isActive: boolean;
  onGoToStart?: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const MasterSlide: React.FC<MasterSlideProps> = ({ isActive, onGoToStart, onOpenLegal }) => {
  return (
    <section
      className={`slide acc-purple ${isActive ? 'is-active' : ''}`}
      id="master"
      data-title="Master Class"
      data-accent="purple"
      aria-roledescription="slide"
      aria-label="4 of 4 — Master Class"
    >
      <div className="slide-scroll">
        <div className="slide-inner tier-slide-inner">
          <div className="tier-header-row">
            <span className="chip" style={{ color: '#c084fc', borderColor: 'rgba(147, 51, 234, 0.45)' }}>
              <span className="dot-pulse" style={{ background: '#c084fc' }} aria-hidden="true" />
              CLASS III // ARCHITECT
            </span>
            <span className="tier-nav-indicator">PAGE 4 OF 4</span>
          </div>

          <article
            className="card edge tier-card acc-purple stripes"
            style={{
              background: 'linear-gradient(180deg, rgba(147, 51, 234, 0.12), rgba(20, 15, 38, 0.92))',
              borderColor: 'rgba(147, 51, 234, 0.5)',
            }}
          >
            <div className="tier-card-head">
              <div className="tier-title-wrap">
                <span className="tier-tagline" style={{ color: '#c084fc' }}>SOVEREIGN ARCHITECT PROTOCOL</span>
                <h2 className="tier-title" style={{ color: '#ffffff' }}>MASTER</h2>
              </div>
              <div className="tier-price-wrap">
                <div className="tier-price" style={{ color: '#ffffff' }}>
                  $47
                </div>
                <span className="tier-per">/ MONTH</span>
              </div>
            </div>

            <p className="tier-desc">
              Complete sovereignty. Run private AI nodes, custom self-hosted workflows, and get unstuck in live office hours.
            </p>

            <ul className="tier-features">
              <li>
                <span className="tier-bullet" style={{ color: '#c084fc' }} aria-hidden="true">✦</span>
                <span><strong>Everything in Pro</strong>, plus advanced self-hosted stack blueprints</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: '#c084fc' }} aria-hidden="true">✦</span>
                <span><strong>Self-host your infrastructure</strong>: Ghost, n8n, Sim.ai, and Paperclip on VPS</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: '#c084fc' }} aria-hidden="true">✦</span>
                <span><strong>Live Office Hours</strong> — bring your build, get unstuck, ship faster</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: '#c084fc' }} aria-hidden="true">✦</span>
                <span><strong>Cohort-based access</strong> — strictly capped seats to maintain high touch</span>
              </li>
            </ul>

            <div className="tier-cta-wrap">
              <a
                className="btn btn-ghost btn-block tier-btn"
                href="https://news.mrtc.me/#/portal/signup/6ad6f683bbf9530938244ade/monthly"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: 'rgba(147, 51, 234, 0.65)', color: '#e9d5ff', background: 'rgba(147, 51, 234, 0.12)' }}
              >
                JOIN THE COHORT →
              </a>
              {onGoToStart && (
                <button
                  type="button"
                  className="tier-next-btn"
                  onClick={onGoToStart}
                  aria-label="Back to start"
                >
                  ← Back to Start (Slide 1)
                </button>
              )}
            </div>

            <div className="tier-compact-footer">
              <span>SUPPORT: <a href="mailto:sup@mrtc.me">sup@mrtc.me</a></span>
              <span>·</span>
              <button type="button" onClick={() => onOpenLegal('privacy')}>PRIVACY</button>
              <span>·</span>
              <button type="button" onClick={() => onOpenLegal('terms')}>TERMS</button>
              <span>·</span>
              <span>© 2026 MRTC BUILDS</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

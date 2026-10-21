import React from 'react';

interface ProSlideProps {
  isActive: boolean;
  onNext?: () => void;
  isArmed?: boolean;
}

export const ProSlide: React.FC<ProSlideProps> = ({ isActive, onNext, isArmed = false }) => {
  return (
    <section
      className={`slide acc-gold ${isActive ? 'is-active' : ''}`}
      id="pro"
      data-title="Pro Class"
      data-accent="gold"
      aria-roledescription="slide"
      aria-label="3 of 4 — Pro Class"
    >
      <div className="slide-scroll">
        <div className="slide-inner tier-slide-inner">
          <div className="tier-header-row">
            <span className="chip" style={{ color: 'var(--gold)', borderColor: 'rgba(255, 209, 89, 0.45)' }}>
              <span className="dot-pulse" style={{ background: 'var(--gold)' }} aria-hidden="true" />
              CLASS II // OPERATOR
            </span>
            <span className="tier-nav-indicator">PAGE 3 OF 4</span>
          </div>

          <article
            className="card edge tier-card acc-gold tier-card-featured"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 209, 89, 0.11), rgba(245, 184, 46, 0.04))',
              borderColor: 'rgba(255, 209, 89, 0.55)',
            }}
          >
            <div className="tier-badge-featured">MOST DEPLOYED PROTOCOL</div>

            <div className="tier-card-head">
              <div className="tier-title-wrap">
                <span className="tier-tagline" style={{ color: 'var(--gold)' }}>CORE PRODUCTION ENGINE</span>
                <h2 className="tier-title gold-text">PRO</h2>
              </div>
              <div className="tier-price-wrap">
                <div className="tier-price">
                  <span className="gold-text">$17</span>
                </div>
                <span className="tier-per">/ MONTH</span>
              </div>
            </div>

            <p className="tier-desc">
              The sweet spot. AI does the sorting, scheduling, and starting so you stay locked in your zone of genius.
            </p>

            <ul className="tier-features">
              <li>
                <span className="tier-bullet" style={{ color: 'var(--gold)' }} aria-hidden="true">✦</span>
                <span><strong>Everything in Starter</strong>, fully unlocked immediately</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: 'var(--gold)' }} aria-hidden="true">✦</span>
                <span><strong>Muse + Hermes Agent</strong> — your personalized autonomous AI chiefs of staff</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: 'var(--gold)' }} aria-hidden="true">✦</span>
                <span><strong>The full four-sector system library</strong> (Brain, Ops, Code, Engine)</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: 'var(--gold)' }} aria-hidden="true">✦</span>
                <span><strong>Weekly system drops</strong> — new agentic builds as they are forged</span>
              </li>
              <li>
                <span className="tier-bullet" style={{ color: 'var(--gold)' }} aria-hidden="true">✦</span>
                <span><strong>Priority channels</strong> &amp; direct troubleshooting access</span>
              </li>
            </ul>

            <div className="tier-cta-wrap">
              <a
                id="proCta"
                className={`btn btn-gold btn-block tier-btn ${isArmed ? 'cta-armed' : ''}`}
                href="https://news.mrtc.me/#/portal/signup/6a122bce01b5b3684528d092/monthly"
                target="_blank"
                rel="noopener noreferrer"
              >
                GO PRO →
              </a>
              {onNext && (
                <button
                  type="button"
                  className="tier-next-btn"
                  onClick={onNext}
                  aria-label="Next tier: Master"
                >
                  Swipe or click for Master Class →
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

interface TrapSlideProps {
  isActive: boolean;
  onGoToManifesto: () => void;
}

export const TrapSlide: React.FC<TrapSlideProps> = ({ isActive, onGoToManifesto }) => {
  return (
    <section
      className={`slide acc-gold ${isActive ? 'is-active' : ''}`}
      id="trap"
      data-title="Four sectors"
      data-accent="gold"
      aria-roledescription="slide"
      aria-label="2 of 5 — Four sectors"
    >
      <div className="slide-scroll">
        <div className="slide-inner">
          <div className="eyebrow" style={{ color: 'var(--cyan)' }}>
            SECTOR 02 // CAMPAIGN MAP
          </div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(1.8rem,8.2vw,3.1rem)' }}>
            FOUR SECTORS. <span className="gold-text">ONE BRAIN.</span>
          </h2>
          <p className="hero-body">
            Every system we build runs through four sectors. No 40-module courses. No prompt-engineering homework.
            Clear a sector, keep the weapon.
          </p>
          <div className="card edge acc-pink">
            <div className="trap-label">⚠ THE TRAP</div>
            <p className="trap-p">
              People buy courses at 2 AM on a hyperfocus wave — then never open the login email, and wear the guilt for
              months. <b style={{ color: '#fff' }}>We are the antidote to that poison.</b> No course vault to rot.
              Systems that run, wins inside 15 minutes, and zero-guilt resets when life knocks you off track.
            </p>
          </div>
          <div className="cta-row">
            <button className="btn btn-gold" type="button" onClick={onGoToManifesto}>
              THE MANIFESTO →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

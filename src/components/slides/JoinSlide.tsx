import React from 'react';

interface JoinSlideProps {
  isActive: boolean;
  onGoToStart: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const JoinSlide: React.FC<JoinSlideProps> = ({ isActive, onGoToStart, onOpenLegal }) => {
  return (
    <section
      className={`slide acc-gold ${isActive ? 'is-active' : ''}`}
      id="join"
      data-title="Join free"
      data-accent="gold"
      aria-roledescription="slide"
      aria-label="5 of 5 — Join free"
    >
      <div className="slide-scroll">
        <div className="slide-inner">
          <span className="chip" style={{ alignSelf: 'center' }}>
            <span className="dot-pulse" aria-hidden="true" />
            ONE TINY FIRST STEP
          </span>

          <h2 className="final-title">
            GOLDEN AGES DON'T WAIT.<br />
            <span className="gold-text">MOVE.</span>
          </h2>

          <div className="card edge acc-gold">
            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,.88)',
                fontSize: '.96rem',
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              Start free, get the Brain-Dump system, and break your next Wall of Awful into stupid-small quests. Keep what
              helps. Ditch what doesn't.
            </p>

            <div className="cta-row" style={{ marginTop: '.9rem' }}>
              <a
                className="btn btn-gold btn-block"
                href="https://news.mrtc.me/#/portal/signup/free"
                target="_blank"
                rel="noopener noreferrer"
              >
                JOIN FREE →
              </a>
              <button className="btn btn-ghost btn-block" type="button" onClick={onGoToStart}>
                BACK TO START
              </button>
            </div>
          </div>

          <p className="proof" style={{ textAlign: 'center' }}>
            ITERATE THE PROMPT, NOT THE PERSON.
          </p>

          <div className="footer-row">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
              <img
                src="/assets/logo.jpg"
                alt=""
                width="28"
                height="28"
                style={{ borderRadius: 8, border: '1px solid rgba(255,209,89,.4)' }}
              />
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, letterSpacing: '.13em', color: 'var(--ink)' }}>
                MRTC <span className="gold-text">BUILDS</span>
              </span>
            </div>
            <div>
              SUPPORT: <a href="mailto:sup@mrtc.me">sup@mrtc.me</a>
            </div>
            <div>
              <button type="button" onClick={() => onOpenLegal('privacy')}>
                PRIVACY POLICY
              </button>{' '}
              ·{' '}
              <button type="button" onClick={() => onOpenLegal('terms')}>
                TERMS OF SERVICE
              </button>
            </div>
            <div>© 2026 MRTC BUILDS</div>
          </div>
        </div>
      </div>
    </section>
  );
};

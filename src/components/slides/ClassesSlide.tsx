import React from 'react';

interface ClassesSlideProps {
  isActive: boolean;
  isArmed: boolean;
}

export const ClassesSlide: React.FC<ClassesSlideProps> = ({ isActive, isArmed }) => {
  return (
    <section
      className={`slide acc-gold ${isActive ? 'is-active' : ''}`}
      id="classes"
      data-title="Choose your class"
      data-accent="gold"
      aria-roledescription="slide"
      aria-label="4 of 5 — Choose your class"
    >
      <div className="slide-scroll">
        <div className="slide-inner">
          <div className="eyebrow" style={{ color: 'var(--cyan)' }}>
            SECTOR 04 // CHARACTER SELECT
          </div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(1.7rem,8vw,2.7rem)' }}>
            CHOOSE YOUR <span className="gold-text">CLASS</span>
          </h2>
          <p className="hero-body">
            Every class gets the systems + the community. None of them buy my 1:1 time — that's not for sale. Pick your
            level of AI leverage.
          </p>

          <div className="plans">
            <article className="card edge plan acc-cyan">
              <div className="plan-tag">CLASS I // RECRUIT</div>
              <h3>STARTER</h3>
              <div className="price" style={{ color: 'var(--ink)' }}>
                $0 <span className="per">/ FOREVER</span>
              </div>
              <ul>
                <li>Google's free AI suite, wired the ADHD-friendly way</li>
                <li>The Brain-Dump starter system</li>
                <li>Community access — your party of fellow players</li>
                <li>First win inside your first 15 minutes</li>
              </ul>
              <a
                className="btn btn-ghost btn-block"
                href="https://news.mrtc.me/#/portal/signup/free"
                target="_blank"
                rel="noopener noreferrer"
              >
                START FREE →
              </a>
            </article>

            <article
              className="card edge plan acc-gold"
              style={{
                background: 'linear-gradient(180deg, rgba(255,209,89,.09), rgba(245,184,46,.035))',
                borderColor: 'rgba(255,209,89,.45)',
              }}
            >
              <div className="plan-badge">MOST DEPLOYED</div>
              <div className="plan-tag" style={{ color: 'var(--gold)' }}>
                CLASS II // OPERATOR
              </div>
              <h3>PRO</h3>
              <div className="price">
                <span className="gold-text">$17</span> <span className="per">/ MONTH</span>
              </div>
              <ul>
                <li>Everything in Starter</li>
                <li>Muse + Hermes Agent — your AI chief of staff</li>
                <li>The full four-sector system library</li>
                <li>New builds dropped as they're forged</li>
                <li>Priority community channels</li>
              </ul>
              <a
                id="proCta"
                className={`btn btn-gold btn-block ${isArmed ? 'cta-armed' : ''}`}
                href="https://news.mrtc.me/#/portal/signup/6a122bce01b5b3684528d092/monthly"
                target="_blank"
                rel="noopener noreferrer"
              >
                GO PRO →
              </a>
            </article>

            <article className="card edge plan acc-purple stripes">
              <div className="plan-tag" style={{ color: '#c084fc' }}>
                CLASS III // ARCHITECT
              </div>
              <h3>MASTER</h3>
              <div className="price">
                $47 <span className="per">/ MONTH</span>
              </div>
              <ul>
                <li>Everything in Pro</li>
                <li>Self-host your own stack: Ghost, n8n, Sim.ai, Paperclip on your own VPS</li>
                <li>Office hours — bring your build, get unstuck</li>
                <li>
                  <b style={{ color: '#c084fc' }}>Cohort-based.</b> Doors open a few times a year, capped seats
                </li>
              </ul>
              <a
                className="btn btn-ghost btn-block"
                href="https://news.mrtc.me/#/portal/signup/6ad6f683bbf9530938244ade/monthly"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: 'rgba(147,51,234,.55)', color: '#c084fc' }}
              >
                JOIN THE COHORT →
              </a>
            </article>
          </div>

          <p className="proof" style={{ textAlign: 'center' }}>
            BUILT FOR BRAINS THAT DON'T DO SYSTEMS. POWERED BY <b style={{ color: '#fff' }}>AI FOR ADHD</b> — THE ADHD
            DIVISION OF MRTC BUILDS.
          </p>
        </div>
      </div>
    </section>
  );
};

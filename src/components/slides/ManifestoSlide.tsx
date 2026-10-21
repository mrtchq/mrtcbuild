import React from 'react';

interface ManifestoSlideProps {
  isActive: boolean;
  onGoToClasses: () => void;
}

export const ManifestoSlide: React.FC<ManifestoSlideProps> = ({ isActive, onGoToClasses }) => {
  return (
    <section
      className={`slide acc-cyan ${isActive ? 'is-active' : ''}`}
      id="manifesto"
      data-title="Golden age"
      data-accent="cyan"
      aria-roledescription="slide"
      aria-label="3 of 5 — The manifesto"
    >
      <div className="slide-scroll">
        <div className="slide-inner">
          <div className="eyebrow" style={{ color: 'var(--pink)' }}>
            SECTOR 03 // THE MANIFESTO
          </div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(1.6rem,7.4vw,2.7rem)' }}>
            THE GOLDEN AGE FOR <span className="gold-text">NEURODIVERGENT BRAINS</span> STARTS NOW.
          </h2>
          <p className="hero-body">
            For the first time in history, the machines do the parts your brain drops. The remembering. The sorting. The
            starting. The playing field didn't just level — <b style={{ color: '#fff' }}>it tilted toward us.</b> Pattern
            recognition. Hyperfocus. Divergent thinking. The traits they called disorder are the traits this era runs on.
          </p>

          <div className="stack stack-3">
            <div className="card edge acc-pink">
              <h3 className="mini-h" style={{ color: 'var(--pink)' }}>
                THE OLD WORLD
              </h3>
              <p className="mini-p">
                Productivity systems demanded the exact executive function you were already out of. You adapted to the
                tool. The tool never adapted to you. Then you blamed yourself.
              </p>
            </div>
            <div className="card edge acc-cyan">
              <h3 className="mini-h" style={{ color: 'var(--cyan)' }}>
                THE FLIP
              </h3>
              <p className="mini-p">
                We configure AI to adapt to <em>your</em> cognitive rhythm. Messy input welcome. Voice rambles become
                action lists. The system flexes; you stop breaking.
              </p>
            </div>
            <div className="card edge acc-emerald">
              <h3 className="mini-h" style={{ color: 'var(--emerald)' }}>
                THE RULE
              </h3>
              <p className="mini-p">
                If a workflow fails, the workflow had too much friction — not you. We iterate the prompt, not the
                person. Always. That's the whole religion here.
              </p>
            </div>
          </div>

          <p className="closing">
            GOLDEN AGES DON'T WAIT FOR ANYBODY. <span className="gold-text">MOVE.</span>
          </p>

          <div className="cta-row">
            <button className="btn btn-gold" type="button" onClick={onGoToClasses}>
              CHOOSE YOUR CLASS →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

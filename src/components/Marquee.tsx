import React from 'react';

export const Marquee: React.FC = () => {
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee">
        <span>
          STOP STORING. START DUMPING. <span style={{ color: 'var(--gold)' }}>✦</span> ITERATE THE PROMPT, NOT THE PERSON{' '}
          <span style={{ color: 'var(--cyan)' }}>✦</span> GOLDEN AGES DON'T WAIT <span style={{ color: 'var(--pink)' }}>✦</span> STUPID-SMALL WINS{' '}
          <span style={{ color: 'var(--emerald)' }}>✦</span> YOUR BRAIN IS A SPOTLIGHT <span style={{ color: 'var(--gold)' }}>✦</span>&nbsp;
        </span>
        <span>
          STOP STORING. START DUMPING. <span style={{ color: 'var(--gold)' }}>✦</span> ITERATE THE PROMPT, NOT THE PERSON{' '}
          <span style={{ color: 'var(--cyan)' }}>✦</span> GOLDEN AGES DON'T WAIT <span style={{ color: 'var(--pink)' }}>✦</span> STUPID-SMALL WINS{' '}
          <span style={{ color: 'var(--emerald)' }}>✦</span> YOUR BRAIN IS A SPOTLIGHT <span style={{ color: 'var(--gold)' }}>✦</span>&nbsp;
        </span>
      </div>
    </div>
  );
};

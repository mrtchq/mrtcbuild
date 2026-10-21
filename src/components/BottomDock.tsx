import React from 'react';
import { SLIDES } from '../utils/constants';

interface BottomDockProps {
  activeIndex: number;
  onGoTo: (index: number) => void;
  onStep: (delta: number) => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({ activeIndex, onGoTo, onStep }) => {
  const currentSlide = SLIDES[activeIndex] || SLIDES[0];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <nav className="dock" aria-label="Carousel navigation">
      <div className="dock-inner">
        <button
          className="nav-btn"
          id="prevBtn"
          type="button"
          onClick={() => onStep(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous section"
        >
          ←
        </button>

        <div className="dock-mid">
          <div className="dock-meta">
            <span id="counter">{pad(activeIndex + 1)} / {pad(SLIDES.length)}</span>
            <span aria-hidden="true">·</span>
            <span id="slideLabel" aria-live="polite">
              {currentSlide.title}
            </span>
          </div>
          <div className="dots" id="dotsWrap" role="group" aria-label="Choose a section">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className="dot"
                aria-label={`Go to section ${i + 1}: ${slide.title}`}
                aria-current={i === activeIndex ? 'true' : 'false'}
                onClick={() => onGoTo(i)}
              />
            ))}
          </div>
        </div>

        <button
          className="nav-btn"
          id="nextBtn"
          type="button"
          onClick={() => onStep(1)}
          disabled={activeIndex === SLIDES.length - 1}
          aria-label="Next section"
        >
          →
        </button>
      </div>
    </nav>
  );
};

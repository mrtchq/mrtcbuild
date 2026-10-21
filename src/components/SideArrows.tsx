import React from 'react';

interface SideArrowsProps {
  activeIndex: number;
  totalSlides: number;
  onStep: (delta: number) => void;
}

export const SideArrows: React.FC<SideArrowsProps> = ({ activeIndex, totalSlides, onStep }) => {
  return (
    <>
      <button
        className={`side-arrow left ${activeIndex === 0 ? 'at-end' : ''}`}
        id="sidePrev"
        type="button"
        aria-label="Previous section"
        aria-disabled={activeIndex === 0}
        onClick={() => onStep(-1)}
      >
        <span className="chev l" aria-hidden="true" />
      </button>

      <button
        className={`side-arrow right ${activeIndex === totalSlides - 1 ? 'at-end' : ''}`}
        id="sideNext"
        type="button"
        aria-label="Next section"
        aria-disabled={activeIndex === totalSlides - 1}
        onClick={() => onStep(1)}
      >
        <span className="chev r" aria-hidden="true" />
      </button>
    </>
  );
};

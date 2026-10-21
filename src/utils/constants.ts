import { AccentColor, SlideDef } from '../types';

export const RANKS = ['RECRUIT', 'OPERATOR', 'BUILDER', 'ARCHITECT', 'COMMANDER', 'LEGEND'] as const;
export const THRESH = [0, 50, 130, 240, 380, 550] as const;

export const SLIDES: SlideDef[] = [
  { id: 'top', title: 'Start here', accent: 'gold', label: '1 of 5 — Start here' },
  { id: 'trap', title: 'Four sectors', accent: 'gold', label: '2 of 5 — Four sectors' },
  { id: 'manifesto', title: 'Golden age', accent: 'cyan', label: '3 of 5 — The manifesto' },
  { id: 'classes', title: 'Choose your class', accent: 'gold', label: '4 of 5 — Choose your class' },
  { id: 'join', title: 'Join free', accent: 'gold', label: '5 of 5 — Join free' },
];

export const TINTS: Record<AccentColor, [string, string, string]> = {
  gold: ['#ffd159', 'rgba(255,209,89,.18)', 'rgba(255,209,89,.5)'],
  cyan: ['#00e5ff', 'rgba(0,229,255,.16)', 'rgba(0,229,255,.44)'],
  pink: ['#ec4899', 'rgba(236,72,153,.16)', 'rgba(236,72,153,.44)'],
  orange: ['#f97316', 'rgba(249,115,22,.17)', 'rgba(249,115,22,.46)'],
  emerald: ['#10b981', 'rgba(16,185,129,.16)', 'rgba(16,185,129,.44)'],
  purple: ['#9333ea', 'rgba(147,51,234,.18)', 'rgba(147,51,234,.5)'],
};

export const WHISPER_LINES = [
  'Stop feeling sorry for yourself. The tools finally exist.',
  'Your brain is a spotlight, not a filing cabinet.',
  'Name the task. Shrink the step. Move.',
  'Nobody is coming to organize your brain. Good thing AI can.',
  "Golden ages don't wait for anybody.",
  'Iterate the prompt, not the person.',
  'Starting ugly beats planning perfect. Every time.',
  'The Wall of Awful is five small things in a trench coat.',
];

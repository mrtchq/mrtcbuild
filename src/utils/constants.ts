import { AccentColor, SlideDef } from '../types';

export const RANKS = ['RECRUIT', 'OPERATOR', 'BUILDER', 'ARCHITECT', 'COMMANDER', 'LEGEND'] as const;
export const THRESH = [0, 50, 130, 240, 380, 550] as const;

export const SLIDES: SlideDef[] = [
  { id: 'top', title: 'Start here', accent: 'gold', label: '1 of 4 — Start here' },
  { id: 'starter', title: 'Starter Class', accent: 'cyan', label: '2 of 4 — Starter Class' },
  { id: 'pro', title: 'Pro Class', accent: 'gold', label: '3 of 4 — Pro Class' },
  { id: 'master', title: 'Master Class', accent: 'purple', label: '4 of 4 — Master Class' },
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

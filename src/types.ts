export type AccentColor = 'gold' | 'cyan' | 'pink' | 'orange' | 'emerald' | 'purple';

export interface SlideDef {
  id: string;
  title: string;
  accent: AccentColor;
  label: string;
}

export interface SystemSettings {
  anim: boolean;
  sfx: boolean;
  parallax: boolean;
  haptics: boolean;
}

export interface ToastItem {
  id: string;
  title: string;
  sub: string;
  icon?: string;
}

export type MembershipTier = 'Starter Lab' | "Builder's Circle" | 'Mastermind Track';

export interface UserProfile {
  email: string;
  tier: MembershipTier;
  memberSince: string;
  displayName: string;
  photoURL?: string;
}

export type PortalTab = 'overview' | 'vault' | 'drops' | 'doubling' | 'account';

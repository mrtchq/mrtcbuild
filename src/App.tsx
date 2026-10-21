import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES, TINTS } from './utils/constants';
import { SystemSettings, ToastItem, UserProfile, MembershipTier } from './types';
import { setAudioEnabled, playSynthBeep, playSynthClick, playRewardChord, playWarpWhoosh, unlockAudio } from './utils/audio';
import { useHaptics } from './hooks/useHaptics';
import { signInWithGoogle, firebaseSignOut, testConnection } from './firebase';

import { NeuralBackground } from './components/NeuralBackground';
import { Confetti } from './components/Confetti';
import { Header } from './components/Header';
import { SideArrows } from './components/SideArrows';
import { Marquee } from './components/Marquee';
import { Toasts } from './components/Toasts';
import { SettingsModal } from './components/SettingsModal';
import { LegalModal } from './components/LegalModal';
import { AuthModal } from './components/AuthModal';
import { MembersPortal } from './components/portal/MembersPortal';

import { HeroSlide } from './components/slides/HeroSlide';
import { StarterSlide } from './components/slides/StarterSlide';
import { ProSlide } from './components/slides/ProSlide';
import { MasterSlide } from './components/slides/MasterSlide';

const SETTINGS_KEY = 'mrtc-settings-v2';
const USER_KEY = 'mrtc-member-user-v1';

export function App() {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const base: SystemSettings = { anim: !isReduced, sfx: false, parallax: true, haptics: true };
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.anim === 'boolean') base.anim = parsed.anim;
        if (typeof parsed.parallax === 'boolean') base.parallax = parsed.parallax;
        if (typeof parsed.haptics === 'boolean') base.haptics = parsed.haptics;
      }
    } catch {
      // ignore
    }
    return base;
  });

  // User auth state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isInsidePortal, setIsInsidePortal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthPending, setIsAuthPending] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [warpTrigger, setWarpTrigger] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  const deckRef = useRef<HTMLElement | null>(null);
  const visitedRef = useRef<Set<number>>(new Set([0]));

  const buzz = useHaptics(settings.haptics);

  // Add toast helper
  const addToast = useCallback((title: string, sub: string, icon?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = { id, title, sub, icon };
    setToasts((prev) => [...prev.slice(-2), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  }, []);

  // Sync settings audio
  useEffect(() => {
    setAudioEnabled(settings.sfx);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Audio unlock on first interaction & test Firebase
  useEffect(() => {
    testConnection().catch(() => {});
  }, []);

  // Handle URL Magic Link verification on mount (e.g. ?magic_link=true&email=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('magic_link') || params.get('token')) {
        const email = params.get('email') || 'member@mrtc.me';
        const profile: UserProfile = {
          email,
          displayName: email.split('@')[0],
          tier: "Builder's Circle",
          memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        };
        setUser(profile);
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
        setIsInsidePortal(true);
        setConfettiTrigger((c) => c + 1);
        playRewardChord();
        addToast('ACCESS GRANTED', `Authenticated via Magic Link as ${email}`, '✦');

        // clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch {
      // ignore
    }
  }, [addToast]);

  // Update theme tint when active slide changes
  useEffect(() => {
    if (isInsidePortal) {
      const root = document.documentElement;
      root.style.setProperty('--tint', '#ffd159');
      root.style.setProperty('--tint-soft', 'rgba(255,209,89,.18)');
      root.style.setProperty('--tint-line', 'rgba(255,209,89,.5)');
      return;
    }
    const currentSlide = SLIDES[activeIndex] || SLIDES[0];
    const tint = TINTS[currentSlide.accent] || TINTS.gold;
    const root = document.documentElement;
    root.style.setProperty('--tint', tint[0]);
    root.style.setProperty('--tint-soft', tint[1]);
    root.style.setProperty('--tint-line', tint[2]);
  }, [activeIndex, isInsidePortal]);

  const handleVerifyMagicLink = (profile: UserProfile) => {
    setUser(profile);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
    setIsAuthModalOpen(false);
    setIsInsidePortal(true);
    setConfettiTrigger((c) => c + 1);
    playRewardChord();
    addToast('WELCOME TO MEMBER PORTAL', `Signed in as ${profile.displayName || profile.email}`, '✦');
  };

  const handleGoogleAuth = async () => {
    if (isAuthPending) return;
    playSynthClick();
    buzz(12);
    setIsAuthPending(true);
    try {
      const profile = await signInWithGoogle();
      handleVerifyMagicLink(profile);
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === 'auth/popup-closed-by-user') {
        return;
      }
      console.error('Google Sign-in error:', err);
      addToast('SIGN IN FAILED', errorObj?.message || 'Could not complete Google Sign-in. Please retry.', '⚠');
    } finally {
      setIsAuthPending(false);
    }
  };

  const handleSignOut = () => {
    firebaseSignOut().catch(() => {});
    setUser(null);
    setIsInsidePortal(false);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
    playSynthBeep(420, 'sine', 0.15, 0.04);
    addToast('SIGNED OUT', 'You have been signed out of Member Portal.', '🔒');
  };

  const handleUpdateTier = (newTier: MembershipTier) => {
    if (!user) return;
    const updated = { ...user, tier: newTier };
    setUser(updated);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    addToast('TIER UPDATED', `Membership tier set to ${newTier}`, '✦');
  };

  // Scroll carousel to slide index
  const goTo = useCallback(
    (index: number, instant = false) => {
      const target = Math.max(0, Math.min(SLIDES.length - 1, index));
      const deck = deckRef.current;
      if (deck) {
        const left = target * deck.clientWidth;
        deck.scrollTo({ left, behavior: instant ? 'auto' : 'smooth' });
      }
      setActiveIndex(target);
      visitedRef.current.add(target);
    },
    []
  );

  const step = useCallback(
    (delta: number) => {
      if (isInsidePortal) return;
      const target = Math.max(0, Math.min(SLIDES.length - 1, activeIndex + delta));
      if (target === activeIndex) return;
      goTo(target);
      playWarpWhoosh();
      setWarpTrigger((w) => w + 1);
      buzz(10);
    },
    [activeIndex, goTo, buzz, isInsidePortal]
  );

  // Handle deck scroll synchronization
  const onDeckScroll = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const i = Math.round(deck.scrollLeft / (deck.clientWidth || 1));
    if (i !== activeIndex && i >= 0 && i < SLIDES.length) {
      setActiveIndex(i);
      buzz(8);
      visitedRef.current.add(i);
    }
  }, [activeIndex, buzz]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSettingsOpen || legalType !== null || isAuthModalOpen || isInsidePortal) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(SLIDES.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, goTo, isSettingsOpen, legalType, isAuthModalOpen, isInsidePortal]);

  // Audio unlock on first interaction
  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // Tactile ripple effect, click inner-glow/brightness, + organic sparkle burst on .button.google
  useEffect(() => {
    const triggerGoogleButtonEffects = (btn: HTMLElement, x: number, y: number) => {
      // Randomize sparkle appearance delays, durations, and peak scales so each burst feels organic
      const baseDelays = [0, 70, 130, 35, 175, 95];
      const sparkles = btn.querySelectorAll<HTMLElement>('.google-sparkle');
      sparkles.forEach((sp, idx) => {
        const delayJitter = Math.round((Math.random() - 0.5) * 45);
        const delayMs = Math.max(0, (baseDelays[idx % baseDelays.length] ?? 0) + delayJitter);
        const durMs = Math.round(540 + Math.random() * 340); // 540ms – 880ms
        const scaleVal = (0.78 + Math.random() * 0.85).toFixed(2); // 0.78 – 1.63
        sp.style.setProperty('--sp-delay', `${delayMs}ms`);
        sp.style.setProperty('--sp-dur', `${durMs}ms`);
        sp.style.setProperty('--sp-scale', scaleVal);
      });

      btn.classList.remove('is-active-burst', 'is-click-glow');
      void btn.offsetWidth;
      btn.classList.add('is-active-burst', 'is-click-glow');

      window.setTimeout(() => {
        btn.classList.remove('is-click-glow');
      }, 220);

      window.setTimeout(() => {
        btn.classList.remove('is-active-burst');
      }, 1050);

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.5;
      const ripple = document.createElement('span');
      ripple.className = 'google-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      btn.appendChild(ripple);
      window.setTimeout(() => {
        ripple.remove();
      }, 750);
    };

    const handlePointerDown = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest('.button.google') as HTMLElement | null;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX > 0 ? e.clientX - rect.left : rect.width / 2;
      const y = e.clientY > 0 ? e.clientY - rect.top : rect.height / 2;
      triggerGoogleButtonEffects(btn, x, y);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const btn = (e.target as HTMLElement | null)?.closest('.button.google') as HTMLElement | null;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        triggerGoogleButtonEffects(btn, rect.width / 2, rect.height / 2);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update body anim class
  useEffect(() => {
    document.body.classList.toggle('fx-off', !settings.anim);
  }, [settings.anim]);

  const slideProgress = Math.round(((activeIndex + 1) / SLIDES.length) * 100);

  return (
    <div className="relative w-full h-full">
      <NeuralBackground
        anim={settings.anim}
        parallax={settings.parallax}
        currentAccent={isInsidePortal ? 'gold' : SLIDES[activeIndex]?.accent || 'gold'}
        warpTrigger={warpTrigger}
      />

      <Confetti trigger={confettiTrigger} />

      <Header
        user={user}
        isInsidePortal={isInsidePortal}
        slideProgress={slideProgress}
        onOpenSignIn={() => setIsAuthModalOpen(true)}
        onOpenPortal={() => setIsInsidePortal(true)}
        onExitPortal={() => setIsInsidePortal(false)}
        onSignOut={handleSignOut}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoToStart={() => {
          setIsInsidePortal(false);
          goTo(0);
          playWarpWhoosh();
        }}
      />

      {isInsidePortal && user ? (
        <MembersPortal
          user={user}
          onUpdateTier={handleUpdateTier}
          onExitPortal={() => setIsInsidePortal(false)}
          onSignOut={handleSignOut}
        />
      ) : (
        <>
          <main
            className="deck"
            id="deck"
            ref={deckRef}
            onScroll={onDeckScroll}
            role="region"
            aria-roledescription="carousel"
            aria-label="MrTC Builds — swipe through the sections"
          >
            {/* 1 · HERO */}
            <HeroSlide
              isActive={activeIndex === 0}
              anim={settings.anim}
              onOpenPortalOrSignIn={() => {
                if (user) {
                  setIsInsidePortal(true);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              onSignInWithGoogle={handleGoogleAuth}
              isGoogleLoading={isAuthPending}
            />

            {/* 2 · STARTER TIER */}
            <StarterSlide
              isActive={activeIndex === 1}
              onNext={() => {
                goTo(2);
                playWarpWhoosh();
              }}
            />

            {/* 3 · PRO TIER */}
            <ProSlide
              isActive={activeIndex === 2}
              onNext={() => {
                goTo(3);
                playWarpWhoosh();
              }}
              isArmed={false}
            />

            {/* 4 · MASTER TIER */}
            <MasterSlide
              isActive={activeIndex === 3}
              onGoToStart={() => {
                goTo(0);
                playWarpWhoosh();
              }}
              onOpenLegal={(type) => setLegalType(type)}
            />
          </main>

          <SideArrows activeIndex={activeIndex} totalSlides={SLIDES.length} onStep={step} />

          <Marquee />
        </>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onVerifyMagicLink={handleVerifyMagicLink}
        onSignInWithGoogle={handleGoogleAuth}
        isGoogleLoading={isAuthPending}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onUpdateSettings={(updated) => setSettings((s) => ({ ...s, ...updated }))}
        onClose={() => setIsSettingsOpen(false)}
      />

      <LegalModal type={legalType} onClose={() => setLegalType(null)} />

      <Toasts toasts={toasts} />
    </div>
  );
}

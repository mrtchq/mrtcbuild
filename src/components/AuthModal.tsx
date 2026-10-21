import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyMagicLink: (profile: UserProfile) => void;
  onSignInWithGoogle: () => void;
  isGoogleLoading?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onVerifyMagicLink,
  onSignInWithGoogle,
  isGoogleLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'input' | 'sent'>('input');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStep('sent');
  };

  const completeMagicLink = () => {
    const cleanEmail = email.trim() || 'member@mrtc.me';
    const profile: UserProfile = {
      email: cleanEmail,
      displayName: cleanEmail.split('@')[0],
      tier: "Builder's Circle",
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    onVerifyMagicLink(profile);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(3, 3, 6, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      <div
        className="card edge acc-gold"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '28rem',
          background: 'rgba(12, 10, 22, 0.98)',
          borderColor: 'var(--tint-line)',
          padding: '1.6rem 1.4rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--cyan)' }}>
              MRTC BUILDS // ACCESS
            </div>
            <h2 className="sheet-title" style={{ margin: '0.2rem 0 0', fontSize: '1.35rem' }}>
              MEMBER <span className="gold-text">SIGN IN</span>
            </h2>
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{ width: 36, height: 36 }}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {step === 'input' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {/* Google Sign-in Option */}
            <button
              type="button"
              className={`button google ${isGoogleLoading ? 'is-loading' : ''}`}
              onClick={onSignInWithGoogle}
              disabled={isGoogleLoading}
              aria-busy={isGoogleLoading}
              style={{ width: '100%', maxWidth: '100%' }}
            >
              <span className="google-sparkles" aria-hidden="true">
                <span className="google-sparkle sp-1">✦</span>
                <span className="google-sparkle sp-2">✧</span>
                <span className="google-sparkle sp-3">✦</span>
                <span className="google-sparkle sp-4">✧</span>
                <span className="google-sparkle sp-5">✦</span>
                <span className="google-sparkle sp-6">✧</span>
              </span>
              <svg
                viewBox="0 0 256 262"
                preserveAspectRatio="xMidYMid"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              <span className="button-text">
                {isGoogleLoading && <span className="google-spinner" aria-hidden="true" />}
                {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
              </span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', margin: '0.3rem 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '0.68rem', fontFamily: "'Rajdhani', sans-serif", color: 'var(--dim)', letterSpacing: '0.14em' }}>
                OR MAGIC LINK
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#cfc9dd', lineHeight: 1.45 }}>
                Enter your email to receive your passwordless sign-in link.
              </p>

              <div>
                <label
                  htmlFor="authEmail"
                  style={{
                    display: 'block',
                    fontSize: '0.68rem',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--dim)',
                    marginBottom: '0.35rem',
                  }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="authEmail"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                  style={{ padding: '0.75rem 0.9rem' }}
                />
                {error && (
                  <div style={{ color: 'var(--pink)', fontSize: '0.75rem', marginTop: '0.3rem', fontFamily: "'Rajdhani', sans-serif" }}>
                    {error}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-gold btn-block" style={{ marginTop: '0.3rem' }}>
                SEND MAGIC LINK →
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '0.5rem 0' }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'rgba(255, 209, 89, 0.12)',
                border: '1px solid var(--gold)',
                margin: '0 auto',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--gold)',
                fontSize: '1.6rem',
                boxShadow: '0 0 20px rgba(255, 209, 89, 0.25)',
              }}
            >
              ✉
            </div>

            <div>
              <h3 style={{ margin: 0, fontFamily: "'Orbitron', sans-serif", fontSize: '1.05rem', color: '#fff' }}>
                MAGIC LINK SENT!
              </h3>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.86rem', color: '#cfc9dd', lineHeight: 1.5 }}>
                We sent a secure authentication link to <b style={{ color: 'var(--gold)' }}>{email}</b>.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: 14,
                padding: '0.85rem',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  color: 'var(--cyan)',
                  fontWeight: 700,
                  marginBottom: '0.3rem',
                }}
              >
                MAGIC LINK INBOX SIMULATION // CLICK TO ENTER
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#ddd8ea', lineHeight: 1.45 }}>
                In production, clicking the link in your email completes login. Click below to verify now and open your
                Member's Portal:
              </p>
              <button
                type="button"
                className="btn btn-gold btn-block"
                onClick={completeMagicLink}
                style={{ marginTop: '0.75rem', minHeight: 44 }}
              >
                CONFIRM &amp; ENTER MEMBER'S PORTAL ✦
              </button>
            </div>

            <button
              type="button"
              className="btn btn-ghost btn-block"
              onClick={() => setStep('input')}
              style={{ minHeight: 40, fontSize: '0.75rem' }}
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

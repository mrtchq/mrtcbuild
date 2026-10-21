import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  isInsidePortal: boolean;
  slideProgress: number;
  onOpenSignIn: () => void;
  onOpenPortal: () => void;
  onExitPortal: () => void;
  onSignOut: () => void;
  onOpenSettings: () => void;
  onGoToStart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  isInsidePortal,
  slideProgress,
  onOpenSignIn,
  onOpenPortal,
  onExitPortal,
  onSignOut,
  onOpenSettings,
  onGoToStart,
}) => {
  return (
    <header className="app-header">
      <div className="hud">
        <a
          href="#top"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            if (isInsidePortal) {
              onExitPortal();
            } else {
              onGoToStart();
            }
          }}
          aria-label="MrTC Builds — back to start"
        >
          <img src="/assets/logo.jpg" alt="" width="40" height="40" />
          <span className="brand-copy">
            <span className="brand-name">
              MRTC <span className="gold-text">BUILDS</span>
            </span>
            <span className="brand-sub">
              {isInsidePortal ? "MEMBER'S PORTAL" : 'NEURO-COMMAND'}
            </span>
          </span>
        </a>

        <div className="hud-actions" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {!isInsidePortal ? (
                <button
                  type="button"
                  className="btn btn-gold"
                  onClick={onOpenPortal}
                  style={{ minHeight: 38, padding: '0.4rem 0.85rem', fontSize: '0.66rem' }}
                >
                  PORTAL ✦
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onExitPortal}
                  style={{ minHeight: 38, padding: '0.4rem 0.85rem', fontSize: '0.66rem' }}
                >
                  ← BACK TO DECK
                </button>
              )}

              <button
                type="button"
                className="icon-btn"
                onClick={onSignOut}
                title={`Signed in as ${user.email}. Click to sign out`}
                aria-label="Sign out"
                style={{ width: 38, height: 38 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-gold"
              onClick={onOpenSignIn}
              style={{
                minHeight: 38,
                padding: '0.45rem 1rem',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
              }}
            >
              SIGN IN
            </button>
          )}

          <button
            id="settingsBtn"
            type="button"
            className="icon-btn"
            onClick={onOpenSettings}
            aria-label="Open system settings"
            aria-haspopup="dialog"
            style={{ width: 38, height: 38 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>

      {!isInsidePortal && (
        <div className="progress" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${slideProgress}%` }} />
        </div>
      )}
    </header>
  );
};

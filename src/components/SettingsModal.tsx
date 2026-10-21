import React, { useEffect } from 'react';
import { SystemSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  settings: SystemSettings;
  onUpdateSettings: (newSettings: Partial<SystemSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onUpdateSettings,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="settingsModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settingsTitle"
      className="flex open"
    >
      <div id="settingsBackdrop" onClick={onClose} />
      <div className="settings-panel">
        <div className="sheet-head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--cyan)', fontSize: '.6rem' }}>
              MRTC BUILDS // CONTROL DECK
            </div>
            <h2 id="settingsTitle" className="sheet-title">
              SYSTEM <span className="gold-text">SETTINGS</span>
            </h2>
          </div>
          <button
            id="settingsClose"
            type="button"
            aria-label="Close settings"
            className="icon-btn"
            style={{ width: 40, height: 40 }}
            onClick={onClose}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <div className="settings-list">
          <div className="setting-row">
            <div>
              <div className="setting-name">BACKGROUND ANIMATIONS</div>
              <div className="setting-help">
                The neural synapse field, starfields and nebula behind everything. Off = frozen space, zero motion.
              </div>
            </div>
            <label className="switch" aria-label="Toggle background animations">
              <input
                type="checkbox"
                checked={settings.anim}
                onChange={(e) => onUpdateSettings({ anim: e.target.checked })}
              />
              <span className="track" />
            </label>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-name">SOUND EFFECTS</div>
              <div className="setting-help">
                Synth beeps, reward chords, warp whooshes. Off = total silence.
              </div>
            </div>
            <label className="switch" aria-label="Toggle sound effects">
              <input
                type="checkbox"
                checked={settings.sfx}
                onChange={(e) => onUpdateSettings({ sfx: e.target.checked })}
              />
              <span className="track" />
            </label>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-name">MOTION PARALLAX</div>
              <div className="setting-help">
                Background drifts with your thumb drag and, where supported, your device tilt. Subtle depth on the starfield.
              </div>
            </div>
            <label className="switch" aria-label="Toggle motion parallax">
              <input
                type="checkbox"
                checked={settings.parallax}
                onChange={(e) => onUpdateSettings({ parallax: e.target.checked })}
              />
              <span className="track" />
            </label>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-name">HAPTIC FEEDBACK</div>
              <div className="setting-help">
                A short buzz when a section changes or a quest step lands. Android and supported browsers only.
              </div>
            </div>
            <label className="switch" aria-label="Toggle haptic feedback">
              <input
                type="checkbox"
                checked={settings.haptics}
                onChange={(e) => onUpdateSettings({ haptics: e.target.checked })}
              />
              <span className="track" />
            </label>
          </div>
        </div>

        <button
          id="settingsDone"
          type="button"
          className="btn btn-gold btn-block"
          style={{ marginTop: '1rem' }}
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

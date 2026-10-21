import React from 'react';
import { ToastItem } from '../types';

interface ToastsProps {
  toasts: ToastItem[];
}

export const Toasts: React.FC<ToastsProps> = ({ toasts }) => {
  return (
    <div id="toastStack" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className="toast show">
          <div className="toast-icon" aria-hidden="true">
            {t.icon || '🏆'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="toast-title">{t.title}</div>
            <div className="toast-sub">{t.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

import React, { useEffect } from 'react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
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
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />
      <div
        className="card edge"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '48rem',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'rgba(12, 10, 22, 0.98)',
          borderColor: 'var(--tint-line)',
          padding: '2rem 1.6rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--cyan)' }}>
              MRTC BUILDS // LEGAL
            </div>
            <h2 className="sheet-title" style={{ margin: '0.2rem 0 0' }}>
              {type === 'privacy' ? 'PRIVACY POLICY' : 'TERMS OF SERVICE'}
            </h2>
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{ width: 40, height: 40 }}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ color: '#ddd8ea', fontSize: '0.94rem', lineHeight: '1.65' }}>
          {type === 'privacy' ? (
            <>
              <p style={{ color: 'var(--dim)', fontSize: '0.85rem' }}>
                Effective October 21, 2026 · MrTC Builds (“MR.TC AI”), operated by Thierry Charlemagne (“we”, “us”, “our”)
              </p>
              <p>
                This policy explains what information we collect when you use mrtc.me and our memberships — the Starter Lab,
                Builder's Circle and Mastermind Track — which provide AI business guides, group coaching and community access
                (together, the “Services”), and how that information is used.
              </p>
              <h3 style={{ color: 'var(--gold)', marginTop: '1.4rem' }}>1. Information we collect</h3>
              <ul style={{ paddingLeft: '1.2rem', display: 'grid', gap: '0.5rem' }}>
                <li><b>Account information:</b> your name and email address when you join a membership or create an account.</li>
                <li><b>Payment information:</b> subscriptions are billed by Creem, our merchant of record, and its payment processors. We do not receive or store your full card number; we receive confirmation of payment, your plan, and billing status.</li>
                <li><b>Community and content activity:</b> posts, comments and messages you share inside the member community, and your progress through guides and member content.</li>
                <li><b>Support communications:</b> emails you send to sup@mrtc.me or other support channels.</li>
              </ul>
              <h3 style={{ color: 'var(--gold)', marginTop: '1.4rem' }}>2. How we use information</h3>
              <p>
                To provide and manage your membership, guides, coaching sessions and community access; to process subscriptions
                and renewals; to send essential onboarding and service updates; and to answer support requests.
              </p>
            </>
          ) : (
            <>
              <p style={{ color: 'var(--dim)', fontSize: '0.85rem' }}>
                Effective October 21, 2026 · MrTC Builds (“MR.TC AI”), operated by Thierry Charlemagne (“we”, “us”, “our”)
              </p>
              <p>
                These terms govern your use of mrtc.me and our memberships (the “Services”). By joining a membership or using the
                Services, you agree to these terms.
              </p>
              <h3 style={{ color: 'var(--gold)', marginTop: '1.4rem' }}>1. What subscribers receive</h3>
              <ul style={{ paddingLeft: '1.2rem', display: 'grid', gap: '0.5rem' }}>
                <li><b>Starter Lab — $0 (free, forever):</b> AI starter guides (including the Brain-Dump starter system, built on free AI tools), and community access.</li>
                <li><b>Builder's Circle — $17/month:</b> everything in Starter Lab, plus the full system library (guides for tools such as Muse and Hermes Agent), new guides and builds as they are published, and priority community channels.</li>
                <li><b>Mastermind Track — $47/month:</b> everything in Builder's Circle, plus the self-hosting curriculum (running your own stack on your own VPS), group office hours, and cohort-based enrollment with capped seats.</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Memberships provide guides, group coaching and community access. <b>No plan includes private one-to-one coaching</b>, which is not offered for sale.
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-gold" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

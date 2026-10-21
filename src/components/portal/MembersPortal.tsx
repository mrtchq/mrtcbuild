import React, { useState } from 'react';
import { UserProfile, MembershipTier, PortalTab } from '../../types';
import { playSynthBeep, playRewardChord } from '../../utils/audio';

interface MembersPortalProps {
  user: UserProfile;
  onUpdateTier: (tier: MembershipTier) => void;
  onExitPortal: () => void;
  onSignOut: () => void;
}

export const MembersPortal: React.FC<MembersPortalProps> = ({
  user,
  onUpdateTier,
  onExitPortal,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<PortalTab>('overview');
  const [dumpInput, setDumpInput] = useState('');
  const [dumpResults, setDumpResults] = useState<string[]>([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playSynthBeep(640, 'sine', 0.1, 0.04);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const processBrainDump = () => {
    if (!dumpInput.trim()) return;
    playSynthBeep(700, 'triangle', 0.15, 0.05);

    // Generate neuro-divergent friendly stupid-small quests from input
    const clean = dumpInput.trim();
    const steps = [
      `Step 0: Acknowledge you externalized "${clean.slice(0, 45)}${clean.length > 45 ? '...' : ''}"`,
      `Step 1: Open your workspace or browser. Don't start working yet, just open the tab.`,
      `Step 2: Take 30 seconds to write the ugliest 1-line draft. Polish is illegal right now.`,
      `Step 3: Set a 10-minute sprint. Stop the second the timer rings even if you want to keep going.`,
      `Step 4: Celebrate the tiny win. External executive function complete.`,
    ];
    setDumpResults(steps);
  };

  return (
    <div
      className="members-portal-wrap"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'radial-gradient(ellipse at top, #140f28 0%, #06050b 60%, #030306 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 74px) 1rem calc(env(safe-area-inset-bottom, 0px) + 30px)',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Top Member Card */}
        <div
          className="card edge acc-gold"
          style={{
            background: 'rgba(16, 12, 30, 0.85)',
            padding: '1.3rem 1.4rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="chip" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                <span className="dot-pulse" style={{ background: 'var(--gold)' }} />
                {user.tier.toUpperCase()}
              </span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.72rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>
                MEMBER SINCE {user.memberSince.toUpperCase()}
              </span>
            </div>
            <h1 style={{ margin: '0.35rem 0 0', fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 4vw, 1.7rem)', fontWeight: 800 }}>
              WELCOME BACK, <span className="gold-text">{user.displayName.toUpperCase()}</span>
            </h1>
            <p style={{ margin: '0.2rem 0 0', color: '#cfc9dd', fontSize: '0.85rem', fontWeight: 300 }}>
              AI external executive command · All systems operational.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onExitPortal}
              style={{ minHeight: 42, padding: '0.5rem 0.9rem', fontSize: '0.72rem' }}
            >
              ← PRESENTATION DECK
            </button>
            <button
              type="button"
              className="btn btn-gold"
              onClick={() => {
                onUpdateTier(user.tier === 'Starter Lab' ? "Builder's Circle" : user.tier === "Builder's Circle" ? 'Mastermind Track' : 'Starter Lab');
                playRewardChord();
              }}
              style={{ minHeight: 42, padding: '0.5rem 0.9rem', fontSize: '0.72rem' }}
              title="Click to toggle membership tier simulation"
            >
              TIER: {user.tier} ↺
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onSignOut}
              style={{ minHeight: 42, padding: '0.5rem 0.8rem', fontSize: '0.72rem', borderColor: 'rgba(236,72,153,0.5)', color: 'var(--pink)' }}
            >
              SIGN OUT
            </button>
          </div>
        </div>

        {/* Portal Tabs Bar */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBottom: '0.3rem',
            scrollbarWidth: 'none',
          }}
        >
          {[
            { id: 'overview', label: 'BRAIN-DUMP INTAKE' },
            { id: 'vault', label: 'FOUR-SECTOR VAULT' },
            { id: 'drops', label: 'SYSTEM BUILDS' },
            { id: 'doubling', label: 'BODY DOUBLER' },
            { id: 'account', label: 'MEMBERSHIP & PERKS' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as PortalTab);
                playSynthBeep(560, 'sine', 0.08, 0.03);
              }}
              style={{
                background: activeTab === tab.id ? 'rgba(255, 209, 89, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                border: activeTab === tab.id ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.09)',
                color: activeTab === tab.id ? '#ffe9a8' : 'var(--dim)',
                padding: '0.6rem 1rem',
                borderRadius: 12,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.66rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW / BRAIN DUMP INTAKE */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gap: '1.2rem' }}>
            <div className="card edge acc-cyan" style={{ background: 'rgba(14, 11, 26, 0.75)' }}>
              <div className="eyebrow" style={{ color: 'var(--cyan)' }}>
                COGNITIVE OFFLOADER // ZERO-RESISTANCE CAPTURE
              </div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.25rem', margin: '0.3rem 0 0.5rem' }}>
                THE BRAIN-DUMP <span className="gold-text">PROCESSOR</span>
              </h2>
              <p style={{ margin: 0, color: '#cfc9dd', fontSize: '0.9rem', lineHeight: 1.5, fontWeight: 300 }}>
                Type whatever messy, overwhelming thoughts or tasks are cluttering your mind. Our configured prompt engine
                dismantles the Wall of Awful into steps so small your brain won't bother resisting.
              </p>

              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <textarea
                  rows={4}
                  value={dumpInput}
                  onChange={(e) => setDumpInput(e.target.value)}
                  placeholder="Voice-ramble or type the chaotic task here: e.g., 'I have 50 unanswered client emails, need to finish the Q3 review, clean my desk, and figure out how to launch the landing page...'"
                  className="field"
                  style={{
                    borderRadius: 14,
                    resize: 'vertical',
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                  }}
                />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="try-chip"
                      onClick={() => setDumpInput('50 overdue inbox messages, don\'t know where to start')}
                    >
                      OVERDUE EMAILS
                    </button>
                    <button
                      type="button"
                      className="try-chip"
                      onClick={() => setDumpInput('Taxes paperwork scattered everywhere')}
                    >
                      TAXES PAPERS
                    </button>
                    <button
                      type="button"
                      className="try-chip"
                      onClick={() => setDumpInput('I need to launch my website today but feel paralyzed')}
                    >
                      WEBSITE PARALYSIS
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={processBrainDump}
                    style={{ minHeight: 44, padding: '0.6rem 1.2rem' }}
                  >
                    DISMANTLE TASK ⚔
                  </button>
                </div>
              </div>

              {dumpResults.length > 0 && (
                <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: 'var(--emerald)',
                    }}
                  >
                    GENERATED STUPID-SMALL QUEST STEPS
                  </div>
                  {dumpResults.map((step, idx) => (
                    <div
                      key={idx}
                      className="quest-card"
                      style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(0, 229, 255, 0.3)' }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          background: 'rgba(0, 229, 255, 0.15)',
                          color: 'var(--cyan)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.75rem',
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1, fontSize: '0.88rem', color: '#fff' }}>{step}</div>
                      <button
                        type="button"
                        onClick={() => handleCopy(`step-${idx}`, step)}
                        className="try-chip"
                        style={{ height: 28, fontSize: '0.6rem', padding: '0 0.5rem' }}
                      >
                        {copiedId === `step-${idx}` ? 'COPIED ✓' : 'COPY'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick stats & streaks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
              <div className="card edge acc-gold" style={{ padding: '1rem' }}>
                <div className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.62rem' }}>
                  EXECUTIVE FUNCTION SHIFT
                </div>
                <div style={{ fontSize: '1.8rem', fontFamily: "'Orbitron', sans-serif", fontWeight: 800, marginTop: '0.2rem' }}>
                  14 <span style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: "'Rajdhani', sans-serif" }}>TASKS SHRUNK</span>
                </div>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#cfc9dd' }}>
                  Average initiation friction reduced by 72%
                </p>
              </div>

              <div className="card edge acc-emerald" style={{ padding: '1rem' }}>
                <div className="eyebrow" style={{ color: 'var(--emerald)', fontSize: '0.62rem' }}>
                  CURRENT ACTIVE AGENT
                </div>
                <div style={{ fontSize: '1.4rem', fontFamily: "'Orbitron', sans-serif", fontWeight: 800, marginTop: '0.2rem', color: 'var(--emerald)' }}>
                  HERMES v2.4
                </div>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#cfc9dd' }}>
                  Autonomous sorting &amp; daily agenda compression active
                </p>
              </div>

              <div className="card edge acc-pink" style={{ padding: '1rem' }}>
                <div className="eyebrow" style={{ color: 'var(--pink)', fontSize: '0.62rem' }}>
                  COMMUNITY SESSIONS
                </div>
                <div style={{ fontSize: '1.8rem', fontFamily: "'Orbitron', sans-serif", fontWeight: 800, marginTop: '0.2rem' }}>
                  FRIDAY <span style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: "'Rajdhani', sans-serif" }}>11 AM PST</span>
                </div>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#cfc9dd' }}>
                  Weekly Live Build Lab with MrTC
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOUR-SECTOR VAULT */}
        {activeTab === 'vault' && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                num: '01',
                sector: 'FRICTIONLESS INITIATION',
                title: 'THE SPARK PROMPT SUITE',
                desc: 'Pre-written prompts that trick executive dysfunction by turning monumental obligations into microscopic first moves.',
                color: 'var(--orange)',
                badge: 'ALL TIERS',
                prompt:
                  'I am currently experiencing task paralysis about [TASK]. I do NOT want a comprehensive plan. I want you to give me ONE action that takes under 60 seconds and requires almost zero mental effort. Do not list step 2 until I report step 1 done.',
              },
              {
                num: '02',
                sector: 'COGNITIVE OFFLOADING',
                title: 'THE BRAIN DUMP RE-ORGANIZER',
                desc: 'Turn messy voice-to-text transcripts into prioritized, actionable kanban cards without you having to re-read your ramble.',
                color: 'var(--cyan)',
                badge: 'ALL TIERS',
                prompt:
                  'Below is an unedited audio voice dump of my thoughts. Extract: 1) What must happen today (max 2 items), 2) What can wait until next week, 3) Random creative ideas to stash in a drawer. Tone: calm, non-judgmental, brief.',
              },
              {
                num: '03',
                sector: 'DECISION ELIMINATION',
                title: 'HERMES AGENT CHIEF OF STAFF',
                desc: 'Pre-configured rules for AI agents to draft customer replies, summarize newsletters, and clear your inbox before you look at it.',
                color: 'var(--pink)',
                badge: "BUILDER'S CIRCLE+",
                prompt:
                  'Act as my executive triage agent Hermes. Evaluate this inbound request. Draft a polite, clear response matching my voice. If it requires a decision from me, present it as a binary Choice A vs Choice B so I do not have to think.',
              },
              {
                num: '04',
                sector: 'BODY DOUBLING & PACING',
                title: 'VIRTUAL CO-PILOT SESSION SCRIPT',
                desc: 'An AI that stays on a chat thread with you as you clean, code, or draft, gently steering you off rabbit holes every 10 minutes.',
                color: 'var(--emerald)',
                badge: 'MASTERMIND TRACK',
                prompt:
                  'You are my ADHD body double for the next 45 minutes. My goal is [GOAL]. Every 10 minutes, ask me one simple question: "Are you still on [GOAL] or did a rabbit hole call you?" If I went down a rabbit hole, do not scold me; gently guide me back.',
              },
            ].map((vaultItem, i) => (
              <div key={i} className="card edge" style={{ background: 'rgba(14, 11, 26, 0.75)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: vaultItem.color, fontFamily: "'Orbitron', sans-serif", fontWeight: 800 }}>
                        SECTOR {vaultItem.num}
                      </span>
                      <span className="chip" style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem' }}>
                        {vaultItem.badge}
                      </span>
                    </div>
                    <h3 style={{ margin: '0.3rem 0', fontFamily: "'Orbitron', sans-serif", fontSize: '1.15rem' }}>
                      {vaultItem.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => handleCopy(`vault-${i}`, vaultItem.prompt)}
                    style={{ minHeight: 36, padding: '0.3rem 0.8rem', fontSize: '0.65rem' }}
                  >
                    {copiedId === `vault-${i}` ? 'PROMPT COPIED! ✓' : 'COPY PROMPT 📋'}
                  </button>
                </div>

                <p style={{ margin: '0.4rem 0 0.8rem', color: '#cfc9dd', fontSize: '0.88rem', lineHeight: 1.5, fontWeight: 300 }}>
                  {vaultItem.desc}
                </p>

                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 12,
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    color: '#ddd8ea',
                    lineHeight: 1.5,
                  }}
                >
                  {vaultItem.prompt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SYSTEM BUILDS & DOWNLOADS */}
        {activeTab === 'drops' && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="card edge acc-gold" style={{ background: 'rgba(14, 11, 26, 0.75)' }}>
              <div className="eyebrow" style={{ color: 'var(--gold)' }}>
                MRTC FORGE // DEPLOYABLE WORKFLOW PACKS
              </div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.25rem', margin: '0.3rem 0 0.4rem' }}>
                AUTOMATION &amp; AGENT CONFIGS
              </h2>
              <p style={{ margin: 0, color: '#cfc9dd', fontSize: '0.88rem', fontWeight: 300 }}>
                Copy-paste ready n8n workflows, Docker configurations, and Agent schemas tested for neurodivergent entrepreneurs.
              </p>
            </div>

            {[
              {
                name: 'Sim.ai + n8n Executive Secretary Workflow',
                tag: 'WORKFLOW TEMPLATE',
                tierReq: "Builder's Circle",
                desc: 'Listens to voice notes sent via Telegram, runs Gemini 2.0 Flash to extract dates and action items, and puts them into your Notion/Google Calendar.',
                content:
                  '{"name":"MrTC_Voice_To_Calendar_v2","nodes":[{"type":"n8n-nodes-base.telegramTrigger"},{"type":"@google/genai.extractTask"},{"type":"n8n-nodes-base.googleCalendar"}]}',
              },
              {
                name: 'Paperclip VPS Self-Host Stack (Docker Compose)',
                tag: 'SELF-HOST CURRICULUM',
                tierReq: 'Mastermind Track',
                desc: 'One-command bash installer to stand up Ghost CMS, n8n, and Hermes proxy on a $5/mo Hetzner VPS with automatic SSL certificates.',
                content:
                  'version: "3.8"\nservices:\n  ghost:\n    image: ghost:5-alpine\n    restart: always\n    ports:\n      - "2368:2368"\n  n8n:\n    image: n8nio/n8n:latest\n    restart: always\n    ports:\n      - "5678:5678"',
              },
              {
                name: 'Google Gemini Pro 1.5 Live API Audio Body-Double Script',
                tag: 'CODE DROP',
                tierReq: "Builder's Circle",
                desc: 'Node.js + WebSockets client for low-latency voice interaction while you work.',
                content:
                  'import { GoogleGenAI } from "@google/genai";\nconst ai = new GoogleGenAI();\n// Live body double streaming prompt setup\nconsole.log("Hermes Live Audio Double Initialized");',
              },
            ].map((drop, i) => (
              <div key={i} className="card edge" style={{ background: 'rgba(14, 11, 26, 0.75)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="chip" style={{ fontSize: '0.6rem' }}>
                        {drop.tag}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--gold)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                        {drop.tierReq.toUpperCase()}
                      </span>
                    </div>
                    <h3 style={{ margin: '0.3rem 0', fontFamily: "'Orbitron', sans-serif", fontSize: '1.05rem' }}>
                      {drop.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={() => handleCopy(`drop-${i}`, drop.content)}
                    style={{ minHeight: 38, padding: '0.4rem 0.85rem', fontSize: '0.66rem' }}
                  >
                    {copiedId === `drop-${i}` ? 'COPIED TO CLIPBOARD! ✓' : 'DOWNLOAD / COPY ✦'}
                  </button>
                </div>

                <p style={{ margin: '0.4rem 0 0', color: '#cfc9dd', fontSize: '0.86rem', fontWeight: 300, lineHeight: 1.5 }}>
                  {drop.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: BODY DOUBLER */}
        {activeTab === 'doubling' && (
          <div className="card edge acc-purple" style={{ background: 'rgba(14, 11, 26, 0.75)', textAlign: 'center', padding: '2rem 1.4rem' }}>
            <div className="eyebrow" style={{ color: 'var(--purple)' }}>
              NEURO-PACER // 25-MINUTE FOCUSED SPRINT
            </div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.6rem', margin: '0.3rem 0' }}>
              VIRTUAL <span className="gold-text">BODY DOUBLER</span>
            </h2>
            <p style={{ maxWidth: '32rem', margin: '0 auto 1.5rem', color: '#cfc9dd', fontSize: '0.9rem', lineHeight: 1.5 }}>
              A distraction-free, zero-judgment focus anchor. Keep this tab open while you work on your singular tiny task.
            </p>

            <div
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 5.5rem)',
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                color: timerRunning ? 'var(--gold)' : '#fff',
                fontVariantNumeric: 'tabular-nums',
                textShadow: timerRunning ? '0 0 30px rgba(255, 209, 89, 0.4)' : 'none',
              }}
            >
              {Math.floor(timerSeconds / 60)
                .toString()
                .padStart(2, '0')}
              :{(timerSeconds % 60).toString().padStart(2, '0')}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => {
                  setTimerRunning(!timerRunning);
                  playSynthBeep(timerRunning ? 440 : 660, 'sine', 0.15, 0.05);
                }}
                style={{ minWidth: 140 }}
              >
                {timerRunning ? 'PAUSE TIMER' : 'START SPRINT ⚔'}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(25 * 60);
                  playSynthBeep(330, 'sine', 0.1, 0.04);
                }}
              >
                RESET 25m
              </button>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--dim)', fontSize: '0.78rem' }}>
                <span className="dot-pulse" style={{ background: 'var(--emerald)' }} />
                <span>Hermes Silent Watcher Active</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--dim)', fontSize: '0.78rem' }}>
                <span>✦ 40Hz Audio Ready in Control Deck</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MEMBERSHIP & PERKS */}
        {activeTab === 'account' && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="card edge acc-gold" style={{ background: 'rgba(14, 11, 26, 0.75)' }}>
              <div className="eyebrow" style={{ color: 'var(--gold)' }}>
                ACCOUNT OVERVIEW
              </div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.25rem', margin: '0.3rem 0 1rem' }}>
                MEMBERSHIP <span className="gold-text">STATUS</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: 'var(--dim)', fontSize: '0.7rem', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                    AUTHENTICATED EMAIL
                  </div>
                  <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.2rem' }}>
                    {user.email}
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: 'var(--dim)', fontSize: '0.7rem', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                    ACTIVE PLAN
                  </div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.2rem' }}>
                    {user.tier}
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: 'var(--dim)', fontSize: '0.7rem', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                    BILLING STATUS
                  </div>
                  <div style={{ color: 'var(--emerald)', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.2rem' }}>
                    ACTIVE VIA CREEM
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.4rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div style={{ fontSize: '0.82rem', color: '#cfc9dd' }}>
                  Questions or need an invoice? Contact <a href="mailto:sup@mrtc.me" style={{ color: 'var(--cyan)' }}>sup@mrtc.me</a>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onSignOut}
                  style={{ minHeight: 38, padding: '0.4rem 0.9rem', fontSize: '0.68rem', borderColor: 'var(--pink)', color: 'var(--pink)' }}
                >
                  SIGN OUT FROM THIS DEVICE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

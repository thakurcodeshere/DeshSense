import React from 'react';
import { useAppContext } from '../context/AppContext';
import { fmtN } from '../utils/engine';

export default function Header() {
  const { civicScore } = useAppContext();
  
  return (
    <div style={{
      position: 'fixed', top: 0, width: '100%', maxWidth: '430px',
      background: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.2)', zIndex: 100,
      padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px', filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' }}>🇮🇳</span>
        <h1 className="font-rajdhani" style={{ fontSize: '24px', margin: 0, letterSpacing: '1px' }}>
          Desh<span style={{ color: 'var(--accent-amber)', textShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}>Sense</span>
        </h1>
      </div>
      <div style={{
        background: 'rgba(30, 41, 59, 0.8)', padding: '6px 12px', borderRadius: '50px',
        border: '1px solid var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '6px',
        animation: 'pulse 2s infinite'
      }}>
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>SCORE</span>
        <span className="font-rajdhani" style={{ fontSize: '18px', color: 'var(--accent-amber)' }}>
          {fmtN(civicScore)}
        </span>
      </div>
    </div>
  );
}

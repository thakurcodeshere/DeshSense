import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getRank, fmtN } from '../utils/engine';
import { RANKS } from '../constants';

export default function CardScreen() {
  const { civicScore, totalActions, civicCredits, trustScore } = useAppContext();
  const rank = getRank(civicScore);

  return (
    <div className="screen-container">
      <div style={{
        background: `linear-gradient(135deg, ${rank.color}, #0F172A)`,
        padding: '24px', borderRadius: '24px', border: `1px solid ${rank.color}88`,
        boxShadow: rank.level >= 8 ? `0 0 40px ${rank.color}66` : '0 10px 30px rgba(0,0,0,0.6)',
        animation: rank.level >= 8 ? 'glow 3s infinite' : 'fadeUp 0.6s ease-out',
        position: 'relative', overflow: 'hidden', marginBottom: '32px', marginTop: '20px'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: rank.color, filter: 'blur(70px)', opacity: 0.3 }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div className="font-bebas" style={{ fontSize: '26px', opacity: 0.9, letterSpacing: '2px' }}>CIVIC PASSPORT</div>
          <div style={{ fontSize: '24px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}>📡</div>
        </div>

        <div style={{ width: '45px', height: '35px', background: rank.level === 9 ? 'linear-gradient(135deg, #FBBF24, #D97706)' : 'linear-gradient(135deg, #E2E8F0, #94A3B8)', borderRadius: '6px', marginBottom: '24px', opacity: 0.9, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }} />

        <div className="font-rajdhani" style={{ fontSize: rank.level >= 8 ? '28px' : '24px', letterSpacing: '4px', marginBottom: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          DSN · 4912 · 841X · XXXX
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
          <div>
            <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px', letterSpacing: '1px' }}>CITIZEN</div>
            <div className="font-noto" style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>RAVI KUMAR</div>
            <div style={{ fontSize: '12px', color: rank.color, fontWeight: 'bold', marginTop: '4px', filter: 'brightness(1.5)' }}>{rank.name.toUpperCase()}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px', letterSpacing: '1px' }}>SCORE</div>
            <div className="font-rajdhani" style={{ fontSize: '28px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>{fmtN(civicScore)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Rank Level</div>
          <div className="font-rajdhani" style={{ fontSize: '28px', color: rank.color, textShadow: `0 0 10px ${rank.color}50` }}>{rank.level} / <span style={{fontSize:'16px', color:'var(--text-tertiary)'}}>9</span></div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>TrustScore</div>
          <div className="font-rajdhani" style={{ fontSize: '28px', color: 'var(--accent-blue)', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>{trustScore.toFixed(1)}</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Lifetime Credits</div>
          <div className="font-rajdhani" style={{ fontSize: '28px', color: 'var(--accent-amber)', textShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}>{civicCredits + 450}</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Actions Logged</div>
          <div className="font-rajdhani" style={{ fontSize: '28px', color: 'var(--accent-green)', textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>{totalActions}</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Progression Ladder</div>
        <div style={{ display: 'flex', gap: '6px', height: '16px' }}>
          {RANKS.map(r => (
            <div key={r.level} style={{
              flex: 1, background: r.color, borderRadius: '4px',
              opacity: r.level < rank.level ? 1 : r.level === rank.level ? 1 : 0.15,
              border: r.level === rank.level ? '2px solid #fff' : 'none',
              transform: r.level === rank.level ? 'scaleY(1.5)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: r.level <= rank.level ? `0 0 8px ${r.color}80` : 'none'
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
